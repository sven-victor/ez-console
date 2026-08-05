# Email Notification Module

This guide explains the SMTP dynamic field registration model and user notification jobs for password-expiry and account-lock workflows.

## Overview

The Email Notification module provides:

- **SMTP connection settings**: host, port, encryption, sender, credentials, and admin receivers.
- **Dynamic SMTP template fields**: template fields are registered in backend code and rendered by frontend from `/api/system/smtp-settings/fields`.
- **Password expiry reminder task**: hourly scan and one email per password cycle.
- **Account lock notifications**:
  - login-failure lock notification (sent when lock is triggered),
  - inactive-account auto-lock notification (hourly scan).

## SMTP Field Registration

SMTP template fields are registered in:

- `pkg/model/system_smtp_setting.go`

The registration API:

- `RegisterSMTPSettingField(field, enumOptionsProvider)`
- `GetRegisteredSMTPSettingFields()`

Field metadata model:

- `key`
- `value_type` (`string`, `number`, `percentage`, `rich_text`, `string_list`, `enum`)
- `default_value`
- `label_key`
- `tooltip_key`
- optional numeric bounds: `min`, `max`, `step`
- optional enum values: `enum_options` (resolved by provider at query time)

## SMTP Fields API

| Method | Path | Permission | Description |
|---|---|---|---|
| GET | `/api/system/smtp-settings/fields` | `system:settings:view` | Returns registered SMTP dynamic field definitions. |
| GET | `/api/system/smtp-settings` | `system:settings:view` | Returns SMTP settings values. |
| PUT | `/api/system/smtp-settings` | `system:settings:update` | Updates SMTP settings values. |
| POST | `/api/system/smtp-settings/test` | `system:settings:update` | Sends one test email. |

Frontend SMTP page keeps base connection fields static and renders template fields dynamically from `/fields`.

## Notification Settings

### Security settings

- `password_expiry_days`: password lifecycle length (0 disables expiry).
- `password_expiry_notify_days`: days before expiry to send reminder (0 disables reminder).
- `user_inactive_days`: days of inactivity before auto lock (0 disables auto lock).

### SMTP template settings

- `smtp_password_expiry_template`
- `smtp_login_failure_lock_template`
- `smtp_inactive_lock_template`

The legacy `smtp_user_locked_template` key remains for compatibility, but lock notifications use dedicated templates above.

## User Extension Table

Model:

- `pkg/model/authorization_user_ext.go`

Table stores per-user notification state:

- `user_id` (unique)
- `password_expiry_notify_at` (nullable)

Purpose:

- Ensure password-expiry reminder is sent only once per password cycle.

Reset behavior:

- reset to `NULL` after password cycle changes:
  - user activates account,
  - user changes password,
  - admin resets password.

## Scheduled Jobs

Jobs are registered when `NewUserService` initializes (not in `init()`):

- `pkg/service/authorization_user_notification_jobs.go`

### Password Expiry Notification

- **Job ID**: `password-expiry-notify`
- **Cron**: `0 * * * *`
- **Task Type**: `password_expiry_notification_task`
- **Logic**:
  - read security settings,
  - find active users with upcoming password expiry,
  - apply LDAP password-management rule (`ldap_allow_manage_user_password`),
  - skip users already notified after current `password_changed_at`,
  - send reminder email and update `password_expiry_notify_at`.

### Inactive Account Lock

- **Job ID**: `inactive-account-lock`
- **Cron**: `0 * * * *`
- **Task Type**: `inactive_account_lock_task`
- **Logic**:
  - scan active users,
  - lock accounts that exceed inactivity threshold,
  - send inactive-lock template email once when lock action occurs.

## Login Failure Lock Email

When a user reaches login-failure lock threshold, the system sends email using:

- `SettingSMTPLoginFailureLockTemplate`

Implemented in:

- `pkg/service/authorization_user.go`

LDAP and local login failure paths are both covered by existing lock flow.

## OpenAPI and Frontend API Generation

After backend API/schema changes, always regenerate OpenAPI and frontend client:

```bash
make clean-openapi clean-openapi2ts openapi2ts
```

Do not manually edit generated files in:

- `openapi/`
- `web/src/service/api/`

## Developer Notes

- Keep all comments and error messages in English.
- For new SMTP dynamic fields, prefer registration + `/fields` contract instead of hardcoded frontend form items.
- For any new reminder requiring per-cycle deduplication, extend `UserExt` instead of embedding transient state in scheduler memory.
