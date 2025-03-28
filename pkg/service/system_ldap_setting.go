package service

import (
	"bytes"
	"context"
	"encoding/json"
	"strings"

	clientsldap "github.com/sven-victor/ez-console/pkg/clients/ldap"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
)

// GetLDAPSettings gets LDAP settings
func (s *SettingService) GetLDAPSettings(ctx context.Context) (clientsldap.Options, error) {
	settings, err := s.GetSettingsMap(ctx)
	if err != nil {
		return clientsldap.Options{}, err
	}

	result := clientsldap.Options{
		Enabled:         false,
		ServerURL:       "",
		BindDN:          "",
		BindPassword:    nil,
		BaseDN:          "",
		UserFilter:      "",
		UserAttr:        "uid",
		EmailAttr:       "mail",
		DisplayNameAttr: "displayName",
		DefaultRole:     "user",
	}

	var oauthSettingMap = map[string]any{}
	for _, key := range model.LDAPSettingKeys {
		if val, ok := settings[string(key)]; ok {
			name := strings.TrimPrefix(string(key), "ldap_")
			oauthSettingMap[name] = val
			switch name {
			case "enabled", "auto_create_user", "start_tls", "insecure":
				oauthSettingMap[name] = val == "1" || val == "true"
			default:
				oauthSettingMap[name] = val
			}
		}
	}
	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(oauthSettingMap); err != nil {
		return clientsldap.Options{}, err
	}
	if err := json.Unmarshal(buf.Bytes(), &result); err != nil {
		return clientsldap.Options{}, err
	}
	return result, nil
}

// UpdateLDAPSettings updates LDAP settings
func (s *SettingService) UpdateLDAPSettings(ctx context.Context, settings *clientsldap.Options) error {
	settingsMap := map[string]string{
		string(model.SettingLDAPEnabled):         boolToString(settings.Enabled),
		string(model.SettingLDAPServerURL):       settings.ServerURL,
		string(model.SettingLDAPBindDN):          settings.BindDN,
		string(model.SettingLDAPBaseDN):          settings.BaseDN,
		string(model.SettingLDAPUserFilter):      settings.UserFilter,
		string(model.SettingLDAPUserAttr):        settings.UserAttr,
		string(model.SettingLDAPEmailAttr):       settings.EmailAttr,
		string(model.SettingLDAPDisplayNameAttr): settings.DisplayNameAttr,
		string(model.SettingLDAPDefaultRole):     settings.DefaultRole,
		string(model.SettingLDAPStartTLS):        boolToString(settings.StartTLS),
		string(model.SettingLDAPCACert):          settings.CACert,
		string(model.SettingLDAPClientCert):      settings.ClientCert,
		string(model.SettingLDAPInsecure):        boolToString(settings.Insecure),
	}

	if settings.ClientKey != nil {
		settingsMap[string(model.SettingLDAPClientKey)] = settings.ClientKey.String()
	}

	if settings.BindPassword != nil {
		settingsMap[string(model.SettingLDAPBindPassword)] = settings.BindPassword.String()
	}

	return s.UpdateSettings(ctx, settingsMap)
}

// InitDefaultLDAPSettings init default ldap settings
func (s *SettingService) InitDefaultLDAPSettings(ctx context.Context) error {
	// default settings
	defaultSettings := map[model.SettingKey]struct {
		Value   string
		Comment string
	}{
		model.SettingLDAPEnabled:         {"false", "Enable LDAP Authentication"},
		model.SettingLDAPServerURL:       {"", "LDAP Server URL"},
		model.SettingLDAPBindDN:          {"", "LDAP Bind DN"},
		model.SettingLDAPBaseDN:          {"", "LDAP Base DN"},
		model.SettingLDAPUserFilter:      {"", "LDAP User Filter"},
		model.SettingLDAPUserAttr:        {"uid", "LDAP User Attribute"},
		model.SettingLDAPEmailAttr:       {"mail", "LDAP Email Attribute"},
		model.SettingLDAPDisplayNameAttr: {"displayName", "LDAP Display Name Attribute"},
		model.SettingLDAPDefaultRole:     {"user", "LDAP Default Role"},
		model.SettingLDAPStartTLS:        {"false", "Enable StartTLS"},
	}

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
