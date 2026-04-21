package cache

import (
	"context"
	"time"

	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// DBSessionFunc returns a *gorm.DB scoped to the given context.
// This indirection avoids a direct import of the db package (which would
// create a circular dependency: cache -> db -> config, and db depends on cache
// during Init).
type DBSessionFunc func(ctx context.Context) *gorm.DB

// DBCache implements the Cache interface backed by the t_cache_entry table.
type DBCache struct {
	session DBSessionFunc
}

// NewDBCache creates a DB-backed cache.
func NewDBCache(sessionFn DBSessionFunc) *DBCache {
	return &DBCache{session: sessionFn}
}

func (d *DBCache) Get(ctx context.Context, key string) ([]byte, error) {
	var entry model.CacheEntry
	if err := d.session(ctx).Where("`key` = ? AND expired_at > ?", key, time.Now()).First(&entry).Error; err != nil {
		return nil, ErrCacheMiss
	}
	return []byte(entry.Value), nil
}

func (d *DBCache) Set(ctx context.Context, key string, value []byte, ttl time.Duration) error {
	entry := model.CacheEntry{
		Key:       key,
		Value:     string(value),
		ExpiredAt: time.Now().Add(ttl),
	}
	return d.session(ctx).Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "key"}},
		DoUpdates: clause.AssignmentColumns([]string{"value", "expired_at"}),
	}).Create(&entry).Error
}

func (d *DBCache) Delete(ctx context.Context, key string) error {
	return d.session(ctx).Where("`key` = ?", key).Delete(&model.CacheEntry{}).Error
}

// Clear removes all entries from the DB cache table.
func (d *DBCache) Clear() {
	_ = d.session(context.Background()).Where("1 = 1").Delete(&model.CacheEntry{}).Error
}

// GC deletes expired entries from the DB cache table.
func (d *DBCache) GC() {
	_ = d.session(context.Background()).Where("expired_at <= ?", time.Now()).Delete(&model.CacheEntry{}).Error
}

func (d *DBCache) Close() error { return nil }
