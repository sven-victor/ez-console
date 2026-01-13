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
	"bytes"
	"context"
	"encoding/json"
	"strings"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
)

// GetOAuthSettings gets OAuth settings
func (s *SettingService) GetOAuthSettings(ctx context.Context) (*model.OAuthSettings, error) {
	// Get settings from database
	settings, err := s.GetSettingsMap(ctx)
	if err != nil {
		return nil, err
	}
	// Set default values
	result := &model.OAuthSettings{
		Enabled:          false,
		Provider:         model.OAuthProviderGitHub,
		ClientID:         "",
		ClientSecret:     nil,
		AuthEndpoint:     "",
		TokenEndpoint:    "",
		UserInfoEndpoint: "",
		Scope:            "openid profile email",
		RedirectURI:      "",
		AutoCreateUser:   false,
		DefaultRole:      "user",
		DisplayName:      "",
		IconURL:          "",
		EmailField:       "",
		UsernameField:    "",
		FullNameField:    "",
		AvatarField:      "",
		RoleField:        "",
		MFAEnabled:       false,

		WellknownEndpoint: "",
	}
	var oauthSettingMap = map[string]any{}
	for _, key := range model.OAuthSettingKeys {
		if val, ok := settings[string(key)]; ok {
			name := strings.TrimPrefix(string(key), "oauth_")
			oauthSettingMap[name] = val
			switch name {
			case "enabled":
				oauthSettingMap["enabled"] = val == "1" || val == "true"
			case "auto_create_user":
				oauthSettingMap["auto_create_user"] = val == "1" || val == "true"
			case "mfa_enabled":
				oauthSettingMap["mfa_enabled"] = val == "1" || val == "true"
			default:
				oauthSettingMap[name] = val
			}
		}
	}
	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(oauthSettingMap); err != nil {
		return nil, err
	}
	if err := json.Unmarshal(buf.Bytes(), result); err != nil {
		return nil, err
	}
	return result, nil
}

// UpdateOAuthSettings updates OAuth settings
func (s *SettingService) UpdateOAuthSettings(ctx context.Context, settings *model.OAuthSettings) error {
	// Prepare settings to be updated
	settingsMap := map[string]string{
		string(model.SettingOAuthEnabled):          boolToString(settings.Enabled),
		string(model.SettingOAuthProvider):         string(settings.Provider),
		string(model.SettingOAuthClientID):         settings.ClientID,
		string(model.SettingOAuthAuthEndpoint):     settings.AuthEndpoint,
		string(model.SettingOAuthTokenEndpoint):    settings.TokenEndpoint,
		string(model.SettingOAuthUserInfoEndpoint): settings.UserInfoEndpoint,
		string(model.SettingOAuthScope):            settings.Scope,
		string(model.SettingOAuthRedirectURI):      settings.RedirectURI,
		string(model.SettingOAuthAutoCreateUser):   boolToString(settings.AutoCreateUser),
		string(model.SettingOAuthDefaultRole):      settings.DefaultRole,
		string(model.SettingOAuthEmailField):       settings.EmailField,
		string(model.SettingOAuthUsernameField):    settings.UsernameField,
		string(model.SettingOAuthFullNameField):    settings.FullNameField,
		string(model.SettingOAuthAvatarField):      settings.AvatarField,
		string(model.SettingOAuthRoleField):        settings.RoleField,
		string(model.SettingOAuthDisplayName):      settings.DisplayName,
		string(model.SettingOAuthIconURL):          settings.IconURL,
		string(model.SettingOAuthMFAEnabled):       boolToString(settings.MFAEnabled),

		string(model.SettingOAuthWellknownEndpoint): settings.WellknownEndpoint,
	}
	if settings.ClientSecret != nil {
		settingsMap[string(model.SettingOAuthClientSecret)] = settings.ClientSecret.String()
	}

	// Batch update settings
	return s.UpdateSettings(ctx, settingsMap)
}

// InitDefaultOAuthSettings initializes default OAuth settings
func (s *SettingService) InitDefaultOAuthSettings(ctx context.Context) error {
	// Default setting items
	defaultSettings := map[model.SettingKey]struct {
		Value   string
		Comment string
	}{
		model.SettingOAuthEnabled:          {"false", "Whether to enable OAuth authentication"},
		model.SettingOAuthProvider:         {"github", "OAuth provider type"},
		model.SettingOAuthClientID:         {"", "OAuth client ID"},
		model.SettingOAuthClientSecret:     {"", "OAuth client secret"},
		model.SettingOAuthAuthEndpoint:     {"", "OAuth authentication endpoint"},
		model.SettingOAuthTokenEndpoint:    {"", "OAuth token endpoint"},
		model.SettingOAuthUserInfoEndpoint: {"", "OAuth user information endpoint"},
		model.SettingOAuthScope:            {"openid profile email", "OAuth authorization scope"},
		model.SettingOAuthRedirectURI:      {"", "OAuth redirect URI"},
		model.SettingOAuthAutoCreateUser:   {"false", "Whether to automatically create users"},
		model.SettingOAuthDefaultRole:      {"user", "OAuth user default role"},
		model.SettingOAuthMFAEnabled:       {"false", "Whether to enable MFA for OAuth authentication"},
		model.SettingOAuthRoleMappingMode:  {"auto", "OAuth role mapping mode (disabled/auto/enforce)"},
	}
	// Check if each setting already exists, if not, create it
	for key, setting := range defaultSettings {
		var count int64
		db.Session(ctx).Model(&model.Setting{}).Where("key = ?", key).Count(&count)
		if count == 0 {
			if err := db.Session(ctx).Create(model.NewSetting(key, setting.Value, setting.Comment)).Error; err != nil {
				return err
			}
		}
	}

	return nil
}
