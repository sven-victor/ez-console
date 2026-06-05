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

import "sync"

var (
	globalBus   EventBus
	globalBusMu sync.RWMutex
)

// SetGlobalEventBus sets the application-wide EventBus.  Must be called once
// during startup, before any service is initialised.
func SetGlobalEventBus(bus EventBus) {
	globalBusMu.Lock()
	globalBus = bus
	globalBusMu.Unlock()
}

// GetGlobalEventBus returns the application-wide EventBus.
// Returns nil if SetGlobalEventBus has not been called yet.
func GetGlobalEventBus() EventBus {
	globalBusMu.RLock()
	defer globalBusMu.RUnlock()
	return globalBus
}
