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
  tasks?: API.Task[];
  error?: Error;
  addTask: (task: API.Task) => void;
  tasksDropdownOpen: boolean
  setTasksDropdownOpen: (open: boolean) => void;
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
  error: undefined,
  tasks: undefined,
  addTask: () => { },
  tasksDropdownOpen: false,
  setTasksDropdownOpen: () => { },
});

export const useSite = () => useContext(SiteContext);

// Site provider props
interface SiteProviderProps {
  children: ReactNode;
}


// Site provider component
export const SiteProvider: React.FC<SiteProviderProps> = ({ children }) => {
  const { user } = useAuth();

  const { data: siteConfig = null, loading, runAsync: fetchSiteConfig, error } = useRequest(async () => {
    return api.system.getSiteConfig();
  }, {
    manual: true,
  });
  useEffect(() => {
    if (user !== undefined) {
      fetchSiteConfig();
    }
  }, [user]);

  const [currentOrgId, setCurrentOrgId] = useState<string | null>(localStorage.getItem('orgID'));

  useEffect(() => {
    if (currentOrgId) {
      localStorage.setItem('orgID', currentOrgId);
    } else {
      localStorage.removeItem('orgID');
    }
  }, [currentOrgId]);

  useEffect(() => {
    if (user) {
      let cacheOrgId = localStorage.getItem('orgID')

      if (cacheOrgId) {
        const organization = user?.organizations?.find(org => org.id === cacheOrgId);
        if (organization) {
          setCurrentOrgId(organization.id);

          return
        }
      }
      setCurrentOrgId(user?.organizations?.[0]?.id ?? null);
    }

  }, [siteConfig, user?.organizations]);

  const [tasksDropdownOpen, setTasksDropdownOpen] = useState<boolean>(false);

  const [tasks, setTasks] = useState<API.Task[]>([]);

  const { run: fetchTasks } = useRequest(async () => {
    return api.userTasks.listUserTasks({});
  }, {
    onSuccess: (res) => {
      setTasks(res);
    },
    refreshDeps: [user],
    pollingInterval: tasksDropdownOpen ? 3000 : 60000
  });

  useEffect(() => {
    if (tasksDropdownOpen) {
      fetchTasks();
    }
  }, [tasksDropdownOpen]);

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
        },
        clearCurrentOrgId: () => {
          setCurrentOrgId(null);
        },
        error,
        tasks,
        setTasksDropdownOpen: (open: boolean) => {
          setTasksDropdownOpen(open);
        },
        tasksDropdownOpen,
        addTask: (task: API.Task) => {
          setTasks((tasks) => [task, ...tasks]);
          setTasksDropdownOpen(true)
        }
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}; 