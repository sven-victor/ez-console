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

import { useEffect, useMemo, useRef } from 'react';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAI, type RegisteredClientTool } from '@/contexts/AIContext';
import { useSite } from '@/contexts/SiteContext';
import { useAuth } from '@/hooks/useAuth';
import usePermission from '@/hooks/usePermission';
import { toSmartTitle } from '@/utils';
import { type IRoute } from '../routes';

/** How long `ui_navigate` waits for the target page to register its AI tools. */
const PAGE_READY_TIMEOUT_MS = 3000;

export interface AIRouteEntry {
  /** Route pattern, e.g. `/authorization/users/:id`. */
  path: string;
  /** Dotted route name, e.g. `authorization.users.userDetail`. */
  name: string;
  /** Human-readable label (menu i18n text when available). */
  label: string;
  /** True when the path contains params and needs concrete values. */
  has_params: boolean;
}

/**
 * Flatten the route tree into the routes the AI may open: private routes
 * with a name that the current user is permitted to access. `hideInMenu`
 * only affects the sidebar; hidden pages (profile, inbox, trace viewer) are
 * still valid navigation targets.
 */
export function collectAIRoutes(
  routes: IRoute[],
  hasAnyPermission: (permissions: string[]) => boolean,
  label: (names: string[], fallback: string) => string,
  parents: string[] = [],
  inheritedPrivate = false,
  parentPath?: string,
): AIRouteEntry[] {
  const out: AIRouteEntry[] = [];
  for (const route of routes) {
    const isPrivate = inheritedPrivate || !!route.is_private;
    if (route.permissions && !hasAnyPermission(route.permissions)) {
      continue;
    }
    const names = route.name ? [...parents, route.name] : parents;
    // An index child without its own path renders at the parent's path
    // (e.g. the `tasks` list under the unnamed `/tasks` group).
    const path = route.path ?? (route.index ? parentPath : undefined);
    if (isPrivate && path && route.name && !path.includes('*')) {
      out.push({
        path,
        name: names.join('.'),
        label: label(names, toSmartTitle(route.name) ?? route.name),
        has_params: path.includes(':'),
      });
    }
    if ('children' in route && route.children) {
      out.push(...collectAIRoutes(route.children, hasAnyPermission, label, names, isPrivate, path ?? parentPath));
    }
  }
  // Dedupe by path (index routes often repeat the parent path).
  const seen = new Set<string>();
  return out.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });
}

/** Build the system prompt that tells the model which pages exist. */
export function buildRoutesPrompt(entries: AIRouteEntry[]): string {
  if (entries.length === 0) {
    return '';
  }
  const lines = entries.map((e) => `- ${e.path} — ${e.label}${e.has_params ? ' (replace the :param with a real value)' : ''}`);
  return [
    'You are embedded in a web console and can move between its pages with the ui_navigate tool. Pages available to this user:',
    ...lines,
    'Only these paths exist; do not invent others. Call ui_get_current_route to learn where the user is now. After navigating, the target page publishes its own ui_* tools, which you can use on the next turn.',
  ].join('\n');
}

/**
 * Registers the app-wide AI context that lets the chat move between pages:
 * a system prompt listing the routes this user can open, plus the
 * `ui_get_current_route`, `ui_navigate`, and `ui_choose` client tools.
 * Page-specific actions are published by each page via `registerPageAI`.
 */
