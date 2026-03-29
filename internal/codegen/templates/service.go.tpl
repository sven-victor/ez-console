// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package service

import (
	"context"

	"github.com/sven-victor/ez-console/pkg/db"
	"{{.ModelImport}}"
	gogorm "gorm.io/gorm"
)

type {{.Name}}Service struct{}

func New{{.Name}}Service() *{{.Name}}Service {
	return &{{.Name}}Service{}
}

func (s *{{.Name}}Service) gormDB(ctx context.Context) *gogorm.DB {
	return db.Session(ctx)
}

func (s *{{.Name}}Service) Create(ctx context.Context, {{.Short}} *model.{{.Name}}) error {
	return s.gormDB(ctx).Create({{.Short}}).Error
}

func (s *{{.Name}}Service) Get(ctx context.Context, id string) (*model.{{.Name}}, error) {
	var {{.Short}} model.{{.Name}}
	err := s.gormDB(ctx).Where("id = ?", id).First(&{{.Short}}).Error
	if err != nil {
		return nil, err
	}
	return &{{.Short}}, nil
}

func (s *{{.Name}}Service) List(ctx context.Context, limit, offset int) ([]model.{{.Name}}, int64, error) {
	var rows []model.{{.Name}}
	var total int64
	if err := s.gormDB(ctx).Model(&model.{{.Name}}{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}
	if err := s.gormDB(ctx).Limit(limit).Offset(offset).Find(&rows).Error; err != nil {
		return nil, 0, err
	}
	return rows, total, nil
}

func (s *{{.Name}}Service) Update(ctx context.Context, id string, {{.Short}} *model.{{.Name}}) error {
	return s.gormDB(ctx).Model(&model.{{.Name}}{}).Where("id = ?", id).Updates({{.Short}}).Error
}

func (s *{{.Name}}Service) Delete(ctx context.Context, id string) error {
	return s.gormDB(ctx).Where("id = ?", id).Delete(&model.{{.Name}}{}).Error
}
