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
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// AITraceController handles AI debug tracing endpoints
type AITraceController struct {
	service *service.Service
}

// NewAITraceController creates a new AI trace controller
func NewAITraceController(svc *service.Service) *AITraceController {
	return &AITraceController{service: svc}
}

// RegisterRoutes registers AI trace routes
func (c *AITraceController) RegisterRoutes(router *gin.RouterGroup) {
	trace := router.Group("/trace")
	{
		trace.GET("/status", middleware.RequirePermission("ai:trace:manage"), c.GetTraceStatus)
		trace.POST("/toggle", middleware.RequirePermission("ai:trace:manage"), c.ToggleTrace)
		trace.GET("/events", middleware.RequirePermission("ai:trace:manage"), c.GetTraceEvents)
		trace.GET("/events/download", middleware.RequirePermission("ai:trace:manage"), c.DownloadTraceEvents)
	}
}

// TraceStatusResponse represents the debug tracing status
type TraceStatusResponse struct {
	Enabled bool `json:"enabled"`
}

// ToggleTraceRequest represents the request to toggle tracing
type ToggleTraceRequest struct {
	Enabled bool `json:"enabled"`
}

// GetTraceStatus returns the current AI debug tracing status
//
//	@Summary		Get AI trace status
//	@Description	Get the current AI debug tracing enabled/disabled status
//	@ID				getAITraceStatus
//	@Tags			AI/Trace
//	@Produce		json
//	@Success		200	{object}	util.Response[TraceStatusResponse]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/trace/status [get]
func (c *AITraceController) GetTraceStatus(ctx *gin.Context) {
	enabled := c.service.AITraceService.IsTraceEnabled(ctx)
	util.RespondWithSuccess(ctx, http.StatusOK, TraceStatusResponse{Enabled: enabled})
}

// ToggleTrace toggles the AI debug tracing on or off
//
//	@Summary		Toggle AI trace
//	@Description	Enable or disable AI debug tracing globally. When disabled, all trace data is deleted.
//	@ID				toggleAITrace
//	@Tags			AI/Trace
//	@Accept			json
//	@Produce		json
//	@Param			request	body		ToggleTraceRequest	true	"Toggle request"
//	@Success		200	{object}	util.Response[TraceStatusResponse]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/trace/toggle [post]
func (c *AITraceController) ToggleTrace(ctx *gin.Context) {
	var req ToggleTraceRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	if err := c.service.AITraceService.SetTraceEnabled(ctx, req.Enabled); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, TraceStatusResponse{Enabled: req.Enabled})
}

// GetTraceEvents returns trace events for a given trace ID
//
//	@Summary		Get AI trace events
//	@Description	Get all trace events for a given trace ID, ordered by step
//	@ID				getAITraceEvents
//	@Tags			AI/Trace
//	@Produce		json
//	@Param			trace_id	query		string	true	"Trace ID"
//	@Success		200	{object}	util.Response[[]model.AITraceEvent]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/trace/events [get]
func (c *AITraceController) GetTraceEvents(ctx *gin.Context) {
	traceID := ctx.Query("trace_id")
	if traceID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "trace_id is required"))
		return
	}

	events, err := c.service.AITraceService.GetTraceEvents(ctx, traceID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, events)
}

// DownloadTraceEvents downloads trace events as a JSON file
//
//	@Summary		Download AI trace events
//	@Description	Download all trace events for a given trace ID as a JSON file
//	@ID				downloadAITraceEvents
//	@Tags			AI/Trace
//	@Produce		octet-stream
//	@Param			trace_id	query		string	true	"Trace ID"
//	@Success		200
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/trace/events/download [get]
func (c *AITraceController) DownloadTraceEvents(ctx *gin.Context) {
	traceID := ctx.Query("trace_id")
	if traceID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "trace_id is required"))
		return
	}

	data, err := c.service.AITraceService.DownloadTraceEvents(ctx, traceID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	filename := fmt.Sprintf("ai-trace-%s.json", traceID)
	ctx.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", filename))
	ctx.Data(http.StatusOK, "application/json", data)
}

func init() {
	middleware.RegisterPermission("AI Trace Management", "Manage AI debug tracing", []model.Permission{
		{
			Code:          "ai:trace:manage",
			Name:          "Manage AI trace",
			Description:   "Enable/disable AI debug tracing and view trace events",
			OrgPermission: false,
		},
	})
}
