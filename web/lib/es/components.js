var Ye = Object.defineProperty;
var Qe = (t, n, s) => n in t ? Ye(t, n, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[n] = s;
var pe = (t, n, s) => Qe(t, typeof n != "symbol" ? n + "" : n, s);
import { j as e, I as Ze, u as et, a as tt, C as st, X as ge, F as nt, S as at, b as rt, c as it, A as ot } from "./vendor.js";
import { Navigate as xe } from "react-router-dom";
import { u as Se, a as oe, b as lt, c as H, d as ct } from "./contexts.js";
import { g as dt, f as ut, c as mt } from "./base.js";
import { Spin as N, Result as ae, Dropdown as Ce, Avatar as ht, Upload as pt, Modal as J, Popover as gt, List as xt, Divider as ke, Skeleton as ft, Tooltip as Ie, FloatButton as yt, Popconfirm as re, Button as S, Space as M, Input as F, Table as le, theme as jt, message as C, Radio as bt, Form as b, Card as K, Segmented as vt, Steps as wt, Alert as fe, QRCode as St, Typography as Ct, Tag as X, Empty as kt, Row as ye, Col as q, Select as D, DatePicker as It, Checkbox as je, Switch as Lt, InputNumber as Ft } from "antd";
import { useTranslation as k } from "react-i18next";
import { createStyles as U } from "antd-style";
import * as At from "@ant-design/icons";
import { UploadOutlined as zt, CheckOutlined as Tt, TeamOutlined as Pt, RobotOutlined as _t, PlusOutlined as ie, ReloadOutlined as Le, DeleteOutlined as Mt, BlockOutlined as $t, BorderRightOutlined as be, HistoryOutlined as Rt, CloseOutlined as Dt, ClockCircleFilled as Vt, MailOutlined as Et, EyeOutlined as Fe, EyeInvisibleOutlined as Ot, LaptopOutlined as Nt, EnvironmentOutlined as Bt, GlobalOutlined as qt, ClockCircleOutlined as Ht, SearchOutlined as Ut } from "@ant-design/icons";
import Ae from "classnames";
import G, { useState as v, useEffect as P, useCallback as Q, lazy as Wt, createElement as Kt, Suspense as Xt, forwardRef as Gt, useImperativeHandle as Jt, useMemo as ve } from "react";
import { a as I, w as ze } from "./index.js";
import { useRequest as $ } from "ahooks";
import Z from "dayjs";
import { b as ee, A as Yt } from "./client.js";
import Qt from "antd-img-crop";
import { isString as Zt } from "lodash";
const es = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(N, { size: "large" }) }), Bs = ({
  element: t,
  requiredPermission: n,
  requiredPermissions: s
}) => {
  const { t: a } = k(), { user: i, loading: r, error: d } = Se(), { hasPermission: l, hasAllPermissions: m } = oe();
  return r ? /* @__PURE__ */ e.jsx(es, {}) : d ? /* @__PURE__ */ e.jsx(
    ae,
    {
      status: "500",
      title: "500",
      subTitle: a("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (d == null ? void 0 : d.message) || d })
    }
  ) : i ? n && !l(n) ? /* @__PURE__ */ e.jsx(xe, { to: "/forbidden", replace: !0 }) : s && !m(s) ? /* @__PURE__ */ e.jsx(xe, { to: "/forbidden", replace: !0 }) : t : (window.location.href = dt("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, ts = U(({ token: t, css: n }) => ({
  container: n`
      ${n`
        @media screen and (max-width: ${t.screenXS}px) {
          width: 100% !important;
          > * {
            border-radius: 0 !important;
          }
        }
      `}
    > *{
      background-color: ${t.colorBgElevated};
      border-radius: 4px;
      box-shadow: ${t.boxShadowTertiary};
    }
    `,
  iconStyle: {
    cursor: "pointer",
    padding: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    verticalAlign: "middle",
    "&:hover": {
      color: t.colorPrimaryTextHover
    }
  }
})), Te = ({
  overlayClassName: t,
  overlay: n,
  hidden: s,
  children: a,
  ...i
}) => {
  if (s)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: r } = ts();
  return /* @__PURE__ */ e.jsx(
    Ce,
    {
      dropdownRender: n,
      overlayClassName: Ae(r.container, t),
      ...i,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: a })
    }
  );
}, ss = () => /* @__PURE__ */ e.jsxs(
  "svg",
  {
    viewBox: "0 0 24 24",
    focusable: "false",
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ e.jsx("path", { d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ e.jsx(
        "path",
        {
          d: "M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",
          className: "css-c4d79v"
        }
      )
    ]
  }
), ns = U(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), as = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], qs = ({
  transformLangConfig: t = (n) => n
}) => {
  const { i18n: n } = k(), { styles: s } = ns(), a = (r) => {
    n.changeLanguage(r);
  }, i = {
    selectedKeys: [n.language],
    onClick: (r) => {
      a(r.key);
    },
    items: t(as).map((r) => ({
      key: r.lang,
      className: s.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: s.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    Te,
    {
      menu: i,
      children: /* @__PURE__ */ e.jsx(ss, {})
    }
  );
}, rs = U(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), Pe = (t) => Zt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? ee.endsWith("/") ? ee + `files/${t}` : ee + `/files/${t}` : t, is = ({ src: t, fallback: n, ...s }) => /* @__PURE__ */ e.jsx(ht, { src: Pe(t), icon: n, ...s }), os = ({ onChange: t, shape: n = "square" }) => {
  const [s, a] = v([]), { styles: i } = rs(), [r, d] = v(!1), [l, m] = v(!0), [h, f] = v(0), { run: u, loading: p } = $(() => I.base.listFiles({ current: h + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: c }) => {
      a([...s, ...c]), m(c.length === 40), f(h + 1);
    }
  }), y = () => {
    m(!0), f(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    gt,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (c) => {
        d(c), c ? u() : y();
      },
      open: r,
      content: /* @__PURE__ */ e.jsx("div", { style: { width: 360, height: 200 }, children: /* @__PURE__ */ e.jsx(
        "div",
        {
          id: "iconsScrollableDiv",
          style: {
            height: "100%",
            overflow: "auto"
          },
          children: /* @__PURE__ */ e.jsx(
            Ze,
            {
              dataLength: s.length,
              next: () => {
                u();
              },
              hasMore: l,
              loader: /* @__PURE__ */ e.jsx(ft, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(ke, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                xt,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: s,
                  style: { margin: "0 8px" },
                  loading: p,
                  renderItem: ({ id: c }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: i.avatarItem,
                      onClick: (g) => {
                        g.stopPropagation(), t == null || t(c), d(!1), y();
                      },
                      children: /* @__PURE__ */ e.jsx(is, { shape: n, src: c })
                    }
                  )
                }
              )
            }
          )
        }
      ) }),
      placement: "bottom",
      trigger: "hover",
      children: /* @__PURE__ */ e.jsx(
        zt,
        {
          shape: n,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, ls = ({ value: t, onChange: n, shape: s, ...a }) => {
  const [i, r] = v(void 0), [d, l] = v(!1), [m, h] = v(void 0), f = async (u) => {
    l(!0), h(u.url ?? u.preview);
  };
  return P(() => {
    r(t ? {
      uid: t,
      name: t,
      url: Pe(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Qt,
      {
        beforeCrop: async (u) => {
          if (u.type === "image/svg+xml") {
            const p = await I.base.uploadFile({ type: "avatar" }, u);
            return p.length > 0 && (n == null || n(p[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          pt,
          {
            customRequest: async (u) => {
              var y, c;
              const p = await I.base.uploadFile({ type: "avatar", access: "public" }, u.file);
              p.length > 0 ? ((y = u.onSuccess) == null || y.call(u, p[0].id), n == null || n(p[0].id)) : (c = u.onError) == null || c.call(u, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: f,
            maxCount: 1,
            onChange: ({ file: u }) => {
              switch (u.status) {
                case "removed":
                  n == null || n(void 0);
                  break;
                case "done":
                  break;
                default:
                  r(u);
                  break;
              }
            },
            fileList: i ? [i] : [],
            ...a,
            children: i ? void 0 : /* @__PURE__ */ e.jsx(os, { shape: s, onChange: n })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(J, { open: d, footer: null, onCancel: () => l(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: m }) })
  ] });
}, Hs = () => {
  const { t } = k("common"), { user: n } = Se(), { currentOrgId: s, setCurrentOrgId: a } = lt(), i = (n == null ? void 0 : n.organizations) || [], r = (h) => {
    a(h), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const d = i.find((h) => h.id === s), l = d ? d.name : t("organization.global", { defaultValue: "Global" }), m = [
    ...i.map((h) => ({
      key: h.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: h.name }),
        s === h.id && /* @__PURE__ */ e.jsx(Tt, {})
      ] }),
      onClick: () => r(h.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    Te,
    {
      menu: {
        items: m,
        selectedKeys: s ? [s] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(Pt, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: l })
      ]
    }
  );
}, cs = ({
  onResize: t,
  minWidth: n = 300,
  maxWidth: s = window.innerWidth * 0.5
}) => {
  const [a, i] = v(!1), [r, d] = v(!1), l = Q((f) => {
    f.preventDefault(), i(!0);
  }, []), m = Q(
    (f) => {
      if (!a) return;
      const u = window.innerWidth - f.clientX, p = Math.max(n, Math.min(s, u));
      t(p);
    },
    [a, n, s, t]
  ), h = Q(() => {
    i(!1);
  }, []);
  return P(() => {
    if (a)
      return document.addEventListener("mousemove", m), document.addEventListener("mouseup", h), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", h), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [a, m, h]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: l,
      onMouseEnter: () => d(!0),
      onMouseLeave: () => d(!1),
      style: {
        width: "8px",
        height: "100vh",
        cursor: "col-resize",
        position: "relative",
        flexShrink: 0,
        transition: a ? "none" : "background-color 0.2s ease",
        backgroundColor: a ? "#1890ff" : r ? "#bfbfbf" : "#e8e8e8",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            width: "3px",
            height: "40px",
            borderRadius: "2px",
            backgroundColor: a || r ? "#fff" : "#999",
            opacity: a || r ? 1 : 0.5,
            transition: "opacity 0.2s ease",
            pointerEvents: "none"
          }
        }
      )
    }
  );
}, _e = Wt(() => Promise.resolve().then(() => vs)), ds = U(({ token: t, css: n }) => ({
  siderLayout: n`
      position: relative;
      height: 100vh;
    `,
  floatSiderLayout: n`
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
})), Us = () => {
  const { visible: t, setVisible: n, setLoaded: s } = H();
  return P(() => {
    s(!0);
  }, [s]), /* @__PURE__ */ e.jsx(
    J,
    {
      width: 1200,
      open: t,
      closable: !1,
      onCancel: () => n(!1),
      footer: null,
      children: ze(_e)
    }
  );
}, Ws = () => {
  const { styles: t } = ds(), { layout: n, visible: s } = H(), [a, i] = v(() => {
    const l = localStorage.getItem("ai-sidebar-width");
    return l ? parseInt(l, 10) : 400;
  }), { setLoaded: r } = H();
  P(() => {
    r(!0);
  }, [r]), P(() => {
    localStorage.setItem("ai-sidebar-width", a.toString());
  }, [a]);
  const d = (l) => {
    i(l);
  };
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs(
    "div",
    {
      style: {
        width: `${a}px`,
        display: s ? "flex" : "none",
        overflow: "hidden",
        flexShrink: 0
      },
      className: Ae("ai-sidebar-layout", n === "float-sidebar" ? t.floatSiderLayout : t.siderLayout),
      children: [
        /* @__PURE__ */ e.jsx(
          cs,
          {
            onResize: d,
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
              borderRadius: n === "float-sidebar" ? "12px" : "0"
            },
            children: /* @__PURE__ */ e.jsx("div", { children: ze(_e) })
          }
        )
      ]
    }
  ) });
}, Ks = () => {
  const { setVisible: t, visible: n } = H(), { t: s } = k("ai");
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    Ie,
    {
      title: s("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
      placement: "left",
      style: { display: n ? "none" : "block" },
      children: /* @__PURE__ */ e.jsx(
        yt,
        {
          icon: /* @__PURE__ */ e.jsx(_t, {}),
          type: "primary",
          onClick: () => t(!0),
          style: {
            right: 24,
            bottom: 24,
            display: n ? "none" : "block"
          }
        }
      )
    }
  ) });
}, us = ({
  permission: t,
  permissions: n = [],
  checkAll: s = !1,
  fallback: a = null,
  children: i
}) => {
  const { hasPermission: r, hasAnyPermission: d, hasAllPermissions: l, isAdmin: m, loading: h } = oe();
  return h ? null : m ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : n.length > 0 ? (s ? l(n) : d(n)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: i });
}, Xs = ({
  fallback: t = null,
  children: n
}) => {
  const { isAdmin: s, loading: a } = oe();
  return a ? null : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, W = (t) => {
  const [n, s] = v(!1), { permission: a, icon: i, tooltip: r, onClick: d, confirm: l, label: m, ...h } = t;
  return a ? /* @__PURE__ */ e.jsx(us, { permission: a, children: W({ icon: i, tooltip: r, onClick: d, confirm: l, label: m, ...h }) }, t.key) : l ? /* @__PURE__ */ e.jsx(re, { title: l.title, onConfirm: l.onConfirm || d, okText: l.okText, cancelText: l.cancelText, children: W({ icon: i, tooltip: r, label: m, ...h }) }, t.key) : r ? /* @__PURE__ */ e.jsx(Ie, { title: r, children: W({ icon: i, onClick: d, label: m, ...h }) }, t.key) : /* @__PURE__ */ Kt(S, { type: "text", size: "small", loading: n, icon: i, onClick: d ? async () => {
    console.log(/* @__PURE__ */ new Date(), "handleClick"), s(!0);
    try {
      await d();
    } finally {
      s(!1), console.log(/* @__PURE__ */ new Date(), "handleClick1");
    }
  } : void 0, ...h, key: t.key }, m && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: m }));
}, Gs = ({ actions: t }) => t.filter((n) => !n.hidden).map((n) => W(n)), ms = At, hs = (t) => ms[t], Js = ({ iconName: t }) => {
  if (!t)
    return null;
  const n = hs(t);
  return n ? /* @__PURE__ */ e.jsx(Xt, { fallback: null, children: /* @__PURE__ */ e.jsx(n, {}) }) : null;
}, Ys = ({ onChange: t }) => {
  const [n, s] = v(""), [a, i] = v("");
  return /* @__PURE__ */ e.jsxs(M.Compact, { children: [
    /* @__PURE__ */ e.jsx(F, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (r) => s(r.target.value) }),
    /* @__PURE__ */ e.jsx(F, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(F, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => i(r.target.value) }),
    /* @__PURE__ */ e.jsx(S, { type: "primary", icon: /* @__PURE__ */ e.jsx(ie, {}), onClick: () => {
      t(n, a);
    } })
  ] });
}, ps = ({ request: t, tableRef: n, ...s }, a) => {
  const [i, r] = v({
    current: 1,
    pageSize: 10
  }), [d, l] = v(0), { data: m, loading: h, refresh: f } = $(async () => {
    const u = await t({
      current: i.current,
      page_size: i.pageSize
    });
    return l(u.total), u.data;
  }, {
    refreshDeps: [i]
  });
  return Jt(a, () => ({
    reload: () => {
      f();
    }
  })), /* @__PURE__ */ e.jsx(
    le,
    {
      rowKey: "id",
      loading: h,
      dataSource: m ?? [],
      pagination: {
        ...i,
        total: d,
        onChange: (u, p) => {
          r({ current: u, pageSize: p });
        }
      },
      ...s,
      ref: n
    }
  );
}, Qs = ({ actionRef: t, ...n }) => {
  const [s, a] = v();
  return P(() => {
    a(Gt(ps));
  }, []), s ? /* @__PURE__ */ e.jsx(s, { ...n, ref: t }) : null;
}, gs = U(({ token: t, css: n }) => ({
  siderLayout: n`
      width: 100%;
      height: calc(100vh - 100px);
      display: flex;
      background: ${t.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${t.fontFamily}, sans-serif;
    `,
  classicLayout: n`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${t.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${t.fontFamily}, sans-serif;
    `,
  sider: n`
      background: ${t.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,
  logo: n`
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;
      gap: 8px;
      margin: 24px 0;

      span {
        font-weight: bold;
        color: ${t.colorText};
        font-size: 16px;
      }
    `,
  addBtn: n`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,
  conversationsSpin: n`
      height: 100%;
      overflow-y: auto;
    `,
  conversations: n`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
  siderFooter: n`
      border-top: 1px solid ${t.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
  chat: n`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${t.paddingLG}px;
      gap: 16px;
    `,
  chatPrompt: n`
      .ant-prompts-label {
        color: #000000e0 !important;
      }
      .ant-prompts-desc {
        color: #000000a6 !important;
        width: 100%;
      }
      .ant-prompts-icon {
        color: #000000a6 !important;
      }
    `,
  chatList: n`
      flex: 1;
      overflow: auto;
      .ant-spin-nested-loading{
        height: 100%;
        .ant-spin-container{
          height: 100%;
        }
      }
      .ant-bubble > .ant-bubble-content{
        max-width: 90%;
      }
      .ant-bubble-end{
        .ant-bubble-content{
          background-color: rgb(22 119 255 / 15%);
        }
      }
      .ant-bubble-list-autoscroll{
        flex-direction: column-reverse;
      }
    `,
  loadingMessage: n`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,
  placeholder: n`
      padding-top: 32px;
    `,
  sender: n`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,
  speechButton: n`
      font-size: 18px;
      color: ${t.colorText} !important;
    `,
  senderPrompt: n`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${t.colorText};
    `
}));
class xs extends Error {
  constructor(s, a) {
    super(s);
    pe(this, "buffer");
    this.buffer = a;
  }
}
class fs extends ot {
  transformParams(n, s) {
    if (typeof n != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(s == null ? void 0 : s.params) || {},
      ...n || {}
    };
  }
  transformLocalMessage({ content: n }) {
    return {
      content: n,
      role: "user"
    };
  }
  transformMessage(n) {
    const { originMessage: s, chunk: a } = n || {};
    if (!a)
      return {
        content: (s == null ? void 0 : s.content) || "",
        role: "assistant"
      };
    const i = JSON.parse(a.data), r = (s == null ? void 0 : s.content) || "";
    switch (i.event_type) {
      case "content":
        return {
          content: `${r || ""}${i.content || ""}`,
          role: "assistant"
        };
      case "tool_call":
        return {
          content: r.endsWith("<br/>") ? `${r}${i.content || ""}` : `${r}<br/>${i.content || ""}`,
          role: "assistant"
        };
      case "error":
        return {
          content: r,
          role: "assistant",
          error: i.content
        };
    }
  }
}
const te = /* @__PURE__ */ new Map(), ys = (t) => (te.get(t) || te.set(
  t,
  new fs({
    request: it(
      `/api/ai/chat/sessions/${t}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (n, s) => {
            const a = localStorage.getItem("orgID"), { sessionId: i } = s.params, r = {
              ...s.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...a ? { "X-Scope-OrgID": a } : {}
            };
            return [i ? `/api/ai/chat/sessions/${i}` : n, { ...s, headers: r }];
          }
        }
      }
    )
  })
), te.get(t)), Me = () => {
  const t = jt.useToken(), n = G.useMemo(() => {
    var a;
    return ((a = t == null ? void 0 : t.theme) == null ? void 0 : a.id) === 0;
  }, [t]);
  return [G.useMemo(() => n ? "x-markdown-light" : "x-markdown-dark", [n])];
}, js = G.createContext({}), bs = () => {
  const {
    layout: t,
    setVisible: n,
    setLayout: s,
    onCallAI: a,
    activeConversationKey: i,
    setActiveConversationKey: r,
    conversations: d,
    fetchConversationsLoading: l
  } = H(), { t: m } = k("ai"), { t: h } = k("common"), { styles: f } = gs(), u = (o) => ({
    key: o.id,
    label: o.title,
    group: Z(o.start_time).isSame(Z(), "day") ? m("chat.today") : Z(o.start_time).format("YYYY-MM-DD")
  }), {
    conversations: p,
    activeConversationKey: y,
    setActiveConversationKey: c,
    addConversation: g,
    setConversations: z,
    getConversation: x,
    setConversation: L,
    removeConversation: A,
    getMessages: _
  } = et({
    defaultActiveConversationKey: i,
    defaultConversations: (d == null ? void 0 : d.map((o) => u(o))) || []
  }), [V] = Me(), [ce, $e] = C.useMessage(), [de, ue] = v(""), [B, me] = v(), { onRequest: he, messages: R, isRequesting: Re, abort: De, onReload: Ve, setMessages: Ee, setMessage: Oe } = tt({
    provider: ys(y),
    // every conversation has its own provider
    conversationKey: y,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: h("loading"),
      role: "assistant"
    }),
    requestFallback: (o, { error: w }) => w instanceof xs ? {
      content: w.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: w.message
    } : {
      content: `${w}`,
      role: "assistant"
    }
  }), Ne = (o) => {
    if (o) {
      if (!y) {
        E(o);
        return;
      }
      he({
        content: o
      });
    }
  }, { run: Be, loading: qe } = $(async (o) => await I.ai.getChatSession({ sessionId: o }), {
    manual: !0,
    onError: () => {
      C.error(m("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (o) => {
      if (R && R.length > 0 && (R[R.length - 1].status === "loading" || R.length > o.messages.length))
        return;
      const w = [];
      let j = { id: "", message: { content: "", role: "assistant" }, status: "success" };
      for (const T of o.messages)
        switch (T.role) {
          case "assistant":
            j.status = T.status === "completed" && j.status === "success" ? "success" : "error", j.message.role = "assistant", j.id = T.id, T.tool_calls && T.tool_calls.length > 0 ? j.message.content.endsWith("<br/>") ? j.message.content = `${j.message.content}${T.content}` : j.message.content = `${j.message.content}<br/>${T.content}` : j.message.content = `${j.message.content}${T.content}`;
            break;
          case "user":
          case "system":
            j.message.content.length > 0 && (w.push({
              id: j.id,
              message: {
                content: j.message.content,
                role: j.message.role
              },
              status: j.status
            }), j = { id: "", message: { content: "", role: "assistant" }, status: "success" }), w.push({
              id: T.id,
              message: {
                content: T.content,
                role: T.role
              },
              status: T.status === "completed" ? "success" : "error"
            });
            break;
        }
      j.message.content.length > 0 && w.push({
        id: j.id,
        message: {
          content: j.message.content,
          role: j.message.role
        },
        status: j.status
      }), Ee(w);
    }
  }), { run: E, loading: Y } = $(async (o, w) => await I.ai.createChatSession({
    title: m("chat.defaultConversationTitle"),
    model_id: "",
    messages: w || []
  }), {
    manual: !0,
    onError: () => {
      C.error(m("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (o, [w]) => {
      g(u(o), "prepend"), w && me({ message: w, sessionId: o.id }), c(o.id), r(o.id);
    }
  });
  P(() => {
    z((d == null ? void 0 : d.map((o) => u(o))) || []);
  }, [d]);
  const { run: He } = $(async (o) => await I.ai.deleteChatSession({ sessionId: o }), {
    manual: !0,
    onError(o, [w]) {
      ce.error(m("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const j = x(w);
      j && L(w, { ...j, loading: !1 });
    },
    onSuccess(o, [w]) {
      A(w);
    }
  }), { run: Ue } = $(async (o) => I.ai.generateChatSessionTitle({ sessionId: o }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: o }, [w]) => {
      const j = x(w);
      j && L(w, { ...j, title: o, loading: !1 });
    },
    onError: (o, [w]) => {
      ce.error(m("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: o.message || o }));
      const j = x(w);
      j && L(w, { ...j, loading: !1 });
    }
  });
  P(() => {
    y && (B == null ? void 0 : B.sessionId) === y && (he({
      content: B.message
    }), me(void 0));
  }, [y, B]), P(() => {
    if (y) {
      const o = _(y);
      if (o && o.length > 0)
        return;
      Be(y);
    }
  }, [y]), P(() => {
    a && E && a((o, w) => {
      E(o, w);
    });
  }, [E, a]);
  const We = /* @__PURE__ */ e.jsxs("div", { className: f.sider, children: [
    /* @__PURE__ */ e.jsx(
      S,
      {
        onClick: () => {
          E();
        },
        type: "link",
        className: f.addBtn,
        icon: /* @__PURE__ */ e.jsx(ie, {}),
        loading: Y,
        children: m("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ e.jsx(N, { spinning: l, wrapperClassName: f.conversationsSpin, children: /* @__PURE__ */ e.jsx(
      st,
      {
        items: p,
        activeKey: y,
        onActiveChange: async (o) => {
          o && (c(o), r(o));
        },
        className: f.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (o) => ({
          items: [
            {
              label: m("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ e.jsx(Le, {}),
              onClick: () => {
                L(o.key, { ...o, loading: !0 }), Ue(o.key);
              }
            },
            {
              label: h("delete"),
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Mt, {}),
              danger: !0,
              onClick: () => {
                L(o.key, { ...o, loading: !0 }), He(o.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Ke = ({ message: o }) => {
    if (o.error)
      return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(ge, { content: o.error }) });
  }, Xe = R == null ? void 0 : R.map((o) => ({
    ...o.message,
    key: o.id,
    contentRender: (w) => /* @__PURE__ */ e.jsx(
      ge,
      {
        paragraphTag: "div",
        content: w,
        className: V
      }
    ),
    footer: Ke(o)
  })), Ge = /* @__PURE__ */ e.jsx("div", { className: f.chatList, children: /* @__PURE__ */ e.jsx(N, { spinning: qe || Y, children: /* @__PURE__ */ e.jsx(
    nt.List,
    {
      items: Xe,
      style: {
        height: "100%",
        paddingInline: t === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ e.jsx(N, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ e.jsx(N, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) }), Je = /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    at,
    {
      value: de,
      onSubmit: async () => {
        Ne(de.trim()), ue("");
      },
      onChange: ue,
      onCancel: () => {
        De();
      },
      loading: Re,
      className: f.sender,
      placeholder: m("chat.inputPlaceholder")
    }
  ) });
  return /* @__PURE__ */ e.jsxs(rt, { children: [
    $e,
    /* @__PURE__ */ e.jsxs(js.Provider, { value: { onReload: Ve, setMessage: Oe }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
        /* @__PURE__ */ e.jsx(
          bt.Group,
          {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            options: [
              {
                label: /* @__PURE__ */ e.jsx($t, {}),
                value: "classic"
              },
              {
                label: /* @__PURE__ */ e.jsx(be, {}),
                value: "sidebar"
              },
              {
                label: /* @__PURE__ */ e.jsx(be, {}),
                value: "float-sidebar"
              }
            ],
            optionType: "button",
            onChange: (o) => s(o.target.value),
            value: t
          }
        ),
        /* @__PURE__ */ e.jsxs(M, { style: { float: "right", marginTop: 10 }, children: [
          /* @__PURE__ */ e.jsx(
            S,
            {
              type: "primary",
              onClick: () => {
                E();
              },
              loading: Y,
              icon: /* @__PURE__ */ e.jsx(ie, {}),
              style: { display: t === "classic" ? "none" : "block" }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Ce,
            {
              menu: {
                items: p.map((o) => ({
                  label: o.label,
                  key: o.key
                })),
                onClick: ({ key: o }) => {
                  c(o), r(o);
                }
              },
              placement: "bottomRight",
              children: /* @__PURE__ */ e.jsx(S, { icon: l ? /* @__PURE__ */ e.jsx(N, { size: "small" }) : /* @__PURE__ */ e.jsx(Rt, {}), style: { display: t === "classic" ? "none" : "block" } })
            }
          ),
          /* @__PURE__ */ e.jsx(S, { type: "text", onClick: () => n(!1), children: /* @__PURE__ */ e.jsx(Dt, {}) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: t === "classic" ? f.classicLayout : f.siderLayout, style: {
        minWidth: t === "classic" ? "500px" : "400px"
      }, children: [
        t === "classic" ? We : null,
        /* @__PURE__ */ e.jsxs("div", { className: f.chat, children: [
          Ge,
          Je
        ] })
      ] })
    ] })
  ] });
}, vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bs,
  useMarkdownTheme: Me
}, Symbol.toStringTag, { value: "Module" })), Zs = ({ onSuccess: t, token: n }) => {
  const { t: s } = k("authorization"), { t: a } = k("common"), [i] = b.useForm(), { run: r, loading: d } = $(async (l) => I.authorization.changePassword(l, n ? { headers: { Authorization: `Bearer ${n}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      C.success(s("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (l) => {
      if (l instanceof Yt) {
        const m = l.code ?? "normal";
        C.error(s(`user.passwordChangeFailed.${m}`, { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        C.error(s("user.passwordChangeFailed.normal", { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", l);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    b,
    {
      form: i,
      layout: "vertical",
      onFinish: r,
      style: { maxWidth: 500, margin: "0 auto" },
      children: [
        /* @__PURE__ */ e.jsx(
          b.Item,
          {
            name: "old_password",
            label: s("user.oldPassword"),
            rules: [{ required: !0, message: s("validation.oldPasswordRequired") }],
            children: /* @__PURE__ */ e.jsx(F.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          b.Item,
          {
            name: "new_password",
            label: s("user.newPassword"),
            rules: [
              { required: !0, message: s("validation.newPasswordRequired") },
              { min: 8, message: s("validation.passwordMinLength") }
            ],
            children: /* @__PURE__ */ e.jsx(F.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          b.Item,
          {
            name: "confirm_password",
            label: s("user.confirmPassword"),
            rules: [
              { required: !0, message: s("validation.confirmPasswordRequired") },
              ({ getFieldValue: l }) => ({
                validator(m, h) {
                  return !h || l("new_password") === h ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(F.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(b.Item, { children: /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", loading: d, children: a("save") }) })
      ]
    }
  );
}, en = ({ user: t, onSuccess: n }) => {
  const { t: s } = k("authorization"), { t: a } = k("common"), [i] = b.useForm(), [r, d] = v(!1);
  G.useEffect(() => {
    t && i.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, i]);
  const l = async (m) => {
    try {
      d(!0), await I.authorization.updateCurrentUser(m), C.success(a("updateSuccess")), n();
    } catch (h) {
      C.error(a("updateFailed")), console.error("Failed to update user information:", h);
    } finally {
      d(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        s("user.roles"),
        ": ",
        t.roles.map((m) => m.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      b,
      {
        form: i,
        layout: "vertical",
        onFinish: l,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(ls, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "username",
              label: s("user.username"),
              children: /* @__PURE__ */ e.jsx(F, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "email",
              label: s("user.email"),
              rules: [
                { required: !0, message: s("validation.emailRequired") },
                { type: "email", message: s("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(F, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "full_name",
              label: s("user.fullName"),
              rules: [{ required: !0, message: s("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(F, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "phone",
              label: s("user.phone"),
              children: /* @__PURE__ */ e.jsx(F, {})
            }
          ),
          /* @__PURE__ */ e.jsx(b.Item, { children: /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", loading: r, children: a("save") }) })
        ]
      }
    )
  ] });
}, tn = ({ user: t, onSuccess: n }) => {
  const { t: s } = k("authorization"), { t: a } = k("common"), [i, r] = v(0), [d, l] = v(!1), [m, h] = v(!0), [f, u] = v(""), [p, y] = v("totp"), { run: c, data: g = { secret: "", qr_code: "", token: void 0 } } = $(
    () => I.authorization.enableMfa(p),
    {
      manual: !0,
      onSuccess: () => {
        r(1);
      },
      onBefore: () => {
        l(!0);
      },
      onFinally: () => {
        l(!1);
      }
    }
  ), z = async () => {
    if (!f) {
      C.warning(s("mfa.enterVerificationCode"));
      return;
    }
    const A = {
      code: f,
      mfa_type: p
    };
    "token" in g && (A.token = g.token);
    try {
      l(!0), await I.authorization.verifyAndActivateMfa(A), C.success(s("mfa.enableSuccess")), r(2), n();
    } catch (_) {
      C.error(s("mfa.verificationFailed")), console.error("Failed to verify MFA:", _);
    } finally {
      l(!1);
    }
  }, x = async () => {
    try {
      l(!0), await I.authorization.disableMfa(), C.success(s("mfa.disableSuccess")), n();
    } catch (A) {
      C.error(a("operationFailed")), console.error("Failed to disable MFA:", A);
    } finally {
      l(!1);
    }
  }, L = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        ae,
        {
          status: "success",
          title: s("mfa.enabled"),
          subTitle: s("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            S,
            {
              danger: !0,
              onClick: () => {
                J.confirm({
                  title: s("mfa.confirmDisable"),
                  content: s("mfa.disableWarning"),
                  onOk: x,
                  okButtonProps: { danger: !0 }
                });
              },
              children: s("mfa.disable")
            }
          )
        }
      );
    const A = () => {
      var _;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              fe,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: s("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: s(p === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
                ] }),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20 }
              }
            ),
            /* @__PURE__ */ e.jsx(
              S,
              {
                type: "primary",
                onClick: c,
                loading: d,
                children: s("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              fe,
              {
                message: s("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: p === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: p === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(St, { value: g.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: p === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: p === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: m ? "*".repeat(((_ = g.secret) == null ? void 0 : _.length) ?? 0) : g.secret }),
              /* @__PURE__ */ e.jsx(
                S,
                {
                  type: "link",
                  onClick: () => h(!m),
                  icon: m ? /* @__PURE__ */ e.jsx(Fe, {}) : /* @__PURE__ */ e.jsx(Ot, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              F,
              {
                placeholder: s("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: f,
                onChange: (V) => u(V.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(M, { children: [
              /* @__PURE__ */ e.jsx(S, { onClick: () => r(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                S,
                {
                  type: "primary",
                  onClick: z,
                  loading: d,
                  children: a("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            ae,
            {
              status: "success",
              title: s("mfa.setupSuccess"),
              subTitle: s("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(S, { type: "primary", onClick: () => r(0), children: a("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: i === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          vt,
          {
            defaultValue: "totp",
            onChange: (_) => {
              y(_), r(0);
            },
            value: p,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Vt, {}), label: s("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Et, {}), label: s("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(ke, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        wt,
        {
          current: i,
          items: [
            { title: s(p === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: s(p === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: s(p === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: s(p === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: s(p === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: s(p === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      A()
    ] });
  };
  return /* @__PURE__ */ e.jsx(K, { title: s("mfa.title"), children: L() });
}, { Text: se } = Ct, sn = () => {
  const { t } = k("authorization"), { t: n } = k("common"), [s, a] = v([]), [i, r] = v(!1), [d, l] = v(null), [m, h] = v(!1), f = async () => {
    try {
      r(!0);
      const c = await I.authorization.getUserSessions({});
      a(c);
    } catch (c) {
      C.error(t("session.getSessionsFailed", { error: c, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      r(!1);
    }
  };
  P(() => {
    f();
  }, []);
  const u = async (c) => {
    try {
      l(c), await I.authorization.terminateSession({ id: c }), a(s.filter((g) => g.id !== c)), C.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (g) {
      C.error(t("session.terminateFailed", { error: g, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      l(null);
    }
  }, p = async () => {
    try {
      h(!0), await I.authorization.terminateOtherSessions(), a(s.filter((c) => c.is_current)), C.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (c) {
      C.error(t("session.terminateAllFailed", { error: c, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      h(!1);
    }
  }, y = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (c, g) => /* @__PURE__ */ e.jsxs(M, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(M, { children: [
          /* @__PURE__ */ e.jsx(Nt, {}),
          /* @__PURE__ */ e.jsx(se, { strong: !0, children: c })
        ] }),
        /* @__PURE__ */ e.jsxs(M, { children: [
          /* @__PURE__ */ e.jsx(Bt, {}),
          /* @__PURE__ */ e.jsx(se, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (c) => /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(qt, {}),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (c) => /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(Ht, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(c).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(X, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(X, { color: "blue", children: t("session.active") })
    },
    {
      title: n("actions"),
      key: "action",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(se, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        re,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => u(c.id),
          okText: n("confirm"),
          cancelText: n("cancel"),
          children: /* @__PURE__ */ e.jsx(
            S,
            {
              type: "link",
              danger: !0,
              loading: d === c.id,
              children: t("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsx(
    K,
    {
      title: t("session.title"),
      extra: s.length > 1 && /* @__PURE__ */ e.jsx(
        re,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: p,
          okText: n("confirm"),
          cancelText: n("cancel"),
          children: /* @__PURE__ */ e.jsx(
            S,
            {
              danger: !0,
              loading: m,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: s.length === 0 ? /* @__PURE__ */ e.jsx(kt, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        le,
        {
          columns: y,
          dataSource: s,
          rowKey: "id",
          loading: i,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: ws } = It, { Option: O } = D, Ss = (t) => t || "N/A", Cs = (t, n) => t === "success" ? /* @__PURE__ */ e.jsx(X, { color: "success", children: n("statuses.success") }) : /* @__PURE__ */ e.jsx(X, { color: "error", children: n("statuses.failed") }), nn = ({
  userId: t,
  request: n = (a) => t ? I.authorization.getUserLogs({ id: t, ...a }) : I.authorization.getCurrentUserLogs(a),
  columnsFilter: s = (a) => a
}) => {
  const { t: a } = k("authorization"), { t: i } = k("common"), [r, d] = v({
    current: 1,
    pageSize: 10,
    total: 0
  }), [l, m] = v({}), [h] = b.useForm(), { loading: f, run: u, data: { data: p } = {} } = $(async (x = l, L = 1, A = 10) => n({
    ...x,
    current: L ?? 1,
    page_size: A ?? 10
  }), {
    onError(x) {
      C.error(a("auditLog.fetchFailed", { error: x }));
    },
    onSuccess({ total: x }) {
      d({
        ...r,
        total: x
      });
    }
  });
  P(() => {
    u(l, 1, r.pageSize);
  }, []);
  const y = (x) => {
    d({
      ...r,
      current: x.current,
      pageSize: x.pageSize
    }), u({}, x.current, x.pageSize);
  }, c = (x) => {
    var L, A, _, V;
    u({
      ...x,
      start_time: (A = (L = x.dateRange) == null ? void 0 : L[0]) == null ? void 0 : A.toISOString(),
      end_time: (V = (_ = x.dateRange) == null ? void 0 : _[1]) == null ? void 0 : V.toISOString()
    }, 1, r.pageSize);
  }, g = () => {
    h.resetFields(), m({}), d({ ...r, current: 1 }), u({}, 1, r.pageSize);
  }, z = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (x) => ut(x)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (x, L) => x ? a(`action.${x.replace(":", ".")}`, { defaultValue: L.action_name }) : L.action_name ?? L.action
    },
    {
      title: a("auditLog.user_agent"),
      dataIndex: "user_agent",
      key: "user_agent"
    },
    {
      title: a("auditLog.ip"),
      dataIndex: "ip",
      key: "ip",
      render: (x) => Ss(x)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (x) => Cs(x, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (x) => /* @__PURE__ */ e.jsx(S, { type: "link", icon: /* @__PURE__ */ e.jsx(Fe, {}), onClick: () => {
        J.info({
          title: a("auditLog.details"),
          content: JSON.stringify(x)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(K, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      b,
      {
        form: h,
        layout: "horizontal",
        onFinish: c,
        initialValues: l,
        children: [
          /* @__PURE__ */ e.jsxs(ye, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(q, { span: 6, children: /* @__PURE__ */ e.jsx(b.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(F, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(q, { span: 6, children: /* @__PURE__ */ e.jsx(b.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs(D, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(O, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(O, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(O, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(O, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(q, { span: 6, children: /* @__PURE__ */ e.jsx(b.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs(D, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(O, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(O, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(q, { span: 6, children: /* @__PURE__ */ e.jsx(b.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(ws, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsx(q, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(S, { onClick: g, children: i("reset") }),
            /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ut, {}), children: i("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(K, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        S,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Le, {}),
          onClick: g,
          style: { marginRight: 8 },
          children: i("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        le,
        {
          rowKey: "id",
          columns: s(z),
          dataSource: p,
          pagination: {
            ...r,
            showSizeChanger: !0,
            showTotal: (x) => i("totalItems", { total: x })
          },
          loading: f,
          onChange: y,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { TextArea: we } = F, { Option: ne } = D, an = ({
  field: t,
  selectedType: n,
  dependentValues: s,
  formValues: a = {}
}) => {
  const { t: i } = k("system"), { t: r } = k("common"), d = ve(() => mt(t.visible_when, a), [t.visible_when, a]), { options: l, loading: m } = ct(
    t.data_source,
    t.options,
    s
  ), h = ve(() => t.data_source && t.data_source.type !== "static" ? l : t.options || [], [t.data_source, t.options, l]), f = h && h.length > 0;
  if (!d)
    return null;
  const u = [
    {
      required: t.required,
      message: i("settings.toolsets.fieldRequired", {
        defaultValue: `Please enter ${t.name}`,
        field: t.name
      })
    }
  ], p = () => i(`settings.toolsets.${n}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), y = () => i(`settings.toolsets.${n}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${r("enter", { defaultValue: "Enter" })} ${t.name}`
  }), c = () => {
    if (t.description)
      return i(`settings.toolsets.${n}.${t.name}Tooltip`, {
        defaultValue: t.description
      });
  };
  if (!d)
    return null;
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      b.Item,
      {
        name: ["config", t.name],
        label: p(),
        rules: u,
        tooltip: c(),
        children: /* @__PURE__ */ e.jsx(
          D,
          {
            loading: m,
            allowClear: !0,
            placeholder: y(),
            showSearch: !0,
            filterOption: (g, z) => {
              var x;
              return (x = z == null ? void 0 : z.children) == null ? void 0 : x.toLowerCase().includes(g.toLowerCase());
            },
            children: h.map((g) => /* @__PURE__ */ e.jsx(ne, { value: g.value, children: g.label }, g.value))
          }
        )
      },
      t.name
    );
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          children: /* @__PURE__ */ e.jsx(we, { placeholder: y(), rows: 4 })
        },
        t.name
      );
    case "string":
      return f ? /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(D, { allowClear: !0, placeholder: y(), children: h.map((g) => /* @__PURE__ */ e.jsx(ne, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(F, { placeholder: y() })
        },
        t.name
      );
    case "password":
      return /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(F.Password, { placeholder: y(), autoComplete: "new-password" })
        },
        t.name
      );
    case "number":
      return f ? /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(D, { allowClear: !0, placeholder: y(), children: h.map((g) => /* @__PURE__ */ e.jsx(ne, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(Ft, { style: { width: "100%" }, placeholder: y() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: p(),
          valuePropName: "checked",
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(Lt, {})
        },
        t.name
      );
    case "array":
      return f ? /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(je.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(M, { direction: "vertical", children: h.map((g) => /* @__PURE__ */ e.jsx(je, { value: g.value, children: g.label }, g.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(
            D,
            {
              mode: "tags",
              style: { width: "100%" },
              placeholder: y(),
              tokenSeparators: [","]
            }
          )
        },
        t.name
      );
    case "object":
      return /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: [
            ...u,
            {
              validator: (g, z) => {
                if (!z) return Promise.resolve();
                try {
                  return JSON.parse(z), Promise.resolve();
                } catch {
                  return Promise.reject(
                    new Error(
                      i("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON format" })
                    )
                  );
                }
              }
            }
          ],
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(
            we,
            {
              rows: 4,
              placeholder: y()
            }
          )
        },
        t.name
      );
    default:
      return null;
  }
};
export {
  is as A,
  Js as D,
  Te as H,
  es as L,
  Hs as O,
  Bs as P,
  Qs as T,
  nn as U,
  qs as a,
  Ks as b,
  Us as c,
  Ws as d,
  Gs as e,
  ls as f,
  hs as g,
  Ys as h,
  as as i,
  us as j,
  Xs as k,
  bs as l,
  Zs as m,
  en as n,
  tn as o,
  sn as p,
  an as q
};
