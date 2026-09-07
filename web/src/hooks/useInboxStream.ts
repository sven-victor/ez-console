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

import { useEffect, useRef } from 'react';
import { request } from '@/service/client';
import api from '@/service/api';
import { useAuth } from '@/hooks/useAuth';
import { useSite } from '@/contexts/SiteContext';

type InboxSSEEvent = {
  event_type?: string;
  message?: API.InboxMessage;
  unread_count?: number;
};

type ParsedSSE = {
  id?: string;
  event?: string;
  data?: string;
};

function parseSSEBlock(block: string): ParsedSSE | null {
  let id: string | undefined;
  let event: string | undefined;
  const dataLines: string[] = [];
  for (const line of block.split('\n')) {
    if (!line || line.startsWith(':')) {
      continue;
    }
    const colon = line.indexOf(':');
    const field = colon === -1 ? line : line.slice(0, colon);
    let value = colon === -1 ? '' : line.slice(colon + 1);
    if (value.startsWith(' ')) {
      value = value.slice(1);
    }
    if (field === 'id') {
      id = value;
    } else if (field === 'event') {
      event = value;
    } else if (field === 'data') {
      dataLines.push(value);
    }
  }
  if (!id && !event && dataLines.length === 0) {
    return null;
  }
  return { id, event, data: dataLines.join('\n') };
}

async function consumeSSE(
  stream: ReadableStream<Uint8Array>,
  signal: AbortSignal,
  onEvent: (evt: ParsedSSE) => void,
): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  try {
    while (!signal.aborted) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      buf += decoder.decode(value, { stream: true });
      buf = buf.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      let idx = buf.indexOf('\n\n');
      while (idx >= 0) {
        const raw = buf.slice(0, idx);
        buf = buf.slice(idx + 2);
        const parsed = parseSSEBlock(raw);
        if (parsed) {
          onEvent(parsed);
        }
        idx = buf.indexOf('\n\n');
      }
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // ignore
    }
  }
}

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }
    const timer = window.setTimeout(resolve, ms);
    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
  });
}

/**
 * Opens GET /api/inbox/stream after login and aborts it on logout.
 * Reconnects with Last-Event-ID so catch-up uses the server cursor.
 */
export function useInboxStream(): void {
  const { user } = useAuth();
  const { setInboxUnreadCount, bumpInboxRevision } = useSite();
  const lastEventIdRef = useRef('');
  const unreadRef = useRef(0);

  useEffect(() => {
    if (!user?.id) {
      lastEventIdRef.current = '';
      unreadRef.current = 0;
      setInboxUnreadCount(0);
      return;
    }

    const controller = new AbortController();
    let delay = 1000;

    void api.inbox.getInboxUnreadCount().then((res) => {
      if (controller.signal.aborted) {
        return;
      }
      const count = res?.unread_count ?? 0;
      unreadRef.current = count;
      setInboxUnreadCount(count);
    }).catch(() => {
      // Stream catch-up will refresh the badge.
    });

    const handleEvent = (parsed: ParsedSSE) => {
      if (parsed.id) {
        lastEventIdRef.current = parsed.id;
      }
      if (!parsed.data) {
        return;
      }
      let body: InboxSSEEvent;
      try {
        body = JSON.parse(parsed.data) as InboxSSEEvent;
      } catch {
        return;
      }
      if (typeof body.unread_count === 'number') {
        if (body.unread_count !== unreadRef.current) {
          unreadRef.current = body.unread_count;
          setInboxUnreadCount(body.unread_count);
          if (body.event_type === 'sync') {
            bumpInboxRevision();
          }
        } else {
          setInboxUnreadCount(body.unread_count);
        }
      }
      if (body.event_type === 'message') {
        bumpInboxRevision();
      }
    };

    const run = async () => {
      while (!controller.signal.aborted) {
        try {
          const headers: Record<string, string> = {};
          if (lastEventIdRef.current) {
            headers['Last-Event-ID'] = lastEventIdRef.current;
          }
          const stream = await request('/api/inbox/stream', {
            method: 'GET',
            requestType: 'sse',
            signal: controller.signal,
            headers,
          });
          delay = 1000;
          await consumeSSE(stream, controller.signal, handleEvent);
        } catch {
          if (controller.signal.aborted) {
            return;
          }
        }
        if (controller.signal.aborted) {
          return;
        }
        await sleep(delay, controller.signal);
        delay = Math.min(delay * 2, 15000);
      }
    };

    void run();
    return () => {
      controller.abort();
    };
  }, [user?.id, setInboxUnreadCount, bumpInboxRevision]);
}