export function useGlobalAITools(routes: IRoute[], enabled: boolean): void {
  const { registerGlobalAI, getClientTools, waitForPageAI } = useAI();
  const navigate = useNavigate();
  const location = useLocation();
  const { hasAnyPermission } = usePermission();
  const { user } = useAuth();
  const { currentOrgId } = useSite();
  const { t, i18n } = useTranslation();

  // Handlers read these refs so the registration does not churn on every render.
  const locationRef = useRef(location);
  locationRef.current = location;
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;
  const routesRef = useRef(routes);
  routesRef.current = routes;
  const hasAnyPermissionRef = useRef(hasAnyPermission);
  hasAnyPermissionRef.current = hasAnyPermission;

  // The route list depends on the route table, the user's roles (permission
  // filtering) and the UI language (labels). usePermission returns a new
  // function each render, so key on the underlying inputs instead.
  const rolesKey = (user?.roles ?? []).map((r) => r.id).join(',');
  const routeEntries = useMemo(
    () => collectAIRoutes(
      routes,
      hasAnyPermissionRef.current,
      (names, fallback) => {
        // Same keys the layout uses for breadcrumbs and the sidebar menu.
        for (const key of [`breadcrumbs.${names.join('_')}`, `menu.${names.join('.')}`]) {
          const text = t(key, { defaultValue: '' });
          if (typeof text === 'string' && text && text !== key) {
            return text;
          }
        }
        return fallback;
      },
    ),
    [routes, rolesKey, currentOrgId, i18n.language, t],
  );
  const routeEntriesRef = useRef(routeEntries);
  routeEntriesRef.current = routeEntries;

  const tools = useMemo((): RegisteredClientTool[] => {
    const listNavigable = () => routeEntriesRef.current.filter((e) => !e.has_params).map((e) => ({ path: e.path, label: e.label }));
    const describeCurrent = () => {
      const loc = locationRef.current;
      const matches = matchRoutes(routesRef.current, loc.pathname) ?? [];
      const names = matches.map((m) => m.route.name).filter(Boolean);
      return {
        path: loc.pathname,
        search: loc.search,
        hash: loc.hash,
        route_name: names.join('.'),
        params: matches.length > 0 ? matches[matches.length - 1].params : {},
        available_tools: getClientTools().map((tool) => tool.name),
      };
    };

    return [
      {
        name: 'ui_get_current_route',
        description:
          'Browser-side. Returns the current in-app route (path, route name, params) and the client tools available on the current page. The list of pages you can open is already in your instructions.',
        parameters: { type: 'object', properties: {}, required: [] },
        handler: () => JSON.stringify(describeCurrent()),
      },
      {
        name: 'ui_navigate',
        description:
          'Browser-side. Navigate the web app to one of the in-app paths listed in your instructions (e.g. "/authorization/users", or "/authorization/users/<id>" with a real id). After navigation the target page publishes its own ui_* tools; the result lists them under available_tools. Use those tools on the next turn to act on the new page.',
        parameters: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Absolute in-app path starting with "/", optionally with a query string.',
            },
          },
          required: ['path'],
        },
        handler: async (argsJson: string) => {
          let path: unknown;
          try {
            path = (JSON.parse(argsJson || '{}') as { path?: unknown }).path;
          } catch {
            return JSON.stringify({ error: 'Invalid arguments: expected JSON with a "path" string' });
          }
          if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {
            return JSON.stringify({ error: 'path must be an absolute in-app path starting with "/"', navigable_paths: listNavigable() });
          }
          const pathname = path.split(/[?#]/)[0];
          const matches = matchRoutes(routesRef.current, pathname);
          if (!matches || matches.length === 0) {
            return JSON.stringify({ error: `No page matches path "${pathname}"`, navigable_paths: listNavigable() });
          }
          const target = matches[matches.length - 1].route;
          if (target.permissions && !hasAnyPermissionRef.current(target.permissions)) {
            return JSON.stringify({ error: `You do not have permission to open "${pathname}"`, navigable_paths: listNavigable() });
          }
          const current = locationRef.current;
          if (current.pathname === pathname && `${current.pathname}${current.search}${current.hash}` === path) {
            return JSON.stringify({ ok: true, already_on_page: true, ...describeCurrent() });
          }
          // Start waiting before navigating so a fast page registration is not missed.
          const ready = waitForPageAI(PAGE_READY_TIMEOUT_MS);
          navigateRef.current(path);
          const pageRegistered = await ready;
          return JSON.stringify({
            ok: true,
            page_registered_ai_tools: pageRegistered,
            ...describeCurrent(),
          });
        },
      },
      {
        name: 'ui_choose',
        description:
          'Ask the user to pick one option when several valid next actions exist. Do not use this to confirm a tool you can call yourself; call that tool and let approval cards handle confirmation.',
        parameters: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            options: {
              type: 'array',
              minItems: 2,
              maxItems: 6,
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  label: { type: 'string' },
                  description: { type: 'string' },
                },
                required: ['id', 'label'],
              },
            },
          },
          required: ['title', 'options'],
        },
        // Safety net: the card protocol owns this tool. Never treat a handler result as the user's choice.
        handler: () => JSON.stringify({ error: 'ui_choose is presented as a chat card and must not be auto-executed' }),
      },
    ];
  }, [getClientTools, waitForPageAI]);

  const routesPrompt = useMemo(() => buildRoutesPrompt(routeEntries), [routeEntries]);

  useEffect(() => {
    if (!enabled) return;
    return registerGlobalAI({
      ephemeralSystemPrompts: routesPrompt ? [routesPrompt] : [],
      tools,
    });
  }, [enabled, tools, routesPrompt, registerGlobalAI]);
}

export default useGlobalAITools;
