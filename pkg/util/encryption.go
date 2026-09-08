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
	"fmt"
	"os"
	"strings"
	"unicode/utf8"

	"github.com/sven-victor/ez-utils/safe"
)

// CiphertextPrefix is the envelope used by ez-utils/safe for encrypted strings.
const CiphertextPrefix = "{CRYPT}"

// EncryptRotator is implemented by a model that wants to replace the default
// field walker during encrypt-key rotation. When present, default scanning is
// skipped. An empty method body skips the row without rewriting anything.
type EncryptRotator interface {
	RotateEncryption(oldKey, newKey string) (changed bool, err error)
}

// IsEncrypted reports whether s is a safe ciphertext envelope.
func IsEncrypted(s string) bool {
	return strings.HasPrefix(s, CiphertextPrefix)
}

// ValidEncryptKeyLength reports whether key length is accepted by ez-utils/safe.
func ValidEncryptKeyLength(key string) bool {
	switch len(key) {
	case 8, 16, 24, 32:
		return true
	default:
		return false
	}
}

// EncryptString encrypts a string using the global encryption key
func EncryptString(plaintext string) string {
	if plaintext == "" {
		return ""
	}
	return safe.NewEncryptedString(plaintext, os.Getenv(safe.SecretEnvName)).String()
}

// DecryptString decrypts a string using the global encryption key
func DecryptString(ciphertext string) (string, error) {
	if ciphertext == "" {
		return "", nil
	}

	encryptedString := safe.NewEncryptedString(ciphertext, os.Getenv(safe.SecretEnvName))
	return encryptedString.UnsafeString()
}

// ReencryptCiphertext decrypts ct with oldKey and encrypts the plaintext with newKey.
// Non-ciphertext input is returned unchanged. Decryption that yields invalid UTF-8
// is treated as a wrong-key (or corrupt data) failure so a rotate run can abort.
func ReencryptCiphertext(ct, oldKey, newKey string) (string, error) {
	if ct == "" || !IsEncrypted(ct) {
		return ct, nil
	}
	if !ValidEncryptKeyLength(oldKey) {
		return "", fmt.Errorf("invalid old encrypt key length: %d, must be 8,16,24 or 32", len(oldKey))
	}
	if !ValidEncryptKeyLength(newKey) {
		return "", fmt.Errorf("invalid new encrypt key length: %d, must be 8,16,24 or 32", len(newKey))
	}

	plain, err := safe.NewEncryptedString(ct, oldKey).UnsafeString()
	if err != nil {
		return "", fmt.Errorf("failed to decrypt ciphertext: %w", err)
	}
	if !utf8.ValidString(plain) {
		return "", fmt.Errorf("decrypted plaintext is not valid UTF-8; wrong old encrypt key or corrupted data")
	}

	newCT := safe.NewEncryptedString(plain, newKey).String()
	if !IsEncrypted(newCT) {
		return "", fmt.Errorf("failed to encrypt plaintext with the new key")
	}
	roundTrip, err := safe.NewEncryptedString(newCT, newKey).UnsafeString()
	if err != nil {
		return "", fmt.Errorf("failed to verify ciphertext with the new key: %w", err)
	}
	if roundTrip != plain {
		return "", fmt.Errorf("new-key round trip did not match the original plaintext")
	}
	return newCT, nil
}
