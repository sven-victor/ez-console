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
