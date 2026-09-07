import { r as a } from "./client.js";
async function s(e, n) {
  return a(
    "/api/inbox/messages",
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...e
      },
      ...n || {}
    }
  );
}
async function t(e, n) {
  const { id: r, ...o } = e;
  return a(
    `/api/inbox/messages/${r}/read`,
    {
      method: "POST",
      params: { ...o },
      ...n || {}
    }
  );
}
async function i(e) {
  return a("/api/inbox/read-all", {
    method: "POST",
    ...e || {}
  });
}
async function u(e) {
  return a(
    "/api/inbox/unread-count",
    {
      method: "GET",
      ...e || {}
    }
  );
}
const c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getInboxUnreadCount: u,
  listInboxMessages: s,
  markAllInboxMessagesRead: i,
  markInboxMessageRead: t
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as i
};
