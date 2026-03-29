// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package codegen

import (
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/sven-victor/ez-console/pkg/util"
)

// EntityNames holds derived symbols for code generation.
type EntityNames struct {
	Name     string // PascalCase, e.g. Product
	Plural   string // PascalCase plural for type/method names, e.g. Products
	Resource string // URL segment (snake_plural), e.g. products
	Lower    string // snake_case singular for table suffix, e.g. product
	Short    string // lowercase first rune for receivers, e.g. p
}

// DeriveEntityNames builds naming fields from a PascalCase entity name.
func DeriveEntityNames(pascal string) EntityNames {
	pascal = strings.TrimSpace(pascal)
	if pascal == "" {
		return EntityNames{}
	}
	return EntityNames{
		Name:     pascal,
		Plural:   pluralizePascal(pascal),
		Resource: util.ToSnakeCase(pluralizePascal(pascal)),
		Lower:    util.ToSnakeCase(pascal),
		Short:    receiverShort(pascal),
	}
}

func receiverShort(pascal string) string {
	r, _ := utf8.DecodeRuneInString(pascal)
	if r == utf8.RuneError {
		return strings.ToLower(pascal)
	}
	return string(unicode.ToLower(r))
}

func pluralizePascal(s string) string {
	s = strings.TrimSpace(s)
	if s == "" {
		return s
	}
	lower := strings.ToLower(s)
	switch lower {
	case "person":
		return "People"
	case "child":
		return "Children"
	case "mouse":
		return "Mice"
	case "goose":
		return "Geese"
	}
	last, _ := utf8.DecodeLastRuneInString(s)
	rest := s[:len(s)-utf8.RuneLen(last)]
	switch unicode.ToLower(last) {
	case 'y':
		if len(rest) > 0 && isConsonantBeforeY(rest) {
			return rest + "ies"
		}
		return s + "s"
	case 's', 'x', 'z':
		return s + "es"
	case 'h':
		if len(rest) > 0 {
			prev, _ := utf8.DecodeLastRuneInString(rest)
			if prev == 'c' || prev == 's' {
				return s + "es"
			}
		}
	}
	return s + "s"
}

func isConsonantBeforeY(rest string) bool {
	r, _ := utf8.DecodeLastRuneInString(rest)
	r = unicode.ToLower(r)
	switch r {
	case 'a', 'e', 'i', 'o', 'u':
		return false
	default:
		return true
	}
}
