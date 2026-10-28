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

import api from '@/service/api';
import { useRequest } from 'ahooks';
import { App } from 'antd';
import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { type StrictRJSFSchema as JSONSchema7 } from '@rjsf/utils';
import { isFunction } from 'lodash-es';
import { isString } from 'antd/es/button';

// Client tool handler: receives JSON arguments string, returns JSON result string
export type ClientToolHandler = (argsJson: string) => Promise<string> | string;

// A client-side tool registered by a page
export interface RegisteredClientTool {
  /** Must start with "ui_" prefix */
  name: string;
  description: string;
  /** OpenAI-compatible function parameters JSON Schema */
  parameters: JSONSchema7;
  handler: ClientToolHandler;
}


/** Getter that returns the current page data snapshot (called lazily by the built-in tool). */
export type PageDataGetter = () => unknown;

// Options for page-level AI context registration
export interface PageAIOptions {
  ephemeralSystemPrompts?: string[];
  tools?: RegisteredClientTool[];
  /** Register a getter for the current page data.  When provided, a built-in
   *  `ui_get_page_data` client tool is automatically created so the AI model
   *  can retrieve the page data on demand. */
  pageData?: string | Record<string, unknown> | PageDataGetter;
  /** Human-readable description of what `pageData` returns – becomes the
   *  tool's `description` field visible to the model. */
  pageDataDescription?: string;
}

/** Options for an app-wide AI registration (see `registerGlobalAI`). */
export interface GlobalAIOptions {
  /** Prompts merged into every chat request, ahead of page-level prompts. */
  ephemeralSystemPrompts?: string[];
  /** Client tools available on every page. Names must start with "ui_". */
  tools?: RegisteredClientTool[];
}

/**
 * Argument accepted by `registerGlobalAI`.
 *
 * - An object appends its prompts and tools to what earlier global
 *   registrations provided.
 * - A function receives the options accumulated by all earlier global
 *   registrations and returns the next accumulated options. Use it to
 *   append, rewrite, or drop earlier prompts/tools (spread `ori` to keep
 *   them). The function must be pure: it is re-run whenever the set of
 *   global registrations changes.
 */
export type GlobalAIOptionsInput = GlobalAIOptions | ((ori: GlobalAIOptions) => GlobalAIOptions);

/** Fully resolved global options: both arrays are always present. */
type ResolvedGlobalAI = Required<GlobalAIOptions>;

/** Options for a programmatic chat turn. */
export interface CallAIOptions {
  /**
   * Context messages persisted when a session is created.
   * Use role `'prompt'` for page/context instructions: they reach the model as
   * leading user context but stay hidden from the chat history UI.
   * Role `'system'` is downgraded to `'prompt'` by the backend — session
   * messages never feed the model's system prompt. For prompts that must
   * apply to every request, use `registerPageAI({ ephemeralSystemPrompts })`.
   * Ignored when the message is appended to an existing session.
   */
  messages?: API.SimpleChatMessage[];
  /**
   * Skill domains sent with this message. Also replaces the selected domains
   * in the chat UI so later turns in the session keep them.
   */
  domains?: string[];
  /**
   * Create a new session before sending. Defaults to true.
   * When false, the message is sent to the active session. A session is still
   * created when none is active.
   */
  newSession?: boolean;
  /**
   * Store a newly created session as anonymous. Defaults to true, so the
   * session stays out of the conversation list.
   * Set false to create a normal session that appears in history.
   * Ignored when the message is appended to an existing session.
   */
  anonymous?: boolean;
}

export type CallAIArgument = API.SimpleChatMessage[] | CallAIOptions;

/** Accept either a context-message array or a CallAIOptions object. */
export function normalizeCallAIOptions(options?: CallAIArgument): CallAIOptions {
  if (!options) {
    return {};
  }
  if (Array.isArray(options)) {
    return { messages: options };
  }
  return options;
}

