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
	"errors"
	"fmt"
	"time"
	"unicode"

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
	EventTypeContent           EventType = "content"
	EventTypeToolCall          EventType = "tool_call"
	EventTypeError             EventType = "error"
	EventTypeClientToolPending EventType = "client_tool_pending"
)

const ClientToolPrefix = "ui_"

// ErrClientToolHandoff is a sentinel error indicating that the current
// streaming response should end gracefully because control is being
// transferred to the browser to execute client-side tools.
var ErrClientToolHandoff = errors.New("client tool handoff: control transferred to browser")

// ClientToolPendingCall represents a tool call that must be executed
// on the client side (browser).
type ClientToolPendingCall struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Arguments string `json:"arguments"`
}

// TokenUsage holds prompt and completion token counts returned by the LLM API.
type TokenUsage struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
}

// TokenUsageStats holds accumulated token statistics for an entire exchange
// (potentially spanning multiple LLM API calls, retries, and summarization).
type TokenUsageStats struct {
	PromptTokens     int `json:"prompt_tokens"`
	CompletionTokens int `json:"completion_tokens"`
	TotalTokens      int `json:"total_tokens"`
	ActiveTokens     int `json:"active_tokens"` // Estimated tokens for unsummarized messages to be sent next
}

type ChatStreamEvent struct {
	MessageID       string                  `json:"message_id,omitempty"`
	Content         string                  `json:"content,omitempty"`
	Role            model.AIChatMessageRole `json:"role,omitempty"`
	ToolCalls       []ToolCall              `json:"tool_calls,omitempty"`
	EventType       EventType               `json:"event_type,omitempty"`
	ClientToolCalls []ClientToolPendingCall `json:"client_tool_calls,omitempty"`
	Usage           *TokenUsage             `json:"usage,omitempty"`
}

type ChatStream interface {
	Recv(ctx context.Context) (*ChatStreamEvent, error)
	Close() error
}

func WithChatToolSets(toolSets toolset.ToolSets) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		if toolSets != nil {
			if options.ToolSetsFactory == nil {
				options.ToolSetsFactory = toolset.NewStaticToolSetsFactory(toolSets)
			} else {
				options.ToolSetsFactory = toolset.NewToolSetsFactoryChain(options.ToolSetsFactory, toolset.NewStaticToolSetsFactory(toolSets))
			}
		}
	}
}

func WithChatToolSetsFactory(factory func(ctx context.Context) (toolset.ToolSets, error)) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		if factory != nil {
			if options.ToolSetsFactory == nil {
				options.ToolSetsFactory = toolset.NewCachedToolSetsFactory(factory)
			} else {
				options.ToolSetsFactory = toolset.NewToolSetsFactoryChain(options.ToolSetsFactory, toolset.NewCachedToolSetsFactory(factory))
			}
		}
	}
}

// WithChatUncachedToolSetsFactory appends a tool-sets factory without caching (invoked on every factory call).
func WithChatUncachedToolSetsFactory(factory func(ctx context.Context) (toolset.ToolSets, error)) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		if factory == nil {
			return
		}
		if options.ToolSetsFactory == nil {
			options.ToolSetsFactory = factory
			return
		}
		options.ToolSetsFactory = toolset.NewToolSetsFactoryChain(options.ToolSetsFactory, factory)
	}
}

// WithChatRefreshToolSetsEachIteration enables reloading tool definitions before each LLM request in a streaming chat.
func WithChatRefreshToolSetsEachIteration(refresh bool) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.RefreshToolSetsEachIteration = refresh
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
	ToolResultMaxSize       int    // Maximum size of tool result in bytes, default 32KB
	ResponseJsonSchema      string // JSON Schema for expected response format

	ToolSetsFactory func(ctx context.Context) (toolset.ToolSets, error)
	// RefreshToolSetsEachIteration, when true, re-invokes ToolSetsFactory before each LLM stream iteration (after tool rounds).
	RefreshToolSetsEachIteration bool
	ClientTools                  []openai.Tool // Tools to be executed on the client side (browser)

	OnSummary               func(ctx context.Context, messages []ChatMessage)
	OnToolCallResultChanged func(ctx context.Context, toolCallID string, result string)
	OnMessageAdded          func(ctx context.Context, message ChatMessage)
	OnTokenUsage            func(ctx context.Context, stats TokenUsageStats)

	// AIClientWrapper optionally wraps the underlying AIClient before it is
	// used for LLM calls. This allows injecting cross-cutting concerns such
	// as tracing without modifying the client itself.
	AIClientWrapper func(client AIClient) AIClient
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

