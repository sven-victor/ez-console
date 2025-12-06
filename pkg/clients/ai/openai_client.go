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
	"bytes"
	"context"
	"fmt"
	"io"
	"os"
	"sync"
	"time"

	"github.com/go-kit/log/level"
	"github.com/gofrs/uuid"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
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

// CreateChatStream implements AIClient interface
func (c *OpenAIClient) CreateChatStream(ctx context.Context, messages []ChatMessage, options ...WithChatCompletionOptions) (ChatStream, error) {
	// Convert ChatMessage to openai.ChatCompletionMessage
	openaiMessages := make([]openai.ChatCompletionMessage, 0, len(messages))
	for _, msg := range messages {
		openaiMessages = append(openaiMessages, ChatMessageToOpenAI(msg))
	}

	return NewChatStream(ctx, c, openaiMessages, options...)
}

// CreateChat implements AIClient interface
func (c *OpenAIClient) CreateChat(ctx context.Context, messages []ChatMessage, options ...WithChatCompletionOptions) ([]ChatMessage, error) {
	logger := log.GetContextLogger(ctx)

	// Apply options (default maxIterations is 10)
	opts := ChatCompletionOptions{
		MaxIterations: 10,
	}
	for _, option := range options {
		option(&opts)
	}

	// Convert ChatMessage to openai.ChatCompletionMessage
	openaiMessages := make([]openai.ChatCompletionMessage, 0, len(messages))
	for _, msg := range messages {
		openaiMessages = append(openaiMessages, ChatMessageToOpenAI(msg))
	}

	// Convert toolsets to openai.Tool format
	var openaiTools []openai.Tool
	var toolSets toolset.ToolSets
	if opts.ToolSetsFactory != nil {
		var err error
		toolSets, err = opts.ToolSetsFactory(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tool sets: %w", err)
		}
		openaiTools, err = toolSets.GetTools(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tools: %w", err)
		}
	}

	// Collect all assistant messages for the final result
	var resultMessages []ChatMessage
	reachedMaxIterations := false

	// Main loop for handling tool calls
	for iteration := 0; iteration < opts.MaxIterations; iteration++ {
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

		choice := response.Choices[0]
		assistantMessage := choice.Message

		// Check if there are tool calls
		if len(assistantMessage.ToolCalls) == 0 {
			// No tool calls, add the final message and break
			resultMessages = append(resultMessages, ChatMessageFromOpenAI(assistantMessage))
			break
		}

		// Add assistant message with tool calls to messages and results
		openaiMessages = append(openaiMessages, assistantMessage)
		resultMessages = append(resultMessages, ChatMessageFromOpenAI(assistantMessage))

		// Execute tool calls serially
		if len(toolSets) == 0 {
			return nil, fmt.Errorf("tool calls are required but no toolSets provided")
		}

		for _, toolCall := range assistantMessage.ToolCalls {
			// Call the tool
			toolResult, err := toolSets.CallTool(ctx, toolCall.Function.Name, toolCall.Function.Arguments)
			if err != nil {
				level.Error(logger).Log("msg", "Failed to call tool", "error", err, "tool", toolCall.Function.Name)
				// Use error message as tool result
				toolResult = err.Error()
			}

			// Add tool result to messages
			toolResultMessage := openai.ChatCompletionMessage{
				Role:       string(model.AIChatMessageRoleTool),
				Content:    toolResult,
				ToolCallID: toolCall.ID,
			}
			openaiMessages = append(openaiMessages, toolResultMessage)
			resultMessages = append(resultMessages, ChatMessageFromOpenAI(toolResultMessage))
		}

		// Check if we reached the last iteration
		if iteration == opts.MaxIterations-1 {
			reachedMaxIterations = true
		}

		// Continue to next iteration
	}

	// Check if we need to make a final prompt call
	if opts.FinalPrompt != "" {
		// Append the final prompt as a user message
		finalPromptMessage := openai.ChatCompletionMessage{
			Role:    string(model.AIChatMessageRoleUser),
			Content: opts.FinalPrompt,
		}
		openaiMessages = append(openaiMessages, finalPromptMessage)
		resultMessages = append(resultMessages, ChatMessageFromOpenAI(finalPromptMessage))

		// Make one more API call without tools
		request := openai.ChatCompletionRequest{
			Model:    c.modelID,
			Messages: openaiMessages,
			Tools:    nil, // No tools for the final prompt
		}

		response, err := c.client.CreateChatCompletion(ctx, request)
		if err != nil {
			return nil, fmt.Errorf("failed to create final prompt completion: %w", err)
		}

		// Check response
		if len(response.Choices) == 0 {
			return nil, fmt.Errorf("no choices in final prompt response")
		}

		choice := response.Choices[0]
		finalAssistantMessage := choice.Message
		resultMessages = append(resultMessages, ChatMessageFromOpenAI(finalAssistantMessage))
	}

	// If we reached max iterations without completion and no final prompt, return error
	if reachedMaxIterations && opts.FinalPrompt == "" {
		return nil, fmt.Errorf("reached maximum iterations (%d) without completion", opts.MaxIterations)
	}

	return resultMessages, nil
}

