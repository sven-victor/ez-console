package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	keyfunc "github.com/MicahParks/keyfunc/v3"
	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/golang-jwt/jwt/v5"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/safe"
	w "github.com/sven-victor/ez-utils/wrapper"
	"golang.org/x/oauth2"
	"gorm.io/gorm"

	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
)

// OAuthService provides OAuth related services
type OAuthService struct {
	BaseService *BaseService
	UserService *UserService
}

// OAuthLoginURLResponse contains OAuth login URL and state
type OAuthLoginURLResponse struct {
	URL   string `json:"url"`
	State string `json:"state"`
}

// OAuthCallbackRequest OAuth callback request parameters
type OAuthCallbackRequest struct {
	Provider string `json:"provider" binding:"required"`
	Code     string `json:"code" binding:"required"`
	State    string `json:"state" `
}

type OAuth2ProviderConfig struct {
	model.OAuthSettings
	Name         string `json:"name"`
	Nonce        string `json:"nonce"`
	CodeVerifier string `json:"code_verifier"`
}

func (c *OAuth2ProviderConfig) AuthCodeURL(state, nonce, codeChallenge string, opts ...oauth2.AuthCodeOption) string {
	oauth2Config := &oauth2.Config{
		ClientID:    c.ClientID,
		RedirectURL: c.RedirectURI,
		Scopes:      strings.Split(c.Scope, " "),
		Endpoint: oauth2.Endpoint{
			AuthURL:  c.AuthEndpoint,
			TokenURL: c.TokenEndpoint,
		},
	}

	opts = append(opts, oauth2.SetAuthURLParam("nonce", nonce))
	opts = append(opts, oauth2.S256ChallengeOption(codeChallenge))
	return oauth2Config.AuthCodeURL(state, opts...)
}

func (c *OAuth2ProviderConfig) Exchange(ctx context.Context, code string) (*oauth2.Token, error) {
	logger := log.GetContextLogger(ctx)
	var clientSecret string
	if c.ClientSecret != nil {
		var err error
		clientSecret, err = c.ClientSecret.UnsafeString()
		if err != nil {
			return nil, err
		}
	}
	oauth2Config := &oauth2.Config{
		ClientID:     c.ClientID,
		ClientSecret: clientSecret,
		RedirectURL:  c.RedirectURI,
		Scopes:       strings.Split(c.Scope, " "),
		Endpoint: oauth2.Endpoint{
			AuthURL:  c.AuthEndpoint,
			TokenURL: c.TokenEndpoint,
		},
	}

	var opts []oauth2.AuthCodeOption
	if c.CodeVerifier != "" {
		opts = append(opts, oauth2.VerifierOption(c.CodeVerifier))
	}

	token, err := oauth2Config.Exchange(ctx, code, opts...)
	if err != nil {
		return nil, err
	}

	var aToken *jwt.Token
	if c.JWKsURI != "" {
		k, err := keyfunc.NewDefaultCtx(ctx, []string{c.JWKsURI})
		if err != nil {
			level.Error(logger).Log("msg", "Failed to get JWKs", "err", err.Error())
			return nil, err
		}
		aToken, err = jwt.Parse(token.AccessToken, k.Keyfunc)
		if err != nil {
			level.Error(logger).Log("msg", "Failed to parse token with JWKs", "err", err.Error())
			return nil, err
		}
		if !aToken.Valid {
			return nil, errors.New("invalid token")
		}
	}

	if c.Issuer != "" {
		if aToken == nil {
			aToken, _, err = jwt.NewParser().ParseUnverified(token.AccessToken, jwt.MapClaims{})
			if err != nil {
				level.Error(logger).Log("msg", "Failed to parse token", "err", err.Error())
				return nil, err
			}
		}
		issuer, err := aToken.Claims.GetIssuer()
		if err != nil {
			level.Error(logger).Log("msg", "Failed to get issuer", "err", err.Error())
			return nil, fmt.Errorf("invalid token: invalid issuer: %w", err)
		}
		if issuer != c.Issuer {
			level.Error(logger).Log("msg", "Invalid token", "issuer", issuer, "expected", c.Issuer)
			return nil, fmt.Errorf("invalid token: invalid issuer: %s", issuer)
		}
	}

	if c.Nonce != "" {
		if rawIDToken, ok := token.Extra("id_token").(string); ok {
			idToken, _, err := jwt.NewParser().ParseUnverified(rawIDToken, jwt.MapClaims{})
			if err != nil {
				level.Error(logger).Log("msg", "Failed to parse id token", "err", err.Error())
				return nil, err
			}
			claims, ok := idToken.Claims.(jwt.MapClaims)
			if !ok {
				level.Error(logger).Log("msg", "Invalid id token claims")
				return nil, errors.New("invalid token")
			}
			nonce, ok := claims["nonce"].(string)
			if !ok {
				level.Error(logger).Log("msg", "Invalid id token nonce")
				return nil, errors.New("invalid token")
			}
			if nonce != c.Nonce {
				level.Error(logger).Log("msg", "Invalid id token nonce", "nonce", nonce, "expected", c.Nonce)
				return nil, fmt.Errorf("invalid token: invalid nonce: %s", nonce)
			}
		}
	}
	return token, nil
}

