// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package preset

func init() {
	RegisterPresetSkill(PresetSkillSpec{
		PresetKey:   "builtin-utils",
		Name:        "Built-in utilities",
		Description: "Access to preset utility tools (time, delays, random strings) when skill–tool binding is enabled.",
		Category:    "system",
		Domain:      "core",
		DefaultBindings: []PresetToolBinding{
			{ToolSetType: "utils", ToolName: "*"},
		},
	})
}
