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

const (
	SettingTaskMaxConcurrent    SettingKey = "task_max_concurrent"     // Max concurrent task executions
	SettingTaskLogStorageBackend SettingKey = "task_log_storage_backend" // Log storage backend name (e.g. "database"), empty for default
)

var TaskSettingKeys = []SettingKey{
	SettingTaskMaxConcurrent,
	SettingTaskLogStorageBackend,
}

func init() {
	RegisterSettingKeys("task", TaskSettings{}, TaskSettingKeys...)
}

// TaskSettings holds task-related system settings
type TaskSettings struct {
	MaxConcurrent     int    `json:"max_concurrent"`
	LogStorageBackend string `json:"log_storage_backend"` // Backend name for task log storage (e.g. "database"), empty for default
}

// LogStorageBackendOption represents a log storage backend option for the task settings UI.
type LogStorageBackendOption struct {
	ID   string `json:"id"`   // Backend name (e.g. "database")
	Name string `json:"name"` // Display name for UI
}
