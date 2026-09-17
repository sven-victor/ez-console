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
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/sven-victor/ez-console/pkg/config"
)

const redisAllowScript = `
local rate_key = KEYS[1]
local quota_key = KEYS[2]
local rate = tonumber(ARGV[1])
local period_ms = tonumber(ARGV[2])
local burst = tonumber(ARGV[3])
local now_ms = tonumber(ARGV[4])
local quota = tonumber(ARGV[5])
local quota_ttl_ms = tonumber(ARGV[6])

if rate > 0 then
  local data = redis.call('HMGET', rate_key, 'tokens', 'ts')
  local tokens = tonumber(data[1])
  local ts = tonumber(data[2])
  local rate_per_ms = rate / period_ms
  if tokens == nil then
    tokens = burst
    ts = now_ms
  else
    local elapsed = now_ms - ts
    if elapsed < 0 then
      elapsed = 0
    end
    tokens = math.min(burst, tokens + elapsed * rate_per_ms)
    ts = now_ms
  end
  if tokens < 1 then
    local retry_ms = math.ceil((1 - tokens) / rate_per_ms)
    redis.call('HSET', rate_key, 'tokens', tokens, 'ts', ts)
    redis.call('PEXPIRE', rate_key, math.ceil(period_ms * 4))
    return {0, 0, burst, retry_ms, 'rate'}
  end
  tokens = tokens - 1
  redis.call('HSET', rate_key, 'tokens', tokens, 'ts', ts)
  redis.call('PEXPIRE', rate_key, math.ceil(period_ms * 4))
  if quota <= 0 then
    return {1, math.floor(tokens), burst, 0, 'rate'}
  end
end

if quota > 0 then
  local n = redis.call('INCR', quota_key)
  if n == 1 then
    redis.call('PEXPIRE', quota_key, quota_ttl_ms)
  end
  if n > quota then
    local ttl = redis.call('PTTL', quota_key)
    if ttl < 0 then
      ttl = quota_ttl_ms
    end
    return {0, 0, quota, ttl, 'quota'}
  end
  return {1, quota - n, quota, 0, 'quota'}
end

return {1, burst, burst, 0, 'rate'}
`

// RedisStore is a cluster-wide token bucket + UTC-day quota store.
type RedisStore struct {
	client *redis.Client
	prefix string
	script *redis.Script
}

func NewRedisStore(cfg config.RedisConfig) (*RedisStore, error) {
	addr := cfg.GetAddr()
	if addr == "" {
		return nil, fmt.Errorf("rate limit redis store requires non-empty addr")
	}
	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: cfg.Password,
		DB:       cfg.DB,
	})
	if err := client.Ping(context.Background()).Err(); err != nil {
		_ = client.Close()
		return nil, fmt.Errorf("failed to connect redis rate limit store: %w", err)
	}
	prefix := cfg.Prefix
	if prefix == "" {
		prefix = "ez:"
	}
	return &RedisStore{
		client: client,
		prefix: prefix,
		script: redis.NewScript(redisAllowScript),
	}, nil
}

func (s *RedisStore) Allow(ctx context.Context, key string, lim Limit) (Result, error) {
	lim = lim.Normalized()
	now := time.Now()
	periodMS := lim.Period.Milliseconds()
	if periodMS <= 0 {
		periodMS = 1000
	}
	quotaTTL := int64((48 * time.Hour).Milliseconds())
	day := now.UTC().Format("2006-01-02")
	rateKey := s.prefix + "rl:rate:" + key
	quotaKey := s.prefix + "rl:quota:" + key + ":" + day

	vals, err := s.script.Run(ctx, s.client, []string{rateKey, quotaKey},
		lim.Rate, periodMS, lim.Burst, now.UnixMilli(), lim.Quota, quotaTTL,
	).Slice()
	if err != nil {
		return Result{}, err
	}
	if len(vals) < 5 {
		return Result{}, fmt.Errorf("unexpected redis rate limit response")
	}
	allowed := toInt64(vals[0]) == 1
	remaining := int(toInt64(vals[1]))
	limitN := int(toInt64(vals[2]))
	retryMS := toInt64(vals[3])
	kind, _ := vals[4].(string)
	retry := time.Duration(retryMS) * time.Millisecond
	resetAt := now.Add(retry)
	if kind == KindQuota {
		resetAt = utcDayEnd(now)
		if retry <= 0 {
			retry = time.Until(resetAt)
		}
	} else if retry <= 0 {
		resetAt = now.Add(lim.Period)
	}
	return Result{
		Allowed:    allowed,
		Remaining:  remaining,
		Limit:      limitN,
		ResetAt:    resetAt,
		RetryAfter: retry,
		Kind:       kind,
	}, nil
}

func (s *RedisStore) Reset(ctx context.Context, spec ResetSpec) (int, error) {
	deleted := 0
	for _, pattern := range []string{s.prefix + "rl:rate:*", s.prefix + "rl:quota:*"} {
		var cursor uint64
		for {
			keys, next, err := s.client.Scan(ctx, cursor, pattern, 200).Result()
			if err != nil {
				return deleted, err
			}
			var toDel []string
			for _, redisKey := range keys {
				if spec.Match(s.logicalKey(redisKey)) {
					toDel = append(toDel, redisKey)
				}
			}
			if len(toDel) > 0 {
				n, err := s.client.Del(ctx, toDel...).Result()
				if err != nil {
					return deleted, err
				}
				deleted += int(n)
			}
			cursor = next
			if cursor == 0 {
				break
			}
		}
	}
	return deleted, nil
}

func (s *RedisStore) logicalKey(redisKey string) string {
	if k, ok := strings.CutPrefix(redisKey, s.prefix+"rl:rate:"); ok {
		return k
	}
	if k, ok := strings.CutPrefix(redisKey, s.prefix+"rl:quota:"); ok {
		if len(k) >= 11 && k[len(k)-11] == ':' {
			day := k[len(k)-10:]
			if _, err := time.Parse("2006-01-02", day); err == nil {
				return k[:len(k)-11]
			}
		}
		return k
	}
	return redisKey
}

func toInt64(v any) int64 {
	switch n := v.(type) {
	case int64:
		return n
	case int:
		return int64(n)
	case float64:
		return int64(n)
	case string:
		var out int64
		_, _ = fmt.Sscan(n, &out)
		return out
	default:
		return 0
	}
}
