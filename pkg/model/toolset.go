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
	"database/sql/driver"
	"encoding/json"
	"fmt"

	"github.com/sven-victor/ez-console/pkg/toolset"
)

// ToolSetProtocol represents the protocol used by the toolset
type ToolSetProtocol string

const (
	ToolSetProtocolHTTP      ToolSetProtocol = "http"
	ToolSetProtocolWebSocket ToolSetProtocol = "websocket"
)

// ToolSetStatus represents the AI toolset status
type ToolSetStatus string

const (
	ToolSetStatusEnabled  ToolSetStatus = "enabled"
	ToolSetStatusDisabled ToolSetStatus = "disabled"
)

// ToolSetConfig represents the configuration for an AI toolset
type ToolSetConfig map[string]interface{}

// Value implements the driver.Valuer interface for GORM
func (c ToolSetConfig) Value() (driver.Value, error) {
	if c == nil {
		return nil, nil
	}
	return json.Marshal(c)
}

// Scan implements the sql.Scanner interface for GORM
func (c *ToolSetConfig) Scan(value interface{}) error {
	if value == nil {
		*c = nil
		return nil
	}

	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("cannot scan %T into ToolSetConfig", value)
	}

	return json.Unmarshal(bytes, c)
}

// ToolSet represents an AI toolset configuration
type ToolSet struct {
	Base
	OrganizationID string              `gorm:"size:36;not null" json:"organization_id"`          // Organization ID
	Name           string              `gorm:"size:100;not null" json:"name" binding:"required"` // Toolset name
	Description    string              `gorm:"size:500" json:"description"`                      // Toolset description
	Type           toolset.ToolSetType `gorm:"size:50;not null" json:"type" binding:"required"`  // Toolset type (mcp, etc.)
	Config         ToolSetConfig       `gorm:"type:text" json:"config" swaggertype:"object"`     // Additional configuration
	Status         ToolSetStatus       `gorm:"size:20;not null;default:'enabled'" json:"status"` // Status
	CreatedBy      string              `gorm:"size:36;not null" json:"created_by"`               // Creator user ID
	UpdatedBy      string              `gorm:"size:36" json:"updated_by"`                        // Last updater user ID
	Tools          []ToolDefinition    `gorm:"-" json:"tools,omitempty"`                         // Available tools (runtime only)
}

// TableName returns the table name for ToolSet
func (ToolSet) TableName() string {
	return "t_toolsets"
}

// ToolDefinition represents a tool definition exposed by a toolset.
type ToolDefinition struct {
	Name        string      `json:"name"`
	Description string      `json:"description,omitempty"`
	Parameters  interface{} `json:"parameters,omitempty"`
	Strict      bool        `json:"strict,omitempty"`
	Type        string      `json:"type,omitempty"`
}

// NewToolSet creates a new AI toolset
func NewToolSet(organizationID, name, description string, toolsetType toolset.ToolSetType, config ToolSetConfig, createdBy string) *ToolSet {
	return &ToolSet{
		OrganizationID: organizationID,
		Name:           name,
		Description:    description,
		Type:           toolsetType,
		Config:         config,
		Status:         ToolSetStatusEnabled,
		CreatedBy:      createdBy,
	}
}
