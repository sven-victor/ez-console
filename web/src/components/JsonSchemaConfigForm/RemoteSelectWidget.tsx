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

import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
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
  /** DependsOn specifies field dependencies (field names that this field depends on).
When dependent fields change, this field's options should be reloaded.
On a non-GET request those values are sent under body_key. */
  depends_on: string[];
  /** JSON object key that receives depends_on form values. Defaults to "config". */
  body_key?: string;
  /** Form fields that must be non-empty before options are fetched. */
  ready_on?: string[];
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

type RemoteOption = { label: React.ReactNode; value: string; title?: string };

export type RemoteRequest = {
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
  localFilter: boolean;
};

function isBlank(value: unknown): boolean {
  return value == null || (typeof value === "string" && value.trim() === "");
}

export function isRemoteSourceReady(formValues: Record<string, unknown>, readyOn: string[] | undefined): boolean {
  if (!readyOn || readyOn.length === 0) {
    return true;
  }
  return readyOn.every((key) => !isBlank(formValues[key]));
}

export function buildRemoteRequest(
  source: Partial<DataSource>,
  formValues: Record<string, unknown>,
  keyword: string,
): RemoteRequest {
  const method = (source.method || "GET").toUpperCase();
  const dependsOn = source.depends_on ?? [];
  const sendsBody = method !== "GET" && method !== "HEAD" && dependsOn.length > 0;
  if (!sendsBody) {
    return { params: buildRemoteQuery(source, keyword), localFilter: false };
  }
  const config: Record<string, unknown> = {};
  for (const key of dependsOn) {
    if (Object.prototype.hasOwnProperty.call(formValues, key)) {
      config[key] = formValues[key];
    }
  }
  return {
    data: {
      ...(source.params || {}),
      ...(source.filter || {}),
      [source.body_key || "config"]: config,
    },
    localFilter: true,
  };
}

function errorText(error: unknown): string {
  if (!error) {
    return "";
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && error && "err" in error) {
    return String((error as { err?: unknown }).err ?? "");
  }
  return String(error);
}

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
  const description = typeof item.description === "string" ? item.description : "";
  return { label: renderLabel ? renderLabel(label, item) : label, value, title: description || undefined };
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

async function fetchRemoteOptions(source: Partial<DataSource>, remoteRequest: RemoteRequest): Promise<RemoteOption[]> {
  switch (source.type) {
    case "toolsets": {
      const query = remoteRequest.params || {};
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
          params: remoteRequest.params,
          data: remoteRequest.data,
        })
        : (await axios(source.url, {
          params: remoteRequest.params,
          data: remoteRequest.data,
          method: source.method,
        })).data;
      return rowsFromPayload(payload)
        .map((item) => toRemoteOption(item, source))
        .filter((option) => option.value !== "");
    }
    default:
      return [];
  }
}


type FormValuesContext = {
  getFormValues?: () => Record<string, unknown>;
  subscribeFormValues?: (listener: () => void) => () => void;
};

const EMPTY_FORM_VALUES: Record<string, unknown> = {};

function getEmptyFormValues() {
  return EMPTY_FORM_VALUES;
}

function subscribeNoop() {
  return () => undefined;
}

type RemoteSelectProps = WidgetProps & { formValues?: Record<string, unknown> };

function useLiveFormValues(props: RemoteSelectProps): Record<string, unknown> {
  const context = props.registry?.formContext as FormValuesContext | undefined;
  const liveValues = useSyncExternalStore(
    context?.subscribeFormValues ?? subscribeNoop,
    context?.getFormValues ?? getEmptyFormValues,
    context?.getFormValues ?? getEmptyFormValues,
  );
  return props.formValues ?? liveValues;
}

export const RemoteSelectWidget: Widget = (props) => {
  const { schema, value, onChange, disabled, readonly, multiple: multipleProp, placeholder } = props;
  const formValues = useLiveFormValues(props as RemoteSelectProps);
  const source: Partial<DataSource> = schema?.["x-data-source"] || {};
  const multiple = Boolean(multipleProp) || schema?.type === "array";
  const [keyword, setKeyword] = useState("");
  const labelCacheRef = useRef<Map<string, React.ReactNode>>(new Map());
  const openRef = useRef(false);
  const remoteRequest = useMemo(
    () => buildRemoteRequest(source, formValues, keyword),
    [source, formValues, keyword],
  );
  const requestKey = `${source.type ?? ""}:${source.method ?? ""}:${source.url ?? ""}:${JSON.stringify(remoteRequest.data ?? remoteRequest.params)}`;
  const cacheMs = typeof source.cache_ttl === "number" ? source.cache_ttl * 1000 : 0;
  const freshFor = cacheMs > 0 ? cacheMs : -1;
  const ready = (source.type === "toolsets" || source.type === "api") && isRemoteSourceReady(formValues, source.ready_on);

  const { data: fetchedOptions, loading: loadingOptions, error, run } = useRequest(
    () => fetchRemoteOptions(source, remoteRequest),
    {
      manual: true,
      ready,
      debounceWait: 300,
      cacheKey: requestKey,
      cacheTime: freshFor,
      staleTime: freshFor,
    },
  );

  useEffect(() => {
    if (!openRef.current) {
      return;
    }
    run();
  }, [requestKey, ready, run]);

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

  const loadError = ready ? errorText(error) : "";

  return (
    <div>
      <Select
        mode={multiple ? "multiple" : undefined}
        maxTagCount={multiple ? "responsive" : undefined}
        maxTagPlaceholder={(omitted) => `+${omitted.length}`}
        showSearch
        filterOption={remoteRequest.localFilter ? (input, option) => {
          const query = input.trim().toLowerCase();
          if (!query) {
            return true;
          }
          const optionValue = String(option?.value ?? "").toLowerCase();
          const optionLabel = typeof option?.label === "string" ? option.label.toLowerCase() : "";
          const optionTitle = String(option?.title ?? "").toLowerCase();
          return optionValue.includes(query) || optionLabel.includes(query) || optionTitle.includes(query);
        } : false}
        onSearch={remoteRequest.localFilter ? undefined : setKeyword}
        onOpenChange={(open) => {
          openRef.current = open;
          if (!open) {
            setKeyword("");
            return;
          }
          if (!loadingOptions) {
            run();
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
      {loadError ? <div style={{ color: "#ff4d4f", marginTop: 4 }}>{loadError}</div> : null}
    </div>
  );
}


RemoteSelectWidget.displayName = 'RemoteSelectWidget';

export const ToolsetsSelectWidget: Widget = (props: WidgetProps) => {
  return <RemoteSelectWidget
    {...props}
    schema={{
      ...(props.schema || {}),
      'x-data-source': {
        ...(((props.schema as { 'x-data-source'?: Partial<DataSource> })?.['x-data-source']) || {}),
        type: 'toolsets'
      }
    }}
  />;
}
ToolsetsSelectWidget.displayName = 'ToolsetsSelectWidget';


export default RemoteSelectWidget;