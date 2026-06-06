# Task Management Module

This guide describes the Task Management module: background task execution, registry-based task types, and how to use and extend it.

## Overview

The Task Management module provides:

- **Background task execution**: Tasks run in a worker pool with configurable concurrency.
- **Registry-based task types**: Extensible task types via `pkg/taskscheduler`; no built-in task types by default.
- **Real-time progress and status**: Progress (0–100) and status (pending, running, success, failed, cancelled) are stored and can be polled by the frontend.
- **Cancellation and retry**: Running or pending tasks can be cancelled; failed or cancelled tasks can be retried.
- **Artifact download**: Tasks can attach an artifact file key; users download via the existing file API.
- **Creator-based visibility**: Non-admin users see only their own tasks; admins see all.
- **Task execution logs**: Logs produced during task execution (via the context logger) are stored in a configurable log storage backend and can be viewed on the task detail page.
- **Configurable log storage**: Task settings let you choose where task logs are stored (e.g. database); the list of backends is provided by a registry in `pkg/taskscheduler`.
- **Multi-node safe**: Tasks are claimed from the DB atomically (SKIP LOCKED / single-statement UPDATE); each node runs its own poller. A lease mechanism and a leader-elected reaper recover tasks from crashed nodes.
- **Execution time windows**: Tasks can carry `not_before` and `not_after` deadlines. Scheduled (cron) tasks automatically receive a time window matching their fire interval so stale runs are discarded rather than executed late.

## Architecture

```
┌─────────────┐     ┌──────────────────┐      ┌─────────────────────────┐
│  Other      │     │  TaskService     │      │  Task Type              │
│  Modules    │────▶│  CreateTask      │      │  Registry               │
│  (e.g.      │     │  Get/List/       │      │  (pkg/taskscheduler)    │
│   Export)   │     │  Cancel/Retry/   │      │                         │
└─────────────┘     │  Delete          │      └──────────┬──────────────┘
                    └────────┬─────────┘                 │
                             │ write DB + EventBus        │ GetTaskRunner
                             ▼                           ▼
                    ┌─────────────────┐      ┌─────────────────────────┐
                    │  t_task (DB)    │      │  TaskRunner              │
                    │  (truth source) │      │  Run(ctx, task,          │
                    └────────┬────────┘      │  progressCallback,       │
                             │               │  cancelCh)               │
                    ┌────────▼────────┐      └──────────▲──────────────┘
                    │  pollLoop       │                  │
                    │  (per node)     │                  │
                    │  claimNextPending│─────────────────┘
                    └────────┬────────┘  claim → in-memory queue
                             │
                    ┌────────▼────────┐
                    │  Worker Pool    │
                    │  (N goroutines) │
                    └─────────────────┘
```

- **Task creation** is only via `TaskService.CreateTask` (no HTTP POST). Other modules call it and get a task ID.
- **DB is the task queue**: All tasks are persisted first. After writing, `CreateTask` publishes a `task.new` EventBus event and sends an in-process wakeup signal; both trigger the `pollLoop` on every node.
- **pollLoop** (one per node) drives claiming: on wakeup or fallback timer it calls `claimNextPending` in a loop until the in-memory queue is full or no more eligible tasks exist.
- **claimNextPending** atomically claims one task from DB (transitions `pending → running`, sets `worker_id`, `lease_expires_at`, time-window checks). Claimed tasks are pushed into a local buffered channel for workers to consume.
- **Worker pool** reads max concurrency from system setting `task_max_concurrent` (default 10). Workers consume tasks from the in-memory channel and run the registered `TaskRunner`.
- **Task types** are registered with `taskscheduler.RegisterTaskType(typeName, runner)` or `taskscheduler.RegisterFuncTaskType(typeName, fn)`. Each type has a `TaskRunner` implementing `Run(ctx, task, progressCallback, cancelCh)`.
- **Task logs**: Before running a task, the worker reads the log storage backend name from task settings (`task_log_storage_backend`). It creates a tee logger that forwards all `log.Logger` output from the runner to both the default logger and a **task logger** (created via `taskscheduler.NewTaskLogger`) that writes to the chosen log storage backend. Log storage backends are registered in `pkg/taskscheduler`; the default backend is `"database"`.

## User-Facing Features

### Task List Page

- **Path**: `/tasks`
- **Permission**: `task:list`
- **Behavior**: Paginated list with search (type or ID). Columns: type, status, progress, creator (if admin), created at. Actions: View, Cancel (running/pending), Retry (failed/cancelled), Download (if artifact), Delete.
- **Visibility**: Admins see all tasks; other users see only tasks they created.

### Task Detail Page

