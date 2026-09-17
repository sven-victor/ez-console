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
	"fmt"
	"strings"
	"sync"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/model"
)

var (
	exceededTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "rate_limit_exceeded_total",
			Help: "Requests rejected by the rate limiter",
		},
		[]string{"kind", "dimension"},
	)
	storeErrorsTotal = promauto.NewCounter(
		prometheus.CounterOpts{
			Name: "rate_limit_store_errors_total",
			Help: "Store errors encountered by the rate limiter",
		},
	)
)

// Identity is the rate-limit subject for a request.
type Identity struct {
	Type model.RateLimitSubjectType
	ID   string
}

func (id Identity) Dimension() string {
	switch id.Type {
	case model.RateLimitSubjectUser:
		return "user"
	case model.RateLimitSubjectServiceAccount:
		return "sa"
	default:
		return "ip"
	}
}

func (id Identity) SharedKey() string {
	return string(id.Type) + ":" + id.ID
}

func (id Identity) RouteKey(method, path string) string {
	return id.SharedKey() + ":" + strings.ToUpper(method) + ":" + path
}

// Decision is the limiter outcome for one request.
type Decision struct {
	Allowed bool
	Result  Result
	Shared  *CompiledRule
	Route   *CompiledRule
	// Bucket is "shared" or "route" when Allowed is false.
	Bucket string
}

type RuleLoader func(ctx context.Context) ([]model.RateLimitRule, error)

type EnabledFunc func(ctx context.Context) bool

// Limiter applies compiled rules against a Store.
type Limiter struct {
	store    Store
	cfg      config.RateLimitConfig
	loadDB   RuleLoader
	enabled  EnabledFunc
	mu       sync.Mutex
	cached   *RuleSet
	cacheGen uint64
	gen      uint64
}

func NewLimiter(store Store, cfg config.RateLimitConfig, loadDB RuleLoader, enabled EnabledFunc) *Limiter {
	if enabled == nil {
		enabled = func(context.Context) bool { return cfg.GetEnabled() }
	}
	return &Limiter{store: store, cfg: cfg, loadDB: loadDB, enabled: enabled}
}

func (l *Limiter) Config() config.RateLimitConfig { return l.cfg }

func (l *Limiter) StoreName() string { return l.cfg.GetStore() }

func (l *Limiter) FailOpen() bool { return l.cfg.GetFailOpen() }

func (l *Limiter) Enabled(ctx context.Context) bool {
	if l == nil || !l.cfg.GetEnabled() {
		return false
	}
	if l.enabled != nil {
		return l.enabled(ctx)
	}
	return true
}

func (l *Limiter) Invalidate() {
	l.mu.Lock()
	l.gen++
	l.cached = nil
	l.mu.Unlock()
}

func (l *Limiter) RuleSet(ctx context.Context) *RuleSet {
	l.mu.Lock()
	if l.cached != nil && l.cacheGen == l.gen {
		rs := l.cached
		l.mu.Unlock()
		return rs
	}
	gen := l.gen
	l.mu.Unlock()

	var dbRows []model.RateLimitRule
	if l.loadDB != nil {
		if rows, err := l.loadDB(ctx); err == nil {
			dbRows = rows
		}
	}
	rs := Compile(l.cfg.Policies, dbRows)

	l.mu.Lock()
	if l.cacheGen != gen && l.cached != nil {
		// another compile won; still publish ours if gen matches after
	}
	l.cached = rs
	l.cacheGen = gen
	l.mu.Unlock()
	return rs
}

func (l *Limiter) Effective(ctx context.Context, st model.RateLimitSubjectType, sid, method, path string) model.RateLimitEffective {
	rs := l.RuleSet(ctx)
	out := model.RateLimitEffective{
		SubjectType: string(st),
		SubjectID:   sid,
		Method:      strings.ToUpper(method),
		Path:        path,
	}
	if shared, ok := rs.Shared(st, sid); ok {
		b := shared.ToBucket()
		out.Shared = &b
	}
	if route, ok := rs.Route(st, sid, method, path); ok {
		b := route.ToBucket()
		out.Route = &b
	}
	return out
}

func (l *Limiter) Reset(ctx context.Context, spec ResetSpec) (int, error) {
	if l == nil || l.store == nil {
		return 0, fmt.Errorf("rate limiter is not initialized")
	}
	n, err := l.store.Reset(ctx, spec)
	if err != nil {
		storeErrorsTotal.Inc()
		return n, fmt.Errorf("rate limit store: %w", err)
	}
	return n, nil
}

func (l *Limiter) Allow(ctx context.Context, ident Identity, method, path string) (Decision, error) {
	if SkipPath(method, path) {
		return Decision{Allowed: true}, nil
	}
	rs := l.RuleSet(ctx)
	shared, hasShared := rs.Shared(ident.Type, ident.ID)
	route, hasRoute := rs.Route(ident.Type, ident.ID, method, path)

	dec := Decision{}
	if hasShared {
		s := shared
		dec.Shared = &s
	}
	if hasRoute {
		r := route
		dec.Route = &r
	}

	if hasShared {
		res, err := l.allowStore(ctx, ident.SharedKey(), shared.Limit)
		if err != nil {
			return dec, err
		}
		dec.Result = res
		if !res.Allowed {
			exceededTotal.WithLabelValues(res.Kind, ident.Dimension()).Inc()
			dec.Allowed = false
			dec.Bucket = BucketShared
			return dec, nil
		}
	}
	if hasRoute {
		res, err := l.allowStore(ctx, ident.RouteKey(method, path), route.Limit)
		if err != nil {
			return dec, err
		}
		dec.Result = res
		if !res.Allowed {
			exceededTotal.WithLabelValues(res.Kind, ident.Dimension()).Inc()
			dec.Allowed = false
			dec.Bucket = BucketRoute
			return dec, nil
		}
	}
	dec.Allowed = true
	if dec.Result.Kind == "" {
		dec.Result = Result{Allowed: true, Kind: KindRate}
	}
	return dec, nil
}

func (l *Limiter) allowStore(ctx context.Context, key string, lim Limit) (Result, error) {
	res, err := l.store.Allow(ctx, key, lim)
	if err != nil {
		storeErrorsTotal.Inc()
		if l.FailOpen() {
			return Result{Allowed: true, Kind: KindRate, Limit: lim.Burst, Remaining: lim.Burst}, nil
		}
		return Result{}, fmt.Errorf("rate limit store: %w", err)
	}
	return res, nil
}
