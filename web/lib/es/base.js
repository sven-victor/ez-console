import D from "i18next";
import { initReactI18next as T } from "react-i18next";
import F from "i18next-browser-languagedetector";
import { r as R } from "./client.js";
import { load as k } from "js-yaml";
const nt = (t, e = "YYYY-MM-DDTHH:mm:ssZ") => {
  const r = t instanceof Date ? t : new Date(t), i = r.getFullYear(), l = String(r.getMonth() + 1).padStart(2, "0"), p = String(r.getDate()).padStart(2, "0"), n = String(r.getHours()).padStart(2, "0"), c = String(r.getMinutes()).padStart(2, "0"), y = String(r.getSeconds()).padStart(2, "0");
  return e.replace("YYYY", String(i)).replace("MM", l).replace("DD", p).replace("HH", n).replace("mm", c).replace("ss", y);
}, ot = (t, e) => {
  if (typeof t != "string")
    throw new Error("Color must be a string.");
  const r = t.trim().toLowerCase();
  if (r.startsWith("#")) {
    let c = r.slice(1);
    if (c.length === 3 && (c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2]), c.length !== 6)
      throw new Error("Invalid HEX color format. Expected #RRGGBB or #RGB.");
    const y = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
    if (isNaN(y) || isNaN(g) || isNaN(b))
      throw new Error("Invalid characters in HEX color value.");
    return `rgba(${y}, ${g}, ${b}, ${e})`;
  }
  const i = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/, l = r.match(i);
  if (l) {
    const c = parseInt(l[1], 10), y = parseInt(l[2], 10), g = parseInt(l[3], 10);
    if (c < 0 || c > 255 || y < 0 || y > 255 || g < 0 || g > 255)
      throw new Error("Invalid RGB color value. Each component must be between 0 and 255.");
    return `rgba(${c}, ${y}, ${g}, ${e})`;
  }
  const p = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9.]+)\s*\)$/, n = r.match(p);
  if (n) {
    const c = parseInt(n[1], 10), y = parseInt(n[2], 10), g = parseInt(n[3], 10);
    if (c < 0 || c > 255 || y < 0 || y > 255 || g < 0 || g > 255)
      throw new Error("Invalid RGBA color value. RGB components must be between 0 and 255.");
    return `rgba(${c}, ${y}, ${g}, ${e})`;
  }
  throw new Error(
    "Unsupported color format. Please use HEX (#RRGGBB, #RGB), RGB (rgb(r,g,b)), or RGBA (rgba(r,g,b,a))."
  );
}, st = (t) => {
  if (!t)
    return "";
  const [e, r] = t.split("@");
  return e.length <= 2 ? e[0] + "*".repeat(e.length - 1) + "@" + r : e[0] + "*".repeat(e.length - 2) + e[e.length - 1] + "@" + r;
}, it = (t) => t ? "/".endsWith("/") ? t.startsWith("/") ? "/" + t.substring(1) : "/" + t : t.startsWith("/") ? "/" + t : "//" + t : "/", at = (t) => {
  const e = ["of", "the", "and", "in", "on", "at", "to", "for"];
  return t.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").toLowerCase().split(/\s+/).map((r, i) => i !== 0 && e.includes(r) ? r : r.charAt(0).toUpperCase() + r.slice(1)).join(" ");
}, ct = (t, e, r) => {
  if (t === void 0 && e === void 0) return !0;
  if (t === void 0 || e === void 0 || t.length !== e.length) return !1;
  const i = new Array(e.length).fill(!1);
  for (const l of t) {
    let p = !1;
    for (let n = 0; n < e.length; n++)
      if (!i[n] && r(l, e[n])) {
        i[n] = !0, p = !0;
        break;
      }
    if (!p) return !1;
  }
  return !0;
};
function lt(t) {
  try {
    return { parsed: JSON.parse(t), isJSON: !0 };
  } catch {
    return { parsed: null, isJSON: !1 };
  }
}
const M = 2;
function z(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return null;
  const e = t, r = e.default;
  return r && typeof r == "object" && !Array.isArray(r) ? r : "default" in e && Object.keys(e).every((i) => i === "default" || i === "__esModule") ? null : e;
}
function E(t) {
  return !!t && typeof t == "object" && !Array.isArray(t) && Object.keys(t).length > 0;
}
function B(t, e) {
  if (t.length === 1) return { [t[0]]: e };
  const r = {};
  for (const i of t) {
    const l = e[i];
    l && typeof l == "object" && !Array.isArray(l) && (r[i] = l);
  }
  return r;
}
function _() {
  let t = () => {
  };
  return { promise: new Promise((r) => {
    t = r;
  }), resolve: t };
}
function Y(t) {
  const { fallbackLng: e } = t, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
  let p = !1, n, c;
  function y(o, s) {
    if (process.env.NODE_ENV === "production") return;
    const f = `${o}|${s}`;
    i.has(f) || (i.add(f), console.warn(`[i18n] No resource registered for "${o}" namespace "${s}".`));
  }
  function g(o) {
    if (o.pending) return o.pending;
    const s = (async () => {
      let f;
      for (let m = 0; m < M; m += 1)
        try {
          const u = z(await o.loader());
          if (!u) throw new Error("Invalid i18n resource");
          const d = B(o.namespaces, u);
          if (o.namespaces.length > 1 && Object.keys(d).length === 0)
            throw new Error("Invalid i18n resource");
          return d;
        } catch (u) {
          f = u;
        }
      throw f instanceof Error ? f : new Error(String(f));
    })();
    return o.pending = s, s.catch(() => {
      o.pending === s && (o.pending = void 0);
    }), s;
  }
  function b(o, s, f, m) {
    if (n)
      for (const u of f.namespaces) {
        if (u === s) continue;
        const d = m[u];
        !E(d) || E(n.getResourceBundle(o, u)) || n.addResourceBundle(o, u, d, !0, !0);
      }
  }
  function $(o, s, f) {
    const m = r.get(`${o}|${s}`);
    if (!m) {
      y(o, s), f(null, null);
      return;
    }
    g(m).then(
      (u) => {
        b(o, s, m, u);
        const d = u[s];
        f(null, E(d) ? d : null);
      },
      (u) => {
        const d = u instanceof Error ? u : new Error(String(u));
        console.error(`[i18n] Failed to load "${o}" namespace "${s}".`, d), f(d, {});
      }
    );
  }
  function w() {
    p || (p = !0, queueMicrotask(() => {
      l.clear(), p = !1;
    }));
  }
  function U(o, s, f, m) {
    o.resolve(!s && E(f)), m(s, f);
  }
  const j = {
    type: "backend",
    init() {
    },
    read(o, s, f) {
      if (w(), o === e) {
        const u = l.get(s);
        if (u) {
          u.promise.then((A) => {
            A ? f(null, null) : $(o, s, f);
          });
          return;
        }
        const d = c || (n == null ? void 0 : n.language);
        if (d && d !== e && E(n == null ? void 0 : n.getResourceBundle(d, s))) {
          f(null, null);
          return;
        }
      }
      const m = _();
      o !== e && l.set(s, m), $(o, s, (u, d) => U(m, u, d, f));
    }
  };
  function C(o, s, f) {
    const m = typeof s == "string" ? [s] : [...s];
    if (m.length === 0) return;
    const u = { namespaces: m, loader: f };
    for (const S of m) {
      const x = `${o}|${S}`;
      r.has(x) && process.env.NODE_ENV !== "production" && console.warn(`[i18n] Replacing resource loader for "${o}" namespace "${S}".`), r.set(x, u);
    }
    if (!(n != null && n.isInitialized) || n.language !== o) return;
    const d = n.options.ns, A = typeof d == "string" ? [d] : d ?? [], N = m.filter((S) => A.includes(S) ? !E(n == null ? void 0 : n.getResourceBundle(o, S)) : !1);
    N.length !== 0 && n.reloadResources([o], N);
  }
  function G(o) {
    n = o, o.on("languageChanging", (s) => {
      s && (c = s);
    });
  }
  return { backend: j, register: C, bind: G };
}
const L = "en-US", { backend: P, register: a, bind: H } = Y({ fallbackLng: L });
H(D);
const h = ["translation", "common", "inbox", "task"];
a("zh-CN", h, () => import("./i18n-zh-CN-shell.js"));
a("en-US", h, () => import("./i18n-en-US-shell.js"));
a("de-DE", h, () => import("./i18n-de-DE-shell.js"));
a("es-ES", h, () => import("./i18n-es-ES-shell.js"));
a("fr-FR", h, () => import("./i18n-fr-FR-shell.js"));
a("ar-AE", h, () => import("./i18n-ar-AE-shell.js"));
a("sv-SE", h, () => import("./i18n-sv-SE-shell.js"));
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
D.use(F).use(T).use(P).init({
  ns: ["translation", "common"],
  defaultNS: "translation",
  fallbackLng: L,
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
  return R("/api/files", {
    method: "GET",
    params: {
      ...t
    },
    ...e || {}
  });
}
async function W(t, e, r) {
  const i = new FormData();
  return e && i.append("file", e), Object.keys(t).forEach((l) => {
    const p = t[l];
    p != null && (typeof p == "object" && !(p instanceof File) ? p instanceof Array ? p.forEach((n) => i.append(l, n || "")) : i.append(
      l,
      new Blob([JSON.stringify(p)], { type: "application/json" })
    ) : i.append(l, p));
  }), R("/api/files", {
    method: "POST",
    data: i,
    requestType: "form",
    ...r || {}
  });
}
async function q(t, e) {
  const { fileKey: r, ...i } = t;
  return R(`/api/files/${r}`, {
    method: "GET",
    params: { ...i },
    ...e || {}
  });
}
async function J(t) {
  return R("/api/statistics", {
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
function v(t) {
  const e = t.payload;
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function pt(t, e) {
  return t(`types.${e.type}`, { defaultValue: e.type, ...v(e) });
}
function dt(t, e) {
  return t(`typeDescriptions.${e.type}`, { defaultValue: "", ...v(e) });
}
function mt(t) {
  return !t.read_at;
}
const yt = {
  DEFAULT_CURRENT: 1,
  DEFAULT_PAGE_SIZE: 10
};
function X(t) {
  try {
    const e = k(t);
    return e && typeof e == "object" && !Array.isArray(e) ? e : {};
  } catch (e) {
    return console.error(e), {};
  }
}
function O(t) {
  if (t == null) return "";
  if (typeof t == "string") return t;
  if (typeof t == "number" || typeof t == "boolean" || typeof t == "bigint")
    return String(t);
  if (t instanceof Date)
    return t.toISOString();
  if (Array.isArray(t))
    return t.map((e) => O(e)).join(", ");
  if (typeof t == "object")
    try {
      return JSON.stringify(t);
    } catch {
      return "";
    }
  return String(t);
}
function I(t) {
  return O(t).replace(/\|/g, "\\|").replace(/\n/g, " ");
}
function gt(t) {
  if (typeof t != "string" || !t.trim()) return t;
  const e = t.trimStart();
  if (!e.startsWith("---")) return t;
  const r = e.slice(3), i = r.indexOf(`
---`);
  if (i === -1) return t;
  const l = r.slice(0, i).trim(), p = r.slice(i + 4).trimStart(), n = X(l), c = Object.keys(n);
  if (c.length === 0) return t;
  const y = "| Field | Value |", g = "| --- | --- |", b = c.map((w) => "| " + I(w) + " | " + I(n[w]) + " |").join(`
`);
  return y + `
` + g + `
` + b + `

` + p;
}
function Z(t) {
  const e = document.createElement("textarea");
  e.value = t, e.setAttribute("readonly", ""), e.style.position = "fixed", e.style.top = "0", e.style.left = "0", e.style.width = "1px", e.style.height = "1px", e.style.opacity = "0", document.body.appendChild(e), e.focus(), e.select(), e.setSelectionRange(0, t.length);
  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(e);
  }
}
async function ht(t) {
  var e;
  if (window.isSecureContext && ((e = navigator.clipboard) != null && e.writeText))
    try {
      await navigator.clipboard.writeText(t);
      return;
    } catch {
    }
  if (!Z(t))
    throw new Error("Failed to copy text");
}
export {
  yt as P,
  mt as a,
  dt as b,
  pt as c,
  ht as d,
  ut as e,
  nt as f,
  it as g,
  ot as h,
  ct as i,
  gt as j,
  lt as k,
  st as m,
  ft as r,
  at as t
};
