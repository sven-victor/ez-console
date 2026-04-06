// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package ai

import (
	"context"
	"fmt"

	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

// PrepareChatCompletionSkillLoader updates opts and messages for skill metadata and optional progressive
// skill–tool binding. When SkillLoader has skills and RefreshToolSetsEachIteration is true,
// opts.ToolSetsProvider is replaced with one that calls SkillDrivenToolset.ListTools on each invocation.
// Otherwise, skill metadata is still appended using SkillLoader.GetMetadata only.
func PrepareChatCompletionSkillLoader(ctx context.Context, opts *ChatCompletionOptions, messages []ChatMessage) ([]ChatMessage, error) {
	if opts == nil || opts.SkillLoader == nil || !opts.SkillLoader.HasSkills() {
		return messages, nil
	}
	var skillLoaderMetadata string
	var err error
	if opts.RefreshToolSetsEachIteration {
		toolsetProvider := NewSkillDrivenToolset(opts.SkillLoader, opts.ToolSetsProvider)
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
		return messages, nil
	}
	out := make([]ChatMessage, 0, len(messages)+1)
	out = append(out, ChatMessage{
		Role:    model.AIChatMessageRoleSystem,
		Content: skillLoaderMetadata,
	})
	out = append(out, messages...)
	return out, nil
}
