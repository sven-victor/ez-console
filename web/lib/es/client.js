var l = Object.defineProperty;
var h = (e, t, r) => t in e ? l(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var u = (e, t, r) => h(e, typeof t != "symbol" ? t + "" : t, r);
import { g as p } from "./base.js";
import m from "axios";
const g = "/api", n = m.create({
  baseURL: g,
  timeout: 3e4,
  headers: {
    "Content-Type": "application/json"
  }
});
class d extends Error {
  constructor(r, a) {
    super(a);
    u(this, "code");
    this.code = r;
  }
}
n.interceptors.request.use(
  (e) => {
    if (!e.withoutAuth) {
      const r = localStorage.getItem("token");
      if (r && (e.headers = e.headers || {}, e.headers.Authorization = `Bearer ${r}`, !e.headers["X-Scope-OrgID"])) {
        const a = localStorage.getItem("orgID");
        a && (e.headers["X-Scope-OrgID"] = a);
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
    var r, a, o, i, s;
    ((r = e.response) == null ? void 0 : r.status) === 401 && window.location.pathname !== p("/login") && (localStorage.removeItem("token"), delete n.defaults.headers.common.Authorization, window.location.href = p("/login?redirect=" + encodeURIComponent(window.location.href)));
    let t = new d(((a = e.response) == null ? void 0 : a.status.toString()) || "500", e.message);
    if ((i = (o = e.response) == null ? void 0 : o.headers["content-type"]) != null && i.includes("application/json")) {
      const c = (s = e.response) == null ? void 0 : s.data;
      c && (c.err ? t = new d(c.code, c.err) : c.error && (t = new d(c.code, c.error)));
    }
    return Promise.reject(t);
  }
);
const I = async (e, t) => n.get(e, t), j = async (e, t, r) => n.post(e, t, r), L = async (e, t, r) => n.put(e, t, r), x = async (e, t) => n.delete(e, t);
async function f(e, t) {
  const { signal: r, ...a } = t || {}, o = await fetch(e, {
    method: a.method || "GET",
    headers: a.headers,
    body: a.body,
    signal: r
  });
  if (!o.ok || !o.body) {
    let i = o.statusText;
    if (o.body)
      try {
        const s = await o.json();
        i = `SSE connection failed: ${s.message || s.err}`;
      } catch {
        i = `SSE connection failed: ${o.statusText}`;
      }
    throw new Error(i);
  }
  if (o.status !== 200) {
    const i = await o.json();
    throw new Error(`SSE connection failed: ${i.message}`);
  }
  return o.body;
}
function y(e) {
  if (e)
    return typeof e.toJSON == "function" ? e.toJSON() : Object.fromEntries(
      Object.entries(e).map(([t, r]) => [t, String(r)])
    );
}
async function E(e, t) {
  const { requestType: r, signal: a, ...o } = t || {}, i = o.responseType;
  if (r === "sse") {
    const c = localStorage.getItem("orgID");
    return f(e, {
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...c ? { "X-Scope-OrgID": c } : {},
        ...y(o.headers)
      },
      method: o.method,
      body: JSON.stringify(o.data),
      signal: a
    });
  }
  const s = r === "form" ? {
    ...t == null ? void 0 : t.headers,
    "Content-Type": "multipart/form-data"
  } : t == null ? void 0 : t.headers;
  switch (i) {
    case "arraybuffer":
      return n.request({
        url: e,
        baseURL: "",
        ...o,
        headers: s
      });
    case "blob":
      return n.request({
        url: e,
        baseURL: "",
        ...o,
        headers: s
      });
    case "text":
      return n.request({
        url: e,
        baseURL: "",
        ...o,
        headers: s
      });
    default:
      return n.request({
        url: e,
        baseURL: "",
        ...o,
        headers: s
      });
  }
}
export {
  d as A,
  I as a,
  g as b,
  n as c,
  x as d,
  j as e,
  L as f,
  f as g,
  E as r
};
