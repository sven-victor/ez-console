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
  login: {
    subtitle: 'تسجيل الدخول إلى حسابك',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    remember: 'تذكرني',
    forgotPassword: 'هل نسيت كلمة المرور؟',
    noAccount: 'لا يوجد حساب؟ سجل الآن',
    error: 'فشل تسجيل الدخول: {{error}}',
    oauthError: 'فشل تسجيل الدخول بحساب OAuth: {{error}}',
    usernameRequired: 'الرجاء إدخال اسم المستخدم الخاص بك!',
    passwordRequired: 'الرجاء إدخال كلمة المرور الخاصة بك!',
    or: 'أو',
    continueWith: 'متابعة باستخدام {{provider}}',
    fetchOAuthProvidersError: 'فشل جلب موفري OAuth',
    fetchSiteConfigError: 'فشل جلب تكوين الموقع: {{error}}',
    mfaTips: {
      email: 'لقد قمت بتمكين المصادقة متعددة العوامل المستندة إلى البريد الإلكتروني ، يرجى إدخال كلمة المرور لمرة واحدة المقابلة.',
      totp: 'لقد قمت بتمكين المصادقة متعددة العوامل المستندة إلى البريد الإلكتروني. يرجى إدخال كلمة المرور لمرة واحدة التي تلقيتها.',
    },
  },
  activate: {
    subtitle: 'تفعيل حسابك',
    invalidToken: 'رابط التفعيل غير صالح أو منتهي الصلاحية',
    error: 'فشل التفعيل: {{error}}',
    description: 'يرجى تعيين كلمة مرور لتفعيل حسابك.',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    passwordRequired: 'كلمة المرور مطلوبة',
    confirmPasswordRequired: 'يرجى تأكيد كلمة المرور',
    passwordMismatch: 'كلمتا المرور غير متطابقتين',
    activateButton: 'تفعيل الحساب',
    success: 'تم تفعيل الحساب بنجاح',
    successSubtitle: 'تم تفعيل حسابك. يمكنك الآن تسجيل الدخول.',
    goToLogin: 'الذهاب إلى تسجيل الدخول',
  },
  register: {
    subtitle: 'إنشاء حساب جديد',
    username: 'اسم المستخدم',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    submit: 'تسجيل',
    haveAccount: 'هل لديك حساب بالفعل؟ تسجيل الدخول',
    success: 'تم التسجيل بنجاح ، يرجى تسجيل الدخول',
    error: 'فشل التسجيل ، يرجى المحاولة مرة أخرى لاحقًا',
    passwordNotMatch: 'كلمتا المرور غير متطابقتين',
    usernameRequired: 'الرجاء إدخال اسم المستخدم الخاص بك!',
    usernameMinLength: 'يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل',
    fullNameRequired: 'الرجاء إدخال اسمك الكامل!',
    emailRequired: 'الرجاء إدخال بريدك الإلكتروني!',
    emailInvalid: 'صيغة البريد الإلكتروني غير صالحة!',
    passwordRequired: 'الرجاء إدخال كلمة المرور الخاصة بك!',
    passwordMinLength: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل',
    confirmPasswordRequired: 'الرجاء تأكيد كلمة المرور الخاصة بك!',
  },
  dashboard: {
    title: 'لوحة التحكم',
    welcome: 'مرحبًا بعودتك، {{name}}',
  },

  system: {
    settings: 'إعدادات النظام',
    password: {
      minLength: 'الحد الأدنى لطول كلمة المرور',
      complexity: 'تعقيد كلمة المرور',
      expiration: 'انتهاء صلاحية كلمة المرور',
    },
    mfa: {
      title: 'المصادقة متعددة العوامل',
      totp: 'مصادقة TOTP',
      email: 'مصادقة البريد الإلكتروني',
    },
    user: {
      autoDisable: 'تعطيل المستخدمين غير النشطين تلقائيًا',
    },
  },
  menu: {
    authorization: {
      users: 'المستخدم',
      roles: 'الدور',
      serviceAccounts: 'حساب الخدمة',
      authorization: 'إدارة التفويض',
    },
    settings: 'الإعدادات',
    dashboard: 'لوحة التحكم',
    system: {
      settings: 'إعدادات النظام',
      audit: 'سجل التدقيق',
      system: 'إدارة النظام',
    },
    console: 'وحدة التحكم',
  },
  breadcrumbs: {
    authorization: 'إدارة التفويض',
    authorization_roles: 'الأدوار',
    authorization_roles_roles: 'الأدوار',
    authorization_roles_roleCreate: 'إنشاء دور',
    authorization_roles_roleUpdate: 'تحديث الدور',
    authorization_users: 'المستخدمون',
    authorization_users_users: 'المستخدمون',
    authorization_users_userCreate: 'إنشاء مستخدم',
    authorization_users_userDetail: 'تفاصيل المستخدم',
    authorization_users_userUpdate: 'تحديث المستخدم',
    authorization_serviceAccounts: 'حسابات الخدمة',
    authorization_serviceAccounts_serviceAccounts: 'حسابات الخدمة',
    authorization_serviceAccounts_serviceAccountDetail: 'تفاصيل حساب الخدمة',
    system: 'النظام',
    system_settings: 'إعدادات النظام',
    system_settings_settings: 'إعدادات النظام',
    system_settings_organizationDetail: 'تفاصيل المنظمة',
    system_settings_skillEditor: 'محرر المهارة',
    system_settings_skillPreview: 'معاينة المهارة',
    system_settings_aiTraceViewer: 'تتبع الذكاء الاصطناعي',
    system_audit: 'سجل التدقيق',
    dashboard: 'لوحة التحكم',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    tasks: 'المهام',
    taskSchedules: 'المهام المجدولة',
    tasks_taskList: 'قائمة المهام',
  },
  error: {
    notFound: 'عذرًا ، الصفحة التي زرتها غير موجودة.',
    forbidden: 'عذرًا ، غير مصرح لك بالوصول إلى هذه الصفحة.',
    backHome: 'العودة إلى الصفحة الرئيسية',
  },
  common: {
    save: 'حفظ',
    updateSuccess: 'تم التحديث بنجاح',
    updateFailed: 'فشل التحديث',
    fetchFailed: 'فشل جلب البيانات',
    operationFailed: 'فشلت العملية',
    done: 'تم',
    verify: 'تحقق',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
  },
}; 