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
	"io"
	"sync/atomic"
	"time"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
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

// TracingAIClient wraps an AIClient and records request/response events.
type TracingAIClient struct {
	inner   AIClient
	writer  TraceEventWriter
	counter *TraceCounter
}

// NewTracingAIClient creates a tracing wrapper around an AIClient.
func NewTracingAIClient(inner AIClient, writer TraceEventWriter, counter *TraceCounter) *TracingAIClient {
	return &TracingAIClient{
		inner:   inner,
		writer:  writer,
		counter: counter,
	}
}

func (t *TracingAIClient) Chat(ctx context.Context, messages []ChatMessage, toolSets toolset.ToolSets) (*ChatMessage, error) {
	traceID := log.GetTraceId(ctx)
	reqJSON, _ := json.Marshal(messages)

	t.writer(ctx, model.AITraceEvent{
		TraceID:   traceID,
		StepOrder: t.counter.Next(),
		EventType: model.AITraceEventTypeLLMRequest,
		Content:   string(reqJSON),
	})

	start := time.Now()
	resp, err := t.inner.Chat(ctx, messages, toolSets)
	duration := time.Since(start).Milliseconds()

	if err != nil {
		t.writer(ctx, model.AITraceEvent{
			TraceID:    traceID,
			StepOrder:  t.counter.Next(),
			EventType:  model.AITraceEventTypeError,
			Content:    err.Error(),
			DurationMs: duration,
		})
		return nil, err
	}

	respJSON, _ := json.Marshal(resp)
	t.writer(ctx, model.AITraceEvent{
		TraceID:    traceID,
		StepOrder:  t.counter.Next(),
		EventType:  model.AITraceEventTypeLLMResponse,
		Content:    string(respJSON),
		DurationMs: duration,
	})

	return resp, nil
}

func (t *TracingAIClient) ChatStream(ctx context.Context, messages []ChatMessage, toolSets toolset.ToolSets) (ChatStream, error) {
	traceID := log.GetTraceId(ctx)
	reqJSON, _ := json.Marshal(messages)

	t.writer(ctx, model.AITraceEvent{
		TraceID:   traceID,
		StepOrder: t.counter.Next(),
		EventType: model.AITraceEventTypeLLMRequest,
		Content:   string(reqJSON),
	})

	start := time.Now()
	stream, err := t.inner.ChatStream(ctx, messages, toolSets)
	if err != nil {
		duration := time.Since(start).Milliseconds()
		t.writer(ctx, model.AITraceEvent{
			TraceID:    traceID,
			StepOrder:  t.counter.Next(),
			EventType:  model.AITraceEventTypeError,
			Content:    err.Error(),
			DurationMs: duration,
		})
		return nil, err
	}

	return &tracingChatStream{
		inner:   stream,
		writer:  t.writer,
		counter: t.counter,
		traceID: traceID,
		start:   start,
		ctx:     ctx,
	}, nil
}

// tracingChatStream wraps a ChatStream and records the accumulated response on close.
type tracingChatStream struct {
	inner   ChatStream
	writer  TraceEventWriter
	counter *TraceCounter
	traceID string
	start   time.Time
	ctx     context.Context
	event   *ChatStreamEvent
}

func (s *tracingChatStream) Recv(ctx context.Context) (*ChatStreamEvent, error) {
	event, err := s.inner.Recv(ctx)
	if err != nil {
		if err == io.EOF {
			duration := time.Since(s.start).Milliseconds()
			if s.event != nil {
				respJSON, _ := json.Marshal(s.event)
				s.writer(s.ctx, model.AITraceEvent{
					TraceID:    s.traceID,
					StepOrder:  s.counter.Next(),
					EventType:  model.AITraceEventTypeLLMResponse,
					Content:    string(respJSON),
					DurationMs: duration,
				})
				s.event = nil
			}
		}
		return nil, err
	}
	if event != nil {
		if s.event == nil {
			s.event = event
		} else {
			if event.Usage != nil {
				s.event.Usage = event.Usage
			}
			s.event.Content += event.Content
			if len(event.ToolCalls) > 0 {
				for _, toolCall := range event.ToolCalls {
					s.mergeToolCall(toolCall)
				}
			}
		}
	}
	return event, nil
}

func (s *tracingChatStream) mergeToolCall(toolCall ToolCall) {
	for idx := range s.event.ToolCalls {
		if s.event.ToolCalls[idx].Index != nil && toolCall.Index != nil && *s.event.ToolCalls[idx].Index == *toolCall.Index {
			// Update tool call
			if toolCall.ID != "" {
				s.event.ToolCalls[idx].ID = toolCall.ID
			}
			if toolCall.Type != "" {
				s.event.ToolCalls[idx].Type = toolCall.Type
			}
			if toolCall.Function.Name != "" {
				s.event.ToolCalls[idx].Function.Name = toolCall.Function.Name
			}
			if toolCall.Function.Arguments != "" {
				s.event.ToolCalls[idx].Function.Arguments += toolCall.Function.Arguments
			}
			return
		}
	}
	s.event.ToolCalls = append(s.event.ToolCalls, ToolCall{
		Index:  toolCall.Index,
		ID:     toolCall.ID,
		Status: ToolCallStatusPending,
		Type:   openai.ToolType(toolCall.Type),
		Function: FunctionCall{
			Name:      toolCall.Function.Name,
			Arguments: toolCall.Function.Arguments,
		},
	})
}

func (s *tracingChatStream) Close() error {
	return s.inner.Close()
}

// TokenUsage delegates to the inner stream if it implements usageProvider.
func (s *tracingChatStream) TokenUsage() *TokenUsage {
	if up, ok := s.inner.(usageProvider); ok {
		return up.TokenUsage()
	}
	return nil
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
func WriteTraceToolCall(ctx context.Context, writer TraceEventWriter, counter *TraceCounter, toolName string, arguments string) {
	traceID := log.GetTraceId(ctx)
	payload := map[string]string{"tool": toolName, "arguments": arguments}
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
func WriteTraceError(ctx context.Context, writer TraceEventWriter, counter *TraceCounter, errMsg string) {
	traceID := log.GetTraceId(ctx)
	writer(ctx, model.AITraceEvent{
		TraceID:   traceID,
		StepOrder: counter.Next(),
		EventType: model.AITraceEventTypeError,
		Content:   errMsg,
	})
}
