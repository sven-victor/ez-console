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

package ai

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/google/uuid"
	"github.com/invopop/jsonschema"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-agent/tool"
	mcp "github.com/sven-victor/ez-agent/tool/mcp"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/safe"
	orderedmap "github.com/wk8/go-ordered-map/v2"
)

// MCPToolSet implements the ToolSet interface for MCP protocol
type MCPToolSet struct {
	name        string
	description string
	endpoint    string
	protocol    string
	username    string
	password    string
	token       string
	config      map[string]interface{}
	client      *mcp.Client
}

func (m *MCPToolSet) dialClient() (*mcp.Client, error) {
	if m.client == nil {
		var opts []mcp.Option
		if headers := mcpArgsHeaders(m.config); len(headers) > 0 {
			opts = append(opts, mcp.WithHeaders(headers))
		}
		if proxy := mcpArgsProxy(m.config); proxy != "" {
			opts = append(opts, mcp.WithProxy(proxy))
		}
		if m.username != "" && m.password != "" {
			password, err := safe.NewEncryptedString(m.password, os.Getenv(safe.SecretEnvName)).UnsafeString()
			if err != nil {
				return nil, fmt.Errorf("failed to decrypt password: %w", err)
			}
			opts = append(opts, mcp.WithHeaders(map[string]string{
				"Authorization": "Basic " + base64.StdEncoding.EncodeToString([]byte(m.username+":"+password)),
			}))
		}
		if m.token != "" {
			opts = append(opts, mcp.WithHeaders(map[string]string{
				"Authorization": "Bearer " + m.token,
			}))
		}
		switch m.protocol {
		case "http":
			client, err := mcp.DialHTTP(context.Background(), m.endpoint, opts...)
			if err != nil {
				return nil, fmt.Errorf("failed to create MCP client: %w", err)
			}
			m.client = client
		case "sse":
			client, err := mcp.DialSSE(context.Background(), m.endpoint, opts...)
			if err != nil {
				return nil, fmt.Errorf("failed to create MCP client: %w", err)
			}
			m.client = client
		default:
			return nil, fmt.Errorf("unsupported protocol: %s", m.protocol)
		}
	}
	return m.client, nil
}

// mcpArgsHeaders reads optional HTTP headers from args.
// Accepted keys: "headers" (preferred) or "header".
func mcpArgsHeaders(args map[string]interface{}) map[string]string {
	if len(args) == 0 {
		return nil
	}
	raw, ok := args["headers"]
	if !ok || raw == nil {
		raw, ok = args["header"]
		if !ok || raw == nil {
			return nil
		}
	}
	switch v := raw.(type) {
	case map[string]string:
		if len(v) == 0 {
			return nil
		}
		out := make(map[string]string, len(v))
		for k, val := range v {
			if k == "" {
				continue
			}
			out[k] = val
		}
		return out
	case map[string]interface{}:
		if len(v) == 0 {
			return nil
		}
		out := make(map[string]string, len(v))
		for k, val := range v {
			if k == "" || val == nil {
				continue
			}
			switch s := val.(type) {
			case string:
				out[k] = s
			case fmt.Stringer:
				out[k] = s.String()
			default:
				out[k] = fmt.Sprint(s)
			}
		}
		if len(out) == 0 {
			return nil
		}
		return out
	default:
		return nil
	}
}

// mcpArgsProxy reads an optional proxy URL from args ("proxy").
// Supported schemes: http, https, socks5, socks5h.
func mcpArgsProxy(args map[string]interface{}) string {
	if len(args) == 0 {
		return ""
	}
	raw, ok := args["proxy"]
	if !ok || raw == nil {
		return ""
	}
	switch v := raw.(type) {
	case string:
		return strings.TrimSpace(v)
	case fmt.Stringer:
		return strings.TrimSpace(v.String())
	default:
		return strings.TrimSpace(fmt.Sprint(v))
	}
}

// MCPRequest represents an MCP request
type MCPRequest struct {
	JSONRPC string                 `json:"jsonrpc"`
	ID      string                 `json:"id"`
	Method  string                 `json:"method"`
	Params  map[string]interface{} `json:"params,omitempty"`
}

func MakeMCPRequest(method string, params map[string]interface{}) MCPRequest {
	return MCPRequest{
		JSONRPC: "2.0",
		ID:      uuid.New().String(),
		Method:  method,
		Params:  params,
	}
}

