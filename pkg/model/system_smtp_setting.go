package model

import "github.com/sven-victor/ez-utils/safe"

// SMTP setting key constants
const (
	SettingSMTPEnabled               SettingKey = "smtp_enabled"                 // Whether to enable SMTP
	SettingSMTPHost                  SettingKey = "smtp_host"                    // SMTP server host
	SettingSMTPPort                  SettingKey = "smtp_port"                    // SMTP server port
	SettingSMTPUsername              SettingKey = "smtp_username"                // SMTP username
	SettingSMTPPassword              SettingKey = "smtp_password"                // SMTP password
	SettingSMTPEncryption            SettingKey = "smtp_encryption"              // SMTP encryption method (None, SSL/TLS, STARTTLS)
	SettingSMTPFromAddress           SettingKey = "smtp_from_address"            // Sender email address
	SettingSMTPFromName              SettingKey = "smtp_from_name"               // Sender name
	SettingSMTPResetPasswordTemplate SettingKey = "smtp_reset_password_template" // Reset password template
	SettingSMTPUserLockedTemplate    SettingKey = "smtp_user_locked_template"    // User locked template
	SettingSMTPMFACodeTemplate       SettingKey = "smtp_mfa_code_template"       // MFA code template
)

var SMTPSettingKeys = []SettingKey{
	SettingSMTPEnabled,
	SettingSMTPHost,
	SettingSMTPPort,
	SettingSMTPUsername,
	SettingSMTPPassword,
	SettingSMTPEncryption,
	SettingSMTPFromAddress,
	SettingSMTPFromName,
	SettingSMTPResetPasswordTemplate,
	SettingSMTPUserLockedTemplate,
	SettingSMTPMFACodeTemplate,
}

func init() {
	RegisterSettingKeys("smtp", SMTPSettings{}, SMTPSettingKeys...)
}

// SMTPSettings defines the structure for SMTP settings.
// Note: This structure is used for API request/response and for initializing setting keys.
// The actual settings are stored as key-value pairs in the database using the Setting model.
type SMTPSettings struct {
	Enabled               bool         `json:"enabled"`
	Host                  string       `json:"host"`
	Port                  int          `json:"port"`
	Username              string       `json:"username"`
	Password              *safe.String `json:"password,omitempty"`
	Encryption            string       `json:"encryption"` // None, SSL/TLS, STARTTLS
	FromAddress           string       `json:"from_address"`
	FromName              string       `json:"from_name,omitempty"`
	ResetPasswordTemplate string       `json:"reset_password_template,omitempty"`
	UserLockedTemplate    string       `json:"user_locked_template,omitempty"`
	MFACodeTemplate       string       `json:"mfa_code_template,omitempty"`
}

// SMTPTestRequest defines the request structure for testing SMTP connection.
type SMTPTestRequest struct {
	To           string `json:"to" binding:"required,email"`
	SMTPSettings        // Embed SMTPSettings to use current form values for testing
	Password     string `json:"password"`
}
