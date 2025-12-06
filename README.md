# EZ-Console

<div align="center">

**A modern, production-ready full-stack framework for building enterprise management systems**

[![Go Version](https://img.shields.io/badge/Go-1.20+-00ADD8?style=flat&logo=go)](https://golang.org)
[![React Version](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react)](https://reactjs.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Architecture](#-architecture) • [Examples](#-examples)

</div>

---

## 📖 Overview

**EZ-Console** is a comprehensive full-stack framework designed for rapidly building enterprise-grade management systems. It provides a solid foundation with essential features like authentication, authorization, user management, and audit logging out-of-the-box, allowing you to focus on your business logic rather than infrastructure.

### Why EZ-Console?

- 🚀 **Rapid Development** - Get a full-featured admin system running in minutes
- 🏗️ **Production Ready** - Battle-tested architecture with security best practices
- 🔧 **Highly Extensible** - Plugin-based architecture for easy customization
- 🌐 **Full Stack** - Backend (Go) and Frontend (React) perfectly integrated
- 📊 **Enterprise Features** - RBAC, audit logging, multi-tenancy, and more
- 🔐 **Security First** - JWT authentication, MFA support, permission control

## ✨ Features

### Backend (Go + Gin)

- **RESTful API Framework** - Built on high-performance Gin framework
- **Database ORM** - GORM with support for SQLite, MySQL, PostgreSQL
- **Authentication & Authorization**
  - JWT-based stateless authentication
  - Role-Based Access Control (RBAC)
  - Multi-Factor Authentication (TOTP, Email)
  - LDAP/Active Directory integration
  - OAuth2/OIDC support (Google, Okta, etc.)
- **User Management** - Complete user lifecycle (CRUD, disable, activate, password management)
- **System Settings** - Configurable security policies
  - Password policies (length, complexity, expiration)
  - Session timeout and inactive user handling
  - Email and SMTP configuration
- **Audit Logging** - Automatic tracking of all user actions
- **File Management** - Upload/download with storage abstraction
- **Middleware** - Built-in authentication, CORS, logging, rate limiting
- **Observability** - OpenTelemetry integration for tracing
- **CLI Tools** - Cobra-based command-line interface

### Frontend (React + TypeScript)

- **Modern Stack** - React 18 + TypeScript + Vite
- **UI Library** - Ant Design 5 with professional components
- **Routing** - React Router v6 with protected routes
- **State Management** - React Context + React Query (TanStack Query)
- **API Client** - Axios with request/response interceptors
- **Internationalization** - i18next with multiple language support
- **Pre-built Components**
  - User management interface
  - Role and permission management
  - System settings dashboard
  - Audit log viewer
  - File upload/download components

### Developer Experience

- **Type Safety** - TypeScript for frontend, strong typing in Go
- **Hot Reload** - Fast development iteration
- **API Documentation** - Swagger/OpenAPI integration
- **Code Generation** - Automated API client generation
- **Testing Support** - Unit and integration testing frameworks

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- **Go**: 1.20 or higher ([Download](https://golang.org/dl/))
- **Node.js**: 18 or higher ([Download](https://nodejs.org/))
- **pnpm**: Package manager (`npm install -g pnpm`)
- **Make**: Build automation (optional)

### Option 1: Run the Framework Demo

Clone and run the framework itself to see all built-in features:

```bash
# Clone the repository
git clone https://github.com/sven-victor/ez-console.git
cd ez-console

# Build the application
make clean build

# Run the server with encryption key
dist/server --global.encrypt-key=your-secret-key-16bytes

# Or run with a config file
dist/server --global.encrypt-key=your-secret-key-16bytes --config config.yaml
```

The server will start on `http://localhost:8080` by default. Access the admin console at `http://localhost:8080/console`.

**Default Credentials:**
- Username: `admin`
- Password: `admin123` (change immediately in production)

> **Security Note:** The `--global.encrypt-key` must be 8, 16, 24, or 32 bytes. This key is used for encrypting sensitive data. **Never change it after initial setup** or existing encrypted data will be unrecoverable.

### Option 2: Create Your Own Application

Build your own management system using EZ-Console as a framework:

```bash
# Create project structure
mkdir my-admin-app && cd my-admin-app
mkdir -p backend/controller backend/service

# Initialize Go module
cd backend
go mod init github.com/yourusername/my-admin-app
go get github.com/sven-victor/ez-console@latest
```

Create `backend/main.go`:

```go
package main

import (
    _ "github.com/yourusername/my-admin-app/controller"
    
    consoleserver "github.com/sven-victor/ez-console/server"
)

var rootCmd = consoleserver.NewCommandServer(
    "my-admin-app", 
    "My Enterprise Management System",
)

func main() {
    rootCmd.Execute()
}
```

Create your first controller in `backend/controller/product.go`:

```go
package controller

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/sven-victor/ez-console/pkg/util"
    "github.com/sven-victor/ez-console/server"
)

type ProductController struct {
    svc server.Service
}

func NewProductController(svc server.Service) *ProductController {
    return &ProductController{svc: svc}
}

func (c *ProductController) ListProducts(ctx *gin.Context) {
    products := []map[string]interface{}{
        {"id": "1", "name": "Product A", "price": 99.99},
        {"id": "2", "name": "Product B", "price": 149.99},
    }
    util.RespondWithSuccess(ctx, http.StatusOK, products)
}

func (c *ProductController) RegisterRoutes(router *gin.RouterGroup) {
    products := router.Group("/products")
    products.GET("", c.ListProducts)
}

// Register controller on initialization
func init() {
    server.RegisterControllers(func(svc server.Service) server.Controller {
        return NewProductController(svc)
    })
}
```

Run your application:

```bash
go run main.go --global.encrypt-key=my-secret-key16b
```

Your API will be available at `http://localhost:8080/api/products`.

For detailed tutorials, see the [Quick Start Guide](./usages/02-quick-start.md).

## 📚 Documentation

Comprehensive guides are available in the [`usages/`](./usages/) directory:

### Getting Started
- [Introduction](./usages/01-introduction.md) - Framework overview and architecture
- [Quick Start](./usages/02-quick-start.md) - Build your first application

### Backend Development
- [Backend Development](./usages/03-backend-development.md) - Creating controllers and services
- [Database & Models](./usages/06-database-models.md) - Working with GORM ORM
- [Authentication & Authorization](./usages/07-auth-system.md) - Security implementation
- [Middleware](./usages/08-middleware.md) - Using and creating middleware
- [API Best Practices](./usages/09-api-best-practices.md) - RESTful design patterns

### Frontend Development
- [Frontend Development](./usages/04-frontend-development.md) - React UI development
- [Frontend Components](./usages/10-frontend-components.md) - Built-in components
- [Internationalization](./usages/11-i18n.md) - Multi-language support

### Configuration & Deployment
- [Configuration Guide](./usages/05-configuration.md) - Application configuration
- [Deployment](./usages/12-deployment.md) - Production deployment strategies

### Advanced Topics
- [Advanced Topics](./usages/13-advanced-topics.md) - Hooks, events, plugins
- [AI and Toolsets](./usages/15-ai-and-toolsets.md) - AI model integration
- [Troubleshooting](./usages/14-troubleshooting.md) - Common issues and solutions

### API Documentation

When the server is running, API documentation is available at:
- **Swagger UI**: `http://localhost:8080/swagger/index.html`

## 🏗️ Architecture

EZ-Console follows a clean, layered architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│        React + TypeScript + Ant Design                  │
└──────────────────┬──────────────────────────────────────┘
                   │ REST API (JSON)
┌──────────────────▼──────────────────────────────────────┐
│                  API Gateway Layer                       │
│        Gin Router + Middleware (Auth, CORS)             │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│               Controller Layer                           │
│    HTTP Request Handling + Validation                   │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│                Service Layer                             │
│   Business Logic + Transaction Management               │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│              Data Access Layer                           │
│        GORM ORM + Database Operations                   │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│                  Database                                │
│         SQLite / MySQL / PostgreSQL                     │
└─────────────────────────────────────────────────────────┘
```

### Key Design Principles

- **Separation of Concerns** - Clear boundaries between layers
- **Dependency Injection** - Loose coupling, easy testing
- **Interface-Based Design** - Abstraction for flexibility
- **Convention over Configuration** - Sensible defaults
- **Extensibility** - Plugin architecture for custom features

## ⚙️ Configuration

### Configuration File

Create a `config.yaml` file:

```yaml
server:
  host: "0.0.0.0"
  port: 8080
  mode: "debug"  # or "release" for production
  read_timeout: 10s
  write_timeout: 10s
  shutdown_timeout: 10s

database:
  driver: "sqlite"  # or "mysql", "postgres"
  path: "ez-console.db"
  # For MySQL/PostgreSQL:
  # host: "localhost"
  # port: 3306
  # username: "dbuser"
  # password: "dbpass"
  # dbname: "ez_console"

log:
  level: "info"  # debug, info, warn, error
  format: "json"  # json or logfmt

oauth:
  enabled: true
  providers:
    - name: google
      display_name: Google
      client_id: your-client-id
      client_secret: your-client-secret
      auth_url: "https://accounts.google.com/o/oauth2/v2/auth"
      token_url: "https://oauth2.googleapis.com/token"
      user_info_url: "https://www.googleapis.com/oauth2/v2/userinfo"
      redirect_url: "http://localhost:8080/api/auth/callback/google"
```

### Command-Line Configuration

Override configuration via command-line flags:

```bash
dist/server \
    --global.encrypt-key=your-secret-key-16b \
    --database.driver=mysql \
    --database.host=db.example.com \
    --database.username=admin \
    --database.password=secure-password \
    --server.port=9090 \
    --log.level=debug
```

For comprehensive configuration options, see the [Configuration Guide](./usages/05-configuration.md).

## 📋 API Response Format

### Success Response (Single Item)

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

### Success Response (List with Pagination)

```json
{
  "code": "0",
  "data": [
    {"id": "...", "name": "Item 1"},
    {"id": "...", "name": "Item 2"}
  ],
  "total": 100,
  "current": 1,
  "page_size": 10
}
```

### Error Response

```json
{
  "code": "E4001",
  "err": "Invalid request parameters"
}
```

**Common Error Codes:**
- `E4001` - Bad Request (400)
- `E4011` - Unauthorized (401)
- `E4031` - Forbidden (403)
- `E4041` - Not Found (404)
- `E5001` - Internal Server Error (500)

## 🎯 Examples

### Basic CRUD Controller

```go
type ProductController struct {
    svc server.Service
}

func (c *ProductController) CreateProduct(ctx *gin.Context) {
    var req CreateProductRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Invalid request", err))
        return
    }

    // Use framework audit service
    var product *model.Product
    err := c.svc.StartAudit(ctx, "", func(auditLog *model.AuditLog) error {
        product, err = c.productService.Create(ctx, req)
        auditLog.ResourceType = "product"
        auditLog.Action = "create"
        return err
    })

    if err != nil {
        util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to create", err))
        return
    }

    util.RespondWithSuccess(ctx, http.StatusCreated, product)
}
```

More examples in the [`demo/`](./demo/) directory.

## 🔐 Security Features

- **JWT Authentication** - Stateless, scalable authentication
- **Password Security** - Salted hashing with configurable policies
- **Multi-Factor Authentication** - TOTP and Email-based MFA
- **Role-Based Access Control** - Fine-grained permission management
- **Session Management** - Automatic timeout and renewal
- **Audit Logging** - Complete action trail for compliance
- **Input Validation** - Request validation at multiple layers
- **SQL Injection Protection** - Parameterized queries via GORM
- **XSS Protection** - Output encoding and CSP headers
- **CORS Configuration** - Configurable cross-origin policies

## 🛠️ Development

### Project Structure

```
ez-console/
├── cmd/                    # CLI commands
├── demo/                   # Example applications
│   └── backend/           # Demo backend
├── pkg/                    # Core framework packages
│   ├── api/               # Built-in controllers
│   ├── config/            # Configuration management
│   ├── db/                # Database layer
│   ├── middleware/        # HTTP middleware
│   ├── model/             # Data models
│   ├── service/           # Business services
│   └── util/              # Utility functions
├── server/                 # Server initialization
├── web/                    # Frontend application
│   └── src/               # React source code
├── usages/                 # Documentation
├── Makefile               # Build automation
├── config.yaml            # Configuration file
└── README.md              # This file
```

### Building from Source

```bash
# Clone repository
git clone https://github.com/sven-victor/ez-console.git
cd ez-console

# Build backend
make build

# Build frontend
cd web
pnpm install
pnpm build

# Run tests
make test
```

### Running in Development Mode

```bash
# Terminal 1: Run backend with hot reload
make dev

# Terminal 2: Run frontend dev server
cd web
pnpm dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Contribution Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure:
- Code follows the existing style
- All tests pass
- Documentation is updated
- Commit messages are clear and descriptive

## 📄 License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with these excellent open-source projects:

- [Gin](https://github.com/gin-gonic/gin) - HTTP web framework
- [GORM](https://gorm.io/) - ORM library
- [Cobra](https://github.com/spf13/cobra) - CLI framework
- [Viper](https://github.com/spf13/viper) - Configuration management
- [React](https://reactjs.org/) - Frontend library
- [Ant Design](https://ant.design/) - UI component library
- [React Query](https://tanstack.com/query/) - Data fetching library

## 📬 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/sven-victor/ez-console/issues)
- **Documentation**: [Usage Guides](./usages/)

---

<div align="center">

Made with ❤️ by the EZ-Console Team

[⬆ Back to Top](#ez-console)

</div>
