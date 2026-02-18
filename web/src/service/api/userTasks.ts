// @ts-ignore
/* eslint-disable */
import { request } from "@/service/client";

/** Get user task list Get a list of tasks for the current user. GET /api/userTasks */
export async function listUserTasks(options?: { [key: string]: any }) {
  return request<API.ResponseArrayModelTask>("/api/userTasks", {
    method: "GET",
    ...(options || {}),
  });
}
