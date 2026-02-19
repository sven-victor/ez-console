import { r as e } from "./client.js";
async function n(a, r) {
  return e("/api/tasks", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // page_size has a default value: 10
      page_size: "10",
      ...a
    },
    ...r || {}
  });
}
async function o(a, r) {
  const { id: s, ...t } = a;
  return e(`/api/tasks/${s}`, {
    method: "GET",
    params: { ...t },
    ...r || {}
  });
}
async function c(a, r) {
  const { id: s, ...t } = a;
  return e(`/api/tasks/${s}`, {
    method: "DELETE",
    params: { ...t },
    ...r || {}
  });
}
async function m(a, r) {
  const { id: s, ...t } = a;
  return e(`/api/tasks/${s}/cancel`, {
    method: "POST",
    params: { ...t },
    ...r || {}
  });
}
async function i(a, r) {
  const { id: s, ...t } = a;
  return e(`/api/tasks/${s}/retry`, {
    method: "POST",
    params: { ...t },
    ...r || {}
  });
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelTask: m,
  deleteTask: c,
  getTask: o,
  listTasks: n,
  retryTask: i
}, Symbol.toStringTag, { value: "Module" }));
export {
  u as t
};
