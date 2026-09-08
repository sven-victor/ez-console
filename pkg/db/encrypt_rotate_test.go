// Copyright 2026 Sven Victor
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

package db

import (
	"context"
	"testing"

	"github.com/glebarez/sqlite"
	"github.com/stretchr/testify/require"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/safe"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

const (
	rotateOldKey = "1234567890123456"
	rotateNewKey = "abcdefghijklmnop"
)

func setupRotateDB(t *testing.T) *gorm.DB {
	t.Helper()
	gdb, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	require.NoError(t, err)
	require.NoError(t, gdb.AutoMigrate(
		&model.User{},
		&model.Setting{},
		&model.AIModel{},
		&model.ServiceAccountAccessKey{},
		&model.EphemeralToken{},
	))
	return gdb
}

func TestRotateEncryption(t *testing.T) {
	gdb := setupRotateDB(t)
	ctx := context.Background()

	user := model.User{
		Username:  "alice",
		Email:     "alice@example.com",
		FullName:  "Alice",
		Status:    model.UserStatusActive,
		Password:  "hashed",
		Salt:      "salt",
		MFASecret: safe.NewEncryptedString("JBSWY3DPEHPK3PXP", rotateOldKey),
	}
	require.NoError(t, gdb.Create(&user).Error)

	setting := model.Setting{
		Key:   model.SettingSMTPPassword,
		Value: safe.NewEncryptedString("smtp-secret", rotateOldKey).String(),
	}
	require.NoError(t, gdb.Create(&setting).Error)
	plainSetting := model.Setting{
		Key:   model.SettingSMTPHost,
		Value: "localhost",
	}
	require.NoError(t, gdb.Create(&plainSetting).Error)

	ai := model.AIModel{
		Name:           "gpt",
		Provider:       model.AIModelProviderOpenAI,
		OrganizationID: "org",
		CreatedBy:      "u1",
		Status:         model.AIModelStatusEnabled,
		Config: model.AIModelConfig{
			"api_key":  safe.NewEncryptedString("sk-live", rotateOldKey).String(),
			"model_id": "gpt-4",
		},
	}
	require.NoError(t, gdb.Create(&ai).Error)

	dry, err := RotateEncryption(ctx, gdb, rotateOldKey, rotateNewKey, true)
	require.NoError(t, err)
	require.NotEmpty(t, dry.Tables)

	var beforeSetting model.Setting
	require.NoError(t, gdb.Where("`key` = ?", model.SettingSMTPPassword).First(&beforeSetting).Error)
	beforePlain, err := safe.NewEncryptedString(beforeSetting.Value, rotateOldKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, "smtp-secret", beforePlain)

	result, err := RotateEncryption(ctx, gdb, rotateOldKey, rotateNewKey, false)
	require.NoError(t, err)

	var rewritten int
	for _, tb := range result.Tables {
		rewritten += tb.Rewritten
	}
	require.GreaterOrEqual(t, rewritten, 3)

	var gotUser model.User
	require.NoError(t, gdb.First(&gotUser, user.ID).Error)
	got, err := safe.NewEncryptedString(gotUser.MFASecret.String(), rotateNewKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, "JBSWY3DPEHPK3PXP", got)

	var gotSetting model.Setting
	require.NoError(t, gdb.Where("`key` = ?", model.SettingSMTPPassword).First(&gotSetting).Error)
	got, err = safe.NewEncryptedString(gotSetting.Value, rotateNewKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, "smtp-secret", got)

	var host model.Setting
	require.NoError(t, gdb.Where("`key` = ?", model.SettingSMTPHost).First(&host).Error)
	require.Equal(t, "localhost", host.Value)

	var gotAI model.AIModel
	require.NoError(t, gdb.First(&gotAI, ai.ID).Error)
	require.Equal(t, "gpt-4", gotAI.Config["model_id"])
	got, err = safe.NewEncryptedString(gotAI.Config["api_key"].(string), rotateNewKey).UnsafeString()
	require.NoError(t, err)
	require.Equal(t, "sk-live", got)
}

func TestRotateEncryptionRejectsSameKey(t *testing.T) {
	gdb := setupRotateDB(t)
	_, err := RotateEncryption(context.Background(), gdb, rotateOldKey, rotateOldKey, true)
	require.Error(t, err)
}
