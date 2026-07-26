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
	"fmt"
	"testing"

	"github.com/sven-victor/ez-agent/hook"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-agent/run"
)

func TestOnSummaryFiresOnlyOnSuccessfulAfterSummary(t *testing.T) {
	loader := NewSkillLoader(nil, []string{"skill-a"}, nil)
	opts := &ChatCompletionOptions{
		OnSummary: func(ctx context.Context, messages []ChatMessage) {
			loader.Clear()
		},
	}
	h, _ := buildAgentHooks(opts)

	st := &run.State{
		Messages: []message.Message{message.NewUserText("summary window")},
	}

	// Failed/skipped summarization (and condense/offload are not AfterSummary) must keep skills.
	if err := h.FireAfterSummary(context.Background(), &hook.AfterSummary{
		State: st,
		Err:   fmt.Errorf("skipped"),
	}); err != nil {
		t.Fatalf("FireAfterSummary skip: %v", err)
	}
	if len(loader.loadedSkillIDSet()) != 1 {
		t.Fatal("loaded skills must survive AfterSummary with Err set")
	}

	if err := h.FireAfterSummary(context.Background(), &hook.AfterSummary{
		State:   st,
		Summary: message.NewUserText("condensed"),
	}); err != nil {
		t.Fatalf("FireAfterSummary success: %v", err)
	}
	if len(loader.loadedSkillIDSet()) != 0 {
		t.Fatal("successful AfterSummary should clear activated skills via OnSummary")
	}
}
