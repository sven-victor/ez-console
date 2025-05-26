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
// @Summary Get LDAP settings
// @Description Get LDAP settings
// @Accept json
// @Produce json
// @Success 200 {object} util.Response{data=clientsldap.Options,code=string}
// @Failure 500 {object} util.Response{err=string,code=string}
// @Router /api/system/ldap-settings [get]
func (c *LDAPSettingController) GetLDAPSettings(ctx *gin.Context) {
	settings, err := c.service.GetLDAPSettings(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5001",
			Err:      err,
		})
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
// @Summary Update LDAP settings
// @Description Update LDAP settings
// @Accept json
// @Produce json
// @Success 200 {object} util.Response{data=clientsldap.Options,code=string}
// @Failure 500 {object} util.Response{err=string,code=string}
// @Router /api/system/ldap-settings [put]
func (c *LDAPSettingController) UpdateLDAPSettings(ctx *gin.Context) {
	var req UpdateLDAPSettingsRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
		})
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
			return util.ErrorResponse{
				HTTPCode: http.StatusInternalServerError,
				Code:     "E5001",
				Err:      err,
			}
		}
		return nil
	})
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
	ctx.JSON(http.StatusOK, util.Response{
		Code: "0",
		Data: gin.H{"message": "LDAP settings updated successfully"},
	})
}

// TestLDAPConnection Test LDAP connection
// @Summary Test LDAP connection
// @Description Test LDAP connection
// @Accept json
// @Produce json
// @Success 200 {object} util.Response{data=string,code=string}
// @Failure 500 {object} util.Response{err=string,code=string}
// @Router /api/ldap-settings/test [post]
func (c *LDAPSettingController) TestLDAPConnection(ctx *gin.Context) {
	// LDAPTestRequest LDAP test request struct
	type LDAPTestRequest struct {
		Username     string `json:"username" binding:"required"`
		Password     string `json:"password" binding:"required"`
		BindPassword string `json:"bind_password"`
		clientsldap.Options
	}
	var req LDAPTestRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
		})
		return
	}

	if req.BindPassword != "" {
		if strings.HasPrefix(req.BindPassword, "{CRYPT}") {
			settings, err := c.service.GetLDAPSettings(ctx)
			if err != nil {
				util.RespondWithError(ctx, util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E5001",
					Err:      err,
				})
				return
			}
			req.Options.BindPassword = settings.BindPassword
		} else {
			req.Options.BindPassword = safe.NewEncryptedString(req.BindPassword, os.Getenv(safe.SecretEnvName))
		}
	}
	resp, err := c.service.TestLDAPConnection(ctx, req.Options, req.Username, req.Password)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5001",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, util.Response{
		Code: "0",
		Data: resp,
	})
}

// ImportLDAPUsers Import LDAP users
// @Summary Import LDAP users
// @Description Import LDAP users
// @Accept json
// @Produce json
// @Success 200 {object} util.Response{data=[]model.User,code=string}
// @Failure 500 {object} util.Response{err=string,code=string}
// @Router /api/system/ldap-settings/import [post]
func (c *LDAPSettingController) ImportLDAPUsers(ctx *gin.Context) {
	type ImportLDAPUsersRequest struct {
		UserDN []string `json:"user_dn"`
	}
	var req ImportLDAPUsersRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
		})
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
		ctx.JSON(http.StatusOK, util.Response{
			Code: "0",
			Data: users,
		})
		return nil
	})
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
}
