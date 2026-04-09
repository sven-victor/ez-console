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

	"github.com/sven-victor/ez-console/pkg/cache"
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
					roleMappingMode := model.RoleMappingModeNewUserOnly
					if providerCfg.RoleMappingMode != "" {
						roleMappingMode = model.NormalizeRoleMappingMode(model.RoleMappingMode(providerCfg.RoleMappingMode))
					}
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
							RoleMappingMode:  roleMappingMode,

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
		baseURL := util.GetRootURL(ctx)
		basePath := ctx.GetHeader("X-Base-Path")
		if basePath != "" {
			baseURL = fmt.Sprintf("%s/%s", baseURL, strings.TrimSuffix(strings.TrimPrefix(basePath, "/"), "/"))
		}
		oauth2Config.RedirectURI = fmt.Sprintf("%s/login?provider=%s", baseURL, provider)
	}

	// Generate state value
	state := util.GenerateRandomString(32)
	oauth2Config.Nonce = util.GenerateRandomString(16)
	oauth2Config.CodeVerifier = util.GenerateRandomString(32)

	// Generate authorization URL
	authURL := oauth2Config.AuthCodeURL(state, oauth2Config.Nonce, oauth2Config.CodeVerifier)
	if err := cache.Store.Set(ctx, fmt.Sprintf("ez-console:oauth:state:%s", state), []byte(w.JSONStringer(oauth2Config).String()), 10*time.Minute); err != nil {
		return nil, fmt.Errorf("failed to create oauth state: %w", err)
	}

	return &OAuthLoginURLResponse{
		URL: authURL,
	}, nil
}

// HandleCallback handles OAuth callback
func (s *OAuthService) HandleCallback(ctx context.Context, req OAuthCallbackRequest) (*LoginResponse, error) {
	logger := log.GetContextLogger(ctx)
	stateKey := fmt.Sprintf("ez-console:oauth:state:%s", req.State)
	cacheVal, err := cache.Store.Get(ctx, stateKey)
	if err != nil {
		return nil, fmt.Errorf("failed to get oauth state: %w", err)
	}
	_ = cache.Store.Delete(ctx, stateKey)

	var oauth2Config OAuth2ProviderConfig
	if err := json.Unmarshal(cacheVal, &oauth2Config); err != nil {
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

// shouldApplyOAuthRoles determines whether OAuth roles should be applied to the
// user object (in-memory) based on role mapping mode. The mode value must
// already be normalized (see model.NormalizeRoleMappingMode).
func shouldApplyOAuthRoles(mode model.RoleMappingMode, existingUser bool, hasExistingRoles bool, hasOAuthRoles bool) bool {
	switch mode {
	case model.RoleMappingModeDisabled:
		return false
	case model.RoleMappingModeNewUserOnly:
		return hasOAuthRoles && !existingUser
	case model.RoleMappingModeTemporary:
		return hasOAuthRoles
	case model.RoleMappingModeEnforce:
		return hasOAuthRoles
	default:
		return hasOAuthRoles && !existingUser
	}
}

// shouldUpdateRolesInDB determines whether roles should be persisted to the
// user_roles table. Temporary mode never writes; enforce always writes;
// new_user_only writes only during user creation.
func shouldUpdateRolesInDB(mode model.RoleMappingMode, existingUser bool, hasExistingRoles bool, hasOAuthRoles bool) bool {
	if !existingUser {
		// New user: roles are set during creation for all modes except disabled
		// (disabled users get default role which is also set during creation)
		return false
	}

	switch mode {
	case model.RoleMappingModeDisabled:
		return !hasExistingRoles
	case model.RoleMappingModeNewUserOnly:
		return false
	case model.RoleMappingModeTemporary:
		return false
	case model.RoleMappingModeEnforce:
		return hasOAuthRoles
	default:
		return false
	}
}

// resolveRoleByQualifiedName resolves a role from a qualified name string.
// Format: "roleName" for global roles, "orgIdentifier/roleName" for org-scoped roles.
// orgIdentifier can be the organization slug, resource_id, or name (matched in that order).
// Returns a found model.Role or a stub with only Name populated (ID == 0).
func (s *OAuthService) resolveRoleByQualifiedName(ctx context.Context, qualifiedName string) (model.Role, error) {
	parts := strings.SplitN(qualifiedName, "/", 2)
	if len(parts) == 2 && parts[0] != "" {
		orgIdentifier := parts[0]
		roleName := parts[1]

		org, err := s.findOrganizationByIdentifier(ctx, orgIdentifier)
		if err != nil {
			return model.Role{}, fmt.Errorf("failed to find organization %q: %w", orgIdentifier, err)
		}
		if org == nil {
			return model.Role{Name: roleName, OrganizationID: new(string)}, nil
		}

		var role model.Role
		if err := db.Session(ctx).Where("name = ? AND organization_id = ?", roleName, org.ResourceID).First(&role).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				orgID := org.ResourceID
				return model.Role{Name: roleName, OrganizationID: &orgID}, nil
			}
			return model.Role{}, fmt.Errorf("failed to find role %q in org %q: %w", roleName, orgIdentifier, err)
		}
		return role, nil
	}

	// Global role (no org prefix)
	var role model.Role
	if err := db.Session(ctx).Where("name = ? AND organization_id IS NULL", qualifiedName).First(&role).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return model.Role{Name: qualifiedName}, nil
		}
		return model.Role{}, fmt.Errorf("failed to find global role %q: %w", qualifiedName, err)
	}
	return role, nil
}

