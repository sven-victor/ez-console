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
import { createInstance, type Resource, type i18n } from 'i18next';
import { createI18nResourceBackend, type I18nNamespace, type I18nResourceLoader } from './backend.ts';

const fallbackLng = 'en-US';

function bundle(value: Record<string, string>): I18nResourceLoader {
  return () => Promise.resolve({ default: value });
}

async function setup(options: {
  lng: string;
  ns?: string[];
  loaders?: Array<[string, I18nNamespace, I18nResourceLoader]>;
  resources?: Resource;
}): Promise<{ i18n: i18n; register: (lng: string, ns: I18nNamespace, loader: I18nResourceLoader) => void }> {
  const { backend, register, bind } = createI18nResourceBackend({ fallbackLng });
  const instance = createInstance();
  bind(instance);
  for (const [lng, ns, loader] of options.loaders ?? []) {
    register(lng, ns, loader);
  }
  await instance.use(backend).init({
    lng: options.lng,
    ns: options.ns ?? ['common'],
    defaultNS: 'common',
    fallbackLng,
    load: 'currentOnly',
    partialBundledLanguages: true,
    maxRetries: 0,
    initAsync: false,
    interpolation: { escapeValue: false },
    resources: options.resources,
  });
  return { i18n: instance, register };
}

test('loads the active language bundle and skips the fallback language', async () => {
  let fallbackLoads = 0;
  const { i18n } = await setup({
    lng: 'zh-CN',
    loaders: [
      ['zh-CN', 'common', bundle({ save: '保存' })],
      ['en-US', 'common', () => {
        fallbackLoads += 1;
        return Promise.resolve({ default: { save: 'Save' } });
      }],
    ],
  });

  assert.equal(i18n.t('save'), '保存');
  assert.equal(fallbackLoads, 0);
});

test('uses the fallback language when the active namespace is not registered', async () => {
  const { i18n } = await setup({
    lng: 'de-DE',
    loaders: [
      ['en-US', 'common', bundle({ save: 'Save' })],
    ],
  });

  assert.equal(i18n.t('save'), 'Save');
  assert.equal(i18n.language, 'de-DE');
});

test('retries a failing loader once before using its bundle', async () => {
  let attempts = 0;
  const { i18n } = await setup({
    lng: 'zh-CN',
    loaders: [
      ['zh-CN', 'common', () => {
        attempts += 1;
        if (attempts === 1) return Promise.reject(new Error('network'));
        return Promise.resolve({ default: { save: '保存' } });
      }],
      ['en-US', 'common', bundle({ save: 'Save' })],
    ],
  });

  assert.equal(attempts, 2);
  assert.equal(i18n.t('save'), '保存');
});

test('uses fallback text when a loader keeps failing and loads again after switching back', async () => {
  let attempts = 0;
  let fail = true;
  const { i18n } = await setup({
    lng: 'de-DE',
    loaders: [
      ['de-DE', 'common', () => {
        attempts += 1;
        if (fail) return Promise.reject(new Error('network'));
        return Promise.resolve({ default: { save: 'Speichern' } });
      }],
      ['en-US', 'common', bundle({ save: 'Save' })],
    ],
  });

  assert.equal(attempts, 2);
  assert.equal(i18n.t('save'), 'Save');
  assert.equal(i18n.t('missing', { defaultValue: 'Fallback Text' }), 'Fallback Text');

  fail = false;
  await i18n.changeLanguage('en-US');
  await i18n.changeLanguage('de-DE');

  assert.equal(attempts, 3);
  assert.equal(i18n.t('save'), 'Speichern');
});

test('loads a namespace when it is requested', async () => {
  let settingsLoads = 0;
  const { i18n } = await setup({
    lng: 'zh-CN',
    ns: ['common'],
    loaders: [
      ['zh-CN', 'common', bundle({ save: '保存' })],
      ['zh-CN', 'settings', () => {
        settingsLoads += 1;
        return Promise.resolve({ default: { title: '设置' } });
      }],
    ],
  });

  assert.equal(settingsLoads, 0);
  await i18n.loadNamespaces('settings');
  assert.equal(settingsLoads, 1);
  assert.equal(i18n.t('title', { ns: 'settings' }), '设置');
});

test('keeps an inline bundle and does not call its loader', async () => {
  let loads = 0;
  let fallbackLoads = 0;
  const { i18n } = await setup({
    lng: 'zh-CN',
    ns: ['settings'],
    resources: {
      'zh-CN': {
        settings: { title: '内联' },
      },
    },
    loaders: [
      ['zh-CN', 'settings', () => {
        loads += 1;
        return Promise.resolve({ default: { title: '文件' } });
      }],
      ['en-US', 'settings', () => {
        fallbackLoads += 1;
        return Promise.resolve({ default: { title: 'Settings' } });
      }],
    ],
  });

  assert.equal(loads, 0);
  assert.equal(fallbackLoads, 0);
  assert.equal(i18n.t('title', { ns: 'settings' }), '内联');
});

test('one loader fills every namespace registered together', async () => {
  let loads = 0;
  const { i18n } = await setup({
    lng: 'zh-CN',
    ns: ['common', 'inbox'],
    loaders: [
      ['zh-CN', ['common', 'inbox'], () => {
        loads += 1;
        return Promise.resolve({
          default: {
            common: { save: '保存' },
            inbox: { title: '站内信' },
          },
        });
      }],
      ['en-US', ['common', 'inbox'], () => {
        loads += 1;
        return Promise.resolve({
          default: {
            common: { save: 'Save' },
            inbox: { title: 'Inbox' },
          },
        });
      }],
    ],
  });

  assert.equal(loads, 1);
  assert.equal(i18n.t('save'), '保存');
  assert.equal(i18n.t('title', { ns: 'inbox' }), '站内信');
});

test('loads a namespace registered after the first empty lookup', async () => {
  const { i18n, register } = await setup({
    lng: 'zh-CN',
    loaders: [
      ['en-US', 'settings', bundle({ title: 'Settings' })],
    ],
  });

  await i18n.loadNamespaces('settings');
  assert.equal(i18n.t('title', { ns: 'settings' }), 'Settings');

  register('zh-CN', 'settings', bundle({ title: '设置' }));
  await i18n.loadNamespaces('settings');
  assert.equal(i18n.t('title', { ns: 'settings' }), '设置');
});
