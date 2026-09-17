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
	"context"
	"errors"
	"sync"
	"testing"
	"time"

	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/stretchr/testify/require"
)

func TestMemoryStoreBurstAndRefill(t *testing.T) {
	store := NewMemoryStore()
	lim := Limit{Rate: 2, Period: time.Second, Burst: 2}.Normalized()
	ctx := context.Background()

	r1, err := store.Allow(ctx, "u1", lim)
	require.NoError(t, err)
	require.True(t, r1.Allowed)
	r2, err := store.Allow(ctx, "u1", lim)
	require.NoError(t, err)
	require.True(t, r2.Allowed)
	r3, err := store.Allow(ctx, "u1", lim)
	require.NoError(t, err)
	require.False(t, r3.Allowed)
	require.Equal(t, KindRate, r3.Kind)
}

func TestMemoryStoreRefillAfterPeriod(t *testing.T) {
	store := NewMemoryStore()
	lim := Limit{Rate: 1, Period: 40 * time.Millisecond, Burst: 1}.Normalized()
	ctx := context.Background()
	r1, err := store.Allow(ctx, "w", lim)
	require.NoError(t, err)
	require.True(t, r1.Allowed)
	r2, err := store.Allow(ctx, "w", lim)
	require.NoError(t, err)
	require.False(t, r2.Allowed)
	time.Sleep(50 * time.Millisecond)
	r3, err := store.Allow(ctx, "w", lim)
	require.NoError(t, err)
	require.True(t, r3.Allowed)
}

func TestMemoryStoreIsolatesKeys(t *testing.T) {
	store := NewMemoryStore()
	lim := Limit{Rate: 1, Period: time.Minute, Burst: 1}.Normalized()
	ctx := context.Background()
	a, err := store.Allow(ctx, "a", lim)
	require.NoError(t, err)
	require.True(t, a.Allowed)
	b, err := store.Allow(ctx, "b", lim)
	require.NoError(t, err)
	require.True(t, b.Allowed)
	a2, err := store.Allow(ctx, "a", lim)
	require.NoError(t, err)
	require.False(t, a2.Allowed)
}

func TestMemoryStoreQuota(t *testing.T) {
	store := NewMemoryStore()
	lim := Limit{Rate: 100, Period: time.Second, Burst: 100, Quota: 2, QuotaPeriod: 24 * time.Hour}.Normalized()
	ctx := context.Background()
	r1, err := store.Allow(ctx, "q", lim)
	require.NoError(t, err)
	require.True(t, r1.Allowed)
	r2, err := store.Allow(ctx, "q", lim)
	require.NoError(t, err)
	require.True(t, r2.Allowed)
	r3, err := store.Allow(ctx, "q", lim)
	require.NoError(t, err)
	require.False(t, r3.Allowed)
	require.Equal(t, KindQuota, r3.Kind)
}

func TestMemoryStoreConcurrentFill(t *testing.T) {
	store := NewMemoryStore()
	lim := Limit{Rate: 50, Period: time.Second, Burst: 50}.Normalized()
	ctx := context.Background()
	var allowed int
	var mu sync.Mutex
	var wg sync.WaitGroup
	for i := 0; i < 80; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			res, err := store.Allow(ctx, "c", lim)
			require.NoError(t, err)
			if res.Allowed {
				mu.Lock()
				allowed++
				mu.Unlock()
			}
		}()
	}
	wg.Wait()
	require.Equal(t, 50, allowed)
}

func TestCompileOverlay(t *testing.T) {
	ResetCodeRulesForTest()
	t.Cleanup(ResetCodeRulesForTest)

	yamlPolicies := []config.RateLimitPolicyConfig{
		{SubjectType: "user", Rate: 10, Period: "1m", Burst: 10},
	}
	dbRows := []model.RateLimitRule{
		{SubjectType: model.RateLimitSubjectUser, Rate: 5, Period: "1m", Burst: 5, Enabled: true, Source: model.RateLimitSourceDB},
	}
	rs := Compile(yamlPolicies, dbRows)
	shared, ok := rs.Shared(model.RateLimitSubjectUser, "")
	require.True(t, ok)
	require.Equal(t, 5, shared.Limit.Rate)
	require.Equal(t, model.RateLimitSourceDB, shared.Source)

	anon, ok := rs.Shared(model.RateLimitSubjectAnonymous, "1.1.1.1")
	require.True(t, ok)
	require.Equal(t, 20, anon.Limit.Rate)
}

