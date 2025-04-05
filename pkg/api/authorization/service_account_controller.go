package authorizationapi

import (
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// ServiceAccountController Service account controller
type ServiceAccountController struct {
	service *service.Service
}

// NewServiceAccountController Create service account controller
func NewServiceAccountController(s *service.Service) *ServiceAccountController {
	return &ServiceAccountController{
		service: s,
	}
}

// RegisterRoutes Register routes
func (c *ServiceAccountController) RegisterRoutes(router *gin.RouterGroup) {
	// Register all API routes under the authorization group
	serviceAccounts := router.Group("/service-accounts")
	{
		serviceAccounts.GET("", middleware.RequirePermission("authorization:service_account:list"), c.GetServiceAccounts)
		serviceAccounts.GET("/:id", middleware.RequirePermission("authorization:service_account:view"), c.GetServiceAccountByID)
		serviceAccounts.POST("", middleware.RequirePermission("authorization:service_account:create"), c.CreateServiceAccount)
		serviceAccounts.PUT("/:id", middleware.RequirePermission("authorization:service_account:update"), c.UpdateServiceAccount)
		serviceAccounts.DELETE("/:id", middleware.RequirePermission("authorization:service_account:delete"), c.DeleteServiceAccount)
		serviceAccounts.PUT("/:id/status", middleware.RequirePermission("authorization:service_account:update"), c.UpdateServiceAccountStatus)

		// Access key related
		serviceAccounts.GET("/:id/access-keys", middleware.RequirePermission("authorization:service_account:access_key:list"), c.GetServiceAccountAccessKeys)
		serviceAccounts.POST("/:id/access-keys", middleware.RequirePermission("authorization:service_account:access_key:create"), c.CreateServiceAccountAccessKey)
		serviceAccounts.PUT("/:id/access-keys/:keyId", middleware.RequirePermission("authorization:service_account:access_key:update"), c.UpdateServiceAccountAccessKey)
		serviceAccounts.DELETE("/:id/access-keys/:keyId", middleware.RequirePermission("authorization:service_account:access_key:delete"), c.DeleteServiceAccountAccessKey)

		// Role related
		serviceAccounts.GET("/:id/roles", middleware.RequirePermission("authorization:service_account:role:list"), c.GetServiceAccountRoles)
		serviceAccounts.POST("/:id/roles", middleware.RequirePermission("authorization:service_account:role:assign"), c.AssignServiceAccountRoles)

		// Policy related
		serviceAccounts.GET("/:id/policy", middleware.RequirePermission("authorization:service_account:policy:view"), c.GetServiceAccountPolicy)
		serviceAccounts.PUT("/:id/policy", middleware.RequirePermission("authorization:service_account:policy:update"), c.SetServiceAccountPolicy)
	}
}

func init() {
	middleware.RegisterPermission("Service Account Management", "Manage service account creation, editing, deletion, and permission assignment", []model.Permission{
		{
			Code:        "authorization:service_account:list",
			Name:        "List service accounts",
			Description: "List service accounts",
		},
		{
			Code:        "authorization:service_account:view",
			Name:        "View service accounts",
			Description: "View service account list and details",
		},
		{
			Code:        "authorization:service_account:create",
			Name:        "Create service accounts",
			Description: "Create new service accounts",
		},
		{
			Code:        "authorization:service_account:update",
			Name:        "Update service accounts",
			Description: "Update service account information",
		},
		{
			Code:        "authorization:service_account:delete",
			Name:        "Delete service accounts",
			Description: "Delete service accounts",
		},
		{
			Code:        "authorization:service_account:access_key:list",
			Name:        "List service account access keys",
			Description: "List service account access keys",
		},
		{
			Code:        "authorization:service_account:access_key:create",
			Name:        "Create service account access keys",
			Description: "Create new service account access keys",
		},
		{
			Code:        "authorization:service_account:access_key:update",
			Name:        "Update service account access keys",
			Description: "Update service account access keys",
		},
		{
			Code:        "authorization:service_account:access_key:delete",
			Name:        "Delete service account access keys",
			Description: "Delete service account access keys",
		},
		{
			Code:        "authorization:service_account:role:list",
			Name:        "List service account roles",
			Description: "List service account roles",
		},
		{
			Code:        "authorization:service_account:role:assign",
			Name:        "Assign service account roles",
			Description: "Assign roles to service accounts",
		},
		{
			Code:        "authorization:service_account:policy:view",
			Name:        "Get service account policy",
			Description: "Get service account policy",
		},
		{
			Code:        "authorization:service_account:policy:update",
			Name:        "Update service account policy",
			Description: "Update service account policy",
		},
	})
}

// GetServiceAccounts Get service account list
func (c *ServiceAccountController) GetServiceAccounts(ctx *gin.Context) {
	// Get pagination parameters
	page, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")

	// Call service layer to get data
	serviceAccounts, total, err := c.service.GetServiceAccountList(ctx, page, pageSize, search)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5001",
			Err:      err,
		})
		return
	}

	// Return data
	ctx.JSON(http.StatusOK, gin.H{
		"code":      "0",
		"data":      serviceAccounts,
		"total":     total,
		"current":   page,
		"page_size": pageSize,
	})
}

