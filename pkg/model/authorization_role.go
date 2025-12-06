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

// Role represents a role in the system, used for RBAC permission control
type Role struct {
	Base
	Name        string       `gorm:"size:50;not null;index:idx_role_name_org" json:"name"`
	Description string       `gorm:"size:200" json:"description"`
	Permissions []Permission `gorm:"many2many:role_permissions;" json:"permissions"`
	// AIToolPermissions stores the AI tool permissions assigned to the role.
	AIToolPermissions []RoleAIToolPermission `gorm:"foreignKey:RoleID;references:ResourceID;constraint:OnDelete:CASCADE;" json:"ai_tool_permissions,omitempty"`
	Users             []User                 `gorm:"many2many:user_roles;" json:"-"`
	// Permission configuration based on IAM-style policies, stored in JSON format
	PolicyDocument PolicyDocument `gorm:"type:text;serializer:json" json:"policy_document,omitempty"`
	// OrganizationID is the organization this role belongs to. If empty, the role is global.
	// Role names must be unique within the same organization (or among global roles if OrganizationID is nil)
	OrganizationID *string       `gorm:"size:36;index:idx_role_name_org" json:"organization_id,omitempty"`
	Organization   *Organization `gorm:"foreignKey:OrganizationID;references:ResourceID" json:"organization,omitempty"`
}

type PermissionGroup struct {
	Name        string       `gorm:"uniqueIndex;size:50;not null" json:"name"`
	Description string       `gorm:"size:200" json:"description"`
	Permissions []Permission `gorm:"many2many:role_permissions;" json:"permissions"`
}

func (p *PermissionGroup) GetPermission(code string) *Permission {
	for _, perm := range p.Permissions {
		if perm.Code == code {
			return &perm
		}
	}
	return nil
}

// Permission represents a permission in the system
type Permission struct {
	Base
	Code        string `gorm:"uniqueIndex;size:100;not null" json:"code"`
	Name        string `gorm:"size:100;not null" json:"name"`
	Description string `gorm:"size:255" json:"description"`
	Roles       []Role `gorm:"many2many:role_permissions;" json:"-"`
	// OrgPermission indicates if this permission is organization-scoped
	OrgPermission bool `gorm:"default:false" json:"org_permission"`
}

// HasPermission checks if the role has the specified permission code (based on RBAC)
func (r *Role) HasPermission(permissionCode string) bool {
	// First check policy statements
	if isMatch, isAllow := r.PolicyDocument.CheckPermission(permissionCode, "*", nil); isMatch && isAllow {
		return true
	}

	// Then check RBAC permissions
	for _, perm := range r.Permissions {
		if perm.Code == permissionCode {
			return true
		}
	}
	return false
}

// HasPolicyPermission checks if the role has permission based on policy statements
func (r *Role) HasPolicyPermission(action string, resource string, context map[string]interface{}) (isMatch bool, isAllow bool) {
	return r.PolicyDocument.CheckPermission(action, resource, context)
}

// GetPolicyDocument gets the role's policy document object
func (r *Role) GetPolicyDocument() (*PolicyDocument, error) {
	return &r.PolicyDocument, nil
}

// SetPolicyDocument sets the role's policy document
func (r *Role) SetPolicyDocument(doc *PolicyDocument) error {
	if doc == nil {
		r.PolicyDocument = PolicyDocument{}
		return nil
	}

	r.PolicyDocument = *doc
	return nil
}

// AddPermission adds a permission to the role
func (r *Role) AddPermission(permission Permission) {
	for _, perm := range r.Permissions {
		if perm.ResourceID == permission.ResourceID {
			return // Permission already exists, no need to add
		}
	}
	r.Permissions = append(r.Permissions, permission)
}

// RemovePermission removes a permission from the role
func (r *Role) RemovePermission(permissionID string) {
	var filteredPermissions []Permission
	for _, perm := range r.Permissions {
		if perm.ResourceID != permissionID {
			filteredPermissions = append(filteredPermissions, perm)
		}
	}
	r.Permissions = filteredPermissions
}
