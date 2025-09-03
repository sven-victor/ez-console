var u = Object.defineProperty;
var d = (t, e, r) => e in t ? u(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var c = (t, e, r) => d(t, typeof e != "symbol" ? e + "" : e, r);
import { b as p } from "./vendor.js";
const l = "/api", s = p.create({
  baseURL: l,
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
    ((o = t.response) == null ? void 0 : o.status) === 401 && window.location.pathname !== "/console/login" && (localStorage.removeItem("token"), delete s.defaults.headers.common.Authorization, window.location.href = "/console/login?redirect=" + encodeURIComponent(window.location.href));
    const e = (n = t.response) == null ? void 0 : n.data;
    let r = new a(((i = t.response) == null ? void 0 : i.status.toString()) || "500", t.message);
    return console.log("errorResponse", e), e && (e.err ? r = new a(e.code, e.err) : e.error && (r = new a(e.code, e.error))), Promise.reject(r);
  }
);
const w = async (t, e) => s.get(t, e), g = async (t, e, r) => s.post(t, e, r), f = async (t, e, r) => s.put(t, e, r), y = async (t, e) => s.delete(t, e), q = async (t, e) => {
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
  y as a,
  l as b,
  s as c,
  g as d,
  w as e,
  f,
  q as r
};
