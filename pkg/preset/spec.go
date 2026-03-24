// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package preset

// PresetToolSetSpec describes a built-in toolset row created per organization at startup.
// Type is the registered toolset type string (e.g. "utils"); it must match RegisterToolSet.
// DefaultConfig is merged into the DB toolset config (same keys as API config); omit or nil for none.
type PresetToolSetSpec struct {
	PresetKey     string
	Type          string
	Name          string
	Description   string
	DefaultConfig map[string]interface{}
}

// PresetToolBinding links a preset skill to tools using toolset type (e.g. "utils") and tool name or "*".
// ToolSetType is stored in SkillAIToolBinding.ToolSetID at sync time (same column as resource IDs).
type PresetToolBinding struct {
	ToolSetType string
	ToolName    string
}

// PresetSkillSpec describes a global preset skill and default per-organization AI tool bindings.
type PresetSkillSpec struct {
	PresetKey       string
	Name            string
	Description     string
	Category        string
	Domain          string
	InitialMarkdown string // full SKILL.md body if empty, default frontmatter-only content is generated at sync
	DefaultBindings []PresetToolBinding
}
