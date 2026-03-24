// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package preset

import (
	"fmt"
	"sync"
)

var (
	toolSetMu     sync.RWMutex
	presetToolSet []PresetToolSetSpec

	skillMu     sync.RWMutex
	presetSkill []PresetSkillSpec
)

// RegisterPresetToolSet registers a built-in toolset definition. Call from init() next to RegisterToolSet.
func RegisterPresetToolSet(spec PresetToolSetSpec) {
	if spec.PresetKey == "" {
		panic("preset: PresetToolSetSpec.PresetKey is required")
	}
	if spec.Type == "" {
		panic(fmt.Sprintf("preset: toolset type is required for preset key %q", spec.PresetKey))
	}
	toolSetMu.Lock()
	defer toolSetMu.Unlock()
	for _, existing := range presetToolSet {
		if existing.PresetKey == spec.PresetKey {
			panic(fmt.Sprintf("preset: duplicate PresetToolSet key %q", spec.PresetKey))
		}
	}
	presetToolSet = append(presetToolSet, spec)
}

// RegisterPresetTools is an alias for RegisterPresetToolSet.
func RegisterPresetTools(spec PresetToolSetSpec) {
	RegisterPresetToolSet(spec)
}

// RegisterPresetSkill registers a global preset skill and optional default bindings per organization.
func RegisterPresetSkill(spec PresetSkillSpec) {
	if spec.PresetKey == "" {
		panic("preset: PresetSkillSpec.PresetKey is required")
	}
	skillMu.Lock()
	defer skillMu.Unlock()
	for _, existing := range presetSkill {
		if existing.PresetKey == spec.PresetKey {
			panic(fmt.Sprintf("preset: duplicate PresetSkill key %q", spec.PresetKey))
		}
	}
	presetSkill = append(presetSkill, spec)
}

// RegisteredPresetToolSets returns a copy of registered preset toolset specs.
func RegisteredPresetToolSets() []PresetToolSetSpec {
	toolSetMu.RLock()
	defer toolSetMu.RUnlock()
	out := make([]PresetToolSetSpec, len(presetToolSet))
	copy(out, presetToolSet)
	return out
}

// RegisteredPresetSkills returns a copy of registered preset skill specs.
func RegisteredPresetSkills() []PresetSkillSpec {
	skillMu.RLock()
	defer skillMu.RUnlock()
	out := make([]PresetSkillSpec, len(presetSkill))
	copy(out, presetSkill)
	return out
}
