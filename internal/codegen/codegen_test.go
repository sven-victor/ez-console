// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package codegen

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestDeriveEntityNames(t *testing.T) {
	cases := []struct {
		in, wantPlural, wantResource, wantLower string
	}{
		{"Product", "Products", "products", "product"},
		{"Party", "Parties", "parties", "party"},
		{"Day", "Days", "days", "day"},
		{"Person", "People", "people", "person"},
	}
	for _, tc := range cases {
		n := DeriveEntityNames(tc.in)
		if n.Plural != tc.wantPlural {
			t.Fatalf("%q Plural: got %q want %q", tc.in, n.Plural, tc.wantPlural)
		}
		if n.Resource != tc.wantResource {
			t.Fatalf("%q Resource: got %q want %q", tc.in, n.Resource, tc.wantResource)
		}
		if n.Lower != tc.wantLower {
			t.Fatalf("%q Lower: got %q want %q", tc.in, n.Lower, tc.wantLower)
		}
	}
}

func TestValidatePascalName(t *testing.T) {
	if err := ValidatePascalName(""); err == nil {
		t.Fatal("expected error for empty")
	}
	if err := ValidatePascalName("product"); err == nil {
		t.Fatal("expected error for lowercase start")
	}
	if err := ValidatePascalName("Product"); err != nil {
		t.Fatal(err)
	}
}

func TestGenerateModel(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "go.mod"), []byte("module example.com/test/app\n\ngo 1.24.4\n"), 0o644); err != nil {
		t.Fatal(err)
	}
	out := filepath.Join(dir, "model", "widget.go")
	if err := Generate(GenerateOptions{
		Kind:   GenerateModel,
		Name:   "Widget",
		Dir:    dir,
		Output: out,
	}); err != nil {
		t.Fatal(err)
	}
	b, err := os.ReadFile(out)
	if err != nil {
		t.Fatal(err)
	}
	s := string(b)
	if !strings.Contains(s, "type Widget struct") {
		t.Fatalf("missing type: %s", s)
	}
	if !strings.Contains(s, "func (w *Widget) TableName()") {
		t.Fatalf("missing TableName: %s", s)
	}
}

func TestInitProject(t *testing.T) {
	dir := t.TempDir()
	sub := filepath.Join(dir, "app")
	if err := InitProject(InitProjectOptions{
		TargetDir:   sub,
		ServiceName: "testsvc",
		GoModule:    "example.com/app/backend",
	}); err != nil {
		t.Fatal(err)
	}
	for _, rel := range []string{
		"Makefile",
		"backend/go.mod",
		"backend/main.go",
		"backend/config.yaml",
		"backend/controller/api.go",
		"web/package.json",
		"web/vite.config.ts",
		"web/src/App.tsx",
	} {
		p := filepath.Join(sub, rel)
		if _, err := os.Stat(p); err != nil {
			t.Fatalf("missing %s: %v", rel, err)
		}
	}
	b, _ := os.ReadFile(filepath.Join(sub, "web/package.json"))
	if !strings.Contains(string(b), `"start": "vite"`) {
		t.Fatalf("package.json missing start script: %s", b)
	}
	v, _ := os.ReadFile(filepath.Join(sub, "web/vite.config.ts"))
	if !strings.Contains(string(v), "'/api'") || !strings.Contains(string(v), "'/console'") {
		t.Fatalf("vite proxy missing: %s", v)
	}
}

func TestNpmCaretVersion(t *testing.T) {
	if npmCaretVersion("v1.2.3") != "^1.2.3" {
		t.Fatal(npmCaretVersion("v1.2.3"))
	}
}

func TestImportPathForPackageDir(t *testing.T) {
	modRoot := "/proj/backend"
	mod := "example.com/foo/backend"
	got, err := ImportPathForPackageDir(modRoot, mod, filepath.Join(modRoot, "model"))
	if err != nil {
		t.Fatal(err)
	}
	if got != "example.com/foo/backend/model" {
		t.Fatalf("got %q", got)
	}
}
