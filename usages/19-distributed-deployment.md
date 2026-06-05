# Distributed Deployment

This guide explains how EZ-Console supports multi-node deployment behind a load balancer, and how to use the cluster-related APIs when extending the framework.

## Overview

By default EZ-Console runs on **SQLite** in **single-node** mode. For production workloads that require horizontal scaling, switch to **MySQL** or **PostgreSQL** and enable the cluster module.

Multi-node mode provides:

- **DB-backed coordination**: leader election, task claiming, and migration serialization via `t_cluster_lease`.
- **EventBus (Gossip/serf)**: low-latency cache invalidation, task wake-up, and cross-node cancellation. Events are best-effort; every path has a DB fallback.
- **L1-only caches**: Settings, roles, and sessions are cached per node. Writes invalidate local cache and broadcast to peers via EventBus; misses fall back to the database.
- **Ephemeral tokens in DB**: OAuth state, MFA codes, and activation links are stored in `t_ephemeral_token` with atomic one-time consumption.
- **Distributed task execution**: any node can claim and run pending tasks; cron scheduling is deduplicated by `schedule_fire_key`.

**SQLite remains single-node only.** When `database.driver=sqlite`, `cluster.enabled` must be `false`.

## Architecture

```
                 ┌──────────── Load Balancer ────────────┐
                 │                                        │
            ┌────▼─────┐        ┌──────────┐        ┌──────────┐
            │  node-1  │◄──────►│  node-2  │◄──────►│  node-N  │
            │ (leader) │ Gossip │          │ Gossip │          │
            └────┬─────┘        └────┬─────┘        └────┬─────┘
                 │                   │                   │
                 └─────────┬─────────┴─────────┬─────────┘
                           ▼                   ▼
                  ┌──────────────────┐  ┌───────────────┐
                  │ MySQL / Postgres │  │ Shared volume │
                  │ (truth source)   │  │ uploads/skills│
                  └──────────────────┘  └───────────────┘
```

| Component | Package | Role |
|-----------|---------|------|
| Cluster backend | `pkg/cluster` | DB lease acquire/renew/release for leader election |
| EventBus | `pkg/eventbus` | Node-to-node event broadcast (noop when single-node) |
| Dialect helpers | `pkg/db/dialect` | Portable GORM constructs and DB server time |
| Ephemeral tokens | `pkg/service` (`EphemeralTokenService`) | Short-lived, one-time-use tokens in DB |
| L1 cache | `pkg/cache` | Per-node typed caches with cross-node invalidation |

## Configuration

When `database.driver` is not `sqlite`, **`cluster.enabled` must be explicitly set** (`true` or `false`). Omitting it causes startup to fail fast.

### Single-node with MySQL/PostgreSQL

Use this when you run one instance but want a shared database:

```yaml
database:
  driver: mysql
  host: db.example.com
  port: 3306
  username: myapp
  password: "${DATABASE_PASSWORD}"
  schema: myapp

cluster:
  enabled: false   # required when driver != sqlite
```

### Multi-node

```yaml
database:
  driver: postgres   # mysql | postgres
  host: db.example.com
  port: 5432
  username: myapp
  password: "${DATABASE_PASSWORD}"
  schema: myapp

cluster:
  enabled: true
  gossip:
    bind_addr: "0.0.0.0:7946"
    advertise_addr: "${POD_IP}:7946"   # reachable address for other nodes
    join:
      - "ez-console-headless:7946"     # K8s headless service or peer list
    discover_interval: 30s             # re-resolve join DNS for new pods
  scheduler:
    lease_ttl: 15s
    lease_renew_interval: 5s
  task:
    lease_ttl: 60s
    fallback_poll_interval: 1m

global:
  encrypt-key: "<same value on every node>"

server:
  file_upload_path: "/shared/uploads"   # must be visible to all nodes
  skills_path: "/shared/skills"
```

### Environment variables

