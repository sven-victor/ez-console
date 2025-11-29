package ai

import (
	"context"
	"time"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/model"
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
