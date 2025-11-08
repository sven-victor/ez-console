package service

import (
	"context"
	"errors"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
)

// OrganizationService provides organization-related services
type OrganizationService struct{}

// NewOrganizationService creates a new organization service
func NewOrganizationService() *OrganizationService {
	return &OrganizationService{}
}

// ListOrganizations lists organizations with pagination
func (s *OrganizationService) ListOrganizations(ctx context.Context, current, pageSize int, search string) ([]model.Organization, int64, error) {
	var orgs []model.Organization
	var total int64

	query := db.Session(ctx).Model(&model.Organization{})

	// Apply search filter
	if search != "" {
		query = query.Where("name LIKE ? OR description LIKE ?", "%"+search+"%", "%"+search+"%")
	}

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Apply pagination
	offset := (current - 1) * pageSize
	if err := query.Offset(offset).Limit(pageSize).Order("created_at DESC").Find(&orgs).Error; err != nil {
		return nil, 0, err
	}

	return orgs, total, nil
}

// GetOrganization gets an organization by ID
func (s *OrganizationService) GetOrganization(ctx context.Context, id string) (*model.Organization, error) {
	var org model.Organization
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&org).Error; err != nil {
		return nil, err
	}
	return &org, nil
}

// CreateOrganization creates a new organization
func (s *OrganizationService) CreateOrganization(ctx context.Context, org *model.Organization) error {
	return db.Session(ctx).Create(org).Error
}

// UpdateOrganization updates an organization
func (s *OrganizationService) UpdateOrganization(ctx context.Context, id string, org *model.Organization) error {
	var existing model.Organization
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&existing).Error; err != nil {
		return err
	}

	org.ID = existing.ID
	org.ResourceID = existing.ResourceID
	org.CreatedAt = existing.CreatedAt

	return db.Session(ctx).Save(org).Error
}

// DeleteOrganization deletes an organization
func (s *OrganizationService) DeleteOrganization(ctx context.Context, id string) error {
	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		// Check if organization has roles
		var roleCount int64
		if err := tx.Model(&model.Role{}).Where("organization_id = ?", id).Count(&roleCount).Error; err != nil {
			return err
		}
		if roleCount > 0 {
			return errors.New("cannot delete organization: organization has associated roles")
		}

		// Delete organization-user associations
		if err := tx.Table("user_organizations").Where("organization_id = ?", id).Delete(nil).Error; err != nil {
			return err
		}

		// Delete organization
		return tx.Where("resource_id = ?", id).Delete(&model.Organization{}).Error
	})
}

// GetUserOrganizations gets all organizations a user belongs to
func (s *OrganizationService) GetUserOrganizations(ctx context.Context, userID string) ([]model.Organization, error) {
	var orgs []model.Organization
	if err := db.Session(ctx).
		Joins("JOIN t_user_organizations ON t_user_organizations.organization_id = t_organization.id").
		Joins("JOIN t_user ON t_user.id = t_user_organizations.user_id").
		Where("t_user.resource_id = ?", userID).
		Find(&orgs).Error; err != nil {
		return nil, err
	}
	return orgs, nil
}

// OrganizationUser represents a user in an organization with their roles
type OrganizationUser struct {
	model.User
	OrganizationRoles []model.Role `json:"organization_roles"`
}

// ListOrganizationUsers lists users in an organization with their roles
func (s *OrganizationService) ListOrganizationUsers(ctx context.Context, organizationID string, current, pageSize int, search string) ([]OrganizationUser, int64, error) {
	var users []OrganizationUser
	var total int64

	// First, verify organization exists
	var org model.Organization
	if err := db.Session(ctx).Where("resource_id = ?", organizationID).First(&org).Error; err != nil {
		return nil, 0, err
	}

	// Build query to get users in the organization
	query := db.Session(ctx).Model(&model.User{}).
		Joins("JOIN t_user_organizations ON t_user_organizations.user_id = t_user.id").
		Joins("JOIN t_organization ON t_organization.id = t_user_organizations.organization_id").
		Where("t_organization.resource_id = ?", organizationID)

	// Apply search filter
	if search != "" {
		query = query.Where("t_user.username LIKE ? OR t_user.email LIKE ? OR t_user.full_name LIKE ?",
			"%"+search+"%", "%"+search+"%", "%"+search+"%")
	}

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Apply pagination
	offset := (current - 1) * pageSize
	var userList []model.User
	if err := query.Offset(offset).Limit(pageSize).Order("t_user.created_at DESC").Find(&userList).Error; err != nil {
		return nil, 0, err
	}

	// For each user, get their roles in this organization
	for _, user := range userList {
		var orgRoles []model.Role
		if err := db.Session(ctx).
			Joins("JOIN t_user_roles ON t_user_roles.role_id = t_role.id").
			Where("t_user_roles.user_id = ? AND t_role.organization_id = ?", user.ID, organizationID).
			Find(&orgRoles).Error; err != nil {
			return nil, 0, err
		}

		users = append(users, OrganizationUser{
			User:              user,
			OrganizationRoles: orgRoles,
		})
	}

	return users, total, nil
}