// findOrganizationByIdentifier looks up an organization by slug or resource_id.
// Returns nil (without error) when no organization matches.
func (s *OAuthService) findOrganizationByIdentifier(ctx context.Context, identifier string) (*model.Organization, error) {
	var org model.Organization
	err := db.Session(ctx).
		Where("slug = ? OR resource_id = ?", identifier, identifier).
		First(&org).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &org, nil
}

// resolveRolesByQualifiedNames resolves a list of qualified role names.
func (s *OAuthService) resolveRolesByQualifiedNames(ctx context.Context, qualifiedNames []string) ([]model.Role, error) {
	roles := make([]model.Role, 0, len(qualifiedNames))
	for _, qn := range qualifiedNames {
		role, err := s.resolveRoleByQualifiedName(ctx, qn)
		if err != nil {
			return nil, err
		}
		roles = append(roles, role)
	}
	return roles, nil
}

func (s *OAuthService) convertUserInfoToUser(ctx context.Context, userInfo map[string]interface{}, provider *OAuth2ProviderConfig) (*model.User, error) {
	mode := model.NormalizeRoleMappingMode(provider.RoleMappingMode)

	// Get OAuth user ID
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

	// Extract email via JMESPath or fallback keys
	var email string
	if provider.EmailField != "" {
		email = util.JMESPathExtractString(userInfo, provider.EmailField)
	} else {
		email, _ = userInfo["email"].(string)
		if email == "" {
			email, _ = userInfo["mail"].(string)
		}
	}
	if email == "" {
		email = fmt.Sprintf("%s.%s@oauth.user", provider.Name, oauthID)
	}

	// Extract username via JMESPath or fallback keys
	var username string
	if provider.UsernameField != "" {
		username = util.JMESPathExtractString(userInfo, provider.UsernameField)
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

	// Extract full name via JMESPath or fallback keys
	var fullName string
	if provider.FullNameField != "" {
		fullName = util.JMESPathExtractString(userInfo, provider.FullNameField)
	} else {
		if name, ok := userInfo["fullName"].(string); ok {
			fullName = name
		} else if name, ok := userInfo["full_name"].(string); ok {
			fullName = name
		}
	}
	if fullName == "" {
		fullName = username
	}

	// Extract avatar via JMESPath or fallback keys
	var avatar string
	if provider.AvatarField != "" {
		avatar = util.JMESPathExtractString(userInfo, provider.AvatarField)
	} else {
		for _, key := range []string{"avatar_url", "avatarUrl", "avatarURL", "avatar", "picture"} {
			if v, ok := userInfo[key].(string); ok && v != "" {
				avatar = v
				break
			}
		}
	}

	// Extract role names via JMESPath or fallback keys
	var roleNames []string
	if provider.RoleField != "" {
		roleNames = util.JMESPathExtractStringSlice(userInfo, provider.RoleField)
	} else {
		for _, key := range []string{"role", "roles", "role_name"} {
			if s, ok := userInfo[key].(string); ok && s != "" {
				roleNames = []string{s}
				break
			} else if arr, ok := userInfo[key].([]interface{}); ok && len(arr) > 0 {
				for _, item := range arr {
					if s, ok := item.(string); ok {
						roleNames = append(roleNames, s)
					}
				}
				break
			} else if arr, ok := userInfo[key].([]string); ok && len(arr) > 0 {
				roleNames = arr
				break
			}
		}
	}

	// Determine default role names based on mode
	var defaultRoleNames []string
	if provider.DefaultRole != "" {
		if mode == model.RoleMappingModeDisabled {
			defaultRoleNames = strings.Split(provider.DefaultRole, ",")
		} else if len(roleNames) == 0 {
			defaultRoleNames = strings.Split(provider.DefaultRole, ",")
		}
	}
	for i := range defaultRoleNames {
		defaultRoleNames[i] = strings.TrimSpace(defaultRoleNames[i])
	}

	// Resolve OAuth roles using qualified name resolution (supports orgName/roleName)
	var oauthRoles []model.Role
	if len(roleNames) > 0 {
		var err error
		oauthRoles, err = s.resolveRolesByQualifiedNames(ctx, roleNames)
		if err != nil {
			return nil, err
		}
	}

	// Resolve default roles
	var defaultRoles []model.Role
	if len(defaultRoleNames) > 0 {
		var err error
		defaultRoles, err = s.resolveRolesByQualifiedNames(ctx, defaultRoleNames)
		if err != nil {
			return nil, err
		}
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
	}

	var user model.User
	var existingUser bool

	// Check if the user exists (by OAuth ID)
	err := db.Session(ctx).Where("oauth_provider = ? AND oauth_id = ?", provider.Name, oauthUser.OAuthID).
		Preload("Roles.Permissions").
		First(&user).Error
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		// User does not exist, try to find by Email
		err = db.Session(ctx).Where("email = ?", oauthUser.Email).
			Preload("Roles.Permissions").
			First(&user).Error
		if err == nil {
			existingUser = true
			user.OAuthProvider = provider.Name
			user.OAuthID = oauthUser.OAuthID
			if oauthUser.Avatar != "" && user.Avatar == "" {
				user.Avatar = oauthUser.Avatar
			}

			hasExistingRoles := len(user.Roles) > 0
			hasOAuthRoles := len(oauthRoles) > 0
			if shouldApplyOAuthRoles(mode, existingUser, hasExistingRoles, hasOAuthRoles) {
				user.Roles = oauthRoles
			} else if !hasExistingRoles && len(defaultRoles) > 0 {
				user.Roles = defaultRoles
			}
		} else {
			if !errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, err
			}
			if !provider.AutoCreateUser {
				return nil, fmt.Errorf("it is not allowed to register new users through OAuth/OIDC. please add users to the system first: %s", oauthUser.Email)
			}
			existingUser = false
			user = *oauthUser

			if user.Avatar == "" {
				user.Avatar = util.GenerateAvatar(oauthUser.Username)
			}

			if shouldApplyOAuthRoles(mode, existingUser, false, len(oauthRoles) > 0) {
				user.Roles = oauthRoles
			} else {
				user.Roles = defaultRoles
			}

			randomPassword := util.GenerateRandomString(16)
			if err := user.SetPassword(randomPassword); err != nil {
				return nil, fmt.Errorf("failed to set password: %w", err)
			}
		}
	} else {
		existingUser = true
		hasExistingRoles := len(user.Roles) > 0
		hasOAuthRoles := len(oauthRoles) > 0

		if shouldApplyOAuthRoles(mode, existingUser, hasExistingRoles, hasOAuthRoles) {
			user.Roles = oauthRoles
		} else if !hasExistingRoles && len(defaultRoles) > 0 {
			user.Roles = defaultRoles
		}
	}
	return &user, nil
}

