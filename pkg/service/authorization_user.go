package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/go-kit/log/level"
	"github.com/go-ldap/ldap/v3"
	"github.com/google/uuid"
	"github.com/pquerna/otp/totp"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/safe"
	w "github.com/sven-victor/ez-utils/wrapper"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	clientsldap "github.com/sven-victor/ez-console/pkg/clients/ldap"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
)

// UserService provides user-related services
type UserService struct {
	baseService *BaseService
	ldapService *LDAPService
}

// NewUserService creates a user service
func NewUserService(baseService *BaseService, ldapService *LDAPService) *UserService {
	return &UserService{
		baseService: baseService,
		ldapService: ldapService,
	}
}

// LoginRequest login request parameters
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	MFACode  string `json:"mfa_code"`
	MFAToken string `json:"mfa_token"`
}

// LoginResponse login response
type LoginResponse struct {
	Token           string     `json:"token,omitempty"`
	MFAToken        string     `json:"mfa_token,omitempty"`
	MFAType         string     `json:"mfa_type,omitempty"`
	User            model.User `json:"user"`
	NeedsMFA        bool       `json:"needs_mfa"`
	PasswordExpired bool       `json:"password_expired"`
	ExpiresAt       time.Time  `json:"expires_at"`
}

// CreateUserRequest registration request parameters
type CreateUserRequest struct {
	Username    string   `json:"username" binding:"required"`
	Password    string   `json:"password" binding:"required"`
	Email       string   `json:"email" binding:"required,email"`
	FullName    string   `json:"full_name"`
	Phone       string   `json:"phone"`
	Avatar      string   `json:"avatar"`
	RoleIDs     []string `json:"role_ids"`
	MFAEnforced bool     `json:"mfa_enforced"`
}

// UpdateUserRequest update user request parameters
type UpdateUserRequest struct {
	Email       string    `json:"email"`
	FullName    string    `json:"full_name"`
	Phone       string    `json:"phone"`
	Status      string    `json:"status"`
	Avatar      string    `json:"avatar"`
	RoleIDs     *[]string `json:"role_ids"`
	MFAEnforced *bool     `json:"mfa_enforced"`
	LDAPDN      string    `json:"ldap_dn"`
	Source      string    `json:"source"`
}

// ChangePasswordRequest change password request parameters
type ChangePasswordRequest struct {
	OldPassword string `json:"old_password" binding:"required"`
	NewPassword string `json:"new_password" binding:"required"`
}

// ResetPasswordRequest reset password request parameters
type ResetPasswordRequest struct {
	UserID      string `json:"-"`
	NewPassword string `json:"new_password" binding:"required"`
}

// EnableMFAResponse MFA enable response
type EnableMFAResponse struct {
	Secret string `json:"secret,omitempty"`
	QRCode string `json:"qr_code,omitempty"`
	Token  string `json:"token,omitempty"`
}

type MFATokenData struct {
	Token   string               `json:"token"`
	Code    string               `json:"code"`
	MFAType string               `json:"mfa_type"`
	UserID  string               `json:"user_id"`
	Source  middleware.JWTIssuer `json:"source"`
}

func (s *UserService) UserLoginFailed(ctx context.Context, user *model.User) error {
	securitySettings, err := s.baseService.GetSecuritySettings(ctx)
	if err != nil {
		return fmt.Errorf("failed to get security settings: %w", err)
	}
	dbConn := db.Session(ctx)
	user.IncrementLoginAttempts()
	if securitySettings.LoginFailureLock && securitySettings.LoginFailureAttempts > 0 && user.LoginAttempts >= securitySettings.LoginFailureAttempts {
		user.Lock(time.Duration(securitySettings.LoginFailureLockoutMinutes) * time.Minute)
	} else {
		user.LockedUntil = time.Now().AddDate(100, 0, 0)
	}
	if user.Email != "" {
		s.baseService.SendEmailFromTemplate(ctx, []string{user.Email}, "User Locked", model.SettingSMTPUserLockedTemplate, map[string]any{
			"Username": user.Username,
			"UserID":   user.ResourceID,
			"Email":    user.Email,
			"Avatar":   user.Avatar,
			"FullName": user.FullName,
		})
	}
	err = dbConn.Model(&user).Select("LoginAttempts", "LockedUntil").Updates(&user).Error
	if err != nil {
		return fmt.Errorf("failed to update user login attempts: %w", err)
	}
	return nil
}

