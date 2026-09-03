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
	"io"
	"strings"
	"sync"

	"github.com/gofrs/uuid"
	"github.com/sven-victor/ez-agent/agent"
	"github.com/sven-victor/ez-agent/event"
	"github.com/sven-victor/ez-agent/memory"
	"github.com/sven-victor/ez-agent/message"
	aimodel "github.com/sven-victor/ez-agent/model"
	"github.com/sven-victor/ez-agent/run"
	"github.com/sven-victor/ez-console/pkg/model"
)

// ezAgentChatStream adapts agent.RunStream events to the console ChatStream SSE contract.
type ezAgentChatStream struct {
	parentCtx context.Context // request-scoped values; not canceled for persistence callbacks
	ctx       context.Context
	cancel    context.CancelFunc
	events    <-chan event.Event
	messageID string
	pending   chan *ChatStreamEvent
	errCh     chan error
	closed    sync.Once
	closeCh   chan struct{}
	handoff   bool
	trace     *agentTraceSink // shared with hooks; records terminal RunError
}

func (s *ezAgentChatStream) Recv(ctx context.Context) (*ChatStreamEvent, error) {
	if s.handoff {
		return nil, ErrClientToolHandoff
	}
	select {
	case ev, ok := <-s.pending:
		return s.takePending(ev, ok)
	case <-s.closeCh:
		return s.recvPreferPending(io.EOF)
	case <-ctx.Done():
		return s.recvPreferPending(ctx.Err())
	}
}

// recvPreferPending returns a queued event even when the caller is canceling
// or closing, so already-produced tokens are not dropped. stopErr is used
// only when pending has nothing ready.
func (s *ezAgentChatStream) recvPreferPending(stopErr error) (*ChatStreamEvent, error) {
	select {
	case ev, ok := <-s.pending:
		return s.takePending(ev, ok)
	default:
		return nil, stopErr
	}
}

func (s *ezAgentChatStream) takePending(ev *ChatStreamEvent, ok bool) (*ChatStreamEvent, error) {
	if !ok {
		return nil, s.streamEndErr()
	}
	if ev.EventType == EventTypeClientToolPending {
		s.handoff = true
	}
	return ev, nil
}

// streamEndErr is called after pending is closed. errCh is closed first in
// pump, so a real error (if any) is already available; a closed empty errCh
// is a clean EOF.
func (s *ezAgentChatStream) streamEndErr() error {
	select {
	case err := <-s.errCh:
		if err != nil {
			return err
		}
	default:
	}
	return io.EOF
}

func (s *ezAgentChatStream) Close() error {
	s.closed.Do(func() {
		close(s.closeCh)
		if s.cancel != nil {
			s.cancel()
		}
	})
	return nil
}

func (s *ezAgentChatStream) persistCtx() context.Context {
	base := s.parentCtx
	if base == nil {
		base = s.ctx
	}
	if base == nil {
		return context.Background()
	}
	return context.WithoutCancel(base)
}

func (s *ezAgentChatStream) pump() {
	defer close(s.pending)
	defer close(s.errCh)
	for {
		select {
		case <-s.closeCh:
			return
		case <-s.ctx.Done():
			return
		case ev, ok := <-s.events:
			if !ok {
				return
			}
			if err := s.handleEvent(ev); err != nil {
				select {
				case s.errCh <- err:
				case <-s.closeCh:
				}
				return
			}
		}
	}
}

