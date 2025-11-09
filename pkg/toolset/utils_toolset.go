package toolset

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	openai "github.com/sashabaranov/go-openai"
	"github.com/sashabaranov/go-openai/jsonschema"
)

type UtilsToolSet struct{}

// Call implements ToolSet.
func (t *UtilsToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	switch name {
	case "now":
		return "", fmt.Errorf("tool not implemented")
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
			Parameters: jsonschema.Definition{
				Type: jsonschema.Object,
				Properties: map[string]jsonschema.Definition{
					"format": {
						Type:        jsonschema.String,
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
			Parameters: jsonschema.Definition{
				Type: jsonschema.Object,
				Properties: map[string]jsonschema.Definition{
					"seconds": {
						Type:        jsonschema.Integer,
						Description: "The number of seconds to sleep, e.g. 10, max 60",
					},
				},
				Required: []string{"seconds"},
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

func (f *UtilsToolSetFactory) GetConfigFields() []ToolSetConfigField {
	return []ToolSetConfigField{}
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
}
