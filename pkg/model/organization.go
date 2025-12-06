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

// Organization represents an organization in the system
type Organization struct {
	Base
	Name        string `gorm:"size:100;not null" json:"name"`
	Description string `gorm:"size:255" json:"description"`
	Status      string `gorm:"size:20;not null;default:'active'" json:"status"` // active, disabled
}

const (
	OrganizationStatusActive   = "active"
	OrganizationStatusDisabled = "disabled"
)

// IsActive checks if the organization is active
func (o *Organization) IsActive() bool {
	return o.Status == OrganizationStatusActive
}
