package model

// Password complexity type
type PasswordComplexity string

const (
	PasswordComplexityLow      PasswordComplexity = "low"       // Insecure: any characters allowed
	PasswordComplexityMedium   PasswordComplexity = "medium"    // Medium: combination of any two of uppercase, lowercase, and numbers
	PasswordComplexityHigh     PasswordComplexity = "high"      // Secure: must include uppercase, lowercase, and numbers
	PasswordComplexityVeryHigh PasswordComplexity = "very_high" // Very secure: must include uppercase, lowercase, numbers, and special characters
)

// Add system setting key constants
const (
	// Security related settings
	SettingMFAEnforced                SettingKey = "mfa_enforced"                  // Whether to enforce multi-factor authentication
	SettingLoginFailureLock           SettingKey = "login_failure_lock"            // Whether to automatically lock on login failure
	SettingLoginFailureAttempts       SettingKey = "login_failure_attempts"        // Login failure lock threshold count
	SettingLoginFailureLockoutMinutes SettingKey = "login_failure_lockout_minutes" // Login failure lockout duration
	// Password policy related settings
	SettingPasswordComplexity   SettingKey = "password_complexity"    // Password complexity type
	SettingHistoryPasswordCheck SettingKey = "history_password_check" // Whether to enable history password check
	SettingHistoryPasswordCount SettingKey = "history_password_count" // History password check count
	SettingPasswordMinLength    SettingKey = "password_min_length"    // Minimum password length
	SettingPasswordExpiryDays   SettingKey = "password_expiry_days"   // Password expiry days (0 means never expires)

	// User policy related settings
	SettingSessionTimeoutMinutes SettingKey = "session_timeout_minutes" // Session timeout in minutes
	SettingUserInactiveDays      SettingKey = "user_inactive_days"      // User inactive days (0 means do not disable)
	SettingJWTKey                SettingKey = "jwt_key"                 // JWT secret key
	SettingJWTMethod             SettingKey = "jwt_method"              // JWT encryption method

)

var SecuritySettingKeys = []SettingKey{
	SettingMFAEnforced,
	SettingPasswordComplexity,
	SettingLoginFailureLock,
	SettingLoginFailureAttempts,
	SettingHistoryPasswordCheck,
	SettingHistoryPasswordCount,
	SettingSessionTimeoutMinutes,
	SettingPasswordMinLength,
	SettingPasswordExpiryDays,
	SettingUserInactiveDays,
	SettingLoginFailureLockoutMinutes,
}

func init() {
	RegisterSettingKeys("", SecuritySettings{}, SecuritySettingKeys...)
}

// SecuritySettings Security settings request and response structure
type SecuritySettings struct {
	MFAEnforced                bool               `json:"mfa_enforced"`
	PasswordComplexity         PasswordComplexity `json:"password_complexity"`
	PasswordMinLength          int                `json:"password_min_length"`
	PasswordExpiryDays         int                `json:"password_expiry_days"`
	LoginFailureLock           bool               `json:"login_failure_lock"`
	LoginFailureAttempts       int                `json:"login_failure_attempts"`
	LoginFailureLockoutMinutes int                `json:"login_failure_lockout_minutes"`
	HistoryPasswordCheck       bool               `json:"history_password_check"`
	HistoryPasswordCount       int                `json:"history_password_count"`
	UserInactiveDays           int                `json:"user_inactive_days"`
	SessionTimeoutMinutes      int                `json:"session_timeout_minutes"`
}
