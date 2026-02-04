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
	"github.com/sven-victor/ez-console/pkg/toolset"
)

// SkillLoaderToolSet is a runtime-only toolset that exposes get_skill_content and list_skill_files for skills allowed by domains/skillIDs.
type SkillLoaderToolSet struct {
	skillService *SkillService
	allowedIDs   map[string]struct{}
}

func (s SkillLoaderToolSet) GetAllowedIDs() []string {
	keys := make([]string, 0, len(s.allowedIDs))
	for k := range s.allowedIDs {
		keys = append(keys, k)
	}
	return keys
}

// NewSkillLoaderToolSet creates a toolset that allows loading only the given skills (resolved from domains + skillIDs).
func NewSkillLoaderToolSet(ctx context.Context, skillService *SkillService, skillIDs []string) toolset.ToolSet {
	allowed := make(map[string]struct{})
	for _, id := range skillIDs {
		if id == "" {
			continue
		}
		allowed[id] = struct{}{}
	}
	return &SkillLoaderToolSet{skillService: skillService, allowedIDs: allowed}
}

func (t *SkillLoaderToolSet) GetName() string { return "skill_loader" }
func (t *SkillLoaderToolSet) GetDescription() string {
	return "Load skill file content or list files on demand"
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
		{
			Type: openai.ToolTypeFunction,
			Function: &openai.FunctionDefinition{
				Name:        "list_skill_files",
				Description: "List files and directories under a skill path. Use skill_id and optional path (default root). Returns names and whether each entry is a directory.",
				Parameters: jsonschema.Definition{
					Type: jsonschema.Object,
					Properties: map[string]jsonschema.Definition{
						"skill_id": {
							Type:        jsonschema.String,
							Description: "Skill ID (resource_id from the available skills list)",
							Enum:        t.GetAllowedIDs(),
						},
						"path": {Type: jsonschema.String, Description: "Optional: directory path under the skill (empty = root)"},
					},
					Required: []string{"skill_id"},
				},
			},
		},
	}, nil
}

func (t *SkillLoaderToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	if _, ok := t.allowedIDs[""]; ok {
		// empty allowed set after resolving domains could mean no skills
	}
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
		if params.Path == "" {
			content, err := t.skillService.GetSkillContent(ctx, params.SkillID)
			if err != nil {
				return "", err
			}
			return content, nil
		}
		body, err := t.skillService.GetFile(ctx, params.SkillID, strings.TrimSpace(params.Path))
		if err != nil {
			return "", err
		}
		return string(body), nil
	case "list_skill_files":
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
		entries, err := t.skillService.ListFiles(ctx, params.SkillID, strings.TrimSpace(params.Path))
		if err != nil {
			return "", err
		}
		out, _ := json.Marshal(entries)
		return string(out), nil
	default:
		return "", fmt.Errorf("tool %s not found", name)
	}
}
