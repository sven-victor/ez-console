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

// Package dbfs implements a database-backed afero.Fs storage driver
// ("driver: db"). Files are stored as metadata rows plus fixed-size content
// chunks in the application database, which makes it a zero-extra-infrastructure
// option for multi-node deployments (the database is already shared).
//
// It is intended for small-to-medium files (avatars, exports, skill files);
// large files or high-throughput downloads should use the s3 driver instead.
//
// The driver binds the database connection lazily: configuration is decoded
// before db.InitDB runs, so no database access happens at construction time.
package dbfs

import (
	"context"
	"fmt"
	"os"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/mitchellh/mapstructure"
	"github.com/spf13/afero"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/storage"
	"gorm.io/gorm"
)

const (
	// DefaultChunkSize keeps single chunk rows comfortably below common
	// MySQL max_allowed_packet limits while enabling cheap seeks.
	DefaultChunkSize = 1 << 20 // 1MB
	// DefaultMaxFileSize bounds the in-memory write buffer per open file.
	DefaultMaxFileSize = 64 << 20 // 64MB
)

func init() {
	storage.Register("db", New)
	db.RegisterModels(&StorageFile{}, &StorageChunk{})
}

// Config is the YAML configuration of the db storage driver.
type Config struct {
	// Namespace isolates multiple mount points (e.g. uploads vs skills)
	// inside the shared t_storage_file / t_storage_chunk tables.
	Namespace string `mapstructure:"namespace"`
	// ChunkSize is the content chunk size in bytes (default 1MB).
	ChunkSize int `mapstructure:"chunk_size"`
	// MaxFileSize is the maximum size of a single file; accepts plain bytes
	// or a string with a KB/MB/GB suffix (default 64MB). Writes are buffered
	// in memory before being committed transactionally, so this also bounds
	// per-upload memory usage.
	MaxFileSize any `mapstructure:"max_file_size"`
}

// New creates a db storage driver instance from its raw config map.
func New(cfg map[string]any) (afero.Fs, error) {
	var c Config
	decoder, err := mapstructure.NewDecoder(&mapstructure.DecoderConfig{
		Result:           &c,
		WeaklyTypedInput: true, // CLI compact form keeps numbers as strings
	})
	if err != nil {
		return nil, err
	}
	if err := decoder.Decode(cfg); err != nil {
		return nil, fmt.Errorf("invalid db storage config: %w", err)
	}
	if c.Namespace == "" {
		c.Namespace = "default"
	}
	chunkSize := c.ChunkSize
	if chunkSize <= 0 {
		chunkSize = DefaultChunkSize
	}
	maxFileSize, err := parseSize(c.MaxFileSize)
	if err != nil {
		return nil, fmt.Errorf("invalid db storage max_file_size: %w", err)
	}
	if maxFileSize <= 0 {
		maxFileSize = DefaultMaxFileSize
	}
	return &Fs{
		namespace:   c.Namespace,
		chunkSize:   chunkSize,
		maxFileSize: maxFileSize,
		session: func() *gorm.DB {
			// Lazy binding: config is loaded before db.InitDB, so the
			// connection is resolved on first use, not at construction.
			return db.Session(context.Background())
		},
	}, nil
}

// parseSize parses a size value that is either a number (bytes) or a string
// with an optional KB/MB/GB suffix (e.g. "10MB"). Nil returns 0.
func parseSize(v any) (int64, error) {
	switch v := v.(type) {
	case nil:
		return 0, nil
	case int:
		return int64(v), nil
	case int64:
		return v, nil
	case float64:
		return int64(v), nil
	case string:
		s := strings.TrimSpace(strings.ToUpper(v))
		if s == "" {
			return 0, nil
		}
		mult := int64(1)
		for _, unit := range []struct {
			suffix string
			mult   int64
		}{{"GB", 1 << 30}, {"MB", 1 << 20}, {"KB", 1 << 10}, {"B", 1}} {
			if strings.HasSuffix(s, unit.suffix) {
				s = strings.TrimSpace(strings.TrimSuffix(s, unit.suffix))
				mult = unit.mult
				break
			}
		}
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			return 0, fmt.Errorf("invalid size %q", v)
		}
		return n * mult, nil
	default:
		return 0, fmt.Errorf("invalid size type %T", v)
	}
}

