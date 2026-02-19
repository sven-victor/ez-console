# Task Management Module

This guide describes the Task Management module: background task execution, registry-based task types, and how to use and extend it.

## Overview

The Task Management module provides:

- **Background task execution**: Tasks run in a worker pool with configurable concurrency.
- **Registry-based task types**: Extensible task types via `pkg/task`; no built-in task types by default.
- **Real-time progress and status**: Progress (0–100) and status (pending, running, success, failed, cancelled) are stored and can be polled by the frontend.
- **Cancellation and retry**: Running or pending tasks can be cancelled; failed or cancelled tasks can be retried.
- **Artifact download**: Tasks can attach an artifact file key; users download via the existing file API.
- **Creator-based visibility**: Non-admin users see only their own tasks; admins see all.
- **Completion callbacks**: Optional in-process callbacks when a task completes (success or failure).

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Other      │     │  TaskService │     │  Task Type      │
│  Modules    │───▶│  CreateTask  │───▶│  Registry       │
│  (e.g.      │     │  Get/List/   │     │  (pkg/task)     │
│   Export)   │     │  Cancel/     │     │                 │
└─────────────┘     │  Retry/Delete│     └────────┬────────┘
                    └──────┬───────┘              │
                           │                      │ GetTaskRunner
                           ▼                      ▼
                    ┌───────────────┐     ┌─────────────────┐
                    │  Worker Pool  │───▶│  TaskRunner     │
                    │  (configurable│     │  Run(ctx, task, │
                    │   concurrency)│     │  progress,      │
                    └───────────────┘     │  cancelCh)      │
                                          └─────────────────┘
