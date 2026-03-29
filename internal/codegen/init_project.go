// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package codegen

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"text/template"
)

// InitProjectOptions configures scaffold output.
type InitProjectOptions struct {
	TargetDir      string // project root (created if missing)
	ServiceName    string // first argument to NewCommandServer (e.g. my-console-app)
	GoModule       string // module path for backend/go.mod
	AppVersion     string // app semver for main.go (e.g. 0.1.0)
	EzConsoleGoMod string // require version e.g. v1.12.0
	EzConsoleNPM   string // npm semver e.g. ^1.12.0 (derived from EzConsoleGoMod if empty)
	AppDescription string
}

// InitProject writes a minimal backend + web workspace under TargetDir.
func InitProject(opts InitProjectOptions) error {
	if opts.TargetDir == "" {
		return fmt.Errorf("target directory is required")
	}
	if opts.ServiceName == "" {
		return fmt.Errorf("service name is required")
	}
	if opts.GoModule == "" {
		return fmt.Errorf("go module path is required")
	}
	if opts.AppVersion == "" {
		opts.AppVersion = "0.1.0"
	}
	if opts.EzConsoleGoMod == "" {
		opts.EzConsoleGoMod = "v1.12.0"
	}
	npmVer := opts.EzConsoleNPM
	if npmVer == "" {
		npmVer = npmCaretVersion(opts.EzConsoleGoMod)
	}
	opts.EzConsoleNPM = npmVer
	if opts.AppDescription == "" {
		opts.AppDescription = "EZ-Console application"
	}

	root, err := filepath.Abs(opts.TargetDir)
	if err != nil {
		return err
	}
	if err := os.MkdirAll(root, 0o755); err != nil {
		return err
	}

	files := map[string]string{
		"Makefile":                      tplMakefile,
		"backend/config.yaml":           tplConfigYAML,
		"backend/go.mod":                tplGoMod,
		"backend/main.go":               tplMainGo,
		"backend/controller/api.go":     tplControllerAPI,
		"backend/service/service.go":    tplServiceGo,
		"web/package.json":              tplPackageJSON,
		"web/vite.config.ts":            tplViteConfig,
		"web/tsconfig.json":             tplTSConfig,
		"web/tsconfig.node.json":        tplTSConfigNode,
		"web/index.html":                tplIndexHTML,
		"web/src/main.tsx":              tplMainTSX,
		"web/src/App.tsx":               tplAppTSX,
		"web/src/pages/WelcomePage.tsx": tplWelcomePage,
		"web/src/vite-env.d.ts":         tplViteEnv,
	}

	tdata := opts
	for rel, content := range files {
		out := filepath.Join(root, rel)
		if err := os.MkdirAll(filepath.Dir(out), 0o755); err != nil {
			return err
		}
		tmpl, err := template.New(rel).Parse(content)
		if err != nil {
			return fmt.Errorf("parse template %s: %w", rel, err)
		}
		var sb strings.Builder
		if err := tmpl.Execute(&sb, tdata); err != nil {
			return fmt.Errorf("execute template %s: %w", rel, err)
		}
		if err := os.WriteFile(out, []byte(sb.String()), 0o644); err != nil {
			return err
		}
	}
	return nil
}

func npmCaretVersion(goModVer string) string {
	v := strings.TrimPrefix(strings.TrimSpace(goModVer), "v")
	if v == "" {
		return "^1.12.0"
	}
	return "^" + v
}

const tplMakefile = `# Minimal build: frontend dist + backend binary
.PHONY: build clean web-install web-build backend-build

WEB_DIR := web
BACKEND_DIR := backend

build: web-build backend-build

web-install:
	cd $(WEB_DIR) && pnpm install

web-build: web-install
	cd $(WEB_DIR) && pnpm run build

backend-build:
	cd $(BACKEND_DIR) && go mod tidy && go build -o dist/server .

clean:
	rm -rf $(WEB_DIR)/dist $(BACKEND_DIR)/dist
`

