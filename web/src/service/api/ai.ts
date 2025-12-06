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

/** List chat sessions List chat sessions for the current user with pagination GET /api/ai/chat/sessions */
export async function listChatSessions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listChatSessionsParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelAIChatSession>(
    "/api/ai/chat/sessions",
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Create chat session Create a new chat session POST /api/ai/chat/sessions */
export async function createChatSession(
  body: API.CreateChatSessionRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelAIChatSession>("/api/ai/chat/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get chat session Get a chat session by ID GET /api/ai/chat/sessions/${param0} */
export async function getChatSession(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatSessionParams,
  options?: { [key: string]: any }
) {
  const { sessionId: param0, ...queryParams } = params;
  return request<API.ResponseModelAIChatSession>(
    `/api/ai/chat/sessions/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Delete chat session Delete a chat session and all its messages DELETE /api/ai/chat/sessions/${param0} */
export async function deleteChatSession(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteChatSessionParams,
  options?: { [key: string]: any }
) {
  const { sessionId: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/ai/chat/sessions/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Generate or update chat session title Generate a title for a chat session based on conversation content, or update with provided title PUT /api/ai/chat/sessions/${param0}/title */
export async function generateChatSessionTitle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.generateChatSessionTitleParams,
  body: API.GenerateChatSessionTitleRequest,
  options?: { [key: string]: any }
) {
  const { sessionId: param0, ...queryParams } = params;
  return request<API.ResponseModelAIChatSession>(
    `/api/ai/chat/sessions/${param0}/title`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** List AI models List AI models with pagination and search GET /api/ai/models */
export async function listAiModels(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAIModelsParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelAIModel>("/api/ai/models", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // page_size has a default value: 10
      page_size: "10",
      ...params,
    },
    ...(options || {}),
  });
}

/** Create AI model Create a new AI model POST /api/ai/models */
export async function createAiModel(
  body: API.CreateAIModelRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelAIModel>("/api/ai/models", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get AI model Get an AI model by ID GET /api/ai/models/${param0} */
export async function getAiModel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAIModelParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelAIModel>(`/api/ai/models/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update AI model Update an AI model PUT /api/ai/models/${param0} */
export async function updateAiModel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAIModelParams,
  body: API.UpdateAIModelRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelAIModel>(`/api/ai/models/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete AI model Delete an AI model DELETE /api/ai/models/${param0} */
export async function deleteAiModel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAIModelParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(`/api/ai/models/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Set default AI model Set an AI model as default POST /api/ai/models/${param0}/set-default */
export async function setDefaultAiModel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setDefaultAIModelParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/ai/models/${param0}/set-default`,
    {
      method: "POST",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Test AI model Test an AI model connection POST /api/ai/models/${param0}/test */
export async function testAiModel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testAIModelParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(`/api/ai/models/${param0}/test`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get AI type definitions Get the type definitions for AI providers GET /api/ai/models/types */
export async function getAiTypeDefinitions(options?: { [key: string]: any }) {
  return request<API.ResponseArrayServiceAITypeDefinition>(
    "/api/ai/models/types",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

import { type SSERequestConfig } from '@/service/client'
/** Stream chat Stream chat responses using Server-Sent Events POST /api/ai/chat/sessions/${param0} */
export async function streamChat(
  params: {
    /** Chat session ID */
    sessionId: string;
  },
  body: API.SendMessageRequest,
  options: SSERequestConfig
) {
  const { sessionId: param0, ...queryParams } = params;
  return request<ReadableStream<Uint8Array<ArrayBuffer>>>(`/api/ai/chat/sessions/${param0}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  });
}
  