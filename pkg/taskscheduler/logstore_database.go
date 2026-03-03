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

package taskscheduler

import (
	"context"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
)

type databaseLogStoreBackend struct{}

// NewDatabaseLogStoreBackend returns a Backend that stores logs in the database.
func NewDatabaseLogStoreBackend() LogStoreBackend {
	return &databaseLogStoreBackend{}
}

func init() {
	RegisterLogStoreBackend("database", NewDatabaseLogStoreBackend)
}

func (d *databaseLogStoreBackend) Write(ctx context.Context, refID, level, message string) error {
	e := &model.TaskLog{
		TaskID:  refID,
		Level:   level,
		Message: message,
	}
	return db.Session(ctx).Create(e).Error
}

func (d *databaseLogStoreBackend) ListByTaskID(ctx context.Context, refID string) ([]model.TaskLog, error) {
	var rows []model.TaskLog
	if err := db.Session(ctx).
		Where("task_id = ?", refID).
		Order("created_at ASC").
		Find(&rows).Error; err != nil {
		return nil, err
	}
	return rows, nil
}
