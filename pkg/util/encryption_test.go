// Copyright 2026 Sven Victor
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
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/sven-victor/ez-utils/safe"
)

const (
	testOldKey = "1234567890123456"
	testNewKey = "abcdefghijklmnop"
)

func TestIsEncrypted(t *testing.T) {
	require.True(t, IsEncrypted("{CRYPT}$2$abc"))
	require.False(t, IsEncrypted(""))
	require.False(t, IsEncrypted("plaintext"))
}

func TestReencryptCiphertextRoundTrip(t *testing.T) {
	plain := "smtp-password-value"
	ct := safe.NewEncryptedString(plain, testOldKey).String()
	require.True(t, IsEncrypted(ct))

	newCT, err := ReencryptCiphertext(ct, testOldKey, testNewKey)
	require.NoError(t, err)
	require.True(t, IsEncrypted(newCT))
	require.NotEqual(t, ct, newCT)

	got, err := safe.NewEncryptedString(newCT, testNewKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, plain, got)
}

func TestReencryptCiphertextWrongKeyLength(t *testing.T) {
	ct := safe.NewEncryptedString("hello", testOldKey).String()
	_, err := ReencryptCiphertext(ct, testOldKey, "short")
	require.Error(t, err)
	_, err = ReencryptCiphertext(ct, "12345678", testNewKey)
	require.Error(t, err)
}

func TestRotateEncryptedFieldsSafeString(t *testing.T) {
	type row struct {
		Secret *safe.String
	}
	r := &row{Secret: safe.NewEncryptedString("totp-secret", testOldKey)}
	changed, err := RotateEncryptedFields(r, testOldKey, testNewKey)
	require.NoError(t, err)
	require.True(t, changed)
	got, err := safe.NewEncryptedString(r.Secret.String(), testNewKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, "totp-secret", got)
}

func TestRotateEncryptedFieldsInlineAndSkip(t *testing.T) {
	type row struct {
		Keep     string `encrypt:"-"`
		Inline   string `encrypt:"inline"`
		Plain    string `encrypt:"inline"`
		Password string
	}
	skipCT := safe.NewEncryptedString("skip-me", testOldKey).String()
	r := &row{
		Keep:     skipCT,
		Inline:   safe.NewEncryptedString("access-key", testOldKey).String(),
		Plain:    "not-encrypted",
		Password: "bcrypt-hash",
	}
	changed, err := RotateEncryptedFields(r, testOldKey, testNewKey)
	require.NoError(t, err)
	require.True(t, changed)
	require.Equal(t, skipCT, r.Keep)
	require.Equal(t, "bcrypt-hash", r.Password)
	require.Equal(t, "not-encrypted", r.Plain)
	got, err := safe.NewEncryptedString(r.Inline, testNewKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, "access-key", got)
}

func TestRotateEncryptedFieldsJSON(t *testing.T) {
	type row struct {
		Config map[string]interface{} `encrypt:"json"`
	}
	r := &row{Config: map[string]interface{}{
		"api_key":  safe.NewEncryptedString("sk-test", testOldKey).String(),
		"model_id": "gpt-4",
		"nested": map[string]interface{}{
			"token": safe.NewEncryptedString("tok", testOldKey).String(),
		},
	}}
	changed, err := RotateEncryptedFields(r, testOldKey, testNewKey)
	require.NoError(t, err)
	require.True(t, changed)
	require.Equal(t, "gpt-4", r.Config["model_id"])
	got, err := safe.NewEncryptedString(r.Config["api_key"].(string), testNewKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, "sk-test", got)
	nested := r.Config["nested"].(map[string]interface{})
	got, err = safe.NewEncryptedString(nested["token"].(string), testNewKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, "tok", got)
}

func TestRotateEncryptedFieldsEmbed(t *testing.T) {
	type Inner struct {
		Secret *safe.String
	}
	type row struct {
		Inner
		Name string
	}
	r := &row{Inner: Inner{Secret: safe.NewEncryptedString("embedded", testOldKey)}, Name: "x"}
	changed, err := RotateEncryptedFields(r, testOldKey, testNewKey)
	require.NoError(t, err)
	require.True(t, changed)
	got, err := safe.NewEncryptedString(r.Secret.String(), testNewKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, "embedded", got)
}

type skipRotator struct {
	Secret *safe.String
}

func (s *skipRotator) RotateEncryption(_, _ string) (bool, error) {
	return false, nil
}

func TestRotateEncryptedFieldsRotatorSkip(t *testing.T) {
	r := &skipRotator{Secret: safe.NewEncryptedString("leave", testOldKey)}
	original := r.Secret.String()
	changed, err := RotateEncryptedFields(r, testOldKey, testNewKey)
	require.NoError(t, err)
	require.False(t, changed)
	require.Equal(t, original, r.Secret.String())
}

func TestStructHasEncryptableFields(t *testing.T) {
	type tagged struct {
		Value string `encrypt:"inline"`
	}
	type plain struct {
		Name string
	}
	require.True(t, StructHasEncryptableFields(&tagged{}))
	require.False(t, StructHasEncryptableFields(&plain{}))
	require.True(t, StructHasEncryptableFields(&skipRotator{}))
}
