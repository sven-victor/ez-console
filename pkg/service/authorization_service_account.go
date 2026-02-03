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
	"time"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
	"gorm.io/gorm"
)

// ServiceAccountService service for service accounts
type ServiceAccountService struct {
}

// NewServiceAccountService creates a new service account service
func NewServiceAccountService() *ServiceAccountService {
	return &ServiceAccountService{}
}

// GetServiceAccountList gets the list of service accounts. organizationID filters by org; nil means global-only when multi-org is enabled, or all when caller has global permission.
func (s *ServiceAccountService) GetServiceAccountList(ctx context.Context, page, pageSize int, search string, organizationID *string) ([]model.ServiceAccount, int64, error) {
	var serviceAccounts []model.ServiceAccount
	var total int64

	query := db.Session(ctx).Model(&model.ServiceAccount{})

	enableMultiOrg, err := middleware.GetSettingService().GetBoolSetting(ctx, model.SettingSystemEnableMultiOrg, false)
	if err != nil {
		return nil, 0, err
	}
	if !enableMultiOrg {
		query = query.Where("organization_id IS NULL")
	} else if organizationID != nil {
		query = query.Where("organization_id = ?", *organizationID)
	} else {

	}

	// If there is a search keyword, add search conditions
	if search != "" {
		query = query.Where("name LIKE ? OR description LIKE ?", "%"+search+"%", "%"+search+"%")
	}

	// Calculate total count
	err = query.Count(&total).Error
	if err != nil {
		return nil, 0, err
	}

	// Paginated query
	err = query.Order("created_at DESC").
		Limit(pageSize).
		Offset((page - 1) * pageSize).
		Preload("Roles").
		Preload("Organization").
		Find(&serviceAccounts).Error

	if err != nil {
		return nil, 0, err
	}

	return serviceAccounts, total, nil
}

// GetServiceAccountByID gets a service account by ID
func (s *ServiceAccountService) GetServiceAccountByID(ctx context.Context, id string) (*model.ServiceAccount, error) {
	var serviceAccount model.ServiceAccount

	err := db.Session(ctx).Where("resource_id = ?", id).Preload("Roles").Preload("Organization").First(&serviceAccount).Error
	if err != nil {
		return nil, err
	}
	return &serviceAccount, nil
}

// CreateServiceAccount creates a service account
func (s *ServiceAccountService) CreateServiceAccount(ctx context.Context, serviceAccount *model.ServiceAccount) error {
	return db.Session(ctx).Create(serviceAccount).Error
}

// UpdateServiceAccount updates a service account. OrganizationID is not updated after creation.
func (s *ServiceAccountService) UpdateServiceAccount(ctx context.Context, id string, serviceAccount *model.ServiceAccount) error {
	sa, err := s.GetServiceAccountByID(ctx, id)
	if err != nil {
		return err
	}
	if sa.OrganizationID == nil || *sa.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:update") {
			return util.NewErrorMessage("E4031", "No global permission to update service accounts")
		}
	}
	return db.Session(ctx).Model(&model.ServiceAccount{}).Where("resource_id = ?", id).
		Updates(map[string]interface{}{
			"name":        serviceAccount.Name,
			"description": serviceAccount.Description,
		}).Error
}

// DeleteServiceAccount deletes a service account
func (s *ServiceAccountService) DeleteServiceAccount(ctx context.Context, id string) error {
	sa, err := s.GetServiceAccountByID(ctx, id)
	if err != nil {
		return err
	}
	if sa.OrganizationID == nil || *sa.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:delete") {
			return util.NewErrorMessage("E4031", "No global permission to delete service accounts")
		}
	}
	// If the service account has a key, it cannot be deleted
	var accessKey model.ServiceAccountAccessKey
	err = db.Session(ctx).Where("service_account_id = ?", id).First(&accessKey).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// No key found, account can be deleted
			return db.Session(ctx).Where("resource_id = ?", id).Delete(&model.ServiceAccount{}).Error
		}
		return err
	}
	if accessKey.AccessKeyID != "" {
		return errors.New("please delete the service account's access key first")
	}

	return db.Session(ctx).Where("resource_id = ?", id).Delete(&model.ServiceAccount{}).Error
}

