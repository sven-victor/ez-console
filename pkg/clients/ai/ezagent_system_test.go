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
	"testing"

	"github.com/sven-victor/ez-agent/message"
)

func TestCollectSystemInsertsBreakpointAfterStablePrompt(t *testing.T) {
	sys := collectSystem(&ChatCompletionOptions{
		ModelSystemPrompt:      "stable rules",
		EphemeralSystemPrompts: []string{" page ", "", "skill"},
	})
	if sys.Text != "stable rules" {
		t.Fatalf("text=%q", sys.Text)
	}
	if len(sys.Parts) != 2 {
		t.Fatalf("parts=%d", len(sys.Parts))
	}
	if _, ok := sys.Parts[0].(message.CacheBreakpoint); !ok {
		t.Fatalf("part0=%T", sys.Parts[0])
	}
	text, ok := sys.Parts[1].(message.Text)
	if !ok || text.Text != "page\n\nskill" {
		t.Fatalf("ephemeral=%#v", sys.Parts[1])
	}
}

func TestCollectSystemBreakpointOnStablePromptOnly(t *testing.T) {
	sys := collectSystem(&ChatCompletionOptions{ModelSystemPrompt: "stable rules"})
	if sys.Text != "stable rules" {
		t.Fatalf("text=%q", sys.Text)
	}
	if len(sys.Parts) != 1 {
		t.Fatalf("parts=%d", len(sys.Parts))
	}
	if _, ok := sys.Parts[0].(message.CacheBreakpoint); !ok {
		t.Fatalf("part0=%T", sys.Parts[0])
	}
}

func TestCollectSystemOmitsBreakpointWithoutStablePrompt(t *testing.T) {
	sys := collectSystem(&ChatCompletionOptions{EphemeralSystemPrompts: []string{"page"}})
	if sys.Text != "page" || len(sys.Parts) != 0 {
		t.Fatalf("system=%+v", sys)
	}
}

func TestCollectSystemOmitsBreakpointWhenDisabled(t *testing.T) {
	sys := collectSystem(&ChatCompletionOptions{
		ModelSystemPrompt:           "stable rules",
		EphemeralSystemPrompts:      []string{"page"},
		AutoCacheBreakpointDisabled: true,
	})
	if sys.Text != "stable rules\n\npage" || len(sys.Parts) != 0 {
		t.Fatalf("system=%+v", sys)
	}
}
