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
	"errors"
	"strconv"
	"time"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util/cache"
	w "github.com/sven-victor/ez-utils/wrapper"
	"gorm.io/gorm"
)

// SettingService system settings service
type SettingService struct{}

// NewSettingService creates a new system settings service
func NewSettingService() *SettingService {
	svc := &SettingService{}
	middleware.RegisterSettingService(svc)
	return svc
}

// GetSetting gets the setting with the specified key name
func (s *SettingService) GetSetting(ctx context.Context, key model.SettingKey) (*model.Setting, error) {
	allSettings, err := cache.Get[[]model.Setting]("all_settings")
	if err == nil && allSettings != nil && len(*allSettings) > 0 {
		for _, setting := range *allSettings {
			if setting.Key == key {
				return &setting, nil
			}
		}
	}
	return cache.Handle("setting_"+string(key), func() (*model.Setting, error) {
		var setting model.Setting
		if err := db.Session(ctx).Where("key = ?", key).First(&setting).Error; err != nil {
			return nil, err
		}
		return &setting, nil
	}, time.Minute)
}

// GetSettingByStringKey gets the setting by string key name
func (s *SettingService) GetSettingByStringKey(ctx context.Context, key string) (*model.Setting, error) {
	return s.GetSetting(ctx, model.SettingKey(key))
}

// GetAllSettings gets all system settings
func (s *SettingService) GetAllSettings(ctx context.Context) ([]model.Setting, error) {
	result, err := cache.Handle("all_settings", func() (*[]model.Setting, error) {
		var settings []model.Setting
		if err := db.Session(ctx).Where("key IN ?", model.SettingKeys).Find(&settings).Error; err != nil {
			return nil, err
		}
		return &settings, nil
	}, time.Minute*10)
	if err != nil || result == nil {
		return nil, err
	}
	return *result, nil
}

// GetSettingsMap gets all system settings and returns them as a map
func (s *SettingService) GetSettingsMap(ctx context.Context) (map[string]string, error) {
	settings, err := s.GetAllSettings(ctx)
	if err != nil {
		return nil, err
	}

	result := make(map[string]string, len(settings))
	for _, setting := range settings {
		result[string(setting.Key)] = setting.Value
	}
	return result, nil
}

// UpdateSetting updates a setting item
func (s *SettingService) UpdateSetting(ctx context.Context, key model.SettingKey, value, comment string) (*model.Setting, error) {
	var setting model.Setting
	if err := db.Session(ctx).Where("key = ?", key).First(&setting).Error; err != nil {
		// Create new setting
		setting = *model.NewSetting(key, value, comment)
		if err := db.Session(ctx).Create(&setting).Error; err != nil {
			return nil, err
		}
		cache.Delete("all_settings")
		return &setting, nil
	}

	// Update setting
	setting.Value = value
	if comment != "" {
		setting.Comment = comment
	}
	if err := db.Session(ctx).Save(&setting).Error; err != nil {
		return nil, err
	}
	cache.Delete("all_settings")
	cache.Set("setting_"+string(key), setting, time.Minute*10)
	return &setting, nil
}

// UpdateSettings batch updates settings
func (s *SettingService) UpdateSettings(ctx context.Context, settings map[string]string) error {
	// Use transaction to ensure atomicity
	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		for key, value := range settings {
			var setting model.Setting
			if err := tx.Where("key = ?", key).First(&setting).Error; err != nil {
				// Create new setting
				setting = *model.NewSetting(model.SettingKey(key), value, "")
				if err := tx.Create(&setting).Error; err != nil {
					return err
				}
			} else {
				// Update setting
				setting.Value = value
				if err := tx.Select("value").Save(&setting).Error; err != nil {
					return err
				}
			}
			cache.Set("setting_"+string(key), setting, time.Minute*10)
		}
		cache.Delete("all_settings")
		return nil
	})
}

// GetIntSetting gets the integer value of a setting
func (s *SettingService) GetIntSetting(ctx context.Context, key model.SettingKey, defaultValue int) (int, error) {
	setting, err := s.GetSetting(ctx, key)
	if err != nil {
		return defaultValue, nil
	}

	value, err := strconv.Atoi(setting.Value)
	if err != nil {
		return defaultValue, errors.New("invalid integer setting value")
	}
	return value, nil
}

// GetBoolSetting gets the boolean value of a setting
func (s *SettingService) GetBoolSetting(ctx context.Context, key model.SettingKey, defaultValue bool) (bool, error) {
	setting, err := s.GetSetting(ctx, key)
	if err != nil {
		return defaultValue, nil
	}

	if setting.Value == "1" || setting.Value == "true" {
		return true, nil
	} else if setting.Value == "0" || setting.Value == "false" {
		return false, nil
	}
	return defaultValue, errors.New("invalid boolean setting value")
}

// GetStringSetting gets the string value of a setting
func (s *SettingService) GetStringSetting(ctx context.Context, key model.SettingKey, defaultValue string) (string, error) {
	setting, err := s.GetSetting(ctx, key)
	if err != nil {
		return defaultValue, nil
	}
	return setting.Value, nil
}

