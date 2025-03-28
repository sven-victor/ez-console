package service

import (
	"bytes"
	"context"
	"encoding/json"
	"os"
	"strconv"
	"strings"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/safe"
)

// GetSMTPSettings retrieves SMTP settings from the database
func (s *SettingService) GetSMTPSettings(ctx context.Context) (*model.SMTPSettings, error) {
	settingsMap, err := s.GetSettingsMap(ctx)
	if err != nil {
		return nil, err
	}

	smtpSettings := &model.SMTPSettings{}

	var emailSettingMap = map[string]any{}

	for _, key := range model.SMTPSettingKeys {
		if val, ok := settingsMap[string(key)]; ok {
			name := strings.TrimPrefix(string(key), "smtp_")
			emailSettingMap[name] = val
			switch name {
			case "enabled":
				emailSettingMap[name] = val == "1" || val == "true"
			case "port":
				port, err := strconv.Atoi(val)
				if err != nil {
					return nil, err
				}
				emailSettingMap[name] = port
			case "password":
				emailSettingMap[name] = safe.NewEncryptedString(val, os.Getenv(safe.SecretEnvName))
			default:
				emailSettingMap[name] = val
			}
		}
	}
	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(emailSettingMap); err != nil {
		return nil, err
	}
	if err := json.Unmarshal(buf.Bytes(), smtpSettings); err != nil {
		return nil, err
	}
	return smtpSettings, nil
}

// UpdateSMTPSettings saves SMTP settings to the database
func (s *SettingService) UpdateSMTPSettings(ctx context.Context, settings *model.SMTPSettings) error {
	settingsToUpdate := map[string]string{
		string(model.SettingSMTPEnabled):               strconv.FormatBool(settings.Enabled),
		string(model.SettingSMTPHost):                  settings.Host,
		string(model.SettingSMTPPort):                  strconv.Itoa(settings.Port),
		string(model.SettingSMTPUsername):              settings.Username,
		string(model.SettingSMTPEncryption):            settings.Encryption,
		string(model.SettingSMTPFromAddress):           settings.FromAddress,
		string(model.SettingSMTPFromName):              settings.FromName,
		string(model.SettingSMTPMFACodeTemplate):       settings.MFACodeTemplate,
		string(model.SettingSMTPResetPasswordTemplate): settings.ResetPasswordTemplate,
		string(model.SettingSMTPUserLockedTemplate):    settings.UserLockedTemplate,
	}
	if settings.Password != nil {
		settingsToUpdate[string(model.SettingSMTPPassword)] = settings.Password.String()
	}

	return s.UpdateSettings(ctx, settingsToUpdate)
}

// InitDefaultSMTPSettings initializes default SMTP settings
func (s *SettingService) InitDefaultSMTPSettings(ctx context.Context) error {
	// Default setting items
	defaultSettings := map[model.SettingKey]struct {
		Value   string
		Comment string
	}{
		model.SettingSMTPEnabled:               {"false", "Whether to enable SMTP"},
		model.SettingSMTPHost:                  {"", "SMTP server address"},
		model.SettingSMTPPort:                  {"465", "SMTP server port"},
		model.SettingSMTPUsername:              {"", "SMTP username"},
		model.SettingSMTPPassword:              {"", "SMTP password"},
		model.SettingSMTPEncryption:            {"SSL/TLS", "SMTP encryption type"},
		model.SettingSMTPFromAddress:           {"", "SMTP from address"},
		model.SettingSMTPFromName:              {"", "SMTP from name"},
		model.SettingSMTPResetPasswordTemplate: {"<p>Your password has been reset, the new password is: <strong>{{.Password}}</strong></p>", "Reset password template"},
		model.SettingSMTPUserLockedTemplate:    {"Your account has been locked, please contact the administrator to unlock it.", "User locked template"},
		model.SettingSMTPMFACodeTemplate:       {"<p>Your MFA verification code is: <strong>{{.Code}}</strong></p>", "Enable MFA template"},
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
