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

func WithChatToolSets(toolSets toolset.ToolSets) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		if toolSets != nil {
			options.ToolSetsFactory = toolset.NewStaticToolSetsFactory(toolSets)
		}
	}
}

func WithChatToolSetsFactory(factory func(ctx context.Context) (toolset.ToolSets, error)) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		if factory != nil {
			options.ToolSetsFactory = toolset.NewCachedToolSetsFactory(factory)
		} else {
			options.ToolSetsFactory = toolset.NewStaticToolSetsFactory(nil)
		}
	}
}

func WithoutChatCompletionToolSets() WithChatOptions {
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

	OnSummary               func(ctx context.Context, messages []ChatMessage)
	OnToolCallResultChanged func(ctx context.Context, toolCallID string, result string)
	OnMessageAdded          func(ctx context.Context, message ChatMessage)
}

type WithChatOptions func(options *ChatCompletionOptions)

func WithChatOnSummary(onSummary func(ctx context.Context, messages []ChatMessage)) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.OnSummary = onSummary
	}
}

func WithChatOnToolCallResultChanged(onToolCallResultChanged func(ctx context.Context, toolCallID string, result string)) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.OnToolCallResultChanged = onToolCallResultChanged
	}
}

func WithChatOnMessageAdded(onMessageAdded func(ctx context.Context, message ChatMessage)) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.OnMessageAdded = onMessageAdded
	}
}

func WithChatMaxIterations(maxIterations int) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.MaxIterations = maxIterations
	}
}

func WithChatMaxTokens(maxTokens int) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.MaxTokens = maxTokens
	}
}

func WithChatAutoSummarization(enabled bool) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.EnableAutoSummarization = enabled
	}
}

func WithChatFinalPrompt(finalPrompt string) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.FinalPrompt = finalPrompt
	}
}
