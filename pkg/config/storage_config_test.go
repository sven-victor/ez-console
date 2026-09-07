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

package config

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestParseStorageConfig(t *testing.T) {
	t.Parallel()

	for _, tc := range []struct {
		name    string
		in      string
		want    map[string]any
		wantErr bool
	}{
		{
			name: "s3 compact form",
			in:   "driver=s3,bucket=ez-console,force_path_style=true,presign_enabled=false,presign_expiry=10m",
			want: map[string]any{
				"driver":           "s3",
				"bucket":           "ez-console",
				"force_path_style": true,
				"presign_enabled":  false,
				"presign_expiry":   "10m",
			},
		},
		{
			name: "bare value may contain equals",
			in:   "driver=s3,secret_access_key=abc=def",
			want: map[string]any{
				"driver":            "s3",
				"secret_access_key": "abc=def",
			},
		},
		{
			name: "quoted comma and equals",
			in:   `driver=s3,prefix="uploads,v2",secret="a=b"`,
			want: map[string]any{
				"driver": "s3",
				"prefix": "uploads,v2",
				"secret": "a=b",
			},
		},
		{
			name: "escaped quotes inside double quotes",
			in:   `note="he said \"hi\""`,
			want: map[string]any{"note": `he said "hi"`},
		},
		{
			name: "opposite quotes avoid escaping",
			in:   `note='he said "hi"',path="it's fine"`,
			want: map[string]any{
				"note": `he said "hi"`,
				"path": "it's fine",
			},
		},
		{
			name: "escaped single quote",
			in:   `note='it\'s'`,
			want: map[string]any{"note": "it's"},
		},
		{
			name: "escaped backslash",
			in:   `path="C:\\temp"`,
			want: map[string]any{"path": `C:\temp`},
		},
		{
			name: "bare backslash is literal",
			in:   `path=C:\temp`,
			want: map[string]any{"path": `C:\temp`},
		},
		{
			name: "empty value is allowed",
			in:   "driver=s3,endpoint=,region=us-east-1",
			want: map[string]any{
				"driver":   "s3",
				"endpoint": "",
				"region":   "us-east-1",
			},
		},
		{
			name: "quoted values stay strings",
			in:   `driver=s3,force_path_style="true",bucket="123",empty=""`,
			want: map[string]any{
				"driver":           "s3",
				"force_path_style": "true",
				"bucket":           "123",
				"empty":            "",
			},
		},
		{
			name: "bare null and numeric-looking strings",
			in:   "driver=db,chunk_size=1048576,max_file_size=10MB,unused=null",
			want: map[string]any{
				"driver":        "db",
				"chunk_size":    "1048576",
				"max_file_size": "10MB",
				"unused":        nil,
			},
		},
		{
			name: "whitespace around keys and values",
			in:   ` driver = s3 , prefix = "a,b" `,
			want: map[string]any{
				"driver": "s3",
				"prefix": "a,b",
			},
		},
		{
			name: "trailing comma",
			in:   "driver=s3,bucket=ez,",
			want: map[string]any{
				"driver": "s3",
				"bucket": "ez",
			},
		},
		{name: "unterminated double quote", in: `prefix="abc`, wantErr: true},
		{name: "unterminated single quote", in: `prefix='abc`, wantErr: true},
		{name: "unterminated escape", in: `prefix="abc\`, wantErr: true},
		{name: "garbage after quoted value", in: `prefix="a"b`, wantErr: true},
		{name: "missing equals", in: "driver", wantErr: true},
		{name: "empty key", in: "=s3", wantErr: true},
		{name: "key contains quote", in: `dr"iver=s3`, wantErr: true},
		{name: "empty string", in: "", wantErr: true},
	} {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			got, err := parseStorageConfig(tc.in)
			if tc.wantErr {
				require.Error(t, err)
				return
			}
			require.NoError(t, err)
			assert.Equal(t, tc.want, got)
		})
	}
}
