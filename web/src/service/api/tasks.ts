// @ts-ignore
/* eslint-disable */
import { request } from "@/service/client";

/** Get task list Get a list of tasks. Admin sees all; others see only their own. GET /api/tasks */
export async function listTasks(
  params: API.listTasksParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelTask>("/api/tasks", {
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

/** Get task by ID Get a task by ID. Admin or creator only. GET /api/tasks/${param0} */
export async function getTask(
  params: API.getTaskParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelTask>(`/api/tasks/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Delete task Delete a task. Admin or creator only. DELETE /api/tasks/${param0} */
export async function deleteTask(
  params: API.deleteTaskParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(`/api/tasks/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Cancel task Cancel a running or pending task POST /api/tasks/${param0}/cancel */
export async function cancelTask(
  params: API.cancelTaskParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(`/api/tasks/${param0}/cancel`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Retry task Retry a failed or cancelled task POST /api/tasks/${param0}/retry */
export async function retryTask(
  params: API.retryTaskParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(`/api/tasks/${param0}/retry`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}
