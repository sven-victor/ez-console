# EZ-Console Framework Usage Guide

EZ-Console is a modern, full-stack framework for building enterprise-grade management systems with built-in authentication, authorization, and user management capabilities.

## Table of Contents

1. [Introduction](./01-introduction.md) - Framework overview and architecture
2. [Quick Start](./02-quick-start.md) - Get up and running quickly
3. [Backend Development](./03-backend-development.md) - Building backend APIs with Go
4. [Frontend Development](./04-frontend-development.md) - Creating React UIs
5. [Configuration Guide](./05-configuration.md) - Configuring your application
6. [Database & Models](./06-database-models.md) - Working with GORM and data models
7. [Authentication & Authorization](./07-auth-system.md) - Implementing security
8. [Middleware](./08-middleware.md) - Using and creating middleware
9. [API Best Practices](./09-api-best-practices.md) - RESTful API design, OpenAPI/Swag workflow, and frontend codegen
10. [Frontend Components](./10-frontend-components.md) - Using built-in React components
11. [Internationalization](./11-i18n.md) - Multi-language support
12. [Deployment](./12-deployment.md) - Deploying to production
13. [Advanced Topics](./13-advanced-topics.md) - Advanced features and customization
14. [Troubleshooting](./14-troubleshooting.md) - Common issues and solutions
15. [AI and Toolsets](./15-ai-and-toolsets.md) - AI model integration and custom toolsets
16. [Skills](./16-skills.md) - AI Agent Skills management and chat integration

## Framework Features

### Backend (Go + Gin)
- **RESTful API**: Built with Gin framework
- **Database ORM**: GORM with support for SQLite, MySQL, PostgreSQL
- **Authentication**: JWT-based with session management
- **Authorization**: RBAC with policy-based permissions
- **Middleware**: Built-in authentication, CORS, logging, rate limiting
- **File Management**: Upload/download with storage support
- **Audit Logging**: Automatic tracking of user actions
- **Multi-tenancy**: Organization-based resource isolation

### Frontend (React + TypeScript)
- **Modern Stack**: React 18 + TypeScript + Vite
- **UI Library**: Ant Design 5
- **Routing**: React Router v6
- **State Management**: React Context + React Query
- **API Client**: Axios with interceptors
- **Internationalization**: i18next with multiple languages
- **Components**: Pre-built admin components

## Quick Links

- **Source Code**: Check the `/examples` directory for working examples
- **API Documentation**: Available at `/swagger` when the server is running. The API contract is defined in the backend (Swag comments in `pkg/api/`); run `make clean-openapi clean-openapi2ts openapi2ts` to regenerate the OpenAPI spec and frontend API client (see [API Best Practices](./09-api-best-practices.md)).
- **Configuration Reference**: See [Configuration Guide](./05-configuration.md)

## Getting Help

For detailed information on specific topics, navigate to the corresponding guide in the list above. Each guide includes:
- Conceptual explanations
- Working code examples
- Best practices
- Common pitfalls to avoid

## Prerequisites

Before starting, ensure you have:
- Go 1.20 or higher
- Node.js 18 or higher
- pnpm (for frontend development)
- Basic knowledge of Go and React

## Example Project Structure

```
your-project/
├── backend/
│   ├── controller/          # HTTP request handlers
│   ├── service/             # Business logic
│   ├── main.go             # Application entry point
│   ├── go.mod              # Go dependencies
│   └── go.sum
└── web/
    ├── src/
    │   ├── pages/          # Page components
    │   ├── App.tsx         # Main application component
    │   └── main.tsx        # Entry point
    ├── package.json        # Node dependencies
    └── vite.config.ts      # Vite configuration
```

Start with the [Quick Start Guide](./02-quick-start.md) to create your first application!

