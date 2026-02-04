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
- [Registering Custom Domains](#registering-custom-domains)

## Overview

Skills are reusable instruction sets for AI agents. Each skill has:

- **Metadata** (name, description, category, domain) stored in the database
- **Files** (Markdown and optionally text) stored on disk under a configurable directory, one subdirectory per skill

When calling the AI chat API, you can pass optional **domains** and **skill_ids**. The system then:

- Injects a list of available skills (metadata only) into the system context
- Attaches a **skill loader toolset** so the model can call `get_skill_content` and `list_skill_files` to load skill content on demand

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

### Permissions

- `system:skills:view` – list, get, preview, list domains
- `system:skills:create` – create skill, upload
- `system:skills:update` – update metadata
- `system:skills:delete` – delete skill
- `system:skills:edit_files` – list/edit/delete/move files and dirs

## AI Integration

### Chat request

When sending a message (e.g. `POST /api/ai/chat/sessions/:sessionId`), the request body can include:

- **domains** (optional): Slice of domain names. Loaded skills are those with `domain = 'core'` or `domain` in this list.
- **skill_ids** (optional): Slice of skill resource IDs to include in addition to domain-based skills.

If either `domains` or `skill_ids` is non-empty:

1. **System context**: The backend calls `SkillService.LoadSkillsMetadataForChat(ctx, domains, skill_ids)` and appends the result to the system prompt. This text lists available skills (id, name, description, domain) and instructs the model to use the tools `get_skill_content` and `list_skill_files` to load content on demand.
2. **Toolset**: A `SkillLoaderToolSet` is built for the same `domains` and `skill_ids` and registered for the chat. It exposes:
   - **get_skill_content(skill_id, path?)**: Load full skill content or a specific file under the skill. Omit `path` for the combined SKILL.md + other .md content.
   - **list_skill_files(skill_id, path?)**: List entries under a path (default root). Returns names and whether each entry is a directory.

The model can thus decide when to load which skill content, keeping context smaller when only metadata is needed.

### Example chat request with skills

```json
POST /api/ai/chat/sessions/:sessionId
{
  "content": "Summarize the tracing docs.",
  "domains": ["document"],
  "skill_ids": ["e85f5a52-0365-11f1-83ac-cf01c307f2b8"]
}
```

This makes skills in the `document` domain and the given skill ID available via the injected metadata and the skill loader tools.

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