type OpenAIChatStream struct {
	client                  *OpenAIClient
	messages                []openai.ChatCompletionMessage
	toolSets                toolset.ToolSets
	tools                   []openai.Tool
	toolCalls               []ToolCall
	toolCallMutex           sync.Mutex
	toolCallRunning         bool
	currentChatStream       *openai.ChatCompletionStream
	messageID               string
	messageBuffer           bytes.Buffer
	summaryPrompt           string
	onMessageEnd            func(ctx context.Context, messageID string, content string)
	onToolCallEnd           func(ctx context.Context, toolCall ToolCall)
	onToolCallsStart        func(ctx context.Context, toolCall []ToolCall)
	maxIterations           int
	currentIteration        int
	maxTokens               int
	enableAutoSummarization bool
}

func (o *OpenAIChatStream) callToolsRunning() bool {
	for _, toolCall := range o.toolCalls {
		if toolCall.Status == ToolCallStatusRunning {
			return true
		}
	}
	return false
}

func (o *OpenAIChatStream) mergeToolCall(toolCall openai.ToolCall) {
	for idx := range o.toolCalls {
		if o.toolCalls[idx].Index != nil && toolCall.Index != nil && *o.toolCalls[idx].Index == *toolCall.Index {
			// Update tool call
			if toolCall.ID != "" {
				o.toolCalls[idx].ID = toolCall.ID
			}
			if toolCall.Type != "" {
				o.toolCalls[idx].Type = toolCall.Type
			}
			if toolCall.Function.Name != "" {
				o.toolCalls[idx].Function.Name = toolCall.Function.Name
			}
			if toolCall.Function.Arguments != "" {
				o.toolCalls[idx].Function.Arguments += toolCall.Function.Arguments
			}
			return
		}
	}
	o.toolCalls = append(o.toolCalls, ToolCall{
		Index:  toolCall.Index,
		ID:     toolCall.ID,
		Status: ToolCallStatusPending,
		Type:   openai.ToolType(toolCall.Type),
		Function: FunctionCall{
			Name:      toolCall.Function.Name,
			Arguments: toolCall.Function.Arguments,
		},
	})
}

// Close implements ChatStream.
func (o *OpenAIChatStream) Close() error {
	if o.currentChatStream != nil {
		return o.currentChatStream.Close()
	}
	return nil
}

// calculateTokens estimates the token count for messages
// Uses a simple approximation: 1 token ≈ 4 characters
func (o *OpenAIChatStream) calculateTokens(messages []openai.ChatCompletionMessage) int {
	totalChars := 0
	for _, msg := range messages {
		// Count content
		totalChars += len(msg.Content)
		// Count role
		totalChars += len(msg.Role)
		// Count tool calls
		for _, tc := range msg.ToolCalls {
			totalChars += len(tc.ID)
			totalChars += len(string(tc.Type))
			totalChars += len(tc.Function.Name)
			totalChars += len(tc.Function.Arguments)
		}
		// Count tool call ID
		totalChars += len(msg.ToolCallID)
	}
	// Approximate: 1 token ≈ 4 characters
	return (totalChars + 3) / 4
}

