package aiapi

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// ToolSetController handles toolset management
type ToolSetController struct {
	service *service.Service
}

// NewToolSetController creates a new toolset controller
func NewToolSetController(service *service.Service) *ToolSetController {
	return &ToolSetController{service: service}
}

// RegisterRoutes registers toolset routes
func (c *ToolSetController) RegisterRoutes(router *gin.RouterGroup) {
	toolsets := router.Group("/toolsets")
	{
		toolsets.GET("", c.ListToolSets)
		toolsets.POST("", c.CreateToolSet)
		toolsets.GET("/:id", c.GetToolSet)
		toolsets.PUT("/:id", c.UpdateToolSet)
		toolsets.DELETE("/:id", c.DeleteToolSet)
		toolsets.POST("/:id/test", c.TestToolSet)
		toolsets.GET("/types", c.GetToolSetTypeDefinitions)
	}
}

// CreateToolSetRequest represents the request to create a toolset
type CreateToolSetRequest struct {
	Name        string              `json:"name" binding:"required"`
	Description string              `json:"description" validate:"optional"`
	Type        model.ToolSetType   `json:"type" binding:"required"`
	Config      model.ToolSetConfig `json:"config" validate:"optional" swaggertype:"object"`
}

// UpdateToolSetRequest represents the request to update a toolset
type UpdateToolSetRequest struct {
	Name        string              `json:"name" binding:"required"`
	Description string              `json:"description" validate:"optional"`
	Type        model.ToolSetType   `json:"type" binding:"required"`
	Config      model.ToolSetConfig `json:"config" validate:"optional" swaggertype:"object"`
	Status      model.ToolSetStatus `json:"status" validate:"optional"`
}

// ListToolSets lists toolsets with pagination
//
//	@Summary		List toolsets
//	@Description	List toolsets with pagination and search
//	@ID             listToolSets
//	@Tags			ToolSets
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int		false	"Current page number"	default(1)
//	@Param			page_size	query		int		false	"Page size"				default(10)
//	@Param			search		query		string	false	"Search keyword"
//	@Success		200	{object}	util.PaginationResponse[model.ToolSet]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/toolsets [get]
func (c *ToolSetController) ListToolSets(ctx *gin.Context) {
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")

	toolsets, total, err := c.service.ListToolSets(ctx, current, pageSize, search)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccessList(ctx, http.StatusOK, toolsets, total, current, pageSize)
}

// CreateToolSet creates a new toolset
//
//	@Summary		Create toolset
//	@Description	Create a new toolset
//	@ID             createToolSet
//	@Tags			ToolSets
//	@Accept			json
//	@Produce		json
//	@Param			request	body		CreateToolSetRequest	true	"Toolset data"
//	@Success		201	{object}	util.Response[model.ToolSet]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/toolsets [post]
func (c *ToolSetController) CreateToolSet(ctx *gin.Context) {
	var req CreateToolSetRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}
	// Get current user ID from context
	userID, exists := ctx.Get("user_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}

	err := c.service.StartAudit(ctx, "", func(auditLog *model.AuditLog) error {
		toolset := model.NewToolSet(
			req.Name,
			req.Description,
			req.Type,
			req.Config,
			userID.(string),
		)
		createdToolSet, err := c.service.CreateToolSet(ctx, toolset)
		if err != nil {
			return util.NewError("E5001", err)
		}
		util.RespondWithSuccess(ctx, http.StatusCreated, createdToolSet)
		return nil
	},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.Request = req
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, err)
	}

}

// GetToolSet gets a toolset by ID
//
//	@Summary		Get toolset
//	@Description	Get a toolset by ID
//	@ID             getToolSet
//	@Tags			ToolSets
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Toolset ID"
//	@Success		200	{object}	util.Response[model.ToolSet]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/toolsets/{id} [get]
func (c *ToolSetController) GetToolSet(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Toolset ID is required"))
		return
	}

	toolset, err := c.service.GetToolSet(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, toolset)
}

// UpdateToolSet updates a toolset
//
//	@Summary		Update toolset
//	@Description	Update a toolset
//	@ID             updateToolSet
//	@Tags			ToolSets
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string					true	"Toolset ID"
//	@Param			request	body		UpdateToolSetRequest	true	"Toolset data"
//	@Success		200	{object}	util.Response[model.ToolSet]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/toolsets/{id} [put]
func (c *ToolSetController) UpdateToolSet(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Toolset ID is required"))
		return
	}

	var req UpdateToolSetRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	// Get current user ID from context
	userID, exists := ctx.Get("user_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "User not authenticated"))
		return
	}

	toolset := &model.ToolSet{
		Name:        req.Name,
		Description: req.Description,
		Type:        req.Type,
		Config:      req.Config,
		Status:      req.Status,
		UpdatedBy:   userID.(string),
	}

	updatedToolSet, err := c.service.UpdateToolSet(ctx, id, toolset)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, updatedToolSet)
}

// DeleteToolSet deletes a toolset
//
//	@Summary		Delete toolset
//	@Description	Delete a toolset
//	@ID             deleteToolSet
//	@Tags			ToolSets
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Toolset ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/toolsets/{id} [delete]
func (c *ToolSetController) DeleteToolSet(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Toolset ID is required"))
		return
	}

	err := c.service.DeleteToolSet(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithMessage(ctx, "Toolset deleted successfully")
}

// TestToolSet tests a toolset connection
//
//	@Summary		Test toolset
//	@Description	Test a toolset connection
//	@ID             testToolSet
//	@Tags			ToolSets
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Toolset ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/toolsets/{id}/test [post]
func (c *ToolSetController) TestToolSet(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Toolset ID is required"))
		return
	}

	err := c.service.TestToolSet(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithMessage(ctx, "Toolset connection test successful")
}

// GetToolSetTypeDefinitions gets the type definitions for toolsets
//
//	@Summary		Get toolset type definitions
//	@Description	Get the type definitions for toolsets
//	@ID             getToolSetTypeDefinitions
//	@Tags			ToolSets
//	@Produce		json
//	@Success		200	{object}	util.Response[[]service.ToolSetTypeDefinition]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/toolsets/types [get]
func (c *ToolSetController) GetToolSetTypeDefinitions(ctx *gin.Context) {
	response := c.service.GetToolSetTypeDefinitions(ctx)
	util.RespondWithSuccess(ctx, http.StatusOK, response)
}
