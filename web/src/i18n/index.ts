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

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { createI18nResourceBackend, type I18nNamespace, type I18nResourceLoader } from './backend';

export type { I18nNamespace, I18nResourceLoader };

const FALLBACK_LNG = 'en-US';

const { backend, register, bind } = createI18nResourceBackend({ fallbackLng: FALLBACK_LNG });

bind(i18n);

// Header uses these together, and each file is small, so they share one chunk.
const shellNamespaces = ['translation', 'common', 'inbox', 'task'] as const;

register('zh-CN', shellNamespaces, () => import('./zh-CN/shell'));
register('en-US', shellNamespaces, () => import('./en-US/shell'));
register('de-DE', shellNamespaces, () => import('./de-DE/shell'));
register('es-ES', shellNamespaces, () => import('./es-ES/shell'));
register('fr-FR', shellNamespaces, () => import('./fr-FR/shell'));
register('ar-AE', shellNamespaces, () => import('./ar-AE/shell'));
register('sv-SE', shellNamespaces, () => import('./sv-SE/shell'));

register('zh-CN', 'authorization', () => import('./zh-CN/authorization'));
register('en-US', 'authorization', () => import('./en-US/authorization'));
register('de-DE', 'authorization', () => import('./de-DE/authorization'));
register('es-ES', 'authorization', () => import('./es-ES/authorization'));
register('fr-FR', 'authorization', () => import('./fr-FR/authorization'));
register('ar-AE', 'authorization', () => import('./ar-AE/authorization'));
register('sv-SE', 'authorization', () => import('./sv-SE/authorization'));

register('zh-CN', 'system', () => import('./zh-CN/system'));
register('en-US', 'system', () => import('./en-US/system'));
register('de-DE', 'system', () => import('./de-DE/system'));
register('es-ES', 'system', () => import('./es-ES/system'));
register('fr-FR', 'system', () => import('./fr-FR/system'));
register('ar-AE', 'system', () => import('./ar-AE/system'));
register('sv-SE', 'system', () => import('./sv-SE/system'));

register('zh-CN', 'ai', () => import('./zh-CN/ai'));
register('en-US', 'ai', () => import('./en-US/ai'));
register('de-DE', 'ai', () => import('./de-DE/ai'));
register('es-ES', 'ai', () => import('./es-ES/ai'));
register('fr-FR', 'ai', () => import('./fr-FR/ai'));
register('ar-AE', 'ai', () => import('./ar-AE/ai'));
register('sv-SE', 'ai', () => import('./sv-SE/ai'));

/**
 * Register a lazy translation bundle. Pass one namespace, or several that should
 * load together. A grouped loader's default export is keyed by namespace:
 *
 * registerI18nResource('en-US', 'settings', () => import('./en-US/settings'))
 * registerI18nResource('en-US', ['settings', 'audit'], () => import('./en-US/shell'))
 *
 * `addResource` / `addResourceBundle` still apply immediately and take priority over a loader
 * for the same language and namespace.
 */
export function registerI18nResource(lng: string, ns: I18nNamespace, loader: I18nResourceLoader) {
  register(lng, ns, loader);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(backend)
  .init({
    ns: ['translation', 'common'],
    defaultNS: 'translation',
    fallbackLng: FALLBACK_LNG,
    // Do not also request the language subtag (`zh` for `zh-CN`).
    load: 'currentOnly',
    partialBundledLanguages: true,
    // Retry once inside the backend. A truthy error payload then clears i18next's failed
    // state so the next language change can try again. The default of 5 retries would
    // multiply that and delay Suspense.
    maxRetries: 0,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