// UpdateServiceAccountStatus updates the status of a service account
func (s *ServiceAccountService) UpdateServiceAccountStatus(ctx context.Context, id, status string) error {
	sa, err := s.GetServiceAccountByID(ctx, id)
	if err != nil {
		return err
	}
	if sa.OrganizationID == nil || *sa.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:update") {
			return util.NewErrorMessage("E4031", "No global permission to update service accounts")
		}
	}
	return db.Session(ctx).Model(&model.ServiceAccount{}).Where("resource_id = ?", id).
		Update("status", status).Error
}

// Other service account related methods can be added, such as managing access keys, role assignment, policy management, etc.

// GetServiceAccountAccessKeys gets the list of access keys for a service account
func (s *ServiceAccountService) GetServiceAccountAccessKeys(ctx context.Context, serviceAccountID string) ([]model.ServiceAccountAccessKey, error) {
	sa, err := s.GetServiceAccountByID(ctx, serviceAccountID)
	if err != nil {
		return nil, err
	}
	if sa.OrganizationID == nil || *sa.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:access_key:list") {
			return nil, util.NewErrorMessage("E4031", "No global permission to list service accounts")
		}
	}
	var accessKeys []model.ServiceAccountAccessKey
	err = db.Session(ctx).Where("service_account_id = ?", serviceAccountID).Find(&accessKeys).Error
	return accessKeys, err
}

// CreateServiceAccountAccessKey creates an access key for a service account
func (s *ServiceAccountService) CreateServiceAccountAccessKey(ctx context.Context, serviceAccountID, name, description string, expiresAt *time.Time) (*model.ServiceAccountAccessKey, string, error) {
	sa, err := s.GetServiceAccountByID(ctx, serviceAccountID)
	if err != nil {
		return nil, "", err
	}
	if sa.OrganizationID == nil || *sa.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:access_key:create") {
			return nil, "", util.NewErrorMessage("E4031", "No global permission to create service access keys")
		}
	}
	// Check if the service account exists
	var serviceAccount model.ServiceAccount
	err = db.Session(ctx).Where("resource_id = ?", serviceAccountID).First(&serviceAccount).Error
	if err != nil {
		return nil, "", err
	}

	// Generate access key ID and secret
	accessKeyID := fmt.Sprintf("ASK-%s", util.GenerateRandomString(20))
	secretAccessKey := util.GenerateRandomString(40)

	encryptedSecretAccessKey := util.EncryptString(secretAccessKey)

	// Create access key record
	accessKey := &model.ServiceAccountAccessKey{
		Name:             name,
		ServiceAccountID: serviceAccountID,
		AccessKeyID:      accessKeyID,
		SecretAccessKey:  encryptedSecretAccessKey, // Store encrypted secret
		Status:           model.ServiceAccountAccessKeyStatusActive,
		Description:      description,
		ExpiresAt:        expiresAt,
	}

	err = db.Session(ctx).Create(accessKey).Error
	if err != nil {
		return nil, "", err
	}
	return accessKey, secretAccessKey, err
}

// UpdateServiceAccountAccessKey updates a service account access key
func (s *ServiceAccountService) UpdateServiceAccountAccessKey(ctx context.Context, serviceAccountID, keyID, name, description, status string, expiresAt *time.Time) (*model.ServiceAccountAccessKey, error) {
	sa, err := s.GetServiceAccountByID(ctx, serviceAccountID)
	if err != nil {
		return nil, err
	}
	if sa.OrganizationID == nil || *sa.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:access_key:update") {
			return nil, util.NewErrorMessage("E4031", "No global permission to update service accounts")
		}
	}
	var accessKey model.ServiceAccountAccessKey
	err = db.Session(ctx).Where("service_account_id = ? AND resource_id = ?", serviceAccountID, keyID).First(&accessKey).Error
	if err != nil {
		return nil, err
	}

	updates := map[string]interface{}{}

	if status != "" {
		if status != model.ServiceAccountAccessKeyStatusActive && status != model.ServiceAccountAccessKeyStatusDisabled {
			return nil, errors.New("invalid status value")
		}
		updates["status"] = status
	}

	if description != "" {
		updates["description"] = description
	}

	if expiresAt != nil {
		updates["expires_at"] = expiresAt
	}

	if len(updates) > 0 {
		err = db.Session(ctx).Model(&accessKey).Updates(updates).Error
		if err != nil {
			return nil, err
		}
	}

	return &accessKey, nil
}

