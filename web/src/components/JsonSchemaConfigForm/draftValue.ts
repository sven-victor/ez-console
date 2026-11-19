/**
 * Copyright 2026 Sven Victor
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

import { useCallback, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

/** Keeps keystrokes local and pushes them into the form only when flushed. */
export function useDraftValue(value: unknown) {
  const [draft, setDraft] = useState(value);
  const [source, setSource] = useState(value);
  const draftRef = useRef(value);
  const committedRef = useRef(value);
  const focusedRef = useRef(false);

  if (!focusedRef.current && value !== source) {
    setSource(value);
    setDraft(value);
    draftRef.current = value;
    committedRef.current = value;
  }

  const updateDraft = useCallback((next: unknown) => {
    draftRef.current = next;
    setDraft(next);
  }, []);

  const flush = useCallback((next: unknown, commit: (value: unknown) => void) => {
    draftRef.current = next;
    setDraft(next);
    if (Object.is(next, committedRef.current)) {
      return;
    }
    committedRef.current = next;
    flushSync(() => commit(next));
  }, []);

  const flushDraft = useCallback((commit: (value: unknown) => void) => {
    flush(draftRef.current, commit);
  }, [flush]);

  const markFocused = useCallback((focused: boolean) => {
    focusedRef.current = focused;
  }, []);

  return { draft, updateDraft, flush, flushDraft, markFocused };
}
