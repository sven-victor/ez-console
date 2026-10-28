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
	"text/template"

	"github.com/sven-victor/ez-console/pkg/toolset"
)

type displayTitleSpec struct {
	template    string
	description string
}

// DisplayTitleCatalog maps an exposed tool name (toolset key + logical name) to its display title.
type DisplayTitleCatalog map[string]displayTitleSpec

// BuildDisplayTitleCatalog collects display titles from the toolsets exposed to a chat.
// ListTools failures omit that toolset's descriptions; templates still apply when the toolset provides them.
func BuildDisplayTitleCatalog(ctx context.Context, toolSets toolset.ToolSets) DisplayTitleCatalog {
	cat := DisplayTitleCatalog{}
	for key, set := range toolSets {
		if set == nil {
			continue
		}
		descriptions := toolDescriptionsByName(ctx, set)
		templates := toolset.DisplayTitlesFrom(set)
		names := make(map[string]struct{}, len(descriptions)+len(templates))
		for name := range descriptions {
			names[name] = struct{}{}
		}
		for name := range templates {
			names[name] = struct{}{}
		}
		prefix := key + "_"
		for name := range names {
			if name == "" {
				continue
			}
			cat[prefix+name] = displayTitleSpec{
				template:    templates[name],
				description: descriptions[name],
			}
		}
	}
	return cat
}

// Has reports whether name is a known exposed tool.
func (c DisplayTitleCatalog) Has(name string) bool {
	if c == nil {
		return false
	}
	_, ok := c[name]
	return ok
}

// Render returns the display title for an exposed tool call.
// A missing tool, a failed template, or an empty description yields an empty string.
func (c DisplayTitleCatalog) Render(name, arguments string) string {
	if c == nil {
		return ""
	}
	spec, ok := c[name]
	if !ok {
		return ""
	}
	return renderDisplayTitle(spec.template, spec.description, arguments)
}

func renderDisplayTitle(tmplText, description, arguments string) string {
	rendered, err := executeDisplayTitle(tmplText, arguments)
	if err != nil || strings.TrimSpace(rendered) == "" {
		return strings.TrimSpace(description)
	}
	return strings.TrimSpace(rendered)
}

func executeDisplayTitle(tmplText, arguments string) (string, error) {
	tmplText = strings.TrimSpace(tmplText)
	if tmplText == "" {
		return "", fmt.Errorf("empty template")
	}
	var data any
	if strings.TrimSpace(arguments) != "" {
		if err := json.Unmarshal([]byte(arguments), &data); err != nil {
			return "", err
		}
	}
	if data != nil {
		if _, ok := data.(map[string]any); !ok {
			return "", fmt.Errorf("arguments are not an object")
		}
	}
	// missingkey=error so a missing argument falls back to the description
	// instead of printing "<no value>". No functions are registered.
	parsed, err := template.New("title").Option("missingkey=error").Parse(tmplText)
	if err != nil {
		return "", err
	}
	var b strings.Builder
	if err := parsed.Execute(&b, data); err != nil {
		return "", err
	}
	return b.String(), nil
}
