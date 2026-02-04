# API Best Practices

This guide covers best practices for designing and implementing RESTful APIs with EZ-Console.

## RESTful Design Principles

### Resource-Based URLs

```
✅ Good:
GET    /api/products          # List products
GET    /api/products/:id      # Get product
POST   /api/products          # Create product
PUT    /api/products/:id      # Update product
DELETE /api/products/:id      # Delete product

❌ Bad:
GET    /api/getProducts
POST   /api/createProduct
POST   /api/updateProduct
POST   /api/deleteProduct
```

### Use HTTP Methods Correctly

- **GET**: Retrieve resources (idempotent, no side effects)
- **POST**: Create new resources
- **PUT**: Update entire resource
- **PATCH**: Partial update
- **DELETE**: Remove resource

### Use Proper HTTP Status Codes

```go
// Success
200 OK           // Successful GET, PUT, PATCH, DELETE
201 Created      // Successful POST
204 No Content   // Successful DELETE with no response body

// Client Errors
400 Bad Request          // Invalid request
401 Unauthorized         // Authentication required
403 Forbidden            // Authenticated but no permission
404 Not Found            // Resource doesn't exist
409 Conflict             // Resource conflict
422 Unprocessable Entity // Validation error

// Server Errors
500 Internal Server Error
503 Service Unavailable
```

## Request Design

### Query Parameters

Use query parameters for filtering, sorting, and pagination:

```
GET /api/products?category=electronics&sort=price&order=asc&current=1&page_size=20
```

```go
type ListProductsRequest struct {
	Current  int    `form:"current" binding:"required,min=1"`
	PageSize int    `form:"page_size" binding:"required,min=1,max=100"`
	Search   string `form:"search"`
	Category string `form:"category"`
	Sort     string `form:"sort"`
	Order    string `form:"order" binding:"omitempty,oneof=asc desc"`
}
```

### Request Body

Use JSON for request bodies:

```go
type CreateProductRequest struct {
	Name        string   `json:"name" binding:"required,min=1,max=100"`
	Description string   `json:"description" binding:"max=500"`
	Price       float64  `json:"price" binding:"required,min=0"`
	Category    string   `json:"category" binding:"required"`
	Tags        []string `json:"tags" binding:"dive,min=1,max=50"`
}
```

### URL Parameters

Use URL parameters for resource identifiers:

```go
// GET /api/products/:id
id := ctx.Param("id")

// GET /api/orders/:orderId/items/:itemId
orderID := ctx.Param("orderId")
itemID := ctx.Param("itemId")
```

## Response Design

### Success Response Structure

Single item:
```json
{
  "code": "0",
  "data": {
    "id": "uuid",
    "name": "Product Name",
    "price": 99.99
  }
}
```

List with pagination:
```json
{
  "code": "0",
  "data": [...],
  "total": 100,
  "current": 1,
  "page_size": 10
}
```

### Error Response Structure

```json
{
  "code": "E4001",
  "err": "Invalid input: name is required"
}
```

### Consistent Field Naming

Use snake_case for JSON fields:

```go
type Product struct {
	ResourceID  string    `json:"id"`
	Name        string    `json:"name"`
	Price       float64   `json:"price"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
```

## Pagination

Always paginate list endpoints:

```go
func (c *ProductController) ListProducts(ctx *gin.Context) {
	var req ListProductsRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid parameters", err))
		return
	}

	// Set reasonable defaults
	if req.PageSize == 0 {
		req.PageSize = 10
	}
	if req.PageSize > 100 {
		req.PageSize = 100
	}

	products, total, err := c.service.ListProducts(ctx, req)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to list products", err))
		return
	}

	util.RespondWithSuccessList(ctx, http.StatusOK, products, total, req.Current, req.PageSize)
}
```

## Filtering and Searching

Support multiple filter types:

```go
type ProductFilters struct {
	Search    string   `form:"search"`
	Category  string   `form:"category"`
	MinPrice  float64  `form:"min_price"`
	MaxPrice  float64  `form:"max_price"`
	InStock   bool     `form:"in_stock"`
	Tags      []string `form:"tags"`
	Status    string   `form:"status"`
}

