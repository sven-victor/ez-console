# Advanced Topics

This guide covers advanced features and customization options in EZ-Console.

## Custom Server Options

### Adding Custom Routes

```go
package main

import (
	"github.com/gin-gonic/gin"
	consoleserver "github.com/sven-victor/ez-console/server"
)

func customRoutes(engine *gin.Engine) {
	engine.GET("/custom", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Custom route"})
	})
}

const VERSION = "1.0.0"

var rootCmd = consoleserver.NewCommandServer(
	"my-app",
	VERSION,
	"My Application",
	consoleserver.WithEngineOptions(customRoutes),
)

func main() {
	rootCmd.Execute()
}
```

### Custom Middleware

```go
func rateLimitMiddleware(engine *gin.Engine) {
	engine.Use(RateLimitMiddleware(100, time.Minute))
}

const VERSION = "1.0.0"

var rootCmd = consoleserver.NewCommandServer(
	"my-app",
	VERSION,
	"My Application",
	consoleserver.WithEngineOptions(rateLimitMiddleware),
)
```

## Extending the Service Layer

### Adding Custom Services

```go
package service

type CustomService struct {
	baseService *BaseService
}

func NewCustomService(base *BaseService) *CustomService {
	return &CustomService{baseService: base}
}

// In service.go, add to Service struct
type Service struct {
	*UserService
	*CustomService
	// ... other services
}

// Initialize in NewService
func NewService(ctx context.Context) *Service {
	baseService := &BaseService{...}
	
	return &Service{
		UserService:   NewUserService(ctx, baseService),
		CustomService: NewCustomService(baseService),
		// ...
	}
}
```

## Hooks and Events

### User Change Hooks

```go
func init() {
	// Register hook for user changes
	svc.RegisterUserChangeHook(func(ctx context.Context, user *model.User, action string) error {
		// Send email, update cache, trigger webhooks, etc.
		log.Printf("User %s was %s", user.Username, action)
		return nil
	})
}
```

### Model Hooks

```go
// BeforeCreate hook
func (p *Product) BeforeCreate(tx *gorm.DB) error {
	// Custom validation or data transformation
	if p.Price < 0 {
		return fmt.Errorf("price cannot be negative")
	}
	return nil
}

// AfterCreate hook
func (p *Product) AfterCreate(tx *gorm.DB) error {
	// Trigger events, send notifications, etc.
	events.Publish("product.created", p)
	return nil
}
```

## Custom Authentication

### Custom Authentication Function

```go
package middleware

func CustomAuthFunc(c *gin.Context) {
	// Custom authentication logic
	token := c.GetHeader("X-Custom-Token")
	if !validateCustomToken(token) {
		util.RespondWithError(c, util.NewErrorMessage("E4011", "Invalid token"))
		c.Abort()
		return
	}
	c.Next()
}

// Use custom auth
func (c *APIController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	api := middleware.WithAuthentication(
		router.Group("/api"),
		middleware.CustomAuthFunc,
	)
	{
		api.GET("/data", c.GetData)
	}
}
```

## WebSocket Support

```go
package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (c *WebSocketController) HandleWebSocket(ctx *gin.Context) {
	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		return
	}
	defer conn.Close()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			break
		}
		
		// Process message
		response := processMessage(message)
		
		err = conn.WriteMessage(messageType, response)
		if err != nil {
			break
		}
	}
}
```

## Background Jobs

### Using Goroutines

```go
func (s *ProductService) ProcessBulkImport(ctx context.Context, file string) error {
	go func() {
		// Background processing
		products, err := parseFile(file)
		if err != nil {
			log.Error("Failed to parse file", "error", err)
			return
		}
		
		for _, product := range products {
			if err := s.CreateProduct(ctx, product); err != nil {
				log.Error("Failed to create product", "error", err)
			}
		}
	}()
	
	return nil
}
```

### Using Worker Pools

```go
package worker

type Job struct {
	Data interface{}
}

type Worker struct {
	jobs    chan Job
	workers int
}

func NewWorker(workers int) *Worker {
	return &Worker{
		jobs:    make(chan Job, 100),
		workers: workers,
	}
}

func (w *Worker) Start() {
	for i := 0; i < w.workers; i++ {
		go func() {
			for job := range w.jobs {
				processJob(job)
			}
		}()
	}
}

func (w *Worker) Submit(job Job) {
	w.jobs <- job
}
```

## Caching Strategies

### In-Memory Cache

```go
var cache = make(map[string]interface{})
var cacheMutex sync.RWMutex

func GetFromCache(key string) (interface{}, bool) {
	cacheMutex.RLock()
	defer cacheMutex.RUnlock()
	value, ok := cache[key]
	return value, ok
}

func SetCache(key string, value interface{}) {
	cacheMutex.Lock()
	defer cacheMutex.Unlock()
	cache[key] = value
}
```

