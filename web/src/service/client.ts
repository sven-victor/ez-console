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

import { getURL } from '@/utils';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';
import { isString } from 'lodash-es';

export const baseURL = '/api';

export class ApiError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export interface SetInstanceOptions {
  /**
   * Whether to attach the default request/response interceptors to the new instance.
   * Defaults to true. Set false when the instance is already fully configured.
   */
  applyInterceptors?: boolean;
}

function createAxiosInstance(config?: CreateAxiosDefaults): AxiosInstance {
  return axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });
}

function applyDefaultInterceptors(http: HttpClient) {
  http.instance.interceptors.request.use(
    (config) => {
      if (!config.withoutAuth) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;

          if (!config.headers['X-Scope-OrgID']) {
            const orgID = localStorage.getItem('orgID');
            if (orgID) {
              config.headers['X-Scope-OrgID'] = orgID;
            }
          }
        }
      }
      const i18nextLng = localStorage.getItem('i18nextLng');
      if (i18nextLng) {
        config.headers['Accept-Language'] = i18nextLng;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  http.instance.interceptors.response.use(
    (response) => {
      if (response.config.rawResponse) {
        return response;
      }

      const contentType = response.headers['content-type'];

      if (contentType && (!isString(contentType) || !contentType.includes('application/json'))) {
        return response;
      }

      const data = response.data;
      if (data && data.code !== undefined) {
        if (data.code === '0') {
          if (data.total !== undefined && data.current !== undefined && data.page_size !== undefined) {
            return {
              data: data.data,
              total: data.total,
              current: data.current,
              page_size: data.page_size,
            };
          }
          return data.data;
        }
        return Promise.reject(data || 'Unknown error');
      }
      return response.data;
    },
    (error: AxiosError) => {
      if (error.config?.skipErrorHandler) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && window.location.pathname !== getURL('/login')) {
        localStorage.removeItem('token');
        delete http.defaults.headers.common['Authorization'];
        window.location.href = getURL('/login?redirect=' + encodeURIComponent(window.location.href));
      }

      let errorMessage = new ApiError(error.response?.status.toString() || '500', error.message);
      const contentType = error.response?.headers['content-type'];
      if (contentType && isString(contentType) && contentType.includes('application/json')) {
        const errorResponse = error.response?.data as { err?: string; error?: string; code?: string };
        if (errorResponse) {
          if (errorResponse.err) {
            errorMessage = new ApiError(errorResponse.code || '500', errorResponse.err || 'Unknown error');
          } else if (errorResponse.error) {
            errorMessage = new ApiError(errorResponse.code || '500', errorResponse.error || 'Unknown error');
          }
        }
      }
      return Promise.reject(errorMessage);
    }
  );
}

/**
 * Replaceable HTTP client wrapper around AxiosInstance.
 * Method calls always delegate to the current underlying instance.
 */
export class HttpClient {
  private _instance: AxiosInstance;

  constructor(instance?: AxiosInstance, options: SetInstanceOptions = {}) {
    this._instance = instance ?? createAxiosInstance();
    if (options.applyInterceptors !== false) {
      applyDefaultInterceptors(this);
    }
  }

  /** Current underlying Axios instance. */
  get instance(): AxiosInstance {
    return this._instance;
  }

  /** Axios defaults of the current instance (live binding). */
  get defaults(): AxiosInstance['defaults'] {
    return this._instance.defaults;
  }

  /** Axios interceptors of the current instance (live binding). */
  get interceptors(): AxiosInstance['interceptors'] {
    return this._instance.interceptors;
  }

  /**
   * Replace the underlying AxiosInstance.
   * Existing imports of `client` keep working because methods always delegate to `_instance`.
   */
  setInstance(instance: AxiosInstance, options: SetInstanceOptions = {}) {
    this._instance = instance;
    if (options.applyInterceptors !== false) {
      applyDefaultInterceptors(this);
    }
  }

  request: AxiosInstance['request'] = (config) => this._instance.request(config);
  get: AxiosInstance['get'] = (url, config) => this._instance.get(url, config);
  delete: AxiosInstance['delete'] = (url, config) => this._instance.delete(url, config);
  head: AxiosInstance['head'] = (url, config) => this._instance.head(url, config);
  options: AxiosInstance['options'] = (url, config) => this._instance.options(url, config);
  post: AxiosInstance['post'] = (url, data, config) => this._instance.post(url, data, config);
  put: AxiosInstance['put'] = (url, data, config) => this._instance.put(url, data, config);
  patch: AxiosInstance['patch'] = (url, data, config) => this._instance.patch(url, data, config);
  postForm: AxiosInstance['postForm'] = (url, data, config) => this._instance.postForm(url, data, config);
  putForm: AxiosInstance['putForm'] = (url, data, config) => this._instance.putForm(url, data, config);
  patchForm: AxiosInstance['patchForm'] = (url, data, config) => this._instance.patchForm(url, data, config);
}

/** Shared replaceable HTTP client used by api helpers and `request()`. */
export const client = new HttpClient();

/** Replace the shared client's underlying AxiosInstance. */
export function setClient(instance: AxiosInstance, options?: SetInstanceOptions) {
  client.setInstance(instance, options);
}

export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return client.get<T, T>(url, config);
};

export const apiPost = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return client.post<T, T>(url, data, config);
};

export const apiPut = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return client.put<T, T>(url, data, config);
};

export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return client.delete<T, T>(url, config);
};

