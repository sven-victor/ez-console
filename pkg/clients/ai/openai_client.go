package ai

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"os"
	"sync"

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
func (c *OpenAIClient) CreateChatStream(ctx context.Context, messages []ChatMessage, options ...WithChatCompletionStreamOptions) (ChatStream, error) {
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
	if opts.ToolSets != nil {
		var err error
		openaiTools, err = opts.ToolSets.GetTools(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tools: %w", err)
		}
	}

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
			// No tool calls, return the final message
			result := ChatMessageFromOpenAI(assistantMessage)
			return []ChatMessage{result}, nil
		}

		// Add assistant message with tool calls to messages
		openaiMessages = append(openaiMessages, assistantMessage)

		// Execute tool calls serially
		if opts.ToolSets == nil {
			return nil, fmt.Errorf("tool calls are required but no toolSets provided")
		}

		for _, toolCall := range assistantMessage.ToolCalls {
			level.Debug(logger).Log("msg", "Calling tool", "tool", toolCall.Function.Name, "arguments", toolCall.Function.Arguments, "iteration", iteration+1)

			// Call the tool
			toolResult, err := opts.ToolSets.CallTool(ctx, toolCall.Function.Name, toolCall.Function.Arguments)
			if err != nil {
				level.Error(logger).Log("msg", "Failed to call tool", "error", err, "tool", toolCall.Function.Name)
				// Use error message as tool result
				toolResult = err.Error()
			}

			// Add tool result to messages
			openaiMessages = append(openaiMessages, openai.ChatCompletionMessage{
				Role:       string(model.AIChatMessageRoleTool),
				Content:    toolResult,
				ToolCallID: toolCall.ID,
			})
		}

		// Continue to next iteration
	}

	// Reached max iterations without completion
	return nil, fmt.Errorf("reached maximum iterations (%d) without completion", opts.MaxIterations)
}

