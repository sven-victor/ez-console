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
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/safe"
)

// OpenAIClient wraps the OpenAI client with model configuration
type OpenAIClient struct {
	client *openai.Client
	model  *model.AIModel
}

// NewOpenAIClient creates a new OpenAI client from model configuration
func NewOpenAIClient(aiModel *model.AIModel) (*OpenAIClient, error) {
	if aiModel.Provider != model.AIModelProviderOpenAI {
		return nil, fmt.Errorf("unsupported provider: %s", aiModel.Provider)
	}
	apiKey := safe.NewEncryptedString(aiModel.APIKey, os.Getenv(safe.SecretEnvName))
	decKey, err := apiKey.UnsafeString()
	if err != nil {
		return nil, fmt.Errorf("failed to get API key: %w", err)
	}
	config := openai.DefaultConfig(decKey)

	// Set custom base URL if provided
	if aiModel.BaseURL != "" {
		config.BaseURL = aiModel.BaseURL
	}

	// Apply additional configuration from model config
	if aiModel.Config != nil {
		if orgID, ok := aiModel.Config["organization_id"].(string); ok && orgID != "" {
			config.OrgID = orgID
		}
	}

	client := openai.NewClientWithConfig(config)

	return &OpenAIClient{
		client: client,
		model:  aiModel,
	}, nil
}

// CreateChatCompletion creates a chat completion
func (c *OpenAIClient) CreateChatCompletion(ctx context.Context, request openai.ChatCompletionRequest) (openai.ChatCompletionResponse, error) {
	// Set the model ID from our configuration
	request.Model = c.model.ModelID

	return c.client.CreateChatCompletion(ctx, request)
}

// CreateChatCompletionStream creates a streaming chat completion
func (c *OpenAIClient) CreateChatCompletionStream(ctx context.Context, request openai.ChatCompletionRequest) (*openai.ChatCompletionStream, error) {
	// Set the model ID from our configuration
	request.Model = c.model.ModelID

	return c.client.CreateChatCompletionStream(ctx, request)
}

// GetModel returns the AI model configuration
func (c *OpenAIClient) GetModel() *model.AIModel {
	return c.model
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
		var err error
		// Create chat completion request
		request := openai.ChatCompletionRequest{
			Messages: o.messages,
			Tools:    o.tools,
			Stream:   true,
		}
		// Call OpenAI API
		o.currentChatStream, err = o.client.CreateChatCompletionStream(ctx, request)
		if err != nil {
			return nil, fmt.Errorf("failed to create chat completion stream: %w", err)
		}
	}
	return o.Recv(ctx)
}

type ChatCompletionStreamOptions struct {
	OnMessageEnd     func(ctx context.Context, messageID string, content string)
	OnToolCallEnd    func(ctx context.Context, toolCall ToolCall)
	OnToolCallsStart func(ctx context.Context, toolCalls []ToolCall)
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

func NewChatStream(ctx context.Context, client *OpenAIClient, messages []openai.ChatCompletionMessage, toolSets toolset.ToolSets, options ...WithChatCompletionStreamOptions) (ChatStream, error) {
	tools, err := toolSets.GetTools(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get tools: %w", err)
	}
	stream := &OpenAIChatStream{
		client:    client,
		messages:  messages,
		toolSets:  toolSets,
		tools:     tools,
		messageID: uuid.Must(uuid.NewV4()).String(),
	}
	var o ChatCompletionStreamOptions
	for _, option := range options {
		option(&o)
	}
	o.Apply(stream)
	// Create chat completion request
	request := openai.ChatCompletionRequest{
		Messages: messages,
		Tools:    tools,
		Stream:   true,
	}
	// Call OpenAI API
	stream.currentChatStream, err = client.CreateChatCompletionStream(ctx, request)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion stream: %w", err)
	}
	return stream, nil
}