func TestSharedAndRouteAND(t *testing.T) {
	ResetCodeRulesForTest()
	t.Cleanup(ResetCodeRulesForTest)
	store := NewMemoryStore()
	lim := NewLimiter(store, config.RateLimitConfig{}, func(context.Context) ([]model.RateLimitRule, error) {
		return []model.RateLimitRule{
			{SubjectType: model.RateLimitSubjectUser, Rate: 5, Period: "1m", Burst: 5, Enabled: true, Source: model.RateLimitSourceDB},
			{SubjectType: model.RateLimitSubjectUser, Method: "POST", Path: PathAIChat, Rate: 1, Period: "1m", Burst: 1, Enabled: true, Source: model.RateLimitSourceDB},
		}, nil
	}, func(context.Context) bool { return true })

	ctx := context.Background()
	ident := Identity{Type: model.RateLimitSubjectUser, ID: "u1"}
	d1, err := lim.Allow(ctx, ident, "POST", PathAIChat)
	require.NoError(t, err)
	require.True(t, d1.Allowed)
	d2, err := lim.Allow(ctx, ident, "POST", PathAIChat)
	require.NoError(t, err)
	require.False(t, d2.Allowed)
	require.NotNil(t, d2.Route)
	require.Equal(t, BucketRoute, d2.Bucket)

	other, err := lim.Allow(ctx, ident, "GET", "/api/authorization/users")
	require.NoError(t, err)
	require.True(t, other.Allowed)
	require.Empty(t, other.Bucket)
}

func TestSharedBucketLabeledOnFail(t *testing.T) {
	ResetCodeRulesForTest()
	t.Cleanup(ResetCodeRulesForTest)
	store := NewMemoryStore()
	lim := NewLimiter(store, config.RateLimitConfig{}, func(context.Context) ([]model.RateLimitRule, error) {
		return []model.RateLimitRule{
			{Base: model.Base{ResourceID: "rule-shared"}, SubjectType: model.RateLimitSubjectUser, Rate: 1, Period: "1m", Burst: 1, Enabled: true, Source: model.RateLimitSourceDB},
		}, nil
	}, func(context.Context) bool { return true })

	ctx := context.Background()
	ident := Identity{Type: model.RateLimitSubjectUser, ID: "u1"}
	_, err := lim.Allow(ctx, ident, "GET", "/api/ping")
	require.NoError(t, err)
	d2, err := lim.Allow(ctx, ident, "GET", "/api/ping")
	require.NoError(t, err)
	require.False(t, d2.Allowed)
	require.Equal(t, BucketShared, d2.Bucket)
	require.Equal(t, KindRate, d2.Result.Kind)
	require.NotNil(t, d2.Shared)
	require.Equal(t, "rule-shared", d2.Shared.ResourceID)
}

func TestDisabledSubjectOverrideFallsThrough(t *testing.T) {
	rs := Compile(nil, []model.RateLimitRule{
		{SubjectType: model.RateLimitSubjectUser, Rate: 120, Period: "1m", Burst: 40, Enabled: true, Source: model.RateLimitSourceDB},
		{SubjectType: model.RateLimitSubjectUser, SubjectID: "u1", Rate: 1, Period: "1m", Burst: 1, Enabled: false, Source: model.RateLimitSourceDB},
	})
	shared, ok := rs.Shared(model.RateLimitSubjectUser, "u1")
	require.True(t, ok)
	require.Equal(t, 40, shared.Limit.Burst)
	require.Empty(t, shared.SubjectID)
}

func TestFailOpen(t *testing.T) {
	fail := &errStore{err: errors.New("redis down")}
	fo := true
	lim := NewLimiter(fail, config.RateLimitConfig{FailOpen: &fo}, func(context.Context) ([]model.RateLimitRule, error) {
		return nil, nil
	}, func(context.Context) bool { return true })
	d, err := lim.Allow(context.Background(), Identity{Type: model.RateLimitSubjectUser, ID: "u"}, "GET", "/api/x")
	require.NoError(t, err)
	require.True(t, d.Allowed)

	fo = false
	lim2 := NewLimiter(fail, config.RateLimitConfig{FailOpen: &fo}, func(context.Context) ([]model.RateLimitRule, error) {
		return nil, nil
	}, func(context.Context) bool { return true })
	_, err = lim2.Allow(context.Background(), Identity{Type: model.RateLimitSubjectUser, ID: "u"}, "GET", "/api/x")
	require.Error(t, err)
}

