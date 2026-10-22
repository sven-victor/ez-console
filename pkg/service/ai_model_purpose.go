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
	"errors"
	"fmt"
	"sort"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
)

// AIModelPurposeView is one registered purpose and the organization binding that serves it.
type AIModelPurposeView struct {
	Key              string `json:"key"`
	Name             string `json:"name"`
	Description      string `json:"description"`
	Fallback         bool   `json:"fallback"`
	ModelID          string `json:"model_id"`
	ModelName        string `json:"model_name"`
	ModelStatus      string `json:"model_status"`
	EffectiveModelID string `json:"effective_model_id"`
	UsingFallback    bool   `json:"using_fallback"`
}

var (
	// ErrUnknownAIPurpose is returned when the purpose key is not registered.
	ErrUnknownAIPurpose = errors.New("unknown AI model purpose")
	// ErrAIPurposeModelNotFound is returned when the assigned model does not exist in the organization.
	ErrAIPurposeModelNotFound = errors.New("AI model not found")
	// ErrAIPurposeModelDisabled is returned when a purpose is assigned to a disabled model.
	ErrAIPurposeModelDisabled = errors.New("AI model must be enabled")
)

// ListAIModelPurposes returns every registered purpose with the current organization binding.
func (s *aiModelService) ListAIModelPurposes(ctx context.Context, organizationID string) ([]AIModelPurposeView, error) {
	return s.listAIModelPurposeViews(ctx, organizationID)
}

// SetAIModelPurpose binds a purpose to a model. An empty modelID clears the binding.
func (s *aiModelService) SetAIModelPurpose(ctx context.Context, organizationID, purpose, modelID string) (*AIModelPurposeView, error) {
	if _, ok := model.LookupAIPurpose(model.AIPurpose(purpose)); !ok {
		return nil, fmt.Errorf("%w: %s", ErrUnknownAIPurpose, purpose)
	}
	if modelID == "" {
		if err := db.Session(ctx).Unscoped().
			Where("organization_id = ? AND purpose = ?", organizationID, purpose).
			Delete(&model.AIModelPurposeBinding{}).Error; err != nil {
			return nil, fmt.Errorf("failed to clear AI model purpose: %w", err)
		}
		return s.purposeView(ctx, organizationID, purpose)
	}

	aiModel, err := s.GetAIModel(ctx, organizationID, modelID)
	if err != nil {
		return nil, ErrAIPurposeModelNotFound
	}
	if aiModel.Status != model.AIModelStatusEnabled {
		return nil, ErrAIPurposeModelDisabled
	}

	err = db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Unscoped().
			Where("organization_id = ? AND purpose = ?", organizationID, purpose).
			Delete(&model.AIModelPurposeBinding{}).Error; err != nil {
			return err
		}
		row := &model.AIModelPurposeBinding{
			OrganizationID: organizationID,
			Purpose:        purpose,
			ModelID:        modelID,
		}
		if err := tx.Create(row).Error; err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, fmt.Errorf("failed to set AI model purpose: %w", err)
	}
	return s.purposeView(ctx, organizationID, purpose)
}

// ResolveAIModel returns the enabled model bound to purpose, or the organization default when the purpose allows fallback.
func (s *aiModelService) ResolveAIModel(ctx context.Context, organizationID string, purpose model.AIPurpose) (*model.AIModel, error) {
	def, ok := model.LookupAIPurpose(purpose)
	if !ok {
		return nil, fmt.Errorf("%w: %s", ErrUnknownAIPurpose, purpose)
	}
	if bound := s.enabledPurposeModel(ctx, organizationID, string(purpose)); bound != nil {
		return bound, nil
	}
	if def.Fallback {
		return s.GetDefaultAIModel(ctx, organizationID)
	}
	return nil, fmt.Errorf("no AI model configured for purpose %s", purpose)
}

// ResolveSummaryAIModel returns a separate summarization model when one is bound.
// No binding keeps the conversation model. A disabled binding falls back to the organization default.
func (s *aiModelService) ResolveSummaryAIModel(ctx context.Context, organizationID, conversationModelID string) (*model.AIModel, error) {
	def, ok := model.LookupAIPurpose(model.AIPurposeSummary)
	if !ok {
		return nil, nil
	}
	var binding model.AIModelPurposeBinding
	err := db.Session(ctx).
		Where("organization_id = ? AND purpose = ?", organizationID, string(model.AIPurposeSummary)).
		First(&binding).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get summary model binding: %w", err)
	}

	bound, err := s.GetAIModel(ctx, organizationID, binding.ModelID)
	if err == nil && bound.Status == model.AIModelStatusEnabled {
		if bound.ResourceID == conversationModelID {
			return nil, nil
		}
		return bound, nil
	}
	if !def.Fallback {
		return nil, nil
	}
	fallback, err := s.GetDefaultAIModel(ctx, organizationID)
	if err != nil || fallback.ResourceID == conversationModelID {
		return nil, nil
	}
	return fallback, nil
}

