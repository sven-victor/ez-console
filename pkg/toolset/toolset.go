package toolset

import (
	"context"
	"fmt"
	"strings"

	"github.com/go-kit/log/level"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
)

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
	GetConfigFields() []util.ConfigField
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
	logger := log.GetContextLogger(ctx)
	for idx, toolSet := range t {
		if strings.HasPrefix(name, fmt.Sprintf("toolset%d_", idx)) {
			name = strings.TrimPrefix(name, fmt.Sprintf("toolset%d_", idx))
			level.Debug(logger).Log("msg", "Calling tool", "tool", name, "parameters", parameters)
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
