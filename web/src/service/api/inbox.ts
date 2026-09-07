// @ts-ignore
/* eslint-disable */
import { request } from "@/service/client";

/** List inbox messages List in-app messages for the current user. GET /api/inbox/messages */
export async function listInboxMessages(
  params: API.listInboxMessagesParams,
  options?: { [key: string]: any }
) {
  return request<API.PaginationResponseModelInboxMessage>(
    "/api/inbox/messages",
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

/** Mark inbox message read Mark a single in-app message as read. POST /api/inbox/messages/${param0}/read */
export async function markInboxMessageRead(
  params: API.markInboxMessageReadParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseModelInboxMessage>(
    `/api/inbox/messages/${param0}/read`,
    {
      method: "POST",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** Mark all inbox messages read Mark every unread in-app message as read for the current user. POST /api/inbox/read-all */
export async function markAllInboxMessagesRead(options?: {
  [key: string]: any;
}) {
  return request<API.ResponseInboxapiInboxUnreadCount>("/api/inbox/read-all", {
    method: "POST",
    ...(options || {}),
  });
}

/** Inbox unread count Return the unread in-app message count for the current user. GET /api/inbox/unread-count */
export async function getInboxUnreadCount(options?: { [key: string]: any }) {
  return request<API.ResponseInboxapiInboxUnreadCount>(
    "/api/inbox/unread-count",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
