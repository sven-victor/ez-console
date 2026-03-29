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
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// FindGoMod walks up from startDir and returns the directory containing go.mod.
func FindGoMod(startDir string) (string, error) {
	dir, err := filepath.Abs(startDir)
	if err != nil {
		return "", err
	}
	for {
		modPath := filepath.Join(dir, "go.mod")
		if st, err := os.Stat(modPath); err == nil && !st.IsDir() {
			return dir, nil
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			return "", fmt.Errorf("go.mod not found from %s", startDir)
		}
		dir = parent
	}
}

// ParseModulePath reads the module path from go.mod in moduleRoot.
func ParseModulePath(moduleRoot string) (string, error) {
	f, err := os.Open(filepath.Join(moduleRoot, "go.mod"))
	if err != nil {
		return "", err
	}
	defer f.Close()
	sc := bufio.NewScanner(f)
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if strings.HasPrefix(line, "module ") {
			mod := strings.TrimSpace(strings.TrimPrefix(line, "module"))
			mod = strings.Trim(mod, `"`)
			if mod == "" {
				return "", fmt.Errorf("empty module directive in go.mod")
			}
			return mod, nil
		}
	}
	return "", fmt.Errorf("module directive not found in go.mod")
}

// ImportPathForPackageDir returns the Go import path for a package directory under moduleRoot.
func ImportPathForPackageDir(moduleRoot, modulePath, pkgDir string) (string, error) {
	rel, err := filepath.Rel(moduleRoot, pkgDir)
	if err != nil {
		return "", err
	}
	rel = filepath.ToSlash(rel)
	if rel == "." {
		return modulePath, nil
	}
	return modulePath + "/" + rel, nil
}
