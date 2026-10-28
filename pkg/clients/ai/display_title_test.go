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
	"testing"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

func TestDisplayTitleRender(t *testing.T) {
	sets := toolset.ToolSets{
		"utils3": toolset.NewBindingAwareToolSet(&toolset.UtilsToolSet{}, "res", "utils"),
		"mcp1": approvalListToolset{
			tools: []openai.Tool{{Type: openai.ToolTypeFunction, Function: &openai.FunctionDefinition{
				Name:        "delete_user",
				Description: "Delete a user by id",
			}}},
		},
	}
	cat := BuildDisplayTitleCatalog(context.Background(), sets)

	if got := cat.Render("utils3_sleep", `{"seconds":10}`); got != "Sleep 10 seconds" {
		t.Fatalf("sleep title: %q", got)
	}
	if got := cat.Render("utils3_now", `{}`); got != "Current time" {
		t.Fatalf("now title: %q", got)
	}
	if got := cat.Render("utils3_sleep", `{}`); got != "Sleep for a given number of seconds" {
		t.Fatalf("missing field: %q", got)
	}
	if got := cat.Render("utils3_sleep", `"nope"`); got != "Sleep for a given number of seconds" {
		t.Fatalf("non-object: %q", got)
	}
	if got := cat.Render("mcp1_delete_user", `{"id":"1"}`); got != "Delete a user by id" {
		t.Fatalf("description only: %q", got)
	}
	if got := cat.Render("utils3_removed", `{}`); got != "" {
		t.Fatalf("unknown tool: %q", got)
	}
}

func TestDisplayTitleBrokenTemplateUsesDescription(t *testing.T) {
	sets := toolset.ToolSets{
		"demo": &titleToolSet{
			titles: map[string]string{"echo": "{{"},
			tools: []openai.Tool{{Type: openai.ToolTypeFunction, Function: &openai.FunctionDefinition{
				Name:        "echo",
				Description: "Echo the input",
			}}},
		},
		"blank": &titleToolSet{
			titles: map[string]string{"echo": "{{"},
			tools: []openai.Tool{{Type: openai.ToolTypeFunction, Function: &openai.FunctionDefinition{
				Name: "echo",
			}}},
		},
	}
	cat := BuildDisplayTitleCatalog(context.Background(), sets)
	if got := cat.Render("demo_echo", `{}`); got != "Echo the input" {
		t.Fatalf("broken template: %q", got)
	}
	if got := cat.Render("blank_echo", `{}`); got != "" {
		t.Fatalf("empty description: %q", got)
	}
}

func TestAllowedToolNamesForwardsDisplayTitles(t *testing.T) {
	inner := toolset.NewBindingAwareToolSet(&toolset.UtilsToolSet{}, "res", "utils")
	filtered := toolset.NewAllowedToolNamesToolSet(inner, map[string]struct{}{"sleep": {}})
	titles := toolset.DisplayTitlesFrom(filtered)
	if _, ok := titles["sleep"]; !ok {
		t.Fatalf("sleep missing: %#v", titles)
	}
	if _, ok := titles["now"]; ok {
		t.Fatalf("now should be filtered: %#v", titles)
	}
}

type titleToolSet struct {
	titles map[string]string
	tools  []openai.Tool
}

func (t *titleToolSet) DisplayTitles() map[string]string { return t.titles }
func (t *titleToolSet) GetName() string                  { return "title" }
func (t *titleToolSet) GetDescription() string           { return "" }
func (t *titleToolSet) Validate() error                  { return nil }
func (t *titleToolSet) Test(context.Context) error       { return nil }
func (t *titleToolSet) Call(context.Context, string, string) (string, error) {
	return "", nil
}
func (t *titleToolSet) ListTools(context.Context) ([]openai.Tool, error) { return t.tools, nil }
