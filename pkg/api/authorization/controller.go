package authorizationapi

import (
	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/service"
)

type Controller struct {
	*UserController
	*RoleController
	*PermissionController
	*ServiceAccountController
	*SessionController
	*MFAController
	*OAuthController
}

func NewController(svc *service.Service) *Controller {
	roleController := NewRoleController(svc)
	permissionController := NewPermissionController(svc)
	userController := NewUserController(svc)
	mfaController := NewMFAController(svc)
	sessionController := NewSessionController(svc)
	serviceAccountController := NewServiceAccountController(svc)
	oauthController := NewOAuthController(svc)
	return &Controller{
		UserController:           userController,
		RoleController:           roleController,
		PermissionController:     permissionController,
		ServiceAccountController: serviceAccountController,
		SessionController:        sessionController,
		MFAController:            mfaController,
		OAuthController:          oauthController,
	}
}

func (c *Controller) RegisterRoutes(router *gin.RouterGroup) {
	authorization := router.Group("/authorization")
	// Register user controller
	c.UserController.RegisterRoutes(authorization)
	// Register role controller
	c.RoleController.RegisterRoutes(authorization)
	// Register permission controller
	c.PermissionController.RegisterRoutes(authorization)
	// Register service account controller
	c.ServiceAccountController.RegisterRoutes(authorization)
	// Register session controller
	c.SessionController.RegisterRoutes(authorization)
	// Register MFA controller
	c.MFAController.RegisterRoutes(authorization)
	// Register OAuth controller
	c.OAuthController.RegisterRoutes(router)
}
