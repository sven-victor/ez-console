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

// Package cluster provides the ClusterBackend abstraction for DB-based
// leader election, task claiming, and reaping.  All implementations must
// use portable GORM constructs (no raw dialect SQL) and DB server-side time.
package cluster

import (
	"context"
	"errors"
	"io"
	"time"

	"github.com/sven-victor/ez-console/pkg/db/dialect"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// ErrLeaseNotHeld is returned when an operation requires holding a lease that
// the caller does not currently hold.
var ErrLeaseNotHeld = errors.New("cluster: lease not held by this node")

// ClusterBackend defines the coordination primitives used by the scheduler,
// task service, and migration runner.  The DB implementation is portable
// across MySQL, PostgreSQL, and SQLite.
type ClusterBackend interface {
	// AcquireLease atomically tries to acquire or renew a named lease for
	// holderID.  Returns true if this call results in the caller holding
	// the lease (either freshly acquired or renewed).
	AcquireLease(ctx context.Context, name, holderID string, ttl time.Duration) (bool, error)

	// IsLeader returns true if holderID currently holds the named lease
	// (i.e. the lease row exists, holder_id matches, and expires_at is in
	// the future according to the DB server clock).
	IsLeader(ctx context.Context, name, holderID string) (bool, error)

	// ReleaseLease immediately expires the named lease held by holderID so
	// another node can acquire it without waiting for the TTL.
	ReleaseLease(ctx context.Context, name, holderID string) error

	io.Closer
}

// ClusterLease is the GORM model for the t_cluster_lease table.
// It is defined here to avoid an import cycle with the model package.
type ClusterLease struct {
	Name      string    `gorm:"column:name;primaryKey;size:64"`
	HolderID  string    `gorm:"column:holder_id;size:64"`
	ExpiresAt time.Time `gorm:"column:expires_at"`
}

func (ClusterLease) TableName() string { return "t_cluster_lease" }

// DBClusterBackend implements ClusterBackend using a relational DB.
type DBClusterBackend struct {
	db *gorm.DB
}

// NewDBClusterBackend creates a DBClusterBackend backed by the provided *gorm.DB.
func NewDBClusterBackend(db *gorm.DB) *DBClusterBackend {
	return &DBClusterBackend{db: db}
}

// AcquireLease tries to acquire or renew the named lease for holderID.
// Strategy:
//  1. Attempt an UPDATE that matches either "I already hold it" or
//     "the current holder's lease has expired".
//  2. If no rows were updated, attempt to INSERT with OnConflict DoNothing
//     (handles the very first row creation).
//  3. Re-check IsLeader to determine whether this node won.
func (b *DBClusterBackend) AcquireLease(ctx context.Context, name, holderID string, ttl time.Duration) (bool, error) {
	res := b.db.WithContext(ctx).
		Model(&ClusterLease{}).
		Where("name = ? AND (holder_id = ? OR expires_at < ?)", name, holderID, dialect.Now(b.db)).
		Updates(map[string]any{
			"holder_id":  holderID,
			"expires_at": dialect.NowPlus(b.db, ttl),
		})
	if res.Error != nil {
		return false, res.Error
	}

	if res.RowsAffected == 1 {
		return true, nil
	}

	// Row may not exist yet — try to insert it.
	newLease := ClusterLease{Name: name, HolderID: holderID}
	insertRes := b.db.WithContext(ctx).
		Clauses(clause.OnConflict{DoNothing: true}).
		Create(&newLease)
	if insertRes.Error != nil {
		return false, insertRes.Error
	}
	if insertRes.RowsAffected == 1 {
		// We inserted; now set the expiry in a follow-up update since
		// clause.Expr cannot be used in Create values portably.
		b.db.WithContext(ctx).
			Model(&ClusterLease{}).
			Where("name = ? AND holder_id = ?", name, holderID).
			Update("expires_at", dialect.NowPlus(b.db, ttl))
		return true, nil
	}

	// Someone else holds the lease; verify with IsLeader.
	return b.IsLeader(ctx, name, holderID)
}

// IsLeader returns true when holderID holds the named lease and it has not
// expired according to DB server time.
func (b *DBClusterBackend) IsLeader(ctx context.Context, name, holderID string) (bool, error) {
	var count int64
	err := b.db.WithContext(ctx).
		Model(&ClusterLease{}).
		Where("name = ? AND holder_id = ? AND expires_at > ?", name, holderID, dialect.Now(b.db)).
		Count(&count).Error
	return count > 0, err
}

// ReleaseLease immediately expires the lease so another node can take over
// without waiting for the TTL.  It is a no-op if this node does not hold
// the lease.
func (b *DBClusterBackend) ReleaseLease(ctx context.Context, name, holderID string) error {
	return b.db.WithContext(ctx).
		Model(&ClusterLease{}).
		Where("name = ? AND holder_id = ?", name, holderID).
		Update("expires_at", dialect.Now(b.db)).Error
}

func (b *DBClusterBackend) Close() error { return nil }

// EnsureLeaseTable creates the t_cluster_lease table idempotently using a raw
// CREATE TABLE IF NOT EXISTS so it exists before AutoMigrate or any lease
// acquisition attempt.  Must be called once at startup before MigrateDB.
func EnsureLeaseTable(db *gorm.DB) error {
	var sql string
	switch db.Dialector.Name() {
	case "sqlite":
		sql = `CREATE TABLE IF NOT EXISTS t_cluster_lease (
			name       TEXT PRIMARY KEY,
			holder_id  TEXT NOT NULL DEFAULT '',
			expires_at DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00'
		)`
	case "mysql":
		sql = `CREATE TABLE IF NOT EXISTS t_cluster_lease (
			name       VARCHAR(64) NOT NULL,
			holder_id  VARCHAR(64) NOT NULL DEFAULT '',
			expires_at DATETIME    NOT NULL DEFAULT '1970-01-01 00:00:00',
			PRIMARY KEY (name)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
	default:
		// PostgreSQL
		sql = `CREATE TABLE IF NOT EXISTS t_cluster_lease (
			name       VARCHAR(64) NOT NULL,
			holder_id  VARCHAR(64) NOT NULL DEFAULT '',
			expires_at TIMESTAMPTZ NOT NULL DEFAULT '1970-01-01 00:00:00+00',
			PRIMARY KEY (name)
		)`
	}
	return db.Exec(sql).Error
}
