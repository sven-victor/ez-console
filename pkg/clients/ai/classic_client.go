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
	"sync"
	"time"

	"github.com/go-kit/log/level"
	"github.com/gofrs/uuid"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
)

var _ ClassicChatClient = (*classicChatClient)(nil)

func NewClassicChatClientFactory(factory AIClientFactory) *ClassicChatClientFactory {
	return &ClassicChatClientFactory{factory: factory}
}

type ClassicChatClientFactory struct {
	factory AIClientFactory
}

// CreateClient implements AIClientFactory.
func (c *ClassicChatClientFactory) CreateClient(ctx context.Context, organizationID string, config map[string]interface{}) (ClassicChatClient, error) {
	client, err := c.factory.CreateClient(ctx, organizationID, config)
	if err != nil {
		return nil, err
	}
	return &classicChatClient{aiClient: client}, nil
}

// GetConfigFields implements AIClientFactory.
func (c *ClassicChatClientFactory) GetConfigFields() []util.ConfigField {
	return c.factory.GetConfigFields()
}

// GetDescription implements AIClientFactory.
func (c *ClassicChatClientFactory) GetDescription() string {
	return c.factory.GetDescription()
}

// GetName implements AIClientFactory.
func (c *ClassicChatClientFactory) GetName() string {
	return c.factory.GetName()
}

type ClassicChatClient interface {
	AIClient
	Exchange(ctx context.Context, messages []ChatMessage, options ...WithChatOptions) ([]ChatMessage, error)
	ExchangeStream(ctx context.Context, messages []ChatMessage, options ...WithChatOptions) (ChatStream, error)
}

type classicChatClient struct {
	aiClient AIClient
}

