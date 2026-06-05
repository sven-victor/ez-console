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

// Package eventbus provides a thin abstraction over node-to-node event
// broadcasting.  The noop implementation is used in single-node / SQLite
// deployments; the serf implementation uses hashicorp/serf for multi-node.
//
// All event paths MUST have a DB fallback (polling / lease / cancel_requested
// column) so that event loss only affects latency, never correctness.
package eventbus

import (
	"context"
	"io"
)

// Well-known event names.
const (
	EventCacheInvalidate = "cache.invalidate"
	EventTaskNew         = "task.new"
	EventTaskCancel      = "task.cancel"
	EventScheduleChanged         = "schedule.changed"
	EventSchedulerLeaseReleased  = "scheduler.lease.released"
)

// Handler is called for every received event.  It must not block for long.
type Handler func(event string, payload []byte)

// EventBus is the interface that all implementations must satisfy.
type EventBus interface {
	// Publish broadcasts an event to all members of the cluster, including
	// the local node.  Returns nil if the event was accepted for delivery
	// (best-effort; delivery is not guaranteed).
	Publish(ctx context.Context, event string, payload []byte) error

	// Subscribe registers h to be called when any event is received.
	// Multiple handlers may be registered; each receives every event.
	// Handlers are called in the goroutine that processes inbound events
	// and must not perform blocking I/O or heavy computation.
	Subscribe(h Handler)

	// NodeID returns the stable identifier for this node.  In the serf
	// implementation this is the serf node name; in noop it is "local".
	NodeID() string

	io.Closer
}

// CacheInvalidatePayload is the JSON payload for cache.invalidate events.
type CacheInvalidatePayload struct {
	CacheName string `json:"cache_name"`
	Key       string `json:"key"` // "*" means clear the entire cache
}
