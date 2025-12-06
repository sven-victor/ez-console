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

package util

import (
	"encoding/json"
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestErrorResponse_Marshal(t *testing.T) {
	type fields struct {
		HTTPCode int
		Code     string
		Err      error
		Message  string
	}
	tests := []struct {
		name   string
		fields fields
		want   string
	}{{
		name:   "test",
		fields: fields{HTTPCode: 200, Code: "200", Err: fmt.Errorf("Test Error"), Message: "Test Message"},
		want:   "{\"code\":\"200\",\"err\":\"Test Error\",\"message\":\"Test Message\"}",
	}, {
		name:   "test",
		fields: fields{HTTPCode: 200, Code: "200", Err: fmt.Errorf("Test Error")},
		want:   "{\"code\":\"200\",\"err\":\"Test Error\"}",
	}}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			e := ErrorResponse{
				HTTPCode: tt.fields.HTTPCode,
				Code:     tt.fields.Code,
				Err:      tt.fields.Err,
				Message:  tt.fields.Message,
			}
			if got, err := json.Marshal(e); err != nil {
				t.Errorf("failed to marshal ErrorResponse: %s", err)
			} else if string(got) != tt.want {
				require.Equal(t, tt.want, string(got))
			}
		})
	}
}