| Variable | Maps to | Description |
|----------|---------|-------------|
| `GLOBAL_ENCRYPT_KEY` | `global.encrypt-key` | Required; must be identical on all nodes |
| `GOSSIP_ADVERTISE_ADDR` | `cluster.gossip.advertise_addr` | Pod IP or host:port peers can reach |
| `DATABASE_DRIVER` | `database.driver` | `mysql`, `postgres`, or `sqlite` |
| `CLUSTER_ENABLED` | `cluster.enabled` | `true` or `false` |

### Startup validation rules

The server fails fast when:

- `driver=sqlite` and `cluster.enabled=true`
- `driver!=sqlite` and `cluster.enabled` is not explicitly set
- `cluster.enabled=true` but `global.encrypt-key` is missing (serf encryption requires it)
- `encrypt-key` cannot decrypt an existing encrypted setting in the database

See [Configuration Guide](./05-configuration.md) for general config options and [Deployment Guide](./12-deployment.md) for build and deploy steps.

## Core APIs for Framework Extenders

### Dialect helpers (`pkg/db/dialect`)

Use these instead of `time.Now()` or raw dialect SQL in WHERE/UPDATE clauses. All lease and expiry comparisons use **DB server time** to avoid clock skew across nodes.

```go
import (
    "github.com/sven-victor/ez-console/pkg/db"
    dbdialect "github.com/sven-victor/ez-console/pkg/db/dialect"
)

dbConn := db.Session(ctx)

// Current DB time in a WHERE clause
dbConn.Where("expires_at > ?", dbdialect.Now(dbConn)).Find(&rows)

// DB time + duration for lease expiry
dbConn.Model(&row).Updates(map[string]any{
    "expires_at": dbdialect.NowPlus(dbConn, 15*time.Second),
})

// Row lock (SELECT ... FOR UPDATE)
dbdialect.LockForUpdate(tx).Where("id = ?", id).First(&row)

// Multi-worker queue: skip rows already locked by other workers
dbdialect.LockSkipLocked(tx).Where("status = ?", "pending").Limit(10).Find(&tasks)

// Idempotent insert (MySQL INSERT IGNORE / PG ON CONFLICT DO NOTHING)
dbConn.Clauses(dbdialect.OnConflictDoNothing()).Create(&row)
dbConn.Clauses(dbdialect.OnConflictDoNothingOnColumns("schedule_fire_key")).Create(&task)
```

| Function | Purpose |
|----------|---------|
| `Now(db)` | DB server timestamp as `clause.Expr` |
| `NowPlus(db, d)` | DB server time + duration |
| `LockForUpdate(tx)` | `SELECT ... FOR UPDATE` |
| `LockSkipLocked(tx)` | `FOR UPDATE SKIP LOCKED` (falls back on SQLite) |
| `OnConflictDoNothing()` | Portable duplicate-key ignore |
| `OnConflictDoNothingOnColumns(...)` | Target specific unique columns |

### Cluster backend (`pkg/cluster`)

`ClusterBackend` provides DB-based lease primitives. The built-in scheduler and migration runner use it; you can reuse it for custom leader-only jobs.

```go
import (
    "github.com/sven-victor/ez-console/pkg/cluster"
    "github.com/sven-victor/ez-console/pkg/db"
)

backend := cluster.NewDBClusterBackend(db.Session(ctx))
nodeID := eventbus.GetGlobalEventBus().NodeID()

// Try to acquire or renew a named lease
held, err := backend.AcquireLease(ctx, "my-custom-job", nodeID, 30*time.Second)
if err != nil { /* handle error */ }
if !held {
    return // another node holds the lease
}

// Check without acquiring
isLeader, _ := backend.IsLeader(ctx, "my-custom-job", nodeID)

// Release on shutdown so another node takes over immediately
_ = backend.ReleaseLease(ctx, "my-custom-job", nodeID)
```

| Method | Description |
|--------|-------------|
| `AcquireLease(ctx, name, holderID, ttl)` | Atomically acquire or renew a lease; returns `true` if this node holds it |
| `IsLeader(ctx, name, holderID)` | Returns `true` if holder holds a non-expired lease |
| `ReleaseLease(ctx, name, holderID)` | Expire the lease immediately (graceful shutdown) |

Lease rows are stored in `t_cluster_lease`. Built-in lease names include `"scheduler"` (cron leader) and `"migration"` (AutoMigrate serialization).

