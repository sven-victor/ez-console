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

import (
	"time"
)

// TaskStatus represents the status of a task
type TaskStatus string

const (
	TaskStatusPending   TaskStatus = "pending"
	TaskStatusRunning   TaskStatus = "running"
	TaskStatusSuccess   TaskStatus = "success"
	TaskStatusFailed    TaskStatus = "failed"
	TaskStatusCancelled TaskStatus = "cancelled"
)

// TaskType represents the type of a task
type TaskType string

type TaskCategory string

// TaskCategory identifies whether a task is user-facing or system-internal.
// Only tasks with category "user" are shown in the header task dropdown.
const (
	TaskCategoryUser   TaskCategory = "user"
	TaskCategorySystem TaskCategory = "system"
)

// Task is the model for background tasks
type Task struct {
	Base
	Type             TaskType   `gorm:"size:64;not null;index" json:"type"`
	Status           TaskStatus `gorm:"size:32;not null;index" json:"status"`
	Progress         int        `gorm:"default:0" json:"progress"` // 0-100
	Result           string     `gorm:"type:text" json:"result,omitempty"`
	Error            string     `gorm:"type:text" json:"error,omitempty"`
	CreatorID        string     `gorm:"size:36;not null;index" json:"creator_id"`
	ArtifactFileKey  string     `gorm:"size:64" json:"artifact_file_key,omitempty"`
	ArtifactFileName string     `json:"artifact_file_name,omitempty"`
	RetryCount       int        `gorm:"default:0" json:"retry_count"`
	MaxRetries       int        `gorm:"default:0" json:"max_retries"`
	AutoRetryCount   int        `gorm:"default:0" json:"auto_retry_count"`
	StartedAt        *time.Time `json:"started_at,omitempty"`
	FinishedAt       *time.Time `json:"finished_at,omitempty"`
	Payload          string     `gorm:"type:text" json:"payload,omitempty"` // optional JSON payload for task input

	Category       TaskCategory `gorm:"size:32;not null;index;default:user" json:"category"` // user or system
	CronScheduleID string       `gorm:"size:64;index" json:"cron_schedule_id,omitempty"`     // set when task was created by a scheduled job
}

// TaskLogEntry represents a single task log line returned by the task logs API.
type TaskLogEntry struct {
	ID        string `json:"id"`
	RefID     string `json:"ref_id"`
	LogType   string `json:"log_type"`
	Level     string `json:"level,omitempty"`
	Message   string `json:"message"`
	CreatedAt string `json:"created_at"`
}
