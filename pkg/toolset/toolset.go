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
	"fmt"
	"slices"
	"strings"
	"sync"

	"github.com/go-kit/log/level"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/errors"
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
		panic(fmt.Errorf("tool set %s already registered", toolSetType))
	}
	toolSetFactory.GetName()
	toolSetFactory.GetDescription()
	registeredToolSets[toolSetType] = toolSetFactory
	return nil
}

func GetToolSetFactory(toolSetType ToolSetType) (ToolSetFactory, bool) {
	if toolSetFactory, ok := registeredToolSets[toolSetType]; ok {
		return toolSetFactory, true
	}
	return nil, false
}

type ToolSets map[string]ToolSet

func (t ToolSets) keys() []string {
	keys := make([]string, 0, len(t))
	for idx := range t {
		keys = append(keys, idx)
	}
	slices.Sort(keys)
	return keys
}
func (t ToolSets) GetTools(ctx context.Context) ([]openai.Tool, error) {
	var errors errors.Errors
	var tools []openai.Tool
	for _, key := range t.keys() {
		toolSet := t[key]
		tool, err := toolSet.ListTools(ctx)
		if err != nil {
			errors.Append(err)
			continue
		}
		for _, tool := range tool {
			functionName := fmt.Sprintf("%s_%s", key, tool.Function.Name)
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
	for _, key := range t.keys() {
		if strings.HasPrefix(name, fmt.Sprintf("%s_", key)) {
			toolSet := t[key]
			name = strings.TrimPrefix(name, fmt.Sprintf("%s_", key))
			level.Debug(logger).Log("msg", "Calling tool", "tool", key, "name", name, "parameters", parameters)
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

func NewStaticToolSetsFactory(toolSets ToolSets) func(ctx context.Context) (ToolSets, error) {
	return func(ctx context.Context) (ToolSets, error) {
		return toolSets, nil
	}
}

func NewCachedToolSetsFactory(factory func(ctx context.Context) (ToolSets, error)) func(ctx context.Context) (ToolSets, error) {
	once := sync.Once{}
	var cachedToolSets ToolSets
	var err error
	return func(ctx context.Context) (ToolSets, error) {
		once.Do(func() {
			cachedToolSets, err = factory(ctx)
		})
		return cachedToolSets, err
	}
}
