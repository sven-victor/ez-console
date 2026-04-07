// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package service

import (
	"context"
	"encoding/json"
	"errors"
	"sync"
	"time"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
)

// CreateTaskOption configures task creation.
type CreateTaskOption func(*model.Task)

// WithPayload sets the task payload (JSON string).
func WithPayload(payload string) CreateTaskOption {
	return func(t *model.Task) {
		t.Payload = payload
	}
}

// WithMaxRetries sets the maximum retry count.
func WithMaxRetries(n int) CreateTaskOption {
	return func(t *model.Task) {
		t.MaxRetries = n
	}
}

// WithCategory sets the task category (user or system). If not set, defaults to "user" when creator is not "system", otherwise "system".
func WithCategory(category model.TaskCategory) CreateTaskOption {
	return func(t *model.Task) {
		t.Category = category
	}
}

// WithCronScheduleID sets the cron schedule ID that triggered this task (for execution history).
func WithCronScheduleID(id string) CreateTaskOption {
	return func(t *model.Task) {
		t.CronScheduleID = id
	}
}

const (
	defaultTaskQueueSize = 1000
	taskPollInterval     = 2 * time.Second
	taskFallbackInterval = 1 * time.Minute
)

// TaskService handles task CRUD and worker pool.
type TaskService struct {
	cancelChans map[string]chan struct{}
	cancelMu    sync.RWMutex
	taskQueue   chan *model.Task
	taskQueueMu sync.Mutex
}

// NewTaskService creates a new TaskService.
func NewTaskService() *TaskService {
	return &TaskService{
		cancelChans: make(map[string]chan struct{}),
		taskQueue:   make(chan *model.Task, defaultTaskQueueSize),
	}
}

// CreateTask creates a new task. CreatorID is set from context. Not exposed via HTTP.
func (s *TaskService) CreateTask(ctx context.Context, taskType model.TaskType, opts ...CreateTaskOption) (*model.Task, error) {
	creatorID := middleware.GetUserIDFromContext(ctx)
	if creatorID == "" {
		creatorID = "system"
	}
	t := &model.Task{
		Type:      taskType,
		Status:    model.TaskStatusPending,
		Progress:  0,
		CreatorID: creatorID,
		Category:  model.TaskCategoryUser,
	}
	if creatorID == "system" {
		t.Category = model.TaskCategorySystem
	}
	for _, o := range opts {
		o(t)
	}
	if err := db.Session(ctx).Create(t).Error; err != nil {
		return nil, err
	}
	taskCreatedTotal.WithLabelValues(string(t.Category), string(t.Type)).Inc()
	// Prefer in-memory queue; if full, leave task in DB only and set overflow so workers will poll DB.
	select {
	case s.taskQueue <- t:
		taskQueueLength.Inc()
	default:
		taskQueueOverflowTotal.WithLabelValues(string(t.Category)).Inc()
	}
	return t, nil
}

// GetTask returns a task by ID. Enforces visibility: admin or creator.
func (s *TaskService) GetTask(ctx context.Context, id string) (*model.Task, error) {
	var t model.Task
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&t).Error; err != nil {
		return nil, err
	}
	if !s.canAccess(ctx, t.CreatorID) {
		return nil, gorm.ErrRecordNotFound
	}
	return &t, nil
}

// isGlobalAdmin returns true if the context user has the global admin role.
func isGlobalAdmin(ctx context.Context) bool {
	roles := middleware.GetRolesFromContext(ctx)
	for _, r := range roles {
		if r.Name == "admin" && (r.OrganizationID == nil || *r.OrganizationID == "") {
			return true
		}
	}
	return false
}

// ListTasks returns paginated tasks. Non-admin users only see their own.
func (s *TaskService) ListTasks(ctx context.Context, current, pageSize int, search string) ([]*model.Task, int64, error) {
	query := db.Session(ctx).Model(&model.Task{})
	if !isGlobalAdmin(ctx) {
		userID := middleware.GetUserIDFromContext(ctx)
		query = query.Where("creator_id = ?", userID)
	}
	if search != "" {
		query = query.Where("type LIKE ? OR resource_id LIKE ?", "%"+search+"%", "%"+search+"%")
	}
	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	var list []*model.Task
	offset := (current - 1) * pageSize
	if err := query.Order("created_at DESC").Offset(offset).Limit(pageSize).Find(&list).Error; err != nil {
		return nil, 0, err
	}
	return list, total, nil
}

