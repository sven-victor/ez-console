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
	"context"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/service"
)

type Controller struct {
	StatisticsController *StatisticsController
}

func NewController(svc *service.Service) *Controller {
	return &Controller{
		StatisticsController: NewStatisticsController(svc),
	}
}

func (c *Controller) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	c.StatisticsController.RegisterRoutes(router)
}
