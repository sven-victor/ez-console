// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package ai

import (
	"github.com/sven-victor/ez-console/pkg/model"
)

// Prefixed name the model sees for get_skill_content (see toolset.ToolSets.GetTools).
const skillLoaderGetSkillContentToolName = "skill_loader_get_skill_content"

// RedactGetSkillContentToolResultsForSummary returns a shallow copy of messages where tool results
// for get_skill_content are replaced so summarization does not spend context on large skill bodies.
func RedactGetSkillContentToolResultsForSummary(messages []ChatMessage) []ChatMessage {
	const placeholder = "[Skill file content omitted from summarization. Call get_skill_content again if needed.]"
	idToName := make(map[string]string)
	for _, msg := range messages {
		if msg.Role != model.AIChatMessageRoleAssistant {
			continue
		}
		for _, tc := range msg.ToolCalls {
			if tc.ID != "" {
				idToName[tc.ID] = tc.Function.Name
			}
		}
	}
	out := make([]ChatMessage, len(messages))
	for i, msg := range messages {
		if msg.Role == model.AIChatMessageRoleTool && msg.ToolCallID != "" {
			if idToName[msg.ToolCallID] == skillLoaderGetSkillContentToolName {
				redacted := msg
				redacted.Content = placeholder
				out[i] = redacted
				continue
			}
		}
		out[i] = msg
	}
	return out
}
