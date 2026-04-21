package cache

import (
	"context"
	"sync"
	"time"
)

// clearHook is invoked by ClearSiteCache to flush one registered cache layer.
type clearHook func(ctx context.Context) error

type CacheInterface interface {
	Clear()
	GC()
}

type CacheManager struct {
	cacheMap map[string]CacheInterface
	mu       sync.Mutex
}

func (c *CacheManager) keys() []string {
	c.mu.Lock()
	defer c.mu.Unlock()
	keys := make([]string, 0, len(c.cacheMap))
	for k := range c.cacheMap {
		keys = append(keys, k)
	}
	return keys
}

func (c *CacheManager) GetCache(key string) CacheInterface {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.cacheMap[key]
}

func (c *CacheManager) gc() {
	ticker := time.NewTicker(time.Minute)
	defer ticker.Stop()
	for {
		select {
		case <-ticker.C:
			keys := c.keys()
			for _, key := range keys {
				cache := c.GetCache(key)
				if cache == nil {
					continue
				}
				cache.GC()
			}
		}
	}
}

var cacheManager *CacheManager
var cacheManagerOnce sync.Once

func NewCacheManager() *CacheManager {
	cacheManagerOnce.Do(func() {
		cacheManager = &CacheManager{
			cacheMap: make(map[string]CacheInterface),
		}
		go cacheManager.gc()
	})
	return cacheManager
}

func init() {
	cacheManager = NewCacheManager()
}

func RegisterCache(name string, cache CacheInterface) {
	cacheManager.mu.Lock()
	defer cacheManager.mu.Unlock()
	cacheManager.cacheMap[name] = cache
}

func ResetCacheRegistry() {
	cacheManager.mu.Lock()
	defer cacheManager.mu.Unlock()
	for _, cache := range cacheManager.cacheMap {
		cache.Clear()
	}
	cacheManager.cacheMap = make(map[string]CacheInterface)
}

// ClearSiteCache clears all registered application caches (raw Store, typed L1 caches, etc.).
func ClearSiteCache(ctx context.Context) error {
	cacheManager.mu.Lock()
	defer cacheManager.mu.Unlock()
	for _, cache := range cacheManager.cacheMap {
		cache.Clear()
	}
	return nil
}

func GetCache(name string) CacheInterface {
	return cacheManager.GetCache(name)
}
