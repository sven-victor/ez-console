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
  title: 'Posteingang',
  bell: 'Benachrichtigungen',
  empty: 'Keine Nachrichten',
  viewAll: 'Alle anzeigen',
  markAllRead: 'Alle als gelesen markieren',
  markRead: 'Als gelesen markieren',
  unread: 'Ungelesen',
  read: 'Gelesen',
  typeLabel: 'Typ',
  createdAt: 'Zeit',
  unreadCount: '{{count}} ungelesen',
  filterAll: 'Alle',
  filterUnread: 'Nur ungelesen',
  types: {
    password_expiry: 'Passwort läuft bald ab',
    login_failure_lock: 'Konto nach fehlgeschlagenen Anmeldungen gesperrt',
    mfa_disabled: 'MFA deaktiviert',
  },
  typeDescriptions: {
    password_expiry: 'Ihr Passwort läuft in {{DaysLeft}} Tagen ab.',
    login_failure_lock: 'Ihr Konto wurde nach zu vielen fehlgeschlagenen Anmeldeversuchen gesperrt.',
    mfa_disabled: 'Die Multi-Faktor-Authentifizierung wurde für Ihr Konto deaktiviert.',
  },
};
