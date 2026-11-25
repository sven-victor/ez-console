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

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { copyText } from './clipboard.ts';

function installClipboard(options: {
  secure: boolean;
  writeText?: (text: string) => Promise<void>;
  execCommand?: (command: string) => boolean;
}) {
  const copied: string[] = [];
  const calls = { writeText: 0, exec: 0 };
  const textarea = {
    value: '',
    style: {} as Record<string, string>,
    setAttribute() {},
    focus() {},
    select() {},
    setSelectionRange() {},
  };
  const previous = {
    window: globalThis.window,
    document: globalThis.document,
    navigator: globalThis.navigator,
  };
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    writable: true,
    value: { isSecureContext: options.secure },
  });
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    writable: true,
    value: {
      createElement() {
        return textarea;
      },
      body: {
        appendChild() {},
        removeChild() {},
      },
      execCommand(command: string) {
        calls.exec += 1;
        if (command === 'copy') {
          copied.push(textarea.value);
        }
        return options.execCommand ? options.execCommand(command) : true;
      },
    },
  });
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    writable: true,
    value: {
      clipboard: options.writeText
        ? {
            writeText: async (text: string) => {
              calls.writeText += 1;
              await options.writeText!(text);
              copied.push(text);
            },
          }
        : undefined,
    },
  });
  return {
    copied,
    calls,
    restore() {
      Object.defineProperty(globalThis, 'window', { configurable: true, writable: true, value: previous.window });
      Object.defineProperty(globalThis, 'document', { configurable: true, writable: true, value: previous.document });
      Object.defineProperty(globalThis, 'navigator', { configurable: true, writable: true, value: previous.navigator });
    },
  };
}

test('copyText uses the async clipboard API in a secure context', async () => {
  const env = installClipboard({
    secure: true,
    writeText: async () => {},
  });
  try {
    await copyText('hello');
    assert.deepEqual(env.copied, ['hello']);
    assert.equal(env.calls.writeText, 1);
    assert.equal(env.calls.exec, 0);
  } finally {
    env.restore();
  }
});

test('copyText falls back to execCommand on plain HTTP', async () => {
  const env = installClipboard({ secure: false });
  try {
    await copyText('http-copy');
    assert.deepEqual(env.copied, ['http-copy']);
    assert.equal(env.calls.writeText, 0);
    assert.equal(env.calls.exec, 1);
  } finally {
    env.restore();
  }
});

test('copyText falls back when the async clipboard API rejects', async () => {
  const env = installClipboard({
    secure: true,
    writeText: async () => {
      throw new Error('blocked');
    },
  });
  try {
    await copyText('fallback');
    assert.deepEqual(env.copied, ['fallback']);
    assert.equal(env.calls.writeText, 1);
    assert.equal(env.calls.exec, 1);
  } finally {
    env.restore();
  }
});

test('copyText throws when both copy paths fail', async () => {
  const env = installClipboard({
    secure: false,
    execCommand: () => false,
  });
  try {
    await assert.rejects(() => copyText('nope'), /Failed to copy text/);
  } finally {
    env.restore();
  }
});
