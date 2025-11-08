package systemapi

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// OrganizationController API controller for organization-related operations
type OrganizationController struct {
	service *service.Service
}

// NewOrganizationController creates a new organization controller
func NewOrganizationController(service *service.Service) *OrganizationController {
	return &OrganizationController{service: service}
}

// RegisterRoutes registers organization-related routes
func (c *OrganizationController) RegisterRoutes(router *gin.RouterGroup) {
	orgs := router.Group("/organizations")
	{
		orgs.GET("", c.ListOrganizations)
		orgs.GET("/:id", c.GetOrganization)
		orgs.POST("", middleware.RequirePermission("system:organization:create"), c.CreateOrganization)
		orgs.PUT("/:id", middleware.RequirePermission("system:organization:update"), c.UpdateOrganization)
		orgs.DELETE("/:id", middleware.RequirePermission("system:organization:delete"), c.DeleteOrganization)
		orgs.GET("/user/:user_id", c.GetUserOrganizations)
		orgs.GET("/:id/users", c.ListOrganizationUsers)
		orgs.POST("/:id/users", middleware.RequirePermission("system:organization:update"), c.AddUserToOrganization)
		orgs.PUT("/:id/users/:user_id/roles", middleware.RequirePermission("system:organization:update"), c.UpdateUserOrganizationRoles)
		orgs.DELETE("/:id/users/:user_id", middleware.RequirePermission("system:organization:update"), c.RemoveUserFromOrganization)
	}
}

func (c *OrganizationController) hasPermission(ctx *gin.Context, orgID *string, permission string) (bool, error) {
	roles := middleware.GetRolesFromContext(ctx)
	if roles == nil {
		return false, util.NewErrorMessage("E4031", "No roles found")
	}
	for _, role := range roles {
		if role.OrganizationID == nil || *role.OrganizationID == "" {
			if role.HasPermission(permission) {
				return true, nil
			}
		} else if orgID != nil && *orgID == *role.OrganizationID && role.HasPermission(permission) {
			return true, nil
		}
	}
	return false, nil
}

// ListOrganizations gets a list of organizations
//
//	@Summary		Get a list of organizations
//	@Description	Get a list of organizations
//	@ID             listOrganizations
//	@Tags			System Settings/Organization
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int		false	"Current page"	default(1)
//	@Param			page_size	query		int		false	"Page size"		default(10)
//	@Param			search		query		string	false	"Search"
//	@Success		200			{object}	util.PaginationResponse[model.Organization]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/system/organizations [get]
func (c *OrganizationController) ListOrganizations(ctx *gin.Context) {
	// Get pagination parameters
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")

	hasGlobalOrganizationPermission, err := c.hasPermission(ctx, nil, "system:organization:view")
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}

	var orgs []model.Organization
	var total int64
	if hasGlobalOrganizationPermission {
		// Call service to get organization list
		orgs, total, err = c.service.OrganizationService.ListOrganizations(ctx, current, pageSize, search)
		if err != nil {
			util.RespondWithError(ctx, util.NewError("E5001", err))
			return
		}
	} else {
		orgs, err = c.service.OrganizationService.GetUserOrganizations(ctx, middleware.GetUserIDFromContext(ctx))
		if err != nil {
			util.RespondWithError(ctx, util.NewError("E5001", err))
			return
		}
		total = int64(len(orgs))
	}

	// Return paginated data
	util.RespondWithSuccessList(ctx, http.StatusOK, orgs, total, current, pageSize)
}

// GetOrganization gets an organization by ID
//
//	@Summary		Get an organization by ID
//	@Description	Get an organization by ID
//	@ID             getOrganization
//	@Tags			System Settings/Organization
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Organization ID"
//	@Success		200	{object}	util.Response[model.Organization]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/organizations/{id} [get]
func (c *OrganizationController) GetOrganization(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid organization ID"))
		return
	}
	hasPermission, err := c.hasPermission(ctx, &id, "system:organization:view")
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
	if !hasPermission {
		util.RespondWithError(ctx, util.NewErrorMessage("E4031", "No permission to view organization"))
		return
	}
	org, err := c.service.OrganizationService.GetOrganization(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, org)
}

type CreateOrganizationRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" validate:"optional"`
	Status      string `json:"status"`
}

