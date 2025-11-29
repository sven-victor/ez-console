import { r as n } from "./client.js";
async function i(a, e) {
  return n(
    "/api/ai/chat/sessions",
    {
      method: "GET",
      params: {
        // current has a default value: 1
        current: "1",
        // page_size has a default value: 10
        page_size: "10",
        ...a
      },
      ...e || {}
    }
  );
}
async function r(a, e) {
  return n("/api/ai/chat/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: a,
    ...e || {}
  });
}
async function p(a, e) {
  const { sessionId: s, ...t } = a;
  return n(
    `/api/ai/chat/sessions/${s}`,
    {
      method: "GET",
      params: { ...t },
      ...e || {}
    }
  );
}
async function m(a, e) {
  const { sessionId: s, ...t } = a;
  return n(
    `/api/ai/chat/sessions/${s}`,
    {
      method: "DELETE",
      params: { ...t },
      ...e || {}
    }
  );
}
async function c(a, e) {
  return n("/api/ai/models", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // page_size has a default value: 10
      page_size: "10",
      ...a
    },
    ...e || {}
  });
}
async function d(a, e) {
  return n("/api/ai/models", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: a,
    ...e || {}
  });
}
async function u(a, e) {
  const { id: s, ...t } = a;
  return n(`/api/ai/models/${s}`, {
    method: "GET",
    params: { ...t },
    ...e || {}
  });
}
async function l(a, e, s) {
  const { id: t, ...o } = a;
  return n(`/api/ai/models/${t}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    params: { ...o },
    data: e,
    ...s || {}
  });
}
async function y(a, e) {
  const { id: s, ...t } = a;
  return n(`/api/ai/models/${s}`, {
    method: "DELETE",
    params: { ...t },
    ...e || {}
  });
}
async function h(a, e) {
  const { id: s, ...t } = a;
  return n(
    `/api/ai/models/${s}/set-default`,
    {
      method: "POST",
      params: { ...t },
      ...e || {}
    }
  );
}
async function f(a, e) {
  const { id: s, ...t } = a;
  return n(`/api/ai/models/${s}/test`, {
    method: "POST",
    params: { ...t },
    ...e || {}
  });
}
async function T(a) {
  return n(
    "/api/ai/models/types",
    {
      method: "GET",
      ...a || {}
    }
  );
}
async function P(a, e, s) {
  const { sessionId: t, ...o } = a;
  return n(`/api/ai/chat/sessions/${t}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    params: { ...o },
    data: e,
    ...s || {}
  });
}
const S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createAiModel: d,
  createChatSession: r,
  deleteAiModel: y,
  deleteChatSession: m,
  getAiModel: u,
  getAiTypeDefinitions: T,
  getChatSession: p,
  listAiModels: c,
  listChatSessions: i,
  setDefaultAiModel: h,
  streamChat: P,
  testAiModel: f,
  updateAiModel: l
}, Symbol.toStringTag, { value: "Module" }));
export {
  S as a
};
