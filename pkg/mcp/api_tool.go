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
)

// APIToolHandler is a function that handles an API tool call
// It receives the context and arguments, and returns the result or an error
type APIToolHandler func(ctx context.Context, arguments map[string]interface{}) (interface{}, error)

// APITool represents an internal API exposed as an MCP tool
type APITool struct {
	Name        string
	Description string
	InputSchema any
	Permission  string
	Handler     APIToolHandler
}

// NewAPITool creates a new API tool
func NewAPITool(name, description string, inputSchema map[string]interface{}, permission string, handler APIToolHandler) *APITool {
	return &APITool{
		Name:        name,
		Description: description,
		InputSchema: inputSchema,
		Permission:  permission,
		Handler:     handler,
	}
}

// ToMCPTool converts an APITool to an MCPTool for listing
func (t *APITool) ToMCPTool() MCPTool {
	return MCPTool{
		Name:        t.Name,
		Description: t.Description,
		InputSchema: t.InputSchema,
	}
}

// Call executes the tool handler with the given arguments
func (t *APITool) Call(ctx context.Context, arguments map[string]interface{}) (interface{}, error) {
	return t.Handler(ctx, arguments)
}

// ToolCallResult represents the result of a tool call
type ToolCallResult struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// FormatToolResponse formats a tool response into MCP content blocks
func FormatToolResponse(result interface{}, isError bool) []ContentBlock {
	var text string
	if isError {
		if err, ok := result.(error); ok {
			text = err.Error()
		} else {
			text = "Unknown error"
		}
	} else {
		// Convert result to JSON string
		data, err := json.Marshal(result)
		if err != nil {
			text = "Failed to serialize result"
			isError = true
		} else {
			text = string(data)
		}
	}

	return []ContentBlock{
		{
			Type: "text",
			Text: text,
		},
	}
}
