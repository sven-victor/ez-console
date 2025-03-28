package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/model"
)

// Mapping of permission names to identifiers
var permissionGroups = []*model.PermissionGroup{}

func RegisterPermission(groupName string, description string, permissions []model.Permission) error {
	for _, g := range permissionGroups {
		if g.Name == groupName {
			for _, permission := range permissions {
				if GetPermission(permission.Code) != nil {
					return fmt.Errorf("permission %s already exists", permission.Code)
				}
				g.Permissions = append(g.Permissions, permission)
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
			c.JSON(http.StatusUnauthorized, gin.H{
				"code": "E4012",
				"err":  "Unauthorized",
			})
			c.Abort()
			return
		}
		roles, ok := roleInterface.([]model.Role)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{
				"code": "E4012",
				"err":  "Invalid role information",
			})
			c.Abort()
			return
		}
		// If it is an administrator, allow directly
		for _, role := range roles {
			if role.Name == "admin" {
				c.Next()
				return
			}
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
				c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
					"code": "E4031",
					"err":  "No permission to perform this operation",
				})
				return
			}
			if role.HasPermission(code) {
				c.Next()
				return
			}
		}

		c.JSON(http.StatusForbidden, gin.H{
			"code": "E4031",
			"err":  "No permission to perform this operation",
		})
		c.Abort()
	}
}
