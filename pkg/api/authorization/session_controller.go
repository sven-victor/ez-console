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

package authorizationapi

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// SessionController Session management controller
type SessionController struct {
	service *service.Service
}

// NewSessionController Create session controller
func NewSessionController(service *service.Service) *SessionController {
	return &SessionController{service: service}
}

// RegisterRoutes Register session management related routes
func (c *SessionController) RegisterRoutes(router *gin.RouterGroup) {
	// Add session management related routes under the profile route group
	sessionRoutes := router.Group("/profile/sessions")
	sessionRoutes.Use()
	{
		sessionRoutes.GET("", c.GetUserSessions)
		sessionRoutes.DELETE("/:id", c.TerminateSession)
		sessionRoutes.POST("/terminate-others", c.TerminateOtherSessions)
	}
}

// GetUserSessions Get all sessions for the user
//
//	@Summary		Get all sessions for the user
//	@Description	Get all sessions for the user
//	@ID             getUserSessions
//	@Tags			Authorization/Profile/Sessions
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int	false	"Current page number"		default(1)
//	@Param			page_size	query		int	false	"Number of items per page"	default(10)
//	@Success		200			{object}	util.Response[[]service.SessionInfo]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/profile/sessions [get]
func (c *SessionController) GetUserSessions(ctx *gin.Context) {
	// Get current user from context
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "failed to get user info"))
		return
	}

	language := ctx.GetHeader("Accept-Language")
	if language == "" {
		language = "en-US"
	}

	// Get current session ID
	currentSessionID := c.service.GetCurrentSessionID(ctx)

	// Call service to get session list
	sessions, err := c.service.GetUserSessions(ctx, user.ResourceID, currentSessionID, language)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, sessions)
}

// TerminateSession Terminate the specified session
//
//	@Summary		Terminate the specified session
//	@Description	Terminate the specified session
//	@ID             terminateSession
//	@Tags			Authorization/Profile/Sessions
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Session ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/profile/sessions/{id} [delete]
func (c *SessionController) TerminateSession(ctx *gin.Context) {
	// Get current user from context
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "failed to get user info"))
		return
	}

	// Get session ID
	sessionID := ctx.Param("id")
	if sessionID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "session ID cannot be empty"))
		return
	}

	// Check if it is the current session
	currentSessionID := c.service.GetCurrentSessionID(ctx)
	if sessionID == currentSessionID {
		util.RespondWithError(ctx, util.NewErrorMessage("E4002", "cannot terminate current session"))
		return
	}

	// Call service to terminate session
	err := c.service.TerminateSession(ctx, sessionID, user.ResourceID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5003", err))
		return
	}

	util.RespondWithMessage(ctx, "session terminated")
}

// TerminateOtherSessions Terminate all sessions except the current one
//
//	@Summary		Terminate all sessions except the current one
//	@Description	Terminate all sessions except the current one
//	@ID             terminateOtherSessions
//	@Tags			Authorization/Profile/Sessions
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/profile/sessions/terminate-others [post]
func (c *SessionController) TerminateOtherSessions(ctx *gin.Context) {
	// Get current user from context
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "failed to get user info"))
		return
	}

	// Get current session ID
	currentSessionID := c.service.GetCurrentSessionID(ctx)
	if currentSessionID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E5004", "failed to get current session info"))
		return
	}

	// Call service to terminate other sessions
	err := c.service.TerminateOtherSessions(ctx, user.ResourceID, currentSessionID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5005", err))
		return
	}

	util.RespondWithMessage(ctx, "all other sessions terminated")
}
