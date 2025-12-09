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
	"context"
	"fmt"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/mcp"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
)

func init() {
	// Register MCP permissions
	middleware.RegisterPermission("MCP User Management", "MCP tools for managing users", []model.Permission{
		{
			Code:        "mcp:user:list",
			Name:        "MCP List Users",
			Description: "List users via MCP tools",
		},
		{
			Code:        "mcp:user:get",
			Name:        "MCP Get User",
			Description: "Get user details via MCP tools",
		},
		{
			Code:        "mcp:user:create",
			Name:        "MCP Create User",
			Description: "Create users via MCP tools",
		},
		{
			Code:        "mcp:user:update",
			Name:        "MCP Update User",
			Description: "Update users via MCP tools",
		},
		{
			Code:        "mcp:user:delete",
			Name:        "MCP Delete User",
			Description: "Delete users via MCP tools",
		},
	})

	// Register user list tool
	mcp.RegisterAPITool(
		"user_list",
		"List users with optional filtering and pagination",
		map[string]interface{}{
			"type": "object",
			"properties": map[string]interface{}{
				"current": map[string]interface{}{
					"type":        "integer",
					"description": "Current page number",
					"default":     1,
				},
				"page_size": map[string]interface{}{
					"type":        "integer",
					"description": "Number of items per page",
					"default":     10,
				},
				"keywords": map[string]interface{}{
					"type":        "string",
					"description": "Keywords for searching users",
				},
				"status": map[string]interface{}{
					"type":        "string",
					"description": "Filter by user status (enabled, disabled, etc.)",
				},
			},
		},
		"mcp:user:list",
		func(ctx context.Context, args map[string]interface{}) (interface{}, error) {
			svc := service.NewService(ctx)

			// Extract parameters with defaults
			current := 1
			pageSize := 10
			keywords := ""
			status := ""

			if val, ok := args["current"].(float64); ok {
				current = int(val)
			}
			if val, ok := args["page_size"].(float64); ok {
				pageSize = int(val)
			}
			if val, ok := args["keywords"].(string); ok {
				keywords = val
			}
			if val, ok := args["status"].(string); ok {
				status = val
			}

			users, total, err := svc.ListUsers(ctx, keywords, status, current, pageSize)
			if err != nil {
				return nil, fmt.Errorf("failed to list users: %w", err)
			}

			return map[string]interface{}{
				"users":     users,
				"total":     total,
				"current":   current,
				"page_size": pageSize,
			}, nil
		},
	)

	// Register user get tool
	mcp.RegisterAPITool(
		"user_get",
		"Get detailed information about a specific user by ID",
		map[string]interface{}{
			"type": "object",
			"properties": map[string]interface{}{
				"id": map[string]interface{}{
					"type":        "string",
					"description": "User ID (UUID format)",
				},
			},
			"required": []string{"id"},
		},
		"mcp:user:get",
		func(ctx context.Context, args map[string]interface{}) (interface{}, error) {
			svc := service.NewService(ctx)

			id, ok := args["id"].(string)
			if !ok || id == "" {
				return nil, fmt.Errorf("user ID is required")
			}

			user, err := svc.GetUserByID(ctx, id, service.WithRoles(true), service.WithCache(true))
			if err != nil {
				return nil, fmt.Errorf("failed to get user: %w", err)
			}

			return user, nil
		},
	)

	// Register user create tool
	mcp.RegisterAPITool(
		"user_create",
		"Create a new user with specified details",
		map[string]interface{}{
			"type": "object",
			"properties": map[string]interface{}{
				"username": map[string]interface{}{
					"type":        "string",
					"description": "Username for login",
				},
				"email": map[string]interface{}{
					"type":        "string",
					"description": "Email address",
				},
				"password": map[string]interface{}{
					"type":        "string",
					"description": "Password",
				},
				"full_name": map[string]interface{}{
					"type":        "string",
					"description": "Full name of the user",
				},
				"phone": map[string]interface{}{
					"type":        "string",
					"description": "Phone number (optional)",
				},
				"role_ids": map[string]interface{}{
					"type": "array",
					"items": map[string]interface{}{
						"type": "string",
					},
					"description": "List of role IDs to assign",
				},
			},
			"required": []string{"username", "email", "password"},
		},
		"mcp:user:create",
		func(ctx context.Context, args map[string]interface{}) (interface{}, error) {
			svc := service.NewService(ctx)

			// Build create request
			req := service.CreateUserRequest{}

			if val, ok := args["username"].(string); ok {
				req.Username = val
			} else {
				return nil, fmt.Errorf("username is required")
			}

			if val, ok := args["email"].(string); ok {
				req.Email = val
			} else {
				return nil, fmt.Errorf("email is required")
			}

			if val, ok := args["password"].(string); ok {
				req.Password = val
			} else {
				return nil, fmt.Errorf("password is required")
			}

			if val, ok := args["full_name"].(string); ok {
				req.FullName = val
			}

			if val, ok := args["phone"].(string); ok {
				req.Phone = val
			}

			if roleIDs, ok := args["role_ids"].([]interface{}); ok {
				req.RoleIDs = make([]string, 0, len(roleIDs))
				for _, rid := range roleIDs {
					if ridStr, ok := rid.(string); ok {
						req.RoleIDs = append(req.RoleIDs, ridStr)
					}
				}
			}

			user, err := svc.CreateUser(ctx, req)
			if err != nil {
				return nil, fmt.Errorf("failed to create user: %w", err)
			}

			return user, nil
		},
	)

	// Register user update tool
	mcp.RegisterAPITool(
		"user_update",
		"Update an existing user's information",
		map[string]interface{}{
			"type": "object",
			"properties": map[string]interface{}{
				"id": map[string]interface{}{
					"type":        "string",
					"description": "User ID (UUID format)",
				},
				"email": map[string]interface{}{
					"type":        "string",
					"description": "Email address",
				},
				"full_name": map[string]interface{}{
					"type":        "string",
					"description": "Full name of the user",
				},
				"phone": map[string]interface{}{
					"type":        "string",
					"description": "Phone number",
				},
				"status": map[string]interface{}{
					"type":        "string",
					"description": "User status (enabled, disabled)",
				},
				"role_ids": map[string]interface{}{
					"type": "array",
					"items": map[string]interface{}{
						"type": "string",
					},
					"description": "List of role IDs to assign",
				},
			},
			"required": []string{"id"},
		},
		"mcp:user:update",
		func(ctx context.Context, args map[string]interface{}) (interface{}, error) {
			svc := service.NewService(ctx)

			id, ok := args["id"].(string)
			if !ok || id == "" {
				return nil, fmt.Errorf("user ID is required")
			}

			// Build update request
			req := service.UpdateUserRequest{}

			if val, ok := args["email"].(string); ok {
				req.Email = val
			}

			if val, ok := args["full_name"].(string); ok {
				req.FullName = val
			}

			if val, ok := args["phone"].(string); ok {
				req.Phone = val
			}

			if val, ok := args["status"].(string); ok {
				req.Status = val
			}

			if roleIDs, ok := args["role_ids"].([]interface{}); ok {
				roleIDStrs := make([]string, 0, len(roleIDs))
				for _, rid := range roleIDs {
					if ridStr, ok := rid.(string); ok {
						roleIDStrs = append(roleIDStrs, ridStr)
					}
				}
				req.RoleIDs = &roleIDStrs
			}

			user, err := svc.PatchUser(ctx, id, req)
			if err != nil {
				return nil, fmt.Errorf("failed to update user: %w", err)
			}

			return user, nil
		},
	)

	// Register user delete tool
	mcp.RegisterAPITool(
		"user_delete",
		"Delete a user by ID (soft delete)",
		map[string]interface{}{
			"type": "object",
			"properties": map[string]interface{}{
				"id": map[string]interface{}{
					"type":        "string",
					"description": "User ID (UUID format)",
				},
			},
			"required": []string{"id"},
		},
		"mcp:user:delete",
		func(ctx context.Context, args map[string]interface{}) (interface{}, error) {
			id, ok := args["id"].(string)
			if !ok || id == "" {
				return nil, fmt.Errorf("user ID is required")
			}

			// Perform soft delete
			if err := db.Session(ctx).Where("resource_id = ?", id).Delete(&model.User{}).Error; err != nil {
				return nil, fmt.Errorf("failed to delete user: %w", err)
			}

			return map[string]interface{}{
				"success": true,
				"message": "User deleted successfully",
			}, nil
		},
	)
}

