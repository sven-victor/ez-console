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

package logstore

import (
	"context"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
)

type databaseBackend struct{}

// NewDatabaseBackend returns a Backend that stores logs in the database.
func NewDatabaseBackend() Backend {
	return &databaseBackend{}
}

func init() {
	Register("database", NewDatabaseBackend)
}

func (d *databaseBackend) Write(ctx context.Context, refID string, logType model.LogType, level, message string) error {
	e := &model.StoredLog{
		RefID:   refID,
		LogType: logType,
		Level:   level,
		Message: message,
	}
	return db.Session(ctx).Create(e).Error
}

func (d *databaseBackend) ListByRefIDAndType(ctx context.Context, refID string, logType model.LogType) ([]Entry, error) {
	var rows []model.StoredLog
	if err := db.Session(ctx).
		Where("ref_id = ? AND log_type = ?", refID, logType).
		Order("created_at ASC").
		Find(&rows).Error; err != nil {
		return nil, err
	}
	out := make([]Entry, 0, len(rows))
	for _, r := range rows {
		out = append(out, Entry{
			ID:        r.ResourceID,
			RefID:     r.RefID,
			LogType:   string(r.LogType),
			Level:     r.Level,
			Message:   r.Message,
			CreatedAt: r.CreatedAt.Format("2006-01-02T15:04:05.000Z07:00"),
		})
	}
	return out, nil
}
