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

package service

import (
	"testing"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/model"
)

func TestChatMessagesToAgentRoundTripToolBatch(t *testing.T) {
	in := []ai.ChatMessage{
		{Role: model.AIChatMessageRoleUser, Content: "hi"},
		{
			Role: model.AIChatMessageRoleAssistant,
			ToolCalls: []ai.ToolCall{
				{ID: "a", Type: openai.ToolTypeFunction, Function: ai.FunctionCall{Name: "echo", Arguments: `{"text":"x"}`}},
				{ID: "b", Type: openai.ToolTypeFunction, Function: ai.FunctionCall{Name: "ui_nav", Arguments: `{}`}},
			},
		},
		{Role: model.AIChatMessageRoleTool, Content: `{"text":"x"}`, ToolCallID: "a"},
	}
	agentMsgs := ai.ChatMessagesToAgent(in)
	if len(agentMsgs) != 3 {
		t.Fatalf("expected 3 agent messages, got %d", len(agentMsgs))
	}
	if agentMsgs[1].Role != message.RoleAssistant || len(message.ToolUses(agentMsgs[1])) != 2 {
		t.Fatalf("assistant tool uses: %#v", agentMsgs[1])
	}
	if agentMsgs[2].Role != message.RoleUser {
		t.Fatalf("tool results role: %s", agentMsgs[2].Role)
	}
	back := ai.AgentMessagesToChat(agentMsgs)
	if len(back) != 3 {
		t.Fatalf("round-trip len=%d", len(back))
	}
	if back[2].ToolCallID != "a" {
		t.Fatalf("tool call id=%s", back[2].ToolCallID)
	}
}

func TestChatMessagesFromModelAllKeepsUnpaired(t *testing.T) {
	rows := []model.AIChatMessage{
		{Role: model.AIChatMessageRoleAssistant, ToolCalls: model.AIToolCalls{
			{ID: "a", Type: "function", Function: model.AIFunctionCall{Name: "echo", Arguments: `{}`}},
			{ID: "b", Type: "function", Function: model.AIFunctionCall{Name: "ui_x", Arguments: `{}`}},
		}},
		{Role: model.AIChatMessageRoleTool, Content: "ok", ToolCallID: "a"},
	}
	filtered := ChatMessagesFromModel(rows)
	if len(filtered) == 0 || len(filtered[0].ToolCalls) != 1 {
		t.Fatalf("filtered should keep only paired call, got %#v", filtered)
	}
	all := ChatMessagesFromModelAll(rows)
	if len(all) == 0 || len(all[0].ToolCalls) != 2 {
		t.Fatalf("all should keep unpaired calls, got %#v", all)
	}
}
