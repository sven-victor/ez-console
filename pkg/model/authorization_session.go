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
)

// Session represents user session information
type Session struct {
	Base
	UserID       string    `gorm:"index;not null" json:"user_id"`
	User         User      `gorm:"foreignKey:UserID;references:ResourceID" json:"user,omitempty"`
	Token        string    `gorm:"size:255;not null" json:"-"`
	IPAddress    string    `gorm:"size:45" json:"ip_address"`
	UserAgent    string    `gorm:"size:255" json:"user_agent"`
	LastActiveAt time.Time `json:"last_active_at"`
	ExpiredAt    time.Time `json:"expired_at"`
	IsValid      bool      `gorm:"default:true" json:"is_valid"`
}

// IsExpired checks if the session has expired
func (s *Session) IsExpired() bool {
	return time.Now().After(s.ExpiredAt)
}

// IsActive checks if the session is valid and not expired
func (s *Session) IsActive() bool {
	return s.IsValid && !s.IsExpired()
}

// UpdateLastActive updates the last active time
func (s *Session) UpdateLastActive() {
	s.LastActiveAt = time.Now()
}

// Invalidate invalidates the session
func (s *Session) Invalidate() {
	s.IsValid = false
}
