package authorizationapi

import (
	"errors"
	"net/http"
	"slices"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
	w "github.com/sven-victor/ez-utils/wrapper"
)

// UserController API controller for user-related operations
type UserController struct {
	service *service.Service
}

func NewUserController(service *service.Service) *UserController {
	return &UserController{service: service}
}

// RegisterRoutes registers user-related routes
func (c *UserController) RegisterRoutes(router *gin.RouterGroup) {
	users := router.Group("/users")
	{
		users.GET("", middleware.RequirePermission("authorization:user:list"), c.ListUsers)
		users.GET("/:id", middleware.RequirePermission("authorization:user:view"), c.GetUser)
		users.POST("", middleware.RequirePermission("authorization:user:create"), c.CreateUser)
		users.PUT("/:id", middleware.RequirePermission("authorization:user:update"), c.UpdateUser)
		users.DELETE("/:id", middleware.RequirePermission("authorization:user:delete"), c.DeleteUser)
		users.PUT("/:id/status", middleware.RequirePermission("authorization:user:update"), c.UpdateUserStatus)
		users.PUT("/:id/password", middleware.RequirePermission("authorization:user:reset-password"), c.ResetUserPassword)
		users.PUT("/:id/roles", middleware.RequirePermission("authorization:user:assign-roles"), c.AssignRoles)
		users.GET("/:id/audit-logs", middleware.RequirePermission("authorization:user:view_audit_logs"), c.GetUserLogs)
		users.POST("/:id/restore", middleware.RequirePermission("authorization:user:update"), c.RestoreUser)
		users.POST("/:id/unlock", middleware.RequirePermission("authorization:user:update"), c.UnlockUser)
		users.GET("/ldap-users", middleware.RequirePermission("authorization:user:list"), c.GetLdapUsers)
	}

	// Profile management (for current user)
	profile := router.Group("/profile")
	{
		profile.GET("", c.GetCurrentUser)
		profile.PUT("", c.UpdateCurrentUser)
		profile.PUT("/password", c.ChangePassword)
		profile.GET("/audit-logs", c.GetCurrentUserLogs)
	}

	// Auth routes (no JWT required)
	auth := router.Group("/auth")
	middleware.WithoutAuthentication(auth)
	{
		auth.POST("/login", c.Login)
	}
	router.POST("/auth/logout", c.Logout)
}

// ListUsers gets a list of users
func (c *UserController) ListUsers(ctx *gin.Context) {
	// Parse query parameters
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	keywords := ctx.Query("keywords")
	status := ctx.Query("status")

	users, total, err := c.service.ListUsers(ctx, keywords, status, current, pageSize)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5001",
			Err:     err,
			Message: "Failed to get user list",
		})
		return
	}
	// Return user list
	ctx.JSON(http.StatusOK, gin.H{
		"code":      "0",
		"data":      users,
		"total":     total,
		"current":   current,
		"page_size": pageSize,
	})
}

// GetUser gets a user by ID
func (c *UserController) GetUser(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code: "E4001",
			Err:  errors.New("Invalid user ID"),
		})
		return
	}

	passwordExpiryDays, err := c.service.GetIntSetting(ctx, model.SettingPasswordExpiryDays, 0)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5003",
			Err:     err,
			Message: "Failed to get password expiry days",
		})
		return
	}
	// Get user from database with roles
	user, err := c.service.GetUserByID(ctx, id, service.WithRoles(true), service.WithCache(true), service.WithSoftDeleted(true))
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", "Failed to get user", err))
		return
	}
	if user.IsDeleted() {
		user.Status = model.UserStatusDeleted
	} else if user.IsLocked() {
		user.Status = model.UserStatusLocked
	} else if user.IsPasswordExpired(passwordExpiryDays) {
		user.Status = model.UserStatusPasswordExpired
	}
	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": user,
	})
}

