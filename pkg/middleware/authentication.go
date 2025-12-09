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

package middleware

import (
	"context"
	"crypto/sha256"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/safe"
	"go.opentelemetry.io/otel"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/golang-jwt/jwt/v5"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
	"gorm.io/gorm"
	"k8s.io/apimachinery/pkg/util/cache"
)

type JWTIssuer string

const (
	JWTIssuerLogin JWTIssuer = "login"
	JWTIssuerOAuth JWTIssuer = "oauth"
)

// GenerateToken generates a JWT token
func GenerateToken(ctx context.Context, issuer JWTIssuer, userID string, username string, expiresIn time.Duration) (string, error) {
	cfg := config.GetConfig()

	claims := jwt.MapClaims{
		"user_id":  userID,
		"username": username,
		"exp":      time.Now().Add(expiresIn).Unix(),
		"iat":      time.Now().Unix(),
		"iss":      string(issuer),
	}

	return cfg.JWT.SignedString(&claims)
}

var userCache = cache.NewLRUExpireCache(100)

func DeleteUserCache(userID string) {
	userCache.Remove(userID)
}

func SetUserCache(userID string, user model.User, ttl time.Duration) {
	if user.Roles == nil {
		user.Roles = []model.Role{}
	}
	userCache.Add(userID, user, ttl)
}

func GetUserCache(userID string) (model.User, bool) {
	user, ok := userCache.Get(userID)
	if !ok {
		return model.User{}, false
	}
	u, ok := user.(model.User)
	return u, ok
}

func ClearUserCache() {
	userCache.RemoveAll(func(key any) bool {
		return true
	})
}

func WithoutAuthentication(engine *gin.RouterGroup) *gin.RouterGroup {
	engine.Handlers = append([]gin.HandlerFunc{WithoutAuthenticationMiddleware()}, engine.Handlers...)
	return engine
}

func WithoutAuthenticationMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("gin_without_authentication", true)
		c.Next()
	}
}

type AuthenticationFunc func(c *gin.Context)

func WithAuthentication(engine *gin.RouterGroup, authFunc AuthenticationFunc) *gin.RouterGroup {
	engine.Handlers = append([]gin.HandlerFunc{func(ctx *gin.Context) {
		ctx.Set("gin_authentication_func", authFunc)
	}}, engine.Handlers...)
	return engine
}

func NonAuthentication(c *gin.Context) {
	logger := log.GetContextLogger(c)
	level.Debug(logger).Log("msg", "NonAuthentication", "path", c.Request.RequestURI)
}

func JWTAuthenticationFunc(c *gin.Context) {
	if authHeader := c.GetHeader("Authorization"); authHeader != "" {
		before, after, ok := strings.Cut(authHeader, " ")
		if !ok {
			util.RespondWithError(c, util.ErrorResponse{
				HTTPCode: http.StatusUnauthorized,
				Code:     "E4011",
				Err:      errors.New("invalid token format"),
				Message:  "Invalid token format",
			})
			return
		}
		if before == "Bearer" {
			if err := jwtMiddleware(c, after); err != nil {
				util.RespondWithError(c, err)
				return
			}
			if !c.IsAborted() {
				c.Next()
			}
			return
		}
	}
	if !c.IsAborted() {
		if ginWithoutAuthentication, ok := c.Get("gin_without_authentication"); ok {
			if ginWithoutAuthentication.(bool) {
				c.Next()
				return
			}
		}
		util.RespondWithError(c, util.NewErrorMessage("E4011", "Unauthorized"))
		return
	}
}

func DefaultAuthenticationFunc(c *gin.Context) {
	if username, password, ok := c.Request.BasicAuth(); ok {
		if err := serviceAuthenticationMiddleware(c, username, password); err != nil {
			util.RespondWithError(c, err)
			return
		}
		if !c.IsAborted() {
			c.Next()
		}
		return
	}
	JWTAuthenticationFunc(c)
}

// AuthenticationMiddleware authentication middleware
func AuthenticationMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if ginAuthenticationFunc, ok := c.Get("gin_authentication_func"); ok {
			ginAuthenticationFunc.(AuthenticationFunc)(c)
			if !c.IsAborted() {
				c.Next()
			}
			return
		}
		DefaultAuthenticationFunc(c)
	}
}

type ServiceAccountAccessKeyWithStatus struct {
	model.ServiceAccountAccessKey
	ServiceAccountStatus string `json:"service_account_status"`
}

