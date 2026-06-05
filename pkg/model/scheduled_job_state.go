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

package model

import "time"

// ScheduledJobState persists the enabled/disabled state and execution history
// of registered cron jobs so that the state survives restarts and is
// consistent across all nodes.
type ScheduledJobState struct {
	ID        string     `gorm:"column:id;primaryKey;size:64"`
	Enabled   bool       `gorm:"column:enabled;not null;default:true"`
	LastRun   *time.Time `gorm:"column:last_run"`
	NextRun   *time.Time `gorm:"column:next_run"`
	UpdatedAt time.Time  `gorm:"column:updated_at;autoUpdateTime"`
}

func (ScheduledJobState) TableName() string { return "t_scheduled_job_state" }
