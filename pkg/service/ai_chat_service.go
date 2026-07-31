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
	"github.com/sven-victor/ez-agent/memory"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
)

type aiChatService struct {
	aiModelService AIModelService
	aiTraceService AITraceService
	baseService    BaseService
	skillService   SkillService
	sessionService AISessionService
}

// AddChatMessage implements AIChatService.
func (s *aiChatService) AddChatMessage(ctx context.Context, organizationID string, userID string, sessionID string, role model.AIChatMessageRole, content string, toolCalls model.AIToolCalls, toolCallID string) (*model.AIChatMessage, error) {
	return s.sessionService.AddChatMessage(ctx, organizationID, userID, sessionID, role, content, toolCalls, toolCallID)
}

// AppendSessionActivatedSkill implements AIChatService.
func (s *aiChatService) AppendSessionActivatedSkill(ctx context.Context, organizationID string, userID string, sessionID string, skillID string) error {
	return s.sessionService.AppendSessionActivatedSkill(ctx, organizationID, userID, sessionID, skillID)
}

// ClearSessionActivatedSkills implements AIChatService.
func (s *aiChatService) ClearSessionActivatedSkills(ctx context.Context, organizationID string, userID string, sessionID string) error {
	return s.sessionService.ClearSessionActivatedSkills(ctx, organizationID, userID, sessionID)
}

// DeleteChatSession implements AIChatService.
func (s *aiChatService) DeleteChatSession(ctx context.Context, organizationID string, userID string, sessionID string) error {
	return s.sessionService.DeleteChatSession(ctx, organizationID, userID, sessionID)
}

// DeleteSessionAllMessages implements AIChatService.
func (s *aiChatService) DeleteSessionAllMessages(ctx context.Context, organizationID string, userID string, sessionID string) error {
	return s.sessionService.DeleteSessionAllMessages(ctx, organizationID, userID, sessionID)
}

// GetChatMessages implements AIChatService.
func (s *aiChatService) GetChatMessages(ctx context.Context, organizationID string, userID string, sessionID string) ([]model.AIChatMessage, error) {
	return s.sessionService.GetChatMessages(ctx, organizationID, userID, sessionID)
}

// GetSimpleChatMessages implements AIChatService.
func (s *aiChatService) GetSimpleChatMessages(ctx context.Context, organizationID string, userID string, sessionID string) ([]model.AIChatMessage, error) {
	return s.sessionService.GetSimpleChatMessages(ctx, organizationID, userID, sessionID)
}

// GetUserChatSessions implements AIChatService.
func (s *aiChatService) GetUserChatSessions(ctx context.Context, organizationID string, userID string, current int, pageSize int) ([]model.AIChatSession, int64, error) {
	return s.sessionService.GetUserChatSessions(ctx, organizationID, userID, current, pageSize)
}

// UpdateChatSessionTitle implements AIChatService.
func (s *aiChatService) UpdateChatSessionTitle(ctx context.Context, organizationID string, userID string, sessionID string, title string) error {
	return s.sessionService.UpdateChatSessionTitle(ctx, organizationID, userID, sessionID, title)
}

// UpdateChatToolCallResult implements AIChatService.
func (s *aiChatService) UpdateChatToolCallResult(ctx context.Context, organizationID string, userID string, sessionID string, toolCallID string, result string) error {
	return s.sessionService.UpdateChatToolCallResult(ctx, organizationID, userID, sessionID, toolCallID, result)
}

// UpdateSessionTokenUsage implements AIChatService.
func (s *aiChatService) UpdateSessionTokenUsage(ctx context.Context, organizationID string, userID string, sessionID string, promptTokens int, completionTokens int, activeTokens int) error {
	return s.sessionService.UpdateSessionTokenUsage(ctx, organizationID, userID, sessionID, promptTokens, completionTokens, activeTokens)
}

type sessionServiceKey struct{}

func WithSessionService(ctx context.Context, sessionService AISessionService) context.Context {
	return context.WithValue(ctx, sessionServiceKey{}, sessionService)
}

// AIChatService handles AI chat functionality.
type AIChatService interface {
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
	GetSessionStore(ctx context.Context, organizationID, userID string) memory.SessionStore

	GenerateChatSessionTitle(ctx context.Context, organizationID, userID, sessionID, modelID string) (string, error)
	CreateChatCompletionWithoutToolSets(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, options ...ai.WithChatOptions) ([]ai.ChatMessage, error)
	CreateChatCompletion(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, skillLoader *ai.SkillLoader, options ...ai.WithChatOptions) ([]ai.ChatMessage, error)
	CreateChatCompletionStream(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, skillLoader *ai.SkillLoader, options ...ai.WithChatOptions) (ai.ChatStream, error)
}

