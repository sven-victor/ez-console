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
	"time"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

type FunctionCall struct {
	Name string `json:"name,omitempty"`
	// call function with arguments in JSON format
	Arguments string `json:"arguments,omitempty"`
}

type ToolCallStatus string

const (
	ToolCallStatusPending   ToolCallStatus = "pending"
	ToolCallStatusRunning   ToolCallStatus = "running"
	ToolCallStatusCompleted ToolCallStatus = "completed"
	ToolCallStatusFailed    ToolCallStatus = "failed"
)

type ToolCall struct {
	// Index is not nil only in chat completion chunk object
	Index     *int            `json:"index,omitempty"`
	ID        string          `json:"id,omitempty"`
	Type      openai.ToolType `json:"type"`
	Function  FunctionCall    `json:"function"`
	Status    ToolCallStatus  `json:"status,omitempty"`
	Result    string          `json:"-"`
	StartTime time.Time       `json:"start_time,omitempty"`
}

type EventType string

const (
	EventTypeContent  EventType = "content"
	EventTypeToolCall EventType = "tool_call"
	EventTypeError    EventType = "error"
)

type ChatStreamEvent struct {
	MessageID string                  `json:"message_id,omitempty"`
	Content   string                  `json:"content,omitempty"`
	Role      model.AIChatMessageRole `json:"role,omitempty"`
	ToolCalls []ToolCall              `json:"tool_calls,omitempty"`
	EventType EventType               `json:"event_type,omitempty"`
}

type ChatStream interface {
	Recv(ctx context.Context) (*ChatStreamEvent, error)
	Close() error
}

func WithChatCompletionToolSets(toolSets toolset.ToolSets) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		if toolSets != nil {
			options.ToolSetsFactory = toolset.NewStaticToolSetsFactory(toolSets)
		}
	}
}

func WithChatCompletionToolSetsFactory(factory func(ctx context.Context) (toolset.ToolSets, error)) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		if factory != nil {
			options.ToolSetsFactory = toolset.NewCachedToolSetsFactory(factory)
		} else {
			options.ToolSetsFactory = toolset.NewStaticToolSetsFactory(nil)
		}
	}
}

func WithoutChatCompletionToolSets() WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		options.ToolSetsFactory = nil
	}
}

type ChatCompletionOptions struct {
	MaxIterations           int
	MaxTokens               int
	EnableAutoSummarization bool
	FinalPrompt             string

	ToolSetsFactory func(ctx context.Context) (toolset.ToolSets, error)

	OnMessageEnd     func(ctx context.Context, messageID string, content string)
	OnToolCallEnd    func(ctx context.Context, toolCall ToolCall)
	OnToolCallsStart func(ctx context.Context, toolCalls []ToolCall)
}

type WithChatCompletionOptions func(options *ChatCompletionOptions)

func WithChatCompletionOnMessageEnd(onMessageEnd func(ctx context.Context, messageID string, content string)) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		options.OnMessageEnd = onMessageEnd
	}
}

func WithChatCompletionOnToolCallEnd(onToolCallEnd func(ctx context.Context, toolCall ToolCall)) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		options.OnToolCallEnd = onToolCallEnd
	}
}

func WithChatCompletionOnToolCallsStart(onToolCallsStart func(ctx context.Context, toolCalls []ToolCall)) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		options.OnToolCallsStart = onToolCallsStart
	}
}

func WithChatCompletionMaxIterations(maxIterations int) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		options.MaxIterations = maxIterations
	}
}

func WithChatCompletionMaxTokens(maxTokens int) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		options.MaxTokens = maxTokens
	}
}

func WithChatCompletionAutoSummarization(enabled bool) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		options.EnableAutoSummarization = enabled
	}
}

func WithChatCompletionFinalPrompt(finalPrompt string) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		options.FinalPrompt = finalPrompt
	}
}
