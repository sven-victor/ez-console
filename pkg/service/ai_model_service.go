package service

import (
	"context"
	"fmt"

	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
	"gorm.io/gorm"
)

// AIModelService handles AI model management
type AIModelService struct{}

// NewAIModelService creates a new AI model service
func NewAIModelService() *AIModelService {
	return &AIModelService{}
}

// CreateAIModel creates a new AI model
func (s *AIModelService) CreateAIModel(ctx context.Context, req *model.AIModel) (*model.AIModel, error) {
	// Encrypt the API key in Config
	if req.Config != nil {
		if apiKey, ok := req.Config["api_key"].(string); ok && apiKey != "" {
			req.Config["api_key"] = util.EncryptString(apiKey)
		}
	}
	err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if req.IsDefault {
			if req.Status != model.AIModelStatusEnabled {
				return fmt.Errorf("default AI model must be enabled")
			}
			if err := tx.Model(&model.AIModel{}).Where("organization_id = ?", req.OrganizationID).Update("is_default", false).Error; err != nil {
				return fmt.Errorf("failed to unset other defaults: %w", err)
			}
		}
		if err := tx.Create(req).Error; err != nil {
			return fmt.Errorf("failed to create AI model: %w", err)
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	return req, nil
}

// GetAIModel gets an AI model by ID
func (s *AIModelService) GetAIModel(ctx context.Context, organizationID, id string) (*model.AIModel, error) {
	var aiModel model.AIModel
	if err := db.Session(ctx).Where("organization_id = ? AND resource_id = ?", organizationID, id).First(&aiModel).Error; err != nil {
		return nil, fmt.Errorf("failed to get AI model: %w", err)
	}

	return &aiModel, nil
}

// GetAIModelForAPI gets an AI model by ID for API response (without API key)
func (s *AIModelService) GetAIModelForAPI(ctx context.Context, organizationID, id string) (*model.AIModel, error) {
	var aiModel model.AIModel
	if err := db.Session(ctx).Where("organization_id = ? AND resource_id = ?", organizationID, id).First(&aiModel).Error; err != nil {
		return nil, fmt.Errorf("failed to get AI model: %w", err)
	}

	// Don't return the API key
	if aiModel.Config != nil {
		aiModel.Config["api_key"] = ""
	}
	return &aiModel, nil
}

// UpdateAIModel updates an AI model
func (s *AIModelService) UpdateAIModel(ctx context.Context, organizationID, id string, req *model.AIModel) (*model.AIModel, error) {
	var existingModel model.AIModel
	if err := db.Session(ctx).Where("organization_id = ? AND resource_id = ?", organizationID, id).First(&existingModel).Error; err != nil {
		return nil, fmt.Errorf("failed to find AI model: %w", err)
	}

	err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if req.IsDefault {
			if req.Status != model.AIModelStatusEnabled {
				return fmt.Errorf("default AI model must be enabled")
			}
			if err := tx.Model(&model.AIModel{}).
				Where("organization_id = ? AND resource_id != ?", organizationID, id).
				Select(
					"name",
					"description",
					"provider",
					"config",
					"is_default",
					"updated_by",
				).
				Update("is_default", false).Error; err != nil {
				return fmt.Errorf("failed to unset other defaults: %w", err)
			}
		}

		if err := tx.Model(&model.AIModel{}).
			Where("organization_id = ? AND resource_id = ?", organizationID, id).
			Select("config", "name", "description", "provider", "is_default", "updated_by").
			Updates(req).Error; err != nil {
			return fmt.Errorf("failed to update AI model: %w", err)
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	return req, nil
}

// DeleteAIModel deletes an AI model
func (s *AIModelService) DeleteAIModel(ctx context.Context, organizationID, id string) error {
	var aiModel model.AIModel
	if err := db.Session(ctx).Where("organization_id = ? AND resource_id = ?", organizationID, id).First(&aiModel).Error; err != nil {
		return fmt.Errorf("failed to find AI model: %w", err)
	}
	if aiModel.IsDefault {
		return fmt.Errorf("default AI model cannot be deleted")
	}

	if err := db.Session(ctx).Where("organization_id = ? AND resource_id = ?", organizationID, id).Delete(&aiModel).Error; err != nil {
		return fmt.Errorf("failed to delete AI model: %w", err)
	}

	return nil
}

// ListAIModels lists AI models with pagination
func (s *AIModelService) ListAIModels(ctx context.Context, organizationID string, current, pageSize int, search string) ([]model.AIModel, int64, error) {
	var models []model.AIModel
	var total int64

	query := db.Session(ctx).Model(&model.AIModel{}).Where("organization_id = ?", organizationID)

	// Apply search filter
	// Note: Config field search is complex in SQL, so we only search name and description
	// Config.model_id search would require JSON functions which vary by database
	if search != "" {
		query = query.Where("name LIKE ? OR description LIKE ?",
			"%"+search+"%", "%"+search+"%")
	}

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count AI models: %w", err)
	}

	// Apply pagination
	offset := (current - 1) * pageSize
	if err := query.Offset(offset).Limit(pageSize).Order("created_at DESC").Find(&models).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to list AI models: %w", err)
	}

	return models, total, nil
}

