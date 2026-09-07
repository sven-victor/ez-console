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
  title: 'Boîte de réception',
  bell: 'Notifications',
  empty: 'Aucun message',
  viewAll: 'Tout voir',
  markAllRead: 'Tout marquer comme lu',
  markRead: 'Marquer comme lu',
  unread: 'Non lu',
  read: 'Lu',
  typeLabel: 'Type',
  createdAt: 'Heure',
  unreadCount: '{{count}} non lus',
  filterAll: 'Tous',
  filterUnread: 'Non lus uniquement',
  types: {
    password_expiry: 'Mot de passe bientôt expiré',
    login_failure_lock: 'Compte verrouillé après des échecs de connexion',
    mfa_disabled: 'MFA désactivée',
  },
  typeDescriptions: {
    password_expiry: 'Votre mot de passe expire dans {{DaysLeft}} jours.',
    login_failure_lock: 'Votre compte a été verrouillé après trop de tentatives de connexion échouées.',
    mfa_disabled: 'L\'authentification multifacteur a été désactivée sur votre compte.',
  },
};
