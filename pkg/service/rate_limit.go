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
	"strings"
	"sync"
	"time"

	"github.com/sven-victor/ez-console/pkg/cache"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/ratelimit"
	"github.com/sven-victor/ez-console/pkg/util"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func persistRateLimitRule(tx *gorm.DB, row *model.RateLimitRule) error {
	// Select + Assignments include Enabled so false survives create/upsert (GORM skips bool zeros).
	row.Source = model.RateLimitSourceDB
	return tx.Select(
		"ResourceID", "CreatedAt", "UpdatedAt",
		"SubjectType", "SubjectID", "Method", "Path",
		"Rate", "Period", "Burst", "Quota", "QuotaPeriod",
		"Enabled", "Source",
	).Clauses(clause.OnConflict{
		Columns: []clause.Column{{Name: "subject_type"}, {Name: "subject_id"}, {Name: "method"}, {Name: "path"}},
		DoUpdates: clause.Assignments(map[string]any{
			"rate":         row.Rate,
			"period":       row.Period,
			"burst":        row.Burst,
			"quota":        row.Quota,
			"quota_period": row.QuotaPeriod,
			"enabled":      row.Enabled,
			"source":       model.RateLimitSourceDB,
			"updated_at":   time.Now(),
		}),
	}).Create(row).Error
}

type RateLimitService interface {
	Limiter() *ratelimit.Limiter
	GetRateLimitSettings(ctx context.Context) (*model.RateLimitSettings, error)
	UpdateRateLimitSettings(ctx context.Context, settings *model.RateLimitSettings) error
	ListRules(ctx context.Context, page, pageSize int, search, subjectType, subjectID string) ([]model.RateLimitRule, int64, error)
	CreateRule(ctx context.Context, rule *model.RateLimitRule) error
	UpdateRule(ctx context.Context, id string, rule *model.RateLimitRule) error
	DeleteRule(ctx context.Context, id string) error
	GetRule(ctx context.Context, id string) (*model.RateLimitRule, error)
	Effective(ctx context.Context, st, sid, method, path string) model.RateLimitEffective
	GetOverride(ctx context.Context, st model.RateLimitSubjectType, subjectID string) (*model.RateLimitOverride, error)
	SetOverride(ctx context.Context, st model.RateLimitSubjectType, subjectID string, ov model.RateLimitOverride) error
	ResetCounters(ctx context.Context, req model.RateLimitResetRequest) (*model.RateLimitResetResult, error)
	SetRegisteredPaths(paths []string)
}

type rateLimitService struct {
	limiter *ratelimit.Limiter
	base    BaseService
	mu      sync.RWMutex
	paths   map[string]struct{}
}

func NewRateLimitService(_ context.Context, limiter *ratelimit.Limiter, base BaseService) RateLimitService {
	return &rateLimitService{limiter: limiter, base: base}
}

func (s *rateLimitService) Limiter() *ratelimit.Limiter { return s.limiter }

func (s *rateLimitService) SetRegisteredPaths(paths []string) {
	m := make(map[string]struct{}, len(paths))
	for _, p := range paths {
		m[p] = struct{}{}
	}
	s.mu.Lock()
	s.paths = m
	s.mu.Unlock()
}

func (s *rateLimitService) knownPath(path string) bool {
	s.mu.RLock()
	defer s.mu.RUnlock()
	if len(s.paths) == 0 {
		return true
	}
	_, ok := s.paths[path]
	return ok
}

func loadDBRules(ctx context.Context) ([]model.RateLimitRule, error) {
	return cache.RateLimitRules.GetOrLoad(ctx, "all", func() ([]model.RateLimitRule, error) {
		var rows []model.RateLimitRule
		if err := db.Session(ctx).Find(&rows).Error; err != nil {
			return nil, err
		}
		return rows, nil
	})
}

func invalidateRules(ctx context.Context) {
	cache.PublishInvalidate(ctx, cache.CacheNameRateLimitRules, "*")
}

func (s *rateLimitService) GetRateLimitSettings(ctx context.Context) (*model.RateLimitSettings, error) {
	cfg := config.GetConfig()
	enabled, err := s.base.GetBoolSetting(ctx, model.SettingRateLimitEnabled, true)
	if err != nil {
		enabled = true
	}
	rs := s.limiter.RuleSet(ctx)
	store := cfg.RateLimit.GetStore()
	out := &model.RateLimitSettings{
		Enabled:    enabled && cfg.RateLimit.GetEnabled(),
		Store:      store,
		FailOpen:   cfg.RateLimit.GetFailOpen(),
		Cluster:    cfg.Cluster.Enabled,
		MemoryWarn: cfg.Cluster.Enabled && store == "memory",
	}
	if r, ok := rs.Shared(model.RateLimitSubjectAnonymous, ""); ok {
		out.Anonymous = r.ToBucket()
	}
	if r, ok := rs.Shared(model.RateLimitSubjectUser, ""); ok {
		out.User = r.ToBucket()
	}
	if r, ok := rs.Shared(model.RateLimitSubjectServiceAccount, ""); ok {
		out.ServiceAccount = r.ToBucket()
	}
	return out, nil
}

