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
	"context"
	"encoding/json"
	"errors"
	"testing"

	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/model"
)

func TestPrepareTurnApproveCallsExecutorWithStoredArgs(t *testing.T) {
	existing := []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{{
			ID: "c1", Type: "function",
			Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: `{"id":"u1"}`},
		}},
		Metadata: MetadataWithHITLCards(model.AIChatMessageMetadata{"trace": "t1"}, []ai.HITLCard{{
			ToolCallID: "c1", Kind: ai.HITLCardApproval, Status: ai.HITLStatusPending,
			Arguments: `{"id":"forged"}`,
			Options:   ai.DefaultHITLOptions(ai.HITLCardApproval),
		}}),
	}}
	var gotName, gotArgs string
	incoming, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionApprove}},
	}, func(ctx context.Context, name, arguments string) (string, error) {
		gotName, gotArgs = name, arguments
		return `{"ok":true}`, nil
	}, nil)
	if err != nil {
		t.Fatal(err)
	}
	if gotName != "mcp3_delete_user" || gotArgs != `{"id":"u1"}` {
		t.Fatalf("exec %s %s", gotName, gotArgs)
	}
	if len(incoming) != 1 || incoming[0].Role != model.AIChatMessageRoleTool || incoming[0].ToolCallID != "c1" || incoming[0].Content != `{"ok":true}` {
		t.Fatalf("%#v", incoming)
	}
	cards := HITLCardsFromMetadata(updated[0].Metadata)
	if cards[0].Status != ai.HITLStatusDecided || cards[0].SelectedOptionID != ai.HITLOptionApprove {
		t.Fatalf("%#v", cards)
	}
	if updated[0].Metadata["trace"] != "t1" {
		t.Fatalf("metadata trace = %#v", updated[0].Metadata["trace"])
	}
	orig := HITLCardsFromMetadata(existing[0].Metadata)
	if orig[0].Status != ai.HITLStatusPending || orig[0].SelectedOptionID != "" {
		t.Fatalf("caller metadata mutated: %#v", orig)
	}
}

func TestPrepareTurnApprovePersistFailureDoesNotCallExecutor(t *testing.T) {
	existing := approvalPendingMessages("c1", `{"id":"u1"}`)
	execCalled := false
	_, _, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionApprove}},
	}, func(ctx context.Context, name, arguments string) (string, error) {
		execCalled = true
		return `{"ok":true}`, nil
	}, func(messages []model.AIChatMessage) error {
		cards := HITLCardsFromMetadata(messages[0].Metadata)
		if len(cards) != 1 || cards[0].Status != ai.HITLStatusDecided || cards[0].SelectedOptionID != ai.HITLOptionApprove {
			t.Fatalf("persist saw %#v", cards)
		}
		return errors.New("db down")
	})
	if err == nil || err.Error() != "db down" {
		t.Fatalf("err=%v execCalled=%v", err, execCalled)
	}
	if execCalled {
		t.Fatal("exec ran after persist failure")
	}
	orig := HITLCardsFromMetadata(existing[0].Metadata)
	if orig[0].Status != ai.HITLStatusPending {
		t.Fatalf("caller metadata mutated: %#v", orig)
	}
}

func TestPrepareTurnRejectDoesNotCallExecutor(t *testing.T) {
	existing := []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{{
			ID: "c1", Type: "function",
			Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: `{"id":"u1"}`},
		}},
		Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{{
			ToolCallID: "c1", Kind: ai.HITLCardApproval, Status: ai.HITLStatusPending,
			Options: ai.DefaultHITLOptions(ai.HITLCardApproval),
		}}),
	}}
	incoming, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionReject}},
	}, execMustNotRun(t), nil)
	if err != nil {
		t.Fatal(err)
	}
	if len(incoming) != 1 || incoming[0].Role != model.AIChatMessageRoleTool || incoming[0].ToolCallID != "c1" || incoming[0].Content != `{"error":"user rejected the tool call"}` {
		t.Fatalf("%#v", incoming)
	}
	cards := HITLCardsFromMetadata(updated[0].Metadata)
	if cards[0].Status != ai.HITLStatusDecided || cards[0].SelectedOptionID != ai.HITLOptionReject {
		t.Fatalf("%#v", cards)
	}
}

