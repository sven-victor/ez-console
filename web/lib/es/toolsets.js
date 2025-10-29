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
async function i(t, e) {
  return s("/api/toolsets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: t,
    ...e || {}
  });
}
async function p(t, e) {
  const { id: o, ...a } = t;
  return s(`/api/toolsets/${o}`, {
    method: "GET",
    params: { ...a },
    ...e || {}
  });
}
async function c(t, e, o) {
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
async function l(t, e) {
  const { id: o, ...a } = t;
  return s(`/api/toolsets/${o}`, {
    method: "DELETE",
    params: { ...a },
    ...e || {}
  });
}
async function u(t, e) {
  const { id: o, ...a } = t;
  return s(`/api/toolsets/${o}/test`, {
    method: "POST",
    params: { ...a },
    ...e || {}
  });
}
async function m(t) {
  return s(
    "/api/toolsets/types",
    {
      method: "GET",
      ...t || {}
    }
  );
}
const T = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createToolSet: i,
  deleteToolSet: l,
  getToolSet: p,
  getToolSetTypeDefinitions: m,
  listToolSets: r,
  testToolSet: u,
  updateToolSet: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  T as t
};
