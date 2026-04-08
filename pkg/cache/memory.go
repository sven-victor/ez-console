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
	mu     sync.RWMutex
	data   map[string]memEntry
	stopGC chan struct{}
}

// NewMemoryCache creates a MemoryCache with a background GC that runs every gcInterval.
func NewMemoryCache(gcInterval time.Duration) *MemoryCache {
	c := &MemoryCache{
		data:   make(map[string]memEntry),
		stopGC: make(chan struct{}),
	}
	go c.gc(gcInterval)
	return c
}

func (c *MemoryCache) Get(_ context.Context, key string) ([]byte, error) {
	c.mu.RLock()
	e, ok := c.data[key]
	c.mu.RUnlock()
	if !ok || time.Now().After(e.expiresAt) {
		return nil, ErrCacheMiss
	}
	dst := make([]byte, len(e.value))
	copy(dst, e.value)
	return dst, nil
}

func (c *MemoryCache) Set(_ context.Context, key string, value []byte, ttl time.Duration) error {
	dst := make([]byte, len(value))
	copy(dst, value)
	c.mu.Lock()
	c.data[key] = memEntry{value: dst, expiresAt: time.Now().Add(ttl)}
	c.mu.Unlock()
	return nil
}

func (c *MemoryCache) Delete(_ context.Context, key string) error {
	c.mu.Lock()
	delete(c.data, key)
	c.mu.Unlock()
	return nil
}

func (c *MemoryCache) Close() error {
	close(c.stopGC)
	return nil
}

func (c *MemoryCache) gc(interval time.Duration) {
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
