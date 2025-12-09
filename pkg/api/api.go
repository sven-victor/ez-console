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

package api

import (
	"github.com/gin-gonic/gin"
	aiapi "github.com/sven-victor/ez-console/pkg/api/ai"
	authorizationapi "github.com/sven-victor/ez-console/pkg/api/authorization"
	fileapi "github.com/sven-victor/ez-console/pkg/api/files"
	mcpapi "github.com/sven-victor/ez-console/pkg/api/mcp"
	statisticsapi "github.com/sven-victor/ez-console/pkg/api/statistics"
	systemapi "github.com/sven-victor/ez-console/pkg/api/system"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/service"
)

type Controller interface {
	RegisterRoutes(router *gin.RouterGroup)
}

type ControllerGenerator func(svc *service.Service) Controller

var controllers = []ControllerGenerator{
	func(svc *service.Service) Controller {
		return authorizationapi.NewController(svc)
	},
	func(svc *service.Service) Controller {
		return systemapi.NewController(svc)
	},
	func(svc *service.Service) Controller {
		return fileapi.NewController(svc)
	},
	func(svc *service.Service) Controller {
		return statisticsapi.NewController(svc)
	},
	func(svc *service.Service) Controller {
		return aiapi.NewController(svc)
	},
	func(svc *service.Service) Controller {
		return mcpapi.NewController(svc)
	},
}

// RegisterControllers registers all API controllers to the routing engine.
func RegisterControllers(router *gin.Engine, svc *service.Service) {
	api := router.Group("/api")
	api.Use(middleware.AuthenticationMiddleware())

	for _, controller := range controllers {
		controller(svc).RegisterRoutes(api)
	}
}

// AddControllers adds API controllers.
func AddControllers(controller ...ControllerGenerator) {
	controllers = append(controllers, controller...)
}
