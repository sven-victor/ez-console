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
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/db"
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

// GetServiceAccountList gets the list of service accounts
func (s *ServiceAccountService) GetServiceAccountList(ctx *gin.Context, page, pageSize int, search string) ([]model.ServiceAccount, int64, error) {
	var serviceAccounts []model.ServiceAccount
	var total int64

	query := db.Session(ctx).Model(&model.ServiceAccount{})

	// If there is a search keyword, add search conditions
	if search != "" {
		query = query.Where("name LIKE ? OR description LIKE ?", "%"+search+"%", "%"+search+"%")
	}

	// Calculate total count
	err := query.Count(&total).Error
	if err != nil {
		return nil, 0, err
	}

	// Paginated query
	err = query.Order("created_at DESC").
		Limit(pageSize).
		Offset((page - 1) * pageSize).
		Preload("Roles").
		Find(&serviceAccounts).Error

	if err != nil {
		return nil, 0, err
	}

	return serviceAccounts, total, nil
}

// GetServiceAccountByID gets a service account by ID
func (s *ServiceAccountService) GetServiceAccountByID(ctx *gin.Context, id string) (*model.ServiceAccount, error) {
	var serviceAccount model.ServiceAccount

	err := db.Session(ctx).Where("resource_id = ?", id).Preload("Roles").First(&serviceAccount).Error
	if err != nil {
		return nil, err
	}

	return &serviceAccount, nil
}

// CreateServiceAccount creates a service account
func (s *ServiceAccountService) CreateServiceAccount(ctx *gin.Context, serviceAccount *model.ServiceAccount) error {
	return db.Session(ctx).Create(serviceAccount).Error
}

// UpdateServiceAccount updates a service account
func (s *ServiceAccountService) UpdateServiceAccount(ctx *gin.Context, id string, serviceAccount *model.ServiceAccount) error {
	return db.Session(ctx).Model(&model.ServiceAccount{}).Where("resource_id = ?", id).
		Updates(map[string]interface{}{
			"name":        serviceAccount.Name,
			"description": serviceAccount.Description,
		}).Error
}

// DeleteServiceAccount deletes a service account
func (s *ServiceAccountService) DeleteServiceAccount(ctx *gin.Context, id string) error {
	// If the service account has a key, it cannot be deleted
	var accessKey model.ServiceAccountAccessKey
	err := db.Session(ctx).Where("service_account_id = ?", id).First(&accessKey).Error
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
func (s *ServiceAccountService) UpdateServiceAccountStatus(ctx *gin.Context, id, status string) error {
	return db.Session(ctx).Model(&model.ServiceAccount{}).Where("resource_id = ?", id).
		Update("status", status).Error
}

// Other service account related methods can be added, such as managing access keys, role assignment, policy management, etc.

// GetServiceAccountAccessKeys gets the list of access keys for a service account
func (s *ServiceAccountService) GetServiceAccountAccessKeys(ctx *gin.Context, serviceAccountID string) ([]model.ServiceAccountAccessKey, error) {
	var accessKeys []model.ServiceAccountAccessKey
	err := db.Session(ctx).Where("service_account_id = ?", serviceAccountID).Find(&accessKeys).Error
	return accessKeys, err
}

// CreateServiceAccountAccessKey creates an access key for a service account
func (s *ServiceAccountService) CreateServiceAccountAccessKey(ctx *gin.Context, serviceAccountID, name, description string, expiresAt *time.Time) (*model.ServiceAccountAccessKey, string, error) {
	// Check if the service account exists
	var serviceAccount model.ServiceAccount
	err := db.Session(ctx).Where("resource_id = ?", serviceAccountID).First(&serviceAccount).Error
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
func (s *ServiceAccountService) UpdateServiceAccountAccessKey(ctx *gin.Context, serviceAccountID, keyID, name, description, status string, expiresAt *time.Time) (*model.ServiceAccountAccessKey, error) {
	var accessKey model.ServiceAccountAccessKey
	err := db.Session(ctx).Where("service_account_id = ? AND resource_id = ?", serviceAccountID, keyID).First(&accessKey).Error
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
func (s *ServiceAccountService) DeleteServiceAccountAccessKey(ctx *gin.Context, serviceAccountID, keyID string) error {
	return db.Session(ctx).Where("service_account_id = ? AND resource_id = ?", serviceAccountID, keyID).Delete(&model.ServiceAccountAccessKey{}).Error
}

// GetServiceAccountRoles gets the list of roles for a service account
func (s *ServiceAccountService) GetServiceAccountRoles(ctx *gin.Context, serviceAccountID string) ([]model.Role, error) {
	var serviceAccount model.ServiceAccount
	err := db.Session(ctx).Where("resource_id = ?", serviceAccountID).Preload("Roles").First(&serviceAccount).Error
	if err != nil {
		return nil, err
	}
	return serviceAccount.Roles, nil
}

// AssignServiceAccountRoles assigns roles to a service account
func (s *ServiceAccountService) AssignServiceAccountRoles(ctx *gin.Context, serviceAccountID string, roleIDs []string) error {
	var serviceAccount model.ServiceAccount
	err := db.Session(ctx).Where("resource_id = ?", serviceAccountID).First(&serviceAccount).Error
	if err != nil {
		return err
	}

	var roles []model.Role
	if len(roleIDs) > 0 {
		err = db.Session(ctx).Where("resource_id IN ?", roleIDs).Find(&roles).Error
		if err != nil {
			return err
		}
	}

	return db.Session(ctx).Model(&serviceAccount).Association("Roles").Replace(roles)
}

// GetServiceAccountPolicy gets the policy document for a service account
func (s *ServiceAccountService) GetServiceAccountPolicy(ctx *gin.Context, serviceAccountID string) (model.PolicyDocument, error) {
	var serviceAccount model.ServiceAccount
	err := db.Session(ctx).Where("resource_id = ?", serviceAccountID).First(&serviceAccount).Error
	if err != nil {
		return model.PolicyDocument{}, err
	}
	return serviceAccount.PolicyDocument, nil
}

// SetServiceAccountPolicy sets the policy document for a service account
func (s *ServiceAccountService) SetServiceAccountPolicy(ctx *gin.Context, serviceAccountID string, policyDoc model.PolicyDocument) error {
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
