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

package toolset

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	openai "github.com/sashabaranov/go-openai"
	openaijsonschema "github.com/sashabaranov/go-openai/jsonschema"
	"github.com/sven-victor/ez-console/pkg/preset"
	"github.com/sven-victor/ez-console/pkg/util"
)

type UtilsToolSet struct{}

// Call implements ToolSet.
func (t *UtilsToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	switch name {
	case "now":
		var params struct {
			Format string `json:"format"`
		}
		if err := json.Unmarshal([]byte(parameters), &params); err != nil {
			return "", fmt.Errorf("failed to unmarshal parameters: %w", err)
		}
		if params.Format == "" {
			params.Format = time.RFC3339
		}
		return time.Now().Format(params.Format), nil
	case "sleep":
		var params struct {
			Seconds int `json:"seconds"`
		}
		if err := json.Unmarshal([]byte(parameters), &params); err != nil {
			return "", fmt.Errorf("failed to unmarshal parameters: %w", err)
		}
		if params.Seconds > 60 {
			return "", fmt.Errorf("seconds must be less than 60")
		}
		time.Sleep(time.Duration(params.Seconds) * time.Second)
		return "", nil
	case "random_string":
		var params struct {
			StringLength int `json:"string_length"`
		}
		if err := json.Unmarshal([]byte(parameters), &params); err != nil {
			return "", fmt.Errorf("failed to unmarshal parameters: %w", err)
		}
		return util.GenerateRandomString(params.StringLength), nil
	}
	return "", fmt.Errorf("tool %s not found", name)
}

// ListTools implements ToolSet.
func (t *UtilsToolSet) ListTools(ctx context.Context) ([]openai.Tool, error) {
	return []openai.Tool{{
		Type: openai.ToolTypeFunction,
		Function: &openai.FunctionDefinition{
			Name:        "now",
			Description: "Get the current time",
			Parameters: openaijsonschema.Definition{
				Type: openaijsonschema.Object,
				Properties: map[string]openaijsonschema.Definition{
					"format": {
						Type:        openaijsonschema.String,
						Description: "The format of the time, e.g. 2006-01-02 15:04:05",
					},
				},
			},
		},
	}, {
		Type: openai.ToolTypeFunction,
		Function: &openai.FunctionDefinition{
			Name:        "sleep",
			Description: "Sleep for a given number of seconds",
			Parameters: openaijsonschema.Definition{
				Type: openaijsonschema.Object,
				Properties: map[string]openaijsonschema.Definition{
					"seconds": {
						Type:        openaijsonschema.Integer,
						Description: "The number of seconds to sleep, e.g. 10, max 60",
					},
				},
				Required: []string{"seconds"},
			},
		},
	}, {
		Type: openai.ToolTypeFunction,
		Function: &openai.FunctionDefinition{
			Name: "random_string",
			Parameters: openaijsonschema.Definition{
				Type: openaijsonschema.Object,
				Properties: map[string]openaijsonschema.Definition{
					"string_length": {
						Type:        openaijsonschema.Integer,
						Description: "The number of random string characters",
					},
				},
				Required: []string{"string_length"},
			},
		},
	}}, nil
}

// Test implements ToolSet.
func (t *UtilsToolSet) Test(ctx context.Context) error {
	return nil
}

// Validate implements ToolSet.
func (t *UtilsToolSet) Validate() error {
	return nil
}
func (t *UtilsToolSet) GetName() string {
	return "utils"
}

func (t *UtilsToolSet) GetDescription() string {
	return "Utils toolset"
}

func newUtilsToolSet() ToolSet {
	return &UtilsToolSet{}
}

type UtilsToolSetFactory struct{}

// GetDescription implements ToolSetFactory.
func (f *UtilsToolSetFactory) GetDescription() string {
	return (&UtilsToolSet{}).GetDescription()
}

// GetName implements ToolSetFactory.
func (f *UtilsToolSetFactory) GetName() string {
	return (&UtilsToolSet{}).GetName()
}

func (f *UtilsToolSetFactory) GetConfigFields() []util.ConfigField {
	return []util.ConfigField{}
}

func (f *UtilsToolSetFactory) CreateToolSet(configJSON string) (ToolSet, error) {
	return newUtilsToolSet(), nil
}

const (
	ToolSetTypeUtils ToolSetType = "utils"
)

func init() {
	// Register the MCP toolset factory
	RegisterToolSet(ToolSetTypeUtils, &UtilsToolSetFactory{})
	preset.RegisterPresetTools(preset.PresetToolSetSpec{
		PresetKey:     "utils",
		Type:          string(ToolSetTypeUtils),
		Name:          "Utils (built-in)",
		Description:   "Built-in utility tools (time, sleep, random string).",
		DefaultConfig: nil,
	})
}
