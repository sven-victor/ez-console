package aiapi

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/safe"
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
		models.GET("", middleware.RequirePermission("ai:models:view"), c.ListAIModels)
		models.POST("", middleware.RequirePermission("ai:models:create"), c.CreateAIModel)
		models.GET("/:id", middleware.RequirePermission("ai:models:view"), c.GetAIModel)
		models.PUT("/:id", middleware.RequirePermission("ai:models:update"), c.UpdateAIModel)
		models.DELETE("/:id", middleware.RequirePermission("ai:models:delete"), c.DeleteAIModel)
		models.POST("/:id/test", middleware.RequirePermission("ai:models:test"), c.TestAIModel)
		models.POST("/:id/set-default", middleware.RequirePermission("ai:models:update"), c.SetDefaultAIModel)
		models.GET("/types", middleware.RequirePermission("ai:models:view"), c.GetAITypeDefinitions)
	}
}

// CreateAIModelRequest represents the request to create an AI model
type CreateAIModelRequest struct {
	Name        string                `json:"name" binding:"required"`
	Description string                `json:"description" validate:"optional"`
	Provider    model.AIModelProvider `json:"provider" binding:"required"`
	Config      model.AIModelConfig   `json:"config" binding:"required" swaggertype:"object"`
	IsDefault   bool                  `json:"is_default" validate:"optional"`
}

// UpdateAIModelRequest represents the request to update an AI model
type UpdateAIModelRequest struct {
	Name        string                `json:"name" binding:"required"`
	Description string                `json:"description" validate:"optional"`
	Provider    model.AIModelProvider `json:"provider" binding:"required"`
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
	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")

	models, total, err := c.service.ListAIModels(ctx, organizationID, current, pageSize, search)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	for i := range models {
		factory, exists := ai.GetFactory(models[i].Provider)
		if !exists {
			if models[i].Config != nil {
				apiKey, ok := models[i].Config["api_key"].(string)
				if ok {
					models[i].Config["api_key"] = safe.NewEncryptedString(apiKey, os.Getenv(safe.SecretEnvName)).String()
				}
			}
			continue
		}
		configFields := factory.GetConfigFields()
		for _, configField := range configFields {
			if configField.Type == util.FieldTypePassword {
				if models[i].Config != nil {
					val := models[i].Config[configField.Name].(string)
					if val != "" {
						models[i].Config[configField.Name] = safe.NewEncryptedString(val, os.Getenv(safe.SecretEnvName)).String()
					}
				}
			}
		}
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
	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}
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

	factory, exists := ai.GetFactory(req.Provider)
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", fmt.Sprintf("unsupported toolset type: %s", req.Provider)))
		return
	}
	configFields := factory.GetConfigFields()
	for _, configField := range configFields {
		if configField.Required && req.Config[configField.Name] == "" {
			util.RespondWithError(ctx, util.NewError("E4001", fmt.Errorf("config field %s is required", configField.Name)))
			return
		}
		if configField.Type == util.FieldTypePassword {
			value, ok := req.Config[configField.Name]
			if !ok || value == nil {
				continue
			}
			switch v := value.(type) {
			case string:
				req.Config[configField.Name] = safe.NewEncryptedString(v, os.Getenv(safe.SecretEnvName)).String()
			default:
				util.RespondWithError(ctx, util.NewError("E4001", fmt.Errorf("config field %s is not a string", configField.Name)))
				return
			}
		}
	}

	aiModel := model.NewAIModel(
		organizationID,
		req.Name,
		req.Description,
		req.Provider,
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
	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "AI model ID is required"))
		return
	}

	aiModel, err := c.service.GetAIModelForAPI(ctx, organizationID, id)
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
	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}
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

	factory, exists := ai.GetFactory(req.Provider)
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", fmt.Sprintf("unsupported toolset type: %s", req.Provider)))
		return
	}
	configFields := factory.GetConfigFields()
	for _, configField := range configFields {
		if configField.Required && req.Config[configField.Name] == "" {
			util.RespondWithError(ctx, util.NewError("E4001", fmt.Errorf("config field %s is required", configField.Name)))
			return
		}
		if configField.Type == util.FieldTypePassword {
			value, ok := req.Config[configField.Name]
			if !ok || value == nil {
				continue
			}
			switch v := value.(type) {
			case string:
				req.Config[configField.Name] = safe.NewEncryptedString(v, os.Getenv(safe.SecretEnvName)).String()
			default:
				util.RespondWithError(ctx, util.NewError("E4001", fmt.Errorf("config field %s is not a string", configField.Name)))
				return
			}
		}
	}

	aiModel := &model.AIModel{
		Name:        req.Name,
		Description: req.Description,
		Provider:    req.Provider,
		Config:      req.Config,
		IsDefault:   req.IsDefault,
		UpdatedBy:   userID.(string),
	}

	updatedModel, err := c.service.UpdateAIModel(ctx, organizationID, id, aiModel)
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
	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "AI model ID is required"))
		return
	}

	err := c.service.DeleteAIModel(ctx, organizationID, id)
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
	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "AI model ID is required"))
		return
	}

	err := c.service.TestAIModel(ctx, organizationID, id)
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
	// Get organization ID from context
	organizationID := ctx.GetString("organization_id")
	if organizationID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "Organization not authenticated"))
		return
	}
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "AI model ID is required"))
		return
	}

	err := c.service.SetDefaultAIModel(ctx, organizationID, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	util.RespondWithMessage(ctx, "AI model set as default successfully")
}

// GetAITypeDefinitions gets the type definitions for AI providers
//
//	@Summary		Get AI type definitions
//	@Description	Get the type definitions for AI providers
//	@ID             getAITypeDefinitions
//	@Tags			AI/Models
//	@Produce		json
//	@Success		200	{object}	util.Response[[]service.AITypeDefinition]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/ai/models/types [get]
func (c *AIModelController) GetAITypeDefinitions(ctx *gin.Context) {
	definitions := c.service.GetAITypeDefinitions(ctx)
	util.RespondWithSuccess(ctx, http.StatusOK, definitions)
}

func init() {
	middleware.RegisterPermission("AI Model Management", "Manage AI models", []model.Permission{
		{
			Code:          "ai:models:view",
			Name:          "View AI models",
			Description:   "View AI model list and details",
			OrgPermission: true,
		},
		{
			Code:          "ai:models:create",
			Name:          "Create AI models",
			Description:   "Create new AI models",
			OrgPermission: true,
		},
		{
			Code:          "ai:models:update",
			Name:          "Update AI models",
			Description:   "Update AI model information",
			OrgPermission: true,
		},
		{
			Code:          "ai:models:delete",
			Name:          "Delete AI models",
			Description:   "Delete AI models",
			OrgPermission: true,
		},
		{
			Code:          "ai:models:test",
			Name:          "Test AI models",
			Description:   "Test AI model connection",
			OrgPermission: true,
		},
	})
}
