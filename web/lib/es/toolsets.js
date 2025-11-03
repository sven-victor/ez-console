import { r as s } from "./client.js";
async function r(t, e) {
  return s("/api/toolsets", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // page_size has a default value: 10
      page_size: "10",
      ...t
    },
    ...e || {}
  });
}
async function p(t, e) {
  return s("/api/toolsets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...e || {}
  });
}
async function i(t, e) {
  const { id: o, ...a } = t;
  return s(`/api/toolsets/${o}`, {
    method: "GET",
    params: { ...a },
    ...e || {}
  });
}
async function u(t, e, o) {
  const { id: a, ...n } = t;
  return s(`/api/toolsets/${a}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    params: { ...n },
    data: e,
    ...o || {}
  });
}
async function c(t, e) {
  const { id: o, ...a } = t;
  return s(`/api/toolsets/${o}`, {
    method: "DELETE",
    params: { ...a },
    ...e || {}
  });
}
async function l(t, e, o) {
  const { id: a, ...n } = t;
  return s(`/api/toolsets/${a}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    params: { ...n },
    data: e,
    ...o || {}
  });
}
async function m(t, e) {
  const { id: o, ...a } = t;
  return s(`/api/toolsets/${o}/test`, {
    method: "POST",
    params: { ...a },
    ...e || {}
  });
}
async function d(t, e) {
  const { id: o, ...a } = t;
  return s(`/api/toolsets/${o}/tools`, {
    method: "GET",
    params: { ...a },
    ...e || {}
  });
}
async function T(t) {
  return s(
    "/api/toolsets/types",
    {
      method: "GET",
      ...t || {}
    }
  );
}
const S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createToolSet: p,
  deleteToolSet: c,
  getToolSet: i,
  getToolSetTools: d,
  getToolSetTypeDefinitions: T,
  listToolSets: r,
  testToolSet: m,
  updateToolSet: u,
  updateToolSetStatus: l
}, Symbol.toStringTag, { value: "Module" }));
export {
  S as t
};
