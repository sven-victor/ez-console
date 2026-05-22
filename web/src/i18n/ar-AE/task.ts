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
  listTitle: 'قائمة المهام',
  detailTitle: 'تفاصيل المهمة',
  typeLabel: 'النوع',
  type: {
    user_export: 'تصدير المستخدمين',
    audit_log_cleanup_task: 'تنظيف سجلات التدقيق',
    ai_chat_session_cleanup_task: 'تنظيف جلسات محادثات الذكاء الاصطناعي',
    task_log_cleanup_task: 'تنظيف سجلات المهام',
    inactive_account_lock_task: 'مهمة قفل الحسابات غير النشطة',
    password_expiry_notification_task: 'مهمة إشعار انتهاء صلاحية كلمة المرور',
  },
  statusLabel: 'الحالة',
  progress: 'التقدم',
  creatorId: 'المنشئ',
  createdAt: 'تاريخ الإنشاء',
  startedAt: 'تاريخ البدء',
  finishedAt: 'تاريخ الانتهاء',
  error: 'خطأ',
  result: 'النتيجة',
  view: 'عرض',
  cancel: 'إلغاء',
  retry: 'إعادة المحاولة',
  delete: 'حذف',
  download: 'تحميل',
  downloadArtifact: 'تحميل المخرجات',
  cancelConfirm: 'إلغاء هذه المهمة؟',
  deleteConfirm: 'حذف هذه المهمة؟',
  cancelSuccess: 'تم إلغاء المهمة.',
  cancelFailed: 'فشل إلغاء المهمة.',
  retrySuccess: 'تم طلب إعادة تشغيل المهمة.',
  retryFailed: 'فشلت إعادة المحاولة.',
  deleteSuccess: 'تم حذف المهمة.',
  deleteFailed: 'فشل حذف المهمة.',
  notFound: 'المهمة غير موجودة.',
  backToList: 'العودة إلى القائمة',
  searchPlaceholder: 'البحث حسب النوع أو المعرّف',
  tasks: 'المهام',
  more: 'المزيد',
  noTasks: 'لا توجد مهام',
  logsTitle: 'سجلات المهام',
  noLogs: 'لا توجد سجلات بعد.',
  status: {
    pending: 'قيد الانتظار',
    running: 'قيد التشغيل',
    success: 'نجاح',
    failed: 'فشل',
    cancelled: 'ملغى',
  },
  scheduledTasks: 'المهام المجدولة',
  scheduleName: 'الاسم',
  scheduleSpec: 'Cron',
  scheduleDescription: 'الوصف',
  scheduleTaskType: 'نوع المهمة',
  scheduleEnabled: 'مفعّل',
  scheduleNextRun: 'التشغيل التالي',
  scheduleLastRun: 'آخر تشغيل',
  viewHistory: 'عرض السجل',
  triggerNow: 'شغّل الآن',
  executionHistory: 'سجل التنفيذ',
  scheduleListFailed: 'فشل سرد الجداول الزمنية: {{error}}',
  scheduleTriggered: 'تم تشغيل المهمة.',
  description: {
    ai_chat_session_cleanup_task: 'تنظيف جلسات محادثة الذكاء الاصطناعي',
    audit_log_cleanup_task: 'تنظيف سجلات التدقيق',
    task_log_cleanup_task: 'تنظيف سجلات المهام وسجلات التشغيل التاريخية',
    inactive_account_lock_task: 'فحص المستخدمين كل ساعة وقفل الحسابات غير النشطة تلقائياً',
    password_expiry_notification_task: 'فحص المستخدمين كل ساعة وإرسال تذكيرات انتهاء صلاحية كلمة المرور مرة واحدة لكل دورة كلمة مرور',
  },
};
