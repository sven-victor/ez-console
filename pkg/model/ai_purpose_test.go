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

import "testing"

func TestBuiltinAIPurposes(t *testing.T) {
	defs := ListAIPurposes()
	if len(defs) < 2 {
		t.Fatalf("expected builtin purposes, got %d", len(defs))
	}
	chat, ok := LookupAIPurpose(AIPurposeChat)
	if !ok || !chat.Fallback {
		t.Fatalf("chat purpose = %+v, ok=%v", chat, ok)
	}
	summary, ok := LookupAIPurpose(AIPurposeSummary)
	if !ok || !summary.Fallback {
		t.Fatalf("summary purpose = %+v, ok=%v", summary, ok)
	}
	if _, ok := LookupAIPurpose("not-registered"); ok {
		t.Fatal("unknown purpose should not resolve")
	}
}
