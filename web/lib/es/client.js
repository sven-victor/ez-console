var l = Object.defineProperty;
var h = (e, t, r) => t in e ? l(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var p = (e, t, r) => h(e, typeof t != "symbol" ? t + "" : t, r);
import { g as d } from "./base.js";
import m from "axios";
const g = "/api", n = m.create({
  baseURL: g,
  timeout: 3e4,
  headers: {
    "Content-Type": "application/json"
  }
});
class u extends Error {
  constructor(r, o) {
    super(o);
    p(this, "code");
    this.code = r;
  }
}
n.interceptors.request.use(
  (e) => {
    if (!e.withoutAuth) {
      const r = localStorage.getItem("token");
      if (r && (e.headers = e.headers || {}, e.headers.Authorization = `Bearer ${r}`, !e.headers["X-Scope-OrgID"])) {
        const o = localStorage.getItem("orgID");
        o && (e.headers["X-Scope-OrgID"] = o);
      }
    }
    const t = localStorage.getItem("i18nextLng");
    return t && (e.headers["Accept-Language"] = t), e;
  },
  (e) => Promise.reject(e)
);
n.interceptors.response.use(
  (e) => {
    const t = e.headers["content-type"];
    if (t && !t.includes("application/json"))
      return e;
    const r = e.data;
    return r && r.code !== void 0 ? r.code === "0" ? r.total !== void 0 && r.current !== void 0 && r.page_size !== void 0 ? {
      data: r.data,
      total: r.total,
      current: r.current,
      page_size: r.page_size
    } : r.data : Promise.reject(r || "Unknown error") : e.data;
  },
  (e) => {
    var r, o, a, i, s;
    ((r = e.response) == null ? void 0 : r.status) === 401 && window.location.pathname !== d("/login") && (localStorage.removeItem("token"), delete n.defaults.headers.common.Authorization, window.location.href = d("/login?redirect=" + encodeURIComponent(window.location.href)));
    let t = new u(((o = e.response) == null ? void 0 : o.status.toString()) || "500", e.message);
    if ((i = (a = e.response) == null ? void 0 : a.headers["content-type"]) != null && i.includes("application/json")) {
      const c = (s = e.response) == null ? void 0 : s.data;
      c && (c.err ? t = new u(c.code, c.err) : c.error && (t = new u(c.code, c.error)));
    }
    return Promise.reject(t);
  }
);
const I = async (e, t) => n.get(e, t), j = async (e, t, r) => n.post(e, t, r), L = async (e, t, r) => n.put(e, t, r), x = async (e, t) => n.delete(e, t);
async function f(e, t) {
  const { signal: r, ...o } = t || {}, a = await fetch(e, {
    method: o.method || "GET",
    headers: o.headers,
    body: o.body,
    signal: r
  });
  if (!a.ok || !a.body) {
    let i = a.statusText;
    if (a.body)
      try {
        const s = await a.json();
        i = `SSE connection failed: ${s.message || s.err}`;
      } catch {
        i = `SSE connection failed: ${a.statusText}`;
      }
    throw new Error(i);
  }
  if (a.status !== 200) {
    const i = await a.json();
    throw new Error(`SSE connection failed: ${i.message}`);
  }
  return a.body;
}
function y(e) {
  if (e)
    return typeof e.toJSON == "function" ? e.toJSON() : Object.fromEntries(
      Object.entries(e).map(([t, r]) => [t, String(r)])
    );
}
async function E(e, t) {
  const { requestType: r, signal: o, ...a } = t || {}, i = a.responseType;
  if (r === "sse") {
    const c = localStorage.getItem("orgID");
    return f(e, {
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        "X-Base-Path": d(),
        "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...c ? { "X-Scope-OrgID": c } : {},
        ...y(a.headers)
      },
      method: a.method,
      body: JSON.stringify(a.data),
      signal: o
    });
  }
  const s = r === "form" ? {
    ...t == null ? void 0 : t.headers,
    "Content-Type": "multipart/form-data",
    "X-Base-Path": d()
  } : {
    ...t == null ? void 0 : t.headers,
    "X-Base-Path": d()
  };
  switch (i) {
    case "arraybuffer":
      return n.request({
        url: e,
        baseURL: "",
        ...a,
        headers: s
      });
    case "blob":
      return n.request({
        url: e,
        baseURL: "",
        ...a,
        headers: s
      });
    case "text":
      return n.request({
        url: e,
        baseURL: "",
        ...a,
        headers: s
      });
    default:
      return n.request({
        url: e,
        baseURL: "",
        ...a,
        headers: s
      });
  }
}
export {
  u as A,
  x as a,
  g as b,
  n as c,
  j as d,
  I as e,
  L as f,
  f as g,
  E as r
};
