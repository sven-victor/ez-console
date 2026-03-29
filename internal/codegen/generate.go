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
	"bytes"
	"embed"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"text/template"
)

//go:embed templates/*.tpl
var templateFS embed.FS

// GenerateKind is controller, model, or service.
type GenerateKind string

const (
	GenerateController GenerateKind = "controller"
	GenerateModel      GenerateKind = "model"
	GenerateService    GenerateKind = "service"
)

// GenerateOptions configures a single generate run.
type GenerateOptions struct {
	Kind          GenerateKind
	Name          string // PascalCase entity name
	Dir           string // working directory (for go.mod discovery and default paths)
	Output        string // file path; if empty, derived from Kind and Dir
	Module        string // Go module path override; if empty, parsed from go.mod
	ModelImport   string // optional override for model import path
	ServiceImport string // optional override for service import path
}

// Generate writes one generated file from templates.
func Generate(opts GenerateOptions) error {
	if err := ValidatePascalName(opts.Name); err != nil {
		return err
	}
	if opts.Kind != GenerateController && opts.Kind != GenerateModel && opts.Kind != GenerateService {
		return fmt.Errorf("invalid kind %q", opts.Kind)
	}
	names := DeriveEntityNames(opts.Name)
	if names.Name == "" {
		return fmt.Errorf("invalid entity name %q", opts.Name)
	}

	dir := opts.Dir
	if dir == "" {
		dir = "."
	}
	modRoot, err := FindGoMod(dir)
	if err != nil {
		return err
	}
	modulePath := opts.Module
	if modulePath == "" {
		modulePath, err = ParseModulePath(modRoot)
		if err != nil {
			return err
		}
	}

	outPath := opts.Output
	if outPath == "" {
		sub := string(opts.Kind)
		snake := names.Lower
		outPath = filepath.Join(dir, sub, snake+".go")
	} else {
		outPath, err = filepath.Abs(outPath)
		if err != nil {
			return err
		}
	}

	outDir := filepath.Dir(outPath)
	parent := filepath.Dir(outDir)
	modelDir := filepath.Join(parent, "model")
	serviceDir := filepath.Join(parent, "service")

	modelImport := opts.ModelImport
	if modelImport == "" {
		modelImport, err = ImportPathForPackageDir(modRoot, modulePath, modelDir)
		if err != nil {
			return err
		}
	}
	serviceImport := opts.ServiceImport
	if serviceImport == "" {
		serviceImport, err = ImportPathForPackageDir(modRoot, modulePath, serviceDir)
		if err != nil {
			return err
		}
	}

	tplName := string(opts.Kind) + ".go.tpl"
	tplBytes, err := templateFS.ReadFile(filepath.ToSlash(filepath.Join("templates", tplName)))
	if err != nil {
		return err
	}
	tmpl, err := template.New(tplName).Parse(string(tplBytes))
	if err != nil {
		return err
	}

	data := struct {
		EntityNames
		ServiceImport string
		ModelImport   string
	}{
		EntityNames:   names,
		ServiceImport: serviceImport,
		ModelImport:   modelImport,
	}

	var buf bytes.Buffer
	if err := tmpl.Execute(&buf, data); err != nil {
		return err
	}

	if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
		return err
	}
	if err := os.WriteFile(outPath, buf.Bytes(), 0o644); err != nil {
		return err
	}
	return nil
}

// ValidatePascalName returns an error if s is not a simple PascalCase identifier.
func ValidatePascalName(s string) error {
	s = strings.TrimSpace(s)
	if s == "" {
		return fmt.Errorf("name must not be empty")
	}
	for i, r := range s {
		if i == 0 {
			if r < 'A' || r > 'Z' {
				return fmt.Errorf("name must start with an uppercase letter")
			}
			continue
		}
		if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') || (r >= '0' && r <= '9') {
			continue
		}
		return fmt.Errorf("name must be alphanumeric (PascalCase)")
	}
	return nil
}
