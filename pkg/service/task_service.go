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
	"fmt"
	"math/rand"
	"sync"
	"time"

	"github.com/go-kit/log/level"
	"github.com/google/uuid"
	"github.com/robfig/cron/v3"
	"github.com/sven-victor/ez-console/pkg/cluster"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	dbdialect "github.com/sven-victor/ez-console/pkg/db/dialect"
	"github.com/sven-victor/ez-console/pkg/eventbus"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
	"github.com/sven-victor/ez-utils/log"
	w "github.com/sven-victor/ez-utils/wrapper"
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

// WithScheduleFireKey sets the deduplication key for cron-triggered tasks.
// When two nodes fire the same job in the same cron window, only one INSERT
// wins (the other gets a DoNothing no-op) because schedule_fire_key has a
// unique index on t_task.  Non-cron tasks leave ScheduleFireKey nil so that
// MySQL's unique index (which permits multiple NULLs) is not violated.
func WithScheduleFireKey(key string) CreateTaskOption {
	return func(t *model.Task) {
		t.ScheduleFireKey = &key
	}
}

// WithNotBefore prevents the task from being claimed before the given time.
func WithNotBefore(t time.Time) CreateTaskOption {
	return func(task *model.Task) {
		task.NotBefore = w.P(t.UTC())
	}
}

// WithNotAfter marks the task as expired if it has not started by the given time.
// The reaper automatically cancels pending tasks that exceed their not_after deadline.
func WithNotAfter(t time.Time) CreateTaskOption {
	return func(task *model.Task) {
		task.NotAfter = w.P(t.UTC())
	}
}

const (
	defaultTaskQueueSize = 1000
	taskPollInterval     = 2 * time.Second
	taskFallbackInterval = 1 * time.Minute
)

type TaskService interface {
	CreateTask(ctx context.Context, taskType model.TaskType, opts ...CreateTaskOption) (*model.Task, error)
	GetTask(ctx context.Context, id string) (*model.Task, error)
	ListTasks(ctx context.Context, current, pageSize int, search string) ([]*model.Task, int64, error)
	ListTasksByCronScheduleID(ctx context.Context, cronScheduleID string, current, pageSize int) ([]*model.Task, int64, error)
	ListUserTasks(ctx context.Context, userID string) ([]*model.Task, error)
	RetryTask(ctx context.Context, id string) error
	CancelTask(ctx context.Context, id string) error
	SetTaskArtifact(ctx context.Context, id string, fileKey string, fileName string) error
	GetTaskLogs(ctx context.Context, id string) ([]model.TaskLog, error)
	DeleteTask(ctx context.Context, id string) error
	InitDefaultTaskSettings(ctx context.Context) error
	GetTaskSettings(ctx context.Context) (map[string]any, error)
	UpdateTaskSettings(ctx context.Context, settings map[string]any) error
}

const (
	taskLeaseName          = "task-reaper"
	taskLeaseRenewInterval = 30 * time.Second
	taskRenewalInterval    = 20 * time.Second
)

// taskService handles task CRUD and worker pool.
type taskService struct {
	cancelChans map[string]chan struct{}
	cancelMu    sync.RWMutex
	taskQueue   chan *model.Task
	taskQueueMu sync.Mutex
	baseService BaseService

	// wakeupCh receives signals from EventBus task.new events so workers can
	// immediately check for new tasks without waiting for the fallback poll.
	wakeupCh chan struct{}

	// workerID identifies this node's workers for lease tracking.
	workerID string

	// clusterBackend for leader election (reaper)
	clusterBackend cluster.ClusterBackend
}

var (
	taskServiceOnce sync.Once
	taskSvc         *taskService
)

