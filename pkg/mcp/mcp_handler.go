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

package mcp

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/log"
)

// MCPHandler handles MCP protocol requests
type MCPHandler struct {
	registry *MCPToolRegistry
}

// NewMCPHandler creates a new MCP handler
func NewMCPHandler(registry *MCPToolRegistry) *MCPHandler {
	return &MCPHandler{
		registry: registry,
	}
}

// HandleRequest handles an incoming JSON-RPC request
func (h *MCPHandler) HandleRequest(ctx context.Context, organizationID string, req *JSONRPCRequest) *JSONRPCResponse {

	switch req.Method {
	case "tools/list":
		return h.handleToolsList(ctx, organizationID, req)
	case "tools/call":
		return h.handleToolsCall(ctx, organizationID, req)
	case "notifications/initialized", "ping":
		return NewJSONRPCResponse(req.ID, nil)
	case "initialize":
		return NewJSONRPCResponse(req.ID, map[string]any{
			"protocolVersion": "2025-06-18",
			"capabilities": map[string]any{
				"tools": map[string]any{
					"listChanged": true,
				},
			},
			"serverInfo": map[string]any{
				"name":    "ez-console",
				"version": "1.0.0",
			},
		})
	default:
		return NewJSONRPCError(req.ID, MethodNotFound, fmt.Sprintf("Method not found: %s", req.Method), nil)
	}
}

// handleToolsList handles the tools/list method
func (h *MCPHandler) handleToolsList(ctx context.Context, organizationID string, req *JSONRPCRequest) *JSONRPCResponse {
	logger := log.GetContextLogger(ctx)
	// Get user permissions from context
	userPermissions := h.getUserPermissions(ctx)

	// Get filtered tools based on permissions
	apiTools := h.registry.FilterByPermissions(userPermissions)

	// Convert to MCP tools
	mcpTools := make([]MCPTool, 0, len(apiTools))
	for _, tool := range apiTools {
		mcpTools = append(mcpTools, tool.ToMCPTool())
	}
	toolSets, err := h.registry.toolsets(ctx, organizationID)
	if err != nil {
		level.Error(logger).Log("msg", "failed to get tool sets", "error", err)
	} else {
		toolsList, err := toolSets.GetTools(ctx)
		if err != nil {
			level.Error(logger).Log("msg", "failed to get tool sets", "error", err)
		} else {
			for _, tool := range toolsList {
				mcpTools = append(mcpTools, MCPTool{
					Name:        tool.Function.Name,
					Description: tool.Function.Description,
					InputSchema: tool.Function.Parameters,
				})
			}
		}
	}

	result := ToolsListResponse{
		Tools: mcpTools,
	}

	return NewJSONRPCResponse(req.ID, result)
}

// handleToolsCall handles the tools/call method
func (h *MCPHandler) handleToolsCall(ctx context.Context, organizationID string, req *JSONRPCRequest) *JSONRPCResponse {
	logger := log.GetContextLogger(ctx)
	// Parse request params
	var callReq ToolCallRequest
	if err := json.Unmarshal(req.Params, &callReq); err != nil {
		return NewJSONRPCError(req.ID, InvalidParams, "Invalid parameters", err.Error())
	}

	// Validate tool name
	if callReq.Name == "" {
		return NewJSONRPCError(req.ID, InvalidParams, "Tool name is required", nil)
	}
	// Get the tool
	tool, exists := h.registry.GetTool(callReq.Name)
	if exists {
		// Check permissions
		if tool.Permission != "" {
			userPermissions := h.getUserPermissions(ctx)
			if !userPermissions[tool.Permission] {
				return NewJSONRPCError(req.ID, InternalError, "Permission denied", nil)
			}
		}

		// Call the tool
		result, err := tool.Call(ctx, callReq.Arguments)
		if err != nil {
			response := ToolCallResponse{
				Content: FormatToolResponse(err, true),
				IsError: true,
			}
			return NewJSONRPCResponse(req.ID, response)
		}

		response := ToolCallResponse{
			Content: FormatToolResponse(result, false),
			IsError: false,
		}
		return NewJSONRPCResponse(req.ID, response)
	}
	if h.registry.toolsets != nil {
		toolSets, err := h.registry.toolsets(ctx, organizationID)
		if err != nil {
			level.Error(logger).Log("msg", "failed to get tool sets", "error", err)
		} else {
			arguments, err := json.Marshal(callReq.Arguments)
			if err != nil {
				level.Error(logger).Log("msg", "failed to marshal arguments", "error", err)
				return NewJSONRPCError(req.ID, InvalidParams, "Invalid parameters", err.Error())
			}
			result, err := toolSets.CallTool(ctx, callReq.Name, string(arguments))
			if err != nil {
				response := ToolCallResponse{
					Content: FormatToolResponse(err, true),
					IsError: true,
				}
				return NewJSONRPCResponse(req.ID, response)
			}
			response := ToolCallResponse{
				Content: FormatToolResponse(result, false),
				IsError: false,
			}
			return NewJSONRPCResponse(req.ID, response)
		}
	}
	return NewJSONRPCError(req.ID, MethodNotFound, fmt.Sprintf("Tool not found: %s", callReq.Name), nil)
}

// getUserPermissions extracts user permissions from context
func (h *MCPHandler) getUserPermissions(ctx context.Context) map[string]bool {
	permissions := make(map[string]bool)

	// Get roles from context
	roles, ok := ctx.Value("roles").([]model.Role)
	if !ok {
		return permissions
	}

	// Check if user is admin
	for _, role := range roles {
		if role.Name == "admin" && (role.OrganizationID == nil || *role.OrganizationID == "") {
			// Admin has all permissions
			permissions["*"] = true
			return permissions
		}
	}

	// Collect all permissions from roles
	for _, role := range roles {
		for _, perm := range role.Permissions {
			permissions[perm.Code] = true
		}
	}

	return permissions
}
