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

	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
)

var ephemeralTokenCleanupTaskType = model.TaskType("ephemeral_token_cleanup")

func init() {
	taskscheduler.RegisterScheduledJob(&taskscheduler.ScheduledJobDef{
		ID:          "ephemeral-token-cleanup",
		Name:        "Ephemeral Token Cleanup",
		Spec:        "*/5 * * * *",
		Description: "Deletes expired ephemeral tokens (OAuth state, MFA codes, activation tokens).",
		TaskType:    ephemeralTokenCleanupTaskType,
		Enabled:     true,
		Runner: taskscheduler.NewFuncTaskRunner(func(ctx context.Context, _ *model.Task, progress taskscheduler.ProgressCallback, _ <-chan struct{}) (interface{}, error) {
			if err := GetEphemeralTokenService().DeleteExpired(ctx, ""); err != nil {
				return nil, err
			}
			progress(100)
			return map[string]any{"status": "ok"}, nil
		}),
	})
}
