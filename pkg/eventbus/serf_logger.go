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

package eventbus

import (
	stdlog "log"
	"strings"

	kitlog "github.com/go-kit/log"
	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-utils/log"
)

// SerfLogAdapter bridges hashicorp/serf and memberlist stdlib log output
// into the application logfmt logger.  Each Write call receives one log line
// and is emitted with a fresh traceId so gossip logs are independently traceable.
type SerfLogAdapter struct {
	base kitlog.Logger
}

// NewSerfLogAdapter creates an io.Writer adapter for serf/memberlist log.Logger.
func NewSerfLogAdapter(base kitlog.Logger) *SerfLogAdapter {
	return &SerfLogAdapter{base: log.WithCaller(6)(base)}
}

// Write implements io.Writer for stdlib log.Logger.
func (l *SerfLogAdapter) Write(p []byte) (n int, err error) {
	msg := strings.TrimSpace(string(p))
	if msg == "" {
		return len(p), nil
	}

	// Each serf/memberlist line gets its own traceId, independent of HTTP context.
	logger := log.NewTraceLogger(log.WithLogger(l.base))
	msg = stripStdLogTimestamp(msg)

	switch {
	case strings.HasPrefix(msg, "[ERR]"):
		level.Error(logger).Log("msg", strings.TrimSpace(strings.TrimPrefix(msg, "[ERR]")))
	case strings.HasPrefix(msg, "[WARN]"):
		level.Warn(logger).Log("msg", strings.TrimSpace(strings.TrimPrefix(msg, "[WARN]")))
	case strings.HasPrefix(msg, "[DEBUG]"):
		level.Debug(logger).Log("msg", strings.TrimSpace(strings.TrimPrefix(msg, "[DEBUG]")))
	case strings.HasPrefix(msg, "[INFO]"):
		level.Info(logger).Log("msg", strings.TrimSpace(strings.TrimPrefix(msg, "[INFO]")))
	default:
		level.Info(logger).Log("msg", msg)
	}
	return len(p), nil
}

// stripStdLogTimestamp removes the leading "2006/01/02 15:04:05" prefix that
// stdlib log adds when LstdFlags is set, so the msg field matches serf format.
func stripStdLogTimestamp(msg string) string {
	if len(msg) < 20 || msg[4] != '/' || msg[7] != '/' {
		return msg
	}
	if idx := strings.Index(msg, "["); idx > 0 {
		return strings.TrimSpace(msg[idx:])
	}
	return msg
}

// newSerfStdLogger returns a stdlib log.Logger wired to the application logger.
// flag=0 disables stdlib timestamp/prefix; serf/memberlist embed level in msg.
func newSerfStdLogger() *stdlog.Logger {
	return stdlog.New(NewSerfLogAdapter(log.New()), "", 0)
}
