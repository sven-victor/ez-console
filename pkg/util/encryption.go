package util

import (
	"os"

	"github.com/sven-victor/ez-utils/safe"
)

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
