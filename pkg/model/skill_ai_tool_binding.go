// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package model

// SkillAIToolBinding links a skill to AI tools (per organization), mirroring RoleAIToolPermission semantics.
// ToolSetID is the toolset resource_id, the toolset implementation type (e.g. "utils"), or "*" for any authorized toolset in the org.
// ToolName is the logical tool name (as in role AI permissions) or "*" for all tools in the matched toolset.
type SkillAIToolBinding struct {
	Base
	SkillID        string `gorm:"size:36;not null;uniqueIndex:idx_skill_ai_tool_binding_unique,priority:1;index:idx_skill_ai_tool_skill_org,priority:1" json:"skill_id"`
	ToolSetID      string `gorm:"column:toolset_id;size:36;not null;uniqueIndex:idx_skill_ai_tool_binding_unique,priority:2" json:"toolset_id"`
	ToolName       string `gorm:"size:100;not null;uniqueIndex:idx_skill_ai_tool_binding_unique,priority:3" json:"tool_name"`
	OrganizationID string `gorm:"size:36;not null;uniqueIndex:idx_skill_ai_tool_binding_unique,priority:4;index:idx_skill_ai_tool_skill_org,priority:2" json:"organization_id"`
}

// TableName returns the database table name for SkillAIToolBinding.
func (SkillAIToolBinding) TableName() string {
	return "t_skill_ai_tool_bindings"
}
