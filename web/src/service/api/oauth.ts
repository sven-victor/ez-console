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

// @ts-ignore
/* eslint-disable */
import { request } from "@/service/client";

/** Handle the OAuth callback Handle the OAuth callback GET /api/oauth/callback */
export async function handleCallback(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.handleCallbackParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseServiceLoginResponse>("/api/oauth/callback", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get the OAuth login URL Get the OAuth login URL GET /api/oauth/login/${param0} */
export async function getLoginUrl(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLoginUrlParams,
  options?: { [key: string]: any }
) {
  const { provider: param0, ...queryParams } = params;
  return request<API.ResponseServiceOAuthLoginURLResponse>(
    `/api/oauth/login/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Get the list of available OAuth providers Get the list of available OAuth providers GET /api/oauth/providers */
export async function getProviders(options?: { [key: string]: any }) {
  return request<API.ResponseArrayAuthorizationapiOAuthProvider>(
    "/api/oauth/providers",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
