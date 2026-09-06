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
	"os"
	"path/filepath"

	"github.com/spf13/afero"
)

func init() {
	Register("local", func(cfg map[string]any) (afero.Fs, error) {
		path, _ := cfg["path"].(string)
		if path == "" {
			return nil, fmt.Errorf("local storage driver requires a non-empty \"path\"")
		}
		return NewLocalFs(path)
	})
}

// NewLocalFs returns a local-disk afero.Fs rooted at path, creating the
// directory if it does not exist. This is the default storage backend and
// also backs the plain-string form of the storage configuration
// (e.g. `file_upload_path: ./uploads`).
func NewLocalFs(path string) (afero.Fs, error) {
	absPath, err := filepath.Abs(path)
	if err != nil {
		return nil, fmt.Errorf("failed to get absolute path: %w", err)
	}
	if _, err := os.Stat(absPath); os.IsNotExist(err) {
		if err := os.MkdirAll(absPath, 0o755); err != nil {
			return nil, fmt.Errorf("failed to create directory: %w", err)
		}
	}
	return afero.NewBasePathFs(afero.NewOsFs(), absPath), nil
}
