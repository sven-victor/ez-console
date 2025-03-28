package model

import (
	"time"
)

type AuditLogDetail struct {
	OldData interface{} `json:"old_data,omitempty"`
	NewData interface{} `json:"new_data,omitempty"`
	Request interface{} `json:"request,omitempty"`
}

// AuditLog represents system operation audit logs
type AuditLog struct {
	Base
	UserID     string         `gorm:"size:36;index;not null" json:"user_id"`    // User ID of the operator
	Username   string         `gorm:"size:50;not null" json:"username"`         // Username of the operator
	Action     string         `gorm:"size:50;not null" json:"action"`           // Operation type
	ActionName string         `gorm:"size:50;not null" json:"action_name"`      // Operation name
	RefID      string         `gorm:"size:36" json:"ref_id"`                    // Associated resource ID
	Details    AuditLogDetail `gorm:"type:text;serializer:json" json:"details"` // Operation details, in JSON format
	IP         string         `gorm:"size:50" json:"ip"`                        // IP address of the operation
	UserAgent  string         `gorm:"size:255" json:"user_agent"`               // User agent information
	Status     string         `gorm:"size:20;not null" json:"status"`           // Operation status: success, failed
	Timestamp  time.Time      `gorm:"not null;index" json:"timestamp"`          // Timestamp of the operation

	// Associated user object, but not included in JSON
	User User `gorm:"foreignKey:UserID;references:ResourceID" json:"-"`
}