func (s *rateLimitService) UpdateRateLimitSettings(ctx context.Context, settings *model.RateLimitSettings) error {
	if settings == nil {
		return util.NewErrorMessage("E4001", "settings are required")
	}
	val := "false"
	if settings.Enabled {
		val = "true"
	}
	if _, err := s.base.UpdateSetting(ctx, model.SettingRateLimitEnabled, val, "Runtime switch for HTTP rate limiting"); err != nil {
		return err
	}
	if err := s.upsertShared(ctx, model.RateLimitSubjectAnonymous, settings.Anonymous); err != nil {
		return err
	}
	if err := s.upsertShared(ctx, model.RateLimitSubjectUser, settings.User); err != nil {
		return err
	}
	if err := s.upsertShared(ctx, model.RateLimitSubjectServiceAccount, settings.ServiceAccount); err != nil {
		return err
	}
	invalidateRules(ctx)
	return nil
}

func (s *rateLimitService) upsertShared(ctx context.Context, st model.RateLimitSubjectType, bucket model.RateLimitBucket) error {
	if bucket.Rate <= 0 {
		return util.NewErrorMessage("E4001", "rate must be greater than 0")
	}
	if _, err := ratelimit.LimitFromRule(bucket.Rate, bucket.Period, bucket.Burst, bucket.Quota, bucket.QuotaPeriod); err != nil {
		return util.NewErrorMessage("E4001", err.Error())
	}
	period := bucket.Period
	if period == "" {
		period = "1m"
	}
	row := model.RateLimitRule{
		SubjectType: st,
		SubjectID:   "",
		Method:      "",
		Path:        "",
		Rate:        bucket.Rate,
		Period:      period,
		Burst:       bucket.Burst,
		Quota:       bucket.Quota,
		QuotaPeriod: bucket.QuotaPeriod,
		Enabled:     true,
		Source:      model.RateLimitSourceDB,
	}
	return persistRateLimitRule(db.Session(ctx), &row)
}

func (s *rateLimitService) ListRules(ctx context.Context, page, pageSize int, search, subjectType, subjectID string) ([]model.RateLimitRule, int64, error) {
	if page < 1 {
		page = 1
	}
	if pageSize < 1 || pageSize > 100 {
		pageSize = 10
	}
	q := db.Session(ctx).Model(&model.RateLimitRule{})
	if subjectType != "" {
		q = q.Where("subject_type = ?", subjectType)
	}
	if subjectID != "" {
		q = q.Where("subject_id = ?", subjectID)
	}
	if search != "" {
		like := "%" + search + "%"
		q = q.Where("path LIKE ? OR method LIKE ? OR subject_id LIKE ?", like, like, like)
	}
	var total int64
	if err := q.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	var rows []model.RateLimitRule
	if err := q.Order("path asc, subject_type asc").Offset((page - 1) * pageSize).Limit(pageSize).Find(&rows).Error; err != nil {
		return nil, 0, err
	}
	return rows, total, nil
}

func (s *rateLimitService) GetRule(ctx context.Context, id string) (*model.RateLimitRule, error) {
	var row model.RateLimitRule
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&row).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, util.NewErrorMessage("E4041", "Rate limit rule not found")
		}
		return nil, err
	}
	return &row, nil
}

func (s *rateLimitService) CreateRule(ctx context.Context, rule *model.RateLimitRule) error {
	if err := s.validateRule(rule, true); err != nil {
		return err
	}
	rule.Source = model.RateLimitSourceDB
	rule.Method = strings.ToUpper(strings.TrimSpace(rule.Method))
	if err := db.Session(ctx).Select(
		"ResourceID", "CreatedAt", "UpdatedAt",
		"SubjectType", "SubjectID", "Method", "Path",
		"Rate", "Period", "Burst", "Quota", "QuotaPeriod",
		"Enabled", "Source",
	).Create(rule).Error; err != nil {
		return util.NewErrorMessage("E4001", "failed to create rate limit rule", err)
	}
	invalidateRules(ctx)
	return nil
}

