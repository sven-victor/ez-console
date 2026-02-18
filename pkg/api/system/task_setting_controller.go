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
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// TaskSettingController handles task system settings
type TaskSettingController struct {
	service *service.Service
}

// NewTaskSettingController creates a new TaskSettingController
func NewTaskSettingController(service *service.Service) *TaskSettingController {
	return &TaskSettingController{service: service}
}

// RegisterRoutes registers task setting routes
func (c *TaskSettingController) RegisterRoutes(router *gin.RouterGroup) {
	taskSettings := router.Group("/task-settings")
	{
		taskSettings.GET("", middleware.RequirePermission("system:settings:view"), c.GetTaskSettings)
		taskSettings.PUT("", middleware.RequirePermission("system:settings:update"), c.UpdateTaskSettings)
	}
}

// GetTaskSettings returns task settings
//
//	@Summary		Get task settings
//	@Description	Get task-related system settings (e.g. max concurrent tasks)
//	@ID             getTaskSettings
//	@Tags			System Settings/Task
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[model.TaskSettings]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/task-settings [get]
func (c *TaskSettingController) GetTaskSettings(ctx *gin.Context) {
	settings, err := c.service.GetTaskSettings(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, settings)
}

// UpdateTaskSettings updates task settings
//
//	@Summary		Update task settings
//	@Description	Update task-related system settings
//	@ID             updateTaskSettings
//	@Tags			System Settings/Task
//	@Accept			json
//	@Produce		json
//	@Param			request	body		model.TaskSettings	true	"Task settings"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/task-settings [put]
func (c *TaskSettingController) UpdateTaskSettings(ctx *gin.Context) {
	var req model.TaskSettings
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
		return
	}
	if err := c.service.UpdateTaskSettings(ctx, &req); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, util.MessageData{Message: "Task settings updated successfully"})
}
