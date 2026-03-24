// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package service

import (
	"context"
	"encoding/json"
	"fmt"
	"sync"

	"github.com/invopop/jsonschema"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
	"github.com/sven-victor/ez-console/pkg/util"
)

// ToolSetService handles toolset management
type ToolSetService struct{}

var (
	toolSetServiceOnce sync.Once
	toolSetService     *ToolSetService
)

// NewToolSetService creates a new toolset service
func NewToolSetService() *ToolSetService {
	toolSetServiceOnce.Do(func() {
		toolSetService = &ToolSetService{}
	})
	return toolSetService
}

// CreateToolSet creates a new toolset
func (s *ToolSetService) CreateToolSet(ctx context.Context, req *model.ToolSet) (*model.ToolSet, error) {
	if err := db.Session(ctx).Create(req).Error; err != nil {
		return nil, fmt.Errorf("failed to create toolset: %w", err)
	}

	return req, nil
}

// GetToolSet gets an toolset by ID
func (s *ToolSetService) GetToolSet(ctx context.Context, organizationID, id string) (*model.ToolSet, error) {
	var toolset model.ToolSet
	if err := db.Session(ctx).Where("organization_id = ? AND resource_id = ?", organizationID, id).First(&toolset).Error; err != nil {
		return nil, fmt.Errorf("failed to get toolset: %w", err)
	}

	return &toolset, nil
}

// UpdateToolSet updates an toolset
func (s *ToolSetService) UpdateToolSet(ctx context.Context, organizationID, id string, req *model.ToolSet) (*model.ToolSet, error) {
	var existingToolSet model.ToolSet
	conn := db.Session(ctx)
	if err := conn.Where("organization_id = ? AND resource_id = ?", organizationID, id).First(&existingToolSet).Error; err != nil {
		return nil, fmt.Errorf("failed to find toolset: %w", err)
	}

	if existingToolSet.IsPreset {
		return s.updatePresetToolSet(ctx, organizationID, &existingToolSet, req)
	}

	if err := conn.Model(&model.ToolSet{}).Where("resource_id = ?", id).Select("config", "name", "description", "type", "status").Updates(req).Error; err != nil {
		return nil, fmt.Errorf("failed to update toolset: %w", err)
	}

	return req, nil
}

// updatePresetToolSet only updates config (e.g. disabled_tools) and status; name/type/description stay managed by sync.
func (s *ToolSetService) updatePresetToolSet(ctx context.Context, organizationID string, existing, req *model.ToolSet) (*model.ToolSet, error) {
	merged := make(model.ToolSetConfig)
	if existing.Config != nil {
		for k, v := range existing.Config {
			merged[k] = v
		}
	}
	if req.Config != nil {
		for k, v := range req.Config {
			merged[k] = v
		}
	}
	status := existing.Status
	if req.Status != "" {
		status = req.Status
	}
	updates := map[string]interface{}{
		"config":     merged,
		"status":     status,
		"updated_by": req.UpdatedBy,
	}
	if err := db.Session(ctx).Model(&model.ToolSet{}).Where("organization_id = ? AND resource_id = ?", organizationID, existing.ResourceID).Updates(updates).Error; err != nil {
		return nil, fmt.Errorf("failed to update preset toolset: %w", err)
	}
	existing.Config = merged
	existing.Status = status
	if req.UpdatedBy != "" {
		existing.UpdatedBy = req.UpdatedBy
	}
	return existing, nil
}

// UpdateToolSetStatus updates a toolset's status
func (s *ToolSetService) UpdateToolSetStatus(ctx context.Context, organizationID, id string, status model.ToolSetStatus) (*model.ToolSet, error) {
	var toolset model.ToolSet
	if err := db.Session(ctx).Where("organization_id = ? AND resource_id = ?", organizationID, id).First(&toolset).Error; err != nil {
		return nil, fmt.Errorf("failed to find toolset: %w", err)
	}

	if err := db.Session(ctx).Model(&model.ToolSet{}).Where("organization_id = ? AND resource_id = ?", organizationID, id).Update("status", status).Error; err != nil {
		return nil, fmt.Errorf("failed to update toolset status: %w", err)
	}

	toolset.Status = status
	return &toolset, nil
}

