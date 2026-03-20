// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package ai

import (
	"testing"

	"github.com/sven-victor/ez-console/pkg/model"
)

func TestRedactGetSkillContentToolResultsForSummary(t *testing.T) {
	msgs := []ChatMessage{
		{Role: model.AIChatMessageRoleAssistant, ToolCalls: []ToolCall{{
			ID: "call-1",
			Function: FunctionCall{
				Name:      skillLoaderGetSkillContentToolName,
				Arguments: `{"skill_id":"s1"}`,
			},
		}}},
		{Role: model.AIChatMessageRoleTool, ToolCallID: "call-1", Content: "HUGE SKILL BODY"},
		{Role: model.AIChatMessageRoleAssistant, Content: "ok"},
	}
	out := RedactGetSkillContentToolResultsForSummary(msgs)
	if out[1].Content == msgs[1].Content {
		t.Fatal("expected tool result to be redacted")
	}
	if len(out[0].ToolCalls) != 1 || out[0].ToolCalls[0].ID != "call-1" {
		t.Fatal("assistant tool-call message should be unchanged")
	}
	if out[2].Content != "ok" {
		t.Fatalf("user-facing message changed: %q", out[2].Content)
	}
}
