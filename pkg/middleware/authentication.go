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
	"github.com/sven-victor/ez-console/pkg/cache"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
	"gorm.io/gorm"
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
	roles, ok := c.Value("roles").([]model.Role)
	if !ok {
		return nil
	}
	return roles
}

func HasGlobalRolePermission(ctx context.Context, permissionCode string) bool {
	roles := GetRolesFromContext(ctx)
	if roles == nil {
		return false
	}
	for _, role := range roles {
		if role.OrganizationID == nil || *role.OrganizationID == "" {
			if role.HasPermission(permissionCode) {
				return true
			}
		}
	}
	return false
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

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return util.NewErrorMessage("E4011", "Invalid token")
	}

	exp, err := claims.GetExpirationTime()
	if err != nil {
		return util.NewErrorMessage("E4011", "Invalid token", err)
	}
	if exp.Before(time.Now()) {
		return util.NewErrorMessage("E4011", "Token expired")
	}

	userID, ok := claims["user_id"].(string)
	if !ok {
		return util.NewErrorMessage("E4012", "Invalid user ID")
	}

	tokenHash := safe.NewHash(sha256.New, []byte(tokenString)).HexString(64)

	// --- Load or rebuild CachedSession ---
	cs, err := cache.Sessions.Get(ctx, tokenHash)
	if err != nil {
		// Cache miss — rebuild from DB
		cs, err = rebuildSessionCache(ctx, tokenHash, userID)
		if err != nil {
			return err
		}
	}

	// --- Validate session ---
	if !cs.IsValid {
		return util.NewErrorMessage("E4011", "Session expired, please login again")
	}
	if time.Now().After(cs.ExpiredAt) {
		_ = cache.Sessions.Delete(ctx, tokenHash)
		db.Session(ctx).Model(&model.Session{}).Where("token = ?", tokenHash).Update("is_valid", false)
		return util.NewErrorMessage("E4011", "Session expired, please login again")
	}

	// --- Check user security status ---
	if cs.Status == model.UserStatusDisabled {
		return util.NewErrorMessage("E4012", "User is disabled")
	}
	if time.Now().Before(cs.LockedUntil) && cs.Status != model.UserStatusPasswordExpired {
		return util.NewErrorMessage("E4012", "User is disabled")
	}

	// --- Password expiry check ---
	passwordExpiryDays, err := settingService.GetIntSetting(ctx, model.SettingPasswordExpiryDays, 0)
	if err != nil {
		return util.NewErrorMessage("E4012", "System configuration error", err)
	}
	isLDAPUser := model.UserSource(cs.Source) == model.UserSourceLDAP && cs.LDAPDN != ""
	if isLDAPUser {
		allowChangePassword, _ := settingService.GetBoolSetting(ctx, model.SettingLDAPAllowManageUserPassword, false)
		if !allowChangePassword {
			passwordExpiryDays = 0
		}
	}
	passwordExpired := cs.Status == model.UserStatusPasswordExpired ||
		(passwordExpiryDays > 0 && !cs.PasswordChangedAt.IsZero() &&
			time.Now().After(cs.PasswordChangedAt.AddDate(0, 0, passwordExpiryDays)))

	// --- MFA enforcement ---
	mfaEnforced := cs.MFAEnforced
	{
		globalMFAEnforced, mfaErr := settingService.GetBoolSetting(ctx, model.SettingMFAEnforced, false)
		if mfaErr != nil && mfaErr != gorm.ErrRecordNotFound {
			return util.NewErrorMessage("E4012", "System configuration error", mfaErr)
		}
		if globalMFAEnforced || mfaEnforced {
			issuer, _ := claims.GetIssuer()
			switch issuer {
			case string(JWTIssuerOAuth):
				var oauthMFAEnabled string
				oauthErr := db.Session(ctx).Model(&model.Setting{}).Select("value").
					Where("key = ?", model.SettingOAuthMFAEnabled).First(&oauthMFAEnabled).Error
				if oauthErr != nil && oauthErr != gorm.ErrRecordNotFound {
					return util.NewErrorMessage("E4012", "System configuration error", oauthErr)
				}
				mfaEnforced = oauthMFAEnabled == "true"
			default:
				mfaEnforced = true
			}
		}
	}

	// --- Load full roles from Roles cache ---
	var roles []model.Role
	if !(mfaEnforced && !cs.MFAEnabled) && (cs.Source == model.UserSourceOAuth || !passwordExpired) {
		roles = loadRolesFromCache(ctx, cs.RoleIDs)
	}

	// --- Load organizations if not yet cached ---
	orgs := cs.Organizations
	if orgs == nil {
		orgs = loadOrganizations(ctx, roles)
		cs.Organizations = orgs
		_ = cache.Sessions.Set(ctx, tokenHash, cs)
	}

	// --- Reconstruct model.User for gin context ---
	user := cs.ToUser(roles)
	user.MFAEnforced = mfaEnforced
	if cs.Source != model.UserSourceOAuth && passwordExpired {
		user.Status = model.UserStatusPasswordExpired
	}
	if mfaEnforced && !cs.MFAEnabled {
		user.MFAEnabled = false
	}

	// --- Update LastActiveAt in cache + DB ---
	now := time.Now()
	cs.LastActiveAt = now
	_ = cache.Sessions.Set(ctx, tokenHash, cs)
	db.Session(ctx).Model(&model.Session{}).Where("token = ?", tokenHash).Update("last_active_at", now)

	// --- Build a model.Session for context (lightweight, no DB load) ---
	sessionObj := &model.Session{
		Base:         model.Base{ResourceID: cs.SessionID},
		UserID:       cs.UserID,
		Token:        tokenHash,
		LastActiveAt: now,
		ExpiredAt:    cs.ExpiredAt,
		IsValid:      cs.IsValid,
	}

	// --- Store in gin context ---
	c.Set("session", sessionObj)
	c.Set("user", user)
	c.Set("user_id", user.ResourceID)
	c.Set("roles", user.Roles)
	c.Set("session_id", cs.SessionID)

	orgID := c.GetHeader("X-Scope-OrgID")
	if orgID != "" {
		c.Set("organization_id", orgID)
	}

	return nil
}