func buildQuery(filters ProductFilters) *gorm.DB {
	query := db.Session(ctx).Model(&model.Product{})
	
	if filters.Search != "" {
		query = query.Where("name LIKE ? OR description LIKE ?", 
			"%"+filters.Search+"%", "%"+filters.Search+"%")
	}
	
	if filters.Category != "" {
		query = query.Where("category = ?", filters.Category)
	}
	
	if filters.MinPrice > 0 {
		query = query.Where("price >= ?", filters.MinPrice)
	}
	
	if filters.MaxPrice > 0 {
		query = query.Where("price <= ?", filters.MaxPrice)
	}
	
	if filters.InStock {
		query = query.Where("stock > 0")
	}
	
	if len(filters.Tags) > 0 {
		query = query.Where("tags @> ?", pq.Array(filters.Tags))
	}
	
	return query
}
```

## Sorting

Support flexible sorting:

```go
type SortOptions struct {
	SortBy    string `form:"sort" binding:"omitempty,oneof=name price created_at"`
	SortOrder string `form:"order" binding:"omitempty,oneof=asc desc"`
}

func applySorting(query *gorm.DB, sort SortOptions) *gorm.DB {
	if sort.SortBy == "" {
		sort.SortBy = "created_at"
	}
	if sort.SortOrder == "" {
		sort.SortOrder = "desc"
	}
	
	return query.Order(fmt.Sprintf("%s %s", sort.SortBy, sort.SortOrder))
}
```

## Input Validation

### Use Binding Tags

```go
type CreateUserRequest struct {
	Username string `json:"username" binding:"required,min=3,max=50,alphanum"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
	Age      int    `json:"age" binding:"omitempty,min=1,max=150"`
	Role     string `json:"role" binding:"required,oneof=admin user guest"`
}
```

### Custom Validation

```go
func validateProduct(product *CreateProductRequest) error {
	if product.Price < 0 {
		return fmt.Errorf("price cannot be negative")
	}
	if product.Stock < 0 {
		return fmt.Errorf("stock cannot be negative")
	}
	if len(product.Name) < 3 {
		return fmt.Errorf("name must be at least 3 characters")
	}
	return nil
}
```

## Error Handling

### Return Appropriate Errors

```go
func (c *ProductController) GetProduct(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Product ID is required"))
		return
	}

	product, err := c.service.GetProduct(ctx, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			util.RespondWithError(ctx, util.NewErrorMessage("E4041", "Product not found"))
		} else {
			util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get product", err))
		}
		return
	}

	util.RespondWithSuccess(ctx, http.StatusOK, product)
}
```

### Error Messages in English

All error messages must be in English:

```go
// ✅ Good
util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid email format"))

// ❌ Bad
util.RespondWithError(ctx, util.NewErrorMessage("E4001", "邮箱格式不正确"))
```

## Versioning

### URL Versioning (Recommended)

```go
v1 := router.Group("/api/v1")
{
	v1.GET("/products", controller.ListProducts)
}

v2 := router.Group("/api/v2")
{
	v2.GET("/products", controllerV2.ListProducts)
}
```

## Performance Optimization

### Use Preloading

```go
// Bad: N+1 queries
products, _ := c.service.ListProducts(ctx)
for _, product := range products {
	product.Category, _ = c.service.GetCategory(ctx, product.CategoryID)
}

// Good: Single query with preload
db.Session(ctx).Preload("Category").Find(&products)
```

### Limit Response Size

```go
// For large resources, support field selection
type ProductResponse struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	Description string  `json:"description,omitempty"` // Optional
	Metadata    string  `json:"-"`                     // Never include
}
```

### Use Caching

```go
func (c *ProductController) GetProduct(ctx *gin.Context) {
	id := ctx.Param("id")
	
	// Check cache
	cacheKey := fmt.Sprintf("product:%s", id)
	if cached, ok := cache.Get(cacheKey); ok {
		util.RespondWithSuccess(ctx, http.StatusOK, cached)
		return
	}
	
	// Fetch from database
	product, err := c.service.GetProduct(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get product", err))
		return
	}
	
	// Cache result
	cache.Set(cacheKey, product, 5*time.Minute)
	
	util.RespondWithSuccess(ctx, http.StatusOK, product)
}
```

## Security Best Practices

1. **Always validate input**: Never trust user input
2. **Use HTTPS**: Always use HTTPS in production
3. **Rate limiting**: Implement rate limiting to prevent abuse
4. **Authentication**: Require authentication for sensitive operations
5. **Authorization**: Check permissions before operations
6. **Audit logging**: Log all important operations
7. **SQL injection**: Use parameterized queries (GORM handles this)
8. **XSS prevention**: Sanitize output
9. **CSRF protection**: Use CSRF tokens for state-changing operations
10. **Secrets management**: Never expose secrets in responses

## Documentation

### Use OpenAPI/Swagger

```go
// @Summary      List products
// @Description  Get a paginated list of products
// @Tags         products
// @Accept       json
// @Produce      json
// @Param        current   query  int     false  "Page number"
// @Param        page_size query  int     false  "Page size"
// @Param        search    query  string  false  "Search term"
// @Success      200  {object}  util.PaginationResponse[model.Product]
// @Failure      400  {object}  util.ErrorResponse
// @Failure      500  {object}  util.ErrorResponse
// @Router       /products [get]
func (c *ProductController) ListProducts(ctx *gin.Context) {
	// Implementation
}
```

## Frontend-Backend API Workflow (OpenAPI/Swag)

The project uses **Swag/OpenAPI** for frontend-backend collaboration: the **backend API is the source of truth**. API routes and documentation are defined in Go via Swag comments under `pkg/api/`. From that, the OpenAPI spec is generated and then used to generate the frontend API client code.

### Workflow Summary

1. **Define or change APIs in the backend**  
   Implement or update handlers in `pkg/api/` and add/update Swag comments (e.g. `@Summary`, `@Router`, `@Param`, `@Success`, `@Failure`) as shown in the Documentation section above.

2. **Regenerate OpenAPI spec and frontend client**  
   After backend changes, run:
   ```bash
   make clean-openapi clean-openapi2ts openapi2ts
   ```
   This:
   - Removes the previous `openapi/` directory and `web/src/service/api/` generated code.
   - Runs `swag init` to generate `openapi/swagger.json` from the Go entrypoint and `pkg/api/` (see `Makefile`).
   - Copies `openapi/swagger.json` to `web/swagger.json`.
   - Runs the OpenAPI-to-TypeScript script in `web/` (e.g. `pnpm run openapi2ts`), which uses `web/scripts/openapi.js` and `@umijs/openapi` to generate request functions and types under `web/src/service/api/`.

3. **Use generated code in the frontend**  
   Import and use the generated API functions and types from `web/src/service/api/` (and related typings). Do not hand-edit these generated files; any API change should be made in the backend and then the above command re-run.

### Key Files

- **Backend API and Swag comments**: `pkg/api/` (e.g. controllers with `@Summary`, `@Router`, etc.).
- **OpenAPI generation**: `Makefile` targets `openapi`, `openapi2ts`, `clean-openapi`, `clean-openapi2ts`.
- **Frontend codegen**: `web/scripts/openapi.js` — reads `web/swagger.json`, outputs `web/src/service/api/` (split by path, typings, and optional hooks for customizations like SSE or type exports).

## Testing

### Test All Endpoints

```go
func TestListProducts(t *testing.T) {
	router := setupTestRouter()
	
	req, _ := http.NewRequest("GET", "/api/products?current=1&page_size=10", nil)
	resp := httptest.NewRecorder()
	
	router.ServeHTTP(resp, req)
	
	assert.Equal(t, 200, resp.Code)
	
	var response util.PaginationResponse[model.Product]
	json.Unmarshal(resp.Body.Bytes(), &response)
	
	assert.Equal(t, "0", response.Code)
	assert.NotNil(t, response.Data)
}
```

## Next Steps

- Review [Backend Development](./03-backend-development.md)
- Explore [Database & Models](./06-database-models.md)
- Learn about [Deployment](./12-deployment.md)