// ensureRolesExist ensures all roles in the slice exist in the database,
// creating missing ones as needed. Returns the updated slice with DB IDs populated.
func ensureRolesExist(tx *gorm.DB, roles []model.Role, logger interface{ Log(...interface{}) error }) ([]model.Role, error) {
	for idx, role := range roles {
		if role.ID == 0 {
			var existingRole model.Role
			if err := tx.Where("name = ? AND ((organization_id IS NULL AND ? IS NULL) OR organization_id = ?)",
				role.Name, role.OrganizationID, role.OrganizationID).First(&existingRole).Error; err != nil {
				if errors.Is(err, gorm.ErrRecordNotFound) {
					roles[idx].Description = "Role created by OAuth/OIDC"
					if err := tx.Create(&roles[idx]).Error; err != nil {
						return nil, fmt.Errorf("failed to create role: %w", err)
					}
					_ = logger.Log("msg", "Created new role from OAuth", "role_name", role.Name)
				} else {
					return nil, fmt.Errorf("failed to find role: %w", err)
				}
			} else {
				roles[idx] = existingRole
			}
		}
	}
	return roles, nil
}

// processOAuthUser processes OAuth user, finds or creates user
func (s *OAuthService) processOAuthUser(ctx context.Context, userInfo map[string]interface{}, provider *OAuth2ProviderConfig) (*LoginResponse, error) {
	logger := log.GetContextLogger(ctx)
	mode := model.NormalizeRoleMappingMode(provider.RoleMappingMode)
	user, err := s.convertUserInfoToUser(ctx, userInfo, provider)
	if err != nil {
		return nil, err
	}

	// Track user state before transaction
	existingUserID := user.ID
	var originalRoleCount int
	if existingUserID > 0 {
		var loadedUser model.User
		if err := db.Session(ctx).Preload("Roles").First(&loadedUser, existingUserID).Error; err == nil {
			originalRoleCount = len(loadedUser.Roles)
		}
	}

	// Capture the roles that convertUserInfoToUser placed on user for temporary mode.
	// In temporary mode these will NOT be written to user_roles.
	temporaryOAuthRoles := user.Roles

	txErr := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if tx.Error != nil {
			return tx.Error
		}
		user.LastLogin = time.Now()
		if user.ID > 0 {
			hasExistingRoles := originalRoleCount > 0
			hasOAuthRoles := false
			for _, role := range user.Roles {
				if role.Name != "" {
					hasOAuthRoles = true
					break
				}
			}

			needsRoleUpdate := shouldUpdateRolesInDB(mode, true, hasExistingRoles, hasOAuthRoles)

			if err = tx.Select("OAuthProvider", "OAuthID", "Avatar", "LastLogin").Save(&user).Error; err != nil {
				return fmt.Errorf("failed to update user: %w", err)
			}

			if needsRoleUpdate && len(user.Roles) > 0 {
				level.Info(logger).Log("msg", "Updating user roles", "user_id", user.ResourceID, "mode", mode, "role_count", len(user.Roles))
				user.Roles, err = ensureRolesExist(tx, user.Roles, level.Info(logger))
				if err != nil {
					return err
				}
				if err := tx.Model(&user).Association("Roles").Replace(user.Roles); err != nil {
					return fmt.Errorf("failed to update user roles: %w", err)
				}
				cache.InvalidateUserSessions(ctx, tx, user.ResourceID)
			} else {
				level.Info(logger).Log("msg", "Skipping role update", "user_id", user.ResourceID, "mode", mode, "needs_update", needsRoleUpdate)
			}

			if err := tx.Preload("Roles.Permissions").First(&user, user.ID).Error; err != nil {
				return fmt.Errorf("failed to get user info: %w", err)
			}
		} else {
			// New user: for temporary mode, do NOT persist OAuth roles in user_roles.
			// Store default roles or nothing, so the DB stays clean.
			if mode == model.RoleMappingModeTemporary {
				user.Roles = nil
			}

			if err := tx.Create(&user).Error; err != nil {
				return fmt.Errorf("failed to create user: %w", err)
			}

			if len(user.Roles) > 0 {
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
			}

			if err := tx.Preload("Roles.Permissions").First(&user, user.ID).Error; err != nil {
				return fmt.Errorf("failed to get user info: %w", err)
			}
		}

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

	// For temporary mode, ensure the OAuth roles exist in DB (so they can be
	// loaded by ID later) and collect their ResourceIDs for the session.
	var oauthTemporaryRoleIDs []string
	if mode == model.RoleMappingModeTemporary && len(temporaryOAuthRoles) > 0 {
		temporaryOAuthRoles, err = ensureRolesExist(db.Session(ctx), temporaryOAuthRoles, level.Info(logger))
		if err != nil {
			return nil, fmt.Errorf("failed to ensure temporary OAuth roles: %w", err)
		}
		for _, r := range temporaryOAuthRoles {
			oauthTemporaryRoleIDs = append(oauthTemporaryRoleIDs, r.ResourceID)
		}
		// Set the temporary roles on the user so the response contains them
		user.Roles = temporaryOAuthRoles
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

	token, err := middleware.GenerateToken(ctx, middleware.JWTIssuerOAuth, user.ResourceID, user.Username, time.Duration(sessionTimeoutMinutes)*time.Minute)
	if err != nil {
		return nil, fmt.Errorf("failed to generate token: %w", err)
	}

	user.LoginAttempts = 0
	db.Session(ctx).Model(&user).Select("LoginAttempts").Updates(&user)

	user.PasswordChangedAt = time.Now()
	return &LoginResponse{
		Token:                 token,
		User:                  *user,
		ExpiresAt:             time.Now().Add(time.Duration(sessionTimeoutMinutes) * time.Minute),
		OAuthTemporaryRoleIDs: oauthTemporaryRoleIDs,
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
	if err = cache.Store.Set(ctx, fmt.Sprintf("ez-console:oauth:state:%s", state), []byte(w.JSONStringer(oauth2Config).String()), 10*time.Minute); err != nil {
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
	stateKey := fmt.Sprintf("ez-console:oauth:state:%s", req.State)
	cacheVal, err := cache.Store.Get(ctx, stateKey)
	if err != nil {
		return nil, fmt.Errorf("failed to get oauth state: %w", err)
	}
	_ = cache.Store.Delete(ctx, stateKey)

	var oauth2Config OAuth2ProviderConfig
	if err := json.Unmarshal(cacheVal, &oauth2Config); err != nil {
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
