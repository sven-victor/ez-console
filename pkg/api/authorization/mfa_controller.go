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
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// MFAController MFA related controller
type MFAController struct {
	service *service.Service
}

// NewMFAController creates an MFA controller
func NewMFAController(service *service.Service) *MFAController {
	return &MFAController{service: service}
}

// RegisterRoutes registers MFA related routes
func (c *MFAController) RegisterRoutes(router *gin.RouterGroup) {
	// Add MFA management related routes under the profile route group
	mfaRoutes := router.Group("/profile/mfa")
	{
		mfaRoutes.POST("/enable", c.EnableMFA)
		mfaRoutes.POST("/verify", c.VerifyAndActivateMFA)
		mfaRoutes.POST("/disable", c.DisableMFA)
	}
}

type EnableMFARequest struct {
	MFAType string `json:"mfa_type" binding:"required"`
}

// EnableMFA enables MFA
//
//	@Summary		Enable MFA
//	@Description	Enable MFA
//	@ID             enableMfa
//	@Tags			Authorization/Profile/MFA
//	@Accept			json
//	@Produce		json
//	@Param			mfa_type	body		string	true	"MFA Type"
//	@Success		200			{object}	util.Response[service.EnableMFAResponse]
//	@Failure		400			{object}	util.ErrorResponse
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/mfa/enable [post]
func (c *MFAController) EnableMFA(ctx *gin.Context) {
	// Get current user from context
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "failed to get user information"))
		return
	}

	var req EnableMFARequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		user.ResourceID,
		func(auditLog *model.AuditLog) error {
			response, err := c.service.EnableMFA(ctx, user.ResourceID, req.MFAType)
			if err != nil {
				return util.NewError("E5002", err)
			}

			util.RespondWithSuccess(ctx, http.StatusOK, response)
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = gin.H{"step": "generate_secret"}
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

type VerifyAndActivateMFARequest struct {
	Code    string `json:"code" binding:"required"`
	Token   string `json:"token" validate:"optional"`
	MFAType string `json:"mfa_type" binding:"required"`
}

// VerifyAndActivateMFA verifies and activates MFA
//
//	@Summary		Verify and activate MFA
//	@Description	Verify and activate MFA
//	@ID             verifyAndActivateMfa
//	@Tags			Authorization/Profile/MFA
//	@Accept			json
//	@Produce		json
//	@Param			request	body		VerifyAndActivateMFARequest	true	"MFA Type"
//	@Success		200			{object}	util.Response[util.MessageData]
//	@Failure		400			{object}	util.ErrorResponse
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/mfa/verify [post]
func (c *MFAController) VerifyAndActivateMFA(ctx *gin.Context) {
	// Get current user from context
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "failed to get user information"))
		return
	}

	var req VerifyAndActivateMFARequest
	// Get verification code
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		user.ResourceID,
		func(auditLog *model.AuditLog) error {
			var err error
			// Call service to verify and activate MFA
			if req.MFAType == "totp" {
				err = c.service.VerifyAndActivateTOTPMFA(ctx, user.ResourceID, req.Code)
			} else if req.MFAType == "email" {
				err = c.service.VerifyAndActivateEmailMFA(ctx, user.ResourceID, req.Token, req.Code)
			}
			if err != nil {
				return util.NewErrorMessage("E5002", "failed to verify and activate MFA", err)
			}
			util.RespondWithMessage(ctx, "Multi-factor authentication (MFA) has been successfully enabled")
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = gin.H{"mfa_enabled": true}
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

// DisableMFA disables MFA
//
//	@Summary		Disable MFA
//	@Description	Disable MFA
//	@ID             disableMfa
//	@Tags			Authorization/Profile/MFA
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/mfa/disable [post]
func (c *MFAController) DisableMFA(ctx *gin.Context) {
	// Get current user from context
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.NewErrorMessage("5001", "failed to get user information"))
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		user.ResourceID,
		func(auditLog *model.AuditLog) error {
			// Call service to disable MFA
			err := c.service.DisableMFA(ctx, user.ResourceID)
			if err != nil {
				return util.NewErrorMessage("E5002", "failed to disable MFA", err)
			}
			util.RespondWithMessage(ctx, "Multi-factor authentication (MFA) has been successfully disabled")
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = gin.H{"mfa_enabled": false}
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}
}
