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
	"fmt"
	"reflect"

	"github.com/sven-victor/ez-console/pkg/util"
	"gorm.io/gorm"
)

const encryptRotateBatchSize = 100

// EncryptRotateTableResult is the per-table summary of an encrypt-key rotation.
type EncryptRotateTableResult struct {
	Table     string `json:"table"`
	Scanned   int    `json:"scanned"`
	Rewritten int    `json:"rewritten"`
	Skipped   int    `json:"skipped"`
}

// EncryptRotateResult is the aggregate outcome of rotating registered models.
type EncryptRotateResult struct {
	Tables []EncryptRotateTableResult `json:"tables"`
}

// RotateEncryption re-encrypts {CRYPT} values on every registered model using
// oldKey to decrypt and newKey to encrypt. dryRun counts without writing.
func RotateEncryption(ctx context.Context, gdb *gorm.DB, oldKey, newKey string, dryRun bool) (*EncryptRotateResult, error) {
	if gdb == nil {
		return nil, fmt.Errorf("database is not initialized")
	}
	if oldKey == newKey {
		return nil, fmt.Errorf("new encrypt key must differ from the old key")
	}
	if !util.ValidEncryptKeyLength(oldKey) {
		return nil, fmt.Errorf("invalid old encrypt key length: %d, must be 8,16,24 or 32", len(oldKey))
	}
	if !util.ValidEncryptKeyLength(newKey) {
		return nil, fmt.Errorf("invalid new encrypt key length: %d, must be 8,16,24 or 32", len(newKey))
	}

	out := &EncryptRotateResult{}
	for _, model := range RegisteredModels() {
		if !util.StructHasEncryptableFields(model) {
			continue
		}
		if !gdb.Migrator().HasTable(model) {
			continue
		}
		table, err := rotateModel(ctx, gdb, model, oldKey, newKey, dryRun)
		if err != nil {
			return out, err
		}
		if table.Scanned > 0 || table.Rewritten > 0 {
			out.Tables = append(out.Tables, table)
		}
	}
	return out, nil
}

func rotateModel(ctx context.Context, gdb *gorm.DB, model any, oldKey, newKey string, dryRun bool) (EncryptRotateTableResult, error) {
	result := EncryptRotateTableResult{Table: tableName(gdb, model)}
	modelType := reflect.TypeOf(model)
	if modelType.Kind() == reflect.Ptr {
		modelType = modelType.Elem()
	}
	if modelType.Kind() != reflect.Struct {
		return result, nil
	}

	offset := 0
	orderCol := "id"
	parseStmt := &gorm.Statement{DB: gdb}
	if err := parseStmt.Parse(model); err == nil && parseStmt.Schema != nil && len(parseStmt.Schema.PrimaryFields) > 0 {
		orderCol = parseStmt.Schema.PrimaryFields[0].DBName
	}
	for {
		slicePtr := reflect.New(reflect.SliceOf(reflect.PointerTo(modelType)))
		query := gdb.WithContext(ctx).Unscoped().Order(orderCol).Offset(offset).Limit(encryptRotateBatchSize)
		if err := query.Find(slicePtr.Interface()).Error; err != nil {
			return result, fmt.Errorf("%s: failed to load rows: %w", result.Table, err)
		}
		rows := slicePtr.Elem()
		n := rows.Len()
		if n == 0 {
			break
		}

		if err := gdb.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
			for i := 0; i < n; i++ {
				row := rows.Index(i).Interface()
				result.Scanned++
				changed, err := util.RotateEncryptedFields(row, oldKey, newKey)
				if err != nil {
					return fmt.Errorf("%s: %w", result.Table, err)
				}
				if !changed {
					result.Skipped++
					continue
				}
				result.Rewritten++
				if dryRun {
					continue
				}
				if err := tx.Unscoped().Save(row).Error; err != nil {
					return fmt.Errorf("%s: failed to save row: %w", result.Table, err)
				}
			}
			return nil
		}); err != nil {
			return result, err
		}

		offset += n
		if n < encryptRotateBatchSize {
			break
		}
	}
	return result, nil
}

func tableName(gdb *gorm.DB, model any) string {
	stmt := &gorm.Statement{DB: gdb}
	if err := stmt.Parse(model); err == nil && stmt.Schema != nil && stmt.Schema.Table != "" {
		return stmt.Schema.Table
	}
	t := reflect.TypeOf(model)
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}
	return t.Name()
}