func TestSkipHealth(t *testing.T) {
	require.True(t, SkipPath("GET", PathHealth))
	require.False(t, SkipPath("POST", PathHealth))
}

type errStore struct{ err error }

func (s *errStore) Allow(context.Context, string, Limit) (Result, error) {
	return Result{}, s.err
}

func (s *errStore) Reset(context.Context, ResetSpec) (int, error) {
	return 0, s.err
}

func TestResetSpecMatch(t *testing.T) {
	user := Identity{Type: model.RateLimitSubjectUser, ID: "u1"}
	require.True(t, ResetSpec{All: true}.Match("anything"))
	require.True(t, ResetSpec{SubjectType: model.RateLimitSubjectUser, SubjectID: "u1"}.Match(user.SharedKey()))
	require.True(t, ResetSpec{SubjectType: model.RateLimitSubjectUser, SubjectID: "u1"}.Match(user.RouteKey("POST", PathAIChat)))
	require.False(t, ResetSpec{SubjectType: model.RateLimitSubjectUser, SubjectID: "u1"}.Match("user:u2"))
	require.True(t, ResetSpec{SubjectType: model.RateLimitSubjectUser, SharedOnly: true}.Match("user:u1"))
	require.False(t, ResetSpec{SubjectType: model.RateLimitSubjectUser, SharedOnly: true}.Match(user.RouteKey("POST", PathAIChat)))
	require.True(t, ResetSpec{
		SubjectType: model.RateLimitSubjectUser, RouteOnly: true, Method: "POST", Path: PathAIChat,
	}.Match(user.RouteKey("POST", PathAIChat)))
	require.False(t, ResetSpec{
		SubjectType: model.RateLimitSubjectUser, RouteOnly: true, Method: "POST", Path: PathAIChat,
	}.Match(user.SharedKey()))
	anon := Identity{Type: model.RateLimitSubjectAnonymous, ID: "2001:db8::1"}
	require.True(t, ResetSpec{SubjectType: model.RateLimitSubjectAnonymous, SubjectID: "2001:db8::1"}.Match(anon.SharedKey()))
	require.True(t, ResetSpec{SubjectType: model.RateLimitSubjectAnonymous, SubjectID: "2001:db8::1"}.Match(anon.RouteKey("GET", "/api/x")))
}

func TestMemoryStoreReset(t *testing.T) {
	store := NewMemoryStore()
	lim := Limit{Rate: 1, Period: time.Minute, Burst: 1, Quota: 1, QuotaPeriod: 24 * time.Hour}.Normalized()
	ctx := context.Background()
	u1 := Identity{Type: model.RateLimitSubjectUser, ID: "u1"}
	u2 := Identity{Type: model.RateLimitSubjectUser, ID: "u2"}
	_, err := store.Allow(ctx, u1.SharedKey(), lim)
	require.NoError(t, err)
	_, err = store.Allow(ctx, u2.SharedKey(), lim)
	require.NoError(t, err)
	blocked, err := store.Allow(ctx, u1.SharedKey(), lim)
	require.NoError(t, err)
	require.False(t, blocked.Allowed)

	n, err := store.Reset(ctx, ResetSpec{SubjectType: model.RateLimitSubjectUser, SubjectID: "u1"})
	require.NoError(t, err)
	require.Greater(t, n, 0)

	again, err := store.Allow(ctx, u1.SharedKey(), lim)
	require.NoError(t, err)
	require.True(t, again.Allowed)
	still, err := store.Allow(ctx, u2.SharedKey(), lim)
	require.NoError(t, err)
	require.False(t, still.Allowed)

	n, err = store.Reset(ctx, ResetSpec{All: true})
	require.NoError(t, err)
	require.Greater(t, n, 0)
	u2ok, err := store.Allow(ctx, u2.SharedKey(), lim)
	require.NoError(t, err)
	require.True(t, u2ok.Allowed)
}
