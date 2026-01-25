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

package authorizationapi

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// RoleController API controller for role-related operations
type RoleController struct {
	service *service.Service
}

func NewRoleController(service *service.Service) *RoleController {
	return &RoleController{service: service}
}

// RegisterRoutes registers role-related routes
func (c *RoleController) RegisterRoutes(router *gin.RouterGroup) {
	roles := router.Group("/roles")
	{
		roles.GET("", middleware.RequirePermission("authorization:role:view"), c.ListRoles)
		roles.GET("/:id", middleware.RequirePermission("authorization:role:view"), c.GetRole)
		roles.POST("", middleware.RequirePermission("authorization:role:create"), c.CreateRole)
		roles.PUT("/:id", middleware.RequirePermission("authorization:role:update"), c.UpdateRole)
		roles.DELETE("/:id", middleware.RequirePermission("authorization:role:delete"), c.DeleteRole)
		roles.PUT("/:id/permissions", middleware.RequirePermission("authorization:role:update"), c.AssignPermissions)
		roles.GET("/:id/policy", middleware.RequirePermission("authorization:role:view"), c.GetRolePolicy)
		roles.PUT("/:id/policy", middleware.RequirePermission("authorization:role:update"), c.SetRolePolicy)
	}
}

// ListRoles gets a list of roles
//
//	@Summary		Get a list of roles
//	@Description	Get a list of roles
//	@ID             listRoles
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			current			query		int		false	"Current page"	default(1)
//	@Param			page_size		query		int		false	"Page size"		default(10)
//	@Param			search			query		string	false	"Search"
//	@Param			organization_id	query		string	false	"Filter by organization ID (empty for global roles)"
//	@Success		200				{object}	util.PaginationResponse[model.Role]
//	@Failure		500				{object}	util.ErrorResponse
//	@Router			/api/authorization/roles [get]
func (c *RoleController) ListRoles(ctx *gin.Context) {
	// Get pagination parameters
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")
	searchOrgID := ctx.Query("organization_id")
	currentOrgID := ctx.GetString("organization_id")
	var orgID *string

	roles := middleware.GetRolesFromContext(ctx)
	if roles == nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4031", "No roles found"))
		return
	}

	var hasGlobalRolePermission bool

	for _, role := range roles {
		if role.OrganizationID == nil || *role.OrganizationID == "" {
			if role.HasPermission("authorization:role:view") {
				hasGlobalRolePermission = true
				break
			}
		}
	}
	if hasGlobalRolePermission {
		if searchOrgID != "" {
			orgID = &searchOrgID
		} else {
			orgID = nil
		}
	} else if currentOrgID != "" {
		if searchOrgID != "" && searchOrgID != currentOrgID {
			util.RespondWithError(ctx, util.NewErrorMessage("E4031", "Invalid organization ID"))
			return
		}
		orgID = &currentOrgID
	} else {
		util.RespondWithError(ctx, util.NewErrorMessage("E4031", "No global role permission found"))
		return
	}

	// Call service to get role list
	roles, total, err := c.service.RoleService.ListRoles(ctx, current, pageSize, search, orgID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	// Return paginated data
	util.RespondWithSuccessList(ctx, http.StatusOK, roles, total, current, pageSize)
}

// GetRole gets a role by ID
//
//	@Summary		Get a role by ID
//	@Description	Get a role by ID
//	@ID             getRole
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Role ID"
//	@Success		200	{object}	util.Response[model.Role]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id} [get]
func (c *RoleController) GetRole(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "invalid role ID"))
		return
	}

	role, err := c.service.RoleService.GetRole(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, role)
}

type CreateRoleRequest struct {
	Name              string                        `json:"name" binding:"required"`
	Description       string                        `json:"description"`
	OrganizationID    *string                       `json:"organization_id,omitempty"`
	PermissionIDs     []string                      `json:"permissions"`
	PolicyDocument    model.PolicyDocument          `json:"policy_document"`
	AIToolPermissions []RoleAIToolPermissionRequest `json:"ai_tool_permissions"`
}

// RoleAIToolPermissionRequest represents AI tool permission assignments in role requests.
type RoleAIToolPermissionRequest struct {
	ToolSetID string   `json:"toolset_id" binding:"required"`
	Tools     []string `json:"tools" binding:"required"`
}

