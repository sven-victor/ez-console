// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package storage

import (
	"fmt"
	"strings"

	"github.com/spf13/afero"
)

// Open instantiates a storage Fs from a spec. Accepted forms:
//
//   - string without '=': a local directory path (driver "local")
//   - compact CLI string: `driver=s3,bucket=ez,prefix="a,b",force_path_style=true`
//   - map[string]any with a "driver" key, resolved through the driver registry
//
// Compact strings without a driver key are treated as a local path.
func Open(spec any) (afero.Fs, error) {
	switch data := spec.(type) {
	case string:
		if strings.Contains(data, "=") {
			cfg, err := ParseCompactConfig(data)
			if err != nil {
				return nil, err
			}
			if driver, _ := cfg["driver"].(string); driver != "" {
				return Open(cfg)
			}
		}
		return NewLocalFs(data)
	case map[string]any:
		driver, _ := data["driver"].(string)
		if driver == "" {
			return nil, fmt.Errorf("storage config requires a non-empty \"driver\" field (available: %v)", Drivers())
		}
		return Create(driver, data)
	case nil:
		return nil, fmt.Errorf("storage spec is empty")
	default:
		return nil, fmt.Errorf("unsupported storage config type: %T", spec)
	}
}

// DriverName returns the driver name encoded in a storage spec. A plain
// directory string (no '=') is reported as "local".
func DriverName(spec any) (string, error) {
	switch data := spec.(type) {
	case string:
		if strings.Contains(data, "=") {
			cfg, err := ParseCompactConfig(data)
			if err != nil {
				return "", err
			}
			if driver, _ := cfg["driver"].(string); driver != "" {
				return driver, nil
			}
		}
		return "local", nil
	case map[string]any:
		driver, _ := data["driver"].(string)
		if driver == "" {
			return "", fmt.Errorf("storage config requires a non-empty \"driver\" field (available: %v)", Drivers())
		}
		return driver, nil
	case nil:
		return "", fmt.Errorf("storage spec is empty")
	default:
		return "", fmt.Errorf("unsupported storage config type: %T", spec)
	}
}

// NeedsDatabase reports whether opening spec requires a live database
// connection (the built-in "db" driver).
func NeedsDatabase(spec any) bool {
	name, err := DriverName(spec)
	return err == nil && name == "db"
}
