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

// Package storage provides a pluggable file-storage driver registry built on
// top of afero.Fs. Drivers register themselves by name (usually from an
// init() function) and are instantiated from configuration maps found in
// config.yaml (e.g. server.file_upload_path / server.skills_path).
//
// Built-in drivers:
//   - "local": local disk (registered by this package, zero dependencies)
//   - "db":    database-backed storage (pkg/storage/dbfs, registered via
//     blank import; the in-repo server binary imports it by default)
//   - "s3":    S3-compatible object storage (pkg/storage/s3, a separate Go
//     module; users must blank-import it in their main package)
//
// Optional capabilities are discovered via type assertion on the driver's
// root afero.Fs (see PresignerStorage and RemoteStorage). Because assertions
// cannot see through wrappers, a driver Fs must never be wrapped in
// afero.NewBasePathFs before the capability helpers are used; the helpers in
// this package only unwrap afero.Afero.
package storage

import (
	"context"
	"errors"
	"fmt"
	"sort"
	"sync"
	"time"

	"github.com/spf13/afero"
)

// Factory creates a driver root Fs from its raw configuration map
// (the YAML mapping under server.file_upload_path / server.skills_path).
// Factories must not perform I/O against external systems at construction
// time: configuration is loaded before database connections or network
// clients are available, so drivers must bind such resources lazily.
type Factory func(cfg map[string]any) (afero.Fs, error)

var (
	driversMu sync.RWMutex
	drivers   = map[string]Factory{}
)

// Register registers a storage driver factory under the given name.
// It is intended to be called from driver package init() functions and
// panics on duplicate registration to surface programming errors early.
func Register(name string, factory Factory) {
	if name == "" || factory == nil {
		panic("storage: Register requires a non-empty name and a non-nil factory")
	}
	driversMu.Lock()
	defer driversMu.Unlock()
	if _, ok := drivers[name]; ok {
		panic(fmt.Sprintf("storage: driver %q is already registered", name))
	}
	drivers[name] = factory
}

// Drivers returns the sorted list of registered driver names.
func Drivers() []string {
	driversMu.RLock()
	defer driversMu.RUnlock()
	names := make([]string, 0, len(drivers))
	for name := range drivers {
		names = append(names, name)
	}
	sort.Strings(names)
	return names
}

// Create instantiates a driver by name with the given configuration map.
func Create(name string, cfg map[string]any) (afero.Fs, error) {
	driversMu.RLock()
	factory, ok := drivers[name]
	driversMu.RUnlock()
	if !ok {
		return nil, fmt.Errorf(
			"storage driver %q is not registered (available: %v); external drivers must be imported, e.g. `import _ \"github.com/sven-victor/ez-console/pkg/storage/s3\"`",
			name, Drivers())
	}
	fs, err := factory(cfg)
	if err != nil {
		return nil, fmt.Errorf("failed to create storage driver %q: %w", name, err)
	}
	return fs, nil
}

// ErrPresignNotSupported is returned by PresignGetURL when the storage
// backend cannot produce presigned URLs (either the driver does not
// implement PresignerStorage, or presigning is disabled by configuration).
// Callers should fall back to streaming the file through the server.
var ErrPresignNotSupported = errors.New("presign is not supported by this storage driver")

// PresignerStorage is an optional capability interface for storage drivers
// that can produce presigned download URLs pointing directly at the backend
// (e.g. S3), letting clients download without proxying through the server.
// Implementations may return ErrPresignNotSupported to disable presigning at
// runtime (e.g. private MinIO endpoints not reachable from browsers).
type PresignerStorage interface {
	PresignGetURL(ctx context.Context, key string, expiry time.Duration, contentDisposition string) (string, error)
}

// RemoteStorage is an optional capability interface for storage drivers
// whose data does not live on the local node's disk (object storage,
// database, ...). Consumers use it to make locality decisions, e.g. the
// skill service materializes skill files to a local cache when the skills
// storage is remote.
type RemoteStorage interface {
	IsRemote() bool
}

// unwrap peels afero.Afero wrappers so capability assertions reach the
// driver's root Fs. It intentionally does not unwrap afero.BasePathFs
// (its source field is unexported); capability checks must therefore be
// performed on the un-wrapped root Fs.
func unwrap(fs afero.Fs) afero.Fs {
	for {
		switch v := fs.(type) {
		case afero.Afero:
			fs = v.Fs
		case *afero.Afero:
			fs = v.Fs
		default:
			return fs
		}
	}
}

// PresignGetURL asserts the PresignerStorage capability on fs (unwrapping
// afero.Afero) and delegates to it. Returns ErrPresignNotSupported when the
// capability is missing.
func PresignGetURL(ctx context.Context, fs afero.Fs, key string, expiry time.Duration, contentDisposition string) (string, error) {
	if presigner, ok := unwrap(fs).(PresignerStorage); ok {
		return presigner.PresignGetURL(ctx, key, expiry, contentDisposition)
	}
	return "", ErrPresignNotSupported
}

// IsRemote reports whether fs is backed by remote storage (unwrapping
// afero.Afero). Drivers that do not implement RemoteStorage are local.
func IsRemote(fs afero.Fs) bool {
	if remote, ok := unwrap(fs).(RemoteStorage); ok {
		return remote.IsRemote()
	}
	return false
}
