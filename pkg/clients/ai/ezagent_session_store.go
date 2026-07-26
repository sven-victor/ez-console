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
	"fmt"

	"github.com/sven-victor/ez-agent/memory"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
)

// DBSessionStore persists the effective model window to t_ai_chat_messages.
// Save is a no-op (Append/ReplaceAll already write); Load returns unsummarized rows.
type DBSessionStore struct {
	OrganizationID string
	UserID         string

	// OnAppend is invoked for each persisted ChatMessage after Append (e.g. title generation).
	OnAppend func(ctx context.Context, msg ChatMessage)
	// OnReplaceAll is invoked after ReplaceAll persists the new window (condense, offload, or
	// summarization). Do not use this to clear skill activation — ReplaceAll is not summary-only;
	// use ChatCompletionOptions.OnSummary (wired to AfterSummary) instead.
	OnReplaceAll func(ctx context.Context, msgs []ChatMessage)
}

var _ memory.SessionStore = (*DBSessionStore)(nil)

func (s *DBSessionStore) Load(ctx context.Context, id string) (*memory.Session, error) {
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

func (s *DBSessionStore) Save(context.Context, *memory.Session) error {
	// Intentionally no-op: Append/ReplaceAll already persist the effective window.
	return nil
}

func (s *DBSessionStore) Append(ctx context.Context, id string, msgs ...message.Message) error {
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
	if s.OnAppend != nil {
		for _, m := range msgs {
			for _, cm := range agentMessageToChat(m) {
				s.OnAppend(ctx, cm)
			}
		}
	}
	return nil
}

func (s *DBSessionStore) ReplaceAll(ctx context.Context, id string, msgs []message.Message) error {
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

	if s.OnReplaceAll != nil {
		s.OnReplaceAll(ctx, AgentMessagesToChat(msgs))
	}
	return nil
}

// modelRowsToAgentMessages converts DB rows to ez-agent messages, preserving ResourceID as Message.ID
// when a logical message maps to a single row (or the first tool row in a tool-result group).
func modelRowsToAgentMessages(rows []model.AIChatMessage) []message.Message {
	chat := ChatMessagesFromModelAll(rows)
	agent := ChatMessagesToAgent(chat)
	// Best-effort ID backfill from original rows for single-row messages.
	rowIdx := 0
	for i := range agent {
		if rowIdx >= len(rows) {
			break
		}
		agent[i].ID = rows[rowIdx].ResourceID
		// Advance rowIdx by how many DB rows this agent message expands to.
		expanded := agentMessageToChat(agent[i])
		rowIdx += len(expanded)
		if rowIdx > len(rows) {
			break
		}
	}
	return agent
}
