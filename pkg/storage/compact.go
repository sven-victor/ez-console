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

package storage

import (
	"fmt"
	"strings"
)

// ParseCompactConfig parses a compact CLI storage config string of the form
// `key=value,key=value`. Delimiters are only significant outside quotes:
//
//	pair   := key '=' value
//	value  := quoted | bare
//	quoted := '"' { '\' any | not('"') } '"' | "'" { '\' any | not("'") } "'"
//	bare   := until the next unquoted comma (may contain '=')
//
// Quoted values are always strings (including "true" / "123"). Bare true/false
// become bool, bare null becomes nil, everything else stays a string. Empty
// values (endpoint=) are allowed; unterminated quotes and trailing garbage
// after a quoted value are errors.
func ParseCompactConfig(data string) (map[string]any, error) {
	result := make(map[string]any)
	i, n := 0, len(data)
	skipSpace := func() {
		for i < n {
			switch data[i] {
			case ' ', '\t', '\n', '\r':
				i++
			default:
				return
			}
		}
	}
	for i < n {
		skipSpace()
		if i >= n {
			break
		}
		if data[i] == ',' {
			i++
			continue
		}

		keyStart := i
		for i < n && data[i] != '=' && data[i] != ',' && data[i] != '"' && data[i] != '\'' {
			i++
		}
		key := strings.TrimSpace(data[keyStart:i])
		if key == "" || i >= n || data[i] != '=' {
			return nil, fmt.Errorf("invalid storage config: %s", data)
		}
		i++ // skip '='
		skipSpace()

		var value any
		if i < n && (data[i] == '"' || data[i] == '\'') {
			quoted, consumed, err := parseQuotedStorageValue(data[i:])
			if err != nil {
				return nil, fmt.Errorf("invalid storage config: %s: %w", data, err)
			}
			value = quoted
			i += consumed
			skipSpace()
			if i < n && data[i] != ',' {
				return nil, fmt.Errorf("invalid storage config: %s", data)
			}
		} else {
			valStart := i
			for i < n && data[i] != ',' {
				i++
			}
			value = coerceBareStorageValue(strings.TrimSpace(data[valStart:i]))
		}

		result[key] = value
		if i < n && data[i] == ',' {
			i++
		}
	}
	if len(result) == 0 {
		return nil, fmt.Errorf("invalid storage config: %s", data)
	}
	return result, nil
}

// parseQuotedStorageValue scans a single- or double-quoted string starting at
// s[0]. A backslash escapes the next character (so \" and \' work inside the
// matching quotes; \\ is a literal backslash). Other \x sequences are kept as
// the literal character x. Returns the unquoted value and the number of bytes
// consumed, including the surrounding quotes.
func parseQuotedStorageValue(s string) (string, int, error) {
	if s == "" {
		return "", 0, fmt.Errorf("unterminated quoted string")
	}
	quote := s[0]
	var b strings.Builder
	escaped := false
	for i := 1; i < len(s); i++ {
		c := s[i]
		if escaped {
			b.WriteByte(c)
			escaped = false
			continue
		}
		if c == '\\' {
			escaped = true
			continue
		}
		if c == quote {
			return b.String(), i + 1, nil
		}
		b.WriteByte(c)
	}
	return "", 0, fmt.Errorf("unterminated quoted string")
}

func coerceBareStorageValue(raw string) any {
	switch raw {
	case "true":
		return true
	case "false":
		return false
	case "null":
		return nil
	default:
		return raw
	}
}
