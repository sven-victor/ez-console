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

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────────────┐
│  Other      │     │  TaskService │     │  Task Type              │
│  Modules    │───▶│  CreateTask  │───▶│  Registry               │
│  (e.g.      │     │  Get/List/   │     │  (pkg/taskscheduler)    │
│   Export)   │     │  Cancel/     │     │                         │
└─────────────┘     │  Retry/Delete│     └──────────┬──────────────┘
                    └──────┬───────┘                │
                           │                        │ GetTaskRunner
                           ▼                        ▼
                    ┌───────────────┐     ┌─────────────────────────┐
                    │  Worker Pool  │───▶│  TaskRunner              │
                    │  (configurable│     │  Run(ctx, task,          │
                    │   concurrency)│     │  progressCallback,       │
                    └───────────────┘     │  cancelCh)               │
                                          └─────────────────────────┘
```

- **Task creation** is only via `TaskService.CreateTask` (no HTTP POST). Other modules (e.g. export) call it and get a task ID.
- **Worker pool** reads max concurrency from system setting `task_max_concurrent` (default 10). Tasks are fed by an in-memory channel. When the channel is full, the task is still persisted to the DB but is **not** enqueued (see **Task scheduling internals** below).
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
// task.ResourceID is the task ID; worker will pick it up and run when a runner for "export" is registered.
// Callers should rely on polling task status or the task list/detail APIs; completion callbacks are not supported (they are lost on service restart).
```

Options:

- **WithPayload(payload string)**: Optional JSON or string stored on the task for the runner to read.
- **WithMaxRetries(n int)**: Max retries. When > 0, the worker automatically retries on failure (increments `auto_retry_count` and re-enqueues). The user can also manually retry from the UI.
- **WithCategory(category model.TaskCategory)**: Set task category to `"user"` or `"system"` (`model.TaskCategoryUser` / `model.TaskCategorySystem`). Defaults to `"user"` when creator is not `"system"`, otherwise `"system"`.
- **WithCronScheduleID(id string)**: Associates the task with a scheduled (cron) job. Set automatically when a cron job fires; not typically used directly.

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
| started_at          | *time     | When run started                    |
| finished_at         | *time     | When run finished                   |
| payload             | string    | Optional input for the runner       |
| cron_schedule_id    | string    | Set when the task was created by a scheduled (cron) job; used for execution history. |

## Task scheduling internals

- **Write-first**: When a task is created, it is always written to the DB first (status `pending`).
- **Best-effort enqueue**: After persisting, `TaskService.CreateTask` tries to push the task into an in-memory buffered channel. This is a best-effort optimization for fast pickup by workers.
- **Overflow behavior**: If the channel is full, the task remains in the DB as `pending` and is **not** enqueued. The service increments the Prometheus counter `task_queue_overflow_total{category=...}` for visibility.
- **Worker claim-before-run**: A worker consumes tasks from the channel, then atomically "claims" the task in the DB (transitions `pending → running` and sets `started_at`). If the claim fails (already claimed, deleted, or no longer pending), the worker skips it. This prevents duplicate execution.
- **Auto-retry on failure**: When a task runner returns an error (non-cancellation), if `max_retries > 0` and `auto_retry_count < max_retries`, the worker resets the task to `pending`, increments `auto_retry_count`, and re-enqueues it. This is distinct from manual retry (which increments `retry_count`). Tasks that exhaust auto-retries transition to `failed`.

## Prometheus metrics for tasks

The following metrics are exposed under `/metrics` for monitoring:

| Metric                         | Type     | Labels                    | Description |
|--------------------------------|----------|---------------------------|-------------|
| `task_created_total`           | Counter  | category, type            | Total tasks created. |
| `task_started_total`           | Counter  | category, type            | Total tasks that started running. |
| `task_completed_total`         | Counter  | category, type, status    | Total tasks completed (status: success, failed, cancelled). |
| `task_queue_overflow_total`    | Counter  | category                  | Number of times a task was not enqueued because the in-memory queue was full. |
| `task_queue_length`           | Gauge    | —                         | Current number of tasks in the in-memory queue. |
| `task_running_gauge`          | Gauge    | type                      | Number of tasks currently running. |
| `task_run_duration_seconds`   | Histogram| type                      | Task run duration from start to finish. |

## Scheduled tasks (cron)

- **Registry**: Scheduled jobs are defined in code via `pkg/taskscheduler`. Call `taskscheduler.RegisterScheduledJob(def)` with a `ScheduledJobDef` (ID, Name, Spec, Description, TaskType, PayloadBuilder, MaxRetries, Runner, Schedule). Definitions are **not** persisted to the DB; they exist only in memory. Note: `RegisterScheduledJob` panics if a job with the same ID is already registered.
- **Schedule field**: `ScheduledJobDef.Schedule` is an optional pre-parsed `cron.Schedule`. If set, the `Spec` string is used only for display; the actual schedule is driven by the `Schedule` value. If nil, `Spec` is parsed at runtime.
- **Runner field**: `ScheduledJobDef.Runner` is optional. If set, `RegisterScheduledJob` automatically registers the runner as the task type via `RegisterFuncTaskType`. If nil, the task type must be registered separately (e.g. via another `RegisterTaskType` call).
- **Enabled**: All registered jobs start with `Enabled: true` by default. Users can toggle enabled/disabled via the UI or API.
- **Execution**: The `SchedulerService` (in `pkg/service`) uses `github.com/robfig/cron/v3`. When a cron job fires, it calls `TaskService.CreateTask` with the job's task type, payload from `PayloadBuilder()`, category `"system"`, and `WithCronScheduleID(jobID)`. The created task is then processed like any other task (queue, workers, DB). Each run produces one task row, so execution history is the list of tasks with that `cron_schedule_id`.
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

### Registering a new extensible task setting (developer guide)

Task settings support registry-driven extension from backend code. Register once in Go, then the field is automatically initialized, exposed via API, and rendered in frontend Task Settings.

1. Register the field in `pkg/model/system_task_setting.go`:
   - Call `model.RegisterTaskSetting(key, valueType, defaultValue)`.
   - `key` should be provided **without** `task_`; backend auto-prefixes to full key `task_<key>`.
   - Supported `valueType` values are `int`, `bool`, `string`.
2. Ensure server startup runs default initialization (`SettingService.InitDefaultTaskSettings`):
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
- **Many tasks stay "pending" under high load**: Check Prometheus `task_queue_overflow_total`. If it increases, the in-memory queue was full at task creation time, so some tasks were persisted but not enqueued. Mitigations: reduce bursty task creation, increase the in-memory queue size (code change: `defaultTaskQueueSize`), or implement a DB-backed pickup loop to drain pending tasks.
- **"task type not registered"**: The worker sets status to failed with this message when `taskscheduler.GetTaskRunner(ctx, task.Type)` returns false. Add a `RegisterTaskType` or `RegisterFuncTaskType` call for that type (e.g. in `init()` of the package that implements the runner).
- **Creator or admin only**: List and get APIs filter by `creator_id` for non-admin users. Use a context with the correct user when calling from backend code if you need to simulate a user.
- **No task logs on detail page**: Ensure Task Settings → Log storage is set to a registered backend (e.g. `database`). Logs are only stored when the runner uses the context logger (`log.GetContextLogger(ctx)`); if the runner does not log, the list will be empty. Ensure the task has started at least once (logs are written during execution).

## Related Documentation

- [API Best Practices](./09-api-best-practices.md) – OpenAPI/Swag and frontend client generation
- [Authentication & Authorization](./07-auth-system.md) – Permissions and context user
