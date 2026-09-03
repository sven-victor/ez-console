package service

import (
	"context"
	"fmt"
	"time"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-agent/memory"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
)

type AISessionService interface {
	CreateChatSession(ctx context.Context, organizationID, userID, title, modelID string, messages []ai.SimpleChatMessage, anonymous bool) (*model.AIChatSession, error)
	GetChatSession(ctx context.Context, organizationID, userID, sessionID string) (*model.AIChatSession, error)
	AppendSessionActivatedSkill(ctx context.Context, organizationID, userID, sessionID, skillID string) error
	ClearSessionActivatedSkills(ctx context.Context, organizationID, userID, sessionID string) error
	GetUserChatSessions(ctx context.Context, organizationID, userID string, current, pageSize int) ([]model.AIChatSession, int64, error)
	AddChatMessage(ctx context.Context, organizationID, userID, sessionID string, role model.AIChatMessageRole, content string, toolCalls model.AIToolCalls, toolCallID string) (*model.AIChatMessage, error)
	GetChatMessages(ctx context.Context, organizationID, userID, sessionID string) ([]model.AIChatMessage, error)
	GetSimpleChatMessages(ctx context.Context, organizationID, userID, sessionID string) ([]model.AIChatMessage, error)
	UpdateChatToolCallResult(ctx context.Context, organizationID, userID, sessionID string, toolCallID string, result string) error
	DeleteSessionAllMessages(ctx context.Context, organizationID, userID, sessionID string) error
	DeleteChatSession(ctx context.Context, organizationID, userID, sessionID string) error
	UpdateSessionTokenUsage(ctx context.Context, organizationID, userID, sessionID string, promptTokens, completionTokens, activeTokens int) error
	UpdateChatSessionTitle(ctx context.Context, organizationID, userID, sessionID string, title string) error

	Store(ctx context.Context, organizationID, userID string) memory.SessionStore
}

type dbSessionService struct{}

func (s *dbSessionService) Store(ctx context.Context, organizationID, userID string) memory.SessionStore {
	return &dbSessionStore{
		OrganizationID: organizationID,
		UserID:         userID,
	}
}

// CreateChatSession creates a new chat session
func (s *dbSessionService) CreateChatSession(ctx context.Context, organizationID, userID, title, modelID string, messages []ai.SimpleChatMessage, anonymous bool) (*model.AIChatSession, error) {
	session := model.NewAIChatSession(organizationID, userID, title, modelID, anonymous)

	err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(session).Error; err != nil {
			return fmt.Errorf("failed to create chat session: %w", err)
		}
		for _, message := range messages {
			role := message.Role
			// Downgrade system messages to prompt role: persisted system messages
			// are never lifted into the agent system prompt (ChatMessagesToAgent
			// drops them when the session history is loaded), and a session-long
			// system prompt would keep steering attention after the topic drifts.
			// Prompt-role messages are hidden from chat history but sent to the
			// model as user context, and naturally decay via summarization.
			if role == model.AIChatMessageRoleSystem {
				role = model.AIChatMessageRolePrompt
			}
			if err := tx.Create(&model.AIChatMessage{
				OrganizationID: organizationID,
				UserID:         userID,
				SessionID:      session.ResourceID,
				Role:           role,
				Content:        message.Content,
				Status:         model.AIChatMessageStatusCompleted,
				MessageTime:    time.Now(),
			}).Error; err != nil {
				return fmt.Errorf("failed to create chat message: %w", err)
			}
		}
		return nil
	})

	if err != nil {
		return nil, fmt.Errorf("failed to create chat session: %w", err)
	}

	return session, nil
}

// GetChatSession gets a chat session by ID
func (s *dbSessionService) GetChatSession(ctx context.Context, organizationID, userID, sessionID string) (*model.AIChatSession, error) {
	var session model.AIChatSession
	if err := db.Session(ctx).Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, sessionID).First(&session).Error; err != nil {
		return nil, fmt.Errorf("failed to get chat session: %w", err)
	}

	return &session, nil
}

