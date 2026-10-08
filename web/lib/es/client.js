var S = Object.defineProperty;
var w = (s, e, t) => e in s ? S(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var a = (s, e, t) => w(s, typeof e != "symbol" ? e + "" : e, t);
import { g as p } from "./base.js";
import I from "axios";
import { isString as f } from "lodash-es";
import g from "i18next";
const _ = "/api";
class h extends Error {
  constructor(t, n) {
    super(n);
    a(this, "code");
    this.code = t;
  }
}
function b(s) {
  return I.create({
    baseURL: _,
    timeout: 3e4,
    headers: {
      "Content-Type": "application/json"
    },
    ...s
  });
}
function y(s) {
  s.instance.interceptors.request.use(
    (e) => {
      if (!e.withoutAuth) {
        const n = localStorage.getItem("token");
        if (n && (e.headers = e.headers || {}, e.headers.Authorization = `Bearer ${n}`, !e.headers["X-Scope-OrgID"])) {
          const r = localStorage.getItem("orgID");
          r && (e.headers["X-Scope-OrgID"] = r);
        }
      }
      const t = localStorage.getItem("i18nextLng");
      return t && (e.headers["Accept-Language"] = t), e;
    },
    (e) => Promise.reject(e)
  ), s.instance.interceptors.response.use(
    (e) => {
      if (e.config.rawResponse)
        return e;
      const t = e.headers["content-type"];
      if (t && (!f(t) || !t.includes("application/json")))
        return e;
      const n = e.data;
      return n && n.code !== void 0 ? n.code === "0" ? n.total !== void 0 && n.current !== void 0 && n.page_size !== void 0 ? {
        data: n.data,
        total: n.total,
        current: n.current,
        page_size: n.page_size
      } : n.data : Promise.reject(n || "Unknown error") : e.data;
    },
    (e) => {
      var r, i, o, d, m;
      if ((r = e.config) != null && r.skipErrorHandler)
        return Promise.reject(e);
      ((i = e.response) == null ? void 0 : i.status) === 401 && window.location.pathname !== p("/login") && (localStorage.removeItem("token"), delete s.defaults.headers.common.Authorization, window.location.href = p("/login?redirect=" + encodeURIComponent(window.location.href)));
      let t = new h(((o = e.response) == null ? void 0 : o.status.toString()) || "500", e.message);
      const n = (d = e.response) == null ? void 0 : d.headers["content-type"];
      if (n && f(n) && n.includes("application/json")) {
        const u = (m = e.response) == null ? void 0 : m.data;
        if (u)
          if (u.err) {
            let l = u.err || "Unknown error";
            u.code === "E4291" ? l = g.t("common:errors.rateLimit", { defaultValue: "Rate limit exceeded" }) : u.code === "E4292" && (l = g.t("common:errors.quotaExceeded", { defaultValue: "Quota exceeded" })), t = new h(u.code || "500", l);
          } else u.error && (t = new h(u.code || "500", u.error || "Unknown error"));
      }
      return Promise.reject(t);
    }
  );
}
class E {
  constructor(e, t = {}) {
    a(this, "_instance");
    a(this, "request", (e) => this._instance.request(e));
    a(this, "get", (e, t) => this._instance.get(e, t));
    a(this, "delete", (e, t) => this._instance.delete(e, t));
    a(this, "head", (e, t) => this._instance.head(e, t));
    a(this, "options", (e, t) => this._instance.options(e, t));
    a(this, "post", (e, t, n) => this._instance.post(e, t, n));
    a(this, "put", (e, t, n) => this._instance.put(e, t, n));
    a(this, "patch", (e, t, n) => this._instance.patch(e, t, n));
    a(this, "postForm", (e, t, n) => this._instance.postForm(e, t, n));
    a(this, "putForm", (e, t, n) => this._instance.putForm(e, t, n));
    a(this, "patchForm", (e, t, n) => this._instance.patchForm(e, t, n));
    this._instance = e ?? b(), t.applyInterceptors !== !1 && y(this);
  }
  /** Current underlying Axios instance. */
  get instance() {
    return this._instance;
  }
  /** Axios defaults of the current instance (live binding). */
  get defaults() {
    return this._instance.defaults;
  }
  /** Axios interceptors of the current instance (live binding). */
  get interceptors() {
    return this._instance.interceptors;
  }
  /**
   * Replace the underlying AxiosInstance.
   * Existing imports of `client` keep working because methods always delegate to `_instance`.
   */
  setInstance(e, t = {}) {
    this._instance = e, t.applyInterceptors !== !1 && y(this);
  }
}
const c = new E();
function A(s, e) {
  c.setInstance(s, e);
}
const k = async (s, e) => c.get(s, e), D = async (s, e, t) => c.post(s, e, t), P = async (s, e, t) => c.put(s, e, t), C = async (s, e) => c.delete(s, e);
async function x(s, e) {
  const { signal: t, ...n } = e || {}, r = await fetch(s, {
    method: n.method || "GET",
    headers: n.headers,
    body: n.body,
    signal: t
  });
  if (!r.ok || !r.body) {
    let i = r.statusText;
    if (r.body)
      try {
        const o = await r.json();
        i = `SSE connection failed: ${o.message || o.err}`;
      } catch (o) {
        console.log("SSE connection failed: ", o), i = `SSE connection failed: ${r.statusText}`;
      }
    throw new Error(i);
  }
  if (r.status !== 200) {
    const i = await r.json();
    throw new Error(`SSE connection failed: ${i.message}`);
  }
  return r.body;
}
function L(s) {
  if (s)
    return typeof s.toJSON == "function" ? s.toJSON() : Object.fromEntries(Object.entries(s).map(([e, t]) => [e, String(t)]));
}
async function O(s, e) {
  const { requestType: t, signal: n, ...r } = e || {}, i = r.responseType;
  if (t === "sse") {
    const d = localStorage.getItem("orgID");
    return x(s, {
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        "X-Base-Path": p(),
        "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...d ? { "X-Scope-OrgID": d } : {},
        ...L(r.headers)
      },
      method: r.method,
      body: JSON.stringify(r.data),
      signal: n
    });
  }
  const o = t === "form" ? {
    ...e == null ? void 0 : e.headers,
    "Content-Type": "multipart/form-data",
    "X-Base-Path": p()
  } : {
    ...e == null ? void 0 : e.headers,
    "X-Base-Path": p()
  };
  switch (i) {
    case "arraybuffer":
      return c.request({
        url: s,
        baseURL: "",
        ...r,
        headers: o
      });
    case "blob":
      return c.request({
        url: s,
        baseURL: "",
        ...r,
        headers: o
      });
    case "text":
      return c.request({
        url: s,
        baseURL: "",
        ...r,
        headers: o
      });
    default:
      return r.rawResponse ? c.request({
        url: s,
        baseURL: "",
        ...r,
        headers: o,
        rawResponse: !0
      }) : c.request({
        url: s,
        baseURL: "",
        ...r,
        headers: o
      });
  }
}
export {
  h as A,
  E as H,
  C as a,
  _ as b,
  k as c,
  D as d,
  P as e,
  c as f,
  x as g,
  O as r,
  A as s
};
