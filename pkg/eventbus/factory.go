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
	"encoding/json"

	"github.com/sven-victor/ez-console/pkg/config"
)

// New returns the appropriate EventBus implementation based on the cluster
// configuration.  When cluster.enabled=false a NoopEventBus is returned so
// that single-node deployments work without any gossip setup.
func New(cfg *config.ClusterConfig) (EventBus, error) {
	if !cfg.Enabled {
		return NewNoopEventBus(), nil
	}
	return NewSerfEventBus(cfg)
}

// MarshalPayload is a convenience helper that JSON-encodes v and returns the
// bytes, swallowing the error (marshalling a well-typed struct never fails).
func MarshalPayload(v any) []byte {
	b, _ := json.Marshal(v)
	return b
}

// UnmarshalPayload JSON-decodes payload into v.
func UnmarshalPayload(payload []byte, v any) error {
	return json.Unmarshal(payload, v)
}
