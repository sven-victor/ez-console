package model

import "time"

type TempData struct {
	Base
	Key       string    `gorm:"uniqueIndex;size:255;not null" json:"key"`
	Value     string    `gorm:"type:text" json:"value"`
	ReadTimes int       `gorm:"default:0" json:"read_times"`
	ExpiredAt time.Time `json:"expired_at"`
}

func (t *TempData) IsExpired() bool {
	return time.Now().After(t.ExpiredAt)
}
