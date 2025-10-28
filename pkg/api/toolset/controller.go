package aiapi

import (
	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/service"
)

// Controller combines all AI controllers
type Controller struct {
	*ToolSetController
}

// NewController creates a new AI controller
func NewController(svc *service.Service) *Controller {
	return &Controller{
		ToolSetController: NewToolSetController(svc),
	}
}

// RegisterRoutes registers all AI routes
func (c *Controller) RegisterRoutes(router *gin.RouterGroup) {

	// Register AI toolset routes
	c.ToolSetController.RegisterRoutes(router)

}