### Redis Cache

```go
import "github.com/go-redis/redis/v8"

var rdb *redis.Client

func init() {
	rdb = redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
}

func GetFromRedis(ctx context.Context, key string) (string, error) {
	return rdb.Get(ctx, key).Result()
}

func SetRedis(ctx context.Context, key string, value interface{}, expiration time.Duration) error {
	return rdb.Set(ctx, key, value, expiration).Err()
}
```

## File Storage

### Local Storage

```go
func (s *FileService) SaveFile(ctx context.Context, file multipart.File, filename string) (string, error) {
	// Create directory if not exists
	uploadDir := "/var/uploads"
	os.MkdirAll(uploadDir, 0755)
	
	// Generate unique filename
	ext := filepath.Ext(filename)
	uniqueName := uuid.New().String() + ext
	filePath := filepath.Join(uploadDir, uniqueName)
	
	// Save file
	dst, err := os.Create(filePath)
	if err != nil {
		return "", err
	}
	defer dst.Close()
	
	_, err = io.Copy(dst, file)
	return filePath, err
}
```

### S3 Storage

```go
import "github.com/aws/aws-sdk-go/service/s3"

func (s *FileService) SaveToS3(ctx context.Context, file multipart.File, filename string) (string, error) {
	sess := session.Must(session.NewSession())
	svc := s3.New(sess)
	
	_, err := svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String("my-bucket"),
		Key:    aws.String(filename),
		Body:   file,
	})
	
	if err != nil {
		return "", err
	}
	
	return fmt.Sprintf("https://my-bucket.s3.amazonaws.com/%s", filename), nil
}
```

## Email Notifications

```go
package service

import "gopkg.in/gomail.v2"

func (s *EmailService) SendEmail(to, subject, body string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", "noreply@example.com")
	m.SetHeader("To", to)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", body)
	
	d := gomail.NewDialer("smtp.example.com", 587, "username", "password")
	
	return d.DialAndSend(m)
}

func (s *EmailService) SendWelcomeEmail(user *model.User) error {
	subject := "Welcome to Our Platform"
	body := fmt.Sprintf("<h1>Welcome %s!</h1><p>Thank you for joining us.</p>", user.FullName)
	return s.SendEmail(user.Email, subject, body)
}
```

## Scheduled Tasks

```go
package scheduler

import "github.com/robfig/cron/v3"

func StartScheduler() {
	c := cron.New()
	
	// Run every day at midnight
	c.AddFunc("0 0 * * *", func() {
		// Daily cleanup task
		cleanupOldData()
	})
	
	// Run every hour
	c.AddFunc("0 * * * *", func() {
		// Hourly sync task
		syncExternalData()
	})
	
	c.Start()
}
```

## Custom Frontend Theme

```typescript
// src/theme.ts
export const customTheme = {
  token: {
    colorPrimary: '#00b96b',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1890ff',
    colorBgBase: '#f0f2f5',
    fontSize: 14,
    borderRadius: 6,
  },
  components: {
    Button: {
      colorPrimary: '#00b96b',
      algorithm: true,
    },
    Table: {
      headerBg: '#fafafa',
    },
  },
};

// src/App.tsx
import { ConfigProvider } from 'antd';
import { customTheme } from './theme';

<ConfigProvider theme={customTheme}>
  <EZApp />
</ConfigProvider>
```

## Testing

### Backend Tests

```go
package service

import (
	"testing"
	"github.com/stretchr/testify/assert"
)

func TestCreateProduct(t *testing.T) {
	service := NewProductService()
	
	product, err := service.CreateProduct(context.Background(), "Test Product", 99.99)
	
	assert.NoError(t, err)
	assert.NotNil(t, product)
	assert.Equal(t, "Test Product", product.Name)
	assert.Equal(t, 99.99, product.Price)
}
```

### Frontend Tests

```typescript
import { render, screen } from '@testing-library/react';
import { ProductList } from './ProductList';

test('renders product list', () => {
  render(<ProductList />);
  const heading = screen.getByText(/product list/i);
  expect(heading).toBeInTheDocument();
});
```

## Performance Monitoring

### OpenTelemetry Integration

```yaml
# config.yml
tracing:
  enabled: true
  service_name: "my-app"
  exporter: "otlp"
  otlp:
    endpoint: "http://localhost:4318"
```

## Next Steps

- Review [Troubleshooting](./14-troubleshooting.md)
- Explore [Deployment](./12-deployment.md)
- Check [API Best Practices](./09-api-best-practices.md)



