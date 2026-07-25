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
	"github.com/sven-victor/ez-agent/model/gemini"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/safe"
)

// newGeminiClientFromConfig creates a new Gemini client from configuration map
func newGeminiClientFromConfig(config map[string]interface{}) (*gemini.Provider, error) {
	var opts []gemini.Option

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
	opts = append(opts, gemini.WithModel(modelID))
	opts = append(opts, gemini.WithAPIKey(decKey))

	if baseURL, ok := config["base_url"].(string); ok && baseURL != "" {
		opts = append(opts, gemini.WithBaseURL(baseURL))
	}

	return gemini.New(opts...), nil
}

// GeminiConfig is the config shape for the Gemini provider (for JSON Schema reflection).
type GeminiConfig struct {
	APIKey  string `json:"api_key" jsonschema:"title=API Key,description=Google Gemini API key (encrypted),format=password"`
	ModelID string `json:"model_id" jsonschema:"title=Model ID,description=Gemini model ID (e.g.\\, gemini-2.0-flash)"`
	BaseURL string `json:"base_url,omitempty" jsonschema:"title=Base URL,description=Custom API endpoint URL (optional)"`
}

// GeminiClientFactory implements AIClientFactory for Gemini
type GeminiClientFactory struct{}

// GetName returns the name of the Gemini provider
func (f *GeminiClientFactory) GetName() string {
	return "Gemini"
}

// GetDescription returns the description of the Gemini provider
func (f *GeminiClientFactory) GetDescription() string {
	return "Google Gemini API client"
}

// GetConfigSchema implements AIClientFactoryV2.
func (f *GeminiClientFactory) GetConfigSchema() (*jsonschema.Schema, map[string]any, error) {
	schema := jsonschema.Reflect(&GeminiConfig{})
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

// var _ AIClientFactoryV2 = (*GeminiClientFactory)(nil)

// GetConfigFields returns the configuration fields for Gemini
func (f *GeminiClientFactory) GetConfigFields() []util.ConfigField {
	return []util.ConfigField{
		{
			Name:        "api_key",
			DisplayName: "API Key",
			Description: "Google Gemini API key (encrypted)",
			Type:        util.FieldTypePassword,
			Required:    true,
		},
		{
			Name:        "model_id",
			DisplayName: "Model ID",
			Description: "Gemini model ID (e.g., gemini-2.0-flash)",
			Type:        util.FieldTypeString,
			Required:    true,
			Placeholder: "gemini-2.0-flash",
		},
		{
			Name:        "base_url",
			DisplayName: "Base URL",
			Description: "Custom API endpoint URL (optional)",
			Type:        util.FieldTypeString,
			Required:    false,
			Placeholder: "https://generativelanguage.googleapis.com",
		},
	}
}

// CreateClient creates a Gemini client from configuration
func (f *GeminiClientFactory) CreateClient(ctx context.Context, organizationID string, config map[string]interface{}) (aimodel.Provider, error) {
	return newGeminiClientFromConfig(config)
}

func init() {
	RegisterFactoryV2(model.AIModelProviderGemini, &GeminiClientFactory{})
}