// AppendSessionActivatedSkill records that get_skill_content succeeded for a skill in this session (deduplicated).
func (s *dbSessionService) AppendSessionActivatedSkill(ctx context.Context, organizationID, userID, sessionID, skillID string) error {
	if skillID == "" {
		return nil
	}
	var session model.AIChatSession
	if err := db.Session(ctx).Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, sessionID).First(&session).Error; err != nil {
		return fmt.Errorf("failed to get chat session: %w", err)
	}
	ids := session.ActivatedSkillIDs
	for _, id := range ids {
		if id == skillID {
			return nil
		}
	}
	ids = append(ids, skillID)
	if err := db.Session(ctx).Model(&model.AIChatSession{}).
		Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, sessionID).
		Select("activated_skill_ids").
		Updates(&model.AIChatSession{ActivatedSkillIDs: ids}).Error; err != nil {
		return fmt.Errorf("failed to update activated skills: %w", err)
	}
	return nil
}

// ClearSessionActivatedSkills clears skills activated via get_skill_content (e.g. after summarization).
func (s *dbSessionService) ClearSessionActivatedSkills(ctx context.Context, organizationID, userID, sessionID string) error {
	if err := db.Session(ctx).Model(&model.AIChatSession{}).
		Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, sessionID).
		Update("activated_skill_ids", []string{}).Error; err != nil {
		return fmt.Errorf("failed to clear activated skills: %w", err)
	}
	return nil
}

// GetUserChatSessions gets chat sessions for a user with pagination
func (s *dbSessionService) GetUserChatSessions(ctx context.Context, organizationID, userID string, current, pageSize int) ([]model.AIChatSession, int64, error) {
	var sessions []model.AIChatSession
	var total int64

	query := db.Session(ctx).Model(&model.AIChatSession{}).Where("organization_id = ? AND user_id = ? and anonymous = ?", organizationID, userID, false)

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count chat sessions: %w", err)
	}

	// Apply pagination
	offset := (current - 1) * pageSize
	if err := query.Offset(offset).Limit(pageSize).Order("start_time DESC").Find(&sessions).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to list chat sessions: %w", err)
	}

	return sessions, total, nil
}

// AddChatMessage adds a message to a chat session
func (s *dbSessionService) AddChatMessage(ctx context.Context, organizationID, userID, sessionID string, role model.AIChatMessageRole, content string, toolCalls model.AIToolCalls, toolCallID string) (*model.AIChatMessage, error) {
	message := model.NewAIChatMessage(organizationID, userID, sessionID, role, content, toolCalls, toolCallID)

	if err := db.Session(ctx).Create(message).Error; err != nil {
		return nil, fmt.Errorf("failed to add chat message: %w", err)
	}

	return message, nil
}

// GetChatMessages gets active messages for a chat session (excludes summarized messages).
func (s *dbSessionService) GetChatMessages(ctx context.Context, organizationID, userID, sessionID string) ([]model.AIChatMessage, error) {
	var messages []model.AIChatMessage
	if err := db.Session(ctx).
		Where("organization_id = ? AND user_id = ? AND session_id = ?", organizationID, userID, sessionID).
		Where("summarized = ?", false).
		Order("message_time ASC").Find(&messages).Error; err != nil {
		return nil, fmt.Errorf("failed to get chat messages: %w", err)
	}

	return messages, nil
}

// GetChatMessages gets messages for a chat session
func (s *dbSessionService) GetSimpleChatMessages(ctx context.Context, organizationID, userID, sessionID string) ([]model.AIChatMessage, error) {
	var messages []model.AIChatMessage
	if err := db.Session(ctx).
		Where("organization_id = ? AND user_id = ? AND session_id = ?", organizationID, userID, sessionID).
		Where("role in ? and (tool_calls is null or tool_calls = '')", []model.AIChatMessageRole{model.AIChatMessageRoleUser, model.AIChatMessageRoleAssistant}).
		Order("message_time ASC").Limit(100).Find(&messages).Error; err != nil {
		return nil, fmt.Errorf("failed to get chat messages: %w", err)
	}

	return messages, nil
}

// UpdateChatMessage updates a chat message
func (s *dbSessionService) UpdateChatToolCallResult(ctx context.Context, organizationID, userID, sessionID string, toolCallID string, result string) error {
	if err := db.Session(ctx).Model(&model.AIChatMessage{}).Where("organization_id = ? AND user_id = ? AND session_id = ? AND tool_call_id = ?", organizationID, userID, sessionID, toolCallID).Update("content", result).Error; err != nil {
		return fmt.Errorf("failed to update chat tool call result: %w", err)
	}

	return nil
}

