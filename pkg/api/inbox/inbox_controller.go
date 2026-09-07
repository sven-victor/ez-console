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

package inboxapi

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"gorm.io/gorm"
)

const (
	sseHeartbeatInterval = 15 * time.Second
	sseWriteTimeout      = 60 * time.Second
)

type Controller struct {
	InboxController *InboxController
}

func NewController(svc *service.Service) *Controller {
	return &Controller{InboxController: NewInboxController(svc)}
}

func (c *Controller) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	c.InboxController.RegisterRoutes(router)
}

type InboxController struct {
	service *service.Service
}

func NewInboxController(svc *service.Service) *InboxController {
	return &InboxController{service: svc}
}

func (c *InboxController) RegisterRoutes(router *gin.RouterGroup) {
	g := router.Group("/inbox")
	g.GET("/messages", c.ListMessages)
	g.GET("/unread-count", c.UnreadCount)
	g.POST("/messages/:id/read", c.MarkRead)
	g.POST("/read-all", c.MarkAllRead)
	g.GET("/stream", c.Stream)
}

type InboxUnreadCount struct {
	UnreadCount int64 `json:"unread_count"`
}

type InboxStreamEvent struct {
	EventType   string              `json:"event_type"`
	Message     *model.InboxMessage `json:"message,omitempty"`
	UnreadCount *int64              `json:"unread_count,omitempty"`
}

// ListMessages lists the current user's inbox messages.
//
//	@Summary		List inbox messages
//	@Description	List in-app messages for the current user.
//	@ID				listInboxMessages
//	@Tags			Inbox
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int		false	"Current page number"	default(1)
//	@Param			page_size	query		int		false	"Number of items per page"	default(10)
//	@Param			unread		query		bool	false	"If true, only unread messages"
//	@Success		200			{object}	util.PaginationResponse[model.InboxMessage]
//	@Failure		401			{object}	util.ErrorResponse
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/inbox/messages [get]
func (c *InboxController) ListMessages(ctx *gin.Context) {
	userID := middleware.GetUserIDFromContext(ctx)
	if userID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	unreadOnly, _ := strconv.ParseBool(ctx.Query("unread"))
	list, total, err := c.service.ListInboxMessages(ctx, userID, current, pageSize, unreadOnly)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to list inbox messages", err))
		return
	}
	util.RespondWithSuccessList(ctx, http.StatusOK, list, total, current, pageSize)
}

// UnreadCount returns the number of unread inbox messages.
//
//	@Summary		Inbox unread count
//	@Description	Return the unread in-app message count for the current user.
//	@ID				getInboxUnreadCount
//	@Tags			Inbox
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[InboxUnreadCount]
//	@Failure		401	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/inbox/unread-count [get]
func (c *InboxController) UnreadCount(ctx *gin.Context) {
	userID := middleware.GetUserIDFromContext(ctx)
	if userID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}
	count, err := c.service.CountUnreadInbox(ctx, userID)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to count unread inbox messages", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, InboxUnreadCount{UnreadCount: count})
}

// MarkRead marks one inbox message as read.
//
//	@Summary		Mark inbox message read
//	@Description	Mark a single in-app message as read.
//	@ID				markInboxMessageRead
//	@Tags			Inbox
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Message ID (UUID)"
//	@Success		200	{object}	util.Response[model.InboxMessage]
//	@Failure		401	{object}	util.ErrorResponse
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/inbox/messages/{id}/read [post]
func (c *InboxController) MarkRead(ctx *gin.Context) {
	userID := middleware.GetUserIDFromContext(ctx)
	if userID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Message ID is required"))
		return
	}
	msg, err := c.service.MarkInboxRead(ctx, userID, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			util.RespondWithError(ctx, util.NewErrorMessage("E4041", "Inbox message not found"))
			return
		}
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to mark inbox message read", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, msg)
}

