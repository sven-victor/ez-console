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
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
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
		taskSettings.GET("/fields", middleware.RequirePermission("system:settings:view"), c.GetTaskSettingFields)
		taskSettings.GET("/log-storage-backends", middleware.RequirePermission("system:settings:view"), c.ListLogStorageBackends)
	}
}

type TaskSettingResponse struct {
	Code    string         `json:"code"`
	Data    map[string]any `json:"data"`
	Err     string         `json:"err,omitempty"`
	TraceID string         `json:"trace_id,omitempty"`
}

// GetTaskSettings returns task settings
//
//	@Summary		Get task settings
//	@Description	Get task-related system settings as a flat key-value map. Keys include "log_storage_backend" and all registered extensible fields (task_* prefixed).
//	@ID             getTaskSettings
//	@Tags			System Settings/Task
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	TaskSettingResponse
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
//	@Description	Update task-related system settings. Request body is a flat key-value map identical to the GET response shape.
//	@ID             updateTaskSettings
//	@Tags			System Settings/Task
//	@Accept			json
//	@Produce		json
//	@Param			request	body		map[string]any	true	"Task settings flat map"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/task-settings [put]
func (c *TaskSettingController) UpdateTaskSettings(ctx *gin.Context) {
	var req map[string]any
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
		return
	}
	if err := c.service.UpdateTaskSettings(ctx, req); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, util.MessageData{Message: "Task settings updated successfully"})
}

// GetTaskSettingFields returns all registered extensible task setting field definitions.
//
//	@Summary		Get registered task setting fields
//	@Description	Returns the list of extensible task setting field definitions (key, value_type, default_value).
//	@ID             getTaskSettingFields
//	@Tags			System Settings/Task
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[[]model.TaskSettingField]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/task-settings/fields [get]
func (c *TaskSettingController) GetTaskSettingFields(ctx *gin.Context) {
	util.RespondWithSuccess(ctx, http.StatusOK, model.GetRegisteredTaskSettingFields())
}

// ListLogStorageBackends returns the list of registered log storage backends for task log storage selection.
//
//	@Summary		List log storage backends
//	@Description	Returns registered log storage backend options (e.g. database) for use in task settings.
//	@ID             listLogStorageBackends
//	@Tags			System Settings/Task
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[[]model.LogStorageBackendOption]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/task-settings/log-storage-backends [get]
func (c *TaskSettingController) ListLogStorageBackends(ctx *gin.Context) {
	names := taskscheduler.ListLogStoreBackendNames()
	list := make([]model.LogStorageBackendOption, 0, len(names))
	for _, id := range names {
		if id == "" {
			continue
		}
		name := strings.ToUpper(id[0:1]) + strings.ToLower(id[1:])
		list = append(list, model.LogStorageBackendOption{ID: id, Name: name})
	}
	util.RespondWithSuccess(ctx, http.StatusOK, list)
}