// Fs is the database-backed afero.Fs. All paths are slash-separated and
// relative to the namespace root.
type Fs struct {
	namespace   string
	chunkSize   int
	maxFileSize int64
	session     func() *gorm.DB
}

var (
	_ afero.Fs              = (*Fs)(nil)
	_ storage.RemoteStorage = (*Fs)(nil)
)

// IsRemote reports that db storage is not local to the node
// (consumers such as the skill service materialize files locally).
func (f *Fs) IsRemote() bool { return true }

// Name returns the driver name.
func (f *Fs) Name() string { return "DBFS" }

// normPath normalizes a path to the canonical slash-separated relative form
// ("" refers to the namespace root).
func normPath(name string) string {
	name = strings.ReplaceAll(name, "\\", "/")
	name = path.Clean("/" + name)
	return strings.TrimPrefix(name, "/")
}

// parentOf returns the Parent column value for a normalized path.
func parentOf(p string) string {
	if idx := strings.LastIndex(p, "/"); idx >= 0 {
		return p[:idx]
	}
	return ""
}

func notExistErr(op, name string) error {
	return &os.PathError{Op: op, Path: name, Err: os.ErrNotExist}
}

func existErr(op, name string) error {
	return &os.PathError{Op: op, Path: name, Err: os.ErrExist}
}

// stat fetches the StorageFile row for a normalized path.
func (f *Fs) stat(tx *gorm.DB, p string) (*StorageFile, error) {
	var row StorageFile
	err := tx.Where("namespace = ? AND path = ?", f.namespace, p).First(&row).Error
	if err != nil {
		return nil, err
	}
	return &row, nil
}

// rootInfo is the synthetic os.FileInfo of the namespace root directory.
func (f *Fs) rootInfo() os.FileInfo {
	return fileInfo{name: "/", meta: StorageFile{IsDir: true, Mode: 0o755, ModTime: time.Now().UTC()}}
}

// Stat returns file info for name. The namespace root always exists.
func (f *Fs) Stat(name string) (os.FileInfo, error) {
	p := normPath(name)
	if p == "" {
		return f.rootInfo(), nil
	}
	row, err := f.stat(f.session(), p)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, notExistErr("stat", name)
		}
		return nil, fmt.Errorf("failed to stat %q: %w", name, err)
	}
	return fileInfo{name: path.Base(p), meta: *row}, nil
}

// Mkdir creates a directory (parents are created implicitly, like MkdirAll).
func (f *Fs) Mkdir(name string, perm os.FileMode) error {
	return f.MkdirAll(name, perm)
}

// MkdirAll creates a directory row for each missing path component.
func (f *Fs) MkdirAll(name string, perm os.FileMode) error {
	p := normPath(name)
	if p == "" {
		return nil
	}
	return f.mkdirAllTx(f.session(), p, perm)
}

func (f *Fs) mkdirAllTx(tx *gorm.DB, p string, perm os.FileMode) error {
	parts := strings.Split(p, "/")
	current := ""
	for _, part := range parts {
		if current == "" {
			current = part
		} else {
			current = current + "/" + part
		}
		row, err := f.stat(tx, current)
		if err == nil {
			if !row.IsDir {
				return existErr("mkdir", current)
			}
			continue
		}
		if err != gorm.ErrRecordNotFound {
			return fmt.Errorf("failed to check directory %q: %w", current, err)
		}
		dir := StorageFile{
			Namespace: f.namespace,
			Path:      current,
			Parent:    parentOf(current),
			Mode:      uint32(perm.Perm()),
			ModTime:   time.Now().UTC(),
			IsDir:     true,
		}
		if err := tx.Create(&dir).Error; err != nil {
			// A concurrent creator may have won the unique-index race;
			// re-check before failing.
			if row, statErr := f.stat(tx, current); statErr == nil && row.IsDir {
				continue
			}
			return fmt.Errorf("failed to create directory %q: %w", current, err)
		}
	}
	return nil
}

