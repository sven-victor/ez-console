# In-App Messages (Inbox)

This guide describes the user-scoped inbox: persisted in-app messages, REST list/read APIs, and the realtime SSE push channel. Email remains on `EmailService`. There is no organization field, no unified `Notify` dispatcher, and no IM/webhook adapters.

See also [Email Notification Module](./21-email-notification-module.md) for SMTP templates and which events still send mail.

## Overview

- **Account-scoped**: every row is keyed by `user_id`. Switching organization does **not** reconnect the inbox stream.
- **No public “send” HTTP API**: application code calls `InboxService.CreateInboxMessage`. The UI only lists, marks read, and subscribes to the stream.
- **Persist first**: insert the row, then publish `inbox.wakeup` with `{user_id}`. Each SSE connection tracks a `(created_at, resource_id)` cursor and loads newer rows from the table so EventBus `coalesce=true` cannot drop a message. Do **not** compare UUID `resource_id` with `>`.
- **Typed SSE envelope**: events use `event_type` (`message`, `sync`) so other realtime payloads (for example task progress) can be added later without changing the hub.

## Go API

Service: `pkg/service/inbox.go` (on `BaseService`, factory `NewInboxService` / `WithInboxServiceFactory`).

```go
msg, err := svc.CreateInboxMessage(ctx, userID, model.InboxMessagePasswordExpiry, map[string]any{
    "DaysLeft": 3,
})
```

| Method | Purpose |
|--------|---------|
| `CreateInboxMessage` | Insert a row, trim the per-user cap, publish `inbox.wakeup` |
| `ListInboxMessages` | Paginated list (`current`, `page_size`, optional unread-only) |
| `CountUnreadInbox` | Unread count |
| `MarkInboxRead` / `MarkAllInboxRead` | Mark read (then wakeup so other tabs sync) |
| `ListInboxSince` / `CursorFromLastEventID` | Catch-up for SSE |
| `InboxHub` | Per-process connection hub |

Create/email failures at call sites only log; they must not fail the caller. Helper: `tryCreateInboxForUser`.

Model: `pkg/model/inbox_message.go` (`t_inbox_message`). JSON `payload` stores type-specific fields (`FullName`, `DaysLeft`, …). The UI translates by `type`.

Retention (constants, not settings):

- TTL **90 days**
- Per-user cap **500** (oldest deleted)
- Daily job `inbox_cleanup_task` (`inbox-cleanup`)

## HTTP APIs

Auth middleware only (own messages; no extra RBAC), same idea as `listUserTasks`.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/inbox/messages` | List (`current`, `page_size`, optional `unread`) |
| GET | `/api/inbox/unread-count` | Unread count |
| POST | `/api/inbox/messages/:id/read` | Mark one message read |
| POST | `/api/inbox/read-all` | Mark all read |
| GET | `/api/inbox/stream` | SSE; honor `Last-Event-ID` |

SSE headers: `text/event-stream`, `Cache-Control: no-cache`, `X-Accel-Buffering: no`. Heartbeat `: ping` every 15s. `SetWriteDeadline(now+60s)` on **every** write, not once at handshake.

Event payload:

```json
{
  "event_type": "message",
  "message": { "id": "...", "type": "password_expiry", "payload": {}, "read_at": null }
}
```

```json
{ "event_type": "sync", "unread_count": 2 }
```

The OpenAPI TypeScript client is generated for the REST endpoints only. `GET /api/inbox/stream` is stripped in `web/scripts/openapi.js`; the frontend hook calls `request(..., { requestType: 'sse' })`.

After API changes:

```bash
make clean-openapi clean-openapi2ts openapi2ts
```

## Built-in events

| Event | Inbox | Email |
|-------|-------|-------|
| Password expiry reminder | yes | yes |
| Login-failure lock | yes | yes |
| MFA disabled | yes | yes |
| Inactive account auto-lock | no (user cannot sign in) | yes |

Transactional mail (activation, MFA code, password reset) stays on `EmailService` only.

## Frontend

- Header bell (latest 20 + unread badge) next to the task dropdown
- Page `/inbox` with standard table pagination
- Login starts the SSE stream; logout aborts it; reconnect sends `Last-Event-ID`
- i18n namespace `inbox` in all seven languages

## Reverse proxy

See [Deployment](./12-deployment.md): nginx `/api` must keep SSE alive for **both** Chat and inbox (`proxy_buffering off`, `proxy_http_version 1.1`, `proxy_read_timeout` > 15s). Do not raise global `server.write_timeout`.