type OpenAIChatStream struct {
	client            *OpenAIClient
	messages          []openai.ChatCompletionMessage
	toolSets          toolset.ToolSets
	tools             []openai.Tool
	toolCalls         []ToolCall
	toolCallMutex     sync.Mutex
	currentChatStream *openai.ChatCompletionStream
	messageID         string
	messageBuffer     bytes.Buffer
	summaryPrompt     string
	onMessageEnd      func(ctx context.Context, messageID string, content string)
	onToolCallEnd     func(ctx context.Context, toolCall ToolCall)
	onToolCallsStart  func(ctx context.Context, toolCall []ToolCall)
	maxIterations     int
	currentIteration  int
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

func (o *OpenAIChatStream) backgroundCallTool(ctx context.Context, toolCall *ToolCall) {
	logger := log.GetContextLogger(ctx)
	go func() {
		defer func() {
			if r := recover(); r != nil {
				toolCall.Error = fmt.Sprintf("panic: %v", r)
				toolCall.Status = ToolCallStatusFailed
			}
			if o.onToolCallEnd != nil {
				o.onToolCallEnd(ctx, *toolCall)
			}
		}()
		level.Debug(logger).Log("msg", "Calling tool", "tool", toolCall.Function.Name, "arguments", toolCall.Function.Arguments)
		resp, err := o.toolSets.CallTool(ctx, toolCall.Function.Name, toolCall.Function.Arguments)
		if err != nil {
			level.Error(logger).Log("msg", "Failed to call tool", "error", err)
			toolCall.Status = ToolCallStatusFailed
			toolCall.Result = err.Error()
		} else {
			toolCall.Status = ToolCallStatusCompleted
			toolCall.Result = resp
		}
		o.messages = append(o.messages, openai.ChatCompletionMessage{
			Role:       string(model.AIChatMessageRoleTool),
			Content:    toolCall.Result,
			ToolCallID: toolCall.ID,
		})
	}()
}
func (o *OpenAIChatStream) CallTools(ctx context.Context) (isRunning bool) {
	if !o.toolCallMutex.TryLock() {
		return true
	}
	defer o.toolCallMutex.Unlock()
	for idx := range o.toolCalls {
		if o.toolCalls[idx].Status == ToolCallStatusPending {
			o.toolCalls[idx].Status = ToolCallStatusRunning
			if o.onToolCallsStart != nil {
				o.onToolCallsStart(ctx, []ToolCall{o.toolCalls[idx]})
			}
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
				o.messages = append(o.messages, openai.ChatCompletionMessage{
					Role:    string(model.AIChatMessageRoleAssistant),
					Content: choice.Delta.Content,
				})
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

type ChatCompletionOptions struct {
	MaxIterations int
	ToolSets      toolset.ToolSets
}

type ChatCompletionStreamOptions struct {
	OnMessageEnd     func(ctx context.Context, messageID string, content string)
	OnToolCallEnd    func(ctx context.Context, toolCall ToolCall)
	OnToolCallsStart func(ctx context.Context, toolCalls []ToolCall)
	ToolSets         toolset.ToolSets
	MaxIterations    int
}

func (o *ChatCompletionStreamOptions) Apply(stream *OpenAIChatStream) {
	if o.OnMessageEnd != nil {
		stream.onMessageEnd = o.OnMessageEnd
	}
	if o.OnToolCallEnd != nil {
		stream.onToolCallEnd = o.OnToolCallEnd
	}
	if o.OnToolCallsStart != nil {
		stream.onToolCallsStart = o.OnToolCallsStart
	}
}

type WithChatCompletionOptions func(options *ChatCompletionOptions)

func WithChatCompletionMaxIterations(maxIterations int) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		options.MaxIterations = maxIterations
	}
}

func WithChatCompletionToolSets(toolSets toolset.ToolSets) WithChatCompletionOptions {
	return func(options *ChatCompletionOptions) {
		options.ToolSets = toolSets
	}
}

type WithChatCompletionStreamOptions func(options *ChatCompletionStreamOptions)

func WithChatCompletionStreamOnMessageEnd(onMessageEnd func(ctx context.Context, messageID string, content string)) WithChatCompletionStreamOptions {
	return func(options *ChatCompletionStreamOptions) {
		options.OnMessageEnd = onMessageEnd
	}
}

func WithChatCompletionStreamOnToolCallEnd(onToolCallEnd func(ctx context.Context, toolCall ToolCall)) WithChatCompletionStreamOptions {
	return func(options *ChatCompletionStreamOptions) {
		options.OnToolCallEnd = onToolCallEnd
	}
}

func WithChatCompletionStreamOnToolCallsStart(onToolCallsStart func(ctx context.Context, toolCalls []ToolCall)) WithChatCompletionStreamOptions {
	return func(options *ChatCompletionStreamOptions) {
		options.OnToolCallsStart = onToolCallsStart
	}
}

func WithChatCompletionStreamToolSets(toolSets toolset.ToolSets) WithChatCompletionStreamOptions {
	return func(options *ChatCompletionStreamOptions) {
		options.ToolSets = toolSets
	}
}

func WithChatCompletionStreamMaxIterations(maxIterations int) WithChatCompletionStreamOptions {
	return func(options *ChatCompletionStreamOptions) {
		options.MaxIterations = maxIterations
	}
}

func NewChatStream(ctx context.Context, client *OpenAIClient, messages []openai.ChatCompletionMessage, options ...WithChatCompletionStreamOptions) (ChatStream, error) {
	// Apply options with defaults
	opts := ChatCompletionStreamOptions{
		MaxIterations: 10,
	}
	for _, option := range options {
		option(&opts)
	}

	// Get tools from toolSets if provided
	var tools []openai.Tool
	var toolSets toolset.ToolSets
	var err error
	if opts.ToolSets != nil {
		tools, err = opts.ToolSets.GetTools(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tools: %w", err)
		}
		toolSets = opts.ToolSets
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
	opts.Apply(stream)
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
