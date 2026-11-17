/**
 * Copyright 2026 Sven Victor
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

import React, { useMemo, useRef, useState } from 'react';
import { Widget, WidgetProps } from '@rjsf/utils/lib';
import { useRequest } from 'ahooks';
import api from '@/service/api';
import { request } from '@/service/client';
import { Select, Tag } from 'antd';
import axios from 'axios';

export interface DataSource {
  /** Cache control */
  cache: boolean;
  /** Cache TTL in seconds (0 = no expiration) */
  cache_ttl: number;
  /** DependsOn specifies field dependencies (field names that this field depends on)
When dependent fields change, this field's options should be reloaded */
  depends_on: string[];
  /** Query filters. Toolsets: {"type": "utils"}. Users: {"status": "normal"}. Overrides params. */
  filter: Record<string, unknown>;
  /** Response mapping fields (for API and other sources) */
  label_key: string;
  /** HTTP method (GET, POST, etc.) */
  method: string;
  /** Parameters for API requests (query params or request body). Filter overrides these. */
  params: Record<string, unknown>;
  /** Query parameter that receives the search text. Toolsets use "search"; users use "keywords". */
  search_key?: string;
  /** Type specifies the data source type */
  type: DataSourceType;
  /** API-specific fields (when Type = "api") */
  url: string;
  /** JSON key for option value */
  value_key: string;
}

export type DataSourceType = "static" | "api" | "toolsets" | "internal";

type RemoteOption = { label: React.ReactNode; value: string };

function rowsFromPayload(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) {
    return payload as Record<string, unknown>[];
  }
  if (payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)) {
    return (payload as { data: Record<string, unknown>[] }).data;
  }
  return [];
}

function toRemoteOption(
  item: Record<string, unknown>,
  source: Partial<DataSource>,
  fallbackLabel = "",
  fallbackValue = "",
  renderLabel?: (label: React.ReactNode, item: Record<string, unknown>) => React.ReactNode,
): RemoteOption {
  const rawLabel = source.label_key ? item[source.label_key] : undefined;
  const rawValue = source.value_key ? item[source.value_key] : undefined;
  const value = rawValue != null && String(rawValue) !== "" ? String(rawValue) : fallbackValue;
  const label = rawLabel != null && String(rawLabel) !== "" ? String(rawLabel) : (fallbackLabel || value);
  return { label: renderLabel ? renderLabel(label, item) : label, value };
}

function buildRemoteQuery(source: Partial<DataSource>, keyword: string): Record<string, unknown> {
  const searchKey = source.search_key || "search";
  return {
    current: 1,
    page_size: 20,
    ...(source.params || {}),
    ...(source.filter || {}),
    ...(keyword ? { [searchKey]: keyword } : {}),
  };
}

function selectedKeys(value: unknown, multiple: boolean): string[] {
  if (multiple) {
    const items = Array.isArray(value) ? value : value == null || value === "" ? [] : [value];
    return items.filter((item) => item != null && item !== "").map((item) => String(item));
  }
  if (value == null || value === "") {
    return [];
  }
  return [String(value)];
}

async function fetchRemoteOptions(source: Partial<DataSource>, query: Record<string, unknown>): Promise<RemoteOption[]> {
  switch (source.type) {
    case "toolsets": {
      const result = await api.system.listToolSets(query as API.listToolSetsParams);
      return (result.data ?? [])
        .map((item: API.ToolSet) => toRemoteOption(
          item as unknown as Record<string, unknown>,
          source,
          item.name,
          item.id,
          (label, item) => query.type ? label : <span><Tag color="blue" style={{ marginInlineEnd: 0 }}>{item.type as string}</Tag> {label}</span>
        ))
        .filter((option) => option.value !== "")

    }
    case "api": {
      if (!source.url) {
        return [];
      }
      const payload = source.url.startsWith("/")
        ? await request<{ data: unknown; current?: number; total?: number; page_size?: number }>(source.url, {
          method: source.method,
          params: query,
        })
        : (await axios(source.url, { params: query, method: source.method })).data;
      return rowsFromPayload(payload)
        .map((item) => toRemoteOption(item, source))
        .filter((option) => option.value !== "");
    }
    default:
      return [];
  }
}


export const RemoteSelectWidget: Widget = (props) => {
  const { schema, value, onChange, disabled, readonly, multiple: multipleProp, placeholder } = props;
  // const formValues = props.formValues as Record<string, unknown> || {};
  const source: Partial<DataSource> = schema?.["x-data-source"] || {};
  const multiple = Boolean(multipleProp) || schema?.type === "array";
  const [keyword, setKeyword] = useState("");
  const labelCacheRef = useRef<Map<string, React.ReactNode>>(new Map());
  const query = useMemo(() => buildRemoteQuery(source, keyword), [source, keyword]);
  const requestKey = `${source.type ?? ""}:${source.method ?? ""}:${source.url ?? ""}:${JSON.stringify(query)}`;
  const cacheMs = typeof source.cache_ttl === "number" ? source.cache_ttl * 1000 : 0;

  const { data: fetchedOptions, loading: loadingOptions } = useRequest(
    () => fetchRemoteOptions(source, query),
    {
      ready: source.type === "toolsets" || source.type === "api",
      refreshDeps: [requestKey],
      debounceWait: 300,
      cacheKey: requestKey,
      cacheTime: cacheMs,
      staleTime: cacheMs,
    },
  );

  const options = useMemo(() => {
    const merged = new Map<string, RemoteOption>();
    for (const option of fetchedOptions ?? []) {
      labelCacheRef.current.set(option.value, option.label || option.value);
      merged.set(option.value, option);
    }
    for (const key of selectedKeys(value, multiple)) {
      if (!merged.has(key)) {
        merged.set(key, { label: labelCacheRef.current.get(key) || key, value: key });
      }
    }
    return Array.from(merged.values());
  }, [fetchedOptions, value, multiple]);

  const selectValue = multiple ? selectedKeys(value, true) : selectedKeys(value, false)[0];

  return (
    <Select
      mode={multiple ? "multiple" : undefined}
      maxTagCount={multiple ? "responsive" : undefined}
      maxTagPlaceholder={(omitted) => `+${omitted.length}`}
      showSearch
      filterOption={false}
      onSearch={setKeyword}
      onOpenChange={(open) => {
        if (!open) {
          setKeyword("");
        }
      }}
      options={options}
      value={selectValue}
      loading={loadingOptions}
      disabled={disabled || readonly}
      placeholder={placeholder}
      allowClear
      onChange={(next) => onChange?.(multiple ? (Array.isArray(next) ? next : []) : next)}
      style={{ width: "100%" }}
    />
  );
}

export const getRemoteSelectWidget = (formValues: Record<string, unknown>): React.ComponentType<WidgetProps> => {
  return (props: WidgetProps) => <RemoteSelectWidget {...props} formValues={formValues} />
}

RemoteSelectWidget.displayName = 'RemoteSelectWidget';

export default RemoteSelectWidget;