// ListTasksByCronScheduleID returns paginated tasks created by the given cron schedule (for schedule execution history).
func (s *TaskService) ListTasksByCronScheduleID(ctx context.Context, cronScheduleID string, current, pageSize int) ([]*model.Task, int64, error) {
	query := db.Session(ctx).Model(&model.Task{}).Where("cron_schedule_id = ?", cronScheduleID)
	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	var list []*model.Task
	offset := (current - 1) * pageSize
	if err := query.Order("created_at DESC").Offset(offset).Limit(pageSize).Find(&list).Error; err != nil {
		return nil, 0, err
	}
	return list, total, nil
}

// ListUserTasks returns recent tasks for the header dropdown: only tasks with category "user" for the given user.
func (s *TaskService) ListUserTasks(ctx context.Context, userID string) ([]*model.Task, error) {
	query := db.Session(ctx).Model(&model.Task{}).
		Where("creator_id = ?", userID).
		Where("category = ?", model.TaskCategoryUser).
		Where("(created_at > ?) OR (status in ?)", time.Now().Add(-time.Hour*24), []model.TaskStatus{model.TaskStatusRunning, model.TaskStatusPending})
	var list []*model.Task
	if err := query.Order("created_at DESC").Limit(10).Find(&list).Error; err != nil {
		return nil, err
	}
	return list, nil
}

func (s *TaskService) canAccess(ctx context.Context, creatorID string) bool {
	if middleware.HasGlobalRolePermission(ctx, "task:list") || middleware.HasGlobalRolePermission(ctx, "task:view") {
		return true
	}
	return middleware.GetUserIDFromContext(ctx) == creatorID
}

// UpdateTaskStatus updates status, result, error, progress, and optionally finished_at.
func (s *TaskService) UpdateTaskStatus(ctx context.Context, id, status, result, errMsg string, progress int) error {
	updates := map[string]interface{}{
		"status":   status,
		"result":   result,
		"error":    errMsg,
		"progress": progress,
	}
	if status == string(model.TaskStatusSuccess) || status == string(model.TaskStatusFailed) || status == string(model.TaskStatusCancelled) {
		now := time.Now()
		updates["finished_at"] = &now
	}
	return db.Session(ctx).Model(&model.Task{}).Where("resource_id = ?", id).Updates(updates).Error
}

// UpdateTaskProgress updates only progress.
func (s *TaskService) UpdateTaskProgress(ctx context.Context, id string, progress int) error {
	return db.Session(ctx).Model(&model.Task{}).Where("resource_id = ?", id).Update("progress", progress).Error
}

// SetTaskArtifact sets the artifact file key for download.
func (s *TaskService) SetTaskArtifact(ctx context.Context, id string, fileKey string, fileName string) error {
	return db.Session(ctx).Model(&model.Task{}).
		Where("resource_id = ?", id).
		Updates(map[string]interface{}{
			"artifact_file_key":  fileKey,
			"artifact_file_name": fileName,
		}).Error
}

// CancelTask signals the running task to cancel. The worker will set status to cancelled when it exits.
func (s *TaskService) CancelTask(ctx context.Context, id string) error {
	t, err := s.GetTask(ctx, id)
	if err != nil {
		return err
	}
	if t.Status != model.TaskStatusRunning && t.Status != model.TaskStatusPending {
		return nil
	}
	s.cancelMu.Lock()
	ch, ok := s.cancelChans[id]
	s.cancelMu.Unlock()
	if ok {
		close(ch)
		s.cancelMu.Lock()
		delete(s.cancelChans, id)
		s.cancelMu.Unlock()
	} else if t.Status == model.TaskStatusPending {
		return s.UpdateTaskStatus(ctx, id, string(model.TaskStatusCancelled), "", "", 0)
	}
	return nil
}

