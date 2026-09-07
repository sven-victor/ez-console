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
	"bytes"
	"context"
	"io"
	"os"
	"sort"
	"testing"

	"github.com/glebarez/sqlite"
	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/sven-victor/ez-console/pkg/storage"
	"gorm.io/gorm"
)

func newTestFs(t *testing.T, chunkSize int) *Fs {
	t.Helper()
	testDB, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	require.NoError(t, testDB.AutoMigrate(&StorageFile{}, &StorageChunk{}))
	return &Fs{
		namespace:   "test",
		chunkSize:   chunkSize,
		maxFileSize: DefaultMaxFileSize,
		session:     func() *gorm.DB { return testDB },
	}
}

func TestFactory(t *testing.T) {
	fs, err := storage.Create("db", map[string]any{
		"namespace":     "uploads",
		"max_file_size": "10MB",
		"chunk_size":    "4096",
	})
	require.NoError(t, err)
	assert.True(t, storage.IsRemote(fs))
	dbfs, ok := fs.(*Fs)
	require.True(t, ok)
	assert.Equal(t, 4096, dbfs.chunkSize)
	_, err = storage.PresignGetURL(context.Background(), fs, "k.txt", 0, "")
	assert.ErrorIs(t, err, storage.ErrPresignNotSupported)
}

func TestParseSize(t *testing.T) {
	for _, tc := range []struct {
		in   any
		want int64
	}{
		{nil, 0}, {int(10), 10}, {int64(20), 20}, {float64(30), 30},
		{"1024", 1024}, {"10KB", 10 << 10}, {"10MB", 10 << 20}, {"1GB", 1 << 30}, {" 5 MB ", 5 << 20},
	} {
		got, err := parseSize(tc.in)
		require.NoError(t, err, "input %v", tc.in)
		assert.Equal(t, tc.want, got, "input %v", tc.in)
	}
	_, err := parseSize("abc")
	require.Error(t, err)
	_, err = parseSize(true)
	require.Error(t, err)
}

func TestWriteReadRoundtrip(t *testing.T) {
	// Small chunk size forces multi-chunk storage.
	fs := newTestFs(t, 8)
	content := []byte("The quick brown fox jumps over the lazy dog")

	require.NoError(t, fs.MkdirAll("2026-01", 0o755))
	out, err := fs.OpenFile("2026-01/test.txt", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0o644)
	require.NoError(t, err)
	n, err := out.Write(content)
	require.NoError(t, err)
	assert.Equal(t, len(content), n)

	// Not visible until Close (transactional commit).
	_, err = fs.Stat("2026-01/test.txt")
	assert.True(t, os.IsNotExist(err))
	require.NoError(t, out.Close())

	info, err := fs.Stat("2026-01/test.txt")
	require.NoError(t, err)
	assert.Equal(t, int64(len(content)), info.Size())
	assert.False(t, info.IsDir())

	b, err := afero.ReadFile(fs, "2026-01/test.txt")
	require.NoError(t, err)
	assert.Equal(t, content, b)

	// Overwrite with truncate.
	require.NoError(t, afero.WriteFile(fs, "2026-01/test.txt", []byte("short"), 0o644))
	b, err = afero.ReadFile(fs, "2026-01/test.txt")
	require.NoError(t, err)
	assert.Equal(t, "short", string(b))
}

func TestSeekAndReadAt(t *testing.T) {
	fs := newTestFs(t, 4)
	content := []byte("0123456789abcdef")
	require.NoError(t, afero.WriteFile(fs, "f.bin", content, 0o644))

	f, err := fs.Open("f.bin")
	require.NoError(t, err)
	defer f.Close()

	// SeekEnd (used by http.ServeContent to determine size).
	size, err := f.Seek(0, io.SeekEnd)
	require.NoError(t, err)
	assert.Equal(t, int64(len(content)), size)

	// Range-style read from the middle, crossing chunk boundaries.
	_, err = f.Seek(5, io.SeekStart)
	require.NoError(t, err)
	buf := make([]byte, 7)
	n, err := io.ReadFull(f, buf)
	require.NoError(t, err)
	assert.Equal(t, 7, n)
	assert.Equal(t, "56789ab", string(buf))

	// ReadAt does not move the offset.
	buf2 := make([]byte, 4)
	_, err = f.ReadAt(buf2, 0)
	require.NoError(t, err)
	assert.Equal(t, "0123", string(buf2))
	rest, err := io.ReadAll(f)
	require.NoError(t, err)
	assert.Equal(t, "cdef", string(rest))
}

