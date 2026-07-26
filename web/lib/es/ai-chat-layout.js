import { j as o } from "./vendor.js";
import { lazy as b, useEffect as d, useState as u } from "react";
import { Modal as m } from "antd";
import { d as l } from "./contexts.js";
import { w as h } from "./index.js";
import { j as f, R as y } from "./components.js";
import { createStyles as g } from "antd-style";
import v from "classnames";
const c = b(() => import("./ai-chat.js")), w = g(({ token: t, css: e }) => ({
  siderLayout: e`
      position: relative;
      height: 100vh;
    `,
  siderLayoutContent: e`
      height: 100%;
      width: 100%;
      background-color: ${t.colorBgContainer};
      overflow: hidden;
    `,
  floatSiderLayout: e`
      position: fixed;
      right: 16px;
      top: 16px;
      height: calc(100vh - 32px);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
      z-index: 1000;
      overflow: hidden;
      backdrop-filter: blur(8px);
      border: 1px solid ${t.colorBorderSecondary};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1);
      }
    `
})), W = (t) => {
  const { visible: e, setVisible: i, setLoaded: a } = l();
  return d(() => {
    a(!0);
  }, [a]), /* @__PURE__ */ o.jsx(
    m,
    {
      className: "ai-chat-modal",
      width: 1200,
      open: e,
      closable: !1,
      onCancel: () => i(!1),
      footer: null,
      children: h(c, t)
    }
  );
}, B = (t) => {
  const { styles: e } = w(), { layout: i, visible: a } = l(), [s, p] = u(() => {
    const r = localStorage.getItem("ai-sidebar-width");
    return r ? parseInt(r, 10) : 400;
  }), { setLoaded: n } = l();
  d(() => {
    n(!0);
  }, [n]), d(() => {
    localStorage.setItem("ai-sidebar-width", s.toString());
  }, [s]);
  const x = (r) => {
    p(r);
  };
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      style: {
        width: `${s}px`,
        display: a ? "flex" : "none",
        overflow: "hidden",
        flexShrink: 0
      },
      className: v("ai-sidebar-layout", i === "float-sidebar" ? e.floatSiderLayout : e.siderLayout),
      children: [
        /* @__PURE__ */ o.jsx(
          y,
          {
            onResize: x,
            minWidth: 300,
            maxWidth: window.innerWidth * 0.5
          }
        ),
        /* @__PURE__ */ o.jsx(
          "div",
          {
            style: {
              borderRadius: i === "float-sidebar" ? "12px" : "0"
            },
            className: e.siderLayoutContent,
            children: /* @__PURE__ */ o.jsx("div", { children: h(c, t) })
          }
        )
      ]
    }
  );
}, N = () => /* @__PURE__ */ o.jsx(f, {});
export {
  N as A,
  W as a,
  B as b
};
