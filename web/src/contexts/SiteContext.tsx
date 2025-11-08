import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { message } from 'antd';
import api from '@/service/api';
import client from '@/service/client';
import { useRequest } from 'ahooks';
import { useAuth } from './AuthContext';

// Site context type
export interface SiteContextType {
  siteConfig: API.SiteConfig | null;
  enableMultiOrg: boolean;
  loading: boolean;
  fetchSiteConfig: () => Promise<API.SiteConfig | null>;
}

// Create site context
export const SiteContext = createContext<SiteContextType>({
  siteConfig: null,
  enableMultiOrg: false,
  loading: false,
  fetchSiteConfig: async () => null,
});

export const useSite = () => useContext(SiteContext);

// Site provider props
interface SiteProviderProps {
  children: ReactNode;
}


// Site provider component
export const SiteProvider: React.FC<SiteProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { data: siteConfig = null, loading, runAsync: fetchSiteConfig } = useRequest(async () => {
    return api.system.getSiteConfig();
  }, { manual: true });
  useEffect(() => {
    fetchSiteConfig();
  }, [user]);


  return (
    <SiteContext.Provider
      value={{
        siteConfig,
        loading,
        enableMultiOrg: siteConfig?.enable_multi_org ?? false,
        fetchSiteConfig,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}; 