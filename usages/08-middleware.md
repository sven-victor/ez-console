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

### Recovery & Metrics

- `middleware.Recovery()` — used with `gin.CustomRecovery` in `server/server.go`
- `middleware.PrometheusMetrics()` — Prometheus HTTP metrics middleware

Built-in packages under `pkg/middleware/`: authentication, permission, cors, log, recovery, metrics, delay, settings, **ratelimit**.

### Rate Limit Middleware

Applied automatically to `/api` after `AuthenticationMiddleware`. Counters use `pkg/ratelimit` (memory or Redis). Runtime enable/disable is the `rate_limit_enabled` system setting.

- **Identity:** `service_account_id` → `user_id` → `ClientIP()` (anonymous only).
- **Buckets:** one shared bucket per identity; an extra route bucket only when a compiled rule has a non-empty path (AND). Daily quota is on shared (`path=""`) rules only.
- **Skip:** `GET /api/system/health`. Non-`/api` routes never hit this middleware. SSE counts the connection, not each event.
- **Errors:** HTTP 429, `E4291` (rate) or `E4292` (quota). Only rejected requests are logged (`msg=rate limit exceeded`), with `kind`, `bucket` (`shared`/`route`, from the limiter), identity, request `method`/`path`, the failing rule's `source`/`rate`/`period`/`burst` (and `quota`/`quota_period` when set), and `retry_after` seconds. `RateLimit-*` / `Retry-After` headers are not returned.
- **Store:** `rate_limit.store=memory` (default) or `redis`. Redis errors fail open unless `fail_open=false`. Cluster + memory logs a warning (limits are per node).
- **Reset counters:** `POST /api/system/rate-limit/reset` with `scope=global|subject|rule` (requires `system:rate_limit:update`). Subject convenience routes: `POST /api/authorization/users/:id/rate-limit/reset` and `POST /api/authorization/service-accounts/:id/rate-limit/reset`. Memory store resets the current node only.
- **Code extra bucket:** `middleware.RateLimitRoute(method, path, limit, subjectTypes...)` registers a `source=code` rule at route registration time (the returned handler is a no-op; group middleware runs first).

```go
api.POST("/expensive",
	middleware.RateLimitRoute("POST", "/api/products/expensive", ratelimit.Limit{Rate: 5, Period: time.Minute, Burst: 5}, model.RateLimitSubjectUser),
	controller.Expensive)
```

YAML `rate_limit.policies` overlay builtin defaults at startup and are **not** written to `t_rate_limit_rule`. DB/UI rules (`source=db`) overlay YAML/code. Deleting a DB row restores the lower layer.

This does not replace `LoginFailureLock` or AI token governance. For proxy-level limits in front of the process, keep using nginx/gateway as an additional layer.

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

Prefer the built-in rate limiter (`middleware.RateLimitMiddleware` / System Settings) for `/api`. A custom limiter is only needed for non-API routes or a different algorithm:

```go
func CustomRateLimitMiddleware(limit int, window time.Duration) gin.HandlerFunc {
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

The Gin `*gin.Engine` is created inside the framework when the root command runs (`consoleserver.NewCommandServer` → internal server startup). You do not construct the engine in `main` for a normal EZ-Console binary.

To attach middleware to **all** routes, pass one or more `func(*gin.Engine)` hooks via `consoleserver.WithEngineOptions` when calling `NewCommandServer`. Each hook receives the engine **after** built-in middleware (recovery, tracing, metrics, logging, CORS, delay) is registered and **before** services and API routes are wired. For the option type and related helpers, see [Advanced Topics](./13-advanced-topics.md#withserveroption).

```go
package main

import (
	"github.com/gin-gonic/gin"
	consoleserver "github.com/sven-victor/ez-console/server"
)

func useGlobalMiddleware(engine *gin.Engine) {
	engine.Use(MyMiddleware())
}

const VERSION = "1.0.0"

var rootCmd = consoleserver.NewCommandServer(
	"my-app",
	VERSION,
	"My Application",
	consoleserver.WithEngineOptions(useGlobalMiddleware),
)

func main() {
	rootCmd.Execute()
}
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

- Customize the CLI and Gin engine with server options: [Advanced Topics](./13-advanced-topics.md#withserveroption)
- Learn about [API Best Practices](./09-api-best-practices.md)
- Explore [Backend Development](./03-backend-development.md)
- Review [Authentication & Authorization](./07-auth-system.md)