// GetDefaultAIModel gets the default AI model for a provider
func (s *AIModelService) GetDefaultAIModel(ctx context.Context, organizationID string) (*model.AIModel, error) {
	var aiModel model.AIModel
	if err := db.Session(ctx).Where("organization_id = ? AND is_default = ? AND status = ?",
		organizationID, true, model.AIModelStatusEnabled).First(&aiModel).Error; err != nil {
		return nil, fmt.Errorf("failed to get default AI model: %w", err)
	}

	return &aiModel, nil
}

// SetDefaultAIModel sets an AI model as default
func (s *AIModelService) SetDefaultAIModel(ctx context.Context, organizationID, id string) error {
	var aiModel model.AIModel
	if err := db.Session(ctx).Where("organization_id = ? AND resource_id = ?", organizationID, id).First(&aiModel).Error; err != nil {
		return fmt.Errorf("failed to find AI model: %w", err)
	}
	if aiModel.Status != model.AIModelStatusEnabled {
		return fmt.Errorf("default AI model must be enabled")
	}

	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		// Unset other defaults for the same provider
		if err := tx.Model(&model.AIModel{}).Where("organization_id = ? AND resource_id != ?", organizationID, id).Update("is_default", false).Error; err != nil {
			return fmt.Errorf("failed to unset other defaults: %w", err)
		}

		// Set this model as default
		if err := tx.Model(&model.AIModel{}).Where("organization_id = ? AND resource_id = ?", organizationID, id).Update("is_default", true).Error; err != nil {
			return fmt.Errorf("failed to set as default: %w", err)
		}

		return nil
	})
}

// unsetDefaultModels unsets all default models for a provider
func (s *AIModelService) unsetDefaultModels(ctx context.Context, provider model.AIModelProvider) error {
	return db.Session(ctx).Model(&model.AIModel{}).
		Where("provider = ? AND is_default = ?", provider, true).
		Update("is_default", false).Error
}

// TestAIModel tests an AI model connection
func (s *AIModelService) TestAIModel(ctx context.Context, organizationID, id string) error {
	aiModel, err := s.GetAIModel(ctx, organizationID, id)
	if err != nil {
		return fmt.Errorf("failed to get AI model: %w", err)
	}

	// TODO: Implement actual connection test based on provider
	switch aiModel.Provider {
	case model.AIModelProviderOpenAI:
		// Test OpenAI connection
		return s.testOpenAIModel(ctx, aiModel)
	default:
		return fmt.Errorf("unsupported provider: %s", aiModel.Provider)
	}
}

// testOpenAIModel tests OpenAI model connection
func (s *AIModelService) testOpenAIModel(ctx context.Context, aiModel *model.AIModel) error {
	// This would be implemented to test the actual OpenAI connection
	// For now, just validate the configuration
	if aiModel.Config == nil {
		return fmt.Errorf("config is required")
	}

	apiKey, ok := aiModel.Config["api_key"].(string)
	if !ok || apiKey == "" {
		return fmt.Errorf("API key is required in config")
	}

	modelID, ok := aiModel.Config["model_id"].(string)
	if !ok || modelID == "" {
		return fmt.Errorf("model ID is required in config")
	}

	// TODO: Make a test API call to OpenAI
	return nil
}

// AITypeDefinition represents the type definition for an AI provider
type AITypeDefinition struct {
	Provider     model.AIModelProvider `json:"provider"`
	ConfigFields []util.ConfigField    `json:"config_fields"`
	Description  string                `json:"description"`
	Name         string                `json:"name"`
}

// GetAITypeDefinitions returns all registered AI provider type definitions
func (s *AIModelService) GetAITypeDefinitions(ctx context.Context) []AITypeDefinition {
	factories := ai.GetRegisteredFactories()
	definitions := []AITypeDefinition{}
	for provider, factory := range factories {
		definitions = append(definitions, AITypeDefinition{
			Provider:     provider,
			Description:  factory.GetDescription(),
			Name:         factory.GetName(),
			ConfigFields: factory.GetConfigFields(),
		})
	}
	return definitions
}