func TestPrepareTurnChoiceWritesSelected(t *testing.T) {
	existing := []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{{
			ID: "c1", Type: "function",
			Function: model.AIFunctionCall{Name: ai.UIChooseToolName, Arguments: `{"title":"How should I proceed?"}`},
		}},
		Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{{
			ToolCallID: "c1", Kind: ai.HITLCardChoice, Status: ai.HITLStatusPending,
			ToolName: ai.UIChooseToolName,
			Options: []ai.HITLOption{
				{ID: "A", Label: "Disable the user"},
				{ID: "B", Label: "Delete the user"},
				{ID: ai.HITLOptionReject, Label: "Don't execute"},
			},
		}}),
	}}
	incoming, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: "B"}},
	}, execMustNotRun(t), nil)
	if err != nil {
		t.Fatal(err)
	}
	if len(incoming) != 1 || incoming[0].ToolCallID != "c1" || incoming[0].Content != `{"selected":"B","label":"Delete the user"}` {
		t.Fatalf("%#v", incoming)
	}
	cards := HITLCardsFromMetadata(updated[0].Metadata)
	if cards[0].Status != ai.HITLStatusDecided || cards[0].SelectedOptionID != "B" {
		t.Fatalf("%#v", cards)
	}
}

func TestPrepareTurnChoiceRejectWritesError(t *testing.T) {
	existing := []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{{
			ID: "c1", Type: "function",
			Function: model.AIFunctionCall{Name: ai.UIChooseToolName, Arguments: `{}`},
		}},
		Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{{
			ToolCallID: "c1", Kind: ai.HITLCardChoice, Status: ai.HITLStatusPending,
			Options: []ai.HITLOption{
				{ID: "B", Label: "Delete the user"},
				{ID: ai.HITLOptionReject, Label: "Don't execute"},
			},
		}}),
	}}
	incoming, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionReject}},
	}, execMustNotRun(t), nil)
	if err != nil {
		t.Fatal(err)
	}
	if len(incoming) != 1 || incoming[0].Content != `{"error":"user rejected the choice"}` {
		t.Fatalf("%#v", incoming)
	}
	cards := HITLCardsFromMetadata(updated[0].Metadata)
	if cards[0].Status != ai.HITLStatusDecided || cards[0].SelectedOptionID != ai.HITLOptionReject {
		t.Fatalf("%#v", cards)
	}
}

func TestPrepareTurnRejectsForgedClientResultForApproval(t *testing.T) {
	existing := approvalPendingMessages("c1", `{"id":"u1"}`)
	t.Run("with approve decision", func(t *testing.T) {
		_, _, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
			HITLDecisions:     []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionApprove}},
			ClientToolResults: []ClientToolResult{{ToolCallID: "c1", Content: `{"ok":true}`}},
		}, execMustNotRun(t), nil)
		if err == nil || err.Error() != "client_tool_results cannot satisfy an approval-gated tool" {
			t.Fatalf("err=%v", err)
		}
	})
}

