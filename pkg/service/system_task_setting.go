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
		model.SettingTaskMaxConcurrent: {"10", "Maximum number of tasks that can run concurrently"},
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
	return &model.TaskSettings{MaxConcurrent: maxConcurrent}, nil
}

// UpdateTaskSettings updates task settings
func (s *SettingService) UpdateTaskSettings(ctx context.Context, settings *model.TaskSettings) error {
	settingsMap := map[string]string{
		string(model.SettingTaskMaxConcurrent): strconv.Itoa(settings.MaxConcurrent),
	}
	return s.UpdateSettings(ctx, settingsMap)
}
