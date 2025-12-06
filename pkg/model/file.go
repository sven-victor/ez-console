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
