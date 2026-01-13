// @ts-ignore
/* eslint-disable */
import { request } from "@/service/client";

/** Handle the OAuth callback Handle the OAuth callback POST /api/oauth/callback */
export async function handleCallback(
  body: API.OAuthCallbackRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseServiceLoginResponse>("/api/oauth/callback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get the OAuth login URL Get the OAuth login URL GET /api/oauth/login/${param0} */
export async function getLoginUrl(
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
