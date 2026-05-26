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

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"
)

var (
	passwordExpiryNotificationTaskType = model.TaskType("password_expiry_notification_task")
	inactiveAccountLockTaskType        = model.TaskType("inactive_account_lock_task")
)

func (s *userService) runPasswordExpiryNotificationJob(ctx context.Context, _ *model.Task, progressCallback taskscheduler.ProgressCallback, cancelCh <-chan struct{}) (interface{}, error) {
	logger := log.GetContextLogger(ctx)
	securitySettings, err := s.baseService.GetSecuritySettings(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get security settings: %w", err)
	}
	if securitySettings.PasswordExpiryDays <= 0 || securitySettings.PasswordExpiryNotifyDays <= 0 {
		progressCallback(100)
		return map[string]any{"sent": 0, "skipped": "password expiry notification disabled"}, nil
	}
	allowLDAPManagePassword, _ := s.baseService.GetBoolSetting(ctx, model.SettingLDAPAllowManageUserPassword, false)
	var users []model.User
	if err := db.Session(ctx).Where("status = ?", model.UserStatusActive).Find(&users).Error; err != nil {
		return nil, fmt.Errorf("failed to list users: %w", err)
	}
	if len(users) == 0 {
		progressCallback(100)
		return map[string]any{"sent": 0}, nil
	}
	now := time.Now()
	sent := 0
	for idx, user := range users {
		select {
		case <-cancelCh:
			return nil, taskscheduler.ErrCancelled
		default:
		}
		if user.Email == "" || user.Status == model.UserStatusPendingActivation || user.PasswordChangedAt.IsZero() {
			continue
		}
		if user.IsLDAPUser() && !allowLDAPManagePassword {
			continue
		}
		expireAt := user.PasswordChangedAt.AddDate(0, 0, securitySettings.PasswordExpiryDays)

		notifyAt := expireAt.AddDate(0, 0, -securitySettings.PasswordExpiryNotifyDays)
		if now.Before(notifyAt) {
			continue
		}
		lastNotifyAt, err := getPasswordExpiryNotifiedAt(ctx, user.ResourceID)
		if err != nil {
			level.Error(logger).Log("msg", "failed to query password expiry reminder state", "user_id", user.ResourceID, "err", err)
			continue
		}
		if lastNotifyAt != nil && lastNotifyAt.After(user.PasswordChangedAt) {
			continue
		}
		daysLeft := int(time.Until(expireAt).Hours() / 24)
		if daysLeft < 0 {
			daysLeft = 0
		}
		if err := markPasswordExpiryNotified(ctx, user.ResourceID, now); err != nil {
			level.Error(logger).Log("msg", "failed to mark password expiry reminder sent", "user_id", user.ResourceID, "err", err)
			continue
		}
		if err := s.baseService.SendEmailFromTemplate(ctx, []string{user.Email}, "Password Expiry Reminder", model.SettingSMTPPasswordExpiryTemplate, map[string]any{
			"Username":          user.Username,
			"UserID":            user.ResourceID,
			"Email":             user.Email,
			"Avatar":            user.Avatar,
			"FullName":          user.FullName,
			"DaysLeft":          daysLeft,
			"PasswordExpiresAt": expireAt,
		}); err != nil {
			level.Error(logger).Log("msg", "failed to send password expiry reminder", "user_id", user.ResourceID, "err", err)
			continue
		}
		sent++
		progressCallback((idx + 1) * 100 / len(users))
	}
	progressCallback(100)
	return map[string]any{"sent": sent}, nil
}

func (s *userService) runInactiveAccountLockJob(ctx context.Context, _ *model.Task, progressCallback taskscheduler.ProgressCallback, cancelCh <-chan struct{}) (interface{}, error) {
	logger := log.GetContextLogger(ctx)
	inactiveDays, err := s.baseService.GetIntSetting(ctx, model.SettingUserInactiveDays, 0)
	if err != nil {
		return nil, fmt.Errorf("failed to get inactive account days: %w", err)
	}
	if inactiveDays <= 0 {
		progressCallback(100)
		return map[string]any{"locked": 0, "skipped": "inactive lock disabled"}, nil
	}
	var users []model.User
	if err := db.Session(ctx).Where("status = ?", model.UserStatusActive).Find(&users).Error; err != nil {
		return nil, fmt.Errorf("failed to list users: %w", err)
	}
	locked := 0
	for idx, user := range users {
		select {
		case <-cancelCh:
			return nil, taskscheduler.ErrCancelled
		default:
		}
		if !user.IsInactive(inactiveDays) || user.IsLocked() {
			continue
		}
		lockUntil := time.Now().AddDate(100, 0, 0)
		if err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
			return tx.Model(&model.User{}).Where("resource_id = ?", user.ResourceID).Updates(map[string]any{
				"locked_until":   lockUntil,
				"login_attempts": 0,
			}).Error
		}); err != nil {
			level.Error(logger).Log("msg", "failed to lock inactive user", "user_id", user.ResourceID, "err", err)
			continue
		}
		if user.Email != "" {
			if err := s.baseService.SendEmailFromTemplate(ctx, []string{user.Email}, "Account Locked Due To Inactivity", model.SettingSMTPInactiveLockTemplate, map[string]any{
				"Username": user.Username,
				"UserID":   user.ResourceID,
				"Email":    user.Email,
				"Avatar":   user.Avatar,
				"FullName": user.FullName,
			}); err != nil {
				level.Error(logger).Log("msg", "failed to send inactive lock notification", "user_id", user.ResourceID, "err", err)
			}
		}
		locked++
		progressCallback((idx + 1) * 100 / max(len(users), 1))
	}
	progressCallback(100)
	return map[string]any{"locked": locked}, nil
}

func getPasswordExpiryNotifiedAt(ctx context.Context, userID string) (*time.Time, error) {
	var ext model.UserExt
	if err := db.Session(ctx).Where("user_id = ?", userID).First(&ext).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return ext.PasswordExpiryNotifyAt, nil
}