func (s *UserService) LoginWithMFA(ctx context.Context, mfaCode, mfaToken string) (*LoginResponse, error) {
	securitySettings, err := s.baseService.GetSecuritySettings(ctx)
	if err != nil {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E50012",
			Err:      err,
		}
	}

	cache, err := s.baseService.GetCache(ctx, fmt.Sprintf("ez-console:login:code:%s", mfaToken))
	if err != nil || cache == nil {
		return nil, util.NewError("E5001", "Failed to get MFA code", err)
	}

	safeToken := safe.NewEncryptedString(cache.Value, os.Getenv(safe.SecretEnvName))
	rawTokenData, err := safeToken.UnsafeString()
	if err != nil {
		return nil, util.NewError("E5001", "Failed to get MFA code", err)
	}
	fmt.Println(rawTokenData)
	tokenData := MFATokenData{}
	err = json.Unmarshal([]byte(rawTokenData), &tokenData)
	if err != nil {
		return nil, util.NewError("E5001", "Failed to unmarshal MFA code", err)
	}

	user, err := s.GetUserByID(ctx, tokenData.UserID, WithPermissions(true), WithCache(true))
	if err != nil {
		return nil, util.NewError("E5001", "Failed to get user", err)
	}
	if user.IsLocked() {
		if time.Until(user.LockedUntil) < time.Minute*3 {
			return nil, util.NewError("E4013", fmt.Sprintf("The account has been locked for %s, please try again later", time.Until(user.LockedUntil).Truncate(time.Second).String()))
		}
		return nil, util.NewError("E4011", "Account is locked, please try again later")
	}
	if tokenData.MFAType == "email" && tokenData.Code != mfaCode {
		user.Lock(time.Duration(time.Second * 30))
		s.UserLoginFailed(ctx, user)
		middleware.SetUserCache(user.ResourceID, *user, time.Minute*10)
		return nil, util.NewError("E40036", "MFA verification code is invalid")
	}

	// Verify MFA code
	switch tokenData.MFAType {
	case "totp":
		if user.MFASecret == nil {
			var mfaSecret safe.String
			err = db.Session(ctx).Model(&user).Where("resource_id = ?", tokenData.UserID).Select("MFASecret").First(&mfaSecret).Error
			if err != nil {
				return nil, util.NewError("E5001", "Failed to get MFA secret", err)
			}
			user.MFASecret = &mfaSecret
		}
		secret, err := user.MFASecret.UnsafeString()
		if err != nil {
			return nil, util.NewError("E5001", "MFA secret is invalid", err)
		}
		valid := totp.Validate(mfaCode, secret)
		if !valid {
			user.Lock(time.Duration(time.Second * 30))
			s.UserLoginFailed(ctx, user)
			middleware.SetUserCache(user.ResourceID, *user, time.Minute*10)
			return nil, util.NewError("E40036", "MFA verification code is invalid")
		}
	case "email":
		valid := tokenData.Code == mfaCode
		if !valid {
			user.Lock(time.Duration(time.Second * 30))
			s.UserLoginFailed(ctx, user)
			middleware.SetUserCache(user.ResourceID, *user, time.Minute*10)
			return nil, util.NewError("E40036", "MFA verification code is invalid")
		}
	default:
		return nil, util.NewError("E5001", fmt.Sprintf("MFA type %s is not supported", user.MFAType))
	}
	s.baseService.DeleteCache(ctx, fmt.Sprintf("ez-console:login:code:%s", mfaToken))
	// Verify user status
	if user.Status == model.UserStatusDisabled {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4011",
			Err:      err,
			Message:  "Account is disabled",
		}
	}

	// Check user account lock status
	if user.IsLocked() {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4011",
			Err:      err,
			Message:  "Account is locked, please try again later",
		}
	}

	user.LoginAttempts = 0
	db.Session(ctx).Model(&user).Select("LoginAttempts").Updates(&user)

	// Generate JWT token
	token, err := middleware.GenerateToken(ctx, tokenData.Source, user.ResourceID, user.Username, time.Duration(securitySettings.SessionTimeoutMinutes)*time.Minute)
	if err != nil {
		return nil, errors.New("failed to generate token")
	}
	return &LoginResponse{
		Token:           token,
		User:            *user,
		PasswordExpired: user.Status == model.UserStatusPasswordExpired || (securitySettings.PasswordExpiryDays > 0 && user.IsPasswordExpired(securitySettings.PasswordExpiryDays)),
		ExpiresAt:       time.Now().Add(time.Duration(securitySettings.SessionTimeoutMinutes) * time.Minute),
	}, nil
}

func (s *UserService) GenerateMFA(ctx context.Context, user *model.User, source middleware.JWTIssuer) (*LoginResponse, error) {
	logger := log.GetContextLogger(ctx)
	var err error
	token := MFATokenData{
		Token:   uuid.New().String(),
		MFAType: user.MFAType,
		UserID:  user.ResourceID,
		Source:  source,
	}

	var expiresAt = time.Now().Add(time.Minute * 10)
	// MFA verification required, but no verification code provided
	switch user.MFAType {
	case "totp":
	case "email":
		token.Code = util.GenerateRandomString(6)
		if user.Email == "" {
			return nil, util.NewError("E40036", "Email is not set")
		}
		level.Info(logger).Log("msg", "Sending MFA code to user", "user", user.Username, "email", user.Email)
		err = s.baseService.SendEmailFromTemplate(ctx, []string{user.Email}, "MFA Verification Code", model.SettingSMTPMFACodeTemplate, map[string]any{
			"Code":     token.Code,
			"Username": user.Username,
			"UserID":   user.ResourceID,
			"Email":    user.Email,
			"Avatar":   user.Avatar,
			"FullName": user.FullName,
			"Expires":  expiresAt,
		})
		if err != nil {
			return nil, util.NewError("E5001", "Failed to send MFA code", err)
		}
	default:
		return nil, util.NewError("E5001", fmt.Sprintf("MFA type %s is not supported", user.MFAType))
	}
	safeToken := safe.NewEncryptedString(w.JSONStringer(token).String(), os.Getenv(safe.SecretEnvName))
	_, err = s.baseService.CreateCache(ctx, fmt.Sprintf("ez-console:login:code:%s", token.Token), safeToken.String(), expiresAt)
	if err != nil {
		return nil, util.NewError("E5001", "Failed to create MFA code", err)
	}
	return &LoginResponse{
		User:     *user,
		NeedsMFA: true,
		MFAType:  user.MFAType,
		MFAToken: token.Token,
	}, nil
}

