# Backend Development Guide

This guide covers building backend APIs with EZ-Console using Go and Gin framework.

## Architecture Overview

EZ-Console follows a layered architecture:

```
HTTP Request
    ↓
Middleware (Auth, CORS, Logging)
    ↓
Controller (Request Handling)
    ↓
Service (Business Logic)
    ↓
Model/Repository (Data Access)
    ↓
Database
```

## Controller Registration

EZ-Console provides two ways to register controllers: `server.RegisterControllers` and `api.AddControllers`. Understanding these methods is crucial for extending the framework.

### server.RegisterControllers

`server.RegisterControllers` is the recommended way for users to register custom controllers. It provides a clean interface for adding controllers to your application.

**Function Signature:**
```go
func RegisterControllers(controller ...ControllerGenerator)
```

**Type Definitions:**
```go
type Controller interface {
    RegisterRoutes(ctx context.Context, router *gin.RouterGroup)
}

type ControllerGenerator func(ctx context.Context, svc Service) Controller
```

**Usage Example:**
```go
package controller

import (
    "context"
    "github.com/gin-gonic/gin"
    "github.com/sven-victor/ez-console/server"
)

type ProductController struct {
    service *service.ProductService
}

func NewProductController() *ProductController {
    return &ProductController{
        service: service.NewProductService(),
    }
}

func (c *ProductController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
    products := router.Group("/products")
    {
        products.GET("", c.ListProducts)
        products.POST("", c.CreateProduct)
    }
}

// Register the controller in init() function
func init() {
    server.RegisterControllers(func(ctx context.Context, svc server.Service) server.Controller {
        return NewProductController()
    })
}
```

**Key Points:**
- Call `server.RegisterControllers` in the `init()` function
- The function accepts a `ControllerGenerator` that receives `context.Context` and a `server.Service` interface
- The generator function returns a `server.Controller` interface
- The `RegisterRoutes` method must accept `context.Context` as the first parameter
- Multiple controllers can be registered in a single call
- The controller will be automatically instantiated when the server starts

### api.AddControllers

`api.AddControllers` is an internal API used by the framework to manage controller registration. It's wrapped by `server.RegisterControllers` and generally should not be used directly unless you're extending the framework itself.

**Function Signature:**
```go
func AddControllers(controller ...ControllerGenerator)
```

**Type Definitions:**
```go
type Controller interface {
    RegisterRoutes(ctx context.Context, router *gin.RouterGroup)
}

type ControllerGenerator func(ctx context.Context, svc *service.Service) Controller
```

**Difference from server.RegisterControllers:**
- `api.AddControllers` accepts `func(ctx context.Context, svc *service.Service)` (concrete type)
- `server.RegisterControllers` accepts `func(ctx context.Context, svc server.Service)` (interface type)
- `server.RegisterControllers` internally calls `api.AddControllers` and handles type conversion

**Internal Implementation:**
```go
// In server/api.go
func RegisterControllers(controller ...ControllerGenerator) {
    for _, c := range controller {
        api.AddControllers(func(ctx context.Context, svc *service.Service) api.Controller {
            return c(ctx, svc)
        })
    }
}
```

### When to Use Which

| Use Case | Recommended Method | Reason |
|----------|-------------------|---------|
| Custom user controllers | `server.RegisterControllers` | Clean interface, works with `server.Service` interface |
| Framework internal controllers | `api.AddControllers` | Direct access to concrete service implementation |
| Extending framework | `api.AddControllers` | More flexibility for framework development |

### server.Service Interface

The `server.Service` interface provides access to core framework services. When you register a controller using `server.RegisterControllers`, your controller generator receives this interface.

**Available Services:**

#### LDAP Service
```go
GetLDAPSession(ctx context.Context) (clientsldap.Conn, error)
GetLDAPSettings(ctx context.Context) (clientsldap.Options, error)
TestLDAPConnection(ctx context.Context, ldapSettings clientsldap.Options, username, password string) (*model.LDAPTestResponse, error)
```

#### Audit Service
```go
StartAudit(ctx *gin.Context, resourceID string, handleFunc func(auditLog *model.AuditLog) error, withOptions ...service.WithStartAuditOptions) error
```

