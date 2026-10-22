// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.

package toolset

import "testing"

func TestUtilsDisallowsManualCreate(t *testing.T) {
	if AllowsManualCreate(ToolSetTypeUtils) {
		t.Fatal("utils toolset should not allow manual creation")
	}
	if _, ok := GetToolSetFactory(ToolSetTypeUtils); !ok {
		t.Fatal("utils toolset factory should stay registered")
	}
}