// Login user login verification
func (s *UserService) Login(ctx context.Context, username, password string) (*LoginResponse, error) {

	securitySettings, err := s.baseService.GetSecuritySettings(ctx)
	if err != nil {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E50012",
			Err:      err,
		}
	}

	// Attempt LDAP authentication
	user, err := s.ldapService.AuthenticateUser(ctx, username, password)
	if err != nil {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4011",
			Err:      err,
			Message:  "Invalid username or password",
		}
	}
	if user == nil {
		// Find user
		user = &model.User{}
		err := db.Session(ctx).Where("username = ? OR email = ?", username, username).First(&user).Error
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, util.ErrorResponse{
					HTTPCode: http.StatusUnauthorized,
					Code:     "E4011",
					Err:      err,
					Message:  "Invalid username or password",
				}
			}
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusInternalServerError,
				Code:     "E5001",
				Err:      err,
				Message:  "System error, please contact the administrator",
			}
		}

		// Verify password
		if !user.CheckPassword(password) {
			// Record login failure and lock account according to configuration
			s.UserLoginFailed(ctx, user)
			if cacheUser, ok := middleware.GetUserCache(user.ResourceID); ok {
				cacheUser.LoginAttempts = user.LoginAttempts
				cacheUser.LockedUntil = user.LockedUntil
				middleware.SetUserCache(user.ResourceID, cacheUser, time.Minute*10)
			}

			return nil, util.ErrorResponse{
				HTTPCode: http.StatusUnauthorized,
				Code:     "E4011",
				Err:      err,
				Message:  "Invalid username or password",
			}
		}
	}

	// Verify user status
	if user.Status == model.UserStatusDisabled {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4011",
			Err:      err,
			Message:  "Account is disabled",
		}
	}

	// Check user account lock status
	if user.IsLocked() {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4011",
			Err:      err,
			Message:  "Account is locked, please try again later",
		}
	}

	// Verify MFA
	if user.MFAEnabled {
		return s.GenerateMFA(ctx, user, middleware.JWTIssuerLogin)
	}

	// Login successful, update login information
	user.LastLogin = time.Now()
	user.LoginAttempts = 0
	user.MFASecret = nil // For security reasons, do not return the MFA secret in the response
	db.Session(ctx).Select("LastLogin", "LoginAttempts").Save(&user)

	if err := db.Session(ctx).Model(&user).Preload("Roles.Permissions").First(&user).Error; err != nil {
		return nil, err
	}

	middleware.SetUserCache(user.ResourceID, *user, time.Minute*10)

	// Generate JWT token
	token, err := middleware.GenerateToken(ctx, middleware.JWTIssuerLogin, user.ResourceID, user.Username, time.Duration(securitySettings.SessionTimeoutMinutes)*time.Minute)
	if err != nil {
		return nil, errors.New("failed to generate token")
	}
	{
		mfaEnforced, _ := s.baseService.GetBoolSetting(ctx, model.SettingMFAEnforced, false)
		if mfaEnforced {
			user.MFAEnforced = true
		}
	}
	// If MFA is enforced but the user has not enabled MFA, do not return the user's permission information
	if user.MFAEnforced && !user.MFAEnabled {
		user.Roles = []model.Role{}
	}
	// Return login result
	return &LoginResponse{
		Token:           token,
		User:            *user,
		NeedsMFA:        false,
		PasswordExpired: user.Status == model.UserStatusPasswordExpired || (securitySettings.PasswordExpiryDays > 0 && user.IsPasswordExpired(securitySettings.PasswordExpiryDays)),
		ExpiresAt:       time.Now().Add(time.Duration(securitySettings.SessionTimeoutMinutes) * time.Minute),
	}, nil
}

