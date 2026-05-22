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

package model

import "github.com/sven-victor/ez-utils/safe"

// SMTP setting key constants
const (
	SettingSMTPAdminEmails           SettingKey = "smtp_admin_emails"            // Admin email addresses (comma-separated)
	SettingSMTPEnabled               SettingKey = "smtp_enabled"                 // Whether to enable SMTP
	SettingSMTPHost                  SettingKey = "smtp_host"                    // SMTP server host
	SettingSMTPPort                  SettingKey = "smtp_port"                    // SMTP server port
	SettingSMTPUsername              SettingKey = "smtp_username"                // SMTP username
	SettingSMTPPassword              SettingKey = "smtp_password"                // SMTP password
	SettingSMTPEncryption            SettingKey = "smtp_encryption"              // SMTP encryption method (None, SSL/TLS, STARTTLS)
	SettingSMTPFromAddress           SettingKey = "smtp_from_address"            // Sender email address
	SettingSMTPFromName              SettingKey = "smtp_from_name"               // Sender name
	SettingSMTPResetPasswordTemplate SettingKey = "smtp_reset_password_template" // Reset password template
	SettingSMTPUserLockedTemplate    SettingKey = "smtp_user_locked_template"    // Deprecated: use smtp_login_failure_lock_template
	SettingSMTPMFACodeTemplate       SettingKey = "smtp_mfa_code_template"       // MFA code template
	SettingSMTPActivationTemplate    SettingKey = "smtp_activation_template"     // Account activation email template

	SettingSMTPPasswordExpiryTemplate   SettingKey = "smtp_password_expiry_template"    // Password expiry warning template
	SettingSMTPLoginFailureLockTemplate SettingKey = "smtp_login_failure_lock_template" // Login failure lock template
	SettingSMTPInactiveLockTemplate     SettingKey = "smtp_inactive_lock_template"      // Inactive account lock template
)

var SMTPSettingKeys = []SettingKey{
	SettingSMTPAdminEmails,
	SettingSMTPEnabled,
	SettingSMTPHost,
	SettingSMTPPort,
	SettingSMTPUsername,
	SettingSMTPPassword,
	SettingSMTPEncryption,
	SettingSMTPFromAddress,
	SettingSMTPFromName,
	SettingSMTPResetPasswordTemplate,
	SettingSMTPMFACodeTemplate,
	SettingSMTPActivationTemplate,
	SettingSMTPPasswordExpiryTemplate,
	SettingSMTPLoginFailureLockTemplate,
	SettingSMTPInactiveLockTemplate,
}

// SettingFieldType defines typed setting field values for dynamic frontend rendering.
type SettingFieldType string

const (
	SettingFieldTypeString     SettingFieldType = "string"
	SettingFieldTypeNumber     SettingFieldType = "number"
	SettingFieldTypePercentage SettingFieldType = "percentage"
	SettingFieldTypeRichText   SettingFieldType = "rich_text"
	SettingFieldTypeStringList SettingFieldType = "string_list"
	SettingFieldTypeEnum       SettingFieldType = "enum"
)

// SettingFieldEnumOption represents one enum option in a registered setting field.
type SettingFieldEnumOption struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

// SettingFieldDefinition describes a registered dynamic setting field.
type SettingFieldDefinition struct {
	Key          string                   `json:"key"`
	ValueType    SettingFieldType         `json:"value_type"`
	DefaultValue string                   `json:"default_value"`
	LabelKey     string                   `json:"label_key,omitempty"`
	TooltipKey   string                   `json:"tooltip_key,omitempty"`
	Min          *float64                 `json:"min,omitempty"`
	Max          *float64                 `json:"max,omitempty"`
	Step         *float64                 `json:"step,omitempty"`
	EnumOptions  []SettingFieldEnumOption `json:"enum_options,omitempty"`
}

type settingFieldEnumOptionsProvider func() []SettingFieldEnumOption

type smtpSettingFieldRegistryItem struct {
	field               SettingFieldDefinition
	enumOptionsProvider settingFieldEnumOptionsProvider
}

var smtpSettingFieldRegistry []smtpSettingFieldRegistryItem

// RegisterSMTPSettingField registers one SMTP dynamic field definition.
func RegisterSMTPSettingField(field SettingFieldDefinition, enumOptionsProvider settingFieldEnumOptionsProvider) {
	smtpSettingFieldRegistry = append(smtpSettingFieldRegistry, smtpSettingFieldRegistryItem{
		field:               field,
		enumOptionsProvider: enumOptionsProvider,
	})
}

