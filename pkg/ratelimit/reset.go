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

package ratelimit

import (
	"strings"

	"github.com/sven-victor/ez-console/pkg/model"
)

var routeMethodMarkers = []string{
	":GET:", ":POST:", ":PUT:", ":PATCH:", ":DELETE:", ":HEAD:", ":OPTIONS:",
}

// ResetSpec selects which store keys to delete.
type ResetSpec struct {
	All         bool
	SubjectType model.RateLimitSubjectType
	SubjectID   string
	Method      string
	Path        string
	SharedOnly  bool
	RouteOnly   bool
}

func (s ResetSpec) Match(key string) bool {
	if s.All {
		return true
	}
	if s.SubjectType == "" {
		return false
	}
	ident := Identity{Type: s.SubjectType, ID: s.SubjectID}
	if s.SubjectID != "" {
		shared := ident.SharedKey()
		if s.RouteOnly {
			return key == ident.RouteKey(s.Method, s.Path)
		}
		if s.SharedOnly {
			return key == shared
		}
		return key == shared || strings.HasPrefix(key, shared+":")
	}
	prefix := string(s.SubjectType) + ":"
	if !strings.HasPrefix(key, prefix) {
		return false
	}
	if s.RouteOnly {
		if s.Method == "" || s.Path == "" {
			return false
		}
		return strings.HasSuffix(key, ":"+strings.ToUpper(s.Method)+":"+s.Path)
	}
	if s.SharedOnly {
		return !isRouteKey(key)
	}
	return true
}

func isRouteKey(key string) bool {
	for _, marker := range routeMethodMarkers {
		if strings.Contains(key, marker) {
			return true
		}
	}
	return false
}
