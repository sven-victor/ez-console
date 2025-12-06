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
	"errors"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
	"gorm.io/gorm"
)

// PermissionService provides permission-related services
type PermissionService struct{}

// ListPermissions gets the permission list
func (s *PermissionService) ListPermissions(ctx context.Context) ([]model.Permission, error) {
	var permissions []model.Permission
	if err := db.Session(ctx).Find(&permissions).Error; err != nil {
		return nil, err
	}
	return permissions, nil
}

// GetPermission gets a permission by ID
func (s *PermissionService) GetPermission(ctx context.Context, id string) (*model.Permission, error) {
	var permission model.Permission
	if err := db.Session(ctx).Where(&model.Permission{Base: model.Base{ResourceID: id}}).First(&permission).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, util.ErrorResponse{
				Code: "E4004",
				Err:  errors.New("permission not found"),
			}
		}
		return nil, util.ErrorResponse{
			Code: "E5002",
			Err:  err,
		}
	}
	return &permission, nil
}

// CreatePermission creates a new permission
func (s *PermissionService) CreatePermission(ctx context.Context, name, description, code string) (*model.Permission, error) {
	// Check if permission name already exists
	var count int64
	if err := db.Session(ctx).Model(&model.Permission{}).Where("name = ?", name).Count(&count).Error; err != nil {
		return nil, err
	}
	if count > 0 {
		return nil, util.ErrorResponse{
			Code: "E4003",
			Err:  errors.New("permission name already exists"),
		}
	}

	// Check if permission code already exists
	if err := db.Session(ctx).Model(&model.Permission{}).Where("code = ?", code).Count(&count).Error; err != nil {
		return nil, err
	}
	if count > 0 {
		return nil, util.ErrorResponse{
			Code: "E4003",
			Err:  errors.New("permission code already exists"),
		}
	}

	permission := model.Permission{
		Name:        name,
		Description: description,
		Code:        code,
	}

	if err := db.Session(ctx).Create(&permission).Error; err != nil {
		return nil, util.ErrorResponse{
			Code:    "E5003",
			Err:     err,
			Message: "failed to create permission",
		}
	}

	return &permission, nil
}

// UpdatePermission updates a permission
func (s *PermissionService) UpdatePermission(ctx context.Context, id, name, description, code string) (*model.Permission, error) {
	var permission model.Permission
	if err := db.Session(ctx).Where(&model.Permission{Base: model.Base{ResourceID: id}}).First(&permission).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, util.ErrorResponse{
				Code: "E4004",
				Err:  errors.New("permission not found"),
			}
		}
		return nil, util.ErrorResponse{
			Code:    "E5002",
			Err:     err,
			Message: "failed to get permission",
		}
	}

	// Check if permission name already exists (if name has changed)
	if name != permission.Name {
		var count int64
		if err := db.Session(ctx).Model(&model.Permission{}).Where("name = ? AND resource_id != ?", name, id).Count(&count).Error; err != nil {
			return nil, util.ErrorResponse{
				Code:    "E5002",
				Err:     err,
				Message: "failed to check permission name",
			}
		}
		if count > 0 {
			return nil, util.ErrorResponse{
				Code: "E4003",
				Err:  errors.New("permission name already exists"),
			}
		}
	}

	// Check if permission code already exists (if code has changed)
	if code != permission.Code {
		var count int64
		if err := db.Session(ctx).Model(&model.Permission{}).Where("code = ? AND resource_id != ?", code, id).Count(&count).Error; err != nil {
			return nil, err
		}
		if count > 0 {
			return nil, errors.New("permission code already exists")
		}
	}

	permission.Name = name
	permission.Description = description
	permission.Code = code

	if err := db.Session(ctx).Save(&permission).Error; err != nil {
		return nil, err
	}

	return &permission, nil
}

// DeletePermission deletes a permission
func (s *PermissionService) DeletePermission(ctx context.Context, id string) error {
	// Check if the permission is being used by roles
	var count int64
	if err := db.Session(ctx).Model(&model.Role{}).Joins("JOIN role_permissions ON roles.resource_id = role_permissions.role_id").
		Where("role_permissions.permission_id = ?", id).Count(&count).Error; err != nil {
		return util.ErrorResponse{
			Code:    "E5002",
			Err:     err,
			Message: "failed to check permission usage",
		}
	}
	if count > 0 {
		return util.ErrorResponse{
			Code: "E4003",
			Err:  errors.New("permission is being used by roles"),
		}
	}
	if err := db.Session(ctx).Where(&model.Permission{Base: model.Base{ResourceID: id}}).Delete(&model.Permission{}).Error; err != nil {
		return util.ErrorResponse{
			Code:    "E5002",
			Err:     err,
			Message: "failed to delete permission",
		}
	}

	return nil
}
