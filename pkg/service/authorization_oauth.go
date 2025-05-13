package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-utils/log"
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
	oauth2.Config
	Name           string
	DisplayName    string
	UserInfoURL    string
	EmailField     string
	UsernameField  string
	FullNameField  string
	AvatarField    string
	RoleField      string
	DefaultRole    string
	AutoCreateUser bool
	IconURL        string
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
			secret, err := settings.ClientSecret.UnsafeString()
			if err != nil {
				level.Error(logger).Log("msg", "Failed to get OAuth provider secret", "provider", settings.Provider, "err", err.Error())
			}
			providers = append(providers, OAuth2ProviderConfig{
				Config: oauth2.Config{
					ClientID:     settings.ClientID,
					ClientSecret: secret,
					RedirectURL:  settings.RedirectURI,
					Scopes:       strings.Split(settings.Scope, " "),
					Endpoint: oauth2.Endpoint{
						AuthURL:  settings.AuthEndpoint,
						TokenURL: settings.TokenEndpoint,
					},
				},
				Name:           fmt.Sprintf("settings.%s", settings.Provider),
				DisplayName:    settings.DisplayName,
				IconURL:        settings.IconURL,
				UserInfoURL:    settings.UserInfoEndpoint,
				EmailField:     settings.EmailField,
				UsernameField:  settings.UsernameField,
				FullNameField:  settings.FullNameField,
				AvatarField:    settings.AvatarField,
				RoleField:      settings.RoleField,
				AutoCreateUser: settings.AutoCreateUser,
			})
		}
	}
	cfg := config.GetConfig()
	if cfg.OAuth.GetEnabled() {
		for _, providerCfg := range cfg.OAuth.Providers {
			if providerCfg.GetEnabled() {
				if providerCfg.ClientID != "" && providerCfg.ClientSecret != "" {
					providers = append(providers, OAuth2ProviderConfig{
						Config: oauth2.Config{
							ClientID:     providerCfg.ClientID,
							ClientSecret: providerCfg.ClientSecret,
							RedirectURL:  providerCfg.RedirectURL,
							Scopes:       strings.Split(providerCfg.Scopes, ","),
							Endpoint: oauth2.Endpoint{
								AuthURL:  providerCfg.AuthURL,
								TokenURL: providerCfg.TokenURL,
							},
						},
						Name:           providerCfg.Name,
						DisplayName:    providerCfg.DisplayName,
						IconURL:        providerCfg.IconURL,
						UserInfoURL:    providerCfg.UserInfoURL,
						EmailField:     providerCfg.EmailField,
						UsernameField:  providerCfg.UsernameField,
						FullNameField:  providerCfg.FullNameField,
						AvatarField:    providerCfg.AvatarField,
						RoleField:      providerCfg.RoleField,
						AutoCreateUser: providerCfg.AutoCreateUser,
					})
				}
			}
		}
	}
	return providers
}

// GetLoginURL gets OAuth login URL
func (s *OAuthService) GetLoginURL(ctx context.Context, provider string) (*OAuthLoginURLResponse, error) {
	var oauth2Config *oauth2.Config

	for _, cfg := range s.GetOAuth2ProviderConfig(ctx) {
		if cfg.Name == provider {
			oauth2Config = &cfg.Config
			break
		}
	}

	// Generate state value
	state := util.GenerateRandomString(32)

	// Generate authorization URL
	authURL := oauth2Config.AuthCodeURL(state)

	return &OAuthLoginURLResponse{
		URL:   authURL,
		State: state,
	}, nil
}

// HandleCallback handles OAuth callback
func (s *OAuthService) HandleCallback(ctx context.Context, req OAuthCallbackRequest) (*LoginResponse, error) {
	logger := log.GetContextLogger(ctx)
	oauth2Config := w.Find(s.GetOAuth2ProviderConfig(ctx), func(cfg OAuth2ProviderConfig) bool {
		return cfg.Name == req.Provider
	})
	if oauth2Config.Name == "" {
		return nil, fmt.Errorf("provider not found or not enabled: %s", req.Provider)
	}
	// Verify OAuth callback, get token
	token, err := oauth2Config.Exchange(ctx, req.Code)
	if err != nil {
		level.Error(logger).Log("msg", "Failed to exchange token", "err", err.Error())
		return nil, fmt.Errorf("invalid token: %w", err)
	}

	// Get user information
	userInfo, err := s.getUserInfo(token.AccessToken, oauth2Config.UserInfoURL)
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

// processOAuthUser processes OAuth user, finds or creates user
func (s *OAuthService) processOAuthUser(ctx context.Context, userInfo map[string]interface{}, provider *OAuth2ProviderConfig) (*LoginResponse, error) {
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

	var roleName string
	{
		if provider.RoleField != "" {
			roleName, _ = userInfo[provider.RoleField].(string)
		} else {
			if role, ok := userInfo["role"].(string); ok {
				roleName = role
			} else if roles, ok := userInfo["roles"].(string); ok {
				roleName = roles
			} else if name, ok := userInfo["name"].(string); ok {
				roleName = name
			} else if name, ok := userInfo["role_name"].(string); ok {
				roleName = name
			}
		}
	}
	if len(roleName) == 0 {
		roleName = provider.DefaultRole
	}
	var user model.User

	// Check if the user exists (by OAuth ID)
	err := db.Session(ctx).Where("oauth_provider = ? AND oauth_id = ?", provider.Name, oauthID).
		Preload("Roles.Permissions").
		First(&user).Error
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		// User does not exist, try to find by Email
		err = db.Session(ctx).Where("email = ?", email).First(&user).Error
		if err == nil {
			// User found by Email, update OAuth information
			user.OAuthProvider = provider.Name
			user.OAuthID = oauthID
			if avatar != "" && user.Avatar == "" {
				user.Avatar = avatar
			}
		} else {
			if !errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, err
			}
			if !provider.AutoCreateUser {
				return nil, fmt.Errorf("it is not allowed to register new users through OAuth/OIDC. please add users to the system first: %s", email)
			}
			// Create new user
			user = model.User{
				Username:      username,
				Email:         email,
				FullName:      fullName,
				Status:        model.UserStatusActive,
				OAuthProvider: provider.Name,
				OAuthID:       oauthID,
				LastLogin:     time.Now(),
			}

			// Set avatar
			if avatar != "" {
				user.Avatar = avatar
			} else {
				user.Avatar = util.GenerateAvatar(username)
			}

			// Generate random password (user cannot use password login, only through OAuth)
			randomPassword := util.GenerateRandomString(16)
			if err := user.SetPassword(randomPassword); err != nil {
				return nil, fmt.Errorf("failed to set password: %w", err)
			}
		}
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
			if roleName != "" {
				var role model.Role
				if err := tx.Where("name = ?", roleName).First(&role).Error; err != nil {
					if errors.Is(err, gorm.ErrRecordNotFound) {
						role = model.Role{
							Name:        roleName,
							Description: "Role created by OAuth/OIDC",
						}
						if err := tx.Create(&role).Error; err != nil {
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
		return s.UserService.GenerateMFA(ctx, &user, middleware.JWTIssuerOAuth)
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
		User:      user,
		ExpiresAt: time.Now().Add(time.Duration(sessionTimeoutMinutes) * time.Minute),
	}, nil
}
