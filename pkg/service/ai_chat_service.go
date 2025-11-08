package service

import (
	"context"
	"fmt"
	"time"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
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
func (s *AIChatService) CreateChatSession(ctx context.Context, title, userID, modelID string) (*model.AIChatSession, error) {
	session := model.NewAIChatSession(title, userID, modelID)

	if err := db.Session(ctx).Create(session).Error; err != nil {
		return nil, fmt.Errorf("failed to create chat session: %w", err)
	}

	return session, nil
}

// GetChatSession gets a chat session by ID
func (s *AIChatService) GetChatSession(ctx context.Context, sessionID string) (*model.AIChatSession, error) {
	var session model.AIChatSession
	if err := db.Session(ctx).Where("resource_id = ?", sessionID).First(&session).Error; err != nil {
		return nil, fmt.Errorf("failed to get chat session: %w", err)
	}

	return &session, nil
}

// GetUserChatSessions gets chat sessions for a user with pagination
func (s *AIChatService) GetUserChatSessions(ctx context.Context, userID string, current, pageSize int) ([]model.AIChatSession, int64, error) {
	var sessions []model.AIChatSession
	var total int64

	query := db.Session(ctx).Model(&model.AIChatSession{}).Where("user_id = ?", userID)

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
func (s *AIChatService) AddChatMessage(ctx context.Context, sessionID string, role model.AIChatMessageRole, content string, toolCalls model.AIToolCalls, toolCallID string) (*model.AIChatMessage, error) {
	message := model.NewAIChatMessage(sessionID, role, content, toolCalls, toolCallID)

	if err := db.Session(ctx).Create(message).Error; err != nil {
		return nil, fmt.Errorf("failed to add chat message: %w", err)
	}

	return message, nil
}

// GetChatMessages gets messages for a chat session
func (s *AIChatService) GetChatMessages(ctx context.Context, sessionID string) ([]model.AIChatMessage, error) {
	var messages []model.AIChatMessage
	if err := db.Session(ctx).Where("session_id = ?", sessionID).Order("message_time ASC").Find(&messages).Error; err != nil {
		return nil, fmt.Errorf("failed to get chat messages: %w", err)
	}

	return messages, nil
}

// UpdateChatMessage updates a chat message
func (s *AIChatService) UpdateChatMessage(ctx context.Context, messageID string, updates map[string]interface{}) error {
	if err := db.Session(ctx).Model(&model.AIChatMessage{}).Where("resource_id = ?", messageID).Updates(updates).Error; err != nil {
		return fmt.Errorf("failed to update chat message: %w", err)
	}

	return nil
}

// EndChatSession ends a chat session
func (s *AIChatService) EndChatSession(ctx context.Context, sessionID string) error {
	now := time.Now()
	if err := db.Session(ctx).Model(&model.AIChatSession{}).Where("resource_id = ?", sessionID).Update("end_time", now).Error; err != nil {
		return fmt.Errorf("failed to end chat session: %w", err)
	}

	return nil
}

// DeleteChatSession deletes a chat session and all its messages
func (s *AIChatService) DeleteChatSession(ctx context.Context, sessionID string) error {
	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		// Delete all messages first
		if err := tx.Where("session_id = ?", sessionID).Delete(&model.AIChatMessage{}).Error; err != nil {
			return fmt.Errorf("failed to delete chat messages: %w", err)
		}

		// Delete the session
		if err := tx.Where("resource_id = ?", sessionID).Delete(&model.AIChatSession{}).Error; err != nil {
			return fmt.Errorf("failed to delete chat session: %w", err)
		}

		return nil
	})
}

// CreateChatCompletion creates a chat completion using the specified model
func (s *AIChatService) CreateChatCompletion(ctx context.Context, organizationID, modelID string, messages []openai.ChatCompletionMessage, tools []openai.Tool) (openai.ChatCompletionResponse, error) {
	// Get the AI model
	aiModel, err := s.aiModelService.GetAIModel(ctx, organizationID, modelID)
	if err != nil {
		return openai.ChatCompletionResponse{}, fmt.Errorf("failed to get AI model: %w", err)
	}

	// Create OpenAI client
	client, err := ai.NewOpenAIClient(aiModel)
	if err != nil {
		return openai.ChatCompletionResponse{}, fmt.Errorf("failed to create OpenAI client: %w", err)
	}

	// Create chat completion request
	request := openai.ChatCompletionRequest{
		Messages: messages,
		Tools:    tools,
	}

	// Call OpenAI API
	response, err := client.CreateChatCompletion(ctx, request)
	if err != nil {
		return openai.ChatCompletionResponse{}, fmt.Errorf("failed to create chat completion: %w", err)
	}

	return response, nil
}

// CreateChatCompletionStream creates a streaming chat completion
func (s *AIChatService) CreateChatCompletionStream(ctx context.Context, organizationID, modelID string, messages []openai.ChatCompletionMessage, options ...ai.WithChatCompletionStreamOptions) (ai.ChatStream, error) {
	// Get the AI model
	aiModel, err := s.aiModelService.GetAIModel(ctx, organizationID, modelID)
	if err != nil {
		return nil, fmt.Errorf("failed to get AI model: %w", err)
	}
	toolSets, err := s.toolSetService.GetAllEnabledToolSetInstances(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get enabled toolset instances: %w", err)
	}

	// Create OpenAI client
	client, err := ai.NewOpenAIClient(aiModel)
	if err != nil {
		return nil, fmt.Errorf("failed to create OpenAI client: %w", err)
	}

	stream, err := ai.NewChatStream(ctx, client, messages, toolSets, options...)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion stream: %w", err)
	}

	return stream, nil
}

// GetAvailableTools gets all available tools from enabled toolsets
func (s *AIChatService) GetAvailableTools(ctx context.Context) ([]openai.Tool, error) {
	toolsetInstances, err := s.toolSetService.GetAllEnabledToolSetInstances(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get enabled toolset instances: %w", err)
	}

	var allTools []openai.Tool
	for _, toolset := range toolsetInstances {
		tools, err := toolset.ListTools(ctx)
		if err != nil {
			// Log error but continue with other toolsets
			continue
		}
		allTools = append(allTools, tools...)
	}

	return allTools, nil
}

// CallTool calls a tool function
func (s *AIChatService) CallTool(ctx context.Context, toolName string, parameters string) (string, error) {
	toolsetInstances, err := s.toolSetService.GetAllEnabledToolSetInstances(ctx)
	if err != nil {
		return "", fmt.Errorf("failed to get enabled toolset instances: %w", err)
	}

	// Find the toolset that has this tool
	for _, toolset := range toolsetInstances {
		tools, err := toolset.ListTools(ctx)
		if err != nil {
			continue
		}

		// Check if this toolset has the requested tool
		for _, tool := range tools {
			if tool.Function != nil && tool.Function.Name == toolName {
				// Call the tool
				result, err := toolset.Call(ctx, toolName, parameters)
				if err != nil {
					return "", fmt.Errorf("failed to call tool %s: %w", toolName, err)
				}
				return result, nil
			}
		}
	}

	return "", fmt.Errorf("tool %s not found", toolName)
}
