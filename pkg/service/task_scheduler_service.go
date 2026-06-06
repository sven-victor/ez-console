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
	"strconv"
	"sync"
	"time"

	"github.com/go-kit/log/level"
	"github.com/robfig/cron/v3"
	"github.com/sven-victor/ez-console/pkg/cluster"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/eventbus"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/signals"
	"gorm.io/gorm/clause"
)

// ScheduledJobState is the runtime state of a scheduled job (for API listing).
type ScheduledJobState struct {
	ID          string     `json:"id"`
	Name        string     `json:"name"`
	Spec        string     `json:"spec"`
	Description string     `json:"description"`
	TaskType    string     `json:"task_type"`
	Enabled     bool       `json:"enabled"`
	NextRun     *time.Time `json:"next_run,omitempty"`
	LastRun     *time.Time `json:"last_run,omitempty"`
}

type TaskSchedulerService interface {
	TaskService
	ListScheduledJobsWithState() []ScheduledJobState
	ToggleEnabled(id string, enabled bool) error
	TriggerNow(ctx context.Context, id string) (*model.Task, error)
}

const schedulerLeaseName = "scheduler"

// SchedulerService runs registered cron jobs and creates tasks via TaskService.
// In a multi-node cluster, jobs are only dispatched by the leader node.
type taskSchedulerService struct {
	TaskService
	cron     *cron.Cron
	entryIDs map[string]cron.EntryID
	lastRun  map[string]time.Time
	mu       sync.RWMutex

	// svcCtx is the server-lifecycle context used for DB operations in
	// EventBus handlers (which don't receive a per-request context).
	svcCtx context.Context

	// cluster coordination
	clusterBackend cluster.ClusterBackend
	nodeID         string
	leaderMu       sync.RWMutex
	leader         bool
	leaderWakeupCh chan struct{}
	stopCh         chan struct{}
}

var (
	taskSchedulerServiceOnce  sync.Once
	taskSchedulerShutdownOnce sync.Once
	taskSchedulerSvc          *taskSchedulerService
)

// NewSchedulerService creates a SchedulerService. Call Start to begin running schedules.
func NewSchedulerService(ctx context.Context, baseService BaseService) TaskSchedulerService {
	taskSchedulerServiceOnce.Do(func() {
		taskService := NewTaskService(ctx, baseService)
		bus := GetGlobalEventBus()
		nodeID := "local"
		if bus != nil {
			nodeID = bus.NodeID()
		}
		backend := cluster.NewDBClusterBackend(db.Session(ctx))
		svc := &taskSchedulerService{
			TaskService:    taskService,
			cron:           cron.New(),
			entryIDs:       make(map[string]cron.EntryID),
			lastRun:        make(map[string]time.Time),
			svcCtx:         ctx,
			clusterBackend: backend,
			nodeID:         nodeID,
			stopCh:         make(chan struct{}),
			leaderWakeupCh: make(chan struct{}, 1),
		}
		taskSchedulerSvc = svc

		// Subscribe to schedule.changed events so all nodes apply enable/disable
		// toggles published by any node (including the local one after a
		// ToggleEnabled call).  scheduler.lease.released wakes leaderLoop to
		// retry AcquireLease immediately after another node releases the lease.
		if bus := GetGlobalEventBus(); bus != nil {
			bus.Subscribe(func(ev string, payload []byte) {
				switch ev {
				case eventbus.EventScheduleChanged:
					svc.handleScheduleChanged(payload)
				case eventbus.EventSchedulerLeaseReleased:
					select {
					case svc.leaderWakeupCh <- struct{}{}:
					default:
					}
				}
			})
		}

		go func() {
			time.Sleep(10 * time.Second)
			svc.start(ctx)
		}()
		_, logger := log.NewContextLogger(ctx)
		stopCh := signals.SetupSignalHandler(logger)
		stopCh.PreStop(signals.LevelRequest, func() {
			svc.stop(ctx)
			stopCtx := taskSchedulerSvc.cron.Stop()
			<-stopCtx.Done()
		})
	})
	return taskSchedulerSvc
}

