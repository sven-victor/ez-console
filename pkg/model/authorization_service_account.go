package model

import (
	"time"

	"gorm.io/gorm"
)

const (
	ServiceAccountStatusActive   = "active"
	ServiceAccountStatusDisabled = "disabled"
)

// ServiceAccount Service account model
type ServiceAccount struct {
	Base
	Name        string     `json:"name" gorm:"size:255;not null"`
	Description string     `json:"description" gorm:"size:1000"`
	Status      string     `json:"status" gorm:"size:20;default:'active'"`
	LastAccess  *time.Time `json:"last_access" gorm:"default:null"`

	// Associations
	Roles          []Role                    `json:"roles,omitempty" gorm:"many2many:service_account_roles;"`
	AccessKeys     []ServiceAccountAccessKey `json:"access_keys,omitempty" gorm:"foreignKey:ServiceAccountID;references:ResourceID"`
	PolicyDocument PolicyDocument            `json:"policy_document" gorm:"type:text;serializer:json"`
}

// ServiceAccountAccessKey Service account access key
type ServiceAccountAccessKey struct {
	Base
	Name             string     `json:"name" gorm:"size:255;not null"`
	ServiceAccountID string     `json:"service_account_id" gorm:"size:36;not null;index"`
	AccessKeyID      string     `json:"access_key_id" gorm:"size:100;not null;uniqueIndex"`
	SecretAccessKey  string     `json:"-" gorm:"size:255;not null"`
	Status           string     `json:"status" gorm:"size:20;default:'active'"`
	Description      string     `json:"description" gorm:"size:255"`
	LastUsed         *time.Time `json:"last_used" gorm:"default:null"`
	ExpiresAt        *time.Time `json:"expires_at" gorm:"default:null"`
}

// ServiceAccountAccessKeyStatus Service account access key status
const (
	ServiceAccountAccessKeyStatusActive   = "active"
	ServiceAccountAccessKeyStatusDisabled = "disabled"
)

// IsExpired checks if the key has expired
func (key *ServiceAccountAccessKey) IsExpired() bool {
	if key.ExpiresAt == nil {
		return false
	}
	return time.Now().After(*key.ExpiresAt)
}

// IsActive checks if the key is active
func (key *ServiceAccountAccessKey) IsActive() bool {
	return key.Status == ServiceAccountAccessKeyStatusActive
}

// BeforeCreate hook executed before creation
func (sa *ServiceAccount) BeforeCreate(tx *gorm.DB) error {
	if sa.Status == "" {
		sa.Status = "active"
	}

	return sa.Base.BeforeCreate(tx)
}
