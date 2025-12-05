import api from '@/service/api';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
      }}
    >
      {children}
    </AIContext.Provider>
  );
}; 