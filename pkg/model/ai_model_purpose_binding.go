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

// AIModelPurposeBinding assigns one model to one purpose inside an organization.
// One model may be referenced by several purposes. An empty assignment means the
// purpose falls back according to its definition.
type AIModelPurposeBinding struct {
	Base
	OrganizationID string `gorm:"size:36;not null;uniqueIndex:idx_ai_model_purpose_org,priority:1" json:"organization_id"`
	Purpose        string `gorm:"size:64;not null;uniqueIndex:idx_ai_model_purpose_org,priority:2" json:"purpose"`
	ModelID        string `gorm:"size:36;not null;index" json:"model_id"`
}

// TableName returns the table name for AIModelPurposeBinding.
func (AIModelPurposeBinding) TableName() string {
	return "t_ai_model_purpose_bindings"
}
