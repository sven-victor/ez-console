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

// SMTPSettingController handles SMTP setting related API requests.
type SMTPSettingController struct {
	service *service.Service
}

// NewSMTPSettingController creates a new SMTPSettingController.
func NewSMTPSettingController(svc *service.Service) *SMTPSettingController {
	return &SMTPSettingController{service: svc}
}

// RegisterRoutes registers the SMTP setting routes
func (c *SMTPSettingController) RegisterRoutes(r *gin.RouterGroup) {
	smtpRoutes := r.Group("/smtp-settings")
	{
		smtpRoutes.GET("", middleware.RequirePermission("system:settings:view"), c.GetSMTPSettings)            // Assuming similar permission
		smtpRoutes.PUT("", middleware.RequirePermission("system:settings:update"), c.UpdateSMTPSettings)       // Assuming similar permission
		smtpRoutes.POST("/test", middleware.RequirePermission("system:settings:update"), c.TestSMTPConnection) // Assuming similar permission
	}
}

// GetSMTPSettings godoc
//
//	@Summary		Get SMTP settings
//	@Description	Retrieves the current SMTP settings.
//	@ID             getSmtpSettings
//	@Tags			System Settings/SMTP
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	model.SMTPSettings	"Successfully retrieved SMTP settings"
//	@Failure		500	{object}	util.ErrorResponse	"Internal server error"
//	@Router			/api/system/smtp-settings [get]
//	@Security		ApiKeyAuth
func (c *SMTPSettingController) GetSMTPSettings(ctx *gin.Context) {
	settings, err := c.service.GetSMTPSettings(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5001",
			Err:     err,
			Message: "Failed to get SMTP settings",
		})
		return
	}
	settings.Password.UpdateSecret(util.GenerateRandomPassword(128))
	util.RespondWithSuccess(ctx, http.StatusOK, settings)
}

type SMTPSettingsRequest struct {
	model.SMTPSettings
	Password string `json:"password"`
}

// UpdateSMTPSettings godoc
//
//	@Summary		Update SMTP settings
//	@Description	Updates the SMTP settings.
//	@ID             updateSmtpSettings
//	@Tags			System Settings/SMTP
//	@Accept			json
//	@Produce		json
//	@Param			settings	body		model.SMTPSettings									true	"SMTP settings to update"
//	@Success		200			{object}	util.Response{data=model.SMTPSettings,code=string}	"Successfully updated SMTP settings"
//	@Failure		400			{object}	util.ErrorResponse									"Invalid request payload"
//	@Failure		500			{object}	util.ErrorResponse									"Internal server error"
//	@Router			/api/system/smtp-settings [put]
//	@Security		ApiKeyAuth
func (c *SMTPSettingController) UpdateSMTPSettings(ctx *gin.Context) {
	var req SMTPSettingsRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E4001",
			Err:     err,
			Message: "Invalid request payload: " + err.Error(),
		})
		return
	}

	if req.Password != "" && !strings.HasPrefix(req.Password, "{CRYPT}") {
		encrypted := safe.NewEncryptedString(req.Password, os.Getenv(safe.SecretEnvName))
		req.SMTPSettings.Password = encrypted
	}

	if err := c.service.UpdateSMTPSettings(ctx, &req.SMTPSettings); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5001",
			Err:     err,
			Message: "Failed to update SMTP settings",
		})
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, "SMTP settings updated successfully")
}

type SMTPTestResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
}

// TestSMTPConnection godoc
//
//	@Summary		Test SMTP connection
//	@Description	Sends a test email to the specified recipient using the provided or saved SMTP settings.
//	@ID             testSmtpConnection
//	@Tags			System Settings/SMTP
//	@Accept			json
//	@Produce		json
//	@Param			testRequest	body		model.SMTPTestRequest								true	"SMTP test request, including recipient and optional SMTP settings to test with"
//	@Success		200			{object}	util.Response{data=SMTPTestResponse,code=string}	"SMTP connection test result"
//	@Failure		400			{object}	util.ErrorResponse									"Invalid request payload"
//	@Failure		500			{object}	util.ErrorResponse									"Internal server error during test"
//	@Router			/api/system/smtp-settings/test [post]
//	@Security		ApiKeyAuth
func (c *SMTPSettingController) TestSMTPConnection(ctx *gin.Context) {
	var req model.SMTPTestRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E4001",
			Err:     err,
			Message: "Invalid request payload: " + err.Error(),
		})
		return
	}
	if strings.HasPrefix(req.Password, "{CRYPT}") {
		req.Password = ""

	}
	err := c.service.TestSMTPConnection(ctx, &req)
	if err != nil {
		util.RespondWithSuccess(ctx, http.StatusOK, SMTPTestResponse{
			Message: err.Error(),
			Success: false,
		})
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, SMTPTestResponse{
		Message: "SMTP connection test successful",
		Success: true,
	})
}
