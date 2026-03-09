# AI and Toolsets

This guide covers the AI model integration and toolsets functionality in EZ-Console, including how to use built-in providers, register custom implementations, and integrate with the frontend chat UI.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [AI Models](#ai-models)
  - [Built-in AI Providers](#built-in-ai-providers)
  - [Using AI Models](#using-ai-models)
  - [Registering Custom AI Models](#registering-custom-ai-models)
  - [AIClientFactoryV2 (JSON Schema)](#aiclientfactoryv2-json-schema)
- [Toolsets](#toolsets)
  - [Built-in Toolsets](#built-in-toolsets)
  - [Using Toolsets](#using-toolsets)
  - [Registering Custom Toolsets](#registering-custom-toolsets)
  - [ToolSetFactoryV2 (JSON Schema)](#toolsetfactoryv2-json-schema)
  - [RBAC Tool Permissions](#rbac-tool-permissions)
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
  - [One-Shot Summarization](#one-shot-summarization)
  - [Segmented Summarization](#segmented-summarization)
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

- **Connect multiple AI providers**: Built-in support for OpenAI-compatible APIs, extensible to custom providers
- **Server-side tool calling**: Enable AI models to call external tools and APIs (MCP, custom toolsets)
- **Client-side tool calling**: Allow the AI model to invoke browser-side functions (e.g. reading page data)
- **Streaming responses**: Real-time SSE-based streaming chat completions with tool call status updates
- **Skills system**: Markdown-based instruction packs that can be injected into AI context, with on-demand loading
- **Auto-summarization**: Automatic conversation condensing when context window limits are reached (one-shot and segmented)
- **Multi-tenancy**: Organization-scoped AI models, toolsets, and RBAC-based tool permissions
- **Session management**: Persistent chat sessions with automatic title generation and configurable retention
- **Extensibility**: Easy registration of custom AI providers and toolsets via factory pattern

## Architecture

The AI system follows a layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │  AIContext   │  │  AIChat.tsx  │  │  Page Components   │  │
│  │  (Provider)  │  │  (Chat UI)   │  │  (registerPageAI)  │  │
│  └──────┬───────┘  └──────┬───────┘  └─────────┬──────────┘  │
│         └─────────────────┼────────────────────┘             │
│                           │ SSE / REST                       │
├───────────────────────────┼──────────────────────────────────┤
│                    API Layer (Gin)                           │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  AIChatController (pkg/api/ai/)                         │ │
│  │  - REST endpoints for session CRUD                      │ │
│  │  - SSE streaming for chat                               │ │
│  │  - Client tool handoff + ephemeral system prompts       │ │
│  └──────────────────────┬──────────────────────────────────┘ │
├──────────────────────────┼───────────────────────────────────┤
│                   Service Layer                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  AIChatService  │  AIModelService  │  ToolSetService    │ │
│  │  SkillService   │                  │                    │ │
│  └──────────────────────┬──────────────────────────────────┘ │
├──────────────────────────┼───────────────────────────────────┤
│               AI Client Layer (pkg/clients/ai/)              │
│  ┌──────────────────┐  ┌──────────────────────────────────┐  │
│  │  AIClient        │  │  ClassicChatClient               │  │
│  │  (Chat/Stream)   │  │  (Exchange/ExchangeStream)       │  │
│  │                  │  │  - Tool call loop                │  │
│  │                  │  │  - Auto-summarization            │  │
│  │                  │  │  - Rate limit retry              │  │
│  └──────────────────┘  └──────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│                 Toolset Layer (pkg/toolset/)                  │
│  ┌─────────────┐ ┌──────────┐ ┌────────┐ ┌──────────────┐   │
│  │ ToolSets    │ │  MCP     │ │ Utils  │ │ SkillLoader  │   │
│  │ (map+prefix)│ │ ToolSet  │ │ToolSet │ │  ToolSet     │   │
│  └─────────────┘ └──────────┘ └────────┘ └──────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

**Key concepts:**

- `AIClient` is the low-level interface for a single chat request (one round-trip to the AI provider).
- `ClassicChatClient` wraps `AIClient` with higher-level logic: iterative tool-call loops, auto-summarization, rate-limit retries, and client tool handoff.
- `ToolSets` is a `map[string]ToolSet` where each key becomes a **prefix** for tool names (e.g. key `"mcp"` + tool `"query"` → `"mcp_query"`). This avoids name collisions across toolsets.
- The streaming protocol uses SSE with typed events (`content`, `tool_call`, `error`, `client_tool_pending`).

## AI Models

### Built-in AI Providers

#### OpenAI Provider

Supports any OpenAI-compatible API (OpenAI, Azure OpenAI, local LLMs with OpenAI-compatible endpoints).

Configuration fields:

- `api_key` (required, password): Your OpenAI API key (encrypted at rest)
- `model_id` (required, string): Model identifier (e.g., `gpt-4`, `gpt-3.5-turbo`)
- `base_url` (optional, string): Custom API endpoint URL (defaults to `https://api.openai.com/v1`)
- `organization_id` (optional, string): OpenAI organization ID
- `max_tokens` (optional, integer): Maximum tokens for the model's context window (used for auto-summarization threshold)

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
    "base_url": "https://api.openai.com/v1",
    "max_tokens": 128000
  },
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
    responses, err = svc.CreateChatCompletion(ctx, organizationID, "", messages)
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
    aiModelSvc := service.NewAIModelService()
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

    // Exchange: iterative tool-call loop with all options
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

    stream, err := svc.CreateChatCompletionStream(ctx, organizationID, "", messages)
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

To register a custom AI model provider, implement the `AIClient` interface and register it via an `AIClientFactory`.

#### Step 1: Implement AIClient Interface

```go
package customai

import (
    "context"
    "github.com/sven-victor/ez-console/pkg/clients/ai"
    "github.com/sven-victor/ez-console/pkg/toolset"
)

type CustomAIClient struct {
    apiKey   string
    endpoint string
    modelID  string
}

// Chat creates a non-streaming chat completion (single round-trip)
func (c *CustomAIClient) Chat(
    ctx context.Context,
    messages []ai.ChatMessage,
    toolSets toolset.ToolSets,
) (*ai.ChatMessage, error) {
    // Convert messages to your API format, include tools from toolSets
    // Make API call, return the assistant's response message
    return nil, fmt.Errorf("not implemented")
}

// ChatStream creates a streaming chat completion (single round-trip)
func (c *CustomAIClient) ChatStream(
    ctx context.Context,
    messages []ai.ChatMessage,
    toolSets toolset.ToolSets,
) (ai.ChatStream, error) {
    // Convert messages, make streaming API call
    // Return a ChatStream that yields ChatStreamEvent via Recv()
    return nil, fmt.Errorf("not implemented")
}
```

The `ClassicChatClient` wrapper automatically adds the tool-call iteration loop, auto-summarization, and rate-limit retries on top of your `AIClient` implementation. You only need to implement single round-trip chat logic.

#### Step 2: Implement AIClientFactory Interface

```go
package customai

import (
    "context"
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

// GetConfigFields returns configuration fields for the frontend form
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

// CreateClient creates an AIClient from configuration
func (f *CustomAIClientFactory) CreateClient(ctx context.Context, organizationID string, config map[string]interface{}) (ai.AIClient, error) {
    apiKey, _ := config["api_key"].(string)
    endpoint, _ := config["endpoint"].(string)
    modelID, _ := config["model_id"].(string)

    if apiKey == "" || endpoint == "" || modelID == "" {
        return nil, fmt.Errorf("api_key, endpoint, and model_id are required")
    }

    return &CustomAIClient{
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
    SystemPrompt   string `json:"system_prompt,omitempty"    jsonschema:"description=System prompt prepended to every conversation (optional)" jsonschema_extras:"x-ui-widget=textarea"`
}
```

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

The `ToolSets` type is `map[string]ToolSet`, where the map key serves as a **namespace prefix**. When tools are exposed to the AI model, function names are prefixed with their map key (e.g., a tool named `query` in a toolset registered under key `"mcp"` becomes `mcp_query`). This prevents name collisions across different toolsets.

### Built-in Toolsets

#### 1. Utils Toolset

A simple toolset providing utility functions.

**Available Tools:**

- `now`: Get current time in a specified format (default: RFC3339)
- `sleep`: Sleep for a specified duration (max 60 seconds)

**Configuration:** No configuration required.

#### 2. MCP Toolset

Model Context Protocol (MCP) toolset for connecting to MCP-compatible servers.

**Configuration Fields:**

- `name` (required): Toolset name
- `endpoint` (required): MCP server endpoint URL
- `protocol` (optional): Protocol type (http, websocket)
- `username` (optional): Authentication username
- `password` (optional): Authentication password
- `token` (optional): Authentication token

#### 3. Skill Loader Toolset (Runtime)

An internal toolset injected at runtime when skills are loaded via domains or skill IDs. Not configurable from the admin UI — it is automatically created when the chat API receives `domains` or `skill_ids` parameters.

**Available Tools:**

- `get_skill_content`: Read the content of a skill by ID, optionally specifying a sub-path
- `list_skill_files`: List files within a skill directory

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
    "token": "your-token-here"
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
    responses, err := svc.CreateChatCompletion(ctx, organizationID, "", messages,
        ai.WithChatMaxIterations(10),
    )
    if err != nil {
        return err
    }

    for _, resp := range responses {
        fmt.Printf("Role: %s, Content: %s\n", resp.Role, resp.Content)
    }

    // Option B: Manual toolset injection
    toolSetSvc := service.NewToolSetService()
    toolSets, err := toolSetSvc.GetAuthorizedToolSets(ctx, organizationID)
    if err != nil {
        return err
    }

    responses, err = svc.CreateChatCompletionWithoutToolSets(ctx, organizationID, "", messages,
        ai.WithChatToolSets(toolSets),
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
    Protocol string                 `json:"protocol"           jsonschema:"required,description=The protocol of the MCP server,enum=http,enum=websocket,default=http"`
    AuthType string                 `json:"auth_type"          jsonschema:"required,description=The authentication type,enum=basic,enum=bearer,default=basic"`
    Username string                 `json:"username,omitempty" jsonschema:"description=The username for the MCP server"`
    Password string                 `json:"password,omitempty" jsonschema:"description=The password for the MCP server,format=password"`
    Token    string                 `json:"token,omitempty"    jsonschema:"description=The bearer token for the MCP server,format=password"`
    Args     map[string]interface{} `json:"args,omitempty"     jsonschema:"description=The arguments for the MCP server" jsonschema_extras:"x-ui-field=objectEditor"`
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

Tool access is controlled per-role via `RoleAIToolPermission` records. Each record specifies:

- `RoleID`: The role being granted access
- `ToolSetID`: The toolset containing the tool
- `ToolName`: The specific tool name (or `"*"` for all tools in the toolset)
- `OrganizationID`: The organization scope

When `ToolSetService.GetAuthorizedToolSets` is called, it returns only the toolsets and tools that the current user's roles are permitted to use. Tools not in the permission list are filtered out via `filteredToolSet`.

## Skills System

Skills are markdown-based instruction packs stored on disk that can be injected into the AI context to provide domain-specific knowledge and behavior.

### Skill Structure

Each skill is stored as a directory under the configured `skills_path`:

```
skills/
├── <skill-resource-id>/
│   ├── main.md          # Primary skill content (with YAML frontmatter)
│   ├── examples.md      # Additional reference files
│   └── templates/
│       └── ...
```

The `main.md` file contains YAML frontmatter:

```markdown
---
name: "Database Query Assistant"
description: "Helps users write and optimize SQL queries"
category: "database"
---

# Database Query Assistant

You are a database expert. When the user asks about SQL...
```

Skills are persisted in the database (`model.Skill`) for metadata (name, description, category, domain) and on the filesystem for content.

### Skill Domains

Skills are organized into **domains**. The built-in domain is `"core"`. Additional domains can be registered:

```go
skillService.RegisterSkillsDomain("analytics")
skillService.RegisterSkillsDomain("devops")
```

The frontend allows users to select skill domains or specific skills when chatting.

### Progressive Skill Loading

When the chat API receives `domains` or `skill_ids` parameters, it uses **progressive loading** instead of dumping all skill content into the context:

1. `LoadSkillsMetadataForChat` generates a concise **metadata table** (ID, name, description, domain) as a system message.
2. A `SkillLoaderToolSet` is injected, providing `get_skill_content` and `list_skill_files` tools.
3. The AI model reads skill content **on demand** using these tools, keeping the initial context small.

This approach is especially important for large skill libraries where injecting all content would exceed context limits.

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
- On the server, client tools are wrapped in a `clientToolsProxy` ToolSet that returns `ErrClientToolHandoff` when the model calls them, signaling the stream to pause and hand control back to the browser.

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

On the backend, the `AIChatController.StreamChat` handler:

1. Validates client tool names match `^ui_[a-zA-Z0-9_]+$`.
2. Converts `ClientToolDefinition` list to `openai.Tool` format and injects via `WithChatClientTools`.
3. These tools are wrapped in a `clientToolsProxy` ToolSet under the `"ui"` key.
4. When the model calls a `ui_*` tool, the proxy returns `ErrClientToolHandoff`.
5. The `ClassicChatStream` detects the handoff, emits a `client_tool_pending` SSE event with the pending calls, and ends the stream.
6. The frontend executes the tools, then sends a new request with `client_tool_results`.
7. Results are persisted as `role=tool` messages, and a new AI completion stream begins.

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

**Session cleanup:** A scheduled job (`ai-chat-session-cleanup`) runs daily and deletes sessions older than the configured retention period (default: 90 days, configurable via `model.SettingTaskAIChatRetentionDays`).

**Anonymous sessions:** Sessions created with `anonymous: true` are not listed in the user's session list but still persist messages. Used for programmatic `callAI` invocations from the frontend.

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
| `tool_call`           | Server-side tool execution status           | `message_id`, `tool_calls` (with status) |
| `client_tool_pending` | Control handoff to browser for client tools | `message_id`, `client_tool_calls`        |
| `error`               | Error message                               | `content` (error text)                   |


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

The `WithChatOptions` functional options control the behavior of `Exchange` and `ExchangeStream`:


| Option                                      | Description                                              | Default      |
| ------------------------------------------- | -------------------------------------------------------- | ------------ |
| `WithChatToolSets(toolSets)`                | Inject static toolsets                                   | none         |
| `WithChatToolSetsFactory(factory)`          | Lazy toolset loading (cacheable)                         | none         |
| `WithChatMaxIterations(n)`                  | Max tool-call iterations                                 | 30           |
| `WithChatMaxTokens(n)`                      | Context window size for auto-summarization               | 0 (disabled) |
| `WithChatAutoSummarization(bool)`           | Enable proactive summarization at 90% threshold          | false        |
| `WithChatFinalPrompt(prompt)`               | Append a final user prompt after all tool calls complete | none         |
| `WithChatToolResultMaxSize(bytes)`          | Auto-summarize tool results exceeding this size          | 32KB         |
| `WithChatResponseJsonSchema(schema)`        | Request JSON-formatted final response                    | none         |
| `WithChatClientTools(tools)`                | Client-side tool definitions                             | none         |
| `WithChatOnMessageAdded(callback)`          | Called when a message is appended to the conversation    | none         |
| `WithChatOnSummary(callback)`               | Called when messages are summarized                      | none         |
| `WithChatOnToolCallResultChanged(callback)` | Called when a tool result is available                   | none         |


## Auto-Summarization

When a conversation exceeds the model's context window, the system automatically summarizes older messages to make room for new ones. There are two strategies:

### One-Shot Summarization

Used as the first attempt. The system sends all messages (except the first system message) to the AI with a "please summarize" prompt. If the summarization request itself fits in the context window, the result replaces the old messages.

### Segmented Summarization

When one-shot summarization fails (the messages themselves exceed the context window), the system falls back to a tool-based segmented approach:

1. A `summaryToolSet` is created with two tools:
  - `get_messages`: Read message content by ID, with optional `start`/`end` byte offsets for chunked reading of very long messages.
  - `save_summary`: Persist the condensed conversation, replacing original history.
2. A system prompt presents an overview table of all messages (ID, role, content length, type).
3. The AI reads messages in segments using `get_messages`, building a running summary.
4. Once complete, the AI calls `save_summary` with the condensed message array.
5. The `OnSummary` callback persists the summarized messages to the database.

This approach handles conversations of any length, limited only by the summarization model's own context window per segment.

**Trigger conditions:**

- **Proactive** (when `EnableAutoSummarization` is true): Summarize when tokens reach 90% of `MaxTokens`.
- **Reactive**: When the AI API returns a "maximum context length exceeded" error, summarization is attempted automatically (up to 3 retries).

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

        // Load skill metadata and create skill loader toolset
        options := []ai.WithChatOptions{
            ai.WithChatMaxIterations(10),
            ai.WithChatOnMessageAdded(func(ctx context.Context, msg ai.ChatMessage) {
                svc.AddChatMessage(ctx, organizationID, userID.(string),
                    session.ResourceID, msg.Role, msg.Content, nil, msg.ToolCallID)
            }),
        }

        if len(req.Domains) > 0 || len(req.SkillIDs) > 0 {
            metadata, skillIDs, _ := svc.SkillService.LoadSkillsMetadataForChat(ctx,
                req.Domains, req.SkillIDs)
            if metadata != "" {
                messages = append([]ai.ChatMessage{{
                    Role: model.AIChatMessageRoleSystem, Content: metadata,
                }}, messages...)
                loaderTS := service.NewSkillLoaderToolSet(ctx, svc.SkillService, skillIDs)
                options = append(options, ai.WithChatToolSetsFactory(
                    toolset.NewStaticToolSetsFactory(toolset.ToolSets{"skill_loader": loaderTS}),
                ))
            }
        }

        // Stream response
        stream, err := svc.CreateChatCompletionStream(ctx, organizationID, "", messages, options...)
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
        ai.WithChatOnMessageAdded(func(ctx context.Context, msg ai.ChatMessage) {
            fmt.Printf("Message added: role=%s\n", msg.Role)
        }),
        ai.WithChatOnSummary(func(ctx context.Context, msgs []ai.ChatMessage) {
            fmt.Printf("Conversation summarized to %d messages\n", len(msgs))
        }),
    }

    responses, err := svc.CreateChatCompletion(ctx, orgID, "", messages, options...)
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

1. **Secure API Keys**: API keys are automatically encrypted when stored using `safe.EncryptedString`. Always use `util.FieldTypePassword` for sensitive config fields.
2. **Set Default Models**: Each organization should have a default model so callers can pass an empty `modelID`.
3. **Test Before Enabling**: Use the test endpoint to verify connectivity:
  ```http
   POST /api/ai/models/:id/test
  ```
4. **Configure `max_tokens`**: Set this in the model config to enable accurate auto-summarization thresholds.

### Toolsets

1. **Validate Configuration**: Always implement `Validate()` to catch misconfigurations early.
2. **Implement Test**: The `Test(ctx)` method should make a minimal API call to verify connectivity.
3. **Handle Timeouts**: Tool calls should have reasonable timeouts:
  ```go
   ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
   defer cancel()
  ```
4. **Write Clear Descriptions**: Tool descriptions are critical for the AI to use tools correctly:
  ```go
   Description: "Fetches user information by user ID. Returns user profile including name, email, and role.",
  ```
5. **Keep Results Concise**: Large tool results (>32KB by default) are automatically summarized. Design your tools to return focused, relevant data.

### Streaming

1. **Use Streaming for Interactive Chat**: Provides a better user experience with real-time output.
2. **Limit Iterations**: Prevent runaway tool-call loops:
  ```go
   ai.WithChatMaxIterations(10)
  ```
3. **Enable Auto-Summarization for Long Conversations**: Prevents context overflow in multi-turn chats:
  ```go
   ai.WithChatMaxTokens(128000)
   ai.WithChatAutoSummarization(true)
  ```

### Client Tools

1. **Prefix with `ui_`**: All client tool names must match `^ui_[a-zA-Z0-9_]+$`.
2. **Return JSON**: Tool handlers should return JSON strings for structured data.
3. **Handle Errors Gracefully**: Return error information in the result rather than throwing:
  ```tsx
   handler: async (argsJson) => {
     try {
       // ... tool logic
       return JSON.stringify({ success: true, data: result });
     } catch (err) {
       return JSON.stringify({ error: err.message });
     }
   }
  ```
4. **Cleanup on Unmount**: Always return the cleanup function from `registerPageAI`:
  ```tsx
   useEffect(() => {
     return registerPageAI({ ... }); // Returns unregister function
   }, [deps]);
  ```

### Security

1. **Permission Checks**: AI chat requires the `ai:chat:create` permission (default role: `operator`).
2. **Tool Authorization**: Toolsets are filtered by RBAC permissions via `GetAuthorizedToolSets`.
3. **Client Tool Validation**: The server validates client tool names and descriptions to prevent injection.
4. **Input Length Limits**: Consider limiting message length and the number of messages per session.

### Observability

1. **Prometheus Metrics**: Token usage is tracked via `ai_tokens_total` counter with `type` label (`prompt`, `completion`).
2. **Structured Logging**: All AI operations use `go-kit/log` with contextual fields for tracing.

## Next Steps

- Check out the [API Best Practices](./09-api-best-practices.md) guide
- Learn about [Middleware](./08-middleware.md) for protecting AI endpoints
- Review [Advanced Topics](./13-advanced-topics.md) for complex integrations

---

For more information, refer to the code examples in `/demo` directory or contact the development team.