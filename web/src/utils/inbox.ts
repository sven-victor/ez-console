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

import type { TFunction } from 'i18next';

export function inboxPayload(msg: API.InboxMessage): Record<string, unknown> {
  const payload = msg.payload;
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    return payload as Record<string, unknown>;
  }
  return {};
}

export function inboxMessageTitle(t: TFunction, msg: API.InboxMessage): string {
  return t(`types.${msg.type}`, { defaultValue: msg.type, ...inboxPayload(msg) });
}

export function inboxMessageDescription(t: TFunction, msg: API.InboxMessage): string {
  return t(`typeDescriptions.${msg.type}`, { defaultValue: '', ...inboxPayload(msg) });
}

export function isInboxUnread(msg: API.InboxMessage): boolean {
  return !msg.read_at;
}
