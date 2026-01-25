# Authentication & Authorization Guide

This guide covers the authentication and authorization system in EZ-Console.

## Overview

EZ-Console implements a comprehensive auth system with:

- **Authentication**: JWT-based with session management
- **Authorization**: Role-Based Access Control (RBAC) with policy documents
- **Multi-tenancy**: Organization-scoped permissions
- **Service Accounts**: API access with access keys
- **External Auth**: OAuth2/OIDC and LDAP integration

## Authentication

### JWT Token-Based Authentication

#### How It Works

1. User logs in with credentials
2. Server validates credentials and generates JWT token
3. Token is returned to client
4. Client includes token in subsequent requests
5. Server validates token and extracts user information

#### Token Structure

```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john.doe",
  "exp": 1735689600,
  "iat": 1735603200,
  "iss": "login"
}
```

### Using Authentication in Controllers

All routes under `/api` require authentication by default:

```go
func (c *ProductController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	// All these routes require authentication
	products := router.Group("/products")
	{
		products.GET("", c.ListProducts)
		products.POST("", c.CreateProduct)
	}
}
```

### Public Routes

To create public routes (no authentication required):

```go
import (
	"context"
	"github.com/sven-victor/ez-console/pkg/middleware"
)

func (c *ProductController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	// Public routes
	public := middleware.WithoutAuthentication(router.Group("/products"))
	{
		public.GET("", c.ListProducts)
		public.GET("/:id", c.GetProduct)
	}
	
	// Protected routes
	protected := router.Group("/products")
	{
		protected.POST("", c.CreateProduct)
		protected.PUT("/:id", c.UpdateProduct)
	}
}
```

### Accessing User Information

```go
func (c *ProductController) GetMyProducts(ctx *gin.Context) {
	// Get user ID
	userID, exists := ctx.Get("user_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4011", "Unauthorized"))
		return
	}
	
	// Get full user object
	userInterface, _ := ctx.Get("user")
	user := userInterface.(model.User)
	
	// Use user information
	products, err := c.service.GetProductsByUser(ctx, userID.(string))
	// ...
}
```

### Service Account Authentication

Service accounts use HTTP Basic Auth with access keys:

```bash
# Create a service account and get access key/secret
# Use them for API access
curl -u "ACCESS_KEY_ID:SECRET_ACCESS_KEY" \
  http://localhost:8080/api/products
```

## Authorization

### Role-Based Access Control (RBAC)

#### Permission System

Permissions are defined in a hierarchical structure:

```
Permission Groups
├── Product Management
│   ├── product:list    (View products)
│   ├── product:create  (Create products)
│   ├── product:update  (Update products)
│   └── product:delete  (Delete products)
├── User Management
│   ├── user:list
│   ├── user:create
│   ├── user:update
│   └── user:delete
└── System Settings
    ├── setting:view
    └── setting:update
```

### Defining Permissions

```go
package controller

import (
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
)

func init() {
	// Register permissions
	middleware.RegisterPermission("Product Management", "Manage products", []model.Permission{
		{
			Code:             "product:list",
			Name:             "List Products",
			Description:      "View product list",
			DefaultRoleNames: []string{"operator", "viewer"},
		},
		{
			Code:             "product:create",
			Name:             "Create Product",
			Description:      "Create new products",
			DefaultRoleNames: []string{"operator"},
		},
		{
			Code:             "product:update",
			Name:             "Update Product",
			Description:      "Update existing products",
			DefaultRoleNames: []string{"operator"},
		},
		{
			Code:        "product:delete",
			Name:        "Delete Product",
			Description: "Delete products",
		},
	})
}
```

**Permission attributes:**

- **Code**, **Name**, **Description**: Required. **OrgPermission**: `true` if the permission is organization-scoped.
- **DefaultRoleNames**: Optional list of role names. On startup, each such permission is automatically assigned to those roles. If the role does not exist, it is created (as a system role). For **OrgPermission** permissions, assignment applies to both global roles and organization-scoped roles (one per organization); otherwise only global roles are used. Omit or leave empty for admin-only permissions.

### Requiring Permissions

```go
import (
	"context"
	"github.com/sven-victor/ez-console/pkg/middleware"
)

func (c *ProductController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	products := router.Group("/products")
	{
		// Anyone authenticated can list
		products.GET("", c.ListProducts)
		
		// Require specific permissions
		products.POST("", 
			middleware.RequirePermission("product:create"), 
			c.CreateProduct)
		products.PUT("/:id", 
			middleware.RequirePermission("product:update"), 
			c.UpdateProduct)
		products.DELETE("/:id", 
			middleware.RequirePermission("product:delete"), 
			c.DeleteProduct)
	}
}
```

### Checking Permissions Programmatically

