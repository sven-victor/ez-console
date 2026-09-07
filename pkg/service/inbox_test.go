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
	"testing"

	"github.com/glebarez/sqlite"
	"github.com/stretchr/testify/require"
	"github.com/sven-victor/ez-console/pkg/model"
	"gorm.io/gorm"
)

func setupInboxService(t *testing.T) (*inboxService, context.Context) {
	t.Helper()
	testDB, err := gorm.Open(sqlite.Open("file::memory:"), &gorm.Config{})
	require.NoError(t, err)
	require.NoError(t, testDB.AutoMigrate(&model.InboxMessage{}))
	svc := newInboxService()
	svc.session = func(ctx context.Context) *gorm.DB { return testDB.WithContext(ctx) }
	return svc, context.Background()
}

func TestInboxCreateListRead(t *testing.T) {
	svc, ctx := setupInboxService(t)
	msg, err := svc.CreateInboxMessage(ctx, "user-a", model.InboxMessagePasswordExpiry, map[string]any{"FullName": "Ada"})
	require.NoError(t, err)
	require.NotEmpty(t, msg.ResourceID)
	require.Nil(t, msg.ReadAt)

	list, total, err := svc.ListInboxMessages(ctx, "user-a", 1, 10, false)
	require.NoError(t, err)
	require.Equal(t, int64(1), total)
	require.Len(t, list, 1)

	unread, err := svc.CountUnreadInbox(ctx, "user-a")
	require.NoError(t, err)
	require.Equal(t, int64(1), unread)

	got, err := svc.MarkInboxRead(ctx, "user-a", msg.ResourceID)
	require.NoError(t, err)
	require.NotNil(t, got.ReadAt)

	unread, err = svc.CountUnreadInbox(ctx, "user-a")
	require.NoError(t, err)
	require.Equal(t, int64(0), unread)

	other, total, err := svc.ListInboxMessages(ctx, "user-b", 1, 10, false)
	require.NoError(t, err)
	require.Equal(t, int64(0), total)
	require.Empty(t, other)
}

func TestInboxListSinceBurst(t *testing.T) {
	svc, ctx := setupInboxService(t)
	first, err := svc.CreateInboxMessage(ctx, "user-a", model.InboxMessageMFADisabled, nil)
	require.NoError(t, err)
	second, err := svc.CreateInboxMessage(ctx, "user-a", model.InboxMessageLoginFailureLock, nil)
	require.NoError(t, err)

	all, err := svc.ListInboxSince(ctx, "user-a", nil, 10)
	require.NoError(t, err)
	require.Len(t, all, 2)
	require.Equal(t, first.ResourceID, all[0].ResourceID)
	require.Equal(t, second.ResourceID, all[1].ResourceID)

	afterFirst := &InboxCursor{CreatedAt: first.CreatedAt, ResourceID: first.ResourceID}
	rest, err := svc.ListInboxSince(ctx, "user-a", afterFirst, 10)
	require.NoError(t, err)
	require.Len(t, rest, 1)
	require.Equal(t, second.ResourceID, rest[0].ResourceID)

	cursor := svc.CursorFromLastEventID(ctx, "user-a", first.ResourceID)
	require.NotNil(t, cursor)
	require.Equal(t, first.ResourceID, cursor.ResourceID)
}
