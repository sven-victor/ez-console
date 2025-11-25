var l = Object.defineProperty;
var p = (t, e, r) => e in t ? l(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var d = (t, e, r) => p(t, typeof e != "symbol" ? e + "" : e, r);
import { g as u } from "./base.js";
import g from "axios";
const m = "/api", s = g.create({
  baseURL: m,
  timeout: 3e4,
  headers: {
    "Content-Type": "application/json"
  }
});
class c extends Error {
  constructor(r, a) {
    super(a);
    d(this, "code");
    this.code = r;
  }
}
s.interceptors.request.use(
  (t) => {
    if (!t.withoutAuth) {
      const r = localStorage.getItem("token");
      if (r && (t.headers = t.headers || {}, t.headers.Authorization = `Bearer ${r}`, !t.headers["X-Scope-OrgID"])) {
        const a = localStorage.getItem("orgID");
        a && (t.headers["X-Scope-OrgID"] = a);
      }
    }
    const e = localStorage.getItem("i18nextLng");
    return e && (t.headers["Accept-Language"] = e), t;
  },
  (t) => Promise.reject(t)
);
s.interceptors.response.use(
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
    var a, o, n;
    ((a = t.response) == null ? void 0 : a.status) === 401 && window.location.pathname !== u("/login") && (localStorage.removeItem("token"), delete s.defaults.headers.common.Authorization, window.location.href = u("/login?redirect=" + encodeURIComponent(window.location.href)));
    const e = (o = t.response) == null ? void 0 : o.data;
    let r = new c(((n = t.response) == null ? void 0 : n.status.toString()) || "500", t.message);
    return console.log("errorResponse", e), e && (e.err ? r = new c(e.code, e.err) : e.error && (r = new c(e.code, e.error))), Promise.reject(r);
  }
);
const I = async (t, e) => s.get(t, e), b = async (t, e, r) => s.post(t, e, r), E = async (t, e, r) => s.put(t, e, r), j = async (t, e) => s.delete(t, e);
async function f(t, e) {
  const { signal: r, ...a } = e || {}, o = await fetch(t, {
    method: a.method || "GET",
    headers: a.headers,
    body: a.body,
    signal: r
  });
  if (console.log(o), !o.ok || !o.body) {
    let n = o.statusText;
    if (o.body)
      try {
        const i = await o.json();
        n = `SSE connection failed: ${i.message || i.err}`;
      } catch {
        n = `SSE connection failed: ${o.statusText}`;
      }
    throw new Error(n);
  }
  if (o.status !== 200) {
    const n = await o.json();
    throw new Error(`SSE connection failed: ${n.message}`);
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
  const { requestType: r, signal: a, ...o } = e || {};
  if (r === "sse") {
    const n = localStorage.getItem("orgID");
    return f(t, {
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...n ? { "X-Scope-OrgID": n } : {},
        ...h(o.headers)
      },
      method: o.method,
      body: JSON.stringify(o.data),
      signal: a
    });
  }
  return r === "form" ? s.request({
    url: t,
    baseURL: "",
    ...o,
    headers: {
      ...e == null ? void 0 : e.headers,
      "Content-Type": "multipart/form-data"
    }
  }) : s.request({
    url: t,
    baseURL: "",
    ...o
  });
}
export {
  c as A,
  I as a,
  m as b,
  s as c,
  j as d,
  b as e,
  E as f,
  x as r
};
