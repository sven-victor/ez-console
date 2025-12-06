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

package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/demo/backend/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-console/server"
)

type TestController struct {
	service *service.TestService
}

func (c *TestController) Test(ctx *gin.Context) {
	resp, err := c.service.Test(ctx, ctx.Request)
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, resp)
}

func NewTestController() *TestController {
	return &TestController{service: service.NewTestService()}
}

func (c *TestController) RegisterRoutes(router *gin.RouterGroup) {
	router.POST("/test", c.Test)
}

func init() {
	server.RegisterControllers(func(svc server.Service) server.Controller {
		return NewTestController()
	})
}
