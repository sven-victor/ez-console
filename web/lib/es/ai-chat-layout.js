import { j as a } from "./vendor.js";
import { lazy as b, useEffect as l, useState as u } from "react";
import { Modal as m } from "antd";
import { d as n } from "./contexts.js";
import { w as h } from "./index.js";
import { j as f, R as g } from "./components.js";
import { createStyles as w } from "antd-style";
import v from "classnames";
const p = b(() => import("./ai-chat.js")), y = w(({ token: o, css: e, appearance: r }) => {
  const t = r === "dark", i = t ? "0 12px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.08)" : "0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)", d = t ? "0 16px 48px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.12)" : "0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)";
  return {
    siderLayout: e`
      position: relative;
      height: 100vh;
      background-color: ${o.colorBgContainer};
    `,
    siderLayoutContent: e`
      height: 100%;
      width: 100%;
      background-color: ${o.colorBgContainer};
      overflow: hidden;
    `,
    floatSiderLayout: e`
      position: fixed;
      right: 16px;
      top: 16px;
      height: calc(100vh - 32px);
      border-radius: 12px;
      box-shadow: ${i};
      z-index: 1000;
      overflow: hidden;
      background-color: ${o.colorBgElevated};
      border: 1px solid ${t ? o.colorBorder : o.colorBorderSecondary};
      transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        box-shadow: ${d};
      }
    `
  };
}), $ = (o) => {
  const { visible: e, setVisible: r, setLoaded: t } = n();
  return l(() => {
    t(!0);
  }, [t]), /* @__PURE__ */ a.jsx(
    m,
    {
      className: "ai-chat-modal",
      width: 1200,
      open: e,
      closable: !1,
      onCancel: () => r(!1),
      footer: null,
      children: h(p, o)
    }
  );
}, R = (o) => {
  const { styles: e } = y(), { layout: r, visible: t } = n(), [i, d] = u(() => {
    const s = localStorage.getItem("ai-sidebar-width");
    return s ? parseInt(s, 10) : 400;
  }), { setLoaded: c } = n();
  l(() => {
    c(!0);
  }, [c]), l(() => {
    localStorage.setItem("ai-sidebar-width", i.toString());
  }, [i]);
  const x = (s) => {
    d(s);
  };
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      style: {
        width: `${i}px`,
        display: t ? "flex" : "none",
        overflow: "hidden",
        flexShrink: 0
      },
      className: v("ai-sidebar-layout", r === "float-sidebar" ? e.floatSiderLayout : e.siderLayout),
      children: [
        /* @__PURE__ */ a.jsx(
          g,
          {
            onResize: x,
            minWidth: 300,
            maxWidth: window.innerWidth * 0.5
          }
        ),
        /* @__PURE__ */ a.jsx(
          "div",
          {
            style: {
              borderRadius: r === "float-sidebar" ? "12px" : "0"
            },
            className: e.siderLayoutContent,
            children: /* @__PURE__ */ a.jsx("div", { children: h(p, o) })
          }
        )
      ]
    }
  );
}, W = ({ icon: o }) => /* @__PURE__ */ a.jsx(f, { icon: o });
export {
  W as A,
  $ as a,
  R as b
};
