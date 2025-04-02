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
