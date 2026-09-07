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
	"io"
	"os"
	"path"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/spf13/afero"
)

// MigrateOptions controls a tree copy between two storage backends.
type MigrateOptions struct {
	// Prefix limits the copy to a relative subdirectory of the source
	// (slash-separated). Empty means the whole tree.
	Prefix string
	// DryRun lists files that would be copied without writing to dest.
	DryRun bool
	// Overwrite replaces destination files even when they already exist
	// with the same size. When false, existing same-size files are skipped;
	// existing files with a different size are still rewritten so an
	// interrupted copy can be resumed.
	Overwrite bool
	// Concurrency is the number of parallel file copies (default 4).
	// Directories are created before files are dispatched.
	Concurrency int
	// OnFile is an optional callback invoked after each file decision
	// (copied, skipped, or failed). It must be safe for concurrent use.
	OnFile func(event MigrateEvent)
}

// MigrateAction is the outcome of processing one source path.
type MigrateAction string

const (
	MigrateActionCopy   MigrateAction = "copy"
	MigrateActionSkip   MigrateAction = "skip"
	MigrateActionFailed MigrateAction = "failed"
)

// MigrateEvent reports progress for a single path.
type MigrateEvent struct {
	Path   string
	Action MigrateAction
	Size   int64
	Err    error
}

// MigrateResult is the summary of a Migrate run.
type MigrateResult struct {
	Copied  int
	Skipped int
	Failed  int
	Bytes   int64
	Errors  []error
}

// Migrate copies the file tree from src into dst. Paths are preserved
// relative to each filesystem root, so switching drivers does not change
// the keys stored in t_file / skill directories.
func Migrate(ctx context.Context, src, dst afero.Fs, opts MigrateOptions) (*MigrateResult, error) {
	if src == nil || dst == nil {
		return nil, fmt.Errorf("source and destination storage are required")
	}
	if err := ctx.Err(); err != nil {
		return nil, err
	}

	prefix := normalizeMigratePath(opts.Prefix)
	entries, err := listMigrateEntries(src, prefix)
	if err != nil {
		return nil, err
	}

	concurrency := opts.Concurrency
	if concurrency <= 0 {
		concurrency = 4
	}

	result := &MigrateResult{}
	var mu sync.Mutex
	record := func(event MigrateEvent) {
		mu.Lock()
		switch event.Action {
		case MigrateActionCopy:
			result.Copied++
			result.Bytes += event.Size
		case MigrateActionSkip:
			result.Skipped++
		case MigrateActionFailed:
			result.Failed++
			if event.Err != nil {
				result.Errors = append(result.Errors, fmt.Errorf("%s: %w", event.Path, event.Err))
			}
		}
		mu.Unlock()
		if opts.OnFile != nil {
			opts.OnFile(event)
		}
	}

	// Create destination directories first so concurrent file copies do not
	// race on MkdirAll of the same parent.
	for _, e := range entries {
		if err := ctx.Err(); err != nil {
			return result, err
		}
		if !e.info.IsDir() {
			continue
		}
		if opts.DryRun {
			continue
		}
		if err := dst.MkdirAll(e.path, dirMode(e.info)); err != nil {
			record(MigrateEvent{Path: e.path, Action: MigrateActionFailed, Err: err})
		}
	}

	type fileEntry struct {
		path string
		info os.FileInfo
	}
	files := make([]fileEntry, 0, len(entries))
	for _, e := range entries {
		if e.info.IsDir() || !e.info.Mode().IsRegular() {
			continue
		}
		files = append(files, fileEntry{path: e.path, info: e.info})
	}

	if opts.DryRun {
		for _, f := range files {
			record(MigrateEvent{Path: f.path, Action: MigrateActionCopy, Size: f.info.Size()})
		}
		return result, nil
	}

	jobs := make(chan fileEntry)
	var wg sync.WaitGroup
	worker := func() {
		defer wg.Done()
		for f := range jobs {
			if ctx.Err() != nil {
				return
			}
			copied, n, err := copyOneFile(ctx, src, dst, f.path, f.info, opts.Overwrite)
			if err != nil {
				record(MigrateEvent{Path: f.path, Action: MigrateActionFailed, Size: f.info.Size(), Err: err})
				continue
			}
			if copied {
				record(MigrateEvent{Path: f.path, Action: MigrateActionCopy, Size: n})
			} else {
				record(MigrateEvent{Path: f.path, Action: MigrateActionSkip, Size: f.info.Size()})
			}
		}
	}

	for i := 0; i < concurrency; i++ {
		wg.Add(1)
		go worker()
	}
	for _, f := range files {
		if ctx.Err() != nil {
			break
		}
		jobs <- f
	}
	close(jobs)
	wg.Wait()

	if err := ctx.Err(); err != nil {
		return result, err
	}
	if result.Failed > 0 {
		return result, fmt.Errorf("storage migrate completed with %d failed path(s)", result.Failed)
	}
	return result, nil
}

