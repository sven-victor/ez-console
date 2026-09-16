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

package middleware

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/ratelimit"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
)

var rateLimiter *ratelimit.Limiter

func RegisterRateLimiter(l *ratelimit.Limiter) {
	rateLimiter = l
}

func GetRateLimiter() *ratelimit.Limiter {
	return rateLimiter
}

// RateLimitRoute registers a code-layer extra bucket for method+path and
// returns a no-op handler so it can sit in a Gin route chain.
func RateLimitRoute(method, path string, lim ratelimit.Limit, subjectTypes ...model.RateLimitSubjectType) gin.HandlerFunc {
	if len(subjectTypes) == 0 {
		subjectTypes = []model.RateLimitSubjectType{
			model.RateLimitSubjectAnonymous,
			model.RateLimitSubjectUser,
			model.RateLimitSubjectServiceAccount,
		}
	}
	for _, st := range subjectTypes {
		ratelimit.RegisterCodeRule(st, "", method, path, lim)
	}
	if rateLimiter != nil {
		rateLimiter.Invalidate()
	}
	return func(c *gin.Context) { c.Next() }
}

// RateLimitMiddleware enforces compiled rate-limit rules after authentication.
func RateLimitMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		l := rateLimiter
		if l == nil || !l.Enabled(c) {
			c.Next()
			return
		}
		method := c.Request.Method
		path := c.FullPath()
		if path == "" {
			path = c.Request.URL.Path
		}
		if ratelimit.SkipPath(method, path) {
			c.Next()
			return
		}
		ident := identityFromContext(c)
		dec, err := l.Allow(c.Request.Context(), ident, method, path)
		if err != nil {
			util.RespondWithError(c, util.NewErrorMessage("E5001", "Rate limiter unavailable", err))
			c.Abort()
			return
		}
		if !dec.Allowed {
			logRateLimited(c, ident, method, path, dec)
			msg := "Rate limit exceeded"
			code := "E4291"
			if dec.Result.Kind == ratelimit.KindQuota {
				msg = "Quota exceeded"
				code = "E4292"
			}
			util.RespondWithError(c, util.NewErrorMessage(code, msg))
			c.Abort()
			return
		}
		c.Next()
	}
}

func identityFromContext(c *gin.Context) ratelimit.Identity {
	if saID, ok := c.Get("service_account_id"); ok {
		if id, ok := saID.(string); ok && id != "" {
			return ratelimit.Identity{Type: model.RateLimitSubjectServiceAccount, ID: id}
		}
	}
	if userID, ok := c.Get("user_id"); ok {
		if id, ok := userID.(string); ok && id != "" {
			return ratelimit.Identity{Type: model.RateLimitSubjectUser, ID: id}
		}
	}
	return ratelimit.Identity{Type: model.RateLimitSubjectAnonymous, ID: c.ClientIP()}
}

func logRateLimited(c *gin.Context, ident ratelimit.Identity, method, path string, dec ratelimit.Decision) {
	retrySec := int(dec.Result.RetryAfter.Round(time.Second) / time.Second)
	if retrySec < 1 {
		retrySec = 1
	}
	kv := []any{
		"msg", "rate limit exceeded",
		"kind", dec.Result.Kind,
		"bucket", dec.Bucket,
		"subject_type", ident.Type,
		"subject_id", ident.ID,
		"method", method,
		"path", path,
	}
	var rule *ratelimit.CompiledRule
	switch dec.Bucket {
	case ratelimit.BucketRoute:
		rule = dec.Route
	default:
		rule = dec.Shared
	}
	if rule != nil {
		kv = append(kv, "source", string(rule.Source))
		if rule.Source == model.RateLimitSourceDB && rule.ResourceID != "" {
			kv = append(kv, "rule_id", rule.ResourceID)
		}
		lim := rule.Limit.Normalized()
		kv = append(kv,
			"rate", lim.Rate,
			"period", ratelimit.FormatPeriod(lim.Period),
			"burst", lim.Burst,
		)
		if lim.Quota > 0 {
			kv = append(kv,
				"quota", lim.Quota,
				"quota_period", ratelimit.FormatPeriod(lim.QuotaPeriod),
			)
		}
	}
	kv = append(kv, "retry_after", retrySec)
	_ = level.Warn(log.GetContextLogger(c)).Log(kv...)
}
