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
	"time"

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

func TestFindUnpairedToolCallsLastAssistantOrphan(t *testing.T) {
	rows := []model.AIChatMessage{
		{Role: model.AIChatMessageRoleUser, Content: "filter disabled users"},
		{Role: model.AIChatMessageRoleAssistant, ToolCalls: model.AIToolCalls{
			{ID: "call_1", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
		}},
	}
	got := FindUnpairedToolCalls(rows)
	if len(got) != 1 || got[0].ID != "call_1" {
		t.Fatalf("expected orphan call_1, got %#v", got)
	}
}

func TestFindUnpairedToolCallsMixedBatchOnlyUnpaired(t *testing.T) {
	rows := []model.AIChatMessage{
		{Role: model.AIChatMessageRoleAssistant, ToolCalls: model.AIToolCalls{
			{ID: "srv_1", Type: "function", Function: model.AIFunctionCall{Name: "utils1_now", Arguments: `{}`}},
			{ID: "call_1", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
		}},
		{Role: model.AIChatMessageRoleTool, Content: "2026-10-25", ToolCallID: "srv_1"},
	}
	got := FindUnpairedToolCalls(rows)
	if len(got) != 1 || got[0].ID != "call_1" {
		t.Fatalf("expected only orphan call_1, got %#v", got)
	}
}

func TestFindUnpairedToolCallsAllPaired(t *testing.T) {
	rows := []model.AIChatMessage{
		{Role: model.AIChatMessageRoleAssistant, ToolCalls: model.AIToolCalls{
			{ID: "call_1", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
		}},
		{Role: model.AIChatMessageRoleTool, Content: `{"ok":true}`, ToolCallID: "call_1"},
	}
	if got := FindUnpairedToolCalls(rows); len(got) != 0 {
		t.Fatalf("expected no orphans, got %#v", got)
	}
}

func TestFindUnpairedToolCallsOrphanNotLast(t *testing.T) {
	rows := []model.AIChatMessage{
		{Role: model.AIChatMessageRoleAssistant, ToolCalls: model.AIToolCalls{
			{ID: "call_1", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
		}},
		{Role: model.AIChatMessageRoleUser, Content: "never mind, show roles"},
	}
	got := FindUnpairedToolCalls(rows)
	if len(got) != 1 || got[0].ID != "call_1" {
		t.Fatalf("expected orphan earlier in history, got %#v", got)
	}
}

func TestRepairOrphanToolCallsPlainTextPrependsSyntheticResults(t *testing.T) {
	existing := []model.AIChatMessage{
		{Role: model.AIChatMessageRoleAssistant, ToolCalls: model.AIToolCalls{
			{ID: "call_1", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
		}},
	}
	incoming := []ai.ChatMessage{{Role: model.AIChatMessageRoleUser, Content: "show roles"}}
	got := RepairOrphanToolCalls(existing, incoming, false)
	if len(got) != 2 {
		t.Fatalf("expected [tool, user], got %#v", got)
	}
	if got[0].Role != model.AIChatMessageRoleTool || got[0].ToolCallID != "call_1" {
		t.Fatalf("first incoming should be synthetic tool for call_1, got %#v", got[0])
	}
	if got[0].Content != OrphanToolResultContent {
		t.Fatalf("synthetic content=%q", got[0].Content)
	}
	if got[1].Role != model.AIChatMessageRoleUser || got[1].Content != "show roles" {
		t.Fatalf("user message should follow synthetic tools, got %#v", got[1])
	}
}

func TestRepairOrphanToolCallsSkipsWhenClientResultsPresent(t *testing.T) {
	existing := []model.AIChatMessage{
		{Role: model.AIChatMessageRoleAssistant, ToolCalls: model.AIToolCalls{
			{ID: "call_1", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
		}},
	}
	incoming := []ai.ChatMessage{{
		Role:       model.AIChatMessageRoleTool,
		Content:    `{"ok":true}`,
		ToolCallID: "call_1",
	}}
	got := RepairOrphanToolCalls(existing, incoming, true)
	if len(got) != 1 || got[0].ToolCallID != "call_1" || got[0].Content != `{"ok":true}` {
		t.Fatalf("HITL second turn must not synthesize results, got %#v", got)
	}
}

func TestRepairOrphanToolCallsHistoryPairsAfterSyntheticResults(t *testing.T) {
	rows := []model.AIChatMessage{
		{Role: model.AIChatMessageRoleAssistant, ToolCalls: model.AIToolCalls{
			{ID: "call_1", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
		}},
	}
	incoming := RepairOrphanToolCalls(rows, []ai.ChatMessage{{
		Role:    model.AIChatMessageRoleUser,
		Content: "show roles",
	}}, false)
	history := append(ChatMessagesFromModelAll(rows), incoming...)
	agentMsgs := ai.ChatMessagesToAgent(history)
	uses := unpairedToolUseIDs(agentMsgs)
	if len(uses) != 0 {
		t.Fatalf("repaired history still has unpaired tool uses: %v", uses)
	}
}

func TestAssignIncreasingMessageTimes(t *testing.T) {
	start := time.Date(2026, 10, 25, 15, 0, 0, 0, time.UTC)
	rows := []*model.AIChatMessage{
		{Role: model.AIChatMessageRoleTool, ToolCallID: "call_1"},
		{Role: model.AIChatMessageRoleUser, Content: "show roles"},
	}
	assignIncreasingMessageTimes(rows, start)
	if !rows[0].MessageTime.Equal(start) {
		t.Fatalf("first time=%s", rows[0].MessageTime)
	}
	if rows[1].MessageTime.Sub(rows[0].MessageTime) != time.Microsecond {
		t.Fatalf("expected 1µs gap, got %s then %s", rows[0].MessageTime, rows[1].MessageTime)
	}
}

func unpairedToolUseIDs(msgs []message.Message) []string {
	results := make(map[string]struct{})
	var uses []string
	for _, msg := range msgs {
		for _, p := range msg.Parts {
			switch v := p.(type) {
			case message.ToolResult:
				results[v.ToolUseID] = struct{}{}
			}
		}
	}
	for _, msg := range msgs {
		for _, p := range msg.Parts {
			if use, ok := p.(message.ToolUse); ok {
				if _, paired := results[use.ID]; !paired {
					uses = append(uses, use.ID)
				}
			}
		}
	}
	return uses
}
