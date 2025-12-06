# AI and Toolsets

This guide covers the AI model integration and toolsets functionality in EZ-Console, including how to use built-in providers and register custom implementations.

## Table of Contents

- [Overview](#overview)
- [AI Models](#ai-models)
  - [Built-in AI Providers](#built-in-ai-providers)
  - [Using AI Models](#using-ai-models)
  - [Registering Custom AI Models](#registering-custom-ai-models)
- [Toolsets](#toolsets)
  - [Built-in Toolsets](#built-in-toolsets)
  - [Using Toolsets](#using-toolsets)
  - [Registering Custom Toolsets](#registering-custom-toolsets)
- [Integration Examples](#integration-examples)
- [Best Practices](#best-practices)

## Overview

EZ-Console provides a flexible AI integration system that allows you to:

- **Connect multiple AI providers**: Support for OpenAI and custom AI models
- **Tool calling**: Enable AI models to call external tools and APIs
- **Streaming responses**: Support for real-time streaming chat completions
- **Multi-tenancy**: Organization-scoped AI models and toolsets
- **Extensibility**: Easy registration of custom AI providers and toolsets

## AI Models

### Built-in AI Providers

The framework comes with built-in support for OpenAI-compatible APIs.

#### OpenAI Provider

Configuration fields:
- `api_key` (required, password): Your OpenAI API key
- `model_id` (required, string): Model identifier (e.g., gpt-4, gpt-3.5-turbo)
- `base_url` (optional, string): Custom API endpoint URL
- `organization_id` (optional, string): OpenAI organization ID

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
  "is_default": true
}
```

#### 2. Using AI Models in Your Code

```go
package main

import (
    "context"
    "github.com/sven-victor/ez-console/pkg/service"
    "github.com/sven-victor/ez-console/pkg/clients/ai"
    "github.com/sven-victor/ez-console/pkg/model"
)

func useAIModel(ctx context.Context, svc *service.Service) error {
    // Get the default AI model for the organization
    organizationID := "org-123"
    aiModel, err := svc.GetDefaultAIModel(ctx, organizationID)
    if err != nil {
        return err
    }

    // Get the AI client factory
    factory, exists := ai.GetFactory(aiModel.Provider)
    if !exists {
        return fmt.Errorf("unsupported provider: %s", aiModel.Provider)
    }

    // Create AI client from config
    client, err := factory.CreateClient(aiModel.Config)
    if err != nil {
        return err
    }

    // Create chat messages
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

    // Create non-streaming chat completion
    responses, err := client.CreateChat(ctx, messages)
    if err != nil {
        return err
    }

    // Process responses
    for _, resp := range responses {
        fmt.Printf("Role: %s, Content: %s\n", resp.Role, resp.Content)
    }

    return nil
}
```

#### 3. Streaming Chat Completion

```go
func streamAIChat(ctx context.Context, client ai.AIClient) error {
    messages := []ai.ChatMessage{
        {
            Role:    model.AIChatMessageRoleUser,
            Content: "Tell me a story",
        },
    }

    // Create streaming chat
    stream, err := client.CreateChatStream(ctx, messages)
    if err != nil {
        return err
    }
    defer stream.Close()

    // Receive and process stream events
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
            // Handle content delta
            fmt.Print(event.Content)
        case ai.EventTypeToolCall:
            // Handle tool calls
            for _, toolCall := range event.ToolCalls {
                fmt.Printf("Tool call: %s\n", toolCall.Function.Name)
            }
        }
    }

    return nil
}
```

### Registering Custom AI Models

To register a custom AI model provider, implement the `AIClientFactory` interface and register it in your `init()` function.

#### Step 1: Implement AIClient Interface

```go
package customai

import (
    "context"
    "github.com/sven-victor/ez-console/pkg/clients/ai"
)

// CustomAIClient implements the AIClient interface
type CustomAIClient struct {
    apiKey   string
    endpoint string
    modelID  string
}

// CreateChatStream implements AIClient.CreateChatStream
func (c *CustomAIClient) CreateChatStream(
    ctx context.Context,
    messages []ai.ChatMessage,
    options ...ai.WithChatCompletionOptions,
) (ai.ChatStream, error) {
    // Implement streaming chat logic
    // Convert messages to your API format
    // Make streaming API call
    // Return a ChatStream implementation
    return nil, fmt.Errorf("not implemented")
}

// CreateChat implements AIClient.CreateChat
func (c *CustomAIClient) CreateChat(
    ctx context.Context,
    messages []ai.ChatMessage,
    options ...ai.WithChatCompletionOptions,
) ([]ai.ChatMessage, error) {
    // Implement non-streaming chat logic
    // Convert messages to your API format
    // Make API call
    // Return response messages
    return nil, fmt.Errorf("not implemented")
}
```

#### Step 2: Implement AIClientFactory Interface

```go
package customai

import (
    "github.com/sven-victor/ez-console/pkg/clients/ai"
    "github.com/sven-victor/ez-console/pkg/model"
    "github.com/sven-victor/ez-console/pkg/util"
)

// CustomAIClientFactory implements AIClientFactory
type CustomAIClientFactory struct{}

// GetName returns the provider name
func (f *CustomAIClientFactory) GetName() string {
    return "Custom AI"
}

// GetDescription returns the provider description
func (f *CustomAIClientFactory) GetDescription() string {
    return "Custom AI provider implementation"
}

// GetConfigFields returns configuration fields for the frontend
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

// CreateClient creates a client from configuration
func (f *CustomAIClientFactory) CreateClient(config map[string]interface{}) (ai.AIClient, error) {
    apiKey, ok := config["api_key"].(string)
    if !ok || apiKey == "" {
        return nil, fmt.Errorf("api_key is required")
    }

    endpoint, ok := config["endpoint"].(string)
    if !ok || endpoint == "" {
        return nil, fmt.Errorf("endpoint is required")
    }

    modelID, ok := config["model_id"].(string)
    if !ok || modelID == "" {
        return nil, fmt.Errorf("model_id is required")
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

const (
    // Define your custom provider type
    AIModelProviderCustom model.AIModelProvider = "custom"
)

func init() {
    // Register the factory during package initialization
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
    // Your custom AI provider is now available
    server.Start()
}
```

## Toolsets

Toolsets allow AI models to call external tools and APIs during chat completions. This enables AI to perform actions like fetching data, executing commands, or interacting with external services.

### Built-in Toolsets

#### 1. Utils Toolset

A simple toolset providing utility functions.

**Available Tools:**
- `now`: Get current time
- `sleep`: Sleep for a specified duration (max 60 seconds)

**Configuration:**
No configuration required.

#### 2. MCP Toolset

Model Context Protocol (MCP) toolset for connecting to MCP-compatible servers.

**Configuration Fields:**
- `name` (required): Toolset name
- `endpoint` (required): MCP server endpoint URL
- `protocol` (optional): Protocol type (http, websocket)
- `username` (optional): Authentication username
- `password` (optional): Authentication password
- `token` (optional): Authentication token

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

#### 2. Using Toolsets with AI

```go
package main

import (
    "context"
    "github.com/sven-victor/ez-console/pkg/service"
    "github.com/sven-victor/ez-console/pkg/clients/ai"
    "github.com/sven-victor/ez-console/pkg/model"
    "github.com/sven-victor/ez-console/pkg/toolset"
)

func useAIWithToolsets(ctx context.Context, svc *service.Service) error {
    organizationID := "org-123"
    
    // Get AI client
    aiModel, err := svc.GetDefaultAIModel(ctx, organizationID)
    if err != nil {
        return err
    }
    
    factory, _ := ai.GetFactory(aiModel.Provider)
    client, err := factory.CreateClient(aiModel.Config)
    if err != nil {
        return err
    }

    // Prepare messages
    messages := []ai.ChatMessage{
        {
            Role:    model.AIChatMessageRoleUser,
            Content: "What's the current time?",
        },
    }

    // Create toolsets factory function
    toolSetsFactory := func(ctx context.Context) (toolset.ToolSets, error) {
        return svc.GetAllEnabledToolSetInstances(ctx, organizationID)
    }

    // Create chat with toolsets
    responses, err := client.CreateChat(ctx, messages, 
        ai.WithToolSets(toolSetsFactory),
        ai.WithMaxIterations(10),
    )
    if err != nil {
        return err
    }

    // Process responses (may include tool calls and results)
    for _, resp := range responses {
        fmt.Printf("Role: %s, Content: %s\n", resp.Role, resp.Content)
        
        // Check for tool calls
        for _, toolCall := range resp.ToolCalls {
            fmt.Printf("Tool: %s, Args: %s\n", 
                toolCall.Function.Name, 
                toolCall.Function.Arguments)
        }
    }

    return nil
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

// CustomToolSet implements the ToolSet interface
type CustomToolSet struct {
    apiKey   string
    endpoint string
    // Add your configuration fields
}

// GetName returns the toolset name
func (t *CustomToolSet) GetName() string {
    return "custom-toolset"
}

// GetDescription returns the toolset description
func (t *CustomToolSet) GetDescription() string {
    return "Custom toolset implementation"
}

// Validate validates the toolset configuration
func (t *CustomToolSet) Validate() error {
    if t.apiKey == "" {
        return fmt.Errorf("api_key is required")
    }
    if t.endpoint == "" {
        return fmt.Errorf("endpoint is required")
    }
    return nil
}

// Test tests the toolset connection
func (t *CustomToolSet) Test(ctx context.Context) error {
    // Implement a simple test to verify connectivity
    // For example, make a ping request to your service
    return nil
}

// ListTools returns the available tools
func (t *CustomToolSet) ListTools(ctx context.Context) ([]openai.Tool, error) {
    // Define your tools
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

// Call executes a tool
func (t *CustomToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
    switch name {
    case "fetch_data":
        // Parse parameters
        var params struct {
            Query string `json:"query"`
            Limit int    `json:"limit"`
        }
        if err := json.Unmarshal([]byte(parameters), &params); err != nil {
            return "", fmt.Errorf("failed to parse parameters: %w", err)
        }

        // Execute your tool logic
        // Call external API, database, etc.
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

// CustomToolSetFactory implements ToolSetFactory
type CustomToolSetFactory struct{}

// GetName returns the factory name
func (f *CustomToolSetFactory) GetName() string {
    return "Custom Toolset"
}

// GetDescription returns the factory description
func (f *CustomToolSetFactory) GetDescription() string {
    return "Factory for creating custom toolset instances"
}

// GetConfigFields returns configuration fields for the frontend
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

// CreateToolSet creates a toolset instance from configuration JSON
func (f *CustomToolSetFactory) CreateToolSet(configJSON string) (toolset.ToolSet, error) {
    var config map[string]interface{}
    if err := json.Unmarshal([]byte(configJSON), &config); err != nil {
        return nil, fmt.Errorf("failed to parse config: %w", err)
    }

    apiKey, ok := config["api_key"].(string)
    if !ok || apiKey == "" {
        return nil, fmt.Errorf("api_key is required")
    }

    endpoint, ok := config["endpoint"].(string)
    if !ok || endpoint == "" {
        return nil, fmt.Errorf("endpoint is required")
    }

    return &CustomToolSet{
        apiKey:   apiKey,
        endpoint: endpoint,
    }, nil
}
```

#### Step 3: Register the Toolset

```go
package customtoolset

import (
    "github.com/sven-victor/ez-console/pkg/toolset"
)

const (
    // Define your custom toolset type
    ToolSetTypeCustom toolset.ToolSetType = "custom"
)

func init() {
    // Register the toolset factory during package initialization
    if err := toolset.RegisterToolSet(ToolSetTypeCustom, &CustomToolSetFactory{}); err != nil {
        panic(err)
    }
}
```

#### Step 4: Import in Your Main Application

```go
package main

import (
    _ "your-module/customtoolset"  // Import to trigger init()
    "github.com/sven-victor/ez-console/server"
)

func main() {
    // Your custom toolset is now available
    server.Start()
}
```

## Integration Examples

### Example 1: AI Chat with Tool Calling

```go
package main

import (
    "context"
    "fmt"
    "io"
    
    "github.com/gin-gonic/gin"
    "github.com/sven-victor/ez-console/pkg/service"
    "github.com/sven-victor/ez-console/pkg/clients/ai"
    "github.com/sven-victor/ez-console/pkg/model"
)

type ChatRequest struct {
    Message string `json:"message" binding:"required"`
}

func HandleChat(svc *service.Service) gin.HandlerFunc {
    return func(ctx *gin.Context) {
        var req ChatRequest
        if err := ctx.ShouldBindJSON(&req); err != nil {
            ctx.JSON(400, gin.H{"error": err.Error()})
            return
        }

        organizationID := ctx.GetString("organization_id")
        
        // Get AI client
        aiModel, err := svc.GetDefaultAIModel(ctx, organizationID)
        if err != nil {
            ctx.JSON(500, gin.H{"error": "Failed to get AI model"})
            return
        }
        
        factory, _ := ai.GetFactory(aiModel.Provider)
        client, err := factory.CreateClient(aiModel.Config)
        if err != nil {
            ctx.JSON(500, gin.H{"error": "Failed to create AI client"})
            return
        }

        // Prepare messages
        messages := []ai.ChatMessage{
            {
                Role:    model.AIChatMessageRoleSystem,
                Content: "You are a helpful assistant with access to various tools.",
            },
            {
                Role:    model.AIChatMessageRoleUser,
                Content: req.Message,
            },
        }

        // Stream response with toolsets
        stream, err := client.CreateChatStream(ctx, messages,
            ai.WithToolSets(func(ctx context.Context) (toolset.ToolSets, error) {
                return svc.GetAllEnabledToolSetInstances(ctx, organizationID)
            }),
            ai.WithMaxIterations(10),
        )
        if err != nil {
            ctx.JSON(500, gin.H{"error": "Failed to create chat stream"})
            return
        }
        defer stream.Close()

        // Set headers for SSE
        ctx.Writer.Header().Set("Content-Type", "text/event-stream")
        ctx.Writer.Header().Set("Cache-Control", "no-cache")
        ctx.Writer.Header().Set("Connection", "keep-alive")

        // Stream events
        for {
            event, err := stream.Recv(ctx)
            if err != nil {
                if err == io.EOF {
                    break
                }
                fmt.Fprintf(ctx.Writer, "event: error\ndata: %s\n\n", err.Error())
                ctx.Writer.Flush()
                break
            }

            switch event.EventType {
            case ai.EventTypeContent:
                fmt.Fprintf(ctx.Writer, "event: content\ndata: %s\n\n", event.Content)
                ctx.Writer.Flush()
            
            case ai.EventTypeToolCall:
                for _, toolCall := range event.ToolCalls {
                    data := fmt.Sprintf(`{"name":"%s","status":"%s"}`, 
                        toolCall.Function.Name, toolCall.Status)
                    fmt.Fprintf(ctx.Writer, "event: tool_call\ndata: %s\n\n", data)
                    ctx.Writer.Flush()
                }
            }
        }
    }
}
```

### Example 2: Background AI Task with Callbacks

```go
package main

import (
    "context"
    "fmt"
    
    "github.com/sven-victor/ez-console/pkg/clients/ai"
    "github.com/sven-victor/ez-console/pkg/model"
)

func ProcessAITask(ctx context.Context, client ai.AIClient) error {
    messages := []ai.ChatMessage{
        {
            Role:    model.AIChatMessageRoleUser,
            Content: "Analyze this data and provide insights",
        },
    }

    // Create options with callbacks
    options := []ai.WithChatCompletionOptions{
        ai.WithMaxIterations(20),
        ai.WithOnMessageEnd(func(ctx context.Context, messageID, content string) {
            fmt.Printf("Message completed: %s\n", messageID)
            // Save message to database, send notification, etc.
        }),
        ai.WithOnToolCallEnd(func(ctx context.Context, toolCall ai.ToolCall) {
            fmt.Printf("Tool call completed: %s -> %s\n", 
                toolCall.Function.Name, toolCall.Status)
            // Log tool execution, track metrics, etc.
        }),
        ai.WithOnToolCallsStart(func(ctx context.Context, toolCalls []ai.ToolCall) {
            fmt.Printf("Starting %d tool calls\n", len(toolCalls))
            // Update UI, show loading indicators, etc.
        }),
    }

    // Execute with callbacks
    responses, err := client.CreateChat(ctx, messages, options...)
    if err != nil {
        return err
    }

    // Process final responses
    for _, resp := range responses {
        fmt.Printf("Final response: %s\n", resp.Content)
    }

    return nil
}
```

## Best Practices

### AI Models

1. **Secure API Keys**: Always use encrypted configuration fields for sensitive data
   ```go
   // API keys are automatically encrypted when stored
   config := map[string]interface{}{
       "api_key": "sk-...",  // Will be encrypted
   }
   ```

2. **Set Default Models**: Each organization should have a default model
   ```go
   aiModel.IsDefault = true
   ```

3. **Test Before Enabling**: Use the test endpoint to verify connectivity
   ```http
   POST /api/ai/models/:id/test
   ```

4. **Handle Errors Gracefully**: AI API calls can fail; implement retry logic
   ```go
   var responses []ai.ChatMessage
   var err error
   for retries := 0; retries < 3; retries++ {
       responses, err = client.CreateChat(ctx, messages)
       if err == nil {
           break
       }
       time.Sleep(time.Second * time.Duration(retries+1))
   }
   ```

### Toolsets

1. **Validate Configuration**: Always implement proper validation
   ```go
   func (t *CustomToolSet) Validate() error {
       // Check all required fields
       if t.apiKey == "" {
           return fmt.Errorf("api_key is required")
       }
       return nil
   }
   ```

2. **Implement Test Method**: Provide a way to test connectivity
   ```go
   func (t *CustomToolSet) Test(ctx context.Context) error {
       // Make a simple API call to verify connection
       return t.ping(ctx)
   }
   ```

3. **Handle Timeouts**: Tool calls should have reasonable timeouts
   ```go
   ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
   defer cancel()
   ```

4. **Error Messages**: Return clear, actionable error messages
   ```go
   if err != nil {
       return "", fmt.Errorf("failed to fetch data from API: %w", err)
   }
   ```

5. **Tool Descriptions**: Write clear descriptions for AI to understand
   ```go
   Function: &openai.FunctionDefinition{
       Name:        "fetch_user",
       Description: "Fetches user information by user ID. Returns user profile including name, email, and role.",
       // ...
   }
   ```

### Performance

1. **Use Streaming for Long Responses**: Provides better UX
   ```go
   stream, err := client.CreateChatStream(ctx, messages)
   ```

2. **Limit Iterations**: Prevent infinite loops in tool calling
   ```go
   ai.WithMaxIterations(10)  // Reasonable limit
   ```

3. **Enable Auto-Summarization**: For long conversations
   ```go
   ai.WithMaxTokens(4000),
   ai.WithEnableAutoSummarization(true)
   ```

4. **Cache Tool Responses**: When appropriate
   ```go
   // Implement caching in your toolset
   if cachedResult, ok := t.cache.Get(cacheKey); ok {
       return cachedResult, nil
   }
   ```

### Security

1. **Permission Checks**: Always verify user permissions
   ```go
   middleware.RequirePermission("ai:chat:use")
   ```

2. **Rate Limiting**: Implement rate limits for AI API calls
   ```go
   middleware.RateLimit(10, time.Minute)  // 10 requests per minute
   ```

3. **Input Validation**: Sanitize user inputs
   ```go
   if len(req.Message) > 10000 {
       return errors.New("message too long")
   }
   ```

4. **Audit Logging**: Log AI interactions for compliance
   ```go
   svc.CreateAuditLog(ctx, "ai_chat", organizationID, userID, details)
   ```

## Next Steps

- Check out the [API Best Practices](./09-api-best-practices.md) guide
- Learn about [Middleware](./08-middleware.md) for protecting AI endpoints
- Review [Advanced Topics](./13-advanced-topics.md) for complex integrations

---

For more information, refer to the code examples in `/demo` directory or contact the development team.

