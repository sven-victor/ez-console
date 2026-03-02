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
	"errors"
	"sync"
	"time"

	"github.com/robfig/cron/v3"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
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

// SchedulerService runs registered cron jobs and creates tasks via TaskService.
type SchedulerService struct {
	taskService *TaskService
	cron        *cron.Cron
	entryIDs    map[string]cron.EntryID
	lastRun     map[string]time.Time
	mu          sync.RWMutex
}

// NewSchedulerService creates a SchedulerService. Call Start to begin running schedules.
func NewSchedulerService(taskService *TaskService) *SchedulerService {
	return &SchedulerService{
		taskService: taskService,
		cron:        cron.New(),
		entryIDs:    make(map[string]cron.EntryID),
		lastRun:     make(map[string]time.Time),
	}
}

// Start starts the cron scheduler and adds all enabled registered jobs.
func (s *SchedulerService) Start(ctx context.Context) {
	s.mu.Lock()
	defer s.mu.Unlock()
	for _, def := range taskscheduler.ListScheduledJobs() {
		if def.Enabled {
			s.addJobLocked(def)
		}
	}
	s.cron.Start()
}

func (s *SchedulerService) addJobLocked(def *taskscheduler.ScheduledJobDef) {
	if _, ok := s.entryIDs[def.ID]; ok {
		return
	}
	defCopy := def
	jobFunc := cron.FuncJob(func() {
		payload := defCopy.PayloadBuilder()
		_, _ = s.taskService.CreateTask(
			context.Background(),
			defCopy.TaskType,
			WithPayload(payload),
			WithMaxRetries(defCopy.MaxRetries),
			WithCategory(model.TaskCategorySystem),
			WithCronScheduleID(defCopy.ID),
		)
		s.mu.Lock()
		s.lastRun[defCopy.ID] = time.Now()
		s.mu.Unlock()
	})
	if def.Schedule == nil {
		id, err := s.cron.AddJob(def.Spec, jobFunc)
		if err != nil {
			return
		}
		s.entryIDs[def.ID] = id
		return
	} else {
		s.entryIDs[def.ID] = s.cron.Schedule(def.Schedule, jobFunc)
	}

}

// ListScheduledJobsWithState returns all scheduled job definitions with runtime state (next run, last run, enabled).
func (s *SchedulerService) ListScheduledJobsWithState() []ScheduledJobState {
	s.mu.RLock()
	defer s.mu.RUnlock()
	defs := taskscheduler.ListScheduledJobs()
	result := make([]ScheduledJobState, 0, len(defs))
	for _, d := range defs {
		state := ScheduledJobState{
			ID:          d.ID,
			Name:        d.Name,
			Spec:        d.Spec,
			Description: d.Description,
			TaskType:    string(d.TaskType),
			Enabled:     d.Enabled,
		}
		if entryID, ok := s.entryIDs[d.ID]; ok {
			entry := s.cron.Entry(entryID)
			state.NextRun = &entry.Next
		}
		if t, ok := s.lastRun[d.ID]; ok {
			state.LastRun = &t
		}
		result = append(result, state)
	}
	return result
}

// ToggleEnabled enables or disables a scheduled job by ID.
func (s *SchedulerService) ToggleEnabled(id string, enabled bool) error {
	def := taskscheduler.GetScheduledJob(id)
	if def == nil {
		return ErrScheduledJobNotFound
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	if enabled {
		def.Enabled = true
		s.addJobLocked(def)
	} else {
		def.Enabled = false
		if entryID, ok := s.entryIDs[id]; ok {
			s.cron.Remove(entryID)
			delete(s.entryIDs, id)
		}
	}
	return nil
}

// TriggerNow creates one task immediately for the given scheduled job ID.
func (s *SchedulerService) TriggerNow(ctx context.Context, id string) (*model.Task, error) {
	def := taskscheduler.GetScheduledJob(id)
	if def == nil {
		return nil, ErrScheduledJobNotFound
	}
	payload := def.PayloadBuilder()
	return s.taskService.CreateTask(ctx, def.TaskType,
		WithPayload(payload),
		WithMaxRetries(def.MaxRetries),
		WithCategory(model.TaskCategorySystem),
		WithCronScheduleID(def.ID),
	)
}

// ErrScheduledJobNotFound is returned when a scheduled job ID is not found.
var ErrScheduledJobNotFound = errors.New("scheduled job not found")