func (s *UserService) createUser(ctx context.Context, req CreateUserRequest) (*model.User, error) {
	dbConn := db.Session(ctx)
	// Check if username already exists
	var existingUser model.User
	result := dbConn.Where("username = ?", req.Username).First(&existingUser)
	if result.Error == nil {
		return nil, fmt.Errorf("username %s already exists", req.Username)
	} else if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, result.Error
	}

	// Check if email already exists
	result = dbConn.Where("email = ?", req.Email).First(&existingUser)
	if result.Error == nil {
		return nil, fmt.Errorf("email %s already exists", req.Email)
	} else if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, result.Error
	}

	// Create user object
	user := model.User{
		Username:    req.Username,
		Email:       req.Email,
		FullName:    req.FullName,
		Phone:       req.Phone,
		Avatar:      req.Avatar,
		Status:      model.UserStatusActive,
		MFAEnforced: req.MFAEnforced,
	}

	// Generate avatar if not provided
	if user.Avatar == "" {
		user.Avatar = util.GenerateAvatar(req.Username)
	}

	// Set password
	if err := user.SetPassword(req.Password); err != nil {
		return nil, fmt.Errorf("failed to set password: %w", err)
	}
	err := dbConn.Transaction(func(tx *gorm.DB) error {
		// Create user in database
		if err := tx.Create(&user).Error; err != nil {
			return fmt.Errorf("failed to create user: %w", err)
		}
		// Assign roles
		if len(req.RoleIDs) > 0 {
			if err := tx.Where("resource_id IN ?", req.RoleIDs).Find(&user.Roles).Error; err != nil {
				return fmt.Errorf("update user roles failed: %w", err)
			}
			if err := tx.Model(&user).Association("Roles").Append(user.Roles); err != nil {
				return fmt.Errorf("assign roles to user failed: %w", err)
			}
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// CreateUser creates a new user
func (s *UserService) CreateUser(ctx context.Context, req CreateUserRequest) (*model.User, error) {
	// Validate password complexity
	// Check password complexity
	isValid, err := s.baseService.IsPasswordComplexityMet(ctx, req.Password)
	if err != nil {
		return nil, fmt.Errorf("check password complexity failed: %w", err)
	}
	if !isValid {
		minLength, _ := s.baseService.GetIntSetting(ctx, model.SettingPasswordMinLength, 8)
		complexityType, _ := s.baseService.GetStringSetting(ctx, model.SettingPasswordComplexity, string(model.PasswordComplexityMedium))

		var complexityMessage string
		switch model.PasswordComplexity(complexityType) {
		case model.PasswordComplexityLow:
			complexityMessage = "can be any character"
		case model.PasswordComplexityMedium:
			complexityMessage = "must contain any two combinations of uppercase letters, lowercase letters, and numbers"
		case model.PasswordComplexityHigh:
			complexityMessage = "must contain uppercase letters, lowercase letters, and numbers"
		case model.PasswordComplexityVeryHigh:
			complexityMessage = "must contain uppercase letters, lowercase letters, numbers, and special characters"
		}

		return nil, fmt.Errorf("password does not meet complexity requirements, password length must be at least %d, %s", minLength, complexityMessage)
	}
	return s.createUser(ctx, req)
}

// Register user registration, called internally
func (s *UserService) Register(ctx context.Context, req CreateUserRequest) (*model.User, error) {
	return s.createUser(ctx, req)
}

// GetUserIDByUsername gets user ID by username
func (s *UserService) GetUserIDByUsername(ctx context.Context, username string) (string, error) {
	var userId string
	if err := db.Session(ctx).Model(&model.User{}).Where(&model.User{Username: username}).Select("resource_id").First(&userId).Error; err != nil {
		return "", err
	}
	return userId, nil
}

type GetUserByIDOptions struct {
	WithRoles       bool
	WithCache       bool
	WithPermissions bool
	WithSoftDeleted bool
}

type WithGetUserByIDOptions func(opts *GetUserByIDOptions)

func WithRoles(withRoles bool) WithGetUserByIDOptions {
	return func(opts *GetUserByIDOptions) {
		opts.WithRoles = withRoles
	}
}

func WithCache(withCache bool) WithGetUserByIDOptions {
	return func(opts *GetUserByIDOptions) {
		opts.WithCache = withCache
	}
}

func WithPermissions(withPermissions bool) WithGetUserByIDOptions {
	return func(opts *GetUserByIDOptions) {
		opts.WithPermissions = withPermissions
	}
}

func WithSoftDeleted(withSoftDeleted bool) WithGetUserByIDOptions {
	return func(opts *GetUserByIDOptions) {
		opts.WithSoftDeleted = withSoftDeleted
	}
}

// GetUserByID gets user by ID
func (s *UserService) GetUserByID(ctx context.Context, id string, opts ...WithGetUserByIDOptions) (*model.User, error) {
	if id == "" {
		return nil, errors.New("user ID cannot be empty")
	}

	option := GetUserByIDOptions{}
	for _, opt := range opts {
		opt(&option)
	}
	if option.WithCache {
		// Try to get from cache first
		if cacheUser, found := middleware.GetUserCache(id); found {
			if !option.WithPermissions {
				if !option.WithRoles {
					cacheUser.Roles = []model.Role{}
				} else {
					cacheUser.Roles = w.Map(cacheUser.Roles, func(role model.Role) model.Role {
						role.Permissions = []model.Permission{}
						return role
					})
				}
			}

			return &cacheUser, nil
		}
	}

	query := db.Session(ctx).Model(&model.User{}).Where("resource_id = ?", id)
	if option.WithSoftDeleted {
		query = query.Unscoped()
	}
	var user model.User
	if option.WithPermissions {
		query = query.Preload("Roles.Permissions")
	} else if option.WithRoles {
		query = query.Preload("Roles")
	}
	// If not found in cache, get from database
	if err := query.First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, util.NewError("E4041", "user not found", err)
		}
		return nil, err
	}

	if option.WithCache && option.WithPermissions {
		middleware.SetUserCache(user.ResourceID, user, time.Minute*10)
	}
	return &user, nil
}

var systemAttrs = []string{"entryUUID", "createTimestamp", "modifyTimestamp", "memberOf"}

// ListUsers lists users
func (s *UserService) ListUsers(ctx context.Context, keywords, status string, current, pageSize int) ([]model.User, int64, error) {
	passwordExpiryDays, err := s.baseService.GetIntSetting(ctx, model.SettingPasswordExpiryDays, 0)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to get password expiry days: %w", err)
	}
	var users []model.User
	var total int64

	query := db.Session(ctx).Model(&model.User{})

	if keywords != "" {
		query = query.Where("username LIKE ? OR email LIKE ? OR full_name LIKE ?", "%"+keywords+"%", "%"+keywords+"%", "%"+keywords+"%")
	}

	switch status {
	case model.UserStatusDeleted:
		query = query.Unscoped().Where("deleted_at IS NOT NULL")
	case model.UserStatusLocked:
		query = query.Where("locked_until > ?", time.Now())
	case model.UserStatusPasswordExpired:
		if passwordExpiryDays > 0 {
			query = query.Where("password_changed_at < ?", time.Now().Add(-time.Duration(passwordExpiryDays)*24*time.Hour))
		}
	case model.UserStatusActive, model.UserStatusDisabled:
		query = query.Where("status = ?", status)
	}

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	// Pagination query
	offset := (current - 1) * pageSize
	if err := query.Offset(offset).Limit(pageSize).Order("created_at desc").Preload("Roles").Find(&users).Error; err != nil {
		return nil, 0, err
	}
	if status == "deleted" {
		for i := range users {
			users[i].Status = "deleted"
		}
	}
	ldapDNs := w.Map(w.Filter(users, func(user model.User) bool {
		return user.Source == model.UserSourceLDAP && user.LDAPDN != ""
	}), func(user model.User) string {
		return user.LDAPDN
	})
	ldapSession, err := s.ldapService.GetLDAPSession(ctx)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to get LDAP session: %w", err)
	}
	defer ldapSession.Close()

	settings, err := s.baseService.GetLDAPSettings(ctx)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to get LDAP settings: %w", err)
	}
	// Get information from LDAP
	for _, ldapDN := range ldapDNs {
		searchRequest := ldap.NewSearchRequest(
			ldapDN,
			ldap.ScopeBaseObject, ldap.NeverDerefAliases, 0, 0, false,
			"(objectClass=*)",
			append([]string{"*"}, systemAttrs...),
			[]ldap.Control{},
		)
		result, err := ldapSession.Search(searchRequest)
		if err != nil {
			continue
		}
		if len(result.Entries) == 0 {
			continue
		}
		entry := result.Entries[0]
		for i, user := range users {
			if user.LDAPDN == ldapDN {
				users[i].Email = entry.GetAttributeValue(settings.EmailAttr)
				users[i].FullName = entry.GetAttributeValue(settings.DisplayNameAttr)
				users[i].Username = entry.GetAttributeValue(settings.UserAttr)
				users[i].Source = model.UserSourceLDAP
				users[i].Base = model.Base{
					ID:         user.ID,
					ResourceID: user.ResourceID,
					CreatedAt:  util.SafeParseTime("20060102150405Z", entry.GetAttributeValue("createTimestamp")),
					UpdatedAt:  util.SafeParseTime("20060102150405Z", entry.GetAttributeValue("modifyTimestamp")),
				}
			}
		}
	}
	users = w.Map(users, func(user model.User) model.User {
		if user.IsDeleted() {
			user.Status = model.UserStatusDeleted
		} else if user.IsLocked() {
			user.Status = model.UserStatusLocked
		} else if user.IsPasswordExpired(passwordExpiryDays) {
			user.Status = model.UserStatusPasswordExpired
		}
		return user
	})
	return users, total, nil
}

