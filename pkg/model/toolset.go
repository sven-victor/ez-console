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
}

// TableName returns the table name for ToolSet
func (ToolSet) TableName() string {
	return "t_toolsets"
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
