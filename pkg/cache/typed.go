package cache

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"math/rand"
	"strings"
	"sync"
	"time"

	"golang.org/x/sync/singleflight"
)

type typedEntry[T any] struct {
	value     T
	expiresAt time.Time
}

// TypedCache provides a strongly-typed, in-process L1 cache with an optional
// L2 backend (Cache interface). L1 hits return Go values directly with zero
// serialization overhead; L2 is consulted only on L1 miss.
type TypedCache[T any] struct {
	mu          sync.RWMutex
	data        map[string]typedEntry[T]
	remote      Cache
	prefix      string
	ttl         time.Duration
	metricName  string
	loaderGroup singleflight.Group
}

// NewTypedCache creates a TypedCache.
//   - prefix: key prefix used when persisting to the remote L2 cache.
//   - ttl: default time-to-live for entries.
//   - remote: optional L2 Cache backend (pass nil for pure in-process caching).
//   - gcInterval: how often expired L1 entries are reaped.
func NewTypedCache[T any](prefix string, ttl time.Duration, remote Cache, gcInterval time.Duration) *TypedCache[T] {
	c := &TypedCache[T]{
		data:       make(map[string]typedEntry[T]),
		remote:     remote,
		prefix:     prefix,
		ttl:        ttl,
		metricName: "typed:" + strings.TrimSuffix(prefix, ":"),
	}
	cacheEntries.WithLabelValues(c.metricName).Set(0)
	RegisterCache("typed:"+prefix, c)
	return c
}

// Get retrieves a value from the cache. It checks L1 first, then L2 (if configured).
// Returns ErrCacheMiss when the key is not found in either layer.
func (c *TypedCache[T]) Get(ctx context.Context, key string) (T, error) {
	var zero T

	c.mu.RLock()
	e, ok := c.data[key]
	c.mu.RUnlock()
	if ok {
		if time.Now().Before(e.expiresAt) {
			cacheHitTotal.WithLabelValues(c.metricName, "l1").Inc()
			return e.value, nil
		}
		// Lazy delete expired entries to reduce stale data until next GC.
		c.mu.Lock()
		if current, exists := c.data[key]; exists && time.Now().After(current.expiresAt) {
			delete(c.data, key)
			cacheEntries.WithLabelValues(c.metricName).Set(float64(len(c.data)))
		}
		c.mu.Unlock()
	}

	if c.remote != nil {
		raw, ttl, err := c.remote.GetWithTTL(ctx, c.prefix+key)
		if err == nil {
			var val T
			if err := json.Unmarshal(raw, &val); err != nil {
				return zero, fmt.Errorf("cache: unmarshal remote value for key %q failed: %w", key, err)
			}
			if ttl > 0 {
				c.set(key, val, c.clampBackfillTTL(ttl))
			}
			cacheHitTotal.WithLabelValues(c.metricName, "l2").Inc()
			return val, nil
		}
		if !errors.Is(err, ErrCacheMiss) {
			return zero, err
		}
	}

	cacheMissTotal.WithLabelValues(c.metricName, "all").Inc()
	return zero, ErrCacheMiss
}

// Set stores a value in L1 and optionally writes through to L2.
func (c *TypedCache[T]) Set(ctx context.Context, key string, value T) error {
	ttl := c.withJitter(c.ttl)
	c.set(key, value, ttl)

	if c.remote != nil {
		raw, err := json.Marshal(value)
		if err != nil {
			return err
		}
		return c.remote.Set(ctx, c.prefix+key, raw, ttl)
	}
	return nil
}

// Delete removes a key from both L1 and L2.
func (c *TypedCache[T]) Delete(ctx context.Context, key string) error {
	c.mu.Lock()
	delete(c.data, key)
	cacheEntries.WithLabelValues(c.metricName).Set(float64(len(c.data)))
	c.mu.Unlock()

	if c.remote != nil {
		return c.remote.Delete(ctx, c.prefix+key)
	}
	return nil
}

// Clear removes all entries from L1. L2 is not affected.
func (c *TypedCache[T]) Clear() {
	c.mu.Lock()
	c.data = make(map[string]typedEntry[T])
	cacheEntries.WithLabelValues(c.metricName).Set(0)
	c.mu.Unlock()
}

// GetOrLoad is a cache-aside helper: it returns the cached value on hit,
// otherwise calls loader, stores the result, and returns it.
func (c *TypedCache[T]) GetOrLoad(ctx context.Context, key string, loader func() (T, error)) (T, error) {
	val, err := c.Get(ctx, key)
	if err == nil {
		return val, nil
	}
	if !errors.Is(err, ErrCacheMiss) {
		var zero T
		return zero, err
	}

	v, err, _ := c.loaderGroup.Do(key, func() (any, error) {
		// Re-check after acquiring singleflight slot.
		cachedVal, getErr := c.Get(ctx, key)
		if getErr == nil {
			return cachedVal, nil
		}
		if !errors.Is(getErr, ErrCacheMiss) {
			return nil, getErr
		}

		start := time.Now()
		loadedVal, loadErr := loader()
		cacheLoadSeconds.WithLabelValues(c.metricName).Observe(time.Since(start).Seconds())
		if loadErr != nil {
			return nil, loadErr
		}
		_ = c.Set(ctx, key, loadedVal)
		return loadedVal, nil
	})
	if err != nil {
		var zero T
		return zero, err
	}
	typedVal, ok := v.(T)
	if !ok {
		var zero T
		return zero, fmt.Errorf("cache: singleflight returned unexpected type for key %q", key)
	}
	return typedVal, nil
}

func (c *TypedCache[T]) set(key string, value T, ttl time.Duration) {
	c.mu.Lock()
	c.data[key] = typedEntry[T]{value: value, expiresAt: time.Now().Add(ttl)}
	cacheEntries.WithLabelValues(c.metricName).Set(float64(len(c.data)))
	c.mu.Unlock()
}

func (c *TypedCache[T]) GC() {
	c.mu.Lock()
	defer c.mu.Unlock()
	now := time.Now()
	for k, e := range c.data {
		if now.After(e.expiresAt) {
			delete(c.data, k)
		}
	}
	cacheEntries.WithLabelValues(c.metricName).Set(float64(len(c.data)))
}

func (c *TypedCache[T]) withJitter(ttl time.Duration) time.Duration {
	if ttl <= 0 {
		return ttl
	}
	// Add +/-10% random jitter to spread expirations.
	jitterBound := ttl / 10
	if jitterBound <= 0 {
		return ttl
	}
	delta := time.Duration(rand.Int63n(int64(jitterBound)*2+1)) - jitterBound
	return ttl + delta
}

func (c *TypedCache[T]) clampBackfillTTL(ttl time.Duration) time.Duration {
	if c.ttl <= 0 {
		return ttl
	}
	if ttl <= 0 {
		return c.ttl
	}
	if ttl > c.ttl {
		return c.ttl
	}
	return ttl
}