### EventBus (`pkg/eventbus`)

When `cluster.enabled=false`, the framework uses `NoopEventBus` (node ID `"local"`). When enabled, it uses hashicorp/serf with encryption derived from `global.encrypt-key`.

```go
import "github.com/sven-victor/ez-console/pkg/eventbus"

// Obtain the global bus (set during server startup)
bus := eventbus.GetGlobalEventBus()

// Publish a custom event (keep payload under ~512 bytes for serf)
payload := eventbus.MarshalPayload(map[string]string{"id": "123"})
_ = bus.Publish(ctx, "myapp.custom.event", payload)

// Subscribe (must not block; run heavy work in a goroutine)
bus.Subscribe(func(event string, payload []byte) {
    if event != "myapp.custom.event" {
        return
    }
    var p map[string]string
    if err := eventbus.UnmarshalPayload(payload, &p); err != nil {
        return
    }
    // handle event
})

nodeID := bus.NodeID() // use for worker_id, lease holder_id, logging
```

**Built-in event names:**

| Event | Payload | Purpose |
|-------|---------|---------|
| `cache.invalidate` | `{cache_name, key}` — `key="*"` clears all | Cross-node L1 cache eviction |
| `task.new` | task ID (bytes) | Wake workers to claim pending tasks |
| `task.cancel` | task ID (bytes) | Cancel a running task on the owning node |
| `schedule.changed` | schedule job state JSON | Sync cron enable/disable across nodes |
| `scheduler.lease.released` | node ID (bytes) | Prompt other nodes to retry leader election |

**Design rule:** every EventBus path must have a DB fallback (polling, lease, or a persisted flag). Event loss affects latency only, not correctness.

Factory entry point:

```go
bus, err := eventbus.New(&cfg.Cluster)
```

In a standard app you do not call this yourself; `server` initializes the bus and calls `eventbus.SetGlobalEventBus(bus)`.

### L1 cache and cross-node invalidation (`pkg/cache`)

Caches are **per-node L1 only**. There is no shared Redis or DB cache layer.

Global typed caches:

| Variable | Logical name | Truth source | TTL |
|----------|--------------|--------------|-----|
| `cache.Sessions` | `sessions` | `t_session` / `t_user` / `t_role` | 45s |
| `cache.Roles` | `roles` | `t_role` | 10m |
| `cache.Settings` | `settings` | `t_setting` | 10m |
| `cache.AllSettings` | `all_settings` | `t_setting` | 10m |

When your code updates data that is cached, **always use `PublishInvalidate`** so other nodes evict the same key:

```go
import "github.com/sven-victor/ez-console/pkg/cache"

// After updating a setting in DB
cache.PublishInvalidate(ctx, cache.CacheNameSettings, string(settingKey))
cache.PublishInvalidate(ctx, cache.CacheNameAllSettings, "all")

// After updating a role
cache.PublishInvalidate(ctx, cache.CacheNameRoles, roleID)

// After revoking a session
cache.PublishInvalidate(ctx, cache.CacheNameSessions, tokenHash)

// Clear an entire cache on all nodes
cache.PublishInvalidate(ctx, cache.CacheNameRoles, "*")
```

Do **not** call `cache.Settings.Delete()` directly when the change should propagate; use `PublishInvalidate` instead.

For custom startup wiring (only if you bypass the standard server):

```go
cache.SetInvalidatePublishHook(func(ctx context.Context, cacheName, key string) {
    p, _ := json.Marshal(eventbus.CacheInvalidatePayload{CacheName: cacheName, Key: key})
    _ = bus.Publish(ctx, eventbus.EventCacheInvalidate, p)
})
bus.Subscribe(func(event string, payload []byte) {
    if event == eventbus.EventCacheInvalidate {
        cache.HandleCacheInvalidateEvent(payload)
    }
})
```

### Ephemeral tokens (`EphemeralTokenService`)

Use this for short-lived, one-time-use tokens that must work across nodes (OAuth CSRF state, login codes, activation links). Tokens are hashed (SHA-256) before storage; payloads are encrypted with `global.encrypt-key`.