func (s *ezAgentChatStream) handleEvent(ev event.Event) error {
	switch e := ev.(type) {
	case event.ModelDelta:
		if e.TextDelta == "" {
			return nil
		}
		return s.emit(&ChatStreamEvent{
			MessageID: s.messageID,
			Content:   e.TextDelta,
			Role:      model.AIChatMessageRoleAssistant,
			EventType: EventTypeContent,
		})
	case event.ModelFinished:
		return nil
	case event.ToolStarted:
		tc := ToolCall{
			ID:   e.Call.ID,
			Type: "function",
			Function: FunctionCall{
				Name:      e.Call.Name,
				Arguments: string(e.Call.Input),
			},
			Status: ToolCallStatusRunning,
		}
		return s.emit(&ChatStreamEvent{
			MessageID: s.messageID,
			EventType: EventTypeToolCall,
			ToolCalls: []ToolCall{tc},
		})
	case event.ToolFinished:
		resultText := toolResultText(message.ToolResult{
			ToolUseID: e.Result.ToolUseID,
			OK:        e.Result.OK,
			Parts:     e.Result.Content,
		})
		if e.Result.Err != nil && resultText == "" {
			resultText = e.Result.Err.Error()
		}
		status := ToolCallStatusCompleted
		if !e.Result.OK {
			status = ToolCallStatusFailed
		}
		tc := ToolCall{
			ID:   e.Call.ID,
			Type: "function",
			Function: FunctionCall{
				Name:      e.Call.Name,
				Arguments: string(e.Call.Input),
			},
			Status: status,
			Result: resultText,
		}
		return s.emit(&ChatStreamEvent{
			MessageID: s.messageID,
			EventType: EventTypeToolCall,
			ToolCalls: []ToolCall{tc},
		})
	case event.Interrupted:
		pending := filterUIPending(e.Pending)
		if len(pending) == 0 {
			return nil
		}
		return s.emit(&ChatStreamEvent{
			MessageID:       s.messageID,
			EventType:       EventTypeClientToolPending,
			ClientToolCalls: pending,
		})
	case event.RunError:
		errMsg := "run failed"
		if e.Err != nil {
			errMsg = e.Err.Error()
		}
		if s.trace != nil {
			// Per-attempt model failures are already traced in AfterModel; this
			// covers terminal non-model errors and syncs duration when needed.
			s.trace.recordError(s.persistCtx(), errMsg)
		}
		if e.Err != nil {
			return e.Err
		}
		return fmt.Errorf("%s", errMsg)
	case event.Cancelled:
		return context.Canceled
	case event.RunFinished, event.RunStarted:
		return nil
	default:
		return nil
	}
}

func (s *ezAgentChatStream) emit(ev *ChatStreamEvent) error {
	select {
	case <-s.closeCh:
		return io.EOF
	case <-s.ctx.Done():
		return s.ctx.Err()
	case s.pending <- ev:
		return nil
	}
}

func buildAgent(ctx context.Context, provider aimodel.Provider, opts *ChatCompletionOptions, preferComplete bool) (*agent.Agent, *agentTraceSink, error) {
	systemParts := collectSystemText(opts)
	var agentOpts []agent.Option
	agentOpts = append(agentOpts, agent.WithProvider(provider))
	if systemParts != "" {
		agentOpts = append(agentOpts, agent.WithSystem(systemParts))
	}

	maxTurns := opts.MaxIterations
	if maxTurns <= 0 {
		maxTurns = 10
	}
	limits := run.Limits{MaxTurns: maxTurns}
	agentOpts = append(agentOpts, agent.WithLimits(limits))

	reg := newToolSetsRegistry(func() context.Context { return ctx }, opts.ToolSetsProvider, opts.ClientTools)
	agentOpts = append(agentOpts, agent.WithToolRegistry(reg))
	agentOpts = append(agentOpts, agent.WithInterrupter(newUIToolInterrupter(reg, opts.SessionID, opts.SessionStore)))

	if opts.SessionID != "" && opts.SessionStore != nil {
		agentOpts = append(agentOpts, agent.WithSession(opts.SessionID, opts.SessionStore))
	}

	hooks, sink := buildAgentHooks(opts)
	agentOpts = append(agentOpts, agent.WithHooks(hooks))

	if opts.EnableAutoSummarization {
		policy := &memory.Summarize{
			Summarizer:           &memory.RobustSummarizer{Provider: provider},
			Segmented:            &memory.SegmentedSummarizer{Provider: provider},
			KeepRecent:           10,
			Ratio:                0.3,
			ProactiveMaxMessages: 80,
			Fallback:             &memory.Window{MaxMessages: 10},
		}
		if opts.MaxTokens > 0 {
			policy.ProactiveMaxTokens = int(float64(opts.MaxTokens) * 0.5)
		}
		if opts.ToolResultMaxSize > 0 {
			policy.MaxMessageBytes = opts.ToolResultMaxSize
			agentOpts = append(agentOpts, agent.WithContextPolicy(&memory.Offload{
				Store:    memory.NewMemBlobStore(),
				MaxBytes: opts.ToolResultMaxSize,
				Inner:    policy,
			}))
		} else {
			agentOpts = append(agentOpts, agent.WithContextPolicy(policy))
		}
	} else {
		if opts.MaxTokens > 0 {
			limits.MaxTotalTokens = opts.MaxTokens
		}
		if opts.ToolResultMaxSize > 0 {
			agentOpts = append(agentOpts, agent.WithContextPolicy(&memory.Offload{
				Store:    memory.NewMemBlobStore(),
				MaxBytes: opts.ToolResultMaxSize,
				Inner:    memory.Noop{},
			}))
		}
	}

	if opts.ResponseJsonSchema != "" {
		var schemaName string
		var raw json.RawMessage
		if err := json.Unmarshal([]byte(opts.ResponseJsonSchema), &raw); err == nil {
			schemaName = "response"
			agentOpts = append(agentOpts, agent.WithOutputSchema([]byte(opts.ResponseJsonSchema), schemaName))
		}
	}

	if preferComplete {
		agentOpts = append(agentOpts, agent.WithPreferComplete(true))
	}

	a, err := agent.New(agentOpts...)
	return a, sink, err
}

