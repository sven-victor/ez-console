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
