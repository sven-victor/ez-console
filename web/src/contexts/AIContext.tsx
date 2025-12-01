import React, { createContext, useContext, ReactNode, useState } from 'react';

// AI context type
export interface AIContextType {
  layout: 'classic' | 'sidebar' | 'float-sidebar';
  setLayout: (layout: 'classic' | 'sidebar' | 'float-sidebar') => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

// Create site context
export const AIContext = createContext<AIContextType>({
  layout: 'sidebar',
  setLayout: () => { },
  visible: false,
  setVisible: () => { },
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
      }}
    >
      {children}
    </AIContext.Provider>
  );
}; 