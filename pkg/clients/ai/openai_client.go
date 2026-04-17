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
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/gofrs/uuid"
	"github.com/invopop/jsonschema"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/safe"
)

// OpenAIClient wraps the OpenAI client with model configuration
type OpenAIClient struct {
	client       *openai.Client
	modelID      string
	systemPrompt string
}

// newOpenAIClientFromConfig creates a new OpenAI client from configuration map
func newOpenAIClientFromConfig(config map[string]interface{}) (*OpenAIClient, error) {
	// Extract API key
	apiKeyVal, ok := config["api_key"].(string)
	if !ok || apiKeyVal == "" {
		return nil, fmt.Errorf("api_key is required")
	}
	apiKey := safe.NewEncryptedString(apiKeyVal, os.Getenv(safe.SecretEnvName))
	decKey, err := apiKey.UnsafeString()
	if err != nil {
		return nil, fmt.Errorf("failed to get API key: %w", err)
	}

	// Extract model ID
	modelID, ok := config["model_id"].(string)
	if !ok || modelID == "" {
		return nil, fmt.Errorf("model_id is required")
	}

	openaiConfig := openai.DefaultConfig(decKey)

	// Set custom base URL if provided
	if baseURL, ok := config["base_url"].(string); ok && baseURL != "" {
		openaiConfig.BaseURL = baseURL
	}

	// Set organization ID if provided
	if orgID, ok := config["organization_id"].(string); ok && orgID != "" {
		openaiConfig.OrgID = orgID
	}

	client := openai.NewClientWithConfig(openaiConfig)

	var systemPrompt string
	if sp, ok := config["system_prompt"].(string); ok {
		systemPrompt = sp
	}

	return &OpenAIClient{
		client:       client,
		modelID:      modelID,
		systemPrompt: systemPrompt,
	}, nil
}

// mapOpenAIRequestError maps OpenAI API errors from CreateChatCompletion / stream open so callers
// can treat context and token limit failures as ChatErrorTypeMaxTokensExceeded (and 429 as rate limit).
func mapOpenAIRequestError(err error) error {
	var openaiErr *openai.APIError
	if !errors.As(err, &openaiErr) {
		return err
	}
	if openaiErr.HTTPStatusCode == 429 {
		return NewChatError(err, ChatErrorTypeRateLimitExceeded, openaiErr.Message)
	}
	msg := strings.ToLower(openaiErr.Message)
	if strings.Contains(msg, "maximum context length") ||
		strings.Contains(msg, "context_length_exceeded") ||
		strings.Contains(msg, "reduce the length of the messages") ||
		strings.Contains(msg, "prompt is too long") ||
		strings.Contains(msg, "this model's maximum context") ||
		(strings.Contains(msg, "token") && strings.Contains(msg, "context")) {
		return NewChatError(err, ChatErrorTypeMaxTokensExceeded, openaiErr.Message)
	}
	return err
}

// NewOpenAIClient creates a new OpenAI client from model configuration (backward compatibility)
func NewOpenAIClient(aiModel *model.AIModel) (*OpenAIClient, error) {
	if aiModel.Provider != model.AIModelProviderOpenAI {
		return nil, fmt.Errorf("unsupported provider: %s", aiModel.Provider)
	}

	// Build config map from AIModel.Config
	config := make(map[string]interface{})
	if aiModel.Config != nil {
		for k, v := range aiModel.Config {
			config[k] = v
		}
	}

	return newOpenAIClientFromConfig(config)
}

// CreateChatCompletion creates a chat completion (backward compatibility)
func (c *OpenAIClient) CreateChatCompletion(ctx context.Context, request openai.ChatCompletionRequest) (openai.ChatCompletionResponse, error) {
	// Set the model ID from our configuration
	request.Model = c.modelID

	return c.client.CreateChatCompletion(ctx, request)
}

// CreateChatCompletionStream creates a streaming chat completion (backward compatibility)
func (c *OpenAIClient) CreateChatCompletionStream(ctx context.Context, request openai.ChatCompletionRequest) (*openai.ChatCompletionStream, error) {
	// Set the model ID from our configuration
	request.Model = c.modelID

	return c.client.CreateChatCompletionStream(ctx, request)
}

// prependModelSystemPrompt prepends the model-level system prompt (if configured)
// to the message list.
func (c *OpenAIClient) prependModelSystemPrompt(messages []ChatMessage) []ChatMessage {
	if c.systemPrompt == "" {
		return messages
	}
	return append([]ChatMessage{{
		Role:    model.AIChatMessageRoleSystem,
		Content: c.systemPrompt,
	}}, messages...)
}

// ChatStream implements AIClient interface
func (c *OpenAIClient) ChatStream(ctx context.Context, messages []ChatMessage, toolSets toolset.ToolSets) (ChatStream, error) {
	messages = c.prependModelSystemPrompt(messages)

	// Convert ChatMessage to openai.ChatCompletionMessage
	openaiMessages := make([]openai.ChatCompletionMessage, 0, len(messages))
	for _, msg := range messages {
		openaiMessages = append(openaiMessages, ChatMessageToOpenAI(msg))
	}

	return NewOpenAIChatStream(ctx, c, openaiMessages, toolSets)
}

