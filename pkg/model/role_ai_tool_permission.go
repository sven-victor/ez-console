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

// RoleAIToolPermission represents an AI tool permission assigned to a role.
type RoleAIToolPermission struct {
	Base
	RoleID         string   `gorm:"size:36;not null;index:idx_role_ai_tool_permissions_role_tool,unique" json:"role_id"`
	ToolSetID      string   `gorm:"size:36;not null;index:idx_role_ai_tool_permissions_role_tool,unique" json:"toolset_id"`
	ToolName       string   `gorm:"size:100;not null;index:idx_role_ai_tool_permissions_role_tool,unique" json:"tool_name"`
	OrganizationID string   `gorm:"size:36;not null" json:"organization_id"`
	ToolSet        *ToolSet `gorm:"foreignKey:ToolSetID;references:ResourceID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"toolset,omitempty"`
}

// TableName returns the database table name for RoleAIToolPermission.
func (RoleAIToolPermission) TableName() string {
	return "t_role_ai_tool_permissions"
}