// summarizeMessages creates a summary of old messages while preserving the first system message
func (o *OpenAIChatStream) summarizeMessages(ctx context.Context) error {
	logger := log.GetContextLogger(ctx)

	if len(o.messages) <= 1 {
		return nil // Nothing to summarize
	}

	// Find the first system message
	var systemMessage *openai.ChatCompletionMessage
	var messagesToSummarize []openai.ChatCompletionMessage
	firstSystemFound := false

	for i, msg := range o.messages {
		if !firstSystemFound && msg.Role == string(model.AIChatMessageRoleSystem) {
			systemMessage = &o.messages[i]
			firstSystemFound = true
		} else {
			messagesToSummarize = append(messagesToSummarize, msg)
		}
	}

	if len(messagesToSummarize) == 0 {
		return nil // Nothing to summarize
	}

	// Create summary prompt
	summaryPrompt := "Please summarize the following conversation history, preserving important information and context. The summary should be concise but comprehensive."

	// Build summary request messages
	summaryMessages := []openai.ChatCompletionMessage{
		{
			Role:    string(model.AIChatMessageRoleSystem),
			Content: summaryPrompt,
		},
	}

	// Add messages to summarize
	summaryMessages = append(summaryMessages, messagesToSummarize...)

	// Call non-streaming API for summarization
	request := openai.ChatCompletionRequest{
		Model:    o.client.modelID,
		Messages: summaryMessages,
		Stream:   false,
	}

	level.Debug(logger).Log("msg", "Summarizing messages", "count", len(messagesToSummarize))
	response, err := o.client.client.CreateChatCompletion(ctx, request)
	if err != nil {
		return fmt.Errorf("failed to create summary: %w", err)
	}

	if len(response.Choices) == 0 {
		return fmt.Errorf("no choices in summary response")
	}

	summaryContent := response.Choices[0].Message.Content

	// Rebuild messages: system message (if exists) + summary
	o.messages = make([]openai.ChatCompletionMessage, 0, 2)
	if systemMessage != nil {
		o.messages = append(o.messages, *systemMessage)
	}
	o.messages = append(o.messages, openai.ChatCompletionMessage{
		Role:    string(model.AIChatMessageRoleUser),
		Content: fmt.Sprintf("[Previous conversation summary]: %s", summaryContent),
	})

	level.Debug(logger).Log("msg", "Messages summarized", "original_count", len(messagesToSummarize)+1, "new_count", len(o.messages))
	return nil
}

func (o *OpenAIChatStream) backgroundCallTool(ctx context.Context, toolCall *ToolCall) {
	logger := log.GetContextLogger(ctx)
	go func() {
		toolStatus := toolCall.Status
		defer func() {
			if r := recover(); r != nil {
				toolCall.Result = fmt.Sprintf("panic: %v", r)
				toolCall.Status = ToolCallStatusFailed
			}

			if toolCall.Result == "" {
				switch toolStatus {
				case ToolCallStatusRunning, ToolCallStatusPending:
					toolCall.Result = "tool call timed out"
					toolStatus = ToolCallStatusFailed
				case ToolCallStatusFailed:
					toolCall.Result = "tool call failed"
				case ToolCallStatusCompleted:
					toolCall.Result = "tool call completed"
				}
			}

			o.messages = append(o.messages, openai.ChatCompletionMessage{
				Role:       string(model.AIChatMessageRoleTool),
				Content:    toolCall.Result,
				ToolCallID: toolCall.ID,
			})
			toolCall.Status = toolStatus
			if o.onToolCallEnd != nil {
				o.onToolCallEnd(ctx, *toolCall)
			}
		}()

		// Check if context is already cancelled before starting
		select {
		case <-ctx.Done():
			toolStatus = ToolCallStatusFailed
			toolCall.Result = fmt.Sprintf("context cancelled: %v", ctx.Err())
			return
		default:
		}

		resp, err := o.toolSets.CallTool(ctx, toolCall.Function.Name, toolCall.Function.Arguments)

		// Check if context was cancelled during tool execution
		if ctx.Err() != nil {
			toolStatus = ToolCallStatusFailed
			toolCall.Result = fmt.Sprintf("context cancelled: %v", ctx.Err())
			return
		}

		if err != nil {
			level.Error(logger).Log("msg", "Failed to call tool", "error", err)
			toolStatus = ToolCallStatusFailed
			toolCall.Result = err.Error()
		} else {
			toolStatus = ToolCallStatusCompleted
			toolCall.Result = resp
		}
	}()
}
func (o *OpenAIChatStream) CallTools(ctx context.Context) (isRunning bool) {
	if !o.toolCallMutex.TryLock() {
		return true
	}
	defer o.toolCallMutex.Unlock()
	if o.toolCallRunning {
		for {
			select {
			case <-ctx.Done():
				return false
			case <-time.After(100 * time.Millisecond):
				if !o.callToolsRunning() {
					o.toolCallRunning = false
					return false
				}
			}
		}
	}
	o.toolCallRunning = true
	if o.onToolCallsStart != nil {
		o.onToolCallsStart(ctx, o.toolCalls)
	}
	for idx := range o.toolCalls {
		if o.toolCalls[idx].Status == ToolCallStatusPending {
			o.toolCalls[idx].Status = ToolCallStatusRunning
			o.backgroundCallTool(ctx, &o.toolCalls[idx])
		}
	}
	return o.callToolsRunning()
}

