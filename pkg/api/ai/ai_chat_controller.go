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

package aiapi

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
)

// AIChatController handles AI chat functionality
type AIChatController struct {
	service *service.Service
}

// NewAIChatController creates a new AI chat controller
func NewAIChatController(service *service.Service) *AIChatController {
	return &AIChatController{service: service}
}

// RegisterRoutes registers AI chat routes
func (c *AIChatController) RegisterRoutes(router *gin.RouterGroup) {
	chat := router.Group("/chat")
	{
		chat.GET("/sessions", c.ListChatSessions)
		chat.POST("/sessions", middleware.RequirePermission("ai:chat:create"), c.CreateChatSession)
		chat.GET("/sessions/:sessionId", c.GetChatSession)
		chat.DELETE("/sessions/:sessionId", c.DeleteChatSession)
		chat.POST("/sessions/:sessionId", middleware.RequirePermission("ai:chat:create"), c.StreamChat)
		chat.PUT("/sessions/:sessionId/title", c.GenerateChatSessionTitle)
	}
}

// CreateChatSessionRequest represents the request to create a chat session
type CreateChatSessionRequest struct {
	Title    string                 `json:"title" binding:"required"`
	Messages []ai.SimpleChatMessage `json:"messages"`
	ModelID  string                 `json:"model_id"`
}

// SendMessageRequest represents the request to send a message
type SendMessageRequest struct {
	Content string `json:"content" binding:"required"`
}

// GenerateChatSessionTitleRequest represents the request to generate or update a chat session title
type GenerateChatSessionTitleRequest struct {
	Title string `json:"title"` // Optional: if provided, use this title; otherwise generate automatically
}

// ChatStreamEvent represents a server-sent event for chat streaming
type ChatStreamEvent struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

// ToolCallStatus represents the status of a tool call
type ToolCallStatus struct {
	ID         string                 `json:"id"`
	Name       string                 `json:"name"`
	Status     string                 `json:"status"` // pending, running, completed, failed
	Parameters map[string]interface{} `json:"parameters,omitempty"`
	Result     string                 `json:"result,omitempty"`
	Error      string                 `json:"error,omitempty"`
	StartTime  time.Time              `json:"start_time"`
	EndTime    *time.Time             `json:"end_time,omitempty"`
}

// ListChatSessions lists chat sessions for the current user
//
//	@Summary		List chat sessions
//	@Description	List chat sessions for the current user with pagination
//	@ID             listChatSessions
//	@Tags			AI/Chat
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int		false	"Current page number"	default(1)
//	@Param			page_size	query		int		false	"Page size"				default(10)
//	@Success		200	{object}	util.PaginationResponse[model.AIChatSession]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/chat/sessions [get]
func (c *AIChatController) ListChatSessions(ctx *gin.Context) {
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))

	// Get current user ID from context
	userID, exists := ctx.Get("user_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}
	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}

	sessions, total, err := c.service.GetUserChatSessions(ctx, organizationID, userID.(string), current, pageSize)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccessList(ctx, http.StatusOK, sessions, total, current, pageSize)
}

// CreateChatSession creates a new chat session
//
//	@Summary		Create chat session
//	@Description	Create a new chat session
//	@ID             createChatSession
//	@Tags			AI/Chat
//	@Accept			json
//	@Produce		json
//	@Param			request	body		CreateChatSessionRequest	true	"Chat session data"
//	@Success		201	{object}	util.Response[model.AIChatSession]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/chat/sessions [post]
func (c *AIChatController) CreateChatSession(ctx *gin.Context) {
	var req CreateChatSessionRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	// Get current user ID from context
	userID, exists := ctx.Get("user_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}

	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}

	// Use default model if not specified
	modelID := req.ModelID
	if modelID == "" {
		defaultModel, err := c.service.GetDefaultAIModel(ctx, organizationID)
		if err != nil {
			util.RespondWithError(ctx, util.NewError("E5001", err))
			return
		}
		modelID = defaultModel.ResourceID
	}

	session, err := c.service.CreateChatSession(ctx, organizationID, userID.(string), req.Title, modelID, req.Messages)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusCreated, session)
}

