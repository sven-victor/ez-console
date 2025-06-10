package statisticsapi

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

type StatisticsController struct {
	service *service.Service
}

func NewStatisticsController(service *service.Service) *StatisticsController {
	return &StatisticsController{service: service}
}

func (c *StatisticsController) RegisterRoutes(router *gin.RouterGroup) {
	statistics := router.Group("/statistics")
	statistics.GET("", c.GetStatistics)
}

// GetStatistics Get statistics
//
//	@Summary		Get statistics
//	@Description	Get statistics
//	@ID             getStatistics
//	@Tags			Statistics
//	@Success		200	{object}	util.Response[service.Charts]
//	@Failure		400	{object}	util.ErrorResponse
//	@Router			/api/statistics [get]
func (c *StatisticsController) GetStatistics(ctx *gin.Context) {
	roles := middleware.GetRolesFromContext(ctx)
	var statistics service.Charts
	var err error
	var hasPermission bool
	for _, role := range roles {
		if role.HasPermission("statistics:view") {
			hasPermission = true
			break
		}
	}
	if hasPermission {
		statistics, err = c.service.GetStatistics(ctx)
	} else {
		statistics, err = c.service.GetUserStatistics(ctx)
	}
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, statistics)
}

func init() {
	middleware.RegisterPermission("Statistics", "View statistics", []model.Permission{
		{
			Code:        "statistics:view",
			Name:        "View statistics",
			Description: "View statistics",
		},
	})
}
