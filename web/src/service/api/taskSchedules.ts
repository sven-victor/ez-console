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
