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
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

type RateLimitController struct {
	service *service.Service
}

func NewRateLimitController(svc *service.Service) *RateLimitController {
	return &RateLimitController{service: svc}
}

func (c *RateLimitController) RegisterRoutes(router *gin.RouterGroup) {
	settings := router.Group("/rate-limit-settings")
	{
		settings.GET("", middleware.RequirePermission("system:rate_limit:view"), c.GetRateLimitSettings)
		settings.PUT("", middleware.RequirePermission("system:rate_limit:update"), c.UpdateRateLimitSettings)
	}
	effective := router.Group("/rate-limit")
	{
		effective.GET("/effective", middleware.RequirePermission("system:rate_limit:view"), c.GetEffective)
	}
	rules := router.Group("/rate-limit-rules")
	{
		rules.GET("", middleware.RequirePermission("system:rate_limit:view"), c.ListRules)
		rules.POST("", middleware.RequirePermission("system:rate_limit:update"), c.CreateRule)
		rules.GET("/:id", middleware.RequirePermission("system:rate_limit:view"), c.GetRule)
		rules.PUT("/:id", middleware.RequirePermission("system:rate_limit:update"), c.UpdateRule)
		rules.DELETE("/:id", middleware.RequirePermission("system:rate_limit:update"), c.DeleteRule)
	}
}

// GetRateLimitSettings returns rate limit settings
//
//	@Summary		Get rate limit settings
//	@Description	Get the runtime switch, store metadata, and default shared buckets
//	@ID             getRateLimitSettings
//	@Tags			System Settings/Rate Limit
//	@Produce		json
//	@Success		200	{object}	util.Response[model.RateLimitSettings]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/rate-limit-settings [get]
func (c *RateLimitController) GetRateLimitSettings(ctx *gin.Context) {
	settings, err := c.service.GetRateLimitSettings(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, settings)
}

// UpdateRateLimitSettings updates default shared buckets and the runtime switch
//
//	@Summary		Update rate limit settings
//	@Description	Update the runtime switch and default shared buckets (anonymous, user, service account)
//	@ID             updateRateLimitSettings
//	@Tags			System Settings/Rate Limit
//	@Accept			json
//	@Produce		json
//	@Param			request	body		model.RateLimitSettings	true	"Rate limit settings"
//	@Success		200		{object}	util.Response[model.RateLimitSettings]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/rate-limit-settings [put]
func (c *RateLimitController) UpdateRateLimitSettings(ctx *gin.Context) {
	var req model.RateLimitSettings
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request", err))
		return
	}
	err := c.service.AuditLogService.StartAudit(ctx, "", func(auditLog *model.AuditLog) error {
		if err := c.service.UpdateRateLimitSettings(ctx, &req); err != nil {
			return err
		}
		updated, err := c.service.GetRateLimitSettings(ctx)
		if err != nil {
			return err
		}
		util.RespondWithSuccess(ctx, http.StatusOK, updated)
		return nil
	}, service.WithBeforeFilters(func(auditLog *model.AuditLog) {
		old, _ := c.service.GetRateLimitSettings(ctx)
		auditLog.Details.OldData = old
		auditLog.Details.NewData = req
		auditLog.Action = "system:rate_limit_settings:update"
		auditLog.ActionName = "Update rate limit settings"
	}))
	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

// ListRules lists persisted rate limit rules
//
//	@Summary		List rate limit rules
//	@Description	List database-backed rate limit rules
//	@ID             listRateLimitRules
//	@Tags			System Settings/Rate Limit
//	@Produce		json
//	@Param			current		query		int		false	"Current page number"
//	@Param			page_size	query		int		false	"Number of rows per page"
//	@Param			search		query		string	false	"Keyword for searching"
//	@Param			subject_type	query	string	false	"Subject type filter"
//	@Param			subject_id	query		string	false	"Subject id filter"
//	@Success		200	{object}	util.PaginationResponse[model.RateLimitRule]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/rate-limit-rules [get]
func (c *RateLimitController) ListRules(ctx *gin.Context) {
	page, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")
	subjectType := ctx.Query("subject_type")
	subjectID := ctx.Query("subject_id")
	rows, total, err := c.service.ListRules(ctx, page, pageSize, search, subjectType, subjectID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccessList(ctx, http.StatusOK, rows, total, page, pageSize)
}

// GetRule returns one rule
//
//	@Summary		Get a rate limit rule
//	@ID             getRateLimitRule
//	@Tags			System Settings/Rate Limit
//	@Produce		json
//	@Param			id	path		string	true	"Rule ID"
//	@Success		200	{object}	util.Response[model.RateLimitRule]
//	@Failure		404	{object}	util.ErrorResponse
//	@Router			/api/system/rate-limit-rules/{id} [get]
func (c *RateLimitController) GetRule(ctx *gin.Context) {
	row, err := c.service.GetRule(ctx, ctx.Param("id"))
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, row)
}

