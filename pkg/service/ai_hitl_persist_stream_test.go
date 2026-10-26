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
	"errors"
	"io"
	"testing"

	"github.com/sven-victor/ez-console/pkg/clients/ai"
)

type scriptedChatStream struct {
	events []*ai.ChatStreamEvent
	closed bool
}

func (s *scriptedChatStream) Recv(context.Context) (*ai.ChatStreamEvent, error) {
	if len(s.events) == 0 {
		return nil, io.EOF
	}
	ev := s.events[0]
	s.events = s.events[1:]
	return ev, nil
}

func (s *scriptedChatStream) Close() error {
	s.closed = true
	return nil
}

func TestHITLPersistStreamSavesOnlyPendingCards(t *testing.T) {
	cards := []ai.HITLCard{{
		ToolCallID: "call_1",
		Kind:       ai.HITLCardApproval,
		Status:     ai.HITLStatusPending,
	}}
	inner := &scriptedChatStream{events: []*ai.ChatStreamEvent{
		{EventType: ai.EventTypeContent, Content: "hello"},
		{EventType: ai.EventTypeClientToolPending, ClientToolCalls: []ai.ClientToolPendingCall{{ID: "ui_1", Name: "ui_navigate"}}},
		{EventType: ai.EventTypeHITLPending},
		{EventType: ai.EventTypeHITLPending, HITLCards: cards},
	}}
	var saved [][]ai.HITLCard
	stream := wrapHITLPersistStream(inner, func(got []ai.HITLCard) error {
		saved = append(saved, got)
		return nil
	})

	ev, err := stream.Recv(context.Background())
	if err != nil || ev.EventType != ai.EventTypeContent {
		t.Fatalf("content recv: %v %#v", err, ev)
	}
	ev, err = stream.Recv(context.Background())
	if err != nil || ev.EventType != ai.EventTypeClientToolPending {
		t.Fatalf("client pending recv: %v %#v", err, ev)
	}
	ev, err = stream.Recv(context.Background())
	if err != nil || ev.EventType != ai.EventTypeHITLPending {
		t.Fatalf("empty hitl recv: %v %#v", err, ev)
	}
	ev, err = stream.Recv(context.Background())
	if err != nil || ev.EventType != ai.EventTypeHITLPending || len(ev.HITLCards) != 1 {
		t.Fatalf("hitl recv: %v %#v", err, ev)
	}
	if len(saved) != 1 || saved[0][0].ToolCallID != "call_1" {
		t.Fatalf("saved cards: %#v", saved)
	}
	if _, err := stream.Recv(context.Background()); !errors.Is(err, io.EOF) {
		t.Fatalf("eof: %v", err)
	}
	if err := stream.Close(); err != nil || !inner.closed {
		t.Fatalf("close: err=%v closed=%v", err, inner.closed)
	}
}

func TestHITLPersistStreamReturnsSaveError(t *testing.T) {
	inner := &scriptedChatStream{events: []*ai.ChatStreamEvent{{
		EventType: ai.EventTypeHITLPending,
		HITLCards: []ai.HITLCard{{ToolCallID: "call_1"}},
	}}}
	want := errors.New("db down")
	stream := wrapHITLPersistStream(inner, func([]ai.HITLCard) error { return want })
	ev, err := stream.Recv(context.Background())
	if ev != nil || !errors.Is(err, want) {
		t.Fatalf("got event %#v err %v", ev, err)
	}
}
