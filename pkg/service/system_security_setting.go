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
	"crypto/sha256"
	"errors"
	"fmt"
	"strconv"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/util/jwt"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
)

// GetSecuritySettings gets all security settings
func (s *settingService) GetSecuritySettings(ctx context.Context) (*model.SecuritySettings, error) {
	// Get settings from database
	settings, err := s.GetSettingsMap(ctx)
	if err != nil {
		return nil, err
	}

	// Set default values
	result := &model.SecuritySettings{
		MFAEnforced:               false,
		PasswordComplexity:        model.PasswordComplexityMedium,
		PasswordMinLength:         8,
		PasswordExpiryDays:        90,
		PasswordExpiryNotifyDays:  7,
		LoginFailureLock:          true,
		LoginFailureAttempts:      5,
		HistoryPasswordCheck:      true,
		HistoryPasswordCount:      3,
		UserInactiveDays:          90,
		SessionTimeoutMinutes:     10080,
		SessionIdleTimeoutMinutes: 1440,
	}

	// Read values from settings
	if val, ok := settings[string(model.SettingMFAEnforced)]; ok {
		result.MFAEnforced = val == "1" || val == "true"
	}

	if val, ok := settings[string(model.SettingPasswordComplexity)]; ok {
		result.PasswordComplexity = model.PasswordComplexity(val)
	}

	if val, ok := settings[string(model.SettingPasswordMinLength)]; ok {
		if intVal, err := strconv.Atoi(val); err == nil {
			result.PasswordMinLength = intVal
		}
	}

	if val, ok := settings[string(model.SettingPasswordExpiryDays)]; ok {
		if intVal, err := strconv.Atoi(val); err == nil {
			result.PasswordExpiryDays = intVal
		}
	}
	if val, ok := settings[string(model.SettingPasswordExpiryNotifyDays)]; ok {
		if intVal, err := strconv.Atoi(val); err == nil {
			result.PasswordExpiryNotifyDays = intVal
		}
	}

	if val, ok := settings[string(model.SettingLoginFailureLock)]; ok {
		result.LoginFailureLock = val == "1" || val == "true"
	}

	if val, ok := settings[string(model.SettingLoginFailureAttempts)]; ok {
		if intVal, err := strconv.Atoi(val); err == nil {
			result.LoginFailureAttempts = intVal
		}
	}

	if val, ok := settings[string(model.SettingLoginFailureLockoutMinutes)]; ok {
		if intVal, err := strconv.Atoi(val); err == nil {
			result.LoginFailureLockoutMinutes = intVal
		}
	}

	if val, ok := settings[string(model.SettingHistoryPasswordCheck)]; ok {
		result.HistoryPasswordCheck = val == "1" || val == "true"
	}

	if val, ok := settings[string(model.SettingHistoryPasswordCount)]; ok {
		if intVal, err := strconv.Atoi(val); err == nil {
			result.HistoryPasswordCount = intVal
		}
	}

	if val, ok := settings[string(model.SettingUserInactiveDays)]; ok {
		if intVal, err := strconv.Atoi(val); err == nil {
			result.UserInactiveDays = intVal
		}
	}

	if val, ok := settings[string(model.SettingSessionTimeoutMinutes)]; ok {
		if intVal, err := strconv.Atoi(val); err == nil {
			result.SessionTimeoutMinutes = intVal
		}
	}

	if val, ok := settings[string(model.SettingSessionIdleTimeoutMinutes)]; ok {
		if intVal, err := strconv.Atoi(val); err == nil {
			result.SessionIdleTimeoutMinutes = intVal
		}
	}

	return result, nil
}

