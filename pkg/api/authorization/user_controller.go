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
//
//	@Summary		Get user list
//	@Description	Get a list of users with optional filtering
//	@ID             listUsers
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int		false	"Current page number"		default(1)
//	@Param			page_size	query		int		false	"Number of items per page"	default(10)
//	@Param			keywords	query		string	false	"Keywords for searching"
//	@Param			status		query		string	false	"Status of the user"
//	@Success		200			{object}	util.PaginationResponse[model.User]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/users [get]
func (c *UserController) ListUsers(ctx *gin.Context) {
	// Parse query parameters
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	keywords := ctx.Query("keywords")
	status := ctx.Query("status")

	users, total, err := c.service.ListUsers(ctx, keywords, status, current, pageSize)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get user list", err))
		return
	}
	// Return user list
	util.RespondWithSuccessList(ctx, http.StatusOK, users, total, current, pageSize)
}

// GetUser gets a user by ID
//
//	@Summary		Get user by ID
//	@Description	Get a user by ID
//	@ID             getUser
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"User ID"
//	@Success		200	{object}	util.Response[model.User]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/users/{id} [get]
func (c *UserController) GetUser(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid user ID"))
		return
	}

	passwordExpiryDays, err := c.service.GetIntSetting(ctx, model.SettingPasswordExpiryDays, 0)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5003", "Failed to get password expiry days", err))
		return
	}
	// Get user from database with roles
	user, err := c.service.GetUserByID(ctx, id, service.WithRoles(true), service.WithCache(true), service.WithSoftDeleted(true))
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5002", "Failed to get user", err))
		return
	}
	if user.IsLDAPUser() {
		allowChangePassword, _ := c.service.GetBoolSetting(ctx, model.SettingLDAPAllowManageUserPassword, false)
		if !allowChangePassword {
			passwordExpiryDays = 0
		}
	}
	if user.IsDeleted() {
		user.Status = model.UserStatusDeleted
	} else if user.IsLocked() {
		user.Status = model.UserStatusLocked
	} else if user.IsPasswordExpired(passwordExpiryDays) {
		user.Status = model.UserStatusPasswordExpired
	}
	util.RespondWithSuccess(ctx, http.StatusOK, user)
}

// CreateUser creates a new user
//
//	@Summary		Create a new user
//	@Description	Create a new user
//	@ID             createUser
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			user	body		service.CreateUserRequest	true	"User information"
//	@Success		200		{object}	util.Response[model.User]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/users [post]
func (c *UserController) CreateUser(ctx *gin.Context) {
	var req service.CreateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
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

			util.RespondWithSuccess(ctx, http.StatusCreated, user)
			return nil
		},
	)

	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5003", "Failed to create user", err))
	}
}

// UpdateUser updates a user
//
//	@Summary		Update a user
//	@Description	Update a user
//	@ID             updateUser
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string						true	"User ID"
//	@Param			user	body		service.UpdateUserRequest	true	"User information"
//	@Success		200		{object}	util.Response[model.User]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/users/{id} [put]
func (c *UserController) UpdateUser(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid user ID"))
		return
	}

	// Bind request body
	var req service.UpdateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
		return
	}
	user, err := c.service.GetUserByID(ctx, id, service.WithCache(true), service.WithRoles(true))
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5002", "Failed to get user", err))
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
//
//	@Summary		Delete a user
//	@Description	Delete a user
//	@ID             deleteUser
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"User ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/users/{id} [delete]
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

			util.RespondWithMessage(ctx, "User deleted successfully")
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
		util.RespondWithError(ctx, util.NewErrorMessage("E5005", "Failed to delete user", err))
	}
}

type UpdateUserStatusRequest struct {
	Status string `json:"status" binding:"required"`
}

// UpdateUserStatus updates a user's status
//
//	@Summary		Update a user's status
//	@Description	Update a user's status
//	@ID             updateUserStatus
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string	true	"User ID"
//	@Param			request	body		UpdateUserStatusRequest	true	"Update user status request"
//	@Success		200		{object}	util.Response[model.User]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/users/{id}/status [put]
func (c *UserController) UpdateUserStatus(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid user ID"))
		return
	}

	// Bind request body
	var req UpdateUserStatusRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4002", err))
		return
	}

	user, err := c.service.GetUserByID(ctx, id, service.WithCache(true), service.WithRoles(true))
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5002", "Failed to get user", err))
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

			util.RespondWithSuccess(ctx, http.StatusOK, newUser)
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.OldData = *user
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5006", "Failed to update user status", err))
	}
}

type ResetUserPasswordRequest struct {
	Password string `json:"password"`
}

type ResetUserPasswordResponse struct {
	NewPassword string `json:"new_password,omitempty"`
}

