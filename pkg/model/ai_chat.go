package model

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"time"
)

// AIChatMessageRole represents the role of a chat message
type AIChatMessageRole string

const (
	AIChatMessageRoleUser      AIChatMessageRole = "user"
	AIChatMessageRoleAssistant AIChatMessageRole = "assistant"
	AIChatMessageRoleSystem    AIChatMessageRole = "system"
	AIChatMessageRoleTool      AIChatMessageRole = "tool"
)

// AIChatMessageStatus represents the status of a chat message
type AIChatMessageStatus string

const (
	AIChatMessageStatusPending   AIChatMessageStatus = "pending"
	AIChatMessageStatusStreaming AIChatMessageStatus = "streaming"
	AIChatMessageStatusCompleted AIChatMessageStatus = "completed"
	AIChatMessageStatusFailed    AIChatMessageStatus = "failed"
)

// AIFunctionCall represents a function call in a chat message
type AIFunctionCall struct {
	Name      string `json:"name"`
	Arguments string `json:"arguments"`
}

// AIToolCall represents a tool call in a chat message
type AIToolCall struct {
	Index    *int           `json:"index,omitempty"`
	ID       string         `json:"id"`
	Type     string         `json:"type"`
	Function AIFunctionCall `json:"function"`
}

// AIChatMessageMetadata represents metadata for a chat message
type AIChatMessageMetadata map[string]interface{}

// Value implements the driver.Valuer interface for GORM
func (m AIChatMessageMetadata) Value() (driver.Value, error) {
	if m == nil {
		return nil, nil
	}
	return json.Marshal(m)
}

// Scan implements the sql.Scanner interface for GORM
func (m *AIChatMessageMetadata) Scan(value interface{}) error {
	if value == nil {
		*m = nil
		return nil
	}

	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("cannot scan %T into AIChatMessageMetadata", value)
	}

	return json.Unmarshal(bytes, m)
}

// AIToolCalls represents a slice of tool calls
type AIToolCalls []AIToolCall

// Value implements the driver.Valuer interface for GORM
func (t AIToolCalls) Value() (driver.Value, error) {
	if t == nil {
		return nil, nil
	}
	return json.Marshal(t)
}

// Scan implements the sql.Scanner interface for GORM
func (t *AIToolCalls) Scan(value interface{}) error {
	if value == nil {
		*t = nil
		return nil
	}

	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("cannot scan %T into AIToolCalls", value)
	}

	return json.Unmarshal(bytes, t)
}

// AIChatSession represents a chat session
type AIChatSession struct {
	Base
	Title     string          `gorm:"size:200;not null" json:"title"`        // Session title
	UserID    string          `gorm:"size:36;not null;index" json:"user_id"` // User ID
	ModelID   string          `gorm:"size:36;not null" json:"model_id"`      // AI model ID used
	StartTime time.Time       `gorm:"not null" json:"start_time"`            // Session start time
	EndTime   *time.Time      `json:"end_time"`                              // Session end time
	Messages  []AIChatMessage `gorm:"-" json:"messages"`                     // Messages
}

// TableName returns the table name for AIChatSession
func (AIChatSession) TableName() string {
	return "t_ai_chat_sessions"
}

// AIChatMessage represents a chat message
type AIChatMessage struct {
	Base
	SessionID   string                `gorm:"size:36;not null;index" json:"session_id"`           // Session ID
	Role        AIChatMessageRole     `gorm:"size:20;not null" json:"role"`                       // Message role
	Content     string                `gorm:"type:text" json:"content"`                           // Message content
	ToolCalls   AIToolCalls           `gorm:"type:text" json:"tool_calls,omitempty"`              // Tool calls (for assistant messages)
	ToolCallID  string                `gorm:"size:100" json:"tool_call_id,omitempty"`             // Tool call ID (for tool messages)
	Status      AIChatMessageStatus   `gorm:"size:20;not null;default:'completed'" json:"status"` // Message status
	Metadata    AIChatMessageMetadata `gorm:"type:text" json:"metadata,omitempty"`                // Additional metadata
	TokensUsed  int                   `gorm:"default:0" json:"tokens_used"`                       // Tokens used for this message
	MessageTime time.Time             `gorm:"not null" json:"message_time"`                       // Message timestamp
}

// TableName returns the table name for AIChatMessage
func (AIChatMessage) TableName() string {
	return "t_ai_chat_messages"
}

// NewAIChatSession creates a new chat session
func NewAIChatSession(title, userID, modelID string) *AIChatSession {
	return &AIChatSession{
		Title:     title,
		UserID:    userID,
		ModelID:   modelID,
		StartTime: time.Now(),
	}
}

// NewAIChatMessage creates a new chat message
func NewAIChatMessage(sessionID string, role AIChatMessageRole, content string, toolCalls AIToolCalls, toolCallID string) *AIChatMessage {
	return &AIChatMessage{
		SessionID:   sessionID,
		Role:        role,
		Content:     content,
		Status:      AIChatMessageStatusCompleted,
		MessageTime: time.Now(),
		ToolCalls:   toolCalls,
		ToolCallID:  toolCallID,
	}
}