// Open opens a file or directory for reading.
func (f *Fs) Open(name string) (afero.File, error) {
	return f.OpenFile(name, os.O_RDONLY, 0)
}

// Create creates or truncates a file for writing.
func (f *Fs) Create(name string) (afero.File, error) {
	return f.OpenFile(name, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0o644)
}

// OpenFile opens a file. Write access is supported in truncate mode only
// (O_CREATE|O_TRUNC): content is buffered in memory and committed as a
// single transaction on Close, so a file never becomes visible half-written.
// O_APPEND and read-modify-write are not supported.
func (f *Fs) OpenFile(name string, flag int, perm os.FileMode) (afero.File, error) {
	p := normPath(name)
	if flag&(os.O_WRONLY|os.O_RDWR) != 0 {
		if flag&os.O_APPEND != 0 {
			return nil, &os.PathError{Op: "open", Path: name, Err: fmt.Errorf("append mode is not supported by the db storage driver")}
		}
		if p == "" {
			return nil, &os.PathError{Op: "open", Path: name, Err: fmt.Errorf("cannot open root for writing")}
		}
		row, err := f.stat(f.session(), p)
		if err == nil {
			if row.IsDir {
				return nil, &os.PathError{Op: "open", Path: name, Err: fmt.Errorf("is a directory")}
			}
			if flag&os.O_EXCL != 0 {
				return nil, existErr("open", name)
			}
			if flag&os.O_TRUNC == 0 {
				return nil, &os.PathError{Op: "open", Path: name, Err: fmt.Errorf("read-modify-write is not supported by the db storage driver (O_TRUNC required)")}
			}
		} else if err != gorm.ErrRecordNotFound {
			return nil, fmt.Errorf("failed to open %q: %w", name, err)
		} else if flag&os.O_CREATE == 0 {
			return nil, notExistErr("open", name)
		}
		return &file{fs: f, path: p, writable: true, perm: perm.Perm()}, nil
	}

	// Read-only.
	if p == "" {
		return &file{fs: f, path: p, meta: StorageFile{IsDir: true, Mode: 0o755, ModTime: time.Now().UTC()}}, nil
	}
	row, err := f.stat(f.session(), p)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, notExistErr("open", name)
		}
		return nil, fmt.Errorf("failed to open %q: %w", name, err)
	}
	return &file{fs: f, path: p, meta: *row}, nil
}

// Remove deletes a file or an empty directory.
func (f *Fs) Remove(name string) error {
	p := normPath(name)
	if p == "" {
		return &os.PathError{Op: "remove", Path: name, Err: fmt.Errorf("cannot remove root")}
	}
	return f.session().Transaction(func(tx *gorm.DB) error {
		row, err := f.stat(tx, p)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return notExistErr("remove", name)
			}
			return fmt.Errorf("failed to stat %q: %w", name, err)
		}
		if row.IsDir {
			var count int64
			if err := tx.Model(&StorageFile{}).Where("namespace = ? AND parent = ?", f.namespace, p).Count(&count).Error; err != nil {
				return fmt.Errorf("failed to check directory %q: %w", name, err)
			}
			if count > 0 {
				return &os.PathError{Op: "remove", Path: name, Err: fmt.Errorf("directory not empty")}
			}
		}
		return f.deleteRows(tx, []StorageFile{*row})
	})
}

