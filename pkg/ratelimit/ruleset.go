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

// CompiledRule is a normalized policy used on the hot path.
type CompiledRule struct {
	SubjectType model.RateLimitSubjectType
	SubjectID   string
	Method      string
	Path        string
	Limit       Limit
	Enabled     bool
	Source      model.RateLimitSource
	ResourceID  string
}

func (r CompiledRule) MatchKey() string {
	return string(r.SubjectType) + "\x00" + r.SubjectID + "\x00" + strings.ToUpper(r.Method) + "\x00" + r.Path
}

func (r CompiledRule) ToBucket() model.RateLimitBucket {
	return r.Limit.ToBucket(string(r.Source), r.Enabled)
}

func matchKey(st model.RateLimitSubjectType, sid, method, path string) string {
	return string(st) + "\x00" + sid + "\x00" + strings.ToUpper(method) + "\x00" + path
}

// RuleSet is the compiled policy snapshot.
type RuleSet struct {
	rules map[string]CompiledRule
}

func (rs *RuleSet) Shared(subjectType model.RateLimitSubjectType, subjectID string) (CompiledRule, bool) {
	if rs == nil {
		return CompiledRule{}, false
	}
	if subjectID != "" {
		if r, ok := rs.lookup(subjectType, subjectID, "", ""); ok {
			return r, true
		}
	}
	return rs.lookup(subjectType, "", "", "")
}

func (rs *RuleSet) Route(subjectType model.RateLimitSubjectType, subjectID, method, path string) (CompiledRule, bool) {
	if rs == nil || path == "" {
		return CompiledRule{}, false
	}
	method = strings.ToUpper(method)
	if subjectID != "" {
		if r, ok := rs.lookup(subjectType, subjectID, method, path); ok {
			return r, true
		}
		if r, ok := rs.lookup(subjectType, subjectID, "", path); ok {
			return r, true
		}
	}
	if r, ok := rs.lookup(subjectType, "", method, path); ok {
		return r, true
	}
	return rs.lookup(subjectType, "", "", path)
}

func (rs *RuleSet) lookup(st model.RateLimitSubjectType, sid, method, path string) (CompiledRule, bool) {
	r, ok := rs.rules[matchKey(st, sid, method, path)]
	if !ok || !r.Enabled {
		return CompiledRule{}, false
	}
	return r, true
}

func (rs *RuleSet) Get(st model.RateLimitSubjectType, sid, method, path string) (CompiledRule, bool) {
	if rs == nil {
		return CompiledRule{}, false
	}
	r, ok := rs.rules[matchKey(st, sid, strings.ToUpper(method), path)]
	return r, ok
}

func (rs *RuleSet) All() []CompiledRule {
	if rs == nil {
		return nil
	}
	out := make([]CompiledRule, 0, len(rs.rules))
	for _, r := range rs.rules {
		out = append(out, r)
	}
	return out
}
