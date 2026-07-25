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

package ai

import (
	"context"
	"encoding/json"
	"sync/atomic"

	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/log"
)

// TraceEventWriter is a callback that persists a trace event.
type TraceEventWriter func(ctx context.Context, event model.AITraceEvent)

// TraceCounter tracks the step ordering within a single trace.
type TraceCounter struct {
	counter int64
}

// Next returns the next step order number.
func (tc *TraceCounter) Next() int {
	return int(atomic.AddInt64(&tc.counter, 1))
}

// WriteTraceTokenUsage is a helper to record token usage as a trace event.
func WriteTraceTokenUsage(ctx context.Context, writer TraceEventWriter, counter *TraceCounter, stats TokenUsageStats) {
	traceID := log.GetTraceId(ctx)
	content, _ := json.Marshal(stats)
	writer(ctx, model.AITraceEvent{
		TraceID:   traceID,
		StepOrder: counter.Next(),
		EventType: model.AITraceEventTypeTokenUsage,
		Content:   string(content),
	})
}

// WriteTraceToolCall records a tool call event.
func WriteTraceToolCall(ctx context.Context, writer TraceEventWriter, counter *TraceCounter, toolCallID string, toolName string, arguments string) {
	if writer == nil || counter == nil {
		return
	}
	traceID := log.GetTraceId(ctx)
	payload := map[string]string{
		"tool_call_id": toolCallID,
		"tool":         toolName,
		"arguments":    arguments,
	}
	content, _ := json.Marshal(payload)
	writer(ctx, model.AITraceEvent{
		TraceID:   traceID,
		StepOrder: counter.Next(),
		EventType: model.AITraceEventTypeToolCall,
		Content:   string(content),
	})
}

// WriteTraceToolResult records a tool call result event.
func WriteTraceToolResult(ctx context.Context, writer TraceEventWriter, counter *TraceCounter, toolCallID string, result string) {
	traceID := log.GetTraceId(ctx)
	payload := map[string]string{"tool_call_id": toolCallID, "result": result}
	content, _ := json.Marshal(payload)
	writer(ctx, model.AITraceEvent{
		TraceID:   traceID,
		StepOrder: counter.Next(),
		EventType: model.AITraceEventTypeToolResult,
		Content:   string(content),
	})
}

// WriteTraceSummary records a summarization event.
func WriteTraceSummary(ctx context.Context, writer TraceEventWriter, counter *TraceCounter, messages []ChatMessage) {
	traceID := log.GetTraceId(ctx)
	content, _ := json.Marshal(messages)
	writer(ctx, model.AITraceEvent{
		TraceID:   traceID,
		StepOrder: counter.Next(),
		EventType: model.AITraceEventTypeSummary,
		Content:   string(content),
	})
}

// WriteTraceError records an error event.
func WriteTraceError(ctx context.Context, writer TraceEventWriter, counter *TraceCounter, errMsg string, durationMs int64) {
	if writer == nil || counter == nil || errMsg == "" {
		return
	}
	traceID := log.GetTraceId(ctx)
	writer(ctx, model.AITraceEvent{
		TraceID:    traceID,
		StepOrder:  counter.Next(),
		EventType:  model.AITraceEventTypeError,
		Content:    errMsg,
		DurationMs: durationMs,
	})
}
