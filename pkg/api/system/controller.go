package systemapi

import (
	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/service"
)

type Controller struct {
	*OAuthSettingController
	*SettingController
	*SecuritySettingController
	*SystemController
	*LDAPSettingController
	*SMTPSettingController
}

func NewController(svc *service.Service) *Controller {
	return &Controller{
		OAuthSettingController:    NewOAuthSettingController(svc),
		SettingController:         NewSettingController(svc),
		SecuritySettingController: NewSecuritySettingController(svc),
		SystemController:          NewSystemController(svc),
		LDAPSettingController:     NewLDAPSettingController(svc),
		SMTPSettingController:     NewSMTPSettingController(svc),
	}
}

func (c *Controller) RegisterRoutes(router *gin.RouterGroup) {
	system := router.Group("/system")
	// Register OAuth settings controller
	c.OAuthSettingController.RegisterRoutes(system)
	// Register settings controller
	c.SettingController.RegisterRoutes(system)
	// Register security settings controller
	c.SecuritySettingController.RegisterRoutes(system)
	// Register system controller
	c.SystemController.RegisterRoutes(system)
	// Register LDAP settings controller
	c.LDAPSettingController.RegisterRoutes(system)
	// Register SMTP settings controller
	c.SMTPSettingController.RegisterRoutes(system)
}