// PatchUser updates user information
func (s *UserService) PatchUser(ctx context.Context, req UpdateUserRequest, user *model.User) (*model.User, error) {
	selectFields := []string{}
	if req.Email != "" {
		// Check if email already exists
		var existingUser model.User
		result := db.Session(ctx).Where("email = ? AND resource_id != ?", req.Email, user.ResourceID).First(&existingUser)
		if result.Error == nil {
			return nil, fmt.Errorf("email %s already exists", req.Email)
		} else if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, result.Error
		}
		user.Email = req.Email
		selectFields = append(selectFields, "Email")
	}

	if req.FullName != "" {
		user.FullName = req.FullName
		selectFields = append(selectFields, "FullName")
	}

	if req.Phone != "" {
		user.Phone = req.Phone
		selectFields = append(selectFields, "Phone")
	}

	if req.Avatar != "" {
		user.Avatar = req.Avatar
		selectFields = append(selectFields, "Avatar")
	}

	if req.Status != "" && (req.Status == model.UserStatusActive || req.Status == model.UserStatusDisabled) {
		user.Status = req.Status
		selectFields = append(selectFields, "Status")
	}

	if req.MFAEnforced != nil {
		user.MFAEnforced = *req.MFAEnforced
		selectFields = append(selectFields, "MFAEnforced")
	}
	var newRoles []model.Role
	if req.RoleIDs != nil && len(*req.RoleIDs) > 0 {
		if err := db.Session(ctx).Where("resource_id IN ?", *req.RoleIDs).Find(&newRoles).Error; err != nil {
			return nil, fmt.Errorf("update user roles failed: %w", err)
		}
	}
	if req.Source != "" {
		user.Source = model.UserSource(req.Source)
		if req.Source == string(model.UserSourceLDAP) && req.LDAPDN == "" {
			return nil, fmt.Errorf("LDAPDN is required")
		}
		selectFields = append(selectFields, "Source")
	}
	if req.LDAPDN != "" {
		entry, err := s.ldapService.GetLDAPEntry(ctx, req.LDAPDN, []string{"dn"})
		if err != nil {
			return nil, fmt.Errorf("failed to get LDAP entry: %w", err)
		}
		if entry == nil {
			return nil, fmt.Errorf("LDAP entry not found")
		}
		user.LDAPDN = req.LDAPDN
		selectFields = append(selectFields, "LDAPDN")
	}
	err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if len(selectFields) > 0 {
			if err := tx.Where("resource_id = ?", user.ResourceID).Select(selectFields).Save(&user).Error; err != nil {
				return fmt.Errorf("update user failed: %w", err)
			}
		}

		if req.RoleIDs != nil {
			if err := tx.Model(user).Omit("Roles.*").Association("Roles").Replace(&newRoles); err != nil {
				return fmt.Errorf("update user roles failed: %w", err)
			}
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	middleware.DeleteUserCache(user.ResourceID)
	return user, nil
}

// DeleteUser deletes a user
func (s *UserService) DeleteUser(ctx context.Context, id string) error {
	var user model.User
	dbConn := db.Session(ctx)
	err := dbConn.Unscoped().Where("resource_id = ?", id).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("user not found")
		}
		return err
	}

	// Administrator cannot delete themselves
	currentUser := middleware.GetUserFromContext(ctx)
	if currentUser == nil {
		return errors.New("failed to get current user info")
	}
	if currentUser.ResourceID == id {
		return errors.New("cannot delete yourself")
	}

	return dbConn.Transaction(func(tx *gorm.DB) error {

		if user.DeletedAt.Valid {
			return tx.Unscoped().Select("Roles").Delete(&user).Error
		}
		result := tx.Where("resource_id = ?", id).Delete(&model.User{})
		if result.Error != nil {
			return result.Error
		}
		return nil
	})

}

