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

package taskscheduler

import (
	"fmt"
	"sync"

	"github.com/robfig/cron/v3"
	"github.com/sven-victor/ez-console/pkg/model"
)

// PayloadBuilder returns the JSON payload for a scheduled task run. Called each time the schedule fires.
type PayloadBuilder func() string

// ScheduledJobDef defines a scheduled job. Registered in code; not persisted to DB.
type ScheduledJobDef struct {
	ID             string
	Name           string
	Spec           string // cron expression, e.g. "0 0 * * *" for daily at midnight, If the Schedule attribute is not empty, this value is only used for the front display.
	Schedule       cron.Schedule
	Description    string
	TaskType       model.TaskType
	PayloadBuilder PayloadBuilder
	MaxRetries     int
	Enabled        bool       // if false, the job is not added to cron (or is removed)
	Runner         TaskRunner // if nil, the task type is not registered by the scheduler, but by the task service directly
}

var (
	schedulerRegistry   = make(map[string]*ScheduledJobDef)
	schedulerRegistryMu sync.RWMutex
)

// RegisterScheduledJob registers a scheduled job definition. Panics if ID is already registered.
func RegisterScheduledJob(def *ScheduledJobDef) {
	schedulerRegistryMu.Lock()
	defer schedulerRegistryMu.Unlock()
	if _, ok := schedulerRegistry[def.ID]; ok {
		panic(fmt.Sprintf("scheduled job %s already registered", def.ID))
	}
	if def.PayloadBuilder == nil {
		def.PayloadBuilder = func() string { return "{}" }
	}
	if def.MaxRetries < 0 {
		def.MaxRetries = 0
	}
	def.Enabled = true
	schedulerRegistry[def.ID] = def
	if def.Runner != nil {
		RegisterFuncTaskType(def.TaskType, def.Runner.Run)
	}
}

// GetScheduledJob returns the job definition by ID, or nil.
func GetScheduledJob(id string) *ScheduledJobDef {
	schedulerRegistryMu.RLock()
	defer schedulerRegistryMu.RUnlock()
	return schedulerRegistry[id]
}

// ListScheduledJobs returns all registered scheduled job definitions.
func ListScheduledJobs() []*ScheduledJobDef {
	schedulerRegistryMu.RLock()
	defer schedulerRegistryMu.RUnlock()
	list := make([]*ScheduledJobDef, 0, len(schedulerRegistry))
	for _, d := range schedulerRegistry {
		list = append(list, d)
	}
	return list
}
