// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package model

// DisabledToolNamesFromConfig returns logical tool names marked disabled in toolset config.
func DisabledToolNamesFromConfig(c ToolSetConfig) map[string]struct{} {
	out := make(map[string]struct{})
	if c == nil {
		return out
	}
	raw, ok := c[ToolSetConfigKeyDisabledTools]
	if !ok || raw == nil {
		return out
	}
	switch v := raw.(type) {
	case []string:
		for _, s := range v {
			if s != "" {
				out[s] = struct{}{}
			}
		}
	case []interface{}:
		for _, it := range v {
			s, _ := it.(string)
			if s != "" {
				out[s] = struct{}{}
			}
		}
	}
	return out
}

// SkillIsEnabled reports whether the skill should be exposed to AI chat flows.
func SkillIsEnabled(s *Skill) bool {
	if s == nil {
		return false
	}
	return s.Status == "" || s.Status == SkillStatusEnabled
}
