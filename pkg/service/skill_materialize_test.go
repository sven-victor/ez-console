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
	"os"
	"sync"
	"testing"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/sven-victor/ez-console/pkg/model"
)

func newTestSkill(id string, version int64) *model.Skill {
	skill := &model.Skill{Name: "test"}
	skill.ResourceID = id
	skill.FilesVersion = version
	return skill
}

func TestSkillMaterialize(t *testing.T) {
	remoteRoot := afero.NewMemMapFs()
	cacheRoot := afero.NewBasePathFs(afero.NewOsFs(), t.TempDir())
	mat := &skillMaterializer{locks: map[string]*sync.Mutex{}}

	require.NoError(t, afero.WriteFile(remoteRoot, "skill-1/SKILL.md", []byte("v1 main"), 0o644))
	require.NoError(t, afero.WriteFile(remoteRoot, "skill-1/ref/extra.md", []byte("v1 extra"), 0o644))

	// Initial sync at version 1.
	dir, err := mat.materialize(newTestSkill("skill-1", 1), remoteRoot, cacheRoot)
	require.NoError(t, err)
	b, err := afero.ReadFile(dir, "SKILL.md")
	require.NoError(t, err)
	assert.Equal(t, "v1 main", string(b))
	b, err = afero.ReadFile(dir, "ref/extra.md")
	require.NoError(t, err)
	assert.Equal(t, "v1 extra", string(b))

	// The metadata file lives OUTSIDE the skill directory.
	_, err = cacheRoot.Stat("skill-1.meta.json")
	require.NoError(t, err)
	entries, err := afero.ReadDir(dir, ".")
	require.NoError(t, err)
	for _, e := range entries {
		assert.NotContains(t, e.Name(), "meta.json")
	}

	// Same version: remote changes are NOT picked up (equality comparison).
	require.NoError(t, afero.WriteFile(remoteRoot, "skill-1/SKILL.md", []byte("v2 main"), 0o644))
	dir, err = mat.materialize(newTestSkill("skill-1", 1), remoteRoot, cacheRoot)
	require.NoError(t, err)
	b, _ = afero.ReadFile(dir, "SKILL.md")
	assert.Equal(t, "v1 main", string(b))

	// Bumped version: re-sync mirrors updates AND deletions.
	require.NoError(t, remoteRoot.Remove("skill-1/ref/extra.md"))
	dir, err = mat.materialize(newTestSkill("skill-1", 2), remoteRoot, cacheRoot)
	require.NoError(t, err)
	b, _ = afero.ReadFile(dir, "SKILL.md")
	assert.Equal(t, "v2 main", string(b))
	_, err = dir.Stat("ref/extra.md")
	assert.True(t, os.IsNotExist(err))

	// Invalidate removes the local copy and metadata.
	mat.invalidate("skill-1", cacheRoot)
	_, err = dir.Stat(".")
	assert.True(t, os.IsNotExist(err))
	_, err = cacheRoot.Stat("skill-1.meta.json")
	assert.True(t, os.IsNotExist(err))
}

func TestSkillMaterializeMissingRemoteDir(t *testing.T) {
	remoteRoot := afero.NewMemMapFs()
	mat := &skillMaterializer{locks: map[string]*sync.Mutex{}}
	cacheRoot := afero.NewBasePathFs(afero.NewOsFs(), t.TempDir())

	// A skill whose remote directory does not exist materializes to an
	// empty local directory instead of failing.
	dir, err := mat.materialize(newTestSkill("skill-x", 0), remoteRoot, cacheRoot)
	require.NoError(t, err)
	info, err := dir.Stat(".")
	require.NoError(t, err)
	assert.True(t, info.IsDir())
}