// Recv implements ChatStream.
func (o *OpenAIChatStream) Recv(ctx context.Context) (*ChatStreamEvent, error) {
	if o.currentChatStream != nil {
		for {
			resp, err := o.currentChatStream.Recv()
			if err != nil {
				if err == io.EOF {
					o.currentChatStream.Close()
					o.currentChatStream = nil
					o.messageID = uuid.Must(uuid.NewV4()).String()
					if o.messageBuffer.Len() > 0 {
						o.messages = append(o.messages, openai.ChatCompletionMessage{
							Role:    string(model.AIChatMessageRoleAssistant),
							Content: o.messageBuffer.String(),
						})
						if o.onMessageEnd != nil {
							o.onMessageEnd(ctx, o.messageID, o.messageBuffer.String())
						}
						o.messageBuffer.Reset()
					}

					if len(o.toolCalls) > 0 {
						var toolCalls []openai.ToolCall
						for _, toolCall := range o.toolCalls {
							toolCalls = append(toolCalls, openai.ToolCall{
								Index: toolCall.Index,
								ID:    toolCall.ID,
								Type:  openai.ToolType(toolCall.Type),
								Function: openai.FunctionCall{
									Name:      toolCall.Function.Name,
									Arguments: toolCall.Function.Arguments,
								},
							})
						}
						o.messages = append(o.messages, openai.ChatCompletionMessage{
							Role:      string(model.AIChatMessageRoleAssistant),
							ToolCalls: toolCalls,
						})
						return &ChatStreamEvent{
							MessageID: o.messageID,
							ToolCalls: o.toolCalls,
							EventType: EventTypeToolCall,
						}, nil
					}

					if o.summaryPrompt != "" {
						o.messages = append(o.messages, openai.ChatCompletionMessage{
							Role:    string(model.AIChatMessageRoleSystem),
							Content: o.summaryPrompt,
						})
						o.summaryPrompt = ""
						return o.Recv(ctx)
					}
				}
				return nil, err
			}
			choice := resp.Choices[0]
			if len(choice.Delta.ToolCalls) > 0 {
				for _, toolCall := range choice.Delta.ToolCalls {
					o.mergeToolCall(toolCall)
				}
			}
			if choice.Delta.Content != "" {
				o.messageBuffer.WriteString(choice.Delta.Content)
				return &ChatStreamEvent{
					MessageID: o.messageID,
					Content:   choice.Delta.Content,
					Role:      model.AIChatMessageRole(choice.Delta.Role),
					EventType: EventTypeContent,
				}, nil
			}
		}
	}

	if len(o.toolCalls) > 0 {
		if isRunning := o.CallTools(ctx); !isRunning {
			toolCalls := o.toolCalls
			o.toolCalls = nil
			return &ChatStreamEvent{
				MessageID: o.messageID,
				ToolCalls: toolCalls,
				EventType: EventTypeToolCall,
			}, nil
		}
		return &ChatStreamEvent{
			MessageID: o.messageID,
			ToolCalls: o.toolCalls,
			EventType: EventTypeToolCall,
		}, nil
	}

	if o.currentChatStream == nil {
		// Check if we need to start a new iteration after tool calls
		// If the last message is a tool message, it means tool calls were completed
		// and we're starting a new iteration
		if len(o.messages) > 0 {
			lastMessage := o.messages[len(o.messages)-1]
			if lastMessage.Role == string(model.AIChatMessageRoleTool) {
				// Tool calls completed, check iteration limit before starting new iteration
				if o.currentIteration >= o.maxIterations {
					return nil, fmt.Errorf("reached maximum iterations (%d) without completion", o.maxIterations)
				}
				o.currentIteration++
			}
		}

		// Check token limit and summarize if needed
		if o.maxTokens > 0 {
			currentTokens := o.calculateTokens(o.messages)
			tokenThreshold := int(float64(o.maxTokens) * 0.9) // 90% threshold

			if currentTokens >= o.maxTokens {
				// Token limit exceeded
				if !o.enableAutoSummarization {
					return nil, fmt.Errorf("token limit exceeded (%d/%d), auto summarization is disabled", currentTokens, o.maxTokens)
				}
				// Try to summarize even at 100%
				if err := o.summarizeMessages(ctx); err != nil {
					return nil, fmt.Errorf("token limit exceeded (%d/%d) and failed to summarize: %w", currentTokens, o.maxTokens, err)
				}
			} else if currentTokens >= tokenThreshold && o.enableAutoSummarization {
				// At 90% threshold, summarize proactively
				if err := o.summarizeMessages(ctx); err != nil {
					// Log error but continue (don't fail the request)
					logger := log.GetContextLogger(ctx)
					level.Error(logger).Log("msg", "Failed to summarize messages", "error", err)
				}
			}
		}

		var err error
		// Create chat completion request
		request := openai.ChatCompletionRequest{
			Model:    o.client.modelID,
			Messages: o.messages,
			Tools:    o.tools,
			Stream:   true,
		}
		// Call OpenAI API
		o.currentChatStream, err = o.client.client.CreateChatCompletionStream(ctx, request)
		if err != nil {
			return nil, fmt.Errorf("failed to create chat completion stream: %w", err)
		}
	}
	return o.Recv(ctx)
}

