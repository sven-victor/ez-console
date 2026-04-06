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

package model

// SkillStatus controls whether a skill is offered to AI chat flows.
type SkillStatus string

const (
	SkillStatusEnabled  SkillStatus = "enabled"
	SkillStatusDisabled SkillStatus = "disabled"
)

type SkillTool struct {
	ToolSetID string `json:"toolset_id"`
	ToolName  string `json:"tool_name"`
}

// Skill represents an AI Agent Skill (metadata stored in DB; files under skills_path/{ResourceID}/)
type Skill struct {
	Base
	OrganizationID string      `gorm:"size:36;not null;index;default:00000000000000000000000000000000" json:"organization_id"`
	Name           string      `gorm:"type:varchar(256);not null" json:"name"`
	Description    string      `gorm:"type:varchar(1024)" json:"description"`
	Category       string      `gorm:"type:varchar(128)" json:"category"`
	Domain         string      `gorm:"type:varchar(64)" json:"domain"`
	Status         SkillStatus `gorm:"type:varchar(20);not null;default:'enabled'" json:"status"`
	IsPreset       bool        `gorm:"not null;default:false" json:"is_preset"`
	PresetKey      string      `gorm:"type:varchar(64)" json:"preset_key,omitempty"`
	Tools          []SkillTool `gorm:"-" json:"tools,omitempty"`
}

// TableName returns the table name for Skill
func (Skill) TableName() string {
	return "t_skill"
}
