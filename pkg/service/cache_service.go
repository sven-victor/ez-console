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

package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
)

// CacheService cache service
type CacheService struct{}

// DeleteCache deletes a cache record
func (s *CacheService) DeleteCache(ctx context.Context, key string) error {
	return db.Session(ctx).Unscoped().Where("key = ?", key).Delete(&model.TempData{}).Error
}

// CreateCache creates a new cache record
func (s *CacheService) CreateCache(ctx context.Context, key, value string, expiredAt time.Time) (*model.TempData, error) {

	cache := &model.TempData{
		Key:       key,
		Value:     value,
		ExpiredAt: expiredAt,
	}
	if err := db.Session(ctx).Create(cache).Error; err != nil {
		return nil, fmt.Errorf("failed to create cache record: %w", err)
	}

	return cache, nil
}

// GetCache gets a cache record
func (s *CacheService) GetCache(ctx context.Context, key string) (*model.TempData, error) {
	var cache model.TempData

	if err := db.Session(ctx).Where("key = ?", key).First(&cache).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get cache record: %w", err)
	}
	if cache.ExpiredAt.Before(time.Now()) {
		return nil, nil
	}
	return &cache, nil
}
