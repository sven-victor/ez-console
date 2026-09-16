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
	"sync"
	"time"

	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/model"
)

const (
	PathLogin   = "/api/authorization/auth/login"
	PathAIChat  = "/api/ai/chat/sessions/:sessionId"
	PathInboxSSE = "/api/inbox/stream"
	PathHealth  = "/api/system/health"
)

// SkipPath reports whether the matched route should bypass rate limiting.
func SkipPath(method, path string) bool {
	return strings.ToUpper(method) == "GET" && path == PathHealth
}

func BuiltinRules() []CompiledRule {
	return []CompiledRule{
		mustRule(model.RateLimitSubjectAnonymous, "", "", "", 20, "1m", 10, 0, "", true, model.RateLimitSourceBuiltin),
		mustRule(model.RateLimitSubjectUser, "", "", "", 120, "1m", 40, 20000, "1d", true, model.RateLimitSourceBuiltin),
		mustRule(model.RateLimitSubjectServiceAccount, "", "", "", 300, "1m", 80, 100000, "1d", true, model.RateLimitSourceBuiltin),
		mustRule(model.RateLimitSubjectAnonymous, "", "POST", PathLogin, 5, "1m", 5, 0, "", true, model.RateLimitSourceBuiltin),
		mustRule(model.RateLimitSubjectUser, "", "POST", PathAIChat, 10, "1m", 5, 0, "", true, model.RateLimitSourceBuiltin),
		mustRule(model.RateLimitSubjectServiceAccount, "", "POST", PathAIChat, 30, "1m", 10, 0, "", true, model.RateLimitSourceBuiltin),
		mustRule(model.RateLimitSubjectUser, "", "GET", PathInboxSSE, 10, "1m", 10, 0, "", true, model.RateLimitSourceBuiltin),
		mustRule(model.RateLimitSubjectServiceAccount, "", "GET", PathInboxSSE, 10, "1m", 10, 0, "", true, model.RateLimitSourceBuiltin),
	}
}

func mustRule(st model.RateLimitSubjectType, sid, method, path string, rate int, period string, burst, quota int, quotaPeriod string, enabled bool, source model.RateLimitSource) CompiledRule {
	lim, err := LimitFromRule(rate, period, burst, quota, quotaPeriod)
	if err != nil {
		lim = Limit{Rate: rate, Period: time.Minute, Burst: burst, Quota: quota, QuotaPeriod: 24 * time.Hour}.Normalized()
	}
	return CompiledRule{
		SubjectType: st,
		SubjectID:   sid,
		Method:      strings.ToUpper(method),
		Path:        path,
		Limit:       lim,
		Enabled:     enabled,
		Source:      source,
	}
}

var (
	codeMu    sync.Mutex
	codeRules []CompiledRule
)

// RegisterCodeRule adds a code-layer extra (or shared) bucket. Same match key replaces the previous code rule.
func RegisterCodeRule(subjectType model.RateLimitSubjectType, subjectID, method, path string, lim Limit) {
	rule := CompiledRule{
		SubjectType: subjectType,
		SubjectID:   subjectID,
		Method:      strings.ToUpper(method),
		Path:        path,
		Limit:       lim.Normalized(),
		Enabled:     true,
		Source:      model.RateLimitSourceCode,
	}
	key := rule.MatchKey()
	codeMu.Lock()
	defer codeMu.Unlock()
	for i, existing := range codeRules {
		if existing.MatchKey() == key {
			codeRules[i] = rule
			return
		}
	}
	codeRules = append(codeRules, rule)
}

func CodeRules() []CompiledRule {
	codeMu.Lock()
	defer codeMu.Unlock()
	out := make([]CompiledRule, len(codeRules))
	copy(out, codeRules)
	return out
}

func ResetCodeRulesForTest() {
	codeMu.Lock()
	codeRules = nil
	codeMu.Unlock()
}

func rulesFromYAML(policies []config.RateLimitPolicyConfig) []CompiledRule {
	out := make([]CompiledRule, 0, len(policies))
	for _, p := range policies {
		if p.Rate <= 0 && p.Quota <= 0 {
			continue
		}
		lim, err := LimitFromRule(p.Rate, p.Period, p.Burst, p.Quota, p.QuotaPeriod)
		if err != nil {
			continue
		}
		enabled := true
		if p.Enabled != nil {
			enabled = *p.Enabled
		}
		out = append(out, CompiledRule{
			SubjectType: model.RateLimitSubjectType(p.SubjectType),
			SubjectID:   p.SubjectID,
			Method:      strings.ToUpper(p.Method),
			Path:        p.Path,
			Limit:       lim,
			Enabled:     enabled,
			Source:      model.RateLimitSourceYAML,
		})
	}
	return out
}

func rulesFromDB(rows []model.RateLimitRule) []CompiledRule {
	out := make([]CompiledRule, 0, len(rows))
	for _, r := range rows {
		lim, err := LimitFromModel(r)
		if err != nil {
			continue
		}
		out = append(out, CompiledRule{
			SubjectType: r.SubjectType,
			SubjectID:   r.SubjectID,
			Method:      strings.ToUpper(r.Method),
			Path:        r.Path,
			Limit:       lim,
			Enabled:     r.Enabled,
			Source:      model.RateLimitSourceDB,
			ResourceID:  r.ResourceID,
		})
	}
	return out
}

func overlay(dst map[string]CompiledRule, src []CompiledRule) {
	for _, r := range src {
		dst[r.MatchKey()] = r
	}
}

// Compile merges builtin < yaml < code < db. Same match key: later wins.
func Compile(yamlPolicies []config.RateLimitPolicyConfig, dbRows []model.RateLimitRule) *RuleSet {
	merged := make(map[string]CompiledRule)
	overlay(merged, BuiltinRules())
	overlay(merged, rulesFromYAML(yamlPolicies))
	overlay(merged, CodeRules())
	overlay(merged, rulesFromDB(dbRows))
	return &RuleSet{rules: merged}
}
