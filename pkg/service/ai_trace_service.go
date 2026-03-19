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

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/log"
)

// AITraceService handles AI debug tracing functionality
type AITraceService struct {
	settingService *SettingService
}

// NewAITraceService creates a new AI trace service
func NewAITraceService(settingService *SettingService) *AITraceService {
	return &AITraceService{settingService: settingService}
}

// IsTraceEnabled checks if AI debug tracing is globally enabled
func (s *AITraceService) IsTraceEnabled(ctx context.Context) bool {
	enabled, err := s.settingService.GetBoolSetting(ctx, model.SettingAIDebugEnabled, false)
	if err != nil {
		return false
	}
	return enabled
}

// SetTraceEnabled toggles the AI debug tracing setting.
// When disabled, all stored trace events are deleted.
func (s *AITraceService) SetTraceEnabled(ctx context.Context, enabled bool) error {
	val := "false"
	if enabled {
		val = "true"
	}
	_, err := s.settingService.UpdateSetting(ctx, model.SettingAIDebugEnabled, val, "Whether to enable AI debug tracing")
	if err != nil {
		return err
	}

	if !enabled {
		if err := s.DeleteAllTraceEvents(ctx); err != nil {
			logger := log.GetContextLogger(ctx)
			level.Error(logger).Log("msg", "Failed to delete trace events on disable", "error", err)
			return err
		}
	}
	return nil
}

// WriteTraceEvent persists a single trace event to the database.
func (s *AITraceService) WriteTraceEvent(ctx context.Context, event model.AITraceEvent) {
	if err := db.Session(ctx).Create(&event).Error; err != nil {
		logger := log.GetContextLogger(ctx)
		level.Error(logger).Log("msg", "Failed to write AI trace event", "error", err, "trace_id", event.TraceID)
	}
}

// GetTraceEvents returns all events for a given trace ID, ordered by step.
func (s *AITraceService) GetTraceEvents(ctx context.Context, traceID string) ([]model.AITraceEvent, error) {
	var events []model.AITraceEvent
	if err := db.Session(ctx).
		Where("trace_id = ?", traceID).
		Order("step_order ASC").
		Find(&events).Error; err != nil {
		return nil, err
	}
	return events, nil
}

// DownloadTraceEvents exports all events for a given trace ID as JSON bytes.
func (s *AITraceService) DownloadTraceEvents(ctx context.Context, traceID string) ([]byte, error) {
	events, err := s.GetTraceEvents(ctx, traceID)
	if err != nil {
		return nil, err
	}
	return json.MarshalIndent(events, "", "  ")
}

// DeleteAllTraceEvents removes all trace events from the database.
func (s *AITraceService) DeleteAllTraceEvents(ctx context.Context) error {
	return db.Session(ctx).Where("1 = 1").Delete(&model.AITraceEvent{}).Error
}

// NewTraceEventWriter returns a TraceEventWriter callback bound to this service.
func (s *AITraceService) NewTraceEventWriter() ai.TraceEventWriter {
	return func(ctx context.Context, event model.AITraceEvent) {
		s.WriteTraceEvent(ctx, event)
	}
}
