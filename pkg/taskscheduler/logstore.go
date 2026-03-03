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

package taskscheduler

import (
	"context"
	"sync"

	"github.com/sven-victor/ez-console/pkg/model"
)

// LogStoreBackend is the interface for log storage. Implementations can use database, file, etc.
type LogStoreBackend interface {
	// Write persists a log entry.
	Write(ctx context.Context, refID, level, message string) error
	// ListByTaskID returns log entries for the given ref ID and type, ordered by created_at asc.
	ListByTaskID(ctx context.Context, refID string) ([]model.TaskLog, error)
}

// LogStoreBackendFactory creates a Backend instance.
type LogStoreBackendFactory func() LogStoreBackend

var (
	registryLogStore   = make(map[string]LogStoreBackendFactory)
	defaultLogStoreKey = "database"
	registryLogStoreMu sync.RWMutex
)

// RegisterLogStoreBackend adds a backend factory under the given name.
func RegisterLogStoreBackend(name string, factory LogStoreBackendFactory) {
	registryLogStoreMu.Lock()
	defer registryLogStoreMu.Unlock()
	registryLogStore[name] = factory
}

// SetDefaultLogStore sets the default backend name (used when Get is called with empty name).
func SetDefaultLogStore(name string) {
	registryLogStoreMu.Lock()
	defer registryLogStoreMu.Unlock()
	defaultLogStoreKey = name
}

// GetLogStoreBackend returns the Backend for the given name. If name is empty, returns the default backend.
// Returns nil if the name is not registered.
func GetLogStoreBackend(name string) LogStoreBackend {
	registryLogStoreMu.RLock()
	defer registryLogStoreMu.RUnlock()
	if name == "" {
		name = defaultLogStoreKey
	}
	f, ok := registryLogStore[name]
	if !ok {
		return nil
	}
	return f()
}

// ListLogStoreBackendNames returns the names of all registered backends. The order is not specified.
func ListLogStoreBackendNames() []string {
	registryLogStoreMu.RLock()
	defer registryLogStoreMu.RUnlock()
	names := make([]string, 0, len(registryLogStore))
	for name := range registryLogStore {
		names = append(names, name)
	}
	return names
}
