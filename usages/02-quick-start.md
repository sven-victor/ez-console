# Quick Start Guide

This guide will help you create your first EZ-Console application in minutes.

## Prerequisites

Ensure you have the following installed:

- **Go**: Version 1.20 or higher
- **Node.js**: Version 18 or higher  
- **pnpm**: Package manager (install via `npm install -g pnpm`)
- **Git**: For cloning repositories

## Step 1: Create Project Structure

Create a new project directory:

```bash
mkdir my-console-app
cd my-console-app
```

Create the basic structure:

```bash
mkdir -p backend/controller backend/service
mkdir -p web/src/pages
```

## Step 2: Initialize Backend

### Create Go Module

```bash
cd backend
go mod init github.com/yourusername/my-console-app
```

### Add Dependencies

```bash
go get github.com/gin-gonic/gin
go get github.com/sven-victor/ez-console@latest
```

### Create Main Entry Point

Create `backend/main.go`:

```go
package main

import (
	_ "github.com/yourusername/my-console-app/controller"
	
	consoleserver "github.com/sven-victor/ez-console/server"
)

var rootCmd = consoleserver.NewCommandServer("my-console-app", "My Console Application")

func main() {
	rootCmd.Execute()
}
```

### Create a Simple Controller

Create `backend/controller/hello.go`:

```go
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/api"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// HelloController handles hello endpoints
type HelloController struct{}

// HelloResponse is the response structure
type HelloResponse struct {
	Message string `json:"message"`
	Time    string `json:"time"`
}

// Hello returns a greeting message
func (c *HelloController) Hello(ctx *gin.Context) {
	name := ctx.DefaultQuery("name", "World")
	
	response := HelloResponse{
		Message: "Hello, " + name + "!",
		Time:    time.Now().Format(time.RFC3339),
	}
	
	util.RespondWithSuccess(ctx, http.StatusOK, response)
}

// RegisterRoutes registers all routes for this controller
func (c *HelloController) RegisterRoutes(router *gin.RouterGroup) {
	router.GET("/hello", c.Hello)
}

// NewHelloController creates a new hello controller
func NewHelloController() *HelloController {
	return &HelloController{}
}

// Register the controller with the framework
func init() {
	api.AddControllers(func(svc *service.Service) api.Controller {
		return NewHelloController()
	})
}
```

### Run the Backend

```bash
go run main.go --global.encrypt-key=12345678
```

The server will start on `http://localhost:8080`.

Test your API:

```bash
curl http://localhost:8080/api/hello
# Output: {"code":"0","data":{"message":"Hello, World!","time":"2024-01-01T12:00:00Z"}}

curl "http://localhost:8080/api/hello?name=John"
# Output: {"code":"0","data":{"message":"Hello, John!","time":"2024-01-01T12:00:00Z"}}
```

## Step 3: Initialize Frontend

### Create Frontend Project

```bash
cd ../web
```

### Create package.json

Create `web/package.json`:

```json
{
  "name": "my-console-app-web",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "ahooks": "^3.9.6",
    "antd": "^5.14.1",
    "ez-console": "github:sven-victor/ez-console.git#v1.7.2&path:web",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.19",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "less": "^4.2.2",
    "typescript": "^5.3.3",
    "vite": "^5.1.0"
  }
}
```

### Install Dependencies

```bash
pnpm install
```

### Create Vite Config

Create `web/vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

### Create TypeScript Config

Create `web/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Create Main App Component

Create `web/src/App.tsx`:

```typescript
import { ConfigProvider } from 'antd';
import { EZApp, i18n, withSuspense } from 'ez-console';
import { lazy } from 'react';

const HelloPage = lazy(() => import('@/pages/HelloPage'));

// Add translations
i18n.addResource('en', 'translation', 'menu.hello', "Hello Page");
i18n.addResource('en', 'translation', 'hello.title', "Hello World");
i18n.addResource('en', 'translation', 'hello.nameLabel', "Your Name");
i18n.addResource('en', 'translation', 'hello.submitButton', "Greet Me");

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        }
      }}
    >
      <EZApp
        basePath='/'
        extraPrivateRoutes={[
          {
            path: '/hello',
            element: withSuspense(HelloPage),
            name: 'hello',
            index: true,
          }
        ]}
      />
    </ConfigProvider>
  );
}
```