// Run implements ClassicChatClient.
func (c *classicChatClient) Exchange(ctx context.Context, messages []ChatMessage, options ...WithChatOptions) ([]ChatMessage, error) {
	if client, ok := c.aiClient.(ClassicChatClient); ok {
		return client.Exchange(ctx, messages, options...)
	}
	logger := log.GetContextLogger(ctx)

	// Apply options (default maxIterations is 30)
	opts := ChatCompletionOptions{
		MaxIterations: 30,
	}
	for _, option := range options {
		option(&opts)
	}

	toolSets := make(toolset.ToolSets)
	if opts.ToolSetsFactory != nil {
		var err error
		toolSets, err = opts.ToolSetsFactory(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tool sets: %w", err)
		}
	}

	// Collect all assistant messages for the final result
	var resultMessages []ChatMessage
	reachedMaxIterations := false

	// Main loop for handling tool calls
	for iteration := 0; iteration < opts.MaxIterations; iteration++ {
		// Call OpenAI API
		response, err := c.aiClient.Chat(ctx, messages, toolSets)
		if err != nil {
			return nil, fmt.Errorf("failed to create chat completion: %w", err)
		}

		// Check response
		if response == nil {
			return nil, fmt.Errorf("no response")
		}

		// Check if there are tool calls
		if len(response.ToolCalls) == 0 {
			// No tool calls, add the final message and break
			resultMessages = append(resultMessages, *response)
			break
		}

		// Add assistant message with tool calls to messages and results
		messages = append(messages, *response)
		resultMessages = append(resultMessages, *response)

		// Execute tool calls serially
		if len(toolSets) == 0 {
			return nil, fmt.Errorf("tool calls are required but no toolSets provided")
		}

		for _, toolCall := range response.ToolCalls {
			// Call the tool
			toolResult, err := toolSets.CallTool(ctx, toolCall.Function.Name, toolCall.Function.Arguments)
			if err != nil {
				level.Error(logger).Log("msg", "Failed to call tool", "error", err, "tool", toolCall.Function.Name)
				// Use error message as tool result
				toolResult = err.Error()
			}

			// Add tool result to messages
			toolResultMessage := ChatMessage{
				Role:       model.AIChatMessageRoleTool,
				Content:    toolResult,
				ToolCallID: toolCall.ID,
			}
			messages = append(messages, toolResultMessage)
			resultMessages = append(resultMessages, toolResultMessage)
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
		finalPromptMessage := ChatMessage{
			Role:    model.AIChatMessageRoleUser,
			Content: opts.FinalPrompt,
		}
		messages = append(messages, finalPromptMessage)
		resultMessages = append(resultMessages, finalPromptMessage)

		// Make one more API call without tools
		response, err := c.aiClient.Chat(ctx, messages, toolSets)
		if err != nil {
			return nil, fmt.Errorf("failed to create final prompt completion: %w", err)
		}

		// Check response
		if response == nil {
			return nil, fmt.Errorf("no response")
		}

		resultMessages = append(resultMessages, *response)
	}

	// If we reached max iterations without completion and no final prompt, return error
	if reachedMaxIterations && opts.FinalPrompt == "" {
		return nil, fmt.Errorf("reached maximum iterations (%d) without completion", opts.MaxIterations)
	}

	return resultMessages, nil
}

// RunStream implements ClassicChatClient.
func (c *classicChatClient) ExchangeStream(ctx context.Context, messages []ChatMessage, options ...WithChatOptions) (ChatStream, error) {
	if client, ok := c.aiClient.(ClassicChatClient); ok {
		return client.ExchangeStream(ctx, messages, options...)
	}
	return NewClassicChatStream(ctx, c, messages, options...)
}

// Chat implements AIClient.
func (c *classicChatClient) Chat(ctx context.Context, messages []ChatMessage, toolSets toolset.ToolSets) (*ChatMessage, error) {
	return c.aiClient.Chat(ctx, messages, toolSets)
}

// ChatStream implements AIClient.
func (c *classicChatClient) ChatStream(ctx context.Context, messages []ChatMessage, toolSets toolset.ToolSets) (ChatStream, error) {
	return c.aiClient.ChatStream(ctx, messages, toolSets)
}

type ClassicChatStream struct {
	client   AIClient
	messages []ChatMessage
	toolSets toolset.ToolSets
	// tools                   []openai.Tool
	toolCalls               []ToolCall
	toolCallMutex           sync.Mutex
	toolCallRunning         bool
	currentChatStream       ChatStream
	messageID               string
	messageBuffer           bytes.Buffer
	summaryPrompt           string
	maxIterations           int
	currentIteration        int
	maxTokens               int
	enableAutoSummarization bool

	onToolCallResultChanged func(ctx context.Context, toolCallID string, result string)
	onMessageAdded          func(ctx context.Context, message ChatMessage)
	onSummary               func(ctx context.Context, messages []ChatMessage)
}

func (o *ClassicChatStream) appendMessage(ctx context.Context, message ChatMessage) {
	o.messages = append(o.messages, message)
	if o.onMessageAdded != nil {
		o.onMessageAdded(ctx, message)
	}
}

func (o *ClassicChatStream) callToolsRunning() bool {
	for _, toolCall := range o.toolCalls {
		if toolCall.Status == ToolCallStatusRunning {
			return true
		}
	}
	return false
}

// Close implements ChatStream.
func (o *ClassicChatStream) Close() error {
	if o.currentChatStream != nil {
		return o.currentChatStream.Close()
	}
	return nil
}

// calculateTokens estimates the token count for messages
// Uses a simple approximation: 1 token ≈ 4 characters
func (o *ClassicChatStream) calculateTokens(messages []ChatMessage) int {
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
func (o *ClassicChatStream) summarizeMessages(ctx context.Context) error {
	logger := log.GetContextLogger(ctx)

	if len(o.messages) <= 1 {
		return nil // Nothing to summarize
	}

	// Find the first system message
	var systemMessage *ChatMessage
	var messagesToSummarize []ChatMessage
	firstSystemFound := false

	for i, msg := range o.messages {
		if !firstSystemFound && msg.Role == model.AIChatMessageRoleSystem {
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
	summaryMessages := []ChatMessage{
		{
			Role:    model.AIChatMessageRoleSystem,
			Content: summaryPrompt,
		},
	}

	// Add messages to summarize
	summaryMessages = append(summaryMessages, messagesToSummarize...)

	// Call non-streaming API for summarization
	level.Debug(logger).Log("msg", "Summarizing messages", "count", len(messagesToSummarize))
	response, err := o.client.Chat(ctx, summaryMessages, o.toolSets)
	if err != nil {
		return fmt.Errorf("failed to create summary: %w", err)
	}

	if response == nil {
		return fmt.Errorf("no response")
	}

	summaryContent := response.Content

	// Rebuild messages: system message (if exists) + summary
	o.messages = make([]ChatMessage, 0, 2)
	if systemMessage != nil {
		o.messages = append(o.messages, *systemMessage)
	}
	o.messages = append(o.messages, ChatMessage{
		Role:    model.AIChatMessageRoleUser,
		Content: fmt.Sprintf("[Previous conversation summary]: %s", summaryContent),
	})

	o.onSummary(ctx, o.messages)

	level.Debug(logger).Log("msg", "Messages summarized", "original_count", len(messagesToSummarize)+1, "new_count", len(o.messages))
	return nil
}

func (o *ClassicChatStream) backgroundCallTool(ctx context.Context, toolCall *ToolCall) {
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

			o.appendMessage(ctx, ChatMessage{
				Role:       model.AIChatMessageRoleTool,
				Content:    toolCall.Result,
				ToolCallID: toolCall.ID,
			})
			toolCall.Status = toolStatus
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

func (o *ClassicChatStream) CallTools(ctx context.Context) (isRunning bool) {
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
	for idx := range o.toolCalls {
		if o.toolCalls[idx].Status == ToolCallStatusPending {
			o.toolCalls[idx].Status = ToolCallStatusRunning
			o.backgroundCallTool(ctx, &o.toolCalls[idx])
		}
	}
	return o.callToolsRunning()
}

func (o *ClassicChatStream) mergeToolCall(toolCall ToolCall) {
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

// Recv implements ChatStream.
func (o *ClassicChatStream) Recv(ctx context.Context) (*ChatStreamEvent, error) {
	if o.currentChatStream != nil {
		for {
			resp, err := o.currentChatStream.Recv(ctx)
			if err != nil {
				if err == io.EOF {
					o.currentChatStream.Close()
					o.currentChatStream = nil
					o.messageID = uuid.Must(uuid.NewV4()).String()
					if o.messageBuffer.Len() > 0 {
						o.appendMessage(ctx, ChatMessage{
							Role:    model.AIChatMessageRoleAssistant,
							Content: o.messageBuffer.String(),
						})
						o.messageBuffer.Reset()
					}

					if len(o.toolCalls) > 0 {
						var toolCalls []ToolCall
						for _, toolCall := range o.toolCalls {
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
						o.appendMessage(ctx, ChatMessage{
							Role:      model.AIChatMessageRoleAssistant,
							ToolCalls: toolCalls,
						})
						return &ChatStreamEvent{
							MessageID: o.messageID,
							ToolCalls: o.toolCalls,
							EventType: EventTypeToolCall,
						}, nil
					}

					if o.summaryPrompt != "" {
						o.messages = append(o.messages, ChatMessage{
							Role:    model.AIChatMessageRoleSystem,
							Content: o.summaryPrompt,
						})
						o.summaryPrompt = ""
						return o.Recv(ctx)
					}
				}
				return nil, err
			}

			if len(resp.ToolCalls) > 0 {
				for _, toolCall := range resp.ToolCalls {
					o.mergeToolCall(toolCall)
				}
			}
			if resp.Content != "" {
				o.messageBuffer.WriteString(resp.Content)
				return &ChatStreamEvent{
					MessageID: o.messageID,
					Content:   resp.Content,
					Role:      model.AIChatMessageRoleAssistant,
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
			if lastMessage.Role == model.AIChatMessageRoleTool {
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
		// Call OpenAI API
		o.currentChatStream, err = o.client.ChatStream(ctx, o.messages, o.toolSets)
		if err != nil {
			return nil, fmt.Errorf("failed to create chat completion stream: %w", err)
		}
	}
	return o.Recv(ctx)
}

func (stream *ClassicChatStream) applyChatCompletionOptions(o ChatCompletionOptions) {
	if o.OnToolCallResultChanged != nil {
		stream.onToolCallResultChanged = o.OnToolCallResultChanged
	}
	if o.OnMessageAdded != nil {
		stream.onMessageAdded = o.OnMessageAdded
	}
	if o.OnSummary != nil {
		stream.onSummary = o.OnSummary
	}
	stream.maxTokens = o.MaxTokens
	stream.enableAutoSummarization = o.EnableAutoSummarization
}

func NewClassicChatStream(ctx context.Context, client ClassicChatClient, messages []ChatMessage, options ...WithChatOptions) (ChatStream, error) {
	// Apply options with defaults
	opts := ChatCompletionOptions{
		MaxIterations: 30,
	}
	for _, option := range options {
		option(&opts)
	}

	toolSets := make(toolset.ToolSets)
	var err error
	if opts.ToolSetsFactory != nil {
		toolSets, err = opts.ToolSetsFactory(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tool sets: %w", err)
		}
	}

	stream := &ClassicChatStream{
		client:           client,
		messages:         messages,
		toolSets:         toolSets,
		messageID:        uuid.Must(uuid.NewV4()).String(),
		maxIterations:    opts.MaxIterations,
		currentIteration: 1,
	}
	stream.applyChatCompletionOptions(opts)
	// Call OpenAI API
	stream.currentChatStream, err = client.ChatStream(ctx, messages, toolSets)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat completion stream: %w", err)
	}
	return stream, nil
}
