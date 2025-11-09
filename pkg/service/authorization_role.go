package service

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
	"gorm.io/gorm"
)

// RoleService provides role-related services
type RoleService struct {
	toolSetService *ToolSetService
}

// NewRoleService creates a role service instance.
func NewRoleService(toolSetService *ToolSetService) *RoleService {
	return &RoleService{
		toolSetService: toolSetService,
	}
}

// RoleAIToolAssignment represents AI tool assignments for a role.
type RoleAIToolAssignment struct {
	ToolSetID string
	Tools     []string
}

func deduplicateStrings(values []string) []string {
	seen := make(map[string]struct{}, len(values))
	result := make([]string, 0, len(values))
	for _, value := range values {
		if value == "" {
			continue
		}
		if _, exists := seen[value]; exists {
			continue
		}
		seen[value] = struct{}{}
		result = append(result, value)
	}
	return result
}

func (s *RoleService) validateAIToolAssignments(ctx context.Context, organizationID *string, assignments []RoleAIToolAssignment) error {
	if len(assignments) == 0 {
		return nil
	}

	if organizationID == nil || *organizationID == "" {
		return util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("AI tool permissions can only be configured for organization roles"),
		}
	}

	toolSetIDSet := make(map[string]struct{}, len(assignments))
	toolSetIDs := make([]string, 0, len(assignments))

	for _, assignment := range assignments {
		if assignment.ToolSetID == "" {
			return util.ErrorResponse{
				HTTPCode: http.StatusBadRequest,
				Code:     "E4001",
				Err:      errors.New("toolset_id is required"),
			}
		}
		cleanTools := deduplicateStrings(assignment.Tools)
		if len(cleanTools) == 0 {
			return util.ErrorResponse{
				HTTPCode: http.StatusBadRequest,
				Code:     "E4001",
				Err:      errors.New("tools cannot be empty"),
			}
		}
		if _, exists := toolSetIDSet[assignment.ToolSetID]; !exists {
			toolSetIDs = append(toolSetIDs, assignment.ToolSetID)
			toolSetIDSet[assignment.ToolSetID] = struct{}{}
		}
	}

	var toolSets []model.ToolSet
	if err := db.Session(ctx).Where("resource_id IN ?", toolSetIDs).Find(&toolSets).Error; err != nil {
		return err
	}

	if len(toolSets) == 0 {
		return util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("no matching toolsets found for AI permissions"),
		}
	}

	toolSetMap := make(map[string]model.ToolSet, len(toolSets))
	for _, toolSet := range toolSets {
		if toolSet.OrganizationID != *organizationID {
			return util.ErrorResponse{
				HTTPCode: http.StatusBadRequest,
				Code:     "E4001",
				Err:      errors.New("toolset does not belong to the target organization"),
			}
		}
		toolSetMap[toolSet.ResourceID] = toolSet
	}

	if len(toolSetMap) != len(toolSetIDSet) {
		return util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("some toolsets were not found"),
		}
	}

	if s.toolSetService != nil {
		for _, assignment := range assignments {
			toolDefinitions, err := s.toolSetService.GetToolSetToolDefinitions(ctx, *organizationID, assignment.ToolSetID)
			if err != nil {
				return util.NewError("E5001", err)
			}
			if len(toolDefinitions) == 0 {
				return util.ErrorResponse{
					HTTPCode: http.StatusBadRequest,
					Code:     "E4001",
					Err:      fmt.Errorf("toolset %s does not expose any tools", assignment.ToolSetID),
				}
			}
			availableTools := make(map[string]struct{}, len(toolDefinitions))
			for _, definition := range toolDefinitions {
				availableTools[definition.Name] = struct{}{}
			}
			for _, toolName := range deduplicateStrings(assignment.Tools) {
				if _, exists := availableTools[toolName]; !exists {
					return util.ErrorResponse{
						HTTPCode: http.StatusBadRequest,
						Code:     "E4001",
						Err:      fmt.Errorf("tool %s is not available in toolset %s", toolName, assignment.ToolSetID),
					}
				}
			}
		}
	}

	return nil
}

func buildRoleAIToolPermissions(roleID string, organizationID string, assignments []RoleAIToolAssignment) []model.RoleAIToolPermission {
	permissions := make([]model.RoleAIToolPermission, 0)
	seen := make(map[string]struct{})
	for _, assignment := range assignments {
		cleanTools := deduplicateStrings(assignment.Tools)
		for _, toolName := range cleanTools {
			key := fmt.Sprintf("%s|%s", assignment.ToolSetID, toolName)
			if _, exists := seen[key]; exists {
				continue
			}
			seen[key] = struct{}{}
			permissions = append(permissions, model.RoleAIToolPermission{
				RoleID:         roleID,
				ToolSetID:      assignment.ToolSetID,
				ToolName:       toolName,
				OrganizationID: organizationID,
			})
		}
	}
	return permissions
}

