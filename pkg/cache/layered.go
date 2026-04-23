package cache

import (
	"context"
	"errors"
	"time"
)

// LayeredCache composes a fixed in-memory L1 cache with an optional external L2 cache.
type LayeredCache struct {
	l1          Cache
	l2          Cache
	fallbackTTL time.Duration
}

// NewLayeredCache creates a two-layer raw cache.
func NewLayeredCache(l1 Cache, l2 Cache, fallbackTTL time.Duration) *LayeredCache {
	return &LayeredCache{
		l1:          l1,
		l2:          l2,
		fallbackTTL: fallbackTTL,
	}
}

func (c *LayeredCache) Get(ctx context.Context, key string) ([]byte, error) {
	val, _, err := c.GetWithTTL(ctx, key)
	return val, err
}

func (c *LayeredCache) GetWithTTL(ctx context.Context, key string) ([]byte, time.Duration, error) {
	val, ttl, err := c.l1.GetWithTTL(ctx, key)
	if err == nil {
		return val, ttl, nil
	}
	if !errors.Is(err, ErrCacheMiss) || c.l2 == nil {
		return nil, 0, err
	}

	val, ttl, err = c.l2.GetWithTTL(ctx, key)
	if err != nil {
		return nil, 0, err
	}
	if ttl > 0 {
		ttl = c.clampBackfillTTL(ttl)
		_ = c.l1.Set(ctx, key, val, ttl)
	}
	return val, ttl, nil
}

func (c *LayeredCache) Set(ctx context.Context, key string, value []byte, ttl time.Duration) error {
	if err := c.l1.Set(ctx, key, value, ttl); err != nil {
		return err
	}
	if c.l2 != nil {
		return c.l2.Set(ctx, key, value, ttl)
	}
	return nil
}

func (c *LayeredCache) Delete(ctx context.Context, key string) error {
	if err := c.l1.Delete(ctx, key); err != nil {
		return err
	}
	if c.l2 != nil {
		return c.l2.Delete(ctx, key)
	}
	return nil
}

func (c *LayeredCache) Clear() {
	c.l1.Clear()
	if c.l2 != nil {
		c.l2.Clear()
	}
}

func (c *LayeredCache) GC() {
	c.l1.GC()
	if c.l2 != nil {
		c.l2.GC()
	}
}

func (c *LayeredCache) clampBackfillTTL(ttl time.Duration) time.Duration {
	if c.fallbackTTL <= 0 {
		return ttl
	}
	if ttl <= 0 {
		return c.fallbackTTL
	}
	if ttl > c.fallbackTTL {
		return c.fallbackTTL
	}
	return ttl
}