// GetServiceAccountByID Get service account by ID
func (c *ServiceAccountController) GetServiceAccountByID(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID"),
		})
		return
	}

	serviceAccount, err := c.service.GetServiceAccountByID(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5002",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": serviceAccount,
	})
}

// CreateServiceAccount Create service account
func (c *ServiceAccountController) CreateServiceAccount(ctx *gin.Context) {
	var req struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
		})
		return
	}

	// Create service account
	serviceAccount := &model.ServiceAccount{
		Name:        req.Name,
		Description: req.Description,
		Status:      "active",
	}

	err := c.service.CreateServiceAccount(ctx, serviceAccount)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5003",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": serviceAccount,
	})
}

// UpdateServiceAccount Update service account
func (c *ServiceAccountController) UpdateServiceAccount(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID"),
		})
		return
	}

	var req struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
		})
		return
	}

	// Update service account
	serviceAccount := &model.ServiceAccount{
		Name:        req.Name,
		Description: req.Description,
	}

	err := c.service.UpdateServiceAccount(ctx, id, serviceAccount)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5004",
			Err:      err,
		})
		return
	}

	// Get the updated service account
	updatedServiceAccount, err := c.service.GetServiceAccountByID(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5002",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": updatedServiceAccount,
	})
}

// DeleteServiceAccount Delete service account
func (c *ServiceAccountController) DeleteServiceAccount(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID"),
		})
		return
	}

	err := c.service.DeleteServiceAccount(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5005",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": gin.H{"message": "Service account deleted successfully"},
	})
}

// UpdateServiceAccountStatus Update service account status
func (c *ServiceAccountController) UpdateServiceAccountStatus(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID"),
		})
		return
	}

	var req struct {
		Status string `json:"status" binding:"required,oneof=active disabled"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
		})
		return
	}

	err := c.service.UpdateServiceAccountStatus(ctx, id, req.Status)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5006",
			Err:      err,
		})
		return
	}

	// Get the updated service account
	updatedServiceAccount, err := c.service.GetServiceAccountByID(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5002",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": updatedServiceAccount,
	})
}

// GetServiceAccountAccessKeys Get service account access keys
func (c *ServiceAccountController) GetServiceAccountAccessKeys(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID"),
		})
		return
	}

	keys, err := c.service.GetServiceAccountAccessKeys(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5007",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": keys,
	})
}

// CreateServiceAccountAccessKey Create service account access key
func (c *ServiceAccountController) CreateServiceAccountAccessKey(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID"),
		})
		return
	}

	var req struct {
		Name          string `json:"name" binding:"required"`
		Description   string `json:"description"`
		ExpiresInDays int    `json:"expires_in_days"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
		})
		return
	}

	accessKey, secretKey, err := c.service.CreateServiceAccountAccessKey(ctx, id, req.Name, req.Description, req.ExpiresInDays)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5008",
			Err:      err,
		})
		return
	}

	// Note: This is the only time the secret key is returned. The client needs to save it securely.
	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": map[string]interface{}{
			"id":                 accessKey.ResourceID,
			"created_at":         accessKey.CreatedAt,
			"updated_at":         accessKey.UpdatedAt,
			"service_account_id": accessKey.ServiceAccountID,
			"access_key_id":      accessKey.AccessKeyID,
			"status":             accessKey.Status,
			"name":               accessKey.Name,
			"description":        accessKey.Description,
			"expires_at":         accessKey.ExpiresAt,
			"secret_access_key":  secretKey, // The actual secret key
		},
	})
}

