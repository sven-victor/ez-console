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

package eventbus

import (
	"context"
	"sync"
)

// NoopEventBus is used when cluster.enabled=false (single-node / SQLite).
// Publish delivers events only to local subscribers so that the business
// logic wiring is exercised even in single-node mode.
type NoopEventBus struct {
	mu       sync.RWMutex
	handlers []Handler
}

// NewNoopEventBus creates a no-op EventBus for single-node deployments.
func NewNoopEventBus() *NoopEventBus {
	return &NoopEventBus{}
}

func (n *NoopEventBus) Publish(_ context.Context, event string, payload []byte) error {
	n.mu.RLock()
	handlers := make([]Handler, len(n.handlers))
	copy(handlers, n.handlers)
	n.mu.RUnlock()
	for _, h := range handlers {
		h(event, payload)
	}
	return nil
}

func (n *NoopEventBus) Subscribe(h Handler) {
	n.mu.Lock()
	n.handlers = append(n.handlers, h)
	n.mu.Unlock()
}

func (n *NoopEventBus) NodeID() string { return "local" }

func (n *NoopEventBus) Close() error { return nil }