// RetryTask resets task to pending and clears error so it can be picked up again.
func (s *TaskService) RetryTask(ctx context.Context, id string) error {
	t, err := s.GetTask(ctx, id)
	if err != nil {
		return err
	}
	if t.Status != model.TaskStatusFailed && t.Status != model.TaskStatusCancelled {
		return nil
	}
	return db.Session(ctx).Model(&model.Task{}).Where("resource_id = ?", id).Updates(map[string]interface{}{
		"status":      model.TaskStatusPending,
		"error":       "",
		"result":      "",
		"progress":    0,
		"started_at":  nil,
		"finished_at": nil,
		"retry_count": t.RetryCount + 1,
		// Manual retry starts a fresh auto-retry cycle.
		"auto_retry_count": 0,
	}).Error
}

// DeleteTask soft-deletes a task. Enforces creator or admin.
func (s *TaskService) DeleteTask(ctx context.Context, id string) error {
	t, err := s.GetTask(ctx, id)
	if err != nil {
		return err
	}
	return db.Session(ctx).Delete(t).Error
}

// GetTaskLogs returns stored log entries for a task. Enforces same visibility as GetTask (admin or creator).
// Uses the log storage backend selected in task settings.
func (s *TaskService) GetTaskLogs(ctx context.Context, id string) ([]model.TaskLog, error) {
	if _, err := s.GetTask(ctx, id); err != nil {
		return nil, err
	}
	settingService := middleware.GetSettingService()
	logStorageBackend, _ := settingService.GetStringSetting(ctx, model.SettingTaskLogStorageBackend, "database")
	be := taskscheduler.GetLogStoreBackend(logStorageBackend)
	if be == nil {
		return nil, nil
	}
	entries, err := be.ListByTaskID(ctx, id)
	if err != nil {
		return nil, err
	}
	return entries, nil
}