func (s *aiModelService) enabledPurposeModel(ctx context.Context, organizationID, purpose string) *model.AIModel {
	var binding model.AIModelPurposeBinding
	err := db.Session(ctx).
		Where("organization_id = ? AND purpose = ?", organizationID, purpose).
		First(&binding).Error
	if err != nil {
		return nil
	}
	bound, err := s.GetAIModel(ctx, organizationID, binding.ModelID)
	if err != nil || bound.Status != model.AIModelStatusEnabled {
		return nil
	}
	return bound
}

func (s *aiModelService) purposeView(ctx context.Context, organizationID, purpose string) (*AIModelPurposeView, error) {
	views, err := s.listAIModelPurposeViews(ctx, organizationID)
	if err != nil {
		return nil, err
	}
	for i := range views {
		if views[i].Key == purpose {
			return &views[i], nil
		}
	}
	return nil, fmt.Errorf("%w: %s", ErrUnknownAIPurpose, purpose)
}

func (s *aiModelService) listAIModelPurposeViews(ctx context.Context, organizationID string) ([]AIModelPurposeView, error) {
	defs := model.ListAIPurposes()
	var bindings []model.AIModelPurposeBinding
	if err := db.Session(ctx).Where("organization_id = ?", organizationID).Find(&bindings).Error; err != nil {
		return nil, fmt.Errorf("failed to list AI model purpose bindings: %w", err)
	}
	byPurpose := make(map[string]model.AIModelPurposeBinding, len(bindings))
	modelIDs := make([]string, 0, len(bindings))
	for _, row := range bindings {
		byPurpose[row.Purpose] = row
		modelIDs = append(modelIDs, row.ModelID)
	}

	modelsByID := map[string]*model.AIModel{}
	if len(modelIDs) > 0 {
		var models []model.AIModel
		if err := db.Session(ctx).
			Where("organization_id = ? AND resource_id IN ?", organizationID, modelIDs).
			Find(&models).Error; err != nil {
			return nil, fmt.Errorf("failed to load AI models for purposes: %w", err)
		}
		for i := range models {
			modelsByID[models[i].ResourceID] = &models[i]
		}
	}

	var defaultModel *model.AIModel
	var fallback model.AIModel
	err := db.Session(ctx).Where("organization_id = ? AND is_default = ? AND status = ?",
		organizationID, true, model.AIModelStatusEnabled).First(&fallback).Error
	if err == nil {
		defaultModel = &fallback
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("failed to get default AI model: %w", err)
	}

	views := make([]AIModelPurposeView, 0, len(defs))
	for _, def := range defs {
		view := AIModelPurposeView{
			Key:         def.Key,
			Name:        def.Name,
			Description: def.Description,
			Fallback:    def.Fallback,
		}
		if row, ok := byPurpose[def.Key]; ok {
			view.ModelID = row.ModelID
			if bound := modelsByID[row.ModelID]; bound != nil {
				view.ModelName = bound.Name
				view.ModelStatus = string(bound.Status)
				if bound.Status == model.AIModelStatusEnabled {
					view.EffectiveModelID = bound.ResourceID
				}
			}
		}
		if view.EffectiveModelID == "" && def.Fallback && defaultModel != nil {
			view.EffectiveModelID = defaultModel.ResourceID
			view.UsingFallback = true
		} else if view.EffectiveModelID == "" {
			view.UsingFallback = true
		}
		views = append(views, view)
	}
	return views, nil
}

func (s *aiModelService) attachPurposes(ctx context.Context, organizationID string, models []model.AIModel) error {
	grouped, err := s.purposeKeysByModel(ctx, organizationID)
	if err != nil {
		return err
	}
	for i := range models {
		keys := grouped[models[i].ResourceID]
		if keys == nil {
			keys = []string{}
		}
		models[i].Purposes = keys
	}
	return nil
}

func (s *aiModelService) purposeKeysByModel(ctx context.Context, organizationID string) (map[string][]string, error) {
	var rows []model.AIModelPurposeBinding
	if err := db.Session(ctx).Where("organization_id = ?", organizationID).Find(&rows).Error; err != nil {
		return nil, fmt.Errorf("failed to list AI model purpose bindings: %w", err)
	}
	order := map[string]int{}
	for i, def := range model.ListAIPurposes() {
		order[def.Key] = i
	}
	grouped := map[string][]string{}
	for _, row := range rows {
		grouped[row.ModelID] = append(grouped[row.ModelID], row.Purpose)
	}
	for id, keys := range grouped {
		sort.SliceStable(keys, func(i, j int) bool {
			oi, okI := order[keys[i]]
			oj, okJ := order[keys[j]]
			if okI && okJ {
				return oi < oj
			}
			if okI != okJ {
				return okI
			}
			return keys[i] < keys[j]
		})
		grouped[id] = keys
	}
	return grouped, nil
}

func (s *aiModelService) modelHasPurposeBinding(ctx context.Context, organizationID, modelID string) (bool, error) {
	var count int64
	if err := db.Session(ctx).Model(&model.AIModelPurposeBinding{}).
		Where("organization_id = ? AND model_id = ?", organizationID, modelID).
		Count(&count).Error; err != nil {
		return false, fmt.Errorf("failed to count AI model purpose bindings: %w", err)
	}
	return count > 0, nil
}
