# Introduction to EZ-Console Framework

## Overview

EZ-Console is a comprehensive full-stack framework designed for rapidly building enterprise management systems. It provides a solid foundation with essential features like authentication, authorization, user management, and audit logging out-of-the-box.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│  React + TypeScript + Ant Design + React Router         │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP/HTTPS (JSON)
┌──────────────────▼──────────────────────────────────────┐
│                  API Gateway Layer                       │
│        Gin Router + Middleware (Auth, CORS, Log)        │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│               Controller Layer                           │
│    HTTP Request Handling + Input Validation             │
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

### Backend Architecture

The backend follows a clean layered architecture:

1. **Controller Layer**: Handles HTTP requests, validates input, and returns responses
2. **Service Layer**: Contains business logic and orchestrates data operations
3. **Model Layer**: Defines data structures and database schemas
4. **Middleware Layer**: Provides cross-cutting concerns (authentication, logging, CORS)
5. **Utility Layer**: Common helper functions and utilities

#### Key Backend Components

- **Gin Framework**: High-performance HTTP web framework
- **GORM**: Feature-rich ORM for database operations
- **JWT**: Stateless authentication with token-based sessions
- **Viper**: Configuration management with multiple sources
- **Cobra**: CLI command framework for server management
- **OpenTelemetry**: Distributed tracing and observability

### Frontend Architecture

The frontend is built as a Single Page Application (SPA):

```
┌─────────────────────────────────────────┐
│          Application Shell               │
│  (Layout, Navigation, Authentication)   │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐    ┌──────▼──────┐
│ Public │    │   Private   │
│ Routes │    │   Routes    │
│        │    │ (Protected) │
└────────┘    └──────┬──────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
    ┌────▼───┐  ┌───▼────┐ ┌───▼────┐
    │  Page  │  │  Page  │ │  Page  │
    │Components│ │Components│ │Components│
    └────┬───┘  └───┬────┘ └───┬────┘
         │          │          │
    ┌────▼──────────▼──────────▼────┐
    │      Shared Components         │
    │   (Tables, Forms, Modals)     │
    └────┬──────────────────────────┘
         │
    ┌────▼────────────────────────┐
    │      API Service Layer       │
    │  (HTTP Client + Interceptors)│
    └────┬────────────────────────┘
         │
    ┌────▼────────────────────────┐
    │    State Management          │
    │ (Context API + React Query)  │
    └─────────────────────────────┘
```

#### Key Frontend Components

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Ant Design 5**: Enterprise-grade UI component library
- **React Router v6**: Declarative routing
- **React Query (TanStack Query)**: Server state management
- **i18next**: Internationalization framework
- **Vite**: Fast build tool and dev server

## Core Concepts

### 1. Controller-Service Pattern

EZ-Console enforces separation of concerns through the Controller-Service pattern:

- **Controllers**: Handle HTTP-specific concerns (request parsing, response formatting)
- **Services**: Contain pure business logic and data access

### 2. Resource-Based IDs

All resources use UUID-based `resource_id` for public identification:

- Internal database uses auto-incrementing `id`
- External APIs use `resource_id` (exposed as `id` in JSON)
- Prevents enumeration attacks and information leakage

### 3. Soft Deletes

All models support soft deletes via GORM's `DeletedAt` field:

- Records are marked as deleted but remain in database
- Can be recovered if needed
- Queries automatically exclude soft-deleted records

### 4. Audit Logging

Automatic audit trail for all important operations:

- User authentication events
- Resource creation, modification, deletion
- Permission changes
- System configuration updates

### 5. RBAC with Policy Documents

Flexible authorization system:

- **Role-Based Access Control**: Users assigned to roles
- **Permission Groups**: Logical grouping of permissions
- **Policy Documents**: JSON-based policies for fine-grained control
- **Organization Scope**: Multi-tenant resource isolation

## Built-in Modules

### 1. User Management Module

Complete user lifecycle management:

- User CRUD operations
- Password management (change, reset, expiry)
- Multi-factor authentication (TOTP, Email)
- User status management (active, disabled, locked)
- Last login tracking

### 2. Authorization Module

Comprehensive access control:

- Role management with hierarchical permissions
- Permission groups and definitions
- Service accounts for API access
- Session management
- OAuth2/OIDC integration
- LDAP/AD integration

### 3. System Settings Module

Configurable system policies:

- Password policies (length, complexity, expiration)
- MFA enforcement
- Session timeout
- Account lockout policies
- Email/SMTP configuration
- OAuth provider configuration

### 4. File Management Module

Secure file handling:

- File upload with validation
- Storage management
- Access control
- Download tracking

### 5. Audit Log Module

Comprehensive audit trail:

- User action logging
- IP address tracking
- GeoIP location resolution
- User agent tracking
- Searchable and filterable logs

### 6. Statistics Module

System analytics:

- User activity metrics
- Login statistics
- API usage tracking
- System health monitoring

## Framework Philosophy

### Design Principles

1. **Convention over Configuration**: Sensible defaults with flexibility to override
2. **Security First**: Built-in authentication, authorization, and audit logging
3. **Developer Experience**: Clear patterns, helpful errors, extensive documentation
4. **Production Ready**: Performance, scalability, and reliability considerations
5. **Extensibility**: Easy to add custom functionality without modifying core

### Best Practices Enforced

1. **Separation of Concerns**: Clear layer boundaries
2. **Error Handling**: Consistent error responses with proper HTTP codes
3. **Logging**: Structured logging with trace IDs
4. **Testing**: Framework designed for testability
5. **Code Organization**: Standard project structure

## Technology Stack Summary

### Backend
- **Language**: Go 1.20+
- **Web Framework**: Gin
- **ORM**: GORM
- **Authentication**: JWT
- **Configuration**: Viper
- **CLI**: Cobra
- **Logging**: go-kit/log
- **Tracing**: OpenTelemetry

### Frontend
- **Language**: TypeScript
- **Framework**: React 18
- **Build Tool**: Vite
- **UI Library**: Ant Design 5
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context + React Query
- **i18n**: react-i18next

### Database Support
- SQLite (default, great for development)
- MySQL/MariaDB (production)
- PostgreSQL (production)
- ClickHouse (analytics, optional)

## What Makes EZ-Console Different?

1. **Full-Stack Integration**: Backend and frontend designed to work together seamlessly
2. **Enterprise Features**: RBAC, audit logging, multi-tenancy out-of-the-box
3. **Extensible Core**: Easy to add custom modules without forking
4. **Modern Stack**: Latest versions of Go, React, and supporting libraries
5. **Production Ready**: Used in real-world applications with proven reliability

## Next Steps

- Continue to [Quick Start Guide](./02-quick-start.md) to build your first application
- Review [Backend Development](./03-backend-development.md) for API development
- Explore [Frontend Development](./04-frontend-development.md) for UI creation

## Additional Resources

- **Example Projects**: `/examples` directory in the source code
- **API Documentation**: Swagger UI at `/swagger` endpoint
- **Source Code**: Explore `pkg/` directory for framework internals
- **Community**: GitHub issues and discussions