- **Path**: `/tasks/:id`
- **Permission**: `task:view`
- **Behavior**: Type, status, progress bar (for running/pending), creator, timestamps, error/result, artifact download link. Buttons: Cancel, Retry, Delete. Page polls every 2 seconds while status is running or pending.
- **Task logs**: A **Task logs** card shows stored execution logs for the task. Logs are fetched from `GET /api/tasks/:id/logs`. While the task is running or pending, the log list is polled every 2 seconds so new lines appear in real time. Each line shows timestamp, level, and message (logfmt-style).

### Header Task Dropdown

- **Location**: Header (next to org switcher / language), shown when user has `task:list`. Rendered in `Layout` as `TaskListDropdown`.
- **Data and state**: Task list and dropdown open state are held in **SiteContext** (`web/src/contexts/SiteContext.tsx`), not inside the dropdown component:
  - **`tasks`**: Array of recent tasks for the current user (from `GET /api/user-tasks`).
  - **`tasksDropdownOpen` / `setTasksDropdownOpen`**: Whether the dropdown is open; used for controlled open state and to drive polling.
  - **`addTask(task)`**: Appends a task to the list and opens the dropdown. Call this when a new task is created (e.g. after starting an export) so the user sees it immediately in the header.
- **Fetch and polling**: SiteContext uses `api.userTasks.listUserTasks()` with polling: **every 3 seconds** when the dropdown is open (`tasksDropdownOpen === true`), **every 60 seconds** when closed. Fetch also runs once when the dropdown is opened.
- **TaskListDropdown** (`web/src/components/TaskListDropdown.tsx`): A presentational component that reads `tasks`, `tasksDropdownOpen`, and `setTasksDropdownOpen` from `useSite()`. It renders the dropdown overlay (type, status, progress, Download, More link to `/tasks`) and does not perform its own data fetching.

### Scheduled Tasks page

- **Path**: `/tasks/schedules`
- **Permission**: `task:schedule:list` (with `task:schedule:update` for toggle and trigger actions).
- **Behavior**: Lists all registered cron jobs (name, cron spec, description, task type, enabled, next run, last run). Actions: View history, Toggle enable/disable, Trigger now. Selecting "View history" shows a paginated table of tasks created by that schedule (execution history). Accessible from the Task list page via the "Scheduled Tasks" link (when the user has `task:schedule:list`).

### System Settings: Task Settings Tab

- **Location**: System Settings → Task Settings tab
- **Permission**: `system:settings:view` to view, `system:settings:update` to save
- **Rendering model**:
  - `log_storage_backend` is a fixed field with dedicated UI (`Select`).
  - Other task settings are dynamically rendered from `GET /api/system/task-settings/fields`.
  - Frontend control mapping is by `value_type`: `int` -> `InputNumber`, `bool` -> `Switch`, `string` -> `Input`.

**Max concurrent tasks**

- **Setting key**: `task_max_concurrent` (integer, default 10)
- **Effect**: Maximum number of tasks that run at the same time.

**Log storage**

- **Setting key**: `task_log_storage_backend` (string, default `"database"`)
- **Effect**: Backend used to store and read task execution logs. When a task runs, the context logger is teed with a task logger that writes each log line to this backend. `GetTaskLogs` also uses this backend so the task detail page shows logs from the same store.
- **UI**: A dropdown lists available backends. The list is loaded from `GET /api/system/task-settings/log-storage-backends`, which returns registered backends from `pkg/taskscheduler` (e.g. `database`). Adding a new backend in code and registering it makes it appear in the dropdown without frontend changes.

**Other extensible task settings**

- **Keys**: Persisted as full keys with `task_` prefix (for example `task_ai_chat_retention_days`).
- **Get/Update payload shape**: `GET /api/system/task-settings` and `PUT /api/system/task-settings` use a flat map where:
  - fixed key is `log_storage_backend` (without `task_` prefix);
  - extensible keys keep full `task_`-prefixed names.
- **Type coercion on read**: Backend converts persisted string values to the declared `value_type` before returning:
  - `int` -> number
  - `bool` -> boolean (`true`/`1` are treated as true)
  - `string` -> string
- **Validation on update**: Backend validates only registered extensible keys by declared `value_type`; unregistered keys are ignored.

## Permissions

| Code                    | Description                           | Typical roles        |
|-------------------------|---------------------------------------|----------------------|
| `task:list`             | List tasks (own or all)               | admin, operator, viewer |
| `task:view`             | View task detail                      | admin, operator, viewer |
| `task:cancel`           | Cancel running/pending task           | admin, operator      |
| `task:retry`            | Retry failed/cancelled task           | admin, operator      |
| `task:delete`           | Delete task                           | admin, operator      |
| `task:schedule:list`    | List scheduled (cron) tasks and history | admin, operator   |
| `task:schedule:update`  | Enable/disable and trigger scheduled tasks | admin, operator |

Non-admin users are restricted to their own tasks for list and detail; admins see all.

## API Reference

All task APIs require authentication.

