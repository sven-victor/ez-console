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

package cmd

import (
	"github.com/spf13/cobra"
	"github.com/sven-victor/ez-console/internal/codegen"
)

var (
	generateDir           string
	generateOutput        string
	generateModule        string
	generateModelImport   string
	generateServiceImport string
)

func init() {
	generateCmd := &cobra.Command{
		Use:   "generate",
		Short: "Generate controller, model, or service boilerplate",
	}
	generateCmd.PersistentFlags().StringVar(&generateDir, "dir", ".", "directory used to locate go.mod and default output paths")
	generateCmd.PersistentFlags().StringVarP(&generateOutput, "output", "o", "", "output file path (default: <dir>/<kind>/<snake>.go)")
	generateCmd.PersistentFlags().StringVar(&generateModule, "module", "", "Go module path (default: from go.mod)")
	generateCmd.PersistentFlags().StringVar(&generateModelImport, "model-import", "", "override import path for the model package")
	generateCmd.PersistentFlags().StringVar(&generateServiceImport, "service-import", "", "override import path for the service package")

	run := func(kind codegen.GenerateKind) func(*cobra.Command, []string) error {
		return func(_ *cobra.Command, args []string) error {
			return codegen.Generate(codegen.GenerateOptions{
				Kind:          kind,
				Name:          args[0],
				Dir:           generateDir,
				Output:        generateOutput,
				Module:        generateModule,
				ModelImport:   generateModelImport,
				ServiceImport: generateServiceImport,
			})
		}
	}

	controllerCmd := &cobra.Command{
		Use:   "controller [Name]",
		Short: "Generate a Gin controller with REST stubs and route registration",
		Args:  cobra.ExactArgs(1),
		RunE:  run(codegen.GenerateController),
	}
	modelCmd := &cobra.Command{
		Use:   "model [Name]",
		Short: "Generate a GORM model with UUID primary key",
		Args:  cobra.ExactArgs(1),
		RunE:  run(codegen.GenerateModel),
	}
	serviceCmd := &cobra.Command{
		Use:   "service [Name]",
		Short: "Generate a service using pkg/db Session",
		Args:  cobra.ExactArgs(1),
		RunE:  run(codegen.GenerateService),
	}

	generateCmd.AddCommand(controllerCmd, modelCmd, serviceCmd)
	rootCmd.AddCommand(generateCmd)
}
