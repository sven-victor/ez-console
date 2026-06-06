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

// Package dialect provides portable GORM helpers that abstract over
// database-specific SQL syntax so that business logic never writes raw
// dialect SQL.  All time comparisons use DB server-side time to avoid
// cross-node clock skew issues.
package dialect

import (
	"fmt"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// DriverName returns the underlying SQL driver name from a *gorm.DB.
func DriverName(db *gorm.DB) string {
	return db.Dialector.Name()
}

// Now returns a clause.Expr that evaluates to the DB server's current
// timestamp. Use this wherever you previously used time.Now() in WHERE or
// UPDATE expressions to avoid cross-node clock drift.
func Now(db *gorm.DB) clause.Expr {
	switch db.Dialector.Name() {
	case "sqlite":
		return gorm.Expr("datetime('now')")
	default:
		return gorm.Expr("NOW()")
	}
}

// NowPlus returns a clause.Expr that evaluates to (DB server time + d).
// Use this for lease expiry timestamps written in UPDATE/INSERT.
func NowPlus(db *gorm.DB, d time.Duration) clause.Expr {
	switch db.Dialector.Name() {
	case "sqlite":
		secs := int64(d.Seconds())
		return gorm.Expr(fmt.Sprintf("datetime('now', '+%d seconds')", secs))
	case "mysql":
		secs := int64(d.Seconds())
		return gorm.Expr(fmt.Sprintf("DATE_ADD(NOW(), INTERVAL %d SECOND)", secs))
	default:
		// PostgreSQL and others
		return gorm.Expr(fmt.Sprintf("NOW() + INTERVAL '%d seconds'", int64(d.Seconds())))
	}
}

// LockForUpdate applies a SELECT ... FOR UPDATE row lock to the given *gorm.DB
// scope.  Safe to call on all supported dialects.
func LockForUpdate(tx *gorm.DB) *gorm.DB {
	return tx.Clauses(clause.Locking{Strength: "UPDATE"})
}

// LockSkipLocked applies SELECT ... FOR UPDATE SKIP LOCKED so that multiple
// workers can pull distinct rows from a queue without contending on the same
// row.  SQLite does not support SKIP LOCKED; for SQLite we fall back to a
// plain FOR UPDATE (single-node, no contention expected).
func LockSkipLocked(tx *gorm.DB) *gorm.DB {
	if tx.Dialector.Name() == "sqlite" {
		return tx.Clauses(clause.Locking{Strength: "UPDATE"})
	}
	return tx.Clauses(clause.Locking{Strength: "UPDATE", Options: "SKIP LOCKED"})
}

// OnConflictDoNothing returns a clause.OnConflict that silently discards
// duplicate-key INSERT attempts without returning an error.  This is
// the portable equivalent of MySQL's INSERT IGNORE / PG's ON CONFLICT DO NOTHING.
func OnConflictDoNothing() clause.OnConflict {
	return clause.OnConflict{DoNothing: true}
}

// OnConflictDoNothingOnColumns returns an OnConflict that targets specific
// columns (unique-index columns) and does nothing on conflict.
func OnConflictDoNothingOnColumns(columns ...string) clause.OnConflict {
	cols := make([]clause.Column, len(columns))
	for i, c := range columns {
		cols[i] = clause.Column{Name: c}
	}
	return clause.OnConflict{Columns: cols, DoNothing: true}
}

// AtomicClaimTask atomically claims one pending task by issuing a single UPDATE
// statement, avoiding an explicit transaction + SELECT FOR UPDATE round-trip.
// On success it returns (true, nil) and the caller should retrieve the row with
// SELECT WHERE claim_token=claimToken.  Returns (false, nil) when no eligible
// pending task exists, or when the dialect is SQLite (caller must fall back to
// the transaction-based claim path).
//
// tableName must be the resolved GORM table name (e.g. "t_task").
// The update sets: claim_token, status='running', worker_id, started_at, lease_expires_at.
// Eligible tasks must satisfy: status='pending', not_before<=NOW() or NULL,
// not_after>NOW() or NULL.
func AtomicClaimTask(db *gorm.DB, tableName, claimToken, workerID string, leaseTTL time.Duration) (bool, error) {
	leaseSecs := int64(leaseTTL.Seconds())
	var result *gorm.DB
	switch db.Dialector.Name() {
	case "mysql":
		sql := fmt.Sprintf(
			"UPDATE %s SET claim_token=?, status='running', worker_id=?, started_at=NOW(), lease_expires_at=DATE_ADD(NOW(), INTERVAL %d SECOND) "+
				"WHERE status='pending' AND (not_before IS NULL OR not_before <= NOW()) AND (not_after IS NULL OR not_after > NOW()) "+
				"ORDER BY created_at ASC LIMIT 1",
			tableName, leaseSecs,
		)
		result = db.Exec(sql, claimToken, workerID)
	case "postgres":
		sql := fmt.Sprintf(
			"UPDATE %s SET claim_token=?, status='running', worker_id=?, started_at=NOW(), lease_expires_at=NOW() + INTERVAL '%d seconds' "+
				"WHERE resource_id = (SELECT resource_id FROM %s WHERE status='pending' AND (not_before IS NULL OR not_before <= NOW()) AND (not_after IS NULL OR not_after > NOW()) "+
				"ORDER BY created_at ASC LIMIT 1 FOR UPDATE SKIP LOCKED)",
			tableName, leaseSecs, tableName,
		)
		result = db.Exec(sql, claimToken, workerID)
	default:
		// SQLite: single-writer serialization makes a transaction sufficient;
		// signal the caller to use the transaction-based fallback.
		return false, nil
	}
	if result.Error != nil {
		return false, result.Error
	}
	return result.RowsAffected == 1, nil
}
