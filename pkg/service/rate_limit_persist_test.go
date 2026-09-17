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
	"testing"

	"github.com/glebarez/sqlite"
	"github.com/stretchr/testify/require"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func setupRateLimitRuleDB(t *testing.T) *gorm.DB {
	t.Helper()
	gdb, err := gorm.Open(sqlite.Open("file::memory:"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	require.NoError(t, err)
	require.NoError(t, gdb.AutoMigrate(&model.RateLimitRule{}))
	return gdb
}

func TestPersistRateLimitRuleEnabledFalse(t *testing.T) {
	tx := setupRateLimitRuleDB(t)
	row := model.RateLimitRule{
		SubjectType: model.RateLimitSubjectUser,
		SubjectID:   "u1",
		Rate:        2,
		Period:      "1m",
		Burst:       1,
		Enabled:     false,
	}
	require.NoError(t, persistRateLimitRule(tx, &row))
	require.NotEmpty(t, row.ResourceID)

	var got model.RateLimitRule
	require.NoError(t, tx.Where("subject_type = ? AND subject_id = ? AND method = ? AND path = ?",
		model.RateLimitSubjectUser, "u1", "", "").First(&got).Error)
	require.False(t, got.Enabled)
	require.Equal(t, 2, got.Rate)
	require.Equal(t, 1, got.Burst)

	row.Rate = 5
	row.Burst = 3
	row.Enabled = false
	require.NoError(t, persistRateLimitRule(tx, &row))
	require.NoError(t, tx.Where("resource_id = ?", got.ResourceID).First(&got).Error)
	require.False(t, got.Enabled)
	require.Equal(t, 5, got.Rate)
	require.Equal(t, 3, got.Burst)
}

func TestCreateRateLimitRuleEnabledFalse(t *testing.T) {
	tx := setupRateLimitRuleDB(t)
	rule := model.RateLimitRule{
		SubjectType: model.RateLimitSubjectUser,
		Method:      "GET",
		Path:        "/api/statistics",
		Rate:        1,
		Period:      "1m",
		Burst:       1,
		Enabled:     false,
		Source:      model.RateLimitSourceDB,
	}
	require.NoError(t, tx.Select(
		"ResourceID", "CreatedAt", "UpdatedAt",
		"SubjectType", "SubjectID", "Method", "Path",
		"Rate", "Period", "Burst", "Quota", "QuotaPeriod",
		"Enabled", "Source",
	).Create(&rule).Error)

	var got model.RateLimitRule
	require.NoError(t, tx.Where("resource_id = ?", rule.ResourceID).First(&got).Error)
	require.False(t, got.Enabled)
}

func TestValidateRuleRejectsAccessKey(t *testing.T) {
	s := &rateLimitService{}
	err := s.validateRule(&model.RateLimitRule{
		SubjectType: "access_key",
		Rate:        1,
		Period:      "1m",
		Burst:       1,
	}, true)
	require.Error(t, err)
	require.Contains(t, err.Error(), "invalid subject_type")

	_, err = s.resetSpec(t.Context(), model.RateLimitResetRequest{
		Scope:       model.RateLimitResetScopeSubject,
		SubjectType: "access_key",
		SubjectID:   "ak-1",
	})
	require.Error(t, err)
	require.Contains(t, err.Error(), "invalid subject_type")
}