// MarkAllRead marks all inbox messages as read.
//
//	@Summary		Mark all inbox messages read
//	@Description	Mark every unread in-app message as read for the current user.
//	@ID				markAllInboxMessagesRead
//	@Tags			Inbox
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[InboxUnreadCount]
//	@Failure		401	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/inbox/read-all [post]
func (c *InboxController) MarkAllRead(ctx *gin.Context) {
	userID := middleware.GetUserIDFromContext(ctx)
	if userID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}
	if _, err := c.service.MarkAllInboxRead(ctx, userID); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to mark all inbox messages read", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, InboxUnreadCount{UnreadCount: 0})
}

// Stream pushes inbox events over SSE.
//
//	@Summary		Inbox event stream
//	@Description	Long-lived SSE stream for in-app messages. Sends inbox events and heartbeats.
//	@ID				streamInbox
//	@Tags			Inbox
//	@Produce		text/event-stream
//	@Param			Last-Event-ID	header		string	false	"Last received message ID for catch-up"
//	@Success		200				{object}	InboxStreamEvent	"Event stream"
//	@Failure		401				{object}	util.ErrorResponse
//	@Router			/api/inbox/stream [get]
func (c *InboxController) Stream(ctx *gin.Context) {
	userID := middleware.GetUserIDFromContext(ctx)
	if userID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}
	hub := c.service.InboxHub()
	if hub == nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Inbox hub is not available"))
		return
	}

	conn := hub.Add(userID)
	defer hub.Remove(conn)

	cursor := c.service.CursorFromLastEventID(ctx, userID, ctx.GetHeader("Last-Event-ID"))

	if rc := http.NewResponseController(ctx.Writer); rc != nil {
		_ = rc.SetWriteDeadline(time.Now().Add(sseWriteTimeout))
	}
	ctx.Writer.Header().Set("Content-Type", "text/event-stream")
	ctx.Writer.Header().Set("Cache-Control", "no-cache")
	ctx.Writer.Header().Set("Connection", "keep-alive")
	ctx.Writer.Header().Set("X-Accel-Buffering", "no")

	ticker := time.NewTicker(sseHeartbeatInterval)
	defer ticker.Stop()

	flush := func(w io.Writer) bool {
		refreshSSEDeadline(ctx)
		msgs, err := c.service.ListInboxSince(ctx, userID, cursor, 0)
		if err != nil {
			return false
		}
		for i := range msgs {
			msg := msgs[i]
			evt := InboxStreamEvent{EventType: "message", Message: &msg}
			writeSSE(w, "inbox", msg.ResourceID, evt)
			cursor = &service.InboxCursor{CreatedAt: msg.CreatedAt, ResourceID: msg.ResourceID}
		}
		count, err := c.service.CountUnreadInbox(ctx, userID)
		if err != nil {
			return false
		}
		writeSSE(w, "inbox", "", InboxStreamEvent{EventType: "sync", UnreadCount: &count})
		return true
	}

	first := true
	ctx.Stream(func(w io.Writer) bool {
		if first {
			first = false
			return flush(w)
		}
		select {
		case <-ctx.Request.Context().Done():
			return false
		case <-ticker.C:
			refreshSSEDeadline(ctx)
			fmt.Fprintf(w, ": ping\n\n")
			return true
		case <-conn.Notify():
			return flush(w)
		}
	})
}

func refreshSSEDeadline(ctx *gin.Context) {
	if rc := http.NewResponseController(ctx.Writer); rc != nil {
		_ = rc.SetWriteDeadline(time.Now().Add(sseWriteTimeout))
	}
}

func writeSSE(w io.Writer, event, id string, v any) {
	if id != "" {
		fmt.Fprintf(w, "id: %s\n", id)
	}
	if event != "" {
		fmt.Fprintf(w, "event: %s\n", event)
	}
	b, _ := json.Marshal(v)
	fmt.Fprintf(w, "data: %s\n\n", b)
}
