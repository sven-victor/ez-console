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
	"slices"
	"strings"
	"sync"
	"time"

	"github.com/cenkalti/backoff/v5"
	"github.com/go-kit/log/level"
	"github.com/gofrs/uuid"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
)

var (
	// aiTokensTotal tracks the total number of tokens used in AI interactions
	aiTokensTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "ai_tokens_total",
			Help: "Total number of tokens used in AI interactions",
		},
		[]string{"type"}, // type can be "prompt" or "completion"
	)
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

	// Apply options (default maxIterations is 30, toolResultMaxSize is 32KB)
	opts := ChatCompletionOptions{
		MaxIterations:     10,
		ToolResultMaxSize: 32 * 1024, // 32KB
	}
	for _, option := range options {
		option(&opts)
	}

	toolSets := make(toolset.ToolSets)
	if opts.ToolSetsProvider != nil {
		var err error
		toolSets, err = opts.ToolSetsProvider(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tool sets: %w", err)
		}
	}

	var aiClient AIClient = c.aiClient
	if opts.AIClientWrapper != nil {
		aiClient = opts.AIClientWrapper(c.aiClient)
	}

	// Helper function to append message and trigger callback
	appendMessage := func(msg ChatMessage) {
		messages = append(messages, msg)
		if opts.OnMessageAdded != nil {
			opts.OnMessageAdded(ctx, msg)
		}
	}

	totalPromptTokens := 0
	totalCompletionTokens := 0

	// recordUsage adds token counts from a Chat response to the accumulators.
	// If the API provided actual usage, use it; otherwise fall back to estimation.
	recordUsage := func(response *ChatMessage, estimatedPromptTokens int) {
		if response != nil && response.Usage != nil {
			totalPromptTokens += response.Usage.PromptTokens
			totalCompletionTokens += response.Usage.CompletionTokens
			aiTokensTotal.WithLabelValues("prompt").Add(float64(response.Usage.PromptTokens))
			aiTokensTotal.WithLabelValues("completion").Add(float64(response.Usage.CompletionTokens))
		} else {
			totalPromptTokens += estimatedPromptTokens
			aiTokensTotal.WithLabelValues("prompt").Add(float64(estimatedPromptTokens))
			if response != nil {
				ec := EstimateTokens([]ChatMessage{*response})
				totalCompletionTokens += ec
				aiTokensTotal.WithLabelValues("completion").Add(float64(ec))
			}
		}
	}

	// Helper function to summarize messages.
	// Tries one-shot summarization first; falls back to segmented summarization
	// if the one-shot call itself exceeds the context window.
	summarizeMessages := func() error {
		if len(messages) <= 1 {
			return nil
		}

		var systemMessage *ChatMessage
		var messagesToSummarize []ChatMessage
		firstSystemFound := false

		for i, msg := range messages {
			if !firstSystemFound && msg.Role == model.AIChatMessageRoleSystem {
				systemMessage = &messages[i]
				firstSystemFound = true
			} else {
				messagesToSummarize = append(messagesToSummarize, msg)
			}
		}

		if len(messagesToSummarize) == 0 {
			return nil
		}

		messagesToSummarize = RedactGetSkillContentToolResultsForSummary(messagesToSummarize)

		originalCount := len(messagesToSummarize) + 1

		summaryMsgs := []ChatMessage{
			{
				Role:    model.AIChatMessageRoleSystem,
				Content: "Please summarize the following conversation history, preserving important information and context. The summary should be concise but comprehensive.",
			},
		}
		summaryMsgs = append(summaryMsgs, messagesToSummarize...)

		level.Debug(logger).Log("msg", "Attempting one-shot summarization", "count", len(messagesToSummarize))
		estPrompt := EstimateTokens(summaryMsgs)
		response, err := aiClient.Chat(ctx, summaryMsgs, nil)
		if err == nil && response != nil {
			recordUsage(response, estPrompt)
			messages = make([]ChatMessage, 0, 2)
			if systemMessage != nil {
				messages = append(messages, *systemMessage)
			}
			messages = append(messages, ChatMessage{
				Role:    model.AIChatMessageRoleUser,
				Content: fmt.Sprintf("[Previous conversation summary]: %s", response.Content),
			})
			if opts.OnSummary != nil {
				opts.OnSummary(ctx, messages)
			}
			level.Debug(logger).Log("msg", "Messages summarized (one-shot)", "original_count", originalCount, "new_count", len(messages))
			return nil
		}

		level.Info(logger).Log("msg", "One-shot summarization failed, falling back to segmented summarization", "error", err)
		summarizedMessages, serr := segmentedSummarize(ctx, aiClient, messages, fmt.Sprintf("proactive summarization fallback: %v", err))
		if serr != nil {
			return fmt.Errorf("segmented summarization fallback also failed: %w", serr)
		}
		messages = summarizedMessages
		if opts.OnSummary != nil {
			opts.OnSummary(ctx, messages)
		}
		level.Debug(logger).Log("msg", "Messages summarized (segmented fallback)", "original_count", originalCount, "new_count", len(messages))
		return nil
	}

	// Helper function to summarize tool result
	summarizeToolResult := func(toolCallID, toolName, originalResult string) (string, error) {
		summarizePrompt := fmt.Sprintf(
			"The tool '%s' returned a very large result. Please analyze and extract the key information from the following result. Focus on the most important data and provide a concise summary:\n\n%s",
			toolName,
			originalResult,
		)

		summarizeMessages := []ChatMessage{
			{
				Role:    model.AIChatMessageRoleUser,
				Content: summarizePrompt,
			},
		}

		level.Debug(logger).Log("msg", "Summarizing tool result", "tool", toolName, "original_size", len(originalResult))
		estPrompt := EstimateTokens(summarizeMessages)
		response, err := aiClient.Chat(ctx, summarizeMessages, nil)
		if err != nil {
			return "", fmt.Errorf("failed to summarize tool result: %w", err)
		}

		if response == nil {
			return "", fmt.Errorf("no response")
		}

		recordUsage(response, estPrompt)
		level.Debug(logger).Log("msg", "Tool result summarized", "tool", toolName, "original_size", len(originalResult), "new_size", len(response.Content))
		return response.Content, nil
	}

	var resultMessages []ChatMessage
	reachedMaxIterations := false
	endChat := false
	summaryAttempts := 0

	for iteration := 0; iteration < opts.MaxIterations; iteration++ {
		// Check token limit and summarize if needed
		if opts.MaxTokens > 0 {
			currentTokens := EstimateTokens(messages)
			tokenThreshold := int(float64(opts.MaxTokens) * 0.9) // 90% threshold

			if currentTokens >= opts.MaxTokens {
				if !opts.EnableAutoSummarization {
					return nil, fmt.Errorf("token limit exceeded (%d/%d), auto summarization is disabled", currentTokens, opts.MaxTokens)
				}
				if err := summarizeMessages(); err != nil {
					return nil, fmt.Errorf("token limit exceeded (%d/%d) and failed to summarize: %w", currentTokens, opts.MaxTokens, err)
				}
			} else if currentTokens >= tokenThreshold && opts.EnableAutoSummarization {
				if err := summarizeMessages(); err != nil {
					level.Error(logger).Log("msg", "Failed to summarize messages", "error", err)
				}
			}
		}

		estimatedPromptTokens := EstimateTokens(messages)

		response, err := backoff.Retry(ctx, func() (*ChatMessage, error) {
			resp, err := aiClient.Chat(ctx, messages, toolSets)
			if err != nil {
				if _, ok := IsChatError(err, ChatErrorTypeRateLimitExceeded); ok {
					level.Warn(logger).Log("msg", "Rate limit hit, will retry with exponential backoff")
					return nil, err
				}
				return nil, backoff.Permanent(err)
			}
			return resp, nil
		})
		if err != nil {
			if aiErr, ok := IsChatError(err, ChatErrorTypeMaxTokensExceeded); ok {
				if summaryAttempts >= maxSummaryAttempts {
					return nil, fmt.Errorf("max tokens still exceeded after %d summarization attempts: %w", summaryAttempts, err)
				}
				summaryAttempts++
				level.Info(logger).Log("msg", "Max tokens exceeded, starting segmented summarization", "attempt", summaryAttempts)
				summarizedMessages, serr := segmentedSummarize(ctx, aiClient, messages, aiErr.Detail)
				if serr != nil {
					return nil, fmt.Errorf("segmented summarization failed: %w", serr)
				}
				messages = summarizedMessages
				if opts.OnSummary != nil {
					opts.OnSummary(ctx, messages)
				}
				iteration--
				continue
			}
			return nil, fmt.Errorf("failed to create chat completion: %w", err)
		}

		if response == nil {
			return nil, fmt.Errorf("no response")
		}

		recordUsage(response, estimatedPromptTokens)

		if len(response.ToolCalls) == 0 {
			appendMessage(*response)
			resultMessages = append(resultMessages, *response)
			break
		}

		appendMessage(*response)
		resultMessages = append(resultMessages, *response)

		if len(toolSets) == 0 {
			return nil, fmt.Errorf("tool calls are required but no toolSets provided")
		}
		for _, toolCall := range response.ToolCalls {
			toolResult, err := toolSets.CallTool(ctx, toolCall.Function.Name, toolCall.Function.Arguments)
			if err != nil {
				if _, ok := IsChatError(err, ChatErrorTypeEndOfChat); ok {
					endChat = true
				} else {
					level.Error(logger).Log("msg", "Failed to call tool", "error", err, "tool", toolCall.Function.Name)
					toolResult = err.Error()
				}
			}

			if opts.OnToolCallResultChanged != nil {
				opts.OnToolCallResultChanged(ctx, toolCall.ID, toolResult)
			}

			if !endChat && opts.ToolResultMaxSize > 0 && len(toolResult) > opts.ToolResultMaxSize {
				level.Info(logger).Log("msg", "Tool result exceeds max size, summarizing", "tool", toolCall.Function.Name, "size", len(toolResult), "max_size", opts.ToolResultMaxSize)
				summarized, err := summarizeToolResult(toolCall.ID, toolCall.Function.Name, toolResult)
				if err != nil {
					level.Error(logger).Log("msg", "Failed to summarize tool result", "error", err, "tool", toolCall.Function.Name)
				} else {
					toolResult = summarized
				}
			}

			toolResultMessage := ChatMessage{
				Role:       model.AIChatMessageRoleTool,
				Content:    toolResult,
				ToolCallID: toolCall.ID,
			}
			appendMessage(toolResultMessage)
			resultMessages = append(resultMessages, toolResultMessage)

			if endChat {
				break
			}
		}

		if iteration == opts.MaxIterations-1 {
			reachedMaxIterations = true
		}
		if endChat {
			break
		}
	}

	if !endChat && opts.FinalPrompt != "" {
		finalPromptMessage := ChatMessage{
			Role:    model.AIChatMessageRoleUser,
			Content: opts.FinalPrompt,
		}
		appendMessage(finalPromptMessage)
		resultMessages = append(resultMessages, finalPromptMessage)

		estPrompt := EstimateTokens(messages)
		response, err := aiClient.Chat(ctx, messages, nil)
		if err != nil {
			return nil, fmt.Errorf("failed to create final prompt completion: %w", err)
		}

		if response == nil {
			return nil, fmt.Errorf("no response")
		}

		recordUsage(response, estPrompt)
		appendMessage(*response)
		resultMessages = append(resultMessages, *response)
	}

	if !endChat && opts.ResponseJsonSchema != "" && len(toolSets) > 0 {
		schemaPrompt := fmt.Sprintf("Please provide your final response in the following JSON format:\n%s", opts.ResponseJsonSchema)
		schemaMessage := ChatMessage{
			Role:    model.AIChatMessageRoleUser,
			Content: schemaPrompt,
		}
		appendMessage(schemaMessage)
		resultMessages = append(resultMessages, schemaMessage)

		estPrompt := EstimateTokens(messages)
		response, err := aiClient.Chat(ctx, messages, nil)
		if err != nil {
			return nil, fmt.Errorf("failed to create JSON formatted response: %w", err)
		}

		if response == nil {
			return nil, fmt.Errorf("no response")
		}

		recordUsage(response, estPrompt)
		appendMessage(*response)
		resultMessages = append(resultMessages, *response)
	}

	if reachedMaxIterations && !endChat && opts.FinalPrompt == "" && opts.ResponseJsonSchema == "" {
		return nil, fmt.Errorf("reached maximum iterations (%d) without completion", opts.MaxIterations)
	}

	if opts.OnTokenUsage != nil {
		opts.OnTokenUsage(ctx, TokenUsageStats{
			PromptTokens:     totalPromptTokens,
			CompletionTokens: totalCompletionTokens,
			TotalTokens:      totalPromptTokens + totalCompletionTokens,
			ActiveTokens:     EstimateTokens(messages),
		})
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
	client                       AIClient
	messages                     []ChatMessage
	toolSets                     toolset.ToolSets
	toolSetsProvider             func(context.Context) (toolset.ToolSets, error)
	clientTools                  []openai.Tool
	refreshToolSetsEachIteration bool
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
	toolResultMaxSize       int
	responseJsonSchema      string
	hasToolCalls            bool // Track if we had tool calls in this session
	jsonSchemaRequested     bool // Track if we've already requested JSON schema response
	handoffTriggered        bool // True after a client_tool_pending event was emitted
	summaryAttempts         int

	totalPromptTokens     int
	totalCompletionTokens int
	tokenUsageOnce        sync.Once
	ctx                   context.Context // stored for Close()-time callback

	onToolCallResultChanged func(ctx context.Context, toolCallID string, result string)
	onMessageAdded          func(ctx context.Context, message ChatMessage)
	onSummary               func(ctx context.Context, messages []ChatMessage)
	onTokenUsage            func(ctx context.Context, stats TokenUsageStats)
}

