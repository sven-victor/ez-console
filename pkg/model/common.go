package model

import (
	"time"

	g "github.com/sven-victor/ez-utils/generator"
	"gorm.io/gorm"
)

// Base base model struct
type Base struct {
	ID         uint           `gorm:"primarykey" json:"-"`
	ResourceID string         `gorm:"uniqueIndex;size:36;not null" json:"id"`
	CreatedAt  time.Time      `json:"created_at,omitempty"`
	UpdatedAt  time.Time      `json:"updated_at,omitempty"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

// BeforeCreate generates a UUID before creating a record
func (b *Base) BeforeCreate(tx *gorm.DB) error {
	if b.ResourceID == "" {
		b.ResourceID = g.NewId(tx.Statement.Table)
	}
	return nil
}

type Slice[T any] []T
