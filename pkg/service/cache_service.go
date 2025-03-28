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