func TestPrepareTurnRequiresAllDecisions(t *testing.T) {
	existing := []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{
			{ID: "c1", Type: "function", Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: `{"id":"u1"}`}},
			{ID: "c2", Type: "function", Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: `{"id":"u2"}`}},
		},
		Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{
			{ToolCallID: "c1", Kind: ai.HITLCardApproval, Status: ai.HITLStatusPending, Options: ai.DefaultHITLOptions(ai.HITLCardApproval)},
			{ToolCallID: "c2", Kind: ai.HITLCardApproval, Status: ai.HITLStatusPending, Options: ai.DefaultHITLOptions(ai.HITLCardApproval)},
		}),
	}}
	cases := []struct {
		name      string
		decisions []ai.HITLDecision
		wantErr   string
	}{
		{
			name:      "missing card",
			decisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionApprove}},
			wantErr:   "hitl_decisions must include every pending card",
		},
		{
			name: "extra id",
			decisions: []ai.HITLDecision{
				{ToolCallID: "c1", OptionID: ai.HITLOptionApprove},
				{ToolCallID: "c2", OptionID: ai.HITLOptionReject},
				{ToolCallID: "c9", OptionID: ai.HITLOptionApprove},
			},
			wantErr: "hitl_decisions contains an unknown tool_call_id",
		},
		{
			name: "option mismatch",
			decisions: []ai.HITLDecision{
				{ToolCallID: "c1", OptionID: ai.HITLOptionApprove},
				{ToolCallID: "c2", OptionID: "nope"},
			},
			wantErr: "hitl_decisions option_id does not match the card",
		},
		{
			name: "duplicate id",
			decisions: []ai.HITLDecision{
				{ToolCallID: "c1", OptionID: ai.HITLOptionApprove},
				{ToolCallID: "c1", OptionID: ai.HITLOptionReject},
			},
			wantErr: "hitl_decisions contains a duplicate tool_call_id",
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			incoming, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
				HITLDecisions: tc.decisions,
			}, execMustNotRun(t), nil)
			if err == nil || err.Error() != tc.wantErr {
				t.Fatalf("err=%v", err)
			}
			if incoming != nil || updated != nil {
				t.Fatalf("incoming=%#v updated=%#v", incoming, updated)
			}
		})
	}

	t.Run("decided card is not required", func(t *testing.T) {
		rows := []model.AIChatMessage{{
			Role: model.AIChatMessageRoleAssistant,
			ToolCalls: model.AIToolCalls{{
				ID: "c1", Type: "function",
				Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: `{"id":"u1"}`},
			}},
			Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{
				{ToolCallID: "c1", Kind: ai.HITLCardApproval, Status: ai.HITLStatusPending, Options: ai.DefaultHITLOptions(ai.HITLCardApproval)},
				{ToolCallID: "old", Kind: ai.HITLCardApproval, Status: ai.HITLStatusDecided, SelectedOptionID: ai.HITLOptionReject, Options: ai.DefaultHITLOptions(ai.HITLCardApproval)},
			}),
		}}
		_, updated, err := PrepareTurn(context.Background(), rows, ChatTurnInput{
			HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionReject}},
		}, execMustNotRun(t), nil)
		if err != nil {
			t.Fatal(err)
		}
		cards := HITLCardsFromMetadata(updated[0].Metadata)
		if cards[0].Status != ai.HITLStatusDecided || cards[1].Status != ai.HITLStatusDecided || cards[1].SelectedOptionID != ai.HITLOptionReject {
			t.Fatalf("%#v", cards)
		}
	})
}

func TestPrepareTurnPendingCardsRequireDecisions(t *testing.T) {
	existing := approvalPendingMessages("c1", `{"id":"u1"}`)
	_, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		ClientToolResults: []ClientToolResult{{ToolCallID: "call_auto", Content: `{"ok":true}`}},
	}, execMustNotRun(t), nil)
	if err == nil || err.Error() != "pending HITL cards require hitl_decisions" {
		t.Fatalf("err=%v", err)
	}
	if updated != nil {
		t.Fatalf("updated=%#v", updated)
	}
}

func TestPrepareTurnRequiresDecisionsWhenClientResultsAndContent(t *testing.T) {
	existing := approvalPendingMessages("c1", `{"id":"u1"}`)
	incoming, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		Content:           "also sending user text",
		ClientToolResults: []ClientToolResult{{ToolCallID: "call_auto", Content: `{"ok":true}`}},
	}, execMustNotRun(t), nil)
	if err == nil || err.Error() != "pending HITL cards require hitl_decisions" {
		t.Fatalf("err=%v", err)
	}
	if incoming != nil {
		t.Fatalf("incoming=%#v", incoming)
	}
	if updated != nil {
		t.Fatalf("updated=%#v", updated)
	}
}