// DeleteSessionAllMessages deletes all messages in a session.
func (s *dbSessionService) DeleteSessionAllMessages(ctx context.Context, organizationID, userID, sessionID string) error {
	if err := db.Session(ctx).Model(&model.AIChatMessage{}).Where("organization_id = ? AND user_id = ? AND session_id = ?", organizationID, userID, sessionID).Delete(&model.AIChatMessage{}).Error; err != nil {
		return fmt.Errorf("failed to delete session messages: %w", err)
	}

	return nil
}

// DeleteChatSession deletes a chat session and all its messages
func (s *dbSessionService) DeleteChatSession(ctx context.Context, organizationID, userID, sessionID string) error {
	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		// Delete all messages first
		if err := tx.Where("organization_id = ? AND user_id = ? AND session_id = ?", organizationID, userID, sessionID).Delete(&model.AIChatMessage{}).Error; err != nil {
			return fmt.Errorf("failed to delete chat messages: %w", err)
		}

		// Delete the session
		if err := tx.Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, sessionID).Delete(&model.AIChatSession{}).Error; err != nil {
			return fmt.Errorf("failed to delete chat session: %w", err)
		}

		return nil
	})
}

// UpdateSessionTokenUsage atomically adds prompt/completion tokens to the session
// totals and sets the active token estimate.
func (s *dbSessionService) UpdateSessionTokenUsage(ctx context.Context, organizationID, userID, sessionID string, promptTokens, completionTokens, activeTokens int) error {
	if err := db.Session(ctx).Model(&model.AIChatSession{}).
		Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, sessionID).
		Updates(map[string]interface{}{
			"total_prompt_tokens":     gorm.Expr("total_prompt_tokens + ?", promptTokens),
			"total_completion_tokens": gorm.Expr("total_completion_tokens + ?", completionTokens),
			"active_tokens":           activeTokens,
		}).Error; err != nil {
		return fmt.Errorf("failed to update session token usage: %w", err)
	}
	return nil
}

// UpdateChatSessionTitle updates the title of a chat session
func (s *dbSessionService) UpdateChatSessionTitle(ctx context.Context, organizationID, userID, sessionID string, title string) error {
	if err := db.Session(ctx).Model(&model.AIChatSession{}).Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, sessionID).Update("title", title).Error; err != nil {
		return fmt.Errorf("failed to update chat session title: %w", err)
	}
	return nil
}

func NewDBSessionService() AISessionService {
	return &dbSessionService{}
}

type dbSessionStore struct {
	OrganizationID string
	UserID         string
}

func (s *dbSessionStore) Load(ctx context.Context, id string) (*memory.Session, error) {
	if id == "" {
		return nil, fmt.Errorf("session: id is required")
	}
	var rows []model.AIChatMessage
	q := db.Session(ctx).
		Where("organization_id = ? AND session_id = ? AND summarized = ?", s.OrganizationID, id, false)
	if s.UserID != "" {
		q = q.Where("user_id = ?", s.UserID)
	}
	if err := q.Order("message_time ASC").Find(&rows).Error; err != nil {
		return nil, fmt.Errorf("session load: %w", err)
	}
	if len(rows) == 0 {
		return nil, fmt.Errorf("session %q not found", id)
	}
	agentMsgs := modelRowsToAgentMessages(rows)
	return &memory.Session{ID: id, Messages: agentMsgs, Values: map[string]any{}}, nil
}

func (s *dbSessionStore) Save(context.Context, *memory.Session) error {
	// Intentionally no-op: Append/ReplaceAll already persist the effective window.
	return nil
}

func (s *dbSessionStore) Append(ctx context.Context, id string, msgs ...message.Message) error {
	if id == "" {
		return fmt.Errorf("session: id is required")
	}
	if len(msgs) == 0 {
		return nil
	}
	message.EnsureIDs(msgs)
	var rows []*model.AIChatMessage
	for _, m := range msgs {
		rows = append(rows, AgentMessageToModelRows(s.OrganizationID, s.UserID, id, m, false)...)
	}
	if len(rows) == 0 {
		return nil
	}
	if err := db.Session(ctx).Create(&rows).Error; err != nil {
		return fmt.Errorf("session append: %w", err)
	}
	return nil
}