func collectSystemText(opts *ChatCompletionOptions) string {
	var b strings.Builder
	// Skill metadata is injected by PrepareChatCompletionSkillLoader into message
	// system prompts and merged via splitSystemFromMessages.
	if opts != nil {
		if p := strings.TrimSpace(opts.ModelSystemPrompt); p != "" {
			b.WriteString(p)
		}
		for _, p := range opts.EphemeralSystemPrompts {
			p = strings.TrimSpace(p)
			if p == "" {
				continue
			}
			if b.Len() > 0 {
				b.WriteString("\n\n")
			}
			b.WriteString(p)
		}
	}
	return b.String()
}

func messagesToRunInput(msgs []ChatMessage) run.Input {
	// Strip system (handled via WithSystem) and convert the rest.
	filtered := make([]ChatMessage, 0, len(msgs))
	for _, m := range msgs {
		if m.Role == model.AIChatMessageRoleSystem {
			continue
		}
		if m.Role == model.AIChatMessageRolePrompt {
			m.Role = model.AIChatMessageRoleUser
		}
		filtered = append(filtered, m)
	}
	return run.Input{Messages: ChatMessagesToAgent(filtered)}
}

func splitSystemFromMessages(msgs []ChatMessage) (system string, rest []ChatMessage) {
	var sysParts []string
	for _, m := range msgs {
		if m.Role == model.AIChatMessageRoleSystem {
			if strings.TrimSpace(m.Content) != "" {
				sysParts = append(sysParts, m.Content)
			}
			continue
		}
		rest = append(rest, m)
	}
	return strings.Join(sysParts, "\n\n"), rest
}

func newEZAgentStream(ctx context.Context, provider aimodel.Provider, messages []ChatMessage, opts ChatCompletionOptions, preferComplete bool) (ChatStream, error) {
	// Merge system messages from the input list into provider system prompt.
	sysFromMsgs, rest := splitSystemFromMessages(messages)
	if sysFromMsgs != "" {
		opts.EphemeralSystemPrompts = append(opts.EphemeralSystemPrompts, sysFromMsgs)
	}

	runCtx, cancel := context.WithCancel(ctx)
	a, sink, err := buildAgent(runCtx, provider, &opts, preferComplete)
	if err != nil {
		cancel()
		return nil, err
	}

	in := messagesToRunInput(rest)
	events := a.RunStream(runCtx, in)

	stream := &ezAgentChatStream{
		parentCtx: ctx,
		ctx:       runCtx,
		cancel:    cancel,
		events:    events,
		messageID: uuid.Must(uuid.NewV4()).String(),
		pending:   make(chan *ChatStreamEvent, 16),
		errCh:     make(chan error, 1),
		closeCh:   make(chan struct{}),
		trace:     sink,
	}
	go stream.pump()
	return stream, nil
}

func runEZAgent(ctx context.Context, provider aimodel.Provider, messages []ChatMessage, opts ChatCompletionOptions) ([]ChatMessage, error) {
	sysFromMsgs, rest := splitSystemFromMessages(messages)
	if sysFromMsgs != "" {
		opts.EphemeralSystemPrompts = append(opts.EphemeralSystemPrompts, sysFromMsgs)
	}

	a, sink, err := buildAgent(ctx, provider, &opts, true)
	if err != nil {
		return nil, err
	}
	in := messagesToRunInput(rest)
	res, err := a.Run(ctx, in)
	if err != nil {
		// Non-stream Run uses a no-op emit, so RunError is never observed; record here.
		if sink != nil {
			sink.recordError(context.WithoutCancel(ctx), err.Error())
		}
		return nil, err
	}
	if res == nil {
		return nil, fmt.Errorf("agent returned nil result")
	}
	if res.StopReason == run.StopInterrupted {
		// Non-stream Exchange cannot hand off to the browser; surface as error content in tool sense.
		return AgentMessagesToChat(res.Messages), fmt.Errorf("%w", ErrClientToolHandoff)
	}
	return AgentMessagesToChat(res.Messages), nil
}