func toRoleAIToolAssignments(requests []RoleAIToolPermissionRequest) []service.RoleAIToolAssignment {
	assignments := make([]service.RoleAIToolAssignment, 0, len(requests))
	for _, req := range requests {
		assignments = append(assignments, service.RoleAIToolAssignment{
			ToolSetID: req.ToolSetID,
			Tools:     req.Tools,
		})
	}
	return assignments
}

// CreateRole creates a new role
//
//	@Summary		Create a new role
//	@Description	Create a new role
//	@ID             createRole
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			request	body		CreateRoleRequest	true	"Create role request"
//	@Success		200		{object}	util.Response[model.Role]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/roles [post]
func (c *RoleController) CreateRole(ctx *gin.Context) {
	var req CreateRoleRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		"", // Resource ID will be generated upon creation
		func(auditLog *model.AuditLog) error {

			if req.OrganizationID == nil || *req.OrganizationID == "" {
				hasGlobalRolePermission := false
				roles := middleware.GetRolesFromContext(ctx)
				if roles == nil {
					return util.NewErrorMessage("E4031", "No roles found")
				}
				for _, role := range roles {
					if role.OrganizationID == nil || *role.OrganizationID == "" {
						if role.HasPermission("authorization:role:create") {
							hasGlobalRolePermission = true
							break
						}
					}
				}
				if !hasGlobalRolePermission {
					return util.NewErrorMessage("E4031", "No global role permission found")
				}
				req.OrganizationID = nil
			}

			aiAssignments := toRoleAIToolAssignments(req.AIToolPermissions)
			role, err := c.service.RoleService.CreateRole(ctx, req.Name, req.Description, req.OrganizationID, req.PermissionIDs, req.PolicyDocument, aiAssignments)
			if err != nil {
				return util.NewError("E5001", err)
			}
			auditLog.Details.NewData = role
			auditLog.ResourceID = role.ResourceID

			util.RespondWithSuccess(ctx, http.StatusCreated, role)
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = req
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

type UpdateRoleRequest struct {
	Name              string                        `json:"name" binding:"required"`
	Description       string                        `json:"description"`
	OrganizationID    *string                       `json:"organization_id,omitempty"`
	PermissionIDs     []string                      `json:"permissions"`
	PolicyDocument    model.PolicyDocument          `json:"policy_document"`
	AIToolPermissions []RoleAIToolPermissionRequest `json:"ai_tool_permissions"`
}

// UpdateRole updates a role
//
//	@Summary		Update a role
//	@Description	Update a role
//	@ID             updateRole
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string		true	"Role ID"
//	@Param			request	body		UpdateRoleRequest	true	"Update role request"
//	@Success		200		{object}	util.Response[model.Role]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id} [put]
func (c *RoleController) UpdateRole(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "invalid role ID"))
		return
	}

	var req UpdateRoleRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			if req.OrganizationID == nil || *req.OrganizationID == "" {
				hasGlobalRolePermission := false
				roles := middleware.GetRolesFromContext(ctx)
				if roles == nil {
					return util.NewErrorMessage("E4031", "No roles found")
				}
				for _, role := range roles {
					if role.OrganizationID == nil || *role.OrganizationID == "" {
						if role.HasPermission("authorization:role:create") {
							hasGlobalRolePermission = true
							break
						}
					}
				}
				if !hasGlobalRolePermission {
					return util.NewErrorMessage("E4031", "No global role permission found")
				}
				req.OrganizationID = nil
			}
			aiAssignments := toRoleAIToolAssignments(req.AIToolPermissions)
			role, err := c.service.RoleService.UpdateRole(ctx, id, req.Name, req.Description, req.OrganizationID, req.PermissionIDs, req.PolicyDocument, aiAssignments)
			if err != nil {
				return util.NewError("E5001", err)
			}

			middleware.ClearUserCache()

			util.RespondWithSuccess(ctx, http.StatusOK, role)
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = req
			// Get role information before update for audit log
			oldRole, err := c.service.RoleService.GetRole(ctx, id)
			if err != nil {
				oldRole = &model.Role{Base: model.Base{ResourceID: id}}
			}
			auditLog.Details.OldData = oldRole
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

