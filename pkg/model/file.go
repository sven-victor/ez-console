package model

import (
	"io"

	"github.com/spf13/afero"
)

type AccessType string

const (
	AccessTypePublic  AccessType = "public"
	AccessTypePrivate AccessType = "private"
	AccessTypeOwner   AccessType = "owner"
)

type FileType string

const (
	FileTypeImage FileType = "image"
)

type File struct {
	Base
	Name     string     `gorm:"type:varchar(128)" json:"name"`
	Path     string     `gorm:"type:varchar(256)" json:"-"`
	MimiType string     `gorm:"type:varchar(50)" json:"-"`
	Owner    string     `gorm:"type:varchar(50)" json:"-"`
	Size     int64      `gorm:"type:bigint" json:"size"`
	Access   AccessType `gorm:"type:varchar(10)" json:"access"`
	Type     FileType   `gorm:"type:varchar(10)" json:"type"`
}

type FileReader struct {
	File
	Reader io.ReadSeekCloser
	Fs     afero.Fs
}
