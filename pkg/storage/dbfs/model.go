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

package dbfs

import (
	"io/fs"
	"time"
)

// StorageFile is one file or directory entry stored in the database.
// Content is stored separately in StorageChunk rows so that large files do
// not require a single oversized BLOB row (avoids max_allowed_packet issues
// on MySQL and enables cheap seeking).
type StorageFile struct {
	ID        uint   `gorm:"primarykey"`
	Namespace string `gorm:"type:varchar(64);not null;uniqueIndex:idx_storage_file_ns_path,priority:1;index:idx_storage_file_ns_parent,priority:1"`
	// Path is the full slash-separated path relative to the namespace root
	// (no leading slash), e.g. "2026-01/1757512345.png".
	Path string `gorm:"type:varchar(512);not null;uniqueIndex:idx_storage_file_ns_path,priority:2"`
	// Parent is the directory portion of Path ("" for top-level entries),
	// indexed to make ReadDir a single indexed query.
	Parent  string    `gorm:"type:varchar(512);not null;index:idx_storage_file_ns_parent,priority:2"`
	Size    int64     `gorm:"not null;default:0"`
	Mode    uint32    `gorm:"not null;default:420"` // 420 == 0o644
	ModTime time.Time `gorm:"not null"`
	IsDir   bool      `gorm:"not null;default:false"`
}

// TableName returns the table name for StorageFile.
func (StorageFile) TableName() string { return "t_storage_file" }

// StorageChunk holds one content chunk of a StorageFile.
// mediumblob holds up to 16MB on MySQL; SQLite treats it as BLOB affinity.
type StorageChunk struct {
	FileID uint   `gorm:"primaryKey;autoIncrement:false"`
	Seq    int    `gorm:"primaryKey;autoIncrement:false"`
	Data   []byte `gorm:"type:mediumblob"`
}

// TableName returns the table name for StorageChunk.
func (StorageChunk) TableName() string { return "t_storage_chunk" }

// fileInfo adapts StorageFile to os.FileInfo.
type fileInfo struct {
	name string
	meta StorageFile
}

func (i fileInfo) Name() string { return i.name }
func (i fileInfo) Size() int64  { return i.meta.Size }
func (i fileInfo) Mode() fs.FileMode {
	if i.meta.IsDir {
		return fs.FileMode(i.meta.Mode) | fs.ModeDir
	}
	return fs.FileMode(i.meta.Mode)
}
func (i fileInfo) ModTime() time.Time { return i.meta.ModTime }
func (i fileInfo) IsDir() bool        { return i.meta.IsDir }
func (i fileInfo) Sys() any           { return nil }
