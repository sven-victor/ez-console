# Caching

This guide describes EZ-Console’s application caching: the in-process L1 typed caches in `pkg/cache`, cross-node invalidation via EventBus, configuration, observability, and how this differs from ephemeral tokens and other non-`pkg/cache` caches.

For multi-node networking and EventBus setup, see [Distributed Deployment](./19-distributed-deployment.md).

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Global Typed Caches](#global-typed-caches)
- [Core APIs](#core-apis)
- [Invalidation](#invalidation)
- [Auth Hot Path (Sessions & Roles)](#auth-hot-path-sessions--roles)
- [Settings & Organizations](#settings--organizations)
- [Clear Site Cache API](#clear-site-cache-api)
- [Configuration](#configuration)
- [Observability](#observability)
- [Related Mechanisms (Not pkg/cache)](#related-mechanisms-not-pkgcache)
- [Unused / Legacy Code](#unused--legacy-code)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

EZ-Console caches hot authentication and configuration data **per process** to avoid repeated DB reads:

- **L1 only**: each node keeps its own `TypedCache[T]` maps. There is **no shared Redis or DB cache layer** in production today.
- **Database is the source of truth**: on miss (or after TTL expiry), data is reloaded from MySQL/SQLite.
- **Cross-node consistency**: after a write, call `cache.PublishInvalidate` so peers drop the same key via EventBus (`cache.invalidate`). Events are **best-effort**; short TTLs (especially sessions) are the safety net.
- **Do not** use L1 caches for one-time tokens that must be correct across nodes — use `EphemeralTokenService` (DB-backed).

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  Node process                                                 │
│  TypedCache[T] L1 (map + TTL + ±10% jitter + singleflight)    │
│  Sessions · Roles · Settings · AllSettings · Orgs · SAs       │
│                         │ miss / load                        │
│                         ▼                                     │
│                    Database (truth)                           │
└─────────────────────────┬────────────────────────────────────┘
                          │ PublishInvalidate(cache_name, key)
                          ▼
                 EventBus (noop | serf)
                 event: cache.invalidate
                 payload: { "cache_name", "key" }
                          │
                          ▼
                 peers: HandleCacheInvalidateEvent → InvalidateByKey
```

**Startup wiring** (`service.NewService` → `cache.Init`; `server` wires EventBus):

1. `cache.Init` creates the six global typed caches with `remote=nil` (pure L1).
2. `cache.SetInvalidatePublishHook` publishes `eventbus.EventCacheInvalidate`.
3. EventBus subscribers call `cache.HandleCacheInvalidateEvent`.

With `cluster.enabled=false`, `NoopEventBus` still delivers publishes to **local** subscribers (local invalidate may run twice — harmless).

## Global Typed Caches

Defined in `pkg/cache/init.go`, initialized once at startup:

| Global var | Logical name (`cache.invalidate`) | L1 key | TTL | Truth source |
|------------|-----------------------------------|--------|-----|--------------|
| `cache.Sessions` | `sessions` | SHA-256 hex of raw JWT (`tokenHash`); same value stored in `t_session.token` | **45s** | `t_session` / user / roles |
| `cache.Roles` | `roles` | Role `resource_id` | **10m** | `t_role` (+ Permissions, AIToolPermissions) |
| `cache.Settings` | `settings` | Setting key string | **10m** | `t_setting` |
| `cache.AllSettings` | `all_settings` | `"all"` | **10m** | `t_setting` |
| `cache.Organizations` | `organizations` | Org `resource_id` | **10m** | `t_organization` |
| `cache.ServiceAccounts` | `service_accounts` | SA `resource_id` | **10m** | SA + role IDs |

Constants: `CacheNameSessions`, `CacheNameRoles`, `CacheNameSettings`, `CacheNameAllSettings`, `CacheNameOrganizations`, `CacheNameServiceAccounts`.

**Why sessions are short-TTL:** security-sensitive path. EventBus invalidation usually keeps peers consistent within sub-seconds; 45s bounds the window if an event is lost.

**Role / SA design:** session and service-account entries store **role IDs only**. Full roles (with permissions) live in `cache.Roles` and are loaded via `GetOrLoad`.

Prefixes such as `session:`, `role:` are constructor arguments for an optional L2 backend. With L2 disabled, L1 map keys are the logical keys above (no prefix applied in memory).

## Core APIs

### `TypedCache[T]` (`pkg/cache/typed.go`)

| Method | Behavior |
|--------|----------|
| `Get(ctx, key)` | L1 lookup; expired entries lazy-deleted; optional L2 if configured |
| `Set(ctx, key, value)` | Store with default TTL ± **10% jitter** |
| `Delete(ctx, key)` | Remove from L1 (and L2 if any) |
| `GetOrLoad(ctx, key, loader)` | Cache-aside + **singleflight** per key (thundering-herd protection) |
| `InvalidateByKey(ctx, key)` | `key == "*"` → `Clear()`; else `Delete` |
| `Clear()` | Drop all L1 entries (does not touch a remote L2) |

### Package helpers

```go
import "github.com/sven-victor/ez-console/pkg/cache"

// Prefer this after mutating DB data that is cached:
cache.PublishInvalidate(ctx, cache.CacheNameRoles, roleID)

// Local only (no EventBus) — rarely what you want in production writers:
cache.InvalidateByKey(ctx, cache.CacheNameRoles, roleID)

// All sessions for a user (looks up token hashes in DB, then PublishInvalidate each):
cache.InvalidateUserSessions(ctx, tx, userID)

// Above + mark sessions invalid in DB (disable/delete user):
cache.InvalidateAndDisableUserSessions(ctx, tx, userID)

cache.InvalidateServiceAccount(ctx, serviceAccountID)

// Clears every registered cache on THIS node only — does not broadcast:
_ = cache.ClearSiteCache(ctx)
```

`PublishInvalidate` = local `InvalidateByKey` + optional publish hook.

## Invalidation

### Event contract

- Event name: `eventbus.EventCacheInvalidate` (`"cache.invalidate"`)
- Payload:

```go
type CacheInvalidatePayload struct {
    CacheName string `json:"cache_name"`
    Key       string `json:"key"` // "*" clears the entire named cache
}
```

Keep payloads small (IDs / hashes) — Serf user events have size limits.

### After writes — examples

```go
// Settings
cache.PublishInvalidate(ctx, cache.CacheNameSettings, string(settingKey))
cache.PublishInvalidate(ctx, cache.CacheNameAllSettings, "all")

// Roles
cache.PublishInvalidate(ctx, cache.CacheNameRoles, roleID)
// or clear all roles on all nodes:
cache.PublishInvalidate(ctx, cache.CacheNameRoles, "*")

// Sessions (tokenHash is SHA-256 hex of the JWT)
cache.PublishInvalidate(ctx, cache.CacheNameSessions, tokenHash)

// Organizations
cache.PublishInvalidate(ctx, cache.CacheNameOrganizations, orgResourceID)

// Service accounts
cache.InvalidateServiceAccount(ctx, saResourceID) // wraps PublishInvalidate
```

Do **not** call `cache.Settings.Delete(...)` (or similar) alone when peers must see the change.

### Consumers that invalidate today

| Area | Typical action |
|------|----------------|
| Settings service / controllers | Settings + AllSettings keys |
| Role controller | Roles by ID |
| Session / user / LDAP / OAuth / org membership | `InvalidateUserSessions` |
| Service account controller | ServiceAccounts |
| Organization service | Organizations + related user sessions |

## Auth Hot Path (Sessions & Roles)

Authentication middleware (`pkg/middleware/authentication.go`):

1. Parse JWT → `tokenHash = SHA-256(token).hex`
2. `cache.Sessions.Get(ctx, tokenHash)`; on miss → `rebuildSessionCache` from DB → `Set`
3. Validate `IsValid`, expiry, idle timeout, user status, password expiry, MFA rules
4. For each role ID on the session → `cache.Roles.GetOrLoad` (DB preload Permissions + AIToolPermissions on miss)
5. Update `LastActiveAt` in L1 and DB
6. Put `user`, `session`, `roles` into Gin context

Service-account auth uses `cache.ServiceAccounts` similarly (role IDs + policy; roles from `cache.Roles`).

## Settings & Organizations

- **Individual setting**: prefer scanning `AllSettings["all"]` when present; otherwise `Settings.GetOrLoad`.
- **Updates**: `PublishInvalidate` for the key and `"all"`, sometimes followed by a local warm `Set` (inbound invalidate may race and clear the warm-fill; next read reloads from DB — acceptable).
- **Organizations**: used from permission / org-scoped middleware; invalidate on org update/delete.

## Clear Site Cache API

```http
POST /api/system/base-settings/clear-cache
```

Permission: `system:settings:update`.

Calls `cache.ClearSiteCache` — clears **registered in-process caches on the current node only**. Other nodes keep their L1 until TTL expiry or a later `PublishInvalidate`. Ephemeral tokens (DB) are **not** cleared by this endpoint (despite older comment wording).

## Configuration

```yaml
cache:
  driver: memory   # historically memory|db|redis — IGNORED by cache.Init today
  size: 1000       # historically max entries — IGNORED by Init (no max-size enforcement on TypedCache)
  redis:
    addr: ""
    password: ""
    db: 0
    prefix: ""
```

| Key | Default | Effective today |
|-----|---------|-----------------|
| `cache.driver` | `memory` | Unused by `cache.Init` |
| `cache.size` | `1000` | Unused by `cache.Init` |
| `cache.redis.*` | empty | Unused by `cache.Init`; fallback for `rate_limit.store=redis`. Also settable via `--cache.redis.*` |

Cross-node invalidation delivery is controlled by **`cluster.*`** (see [Distributed Deployment](./19-distributed-deployment.md)), not by `cache.driver`.

## Observability

Prometheus metrics (`pkg/cache/metrics.go`):

| Metric | Labels | Meaning |
|--------|--------|---------|
| `cache_hit_total` | `cache`, `layer` (`l1` / `l2`) | Hits |
| `cache_miss_total` | `cache`, `layer` | Misses |
| `cache_load_seconds` | `cache` | Loader duration histogram (`GetOrLoad`) |
| `cache_entries` | `cache` | Approximate entry count |

`cache` label looks like `typed:session`, `typed:role`, etc. (from the typed cache prefix).

`CacheManager` runs **GC every 1 minute** over registered caches to reap expired L1 entries.

## Related Mechanisms (Not pkg/cache)

| Mechanism | Purpose |
|-----------|---------|
| **`EphemeralTokenService`** | One-time / short-lived tokens that must work on any node (OAuth CSRF, MFA, activation). Stored in DB (`t_ephemeral_token`), hashed, encrypted payload. |
| **MCP server LRU** | `pkg/api/mcp` — `expirable.LRU` of MCP `Server` instances (size 32, ~10m TTL), keyed by account — not EventBus-invalidated. |
| **AI toolsets provider** | `toolset.NewCachedToolSetsProvider` — `sync.Once` process-lifetime memoization of a toolset map for one chat options factory, not a TTL cache. |
| **HTTP static assets** | `Cache-Control` headers for frontend files only. |
| **Task in-memory queue** | Worker claim buffer; DB remains the authoritative task queue ([Task Management](./17-task-management.md)). |

## Unused / Legacy Code

Still present but **not** used by `cache.Init`:

- `MemoryCache`, `RedisCache`, `DBCache` (`t_cache_entry`), `LayeredCache` — L2 scaffolding
- `model.TempData` / historical “cache service” CRUD on temporary DB rows
- Config `cache.driver` / `cache.size` / `cache.redis`

Do not document or rely on these as the live application cache path. Prefer `pkg/cache` globals + `PublishInvalidate`, or DB/`EphemeralTokenService` for shared state.

## Best Practices

1. **After mutating cached entities, always `PublishInvalidate`** (or helpers like `InvalidateUserSessions`).
2. **Never** store cross-request, strong-consistency state only in L1 or ad-hoc `map`s on a multi-node deploy.
3. Use **`GetOrLoad`** for miss paths that hit the DB to benefit from singleflight.
4. Keep EventBus handlers **fast**; payload = IDs/hashes only.
5. Treat EventBus as **best-effort**; design TTLs so lost events self-heal (sessions already do).
6. Remember **`ClearSiteCache` is local-only** — for cluster-wide flush use `PublishInvalidate(..., "*")` per cache name (or restart / wait for TTL).
7. For OAuth/MFA/one-time links, use **`EphemeralTokenService`**, not `TypedCache`.

## Troubleshooting

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| Stale settings/roles after update | Direct `Delete` without broadcast | Use `PublishInvalidate` |
| OAuth/MFA fails intermittently across nodes | Tokens stored only in memory on one node | Use DB ephemeral tokens; enable cluster + shared DB |
| Clear-cache in UI did not fix other instances | API clears current node only | Invalidate with `*` on each logical cache, or hit clear-cache on each node / wait for TTL |
| High DB load on auth | Session/role cache thrashing or EventBus down | Check metrics; verify gossip; ensure TTLs not overridden incorrectly in forks |
| Expecting Redis to hold sessions | Misreading legacy config | Redis is not wired; sessions are L1 + DB |

## Next Steps

- [Distributed Deployment](./19-distributed-deployment.md) — EventBus, cluster config, ephemeral tokens
- [Auth System](./07-auth-system.md) — sessions, JWT, permissions
- [Configuration](./05-configuration.md) — YAML layout (note: `cache.*` mostly unused by Init)
