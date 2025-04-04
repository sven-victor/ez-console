package authorizationapi

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// OAuthController API controller for OAuth operations
type OAuthController struct {
	service *service.Service
}

func NewOAuthController(service *service.Service) *OAuthController {
	return &OAuthController{service: service}
}

// RegisterRoutes registers OAuth-related routes
func (c *OAuthController) RegisterRoutes(router *gin.RouterGroup) {
	oauth := router.Group("/oauth")
	middleware.WithoutAuthentication(oauth)
	{
		// Public interfaces
		oauth.GET("/providers", c.GetProviders)
		oauth.GET("/login/:provider", c.GetLoginURL)
		oauth.GET("/callback", c.HandleCallback)
		oauth.POST("/callback", c.HandleCallback)
	}
}

// GetProviders gets the list of available OAuth providers
func (c *OAuthController) GetProviders(ctx *gin.Context) {

	// Only return enabled providers, without sensitive information
	providers := []gin.H{}
	for _, p := range c.service.GetOAuth2ProviderConfig(ctx) {
		providers = append(providers, gin.H{
			"name":         p.Name,
			"display_name": p.DisplayName,
			"icon_url":     p.IconURL,
		})
	}

	util.RespondWithSuccess(ctx, http.StatusOK, providers)
}

// GetLoginURL gets the OAuth login URL
func (c *OAuthController) GetLoginURL(ctx *gin.Context) {
	provider := ctx.Param("provider")
	if provider == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("OAuth provider is required"),
		})
		return
	}

	resp, err := c.service.GetLoginURL(ctx, provider)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4002",
			Err:      err,
			Message:  "failed to get login URL",
		})
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, resp)
}

// HandleCallback handles the OAuth callback
func (c *OAuthController) HandleCallback(ctx *gin.Context) {
	// Get parameters from URL
	code := ctx.Query("code")
	state := ctx.Query("state")
	provider := ctx.Query("provider")
	// Check if it is a frontend redirect
	if code != "" && state != "" && provider != "" {
		// Redirect to the frontend callback page
		redirectURI := fmt.Sprintf("/login?code=%s&state=%s&provider=%s", code, state, provider)
		ctx.Redirect(http.StatusTemporaryRedirect, redirectURI)
		return
	}

	// Handle requests sent directly by the frontend via API
	var req service.OAuthCallbackRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
			Message:  "invalid request parameters",
		})
		return
	}

	err := c.service.StartAudit(
		ctx,
		"",
		func(auditLog *model.AuditLog) error {
			auditLog.Action = "authorization:oauth:callback"
			auditLog.ActionName = "OAuth Callback/Login"
			auditLog.Details.Request = gin.H{
				"provider": req.Provider,
				"code":     strings.Repeat("*", len(req.Code)),
				"state":    strings.Repeat("*", len(req.State)),
			}

			loginResp, err := c.service.HandleCallback(ctx, req)
			if err != nil {
				return &util.ErrorResponse{
					HTTPCode: http.StatusUnauthorized,
					Code:     "E4012",
					Err:      err,
				}
			}
			auditLog.UserID = loginResp.User.ResourceID
			auditLog.Username = loginResp.User.Username
			_, err = c.service.CreateSession(ctx, loginResp.User.ResourceID, loginResp.Token, ctx.ClientIP(), ctx.Request.UserAgent(), loginResp.ExpiresAt)
			if err != nil {
				return &util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E5001",
					Err:      err,
				}
			}
			util.RespondWithSuccess(ctx, http.StatusOK, loginResp)
			return nil
		},
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}
