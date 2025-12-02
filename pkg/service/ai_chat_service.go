package service

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/go-kit/log/level"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
)

// AIChatService handles AI chat functionality
type AIChatService struct {
	aiModelService *AIModelService
	toolSetService *ToolSetService
}

// NewAIChatService creates a new AI chat service
func NewAIChatService(aiModelService *AIModelService, toolSetService *ToolSetService) *AIChatService {
	return &AIChatService{
		aiModelService: aiModelService,
		toolSetService: toolSetService,
	}
}

// CreateChatSession creates a new chat session
func (s *AIChatService) CreateChatSession(ctx context.Context, organizationID, userID, title, modelID string) (*model.AIChatSession, error) {
	session := model.NewAIChatSession(organizationID, userID, title, modelID)

	if err := db.Session(ctx).Create(session).Error; err != nil {
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

	query := db.Session(ctx).Model(&model.AIChatSession{}).Where("organization_id = ? AND user_id = ?", organizationID, userID)

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

// GetChatMessages gets messages for a chat session
func (s *AIChatService) GetChatMessages(ctx context.Context, organizationID, userID, sessionID string) ([]model.AIChatMessage, error) {
	var messages []model.AIChatMessage
	if err := db.Session(ctx).Where("organization_id = ? AND user_id = ? AND session_id = ?", organizationID, userID, sessionID).Order("message_time ASC").Find(&messages).Error; err != nil {
		return nil, fmt.Errorf("failed to get chat messages: %w", err)
	}

	return messages, nil
}

// UpdateChatMessage updates a chat message
func (s *AIChatService) UpdateChatMessage(ctx context.Context, organizationID, userID, messageID string, updates map[string]interface{}) error {
	if err := db.Session(ctx).Model(&model.AIChatMessage{}).Where("organization_id = ? AND user_id = ? AND resource_id = ?", organizationID, userID, messageID).Updates(updates).Error; err != nil {
		return fmt.Errorf("failed to update chat message: %w", err)
	}

	return nil
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
	responseMessages, err := s.CreateChatCompletion(ctx, organizationID, modelID, titlePromptMessages)
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
	title = strings.TrimSpace(title)
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

// CreateChatCompletion creates a chat completion using the specified model
// It automatically gets authorized toolSets for the organization
func (s *AIChatService) CreateChatCompletion(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage) ([]ai.ChatMessage, error) {
	// Get authorized toolSets for the organization
	toolSets, err := s.getAuthorizedToolSets(ctx, organizationID)
	if err != nil {
		return nil, fmt.Errorf("failed to get authorized toolSets: %w", err)
	}

	// Call CreateChatCompletionWithToolSets with the obtained toolSets
	return s.CreateChatCompletionWithToolSets(ctx, organizationID, modelID, messages, toolSets)
}

// CreateChatCompletionWithToolSets creates a chat completion using the specified model with toolSets
func (s *AIChatService) CreateChatCompletionWithToolSets(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, toolSets toolset.ToolSets) ([]ai.ChatMessage, error) {
	// Get the AI model
	aiModel, err := s.aiModelService.GetAIModel(ctx, organizationID, modelID)
	if err != nil {
		return nil, fmt.Errorf("failed to get AI model: %w", err)
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
	client, err := factory.CreateClient(config)
	if err != nil {
		return nil, fmt.Errorf("failed to create AI client: %w", err)
	}

	// Call CreateChat
	responseMessages, err := client.CreateChat(ctx, messages, ai.WithChatCompletionToolSets(toolSets))
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion: %w", err)
	}

	return responseMessages, nil
}

// CreateChatCompletionStream creates a streaming chat completion
func (s *AIChatService) CreateChatCompletionStream(ctx context.Context, organizationID, modelID string, messages []ai.ChatMessage, options ...ai.WithChatCompletionStreamOptions) (ai.ChatStream, error) {
	// Get the AI model
	aiModel, err := s.aiModelService.GetAIModel(ctx, organizationID, modelID)
	if err != nil {
		return nil, fmt.Errorf("failed to get AI model: %w", err)
	}

	toolSets, err := s.getAuthorizedToolSets(ctx, organizationID)
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
	client, err := factory.CreateClient(config)
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

	// Call CreateChatStream
	allOptions := []ai.WithChatCompletionStreamOptions{ai.WithChatCompletionStreamToolSets(toolSets)}
	if maxTokens > 0 {
		allOptions = append(allOptions, ai.WithChatCompletionStreamMaxTokens(maxTokens))
	}
	allOptions = append(allOptions, options...)
	stream, err := client.CreateChatStream(ctx, messages, allOptions...)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion stream: %w", err)
	}

	return stream, nil
}

// GetAvailableTools gets all available tools from enabled toolsets
func (s *AIChatService) GetAvailableTools(ctx context.Context) ([]openai.Tool, error) {
	logger := log.GetContextLogger(ctx)
	organizationID := getOrganizationIDFromContext(ctx)
	toolSets, err := s.getAuthorizedToolSets(ctx, organizationID)
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

func (s *AIChatService) getAuthorizedToolSets(ctx context.Context, organizationID string) (toolset.ToolSets, error) {
	allowedTools := getAllowedAIToolPermissions(ctx, organizationID)
	if len(allowedTools) == 0 {
		return nil, nil
	}

	var filtered toolset.ToolSets
	for toolSetID, toolNames := range allowedTools {
		if toolSetID == "*" {
			orgToolSets, _, err := s.toolSetService.ListToolSets(ctx, organizationID, 1, 1000, "", false)
			if err != nil {
				return nil, fmt.Errorf("failed to list toolsets: %w", err)
			}
			for _, toolSet := range orgToolSets {
				if toolSet.Status != model.ToolSetStatusEnabled {
					continue
				}
				instance, err := s.toolSetService.createToolSetInstance(&toolSet)
				if err != nil {
					return nil, fmt.Errorf("failed to create toolset instance: %w", err)
				}
				filtered = append(filtered, newFilteredToolSet(instance, toolNames))
			}
		} else {
			instance, err := s.toolSetService.GetToolSetInstance(ctx, organizationID, toolSetID)
			if err != nil {
				return nil, fmt.Errorf("failed to get toolset instance %s: %w", toolSetID, err)
			}
			filtered = append(filtered, newFilteredToolSet(instance, toolNames))
		}
	}
	return filtered, nil
}

func getAllowedAIToolPermissions(ctx context.Context, organizationID string) map[string]map[string]struct{} {
	result := make(map[string]map[string]struct{})
	if organizationID == "" {
		return result
	}

	roles, ok := ctx.Value("roles").([]model.Role)
	if !ok {
		return result
	}

	for _, role := range roles {
		if role.OrganizationID == nil || *role.OrganizationID == "" && role.Name == "admin" {
			return map[string]map[string]struct{}{
				"*": {
					"*": {},
				},
			}
		}
		if role.OrganizationID != nil && *role.OrganizationID != "" && *role.OrganizationID != organizationID {
			continue
		}
		for _, perm := range role.AIToolPermissions {
			if perm.OrganizationID != organizationID {
				continue
			}
			if _, exists := result[perm.ToolSetID]; !exists {
				result[perm.ToolSetID] = make(map[string]struct{})
			}
			result[perm.ToolSetID][perm.ToolName] = struct{}{}
		}
	}

	return result
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
