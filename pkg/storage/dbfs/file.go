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
	"fmt"
	"io"
	"os"
	"path"
	"time"

	"github.com/spf13/afero"
)

// file is an open handle on a db-backed file or directory.
//
// Read mode streams chunks on demand and supports Seek (used by
// http.ServeContent for size probing and Range requests).
// Write mode buffers content in memory and commits transactionally on Close,
// so partially-written files are never visible.
type file struct {
	fs   *Fs
	path string // normalized; "" = namespace root
	meta StorageFile

	// read state
	offset    int64
	chunkSeq  int
	chunkData []byte
	dirInfos  []os.FileInfo
	dirPos    int
	dirLoaded bool

	// write state
	writable bool
	perm     os.FileMode
	buf      []byte

	closed bool
}

var _ afero.File = (*file)(nil)

func (f *file) Name() string {
	if f.path == "" {
		return "/"
	}
	return f.path
}

// Read reads from the current offset, loading content chunks on demand.
func (f *file) Read(p []byte) (int, error) {
	n, err := f.ReadAt(p, f.offset)
	f.offset += int64(n)
	return n, err
}

// ReadAt reads len(p) bytes starting at byte offset off.
func (f *file) ReadAt(p []byte, off int64) (int, error) {
	if f.closed {
		return 0, os.ErrClosed
	}
	if f.writable {
		return 0, fmt.Errorf("file %q is open for writing", f.path)
	}
	if f.meta.IsDir {
		return 0, fmt.Errorf("%q is a directory", f.path)
	}
	if off >= f.meta.Size {
		return 0, io.EOF
	}
	total := 0
	for total < len(p) && off < f.meta.Size {
		seq := int(off / int64(f.fs.chunkSize))
		chunkOff := int(off % int64(f.fs.chunkSize))
		if f.chunkData == nil || f.chunkSeq != seq {
			data, err := f.fs.loadChunk(f.meta.ID, seq)
			if err != nil {
				return total, err
			}
			if data == nil {
				return total, io.ErrUnexpectedEOF
			}
			f.chunkSeq = seq
			f.chunkData = data
		}
		if chunkOff >= len(f.chunkData) {
			return total, io.ErrUnexpectedEOF
		}
		n := copy(p[total:], f.chunkData[chunkOff:])
		total += n
		off += int64(n)
	}
	if total == 0 {
		return 0, io.EOF
	}
	return total, nil
}

// Seek sets the read offset. Seeking is cheap: chunks are located by index.
func (f *file) Seek(offset int64, whence int) (int64, error) {
	if f.closed {
		return 0, os.ErrClosed
	}
	if f.writable {
		return 0, fmt.Errorf("seek is not supported on files open for writing")
	}
	var abs int64
	switch whence {
	case io.SeekStart:
		abs = offset
	case io.SeekCurrent:
		abs = f.offset + offset
	case io.SeekEnd:
		abs = f.meta.Size + offset
	default:
		return 0, fmt.Errorf("invalid seek whence %d", whence)
	}
	if abs < 0 {
		return 0, fmt.Errorf("negative seek position %d", abs)
	}
	f.offset = abs
	return abs, nil
}

// Write appends to the in-memory buffer (committed on Close).
func (f *file) Write(p []byte) (int, error) {
	if f.closed {
		return 0, os.ErrClosed
	}
	if !f.writable {
		return 0, fmt.Errorf("file %q is read-only", f.path)
	}
	if int64(len(f.buf)+len(p)) > f.fs.maxFileSize {
		return 0, fmt.Errorf("file %q exceeds the maximum allowed size of %d bytes", f.path, f.fs.maxFileSize)
	}
	f.buf = append(f.buf, p...)
	return len(p), nil
}

func (f *file) WriteAt(p []byte, off int64) (int, error) {
	return 0, fmt.Errorf("WriteAt is not supported by the db storage driver")
}

func (f *file) WriteString(s string) (int, error) {
	return f.Write([]byte(s))
}

// Truncate resizes the in-memory write buffer.
func (f *file) Truncate(size int64) error {
	if !f.writable {
		return fmt.Errorf("truncate is not supported on read-only files")
	}
	if size > int64(len(f.buf)) {
		f.buf = append(f.buf, make([]byte, size-int64(len(f.buf)))...)
	} else {
		f.buf = f.buf[:size]
	}
	return nil
}

// Sync is a no-op: content is committed atomically on Close.
func (f *file) Sync() error { return nil }

// Stat returns the file info. For files open for writing it reflects the
// current buffer size.
func (f *file) Stat() (os.FileInfo, error) {
	name := path.Base(f.path)
	if f.path == "" {
		name = "/"
	}
	if f.writable {
		meta := StorageFile{Size: int64(len(f.buf)), Mode: uint32(f.perm), ModTime: time.Now().UTC()}
		return fileInfo{name: name, meta: meta}, nil
	}
	return fileInfo{name: name, meta: f.meta}, nil
}

// Readdir lists directory entries. count <= 0 returns all remaining entries.
func (f *file) Readdir(count int) ([]os.FileInfo, error) {
	if f.closed {
		return nil, os.ErrClosed
	}
	if !f.meta.IsDir && f.path != "" {
		return nil, fmt.Errorf("%q is not a directory", f.path)
	}
	if !f.dirLoaded {
		infos, err := f.fs.readDir(f.path)
		if err != nil {
			return nil, err
		}
		f.dirInfos = infos
		f.dirLoaded = true
	}
	if count <= 0 {
		out := f.dirInfos[f.dirPos:]
		f.dirPos = len(f.dirInfos)
		return out, nil
	}
	if f.dirPos >= len(f.dirInfos) {
		return nil, io.EOF
	}
	end := f.dirPos + count
	if end > len(f.dirInfos) {
		end = len(f.dirInfos)
	}
	out := f.dirInfos[f.dirPos:end]
	f.dirPos = end
	return out, nil
}

func (f *file) Readdirnames(n int) ([]string, error) {
	infos, err := f.Readdir(n)
	if err != nil {
		return nil, err
	}
	names := make([]string, 0, len(infos))
	for _, info := range infos {
		names = append(names, info.Name())
	}
	return names, nil
}

// Close commits buffered writes transactionally (write mode) or releases the
// handle (read mode).
func (f *file) Close() error {
	if f.closed {
		return os.ErrClosed
	}
	f.closed = true
	f.chunkData = nil
	if f.writable {
		return f.fs.commit(f.path, f.perm, f.buf)
	}
	return nil
}
