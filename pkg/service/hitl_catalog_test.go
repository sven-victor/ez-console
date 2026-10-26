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

package service

import (
	"context"
	"testing"

	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

func TestBuildHITLCatalogReachesMCPThroughChatWrappers(t *testing.T) {
	mcp := ai.NewMCPToolSet("mcp", "d", "http://example", "http", "", "", "", map[string]interface{}{
		"approval_tools": []interface{}{"delete_user"},
	})
	disabled := newToolSetDisabledToolsFilter(mcp, map[string]struct{}{"other": {}})
	filtered := newFilteredToolSet(disabled, map[string]struct{}{"delete_user": {}})
	wrapped := toolset.NewBindingAwareToolSet(filtered, "res", "mcp")
	cat, err := ai.BuildHITLCatalog(context.Background(), toolset.ToolSets{"mcp3": wrapped})
	if err != nil {
		t.Fatal(err)
	}
	if cat["mcp3_delete_user"].Mode != ai.HITLCardApproval {
		t.Fatalf("%#v", cat)
	}
	if cat[ai.UIChooseToolName].Mode != ai.HITLCardChoice {
		t.Fatal("ui_choose missing")
	}
}