// ChangePassword changes the user's password
func (s *UserService) ChangePassword(ctx context.Context, id string, req ChangePasswordRequest) error {
	var user model.User
	dbConn := db.Session(ctx)
	ldapSession, err := s.ldapService.GetLDAPSession(ctx)
	if err != nil {
		return fmt.Errorf("failed to get LDAP session: %w", err)
	}
	defer ldapSession.Close()
	if err := dbConn.Where("resource_id = ?", id).First(&user).Error; err != nil {
		return util.NewError("E4041", "user not found", err)
	}

	// Check if new password is the same as old password
	if req.OldPassword == req.NewPassword {
		return util.NewError("E40031", "new password cannot be the same as the old password")
	}

	// Check if old password is correct
	switch user.Source {
	case model.UserSourceLDAP:
		settings, err := s.baseService.GetLDAPSettings(ctx)
		if err != nil {
			return fmt.Errorf("failed to get LDAP settings: %w", err)
		}
		loginConn, err := clientsldap.NewConn(ctx, settings)
		if err != nil {
			return fmt.Errorf("failed to create LDAP connection: %w", err)
		}
		defer loginConn.Close()

		// Try to bind with user credentials
		userDN := user.LDAPDN
		if err := loginConn.Bind(userDN, req.OldPassword); err != nil {
			return util.NewError("E40032", "old password is incorrect")
		}

	case model.UserSourceLocal:
		if !user.CheckPassword(req.OldPassword) {
			return util.NewError("E40032", "old password is incorrect")
		}
	default:
		return util.NewError("E40033", "Your account does not support changing passwords", fmt.Errorf("user source %s is not supported", user.Source))
	}

	// Check password complexity
	isValid, err := s.baseService.IsPasswordComplexityMet(ctx, req.NewPassword)
	if err != nil {
		return util.NewError("E40034", "check password complexity failed", err)
	}
	if !isValid {
		minLength, _ := s.baseService.GetIntSetting(ctx, model.SettingPasswordMinLength, 8)
		complexityType, _ := s.baseService.GetStringSetting(ctx, model.SettingPasswordComplexity, string(model.PasswordComplexityMedium))

		var complexityMessage string
		switch model.PasswordComplexity(complexityType) {
		case model.PasswordComplexityLow:
			complexityMessage = "can be any character"
		case model.PasswordComplexityMedium:
			complexityMessage = "must contain any two combinations of uppercase letters, lowercase letters, and numbers"
		case model.PasswordComplexityHigh:
			complexityMessage = "must contain uppercase letters, lowercase letters, and numbers"
		case model.PasswordComplexityVeryHigh:
			complexityMessage = "must contain uppercase letters, lowercase letters, numbers, and special characters"
		}

		return util.NewError("E40035", fmt.Sprintf("password does not meet complexity requirements, password length must be at least %d, %s", minLength, complexityMessage))
	}

	// If history password check is enabled, check if new password has been used recently
	historyCheck, _ := s.baseService.GetBoolSetting(ctx, model.SettingHistoryPasswordCheck, false)
	if historyCheck {
		historyCount, _ := s.baseService.GetIntSetting(ctx, model.SettingHistoryPasswordCount, 3)

		// Check if new password has been used recently
		var passwordHistories []model.PasswordHistory
		if err := dbConn.Where("user_id = ?", user.ResourceID).Order("created_at desc").Limit(historyCount).Find(&passwordHistories).Error; err != nil {
			return fmt.Errorf("check password history failed: %w", err)
		}

		for _, history := range passwordHistories {
			// Check if new password is the same as history password
			err := bcrypt.CompareHashAndPassword([]byte(history.PasswordHash), []byte(req.NewPassword+history.Salt))
			if err == nil {
				return util.NewError("E40036", fmt.Sprintf("new password cannot be the same as the last %d passwords", historyCount))
			}
		}
	}

	dbConn.Transaction(func(tx *gorm.DB) error {
		if tx.Error != nil {
			return tx.Error
		}
		{
			// Add old password to history
			salt, hashedPassword, err := util.BcryptPassword(req.NewPassword)
			if err != nil {
				return fmt.Errorf("failed to hash password: %w", err)
			}
			passwordHistory := model.PasswordHistory{
				UserID:       user.ResourceID,
				PasswordHash: hashedPassword,
				Salt:         salt,
			}
			if err := tx.Create(&passwordHistory).Error; err != nil {
				return fmt.Errorf("save password history failed: %w", err)
			}
		}
		if user.Source == model.UserSourceLocal {
			// Set new password
			if err := user.SetPassword(req.NewPassword); err != nil {
				return fmt.Errorf("set password failed: %w", err)
			}
		} else {
			user.Password = ""
			user.Salt = ""
		}
		// Update password change time
		user.PasswordChangedAt = time.Now()
		if user.Status == model.UserStatusPasswordExpired {
			user.Status = model.UserStatusActive // Restore user status to active (if it was password expired)
		}

		// Save user info
		if err := tx.Select("Password", "Salt", "PasswordChangedAt", "Status").Save(&user).Error; err != nil {
			return fmt.Errorf("save user info failed: %w", err)
		}
		// If user is LDAP user, update LDAP password
		if user.Source == model.UserSourceLDAP {
			hashedPassword, err := util.Sha256CryptPassword("{CRYPT}", req.NewPassword)
			if err != nil {
				return fmt.Errorf("failed to hash password: %w", err)
			}
			modifyRequest := ldap.NewModifyRequest(user.LDAPDN, nil)
			modifyRequest.Replace("userPassword", []string{hashedPassword})
			if err := ldapSession.Modify(modifyRequest); err != nil {
				return fmt.Errorf("failed to modify LDAP password: %w", err)
			}
		}
		middleware.DeleteUserCache(user.ResourceID)
		return nil
	})
	return nil
}

// ResetPassword resets the user's password (administrator operation)
func (s *UserService) ResetPassword(ctx context.Context, userID string, newPassword string) (sendEmail bool, err error) {
	ldapSession, err := s.ldapService.GetLDAPSession(ctx)
	if err != nil {
		return false, fmt.Errorf("failed to get LDAP session: %w", err)
	}
	defer ldapSession.Close()

	dbConn := db.Session(ctx)
	var user model.User
	if err := dbConn.Where("resource_id = ?", userID).First(&user).Error; err != nil {
		return false, fmt.Errorf("failed to find user: %w", err)
	}

	err = dbConn.Transaction(func(tx *gorm.DB) error {
		if err := tx.Error; err != nil {
			return fmt.Errorf("failed to start transaction: %w", err)
		}
		{
			// Add old password to history
			salt, hashedPassword, err := util.BcryptPassword(newPassword)
			if err != nil {
				return fmt.Errorf("save password history failed: failed to hash password: %w", err)
			}
			passwordHistory := model.PasswordHistory{
				UserID:       user.ResourceID,
				PasswordHash: hashedPassword,
				Salt:         salt,
			}
			if err := tx.Create(&passwordHistory).Error; err != nil {
				return fmt.Errorf("save password history failed: %w", err)
			}
		}
		// Update password change time
		if user.Source == model.UserSourceLocal {
			// Set new password
			if err := user.SetPassword(newPassword); err != nil {
				return fmt.Errorf("set password failed: %w", err)
			}
		} else {
			user.Password = ""
			user.Salt = ""
		}

		user.PasswordChangedAt = time.Now()
		if user.Status == model.UserStatusActive {
			user.Status = model.UserStatusPasswordExpired // Set user status to password expired
		}
		user.LockedUntil = time.Time{}
		user.LoginAttempts = 0

		// Save user info
		if err := tx.Select("Password", "Salt", "PasswordChangedAt", "Status", "LockedUntil", "LoginAttempts").Save(&user).Error; err != nil {
			return fmt.Errorf("save user info failed: %w", err)
		}
		// If user is LDAP user, update LDAP password
		if user.Source == model.UserSourceLDAP {
			hashedPassword, err := util.Sha256CryptPassword("{CRYPT}", newPassword)
			if err != nil {
				return fmt.Errorf("failed to hash password: %w", err)
			}
			modifyRequest := ldap.NewModifyRequest(user.LDAPDN, nil)
			modifyRequest.Replace("userPassword", []string{hashedPassword})
			if err := ldapSession.Modify(modifyRequest); err != nil {
				return fmt.Errorf("failed to modify LDAP password: %w", err)
			}
		}
		return nil
	})
	if err != nil {
		return false, fmt.Errorf("failed to reset password: %w", err)
	}
	if user.Email != "" {
		middleware.DeleteUserCache(user.ResourceID)
		err = s.baseService.SendEmailFromTemplate(ctx, []string{user.Email}, "Password Reset", model.SettingSMTPResetPasswordTemplate, map[string]any{
			"Username": user.Username,
			"Password": newPassword,
			"UserID":   user.ResourceID,
			"Email":    user.Email,
			"Avatar":   user.Avatar,
			"FullName": user.FullName,
		})
		if err != nil {
			return false, nil
		}
		return true, nil
	}
	return false, nil
}

