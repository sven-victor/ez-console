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
