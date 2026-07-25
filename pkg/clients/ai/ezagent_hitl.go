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

	"github.com/sven-victor/ez-agent/loop"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-agent/run"
	"github.com/sven-victor/ez-agent/tool"
)

// newUIToolInterrupter implements HITL aligned with classic behavior:
// - no ui_* tools → do not interrupt (loop runs server tools)
// - only ui_* tools → interrupt
// - mixed batch → execute non-ui_* tools first, append results, then interrupt for ui_*
func newUIToolInterrupter(reg tool.Registry, sessionID string, store interface {
	Append(ctx context.Context, id string, msgs ...message.Message) error
}) loop.Interrupter {
	return loop.FuncInterrupter(func(ctx context.Context, st *run.State, calls []tool.Call) (bool, error) {
		var serverCalls, uiCalls []tool.Call
		for _, c := range calls {
			if strings.HasPrefix(c.Name, ClientToolPrefix) {
				uiCalls = append(uiCalls, c)
			} else {
				serverCalls = append(serverCalls, c)
			}
		}
		if len(uiCalls) == 0 {
			return false, nil
		}
		if len(serverCalls) > 0 {
			results, err := executeServerTools(ctx, reg, serverCalls)
			if err != nil {
				return false, err
			}
			msg := message.NewToolResultMessage(toolResultsToParts(results)...)
			message.EnsureID(&msg)
			st.AppendMessage(msg)
			if store != nil && sessionID != "" {
				if err := store.Append(ctx, sessionID, msg); err != nil {
					return false, err
				}
			}
		}
		return true, nil
	})
}

func toolResultsToParts(results []tool.Result) []message.ToolResult {
	out := make([]message.ToolResult, len(results))
	for i, r := range results {
		out[i] = message.ToolResult{
			ToolUseID: r.ToolUseID,
			OK:        r.OK,
			Parts:     r.Content,
		}
		if len(out[i].Parts) == 0 && r.Err != nil {
			out[i].Parts = []message.Part{message.Text{Text: r.Err.Error()}}
		}
	}
	return out
}

// filterUIPending extracts ui_* pending calls for SSE client_tool_pending events.
func filterUIPending(pending *run.PendingTools) []ClientToolPendingCall {
	if pending == nil {
		return nil
	}
	var out []ClientToolPendingCall
	for _, c := range pending.Calls {
		if !strings.HasPrefix(c.Name, ClientToolPrefix) {
			continue
		}
		out = append(out, ClientToolPendingCall{
			ID:        c.ID,
			Name:      c.Name,
			Arguments: string(c.Input),
		})
	}
	return out
}
