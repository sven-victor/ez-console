import { j as e } from "./vendor.js";
import { lazy as x, useEffect as l, useState as b } from "react";
import { Modal as f, Tooltip as m, FloatButton as u } from "antd";
import { RobotOutlined as y } from "@ant-design/icons";
import { useTranslation as g } from "react-i18next";
import { u as r } from "./contexts.js";
import { w as d } from "./index.js";
import { R as v } from "./components.js";
import { createStyles as w } from "antd-style";
import S from "classnames";
const p = x(() => import("./ai-chat.js")), j = w(({ token: o, css: t }) => ({
  siderLayout: t`
      position: relative;
      height: 100vh;
    `,
  floatSiderLayout: t`
      position: fixed;
      right: 16px;
      top: 16px;
      height: calc(100vh - 32px);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
      z-index: 1000;
      overflow: hidden;
      backdrop-filter: blur(8px);
      border: 1px solid ${o.colorBorderSecondary};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1);
      }
    `
})), F = () => {
  const { visible: o, setVisible: t, setLoaded: i } = r();
  return l(() => {
    i(!0);
  }, [i]), /* @__PURE__ */ e.jsx(
    f,
    {
      width: 1200,
      open: o,
      closable: !1,
      onCancel: () => t(!1),
      footer: null,
      children: d(p)
    }
  );
}, D = () => {
  const { styles: o } = j(), { layout: t, visible: i } = r(), [a, c] = b(() => {
    const s = localStorage.getItem("ai-sidebar-width");
    return s ? parseInt(s, 10) : 400;
  }), { setLoaded: n } = r();
  l(() => {
    n(!0);
  }, [n]), l(() => {
    localStorage.setItem("ai-sidebar-width", a.toString());
  }, [a]);
  const h = (s) => {
    c(s);
  };
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs(
    "div",
    {
      style: {
        width: `${a}px`,
        display: i ? "flex" : "none",
        overflow: "hidden",
        flexShrink: 0
      },
      className: S("ai-sidebar-layout", t === "float-sidebar" ? o.floatSiderLayout : o.siderLayout),
      children: [
        /* @__PURE__ */ e.jsx(
          v,
          {
            onResize: h,
            minWidth: 300,
            maxWidth: window.innerWidth * 0.5
          }
        ),
        /* @__PURE__ */ e.jsx(
          "div",
          {
            style: {
              width: "100%",
              height: "100%",
              backgroundColor: "#ffffff",
              overflow: "hidden",
              borderRadius: t === "float-sidebar" ? "12px" : "0"
            },
            children: /* @__PURE__ */ e.jsx("div", { children: d(p) })
          }
        )
      ]
    }
  ) });
}, E = () => {
  const { setVisible: o, visible: t } = r(), { t: i } = g("ai");
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    m,
    {
      title: i("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
      placement: "left",
      style: { display: t ? "none" : "block" },
      children: /* @__PURE__ */ e.jsx(
        u,
        {
          icon: /* @__PURE__ */ e.jsx(y, {}),
          type: "primary",
          onClick: () => o(!0),
          style: {
            right: 24,
            bottom: 24,
            display: t ? "none" : "block"
          }
        }
      )
    }
  ) });
};
export {
  E as A,
  F as a,
  D as b
};