func TestPrepareTurnApproveExecutorErrorBecomesToolContent(t *testing.T) {
	existing := approvalPendingMessages("c1", `{"id":"u1"}`)
	t.Run("plain", func(t *testing.T) {
		incoming, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
			HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionApprove}},
		}, func(ctx context.Context, name, arguments string) (string, error) {
			return "", errors.New("boom")
		}, nil)
		if err != nil {
			t.Fatal(err)
		}
		if len(incoming) != 1 || incoming[0].Content != `{"error":"boom"}` {
			t.Fatalf("%#v", incoming)
		}
		cards := HITLCardsFromMetadata(updated[0].Metadata)
		if cards[0].Status != ai.HITLStatusDecided || cards[0].SelectedOptionID != ai.HITLOptionApprove {
			t.Fatalf("%#v", cards)
		}
	})
	t.Run("quote", func(t *testing.T) {
		incoming, _, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
			HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionApprove}},
		}, func(ctx context.Context, name, arguments string) (string, error) {
			return `{"ok":true}`, errors.New(`say "no"`)
		}, nil)
		if err != nil {
			t.Fatal(err)
		}
		if len(incoming) != 1 || incoming[0].Content != `{"error":"say \"no\""}` {
			t.Fatalf("%#v", incoming)
		}
	})
}

func TestPrepareTurnAppendsClientResultsThenContent(t *testing.T) {
	existing := []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{
			{ID: "c1", Type: "function", Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: `{"id":"u1"}`}},
			{ID: "call_auto", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
		},
		Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{{
			ToolCallID: "c1", Kind: ai.HITLCardApproval, Status: ai.HITLStatusPending,
			Options: ai.DefaultHITLOptions(ai.HITLCardApproval),
		}}),
	}}
	incoming, _, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		Content: "thanks",
		ClientToolResults: []ClientToolResult{
			{ToolCallID: "call_auto", Content: `{"users":1}`},
		},
		HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionReject}},
	}, execMustNotRun(t), nil)
	if err != nil {
		t.Fatal(err)
	}
	if len(incoming) != 3 {
		t.Fatalf("%#v", incoming)
	}
	if incoming[0].ToolCallID != "c1" || incoming[0].Content != `{"error":"user rejected the tool call"}` {
		t.Fatalf("decision %#v", incoming[0])
	}
	if incoming[1].Role != model.AIChatMessageRoleTool || incoming[1].ToolCallID != "call_auto" || incoming[1].Content != `{"users":1}` {
		t.Fatalf("client %#v", incoming[1])
	}
	if incoming[2].Role != model.AIChatMessageRoleUser || incoming[2].Content != "thanks" {
		t.Fatalf("user %#v", incoming[2])
	}
}

func TestPrepareTurnAppliesDecisionsInCardOrder(t *testing.T) {
	existing := []model.AIChatMessage{
		{
			Role: model.AIChatMessageRoleAssistant,
			ToolCalls: model.AIToolCalls{{
				ID: "choice1", Type: "function",
				Function: model.AIFunctionCall{Name: ai.UIChooseToolName, Arguments: `{}`},
			}},
			Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{{
				ToolCallID: "choice1", Kind: ai.HITLCardChoice, Status: ai.HITLStatusPending,
				Options: []ai.HITLOption{{ID: "B", Label: "Delete the user"}, {ID: ai.HITLOptionReject, Label: "Don't execute"}},
			}}),
		},
		{Role: model.AIChatMessageRoleUser, Content: "older"},
		{
			Role: model.AIChatMessageRoleAssistant,
			ToolCalls: model.AIToolCalls{{
				ID: "c1", Type: "function",
				Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: `{"id":"u1"}`},
			}},
			Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{{
				ToolCallID: "c1", Kind: ai.HITLCardApproval, Status: ai.HITLStatusPending,
				Options: ai.DefaultHITLOptions(ai.HITLCardApproval),
			}}),
		},
	}
	incoming, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		HITLDecisions: []ai.HITLDecision{
			{ToolCallID: "c1", OptionID: ai.HITLOptionReject},
			{ToolCallID: "choice1", OptionID: "B"},
		},
	}, execMustNotRun(t), nil)
	if err != nil {
		t.Fatal(err)
	}
	if len(incoming) != 2 || incoming[0].ToolCallID != "choice1" || incoming[0].Content != `{"selected":"B","label":"Delete the user"}` || incoming[1].ToolCallID != "c1" {
		t.Fatalf("%#v", incoming)
	}
	first := HITLCardsFromMetadata(updated[0].Metadata)
	second := HITLCardsFromMetadata(updated[2].Metadata)
	if first[0].Status != ai.HITLStatusDecided || first[0].SelectedOptionID != "B" {
		t.Fatalf("first %#v", first)
	}
	if second[0].Status != ai.HITLStatusDecided || second[0].SelectedOptionID != ai.HITLOptionReject {
		t.Fatalf("second %#v", second)
	}
	if HITLCardsFromMetadata(existing[0].Metadata)[0].Status != ai.HITLStatusPending {
		t.Fatal("caller metadata mutated")
	}
}