```go
import (
    "github.com/sven-victor/ez-console/pkg/model"
    "github.com/sven-victor/ez-console/pkg/service"
)

svc := service.GetEphemeralTokenService()

// Create a token (store payload as JSON string)
err := svc.Create(ctx, model.EphemeralTokenOAuthState, rawToken, payloadJSON, 10*time.Minute)

// Atomically consume — only one caller wins across all nodes
payload, err := svc.ConsumeAndGetPayload(ctx, rawToken)
if errors.Is(err, service.ErrEphemeralTokenInvalidOrUsed) {
    // expired, already used, or never existed
}

// Leader-only cleanup (registered job: ephemeral-token-cleanup, every 5 min)
_ = svc.DeleteExpired(ctx, "")                          // all purposes
_ = svc.DeleteExpired(ctx, model.EphemeralTokenMFALogin) // one purpose
```

Built-in purposes (`model.EphemeralTokenPurpose`):

| Constant | Used for |
|----------|----------|
| `EphemeralTokenOAuthState` | OAuth CSRF state |
| `EphemeralTokenMFALogin` | Email MFA login code |
| `EphemeralTokenMFAActivation` | MFA setup token |
| `EphemeralTokenUserActivation` | Account activation link |

For a new purpose, add a constant in `model/ephemeral_token.go` and use the same `Create` / `ConsumeAndGetPayload` API. Consumption is atomic: PostgreSQL uses `DELETE ... RETURNING`; MySQL/SQLite use `SELECT FOR UPDATE` + `DELETE` in one transaction.

**Do not** store strong-consistency, write-then-read data in `cache.Store` or in-memory maps; use `EphemeralTokenService` or a dedicated DB table.

## Distributed Tasks and Scheduling

Background tasks are documented in [Task Management](./17-task-management.md). In multi-node mode the following applies automatically:

- **Task creation** publishes `task.new` so any node can claim the task.
- **Workers** claim pending tasks with `SKIP LOCKED` and hold a DB lease (`worker_id`, `lease_expires_at`).
- **Cron jobs** run on all nodes, but only the scheduler leader creates tasks; `schedule_fire_key` deduplicates concurrent inserts.
- **Cancel** sets `cancel_requested=true` in DB and publishes `task.cancel`; the owning worker picks it up on the next lease renewal even if the event is lost.

### Cron deduplication for custom scheduled jobs

When registering a scheduled job that calls `CreateTask`, the framework sets `schedule_fire_key` automatically. If you enqueue cron tasks manually, pass the deduplication key:

```go
taskSvc.CreateTask(ctx, myTaskType,
    service.WithCronScheduleID("my-job-id"),
    service.WithScheduleFireKey(fmt.Sprintf("%s:%d", jobID, fireTime.Unix())),
)
```

Manual `TriggerNow` calls do not set `schedule_fire_key`, so repeated manual triggers are allowed.

### Leader-only custom work

Pattern used by the scheduler and ephemeral-token cleanup:

```go
backend := cluster.NewDBClusterBackend(db.Session(ctx))
nodeID := service.GetGlobalEventBus().NodeID()

held, _ := backend.IsLeader(ctx, "scheduler", nodeID)
// Or acquire your own lease name:
held, _ := backend.AcquireLease(ctx, "my-nightly-report", nodeID, 5*time.Minute)
if !held {
    return nil
}
// run leader-only logic
```

## Shared File Storage

File download signing keys are stored encrypted in `t_setting` (`file_signature_key`) so all nodes share the same HMAC secret.

Upload and skill files must be visible to every node:

- **Recommended (phase 1):** mount a shared volume (NFS, CephFS) and point `server.file_upload_path` and `server.skills_path` at the mount.
- **Future:** optional S3/MinIO backend via `afero.Fs` (not yet exposed in config).

Task execution logs in multi-node deployments should use the **`database`** log storage backend, not node-local files.

## Deployment Checklist

