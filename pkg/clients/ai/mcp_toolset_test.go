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
