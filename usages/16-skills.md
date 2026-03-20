# AI Agent Skills

This guide describes the AI Agent Skills feature in EZ-Console: how skills are stored, managed, and used in AI chat.

## Table of Contents

- [Overview](#overview)
- [Data Model and Storage](#data-model-and-storage)
- [SKILL.md Format](#skillmd-format)
- [Configuration](#configuration)
- [Management in the Console](#management-in-the-console)
- [APIs](#apis)
- [AI Integration](#ai-integration)
  - [Skills and organization tools loading](#skills-and-organization-tools-loading)
- [Registering Custom Domains](#registering-custom-domains)

## Overview

Skills are reusable instruction sets for AI agents. Each skill has:

- **Metadata** (name, description, category, domain) stored in the database
- **Files** (Markdown and optionally text) stored on disk under a configurable directory, one subdirectory per skill

When calling the AI chat API, you can pass optional **domains** and **skill_ids**. The system then:

- Injects a list of available skills (metadata only) into the system context
- Attaches a **skill loader toolset** so the model can call `get_skill_content` to load skill content on demand

Skills with domain **core** are always included when any skills are loaded; other domains filter which skills are available for that request.

## Data Model and Storage

### Skill model

The `Skill` model (see `pkg/model/skill.go`) has:

| Field       | Type   | Description                          |
|------------|--------|--------------------------------------|
| Base       | embedded | ID, ResourceID, timestamps        |
| Name       | string | Display name                         |
| Description| string | Short description                    |
| Category   | string | Category for grouping/filtering      |
| Domain     | string | Domain for scenario-based filtering (e.g. `core`, `document`) |

The table name is `t_skill`.

### File storage

Skill files are stored under a root directory, with one subdirectory per skill using the skill’s `ResourceID` (UUID). Example:

```
<skills_root>/
├── a38642a6-0365-11f1-9f11-dfc64b4ddbbf/
│   └── SKILL.md
├── e85f5a52-0365-11f1-83ac-cf01c307f2b8/
│   ├── SKILL.md
│   └── REFERENCE.md
└── 258f2baa-0366-11f1-8004-9b0bbdb771fa/
    ├── SKILL.md
    ├── resources/
    │   ├── examples.txt
    │   └── INSTALL.md
    └── scripts/
        └── examples.py.md
```

Only `.md` and `.txt` files are allowed. Paths are validated to prevent directory traversal (no `..`, no absolute paths).

## SKILL.md Format

Each skill has a main file **SKILL.md** (or **SKILLS.md**). The backend accepts both names.

- **Upload**: When you upload a single `.md` file or a `.zip`, the service looks for `SKILL.md` or `SKILLS.md` and parses YAML frontmatter to set **name** and **description** for the new skill.
- **Create (API)**: Creating a skill without upload generates a default SKILL.md with frontmatter filled from the request (name, description, category, domain).

Example frontmatter:

```yaml
---
name: My Skill
description: Instructions for the agent in this scenario.
---
# Body (Markdown)
...
```

The service uses `parseSkillFrontmatter` and `defaultSkillMDContent` in `pkg/service/skill_service.go`.

## Configuration

In `pkg/config/config.go`, `ServerConfig` has:

- **skills_path** (optional): Root directory for skill files. If empty, the system uses `file_upload_path + "/skills"`.
- **file_upload_path**: Used when `skills_path` is not set.

Ensure the process has read/write permissions to the chosen directory.

## Management in the Console

Under **System Settings**, the **Skills** tab provides:

- **List**: Paginated table with search and domain filter; columns include name, description, category, domain, and actions.
- **Create**: Modal to create a skill (name, description, category, domain) with optional initial SKILL.md content.
- **Edit**: Update metadata (name, description, category, domain).
- **Upload**: Upload a single `.md` file or a `.zip` containing a skill (root must contain SKILL.md or SKILLS.md); name/description are taken from frontmatter.
- **Preview**: View concatenated Markdown for a skill (SKILL.md plus other `.md` files in order).
- **Edit files**: Open the file editor for a skill:
  - Tree of files and folders; only `.md` and `.txt` are allowed.
  - Create file/folder, rename, delete, drag-and-drop to move.
  - For Markdown files, split view: editor + live preview.

Routes and components:

- Settings tab: `web/src/pages/system/settings/SystemSettings/SkillSettings.tsx`
- File editor: `web/src/pages/system/settings/SystemSettings/SkillEditor.tsx`
- Preview: `web/src/pages/system/settings/SystemSettings/SkillPreview.tsx`

## APIs

All skill HTTP APIs are under `/api/system/skills` and are documented with Swag in `pkg/api/system/skill_controller.go`. Regenerate the OpenAPI spec and frontend client with:

```bash
make clean-openapi clean-openapi2ts openapi2ts
```

### Summary

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/system/skills` | List skills (paginated; query: current, page_size, search, category, domain) |
| GET | `/api/system/skills/domains` | List skill domains (default + registered) |
| POST | `/api/system/skills` | Create skill (body: name, description, category, domain, optional content) |
| GET | `/api/system/skills/:id` | Get skill by ID |
| PUT | `/api/system/skills/:id` | Update skill metadata |
| DELETE | `/api/system/skills/:id` | Delete skill and its files |
| POST | `/api/system/skills/upload` | Upload skill (.md or .zip) |
| GET | `/api/system/skills/:id/preview` | Get concatenated skill content for preview |
| GET | `/api/system/skills/:id/files` | List file tree |
| GET | `/api/system/skills/:id/files/*path` | Get file content |
| PUT | `/api/system/skills/:id/files/*path` | Create or overwrite file |
| POST | `/api/system/skills/:id/dirs` | Create directory (body: path) |
| DELETE | `/api/system/skills/:id/files/*path` | Delete file or directory |
| PUT | `/api/system/skills/:id/move-path` | Move/rename file or directory (body: from_path, to_path) |
| GET | `/api/system/skills/:id/ai-tool-bindings` | List AI tool bindings for a skill (requires `X-Scope-OrgID`) |
| PUT | `/api/system/skills/:id/ai-tool-bindings` | Replace all bindings for that skill in the scoped org (body: `bindings: [{ toolset_id, tool_name }]`) |

### Permissions

- `system:skills:view` – list, get, preview, list domains
- `system:skills:create` – create skill, upload
- `system:skills:update` – update metadata
- `system:skills:delete` – delete skill
- `system:skills:edit_files` – list/edit/delete/move files and dirs

## AI Integration

Implementation reference (streaming chat path):

- `pkg/api/ai/ai_chat_controller.go` — `StreamChat`: when to inject metadata, `SkillLoaderToolSet`, `SkillChatStreamToolParams`, `OnSummary` clearing `activated_skill_ids`.
- `pkg/service/ai_chat_service.go` — `CreateChatCompletionStream`: `orgToolSetsFactory`, `RefreshToolSetsEachIteration`, `skillParams *SkillChatStreamToolParams`.
- `pkg/service/toolset_service.go` — `GetAuthorizedToolSetsForChat`, `SkillChatBindingMode`.
- `pkg/service/skill_loader_toolset.go` — `NewSkillLoaderToolSet`, `SkillLoaderOptions.OnSkillContentLoaded`.
- `pkg/model/ai_chat.go` — `AIChatSession.ActivatedSkillIDs` (`JSONStringSlice`).
- `pkg/clients/ai/classic_client.go` — refreshes merged tool sets before each LLM iteration when the option is set.
- `pkg/clients/ai/skill_content_redact.go` — redacts `skill_loader_get_skill_content` tool results for summarization.

There are **two tool layers** in chat:

1. **Organization toolsets** (MCP, utils, custom toolsets, …): whatever the user’s roles allow in the current org, subject to skill–tool binding rules below.
2. **Skill loader** (map key `skill_loader`): registered only when the chat request results in non-empty skill **metadata** (`domains` / `skill_ids` → `LoadSkillsMetadataForChat` produces text). The model sees tools as **`skill_loader_get_skill_content`** (namespace prefix + tool name).

### Skills and organization tools loading

**When the request does not load skills** (no `domains` and `skill_ids`, or metadata resolves empty):

- **`skill_loader` is not** attached.
- **`CreateChatCompletionStream`** is called with `skillParams == nil`.
- **Organization tools**: always the **full** RBAC-authorized set for the org (`GetAuthorizedToolSetsForChat` with `SkillChatBindingDisabled` if binding is off, or `SkillChatBindingNoMetadata` if binding is on). **Turning on `system_enable_skill_tool_binding` does not restrict tools** unless the same request also injects skill metadata.

**When the request loads skills** (non-empty metadata system message + `SkillLoaderToolSet`):

- **`SkillChatStreamToolParams`** is set with `SkillMetadataActive: true` and a **`SkillActivationTracker`** seeded from **`session.activated_skill_ids`** (persisted JSON array on `t_ai_chat_sessions`).
- On each successful **`get_skill_content`** call, **`OnSkillContentLoaded`** runs: **`AppendSessionActivatedSkill`** (DB) and **`activation.Add`** (in-memory). Organization tool visibility can change **before the next LLM call** because the stream uses an **uncached** org tool factory and **`RefreshToolSetsEachIteration`** when binding is on and metadata is active.

**`system_enable_skill_tool_binding` and organization toolsets**

| Skill metadata in this chat? | Binding setting | Organization toolsets exposed to the model |
|------------------------------|-----------------|---------------------------------------------|
| No | Off | Full authorized (`SkillChatBindingDisabled`) |
| No | On | Full authorized (`SkillChatBindingNoMetadata`) — same effective outcome as off |
| Yes | Off | Full authorized; binding logic skipped |
| Yes | On, **no** skill activated yet (`get_skill_content` never succeeded this session) | **None** (`SkillChatBindingAwaitingActivation`) — empty org tool map; only `skill_loader`, client tools, etc. |
| Yes | On, **at least one** activated skill ID | Narrowed by rows in **`t_skill_ai_tool_bindings`** for those activated IDs only (`SkillChatBindingApply`). If there are **no** binding rows for that set, behavior matches “no bindings”: **full** authorized org tools. |

**Summarization (token-driven auto-summary in the stream client)**

- **`OnSummary`**: clears **`SkillActivationTracker`** and **`ClearSessionActivatedSkills`** (wipes `activated_skill_ids` in DB).
- Summarizer input uses **`RedactGetSkillContentToolResultsForSummary`**: large **`get_skill_content`** tool results are replaced with a short placeholder so summaries stay small. The model must call **`get_skill_content`** again after a summary if it needs file bodies.

### Chat request

When sending a message (e.g. `POST /api/ai/chat/sessions/:sessionId`), the request body can include:

- **domains** (optional): Slice of domain names. Loaded skills are those with `domain = 'core'` or `domain` in this list.
- **skill_ids** (optional): Slice of skill resource IDs to include in addition to domain-based skills.

If either `domains` or `skill_ids` is non-empty **and** `LoadSkillsMetadataForChat` returns non-empty text:

1. **System context**: The backend appends the metadata (id, name, description, domain) and instructs the model to use **`get_skill_content`** to load bodies on demand.
2. **Toolset**: A **`SkillLoaderToolSet`** is registered under key **`skill_loader`**, exposing **`get_skill_content(skill_id, path?)`**. Omit **`path`** for combined SKILL.md + other `.md` content.

The model can load skill files only when needed, keeping initial context small.

### Example chat request with skills

```json
POST /api/ai/chat/sessions/:sessionId
{
  "content": "Summarize the tracing docs.",
  "domains": ["document"],
  "skill_ids": ["e85f5a52-0365-11f1-83ac-cf01c307f2b8"]
}
```

This injects metadata and the skill loader. If **`system_enable_skill_tool_binding`** is on, organization tools appear only after **`get_skill_content`** succeeds for at least one in-scope skill (unless there are no binding rows for the activated set, in which case full authorized tools apply).

### Skill ↔ AI tool bindings (optional)

When **`system_enable_skill_tool_binding`** is enabled:

- **Bindings** are stored per organization in **`t_skill_ai_tool_bindings`** (`skill_id`, `organization_id`, `toolset_id`, `tool_name`). **`toolset_id`** is the toolset **resource ID** or **`*`** (any authorized toolset in that org). **`tool_name`** is the logical tool name (as in role AI permissions) or **`*`**. Examples: `*:sleep`, `<uuid>:*`, `<uuid>:sleep`.
- **UI**: Base system settings expose the toggle. The Skills edit modal shows the tool picker when the feature is on (`listToolSets?include_tools=true`, `X-Scope-OrgID`), same pattern as role AI tool permissions.

When the setting is **off**, bindings are ignored and the Skills UI does not show tool linking. See [Skills and organization tools loading](#skills-and-organization-tools-loading) for the full decision table and persistence behavior.

## Registering Custom Domains

By default, the only domain returned by “list domains” and used for loading is **core**. To add domains (e.g. for scenario-based filtering), call:

```go
import "github.com/sven-victor/ez-console/pkg/service"

func init() {
    service.RegisterSkillsDomain("document")
    service.RegisterSkillsDomain("monitoring")
}
```

Registration is idempotent. Skills with `domain = "document"` or `domain = "monitoring"` will then be included when the chat request specifies those domains.