// UpdateSecuritySettings updates security settings
func (s *settingService) UpdateSecuritySettings(ctx context.Context, settings *model.SecuritySettings) error {
	// Prepare settings to be updated
	settingsMap := map[string]string{
		string(model.SettingMFAEnforced):               boolToString(settings.MFAEnforced),
		string(model.SettingPasswordComplexity):        string(settings.PasswordComplexity),
		string(model.SettingPasswordMinLength):         strconv.Itoa(settings.PasswordMinLength),
		string(model.SettingPasswordExpiryDays):        strconv.Itoa(settings.PasswordExpiryDays),
		string(model.SettingPasswordExpiryNotifyDays):  strconv.Itoa(settings.PasswordExpiryNotifyDays),
		string(model.SettingLoginFailureLock):          boolToString(settings.LoginFailureLock),
		string(model.SettingLoginFailureAttempts):      strconv.Itoa(settings.LoginFailureAttempts),
		string(model.SettingHistoryPasswordCheck):      boolToString(settings.HistoryPasswordCheck),
		string(model.SettingHistoryPasswordCount):      strconv.Itoa(settings.HistoryPasswordCount),
		string(model.SettingUserInactiveDays):          strconv.Itoa(settings.UserInactiveDays),
		string(model.SettingSessionTimeoutMinutes):     strconv.Itoa(settings.SessionTimeoutMinutes),
		string(model.SettingSessionIdleTimeoutMinutes): strconv.Itoa(settings.SessionIdleTimeoutMinutes),
	}

	// Batch update settings
	return s.UpdateSettings(ctx, settingsMap)
}

// InitDefaultSecuritySettings initializes default security settings
func (s *settingService) InitDefaultSecuritySettings(ctx context.Context) error {
	dbConn := db.Session(ctx)
	// Default settings
	defaultSettings := map[model.SettingKey]struct {
		Value   string
		Comment string
	}{
		model.SettingPasswordMinLength:          {"8", "Minimum password length"},
		model.SettingMFAEnforced:                {"false", "Whether to enforce multi-factor authentication"},
		model.SettingPasswordComplexity:         {"medium", "Password complexity type"},
		model.SettingLoginFailureLock:           {"true", "Whether to automatically lock on login failure"},
		model.SettingLoginFailureAttempts:       {"5", "Login failure lock threshold count"},
		model.SettingLoginFailureLockoutMinutes: {"10", "Login failure lockout duration (minutes)"},
		model.SettingHistoryPasswordCheck:       {"true", "Whether to enable history password check"},
		model.SettingHistoryPasswordCount:       {"3", "History password check count"},
		model.SettingSessionTimeoutMinutes:      {"10080", "Session timeout in minutes"},
		model.SettingSessionIdleTimeoutMinutes:  {"1440", "Session idle timeout in minutes"},
		model.SettingUserInactiveDays:           {"90", "User inactive days (0 means do not disable)"},
		model.SettingPasswordExpiryDays:         {"90", "Password expiry days (0 means never expires)"},
		model.SettingPasswordExpiryNotifyDays:   {"7", "Password expiry notify days (0 means disabled)"},
	}

	// Check if each setting already exists, if not, create it
	for key, setting := range defaultSettings {
		var count int64
		dbConn.Model(&model.Setting{}).Where("`key` = ?", key).Count(&count)
		if count == 0 {
			if err := dbConn.Create(model.NewSetting(key, setting.Value, setting.Comment)).Error; err != nil {
				return err
			}
		}
	}
	return s.initJWTKeys(ctx)
}

func (s *settingService) initJWTKeys(ctx context.Context) error {
	logger := log.GetContextLogger(ctx)
	globalConfig := config.GetConfig()
	if globalConfig.JWT.PrivateKey != "" && globalConfig.JWT.PublicKey != nil {
		return nil
	}

	level.Info(logger).Log("msg", "loading JWT keys from database")
	pk, method, err := s.getOrCreateJWTKey(ctx)
	if err != nil {
		return err
	}
	jwtConfig, err := jwt.NewConfig(method, pk)
	if err != nil {
		return fmt.Errorf("failed to build JWT config: %w", err)
	}
	globalConfig.JWT = *jwtConfig
	globalConfig.JWT.KeyID = fmt.Sprintf("%x", sha256.Sum256([]byte(pk)))[:6]
	return nil
}