func serviceAuthenticationMiddleware(c *gin.Context, accessKey, secretKey string) (err error) {
	cfg := config.GetConfig()
	ctx, span := otel.GetTracerProvider().Tracer(cfg.Tracing.ServiceName).Start(c.Request.Context(), "Service Account Authentication")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()

	var key ServiceAccountAccessKeyWithStatus
	if err := db.Session(ctx).Model(&model.ServiceAccountAccessKey{}).Select("`t_service_account_access_key`.*", "`t_service_account`.`status` as `service_account_status`").
		Joins("left join `t_service_account` on `t_service_account_access_key`.`service_account_id` = `t_service_account`.`resource_id`").
		Where("`t_service_account_access_key`.`access_key_id` = ?", accessKey).
		First(&key).Error; err != nil {
		return util.NewErrorMessage("E4011", "Invalid authentication token")
	}
	db.Session(ctx).Model(key.ServiceAccountAccessKey).Select("LastUsed").Update("LastUsed", time.Now())
	if key.IsExpired() {
		return util.NewErrorMessage("E4011", "Authentication token has expired")
	}
	decryptedSecretAccessKey, err := util.DecryptString(key.SecretAccessKey)
	if err != nil {
		return util.NewErrorMessage("E4011", "Invalid authentication token", err)
	}
	if decryptedSecretAccessKey != secretKey {
		return util.NewErrorMessage("E4011", "Invalid authentication token")
	}
	if !key.IsActive() {
		return util.NewErrorMessage("E4011", "Authentication token is disabled")
	}
	if key.ServiceAccountStatus != model.ServiceAccountStatusActive {
		return util.NewErrorMessage("E4011", "Service account is disabled")
	}

	var serviceAccount model.ServiceAccount
	if err := db.Session(ctx).Where("resource_id = ?", key.ServiceAccountID).Preload("Roles.Permissions").Preload("Roles.AIToolPermissions").First(&serviceAccount).Error; err != nil {
		return util.NewErrorMessage("E4011", "Service account not found")
	}
	if serviceAccount.Status != "active" {
		return util.NewErrorMessage("E4011", "Service account is disabled")
	}
	if len(serviceAccount.PolicyDocument.Statement) > 0 {
		serviceAccount.Roles = append([]model.Role{{
			Base: model.Base{
				ResourceID: serviceAccount.ResourceID,
			},
			Name:           fmt.Sprintf("SA-%s", serviceAccount.ResourceID),
			Description:    "Service account virtual role",
			PolicyDocument: serviceAccount.PolicyDocument,
		}}, serviceAccount.Roles...)
	}
	// Update the last access time of the service account
	db.Session(ctx).Model(&serviceAccount).Select("LastAccess").Update("last_access", time.Now())

	c.Set("service_account", &serviceAccount)
	c.Set("service_account_id", serviceAccount.ResourceID)
	c.Set("roles", serviceAccount.Roles)

	// Extract organization ID from header if multi-org is enabled
	orgID := c.GetHeader("X-Scope-OrgID")
	if orgID != "" {
		c.Set("organization_id", orgID)
	}

	return nil
}

func GetUserFromContext(c context.Context) *model.User {
	user, ok := c.Value("user").(model.User)
	if !ok {
		return nil
	}
	return &user
}

func GetUserIDFromContext(c context.Context) string {
	userID, ok := c.Value("user_id").(string)
	if !ok {
		return ""
	}
	return userID
}

func GetRolesFromContext(c context.Context) []model.Role {
	return c.Value("roles").([]model.Role)
}