// MCPResponse represents an MCP response
type MCPResponse struct {
	Result interface{} `json:"result,omitempty"`
	Error  *MCPError   `json:"error,omitempty"`
}

// MCPError represents an MCP error
type MCPError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

// MCPTool represents a tool from MCP
type MCPTool struct {
	Name        string                 `json:"name"`
	Description string                 `json:"description"`
	InputSchema map[string]interface{} `json:"inputSchema"`
}

// MCPListToolsResponse represents the response from MCP list tools
type MCPListToolsResponse struct {
	Tools []MCPTool `json:"tools"`
}

// NewMCPToolSet creates a new MCP toolset
func NewMCPToolSet(name, description, endpoint, protocol string, username, password, token string, config map[string]interface{}) *MCPToolSet {
	return &MCPToolSet{
		name:        name,
		description: description,
		endpoint:    endpoint,
		protocol:    protocol,
		username:    username,
		password:    password,
		token:       token,
		config:      config,
	}
}

// GetName returns the toolset name
func (m *MCPToolSet) GetName() string {
	return m.name
}

// GetDescription returns the toolset description
func (m *MCPToolSet) GetDescription() string {
	return m.description
}

// Validate validates the toolset configuration
func (m *MCPToolSet) Validate() error {
	if m.endpoint == "" {
		return fmt.Errorf("endpoint is required")
	}
	if m.protocol != "http" && m.protocol != "sse" {
		return fmt.Errorf("unsupported protocol: %s", m.protocol)
	}
	return nil
}

// Test tests the connection to the MCP server
func (m *MCPToolSet) Test(ctx context.Context) error {
	// Test HTTP connection by listing tools
	_, err := m.ListTools(ctx)
	return err
}

// Call calls a tool function
func (m *MCPToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	client, err := m.dialClient()
	if err != nil {
		return "", fmt.Errorf("failed to dial client: %w", err)
	}

	toolHandler, ok := client.Lookup(name)
	if !ok {
		return "", fmt.Errorf("tool %s not found", name)
	}
	var input json.RawMessage
	if err := json.Unmarshal([]byte(parameters), &input); err != nil {
		return "", fmt.Errorf("failed to unmarshal parameters: %w", err)
	}
	result, err := toolHandler(ctx, tool.Call{
		ID:    uuid.New().String(),
		Name:  name,
		Input: input,
	})
	if err != nil {
		return "", fmt.Errorf("failed to call tool: %w", err)
	}
	if !result.OK {
		return "", fmt.Errorf("tool %s failed: %w", name, result.Err)
	}
	if result.Content == nil {
		return "", fmt.Errorf("tool %s returned no content", name)
	}
	if len(result.Content) == 0 {
		return "", fmt.Errorf("tool %s returned no content", name)
	}
	var parts []string
	for _, part := range result.Content {
		if textPart, ok := part.(message.Text); ok {
			parts = append(parts, textPart.Text)
		}
	}
	return strings.Join(parts, "\n"), nil
}

// ListTools lists available tools from the MCP server
func (m *MCPToolSet) ListTools(ctx context.Context) ([]openai.Tool, error) {
	client, err := m.dialClient()
	if err != nil {
		return nil, fmt.Errorf("failed to dial client: %w", err)
	}

	// Convert MCP tools to OpenAI tools
	var openaiTools []openai.Tool
	for _, mcpTool := range client.Specs() {
		openaiTool := openai.Tool{
			Type: openai.ToolTypeFunction,
			Function: &openai.FunctionDefinition{
				Name:        mcpTool.Name,
				Description: mcpTool.Description,
				Parameters:  mcpTool.InputSchema,
			},
		}
		openaiTools = append(openaiTools, openaiTool)
	}

	return openaiTools, nil
}

