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

		// Test OAuth connection
		oauth.POST("/test", middleware.RequirePermission("system:settings:update"), c.TestOAuthConnection)

		// Test OAuth callback
		oauth.POST("/test-callback", middleware.RequirePermission("system:settings:update"), c.TestOAuthCallback)
	}
}

// GetOAuthSettings Get OAuth settings
//
//	@Summary		Get OAuth settings
//	@Description	Get OAuth settings
//	@ID             getOauthSettings
//	@Tags			System Settings/OAuth
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response{data=model.OAuthSettings,code=string}
//	@Failure		500	{object}	util.Response{err=string,code=string}
//	@Router			/api/system/oauth-settings [get]
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
//
//	@Summary		Update OAuth settings
//	@Description	Update OAuth settings
//	@ID             updateOauthSettings
//	@Tags			System Settings/OAuth
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response{data=model.OAuthSettings,code=string}
//	@Failure		500	{object}	util.Response{err=string,code=string}
//	@Router			/api/system/oauth-settings [put]
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

// TestOAuthConnection Test OAuth connection
//
//	@Summary		Test OAuth connection
//	@Description	Test OAuth connection
//	@ID             testOauthConnection
//	@Tags			System Settings/OAuth
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response{data=string,code=string}
//	@Failure		500	{object}	util.Response{err=string,code=string}
//	@Router			/api/system/oauth-settings/test [post]
func (c *OAuthSettingController) TestOAuthConnection(ctx *gin.Context) {
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
	} else {
		settings, err := c.service.GetSetting(ctx, model.SettingOAuthClientSecret)
		if err != nil {
			util.RespondWithError(ctx, util.ErrorResponse{
				HTTPCode: http.StatusInternalServerError,
				Code:     "E5003",
				Err:      err,
			})
			return
		}
		req.OAuthSettings.ClientSecret = safe.NewEncryptedString(settings.Value, os.Getenv(safe.SecretEnvName))
	}

	// Test OAuth connection
	resp, err := c.service.TestOAuthConnection(ctx, &req.OAuthSettings)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5004",
			Err:      err,
		})
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, resp)
}

// TestOAuthCallback Test OAuth callback
//
//	@Summary		Test OAuth callback
//	@Description	Test OAuth callback
//	@ID             testOauthCallback
//	@Tags			System Settings/OAuth
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response{data=string,code=string}
//	@Failure		500	{object}	util.Response{err=string,code=string}
//	@Router			/api/system/oauth-settings/test-callback [post]
func (c *OAuthSettingController) TestOAuthCallback(ctx *gin.Context) {
	var req service.OAuthCallbackRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4002",
			Err:      err,
		})
		return
	}
	resp, err := c.service.TestOAuthCallback(ctx, &req)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5005",
			Err:      err,
		})
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, resp)
}
