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

package service

import (
	"context"
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/go-kit/log/level"
	"github.com/robfig/cron/v3"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
)

// AIChatService handles AI chat functionality
type AIChatService struct {
	aiModelService *AIModelService
	toolSetService *ToolSetService
}

var aiChatSessionCleanupTaskType = model.TaskType("ai_chat_session_cleanup_task")

var (
	aiChatServiceOnce sync.Once
	aiChatService     *AIChatService
)

// NewAIChatService creates a new AI chat service
func NewAIChatService() *AIChatService {
	aiChatServiceOnce.Do(func() {
		aiChatService = &AIChatService{
			aiModelService: NewAIModelService(),
			toolSetService: NewToolSetService(),
		}
		taskscheduler.RegisterScheduledJob(&taskscheduler.ScheduledJobDef{
			ID:             "ai-chat-session-cleanup",
			Name:           "AI Chat Session Cleanup",
			Spec:           "0 0 * * *",
			Schedule:       cron.Every(time.Hour * 24),
			Description:    "Cleanup AI chat sessions",
			TaskType:       aiChatSessionCleanupTaskType,
			PayloadBuilder: func() string { return "{}" },
			Runner: taskscheduler.NewFuncTaskRunner(func(ctx context.Context, t *model.Task, progressCallback taskscheduler.ProgressCallback, cancelCh <-chan struct{}) (result interface{}, err error) {
				logger := log.GetContextLogger(ctx)
				settingSvc := new(SettingService)
				retentionDays, _ := settingSvc.GetIntSetting(ctx, model.SettingTaskAIChatRetentionDays, 90)
				if retentionDays < 1 {
					retentionDays = 90
				}
				level.Info(logger).Log("msg", "AI chat session cleanup started", "retention_days", retentionDays)
				cutoff := time.Now().Add(-time.Hour * 24 * time.Duration(retentionDays))

				dbConn := db.Session(ctx)

				lastMsgSubForCount := dbConn.Model(&model.AIChatMessage{}).
					Select("session_id, MAX(message_time) AS last_message_time").
					Group("session_id")

				var totalSessions int64
				if err := dbConn.Table(model.AIChatSession{}.TableName()+" AS s").
					Joins("LEFT JOIN (?) AS m ON m.session_id = s.resource_id", lastMsgSubForCount).
					Where("COALESCE(m.last_message_time, s.start_time) < ?", cutoff).
					Count(&totalSessions).Error; err != nil {
					return nil, fmt.Errorf("failed to count expired chat sessions: %w", err)
				}

				if totalSessions == 0 {
					progressCallback(100)
					level.Info(logger).Log("msg", "AI chat session cleanup completed", "deleted_sessions", 0, "retention_days", retentionDays)
					return map[string]interface{}{"deleted_sessions": 0, "retention_days": retentionDays}, nil
				}

				level.Info(logger).Log("msg", "AI chat session cleanup started", "total_sessions", totalSessions, "retention_days", retentionDays)

				const batchSize = 500
				deletedSessions := 0
				for {
					select {
					case <-cancelCh:
						return nil, taskscheduler.ErrCancelled
					default:
					}

					lastMsgSub := dbConn.Model(&model.AIChatMessage{}).
						Select("session_id, MAX(message_time) AS last_message_time").
						Group("session_id")

					var batch []string
					if err := dbConn.Table(model.AIChatSession{}.TableName()+" AS s").
						Select("s.resource_id").
						Joins("LEFT JOIN (?) AS m ON m.session_id = s.resource_id", lastMsgSub).
						Where("COALESCE(m.last_message_time, s.start_time) < ?", cutoff).
						Limit(batchSize).
						Pluck("s.resource_id", &batch).Error; err != nil {
						return nil, fmt.Errorf("failed to query expired chat sessions: %w", err)
					}

					if len(batch) == 0 {
						break
					}

					if err := dbConn.Transaction(func(tx *gorm.DB) error {
						if err := tx.Unscoped().Where("session_id IN ?", batch).Delete(&model.AIChatMessage{}).Error; err != nil {
							return err
						}
						if err := tx.Unscoped().Where("resource_id IN ?", batch).Delete(&model.AIChatSession{}).Error; err != nil {
							return err
						}
						return nil
					}); err != nil {
						return nil, fmt.Errorf("failed to cleanup chat sessions: %w", err)
					}

					deletedSessions += len(batch)
					progress := int(float64(deletedSessions) / float64(totalSessions) * 99)
					if progress < 1 {
						progress = 1
					}
					progressCallback(progress)
					level.Info(logger).Log("msg", "AI chat session cleanup in progress", "deleted_sessions", deletedSessions, "total_sessions", totalSessions, "progress", progress)
				}

				progressCallback(100)
				level.Info(logger).Log("msg", "AI chat session cleanup completed", "deleted_sessions", deletedSessions, "retention_days", retentionDays)
				return map[string]interface{}{"deleted_sessions": deletedSessions, "retention_days": retentionDays}, nil
			}),
		})
	})
	return aiChatService
}

