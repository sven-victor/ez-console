// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package service

import (
	"context"
	"fmt"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
)

// ListSkillAIToolBindings lists bindings for a skill in an organization with pagination.
func (s *SkillService) ListSkillAIToolBindings(ctx context.Context, skillID, organizationID string, current, pageSize int, search string) ([]model.SkillAIToolBinding, int64, error) {
	if skillID == "" {
		return nil, 0, fmt.Errorf("skill id is required")
	}
	q := db.Session(ctx).Model(&model.SkillAIToolBinding{}).Where("skill_id = ? AND organization_id = ?", skillID, organizationID)
	if search != "" {
		pat := "%" + search + "%"
		q = q.Where("tool_name LIKE ? OR toolset_id LIKE ?", pat, pat)
	}
	var total int64
	if err := q.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	if current < 1 {
		current = 1
	}
	if pageSize < 1 {
		pageSize = 10
	}
	var list []model.SkillAIToolBinding
	if err := q.Order("toolset_id ASC, tool_name ASC").Offset((current - 1) * pageSize).Limit(pageSize).Find(&list).Error; err != nil {
		return nil, 0, err
	}
	return list, total, nil
}

// ReplaceSkillAIToolBindings replaces all bindings for a skill in an organization.
func (s *SkillService) ReplaceSkillAIToolBindings(ctx context.Context, skillID, organizationID string, rows []model.SkillAIToolBinding) error {
	if skillID == "" {
		return fmt.Errorf("skill id is required")
	}
	sk, err := s.GetByID(ctx, skillID)
	if err != nil {
		return fmt.Errorf("skill not found: %w", err)
	}
	if sk.IsPreset {
		return fmt.Errorf("preset skills use system-managed AI tool bindings and cannot be replaced")
	}
	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("skill_id = ? AND organization_id = ?", skillID, organizationID).Unscoped().Delete(&model.SkillAIToolBinding{}).Error; err != nil {
			return err
		}
		if len(rows) == 0 {
			return nil
		}
		for i := range rows {
			rows[i].ID = 0
			rows[i].ResourceID = ""
			rows[i].SkillID = skillID
			rows[i].OrganizationID = organizationID
			if rows[i].ToolSetID == "" || rows[i].ToolName == "" {
				return fmt.Errorf("toolset_id and tool_name are required")
			}
		}
		return tx.Create(&rows).Error
	})
}

// ListSkillAIToolBindingsForChat returns all bindings for the given skills in an organization (no pagination).
func (s *SkillService) ListSkillAIToolBindingsForChat(ctx context.Context, organizationID string, skillIDs []string) ([]model.SkillAIToolBinding, error) {
	if organizationID == "" || len(skillIDs) == 0 {
		return nil, nil
	}
	var bindings []model.SkillAIToolBinding
	if err := db.Session(ctx).Where("organization_id = ? AND skill_id IN ?", organizationID, skillIDs).Find(&bindings).Error; err != nil {
		return nil, err
	}
	return bindings, nil
}