func (s *RoleService) replaceRoleAIToolPermissions(ctx context.Context, tx *gorm.DB, roleID string, organizationID *string, assignments []RoleAIToolAssignment) error {
	if err := tx.WithContext(ctx).Where("role_id = ?", roleID).Unscoped().Delete(&model.RoleAIToolPermission{}).Error; err != nil {
		return err
	}

	if organizationID == nil || *organizationID == "" || len(assignments) == 0 {
		return nil
	}

	records := buildRoleAIToolPermissions(roleID, *organizationID, assignments)
	if len(records) == 0 {
		return nil
	}

	return tx.WithContext(ctx).Create(&records).Error
}

// validatePermissionAssignment validates that permissions are assigned correctly based on role type
// Non-org permissions can only be assigned to global roles (OrganizationID == nil)
// Org permissions can be assigned to both global and org roles
func (s *RoleService) validatePermissionAssignment(ctx context.Context, organizationID *string, permissionIDs []string) error {
	if len(permissionIDs) == 0 {
		return nil
	}

	// Get all permissions to check their OrgPermission flag
	var permissions []model.Permission
	if err := db.Session(ctx).Where("resource_id IN ?", permissionIDs).Find(&permissions).Error; err != nil {
		return err
	}

	isGlobalRole := organizationID == nil

	// Check each permission
	for _, perm := range permissions {
		if !perm.OrgPermission {
			// Non-org permission can only be assigned to global roles
			if !isGlobalRole {
				return util.ErrorResponse{
					HTTPCode: http.StatusBadRequest,
					Code:     "E4001",
					Err:      errors.New("non-organization permissions can only be assigned to global roles"),
				}
			}
		}
		// Org permissions can be assigned to both global and org roles, no validation needed
	}

	return nil
}

// ListRoles gets the list of roles
func (s *RoleService) ListRoles(ctx context.Context, current, pageSize int, search string, organizationID *string) ([]model.Role, int64, error) {
	var roles []model.Role
	var total int64
	query := db.Session(ctx).Model(&model.Role{})

	// Filter by organization if provided
	if organizationID != nil {
		query = query.Where("organization_id = ?", *organizationID)
	} else {
		// If not filtering by org, show global roles by default
		// But we can also show all roles if needed (organizationID is nil and no filter)
		// For now, if organizationID is explicitly nil in the filter, show only global roles
		// This will be handled by the caller
	}

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
	if err := query.Offset(offset).Limit(pageSize).
		Preload("Permissions").
		Preload("AIToolPermissions").
		Preload("Organization").
		Find(&roles).Error; err != nil {
		return nil, 0, err
	}

	return roles, total, nil
}

// GetRole gets a role by ID
func (s *RoleService) GetRole(ctx context.Context, id string) (*model.Role, error) {
	var role model.Role
	if err := db.Session(ctx).
		Where(&model.Role{Base: model.Base{ResourceID: id}}).
		Preload("Permissions").
		Preload("AIToolPermissions").
		Preload("Organization").
		First(&role).Error; err != nil {
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
func (s *RoleService) CreateRole(ctx context.Context, name, description string, organizationID *string, permissionIDs []string, policyDocument model.PolicyDocument, aiAssignments []RoleAIToolAssignment) (*model.Role, error) {
	// Validate permission assignment based on role type
	if err := s.validatePermissionAssignment(ctx, organizationID, permissionIDs); err != nil {
		return nil, err
	}

	if organizationID != nil && *organizationID == "" {
		organizationID = nil
	}

	if err := s.validateAIToolAssignments(ctx, organizationID, aiAssignments); err != nil {
		return nil, err
	}

	// Check if role name already exists (within the same organization scope)
	var count int64
	query := db.Session(ctx).Model(&model.Role{}).Where("name = ?", name)
	if organizationID != nil {
		// For org roles, check uniqueness within the organization
		query = query.Where("organization_id = ?", *organizationID)
	} else {
		// For global roles, check uniqueness among global roles
		query = query.Where("organization_id IS NULL")
	}
	if err := query.Count(&count).Error; err != nil {
		return nil, err
	}
	if count > 0 {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("role name already exists in this scope"),
		}
	}

	// Organization roles cannot have policy documents
	if organizationID != nil && len(policyDocument.Statement) > 0 {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("organization roles cannot have policy documents"),
		}
	}

	// Create role
	role := model.Role{
		Name:           name,
		Description:    description,
		OrganizationID: organizationID,
		PolicyDocument: policyDocument,
	}
	if organizationID == nil {
		// Only validate policy document for global roles
		if !role.PolicyDocument.IsValid() {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusBadRequest,
				Code:     "E4001",
				Err:      errors.New("invalid policy document"),
			}
		}
	}
	if organizationID == nil && len(role.PolicyDocument.Statement) == 0 && len(permissionIDs) == 0 {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("policy document and permissions cannot both be empty for global roles"),
		}
	}
	if organizationID != nil && len(permissionIDs) == 0 {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("organization roles must have at least one permission"),
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

		if err := s.replaceRoleAIToolPermissions(ctx, tx, role.ResourceID, organizationID, aiAssignments); err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	return s.GetRole(ctx, role.ResourceID)
}

