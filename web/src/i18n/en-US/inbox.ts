/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default {
  title: 'Inbox',
  bell: 'Notifications',
  empty: 'No messages',
  viewAll: 'View all',
  markAllRead: 'Mark all as read',
  markRead: 'Mark as read',
  unread: 'Unread',
  read: 'Read',
  typeLabel: 'Type',
  createdAt: 'Time',
  unreadCount: '{{count}} unread',
  filterAll: 'All',
  filterUnread: 'Unread only',
  types: {
    password_expiry: 'Password expiring soon',
    login_failure_lock: 'Account locked after failed sign-in',
    mfa_disabled: 'MFA disabled',
  },
  typeDescriptions: {
    password_expiry: 'Your password expires in {{DaysLeft}} days.',
    login_failure_lock: 'Your account was locked after too many failed sign-in attempts.',
    mfa_disabled: 'Multi-factor authentication was disabled on your account.',
  },
};