// GetChatSession gets a chat session by ID
//
//	@Summary		Get chat session
//	@Description	Get a chat session by ID
//	@ID             getChatSession
//	@Tags			AI/Chat
//	@Accept			json
//	@Produce		json
//	@Param			sessionId	path		string	true	"Chat session ID"
//	@Success		200	{object}	util.Response[model.AIChatSession]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/chat/sessions/{sessionId} [get]
func (c *AIChatController) GetChatSession(ctx *gin.Context) {
	sessionID := ctx.Param("sessionId")
	if sessionID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Session ID is required"))
		return
	}
	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}

	// Get current user ID from context
	userID, exists := ctx.Get("user_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}

	session, err := c.service.GetChatSession(ctx, organizationID, userID.(string), sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	messages, err := c.service.GetChatMessages(ctx, organizationID, userID.(string), sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	session.Messages = messages

	util.RespondWithSuccess(ctx, http.StatusOK, session)
}

// DeleteChatSession deletes a chat session
//
//	@Summary		Delete chat session
//	@Description	Delete a chat session and all its messages
//	@ID             deleteChatSession
//	@Tags			AI/Chat
//	@Accept			json
//	@Produce		json
//	@Param			sessionId	path		string	true	"Chat session ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/chat/sessions/{sessionId} [delete]
func (c *AIChatController) DeleteChatSession(ctx *gin.Context) {
	sessionID := ctx.Param("sessionId")
	if sessionID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Session ID is required"))
		return
	}

	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}

	// Get current user ID from context
	userID, exists := ctx.Get("user_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}
	err := c.service.DeleteChatSession(ctx, organizationID, userID.(string), sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithMessage(ctx, "Chat session deleted successfully")
}

// StreamChat handles streaming chat responses with SSE
//
//	@Summary		Stream chat
//	@Description	Stream chat responses using Server-Sent Events
//	@ID             streamChat
//	@Tags			AI/Chat
//	@Accept			json
//	@Produce		text/event-stream
//	@Param			sessionId	path		string	true	"Chat session ID"
//	@Param			request		body		SendMessageRequest	true	"Message data"
//	@Success		200	{object}	ai.ChatStreamEvent	"Event stream"
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/chat/sessions/{sessionId} [post]
func (c *AIChatController) StreamChat(ctx *gin.Context) {
	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}
	logger := log.GetContextLogger(ctx)
	sessionID := ctx.Param("sessionId")
	if sessionID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Session ID is required"))
		return
	}

	var req SendMessageRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	// Get current user ID from context
	userID, exists := ctx.Get("user_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}

	// Get chat session
	session, err := c.service.GetChatSession(ctx, organizationID, userID.(string), sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", "Failed to get chat session", err)))
		return
	}

	// Get chat messages
	messages, err := c.service.GetChatMessages(ctx, organizationID, userID.(string), sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", "Failed to get chat messages", err)))
		return
	}

	// Convert from model.AIChatMessage to ai.ChatMessage
	chatMessages := ai.ChatMessagesFromModel(messages)

	// Add the new user message
	chatMessages = append(chatMessages, ai.ChatMessage{
		Role:    model.AIChatMessageRoleUser,
		Content: req.Content,
	})

	// Save the user message to database
	_, err = c.service.AddChatMessage(ctx, organizationID, userID.(string), sessionID, model.AIChatMessageRoleUser, req.Content, nil, "")
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", "Failed to add chat message", err)))
		return
	}

	// Track initial message count (excluding tool messages)
	initialMessageCount := 0
	for _, msg := range messages {
		if msg.Role != model.AIChatMessageRoleTool {
			initialMessageCount++
		}
	}

	// Capture context values for background goroutine
	roles, _ := ctx.Get("roles")

	options := []ai.WithChatCompletionOptions{
		ai.WithChatCompletionOnMessageEnd(func(ctx context.Context, messageID string, content string) {
			_, err := c.service.AddChatMessage(ctx, organizationID, userID.(string), sessionID, model.AIChatMessageRoleAssistant, content, nil, "")
			if err != nil {
				level.Error(logger).Log("msg", "Failed to add chat message", "error", err)
				return
			}
			// Check if this is the first conversation (exactly 2 messages: 1 user + 1 assistant)
			// After adding the assistant message, we should have: initialMessageCount (0) + 1 user + 1 assistant = 2
			if initialMessageCount == 0 {
				// Auto-generate title in background (don't block)
				go func() {
					// Create a new context for background operation
					bgCtx := context.Background()
					// Copy organization_id
					bgCtx = context.WithValue(bgCtx, "organization_id", organizationID)
					// Copy user_id
					if userID != nil {
						bgCtx = context.WithValue(bgCtx, "user_id", userID)
					}
					// Copy roles
					if roles != nil {
						bgCtx = context.WithValue(bgCtx, "roles", roles)
					}

					title, err := c.service.GenerateChatSessionTitle(bgCtx, organizationID, userID.(string), sessionID, session.ModelID)
					if err != nil {
						level.Error(logger).Log("msg", "Failed to auto-generate chat session title", "error", err, "sessionId", sessionID)
						return
					}
					if err := c.service.UpdateChatSessionTitle(bgCtx, organizationID, userID.(string), sessionID, title); err != nil {
						level.Error(logger).Log("msg", "Failed to update chat session title", "error", err, "sessionId", sessionID)
						return
					}
					level.Info(logger).Log("msg", "Auto-generated chat session title", "sessionId", sessionID, "title", title)
				}()
			}
		}),
		ai.WithChatCompletionOnToolCallsStart(func(ctx context.Context, toolCalls []ai.ToolCall) {
			var aiToolCalls model.AIToolCalls
			for _, toolCall := range toolCalls {
				aiToolCalls = append(aiToolCalls, model.AIToolCall{
					Index: toolCall.Index,
					ID:    toolCall.ID,
					Type:  string(toolCall.Type),
					Function: model.AIFunctionCall{
						Name:      toolCall.Function.Name,
						Arguments: toolCall.Function.Arguments,
					},
				})
			}
			_, err := c.service.AddChatMessage(ctx, organizationID, userID.(string), sessionID, model.AIChatMessageRoleAssistant, "", aiToolCalls, "")
			if err != nil {
				level.Error(logger).Log("msg", "Failed to add chat message", "error", err)
				return
			}
		}),
		ai.WithChatCompletionOnToolCallEnd(func(ctx context.Context, toolCall ai.ToolCall) {
			_, err := c.service.AddChatMessage(ctx, organizationID, userID.(string), sessionID, model.AIChatMessageRoleTool, toolCall.Result, nil, toolCall.ID)
			if err != nil {
				level.Error(logger).Log("msg", "Failed to add chat message", "error", err)
				return
			}
		}),
	}

	// Create streaming chat completion
	stream, err := c.service.CreateChatCompletionStream(ctx, organizationID, session.ModelID, chatMessages, options...)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", fmt.Sprintf("Failed to create chat completion stream: %s", err))))
		return
	}
	defer stream.Close()

	ctx.Stream(func(w io.Writer) bool {
		event, err := stream.Recv(ctx)
		if err != nil {
			if err != io.EOF {
				ctx.SSEvent("message", ai.ChatStreamEvent{
					EventType: ai.EventTypeContent,
					Content:   err.Error(),
					Role:      model.AIChatMessageRoleAssistant,
				})
			}
			return false
		}
		ctx.SSEvent("message", event)
		return true
	})
}