const tplConfigYAML = `server:
  port: 8080
  host: "0.0.0.0"
  mode: "debug"

database:
  driver: sqlite
  path: "{{.ServiceName}}.db"
`

const tplGoMod = `module {{.GoModule}}

go 1.24.4

require github.com/sven-victor/ez-console {{.EzConsoleGoMod}}

// Uncomment when developing against a local ez-console checkout:
// replace github.com/sven-victor/ez-console => ../../ez-console
`

const tplMainGo = `// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	_ "{{.GoModule}}/controller"

	consoleserver "github.com/sven-victor/ez-console/server"
)

var rootCmd = consoleserver.NewCommandServer("{{.ServiceName}}", "{{.AppVersion}}", "{{.AppDescription}}")

func main() {
	rootCmd.Execute()
}
`

const tplControllerAPI = `// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package controller

import (
	"context"
	"net/http"

	"{{.GoModule}}/service"
	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-console/server"
)

type APIController struct {
	svc *service.WelcomeService
}

func NewAPIController() *APIController {
	return &APIController{svc: service.NewWelcomeService()}
}

func (c *APIController) Ping(ctx *gin.Context) {
	util.RespondWithSuccess(ctx, http.StatusOK, map[string]any{"message": "ok"})
}

func (c *APIController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	router.GET("/ping", c.Ping)
}

func init() {
	server.RegisterControllers(func(ctx context.Context, svc server.Service) server.Controller {
		return NewAPIController()
	})
}
`

const tplServiceGo = `// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package service

type WelcomeService struct{}

func NewWelcomeService() *WelcomeService {
	return &WelcomeService{}
}
`

const tplPackageJSON = `{
  "name": "{{.ServiceName}}-web",
  "private": true,
  "version": "{{.AppVersion}}",
  "type": "module",
  "scripts": {
    "start": "vite",
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@ant-design/icons": "^6.0.0",
    "ahooks": "^3.9.5",
    "antd": "~5.25.3",
    "antd-style": "^3.7.1",
    "axios": "^1.6.7",
    "classnames": "^2.5.1",
    "dayjs": "^1.11.10",
    "ez-console": "{{.EzConsoleNPM}}",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "i18next": ">=25.0.0",
    "react-i18next": ">=15.4.1",
    "react-query": "^3.39.3",
    "react-router-dom": "^6.8.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.27",
    "@types/react-dom": "^18.3.5",
    "@types/react-syntax-highlighter": "^15.5.13",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
`

const tplViteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/console': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
`

const tplTSConfig = `{
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
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`

const tplTSConfigNode = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`

const tplIndexHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{.ServiceName}}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

const tplMainTSX = `import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'ez-console/lib/style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
`

const tplAppTSX = `import { ConfigProvider } from 'antd'
import { EZApp, i18n, withSuspense } from 'ez-console'
import { lazy } from 'react'

const WelcomePage = lazy(() => import('@/pages/WelcomePage'))

i18n.addResource('en', 'translation', 'menu.welcome', 'Welcome')

export default function App() {
  return (
    <ConfigProvider>
      <EZApp
        basePath="/"
        extraPrivateRoutes={[
          {
            path: '/welcome',
            element: withSuspense(WelcomePage),
            name: 'welcome',
            index: true,
          },
        ]}
      />
    </ConfigProvider>
  )
}
`

const tplWelcomePage = `import { Card, Typography } from 'antd'
import { useTranslation } from 'ez-console'

export default function WelcomePage() {
  const { i18n } = useTranslation()
  return (
    <Card title={i18n.t('menu.welcome', { defaultValue: 'Welcome' })}>
      <Typography.Paragraph>
        Run the backend with <code>go run main.go</code> in <code>backend/</code> and the UI with{' '}
        <code>pnpm run start</code> in <code>web/</code>.
      </Typography.Paragraph>
    </Card>
  )
}
`

const tplViteEnv = `/// <reference types="vite/client" />
`