func (s *OAuthService) GetOAuth2ProviderConfig(ctx context.Context) []OAuth2ProviderConfig {
	logger := log.GetContextLogger(ctx)
	var providers []OAuth2ProviderConfig
	settings, err := s.BaseService.GetOAuthSettings(ctx)
	if err != nil {
		level.Error(logger).Log("msg", "Failed to get OAuth settings", "err", err.Error())
	} else if settings.Enabled {
		if settings.ClientID == "" || settings.ClientSecret.Size() == 0 {
			level.Error(logger).Log("msg", "OAuth provider is not properly configured", "provider", settings.Provider)
		} else {
			_, err := settings.ClientSecret.UnsafeString()
			if err != nil {
				level.Error(logger).Log("msg", "Failed to get OAuth provider secret", "provider", settings.Provider, "err", err.Error())
			} else {
				providers = append(providers, OAuth2ProviderConfig{
					OAuthSettings: *settings,
					Name:          fmt.Sprintf("settings.%s", settings.Provider),
				})
			}
		}
	}
	cfg := config.GetConfig()
	if cfg.OAuth.GetEnabled() {
		for _, providerCfg := range cfg.OAuth.Providers {
			if providerCfg.GetEnabled() {
				if providerCfg.ClientID != "" && providerCfg.ClientSecret != "" {
					providers = append(providers, OAuth2ProviderConfig{
						OAuthSettings: model.OAuthSettings{
							ClientID:         providerCfg.ClientID,
							ClientSecret:     safe.NewEncryptedString(providerCfg.ClientSecret, os.Getenv(safe.SecretEnvName)),
							RedirectURI:      providerCfg.RedirectURL,
							Scope:            providerCfg.Scopes,
							AuthEndpoint:     providerCfg.AuthURL,
							TokenEndpoint:    providerCfg.TokenURL,
							DisplayName:      providerCfg.DisplayName,
							IconURL:          providerCfg.IconURL,
							UserInfoEndpoint: providerCfg.UserInfoURL,
							EmailField:       providerCfg.EmailField,
							UsernameField:    providerCfg.UsernameField,
							FullNameField:    providerCfg.FullNameField,
							AvatarField:      providerCfg.AvatarField,
							RoleField:        providerCfg.RoleField,
							AutoCreateUser:   providerCfg.AutoCreateUser,

							WellknownEndpoint: providerCfg.WellknownEndpoint,
						},
						Name: providerCfg.Name,
					})
				}
			}
		}
	}
	return providers
}

