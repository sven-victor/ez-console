// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type {{.Name}} struct {
	ID        string    `gorm:"primaryKey;type:varchar(36)"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func ({{.Short}} *{{.Name}}) TableName() string {
	return "t_{{.Lower}}"
}

func ({{.Short}} *{{.Name}}) BeforeCreate(tx *gorm.DB) error {
	if {{.Short}}.ID == "" {
		{{.Short}}.ID = uuid.New().String()
	}
	return nil
}
