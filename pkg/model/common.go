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

package model

import (
	"time"

	g "github.com/sven-victor/ez-utils/generator"
	"gorm.io/gorm"
)

// Base base model struct
type Base struct {
	ID         uint           `gorm:"primarykey" json:"-"`
	ResourceID string         `gorm:"uniqueIndex;size:36;not null" json:"id"`
	CreatedAt  time.Time      `json:"created_at,omitempty"`
	UpdatedAt  time.Time      `json:"updated_at,omitempty"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

// BeforeCreate generates a UUID before creating a record
func (b *Base) BeforeCreate(tx *gorm.DB) error {
	if b.ResourceID == "" {
		b.ResourceID = g.NewId(tx.Statement.Table)
	}
	return nil
}

type Slice[T any] []T