// GetLoginURL gets OAuth login URL
func (s *OAuthService) GetLoginURL(ctx *gin.Context, provider string) (*OAuthLoginURLResponse, error) {
	var oauth2Config *OAuth2ProviderConfig

	for _, cfg := range s.GetOAuth2ProviderConfig(ctx) {
		if cfg.Name == provider {
			oauth2Config = &cfg
			break
		}
	}

	if oauth2Config == nil {
		return nil, fmt.Errorf("provider not found or not enabled: %s", provider)
	}

	if oauth2Config.Provider == model.OAuthProviderAutoDiscover && oauth2Config.WellknownEndpoint != "" {
		wellknownResp, err := s.autoDiscoverOAuth2Endpoint(ctx, oauth2Config.WellknownEndpoint)
		if err != nil {
			return nil, fmt.Errorf("failed to auto discover OAuth2 endpoint: %w", err)
		}
		oauth2Config.AuthEndpoint = wellknownResp.AuthorizationEndpoint
		oauth2Config.TokenEndpoint = wellknownResp.TokenEndpoint
		oauth2Config.UserInfoEndpoint = wellknownResp.UserInfoEndpoint
		oauth2Config.JWKsURI = wellknownResp.JWKsURI
		oauth2Config.Issuer = wellknownResp.Issuer
	}

	if oauth2Config.RedirectURI == "" {
		basePath := ctx.GetHeader("X-Base-Path")
		if basePath == "" {
			basePath = "/"
		}
		rootURL := util.GetRootURL(ctx)
		oauth2Config.RedirectURI = fmt.Sprintf("%s%s/login?provider=%s", rootURL, basePath, provider)
	}

	// Generate state value
	state := util.GenerateRandomString(32)
	oauth2Config.Nonce = util.GenerateRandomString(16)
	oauth2Config.CodeVerifier = util.GenerateRandomString(32)

	// Generate authorization URL
	authURL := oauth2Config.AuthCodeURL(state, oauth2Config.Nonce, oauth2Config.CodeVerifier)
	// storage state
	_, err := s.BaseService.CreateCache(ctx, fmt.Sprintf("ez-console:oauth:state:%s", state), w.JSONStringer(oauth2Config).String(), time.Now().Add(10*time.Minute))
	if err != nil {
		return nil, fmt.Errorf("failed to create oauth state: %w", err)
	}

	return &OAuthLoginURLResponse{
		URL: authURL,
	}, nil
}

// HandleCallback handles OAuth callback
func (s *OAuthService) HandleCallback(ctx context.Context, req OAuthCallbackRequest) (*LoginResponse, error) {
	logger := log.GetContextLogger(ctx)
	// check state
	cache, err := s.BaseService.GetCache(ctx, fmt.Sprintf("ez-console:oauth:state:%s", req.State))
	if err != nil {
		return nil, fmt.Errorf("failed to get oauth state: %w", err)
	}
	// delete state
	s.BaseService.DeleteCache(ctx, fmt.Sprintf("ez-console:oauth:state:%s", req.State))

	var oauth2Config OAuth2ProviderConfig
	if err := json.Unmarshal([]byte(cache.Value), &oauth2Config); err != nil {
		return nil, fmt.Errorf("failed to unmarshal oauth2 config: %w", err)
	}

	if oauth2Config.TokenEndpoint == "" {
		return nil, fmt.Errorf("invalid oauth2 config")
	}
	verifyToken, err := s.BaseService.GetBoolSetting(ctx, model.SettingOAuthVerifyToken, true)
	if err != nil {
		return nil, fmt.Errorf("failed to get verify token setting: %w", err)
	}
	if !verifyToken {
		oauth2Config.JWKsURI = ""
		oauth2Config.Issuer = ""
	}

	verifyNonce, err := s.BaseService.GetBoolSetting(ctx, model.SettingOAuthVerifyNonce, true)
	if err != nil {
		return nil, fmt.Errorf("failed to get verify nonce setting: %w", err)
	}
	if !verifyNonce {
		oauth2Config.Nonce = ""
	}

	verifyCodeVerifier, err := s.BaseService.GetBoolSetting(ctx, model.SettingOAuthCodeVerifier, true)
	if err != nil {
		return nil, fmt.Errorf("failed to get verify code verifier setting: %w", err)
	}
	if !verifyCodeVerifier {
		oauth2Config.CodeVerifier = ""
	}

	// Verify OAuth callback, get token
	token, err := oauth2Config.Exchange(ctx, req.Code)
	if err != nil {
		level.Error(logger).Log("msg", "Failed to exchange token", "err", err.Error())
		return nil, fmt.Errorf("invalid token: %w", err)
	}

	// Get user information
	userInfo, err := s.getUserInfo(token.AccessToken, oauth2Config.UserInfoEndpoint)
	if err != nil {
		return nil, fmt.Errorf("failed to get user info: %w", err)
	}

	// Process user information, find or create user
	return s.processOAuthUser(ctx, userInfo, &oauth2Config)
}

