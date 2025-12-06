# Database & Models Guide

This guide covers working with databases and defining data models in EZ-Console using GORM.

## Model Structure

### Base Model

All models should embed the `Base` struct:

```go
package model

import (
	"time"
	"gorm.io/gorm"
	"github.com/sven-victor/ez-console/pkg/model"
)

// Product represents a product in the system
type Product struct {
	model.Base
	Name        string  `gorm:"size:100;not null" json:"name"`
	Description string  `gorm:"size:500" json:"description"`
	Price       float64 `gorm:"type:decimal(10,2);not null" json:"price"`
	Category    string  `gorm:"size:50;not null;index" json:"category"`
	Stock       int     `gorm:"not null;default:0" json:"stock"`
	Status      string  `gorm:"size:20;not null;default:'active'" json:"status"`
}

// TableName specifies the table name for the model
func (Product) TableName() string {
	return "t_product"
}
```

### Base Fields

The `Base` struct provides:

```go
type Base struct {
	ID         uint           `gorm:"primarykey" json:"-"`
	ResourceID string         `gorm:"uniqueIndex;size:36;not null" json:"id"`
	CreatedAt  time.Time      `json:"created_at,omitempty"`
	UpdatedAt  time.Time      `json:"updated_at,omitempty"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}
```

- **ID**: Auto-incrementing integer (internal use only, not exposed in JSON)
- **ResourceID**: UUID string (exposed as `id` in JSON, used in APIs)
- **CreatedAt**: Timestamp of creation
- **UpdatedAt**: Timestamp of last update
- **DeletedAt**: Soft delete timestamp (NULL if not deleted)

## Field Tags

### GORM Tags

```go
type User struct {
	model.Base
	// Size constraint
	Username string `gorm:"size:50;not null;uniqueIndex" json:"username"`
	
	// Email validation
	Email string `gorm:"size:100;not null;uniqueIndex" json:"email"`
	
	// Decimal type
	Balance float64 `gorm:"type:decimal(15,2);default:0" json:"balance"`
	
	// Enum type
	Status string `gorm:"size:20;not null;default:'active';check:status IN ('active','inactive')" json:"status"`
	
	// Index
	Category string `gorm:"size:50;index" json:"category"`
	
	// Composite unique index
	Code string `gorm:"size:50;uniqueIndex:idx_code_type" json:"code"`
	Type string `gorm:"size:50;uniqueIndex:idx_code_type" json:"type"`
	
	// JSON field
	Metadata JSON `gorm:"type:json" json:"metadata"`
	
	// Foreign key
	OwnerID  string `gorm:"size:36" json:"owner_id"`
	Owner    *User  `gorm:"foreignKey:OwnerID;references:ResourceID" json:"owner,omitempty"`
}
```

### JSON Tags

```go
type Product struct {
	model.Base
	Name      string `json:"name"`                    // Normal field
	Price     float64 `json:"price"`                  // Normal field
	Secret    string `json:"-"`                       // Excluded from JSON
	Metadata  string `json:"metadata,omitempty"`      // Omit if empty
}
```

### Validation Tags

Use struct tags with validation libraries:

```go
type CreateProductRequest struct {
	Name     string  `json:"name" binding:"required,min=1,max=100"`
	Price    float64 `json:"price" binding:"required,min=0"`
	Category string  `json:"category" binding:"required,oneof=electronics clothing food"`
	Stock    int     `json:"stock" binding:"min=0"`
}
```

## Relationships

### One-to-Many

```go
// Order has many OrderItems
type Order struct {
	model.Base
	CustomerID string       `gorm:"size:36;not null;index" json:"customer_id"`
	Total      float64      `gorm:"type:decimal(15,2)" json:"total"`
	Items      []OrderItem  `gorm:"foreignKey:OrderID;references:ResourceID" json:"items,omitempty"`
}

type OrderItem struct {
	model.Base
	OrderID   string  `gorm:"size:36;not null;index" json:"order_id"`
	ProductID string  `gorm:"size:36;not null" json:"product_id"`
	Quantity  int     `gorm:"not null" json:"quantity"`
	Price     float64 `gorm:"type:decimal(15,2)" json:"price"`
}
```

### Many-to-Many

```go
// User has many Roles, Role has many Users
type User struct {
	model.Base
	Username string `gorm:"size:50;not null;uniqueIndex" json:"username"`
	Roles    []Role `gorm:"many2many:t_user_role;foreignKey:ResourceID;joinForeignKey:UserID;References:ResourceID;joinReferences:RoleID" json:"roles,omitempty"`
}

type Role struct {
	model.Base
	Name  string `gorm:"size:50;not null;uniqueIndex" json:"name"`
	Users []User `gorm:"many2many:t_user_role;foreignKey:ResourceID;joinForeignKey:RoleID;References:ResourceID;joinReferences:UserID" json:"users,omitempty"`
}

// Join table (optional, can be implicit)
type UserRole struct {
	UserID string `gorm:"size:36;primaryKey;index" json:"user_id"`
	RoleID string `gorm:"size:36;primaryKey;index" json:"role_id"`
}