// CreateChatSession creates a new chat session
func (s *AIChatService) CreateChatSession(ctx context.Context, organizationID, userID, title, modelID string, messages []ai.SimpleChatMessage, anonymous bool) (*model.AIChatSession, error) {
	session := model.NewAIChatSession(organizationID, userID, title, modelID, anonymous)

	err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if err := db.Session(ctx).Create(session).Error; err != nil {
			return fmt.Errorf("failed to create chat session: %w", err)
		}
		for _, message := range messages {
			if err := db.Session(ctx).Create(&model.AIChatMessage{
				OrganizationID: organizationID,
				UserID:         userID,
				SessionID:      session.ResourceID,
				Role:           message.Role,
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
func (s *AIChatService) GetChatSession(ctx context.Context, organizationID, userID, sessionID string) (*model.AIChatSession, error) {
	var session model.AIChatSession
	if err := db.Session(ctx).Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, sessionID).First(&session).Error; err != nil {
		return nil, fmt.Errorf("failed to get chat session: %w", err)
	}

	return &session, nil
}

// GetUserChatSessions gets chat sessions for a user with pagination
func (s *AIChatService) GetUserChatSessions(ctx context.Context, organizationID, userID string, current, pageSize int) ([]model.AIChatSession, int64, error) {
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
func (s *AIChatService) AddChatMessage(ctx context.Context, organizationID, userID, sessionID string, role model.AIChatMessageRole, content string, toolCalls model.AIToolCalls, toolCallID string) (*model.AIChatMessage, error) {
	message := model.NewAIChatMessage(organizationID, userID, sessionID, role, content, toolCalls, toolCallID)

	if err := db.Session(ctx).Create(message).Error; err != nil {
		return nil, fmt.Errorf("failed to add chat message: %w", err)
	}

	return message, nil
}

// GetChatMessages gets active messages for a chat session (excludes summarized messages).
func (s *AIChatService) GetChatMessages(ctx context.Context, organizationID, userID, sessionID string) ([]model.AIChatMessage, error) {
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
func (s *AIChatService) GetSimpleChatMessages(ctx context.Context, organizationID, userID, sessionID string) ([]model.AIChatMessage, error) {
	var messages []model.AIChatMessage
	if err := db.Session(ctx).
		Where("organization_id = ? AND user_id = ? AND session_id = ?", organizationID, userID, sessionID).
		Where("role in ? and (tool_calls is null or tool_calls = '')", []model.AIChatMessageRole{model.AIChatMessageRoleUser, model.AIChatMessageRoleAssistant}).
		Where("is_summary = ?", false).
		Order("message_time ASC").Find(&messages).Error; err != nil {
		return nil, fmt.Errorf("failed to get chat messages: %w", err)
	}

	return messages, nil
}

// UpdateChatMessage updates a chat message
func (s *AIChatService) UpdateChatToolCallResult(ctx context.Context, organizationID, userID, sessionID string, toolCallID string, result string) error {
	if err := db.Session(ctx).Model(&model.AIChatMessage{}).Where("organization_id = ? AND user_id = ? AND session_id = ? AND tool_call_id = ?", organizationID, userID, sessionID, toolCallID).Update("content", result).Error; err != nil {
		return fmt.Errorf("failed to update chat tool call result: %w", err)
	}

	return nil
}

// DeleteSessionAllMessages deletes all messages in a session.
func (s *AIChatService) DeleteSessionAllMessages(ctx context.Context, organizationID, userID, sessionID string) error {
	if err := db.Session(ctx).Model(&model.AIChatMessage{}).Where("organization_id = ? AND user_id = ? AND session_id = ?", organizationID, userID, sessionID).Delete(&model.AIChatMessage{}).Error; err != nil {
		return fmt.Errorf("failed to delete session messages: %w", err)
	}

	return nil
}

// MarkSessionMessagesSummarized marks all existing messages in a session as
// summarized (superseded). It also clears the is_summary flag on any previous
// summary messages so only the newly added summaries are considered active.
func (s *AIChatService) MarkSessionMessagesSummarized(ctx context.Context, organizationID, userID, sessionID string) error {
	if err := db.Session(ctx).Model(&model.AIChatMessage{}).
		Where("organization_id = ? AND user_id = ? AND session_id = ?", organizationID, userID, sessionID).
		Updates(map[string]interface{}{"summarized": true, "is_summary": false}).Error; err != nil {
		return fmt.Errorf("failed to mark messages as summarized: %w", err)
	}
	return nil
}

// AddSummaryChatMessage persists a summary message that replaces older
// conversation history for the AI context but is hidden from the frontend.
func (s *AIChatService) AddSummaryChatMessage(ctx context.Context, organizationID, userID, sessionID string, role model.AIChatMessageRole, content string) (*model.AIChatMessage, error) {
	message := model.NewAIChatMessage(organizationID, userID, sessionID, role, content, nil, "")
	message.IsSummary = true

	if err := db.Session(ctx).Create(message).Error; err != nil {
		return nil, fmt.Errorf("failed to add summary chat message: %w", err)
	}
	return message, nil
}

// EndChatSession ends a chat session
func (s *AIChatService) EndChatSession(ctx context.Context, organizationID, userID, sessionID string) error {
	now := time.Now()
	if err := db.Session(ctx).Model(&model.AIChatSession{}).Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, sessionID).Update("end_time", now).Error; err != nil {
		return fmt.Errorf("failed to end chat session: %w", err)
	}

	return nil
}

// DeleteChatSession deletes a chat session and all its messages
func (s *AIChatService) DeleteChatSession(ctx context.Context, organizationID, userID, sessionID string) error {
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

// UpdateChatSessionTitle updates the title of a chat session
func (s *AIChatService) UpdateChatSessionTitle(ctx context.Context, organizationID, userID, sessionID string, title string) error {
	if err := db.Session(ctx).Model(&model.AIChatSession{}).Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, sessionID).Update("title", title).Error; err != nil {
		return fmt.Errorf("failed to update chat session title: %w", err)
	}
	return nil
}

// GenerateChatSessionTitle generates a title for a chat session based on conversation content
func (s *AIChatService) GenerateChatSessionTitle(ctx context.Context, organizationID, userID, sessionID, modelID string) (string, error) {
	// Get chat messages
	messages, err := s.GetChatMessages(ctx, organizationID, userID, sessionID)
	if err != nil {
		return "", fmt.Errorf("failed to get chat messages: %w", err)
	}

	lastUserMessageIndex := -1
	for i, msg := range messages {
		if msg.Role == model.AIChatMessageRoleUser {
			lastUserMessageIndex = i
		}
	}
	if lastUserMessageIndex != -1 {
		messages = messages[:lastUserMessageIndex+1]
	}

	// Filter out tool messages and get only user and assistant messages
	var conversationMessages []model.AIChatMessage
	for _, msg := range messages {
		if msg.Role == model.AIChatMessageRoleUser || msg.Role == model.AIChatMessageRoleAssistant {
			conversationMessages = append(conversationMessages, msg)
		}
	}

	// If no messages, return default title
	if len(conversationMessages) == 0 {
		return "New Conversation", nil
	}

	// Build prompt for title generation
	// Use first user message and first assistant response for title generation
	var titlePromptMessages []ai.ChatMessage
	titlePromptMessages = append(titlePromptMessages, ai.ChatMessage{
		Role:    model.AIChatMessageRoleSystem,
		Content: "Generate a concise title (maximum 50 characters) for this conversation based on the user's first message and the assistant's response. The title should summarize the main topic or question. Return only the title, no additional text.",
	})

	// Add first user and assistant messages
	if len(conversationMessages) >= 1 {
		titlePromptMessages = append(titlePromptMessages, ai.ChatMessage{
			Role:    conversationMessages[0].Role,
			Content: conversationMessages[0].Content,
		})
	}
	if len(conversationMessages) >= 2 {
		titlePromptMessages = append(titlePromptMessages, ai.ChatMessage{
			Role:    conversationMessages[1].Role,
			Content: conversationMessages[1].Content,
		})
	}

	// Generate title using AI
	responseMessages, err := s.CreateChatCompletionWithoutToolSets(ctx, organizationID, modelID, titlePromptMessages)
	if err != nil {
		return "", fmt.Errorf("failed to generate title: %w", err)
	}

	if len(responseMessages) == 0 || responseMessages[0].Content == "" {
		return "New Conversation", nil
	}

	// Extract and clean the title
	title := responseMessages[0].Content
	// Remove quotes if present
	if len(title) > 0 && (title[0] == '"' || title[0] == '\'') {
		title = title[1:]
	}
	if len(title) > 0 && (title[len(title)-1] == '"' || title[len(title)-1] == '\'') {
		title = title[:len(title)-1]
	}
	// Trim whitespace
	title = strings.TrimRight(strings.TrimSpace(title), "\ufffd")
	// Limit to 50 characters
	if len(title) > 50 {
		title = title[:50]
	}
	// If empty after cleaning, use default
	if title == "" {
		title = "New Conversation"
	}

	return title, nil
}

// // CreateChatCompletion creates a chat completion using the specified model
// // It automatically gets authorized toolSets for the organization
// func (s *AIChatService) {
// 	// Get authorized toolSets for the organization
// 	toolSets, err := s.getAuthorizedToolSets(ctx, organizationID)
// 	if err != nil {
// 		return nil, fmt.Errorf("failed to get authorized toolSets: %w", err)
// 	}

// 	// Call CreateChatCompletionWithToolSets with the obtained toolSets
// 	return s.CreateChatCompletionWithToolSets(ctx, organizationID, modelID, messages, toolSets)
// }

// CreateChatCompletionWithToolSets creates a chat completion using the specified model with toolSets
func (s *AIChatService) CreateChatCompletionWithoutToolSets(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, options ...ai.WithChatOptions) ([]ai.ChatMessage, error) {
	var err error
	var aiModel *model.AIModel
	// Get the AI model
	if modelID == "" {
		aiModel, err = s.aiModelService.GetDefaultAIModel(ctx, organizationID)
		if err != nil {
			return nil, fmt.Errorf("failed to get default AI model: %w", err)
		}
	} else {
		aiModel, err = s.aiModelService.GetAIModel(ctx, organizationID, modelID)
		if err != nil {
			return nil, fmt.Errorf("failed to get AI model: %w", err)
		}
	}

	// Get factory for the provider
	factory, ok := ai.GetFactory(aiModel.Provider)
	if !ok {
		return nil, fmt.Errorf("unsupported AI provider: %s", aiModel.Provider)
	}

	// Create AI client using factory with Config from AIModel
	config := aiModel.Config
	if config == nil {
		config = make(map[string]interface{})
	}
	client, err := factory.CreateClient(ctx, organizationID, config)
	if err != nil {
		return nil, fmt.Errorf("failed to create AI client: %w", err)
	}

	// Call CreateChat
	responseMessages, err := client.Exchange(ctx, messages, options...)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion: %w", err)
	}

	return responseMessages, nil
}

// CreateChatCompletionWithToolSets creates a chat completion using the specified model with toolSets
func (s *AIChatService) CreateChatCompletion(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, options ...ai.WithChatOptions) ([]ai.ChatMessage, error) {
	var err error
	var aiModel *model.AIModel
	// Get the AI model
	if modelID == "" {
		aiModel, err = s.aiModelService.GetDefaultAIModel(ctx, organizationID)
		if err != nil {
			return nil, fmt.Errorf("failed to get default AI model: %w", err)
		}
	} else {
		aiModel, err = s.aiModelService.GetAIModel(ctx, organizationID, modelID)
		if err != nil {
			return nil, fmt.Errorf("failed to get AI model: %w", err)
		}
	}
	options = append([]ai.WithChatOptions{
		ai.WithChatToolSetsFactory(func(ctx context.Context) (toolset.ToolSets, error) {
			return s.toolSetService.GetAuthorizedToolSets(ctx, organizationID)
		}),
	}, options...)

	// Get factory for the provider
	factory, ok := ai.GetFactory(aiModel.Provider)
	if !ok {
		return nil, fmt.Errorf("unsupported AI provider: %s", aiModel.Provider)
	}

	// Create AI client using factory with Config from AIModel
	config := aiModel.Config
	if config == nil {
		config = make(map[string]interface{})
	}
	client, err := factory.CreateClient(ctx, organizationID, config)
	if err != nil {
		return nil, fmt.Errorf("failed to create AI client: %w", err)
	}

	// Call CreateChat
	responseMessages, err := client.Exchange(ctx, messages, options...)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion: %w", err)
	}

	return responseMessages, nil
}

// CreateChatCompletionStream creates a streaming chat completion
func (s *AIChatService) CreateChatCompletionStream(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, options ...ai.WithChatOptions) (ai.ChatStream, error) {
	var err error
	var aiModel *model.AIModel
	// Get the AI model
	if modelID == "" {
		aiModel, err = s.aiModelService.GetDefaultAIModel(ctx, organizationID)
		if err != nil {
			return nil, fmt.Errorf("failed to get default AI model: %w", err)
		}
	} else {
		aiModel, err = s.aiModelService.GetAIModel(ctx, organizationID, modelID)
		if err != nil {
			return nil, fmt.Errorf("failed to get AI model: %w", err)
		}
	}

	toolSets, err := s.toolSetService.GetAuthorizedToolSets(ctx, organizationID)
	if err != nil {
		return nil, err
	}

	// Get factory for the provider
	factory, ok := ai.GetFactory(aiModel.Provider)
	if !ok {
		return nil, fmt.Errorf("unsupported AI provider: %s", aiModel.Provider)
	}

	// Create AI client using factory with Config from AIModel
	config := aiModel.Config
	if config == nil {
		config = make(map[string]interface{})
	}
	client, err := factory.CreateClient(ctx, organizationID, config)
	if err != nil {
		return nil, fmt.Errorf("failed to create AI client: %w", err)
	}

	// Get max_tokens from model config if available
	var maxTokens int
	if aiModel.Config != nil {
		if mt, ok := aiModel.Config["max_tokens"].(float64); ok {
			maxTokens = int(mt)
		} else if mt, ok := aiModel.Config["max_tokens"].(int); ok {
			maxTokens = mt
		}
	}

	allOptions := []ai.WithChatOptions{ai.WithChatToolSets(toolSets)}
	if maxTokens > 0 {
		allOptions = append(allOptions, ai.WithChatMaxTokens(maxTokens))
	}
	allOptions = append(allOptions, options...)
	// Call ExchangeStream
	stream, err := client.ExchangeStream(ctx, messages, allOptions...)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion stream: %w", err)
	}

	return stream, nil
}

// GetAvailableTools gets all available tools from enabled toolsets
func (s *AIChatService) GetAvailableTools(ctx context.Context) ([]openai.Tool, error) {
	logger := log.GetContextLogger(ctx)
	organizationID := getOrganizationIDFromContext(ctx)
	toolSets, err := s.toolSetService.GetAuthorizedToolSets(ctx, organizationID)
	if err != nil {
		return nil, fmt.Errorf("failed to get enabled toolset instances: %w", err)
	}

	var allTools []openai.Tool
	for _, toolset := range toolSets {
		tools, err := toolset.ListTools(ctx)
		if err != nil {
			// Log error but continue with other toolsets
			level.Error(logger).Log("msg", "Failed to list tools from toolset", "toolset", toolset.GetName(), "error", err)
			continue
		}
		allTools = append(allTools, tools...)
	}

	return allTools, nil
}

func getOrganizationIDFromContext(ctx context.Context) string {
	orgID, _ := ctx.Value("organization_id").(string)
	return orgID
}

type filteredToolSet struct {
	base    toolset.ToolSet
	allowed map[string]struct{}
}

func newFilteredToolSet(base toolset.ToolSet, allowed map[string]struct{}) toolset.ToolSet {
	if len(allowed) == 0 {
		return base
	}
	return &filteredToolSet{
		base:    base,
		allowed: allowed,
	}
}

func (f *filteredToolSet) GetName() string {
	return f.base.GetName()
}

func (f *filteredToolSet) GetDescription() string {
	return f.base.GetDescription()
}

func (f *filteredToolSet) Validate() error {
	return f.base.Validate()
}

func (f *filteredToolSet) Test(ctx context.Context) error {
	return f.base.Test(ctx)
}

func (f *filteredToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	if len(f.allowed) > 0 {
		if _, ok := f.allowed["*"]; !ok {
			if _, ok := f.allowed[name]; !ok {
				return "", fmt.Errorf("tool %s is not allowed", name)
			}
		}
	}
	return f.base.Call(ctx, name, parameters)
}

func (f *filteredToolSet) ListTools(ctx context.Context) ([]openai.Tool, error) {
	tools, err := f.base.ListTools(ctx)
	if err != nil {
		return nil, err
	}
	if len(f.allowed) == 0 {
		return tools, nil
	}
	filtered := make([]openai.Tool, 0, len(tools))
	for _, tool := range tools {
		if _, ok := f.allowed["*"]; ok {
			filtered = append(filtered, tool)
			continue
		}
		if tool.Function == nil {
			continue
		}
		if _, ok := f.allowed[tool.Function.Name]; ok {
			filtered = append(filtered, tool)
		}
	}
	return filtered, nil
}
