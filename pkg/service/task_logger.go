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
	"fmt"
	"path/filepath"
	"strings"

	kitlog "github.com/go-kit/log"
	"github.com/sven-victor/ez-console/pkg/model"
)

// taskLogger implements log.Logger and writes each log event to the log storage service.
type taskLogger struct {
	ctx        context.Context
	taskID     string
	logService *LogStorageService
}

// newTaskLogger creates a logger that forwards Log() calls to the log storage service for the given task.
func newTaskLogger(ctx context.Context, taskID string, logService *LogStorageService) kitlog.Logger {
	return &taskLogger{ctx: ctx, taskID: taskID, logService: logService}
}

// Log implements log.Logger. It parses keyvals (key-value pairs), extracts level and msg, and writes to the log storage service.
func (t *taskLogger) Log(keyvals ...interface{}) error {
	if t.logService == nil || len(keyvals) == 0 {
		return nil
	}
	levelStr := "info"
	var msg string
	var parts []string
	for i := 0; i+1 < len(keyvals); i += 2 {
		k, v := keyvals[i], keyvals[i+1]
		key := fmt.Sprint(k)
		val := fmt.Sprint(v)
		if key == "level" {
			if val == "debug" {
				return nil
			}
			levelStr = val
		} else if key == "caller" {
			parts = append(parts, key+"="+quoteLogfmtVal(filepath.Base(val)))
		} else if key == "msg" {
			msg = val
		} else {
			parts = append(parts, key+"="+quoteLogfmtVal(val))
		}
	}
	if msg != "" {
		parts = append([]string{"msg=" + quoteLogfmtVal(msg)}, parts...)
	}
	message := strings.Join(parts, " ")
	if message == "" {
		message = msg
	}
	if message == "" {
		message = "(no message)"
	}
	return t.logService.Write(t.ctx, t.taskID, model.LogTypeTask, levelStr, message)
}

func quoteLogfmtVal(s string) string {
	if s == "" {
		return `""`
	}
	for _, r := range s {
		if r <= ' ' || r == '=' || r == '"' || r == '\\' {
			return `"` + strings.ReplaceAll(strings.ReplaceAll(s, `\`, `\\`), `"`, `\"`) + `"`
		}
	}
	return s
}