| Method | Path                  | Permission  | Description                |
|--------|-----------------------|------------|----------------------------|
| GET    | `/api/tasks`          | task:list  | List tasks (paginated)     |
| GET    | `/api/tasks/:id`      | task:view  | Get one task              |
| GET    | `/api/tasks/:id/logs` | task:view  | Get task execution logs   |
| POST   | `/api/tasks/:id/cancel` | task:cancel | Cancel task             |
| POST   | `/api/tasks/:id/retry`  | task:retry | Retry task              |
| DELETE | `/api/tasks/:id`      | task:delete | Delete task (soft)      |

**List query parameters**: `current`, `page_size`, `search` (optional). Admins see all tasks; others see only their own.

**Task logs** (`GET /api/tasks/:id/logs`): Returns an array of log entries for the task (same visibility as the task: admin or creator). Each entry has `id`, `task_id`, `level`, `message`, `created_at`. The backend used is the one selected in Task Settings (log storage).

### User tasks for header dropdown (`/api/user-tasks`)

| Method | Path             | Permission | Description |
|--------|------------------|------------|-------------|
| GET    | `/api/user-tasks` | (auth only)| List current user's recent tasks for the header dropdown. |

- **Authentication**: Required (no separate permission; any logged-in user can call).
- **Response**: Array of tasks (not paginated). Returns up to 10 tasks that are (a) created by the current user, (b) have **category** `"user"`, and (c) are either created in the last 24 hours or currently `running` or `pending`. Tasks with category `"system"` are not returned.
- **Use case**: The header task dropdown uses this API to show the current user's recent **user** tasks and allow quick access to View/Download. The full task list page uses `/api/tasks` with pagination and `task:list`.

**Artifact download**: Use the task's `artifact_file_key` with the existing file API: `GET /api/files/:fileKey`.

### Scheduled tasks (cron) APIs

| Method | Path                                | Permission           | Description |
|--------|-------------------------------------|----------------------|-------------|
| GET    | `/api/task-schedules`               | task:schedule:list   | List registered cron jobs with next/last run and enabled status. |
| GET    | `/api/task-schedules/:id/history`   | task:schedule:list   | Paginated execution history (tasks created by this schedule). Query: `current`, `page_size`. |
| POST   | `/api/task-schedules/:id/toggle`    | task:schedule:update | Enable or disable a cron job. Body: `{ "enabled": true \| false }`. |
| POST   | `/api/task-schedules/:id/trigger`   | task:schedule:update | Run the scheduled job once immediately (creates one task). |

### Task settings APIs (log storage backends)

| Method | Path                                              | Permission           | Description |
|--------|---------------------------------------------------|----------------------|-------------|
| GET    | `/api/system/task-settings`                       | system:settings:view | Get task settings as a flat map (`log_storage_backend` + registered extensible fields). |
| PUT    | `/api/system/task-settings`                       | system:settings:update | Update task settings using the same flat map shape as GET. |
| GET    | `/api/system/task-settings/fields`                | system:settings:view | List registered extensible field definitions (`key`, `value_type`, `default_value`). |
| GET    | `/api/system/task-settings/log-storage-backends` | system:settings:view | List registered log storage backends for the task settings dropdown. |

- **`GET /api/system/task-settings/fields` response**: Array of field metadata, for example:

```json
[
  { "key": "task_max_concurrent", "value_type": "int", "default_value": "10" },
  { "key": "task_ai_chat_retention_days", "value_type": "int", "default_value": "90" }
]
```

- **`GET /api/system/task-settings/log-storage-backends` response**: Array of `{ "id": "database", "name": "Database" }` (and any other registered backends). Used by the Task Settings form to populate the "Log storage" select.

There is **no** HTTP API to create tasks; creation is done in code via `TaskService.CreateTask`. Modules that need to expose "create task" to the frontend (e.g. user export) provide their own POST endpoint that calls `TaskService.CreateTask` and returns the task.

## For Module Developers: Creating Tasks

### Creating a task from another module

Obtain `*service.TaskService` from the main `*service.Service` and call `CreateTask` with a request-scoped context (so creator is set from the current user):

```go
// In your handler or service (ctx has user from middleware)
task, err := svc.TaskService.CreateTask(ctx, "export",
    service.WithPayload(`{"scope":"users"}`),
    service.WithMaxRetries(2),
)
if err != nil {
    return err
}
// task.ResourceID is the task ID; the pollLoop will pick it up immediately
// via the wakeup signal sent after the DB write.
// Callers should rely on polling task status or the task list/detail APIs;
// completion callbacks are not supported (they are lost on service restart).
```

Options:

