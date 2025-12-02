package ai

import (
	"context"
	"sync"
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

func NewStaticToolSetsFactory(toolSets toolset.ToolSets) func(ctx context.Context) (toolset.ToolSets, error) {
	return func(ctx context.Context) (toolset.ToolSets, error) {
		return toolSets, nil
	}
}

func NewCachedToolSetsFactory(factory func(ctx context.Context) (toolset.ToolSets, error)) func(ctx context.Context) (toolset.ToolSets, error) {
	once := sync.Once{}
	var cachedToolSets toolset.ToolSets
	var err error
	return func(ctx context.Context) (toolset.ToolSets, error) {
		once.Do(func() {
			cachedToolSets, err = factory(ctx)
		})
		return cachedToolSets, err
	}
}

func WithChatCompletionToolSets(toolSets toolset.ToolSets) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		if toolSets != nil {
			options.ToolSetsFactory = NewStaticToolSetsFactory(toolSets)
		}
	}
}

func WithChatCompletionToolSetsFactory(factory func(ctx context.Context) (toolset.ToolSets, error)) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		if factory != nil {
			options.ToolSetsFactory = NewCachedToolSetsFactory(factory)
		} else {
			options.ToolSetsFactory = NewStaticToolSetsFactory(nil)
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
