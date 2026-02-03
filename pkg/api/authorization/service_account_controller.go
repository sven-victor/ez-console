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

package authorizationapi

import (
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
			Code:             "authorization:service_account:list",
			Name:             "List service accounts",
			Description:      "List service accounts",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator", "viewer"},
		},
		{
			Code:             "authorization:service_account:view",
			Name:             "View service accounts",
			Description:      "View service account list and details",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator", "viewer"},
		},
		{
			Code:             "authorization:service_account:create",
			Name:             "Create service accounts",
			Description:      "Create new service accounts",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator"},
		},
		{
			Code:             "authorization:service_account:update",
			Name:             "Update service accounts",
			Description:      "Update service account information",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator"},
		},
		{
			Code:          "authorization:service_account:delete",
			Name:          "Delete service accounts",
			Description:   "Delete service accounts",
			OrgPermission: true,
		},
		{
			Code:             "authorization:service_account:access_key:list",
			Name:             "List service account access keys",
			Description:      "List service account access keys",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator", "viewer"},
		},
		{
			Code:             "authorization:service_account:access_key:create",
			Name:             "Create service account access keys",
			Description:      "Create new service account access keys",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator"},
		},
		{
			Code:             "authorization:service_account:access_key:update",
			Name:             "Update service account access keys",
			Description:      "Update service account access keys",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator"},
		},
		{
			Code:          "authorization:service_account:access_key:delete",
			Name:          "Delete service account access keys",
			Description:   "Delete service account access keys",
			OrgPermission: true,
		},
		{
			Code:             "authorization:service_account:role:list",
			Name:             "List service account roles",
			Description:      "List service account roles",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator", "viewer"},
		},
		{
			Code:             "authorization:service_account:role:assign",
			Name:             "Assign service account roles",
			Description:      "Assign roles to service accounts",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator"},
		},
		{
			Code:             "authorization:service_account:policy:view",
			Name:             "Get service account policy",
			Description:      "Get service account policy",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator", "viewer"},
		},
		{
			Code:             "authorization:service_account:policy:update",
			Name:             "Update service account policy",
			Description:      "Update service account policy",
			OrgPermission:    true,
			DefaultRoleNames: []string{"operator"},
		},
	})
}

// GetServiceAccounts Get service account list
//
//	@Summary		Get service account list
//	@Description	Get service account list
//	@ID             getServiceAccounts
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			current			query		int		false	"Current page number"		default(1)
//	@Param			page_size		query		int		false	"Number of items per page"	default(10)
//	@Param			search			query		string	false	"Search keyword"
//	@Param			organization_id	query		string	false	"Filter by organization ID (empty for global service accounts)"
//	@Success		200				{object}	util.PaginationResponse[model.ServiceAccount]
//	@Failure		500				{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts [get]
func (c *ServiceAccountController) GetServiceAccounts(ctx *gin.Context) {
	// Get pagination parameters
	page, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")
	searchOrgID := ctx.Query("organization_id")
	currentOrgID := ctx.GetString("organization_id")
	var orgID *string

	if middleware.HasGlobalRolePermission(ctx, "authorization:service_account:list") {
		if searchOrgID != "" {
			orgID = &searchOrgID
		} else {
			orgID = nil
		}
	} else if currentOrgID != "" {
		if searchOrgID != "" && searchOrgID != currentOrgID {
			util.RespondWithError(ctx, util.NewErrorMessage("E4031", "Invalid organization ID"))
			return
		}
		orgID = &currentOrgID
	} else {
		util.RespondWithError(ctx, util.NewErrorMessage("E4031", "No permission to list service accounts"))
		return
	}

	// Call service layer to get data
	serviceAccounts, total, err := c.service.GetServiceAccountList(ctx, page, pageSize, search, orgID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}

	// Return data
	util.RespondWithSuccessList(ctx, http.StatusOK, serviceAccounts, total, page, pageSize)
}

