package service

import (
	"context"
	"errors"
	"net/http"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
	"gorm.io/gorm"
)

// RoleService provides role-related services
type RoleService struct{}

// ListRoles gets the list of roles
func (s *RoleService) ListRoles(ctx context.Context, current, pageSize int, search string) ([]model.Role, int64, error) {
	var roles []model.Role
	var total int64
	query := db.Session(ctx).Model(&model.Role{})

	// Add search conditions
	if search != "" {
		query = query.Where("name LIKE ? OR description LIKE ?", "%"+search+"%", "%"+search+"%")
	}

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Paginated query
	offset := (current - 1) * pageSize
	if err := query.Offset(offset).Limit(pageSize).Preload("Permissions").Find(&roles).Error; err != nil {
		return nil, 0, err
	}

	return roles, total, nil
}

// GetRole gets a role by ID
func (s *RoleService) GetRole(ctx context.Context, id string) (*model.Role, error) {
	var role model.Role
	if err := db.Session(ctx).Where(&model.Role{Base: model.Base{ResourceID: id}}).Preload("Permissions").First(&role).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusNotFound,
				Code:     "E4004",
				Err:      errors.New("role not found"),
			}
		}
		return nil, err
	}
	return &role, nil
}

// CreateRole creates a new role
func (s *RoleService) CreateRole(ctx context.Context, name, description string, permissionIDs []string, policyDocument model.PolicyDocument) (*model.Role, error) {
	// Check if role name already exists
	var count int64
	if err := db.Session(ctx).Model(&model.Role{}).Where("name = ?", name).Count(&count).Error; err != nil {
		return nil, err
	}
	if count > 0 {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("role name already exists"),
		}
	}

	// Create role
	role := model.Role{
		Name:           name,
		Description:    description,
		PolicyDocument: policyDocument,
	}
	if !role.PolicyDocument.IsValid() {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid policy document"),
		}
	}
	if len(role.PolicyDocument.Statement) == 0 && len(permissionIDs) == 0 {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("policy document and permissions cannot both be empty"),
		}
	}
	// Start transaction
	err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {

		if err := tx.Create(&role).Error; err != nil {
			return err
		}

		// If permission IDs are provided, assign permissions
		if len(permissionIDs) > 0 {
			var permissions []model.Permission
			if err := tx.Where("resource_id IN ?", permissionIDs).Find(&permissions).Error; err != nil {
				return err
			}

			if err := tx.Model(&role).Association("Permissions").Replace(permissions); err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	return s.GetRole(ctx, role.ResourceID)
}

// UpdateRole updates a role
func (s *RoleService) UpdateRole(ctx context.Context, id, name, description string, permissionIDs []string, policyDocument model.PolicyDocument) (*model.Role, error) {
	var role model.Role
	if err := db.Session(ctx).Where(&model.Role{Base: model.Base{ResourceID: id}}).First(&role).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusNotFound,
				Code:     "E4004",
				Err:      errors.New("role not found"),
			}
		}
		return nil, err
	}
	// Check if role name already exists (if name has changed)
	if name != role.Name {
		var count int64
		if err := db.Session(ctx).Model(&model.Role{}).Where("name = ? AND resource_id != ?", name, id).Count(&count).Error; err != nil {
			return nil, err
		}
		if count > 0 {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusBadRequest,
				Code:     "E4001",
				Err:      errors.New("role name already exists"),
			}
		}
	}
	role.Name = name
	role.Description = description
	role.PolicyDocument = policyDocument
	if !role.PolicyDocument.IsValid() {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid policy document"),
		}
	}
	if len(role.PolicyDocument.Statement) == 0 && len(permissionIDs) == 0 {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("policy document and permissions cannot both be empty"),
		}
	}
	err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Save(&role).Error; err != nil {
			return err
		}
		// If permission IDs are provided, assign permissions
		if len(permissionIDs) > 0 {
			var permissions []model.Permission
			if err := tx.Where("resource_id IN ?", permissionIDs).Find(&permissions).Error; err != nil {
				return err
			}

			if err := tx.Model(&role).Association("Permissions").Replace(permissions); err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	return s.GetRole(ctx, role.ResourceID)
}

// DeleteRole deletes a role
func (s *RoleService) DeleteRole(ctx context.Context, id string) error {
	// Check if the role is used by users
	var count int64
	if err := db.Session(ctx).Model(&model.User{}).Joins("JOIN user_roles ON users.resource_id = user_roles.user_id").
		Where("user_roles.role_id = ?", id).Count(&count).Error; err != nil {
		return err
	}
	if count > 0 {
		return util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("cannot delete role in use"),
		}
	}

	if err := db.Session(ctx).Where(&model.Role{Base: model.Base{ResourceID: id}}).Delete(&model.Role{}).Error; err != nil {
		return err
	}

	return nil
}

// AssignPermissions assigns permissions to a role
func (s *RoleService) AssignPermissions(ctx context.Context, roleID string, permissionIDs []string) error {
	var role model.Role
	if err := db.Session(ctx).Where(&model.Role{Base: model.Base{ResourceID: roleID}}).First(&role).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return util.ErrorResponse{
				HTTPCode: http.StatusNotFound,
				Code:     "E4004",
				Err:      errors.New("role not found"),
			}
		}
		return err
	}

	var permissions []model.Permission
	if err := db.Session(ctx).Where("resource_id IN ?", permissionIDs).Find(&permissions).Error; err != nil {
		return err
	}

	if err := db.Session(ctx).Model(&role).Association("Permissions").Replace(permissions); err != nil {
		return err
	}

	return nil
}

// SetRolePolicy sets the policy document for a role
func (s *RoleService) SetRolePolicy(ctx context.Context, roleID string, policyDocument model.PolicyDocument) (*model.Role, error) {
	var role model.Role
	if err := db.Session(ctx).Where(&model.Role{Base: model.Base{ResourceID: roleID}}).First(&role).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusNotFound,
				Code:     "E4004",
				Err:      errors.New("role not found"),
			}
		}
		return nil, err
	}
	if !policyDocument.IsValid() {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("invalid policy document"),
		}
	}
	// Set policy document
	role.PolicyDocument = policyDocument
	if err := db.Session(ctx).Select("PolicyDocument").Save(&role).Error; err != nil {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5001",
			Err:      err,
			Message:  "failed to save policy document",
		}
	}

	return s.GetRole(ctx, role.ResourceID)
}

// GetRolePolicy gets the policy document of a role
func (s *RoleService) GetRolePolicy(ctx context.Context, roleID string) (model.PolicyDocument, error) {
	var role model.Role
	if err := db.Session(ctx).Where(&model.Role{Base: model.Base{ResourceID: roleID}}).First(&role).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return model.PolicyDocument{}, util.ErrorResponse{
				HTTPCode: http.StatusNotFound,
				Code:     "E4004",
				Err:      errors.New("role not found"),
			}
		}
		return model.PolicyDocument{}, err
	}

	return role.PolicyDocument, nil
}
