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

// RateLimitSubjectType identifies who a rate-limit rule applies to.
type RateLimitSubjectType string

const (
	RateLimitSubjectAnonymous      RateLimitSubjectType = "anonymous"
	RateLimitSubjectUser           RateLimitSubjectType = "user"
	RateLimitSubjectServiceAccount RateLimitSubjectType = "service_account"
	RateLimitSubjectAccessKey      RateLimitSubjectType = "access_key"
)

// RateLimitSource identifies which layer produced a compiled rule.
type RateLimitSource string

const (
	RateLimitSourceBuiltin RateLimitSource = "builtin"
	RateLimitSourceYAML    RateLimitSource = "yaml"
	RateLimitSourceCode    RateLimitSource = "code"
	RateLimitSourceDB      RateLimitSource = "db"
)

const (
	SettingRateLimitEnabled SettingKey = "rate_limit_enabled"
)

// RateLimitRuntimeSettings is used only to register SettingRateLimitEnabled.
type RateLimitRuntimeSettings struct {
	RateLimitEnabled bool `json:"rate_limit_enabled"`
}

func init() {
	RegisterSettingKeys("", RateLimitRuntimeSettings{}, SettingRateLimitEnabled)
}

// RateLimitRule is a persisted (or compiled) rate-limit policy row.
// Unique key: (subject_type, subject_id, method, path).
// An empty path is the shared bucket for that subject; a non-empty path is the extra route bucket.
// Soft-delete is omitted so the composite unique key can be upserted cleanly.
type RateLimitRule struct {
	ID          uint                 `gorm:"primarykey" json:"-"`
	ResourceID  string               `gorm:"uniqueIndex;size:36;not null" json:"id"`
	CreatedAt   time.Time            `json:"created_at,omitempty"`
	UpdatedAt   time.Time            `json:"updated_at,omitempty"`
	SubjectType RateLimitSubjectType `json:"subject_type" gorm:"size:32;not null;uniqueIndex:uk_rate_limit_rule,priority:1"`
	SubjectID   string               `json:"subject_id" gorm:"size:36;not null;default:'';uniqueIndex:uk_rate_limit_rule,priority:2"`
	Method      string               `json:"method" gorm:"size:16;not null;default:'';uniqueIndex:uk_rate_limit_rule,priority:3"`
	Path        string               `json:"path" gorm:"size:255;not null;default:'';uniqueIndex:uk_rate_limit_rule,priority:4"`
	Rate        int                  `json:"rate"`
	Period      string               `json:"period" gorm:"size:16"`
	Burst       int                  `json:"burst"`
	Quota       int                  `json:"quota"`
	QuotaPeriod string               `json:"quota_period" gorm:"size:16"`
	Enabled     bool                 `json:"enabled" gorm:"not null;default:true"`
	Source      RateLimitSource      `json:"source" gorm:"size:16;not null"`
}

func (RateLimitRule) TableName() string { return "t_rate_limit_rule" }

func (r *RateLimitRule) BeforeCreate(tx *gorm.DB) error {
	if r.ResourceID == "" {
		r.ResourceID = g.NewId(tx.Statement.Table)
	}
	return nil
}

// RateLimitBucket is a JSON DTO for a shared or route bucket.
type RateLimitBucket struct {
	Rate        int    `json:"rate"`
	Period      string `json:"period"`
	Burst       int    `json:"burst"`
	Quota       int    `json:"quota"`
	QuotaPeriod string `json:"quota_period,omitempty"`
	Source      string `json:"source,omitempty"`
	Enabled     bool   `json:"enabled"`
}

// RateLimitSettings is the admin settings payload.
type RateLimitSettings struct {
	Enabled          bool             `json:"enabled"`
	Store            string           `json:"store"`
	FailOpen         bool             `json:"fail_open"`
	Cluster          bool             `json:"cluster"`
	MemoryWarn       bool             `json:"memory_warn"`
	Anonymous        RateLimitBucket  `json:"anonymous"`
	User             RateLimitBucket  `json:"user"`
	ServiceAccount   RateLimitBucket  `json:"service_account"`
}

// RateLimitOverride is a per-user / per-SA shared-bucket override.
type RateLimitOverride struct {
	Rate        int    `json:"rate"`
	Period      string `json:"period"`
	Burst       int    `json:"burst"`
	Quota       int    `json:"quota"`
	QuotaPeriod string `json:"quota_period,omitempty"`
	Enabled     bool   `json:"enabled"`
	Inherited   bool   `json:"inherited"`
	Clear       bool   `json:"clear,omitempty"`
}

// RateLimitEffective is the resolved buckets that would be applied to a request.
type RateLimitEffective struct {
	SubjectType string           `json:"subject_type"`
	SubjectID   string           `json:"subject_id"`
	Method      string           `json:"method"`
	Path        string           `json:"path"`
	Shared      *RateLimitBucket `json:"shared,omitempty"`
	Route       *RateLimitBucket `json:"route,omitempty"`
}
