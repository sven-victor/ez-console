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
	"sync"
	"time"

	"github.com/go-kit/log/level"
	"github.com/robfig/cron/v3"
	"github.com/sven-victor/ez-utils/log"
	"gorm.io/gorm"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/eventbus"
	"github.com/sven-victor/ez-console/pkg/inbox"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/taskscheduler"
)

const (
	inboxRetentionDays = 90
	inboxMaxPerUser    = 500
	inboxSinceLimit    = 100
)

var inboxCleanupTaskType = model.TaskType("inbox_cleanup_task")

// InboxCursor locates a message for catch-up. ResourceID is not monotonic, so
// comparisons use (created_at, resource_id).
type InboxCursor struct {
	CreatedAt  time.Time
	ResourceID string
}

type InboxService interface {
	CreateInboxMessage(ctx context.Context, userID string, msgType model.InboxMessageType, payload map[string]any) (*model.InboxMessage, error)
	ListInboxMessages(ctx context.Context, userID string, current, pageSize int, unreadOnly bool) ([]model.InboxMessage, int64, error)
	CountUnreadInbox(ctx context.Context, userID string) (int64, error)
	MarkInboxRead(ctx context.Context, userID, messageID string) (*model.InboxMessage, error)
	MarkAllInboxRead(ctx context.Context, userID string) (int64, error)
	ListInboxSince(ctx context.Context, userID string, after *InboxCursor, limit int) ([]model.InboxMessage, error)
	CursorFromLastEventID(ctx context.Context, userID, lastEventID string) *InboxCursor
	InboxHub() *inbox.Hub
}

type inboxService struct {
	hub     *inbox.Hub
	session func(ctx context.Context) *gorm.DB
}

func (s *inboxService) db(ctx context.Context) *gorm.DB {
	if s.session != nil {
		return s.session(ctx)
	}
	return db.Session(ctx)
}

var (
	inboxServiceOnce     sync.Once
	inboxServiceInstance InboxService
)

func NewInboxService(_ context.Context) InboxService {
	inboxServiceOnce.Do(func() {
		inst := newInboxService()
		taskscheduler.RegisterScheduledJob(&taskscheduler.ScheduledJobDef{
			ID:          "inbox-cleanup",
			Name:        "Inbox Cleanup",
			Spec:        "0 0 * * *",
			Schedule:    cron.Every(time.Hour * 24),
			Description: "Delete expired in-app messages and enforce the per-user cap",
			TaskType:    inboxCleanupTaskType,
			Runner:      taskscheduler.NewFuncTaskRunner(inst.runInboxCleanupJob),
		})
		if bus := GetGlobalEventBus(); bus != nil {
			inst.hub.Listen(bus)
		}
		inboxServiceInstance = inst
	})
	return inboxServiceInstance
}

func newInboxService() *inboxService {
	return &inboxService{hub: inbox.NewHub()}
}

func (s *inboxService) InboxHub() *inbox.Hub {
	return s.hub
}

func (s *inboxService) CreateInboxMessage(ctx context.Context, userID string, msgType model.InboxMessageType, payload map[string]any) (*model.InboxMessage, error) {
	if userID == "" {
		return nil, fmt.Errorf("user id is required")
	}
	if msgType == "" {
		return nil, fmt.Errorf("message type is required")
	}
	if payload == nil {
		payload = map[string]any{}
	}
	msg := &model.InboxMessage{
		UserID:  userID,
		Type:    msgType,
		Payload: payload,
	}
	if err := s.db(ctx).Create(msg).Error; err != nil {
		return nil, fmt.Errorf("failed to create inbox message: %w", err)
	}
	s.trimUserCap(ctx, userID)
	s.publishWakeup(ctx, userID)
	return msg, nil
}

func (s *inboxService) publishWakeup(ctx context.Context, userID string) {
	bus := GetGlobalEventBus()
	if bus == nil {
		if s.hub != nil {
			s.hub.Wake(userID)
		}
		return
	}
	_ = bus.Publish(ctx, eventbus.EventInboxWakeup, eventbus.MarshalPayload(eventbus.InboxWakeupPayload{UserID: userID}))
}

