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
	"fmt"
	"os"

	"github.com/gofrs/uuid"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/safe"
)

// OpenAIClient wraps the OpenAI client with model configuration
type OpenAIClient struct {
	client  *openai.Client
	modelID string
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

	return &OpenAIClient{
		client:  client,
		modelID: modelID,
	}, nil
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

// ChatStream implements AIClient interface
func (c *OpenAIClient) ChatStream(ctx context.Context, messages []ChatMessage, toolSets toolset.ToolSets) (ChatStream, error) {
	// Convert ChatMessage to openai.ChatCompletionMessage
	openaiMessages := make([]openai.ChatCompletionMessage, 0, len(messages))
	for _, msg := range messages {
		openaiMessages = append(openaiMessages, ChatMessageToOpenAI(msg))
	}

	return NewOpenAIChatStream(ctx, c, openaiMessages, toolSets)
}

// Chat implements AIClient interface
func (c *OpenAIClient) Chat(ctx context.Context, messages []ChatMessage, toolSets toolset.ToolSets) (*ChatMessage, error) {
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
		return nil, fmt.Errorf("failed to create chat completion: %w", err)
	}

	// Check response
	if len(response.Choices) == 0 {
		return nil, fmt.Errorf("no choices in response")
	}
	resultMessage := ChatMessageFromOpenAI(response.Choices[0].Message)
	return &resultMessage, nil

}

type OpenAIChatStream struct {
	client    *OpenAIClient
	messages  []openai.ChatCompletionMessage
	toolSets  toolset.ToolSets
	stream    *openai.ChatCompletionStream
	messageID string
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
		if len(resp.Choices) == 0 {
			return nil, fmt.Errorf("no choices in response")
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
	}
	// Call OpenAI API
	stream.stream, err = client.client.CreateChatCompletionStream(ctx, request)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion stream: %w", err)
	}
	return stream, nil
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
	}
}

// CreateClient creates an OpenAI client from configuration
func (f *OpenAIClientFactory) CreateClient(ctx context.Context, organizationID string, config map[string]interface{}) (AIClient, error) {
	return newOpenAIClientFromConfig(config)
}

func init() {
	// Register the OpenAI client factory
	RegisterFactory(model.AIModelProviderOpenAI, &OpenAIClientFactory{})
}
