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

import type { BackendModule, ReadCallback, i18n } from 'i18next';

export type I18nResource = Record<string, unknown>;

/**
 * One literal `import()` of a language file, or of a module whose default export
 * maps several namespaces (`{ common, inbox }`).
 */
export type I18nResourceLoader = () => Promise<I18nResource | { default: I18nResource }>;

export type I18nNamespace = string | readonly string[];

export interface I18nResourceBackendOptions {
  /** Language used when the requested bundle is missing or fails to load. */
  fallbackLng: string;
}

interface LoadGate {
  promise: Promise<boolean>;
  resolve: (usable: boolean) => void;
}

interface ResourceGroup {
  namespaces: readonly string[];
  loader: I18nResourceLoader;
  pending?: Promise<Record<string, I18nResource>>;
}

const RETRIES = 2;

function unwrap(mod: unknown): I18nResource | null {
  if (!mod || typeof mod !== 'object' || Array.isArray(mod)) return null;
  const record = mod as Record<string, unknown>;
  const exported = record.default;
  if (exported && typeof exported === 'object' && !Array.isArray(exported)) {
    return exported as I18nResource;
  }
  if ('default' in record && Object.keys(record).every((key) => key === 'default' || key === '__esModule')) {
    return null;
  }
  return record;
}

function isUsable(data: unknown): data is I18nResource {
  return !!data && typeof data === 'object' && !Array.isArray(data) && Object.keys(data as object).length > 0;
}

function splitResources(namespaces: readonly string[], data: I18nResource): Record<string, I18nResource> {
  if (namespaces.length === 1) return { [namespaces[0]]: data };
  const parts: Record<string, I18nResource> = {};
  for (const name of namespaces) {
    const slice = data[name];
    if (slice && typeof slice === 'object' && !Array.isArray(slice)) {
      parts[name] = slice as I18nResource;
    }
  }
  return parts;
}

function createGate(): LoadGate {
  let resolve: (usable: boolean) => void = () => {};
  const promise = new Promise<boolean>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

/**
 * i18next backend that loads a namespace when it is first used.
 * A successful bundle for the active language does not download the fallback language.
 * Set `maxRetries: 0` on i18next so a failed read can be attempted again on the next language change.
 */
export function createI18nResourceBackend(options: I18nResourceBackendOptions) {
  const { fallbackLng } = options;
  const groups = new Map<string, ResourceGroup>();
  const warned = new Set<string>();
  const batch = new Map<string, LoadGate>();
  let batchScheduled = false;
  let bound: i18n | undefined;
  let requestedLanguage: string | undefined;

  function warnMissing(language: string, namespace: string) {
    if (process.env.NODE_ENV === 'production') return;
    const key = `${language}|${namespace}`;
    if (warned.has(key)) return;
    warned.add(key);
    console.warn(`[i18n] No resource registered for "${language}" namespace "${namespace}".`);
  }

  function loadGroup(group: ResourceGroup): Promise<Record<string, I18nResource>> {
    if (group.pending) return group.pending;
    const pending = (async () => {
      let lastError: unknown;
      for (let attempt = 0; attempt < RETRIES; attempt += 1) {
        try {
          const data = unwrap(await group.loader());
          if (!data) throw new Error('Invalid i18n resource');
          const parts = splitResources(group.namespaces, data);
          if (group.namespaces.length > 1 && Object.keys(parts).length === 0) {
            throw new Error('Invalid i18n resource');
          }
          return parts;
        } catch (error) {
          lastError = error;
        }
      }
      throw lastError instanceof Error ? lastError : new Error(String(lastError));
    })();
    group.pending = pending;
    pending.catch(() => {
      if (group.pending === pending) group.pending = undefined;
    });
    return pending;
  }

  function installSiblings(language: string, namespace: string, group: ResourceGroup, parts: Record<string, I18nResource>) {
    if (!bound) return;
    for (const name of group.namespaces) {
      if (name === namespace) continue;
      const extra = parts[name];
      if (!isUsable(extra) || isUsable(bound.getResourceBundle(language, name))) continue;
      bound.addResourceBundle(language, name, extra, true, true);
    }
  }

  function load(language: string, namespace: string, done: ReadCallback) {
    const group = groups.get(`${language}|${namespace}`);
    if (!group) {
      warnMissing(language, namespace);
      done(null, null);
      return;
    }
    void loadGroup(group).then(
      (parts) => {
        installSiblings(language, namespace, group, parts);
        const slice = parts[namespace];
        done(null, isUsable(slice) ? slice : null);
      },
      (error: unknown) => {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error(`[i18n] Failed to load "${language}" namespace "${namespace}".`, err);
        // Pass an object so i18next clears the failed state (requires maxRetries: 0)
        // and a later language change can try this bundle again. The object is not stored.
        done(err, {});
      },
    );
  }

  function scheduleBatchClear() {
    if (batchScheduled) return;
    batchScheduled = true;
    queueMicrotask(() => {
      batch.clear();
      batchScheduled = false;
    });
  }

  function settle(gate: LoadGate, err: Parameters<ReadCallback>[0], data: Parameters<ReadCallback>[1], callback: ReadCallback) {
    gate.resolve(!err && isUsable(data));
    callback(err, data);
  }

  const backend: BackendModule = {
    type: 'backend',
    init() {},
    read(language, namespace, callback) {
      scheduleBatchClear();
      if (language === fallbackLng) {
        const gate = batch.get(namespace);
        if (gate) {
          gate.promise.then((usable) => {
            if (usable) callback(null, null);
            else load(language, namespace, callback);
          });
          return;
        }
        // The active bundle was already in the store, so i18next never called read() for it.
        const active = requestedLanguage || bound?.language;
        if (active && active !== fallbackLng && isUsable(bound?.getResourceBundle(active, namespace))) {
          callback(null, null);
          return;
        }
      }

      const gate = createGate();
      if (language !== fallbackLng) batch.set(namespace, gate);
      load(language, namespace, (err, data) => settle(gate, err, data, callback));
    },
  };

  function register(lng: string, ns: I18nNamespace, loader: I18nResourceLoader) {
    const namespaces = typeof ns === 'string' ? [ns] : [...ns];
    if (namespaces.length === 0) return;
    const group: ResourceGroup = { namespaces, loader };
    for (const name of namespaces) {
      const key = `${lng}|${name}`;
      if (groups.has(key) && process.env.NODE_ENV !== 'production') {
        console.warn(`[i18n] Replacing resource loader for "${lng}" namespace "${name}".`);
      }
      groups.set(key, group);
    }
    if (!bound?.isInitialized || bound.language !== lng) return;
    const configured = bound.options.ns;
    const configuredList = typeof configured === 'string' ? [configured] : configured ?? [];
    const reload = namespaces.filter((name) => {
      if (!configuredList.includes(name)) return false;
      return !isUsable(bound?.getResourceBundle(lng, name));
    });
    if (reload.length === 0) return;
    void bound.reloadResources([lng], reload);
  }

  function bind(instance: i18n) {
    bound = instance;
    instance.on('languageChanging', (lng) => {
      if (lng) requestedLanguage = lng;
    });
  }

  return { backend, register, bind };
}
