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
	"encoding/json"
	"strings"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-console/pkg/model"
)

// ChatMessagesToAgent converts OpenAI-style ChatMessages to ez-agent messages.
// Consecutive role=tool messages are merged into a single RoleUser message with ToolResult parts.
func ChatMessagesToAgent(msgs []ChatMessage) []message.Message {
	out := make([]message.Message, 0, len(msgs))
	i := 0
	for i < len(msgs) {
		m := msgs[i]
		switch m.Role {
		case model.AIChatMessageRoleTool:
			results, next := collectToolResults(msgs, i)
			out = append(out, message.NewToolResultMessage(results...))
			i = next
		case model.AIChatMessageRoleAssistant:
			out = append(out, chatAssistantToAgent(m))
			i++
		case model.AIChatMessageRoleSystem:
			// System prompts are handled via agent.WithSystem; skip here.
			i++
		case model.AIChatMessageRolePrompt:
			out = append(out, message.NewUserText(m.Content))
			i++
		default:
			out = append(out, message.NewUserText(m.Content))
			i++
		}
	}
	return out
}

func collectToolResults(msgs []ChatMessage, start int) ([]message.ToolResult, int) {
	var results []message.ToolResult
	i := start
	for i < len(msgs) && msgs[i].Role == model.AIChatMessageRoleTool {
		m := msgs[i]
		results = append(results, message.ToolResult{
			ToolUseID: m.ToolCallID,
			OK:        true,
			Parts:     []message.Part{message.Text{Text: m.Content}},
		})
		i++
	}
	return results, i
}

func chatAssistantToAgent(m ChatMessage) message.Message {
	parts := make([]message.Part, 0, 1+len(m.ToolCalls))
	if strings.TrimSpace(m.Content) != "" {
		parts = append(parts, message.Text{Text: m.Content})
	}
	for _, tc := range m.ToolCalls {
		parts = append(parts, message.ToolUse{
			ID:    tc.ID,
			Name:  tc.Function.Name,
			Input: json.RawMessage(tc.Function.Arguments),
		})
	}
	if len(parts) == 0 {
		parts = append(parts, message.Text{Text: ""})
	}
	return message.Message{Role: message.RoleAssistant, Parts: parts}
}

// AgentMessagesToChat converts ez-agent messages to OpenAI-style ChatMessages.
// A RoleUser message with ToolResult parts expands to one role=tool ChatMessage per result.
func AgentMessagesToChat(msgs []message.Message) []ChatMessage {
	out := make([]ChatMessage, 0, len(msgs))
	for _, m := range msgs {
		out = append(out, agentMessageToChat(m)...)
	}
	return out
}

func agentMessageToChat(m message.Message) []ChatMessage {
	if m.Role == message.RoleUser {
		var results []message.ToolResult
		var texts []string
		for _, p := range m.Parts {
			switch v := p.(type) {
			case message.ToolResult:
				results = append(results, v)
			case message.Text:
				if v.Text != "" {
					texts = append(texts, v.Text)
				}
			}
		}
		if len(results) > 0 {
			out := make([]ChatMessage, 0, len(results))
			for _, r := range results {
				out = append(out, ChatMessage{
					Role:       model.AIChatMessageRoleTool,
					Content:    toolResultText(r),
					ToolCallID: r.ToolUseID,
				})
			}
			return out
		}
		return []ChatMessage{{
			Role:    model.AIChatMessageRoleUser,
			Content: strings.Join(texts, ""),
		}}
	}

	var content strings.Builder
	var toolCalls []ToolCall
	idx := 0
	for _, p := range m.Parts {
		switch v := p.(type) {
		case message.Text:
			content.WriteString(v.Text)
		case message.Reasoning:
			// Reasoning is not persisted in the OpenAI-shaped DB rows.
		case message.ToolUse:
			i := idx
			idx++
			args := string(v.Input)
			if args == "" {
				args = "{}"
			}
			toolCalls = append(toolCalls, ToolCall{
				Index: &i,
				ID:    v.ID,
				Type:  openai.ToolTypeFunction,
				Function: FunctionCall{
					Name:      v.Name,
					Arguments: args,
				},
			})
		}
	}
	return []ChatMessage{{
		Role:      model.AIChatMessageRoleAssistant,
		Content:   content.String(),
		ToolCalls: toolCalls,
	}}
}

func toolResultText(r message.ToolResult) string {
	var b strings.Builder
	for _, p := range r.Parts {
		if t, ok := p.(message.Text); ok {
			b.WriteString(t.Text)
		}
	}
	if b.Len() == 0 && r.OK {
		return ""
	}
	if b.Len() == 0 && !r.OK {
		return "tool call failed"
	}
	return b.String()
}
