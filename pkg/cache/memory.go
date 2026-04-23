package cache

import (
	"context"
	"sync"
	"time"
)

type memEntry struct {
	value     []byte
	expiresAt time.Time
}

// MemoryCache is an in-memory Cache implementation with TTL-based expiration
// and a background garbage-collection goroutine.
type MemoryCache struct {
	mu         sync.RWMutex
	data       map[string]memEntry
	metricName string
}

// NewMemoryCache creates a MemoryCache with a background GC that runs every gcInterval.
func NewMemoryCache() *MemoryCache {
	c := &MemoryCache{
		data:       make(map[string]memEntry),
		metricName: "memory",
	}
	cacheEntries.WithLabelValues(c.metricName).Set(0)
	return c
}

func (c *MemoryCache) Get(ctx context.Context, key string) ([]byte, error) {
	val, _, err := c.GetWithTTL(ctx, key)
	return val, err
}

func (c *MemoryCache) GetWithTTL(_ context.Context, key string) ([]byte, time.Duration, error) {
	c.mu.RLock()
	e, ok := c.data[key]
	c.mu.RUnlock()
	if !ok {
		cacheMissTotal.WithLabelValues(c.metricName, "l1").Inc()
		return nil, 0, ErrCacheMiss
	}
	remainingTTL := time.Until(e.expiresAt)
	if remainingTTL <= 0 {
		// Lazy delete expired entries to reduce stale data until next GC.
		c.mu.Lock()
		if current, exists := c.data[key]; exists && time.Now().After(current.expiresAt) {
			delete(c.data, key)
			cacheEntries.WithLabelValues(c.metricName).Set(float64(len(c.data)))
		}
		c.mu.Unlock()
		cacheMissTotal.WithLabelValues(c.metricName, "l1").Inc()
		return nil, 0, ErrCacheMiss
	}
	cacheHitTotal.WithLabelValues(c.metricName, "l1").Inc()
	dst := make([]byte, len(e.value))
	copy(dst, e.value)
	return dst, remainingTTL, nil
}

func (c *MemoryCache) Set(_ context.Context, key string, value []byte, ttl time.Duration) error {
	dst := make([]byte, len(value))
	copy(dst, value)
	c.mu.Lock()
	c.data[key] = memEntry{value: dst, expiresAt: time.Now().Add(ttl)}
	cacheEntries.WithLabelValues(c.metricName).Set(float64(len(c.data)))
	c.mu.Unlock()
	return nil
}

func (c *MemoryCache) Delete(_ context.Context, key string) error {
	c.mu.Lock()
	delete(c.data, key)
	cacheEntries.WithLabelValues(c.metricName).Set(float64(len(c.data)))
	c.mu.Unlock()
	return nil
}

// Clear removes all entries from the in-memory store.
func (c *MemoryCache) Clear() {
	c.mu.Lock()
	c.data = make(map[string]memEntry)
	cacheEntries.WithLabelValues(c.metricName).Set(0)
	c.mu.Unlock()
}

func (c *MemoryCache) GC() {
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