// CreateOrganization creates a new organization
//
//	@Summary		Create a new organization
//	@Description	Create a new organization
//	@ID             createOrganization
//	@Tags			System Settings/Organization
//	@Accept			json
//	@Produce		json
//	@Param			request	body		CreateOrganizationRequest	true	"Organization data"
//	@Success		200		{object}	util.Response[model.Organization]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/organizations [post]
func (c *OrganizationController) CreateOrganization(ctx *gin.Context) {
	var req CreateOrganizationRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	if req.Status == "" {
		req.Status = model.OrganizationStatusActive
	}

	org := &model.Organization{
		Name:        req.Name,
		Description: req.Description,
		Status:      req.Status,
	}

	err := c.service.AuditLogService.StartAudit(
		ctx,
		"",
		func(auditLog *model.AuditLog) error {
			if err := c.service.OrganizationService.CreateOrganization(ctx, org); err != nil {
				return err
			}

			util.RespondWithSuccess(ctx, http.StatusOK, org)
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.NewData = org
		}),
		service.WithAfterFilters(func(auditLog *model.AuditLog) {
			auditLog.ResourceID = org.ResourceID
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

type UpdateOrganizationRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" validate:"optional"`
	Status      string `json:"status" binding:"required"`
}

// UpdateOrganization updates an organization
//
//	@Summary		Update an organization
//	@Description	Update an organization
//	@ID             updateOrganization
//	@Tags			System Settings/Organization
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string						true	"Organization ID"
//	@Param			request	body		UpdateOrganizationRequest	true	"Organization data"
//	@Success		200		{object}	util.Response[model.Organization]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/organizations/{id} [put]
func (c *OrganizationController) UpdateOrganization(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid organization ID"))
		return
	}

	var req UpdateOrganizationRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	oldOrg, err := c.service.OrganizationService.GetOrganization(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	org := &model.Organization{
		Name:        req.Name,
		Description: req.Description,
		Status:      req.Status,
	}

	err = c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			if err := c.service.OrganizationService.UpdateOrganization(ctx, id, org); err != nil {
				return err
			}

			updatedOrg, err := c.service.OrganizationService.GetOrganization(ctx, id)
			if err != nil {
				return err
			}

			util.RespondWithSuccess(ctx, http.StatusOK, updatedOrg)
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.OldData = oldOrg
			auditLog.Details.NewData = org
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

// DeleteOrganization deletes an organization
//
//	@Summary		Delete an organization
//	@Description	Delete an organization
//	@ID             deleteOrganization
//	@Tags			System Settings/Organization
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Organization ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/organizations/{id} [delete]
func (c *OrganizationController) DeleteOrganization(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid organization ID"))
		return
	}

	oldOrg, err := c.service.OrganizationService.GetOrganization(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	err = c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			if err := c.service.OrganizationService.DeleteOrganization(ctx, id); err != nil {
				return err
			}

			util.RespondWithMessage(ctx, "Organization deleted successfully")
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.OldData = oldOrg
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

// GetUserOrganizations gets all organizations a user belongs to
//
//	@Summary		Get user organizations
//	@Description	Get all organizations a user belongs to
//	@ID             getUserOrganizations
//	@Tags			System Settings/Organization
//	@Accept			json
//	@Produce		json
//	@Param			user_id	path		string	true	"User ID"
//	@Success		200		{object}	util.Response[[]model.Organization]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/organizations/user/{user_id} [get]
func (c *OrganizationController) GetUserOrganizations(ctx *gin.Context) {
	userID := ctx.Param("user_id")
	if userID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid user ID"))
		return
	}
	hasPermission, err := c.hasPermission(ctx, nil, "system:organization:view")
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
	if !hasPermission {
		util.RespondWithError(ctx, util.NewErrorMessage("E4031", "No permission to view organization"))
		return
	}

	orgs, err := c.service.OrganizationService.GetUserOrganizations(ctx, userID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, orgs)
}

// ListOrganizationUsers lists users in an organization
//
//	@Summary		List organization users
//	@Description	List users in an organization with their roles
//	@ID             listOrganizationUsers
//	@Tags			System Settings/Organization
//	@Accept			json
//	@Produce		json
//	@Param			id			path		string	true	"Organization ID"
//	@Param			current		query		int		false	"Current page"	default(1)
//	@Param			page_size	query		int		false	"Page size"		default(10)
//	@Param			search		query		string	false	"Search"
//	@Success		200			{object}	util.PaginationResponse[service.OrganizationUser]
//	@Failure		400			{object}	util.ErrorResponse
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/system/organizations/{id}/users [get]
func (c *OrganizationController) ListOrganizationUsers(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid organization ID"))
		return
	}
	hasPermission, err := c.hasPermission(ctx, &id, "system:organization:view")
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
	if !hasPermission {
		util.RespondWithError(ctx, util.NewErrorMessage("E4031", "No permission to view organization"))
		return
	}

	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")

	users, total, err := c.service.OrganizationService.ListOrganizationUsers(ctx, id, current, pageSize, search)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccessList(ctx, http.StatusOK, users, total, current, pageSize)
}

type AddUserToOrganizationRequest struct {
	UserID  string   `json:"user_id" binding:"required"`
	RoleIDs []string `json:"role_ids"`
}

// AddUserToOrganization adds a user to an organization
//
//	@Summary		Add user to organization
//	@Description	Add a user to an organization with specified roles
//	@ID             addUserToOrganization
//	@Tags			System Settings/Organization
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string							true	"Organization ID"
//	@Param			request	body		AddUserToOrganizationRequest	true	"User data"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/organizations/{id}/users [post]
func (c *OrganizationController) AddUserToOrganization(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid organization ID"))
		return
	}

	var req AddUserToOrganizationRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			if err := c.service.OrganizationService.AddUserToOrganization(ctx, id, req.UserID, req.RoleIDs); err != nil {
				return err
			}

			util.RespondWithMessage(ctx, "User added to organization successfully")
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

type UpdateUserOrganizationRolesRequest struct {
	RoleIDs []string `json:"role_ids"`
}

// UpdateUserOrganizationRoles updates a user's roles in an organization
//
//	@Summary		Update user organization roles
//	@Description	Update a user's roles in an organization
//	@ID             updateUserOrganizationRoles
//	@Tags			System Settings/Organization
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string								true	"Organization ID"
//	@Param			user_id	path		string								true	"User ID"
//	@Param			request	body		UpdateUserOrganizationRolesRequest	true	"Role data"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/organizations/{id}/users/{user_id}/roles [put]
func (c *OrganizationController) UpdateUserOrganizationRoles(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid organization ID"))
		return
	}

	userID := ctx.Param("user_id")
	if userID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid user ID"))
		return
	}

	var req UpdateUserOrganizationRolesRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			if err := c.service.OrganizationService.UpdateUserOrganizationRoles(ctx, id, userID, req.RoleIDs); err != nil {
				return err
			}

			util.RespondWithMessage(ctx, "User organization roles updated successfully")
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

// RemoveUserFromOrganization removes a user from an organization
//
//	@Summary		Remove user from organization
//	@Description	Remove a user from an organization and remove their roles in that organization
//	@ID             removeUserFromOrganization
//	@Tags			System Settings/Organization
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string	true	"Organization ID"
//	@Param			user_id	path		string	true	"User ID"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/organizations/{id}/users/{user_id} [delete]
func (c *OrganizationController) RemoveUserFromOrganization(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid organization ID"))
		return
	}

	userID := ctx.Param("user_id")
	if userID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid user ID"))
		return
	}

	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			if err := c.service.OrganizationService.RemoveUserFromOrganization(ctx, id, userID); err != nil {
				return err
			}

			util.RespondWithMessage(ctx, "User removed from organization successfully")
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = map[string]interface{}{
				"user_id": userID,
			}
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

func init() {
	middleware.RegisterPermission("System Settings", "Manage system parameters", []model.Permission{
		{
			Code:          "system:organization:view",
			Name:          "View organizations",
			Description:   "View organization list and details",
			OrgPermission: true,
		},
		{
			Code:        "system:organization:create",
			Name:        "Create organization",
			Description: "Create new organizations",
		},
		{
			Code:          "system:organization:update",
			Name:          "Update organization",
			Description:   "Update organization information",
			OrgPermission: true,
		},
		{
			Code:        "system:organization:delete",
			Name:        "Delete organization",
			Description: "Delete organizations",
		},
	})
}
