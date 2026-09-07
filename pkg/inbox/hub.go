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

// Package inbox provides a per-node connection hub for in-app message SSE.
// The hub only fans out wakeup signals; callers load rows from the database.
package inbox

import (
	"sync"

	"github.com/sven-victor/ez-console/pkg/eventbus"
)

const wakeSignalBuffer = 64

// Conn is one live SSE connection for a user.
type Conn struct {
	userID string
	ch     chan struct{}
}

// Notify returns the wakeup channel for this connection. It is never closed
// while the connection is registered; callers should also select on request context.
func (c *Conn) Notify() <-chan struct{} {
	return c.ch
}

// Hub maps user IDs to the SSE connections held by this process.
type Hub struct {
	mu      sync.RWMutex
	byUser  map[string]map[*Conn]struct{}
	pending map[string]struct{}
	wakeCh  chan struct{}
	stopCh  chan struct{}
	once    sync.Once
}

// NewHub creates an empty hub. Call Listen to attach EventBus wakeup handling.
func NewHub() *Hub {
	return &Hub{
		byUser:  make(map[string]map[*Conn]struct{}),
		pending: make(map[string]struct{}),
		wakeCh:  make(chan struct{}, 1),
		stopCh:  make(chan struct{}),
	}
}

// Listen subscribes to inbox.wakeup events. The handler only enqueues a user ID;
// it must not query the database or write HTTP.
func (h *Hub) Listen(bus eventbus.EventBus) {
	if h == nil || bus == nil {
		return
	}
	h.startWorker()
	bus.Subscribe(func(event string, payload []byte) {
		if event != eventbus.EventInboxWakeup {
			return
		}
		var p eventbus.InboxWakeupPayload
		if err := eventbus.UnmarshalPayload(payload, &p); err != nil || p.UserID == "" {
			return
		}
		h.Wake(p.UserID)
	})
}

func (h *Hub) startWorker() {
	h.once.Do(func() {
		go h.loop()
	})
}

func (h *Hub) loop() {
	for {
		select {
		case <-h.stopCh:
			return
		case <-h.wakeCh:
			h.flushPending()
		}
	}
}

func (h *Hub) flushPending() {
	h.mu.Lock()
	pending := h.pending
	h.pending = make(map[string]struct{})
	h.mu.Unlock()
	for userID := range pending {
		h.notifyUser(userID)
	}
}

// Wake marks userID for fan-out. Safe to call from the EventBus goroutine.
func (h *Hub) Wake(userID string) {
	if h == nil || userID == "" {
		return
	}
	h.startWorker()
	h.mu.Lock()
	h.pending[userID] = struct{}{}
	h.mu.Unlock()
	select {
	case h.wakeCh <- struct{}{}:
	default:
	}
}

func (h *Hub) notifyUser(userID string) {
	h.mu.RLock()
	conns := h.byUser[userID]
	list := make([]*Conn, 0, len(conns))
	for c := range conns {
		list = append(list, c)
	}
	h.mu.RUnlock()
	for _, c := range list {
		select {
		case c.ch <- struct{}{}:
		default:
		}
	}
}

// Add registers a connection for userID. The caller must Remove it when the stream ends.
func (h *Hub) Add(userID string) *Conn {
	c := &Conn{
		userID: userID,
		ch:     make(chan struct{}, wakeSignalBuffer),
	}
	h.mu.Lock()
	if h.byUser[userID] == nil {
		h.byUser[userID] = make(map[*Conn]struct{})
	}
	h.byUser[userID][c] = struct{}{}
	h.mu.Unlock()
	h.startWorker()
	return c
}

// Remove unregisters a connection.
func (h *Hub) Remove(c *Conn) {
	if c == nil {
		return
	}
	h.mu.Lock()
	defer h.mu.Unlock()
	set := h.byUser[c.userID]
	delete(set, c)
	if len(set) == 0 {
		delete(h.byUser, c.userID)
	}
}

// Close stops the wakeup worker. Registered connections are not closed.
func (h *Hub) Close() {
	select {
	case <-h.stopCh:
	default:
		close(h.stopCh)
	}
}
