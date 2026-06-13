import { j as e } from "./vendor.js";
import { lazy as b, useEffect as n, useState as u } from "react";
import { Modal as x, Tooltip as f, FloatButton as y } from "antd";
import { RobotOutlined as g } from "@ant-design/icons";
import { useTranslation as v } from "react-i18next";
import { a as r } from "./contexts.js";
import { w as c } from "./index.js";
import { R as w } from "./components.js";
import { createStyles as S } from "antd-style";
import j from "classnames";
const p = b(() => import("./ai-chat.js")), C = S(({ token: o, css: t }) => ({
  siderLayout: t`
      position: relative;
      height: 100vh;
    `,
  siderLayoutContent: t`
      height: 100%;
      width: 100%;
      background-color: ${o.colorBgContainer};
      overflow: hidden;
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
})), $ = (o) => {
  const { visible: t, setVisible: i, setLoaded: a } = r();
  return n(() => {
    a(!0);
  }, [a]), /* @__PURE__ */ e.jsx(
    x,
    {
      className: "ai-chat-modal",
      width: 1200,
      open: t,
      closable: !1,
      onCancel: () => i(!1),
      footer: null,
      children: c(p, o)
    }
  );
}, D = (o) => {
  const { styles: t } = C(), { layout: i, visible: a } = r(), [l, h] = u(() => {
    const s = localStorage.getItem("ai-sidebar-width");
    return s ? parseInt(s, 10) : 400;
  }), { setLoaded: d } = r();
  n(() => {
    d(!0);
  }, [d]), n(() => {
    localStorage.setItem("ai-sidebar-width", l.toString());
  }, [l]);
  const m = (s) => {
    h(s);
  };
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      style: {
        width: `${l}px`,
        display: a ? "flex" : "none",
        overflow: "hidden",
        flexShrink: 0
      },
      className: j("ai-sidebar-layout", i === "float-sidebar" ? t.floatSiderLayout : t.siderLayout),
      children: [
        /* @__PURE__ */ e.jsx(
          w,
          {
            onResize: m,
            minWidth: 300,
            maxWidth: window.innerWidth * 0.5
          }
        ),
        /* @__PURE__ */ e.jsx(
          "div",
          {
            style: {
              borderRadius: i === "float-sidebar" ? "12px" : "0"
            },
            className: t.siderLayoutContent,
            children: /* @__PURE__ */ e.jsx("div", { children: c(p, o) })
          }
        )
      ]
    }
  );
}, E = () => {
  const { setVisible: o, visible: t } = r(), { t: i } = v("ai");
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    f,
    {
      title: i("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
      placement: "left",
      style: { display: t ? "none" : "block" },
      className: "ai-chat-tooltip",
      children: /* @__PURE__ */ e.jsx(
        y,
        {
          icon: /* @__PURE__ */ e.jsx(g, {}),
          className: "ai-chat-float-button",
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
  $ as a,
  D as b
};
