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

// LogType identifies the kind of stored log (e.g. task log).
type LogType string

const (
	LogTypeTask LogType = "task"
)

// StoredLog represents a single log entry persisted by the log storage service.
type StoredLog struct {
	Base
	RefID   string  `gorm:"size:36;not null;index:idx_stored_log_ref_type" json:"ref_id"`   // Reference ID (e.g. task ID)
	LogType LogType `gorm:"size:32;not null;index:idx_stored_log_ref_type" json:"log_type"` // Log type (e.g. "task")
	Level   string  `gorm:"size:16" json:"level,omitempty"`                                // Log level (info, debug, error, etc.)
	Message string  `gorm:"type:text" json:"message"`                                      // Formatted log line (e.g. logfmt)
}
