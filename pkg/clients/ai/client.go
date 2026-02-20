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

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-console/pkg/util"
)

type SimpleChatMessage struct {
	Role    model.AIChatMessageRole `json:"role"`
	Content string                  `json:"content,omitempty"`
}

// ChatMessage represents a chat message in a unified format
type ChatMessage struct {
	Role       model.AIChatMessageRole `json:"role"`
	Content    string                  `json:"content,omitempty"`
	ToolCalls  []ToolCall              `json:"tool_calls,omitempty"`
	ToolCallID string                  `json:"tool_call_id,omitempty"`
}

// AIClient is the interface that all AI client implementations must satisfy
type AIClient interface {
	// ChatStream creates a streaming chat completion
	ChatStream(ctx context.Context, messages []ChatMessage, toolSets toolset.ToolSets) (ChatStream, error)
	// Chat creates a non-streaming chat completion
	Chat(ctx context.Context, messages []ChatMessage, toolSets toolset.ToolSets) (*ChatMessage, error)
}

type TestClient interface {
	Test(ctx context.Context) error
}

// AIClientFactory is the interface for AI client factories
type AIClientFactory interface {
	// CreateClient creates an AI client from configuration
	CreateClient(ctx context.Context, organizationID string, config map[string]interface{}) (AIClient, error)
	// GetConfigFields returns the configuration fields for frontend form rendering
	GetConfigFields() []util.ConfigField
	// GetName returns the name of the AI provider
	GetName() string
	// GetDescription returns the description of the AI provider
	GetDescription() string
}

var registeredClients = make(map[model.AIModelProvider]AIClientFactory)

// RegisterFactory registers an AI client factory for a provider
func RegisterFactory(provider model.AIModelProvider, factory AIClientFactory) error {
	if _, ok := registeredClients[provider]; ok {
		return fmt.Errorf("AI client factory for provider %s already registered", provider)
	}
	registeredClients[provider] = factory
	return nil
}

// GetFactory returns the factory for a given provider
func GetFactory(provider model.AIModelProvider) (*ClassicChatClientFactory, bool) {
	factory, ok := registeredClients[provider]
	if ok {
		return NewClassicChatClientFactory(factory), ok
	}
	return nil, false
}

// GetRegisteredFactories returns all registered factories
func GetRegisteredFactories() map[model.AIModelProvider]AIClientFactory {
	factories := make(map[model.AIModelProvider]AIClientFactory)
	for provider, factory := range registeredClients {
		factories[provider] = factory
	}
	return factories
}

// ChatMessagesFromModel converts model.AIChatMessage slice to ChatMessage slice.
// For assistant messages with ToolCalls, only ToolCalls that have a corresponding
// role=tool message (same ToolCallID) are kept. This avoids 400 errors when the
// session was interrupted during tool execution and some tool results are missing.
func ChatMessagesFromModel(messages []model.AIChatMessage) []ChatMessage {
	// Collect ToolCallIDs that have a tool response (role=tool)
	respondedToolCallIDs := make(map[string]struct{})
	for _, msg := range messages {
		if msg.Role == model.AIChatMessageRoleTool && msg.ToolCallID != "" {
			respondedToolCallIDs[msg.ToolCallID] = struct{}{}
		}
	}

	result := make([]ChatMessage, 0, len(messages))
	for _, msg := range messages {
		var toolCalls []ToolCall
		if msg.Role == model.AIChatMessageRoleAssistant && len(msg.ToolCalls) > 0 {
			// Only include ToolCalls that have a corresponding role=tool message
			for _, tc := range msg.ToolCalls {
				if _, ok := respondedToolCallIDs[tc.ID]; ok {
					toolCalls = append(toolCalls, ToolCall{
						Index: nil, // set to contiguous 0,1,2... below
						ID:    tc.ID,
						Type:  openai.ToolType(tc.Type),
						Function: FunctionCall{
							Name:      tc.Function.Name,
							Arguments: tc.Function.Arguments,
						},
					})
				}
			}
			// Re-index to contiguous 0,1,2,... for API compatibility
			for i := range toolCalls {
				idx := i
				toolCalls[i].Index = &idx
			}
		} else {
			for _, tc := range msg.ToolCalls {
				toolCalls = append(toolCalls, ToolCall{
					Index: tc.Index,
					ID:    tc.ID,
					Type:  openai.ToolType(tc.Type),
					Function: FunctionCall{
						Name:      tc.Function.Name,
						Arguments: tc.Function.Arguments,
					},
				})
			}
		}
		result = append(result, ChatMessage{
			Role:       msg.Role,
			Content:    msg.Content,
			ToolCalls:  toolCalls,
			ToolCallID: msg.ToolCallID,
		})
	}
	return result
}

// ChatMessagesToModel converts ChatMessage slice to model.AIChatMessage slice
func ChatMessagesToModel(messages []ChatMessage) []model.AIChatMessage {
	result := make([]model.AIChatMessage, 0, len(messages))
	for _, msg := range messages {
		var toolCalls model.AIToolCalls
		for _, tc := range msg.ToolCalls {
			toolCalls = append(toolCalls, model.AIToolCall{
				Index: tc.Index,
				ID:    tc.ID,
				Type:  string(tc.Type),
				Function: model.AIFunctionCall{
					Name:      tc.Function.Name,
					Arguments: tc.Function.Arguments,
				},
			})
		}
		result = append(result, model.AIChatMessage{
			Role:       msg.Role,
			Content:    msg.Content,
			ToolCalls:  toolCalls,
			ToolCallID: msg.ToolCallID,
		})
	}
	return result
}

// ChatMessageFromOpenAI converts openai.ChatCompletionMessage to ChatMessage
func ChatMessageFromOpenAI(msg openai.ChatCompletionMessage) ChatMessage {
	var toolCalls []ToolCall
	for _, tc := range msg.ToolCalls {
		toolCalls = append(toolCalls, ToolCall{
			Index: tc.Index,
			ID:    tc.ID,
			Type:  openai.ToolType(tc.Type),
			Function: FunctionCall{
				Name:      tc.Function.Name,
				Arguments: tc.Function.Arguments,
			},
		})
	}
	return ChatMessage{
		Role:       model.AIChatMessageRole(msg.Role),
		Content:    msg.Content,
		ToolCalls:  toolCalls,
		ToolCallID: msg.ToolCallID,
	}
}

// ChatMessageToOpenAI converts ChatMessage to openai.ChatCompletionMessage
func ChatMessageToOpenAI(msg ChatMessage) openai.ChatCompletionMessage {
	var toolCalls []openai.ToolCall
	for _, tc := range msg.ToolCalls {
		toolCalls = append(toolCalls, openai.ToolCall{
			Index: tc.Index,
			ID:    tc.ID,
			Type:  openai.ToolType(tc.Type),
			Function: openai.FunctionCall{
				Name:      tc.Function.Name,
				Arguments: tc.Function.Arguments,
			},
		})
	}
	return openai.ChatCompletionMessage{
		Role:       string(msg.Role),
		Content:    msg.Content,
		ToolCalls:  toolCalls,
		ToolCallID: msg.ToolCallID,
	}
}
