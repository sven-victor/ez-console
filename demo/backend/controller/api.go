package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/demo/backend/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-console/server"
)

type TestController struct {
	service *service.TestService
}

func (c *TestController) Test(ctx *gin.Context) {
	resp, err := c.service.Test(ctx, ctx.Request)
	if err != nil {
		util.RespondWithError(ctx, err)
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, resp)
}

func NewTestController() *TestController {
	return &TestController{service: service.NewTestService()}
}

func (c *TestController) RegisterRoutes(router *gin.RouterGroup) {
	router.POST("/test", c.Test)
}

func init() {
	server.RegisterControllers(func(svc server.Service) server.Controller {
		return NewTestController()
	})
}
