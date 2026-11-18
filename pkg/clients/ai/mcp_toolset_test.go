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
	"encoding/json"
	"testing"
)

func TestMCPArgsHeaders(t *testing.T) {
	t.Parallel()

	got := mcpArgsHeaders(map[string]interface{}{
		"headers": map[string]interface{}{
			"X-API-Key": "k",
			"X-Tenant":  "t1",
		},
	})
	if got["X-API-Key"] != "k" || got["X-Tenant"] != "t1" {
		t.Fatalf("headers=%v", got)
	}

	got = mcpArgsHeaders(map[string]interface{}{
		"header": map[string]string{"X-Custom": "v"},
	})
	if got["X-Custom"] != "v" {
		t.Fatalf("header alias=%v", got)
	}

	if mcpArgsHeaders(nil) != nil {
		t.Fatal("expected nil for empty args")
	}
	if mcpArgsHeaders(map[string]interface{}{"headers": "bad"}) != nil {
		t.Fatal("expected nil for invalid headers type")
	}
}

func TestMCPArgsProxy(t *testing.T) {
	t.Parallel()

	if got := mcpArgsProxy(map[string]interface{}{"proxy": "  socks5://127.0.0.1:1080  "}); got != "socks5://127.0.0.1:1080" {
		t.Fatalf("proxy=%q", got)
	}
	if got := mcpArgsProxy(map[string]interface{}{}); got != "" {
		t.Fatalf("empty proxy=%q", got)
	}
}

func TestMCPToolSetFactoryCreateToolSetArgs(t *testing.T) {
	t.Parallel()

	raw, err := json.Marshal(map[string]interface{}{
		"endpoint": "https://example.com/mcp",
		"protocol": "http",
		"token":    "secret",
		"args": map[string]interface{}{
			"headers": map[string]interface{}{"X-API-Key": "k"},
			"proxy":   "http://127.0.0.1:7890",
		},
	})
	if err != nil {
		t.Fatal(err)
	}

	inst, err := (&MCPToolSetFactory{}).CreateToolSet(string(raw))
	if err != nil {
		t.Fatal(err)
	}
	mcpTS, ok := inst.(*MCPToolSet)
	if !ok {
		t.Fatalf("type=%T", inst)
	}
	if mcpTS.endpoint != "https://example.com/mcp" || mcpTS.token != "secret" {
		t.Fatalf("basic fields: %+v", mcpTS)
	}
	if mcpArgsHeaders(mcpTS.config)["X-API-Key"] != "k" {
		t.Fatalf("args headers not loaded: %#v", mcpTS.config)
	}
	if mcpArgsProxy(mcpTS.config) != "http://127.0.0.1:7890" {
		t.Fatalf("args proxy not loaded: %#v", mcpTS.config)
	}
}

func TestMCPConfigSchemaApprovalToolsRemoteSelect(t *testing.T) {
	t.Parallel()

	schema, _, err := (&MCPToolSetFactory{}).GetConfigSchema()
	if err != nil {
		t.Fatal(err)
	}
	raw, err := json.Marshal(schema)
	if err != nil {
		t.Fatal(err)
	}
	var doc map[string]any
	if err := json.Unmarshal(raw, &doc); err != nil {
		t.Fatal(err)
	}
	defs, _ := doc["$defs"].(map[string]any)
	def, _ := defs["MCPToolSetConfig"].(map[string]any)
	props, _ := def["properties"].(map[string]any)
	field, _ := props["approval_tools"].(map[string]any)
	if field["type"] != "array" {
		t.Fatalf("approval_tools type=%v", field["type"])
	}
	if field["x-ui-widget"] != "remoteSelect" {
		t.Fatalf("widget=%v", field["x-ui-widget"])
	}
	source, _ := field["x-data-source"].(map[string]any)
	if source["type"] != "api" || source["method"] != "POST" || source["url"] != "/api/system/toolsets/tools/preview" {
		t.Fatalf("data source=%v", source)
	}
	if source["body_key"] != "config" || source["value_key"] != "name" || source["label_key"] != "name" {
		t.Fatalf("mapping=%v", source)
	}
	params, _ := source["params"].(map[string]any)
	if params["type"] != "mcp" {
		t.Fatalf("params=%v", params)
	}
	ready, _ := source["ready_on"].([]any)
	if len(ready) != 1 || ready[0] != "endpoint" {
		t.Fatalf("ready_on=%v", source["ready_on"])
	}
}