// GenerateChatSessionTitle generates or updates a chat session title
//
//	@Summary		Generate or update chat session title
//	@Description	Generate a title for a chat session based on conversation content, or update with provided title
//	@ID             generateChatSessionTitle
//	@Tags			AI/Chat
//	@Accept			json
//	@Produce		json
//	@Param			sessionId	path		string							true	"Chat session ID"
//	@Param			request		body		GenerateChatSessionTitleRequest	false	"Title data (optional)"
//	@Success		200	{object}	util.Response[model.AIChatSession]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/chat/sessions/{sessionId}/title [put]
func (c *AIChatController) GenerateChatSessionTitle(ctx *gin.Context) {
	sessionID := ctx.Param("sessionId")
	if sessionID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Session ID is required"))
		return
	}

	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}
	// Get current user ID from context
	userID, exists := ctx.Get("user_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}

	// Get chat session
	session, err := c.service.GetChatSession(ctx, organizationID, userID.(string), sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	var req GenerateChatSessionTitleRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		// If no body provided, treat as empty request (will generate title)
		req = GenerateChatSessionTitleRequest{}
	}

	var title string
	if req.Title != "" {
		// Use provided title
		title = req.Title
	} else {
		// Generate title automatically
		generatedTitle, err := c.service.GenerateChatSessionTitle(ctx, organizationID, userID.(string), sessionID, session.ModelID)
		if err != nil {
			util.RespondWithError(ctx, util.NewError("E5001", err))
			return
		}
		title = generatedTitle
	}

	// Update session title
	if err := c.service.UpdateChatSessionTitle(ctx, organizationID, userID.(string), sessionID, title); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	// Get updated session
	updatedSession, err := c.service.GetChatSession(ctx, organizationID, userID.(string), sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, updatedSession)
}

func init() {
	middleware.RegisterPermission("AI Chat", "AI Chat", []model.Permission{
		{
			Code:          "ai:chat:create",
			Name:          "Create AI chat",
			Description:   "Create a new AI chat",
			OrgPermission: true,
		},
	})
}
