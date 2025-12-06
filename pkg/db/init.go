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

package db

import (
	"context"
	"fmt"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
)

var migrateModels = []interface{}{
	&model.User{},
	&model.Role{},
	&model.Permission{},
	&model.Session{},
	&model.AuditLog{},
	&model.Setting{},
	&model.ServiceAccount{},
	&model.ServiceAccountAccessKey{},
	&model.PasswordHistory{},
	&model.File{},
	&model.TempData{},
	&model.AIModel{},
	&model.ToolSet{},
	&model.RoleAIToolPermission{},
	&model.AIChatSession{},
	&model.AIChatMessage{},
}

func RegisterModels(models ...interface{}) {
	migrateModels = append(migrateModels, models...)
}

// MigrateDB executes database migration and automatically creates table structures
func MigrateDB(ctx context.Context) error {
	logger := log.GetContextLogger(ctx)
	level.Info(logger).Log("msg", "Starting database migration...")

	// Use transactions to ensure data consistency
	return Session(ctx).Transaction(func(tx *gorm.DB) error {

		// Automatically migrate all models
		if err := tx.AutoMigrate(migrateModels...); err != nil {
			return err
		}

		level.Info(logger).Log("msg", "Database migration completed")
		return nil
	})
}

// SeedDB initializes basic data
func SeedDB(ctx context.Context, permissions []*model.PermissionGroup) error {
	logger := log.GetContextLogger(ctx)
	level.Info(logger).Log("msg", "Starting to initialize basic data...")

	// Use transactions to ensure data consistency
	return Session(ctx).Transaction(func(tx *gorm.DB) error {
		// sed organization
		var organizationCount int64
		tx.Model(&model.Organization{}).Count(&organizationCount)
		if organizationCount == 0 {
			if err := seedOrganizations(tx); err != nil {
				return fmt.Errorf("Failed to initialize organizations: %w", err)
			}
		}

		// Check if initialization is needed
		if err := seedPermissions(ctx, tx, permissions); err != nil {
			return err
		}

		// Check if roles need to be initialized
		var roleCount int64
		tx.Model(&model.Role{}).Count(&roleCount)
		if roleCount == 0 {
			if err := seedRoles(ctx, tx); err != nil {
				return fmt.Errorf("Failed to initialize roles: %w", err)
			}
		} else {
			var allPermissions []model.Permission
			if err := tx.Find(&allPermissions).Error; err != nil {
				return fmt.Errorf("Failed to get all permissions: %w", err)
			}
			var adminRole model.Role
			if err := tx.Where("name = 'admin' AND (organization_id IS NULL OR organization_id = '')").First(&adminRole).Error; err != nil {
				return fmt.Errorf("Failed to get admin role: %w", err)
			}
			if err := tx.Model(&adminRole).Association("Permissions").Replace(allPermissions); err != nil {
				return fmt.Errorf("Failed to replace admin role permissions: %w", err)
			}
		}

		// Check if users need to be initialized
		var userCount int64
		if err := tx.Model(&model.User{}).Count(&userCount).Error; err != nil {
			return fmt.Errorf("Failed to get user count: %w", err)
		}
		if userCount == 0 {
			if err := seedUsers(tx); err != nil {
				return fmt.Errorf("Failed to initialize users: %w", err)
			}
		}
		level.Info(logger).Log("msg", "Basic data initialization completed")
		return nil
	})
}

// seedPermissions creates initial permissions
func seedPermissions(ctx context.Context, tx *gorm.DB, permissions []*model.PermissionGroup) error {
	var originalPermissions []model.Permission
	if err := tx.Model(&model.Permission{}).Find(&originalPermissions).Error; err != nil {
		return err
	}
	if len(originalPermissions) == 0 {
		logger := log.GetContextLogger(ctx)
		level.Info(logger).Log("msg", "Creating basic permissions...")
		var newPermissions []model.Permission
		for _, permissionGroup := range permissions {
			newPermissions = append(newPermissions, permissionGroup.Permissions...)
		}
		if err := tx.Create(&newPermissions).Error; err != nil {
			return err
		}
	} else {
		for _, permissionGroup := range permissions {
		loop:
			for _, permission := range permissionGroup.Permissions {
				for _, originalPermission := range originalPermissions {
					if permission.Code == originalPermission.Code {
						if permission.Name != originalPermission.Name || permission.Description != originalPermission.Description || permission.OrgPermission != originalPermission.OrgPermission {
							if err := tx.Model(&model.Permission{}).Where("id = ?", originalPermission.ID).Updates(map[string]interface{}{
								"Description":   permission.Description,
								"Name":          permission.Name,
								"OrgPermission": permission.OrgPermission,
							}).Error; err != nil {
								return err
							}
						}
						continue loop
					}
				}
				if err := tx.Create(&permission).Error; err != nil {
					return err
				}
			}
		}
	}
	return nil
}

// seedRoles creates initial roles
func seedRoles(ctx context.Context, tx *gorm.DB) error {
	logger := log.GetContextLogger(ctx)
	level.Info(logger).Log("msg", "Creating basic roles...")

	// Get all permissions
	var allPermissions []model.Permission
	if err := tx.Find(&allPermissions).Error; err != nil {
		return err
	}

	// Create administrator role
	adminRole := model.Role{
		Name:        "admin",
		Description: "System administrator, with all permissions",
		Permissions: allPermissions,
	}

	// Get user view permission
	var userViewPermission []model.Permission
	if err := tx.Where("code = ?", "authorization:user:view").Find(&userViewPermission).Error; err != nil {
		return err
	}

	// Create operator role
	operatorRole := model.Role{
		Name:        "operator",
		Description: "System operator, can view users",
		Permissions: userViewPermission,
	}

	// Create viewer role
	viewerRole := model.Role{
		Name:        "viewer",
		Description: "System viewer, only has view permissions",
		Permissions: userViewPermission,
	}

	// Save roles to database
	roles := []model.Role{adminRole, operatorRole, viewerRole}
	if err := tx.Create(&roles).Error; err != nil {
		return err
	}

	return nil
}

// seedUsers creates initial users
func seedUsers(tx *gorm.DB) error {
	var count int64
	tx.Model(&model.User{}).Count(&count)
	if count > 0 {
		return nil
	}

	if tx.Error != nil {
		return tx.Error
	}

	// Create default administrator
	adminUser := model.User{
		Username: "admin",
		Email:    "admin@example.com",
		FullName: "System Administrator",
		Status:   model.UserStatusPasswordExpired,
	}
	adminUser.SetPassword("Admin@123")

	if err := tx.Create(&adminUser).Error; err != nil {
		return err
	}

	if err := tx.Save(&adminUser).Error; err != nil {
		return err
	}

	// Associate roles
	var adminRole model.Role
	if err := tx.Where("name = ? AND (organization_id IS NULL OR organization_id = '')", "admin").First(&adminRole).Error; err != nil {
		return err
	}
	if err := tx.Model(&adminUser).Association("Roles").Replace(&adminRole); err != nil {
		return err
	}
	return nil
}

func seedOrganizations(tx *gorm.DB) error {
	defaultOrganization := model.Organization{
		Base: model.Base{
			ResourceID: "00000000000000000000000000000000",
		},
		Name:        "Default",
		Description: "Default organization",
		Status:      model.OrganizationStatusActive,
	}
	if err := tx.Create(&defaultOrganization).Error; err != nil {
		return err
	}
	return nil
}