// NewTaskService creates a new TaskService.
func NewTaskService(ctx context.Context, baseService BaseService) TaskService {
	taskServiceOnce.Do(func() {
		bus := GetGlobalEventBus()
		nodeID := "local"
		if bus != nil {
			nodeID = bus.NodeID()
		}
		taskSvc = &taskService{
			cancelChans:    make(map[string]chan struct{}),
			taskQueue:      make(chan *model.Task, defaultTaskQueueSize),
			wakeupCh:       make(chan struct{}, 16),
			workerID:       nodeID,
			clusterBackend: cluster.NewDBClusterBackend(db.Session(ctx)),
			baseService:    baseService,
		}

		taskscheduler.RegisterScheduledJob(&taskscheduler.ScheduledJobDef{
			ID:          "task-log-cleanup",
			Name:        "Task Log Cleanup",
			Spec:        "0 0 * * *",
			Schedule:    cron.Every(time.Hour * 24),
			Description: "Cleanup task logs and historical task run records",
			TaskType:    taskLogCleanupTaskType,
			Runner:      taskscheduler.NewFuncTaskRunner(taskSvc.runTaskLogCleanupJob),
		})

		// Subscribe to task events.
		if bus != nil {
			bus.Subscribe(func(event string, payload []byte) {
				switch event {
				case eventbus.EventTaskNew:
					select {
					case taskSvc.wakeupCh <- struct{}{}:
					default:
					}
				case eventbus.EventTaskCancel:
					// Another node published a cancel; check if we own this task.
					taskID := string(payload)
					taskSvc.cancelMu.Lock()
					ch, ok := taskSvc.cancelChans[taskID]
					taskSvc.cancelMu.Unlock()
					if ok {
						select {
						case <-ch:
						default:
							close(ch)
							taskSvc.cancelMu.Lock()
							delete(taskSvc.cancelChans, taskID)
							taskSvc.cancelMu.Unlock()
						}
					}
				}
			})
		}

		go func() {
			time.Sleep(10 * time.Second)
			taskSvc.startWorkerPool(ctx)
		}()
	})
	return taskSvc
}

// CreateTask creates a new task. CreatorID is set from context. Not exposed via HTTP.
func (s *taskService) CreateTask(ctx context.Context, taskType model.TaskType, opts ...CreateTaskOption) (*model.Task, error) {
	logger := log.GetContextLogger(ctx)
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

	dbConn := db.Session(ctx)
	if t.ScheduleFireKey != nil {
		// Use OnConflict DoNothing to deduplicate cron-triggered tasks across
		// leader nodes that race to enqueue the same job in the same fire window.
		res := dbConn.Clauses(dbdialect.OnConflictDoNothingOnColumns("schedule_fire_key")).Create(t)
		if res.Error != nil {
			return nil, res.Error
		}
		if res.RowsAffected == 0 {
			// Another node already enqueued this task for this fire window.
			level.Debug(logger).Log("msg", "Task creation skipped by schedule fire key deduplication", "task_type", taskType, "schedule_fire_key", *t.ScheduleFireKey)
			return nil, nil
		}
	} else if err := dbConn.Create(t).Error; err != nil {
		return nil, err
	}
	taskCreatedTotal.WithLabelValues(string(t.Category), string(t.Type)).Inc()
	level.Debug(logger).Log("msg", "Task created", "task_id", t.ResourceID, "task_type", t.Type, "category", t.Category, "creator_id", t.CreatorID, "cron_schedule_id", t.CronScheduleID, "not_before", t.NotBefore, "not_after", t.NotAfter)
	// Publish wakeup event so workers on this and other nodes poll immediately.
	if bus := GetGlobalEventBus(); bus != nil {
		_ = bus.Publish(ctx, eventbus.EventTaskNew, []byte(t.ResourceID))
		level.Debug(logger).Log("msg", "Published task wakeup event", "task_id", t.ResourceID, "task_type", t.Type)
	}
	s.wakeWorkers()
	return t, nil
}

