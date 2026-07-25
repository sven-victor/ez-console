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
	"encoding/json"
	"fmt"
	"strings"
	"sync"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-agent/tool"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

// toolSetsRegistry adapts console ToolSetsProvider (+ optional client tools) to ez-agent tool.Registry.
// Specs/Lookup are live so progressive skill binding / refresh-each-iteration stays visible.
type toolSetsRegistry struct {
	mu          sync.Mutex
	getCtx      func() context.Context
	provider    toolset.ToolSetsProvider
	clientTools []openai.Tool
}

func newToolSetsRegistry(getCtx func() context.Context, provider toolset.ToolSetsProvider, clientTools []openai.Tool) *toolSetsRegistry {
	return &toolSetsRegistry{
		getCtx:      getCtx,
		provider:    provider,
		clientTools: append([]openai.Tool(nil), clientTools...),
	}
}

func (r *toolSetsRegistry) load() (toolset.ToolSets, error) {
	ctx := context.Background()
	if r.getCtx != nil {
		if c := r.getCtx(); c != nil {
			ctx = c
		}
	}
	var ts toolset.ToolSets
	if r.provider != nil {
		loaded, err := r.provider(ctx)
		if err != nil {
			return nil, err
		}
		ts = loaded
	}
	if ts == nil {
		ts = make(toolset.ToolSets)
	}
	if len(r.clientTools) > 0 {
		ts[clientToolSetKey] = NewClientToolsProxy(r.clientTools)
	}
	return ts, nil
}

func (r *toolSetsRegistry) Specs() []tool.Spec {
	r.mu.Lock()
	defer r.mu.Unlock()
	ts, err := r.load()
	if err != nil || ts == nil {
		return nil
	}
	ctx := context.Background()
	if r.getCtx != nil {
		if c := r.getCtx(); c != nil {
			ctx = c
		}
	}
	openaiTools, err := ts.GetTools(ctx)
	if err != nil {
		return nil
	}
	specs := make([]tool.Spec, 0, len(openaiTools))
	for _, t := range openaiTools {
		if t.Function == nil {
			continue
		}
		schema, _ := json.Marshal(t.Function.Parameters)
		if len(schema) == 0 || string(schema) == "null" {
			schema = []byte(`{"type":"object","properties":{}}`)
		}
		specs = append(specs, tool.Spec{
			Name:        t.Function.Name,
			Description: t.Function.Description,
			InputSchema: schema,
		})
	}
	return specs
}

func (r *toolSetsRegistry) Lookup(name string) (tool.Handler, bool) {
	r.mu.Lock()
	defer r.mu.Unlock()
	ts, err := r.load()
	if err != nil || ts == nil {
		return nil, false
	}
	ctx := context.Background()
	if r.getCtx != nil {
		if c := r.getCtx(); c != nil {
			ctx = c
		}
	}
	openaiTools, err := ts.GetTools(ctx)
	if err != nil {
		return nil, false
	}
	found := false
	for _, t := range openaiTools {
		if t.Function != nil && t.Function.Name == name {
			found = true
			break
		}
	}
	if !found {
		return nil, false
	}
	if strings.HasPrefix(name, ClientToolPrefix) {
		return func(ctx context.Context, call tool.Call) (tool.Result, error) {
			return tool.Result{
				ToolUseID: call.ID,
				OK:        false,
				Content:   []message.Part{message.Text{Text: ErrClientToolHandoff.Error()}},
				Err:       ErrClientToolHandoff,
			}, ErrClientToolHandoff
		}, true
	}
	return func(ctx context.Context, call tool.Call) (tool.Result, error) {
		result, err := ts.CallTool(ctx, call.Name, string(call.Input))
		if err != nil {
			return tool.Result{
				ToolUseID: call.ID,
				OK:        false,
				Content:   []message.Part{message.Text{Text: err.Error()}},
				Err:       err,
			}, nil
		}
		return tool.Result{
			ToolUseID: call.ID,
			OK:        true,
			Content:   []message.Part{message.Text{Text: result}},
		}, nil
	}, true
}

var _ tool.Registry = (*toolSetsRegistry)(nil)

// executeServerTools runs non-client tools via the registry (used by HITL split-batch).
func executeServerTools(ctx context.Context, reg tool.Registry, calls []tool.Call) ([]tool.Result, error) {
	results := make([]tool.Result, len(calls))
	for i, call := range calls {
		h, ok := reg.Lookup(call.Name)
		if !ok {
			results[i] = tool.Result{
				ToolUseID: call.ID,
				OK:        false,
				Content:   []message.Part{message.Text{Text: fmt.Sprintf("unknown tool %q", call.Name)}},
			}
			continue
		}
		res, err := h(ctx, call)
		if err != nil && res.ToolUseID == "" {
			results[i] = tool.Result{
				ToolUseID: call.ID,
				OK:        false,
				Content:   []message.Part{message.Text{Text: err.Error()}},
				Err:       err,
			}
			continue
		}
		if res.ToolUseID == "" {
			res.ToolUseID = call.ID
		}
		results[i] = res
	}
	return results, nil
}
