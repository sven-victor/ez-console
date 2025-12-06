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