func TestPrepareTurnOrphanAbandonsPendingCards(t *testing.T) {
	existing := []model.AIChatMessage{
		{
			Role: model.AIChatMessageRoleAssistant,
			ToolCalls: model.AIToolCalls{
				{ID: "c1", Type: "function", Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: `{"id":"u1"}`}},
				{ID: "call_auto", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
			},
			Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{{
				ToolCallID: "c1", Kind: ai.HITLCardApproval, Status: ai.HITLStatusPending,
				Options: ai.DefaultHITLOptions(ai.HITLCardApproval),
			}}),
		},
		{Role: model.AIChatMessageRoleUser, Content: "older"},
	}
	incoming, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		Content: "show roles",
	}, execMustNotRun(t), nil)
	if err != nil {
		t.Fatal(err)
	}
	if len(incoming) != 3 {
		t.Fatalf("%#v", incoming)
	}
	if incoming[0].Role != model.AIChatMessageRoleTool || incoming[0].ToolCallID != "c1" || incoming[0].Content != `{"error":"user continued the conversation without answering the confirmation"}` {
		t.Fatalf("abandoned %#v", incoming[0])
	}
	if incoming[1].Role != model.AIChatMessageRoleTool || incoming[1].ToolCallID != "call_auto" || incoming[1].Content != OrphanToolResultContent {
		t.Fatalf("orphan %#v", incoming[1])
	}
	if incoming[2].Role != model.AIChatMessageRoleUser || incoming[2].Content != "show roles" {
		t.Fatalf("user %#v", incoming[2])
	}
	cards := HITLCardsFromMetadata(updated[0].Metadata)
	if cards[0].Status != ai.HITLStatusAbandoned || cards[0].SelectedOptionID != "" {
		t.Fatalf("%#v", cards)
	}
	if HITLCardsFromMetadata(existing[0].Metadata)[0].Status != ai.HITLStatusPending {
		t.Fatal("caller metadata mutated")
	}
}