// claimTaskByID atomically claims the given pending task by ID (sets status to running). Returns the task or nil if not found/not pending.
func (s *TaskService) claimTaskByID(ctx context.Context, id string) (*model.Task, error) {
	var t model.Task
	err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("resource_id = ? AND status = ?", id, model.TaskStatusPending).First(&t).Error; err != nil {
			return err
		}
		now := time.Now()
		res := tx.Model(&t).Where("status = ?", model.TaskStatusPending).Updates(map[string]interface{}{
			"status":     model.TaskStatusRunning,
			"started_at": &now,
		})
		if res.Error != nil {
			return res.Error
		}
		if res.RowsAffected == 0 {
			return gorm.ErrRecordNotFound
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return &t, nil
}

// Start starts the worker pool and the fallback poller. Call once at server startup.
func (s *TaskService) Start(ctx context.Context) {
	logger := log.GetContextLogger(ctx)
	settingService := middleware.GetSettingService()
	maxConcurrent, _ := settingService.GetIntSetting(ctx, model.SettingTaskMaxConcurrent, 10)
	if maxConcurrent < 1 {
		maxConcurrent = 1
	}
	for i := 0; i < maxConcurrent; i++ {
		go s.worker(ctx, i, logger)
	}
	level.Info(logger).Log("msg", "Task worker pool started", "workers", maxConcurrent)
}

func (s *TaskService) worker(ctx context.Context, id int, logger interface{}) {
	for {
		select {
		case <-ctx.Done():
			return
		case t := <-s.taskQueue:
			taskQueueLength.Dec()
			// Task from queue may still be pending in DB; claim it before running.
			if t.Status != model.TaskStatusRunning {
				claimed, err := s.claimTaskByID(ctx, t.ResourceID)
				if err != nil || claimed == nil {
					continue
				}
				t = claimed
			}
			s.runTask(ctx, t)
		}
	}
}

func (s *TaskService) runTask(pctx context.Context, t *model.Task) {
	startTime := time.Now()
	taskCtx, logger := log.NewContextLogger(pctx)
	traceID := log.GetTraceId(taskCtx)
	category := t.Category
	taskType := string(t.Type)
	taskStartedTotal.WithLabelValues(string(category), taskType).Inc()
	taskRunningGauge.WithLabelValues(taskType).Inc()
	defer func() {
		taskRunningGauge.WithLabelValues(taskType).Dec()
		taskRunDurationSeconds.WithLabelValues(taskType).Observe(time.Since(startTime).Seconds())
	}()

	cancelCh := make(chan struct{})
	s.cancelMu.Lock()
	s.cancelChans[t.ResourceID] = cancelCh
	s.cancelMu.Unlock()
	defer func() {
		s.cancelMu.Lock()
		delete(s.cancelChans, t.ResourceID)
		s.cancelMu.Unlock()
	}()

	// Bridge task logs to log storage: get backend name from task settings and tee the context logger with a task logger.
	settingService := middleware.GetSettingService()
	logStorageBackend, _ := settingService.GetStringSetting(taskCtx, model.SettingTaskLogStorageBackend, "database")
	taskLogger := taskscheduler.NewTaskLogger(taskCtx, logStorageBackend, t.ResourceID)
	tee := log.NewTeeLogger(logger, taskLogger)
	taskCtx, logger = log.NewContextLogger(taskCtx, log.WithLogger(tee), log.WithTraceId(traceID))

	runner, ok := taskscheduler.GetTaskRunner(taskCtx, t.Type)
	if !ok {
		_ = s.UpdateTaskStatus(taskCtx, t.ResourceID, string(model.TaskStatusFailed), "", "task type not registered", 0)
		taskCompletedTotal.WithLabelValues(string(category), taskType, string(model.TaskStatusFailed)).Inc()
		return
	}

	progressCallback := func(progress int) {
		if progress < 0 || progress > 100 {
			return
		}
		_ = s.UpdateTaskProgress(taskCtx, t.ResourceID, progress)
	}
	level.Info(logger).Log("msg", "Running task", "task_id", t.ResourceID, "task_type", t.Type)
	result, err := runner.Run(taskCtx, t, progressCallback, cancelCh)
	if err != nil {
		if errors.Is(err, taskscheduler.ErrCancelled) {
			_ = s.UpdateTaskStatus(taskCtx, t.ResourceID, string(model.TaskStatusCancelled), "", "cancelled", 0)
			taskCompletedTotal.WithLabelValues(string(category), taskType, string(model.TaskStatusCancelled)).Inc()
		} else {
			// Auto retry: increment auto_retry_count and if not exceeding max_retries, set task back to pending and enqueue.
			nextAutoRetry := t.AutoRetryCount + 1
			shouldRetry := t.MaxRetries > 0 && nextAutoRetry <= t.MaxRetries

			if shouldRetry {
				t.Status = model.TaskStatusPending
				t.Error = err.Error()
				t.Result = ""
				t.Progress = 0
				t.FinishedAt = nil
				t.AutoRetryCount = nextAutoRetry
				_ = db.Session(taskCtx).Model(&model.Task{}).
					Where("resource_id = ?", t.ResourceID).
					Select("status", "error", "result", "progress", "finished_at", "auto_retry_count").
					Updates(t).Error

				select {
				case s.taskQueue <- t:
					taskQueueLength.Inc()
				default:
					taskQueueOverflowTotal.WithLabelValues(string(t.Category)).Inc()
				}
			} else {
				now := time.Now()
				_ = db.Session(taskCtx).Model(&model.Task{}).Where("resource_id = ?", t.ResourceID).Updates(map[string]interface{}{
					"status":           model.TaskStatusFailed,
					"error":            err.Error(),
					"progress":         0,
					"finished_at":      &now,
					"auto_retry_count": nextAutoRetry,
				}).Error
				taskCompletedTotal.WithLabelValues(string(category), taskType, string(model.TaskStatusFailed)).Inc()
			}
		}
		level.Warn(logger).Log("msg", "Task ended", "task_id", t.ResourceID, "error", err)
		return
	}
	level.Info(logger).Log("msg", "Task ended", "task_id", t.ResourceID)
	var resultStr string
	if result != nil {
		if b, e := json.Marshal(result); e == nil {
			resultStr = string(b)
		}
	}
	_ = s.UpdateTaskStatus(taskCtx, t.ResourceID, string(model.TaskStatusSuccess), resultStr, "", 100)
	taskCompletedTotal.WithLabelValues(string(category), taskType, string(model.TaskStatusSuccess)).Inc()
}
