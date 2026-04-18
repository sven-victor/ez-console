package cache

import (
	"context"
	"sync"
)

// clearHook is invoked by ClearSiteCache to flush one registered cache layer.
type clearHook func(ctx context.Context) error

var (
	managerMu sync.Mutex
	clearFns  []clearHook
)

func resetClearRegistry() {
	managerMu.Lock()
	clearFns = nil
	managerMu.Unlock()
}

// registerForClear registers a cache to be cleared by ClearSiteCache.
// Used from NewTypedCache and Init for the raw Store backend.
func registerForClear(fn clearHook) {
	managerMu.Lock()
	clearFns = append(clearFns, fn)
	managerMu.Unlock()
}

// ClearSiteCache clears all registered application caches (raw Store, typed L1 caches, etc.).
func ClearSiteCache(ctx context.Context) error {
	managerMu.Lock()
	hooks := append([]clearHook(nil), clearFns...)
	managerMu.Unlock()
	for _, fn := range hooks {
		if err := fn(ctx); err != nil {
			return err
		}
	}
	return nil
}