- **WithPayload(payload string)**: Optional JSON or string stored on the task for the runner to read.
- **WithMaxRetries(n int)**: Max retries. When > 0, the worker automatically retries on failure (increments `auto_retry_count` and re-enqueues). The user can also manually retry from the UI.
- **WithCategory(category model.TaskCategory)**: Set task category to `"user"` or `"system"` (`model.TaskCategoryUser` / `model.TaskCategorySystem`). Defaults to `"user"` when creator is not `"system"`, otherwise `"system"`.
- **WithCronScheduleID(id string)**: Associates the task with a scheduled (cron) job. Set automatically when a cron job fires; not typically used directly.
- **WithNotBefore(t time.Time)**: The task will not be claimed before this time. Workers skip tasks whose `not_before` is in the future.
- **WithNotAfter(t time.Time)**: If the task has not started by this deadline it is automatically cancelled by the reaper. Useful to discard stale work (e.g. a cron task that was not executed within its scheduling window).

Creator is taken from `middleware.GetUserIDFromContext(ctx)`; if empty, `"system"` is used.

### Example: User export

User export is a full example of a module that creates a task via an HTTP endpoint, runs it in the background, and lets the user see and download the result from the header task dropdown.

- **Permission**: `authorization:user:export` (create user export task).
- **API**: `POST /api/authorization/users/export`. Optional body: `{ "keywords": "", "status": "" }` to filter users. Returns the created task (same shape as task list items).
- **Backend**: `UserController.CreateUserExportTask` calls `TaskService.CreateTask(ctx, "user_export", WithPayload(payload), WithMaxRetries(1))` and returns the task. The task type `user_export` is registered in `pkg/api/authorization/user_export_runner.go` via `taskscheduler.RegisterTaskType` at server startup.
- **Runner**: `userExportRunner` in `user_export_runner.go` parses payload (keywords, status), paginates over users, writes CSV, uploads via `FileService.UploadFileWithOwner` with owner = task creator, then calls `TaskService.SetTaskArtifact(ctx, taskID, fileKey, filename)`. Progress is reported during the loop; cancellation is respected via `cancelCh`.
- **Frontend**: On the user list page (`UserList`), an Export button (guarded by `authorization:user:export`) calls `api.authorization.createUserExportTask({ keywords, status })`. On success, it calls `addTask(res)` from `useSite()` so the new task appears in the header dropdown and the dropdown opens. The user can watch progress and download the CSV from the dropdown or the task detail page when the task completes.

This pattern (POST endpoint → CreateTask → return task; frontend addTask + open dropdown) can be reused for other export or long-running operations.

## For Module Developers: Registering a Task Type

Task execution is pluggable: register a task type and its runner so the worker can execute it. All registry, logstore, and scheduler functions now live in the single `pkg/taskscheduler` package.

### 1. Implement TaskRunner and register

`TaskRunner` runs a single task. It must respect the cancel channel and may call the progress callback.

```go
package mypackage

import (
    "context"
    "fmt"

    "github.com/go-kit/log/level"
    "github.com/sven-victor/ez-console/pkg/model"
    "github.com/sven-victor/ez-console/pkg/taskscheduler"
    "github.com/sven-victor/ez-utils/log"
)

type ExportRunner struct{}

func (r *ExportRunner) Run(
    ctx context.Context,
    t *model.Task,
    progressCallback taskscheduler.ProgressCallback,
    cancelCh <-chan struct{},
) (interface{}, error) {
    logger := log.GetContextLogger(ctx) // lines logged here are stored in the configured log backend

    level.Info(logger).Log("msg", "export started", "task_id", t.ResourceID)

    total := 10
    for i := 0; i < total; i++ {
        select {
        case <-cancelCh:
            level.Warn(logger).Log("msg", "export cancelled", "processed", i)
            return nil, taskscheduler.ErrCancelled
        default:
        }
        // ... do chunk of work
        level.Info(logger).Log("msg", "processing chunk", "chunk", i+1, "total", total)
        progressCallback((i + 1) * 100 / total)
    }

    level.Info(logger).Log("msg", "export completed", "rows", fmt.Sprintf("%d", total))
    // optionally set artifact via TaskService.SetTaskArtifact
    return map[string]string{"rows": "10"}, nil
}

func init() {
    taskscheduler.RegisterTaskType("export", &ExportRunner{})
}
```

**`RegisterFuncTaskType`** — register a plain function directly, without defining a struct:

```go
func init() {
    taskscheduler.RegisterFuncTaskType("cleanup", func(
        ctx context.Context,
        t *model.Task,
        progressCallback taskscheduler.ProgressCallback,
        cancelCh <-chan struct{},
    ) (interface{}, error) {
        logger := log.GetContextLogger(ctx)
        level.Info(logger).Log("msg", "cleanup started")

        select {
        case <-cancelCh:
            return nil, taskscheduler.ErrCancelled
        default:
        }

        // ... do work
        progressCallback(100)
        level.Info(logger).Log("msg", "cleanup done")
        return nil, nil
    })
}
```

**`NewFuncTaskRunner`** — wrap a function as a `TaskRunner` value without immediately registering it. Useful when you need to pass the runner as a field (e.g. `ScheduledJobDef.Runner`) or register it conditionally at runtime:

```go
runner := taskscheduler.NewFuncTaskRunner(func(
    ctx context.Context,
    t *model.Task,
    progressCallback taskscheduler.ProgressCallback,
    cancelCh <-chan struct{},
) (interface{}, error) {
    logger := log.GetContextLogger(ctx)
    level.Info(logger).Log("msg", "job started", "type", string(t.Type))
    progressCallback(100)
    return nil, nil
})

// Pass to a scheduled job — RegisterScheduledJob will call RegisterFuncTaskType for you.
taskscheduler.RegisterScheduledJob(&taskscheduler.ScheduledJobDef{
    ID:       "my-job",
    Name:     "My Job",
    Spec:     "0 * * * *",
    TaskType: "my_job",
    Runner:   runner,
})

// Or register it explicitly:
// taskscheduler.RegisterTaskType("my_job", runner)
```

- Return `taskscheduler.ErrCancelled` when the task is cancelled so the service can set status to cancelled.
- Return a non-nil error for failure; the service will set status to failed and store the error message.
- Return `(result, nil)` for success; result can be JSON-serialized and stored in the task's result field.
- Register in `init()` so the type is available when the worker starts. The worker calls `taskscheduler.GetTaskRunner(ctx, task.Type)` to get a runner for each pending task.

### 2. Setting the artifact (e.g. export file)

When your runner produces a file, it should associate it with the task. The runner does not receive `TaskService` in `Run`; the runner should call `TaskService.SetTaskArtifact(ctx, taskID, fileKey, filename)` from code that has access to the service (e.g. a runner that was constructed with a reference to the service, or via a closure). Alternatively, have the runner return a result that includes a file key and have the module that creates the task call `SetTaskArtifact` after the task completes (by polling the task status).

Artifact download uses the existing file API; the file should be readable by the task creator (e.g. owner = creator).

## Task Log Storage (for implementers)

Task execution logs are stored via a **log storage** layer so they can be queried by task ID and shown in the UI. The logstore registry is part of the `pkg/taskscheduler` package (previously a separate `pkg/logstore` package).

### Backend registry (`pkg/taskscheduler`)

- **Interface**: `LogStoreBackend` with `Write(ctx, refID, level, message)` and `ListByTaskID(ctx, refID)`.
- **Registry**: `taskscheduler.RegisterLogStoreBackend(name, factory)` registers a backend; `taskscheduler.GetLogStoreBackend(name)` returns a backend instance (empty name uses the default `"database"`). `taskscheduler.ListLogStoreBackendNames()` returns all registered names for the task settings API.
- **Database backend**: `taskscheduler.NewDatabaseLogStoreBackend()` is registered as `"database"` in `pkg/taskscheduler/logstore_database.go` via `init()`. It persists to the `task_logs` table (model `TaskLog`: task_id, level, message, created_at).
- **Task logger**: `taskscheduler.NewTaskLogger(ctx, backendName, taskID)` returns a `log.Logger` that writes each log event to the selected backend. Used internally by the worker, but also available for direct use.

### How task logs are captured

When the worker runs a task it:

1. Reads task settings and gets `LogStorageBackend` (e.g. `"database"`).
2. Creates a **task logger** via `taskscheduler.NewTaskLogger(ctx, backendName, taskID)` that forwards each `Log(keyvals...)` call to the storage backend (formatted as a single logfmt-style line). Debug-level logs are silently dropped.
3. Creates a tee logger: `log.NewTeeLogger(baseLogger, taskLogger)` and attaches it to the context with `log.NewContextLogger(ctx, log.WithLogger(tee))`.
4. Passes this context to `runner.Run(ctx, …)`. Any code in the runner that uses `log.GetContextLogger(ctx)` and logs will have lines stored in the selected backend.

To add a new log storage backend (e.g. file, external service), implement `taskscheduler.LogStoreBackend`, register it with `taskscheduler.RegisterLogStoreBackend("my_backend", func() LogStoreBackend { return NewMyBackend() })`, and ensure the backend is registered before the server starts (e.g. in `init()`). It will then appear in the Task Settings "Log storage" dropdown and can be selected for storing and reading task logs.

## Task Model (summary)

| Field               | Type      | Description                          |
|---------------------|-----------|--------------------------------------|
| id (ResourceID)     | string    | UUID                                 |
| type                | string    | Task type key for registry           |
| status              | enum      | pending, running, success, failed, cancelled |
| category            | string    | `"user"` or `"system"`. Only `user` tasks are returned by `GET /api/user-tasks` (header dropdown). |
| progress            | int       | 0–100                                |
| result              | string    | JSON or text result                  |
| error               | string    | Last error message if failed         |
| creator_id          | string    | User ID of creator                   |
| artifact_file_key   | string    | Optional file key for download       |
| artifact_file_name  | string    | Original file name for the artifact  |
| retry_count         | int       | Number of manual retries             |
| auto_retry_count    | int       | Number of automatic retries by the worker |
| max_retries         | int       | Max retries allowed                  |
| started_at          | *time     | When run started                     |
| finished_at         | *time     | When run finished                    |
| payload             | string    | Optional input for the runner        |
| cron_schedule_id    | string    | Set when the task was created by a scheduled (cron) job; used for execution history. |
| not_before          | *time     | If set, the task will not be claimed before this time. |
| not_after           | *time     | If set, the task is automatically cancelled if it has not started by this deadline. |

