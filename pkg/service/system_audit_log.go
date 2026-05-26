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
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/robfig/cron/v3"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
)

type auditLogService struct {
	baseService BaseService
}

type AuditLogService interface {
	StartAudit(ctx *gin.Context, resourceID string, handleFunc func(auditLog *model.AuditLog) error, withOptions ...WithStartAuditOptions) error
	GetAuditLogsByUser(ctx context.Context, userID string, page, pageSize int) ([]model.AuditLog, int64, error)
	GetAuditLogs(ctx context.Context, filters AuditLogFilters, page, pageSize int) ([]model.AuditLog, int64, error)
	GetAuditLogsByResourceID(ctx context.Context, resource, resourceID string, page, pageSize int) ([]model.AuditLog, int64, error)
}

var (
	auditLogServiceOnce     sync.Once
	auditLogServiceInstance AuditLogService
)

func NewAuditLogService(_ context.Context, baseService BaseService) AuditLogService {
	auditLogServiceOnce.Do(func() {
		inst := &auditLogService{
			baseService: baseService,
		}

		taskscheduler.RegisterScheduledJob(&taskscheduler.ScheduledJobDef{
			ID:          "audit-log-cleanup",
			Name:        "Audit Log Cleanup",
			Spec:        "0 0 * * *",
			Schedule:    cron.Every(time.Hour * 24),
			Description: "Cleanup audit logs",
			TaskType:    auditLogCleanupTaskType,
			Runner:      taskscheduler.NewFuncTaskRunner(inst.runAuditLogCleanupJob),
		})
		auditLogServiceInstance = inst
	})
	return auditLogServiceInstance
}

type StartAuditOptions struct {
	BeforeFilters []func(*model.AuditLog)
	AfterFilters  []func(*model.AuditLog)
}

type WithStartAuditOptions func(*StartAuditOptions)

func WithBeforeFilters(filters ...func(*model.AuditLog)) WithStartAuditOptions {
	return func(options *StartAuditOptions) {
		options.BeforeFilters = append(options.BeforeFilters, filters...)
	}
}

func WithAfterFilters(filters ...func(*model.AuditLog)) WithStartAuditOptions {
	return func(options *StartAuditOptions) {
		options.AfterFilters = append(options.AfterFilters, filters...)
	}
}

// StartAudit is used in Controllers to record audit logs and execute operations
// detailFunc is used to generate operation details
// handleFunc is used to execute the actual operation
func (s *auditLogService) StartAudit(ctx *gin.Context, resourceID string, handleFunc func(auditLog *model.AuditLog) error, withOptions ...WithStartAuditOptions) error {
	logger := log.GetContextLogger(ctx)
	var options StartAuditOptions
	for _, option := range withOptions {
		option(&options)
	}

	auditLog := model.AuditLog{
		RefID:     resourceID,
		Status:    "success",
		Timestamp: time.Now(),
	}

	code, ok := ctx.Get("permission_code")
	if ok {
		actionCode := code.(string)
		action := middleware.GetPermission(actionCode)
		if action == nil && strings.Contains(actionCode, ",") {
			for _, part := range strings.Split(actionCode, ",") {
				part = strings.TrimSpace(part)
				if part == "" {
					continue
				}
				if p := middleware.GetPermission(part); p != nil {
					action = p
					break
				}
			}
		}
		if action != nil {
			auditLog.Action = action.Code
			auditLog.ActionName = action.Name
		}
	}

	// Get user information from context
	userInterface, ok := ctx.Get("user")
	if ok {
		user, ok := userInterface.(model.User)
		if ok {
			auditLog.UserID = user.ResourceID
			auditLog.Username = user.Username
		}
	}

	// Get IP and UserAgent
	auditLog.IP = ctx.ClientIP()
	auditLog.UserAgent = ctx.Request.UserAgent()
	for _, filter := range options.BeforeFilters {
		filter(&auditLog)
	}
	// Execute actual operation
	err := handleFunc(&auditLog)
	// Status
	if err != nil {
		auditLog.Status = "failed"
	}
	for _, filter := range options.AfterFilters {
		filter(&auditLog)
	}

	// If recording audit log fails but operation succeeds, still return success
	if logErr := db.Session(ctx).Create(&auditLog).Error; logErr != nil {
		// Can choose to record log error but not affect operation result
		level.Error(logger).Log("msg", "Failed to record audit log", "err", logErr.Error())
	}

	return err
}

// GetAuditLogsByUser gets audit logs for a specified user
func (s *auditLogService) GetAuditLogsByUser(ctx context.Context, userID string, page, pageSize int) ([]model.AuditLog, int64, error) {
	var logs []model.AuditLog
	var total int64

	query := db.Session(ctx).Model(&model.AuditLog{}).Where("user_id = ?", userID)

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Paginated query
	offset := (page - 1) * pageSize
	err := query.Order("timestamp desc").Offset(offset).Limit(pageSize).Find(&logs).Error
	if err != nil {
		return nil, 0, err
	}

	return logs, total, nil
}

type AuditLogFilters struct {
	UserID     string     `form:"user_id"`
	Username   string     `form:"username"`
	Action     string     `form:"action"`
	ResourceID string     `form:"resource_id"`
	StartTime  *time.Time `form:"start_time"`
	EndTime    *time.Time `form:"end_time"`
	Search     string     `form:"search"`
	Status     string     `form:"status"`
}

