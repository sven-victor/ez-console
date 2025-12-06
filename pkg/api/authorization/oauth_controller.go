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

package authorizationapi

import (
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

type OAuthProvider struct {
	Name        string `json:"name"`
	DisplayName string `json:"display_name"`
	IconURL     string `json:"icon_url"`
}

// GetProviders gets the list of available OAuth providers
//
//	@Summary		Get the list of available OAuth providers
//	@Description	Get the list of available OAuth providers
//	@ID             getProviders
//	@Tags			OAuth
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[[]OAuthProvider]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/oauth/providers [get]
func (c *OAuthController) GetProviders(ctx *gin.Context) {

	// Only return enabled providers, without sensitive information
	providers := []OAuthProvider{}
	for _, p := range c.service.GetOAuth2ProviderConfig(ctx) {
		providers = append(providers, OAuthProvider{
			Name:        p.Name,
			DisplayName: p.DisplayName,
			IconURL:     p.IconURL,
		})
	}

	util.RespondWithSuccess(ctx, http.StatusOK, providers)
}

// GetLoginURL gets the OAuth login URL
//
//	@Summary		Get the OAuth login URL
//	@Description	Get the OAuth login URL
//	@ID             getLoginUrl
//	@Tags			OAuth
//	@Accept			json
//	@Produce		json
//	@Param			provider	path		string	true	"Provider"
//	@Success		200			{object}	util.Response[service.OAuthLoginURLResponse]
//	@Failure		400			{object}	util.ErrorResponse
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/oauth/login/{provider} [get]
func (c *OAuthController) GetLoginURL(ctx *gin.Context) {
	provider := ctx.Param("provider")
	if provider == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "OAuth provider is required"))
		return
	}

	resp, err := c.service.GetLoginURL(ctx, provider)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4002", "failed to get login URL", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, resp)
}

// HandleCallback handles the OAuth callback
//
//	@Summary		Handle the OAuth callback
//	@Description	Handle the OAuth callback
//	@ID             handleCallback
//	@Tags			OAuth
//	@Accept			json
//	@Produce		json
//	@Param			code		query		string	true	"Code"
//	@Param			state		query		string	true	"State"
//	@Param			provider	query		string	true	"Provider"
//	@Success		200			{object}	util.Response[service.LoginResponse]
//	@Failure		400			{object}	util.ErrorResponse
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/oauth/callback [get]
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
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "invalid request parameters", err))
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
				return util.NewError("E4012", err)
			}
			auditLog.UserID = loginResp.User.ResourceID
			auditLog.Username = loginResp.User.Username
			_, err = c.service.CreateSession(ctx, loginResp.User.ResourceID, loginResp.Token, ctx.ClientIP(), ctx.Request.UserAgent(), loginResp.ExpiresAt)
			if err != nil {
				return util.NewError("E5001", err)
			}
			util.RespondWithSuccess(ctx, http.StatusOK, loginResp)
			return nil
		},
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}