## Task scheduling internals

### Task lifecycle

```
CreateTask → DB (status=pending) → EventBus task.new + wakeupCh
                                        │
                                        ▼
                               pollLoop (per node)
                                        │
                               claimNextPending ──── not eligible (not_before / not_after) → skip
                                        │
                                 status = running
                                 worker_id = nodeID
                                 lease_expires_at = NOW + TTL
                                        │
                                in-memory taskQueue (buf=1000)
                                        │
                                   worker.Run()
                                 ┌──────┴──────┐
                              success        failure
                                 │         (auto-retry if max_retries > 0)
                            status=success   │
                                         status=pending → wakeupCh
```

### Write-first, DB-backed queue

When a task is created it is always written to the DB first (status `pending`). The DB is the authoritative queue; the in-memory channel is a fast-path buffer, not the source of truth.

After persisting, `CreateTask`:
1. Publishes a `task.new` EventBus event so **all** nodes receive a wakeup signal.
2. Sends a non-blocking signal to the local `wakeupCh`.

### pollLoop and claimNextPending

Each node runs exactly one `pollLoop` goroutine. On receiving a wakeup signal or a fallback timer fire, `pollLoop` calls `claimUntilIdle`, which loops calling `claimNextPending` until either:

- **Drained**: `claimNextPending` finds no eligible pending task (returns `ErrRecordNotFound`).
- **Capped**: the local in-memory queue is full (`len(taskQueue) == cap(taskQueue)`). In this case workers are still executing; they call `wakeWorkers()` on completion, which restarts the claim loop.

After `claimUntilIdle` returns (either condition), the fallback timer is reset to `TaskFallbackPollInterval` (default 1 minute, with ±20% jitter). The fallback timer is a safety net for cases where EventBus messages are missed; in normal operation the wakeup channel drives claiming with near-zero latency.

### Atomic claim (claimNextPending)

`claimNextPending` transitions one `pending` task to `running` atomically, enforcing `not_before ≤ NOW < not_after` (if set):

- **MySQL**: single `UPDATE … ORDER BY created_at ASC LIMIT 1` — no explicit transaction needed.
- **PostgreSQL**: single `UPDATE … WHERE resource_id = (SELECT … FOR UPDATE SKIP LOCKED)` — no explicit transaction.
- **SQLite**: `SELECT … FOR UPDATE` inside a transaction (SQLite serializes writes via its file lock; `SKIP LOCKED` is not supported but unnecessary).

On success, the task row has `status='running'`, `worker_id`, `started_at`, and `lease_expires_at = NOW + leaseTTL` (default 60 s). The poller then retrieves the row by `claim_token` (MySQL/PostgreSQL) or direct reference (SQLite) and pushes it into the local `taskQueue` channel.

### Lease renewal and cancellation

While a task is running, a background goroutine inside the worker:

- Renews `lease_expires_at` every 20 seconds to signal "still alive".
- Polls `cancel_requested` from the DB every 20 seconds as a cross-node fallback for cancellation (in addition to the in-process `cancelCh` closed by the EventBus `task.cancel` event).

### Reaper

A leader-elected `reaperLoop` runs every 30 seconds and performs two cleanup operations:

1. **Recover crashed workers**: Resets `running` tasks whose `lease_expires_at < NOW` back to `pending` (clears `worker_id`, `lease_expires_at`, `claim_token`), so another node can pick them up.
2. **Expire overdue pending tasks**: Cancels `pending` tasks whose `not_after < NOW`, setting `status='cancelled'` and `error='task expired: not_after deadline passed'`. This prevents stale tasks from being executed long after their scheduling window has closed.

Leadership is determined by `t_cluster_lease` via `DBClusterBackend`. In single-node deployments (`cluster.enabled=false`) the reaper always runs.

### Auto-retry on failure

When a task runner returns an error (non-cancellation), if `max_retries > 0` and `auto_retry_count < max_retries`, the worker:
1. Resets the task to `pending` (clears `worker_id`, `lease_expires_at`, `claim_token`).
2. Increments `auto_retry_count`.
3. Calls `wakeWorkers()` so the task is picked up immediately.

This is distinct from manual retry (which increments `retry_count`). Tasks that exhaust auto-retries transition to `failed`.

### Manual retry (RetryTask)

`RetryTask` resets a `failed` or `cancelled` task to `pending` (resets `error`, `result`, `progress`, `started_at`, `finished_at`, `auto_retry_count` to 0, increments `retry_count`). After the DB update it publishes a `task.new` EventBus event and calls `wakeWorkers()` so the task is picked up immediately on all nodes.

