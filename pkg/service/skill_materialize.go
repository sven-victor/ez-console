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

package service

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/spf13/afero"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/storage"
)

// Skill materialization
//
// When skills storage is remote (storage.IsRemote == true for the configured
// skills_path driver, e.g. db or s3), read paths materialize the skill
// directory into a local cache (server.skills_cache_path) and read from
// there. The remote storage plus the DB row remain the source of truth:
// writes always go to the remote root fs and bump Skill.FilesVersion; a node
// re-syncs its local copy when the version recorded in the local metadata
// file no longer equals the version in the database (equality comparison, no
// timestamps, so cross-node clock skew is irrelevant).
//
// Layout of the local cache directory:
//
//	<cacheRoot>/<skillID>/          materialized skill files
//	<cacheRoot>/<skillID>.meta.json sync metadata (outside the skill dir so
//	                                walks and exports never see it)

// skillCacheMeta is the on-disk sync metadata for one materialized skill.
type skillCacheMeta struct {
	SkillID      string    `json:"skill_id"`
	FilesVersion int64     `json:"files_version"`
	SyncedAt     time.Time `json:"synced_at"`
}

// skillMaterializer serializes per-skill sync operations on this node.
type skillMaterializer struct {
	mu    sync.Mutex
	locks map[string]*sync.Mutex
}

var skillMat = &skillMaterializer{locks: map[string]*sync.Mutex{}}

func (m *skillMaterializer) lockFor(skillID string) *sync.Mutex {
	m.mu.Lock()
	defer m.mu.Unlock()
	lock, ok := m.locks[skillID]
	if !ok {
		lock = &sync.Mutex{}
		m.locks[skillID] = lock
	}
	return lock
}

// getSkillReadFs returns the skill record and an afero.Fs for READING skill
// files. With local skills storage this is the skills root itself (zero
// overhead); with remote storage the files are first materialized into the
// local cache and reads are served from that cache.
func (s *skillService) getSkillReadFs(ctx context.Context, organizationID, skillID string) (*model.Skill, afero.Fs, error) {
	skill, err := s.GetByID(ctx, organizationID, skillID)
	if err != nil {
		return nil, nil, err
	}
	root := s.getSkillsRootFs()
	if !storage.IsRemote(root) {
		return skill, afero.NewBasePathFs(root, skill.ResourceID), nil
	}
	cacheFs, err := config.GetConfig().Server.GetSkillsCacheFs()
	if err != nil {
		return nil, nil, fmt.Errorf("failed to get skills cache fs: %w", err)
	}
	localDir, err := skillMat.materialize(skill, root, cacheFs)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to materialize skill files: %w", err)
	}
	return skill, localDir, nil
}

// materialize ensures the local cache holds the skill files at exactly
// skill.FilesVersion and returns an afero.Fs rooted at that skill directory.
func (m *skillMaterializer) materialize(skill *model.Skill, remoteRoot afero.Fs, cacheRoot afero.Fs) (afero.Fs, error) {
	lock := m.lockFor(skill.ResourceID)
	lock.Lock()
	defer lock.Unlock()

	localDirName := skill.ResourceID
	localDir := afero.NewBasePathFs(cacheRoot, localDirName)
	metaPath := skill.ResourceID + ".meta.json"

	// Fast path: the local copy matches the current files version.
	if meta, err := readSkillCacheMeta(cacheRoot, metaPath); err == nil && meta.FilesVersion == skill.FilesVersion {
		if info, err := cacheRoot.Stat(localDirName); err == nil && info.IsDir() {
			return localDir, nil
		}
	}

	// Stale or missing: download the whole skill directory into a temp dir
	// and swap it in atomically, so concurrent readers never observe a
	// half-synced directory tree.
	tmpDirName := fmt.Sprintf(".sync-%s-%d", skill.ResourceID, time.Now().UnixMilli())
	tmpDir := afero.NewBasePathFs(cacheRoot, tmpDirName)

	defer cacheRoot.RemoveAll(tmpDirName)

	remoteSkillFs := afero.NewBasePathFs(remoteRoot, skill.ResourceID)
	if err := copySkillTreeToLocal(remoteSkillFs, tmpDir); err != nil {
		return nil, fmt.Errorf("failed to download skill files: %w", err)
	}

	// Full-replace swap: remove the previous copy, then rename the fresh one
	// into place. Remove-then-rename also mirrors remote deletions.
	if err := cacheRoot.RemoveAll(localDirName); err != nil {
		return nil, fmt.Errorf("failed to replace materialized skill directory: %w", err)
	}
	if err := cacheRoot.Rename(tmpDirName, localDirName); err != nil {
		return nil, fmt.Errorf("failed to activate materialized skill directory: %w", err)
	}

	meta := skillCacheMeta{SkillID: skill.ResourceID, FilesVersion: skill.FilesVersion, SyncedAt: time.Now().UTC()}
	if err := writeSkillCacheMeta(cacheRoot, metaPath, meta); err != nil {
		return nil, err
	}
	return localDir, nil
}

// invalidate removes the local materialized copy of a skill (e.g. after the
// skill is deleted). Best-effort; missing files are not an error.
func (m *skillMaterializer) invalidate(skillID string, cacheRoot afero.Fs) {
	lock := m.lockFor(skillID)
	lock.Lock()
	defer lock.Unlock()
	_ = cacheRoot.RemoveAll(skillID)
	_ = cacheRoot.Remove(skillID + ".meta.json")
}

func readSkillCacheMeta(fs afero.Fs, path string) (*skillCacheMeta, error) {
	b, err := afero.ReadFile(fs, path)
	if err != nil {
		return nil, err
	}
	var meta skillCacheMeta
	if err := json.Unmarshal(b, &meta); err != nil {
		return nil, err
	}
	return &meta, nil
}

func writeSkillCacheMeta(fs afero.Fs, path string, meta skillCacheMeta) error {
	b, err := json.Marshal(meta)
	if err != nil {
		return fmt.Errorf("failed to encode skill cache metadata: %w", err)
	}
	if err := afero.WriteFile(fs, path, b, 0o644); err != nil {
		return fmt.Errorf("failed to write skill cache metadata: %w", err)
	}
	return nil
}

// copySkillTreeToLocal copies all files and directories from the remote
// skill fs into dst. A missing remote directory results in an empty
// destination directory (the skill may have been created without files yet).
func copySkillTreeToLocal(remote afero.Fs, dst afero.Fs) error {
	if err := dst.MkdirAll(".", 0o755); err != nil {
		return err
	}
	return afero.Walk(remote, "", func(p string, info os.FileInfo, err error) error {
		if err != nil {
			if os.IsNotExist(err) && (p == "" || p == ".") {
				return nil
			}
			return err
		}
		if info == nil || p == "" || p == "." {
			return nil
		}
		if info.IsDir() {
			return dst.MkdirAll(p, 0o755)
		}
		b, err := afero.ReadFile(remote, p)
		if err != nil {
			return fmt.Errorf("failed to read remote skill file %q: %w", p, err)
		}
		if err := dst.MkdirAll(filepath.Dir(p), 0o755); err != nil {
			return err
		}
		return afero.WriteFile(dst, p, b, 0o644)
	})
}