// CreateUser creates a new user
func (c *UserController) CreateUser(ctx *gin.Context) {
	var req service.CreateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code: "E4002",
			Err:  err,
		})
		return
	}
	if len(req.RoleIDs) != 0 {
		middleware.RequirePermission("authorization:user:create")(ctx)
		if ctx.IsAborted() {
			return
		}
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		"", // No resourceID before creating the user
		func(auditLog *model.AuditLog) error {
			user, err := c.service.CreateUser(ctx, req)
			if err != nil {
				return err
			}
			auditLog.Details.NewData = user
			req.Password = ""
			auditLog.Details.Request = req

			ctx.JSON(http.StatusCreated, gin.H{
				"code": "0",
				"data": user,
			})
			return nil
		},
	)

	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5003",
			Err:     err,
			Message: "Failed to create user",
		})
	}
}

// UpdateUser updates a user
func (c *UserController) UpdateUser(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code: "E4001",
			Err:  errors.New("Invalid user ID"),
		})
		return
	}

	// Bind request body
	var req service.UpdateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code: "E4002",
			Err:  err,
		})
		return
	}
	user, err := c.service.GetUserByID(ctx, id, service.WithCache(true), service.WithRoles(true))
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", "Failed to get user", err))
		return
	}

	if req.RoleIDs != nil {
		newRoleIDs := w.Map(*req.RoleIDs, func(item string) string {
			return item
		})
		oldRoleIDs := w.Map(user.Roles, func(role model.Role) string {
			return role.ResourceID
		})
		sort.Strings(newRoleIDs)
		sort.Strings(oldRoleIDs)
		if slices.Equal(newRoleIDs, oldRoleIDs) {
			req.RoleIDs = nil
		} else {
			middleware.RequirePermission("authorization:user:assign-roles")(ctx)
			if ctx.IsAborted() {
				return
			}
		}
	}

	// Use StartAudit to refactor audit log recording
	err = c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			newUser, err := c.service.PatchUser(ctx, id, req)
			if err != nil {
				return err
			}
			auditLog.Details.NewData = *newUser

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": newUser,
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.OldData = *user
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5004",
			Err:     err,
			Message: "Failed to update user",
		})
	}
}

// DeleteUser deletes a user
func (c *UserController) DeleteUser(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code: "E4001",
			Err:  errors.New("Invalid user ID"),
		})
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			if err := c.service.DeleteUser(ctx, id); err != nil {
				return err
			}

			// Clear user cache
			middleware.DeleteUserCache(id)

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": gin.H{"message": "User deleted successfully"},
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			// Get user information before deletion for audit log
			targetUser, err := c.service.GetUserByID(ctx, id, service.WithCache(true), service.WithRoles(true))
			if err != nil {
				targetUser = &model.User{Base: model.Base{ResourceID: id}}
			}
			auditLog.Details.OldData = targetUser
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5005",
			Err:     err,
			Message: "Failed to delete user",
		})
	}
}

// UpdateUserStatus updates a user's status
func (c *UserController) UpdateUserStatus(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code: "E4001",
			Err:  errors.New("Invalid user ID"),
		})
		return
	}

	// Bind request body
	var req struct {
		Status string `json:"status" binding:"required"`
	}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code: "E4002",
			Err:  err,
		})
		return
	}

	user, err := c.service.GetUserByID(ctx, id, service.WithCache(true), service.WithRoles(true))
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", "Failed to get user", err))
		return
	}

	// Use StartAudit to refactor audit log recording
	err = c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			newUser, err := c.service.PatchUser(ctx, id, service.UpdateUserRequest{Status: req.Status})
			if err != nil {
				return err
			}
			auditLog.Details.NewData = *newUser

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": newUser,
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.OldData = *user
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5006",
			Err:     err,
			Message: "Failed to update user status",
		})
	}
}

