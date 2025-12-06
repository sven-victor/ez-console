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
	*ToolSetController
	*OrganizationController
}

func NewController(svc *service.Service) *Controller {
	return &Controller{
		OAuthSettingController:    NewOAuthSettingController(svc),
		SettingController:         NewSettingController(svc),
		SecuritySettingController: NewSecuritySettingController(svc),
		SystemController:          NewSystemController(svc),
		LDAPSettingController:     NewLDAPSettingController(svc),
		SMTPSettingController:     NewSMTPSettingController(svc),
		ToolSetController:         NewToolSetController(svc),
		OrganizationController:    NewOrganizationController(svc),
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
	// Register toolset controller
	c.ToolSetController.RegisterRoutes(system)
	// Register organization controller
	c.OrganizationController.RegisterRoutes(system)
}
