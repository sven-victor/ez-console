package service

import (
	"context"
	"fmt"

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
	// Encrypt the API key
	encryptedAPIKey, err := util.EncryptString(req.APIKey)
	if err != nil {
		return nil, fmt.Errorf("failed to encrypt API key: %w", err)
	}
	req.APIKey = encryptedAPIKey

	// If this is set as default, unset other defaults
	if req.IsDefault {
		if err := s.unsetDefaultModels(ctx, req.Provider); err != nil {
			return nil, fmt.Errorf("failed to unset default models: %w", err)
		}
	}

	if err := db.Session(ctx).Create(req).Error; err != nil {
		return nil, fmt.Errorf("failed to create AI model: %w", err)
	}

	// Don't return the encrypted API key
	req.APIKey = ""
	return req, nil
}

// GetAIModel gets an AI model by ID
func (s *AIModelService) GetAIModel(ctx context.Context, id string) (*model.AIModel, error) {
	var aiModel model.AIModel
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&aiModel).Error; err != nil {
		return nil, fmt.Errorf("failed to get AI model: %w", err)
	}

	// Decrypt the API key for internal use
	if aiModel.APIKey != "" {
		decryptedAPIKey, err := util.DecryptString(aiModel.APIKey)
		if err != nil {
			return nil, fmt.Errorf("failed to decrypt API key: %w", err)
		}
		aiModel.APIKey = decryptedAPIKey
	}

	return &aiModel, nil
}

// GetAIModelForAPI gets an AI model by ID for API response (without API key)
func (s *AIModelService) GetAIModelForAPI(ctx context.Context, id string) (*model.AIModel, error) {
	var aiModel model.AIModel
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&aiModel).Error; err != nil {
		return nil, fmt.Errorf("failed to get AI model: %w", err)
	}

	// Don't return the API key
	aiModel.APIKey = ""
	return &aiModel, nil
}

// UpdateAIModel updates an AI model
func (s *AIModelService) UpdateAIModel(ctx context.Context, id string, req *model.AIModel) (*model.AIModel, error) {
	var existingModel model.AIModel
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&existingModel).Error; err != nil {
		return nil, fmt.Errorf("failed to find AI model: %w", err)
	}

	// Encrypt the API key if provided
	if req.APIKey != "" {
		encryptedAPIKey, err := util.EncryptString(req.APIKey)
		if err != nil {
			return nil, fmt.Errorf("failed to encrypt API key: %w", err)
		}
		req.APIKey = encryptedAPIKey
	} else {
		// Keep the existing API key if not provided
		req.APIKey = existingModel.APIKey
	}

	// If this is set as default, unset other defaults
	if req.IsDefault && !existingModel.IsDefault {
		if err := s.unsetDefaultModels(ctx, req.Provider); err != nil {
			return nil, fmt.Errorf("failed to unset default models: %w", err)
		}
	}

	if err := db.Session(ctx).Model(&model.AIModel{}).Where("resource_id = ?", id).Select("config", "name", "description", "provider", "model_id", "api_key", "base_url").Updates(req).Error; err != nil {
		return nil, fmt.Errorf("failed to update AI model: %w", err)
	}

	// Don't return the encrypted API key
	req.APIKey = ""
	return req, nil
}

// DeleteAIModel deletes an AI model
func (s *AIModelService) DeleteAIModel(ctx context.Context, id string) error {
	var aiModel model.AIModel
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&aiModel).Error; err != nil {
		return fmt.Errorf("failed to find AI model: %w", err)
	}

	if err := db.Session(ctx).Delete(&aiModel).Error; err != nil {
		return fmt.Errorf("failed to delete AI model: %w", err)
	}

	return nil
}

// ListAIModels lists AI models with pagination
func (s *AIModelService) ListAIModels(ctx context.Context, current, pageSize int, search string) ([]model.AIModel, int64, error) {
	var models []model.AIModel
	var total int64

	query := db.Session(ctx).Model(&model.AIModel{})

	// Apply search filter
	if search != "" {
		query = query.Where("name LIKE ? OR description LIKE ? OR model_id LIKE ?",
			"%"+search+"%", "%"+search+"%", "%"+search+"%")
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

	// Don't return API keys
	for i := range models {
		models[i].APIKey = ""
	}

	return models, total, nil
}

// GetDefaultAIModel gets the default AI model for a provider
func (s *AIModelService) GetDefaultAIModel(ctx context.Context, provider model.AIModelProvider) (*model.AIModel, error) {
	var aiModel model.AIModel
	if err := db.Session(ctx).Where("provider = ? AND is_default = ? AND status = ?",
		provider, true, model.AIModelStatusEnabled).First(&aiModel).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// If no default model, get the first enabled model
			if err := db.Session(ctx).Where("provider = ? AND status = ?",
				provider, model.AIModelStatusEnabled).First(&aiModel).Error; err != nil {
				return nil, fmt.Errorf("no enabled AI model found for provider %s: %w", provider, err)
			}
		} else {
			return nil, fmt.Errorf("failed to get default AI model: %w", err)
		}
	}

	// Decrypt the API key for internal use
	if aiModel.APIKey != "" {
		decryptedAPIKey, err := util.DecryptString(aiModel.APIKey)
		if err != nil {
			return nil, fmt.Errorf("failed to decrypt API key: %w", err)
		}
		aiModel.APIKey = decryptedAPIKey
	}

	return &aiModel, nil
}

// SetDefaultAIModel sets an AI model as default
func (s *AIModelService) SetDefaultAIModel(ctx context.Context, id string) error {
	var aiModel model.AIModel
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&aiModel).Error; err != nil {
		return fmt.Errorf("failed to find AI model: %w", err)
	}

	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		// Unset other defaults for the same provider
		if err := tx.Model(&model.AIModel{}).Where("provider = ? AND id != ?",
			aiModel.Provider, id).Update("is_default", false).Error; err != nil {
			return fmt.Errorf("failed to unset other defaults: %w", err)
		}

		// Set this model as default
		if err := tx.Model(&aiModel).Update("is_default", true).Error; err != nil {
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
func (s *AIModelService) TestAIModel(ctx context.Context, id string) error {
	aiModel, err := s.GetAIModel(ctx, id)
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
	if aiModel.APIKey == "" {
		return fmt.Errorf("API key is required")
	}
	if aiModel.ModelID == "" {
		return fmt.Errorf("model ID is required")
	}

	// TODO: Make a test API call to OpenAI
	return nil
}
