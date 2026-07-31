var g = Object.defineProperty;
var y = (s, e, t) => e in s ? g(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var a = (s, e, t) => y(s, typeof e != "symbol" ? e + "" : e, t);
import { g as d } from "./base.js";
import S from "axios";
import { isString as f } from "lodash-es";
const w = "/api";
class h extends Error {
  constructor(t, n) {
    super(n);
    a(this, "code");
    this.code = t;
  }
}
function I(s) {
  return S.create({
    baseURL: w,
    timeout: 3e4,
    headers: {
      "Content-Type": "application/json"
    },
    ...s
  });
}
function m(s) {
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
      var r, i, o, u, l;
      if ((r = e.config) != null && r.skipErrorHandler)
        return Promise.reject(e);
      ((i = e.response) == null ? void 0 : i.status) === 401 && window.location.pathname !== d("/login") && (localStorage.removeItem("token"), delete s.defaults.headers.common.Authorization, window.location.href = d("/login?redirect=" + encodeURIComponent(window.location.href)));
      let t = new h(((o = e.response) == null ? void 0 : o.status.toString()) || "500", e.message);
      const n = (u = e.response) == null ? void 0 : u.headers["content-type"];
      if (n && f(n) && n.includes("application/json")) {
        const p = (l = e.response) == null ? void 0 : l.data;
        p && (p.err ? t = new h(p.code || "500", p.err || "Unknown error") : p.error && (t = new h(p.code || "500", p.error || "Unknown error")));
      }
      return Promise.reject(t);
    }
  );
}
class _ {
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
    this._instance = e ?? I(), t.applyInterceptors !== !1 && m(this);
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
    this._instance = e, t.applyInterceptors !== !1 && m(this);
  }
}
const c = new _();
function q(s, e) {
  c.setInstance(s, e);
}
const x = async (s, e) => c.get(s, e), T = async (s, e, t) => c.post(s, e, t), A = async (s, e, t) => c.put(s, e, t), k = async (s, e) => c.delete(s, e);
async function b(s, e) {
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
function j(s) {
  if (s)
    return typeof s.toJSON == "function" ? s.toJSON() : Object.fromEntries(Object.entries(s).map(([e, t]) => [e, String(t)]));
}
async function D(s, e) {
  const { requestType: t, signal: n, ...r } = e || {}, i = r.responseType;
  if (t === "sse") {
    const u = localStorage.getItem("orgID");
    return b(s, {
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        "X-Base-Path": d(),
        "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...u ? { "X-Scope-OrgID": u } : {},
        ...j(r.headers)
      },
      method: r.method,
      body: JSON.stringify(r.data),
      signal: n
    });
  }
  const o = t === "form" ? {
    ...e == null ? void 0 : e.headers,
    "Content-Type": "multipart/form-data",
    "X-Base-Path": d()
  } : {
    ...e == null ? void 0 : e.headers,
    "X-Base-Path": d()
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
  _ as H,
  k as a,
  w as b,
  x as c,
  T as d,
  A as e,
  c as f,
  b as g,
  D as r,
  q as s
};
