import { getURL } from '@/utils';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const baseURL = '/api';

const client = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ApiError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

// Request interceptor
client.interceptors.request.use(
  (config) => {
    if (!config.withoutAuth) {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Ensure headers object exists
        config.headers = config.headers || {};
        // Set Authorization header
        config.headers.Authorization = `Bearer ${token}`;

        if (!config.headers['X-Scope-OrgID']) {
          // Add organization ID header if set
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
  (error) => {
    return Promise.reject(error);
  }
);


// Response interceptor
client.interceptors.response.use(
  (response) => {
    // Check for new format response
    const data = response.data;
    if (data && data.code !== undefined) {
      // If the request is successful (code is "0"), return the content of the data field
      if (data.code === "0") {
        // If it is paginated data, attach pagination information
        if (data.total !== undefined && data.current !== undefined && data.page_size !== undefined) {
          return {
            data: data.data,
            total: data.total,
            current: data.current,
            page_size: data.page_size
          };
        }
        // Return data content
        return data.data;
      }
      // If it is an error response (code is not "0"), throw an error
      else {
        return Promise.reject(data || "Unknown error");
      }
    }
    // Compatible with old format
    return response.data;
  },
  (error: AxiosError) => {
    // Handle 401 unauthorized error
    if (error.response?.status === 401 && window.location.pathname !== getURL('/login')) {
      // Clear token
      localStorage.removeItem('token');
      // Clear Authorization header
      delete client.defaults.headers.common['Authorization'];
      // Redirect to login page
      window.location.href = getURL('/login?redirect=' + encodeURIComponent(window.location.href));
    }

    // Extract error message
    const errorResponse = error.response?.data as any;
    let errorMessage = new ApiError(error.response?.status.toString() || '500', error.message);
    console.log("errorResponse", errorResponse)
    if (errorResponse) {
      if (errorResponse.err) {
        // New format error
        errorMessage = new ApiError(errorResponse.code, errorResponse.err);
      } else if (errorResponse.error) {
        // Old format error
        errorMessage = new ApiError(errorResponse.code, errorResponse.error);
      }
    }
    return Promise.reject(errorMessage);
  }
);


export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return client.get<T, T>(url, config);
};

export const apiPost = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return client.post<T, T>(url, data, config);
};

export const apiPut = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return client.put<T, T>(url, data, config);
};

export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return client.delete<T, T>(url, config);
};

type ListResult = { data: any; current: number; total: number; page_size: number };
type Result<T extends { data: any }> = T extends ListResult ? T : T["data"];

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
    let errorMessage = response.statusText
    if (response.body) {
      try {
        const data = await response.json() as API.ErrorResponse;
        errorMessage = `SSE connection failed: ${data.message || data.err}`
      } catch (error) {
        errorMessage = `SSE connection failed: ${response.statusText}`
      }
    }
    throw new Error(errorMessage);
  }

  if (response.status !== 200) {
    const data = await response.json() as API.ErrorResponse;
    throw new Error(`SSE connection failed: ${data.message}`);
  }
  return response.body;
}


export interface RequestConfig extends AxiosRequestConfig {
  requestType?: 'form'
}
export interface SSERequestConfig extends Omit<RequestConfig, 'requestType' | 'signal'> {
  requestType: 'sse';
  signal?: AbortSignal;
}

function normalizeHeaders(headers?: AxiosRequestConfig['headers']): Record<string, string> | undefined {
  if (!headers) return undefined;

  if (typeof (headers as any).toJSON === 'function') {
    return (headers as any).toJSON();
  }

  return Object.fromEntries(
    Object.entries(headers).map(([k, v]) => [k, String(v)])
  );
}


export function request<T extends any>(url: string, config: SSERequestConfig): Promise<ReadableStream<Uint8Array<ArrayBuffer>>>;
export function request<T extends { data: any; current?: number; total?: number; page_size?: number }>(url: string, config?: RequestConfig): Promise<Result<T>>;
export async function request<T extends { data: any; current?: number; total?: number; page_size?: number }>(
  url: string,
  config?: RequestConfig | SSERequestConfig
): Promise<Result<T> | ReadableStream<Uint8Array<ArrayBuffer>>> {
  const { requestType, signal, ...requestConfig } = config || {};
  if (requestType === 'sse') {
    const orgID = localStorage.getItem('orgID');
    return fetchSSE(url, {
      headers: {
        'Accept': 'text/event-stream',
        'Content-Type': 'application/json',
        'Accept-Language': localStorage.getItem('i18nextLng') || 'en-US',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        ...(orgID ? { 'X-Scope-OrgID': orgID } : {}),
        ...normalizeHeaders(requestConfig.headers),
      },
      method: requestConfig.method,
      body: JSON.stringify(requestConfig.data),
      signal: signal,
    });
  }

  if (requestType === 'form') {
    return client.request<T, Result<T>>({
      url,
      baseURL: "",
      ...requestConfig,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      }
    });
  }
  return client.request<T, Result<T>>({
    url,
    baseURL: "",
    ...requestConfig
  });
};

export default client; 