// GetAuditLogs gets all audit logs, supports multiple filter conditions
func (s *auditLogService) GetAuditLogs(ctx context.Context, filters AuditLogFilters, page, pageSize int) ([]model.AuditLog, int64, error) {
	var logs []model.AuditLog
	var total int64

	query := db.Session(ctx).Model(&model.AuditLog{})

	// Apply filter conditions
	if filters.UserID != "" {
		query = query.Where("user_id = ?", filters.UserID)
	}
	if filters.Username != "" {
		query = query.Where("username = ?", filters.Username)
	}
	if filters.Action != "" {
		query = query.Where("action = ?", filters.Action)
	}
	if filters.ResourceID != "" {
		query = query.Where("resource_id = ?", filters.ResourceID)
	}
	if filters.StartTime != nil {
		query = query.Where("timestamp >= ?", *filters.StartTime)
	}
	if filters.EndTime != nil {
		query = query.Where("timestamp <= ?", *filters.EndTime)
	}
	if filters.Status != "" {
		query = query.Where("status = ?", filters.Status)
	}
	if filters.Search != "" {
		query = query.Where("username LIKE ? OR details LIKE ? OR action_name LIKE ?",
			"%"+filters.Search+"%", "%"+filters.Search+"%", "%"+filters.Search+"%")
	}

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Paginated query
	offset := (page - 1) * pageSize
	err := query.Order("timestamp desc").Offset(offset).Limit(pageSize).Find(&logs).Error
	if err != nil {
		return nil, 0, err
	}

	return logs, total, nil
}

// GetAuditLogsByResourceID gets audit logs for a specified resource
func (s *auditLogService) GetAuditLogsByResourceID(ctx context.Context, resource, resourceID string, page, pageSize int) ([]model.AuditLog, int64, error) {
	var logs []model.AuditLog
	var total int64

	query := db.Session(ctx).Model(&model.AuditLog{}).
		Where("resource = ? AND resource_id = ?", resource, resourceID)

	// Get total count
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Paginated query
	offset := (page - 1) * pageSize
	err := query.Order("timestamp desc").Offset(offset).Limit(pageSize).Find(&logs).Error
	if err != nil {
		return nil, 0, err
	}

	return logs, total, nil
}

func (s *auditLogService) runAuditLogCleanupJob(ctx context.Context, t *model.Task, progressCallback taskscheduler.ProgressCallback, cancelCh <-chan struct{}) (result interface{}, err error) {
	logger := log.GetContextLogger(ctx)
	retentionDays, _ := s.baseService.GetIntSetting(ctx, model.SettingTaskAuditLogRetentionDays, 365)
	if retentionDays < 1 {
		retentionDays = 365
	}
	level.Info(logger).Log("msg", "Audit log cleanup started", "retention_days", retentionDays)
	cutoff := time.Now().Add(-time.Hour * 24 * time.Duration(retentionDays))
	dbConn := db.Session(ctx)

	var total int64
	if err := dbConn.Unscoped().
		Model(&model.AuditLog{}).
		Where("timestamp < ?", cutoff).
		Count(&total).Error; err != nil {
		return nil, fmt.Errorf("failed to count expired audit logs: %w", err)
	}

	if total == 0 {
		progressCallback(100)
		level.Info(logger).Log("msg", "Audit log cleanup completed", "deleted_audit_logs", 0, "retention_days", retentionDays, "cutoff_timestamp", cutoff.Format(time.RFC3339), "total", 0)
		return map[string]interface{}{
			"deleted_audit_logs": 0,
			"retention_days":     retentionDays,
			"cutoff_timestamp":   cutoff.Format(time.RFC3339),
		}, nil
	}

	const batchSize = 500
	var deleted int64

	level.Info(logger).Log("msg", "Audit log cleanup in progress", "total_audit_logs", total, "retention_days", retentionDays)
	for {
		select {
		case <-cancelCh:
			return nil, taskscheduler.ErrCancelled
		default:
		}

		var batch []string
		if err := dbConn.Unscoped().
			Model(&model.AuditLog{}).
			Select("resource_id").
			Where("timestamp < ?", cutoff).
			Order("timestamp ASC").
			Limit(batchSize).
			Pluck("resource_id", &batch).Error; err != nil {
			return nil, fmt.Errorf("failed to query expired audit logs: %w", err)
		}

		if len(batch) == 0 {
			break
		}

		if err := dbConn.Transaction(func(tx *gorm.DB) error {
			res := tx.Unscoped().
				Where("resource_id IN ?", batch).
				Delete(&model.AuditLog{})
			if res.Error != nil {
				return res.Error
			}
			deleted += res.RowsAffected
			return nil
		}); err != nil {
			return nil, fmt.Errorf("failed to delete expired audit logs: %w", err)
		}

		progress := int(float64(deleted) / float64(total) * 99)
		if progress < 1 {
			progress = 1
		}
		progressCallback(progress)
		level.Info(logger).Log("msg", "Audit log cleanup in progress", "deleted_audit_logs", deleted, "total_audit_logs", total, "progress", progress)
	}

	progressCallback(100)
	level.Info(logger).Log("msg", "Audit log cleanup completed", "deleted_audit_logs", deleted, "retention_days", retentionDays, "cutoff_timestamp", cutoff.Format(time.RFC3339), "total", total)
	return map[string]interface{}{
		"deleted_audit_logs": deleted,
		"retention_days":     retentionDays,
		"cutoff_timestamp":   cutoff.Format(time.RFC3339),
	}, nil
}
