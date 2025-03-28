package authorizationapi

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// PermissionController API controller for permission-related operations
type PermissionController struct {
	service *service.Service
}

func NewPermissionController(service *service.Service) *PermissionController {
	return &PermissionController{service: service}
}

// RegisterRoutes registers permission-related routes
func (c *PermissionController) RegisterRoutes(router *gin.RouterGroup) {
	permissions := router.Group("/permissions")
	{
		permissions.GET("", middleware.RequirePermission("authorization:permission:view"), c.ListPermissions)
		permissions.GET("/:id", middleware.RequirePermission("authorization:permission:view"), c.GetPermission)
		permissions.POST("", middleware.RequirePermission("authorization:permission:create"), c.CreatePermission)
		permissions.PUT("/:id", middleware.RequirePermission("authorization:permission:update"), c.UpdatePermission)
		permissions.DELETE("/:id", middleware.RequirePermission("authorization:permission:delete"), c.DeletePermission)
	}
}

// ListPermissions gets a list of permissions
func (c *PermissionController) ListPermissions(ctx *gin.Context) {
	permissions, err := c.service.ListPermissions(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5001",
			Err:     err,
			Message: "failed to get permissions",
		})
		return
	}
	var data []*model.PermissionGroup
	groups := middleware.GetPermissions()
	other := model.PermissionGroup{
		Name:        "Other",
		Description: "Other",
	}
	for _, group := range groups {
		g := model.PermissionGroup{
			Name:        group.Name,
			Description: group.Description,
		}
		data = append(data, &g)
	}

loop:
	for _, permission := range permissions {
		for idx, group := range groups {
			perm := group.GetPermission(permission.Code)
			if perm != nil {
				data[idx].Permissions = append(data[idx].Permissions, permission)
				continue loop
			}
		}
		other.Permissions = append(other.Permissions, permission)
	}
	if len(other.Permissions) > 0 {
		data = append(data, &other)
	}
	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": data,
	})
}

// GetPermission gets a permission by ID
func (c *PermissionController) GetPermission(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code: "E4001",
			Err:  errors.New("invalid permission ID"),
		})
		return
	}

	permission, err := c.service.GetPermission(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": permission,
	})
}

// CreatePermission creates a new permission
func (c *PermissionController) CreatePermission(ctx *gin.Context) {
	var req struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
		Code        string `json:"code" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4002",
			Err:      err,
		})
		return
	}

	permission, err := c.service.CreatePermission(ctx, req.Name, req.Description, req.Code)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Err:      err,
			Code:     "E4002",
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"code": "0",
		"data": permission,
	})
}

// UpdatePermission updates a permission
func (c *PermissionController) UpdatePermission(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid permission ID"),
		})
		return
	}

	var req struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
		Code        string `json:"code" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4002",
			Err:      err,
		})
		return
	}

	permission, err := c.service.UpdatePermission(ctx, id, req.Name, req.Description, req.Code)
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": permission,
	})
}

// DeletePermission deletes a permission
func (c *PermissionController) DeletePermission(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid permission ID"),
		})
		return
	}

	err := c.service.DeletePermission(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5001",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": gin.H{"message": "Deleted successfully"},
	})
}

func init() {
	middleware.RegisterPermission("Permission Management", "Manage permissions", []model.Permission{
		{
			Code:        "authorization:permission:view",
			Name:        "View permissions",
			Description: "View permission list and details",
		},
		{
			Code:        "authorization:permission:create",
			Name:        "Create permissions",
			Description: "Create new permissions",
		},
		{
			Code:        "authorization:permission:update",
			Name:        "Update permissions",
			Description: "Update permission information",
		},
		{
			Code:        "authorization:permission:delete",
			Name:        "Delete permissions",
			Description: "Delete permissions",
		},
	})
}
