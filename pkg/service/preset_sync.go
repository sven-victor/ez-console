// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package service

import (
	"context"
	"fmt"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/preset"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
)

// SyncPresetResources ensures per-organization preset toolsets, skills, and bindings exist.
func (s *Service) SyncPresetResources(ctx context.Context) error {
	logger := log.GetContextLogger(ctx)
	var orgs []model.Organization
	if err := db.Session(ctx).Find(&orgs).Error; err != nil {
		return fmt.Errorf("list organizations: %w", err)
	}
	for _, org := range orgs {
		if err := s.SyncPresetResourcesForOrganization(ctx, org.ResourceID); err != nil {
			return err
		}
	}
	level.Info(logger).Log("msg", "Preset skills and toolsets synchronized", "organizations", len(orgs))
	return nil
}

// SyncPresetResourcesForOrganization creates missing preset toolsets, skills, and default skill bindings for one organization.
func (s *Service) SyncPresetResourcesForOrganization(ctx context.Context, organizationID string) error {
	if organizationID == "" {
		return nil
	}
	logger := log.GetContextLogger(ctx)
	for _, spec := range preset.RegisteredPresetToolSets() {
		if err := s.syncPresetToolSetForOrg(ctx, organizationID, spec); err != nil {
			return fmt.Errorf("sync preset toolset %q for org %s: %w", spec.PresetKey, organizationID, err)
		}
	}
	for _, skillSpec := range preset.RegisteredPresetSkills() {
		if err := s.syncPresetSkillForOrg(ctx, organizationID, skillSpec); err != nil {
			return fmt.Errorf("sync preset skill %q for org %s: %w", skillSpec.PresetKey, organizationID, err)
		}
		if err := s.syncPresetSkillBindingsForOrg(ctx, organizationID, skillSpec); err != nil {
			return fmt.Errorf("sync preset bindings %q for org %s: %w", skillSpec.PresetKey, organizationID, err)
		}
	}
	level.Debug(logger).Log("msg", "Preset resources synced for organization", "organization_id", organizationID)
	return nil
}

func toToolSetConfig(m map[string]interface{}) model.ToolSetConfig {
	if len(m) == 0 {
		return nil
	}
	c := make(model.ToolSetConfig)
	for k, v := range m {
		c[k] = v
	}
	return c
}

func mergeToolsetConfig(existing, defaults model.ToolSetConfig) model.ToolSetConfig {
	if existing == nil {
		existing = model.ToolSetConfig{}
	}
	out := make(model.ToolSetConfig)
	for k, v := range existing {
		out[k] = v
	}
	if defaults != nil {
		for k, v := range defaults {
			if _, ok := out[k]; !ok {
				out[k] = v
			}
		}
	}
	return out
}

func (s *Service) syncPresetToolSetForOrg(ctx context.Context, organizationID string, spec preset.PresetToolSetSpec) error {
	var row model.ToolSet
	err := db.Session(ctx).Where("organization_id = ? AND preset_key = ?", organizationID, spec.PresetKey).First(&row).Error
	if err == gorm.ErrRecordNotFound {
		ts := model.NewToolSet(organizationID, spec.Name, spec.Description, toolset.ToolSetType(spec.Type), mergeToolsetConfig(nil, toToolSetConfig(spec.DefaultConfig)), model.PresetSystemActorID)
		ts.IsPreset = true
		ts.PresetKey = spec.PresetKey
		ts.UpdatedBy = model.PresetSystemActorID
		if err := db.Session(ctx).Create(ts).Error; err != nil {
			return fmt.Errorf("create preset toolset: %w", err)
		}
		return nil
	}
	if err != nil {
		return fmt.Errorf("query preset toolset: %w", err)
	}
	merged := mergeToolsetConfig(row.Config, toToolSetConfig(spec.DefaultConfig))
	updates := map[string]interface{}{
		"name":        spec.Name,
		"description": spec.Description,
		"type":        toolset.ToolSetType(spec.Type),
		"config":      merged,
		"is_preset":   true,
		"preset_key":  spec.PresetKey,
	}
	if err := db.Session(ctx).Model(&model.ToolSet{}).Where("resource_id = ?", row.ResourceID).Updates(updates).Error; err != nil {
		return fmt.Errorf("update preset toolset: %w", err)
	}
	return nil
}

func (s *Service) syncPresetSkillForOrg(ctx context.Context, organizationID string, spec preset.PresetSkillSpec) error {
	var row model.Skill
	err := db.Session(ctx).Where("organization_id = ? AND preset_key = ?", organizationID, spec.PresetKey).First(&row).Error
	if err == gorm.ErrRecordNotFound {
		sk := &model.Skill{
			OrganizationID: organizationID,
			Name:           spec.Name,
			Description:    spec.Description,
			Category:       spec.Category,
			Domain:         spec.Domain,
			Status:         model.SkillStatusEnabled,
			IsPreset:       true,
			PresetKey:      spec.PresetKey,
		}
		content := spec.InitialMarkdown
		if _, err := s.SkillService.Create(ctx, sk, content); err != nil {
			return fmt.Errorf("create preset skill: %w", err)
		}
		return nil
	}
	if err != nil {
		return fmt.Errorf("query preset skill: %w", err)
	}
	updates := map[string]interface{}{
		"name":        spec.Name,
		"description": spec.Description,
		"category":    spec.Category,
		"domain":      spec.Domain,
		"is_preset":   true,
		"preset_key":  spec.PresetKey,
	}
	if err := db.Session(ctx).Model(&model.Skill{}).Where("resource_id = ?", row.ResourceID).Updates(updates).Error; err != nil {
		return fmt.Errorf("update preset skill metadata: %w", err)
	}
	if err := s.SkillService.EnsurePresetSkillMarkdown(ctx, organizationID, row.ResourceID, spec.InitialMarkdown); err != nil {
		return err
	}
	return nil
}

func (s *Service) syncPresetSkillBindingsForOrg(ctx context.Context, organizationID string, spec preset.PresetSkillSpec) error {
	if len(spec.DefaultBindings) == 0 {
		return nil
	}
	var sk model.Skill
	if err := db.Session(ctx).Where("organization_id = ? AND preset_key = ?", organizationID, spec.PresetKey).First(&sk).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}
	for _, b := range spec.DefaultBindings {
		if b.ToolSetType == "" || b.ToolName == "" {
			continue
		}
		var n int64
		if err := db.Session(ctx).Model(&model.SkillAIToolBinding{}).
			Where("skill_id = ? AND organization_id = ? AND toolset_id = ? AND tool_name = ?", sk.ResourceID, organizationID, b.ToolSetType, b.ToolName).
			Count(&n).Error; err != nil {
			return err
		}
		if n > 0 {
			continue
		}
		row := model.SkillAIToolBinding{
			SkillID:        sk.ResourceID,
			ToolSetID:      b.ToolSetType,
			ToolName:       b.ToolName,
			OrganizationID: organizationID,
		}
		if err := db.Session(ctx).Create(&row).Error; err != nil {
			return fmt.Errorf("create binding %s/%s: %w", b.ToolSetType, b.ToolName, err)
		}
	}
	return nil
}
