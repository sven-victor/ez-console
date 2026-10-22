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
	"errors"
	"testing"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-agent/event"
	"github.com/sven-victor/ez-agent/memory"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-agent/run"
	"github.com/sven-victor/ez-agent/tool"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

func TestToolHandlerPropagatesEndOfChat(t *testing.T) {
	reg := newToolSetsRegistry(func() context.Context { return context.Background() }, func(ctx context.Context) (toolset.ToolSets, error) {
		return toolset.ToolSets{
			"summary": toolset.NewAdHocToolSet(toolset.NewAdHocTool(openai.Tool{
				Type: openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{
					Name:       "save",
					Parameters: map[string]any{"type": "object"},
				},
			}, func(ctx context.Context, name, parameters string) (string, error) {
				return "Summary saved successfully.", tool.ErrEndOfChat
			})),
		}, nil
	}, nil)

	h, ok := reg.Lookup("summary_save")
	if !ok {
		t.Fatal("lookup summary_save")
	}
	res, err := h(context.Background(), tool.Call{ID: "c1", Name: "summary_save", Input: []byte(`{}`)})
	if !errors.Is(err, tool.ErrEndOfChat) {
		t.Fatalf("handler err=%v", err)
	}
	if !res.OK || !errors.Is(res.Err, tool.ErrEndOfChat) {
		t.Fatalf("result=%+v", res)
	}
	got := toolResultText(message.ToolResult{OK: res.OK, Parts: res.Content})
	if got != "Summary saved successfully." {
		t.Fatalf("content=%q", got)
	}
}

func TestToolHandlerKeepsOrdinaryErrors(t *testing.T) {
	reg := newToolSetsRegistry(func() context.Context { return context.Background() }, func(ctx context.Context) (toolset.ToolSets, error) {
		return toolset.ToolSets{
			"summary": toolset.NewAdHocToolSet(toolset.NewAdHocTool(openai.Tool{
				Type: openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{
					Name:       "save",
					Parameters: map[string]any{"type": "object"},
				},
			}, func(ctx context.Context, name, parameters string) (string, error) {
				return "", errors.New("boom")
			})),
		}, nil
	}, nil)

	h, ok := reg.Lookup("summary_save")
	if !ok {
		t.Fatal("lookup summary_save")
	}
	res, err := h(context.Background(), tool.Call{ID: "c1", Name: "summary_save", Input: []byte(`{}`)})
	if err != nil {
		t.Fatalf("ordinary tool errors stay on the result, got %v", err)
	}
	if res.OK || errors.Is(res.Err, tool.ErrEndOfChat) {
		t.Fatalf("result=%+v", res)
	}
}

func TestMixedBatchEndOfChatSkipsClientHandoff(t *testing.T) {
	reg := newToolSetsRegistry(func() context.Context { return context.Background() }, func(ctx context.Context) (toolset.ToolSets, error) {
		return toolset.ToolSets{
			"summary": toolset.NewAdHocToolSet(toolset.NewAdHocTool(openai.Tool{
				Type: openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{
					Name:       "save",
					Parameters: map[string]any{"type": "object"},
				},
			}, func(ctx context.Context, name, parameters string) (string, error) {
				return "saved", tool.ErrEndOfChat
			})),
		}, nil
	}, nil)

	assistant := message.Message{
		Role: message.RoleAssistant,
		Parts: []message.Part{
			message.Text{Text: "finished"},
			message.ToolUse{ID: "1", Name: "summary_save", Input: []byte(`{}`)},
			message.ToolUse{ID: "2", Name: "ui_confirm", Input: []byte(`{}`)},
		},
	}
	st := &run.State{}
	st.AppendMessage(assistant)

	store := memory.NewMemStore()
	if err := store.Append(context.Background(), "s1", assistant); err != nil {
		t.Fatal(err)
	}
	intr := newUIToolInterrupter(reg, "s1", store)
	interrupt, err := intr.BeforeTools(context.Background(), st, []tool.Call{
		{ID: "1", Name: "summary_save", Input: []byte(`{}`)},
		{ID: "2", Name: "ui_confirm", Input: []byte(`{}`)},
	})
	if interrupt {
		t.Fatal("client handoff should not run after end of chat")
	}
	if !errors.Is(err, tool.ErrEndOfChat) {
		t.Fatalf("err=%v", err)
	}
	if len(st.Messages) != 1 || message.TextContent(st.Messages[0]) != "finished" || len(message.ToolUses(st.Messages[0])) != 0 {
		t.Fatalf("messages=%#v", st.Messages)
	}
	sess, err := store.Load(context.Background(), "s1")
	if err != nil {
		t.Fatal(err)
	}
	if len(sess.Messages) != 1 || len(message.ToolUses(sess.Messages[0])) != 0 {
		t.Fatalf("session=%#v", sess.Messages)
	}
}

func TestStreamTreatsEndOfChatRunErrorAsClean(t *testing.T) {
	s := newTestChatStream(1)
	if err := s.handleEvent(event.RunError{Err: tool.ErrEndOfChat}); err != nil {
		t.Fatal(err)
	}
}
