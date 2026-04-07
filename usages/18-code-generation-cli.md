# Code generation and project scaffolding CLI

This guide describes the **`generate`** subcommand (Controller / Model / Service stubs) and the **`init`** subcommand (minimal full-stack project scaffold) shipped with the `ez-console` binary.

> **Note:** Under the current root command, the HTTP server is started via the **`ez-console`** nested subcommand (for example: `ez-console ez-console`). The **`generate`** and **`init`** subcommands are siblings of that server command.

## Prerequisites

- **Go** installed (preferably the same major/minor as this repository’s `go.mod`).
- **Node.js** and **pnpm** when using **`init`** or building the web app.
- For **`generate`**, run from a directory tree that contains a **`go.mod`** (or pass **`--dir`** pointing into that tree) so the tool can resolve the module path and default imports.

## Command summary

| Command | Purpose |
|--------|---------|
| `ez-console generate controller <Name>` | Generate a REST-style controller and route registration |
| `ez-console generate model <Name>` | Generate a GORM model with a UUID primary key |
| `ez-console generate service <Name>` | Generate a service stub using `pkg/db` |
| `ez-console init <target-dir>` | Scaffold a minimal buildable backend + web project |

Help:

```bash
ez-console generate --help
ez-console generate controller --help
ez-console init --help
```

---

## `ez-console init`: scaffold a project

Creates a minimal layout aligned with [demo/sample](../demo/sample): a root **Makefile**, **`backend/`** (Go), and **`web/`** (Vite + React + the `ez-console` npm package).

### Usage

```bash
ez-console init <target-dir> --name <service-name> --go-module <go-module-path> [optional flags]
```

### Required arguments

| Argument / flag | Meaning |
|-----------------|--------|
| `<target-dir>` | Project root (created if it does not exist) |
| `--name` | Service name passed to `NewCommandServer`; also used for the default SQLite file name (see generated `backend/config.yaml`) |
| `--go-module` | The **`go.mod` module path** for **backend**, e.g. `example.com/myapp/backend` |

### Optional flags

| Flag | Default | Meaning |
|------|---------|--------|
| `--app-version` | `0.1.0` | Application version (written to `main.go` and `web/package.json`) |
| `--ez-console-version` | `v1.13.0` | Version of the Go module `github.com/sven-victor/ez-console` |
| `--description` | (built-in short text) | Short string passed to `NewCommandServer` |

### What gets generated

- **Project root:** `Makefile` — `make build` runs `pnpm install` + web build and compiles the backend to `backend/dist/server`.
- **backend/:** `main.go`, `go.mod`, `config.yaml`, sample `controller` and `service` packages.
- **web/:** `package.json` (includes **`pnpm run start`**, which runs Vite), `vite.config.ts` with **`server.proxy`** for **`/api`** and **`/console`** to `http://localhost:8080`, and a minimal `EZApp` page under `src/`.

### Typical steps after `init`

1. **To develop against a local ez-console checkout**, uncomment and adjust the `replace` directive in `backend/go.mod`, for example:

   ```go
   replace github.com/sven-victor/ez-console => /path/to/ez-console
   ```

   Then run `go mod tidy` in `backend/`.

2. **Build everything** from the project root:

   ```bash
   make build
   ```

3. **Run the backend** from `backend/` (uses `config.yaml` in the same directory by default):

   ```bash
   go run main.go
   ```

4. **Run the frontend dev server** from `web/`:

   ```bash
   pnpm install   # first time only
   pnpm run start
   ```

---

## `ez-console generate`: backend stubs

The entity **`<Name>`** must be **PascalCase** (e.g. `Product`). The tool derives:

- **Plural** type/method suffix (e.g. `Product` → `Products` for `ListProducts`).
- **Resource** path segment (snake_case plural for the route group, e.g. `products`).
- **Table** suffix (snake_case singular, e.g. `t_product`).
- **Short** receiver name (usually the lowercased first letter).

### Subcommands

```bash
ez-console generate controller <Name>
ez-console generate model <Name>
ez-console generate service <Name>
```

### Shared flags (on `generate`)

| Flag | Short | Default | Meaning |
|------|-------|---------|--------|
| `--dir` | | `.` | Base directory for finding `go.mod` and for default output paths |
| `--output` | `-o` | (derived) | Output file path |
| `--module` | | (from `go.mod`) | Override the Go module path used when resolving imports |
| `--model-import` | | (derived) | Override the import path for the model package |
| `--service-import` | | (derived) | Override the import path for the service package |

### Default output path

If `-o` / `--output` is omitted:

```text
<dir>/<kind>/<snake>.go
```

where `<kind>` is `controller`, `model`, or `service`, and `<snake>` is the snake_case entity name (e.g. `product`).

### Default import path rules

If **`--model-import`** and **`--service-import`** are not set, the tool assumes **model** and **service** live as **sibling** directories of the **package directory** of the generated file. For example, output `.../backend/controller/foo.go` implies model at `.../backend/model` and service at `.../backend/service`.

For other layouts (e.g. monorepo `pkg/model`), set those flags explicitly.

### Generated code expectations

- **Controller:** Registers with `RegisterRoutes` on the `/api` group, so routes are under **`/api/<resource>`**; uses `pkg/util` response helpers.
- **Model:** Uses `google/uuid` and `gorm.io/gorm`; `BeforeCreate` sets `ID` if empty.
- **Service:** Uses `github.com/sven-victor/ez-console/pkg/db` **`Session(ctx)`**; the process must initialize the framework database configuration at runtime.

After generation, add fields, validation, permissions, and Swag comments yourself. For frontend integration, follow the **OpenAPI / openapi2ts** workflow ([API Best Practices](./09-api-best-practices.md)).

---

## Implementation map (maintainers)

| Area | Location |
|------|----------|
| Cobra registration | `cmd/generate.go`, `cmd/init.go` (`rootCmd.AddCommand` in `init()`) |
| Logic and templates | `internal/codegen/` |
| Text templates | `internal/codegen/templates/*.tpl` |
| Unit tests | `internal/codegen/codegen_test.go` |

---

## FAQ

**Q: After `init`, `go build` cannot fetch `github.com/sven-victor/ez-console`?**  
A: Check network and the version flag; for local development, add a `replace` in `go.mod` pointing at your clone.

**Q: `generate` fails because `go.mod` was not found?**  
A: Run from inside the module (or set `--dir` to any path under the module root; the tool walks upward to find `go.mod`).

**Q: Does the CLI generate React list pages?**  
A: No — there is no `generate component` yet. Extend the UI using [Frontend Development](./04-frontend-development.md) and the OpenAPI workflow.
