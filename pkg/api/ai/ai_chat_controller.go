package aiapi

import (
	"context"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
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
		chat.POST("/sessions", c.CreateChatSession)
		chat.GET("/sessions/:sessionId", c.GetChatSession)
		chat.DELETE("/sessions/:sessionId", c.DeleteChatSession)
		chat.POST("/sessions/:sessionId", c.StreamChat)
	}
}

// CreateChatSessionRequest represents the request to create a chat session
type CreateChatSessionRequest struct {
	Title   string `json:"title" binding:"required"`
	ModelID string `json:"model_id"`
}

// SendMessageRequest represents the request to send a message
type SendMessageRequest struct {
	Content string `json:"content" binding:"required"`
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

	sessions, total, err := c.service.GetUserChatSessions(ctx, userID.(string), current, pageSize)
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

	// Use default model if not specified
	modelID := req.ModelID
	if modelID == "" {
		defaultModel, err := c.service.GetDefaultAIModel(ctx, model.AIModelProviderOpenAI)
		if err != nil {
			util.RespondWithError(ctx, util.NewError("E5001", err))
			return
		}
		modelID = defaultModel.ResourceID
	}

	session, err := c.service.CreateChatSession(ctx, req.Title, userID.(string), modelID)
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

	session, err := c.service.GetChatSession(ctx, sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	messages, err := c.service.GetChatMessages(ctx, sessionID)
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

	err := c.service.DeleteChatSession(ctx, sessionID)
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

	// Get chat session
	session, err := c.service.GetChatSession(ctx, sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", "Failed to get chat session", err)))
		return
	}

	// Get chat messages
	messages, err := c.service.GetChatMessages(ctx, sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", "Failed to get chat messages", err)))
		return
	}

	// Convert to OpenAI format
	var openaiMessages []openai.ChatCompletionMessage
	for _, msg := range messages {
		openaiMsg := openai.ChatCompletionMessage{
			Role:    string(msg.Role),
			Content: msg.Content,
		}
		switch msg.Role {
		case openai.ChatMessageRoleTool:
		}
		// Add tool calls if present
		if len(msg.ToolCalls) > 0 {
			for _, toolCall := range msg.ToolCalls {
				openaiMsg.ToolCalls = append(openaiMsg.ToolCalls, openai.ToolCall{
					Index: toolCall.Index,
					ID:    toolCall.ID,
					Type:  openai.ToolType(toolCall.Type),
					Function: openai.FunctionCall{
						Name:      toolCall.Function.Name,
						Arguments: toolCall.Function.Arguments,
					},
				})
			}
		}

		// Add tool call ID if present
		if msg.ToolCallID != "" {
			openaiMsg.ToolCallID = msg.ToolCallID
		}

		openaiMessages = append(openaiMessages, openaiMsg)
	}
	options := []ai.WithChatCompletionStreamOptions{
		ai.WithChatCompletionStreamOnMessageEnd(func(ctx context.Context, messageID string, content string) {
			_, err := c.service.AddChatMessage(ctx, sessionID, model.AIChatMessageRoleAssistant, content, nil, "")
			if err != nil {
				level.Error(logger).Log("msg", "Failed to add chat message", "error", err)
				return
			}
		}),
		ai.WithChatCompletionStreamOnToolCallsStart(func(ctx context.Context, toolCalls []ai.ToolCall) {
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
			_, err := c.service.AddChatMessage(ctx, sessionID, model.AIChatMessageRoleAssistant, "", aiToolCalls, "")
			if err != nil {
				level.Error(logger).Log("msg", "Failed to add chat message", "error", err)
				return
			}
		}),
		ai.WithChatCompletionStreamOnToolCallEnd(func(ctx context.Context, toolCall ai.ToolCall) {
			_, err := c.service.AddChatMessage(ctx, sessionID, model.AIChatMessageRoleTool, toolCall.Result, nil, toolCall.ID)
			if err != nil {
				level.Error(logger).Log("msg", "Failed to add chat message", "error", err)
				return
			}
		}),
	}

	openaiMessages = append(openaiMessages, openai.ChatCompletionMessage{
		Role:    string(model.AIChatMessageRoleUser),
		Content: req.Content,
	})

	_, err = c.service.AddChatMessage(ctx, sessionID, model.AIChatMessageRoleUser, req.Content, nil, "")
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", "Failed to add chat message", err)))
		return
	}

	// Create streaming chat completion
	stream, err := c.service.CreateChatCompletionStream(ctx, session.ModelID, openaiMessages, options...)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", "Failed to create chat completion stream", err)))
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