// DeleteServiceAccountAccessKey deletes a service account access key
func (s *ServiceAccountService) DeleteServiceAccountAccessKey(ctx context.Context, serviceAccountID, keyID string) error {
	sa, err := s.GetServiceAccountByID(ctx, serviceAccountID)
	if err != nil {
		return err
	}
	if sa.OrganizationID == nil || *sa.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:access_key:delete") {
			return util.NewErrorMessage("E4031", "No global permission to delete service accounts")
		}
	}
	return db.Session(ctx).Where("service_account_id = ? AND resource_id = ?", serviceAccountID, keyID).Delete(&model.ServiceAccountAccessKey{}).Error
}

// GetServiceAccountRoles gets the list of roles for a service account
func (s *ServiceAccountService) GetServiceAccountRoles(ctx context.Context, serviceAccountID string) ([]model.Role, error) {
	sa, err := s.GetServiceAccountByID(ctx, serviceAccountID)
	if err != nil {
		return nil, err
	}
	if sa.OrganizationID == nil || *sa.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:role:list") {
			return nil, util.NewErrorMessage("E4031", "No global permission to list service accounts")
		}
	}
	var serviceAccount model.ServiceAccount
	err = db.Session(ctx).Where("resource_id = ?", serviceAccountID).Preload("Roles").First(&serviceAccount).Error
	if err != nil {
		return nil, err
	}
	return serviceAccount.Roles, nil
}

// AssignServiceAccountRoles assigns roles to a service account. Organization-level service accounts can only be assigned organization roles (same organization); global service accounts only global roles.
func (s *ServiceAccountService) AssignServiceAccountRoles(ctx context.Context, serviceAccountID string, roleIDs []string) error {

	var serviceAccount model.ServiceAccount
	err := db.Session(ctx).Where("resource_id = ?", serviceAccountID).First(&serviceAccount).Error
	if err != nil {
		return err
	}
	if serviceAccount.OrganizationID == nil || *serviceAccount.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:role:assign") {
			return util.NewErrorMessage("E4031", "No global permission to assign roles to service accounts")
		}
	}

	var roles []model.Role
	if len(roleIDs) > 0 {
		err = db.Session(ctx).Where("resource_id IN ?", roleIDs).Find(&roles).Error
		if err != nil {
			return err
		}
	}

	// Validate role scope matches service account scope
	for _, role := range roles {
		if serviceAccount.OrganizationID != nil && *serviceAccount.OrganizationID != "" {
			// Organization service account: only roles from the same organization
			if role.OrganizationID == nil || *role.OrganizationID != *serviceAccount.OrganizationID {
				return util.ErrorResponse{
					HTTPCode: 400,
					Code:     "E4001",
					Err:      errors.New("organization-level service accounts can only be assigned roles from the same organization"),
				}
			}
		}
	}

	return db.Session(ctx).Model(&serviceAccount).Association("Roles").Replace(roles)
}

// GetServiceAccountPolicy gets the policy document for a service account
func (s *ServiceAccountService) GetServiceAccountPolicy(ctx context.Context, serviceAccountID string) (model.PolicyDocument, error) {
	var serviceAccount model.ServiceAccount
	err := db.Session(ctx).Where("resource_id = ?", serviceAccountID).First(&serviceAccount).Error
	if err != nil {
		return model.PolicyDocument{}, err
	}
	if serviceAccount.OrganizationID == nil || *serviceAccount.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:policy:view") {
			return model.PolicyDocument{}, util.NewErrorMessage("E4031", "No global permission to view service accounts")
		}
	}
	return serviceAccount.PolicyDocument, nil
}

// SetServiceAccountPolicy sets the policy document for a service account
func (s *ServiceAccountService) SetServiceAccountPolicy(ctx context.Context, serviceAccountID string, policyDoc model.PolicyDocument) error {
	sa, err := s.GetServiceAccountByID(ctx, serviceAccountID)
	if err != nil {
		return err
	}
	if sa.OrganizationID == nil || *sa.OrganizationID == "" {
		// Global service account: require global permission
		if !middleware.HasGlobalRolePermission(ctx, "authorization:service_account:policy:set") {
			return util.NewErrorMessage("E4031", "No global permission to set service accounts")
		}
	}
	// Validate policy document
	if !policyDoc.IsValid() {
		return errors.New("invalid policy document")
	}

	// Convert policy document to JSON string
	policyJSON, err := json.Marshal(policyDoc)
	if err != nil {
		return err
	}

	// Update service account's policy document
	return db.Session(ctx).Model(&model.ServiceAccount{}).
		Where("resource_id = ?", serviceAccountID).
		Update("policy_document", string(policyJSON)).Error
}