### Overflow behavior

If `taskQueue` is full when `claimUntilIdle` runs, claiming stops (capped). Workers call `wakeWorkers()` when they finish a task, which restarts the claim loop. The `task_queue_overflow_total` Prometheus counter increments when a rare race causes a task to be claimed but not enqueued (between the capacity check and the channel send).

## Prometheus metrics for tasks

The following metrics are exposed under `/metrics` for monitoring:

| Metric                         | Type     | Labels                    | Description |
|--------------------------------|----------|---------------------------|-------------|
| `task_created_total`           | Counter  | category, type            | Total tasks created. |
| `task_started_total`           | Counter  | category, type            | Total tasks that started running. |
| `task_completed_total`         | Counter  | category, type, status    | Total tasks completed (status: success, failed, cancelled). |
| `task_queue_overflow_total`    | Counter  | category                  | Number of times a task was claimed but could not be enqueued (queue full race). |
| `task_queue_length`           | Gauge    | —                         | Current number of tasks in the in-memory queue. |
| `task_running_gauge`          | Gauge    | type                      | Number of tasks currently running. |
| `task_run_duration_seconds`   | Histogram| type                      | Task run duration from start to finish. |

## Scheduled tasks (cron)

- **Registry**: Scheduled jobs are defined in code via `pkg/taskscheduler`. Call `taskscheduler.RegisterScheduledJob(def)` with a `ScheduledJobDef` (ID, Name, Spec, Description, TaskType, PayloadBuilder, MaxRetries, Runner, Schedule, DisableNotAfter). Definitions are **not** persisted to the DB; they exist only in memory. Note: `RegisterScheduledJob` panics if a job with the same ID is already registered.
- **Schedule field**: `ScheduledJobDef.Schedule` is an optional pre-parsed `cron.Schedule`. If set, the `Spec` string is used only for display; the actual schedule is driven by the `Schedule` value. If nil, `Spec` is parsed with `cron.ParseStandard` at job registration time (stored back into `Schedule`) so that `not_after` can be computed at fire time.
- **Runner field**: `ScheduledJobDef.Runner` is optional. If set, `RegisterScheduledJob` automatically registers the runner as the task type via `RegisterFuncTaskType`. If nil, the task type must be registered separately (e.g. via another `RegisterTaskType` call).
- **Enabled**: All registered jobs start with `Enabled: true` by default. Users can toggle enabled/disabled via the UI or API.
- **Execution time window**: When a cron job fires, the created task automatically receives:
  - `not_before = fire_time - 1s` — allows a 1-second back-dated window for minor clock skew between the scheduler and the worker.
  - `not_after = schedule.Next(fire_time)` — the next scheduled fire time; tasks not started before the next window are automatically cancelled by the reaper, preventing stale runs. Set `DisableNotAfter: true` to opt out (e.g. for long-running or one-shot jobs that must always execute).
- **Deduplication**: Each scheduled task carries a `schedule_fire_key` (`<jobID>:<unix_ts>`). A unique DB index on this column ensures that concurrent leader nodes cannot create duplicate tasks for the same fire window (only the first `INSERT` wins; the other is a silent no-op).
- **UI**: The **Scheduled Tasks** page (`/tasks/schedules`) lists all registered cron jobs (name, spec, description, task type, enabled, next run, last run) and allows viewing execution history for a selected job. Users with `task:schedule:update` can enable/disable a job and trigger a run immediately.

### Registering a scheduled job

In an `init()` or during server startup, register a job. The `Runner` field is optional — if provided, its task type is automatically registered; otherwise register the task type separately:

```go
// With Runner field — task type is registered automatically by RegisterScheduledJob.
// Use NewFuncTaskRunner to avoid defining a dedicated struct.
taskscheduler.RegisterScheduledJob(&taskscheduler.ScheduledJobDef{
    ID:          "my-daily-job",
    Name:        "Daily cleanup",
    Spec:        "0 0 * * *",  // daily at midnight
    Description: "Runs the cleanup task type",
    TaskType:    "cleanup",
    PayloadBuilder: func() string { return `{}` },
    MaxRetries:  1,
    // DisableNotAfter: true,  // uncomment for jobs that must not be discarded
    Runner: taskscheduler.NewFuncTaskRunner(func(
        ctx context.Context,
        t *model.Task,
        progressCallback taskscheduler.ProgressCallback,
        cancelCh <-chan struct{},
    ) (interface{}, error) {
        logger := log.GetContextLogger(ctx)
        level.Info(logger).Log("msg", "daily cleanup started")
        // ... do work, check cancelCh, call progressCallback
        progressCallback(100)
        level.Info(logger).Log("msg", "daily cleanup done")
        return nil, nil
    }),
})

// Without Runner — register the task type separately.
taskscheduler.RegisterScheduledJob(&taskscheduler.ScheduledJobDef{
    ID:          "my-daily-job",
    Name:        "Daily cleanup",
    Spec:        "0 0 * * *",
    Description: "Runs the cleanup task type",
    TaskType:    "cleanup",
    PayloadBuilder: func() string { return `{}` },
    MaxRetries:  1,
})
taskscheduler.RegisterTaskType("cleanup", &myCleanupRunner{})
```

