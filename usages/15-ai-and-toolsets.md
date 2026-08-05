# AI and Toolsets

This guide covers the AI model integration and toolsets functionality in EZ-Console, including how to use built-in providers, register custom implementations, and integrate with the frontend chat UI.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [AI Models](#ai-models)
  - [Built-in AI Providers](#built-in-ai-providers)
  - [Model-Level Chat Settings](#model-level-chat-settings)
  - [Using AI Models](#using-ai-models)
  - [Registering Custom AI Models](#registering-custom-ai-models)
  - [AIClientFactoryV2 (JSON Schema)](#aiclientfactoryv2-json-schema)
- [Toolsets](#toolsets)
  - [Tool Name Prefixing](#tool-name-prefixing)
  - [Built-in Toolsets](#built-in-toolsets)
  - [Default (preset) toolsets and skills](#default-preset-toolsets-and-skills)
  - [Companion Skills](#companion-skills)
  - [Using Toolsets](#using-toolsets)
  - [Registering Custom Toolsets](#registering-custom-toolsets)
  - [ToolSetFactoryV2 (JSON Schema)](#toolsetfactoryv2-json-schema)
  - [RBAC Tool Permissions](#rbac-tool-permissions)
  - [Console as MCP Server](#console-as-mcp-server)
- [Skills System](#skills-system)
  - [Skill Structure](#skill-structure)
  - [Skill Domains](#skill-domains)
  - [Progressive Skill Loading](#progressive-skill-loading)
- [Client Tools](#client-tools)
  - [How Client Tools Work](#how-client-tools-work)
  - [Registering Client Tools in the Frontend](#registering-client-tools-in-the-frontend)
  - [Server-Side Client Tool Handling](#server-side-client-tool-handling)
- [Chat Sessions & Streaming](#chat-sessions--streaming)
  - [Session Management](#session-management)
  - [SSE Streaming Protocol](#sse-streaming-protocol)
  - [Chat Completion Options](#chat-completion-options)
- [Auto-Summarization](#auto-summarization)
- [Debug Tracing](#debug-tracing)
- [JSON Schema Configuration Forms](#json-schema-configuration-forms)
  - [Overview](#json-schema-form-overview)
  - [How It Works End-to-End](#how-it-works-end-to-end)
  - [Schema Extensions (x-ui-* Tags)](#schema-extensions-x-ui--tags)
  - [UI Schema and Layout](#ui-schema-and-layout)
  - [Custom Widgets](#custom-widgets)
  - [Using JsonSchemaConfigForm in Pages](#using-jsonschemaconfigform-in-pages)
- [Frontend Integration](#frontend-integration)
  - [AIContext](#aicontext)
  - [AIChat Component](#aichat-component)
  - [Page-Level AI Integration](#page-level-ai-integration)
- [Integration Examples](#integration-examples)
- [Best Practices](#best-practices)

## Overview

EZ-Console provides a flexible AI integration system that allows you to:

- **Connect multiple AI providers**: Built-in OpenAI-compatible, Anthropic, and Gemini providers (via [ez-agent](https://github.com/sven-victor/ez-agent)); extensible to custom providers
- **ez-agent runtime**: Chat completions run on ez-agent (`Agent.Run` / `RunStream`) for the tool loop, session memory, summarization, hooks, and HITL interrupters
- **Server-side tool calling**: Role-authorized toolsets (MCP, utils, custom) plus optional progressive skill–tool binding
- **Client-side tool calling**: Browser-executed `ui_*` tools via HITL handoff (`client_tool_pending`)
- **Streaming responses**: Real-time SSE chat with content deltas and client-tool control events
- **Skills system**: Markdown instruction packs (`SKILL.md`) with on-demand `get_skill_content` loading
- **Auto-summarization**: ez-agent memory policies (robust one-shot + segmented fallback, optional offload)
- **Dual MCP roles**: Consume remote MCP servers as toolsets, and expose authorized tools at `/api/mcp`
- **Multi-tenancy**: Organization-scoped models/toolsets, RBAC tool permissions, companion skills for non-preset toolsets
- **Session management**: DB-backed ez-agent `SessionStore`, auto titles, configurable retention
- **Debug tracing**: Optional global AI trace events (LLM/tool/token/summary) via ez-agent hooks
- **Extensibility**: Factory registration for providers (`aimodel.Provider`) and toolsets

## Architecture

The AI system follows a layered architecture. Chat orchestration is **ez-agent–driven**; console code adapts toolsets, sessions, skills, and SSE to that runtime.

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (React)                           │
│  AIContext · AIChat.tsx · registerPageAI (ui_* tools)         │
│                           │ SSE / REST                        │
├───────────────────────────┼──────────────────────────────────┤
│                    API Layer (Gin)                            │
│  pkg/api/ai/   — models, chat sessions (SSE), trace           │
│  pkg/api/system/ — toolsets, skills (+ AI tool bindings)      │
│  pkg/api/mcp/  — Streamable HTTP MCP server (authorized tools)│
├───────────────────────────┼──────────────────────────────────┤
│                   Service Layer                               │
│  AIChatService · AISessionService · AIModelService            │
│  ToolSetService · SkillService · AITraceService               │
├───────────────────────────┼──────────────────────────────────┤
│               AI Client Layer (pkg/clients/ai/)               │
│  ┌────────────────────┐  ┌─────────────────────────────────┐ │
│  │ aimodel.Provider   │  │ ClassicChatClient               │ │
│  │ (OpenAI/Anthropic/ │  │ Exchange / ExchangeStream       │ │
│  │  Gemini factories) │  │  → ez-agent Agent.Run(Stream)   │ │
│  └────────────────────┘  │  toolSetsRegistry · HITL        │ │
│                          │  SessionStore · hooks · summarize│ │
│                          └─────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│  Toolset Layer (pkg/toolset/) + adapters                     │
│  ToolSets map  · MCP · Utils · SkillLoader · SkillDriven     │
│  ClientToolsProxy (`ui`) · BindingAware wrappers             │
└──────────────────────────────────────────────────────────────┘
```

**Chat stream path (production):**

```
POST /api/ai/chat/sessions/:id  (content | client_tool_results)
  → CreateSkillLoader(domains+skill_ids+activated)  // always appends core, chat
  → mergeAIChatClientOptions
       GetAuthorizedToolSets (RBAC)
       + skill_loader toolset when skills present
       + RefreshToolSetsEachIteration if system_enable_skill_tool_binding
  → ClassicChatClient.ExchangeStream
       PrepareChatCompletionSkillLoader (metadata / SkillDrivenToolset)
       ez-agent Agent.RunStream
         toolSetsRegistry (live Specs/Lookup)
         UI HITL interrupter · SessionStore · summarize · hooks
  → SSE: content | client_tool_pending | error
     (raw tool_call events are produced internally but not forwarded by the controller)
```

**Permission layers (outer → inner):**

1. Role AI tool permissions (`t_role_ai_tool_permissions`)
2. Toolset `config.disabled_tools` (logical names hidden/blocked)
3. Skill AI tool bindings — only when `system_enable_skill_tool_binding` is on and the request has a skill loader with skills
4. Client tools (`ui_*`) — browser HITL; not subject to role toolset RBAC

**Key concepts:**

- Provider factories return `aimodel.Provider` (ez-agent). `ClassicChatClient` wraps the provider and runs `Exchange` / `ExchangeStream` via ez-agent.
- `ToolSets` is `map[string]ToolSet`. Production map keys are **`{type}{gorm numeric id}`** (e.g. `utils1`, `mcp3`), not the type name alone. Exposed tool names are `{key}_{logicalName}` (e.g. `utils1_now`). See [Tool Name Prefixing](#tool-name-prefixing).
- Skill progressive binding uses `SkillDrivenToolset` when binding is enabled; otherwise skills only inject metadata + `get_skill_content`.
- SSE event types: `content`, `tool_call` (internal), `error`, `client_tool_pending`.

## AI Models

### Built-in AI Providers

Providers are registered in `pkg/clients/ai/` and create ez-agent `aimodel.Provider` instances. Secrets in config (`api_key`, etc.) are encrypted at rest.

#### OpenAI Provider (`openai`)

Supports any OpenAI-compatible API (OpenAI, Azure OpenAI, local LLMs with OpenAI-compatible endpoints).

Configuration fields (provider `config` JSON):

- `api_key` (required, password): API key
- `model_id` (required, string): Model identifier (e.g. `gpt-4`, `gpt-3.5-turbo`)
- `base_url` (optional, string): Custom endpoint (defaults to OpenAI)
- `organization_id` (optional, string): OpenAI organization ID

#### Anthropic Provider (`anthropic`)

Claude models via the Anthropic API (ez-agent Anthropic package).

- `api_key` (required)
- `model_id` (required) — e.g. `claude-sonnet-4-20250514`
- `base_url` (optional)

#### Gemini Provider (`gemini`)

Google Gemini via the ez-agent Gemini package.

- `api_key` (required)
- `model_id` (required) — e.g. `gemini-2.0-flash`
- `base_url` (optional)

### Model-Level Chat Settings

These fields live on the **`AIModel` row** (`t_ai_models`), not inside provider `config` (legacy `config.system_prompt` / `config.max_tokens` are still read as fallbacks):

| Field | Meaning |
|-------|---------|
| `system_prompt` | Prepended to every conversation (applied via `WithChatModelSystemPrompt`) |
| `max_chat_tokens` | Context window for auto-summarization / token limits; `0` = unset (legacy `config.max_tokens` may apply) |
| `max_chat_iterations` | Max tool-loop turns; `0` = client default (**10**) |

`AIChatService` merges these into chat options before caller overrides (`withAIModelChatTokenAndIterationOptions`).

### Using AI Models

#### 1. Create an AI Model via API

```http
POST /api/ai/models
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "GPT-4 Model",
  "description": "Production GPT-4 model",
  "provider": "openai",
  "config": {
    "api_key": "sk-...",
    "model_id": "gpt-4",
    "base_url": "https://api.openai.com/v1"
  },
  "system_prompt": "You are a helpful assistant.",
  "max_chat_tokens": 128000,
  "max_chat_iterations": 10,
  "is_default": true
}
```

#### 2. Using AI Models in Your Code

The typical pattern is to use `AIChatService` which resolves the model, creates the client, and injects authorized toolsets automatically:

```go
package main

import (
    "context"
    "fmt"
    "github.com/sven-victor/ez-console/pkg/service"
    "github.com/sven-victor/ez-console/pkg/clients/ai"
    "github.com/sven-victor/ez-console/pkg/model"
)

func useAIModel(ctx context.Context, svc *service.Service) error {
    organizationID := "org-123"

    messages := []ai.ChatMessage{
        {
            Role:    model.AIChatMessageRoleSystem,
            Content: "You are a helpful assistant.",
        },
        {
            Role:    model.AIChatMessageRoleUser,
            Content: "Hello! How are you?",
        },
    }

    // Non-streaming completion without toolsets
    responses, err := svc.CreateChatCompletionWithoutToolSets(ctx, organizationID, "", messages)
    if err != nil {
        return err
    }
    for _, resp := range responses {
        fmt.Printf("Role: %s, Content: %s\n", resp.Role, resp.Content)
    }

    // Non-streaming completion with toolsets (auto-injects authorized toolsets)
    // Pass nil for skillLoader when skills are not needed
    responses, err = svc.CreateChatCompletion(ctx, organizationID, "", messages, nil)
    if err != nil {
        return err
    }
    for _, resp := range responses {
        fmt.Printf("Role: %s, Content: %s\n", resp.Role, resp.Content)
    }

    return nil
}
```

#### 3. Low-Level Client Usage

If you need direct access to the AI client:

```go
func useLowLevelClient(ctx context.Context) error {
    organizationID := "org-123"

    // Get the default AI model
    aiModelSvc := service.NewAIModelService(ctx, nil)
    aiModel, err := aiModelSvc.GetDefaultAIModel(ctx, organizationID)
    if err != nil {
        return err
    }

    // Get the factory (returns ClassicChatClientFactory)
    factory, exists := ai.GetFactory(aiModel.Provider)
    if !exists {
        return fmt.Errorf("unsupported provider: %s", aiModel.Provider)
    }

    // Create the ClassicChatClient
    client, err := factory.CreateClient(ctx, organizationID, aiModel.Config)
    if err != nil {
        return err
    }

    messages := []ai.ChatMessage{
        {Role: model.AIChatMessageRoleUser, Content: "Tell me a joke"},
    }

    // Exchange: ez-agent agent run (tools, session, summarization via options)
    responses, err := client.Exchange(ctx, messages,
        ai.WithChatMaxIterations(10),
        ai.WithChatMaxTokens(4000),
        ai.WithChatAutoSummarization(true),
    )
    if err != nil {
        return err
    }
    for _, resp := range responses {
        fmt.Printf("Response: %s\n", resp.Content)
    }

    return nil
}
```

#### 4. Streaming Chat Completion

```go
func streamAIChat(ctx context.Context, svc *service.Service) error {
    organizationID := "org-123"

    messages := []ai.ChatMessage{
        {Role: model.AIChatMessageRoleUser, Content: "Tell me a story"},
    }

    // Pass nil for skillLoader when skills are not needed
    stream, err := svc.CreateChatCompletionStream(ctx, organizationID, "", messages, nil)
    if err != nil {
        return err
    }
    defer stream.Close()

    for {
        event, err := stream.Recv(ctx)
        if err != nil {
            if err == io.EOF {
                break
            }
            return err
        }

        switch event.EventType {
        case ai.EventTypeContent:
            fmt.Print(event.Content)
        case ai.EventTypeToolCall:
            for _, toolCall := range event.ToolCalls {
                fmt.Printf("[Tool: %s, Status: %s]\n",
                    toolCall.Function.Name, toolCall.Status)
            }
        case ai.EventTypeClientToolPending:
            fmt.Printf("Waiting for client tools: %v\n", event.ClientToolCalls)
        case ai.EventTypeError:
            fmt.Printf("Error: %s\n", event.Content)
        }
    }
    return nil
}
```

### Registering Custom AI Models

To register a custom provider, implement `AIClientFactory` so `CreateClient` returns an ez-agent `aimodel.Provider`. `ClassicChatClient` then wraps that provider and runs the agent loop for you.

Legacy `AIClient` (`Chat` / `ChatStream`) still exists for specialized helpers (e.g. tool-result summarization), but **new providers should implement `aimodel.Provider`** (`Complete`, `Stream`, `Caps`, `Name`).

#### Step 1: Implement an ez-agent Provider (or adapter)

```go
package customai

import (
    "context"

    "github.com/sven-victor/ez-agent/event"
    aimodel "github.com/sven-victor/ez-agent/model"
)

// CustomProvider implements aimodel.Provider for your API.
type CustomProvider struct {
    apiKey   string
    endpoint string
    modelID  string
}

func (c *CustomProvider) Name() string { return "custom" }

func (c *CustomProvider) Caps() aimodel.Capabilities {
    return aimodel.Capabilities{ /* fill as appropriate */ }
}

func (c *CustomProvider) Complete(ctx context.Context, req aimodel.Request) (aimodel.Result, error) {
    // Map req to your API; return Result with assistant message / tool calls
    return aimodel.Result{}, nil
}

func (c *CustomProvider) Stream(ctx context.Context, req aimodel.Request, yield func(event.Event) error) (aimodel.Result, error) {
    // Stream deltas via yield(event.ModelDelta{...}); return final Result
    return aimodel.Result{}, nil
}
```

`ClassicChatClient.Exchange` / `ExchangeStream` call ez-agent `Agent.Run` / `RunStream` on top of your provider (tool registry, HITL, session store, summarization, hooks).

#### Step 2: Implement AIClientFactory Interface

```go
package customai

import (
    "context"
    "fmt"

    aimodel "github.com/sven-victor/ez-agent/model"
    "github.com/sven-victor/ez-console/pkg/clients/ai"
    "github.com/sven-victor/ez-console/pkg/util"
)

type CustomAIClientFactory struct{}

func (f *CustomAIClientFactory) GetName() string {
    return "Custom AI"
}

func (f *CustomAIClientFactory) GetDescription() string {
    return "Custom AI provider implementation"
}

func (f *CustomAIClientFactory) GetConfigFields() []util.ConfigField {
    return []util.ConfigField{
        {
            Name:        "api_key",
            DisplayName: "API Key",
            Description: "Your API key",
            Type:        util.FieldTypePassword,
            Required:    true,
        },
        {
            Name:        "endpoint",
            DisplayName: "API Endpoint",
            Description: "API endpoint URL",
            Type:        util.FieldTypeString,
            Required:    true,
            Placeholder: "https://api.example.com/v1",
        },
        {
            Name:        "model_id",
            DisplayName: "Model ID",
            Description: "Model identifier",
            Type:        util.FieldTypeString,
            Required:    true,
        },
    }
}

func (f *CustomAIClientFactory) CreateClient(ctx context.Context, organizationID string, config map[string]interface{}) (aimodel.Provider, error) {
    apiKey, _ := config["api_key"].(string)
    endpoint, _ := config["endpoint"].(string)
    modelID, _ := config["model_id"].(string)

    if apiKey == "" || endpoint == "" || modelID == "" {
        return nil, fmt.Errorf("api_key, endpoint, and model_id are required")
    }

    return &CustomProvider{
        apiKey:   apiKey,
        endpoint: endpoint,
        modelID:  modelID,
    }, nil
}
```

#### Step 3: Register the Factory

```go
package customai

import (
    "github.com/sven-victor/ez-console/pkg/clients/ai"
    "github.com/sven-victor/ez-console/pkg/model"
)

const AIModelProviderCustom model.AIModelProvider = "custom"

func init() {
    if err := ai.RegisterFactory(AIModelProviderCustom, &CustomAIClientFactory{}); err != nil {
        panic(err)
    }
}
```

#### Step 4: Import in Your Main Application

```go
package main

import (
    _ "your-module/customai"  // Import to trigger init()
    "github.com/sven-victor/ez-console/server"
)

func main() {
    server.Start()
}
```

### AIClientFactoryV2 (JSON Schema)

`AIClientFactoryV2` extends `AIClientFactory` by adding a `GetConfigSchema()` method that returns a full JSON Schema (plus an optional UI schema). When a factory implements this interface, the service layer uses the JSON Schema directly for the frontend form; otherwise it falls back to converting the legacy `GetConfigFields()` to JSON Schema via `util.ConfigFieldsToJSONSchema`.

**Interface definition** (`pkg/clients/ai/client.go`):

```go
type AIClientFactoryV2 interface {
    AIClientFactory
    GetConfigSchema() (schema *jsonschema.Schema, uiSchema map[string]any, err error)
}
```

**Why use V2?** The legacy `ConfigField`-based approach supports only flat field lists with limited type/widget options. JSON Schema gives you:

- Struct tag–based schema generation via `jsonschema.Reflect()` — single source of truth between config struct and frontend form.
- Rich validation: `required`, `enum`, `format`, `minLength`, `maxLength`, `pattern`, `minimum`, `maximum`, `default`.
- Custom UI extensions via `jsonschema_extras` struct tags (e.g. `x-ui-widget=textarea`, `x-ui-placeholder=...`).
- Conditional fields via `dependencies` / `oneOf`.
- Complex layout via a separate `uiSchema` with grid-based positioning.

#### Implementing AIClientFactoryV2

**Step 1: Define a config struct with `jsonschema` tags**

```go
type OpenAIConfig struct {
    APIKey         string `json:"api_key"          jsonschema:"description=OpenAI API key (encrypted),format=password"`
    ModelID        string `json:"model_id"         jsonschema:"description=OpenAI model ID (e.g.\\, gpt-4\\, gpt-3.5-turbo)"`
    BaseURL        string `json:"base_url,omitempty"         jsonschema:"description=Custom API endpoint URL (optional)"`
    OrganizationID string `json:"organization_id,omitempty"  jsonschema:"description=OpenAI organization ID (optional)"`
}
```

> **Note:** `system_prompt`, `max_chat_tokens`, and `max_chat_iterations` are model-level fields on `AIModel`, not part of the OpenAI provider config schema.

Key struct tag syntax (`github.com/invopop/jsonschema`):

| Tag | Purpose | Example |
|-----|---------|---------|
| `jsonschema:"required"` | Mark field as required | Field appears in `required` array |
| `jsonschema:"description=..."` | Field description | Rendered as help text under the input |
| `jsonschema:"format=password"` | String format | Renders as a password input (`type=password`) |
| `jsonschema:"enum=a,enum=b"` | Enum values | Renders as a select/dropdown |
| `jsonschema:"default=value"` | Default value | Pre-fills the form field |
| `jsonschema_extras:"x-ui-widget=textarea"` | Custom UI extension | Maps to `ui:widget` in RJSF (see [Schema Extensions](#schema-extensions-x-ui--tags)) |
| `jsonschema_extras:"x-ui-placeholder=..."` | Placeholder text | Shown as input placeholder |

**Step 2: Implement GetConfigSchema**

```go
type MyProviderFactory struct{}

func (f *MyProviderFactory) GetConfigSchema() (*jsonschema.Schema, map[string]any, error) {
    schema := jsonschema.Reflect(&OpenAIConfig{})
    // Return nil uiSchema for default layout; or provide a custom one
    return schema, nil, nil
}

// Compile-time interface check
var _ ai.AIClientFactoryV2 = (*MyProviderFactory)(nil)
```

`jsonschema.Reflect()` inspects the struct fields and tags, producing a complete JSON Schema object that the frontend `JsonSchemaConfigForm` can render directly.

**Step 3: Register via RegisterFactoryV2**

```go
func init() {
    ai.RegisterFactoryV2(model.AIModelProviderMyProvider, &MyProviderFactory{})
}
```

`RegisterFactoryV2` is a convenience wrapper around `RegisterFactory` — it stores the factory in the same registry. The difference is at consumption time: `AIModelService.GetAITypeDefinitions` checks if the factory satisfies `AIClientFactoryV2` via type assertion:

```go
if v2, ok := factory.(ai.AIClientFactoryV2); ok {
    schema, uiSchema, err := v2.GetConfigSchema()
    // use JSON Schema directly
} else {
    // fallback: convert GetConfigFields() → JSON Schema
    schema = util.ConfigFieldsToJSONSchema(factory.GetConfigFields())
}
```

The returned `AITypeDefinition` (with `config_schema` and `ui_schema`) is served via `GET /api/ai/models/types` and consumed by the frontend settings page.

#### Keeping GetConfigFields as Fallback

Even when implementing V2, you should still provide `GetConfigFields()` — it serves as documentation and fallback for environments that don't support JSON Schema rendering. The V2 schema takes priority when available.

## Toolsets

Toolsets allow AI models to call external tools and APIs during chat completions. Each toolset is a collection of related tools.

### Tool Name Prefixing

The `ToolSets` type is `map[string]ToolSet`. When tools are exposed to the model, function names are prefixed with the map key:

```
{mapKey}_{logicalToolName}
```

**Production chat** builds map keys as **`{toolsetType}{gorm numeric ID}`** (stable per DB row), for example:

| Map key | Logical tool | Exposed name |
|---------|--------------|--------------|
| `utils1` | `now` | `utils1_now` |
| `mcp3` | `query` | `mcp3_query` |
| `skill_loader` | `get_skill_content` | `skill_loader_get_skill_content` |
| `ui` | (client tools keep `ui_*` names) | `ui_get_page_data` |

RBAC and skill bindings use the **logical** tool name (`now`, `query`, or `*`), not the prefixed name. Role/`toolset_id` references use the toolset **resource UUID** (or type/`*` for skill bindings).

You can also put `disabled_tools: ["sleep"]` in a toolset’s config to hide/block logical tools for that instance.

### Built-in Toolsets

#### 1. Utils Toolset

A simple toolset providing utility functions.

**Available Tools:**

- `now`: Get current time in a specified format (default: RFC3339)
- `sleep`: Sleep for a specified duration (max 60 seconds)
- `random_string`: Generate a random string; parameter `string_length`

**Configuration:** No configuration required.

#### 2. MCP Toolset

Model Context Protocol (MCP) toolset for connecting to MCP-compatible servers.

**Configuration Fields:**

- `endpoint` (required): MCP server endpoint URL
- `protocol` (optional): Transport — **`http`** (Streamable HTTP) or **`sse`** (SSE). The admin form may label SSE as `websocket` in the schema enum historically; runtime accepts `http` and `sse` only.
- `auth_type` (optional): `none`, `basic`, or `bearer`
- `username` / `password` (optional): Basic authentication credentials
- `token` (optional): Bearer token (when `auth_type` is `bearer`)
- `args` (optional): Extra MCP client options as a JSON object. Supported keys:
  - `headers` (or alias `header`): object of HTTP header name → value pairs sent with HTTP/SSE requests
  - `proxy`: proxy URL for HTTP/SSE (`http`, `https`, `socks5`, `socks5h`)
- `disabled_tools` (optional): array of logical tool names to hide from the model

Form-level auth (`username`/`password` or `token`) is applied after `args.headers`, so it overrides an `Authorization` header from `args` when both are set.

**`args` examples:**

```json
{
  "headers": {
    "X-API-Key": "your-api-key",
    "X-Tenant-ID": "tenant-1"
  }
}
```

```json
{
  "proxy": "http://127.0.0.1:7890"
}
```

```json
{
  "headers": {
    "X-Custom-Header": "value"
  },
  "proxy": "socks5://user:pass@127.0.0.1:1080"
}
```

In the admin UI, the Arguments editor exposes these as loadable schema examples.

#### 3. Skill Loader Toolset (Runtime)

An internal toolset injected at runtime when skills are loaded via domains or skill IDs. Not configurable from the admin UI — the production chat handler calls **`SkillService.CreateSkillLoader`** which returns an **`*ai.SkillLoader`**; the skill loader's metadata and `get_skill_content` tool are wired into the chat automatically by `CreateChatCompletionStream` / `CreateChatCompletion`.

**Available Tools:**

- `get_skill_content`: Read the content of a skill by ID, optionally specifying a sub-path. Exposed to the model as **`skill_loader_get_skill_content`** (map key `skill_loader` + tool name).

Production code sets **`skillLoader.OnContentLoaded`** so a successful load updates session **`activated_skill_ids`** (via `AppendSessionActivatedSkill`) when **`system_enable_skill_tool_binding`** is used. See **`usages/16-skills.md`** → *Skills and organization tools loading*.

### Default (preset) toolsets and skills

Besides registering a **factory** with `RegisterToolSet`, the product can declare **preset rows** that are created or reconciled automatically:

- **Per organization**: Each org gets matching **`t_tool_set`** rows for every registered preset toolset (e.g. the built-in **utils** toolset).
- **Global**: Preset **skills** live once in **`t_skill`** (not per org); per-org **AI tool bindings** for those skills are created when missing.

#### When sync runs

- **Server startup**: `Service.SyncPresetResources` runs after the app is up (`server/server.go`). It syncs all preset skills globally, then for **each organization** ensures preset toolsets and default skill bindings exist (`pkg/service/preset_sync.go`).
- **New organization**: After an organization is created, `SyncPresetResourcesForOrganization` runs for that org so preset toolsets and bindings appear without a full restart (`pkg/api/system/organization_controller.go`).

#### How to register presets in code

| API | Purpose |
|-----|---------|
| `preset.RegisterPresetToolSet` / `preset.RegisterPresetTools` | Declare a built-in toolset row (`PresetKey`, `Type`, `Name`, `Description`, optional `DefaultConfig`). Call from `init()` next to `RegisterToolSet` for the same type. |
| `preset.RegisterPresetSkill` | Declare a global preset skill (`PresetKey`, metadata, optional `DefaultBindings` by **toolset type** + tool name or `*`). Call from `init()` (e.g. `pkg/preset/skills_builtin.go`). |

Specs are defined in `pkg/preset/spec.go`; the registry is in `pkg/preset/registry.go`.

#### Shipped defaults (current tree)

1. **Utils toolset (per org)** — registered in `pkg/toolset/utils_toolset.go`:
   - `PresetKey`: `utils`
   - `Type`: `utils`
   - Display name/description: built-in utilities (time, sleep, random string).
   - Rows have **`is_preset = true`**; name, description, type, and missing **DefaultConfig** keys are reconciled on each sync while keeping existing org-specific config values. In the console you can still **enable or disable** the toolset (status); edit and delete are disabled for preset rows (with explanatory tooltips).

2. **“Built-in utilities” skill (global)** — registered in `pkg/preset/skills_builtin.go`:
   - `PresetKey`: `builtin-utils`
   - Domain **`core`**, category **`system`**.
   - Default bindings (when **`system_enable_skill_tool_binding`** is used): toolset type **`utils`**, tool **`*`** (all utils tools). Bindings are stored in **`t_skill_ai_tool_bindings`** with **`toolset_id`** set to the **type string** `utils` (the same column also stores real toolset UUIDs for user-defined bindings). Resolution matches by toolset type or resource ID.

Preset skills can be **enabled or disabled** for AI chat via **`PUT /api/system/skills/:id/status`**; disabled skills are not offered in metadata. See [AI Agent Skills](./16-skills.md) → *Default (preset) skills* for model fields, API summary, and console behavior.

#### Extending

Add another `preset.RegisterPresetTools(...)` (or `RegisterPresetToolSet`) in the same `init()` as your `RegisterToolSet`, and/or `RegisterPresetSkill` in a new `init()` file under `pkg/preset/`. Use a unique `PresetKey` per spec. After code changes, deploy/restart so sync runs.

### Companion Skills

Every **non-preset** toolset automatically gets a **companion skill** (org-scoped, `is_preset=true`, `preset_key=toolset:{toolset_resource_id}`):

- Domain **`chat`**, category **`toolset`**
- SKILL.md describes the toolset and its tools
- Default AI tool binding points at that toolset’s resource ID (`tool_name=*`)
- Created/updated on toolset create/update; deleted when the toolset is deleted
- Synced for an org via `ToolSetService.SyncToolsetCompanionSkillsForOrganization`

When skill–tool binding is enabled and the user activates the companion skill via `get_skill_content`, the model receives that toolset’s tools (subject to RBAC). See also [AI Agent Skills](./16-skills.md).

### Using Toolsets

#### 1. Create a Toolset via API

```http
POST /api/system/toolsets
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "MCP Weather Tools",
  "description": "Weather information tools via MCP",
  "type": "mcp",
  "config": {
    "endpoint": "https://mcp-server.example.com",
    "protocol": "http",
    "auth_type": "bearer",
    "token": "your-token-here",
    "args": {
      "headers": {
        "X-Tenant-ID": "tenant-1"
      },
      "proxy": "socks5://127.0.0.1:1080"
    }
  }
}
```

#### 2. Using Toolsets with AI in Code

```go
func useAIWithToolsets(ctx context.Context, svc *service.Service) error {
    organizationID := "org-123"

    messages := []ai.ChatMessage{
        {Role: model.AIChatMessageRoleUser, Content: "What's the current time?"},
    }

    // Option A: Use CreateChatCompletion which auto-injects authorized toolsets
    // Pass nil for skillLoader when skills are not needed
    responses, err := svc.CreateChatCompletion(ctx, organizationID, "", messages, nil,
        ai.WithChatMaxIterations(10),
    )
    if err != nil {
        return err
    }

    for _, resp := range responses {
        fmt.Printf("Role: %s, Content: %s\n", resp.Role, resp.Content)
    }

    // Option B: Manual toolset injection via provider
    toolSetSvc := service.NewToolSetService()
    toolSets, err := toolSetSvc.GetAuthorizedToolSets(ctx, organizationID)
    if err != nil {
        return err
    }

    responses, err = svc.CreateChatCompletionWithoutToolSets(ctx, organizationID, "", messages,
        ai.WithChatToolSetsProvider(toolset.NewStaticToolSetsProvider(toolSets)),
        ai.WithChatMaxIterations(10),
    )

    return err
}
```

### Registering Custom Toolsets

To create a custom toolset, implement the `ToolSet` and `ToolSetFactory` interfaces.

#### Step 1: Implement ToolSet Interface

```go
package customtoolset

import (
    "context"
    "encoding/json"
    "fmt"

    "github.com/sashabaranov/go-openai"
    "github.com/sashabaranov/go-openai/jsonschema"
    "github.com/sven-victor/ez-console/pkg/toolset"
)

type CustomToolSet struct {
    apiKey   string
    endpoint string
}

func (t *CustomToolSet) GetName() string        { return "custom-toolset" }
func (t *CustomToolSet) GetDescription() string  { return "Custom toolset implementation" }

func (t *CustomToolSet) Validate() error {
    if t.apiKey == "" {
        return fmt.Errorf("api_key is required")
    }
    return nil
}

func (t *CustomToolSet) Test(ctx context.Context) error {
    // Verify connectivity to the external service
    return nil
}

// ListTools returns the tool definitions exposed to the AI model
func (t *CustomToolSet) ListTools(ctx context.Context) ([]openai.Tool, error) {
    return []openai.Tool{
        {
            Type: openai.ToolTypeFunction,
            Function: &openai.FunctionDefinition{
                Name:        "fetch_data",
                Description: "Fetch data from the custom service",
                Parameters: jsonschema.Definition{
                    Type: jsonschema.Object,
                    Properties: map[string]jsonschema.Definition{
                        "query": {
                            Type:        jsonschema.String,
                            Description: "Query string",
                        },
                        "limit": {
                            Type:        jsonschema.Integer,
                            Description: "Maximum number of results",
                        },
                    },
                    Required: []string{"query"},
                },
            },
        },
    }, nil
}

// Call executes a tool by name with JSON parameters
func (t *CustomToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
    switch name {
    case "fetch_data":
        var params struct {
            Query string `json:"query"`
            Limit int    `json:"limit"`
        }
        if err := json.Unmarshal([]byte(parameters), &params); err != nil {
            return "", fmt.Errorf("failed to parse parameters: %w", err)
        }
        result := fmt.Sprintf("Fetched data for query: %s (limit: %d)", params.Query, params.Limit)
        return result, nil
    default:
        return "", fmt.Errorf("tool %s not found", name)
    }
}
```

#### Step 2: Implement ToolSetFactory Interface

```go
package customtoolset

import (
    "encoding/json"
    "fmt"

    "github.com/sven-victor/ez-console/pkg/toolset"
    "github.com/sven-victor/ez-console/pkg/util"
)

type CustomToolSetFactory struct{}

func (f *CustomToolSetFactory) GetName() string        { return "Custom Toolset" }
func (f *CustomToolSetFactory) GetDescription() string { return "Factory for creating custom toolset instances" }

func (f *CustomToolSetFactory) GetConfigFields() []util.ConfigField {
    return []util.ConfigField{
        {
            Name:        "api_key",
            DisplayName: "API Key",
            Description: "Your API key for the custom service",
            Type:        util.FieldTypePassword,
            Required:    true,
        },
        {
            Name:        "endpoint",
            DisplayName: "Endpoint",
            Description: "Service endpoint URL",
            Type:        util.FieldTypeString,
            Required:    true,
            Placeholder: "https://api.example.com",
        },
    }
}

func (f *CustomToolSetFactory) CreateToolSet(configJSON string) (toolset.ToolSet, error) {
    var config map[string]interface{}
    if err := json.Unmarshal([]byte(configJSON), &config); err != nil {
        return nil, fmt.Errorf("failed to parse config: %w", err)
    }

    apiKey, _ := config["api_key"].(string)
    endpoint, _ := config["endpoint"].(string)
    if apiKey == "" || endpoint == "" {
        return nil, fmt.Errorf("api_key and endpoint are required")
    }

    return &CustomToolSet{apiKey: apiKey, endpoint: endpoint}, nil
}
```

#### Step 3: Register and Import

```go
package customtoolset

import "github.com/sven-victor/ez-console/pkg/toolset"

const ToolSetTypeCustom toolset.ToolSetType = "custom"

func init() {
    if err := toolset.RegisterToolSet(ToolSetTypeCustom, &CustomToolSetFactory{}); err != nil {
        panic(err)
    }
}
```

```go
package main

import (
    _ "your-module/customtoolset"  // Import to trigger init()
    "github.com/sven-victor/ez-console/server"
)

func main() {
    server.Start()
}
```

### ToolSetFactoryV2 (JSON Schema)

`ToolSetFactoryV2` is the toolset equivalent of `AIClientFactoryV2`. It extends `ToolSetFactory` with `GetConfigSchema()` for richer frontend form rendering.

**Interface definition** (`pkg/toolset/toolset.go`):

```go
type ToolSetFactoryV2 interface {
    ToolSetFactory
    GetConfigSchema() (schema *jsonschema.Schema, uiSchema map[string]any, err error)
}
```

#### Implementing ToolSetFactoryV2

**Step 1: Define a config struct with `jsonschema` tags**

The MCP toolset is the canonical example of a V2 implementation with conditional fields and layout:

```go
type MCPToolSetConfig struct {
    Endpoint string                 `json:"endpoint"           jsonschema:"required,description=The endpoint of the MCP server"`
    Protocol string                 `json:"protocol"           jsonschema:"required,description=The protocol of the MCP server,enum=http,enum=sse,default=http"`
    AuthType string                 `json:"auth_type"          jsonschema:"required,description=The authentication type,enum=basic,enum=bearer,default=basic"`
    Username string                 `json:"username,omitempty" jsonschema:"description=The username for the MCP server"`
    Password string                 `json:"password,omitempty" jsonschema:"description=The password for the MCP server,format=password"`
    Token    string                 `json:"token,omitempty"    jsonschema:"description=The bearer token for the MCP server,format=password"`
    Args     map[string]interface{} `json:"args,omitempty"     jsonschema_extras:"x-ui-field=objectEditor"` // headers/header + proxy; see GetConfigSchema examples
}
```

**Step 2: Implement GetConfigSchema with conditional fields and layout**

For simple configs, `jsonschema.Reflect()` alone is sufficient. For advanced scenarios (conditional visibility, grid layout), you can post-process the schema and return a custom `uiSchema`:

```go
func (f *MCPToolSetFactory) GetConfigSchema() (*jsonschema.Schema, map[string]any, error) {
    schema := jsonschema.Reflect(&MCPToolSetConfig{})

    // --- Conditional fields via JSON Schema `dependencies` ---
    // Show username/password when auth_type="basic", token when auth_type="bearer"
    if def, ok := schema.Definitions["MCPToolSetConfig"]; ok {
        authTypeDef, _ := def.Properties.Get("auth_type")
        usernameDef, _ := def.Properties.Get("username")
        passwordDef, _ := def.Properties.Get("password")
        tokenDef, _ := def.Properties.Get("token")

        // Remove from top-level properties (they'll appear conditionally)
        def.Properties.Delete("username")
        def.Properties.Delete("password")
        def.Properties.Delete("token")

        def.Extras["dependencies"] = map[string]*jsonschema.Schema{
            "auth_type": {
                OneOf: []*jsonschema.Schema{
                    {
                        // When auth_type = "basic", show username + password
                        Properties: orderedmap.New[string, *jsonschema.Schema](
                            orderedmap.WithInitialData(
                                orderedmap.Pair[string, *jsonschema.Schema]{
                                    Key: "auth_type", Value: &jsonschema.Schema{Enum: []any{"basic"}},
                                },
                                orderedmap.Pair[string, *jsonschema.Schema]{Key: "username", Value: usernameDef},
                                orderedmap.Pair[string, *jsonschema.Schema]{Key: "password", Value: passwordDef},
                            ),
                        ),
                        Required: []string{"username", "password"},
                    },
                    {
                        // When auth_type = "bearer", show token
                        Properties: orderedmap.New[string, *jsonschema.Schema](
                            orderedmap.WithInitialData(
                                orderedmap.Pair[string, *jsonschema.Schema]{
                                    Key: "auth_type", Value: &jsonschema.Schema{Enum: []any{"bearer"}},
                                },
                                orderedmap.Pair[string, *jsonschema.Schema]{Key: "token", Value: tokenDef},
                            ),
                        ),
                        Required: []string{"token"},
                    },
                },
            },
        }
    }

    // --- UI Schema for grid layout ---
    uiSchema := map[string]any{
        "ui:width": 1024,                   // Modal width hint
        "ui:field": "LayoutGridField",       // Enable grid layout
        "args": map[string]any{
            "ui:field": "objectEditor",      // JSON editor for the args field
        },
        "ui:layoutGrid": map[string]any{
            "ui:row": map[string]any{
                "gutter":    []int{12, 0},
                "children": []map[string]map[string]any{
                    {"ui:col": {"xs": 24, "children": []string{"endpoint"}}},
                    {"ui:col": {"xs": 12, "children": []string{"protocol"}}},
                    {"ui:col": {"xs": 12, "children": []string{"auth_type"}}},
                    {"ui:col": {"xs": 24, "children": []string{"token"}}},
                    {"ui:col": {"xs": 12, "children": []string{"username"}}},
                    {"ui:col": {"xs": 12, "children": []string{"password"}}},
                    {"ui:col": {"xs": 24, "children": []string{"args"}}},
                },
            },
        },
    }
    return schema, uiSchema, nil
}
```

**Step 3: Register via RegisterToolSetV2**

```go
func init() {
    toolset.RegisterToolSetV2(ToolSetTypeMCP, &MCPToolSetFactory{})
}
```

Like AI factories, `RegisterToolSetV2` stores the factory in the same registry. The service layer type-asserts to `ToolSetFactoryV2` at runtime:

```go
// In ToolSetService.GetToolSetTypeDefinitions:
if v2, ok := factory.(toolset.ToolSetFactoryV2); ok {
    schema, uiSchema, err := v2.GetConfigSchema()
    // ...
} else {
    schema = util.ConfigFieldsToJSONSchema(factory.GetConfigFields())
}
```

The returned `ToolSetTypeDefinition` (with `config_schema` and `ui_schema`) is served via `GET /api/system/toolsets/types` and consumed by the frontend toolset settings page.

#### Simple V2 Example (Without Conditional Fields)

For toolsets that don't need conditional logic or custom layout, the implementation is minimal:

```go
type WebhookConfig struct {
    URL     string `json:"url"     jsonschema:"required,description=Webhook endpoint URL"`
    Method  string `json:"method"  jsonschema:"required,description=HTTP method,enum=GET,enum=POST,default=POST"`
    Timeout int    `json:"timeout" jsonschema:"description=Request timeout in seconds,minimum=1,maximum=300,default=30"`
}

type WebhookToolSetFactory struct{}

func (f *WebhookToolSetFactory) GetConfigSchema() (*jsonschema.Schema, map[string]any, error) {
    return jsonschema.Reflect(&WebhookConfig{}), nil, nil
}

var _ toolset.ToolSetFactoryV2 = (*WebhookToolSetFactory)(nil)
```

### RBAC Tool Permissions

Tool access is controlled per-role via `RoleAIToolPermission` rows (`t_role_ai_tool_permissions`). Each record specifies:

- `RoleID`: The role being granted access
- `ToolSetID`: Toolset **resource UUID**, or `"*"` for all toolsets
- `ToolName`: Logical tool name, or `"*"` for all tools in that toolset
- `OrganizationID`: Organization scope

Unique on `(role_id, toolset_id, tool_name)`. Role create/update accepts:

```json
"ai_tool_permissions": [
  { "toolset_id": "<uuid-or-*>", "tools": ["*", "now"] }
]
```

**Resolution notes:**

- Global admin / org admin short-circuit to all tools (`*/*`).
- In multi-org contexts, global (non-admin) AI permissions are ignored for org-scoped chat.
- `ToolSetService.GetAuthorizedToolSets` instantiates enabled toolsets, applies role filters via `filteredToolSet`, applies `disabled_tools`, and uses map keys `{type}{id}`.
- Empty permissions (non-admin) → empty tool map (no organization tools in chat).

Chat production path uses `GetAuthorizedToolSets` plus optional `SkillDrivenToolset` wrapping. `GetAuthorizedToolSetsForChat` / `SkillChatBindingMode` remain available for binding-mode evaluation (see [16-skills.md](./16-skills.md)).

### Console as MCP Server

In addition to the **MCP toolset type** (console as MCP **client**), the console exposes authorized tools as an MCP **server**:

- Endpoint: **`ANY /api/mcp`** (Streamable HTTP, stateless)
- Tools = the authenticated user’s **RBAC-authorized** toolsets for the current org
- Implementation: `pkg/api/mcp/mcp_controller.go`

This lets external MCP clients call the same tools the chat agent can use (subject to the caller’s token and org scope).

## Skills System

Skills are markdown-based instruction packs stored on disk that can be injected into the AI context to provide domain-specific knowledge and behavior.

### Skill Structure

Each skill is stored as a directory under the configured `skills_path` (or `file_upload_path/skills`), keyed by skill **resource ID**:

```
skills/
├── <skill-resource-id>/
│   ├── SKILL.md         # Primary skill content (or SKILLS.md); YAML frontmatter
│   ├── REFERENCE.md     # Additional .md / .txt files
│   └── resources/
│       └── ...
```

The main file contains YAML frontmatter:

```markdown
---
name: "Database Query Assistant"
description: "Helps users write and optimize SQL queries"
---

# Database Query Assistant

You are a database expert. When the user asks about SQL...
```

Skills are persisted in the database (`model.Skill`) for metadata (name, description, category, domain, **status**, **preset** flags) and on the filesystem for content. See [AI Agent Skills](./16-skills.md) for upload/API details.

**Preset skills** (built-ins synced from `pkg/preset`) are covered under [Default (preset) toolsets and skills](#default-preset-toolsets-and-skills) in this guide and in [AI Agent Skills](./16-skills.md#default-preset-skills).

### Skill Domains

Skills are organized into **domains**. The built-in domain is `"core"`. Additional domains can be registered:

```go
import "github.com/sven-victor/ez-console/pkg/service"

func init() {
    service.RegisterSkillsDomain("analytics")
    service.RegisterSkillsDomain("devops")
}
```

Production chat always appends **`core`** and **`chat`** to request domains (so companion toolset skills in domain `chat` are available). The frontend may still let users select additional domains or specific skills.

### Progressive Skill Loading

When the chat API receives `domains` or `skill_ids`, the backend calls **`SkillService.CreateSkillLoader(ctx, organizationID, domains, skillIDs, activatedSkillIDs)`** which returns an **`*ai.SkillLoader`**. If the loader has skills, the backend uses **progressive loading** instead of dumping all skill content into the context:

1. A concise **metadata table** (ID, name, description, domain) is prepended as a **system** message (generated internally by `SkillLoader.GetMetadata()`).
2. A `get_skill_content` tool is registered under key **`skill_loader`**, exposed to the model as **`skill_loader_get_skill_content`**.
3. The model loads file bodies **on demand**, keeping the initial prompt small.

**Organization tools vs skills:** For both streaming and non-streaming completions, **`CreateChatCompletionStream`** / **`CreateChatCompletion`** accept a `skillLoader *ai.SkillLoader` parameter. When `skillLoader` is non-nil and has skills, and **`system_enable_skill_tool_binding`** is on, `PrepareChatCompletionSkillLoader` wraps the provider in **`SkillDrivenToolset`**: organization tools stay **empty** until **`get_skill_content`** succeeds at least once; bindings are then applied only for **activated** skill IDs stored on **`AIChatSession.activated_skill_ids`**. If `skillLoader` is nil or has no skills, binding being on does **not** hide organization tools (full authorized set). ez-agent’s `toolSetsRegistry` reloads Specs each turn when **`RefreshToolSetsEachIteration`** is set so newly activated skills take effect on the next model call.

**Summarization:** Auto-summary clears **`activated_skill_ids`** and redacts **`get_skill_content`** tool results in the summarizer prompt so large skill bodies are not folded into the summary verbatim.

Authoritative tables and file references: **`usages/16-skills.md`** → *AI Integration* and *Skills and organization tools loading*.

## Client Tools

Client tools allow the AI model to invoke functions that execute **in the user's browser** rather than on the server. This is useful for reading page-specific data, triggering UI actions, or accessing information only available on the client side.

### How Client Tools Work

The client tool flow involves a multi-step handoff between frontend, backend, and AI model:

```
Frontend                    Backend                      AI Model
   │                           │                            │
   │ POST /sessions/:id        │                            │
   │  { content, client_tools }│                            │
   │ ─────────────────────────>│                            │
   │                           │  messages + tools ─────────>│
   │                           │                            │
   │                           │  <── tool_call: ui_xxx ────│
   │                           │                            │
   │  SSE: client_tool_pending │                            │
   │ <─────────────────────────│                            │
   │                           │                            │
   │  (execute tool in browser)│                            │
   │                           │                            │
   │ POST /sessions/:id        │                            │
   │  { client_tool_results }  │                            │
   │ ─────────────────────────>│                            │
   │                           │  messages + results ──────>│
   │                           │                            │
   │  SSE: content stream      │  <── final response ──────│
   │ <─────────────────────────│                            │
```

**Key rules:**

- Client tool names **must** start with the `ui_` prefix.
- Maximum of 20 client tools per request.
- Tool descriptions are limited to 1000 characters.
- Handoff is driven by the ez-agent **HITL interrupter** (see below), not only by the proxy returning an error.

### Registering Client Tools in the Frontend

Use the `registerPageAI` function from `AIContext` to register page-specific client tools:

```tsx
import { useAI, RegisteredClientTool } from '@/contexts/AIContext';
import { useEffect } from 'react';

function MyPage() {
  const { registerPageAI } = useAI();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const unregister = registerPageAI({
      // Ephemeral system prompts visible only to the AI (not persisted)
      ephemeralSystemPrompts: [
        'The user is viewing a data analytics dashboard. Help them interpret the data.',
      ],

      // Automatically creates a ui_get_page_data client tool
      pageData: () => tableData,
      pageDataDescription: 'Returns the current table data displayed on the analytics page.',

      // Additional custom client tools
      tools: [
        {
          name: 'ui_highlight_row',
          description: 'Highlight a specific row in the data table by row index.',
          parameters: {
            type: 'object',
            properties: {
              row_index: { type: 'integer', description: 'Zero-based row index' },
            },
            required: ['row_index'],
          },
          handler: (argsJson: string) => {
            const { row_index } = JSON.parse(argsJson);
            // Perform UI action
            highlightTableRow(row_index);
            return JSON.stringify({ success: true, highlighted_row: row_index });
          },
        },
      ],
    });

    return unregister; // Cleanup on unmount
  }, [registerPageAI, tableData]);

  return <div>...</div>;
}
```

### Server-Side Client Tool Handling

On the backend, `AIChatController.StreamChat`:

1. Validates client tool names match `^ui_[a-zA-Z0-9_]+$` (max 20 tools; description length capped).
2. Converts definitions to `openai.Tool` and injects via `WithChatClientTools`.
3. Tools are registered under map key **`ui`** via `clientToolsProxy` / `toolSetsRegistry`.
4. ez-agent **HITL interrupter** (`newUIToolInterrupter`):
   - No `ui_*` in the batch → do not interrupt (server tools run normally).
   - Only `ui_*` → interrupt immediately.
   - Mixed batch → execute non-`ui_*` tools first, append results to the session, then interrupt for `ui_*`.
5. Stream emits `client_tool_pending` and ends with `ErrClientToolHandoff`.
6. Frontend executes tools, then POSTs `client_tool_results` on the next turn.
7. Results are persisted as `role=tool` messages and a new completion stream starts.

## Chat Sessions & Streaming

### Session Management

Chat sessions (`model.AIChatSession`) persist the conversation history:


| API Endpoint                             | Method | Description                   |
| ---------------------------------------- | ------ | ----------------------------- |
| `/api/ai/chat/sessions`                  | GET    | List sessions with pagination |
| `/api/ai/chat/sessions`                  | POST   | Create a new session          |
| `/api/ai/chat/sessions/:sessionId`       | GET    | Get session with messages     |
| `/api/ai/chat/sessions/:sessionId`       | POST   | Send message (SSE stream)     |
| `/api/ai/chat/sessions/:sessionId`       | DELETE | Delete session and messages   |
| `/api/ai/chat/sessions/:sessionId/title` | PUT    | Generate/update session title |


**Auto-generated titles:** When the first assistant response is produced for a new session, the backend automatically generates a title using the AI model in a background goroutine.

**DB-backed session window:** Production chat passes `WithChatSession(sessionID, sessionStore)` so ez-agent persists the effective conversation window via `AISessionService` (`memory.SessionStore`). Summarization updates the window through `ReplaceAll`.

**Session cleanup:** A scheduled job (`ai-chat-session-cleanup`) runs daily and deletes sessions older than the configured retention period (default: 90 days, `task_ai_chat_retention_days` / `model.SettingTaskAIChatRetentionDays`).

**Anonymous sessions:** Sessions created with `anonymous: true` are not listed in the user's session list but still persist messages. Used for programmatic `callAI` invocations from the frontend.

**Write timeout:** The chat controller clears the HTTP write deadline for SSE so long streams are not killed by the default server write timeout.

### SSE Streaming Protocol

The `StreamChat` endpoint uses Server-Sent Events (SSE). Each event is sent as:

```
event: message
data: {"event_type":"content","message_id":"...","content":"Hello","role":"assistant"}
```

**Event types:**


| `event_type`          | Description                                 | Key Fields                               |
| --------------------- | ------------------------------------------- | ---------------------------------------- |
| `content`             | Text content delta                          | `message_id`, `content`, `role`          |
| `tool_call`           | Server-side tool execution status (internal)| `message_id`, `tool_calls` (with status) |
| `client_tool_pending` | Control handoff to browser for client tools | `message_id`, `client_tool_calls`        |
| `error`               | Error message                               | `content` (error text)                   |

The HTTP controller **skips forwarding** raw `tool_call` events to the browser; clients typically observe tool activity via persisted messages / UI state. After `client_tool_pending`, the stream ends (`ErrClientToolHandoff`).

Domains: the controller always appends **`core`** and **`chat`** to `req.Domains` before creating the skill loader.

`**SendMessageRequest` body:**

```json
{
  "content": "User message text",
  "domains": ["analytics"],
  "skill_ids": ["skill-uuid-1"],
  "ephemeral_system_prompts": ["Extra context for this page"],
  "client_tools": [
    {
      "name": "ui_get_page_data",
      "description": "Returns current page data",
      "parameters": {"type": "object", "properties": {}}
    }
  ],
  "client_tool_results": [
    {
      "tool_call_id": "call_abc123",
      "content": "{\"data\": [...]}"
    }
  ]
}
```

Either `content` or `client_tool_results` must be provided (or both).

### Chat Completion Options

The `WithChatOptions` functional options control `Exchange` / `ExchangeStream` (ez-agent agent options):


| Option | Description | Default |
|--------|-------------|---------|
| `WithChatToolSetsProvider(factory)` | Primary toolsets provider (cached by default helpers) | none |
| `WithChatToolSetsProviderChan(fn)` | Wrap/extend the current provider | none |
| `WithChatAppendToolSetsProvider(fn)` | Merge extra toolsets into the current map | none |
| `WithoutChatCompletionToolSets()` | Clear toolsets for this run | — |
| `WithChatRefreshToolSetsEachIteration(bool)` | Reload tool defs before each LLM turn (skill binding) | false |
| `WithChatSkillLoader(loader)` | Attach skill loader for metadata / SkillDriven filtering | none |
| `WithChatMaxIterations(n)` | Max agent turns / tool-loop iterations | **10** |
| `WithChatMaxTokens(n)` | Context / summarization token budget | 0 |
| `WithChatAutoSummarization(bool)` | Enable ez-agent Summarize (+ Segmented) policy | false (chat API sets **true**) |
| `WithChatFinalPrompt(prompt)` | Final user prompt after tool rounds | none |
| `WithChatToolResultMaxSize(bytes)` | Offload / cap large messages; tool-result summarization | 32KB |
| `WithChatResponseJsonSchema(schema)` | Structured output schema for the agent | none |
| `WithChatClientTools(tools)` | Browser `ui_*` tool definitions | none |
| `WithChatSession(id, store)` | DB-backed ez-agent session window | none |
| `WithChatModelSystemPrompt(prompt)` | Model-level system prompt | none |
| `WithChatEphemeralSystemPrompts([]string)` | Page-only system text (not persisted) | none |
| `WithChatTrace(writer, counter)` | ez-agent hook-based debug tracing | none |
| `WithChatOnSummary(callback)` | After successful LLM summarization (`AfterSummary`) | none |
| `WithChatOnToolCallResultChanged(callback)` | When a tool result is available | none |
| `WithChatOnTokenUsage(callback)` | Token usage stats for the run | none |

> Prefer `WithChatToolSetsProvider(toolset.NewStaticToolSetsProvider(ts))` instead of the removed `WithChatToolSets`.


## Auto-Summarization

When a conversation exceeds the context budget, ez-agent memory policies condense the window. Production chat enables this via `WithChatAutoSummarization(true)` plus model `max_chat_tokens` when set.

### How it works (ez-agent)

With auto-summarization on, `buildAgent` installs a `memory.Summarize` policy:

- **Robust summarizer** — primary one-shot condensation via the same provider
- **Segmented summarizer** — fallback when one-shot cannot fit the history
- **KeepRecent / Ratio / ProactiveMaxMessages** — control how aggressively history is trimmed (defaults: keep 10 recent, ratio 0.3, proactive at 80 messages)
- **ProactiveMaxTokens** — when `MaxTokens` (`max_chat_tokens`) is set, proactive threshold is **50%** of that budget
- **Fallback** — hard window of last 10 messages if summarizers fail
- **Offload** — when `ToolResultMaxSize` is set, large message bodies are offloaded to an in-memory blob store before the inner summarize policy

Without auto-summarization, `MaxTokens` may still set `MaxTotalTokens` on run limits, and oversized payloads can still be offloaded.

Legacy `summaryToolSet` (`get_messages` / `save_summary`) remains in the codebase for segmented helpers; the live chat path uses ez-agent’s `SegmentedSummarizer` rather than injecting that toolset into the user-facing agent loop.

**Callbacks:**

- `OnSummary` runs only after **successful** LLM summarization (`AfterSummary` with nil error), not on plain condense/offload `ReplaceAll`.
- Production clears `activated_skill_ids` and skill-loader state on `OnSummary`.
- Skill file bodies are redacted from summarizer input (`RedactGetSkillContentToolResultsForSummary`).

**Oversized tool results:** Individual tool outputs exceeding `ToolResultMaxSize` can be summarized or truncated via `summarizeToolResultWithFallback` before being returned to the model.

## Debug Tracing

Global AI debug tracing persists ez-agent hook events when enabled (`ai_debug_enabled`).

| Method | Path | Permission |
|--------|------|------------|
| GET | `/api/ai/trace/status` | `ai:trace:manage` |
| POST | `/api/ai/trace/toggle` | `ai:trace:manage` — body `{ "enabled": true\|false }`; disabling deletes all events |
| GET | `/api/ai/trace/events?trace_id=` | `ai:trace:manage` |
| GET | `/api/ai/trace/events/download?trace_id=` | `ai:trace:manage` |

Event types include: `llm_request`, `llm_response`, `token_usage`, `tool_call`, `tool_result`, `error`, `summary`. Wired via `WithChatTrace` when tracing is on (`AIChatService.appendTraceChatOptionsIfEnabled`).

## JSON Schema Configuration Forms

### Overview {#json-schema-form-overview}

The frontend uses a JSON Schema–driven approach to render configuration forms for AI models and toolsets. Instead of hand-coding form fields for each provider/toolset type, a single `JsonSchemaConfigForm` component (`web/src/components/JsonSchemaConfigForm.tsx`) interprets the JSON Schema returned by the backend and dynamically generates the form.

This is built on top of [React JSON Schema Form (RJSF)](https://rjsf-team.github.io/react-jsonschema-form/) with the Ant Design theme (`@rjsf/antd`) and the AJV8 validator (`@rjsf/validator-ajv8`).

### How It Works End-to-End

```
Backend Factory                    API Response                   Frontend Form
┌──────────────────┐     ┌────────────────────────────┐     ┌──────────────────────┐
│ GetConfigSchema() │────>│ GET /api/ai/models/types    │────>│ JsonSchemaConfigForm │
│   or              │     │ GET /api/system/toolsets/   │     │   schema={...}       │
│ GetConfigFields() │     │          types              │     │   uiSchema={...}     │
│ → ConfigFieldsTo  │     │                            │     │   value={config}     │
│   JSONSchema()    │     │ Returns:                   │     │   onChange={fn}      │
│                  │     │   config_schema: {...}      │     │                      │
│                  │     │   ui_schema: {...}          │     │                      │
└──────────────────┘     └────────────────────────────┘     └──────────────────────┘
```

1. **Backend**: Each factory provides a JSON Schema via `GetConfigSchema()` (V2) or `GetConfigFields()` (V1, auto-converted via `util.ConfigFieldsToJSONSchema`).
2. **API**: The service layer returns `config_schema` and `ui_schema` as part of `AITypeDefinition` or `ToolSetTypeDefinition`.
3. **Frontend**: The settings page fetches type definitions, selects the active type, and passes `config_schema` + `ui_schema` to `JsonSchemaConfigForm`.

### Schema Extensions (x-ui-* Tags)

The backend can embed UI hints directly in the JSON Schema via `x-ui-*` properties (set through `jsonschema_extras` struct tags). The frontend `buildUiSchema()` function automatically converts these to RJSF `ui:*` entries:

```
Backend struct tag                          → JSON Schema property    → RJSF uiSchema
jsonschema_extras:"x-ui-widget=textarea"    → "x-ui-widget": "textarea" → "ui:widget": "textarea"
jsonschema_extras:"x-ui-placeholder=..."    → "x-ui-placeholder": "..." → "ui:placeholder": "..."
jsonschema_extras:"x-ui-field=objectEditor" → "x-ui-field": "objectEditor" → "ui:field": "objectEditor"
```

The `buildUiSchema()` function (`web/src/components/JsonSchemaConfigForm.tsx`) walks the entire schema tree (including `$ref` definitions, `dependencies`, `oneOf`, `anyOf`, `allOf`) and extracts all `x-ui-*` keys:

```typescript
function walk(node: any): any {
  const ui: any = {};
  Object.keys(node).forEach(key => {
    if (key.startsWith("x-ui-")) {
      ui[`ui:${key.slice(5)}`] = node[key];
    }
  });
  // Also handles x-hidden → ui:widget="hidden"
  // and x-disabled → ui:disabled=true
  // Recurses into properties, dependencies, oneOf, etc.
  return ui;
}
```

**Supported `x-ui-*` extensions:**

| Extension | Mapped to | Effect |
|-----------|-----------|--------|
| `x-ui-widget` | `ui:widget` | Override the default widget (e.g. `textarea`, `hidden`) |
| `x-ui-field` | `ui:field` | Override the default field renderer (e.g. `objectEditor` for JSON editor) |
| `x-ui-placeholder` | `ui:placeholder` | Input placeholder text |
| `x-ui-col-xs` | `ui:col-xs` | Column span in grid layout (Ant Design grid system, out of 24) |
| `x-hidden` | `ui:widget=hidden` | Hide the field entirely |
| `x-disabled` | `ui:disabled=true` | Disable the field |

Additionally, `configFieldToPropertySchema()` (`pkg/util/config_schema.go`) maps legacy `ConfigField` types to `x-ui-*` properties when converting V1 fields:

| FieldType | Schema mapping |
|-----------|---------------|
| `password` | `type: "string"`, `format: "password"` |
| `select` with `DataSource` | `x-ui-widget: "remoteSelect"` or `"toolsetsSelect"` + `x-data-source: {...}` |
| `object` | `type: "object"`, `x-ui-widget: "objectEditor"` |

### UI Schema and Layout

The `uiSchema` is a separate object (independent from the JSON Schema) that controls form layout and field-level rendering. It is returned as the second value from `GetConfigSchema()`.

#### Merging Strategy

The frontend merges the auto-generated UI schema (from `x-ui-*` extensions) with the explicitly provided `uiSchema`:

```typescript
const mergedUiSchema = useMemo(() => {
  const autoUi = buildUiSchema(schema);  // Extract x-ui-* from schema
  return {
    ...autoUi,    // Auto-generated from schema extensions
    ...uiSchema,  // Explicit overrides from backend
  };
}, [schema, uiSchema]);
```

Explicit `uiSchema` values take precedence over auto-generated ones.

#### Grid Layout

For complex forms, use the `LayoutGridField` to arrange fields in a responsive grid (based on Ant Design's 24-column grid):

```go
uiSchema := map[string]any{
    "ui:width": 1024,               // Hint: modal width in pixels
    "ui:field": "LayoutGridField",   // Enable grid layout for the root object
    "ui:layoutGrid": map[string]any{
        "ui:row": map[string]any{
            "gutter": []int{12, 0},  // Horizontal and vertical gutter
            "children": []map[string]map[string]any{
                // Full-width field
                {"ui:col": {"xs": 24, "children": []string{"endpoint"}}},
                // Two half-width fields side by side
                {"ui:col": {"xs": 12, "children": []string{"protocol"}}},
                {"ui:col": {"xs": 12, "children": []string{"auth_type"}}},
                // Conditional fields (still in the grid)
                {"ui:col": {"xs": 24, "children": []string{"token"}}},
                {"ui:col": {"xs": 12, "children": []string{"username"}}},
                {"ui:col": {"xs": 12, "children": []string{"password"}}},
                // JSON editor, full width
                {"ui:col": {"xs": 24, "children": []string{"args"}}},
            },
        },
    },
}
```

The `xs` value is the column span (out of 24). Common patterns:

| `xs` value | Effective width | Use case |
|-----------|-----------------|----------|
| `24` | Full width | Long inputs, textareas, JSON editors |
| `12` | Half width | Side-by-side fields |
| `8` | One-third width | Triple-column layouts |
| `6` | One-quarter width | Dense forms |

The `ui:width` property is consumed by the frontend modal to set the dialog width (e.g. `width={currentTypeDefinition?.ui_schema?.['ui:width'] || 600}`), keeping the form layout consistent.

#### Conditional Fields via Dependencies

JSON Schema `dependencies` with `oneOf` enables showing/hiding fields based on another field's value. When `auth_type` is `"basic"`, the `username` and `password` fields appear; when `"bearer"`, the `token` field appears:

```json
{
  "dependencies": {
    "auth_type": {
      "oneOf": [
        {
          "properties": {
            "auth_type": { "enum": ["basic"] },
            "username": { "type": "string", "description": "..." },
            "password": { "type": "string", "format": "password" }
          },
          "required": ["username", "password"]
        },
        {
          "properties": {
            "auth_type": { "enum": ["bearer"] },
            "token": { "type": "string", "format": "password" }
          },
          "required": ["token"]
        }
      ]
    }
  }
}
```

RJSF handles the conditional rendering automatically — dependent fields appear/disappear as the user changes `auth_type`.

### Custom Widgets

`JsonSchemaConfigForm` registers several custom widgets and fields:

#### ObjectEditor (`ui:field = "objectEditor"`)

Renders a CodeMirror-based JSON editor for `object`-typed fields. Useful for arbitrary key-value configurations:

```go
// Backend: mark a map field as objectEditor
Args map[string]interface{} `json:"args,omitempty" jsonschema_extras:"x-ui-field=objectEditor"`
```

The editor supports:
- Syntax-highlighted JSON editing
- Live JSON validation with error display
- Schema `examples` dropdown (top-right corner) for pre-filling templates
- Auto-sync with parent form state

#### RemoteSelect (`ui:widget = "remoteSelect"`)

A `Select` dropdown that fetches options from a remote API at render time:

```go
// Legacy ConfigField approach:
{
    Name: "webhook_id",
    Type: util.FieldTypeSelect,
    DataSource: &util.DataSource{
        Type:     util.DataSourceTypeAPI,
        URL:      "/api/webhooks",
        Method:   "GET",
        LabelKey: "name",
        ValueKey: "resource_id",
        Cache:    true,
        CacheTTL: 60,
    },
}
```

This generates a schema with `x-data-source` and `x-ui-widget: "remoteSelect"`. The frontend `RemoteSelectWidget` reads the `x-data-source` property and calls the specified API to populate options.

#### ToolsetsSelect (`ui:widget = "toolsetsSelect"`)

A specialized variant of `RemoteSelect` that fetches available toolsets via `listToolSets`. Triggered when `DataSource.Type` is `"toolsets"`.

### Using JsonSchemaConfigForm in Pages

#### Basic Usage (AI Model Settings)

```tsx
import { JsonSchemaConfigForm } from '@/components/JsonSchemaConfigForm';

// In your settings page:
const currentProviderDefinition = typeDefinitions?.find(
  (td) => td.provider === selectedProvider
);

// Inside Ant Design Form:
<Form.Item name={['config']}>
  <JsonSchemaConfigForm
    schema={currentProviderDefinition.config_schema}
  />
</Form.Item>
```

The `value` and `onChange` props are automatically wired by Ant Design's `Form.Item` via `name={['config']}`.

#### With UI Schema and Validation (Toolset Settings)

```tsx
import { JsonSchemaConfigFormItem } from '@/components/JsonSchemaConfigForm';

const currentTypeDefinition = typeDefinitions?.find(
  (td) => td.tool_set_type === selectedType
);

// Modal with dynamic width from ui_schema
<Modal width={currentTypeDefinition?.ui_schema?.['ui:width'] || 600}>
  <Form form={form} layout="vertical" onFinish={handleSubmit}>
    {/* Other fields: name, description, type... */}

    <JsonSchemaConfigFormItem
      name="config"
      schema={currentTypeDefinition?.config_schema}
      uiSchema={currentTypeDefinition?.ui_schema}
    />
  </Form>
</Modal>
```

`JsonSchemaConfigFormItem` wraps `JsonSchemaConfigForm` in an `AntForm.Item` with built-in validation — on form submit, it validates the config data against the JSON Schema and shows errors inline.

#### Component Props Reference

| Prop | Type | Description |
|------|------|-------------|
| `schema` | `RJSFSchema` | JSON Schema for the config object |
| `value` | `Record<string, unknown>` | Current config values (provided by Form.Item) |
| `onChange` | `(config) => void` | Change handler (provided by Form.Item) |
| `uiSchema` | `Record<string, unknown>` | Optional RJSF UI schema for layout/widget overrides |
| `disabled` | `boolean` | Disable all fields (default: `false`) |
| `formRef` | `React.Ref` | Ref for imperative validation via `formRef.validate()` |

## Frontend Integration

### AIContext

The `AIContext` (`web/src/contexts/AIContext.tsx`) provides global AI state management:

```tsx
interface AIContextType {
  // Layout
  layout: 'classic' | 'sidebar' | 'float-sidebar';
  setLayout: (layout: 'classic' | 'sidebar' | 'float-sidebar') => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;

  // Conversations
  conversations: API.AIChatSession[] | undefined;
  activeConversationKey: string | undefined;
  setActiveConversationKey: (key: string) => void;
  fetchConversations: () => Promise<API.AIChatSession[]>;

  // Programmatic AI invocation
  callAI: (message: string, messages?: API.SimpleChatMessage[]) => void;
  onCallAI: (callback: ...) => void;

  // Page-level AI context
  ephemeralSystemPrompts: string[];
  clientTools: RegisteredClientTool[];
  registerPageAI: (opts: PageAIOptions) => () => void;
  resetPageAIContext: () => void;
}
```

**Usage in components:**

```tsx
import { useAI } from '@/contexts/AIContext';

function MyComponent() {
  const { callAI, setVisible, registerPageAI } = useAI();

  // Open AI chat with a prefilled message
  const askAI = () => {
    callAI('Analyze this data', [
      { role: 'user', content: 'Here is my dataset...' },
    ]);
  };

  return <Button onClick={askAI}>Ask AI</Button>;
}
```

### AIChat Component

The `AIChat` component (`web/src/components/AIChat.tsx`) provides the full chat interface using the `@ant-design/x` component library:

**Key features:**

- **Layout modes**: Classic (sidebar + chat), Sidebar (compact), Float-sidebar (overlay)
- **Conversation management**: Create, delete, rename, switch between conversations
- **Streaming**: Real-time message rendering via `@ant-design/x-sdk`'s `useXChat` hook
- **Rich content**: Markdown rendering with code highlighting and Mermaid diagram support
- **Skill selection**: Users can pick skill domains or specific skills via a select dropdown
- **Client tool handling**: Automatically dispatches pending tool calls to registered handlers

**SSE stream handling** is managed by a custom `AIProvider` class (extending `AbstractChatProvider` from `@ant-design/x-sdk`) that:

1. Parses SSE events from the `ChatStreamEvent` JSON format.
2. Accumulates content deltas per `message_id`.
3. Detects `client_tool_pending` events and surfaces `pendingClientToolCalls` on the message object.
4. A `useEffect` hook watches for completed requests with pending calls and automatically dispatches them via `handleClientToolHandoff`.

**Customization via props:**

```tsx
interface AIChatProps {
  bubble?: {
    contentRender?: (content: string) => React.ReactNode;
    footerRender?: (message: MessageInfo<ChatStreamMessage>) => React.ReactNode;
    components?: XMarkdownProps['components'];
  }
}
```

### Page-Level AI Integration

The `registerPageAI` function from `AIContext` supports three types of page-level integration:

**1. Ephemeral System Prompts:**
Temporary system instructions that are included in every chat request while the page is active. Not persisted to the database.

```tsx
registerPageAI({
  ephemeralSystemPrompts: [
    'The user is on the user management page. They may ask about user roles and permissions.',
  ],
});
```

**2. Page Data (automatic `ui_get_page_data` tool):**
When `pageData` is provided (as a value, string, or getter function), a built-in `ui_get_page_data` client tool is automatically registered. The AI can call it to retrieve the current page state.

```tsx
registerPageAI({
  pageData: () => ({ users: filteredUsers, filters: currentFilters }),
  pageDataDescription: 'Returns the filtered user list and active filters from the user management table.',
});
```

**3. Custom Client Tools:**
Register arbitrary browser-side tools with JSON Schema parameters:

```tsx
registerPageAI({
  tools: [{
    name: 'ui_apply_filter',
    description: 'Apply a filter to the user table',
    parameters: {
      type: 'object',
      properties: {
        column: { type: 'string', enum: ['name', 'email', 'role'] },
        value: { type: 'string' },
      },
      required: ['column', 'value'],
    },
    handler: async (argsJson) => {
      const { column, value } = JSON.parse(argsJson);
      applyFilter(column, value);
      return JSON.stringify({ success: true, applied: { column, value } });
    },
  }],
});
```

## Integration Examples

### Example 1: AI Chat with Skills and Tool Calling

This example is **simplified**: it passes `nil` for `skillLoader.OnContentLoaded` and does not wire `AppendSessionActivatedSkill`, so **skill–tool binding** and session **`activated_skill_ids`** behave like production **`StreamChat`** only after you mirror **`pkg/api/ai/ai_chat_controller.go`**. See **`usages/16-skills.md`**.

```go
func HandleChat(svc *service.Service) gin.HandlerFunc {
    return func(ctx *gin.Context) {
        var req struct {
            Message  string   `json:"message" binding:"required"`
            Domains  []string `json:"domains"`
            SkillIDs []string `json:"skill_ids"`
        }
        if err := ctx.ShouldBindJSON(&req); err != nil {
            ctx.JSON(400, gin.H{"error": err.Error()})
            return
        }

        organizationID := ctx.GetString("organization_id")
        userID, _ := ctx.Get("user_id")

        // Create or get a session
        session, _ := svc.CreateChatSession(ctx, organizationID, userID.(string),
            "Chat", "", nil, false)

        messages := []ai.ChatMessage{
            {Role: model.AIChatMessageRoleUser, Content: req.Message},
        }

        // Create skill loader (returns nil if no skills match the domains/IDs)
        skillLoader, _ := svc.CreateSkillLoader(ctx, organizationID,
            req.Domains, req.SkillIDs, session.ActivatedSkillIDs)

        // In production, wire OnContentLoaded to persist activated skills:
        // skillLoader.OnContentLoaded = func(ctx context.Context, skillID string) {
        //     svc.AppendSessionActivatedSkill(ctx, organizationID, userID.(string), session.ResourceID, skillID)
        // }

        options := []ai.WithChatOptions{
            ai.WithChatMaxIterations(10),
            ai.WithChatSession(session.ResourceID, svc.GetSessionStore(ctx, organizationID, userID.(string))),
            ai.WithChatAutoSummarization(true),
            ai.WithChatOnTokenUsage(func(ctx context.Context, stats ai.TokenUsageStats) {
                _ = svc.UpdateSessionTokenUsage(ctx, organizationID, userID.(string),
                    session.ResourceID, stats.PromptTokens, stats.CompletionTokens, stats.ActiveTokens)
            }),
        }

        // Stream response; skillLoader handles metadata injection and get_skill_content toolset internally
        stream, err := svc.CreateChatCompletionStream(ctx, organizationID, "", messages, skillLoader, options...)
        if err != nil {
            ctx.JSON(500, gin.H{"error": err.Error()})
            return
        }
        defer stream.Close()

        ctx.Writer.Header().Set("Content-Type", "text/event-stream")
        ctx.Writer.Header().Set("Cache-Control", "no-cache")
        ctx.Writer.Header().Set("Connection", "keep-alive")

        ctx.Stream(func(w io.Writer) bool {
            event, err := stream.Recv(ctx)
            if err != nil {
                return false
            }
            if event.EventType == ai.EventTypeToolCall {
                return true
            }
            ctx.SSEvent("message", event)
            return true
        })
    }
}
```

### Example 2: Non-Streaming AI Task with Callbacks

```go
func ProcessAITask(ctx context.Context, svc *service.Service, orgID string) error {
    messages := []ai.ChatMessage{
        {Role: model.AIChatMessageRoleUser, Content: "Analyze this data and provide insights"},
    }

    options := []ai.WithChatOptions{
        ai.WithChatMaxIterations(20),
        ai.WithChatMaxTokens(128000),
        ai.WithChatAutoSummarization(true),
        ai.WithChatToolResultMaxSize(64 * 1024),
        ai.WithChatOnTokenUsage(func(ctx context.Context, stats ai.TokenUsageStats) {
            fmt.Printf("Tokens: prompt=%d completion=%d active=%d\n",
                stats.PromptTokens, stats.CompletionTokens, stats.ActiveTokens)
        }),
        ai.WithChatOnSummary(func(ctx context.Context, msgs []ai.ChatMessage) {
            fmt.Printf("Conversation summarized to %d messages\n", len(msgs))
        }),
    }

    responses, err := svc.CreateChatCompletion(ctx, orgID, "", messages, nil, options...)
    if err != nil {
        return err
    }

    for _, resp := range responses {
        if resp.Role == model.AIChatMessageRoleAssistant && resp.Content != "" {
            fmt.Printf("Result: %s\n", resp.Content)
        }
    }
    return nil
}
```

### Example 3: Frontend Page with AI Integration

```tsx
import { useAI } from '@/contexts/AIContext';
import { useEffect, useState } from 'react';
import { Button } from 'antd';

function UserManagementPage() {
  const { registerPageAI, callAI } = useAI();
  const [users, setUsers] = useState([]);

  // Register page-level AI context
  useEffect(() => {
    return registerPageAI({
      ephemeralSystemPrompts: [
        'The user is on the User Management page. They can view, create, edit, and delete users.',
        'Available user fields: username, email, full_name, phone, roles, status.',
      ],
      pageData: () => users,
      pageDataDescription: 'Returns the list of users currently displayed in the table.',
      tools: [{
        name: 'ui_select_user',
        description: 'Select and highlight a user in the table by username.',
        parameters: {
          type: 'object',
          properties: {
            username: { type: 'string', description: 'The username to select' },
          },
          required: ['username'],
        },
        handler: (argsJson) => {
          const { username } = JSON.parse(argsJson);
          const user = users.find(u => u.username === username);
          if (user) {
            setSelectedUser(user);
            return JSON.stringify({ success: true, user });
          }
          return JSON.stringify({ error: 'User not found' });
        },
      }],
    });
  }, [registerPageAI, users]);

  return (
    <div>
      <Button onClick={() => callAI('Show me users with expired passwords')}>
        Ask AI
      </Button>
      {/* ... table and other UI ... */}
    </div>
  );
}
```

## Best Practices

### AI Models

1. **Secure API Keys**: API keys are automatically encrypted when stored using `safe.EncryptedString`. Always use `util.FieldTypePassword` / `format=password` for sensitive config fields.
2. **Set Default Models**: Each organization should have a default model so callers can pass an empty `modelID`.
3. **Test Before Enabling**: Use the test endpoint to verify connectivity:
  ```http
   POST /api/ai/models/:id/test
  ```
4. **Configure `max_chat_tokens` / `max_chat_iterations`**: Set these on the model (not only in provider config) so summarization thresholds and tool-loop caps are accurate.

### Toolsets

1. **Validate Configuration**: Always implement `Validate()` to catch misconfigurations early.
2. **Implement Test**: The `Test(ctx)` method should make a minimal API call to verify connectivity.
3. **Handle Timeouts**: Tool calls should have reasonable timeouts:
  ```go
   ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
   defer cancel()
  ```
4. **Write Clear Descriptions**: Tool descriptions are critical for the AI to use tools correctly.
5. **Keep Results Concise**: Large tool results (>32KB by default) are automatically summarized or offloaded. Design tools to return focused data.
6. **Use `disabled_tools`**: Prefer config-level disables for preset toolsets instead of deleting rows.
7. **Remember prefixing**: Models see `{type}{id}_{name}`; RBAC/bindings use logical names.

### Streaming

1. **Use Streaming for Interactive Chat**: Better UX with real-time output.
2. **Limit Iterations**: Prevent runaway tool-call loops (`WithChatMaxIterations` or model `max_chat_iterations`; default 10).
3. **Enable Auto-Summarization for Long Conversations**: Chat API already enables it; set `max_chat_tokens` on the model:
  ```go
   ai.WithChatMaxTokens(128000)
   ai.WithChatAutoSummarization(true)
  ```
4. **Pass SessionStore for multi-turn chat**: Use `WithChatSession` so summarization and HITL persist correctly.

### Client Tools

1. **Prefix with `ui_`**: All client tool names must match `^ui_[a-zA-Z0-9_]+$`.
2. **Return JSON**: Tool handlers should return JSON strings for structured data.
3. **Handle Errors Gracefully**: Return error information in the result rather than throwing.
4. **Cleanup on Unmount**: Always return the cleanup function from `registerPageAI`.

### Security

1. **Permission Checks**: AI chat requires `ai:chat:create` (default role: `operator`). Trace APIs require `ai:trace:manage`.
2. **Tool Authorization**: Organization tools are filtered by `GetAuthorizedToolSets`; empty perms mean no tools.
3. **Client Tool Validation**: The server validates client tool names and descriptions.
4. **Skill–tool binding**: Treat `system_enable_skill_tool_binding` as a progressive-disclosure control, not a substitute for RBAC.
5. **MCP server (`/api/mcp`)**: Exposes only the caller’s authorized tools — protect tokens accordingly.

### Observability

1. **Prometheus Metrics**: Token usage via `ai_tokens_total{type=prompt|completion}`.
2. **Debug Trace**: Toggle `ai_debug_enabled` and inspect `/api/ai/trace/events`.
3. **Structured Logging**: AI operations use `go-kit/log` with contextual fields.

## Next Steps

- Check out the [API Best Practices](./09-api-best-practices.md) guide
- Learn about [Middleware](./08-middleware.md) for protecting AI endpoints
- Review [Advanced Topics](./13-advanced-topics.md) for complex integrations

---

For more information, refer to the code examples in `/demo` directory or contact the development team.