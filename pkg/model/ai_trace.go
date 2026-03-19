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

// AITraceEventType represents the type of a trace event
type AITraceEventType string

const (
	AITraceEventTypeLLMRequest  AITraceEventType = "llm_request"
	AITraceEventTypeLLMResponse AITraceEventType = "llm_response"
	AITraceEventTypeTokenUsage  AITraceEventType = "token_usage"
	AITraceEventTypeToolCall    AITraceEventType = "tool_call"
	AITraceEventTypeToolResult  AITraceEventType = "tool_result"
	AITraceEventTypeError       AITraceEventType = "error"
	AITraceEventTypeSummary     AITraceEventType = "summary"
)

// AITraceEvent stores a single step in an AI interaction trace
type AITraceEvent struct {
	Base
	TraceID    string           `gorm:"size:64;index;not null" json:"trace_id"`
	StepOrder  int              `gorm:"not null" json:"step_order"`
	EventType  AITraceEventType `gorm:"size:50;not null" json:"event_type"`
	Content    string           `gorm:"type:text" json:"content"`
	DurationMs int64            `json:"duration_ms"`
	CreatedAt  time.Time        `json:"created_at"`
}

// TableName returns the table name for AITraceEvent
func (AITraceEvent) TableName() string {
	return "t_ai_trace_events"
}

// AIDebugSettings holds AI debug/trace settings
type AIDebugSettings struct {
	DebugEnabled bool `json:"debug_enabled"`
}

const (
	SettingAIDebugEnabled SettingKey = "ai_debug_enabled"
)

var AIDebugSettingKeys = []SettingKey{
	SettingAIDebugEnabled,
}

func init() {
	RegisterSettingKeys("ai", AIDebugSettings{}, AIDebugSettingKeys...)
}
