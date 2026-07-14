var h = Object.defineProperty;
var m = (e, t, r) => t in e ? h(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var p = (e, t, r) => m(e, typeof t != "symbol" ? t + "" : t, r);
import { g as d } from "./base.js";
import g from "axios";
import { isString as l } from "lodash-es";
const f = "/api", s = g.create({
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
s.interceptors.request.use(
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
s.interceptors.response.use(
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
    var a, o, i, n;
    ((a = e.response) == null ? void 0 : a.status) === 401 && window.location.pathname !== d("/login") && (localStorage.removeItem("token"), delete s.defaults.headers.common.Authorization, window.location.href = d("/login?redirect=" + encodeURIComponent(window.location.href)));
    let t = new u(((o = e.response) == null ? void 0 : o.status.toString()) || "500", e.message);
    const r = (i = e.response) == null ? void 0 : i.headers["content-type"];
    if (r && l(r) && r.includes("application/json")) {
      const c = (n = e.response) == null ? void 0 : n.data;
      c && (c.err ? t = new u(c.code || "500", c.err || "Unknown error") : c.error && (t = new u(c.code || "500", c.error || "Unknown error")));
    }
    return Promise.reject(t);
  }
);
const E = async (e, t) => s.get(e, t), L = async (e, t, r) => s.post(e, t, r), T = async (e, t, r) => s.put(e, t, r), U = async (e, t) => s.delete(e, t);
async function S(e, t) {
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
        const n = await o.json();
        i = `SSE connection failed: ${n.message || n.err}`;
      } catch (n) {
        console.log("SSE connection failed: ", n), i = `SSE connection failed: ${o.statusText}`;
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
async function x(e, t) {
  const { requestType: r, signal: a, ...o } = t || {}, i = o.responseType;
  if (r === "sse") {
    const c = localStorage.getItem("orgID");
    return S(e, {
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        "X-Base-Path": d(),
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
  const n = r === "form" ? {
    ...t == null ? void 0 : t.headers,
    "Content-Type": "multipart/form-data",
    "X-Base-Path": d()
  } : {
    ...t == null ? void 0 : t.headers,
    "X-Base-Path": d()
  };
  switch (i) {
    case "arraybuffer":
      return s.request({
        url: e,
        baseURL: "",
        ...o,
        headers: n
      });
    case "blob":
      return s.request({
        url: e,
        baseURL: "",
        ...o,
        headers: n
      });
    case "text":
      return s.request({
        url: e,
        baseURL: "",
        ...o,
        headers: n
      });
    default:
      return s.request({
        url: e,
        baseURL: "",
        ...o,
        headers: n
      });
  }
}
export {
  u as A,
  U as a,
  f as b,
  E as c,
  L as d,
  T as e,
  s as f,
  S as g,
  x as r
};
