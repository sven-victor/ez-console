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

	"github.com/sven-victor/ez-console/pkg/logstore"
	"github.com/sven-victor/ez-console/pkg/model"
)

// LogStorageService provides write and query for stored logs using the registered backend.
type LogStorageService struct {
	backendName string
}

// NewLogStorageService creates a LogStorageService using the default backend.
func NewLogStorageService() *LogStorageService {
	return &LogStorageService{backendName: ""}
}

// NewLogStorageServiceWithBackend creates a LogStorageService using the named backend.
func NewLogStorageServiceWithBackend(name string) *LogStorageService {
	return &LogStorageService{backendName: name}
}

// Write persists a log entry.
func (s *LogStorageService) Write(ctx context.Context, refID string, logType model.LogType, level, message string) error {
	be := logstore.Get(s.backendName)
	if be == nil {
		return nil
	}
	return be.Write(ctx, refID, logType, level, message)
}

// GetLogs returns log entries for the given ref ID and type (e.g. task ID and LogTypeTask).
func (s *LogStorageService) GetLogs(ctx context.Context, refID string, logType model.LogType) ([]logstore.Entry, error) {
	be := logstore.Get(s.backendName)
	if be == nil {
		return nil, nil
	}
	return be.ListByRefIDAndType(ctx, refID, logType)
}
