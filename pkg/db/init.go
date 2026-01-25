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
	"errors"
	"fmt"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
)

const defaultRoleDescPrefix = "System role: "

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

type RolesSetup struct {
	roles         []*model.Role
	orgs          []*model.Organization
	adminRole     *model.Role
	orgAdminRoles map[string]*model.Role
}

func (r *RolesSetup) GetRoles() []*model.Role {
	var roles []*model.Role
	roles = append(roles, r.adminRole)
	for _, orgAdminRole := range r.orgAdminRoles {
		roles = append(roles, orgAdminRole)
	}
	roles = append(roles, r.roles...)
	return roles
}

func (r *RolesSetup) GetRole(orgID *string, name string) *model.Role {
	for _, role := range r.roles {
		if orgID != nil {
			if role.OrganizationID == orgID && role.Name == name {
				return role
			}
		} else {
			if (role.OrganizationID == nil || *role.OrganizationID == "") && role.Name == name {
				return role
			}
		}
	}
	return nil
}

func (r *RolesSetup) AddPermission(permission model.Permission) {
	if permission.OrgPermission {
		for _, org := range r.orgs {
			r.adminRole.Permissions = append(r.adminRole.Permissions, permission)
			orgAdminRole, ok := r.orgAdminRoles[org.ResourceID]
			if !ok {
				orgAdminRole = &model.Role{
					Name:           "admin",
					Description:    defaultRoleDescPrefix + "admin",
					Permissions:    []model.Permission{permission},
					RoleType:       model.RoleTypeSystem,
					OrganizationID: &org.ResourceID,
				}
				r.orgAdminRoles[org.ResourceID] = orgAdminRole
			} else {
				orgAdminRole.Permissions = append(orgAdminRole.Permissions, permission)
			}

			for _, roleName := range permission.DefaultRoleNames {
				if roleName == "admin" {
					continue
				}
				role := r.GetRole(&org.ResourceID, roleName)
				if role == nil {
					role = &model.Role{
						Name:           roleName,
						Description:    defaultRoleDescPrefix + roleName,
						Permissions:    []model.Permission{permission},
						RoleType:       model.RoleTypeSystem,
						OrganizationID: &org.ResourceID,
					}
					r.roles = append(r.roles, role)
				} else {
					role.Permissions = append(role.Permissions, permission)
				}
			}
		}
	}

	for _, roleName := range permission.DefaultRoleNames {
		if roleName == "admin" {
			continue
		}
		role := r.GetRole(nil, roleName)
		if role == nil {
			role = &model.Role{
				Name:        roleName,
				Description: defaultRoleDescPrefix + roleName,
				Permissions: []model.Permission{permission},
				RoleType:    model.RoleTypeSystem,
			}
			r.roles = append(r.roles, role)
		} else {
			role.Permissions = append(role.Permissions, permission)
		}
	}
	r.adminRole.Permissions = append(r.adminRole.Permissions, permission)
}

