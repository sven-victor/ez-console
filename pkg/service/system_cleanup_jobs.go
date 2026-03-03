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
	"time"

	"github.com/go-kit/log/level"
	"github.com/robfig/cron/v3"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
)

var (
	taskLogCleanupTaskType  = model.TaskType("task_log_cleanup_task")
	auditLogCleanupTaskType = model.TaskType("audit_log_cleanup_task")
)

func init() {
	taskscheduler.RegisterScheduledJob(&taskscheduler.ScheduledJobDef{
		ID:          "task-log-cleanup",
		Name:        "Task Log Cleanup",
		Spec:        "0 0 * * *",
		Schedule:    cron.Every(time.Hour * 24),
		Description: "Cleanup task logs and historical task run records",
		TaskType:    taskLogCleanupTaskType,
		Runner: taskscheduler.NewFuncTaskRunner(func(ctx context.Context, t *model.Task, progressCallback taskscheduler.ProgressCallback, cancelCh <-chan struct{}) (result interface{}, err error) {
			logger := log.GetContextLogger(ctx)
			settingSvc := new(SettingService)
			retentionDays, _ := settingSvc.GetIntSetting(ctx, model.SettingTaskLogRetentionDays, 30)
			if retentionDays < 1 {
				retentionDays = 30
			}
			cutoff := time.Now().Add(-time.Hour * 24 * time.Duration(retentionDays))
			dbConn := db.Session(ctx)

			level.Info(logger).Log("msg", "Task log cleanup started", "retention_days", retentionDays)

			var totalLogs int64
			if err := dbConn.Unscoped().
				Model(&model.TaskLog{}).
				Where("created_at < ?", cutoff).
				Count(&totalLogs).Error; err != nil {
				return nil, fmt.Errorf("failed to count expired task logs: %w", err)
			}

			var totalTasks int64
			taskStatusFilter := []model.TaskStatus{model.TaskStatusSuccess, model.TaskStatusFailed, model.TaskStatusCancelled}
			if err := dbConn.Unscoped().
				Model(&model.Task{}).
				Where("created_at < ? AND status IN ?", cutoff, taskStatusFilter).
				Count(&totalTasks).Error; err != nil {
				return nil, fmt.Errorf("failed to count expired task runs: %w", err)
			}

			if totalLogs == 0 && totalTasks == 0 {
				progressCallback(100)
				level.Info(logger).Log("msg", "Task log cleanup completed", "deleted_task_logs", 0, "deleted_task_runs", 0, "retention_days", retentionDays)
				return map[string]interface{}{
					"deleted_task_logs": 0,
					"deleted_task_runs": 0,
					"retention_days":    retentionDays,
					"cutoff_created_at": cutoff.Format(time.RFC3339),
				}, nil
			}

			const batchSize = 500
			var deletedLogs int64
			var deletedTasks int64

			// Stage 1: delete task logs (progress 0-49).
			if totalLogs > 0 {
				level.Info(logger).Log("msg", "Task log cleanup logs phase started", "total_logs", totalLogs, "retention_days", retentionDays)
				for {
					select {
					case <-cancelCh:
						return nil, taskscheduler.ErrCancelled
					default:
					}

					var batch []string
					if err := dbConn.Unscoped().
						Model(&model.TaskLog{}).
						Select("resource_id").
						Where("created_at < ?", cutoff).
						Order("created_at ASC").
						Limit(batchSize).
						Pluck("resource_id", &batch).Error; err != nil {
						return nil, fmt.Errorf("failed to query expired task logs: %w", err)
					}

					if len(batch) == 0 {
						break
					}

					if err := dbConn.Transaction(func(tx *gorm.DB) error {
						res := tx.Unscoped().
							Where("resource_id IN ?", batch).
							Delete(&model.TaskLog{})
						if res.Error != nil {
							return res.Error
						}
						deletedLogs += res.RowsAffected
						return nil
					}); err != nil {
						return nil, fmt.Errorf("failed to delete expired task logs: %w", err)
					}

					progress := int(float64(deletedLogs) / float64(totalLogs) * 49)
					if progress < 1 {
						progress = 1
					}
					progressCallback(progress)
					level.Info(logger).Log("msg", "Task log cleanup logs in progress", "deleted_task_logs", deletedLogs, "total_logs", totalLogs, "progress", progress)
				}
			}

			// Stage 2: delete historical task run records (progress 50-99).
			if totalTasks > 0 {
				level.Info(logger).Log("msg", "Task log cleanup tasks phase started", "total_task_runs", totalTasks, "retention_days", retentionDays)
				for {
					select {
					case <-cancelCh:
						return nil, taskscheduler.ErrCancelled
					default:
					}

					var batch []string
					if err := dbConn.Unscoped().
						Model(&model.Task{}).
						Select("resource_id").
						Where("created_at < ? AND status IN ?", cutoff, taskStatusFilter).
						Order("created_at ASC").
						Limit(batchSize).
						Pluck("resource_id", &batch).Error; err != nil {
						return nil, fmt.Errorf("failed to query expired task runs: %w", err)
					}

					if len(batch) == 0 {
						break
					}

					if err := dbConn.Transaction(func(tx *gorm.DB) error {
						res := tx.Unscoped().
							Where("resource_id IN ?", batch).
							Delete(&model.Task{})
						if res.Error != nil {
							return res.Error
						}
						deletedTasks += res.RowsAffected
						return nil
					}); err != nil {
						return nil, fmt.Errorf("failed to delete expired task runs: %w", err)
					}

					progress := 50 + int(float64(deletedTasks)/float64(totalTasks)*49)
					if progress > 99 {
						progress = 99
					}
					if progress < 50 {
						progress = 50
					}
					progressCallback(progress)
					level.Info(logger).Log("msg", "Task log cleanup tasks in progress", "deleted_task_runs", deletedTasks, "total_task_runs", totalTasks, "progress", progress)
				}
			}

			progressCallback(100)
			level.Info(logger).Log("msg", "Task log cleanup completed", "deleted_task_logs", deletedLogs, "deleted_task_runs", deletedTasks, "retention_days", retentionDays)
			return map[string]interface{}{
				"deleted_task_logs": deletedLogs,
				"deleted_task_runs": deletedTasks,
				"retention_days":    retentionDays,
				"cutoff_created_at": cutoff.Format(time.RFC3339),
			}, nil
		}),
	})

	taskscheduler.RegisterScheduledJob(&taskscheduler.ScheduledJobDef{
		ID:          "audit-log-cleanup",
		Name:        "Audit Log Cleanup",
		Spec:        "0 0 * * *",
		Schedule:    cron.Every(time.Hour * 24),
		Description: "Cleanup audit logs",
		TaskType:    auditLogCleanupTaskType,
		Runner: taskscheduler.NewFuncTaskRunner(func(ctx context.Context, t *model.Task, progressCallback taskscheduler.ProgressCallback, cancelCh <-chan struct{}) (result interface{}, err error) {
			logger := log.GetContextLogger(ctx)
			settingSvc := new(SettingService)
			retentionDays, _ := settingSvc.GetIntSetting(ctx, model.SettingTaskAuditLogRetentionDays, 365)
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
		}),
	})
}