// ResetUserPassword resets a user's password
func (c *UserController) ResetUserPassword(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code: "E4001",
			Err:  errors.New("Invalid user ID"),
		})
		return
	}

	// Bind request body
	var req struct {
		Password string `json:"password"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E4002",
			Err:     err,
			Message: "Invalid request body",
		})
		return
	}
	if req.Password == "" {
		req.Password = util.GenerateRandomPassword(12)
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			sendEmail, err := c.service.ResetPassword(ctx, id, req.Password)
			if err != nil {
				return err
			}

			if !sendEmail {
				util.RespondWithSuccess(ctx, 200, gin.H{"new_password": req.Password})
			} else {
				util.RespondWithSuccess(ctx, 200, gin.H{})
			}
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.OldData = gin.H{
				"password": strings.Repeat("*", len(req.Password)),
			}
			auditLog.Action = "authorization:user:reset_password"
			auditLog.ActionName = "Reset User Password"
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5007",
			Err:     err,
			Message: "Failed to reset user password",
		})
	}
}

// AssignRoles assigns roles to a user
func (c *UserController) AssignRoles(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code: "E4001",
			Err:  errors.New("Invalid user ID"),
		})
		return
	}

	// Bind request body
	var req struct {
		RoleIDs []string `json:"role_ids" binding:"required"`
	}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E4002",
			Err:     err,
			Message: "Invalid request body",
		})
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			err := c.service.AssignRoles(ctx, id, req.RoleIDs)
			if err != nil {
				return err
			}

			// Clear user cache
			middleware.DeleteUserCache(id)

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": gin.H{"message": "Role assignment successful"},
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {

			// Get user information for audit log
			targetUser, err := c.service.GetUserByID(ctx, id, service.WithCache(true), service.WithRoles(true))
			if err != nil {
				targetUser = &model.User{Base: model.Base{ResourceID: id}}
			}
			auditLog.Details.OldData = targetUser
			auditLog.Details.Request = req
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5008",
			Err:     err,
			Message: "Failed to assign roles to user",
		})
	}
}

// GetCurrentUser gets the current user's information
func (c *UserController) GetCurrentUser(ctx *gin.Context) {
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4012",
			Err:      errors.New("failed to get user info"),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": user,
	})
}

// UpdateCurrentUser updates the current user's information
func (c *UserController) UpdateCurrentUser(ctx *gin.Context) {
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4012",
			Err:      errors.New("failed to get user info"),
		})
		return
	}

	// Bind request body
	var req struct {
		Email    string `json:"email" binding:"required,email"`
		FullName string `json:"full_name"`
		Phone    string `json:"phone"`
		Avatar   string `json:"avatar"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E4002",
			Err:     err,
			Message: "Invalid request body",
		})
		return
	}

	user.Roles = w.Map(user.Roles, func(role model.Role) model.Role {
		role.Permissions = nil
		return role
	})

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		user.ResourceID,
		func(auditLog *model.AuditLog) error {
			newUser, err := c.service.PatchUser(ctx, user.ResourceID,
				service.UpdateUserRequest{
					Email:    req.Email,
					FullName: req.FullName,
					Phone:    req.Phone,
					Avatar:   req.Avatar,
				},
			)
			if err != nil {
				return err
			}
			auditLog.Details.NewData = *newUser

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": newUser,
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.OldData = user
			auditLog.Details.Request = req
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5010",
			Err:     err,
			Message: "Failed to update current user",
		})
	}
}

