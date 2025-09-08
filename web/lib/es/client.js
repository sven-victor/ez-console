var d = Object.defineProperty;
var p = (t, e, r) => e in t ? d(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var c = (t, e, r) => p(t, typeof e != "symbol" ? e + "" : e, r);
import { g as u } from "./base.js";
import l from "axios";
const m = "/api", s = l.create({
  baseURL: m,
  timeout: 3e4,
  headers: {
    "Content-Type": "application/json"
  }
});
class a extends Error {
  constructor(r, o) {
    super(o);
    c(this, "code");
    this.code = r;
  }
}
s.interceptors.request.use(
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
    var o, n, i;
    ((o = t.response) == null ? void 0 : o.status) === 401 && window.location.pathname !== u("/login") && (localStorage.removeItem("token"), delete s.defaults.headers.common.Authorization, window.location.href = u("/login?redirect=" + encodeURIComponent(window.location.href)));
    const e = (n = t.response) == null ? void 0 : n.data;
    let r = new a(((i = t.response) == null ? void 0 : i.status.toString()) || "500", t.message);
    return console.log("errorResponse", e), e && (e.err ? r = new a(e.code, e.err) : e.error && (r = new a(e.code, e.error))), Promise.reject(r);
  }
);
const f = async (t, e) => s.get(t, e), y = async (t, e, r) => s.post(t, e, r), L = async (t, e, r) => s.put(t, e, r), R = async (t, e) => s.delete(t, e), q = async (t, e) => {
  const { requestType: r, ...o } = e || {};
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
};
export {
  a as A,
  R as a,
  m as b,
  s as c,
  y as d,
  f as e,
  L as f,
  q as r
};
