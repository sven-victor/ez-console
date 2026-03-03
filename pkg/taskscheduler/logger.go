package taskscheduler

import (
	"context"
	"fmt"
	"path/filepath"
	"strings"

	kitlog "github.com/go-kit/log"
)

// taskLogger implements log.Logger and writes each log event to the log storage service.
type taskLogger struct {
	ctx         context.Context
	backendName string
	taskID      string
	backend     LogStoreBackend
}

// newTaskLogger creates a logger that forwards Log() calls to the log storage service for the given task.
func NewTaskLogger(ctx context.Context, backendName string, taskID string) kitlog.Logger {
	return &taskLogger{ctx: ctx, backendName: backendName, taskID: taskID, backend: GetLogStoreBackend(backendName)}
}

// Log implements log.Logger. It parses keyvals (key-value pairs), extracts level and msg, and writes to the log storage service.
func (t *taskLogger) Log(keyvals ...interface{}) error {
	if t.backend == nil || len(keyvals) == 0 {
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
	return t.backend.Write(t.ctx, t.taskID, levelStr, message)
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
