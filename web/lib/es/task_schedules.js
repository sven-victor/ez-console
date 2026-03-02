import { r } from "./client.js";
async function o(e) {
  return r(
    "/api/task-schedules",
    {
      method: "GET",
      ...e || {}
    }
  );
}
async function c(e, a) {
  const { id: t, ...s } = e;
  return r(
    `/api/task-schedules/${t}/history`,
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...s
      },
      ...a || {}
    }
  );
}
async function u(e, a, t) {
  const { id: s, ...n } = e;
  return r(
    `/api/task-schedules/${s}/toggle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      params: { ...n },
      data: a,
      ...t || {}
    }
  );
}
async function i(e, a) {
  const { id: t, ...s } = e;
  return r(
    `/api/task-schedules/${t}/trigger`,
    {
      method: "POST",
      params: { ...s },
      ...a || {}
    }
  );
}
const l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTaskScheduleHistory: c,
  listTaskSchedules: o,
  toggleTaskSchedule: u,
  triggerTaskSchedule: i
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as t
};
