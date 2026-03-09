// @ts-ignore
/* eslint-disable */
import { request } from "@/service/client";

/** List scheduled tasks Returns defined cron jobs with next/last run and enabled status. GET /api/task-schedules */
export async function listTaskSchedules(options?: { [key: string]: any }) {
  return request<API.ResponseArrayServiceScheduledJobState>(
    "/api/task-schedules",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Get schedule execution history Returns tasks created by the given cron schedule. GET /api/task-schedules/${param0}/history */
export async function getTaskScheduleHistory(
  params: API.getTaskScheduleHistoryParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PaginationResponseModelTask>(
    `/api/task-schedules/${param0}/history`,
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}

/** Toggle scheduled task Enable or disable a cron job by ID. POST /api/task-schedules/${param0}/toggle */
export async function toggleTaskSchedule(
  params: API.toggleTaskScheduleParams,
  body: Record<string, any>,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseUtilMessageData>(
    `/api/task-schedules/${param0}/toggle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** Trigger scheduled task Creates and enqueues one task for the given schedule immediately. POST /api/task-schedules/${param0}/trigger */
export async function triggerTaskSchedule(
  params: API.triggerTaskScheduleParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelTask>(
    `/api/task-schedules/${param0}/trigger`,
    {
      method: "POST",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

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

/** Get task logs Get log entries for a task. Admin or creator only. GET /api/tasks/${param0}/logs */
export async function getTaskLogs(
  params: API.getTaskLogsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseArrayModelTaskLog>(`/api/tasks/${param0}/logs`, {
    method: "GET",
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

/** Get user task list Get a list of tasks for the current user. GET /api/user-tasks */
export async function listUserTasks(options?: { [key: string]: any }) {
  return request<API.ResponseArrayModelTask>("/api/user-tasks", {
    method: "GET",
    ...(options || {}),
  });
}