type DefaultSetting struct {
	Key     model.SettingKey
	Value   string
	Comment string
}

var defaultSettings = []DefaultSetting{
	{
		Key:     model.SettingSystemName,
		Value:   "EZ-Console",
		Comment: "System name",
	},
	{
		Key:     model.SettingSystemLogo,
		Value:   "/logo.png",
		Comment: "System Logo URL",
	},
	{
		Key:     model.SettingLDAPAllowManageUserPassword,
		Value:   "true",
		Comment: "Allow manage user password",
	},
	{
		Key:     model.SettingSystemDisableLocalUserLogin,
		Value:   "false",
		Comment: "Disable local user login (It will only take effect after configuring other authentication methods (such as OAuth2, LDAP)).",
	},
	{
		Key:     model.SettingSystemEnableMultiOrg,
		Value:   "false",
		Comment: "Enable multi-organization feature",
	},
}

func RegisterDefaultSettings(ctx context.Context, key model.SettingKey, value, comment string) error {
	for i, setting := range defaultSettings {
		if setting.Key == key {
			defaultSettings[i] = DefaultSetting{
				Key:     key,
				Value:   value,
				Comment: comment,
			}
			return nil
		}
	}
	defaultSettings = append(defaultSettings, DefaultSetting{
		Key:     key,
		Value:   value,
		Comment: comment,
	})
	return nil
}

// InitDefaultSettings initializes default settings
func (s *SettingService) InitDefaultSettings(ctx context.Context) error {
	// Check if each setting already exists, if not, create it
	for _, setting := range defaultSettings {
		var count int64
		db.Session(ctx).Model(&model.Setting{}).Where("key = ?", setting.Key).Count(&count)
		if count == 0 {
			if err := db.Session(ctx).Create(model.NewSetting(setting.Key, setting.Value, setting.Comment)).Error; err != nil {
				return err
			}
		}
	}

	return nil
}

// DeleteSetting deletes a setting
func (s *SettingService) DeleteSetting(ctx context.Context, key model.SettingKey) error {
	defer func() {
		cache.Delete("all_settings")
		cache.Delete("setting_" + string(key))
	}()
	return db.Session(ctx).Where("key = ?", key).Delete(&model.Setting{}).Error
}

func (s *SettingService) GetSystemSettings(ctx context.Context) (*model.SystemSettings, error) {
	settings, err := s.GetSettingsMap(ctx)
	if err != nil {
		return nil, err
	}

	disableLocalUserLogin, _ := strconv.ParseBool(settings[string(model.SettingSystemDisableLocalUserLogin)])
	enableMultiOrg, _ := strconv.ParseBool(settings[string(model.SettingSystemEnableMultiOrg)])
	baseSettings := &model.SystemSettings{
		Name:     settings[string(model.SettingSystemName)],
		NameI18n: map[string]string{},
		Logo:     settings[string(model.SettingSystemLogo)],
		HomePage: settings[string(model.SettingSystemHomePage)],

		DisableLocalUserLogin: disableLocalUserLogin,
		EnableMultiOrg:        enableMultiOrg,
	}
	if err := json.Unmarshal([]byte(settings[string(model.SettingSystemNameI18n)]), &baseSettings.NameI18n); err != nil {
		baseSettings.NameI18n = map[string]string{}
	}

	return baseSettings, nil
}

func (s *SettingService) UpdateSystemSettings(ctx context.Context, settings model.SystemSettings) error {
	settingsMap := map[string]string{
		string(model.SettingSystemName):     settings.Name,
		string(model.SettingSystemNameI18n): w.JSONStringer(settings.NameI18n).String(),
		string(model.SettingSystemLogo):     settings.Logo,
		string(model.SettingSystemHomePage): settings.HomePage,

		string(model.SettingSystemDisableLocalUserLogin): strconv.FormatBool(settings.DisableLocalUserLogin),
		string(model.SettingSystemEnableMultiOrg):        strconv.FormatBool(settings.EnableMultiOrg),
	}
	return s.UpdateSettings(ctx, settingsMap)
}

// IsDisableLocalUserLogin checks if local user login is disabled
// If local user login is disabled, it will check LDAP and OAuth2 settings to determine if local user login is allowed
// If LDAP and OAuth2 are not enabled, it will return true
func (s *SettingService) IsDisableLocalUserLogin(ctx context.Context) (bool, error) {
	disableLocalUserLogin, err := s.GetBoolSetting(ctx, model.SettingSystemDisableLocalUserLogin, false)
	if err != nil {
		return false, err
	}
	if disableLocalUserLogin {
		ldapEnabled, err := s.GetBoolSetting(ctx, model.SettingLDAPEnabled, false)
		if err != nil {
			return false, err
		}
		if ldapEnabled {
			return true, nil
		}
		oauthEnabled, err := s.GetBoolSetting(ctx, model.SettingOAuthEnabled, false)
		if err != nil {
			return false, err
		}
		if oauthEnabled {
			return true, nil
		}
	}
	return false, nil
}
