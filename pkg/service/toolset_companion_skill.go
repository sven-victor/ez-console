// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package service

import (
	"context"
	"fmt"
	"strings"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"gopkg.in/yaml.v3"
	"gorm.io/gorm"
)

const toolsetCompanionPresetKeyPrefix = "toolset:"

func toolsetCompanionPresetKey(toolsetResourceID string) string {
	return toolsetCompanionPresetKeyPrefix + toolsetResourceID
}

const (
	toolsetCompanionSkillCategory = "toolset"
	toolsetCompanionSkillDomain   = "chat"
	toolsetCompanionNameSuffix    = " — AI toolset"
)

func (s *ToolSetService) deleteToolsetCompanionSkillIfAny(ctx context.Context, organizationID, toolsetResourceID string) error {
	pk := toolsetCompanionPresetKey(toolsetResourceID)
	var sk model.Skill
	err := db.Session(ctx).Where("organization_id = ? AND preset_key = ?", organizationID, pk).First(&sk).Error
	if err == gorm.ErrRecordNotFound {
		return nil
	}
	if err != nil {
		return fmt.Errorf("lookup companion skill: %w", err)
	}
	return s.skillService.ForceDeleteSkill(ctx, organizationID, sk.ResourceID)
}

// SyncToolsetCompanionSkillsForOrganization ensures every non-preset toolset in the organization has a companion skill.
func (s *ToolSetService) SyncToolsetCompanionSkillsForOrganization(ctx context.Context, organizationID string) error {
	if organizationID == "" {
		return nil
	}
	var rows []model.ToolSet
	if err := db.Session(ctx).Where("organization_id = ? AND is_preset = ?", organizationID, false).Find(&rows).Error; err != nil {
		return fmt.Errorf("list toolsets for companion sync: %w", err)
	}
	for i := range rows {
		if err := s.ensureToolsetCompanionSkill(ctx, &rows[i]); err != nil {
			return fmt.Errorf("toolset %s: %w", rows[i].ResourceID, err)
		}
	}
	return nil
}

func (s *ToolSetService) ensureToolsetCompanionSkill(ctx context.Context, ts *model.ToolSet) error {
	if ts == nil || ts.IsPreset {
		return nil
	}
	pk := toolsetCompanionPresetKey(ts.ResourceID)
	name := toolsetCompanionSkillName(ts)

	toolDefs, err := s.GetToolSetToolDefinitions(ctx, ts.OrganizationID, ts.ResourceID)
	if err != nil {
		toolDefs = nil
	}
	baseDesc := toolsetCompanionDescription(ts)
	desc := buildCompanionSkillDescriptionWithTools(baseDesc, toolDefs)
	markdown, err := buildToolsetCompanionSkillMarkdown(name, desc, ts, toolDefs)
	if err != nil {
		return fmt.Errorf("build companion SKILL.md: %w", err)
	}

	var row model.Skill
	q := db.Session(ctx).Where("organization_id = ? AND preset_key = ?", ts.OrganizationID, pk).First(&row)
	if q.Error == gorm.ErrRecordNotFound {
		sk := &model.Skill{
			OrganizationID: ts.OrganizationID,
			Name:           name,
			Description:    desc,
			Category:       toolsetCompanionSkillCategory,
			Domain:         toolsetCompanionSkillDomain,
			Status:         model.SkillStatusEnabled,
			IsPreset:       true,
			PresetKey:      pk,
		}
		if _, err := s.skillService.Create(ctx, sk, markdown); err != nil {
			return fmt.Errorf("create companion skill: %w", err)
		}
		return s.ensureCompanionToolBinding(ctx, ts.OrganizationID, sk.ResourceID, ts.ResourceID)
	}
	if q.Error != nil {
		return fmt.Errorf("query companion skill: %w", q.Error)
	}

	updates := map[string]interface{}{
		"name":        name,
		"description": desc,
		"category":    toolsetCompanionSkillCategory,
		"domain":      toolsetCompanionSkillDomain,
		"is_preset":   true,
		"preset_key":  pk,
	}
	if err := db.Session(ctx).Model(&model.Skill{}).
		Where("resource_id = ?", row.ResourceID).
		Select("name", "description", "category", "domain", "is_preset", "preset_key").
		Updates(updates).Error; err != nil {
		return fmt.Errorf("update companion skill metadata: %w", err)
	}
	if err := s.skillService.SyncPresetSkillMainMarkdown(ctx, ts.OrganizationID, row.ResourceID, markdown); err != nil {
		return fmt.Errorf("sync companion SKILL.md: %w", err)
	}
	return s.ensureCompanionToolBinding(ctx, ts.OrganizationID, row.ResourceID, ts.ResourceID)
}

func toolsetCompanionSkillName(ts *model.ToolSet) string {
	base := strings.TrimSpace(ts.Name)
	if base == "" {
		base = string(ts.Type)
	}
	return base + toolsetCompanionNameSuffix
}

