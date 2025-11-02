// @ts-ignore
/* eslint-disable */
import { request } from "@/service/client";

/** List toolsets List toolsets with pagination and search GET /api/toolsets */
export async function listToolSets(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listToolSetsParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelToolSet>("/api/toolsets", {
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

/** Create toolset Create a new toolset POST /api/toolsets */
export async function createToolSet(
  body: API.CreateToolSetRequest,
  options?: { [key: string]: any }
) {
  return request<API.ResponseModelToolSet>("/api/toolsets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** Get toolset Get a toolset by ID GET /api/toolsets/${param0} */
export async function getToolSet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getToolSetParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelToolSet>(`/api/toolsets/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update toolset Update a toolset PUT /api/toolsets/${param0} */
export async function updateToolSet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateToolSetParams,
  body: API.UpdateToolSetRequest,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelToolSet>(`/api/toolsets/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete toolset Delete a toolset DELETE /api/toolsets/${param0} */
export async function deleteToolSet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteToolSetParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(`/api/toolsets/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Test toolset Test a toolset connection POST /api/toolsets/${param0}/test */
export async function testToolSet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testToolSetParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(`/api/toolsets/${param0}/test`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get toolset tools Get tools from a toolset GET /api/toolsets/${param0}/tools */
export async function getToolSetTools(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getToolSetToolsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseArrayAiapiTool>(`/api/toolsets/${param0}/tools`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get toolset type definitions Get the type definitions for toolsets GET /api/toolsets/types */
export async function getToolSetTypeDefinitions(options?: {
  [key: string]: any;
}) {
  return request<API.ResponseArrayServiceToolSetTypeDefinition>(
    "/api/toolsets/types",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