// ChangePassword handles user password change
func (c *UserController) ChangePassword(ctx *gin.Context) {
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4012",
			Err:      errors.New("failed to get user info"),
		})
		return
	}

	// Bind request body
	var req struct {
		OldPassword string `json:"old_password" binding:"required"`
		NewPassword string `json:"new_password" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E4002",
			Err:     err,
			Message: "Invalid request body",
		})
		return
	}

	// Use StartAudit to refactor audit log recording
	err := c.service.AuditLogService.StartAudit(
		ctx,
		user.ResourceID,
		func(auditLog *model.AuditLog) error {
			err := c.service.ChangePassword(ctx, user.ResourceID, service.ChangePasswordRequest{
				OldPassword: req.OldPassword,
				NewPassword: req.NewPassword,
			})
			if err != nil {
				return err
			}

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": gin.H{"message": "Password changed successfully"},
			})
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Action = "authorization:user:change_password"
			auditLog.ActionName = "Change Password"
			auditLog.Details.Request = gin.H{
				"old_password": strings.Repeat("*", len(req.OldPassword)),
				"new_password": strings.Repeat("*", len(req.NewPassword)),
			}
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5011",
			Err:     err,
			Message: "Failed to change password",
		})
	}
}

// Login handles user login
func (c *UserController) Login(ctx *gin.Context) {
	logger := log.GetContextLogger(ctx)
	// Bind request body
	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
		MFACode  string `json:"mfa_code"`
		MFAToken string `json:"mfa_token"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E4002",
			Err:     err,
			Message: "Invalid request body",
		})
		return
	}
	if req.MFAToken != "" {
		if req.MFACode == "" {
			util.RespondWithError(ctx, util.ErrorResponse{
				Code:    "E4002",
				Err:     errors.New("mfa_code is required"),
				Message: "MFA code is required",
			})
			return
		}
	} else {
		if req.Username == "" || req.Password == "" {
			util.RespondWithError(ctx, util.ErrorResponse{
				Code:    "E4002",
				Err:     errors.New("username and password are required"),
				Message: "Username and password are required",
			})
			return
		}
	}

	err := c.service.AuditLogService.StartAudit(
		ctx,
		"",
		func(auditLog *model.AuditLog) error {
			auditLog.Action = "authorization:user:login"
			auditLog.ActionName = "User Login"
			var loginResponseData *service.LoginResponse
			var err error
			if req.MFACode != "" && req.MFAToken != "" {
				loginResponseData, err = c.service.LoginWithMFA(ctx, req.MFACode, req.MFAToken)
				if err != nil {
					return err
				}
			} else {
				// Call login service
				loginResponseData, err = c.service.Login(ctx, req.Username, req.Password)
				if err != nil {
					return err
				}
				// Special handling for MFA requirement
				if loginResponseData != nil && loginResponseData.NeedsMFA {
					ctx.JSON(http.StatusOK, gin.H{
						"code": "0",
						"data": gin.H{
							"needs_mfa": loginResponseData.NeedsMFA,
							"mfa_token": loginResponseData.MFAToken,
							"mfa_type":  loginResponseData.MFAType,
							"user":      loginResponseData.User,
						},
					})
					return nil
				}
			}
			if loginResponseData.User.ResourceID != "" {
				auditLog.UserID = loginResponseData.User.ResourceID
			}
			_, err = c.service.CreateSession(ctx, loginResponseData.User.ResourceID, loginResponseData.Token, "", "", loginResponseData.ExpiresAt)
			if err != nil {
				level.Error(logger).Log("msg", "Failed to create session record", "err", err.Error())
			}

			// Return token and user info
			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": loginResponseData,
			})
			return nil
		},
		service.WithAfterFilters(func(auditLog *model.AuditLog) {
			auditLog.Username = req.Username
			auditLog.Details.Request = gin.H{
				"username": req.Username,
				"password": strings.Repeat("*", len(req.Password)),
				"mfa_code": strings.Repeat("*", len(req.MFACode)),
			}
			if len(auditLog.UserID) == 0 {
				userID, err := c.service.GetUserIDByUsername(ctx, req.Username)
				if err != nil {
					auditLog.UserID = userID
				}
			}
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5011",
			Err:     err,
			Message: "Failed to login",
		})
	}
}

// RefreshToken refreshes the user's JWT token
func (c *UserController) RefreshToken(ctx *gin.Context) {
	// Get user from context
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4012",
			Err:      errors.New("failed to get user info"),
		})
		return
	}

	securitySettings, err := c.service.SettingService.GetSecuritySettings(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5012",
			Err:      err,
			Message:  "Failed to get security settings",
		})
	}
	// Generate new token
	token, err := middleware.GenerateToken(ctx, middleware.JWTIssuerLogin, user.ResourceID, user.Username, time.Duration(securitySettings.SessionTimeoutMinutes)*time.Minute)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5012",
			Err:     err,
			Message: "Failed to generate token",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": gin.H{
			"token": token,
		},
	})
}

// Logout handles user logout
func (c *UserController) Logout(ctx *gin.Context) {
	// Get current user information
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4012",
			Err:      errors.New("failed to get user info"),
		})
		return
	}

	// Use StartAudit to record logout log
	err := c.service.AuditLogService.StartAudit(
		ctx,
		user.ResourceID,
		func(auditLog *model.AuditLog) error {
			auditLog.Action = "authorization:user:logout"
			auditLog.ActionName = "Logout"
			token := ctx.GetHeader("Authorization")
			_, after, _ := strings.Cut(token, " ")
			if after != "" {
				c.service.DeleteSession(ctx, user.ResourceID, after)
			}

			ctx.JSON(http.StatusOK, gin.H{
				"code": "0",
				"data": gin.H{"message": "Logout successful"},
			})
			return nil
		},
	)

	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5009",
			Err:     err,
			Message: "Failed to logout",
		})
	}
}