#### Settings Service
```go
GetSettingsMap(ctx context.Context) (map[string]string, error)
GetStringSetting(ctx context.Context, key model.SettingKey, defaultValue string) (string, error)
GetBoolSetting(ctx context.Context, key model.SettingKey, defaultValue bool) (bool, error)
GetIntSetting(ctx context.Context, key model.SettingKey, defaultValue int) (int, error)
GetSettingByStringKey(ctx context.Context, key string) (*model.Setting, error)
GetAllSettings(ctx context.Context) ([]model.Setting, error)
UpdateSetting(ctx context.Context, key model.SettingKey, value, comment string) (*model.Setting, error)
UpdateSettings(ctx context.Context, settings map[string]string) error
DeleteSetting(ctx context.Context, key model.SettingKey) error
GetSMTPSettings(ctx context.Context) (*model.SMTPSettings, error)
```

#### Cache Service
```go
CreateCache(ctx context.Context, key, value string, expiredAt time.Time) (*model.TempData, error)
DeleteCache(ctx context.Context, key string) error
GetCache(ctx context.Context, key string) (*model.TempData, error)
```

#### Authorization Service
```go
ResetPassword(ctx context.Context, userID string, newPassword string) (bool, error)
RestoreUser(ctx context.Context, userID string) error
GetLdapUsers(ctx context.Context, skipExisting bool) ([]model.User, error)
RegisterUserChangeHook(hook service.UserChangeHook)
RegisterUserRoleChangeHook(hook service.UserRoleChangeHook)
FilterLDAPEntries(ctx context.Context, baseDN string, filter string, attributes []string) ([]*ldap.Entry, error)
GetLDAPEntry(ctx context.Context, baseDN string, attributes []string) (*ldap.Entry, error)
```

#### Service Account Management
```go
CreateServiceAccount(ctx context.Context, serviceAccount *model.ServiceAccount) error
GetServiceAccountByID(ctx context.Context, id string) (*model.ServiceAccount, error)
UpdateServiceAccount(ctx context.Context, id string, serviceAccount *model.ServiceAccount) error
DeleteServiceAccount(ctx context.Context, id string) error
UpdateServiceAccountStatus(ctx context.Context, id, status string) error
GetServiceAccountList(ctx context.Context, page, pageSize int, search string) ([]model.ServiceAccount, int64, error)
GetServiceAccountAccessKeys(ctx context.Context, serviceAccountID string) ([]model.ServiceAccountAccessKey, error)
CreateServiceAccountAccessKey(ctx context.Context, serviceAccountID, name, description string, expiresAt *time.Time) (*model.ServiceAccountAccessKey, string, error)
DeleteServiceAccountAccessKey(ctx context.Context, serviceAccountID, keyID string) error
GetServiceAccountRoles(ctx context.Context, serviceAccountID string) ([]model.Role, error)
AssignServiceAccountRoles(ctx context.Context, serviceAccountID string, roleIDs []string) error
GetServiceAccountPolicy(ctx context.Context, serviceAccountID string) (model.PolicyDocument, error)
SetServiceAccountPolicy(ctx context.Context, serviceAccountID string, policyDoc model.PolicyDocument) error
```

#### Email Service
```go
SendEmail(ctx context.Context, smtpSettings *model.SMTPSettings, to []string, subject, body string) error
```

#### GeoIP Service
```go
GetLocation(ctx context.Context, ip string, language string) (string, error)
MustGetLocation(ctx context.Context, ip string, language string) string
```

### Using server.Service in Controllers

**Example: Controller Using Framework Services**