// Chat implements AIClient interface
func (c *OpenAIClient) Chat(ctx context.Context, messages []ChatMessage, toolSets toolset.ToolSets) (*ChatMessage, error) {

	messages = c.prependModelSystemPrompt(messages)
	estPrompt := EstimateTokens(messages)
	if estPrompt > 128*1024 {
		return nil, NewChatError(fmt.Errorf("prompt is too long %d tokens, max is 128*1024", estPrompt), ChatErrorTypeMaxTokensExceeded, fmt.Sprintf("prompt is too long: %d tokens", estPrompt))
	}
	// Convert ChatMessage to openai.ChatCompletionMessage
	openaiMessages := make([]openai.ChatCompletionMessage, 0, len(messages))
	for _, msg := range messages {
		openaiMessages = append(openaiMessages, ChatMessageToOpenAI(msg))
	}

	openaiTools, err := toolSets.GetTools(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get tools: %w", err)
	}

	// Create chat completion request
	request := openai.ChatCompletionRequest{
		Model:    c.modelID,
		Messages: openaiMessages,
		Tools:    openaiTools,
	}

	// Call OpenAI API
	response, err := c.client.CreateChatCompletion(ctx, request)
	if err != nil {
		mapped := mapOpenAIRequestError(err)
		if mapped != err {
			return nil, mapped
		}
		return nil, fmt.Errorf("failed to create chat completion: %w", err)
	}

	// Check response
	if len(response.Choices) == 0 {
		return nil, fmt.Errorf("no choices in response")
	}
	resultMessage := ChatMessageFromOpenAI(response.Choices[0].Message)
	if response.Usage.PromptTokens > 0 || response.Usage.CompletionTokens > 0 {
		resultMessage.Usage = &TokenUsage{
			PromptTokens:     response.Usage.PromptTokens,
			CompletionTokens: response.Usage.CompletionTokens,
		}
	}

	return &resultMessage, nil

}

type OpenAIChatStream struct {
	client    *OpenAIClient
	messages  []openai.ChatCompletionMessage
	toolSets  toolset.ToolSets
	stream    *openai.ChatCompletionStream
	messageID string
	usage     *TokenUsage
}

// Close implements ChatStream.
func (o *OpenAIChatStream) Close() error {
	if o.stream != nil {
		return o.stream.Close()
	}
	return nil
}

// Recv implements ChatStream.
func (o *OpenAIChatStream) Recv(ctx context.Context) (*ChatStreamEvent, error) {
	for {
		resp, err := o.stream.Recv()
		if err != nil {
			return nil, err
		}

		if resp.Usage != nil {
			o.usage = &TokenUsage{
				PromptTokens:     resp.Usage.PromptTokens,
				CompletionTokens: resp.Usage.CompletionTokens,
			}
		}

		if len(resp.Choices) == 0 {
			// Usage-only chunk (IncludeUsage enabled); skip and wait for next/EOF
			continue
		}
		choice := resp.Choices[0]
		var toolCalls []ToolCall
		for _, toolCall := range choice.Delta.ToolCalls {
			toolCalls = append(toolCalls, ToolCall{
				Index: toolCall.Index,
				ID:    toolCall.ID,
				Type:  openai.ToolType(toolCall.Type),
				Function: FunctionCall{
					Name:      toolCall.Function.Name,
					Arguments: toolCall.Function.Arguments,
				},
			})
		}
		if resp.Usage != nil {
			return &ChatStreamEvent{
				MessageID: o.messageID,
				Content:   choice.Delta.Content,
				Role:      model.AIChatMessageRole(choice.Delta.Role),
				EventType: EventTypeContent,
				ToolCalls: toolCalls,
				Usage: &TokenUsage{
					PromptTokens:     resp.Usage.PromptTokens,
					CompletionTokens: resp.Usage.CompletionTokens,
				},
			}, nil
		}
		if choice.Delta.Content != "" || len(toolCalls) > 0 {
			return &ChatStreamEvent{
				MessageID: o.messageID,
				Content:   choice.Delta.Content,
				Role:      model.AIChatMessageRole(choice.Delta.Role),
				EventType: EventTypeContent,
				ToolCalls: toolCalls,
			}, nil
		}
	}
}

// TokenUsage returns the token usage reported by the API for this stream,
// or nil if the API did not provide usage information.
func (o *OpenAIChatStream) TokenUsage() *TokenUsage {
	return o.usage
}

