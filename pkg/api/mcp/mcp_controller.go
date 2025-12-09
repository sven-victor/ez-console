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

package mcpapi

import (
	"io"
	"slices"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/mcp"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
)

// MCPController handles MCP protocol endpoints
type MCPController struct {
	service *service.Service
	handler *mcp.MCPHandler
}

// NewMCPController creates a new MCP controller
func NewMCPController(svc *service.Service) *MCPController {
	registry := mcp.GetGlobalRegistry()
	handler := mcp.NewMCPHandler(registry)

	return &MCPController{
		service: svc,
		handler: handler,
	}
}

// RegisterRoutes registers MCP routes
func (c *MCPController) RegisterRoutes(router *gin.RouterGroup) {
	mcpGroup := router.Group("/mcp")
	{
		mcpGroup.POST("/sse", c.HandleSSE)
	}
}

// HandleSSE handles SSE-based MCP communication
//
//	@Summary		MCP SSE endpoint
//	@Description	Handle MCP protocol communication over Server-Sent Events
//	@ID             mcpSSE
//	@Tags			MCP
//	@Accept			json
//	@Produce		text/event-stream
//	@Param			request	body	mcp.JSONRPCRequest	true	"JSON-RPC request"
//	@Success		200	{object}	mcp.JSONRPCResponse	"JSON-RPC response"
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/mcp/sse [post]
func (c *MCPController) HandleSSE(ctx *gin.Context) {
	logger := log.GetContextLogger(ctx)

	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}
	// Parse JSON-RPC request from body
	var req mcp.JSONRPCRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		level.Error(logger).Log("msg", "Failed to parse JSON-RPC request", "error", err)
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	// Validate JSON-RPC version
	if req.JSONRPC != "2.0" {
		level.Warn(logger).Log("msg", "Invalid JSON-RPC version", "version", req.JSONRPC)
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid JSON-RPC version, expected 2.0"))
		return
	}
	ctx.Writer.Header().Set("Cache-Control", "no-cache")
	ctx.Writer.Header().Set("Connection", "keep-alive")
	ctx.Writer.Header().Set("X-Accel-Buffering", "no")
	if slices.Contains(ctx.Accepted, "application/json") {
		// Set JSON headers
		ctx.Writer.Header().Set("Content-Type", "application/json")
		// Handle the request
		response := c.handler.HandleRequest(ctx, organizationID, &req)
		// Send the response as a JSON response
		ctx.JSON(200, response)
	} else {
		// Set SSE headers
		ctx.Writer.Header().Set("Content-Type", "text/event-stream")
		// Handle the request
		response := c.handler.HandleRequest(ctx, organizationID, &req)

		// Send the response as an SSE event
		ctx.Stream(func(w io.Writer) bool {
			ctx.SSEvent("message", response)
			return false // Only send one response per request
		})
	}
}