func (s *inboxService) trimUserCap(ctx context.Context, userID string) {
	var extraIDs []string
	if err := s.db(ctx).Model(&model.InboxMessage{}).
		Where("user_id = ?", userID).
		Order("created_at DESC, resource_id DESC").
		Offset(inboxMaxPerUser).
		Pluck("resource_id", &extraIDs).Error; err != nil || len(extraIDs) == 0 {
		return
	}
	_ = s.db(ctx).Unscoped().Where("resource_id IN ?", extraIDs).Delete(&model.InboxMessage{}).Error
}

func (s *inboxService) ListInboxMessages(ctx context.Context, userID string, current, pageSize int, unreadOnly bool) ([]model.InboxMessage, int64, error) {
	if current < 1 {
		current = 1
	}
	if pageSize < 1 || pageSize > 100 {
		pageSize = 10
	}
	q := s.db(ctx).Model(&model.InboxMessage{}).Where("user_id = ?", userID)
	if unreadOnly {
		q = q.Where("read_at IS NULL")
	}
	var total int64
	if err := q.Session(&gorm.Session{}).Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count inbox messages: %w", err)
	}
	var list []model.InboxMessage
	if err := q.Order("created_at DESC, resource_id DESC").
		Offset((current - 1) * pageSize).
		Limit(pageSize).
		Find(&list).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to list inbox messages: %w", err)
	}
	if list == nil {
		list = []model.InboxMessage{}
	}
	return list, total, nil
}

func (s *inboxService) CountUnreadInbox(ctx context.Context, userID string) (int64, error) {
	var total int64
	if err := s.db(ctx).Model(&model.InboxMessage{}).
		Where("user_id = ? AND read_at IS NULL", userID).
		Count(&total).Error; err != nil {
		return 0, fmt.Errorf("failed to count unread inbox messages: %w", err)
	}
	return total, nil
}

func (s *inboxService) MarkInboxRead(ctx context.Context, userID, messageID string) (*model.InboxMessage, error) {
	var msg model.InboxMessage
	if err := s.db(ctx).Where("user_id = ? AND resource_id = ?", userID, messageID).First(&msg).Error; err != nil {
		return nil, err
	}
	if msg.ReadAt == nil {
		now := time.Now()
		if err := s.db(ctx).Model(&msg).Update("read_at", now).Error; err != nil {
			return nil, fmt.Errorf("failed to mark inbox message read: %w", err)
		}
		msg.ReadAt = &now
		s.publishWakeup(ctx, userID)
	}
	return &msg, nil
}

func (s *inboxService) MarkAllInboxRead(ctx context.Context, userID string) (int64, error) {
	now := time.Now()
	res := s.db(ctx).Model(&model.InboxMessage{}).
		Where("user_id = ? AND read_at IS NULL", userID).
		Update("read_at", now)
	if res.Error != nil {
		return 0, fmt.Errorf("failed to mark all inbox messages read: %w", res.Error)
	}
	if res.RowsAffected > 0 {
		s.publishWakeup(ctx, userID)
	}
	return res.RowsAffected, nil
}

func (s *inboxService) CursorFromLastEventID(ctx context.Context, userID, lastEventID string) *InboxCursor {
	if lastEventID == "" {
		return s.latestCursor(ctx, userID)
	}
	var msg model.InboxMessage
	if err := s.db(ctx).Where("user_id = ? AND resource_id = ?", userID, lastEventID).First(&msg).Error; err != nil {
		return s.latestCursor(ctx, userID)
	}
	return &InboxCursor{CreatedAt: msg.CreatedAt, ResourceID: msg.ResourceID}
}

func (s *inboxService) latestCursor(ctx context.Context, userID string) *InboxCursor {
	var msg model.InboxMessage
	err := s.db(ctx).Where("user_id = ?", userID).
		Order("created_at DESC, resource_id DESC").
		First(&msg).Error
	if err != nil {
		return nil
	}
	return &InboxCursor{CreatedAt: msg.CreatedAt, ResourceID: msg.ResourceID}
}

