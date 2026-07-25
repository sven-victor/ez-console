// Copyright 2025 Sven Victor
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

package ai

import (
	"context"
	"fmt"
	"os"

	"github.com/invopop/jsonschema"
	aimodel "github.com/sven-victor/ez-agent/model"
	"github.com/sven-victor/ez-agent/model/openai"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/safe"
)

// newOpenAIClientFromConfig creates a new OpenAI client from configuration map
func newOpenAIClientFromConfig(config map[string]interface{}) (*openai.Provider, error) {
	var openaiOptions []openai.Option
	// Extract API key
	apiKeyVal, ok := config["api_key"].(string)
	if !ok || apiKeyVal == "" {
		return nil, fmt.Errorf("api_key is required")
	}
	apiKey := safe.NewEncryptedString(apiKeyVal, os.Getenv(safe.SecretEnvName))
	decKey, err := apiKey.UnsafeString()
	if err != nil {
		return nil, fmt.Errorf("failed to get API key: %w", err)
	}

	// Extract model ID
	modelID, ok := config["model_id"].(string)
	if !ok || modelID == "" {
		return nil, fmt.Errorf("model_id is required")
	}
	openaiOptions = append(openaiOptions, openai.WithModel(modelID))

	openaiOptions = append(openaiOptions, openai.WithAPIKey(decKey))

	// Set custom base URL if provided
	if baseURL, ok := config["base_url"].(string); ok && baseURL != "" {
		openaiOptions = append(openaiOptions, openai.WithBaseURL(baseURL))
	}

	// Set organization ID if provided
	if orgID, ok := config["organization_id"].(string); ok && orgID != "" {
		openaiOptions = append(openaiOptions, openai.WithOrganization(orgID))
	}

	openaiProvider := openai.New(openaiOptions...)

	return openaiProvider, nil
}

// OpenAIConfig is the config shape for the OpenAI provider (for JSON Schema reflection).
type OpenAIConfig struct {
	APIKey         string `json:"api_key" jsonschema:"title=API Key,description=OpenAI API key (encrypted),format=password"`
	ModelID        string `json:"model_id" jsonschema:"title=Model ID,description=OpenAI model ID (e.g.\\, gpt-4\\, gpt-3.5-turbo)"`
	BaseURL        string `json:"base_url,omitempty" jsonschema:"title=Base URL,description=Custom API endpoint URL (optional)"`
	OrganizationID string `json:"organization_id,omitempty" jsonschema:"title=Organization ID,description=OpenAI organization ID (optional)"`
}

// OpenAIClientFactory implements AIClientFactory for OpenAI
type OpenAIClientFactory struct{}

// GetName returns the name of the OpenAI provider
func (f *OpenAIClientFactory) GetName() string {
	return "OpenAI"
}

// GetDescription returns the description of the OpenAI provider
func (f *OpenAIClientFactory) GetDescription() string {
	return "OpenAI API client for GPT models"
}

// GetConfigSchema implements AIClientFactoryV2.
func (f *OpenAIClientFactory) GetConfigSchema() (*jsonschema.Schema, map[string]any, error) {
	schema := jsonschema.Reflect(&OpenAIConfig{})
	uiSchema := map[string]any{
		"ui:width": 800,
		"ui:field": "LayoutGridField",
		"ui:layoutGrid": map[string]any{
			"ui:row": map[string]any{
				"gutter":    []int{12, 0},
				"className": "row",
				"children": []map[string]map[string]any{{
					"ui:col": {
						"xs":       16,
						"children": []string{"api_key"},
					},
				}, {
					"ui:col": {
						"xs":       8,
						"children": []string{"model_id"},
					},
				}, {
					"ui:col": {
						"xs":       12,
						"children": []string{"base_url"},
					},
				}, {
					"ui:col": {
						"xs":       12,
						"children": []string{"organization_id"},
					},
				}},
			},
		},
	}
	return schema, uiSchema, nil
}

var _ AIClientFactoryV2 = (*OpenAIClientFactory)(nil)

// GetConfigFields returns the configuration fields for OpenAI
func (f *OpenAIClientFactory) GetConfigFields() []util.ConfigField {
	return []util.ConfigField{
		{
			Name:        "api_key",
			DisplayName: "API Key",
			Description: "OpenAI API key (encrypted)",
			Type:        util.FieldTypePassword,
			Required:    true,
		},
		{
			Name:        "model_id",
			DisplayName: "Model ID",
			Description: "OpenAI model ID (e.g., gpt-4, gpt-3.5-turbo)",
			Type:        util.FieldTypeString,
			Required:    true,
			Placeholder: "gpt-4, gpt-3.5-turbo, etc.",
		},
		{
			Name:        "base_url",
			DisplayName: "Base URL",
			Description: "Custom API endpoint URL (optional)",
			Type:        util.FieldTypeString,
			Required:    false,
			Placeholder: "https://api.openai.com/v1",
		},
		{
			Name:        "organization_id",
			DisplayName: "Organization ID",
			Description: "OpenAI organization ID (optional)",
			Type:        util.FieldTypeString,
			Required:    false,
		},
	}
}

// CreateClient creates an OpenAI client from configuration
func (f *OpenAIClientFactory) CreateClient(ctx context.Context, organizationID string, config map[string]interface{}) (aimodel.Provider, error) {
	return newOpenAIClientFromConfig(config)
}

func init() {
	// Register the OpenAI client factory
	RegisterFactoryV2(model.AIModelProviderOpenAI, &OpenAIClientFactory{})
}
