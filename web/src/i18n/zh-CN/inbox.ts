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
  title: '站内信',
  bell: '通知',
  empty: '暂无消息',
  viewAll: '查看全部',
  markAllRead: '全部标为已读',
  markRead: '标为已读',
  unread: '未读',
  read: '已读',
  typeLabel: '类型',
  createdAt: '时间',
  unreadCount: '{{count}} 条未读',
  filterAll: '全部',
  filterUnread: '仅未读',
  types: {
    password_expiry: '密码即将过期',
    login_failure_lock: '登录失败次数过多，账号已锁定',
    mfa_disabled: '已关闭多因素认证',
  },
  typeDescriptions: {
    password_expiry: '您的密码将在 {{DaysLeft}} 天后过期。',
    login_failure_lock: '由于登录失败次数过多，您的账号已被锁定。',
    mfa_disabled: '您账号的多因素认证已被关闭。',
  },
};
