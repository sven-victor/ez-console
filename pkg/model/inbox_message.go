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

// InboxMessageType identifies a built-in or application-defined inbox message.
type InboxMessageType string

const (
	InboxMessagePasswordExpiry    InboxMessageType = "password_expiry"
	InboxMessageLoginFailureLock  InboxMessageType = "login_failure_lock"
	InboxMessageMFADisabled       InboxMessageType = "mfa_disabled"
)

// InboxMessage is a per-user in-app message. It is account-scoped (no organization).
type InboxMessage struct {
	Base
	UserID  string           `gorm:"size:36;not null;index:idx_inbox_user_created,priority:1;index:idx_inbox_user_read,priority:1" json:"user_id"`
	Type    InboxMessageType `gorm:"size:64;not null;index" json:"type"`
	Payload map[string]any   `gorm:"type:text;serializer:json" json:"payload"`
	ReadAt  *time.Time       `gorm:"index:idx_inbox_user_read,priority:2" json:"read_at,omitempty"`
}

func (InboxMessage) TableName() string { return "t_inbox_message" }
