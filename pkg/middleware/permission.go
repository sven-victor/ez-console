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

package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
)

// Mapping of permission names to identifiers
var permissionGroups = []*model.PermissionGroup{}

func RegisterPermission(groupName string, description string, permissions []model.Permission) error {
	for _, g := range permissionGroups {
		if g.Name == groupName {
			for _, permission := range permissions {
				existing := GetPermission(permission.Code)
				if existing != nil {
					// Update existing permission, preserve OrgPermission if already set
					if !existing.OrgPermission {
						existing.OrgPermission = permission.OrgPermission
					}
					// Overwrite DefaultRoleNames when incoming has any
					if len(permission.DefaultRoleNames) > 0 {
						existing.DefaultRoleNames = permission.DefaultRoleNames
					}
				} else {
					g.Permissions = append(g.Permissions, permission)
				}
			}
			return nil
		}
	}
	permissionGroup := model.PermissionGroup{
		Name:        groupName,
		Description: description,
	}
	permissionGroups = append(permissionGroups, &permissionGroup)
	for _, permission := range permissions {
		if GetPermission(permission.Code) != nil {
			return fmt.Errorf("permission %s already exists", permission.Code)
		}
		permissionGroup.Permissions = append(permissionGroup.Permissions, permission)
	}
	return nil
}

func GetPermission(code string) *model.Permission {
	for _, group := range permissionGroups {
		for _, permission := range group.Permissions {
			if permission.Code == code {
				return &permission
			}
		}
	}
	return nil
}

func GetPermissions() []*model.PermissionGroup {
	return permissionGroups
}

// RequirePermission permission check middleware
func RequirePermission(code string) gin.HandlerFunc {
	if GetPermission(code) == nil {
		panic(fmt.Sprintf("permission %s not found", code))
	}
	return func(c *gin.Context) {
		c.Set("permission_code", code)
		// Get permission information
		roleInterface, exists := c.Get("roles")
		if !exists {
			util.RespondWithError(c, util.NewErrorMessage("E4012", "Unauthorized"))
			return
		}
		roles, ok := roleInterface.([]model.Role)
		if !ok {
			util.RespondWithError(c, util.NewErrorMessage("E4012", "Invalid role information"))
			return
		}
		// If it is an administrator, allow directly
		for _, role := range roles {
			if role.Name == "admin" && (role.OrganizationID == nil || *role.OrganizationID == "") {
				c.Next()
				return
			}
		}
		// Get permission definition
		permission := GetPermission(code)
		if permission == nil {
			util.RespondWithError(c, util.NewErrorMessage("E4031", "Permission not found"))
			return
		}

		// If this is an organization-scoped permission, check organization context
		orgID, _ := c.Get("organization_id")
		if permission.OrgPermission {

			if orgID == nil || orgID.(string) == "" {
				util.RespondWithError(c, util.NewErrorMessage("E4031", "Organization context required for this permission"))
				return
			}
			orgIDStr := orgID.(string)
			// check if org is enabled
			var org model.Organization

			if err := db.Session(c.Request.Context()).Model(&model.Organization{}).Where("resource_id = ?", orgIDStr).First(&org).Error; err != nil {
				util.RespondWithError(c, util.NewErrorMessage("E4031", "Organization not found", err))
				return
			}
			if org.ResourceID == "" {
				util.RespondWithError(c, util.NewErrorMessage("E4031", "Organization not found"))
				return
			}
			if org.Status == model.OrganizationStatusDisabled {
				util.RespondWithError(c, util.NewErrorMessage("E4031", "Organization is disabled"))
				return
			}

			// For org permissions, check both global roles (can manage all orgs) and org-scoped roles for this organization
			var validRoles []model.Role
			for _, role := range roles {
				// Global roles can manage all organizations' resources
				if role.OrganizationID == nil {
					validRoles = append(validRoles, role)
				} else if *role.OrganizationID == orgIDStr {
					// Org-scoped roles can only manage their own organization's resources
					validRoles = append(validRoles, role)
				}
			}
			roles = validRoles
		} else {
			// For non-org permissions, only check global roles
			var globalRoles []model.Role
			for _, role := range roles {
				if role.OrganizationID == nil {
					globalRoles = append(globalRoles, role)
				}
			}
			roles = globalRoles
		}

		// Non-administrators need to check specific permissions
		// First load complete role information, including permissions
		// Create context information for conditional judgment of policy documents
		context := map[string]interface{}{
			"http.path":   c.Request.URL.Path,
			"http.uri":    c.Request.URL.RequestURI(),
			"http.method": c.Request.Method,
			"http.ip":     c.ClientIP(),
		}
		if orgID != nil {
			context["org.id"] = orgID
		}
		for _, param := range c.Params {
			context[param.Key] = param.Value
		}
		// 1. First check the policy document
		for _, role := range roles {
			// Check if the policy document allows this operation
			if isMatch, isAllow := role.HasPolicyPermission(code, "*", context); isMatch {
				if isAllow {
					c.Next()
					return
				}
				util.RespondWithError(c, util.NewErrorMessage("E4031", "No permission to perform this operation"))
				return
			}
			if role.HasPermission(code) {
				c.Next()
				return
			}
		}

		util.RespondWithError(c, util.NewErrorMessage("E4031", "No permission to perform this operation"))
	}
}