// seedPermissions creates initial permissions
func seedPermissions(ctx context.Context, tx *gorm.DB, permissions []*model.PermissionGroup) error {
	var originalPermissions []model.Permission
	if err := tx.Model(&model.Permission{}).Find(&originalPermissions).Error; err != nil {
		return err
	}

	var orgs []*model.Organization
	if err := tx.Find(&orgs).Error; err != nil {
		return err
	}
	roleSetup := RolesSetup{
		roles: make([]*model.Role, 0),
		orgs:  orgs,
		adminRole: &model.Role{
			Name:        "admin",
			Description: "System administrator, with all permissions",
			RoleType:    model.RoleTypeSystem,
		},
		orgAdminRoles: make(map[string]*model.Role),
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
		for _, permission := range newPermissions {
			roleSetup.AddPermission(permission)
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
						originalPermission.DefaultRoleNames = permission.DefaultRoleNames
						originalPermission.Description = permission.Description
						originalPermission.Name = permission.Name
						originalPermission.OrgPermission = permission.OrgPermission
						roleSetup.AddPermission(originalPermission)
						continue loop
					}
				}
				if err := tx.Create(&permission).Error; err != nil {
					return err
				}
				roleSetup.AddPermission(permission)
			}
		}
	}

	for _, role := range roleSetup.GetRoles() {
		var dbRole model.Role
		if role.OrganizationID != nil && *role.OrganizationID != "" {
			if err := tx.Where("name = ? and organization_id = ?", role.Name, *role.OrganizationID).First(&dbRole).Error; err != nil {
				if !errors.Is(err, gorm.ErrRecordNotFound) {
					return fmt.Errorf("failed to get role: %w", err)
				}
				if err := tx.Create(&role).Error; err != nil {
					return err
				}
				dbRole = *role
			}
		} else {
			if err := tx.Where("name = ? and (organization_id is null or organization_id = '')", role.Name).First(&dbRole).Error; err != nil {
				if !errors.Is(err, gorm.ErrRecordNotFound) {
					return fmt.Errorf("failed to get role: %w", err)
				}
				if err := tx.Create(&role).Error; err != nil {
					return err
				}
				dbRole = *role
			}
		}
		if err := tx.Model(&dbRole).Association("Permissions").Replace(role.Permissions); err != nil {
			return fmt.Errorf("failed to replace role permissions: %w", err)
		}
		if err := tx.Model(&dbRole).Updates(map[string]interface{}{
			"Description":    role.Description,
			"Name":           role.Name,
			"Permissions":    role.Permissions,
			"RoleType":       model.RoleTypeSystem,
			"OrganizationID": role.OrganizationID,
		}).Error; err != nil {
			return err
		}
	}
	return nil
}

type OrgRoleSetup struct {
	roles     []*model.Role
	orgID     string
	adminRole *model.Role
}

func (o OrgRoleSetup) GetRoles() []*model.Role {
	roles := make([]*model.Role, len(o.roles)+1)
	copy(roles[:len(o.roles)], o.roles)
	roles[len(roles)-1] = o.adminRole
	return roles
}

func (o *OrgRoleSetup) AddPermission(p model.Permission) {
	for _, roleName := range p.DefaultRoleNames {
		if roleName == "admin" {
			continue
		}
		role := o.GetRole(roleName)
		if role == nil {
			role = &model.Role{
				Name:           roleName,
				Description:    defaultRoleDescPrefix + roleName,
				RoleType:       model.RoleTypeSystem,
				OrganizationID: &o.orgID,
				Permissions:    []model.Permission{p},
			}
			o.roles = append(o.roles, role)
		} else {
			role.Permissions = append(role.Permissions, p)
		}
	}
	o.adminRole.Permissions = append(o.adminRole.Permissions, p)
}

func (o OrgRoleSetup) GetRole(name string) *model.Role {
	for _, role := range o.roles {
		if role.Name == name {
			return role
		}
	}
	return nil
}

// EnsureDefaultRolesForOrganization creates default org-scoped roles for the given organization
// based on permissions with DefaultRoleNames and OrgPermission. Uses the same role names and
// permission assignment as startup; call this when creating a new organization so it has
// operator/viewer etc. like the default org. Must be called within a transaction.
func EnsureDefaultRolesForOrganization(ctx context.Context, tx *gorm.DB, orgID string, groups []*model.PermissionGroup) error {
	orgRoleSetup := OrgRoleSetup{
		roles: make([]*model.Role, 0),
		orgID: orgID,
		adminRole: &model.Role{
			Name:           "admin",
			Description:    defaultRoleDescPrefix + "admin",
			RoleType:       model.RoleTypeSystem,
			OrganizationID: &orgID,
			Permissions:    make([]model.Permission, 0),
		},
	}

	for _, g := range groups {
		for _, p := range g.Permissions {
			if !p.OrgPermission {
				continue
			}
			orgRoleSetup.AddPermission(p)
		}
	}
	for _, role := range orgRoleSetup.GetRoles() {
		if err := tx.Create(&role).Error; err != nil {
			return err
		}
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
