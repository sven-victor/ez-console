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
	"crypto/sha256"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/sven-victor/ez-console/pkg/db"
	dbdialect "github.com/sven-victor/ez-console/pkg/db/dialect"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/safe"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// ErrEphemeralTokenInvalidOrUsed is returned when a token cannot be consumed
// because it does not exist, has already been used, or has expired.
var ErrEphemeralTokenInvalidOrUsed = errors.New("token is invalid, expired, or already used")

// EphemeralTokenService manages short-lived, one-time-use tokens backed by
// the t_ephemeral_token table so that they work correctly across multiple
// backend instances.
type EphemeralTokenService interface {
	// Create stores a new ephemeral token.  The raw token value is hashed
	// before storage; only the hash is persisted.  The payload is encrypted
	// with the application encrypt-key before being stored.
	Create(ctx context.Context, purpose model.EphemeralTokenPurpose, token, payload string, ttl time.Duration) error

	// ConsumeAndGetPayload atomically validates and consumes the token.
	// Returns ErrEphemeralTokenInvalidOrUsed when the token does not exist,
	// has already been consumed, or has expired.  On success the decrypted
	// payload is returned and the token is irrevocably deleted.
	ConsumeAndGetPayload(ctx context.Context, token string) (string, error)

	// DeleteExpired removes all expired tokens for a given purpose (or all
	// purposes when purpose is empty).  Intended to be called from a
	// leader-only cleanup job.
	DeleteExpired(ctx context.Context, purpose model.EphemeralTokenPurpose) error
}

type ephemeralTokenService struct{}

var globalEphemeralTokenService EphemeralTokenService = &ephemeralTokenService{}

// GetEphemeralTokenService returns the global EphemeralTokenService.
func GetEphemeralTokenService() EphemeralTokenService {
	return globalEphemeralTokenService
}

func hashToken(token string) string {
	h := sha256.Sum256([]byte(token))
	return fmt.Sprintf("%x", h)
}

func (s *ephemeralTokenService) Create(ctx context.Context, purpose model.EphemeralTokenPurpose, token, payload string, ttl time.Duration) error {
	encKey := os.Getenv(safe.SecretEnvName)
	encPayload := safe.NewEncryptedString(payload, encKey).String()

	row := model.EphemeralToken{
		Purpose:   purpose,
		TokenHash: hashToken(token),
		Payload:   encPayload,
		ExpiresAt: time.Now().Add(ttl),
	}
	return db.Session(ctx).
		Clauses(clause.OnConflict{DoNothing: true}).
		Create(&row).Error
}

// ConsumeAndGetPayload uses a dialect-appropriate atomic consume strategy.
//
// For PostgreSQL: a single DELETE ... RETURNING is used for maximum atomicity.
// For MySQL / SQLite: a single-transaction SELECT FOR UPDATE + DELETE.
//
// In both cases RowsAffected == 1 (or one returned row) is the sole winner.
func (s *ephemeralTokenService) ConsumeAndGetPayload(ctx context.Context, token string) (string, error) {
	hash := hashToken(token)
	dbConn := db.Session(ctx)

	switch dbConn.Dialector.Name() {
	case "postgres":
		return s.consumePostgres(ctx, dbConn, hash)
	default:
		return s.consumeDefault(ctx, dbConn, hash)
	}
}

func (s *ephemeralTokenService) consumePostgres(ctx context.Context, dbConn *gorm.DB, hash string) (string, error) {
	var rows []model.EphemeralToken
	res := dbConn.Raw(
		"DELETE FROM t_ephemeral_token WHERE token_hash = ? AND expires_at > NOW() AND deleted_at IS NULL RETURNING *",
		hash,
	).Scan(&rows)
	if res.Error != nil {
		return "", res.Error
	}
	if len(rows) == 0 {
		return "", ErrEphemeralTokenInvalidOrUsed
	}
	return decryptPayload(rows[0].Payload)
}

func (s *ephemeralTokenService) consumeDefault(ctx context.Context, dbConn *gorm.DB, hash string) (string, error) {
	var payload string
	err := dbConn.Transaction(func(tx *gorm.DB) error {
		var row model.EphemeralToken
		// SELECT FOR UPDATE to serialise concurrent consume attempts.
		if err := dbdialect.LockForUpdate(tx).
			Where("token_hash = ? AND expires_at > ?", hash, dbdialect.Now(tx)).
			First(&row).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return ErrEphemeralTokenInvalidOrUsed
			}
			return err
		}
		// Hard-delete so the unique index is freed and it cannot be replayed.
		res := tx.Unscoped().Delete(&row)
		if res.Error != nil {
			return res.Error
		}
		if res.RowsAffected == 0 {
			return ErrEphemeralTokenInvalidOrUsed
		}
		var err error
		payload, err = decryptPayload(row.Payload)
		return err
	})
	return payload, err
}

func decryptPayload(encPayload string) (string, error) {
	encKey := os.Getenv(safe.SecretEnvName)
	s := safe.NewEncryptedString(encPayload, encKey)
	raw, err := s.UnsafeString()
	if err != nil {
		return "", fmt.Errorf("failed to decrypt ephemeral token payload: %w", err)
	}
	return raw, nil
}

func (s *ephemeralTokenService) DeleteExpired(ctx context.Context, purpose model.EphemeralTokenPurpose) error {
	q := db.Session(ctx).Unscoped().
		Where("expires_at < ?", dbdialect.Now(db.Session(ctx)))
	if purpose != "" {
		q = q.Where("purpose = ?", purpose)
	}
	return q.Delete(&model.EphemeralToken{}).Error
}