func jwtMiddleware(c *gin.Context, tokenString string) (err error) {
	cfg := config.GetConfig()
	ctx, span := otel.GetTracerProvider().Tracer(cfg.Tracing.ServiceName).Start(c.Request.Context(), "JWT Authentication")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	token, err := cfg.JWT.ParseWithClaims(tokenString, jwt.MapClaims{})
	if err != nil {
		return util.NewErrorMessage("E4011", "Invalid token", err)
	}

	iat, err := token.Claims.GetIssuedAt()
	if err != nil {
		return util.NewErrorMessage("E4011", "Invalid token", err)
	}
	sessionIdleTimeoutMinutes, err := settingService.GetIntSetting(c, model.SettingSessionIdleTimeoutMinutes, 0)
	if err != nil {
		return util.NewErrorMessage("E4011", "Invalid token", err)
	}
	if sessionIdleTimeoutMinutes > 0 && time.Since(iat.Time) > time.Duration(sessionIdleTimeoutMinutes)*time.Minute {
		return util.NewErrorMessage("E4011", "Session expired, please login again")
	}

	// Validate token
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Check if token has expired
		exp, err := claims.GetExpirationTime()
		if err != nil {
			return util.NewErrorMessage("E4011", "Invalid token", err)
		}
		if exp.Before(time.Now()) {
			return util.NewErrorMessage("E4011", "Token expired")
		}
		// Get user information
		userID, ok := claims["user_id"].(string)
		if !ok {
			return util.NewErrorMessage("E4012", "Invalid user ID")
		}

		// Check session validity
		var session model.Session
		if err := db.Session(ctx).Where("token = ? AND is_valid = ?", safe.NewHash(sha256.New, []byte(tokenString)).HexString(64), true).First(&session).Error; err == nil {
			// Session exists, check if expired
			if session.IsExpired() {
				// Session has expired, mark as invalid
				session.Invalidate()
				db.Session(ctx).Select("IsValid").Save(&session)
				return util.NewErrorMessage("E4011", "Session expired, please login again")
			}

			// Update last active time
			session.UpdateLastActive()
			db.Session(ctx).Select("LastActiveAt").Save(&session)

			// Store session information in context
			c.Set("session", &session)
		} else {
			return util.NewErrorMessage("E4011", "Session expired, please login again", err)
		}

		// Load user information from database
		var user model.User

		if cachedUser, ok := GetUserCache(userID); ok {
			user = cachedUser
		} else {
			if err := db.Session(ctx).
				Where("resource_id = ?", userID).
				Preload("Roles.Permissions").
				Preload("Roles.AIToolPermissions").
				First(&user).Error; err != nil {
				return util.NewErrorMessage("E4012", "User not found", err)
			}
			SetUserCache(userID, user, time.Minute*10)
		}
		passwordExpiryDays, err := settingService.GetIntSetting(ctx, model.SettingPasswordExpiryDays, 0)
		if err != nil {
			return util.NewErrorMessage("E4012", "System configuration error", err)
		}

		if user.IsLDAPUser() {
			allowChangePassword, _ := settingService.GetBoolSetting(ctx, model.SettingLDAPAllowManageUserPassword, false)
			if !allowChangePassword {
				passwordExpiryDays = 0
			}
		}
		// When the user is not locked, and the password has expired, clear the user's roles/permissions,
		if !user.IsLocked() && user.Status == model.UserStatusPasswordExpired || (passwordExpiryDays > 0 && user.IsPasswordExpired(passwordExpiryDays)) {
			user.Roles = nil
		} else if !user.IsActive() { // Check user status
			return util.NewErrorMessage("E4012", "User is disabled")
		}
		{
			mfaEnforced, err := settingService.GetBoolSetting(ctx, model.SettingMFAEnforced, false)
			if err != nil && err != gorm.ErrRecordNotFound {
				return util.NewErrorMessage("E4012", "System configuration error", err)
			}
			if mfaEnforced || user.MFAEnforced {
				issuer, _ := claims.GetIssuer()
				switch issuer {
				case string(JWTIssuerOAuth):
					var oauthMFAEnabled string
					err := db.Session(ctx).Model(&model.Setting{}).Select("value").Where("key = ?", model.SettingOAuthMFAEnabled).First(&oauthMFAEnabled).Error
					if err != nil && err != gorm.ErrRecordNotFound {
						return util.NewErrorMessage("E4012", "System configuration error", err)
					}
					if oauthMFAEnabled == "true" {
						user.MFAEnforced = true
					} else {
						user.MFAEnforced = false
						user.MFAEnabled = false
					}
				default:
					user.MFAEnforced = true
				}
			}
		}
		if user.MFAEnforced && !user.MFAEnabled {
			user.Roles = nil
		}
		{
			// fix user organizations
			if user.Organizations == nil {
				var isGlobalRole bool
				var orgIds []string
				for _, role := range user.Roles {
					if role.OrganizationID == nil || *role.OrganizationID == "" && len(role.Permissions) > 0 {
						// is a global role with permissions
						isGlobalRole = true
						break
					}
					if role.OrganizationID != nil && *role.OrganizationID != "" {
						orgIds = append(orgIds, *role.OrganizationID)
					}
				}
				user.Organizations = []model.Organization{}
				orgQuery := db.Session(ctx).Model(&model.Organization{}).Limit(100)
				if isGlobalRole {
					orgQuery.Where("1 = 1")
				} else {
					orgQuery.Where("resource_id IN (?)", orgIds)
				}

				if err := orgQuery.Find(&user.Organizations).Error; err != nil {
					return util.NewErrorMessage("E4012", "System configuration error", err)
				}
			}
			SetUserCache(userID, user, time.Minute*10)
		}

		// Extract organization ID from header if multi-org is enabled
		orgID := c.GetHeader("X-Scope-OrgID")
		if orgID != "" {
			c.Set("organization_id", orgID)
		}

		// Store user information in context
		c.Set("user", user)
		c.Set("user_id", user.ResourceID)
		c.Set("roles", user.Roles)
		c.Set("session_id", session.ResourceID)
	} else {
		return util.NewErrorMessage("E4011", "Invalid token")
	}
	return nil
}