// UpdateServiceAccountAccessKey Update service account access key
func (c *ServiceAccountController) UpdateServiceAccountAccessKey(ctx *gin.Context) {
	serviceAccountID := ctx.Param("id")
	keyID := ctx.Param("keyId")
	if serviceAccountID == "" || keyID == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID or key ID"),
		})
		return
	}
	var req struct {
		Name        string     `json:"name" binding:"required"`
		Description string     `json:"description"`
		Status      string     `json:"status" binding:"required,oneof=active disabled"`
		ExpiresAt   *time.Time `json:"expires_at"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
		})
		return
	}

	updatedKey, err := c.service.UpdateServiceAccountAccessKey(ctx, serviceAccountID, keyID, req.Name, req.Description, req.Status, req.ExpiresAt)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5009",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": updatedKey,
	})
}

// DeleteServiceAccountAccessKey Delete service account access key
func (c *ServiceAccountController) DeleteServiceAccountAccessKey(ctx *gin.Context) {
	serviceAccountID := ctx.Param("id")
	keyID := ctx.Param("keyId")
	if serviceAccountID == "" || keyID == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID or key ID"),
		})
		return
	}

	err := c.service.DeleteServiceAccountAccessKey(ctx, serviceAccountID, keyID)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5010",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": gin.H{"message": "Service account access key deleted successfully"},
	})
}

// GetServiceAccountRoles Get service account roles
func (c *ServiceAccountController) GetServiceAccountRoles(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID"),
		})
		return
	}

	roles, err := c.service.GetServiceAccountRoles(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5011",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": roles,
	})
}

// AssignServiceAccountRoles Assign roles to service account
func (c *ServiceAccountController) AssignServiceAccountRoles(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID"),
		})
		return
	}

	var req struct {
		RoleIDs []string `json:"role_ids" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
		})
		return
	}

	err := c.service.AssignServiceAccountRoles(ctx, id, req.RoleIDs)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5012",
			Err:      err,
		})
		return
	}

	// Get the updated roles
	updatedRoles, err := c.service.GetServiceAccountRoles(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5010",
			Err:      err,
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": updatedRoles,
	})
}

// GetServiceAccountPolicy Get service account policy
func (c *ServiceAccountController) GetServiceAccountPolicy(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID"),
		})
		return
	}

	policy, err := c.service.GetServiceAccountPolicy(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5013",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": policy,
	})
}

// SetServiceAccountPolicy Set service account policy
func (c *ServiceAccountController) SetServiceAccountPolicy(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("missing service account ID"),
		})
		return
	}

	var req struct {
		PolicyDocument model.PolicyDocument `json:"policy_document" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      err,
		})
		return
	}
	err := c.service.StartAudit(ctx, id, func(auditLog *model.AuditLog) error {
		return c.service.SetServiceAccountPolicy(ctx, id, req.PolicyDocument)
	})
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5014",
			Err:      err,
		})
		return
	}
	// Get the updated service account
	updatedServiceAccount, err := c.service.GetServiceAccountByID(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5002",
			Err:      err,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code": "0",
		"data": updatedServiceAccount,
	})
}
