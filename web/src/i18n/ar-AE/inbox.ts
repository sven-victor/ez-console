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
  title: 'صندوق الوارد',
  bell: 'الإشعارات',
  empty: 'لا توجد رسائل',
  viewAll: 'عرض الكل',
  markAllRead: 'تعيين الكل كمقروء',
  markRead: 'تعيين كمقروء',
  unread: 'غير مقروء',
  read: 'مقروء',
  typeLabel: 'النوع',
  createdAt: 'الوقت',
  unreadCount: '{{count}} غير مقروء',
  filterAll: 'الكل',
  filterUnread: 'غير المقروء فقط',
  types: {
    password_expiry: 'كلمة المرور ستنتهي قريبًا',
    login_failure_lock: 'تم قفل الحساب بعد محاولات تسجيل دخول فاشلة',
    mfa_disabled: 'تم تعطيل المصادقة متعددة العوامل',
  },
  typeDescriptions: {
    password_expiry: 'ستنتهي صلاحية كلمة المرور خلال {{DaysLeft}} يومًا.',
    login_failure_lock: 'تم قفل حسابك بعد محاولات تسجيل دخول فاشلة كثيرة.',
    mfa_disabled: 'تم تعطيل المصادقة متعددة العوامل على حسابك.',
  },
};