// MCPToolSetConfig is the config shape for the MCP toolset (for JSON Schema reflection).
type MCPToolSetConfig struct {
	Endpoint string                 `json:"endpoint" jsonschema:"required,title=Endpoint,description=The endpoint of the MCP server"`
	Protocol string                 `json:"protocol" jsonschema:"required,title=Protocol,description=The protocol of the MCP server,enum=http,enum=websocket,default=http" jsonschema_extras:"x-ui-col-xs=12"`
	AuthType string                 `json:"auth_type" jsonschema:"required,title=Authentication Type,description=The authentication type,enum=none,enum=basic,enum=bearer,default=basic" jsonschema_extras:"x-ui-col-xs=12"`
	Username string                 `json:"username,omitempty" jsonschema:"title=Username,description=The username for the MCP server" jsonschema_extras:"x-ui-col-xs=12"`
	Password string                 `json:"password,omitempty" jsonschema:"title=Password,description=The password for the MCP server,format=password" jsonschema_extras:"x-ui-col-xs=12"`
	Token    string                 `json:"token,omitempty" jsonschema:"title=Bearer Token,description=The bearer token for the MCP server,format=password" jsonschema_extras:"x-ui-col-xs=24"`
	Args     map[string]interface{} `json:"args,omitempty" jsonschema:"title=Arguments" jsonschema_extras:"x-ui-field=objectEditor"`
}

var mcpConfigFields = []util.ConfigField{
	{
		Name:        "endpoint",
		DisplayName: "Endpoint",
		Description: "The endpoint of the MCP server",
		Type:        util.FieldTypeString,
		Required:    true,
	}, {
		Name:        "username",
		DisplayName: "Username",
		Description: "The username for the MCP server",
		Type:        util.FieldTypeString,
		Required:    false,
	}, {
		Name:        "password",
		DisplayName: "Password",
		Description: "The password for the MCP server",
		Type:        util.FieldTypePassword,
		Required:    false,
	}, {
		Name:        "token",
		DisplayName: "Bearer Token",
		Description: "The bearer token for the MCP server",
		Type:        util.FieldTypePassword,
		Required:    false,
	}, {
		Name:        "protocol",
		DisplayName: "Protocol",
		Description: "The protocol of the MCP server",
		Type:        util.FieldTypeString,
		Required:    true,
		Default:     "http",
		Options: []util.ConfigFieldOptions{
			{
				Label: "HTTP",
				Value: "http",
			},
			{
				Label: "SSE",
				Value: "sse",
			},
		},
	}, {
		Name:        "args",
		DisplayName: "Arguments",
		Description: "Optional MCP client options (headers/header, proxy)",
		Type:        "object",
		Required:    false,
		Default:     "{}",
	},
}

type MCPToolSetFactory struct{}

// GetDescription implements ToolSetFactory.
func (f *MCPToolSetFactory) GetDescription() string {
	return "Model Context Protocol"
}

// GetName implements ToolSetFactory.
func (f *MCPToolSetFactory) GetName() string {
	return "MCP"
}

func (f *MCPToolSetFactory) GetConfigFields() []util.ConfigField {
	return mcpConfigFields
}