func WithChatToolResultMaxSize(maxSize int) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.ToolResultMaxSize = maxSize
	}
}

func WithChatResponseJsonSchema(schema string) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.ResponseJsonSchema = schema
	}
}

func WithChatClientTools(tools []openai.Tool) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.ClientTools = tools
	}
}

func WithChatAIClientWrapper(wrapper func(client AIClient) AIClient) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.AIClientWrapper = wrapper
	}
}

func WithChatOnTokenUsage(onTokenUsage func(ctx context.Context, stats TokenUsageStats)) WithChatOptions {
	return func(options *ChatCompletionOptions) {
		options.OnTokenUsage = onTokenUsage
	}
}

// EstimateTokens approximates token count for a list of messages.
// Uses a simple heuristic: 1 token ~= 1~4 characters (depending on the language).
func EstimateTokens(messages []ChatMessage) int {
	totalTokens := 0

	for _, msg := range messages {
		totalTokens += estimateStringTokens(string(msg.Role))
		totalTokens += estimateStringTokens(msg.Content)

		for _, tc := range msg.ToolCalls {
			totalTokens += estimateStringTokens(tc.ID)
			totalTokens += estimateStringTokens(string(tc.Type))
			totalTokens += estimateStringTokens(tc.Function.Name)

			totalTokens += int(float64(estimateStringTokens(tc.Function.Arguments)) * 1.2)
		}

		totalTokens += estimateStringTokens(msg.ToolCallID)

		totalTokens += 4
	}

	return totalTokens
}

func estimateStringTokens(s string) int {
	tokens := 0

	for _, r := range s {
		switch {
		case isCJK(r):
			tokens += 1

		case unicode.IsLetter(r) || unicode.IsDigit(r):
			tokens += 1

		case unicode.IsSpace(r):
			continue

		default:
			tokens += 1
		}
	}

	return int(float64(tokens)*0.6 + 0.5)
}

func isCJK(r rune) bool {
	return unicode.In(r,
		unicode.Han,
		unicode.Hiragana,
		unicode.Katakana,
		unicode.Hangul,
	)
}

// ChatErrorType classifies the kind of failure from an AI API call.
type ChatErrorType int

const (
	ChatErrorTypeMaxTokensExceeded ChatErrorType = iota + 1
	ChatErrorTypeRateLimitExceeded
	ChatErrorTypeEndOfChat
)

// ChatError wraps an upstream AI API error with a typed classification so
// callers can decide on a recovery strategy (retry, summarize, etc.).
type ChatError struct {
	Err    error
	Type   ChatErrorType
	Detail string
}

func NewChatError(err error, t ChatErrorType, detail string) *ChatError {
	return &ChatError{
		Err:    err,
		Type:   t,
		Detail: detail,
	}
}

func (e *ChatError) Error() string {
	if e.Detail != "" {
		return fmt.Sprintf("%s: %s", e.typeString(), e.Detail)
	}
	return e.typeString()
}

func (e *ChatError) Unwrap() error { return e.Err }

func (e *ChatError) typeString() string {
	switch e.Type {
	case ChatErrorTypeMaxTokensExceeded:
		return "max tokens exceeded"
	case ChatErrorTypeRateLimitExceeded:
		return "rate limit exceeded"
	default:
		return "unknown AI call error"
	}
}

func IsChatError(err error, t ChatErrorType) (*ChatError, bool) {
	var aiErr *ChatError
	if errors.As(err, &aiErr) && aiErr.Type == t {
		return aiErr, true
	}
	return nil, false
}
