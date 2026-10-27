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
	"testing"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-agent/run"
	"github.com/sven-victor/ez-agent/tool"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

func TestInterrupterInteractiveStopsApproval(t *testing.T) {
	reg := newToolSetsRegistry(func() context.Context { return context.Background() }, func(ctx context.Context) (toolset.ToolSets, error) {
		return toolset.ToolSets{
			"mcp3": toolset.NewAdHocToolSet(toolset.NewAdHocTool(openai.Tool{
				Type:     openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{Name: "delete_user", Parameters: map[string]any{"type": "object"}},
			}, func(ctx context.Context, name, parameters string) (string, error) {
				t.Fatal("approval tool must not run before a decision")
				return "", nil
			})),
		}, nil
	}, nil)
	st := &run.State{}
	intr := newUIToolInterrupter(hitlInterrupterConfig{
		Registry: reg,
		Mode:     HITLModeInteractive,
		Catalog:  HITLCatalog{"mcp3_delete_user": {Mode: HITLCardApproval}},
	})
	stop, err := intr.BeforeTools(context.Background(), st, []tool.Call{
		{ID: "c1", Name: "mcp3_delete_user", Input: []byte(`{"id":"u1"}`)},
	})
	if err != nil || !stop {
		t.Fatalf("stop=%v err=%v", stop, err)
	}
}

func TestInterrupterAutoRejectContinuesWithoutCall(t *testing.T) {
	called := false
	reg := newToolSetsRegistry(func() context.Context { return context.Background() }, func(ctx context.Context) (toolset.ToolSets, error) {
		return toolset.ToolSets{
			"mcp3": toolset.NewAdHocToolSet(toolset.NewAdHocTool(openai.Tool{
				Type:     openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{Name: "delete_user", Parameters: map[string]any{"type": "object"}},
			}, func(ctx context.Context, name, parameters string) (string, error) {
				called = true
				return "deleted", nil
			})),
			"utils1": toolset.NewAdHocToolSet(toolset.NewAdHocTool(openai.Tool{
				Type:     openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{Name: "now", Parameters: map[string]any{"type": "object"}},
			}, func(ctx context.Context, name, parameters string) (string, error) {
				return "2026-10-26", nil
			})),
		}, nil
	}, nil)
	st := &run.State{}
	intr := newUIToolInterrupter(hitlInterrupterConfig{
		Registry: reg,
		Mode:     HITLModeAutoReject,
		Catalog:  HITLCatalog{"mcp3_delete_user": {Mode: HITLCardApproval}},
	})
	stop, err := intr.BeforeTools(context.Background(), st, []tool.Call{
		{ID: "n1", Name: "utils1_now", Input: []byte(`{}`)},
		{ID: "c1", Name: "mcp3_delete_user", Input: []byte(`{"id":"u1"}`)},
	})
	if err != nil || stop {
		t.Fatalf("stop=%v err=%v", stop, err)
	}
	if called {
		t.Fatal("gated tool was executed")
	}
	if len(st.Messages) != 0 {
		t.Fatalf("auto-reject BeforeTools appended %d messages", len(st.Messages))
	}
}

func TestAutoRejectRegistryLookupDoesNotCallGatedTool(t *testing.T) {
	called := false
	inner := newToolSetsRegistry(func() context.Context { return context.Background() }, func(ctx context.Context) (toolset.ToolSets, error) {
		return toolset.ToolSets{
			"mcp3": toolset.NewAdHocToolSet(toolset.NewAdHocTool(openai.Tool{
				Type:     openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{Name: "delete_user", Parameters: map[string]any{"type": "object"}},
			}, func(ctx context.Context, name, parameters string) (string, error) {
				called = true
				return "deleted", nil
			})),
		}, nil
	}, nil)
	reg := newAutoRejectRegistry(inner, HITLCatalog{"mcp3_delete_user": {Mode: HITLCardApproval}})
	h, ok := reg.Lookup("mcp3_delete_user")
	if !ok || h == nil {
		t.Fatal("expected reject handler")
	}
	res, err := h(context.Background(), tool.Call{
		ID:    "c1",
		Name:  "mcp3_delete_user",
		Input: []byte(`{"id":"u1"}`),
	})
	if err != nil {
		t.Fatal(err)
	}
	if called {
		t.Fatal("inner Call was invoked")
	}
	if res.OK {
		t.Fatal("expected OK false")
	}
	if res.ToolUseID != "c1" {
		t.Fatalf("ToolUseID=%q", res.ToolUseID)
	}
	text, ok := res.Content[0].(message.Text)
	if !ok || text.Text != AutoRejectToolResultContent {
		t.Fatalf("content=%#v", res.Content)
	}
}

