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

package server

import (
	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/api"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/service"
)

type Controller interface {
	RegisterRoutes(router *gin.RouterGroup)
}

type AuthController struct {
	Controller
}

type ControllerGenerator func(svc Service) Controller

var (
	AuthenticationMiddleware    = middleware.AuthenticationMiddleware()
	RequirePermissionMiddleware = middleware.RequirePermission
)

func RegisterControllers(controller ...ControllerGenerator) {
	for _, c := range controller {
		api.AddControllers(func(svc *service.Service) api.Controller {
			return c(svc)
		})
	}
}
