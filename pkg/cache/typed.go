package cache

import (
	"context"
	"encoding/json"
	"errors"
	"sync"
	"time"
)

type typedEntry[T any] struct {
	value     T
	expiresAt time.Time
}

// TypedCache provides a strongly-typed, in-process L1 cache with an optional
// L2 backend (Cache interface). L1 hits return Go values directly with zero
// serialization overhead; L2 is consulted only on L1 miss.
type TypedCache[T any] struct {
	mu     sync.RWMutex
	data   map[string]typedEntry[T]
	remote Cache
	prefix string
	ttl    time.Duration
	stopGC chan struct{}
}

// NewTypedCache creates a TypedCache.
//   - prefix: key prefix used when persisting to the remote L2 cache.
//   - ttl: default time-to-live for entries.
//   - remote: optional L2 Cache backend (pass nil for pure in-process caching).
//   - gcInterval: how often expired L1 entries are reaped.
func NewTypedCache[T any](prefix string, ttl time.Duration, remote Cache, gcInterval time.Duration) *TypedCache[T] {
	c := &TypedCache[T]{
		data:   make(map[string]typedEntry[T]),
		remote: remote,
		prefix: prefix,
		ttl:    ttl,
		stopGC: make(chan struct{}),
	}
	go c.gc(gcInterval)
	return c
}

// Get retrieves a value from the cache. It checks L1 first, then L2 (if configured).
// Returns ErrCacheMiss when the key is not found in either layer.
func (c *TypedCache[T]) Get(ctx context.Context, key string) (T, error) {
	var zero T

	c.mu.RLock()
	if e, ok := c.data[key]; ok && time.Now().Before(e.expiresAt) {
		c.mu.RUnlock()
		return e.value, nil
	}
	c.mu.RUnlock()

	if c.remote != nil {
		raw, err := c.remote.Get(ctx, c.prefix+key)
		if err == nil {
			var val T
			if err := json.Unmarshal(raw, &val); err == nil {
				c.set(key, val, c.ttl)
				return val, nil
			}
		}
	}

	return zero, ErrCacheMiss
}

// Set stores a value in L1 and optionally writes through to L2.
func (c *TypedCache[T]) Set(ctx context.Context, key string, value T) error {
	c.set(key, value, c.ttl)

	if c.remote != nil {
		raw, err := json.Marshal(value)
		if err != nil {
			return err
		}
		return c.remote.Set(ctx, c.prefix+key, raw, c.ttl)
	}
	return nil
}

// Delete removes a key from both L1 and L2.
func (c *TypedCache[T]) Delete(ctx context.Context, key string) error {
	c.mu.Lock()
	delete(c.data, key)
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

	val, err = loader()
	if err != nil {
		var zero T
		return zero, err
	}
	_ = c.Set(ctx, key, val)
	return val, nil
}

func (c *TypedCache[T]) Close() error {
	close(c.stopGC)
	return nil
}

func (c *TypedCache[T]) set(key string, value T, ttl time.Duration) {
	c.mu.Lock()
	c.data[key] = typedEntry[T]{value: value, expiresAt: time.Now().Add(ttl)}
	c.mu.Unlock()
}

func (c *TypedCache[T]) gc(interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()
	for {
		select {
		case <-ticker.C:
			c.mu.Lock()
			now := time.Now()
			for k, e := range c.data {
				if now.After(e.expiresAt) {
					delete(c.data, k)
				}
			}
			c.mu.Unlock()
		case <-c.stopGC:
			return
		}
	}
}