// DeleteToolSet deletes an toolset
func (s *ToolSetService) DeleteToolSet(ctx context.Context, organizationID, id string) error {
	var toolset model.ToolSet
	if err := db.Session(ctx).Where("organization_id = ? AND resource_id = ?", organizationID, id).First(&toolset).Error; err != nil {
		return fmt.Errorf("failed to find toolset: %w", err)
	}
	if toolset.IsPreset {
		return fmt.Errorf("preset toolsets cannot be deleted")
	}

	if err := db.Session(ctx).Delete(&toolset).Error; err != nil {
		return fmt.Errorf("failed to delete toolset: %w", err)
	}

	return nil
}

// ListToolSets lists toolsets with pagination
func (s *ToolSetService) ListToolSets(ctx context.Context, organizationID string, current, pageSize int, search string, toolSetType string, includeTools bool) ([]model.ToolSet, int64, error) {
	var toolsets []model.ToolSet
	var total int64

	query := db.Session(ctx).Model(&model.ToolSet{}).Where("organization_id = ?", organizationID)

	// Apply search filter
	if search != "" {
		query = query.Where("name LIKE ? OR description LIKE ? OR endpoint LIKE ?",
			"%"+search+"%", "%"+search+"%", "%"+search+"%")
	}

	if toolSetType != "" {
		query = query.Where("type = ?", toolSetType)
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

	if includeTools {
		for i := range toolsets {
			if toolsets[i].Status != model.ToolSetStatusEnabled {
				continue
			}
			toolDefinitions, err := s.GetToolSetToolDefinitions(ctx, organizationID, toolsets[i].ResourceID)
			if err != nil {
				return nil, 0, fmt.Errorf("failed to list tools for toolset %s: %w", toolsets[i].ResourceID, err)
			}
			toolsets[i].Tools = toolDefinitions
		}
	}

	return toolsets, total, nil
}

// GetEnabledToolSets gets all enabled toolsets
func (s *ToolSetService) GetEnabledToolSets(ctx context.Context, organizationID string) ([]model.ToolSet, error) {
	var toolsets []model.ToolSet
	if err := db.Session(ctx).Where("organization_id = ? AND status = ?", organizationID, model.ToolSetStatusEnabled).Find(&toolsets).Error; err != nil {
		return nil, fmt.Errorf("failed to get enabled toolsets: %w", err)
	}

	return toolsets, nil
}

// TestToolSet tests an toolset connection
func (s *ToolSetService) TestToolSet(ctx context.Context, organizationID, id string) error {
	toolset, err := s.GetToolSet(ctx, organizationID, id)
	if err != nil {
		return fmt.Errorf("failed to get toolset: %w", err)
	}

	// Create toolset instance
	toolsetInstance, err := s.CreateToolSetInstance(toolset)
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
func (s *ToolSetService) GetToolSetInstance(ctx context.Context, organizationID, id string) (toolset.ToolSet, error) {
	toolset, err := s.GetToolSet(ctx, organizationID, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get toolset: %w", err)
	}

	return s.CreateToolSetInstance(toolset)
}

// CreateToolSetInstance creates a toolset instance from database model
func (s *ToolSetService) CreateToolSetInstance(toolSet *model.ToolSet) (toolset.ToolSet, error) {
	factory, exists := toolset.GetToolSetFactory(toolset.ToolSetType(toolSet.Type))
	if !exists {
		return nil, fmt.Errorf("unsupported toolset type: %s", toolSet.Type)
	}

	configJSON, err := json.Marshal(toolSet.Config)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal toolset config: %w", err)
	}

	inst, err := factory.CreateToolSet(string(configJSON))
	if err != nil {
		return nil, err
	}
	disabled := model.DisabledToolNamesFromConfig(toolSet.Config)
	if len(disabled) > 0 {
		inst = newToolSetDisabledToolsFilter(inst, disabled)
	}
	return inst, nil
}

// GetAllEnabledToolSetInstances gets all enabled toolset instances
func (s *ToolSetService) GetAllEnabledToolSetInstances(ctx context.Context, organizationID string) (toolset.ToolSets, error) {
	toolsets, err := s.GetEnabledToolSets(ctx, organizationID)
	if err != nil {
		return nil, fmt.Errorf("failed to get enabled toolsets: %w", err)
	}

	instances := make(toolset.ToolSets)
	for _, toolset := range toolsets {
		instance, err := s.CreateToolSetInstance(&toolset)
		if err != nil {
			// Log error but continue with other toolsets
			continue
		}
		instances[fmt.Sprintf("%s%d", toolset.Type, toolset.ID)] = instance
	}

	return instances, nil
}

type ToolSetTypeDefinition struct {
	ToolSetType  toolset.ToolSetType `json:"tool_set_type"`
	ConfigSchema *jsonschema.Schema  `json:"config_schema,omitempty"`
	UISchema     map[string]any      `json:"ui_schema,omitempty"`
	Description  string              `json:"description"`
	Name         string              `json:"name"`
}

func (s *ToolSetService) GetToolSetTypeDefinitions(ctx context.Context) []ToolSetTypeDefinition {
	toolSets := toolset.GetRegisteredToolSets()
	definitions := []ToolSetTypeDefinition{}
	for name, factory := range toolSets {
		def := ToolSetTypeDefinition{
			ToolSetType: name,
			Description: factory.GetDescription(),
			Name:        factory.GetName(),
		}
		if v2, ok := factory.(toolset.ToolSetFactoryV2); ok {
			schema, uiSchema, err := v2.GetConfigSchema()
			if err == nil && schema != nil {
				def.ConfigSchema = schema
			} else {
				def.ConfigSchema = util.ConfigFieldsToJSONSchema(factory.GetConfigFields())
			}
			def.UISchema = uiSchema
		} else {
			def.ConfigSchema = util.ConfigFieldsToJSONSchema(factory.GetConfigFields())
		}
		definitions = append(definitions, def)
	}
	return definitions
}

// GetToolSetTools gets tools from a toolset
func (s *ToolSetService) GetToolSetTools(ctx context.Context, organizationID, id string) ([]openai.Tool, error) {
	toolsetInstance, err := s.GetToolSetInstance(ctx, organizationID, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get toolset instance: %w", err)
	}

	tools, err := toolsetInstance.ListTools(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to list tools: %w", err)
	}

	return tools, nil
}

// GetToolSetToolDefinitions returns tool definitions retrieved from the toolset instance.
func (s *ToolSetService) GetToolSetToolDefinitions(ctx context.Context, organizationID, id string) ([]model.ToolDefinition, error) {
	tools, err := s.GetToolSetTools(ctx, organizationID, id)
	if err != nil {
		return nil, err
	}
	return convertOpenAITools(tools), nil
}

func convertOpenAITools(tools []openai.Tool) []model.ToolDefinition {
	definitions := make([]model.ToolDefinition, 0, len(tools))
	for _, tool := range tools {
		definition := model.ToolDefinition{
			Type: string(tool.Type),
		}

		if tool.Function != nil {
			definition.Name = tool.Function.Name
			definition.Description = tool.Function.Description
			definition.Parameters = tool.Function.Parameters
			definition.Strict = tool.Function.Strict
			if definition.Type == "" {
				definition.Type = "function"
			}
		}

		if definition.Name == "" {
			definition.Name = definition.Type
		}

		definitions = append(definitions, definition)
	}

	return definitions
}

// authorizedToolSetItem is one RBAC-authorized toolset instance with stable map key and toolset resource_id.
type authorizedToolSetItem struct {
	ResourceID   string
	ToolSetType  string
	MapKey       string
	ToolSet      toolset.ToolSet
}

func toolSetsFromAuthorizedItems(items []authorizedToolSetItem) toolset.ToolSets {
	if len(items) == 0 {
		return nil
	}
	out := make(toolset.ToolSets, len(items))
	for _, it := range items {
		out[it.MapKey] = it.ToolSet
	}
	return out
}

func (s *ToolSetService) buildAuthorizedToolSetItems(ctx context.Context, organizationID string) ([]authorizedToolSetItem, error) {
	allowedTools := getAllowedAIToolPermissions(ctx, organizationID)
	if len(allowedTools) == 0 {
		return nil, nil
	}

	var orgToolSets []model.ToolSet
	var orgToolSetsLoaded bool

	var items []authorizedToolSetItem
	for toolSetID, toolNames := range allowedTools {
		if toolSetID == "*" {
			if !orgToolSetsLoaded {
				var err error
				if orgToolSets, _, err = s.ListToolSets(ctx, organizationID, 1, 1000, "", "", false); err != nil {
					return nil, fmt.Errorf("failed to list toolsets: %w", err)
				}
				orgToolSetsLoaded = true
			}
			for _, toolSet := range orgToolSets {
				if toolSet.Status != model.ToolSetStatusEnabled {
					continue
				}
				instance, err := s.CreateToolSetInstance(&toolSet)
				if err != nil {
					return nil, fmt.Errorf("failed to create toolset instance: %w", err)
				}
				key := fmt.Sprintf("%s%d", toolSet.Type, toolSet.ID)
				items = append(items, authorizedToolSetItem{
					ResourceID:  toolSet.ResourceID,
					ToolSetType: string(toolSet.Type),
					MapKey:      key,
					ToolSet:     newFilteredToolSet(instance, toolNames),
				})
			}
		} else {
			toolSet, err := s.GetToolSet(ctx, organizationID, toolSetID)
			if err != nil {
				return nil, fmt.Errorf("failed to get toolset: %w", err)
			}
			instance, err := s.CreateToolSetInstance(toolSet)
			if err != nil {
				return nil, fmt.Errorf("failed to get toolset instance %s: %w", toolSetID, err)
			}
			key := fmt.Sprintf("%s%d", toolSet.Type, toolSet.ID)
			items = append(items, authorizedToolSetItem{
				ResourceID:  toolSet.ResourceID,
				ToolSetType: string(toolSet.Type),
				MapKey:      key,
				ToolSet:     newFilteredToolSet(instance, toolNames),
			})
		}
	}
	return items, nil
}

func (s *ToolSetService) GetAuthorizedToolSets(ctx context.Context, organizationID string) (toolset.ToolSets, error) {
	items, err := s.buildAuthorizedToolSetItems(ctx, organizationID)
	if err != nil {
		return nil, err
	}
	return toolSetsFromAuthorizedItems(items), nil
}

// SkillBindingMatches reports whether a tool in a toolset matches any skill binding pattern.
// toolSetType is the toolset implementation type (e.g. "utils"); bindings may use it in ToolSetID instead of resource_id.
func SkillBindingMatches(bindings []model.SkillAIToolBinding, toolSetResourceID, toolSetType, toolName string) bool {
	for _, b := range bindings {
		tsOK := b.ToolSetID == "*" || b.ToolSetID == toolSetResourceID
		if !tsOK && toolSetType != "" && b.ToolSetID == toolSetType {
			tsOK = true
		}
		tnOK := b.ToolName == "*" || b.ToolName == toolName
		if tsOK && tnOK {
			return true
		}
	}
	return false
}

func (s *ToolSetService) applySkillAIToolBindings(ctx context.Context, bindings []model.SkillAIToolBinding, items []authorizedToolSetItem) ([]authorizedToolSetItem, error) {
	if len(bindings) == 0 {
		return items, nil
	}
	var out []authorizedToolSetItem
	for _, it := range items {
		tools, err := it.ToolSet.ListTools(ctx)
		if err != nil {
			return nil, err
		}
		allowed := make(map[string]struct{})
		for _, tool := range tools {
			if tool.Function == nil {
				continue
			}
			name := tool.Function.Name
			if SkillBindingMatches(bindings, it.ResourceID, it.ToolSetType, name) {
				allowed[name] = struct{}{}
			}
		}
		if len(allowed) == 0 {
			continue
		}
		out = append(out, authorizedToolSetItem{
			ResourceID:  it.ResourceID,
			ToolSetType: it.ToolSetType,
			MapKey:      it.MapKey,
			ToolSet:     newFilteredToolSet(it.ToolSet, allowed),
		})
	}
	return out, nil
}

// SkillChatBindingMode selects how organization toolsets are exposed when skill–tool binding is enabled.
type SkillChatBindingMode uint8

const (
	// SkillChatBindingDisabled: binding feature off — full authorized toolsets.
	SkillChatBindingDisabled SkillChatBindingMode = iota
	// SkillChatBindingNoMetadata: binding on but this chat has no skill metadata — full authorized toolsets.
	SkillChatBindingNoMetadata
	// SkillChatBindingAwaitingActivation: binding on, skill metadata present, no get_skill_content yet — no org tools.
	SkillChatBindingAwaitingActivation
	// SkillChatBindingApply: apply skillBindings to filter tools (full toolsets if bindings list is empty).
	SkillChatBindingApply
)

// GetAuthorizedToolSetsForChat returns authorized toolsets for chat under the given binding mode.
func (s *ToolSetService) GetAuthorizedToolSetsForChat(ctx context.Context, organizationID string, skillBindings []model.SkillAIToolBinding, mode SkillChatBindingMode) (toolset.ToolSets, error) {
	items, err := s.buildAuthorizedToolSetItems(ctx, organizationID)
	if err != nil {
		return nil, err
	}
	switch mode {
	case SkillChatBindingAwaitingActivation:
		return toolset.ToolSets{}, nil
	case SkillChatBindingApply:
		if len(skillBindings) == 0 {
			return toolSetsFromAuthorizedItems(items), nil
		}
		items2, err := s.applySkillAIToolBindings(ctx, skillBindings, items)
		if err != nil {
			return nil, err
		}
		return toolSetsFromAuthorizedItems(items2), nil
	default:
		return toolSetsFromAuthorizedItems(items), nil
	}
}

func getAllowedAIToolPermissions(ctx context.Context, organizationID string) map[string]map[string]struct{} {
	result := make(map[string]map[string]struct{})
	if organizationID == "" {
		return result
	}

	roles, ok := ctx.Value("roles").([]model.Role)
	if !ok {
		return result
	}

	for _, role := range roles {
		if (role.OrganizationID == nil || *role.OrganizationID == "") && role.Name == "admin" {
			return map[string]map[string]struct{}{
				"*": {
					"*": {},
				},
			}
		}
		if role.OrganizationID != nil && *role.OrganizationID != "" && *role.OrganizationID != organizationID {
			continue
		}
		for _, perm := range role.AIToolPermissions {
			if perm.OrganizationID != organizationID {
				continue
			}
			if _, exists := result[perm.ToolSetID]; !exists {
				result[perm.ToolSetID] = make(map[string]struct{})
			}
			result[perm.ToolSetID][perm.ToolName] = struct{}{}
		}
	}

	return result
}

type toolSetDisabledToolsFilter struct {
	inner    toolset.ToolSet
	disabled map[string]struct{}
}

func newToolSetDisabledToolsFilter(inner toolset.ToolSet, disabled map[string]struct{}) toolset.ToolSet {
	if len(disabled) == 0 {
		return inner
	}
	return &toolSetDisabledToolsFilter{inner: inner, disabled: disabled}
}

func (t *toolSetDisabledToolsFilter) GetName() string            { return t.inner.GetName() }
func (t *toolSetDisabledToolsFilter) GetDescription() string     { return t.inner.GetDescription() }
func (t *toolSetDisabledToolsFilter) Validate() error            { return t.inner.Validate() }
func (t *toolSetDisabledToolsFilter) Test(ctx context.Context) error {
	return t.inner.Test(ctx)
}

func (t *toolSetDisabledToolsFilter) Call(ctx context.Context, name string, parameters string) (string, error) {
	if _, off := t.disabled[name]; off {
		return "", fmt.Errorf("tool %s is disabled", name)
	}
	return t.inner.Call(ctx, name, parameters)
}

func (t *toolSetDisabledToolsFilter) ListTools(ctx context.Context) ([]openai.Tool, error) {
	tools, err := t.inner.ListTools(ctx)
	if err != nil {
		return nil, err
	}
	if len(t.disabled) == 0 {
		return tools, nil
	}
	var out []openai.Tool
	for _, tool := range tools {
		if tool.Function == nil {
			continue
		}
		if _, off := t.disabled[tool.Function.Name]; off {
			continue
		}
		out = append(out, tool)
	}
	return out, nil
}
