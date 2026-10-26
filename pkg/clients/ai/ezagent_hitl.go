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
	"errors"
	"strings"

	"github.com/sven-victor/ez-agent/loop"
	"github.com/sven-victor/ez-agent/memory"
	"github.com/sven-victor/ez-agent/message"
	"github.com/sven-victor/ez-agent/run"
	"github.com/sven-victor/ez-agent/tool"
)

// AutoRejectToolResultContent is the synthetic tool result written when a channel
// cannot prompt the user. The model sees a rejection and the gated tool is not called.
const AutoRejectToolResultContent = `{"error":"tool call was rejected: this channel cannot prompt the user for confirmation"}`

// hitlInterrupterConfig configures the agent-loop gate for approval, choice, and other ui_* tools.
type hitlInterrupterConfig struct {
	Registry  tool.Registry
	SessionID string
	Store     memory.SessionStore
	Mode      HITLMode
	Catalog   HITLCatalog
}

// autoRejectRegistry is the tool registry the agent loop uses in auto_reject mode.
// Gated tools return a reject result and do not call the inner handler.
// Free tools delegate to inner. The interrupter keeps the unwrapped registry so
// interactive mode can still execute free tools.
type autoRejectRegistry struct {
	inner   tool.Registry
	catalog HITLCatalog
}

func newAutoRejectRegistry(inner tool.Registry, catalog HITLCatalog) *autoRejectRegistry {
	return &autoRejectRegistry{inner: inner, catalog: catalog}
}

// loopToolRegistry is the registry the agent loop uses. In auto_reject mode gated
// tools are rejected at Lookup/invoke without calling the inner handler.
func loopToolRegistry(reg tool.Registry, mode HITLMode, catalog HITLCatalog) tool.Registry {
	if ResolveHITLMode(mode) == HITLModeAutoReject {
		return newAutoRejectRegistry(reg, catalog)
	}
	return reg
}

func (r *autoRejectRegistry) Specs() []tool.Spec {
	return r.inner.Specs()
}

func (r *autoRejectRegistry) Lookup(name string) (tool.Handler, bool) {
	if ClassifyHITL(name, r.catalog) == HITLClassNone {
		return r.inner.Lookup(name)
	}
	return func(ctx context.Context, call tool.Call) (tool.Result, error) {
		return tool.Result{
			ToolUseID: call.ID,
			OK:        false,
			Content:   []message.Part{message.Text{Text: AutoRejectToolResultContent}},
		}, nil
	}, true
}

var _ tool.Registry = (*autoRejectRegistry)(nil)

// newUIToolInterrupter runs free tools and then interrupts in interactive mode.
// Any other mode returns immediately so the loop executes the batch through
// autoRejectRegistry, which rejects gated tools without calling them.
// A batch with no gated calls returns immediately so the loop executes those tools once.
func newUIToolInterrupter(cfg hitlInterrupterConfig) loop.Interrupter {
	return loop.FuncInterrupter(func(ctx context.Context, st *run.State, calls []tool.Call) (bool, error) {
		if ResolveHITLMode(cfg.Mode) != HITLModeInteractive {
			return false, nil
		}

		var free, gated []tool.Call
		for _, c := range calls {
			if ClassifyHITL(c.Name, cfg.Catalog) == HITLClassNone {
				free = append(free, c)
			} else {
				gated = append(gated, c)
			}
		}
		if len(gated) == 0 {
			return false, nil
		}

		var freeParts []message.ToolResult
		if len(free) > 0 {
			results, err := executeServerTools(ctx, cfg.Registry, free)
			if err != nil {
				return false, err
			}
			if toolResultEndsChat(results) {
				// The server tool already ended the chat. Do not hand the
				// remaining gated calls onward or write tool results.
				dropAssistantToolUses(st)
				if cfg.Store != nil && cfg.SessionID != "" {
					if err := cfg.Store.ReplaceAll(ctx, cfg.SessionID, st.Messages); err != nil {
						return false, err
					}
				}
				return false, tool.ErrEndOfChat
			}
			freeParts = toolResultsToParts(results)
		}

		if err := appendToolResultMessage(ctx, st, cfg.SessionID, cfg.Store, freeParts); err != nil {
			return false, err
		}
		return true, nil
	})
}

