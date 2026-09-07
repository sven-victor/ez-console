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
  title: 'Bandeja de entrada',
  bell: 'Notificaciones',
  empty: 'No hay mensajes',
  viewAll: 'Ver todos',
  markAllRead: 'Marcar todos como leídos',
  markRead: 'Marcar como leído',
  unread: 'No leído',
  read: 'Leído',
  typeLabel: 'Tipo',
  createdAt: 'Hora',
  unreadCount: '{{count}} no leídos',
  filterAll: 'Todos',
  filterUnread: 'Solo no leídos',
  types: {
    password_expiry: 'La contraseña caduca pronto',
    login_failure_lock: 'Cuenta bloqueada tras inicios de sesión fallidos',
    mfa_disabled: 'MFA desactivada',
  },
  typeDescriptions: {
    password_expiry: 'Su contraseña caduca en {{DaysLeft}} días.',
    login_failure_lock: 'Su cuenta se bloqueó tras demasiados intentos de inicio de sesión fallidos.',
    mfa_disabled: 'La autenticación multifactor se desactivó en su cuenta.',
  },
};
