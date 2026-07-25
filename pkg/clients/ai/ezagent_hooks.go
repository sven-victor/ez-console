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
	"sync"
	"sync/atomic"
	"time"

	"github.com/sven-victor/ez-agent/hook"
	"github.com/sven-victor/ez-agent/message"
	ezmodel "github.com/sven-victor/ez-agent/model"
	"github.com/sven-victor/ez-agent/run"
	"github.com/sven-victor/ez-agent/tool"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/log"
)

// agentTraceSink is the shared AI-debug trace sink for hooks and stream/sync error paths.
type agentTraceSink struct {
	writer         TraceEventWriter
	counter        *TraceCounter
	errOnce        sync.Once
	modelStart     atomic.Int64 // unix nano; 0 = no pending model call
	lastAttemptErr atomic.Value // string; last AfterModel failure message
}

func newAgentTraceSink(writer TraceEventWriter, counter *TraceCounter) *agentTraceSink {
	if writer == nil {
		return nil
	}
	if counter == nil {
		counter = &TraceCounter{}
	}
	return &agentTraceSink{writer: writer, counter: counter}
}

func (t *agentTraceSink) markModelStart() {
	if t == nil {
		return
	}
	t.modelStart.Store(time.Now().UnixNano())
}

func (t *agentTraceSink) modelDurationMs() int64 {
	if t == nil {
		return 0
	}
	start := t.modelStart.Load()
	if start <= 0 {
		return 0
	}
	return (time.Now().UnixNano() - start) / int64(time.Millisecond)
}

func (t *agentTraceSink) markModelDone() {
	if t == nil {
		return
	}
	t.modelStart.Store(0)
}

// recordModelError records a per-attempt model failure from AfterModel.
func (t *agentTraceSink) recordModelError(ctx context.Context, errMsg string, durationMs int64) {
	if t == nil || t.writer == nil || t.counter == nil || errMsg == "" {
		return
	}
	t.lastAttemptErr.Store(errMsg)
	WriteTraceError(ctx, t.writer, t.counter, errMsg, durationMs)
}

// recordError writes a single terminal error trace event (idempotent per run).
// Skips when AfterModel already recorded the same message (common for fatal provider errors).
func (t *agentTraceSink) recordError(ctx context.Context, errMsg string) {
	if t == nil || t.writer == nil || t.counter == nil || errMsg == "" {
		return
	}
	if last, ok := t.lastAttemptErr.Load().(string); ok && last == errMsg {
		return
	}
	t.errOnce.Do(func() {
		durationMs := t.modelDurationMs()
		WriteTraceError(ctx, t.writer, t.counter, errMsg, durationMs)
		t.markModelDone()
	})
}