// getUserInfo gets user information from OAuth provider
func (s *OAuthService) getUserInfo(accessToken, userInfoURL string) (map[string]interface{}, error) {
	// Create HTTP request
	req, err := http.NewRequest("GET", userInfoURL, nil)
	if err != nil {
		return nil, err
	}

	// Add access token to request header
	req.Header.Add("Authorization", "Bearer "+accessToken)
	req.Header.Add("Accept", "application/json")

	// Send HTTP request
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Check response status
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to get user info, status code: %d", resp.StatusCode)
	}

	// Read and parse response content
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var userInfo map[string]interface{}
	if err := json.Unmarshal(body, &userInfo); err != nil {
		return nil, err
	}

	return userInfo, nil
}

func (s *OAuthService) convertUserInfoToUser(ctx context.Context, userInfo map[string]interface{}, provider *OAuth2ProviderConfig) (*model.User, error) {
	// Get OAuth user ID and Email
	oauthID, ok := userInfo["id"].(string)
	if !ok {
		if id, ok := userInfo["id"].(float64); ok {
			oauthID = fmt.Sprintf("%d", int(id))
		} else if sub, ok := userInfo["sub"].(string); ok {
			oauthID = sub
		} else {
			return nil, errors.New("failed to get OAuth user ID")
		}
	}

	var email string
	{
		if provider.EmailField != "" {
			email, _ = userInfo[provider.EmailField].(string)
		} else {
			email, _ = userInfo["email"].(string)
			if email == "" {
				email, _ = userInfo["mail"].(string)
			}
		}
		if email == "" {
			email = fmt.Sprintf("%s.%s@oauth.user", provider.Name, oauthID)
		}
	}

	// Get username
	var username string
	{
		if provider.UsernameField != "" {
			username, _ = userInfo[provider.UsernameField].(string)
		} else {

			if name, ok := userInfo["login"].(string); ok {
				username = name
			} else if name, ok := userInfo["preferred_username"].(string); ok {
				username = name
			} else if name, ok := userInfo["name"].(string); ok {
				username = name
			} else if name, ok := userInfo["username"].(string); ok {
				username = name
			}
		}

		if username == "" {
			username = fmt.Sprintf("%s.%s", provider.Name, oauthID)
		}
	}

	// Get full name
	var fullName string
	{
		if provider.FullNameField != "" {
			fullName, _ = userInfo[provider.FullNameField].(string)
		} else {
			if name, ok := userInfo["fullName"].(string); ok {
				fullName = name
			} else if name, ok := userInfo["full_name"].(string); ok {
				fullName = name
			}
		}
		if fullName == "" {
			fullName = username // Default to username if full name is not available
		}
	}

	// Get avatar URL
	var avatar string
	{
		if provider.AvatarField != "" {
			avatar, _ = userInfo[provider.AvatarField].(string)
		} else {
			if avatarURL, ok := userInfo["avatar_url"].(string); ok {
				avatar = avatarURL
			} else if avatarURL, ok := userInfo["avatarUrl"].(string); ok {
				avatar = avatarURL
			} else if avatarURL, ok := userInfo["avatarURL"].(string); ok {
				avatar = avatarURL
			} else if avatarURL, ok := userInfo["avatar"].(string); ok {
				avatar = avatarURL
			} else if avatarURL, ok := userInfo["picture"].(string); ok {
				avatar = avatarURL
			} else {
				avatar = ""
			}
		}
	}

	var roleNames []string
	{
		if provider.RoleField != "" {
			if roleNames, ok = userInfo[provider.RoleField].([]string); !ok {
				if roleName, ok := userInfo[provider.RoleField].(string); ok {
					roleNames = []string{roleName}
				}
			}
		} else {
			for _, role := range []string{"role", "roles", "name", "role_name"} {
				if role, ok := userInfo[role].(string); ok {
					roleNames = []string{role}
					break
				} else if roles, ok := userInfo[role].([]string); ok {
					roleNames = roles
					break
				}
			}
		}
	}
	if len(roleNames) == 0 && provider.DefaultRole != "" {
		roleNames = []string{provider.DefaultRole}
	}

	var roles []model.Role
	{
		err := db.Session(ctx).Where("name IN ?", roleNames).Find(&roles).Error
		if err != nil {
			return nil, err
		}
		roles = w.Map(roleNames, func(roleName string) model.Role {
			for _, role := range roles {
				if role.Name == roleName {
					return role
				}
			}
			return model.Role{Name: roleName}
		})
	}
	oauthUser := &model.User{
		Username:      username,
		Email:         email,
		Avatar:        avatar,
		FullName:      fullName,
		Status:        model.UserStatusActive,
		OAuthProvider: provider.Name,
		OAuthID:       oauthID,
		LastLogin:     time.Now(),
		Roles:         roles,
	}
	var user model.User
	// Check if the user exists (by OAuth ID)
	err := db.Session(ctx).Where("oauth_provider = ? AND oauth_id = ?", provider.Name, user.OAuthID).
		Preload("Roles.Permissions").
		First(&user).Error
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		// User does not exist, try to find by Email
		err = db.Session(ctx).Where("email = ?", oauthUser.Email).First(&user).Error
		if err == nil {
			// User found by Email, update OAuth information
			user.OAuthProvider = provider.Name
			user.OAuthID = oauthUser.OAuthID
			if oauthUser.Avatar != "" && user.Avatar == "" {
				user.Avatar = oauthUser.Avatar
			}
			if len(oauthUser.Roles) > 0 {
				user.Roles = oauthUser.Roles
			}
		} else {
			if !errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, err
			}
			if !provider.AutoCreateUser {
				return nil, fmt.Errorf("it is not allowed to register new users through OAuth/OIDC. please add users to the system first: %s", oauthUser.Email)
			}
			// Create new user
			user = *oauthUser

			// Set avatar
			if user.Avatar == "" {
				user.Avatar = util.GenerateAvatar(oauthUser.Username)
			}

			// Generate random password (user cannot use password login, only through OAuth)
			randomPassword := util.GenerateRandomString(16)
			if err := user.SetPassword(randomPassword); err != nil {
				return nil, fmt.Errorf("failed to set password: %w", err)
			}
		}
	} else {
		if len(oauthUser.Roles) > 0 {
			user.Roles = oauthUser.Roles
		}
	}
	return &user, nil
}

