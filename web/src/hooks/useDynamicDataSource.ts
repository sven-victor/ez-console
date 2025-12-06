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

import { useState, useEffect, useMemo } from 'react';
import { apiGet } from '@/service/client';
import type { DataSource, ConfigFieldOptions } from '@/service/api/typing';
import api from '@/service/api';

interface DynamicDataSourceResult {
  options: ConfigFieldOptions[];
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

const getCacheKey = (dataSource: DataSource, dependentValues?: Record<string, any>): string => {
  return JSON.stringify({ dataSource, dependentValues });
};

const getCachedData = (key: string, ttl?: number): any | null => {
  const cached = cache.get(key);
  if (!cached) return null;

  // Check if cache is still valid
  if (ttl && ttl > 0) {
    const now = Date.now();
    if (now - cached.timestamp > ttl * 1000) {
      cache.delete(key);
      return null;
    }
  }

  return cached.data;
};

const setCachedData = (key: string, data: any): void => {
  cache.set(key, { data, timestamp: Date.now() });
};

/**
 * Custom hook to load options from dynamic data sources
 * @param dataSource - The data source configuration
 * @param staticOptions - Static options to use when data source is not configured
 * @param dependentValues - Values from fields this field depends on
 * @returns Options, loading state, error, and refresh function
 */
export const useDynamicDataSource = (
  dataSource?: DataSource,
  staticOptions?: ConfigFieldOptions[],
  dependentValues?: Record<string, any>
): DynamicDataSourceResult => {
  const [options, setOptions] = useState<ConfigFieldOptions[]>(staticOptions || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  // Check if we should load data based on dependencies
  const shouldLoad = useMemo(() => {
    if (!dataSource) return false;
    if (dataSource.type === 'static') return false;

    // If there are dependencies, check if all dependent values are provided
    if (dataSource.depends_on && dataSource.depends_on.length > 0) {
      return dataSource.depends_on.every(
        (dep) => dependentValues && dependentValues[dep] !== undefined && dependentValues[dep] !== null
      );
    }

    return true;
  }, [dataSource, dependentValues]);

  useEffect(() => {
    if (!shouldLoad) {
      setOptions(staticOptions || []);
      return;
    }

    const loadOptions = async () => {
      try {
        setLoading(true);
        setError(null);

        const cacheKey = getCacheKey(dataSource!, dependentValues);

        // Check cache first
        if (dataSource!.cache) {
          const cachedData = getCachedData(cacheKey, dataSource!.cache_ttl);
          if (cachedData) {
            setOptions(cachedData);
            setLoading(false);
            return;
          }
        }

        let loadedOptions: ConfigFieldOptions[] = [];

        switch (dataSource!.type) {
          case 'api': {
            // Fetch from API
            const url = dataSource!.url || '';
            const method = dataSource!.method || 'GET';

            // Build params with dependent values
            const params = {
              ...dependentValues,
              ...dataSource!.params,
            };

            let response: any;
            if (method.toUpperCase() === 'GET') {
              response = await apiGet(url, { params });
            } else {
              response = await apiGet(url, { params });
            }

            // Transform response to options
            const data = Array.isArray(response) ? response : (response.data || []);
            const labelKey = dataSource!.label_key || 'label';
            const valueKey = dataSource!.value_key || 'value';

            loadedOptions = data.map((item: any) => ({
              label: item[labelKey] || item.name || item.id,
              value: item[valueKey] || item.id,
            }));
            break;
          }

          case 'toolsets': {
            // Fetch from toolsets API
            const response = await api.system.listToolSets({
              current: 1,
              page_size: 1000,
              ...dataSource!.params,
            });

            let toolsets = response.data || [];

            // Apply filters
            if (dataSource!.filter) {
              toolsets = toolsets.filter((toolset: any) => {
                return Object.entries(dataSource!.filter!).every(([key, value]) => {
                  return toolset[key] === value;
                });
              });
            }

            const labelKey = dataSource!.label_key || 'name';
            const valueKey = dataSource!.value_key || 'id';

            loadedOptions = toolsets.map((toolset: any) => ({
              label: toolset[labelKey] || toolset.name,
              value: toolset[valueKey] || toolset.id,
            }));
            break;
          }

          case 'internal': {
            // For internal data sources, you can implement custom logic here
            // For example, fetch from other system endpoints
            console.warn('Internal data source not yet implemented');
            loadedOptions = [];
            break;
          }

          default:
            loadedOptions = staticOptions || [];
        }

        // Cache the result if caching is enabled
        if (dataSource!.cache) {
          setCachedData(cacheKey, loadedOptions);
        }

        setOptions(loadedOptions);
      } catch (err) {
        console.error('Failed to load options from data source:', err);
        setError(err as Error);
        setOptions(staticOptions || []);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [dataSource, staticOptions, dependentValues, shouldLoad, refreshKey]);

  return { options, loading, error, refresh };
};

