// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package service

import (
	"testing"

	"github.com/sven-victor/ez-console/pkg/model"
)

func TestSkillBindingMatches(t *testing.T) {
	bindings := []model.SkillAIToolBinding{
		{ToolSetID: "*", ToolName: "sleep"},
		{ToolSetID: "ts-1", ToolName: "*"},
		{ToolSetID: "ts-2", ToolName: "ping"},
	}

	if !SkillBindingMatches(bindings, "any-ts", "sleep") {
		t.Fatal("expected *:sleep to match any toolset")
	}
	if !SkillBindingMatches(bindings, "ts-1", "anything") {
		t.Fatal("expected ts-1:* to match any tool name")
	}
	if !SkillBindingMatches(bindings, "ts-2", "ping") {
		t.Fatal("expected concrete binding to match")
	}
	if SkillBindingMatches(bindings, "ts-2", "other") {
		t.Fatal("expected no match for wrong tool name")
	}
	if !SkillBindingMatches(bindings, "ts-3", "sleep") {
		t.Fatal("expected *:sleep to match any toolset with tool sleep")
	}
}