// GetServiceAccountByID Get service account by ID
//
//	@Summary		Get service account by ID
//	@Description	Get service account by ID
//	@ID             getServiceAccountById
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Service account ID"
//	@Success		200	{object}	util.Response[model.ServiceAccount]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id} [get]
func (c *ServiceAccountController) GetServiceAccountByID(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID"))
		return
	}

	serviceAccount, err := c.service.GetServiceAccountByID(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", err))
		return
	}

	if serviceAccount.OrganizationID == nil || *serviceAccount.OrganizationID == "" {
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:view") {
			util.RespondWithError(ctx, util.NewErrorMessage("E4031", "No global permission to view service accounts"))
			return
		}
	}

	util.RespondWithSuccess(ctx, http.StatusOK, serviceAccount)
}

type CreateServiceAccountRequest struct {
	Name           string  `json:"name" binding:"required"`
	Description    string  `json:"description"`
	OrganizationID *string `json:"organization_id,omitempty" validate:"optional"`
}

// CreateServiceAccount Create service account (global or organization-scoped)
//
//	@Summary		Create service account
//	@Description	Create service account
//	@ID             createServiceAccount
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			request		body		CreateServiceAccountRequest	true	"Create service account request"
//	@Success		200			{object}	util.Response[model.ServiceAccount]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts [post]
func (c *ServiceAccountController) CreateServiceAccount(ctx *gin.Context) {
	var req CreateServiceAccountRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	currentOrgID := ctx.GetString("organization_id")
	if req.OrganizationID == nil || *req.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:create") {
			util.RespondWithError(ctx, util.NewErrorMessage("E4031", "No global permission to create service accounts"))
			return
		}
		req.OrganizationID = nil
	} else {
		// Organization service account: require org permission and same org
		if currentOrgID != *req.OrganizationID {
			util.RespondWithError(ctx, util.NewErrorMessage("E4031", "Cannot create service account for another organization"))
			return
		}
	}

	serviceAccount := &model.ServiceAccount{
		Name:           req.Name,
		Description:    req.Description,
		Status:         "active",
		OrganizationID: req.OrganizationID,
	}

	err := c.service.CreateServiceAccount(ctx, serviceAccount)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5003", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, serviceAccount)
}

type UpdateServiceAccountRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
}

// UpdateServiceAccount Update service account
//
//	@Summary		Update service account
//	@Description	Update service account
//	@ID             updateServiceAccount
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id			path		string	true	"Service account ID"
//	@Param			request		body		UpdateServiceAccountRequest	true	"Update service account request"
//	@Success		200			{object}	util.Response[model.ServiceAccount]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id} [put]
func (c *ServiceAccountController) UpdateServiceAccount(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID"))
		return
	}

	var req UpdateServiceAccountRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	// Update service account
	serviceAccount := &model.ServiceAccount{
		Name:        req.Name,
		Description: req.Description,
	}

	err := c.service.UpdateServiceAccount(ctx, id, serviceAccount)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5004", err))
		return
	}

	// Get the updated service account
	updatedServiceAccount, err := c.service.GetServiceAccountByID(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, updatedServiceAccount)
}

// DeleteServiceAccount Delete service account
//
//	@Summary		Delete service account
//	@Description	Delete service account
//	@ID             deleteServiceAccount
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Service account ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id} [delete]
func (c *ServiceAccountController) DeleteServiceAccount(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID"))
		return
	}

	err := c.service.DeleteServiceAccount(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5005", err))
		return
	}

	util.RespondWithMessage(ctx, "Service account deleted successfully")
}

type UpdateServiceAccountStatusRequest struct {
	Status string `json:"status" binding:"required,oneof=active disabled"`
}

// UpdateServiceAccountStatus Update service account status
//
//	@Summary		Update service account status
//	@Description	Update service account status
//	@ID             updateServiceAccountStatus
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string	true	"Service account ID"
//	@Param			request	body		UpdateServiceAccountStatusRequest	true	"Update service account status request"
//	@Success		200		{object}	util.Response[model.ServiceAccount]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id}/status [put]
func (c *ServiceAccountController) UpdateServiceAccountStatus(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID"))
		return
	}

	var req UpdateServiceAccountStatusRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	err := c.service.UpdateServiceAccountStatus(ctx, id, req.Status)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5006", err))
		return
	}

	// Get the updated service account
	updatedServiceAccount, err := c.service.GetServiceAccountByID(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, updatedServiceAccount)
}

