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