func (s *dbSessionStore) ReplaceAll(ctx context.Context, id string, msgs []message.Message) error {
	if id == "" {
		return fmt.Errorf("session: id is required")
	}
	message.EnsureIDs(msgs)

	err := db.Session(ctx).Transaction(func(tx *gorm.DB) (err error) {
		if tx.Error != nil {
			return tx.Error
		}
		defer func() {
			if r := recover(); r != nil {
				err = fmt.Errorf("panic: %v", r)
			}
		}()

		q := tx.Model(&model.AIChatMessage{}).Where("organization_id = ? AND session_id = ?", s.OrganizationID, id)
		if s.UserID != "" {
			q = q.Where("user_id = ?", s.UserID)
		}
		if err := q.Updates(map[string]interface{}{"summarized": true, "is_summary": false}).Error; err != nil {
			return fmt.Errorf("session replace mark summarized: %w", err)
		}

		var rows []*model.AIChatMessage
		for _, m := range msgs {
			rows = append(rows, AgentMessageToModelRows(s.OrganizationID, s.UserID, id, m, true)...)
		}
		for _, m := range rows {
			var existing model.AIChatMessage
			if err := tx.Where("organization_id = ? AND session_id = ? AND resource_id = ?", s.OrganizationID, id, m.ResourceID).First(&existing).Error; err != nil {
				if err != gorm.ErrRecordNotFound {
					return fmt.Errorf("session replace check existing: %w", err)
				}
			}
			if existing.ResourceID == "" {
				if err := tx.Create(m).Error; err != nil {
					return fmt.Errorf("session replace insert: %w", err)
				}
			} else {
				if err := tx.Model(&existing).Updates(map[string]interface{}{
					"content":      m.Content,
					"role":         m.Role,
					"tool_calls":   m.ToolCalls,
					"tool_call_id": m.ToolCallID,
					"status":       m.Status,
					"metadata":     m.Metadata,
					"tokens_used":  m.TokensUsed,
					"summarized":   m.Summarized,
					"is_summary":   m.IsSummary,
					"message_time": m.MessageTime,
				}).Error; err != nil {
					return fmt.Errorf("session replace update: %w", err)
				}
			}
		}
		return nil
	})
	if err != nil {
		return fmt.Errorf("session replace: %w", err)
	}

	return nil
}

// modelRowsToAgentMessages converts DB rows to ez-agent messages, preserving ResourceID as Message.ID
// when a logical message maps to a single row (or the first tool row in a tool-result group).
func modelRowsToAgentMessages(rows []model.AIChatMessage) []message.Message {
	chat := ChatMessagesFromModelAll(rows)
	agent := ai.ChatMessagesToAgent(chat)
	// Best-effort ID backfill from original rows for single-row messages.
	rowIdx := 0
	for i := range agent {
		if rowIdx >= len(rows) {
			break
		}
		agent[i].ID = rows[rowIdx].ResourceID
		// Advance rowIdx by how many DB rows this agent message expands to.
		expanded := ai.AgentMessagesToChat([]message.Message{agent[i]})
		rowIdx += len(expanded)
		if rowIdx > len(rows) {
			break
		}
	}
	return agent
}

