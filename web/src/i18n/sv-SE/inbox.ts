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
  title: 'Inkorg',
  bell: 'Aviseringar',
  empty: 'Inga meddelanden',
  viewAll: 'Visa alla',
  markAllRead: 'Markera alla som lästa',
  markRead: 'Markera som läst',
  unread: 'Oläst',
  read: 'Läst',
  typeLabel: 'Typ',
  createdAt: 'Tid',
  unreadCount: '{{count}} olästa',
  filterAll: 'Alla',
  filterUnread: 'Endast olästa',
  types: {
    password_expiry: 'Lösenordet går ut snart',
    login_failure_lock: 'Kontot låstes efter misslyckade inloggningar',
    mfa_disabled: 'MFA inaktiverad',
  },
  typeDescriptions: {
    password_expiry: 'Ditt lösenord går ut om {{DaysLeft}} dagar.',
    login_failure_lock: 'Ditt konto låstes efter för många misslyckade inloggningsförsök.',
    mfa_disabled: 'Multifaktorautentisering inaktiverades på ditt konto.',
  },
};