// AI context type
export interface AIContextType {
  layout: 'classic' | 'sidebar' | 'float-sidebar';
  setLayout: (layout: 'classic' | 'sidebar' | 'float-sidebar') => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  /**
   * Open the AI chat and send a user message.
   *
   * @param message The user message to send.
   * @param options Context messages, or {@link CallAIOptions}.
   *   A `SimpleChatMessage[]` starts a new anonymous session with that context.
   *   `{ messages, domains, newSession, anonymous }` can also set skill domains,
   *   reuse the active session (`newSession` defaults to true), and choose
   *   whether a new session is anonymous (`anonymous` defaults to true).
   */
  callAI: (message: string, options?: CallAIArgument) => void;
  onCallAI: (callback: (message: string, options?: CallAIArgument) => void) => void;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
  fetchConversations: () => Promise<API.AIChatSession[]>;
  fetchConversationsLoading: boolean;
  conversations: API.AIChatSession[] | undefined;
  activeConversationKey: string | undefined;
  setActiveConversationKey: (key: string) => void;
  // Page-level AI context
  /** Global prompts (in registration order) followed by the current page's prompts. */
  ephemeralSystemPrompts: string[];
  /**
   * Client tools sent with every chat request: global tools (registered by the
   * layout, e.g. `ui_navigate`, or by the host via `aiChatProps.clientTools`)
   * merged with the current page's tools. A page tool with the same name as a
   * global tool wins.
   */
  clientTools: RegisteredClientTool[];
  registerPageAI: (opts: PageAIOptions) => () => void;
  /**
   * Clear the page-level registration if it belongs to a different route than
   * the current one. Called by the layout on route change as a safety net for
   * pages that do not return the cleanup from `registerPageAI`.
   */
  resetPageAIContext: () => void;
  /**
   * Register prompts and client tools that stay available across pages (not
   * cleared on route change). Pass a `GlobalAIOptions` object to append, or
   * a function of the previously accumulated options to rewrite them.
   * Returns an unregister function.
   */
  registerGlobalAI: (opts: GlobalAIOptionsInput) => () => void;
  /** Latest merged client tools, read synchronously (not subject to render timing). */
  getClientTools: () => RegisteredClientTool[];
  /** Latest global + page ephemeral prompts, read synchronously. */
  getEphemeralSystemPrompts: () => string[];
  /**
   * Resolve `true` the next time a page calls `registerPageAI`, or `false`
   * after `timeoutMs`. Used by navigation tools to wait for the target page
   * to publish its tools before the chat continues.
   */
  waitForPageAI: (timeoutMs?: number) => Promise<boolean>;
}

// Create AI context
export const AIContext = createContext<AIContextType>({
  layout: 'sidebar',
  setLayout: () => { },
  visible: false,
  setVisible: () => { },
  callAI: () => { },
  onCallAI: () => { },
  loaded: false,
  setLoaded: () => { },
  fetchConversations: () => Promise.resolve([]),
  fetchConversationsLoading: false,
  conversations: undefined,
  activeConversationKey: undefined,
  setActiveConversationKey: () => { },
  ephemeralSystemPrompts: [],
  clientTools: [],
  registerPageAI: () => () => { },
  resetPageAIContext: () => { },
  registerGlobalAI: () => () => { },
  getClientTools: () => [],
  getEphemeralSystemPrompts: () => [],
  waitForPageAI: () => Promise.resolve(false),
});

/** Current route key used to stamp page registrations. */
function currentRouteKey(): string {
  return typeof window !== 'undefined' ? window.location.pathname : '';
}

interface PageAIRegistration {
  id: number;
  routeKey: string;
  prompts: string[];
  tools: RegisteredClientTool[];
}

/**
 * One global registration. Registrations are folded in order to produce the
 * effective global options: an object appends; a function receives the
 * options accumulated so far and returns the new accumulated options.
 */
interface GlobalAIRegistration {
  id: number;
  apply: (previous: ResolvedGlobalAI) => ResolvedGlobalAI;
}

function toGlobalRegistration(id: number, opts: GlobalAIOptionsInput): GlobalAIRegistration {
  if (typeof opts === 'function') {
    return {
      id,
      apply: (previous) => {
        const next = opts({
          ephemeralSystemPrompts: [...previous.ephemeralSystemPrompts],
          tools: [...previous.tools],
        });
        return {
          ephemeralSystemPrompts: next?.ephemeralSystemPrompts ?? [],
          tools: next?.tools ?? [],
        };
      },
    };
  }
  return {
    id,
    apply: (previous) => ({
      ephemeralSystemPrompts: [...previous.ephemeralSystemPrompts, ...(opts.ephemeralSystemPrompts ?? [])],
      tools: [...previous.tools, ...(opts.tools ?? [])],
    }),
  };
}