### Create Hello Page

Create `web/src/pages/HelloPage.tsx`:

```typescript
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import { useTranslation, apiGet } from 'ez-console';
import { useRequest } from 'ahooks';
import { useState } from 'react';

const { Title, Text } = Typography;

interface HelloResponse {
  message: string;
  time: string;
}

export const HelloPage: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  
  const { data, loading, run } = useRequest(
    () => apiGet<HelloResponse>('/hello', { params: { name } }),
    { manual: true }
  );

  const handleSubmit = () => {
    run();
  };

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>{t('hello.title')}</Title>
        
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label={t('hello.nameLabel')}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('hello.submitButton')}
            </Button>
          </Form.Item>
        </Form>

        {data && (
          <Card type="inner">
            <Space direction="vertical">
              <Text strong>Response:</Text>
              <Text>{data.message}</Text>
              <Text type="secondary">Time: {data.time}</Text>
            </Space>
          </Card>
        )}
      </Space>
    </Card>
  );
};

export default HelloPage;
```

### Create Entry Point

Create `web/src/main.tsx`:

```typescript
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'ez-console/lib/style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
```

### Create HTML Template

Create `web/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Console App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Run the Frontend

```bash
pnpm dev
```

The frontend will start on `http://localhost:5173`.

## Step 4: Test Your Application

1. **Open your browser** to `http://localhost:5173`
2. **Login** with default credentials:
   - Username: `admin`
   - Password: `admin` (you'll be prompted to change it)
3. **Navigate** to the Hello page from the menu
4. **Test** the API integration

## Project Structure

Your project should now look like this:

```
my-console-app/
├── backend/
│   ├── controller/
│   │   └── hello.go
│   ├── main.go
│   ├── go.mod
│   └── go.sum
└── web/
    ├── src/
    │   ├── pages/
    │   │   └── HelloPage.tsx
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Common Configuration Options

### Backend Configuration

Create `config.yml` in the backend directory:

```yaml
server:
  host: "0.0.0.0"
  port: 8080
  mode: "debug"

database:
  driver: "sqlite"
  path: "my-console-app.db"

log:
  level: "debug"
  format: "json"
```

Run with config file:

```bash
go run main.go --global.encrypt-key=12345678 --config config.yml
```

### Environment Variables

You can also use environment variables:

```bash
export SERVER_PORT=9090
export DATABASE_DRIVER=mysql
export DATABASE_HOST=localhost
export DATABASE_USERNAME=root
export DATABASE_PASSWORD=password
export LOG_LEVEL=info

go run main.go --global.encrypt-key=12345678
```

## Next Steps

Now that you have a working application:

1. **Add More APIs**: Learn about [Backend Development](./03-backend-development.md)
2. **Create UI Components**: Explore [Frontend Development](./04-frontend-development.md)
3. **Configure Database**: See [Database & Models](./06-database-models.md)
4. **Add Authentication**: Review [Authentication & Authorization](./07-auth-system.md)
5. **Deploy**: Check out [Deployment Guide](./12-deployment.md)

## Troubleshooting

### Backend won't start

- Check if port 8080 is already in use
- Ensure Go modules are downloaded: `go mod download`
- Verify encryption key is 8, 16, 24, or 32 bytes

### Frontend won't connect

- Ensure backend is running on port 8080
- Check Vite proxy configuration
- Verify CORS settings

### Build errors

- Clear Go module cache: `go clean -modcache`
- Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
- Ensure you're using correct versions of dependencies

## Additional Resources

- [Backend API Demo](../demo/backend/)
- [Frontend Component Demo](../demo/web/)
- [Configuration Reference](./05-configuration.md)
- [API Documentation](http://localhost:8080/swagger)