// rebuildSessionCache loads session + user from DB and populates the cache.
// If the session has OAuthRoleIDs (temporary role mapping), those are used
// instead of the user's persisted roles.
func rebuildSessionCache(ctx context.Context, tokenHash, userID string) (cache.CachedSession, error) {
	var session model.Session
	if err := db.Session(ctx).Where("token = ? AND is_valid = ?", tokenHash, true).
		First(&session).Error; err != nil {
		return cache.CachedSession{}, util.NewErrorMessage("E4011", "Session expired, please login again", err)
	}
	if session.IsExpired() {
		session.Invalidate()
		db.Session(ctx).Select("IsValid").Save(&session)
		return cache.CachedSession{}, util.NewErrorMessage("E4011", "Session expired, please login again")
	}

	var user model.User

	// If session carries temporary OAuth role IDs, override the user's
	// persisted roles so the session keeps using the OIDC-provided roles.
	if len(session.TemporaryRoleIDs) != 0 {
		if err := db.Session(ctx).Where("resource_id = ?", userID).First(&user).Error; err != nil {
			return cache.CachedSession{}, util.NewErrorMessage("E4012", "User not found", err)
		}
		user.Roles = loadRolesFromCache(ctx, session.TemporaryRoleIDs)
	} else {
		if err := db.Session(ctx).
			Where("resource_id = ?", userID).
			First(&user).Error; err != nil {
			return cache.CachedSession{}, util.NewErrorMessage("E4012", "User not found", err)
		}
		var roleIDs []string
		// SELECT t_role.resource_id FROM `t_user_roles` join `t_role` on `t_role`.id = t_user_roles.role_id where user_id = "1";
		if err := db.Session(ctx).Table("t_user_roles").
			Joins("join `t_role` on `t_role`.id = t_user_roles.role_id").
			Select("t_role.resource_id").Where("user_id = ?", user.ID).Pluck("t_role.resource_id", &roleIDs).Error; err != nil {
			return cache.CachedSession{}, util.NewErrorMessage("E4012", "User not found", err)
		}
		user.Roles = loadRolesFromCache(ctx, roleIDs)
	}

	user.Source = session.Source

	cs := cache.NewCachedSession(&session, &user)

	_ = cache.Sessions.Set(ctx, tokenHash, cs)
	return cs, nil
}

// loadRolesFromCache loads full Role objects from the Roles cache, falling back
// to DB for misses. Roles that no longer exist are silently skipped.
func loadRolesFromCache(ctx context.Context, roleIDs []string) []model.Role {
	roles := make([]model.Role, 0, len(roleIDs))
	for _, rid := range roleIDs {
		role, err := cache.Roles.GetOrLoad(ctx, rid, func() (model.Role, error) {
			var r model.Role
			if err := db.Session(ctx).Where("resource_id = ?", rid).
				Preload("Permissions").
				Preload("AIToolPermissions").
				First(&r).Error; err != nil {
				return r, err
			}
			return r, nil
		})
		if err != nil {
			continue
		}
		roles = append(roles, role)
	}
	return roles
}

// loadOrganizations resolves organizations based on the user's roles.
func loadOrganizations(ctx context.Context, roles []model.Role) []model.Organization {
	var isGlobalRole bool
	var orgIDs []string
	for _, role := range roles {
		if (role.OrganizationID == nil || *role.OrganizationID == "") && len(role.Permissions) > 0 {
			isGlobalRole = true
			break
		}
		if role.OrganizationID != nil && *role.OrganizationID != "" {
			orgIDs = append(orgIDs, *role.OrganizationID)
		}
	}

	orgs := []model.Organization{}
	q := db.Session(ctx).Model(&model.Organization{}).Limit(100)
	if isGlobalRole {
		q.Where("1 = 1")
	} else {
		q.Where("resource_id IN (?)", orgIDs)
	}
	_ = q.Find(&orgs).Error
	return orgs
}
