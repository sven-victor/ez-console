var u = Object.defineProperty;
var l = (t, e, r) => e in t ? u(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var c = (t, e, r) => l(t, typeof e != "symbol" ? e + "" : e, r);
import { g as d } from "./base.js";
import p from "axios";
const m = "/api", a = p.create({
  baseURL: m,
  timeout: 3e4,
  headers: {
    "Content-Type": "application/json"
  }
});
class i extends Error {
  constructor(r, n) {
    super(n);
    c(this, "code");
    this.code = r;
  }
}
a.interceptors.request.use(
  (t) => {
    if (!t.withoutAuth) {
      const r = localStorage.getItem("token");
      r && (t.headers = t.headers || {}, t.headers.Authorization = `Bearer ${r}`);
    }
    const e = localStorage.getItem("i18nextLng");
    return e && (t.headers["Accept-Language"] = e), t;
  },
  (t) => Promise.reject(t)
);
a.interceptors.response.use(
  (t) => {
    const e = t.data;
    return e && e.code !== void 0 ? e.code === "0" ? e.total !== void 0 && e.current !== void 0 && e.page_size !== void 0 ? {
      data: e.data,
      total: e.total,
      current: e.current,
      page_size: e.page_size
    } : e.data : Promise.reject(e || "Unknown error") : t.data;
  },
  (t) => {
    var n, o, s;
    ((n = t.response) == null ? void 0 : n.status) === 401 && window.location.pathname !== d("/login") && (localStorage.removeItem("token"), delete a.defaults.headers.common.Authorization, window.location.href = d("/login?redirect=" + encodeURIComponent(window.location.href)));
    const e = (o = t.response) == null ? void 0 : o.data;
    let r = new i(((s = t.response) == null ? void 0 : s.status.toString()) || "500", t.message);
    return console.log("errorResponse", e), e && (e.err ? r = new i(e.code, e.err) : e.error && (r = new i(e.code, e.error))), Promise.reject(r);
  }
);
const y = async (t, e) => a.get(t, e), E = async (t, e, r) => a.post(t, e, r), b = async (t, e, r) => a.put(t, e, r), j = async (t, e) => a.delete(t, e);
async function f(t, e) {
  const { signal: r, ...n } = e || {}, o = await fetch(t, {
    method: n.method || "GET",
    headers: n.headers,
    body: n.body,
    signal: r
  });
  if (console.log(o), !o.ok || !o.body) {
    if (o.body)
      try {
        const s = await o.json();
        throw new Error(`SSE connection failed: ${s.message}`);
      } catch {
        throw new Error(`SSE connection failed: ${o.statusText}`);
      }
    throw new Error(`SSE connection failed: ${o.statusText}`);
  }
  if (o.status !== 200) {
    const s = await o.json();
    throw new Error(`SSE connection failed: ${s.message}`);
  }
  return o.body;
}
function h(t) {
  if (t)
    return typeof t.toJSON == "function" ? t.toJSON() : Object.fromEntries(
      Object.entries(t).map(([e, r]) => [e, String(r)])
    );
}
async function x(t, e) {
  const { requestType: r, signal: n, ...o } = e || {};
  return r === "sse" ? f(t, {
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json",
      "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...h(o.headers)
    },
    method: o.method,
    body: JSON.stringify(o.data),
    signal: n
  }) : r === "form" ? a.request({
    url: t,
    baseURL: "",
    ...o,
    headers: {
      ...e == null ? void 0 : e.headers,
      "Content-Type": "multipart/form-data"
    }
  }) : a.request({
    url: t,
    baseURL: "",
    ...o
  });
}
export {
  i as A,
  j as a,
  m as b,
  a as c,
  E as d,
  y as e,
  b as f,
  x as r
};