// processOAuthUser processes OAuth user, finds or creates user
func (s *OAuthService) processOAuthUser(ctx context.Context, userInfo map[string]interface{}, provider *OAuth2ProviderConfig) (*LoginResponse, error) {
	user, err := s.convertUserInfoToUser(ctx, userInfo, provider)
	if err != nil {
		return nil, err
	}

	// Start database transaction
	txErr := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if tx.Error != nil {
			return tx.Error
		}
		// Update last login time
		user.LastLogin = time.Now()
		if user.ID > 0 {
			if err = tx.Select("OAuthProvider", "OAuthID", "Avatar", "LastLogin").Save(&user).Error; err != nil {
				return fmt.Errorf("failed to update user: %w", err)
			}
		} else {
			if err := tx.Create(&user).Error; err != nil {
				return fmt.Errorf("failed to create user: %w", err)
			}

			for idx, role := range user.Roles {
				if err := tx.Where("name = ?", role.Name).First(&role).Error; err != nil {
					if errors.Is(err, gorm.ErrRecordNotFound) {
						user.Roles[idx].Description = "Role created by OAuth/OIDC"
						if err := tx.Create(&user.Roles[idx]).Error; err != nil {
							return fmt.Errorf("failed to create role: %w", err)
						}
					} else {
						return fmt.Errorf("failed to find role: %w", err)
					}
				}
				if err := tx.Model(&user).Association("Roles").Append(&role); err != nil {
					return fmt.Errorf("failed to add user to role: %w", err)
				}
			}
			// Get full user information (including roles and permissions)
			if err := tx.Preload("Roles.Permissions").First(&user, user.ID).Error; err != nil {
				return fmt.Errorf("failed to get user info: %w", err)
			}
		}

		// Check user status
		if user.Status != model.UserStatusActive {
			if user.Status == model.UserStatusDisabled {
				return errors.New("account is disabled")
			}
			return errors.New("account status is abnormal")
		}
		if user.IsLocked() {
			return errors.New("account is locked")
		}
		return nil
	})
	if txErr != nil {
		return nil, txErr
	}
	sessionTimeoutMinutes, err := s.BaseService.GetIntSetting(ctx, model.SettingSessionTimeoutMinutes, 10)
	if err != nil {
		return nil, fmt.Errorf("failed to get session timeout: %w", err)
	}

	if !user.MFAEnforced {
		user.MFAEnforced, err = s.BaseService.GetBoolSetting(ctx, model.SettingMFAEnforced, false)
		if err != nil {
			return nil, fmt.Errorf("failed to get MFA enforced: %w", err)
		}
	}

	if user.MFAEnforced || user.MFAEnabled {
		mfaEnabled, err := s.BaseService.GetBoolSetting(ctx, model.SettingOAuthMFAEnabled, false)
		if err != nil {
			return nil, fmt.Errorf("failed to get MFA enabled: %w", err)
		}
		if !mfaEnabled {
			user.MFAEnforced = false
			user.MFAEnabled = false
		}
	}

	if user.MFAEnabled {
		return s.UserService.GenerateMFA(ctx, user, middleware.JWTIssuerOAuth)
	}

	if user.MFAEnforced {
		user.Roles = []model.Role{}
	}
	// Generate JWT token
	token, err := middleware.GenerateToken(ctx, middleware.JWTIssuerOAuth, user.ResourceID, user.Username, time.Duration(sessionTimeoutMinutes)*time.Minute)
	if err != nil {
		return nil, fmt.Errorf("failed to generate token: %w", err)
	}

	user.LoginAttempts = 0
	db.Session(ctx).Model(&user).Select("LoginAttempts").Updates(&user)

	return &LoginResponse{
		Token:     token,
		User:      *user,
		ExpiresAt: time.Now().Add(time.Duration(sessionTimeoutMinutes) * time.Minute),
	}, nil
}

