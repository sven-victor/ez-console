// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package service

import (
	"slices"
	"sync"
)

// SkillActivationTracker holds skill IDs activated in the current chat stream via get_skill_content.
// It is safe for concurrent use (tool calls may run in goroutines).
type SkillActivationTracker struct {
	mu  sync.RWMutex
	ids map[string]struct{}
}

// NewSkillActivationTracker returns a tracker initialized with IDs persisted on the session.
func NewSkillActivationTracker(initial []string) *SkillActivationTracker {
	t := &SkillActivationTracker{ids: make(map[string]struct{})}
	for _, id := range initial {
		if id != "" {
			t.ids[id] = struct{}{}
		}
	}
	return t
}

// Snapshot returns a sorted copy of activated skill IDs.
func (t *SkillActivationTracker) Snapshot() []string {
	if t == nil {
		return nil
	}
	t.mu.RLock()
	defer t.mu.RUnlock()
	out := make([]string, 0, len(t.ids))
	for id := range t.ids {
		out = append(out, id)
	}
	slices.Sort(out)
	return out
}

// Add records a skill as activated for this stream.
func (t *SkillActivationTracker) Add(skillID string) {
	if t == nil || skillID == "" {
		return
	}
	t.mu.Lock()
	defer t.mu.Unlock()
	if t.ids == nil {
		t.ids = make(map[string]struct{})
	}
	t.ids[skillID] = struct{}{}
}

// Clear removes all activations (e.g. after conversation summarization).
func (t *SkillActivationTracker) Clear() {
	if t == nil {
		return
	}
	t.mu.Lock()
	defer t.mu.Unlock()
	t.ids = make(map[string]struct{})
}

// SkillChatStreamToolParams configures progressive skill–tool binding for a streaming completion.
type SkillChatStreamToolParams struct {
	SkillMetadataActive bool
	Activation          *SkillActivationTracker
}