var aiChatSessionCleanupTaskType = model.TaskType("ai_chat_session_cleanup_task")

var (
	aiChatServiceOnce sync.Once
	aiChatSvc         AIChatService
)

// NewAIChatService creates a new AI chat service.
func NewAIChatService(ctx context.Context, baseService BaseService, aiModelService AIModelService, aiTraceService AITraceService, skillService SkillService) AIChatService {
	aiChatServiceOnce.Do(func() {
		sessionService, _ := ctx.Value(sessionServiceKey{}).(AISessionService)
		if sessionService == nil {
			sessionService = NewDBSessionService()
		}
		aiChatSvc = &aiChatService{
			aiModelService: aiModelService,
			aiTraceService: aiTraceService,
			baseService:    baseService,
			skillService:   skillService,
			sessionService: sessionService,
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
				retentionDays, _ := baseService.GetIntSetting(ctx, model.SettingTaskAIChatRetentionDays, 90)
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
	return aiChatSvc
}

func (s *aiChatService) CreateChatSession(ctx context.Context, organizationID, userID, title, modelID string, messages []ai.SimpleChatMessage, anonymous bool) (*model.AIChatSession, error) {
	return s.sessionService.CreateChatSession(ctx, organizationID, userID, title, modelID, messages, anonymous)
}

func (s *aiChatService) GetChatSession(ctx context.Context, organizationID, userID, sessionID string) (*model.AIChatSession, error) {
	return s.sessionService.GetChatSession(ctx, organizationID, userID, sessionID)
}

func (s *aiChatService) GetSessionStore(ctx context.Context, organizationID, userID string) memory.SessionStore {
	return s.sessionService.Store(ctx, organizationID, userID)
}

// GenerateChatSessionTitle generates a title for a chat session based on conversation content
func (s *aiChatService) GenerateChatSessionTitle(ctx context.Context, organizationID, userID, sessionID, modelID string) (string, error) {
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

// withAIModelChatTokenAndIterationOptions returns default MaxChatTokens / MaxChatIterations / SystemPrompt from the AIModel.
// Apply caller-supplied WithChatOptions after this slice so callers can override these defaults.
func withAIModelChatTokenAndIterationOptions(aiModel *model.AIModel) []ai.WithChatOptions {
	maxTokens := aiModel.MaxChatTokens
	if maxTokens <= 0 && aiModel.Config != nil {
		if mt, ok := aiModel.Config["max_tokens"].(float64); ok {
			maxTokens = int(mt)
		} else if mt, ok := aiModel.Config["max_tokens"].(int); ok {
			maxTokens = mt
		}
	}
	var out []ai.WithChatOptions
	systemPrompt := aiModel.SystemPrompt
	// Backward compatibility: legacy OpenAI config stored system_prompt inside Config.
	if systemPrompt == "" && aiModel.Config != nil {
		if sp, ok := aiModel.Config["system_prompt"].(string); ok {
			systemPrompt = sp
		}
	}
	if systemPrompt != "" {
		out = append(out, ai.WithChatModelSystemPrompt(systemPrompt))
	}
	if maxTokens > 0 {
		out = append(out, ai.WithChatMaxTokens(maxTokens))
	}
	if aiModel.MaxChatIterations > 0 {
		out = append(out, ai.WithChatMaxIterations(aiModel.MaxChatIterations))
	}
	return out
}

// CreateChatCompletionWithoutToolSets creates a chat completion using the specified model without toolSets.
func (s *aiChatService) CreateChatCompletionWithoutToolSets(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, options ...ai.WithChatOptions) ([]ai.ChatMessage, error) {
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

	// Prepend global prompts for non-stream calls
	messages = prependGlobalPrompts(messages, ai.GlobalPromptCategoryNonStream)

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

	callOptions := append(withAIModelChatTokenAndIterationOptions(aiModel), options...)
	callOptions = s.appendTraceChatOptionsIfEnabled(ctx, callOptions)
	responseMessages, err := client.Exchange(ctx, messages, callOptions...)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion: %w", err)
	}

	return responseMessages, nil
}

// mergeAIChatClientOptions builds shared chat options for Exchange and ExchangeStream: cached authorized toolsets,
// optional get_skill_content toolset, progressive refresh when skill–tool binding is enabled, model limits, trace hooks, and SkillLoader.
func (s *aiChatService) mergeAIChatClientOptions(ctx context.Context, organizationID string, skillLoader *ai.SkillLoader, aiModel *model.AIModel, options []ai.WithChatOptions) []ai.WithChatOptions {
	enableSkillToolBinding, _ := s.baseService.GetBoolSetting(ctx, model.SettingSystemEnableSkillToolBinding, false)

	var skillLoaderOptions ai.WithChatOptions
	allOptions := []ai.WithChatOptions{
		ai.WithChatToolSetsProvider(toolset.NewCachedToolSetsProvider(func(ctx context.Context) (toolset.ToolSets, error) {
			return s.baseService.GetAuthorizedToolSets(ctx, organizationID)
		})),
	}
	if skillLoader != nil && skillLoader.HasSkills() {
		skillLoaderOptions = ai.WithChatToolSetsProviderChan(func(ctx context.Context, oriProvider toolset.ToolSetsProvider) (toolset.ToolSets, error) {
			ts, err := oriProvider(ctx)
			if err != nil {
				return nil, err
			}
			if ts == nil {
				ts = make(toolset.ToolSets)
			}
			ts[ai.SkillLoaderToolSetKey] = ai.NewSkillLoaderChatToolSet(skillLoader)
			return ts, nil
		})
	}
	if enableSkillToolBinding && skillLoader != nil {
		allOptions = append(allOptions, ai.WithChatRefreshToolSetsEachIteration(true))
	}
	allOptions = append(allOptions, withAIModelChatTokenAndIterationOptions(aiModel)...)
	allOptions = append(allOptions, options...)
	allOptions = s.appendTraceChatOptionsIfEnabled(ctx, allOptions)
	if skillLoader != nil {
		allOptions = append(allOptions, ai.WithChatSkillLoader(skillLoader))
	}
	if skillLoaderOptions != nil {
		allOptions = append(allOptions, skillLoaderOptions)
	}
	return allOptions
}

// CreateChatCompletion creates a chat completion using the specified model with toolSets.
// Pass skillLoader when the chat includes skills; when system skill–tool binding is enabled, organization tools are exposed progressively like streaming completions.
func (s *aiChatService) CreateChatCompletion(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, skillLoader *ai.SkillLoader, options ...ai.WithChatOptions) ([]ai.ChatMessage, error) {
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
	mergedOptions := s.mergeAIChatClientOptions(ctx, organizationID, skillLoader, aiModel, options)

	// Prepend global prompts for non-stream calls
	messages = prependGlobalPrompts(messages, ai.GlobalPromptCategoryNonStream)

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

	responseMessages, err := client.Exchange(ctx, messages, mergedOptions...)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion: %w", err)
	}

	return responseMessages, nil
}

// CreateChatCompletionStream creates a streaming chat completion.
// skillParams is nil for chats without skill metadata; when set, organization tools may load only after get_skill_content (see system_enable_skill_tool_binding).
func (s *aiChatService) CreateChatCompletionStream(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, skillLoader *ai.SkillLoader, options ...ai.WithChatOptions) (ai.ChatStream, error) {
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

	// Prepend global prompts for stream calls
	messages = prependGlobalPrompts(messages, ai.GlobalPromptCategoryStream)

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

	allOptions := s.mergeAIChatClientOptions(ctx, organizationID, skillLoader, aiModel, options)

	// Call ExchangeStream
	stream, err := client.ExchangeStream(ctx, messages, allOptions...)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion stream: %w", err)
	}

	return stream, nil
}

// appendTraceChatOptionsIfEnabled attaches TraceWriter/TraceCounter when AI debug tracing is enabled.
// ez-agent hooks in buildAgentHooks persist llm_request/response, tools, summary, and token usage.
func (s *aiChatService) appendTraceChatOptionsIfEnabled(ctx context.Context, options []ai.WithChatOptions) []ai.WithChatOptions {
	if !s.aiTraceService.IsTraceEnabled(ctx) {
		return options
	}
	writer := s.aiTraceService.NewTraceEventWriter()
	counter := &ai.TraceCounter{}
	return append(options, ai.WithChatTrace(writer, counter))
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

// prependGlobalPrompts prepends registered global prompts to the message list.
func prependGlobalPrompts(messages []ai.ChatMessage, category ai.GlobalPromptCategory) []ai.ChatMessage {
	globalMsgs := ai.GetGlobalPromptMessages(category)
	if len(globalMsgs) == 0 {
		return messages
	}
	return append(globalMsgs, messages...)
}
