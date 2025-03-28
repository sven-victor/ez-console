package model

// Role represents a role in the system, used for RBAC permission control
type Role struct {
	Base
	Name        string       `gorm:"uniqueIndex;size:50;not null" json:"name"`
	Description string       `gorm:"size:200" json:"description"`
	Permissions []Permission `gorm:"many2many:role_permissions;" json:"permissions"`
	Users       []User       `gorm:"many2many:user_roles;" json:"-"`
	// Permission configuration based on IAM-style policies, stored in JSON format
	PolicyDocument PolicyDocument `gorm:"type:text;serializer:json" json:"policy_document,omitempty"`
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