// ResetUserPassword resets a user's password
//
//	@Summary		Reset a user's password
//	@Description	Reset a user's password
//	@ID             resetUserPassword
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string		true	"User ID"
//	@Param			request	body		ResetUserPasswordRequest	true	"Reset user password request"
//	@Success		200		{object}	util.Response[ResetUserPasswordResponse]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/users/{id}/password [put]
func (c *UserController) ResetUserPassword(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid user ID"))
		return
	}

	// Bind request body
	var req ResetUserPasswordRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4002", "Invalid request body", err))
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
				util.RespondWithSuccess(ctx, 200, ResetUserPasswordResponse{NewPassword: req.Password})
			} else {
				util.RespondWithSuccess(ctx, 200, ResetUserPasswordResponse{})
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
		util.RespondWithError(ctx, util.NewErrorMessage("E5007", "Failed to reset user password", err))
	}
}

type AssignRolesRequest struct {
	RoleIDs []string `json:"role_ids" binding:"required"`
}

// AssignRoles assigns roles to a user
//
//	@Summary		Assign roles to a user
//	@Description	Assign roles to a user
//	@ID             assignRoles
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string		true	"User ID"
//	@Param			request	body		AssignRolesRequest	true	"Assign roles to user request"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/users/{id}/roles [post]
func (c *UserController) AssignRoles(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid user ID"))
		return
	}

	// Bind request body
	var req AssignRolesRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4002", "Invalid request body", err))
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

			util.RespondWithMessage(ctx, "Role assignment successful")
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
		util.RespondWithError(ctx, util.NewErrorMessage("E5008", "Failed to assign roles to user", err))
	}
}

// GetCurrentUser gets the current user's information
//
//	@Summary		Get current user's information
//	@Description	Get current user's information
//	@ID             getCurrentUser
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[model.User]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/profile [get]
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
	if user.IsLDAPUser() {
		allowChangePassword, _ := c.service.GetBoolSetting(ctx, model.SettingLDAPAllowManageUserPassword, false)
		user.DisableChangePassword = !allowChangePassword
	}

	util.RespondWithSuccess(ctx, http.StatusOK, user)
}

type UpdateCurrentUserRequest struct {
	Email    string `json:"email" binding:"required,email"`
	FullName string `json:"full_name"`
	Phone    string `json:"phone"`
	Avatar   string `json:"avatar"`
}

// UpdateCurrentUser updates the current user's information
//
//	@Summary		Update current user's information
//	@Description	Update current user's information
//	@ID             updateCurrentUser
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			request	body		UpdateCurrentUserRequest	true	"Update current user request"
//	@Success		200		{object}	util.Response[model.User]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/profile [put]
func (c *UserController) UpdateCurrentUser(ctx *gin.Context) {
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "failed to get user info"))
		return
	}

	// Bind request body
	var req UpdateCurrentUserRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4002", "Invalid request body", err))
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

			util.RespondWithSuccess(ctx, http.StatusOK, newUser)
			return nil
		},
		service.WithBeforeFilters(func(auditLog *model.AuditLog) {
			auditLog.Details.OldData = user
			auditLog.Details.Request = req
		}),
	)

	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5010", "Failed to update current user", err))
	}
}

type ChangePasswordRequest struct {
	OldPassword string `json:"old_password" binding:"required"`
	NewPassword string `json:"new_password" binding:"required"`
}

// ChangePassword handles user password change
//
//	@Summary		Change user password
//	@Description	Change user password
//	@ID             changePassword
//	@Tags			Authorization/Profile
//	@Accept			json
//	@Produce		json
//	@Param			password	body		ChangePasswordRequest	true	"Change password request"
//	@Success		200			{object}	util.Response[util.MessageData]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/profile/password [put]
func (c *UserController) ChangePassword(ctx *gin.Context) {
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "failed to get user info"))
		return
	}

	// Bind request body
	var req ChangePasswordRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4002", "Invalid request body", err))
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

			util.RespondWithMessage(ctx, "Password changed successfully")
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
		util.RespondWithError(ctx, util.NewErrorMessage("E5011", "Failed to change password", err))
	}
}