```go
package controller

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/sven-victor/ez-console/server"
    "github.com/sven-victor/ez-console/pkg/util"
    "github.com/sven-victor/ez-console/pkg/model"
)

type OrderController struct {
    svc         server.Service
    orderService *service.OrderService
}

func NewOrderController(svc server.Service) *OrderController {
    return &OrderController{
        svc:         svc,
        orderService: service.NewOrderService(),
    }
}

func (c *OrderController) CreateOrder(ctx *gin.Context) {
    var req CreateOrderRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request", err))
        return
    }

    // Use audit service from server.Service
    var order *model.Order
    err := c.svc.StartAudit(ctx, "", func(auditLog *model.AuditLog) error {
        var err error
        order, err = c.orderService.CreateOrder(ctx.Request.Context(), req)
        if err != nil {
            return err
        }
        
        auditLog.ResourceType = "order"
        auditLog.Action = "create"
        auditLog.Details = map[string]interface{}{
            "resource_id": order.ResourceID,
            "total_amount": order.TotalAmount,
            "items_count": len(order.Items),
        }
        return nil
    })

    if err != nil {
        util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to create order", err))
        return
    }

    util.RespondWithSuccess(ctx, http.StatusCreated, order)
}

func (c *OrderController) GetSettings(ctx *gin.Context) {
    // Use settings service
    settings, err := c.svc.GetSettingsMap(ctx.Request.Context())
    if err != nil {
        util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get settings", err))
        return
    }

    util.RespondWithSuccess(ctx, http.StatusOK, settings)
}

func (c *OrderController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
    orders := router.Group("/orders")
    {
        orders.POST("", c.CreateOrder)
        orders.GET("/settings", c.GetSettings)
    }
}

// Register with server.Service
func init() {
    server.RegisterControllers(func(ctx context.Context, svc server.Service) server.Controller {
        return NewOrderController(svc)
    })
}
```

**Example: Using Cache Service**

```go
import (
    "time"
    "github.com/gin-gonic/gin"
    "github.com/sven-victor/ez-console/server"
    "github.com/sven-victor/ez-console/pkg/util"
)

func (c *ProductController) GetProductWithCache(ctx *gin.Context) {
    id := ctx.Param("id")
    cacheKey := "product:" + id

    // Try to get from cache first
    cached, err := c.svc.GetCache(ctx.Request.Context(), cacheKey)
    if err == nil && cached != nil {
        util.RespondWithSuccess(ctx, http.StatusOK, cached.Value)
        return
    }

    // Get from database
    product, err := c.productService.GetProduct(ctx.Request.Context(), id)
    if err != nil {
        util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get product", err))
        return
    }

    // Store in cache (expires in 1 hour)
    expiredAt := time.Now().Add(1 * time.Hour)
    c.svc.CreateCache(ctx.Request.Context(), cacheKey, product.ToJSON(), expiredAt)

    util.RespondWithSuccess(ctx, http.StatusOK, product)
}
```

## Creating a Controller

Controllers handle HTTP requests and coordinate between the HTTP layer and business logic layer.

### Basic Controller Structure

```go
package controller

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/server"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/yourusername/yourapp/service"
)

// ProductController handles product-related requests
type ProductController struct {
	service *service.ProductService
}

// NewProductController creates a new product controller
func NewProductController() *ProductController {
	return &ProductController{
		service: service.NewProductService(),
	}
}

// RegisterRoutes registers all routes for this controller
func (c *ProductController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	products := router.Group("/products")
	{
		products.GET("", c.ListProducts)
		products.GET("/:id", c.GetProduct)
		products.POST("", c.CreateProduct)
		products.PUT("/:id", c.UpdateProduct)
		products.DELETE("/:id", c.DeleteProduct)
	}
}

// Register controller with framework
func init() {
	server.RegisterControllers(func(ctx context.Context, svc server.Service) server.Controller {
		return NewProductController()
	})
}
```

### Controller Methods

#### GET Request - Single Item

```go
// GetProduct retrieves a single product by ID
func (c *ProductController) GetProduct(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Product ID is required"))
		return
	}

	product, err := c.service.GetProduct(ctx.Request.Context(), id)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get product", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, product)
}
```

#### GET Request - List with Pagination

```go
// ListProductsRequest defines query parameters for listing products
type ListProductsRequest struct {
	Current  int    `form:"current" binding:"required,min=1"`
	PageSize int    `form:"page_size" binding:"required,min=1,max=100"`
	Search   string `form:"search"`
	Category string `form:"category"`
	Status   string `form:"status"`
}

// ListProducts retrieves a paginated list of products
func (c *ProductController) ListProducts(ctx *gin.Context) {
	var req ListProductsRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid query parameters", err))
		return
	}

	products, total, err := c.service.ListProducts(ctx.Request.Context(), req.Search, req.Category, req.Status, req.Current, req.PageSize)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to list products", err))
		return
	}

	util.RespondWithSuccessList(ctx, http.StatusOK, products, total, req.Current, req.PageSize)
}
```