func (UserRole) TableName() string {
	return "t_user_role"
}
```

### Belongs To

```go
type OrderItem struct {
	model.Base
	OrderID   string   `gorm:"size:36;not null;index" json:"order_id"`
	Order     *Order   `gorm:"foreignKey:OrderID;references:ResourceID" json:"order,omitempty"`
	ProductID string   `gorm:"size:36;not null" json:"product_id"`
	Product   *Product `gorm:"foreignKey:ProductID;references:ResourceID" json:"product,omitempty"`
}
```

## Database Operations

### Create

```go
func (s *ProductService) CreateProduct(ctx context.Context, name string, price float64) (*model.Product, error) {
	product := &model.Product{
		Name:   name,
		Price:  price,
		Status: "active",
	}
	
	if err := db.Session(ctx).Create(product).Error; err != nil {
		return nil, err
	}
	
	return product, nil
}
```

### Read - Single Record

```go
func (s *ProductService) GetProduct(ctx context.Context, id string) (*model.Product, error) {
	var product model.Product
	
	err := db.Session(ctx).
		Where("resource_id = ?", id).
		First(&product).Error
	
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("product not found")
		}
		return nil, err
	}
	
	return &product, nil
}
```

### Read - With Preload

```go
func (s *OrderService) GetOrder(ctx context.Context, id string) (*model.Order, error) {
	var order model.Order
	
	err := db.Session(ctx).
		Preload("Items").
		Preload("Items.Product").
		Where("resource_id = ?", id).
		First(&order).Error
	
	if err != nil {
		return nil, err
	}
	
	return &order, nil
}
```

### Read - List with Pagination

```go
func (s *ProductService) ListProducts(ctx context.Context, search string, page, pageSize int) ([]*model.Product, int64, error) {
	var products []*model.Product
	var total int64
	
	query := db.Session(ctx).Model(&model.Product{})
	
	// Apply filters
	if search != "" {
		query = query.Where("name LIKE ?", "%"+search+"%")
	}
	
	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	
	// Get paginated results
	offset := (page - 1) * pageSize
	err := query.
		Offset(offset).
		Limit(pageSize).
		Order("created_at DESC").
		Find(&products).Error
	
	if err != nil {
		return nil, 0, err
	}
	
	return products, total, nil
}
```

### Update

```go
func (s *ProductService) UpdateProduct(ctx context.Context, id string, updates map[string]interface{}) (*model.Product, error) {
	var product model.Product
	
	// Find product
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

### Delete (Soft)

```go
func (s *ProductService) DeleteProduct(ctx context.Context, id string) error {
	result := db.Session(ctx).
		Where("resource_id = ?", id).
		Delete(&model.Product{})
	
	if result.Error != nil {
		return result.Error
	}
	
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	
	return nil
}
```

### Delete (Hard)

```go
func (s *ProductService) PermanentlyDeleteProduct(ctx context.Context, id string) error {
	result := db.Session(ctx).
		Unscoped().
		Where("resource_id = ?", id).
		Delete(&model.Product{})
	
	if result.Error != nil {
		return result.Error
	}
	
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	
	return nil
}
```

## Advanced Queries

### Complex Filters

```go
func (s *ProductService) SearchProducts(ctx context.Context, filters ProductFilters) ([]*model.Product, error) {
	var products []*model.Product
	
	query := db.Session(ctx).Model(&model.Product{})
	
	// Text search
	if filters.Search != "" {
		query = query.Where("name LIKE ? OR description LIKE ?", 
			"%"+filters.Search+"%", 
			"%"+filters.Search+"%")
	}
	
	// Category filter
	if filters.Category != "" {
		query = query.Where("category = ?", filters.Category)
	}
	
	// Price range
	if filters.MinPrice > 0 {
		query = query.Where("price >= ?", filters.MinPrice)
	}
	if filters.MaxPrice > 0 {
		query = query.Where("price <= ?", filters.MaxPrice)
	}
	
	// Stock filter
	if filters.InStock {
		query = query.Where("stock > 0")
	}
	
	// Status filter
	if len(filters.Statuses) > 0 {
		query = query.Where("status IN ?", filters.Statuses)
	}
	
	// Sorting
	if filters.SortBy != "" {
		order := filters.SortBy
		if filters.SortDesc {
			order += " DESC"
		}
		query = query.Order(order)
	}
	
	err := query.Find(&products).Error
	return products, err
}
```

### Aggregations

```go
func (s *ProductService) GetCategoryStats(ctx context.Context) ([]CategoryStats, error) {
	var stats []CategoryStats
	
	err := db.Session(ctx).
		Model(&model.Product{}).
		Select("category, COUNT(*) as count, SUM(stock) as total_stock, AVG(price) as avg_price").
		Group("category").
		Find(&stats).Error
	
	return stats, err
}

type CategoryStats struct {
	Category   string  `json:"category"`
	Count      int     `json:"count"`
	TotalStock int     `json:"total_stock"`
	AvgPrice   float64 `json:"avg_price"`
}
```

### Joins

```go
func (s *OrderService) GetOrdersWithCustomers(ctx context.Context) ([]*model.Order, error) {
	var orders []*model.Order
	
	err := db.Session(ctx).
		Model(&model.Order{}).
		Joins("LEFT JOIN t_user ON t_order.customer_id = t_user.resource_id").
		Select("t_order.*, t_user.username as customer_name").
		Find(&orders).Error
	
	return orders, err
}
```

### Subqueries

```go
func (s *ProductService) GetProductsAboveAveragePrice(ctx context.Context) ([]*model.Product, error) {
	var products []*model.Product
	
	// Subquery for average price
	avgPriceSubQuery := db.Session(ctx).
		Model(&model.Product{}).
		Select("AVG(price)")
	
	err := db.Session(ctx).
		Where("price > (?)", avgPriceSubQuery).
		Find(&products).Error
	
	return products, err
}
```

## Transactions

### Basic Transaction

```go
func (s *OrderService) CreateOrder(ctx context.Context, orderData OrderData) error {
	return db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		// Create order
		order := &model.Order{
			CustomerID:  orderData.CustomerID,
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
		}
		
		return nil
	})
}
```

### Manual Transaction Control

```go
func (s *OrderService) ComplexTransaction(ctx context.Context) error {
	tx := db.Session(ctx).Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()
	
	// First operation
	if err := tx.Create(&order).Error; err != nil {
		tx.Rollback()
		return err
	}
	
	// Second operation
	if err := tx.Create(&items).Error; err != nil {
		tx.Rollback()
		return err
	}
	
	// Commit transaction
	return tx.Commit().Error
}
```

## Hooks

### Before Create

```go
func (p *Product) BeforeCreate(tx *gorm.DB) error {
	// Validation
	if p.Price < 0 {
		return fmt.Errorf("price cannot be negative")
	}
	
	// Set default values
	if p.Status == "" {
		p.Status = "active"
	}
	
	return nil
}
```

### After Create

```go
func (p *Product) AfterCreate(tx *gorm.DB) error {
	// Log creation
	log.Info("Product created", "id", p.ResourceID, "name", p.Name)
	
	// Trigger events
	// events.Publish("product.created", p)
	
	return nil
}
```

### Before Update

```go
func (p *Product) BeforeUpdate(tx *gorm.DB) error {
	// Validation
	if tx.Statement.Changed("Price") {
		if p.Price < 0 {
			return fmt.Errorf("price cannot be negative")
		}
	}
	
	return nil
}
```

### Before Delete

```go
func (p *Product) BeforeDelete(tx *gorm.DB) error {
	// Check for dependencies
	var count int64
	if err := tx.Model(&model.OrderItem{}).
		Where("product_id = ?", p.ResourceID).
		Count(&count).Error; err != nil {
		return err
	}
	
	if count > 0 {
		return fmt.Errorf("cannot delete product with existing orders")
	}
	
	return nil
}
```

## Migrations

Migrations are handled automatically by the framework during startup. To add custom migrations:

```go
// In your main.go or init function
func init() {
	db.RegisterMigration(func(ctx context.Context) error {
		// Auto-migrate your models
		return db.Session(ctx).AutoMigrate(
			&model.Product{},
			&model.Order{},
			&model.OrderItem{},
		)
	})
}
```

## Scopes

Define reusable query scopes:

```go
// Active products scope
func ActiveProducts(db *gorm.DB) *gorm.DB {
	return db.Where("status = ?", "active")
}

// In-stock products scope
func InStock(db *gorm.DB) *gorm.DB {
	return db.Where("stock > 0")
}

// Price range scope
func PriceRange(min, max float64) func(*gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if min > 0 {
			db = db.Where("price >= ?", min)
		}
		if max > 0 {
			db = db.Where("price <= ?", max)
		}
		return db
	}
}

// Usage
products, err := db.Session(ctx).
	Scopes(ActiveProducts, InStock, PriceRange(10, 100)).
	Find(&products).Error
```

## Best Practices

1. **Always Use ResourceID**: Use UUID-based ResourceID for external references
2. **Soft Deletes**: Use soft deletes instead of hard deletes
3. **Indexes**: Add indexes on frequently queried fields
4. **Transactions**: Wrap related operations in transactions
5. **Pagination**: Always paginate list queries
6. **Preloading**: Use Preload for relationships to avoid N+1 queries
7. **Validation**: Validate in BeforeCreate/BeforeUpdate hooks
8. **Context**: Always pass context for tracing and cancellation
9. **Error Handling**: Check for gorm.ErrRecordNotFound specifically
10. **Table Naming**: Use consistent table naming with prefix

## Next Steps

- Learn about [Authentication & Authorization](./07-auth-system.md)
- Explore [Backend Development](./03-backend-development.md)
- Review [API Best Practices](./09-api-best-practices.md)

