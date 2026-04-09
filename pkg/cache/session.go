package cache

import (
	"context"
	"time"

	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
)

// CachedSession is the value stored in the Sessions cache.
// It holds a snapshot of user attributes (at cache time) plus session metadata
// and lightweight role references (IDs only — full Role objects live in the
// Roles cache).
type CachedSession struct {
	// Session metadata
	SessionID    string    `json:"session_id"`
	ExpiredAt    time.Time `json:"expired_at"`
	LastActiveAt time.Time `json:"last_active_at"`
	IsValid      bool      `json:"is_valid"`

	// User snapshot
	UserID            string    `json:"user_id"`
	Username          string    `json:"username"`
	Email             string    `json:"email"`
	FullName          string    `json:"full_name"`
	Phone             string    `json:"phone"`
	Avatar            string    `json:"avatar"`
	Status            string    `json:"status"`
	LockedUntil       time.Time `json:"locked_until"`
	PasswordChangedAt time.Time `json:"password_changed_at"`
	LastLogin         time.Time `json:"last_login"`
	MFAEnabled        bool      `json:"mfa_enabled"`
	MFAEnforced       bool      `json:"mfa_enforced"`
	MFAType           string    `json:"mfa_type"`
	Source            string    `json:"source"`
	OAuthProvider     string    `json:"oauth_provider"`
	LDAPDN            string    `json:"ldap_dn"`

	DisableChangePassword bool `json:"disable_change_password"`

	// Role IDs (not full objects)
	RoleIDs []string `json:"role_ids"`

	// IsTemporaryRoles is true when RoleIDs were set from OAuth temporary
	// role mapping rather than from the user_roles table. When true,
	// rebuildSessionCache should restore roles from Session.OAuthRoleIDs
	// instead of loading from the user's persisted roles.
	IsTemporaryRoles bool `json:"is_temporary_roles,omitempty"`

	// Organizations
	Organizations []model.Organization `json:"organizations,omitempty"`
}

// NewCachedSession builds a CachedSession from DB models.
func NewCachedSession(session *model.Session, user *model.User) CachedSession {
	roleIDs := make([]string, 0, len(user.Roles))
	for _, r := range user.Roles {
		roleIDs = append(roleIDs, r.ResourceID)
	}
	return CachedSession{
		SessionID:    session.ResourceID,
		ExpiredAt:    session.ExpiredAt,
		LastActiveAt: session.LastActiveAt,
		IsValid:      session.IsValid,

		UserID:            user.ResourceID,
		Username:          user.Username,
		Email:             user.Email,
		FullName:          user.FullName,
		Phone:             user.Phone,
		Avatar:            user.Avatar,
		Status:            user.Status,
		LockedUntil:       user.LockedUntil,
		PasswordChangedAt: user.PasswordChangedAt,
		LastLogin:         user.LastLogin,
		MFAEnabled:        user.MFAEnabled,
		MFAEnforced:       user.MFAEnforced,
		MFAType:           user.MFAType,
		Source:            string(user.Source),
		OAuthProvider:     user.OAuthProvider,
		LDAPDN:            user.LDAPDN,

		DisableChangePassword: user.DisableChangePassword,

		RoleIDs:       roleIDs,
		Organizations: user.Organizations,
	}
}

// ToUser reconstructs a model.User from the cached data plus fully-loaded roles.
func (cs *CachedSession) ToUser(roles []model.Role) model.User {
	return model.User{
		Base:              model.Base{ResourceID: cs.UserID},
		Username:          cs.Username,
		Email:             cs.Email,
		FullName:          cs.FullName,
		Phone:             cs.Phone,
		Avatar:            cs.Avatar,
		Status:            cs.Status,
		LockedUntil:       cs.LockedUntil,
		PasswordChangedAt: cs.PasswordChangedAt,
		LastLogin:         cs.LastLogin,
		MFAEnabled:        cs.MFAEnabled,
		MFAEnforced:       cs.MFAEnforced,
		MFAType:           cs.MFAType,
		Source:            model.UserSource(cs.Source),
		OAuthProvider:     cs.OAuthProvider,
		LDAPDN:            cs.LDAPDN,
		Roles:             roles,
		Organizations:     cs.Organizations,

		DisableChangePassword: cs.DisableChangePassword,
	}
}

// InvalidateUserSessions deletes all session cache entries for the given user.
// It queries the t_session table to discover the tokenHash keys, then removes
// each one from the Sessions cache (L1 + L2).
func InvalidateUserSessions(ctx context.Context, tx *gorm.DB, userID string) {
	var sessions []model.Session
	tx.Select("token").Where("user_id = ? AND is_valid = ?", userID, true).Find(&sessions)
	for _, s := range sessions {
		_ = Sessions.Delete(ctx, s.Token)
	}
}

// InvalidateAndDisableUserSessions invalidates cache entries and marks all DB
// sessions for the user as invalid (used when a user is disabled or deleted).
func InvalidateAndDisableUserSessions(ctx context.Context, tx *gorm.DB, userID string) {
	InvalidateUserSessions(ctx, tx, userID)
	tx.Model(&model.Session{}).Where("user_id = ? AND is_valid = ?", userID, true).
		Update("is_valid", false)
}