// isLeader returns true when this node currently holds the scheduler lease.
// In single-node (cluster.enabled=false) mode always returns true.
func (s *taskSchedulerService) isLeader() bool {
	cfg := config.GetConfig()
	if !cfg.Cluster.Enabled {
		return true
	}
	s.leaderMu.RLock()
	defer s.leaderMu.RUnlock()
	return s.leader
}

// tryAcquireLeader attempts to acquire or renew the scheduler lease and updates
// the local leader flag from the DB result.
func (s *taskSchedulerService) tryAcquireLeader(ctx context.Context) {
	leaseTTL := config.GetConfig().Cluster.GetSchedulerLeaseTTL()
	ok, err := s.clusterBackend.AcquireLease(ctx, schedulerLeaseName, s.nodeID, leaseTTL)
	if err != nil {
		return
	}
	s.leaderMu.Lock()
	wasLeader := s.leader
	s.leader = ok
	s.leaderMu.Unlock()
	if ok && !wasLeader {
		_, logger := log.NewContextLogger(ctx)
		level.Info(logger).Log("msg", "became scheduler leader", "node_id", s.nodeID)
	}
}

func (s *taskSchedulerService) stop(ctx context.Context) {
	s.stopCh <- struct{}{}
	s.leaderMu.RLock()
	wasLeader := s.leader
	s.leaderMu.RUnlock()
	if wasLeader {
		if err := s.clusterBackend.ReleaseLease(ctx, schedulerLeaseName, s.nodeID); err == nil {
			if bus := GetGlobalEventBus(); bus != nil {
				_, logger := log.NewContextLogger(ctx)
				level.Debug(logger).Log("msg", "Just became leader: publish event so other nodes know.")
				_ = bus.Publish(ctx, eventbus.EventSchedulerLeaseReleased, []byte(s.nodeID))
				time.Sleep(1 * time.Second)
			}
		}
	}
	s.leaderMu.Lock()
	s.leader = false
	s.leaderMu.Unlock()
}

// leaderLoop continuously tries to acquire and renew the scheduler lease.
func (s *taskSchedulerService) leaderLoop(ctx context.Context) {
	renewInterval := config.GetConfig().Cluster.GetSchedulerLeaseRenewInterval()
	ticker := time.NewTicker(renewInterval)
	defer ticker.Stop()

	for {
		select {
		case <-s.stopCh:
			return
		case <-s.leaderWakeupCh:
			logger := log.GetContextLogger(ctx)
			level.Info(logger).Log("msg", "Leader wakeup")
			time.Sleep(time.Second)
			s.tryAcquireLeader(ctx)
		case <-ticker.C:
			logger := log.GetContextLogger(ctx)
			level.Info(logger).Log("msg", "Ticker tick")
			s.tryAcquireLeader(ctx)
		}
	}
}

// start starts the cron scheduler, leader election loop, and adds all enabled registered jobs.
// It loads persisted state from t_scheduled_job_state before registering jobs.
func (s *taskSchedulerService) start(ctx context.Context) {
	cfg := config.GetConfig()
	if cfg.Cluster.Enabled {
		go s.leaderLoop(ctx)
	} else {
		// Single-node: always leader.
		s.leaderMu.Lock()
		s.leader = true
		s.leaderMu.Unlock()
	}

	// Load persisted job states from DB to reconcile enabled flags and last_run.
	var dbStates []model.ScheduledJobState
	_ = db.Session(ctx).Find(&dbStates).Error
	dbStateMap := make(map[string]model.ScheduledJobState, len(dbStates))
	for _, st := range dbStates {
		dbStateMap[st.ID] = st
	}

	s.mu.Lock()
	defer s.mu.Unlock()
	for _, def := range taskscheduler.ListScheduledJobs() {
		if st, ok := dbStateMap[def.ID]; ok {
			// Apply persisted enabled state.
			def.Enabled = st.Enabled
			if st.LastRun != nil {
				s.lastRun[def.ID] = *st.LastRun
			}
		}
		if def.Enabled {
			s.addJobLocked(ctx, def)
		}
	}
	s.cron.Start()
}