// EnableMFA enables MFA for the user
func (s *UserService) EnableMFA(ctx context.Context, userID string, mfaType string) (*EnableMFAResponse, error) {
	logger := log.GetContextLogger(ctx)
	user, err := s.GetUserByID(ctx, userID, WithCache(true))
	if err != nil {
		return nil, err
	}
	switch mfaType {
	case "totp":
		// Use TOTP algorithm to generate key
		key, err := totp.Generate(totp.GenerateOpts{
			Issuer:      "EZ-Console",
			AccountName: user.Email,
		})
		if err != nil {
			return nil, fmt.Errorf("generate MFA key failed: %w", err)
		}

		// Save MFA key, but do not enable MFA immediately
		user.MFASecret = safe.NewEncryptedString(key.Secret(), os.Getenv(safe.SecretEnvName))
		if err := db.Session(ctx).Select("MFASecret").Save(user).Error; err != nil {
			return nil, fmt.Errorf("save MFA key failed: %w", err)
		}

		middleware.DeleteUserCache(user.ResourceID)

		// Return key and QR code URL
		return &EnableMFAResponse{
			Secret: key.Secret(),
			QRCode: key.URL(),
		}, nil
	case "email":
		if user.Email == "" {
			return nil, fmt.Errorf("email is not set")
		}
		expiresAt := time.Now().Add(time.Minute * 10)
		token := uuid.New().String()
		code := util.GenerateRandomString(6)
		level.Info(logger).Log("msg", "Sending MFA code to user", "user", user.Username, "email", user.Email)
		err = s.baseService.SendEmailFromTemplate(ctx, []string{user.Email}, "MFA Verification Code", model.SettingSMTPMFACodeTemplate, map[string]any{
			"Code":     code,
			"Username": user.Username,
			"UserID":   user.ResourceID,
			"Email":    user.Email,
			"Avatar":   user.Avatar,
			"FullName": user.FullName,
			"Expires":  expiresAt,
		})
		if err != nil {
			return nil, fmt.Errorf("failed to send email: %w", err)
		}
		safeCode := safe.NewEncryptedString(code, os.Getenv(safe.SecretEnvName))
		_, err = s.baseService.CreateCache(ctx, fmt.Sprintf("ez-console:mfa:activation:%s", token), safeCode.String(), expiresAt)
		if err != nil {
			return nil, fmt.Errorf("failed to create cache: %w", err)
		}
		return &EnableMFAResponse{
			Token: token,
		}, nil
	default:
		return nil, fmt.Errorf("invalid MFA type: %s", mfaType)
	}
}

func (s *UserService) VerifyAndActivateEmailMFA(ctx context.Context, userID string, token string, code string) error {
	user, err := s.GetUserByID(ctx, userID, WithCache(true))
	if err != nil {
		return err
	}
	cache, err := s.baseService.GetCache(ctx, fmt.Sprintf("ez-console:mfa:activation:%s", token))
	if err != nil {
		return fmt.Errorf("failed to get cache: %w", err)
	}
	s.baseService.DeleteCache(ctx, fmt.Sprintf("ez-console:mfa:activation:%s", token))
	safeCode := safe.NewEncryptedString(cache.Value, os.Getenv(safe.SecretEnvName))
	if !safeCode.Equal(*safe.NewEncryptedString(code, os.Getenv(safe.SecretEnvName))) {
		return errors.New("MFA verification code is invalid")
	}
	user.MFAEnabled = true
	user.MFAType = "email"
	user.MFASecret = nil

	if err := db.Session(ctx).Select("MFAEnabled", "MFASecret", "MFAType").Save(user).Error; err != nil {
		return fmt.Errorf("activate MFA failed: %w", err)
	}

	middleware.DeleteUserCache(user.ResourceID)
	return nil
}

// VerifyAndActivateTOTPMFA verifies the MFA code and activates TOTP MFA for the user
func (s *UserService) VerifyAndActivateTOTPMFA(ctx context.Context, userID string, code string) error {
	user, err := s.GetUserByID(ctx, userID, WithCache(true))
	if err != nil {
		return err
	}

	// Verify MFA code
	if user.MFASecret == nil {
		return errors.New("MFA key not set")
	}
	secret, err := user.MFASecret.UnsafeString()
	if err != nil {
		return fmt.Errorf("MFA key is invalid: %w", err)
	}
	valid := totp.Validate(code, secret)
	if !valid {
		return errors.New("MFA verification code is invalid")
	}

	// Activate MFA
	user.MFAEnabled = true
	user.MFAType = "totp"
	if err := db.Session(ctx).Select("MFAEnabled", "MFASecret", "MFAType").Save(user).Error; err != nil {
		return fmt.Errorf("activate MFA failed: %w", err)
	}

	middleware.DeleteUserCache(user.ResourceID)
	return nil
}

// DisableMFA disables MFA for the user
func (s *UserService) DisableMFA(ctx context.Context, userID string) error {
	user, err := s.GetUserByID(ctx, userID, WithCache(true))
	if err != nil {
		return err
	}

	if !user.MFAEnabled {
		return errors.New("MFA is not enabled")
	}

	user.MFAEnabled = false
	user.MFASecret = nil
	user.MFAType = ""

	if err := db.Session(ctx).Select("MFAEnabled", "MFASecret", "MFAType").Save(user).Error; err != nil {
		return fmt.Errorf("failed to disable MFA: %w", err)
	}
	middleware.DeleteUserCache(user.ResourceID)
	return nil
}