// GetTask returns a task by ID. Enforces visibility: admin or creator.
func (s *taskService) GetTask(ctx context.Context, id string) (*model.Task, error) {
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
func (s *taskService) ListTasks(ctx context.Context, current, pageSize int, search string) ([]*model.Task, int64, error) {
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
func (s *taskService) ListTasksByCronScheduleID(ctx context.Context, cronScheduleID string, current, pageSize int) ([]*model.Task, int64, error) {
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
func (s *taskService) ListUserTasks(ctx context.Context, userID string) ([]*model.Task, error) {
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

func (s *taskService) canAccess(ctx context.Context, creatorID string) bool {
	if middleware.HasGlobalRolePermission(ctx, "task:list") || middleware.HasGlobalRolePermission(ctx, "task:view") {
		return true
	}
	return middleware.GetUserIDFromContext(ctx) == creatorID
}

// updateTaskStatus updates status, result, error, progress, and optionally finished_at.
func (s *taskService) updateTaskStatus(ctx context.Context, id, status, result, errMsg string, progress int) error {
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

// updateTaskProgress updates only progress.
func (s *taskService) updateTaskProgress(ctx context.Context, id string, progress int) error {
	return db.Session(ctx).Model(&model.Task{}).Where("resource_id = ?", id).Update("progress", progress).Error
}

// SetTaskArtifact sets the artifact file key for download.
func (s *taskService) SetTaskArtifact(ctx context.Context, id string, fileKey string, fileName string) error {
	return db.Session(ctx).Model(&model.Task{}).
		Where("resource_id = ?", id).
		Updates(map[string]interface{}{
			"artifact_file_key":  fileKey,
			"artifact_file_name": fileName,
		}).Error
}

// CancelTask signals the running task to cancel.
// For pending tasks it sets status directly to cancelled.
// For running tasks it sets cancel_requested=true in DB and publishes a
// task.cancel event so all nodes (including the one running the task) cancel it.
func (s *taskService) CancelTask(ctx context.Context, id string) error {
	t, err := s.GetTask(ctx, id)
	if err != nil {
		return err
	}
	if t.Status != model.TaskStatusRunning && t.Status != model.TaskStatusPending {
		return nil
	}
	if t.Status == model.TaskStatusPending {
		return s.updateTaskStatus(ctx, id, string(model.TaskStatusCancelled), "", "", 0)
	}

	// Running task: set cancel_requested in DB (picked up by lease renewal loop)
	// and broadcast via EventBus for immediate wakeup of the owning node.
	if err := db.Session(ctx).Model(&model.Task{}).
		Where("resource_id = ?", id).
		Update("cancel_requested", true).Error; err != nil {
		return fmt.Errorf("failed to set cancel_requested: %w", err)
	}
	if bus := GetGlobalEventBus(); bus != nil {
		_ = bus.Publish(ctx, eventbus.EventTaskCancel, []byte(id))
	}
	// Also cancel locally if this node is running the task.
	s.cancelMu.Lock()
	ch, ok := s.cancelChans[id]
	s.cancelMu.Unlock()
	if ok {
		select {
		case <-ch:
		default:
			close(ch)
			s.cancelMu.Lock()
			delete(s.cancelChans, id)
			s.cancelMu.Unlock()
		}
	}
	return nil
}

// RetryTask resets task to pending and clears error so it can be picked up again.
func (s *taskService) RetryTask(ctx context.Context, id string) error {
	logger := log.GetContextLogger(ctx)
	t, err := s.GetTask(ctx, id)
	if err != nil {
		return err
	}
	if t.Status != model.TaskStatusFailed && t.Status != model.TaskStatusCancelled {
		return nil
	}
	if err := db.Session(ctx).Model(&model.Task{}).Where("resource_id = ?", id).Updates(map[string]interface{}{
		"status":           model.TaskStatusPending,
		"error":            "",
		"result":           "",
		"progress":         0,
		"started_at":       nil,
		"finished_at":      nil,
		"retry_count":      t.RetryCount + 1,
		"auto_retry_count": 0,
		"worker_id":        nil,
		"lease_expires_at": nil,
		"claim_token":      "",
	}).Error; err != nil {
		return err
	}
	if bus := GetGlobalEventBus(); bus != nil {
		_ = bus.Publish(ctx, eventbus.EventTaskNew, []byte(id))
		level.Debug(logger).Log("msg", "Published task retry wakeup event", "task_id", id, "task_type", t.Type)
	}
	s.wakeWorkers()
	level.Debug(logger).Log("msg", "Task reset for retry", "task_id", id, "task_type", t.Type, "retry_count", t.RetryCount+1)
	return nil
}

// DeleteTask soft-deletes a task. Enforces creator or admin.
func (s *taskService) DeleteTask(ctx context.Context, id string) error {
	t, err := s.GetTask(ctx, id)
	if err != nil {
		return err
	}
	return db.Session(ctx).Delete(t).Error
}

// GetTaskLogs returns stored log entries for a task. Enforces same visibility as GetTask (admin or creator).
// Uses the log storage backend selected in task settings.
func (s *taskService) GetTaskLogs(ctx context.Context, id string) ([]model.TaskLog, error) {
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

// claimNextPending atomically claims one pending task that is within its
// execution window (not_before <= NOW, not_after > NOW or unset).
//
// For MySQL and PostgreSQL a single-statement UPDATE is used (no explicit
// transaction) so that concurrent workers never contend on the same row.
// For SQLite a transaction + SELECT FOR UPDATE fallback is used instead because
// SQLite serialises writes via its file lock, making SKIP LOCKED unnecessary.
func (s *taskService) claimNextPending(ctx context.Context) (*model.Task, error) {
	logger := log.GetContextLogger(ctx)
	dbConn := db.Session(ctx)
	cfg := config.GetConfig()
	leaseTTL := cfg.Cluster.GetTaskLeaseTTL()

	// Resolve the GORM table name so we can build dialect-specific raw SQL.
	stmt := &gorm.Statement{DB: dbConn}
	_ = stmt.Parse(&model.Task{})
	tableName := stmt.Table

	claimToken := uuid.New().String()

	// Attempt atomic single-statement UPDATE (MySQL / PostgreSQL).
	claimed, err := dbdialect.AtomicClaimTask(dbConn, tableName, claimToken, s.workerID, leaseTTL)
	if err != nil {
		return nil, err
	}
	if claimed {
		var t model.Task
		if err := dbConn.Where("claim_token = ? AND status = ?", claimToken, model.TaskStatusRunning).First(&t).Error; err != nil {
			return nil, err
		}
		return &t, nil
	}

	// AtomicClaimTask returns (false, nil) either because:
	//   a) MySQL/PostgreSQL: no eligible pending task exists → surface as ErrRecordNotFound.
	//   b) SQLite: fallback required.
	if dbConn.Dialector.Name() != "sqlite" {
		return nil, gorm.ErrRecordNotFound
	}

	// SQLite fallback: transaction + SELECT FOR UPDATE (plain, no SKIP LOCKED).
	var t model.Task
	err = dbConn.Transaction(func(tx *gorm.DB) error {
		level.Debug(logger).Log("msg", "Claiming task", "worker_id", s.workerID)
		res := dbdialect.LockSkipLocked(tx).
			Where("status = ? AND (not_before IS NULL OR not_before <= ?) AND (not_after IS NULL OR not_after > ?)",
				model.TaskStatusPending, dbdialect.Now(tx), dbdialect.Now(tx)).
			Order("created_at ASC").
			Limit(1).
			First(&t)
		if res.Error != nil {
			return res.Error
		}
		now := time.Now()
		return tx.Model(&t).Updates(map[string]interface{}{
			"status":           model.TaskStatusRunning,
			"started_at":       &now,
			"worker_id":        s.workerID,
			"lease_expires_at": dbdialect.NowPlus(tx, leaseTTL),
		}).Error
	})
	if err != nil {
		return nil, err
	}
	return &t, nil
}

// renewTaskLease refreshes the lease_expires_at for a running task.
func (s *taskService) renewTaskLease(ctx context.Context, taskID string) error {
	cfg := config.GetConfig()
	leaseTTL := cfg.Cluster.GetTaskLeaseTTL()
	dbConn := db.Session(ctx)
	return dbConn.Model(&model.Task{}).
		Where("resource_id = ? AND status = ? AND worker_id = ?", taskID, model.TaskStatusRunning, s.workerID).
		Update("lease_expires_at", dbdialect.NowPlus(dbConn, leaseTTL)).Error
}

// startWorkerPool starts the worker goroutines, a DB poller (fallback for missed
// EventBus wakeup events), and the leader-only task reaper.
func (s *taskService) startWorkerPool(ctx context.Context) {
	logger := log.GetContextLogger(ctx)
	settingService := middleware.GetSettingService()
	maxConcurrent, _ := settingService.GetIntSetting(ctx, model.SettingTaskMaxConcurrent, 10)
	if maxConcurrent < 1 {
		maxConcurrent = 1
	}
	for i := 0; i < maxConcurrent; i++ {
		go s.worker(ctx, i)
	}
	go s.pollLoop(ctx)
	go s.reaperLoop(ctx)
	s.wakeWorkers()
	level.Info(logger).Log("msg", "Task worker pool started", "workers", maxConcurrent)
}

// wakeWorkers signals pollLoop to claim pending tasks from DB without blocking.
func (s *taskService) wakeWorkers() {
	select {
	case s.wakeupCh <- struct{}{}:
	default:
	}
}

// drainWakeupCh discards coalesced wakeup signals already buffered in wakeupCh.
func (s *taskService) drainWakeupCh() {
	for {
		select {
		case <-s.wakeupCh:
		default:
			return
		}
	}
}

func (s *taskService) hasTaskQueueCapacity() bool {
	return len(s.taskQueue) < cap(s.taskQueue)
}

func jitteredFallbackInterval(base time.Duration) time.Duration {
	if base <= 0 {
		base = taskFallbackInterval
	}
	return base + time.Duration(rand.Int63n(int64(base/5)))
}

// pollLoop claims pending tasks from DB. EventBus wakeups trigger immediate
// batch claiming; a fallback timer fires periodically to recover missed wakeups.
//
// Claiming strategy (claimUntilIdle):
//   - Loop: check queue capacity → claim one task → repeat.
//   - Stop when the queue is full (capped): worker completion calls wakeWorkers()
//     so the next claim will happen via the wakeup path, not the timer.
//   - Stop when claimNextPending finds no eligible task (drained).
//   - After either stop condition, reset the timer to the long fallback interval.
//     The short-poll (taskPollInterval) timer is intentionally not used: the
//     wakeWorkers() calls from worker completion and CreateTask already provide
//     the low-latency trigger; the fallback timer is purely a safety net.
func (s *taskService) pollLoop(ctx context.Context) {
	cfg := config.GetConfig()
	long := cfg.Cluster.GetTaskFallbackPollInterval()

	timer := time.NewTimer(jitteredFallbackInterval(long))
	defer timer.Stop()

	resetTimer := func(d time.Duration) {
		if !timer.Stop() {
			select {
			case <-timer.C:
			default:
			}
		}
		timer.Reset(d)
	}

	// claimUntilIdle drains all immediately executable pending tasks into the
	// local queue, stopping early if the queue becomes full.
	claimUntilIdle := func(ctx context.Context) (int, string) {
		claimed := 0
		for {
			if !s.hasTaskQueueCapacity() {
				return claimed, "queue_full" // capped: workers will call wakeWorkers() when they free slots
			}
			if !s.tryClaimAndWake(ctx) {
				return claimed, "idle" // drained: no more eligible pending tasks (or transient DB error)
			}
			claimed++
		}
	}

	handlePoll := func(trigger string) {
		ctx, logger := log.NewContextLogger(ctx)
		level.Debug(logger).Log("msg", "Task poll triggered", "trigger", trigger, "worker_id", s.workerID, "queue_len", len(s.taskQueue), "queue_cap", cap(s.taskQueue))
		claimed, stopReason := claimUntilIdle(ctx)
		nextPoll := jitteredFallbackInterval(long)
		resetTimer(nextPoll)
		level.Debug(logger).Log("msg", "Task poll completed", "trigger", trigger, "claimed", claimed, "stop_reason", stopReason, "next_poll", nextPoll.String(), "worker_id", s.workerID, "queue_len", len(s.taskQueue), "queue_cap", cap(s.taskQueue))
	}

	for {
		select {
		case <-ctx.Done():
			return
		case <-s.wakeupCh:
			s.drainWakeupCh()
			handlePoll("wakeup")
		case <-timer.C:
			handlePoll("fallback_timer")
		}
	}
}

// tryClaimAndWake atomically claims one pending task and enqueues it locally.
// Returns true when a task was claimed and enqueued.
func (s *taskService) tryClaimAndWake(ctx context.Context) bool {
	logger := log.GetContextLogger(ctx)
	if !s.hasTaskQueueCapacity() {
		level.Debug(logger).Log("msg", "Skip task claim because local queue is full", "queue_len", len(s.taskQueue), "queue_cap", cap(s.taskQueue), "worker_id", s.workerID)
		return false
	}
	t, err := s.claimNextPending(ctx)
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			level.Warn(logger).Log("msg", "Failed to claim pending task", "error", err, "worker_id", s.workerID)
		}
		return false
	}
	select {
	case s.taskQueue <- t:
		taskQueueLength.Inc()
		level.Debug(logger).Log("msg", "Task claimed and queued", "task_id", t.ResourceID, "task_type", t.Type, "category", t.Category, "worker_id", s.workerID, "queue_len", len(s.taskQueue), "queue_cap", cap(s.taskQueue))
		return true
	default:
		taskQueueOverflowTotal.WithLabelValues(string(t.Category)).Inc()
		level.Warn(logger).Log("msg", "Task queue overflow after claim", "task_id", t.ResourceID, "task_type", t.Type, "category", t.Category, "worker_id", s.workerID, "queue_len", len(s.taskQueue), "queue_cap", cap(s.taskQueue))
		return false
	}
}

func (s *taskService) worker(ctx context.Context, workerIndex int) {
	logger := log.GetContextLogger(ctx)
	level.Debug(logger).Log("msg", "Task worker started", "worker_index", workerIndex, "worker_id", s.workerID)
	for {
		select {
		case <-ctx.Done():
			level.Debug(logger).Log("msg", "Task worker stopped", "worker_index", workerIndex, "worker_id", s.workerID)
			return
		case t := <-s.taskQueue:
			taskQueueLength.Dec()
			level.Debug(logger).Log("msg", "Task dequeued by worker", "task_id", t.ResourceID, "task_type", t.Type, "worker_index", workerIndex, "worker_id", s.workerID, "queue_len", len(s.taskQueue))
			s.runTask(ctx, t)
			s.wakeWorkers()
		}
	}
}

// reaperLoop is leader-only.  It runs every 30 s and resets tasks whose
// lease has expired so they can be picked up by another worker.
func (s *taskService) reaperLoop(ctx context.Context) {
	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			s.reapExpiredLeases(ctx)
		}
	}
}

func (s *taskService) reapExpiredLeases(ctx context.Context) {
	logger := log.GetContextLogger(ctx)
	cfg := config.GetConfig()
	if cfg.Cluster.Enabled {
		level.Debug(logger).Log("msg", "Checking if this node is leader", "worker_id", s.workerID)
		ok, err := s.clusterBackend.IsLeader(ctx, taskLeaseName, s.workerID)
		if err != nil || !ok {
			// Ensure this node holds the reaper lease (best-effort: no-op for non-leader)
			_, _ = s.clusterBackend.AcquireLease(ctx, taskLeaseName, s.workerID, 60*time.Second)
			ok, _ = s.clusterBackend.IsLeader(ctx, taskLeaseName, s.workerID)
			if !ok {
				level.Debug(logger).Log("msg", "Skip task reaper because this node is not leader", "worker_id", s.workerID)
				return
			}
		}
	}
	dbConn := db.Session(ctx)

	level.Debug(logger).Log("msg", "Reaping expired leases", "worker_id", s.workerID)
	// Reset running tasks whose lease has expired back to pending so another
	// worker can pick them up (handles crashed or unresponsive nodes).
	resetRes := dbConn.Model(&model.Task{}).
		Where("status = ? AND lease_expires_at < ?", model.TaskStatusRunning, dbdialect.Now(dbConn)).
		Updates(map[string]any{
			"status":           model.TaskStatusPending,
			"worker_id":        nil,
			"lease_expires_at": nil,
			"claim_token":      "",
		})
	if resetRes.Error != nil {
		level.Warn(logger).Log("msg", "Failed to reap expired task leases", "error", resetRes.Error, "worker_id", s.workerID)
	} else if resetRes.RowsAffected > 0 {
		level.Info(logger).Log("msg", "Expired task leases reset", "tasks", resetRes.RowsAffected, "worker_id", s.workerID)
	}

	level.Debug(logger).Log("msg", "Cancelling expired pending tasks", "worker_id", s.workerID)
	// Cancel pending tasks that have exceeded their not_after deadline.
	// This prevents stale tasks from clogging the pending queue indefinitely.
	cancelRes := dbConn.Model(&model.Task{}).
		Where("status = ? AND not_after IS NOT NULL AND not_after < ?",
			model.TaskStatusPending, dbdialect.Now(dbConn)).
		Updates(map[string]any{
			"status":      model.TaskStatusCancelled,
			"error":       "task expired: not_after deadline passed",
			"finished_at": dbdialect.Now(dbConn),
		})
	if cancelRes.Error != nil {
		level.Warn(logger).Log("msg", "Failed to cancel expired pending tasks", "error", cancelRes.Error, "worker_id", s.workerID)
	} else if cancelRes.RowsAffected > 0 {
		level.Info(logger).Log("msg", "Expired pending tasks cancelled", "tasks", cancelRes.RowsAffected, "worker_id", s.workerID)
	}
}

func (s *taskService) runTask(pctx context.Context, t *model.Task) {
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

	// Lease renewal + cancel_requested polling goroutine.
	renewStop := make(chan struct{})
	go func() {
		ticker := time.NewTicker(taskRenewalInterval)
		defer ticker.Stop()
		for {
			select {
			case <-renewStop:
				return
			case <-ticker.C:
				_ = s.renewTaskLease(taskCtx, t.ResourceID)
				// Check cancel_requested from DB (cross-node cancel support).
				var row model.Task
				if err := db.Session(taskCtx).Select("cancel_requested").
					Where("resource_id = ?", t.ResourceID).First(&row).Error; err == nil {
					if row.CancelRequested {
						select {
						case <-cancelCh:
						default:
							close(cancelCh)
							s.cancelMu.Lock()
							delete(s.cancelChans, t.ResourceID)
							s.cancelMu.Unlock()
						}
					}
				}
			}
		}
	}()
	defer close(renewStop)

	// Bridge task logs to log storage: get backend name from task settings and tee the context logger with a task logger.
	settingService := middleware.GetSettingService()
	logStorageBackend, _ := settingService.GetStringSetting(taskCtx, model.SettingTaskLogStorageBackend, "database")
	taskLogger := taskscheduler.NewTaskLogger(taskCtx, logStorageBackend, t.ResourceID)
	tee := log.NewTeeLogger(logger, taskLogger)
	taskCtx, logger = log.NewContextLogger(taskCtx, log.WithLogger(tee), log.WithTraceId(traceID))

	runner, ok := taskscheduler.GetTaskRunner(taskCtx, t.Type)
	if !ok {
		_ = s.updateTaskStatus(taskCtx, t.ResourceID, string(model.TaskStatusFailed), "", "task type not registered", 0)
		taskCompletedTotal.WithLabelValues(string(category), taskType, string(model.TaskStatusFailed)).Inc()
		return
	}

	progressCallback := func(progress int) {
		if progress < 0 || progress > 100 {
			return
		}
		_ = s.updateTaskProgress(taskCtx, t.ResourceID, progress)
	}
	level.Info(logger).Log("msg", "Running task", "task_id", t.ResourceID, "task_type", t.Type)
	result, err := runner.Run(taskCtx, t, progressCallback, cancelCh)
	if err != nil {
		if errors.Is(err, taskscheduler.ErrCancelled) {
			_ = s.updateTaskStatus(taskCtx, t.ResourceID, string(model.TaskStatusCancelled), "", "cancelled", 0)
			taskCompletedTotal.WithLabelValues(string(category), taskType, string(model.TaskStatusCancelled)).Inc()
		} else {
			// Auto retry: increment auto_retry_count and if not exceeding max_retries, set task back to pending and enqueue.
			nextAutoRetry := t.AutoRetryCount + 1
			shouldRetry := t.MaxRetries > 0 && nextAutoRetry <= t.MaxRetries

			if shouldRetry {
				_ = db.Session(taskCtx).Model(&model.Task{}).
					Where("resource_id = ?", t.ResourceID).
					Updates(map[string]interface{}{
						"status":           model.TaskStatusPending,
						"error":            err.Error(),
						"result":           "",
						"progress":         0,
						"finished_at":      nil,
						"auto_retry_count": nextAutoRetry,
						"worker_id":        nil,
						"lease_expires_at": nil,
						"claim_token":      "",
					}).Error
				s.wakeWorkers()
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
	_ = s.updateTaskStatus(taskCtx, t.ResourceID, string(model.TaskStatusSuccess), resultStr, "", 100)
	taskCompletedTotal.WithLabelValues(string(category), taskType, string(model.TaskStatusSuccess)).Inc()
}
