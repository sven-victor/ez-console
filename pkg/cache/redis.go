package cache

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/sven-victor/ez-console/pkg/config"
)

// RedisCache is a Cache implementation backed by Redis.
type RedisCache struct {
	client     *redis.Client
	prefix     string
	metricName string
}

// NewRedisCache creates a Redis-backed cache and verifies connectivity.
func NewRedisCache(cfg config.RedisConfig) (*RedisCache, error) {
	if cfg.Addr == "" {
		return nil, fmt.Errorf("redis cache requires non-empty addr")
	}
	client := redis.NewClient(&redis.Options{
		Addr:     cfg.Addr,
		Password: cfg.Password,
		DB:       cfg.DB,
	})

	if err := client.Ping(context.Background()).Err(); err != nil {
		return nil, fmt.Errorf("failed to connect redis cache: %w", err)
	}

	c := &RedisCache{
		client:     client,
		prefix:     cfg.Prefix,
		metricName: "redis",
	}
	cacheEntries.WithLabelValues(c.metricName).Set(0)
	return c, nil
}

func (c *RedisCache) Get(ctx context.Context, key string) ([]byte, error) {
	val, _, err := c.GetWithTTL(ctx, key)
	return val, err
}

func (c *RedisCache) GetWithTTL(ctx context.Context, key string) ([]byte, time.Duration, error) {
	pk := c.prefixed(key)
	val, err := c.client.Get(ctx, pk).Bytes()
	if err == nil {
		ttl, ttlErr := c.client.PTTL(ctx, pk).Result()
		if ttlErr != nil {
			return nil, 0, fmt.Errorf("redis cache pttl key %q: %w", key, ttlErr)
		}
		if ttl <= 0 {
			cacheMissTotal.WithLabelValues(c.metricName, "l2").Inc()
			return nil, 0, ErrCacheMiss
		}
		cacheHitTotal.WithLabelValues(c.metricName, "l2").Inc()
		return val, ttl, nil
	}
	if errors.Is(err, redis.Nil) {
		cacheMissTotal.WithLabelValues(c.metricName, "l2").Inc()
		return nil, 0, ErrCacheMiss
	}
	return nil, 0, fmt.Errorf("redis cache get key %q: %w", key, err)
}

func (c *RedisCache) Set(ctx context.Context, key string, value []byte, ttl time.Duration) error {
	return c.client.Set(ctx, c.prefixed(key), value, ttl).Err()
}

func (c *RedisCache) Delete(ctx context.Context, key string) error {
	return c.client.Del(ctx, c.prefixed(key)).Err()
}

// Clear removes all keys matching this cache prefix.
func (c *RedisCache) Clear() {
	const scanCount int64 = 100
	ctx := context.Background()
	pattern := c.prefixed("*")
	var cursor uint64
	for {
		keys, nextCursor, err := c.client.Scan(ctx, cursor, pattern, scanCount).Result()
		if err != nil {
			return
		}
		if len(keys) > 0 {
			_ = c.client.Del(ctx, keys...).Err()
		}
		cursor = nextCursor
		if cursor == 0 {
			return
		}
	}
}

// GC is handled by Redis TTL itself, so no-op.
func (c *RedisCache) GC() {}

func (c *RedisCache) prefixed(key string) string {
	return c.prefix + key
}
