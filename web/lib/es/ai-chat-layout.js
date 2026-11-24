import { j as N } from "./vendor.js";
import { lazy as rt, useEffect as H, useState as D, useRef as A, useLayoutEffect as it } from "react";
import { Modal as st } from "antd";
import { d as at } from "./contexts.js";
import { w as X } from "./index.js";
import { l as lt, R as ct } from "./components.js";
import { createStyles as ut } from "antd-style";
import dt from "classnames";
const V = rt(() => import("./ai-chat.js")), s = 16, Q = "ai-float-sidebar-position", U = "ai-float-sidebar-width", tt = "ai-float-sidebar-height", E = 300, I = 360, _ = 6, u = 12, ht = ".ai-chat-layout-selector", ft = [
  ".ant-radio-group",
  ".ant-btn",
  ".ant-dropdown",
  ".ant-dropdown-trigger",
  "button",
  "a",
  "input",
  "textarea",
  "select"
].join(", "), k = [
  { edge: "n", cursor: "ns-resize", style: { top: 0, left: u, right: u, height: _, zIndex: 30 } },
  { edge: "s", cursor: "ns-resize", style: { bottom: 0, left: u, right: u, height: _, zIndex: 30 } },
  { edge: "e", cursor: "ew-resize", style: { right: 0, top: 50, bottom: u, width: _, zIndex: 30 } },
  { edge: "w", cursor: "ew-resize", style: { left: 0, top: u, bottom: u, width: _, zIndex: 30 } },
  { edge: "nw", cursor: "nwse-resize", style: { top: 0, left: 0, width: u, height: u, zIndex: 31 } },
  { edge: "ne", cursor: "nesw-resize", style: { top: 0, right: 0, width: u, height: u, zIndex: 31 } },
  { edge: "sw", cursor: "nesw-resize", style: { bottom: 0, left: 0, width: u, height: u, zIndex: 31 } },
  { edge: "se", cursor: "nwse-resize", style: { bottom: 0, right: 0, width: u, height: u, zIndex: 31 } }
];
function T(t, e, m, i) {
  const n = window.innerWidth - m - s, l = window.innerHeight - i - s;
  return {
    left: Math.min(Math.max(t, Math.min(s, n)), Math.max(s, n)),
    top: Math.min(Math.max(e, Math.min(s, l)), Math.max(s, l))
  };
}
function mt(t, e) {
  try {
    const m = localStorage.getItem(Q);
    if (!m) return null;
    const i = JSON.parse(m);
    return typeof i.left != "number" || typeof i.top != "number" || !Number.isFinite(i.left) || !Number.isFinite(i.top) ? null : T(i.left, i.top, t, e);
  } catch {
    return null;
  }
}
function K() {
  const t = Number.parseFloat(localStorage.getItem(U) || "");
  if (!Number.isFinite(t) || t <= 0) return null;
  const e = Math.max(E, window.innerWidth - s * 2);
  return Math.min(Math.max(t, E), e);
}
function Z() {
  const t = Number.parseFloat(localStorage.getItem(tt) || "");
  if (!Number.isFinite(t) || t <= 0) return null;
  const e = Math.max(I, window.innerHeight - s * 2);
  return Math.min(Math.max(t, I), e);
}
function J(t, e, m, i) {
  const n = e.left + e.width, l = e.top + e.height;
  let a = e.left, S = e.top, d = e.width, x = e.height;
  if (t.includes("w"))
    a = e.left + m, a < s && (a = s), n - a < E && (a = n - E), d = n - a;
  else if (t.includes("e")) {
    d = e.width + m, d < E && (d = E);
    const c = window.innerWidth - s - e.left;
    d > c && (d = Math.max(E, c));
  }
  if (t.includes("n"))
    S = e.top + i, S < s && (S = s), l - S < I && (S = l - I), x = l - S;
  else if (t.includes("s")) {
    x = e.height + i, x < I && (x = I);
    const c = window.innerHeight - s - e.top;
    x > c && (x = Math.max(I, c));
  }
  return {
    left: Math.round(a),
    top: Math.round(S),
    width: Math.round(d),
    height: Math.round(x)
  };
}
function q() {
  const t = Number.parseInt(localStorage.getItem("ai-sidebar-width") || "", 10);
  return Number.isFinite(t) && t > 0 ? t : 400;
}
function pt(t) {
  return !(!(t instanceof Element) || !t.closest(ht) || t.closest(ft));
}
function j(t, e) {
  !t || !e || (t.style.left = `${e.left}px`, t.style.top = `${e.top}px`, t.style.right = "auto");
}
function P(t, e) {
  !t || !e || (t.style.left = `${e.left}px`, t.style.top = `${e.top}px`, t.style.right = "auto", t.style.width = `${e.width}px`, t.style.height = `${e.height}px`);
}
const gt = ut(({ token: t, css: e, appearance: m }, i) => {
  const n = m === "dark", l = n ? "0 12px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.08)" : "0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)", a = n ? "0 16px 48px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.12)" : "0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)";
  return {
    resizeDivider: e`
      background-color: ${i === "sidebar" ? t.controlItemBgHover : "unset"};
    `,
    siderLayout: e`
      position: relative;
      height: 100vh;
      background-color: ${t.colorBgContainer};
    `,
    siderLayoutContent: e`
      height: 100%;
      width: 100%;
      min-height: 0;
      background-color: ${t.colorBgContainer};
      overflow: hidden;
      border-radius: ${i === "float-sidebar" ? "12px" : "0"};
    `,
    chatHost: e`
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
    `,
    floatSiderLayout: e`
      position: fixed;
      right: 16px;
      top: 16px;
      height: calc(100vh - 32px);
      border-radius: 12px;
      box-shadow: ${l};
      z-index: 1000;
      overflow: hidden;
      background-color: ${t.colorBgElevated};
      box-sizing: border-box;
      border: 1px solid ${n ? t.colorBorder : t.colorBorderSecondary};
      transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        box-shadow: ${a};
      }
    `,
    floatResizeHandle: e`
      position: absolute;
      background: transparent;
      touch-action: none;
      user-select: none;
    `
  };
}), zt = (t) => {
  const { visible: e, setVisible: m, setLoaded: i, layout: n } = at();
  H(() => {
    i(!0);
  }, [i]);
  const { styles: l } = gt(n), [a, S] = D(q), [d, x] = D(K), [c, Y] = D(Z), [v, $] = D(() => {
    const o = K() ?? q(), r = Z() ?? Math.max(0, window.innerHeight - s * 2);
    return mt(o, r);
  }), W = A(null), b = A(v), O = A(!1), B = A(!1), z = A(null), M = A(null);
  if (H(() => {
    localStorage.setItem("ai-sidebar-width", a.toString());
  }, [a]), H(() => {
    v && localStorage.setItem(Q, JSON.stringify(v));
  }, [v]), H(() => {
    d != null && localStorage.setItem(U, String(d));
  }, [d]), H(() => {
    c != null && localStorage.setItem(tt, String(c));
  }, [c]), H(() => () => {
    var o;
    return (o = M.current) == null ? void 0 : o.call(M);
  }, []), it(() => {
    if (B.current) {
      P(W.current, z.current);
      return;
    }
    O.current && j(W.current, b.current);
  }), H(() => {
    if (n !== "float-sidebar") return;
    const o = () => {
      const r = W.current;
      if (!r || r.getClientRects().length === 0) return;
      const h = Math.max(E, window.innerWidth - s * 2), p = Math.max(I, window.innerHeight - s * 2), F = d ?? a, L = Math.min(Math.max(F, E), h);
      L !== F && x(L);
      let R = r.getBoundingClientRect().height;
      if (c != null) {
        const w = Math.min(Math.max(c, I), p);
        w !== c && Y(w), R = w;
      }
      const g = b.current;
      if (!g) return;
      const f = T(g.left, g.top, L, R);
      f.left === g.left && f.top === g.top || (b.current = f, $(f));
    };
    return window.addEventListener("resize", o), () => window.removeEventListener("resize", o);
  }, [n, d, c, a]), n === "classic")
    return /* @__PURE__ */ N.jsx(
      st,
      {
        className: "ai-chat-modal",
        width: 1200,
        open: e,
        closable: !1,
        onCancel: () => m(!1),
        footer: null,
        children: X(V, t)
      }
    );
  const et = (o) => {
    S(o);
  }, ot = (o, r) => {
    var G;
    if (r.button !== 0) return;
    r.preventDefault(), r.stopPropagation();
    const h = W.current;
    if (!h) return;
    const p = h.getBoundingClientRect(), F = {
      left: p.left,
      top: p.top,
      width: p.width,
      height: p.height
    }, L = r.clientX, R = r.clientY, g = ((G = k.find((y) => y.edge === o)) == null ? void 0 : G.cursor) ?? "default";
    B.current = !0, z.current = J(o, F, 0, 0), b.current = { left: z.current.left, top: z.current.top }, P(h, z.current), document.body.style.cursor = g, document.body.style.userSelect = "none";
    const f = (y) => {
      const C = J(o, F, y.clientX - L, y.clientY - R);
      z.current = C, b.current = { left: C.left, top: C.top }, P(h, C);
    }, w = () => {
      document.removeEventListener("pointermove", f), document.removeEventListener("pointerup", w), document.body.style.cursor = "", document.body.style.userSelect = "", M.current = null;
      const y = z.current;
      y && (b.current = { left: y.left, top: y.top }, $(b.current), (o.includes("e") || o.includes("w")) && x(y.width), (o.includes("n") || o.includes("s")) && Y(y.height)), B.current = !1;
    };
    M.current = w, document.addEventListener("pointermove", f), document.addEventListener("pointerup", w);
  }, nt = (o) => {
    if (n !== "float-sidebar" || o.button !== 0 || !pt(o.target)) return;
    const r = W.current;
    if (!r) return;
    o.preventDefault();
    const h = r.getBoundingClientRect(), p = T(h.left, h.top, h.width, h.height), F = o.clientX, L = o.clientY;
    O.current = !0, b.current = p, j(r, p), document.body.style.cursor = "grabbing", document.body.style.userSelect = "none";
    const R = (f) => {
      const w = T(
        p.left + f.clientX - F,
        p.top + f.clientY - L,
        h.width,
        h.height
      );
      b.current = w, j(r, w);
    }, g = () => {
      document.removeEventListener("pointermove", R), document.removeEventListener("pointerup", g), document.body.style.cursor = "", document.body.style.userSelect = "", M.current = null;
      const f = b.current;
      f && $(f), O.current = !1;
    };
    M.current = g, document.addEventListener("pointermove", R), document.addEventListener("pointerup", g);
  };
  return /* @__PURE__ */ N.jsxs(
    "div",
    {
      ref: W,
      onPointerDown: nt,
      style: {
        width: `${n === "float-sidebar" ? d ?? a : a}px`,
        display: e ? "flex" : "none",
        overflow: "hidden",
        flexShrink: 0,
        ...n === "float-sidebar" && c != null ? { height: c } : null,
        ...n === "float-sidebar" && v ? { left: v.left, top: v.top, right: "auto" } : null
      },
      className: dt("ai-sidebar-layout", n === "float-sidebar" ? l.floatSiderLayout : l.siderLayout),
      children: [
        n === "sidebar" && /* @__PURE__ */ N.jsx(
          ct,
          {
            rootClassName: l.resizeDivider,
            onResize: et,
            minWidth: 300,
            maxWidth: window.innerWidth * 0.5
          }
        ),
        /* @__PURE__ */ N.jsx(
          "div",
          {
            className: l.siderLayoutContent,
            children: /* @__PURE__ */ N.jsx("div", { className: l.chatHost, children: e && X(V, t) })
          }
        ),
        n === "float-sidebar" && k.map((o) => /* @__PURE__ */ N.jsx(
          "div",
          {
            "aria-hidden": !0,
            className: l.floatResizeHandle,
            style: { ...o.style, cursor: o.cursor },
            onPointerDown: (r) => ot(o.edge, r)
          },
          o.edge
        ))
      ]
    }
  );
}, Mt = ({ icon: t }) => /* @__PURE__ */ N.jsx(lt, { icon: t });
export {
  Mt as A,
  zt as a
};
