package systemapi

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/safe"
)

// OAuthSettingController OAuth settings controller
type OAuthSettingController struct {
	service *service.Service
}

// NewOAuthSettingController Create OAuth settings controller
func NewOAuthSettingController(service *service.Service) *OAuthSettingController {
	return &OAuthSettingController{service: service}
}

// RegisterRoutes Register routes
func (c *OAuthSettingController) RegisterRoutes(router *gin.RouterGroup) {
	oauth := router.Group("/oauth-settings")
	{
		// Get OAuth settings
		oauth.GET("", middleware.RequirePermission("system:settings:view"), c.GetOAuthSettings)

		// Update OAuth settings
		oauth.PUT("", middleware.RequirePermission("system:settings:update"), c.UpdateOAuthSettings)
	}
}

// GetOAuthSettings Get OAuth settings
func (c *OAuthSettingController) GetOAuthSettings(ctx *gin.Context) {
	settings, err := c.service.GetOAuthSettings(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5001",
			Err:      err,
		})
		return
	}
	settings.ClientSecret.UpdateSecret(util.GenerateRandomPassword(128))
	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": settings,
	})
}

type UpdateOAuthSettingsRequest struct {
	model.OAuthSettings
	ClientSecret string `json:"client_secret"`
}

// UpdateOAuthSettings Update OAuth settings
func (c *OAuthSettingController) UpdateOAuthSettings(ctx *gin.Context) {
	// Parse request body
	var req UpdateOAuthSettingsRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4002",
			Err:      err,
		})
		return
	}
	if req.ClientSecret != "" && !strings.HasPrefix(req.ClientSecret, "{CRYPT}") {
		req.OAuthSettings.ClientSecret = safe.NewEncryptedString(req.ClientSecret, os.Getenv(safe.SecretEnvName))
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		"",
		func(auditLog *model.AuditLog) error {
			// Update settings
			err := c.service.UpdateOAuthSettings(ctx, &req.OAuthSettings)
			if err != nil {
				return util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E5002",
					Err:      err,
				}
			}

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": gin.H{"message": "OAuth settings updated successfully"},
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			// Get settings before update for audit log
			oldSettings, err := c.service.GetOAuthSettings(ctx)
			if err == nil {
				auditLog.Details.OldData = oldSettings
			}
			auditLog.Details.NewData = req
			auditLog.Action = "system:oauth_settings:update"
			auditLog.ActionName = "Update OAuth settings"
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}
