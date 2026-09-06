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
	"errors"
	"testing"
	"time"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// fakeRemoteFs is a memory fs implementing both capability interfaces.
type fakeRemoteFs struct {
	afero.Fs
	presignURL string
	presignErr error
}

func (f *fakeRemoteFs) IsRemote() bool { return true }

func (f *fakeRemoteFs) PresignGetURL(ctx context.Context, key string, expiry time.Duration, contentDisposition string) (string, error) {
	if f.presignErr != nil {
		return "", f.presignErr
	}
	return f.presignURL + "/" + key, nil
}

func TestRegistry(t *testing.T) {
	Register("test-driver", func(cfg map[string]any) (afero.Fs, error) {
		return afero.NewMemMapFs(), nil
	})
	fs, err := Create("test-driver", map[string]any{})
	require.NoError(t, err)
	require.NotNil(t, fs)

	_, err = Create("no-such-driver", map[string]any{})
	require.Error(t, err)
	assert.Contains(t, err.Error(), "not registered")

	assert.Panics(t, func() {
		Register("test-driver", func(cfg map[string]any) (afero.Fs, error) { return nil, nil })
	})
}

func TestLocalDriver(t *testing.T) {
	dir := t.TempDir()
	fs, err := Create("local", map[string]any{"path": dir})
	require.NoError(t, err)
	require.NoError(t, fs.MkdirAll("sub", 0o755))
	require.NoError(t, afero.WriteFile(fs, "sub/a.txt", []byte("hello"), 0o644))
	b, err := afero.ReadFile(fs, "sub/a.txt")
	require.NoError(t, err)
	assert.Equal(t, "hello", string(b))
	// The local driver is not remote and does not support presign.
	assert.False(t, IsRemote(fs))
	_, err = PresignGetURL(context.Background(), fs, "sub/a.txt", time.Minute, "")
	assert.ErrorIs(t, err, ErrPresignNotSupported)

	_, err = Create("local", map[string]any{})
	require.Error(t, err)
}

func TestCapabilityHelpersUnwrapAfero(t *testing.T) {
	remote := &fakeRemoteFs{Fs: afero.NewMemMapFs(), presignURL: "https://bucket.example.com"}

	// Direct and afero.Afero-wrapped assertions must both work.
	for _, fs := range []afero.Fs{remote, afero.Afero{Fs: remote}, &afero.Afero{Fs: remote}} {
		assert.True(t, IsRemote(fs))
		url, err := PresignGetURL(context.Background(), fs, "k.txt", time.Minute, "inline")
		require.NoError(t, err)
		assert.Equal(t, "https://bucket.example.com/k.txt", url)
	}

	// A driver may dynamically refuse presigning.
	remote.presignErr = ErrPresignNotSupported
	_, err := PresignGetURL(context.Background(), afero.Afero{Fs: remote}, "k.txt", time.Minute, "")
	assert.ErrorIs(t, err, ErrPresignNotSupported)

	// Plain fs: no capabilities.
	plain := afero.NewMemMapFs()
	assert.False(t, IsRemote(plain))
	_, err = PresignGetURL(context.Background(), plain, "k.txt", time.Minute, "")
	assert.ErrorIs(t, err, ErrPresignNotSupported)
	assert.False(t, errors.Is(err, context.Canceled))
}
