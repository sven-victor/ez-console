// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package service

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	openai "github.com/sashabaranov/go-openai"
	"github.com/sashabaranov/go-openai/jsonschema"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

// SkillLoaderOptions configures optional hooks for SkillLoaderToolSet.
type SkillLoaderOptions struct {
	// OnSkillContentLoaded is called after get_skill_content returns successfully (any path).
	OnSkillContentLoaded func(ctx context.Context, skillID string) error
}

// SkillLoaderToolSet is a runtime-only toolset that exposes get_skill_content for skills allowed by domains/skillIDs.
type SkillLoaderToolSet struct {
	skillService *SkillService
	allowedIDs   map[string]struct{}
	onLoaded     func(ctx context.Context, skillID string) error
}

func (s SkillLoaderToolSet) GetAllowedIDs() []string {
	keys := make([]string, 0, len(s.allowedIDs))
	for k := range s.allowedIDs {
		keys = append(keys, k)
	}
	return keys
}

// NewSkillLoaderToolSet creates a toolset that allows loading only the given skills (resolved from domains + skillIDs).
func NewSkillLoaderToolSet(ctx context.Context, skillService *SkillService, skillIDs []string, opts *SkillLoaderOptions) toolset.ToolSet {
	allowed := make(map[string]struct{})
	for _, id := range skillIDs {
		if id == "" {
			continue
		}
		allowed[id] = struct{}{}
	}
	var onLoaded func(ctx context.Context, skillID string) error
	if opts != nil {
		onLoaded = opts.OnSkillContentLoaded
	}
	return &SkillLoaderToolSet{skillService: skillService, allowedIDs: allowed, onLoaded: onLoaded}
}

func (t *SkillLoaderToolSet) GetName() string { return "skill_loader" }
func (t *SkillLoaderToolSet) GetDescription() string {
	return "Load skill file content on demand"
}
func (t *SkillLoaderToolSet) Validate() error                { return nil }
func (t *SkillLoaderToolSet) Test(ctx context.Context) error { return nil }

func (t *SkillLoaderToolSet) ListTools(ctx context.Context) ([]openai.Tool, error) {
	return []openai.Tool{
		{
			Type: openai.ToolTypeFunction,
			Function: &openai.FunctionDefinition{
				Name:        "get_skill_content",
				Description: "Load the full content of a skill (SKILL.md and related .md files) or a specific file under the skill. Use skill_id from the available skills list; path is optional (e.g. SKILL.md or REFERENCE/foo.md). Omit path to get the full combined skill content.",
				Parameters: jsonschema.Definition{
					Type: jsonschema.Object,
					Properties: map[string]jsonschema.Definition{
						"skill_id": {
							Type:        jsonschema.String,
							Description: "Skill ID (resource_id from the available skills list)",
							Enum:        t.GetAllowedIDs(),
						},
						"path": {Type: jsonschema.String, Description: "Optional: path to a specific file (e.g. SKILL.md, REFERENCE/foo.md). Omit to load full skill content."},
					},
					Required: []string{"skill_id"},
				},
			},
		},
	}, nil
}

func (t *SkillLoaderToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	switch name {
	case "get_skill_content":
		var params struct {
			SkillID string `json:"skill_id"`
			Path    string `json:"path"`
		}
		if err := json.Unmarshal([]byte(parameters), &params); err != nil {
			return "", fmt.Errorf("failed to unmarshal parameters: %w", err)
		}
		if params.SkillID == "" {
			return "", fmt.Errorf("skill_id is required")
		}
		if _, allowed := t.allowedIDs[params.SkillID]; !allowed {
			return "", fmt.Errorf("skill %s is not in the allowed list for this chat", params.SkillID)
		}
		sk, err := t.skillService.GetByID(ctx, params.SkillID)
		if err != nil {
			return "", fmt.Errorf("skill not found: %w", err)
		}
		if !model.SkillIsEnabled(sk) {
			return "", fmt.Errorf("skill %s is disabled", params.SkillID)
		}
		var out string
		var loadErr error
		if params.Path == "" {
			out, loadErr = t.skillService.GetSkillContent(ctx, params.SkillID)
		} else {
			var body []byte
			body, loadErr = t.skillService.GetFile(ctx, params.SkillID, strings.TrimSpace(params.Path))
			out = string(body)
		}
		if loadErr != nil {
			return "", loadErr
		}
		if t.onLoaded != nil {
			if err := t.onLoaded(ctx, params.SkillID); err != nil {
				return "", fmt.Errorf("skill activation hook failed: %w", err)
			}
		}
		return out, nil
	default:
		return "", fmt.Errorf("tool %s not found", name)
	}
}