// DeleteRole deletes a role
//
//	@Summary		Delete a role
//	@Description	Delete a role
//	@ID             deleteRole
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Role ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id} [delete]
func (c *RoleController) DeleteRole(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "invalid role ID"))
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			err := c.service.RoleService.DeleteRole(ctx, id)
			if err != nil {
				return util.NewError("E5001", err)
			}

			middleware.ClearUserCache()

			util.RespondWithMessage(ctx, "Role deleted successfully")
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			// Get role information for audit log
			oldRole, err := c.service.RoleService.GetRole(ctx, id)
			if err != nil {
				oldRole = &model.Role{Base: model.Base{ResourceID: id}}
			}
			auditLog.Details.OldData = oldRole
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

type AssignPermissionsRequest struct {
	PermissionIDs []string `json:"permission_ids" binding:"required"`
}

// AssignPermissions assigns permissions to a role
//
//	@Summary		Assign permissions to a role
//	@Description	Assign permissions to a role
//	@ID             assignPermissions
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id			path		string		true	"Role ID"
//	@Param			request		body		AssignPermissionsRequest	true	"Assign permissions request"
//	@Success		200			{object}	util.Response[util.MessageData]
//	@Failure		400			{object}	util.ErrorResponse
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id}/permissions [put]
func (c *RoleController) AssignPermissions(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "invalid role ID"))
		return
	}

	var req AssignPermissionsRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			err := c.service.RoleService.AssignPermissions(ctx, id, req.PermissionIDs)
			if err != nil {
				return util.NewError("E5001", err)
			}

			middleware.ClearUserCache()

			util.RespondWithMessage(ctx, "Permissions assigned successfully")
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = req
			// Get role information before assigning permissions for audit log
			oldRole, err := c.service.RoleService.GetRole(ctx, id)
			if err != nil {
				oldRole = &model.Role{Base: model.Base{ResourceID: id}}
			}
			auditLog.Details.OldData = oldRole
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

// GetRolePolicy gets the policy document for a role
//
//	@Summary		Get the policy document for a role
//	@Description	Get the policy document for a role
//	@ID             getRolePolicy
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Role ID"
//	@Success		200	{object}	util.Response[model.PolicyDocument]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id}/policy [get]
func (c *RoleController) GetRolePolicy(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "invalid role ID"))
		return
	}

	policyDocument, err := c.service.RoleService.GetRolePolicy(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, policyDocument)
}

// SetRolePolicy sets the policy for a role
//
//	@Summary		Set the policy for a role
//	@Description	Set the policy for a role
//	@ID             setRolePolicy
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id				path		string					true	"Role ID"
//	@Param			request		body		model.PolicyDocument	true	"Set role policy request"
//	@Success		200				{object}	util.Response[model.Role]
//	@Failure		400				{object}	util.ErrorResponse
//	@Failure		500				{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id}/policy [put]
func (c *RoleController) SetRolePolicy(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "invalid role ID"))
		return
	}

	var req model.PolicyDocument

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			// Update policy document for the role
			role, err := c.service.RoleService.SetRolePolicy(ctx, id, req)
			if err != nil {
				return util.NewError("E5001", err)
			}

			middleware.ClearUserCache()

			util.RespondWithSuccess(ctx, http.StatusOK, role)
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = req
			// Get role information before setting policy for audit log
			oldRole, err := c.service.RoleService.GetRole(ctx, id)
			if err != nil {
				oldRole = &model.Role{Base: model.Base{ResourceID: id}}
			}
			auditLog.Details.OldData = oldRole
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

func init() {
	middleware.RegisterPermission("Role Management", "Manage role creation, editing, deletion, and permission assignment", []model.Permission{
		{
			Code:             "authorization:role:view",
			Name:             "View roles",
			Description:      "View role list and details",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator", "viewer"},
		},
		{
			Code:             "authorization:role:create",
			Name:             "Create roles",
			Description:      "Create new roles",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator"},
		},
		{
			Code:             "authorization:role:update",
			Name:             "Update roles",
			Description:      "Update role information",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator"},
		},
		{
			Code:          "authorization:role:delete",
			Name:          "Delete roles",
			Description:   "Delete roles",
			OrgPermission: true,
		},
	})
}
