package toolset

import (
	"context"
	"fmt"
	"strings"

	"github.com/sashabaranov/go-openai"
)

type ToolSetConfigFieldOptions struct {
	Label string `json:"label"`
	Value string `json:"value"`
}
type ToolSetFieldType string

const (
	FieldTypeString   ToolSetFieldType = "string"
	FieldTypePassword ToolSetFieldType = "password"
	FieldTypeNumber   ToolSetFieldType = "number"
	FieldTypeBoolean  ToolSetFieldType = "boolean"
	FieldTypeArray    ToolSetFieldType = "array"
	FieldTypeObject   ToolSetFieldType = "object"
)

type ToolSetConfigField struct {
	Name        string                      `json:"name"`
	DisplayName string                      `json:"display_name"`
	Description string                      `json:"description"`
	Type        ToolSetFieldType            `json:"type"`
	Required    bool                        `json:"required"`
	Default     string                      `json:"default"`
	Options     []ToolSetConfigFieldOptions `json:"options"`
	Placeholder string                      `json:"placeholder"`
}

type ToolSetType string

type ToolSet interface {
	GetName() string
	GetDescription() string
	Validate() error
	Test(ctx context.Context) error
	Call(ctx context.Context, name string, parameters string) (string, error)
	ListTools(ctx context.Context) ([]openai.Tool, error)
}

type ToolSetFactory interface {
	GetConfigFields() []ToolSetConfigField
	CreateToolSet(configJSON string) (ToolSet, error)
	GetName() string
	GetDescription() string
}

var registeredToolSets = make(map[ToolSetType]ToolSetFactory)

func RegisterToolSet(toolSetType ToolSetType, toolSetFactory ToolSetFactory) error {
	if _, ok := registeredToolSets[toolSetType]; ok {
		return fmt.Errorf("tool set %s already registered", toolSetType)
	}
	registeredToolSets[toolSetType] = toolSetFactory
	return nil
}

func GetToolSetFactory(toolSetType ToolSetType) (ToolSetFactory, bool) {
	if toolSetFactory, ok := registeredToolSets[toolSetType]; ok {
		return toolSetFactory, true
	}
	return nil, false
}

type ToolSets []ToolSet

func (t ToolSets) GetTools(ctx context.Context) ([]openai.Tool, error) {
	var tools []openai.Tool
	for idx, toolSet := range t {
		tool, err := toolSet.ListTools(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to get tools: %w", err)
		}
		for _, tool := range tool {
			functionName := fmt.Sprintf("toolset%d_%s", idx, tool.Function.Name)
			tools = append(tools, openai.Tool{
				Type: openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{
					Name:        functionName,
					Description: tool.Function.Description,
					Parameters:  tool.Function.Parameters,
				},
			})
		}
	}
	return tools, nil
}

func (t ToolSets) CallTool(ctx context.Context, name string, parameters string) (string, error) {
	for idx, toolSet := range t {
		if strings.HasPrefix(name, fmt.Sprintf("toolset%d_", idx)) {
			name = strings.TrimPrefix(name, fmt.Sprintf("toolset%d_", idx))
			return toolSet.Call(ctx, name, parameters)
		}
	}
	return "", fmt.Errorf("tool %s not found", name)
}

func GetRegisteredToolSets() map[ToolSetType]ToolSetFactory {
	toolSets := make(map[ToolSetType]ToolSetFactory)
	for toolSetType, toolSetFactory := range registeredToolSets {
		toolSets[toolSetType] = toolSetFactory
	}
	return toolSets
}