func TestDirectoryOperations(t *testing.T) {
	fs := newTestFs(t, DefaultChunkSize)
	require.NoError(t, afero.WriteFile(fs, "a/b/one.txt", []byte("1"), 0o644))
	require.NoError(t, afero.WriteFile(fs, "a/two.txt", []byte("2"), 0o644))
	require.NoError(t, fs.MkdirAll("a/empty", 0o755))

	// Parent directories are created implicitly.
	info, err := fs.Stat("a/b")
	require.NoError(t, err)
	assert.True(t, info.IsDir())

	entries, err := afero.ReadDir(fs, "a")
	require.NoError(t, err)
	names := make([]string, 0, len(entries))
	for _, e := range entries {
		names = append(names, e.Name())
	}
	sort.Strings(names)
	assert.Equal(t, []string{"b", "empty", "two.txt"}, names)

	// Walk from the root.
	var walked []string
	require.NoError(t, afero.Walk(fs, "", func(p string, info os.FileInfo, err error) error {
		if err != nil || p == "" {
			return err
		}
		walked = append(walked, p)
		return nil
	}))
	sort.Strings(walked)
	assert.Equal(t, []string{"a", "a/b", "a/b/one.txt", "a/empty", "a/two.txt"}, walked)
}

func TestRemove(t *testing.T) {
	fs := newTestFs(t, DefaultChunkSize)
	require.NoError(t, afero.WriteFile(fs, "d/f1.txt", []byte("1"), 0o644))
	require.NoError(t, afero.WriteFile(fs, "d/sub/f2.txt", []byte("2"), 0o644))

	// Remove refuses non-empty directories.
	require.Error(t, fs.Remove("d"))
	require.NoError(t, fs.Remove("d/f1.txt"))
	_, err := fs.Stat("d/f1.txt")
	assert.True(t, os.IsNotExist(err))

	// RemoveAll removes the whole subtree, including chunks.
	require.NoError(t, fs.RemoveAll("d"))
	_, err = fs.Stat("d/sub/f2.txt")
	assert.True(t, os.IsNotExist(err))
	_, err = fs.Stat("d")
	assert.True(t, os.IsNotExist(err))
	var chunkCount int64
	require.NoError(t, fs.session().Model(&StorageChunk{}).Count(&chunkCount).Error)
	assert.Equal(t, int64(0), chunkCount)

	// RemoveAll on a missing path is not an error.
	require.NoError(t, fs.RemoveAll("missing"))
}

func TestRename(t *testing.T) {
	fs := newTestFs(t, DefaultChunkSize)
	require.NoError(t, afero.WriteFile(fs, "dir/a.txt", []byte("a"), 0o644))
	require.NoError(t, afero.WriteFile(fs, "dir/sub/b.txt", []byte("b"), 0o644))

	require.NoError(t, fs.Rename("dir", "moved/dir2"))
	b, err := afero.ReadFile(fs, "moved/dir2/sub/b.txt")
	require.NoError(t, err)
	assert.Equal(t, "b", string(b))
	_, err = fs.Stat("dir")
	assert.True(t, os.IsNotExist(err))

	// Renaming onto an existing path fails.
	require.NoError(t, afero.WriteFile(fs, "x.txt", []byte("x"), 0o644))
	require.Error(t, fs.Rename("moved/dir2/a.txt", "x.txt"))
}

func TestMaxFileSize(t *testing.T) {
	fs := newTestFs(t, 8)
	fs.maxFileSize = 10
	out, err := fs.Create("big.bin")
	require.NoError(t, err)
	_, err = out.Write(bytes.Repeat([]byte("x"), 11))
	require.Error(t, err)
	assert.Contains(t, err.Error(), "maximum allowed size")
}

func TestOpenSemantics(t *testing.T) {
	fs := newTestFs(t, DefaultChunkSize)
	// Missing file without O_CREATE.
	_, err := fs.OpenFile("nope.txt", os.O_WRONLY, 0o644)
	assert.True(t, os.IsNotExist(err))
	_, err = fs.Open("nope.txt")
	assert.True(t, os.IsNotExist(err))

	require.NoError(t, afero.WriteFile(fs, "f.txt", []byte("1"), 0o644))
	// O_EXCL on an existing file.
	_, err = fs.OpenFile("f.txt", os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o644)
	require.Error(t, err)
	// Append mode is not supported.
	_, err = fs.OpenFile("f.txt", os.O_WRONLY|os.O_APPEND, 0o644)
	require.Error(t, err)

	// The driver is remote.
	assert.True(t, fs.IsRemote())
}
