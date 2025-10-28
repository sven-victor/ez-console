package aiapi

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// AIModelController handles AI model management
type AIModelController struct {
	service *service.Service
}

// NewAIModelController creates a new AI model controller
func NewAIModelController(service *service.Service) *AIModelController {
	return &AIModelController{service: service}
}

// RegisterRoutes registers AI model routes
func (c *AIModelController) RegisterRoutes(router *gin.RouterGroup) {
	models := router.Group("/models")
	{
		models.GET("", c.ListAIModels)
		models.POST("", c.CreateAIModel)
		models.GET("/:id", c.GetAIModel)
		models.PUT("/:id", c.UpdateAIModel)
		models.DELETE("/:id", c.DeleteAIModel)
		models.POST("/:id/test", c.TestAIModel)
		models.POST("/:id/set-default", c.SetDefaultAIModel)
	}
}

// CreateAIModelRequest represents the request to create an AI model
type CreateAIModelRequest struct {
	Name        string                `json:"name" binding:"required"`
	Description string                `json:"description" validate:"optional"`
	Provider    model.AIModelProvider `json:"provider" binding:"required"`
	ModelID     string                `json:"model_id" binding:"required"`
	APIKey      string                `json:"api_key" binding:"required"`
	BaseURL     string                `json:"base_url,omitempty" validate:"optional"`
	Config      model.AIModelConfig   `json:"config" validate:"optional" swaggertype:"object"`
	IsDefault   bool                  `json:"is_default" validate:"optional"`
}

// UpdateAIModelRequest represents the request to update an AI model
type UpdateAIModelRequest struct {
	Name        string                `json:"name" binding:"required"`
	Description string                `json:"description" validate:"optional"`
	Provider    model.AIModelProvider `json:"provider" binding:"required"`
	ModelID     string                `json:"model_id" binding:"required"`
	APIKey      string                `json:"api_key"` // Optional for updates
	BaseURL     string                `json:"base_url" validate:"optional"`
	Config      model.AIModelConfig   `json:"config" validate:"optional" swaggertype:"object"`
	IsDefault   bool                  `json:"is_default" validate:"optional"`
}

// ListAIModels lists AI models with pagination
//
//	@Summary		List AI models
//	@Description	List AI models with pagination and search
//	@ID             listAIModels
//	@Tags			AI/Models
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int		false	"Current page number"	default(1)
//	@Param			page_size	query		int		false	"Page size"				default(10)
//	@Param			search		query		string	false	"Search keyword"
//	@Success		200	{object}	util.PaginationResponse[model.AIModel]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/models [get]
func (c *AIModelController) ListAIModels(ctx *gin.Context) {
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")

	models, total, err := c.service.ListAIModels(ctx, current, pageSize, search)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccessList(ctx, http.StatusOK, models, total, current, pageSize)
}

// CreateAIModel creates a new AI model
//
//	@Summary		Create AI model
//	@Description	Create a new AI model
//	@ID             createAIModel
//	@Tags			AI/Models
//	@Accept			json
//	@Produce		json
//	@Param			request	body		CreateAIModelRequest	true	"AI model data"
//	@Success		201	{object}	util.Response[model.AIModel]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/models [post]
func (c *AIModelController) CreateAIModel(ctx *gin.Context) {
	var req CreateAIModelRequest
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

	aiModel := model.NewAIModel(
		req.Name,
		req.Description,
		req.Provider,
		req.ModelID,
		req.APIKey,
		req.BaseURL,
		req.Config,
		userID.(string),
	)
	aiModel.IsDefault = req.IsDefault

	createdModel, err := c.service.CreateAIModel(ctx, aiModel)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusCreated, createdModel)
}

// GetAIModel gets an AI model by ID
//
//	@Summary		Get AI model
//	@Description	Get an AI model by ID
//	@ID             getAIModel
//	@Tags			AI/Models
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"AI model ID"
//	@Success		200	{object}	util.Response[model.AIModel]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/models/{id} [get]
func (c *AIModelController) GetAIModel(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "AI model ID is required"))
		return
	}

	aiModel, err := c.service.GetAIModelForAPI(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, aiModel)
}

// UpdateAIModel updates an AI model
//
//	@Summary		Update AI model
//	@Description	Update an AI model
//	@ID             updateAIModel
//	@Tags			AI/Models
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string					true	"AI model ID"
//	@Param			request	body		UpdateAIModelRequest	true	"AI model data"
//	@Success		200	{object}	util.Response[model.AIModel]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/models/{id} [put]
func (c *AIModelController) UpdateAIModel(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "AI model ID is required"))
		return
	}

	var req UpdateAIModelRequest
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

	aiModel := &model.AIModel{
		Name:        req.Name,
		Description: req.Description,
		Provider:    req.Provider,
		ModelID:     req.ModelID,
		APIKey:      req.APIKey,
		BaseURL:     req.BaseURL,
		Config:      req.Config,
		IsDefault:   req.IsDefault,
		UpdatedBy:   userID.(string),
	}

	updatedModel, err := c.service.UpdateAIModel(ctx, id, aiModel)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, updatedModel)
}

// DeleteAIModel deletes an AI model
//
//	@Summary		Delete AI model
//	@Description	Delete an AI model
//	@ID             deleteAIModel
//	@Tags			AI/Models
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"AI model ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/models/{id} [delete]
func (c *AIModelController) DeleteAIModel(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "AI model ID is required"))
		return
	}

	err := c.service.DeleteAIModel(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithMessage(ctx, "AI model deleted successfully")
}

// TestAIModel tests an AI model connection
//
//	@Summary		Test AI model
//	@Description	Test an AI model connection
//	@ID             testAIModel
//	@Tags			AI/Models
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"AI model ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/models/{id}/test [post]
func (c *AIModelController) TestAIModel(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "AI model ID is required"))
		return
	}

	err := c.service.TestAIModel(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithMessage(ctx, "AI model connection test successful")
}

// SetDefaultAIModel sets an AI model as default
//
//	@Summary		Set default AI model
//	@Description	Set an AI model as default
//	@ID             setDefaultAIModel
//	@Tags			AI/Models
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"AI model ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/models/{id}/set-default [post]
func (c *AIModelController) SetDefaultAIModel(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "AI model ID is required"))
		return
	}

	err := c.service.SetDefaultAIModel(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithMessage(ctx, "AI model set as default successfully")
}