// AddUserToOrganization adds a user to an organization with specified roles
func (s *OrganizationService) AddUserToOrganization(ctx context.Context, organizationID string, userID string, roleIDs []string) error {
	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		// Verify organization exists
		var org model.Organization
		if err := tx.Where("resource_id = ?", organizationID).First(&org).Error; err != nil {
			return errors.New("organization not found")
		}

		// Verify user exists
		var user model.User
		if err := tx.Where("resource_id = ?", userID).First(&user).Error; err != nil {
			return errors.New("user not found")
		}

		// Check if user is already in the organization
		var count int64
		if err := tx.Table("t_user_organizations").
			Where("user_id = ? AND organization_id = ?", userID, organizationID).
			Count(&count).Error; err != nil {
			return err
		}
		if count > 0 {
			return errors.New("user is already in the organization")
		}

		// Add user to organization
		if err := tx.Model(&user).Association("Organizations").Append(&org); err != nil {
			return err
		}

		// Validate and assign roles if provided
		if len(roleIDs) > 0 {
			var roles []model.Role
			if err := tx.Where("resource_id IN ?", roleIDs).Find(&roles).Error; err != nil {
				return err
			}
			if len(roles) != len(roleIDs) {
				return errors.New("some roles not found")
			}
			for _, role := range roles {
				if role.OrganizationID == nil || *role.OrganizationID != organizationID {
					return errors.New("role does not belong to the organization")
				}
			}

			// Assign roles to user (append, not replace)
			// Get existing roles
			var existingRoles []model.Role
			if err := tx.Model(&user).Association("Roles").Find(&existingRoles); err != nil {
				return err
			}

			// Combine existing roles with new roles
			roleMap := make(map[string]bool)
			for _, role := range existingRoles {
				roleMap[role.ResourceID] = true
			}
			for _, role := range roles {
				if !roleMap[role.ResourceID] {
					existingRoles = append(existingRoles, role)
				}
			}

			defer middleware.DeleteUserCache(userID)
			// Replace all roles
			if err := tx.Model(&user).Association("Roles").Replace(existingRoles); err != nil {
				return err
			}
		}

		return nil
	})
}

// UpdateUserOrganizationRoles updates a user's roles in an organization
func (s *OrganizationService) UpdateUserOrganizationRoles(ctx context.Context, organizationID string, userID string, roleIDs []string) error {
	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		// Verify organization exists
		var org model.Organization
		if err := tx.Where("resource_id = ?", organizationID).First(&org).Error; err != nil {
			return errors.New("organization not found")
		}

		// Verify user exists and is in the organization
		var user model.User
		if err := tx.Where("resource_id = ?", userID).First(&user).Error; err != nil {
			return errors.New("user not found")
		}

		var count int64
		if err := tx.Table("t_user_organizations").
			Where("user_id = ? AND organization_id = ?", user.ID, org.ID).
			Count(&count).Error; err != nil {
			return err
		}
		if count == 0 {
			return errors.New("user is not in the organization")
		}

		// Validate roles belong to the organization
		var newOrgRoles []model.Role
		if len(roleIDs) > 0 {
			var roles []model.Role
			if err := tx.Where("resource_id IN ?", roleIDs).Find(&roles).Error; err != nil {
				return err
			}
			if len(roles) != len(roleIDs) {
				return errors.New("some roles not found")
			}
			for _, role := range roles {
				if role.OrganizationID == nil || *role.OrganizationID != organizationID {
					return errors.New("role does not belong to the organization")
				}
				newOrgRoles = append(newOrgRoles, role)
			}
		}

		// Get all user roles
		var allUserRoles []model.Role
		if err := tx.Model(&user).Association("Roles").Find(&allUserRoles); err != nil {
			return err
		}

		// Remove roles that belong to this organization
		var filteredRoles []model.Role
		for _, role := range allUserRoles {
			if role.OrganizationID == nil || *role.OrganizationID != organizationID {
				filteredRoles = append(filteredRoles, role)
			}
		}

		// Add new organization roles
		filteredRoles = append(filteredRoles, newOrgRoles...)

		defer middleware.DeleteUserCache(userID)
		// Replace all roles
		if err := tx.Model(&user).Association("Roles").Replace(filteredRoles); err != nil {
			return err
		}

		return nil
	})
}

// RemoveUserFromOrganization removes a user from an organization and removes their roles in that organization
func (s *OrganizationService) RemoveUserFromOrganization(ctx context.Context, organizationID string, userID string) error {
	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		// Verify organization exists
		var org model.Organization
		if err := tx.Where("resource_id = ?", organizationID).First(&org).Error; err != nil {
			return errors.New("organization not found")
		}

		// Verify user exists and is in the organization
		var user model.User
		if err := tx.Where("resource_id = ?", userID).First(&user).Error; err != nil {
			return errors.New("user not found")
		}

		var count int64
		if err := tx.Table("t_user_organizations").
			Where("user_id = ? AND organization_id = ?", userID, organizationID).
			Count(&count).Error; err != nil {
			return err
		}
		if count == 0 {
			return errors.New("user is not in the organization")
		}

		// Remove user from organization
		if err := tx.Model(&user).Association("Organizations").Delete(&org); err != nil {
			return err
		}

		// Get all user roles
		var allUserRoles []model.Role
		if err := tx.Model(&user).Association("Roles").Find(&allUserRoles); err != nil {
			return err
		}

		// Remove roles that belong to this organization
		var filteredRoles []model.Role
		for _, role := range allUserRoles {
			if role.OrganizationID == nil || *role.OrganizationID != organizationID {
				filteredRoles = append(filteredRoles, role)
			}
		}

		defer middleware.DeleteUserCache(userID)
		// Replace all roles (removing organization roles)
		if err := tx.Model(&user).Association("Roles").Replace(filteredRoles); err != nil {
			return err
		}

		return nil
	})
}
