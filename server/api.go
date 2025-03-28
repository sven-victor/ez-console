package server

import (
	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/api"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/service"
)

type Controller interface {
	RegisterRoutes(router *gin.RouterGroup)
}

type AuthController struct {
	Controller
}

type ControllerGenerator func(svc Service) Controller

var (
	AuthenticationMiddleware    = middleware.AuthenticationMiddleware()
	RequirePermissionMiddleware = middleware.RequirePermission
)

func RegisterControllers(controller ...ControllerGenerator) {
	for _, c := range controller {
		api.AddControllers(func(svc *service.Service) api.Controller {
			return c(svc)
		})
	}
}
