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
	"fmt"
	"sync"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-utils/log"
)

type ToolSetsFactory func(ctx context.Context, organizationID string) (toolset.ToolSets, error)

var (
	globalRegistry = &MCPToolRegistry{
		apiTools: make(map[string]*APITool),
	}
)

// APIToolRegistry manages registered API tools
type MCPToolRegistry struct {
	mu       sync.RWMutex
	apiTools map[string]*APITool
	toolsets ToolSetsFactory
}

// GetGlobalRegistry returns the global API tool registry
func GetGlobalRegistry() *MCPToolRegistry {
	return globalRegistry
}

// RegisterAPITool registers an API tool in the global registry
func RegisterAPITool(name, description string, inputSchema map[string]interface{}, permission string, handler APIToolHandler) error {
	return globalRegistry.RegisterAPITool(name, description, inputSchema, permission, handler)
}

// Register registers a new API tool
func (r *MCPToolRegistry) RegisterAPITool(name, description string, inputSchema map[string]interface{}, permission string, handler APIToolHandler) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.apiTools[name]; exists {
		return fmt.Errorf("tool %s already registered", name)
	}

	tool := NewAPITool(name, description, inputSchema, permission, handler)
	r.apiTools[name] = tool
	return nil
}

// RegisterToolSetsFactory registers a tool sets factory in the global registry
func RegisterToolSetsFactory(factory ToolSetsFactory) error {
	return globalRegistry.RegisterToolSetsFactory(factory)
}

// RegisterToolSetsFactory registers a tool sets factory in the global registry
func (r *MCPToolRegistry) RegisterToolSetsFactory(factory ToolSetsFactory) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.toolsets = factory
	return nil
}

// GetTool retrieves a registered tool by name
func (r *MCPToolRegistry) GetTool(name string) (*APITool, bool) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	tool, exists := r.apiTools[name]
	return tool, exists
}

// ListTools returns all registered tools
func (r *MCPToolRegistry) ListTools(ctx context.Context, organizationID string) []*APITool {
	logger := log.GetContextLogger(ctx)
	r.mu.RLock()
	defer r.mu.RUnlock()

	tools := make([]*APITool, 0, len(r.apiTools))
	for _, tool := range r.apiTools {
		tools = append(tools, tool)
	}
	if r.toolsets != nil {
		toolSets, err := r.toolsets(ctx, organizationID)
		if err != nil {
			level.Error(logger).Log("msg", "failed to get tool sets", "error", err)
			return tools
		}
		toolsList, err := toolSets.GetTools(ctx)
		if err != nil {
			level.Error(logger).Log("msg", "failed to get tool sets", "error", err)
			return tools
		}
		for _, tool := range toolsList {
			tools = append(tools, &APITool{
				Name:        tool.Function.Name,
				Description: tool.Function.Description,
				InputSchema: tool.Function.Parameters,
			})
		}
	}
	return tools
}

// FilterByPermissions filters tools based on user permissions
func (r *MCPToolRegistry) FilterByPermissions(userPermissions map[string]bool) []*APITool {
	r.mu.RLock()
	defer r.mu.RUnlock()

	filtered := make([]*APITool, 0)
	for _, tool := range r.apiTools {
		// If tool has no permission requirement, include it
		if tool.Permission == "" {
			filtered = append(filtered, tool)
			continue
		}
		// Check if user has the required permission
		if userPermissions[tool.Permission] {
			filtered = append(filtered, tool)
		}
	}
	return filtered
}
