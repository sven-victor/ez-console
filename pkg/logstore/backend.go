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

package logstore

import (
	"context"
	"sync"

	"github.com/sven-victor/ez-console/pkg/model"
)

// Entry represents a single log entry for read operations.
type Entry struct {
	ID        string `json:"id"`
	RefID     string `json:"ref_id"`
	LogType   string `json:"log_type"`
	Level     string `json:"level,omitempty"`
	Message   string `json:"message"`
	CreatedAt string `json:"created_at"`
}

// Backend is the interface for log storage. Implementations can use database, file, etc.
type Backend interface {
	// Write persists a log entry.
	Write(ctx context.Context, refID string, logType model.LogType, level, message string) error
	// ListByRefIDAndType returns log entries for the given ref ID and type, ordered by created_at asc.
	ListByRefIDAndType(ctx context.Context, refID string, logType model.LogType) ([]Entry, error)
}

// BackendFactory creates a Backend instance.
type BackendFactory func() Backend

var (
	registry   = make(map[string]BackendFactory)
	defaultKey = "database"
	registryMu sync.RWMutex
)

// Register adds a backend factory under the given name.
func Register(name string, factory BackendFactory) {
	registryMu.Lock()
	defer registryMu.Unlock()
	registry[name] = factory
}

// SetDefault sets the default backend name (used when Get is called with empty name).
func SetDefault(name string) {
	registryMu.Lock()
	defer registryMu.Unlock()
	defaultKey = name
}

// Get returns the Backend for the given name. If name is empty, returns the default backend.
// Returns nil if the name is not registered.
func Get(name string) Backend {
	registryMu.RLock()
	defer registryMu.RUnlock()
	if name == "" {
		name = defaultKey
	}
	f, ok := registry[name]
	if !ok {
		return nil
	}
	return f()
}

// ListBackendNames returns the names of all registered backends. The order is not specified.
func ListBackendNames() []string {
	registryMu.RLock()
	defer registryMu.RUnlock()
	names := make([]string, 0, len(registry))
	for name := range registry {
		names = append(names, name)
	}
	return names
}
