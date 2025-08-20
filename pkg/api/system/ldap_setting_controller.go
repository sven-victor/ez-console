package systemapi

import (
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-utils/safe"

	clientsldap "github.com/sven-victor/ez-console/pkg/clients/ldap"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

type LDAPSettingController struct {
	service *service.Service
}

func NewLDAPSettingController(svc *service.Service) *LDAPSettingController {
	return &LDAPSettingController{
		service: svc,
	}
}

// RegisterRoutes Register routes
func (c *LDAPSettingController) RegisterRoutes(r *gin.RouterGroup) {
	// ... existing code ...

	// LDAP settings related routes
	ldapSettings := r.Group("/ldap-settings")
	{
		ldapSettings.GET("", middleware.RequirePermission("system:settings:view"), c.GetLDAPSettings)
		ldapSettings.PUT("", middleware.RequirePermission("system:settings:update"), c.UpdateLDAPSettings)
		ldapSettings.POST("/test", middleware.RequirePermission("system:settings:update"), c.TestLDAPConnection)
		ldapSettings.POST("/import", middleware.RequirePermission("authorization:user:create"), c.ImportLDAPUsers)
	}
}

type LDAPSettings struct {
	clientsldap.Options
	Timeout int64 `json:"timeout"`
}

// GetLDAPSettings Get LDAP settings
//
//	@Summary		Get LDAP settings
//	@Description	Get LDAP settings
//	@ID             getLdapSettings
//	@Tags			System Settings/LDAP
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[LDAPSettings]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/ldap-settings [get]
func (c *LDAPSettingController) GetLDAPSettings(ctx *gin.Context) {
	settings, err := c.service.GetLDAPSettings(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	if settings.BindPassword != nil {
		settings.BindPassword.UpdateSecret(util.GenerateRandomPassword(128))
	}
	settings.ClientKey = nil
	util.RespondWithSuccess(ctx, http.StatusOK, &LDAPSettings{
		Options: settings,
		Timeout: int64(settings.Timeout / time.Second),
	})
}

type UpdateLDAPSettingsRequest struct {
	clientsldap.Options
	BindPassword string `json:"bind_password"`
	ClientKey    string `json:"client_key"`
	Timeout      int64  `json:"timeout"`
}

// UpdateLDAPSettings Update LDAP settings
//
//	@Summary		Update LDAP settings
//	@Tags			System Settings/LDAP
//	@Description	Update LDAP settings
//	@ID             updateLdapSettings
//	@Accept			json
//	@Produce		json
//	@Param			request	body		UpdateLDAPSettingsRequest	true	"Update LDAP settings"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/ldap-settings [put]
func (c *LDAPSettingController) UpdateLDAPSettings(ctx *gin.Context) {
	var req UpdateLDAPSettingsRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}
	req.Options.BindPassword = nil
	req.Options.ClientKey = nil
	if req.BindPassword != "" && !strings.HasPrefix(req.BindPassword, "{CRYPT}") {
		req.Options.BindPassword = safe.NewEncryptedString(req.BindPassword, os.Getenv(safe.SecretEnvName))
	}
	if req.ClientKey != "" && !strings.HasPrefix(req.ClientKey, "{CRYPT}") {
		req.Options.ClientKey = safe.NewEncryptedString(req.ClientKey, os.Getenv(safe.SecretEnvName))
	}
	req.Options.Timeout = time.Duration(req.Timeout) * time.Second
	err := c.service.StartAudit(ctx, "", func(auditLog *model.AuditLog) error {
		if err := c.service.UpdateLDAPSettings(ctx, &req.Options); err != nil {
			return util.NewError("E5001", err)
		}
		return nil
	})
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
	util.RespondWithMessage(ctx, "LDAP settings updated successfully")
}

type LDAPTestRequest struct {
	Username     string `json:"username" binding:"required"`
	Password     string `json:"password" binding:"required"`
	BindPassword string `json:"bind_password"`
	clientsldap.Options
}

// TestLDAPConnection Test LDAP connection
//
//	@Summary		Test LDAP connection
//	@Description	Test LDAP connection
//	@ID             testLdapConnection
//	@Tags			System Settings/LDAP
//	@Accept			json
//	@Produce		json
//	@Param			request	body		LDAPTestRequest	true	"LDAP test request"
//	@Success		200	{object}	util.Response[model.LDAPTestResponse]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ldap-settings/test [post]
func (c *LDAPSettingController) TestLDAPConnection(ctx *gin.Context) {
	// LDAPTestRequest LDAP test request struct

	var req LDAPTestRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	if req.BindPassword != "" {
		if strings.HasPrefix(req.BindPassword, "{CRYPT}") {
			settings, err := c.service.GetLDAPSettings(ctx)
			if err != nil {
				util.RespondWithError(ctx, util.NewError("E5001", err))
				return
			}
			req.Options.BindPassword = settings.BindPassword
		} else {
			req.Options.BindPassword = safe.NewEncryptedString(req.BindPassword, os.Getenv(safe.SecretEnvName))
		}
	}
	resp, err := c.service.TestLDAPConnection(ctx, req.Options, req.Username, req.Password)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", err.Error(), err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, resp)
}

type ImportLDAPUsersRequest struct {
	UserDN []string `json:"user_dn" validate:"optional"`
}

// ImportLDAPUsers Import LDAP users
//
//	@Summary		Import LDAP users
//	@Description	Import LDAP users
//	@ID             importLdapUsers
//	@Tags			System Settings/LDAP
//	@Accept			json
//	@Produce		json
//	@Param			request	body		ImportLDAPUsersRequest	false	"import ldap user request"
//	@Success		200	{object}	util.Response[[]model.User]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/ldap-settings/import [post]
func (c *LDAPSettingController) ImportLDAPUsers(ctx *gin.Context) {
	var req ImportLDAPUsersRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", err.Error()))
		return
	}
	if len(req.UserDN) == 0 {
		users, err := c.service.GetLdapUsers(ctx, true)
		if err != nil {
			util.RespondWithError(ctx, err)
			return
		}
		util.RespondWithSuccess(ctx, http.StatusOK, users)
		return
	}
	err := c.service.StartAudit(ctx, "", func(auditLog *model.AuditLog) error {
		auditLog.ActionName = "Import LDAP Users"
		users, err := c.service.ImportLDAPUsers(ctx, req.UserDN)
		if err != nil {
			return err
		}
		util.RespondWithSuccess(ctx, http.StatusOK, users)
		return nil
	})
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
}