type MFALoginRequest struct {
	MFACode  string `json:"mfa_code"`
	MFAToken string `json:"mfa_token"`
}
type PasswordLoginRequest struct {
	MFACode  string `json:"mfa_code"`
	MFAToken string `json:"mfa_token"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	MFACode  string `json:"mfa_code"`
	MFAToken string `json:"mfa_token"`
}

// Login handles user login
//
//	@Summary		User login
//	@Description	User login
//	@ID             login
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			login	body		LoginRequest	true	"Login request"
//	@Success		200		{object}	util.Response[service.LoginResponse]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/auth/login [post]
func (c *UserController) Login(ctx *gin.Context) {
	logger := log.GetContextLogger(ctx)
	// Bind request body
	var req LoginRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4002", "Invalid request body", err))
		return
	}
	if req.MFAToken != "" {
		if req.MFACode == "" {
			util.RespondWithError(ctx, util.NewErrorMessage("E4002", "MFA code is required"))
			return
		}
	} else {
		if req.Username == "" || req.Password == "" {
			util.RespondWithError(ctx, util.NewErrorMessage("E4002", "Username and password are required"))
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
			_, err = c.service.CreateSession(ctx, loginResponseData.User.ResourceID, loginResponseData.Token, ctx.ClientIP(), ctx.Request.UserAgent(), loginResponseData.ExpiresAt)
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
		util.RespondWithError(ctx, util.NewErrorMessage("E5011", "Failed to login", err))
	}
}

type TokenResponse struct {
	Token string `json:"token"`
}

// RefreshToken refreshes the user's JWT token
//
//	@Summary		Refresh user's JWT token
//	@Description	Refresh user's JWT token
//	@ID             refreshToken
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[TokenResponse]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/refresh [post]
func (c *UserController) RefreshToken(ctx *gin.Context) {
	// Get user from context
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "failed to get user info"))
		return
	}

	securitySettings, err := c.service.SettingService.GetSecuritySettings(ctx)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5012", "Failed to get security settings", err))
	}
	// Generate new token
	token, err := middleware.GenerateToken(ctx, middleware.JWTIssuerLogin, user.ResourceID, user.Username, time.Duration(securitySettings.SessionTimeoutMinutes)*time.Minute)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5012", "Failed to generate token", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, TokenResponse{Token: token})
}

// Logout handles user logout
//
//	@Summary		User logout
//	@Description	User logout
//	@ID             logout
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[string]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/auth/logout [post]
func (c *UserController) Logout(ctx *gin.Context) {
	// Get current user information
	userInterface, _ := ctx.Get("user")
	user, ok := userInterface.(model.User)
	if !ok {
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "failed to get user info"))
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

			util.RespondWithSuccess(ctx, http.StatusOK, gin.H{"message": "Logout successful"})
			return nil
		},
	)

	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5009", "Failed to logout", err))
	}
}

// GetCurrentUserLogs gets the audit logs for the current user
//
//	@Summary		Get current user's audit logs
//	@Description	Get current user's audit logs
//	@ID             getCurrentUserLogs
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int	false	"Current page number"		default(1)
//	@Param			page_size	query		int	false	"Number of items per page"	default(10)
//	@Success		200			{object}	util.PaginationResponse[model.AuditLog]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/profile/audit-logs [get]
func (c *UserController) GetCurrentUserLogs(ctx *gin.Context) {
	var filters service.AuditLogFilters
	if err := ctx.BindQuery(&filters); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Failed to parse query parameters", err))
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
		util.RespondWithError(ctx, util.NewErrorMessage("E4012", "failed to get user info"))
		return
	}
	filters.UserID = user.ResourceID
	filters.Username = ""
	// Query audit logs for the current user
	logs, total, err := c.service.GetAuditLogs(ctx, filters, page, pageSize)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get audit logs", err))
		return
	}

	util.RespondWithSuccessList(ctx, http.StatusOK, logs, total, page, pageSize)
}

// GetUserLogs gets the audit logs for a specific user
//
//	@Summary		Get user's audit logs
//	@Description	Get user's audit logs
//	@ID             getUserLogs
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			id			path		string	true	"User ID"
//	@Param			current		query		int		false	"Current page number"		default(1)
//	@Param			page_size	query		int		false	"Number of items per page"	default(10)
//	@Success		200			{object}	util.PaginationResponse[model.AuditLog]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/users/{id}/audit-logs [get]
func (c *UserController) GetUserLogs(ctx *gin.Context) {
	// Get user ID from URL
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "User ID cannot be empty"))
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
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Failed to parse query parameters", err))
		return
	}

	filters.UserID = id
	filters.Username = ""
	// Query audit logs for the specified user
	logs, total, err := c.service.GetAuditLogs(ctx, filters, current, pageSize)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get audit logs", err))
		return
	}

	util.RespondWithSuccessList(ctx, http.StatusOK, logs, total, current, pageSize)
}

// UnlockUser unlocks a user
//
//	@Summary		Unlock a user
//	@Description	Unlock a user
//	@ID             unlockUser
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"User ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/users/{id}/unlock [post]
func (c *UserController) UnlockUser(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "User ID cannot be empty"))
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
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to unlock user", err))
	}
}

// RestoreUser restores a user
//
//	@Summary		Restore a user
//	@Description	Restore a user
//	@ID             restoreUser
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"User ID"
//	@Success		200	{object}	util.Response[string]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/users/{id}/restore [post]
func (c *UserController) RestoreUser(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "User ID cannot be empty"))
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
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to restore user"))
	}
}

// GetLdapUsers gets LDAP users
//
//	@Summary		Get LDAP users
//	@Description	Get LDAP users
//	@ID             getLdapUsers
//	@Tags			Authorization/Users
//	@Accept			json
//	@Produce		json
//	@Param			skip_existing	query		bool	false	"Skip existing users"	default(false)
//	@Success		200				{object}	util.Response[[]model.User]
//	@Failure		500				{object}	util.ErrorResponse
//	@Router			/api/authorization/ldap/users [get]
func (c *UserController) GetLdapUsers(ctx *gin.Context) {
	skipExisting := ctx.Query("skip_existing") == "true"
	users, err := c.service.GetLdapUsers(ctx, skipExisting)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get LDAP users"))
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