- [ ] Use MySQL or PostgreSQL (not SQLite)
- [ ] Set `cluster.enabled: true` explicitly
- [ ] Use the **same** `global.encrypt-key` on every node (e.g. K8s Secret)
- [ ] Open gossip port (default **7946**) between nodes; set `advertise_addr` to a reachable address
- [ ] Configure `cluster.gossip.join` or a headless service for peer discovery
- [ ] Mount **shared storage** for uploads and skills
- [ ] Set task log storage to `database` (System Settings → Task Settings)
- [ ] Put instances behind a load balancer with **sticky sessions optional** (JWT auth is stateless; sessions rebuild from DB on cache miss)
- [ ] Prefer **rolling restarts** over simultaneous full-cluster restarts

### Kubernetes example (snippet)

```yaml
env:
  - name: GLOBAL_ENCRYPT_KEY
    valueFrom:
      secretKeyRef:
        name: ez-console-secrets
        key: encrypt-key
  - name: GOSSIP_ADVERTISE_ADDR
    valueFrom:
      fieldRef:
        fieldPath: status.podIP
  - name: CLUSTER_ENABLED
    value: "true"
ports:
  - containerPort: 8080    # HTTP
  - containerPort: 7946    # Gossip (cluster-internal)
volumeMounts:
  - name: shared-data
    mountPath: /shared
```

## Extending the Framework: Patterns and Pitfalls

### Do

- Use `dbdialect.Now()` / `NowPlus()` for expiry and lease timestamps.
- Use `cache.PublishInvalidate()` after mutating cached entities.
- Use `EphemeralTokenService` for one-time tokens consumed shortly after creation.
- Use `ClusterBackend.AcquireLease()` for optional leader-only optimization (with DB deduplication as the correctness backstop).
- Ensure custom EventBus handlers return quickly; offload work to goroutines.
- Register new models with `db.RegisterModels()` so AutoMigrate includes them.

### Do not

- Rely on in-process maps or `cache.Store` for cross-request state in multi-node setups.
- Use `time.Now()` in DB WHERE clauses for lease or expiry checks.
- Write raw dialect SQL for coordination logic (use GORM + `pkg/db/dialect`).
- Assume EventBus delivery is reliable.
- Run multiple replicas with `driver!=sqlite` and `cluster.enabled=false` (startup allows it for single-instance MySQL/Postgres, but multiple replicas without cluster features will misbehave).

## Troubleshooting

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| Startup: `cluster.enabled must be explicitly set` | MySQL/Postgres without `cluster.enabled` | Set `cluster.enabled: true` (multi-node) or `false` (single instance) |
| Startup: `encrypt-key validation failed` | Mismatched key across nodes or after restore | Align `global.encrypt-key` with the key used when data was encrypted |
| OAuth/MFA fails intermittently | Old single-node cache tokens or mixed cluster config | Ensure all nodes use same DB and `cluster.enabled=true`; tokens are in `t_ephemeral_token` |
| File download signature invalid on some nodes | Missing or mismatched `file_signature_key` | Restart nodes; key is auto-generated once in `t_setting` |
| Cron job runs twice | Missing `schedule_fire_key` on custom CreateTask path | Use `WithScheduleFireKey` for cron-triggered tasks |
| Tasks stay pending | Workers not claiming from DB | Check DB connectivity; verify `task.new` subscription; fallback poll runs every ~1m |
| Stale settings/roles after update | Direct cache delete without broadcast | Use `cache.PublishInvalidate()` |
| Gossip nodes not joining | Firewall or wrong `advertise_addr` | Ensure port 7946 is open; `advertise_addr` must be reachable by peers |
| Migration hang on startup | Another node holds migration lease | Wait up to 10 minutes or clear stale row in `t_cluster_lease` where `name='migration'` |

## Related Documentation

- [Deployment Guide](./12-deployment.md) – build, Docker, Kubernetes
- [Configuration Guide](./05-configuration.md) – general configuration
- [Task Management](./17-task-management.md) – tasks, workers, scheduled jobs
- [Authentication & Authorization](./07-auth-system.md) – sessions, OAuth, MFA
- [Database & Models](./06-database-models.md) – GORM models and migrations
- [Troubleshooting](./14-troubleshooting.md) – general issues
