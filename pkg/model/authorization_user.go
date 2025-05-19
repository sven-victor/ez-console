package model

import (
	"time"

	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/safe"
	"golang.org/x/crypto/bcrypt"
)

const (
	UserStatusActive          = "active"
	UserStatusDisabled        = "disabled"
	UserStatusPasswordExpired = "password_expired"
	UserStatusLocked          = "locked"
	UserStatusDeleted         = "deleted"
)

type UserSource string

const (
	UserSourceLocal UserSource = "local"
	UserSourceLDAP  UserSource = "ldap"
	UserSourceOAuth UserSource = "oauth"
)

// User represents a user account in the system
type User struct {
	Base
	Username          string       `gorm:"size:50;not null" json:"username"`
	Email             string       `gorm:"size:100;not null" json:"email"`
	FullName          string       `gorm:"size:100;not null" json:"full_name"`
	Password          string       `gorm:"size:255;not null" json:"-"`
	Salt              string       `gorm:"size:32;not null" json:"-"`
	Phone             string       `gorm:"size:20" json:"phone,omitempty"`
	Avatar            string       `gorm:"size:255" json:"avatar,omitempty"`
	Status            string       `gorm:"size:20;not null;default:'active'" json:"status"`
	LastLogin         time.Time    `json:"last_login,omitempty"`
	PasswordChangedAt time.Time    `json:"password_changed_at,omitempty"`
	LoginAttempts     int          `gorm:"default:0" json:"-"`
	LockedUntil       time.Time    `json:"-"`
	MFAEnabled        bool         `gorm:"default:false" json:"mfa_enabled"`
	MFASecret         *safe.String `gorm:"size:255" json:"-"`
	MFAType           string       `gorm:"size:255" json:"-"`
	OAuthProvider     string       `gorm:"column:oauth_provider;size:50" json:"oauth_provider,omitempty"`
	OAuthID           string       `gorm:"column:oauth_id;size:255" json:"oauth_id,omitempty"`
	LDAPDN            string       `gorm:"column:ldap_dn;size:255" json:"ldap_dn,omitempty"`
	Roles             []Role       `gorm:"many2many:user_roles;" json:"roles,omitempty"`
	MFAEnforced       bool         `gorm:"default:false" json:"mfa_enforced"`
	Source            UserSource   `gorm:"size:20;not null;default:'local'" json:"source,omitempty"`

	DisableChangePassword bool `gorm:"-" json:"disable_change_password"`
}

// SetPassword sets the user's password, automatically generating a salt and encrypting it
func (u *User) SetPassword(password string) error {
	salt, hashedPassword, err := util.BcryptPassword(password)
	if err != nil {
		return err
	}
	u.Password = hashedPassword
	u.Salt = salt
	u.PasswordChangedAt = time.Now()
	return nil
}

// CheckPassword verifies if the password is correct
func (u *User) CheckPassword(password string) bool {
	if u.Password == "" {
		return false
	}
	if password == "" {
		return false
	}
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password+u.Salt))
	return err == nil
}

// IsPasswordExpired checks if the password has expired
func (u *User) IsPasswordExpired(expiryDays int) bool {
	if expiryDays <= 0 {
		return false
	}

	expiryTime := u.PasswordChangedAt.AddDate(0, 0, expiryDays)
	return time.Now().After(expiryTime)
}

// IsLocked checks if the account is locked
func (u *User) IsLocked() bool {
	return time.Now().Before(u.LockedUntil)
}

func (u *User) IsDeleted() bool {
	return u.DeletedAt.Valid && !u.DeletedAt.Time.IsZero()
}

// IncrementLoginAttempts increments the login attempt count
func (u *User) IncrementLoginAttempts() {
	u.LoginAttempts++
}

// ResetLoginAttempts resets the login attempt count
func (u *User) ResetLoginAttempts() {
	u.LoginAttempts = 0
	u.LockedUntil = time.Time{}
}

// Lock locks the account for a period of time
func (u *User) Lock(duration time.Duration) {
	u.LockedUntil = time.Now().Add(duration)
}

// IsInactive checks if the user is inactive
func (u *User) IsInactive(inactiveDays int) bool {
	if inactiveDays <= 0 {
		return false
	}

	inactiveTime := u.LastLogin.AddDate(0, 0, inactiveDays)
	return time.Now().After(inactiveTime)
}

// HasRole checks if the user has the specified role
func (u *User) HasRole(roleName string) bool {
	for _, role := range u.Roles {
		if role.Name == roleName {
			return true
		}
	}
	return false
}

// IsActive checks if the user is active
func (u *User) IsActive() bool {
	return u.Status == UserStatusActive && !u.IsLocked()
}

func (u *User) IsLDAPUser() bool {
	return u.Source == UserSourceLDAP && u.LDAPDN != ""
}
