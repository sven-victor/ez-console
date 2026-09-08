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
	"strings"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/sven-victor/ez-utils/safe"
)

func TestReencryptYAMLDocument(t *testing.T) {
	oldCT := safe.NewEncryptedString("db-secret", testOldKey).String()
	doc := []byte("" +
		"global:\n" +
		"  encrypt-key: \"" + testOldKey + "\"\n" +
		"database:\n" +
		"  # keep this comment\n" +
		"  password: \"" + oldCT + "\"\n" +
		"  host: localhost\n")

	result, err := ReencryptYAMLDocument(doc, testOldKey, testNewKey, false, testNewKey)
	require.NoError(t, err)
	require.Equal(t, 1, result.Ciphertexts)
	require.Equal(t, 0, result.EncryptKeyWrites)
	require.Contains(t, string(result.Output), "encrypt-key:")
	require.Contains(t, string(result.Output), testOldKey)
	require.Contains(t, string(result.Output), "host: localhost")
	require.NotContains(t, string(result.Output), oldCT)

	// Extract the rewritten password scalar and decrypt with the new key.
	out := string(result.Output)
	idx := strings.Index(out, "{CRYPT}")
	require.GreaterOrEqual(t, idx, 0)
	end := idx
	for end < len(out) && out[end] != '\n' && out[end] != '"' {
		end++
	}
	newCT := strings.Trim(out[idx:end], "\"")
	got, err := safe.NewEncryptedString(newCT, testNewKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, "db-secret", got)
}

func TestReencryptYAMLWriteEncryptKey(t *testing.T) {
	doc := []byte("global:\n  encrypt-key: \"" + testOldKey + "\"\n")
	result, err := ReencryptYAMLDocument(doc, testOldKey, testNewKey, true, testNewKey)
	require.NoError(t, err)
	require.Equal(t, 1, result.EncryptKeyWrites)
	require.Contains(t, string(result.Output), testNewKey)
	require.NotContains(t, string(result.Output), testOldKey)
}