```

- **Task creation** is only via `TaskService.CreateTask` (no HTTP POST). Other modules (e.g. export) call it and get a task ID.
- **Worker pool** reads max concurrency from system setting `task_max_concurrent` (default 10), polls for pending tasks, claims one, gets a runner from the registry, and runs it with progress callback and cancel channel.
- **Task types** are registered with `task.RegisterTaskType(typeName, factory)`. Each type has a `TaskRunnerFactory` that creates a `TaskRunner` implementing `Run(ctx, task, progressCallback, cancelCh)`.

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

### Header Task Dropdown

- **Location**: Header (next to org switcher / language), shown when user has `task:list`. Rendered in `Layout` as `TaskListDropdown`.
- **Data and state**: Task list and dropdown open state are held in **SiteContext** (`web/src/contexts/SiteContext.tsx`), not inside the dropdown component:
  - **`tasks`**: Array of recent tasks for the current user (from `GET /api/userTasks`).
  - **`tasksDropdownOpen` / `setTasksDropdownOpen`**: Whether the dropdown is open; used for controlled open state and to drive polling.
  - **`addTask(task)`**: Appends a task to the list and opens the dropdown. Call this when a new task is created (e.g. after starting an export) so the user sees it immediately in the header.
- **Fetch and polling**: SiteContext uses `api.userTasks.listUserTasks()` with polling: **every 3 seconds** when the dropdown is open (`tasksDropdownOpen === true`), **every 60 seconds** when closed. Fetch also runs once when the dropdown is opened.
- **TaskListDropdown** (`web/src/components/TaskListDropdown.tsx`): A presentational component that reads `tasks`, `tasksDropdownOpen`, and `setTasksDropdownOpen` from `useSite()`. It renders the dropdown overlay (type, status, progress, Download, More link to `/tasks`) and does not perform its own data fetching.

### System Setting: Max Concurrent Tasks

- **Location**: System Settings → Task Settings tab
- **Permission**: `system:settings:update`
- **Setting key**: `task_max_concurrent` (integer, default 10)
- **Effect**: Maximum number of tasks that run at the same time.

## Permissions

| Code           | Description                    | Typical roles   |
|----------------|--------------------------------|-----------------|
| `task:list`    | List tasks (own or all)        | admin, operator, viewer |
| `task:view`    | View task detail               | admin, operator, viewer |
| `task:cancel`  | Cancel running/pending task    | admin, operator |
| `task:retry`   | Retry failed/cancelled task    | admin, operator |
| `task:delete`  | Delete task                    | admin, operator |

Non-admin users are restricted to their own tasks for list and detail; admins see all.

## API Reference

All task APIs require authentication.

| Method | Path                  | Permission  | Description                |
|--------|-----------------------|------------|----------------------------|
| GET    | `/api/tasks`          | task:list  | List tasks (paginated)     |
| GET    | `/api/tasks/:id`      | task:view  | Get one task              |
| POST   | `/api/tasks/:id/cancel` | task:cancel | Cancel task             |
| POST   | `/api/tasks/:id/retry`  | task:retry | Retry task              |
| DELETE | `/api/tasks/:id`      | task:delete | Delete task (soft)      |

**List query parameters**: `current`, `page_size`, `search` (optional). Admins see all tasks; others see only their own.

### User tasks for header dropdown (`/api/userTasks`)

| Method | Path             | Permission | Description |
|--------|------------------|------------|-------------|
| GET    | `/api/userTasks` | (auth only)| List current user's recent tasks for the header dropdown. |

- **Authentication**: Required (no separate permission; any logged-in user can call).
- **Response**: Array of tasks (not paginated). Returns up to 10 tasks that are either (a) created in the last 24 hours, or (b) currently `running` or `pending`.
- **Use case**: The header task dropdown uses this API to show the current user's recent tasks and allow quick access to View/Download. The full task list page uses `/api/tasks` with pagination and `task:list`.

**Artifact download**: Use the task’s `artifact_file_key` with the existing file API: `GET /api/files/:fileKey`.

There is **no** HTTP API to create tasks; creation is done in code via `TaskService.CreateTask`. Modules that need to expose "create task" to the frontend (e.g. user export) provide their own POST endpoint that calls `TaskService.CreateTask` and returns the task.

## For Module Developers: Creating Tasks

### Creating a task from another module

Obtain `*service.TaskService` from the main `*service.Service` and call `CreateTask` with a request-scoped context (so creator is set from the current user):

```go
// In your handler or service (ctx has user from middleware)
task, err := svc.TaskService.CreateTask(ctx, "export", 
    service.WithPayload(`{"scope":"users"}`),
    service.WithMaxRetries(2),
    service.WithOnComplete(func(taskID string, status string, result interface{}, err error) {
        // Notify user, update UI, etc.
    }),
)
if err != nil {
    return err
}
// task.ResourceID is the task ID; worker will pick it up and run when a runner for "export" is registered.
```

Options:

- **WithPayload(payload string)**: Optional JSON or string stored on the task for the runner to read.
- **WithMaxRetries(n int)**: Max retries (runner is invoked again on retry).
- **WithOnComplete(cb TaskCompletionCallback)**: Called when the task finishes (success, failed, or cancelled).

Creator is taken from `middleware.GetUserIDFromContext(ctx)`; if empty, `"system"` is used.

### Example: User export

User export is a full example of a module that creates a task via an HTTP endpoint, runs it in the background, and lets the user see and download the result from the header task dropdown.

- **Permission**: `authorization:user:export` (create user export task).
- **API**: `POST /api/authorization/users/export`. Optional body: `{ "keywords": "", "status": "" }` to filter users. Returns the created task (same shape as task list items).
- **Backend**: `UserController.CreateUserExportTask` calls `TaskService.CreateTask(ctx, "user_export", WithPayload(payload), WithMaxRetries(1))` and returns the task. The task type `user_export` is registered in `pkg/api/authorization/user_export_runner.go` via `RegisterUserExportTask(svc)` at server startup.
- **Runner**: `userExportRunner` in `user_export_runner.go` parses payload (keywords, status), paginates over users, writes CSV, uploads via `FileService.UploadFileWithOwner` with owner = task creator, then calls `TaskService.SetTaskArtifact(ctx, taskID, fileKey, filename)`. Progress is reported during the loop; cancellation is respected via `cancelCh`.
- **Frontend**: On the user list page (`UserList`), an Export button (guarded by `authorization:user:export`) calls `api.authorization.createUserExportTask({ keywords, status })`. On success, it calls `addTask(res)` from `useSite()` so the new task appears in the header dropdown and the dropdown opens. The user can watch progress and download the CSV from the dropdown or the task detail page when the task completes.

This pattern (POST endpoint → CreateTask → return task; frontend addTask + open dropdown) can be reused for other export or long-running operations.

## For Module Developers: Registering a Task Type

Task execution is pluggable: register a task type and its runner so the worker can execute it.

### 1. Implement TaskRunner

`TaskRunner` runs a single task. It must respect the cancel channel and may call the progress callback.

```go
package mypackage

