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

package s3

import (
	"context"
	"errors"
	"strings"
	"testing"
	"time"

	"github.com/sven-victor/ez-console/pkg/storage"
)

func TestNewRequiresBucket(t *testing.T) {
	_, err := New(map[string]any{
		"region": "us-east-1",
	})
	if err == nil {
		t.Fatal("expected error when bucket is empty")
	}
	if !strings.Contains(err.Error(), "bucket") {
		t.Fatalf("expected bucket error, got %v", err)
	}
}

func TestNewRegistersRemoteAndPresign(t *testing.T) {
	fs, err := New(map[string]any{
		"bucket":            "ez-console",
		"region":            "us-east-1",
		"prefix":            "uploads/",
		"access_key_id":     "AKIAEXAMPLE",
		"secret_access_key": "secret",
		"endpoint":          "http://127.0.0.1:9000",
		"force_path_style":  true,
	})
	if err != nil {
		t.Fatalf("New: %v", err)
	}
	if !storage.IsRemote(fs) {
		t.Fatal("s3 driver should report remote storage")
	}

	url, err := storage.PresignGetURL(context.Background(), fs, "2026-01/file.png", time.Minute, `attachment; filename="file.png"`)
	if err != nil {
		t.Fatalf("PresignGetURL: %v", err)
	}
	if !strings.Contains(url, "uploads/2026-01/file.png") {
		t.Fatalf("presigned URL missing prefixed key: %s", url)
	}
	if !strings.Contains(url, "response-content-disposition") {
		t.Fatalf("presigned URL missing content-disposition override: %s", url)
	}
}

func TestPresignDisabled(t *testing.T) {
	fs, err := New(map[string]any{
		"bucket":            "ez-console",
		"region":            "us-east-1",
		"access_key_id":     "AKIAEXAMPLE",
		"secret_access_key": "secret",
		"presign_enabled":   false,
	})
	if err != nil {
		t.Fatalf("New: %v", err)
	}
	_, err = storage.PresignGetURL(context.Background(), fs, "k.txt", time.Minute, "")
	if !errors.Is(err, storage.ErrPresignNotSupported) {
		t.Fatalf("expected ErrPresignNotSupported, got %v", err)
	}
}