// ChatMessagesFromModel converts model.AIChatMessage slice to ChatMessage slice.
// For assistant messages with ToolCalls, only ToolCalls that have a corresponding
// role=tool message (same ToolCallID) are kept. This avoids 400 errors when the
// session was interrupted during tool execution and some tool results are missing.
func ChatMessagesFromModel(messages []model.AIChatMessage) []ai.ChatMessage {
	// Collect ToolCallIDs that have a tool response (role=tool)
	respondedToolCallIDs := make(map[string]struct{})
	for _, msg := range messages {
		if msg.Role == model.AIChatMessageRoleTool && msg.ToolCallID != "" {
			respondedToolCallIDs[msg.ToolCallID] = struct{}{}
		}
	}

	result := make([]ai.ChatMessage, 0, len(messages))
	for _, msg := range messages {
		var toolCalls []ai.ToolCall
		if msg.Role == model.AIChatMessageRoleAssistant && len(msg.ToolCalls) > 0 {
			// Only include ToolCalls that have a corresponding role=tool message
			for _, tc := range msg.ToolCalls {
				if _, ok := respondedToolCallIDs[tc.ID]; ok {
					toolCalls = append(toolCalls, ai.ToolCall{
						Index: nil, // set to contiguous 0,1,2... below
						ID:    tc.ID,
						Type:  openai.ToolType(tc.Type),
						Function: ai.FunctionCall{
							Name:      tc.Function.Name,
							Arguments: tc.Function.Arguments,
						},
					})
				}
			}
			// Re-index to contiguous 0,1,2,... for API compatibility
			for i := range toolCalls {
				idx := i
				toolCalls[i].Index = &idx
			}
		} else {
			for _, tc := range msg.ToolCalls {
				toolCalls = append(toolCalls, ai.ToolCall{
					Index: tc.Index,
					ID:    tc.ID,
					Type:  openai.ToolType(tc.Type),
					Function: ai.FunctionCall{
						Name:      tc.Function.Name,
						Arguments: tc.Function.Arguments,
					},
				})
			}
		}
		if msg.Content == "" && len(toolCalls) == 0 {
			continue
		}
		role := msg.Role
		if role == model.AIChatMessageRolePrompt {
			role = model.AIChatMessageRoleUser
		}
		result = append(result, ai.ChatMessage{
			Role:       role,
			Content:    msg.Content,
			ToolCalls:  toolCalls,
			ToolCallID: msg.ToolCallID,
		})
	}
	return result
}

// ChatMessagesFromModelAll converts model rows without dropping unpaired tool calls.
// Used by SessionStore.Load so mid-HITL history (assistant tool_calls awaiting client results) is preserved.
func ChatMessagesFromModelAll(messages []model.AIChatMessage) []ai.ChatMessage {
	result := make([]ai.ChatMessage, 0, len(messages))
	for _, msg := range messages {
		var toolCalls []ai.ToolCall
		for _, tc := range msg.ToolCalls {
			toolCalls = append(toolCalls, ai.ToolCall{
				Index: tc.Index,
				ID:    tc.ID,
				Type:  openai.ToolType(tc.Type),
				Function: ai.FunctionCall{
					Name:      tc.Function.Name,
					Arguments: tc.Function.Arguments,
				},
			})
		}
		if msg.Content == "" && len(toolCalls) == 0 && msg.ToolCallID == "" {
			continue
		}
		role := msg.Role
		if role == model.AIChatMessageRolePrompt {
			role = model.AIChatMessageRoleUser
		}
		result = append(result, ai.ChatMessage{
			Role:       role,
			Content:    msg.Content,
			ToolCalls:  toolCalls,
			ToolCallID: msg.ToolCallID,
		})
	}
	return result
}

// AgentMessageToModelRows converts one ez-agent message into one or more DB rows.
// id is applied to the first row; subsequent tool rows get empty ResourceID (auto-generated).
func AgentMessageToModelRows(organizationID, userID, sessionID string, msg message.Message, isSummary bool) []*model.AIChatMessage {
	chatMsgs := ai.AgentMessagesToChat([]message.Message{msg})
	rows := make([]*model.AIChatMessage, 0, len(chatMsgs))
	for i, cm := range chatMsgs {
		var toolCalls model.AIToolCalls
		for _, tc := range cm.ToolCalls {
			toolCalls = append(toolCalls, model.AIToolCall{
				Index: tc.Index,
				ID:    tc.ID,
				Type:  string(tc.Type),
				Function: model.AIFunctionCall{
					Name:      tc.Function.Name,
					Arguments: tc.Function.Arguments,
				},
			})
		}
		row := model.NewAIChatMessage(organizationID, userID, sessionID, cm.Role, cm.Content, toolCalls, cm.ToolCallID)
		row.IsSummary = isSummary
		if i == 0 && msg.ID != "" {
			row.ResourceID = msg.ID
		}
		rows = append(rows, row)
	}
	return rows
}
