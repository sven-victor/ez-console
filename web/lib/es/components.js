var Qe = Object.defineProperty;
var Ze = (t, n, s) => n in t ? Qe(t, n, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[n] = s;
var pe = (t, n, s) => Ze(t, typeof n != "symbol" ? n + "" : n, s);
import { j as e, I as et, u as tt, a as st, C as nt, X as ge, F as at, S as rt, b as it, c as ot, A as lt } from "./vendor.js";
import { Navigate as xe } from "react-router-dom";
import { u as Ce, a as ie, b as ct, c as H, d as dt } from "./contexts.js";
import { g as ut, f as mt, c as ht } from "./base.js";
import { Spin as N, Result as ne, Dropdown as oe, Avatar as pt, Upload as gt, Modal as U, Popover as xt, List as ft, Divider as ke, Skeleton as yt, Tooltip as Ie, FloatButton as jt, Button as S, Popconfirm as ae, Space as M, Input as A, Table as le, theme as bt, message as C, Radio as vt, Form as b, Card as K, Segmented as wt, Steps as St, Alert as fe, QRCode as Ct, Typography as kt, Tag as X, Empty as It, Row as ye, Col as q, Select as D, DatePicker as Ft, Checkbox as je, Switch as Lt, InputNumber as At } from "antd";
import { useTranslation as k } from "react-i18next";
import { createStyles as W } from "antd-style";
import * as Tt from "@ant-design/icons";
import { UploadOutlined as zt, CheckOutlined as Pt, TeamOutlined as _t, RobotOutlined as Mt, MoreOutlined as $t, PlusOutlined as re, ReloadOutlined as Fe, DeleteOutlined as Rt, BlockOutlined as Dt, BorderRightOutlined as be, HistoryOutlined as Vt, CloseOutlined as Ot, ClockCircleFilled as Et, MailOutlined as Nt, EyeOutlined as Le, EyeInvisibleOutlined as Bt, LaptopOutlined as qt, EnvironmentOutlined as Ht, GlobalOutlined as Ut, ClockCircleOutlined as Wt, SearchOutlined as Kt } from "@ant-design/icons";
import Ae from "classnames";
import G, { useState as v, useEffect as P, useCallback as Y, lazy as Xt, Suspense as Gt, forwardRef as Jt, useImperativeHandle as Yt, useMemo as ve } from "react";
import { a as I, w as Te } from "./index.js";
import { useRequest as $ } from "ahooks";
import Q from "dayjs";
import { b as Z, A as Qt } from "./client.js";
import Zt from "antd-img-crop";
import { isString as es } from "lodash";
const ts = () => /* @__PURE__ */ e.jsx("div", { style: {
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
  const { t: a } = k(), { user: i, loading: r, error: d } = Ce(), { hasPermission: o, hasAllPermissions: h } = ie();
  return r ? /* @__PURE__ */ e.jsx(ts, {}) : d ? /* @__PURE__ */ e.jsx(
    ne,
    {
      status: "500",
      title: "500",
      subTitle: a("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (d == null ? void 0 : d.message) || d })
    }
  ) : i ? n && !o(n) ? /* @__PURE__ */ e.jsx(xe, { to: "/forbidden", replace: !0 }) : s && !h(s) ? /* @__PURE__ */ e.jsx(xe, { to: "/forbidden", replace: !0 }) : t : (window.location.href = ut("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, ss = W(({ token: t, css: n }) => ({
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
})), ze = ({
  overlayClassName: t,
  overlay: n,
  hidden: s,
  children: a,
  ...i
}) => {
  if (s)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: r } = ss();
  return /* @__PURE__ */ e.jsx(
    oe,
    {
      dropdownRender: n,
      overlayClassName: Ae(r.container, t),
      ...i,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: a })
    }
  );
}, ns = () => /* @__PURE__ */ e.jsxs(
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
), as = W(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), rs = [
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
  const { i18n: n } = k(), { styles: s } = as(), a = (r) => {
    n.changeLanguage(r);
  }, i = {
    selectedKeys: [n.language],
    onClick: (r) => {
      a(r.key);
    },
    items: t(rs).map((r) => ({
      key: r.lang,
      className: s.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: s.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    ze,
    {
      menu: i,
      children: /* @__PURE__ */ e.jsx(ns, {})
    }
  );
}, is = W(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), Pe = (t) => es(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? Z.endsWith("/") ? Z + `files/${t}` : Z + `/files/${t}` : t, os = ({ src: t, fallback: n, ...s }) => /* @__PURE__ */ e.jsx(pt, { src: Pe(t), icon: n, ...s }), ls = ({ onChange: t, shape: n = "square" }) => {
  const [s, a] = v([]), { styles: i } = is(), [r, d] = v(!1), [o, h] = v(!0), [p, g] = v(0), { run: c, loading: m } = $(() => I.base.listFiles({ current: p + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: u }) => {
      a([...s, ...u]), h(u.length === 40), g(p + 1);
    }
  }), y = () => {
    h(!0), g(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    xt,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (u) => {
        d(u), u ? c() : y();
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
            et,
            {
              dataLength: s.length,
              next: () => {
                c();
              },
              hasMore: o,
              loader: /* @__PURE__ */ e.jsx(yt, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(ke, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                ft,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: s,
                  style: { margin: "0 8px" },
                  loading: m,
                  renderItem: ({ id: u }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: i.avatarItem,
                      onClick: (x) => {
                        x.stopPropagation(), t == null || t(u), d(!1), y();
                      },
                      children: /* @__PURE__ */ e.jsx(os, { shape: n, src: u })
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
}, cs = ({ value: t, onChange: n, shape: s, ...a }) => {
  const [i, r] = v(void 0), [d, o] = v(!1), [h, p] = v(void 0), g = async (c) => {
    o(!0), p(c.url ?? c.preview);
  };
  return P(() => {
    r(t ? {
      uid: t,
      name: t,
      url: Pe(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Zt,
      {
        beforeCrop: async (c) => {
          if (c.type === "image/svg+xml") {
            const m = await I.base.uploadFile({ type: "avatar" }, c);
            return m.length > 0 && (n == null || n(m[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          gt,
          {
            customRequest: async (c) => {
              var y, u;
              const m = await I.base.uploadFile({ type: "avatar", access: "public" }, c.file);
              m.length > 0 ? ((y = c.onSuccess) == null || y.call(c, m[0].id), n == null || n(m[0].id)) : (u = c.onError) == null || u.call(c, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: g,
            maxCount: 1,
            onChange: ({ file: c }) => {
              switch (c.status) {
                case "removed":
                  n == null || n(void 0);
                  break;
                case "done":
                  break;
                default:
                  r(c);
                  break;
              }
            },
            fileList: i ? [i] : [],
            ...a,
            children: i ? void 0 : /* @__PURE__ */ e.jsx(ls, { shape: s, onChange: n })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(U, { open: d, footer: null, onCancel: () => o(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: h }) })
  ] });
}, Hs = () => {
  const { t } = k("common"), { user: n } = Ce(), { currentOrgId: s, setCurrentOrgId: a } = ct(), i = (n == null ? void 0 : n.organizations) || [], r = (p) => {
    a(p), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const d = i.find((p) => p.id === s), o = d ? d.name : t("organization.global", { defaultValue: "Global" }), h = [
    ...i.map((p) => ({
      key: p.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: p.name }),
        s === p.id && /* @__PURE__ */ e.jsx(Pt, {})
      ] }),
      onClick: () => r(p.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    ze,
    {
      menu: {
        items: h,
        selectedKeys: s ? [s] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(_t, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: o })
      ]
    }
  );
}, ds = ({
  onResize: t,
  minWidth: n = 300,
  maxWidth: s = window.innerWidth * 0.5
}) => {
  const [a, i] = v(!1), [r, d] = v(!1), o = Y((g) => {
    g.preventDefault(), i(!0);
  }, []), h = Y(
    (g) => {
      if (!a) return;
      const c = window.innerWidth - g.clientX, m = Math.max(n, Math.min(s, c));
      t(m);
    },
    [a, n, s, t]
  ), p = Y(() => {
    i(!1);
  }, []);
  return P(() => {
    if (a)
      return document.addEventListener("mousemove", h), document.addEventListener("mouseup", p), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", p), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [a, h, p]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: o,
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
}, _e = Xt(() => Promise.resolve().then(() => vs)), us = W(({ token: t, css: n }) => ({
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
    U,
    {
      width: 1200,
      open: t,
      closable: !1,
      onCancel: () => n(!1),
      footer: null,
      children: Te(_e)
    }
  );
}, Ws = () => {
  const { styles: t } = us(), { layout: n, visible: s } = H(), [a, i] = v(() => {
    const o = localStorage.getItem("ai-sidebar-width");
    return o ? parseInt(o, 10) : 400;
  }), { setLoaded: r } = H();
  P(() => {
    r(!0);
  }, [r]), P(() => {
    localStorage.setItem("ai-sidebar-width", a.toString());
  }, [a]);
  const d = (o) => {
    i(o);
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
          ds,
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
            children: /* @__PURE__ */ e.jsx("div", { children: Te(_e) })
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
        jt,
        {
          icon: /* @__PURE__ */ e.jsx(Mt, {}),
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
}, Me = ({
  permission: t,
  permissions: n = [],
  checkAll: s = !1,
  fallback: a = null,
  children: i
}) => {
  const { hasPermission: r, hasAnyPermission: d, hasAllPermissions: o, isAdmin: h, loading: p } = ie();
  return p ? null : h ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : n.length > 0 ? (s ? o(n) : d(n)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: i });
}, Xs = ({
  fallback: t = null,
  children: n
}) => {
  const { isAdmin: s, loading: a } = ie();
  return a ? null : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, we = (t) => {
  const [n, s] = v(!1), { permission: a, icon: i, tooltip: r, onClick: d, confirm: o, label: h, ...p } = t, g = d ? async () => {
    s(!0);
    try {
      await d();
    } finally {
      s(!1);
    }
  } : void 0;
  let c = /* @__PURE__ */ e.jsx(
    S,
    {
      type: "text",
      size: "small",
      loading: n,
      icon: i,
      onClick: o ? void 0 : g,
      ...p,
      children: h && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: h })
    }
  );
  if (r && (c = /* @__PURE__ */ e.jsx(Ie, { title: r, children: c })), o) {
    const m = async () => {
      o.onConfirm ? o.onConfirm() : g && await g();
    };
    c = /* @__PURE__ */ e.jsx(
      ae,
      {
        title: o.title,
        description: o.description,
        onConfirm: m,
        okText: o.okText,
        cancelText: o.cancelText,
        children: c
      }
    );
  }
  return a && (c = /* @__PURE__ */ e.jsx(Me, { permission: a, children: c })), c;
}, Gs = ({ actions: t, maxVisibleItems: n }) => {
  const s = t.filter((d) => !d.hidden);
  if (!n || s.length <= n)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: s.map(({ key: d, ...o }) => /* @__PURE__ */ e.jsx(we, { ...o }, d)) });
  const a = s.slice(0, n - 1), r = s.slice(n - 1).map((d) => {
    const { key: o, label: h, icon: p, permission: g, onClick: c, confirm: m, disabled: y, tooltip: u } = d, L = {
      key: o,
      label: h,
      icon: p,
      disabled: y,
      onClick: async () => {
        m ? U.confirm({
          title: m.title,
          content: m.description,
          onOk: m.onConfirm,
          okText: m.okText,
          cancelText: m.cancelText
        }) : c && await c();
      }
    };
    return g ? {
      ...L,
      label: /* @__PURE__ */ e.jsx(Me, { permission: g, children: /* @__PURE__ */ e.jsx("span", { children: h ?? u }) })
    } : L;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    a.map(({ key: d, ...o }) => /* @__PURE__ */ e.jsx(we, { ...o }, d)),
    /* @__PURE__ */ e.jsx(oe, { menu: { items: r }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(S, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx($t, {}) }) })
  ] });
}, ms = Tt, hs = (t) => ms[t], Js = ({ iconName: t }) => {
  if (!t)
    return null;
  const n = hs(t);
  return n ? /* @__PURE__ */ e.jsx(Gt, { fallback: null, children: /* @__PURE__ */ e.jsx(n, {}) }) : null;
}, Ys = ({ onChange: t }) => {
  const [n, s] = v(""), [a, i] = v("");
  return /* @__PURE__ */ e.jsxs(M.Compact, { children: [
    /* @__PURE__ */ e.jsx(A, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (r) => s(r.target.value) }),
    /* @__PURE__ */ e.jsx(A, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(A, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => i(r.target.value) }),
    /* @__PURE__ */ e.jsx(S, { type: "primary", icon: /* @__PURE__ */ e.jsx(re, {}), onClick: () => {
      t(n, a);
    } })
  ] });
}, ps = ({ request: t, tableRef: n, ...s }, a) => {
  const [i, r] = v({
    current: 1,
    pageSize: 10
  }), [d, o] = v(0), { data: h, loading: p, refresh: g } = $(async () => {
    const c = await t({
      current: i.current,
      page_size: i.pageSize
    });
    return o(c.total), c.data;
  }, {
    refreshDeps: [i]
  });
  return Yt(a, () => ({
    reload: () => {
      g();
    }
  })), /* @__PURE__ */ e.jsx(
    le,
    {
      rowKey: "id",
      loading: p,
      dataSource: h ?? [],
      pagination: {
        ...i,
        total: d,
        onChange: (c, m) => {
          r({ current: c, pageSize: m });
        }
      },
      ...s,
      ref: n
    }
  );
}, Qs = ({ actionRef: t, ...n }) => {
  const [s, a] = v();
  return P(() => {
    a(Jt(ps));
  }, []), s ? /* @__PURE__ */ e.jsx(s, { ...n, ref: t }) : null;
}, gs = W(({ token: t, css: n }) => ({
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
class fs extends lt {
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
const ee = /* @__PURE__ */ new Map(), ys = (t) => (ee.get(t) || ee.set(
  t,
  new fs({
    request: ot(
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
), ee.get(t)), $e = () => {
  const t = bt.useToken(), n = G.useMemo(() => {
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
    fetchConversationsLoading: o
  } = H(), { t: h } = k("ai"), { t: p } = k("common"), { styles: g } = gs(), c = (l) => ({
    key: l.id,
    label: l.title,
    group: Q(l.start_time).isSame(Q(), "day") ? h("chat.today") : Q(l.start_time).format("YYYY-MM-DD")
  }), {
    conversations: m,
    activeConversationKey: y,
    setActiveConversationKey: u,
    addConversation: x,
    setConversations: L,
    getConversation: f,
    setConversation: F,
    removeConversation: T,
    getMessages: _
  } = tt({
    defaultActiveConversationKey: i,
    defaultConversations: (d == null ? void 0 : d.map((l) => c(l))) || []
  }), [V] = $e(), [ce, Re] = C.useMessage(), [de, ue] = v(""), [B, me] = v(), { onRequest: he, messages: R, isRequesting: De, abort: Ve, onReload: Oe, setMessages: Ee, setMessage: Ne } = st({
    provider: ys(y),
    // every conversation has its own provider
    conversationKey: y,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: p("loading"),
      role: "assistant"
    }),
    requestFallback: (l, { error: w }) => w instanceof xs ? {
      content: w.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: w.message
    } : {
      content: `${w}`,
      role: "assistant"
    }
  }), Be = (l) => {
    if (l) {
      if (!y) {
        O(l);
        return;
      }
      he({
        content: l
      });
    }
  }, { run: qe, loading: He } = $(async (l) => await I.ai.getChatSession({ sessionId: l }), {
    manual: !0,
    onError: () => {
      C.error(h("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (l) => {
      if (R && R.length > 0 && (R[R.length - 1].status === "loading" || R.length > l.messages.length))
        return;
      const w = [];
      let j = { id: "", message: { content: "", role: "assistant" }, status: "success" };
      for (const z of l.messages)
        switch (z.role) {
          case "assistant":
            j.status = z.status === "completed" && j.status === "success" ? "success" : "error", j.message.role = "assistant", j.id = z.id, z.tool_calls && z.tool_calls.length > 0 ? j.message.content.endsWith("<br/>") ? j.message.content = `${j.message.content}${z.content}` : j.message.content = `${j.message.content}<br/>${z.content}` : j.message.content = `${j.message.content}${z.content}`;
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
              id: z.id,
              message: {
                content: z.content,
                role: z.role
              },
              status: z.status === "completed" ? "success" : "error"
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
  }), { run: O, loading: J } = $(async (l, w) => await I.ai.createChatSession({
    title: h("chat.defaultConversationTitle"),
    model_id: "",
    messages: w || []
  }), {
    manual: !0,
    onError: () => {
      C.error(h("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (l, [w]) => {
      x(c(l), "prepend"), w && me({ message: w, sessionId: l.id }), u(l.id), r(l.id);
    }
  });
  P(() => {
    L((d == null ? void 0 : d.map((l) => c(l))) || []);
  }, [d]);
  const { run: Ue } = $(async (l) => await I.ai.deleteChatSession({ sessionId: l }), {
    manual: !0,
    onError(l, [w]) {
      ce.error(h("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const j = f(w);
      j && F(w, { ...j, loading: !1 });
    },
    onSuccess(l, [w]) {
      T(w);
    }
  }), { run: We } = $(async (l) => I.ai.generateChatSessionTitle({ sessionId: l }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: l }, [w]) => {
      const j = f(w);
      j && F(w, { ...j, title: l, loading: !1 });
    },
    onError: (l, [w]) => {
      ce.error(h("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: l.message || l }));
      const j = f(w);
      j && F(w, { ...j, loading: !1 });
    }
  });
  P(() => {
    y && (B == null ? void 0 : B.sessionId) === y && (he({
      content: B.message
    }), me(void 0));
  }, [y, B]), P(() => {
    if (y) {
      const l = _(y);
      if (l && l.length > 0)
        return;
      qe(y);
    }
  }, [y]), P(() => {
    a && O && a((l, w) => {
      O(l, w);
    });
  }, [O, a]);
  const Ke = /* @__PURE__ */ e.jsxs("div", { className: g.sider, children: [
    /* @__PURE__ */ e.jsx(
      S,
      {
        onClick: () => {
          O();
        },
        type: "link",
        className: g.addBtn,
        icon: /* @__PURE__ */ e.jsx(re, {}),
        loading: J,
        children: h("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ e.jsx(N, { spinning: o, wrapperClassName: g.conversationsSpin, children: /* @__PURE__ */ e.jsx(
      nt,
      {
        items: m,
        activeKey: y,
        onActiveChange: async (l) => {
          l && (u(l), r(l));
        },
        className: g.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (l) => ({
          items: [
            {
              label: h("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              onClick: () => {
                F(l.key, { ...l, loading: !0 }), We(l.key);
              }
            },
            {
              label: p("delete"),
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Rt, {}),
              danger: !0,
              onClick: () => {
                F(l.key, { ...l, loading: !0 }), Ue(l.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Xe = ({ message: l }) => {
    if (l.error)
      return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(ge, { content: l.error }) });
  }, Ge = R == null ? void 0 : R.map((l) => ({
    ...l.message,
    key: l.id,
    contentRender: (w) => /* @__PURE__ */ e.jsx(
      ge,
      {
        paragraphTag: "div",
        content: w,
        className: V
      }
    ),
    footer: Xe(l)
  })), Je = /* @__PURE__ */ e.jsx("div", { className: g.chatList, children: /* @__PURE__ */ e.jsx(N, { spinning: He || J, children: /* @__PURE__ */ e.jsx(
    at.List,
    {
      items: Ge,
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
  ) }) }), Ye = /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    rt,
    {
      value: de,
      onSubmit: async () => {
        Be(de.trim()), ue("");
      },
      onChange: ue,
      onCancel: () => {
        Ve();
      },
      loading: De,
      className: g.sender,
      placeholder: h("chat.inputPlaceholder")
    }
  ) });
  return /* @__PURE__ */ e.jsxs(it, { children: [
    Re,
    /* @__PURE__ */ e.jsxs(js.Provider, { value: { onReload: Oe, setMessage: Ne }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
        /* @__PURE__ */ e.jsx(
          vt.Group,
          {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            options: [
              {
                label: /* @__PURE__ */ e.jsx(Dt, {}),
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
            onChange: (l) => s(l.target.value),
            value: t
          }
        ),
        /* @__PURE__ */ e.jsxs(M, { style: { float: "right", marginTop: 10 }, children: [
          /* @__PURE__ */ e.jsx(
            S,
            {
              type: "primary",
              onClick: () => {
                O();
              },
              loading: J,
              icon: /* @__PURE__ */ e.jsx(re, {}),
              style: { display: t === "classic" ? "none" : "block" }
            }
          ),
          /* @__PURE__ */ e.jsx(
            oe,
            {
              menu: {
                items: m.map((l) => ({
                  label: l.label,
                  key: l.key
                })),
                onClick: ({ key: l }) => {
                  u(l), r(l);
                }
              },
              placement: "bottomRight",
              children: /* @__PURE__ */ e.jsx(S, { icon: o ? /* @__PURE__ */ e.jsx(N, { size: "small" }) : /* @__PURE__ */ e.jsx(Vt, {}), style: { display: t === "classic" ? "none" : "block" } })
            }
          ),
          /* @__PURE__ */ e.jsx(S, { type: "text", onClick: () => n(!1), children: /* @__PURE__ */ e.jsx(Ot, {}) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: t === "classic" ? g.classicLayout : g.siderLayout, style: {
        minWidth: t === "classic" ? "500px" : "400px"
      }, children: [
        t === "classic" ? Ke : null,
        /* @__PURE__ */ e.jsxs("div", { className: g.chat, children: [
          Je,
          Ye
        ] })
      ] })
    ] })
  ] });
}, vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bs,
  useMarkdownTheme: $e
}, Symbol.toStringTag, { value: "Module" })), Zs = ({ onSuccess: t, token: n }) => {
  const { t: s } = k("authorization"), { t: a } = k("common"), [i] = b.useForm(), { run: r, loading: d } = $(async (o) => I.authorization.changePassword(o, n ? { headers: { Authorization: `Bearer ${n}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      C.success(s("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (o) => {
      if (o instanceof Qt) {
        const h = o.code ?? "normal";
        C.error(s(`user.passwordChangeFailed.${h}`, { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        C.error(s("user.passwordChangeFailed.normal", { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", o);
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
            children: /* @__PURE__ */ e.jsx(A.Password, {})
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
            children: /* @__PURE__ */ e.jsx(A.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          b.Item,
          {
            name: "confirm_password",
            label: s("user.confirmPassword"),
            rules: [
              { required: !0, message: s("validation.confirmPasswordRequired") },
              ({ getFieldValue: o }) => ({
                validator(h, p) {
                  return !p || o("new_password") === p ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(A.Password, {})
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
  const o = async (h) => {
    try {
      d(!0), await I.authorization.updateCurrentUser(h), C.success(a("updateSuccess")), n();
    } catch (p) {
      C.error(a("updateFailed")), console.error("Failed to update user information:", p);
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
        t.roles.map((h) => h.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      b,
      {
        form: i,
        layout: "vertical",
        onFinish: o,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(cs, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "username",
              label: s("user.username"),
              children: /* @__PURE__ */ e.jsx(A, { disabled: !0 })
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
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "full_name",
              label: s("user.fullName"),
              rules: [{ required: !0, message: s("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            b.Item,
            {
              name: "phone",
              label: s("user.phone"),
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          ),
          /* @__PURE__ */ e.jsx(b.Item, { children: /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", loading: r, children: a("save") }) })
        ]
      }
    )
  ] });
}, tn = ({ user: t, onSuccess: n }) => {
  const { t: s } = k("authorization"), { t: a } = k("common"), [i, r] = v(0), [d, o] = v(!1), [h, p] = v(!0), [g, c] = v(""), [m, y] = v("totp"), { run: u, data: x = { secret: "", qr_code: "", token: void 0 } } = $(
    () => I.authorization.enableMfa(m),
    {
      manual: !0,
      onSuccess: () => {
        r(1);
      },
      onBefore: () => {
        o(!0);
      },
      onFinally: () => {
        o(!1);
      }
    }
  ), L = async () => {
    if (!g) {
      C.warning(s("mfa.enterVerificationCode"));
      return;
    }
    const T = {
      code: g,
      mfa_type: m
    };
    "token" in x && (T.token = x.token);
    try {
      o(!0), await I.authorization.verifyAndActivateMfa(T), C.success(s("mfa.enableSuccess")), r(2), n();
    } catch (_) {
      C.error(s("mfa.verificationFailed")), console.error("Failed to verify MFA:", _);
    } finally {
      o(!1);
    }
  }, f = async () => {
    try {
      o(!0), await I.authorization.disableMfa(), C.success(s("mfa.disableSuccess")), n();
    } catch (T) {
      C.error(a("operationFailed")), console.error("Failed to disable MFA:", T);
    } finally {
      o(!1);
    }
  }, F = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        ne,
        {
          status: "success",
          title: s("mfa.enabled"),
          subTitle: s("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            S,
            {
              danger: !0,
              onClick: () => {
                U.confirm({
                  title: s("mfa.confirmDisable"),
                  content: s("mfa.disableWarning"),
                  onOk: f,
                  okButtonProps: { danger: !0 }
                });
              },
              children: s("mfa.disable")
            }
          )
        }
      );
    const T = () => {
      var _;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              fe,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: s("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: s(m === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                onClick: u,
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
                style: { marginBottom: 20, display: m === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: m === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Ct, { value: x.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: m === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: m === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: h ? "*".repeat(((_ = x.secret) == null ? void 0 : _.length) ?? 0) : x.secret }),
              /* @__PURE__ */ e.jsx(
                S,
                {
                  type: "link",
                  onClick: () => p(!h),
                  icon: h ? /* @__PURE__ */ e.jsx(Le, {}) : /* @__PURE__ */ e.jsx(Bt, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              A,
              {
                placeholder: s("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: g,
                onChange: (V) => c(V.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(M, { children: [
              /* @__PURE__ */ e.jsx(S, { onClick: () => r(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                S,
                {
                  type: "primary",
                  onClick: L,
                  loading: d,
                  children: a("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            ne,
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
          wt,
          {
            defaultValue: "totp",
            onChange: (_) => {
              y(_), r(0);
            },
            value: m,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Et, {}), label: s("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Nt, {}), label: s("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(ke, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        St,
        {
          current: i,
          items: [
            { title: s(m === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: s(m === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: s(m === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: s(m === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: s(m === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: s(m === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      T()
    ] });
  };
  return /* @__PURE__ */ e.jsx(K, { title: s("mfa.title"), children: F() });
}, { Text: te } = kt, sn = () => {
  const { t } = k("authorization"), { t: n } = k("common"), [s, a] = v([]), [i, r] = v(!1), [d, o] = v(null), [h, p] = v(!1), g = async () => {
    try {
      r(!0);
      const u = await I.authorization.getUserSessions({});
      a(u);
    } catch (u) {
      C.error(t("session.getSessionsFailed", { error: u, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      r(!1);
    }
  };
  P(() => {
    g();
  }, []);
  const c = async (u) => {
    try {
      o(u), await I.authorization.terminateSession({ id: u }), a(s.filter((x) => x.id !== u)), C.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (x) {
      C.error(t("session.terminateFailed", { error: x, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      o(null);
    }
  }, m = async () => {
    try {
      p(!0), await I.authorization.terminateOtherSessions(), a(s.filter((u) => u.is_current)), C.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (u) {
      C.error(t("session.terminateAllFailed", { error: u, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      p(!1);
    }
  }, y = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (u, x) => /* @__PURE__ */ e.jsxs(M, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(M, { children: [
          /* @__PURE__ */ e.jsx(qt, {}),
          /* @__PURE__ */ e.jsx(te, { strong: !0, children: u })
        ] }),
        /* @__PURE__ */ e.jsxs(M, { children: [
          /* @__PURE__ */ e.jsx(Ht, {}),
          /* @__PURE__ */ e.jsx(te, { type: "secondary", children: x.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (u) => /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(Ut, {}),
        /* @__PURE__ */ e.jsx("span", { children: u })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (u) => /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(Wt, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(u).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (u) => u.is_current ? /* @__PURE__ */ e.jsx(X, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(X, { color: "blue", children: t("session.active") })
    },
    {
      title: n("actions"),
      key: "action",
      render: (u) => u.is_current ? /* @__PURE__ */ e.jsx(te, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        ae,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => c(u.id),
          okText: n("confirm"),
          cancelText: n("cancel"),
          children: /* @__PURE__ */ e.jsx(
            S,
            {
              type: "link",
              danger: !0,
              loading: d === u.id,
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
        ae,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: m,
          okText: n("confirm"),
          cancelText: n("cancel"),
          children: /* @__PURE__ */ e.jsx(
            S,
            {
              danger: !0,
              loading: h,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: s.length === 0 ? /* @__PURE__ */ e.jsx(It, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
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
}, { RangePicker: ws } = Ft, { Option: E } = D, Ss = (t) => t || "N/A", Cs = (t, n) => t === "success" ? /* @__PURE__ */ e.jsx(X, { color: "success", children: n("statuses.success") }) : /* @__PURE__ */ e.jsx(X, { color: "error", children: n("statuses.failed") }), nn = ({
  userId: t,
  request: n = (a) => t ? I.authorization.getUserLogs({ id: t, ...a }) : I.authorization.getCurrentUserLogs(a),
  columnsFilter: s = (a) => a
}) => {
  const { t: a } = k("authorization"), { t: i } = k("common"), [r, d] = v({
    current: 1,
    pageSize: 10,
    total: 0
  }), [o, h] = v({}), [p] = b.useForm(), { loading: g, run: c, data: { data: m } = {} } = $(async (f = o, F = 1, T = 10) => n({
    ...f,
    current: F ?? 1,
    page_size: T ?? 10
  }), {
    onError(f) {
      C.error(a("auditLog.fetchFailed", { error: f }));
    },
    onSuccess({ total: f }) {
      d({
        ...r,
        total: f
      });
    }
  });
  P(() => {
    c(o, 1, r.pageSize);
  }, []);
  const y = (f) => {
    d({
      ...r,
      current: f.current,
      pageSize: f.pageSize
    }), c({}, f.current, f.pageSize);
  }, u = (f) => {
    var F, T, _, V;
    c({
      ...f,
      start_time: (T = (F = f.dateRange) == null ? void 0 : F[0]) == null ? void 0 : T.toISOString(),
      end_time: (V = (_ = f.dateRange) == null ? void 0 : _[1]) == null ? void 0 : V.toISOString()
    }, 1, r.pageSize);
  }, x = () => {
    p.resetFields(), h({}), d({ ...r, current: 1 }), c({}, 1, r.pageSize);
  }, L = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (f) => mt(f)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (f, F) => f ? a(`action.${f.replace(":", ".")}`, { defaultValue: F.action_name }) : F.action_name ?? F.action
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
      render: (f) => Ss(f)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (f) => Cs(f, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (f) => /* @__PURE__ */ e.jsx(S, { type: "link", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: () => {
        U.info({
          title: a("auditLog.details"),
          content: JSON.stringify(f)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(K, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      b,
      {
        form: p,
        layout: "horizontal",
        onFinish: u,
        initialValues: o,
        children: [
          /* @__PURE__ */ e.jsxs(ye, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(q, { span: 6, children: /* @__PURE__ */ e.jsx(b.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(A, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(q, { span: 6, children: /* @__PURE__ */ e.jsx(b.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs(D, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(E, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(E, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(E, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(E, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(q, { span: 6, children: /* @__PURE__ */ e.jsx(b.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs(D, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(E, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(E, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(q, { span: 6, children: /* @__PURE__ */ e.jsx(b.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(ws, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsx(q, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(S, { onClick: x, children: i("reset") }),
            /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Kt, {}), children: i("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(K, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        S,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Fe, {}),
          onClick: x,
          style: { marginRight: 8 },
          children: i("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        le,
        {
          rowKey: "id",
          columns: s(L),
          dataSource: m,
          pagination: {
            ...r,
            showSizeChanger: !0,
            showTotal: (f) => i("totalItems", { total: f })
          },
          loading: g,
          onChange: y,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { TextArea: Se } = A, { Option: se } = D, an = ({
  field: t,
  selectedType: n,
  dependentValues: s,
  formValues: a = {}
}) => {
  const { t: i } = k("system"), { t: r } = k("common"), d = ve(() => ht(t.visible_when, a), [t.visible_when, a]), { options: o, loading: h } = dt(
    t.data_source,
    t.options,
    s
  ), p = ve(() => t.data_source && t.data_source.type !== "static" ? o : t.options || [], [t.data_source, t.options, o]), g = p && p.length > 0;
  if (!d)
    return null;
  const c = [
    {
      required: t.required,
      message: i("settings.toolsets.fieldRequired", {
        defaultValue: `Please enter ${t.name}`,
        field: t.name
      })
    }
  ], m = () => i(`settings.toolsets.${n}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), y = () => i(`settings.toolsets.${n}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${r("enter", { defaultValue: "Enter" })} ${t.name}`
  }), u = () => {
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
        label: m(),
        rules: c,
        tooltip: u(),
        children: /* @__PURE__ */ e.jsx(
          D,
          {
            loading: h,
            allowClear: !0,
            placeholder: y(),
            showSearch: !0,
            filterOption: (x, L) => {
              var f;
              return (f = L == null ? void 0 : L.children) == null ? void 0 : f.toLowerCase().includes(x.toLowerCase());
            },
            children: p.map((x) => /* @__PURE__ */ e.jsx(se, { value: x.value, children: x.label }, x.value))
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
          label: m(),
          rules: c,
          children: /* @__PURE__ */ e.jsx(Se, { placeholder: y(), rows: 4 })
        },
        t.name
      );
    case "string":
      return g ? /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: c,
          tooltip: u(),
          children: /* @__PURE__ */ e.jsx(D, { allowClear: !0, placeholder: y(), children: p.map((x) => /* @__PURE__ */ e.jsx(se, { value: x.value, children: x.label }, x.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: c,
          tooltip: u(),
          children: /* @__PURE__ */ e.jsx(A, { placeholder: y() })
        },
        t.name
      );
    case "password":
      return /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: c,
          tooltip: u(),
          children: /* @__PURE__ */ e.jsx(A.Password, { placeholder: y(), autoComplete: "new-password" })
        },
        t.name
      );
    case "number":
      return g ? /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: c,
          tooltip: u(),
          children: /* @__PURE__ */ e.jsx(D, { allowClear: !0, placeholder: y(), children: p.map((x) => /* @__PURE__ */ e.jsx(se, { value: x.value, children: x.label }, x.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: c,
          tooltip: u(),
          children: /* @__PURE__ */ e.jsx(At, { style: { width: "100%" }, placeholder: y() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: m(),
          valuePropName: "checked",
          tooltip: u(),
          children: /* @__PURE__ */ e.jsx(Lt, {})
        },
        t.name
      );
    case "array":
      return g ? /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: c,
          tooltip: u(),
          children: /* @__PURE__ */ e.jsx(je.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(M, { direction: "vertical", children: p.map((x) => /* @__PURE__ */ e.jsx(je, { value: x.value, children: x.label }, x.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        b.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: c,
          tooltip: u(),
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
          label: m(),
          rules: [
            ...c,
            {
              validator: (x, L) => {
                if (!L) return Promise.resolve();
                try {
                  return JSON.parse(L), Promise.resolve();
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
          tooltip: u(),
          children: /* @__PURE__ */ e.jsx(
            Se,
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
  os as A,
  Js as D,
  ze as H,
  ts as L,
  Hs as O,
  Bs as P,
  Qs as T,
  nn as U,
  qs as a,
  Ks as b,
  Us as c,
  Ws as d,
  Gs as e,
  cs as f,
  hs as g,
  Ys as h,
  rs as i,
  Me as j,
  Xs as k,
  bs as l,
  Zs as m,
  en as n,
  tn as o,
  sn as p,
  an as q
};
