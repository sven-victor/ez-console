package model

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

// AIModelProvider represents the AI model provider type
type AIModelProvider string

const (
	AIModelProviderOpenAI AIModelProvider = "openai"
)

// AIModelStatus represents the AI model status
type AIModelStatus string

const (
	AIModelStatusEnabled  AIModelStatus = "enabled"
	AIModelStatusDisabled AIModelStatus = "disabled"
)

// AIModelConfig represents the configuration for an AI model
type AIModelConfig map[string]interface{}

// Value implements the driver.Valuer interface for GORM
func (c AIModelConfig) Value() (driver.Value, error) {
	if c == nil {
		return nil, nil
	}
	return json.Marshal(c)
}

// Scan implements the sql.Scanner interface for GORM
func (c *AIModelConfig) Scan(value interface{}) error {
	if value == nil {
		*c = nil
		return nil
	}

	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("cannot scan %T into AIModelConfig", value)
	}

	return json.Unmarshal(bytes, c)
}

// AIModel represents an AI model configuration
type AIModel struct {
	Base
	Name        string          `gorm:"size:100;not null" json:"name" binding:"required"`     // Model name
	Description string          `gorm:"size:500" json:"description"`                          // Model description
	Provider    AIModelProvider `gorm:"size:50;not null" json:"provider" binding:"required"`  // Provider (openai, etc.)
	ModelID     string          `gorm:"size:100;not null" json:"model_id" binding:"required"` // Model ID (e.g., gpt-4, gpt-3.5-turbo)
	APIKey      string          `gorm:"size:500;not null" json:"api_key" binding:"required"`  // API key (encrypted)
	BaseURL     string          `gorm:"size:500" json:"base_url"`                             // Base URL (optional, for custom endpoints)
	Config      AIModelConfig   `gorm:"type:text" json:"config"`                              // Additional configuration
	Status      AIModelStatus   `gorm:"size:20;not null;default:'enabled'" json:"status"`     // Status
	IsDefault   bool            `gorm:"not null;default:false" json:"is_default"`             // Whether this is the default model
	CreatedBy   string          `gorm:"size:36;not null" json:"created_by"`                   // Creator user ID
	UpdatedBy   string          `gorm:"size:36" json:"updated_by"`                            // Last updater user ID
}

// TableName returns the table name for AIModel
func (AIModel) TableName() string {
	return "t_ai_models"
}

// NewAIModel creates a new AI model
func NewAIModel(name, description string, provider AIModelProvider, modelID, apiKey, baseURL string, config AIModelConfig, createdBy string) *AIModel {
	return &AIModel{
		Name:        name,
		Description: description,
		Provider:    provider,
		ModelID:     modelID,
		APIKey:      apiKey,
		BaseURL:     baseURL,
		Config:      config,
		Status:      AIModelStatusEnabled,
		IsDefault:   false,
		CreatedBy:   createdBy,
	}
}