#### POST Request - Create

```go
// CreateProductRequest defines the request body for creating a product
type CreateProductRequest struct {
	Name        string  `json:"name" binding:"required,min=1,max=100"`
	Description string  `json:"description" binding:"max=500"`
	Price       float64 `json:"price" binding:"required,min=0"`
	Category    string  `json:"category" binding:"required"`
	Stock       int     `json:"stock" binding:"min=0"`
}

// CreateProduct creates a new product
func (c *ProductController) CreateProduct(ctx *gin.Context) {
	var req CreateProductRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request body", err))
		return
	}

	product, err := c.service.CreateProduct(ctx.Request.Context(), req.Name, req.Description, req.Price, req.Category, req.Stock)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to create product", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusCreated, product)
}
```

#### PUT Request - Update

```go
// UpdateProductRequest defines the request body for updating a product
type UpdateProductRequest struct {
	Name        *string  `json:"name" binding:"omitempty,min=1,max=100"`
	Description *string  `json:"description" binding:"omitempty,max=500"`
	Price       *float64 `json:"price" binding:"omitempty,min=0"`
	Category    *string  `json:"category"`
	Stock       *int     `json:"stock" binding:"omitempty,min=0"`
}

// UpdateProduct updates an existing product
func (c *ProductController) UpdateProduct(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Product ID is required"))
		return
	}

	var req UpdateProductRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request body", err))
		return
	}

	product, err := c.service.UpdateProduct(ctx.Request.Context(), id, req)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to update product", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, product)
}
```

#### DELETE Request

```go
// DeleteProduct deletes a product by ID
func (c *ProductController) DeleteProduct(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Product ID is required"))
		return
	}

	if err := c.service.DeleteProduct(ctx.Request.Context(), id); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to delete product", err))
		return
	}

	util.RespondWithMessage(ctx, "Product deleted successfully")
}
```

## Creating a Service

Services contain business logic and orchestrate data operations.

### Basic Service Structure

```go
package service

import (
	"context"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/yourusername/yourapp/model"
)

// ProductService handles product business logic
type ProductService struct{}

// NewProductService creates a new product service
func NewProductService() *ProductService {
	return &ProductService{}
}
```

### Service Methods

#### Create Operation

```go
// CreateProduct creates a new product
func (s *ProductService) CreateProduct(ctx context.Context, name, description string, price float64, category string, stock int) (*model.Product, error) {
	product := &model.Product{
		Name:        name,
		Description: description,
		Price:       price,
		Category:    category,
		Stock:       stock,
		Status:      "active",
	}

	if err := db.Session(ctx).Create(product).Error; err != nil {
		return nil, err
	}

	return product, nil
}
```

#### Read Operation

```go
// GetProduct retrieves a product by ID
func (s *ProductService) GetProduct(ctx context.Context, id string) (*model.Product, error) {
	var product model.Product
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&product).Error; err != nil {
		return nil, err
	}
	return &product, nil
}
```

#### List Operation with Filtering

```go
// ListProducts retrieves a paginated list of products
func (s *ProductService) ListProducts(ctx context.Context, search, category, status string, page, pageSize int) ([]*model.Product, int64, error) {
	var products []*model.Product
	var total int64

	query := db.Session(ctx).Model(&model.Product{})

	// Apply filters
	if search != "" {
		query = query.Where("name LIKE ? OR description LIKE ?", "%"+search+"%", "%"+search+"%")
	}
	if category != "" {
		query = query.Where("category = ?", category)
	}
	if status != "" {
		query = query.Where("status = ?", status)
	}

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Get paginated results
	offset := (page - 1) * pageSize
	if err := query.Offset(offset).Limit(pageSize).Order("created_at DESC").Find(&products).Error; err != nil {
		return nil, 0, err
	}

	return products, total, nil
}
```