// RemoveAll deletes a path and all its descendants. Removing a missing path
// is not an error (matching os.RemoveAll semantics).
func (f *Fs) RemoveAll(name string) error {
	p := normPath(name)
	return f.session().Transaction(func(tx *gorm.DB) error {
		rows, err := f.collectSubtree(tx, p)
		if err != nil {
			return err
		}
		return f.deleteRows(tx, rows)
	})
}

// collectSubtree returns the row for p (if any) plus all rows under p/.
// For the root ("") it returns every row in the namespace.
func (f *Fs) collectSubtree(tx *gorm.DB, p string) ([]StorageFile, error) {
	var rows []StorageFile
	query := tx.Where("namespace = ?", f.namespace)
	if p != "" {
		// Prefix match via LIKE, re-checked in Go to avoid wildcard pitfalls.
		query = query.Where("path = ? OR path LIKE ?", p, p+"/%")
	}
	if err := query.Find(&rows).Error; err != nil {
		return nil, fmt.Errorf("failed to list %q: %w", p, err)
	}
	if p == "" {
		return rows, nil
	}
	out := rows[:0]
	for _, row := range rows {
		if row.Path == p || strings.HasPrefix(row.Path, p+"/") {
			out = append(out, row)
		}
	}
	return out, nil
}

// deleteRows removes file rows and their chunks.
func (f *Fs) deleteRows(tx *gorm.DB, rows []StorageFile) error {
	if len(rows) == 0 {
		return nil
	}
	ids := make([]uint, 0, len(rows))
	for _, row := range rows {
		ids = append(ids, row.ID)
	}
	if err := tx.Where("file_id IN ?", ids).Delete(&StorageChunk{}).Error; err != nil {
		return fmt.Errorf("failed to delete file chunks: %w", err)
	}
	if err := tx.Where("id IN ?", ids).Delete(&StorageFile{}).Error; err != nil {
		return fmt.Errorf("failed to delete file rows: %w", err)
	}
	return nil
}

// Rename moves a file or directory (including descendants) to a new path.
func (f *Fs) Rename(oldname, newname string) error {
	oldPath := normPath(oldname)
	newPath := normPath(newname)
	if oldPath == "" || newPath == "" {
		return &os.PathError{Op: "rename", Path: oldname, Err: fmt.Errorf("cannot rename root")}
	}
	if oldPath == newPath {
		return nil
	}
	if strings.HasPrefix(newPath+"/", oldPath+"/") {
		return &os.PathError{Op: "rename", Path: oldname, Err: fmt.Errorf("cannot move a directory into itself")}
	}
	return f.session().Transaction(func(tx *gorm.DB) error {
		if _, err := f.stat(tx, newPath); err == nil {
			return existErr("rename", newname)
		} else if err != gorm.ErrRecordNotFound {
			return fmt.Errorf("failed to check rename target %q: %w", newname, err)
		}
		rows, err := f.collectSubtree(tx, oldPath)
		if err != nil {
			return err
		}
		if len(rows) == 0 {
			return notExistErr("rename", oldname)
		}
		if parent := parentOf(newPath); parent != "" {
			if err := f.mkdirAllTx(tx, parent, 0o755); err != nil {
				return err
			}
		}
		for _, row := range rows {
			updated := newPath + strings.TrimPrefix(row.Path, oldPath)
			if err := tx.Model(&StorageFile{}).Where("id = ?", row.ID).Updates(map[string]any{
				"path":   updated,
				"parent": parentOf(updated),
			}).Error; err != nil {
				return fmt.Errorf("failed to rename %q: %w", row.Path, err)
			}
		}
		return nil
	})
}

// Chmod updates the stored mode bits.
func (f *Fs) Chmod(name string, mode os.FileMode) error {
	p := normPath(name)
	if p == "" {
		return nil
	}
	result := f.session().Model(&StorageFile{}).
		Where("namespace = ? AND path = ?", f.namespace, p).
		Update("mode", uint32(mode.Perm()))
	if result.Error != nil {
		return fmt.Errorf("failed to chmod %q: %w", name, result.Error)
	}
	if result.RowsAffected == 0 {
		return notExistErr("chmod", name)
	}
	return nil
}

