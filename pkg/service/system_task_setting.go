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
	"strconv"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
)

// InitDefaultTaskSettings initializes default task settings
func (s *SettingService) InitDefaultTaskSettings(ctx context.Context) error {
	dbConn := db.Session(ctx)
	defaultSettings := map[model.SettingKey]struct {
		Value   string
		Comment string
	}{
		model.SettingTaskMaxConcurrent:         {"10", "Maximum number of tasks that can run concurrently"},
		model.SettingTaskLogStorageBackend:     {"database", "Log storage backend for task logs (e.g. database)"},
		model.SettingTaskAIChatRetentionDays:   {"90", "Retention days for AI chat sessions/messages"},
		model.SettingTaskLogRetentionDays:      {"30", "Retention days for task logs and task run records"},
		model.SettingTaskAuditLogRetentionDays: {"365", "Retention days for audit logs"},
	}
	for key, setting := range defaultSettings {
		var count int64
		dbConn.Model(&model.Setting{}).Where("key = ?", key).Count(&count)
		if count == 0 {
			if err := dbConn.Create(model.NewSetting(key, setting.Value, setting.Comment)).Error; err != nil {
				return err
			}
		}
	}
	return nil
}

// GetTaskSettings returns current task settings
func (s *SettingService) GetTaskSettings(ctx context.Context) (*model.TaskSettings, error) {
	maxConcurrent, err := s.GetIntSetting(ctx, model.SettingTaskMaxConcurrent, 10)
	if err != nil {
		return nil, err
	}
	logStorageBackend, _ := s.GetStringSetting(ctx, model.SettingTaskLogStorageBackend, "database")
	aiChatRetentionDays, _ := s.GetIntSetting(ctx, model.SettingTaskAIChatRetentionDays, 90)
	taskLogRetentionDays, _ := s.GetIntSetting(ctx, model.SettingTaskLogRetentionDays, 30)
	auditLogRetentionDays, _ := s.GetIntSetting(ctx, model.SettingTaskAuditLogRetentionDays, 365)
	return &model.TaskSettings{
		MaxConcurrent:         maxConcurrent,
		LogStorageBackend:     logStorageBackend,
		AIChatRetentionDays:   aiChatRetentionDays,
		LogRetentionDays:      taskLogRetentionDays,
		AuditLogRetentionDays: auditLogRetentionDays,
	}, nil
}

// UpdateTaskSettings updates task settings
func (s *SettingService) UpdateTaskSettings(ctx context.Context, settings *model.TaskSettings) error {
	settingsMap := map[string]string{
		string(model.SettingTaskMaxConcurrent):         strconv.Itoa(settings.MaxConcurrent),
		string(model.SettingTaskLogStorageBackend):     settings.LogStorageBackend,
		string(model.SettingTaskAIChatRetentionDays):   strconv.Itoa(settings.AIChatRetentionDays),
		string(model.SettingTaskLogRetentionDays):      strconv.Itoa(settings.LogRetentionDays),
		string(model.SettingTaskAuditLogRetentionDays): strconv.Itoa(settings.AuditLogRetentionDays),
	}
	return s.UpdateSettings(ctx, settingsMap)
}