// GetCurrentUserLogs gets the audit logs for the current user
func (c *UserController) GetCurrentUserLogs(ctx *gin.Context) {
	var filters service.AuditLogFilters
	if err := ctx.BindQuery(&filters); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E4001",
			Err:     err,
			Message: "Failed to parse query parameters",
		})
		return
	}
	page, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	if page < 1 {
		page = 1
	}

	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	if pageSize < 1 || pageSize > 100 {
		pageSize = 10
	}
	// Get current user from context
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4012",
			Err:      errors.New("failed to get user info"),
		})
		return
	}
	filters.UserID = user.ResourceID
	filters.Username = ""
	// Query audit logs for the current user
	logs, total, err := c.service.GetAuditLogs(ctx, filters, page, pageSize)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5001",
			Err:     err,
			Message: "Failed to get audit logs",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code":      "0",
		"data":      logs,
		"total":     total,
		"current":   page,
		"page_size": pageSize,
	})
}

// GetUserLogs gets the audit logs for a specific user
func (c *UserController) GetUserLogs(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E4001",
			Err:     errors.New("User ID cannot be empty"),
			Message: "User ID cannot be empty",
		})
		return
	}

	// Parse query parameters
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	if current < 1 {
		current = 1
	}

	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	if pageSize < 1 || pageSize > 100 {
		pageSize = 10
	}
	var filters service.AuditLogFilters
	if err := ctx.BindQuery(&filters); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E4001",
			Err:     err,
			Message: "Failed to parse query parameters",
		})
		return
	}

	filters.UserID = id
	filters.Username = ""
	// Query audit logs for the specified user
	logs, total, err := c.service.GetAuditLogs(ctx, filters, current, pageSize)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5001",
			Err:     err,
			Message: "Failed to get audit logs",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code":      "0",
		"data":      logs,
		"total":     total,
		"current":   current,
		"page_size": pageSize,
	})
}
func (c *UserController) UnlockUser(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewError("E4001", "User ID cannot be empty"))
		return
	}
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			err := c.service.UnlockUser(ctx, id)
			if err != nil {
				return err
			}
			util.RespondWithSuccess(ctx, http.StatusOK, gin.H{"message": "User unlocked successfully"})
			return nil
		},
	)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			Code:    "E5001",
			Err:     err,
			Message: "Failed to unlock user",
		})
	}
}

func (c *UserController) RestoreUser(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewError("E4001", "User ID cannot be empty"))
		return
	}
	err := c.service.AuditLogService.StartAudit(
		ctx,
		id,
		func(auditLog *model.AuditLog) error {
			err := c.service.RestoreUser(ctx, id)
			if err != nil {
				return err
			}
			util.RespondWithSuccess(ctx, http.StatusOK, gin.H{"message": "User restored successfully"})
			return nil
		},
	)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", "Failed to restore user"))
	}
}

func (c *UserController) GetLdapUsers(ctx *gin.Context) {
	skipExisting := ctx.Query("skip_existing") == "true"
	users, err := c.service.GetLdapUsers(ctx, skipExisting)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", "Failed to get LDAP users"))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, users)
}

func init() {
	middleware.RegisterPermission("User Management", "Manage user creation, editing, deletion, and permission assignment", []model.Permission{
		{
			Code:        "authorization:user:list",
			Name:        "List users",
			Description: "List users",
		},
		{
			Code:        "authorization:user:view",
			Name:        "View users",
			Description: "View details",
		},
		{
			Code:        "authorization:user:create",
			Name:        "Create users",
			Description: "Create new users",
		},
		{
			Code:        "authorization:user:update",
			Name:        "Update users",
			Description: "Update user information",
		},
		{
			Code:        "authorization:user:reset-password",
			Name:        "Reset User Password",
			Description: "Reset user password",
		},
		{
			Code:        "authorization:user:assign-roles",
			Name:        "Assign roles to users",
			Description: "Assign roles to users",
		},
		{
			Code:        "authorization:user:delete",
			Name:        "Delete users",
			Description: "Delete users",
		},
		{
			Code:        "authorization:user:view_audit_logs",
			Name:        "View User Audit Logs",
			Description: "View user audit logs",
		},
	})
}