// CreateRule creates a database-backed rule
//
//	@Summary		Create a rate limit rule
//	@ID             createRateLimitRule
//	@Tags			System Settings/Rate Limit
//	@Accept			json
//	@Produce		json
//	@Param			request	body		model.RateLimitRule	true	"Rule"
//	@Success		200		{object}	util.Response[model.RateLimitRule]
//	@Failure		400		{object}	util.ErrorResponse
//	@Router			/api/system/rate-limit-rules [post]
func (c *RateLimitController) CreateRule(ctx *gin.Context) {
	var req model.RateLimitRule
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request", err))
		return
	}
	err := c.service.AuditLogService.StartAudit(ctx, "", func(auditLog *model.AuditLog) error {
		if err := c.service.CreateRule(ctx, &req); err != nil {
			return err
		}
		util.RespondWithSuccess(ctx, http.StatusOK, &req)
		return nil
	}, service.WithBeforeFilters(func(auditLog *model.AuditLog) {
		auditLog.Details.NewData = req
		auditLog.Action = "system:rate_limit_rule:create"
		auditLog.ActionName = "Create rate limit rule"
	}))
	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

// UpdateRule updates a database-backed rule
//
//	@Summary		Update a rate limit rule
//	@ID             updateRateLimitRule
//	@Tags			System Settings/Rate Limit
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string				true	"Rule ID"
//	@Param			request	body		model.RateLimitRule	true	"Rule"
//	@Success		200		{object}	util.Response[model.RateLimitRule]
//	@Router			/api/system/rate-limit-rules/{id} [put]
func (c *RateLimitController) UpdateRule(ctx *gin.Context) {
	id := ctx.Param("id")
	var req model.RateLimitRule
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request", err))
		return
	}
	err := c.service.AuditLogService.StartAudit(ctx, id, func(auditLog *model.AuditLog) error {
		if err := c.service.UpdateRule(ctx, id, &req); err != nil {
			return err
		}
		util.RespondWithSuccess(ctx, http.StatusOK, &req)
		return nil
	}, service.WithBeforeFilters(func(auditLog *model.AuditLog) {
		old, _ := c.service.GetRule(ctx, id)
		auditLog.Details.OldData = old
		auditLog.Details.NewData = req
		auditLog.Action = "system:rate_limit_rule:update"
		auditLog.ActionName = "Update rate limit rule"
	}))
	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

// DeleteRule deletes a database-backed rule
//
//	@Summary		Delete a rate limit rule
//	@ID             deleteRateLimitRule
//	@Tags			System Settings/Rate Limit
//	@Param			id	path	string	true	"Rule ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Router			/api/system/rate-limit-rules/{id} [delete]
func (c *RateLimitController) DeleteRule(ctx *gin.Context) {
	id := ctx.Param("id")
	err := c.service.AuditLogService.StartAudit(ctx, id, func(auditLog *model.AuditLog) error {
		if err := c.service.DeleteRule(ctx, id); err != nil {
			return err
		}
		util.RespondWithMessage(ctx, "Rate limit rule deleted")
		return nil
	}, service.WithBeforeFilters(func(auditLog *model.AuditLog) {
		old, _ := c.service.GetRule(ctx, id)
		auditLog.Details.OldData = old
		auditLog.Action = "system:rate_limit_rule:delete"
		auditLog.ActionName = "Delete rate limit rule"
	}))
	if err != nil {
		util.RespondWithError(ctx, err)
	}
}

type rateLimitEffectiveQuery struct {
	SubjectType string `form:"subject_type"`
	SubjectID   string `form:"subject_id"`
	Method      string `form:"method"`
	Path        string `form:"path"`
}

// GetEffective returns the buckets that would apply to a request
//
//	@Summary		Get effective rate limit
//	@Description	Resolve shared and route buckets for a subject and path
//	@ID             getRateLimitEffective
//	@Tags			System Settings/Rate Limit
//	@Produce		json
//	@Param			subject_type	query	string	false	"anonymous, user, or service_account"
//	@Param			subject_id		query	string	false	"Subject resource id or IP"
//	@Param			method			query	string	false	"HTTP method"
//	@Param			path			query	string	false	"Gin full path"
//	@Success		200	{object}	util.Response[model.RateLimitEffective]
//	@Router			/api/system/rate-limit/effective [get]
func (c *RateLimitController) GetEffective(ctx *gin.Context) {
	var q rateLimitEffectiveQuery
	if err := ctx.ShouldBindQuery(&q); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, c.service.Effective(ctx, q.SubjectType, q.SubjectID, q.Method, q.Path))
}

func init() {
	_ = middleware.RegisterPermission("Rate Limit", "Manage HTTP rate limiting policies", []model.Permission{
		{
			Code:             "system:rate_limit:view",
			Name:             "View rate limit settings",
			Description:      "View HTTP rate limit settings and rules",
			DefaultRoleNames: []string{"operator", "viewer"},
		},
		{
			Code:             "system:rate_limit:update",
			Name:             "Update rate limit settings",
			Description:      "Update HTTP rate limit settings and rules",
			DefaultRoleNames: []string{"operator"},
		},
	})
}
