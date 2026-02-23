import { r as e } from "./client.js";
async function n(a, s) {
  return e("/api/tasks", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // page_size has a default value: 10
      page_size: "10",
      ...a
    },
    ...s || {}
  });
}
async function o(a, s) {
  const { id: r, ...t } = a;
  return e(`/api/tasks/${r}`, {
    method: "GET",
    params: { ...t },
    ...s || {}
  });
}
async function c(a, s) {
  const { id: r, ...t } = a;
  return e(`/api/tasks/${r}`, {
    method: "DELETE",
    params: { ...t },
    ...s || {}
  });
}
async function m(a, s) {
  const { id: r, ...t } = a;
  return e(`/api/tasks/${r}/cancel`, {
    method: "POST",
    params: { ...t },
    ...s || {}
  });
}
async function i(a, s) {
  const { id: r, ...t } = a;
  return e(
    `/api/tasks/${r}/logs`,
    {
      method: "GET",
      params: { ...t },
      ...s || {}
    }
  );
}
async function p(a, s) {
  const { id: r, ...t } = a;
  return e(`/api/tasks/${r}/retry`, {
    method: "POST",
    params: { ...t },
    ...s || {}
  });
}
const y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelTask: m,
  deleteTask: c,
  getTask: o,
  getTaskLogs: i,
  listTasks: n,
  retryTask: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  y as t
};
