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
import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
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
   * Create a new anonymous session before sending. Defaults to true.
   * When false, the message is sent to the active session. A session is still
   * created when none is active.
   */
  newSession?: boolean;
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
   *   `{ messages, domains, newSession }` can also set skill domains and reuse
   *   the active session (`newSession` defaults to true).
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
  ephemeralSystemPrompts: string[];
  clientTools: RegisteredClientTool[];
  registerPageAI: (opts: PageAIOptions) => () => void;
  resetPageAIContext: () => void;
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
});

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

  // Page-level AI context
  const [ephemeralSystemPrompts, setEphemeralSystemPrompts] = useState<string[]>([]);
  const [clientTools, setClientTools] = useState<RegisteredClientTool[]>([]);

  const resetPageAIContext = useCallback(() => {
    setEphemeralSystemPrompts([]);
    setClientTools([]);
  }, []);

  const registerPageAI = useCallback((opts: PageAIOptions) => {
    if (opts.ephemeralSystemPrompts) {
      setEphemeralSystemPrompts(opts.ephemeralSystemPrompts);
    }
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
    setClientTools([...innerTools, ...(opts.tools ?? [])]);
    return () => {
      resetPageAIContext();
    };
  }, [resetPageAIContext]);

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
      }}
    >
      {children}
    </AIContext.Provider>
  );
}; 