func hitlMixedToolRegistry(t *testing.T, gatedCalled *bool) tool.Registry {
	t.Helper()
	return newToolSetsRegistry(func() context.Context { return context.Background() }, func(ctx context.Context) (toolset.ToolSets, error) {
		return toolset.ToolSets{
			"mcp3": toolset.NewAdHocToolSet(toolset.NewAdHocTool(openai.Tool{
				Type:     openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{Name: "delete_user", Parameters: map[string]any{"type": "object"}},
			}, func(ctx context.Context, name, parameters string) (string, error) {
				*gatedCalled = true
				return "deleted", nil
			})),
			"utils1": toolset.NewAdHocToolSet(toolset.NewAdHocTool(openai.Tool{
				Type:     openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{Name: "now", Parameters: map[string]any{"type": "object"}},
			}, func(ctx context.Context, name, parameters string) (string, error) {
				return "2026-10-26", nil
			})),
		}, nil
	}, nil)
}

func TestLoopToolRegistryAutoRejectMixedBatch(t *testing.T) {
	catalog := HITLCatalog{"mcp3_delete_user": {Mode: HITLCardApproval}}
	var gatedCalled bool
	reg := hitlMixedToolRegistry(t, &gatedCalled)
	loopReg := loopToolRegistry(reg, HITLModeAutoReject, catalog)

	nowH, ok := loopReg.Lookup("utils1_now")
	if !ok || nowH == nil {
		t.Fatal("expected utils1_now handler")
	}
	nowRes, err := nowH(context.Background(), tool.Call{ID: "n1", Name: "utils1_now", Input: []byte(`{}`)})
	if err != nil {
		t.Fatal(err)
	}
	if !nowRes.OK {
		t.Fatalf("utils1_now OK=%v", nowRes.OK)
	}

	gatedH, ok := loopReg.Lookup("mcp3_delete_user")
	if !ok || gatedH == nil {
		t.Fatal("expected mcp3_delete_user handler")
	}
	gatedRes, err := gatedH(context.Background(), tool.Call{
		ID: "c1", Name: "mcp3_delete_user", Input: []byte(`{"id":"u1"}`),
	})
	if err != nil {
		t.Fatal(err)
	}
	if gatedCalled {
		t.Fatal("gated inner Call was invoked in auto_reject")
	}
	if gatedRes.OK {
		t.Fatal("expected OK false for gated auto-reject")
	}
	if gatedRes.ToolUseID != "c1" {
		t.Fatalf("ToolUseID=%q", gatedRes.ToolUseID)
	}
	text, ok := gatedRes.Content[0].(message.Text)
	if !ok || text.Text != AutoRejectToolResultContent {
		t.Fatalf("content=%#v", gatedRes.Content)
	}

	gatedCalled = false
	interactiveReg := loopToolRegistry(reg, HITLModeInteractive, catalog)
	innerH, ok := interactiveReg.Lookup("mcp3_delete_user")
	if !ok || innerH == nil {
		t.Fatal("expected inner gated handler")
	}
	_, err = innerH(context.Background(), tool.Call{
		ID: "c2", Name: "mcp3_delete_user", Input: []byte(`{"id":"u2"}`),
	})
	if err != nil {
		t.Fatal(err)
	}
	if !gatedCalled {
		t.Fatal("interactive loop registry must delegate gated tools to inner")
	}
}

func TestSplitPendingCallsSeparatesAutoAndCards(t *testing.T) {
	pending := &run.PendingTools{Calls: []run.PendingCall{
		{ID: "a", Name: "ui_search_users", Input: []byte(`{}`)},
		{ID: "b", Name: "ui_choose", Input: []byte(`{"title":"How?","description":"Pick a next step.","options":[{"id":"A","label":"Disable"},{"id":"B","label":"Delete"}]}`)},
		{ID: "c", Name: "mcp3_delete_user", Input: []byte(`{"id":"u1"}`)},
	}}
	auto, cards := SplitPendingCalls(pending, HITLCatalog{"mcp3_delete_user": {Mode: HITLCardApproval, Title: "Delete this user?", Description: "Delete a user by id"}})
	if len(auto) != 1 || auto[0].Name != "ui_search_users" {
		t.Fatalf("auto=%#v", auto)
	}
	if len(cards) != 2 {
		t.Fatalf("cards=%#v", cards)
	}
	if cards[0].Kind != HITLCardChoice || cards[0].ToolCallID != "b" || cards[0].Description != "Pick a next step." {
		t.Fatalf("choice=%#v", cards[0])
	}
	hasReject := false
	for _, o := range cards[0].Options {
		if o.ID == HITLOptionReject {
			hasReject = true
		}
	}
	if !hasReject {
		t.Fatal("choice card must append reject")
	}
	if cards[1].Kind != HITLCardApproval || cards[1].Title != "Delete this user?" || cards[1].Description != "Delete a user by id" {
		t.Fatalf("approval=%#v", cards[1])
	}
}
