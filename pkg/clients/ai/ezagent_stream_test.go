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
	"io"
	"testing"
)

func newTestChatStream(buf int) *ezAgentChatStream {
	return &ezAgentChatStream{
		pending: make(chan *ChatStreamEvent, buf),
		errCh:   make(chan error, 1),
		closeCh: make(chan struct{}),
	}
}

func enqueueContent(s *ezAgentChatStream, chunks ...string) {
	for _, c := range chunks {
		s.pending <- &ChatStreamEvent{Content: c, EventType: EventTypeContent}
	}
}

// finishPump mimics pump's successful-exit defers: close errCh first, then pending.
func finishPump(s *ezAgentChatStream) {
	close(s.errCh)
	close(s.pending)
}

func recvAll(t *testing.T, s *ezAgentChatStream, ctx context.Context) []string {
	t.Helper()
	var got []string
	for {
		ev, err := s.Recv(ctx)
		if err == io.EOF {
			return got
		}
		if err != nil {
			t.Fatalf("Recv: %v (got %q so far)", err, got)
		}
		got = append(got, ev.Content)
	}
}

func TestEZAgentChatStreamRecvDrainsPendingAfterPumpDone(t *testing.T) {
	want := []string{"alpha", "beta", "gamma", "delta"}
	// The old Recv selected a closed errCh at equal priority with pending, so
	// this loop is what used to flake into a truncated payload.
	for i := 0; i < 200; i++ {
		s := newTestChatStream(len(want))
		enqueueContent(s, want...)
		finishPump(s)

		got := recvAll(t, s, context.Background())
		if len(got) != len(want) {
			t.Fatalf("iter %d: got %q, want %q", i, got, want)
		}
		for j := range want {
			if got[j] != want[j] {
				t.Fatalf("iter %d: got %q, want %q", i, got, want)
			}
		}
	}
}

func TestEZAgentChatStreamRecvCanceledContextStillDrainsPending(t *testing.T) {
	s := newTestChatStream(4)
	enqueueContent(s, "one", "two")
	finishPump(s)

	ctx, cancel := context.WithCancel(context.Background())
	cancel()

	got := recvAll(t, s, ctx)
	if len(got) != 2 || got[0] != "one" || got[1] != "two" {
		t.Fatalf("got %q, want [one two]", got)
	}
}

func TestEZAgentChatStreamRecvCloseStillDrainsPending(t *testing.T) {
	s := newTestChatStream(4)
	enqueueContent(s, "keep", "me")
	if err := s.Close(); err != nil {
		t.Fatal(err)
	}

	got := recvAll(t, s, context.Background())
	if len(got) != 2 || got[0] != "keep" || got[1] != "me" {
		t.Fatalf("got %q, want [keep me]", got)
	}
}

func TestEZAgentChatStreamRecvReturnsErrorAfterDraining(t *testing.T) {
	s := newTestChatStream(4)
	enqueueContent(s, "partial")
	boom := errors.New("run failed")
	s.errCh <- boom
	close(s.errCh)
	close(s.pending)

	ev, err := s.Recv(context.Background())
	if err != nil {
		t.Fatalf("first Recv: %v", err)
	}
	if ev.Content != "partial" {
		t.Fatalf("content %q", ev.Content)
	}
	if _, err := s.Recv(context.Background()); !errors.Is(err, boom) {
		t.Fatalf("end Recv: %v, want %v", err, boom)
	}
}

func TestEZAgentChatStreamRecvHandoffAfterClientToolPending(t *testing.T) {
	s := newTestChatStream(1)
	s.pending <- &ChatStreamEvent{EventType: EventTypeClientToolPending}
	finishPump(s)

	if _, err := s.Recv(context.Background()); err != nil {
		t.Fatalf("pending event: %v", err)
	}
	if _, err := s.Recv(context.Background()); !errors.Is(err, ErrClientToolHandoff) {
		t.Fatalf("handoff Recv: %v", err)
	}
}
