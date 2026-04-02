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
	"errors"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/toolset"
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
		chat.PUT("/sessions/:sessionId/title", middleware.RequirePermission("ai:chat:create"), c.GenerateChatSessionTitle)
	}
}

// CreateChatSessionRequest represents the request to create a chat session
type CreateChatSessionRequest struct {
	Title     string                 `json:"title" binding:"required"`
	Messages  []ai.SimpleChatMessage `json:"messages"`
	ModelID   string                 `json:"model_id"`
	Anonymous bool                   `json:"anonymous"`
}

// ClientToolDefinition represents a client-side tool definition sent from the browser.
type ClientToolDefinition struct {
	Name        string      `json:"name"`
	Description string      `json:"description"`
	Parameters  interface{} `json:"parameters"`
}

// ClientToolResult represents the result of a client-side tool execution.
type ClientToolResult struct {
	ToolCallID string `json:"tool_call_id"`
	Content    string `json:"content"`
}

type ClientToolDefinitionList []ClientToolDefinition

func (l ClientToolDefinitionList) HasTool(name string) bool {
	for _, tool := range l {
		if tool.Name == name {
			return true
		}
	}
	return false
}

// SendMessageRequest represents the request to send a message
type SendMessageRequest struct {
	Content                string                   `json:"content"`
	Domains                []string                 `json:"domains"`                  // optional: load skills for these domains (plus core) as system context
	SkillIDs               []string                 `json:"skill_ids"`                // optional: load these specific skills by id
	EphemeralSystemPrompts []string                 `json:"ephemeral_system_prompts"` // page-level system prompts, memory-only (not persisted)
	ClientTools            ClientToolDefinitionList `json:"client_tools"`             // client-side tool definitions (JSON Schema)
	ClientToolResults      []ClientToolResult       `json:"client_tool_results"`      // results from client-side tool execution
}

