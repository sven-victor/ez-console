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

import "time"

// PasswordHistory user password history
type PasswordHistory struct {
	Base
	UserID       string    `json:"user_id" gorm:"index;not null"`            // User ID
	Salt         string    `json:"salt" gorm:"not null;default:''"`          // Salt
	PasswordHash string    `json:"password_hash" gorm:"not null;default:''"` // Password hash
	CreatedAt    time.Time `json:"created_at" gorm:"not null"`               // Creation time
}