const maxSummaryAttempts = 3

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
	o.emitTokenUsage()
	if o.currentChatStream != nil {
		return o.currentChatStream.Close()
	}
	return nil
}

// usageProvider is implemented by inner ChatStream implementations that report
// actual token usage from the LLM API (e.g. OpenAIChatStream).
type usageProvider interface {
	TokenUsage() *TokenUsage
}

// recordAPICallUsage captures token usage for the just-completed inner stream.
// Prefers actual usage from the LLM API; falls back to character-based estimation.
func (o *ClassicChatStream) recordAPICallUsage() {
	if up, ok := o.currentChatStream.(usageProvider); ok {
		if usage := up.TokenUsage(); usage != nil {
			o.totalPromptTokens += usage.PromptTokens
			o.totalCompletionTokens += usage.CompletionTokens
			aiTokensTotal.WithLabelValues("prompt").Add(float64(usage.PromptTokens))
			aiTokensTotal.WithLabelValues("completion").Add(float64(usage.CompletionTokens))
			return
		}
	}
	// Fallback: estimate prompt from sent messages, completion from buffered response
	ep := EstimateTokens(o.messages)
	o.totalPromptTokens += ep
	aiTokensTotal.WithLabelValues("prompt").Add(float64(ep))

	var completionMsg ChatMessage
	if o.messageBuffer.Len() > 0 {
		completionMsg.Content = o.messageBuffer.String()
	}
	for _, tc := range o.toolCalls {
		completionMsg.ToolCalls = append(completionMsg.ToolCalls, ToolCall{
			ID:   tc.ID,
			Type: tc.Type,
			Function: FunctionCall{
				Name:      tc.Function.Name,
				Arguments: tc.Function.Arguments,
			},
		})
	}
	ec := EstimateTokens([]ChatMessage{completionMsg})
	o.totalCompletionTokens += ec
	aiTokensTotal.WithLabelValues("completion").Add(float64(ec))
}

