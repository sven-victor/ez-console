package authorizationapi

import (
	"errors"
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
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int		false	"Current page"	default(1)
//	@Param			page_size	query		int		false	"Page size"		default(10)
//	@Param			search		query		string	false	"Search"
//	@Success		200			{object}	util.Response{data=[]model.Role}
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/roles [get]
func (c *RoleController) ListRoles(ctx *gin.Context) {
	// Get pagination parameters
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")

	// Call service to get role list
	roles, total, err := c.service.ListRoles(ctx, current, pageSize, search)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5001",
			Err:      err,
		})
		return
	}

	// Return paginated data
	ctx.JSON(http.StatusOK, gin.H{
		"code":      "0",
		"data":      roles,
		"total":     total,
		"current":   current,
		"page_size": pageSize,
	})
}

// GetRole gets a role by ID
//
//	@Summary		Get a role by ID
//	@Description	Get a role by ID
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Role ID"
//	@Success		200	{object}	util.Response{data=model.Role}
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id} [get]
func (c *RoleController) GetRole(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid role ID"),
		})
		return
	}

	role, err := c.service.GetRole(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5002",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": role,
	})
}

type CreateRoleRequest struct {
	Name           string               `json:"name" binding:"required"`
	Description    string               `json:"description"`
	PermissionIDs  []string             `json:"permissions"`
	PolicyDocument model.PolicyDocument `json:"policy_document"`
}

// CreateRole creates a new role
//
//	@Summary		Create a new role
//	@Description	Create a new role
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			request	body		CreateRoleRequest	true	"Create role request"
//	@Success		200		{object}	util.Response{data=model.Role}
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/roles [post]
func (c *RoleController) CreateRole(ctx *gin.Context) {
	var req CreateRoleRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4002",
			Err:      err,
		})
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		"", // Resource ID will be generated upon creation
		func(auditLog *model.AuditLog) error {
			role, err := c.service.CreateRole(ctx, req.Name, req.Description, req.PermissionIDs, req.PolicyDocument)
			if err != nil {
				return util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E5001",
					Err:      err,
				}
			}
			auditLog.Details.NewData = role
			auditLog.ResourceID = role.ResourceID

			ctx.JSON(http.StatusCreated, gin.H{
				"code": "0",
				"data": role,
			})
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
	Name           string               `json:"name" binding:"required"`
	Description    string               `json:"description"`
	PermissionIDs  []string             `json:"permissions"`
	PolicyDocument model.PolicyDocument `json:"policy_document"`
}

// UpdateRole updates a role
//
//	@Summary		Update a role
//	@Description	Update a role
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string		true	"Role ID"
//	@Param			request	body		UpdateRoleRequest	true	"Update role request"
//	@Success		200		{object}	util.Response{data=model.Role}
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id} [put]
func (c *RoleController) UpdateRole(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid role ID"),
		})
		return
	}

	var req UpdateRoleRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4002",
			Err:      err,
		})
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			role, err := c.service.UpdateRole(ctx, id, req.Name, req.Description, req.PermissionIDs, req.PolicyDocument)
			if err != nil {
				return util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E5001",
					Err:      err,
				}
			}

			middleware.ClearUserCache()

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": role,
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = req
			// Get role information before update for audit log
			oldRole, err := c.service.GetRole(ctx, id)
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
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Role ID"
//	@Success		200	{object}	util.Response{data=model.Role}
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id} [delete]
func (c *RoleController) DeleteRole(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid role ID"),
		})
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			err := c.service.DeleteRole(ctx, id)
			if err != nil {
				return util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E5001",
					Err:      err,
				}
			}

			middleware.ClearUserCache()

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": gin.H{"message": "Role deleted successfully"},
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			// Get role information for audit log
			oldRole, err := c.service.GetRole(ctx, id)
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
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id			path		string		true	"Role ID"
//	@Param			request		body		AssignPermissionsRequest	true	"Assign permissions request"
//	@Success		200			{object}	util.Response{data=model.Role}
//	@Failure		400			{object}	util.ErrorResponse
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id}/permissions [put]
func (c *RoleController) AssignPermissions(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid role ID"),
		})
		return
	}

	var req AssignPermissionsRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4002",
			Err:      err,
		})
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			err := c.service.AssignPermissions(ctx, id, req.PermissionIDs)
			if err != nil {
				return util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E5001",
					Err:      err,
				}
			}

			middleware.ClearUserCache()

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": gin.H{"message": "Permissions assigned successfully"},
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = req
			// Get role information before assigning permissions for audit log
			oldRole, err := c.service.GetRole(ctx, id)
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
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Role ID"
//	@Success		200	{object}	util.Response{data=model.PolicyDocument}
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id}/policy [get]
func (c *RoleController) GetRolePolicy(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid role ID"),
		})
		return
	}

	policyDocument, err := c.service.GetRolePolicy(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5002",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": gin.H{
			"policy_document": policyDocument,
		},
	})
}

type SetRolePolicyRequest struct {
	PolicyDocument model.PolicyDocument `json:"policy_document"`
}

// SetRolePolicy sets the policy for a role
//
//	@Summary		Set the policy for a role
//	@Description	Set the policy for a role
//	@Tags			Authorization/Role
//	@Accept			json
//	@Produce		json
//	@Param			id				path		string					true	"Role ID"
//	@Param			request		body		SetRolePolicyRequest	true	"Set role policy request"
//	@Success		200				{object}	util.Response{data=model.Role}
//	@Failure		400				{object}	util.ErrorResponse
//	@Failure		500				{object}	util.ErrorResponse
//	@Router			/api/authorization/roles/{id}/policy [put]
func (c *RoleController) SetRolePolicy(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid role ID"),
		})
		return
	}

	var req SetRolePolicyRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4002",
			Err:      err,
		})
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			// Update policy document for the role
			role, err := c.service.SetRolePolicy(ctx, id, req.PolicyDocument)
			if err != nil {
				return util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E5001",
					Err:      err,
				}
			}

			middleware.ClearUserCache()

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": role,
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = req
			// Get role information before setting policy for audit log
			oldRole, err := c.service.GetRole(ctx, id)
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
			Code:        "authorization:role:view",
			Name:        "View roles",
			Description: "View role list and details",
		},
		{
			Code:        "authorization:role:create",
			Name:        "Create roles",
			Description: "Create new roles",
		},
		{
			Code:        "authorization:role:update",
			Name:        "Update roles",
			Description: "Update role information",
		},
		{
			Code:        "authorization:role:delete",
			Name:        "Delete roles",
			Description: "Delete roles",
		},
	})
}
