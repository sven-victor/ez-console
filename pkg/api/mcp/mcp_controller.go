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
	"encoding/json"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/hashicorp/golang-lru/v2/expirable"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	"github.com/spf13/viper"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
)

// MCPController handles MCP protocol endpoints
type MCPController struct {
	service     *service.Service
	handler     *mcp.StreamableHTTPHandler
	serverCache *expirable.LRU[string, *mcp.Server]
}

// NewMCPController creates a new MCP controller
func NewMCPController(svc *service.Service) *MCPController {
	serviceName := viper.GetString("service_name")
	version := viper.GetString("service.version")
	mcpServerCache := expirable.NewLRU[string, *mcp.Server](32, nil, time.Minute*10)
	handler := mcp.NewStreamableHTTPHandler(func(r *http.Request) *mcp.Server {
		logger := log.GetContextLogger(r.Context())
		ctx, ok := r.Context().(*gin.Context)
		if !ok {
			level.Error(logger).Log("msg", "Failed to get context from request")
			return nil
		}
		accountID := ctx.GetString("service_account_id")
		if accountID == "" {
			accountID = ctx.GetString("user_id")
		}
		if accountID == "" {
			level.Error(logger).Log("msg", "Account not authenticated")
			return nil
		}
		organizationID := ctx.GetString("organization_id")
		if organizationID == "" {
			level.Error(logger).Log("msg", "Organization not authenticated")
			return nil
		}

		server, ok := mcpServerCache.Get(accountID)
		if !ok {
			server = mcp.NewServer(&mcp.Implementation{Name: serviceName, Version: version}, nil)
			toolSets, err := svc.GetAuthorizedToolSets(ctx, organizationID)
			if err != nil {
				level.Error(logger).Log("msg", "Failed to get tool sets", "error", err)
				return nil
			} else {
				tools, err := toolSets.GetTools(ctx)
				if err != nil {
					level.Error(logger).Log("msg", "Failed to get tools", "error", err)
				}
				for _, tool := range tools {
					mcp.AddTool[json.RawMessage, any](server, &mcp.Tool{
						Name:        tool.Function.Name,
						Description: tool.Function.Description,
						InputSchema: tool.Function.Parameters,
					}, func(ctx context.Context, request *mcp.CallToolRequest, input json.RawMessage) (*mcp.CallToolResult, any, error) {
						result, err := toolSets.CallTool(ctx, tool.Function.Name, string(input))
						if err != nil {
							return nil, nil, err
						}

						return &mcp.CallToolResult{Content: []mcp.Content{&mcp.TextContent{Text: result}}}, nil, nil
					})
				}
			}

			mcpServerCache.Add(accountID, server)
		}
		return server
	}, &mcp.StreamableHTTPOptions{Stateless: true})

	return &MCPController{
		service:     svc,
		handler:     handler,
		serverCache: mcpServerCache,
	}
}

// RegisterRoutes registers MCP routes
func (c *MCPController) RegisterRoutes(router *gin.RouterGroup) {
	mcpGroup := router.Group("/mcp")
	{
		mcpGroup.Any("", func(ctx *gin.Context) {
			organizationID := ctx.GetString("organization_id")
			if organizationID == "" {
				util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
				return
			}
			c.handler.ServeHTTP(ctx.Writer, ctx.Request.WithContext(ctx))
		})
	}
}