/** Fold all global registrations, in registration order, into one options object. */
function resolveGlobalAI(globals: GlobalAIRegistration[]): ResolvedGlobalAI {
  return globals.reduce<ResolvedGlobalAI>(
    (acc, reg) => reg.apply(acc),
    { ephemeralSystemPrompts: [], tools: [] },
  );
}

/** Global prompts in registration order, then the page's prompts. */
function mergePrompts(globals: GlobalAIRegistration[], page: PageAIRegistration | null): string[] {
  return [...resolveGlobalAI(globals).ephemeralSystemPrompts, ...(page?.prompts ?? [])];
}

/** Merge global and page tools; later tools (and page tools) override earlier ones by name. */
function mergeClientTools(globals: GlobalAIRegistration[], page: PageAIRegistration | null): RegisteredClientTool[] {
  const byName = new Map<string, RegisteredClientTool>();
  for (const tool of resolveGlobalAI(globals).tools) {
    byName.set(tool.name, tool);
  }
  for (const tool of page?.tools ?? []) {
    byName.set(tool.name, tool);
  }
  return Array.from(byName.values());
}

export const useAI = () => useContext(AIContext);

// AI provider props
interface AIProviderProps {
  children: ReactNode;
}


// AI provider component
export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const { message } = App.useApp();

  const { t } = useTranslation('ai');
  const [layout, setLayout] = useState<'classic' | 'sidebar' | 'float-sidebar'>('sidebar');
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeConversationKey, setActiveConversationKey] = useState<string | undefined>(undefined);
  const [pendingCall, setPendingCall] = useState<{ message: string; options: CallAIOptions }>();
  const [onCallAI, setOnCallAI] = useState<((message: string, options?: CallAIArgument) => void) | null>(null);

  // Page-level and global AI tool registrations.
  // Refs are the source of truth so handlers (e.g. ui_navigate) can read the
  // latest tools synchronously; state mirrors them to re-render consumers.
  const registrationSeq = useRef(0);
  const pageRegRef = useRef<PageAIRegistration | null>(null);
  const globalRegsRef = useRef<GlobalAIRegistration[]>([]);
  const [pageReg, setPageReg] = useState<PageAIRegistration | null>(null);
  const [globalRegs, setGlobalRegs] = useState<GlobalAIRegistration[]>([]);
  const pageReadyWaitersRef = useRef<Array<(ready: boolean) => void>>([]);

  const commitPageReg = useCallback((next: PageAIRegistration | null) => {
    pageRegRef.current = next;
    setPageReg(next);
  }, []);

  const commitGlobalRegs = useCallback((next: GlobalAIRegistration[]) => {
    globalRegsRef.current = next;
    setGlobalRegs(next);
  }, []);

  const resetPageAIContext = useCallback(() => {
    const current = pageRegRef.current;
    if (current && current.routeKey !== currentRouteKey()) {
      commitPageReg(null);
    }
  }, [commitPageReg]);

  const registerPageAI = useCallback((opts: PageAIOptions) => {
    const innerTools: RegisteredClientTool[] = opts.pageData ? [{
      name: 'ui_get_page_data',
      description: `This is a browser/client-side method. If the user explicitly instructs you to retrieve page data or if you believe it is necessary to retrieve page data, you can try invoking this method. ${opts.pageDataDescription || 'Returns a JSON snapshot of the current page data.'}`,
      parameters: { type: 'object', properties: {}, required: [] },
      handler: () => {
        if (isString(opts.pageData)) {
          return opts.pageData;
        }
        if (isFunction(opts.pageData)) {
          return JSON.stringify(opts.pageData());
        }
        return JSON.stringify(opts.pageData);
      },
    }] : [];
    const id = ++registrationSeq.current;
    const routeKey = currentRouteKey();
    const previous = pageRegRef.current;
    commitPageReg({
      id,
      routeKey,
      // Keep prompts from an earlier registration of the same page when this
      // call does not provide any (matches the previous incremental behavior).
      prompts: opts.ephemeralSystemPrompts ?? (previous?.routeKey === routeKey ? previous.prompts : []),
      tools: [...innerTools, ...(opts.tools ?? [])],
    });
    // Wake navigation tools waiting for the new page to publish its tools.
    const waiters = pageReadyWaitersRef.current;
    pageReadyWaitersRef.current = [];
    waiters.forEach((resolve) => resolve(true));
    return () => {
      // Only clear our own registration; a newer one may have replaced it.
      if (pageRegRef.current?.id === id) {
        commitPageReg(null);
      }
    };
  }, [commitPageReg]);

  const registerGlobalAI = useCallback((opts: GlobalAIOptionsInput) => {
    const id = ++registrationSeq.current;
    commitGlobalRegs([...globalRegsRef.current, toGlobalRegistration(id, opts)]);
    return () => {
      commitGlobalRegs(globalRegsRef.current.filter((reg) => reg.id !== id));
    };
  }, [commitGlobalRegs]);

  const getClientTools = useCallback(
    () => mergeClientTools(globalRegsRef.current, pageRegRef.current),
    [],
  );
  const getEphemeralSystemPrompts = useCallback(
    () => mergePrompts(globalRegsRef.current, pageRegRef.current),
    [],
  );

  const waitForPageAI = useCallback((timeoutMs = 3000) => {
    return new Promise<boolean>((resolve) => {
      let settled = false;
      const done = (ready: boolean) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(ready);
      };
      const timer = setTimeout(() => {
        pageReadyWaitersRef.current = pageReadyWaitersRef.current.filter((w) => w !== done);
        done(false);
      }, timeoutMs);
      pageReadyWaitersRef.current.push(done);
    });
  }, []);

  const clientTools = useMemo(() => mergeClientTools(globalRegs, pageReg), [globalRegs, pageReg]);
  const ephemeralSystemPrompts = useMemo(() => mergePrompts(globalRegs, pageReg), [globalRegs, pageReg]);

  useEffect(() => {
    const activeConversationKey = localStorage.getItem('activeConversationKey');
    if (activeConversationKey) {
      setActiveConversationKey(activeConversationKey);
    }
  }, []);

  const callAI = useCallback((message: string, options?: CallAIArgument) => {
    const normalized = normalizeCallAIOptions(options);
    setVisible(true);
    if (onCallAI) {
      onCallAI(message, normalized);
    } else {
      setPendingCall({ message, options: normalized });
    }
  }, [onCallAI, setVisible]);

  useEffect(() => {
    if (onCallAI && pendingCall) {
      onCallAI(pendingCall.message, pendingCall.options);
      setPendingCall(undefined);
    }
  }, [onCallAI, pendingCall]);

  const { loading: fetchConversationsLoading, runAsync: fetchConversations, data: conversations } = useRequest(async () => {
    const response = await api.ai.listChatSessions({ current: 1, page_size: 20, });
    return response.data;
  }, {
    ready: visible,
    onError: (error) => {
      message.error(t('chat.fetchConversationsFailed', { defaultValue: 'Failed to fetch conversations: {{errmsg}}', errmsg: error.message ?? error }));
    },
  });

  return (
    <AIContext.Provider
      value={{
        layout,
        setLayout: (layout: 'classic' | 'sidebar' | 'float-sidebar') => {
          setLayout(layout);
        },
        visible,
        setVisible: (visible: boolean) => {
          setVisible(visible);
        },
        callAI,
        onCallAI: useCallback((callback: (message: string, options?: CallAIArgument) => void) => {
          setOnCallAI(() => callback);
        }, [setOnCallAI]),
        loaded,
        setLoaded: (loaded: boolean) => {
          setLoaded(loaded);
        },
        fetchConversations,
        fetchConversationsLoading,
        conversations,
        activeConversationKey,
        setActiveConversationKey: (key: string) => {
          setActiveConversationKey(key);
          localStorage.setItem('activeConversationKey', key);
        },
        ephemeralSystemPrompts,
        clientTools,
        registerPageAI,
        resetPageAIContext,
        registerGlobalAI,
        getClientTools,
        getEphemeralSystemPrompts,
        waitForPageAI,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}; 