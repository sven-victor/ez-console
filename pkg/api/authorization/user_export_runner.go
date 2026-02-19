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

package authorizationapi

import (
	"bytes"
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/task"
)

const userExportTaskType = "user_export"

// UserExportPayload is the JSON payload for user export task.
type UserExportPayload struct {
	Keywords string `json:"keywords,omitempty"`
	Status   string `json:"status,omitempty"`
}

type userExportRunner struct {
	svc *service.Service
}

func (r *userExportRunner) Run(
	ctx context.Context,
	t *model.Task,
	progressCallback task.ProgressCallback,
	cancelCh <-chan struct{},
) (interface{}, error) {
	var payload UserExportPayload
	if t.Payload != "" {
		if err := json.Unmarshal([]byte(t.Payload), &payload); err != nil {
			return nil, fmt.Errorf("invalid export payload: %w", err)
		}
	}

	var buf bytes.Buffer
	w := csv.NewWriter(&buf)
	// CSV header
	header := []string{"Username", "Email", "Full Name", "Phone", "Status", "Source", "Roles", "MFA Enabled", "Last Login", "Created At"}
	if err := w.Write(header); err != nil {
		return nil, err
	}

	pageSize := 100
	current := 1
	var total int64
	written := 0
	for {
		select {
		case <-cancelCh:
			return nil, task.ErrCancelled
		default:
		}
		users, n, err := r.svc.ListUsers(ctx, payload.Keywords, payload.Status, current, pageSize)
		if err != nil {
			return nil, fmt.Errorf("list users: %w", err)
		}
		total = n
		for _, u := range users {
			rolesStr := ""
			if len(u.Roles) > 0 {
				names := make([]string, 0, len(u.Roles))
				for _, role := range u.Roles {
					names = append(names, role.Name)
				}
				rolesStr = strings.Join(names, "; ")
			}
			lastLogin := ""
			if !u.LastLogin.IsZero() {
				lastLogin = u.LastLogin.Format(time.RFC3339)
			}
			createdAt := ""
			if !u.CreatedAt.IsZero() {
				createdAt = u.CreatedAt.Format(time.RFC3339)
			}
			row := []string{
				u.Username,
				u.Email,
				u.FullName,
				u.Phone,
				u.Status,
				string(u.Source),
				rolesStr,
				strconv.FormatBool(u.MFAEnabled),
				lastLogin,
				createdAt,
			}
			if err := w.Write(row); err != nil {
				return nil, err
			}
			written++
		}
		w.Flush()
		if err := w.Error(); err != nil {
			return nil, err
		}
		if int64(current*pageSize) >= total {
			break
		}
		current++
		progress := 0
		if total > 0 {
			progress = int(int64(written) * 90 / total)
		}
		progressCallback(progress)
	}

	progressCallback(95)
	filename := fmt.Sprintf("users_export_%s.csv", time.Now().Format("20060102_150405"))
	file, err := r.svc.FileService.UploadFileWithOwner(ctx, t.CreatorID, filename, "application/octet-stream", model.AccessTypeOwner, model.FileTypeExport, &buf)
	if err != nil {
		return nil, fmt.Errorf("upload export file: %w", err)
	}
	if err := r.svc.TaskService.SetTaskArtifact(ctx, t.ResourceID, file.ResourceID, filename); err != nil {
		return nil, fmt.Errorf("set task artifact: %w", err)
	}
	progressCallback(100)
	return map[string]interface{}{"file_key": file.ResourceID, "rows": written}, nil
}

type userExportRunnerFactory struct {
	svc *service.Service
}

func (f *userExportRunnerFactory) CreateRunner() (task.TaskRunner, error) {
	return &userExportRunner{svc: f.svc}, nil
}

// RegisterUserExportTask registers the user export task type with the task registry.
// Must be called once at server startup before TaskService.Start.
func RegisterUserExportTask(svc *service.Service) {
	task.RegisterTaskType(userExportTaskType, &userExportRunnerFactory{svc: svc})
}