// buildAgentHooks registers observation hooks for AI debug tracing and chat callbacks.
// Aligns with ez-agent hook semantics:
//   - AfterModel always fires (success or failure; Err set on failure)
//   - AfterTool fires unless BeforeTool returned an error
//   - AfterSummary always fires (success, skip, or failure; Err set on skip/failure)
//
// The returned sink is non-nil when TraceWriter is set; stream/sync paths use it for RunError.
func buildAgentHooks(opts *ChatCompletionOptions) (*hook.Registry, *agentTraceSink) {
	h := hook.NewRegistry()
	if opts == nil {
		return h, nil
	}

	sink := newAgentTraceSink(opts.TraceWriter, opts.TraceCounter)
	if sink != nil {
		// Keep opts.TraceCounter aligned so callers share step ordering.
		opts.TraceCounter = sink.counter
	}
	tracing := sink != nil

	onToolRes := opts.OnToolCallResultChanged
	onToken := opts.OnTokenUsage

	if tracing {
		h.OnBeforeModel(func(ctx context.Context, e *hook.BeforeModel) error {
			sink.markModelStart()
			msgs := AgentMessagesToChat(e.Request.Messages)
			if len(msgs) == 0 && e.State != nil {
				msgs = AgentMessagesToChat(e.State.Messages)
			}
			WriteTraceLLMRequest(ctx, sink.writer, sink.counter, msgs, e.Request.Tools)
			return nil
		})
		h.OnAfterModel(func(ctx context.Context, e *hook.AfterModel) error {
			duration := sink.modelDurationMs()
			sink.markModelDone()
			// Always fired after each provider attempt (success or failure).
			if e.Err != nil {
				sink.recordModelError(ctx, e.Err.Error(), duration)
				return nil
			}
			WriteTraceLLMResponse(ctx, sink.writer, sink.counter, e.Result, duration)
			return nil
		})
		h.OnBeforeTool(func(ctx context.Context, e *hook.BeforeTool) error {
			WriteTraceToolCall(ctx, sink.writer, sink.counter, e.Call.ID, e.Call.Name, string(e.Call.Input))
			return nil
		})
	}

	if tracing || onToolRes != nil {
		h.OnAfterTool(func(ctx context.Context, e *hook.AfterTool) error {
			// Fired unless BeforeTool returned an error (covers OK=false / cancel / deny / skip).
			resultText := toolResultText(message.ToolResult{
				ToolUseID: e.Result.ToolUseID,
				OK:        e.Result.OK,
				Parts:     e.Result.Content,
			})
			if e.Result.Err != nil && resultText == "" {
				resultText = e.Result.Err.Error()
			}
			if tracing {
				WriteTraceToolResult(ctx, sink.writer, sink.counter, e.Call.ID, resultText)
			}
			if onToolRes != nil {
				onToolRes(ctx, e.Call.ID, resultText)
			}
			return nil
		})
	}

	if tracing {
		h.OnAfterSummary(func(ctx context.Context, e *hook.AfterSummary) error {
			// Always fired after each summarization attempt (success, skip, or failure).
			if e.Err != nil {
				return nil
			}
			msgs := AgentMessagesToChat(e.Input)
			if len(msgs) == 0 {
				msgs = AgentMessagesToChat([]message.Message{e.Summary})
			}
			WriteTraceSummary(ctx, sink.writer, sink.counter, msgs)
			return nil
		})
	}

	if tracing || onToken != nil {
		h.OnAfterRun(func(ctx context.Context, e *hook.AfterRun) error {
			usage := run.Usage{}
			if e.Result != nil {
				usage = e.Result.Usage
			} else if e.State != nil {
				usage = e.State.Usage
			}
			stats := TokenUsageStats{
				PromptTokens:     usage.InputTokens,
				CompletionTokens: usage.OutputTokens,
				TotalTokens:      usage.TotalTokens,
				ActiveTokens:     usage.TotalTokens,
			}
			if stats.TotalTokens == 0 {
				stats.TotalTokens = stats.PromptTokens + stats.CompletionTokens
				stats.ActiveTokens = stats.TotalTokens
			}
			if tracing {
				WriteTraceTokenUsage(ctx, sink.writer, sink.counter, stats)
			}
			if onToken != nil {
				onToken(ctx, stats)
			}
			return nil
		})
	}

	return h, sink
}

// WriteTraceLLMRequest records an LLM request event (messages + optional tool specs).
func WriteTraceLLMRequest(ctx context.Context, writer TraceEventWriter, counter *TraceCounter, messages []ChatMessage, tools []tool.Spec) {
	if writer == nil || counter == nil {
		return
	}
	traceID := log.GetTraceId(ctx)
	payload := map[string]any{"messages": messages}
	if len(tools) > 0 {
		payload["tools"] = tools
	}
	content, _ := json.Marshal(payload)
	writer(ctx, model.AITraceEvent{
		TraceID:   traceID,
		StepOrder: counter.Next(),
		EventType: model.AITraceEventTypeLLMRequest,
		Content:   string(content),
	})
}

// WriteTraceLLMResponse records an LLM response event as chat messages.
// When the provider exposes RawRequest/RawResponse, they are included for wire-level debug.
func WriteTraceLLMResponse(ctx context.Context, writer TraceEventWriter, counter *TraceCounter, result ezmodel.Result, durationMs int64) {
	if writer == nil || counter == nil {
		return
	}
	traceID := log.GetTraceId(ctx)
	payload := map[string]any{
		"messages": AgentMessagesToChat([]message.Message{result.Message}),
	}
	if len(result.RawRequest) > 0 {
		payload["raw_request"] = json.RawMessage(result.RawRequest)
	}
	if len(result.RawResponse) > 0 {
		// Stream adapters may store newline-joined SSE payloads; keep as string when not JSON.
		var raw any
		if json.Valid(result.RawResponse) {
			raw = json.RawMessage(result.RawResponse)
		} else {
			raw = string(result.RawResponse)
		}
		payload["raw_response"] = raw
	}
	content, _ := json.Marshal(payload)
	writer(ctx, model.AITraceEvent{
		TraceID:    traceID,
		StepOrder:  counter.Next(),
		EventType:  model.AITraceEventTypeLLMResponse,
		Content:    string(content),
		DurationMs: durationMs,
	})
}
