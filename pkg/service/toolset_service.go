package service

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

// ToolSetService handles toolset management
type ToolSetService struct{}

// NewToolSetService creates a new toolset service
func NewToolSetService() *ToolSetService {
	return &ToolSetService{}
}

// CreateToolSet creates a new toolset
func (s *ToolSetService) CreateToolSet(ctx context.Context, req *model.ToolSet) (*model.ToolSet, error) {
	if err := db.Session(ctx).Create(req).Error; err != nil {
		return nil, fmt.Errorf("failed to create toolset: %w", err)
	}

	return req, nil
}

// GetToolSet gets an toolset by ID
func (s *ToolSetService) GetToolSet(ctx context.Context, id string) (*model.ToolSet, error) {
	var toolset model.ToolSet
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&toolset).Error; err != nil {
		return nil, fmt.Errorf("failed to get toolset: %w", err)
	}

	return &toolset, nil
}

// UpdateToolSet updates an toolset
func (s *ToolSetService) UpdateToolSet(ctx context.Context, id string, req *model.ToolSet) (*model.ToolSet, error) {
	var existingToolSet model.ToolSet
	conn := db.Session(ctx)
	if err := conn.Where("resource_id = ?", id).First(&existingToolSet).Error; err != nil {
		return nil, fmt.Errorf("failed to find toolset: %w", err)
	}

	if err := conn.Model(&model.ToolSet{}).Where("resource_id = ?", id).Select("config", "name", "description", "type", "status").Updates(req).Error; err != nil {
		return nil, fmt.Errorf("failed to update toolset: %w", err)
	}

	return req, nil
}

// UpdateToolSetStatus updates a toolset's status
func (s *ToolSetService) UpdateToolSetStatus(ctx context.Context, id string, status model.ToolSetStatus) (*model.ToolSet, error) {
	var toolset model.ToolSet
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&toolset).Error; err != nil {
		return nil, fmt.Errorf("failed to find toolset: %w", err)
	}

	if err := db.Session(ctx).Model(&model.ToolSet{}).Where("resource_id = ?", id).Update("status", status).Error; err != nil {
		return nil, fmt.Errorf("failed to update toolset status: %w", err)
	}

	toolset.Status = status
	return &toolset, nil
}

// DeleteToolSet deletes an toolset
func (s *ToolSetService) DeleteToolSet(ctx context.Context, id string) error {
	var toolset model.ToolSet
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&toolset).Error; err != nil {
		return fmt.Errorf("failed to find toolset: %w", err)
	}

	if err := db.Session(ctx).Delete(&toolset).Error; err != nil {
		return fmt.Errorf("failed to delete toolset: %w", err)
	}

	return nil
}

// ListToolSets lists toolsets with pagination
func (s *ToolSetService) ListToolSets(ctx context.Context, current, pageSize int, search string) ([]model.ToolSet, int64, error) {
	var toolsets []model.ToolSet
	var total int64

	query := db.Session(ctx).Model(&model.ToolSet{})

	// Apply search filter
	if search != "" {
		query = query.Where("name LIKE ? OR description LIKE ? OR endpoint LIKE ?",
			"%"+search+"%", "%"+search+"%", "%"+search+"%")
	}

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count toolsets: %w", err)
	}

	// Apply pagination
	offset := (current - 1) * pageSize
	if err := query.Offset(offset).Limit(pageSize).Order("created_at DESC").Find(&toolsets).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to list toolsets: %w", err)
	}

	return toolsets, total, nil
}

// GetEnabledToolSets gets all enabled toolsets
func (s *ToolSetService) GetEnabledToolSets(ctx context.Context) ([]model.ToolSet, error) {
	var toolsets []model.ToolSet
	if err := db.Session(ctx).Where("status = ?", model.ToolSetStatusEnabled).Find(&toolsets).Error; err != nil {
		return nil, fmt.Errorf("failed to get enabled toolsets: %w", err)
	}

	return toolsets, nil
}

// TestToolSet tests an toolset connection
func (s *ToolSetService) TestToolSet(ctx context.Context, id string) error {
	toolset, err := s.GetToolSet(ctx, id)
	if err != nil {
		return fmt.Errorf("failed to get toolset: %w", err)
	}

	// Create toolset instance
	toolsetInstance, err := s.createToolSetInstance(toolset)
	if err != nil {
		return fmt.Errorf("failed to create toolset instance: %w", err)
	}

	// Validate and test the toolset
	if err := toolsetInstance.Validate(); err != nil {
		return fmt.Errorf("toolset validation failed: %w", err)
	}

	if err := toolsetInstance.Test(ctx); err != nil {
		return fmt.Errorf("toolset test failed: %w", err)
	}

	return nil
}

// GetToolSetInstance creates a toolset instance from database model
func (s *ToolSetService) GetToolSetInstance(ctx context.Context, id string) (toolset.ToolSet, error) {
	toolset, err := s.GetToolSet(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get toolset: %w", err)
	}

	return s.createToolSetInstance(toolset)
}

// createToolSetInstance creates a toolset instance from database model
func (s *ToolSetService) createToolSetInstance(toolSet *model.ToolSet) (toolset.ToolSet, error) {
	factory, exists := toolset.GetToolSetFactory(toolset.ToolSetType(toolSet.Type))
	if !exists {
		return nil, fmt.Errorf("unsupported toolset type: %s", toolSet.Type)
	}

	configJSON, err := json.Marshal(toolSet.Config)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal toolset config: %w", err)
	}

	return factory.CreateToolSet(string(configJSON))
}

// GetAllEnabledToolSetInstances gets all enabled toolset instances
func (s *ToolSetService) GetAllEnabledToolSetInstances(ctx context.Context) (toolset.ToolSets, error) {
	toolsets, err := s.GetEnabledToolSets(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get enabled toolsets: %w", err)
	}

	var instances []toolset.ToolSet
	for _, toolset := range toolsets {
		instance, err := s.createToolSetInstance(&toolset)
		if err != nil {
			// Log error but continue with other toolsets
			continue
		}
		instances = append(instances, instance)
	}

	return instances, nil
}

type ToolSetTypeDefinition struct {
	ToolSetType  toolset.ToolSetType          `json:"tool_set_type"`
	ConfigFields []toolset.ToolSetConfigField `json:"config_fields"`
	Description  string                       `json:"description"`
	Name         string                       `json:"name"`
}

func (s *ToolSetService) GetToolSetTypeDefinitions(ctx context.Context) []ToolSetTypeDefinition {
	toolSets := toolset.GetRegisteredToolSets()
	definitions := []ToolSetTypeDefinition{}
	for name, toolSet := range toolSets {
		definitions = append(definitions, ToolSetTypeDefinition{
			ToolSetType:  name,
			Description:  toolSet.GetDescription(),
			Name:         toolSet.GetName(),
			ConfigFields: toolSet.GetConfigFields(),
		})
	}
	return definitions
}

// GetToolSetTools gets tools from a toolset
func (s *ToolSetService) GetToolSetTools(ctx context.Context, id string) ([]openai.Tool, error) {
	toolsetInstance, err := s.GetToolSetInstance(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get toolset instance: %w", err)
	}

	tools, err := toolsetInstance.ListTools(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to list tools: %w", err)
	}

	return tools, nil
}