type WellknownResponse struct {
	AuthorizationEndpoint string `json:"authorization_endpoint"`
	TokenEndpoint         string `json:"token_endpoint"`
	UserInfoEndpoint      string `json:"userinfo_endpoint"`
	JWKsURI               string `json:"jwks_uri"`
	Issuer                string `json:"issuer"`
}

func (s *OAuthService) autoDiscoverOAuth2Endpoint(ctx context.Context, endpoint string) (*WellknownResponse, error) {
	logger := log.GetContextLogger(ctx)
	if endpoint == "" {
		return nil, fmt.Errorf("wellknown endpoint is required")
	}
	var err error
	var resp *http.Response
	level.Info(logger).Log("msg", "Getting wellknown endpoint", "endpoint", endpoint)
	resp, err = http.Get(endpoint)
	if err != nil {
		level.Error(logger).Log("msg", "Failed to get wellknown endpoint", "err", err.Error())
		for i := 0; i < 3; i++ {
			level.Info(logger).Log("msg", "Getting wellknown endpoint", "endpoint", endpoint, "retry", i+1)
			resp, err = http.Get(endpoint)
			if err != nil {
				level.Error(logger).Log("msg", "Failed to get wellknown endpoint", "err", err.Error())
				continue
			}
			break
		}
	}
	if resp == nil {
		return nil, fmt.Errorf("failed to get wellknown endpoint")
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		level.Error(logger).Log("msg", "Failed to get wellknown endpoint", "status", resp.StatusCode)
		return nil, fmt.Errorf("failed to get wellknown endpoint")
	}
	var wellknownResp WellknownResponse
	if err := json.NewDecoder(resp.Body).Decode(&wellknownResp); err != nil {
		level.Error(logger).Log("msg", "Failed to decode wellknown endpoint", "err", err.Error())
		return nil, err
	}
	return &wellknownResp, nil
}

