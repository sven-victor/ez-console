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
	"time"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func (s *UserService) resetPasswordExpiryNotifyAtTx(ctx context.Context, tx *gorm.DB, userID string) error {
	_ = ctx
	return tx.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "user_id"}},
		DoUpdates: clause.Assignments(map[string]any{"password_expiry_notify_at": nil}),
	}).Create(&model.UserExt{
		UserID:                 userID,
		PasswordExpiryNotifyAt: nil,
	}).Error
}

func markPasswordExpiryNotified(ctx context.Context, userID string, notifiedAt time.Time) error {
	return db.Session(ctx).Clauses(clause.OnConflict{
		Columns: []clause.Column{{Name: "user_id"}},
		DoUpdates: clause.Assignments(map[string]any{
			"password_expiry_notify_at": notifiedAt,
		}),
	}).Create(&model.UserExt{
		UserID:                 userID,
		PasswordExpiryNotifyAt: &notifiedAt,
	}).Error
}
