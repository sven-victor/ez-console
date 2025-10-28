package aiapi

import (
	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/service"
)

// Controller combines all AI controllers
type Controller struct {
	*AIModelController
	*AIChatController
}

// NewController creates a new AI controller
func NewController(svc *service.Service) *Controller {
	return &Controller{
		AIModelController: NewAIModelController(svc),
		AIChatController:  NewAIChatController(svc),
	}
}

// RegisterRoutes registers all AI routes
func (c *Controller) RegisterRoutes(router *gin.RouterGroup) {
	ai := router.Group("/ai")

	// Register AI model routes
	c.AIModelController.RegisterRoutes(ai)

	// Register AI chat routes
	c.AIChatController.RegisterRoutes(ai)
}