// Chown is a no-op: ownership is not tracked by the db storage driver.
func (f *Fs) Chown(name string, uid, gid int) error { return nil }

// Chtimes updates the stored modification time.
func (f *Fs) Chtimes(name string, atime time.Time, mtime time.Time) error {
	p := normPath(name)
	if p == "" {
		return nil
	}
	result := f.session().Model(&StorageFile{}).
		Where("namespace = ? AND path = ?", f.namespace, p).
		Update("mod_time", mtime.UTC())
	if result.Error != nil {
		return fmt.Errorf("failed to chtimes %q: %w", name, result.Error)
	}
	if result.RowsAffected == 0 {
		return notExistErr("chtimes", name)
	}
	return nil
}

// readDir lists the direct children of a normalized directory path.
func (f *Fs) readDir(p string) ([]os.FileInfo, error) {
	var rows []StorageFile
	if err := f.session().
		Where("namespace = ? AND parent = ?", f.namespace, p).
		Order("path").Find(&rows).Error; err != nil {
		return nil, fmt.Errorf("failed to read directory %q: %w", p, err)
	}
	infos := make([]os.FileInfo, 0, len(rows))
	for _, row := range rows {
		infos = append(infos, fileInfo{name: path.Base(row.Path), meta: row})
	}
	return infos, nil
}

// loadChunk fetches one content chunk of a file.
func (f *Fs) loadChunk(fileID uint, seq int) ([]byte, error) {
	var chunk StorageChunk
	if err := f.session().Where("file_id = ? AND seq = ?", fileID, seq).First(&chunk).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to load file chunk: %w", err)
	}
	return chunk.Data, nil
}

// commit transactionally persists a written file: it upserts the metadata
// row, replaces existing chunks, and creates missing parent directories.
func (f *Fs) commit(p string, perm os.FileMode, data []byte) error {
	now := time.Now().UTC()
	return f.session().Transaction(func(tx *gorm.DB) error {
		if parent := parentOf(p); parent != "" {
			if err := f.mkdirAllTx(tx, parent, 0o755); err != nil {
				return err
			}
		}
		row, err := f.stat(tx, p)
		if err == nil {
			if row.IsDir {
				return &os.PathError{Op: "write", Path: p, Err: fmt.Errorf("is a directory")}
			}
			if err := tx.Model(&StorageFile{}).Where("id = ?", row.ID).Updates(map[string]any{
				"size":     int64(len(data)),
				"mode":     uint32(perm),
				"mod_time": now,
			}).Error; err != nil {
				return fmt.Errorf("failed to update file %q: %w", p, err)
			}
			if err := tx.Where("file_id = ?", row.ID).Delete(&StorageChunk{}).Error; err != nil {
				return fmt.Errorf("failed to replace file chunks: %w", err)
			}
		} else if err == gorm.ErrRecordNotFound {
			row = &StorageFile{
				Namespace: f.namespace,
				Path:      p,
				Parent:    parentOf(p),
				Size:      int64(len(data)),
				Mode:      uint32(perm),
				ModTime:   now,
			}
			if err := tx.Create(row).Error; err != nil {
				return fmt.Errorf("failed to create file %q: %w", p, err)
			}
		} else {
			return fmt.Errorf("failed to check file %q: %w", p, err)
		}
		for seq := 0; seq*f.chunkSize < len(data); seq++ {
			end := (seq + 1) * f.chunkSize
			if end > len(data) {
				end = len(data)
			}
			chunk := StorageChunk{FileID: row.ID, Seq: seq, Data: data[seq*f.chunkSize : end]}
			if err := tx.Create(&chunk).Error; err != nil {
				return fmt.Errorf("failed to write file chunk: %w", err)
			}
		}
		return nil
	})
}
