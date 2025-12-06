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

// SettingController System settings controller
type SettingController struct {
	service *service.Service
}

// NewSettingController Create system settings controller
func NewSettingController(service *service.Service) *SettingController {
	return &SettingController{service: service}
}

// RegisterRoutes Register routes
func (c *SettingController) RegisterRoutes(router *gin.RouterGroup) {
	// System settings routes, require administrator privileges
	settings := router.Group("/base-settings")
	middleware.WithoutAuthentication(settings)
	{
		// Get settings
		settings.GET("", c.GetSystemBaseSettings)

		// Update settings
		settings.PUT("", middleware.RequirePermission("system:settings:update"), c.UpdateSystemBaseSettings)
	}
}

// GetSettings Get all system settings
//
//	@Summary		Get all system settings
//	@Description	Get all system settings
//	@ID             getSystemBaseSettings
//	@Tags			System Settings/Base
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[model.SystemSettings]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/base-settings [get]
func (c *SettingController) GetSystemBaseSettings(ctx *gin.Context) {
	settings, err := c.service.GetSystemSettings(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, settings)
}

// UpdateSettings Batch update system settings
//
//	@Summary		Batch update system settings
//	@Description	Batch update system settings
//	@ID             updateSystemBaseSettings
//	@Tags			System Settings/Base
//	@Accept			json
//	@Produce		json
//	@Param			request	body	model.SystemSettings	true	"Base system settings"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/base-settings [put]
func (c *SettingController) UpdateSystemBaseSettings(ctx *gin.Context) {
	// Parse request body
	var req model.SystemSettings
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		"",
		func(auditLog *model.AuditLog) error {
			// Update settings
			err := c.service.UpdateSystemSettings(ctx, req)
			if err != nil {
				return err
			}

			util.RespondWithMessage(ctx, "System settings updated successfully")
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {

			// Get settings before update for audit log
			oldSettings, err := c.service.SettingService.GetSettingsMap(ctx)
			if err != nil {
				util.RespondWithError(ctx, util.NewError("E5001", err))
				return
			}

			auditLog.Details.OldData = oldSettings
			auditLog.Details.NewData = req
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

func init() {
	middleware.RegisterPermission("System Settings", "Manage system parameters", []model.Permission{
		{
			Code:        "system:settings:view",
			Name:        "View settings",
			Description: "View system settings",
		},
		{
			Code:        "system:settings:update",
			Name:        "Update settings",
			Description: "Update system settings",
		},
	})
}