#### Update Operation

```go
// UpdateProduct updates an existing product
func (s *ProductService) UpdateProduct(ctx context.Context, id string, updates map[string]interface{}) (*model.Product, error) {
	var product model.Product
	
	// Find the product
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&product).Error; err != nil {
		return nil, err
	}

	// Update fields
	if err := db.Session(ctx).Model(&product).Updates(updates).Error; err != nil {
		return nil, err
	}

	// Reload to get updated data
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&product).Error; err != nil {
		return nil, err
	}

	return &product, nil
}
```

#### Delete Operation (Soft Delete)

```go
import (
	"context"
	"errors"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
)

// DeleteProduct soft-deletes a product
func (s *ProductService) DeleteProduct(ctx context.Context, id string) error {
	// First check if the product exists
	var product model.Product
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&product).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("product not found")
		}
		return err
	}
	
	// Perform soft delete
	if err := db.Session(ctx).Where("resource_id = ?", id).Delete(&model.Product{}).Error; err != nil {
		return err
	}
	
	return nil
}
```

## Response Formats

### Success Response - Single Item

```go
util.RespondWithSuccess(ctx, http.StatusOK, product)
```

Response:
```json
{
  "code": "0",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Product Name",
    "price": 99.99
  }
}
```

### Success Response - List

```go
util.RespondWithSuccessList(ctx, http.StatusOK, products, total, page, pageSize)
```

Response:
```json
{
  "code": "0",
  "data": [
    {"id": "...", "name": "Product 1"},
    {"id": "...", "name": "Product 2"}
  ],
  "total": 100,
  "current": 1,
  "page_size": 10
}
```

### Error Response

```go
util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid input"))
```

Response:
```json
{
  "code": "E4001",
  "err": "Invalid input"
}
```

## Error Codes

Follow this pattern for error codes:

- `E4xxx`: Client errors (400-499)
  - `E4001`: Bad Request (400)
  - `E4011`: Unauthorized (401)
  - `E4031`: Forbidden (403)
  - `E4041`: Not Found (404)
  
- `E5xxx`: Server errors (500-599)
  - `E5001`: Internal Server Error (500)
  - `E5031`: Service Unavailable (503)

## Request Validation

### Using Gin Binding

```go
type CreateUserRequest struct {
	Username string `json:"username" binding:"required,min=3,max=50,alphanum"`
	Email    string `json:"email" binding:"required,email"`
	Age      int    `json:"age" binding:"omitempty,min=1,max=150"`
	Role     string `json:"role" binding:"required,oneof=admin user guest"`
}

func (c *UserController) CreateUser(ctx *gin.Context) {
	var req CreateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request", err))
		return
	}
	// Process request...
}
```

### Custom Validation

```go
func (c *ProductController) CreateProduct(ctx *gin.Context) {
	var req CreateProductRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request", err))
		return
	}

	// Custom validation
	if req.Price < 0 {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Price cannot be negative"))
		return
	}
	
	if req.Stock < 0 {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Stock cannot be negative"))
		return
	}

	// Process request...
}
```

## Using Middleware

### Require Authentication

```go
func (c *ProductController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	// All routes require authentication by default
	products := router.Group("/products")
	{
		products.GET("", c.ListProducts)
		products.POST("", c.CreateProduct)
	}
}
```

### Require Specific Permission

```go
import "github.com/sven-victor/ez-console/pkg/middleware"

func (c *ProductController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	products := router.Group("/products")
	{
		products.GET("", c.ListProducts)
		products.POST("", middleware.RequirePermission("product:create"), c.CreateProduct)
		products.PUT("/:id", middleware.RequirePermission("product:update"), c.UpdateProduct)
		products.DELETE("/:id", middleware.RequirePermission("product:delete"), c.DeleteProduct)
	}
}
```

### Public Routes (No Authentication)

```go
import "github.com/sven-victor/ez-console/pkg/middleware"

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
		protected.POST("", middleware.RequirePermission("product:create"), c.CreateProduct)
		protected.PUT("/:id", middleware.RequirePermission("product:update"), c.UpdateProduct)
	}
}
```

