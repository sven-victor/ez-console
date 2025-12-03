import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';

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
}

// Create site context
export const AIContext = createContext<AIContextType>({
  layout: 'sidebar',
  setLayout: () => { },
  visible: false,
  setVisible: () => { },
  callAI: () => { },
  onCallAI: (_: (message: string, messages?: API.SimpleChatMessage[]) => void) => { },
  loaded: false,
  setLoaded: () => { },
});

export const useAI = () => useContext(AIContext);

// AI provider props
interface AIProviderProps {
  children: ReactNode;
}


// AI provider component
export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [layout, setLayout] = useState<'classic' | 'sidebar' | 'float-sidebar'>('sidebar');
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [cacheMessages, setCacheMessages] = useState<[string, API.SimpleChatMessage[] | undefined]>();
  const [onCallAI, setOnCallAI] = useState<((message: string, messages?: API.SimpleChatMessage[]) => void) | null>(null);
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
      }}
    >
      {children}
    </AIContext.Provider>
  );
}; 