// GetRegisteredSMTPSettingFields returns all registered SMTP dynamic field definitions.
func GetRegisteredSMTPSettingFields() []SettingFieldDefinition {
	fields := make([]SettingFieldDefinition, 0, len(smtpSettingFieldRegistry))
	for _, item := range smtpSettingFieldRegistry {
		field := item.field
		if item.enumOptionsProvider != nil {
			field.EnumOptions = item.enumOptionsProvider()
		}
		fields = append(fields, field)
	}
	return fields
}

func init() {
	RegisterSettingKeys("smtp", SMTPSettings{}, SMTPSettingKeys...)
	RegisterSMTPSettingField(SettingFieldDefinition{
		Key:          "reset_password_template",
		ValueType:    SettingFieldTypeRichText,
		DefaultValue: "<p>Your password has been reset, the new password is: <strong>{{.Password}}</strong></p>",
		LabelKey:     "settings.smtp.resetPasswordTemplate",
	}, nil)
	RegisterSMTPSettingField(SettingFieldDefinition{
		Key:          "mfa_code_template",
		ValueType:    SettingFieldTypeRichText,
		DefaultValue: "<p>Your MFA verification code is: <strong>{{.Code}}</strong></p>",
		LabelKey:     "settings.smtp.mfaCodeTemplate",
	}, nil)
	RegisterSMTPSettingField(SettingFieldDefinition{
		Key:          "activation_template",
		ValueType:    SettingFieldTypeRichText,
		DefaultValue: "<p>Hello {{.FullName}},</p><p>Your account has been created. Please click the link below to activate your account and set your password:</p><p><a href=\"{{.ActivationURL}}\">Activate Account</a></p><p>This link will expire in 48 hours.</p>",
		LabelKey:     "settings.smtp.activationTemplate",
		TooltipKey:   "settings.smtp.activationTemplateTooltip",
	}, nil)
	RegisterSMTPSettingField(SettingFieldDefinition{
		Key:          "password_expiry_template",
		ValueType:    SettingFieldTypeRichText,
		DefaultValue: "<p>Hello {{.FullName}},</p><p>Your password will expire in <strong>{{.DaysLeft}}</strong> days. Please update your password as soon as possible.</p>",
		LabelKey:     "settings.smtp.passwordExpiryTemplate",
	}, nil)
	RegisterSMTPSettingField(SettingFieldDefinition{
		Key:          "login_failure_lock_template",
		ValueType:    SettingFieldTypeRichText,
		DefaultValue: "<p>Hello {{.FullName}},</p><p>Your account has been locked due to too many failed login attempts.</p>",
		LabelKey:     "settings.smtp.loginFailureLockTemplate",
	}, nil)
	RegisterSMTPSettingField(SettingFieldDefinition{
		Key:          "inactive_lock_template",
		ValueType:    SettingFieldTypeRichText,
		DefaultValue: "<p>Hello {{.FullName}},</p><p>Your account has been locked due to inactivity.</p>",
		LabelKey:     "settings.smtp.inactiveLockTemplate",
	}, nil)
}

// SMTPSettings defines the structure for SMTP settings.
// Note: This structure is used for API request/response and for initializing setting keys.
// The actual settings are stored as key-value pairs in the database using the Setting model.
type SMTPSettings struct {
	AdminEmails           []string     `json:"admin_emails"`
	Enabled               bool         `json:"enabled"`
	Host                  string       `json:"host"`
	Port                  int          `json:"port"`
	Username              string       `json:"username"`
	Password              *safe.String `json:"password,omitempty"`
	Encryption            string       `json:"encryption"` // None, SSL/TLS, STARTTLS
	FromAddress           string       `json:"from_address"`
	FromName              string       `json:"from_name,omitempty"`
	ResetPasswordTemplate string       `json:"reset_password_template,omitempty"`
	MFACodeTemplate       string       `json:"mfa_code_template,omitempty"`
	ActivationTemplate    string       `json:"activation_template,omitempty"`

	PasswordExpiryTemplate   string `json:"password_expiry_template,omitempty"`
	LoginFailureLockTemplate string `json:"login_failure_lock_template,omitempty"`
	InactiveLockTemplate     string `json:"inactive_lock_template,omitempty"`
}

// SMTPTestRequest defines the request structure for testing SMTP connection.
type SMTPTestRequest struct {
	To           string `json:"to" binding:"required,email"`
	SMTPSettings        // Embed SMTPSettings to use current form values for testing
	Password     string `json:"password"`
}