## Accessing User Information

### Get Current User

```go
func (c *ProductController) GetMyProducts(ctx *gin.Context) {
	// Get user ID from context
	userID, exists := ctx.Get("user_id")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4011", "Unauthorized"))
		return
	}

	// Get full user object
	userInterface, _ := ctx.Get("user")
	user := userInterface.(model.User)

	products, err := c.service.GetProductsByUser(ctx.Request.Context(), userID.(string))
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get products", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, products)
}
```

### Get User Roles

```go
func (c *ProductController) AdminOnly(ctx *gin.Context) {
	rolesInterface, exists := ctx.Get("roles")
	if !exists {
		util.RespondWithError(ctx, util.NewErrorMessage("E4011", "Unauthorized"))
		return
	}

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

	// Process admin request...
}
```

## Transaction Management

```go
import (
	"context"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
)

func (s *ProductService) CreateOrderWithProducts(ctx context.Context, orderData OrderData) error {
	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		// Create order
		order := &model.Order{
			CustomerID: orderData.CustomerID,
			TotalAmount: orderData.TotalAmount,
		}
		if err := tx.Create(order).Error; err != nil {
			return err
		}

		// Create order items
		for _, item := range orderData.Items {
			orderItem := &model.OrderItem{
				OrderID:   order.ResourceID,
				ProductID: item.ProductID,
				Quantity:  item.Quantity,
				Price:     item.Price,
			}
			if err := tx.Create(orderItem).Error; err != nil {
				return err
			}

			// Update product stock
			if err := tx.Model(&model.Product{}).
				Where("resource_id = ?", item.ProductID).
				Update("stock", gorm.Expr("stock - ?", item.Quantity)).Error; err != nil {
				return err
			}
		}

		return nil
	})
}
```

## Audit Logging

EZ-Console provides built-in audit logging:

```go
func (c *ProductController) CreateProduct(ctx *gin.Context) {
	var req CreateProductRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request", err))
		return
	}

	// Using Service.StartAudit for automatic audit logging
	// Note: In a real controller, you should have access to svc through the controller struct
	var product *model.Product
	
	err := c.svc.StartAudit(ctx, "", func(auditLog *model.AuditLog) error {
		var err error
		product, err = c.service.CreateProduct(ctx.Request.Context(), req.Name, req.Description, req.Price, req.Category, req.Stock)
		if err != nil {
			return err
		}
		
		// Set audit log details
		auditLog.ResourceType = "product"
		auditLog.Action = "create"
		auditLog.Details = map[string]interface{}{
			"resource_id": product.ResourceID,
			"name": product.Name,
			"price": product.Price,
		}
		
		return nil
	})

	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to create product", err))
		return
	}

	util.RespondWithSuccess(ctx, http.StatusCreated, product)
}
```

## Best Practices

1. **Use server.RegisterControllers**: Always use `server.RegisterControllers` in your custom controllers, not `api.AddControllers`
2. **Register in init()**: Register controllers in the `init()` function for automatic loading
3. **Leverage server.Service**: Use the `server.Service` interface to access framework services (audit, cache, settings, etc.)
4. **Keep Controllers Thin**: Controllers should only handle HTTP concerns
5. **Business Logic in Services**: All business logic goes in the service layer
6. **Consistent Error Handling**: Use utility functions for errors
7. **Validate Early**: Validate input at the controller level
8. **Use Transactions**: Wrap related database operations in transactions
9. **Log Important Operations**: Use audit logging via `server.Service.StartAudit()` for critical actions
10. **Return Proper HTTP Codes**: 200 for success, 201 for created, 4xx for client errors, 5xx for server errors
11. **Pagination for Lists**: Always paginate list endpoints
12. **Resource IDs**: Use UUID-based resource IDs, not auto-increment IDs
13. **Soft Deletes**: Use soft deletes instead of hard deletes

## Next Steps

- Learn about [Database & Models](./06-database-models.md)
- Explore [Authentication & Authorization](./07-auth-system.md)
- Review [Middleware](./08-middleware.md)
- Check [API Best Practices](./09-api-best-practices.md)