func (s *taskSchedulerService) addJobLocked(ctx context.Context, def *taskscheduler.ScheduledJobDef) {
	if _, ok := s.entryIDs[def.ID]; ok {
		return
	}

	// Ensure Schedule is populated so the job function can compute the next
	// fire time for the not_after deadline. ParseStandard handles the standard
	// 5-field cron format used by AddJob; Schedule-based jobs already have it set.
	if def.Schedule == nil && def.Spec != "" {
		if parsed, err := cron.ParseStandard(def.Spec); err == nil {
			def.Schedule = parsed
		}
	}

	defCopy := def
	jobFunc := cron.FuncJob(func() {
		if !s.isLeader() {
			return
		}
		now := time.Now()
		payload := defCopy.PayloadBuilder()
		// scheduleFireKey deduplicates concurrent leader nodes that fire the same job
		// in the same scheduling window.  The key encodes the job ID and the Unix
		// timestamp of "now" rounded to the cron interval so it is stable.
		scheduleFireKey := fmt.Sprintf("%s:%s", defCopy.ID, strconv.FormatInt(now.Unix(), 10))

		opts := []CreateTaskOption{
			WithPayload(payload),
			WithMaxRetries(defCopy.MaxRetries),
			WithCategory(model.TaskCategorySystem),
			WithCronScheduleID(defCopy.ID),
			WithScheduleFireKey(scheduleFireKey),
			// Allow a 1-second back-dated window so minor clock skew between the
			// cron scheduler and the worker does not cause premature rejection.
			WithNotBefore(now.Add(-time.Second)),
		}
		// By default set not_after to the next scheduled fire time so that a
		// task that was not picked up within its scheduling window is discarded
		// rather than running stale. Opt out with DisableNotAfter=true for jobs
		// that must always run regardless of scheduling lag.
		if !defCopy.DisableNotAfter && defCopy.Schedule != nil {
			nextRun := defCopy.Schedule.Next(now)
			opts = append(opts, WithNotAfter(nextRun))
		}

		_, _ = s.TaskService.CreateTask(context.Background(), defCopy.TaskType, opts...)
		s.mu.Lock()
		s.lastRun[defCopy.ID] = now
		s.mu.Unlock()
		// Persist last_run to DB so other nodes / restarts can show it.
		_ = db.Session(s.svcCtx).Model(&model.ScheduledJobState{}).
			Where("id = ?", defCopy.ID).
			Update("last_run", now)
	})
	if def.Schedule == nil {
		id, err := s.cron.AddJob(def.Spec, jobFunc)
		if err != nil {
			return
		}
		s.entryIDs[def.ID] = id
	} else {
		s.entryIDs[def.ID] = s.cron.Schedule(def.Schedule, jobFunc)
	}
	_ = ctx
}

// ListScheduledJobsWithState returns all scheduled job definitions with runtime state (next run, last run, enabled).
// It merges in-memory cron entry state with persisted DB state so the values
// are accurate even when queried from a non-leader node.
func (s *taskSchedulerService) ListScheduledJobsWithState() []ScheduledJobState {
	// Load DB state for accurate last_run / enabled values across nodes.
	var dbStates []model.ScheduledJobState
	_ = db.Session(s.svcCtx).Find(&dbStates).Error
	dbStateMap := make(map[string]model.ScheduledJobState, len(dbStates))
	for _, st := range dbStates {
		dbStateMap[st.ID] = st
	}

	s.mu.RLock()
	defer s.mu.RUnlock()
	defs := taskscheduler.ListScheduledJobs()
	result := make([]ScheduledJobState, 0, len(defs))
	for _, d := range defs {
		enabled := d.Enabled
		if st, ok := dbStateMap[d.ID]; ok {
			enabled = st.Enabled
		}
		state := ScheduledJobState{
			ID:          d.ID,
			Name:        d.Name,
			Spec:        d.Spec,
			Description: d.Description,
			TaskType:    string(d.TaskType),
			Enabled:     enabled,
		}

		if entryID, ok := s.entryIDs[d.ID]; ok {
			entry := s.cron.Entry(entryID)
			state.NextRun = &entry.Next
		}
		// Prefer DB last_run (more accurate across nodes/restarts); fall back to in-memory.
		if st, ok := dbStateMap[d.ID]; ok && st.LastRun != nil {
			state.LastRun = st.LastRun
		} else if t, ok := s.lastRun[d.ID]; ok {
			state.LastRun = &t
		}
		result = append(result, state)
	}
	return result
}

