package ai

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

// MCPToolSet implements the ToolSet interface for MCP protocol
type MCPToolSet struct {
	name        string
	description string
	endpoint    string
	protocol    string
	config      map[string]interface{}
	httpClient  *http.Client
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
func NewMCPToolSet(name, description, endpoint, protocol string, config map[string]interface{}) *MCPToolSet {
	return &MCPToolSet{
		name:        name,
		description: description,
		endpoint:    endpoint,
		protocol:    protocol,
		config:      config,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
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
	if m.protocol != "http" && m.protocol != "websocket" {
		return fmt.Errorf("unsupported protocol: %s", m.protocol)
	}
	return nil
}

// Test tests the connection to the MCP server
func (m *MCPToolSet) Test(ctx context.Context) error {
	if m.protocol == "websocket" {
		// TODO: Implement WebSocket connection test
		return fmt.Errorf("websocket protocol test not implemented yet")
	}

	// Test HTTP connection by listing tools
	_, err := m.ListTools(ctx)
	return err
}

// Call calls a tool function
func (m *MCPToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	if m.protocol == "websocket" {
		// TODO: Implement WebSocket tool call
		return "", fmt.Errorf("websocket protocol not implemented yet")
	}
	var params map[string]interface{}
	if err := json.Unmarshal([]byte(parameters), &params); err != nil {
		return "", fmt.Errorf("failed to unmarshal parameters: %w", err)
	}

	// HTTP tool call
	request := MakeMCPRequest("tools/call", map[string]interface{}{
		"name":      name,
		"arguments": params,
	})

	response, err := m.makeHTTPRequest(ctx, request)
	if err != nil {
		return "", err
	}

	if response.Error != nil {
		return "", fmt.Errorf("MCP error %d: %s", response.Error.Code, response.Error.Message)
	}

	// Convert result to string
	if response.Result == nil {
		return "", nil
	}

	resultBytes, err := json.Marshal(response.Result)
	if err != nil {
		return "", fmt.Errorf("failed to marshal result: %w", err)
	}

	return string(resultBytes), nil
}

// ListTools lists available tools from the MCP server
func (m *MCPToolSet) ListTools(ctx context.Context) ([]openai.Tool, error) {
	if m.protocol == "websocket" {
		// TODO: Implement WebSocket tool listing
		return nil, fmt.Errorf("websocket protocol not implemented yet")
	}

	// HTTP tool listing
	request := MakeMCPRequest("tools/list", nil)

	response, err := m.makeHTTPRequest(ctx, request)
	if err != nil {
		return nil, err
	}

	if response.Error != nil {
		return nil, fmt.Errorf("MCP error %d: %s", response.Error.Code, response.Error.Message)
	}

	// Parse the response
	resultBytes, err := json.Marshal(response.Result)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal result: %w", err)
	}

	var listResponse MCPListToolsResponse
	if err := json.Unmarshal(resultBytes, &listResponse); err != nil {
		return nil, fmt.Errorf("failed to unmarshal tools response: %w", err)
	}

	// Convert MCP tools to OpenAI tools
	var openaiTools []openai.Tool
	for _, mcpTool := range listResponse.Tools {
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

// makeHTTPRequest makes an HTTP request to the MCP server
func (m *MCPToolSet) makeHTTPRequest(ctx context.Context, request MCPRequest) (*MCPResponse, error) {
	requestBytes, err := json.Marshal(request)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	req, err := http.NewRequest("POST", m.endpoint, bytes.NewBuffer(requestBytes))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")

	// Add authentication headers if configured
	if auth, ok := m.config["auth"].(map[string]interface{}); ok {
		if token, ok := auth["token"].(string); ok {
			req.Header.Set("Authorization", "Bearer "+token)
		}
		if apiKey, ok := auth["api_key"].(string); ok {
			req.Header.Set("X-API-Key", apiKey)
		}
	}

	resp, err := m.httpClient.Do(req.WithContext(ctx))
	if err != nil {
		return nil, fmt.Errorf("failed to make request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("HTTP error: %d %s", resp.StatusCode, resp.Status)
	}

	var response MCPResponse
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &response, nil
}

var mcpConfigFields = []toolset.ConfigField{
	{
		Name:        "endpoint",
		Description: "The endpoint of the MCP server",
		Type:        "string",
		Required:    true,
	}, {
		Name:        "protocol",
		Description: "The protocol of the MCP server",
		Type:        "string",
		Required:    true,
		Default:     "http",
		Options: []toolset.ConfigFieldOptions{
			{
				Label: "HTTP",
				Value: "http",
			},
			{
				Label: "WebSocket",
				Value: "websocket",
			},
		},
	}, {
		Name:        "args",
		Description: "The arguments for the MCP server",
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

func (f *MCPToolSetFactory) GetConfigFields() []toolset.ConfigField {
	return mcpConfigFields
}

// MCPToolSetFactory creates a new MCP toolset from configuration
func (f *MCPToolSetFactory) CreateToolSet(configJSON string) (toolset.ToolSet, error) {
	var config struct {
		Name        string                 `json:"name"`
		Description string                 `json:"description"`
		Endpoint    string                 `json:"endpoint"`
		Protocol    string                 `json:"protocol"`
		Config      map[string]interface{} `json:"config"`
	}

	if err := json.Unmarshal([]byte(configJSON), &config); err != nil {
		return nil, fmt.Errorf("failed to unmarshal MCP config: %w", err)
	}

	return NewMCPToolSet(config.Name, config.Description, config.Endpoint, config.Protocol, config.Config), nil
}

func init() {
	// Register the MCP toolset factory
	toolset.RegisterToolSet("mcp", &MCPToolSetFactory{})
}