func toolsetCompanionDescription(ts *model.ToolSet) string {
	if d := strings.TrimSpace(ts.Description); d != "" {
		return d
	}
	factory, ok := toolset.GetToolSetFactory(ts.Type)
	if ok {
		if d := strings.TrimSpace(factory.GetDescription()); d != "" {
			return d
		}
	}
	return fmt.Sprintf("AI tools exposed by toolset %q (type %s). Load this skill for progressive context; tool definitions are provided by the platform when bindings are active.", ts.Name, ts.Type)
}

// buildCompanionSkillDescriptionWithTools sets the API/DB skill description to the toolset summary plus a tool/method name list (varchar 1024).
func buildCompanionSkillDescriptionWithTools(base string, tools []model.ToolDefinition) string {
	base = strings.TrimSpace(base)
	names := logicalToolNamesFromDefinitions(tools)
	var toolClause string
	if len(names) == 0 {
		toolClause = "Tools: (list unavailable at last sync)."
	} else {
		toolClause = "Tools: " + strings.Join(names, ", ")
	}
	var combined string
	if base == "" {
		combined = toolClause
	} else {
		combined = base + " " + toolClause
	}
	return truncateSkillDescription(strings.TrimSpace(combined))
}

func logicalToolNamesFromDefinitions(tools []model.ToolDefinition) []string {
	if len(tools) == 0 {
		return nil
	}
	seen := make(map[string]struct{}, len(tools))
	out := make([]string, 0, len(tools))
	for _, t := range tools {
		n := strings.TrimSpace(t.Name)
		if n == "" {
			continue
		}
		if _, ok := seen[n]; ok {
			continue
		}
		seen[n] = struct{}{}
		out = append(out, n)
	}
	return out
}

func truncateSkillDescription(s string) string {
	const max = 1024
	r := []rune(s)
	if len(r) <= max {
		return s
	}
	ell := []rune("...")
	contentBudget := max - len(ell)
	if contentBudget < 1 {
		contentBudget = 1
	}
	return string(r[:contentBudget]) + string(ell)
}

func buildToolsetCompanionSkillMarkdown(name, description string, ts *model.ToolSet, tools []model.ToolDefinition) (string, error) {
	fm := map[string]interface{}{
		"name":     name,
		"domain":   toolsetCompanionSkillDomain,
		"category": toolsetCompanionSkillCategory,
	}
	if description != "" {
		fm["description"] = description
	}
	head, err := yaml.Marshal(fm)
	if err != nil {
		return "", err
	}

	var body strings.Builder
	body.WriteString("## Purpose\n\n")
	body.WriteString("This skill describes what the **")
	body.WriteString(ts.Name)
	body.WriteString("** toolset offers so an agent can use **progressive disclosure**: load this skill first for capability context; it intentionally **does not** embed JSON tool schemas.\n\n")
	body.WriteString("When this skill is active and tool bindings apply, the platform injects the real tool definitions for this toolset instance.\n\n")
	body.WriteString("## When to use\n\n")
	body.WriteString("Use when the task may require tools from this configured toolset (implementation type `")
	body.WriteString(string(ts.Type))
	body.WriteString("`, instance id `")
	body.WriteString(ts.ResourceID)
	body.WriteString("`).\n\n")
	body.WriteString("## Capabilities (logical tool names)\n\n")
	if len(tools) == 0 {
		body.WriteString("*No tool list is available right now* (for example the toolset may be disabled or unreachable). Tools still resolve at runtime when the toolset is connected.\n\n")
	} else {
		body.WriteString("These are the **logical method names** exposed by the toolset (not full OpenAI tool payloads):\n\n")
		for _, t := range tools {
			body.WriteString("- `")
			body.WriteString(t.Name)
			body.WriteString("`")
			if short := strings.TrimSpace(t.Description); short != "" {
				body.WriteString(" — ")
				body.WriteString(firstLine(short))
			}
			body.WriteString("\n")
		}
		body.WriteString("\n")
	}
	body.WriteString("## Progressive loading\n\n")
	body.WriteString("1. Load this skill via the skill loader when the user’s task matches this toolset.\n")
	body.WriteString("2. Rely on bound tools for schemas and execution; do not reconstruct parameters from this document alone.\n")

	return "---\n" + strings.TrimSpace(string(head)) + "\n---\n\n" + body.String(), nil
}

func firstLine(s string) string {
	s = strings.TrimSpace(s)
	if i := strings.IndexAny(s, "\r\n"); i >= 0 {
		return strings.TrimSpace(s[:i])
	}
	return s
}

func (s *ToolSetService) ensureCompanionToolBinding(ctx context.Context, organizationID, skillID, toolsetResourceID string) error {
	var n int64
	if err := db.Session(ctx).Model(&model.SkillAIToolBinding{}).
		Where("skill_id = ? AND organization_id = ? AND toolset_id = ? AND tool_name = ?", skillID, organizationID, toolsetResourceID, "*").
		Count(&n).Error; err != nil {
		return err
	}
	if n > 0 {
		return nil
	}
	row := model.SkillAIToolBinding{
		SkillID:        skillID,
		ToolSetID:      toolsetResourceID,
		ToolName:       "*",
		OrganizationID: organizationID,
	}
	return db.Session(ctx).Create(&row).Error
}