// GetConfigSchema implements toolset.ToolSetFactoryV2.
func (f *MCPToolSetFactory) GetConfigSchema() (*jsonschema.Schema, map[string]any, error) {
	schema := jsonschema.Reflect(&MCPToolSetConfig{})
	if schema.Extras == nil {
		schema.Extras = make(map[string]any)
	}
	if def, ok := schema.Definitions["MCPToolSetConfig"]; ok {
		if argsDef, ok := def.Properties.Get("args"); ok && argsDef != nil {
			argsDef.Description = "Optional MCP client options. Supported keys: headers (or header) as an object of HTTP header name/value pairs; proxy as an http/https/socks5/socks5h URL."
			argsDef.Examples = []any{
				map[string]any{
					"title": "Custom headers",
					"value": map[string]any{
						"headers": map[string]string{
							"X-API-Key":   "your-api-key",
							"X-Tenant-ID": "tenant-1",
						},
					},
				},
				map[string]any{
					"title": "HTTP proxy",
					"value": map[string]any{
						"proxy": "http://127.0.0.1:7890",
					},
				},
				map[string]any{
					"title": "SOCKS5 proxy",
					"value": map[string]any{
						"proxy": "socks5://127.0.0.1:1080",
					},
				},
				map[string]any{
					"title": "Headers + proxy",
					"value": map[string]any{
						"headers": map[string]string{
							"X-Custom-Header": "value",
						},
						"proxy": "socks5://user:pass@127.0.0.1:1080",
					},
				},
			}
		}
		authTypeDef, _ := def.Properties.Get("auth_type")
		usernameDef, _ := def.Properties.Get("username")
		passwordDef, _ := def.Properties.Get("password")
		tokenDef, _ := def.Properties.Get("token")
		if authTypeDef != nil && usernameDef != nil && passwordDef != nil && tokenDef != nil {
			if def.Extras == nil {
				def.Extras = make(map[string]any)
			}
			def.Properties.Delete("username")
			def.Properties.Delete("password")
			def.Properties.Delete("token")

			def.Extras["dependencies"] = map[string]*jsonschema.Schema{
				"auth_type": &jsonschema.Schema{
					OneOf: []*jsonschema.Schema{
						&jsonschema.Schema{
							Properties: orderedmap.New[string, *jsonschema.Schema](
								orderedmap.WithInitialData(
									orderedmap.Pair[string, *jsonschema.Schema]{Key: "auth_type", Value: &jsonschema.Schema{
										Enum: []any{"none"},
									}},
								),
							),
							Required: []string{},
						},
						&jsonschema.Schema{
							Properties: orderedmap.New[string, *jsonschema.Schema](
								orderedmap.WithInitialData(
									orderedmap.Pair[string, *jsonschema.Schema]{Key: "auth_type", Value: &jsonschema.Schema{
										Enum: []any{"basic"},
									}},
									orderedmap.Pair[string, *jsonschema.Schema]{Key: "username", Value: usernameDef},
									orderedmap.Pair[string, *jsonschema.Schema]{Key: "password", Value: passwordDef},
								),
							),
							Required: []string{"username", "password"},
						},
						&jsonschema.Schema{
							Properties: orderedmap.New[string, *jsonschema.Schema](
								orderedmap.WithInitialData(
									orderedmap.Pair[string, *jsonschema.Schema]{Key: "auth_type", Value: &jsonschema.Schema{
										Enum: []any{"bearer"},
									}},
									orderedmap.Pair[string, *jsonschema.Schema]{Key: "token", Value: tokenDef},
								),
							),
							Required: []string{"token"},
						},
					},
				},
			}
		}
	}
	uiSchema := map[string]any{
		"ui:width": 1024,
		"ui:field": "LayoutGridField",

		"args": map[string]any{
			"ui:field": "objectEditor",
		},
		"ui:layoutGrid": map[string]any{
			"ui:row": map[string]any{
				"gutter":    []int{12, 0},
				"className": "row",
				"children": []map[string]map[string]any{{
					"ui:col": {
						"xs":       24,
						"children": []string{"endpoint"},
					},
				}, {
					"ui:col": {
						"xs":       12,
						"children": []string{"protocol"},
					},
				}, {
					"ui:col": {
						"xs":       12,
						"children": []string{"auth_type"},
					},
				}, {
					"ui:col": {
						"xs":       24,
						"children": []string{"token"},
					},
				}, {
					"ui:col": {
						"xs":       12,
						"children": []string{"username"},
					},
				}, {
					"ui:col": {
						"xs":       12,
						"children": []string{"password"},
					},
				}, {
					"ui:col": {
						"xs":       24,
						"children": []string{"args"},
					},
				}},
			},
		},
	}
	return schema, uiSchema, nil
}

// MCPToolSetFactory creates a new MCP toolset from configuration
func (f *MCPToolSetFactory) CreateToolSet(configJSON string) (toolset.ToolSet, error) {
	var config struct {
		Name        string                 `json:"name"`
		Description string                 `json:"description"`
		Endpoint    string                 `json:"endpoint"`
		Protocol    string                 `json:"protocol"`
		Username    string                 `json:"username"`
		Password    string                 `json:"password"`
		Token       string                 `json:"token"`
		Args        map[string]interface{} `json:"args"`
	}

	if err := json.Unmarshal([]byte(configJSON), &config); err != nil {
		return nil, fmt.Errorf("failed to unmarshal MCP config: %w", err)
	}

	return NewMCPToolSet(config.Name, config.Description, config.Endpoint, config.Protocol, config.Username, config.Password, config.Token, config.Args), nil
}

const (
	ToolSetTypeMCP toolset.ToolSetType = "mcp"
)

func init() {
	// Register the MCP toolset factory
	toolset.RegisterToolSetV2(ToolSetTypeMCP, &MCPToolSetFactory{})
}
