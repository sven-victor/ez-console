import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import api from '@/service/api';
import { useRequest } from 'ahooks';
import { useAuth } from './AuthContext';

// Site context type
export interface SiteContextType {
  siteConfig: API.SiteConfig | null;
  enableMultiOrg: boolean;
  loading: boolean;
  fetchSiteConfig: () => Promise<API.SiteConfig | null>;
  currentOrgId: string | null;
  setCurrentOrgId: (orgId: string) => void;
  clearCurrentOrgId: () => void;
}

// Create site context
export const SiteContext = createContext<SiteContextType>({
  siteConfig: null,
  enableMultiOrg: false,
  loading: false,
  fetchSiteConfig: async () => null,
  currentOrgId: null,
  setCurrentOrgId: () => { },
  clearCurrentOrgId: () => { },
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
    if (user !== undefined) {
      fetchSiteConfig();
    }
  }, [user]);

  const [currentOrgId, setCurrentOrgId] = useState<string | null>(null);

  useEffect(() => {
    let cacheOrgId = localStorage.getItem('orgID')

    if (cacheOrgId) {
      const organization = user?.organizations?.find(org => org.id === cacheOrgId);
      if (organization) {
        setCurrentOrgId(organization.id);

        return
      }
    }
    setCurrentOrgId(user?.organizations?.[0]?.id ?? null);
  }, [siteConfig, user?.organizations]);

  return (
    <SiteContext.Provider
      value={{
        siteConfig,
        loading,
        enableMultiOrg: siteConfig?.enable_multi_org ?? false,
        fetchSiteConfig,
        currentOrgId,
        setCurrentOrgId: (orgId: string) => {
          setCurrentOrgId(orgId);
          localStorage.setItem('orgID', orgId);
        },
        clearCurrentOrgId: () => {
          setCurrentOrgId(null);
          localStorage.removeItem('orgID');
        },
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}; 