type migrateEntry struct {
	path string
	info os.FileInfo
}

func listMigrateEntries(fs afero.Fs, prefix string) ([]migrateEntry, error) {
	root := walkRoot(fs, prefix)
	var entries []migrateEntry
	err := afero.Walk(fs, root, func(p string, info os.FileInfo, err error) error {
		if err != nil {
			if os.IsNotExist(err) && (p == "" || p == "." || p == prefix) {
				return nil
			}
			return err
		}
		if info == nil {
			return nil
		}
		rel := normalizeMigratePath(p)
		if rel == "" {
			return nil
		}
		if prefix != "" && rel != prefix && !strings.HasPrefix(rel, prefix+"/") {
			if info.IsDir() && !strings.HasPrefix(prefix, rel+"/") {
				return filepath.SkipDir
			}
			return nil
		}
		if !info.IsDir() && !info.Mode().IsRegular() {
			return nil
		}
		entries = append(entries, migrateEntry{path: rel, info: info})
		return nil
	})
	if err != nil {
		return nil, fmt.Errorf("failed to walk source storage: %w", err)
	}
	return entries, nil
}

func walkRoot(fs afero.Fs, prefix string) string {
	if prefix != "" {
		return prefix
	}
	if _, err := fs.Stat(""); err == nil {
		return ""
	}
	return "."
}

func normalizeMigratePath(p string) string {
	p = strings.ReplaceAll(p, "\\", "/")
	p = path.Clean("/" + p)
	p = strings.TrimPrefix(p, "/")
	if p == "." {
		return ""
	}
	return p
}

func dirMode(info os.FileInfo) os.FileMode {
	mode := info.Mode().Perm()
	if mode == 0 {
		return 0o755
	}
	return mode
}

func fileMode(info os.FileInfo) os.FileMode {
	mode := info.Mode().Perm()
	if mode == 0 {
		return 0o644
	}
	return mode
}

func copyOneFile(ctx context.Context, src, dst afero.Fs, rel string, info os.FileInfo, overwrite bool) (copied bool, n int64, err error) {
	const maxAttempts = 8
	for attempt := 1; attempt <= maxAttempts; attempt++ {
		if err := ctx.Err(); err != nil {
			return false, 0, err
		}
		copied, n, err = copyOneFileOnce(src, dst, rel, info, overwrite)
		if err == nil || !isBusyError(err) || attempt == maxAttempts {
			return copied, n, err
		}
		select {
		case <-ctx.Done():
			return false, 0, ctx.Err()
		case <-time.After(busyBackoff(attempt)):
		}
	}
	return copied, n, err
}

func busyBackoff(attempt int) time.Duration {
	d := 25 * time.Millisecond * time.Duration(1<<uint(attempt-1))
	if d > 250*time.Millisecond {
		return 250 * time.Millisecond
	}
	return d
}

func isBusyError(err error) bool {
	if err == nil {
		return false
	}
	msg := strings.ToLower(err.Error())
	return strings.Contains(msg, "database is locked") ||
		strings.Contains(msg, "sqlite_busy") ||
		strings.Contains(msg, "sqlite_locked")
}

func copyOneFileOnce(src, dst afero.Fs, rel string, info os.FileInfo, overwrite bool) (copied bool, n int64, err error) {
	if destInfo, destErr := dst.Stat(rel); destErr == nil {
		if destInfo.IsDir() {
			return false, 0, fmt.Errorf("destination %q is a directory", rel)
		}
		if !overwrite && destInfo.Size() == info.Size() {
			return false, 0, nil
		}
	} else if !os.IsNotExist(destErr) {
		return false, 0, destErr
	}

	parent := path.Dir(rel)
	if parent != "." && parent != "" {
		if err := dst.MkdirAll(parent, 0o755); err != nil {
			return false, 0, err
		}
	}

	in, err := src.Open(rel)
	if err != nil {
		return false, 0, err
	}
	defer in.Close()

	out, err := dst.OpenFile(rel, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, fileMode(info))
	if err != nil {
		return false, 0, err
	}
	n, copyErr := io.Copy(out, in)
	closeErr := out.Close()
	if copyErr != nil {
		return false, n, copyErr
	}
	if closeErr != nil {
		return false, n, closeErr
	}
	return true, n, nil
}
