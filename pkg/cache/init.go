package cache

import (
	"context"
	"encoding/json"
	"time"

	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/model"
)

const (
	defaultGCInterval = time.Minute
	// Sessions are security-sensitive so we use a short TTL; EventBus
	// invalidation brings the inconsistency window down to sub-second for
	// normal operations.  The short TTL is the fallback for when an
	// invalidation event is lost.
	sessionCacheTTL        = 45 * time.Second
	roleCacheTTL           = 10 * time.Minute
	settingCacheTTL        = 10 * time.Minute
	orgCacheTTL            = 10 * time.Minute
	serviceAccountCacheTTL = 10 * time.Minute
)

// Logical cache names used in cache.invalidate events.
const (
	CacheNameSessions        = "sessions"
	CacheNameRoles           = "roles"
	CacheNameSettings        = "settings"
	CacheNameAllSettings     = "all_settings"
	CacheNameOrganizations   = "organizations"
	CacheNameServiceAccounts = "service_accounts"
)

// Global cache instances, initialised by Init.
var (
	// Sessions is a typed L1 cache for authenticated sessions (hot path).
	// Key: tokenHash (sha256 hex of the raw JWT), Value: CachedSession.
	// Truth source: t_session / t_user / t_user_roles / t_role.
	Sessions *TypedCache[CachedSession]

	// Roles caches full Role objects (with Permissions & AIToolPermissions).
	// Key: roleID (ResourceID), Value: model.Role. Truth source: t_role.
	Roles *TypedCache[model.Role]

	// Settings caches individual system settings by key.
	// Truth source: t_setting.
	Settings *TypedCache[model.Setting]

	// AllSettings caches the full settings list under a single key.
	// Truth source: t_setting.
	AllSettings *TypedCache[[]model.Setting]

	// Organizations caches Organization objects by resource_id.
	// Truth source: t_organization.
	Organizations *TypedCache[model.Organization]

	// ServiceAccounts caches service account auth data (status, policy,
	// role IDs) by resource_id. Full Role objects are loaded via Roles cache.
	// Truth source: t_service_account / service_account_roles.
	ServiceAccounts *TypedCache[CachedServiceAccount]
)

// logicalNameToCache maps the logical cache name used in invalidation events
// to the concrete typed cache instance so that the EventBus subscriber can
// perform targeted invalidation by key.
var logicalNameToCache = map[string]interface{ InvalidateByKey(ctx context.Context, key string) }{}

// invalidatePublishHook, when set, is called after a local cache invalidation
// so the caller can broadcast a cache.invalidate event to other cluster nodes.
// It is set once at startup via SetInvalidatePublishHook.
var invalidatePublishHook func(ctx context.Context, cacheName, key string)

// SetInvalidatePublishHook registers the EventBus publish callback.  Call this
// once during server startup after the EventBus has been initialised.
func SetInvalidatePublishHook(fn func(ctx context.Context, cacheName, key string)) {
	invalidatePublishHook = fn
}

// PublishInvalidate deletes a key from the named local cache AND calls the
// registered publish hook so that all cluster nodes evict the same entry.
// Use this everywhere instead of calling cache.X.Delete directly when the
// change should propagate across nodes.
func PublishInvalidate(ctx context.Context, cacheName, key string) {
	InvalidateByKey(ctx, cacheName, key)
	if invalidatePublishHook != nil {
		invalidatePublishHook(ctx, cacheName, key)
	}
}

// Init creates the in-memory L1 caches and wires up the global instances.
// The external L2 cache (DB-backed / Redis-backed) is no longer used; all
// caches are pure in-process L1.  Cross-node invalidation is handled via the
// EventBus (see RegisterCacheInvalidationHandler).
// Must be called once at startup before any cache access.
func Init(_ *config.CacheConfig, _ DBSessionFunc) error {
	ResetCacheRegistry()

	Sessions = NewTypedCache[CachedSession]("session:", sessionCacheTTL, nil, defaultGCInterval)
	Roles = NewTypedCache[model.Role]("role:", roleCacheTTL, nil, defaultGCInterval)
	Settings = NewTypedCache[model.Setting]("setting:", settingCacheTTL, nil, defaultGCInterval)
	AllSettings = NewTypedCache[[]model.Setting]("all_settings:", settingCacheTTL, nil, defaultGCInterval)
	Organizations = NewTypedCache[model.Organization]("org:", orgCacheTTL, nil, defaultGCInterval)
	ServiceAccounts = NewTypedCache[CachedServiceAccount]("sa:", serviceAccountCacheTTL, nil, defaultGCInterval)

	logicalNameToCache = map[string]interface{ InvalidateByKey(ctx context.Context, key string) }{
		CacheNameSessions:        Sessions,
		CacheNameRoles:           Roles,
		CacheNameSettings:        Settings,
		CacheNameAllSettings:     AllSettings,
		CacheNameOrganizations:   Organizations,
		CacheNameServiceAccounts: ServiceAccounts,
	}
	return nil
}

// InvalidateByKey deletes a single key from the named logical cache.
// key == "*" clears the entire cache.
func InvalidateByKey(ctx context.Context, cacheName, key string) {
	c, ok := logicalNameToCache[cacheName]
	if !ok {
		return
	}
	if key == "*" {
		switch v := c.(type) {
		case *TypedCache[CachedSession]:
			v.Clear()
		case *TypedCache[model.Role]:
			v.Clear()
		case *TypedCache[model.Setting]:
			v.Clear()
		case *TypedCache[[]model.Setting]:
			v.Clear()
		case *TypedCache[model.Organization]:
			v.Clear()
		case *TypedCache[CachedServiceAccount]:
			v.Clear()
		}
		return
	}
	c.InvalidateByKey(ctx, key)
}

// HandleCacheInvalidateEvent is the EventBus subscriber for "cache.invalidate"
// events.  It parses the JSON payload and calls InvalidateByKey.
func HandleCacheInvalidateEvent(payload []byte) {
	var p struct {
		CacheName string `json:"cache_name"`
		Key       string `json:"key"`
	}
	if err := json.Unmarshal(payload, &p); err != nil {
		return
	}
	InvalidateByKey(context.Background(), p.CacheName, p.Key)
}