// scheduleChangedPayload is the JSON payload for schedule.changed events.
type scheduleChangedPayload struct {
	JobID   string `json:"job_id"`
	Enabled bool   `json:"enabled"`
}

// ToggleEnabled enables or disables a scheduled job by ID.
// It persists the state to t_scheduled_job_state and broadcasts a
// schedule.changed event so all nodes apply the change.
func (s *taskSchedulerService) ToggleEnabled(id string, enabled bool) error {
	def := taskscheduler.GetScheduledJob(id)
	if def == nil {
		return ErrScheduledJobNotFound
	}

	// Persist state to DB using upsert so other nodes can bootstrap from it.
	state := model.ScheduledJobState{ID: id, Enabled: enabled}
	if err := db.Session(s.svcCtx).Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "id"}},
		DoUpdates: clause.AssignmentColumns([]string{"enabled", "updated_at"}),
	}).Create(&state).Error; err != nil {
		return fmt.Errorf("failed to persist scheduled job state: %w", err)
	}

	// Broadcast to all nodes (including self via subscribe handler).
	payload, _ := json.Marshal(scheduleChangedPayload{JobID: id, Enabled: enabled})
	if bus := GetGlobalEventBus(); bus != nil {
		_ = bus.Publish(s.svcCtx, eventbus.EventScheduleChanged, payload)
	} else {
		// NoopEventBus path: apply locally.
		s.applyScheduleToggle(id, enabled)
	}
	return nil
}

// handleScheduleChanged is called by the EventBus subscriber on schedule.changed events.
func (s *taskSchedulerService) handleScheduleChanged(payload []byte) {
	var p scheduleChangedPayload
	if err := json.Unmarshal(payload, &p); err != nil {
		return
	}
	s.applyScheduleToggle(p.JobID, p.Enabled)
}

// applyScheduleToggle adds or removes the cron entry for the given job.
func (s *taskSchedulerService) applyScheduleToggle(id string, enabled bool) {
	def := taskscheduler.GetScheduledJob(id)
	if def == nil {
		return
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	if enabled {
		def.Enabled = true
		s.addJobLocked(s.svcCtx, def)
	} else {
		def.Enabled = false
		if entryID, ok := s.entryIDs[id]; ok {
			s.cron.Remove(entryID)
			delete(s.entryIDs, id)
		}
	}
}

// TriggerNow creates one task immediately for the given scheduled job ID.
func (s *taskSchedulerService) TriggerNow(ctx context.Context, id string) (*model.Task, error) {
	def := taskscheduler.GetScheduledJob(id)
	if def == nil {
		return nil, ErrScheduledJobNotFound
	}
	payload := def.PayloadBuilder()
	defer func() {
		s.mu.Lock()
		s.lastRun[id] = time.Now()
		s.mu.Unlock()
	}()
	return s.TaskService.CreateTask(ctx, def.TaskType,
		WithPayload(payload),
		WithMaxRetries(def.MaxRetries),
		WithCategory(model.TaskCategorySystem),
		WithCronScheduleID(def.ID),
	)
}

// ErrScheduledJobNotFound is returned when a scheduled job ID is not found.
var ErrScheduledJobNotFound = errors.New("scheduled job not found")