var clientToolNameRegex = regexp.MustCompile(`^ui_[a-zA-Z0-9_]+$`)

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

	session, err := c.service.CreateChatSession(ctx, organizationID, userID.(string), req.Title, modelID, req.Messages, req.Anonymous)
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
	messages, err := c.service.GetSimpleChatMessages(ctx, organizationID, userID.(string), sessionID)
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

	// Validate: content or client_tool_results must be provided
	contentTrimmed := strings.TrimSpace(req.Content)
	if contentTrimmed == "" && len(req.ClientToolResults) == 0 {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Either content or client_tool_results must be provided"))
		return
	}

	// Validate client tool names
	if len(req.ClientTools) > 20 {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Too many client tools (max 20)"))
		return
	}
	for _, ct := range req.ClientTools {
		if !clientToolNameRegex.MatchString(ct.Name) {
			util.RespondWithError(ctx, util.NewErrorMessage("E4001",
				fmt.Sprintf("Invalid client tool name %q: must match ^ui_[a-zA-Z0-9_]+$", ct.Name)))
			return
		}
		if len(ct.Description) > 1000 {
			util.RespondWithError(ctx, util.NewErrorMessage("E4001",
				fmt.Sprintf("Client tool %q description too long (max 1000 chars)", ct.Name)))
			return
		}
	}

	// Validate client tool results
	for _, ctr := range req.ClientToolResults {
		if strings.TrimSpace(ctr.ToolCallID) == "" {
			util.RespondWithError(ctx, util.NewErrorMessage("E4001", "client_tool_results: tool_call_id is required"))
			return
		}
		if strings.TrimSpace(ctr.Content) == "" {
			util.RespondWithError(ctx, util.NewErrorMessage("E4001", "client_tool_results: content is required"))
			return
		}
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

	// Persist and append client tool results (before user message per §4.4)
	for _, ctr := range req.ClientToolResults {
		_, err := c.service.AddChatMessage(ctx, organizationID, userID.(string), sessionID, model.AIChatMessageRoleTool, ctr.Content, nil, ctr.ToolCallID)
		if err != nil {
			level.Error(logger).Log("msg", "Failed to add chat message", "error", err)
			return
		}
	}

	// Get chat messages
	messages, err := c.service.GetChatMessages(ctx, organizationID, userID.(string), sessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", "Failed to get chat messages", err)))
		return
	}

	// Convert from model.AIChatMessage to ai.ChatMessage
	chatMessages := ai.ChatMessagesFromModel(messages)

	// Add and persist the new user message (only if content is non-empty)
	if contentTrimmed != "" {
		chatMessages = append(chatMessages, ai.ChatMessage{
			Role:    model.AIChatMessageRoleUser,
			Content: req.Content,
		})
		_, err = c.service.AddChatMessage(ctx, organizationID, userID.(string), sessionID, model.AIChatMessageRoleUser, req.Content, nil, "")
		if err != nil {
			util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", "Failed to add chat message", err)))
			return
		}
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

	userIDStr := userID.(string)
	var skillStreamParams *service.SkillChatStreamToolParams
	var activation *service.SkillActivationTracker

	options := []ai.WithChatOptions{
		ai.WithChatOnMessageAdded(func(ctx context.Context, message ai.ChatMessage) {
			if len(message.ToolCalls) > 0 {
				var aiToolCalls model.AIToolCalls
				for _, toolCall := range message.ToolCalls {
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
			} else if message.ToolCallID != "" {
				_, err := c.service.AddChatMessage(ctx, organizationID, userID.(string), sessionID, model.AIChatMessageRoleTool, message.Content, nil, message.ToolCallID)
				if err != nil {
					level.Error(logger).Log("msg", "Failed to add chat message", "error", err)
					return
				}
			} else if len(message.Content) > 0 {
				_, err := c.service.AddChatMessage(ctx, organizationID, userID.(string), sessionID, model.AIChatMessageRoleAssistant, message.Content, nil, "")
				if err != nil {
					level.Error(logger).Log("msg", "Failed to add chat message", "error", err)
					return
				}
				// Check if this is the first conversation (exactly 2 messages: 1 user + 1 assistant)
				if initialMessageCount == 0 {
					go func() {
						bgCtx := context.Background()
						bgCtx = context.WithValue(bgCtx, "organization_id", organizationID)
						if userID != nil {
							bgCtx = context.WithValue(bgCtx, "user_id", userID)
						}
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
			}
		}),

		ai.WithChatOnSummary(func(ctx context.Context, messages []ai.ChatMessage) {
			if activation != nil {
				activation.Clear()
				if err := c.service.ClearSessionActivatedSkills(ctx, organizationID, userIDStr, sessionID); err != nil {
					level.Error(logger).Log("msg", "Failed to clear activated skills after summary", "error", err)
				}
			}
			if err := c.service.MarkSessionMessagesSummarized(ctx, organizationID, userIDStr, sessionID); err != nil {
				level.Error(logger).Log("msg", "Failed to mark messages as summarized", "error", err)
				return
			}
			for _, message := range messages {
				if _, err := c.service.AddSummaryChatMessage(ctx, organizationID, userIDStr, sessionID, message.Role, message.Content); err != nil {
					level.Error(logger).Log("msg", "Failed to add summary chat message", "error", err)
					return
				}
			}
		}),

		ai.WithChatOnTokenUsage(func(ctx context.Context, stats ai.TokenUsageStats) {
			if err := c.service.UpdateSessionTokenUsage(ctx, organizationID, userID.(string), sessionID, stats.PromptTokens, stats.CompletionTokens, stats.ActiveTokens); err != nil {
				level.Error(logger).Log("msg", "Failed to update session token usage", "error", err)
			}
		}),
		ai.WithChatAutoSummarization(true),
	}

	// Inject client tools
	if len(req.ClientTools) > 0 {
		var clientOpenAITools []openai.Tool
		for _, ct := range req.ClientTools {
			clientOpenAITools = append(clientOpenAITools, openai.Tool{
				Type: openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{
					Name:        ct.Name,
					Description: ct.Description,
					Parameters:  ct.Parameters,
				},
			})
		}
		options = append(options, ai.WithChatClientTools(clientOpenAITools))
	}

	// Prepend ephemeral system prompts (page-level, memory-only).
	// These are sent with the "prompt" role so they are delivered to the LLM
	// as user messages rather than system messages, and excluded from chat
	// history by GetSimpleChatMessages.
	if len(req.EphemeralSystemPrompts) > 0 {
		var ephemeralMessages []ai.ChatMessage
		for _, prompt := range req.EphemeralSystemPrompts {
			if trimmed := strings.TrimSpace(prompt); trimmed != "" {
				ephemeralMessages = append(ephemeralMessages, ai.ChatMessage{
					Role:    model.AIChatMessageRolePrompt,
					Content: trimmed,
				})
			}
		}
		if len(ephemeralMessages) > 0 {
			chatMessages = append(ephemeralMessages, chatMessages...)
		}
	}

	// Progressive skill loading: when domains/skillIDs are set, inject metadata only
	// and add skill_loader toolset so the model can load content on demand.
	// Organization tools gated by skill bindings load only after get_skill_content succeeds (session activated_skill_ids).
	if len(req.Domains) > 0 || len(req.SkillIDs) > 0 {
		metadataContent, skillIDs, err := c.service.SkillService.LoadSkillsMetadataForChat(ctx, req.Domains, req.SkillIDs)
		if err != nil {
			level.Error(logger).Log("msg", "Failed to load skills metadata", "error", err)
			return
		}
		if metadataContent != "" {
			activation = service.NewSkillActivationTracker(session.ActivatedSkillIDs)
			skillStreamParams = &service.SkillChatStreamToolParams{
				SkillMetadataActive: true,
				Activation:          activation,
			}
			loaderOpts := &service.SkillLoaderOptions{
				OnSkillContentLoaded: func(ctx context.Context, skillID string) error {
					if err := c.service.AppendSessionActivatedSkill(ctx, organizationID, userIDStr, sessionID, skillID); err != nil {
						return err
					}
					activation.Add(skillID)
					return nil
				},
			}
			skillLoaderToolSet := service.NewSkillLoaderToolSet(ctx, c.service.SkillService, skillIDs, loaderOpts)
			chatMessages = append([]ai.ChatMessage{{
				Role:    model.AIChatMessageRoleSystem,
				Content: metadataContent,
			}}, chatMessages...)
			options = append(options, ai.WithChatToolSetsFactory(toolset.NewStaticToolSetsFactory(toolset.ToolSets{"skill_loader": skillLoaderToolSet})))
		}
	}

	// Create streaming chat completion
	stream, err := c.service.CreateChatCompletionStream(ctx, organizationID, session.ModelID, chatMessages, skillStreamParams, options...)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", util.NewErrorMessage("E5001", fmt.Sprintf("Failed to create chat completion stream: %s", err))))
		return
	}
	defer stream.Close()

	ctx.Writer.Header().Set("Content-Type", "text/event-stream")
	ctx.Writer.Header().Set("Cache-Control", "no-cache")
	ctx.Writer.Header().Set("Connection", "keep-alive")
	ctx.Stream(func(w io.Writer) bool {
		event, err := stream.Recv(ctx)
		if err != nil {
			if err == io.EOF || errors.Is(err, ai.ErrClientToolHandoff) {
				return false
			}
			ctx.SSEvent("message", ai.ChatStreamEvent{
				EventType: ai.EventTypeContent,
				Content:   err.Error(),
				Role:      model.AIChatMessageRoleAssistant,
			})
			return false
		}
		if event.EventType == ai.EventTypeToolCall {
			return true
		}
		var toolCalls []ai.ClientToolPendingCall
		if event.EventType == ai.EventTypeClientToolPending {
			for _, toolCall := range event.ClientToolCalls {
				if req.ClientTools.HasTool(toolCall.Name) {
					toolCalls = append(toolCalls, toolCall)
				}
			}
			if len(toolCalls) != 0 {
				event.ClientToolCalls = toolCalls
				ctx.SSEvent("message", event)
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
			Code:             "ai:chat:create",
			Name:             "Create AI chat",
			Description:      "Create a new AI chat",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator"},
		},
	})
}