// getOrCreateJWTKey atomically ensures a JWT private key and method exist in the
// database.  On first start, multiple nodes may race to insert; the winner's
// value is returned to all losers via a re-read, so all nodes end up with the
// same key.
func (s *settingService) getOrCreateJWTKey(ctx context.Context) (pk, method string, err error) {
	dbConn := db.Session(ctx)

	var keySetting, methodSetting model.Setting
	keyErr := dbConn.Where("`key` = ?", model.SettingJWTKey).First(&keySetting).Error
	methodErr := dbConn.Where("`key` = ?", model.SettingJWTMethod).First(&methodSetting).Error

	if keyErr == nil && methodErr == nil && keySetting.Value != "" && methodSetting.Value != "" {
		return keySetting.Value, methodSetting.Value, nil
	}
	if keyErr != nil && !errors.Is(keyErr, gorm.ErrRecordNotFound) {
		return "", "", fmt.Errorf("failed to read JWT key setting: %w", keyErr)
	}

	// Generate new key material.
	const jwtMethod = "ES256"
	newPK, err := jwt.NewRandomKey(jwtMethod)
	if err != nil {
		return "", "", fmt.Errorf("failed to generate JWT key: %w", err)
	}

	// Attempt atomic insert with OnConflict DoNothing.
	keyRow := model.NewSetting(model.SettingJWTKey, newPK, "auto-generated JWT private key")
	resKey := dbConn.Clauses(clause.OnConflict{DoNothing: true}).Create(keyRow)
	if resKey.Error != nil {
		return "", "", fmt.Errorf("failed to persist JWT key: %w", resKey.Error)
	}

	methodRow := model.NewSetting(model.SettingJWTMethod, jwtMethod, "JWT signing algorithm")
	resMethod := dbConn.Clauses(clause.OnConflict{DoNothing: true}).Create(methodRow)
	if resMethod.Error != nil {
		return "", "", fmt.Errorf("failed to persist JWT method: %w", resMethod.Error)
	}

	// Re-read to get whichever value "won" (could be ours or a concurrent node's).
	if err := dbConn.Where("`key` = ?", model.SettingJWTKey).First(&keySetting).Error; err != nil {
		return "", "", fmt.Errorf("failed to re-read JWT key: %w", err)
	}
	if err := dbConn.Where("`key` = ?", model.SettingJWTMethod).First(&methodSetting).Error; err != nil {
		return "", "", fmt.Errorf("failed to re-read JWT method: %w", err)
	}
	return keySetting.Value, methodSetting.Value, nil
}

// passwordContainsAtLeast checks if the password contains at least n character types
func passwordContainsAtLeast(password string, n int) bool {
	types := 0
	if hasUppercase(password) {
		types++
	}
	if hasLowercase(password) {
		types++
	}
	if hasDigit(password) {
		types++
	}
	if hasSpecial(password) {
		types++
	}
	return types >= n
}

// hasUppercase checks if it contains uppercase letters
func hasUppercase(s string) bool {
	for _, c := range s {
		if c >= 'A' && c <= 'Z' {
			return true
		}
	}
	return false
}

// hasLowercase checks if it contains lowercase letters
func hasLowercase(s string) bool {
	for _, c := range s {
		if c >= 'a' && c <= 'z' {
			return true
		}
	}
	return false
}

// hasDigit checks if it contains numbers
func hasDigit(s string) bool {
	for _, c := range s {
		if c >= '0' && c <= '9' {
			return true
		}
	}
	return false
}

// hasSpecial checks if it contains special characters
func hasSpecial(s string) bool {
	for _, c := range s {
		if (c < '0' || c > '9') && (c < 'A' || c > 'Z') && (c < 'a' || c > 'z') {
			return true
		}
	}
	return false
}

// boolToString converts boolean to string
func boolToString(b bool) string {
	if b {
		return "true"
	}
	return "false"
}
