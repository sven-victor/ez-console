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
import { message } from 'antd';
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
export type PageDataGetter = () => any;

// Options for page-level AI context registration
export interface PageAIOptions {
  ephemeralSystemPrompts?: string[];
  tools?: RegisteredClientTool[];
  /** Register a getter for the current page data.  When provided, a built-in
   *  `ui_get_page_data` client tool is automatically created so the AI model
   *  can retrieve the page data on demand. */
  pageData?: any | PageDataGetter;
  /** Human-readable description of what `pageData` returns – becomes the
   *  tool's `description` field visible to the model. */
  pageDataDescription?: string;
}

// AI context type
export interface AIContextType {
  layout: 'classic' | 'sidebar' | 'float-sidebar';
  setLayout: (layout: 'classic' | 'sidebar' | 'float-sidebar') => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  callAI: (message: string, messages?: API.SimpleChatMessage[]) => void;
  onCallAI: (callback: (message: string, messages?: API.SimpleChatMessage[]) => void) => void;
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
  onCallAI: (_: (message: string, messages?: API.SimpleChatMessage[]) => void) => { },
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
  const { t } = useTranslation('ai');
  const [layout, setLayout] = useState<'classic' | 'sidebar' | 'float-sidebar'>('sidebar');
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeConversationKey, setActiveConversationKey] = useState<string | undefined>(undefined);
  const [cacheMessages, setCacheMessages] = useState<[string, API.SimpleChatMessage[] | undefined]>();
  const [onCallAI, setOnCallAI] = useState<((message: string, messages?: API.SimpleChatMessage[]) => void) | null>(null);

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

  const callAI = useCallback((message: string, messages?: API.SimpleChatMessage[]) => {
    setVisible(true);
    if (onCallAI) {
      onCallAI(message, messages);
    } else {
      setCacheMessages([message, messages]);
    }
  }, [onCallAI, setVisible]);

  useEffect(() => {
    if (onCallAI && cacheMessages) {
      onCallAI(cacheMessages[0], cacheMessages[1]);
      setCacheMessages(undefined);
    }
  }, [onCallAI, cacheMessages]);

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
        onCallAI: useCallback((callback: (message: string, messages?: API.SimpleChatMessage[]) => void) => {
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