```go
func (c *ProductController) ComplexOperation(ctx *gin.Context) {
	rolesInterface, _ := ctx.Get("roles")
	roles := rolesInterface.([]model.Role)
	
	hasPermission := false
	for _, role := range roles {
		if role.HasPermission("product:update") {
			hasPermission = true
			break
		}
	}
	
	if !hasPermission {
		util.RespondWithError(ctx, util.NewErrorMessage("E4031", "Permission denied"))
		return
	}
	
	// Proceed with operation
}
```

### Role Types (system vs user)

Roles have a **role_type** attribute:

- **`system`**: Created by seed data or by default-role assignment on startup. System roles cannot be modified, deleted, or have their permissions or policy changed via the API. Built-in global roles `admin`, `operator`, and `viewer` are system roles. Any role auto-created because of **DefaultRoleNames** (when it did not exist) is also a system role.
- **`user`**: Created by users through the role API. User roles can be fully managed (update, delete, assign permissions, set policy).

The API returns `role_type` in role responses. Update, delete, permission assignment, and policy updates for system roles return an error (e.g. `"system roles cannot be modified"` or `"system roles cannot be deleted"`).

### Admin Role

The built-in `admin` role has all permissions automatically:

```go
func (c *ProductController) AdminOnly(ctx *gin.Context) {
	rolesInterface, _ := ctx.Get("roles")
	roles := rolesInterface.([]model.Role)
	
	isAdmin := false
	for _, role := range roles {
		if role.Name == "admin" {
			isAdmin = true
			break
		}
	}
	
	if !isAdmin {
		util.RespondWithError(ctx, util.NewErrorMessage("E4031", "Admin access required"))
		return
	}
	
	// Admin-only operation
}
```

## Policy-Based Authorization

For more complex authorization scenarios, use policy documents:

### Policy Document Structure

```json
{
  "Version": "2023-01-01",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["product:*"],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "product.category": "electronics"
        }
      }
    },
    {
      "Effect": "Deny",
      "Action": ["product:delete"],
      "Resource": "*"
    }
  ]
}
```

### Using Policies

Policies are evaluated automatically when using `RequirePermission` middleware. The system:

1. Checks policy document first
2. Falls back to role permissions if no policy match
3. Denies access if neither grants permission

### Custom Policy Conditions

You can define custom conditions:

```go
context := map[string]interface{}{
	"http.path":   ctx.Request.URL.Path,
	"http.method": ctx.Request.Method,
	"http.ip":     ctx.ClientIP(),
	"product.category": product.Category,
	"product.price": product.Price,
}

for _, role := range roles {
	if isMatch, isAllow := role.HasPolicyPermission("product:update", product.ResourceID, context); isMatch {
		if isAllow {
			// Allow operation
		} else {
			// Deny operation
		}
	}
}
```

## Multi-Tenancy (Organization-Scoped Permissions)

### Defining Organization-Scoped Permissions

```go
middleware.RegisterPermission("Product Management", "Manage products", []model.Permission{
	{
		Code:             "product:list",
		Name:             "List Products",
		Description:      "View product list",
		OrgPermission:    true,  // Organization-scoped permission
		DefaultRoleNames: []string{"operator", "viewer"},
	},
})
```

When **OrgPermission** is `true` and **DefaultRoleNames** is set, the permission is assigned on startup to both the global roles with those names and to organization-scoped roles with the same names (one per organization). Roles are created automatically if they do not exist.

**Organization creation:** When a new organization is created via the API, the system automatically creates the same default org-scoped roles (e.g. `operator`, `viewer`) for that organization and assigns the corresponding org-scoped permissions. This keeps every organization consistent with the default org and the startup behavior.

### Using Organization Context

```go
func (c *ProductController) ListOrgProducts(ctx *gin.Context) {
	// Get organization ID from header
	orgID, exists := ctx.Get("organization_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Organization ID required"))
		return
	}
	
	// Query products in this organization
	products, err := c.service.GetProductsByOrganization(ctx, orgID.(string))
	// ...
}
```

### Setting Organization Context

Clients should include organization ID in header:

```bash
curl -H "Authorization: Bearer $TOKEN" \
     -H "X-Scope-OrgID: org-uuid" \
     http://localhost:8080/api/products
```

## Frontend Authorization

### Permission Guard Component

```typescript
import { PermissionGuard } from 'ez-console';

<PermissionGuard permission="product:create">
  <Button type="primary" onClick={handleCreate}>
    Create Product
  </Button>
</PermissionGuard>
```

### Permission Hook

```typescript
import { usePermission } from 'ez-console';

const ProductList: React.FC = () => {
  const canCreate = usePermission('product:create');
  const canDelete = usePermission('product:delete');
  
  return (
    <div>
      {canCreate && (
        <Button onClick={handleCreate}>Create</Button>
      )}
      {canDelete && (
        <Button onClick={handleDelete}>Delete</Button>
      )}
    </div>
  );
};
```

### Auth Context

```typescript
import { useAuth } from 'ez-console';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.full_name}!</h1>
      <p>Email: {user?.email}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
```

## Session Management

### Session Configuration

Configure session behavior through system settings:

- **Session Timeout**: Maximum session lifetime
- **Idle Timeout**: Maximum idle time before session expires
- **Concurrent Sessions**: Maximum number of concurrent sessions per user

### Manual Session Management

```go
func (s *SessionService) InvalidateSession(ctx context.Context, sessionID string) error {
	return db.Session(ctx).
		Model(&model.Session{}).
		Where("resource_id = ?", sessionID).
		Update("is_valid", false).Error
}

func (s *SessionService) InvalidateAllUserSessions(ctx context.Context, userID string) error {
	return db.Session(ctx).
		Model(&model.Session{}).
		Where("user_id = ?", userID).
		Update("is_valid", false).Error
}
```

## External Authentication

### OAuth2/OIDC Integration

Configure OAuth providers in `config.yml`:

```yaml
oauth:
  enabled: true
  providers:
    - name: "google"
      display_name: "Google"
      client_id: "your-client-id"
      client_secret: "your-client-secret"
      token_url: "https://oauth2.googleapis.com/token"
      auth_url: "https://accounts.google.com/o/oauth2/v2/auth"
      user_info_url: "https://www.googleapis.com/oauth2/v2/userinfo"
      redirect_url: "http://localhost:5173/login?provider=google"
      role_field: "role"
```

### LDAP/Active Directory

Configure LDAP through system settings UI or config file:

```yaml
ldap:
  enabled: true
  host: "ldap.example.com"
  port: 389
  bind_dn: "cn=admin,dc=example,dc=com"
  bind_password: "password"
  base_dn: "ou=users,dc=example,dc=com"
  user_filter: "(uid=%s)"
  attr_username: "uid"
  attr_email: "mail"
  attr_display_name: "displayName"
```

## Security Best Practices

### Password Policies

Configure through system settings:

- Minimum password length (default: 8)
- Password complexity requirements
- Password expiration (default: 90 days)
- Password history (prevent reuse)
- Account lockout after failed attempts

### Multi-Factor Authentication (MFA)

Enable MFA through system settings:

```go
// MFA can be enforced globally or per-user
// Supports TOTP (Google Authenticator, Authy) and Email-based MFA
```

### API Rate Limiting

```go
import (
	"context"
	"github.com/sven-victor/ez-console/pkg/middleware"
)

func (c *APIController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	// Apply rate limiting
	limited := router.Group("/api")
	limited.Use(middleware.RateLimitMiddleware(100, time.Minute)) // 100 requests per minute
	{
		limited.GET("/products", c.ListProducts)
	}
}
```

### Audit Logging

All authentication and authorization events are logged:

```go
// Using Service.StartAudit
err := svc.StartAudit(ctx, resourceID, func(auditLog *model.AuditLog) error {
	// Perform operation
	product, err := c.service.CreateProduct(ctx, data)
	if err != nil {
		return err
	}
	
	// Set audit details
	auditLog.ResourceID = product.ResourceID
	auditLog.ResourceType = "product"
	auditLog.Action = "create"
	auditLog.Details = map[string]interface{}{
		"name": product.Name,
	}
	
	return nil
})
```

## Common Patterns

### Resource Ownership

```go
func (c *ProductController) UpdateProduct(ctx *gin.Context) {
	id := ctx.Param("id")
	userID, _ := ctx.Get("user_id")
	
	// Get product
	product, err := c.service.GetProduct(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4041", "Product not found"))
		return
	}
	
	// Check ownership
	if product.OwnerID != userID.(string) {
		util.RespondWithError(ctx, util.NewErrorMessage("E4031", "You can only update your own products"))
		return
	}
	
	// Proceed with update
}
```

### Hierarchical Permissions

```go
// Define permission hierarchy
const (
	PermissionProductView   = "product:view"
	PermissionProductCreate = "product:create"
	PermissionProductUpdate = "product:update"
	PermissionProductDelete = "product:delete"
	PermissionProductAdmin  = "product:*"  // All product permissions
)

func hasPermission(roles []model.Role, required string) bool {
	for _, role := range roles {
		// Admin role has all permissions
		if role.Name == "admin" {
			return true
		}
		
		// Check for exact permission
		if role.HasPermission(required) {
			return true
		}
		
		// Check for wildcard permission
		if strings.HasSuffix(required, ":*") {
			prefix := strings.TrimSuffix(required, ":*")
			if role.HasPermission(prefix + ":*") {
				return true
			}
		}
	}
	return false
}
```

## Troubleshooting

### Token Expired

```go
// Error: E4011 - Token expired
// Solution: Refresh token or re-authenticate
```

### Permission Denied

```go
// Error: E4031 - No permission to perform this operation
// Solution: Check user roles and permissions
```

### Session Expired

```go
// Error: E4011 - Session expired, please login again
// Solution: Re-authenticate
```

## Next Steps

- Learn about [Middleware](./08-middleware.md)
- Explore [API Best Practices](./09-api-best-practices.md)
- Review [Backend Development](./03-backend-development.md)