import (
    "context"
    "github.com/sven-victor/ez-console/pkg/model"
    "github.com/sven-victor/ez-console/pkg/task"
)

type ExportRunner struct{}

func (r *ExportRunner) Run(
    ctx context.Context,
    t *model.Task,
    progressCallback task.ProgressCallback,
    cancelCh <-chan struct{},
) (interface{}, error) {
    // 1. Parse t.Payload if needed
    // 2. Do work in a loop, calling progressCallback(percent) and checking cancelCh
    for i := 0; i <= 100; i += 10 {
        select {
        case <-cancelCh:
            return nil, task.ErrCancelled
        default:
            progressCallback(i)
            // ... do chunk of work
        }
    }
    // 3. On success, optionally set artifact via TaskService.SetTaskArtifact (if your module has access to it)
    return map[string]string{"rows": "42"}, nil
}
```

- Return `task.ErrCancelled` when the task is cancelled so the service can set status to cancelled.
- Return a non-nil error for failure; the service will set status to failed and store the error message.
- Return `(result, nil)` for success; result can be JSON-serialized and stored in the task’s result field.

### 2. Implement TaskRunnerFactory and register

```go
type ExportRunnerFactory struct{}

func (f *ExportRunnerFactory) CreateRunner() (task.TaskRunner, error) {
    return &ExportRunner{}, nil
}

func init() {
    task.RegisterTaskType("export", &ExportRunnerFactory{})
}
```

Register in `init()` so the type is available when the worker starts. The worker calls `task.GetTaskRunner(task.Type)` to get a runner for each pending task.

### 3. Setting the artifact (e.g. export file)

When your runner produces a file, it should associate it with the task. The runner does not receive `TaskService` in `Run`; options:

- Have the runner return a result that includes a file key, and have a completion callback (registered with `WithOnComplete`) call `TaskService.SetTaskArtifact(ctx, taskID, fileKey)` after the task succeeds; or
- Create the file in your own service before/after running, then call `SetTaskArtifact` in the same place you create the task or in the completion callback.

Artifact download uses the existing file API; the file should be readable by the task creator (e.g. owner = creator).

## Task Model (summary)

| Field             | Type      | Description                          |
|-------------------|-----------|--------------------------------------|
| id (ResourceID)   | string    | UUID                                 |
| type              | string    | Task type key for registry           |
| status            | enum      | pending, running, success, failed, cancelled |
| progress          | int       | 0–100                                |
| result            | string    | JSON or text result                  |
| error             | string    | Last error message if failed         |
| creator_id        | string    | User ID of creator                   |
| artifact_file_key | string    | Optional file key for download       |
| retry_count       | int       | Number of retries                    |
| max_retries       | int       | Max retries allowed                  |
| started_at        | *time     | When run started                    |
| finished_at       | *time     | When run finished                   |
| payload           | string    | Optional input for the runner       |

## Configuration

- **Max concurrent tasks**: System Settings → Task Settings → “Max concurrent tasks” (default 10). Stored as `task_max_concurrent` in the settings table.

## Troubleshooting

- **Task stays “pending”**: Ensure a runner is registered for the task’s `type` via `task.RegisterTaskType`. Ensure the server has restarted after registering so the worker pool and registry are loaded.
- **“task type not registered”**: The worker sets status to failed with this message when `task.GetTaskRunner(task.Type)` returns false. Add a `RegisterTaskType` call for that type (e.g. in `init()` of the package that implements the runner).
- **Creator or admin only**: List and get APIs filter by `creator_id` for non-admin users. Use a context with the correct user when calling from backend code if you need to simulate a user.

## Related Documentation

- [API Best Practices](./09-api-best-practices.md) – OpenAPI/Swag and frontend client generation
- [Authentication & Authorization](./07-auth-system.md) – Permissions and context user
