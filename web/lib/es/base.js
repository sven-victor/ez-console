import L from "i18next";
import { initReactI18next as k } from "react-i18next";
import x from "i18next-browser-languagedetector";
import { r as w } from "./client.js";
import { load as z } from "js-yaml";
const rt = (t, e = "YYYY-MM-DDTHH:mm:ssZ") => {
  const r = t instanceof Date ? t : new Date(t), i = r.getFullYear(), f = String(r.getMonth() + 1).padStart(2, "0"), p = String(r.getDate()).padStart(2, "0"), n = String(r.getHours()).padStart(2, "0"), c = String(r.getMinutes()).padStart(2, "0"), g = String(r.getSeconds()).padStart(2, "0");
  return e.replace("YYYY", String(i)).replace("MM", f).replace("DD", p).replace("HH", n).replace("mm", c).replace("ss", g);
}, nt = (t, e) => {
  if (typeof t != "string")
    throw new Error("Color must be a string.");
  const r = t.trim().toLowerCase();
  if (r.startsWith("#")) {
    let c = r.slice(1);
    if (c.length === 3 && (c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2]), c.length !== 6)
      throw new Error("Invalid HEX color format. Expected #RRGGBB or #RGB.");
    const g = parseInt(c.slice(0, 2), 16), h = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
    if (isNaN(g) || isNaN(h) || isNaN(b))
      throw new Error("Invalid characters in HEX color value.");
    return `rgba(${g}, ${h}, ${b}, ${e})`;
  }
  const i = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/, f = r.match(i);
  if (f) {
    const c = parseInt(f[1], 10), g = parseInt(f[2], 10), h = parseInt(f[3], 10);
    if (c < 0 || c > 255 || g < 0 || g > 255 || h < 0 || h > 255)
      throw new Error("Invalid RGB color value. Each component must be between 0 and 255.");
    return `rgba(${c}, ${g}, ${h}, ${e})`;
  }
  const p = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9.]+)\s*\)$/, n = r.match(p);
  if (n) {
    const c = parseInt(n[1], 10), g = parseInt(n[2], 10), h = parseInt(n[3], 10);
    if (c < 0 || c > 255 || g < 0 || g > 255 || h < 0 || h > 255)
      throw new Error("Invalid RGBA color value. RGB components must be between 0 and 255.");
    return `rgba(${c}, ${g}, ${h}, ${e})`;
  }
  throw new Error(
    "Unsupported color format. Please use HEX (#RRGGBB, #RGB), RGB (rgb(r,g,b)), or RGBA (rgba(r,g,b,a))."
  );
}, ot = (t) => {
  if (!t)
    return "";
  const [e, r] = t.split("@");
  return e.length <= 2 ? e[0] + "*".repeat(e.length - 1) + "@" + r : e[0] + "*".repeat(e.length - 2) + e[e.length - 1] + "@" + r;
}, st = (t) => t ? "/".endsWith("/") ? t.startsWith("/") ? "/" + t.substring(1) : "/" + t : t.startsWith("/") ? "/" + t : "//" + t : "/", it = (t) => {
  const e = ["of", "the", "and", "in", "on", "at", "to", "for"];
  return t.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").toLowerCase().split(/\s+/).map((r, i) => i !== 0 && e.includes(r) ? r : r.charAt(0).toUpperCase() + r.slice(1)).join(" ");
}, at = (t, e, r) => {
  if (t === void 0 && e === void 0) return !0;
  if (t === void 0 || e === void 0 || t.length !== e.length) return !1;
  const i = new Array(e.length).fill(!1);
  for (const f of t) {
    let p = !1;
    for (let n = 0; n < e.length; n++)
      if (!i[n] && r(f, e[n])) {
        i[n] = !0, p = !0;
        break;
      }
    if (!p) return !1;
  }
  return !0;
};
function ct(t) {
  try {
    return { parsed: JSON.parse(t), isJSON: !0 };
  } catch {
    return { parsed: null, isJSON: !1 };
  }
}
const B = 2;
function T(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return null;
  const e = t, r = e.default;
  return r && typeof r == "object" && !Array.isArray(r) ? r : "default" in e && Object.keys(e).every((i) => i === "default" || i === "__esModule") ? null : e;
}
function E(t) {
  return !!t && typeof t == "object" && !Array.isArray(t) && Object.keys(t).length > 0;
}
function _(t, e) {
  if (t.length === 1) return { [t[0]]: e };
  const r = {};
  for (const i of t) {
    const f = e[i];
    f && typeof f == "object" && !Array.isArray(f) && (r[i] = f);
  }
  return r;
}
function C() {
  let t = () => {
  };
  return { promise: new Promise((r) => {
    t = r;
  }), resolve: t };
}
function Y(t) {
  const { fallbackLng: e } = t, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
  let p = !1, n, c;
  function g(o, s) {
    if (process.env.NODE_ENV === "production") return;
    const u = `${o}|${s}`;
    i.has(u) || (i.add(u), console.warn(`[i18n] No resource registered for "${o}" namespace "${s}".`));
  }
  function h(o) {
    if (o.pending) return o.pending;
    const s = (async () => {
      let u;
      for (let m = 0; m < B; m += 1)
        try {
          const l = T(await o.loader());
          if (!l) throw new Error("Invalid i18n resource");
          const d = _(o.namespaces, l);
          if (o.namespaces.length > 1 && Object.keys(d).length === 0)
            throw new Error("Invalid i18n resource");
          return d;
        } catch (l) {
          u = l;
        }
      throw u instanceof Error ? u : new Error(String(u));
    })();
    return o.pending = s, s.catch(() => {
      o.pending === s && (o.pending = void 0);
    }), s;
  }
  function b(o, s, u, m) {
    if (n)
      for (const l of u.namespaces) {
        if (l === s) continue;
        const d = m[l];
        !E(d) || E(n.getResourceBundle(o, l)) || n.addResourceBundle(o, l, d, !0, !0);
      }
  }
  function $(o, s, u) {
    const m = r.get(`${o}|${s}`);
    if (!m) {
      g(o, s), u(null, null);
      return;
    }
    h(m).then(
      (l) => {
        b(o, s, m, l);
        const d = l[s];
        u(null, E(d) ? d : null);
      },
      (l) => {
        const d = l instanceof Error ? l : new Error(String(l));
        console.error(`[i18n] Failed to load "${o}" namespace "${s}".`, d), u(d, {});
      }
    );
  }
  function R() {
    p || (p = !0, queueMicrotask(() => {
      f.clear(), p = !1;
    }));
  }
  function G(o, s, u, m) {
    o.resolve(!s && E(u)), m(s, u);
  }
  const v = {
    type: "backend",
    init() {
    },
    read(o, s, u) {
      if (R(), o === e) {
        const l = f.get(s);
        if (l) {
          l.promise.then((A) => {
            A ? u(null, null) : $(o, s, u);
          });
          return;
        }
        const d = c || (n == null ? void 0 : n.language);
        if (d && d !== e && E(n == null ? void 0 : n.getResourceBundle(d, s))) {
          u(null, null);
          return;
        }
      }
      const m = C();
      o !== e && f.set(s, m), $(o, s, (l, d) => G(m, l, d, u));
    }
  };
  function F(o, s, u) {
    const m = typeof s == "string" ? [s] : [...s];
    if (m.length === 0) return;
    const l = { namespaces: m, loader: u };
    for (const S of m) {
      const I = `${o}|${S}`;
      r.has(I) && process.env.NODE_ENV !== "production" && console.warn(`[i18n] Replacing resource loader for "${o}" namespace "${S}".`), r.set(I, l);
    }
    if (!(n != null && n.isInitialized) || n.language !== o) return;
    const d = n.options.ns, A = typeof d == "string" ? [d] : d ?? [], N = m.filter((S) => A.includes(S) ? !E(n == null ? void 0 : n.getResourceBundle(o, S)) : !1);
    N.length !== 0 && n.reloadResources([o], N);
  }
  function M(o) {
    n = o, o.on("languageChanging", (s) => {
      s && (c = s);
    });
  }
  return { backend: v, register: F, bind: M };
}
const O = "en-US", { backend: P, register: a, bind: H } = Y({ fallbackLng: O });
H(L);
const y = ["translation", "common", "inbox", "task"];
a("zh-CN", y, () => import("./i18n-zh-CN-shell.js"));
a("en-US", y, () => import("./i18n-en-US-shell.js"));
a("de-DE", y, () => import("./i18n-de-DE-shell.js"));
a("es-ES", y, () => import("./i18n-es-ES-shell.js"));
a("fr-FR", y, () => import("./i18n-fr-FR-shell.js"));
a("ar-AE", y, () => import("./i18n-ar-AE-shell.js"));
a("sv-SE", y, () => import("./i18n-sv-SE-shell.js"));
a("zh-CN", "authorization", () => import("./i18n-zh-CN-authorization.js"));
a("en-US", "authorization", () => import("./i18n-en-US-authorization.js"));
a("de-DE", "authorization", () => import("./i18n-de-DE-authorization.js"));
a("es-ES", "authorization", () => import("./i18n-es-ES-authorization.js"));
a("fr-FR", "authorization", () => import("./i18n-fr-FR-authorization.js"));
a("ar-AE", "authorization", () => import("./i18n-ar-AE-authorization.js"));
a("sv-SE", "authorization", () => import("./i18n-sv-SE-authorization.js"));
a("zh-CN", "system", () => import("./i18n-zh-CN-system.js"));
a("en-US", "system", () => import("./i18n-en-US-system.js"));
a("de-DE", "system", () => import("./i18n-de-DE-system.js"));
a("es-ES", "system", () => import("./i18n-es-ES-system.js"));
a("fr-FR", "system", () => import("./i18n-fr-FR-system.js"));
a("ar-AE", "system", () => import("./i18n-ar-AE-system.js"));
a("sv-SE", "system", () => import("./i18n-sv-SE-system.js"));
a("zh-CN", "ai", () => import("./i18n-zh-CN-ai.js"));
a("en-US", "ai", () => import("./i18n-en-US-ai.js"));
a("de-DE", "ai", () => import("./i18n-de-DE-ai.js"));
a("es-ES", "ai", () => import("./i18n-es-ES-ai.js"));
a("fr-FR", "ai", () => import("./i18n-fr-FR-ai.js"));
a("ar-AE", "ai", () => import("./i18n-ar-AE-ai.js"));
a("sv-SE", "ai", () => import("./i18n-sv-SE-ai.js"));
function ft(t, e, r) {
  a(t, e, r);
}
L.use(x).use(k).use(P).init({
  ns: ["translation", "common"],
  defaultNS: "translation",
  fallbackLng: O,
  // Do not also request the language subtag (`zh` for `zh-CN`).
  load: "currentOnly",
  partialBundledLanguages: !0,
  // Retry once inside the backend. A truthy error payload then clears i18next's failed
  // state so the next language change can try again. The default of 5 retries would
  // multiply that and delay Suspense.
  maxRetries: 0,
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: !1
  },
  react: {
    useSuspense: !0
  }
});
async function V(t, e) {
  return w("/api/files", {
    method: "GET",
    params: {
      ...t
    },
    ...e || {}
  });
}
async function W(t, e, r) {
  const i = new FormData();
  return e && i.append("file", e), Object.keys(t).forEach((f) => {
    const p = t[f];
    p != null && (typeof p == "object" && !(p instanceof File) ? p instanceof Array ? p.forEach((n) => i.append(f, n || "")) : i.append(
      f,
      new Blob([JSON.stringify(p)], { type: "application/json" })
    ) : i.append(f, p));
  }), w("/api/files", {
    method: "POST",
    data: i,
    requestType: "form",
    ...r || {}
  });
}
async function q(t, e) {
  const { fileKey: r, ...i } = t;
  return w(`/api/files/${r}`, {
    method: "GET",
    params: { ...i },
    ...e || {}
  });
}
async function J(t) {
  return w("/api/statistics", {
    method: "GET",
    ...t || {}
  });
}
const ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  downloadFile: q,
  getStatistics: J,
  listFiles: V,
  uploadFile: W
}, Symbol.toStringTag, { value: "Module" }));
function U(t) {
  const e = t.payload;
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function lt(t, e) {
  return t(`types.${e.type}`, { defaultValue: e.type, ...U(e) });
}
function pt(t, e) {
  return t(`typeDescriptions.${e.type}`, { defaultValue: "", ...U(e) });
}
function dt(t) {
  return !t.read_at;
}
const mt = {
  DEFAULT_CURRENT: 1,
  DEFAULT_PAGE_SIZE: 10
};
function X(t) {
  try {
    const e = z(t);
    return e && typeof e == "object" && !Array.isArray(e) ? e : {};
  } catch (e) {
    return console.error(e), {};
  }
}
function j(t) {
  if (t == null) return "";
  if (typeof t == "string") return t;
  if (typeof t == "number" || typeof t == "boolean" || typeof t == "bigint")
    return String(t);
  if (t instanceof Date)
    return t.toISOString();
  if (Array.isArray(t))
    return t.map((e) => j(e)).join(", ");
  if (typeof t == "object")
    try {
      return JSON.stringify(t);
    } catch {
      return "";
    }
  return String(t);
}
function D(t) {
  return j(t).replace(/\|/g, "\\|").replace(/\n/g, " ");
}
function gt(t) {
  if (typeof t != "string" || !t.trim()) return t;
  const e = t.trimStart();
  if (!e.startsWith("---")) return t;
  const r = e.slice(3), i = r.indexOf(`
---`);
  if (i === -1) return t;
  const f = r.slice(0, i).trim(), p = r.slice(i + 4).trimStart(), n = X(f), c = Object.keys(n);
  if (c.length === 0) return t;
  const g = "| Field | Value |", h = "| --- | --- |", b = c.map((R) => "| " + D(R) + " | " + D(n[R]) + " |").join(`
`);
  return g + `
` + h + `
` + b + `

` + p;
}
export {
  mt as P,
  dt as a,
  pt as b,
  lt as c,
  ut as d,
  nt as e,
  rt as f,
  st as g,
  gt as h,
  at as i,
  ct as j,
  ot as m,
  ft as r,
  it as t
};
