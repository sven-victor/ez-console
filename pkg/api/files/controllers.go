package filesapi

import (
	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/service"
)

type Controller struct {
	FileController *FileController
}

func NewController(svc *service.Service) *Controller {
	return &Controller{
		FileController: NewFileController(svc),
	}
}

func (c *Controller) RegisterRoutes(router *gin.RouterGroup) {
	c.FileController.RegisterRoutes(router)
}