func TestPrepareTurnOrphanRepairsUnpairedCallsWithoutCards(t *testing.T) {
	existing := []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{{
			ID: "call_1", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`},
		}},
	}}
	incoming, _, err := PrepareTurn(context.Background(), existing, ChatTurnInput{Content: "show roles"}, nil, nil)
	if err != nil {
		t.Fatal(err)
	}
	if len(incoming) != 2 || incoming[0].ToolCallID != "call_1" || incoming[0].Content != OrphanToolResultContent || incoming[1].Content != "show roles" {
		t.Fatalf("%#v", incoming)
	}
}

func TestPrepareTurnSkipsOrphanWhenDecisionsPresent(t *testing.T) {
	existing := []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{
			{ID: "c1", Type: "function", Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: `{"id":"u1"}`}},
			{ID: "call_auto", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
		},
		Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{{
			ToolCallID: "c1", Kind: ai.HITLCardApproval, Status: ai.HITLStatusPending,
			Options: ai.DefaultHITLOptions(ai.HITLCardApproval),
		}}),
	}}
	incoming, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		Content:       "continue",
		HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionReject}},
	}, execMustNotRun(t), nil)
	if err != nil {
		t.Fatal(err)
	}
	if len(incoming) != 2 {
		t.Fatalf("%#v", incoming)
	}
	if incoming[0].ToolCallID != "c1" || incoming[0].Content != `{"error":"user rejected the tool call"}` {
		t.Fatalf("decision %#v", incoming[0])
	}
	if incoming[1].Role != model.AIChatMessageRoleUser || incoming[1].Content != "continue" {
		t.Fatalf("user %#v", incoming[1])
	}
	for _, msg := range incoming {
		if msg.ToolCallID == "call_auto" || msg.Content == `{"error":"user continued the conversation without answering the confirmation"}` {
			t.Fatalf("orphan synthesized: %#v", incoming)
		}
	}
	cards := HITLCardsFromMetadata(updated[0].Metadata)
	if cards[0].Status != ai.HITLStatusDecided || cards[0].SelectedOptionID != ai.HITLOptionReject {
		t.Fatalf("%#v", cards)
	}
}

func TestPrepareTurnSkipsOrphanWhenClientResultsPresent(t *testing.T) {
	existing := []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{
			{ID: "call_1", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
			{ID: "call_2", Type: "function", Function: model.AIFunctionCall{Name: "ui_search_users", Arguments: `{}`}},
		},
	}}
	incoming, _, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		ClientToolResults: []ClientToolResult{{ToolCallID: "call_1", Content: `{"ok":true}`}},
	}, nil, nil)
	if err != nil {
		t.Fatal(err)
	}
	if len(incoming) != 1 || incoming[0].ToolCallID != "call_1" || incoming[0].Content != `{"ok":true}` {
		t.Fatalf("%#v", incoming)
	}
}

func TestPrepareTurnDecidesJSONScanCards(t *testing.T) {
	raw := []byte(`{"trace":"t1","hitl_cards":[{"tool_call_id":"c1","kind":"approval","tool_name":"mcp3_delete_user","arguments":"{\"id\":\"forged\"}","options":[{"id":"approve","label":"Execute","primary":true},{"id":"reject","label":"Don't execute"}],"status":"pending"}]}`)
	var meta model.AIChatMessageMetadata
	if err := json.Unmarshal(raw, &meta); err != nil {
		t.Fatal(err)
	}
	existing := []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{{
			ID: "c1", Type: "function",
			Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: `{"id":"u1"}`},
		}},
		Metadata: meta,
	}}
	_, updated, err := PrepareTurn(context.Background(), existing, ChatTurnInput{
		HITLDecisions: []ai.HITLDecision{{ToolCallID: "c1", OptionID: ai.HITLOptionReject}},
	}, execMustNotRun(t), nil)
	if err != nil {
		t.Fatal(err)
	}
	cards := HITLCardsFromMetadata(updated[0].Metadata)
	if len(cards) != 1 || cards[0].Status != ai.HITLStatusDecided || cards[0].SelectedOptionID != ai.HITLOptionReject {
		t.Fatalf("%#v", cards)
	}
	if updated[0].Metadata["trace"] != "t1" {
		t.Fatalf("trace %#v", updated[0].Metadata["trace"])
	}
	if HITLCardsFromMetadata(existing[0].Metadata)[0].Status != ai.HITLStatusPending {
		t.Fatal("caller metadata mutated")
	}
}

func approvalPendingMessages(id, args string) []model.AIChatMessage {
	return []model.AIChatMessage{{
		Role: model.AIChatMessageRoleAssistant,
		ToolCalls: model.AIToolCalls{{
			ID: id, Type: "function",
			Function: model.AIFunctionCall{Name: "mcp3_delete_user", Arguments: args},
		}},
		Metadata: MetadataWithHITLCards(nil, []ai.HITLCard{{
			ToolCallID: id, Kind: ai.HITLCardApproval, Status: ai.HITLStatusPending,
			Options: ai.DefaultHITLOptions(ai.HITLCardApproval),
		}}),
	}}
}

func execMustNotRun(t *testing.T) ToolExecutor {
	t.Helper()
	return func(ctx context.Context, name, arguments string) (string, error) {
		t.Fatalf("executor called for %s %s", name, arguments)
		return "", nil
	}
}
