package api

import (
	"github.com/gin-gonic/gin"
	authorizationapi "github.com/sven-victor/ez-console/pkg/api/authorization"
	fileapi "github.com/sven-victor/ez-console/pkg/api/files"
	statisticsapi "github.com/sven-victor/ez-console/pkg/api/statistics"
	systemapi "github.com/sven-victor/ez-console/pkg/api/system"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/service"
)

type Controller interface {
	RegisterRoutes(router *gin.RouterGroup)
}

type ControllerGenerator func(svc *service.Service) Controller

var controllers = []ControllerGenerator{
	func(svc *service.Service) Controller {
		return authorizationapi.NewController(svc)
	},
	func(svc *service.Service) Controller {
		return systemapi.NewController(svc)
	},
	func(svc *service.Service) Controller {
		return fileapi.NewController(svc)
	},
	func(svc *service.Service) Controller {
		return statisticsapi.NewController(svc)
	},
}

// RegisterControllers registers all API controllers to the routing engine.
func RegisterControllers(router *gin.Engine, svc *service.Service) {
	api := router.Group("/api")
	api.Use(middleware.AuthenticationMiddleware())

	for _, controller := range controllers {
		controller(svc).RegisterRoutes(api)
	}
}

// AddControllers adds API controllers.
func AddControllers(controller ...ControllerGenerator) {
	controllers = append(controllers, controller...)
}