func appendToolResultMessage(ctx context.Context, st *run.State, sessionID string, store memory.SessionStore, parts []message.ToolResult) error {
	if len(parts) == 0 {
		return nil
	}
	msg := message.NewToolResultMessage(parts...)
	message.EnsureID(&msg)
	if st != nil {
		st.AppendMessage(msg)
	}
	if store != nil && sessionID != "" {
		return store.Append(ctx, sessionID, msg)
	}
	return nil
}

func toolResultEndsChat(results []tool.Result) bool {
	for _, r := range results {
		if errors.Is(r.Err, tool.ErrEndOfChat) {
			return true
		}
	}
	return false
}

// dropAssistantToolUses removes ToolUse parts from the last assistant message
// so a terminal tool does not leave an unpaired tool call in history.
func dropAssistantToolUses(st *run.State) {
	if st == nil || len(st.Messages) == 0 {
		return
	}
	last := st.Messages[len(st.Messages)-1]
	if last.Role != message.RoleAssistant {
		return
	}
	kept := make([]message.Part, 0, len(last.Parts))
	for _, p := range last.Parts {
		if _, ok := p.(message.ToolUse); ok {
			continue
		}
		kept = append(kept, p)
	}
	if len(kept) == 0 {
		st.PopLastMessage()
		return
	}
	last.Parts = kept
	st.ReplaceLastMessage(last)
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

// SplitPendingCalls separates browser-auto ui_* calls from HITL cards.
// Choice and approval calls become cards. Other ui_* calls stay auto.
// Calls the catalog does not gate are omitted.
func SplitPendingCalls(pending *run.PendingTools, catalog HITLCatalog) (auto []ClientToolPendingCall, cards []HITLCard) {
	if pending == nil {
		return nil, nil
	}
	var cardCalls []run.PendingCall
	for _, c := range pending.Calls {
		switch ClassifyHITL(c.Name, catalog) {
		case HITLClassClientAuto:
			auto = append(auto, ClientToolPendingCall{
				ID:        c.ID,
				Name:      c.Name,
				Arguments: string(c.Input),
			})
		case HITLClassChoice, HITLClassApproval:
			cardCalls = append(cardCalls, c)
		}
	}
	return auto, BuildHITLCards(cardCalls, catalog)
}

// BuildHITLCards turns gated pending calls into pending cards.
// ui_choose reads title and options from arguments and appends reject when absent.
// Approval uses the catalog title and options, or DefaultHITLOptions when the catalog has none.
func BuildHITLCards(calls []run.PendingCall, catalog HITLCatalog) []HITLCard {
	if len(calls) == 0 {
		return nil
	}
	cards := make([]HITLCard, 0, len(calls))
	for _, c := range calls {
		switch ClassifyHITL(c.Name, catalog) {
		case HITLClassChoice:
			cards = append(cards, choiceHITLCard(c))
		case HITLClassApproval:
			cards = append(cards, approvalHITLCard(c, catalog[c.Name]))
		}
	}
	return cards
}

func choiceHITLCard(c run.PendingCall) HITLCard {
	var args struct {
		Title   string       `json:"title"`
		Options []HITLOption `json:"options"`
	}
	_ = json.Unmarshal(c.Input, &args)
	opts := args.Options
	if !hitlOptionsContain(opts, HITLOptionReject) {
		opts = append(opts, DefaultHITLOptions(HITLCardChoice)...)
	}
	return HITLCard{
		ToolCallID: c.ID,
		Kind:       HITLCardChoice,
		Title:      args.Title,
		ToolName:   c.Name,
		Arguments:  string(c.Input),
		Options:    opts,
		Status:     HITLStatusPending,
	}
}

func approvalHITLCard(c run.PendingCall, spec HITLSpec) HITLCard {
	opts := spec.Options
	if len(opts) == 0 {
		opts = DefaultHITLOptions(HITLCardApproval)
	}
	return HITLCard{
		ToolCallID: c.ID,
		Kind:       HITLCardApproval,
		Title:      spec.Title,
		ToolName:   c.Name,
		Arguments:  string(c.Input),
		Options:    opts,
		Status:     HITLStatusPending,
	}
}

func hitlOptionsContain(opts []HITLOption, id string) bool {
	for _, o := range opts {
		if o.ID == id {
			return true
		}
	}
	return false
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