func (s *rateLimitService) UpdateRule(ctx context.Context, id string, rule *model.RateLimitRule) error {
	existing, err := s.GetRule(ctx, id)
	if err != nil {
		return err
	}
	if err := s.validateRule(rule, false); err != nil {
		return err
	}
	existing.SubjectType = rule.SubjectType
	existing.SubjectID = rule.SubjectID
	existing.Method = strings.ToUpper(strings.TrimSpace(rule.Method))
	existing.Path = rule.Path
	existing.Rate = rule.Rate
	existing.Period = rule.Period
	existing.Burst = rule.Burst
	existing.Quota = rule.Quota
	existing.QuotaPeriod = rule.QuotaPeriod
	existing.Enabled = rule.Enabled
	existing.Source = model.RateLimitSourceDB
	if err := db.Session(ctx).Select(
		"ResourceID", "CreatedAt", "UpdatedAt",
		"SubjectType", "SubjectID", "Method", "Path",
		"Rate", "Period", "Burst", "Quota", "QuotaPeriod",
		"Enabled", "Source",
	).Save(existing).Error; err != nil {
		return err
	}
	*rule = *existing
	invalidateRules(ctx)
	return nil
}

func (s *rateLimitService) DeleteRule(ctx context.Context, id string) error {
	res := db.Session(ctx).Unscoped().Where("resource_id = ?", id).Delete(&model.RateLimitRule{})
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return util.NewErrorMessage("E4041", "Rate limit rule not found")
	}
	invalidateRules(ctx)
	return nil
}

func (s *rateLimitService) Effective(ctx context.Context, st, sid, method, path string) model.RateLimitEffective {
	return s.limiter.Effective(ctx, model.RateLimitSubjectType(st), sid, method, path)
}

func (s *rateLimitService) GetOverride(ctx context.Context, st model.RateLimitSubjectType, subjectID string) (*model.RateLimitOverride, error) {
	var row model.RateLimitRule
	err := db.Session(ctx).Where(
		"subject_type = ? AND subject_id = ? AND method = ? AND path = ?",
		st, subjectID, "", "",
	).First(&row).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		inherited := s.limiter.Effective(ctx, st, subjectID, "", "")
		ov := &model.RateLimitOverride{Inherited: true, Enabled: true, Period: "1m"}
		if inherited.Shared != nil {
			ov.Rate = inherited.Shared.Rate
			ov.Period = inherited.Shared.Period
			ov.Burst = inherited.Shared.Burst
			ov.Quota = inherited.Shared.Quota
			ov.QuotaPeriod = inherited.Shared.QuotaPeriod
		}
		return ov, nil
	}
	if err != nil {
		return nil, err
	}
	return &model.RateLimitOverride{
		Rate:        row.Rate,
		Period:      row.Period,
		Burst:       row.Burst,
		Quota:       row.Quota,
		QuotaPeriod: row.QuotaPeriod,
		Enabled:     row.Enabled,
		Inherited:   false,
	}, nil
}

func (s *rateLimitService) SetOverride(ctx context.Context, st model.RateLimitSubjectType, subjectID string, ov model.RateLimitOverride) error {
	if ov.Clear {
		res := db.Session(ctx).Unscoped().Where(
			"subject_type = ? AND subject_id = ? AND method = ? AND path = ?",
			st, subjectID, "", "",
		).Delete(&model.RateLimitRule{})
		if res.Error != nil {
			return res.Error
		}
		invalidateRules(ctx)
		return nil
	}
	if ov.Rate <= 0 {
		return util.NewErrorMessage("E4001", "rate must be greater than 0")
	}
	if _, err := ratelimit.LimitFromRule(ov.Rate, ov.Period, ov.Burst, ov.Quota, ov.QuotaPeriod); err != nil {
		return util.NewErrorMessage("E4001", err.Error())
	}
	period := ov.Period
	if period == "" {
		period = "1m"
	}
	row := model.RateLimitRule{
		SubjectType: st,
		SubjectID:   subjectID,
		Method:      "",
		Path:        "",
		Rate:        ov.Rate,
		Period:      period,
		Burst:       ov.Burst,
		Quota:       ov.Quota,
		QuotaPeriod: ov.QuotaPeriod,
		Enabled:     ov.Enabled,
		Source:      model.RateLimitSourceDB,
	}
	if err := persistRateLimitRule(db.Session(ctx), &row); err != nil {
		return err
	}
	invalidateRules(ctx)
	return nil
}