The scheduler does not store cron definitions in the DB; adding or changing a job requires a code change and restart.

## Configuration

- **Max concurrent tasks**: System Settings → Task Settings → "Max concurrent tasks" (default 10). Stored as `task_max_concurrent` in the settings table.
- **Log storage backend**: System Settings → Task Settings → "Log storage" dropdown (default `database`). Stored as `task_log_storage_backend`. Determines where task execution logs are written and read from; options come from `pkg/taskscheduler` registry.
- **Task fallback poll interval**: `cluster.task.fallback_poll_interval` in config (default 1 minute). Controls how often `pollLoop` fires its safety-net timer when no wakeup signals arrive. In normal operation wakeup signals drive claiming; this interval is only a fallback for missed events.
- **Task lease TTL**: `cluster.task.lease_ttl` in config (default 60 seconds). How long a running task's lease is valid before the reaper considers the worker dead and reclaims the task.

### Registering a new extensible task setting (developer guide)

Task settings support registry-driven extension from backend code. Register once in Go, then the field is automatically initialized, exposed via API, and rendered in frontend Task Settings.

1. Register the field in `pkg/model/system_task_setting.go`:
   - Call `model.RegisterTaskSetting(key, valueType, defaultValue)`.
   - `key` should be provided **without** `task_`; backend auto-prefixes to full key `task_<key>`.
   - Supported `valueType` values are `int`, `bool`, `string`.
2. Ensure server startup runs default initialization (`TaskService.InitDefaultTaskSettings` via `NewService`):
   - If no row exists for the setting key, it inserts `defaultValue`.
3. Frontend discovers the field automatically:
   - `TaskSettingsForm` calls `GET /api/system/task-settings/fields` and renders the control by `value_type`.
4. Optional i18n label:
   - Add `settings.task.fields.<full_key>` translation entry so UI shows a friendly label instead of raw key text.

Built-in extensible settings are currently registered in `init()` as:
- `task_max_concurrent` (int, default `10`)
- `task_ai_chat_retention_days` (int, default `90`)
- `task_log_retention_days` (int, default `30`)
- `task_audit_log_retention_days` (int, default `365`)

## Troubleshooting

- **Task stays "pending"**: Ensure a runner is registered for the task's `type` via `taskscheduler.RegisterTaskType` or `taskscheduler.RegisterFuncTaskType`. Ensure the server has restarted after registering so the worker pool and registry are loaded.
- **Task stays "pending" and never executes**: Check `not_before` and `not_after` on the task row. If `not_after` has already passed, the task will be cancelled by the next reaper run (every 30 s) rather than executed. If `not_before` is in the future, the task will be skipped by `claimNextPending` until that time arrives.
- **Many tasks stay "pending" under high load**: Check Prometheus `task_queue_overflow_total`. If it is non-zero, there was a rare race between the capacity check and the channel send; the affected tasks retain `status='running'` temporarily and are recovered by the reaper within `lease_ttl` seconds. For sustained backlog, increase `task_max_concurrent` in Task Settings or scale to multiple nodes.
- **"task type not registered"**: The worker sets status to failed with this message when `taskscheduler.GetTaskRunner(ctx, task.Type)` returns false. Add a `RegisterTaskType` or `RegisterFuncTaskType` call for that type (e.g. in `init()` of the package that implements the runner).
- **Tasks cancelled with "task expired"**: A cron task was not claimed within its `not_after` window (the next scheduled fire time). Causes: worker pool overloaded, service was down during the window, or `not_after` was set too tight. For jobs that must always run regardless of scheduling lag, set `DisableNotAfter: true` on the `ScheduledJobDef`.
- **Creator or admin only**: List and get APIs filter by `creator_id` for non-admin users. Use a context with the correct user when calling from backend code if you need to simulate a user.
- **No task logs on detail page**: Ensure Task Settings → Log storage is set to a registered backend (e.g. `database`). Logs are only stored when the runner uses the context logger (`log.GetContextLogger(ctx)`); if the runner does not log, the list will be empty. Ensure the task has started at least once (logs are written during execution).
- **Running task not progressing (node crashed)**: The reaper will reset the task to `pending` after `lease_ttl` seconds (default 60 s) and another worker will pick it up. Check `task_running_gauge` and `lease_expires_at` in the DB to diagnose.

## Related Documentation

- [API Best Practices](./09-api-best-practices.md) – OpenAPI/Swag and frontend client generation
- [Authentication & Authorization](./07-auth-system.md) – Permissions and context user
