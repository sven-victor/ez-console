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
	"github.com/sven-victor/ez-agent/model/anthropic"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/safe"
)

// newAnthropicClientFromConfig creates a new Anthropic client from configuration map
func newAnthropicClientFromConfig(config map[string]interface{}) (*anthropic.Provider, error) {
	var opts []anthropic.Option

	apiKeyVal, ok := config["api_key"].(string)
	if !ok || apiKeyVal == "" {
		return nil, fmt.Errorf("api_key is required")
	}
	apiKey := safe.NewEncryptedString(apiKeyVal, os.Getenv(safe.SecretEnvName))
	decKey, err := apiKey.UnsafeString()
	if err != nil {
		return nil, fmt.Errorf("failed to get API key: %w", err)
	}

	modelID, ok := config["model_id"].(string)
	if !ok || modelID == "" {
		return nil, fmt.Errorf("model_id is required")
	}
	opts = append(opts, anthropic.WithModel(modelID))
	opts = append(opts, anthropic.WithAPIKey(decKey))

	if baseURL, ok := config["base_url"].(string); ok && baseURL != "" {
		opts = append(opts, anthropic.WithBaseURL(baseURL))
	}

	return anthropic.New(opts...), nil
}

// AnthropicConfig is the config shape for the Anthropic provider (for JSON Schema reflection).
type AnthropicConfig struct {
	APIKey  string `json:"api_key" jsonschema:"title=API Key,description=Anthropic API key (encrypted),format=password"`
	ModelID string `json:"model_id" jsonschema:"title=Model ID,description=Anthropic model ID (e.g.\\, claude-sonnet-4-20250514)"`
	BaseURL string `json:"base_url,omitempty" jsonschema:"title=Base URL,description=Custom API endpoint URL (optional)"`
}

// AnthropicClientFactory implements AIClientFactory for Anthropic
type AnthropicClientFactory struct{}

// GetName returns the name of the Anthropic provider
func (f *AnthropicClientFactory) GetName() string {
	return "Anthropic"
}

// GetDescription returns the description of the Anthropic provider
func (f *AnthropicClientFactory) GetDescription() string {
	return "Anthropic API client for Claude models"
}

// GetConfigSchema implements AIClientFactoryV2.
func (f *AnthropicClientFactory) GetConfigSchema() (*jsonschema.Schema, map[string]any, error) {
	schema := jsonschema.Reflect(&AnthropicConfig{})
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
						"xs":       24,
						"children": []string{"base_url"},
					},
				}},
			},
		},
	}
	return schema, uiSchema, nil
}

var _ AIClientFactoryV2 = (*AnthropicClientFactory)(nil)

// GetConfigFields returns the configuration fields for Anthropic
func (f *AnthropicClientFactory) GetConfigFields() []util.ConfigField {
	return []util.ConfigField{
		{
			Name:        "api_key",
			DisplayName: "API Key",
			Description: "Anthropic API key (encrypted)",
			Type:        util.FieldTypePassword,
			Required:    true,
		},
		{
			Name:        "model_id",
			DisplayName: "Model ID",
			Description: "Anthropic model ID (e.g., claude-sonnet-4-20250514)",
			Type:        util.FieldTypeString,
			Required:    true,
			Placeholder: "claude-sonnet-4-20250514",
		},
		{
			Name:        "base_url",
			DisplayName: "Base URL",
			Description: "Custom API endpoint URL (optional)",
			Type:        util.FieldTypeString,
			Required:    false,
			Placeholder: "https://api.anthropic.com",
		},
	}
}

// CreateClient creates an Anthropic client from configuration
func (f *AnthropicClientFactory) CreateClient(ctx context.Context, organizationID string, config map[string]interface{}) (aimodel.Provider, error) {
	return newAnthropicClientFromConfig(config)
}

func init() {
	RegisterFactoryV2(model.AIModelProviderAnthropic, &AnthropicClientFactory{})
}
