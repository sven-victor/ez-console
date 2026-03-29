// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package controller

import (
	"context"
	"net/http"

	svc "{{.ServiceImport}}"
	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-console/server"
)

type {{.Name}}Controller struct {
	service *svc.{{.Name}}Service
}

func New{{.Name}}Controller() *{{.Name}}Controller {
	return &{{.Name}}Controller{service: svc.New{{.Name}}Service()}
}

func (c *{{.Name}}Controller) List{{.Plural}}(ctx *gin.Context) {
	util.RespondWithSuccessList(ctx, http.StatusOK, []map[string]any{}, 0, 1, 10)
}

func (c *{{.Name}}Controller) Get{{.Name}}(ctx *gin.Context) {
	id := ctx.Param("id")
	util.RespondWithSuccess(ctx, http.StatusOK, map[string]any{"id": id})
}

func (c *{{.Name}}Controller) Create{{.Name}}(ctx *gin.Context) {
	util.RespondWithSuccess(ctx, http.StatusCreated, map[string]any{})
}

func (c *{{.Name}}Controller) Update{{.Name}}(ctx *gin.Context) {
	id := ctx.Param("id")
	util.RespondWithSuccess(ctx, http.StatusOK, map[string]any{"id": id})
}

func (c *{{.Name}}Controller) Delete{{.Name}}(ctx *gin.Context) {
	id := ctx.Param("id")
	util.RespondWithSuccess(ctx, http.StatusOK, map[string]any{"id": id})
}

func (c *{{.Name}}Controller) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	g := router.Group("/{{.Resource}}")
	{
		g.GET("", c.List{{.Plural}})
		g.GET("/:id", c.Get{{.Name}})
		g.POST("", c.Create{{.Name}})
		g.PUT("/:id", c.Update{{.Name}})
		g.DELETE("/:id", c.Delete{{.Name}})
	}
}

func init() {
	server.RegisterControllers(func(ctx context.Context, _ server.Service) server.Controller {
		return New{{.Name}}Controller()
	})
}