// emitTokenUsage fires the OnTokenUsage callback exactly once with accumulated totals.
func (o *ClassicChatStream) emitTokenUsage() {
	o.tokenUsageOnce.Do(func() {
		if o.onTokenUsage != nil {
			o.onTokenUsage(o.ctx, TokenUsageStats{
				PromptTokens:     o.totalPromptTokens,
				CompletionTokens: o.totalCompletionTokens,
				TotalTokens:      o.totalPromptTokens + o.totalCompletionTokens,
				ActiveTokens:     EstimateTokens(o.messages),
			})
		}
	})
}

// summarizeMessages creates a summary of old messages while preserving the first system message.
// It first attempts a fast one-shot summarization; if that fails (e.g. the messages themselves
// exceed the model's context window), it falls back to segmentedSummarize.
func (o *ClassicChatStream) summarizeMessages(ctx context.Context) error {
	logger := log.GetContextLogger(ctx)

	if len(o.messages) <= 1 {
		return nil
	}

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
		return nil
	}

	messagesToSummarize = RedactGetSkillContentToolResultsForSummary(messagesToSummarize)

	originalCount := len(messagesToSummarize) + 1

	summaryMessages := []ChatMessage{
		{
			Role:    model.AIChatMessageRoleSystem,
			Content: "Please summarize the following conversation history, preserving important information and context. The summary should be concise but comprehensive.",
		},
	}
	summaryMessages = append(summaryMessages, messagesToSummarize...)

	level.Debug(logger).Log("msg", "Attempting one-shot summarization", "count", len(messagesToSummarize))
	estPrompt := EstimateTokens(summaryMessages)
	response, err := o.client.Chat(ctx, summaryMessages, nil)
	if err == nil && response != nil {
		o.recordSideCallUsage(response, estPrompt)
		o.messages = make([]ChatMessage, 0, 2)
		if systemMessage != nil {
			o.messages = append(o.messages, *systemMessage)
		}
		o.messages = append(o.messages, ChatMessage{
			Role:    model.AIChatMessageRoleUser,
			Content: fmt.Sprintf("[Previous conversation summary]: %s", response.Content),
		})
		if o.onSummary != nil {
			o.onSummary(ctx, o.messages)
		}
		level.Debug(logger).Log("msg", "Messages summarized (one-shot)", "original_count", originalCount, "new_count", len(o.messages))
		return nil
	}

	level.Info(logger).Log("msg", "One-shot summarization failed, falling back to segmented summarization", "error", err)
	summarizedMessages, serr := o.segmentedSummarize(ctx, fmt.Sprintf("proactive summarization fallback: %v", err))
	if serr != nil {
		return fmt.Errorf("segmented summarization fallback also failed: %w", serr)
	}
	o.messages = summarizedMessages
	if o.onSummary != nil {
		o.onSummary(ctx, o.messages)
	}
	level.Debug(logger).Log("msg", "Messages summarized (segmented fallback)", "original_count", originalCount, "new_count", len(o.messages))
	return nil
}