func NewOpenAIChatStream(ctx context.Context, client *OpenAIClient, messages []openai.ChatCompletionMessage, toolSets toolset.ToolSets) (ChatStream, error) {
	var err error
	// Get tools from toolSets if provided
	var tools []openai.Tool
	if toolSets != nil {
		tools, err = toolSets.GetTools(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tools: %w", err)
		}
	}

	stream := &OpenAIChatStream{
		client:    client,
		messages:  messages,
		toolSets:  toolSets,
		messageID: uuid.Must(uuid.NewV4()).String(),
	}
	// Create chat completion request
	request := openai.ChatCompletionRequest{
		Model:    client.modelID,
		Messages: messages,
		Tools:    tools,
		Stream:   true,
		StreamOptions: &openai.StreamOptions{
			IncludeUsage: true,
		},
	}
	// Call OpenAI API
	stream.stream, err = client.client.CreateChatCompletionStream(ctx, request)
	if err != nil {
		mapped := mapOpenAIRequestError(err)
		if mapped != err {
			return nil, mapped
		}
		return nil, err
	}
	return stream, nil
}

// OpenAIConfig is the config shape for the OpenAI provider (for JSON Schema reflection).
type OpenAIConfig struct {
	APIKey         string `json:"api_key" jsonschema:"description=OpenAI API key (encrypted),format=password"`
	ModelID        string `json:"model_id" jsonschema:"description=OpenAI model ID (e.g.\\, gpt-4\\, gpt-3.5-turbo)"`
	BaseURL        string `json:"base_url,omitempty" jsonschema:"description=Custom API endpoint URL (optional)"`
	OrganizationID string `json:"organization_id,omitempty" jsonschema:"description=OpenAI organization ID (optional)"`
	SystemPrompt   string `json:"system_prompt,omitempty" jsonschema:"description=System prompt prepended to every conversation (optional)" jsonschema_extras:"x-ui-widget=textarea"`
}

// OpenAIClientFactory implements AIClientFactory for OpenAI
type OpenAIClientFactory struct{}

// GetName returns the name of the OpenAI provider
func (f *OpenAIClientFactory) GetName() string {
	return "OpenAI"
}

// GetDescription returns the description of the OpenAI provider
func (f *OpenAIClientFactory) GetDescription() string {
	return "OpenAI API client for GPT models"
}

// GetConfigSchema implements AIClientFactoryV2.
func (f *OpenAIClientFactory) GetConfigSchema() (*jsonschema.Schema, map[string]any, error) {
	schema := jsonschema.Reflect(&OpenAIConfig{})
	uiSchema := map[string]any{
		"ui:width": 800,
		"ui:field": "LayoutGridField",
		"ui:layoutGrid": map[string]any{
			"ui:row": map[string]any{
				"gutter":    []int{12, 0},
				"className": "row",
				"children": []map[string]map[string]any{{
					"ui:col": {
						"xs":       16,
						"children": []string{"api_key"},
					},
				}, {
					"ui:col": {
						"xs":       8,
						"children": []string{"model_id"},
					},
				}, {
					"ui:col": {
						"xs":       12,
						"children": []string{"base_url"},
					},
				}, {
					"ui:col": {
						"xs":       12,
						"children": []string{"organization_id"},
					},
				}, {
					"ui:col": {
						"xs":       24,
						"children": []string{"system_prompt"},
					},
				}},
			},
		},
	}
	return schema, uiSchema, nil
}

var _ AIClientFactoryV2 = (*OpenAIClientFactory)(nil)

// GetConfigFields returns the configuration fields for OpenAI
func (f *OpenAIClientFactory) GetConfigFields() []util.ConfigField {
	return []util.ConfigField{
		{
			Name:        "api_key",
			DisplayName: "API Key",
			Description: "OpenAI API key (encrypted)",
			Type:        util.FieldTypePassword,
			Required:    true,
		},
		{
			Name:        "model_id",
			DisplayName: "Model ID",
			Description: "OpenAI model ID (e.g., gpt-4, gpt-3.5-turbo)",
			Type:        util.FieldTypeString,
			Required:    true,
			Placeholder: "gpt-4, gpt-3.5-turbo, etc.",
		},
		{
			Name:        "base_url",
			DisplayName: "Base URL",
			Description: "Custom API endpoint URL (optional)",
			Type:        util.FieldTypeString,
			Required:    false,
			Placeholder: "https://api.openai.com/v1",
		},
		{
			Name:        "organization_id",
			DisplayName: "Organization ID",
			Description: "OpenAI organization ID (optional)",
			Type:        util.FieldTypeString,
			Required:    false,
		},
		{
			Name:        "system_prompt",
			DisplayName: "System Prompt",
			Description: "System prompt prepended to every conversation (optional)",
			Type:        util.FieldTypeString,
			Required:    false,
		},
	}
}

// CreateClient creates an OpenAI client from configuration
func (f *OpenAIClientFactory) CreateClient(ctx context.Context, organizationID string, config map[string]interface{}) (AIClient, error) {
	return newOpenAIClientFromConfig(config)
}

func init() {
	// Register the OpenAI client factory
	RegisterFactoryV2(model.AIModelProviderOpenAI, &OpenAIClientFactory{})
}