// GetServiceAccountAccessKeys Get service account access keys
//
//	@Summary		Get service account access keys
//	@Description	Get service account access keys
//	@ID             getServiceAccountAccessKeys
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Service account ID"
//	@Success		200	{object}	util.Response[[]model.ServiceAccountAccessKey]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id}/access-keys [get]
func (c *ServiceAccountController) GetServiceAccountAccessKeys(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID"))
		return
	}

	keys, err := c.service.GetServiceAccountAccessKeys(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5007", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, keys)
}

type CreateServiceAccountAccessKeyRequest struct {
	Name        string     `json:"name" binding:"required"`
	Description string     `json:"description"`
	ExpiresAt   *time.Time `json:"expires_at"`
}

type CreateServiceAccountAccessKeyResponse struct {
	model.Base
	Name             string     `json:"name" gorm:"size:255;not null"`
	ServiceAccountID string     `json:"service_account_id" gorm:"size:36;not null;index"`
	AccessKeyID      string     `json:"access_key_id" gorm:"size:100;not null;uniqueIndex"`
	SecretAccessKey  string     `json:"secret_access_key" gorm:"size:255;not null"`
	Status           string     `json:"status" gorm:"size:20;default:'active'"`
	Description      string     `json:"description" gorm:"size:255"`
	LastUsed         *time.Time `json:"last_used" gorm:"default:null"`
	ExpiresAt        *time.Time `json:"expires_at" gorm:"default:null"`
}

// CreateServiceAccountAccessKey Create service account access key
//
//	@Summary		Create service account access key
//	@Description	Create service account access key
//	@ID             createServiceAccountAccessKey
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id				path		string	true	"Service account ID"
//	@Param			request		body		CreateServiceAccountAccessKeyRequest	true	"Create service account access key request"
//	@Success		200				{object}	util.Response[CreateServiceAccountAccessKeyResponse]
//	@Failure		500				{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id}/access-keys [post]
func (c *ServiceAccountController) CreateServiceAccountAccessKey(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID"))
		return
	}

	var req CreateServiceAccountAccessKeyRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	accessKey, secretKey, err := c.service.CreateServiceAccountAccessKey(ctx, id, req.Name, req.Description, req.ExpiresAt)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5008", err))
		return
	}

	// Note: This is the only time the secret key is returned. The client needs to save it securely.
	util.RespondWithSuccess(ctx, http.StatusOK, map[string]interface{}{
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
	})
}

type UpdateServiceAccountAccessKeyRequest struct {
	Name        string     `json:"name" binding:"required"`
	Description string     `json:"description"`
	Status      string     `json:"status" binding:"required,oneof=active disabled"`
	ExpiresAt   *time.Time `json:"expires_at"`
}

// UpdateServiceAccountAccessKey Update service account access key
//
//	@Summary		Update service account access key
//	@Description	Update service account access key
//	@ID             updateServiceAccountAccessKey
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id			path		string	true	"Service account ID"
//	@Param			keyId		path		string	true	"Access key ID"
//	@Param			request		body		UpdateServiceAccountAccessKeyRequest	true	"Update service account access key request"
//	@Success		200			{object}	util.Response[model.ServiceAccountAccessKey]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id}/access-keys/{keyId} [put]
func (c *ServiceAccountController) UpdateServiceAccountAccessKey(ctx *gin.Context) {
	serviceAccountID := ctx.Param("id")
	keyID := ctx.Param("keyId")
	if serviceAccountID == "" || keyID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID or key ID"))
		return
	}
	var req UpdateServiceAccountAccessKeyRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	updatedKey, err := c.service.UpdateServiceAccountAccessKey(ctx, serviceAccountID, keyID, req.Name, req.Description, req.Status, req.ExpiresAt)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5009", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, updatedKey)
}

