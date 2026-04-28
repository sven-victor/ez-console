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
	"fmt"
	"strconv"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
)

// InitDefaultTaskSettings initializes default task settings
func (s *SettingService) InitDefaultTaskSettings(ctx context.Context) error {
	dbConn := db.Session(ctx)

	// Fixed non-extensible setting.
	fixedDefaults := map[model.SettingKey]struct {
		Value   string
		Comment string
	}{
		model.SettingTaskLogStorageBackend: {"database", "Log storage backend for task logs (e.g. database)"},
	}
	for key, setting := range fixedDefaults {
		var count int64
		dbConn.Model(&model.Setting{}).Where("key = ?", key).Count(&count)
		if count == 0 {
			if err := dbConn.Create(model.NewSetting(key, setting.Value, setting.Comment)).Error; err != nil {
				return err
			}
		}
	}

	// Extensible registered settings.
	for _, field := range model.GetRegisteredTaskSettingFields() {
		key := model.SettingKey(field.Key)
		var count int64
		dbConn.Model(&model.Setting{}).Where("key = ?", key).Count(&count)
		if count == 0 {
			if err := dbConn.Create(model.NewSetting(key, field.DefaultValue, "Task setting: "+field.Key)).Error; err != nil {
				return err
			}
		}
	}
	return nil
}

// GetTaskSettings returns current task settings as a flat map.
// The map always contains "log_storage_backend" plus all registered extensible fields
// (with their full task_-prefixed keys).
func (s *SettingService) GetTaskSettings(ctx context.Context) (map[string]any, error) {
	settingsMap, err := s.GetSettingsMap(ctx)
	if err != nil {
		return nil, err
	}

	result := make(map[string]any)

	// Fixed non-extensible setting.
	if val, ok := settingsMap[string(model.SettingTaskLogStorageBackend)]; ok {
		result["log_storage_backend"] = val
	} else {
		result["log_storage_backend"] = "database"
	}

	// Extensible registered settings — coerce to their declared value type.
	for _, field := range model.GetRegisteredTaskSettingFields() {
		raw, ok := settingsMap[field.Key]
		if !ok {
			raw = field.DefaultValue
		}
		switch field.ValueType {
		case "int":
			v, err := strconv.Atoi(raw)
			if err != nil {
				v, _ = strconv.Atoi(field.DefaultValue)
			}
			result[field.Key] = v
		case "bool":
			result[field.Key] = raw == "true" || raw == "1"
		default:
			result[field.Key] = raw
		}
	}

	return result, nil
}

// UpdateTaskSettings validates and persists the flat task settings map.
func (s *SettingService) UpdateTaskSettings(ctx context.Context, settings map[string]any) error {
	toSave := make(map[string]string)

	// Fixed non-extensible setting.
	if v, ok := settings["log_storage_backend"]; ok {
		toSave[string(model.SettingTaskLogStorageBackend)] = fmt.Sprintf("%v", v)
	}

	// Extensible registered settings — validate type then persist.
	registry := model.GetRegisteredTaskSettingFields()
	registryIndex := make(map[string]model.TaskSettingField, len(registry))
	for _, f := range registry {
		registryIndex[f.Key] = f
	}

	for k, v := range settings {
		field, ok := registryIndex[k]
		if !ok {
			continue
		}
		raw := fmt.Sprintf("%v", v)
		switch field.ValueType {
		case "int":
			if _, err := strconv.Atoi(raw); err != nil {
				return fmt.Errorf("field %s expects an integer value, got %q", k, raw)
			}
		case "bool":
			if raw != "true" && raw != "false" && raw != "1" && raw != "0" {
				return fmt.Errorf("field %s expects a boolean value, got %q", k, raw)
			}
		}
		toSave[k] = raw
	}

	return s.UpdateSettings(ctx, toSave)
}
