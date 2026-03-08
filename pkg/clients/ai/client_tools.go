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
	"strings"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

const clientToolSetKey = "ui"

// clientToolsProxy is a toolset.ToolSet that exposes client-side tools
// to the model. When the model calls one of these tools, CallTool returns
// ErrClientToolHandoff so the stream can hand control to the browser.
type clientToolsProxy struct {
	tools []openai.Tool
}

var _ toolset.ToolSet = (*clientToolsProxy)(nil)

// NewClientToolsProxy creates a ToolSet proxy for client-side tools.
// The incoming tools should have names WITH the "ui_" prefix; the proxy
// strips the prefix because ToolSets.GetTools re-adds it via the map key.
func NewClientToolsProxy(clientTools []openai.Tool) toolset.ToolSet {
	stripped := make([]openai.Tool, len(clientTools))
	for i, t := range clientTools {
		name := t.Function.Name
		name = strings.TrimPrefix(name, ClientToolPrefix)
		stripped[i] = openai.Tool{
			Type: t.Type,
			Function: &openai.FunctionDefinition{
				Name:        name,
				Description: t.Function.Description,
				Parameters:  t.Function.Parameters,
			},
		}
	}
	return &clientToolsProxy{tools: stripped}
}

func (c *clientToolsProxy) GetName() string        { return "Client Tools" }
func (c *clientToolsProxy) GetDescription() string  { return "Client-side tools executed in the browser" }
func (c *clientToolsProxy) Validate() error         { return nil }
func (c *clientToolsProxy) Test(_ context.Context) error { return nil }

func (c *clientToolsProxy) ListTools(_ context.Context) ([]openai.Tool, error) {
	return c.tools, nil
}

func (c *clientToolsProxy) Call(_ context.Context, _ string, _ string) (string, error) {
	return "", ErrClientToolHandoff
}