func (s *rateLimitService) ResetCounters(ctx context.Context, req model.RateLimitResetRequest) (*model.RateLimitResetResult, error) {
	spec, err := s.resetSpec(ctx, req)
	if err != nil {
		return nil, err
	}
	n, err := s.limiter.Reset(ctx, spec)
	if err != nil {
		return nil, util.NewErrorMessage("E5001", "Failed to reset rate limit counters", err)
	}
	return &model.RateLimitResetResult{Deleted: n}, nil
}

func (s *rateLimitService) resetSpec(ctx context.Context, req model.RateLimitResetRequest) (ratelimit.ResetSpec, error) {
	switch req.Scope {
	case model.RateLimitResetScopeGlobal:
		return ratelimit.ResetSpec{All: true}, nil
	case model.RateLimitResetScopeSubject:
		if req.SubjectType == "" {
			return ratelimit.ResetSpec{}, util.NewErrorMessage("E4001", "subject_type is required")
		}
		switch req.SubjectType {
		case model.RateLimitSubjectAnonymous, model.RateLimitSubjectUser, model.RateLimitSubjectServiceAccount:
		default:
			return ratelimit.ResetSpec{}, util.NewErrorMessage("E4001", "invalid subject_type")
		}
		return ratelimit.ResetSpec{
			SubjectType: req.SubjectType,
			SubjectID:   req.SubjectID,
			SharedOnly:  req.SubjectID == "",
		}, nil
	case model.RateLimitResetScopeRule:
		if req.RuleID == "" {
			return ratelimit.ResetSpec{}, util.NewErrorMessage("E4001", "rule_id is required")
		}
		rule, err := s.GetRule(ctx, req.RuleID)
		if err != nil {
			return ratelimit.ResetSpec{}, err
		}
		spec := ratelimit.ResetSpec{
			SubjectType: rule.SubjectType,
			SubjectID:   rule.SubjectID,
			Method:      rule.Method,
			Path:        rule.Path,
		}
		if rule.Path == "" {
			spec.SharedOnly = true
		} else {
			spec.RouteOnly = true
		}
		return spec, nil
	default:
		return ratelimit.ResetSpec{}, util.NewErrorMessage("E4001", "scope must be global, subject, or rule")
	}
}

func (s *rateLimitService) validateRule(rule *model.RateLimitRule, creating bool) error {
	if rule == nil {
		return util.NewErrorMessage("E4001", "rule is required")
	}
	switch rule.SubjectType {
	case model.RateLimitSubjectAnonymous, model.RateLimitSubjectUser, model.RateLimitSubjectServiceAccount:
	default:
		return util.NewErrorMessage("E4001", "invalid subject_type")
	}
	if rule.Rate <= 0 {
		return util.NewErrorMessage("E4001", "rate must be greater than 0")
	}
	if _, err := ratelimit.LimitFromRule(rule.Rate, rule.Period, rule.Burst, rule.Quota, rule.QuotaPeriod); err != nil {
		return util.NewErrorMessage("E4001", err.Error())
	}
	if rule.Path != "" {
		if rule.Quota > 0 {
			return util.NewErrorMessage("E4001", "quota is only allowed on shared rules (empty path)")
		}
		if ratelimit.SkipPath(rule.Method, rule.Path) {
			return util.NewErrorMessage("E4001", "cannot attach a rule to a skipped path")
		}
		if !s.knownPath(rule.Path) {
			return util.NewErrorMessage("E4001", fmt.Sprintf("unknown route path %q", rule.Path))
		}
	}
	_ = creating
	return nil
}

func NewRateLimitStore(cfg *config.Config) (ratelimit.Store, error) {
	switch cfg.RateLimit.GetStore() {
	case "redis":
		return ratelimit.NewRedisStore(cfg.RateLimit.RedisConfig(cfg.Cache.Redis))
	default:
		return ratelimit.NewMemoryStore(), nil
	}
}

func initRateLimiter(cfg *config.Config, settings SettingService) (*ratelimit.Limiter, error) {
	store, err := NewRateLimitStore(cfg)
	if err != nil {
		return nil, err
	}
	enabled := func(ctx context.Context) bool {
		if !cfg.RateLimit.GetEnabled() {
			return false
		}
		on, err := settings.GetBoolSetting(ctx, model.SettingRateLimitEnabled, true)
		if err != nil {
			return true
		}
		return on
	}
	limiter := ratelimit.NewLimiter(store, cfg.RateLimit, loadDBRules, enabled)
	cache.SetRateLimitInvalidateHook(limiter.Invalidate)
	return limiter, nil
}
