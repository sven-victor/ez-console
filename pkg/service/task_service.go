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
	"github.com/sven-victor/ez-console/pkg/task"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
)

// TaskCompletionCallback is invoked when a task completes (success or failure).
type TaskCompletionCallback func(taskID string, status string, result interface{}, err error)

// CreateTaskOption configures task creation.
type CreateTaskOption func(*model.Task, *createTaskOpts)

type createTaskOpts struct {
	onComplete TaskCompletionCallback
}

// WithPayload sets the task payload (JSON string).
func WithPayload(payload string) CreateTaskOption {
	return func(t *model.Task, _ *createTaskOpts) {
		t.Payload = payload
	}
}

// WithMaxRetries sets the maximum retry count.
func WithMaxRetries(n int) CreateTaskOption {
	return func(t *model.Task, _ *createTaskOpts) {
		t.MaxRetries = n
	}
}

// WithOnComplete registers a callback when the task completes.
func WithOnComplete(cb TaskCompletionCallback) CreateTaskOption {
	return func(_ *model.Task, o *createTaskOpts) {
		o.onComplete = cb
	}
}

// TaskService handles task CRUD and worker pool.
type TaskService struct {
	settingService *SettingService
	cancelChans    map[string]chan struct{}
	cancelMu       sync.RWMutex
	callbacks      map[string]TaskCompletionCallback
	callbacksMu    sync.RWMutex
	pollInterval   time.Duration
}

// NewTaskService creates a new TaskService.
func NewTaskService(settingService *SettingService) *TaskService {
	return &TaskService{
		settingService: settingService,
		cancelChans:    make(map[string]chan struct{}),
		callbacks:      make(map[string]TaskCompletionCallback),
		pollInterval:   2 * time.Second,
	}
}

// CreateTask creates a new task. CreatorID is set from context. Not exposed via HTTP.
func (s *TaskService) CreateTask(ctx context.Context, taskType string, opts ...CreateTaskOption) (*model.Task, error) {
	creatorID := middleware.GetUserIDFromContext(ctx)
	if creatorID == "" {
		creatorID = "system"
	}
	t := &model.Task{
		Type:      taskType,
		Status:    model.TaskStatusPending,
		Progress:  0,
		CreatorID: creatorID,
	}
	opt := &createTaskOpts{}
	for _, o := range opts {
		o(t, opt)
	}
	if err := db.Session(ctx).Create(t).Error; err != nil {
		return nil, err
	}
	if opt.onComplete != nil {
		s.callbacksMu.Lock()
		s.callbacks[t.ResourceID] = opt.onComplete
		s.callbacksMu.Unlock()
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

// ListTasks returns paginated tasks. Non-admin users only see their own.
func (s *TaskService) ListUserTasks(ctx context.Context, userID string) ([]*model.Task, error) {
	query := db.Session(ctx).Model(&model.Task{})
	query = query.Where("creator_id = ?", userID).Where("(created_at > ?) OR (status in ?)", time.Now().Add(-time.Hour*24), []model.TaskStatus{model.TaskStatusRunning, model.TaskStatusPending})
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

// claimNextPendingTask atomically claims one pending task and sets it to running. Returns nil if none.
func (s *TaskService) claimNextPendingTask(ctx context.Context) (*model.Task, error) {
	var t model.Task
	err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("status = ?", model.TaskStatusPending).Order("created_at ASC").First(&t).Error; err != nil {
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

// invokeCallback invokes the per-task completion callback if registered.
func (s *TaskService) invokeCallback(taskID string, status string, result interface{}, err error) {
	s.callbacksMu.Lock()
	cb, ok := s.callbacks[taskID]
	if ok {
		delete(s.callbacks, taskID)
	}
	s.callbacksMu.Unlock()
	if ok && cb != nil {
		cb(taskID, status, result, err)
	}
}

// Start starts the worker pool. Call once at server startup.
func (s *TaskService) Start(ctx context.Context) {
	logger := log.GetContextLogger(ctx)
	maxConcurrent, _ := s.settingService.GetIntSetting(ctx, model.SettingTaskMaxConcurrent, 10)
	if maxConcurrent < 1 {
		maxConcurrent = 1
	}
	for i := 0; i < maxConcurrent; i++ {
		go s.worker(ctx, i, logger)
	}
	level.Info(logger).Log("msg", "Task worker pool started", "workers", maxConcurrent)
}

func (s *TaskService) worker(ctx context.Context, id int, logger interface{}) {
	ticker := time.NewTicker(s.pollInterval)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			t, err := s.claimNextPendingTask(ctx)
			if err != nil || t == nil {
				continue
			}
			s.runTask(ctx, t)
		}
	}
}

func (s *TaskService) runTask(ctx context.Context, t *model.Task) {
	logger := log.GetContextLogger(ctx)
	cancelCh := make(chan struct{})
	s.cancelMu.Lock()
	s.cancelChans[t.ResourceID] = cancelCh
	s.cancelMu.Unlock()
	defer func() {
		s.cancelMu.Lock()
		delete(s.cancelChans, t.ResourceID)
		s.cancelMu.Unlock()
	}()

	runner, ok := task.GetTaskRunner(t.Type)
	if !ok {
		_ = s.UpdateTaskStatus(ctx, t.ResourceID, string(model.TaskStatusFailed), "", "task type not registered", 0)
		s.invokeCallback(t.ResourceID, string(model.TaskStatusFailed), nil, nil)
		return
	}

	progressCallback := func(progress int) {
		_ = s.UpdateTaskProgress(ctx, t.ResourceID, progress)
	}
	result, err := runner.Run(ctx, t, progressCallback, cancelCh)
	if err != nil {
		if errors.Is(err, task.ErrCancelled) {
			_ = s.UpdateTaskStatus(ctx, t.ResourceID, string(model.TaskStatusCancelled), "", "cancelled", 0)
			s.invokeCallback(t.ResourceID, string(model.TaskStatusCancelled), nil, err)
		} else {
			_ = s.UpdateTaskStatus(ctx, t.ResourceID, string(model.TaskStatusFailed), "", err.Error(), 0)
			s.invokeCallback(t.ResourceID, string(model.TaskStatusFailed), nil, err)
		}
		level.Debug(logger).Log("msg", "Task ended", "task_id", t.ResourceID, "error", err)
		return
	}
	var resultStr string
	if result != nil {
		if b, e := json.Marshal(result); e == nil {
			resultStr = string(b)
		}
	}
	_ = s.UpdateTaskStatus(ctx, t.ResourceID, string(model.TaskStatusSuccess), resultStr, "", 100)
	s.invokeCallback(t.ResourceID, string(model.TaskStatusSuccess), result, nil)
}
