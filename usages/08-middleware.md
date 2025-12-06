# Middleware Guide

This guide covers using and creating middleware in EZ-Console.

## Built-in Middleware

EZ-Console includes several built-in middleware:

### Authentication Middleware

Validates JWT tokens and loads user information:

```go
// Applied automatically to all /api routes
api := router.Group("/api")
api.Use(middleware.AuthenticationMiddleware())
```

### Permission Middleware

Requires specific permissions:

```go
router.POST("/products", 
	middleware.RequirePermission("product:create"), 
	controller.CreateProduct)
```

### CORS Middleware

Handles Cross-Origin Resource Sharing:

```go
// Applied automatically to all routes
engine.Use(middleware.CORSMiddleware())
```

### Logging Middleware

Logs all HTTP requests:

```go
// Applied automatically with trace ID
engine.Use(middleware.Log(serviceName))
```

### Delay Middleware

Adds artificial delay (useful for testing):

```go
engine.Use(middleware.DelayMiddleware())
```

## Creating Custom Middleware

### Basic Middleware

```go
func MyMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Before request
		startTime := time.Now()
		
		// Process request
		c.Next()
		
		// After request
		duration := time.Since(startTime)
		log.Printf("Request took %v", duration)
	}
}

// Use it
router.Use(MyMiddleware())
```

### Middleware with Configuration

```go
func RateLimitMiddleware(limit int, window time.Duration) gin.HandlerFunc {
	limiter := rate.NewLimiter(rate.Every(window), limit)
	
	return func(c *gin.Context) {
		if !limiter.Allow() {
			util.RespondWithError(c, util.NewErrorMessage("E4291", "Rate limit exceeded"))
			c.Abort()
			return
		}
		c.Next()
	}
}

// Use it
router.Use(RateLimitMiddleware(100, time.Minute))
```

### Middleware with Conditional Logic

```go
func APIKeyMiddleware(validKeys []string) gin.HandlerFunc {
	return func(c *gin.Context) {
		apiKey := c.GetHeader("X-API-Key")
		
		valid := false
		for _, key := range validKeys {
			if apiKey == key {
				valid = true
				break
			}
		}
		
		if !valid {
			util.RespondWithError(c, util.NewErrorMessage("E4011", "Invalid API key"))
			c.Abort()
			return
		}
		
		c.Next()
	}
}
```

## Applying Middleware

### Global Middleware

Applied to all routes:

```go
engine := gin.New()
engine.Use(MyMiddleware())
```

### Group Middleware

Applied to route groups:

```go
api := router.Group("/api")
api.Use(AuthenticationMiddleware())
```

### Route Middleware

Applied to specific routes:

```go
router.GET("/admin", 
	AdminOnlyMiddleware(), 
	controller.AdminDashboard)
```

### Multiple Middleware

Chain multiple middleware:

```go
router.POST("/products",
	middleware.AuthenticationMiddleware(),
	middleware.RequirePermission("product:create"),
	RateLimitMiddleware(10, time.Minute),
	controller.CreateProduct)
```

## Common Middleware Patterns

### Request ID

```go
func RequestIDMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := c.GetHeader("X-Request-ID")
		if requestID == "" {
			requestID = uuid.New().String()
		}
		c.Set("request_id", requestID)
		c.Header("X-Request-ID", requestID)
		c.Next()
	}
}
```

### Request Logging

```go
func RequestLoggingMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		method := c.Request.Method
		
		c.Next()
		
		duration := time.Since(start)
		status := c.Writer.Status()
		
		log.Printf("%s %s %d %v", method, path, status, duration)
	}
}
```

### Error Recovery

```go
func RecoveryMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("Panic recovered: %v", err)
				util.RespondWithError(c, 
					util.NewErrorMessage("E5000", "Internal server error"))
			}
		}()
		c.Next()
	}
}
```

### Request Timeout

```go
func TimeoutMiddleware(timeout time.Duration) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), timeout)
		defer cancel()
		
		c.Request = c.Request.WithContext(ctx)
		
		done := make(chan struct{})
		go func() {
			c.Next()
			close(done)
		}()
		
		select {
		case <-done:
			return
		case <-ctx.Done():
			util.RespondWithError(c, 
				util.NewErrorMessage("E5041", "Request timeout"))
			c.Abort()
		}
	}
}
```

## Best Practices

1. **Keep middleware focused**: Each middleware should do one thing well
2. **Call c.Next()**: Always call Next() to continue the chain
3. **Use c.Abort()**: Call Abort() to stop processing
4. **Handle errors**: Always handle errors gracefully
5. **Set context values**: Use c.Set() to pass data between middleware
6. **Order matters**: Apply middleware in the correct order
7. **Performance**: Be mindful of performance impact
8. **Logging**: Log important events for debugging
9. **Configuration**: Make middleware configurable
10. **Documentation**: Document middleware behavior

## Next Steps

- Learn about [API Best Practices](./09-api-best-practices.md)
- Explore [Backend Development](./03-backend-development.md)
- Review [Authentication & Authorization](./07-auth-system.md)

