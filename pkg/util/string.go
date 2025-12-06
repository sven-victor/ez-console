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
	"unicode"
)

func ToSnakeCase(s string) string {
	// Replace spaces and hyphens with underscores
	s = strings.NewReplacer(" ", "_", "-", "_").Replace(s)

	var result strings.Builder
	result.Grow(len(s) + 5) // Allocate a bit extra for potential underscores

	for i, r := range s {
		// If it's the first character, just convert to lowercase
		if i == 0 {
			result.WriteRune(unicode.ToLower(r))
			continue
		}

		// If current character is uppercase
		if unicode.IsUpper(r) {
			// Add underscore if:
			// 1. Previous character is lowercase, or
			// 2. Previous character is uppercase and next character is lowercase
			// This handles cases like "ID" in "UserID" correctly
			if unicode.IsLower(rune(s[i-1])) ||
				(i+1 < len(s) && unicode.IsUpper(rune(s[i-1])) && unicode.IsLower(rune(s[i+1]))) {
				result.WriteRune('_')
			}
			result.WriteRune(unicode.ToLower(r))
		} else {
			result.WriteRune(r)
		}
	}

	return result.String()
}
