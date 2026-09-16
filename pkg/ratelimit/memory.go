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
	"sync"
	"time"
)

type memRate struct {
	tokens float64
	last   time.Time
}

type memQuota struct {
	count int
	day   string
}

// MemoryStore is a process-local token bucket + UTC-day quota store.
type MemoryStore struct {
	mu     sync.Mutex
	rates  map[string]memRate
	quotas map[string]memQuota
}

func NewMemoryStore() *MemoryStore {
	return &MemoryStore{
		rates:  make(map[string]memRate),
		quotas: make(map[string]memQuota),
	}
}

func (s *MemoryStore) Allow(_ context.Context, key string, lim Limit) (Result, error) {
	lim = lim.Normalized()
	now := time.Now()
	s.mu.Lock()
	defer s.mu.Unlock()

	if lim.HasRate() {
		res := s.takeRate(key, lim, now)
		if !res.Allowed {
			return res, nil
		}
	}
	if lim.HasQuota() {
		res := s.takeQuota(key, lim, now)
		if !res.Allowed {
			return res, nil
		}
		return res, nil
	}
	if lim.HasRate() {
		r := s.rates[key]
		return Result{
			Allowed:   true,
			Remaining: int(r.tokens),
			Limit:     lim.Burst,
			ResetAt:   now.Add(lim.Period),
			Kind:      KindRate,
		}, nil
	}
	return Result{Allowed: true, Kind: KindRate}, nil
}

func (s *MemoryStore) takeRate(key string, lim Limit, now time.Time) Result {
	ratePerSec := float64(lim.Rate) / lim.Period.Seconds()
	if ratePerSec <= 0 {
		return Result{Allowed: true, Remaining: lim.Burst, Limit: lim.Burst, Kind: KindRate}
	}
	b, ok := s.rates[key]
	if !ok {
		b = memRate{tokens: float64(lim.Burst), last: now}
	} else {
		elapsed := now.Sub(b.last).Seconds()
		if elapsed > 0 {
			b.tokens = minFloat(float64(lim.Burst), b.tokens+elapsed*ratePerSec)
			b.last = now
		}
	}
	if b.tokens < 1 {
		need := 1 - b.tokens
		retry := time.Duration(need / ratePerSec * float64(time.Second))
		s.rates[key] = b
		return Result{
			Allowed:    false,
			Remaining:  0,
			Limit:      lim.Burst,
			ResetAt:    now.Add(retry),
			RetryAfter: retry,
			Kind:       KindRate,
		}
	}
	b.tokens -= 1
	s.rates[key] = b
	return Result{
		Allowed:   true,
		Remaining: int(b.tokens),
		Limit:     lim.Burst,
		ResetAt:   now.Add(lim.Period),
		Kind:      KindRate,
	}
}

func (s *MemoryStore) takeQuota(key string, lim Limit, now time.Time) Result {
	day := now.UTC().Format("2006-01-02")
	q := s.quotas[key]
	if q.day != day {
		q = memQuota{count: 0, day: day}
	}
	resetAt := utcDayEnd(now)
	if q.count >= lim.Quota {
		s.quotas[key] = q
		return Result{
			Allowed:    false,
			Remaining:  0,
			Limit:      lim.Quota,
			ResetAt:    resetAt,
			RetryAfter: time.Until(resetAt),
			Kind:       KindQuota,
		}
	}
	q.count++
	s.quotas[key] = q
	return Result{
		Allowed:   true,
		Remaining: lim.Quota - q.count,
		Limit:     lim.Quota,
		ResetAt:   resetAt,
		Kind:      KindQuota,
	}
}

func (s *MemoryStore) Reset(_ context.Context, spec ResetSpec) (int, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	n := 0
	for k := range s.rates {
		if spec.Match(k) {
			delete(s.rates, k)
			n++
		}
	}
	for k := range s.quotas {
		if spec.Match(k) {
			delete(s.quotas, k)
			n++
		}
	}
	return n, nil
}

func utcDayEnd(now time.Time) time.Time {
	t := now.UTC()
	return time.Date(t.Year(), t.Month(), t.Day()+1, 0, 0, 0, 0, time.UTC)
}

func minFloat(a, b float64) float64 {
	if a < b {
		return a
	}
	return b
}
