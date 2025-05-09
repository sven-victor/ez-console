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