// TestOAuthConnection tests OAuth connection
func (s *OAuthService) TestOAuthConnection(ctx context.Context, settings *model.OAuthSettings) (resp *OAuthLoginURLResponse, err error) {
	oauth2Config := OAuth2ProviderConfig{
		OAuthSettings: *settings,
		Name:          fmt.Sprintf("settings.%s", settings.Provider),
	}
	// Test OAuth connection
	if settings.Provider == model.OAuthProviderAutoDiscover && settings.WellknownEndpoint != "" {
		wellknownResp, err := s.autoDiscoverOAuth2Endpoint(ctx, settings.WellknownEndpoint)
		if err != nil {
			return nil, err
		}
		oauth2Config.AuthEndpoint = wellknownResp.AuthorizationEndpoint
		oauth2Config.TokenEndpoint = wellknownResp.TokenEndpoint
		oauth2Config.UserInfoEndpoint = wellknownResp.UserInfoEndpoint
		oauth2Config.JWKsURI = wellknownResp.JWKsURI
		oauth2Config.Issuer = wellknownResp.Issuer
	}

	state := util.GenerateRandomString(32)
	oauth2Config.Nonce = util.GenerateRandomString(16)
	oauth2Config.CodeVerifier = util.GenerateRandomString(32)
	authURL := oauth2Config.AuthCodeURL(state, oauth2Config.Nonce, oauth2Config.CodeVerifier)
	// save state to cache
	_, err = s.BaseService.CreateCache(ctx, fmt.Sprintf("ez-console:oauth:state:%s", state), w.JSONStringer(oauth2Config).String(), time.Now().Add(10*time.Minute))
	if err != nil {
		return nil, err
	}
	return &OAuthLoginURLResponse{
		URL:   authURL,
		State: state,
	}, nil
}

type TestOAuthCallbackResponse struct {
	UserInfo map[string]interface{} `json:"user_info"`
	User     model.User             `json:"user"`
}

// TestOAuthCallback tests OAuth callback
func (s *OAuthService) TestOAuthCallback(ctx context.Context, req *OAuthCallbackRequest) (resp *TestOAuthCallbackResponse, err error) {
	logger := log.GetContextLogger(ctx)
	// check state
	cache, err := s.BaseService.GetCache(ctx, fmt.Sprintf("ez-console:oauth:state:%s", req.State))
	if err != nil {
		return nil, fmt.Errorf("failed to get oauth state: %w", err)
	}
	// delete state
	s.BaseService.DeleteCache(ctx, fmt.Sprintf("ez-console:oauth:state:%s", req.State))

	var oauth2Config OAuth2ProviderConfig
	if err := json.Unmarshal([]byte(cache.Value), &oauth2Config); err != nil {
		return nil, fmt.Errorf("failed to unmarshal oauth2 config: %w", err)
	}

	if oauth2Config.TokenEndpoint == "" {
		return nil, fmt.Errorf("invalid oauth2 config")
	}

	verifyToken, err := s.BaseService.GetBoolSetting(ctx, model.SettingOAuthVerifyToken, true)
	if err != nil {
		return nil, fmt.Errorf("failed to get verify token setting: %w", err)
	}
	if !verifyToken {
		oauth2Config.JWKsURI = ""
		oauth2Config.Issuer = ""
	}

	verifyNonce, err := s.BaseService.GetBoolSetting(ctx, model.SettingOAuthVerifyNonce, true)
	if err != nil {
		return nil, fmt.Errorf("failed to get verify nonce setting: %w", err)
	}
	if !verifyNonce {
		oauth2Config.Nonce = ""
	}
	// Verify OAuth callback, get token
	token, err := oauth2Config.Exchange(ctx, req.Code)
	if err != nil {
		level.Error(logger).Log("msg", "Failed to exchange token", "err", err.Error())
		return nil, fmt.Errorf("invalid token: %w", err)
	}

	// Get user information
	userInfo, err := s.getUserInfo(token.AccessToken, oauth2Config.UserInfoEndpoint)
	if err != nil {
		return nil, fmt.Errorf("failed to get user info: %w", err)
	}

	user, err := s.convertUserInfoToUser(ctx, userInfo, &oauth2Config)
	if err != nil {
		return nil, fmt.Errorf("failed to convert user info to user: %w", err)
	}

	return &TestOAuthCallbackResponse{
		UserInfo: userInfo,
		User:     *user,
	}, nil
}
