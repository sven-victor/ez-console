package statisticsapi

import (
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

func (c *Controller) RegisterRoutes(router *gin.RouterGroup) {
	c.StatisticsController.RegisterRoutes(router)
}
