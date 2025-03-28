package service

import (
	"context"
	"fmt"
	"strconv"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/util/jwt"
	"github.com/sven-victor/ez-utils/log"

	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
)

// GetSecuritySettings gets all security settings
func (s *SettingService) GetSecuritySettings(ctx context.Context) (*model.SecuritySettings, error) {
	// Get settings from database
	settings, err := s.GetSettingsMap(ctx)
	if err != nil {
		return nil, err
	}

	// Set default values
	result := &model.SecuritySettings{
		MFAEnforced:           false,
		PasswordComplexity:    model.PasswordComplexityMedium,
		PasswordMinLength:     8,
		PasswordExpiryDays:    90,
		LoginFailureLock:      true,
		LoginFailureAttempts:  5,
		HistoryPasswordCheck:  true,
		HistoryPasswordCount:  3,
		UserInactiveDays:      90,
		SessionTimeoutMinutes: 30,
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

	return result, nil
}

// UpdateSecuritySettings updates security settings
func (s *SettingService) UpdateSecuritySettings(ctx context.Context, settings *model.SecuritySettings) error {
	// Prepare settings to be updated
	settingsMap := map[string]string{
		string(model.SettingMFAEnforced):           boolToString(settings.MFAEnforced),
		string(model.SettingPasswordComplexity):    string(settings.PasswordComplexity),
		string(model.SettingPasswordMinLength):     strconv.Itoa(settings.PasswordMinLength),
		string(model.SettingPasswordExpiryDays):    strconv.Itoa(settings.PasswordExpiryDays),
		string(model.SettingLoginFailureLock):      boolToString(settings.LoginFailureLock),
		string(model.SettingLoginFailureAttempts):  strconv.Itoa(settings.LoginFailureAttempts),
		string(model.SettingHistoryPasswordCheck):  boolToString(settings.HistoryPasswordCheck),
		string(model.SettingHistoryPasswordCount):  strconv.Itoa(settings.HistoryPasswordCount),
		string(model.SettingUserInactiveDays):      strconv.Itoa(settings.UserInactiveDays),
		string(model.SettingSessionTimeoutMinutes): strconv.Itoa(settings.SessionTimeoutMinutes),
	}

	// Batch update settings
	return s.UpdateSettings(ctx, settingsMap)
}

// InitDefaultSecuritySettings initializes default security settings
func (s *SettingService) InitDefaultSecuritySettings(ctx context.Context) error {
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
		model.SettingSessionTimeoutMinutes:      {"30", "Session timeout in minutes"},
		model.SettingUserInactiveDays:           {"90", "User inactive days (0 means do not disable)"},
		model.SettingPasswordExpiryDays:         {"90", "Password expiry days (0 means never expires)"},
	}

	// Check if each setting already exists, if not, create it
	for key, setting := range defaultSettings {
		var count int64
		dbConn.Model(&model.Setting{}).Where("key = ?", key).Count(&count)
		if count == 0 {
			if err := dbConn.Create(model.NewSetting(key, setting.Value, setting.Comment)).Error; err != nil {
				return err
			}
		}
	}
	return s.initJWTKeys(ctx)
}

func (s *SettingService) initJWTKeys(ctx context.Context) error {
	logger := log.GetContextLogger(ctx)
	globalConfig := config.GetConfig()
	if globalConfig.JWT.PrivateKey == "" || globalConfig.JWT.PublicKey == nil {
		level.Info(logger).Log("msg", "loading JWT keys from database")
		jwtKeySetting, err := s.GetStringSetting(ctx, model.SettingJWTKey, "")
		if err != nil {
			return fmt.Errorf("failed to get JWT key: %w", err)
		}
		jwtMethodSetting, err := s.GetStringSetting(ctx, model.SettingJWTMethod, "")
		if err != nil {
			return fmt.Errorf("failed to get JWT method: %w", err)
		}
		if jwtKeySetting != "" && jwtMethodSetting != "" {
			jwtConfig, err := jwt.NewConfig(jwtMethodSetting, jwtKeySetting)
			if err != nil {
				return fmt.Errorf("failed to generate new JWT keys: %w", err)
			}
			globalConfig.JWT = *jwtConfig
			return nil
		}
		level.Info(logger).Log("msg", "generating new JWT keys, auto write to database")
		// Automatically generate new JWT secret
		method := "ES256"
		pk, err := jwt.NewRandomKey(method)
		if err != nil {
			return fmt.Errorf("failed to generate new JWT keys: %w", err)
		}
		jwtConfig, err := jwt.NewConfig(method, pk)
		if err != nil {
			return fmt.Errorf("failed to generate new JWT keys: %w", err)
		}
		globalConfig.JWT = *jwtConfig
		if err := s.UpdateSettings(ctx, map[string]string{
			string(model.SettingJWTKey):    pk,
			string(model.SettingJWTMethod): method,
		}); err != nil {
			return fmt.Errorf("failed to update JWT keys: %w", err)
		}
	}

	return nil
}

// IsPasswordComplexityMet checks if the password meets the complexity requirements
func (s *SettingService) IsPasswordComplexityMet(ctx context.Context, password string) (bool, error) {
	// Get password complexity setting
	complexitySetting, err := s.GetStringSetting(ctx, model.SettingPasswordComplexity, string(model.PasswordComplexityMedium))
	if err != nil {
		return false, err
	}

	complexity := model.PasswordComplexity(complexitySetting)

	// Get minimum password length
	minLength, err := s.GetIntSetting(ctx, model.SettingPasswordMinLength, 8)
	if err != nil {
		return false, err
	}

	// Check password length
	if len(password) < minLength {
		return false, nil
	}

	// Check password complexity
	switch complexity {
	case model.PasswordComplexityLow:
		// Any characters allowed
		return true, nil
	case model.PasswordComplexityMedium:
		// At least two character types combination
		return passwordContainsAtLeast(password, 2), nil
	case model.PasswordComplexityHigh:
		// Must contain uppercase, lowercase letters and numbers
		return hasUppercase(password) && hasLowercase(password) && hasDigit(password), nil
	case model.PasswordComplexityVeryHigh:
		// Must contain uppercase, lowercase letters, numbers and special characters
		return hasUppercase(password) && hasLowercase(password) && hasDigit(password) && hasSpecial(password), nil
	default:
		// Default to medium complexity
		return passwordContainsAtLeast(password, 2), nil
	}
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