func applyChatCompletionOptions(stream *OpenAIChatStream, o ChatCompletionOptions) {
	if o.OnMessageEnd != nil {
		stream.onMessageEnd = o.OnMessageEnd
	}
	if o.OnToolCallEnd != nil {
		stream.onToolCallEnd = o.OnToolCallEnd
	}
	if o.OnToolCallsStart != nil {
		stream.onToolCallsStart = o.OnToolCallsStart
	}
	stream.maxTokens = o.MaxTokens
	stream.enableAutoSummarization = o.EnableAutoSummarization
}

func NewChatStream(ctx context.Context, client *OpenAIClient, messages []openai.ChatCompletionMessage, options ...WithChatCompletionOptions) (ChatStream, error) {
	// Apply options with defaults
	opts := ChatCompletionOptions{
		MaxIterations: 10,
	}
	for _, option := range options {
		option(&opts)
	}

	// Get tools from toolSets if provided
	var tools []openai.Tool
	var toolSets toolset.ToolSets
	var err error
	if opts.ToolSetsFactory != nil {
		toolSets, err = opts.ToolSetsFactory(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tool sets: %w", err)
		}
		tools, err = toolSets.GetTools(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tools: %w", err)
		}
	}

	stream := &OpenAIChatStream{
		client:           client,
		messages:         messages,
		toolSets:         toolSets,
		tools:            tools,
		messageID:        uuid.Must(uuid.NewV4()).String(),
		maxIterations:    opts.MaxIterations,
		currentIteration: 1,
	}
	applyChatCompletionOptions(stream, opts)
	// Create chat completion request
	request := openai.ChatCompletionRequest{
		Model:    client.modelID,
		Messages: messages,
		Tools:    tools,
		Stream:   true,
	}
	// Call OpenAI API
	stream.currentChatStream, err = client.client.CreateChatCompletionStream(ctx, request)
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
func (f *OpenAIClientFactory) CreateClient(config map[string]interface{}) (AIClient, error) {
	return newOpenAIClientFromConfig(config)
}

func init() {
	// Register the OpenAI client factory
	RegisterFactory(model.AIModelProviderOpenAI, &OpenAIClientFactory{})
}
