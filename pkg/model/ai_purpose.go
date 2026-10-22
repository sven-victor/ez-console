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

package model

import "sync"

// AIPurpose is a registered use of an AI model, such as page chat or summarization.
type AIPurpose string

const (
	// AIPurposeChat is the model used when a page conversation is created without an explicit model.
	AIPurposeChat AIPurpose = "chat"
	// AIPurposeSummary is the model used to summarize a conversation that exceeds its context window.
	AIPurposeSummary AIPurpose = "summary"
)

// AIPurposeDefinition describes a purpose that features register at init.
// Fallback means an unbound or disabled assignment uses the organization default model.
type AIPurposeDefinition struct {
	Key         string
	Name        string
	Description string
	Fallback    bool
}

var (
	aiPurposeMu    sync.RWMutex
	aiPurposeOrder []string
	aiPurposeByKey = map[string]AIPurposeDefinition{}
)

// RegisterAIPurpose adds a purpose. Duplicate keys panic so init-time mistakes fail immediately.
func RegisterAIPurpose(def AIPurposeDefinition) {
	if def.Key == "" {
		panic("AI purpose key is required")
	}
	aiPurposeMu.Lock()
	defer aiPurposeMu.Unlock()
	if _, exists := aiPurposeByKey[def.Key]; exists {
		panic("duplicate AI purpose: " + def.Key)
	}
	aiPurposeByKey[def.Key] = def
	aiPurposeOrder = append(aiPurposeOrder, def.Key)
}

// LookupAIPurpose returns a registered purpose.
func LookupAIPurpose(purpose AIPurpose) (AIPurposeDefinition, bool) {
	aiPurposeMu.RLock()
	defer aiPurposeMu.RUnlock()
	def, ok := aiPurposeByKey[string(purpose)]
	return def, ok
}

// ListAIPurposes returns registered purposes in registration order.
func ListAIPurposes() []AIPurposeDefinition {
	aiPurposeMu.RLock()
	defer aiPurposeMu.RUnlock()
	out := make([]AIPurposeDefinition, 0, len(aiPurposeOrder))
	for _, key := range aiPurposeOrder {
		out = append(out, aiPurposeByKey[key])
	}
	return out
}

func init() {
	RegisterAIPurpose(AIPurposeDefinition{
		Key:         string(AIPurposeChat),
		Name:        "Page chat",
		Description: "Model used when starting a page conversation.",
		Fallback:    true,
	})
	RegisterAIPurpose(AIPurposeDefinition{
		Key:         string(AIPurposeSummary),
		Name:        "Message summary",
		Description: "Model used to summarize a conversation that exceeds the context window.",
		Fallback:    true,
	})
}