func (s *inboxService) ListInboxSince(ctx context.Context, userID string, after *InboxCursor, limit int) ([]model.InboxMessage, error) {
	if limit <= 0 || limit > inboxSinceLimit {
		limit = inboxSinceLimit
	}
	q := s.db(ctx).Where("user_id = ?", userID)
	if after != nil && after.ResourceID != "" {
		q = q.Where(
			"created_at > ? OR (created_at = ? AND resource_id > ?)",
			after.CreatedAt, after.CreatedAt, after.ResourceID,
		)
	}
	var list []model.InboxMessage
	if err := q.Order("created_at ASC, resource_id ASC").Limit(limit).Find(&list).Error; err != nil {
		return nil, fmt.Errorf("failed to list inbox messages since cursor: %w", err)
	}
	if list == nil {
		list = []model.InboxMessage{}
	}
	return list, nil
}

func (s *inboxService) runInboxCleanupJob(ctx context.Context, _ *model.Task, progressCallback taskscheduler.ProgressCallback, cancelCh <-chan struct{}) (interface{}, error) {
	logger := log.GetContextLogger(ctx)
	select {
	case <-cancelCh:
		return nil, taskscheduler.ErrCancelled
	default:
	}
	cutoff := time.Now().Add(-time.Hour * 24 * time.Duration(inboxRetentionDays))
	ttlRes := s.db(ctx).Unscoped().Where("created_at < ?", cutoff).Delete(&model.InboxMessage{})
	if ttlRes.Error != nil {
		return nil, fmt.Errorf("failed to delete expired inbox messages: %w", ttlRes.Error)
	}
	progressCallback(50)

	var userIDs []string
	if err := s.db(ctx).Model(&model.InboxMessage{}).Distinct("user_id").Pluck("user_id", &userIDs).Error; err != nil {
		return nil, fmt.Errorf("failed to list inbox users: %w", err)
	}
	var trimmed int64
	for _, userID := range userIDs {
		select {
		case <-cancelCh:
			return nil, taskscheduler.ErrCancelled
		default:
		}
		var extraIDs []string
		if err := s.db(ctx).Model(&model.InboxMessage{}).
			Where("user_id = ?", userID).
			Order("created_at DESC, resource_id DESC").
			Offset(inboxMaxPerUser).
			Pluck("resource_id", &extraIDs).Error; err != nil {
			level.Error(logger).Log("msg", "failed to list overflow inbox messages", "user_id", userID, "err", err)
			continue
		}
		if len(extraIDs) == 0 {
			continue
		}
		res := s.db(ctx).Unscoped().Where("resource_id IN ?", extraIDs).Delete(&model.InboxMessage{})
		if res.Error != nil {
			level.Error(logger).Log("msg", "failed to trim inbox overflow", "user_id", userID, "err", res.Error)
			continue
		}
		trimmed += res.RowsAffected
	}
	progressCallback(100)
	return map[string]any{"deleted_expired": ttlRes.RowsAffected, "deleted_overflow": trimmed, "retention_days": inboxRetentionDays, "max_per_user": inboxMaxPerUser}, nil
}

func tryCreateInboxForUser(ctx context.Context, svc InboxService, user *model.User, msgType model.InboxMessageType, extra map[string]any) {
	if svc == nil || user == nil || user.ResourceID == "" {
		return
	}
	payload := map[string]any{
		"Username": user.Username,
		"UserID":   user.ResourceID,
		"Email":    user.Email,
		"Avatar":   user.Avatar,
		"FullName": user.FullName,
	}
	for k, v := range extra {
		payload[k] = v
	}
	if _, err := svc.CreateInboxMessage(ctx, user.ResourceID, msgType, payload); err != nil {
		level.Warn(log.GetContextLogger(ctx)).Log("msg", "failed to create inbox message", "user_id", user.ResourceID, "type", msgType, "err", err)
	}
}
