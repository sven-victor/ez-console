package systemapi

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// SecuritySettingController Security settings controller
type SecuritySettingController struct {
	service *service.Service
}

// NewSecuritySettingController Create security settings controller
func NewSecuritySettingController(service *service.Service) *SecuritySettingController {
	return &SecuritySettingController{service: service}
}

// RegisterRoutes Register routes
func (c *SecuritySettingController) RegisterRoutes(router *gin.RouterGroup) {
	security := router.Group("/security-settings")
	{
		// Get security settings
		security.GET("", middleware.RequirePermission("system:settings:view"), c.GetSecuritySettings)

		// Update security settings
		security.PUT("", middleware.RequirePermission("system:settings:update"), c.UpdateSecuritySettings)

		// Check password complexity
		security.POST("/check-password", middleware.RequirePermission("system:settings:view"), c.CheckPasswordComplexity)
	}
}

// GetSecuritySettings Get security settings
//
//	@Summary		Get security settings
//	@Description	Get security settings
//	@ID             getSecuritySettings
//	@Tags			System Settings/Security
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[model.SecuritySettings]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/security-settings [get]
func (c *SecuritySettingController) GetSecuritySettings(ctx *gin.Context) {
	settings, err := c.service.GetSecuritySettings(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, settings)
}

// UpdateSecuritySettings Update security settings
//
//	@Summary		Update security settings
//	@Description	Update security settings
//	@ID             updateSecuritySettings
//	@Tags			System Settings/Security
//	@Accept			json
//	@Produce		json
//	@Param			request		body		model.SecuritySettings	true	"Update security settings request"
//	@Success		200	{object}	util.Response[model.SecuritySettings]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/security-settings [put]
func (c *SecuritySettingController) UpdateSecuritySettings(ctx *gin.Context) {
	// Parse request body
	var req model.SecuritySettings
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
			err := c.service.UpdateSecuritySettings(ctx, &req)
			if err != nil {
				return util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E5002",
					Err:      err,
				}
			}

			util.RespondWithSuccess(ctx, http.StatusOK, gin.H{"message": "Security settings updated successfully"})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			// Get settings before update for audit log
			oldSettings, err := c.service.GetSecuritySettings(ctx)
			if err == nil {
				auditLog.Details.OldData = oldSettings
			}
			auditLog.Details.NewData = req
			auditLog.Action = "system:security_settings:update"
			auditLog.ActionName = "Update security settings"
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

type CheckPasswordComplexityRequest struct {
	Password string `json:"password" binding:"required"`
}

type CheckPasswordComplexityResponse struct {
	IsValid bool `json:"is_valid"`
}

// CheckPasswordComplexity Check password complexity
//
//	@Summary		Check password complexity
//	@Description	Check password complexity
//	@ID             checkPasswordComplexity
//	@Tags			System Settings/Security
//	@Accept			json
//	@Produce		json
//	@Param			request	body		CheckPasswordComplexityRequest	true	"Check password complexity request"
//	@Success		200	{object}	util.Response[CheckPasswordComplexityResponse]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/security-settings/check-password [post]
func (c *SecuritySettingController) CheckPasswordComplexity(ctx *gin.Context) {
	var req CheckPasswordComplexityRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
		return
	}

	// Check password complexity
	isMet, err := c.service.IsPasswordComplexityMet(ctx, req.Password)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, CheckPasswordComplexityResponse{IsValid: isMet})
}

func init() {
	middleware.RegisterPermission("Security Settings", "Manage system security parameters", []model.Permission{
		{
			Code:        "system:security:view",
			Name:        "View security settings",
			Description: "View system security settings",
		},
		{
			Code:        "system:security:update",
			Name:        "Update security settings",
			Description: "Update system security settings",
		},
	})
}