// UpdateRole updates a role
func (s *RoleService) UpdateRole(ctx context.Context, id, name, description string, organizationID *string, permissionIDs []string, policyDocument model.PolicyDocument, aiAssignments []RoleAIToolAssignment) (*model.Role, error) {
	var role model.Role
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&role).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusNotFound,
				Code:     "E4004",
				Err:      errors.New("role not found"),
			}
		}
		return nil, err
	}

	if organizationID != nil && *organizationID == "" {
		organizationID = nil
	}
	if role.OrganizationID != nil && *role.OrganizationID == "" {
		role.OrganizationID = nil
	}

	// don't change organization id
	if organizationID != nil && *organizationID == "" {
		organizationID = nil
	}

	if role.OrganizationID != nil {
		if organizationID == nil || *organizationID != *role.OrganizationID {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusBadRequest,
				Code:     "E4001",
				Err:      errors.New("cannot change organization id"),
			}
		}
	} else {
		if organizationID != nil {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusBadRequest,
				Code:     "E4001",
				Err:      errors.New("cannot change global role to organization role"),
			}
		}
	}

	if err := s.validatePermissionAssignment(ctx, organizationID, permissionIDs); err != nil {
		return nil, err
	}

	if err := s.validateAIToolAssignments(ctx, role.OrganizationID, aiAssignments); err != nil {
		return nil, err
	}

	// Check if role name already exists (if name has changed) within the same organization scope
	if name != role.Name {
		var count int64
		query := db.Session(ctx).Model(&model.Role{}).Where("name = ? AND resource_id != ?", name, id)
		if organizationID != nil {
			query = query.Where("organization_id = ?", *organizationID)
		} else {
			query = query.Where("organization_id IS NULL")
		}
		if err := query.Count(&count).Error; err != nil {
			return nil, err
		}
		if count > 0 {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusBadRequest,
				Code:     "E4001",
				Err:      errors.New("role name already exists in this scope"),
			}
		}
	}
	// Organization roles cannot have policy documents
	if organizationID != nil && len(policyDocument.Statement) > 0 {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("organization roles cannot have policy documents"),
		}
	}

	role.Name = name
	role.Description = description
	if organizationID != nil {
		role.OrganizationID = organizationID
	}
	role.PolicyDocument = policyDocument
	if organizationID == nil {
		// Only validate policy document for global roles
		if !role.PolicyDocument.IsValid() {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusBadRequest,
				Code:     "E4001",
				Err:      errors.New("invalid policy document"),
			}
		}
	}
	if organizationID == nil && len(role.PolicyDocument.Statement) == 0 && len(permissionIDs) == 0 {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("policy document and permissions cannot both be empty for global roles"),
		}
	}
	if organizationID != nil && len(permissionIDs) == 0 {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      errors.New("organization roles must have at least one permission"),
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
		if err := s.replaceRoleAIToolPermissions(ctx, tx, role.ResourceID, role.OrganizationID, aiAssignments); err != nil {
			return err
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
	if err := db.Session(ctx).Model(&model.User{}).Joins("JOIN t_user_roles ON t_user_roles.user_id = t_user.resource_id").
		Where("t_user_roles.role_id = ?", id).Count(&count).Error; err != nil {
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

	// Validate permission assignment based on role type
	if err := s.validatePermissionAssignment(ctx, role.OrganizationID, permissionIDs); err != nil {
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