// AssignRoles assigns roles to a user
func (s *UserService) AssignRoles(ctx context.Context, userID string, roleIDs []string) error {
	user, err := s.GetUserByID(ctx, userID, WithRoles(true), WithCache(true))
	if err != nil {
		return err
	}

	// Clear existing roles
	if err := db.Session(ctx).Model(user).Association("Roles").Clear(); err != nil {
		return fmt.Errorf("clear user roles failed: %w", err)
	}

	// Return if no new roles
	if len(roleIDs) == 0 {
		return nil
	}

	// Find and assign new roles
	var roles []model.Role
	if err := db.Session(ctx).Where("resource_id IN ?", roleIDs).Find(&roles).Error; err != nil {
		return fmt.Errorf("find roles failed: %w", err)
	}

	if len(roles) == 0 {
		return errors.New("roles not found")
	}
	if err := db.Session(ctx).Model(user).Association("Roles").Replace(roles); err != nil {
		return fmt.Errorf("assign roles failed: %w", err)
	}
	user.Roles = roles
	middleware.DeleteUserCache(user.ResourceID)

	return nil
}

func (s *UserService) GetLdapUsers(ctx context.Context, skipExisting bool) ([]model.User, error) {
	logger := log.GetContextLogger(ctx)
	settings, err := s.baseService.GetLDAPSettings(ctx)
	if err != nil {
		return nil, err
	}
	filter := fmt.Sprintf("(&(|(%s=%s)(%s=%s))%s)", settings.UserAttr, "*", settings.EmailAttr, "*", settings.UserFilter)
	attributes := []string{settings.UserAttr, settings.EmailAttr, settings.DisplayNameAttr, "entryUUID", "createTimestamp", "modifyTimestamp"}
	entries, err := s.ldapService.FilterLDAPEntries(ctx, settings.BaseDN, filter, attributes)
	if err != nil {
		return nil, fmt.Errorf("failed to filter LDAP entries: %w", err)
	}
	var users []model.User
	conn := db.Session(ctx)
	if skipExisting {
		// Batch match user information from database by ldapDN, 20 at a time
		for i := 0; i < len(entries); i += 20 {
			var existingUsers []model.User
			batch := entries[i:min(i+20, len(entries))]
			userDNs := w.Map(batch, func(entry *ldap.Entry) string {
				return entry.DN
			})
			err := conn.Model(&model.User{}).Where("ldap_dn IN (?)", userDNs).Find(&existingUsers).Error
			if err != nil {
				return nil, fmt.Errorf("failed to get users: %w", err)
			}
			for _, entry := range batch {
				user := w.Find(existingUsers, func(user model.User) bool {
					return user.LDAPDN == entry.DN
				})
				if user.ResourceID != "" {
					// If already exists, skip
					continue
				}
				var existingUser model.User
				if err := conn.Unscoped().Where("username = ? or email = ?", entry.GetAttributeValue(settings.UserAttr), entry.GetAttributeValue(settings.EmailAttr)).Order("username").First(&existingUser).Error; err != nil {
					if err != gorm.ErrRecordNotFound {
						level.Error(logger).Log("msg", "Failed to check existing user", "err", err.Error())
						return nil, fmt.Errorf("failed to check existing user: %w", err)
					}
				} else if existingUser.ResourceID != "" {
					// If username or email matches, mark as bindable (return ID field)
					users = append(users, model.User{
						LDAPDN:   entry.DN,
						Status:   "active",
						Username: entry.GetAttributeValue(settings.UserAttr),
						Email:    entry.GetAttributeValue(settings.EmailAttr),
						FullName: entry.GetAttributeValue(settings.DisplayNameAttr),
						Base: model.Base{
							ResourceID: entry.GetAttributeValue("entryUUID"),
							CreatedAt:  util.SafeParseTime("20060102150405Z", entry.GetAttributeValue("createTimestamp")),
							UpdatedAt:  util.SafeParseTime("20060102150405Z", entry.GetAttributeValue("modifyTimestamp")),
						},
					})
					continue
				}
				// If username or email does not match, mark as new user (do not return ID field)
				users = append(users, model.User{
					LDAPDN:   entry.DN,
					Status:   "active",
					Username: entry.GetAttributeValue(settings.UserAttr),
					Email:    entry.GetAttributeValue(settings.EmailAttr),
					FullName: entry.GetAttributeValue(settings.DisplayNameAttr),
				})
			}
		}
	}

	return users, nil
}

func (s *UserService) RestoreUser(ctx context.Context, userID string) error {
	user, err := s.GetUserByID(ctx, userID, WithCache(true))
	if err != nil {
		return err
	}
	if !user.DeletedAt.Valid {
		return errors.New("user is not deleted")
	}

	dbConn := db.Session(ctx)
	if err := dbConn.Model(&user).Unscoped().Select("Status", "DeletedAt").Updates(map[string]any{
		"status":     model.UserStatusActive,
		"deleted_at": nil,
	}).Error; err != nil {
		return fmt.Errorf("failed to restore user: %w", err)
	}
	middleware.DeleteUserCache(user.ResourceID)

	return nil
}

func (s *UserService) UnlockUser(ctx context.Context, userID string) error {
	user, err := s.GetUserByID(ctx, userID, WithCache(true))
	if err != nil {
		return err
	}

	if !user.IsLocked() {
		return errors.New("user is not locked")
	}

	dbConn := db.Session(ctx)
	if err := dbConn.Model(&user).Select("LockedUntil", "LoginAttempts").Updates(map[string]any{
		"locked_until":   nil,
		"login_attempts": 0,
	}).Error; err != nil {
		return fmt.Errorf("failed to unlock user: %w", err)
	}
	middleware.DeleteUserCache(user.ResourceID)
	return nil
}
