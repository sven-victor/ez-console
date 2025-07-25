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

// SystemController API controller for system information
type SystemController struct {
	service *service.Service
}

func NewSystemController(service *service.Service) *SystemController {
	return &SystemController{service: service}
}

// RegisterRoutes registers system-related routes
func (c *SystemController) RegisterRoutes(router *gin.RouterGroup) {
	{
		router.GET("/audit-logs", middleware.RequirePermission("system:audit_log:view"), c.GetAuditLogs)
		router.GET("/info", middleware.RequirePermission("system:view"), c.GetSystemInfo)
		router.GET("/health", c.HealthCheck)

		// Get  site icon, site name and navigation
		site := middleware.WithoutAuthentication(router.Group("/site"))
		site.GET("", c.GetSite)
	}
}

// GetNavigation gets the navigation bar
func (c *SystemController) GetSite(ctx *gin.Context) {
	navigation, err := c.service.GetSite(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, navigation)
}

// GetAuditLogs gets all audit logs, supports multiple filtering conditions
//
//	@Summary		Get audit logs
//	@Description	Get all audit logs, supports multiple filtering conditions
//	@ID             getAuditLogs
//	@Tags			System/Audit Log
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int	false	"Current page number"		default(1)
//	@Param			page_size	query		int	false	"Number of items per page"	default(10)
//	@Success		200			{object}	util.PaginationResponse[model.AuditLog]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/system/audit-logs [get]
func (c *SystemController) GetAuditLogs(ctx *gin.Context) {
	// Parse pagination parameters
	page, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	if page < 1 {
		page = 1
	}

	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	if pageSize < 1 || pageSize > 100 {
		pageSize = 10
	}

	var filters service.AuditLogFilters

	if err := ctx.BindQuery(&filters); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	// Query audit logs
	logs, total, err := c.service.GetAuditLogs(ctx, filters, page, pageSize)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccessList(ctx, http.StatusOK, logs, total, page, pageSize)
}

// GetSystemInfo gets system information
//
//	@Summary		Get system information
//	@Description	Get system information
//	@ID             getSystemInfo
//	@Tags			System/Info
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[service.SystemInfo]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/info [get]
func (c *SystemController) GetSystemInfo(ctx *gin.Context) {
	info, err := c.service.GetSystemInfo(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, info)
}

// HealthCheck provides a simple health check
//
//	@Summary		Health check
//	@Description	Check the health of the system
//	@ID             healthCheck
//	@Tags			System/Health
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[service.HealthResult]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/health [get]
func (c *SystemController) HealthCheck(ctx *gin.Context) {
	result, err := c.service.HealthCheck(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", err))
		return
	}

	status := http.StatusOK
	if result.Status != "ok" {
		status = http.StatusServiceUnavailable
	}

	util.RespondWithSuccess(ctx, status, result)
}

func init() {
	middleware.RegisterPermission("System Management", "Manage system information and health check", []model.Permission{
		{
			Code:        "system:view",
			Name:        "View system information",
			Description: "View system information and status",
		}, {
			Code:        "system:audit_log:view",
			Name:        "View audit logs",
			Description: "View audit logs",
		},
	})
}
