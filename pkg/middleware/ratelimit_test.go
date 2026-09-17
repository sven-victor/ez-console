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
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/ratelimit"
	"github.com/stretchr/testify/require"
)

func setupRateLimitEngine(t *testing.T, lim *ratelimit.Limiter) *gin.Engine {
	t.Helper()
	gin.SetMode(gin.TestMode)
	RegisterRateLimiter(lim)
	r := gin.New()
	api := r.Group("/api")
	api.Use(func(c *gin.Context) {
		if uid := c.GetHeader("X-Test-User"); uid != "" {
			c.Set("user_id", uid)
		}
		if sa := c.GetHeader("X-Test-SA"); sa != "" {
			c.Set("service_account_id", sa)
		}
		c.Next()
	})
	api.Use(RateLimitMiddleware())
	api.GET("/system/health", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"ok": true}) })
	api.GET("/ping", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"ok": true}) })
	return r
}

func doReq(r http.Handler, method, path string, headers map[string]string) *httptest.ResponseRecorder {
	req := httptest.NewRequest(method, path, nil)
	for k, v := range headers {
		req.Header.Set(k, v)
	}
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func TestRateLimitMiddlewareSkipHealth(t *testing.T) {
	enabled := true
	lim := ratelimit.NewLimiter(ratelimit.NewMemoryStore(), config.RateLimitConfig{Enabled: &enabled}, nil, func(context.Context) bool { return true })
	r := setupRateLimitEngine(t, lim)
	for i := 0; i < 50; i++ {
		w := doReq(r, http.MethodGet, "/api/system/health", nil)
		require.Equal(t, http.StatusOK, w.Code)
	}
}

func TestRateLimitMiddlewareAnonymousIP(t *testing.T) {
	ratelimit.ResetCodeRulesForTest()
	t.Cleanup(ratelimit.ResetCodeRulesForTest)
	enabled := true
	lim := ratelimit.NewLimiter(ratelimit.NewMemoryStore(), config.RateLimitConfig{Enabled: &enabled}, func(context.Context) ([]model.RateLimitRule, error) {
		return []model.RateLimitRule{{
			SubjectType: model.RateLimitSubjectAnonymous,
			Rate:        2, Period: "1m", Burst: 2, Enabled: true, Source: model.RateLimitSourceDB,
		}}, nil
	}, func(context.Context) bool { return true })
	r := setupRateLimitEngine(t, lim)

	require.Equal(t, http.StatusOK, doReq(r, http.MethodGet, "/api/ping", nil).Code)
	require.Equal(t, http.StatusOK, doReq(r, http.MethodGet, "/api/ping", nil).Code)
	w := doReq(r, http.MethodGet, "/api/ping", nil)
	require.Equal(t, http.StatusTooManyRequests, w.Code)
	var body struct {
		Code string `json:"code"`
	}
	require.NoError(t, json.Unmarshal(w.Body.Bytes(), &body))
	require.Equal(t, "E4291", body.Code)
	// Contract: 429 bodies are E4291/E4292 only. Retry/limit details go to logs, not headers.
	require.Empty(t, w.Header().Get("Retry-After"))
	require.Empty(t, w.Header().Get("RateLimit-Limit"))
	require.Empty(t, w.Header().Get("RateLimit-Remaining"))
	require.Empty(t, w.Header().Get("RateLimit-Reset"))
}

func TestRateLimitMiddlewareUserVsSA(t *testing.T) {
	ratelimit.ResetCodeRulesForTest()
	t.Cleanup(ratelimit.ResetCodeRulesForTest)
	enabled := true
	lim := ratelimit.NewLimiter(ratelimit.NewMemoryStore(), config.RateLimitConfig{Enabled: &enabled}, func(context.Context) ([]model.RateLimitRule, error) {
		return []model.RateLimitRule{
			{SubjectType: model.RateLimitSubjectUser, Rate: 1, Period: "1m", Burst: 1, Enabled: true, Source: model.RateLimitSourceDB},
			{SubjectType: model.RateLimitSubjectServiceAccount, Rate: 1, Period: "1m", Burst: 1, Enabled: true, Source: model.RateLimitSourceDB},
		}, nil
	}, func(context.Context) bool { return true })
	r := setupRateLimitEngine(t, lim)

	require.Equal(t, http.StatusOK, doReq(r, http.MethodGet, "/api/ping", map[string]string{"X-Test-User": "u1"}).Code)
	require.Equal(t, http.StatusTooManyRequests, doReq(r, http.MethodGet, "/api/ping", map[string]string{"X-Test-User": "u1"}).Code)
	require.Equal(t, http.StatusOK, doReq(r, http.MethodGet, "/api/ping", map[string]string{"X-Test-SA": "sa1"}).Code)
}