type ListResult = { data: unknown; current: number; total: number; page_size: number };
type Result<T extends { data: unknown }> = T extends ListResult ? T : T['data'];

interface SSEConfig extends RequestInit {
  signal?: AbortSignal;
}

export async function fetchSSE(url: string, config?: SSEConfig): Promise<ReadableStream<Uint8Array<ArrayBuffer>>> {
  const { signal, ...fetchConfig } = config || {};

  const response = await fetch(url, {
    method: fetchConfig.method || 'GET',
    headers: fetchConfig.headers,
    body: fetchConfig.body,
    signal: signal,
  });

  if (!response.ok || !response.body) {
    let errorMessage = response.statusText;
    if (response.body) {
      try {
        const data = (await response.json()) as API.ErrorResponse;
        errorMessage = `SSE connection failed: ${data.message || data.err}`;
      } catch (error) {
        console.log('SSE connection failed: ', error);
        errorMessage = `SSE connection failed: ${response.statusText}`;
      }
    }
    throw new Error(errorMessage);
  }

  if (response.status !== 200) {
    const data = (await response.json()) as API.ErrorResponse;
    throw new Error(`SSE connection failed: ${data.message}`);
  }
  return response.body as ReadableStream<Uint8Array<ArrayBuffer>>;
}

export interface RequestConfig extends AxiosRequestConfig {
  requestType?: 'form';
}
export interface RawRequestConfig extends Omit<RequestConfig, 'rawResponse'> {
  rawResponse: true;
}
export interface TextRequestConfig extends Omit<RequestConfig, 'responseType'> {
  responseType: 'text';
}
export interface BlobRequestConfig extends Omit<RequestConfig, 'responseType'> {
  responseType: 'blob';
}
export interface ArrayBufferRequestConfig extends Omit<RequestConfig, 'responseType'> {
  responseType: 'arraybuffer';
}
export interface SSERequestConfig extends Omit<RequestConfig, 'requestType' | 'signal'> {
  requestType: 'sse';
  signal?: AbortSignal;
}

function normalizeHeaders(headers?: AxiosRequestConfig['headers']): Record<string, string> | undefined {
  if (!headers) return undefined;

  if (typeof (headers as { toJSON: () => Record<string, string> }).toJSON === 'function') {
    return (headers as { toJSON: () => Record<string, string> }).toJSON();
  }

  return Object.fromEntries(Object.entries(headers).map(([k, v]) => [k, String(v)]));
}

export function request(url: string, config: ArrayBufferRequestConfig): Promise<AxiosResponse<ArrayBuffer>>;
export function request(url: string, config: BlobRequestConfig): Promise<AxiosResponse<Blob>>;
export function request(url: string, config: TextRequestConfig): Promise<AxiosResponse<string>>;
export function request(url: string, config: SSERequestConfig): Promise<ReadableStream<Uint8Array<ArrayBuffer>>>;
export function request<T = unknown>(url: string, config: RawRequestConfig): Promise<AxiosResponse<T>>;
export function request<T extends { data: unknown; current?: number; total?: number; page_size?: number }>(
  url: string,
  config?: RequestConfig
): Promise<Result<T>>;
export async function request<T extends { data: unknown; current?: number; total?: number; page_size?: number }>(
  url: string,
  config?: RequestConfig | SSERequestConfig | ArrayBufferRequestConfig | RawRequestConfig
): Promise<Result<T> | ReadableStream<Uint8Array<ArrayBuffer>> | AxiosResponse<ArrayBuffer | Blob | string | unknown>> {
  const { requestType, signal, ...requestConfig } = config || {};
  const responseType = (requestConfig as AxiosRequestConfig).responseType;
  if (requestType === 'sse') {
    const orgID = localStorage.getItem('orgID');
    return fetchSSE(url, {
      headers: {
        Accept: 'text/event-stream',
        'Content-Type': 'application/json',
        'X-Base-Path': getURL(),
        'Accept-Language': localStorage.getItem('i18nextLng') || 'en-US',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        ...(orgID ? { 'X-Scope-OrgID': orgID } : {}),
        ...normalizeHeaders(requestConfig.headers),
      },
      method: requestConfig.method,
      body: JSON.stringify(requestConfig.data),
      signal: signal,
    });
  }

  const headers =
    requestType === 'form'
      ? {
          ...config?.headers,
          'Content-Type': 'multipart/form-data',
          'X-Base-Path': getURL(),
        }
      : {
          ...config?.headers,
          'X-Base-Path': getURL(),
        };
  switch (responseType) {
    case 'arraybuffer':
      return client.request<T, AxiosResponse<ArrayBuffer>>({
        url,
        baseURL: '',
        ...requestConfig,
        headers: headers,
      });
    case 'blob':
      return client.request<T, AxiosResponse<Blob>>({
        url,
        baseURL: '',
        ...requestConfig,
        headers: headers,
      });
    case 'text':
      return client.request<T, AxiosResponse<string>>({
        url,
        baseURL: '',
        ...requestConfig,
        headers: headers,
      });
    default:
      if (requestConfig.rawResponse) {
        return client.request<T, AxiosResponse<T>>({
          url,
          baseURL: '',
          ...requestConfig,
          headers: headers,
          rawResponse: true,
        });
      }
      return client.request<T, Result<T>>({
        url,
        baseURL: '',
        ...requestConfig,
        headers: headers,
      });
  }
}

export default client;