// DeleteServiceAccountAccessKey Delete service account access key
//
//	@Summary		Delete service account access key
//	@Description	Delete service account access key
//	@ID             deleteServiceAccountAccessKey
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string	true	"Service account ID"
//	@Param			keyId	path		string	true	"Access key ID"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id}/access-keys/{keyId} [delete]
func (c *ServiceAccountController) DeleteServiceAccountAccessKey(ctx *gin.Context) {
	serviceAccountID := ctx.Param("id")
	keyID := ctx.Param("keyId")
	if serviceAccountID == "" || keyID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID or key ID"))
		return
	}

	err := c.service.DeleteServiceAccountAccessKey(ctx, serviceAccountID, keyID)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5010", err))
		return
	}

	util.RespondWithMessage(ctx, "Service account access key deleted successfully")
}

// GetServiceAccountRoles Get service account roles
//
//	@Summary		Get service account roles
//	@Description	Get service account roles
//	@ID             getServiceAccountRoles
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Service account ID"
//	@Success		200	{object}	util.PaginationResponse[model.Role]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id}/roles [get]
func (c *ServiceAccountController) GetServiceAccountRoles(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID"))
		return
	}

	roles, err := c.service.GetServiceAccountRoles(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5011", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, roles)
}

type AssignServiceAccountRolesRequest struct {
	RoleIDs []string `json:"role_ids" binding:"required"`
}

// AssignServiceAccountRoles Assign roles to service account
//
//	@Summary		Assign roles to service account
//	@Description	Assign roles to service account
//	@ID             assignServiceAccountRoles
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id			path		string		true	"Service account ID"
//	@Param			request		body		AssignServiceAccountRolesRequest	true	"Assign roles to service account request"
//	@Success		200			{object}	util.PaginationResponse[model.Role]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id}/roles [post]
func (c *ServiceAccountController) AssignServiceAccountRoles(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID"))
		return
	}

	var req AssignServiceAccountRolesRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}

	err := c.service.AssignServiceAccountRoles(ctx, id, req.RoleIDs)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5012", err))
		return
	}

	// Get the updated roles
	updatedRoles, err := c.service.GetServiceAccountRoles(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5010", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, updatedRoles)
}

// GetServiceAccountPolicy Get service account policy
//
//	@Summary		Get service account policy
//	@Description	Get service account policy
//	@ID             getServiceAccountPolicy
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Service account ID"
//	@Success		200	{object}	util.Response[model.PolicyDocument]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id}/policy [get]
func (c *ServiceAccountController) GetServiceAccountPolicy(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID"))
		return
	}

	policy, err := c.service.GetServiceAccountPolicy(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5013", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, policy)
}

type SetServiceAccountPolicyRequest struct {
	PolicyDocument model.PolicyDocument `json:"policy_document" binding:"required"`
}

// SetServiceAccountPolicy Set service account policy
//
//	@Summary		Set service account policy
//	@Description	Set service account policy
//	@ID             setServiceAccountPolicy
//	@Tags			Authorization/ServiceAccount
//	@Accept			json
//	@Produce		json
//	@Param			id				path		string					true	"Service account ID"
//	@Param			request		body		SetServiceAccountPolicyRequest	true	"Set service account policy request"
//	@Success		200				{object}	util.Response[model.ServiceAccount]
//	@Failure		500				{object}	util.ErrorResponse
//	@Router			/api/authorization/service-accounts/{id}/policy [put]
func (c *ServiceAccountController) SetServiceAccountPolicy(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "missing service account ID"))
		return
	}

	var req SetServiceAccountPolicyRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}
	err := c.service.StartAudit(ctx, id, func(auditLog *model.AuditLog) error {
		return c.service.SetServiceAccountPolicy(ctx, id, req.PolicyDocument)
	})
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5014", err))
		return
	}
	// Get the updated service account
	updatedServiceAccount, err := c.service.GetServiceAccountByID(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5002", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, updatedServiceAccount)
}
