package util

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strings"
)

// GenerateAvatar generates a default avatar URL based on the username.
func GenerateAvatar(username string) string {
	// Use Gravatar as the default avatar service.
	// If Gravatar doesn't have a matching avatar, it will use a default random avatar.
	email := strings.ToLower(strings.TrimSpace(username))
	hash := md5.Sum([]byte(email))
	hashString := hex.EncodeToString(hash[:])

	// Use Gravatar's default random avatar.
	return fmt.Sprintf("https://www.gravatar.com/avatar/%s?d=identicon&s=200", hashString)
}
