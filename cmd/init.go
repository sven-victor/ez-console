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
	"fmt"

	"github.com/spf13/cobra"
	"github.com/sven-victor/ez-console/internal/codegen"
)

var (
	initServiceName      string
	initGoModule         string
	initAppVersion       string
	initEzConsoleVersion string
	initDescription      string
)

func init() {
	initCmd := &cobra.Command{
		Use:   "init [target-dir]",
		Short: "Scaffold a minimal EZ-Console backend and web app",
		Long: `Creates backend/, web/, Makefile, and backend/config.yaml under the target directory.
After scaffolding, run "make build" from the project root, "go run main.go" from backend/,
and "pnpm run start" from web/.`,
		Args: cobra.ExactArgs(1),
		RunE: func(_ *cobra.Command, args []string) error {
			if initServiceName == "" {
				return fmt.Errorf("--name is required")
			}
			if initGoModule == "" {
				return fmt.Errorf("--go-module is required")
			}
			return codegen.InitProject(codegen.InitProjectOptions{
				TargetDir:      args[0],
				ServiceName:    initServiceName,
				GoModule:       initGoModule,
				AppVersion:     initAppVersion,
				EzConsoleGoMod: initEzConsoleVersion,
				AppDescription: initDescription,
			})
		},
	}
	initCmd.Flags().StringVar(&initServiceName, "name", "", "service name for NewCommandServer and sqlite db file (required)")
	initCmd.Flags().StringVar(&initGoModule, "go-module", "", "Go module path for backend/go.mod (required)")
	initCmd.Flags().StringVar(&initAppVersion, "app-version", "0.1.0", "application version string")
	initCmd.Flags().StringVar(&initEzConsoleVersion, "ez-console-version", "v1.12.0", "github.com/sven-victor/ez-console module version")
	initCmd.Flags().StringVar(&initDescription, "description", "", "short description for NewCommandServer")

	_ = initCmd.MarkFlagRequired("name")
	_ = initCmd.MarkFlagRequired("go-module")

	rootCmd.AddCommand(initCmd)
}
