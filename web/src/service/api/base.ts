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

/** Get file list Get file list GET /api/files */
export async function listFiles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listFilesParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelFile>("/api/files", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Upload file Upload file POST /api/files */
export async function uploadFile(
  body: {
    /** Access type */
    access?: string;
    /** File type */
    type?: string;
  },
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.ResponseArrayModelFile>("/api/files", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** Download file Download file GET /api/files/${param0} */
export async function downloadFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadFileParams,
  options?: { [key: string]: any }
) {
  const { fileKey: param0, ...queryParams } = params;
  return request<any>(`/api/files/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get statistics Get statistics GET /api/statistics */
export async function getStatistics(options?: { [key: string]: any }) {
  return request<API.ResponseServiceCharts>("/api/statistics", {
    method: "GET",
    ...(options || {}),
  });
}
