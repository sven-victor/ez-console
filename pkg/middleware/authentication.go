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
			jwtMiddleware(c, after)
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
		serviceAuthenticationMiddleware(c, username, password)
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

func serviceAuthenticationMiddleware(c *gin.Context, accessKey, secretKey string) {
	var key ServiceAccountAccessKeyWithStatus
	if err := db.Session(c).Model(&model.ServiceAccountAccessKey{}).Select("`t_service_account_access_key`.*", "`t_service_account`.`status` as `service_account_status`").
		Joins("left join `t_service_account` on `t_service_account_access_key`.`service_account_id` = `t_service_account`.`resource_id`").
		Where("`t_service_account_access_key`.`access_key_id` = ?", accessKey).
		First(&key).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code": "E4011",
			"err":  "Invalid authentication token",
		})
		c.Abort()
		return
	}
	db.Session(c).Model(key.ServiceAccountAccessKey).Select("LastUsed").Update("LastUsed", time.Now())
	if key.IsExpired() {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"code": "E4011",
			"err":  "Authentication token has expired",
		})
		return
	}
	if key.SecretAccessKey != secretKey {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"code": "E4011",
			"err":  "Invalid authentication token",
		})
		return
	}
	if !key.IsActive() {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"code": "E4011",
			"err":  "Authentication token is disabled",
		})
		return
	}
	if key.ServiceAccountStatus != model.ServiceAccountStatusActive {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"code": "E4011",
			"err":  "Service account is disabled",
		})
		return
	}

	var serviceAccount model.ServiceAccount
	if err := db.Session(c).Where("resource_id = ?", key.ServiceAccountID).Preload("Roles.Permissions").First(&serviceAccount).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"code": "E4011",
			"err":  "Service account not found",
		})
		return
	}
	if serviceAccount.Status != "active" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"code": "E4011",
			"err":  "Service account is disabled",
		})
		return
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
	db.Session(c).Model(&serviceAccount).Select("LastAccess").Update("last_access", time.Now())

	c.Set("service_account", &serviceAccount)
	c.Set("service_account_id", serviceAccount.ResourceID)
	c.Set("roles", serviceAccount.Roles)
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

func jwtMiddleware(c *gin.Context, tokenString string) {
	cfg := config.GetConfig()
	token, err := cfg.JWT.ParseWithClaims(tokenString, jwt.MapClaims{})
	if err != nil {
		util.RespondWithError(c, util.NewErrorMessage("E4011", "Invalid token", err))
		return
	}

	iat, err := token.Claims.GetIssuedAt()
	if err != nil {
		util.RespondWithError(c, util.NewErrorMessage("E4011", "Invalid token", err))
		return
	}
	sessionIdleTimeoutMinutes, err := settingService.GetIntSetting(c, model.SettingSessionIdleTimeoutMinutes, 0)
	if err != nil {
		util.RespondWithError(c, util.NewErrorMessage("E4011", "Invalid token", err))
		return
	}
	if sessionIdleTimeoutMinutes > 0 && time.Since(iat.Time) > time.Duration(sessionIdleTimeoutMinutes)*time.Minute {
		util.RespondWithError(c, util.NewErrorMessage("E4011", "Session expired, please login again"))
		return
	}

	// Validate token
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Check if token has expired
		exp, err := claims.GetExpirationTime()
		if err != nil {
			util.RespondWithError(c, util.NewErrorMessage("E4011", "Invalid token", err))
			return
		}
		if exp.Before(time.Now()) {
			util.RespondWithError(c, util.NewErrorMessage("E4011", "Token expired"))
			return
		}
		// Get user information
		userID, ok := claims["user_id"].(string)
		if !ok {
			util.RespondWithError(c, util.NewErrorMessage("E4012", "Invalid user ID"))
			return
		}

		// Check session validity
		var session model.Session
		if err := db.Session(c).Where("token = ? AND is_valid = ?", safe.NewHash(sha256.New, []byte(tokenString)).HexString(64), true).First(&session).Error; err == nil {
			// Session exists, check if expired
			if session.IsExpired() {
				// Session has expired, mark as invalid
				session.Invalidate()
				db.Session(c).Select("IsValid").Save(&session)
				util.RespondWithError(c, util.NewErrorMessage("E4011", "Session expired, please login again"))
				return
			}

			// Update last active time
			session.UpdateLastActive()
			db.Session(c).Select("LastActiveAt").Save(&session)

			// Store session information in context
			c.Set("session", &session)
		} else {
			util.RespondWithError(c, util.NewErrorMessage("E4011", "Session expired, please login again", err))
			return
		}

		// Load user information from database
		var user model.User

		if cachedUser, ok := GetUserCache(userID); ok {
			user = cachedUser
		} else {
			if err := db.Session(c).Where("resource_id = ?", userID).Preload("Roles.Permissions").First(&user).Error; err != nil {
				util.RespondWithError(c, util.ErrorResponse{
					HTTPCode: http.StatusUnauthorized,
					Code:     "E4012",
					Err:      err,
					Message:  "User not found",
				})
				return
			}
			SetUserCache(userID, user, time.Minute*10)
		}
		passwordExpiryDays, err := settingService.GetIntSetting(c, model.SettingPasswordExpiryDays, 0)
		if err != nil {
			util.RespondWithError(c, util.NewErrorMessage("E4012", "System configuration error", err))
			return
		}

		if user.IsLDAPUser() {
			allowChangePassword, _ := settingService.GetBoolSetting(c, model.SettingLDAPAllowManageUserPassword, false)
			if !allowChangePassword {
				passwordExpiryDays = 0
			}
		}
		// When the user is not locked, and the password has expired, clear the user's roles/permissions,
		if !user.IsLocked() && user.Status == model.UserStatusPasswordExpired || (passwordExpiryDays > 0 && user.IsPasswordExpired(passwordExpiryDays)) {
			user.Roles = nil
		} else if !user.IsActive() { // Check user status
			util.RespondWithError(c, util.ErrorResponse{
				HTTPCode: http.StatusUnauthorized,
				Code:     "E4012",
				Err:      errors.New("user is disabled"),
				Message:  "User is disabled",
			})
			return
		}
		{
			mfaEnforced, err := settingService.GetBoolSetting(c, model.SettingMFAEnforced, false)
			if err != nil && err != gorm.ErrRecordNotFound {
				util.RespondWithError(c, util.ErrorResponse{
					HTTPCode: http.StatusUnauthorized,
					Code:     "E4012",
					Err:      err,
					Message:  "System configuration error",
				})
				return
			}
			if mfaEnforced || user.MFAEnforced {
				issuer, _ := claims.GetIssuer()
				switch issuer {
				case string(JWTIssuerOAuth):
					var oauthMFAEnabled string
					err := db.Session(c).Model(&model.Setting{}).Select("value").Where("key = ?", model.SettingOAuthMFAEnabled).First(&oauthMFAEnabled).Error
					if err != nil && err != gorm.ErrRecordNotFound {
						util.RespondWithError(c, util.ErrorResponse{
							HTTPCode: http.StatusUnauthorized,
							Code:     "E4012",
							Err:      err,
							Message:  "System configuration error",
						})
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
		// Store user information in context
		c.Set("user", user)
		c.Set("user_id", user.ResourceID)
		c.Set("roles", user.Roles)
		c.Set("session_id", session.ResourceID)
	} else {
		util.RespondWithError(c, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4011",
			Err:      errors.New("invalid token"),
			Message:  "Invalid token",
		})
		return
	}
}
