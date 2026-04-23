package cache

import (
	"fmt"
	"time"

	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/model"
)

const (
	defaultGCInterval = time.Minute
	sessionCacheTTL   = 5 * time.Minute
	roleCacheTTL      = 10 * time.Minute
	settingCacheTTL   = 10 * time.Minute
)

// Global cache instances, initialised by Init.
var (
	// Store is the raw byte cache used for ephemeral data (OAuth state, MFA tokens, etc.).
	Store Cache

	// Sessions is a typed cache for authenticated sessions (hot path).
	// Key: tokenHash (sha256 hex of the raw JWT), Value: CachedSession.
	// L2 is backed by the t_cache_entry DB table so sessions survive restarts.
	Sessions *TypedCache[CachedSession]

	// Roles caches full Role objects (with Permissions & AIToolPermissions).
	// Key: roleID (ResourceID), Value: model.Role. In-memory only (no L2).
	Roles *TypedCache[model.Role]

	// Settings caches individual system settings by key.
	Settings *TypedCache[model.Setting]

	// AllSettings caches the full settings list under a single key.
	AllSettings *TypedCache[[]model.Setting]
)

// Init creates the cache backend from config and wires up the global instances.
// Must be called once at startup before any cache access.
// dbSessionFn provides the DB connection for DB-backed external cache; pass nil
// when cache driver is not db (useful in tests).
func Init(cfg *config.CacheConfig, dbSessionFn DBSessionFunc) error {
	ResetCacheRegistry()

	externalCache, err := newExternalCache(cfg, dbSessionFn)
	if err != nil {
		return err
	}

	Store = NewLayeredCache(NewMemoryCache(), externalCache, sessionCacheTTL)
	RegisterCache("store:l1+l2:"+cfg.GetDriver(), Store)
	if externalCache != nil {
		RegisterCache("external:"+cfg.GetDriver(), externalCache)
	}

	Sessions = NewTypedCache[CachedSession]("session:", sessionCacheTTL, externalCache, defaultGCInterval)
	Roles = NewTypedCache[model.Role]("role:", roleCacheTTL, nil, defaultGCInterval)
	Settings = NewTypedCache[model.Setting]("setting:", settingCacheTTL, nil, defaultGCInterval)
	AllSettings = NewTypedCache[[]model.Setting]("all_settings:", settingCacheTTL, nil, defaultGCInterval)
	return nil
}

func newExternalCache(cfg *config.CacheConfig, dbSessionFn DBSessionFunc) (Cache, error) {
	switch cfg.GetDriver() {
	case "memory", "":
		return nil, nil
	case "db":
		if dbSessionFn == nil {
			return nil, fmt.Errorf("cache driver db requires db session function")
		}
		return NewDBCache(dbSessionFn), nil
	case "redis":
		return NewRedisCache(cfg.Redis)
	default:
		return nil, fmt.Errorf("unsupported cache driver: %s", cfg.GetDriver())
	}
}