// summarizeToolResult summarizes a large tool result
func (o *ClassicChatStream) summarizeToolResult(ctx context.Context, toolName, originalResult string) (string, error) {
	logger := log.GetContextLogger(ctx)

	summarizePrompt := fmt.Sprintf(
		"The tool '%s' returned a very large result. Please analyze and extract the key information from the following result. Focus on the most important data and provide a concise summary:\n\n%s",
		toolName,
		originalResult,
	)

	summarizeMessages := []ChatMessage{
		{
			Role:    model.AIChatMessageRoleUser,
			Content: summarizePrompt,
		},
	}

	level.Debug(logger).Log("msg", "Summarizing tool result", "tool", toolName, "original_size", len(originalResult))
	estPrompt := EstimateTokens(summarizeMessages)
	response, err := o.client.Chat(ctx, summarizeMessages, nil)
	if err != nil {
		return "", fmt.Errorf("failed to summarize tool result: %w", err)
	}

	if response == nil {
		return "", fmt.Errorf("no response")
	}

	o.recordSideCallUsage(response, estPrompt)
	level.Debug(logger).Log("msg", "Tool result summarized", "tool", toolName, "original_size", len(originalResult), "new_size", len(response.Content))
	return response.Content, nil
}

// recordSideCallUsage records token usage from auxiliary Chat calls
// (summarization, tool result condensing) that happen outside the main stream.
func (o *ClassicChatStream) recordSideCallUsage(response *ChatMessage, estimatedPromptTokens int) {
	if response != nil && response.Usage != nil {
		o.totalPromptTokens += response.Usage.PromptTokens
		o.totalCompletionTokens += response.Usage.CompletionTokens
		aiTokensTotal.WithLabelValues("prompt").Add(float64(response.Usage.PromptTokens))
		aiTokensTotal.WithLabelValues("completion").Add(float64(response.Usage.CompletionTokens))
	} else {
		o.totalPromptTokens += estimatedPromptTokens
		aiTokensTotal.WithLabelValues("prompt").Add(float64(estimatedPromptTokens))
		if response != nil {
			ec := EstimateTokens([]ChatMessage{*response})
			o.totalCompletionTokens += ec
			aiTokensTotal.WithLabelValues("completion").Add(float64(ec))
		}
	}
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

			// Trigger tool call result changed callback with original result
			if o.onToolCallResultChanged != nil {
				o.onToolCallResultChanged(ctx, toolCall.ID, resp)
			}

			// Check if tool result exceeds max size and summarize if needed
			if o.toolResultMaxSize > 0 && len(resp) > o.toolResultMaxSize {
				level.Info(logger).Log("msg", "Tool result exceeds max size, summarizing", "tool", toolCall.Function.Name, "size", len(resp), "max_size", o.toolResultMaxSize)
				summarized, err := o.summarizeToolResult(ctx, toolCall.Function.Name, resp)
				if err != nil {
					level.Error(logger).Log("msg", "Failed to summarize tool result", "error", err, "tool", toolCall.Function.Name)
					// Continue with original result if summarization fails
				} else {
					toolCall.Result = summarized
				}
			}
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
			if strings.HasPrefix(o.toolCalls[idx].Function.Name, ClientToolPrefix) {
				continue
			}
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
	if o.handoffTriggered {
		return nil, ErrClientToolHandoff
	}

	if o.currentChatStream != nil {
		for {
			resp, err := o.currentChatStream.Recv(ctx)
			if err != nil {
				if err == io.EOF {
					o.recordAPICallUsage()
					o.currentChatStream.Close()
					o.currentChatStream = nil
					o.messageID = uuid.Must(uuid.NewV4()).String()
					if o.messageBuffer.Len() > 0 {
						msg := ChatMessage{
							Role:    model.AIChatMessageRoleAssistant,
							Content: o.messageBuffer.String(),
						}
						o.appendMessage(ctx, msg)
						o.messageBuffer.Reset()
					}

					if len(o.toolCalls) > 0 {
						o.hasToolCalls = true
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
						msg := ChatMessage{
							Role:      model.AIChatMessageRoleAssistant,
							ToolCalls: toolCalls,
						}
						o.appendMessage(ctx, msg)
						return &ChatStreamEvent{
							MessageID: o.messageID,
							ToolCalls: o.toolCalls,
							EventType: EventTypeToolCall,
						}, nil
					}

					// No tool calls in this response - check if we should request JSON schema
					if o.responseJsonSchema != "" && !o.jsonSchemaRequested {
						// If we had tool calls earlier, request JSON format now
						if o.hasToolCalls {
							o.jsonSchemaRequested = true
							schemaPrompt := fmt.Sprintf("Please provide your final response in the following JSON format:\n%s", o.responseJsonSchema)
							schemaMessage := ChatMessage{
								Role:    model.AIChatMessageRoleUser,
								Content: schemaPrompt,
							}
							o.appendMessage(ctx, schemaMessage)
							// Continue to trigger a new stream
							return o.Recv(ctx)
						}
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
			var pendingClientCalls []ClientToolPendingCall
			var completedToolCalls []ToolCall
			for _, tc := range o.toolCalls {
				if strings.HasPrefix(tc.Function.Name, ClientToolPrefix) && tc.Status == ToolCallStatusPending {
					pendingClientCalls = append(pendingClientCalls, ClientToolPendingCall{
						ID:        tc.ID,
						Name:      tc.Function.Name,
						Arguments: tc.Function.Arguments,
					})
				} else {
					completedToolCalls = append(completedToolCalls, tc)
				}
			}

			if len(pendingClientCalls) > 0 {
				o.toolCalls = nil
				o.handoffTriggered = true
				return &ChatStreamEvent{
					MessageID:       o.messageID,
					EventType:       EventTypeClientToolPending,
					ToolCalls:       completedToolCalls,
					ClientToolCalls: pendingClientCalls,
				}, nil
			}

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
					// Before returning error, check if we need to request JSON schema
					if o.responseJsonSchema != "" && o.hasToolCalls && !o.jsonSchemaRequested {
						o.jsonSchemaRequested = true
						schemaPrompt := fmt.Sprintf("Please provide your final response in the following JSON format:\n%s", o.responseJsonSchema)
						schemaMessage := ChatMessage{
							Role:    model.AIChatMessageRoleUser,
							Content: schemaPrompt,
						}
						o.appendMessage(ctx, schemaMessage)
						// Don't increment iteration for JSON schema request
						// Continue to create new stream
					} else {
						return nil, fmt.Errorf("reached maximum iterations (%d) without completion", o.maxIterations)
					}
				} else {
					o.currentIteration++
				}
			}
		}

		err := o.smartChatStream(ctx)
		if err != nil {
			return nil, err
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
	if o.OnTokenUsage != nil {
		stream.onTokenUsage = o.OnTokenUsage
	}
	stream.maxTokens = o.MaxTokens
	stream.enableAutoSummarization = o.EnableAutoSummarization
	stream.toolResultMaxSize = o.ToolResultMaxSize
	stream.refreshToolSetsEachIteration = o.RefreshToolSetsEachIteration
	stream.toolSetsProvider = o.ToolSetsProvider
	if len(o.ClientTools) > 0 {
		stream.clientTools = slices.Clone(o.ClientTools)
	}
}

func (o *ClassicChatStream) rebuildToolSetsIfNeeded() error {
	if !o.refreshToolSetsEachIteration || o.toolSetsProvider == nil {
		return nil
	}
	ts, err := o.toolSetsProvider(o.ctx)
	if err != nil {
		return fmt.Errorf("failed to refresh tool sets: %w", err)
	}
	if len(o.clientTools) > 0 {
		ts[clientToolSetKey] = NewClientToolsProxy(o.clientTools)
	}
	o.toolSets = ts
	return nil
}

func (o *ClassicChatStream) smartChatStream(ctx context.Context) error {
	logger := log.GetContextLogger(ctx)
	// Check token limit and summarize if needed
	if o.maxTokens > 0 {
		currentTokens := EstimateTokens(o.messages)
		tokenThreshold := int(float64(o.maxTokens) * 0.9) // 90% threshold

		if currentTokens >= o.maxTokens {
			if !o.enableAutoSummarization {
				return fmt.Errorf("token limit exceeded (%d/%d), auto summarization is disabled", currentTokens, o.maxTokens)
			}
			if err := o.summarizeMessages(ctx); err != nil {
				return fmt.Errorf("token limit exceeded (%d/%d) and failed to summarize: %w", currentTokens, o.maxTokens, err)
			}
		} else if currentTokens >= tokenThreshold && o.enableAutoSummarization {
			if err := o.summarizeMessages(ctx); err != nil {
				logger := log.GetContextLogger(ctx)
				level.Error(logger).Log("msg", "Failed to summarize messages", "error", err)
			}
		}
	}

	if err := o.rebuildToolSetsIfNeeded(); err != nil {
		return err
	}

	stream, err := backoff.Retry(ctx, func() (ChatStream, error) {
		s, err := o.client.ChatStream(ctx, o.messages, o.toolSets)
		if err != nil {
			if _, ok := IsChatError(err, ChatErrorTypeRateLimitExceeded); ok {
				level.Warn(logger).Log("msg", "Rate limit hit, will retry with exponential backoff")
				return nil, err
			}
			return nil, backoff.Permanent(err)
		}
		return s, nil
	})
	if err != nil {
		if aiErr, ok := IsChatError(err, ChatErrorTypeMaxTokensExceeded); ok {
			if o.summaryAttempts >= maxSummaryAttempts {
				return fmt.Errorf("max tokens still exceeded after %d summarization attempts: %w", o.summaryAttempts, err)
			}
			o.summaryAttempts++
			level.Info(logger).Log("msg", "Max tokens exceeded, starting segmented summarization", "attempt", o.summaryAttempts)
			summarizedMessages, serr := o.segmentedSummarize(ctx, aiErr.Detail)
			if serr != nil {
				return fmt.Errorf("segmented summarization failed: %w", serr)
			}
			// Replace the original messages with the summarized messages
			o.messages = summarizedMessages
			if o.onSummary != nil {
				o.onSummary(ctx, o.messages)
			}
			return o.smartChatStream(ctx)
		}
		return err
	}
	o.currentChatStream = stream
	return nil
}

func (o *ClassicChatStream) segmentedSummarize(ctx context.Context, errorDetail string) ([]ChatMessage, error) {
	return segmentedSummarize(ctx, o.client, o.messages, errorDetail)
}

// segmentedSummarize performs segmented summarization on the given messages
// using tool-based iterative reading and condensing. It is usable from both
// the streaming (ClassicChatStream) and non-streaming (Exchange) code paths.
func segmentedSummarize(ctx context.Context, client AIClient, messages []ChatMessage, errorDetail string) ([]ChatMessage, error) {
	logger := log.GetContextLogger(ctx)

	messages = RedactGetSkillContentToolResultsForSummary(messages)

	summaryTS := newSummaryToolSet(messages, errorDetail)

	summarizeMessages := []ChatMessage{
		{
			Role:    model.AIChatMessageRoleSystem,
			Content: summaryTS.buildSystemPrompt(),
		},
		{
			Role:    model.AIChatMessageRoleUser,
			Content: "Begin segmented summarization. Start by fetching the first segment of messages using get_messages.",
		},
	}

	ts := toolset.ToolSets{"summary": summaryTS}

	exchangeClient := &classicChatClient{aiClient: client}
	_, err := exchangeClient.Exchange(ctx, summarizeMessages,
		WithChatToolSetsProvider(toolset.NewStaticToolSetsProvider(ts)),
		WithChatMaxIterations(50),
		WithChatToolResultMaxSize(1024*1024),
	)
	if err != nil {
		return nil, fmt.Errorf("summarization exchange failed: %w", err)
	}

	if !summaryTS.finished {
		return nil, fmt.Errorf("summarization did not produce a result: save_summary was not called by the model")
	}

	level.Info(logger).Log(
		"msg", "Segmented summarization completed",
		"original_count", len(summaryTS.messages),
		"summarized_count", len(summaryTS.summarizedMessages),
	)
	return summaryTS.summarizedMessages, nil
}

func NewClassicChatStream(ctx context.Context, client ClassicChatClient, messages []ChatMessage, options ...WithChatOptions) (ChatStream, error) {
	// Apply options with defaults
	opts := ChatCompletionOptions{
		MaxIterations:     10,
		ToolResultMaxSize: 32 * 1024, // 32KB
	}
	for _, option := range options {
		option(&opts)
	}

	toolSets := make(toolset.ToolSets)
	var err error
	if opts.ToolSetsProvider != nil {
		toolSets, err = opts.ToolSetsProvider(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tool sets: %w", err)
		}
	}
	if opts.SkillLoader != nil && opts.SkillLoader.HasSkills() {
		var skillLoaderMetadata string
		if opts.RefreshToolSetsEachIteration {
			toolsetProvider := NewSkillDrivenToolset(opts.SkillLoader, opts.ToolSetsProvider)
			if err != nil {
				return nil, fmt.Errorf("failed to get skill loader metadata: %w", err)
			}

			skillLoaderMetadata, err = toolsetProvider.GetMetadata(ctx)
			if err != nil {
				return nil, fmt.Errorf("failed to get skill loader metadata: %w", err)
			}
			opts.ToolSetsProvider = func(ctx context.Context) (toolset.ToolSets, error) {
				return toolsetProvider.ListTools(ctx)
			}
		} else {
			skillLoaderMetadata, err = opts.SkillLoader.GetMetadata()
			if err != nil {
				return nil, fmt.Errorf("failed to get skill loader metadata: %w", err)
			}
		}

		if len(messages) > 0 && messages[0].Role == model.AIChatMessageRoleSystem {
			messages[0].Content += "\n\n" + skillLoaderMetadata
		} else {
			messages = append([]ChatMessage{{
				Role:    model.AIChatMessageRoleSystem,
				Content: skillLoaderMetadata,
			}}, messages...)
		}
	}

	if len(opts.ClientTools) > 0 {
		toolSets[clientToolSetKey] = NewClientToolsProxy(opts.ClientTools)
	}

	var aiClient AIClient = client
	if opts.AIClientWrapper != nil {
		aiClient = opts.AIClientWrapper(client)
	}

	stream := &ClassicChatStream{
		client:                       aiClient,
		messages:                     messages,
		toolSets:                     toolSets,
		toolSetsProvider:             opts.ToolSetsProvider,
		clientTools:                  slices.Clone(opts.ClientTools),
		refreshToolSetsEachIteration: opts.RefreshToolSetsEachIteration,
		messageID:                    uuid.Must(uuid.NewV4()).String(),
		maxIterations:                opts.MaxIterations,
		currentIteration:             1,
		ctx:                          ctx,
	}
	stream.applyChatCompletionOptions(opts)
	// Call OpenAI API
	err = stream.smartChatStream(ctx)
	if err != nil {
		return nil, err
	}
	return stream, nil
}
