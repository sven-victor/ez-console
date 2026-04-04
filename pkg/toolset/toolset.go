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
	"github.com/invopop/jsonschema"
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

// ToolSetFactoryV2 extends ToolSetFactory with optional GetConfigSchema.
// When implemented, GetToolSetTypeDefinitions uses it; otherwise ConfigFields are converted to JSON Schema.
type ToolSetFactoryV2 interface {
	ToolSetFactory
	GetConfigSchema() (schema *jsonschema.Schema, uiSchema map[string]any, err error)
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

func RegisterToolSetV2(toolSetType ToolSetType, toolSetFactory ToolSetFactoryV2) error {
	return RegisterToolSet(toolSetType, toolSetFactory)
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

type ToolSetsProvider func(ctx context.Context) (ToolSets, error)

func NewStaticToolSetsProvider(toolSets ToolSets) ToolSetsProvider {
	return func(ctx context.Context) (ToolSets, error) {
		return toolSets, nil
	}
}

func NewCachedToolSetsProvider(factory func(ctx context.Context) (ToolSets, error)) func(ctx context.Context) (ToolSets, error) {
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

// BindingAwareToolSet wraps a ToolSet with organization toolset identity for skill–AI-tool binding resolution.
type BindingAwareToolSet struct {
	Inner      ToolSet
	ResourceID string
	ImplType   string
}

// NewBindingAwareToolSet returns inner wrapped with resource_id and implementation type (e.g. "utils").
func NewBindingAwareToolSet(inner ToolSet, resourceID, implType string) ToolSet {
	if inner == nil {
		return nil
	}
	return &BindingAwareToolSet{Inner: inner, ResourceID: resourceID, ImplType: implType}
}

func (b *BindingAwareToolSet) GetName() string        { return b.Inner.GetName() }
func (b *BindingAwareToolSet) GetDescription() string { return b.Inner.GetDescription() }
func (b *BindingAwareToolSet) Validate() error        { return b.Inner.Validate() }
func (b *BindingAwareToolSet) Test(ctx context.Context) error {
	return b.Inner.Test(ctx)
}
func (b *BindingAwareToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	return b.Inner.Call(ctx, name, parameters)
}
func (b *BindingAwareToolSet) ListTools(ctx context.Context) ([]openai.Tool, error) {
	return b.Inner.ListTools(ctx)
}

type allowedToolNamesToolSet struct {
	inner   ToolSet
	allowed map[string]struct{}
}

// NewAllowedToolNamesToolSet returns a ToolSet that exposes only the given logical tool names from inner.
// If allowed contains "*", all tools from inner are visible (same convention as role AI tool permissions).
func NewAllowedToolNamesToolSet(inner ToolSet, allowed map[string]struct{}) ToolSet {
	if inner == nil {
		return nil
	}
	if len(allowed) == 0 {
		return inner
	}
	return &allowedToolNamesToolSet{inner: inner, allowed: allowed}
}

func (f *allowedToolNamesToolSet) GetName() string        { return f.inner.GetName() }
func (f *allowedToolNamesToolSet) GetDescription() string { return f.inner.GetDescription() }
func (f *allowedToolNamesToolSet) Validate() error        { return f.inner.Validate() }
func (f *allowedToolNamesToolSet) Test(ctx context.Context) error {
	return f.inner.Test(ctx)
}

func (f *allowedToolNamesToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	if _, all := f.allowed["*"]; !all {
		if _, ok := f.allowed[name]; !ok {
			return "", fmt.Errorf("tool %s is not allowed", name)
		}
	}
	return f.inner.Call(ctx, name, parameters)
}

func (f *allowedToolNamesToolSet) ListTools(ctx context.Context) ([]openai.Tool, error) {
	tools, err := f.inner.ListTools(ctx)
	if err != nil {
		return nil, err
	}
	if _, all := f.allowed["*"]; all {
		return tools, nil
	}
	filtered := make([]openai.Tool, 0, len(tools))
	for _, tool := range tools {
		if tool.Function == nil {
			continue
		}
		if _, ok := f.allowed[tool.Function.Name]; ok {
			filtered = append(filtered, tool)
		}
	}
	return filtered, nil
}

type AdHocTool struct {
	openai.Tool
	call func(ctx context.Context, name string, parameters string) (string, error)
}

func NewAdHocTool(tool openai.Tool, call func(ctx context.Context, name string, parameters string) (string, error)) AdHocTool {
	return AdHocTool{
		Tool: tool,
		call: call,
	}
}

type adHocToolSet struct {
	name        string
	description string
	tools       []AdHocTool
}

// Call implements ToolSet.
func (a *adHocToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	for _, tool := range a.tools {
		if tool.Tool.Function.Name == name {
			return tool.call(ctx, name, parameters)
		}
	}
	return "", fmt.Errorf("tool %s not found", name)
}

// GetDescription implements ToolSet.
func (a *adHocToolSet) GetDescription() string {
	return a.description
}

// GetName implements ToolSet.
func (a *adHocToolSet) GetName() string {
	return a.name
}

// ListTools implements ToolSet.
func (a *adHocToolSet) ListTools(ctx context.Context) ([]openai.Tool, error) {
	tools := make([]openai.Tool, len(a.tools))
	for i, tool := range a.tools {
		tools[i] = tool.Tool
	}
	return tools, nil
}

// Test implements ToolSet.
func (a *adHocToolSet) Test(ctx context.Context) error {
	return nil
}

// Validate implements ToolSet.
func (a *adHocToolSet) Validate() error {
	return nil
}

func (a *adHocToolSet) AddTool(tool AdHocTool) *adHocToolSet {
	a.tools = append(a.tools, tool)
	return a
}

func NewAdHocToolSet(tools ...AdHocTool) *adHocToolSet {
	return &adHocToolSet{
		name:        "ad_hoc",
		description: "Ad-hoc toolset",
		tools:       tools,
	}
}
