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

func TestApprovalToolNamesFromConfig(t *testing.T) {
	got := ApprovalToolNamesFromConfig(ToolSetConfig{"approval_tools": []interface{}{"delete_user", ""}})
	if _, ok := got["delete_user"]; !ok || len(got) != 1 {
		t.Fatalf("%#v", got)
	}
}
