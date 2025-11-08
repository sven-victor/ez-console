package authorizationapi

import (
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
		permissions.GET("", c.ListPermissions)
	}
}

// ListPermissions gets a list of permissions
//
//	@Summary		Get a list of permissions
//	@Description	Get a list of permissions
//	@ID             listPermissions
//	@Tags			Authorization/Permission
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[[]model.PermissionGroup]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/permissions [get]
func (c *PermissionController) ListPermissions(ctx *gin.Context) {
	var hasPermission bool
	roles := middleware.GetRolesFromContext(ctx)
	for _, role := range roles {
		if role.HasPermission("authorization:role:create") || role.HasPermission("authorization:role:update") {
			hasPermission = true
			break
		}
	}
	if !hasPermission {
		util.RespondWithError(ctx, util.NewErrorMessage("E4031", "no permission to view permissions", nil))
		return
	}
	permissions, err := c.service.ListPermissions(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "failed to get permissions", err))
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
	util.RespondWithSuccess(ctx, http.StatusOK, data)
}

func init() {
}
