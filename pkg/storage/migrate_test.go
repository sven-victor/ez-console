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
	"context"
	"fmt"
	"os"
	"testing"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func seedTree(t *testing.T, fs afero.Fs) {
	t.Helper()
	require.NoError(t, afero.WriteFile(fs, "a.txt", []byte("aaa"), 0o644))
	require.NoError(t, afero.WriteFile(fs, "dir/b.txt", []byte("bbbb"), 0o644))
	require.NoError(t, afero.WriteFile(fs, "dir/nested/c.txt", []byte("c"), 0o644))
	require.NoError(t, fs.MkdirAll("dir/empty", 0o755))
}

func TestMigrateCopiesTree(t *testing.T) {
	src, dst := afero.NewMemMapFs(), afero.NewMemMapFs()
	seedTree(t, src)

	result, err := Migrate(context.Background(), src, dst, MigrateOptions{Concurrency: 2})
	require.NoError(t, err)
	assert.Equal(t, 3, result.Copied)
	assert.Equal(t, 0, result.Skipped)
	assert.Equal(t, 0, result.Failed)
	assert.Equal(t, int64(8), result.Bytes)

	b, err := afero.ReadFile(dst, "dir/nested/c.txt")
	require.NoError(t, err)
	assert.Equal(t, "c", string(b))
	info, err := dst.Stat("dir/empty")
	require.NoError(t, err)
	assert.True(t, info.IsDir())
}

func TestMigrateSkipAndOverwrite(t *testing.T) {
	src, dst := afero.NewMemMapFs(), afero.NewMemMapFs()
	require.NoError(t, afero.WriteFile(src, "f.txt", []byte("hello"), 0o644))
	require.NoError(t, afero.WriteFile(dst, "f.txt", []byte("hello"), 0o644))

	result, err := Migrate(context.Background(), src, dst, MigrateOptions{})
	require.NoError(t, err)
	assert.Equal(t, 0, result.Copied)
	assert.Equal(t, 1, result.Skipped)

	require.NoError(t, afero.WriteFile(src, "f.txt", []byte("hello!"), 0o644))
	result, err = Migrate(context.Background(), src, dst, MigrateOptions{})
	require.NoError(t, err)
	assert.Equal(t, 1, result.Copied)
	b, err := afero.ReadFile(dst, "f.txt")
	require.NoError(t, err)
	assert.Equal(t, "hello!", string(b))

	result, err = Migrate(context.Background(), src, dst, MigrateOptions{Overwrite: true})
	require.NoError(t, err)
	assert.Equal(t, 1, result.Copied)
}

func TestMigrateDryRunAndPrefix(t *testing.T) {
	src, dst := afero.NewMemMapFs(), afero.NewMemMapFs()
	seedTree(t, src)

	result, err := Migrate(context.Background(), src, dst, MigrateOptions{DryRun: true, Prefix: "dir"})
	require.NoError(t, err)
	assert.Equal(t, 2, result.Copied)
	assert.Equal(t, int64(5), result.Bytes)
	_, err = dst.Stat("dir/b.txt")
	assert.True(t, os.IsNotExist(err))

	result, err = Migrate(context.Background(), src, dst, MigrateOptions{Prefix: "dir/nested"})
	require.NoError(t, err)
	assert.Equal(t, 1, result.Copied)
	b, err := afero.ReadFile(dst, "dir/nested/c.txt")
	require.NoError(t, err)
	assert.Equal(t, "c", string(b))
	_, err = dst.Stat("a.txt")
	assert.True(t, os.IsNotExist(err))
}

func TestIsBusyError(t *testing.T) {
	assert.True(t, isBusyError(fmt.Errorf(`failed to create file "x": database is locked (5) (SQLITE_BUSY)`)))
	assert.True(t, isBusyError(fmt.Errorf("database is locked (517)")))
	assert.False(t, isBusyError(fmt.Errorf("no such file")))
	assert.False(t, isBusyError(nil))
}

func TestMigrateRequiresFs(t *testing.T) {
	_, err := Migrate(context.Background(), nil, afero.NewMemMapFs(), MigrateOptions{})
	require.Error(t, err)
}

func TestMigrateOnFileCallback(t *testing.T) {
	src, dst := afero.NewMemMapFs(), afero.NewMemMapFs()
	require.NoError(t, afero.WriteFile(src, "x.txt", []byte("x"), 0o644))
	var actions []MigrateAction
	_, err := Migrate(context.Background(), src, dst, MigrateOptions{
		Concurrency: 1,
		OnFile: func(event MigrateEvent) {
			actions = append(actions, event.Action)
		},
	})
	require.NoError(t, err)
	assert.Equal(t, []MigrateAction{MigrateActionCopy}, actions)
}

func TestOpenAndDriverName(t *testing.T) {
	dir := t.TempDir()
	fs, err := Open(dir)
	require.NoError(t, err)
	require.NoError(t, afero.WriteFile(fs, "n.txt", []byte("ok"), 0o644))

	fs, err = Open("driver=local,path=" + dir)
	require.NoError(t, err)
	b, err := afero.ReadFile(fs, "n.txt")
	require.NoError(t, err)
	assert.Equal(t, "ok", string(b))

	name, err := DriverName(dir)
	require.NoError(t, err)
	assert.Equal(t, "local", name)
	name, err = DriverName("driver=db,namespace=uploads")
	require.NoError(t, err)
	assert.Equal(t, "db", name)
	assert.True(t, NeedsDatabase("driver=db,namespace=skills"))
	assert.False(t, NeedsDatabase("./uploads"))
	assert.False(t, NeedsDatabase("driver=s3,bucket=ez"))

	_, err = Open(map[string]any{})
	require.Error(t, err)
}

func TestParseCompactConfig(t *testing.T) {
	got, err := ParseCompactConfig(`driver=s3,prefix="a,b",force_path_style=true`)
	require.NoError(t, err)
	assert.Equal(t, "s3", got["driver"])
	assert.Equal(t, "a,b", got["prefix"])
	assert.Equal(t, true, got["force_path_style"])
}
