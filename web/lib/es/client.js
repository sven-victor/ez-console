var h = Object.defineProperty;
var m = (e, t, r) => t in e ? h(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var p = (e, t, r) => m(e, typeof t != "symbol" ? t + "" : t, r);
import { g as d } from "./base.js";
import g from "axios";
import { isString as l } from "lodash-es";
const f = "/api", n = g.create({
  baseURL: f,
  timeout: 3e4,
  headers: {
    "Content-Type": "application/json"
  }
});
class u extends Error {
  constructor(r, a) {
    super(a);
    p(this, "code");
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
    if (t && (!l(t) || !t.includes("application/json")))
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
    var a, o, i, s;
    ((a = e.response) == null ? void 0 : a.status) === 401 && window.location.pathname !== d("/login") && (localStorage.removeItem("token"), delete n.defaults.headers.common.Authorization, window.location.href = d("/login?redirect=" + encodeURIComponent(window.location.href)));
    let t = new u(((o = e.response) == null ? void 0 : o.status.toString()) || "500", e.message);
    const r = (i = e.response) == null ? void 0 : i.headers["content-type"];
    if (r && l(r) && r.includes("application/json")) {
      const c = (s = e.response) == null ? void 0 : s.data;
      c && (c.err ? t = new u(c.code, c.err) : c.error && (t = new u(c.code, c.error)));
    }
    return Promise.reject(t);
  }
);
const L = async (e, t) => n.get(e, t), T = async (e, t, r) => n.post(e, t, r), x = async (e, t, r) => n.put(e, t, r), E = async (e, t) => n.delete(e, t);
async function y(e, t) {
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
function S(e) {
  if (e)
    return typeof e.toJSON == "function" ? e.toJSON() : Object.fromEntries(
      Object.entries(e).map(([t, r]) => [t, String(r)])
    );
}
async function A(e, t) {
  const { requestType: r, signal: a, ...o } = t || {}, i = o.responseType;
  if (r === "sse") {
    const c = localStorage.getItem("orgID");
    return y(e, {
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        "X-Base-Path": d(),
        "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...c ? { "X-Scope-OrgID": c } : {},
        ...S(o.headers)
      },
      method: o.method,
      body: JSON.stringify(o.data),
      signal: a
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
  u as A,
  E as a,
  f as b,
  n as c,
  T as d,
  L as e,
  x as f,
  y as g,
  A as r
};
