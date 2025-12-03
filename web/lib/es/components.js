var Xe = Object.defineProperty;
var Ge = (t, s, n) => s in t ? Xe(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[s] = n;
var ce = (t, s, n) => Ge(t, typeof s != "symbol" ? s + "" : s, n);
import { j as e, I as Ke, u as Je, a as Ye, C as Qe, F as Ze, X as de, S as et, b as tt, c as nt, A as st } from "./vendor.js";
import { Navigate as ue } from "react-router-dom";
import { u as je, a as ae, b as at, c as B, d as rt } from "./contexts.js";
import { g as it, f as ot, c as lt } from "./base.js";
import { Spin as N, Dropdown as ve, Avatar as ct, Upload as dt, Modal as G, Popover as ut, List as mt, Divider as be, Skeleton as ht, Tooltip as we, FloatButton as pt, Popconfirm as se, Button as S, Space as M, Input as I, Table as re, theme as gt, message as w, Radio as xt, Form as f, Card as U, Result as me, Segmented as ft, Steps as yt, Alert as he, QRCode as jt, Typography as vt, Tag as W, Empty as bt, Row as pe, Col as O, Select as $, DatePicker as wt, Checkbox as ge, Switch as St, InputNumber as Ct } from "antd";
import { useTranslation as k } from "react-i18next";
import { createStyles as q } from "antd-style";
import * as kt from "@ant-design/icons";
import { UploadOutlined as It, CheckOutlined as Lt, TeamOutlined as Ft, RobotOutlined as At, PlusOutlined as Se, ReloadOutlined as Ce, DeleteOutlined as zt, BlockOutlined as Tt, BorderRightOutlined as xe, HistoryOutlined as Pt, CloseOutlined as _t, ClockCircleFilled as Mt, MailOutlined as Rt, EyeOutlined as ke, EyeInvisibleOutlined as Dt, LaptopOutlined as $t, EnvironmentOutlined as Vt, GlobalOutlined as Et, ClockCircleOutlined as Ot, SearchOutlined as Nt } from "@ant-design/icons";
import Ie from "classnames";
import X, { useState as y, useEffect as P, useCallback as Y, lazy as Bt, createElement as qt, Suspense as Ht, forwardRef as Ut, useImperativeHandle as Wt, useMemo as fe } from "react";
import { a as C, w as Le } from "./index.js";
import { useRequest as R } from "ahooks";
import Q from "dayjs";
import { b as Z, A as Xt } from "./client.js";
import Gt from "antd-img-crop";
import { isString as Kt } from "lodash";
const Jt = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(N, { size: "large" }) }), En = ({
  element: t,
  requiredPermission: s,
  requiredPermissions: n
}) => {
  const { user: a, loading: r } = je(), { hasPermission: i, hasAllPermissions: d } = ae();
  return r ? /* @__PURE__ */ e.jsx(Jt, {}) : a ? s && !i(s) ? /* @__PURE__ */ e.jsx(ue, { to: "/forbidden", replace: !0 }) : n && !d(n) ? /* @__PURE__ */ e.jsx(ue, { to: "/forbidden", replace: !0 }) : t : (window.location.href = it("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Yt = q(({ token: t, css: s }) => ({
  container: s`
      ${s`
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
})), Fe = ({
  overlayClassName: t,
  overlay: s,
  hidden: n,
  children: a,
  ...r
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: i } = Yt();
  return /* @__PURE__ */ e.jsx(
    ve,
    {
      dropdownRender: s,
      overlayClassName: Ie(i.container, t),
      ...r,
      children: /* @__PURE__ */ e.jsx("span", { className: i.iconStyle, children: a })
    }
  );
}, Qt = () => /* @__PURE__ */ e.jsxs(
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
), Zt = q(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), en = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], On = ({
  transformLangConfig: t = (s) => s
}) => {
  const { i18n: s } = k(), { styles: n } = Zt(), a = (i) => {
    s.changeLanguage(i);
  }, r = {
    selectedKeys: [s.language],
    onClick: (i) => {
      a(i.key);
    },
    items: t(en).map((i) => ({
      key: i.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (i == null ? void 0 : i.label) || "en-US", className: n.menuItemIconStyle, children: (i == null ? void 0 : i.icon) || "🌐" }),
        (i == null ? void 0 : i.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    Fe,
    {
      menu: r,
      children: /* @__PURE__ */ e.jsx(Qt, {})
    }
  );
}, tn = q(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), Ae = (t) => Kt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? Z.endsWith("/") ? Z + `files/${t}` : Z + `/files/${t}` : t, nn = ({ src: t, ...s }) => /* @__PURE__ */ e.jsx(ct, { src: Ae(t), ...s }), sn = ({ onChange: t, shape: s = "square" }) => {
  const [n, a] = y([]), { styles: r } = tn(), [i, d] = y(!1), [l, m] = y(!0), [u, b] = y(0), { run: h, loading: p } = R(() => C.base.listFiles({ current: u + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: c }) => {
      a([...n, ...c]), m(c.length === 40), b(u + 1);
    }
  }), j = () => {
    m(!0), b(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    ut,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (c) => {
        d(c), c ? h() : j();
      },
      open: i,
      content: /* @__PURE__ */ e.jsx("div", { style: { width: 360, height: 200 }, children: /* @__PURE__ */ e.jsx(
        "div",
        {
          id: "iconsScrollableDiv",
          style: {
            height: "100%",
            overflow: "auto"
          },
          children: /* @__PURE__ */ e.jsx(
            Ke,
            {
              dataLength: n.length,
              next: () => {
                h();
              },
              hasMore: l,
              loader: /* @__PURE__ */ e.jsx(ht, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(be, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                mt,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: p,
                  renderItem: ({ id: c }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: r.avatarItem,
                      onClick: (g) => {
                        g.stopPropagation(), t == null || t(c), d(!1), j();
                      },
                      children: /* @__PURE__ */ e.jsx(nn, { shape: s, src: c })
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
        It,
        {
          shape: s,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, an = ({ value: t, onChange: s, shape: n, ...a }) => {
  const [r, i] = y(void 0), [d, l] = y(!1), [m, u] = y(void 0), b = async (h) => {
    l(!0), u(h.url ?? h.preview);
  };
  return P(() => {
    i(t ? {
      uid: t,
      name: t,
      url: Ae(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Gt,
      {
        beforeCrop: async (h) => {
          if (h.type === "image/svg+xml") {
            const p = await C.base.uploadFile({ type: "avatar" }, h);
            return p.length > 0 && (s == null || s(p[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          dt,
          {
            customRequest: async (h) => {
              var j, c;
              const p = await C.base.uploadFile({ type: "avatar", access: "public" }, h.file);
              p.length > 0 ? ((j = h.onSuccess) == null || j.call(h, p[0].id), s == null || s(p[0].id)) : (c = h.onError) == null || c.call(h, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: b,
            maxCount: 1,
            onChange: ({ file: h }) => {
              switch (h.status) {
                case "removed":
                  s == null || s(void 0);
                  break;
                case "done":
                  break;
                default:
                  i(h);
                  break;
              }
            },
            fileList: r ? [r] : [],
            ...a,
            children: r ? void 0 : /* @__PURE__ */ e.jsx(sn, { shape: n, onChange: s })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(G, { open: d, footer: null, onCancel: () => l(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: m }) })
  ] });
}, Nn = () => {
  const { t } = k("common"), { user: s } = je(), { currentOrgId: n, setCurrentOrgId: a } = at(), r = (s == null ? void 0 : s.organizations) || [], i = (u) => {
    a(u), window.location.reload();
  };
  if (r.length === 0)
    return null;
  const d = r.find((u) => u.id === n), l = d ? d.name : t("organization.global", { defaultValue: "Global" }), m = [
    ...r.map((u) => ({
      key: u.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: u.name }),
        n === u.id && /* @__PURE__ */ e.jsx(Lt, {})
      ] }),
      onClick: () => i(u.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    Fe,
    {
      menu: {
        items: m,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(Ft, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: l })
      ]
    }
  );
}, rn = ({
  onResize: t,
  minWidth: s = 300,
  maxWidth: n = window.innerWidth * 0.5
}) => {
  const [a, r] = y(!1), [i, d] = y(!1), l = Y((b) => {
    b.preventDefault(), r(!0);
  }, []), m = Y(
    (b) => {
      if (!a) return;
      const h = window.innerWidth - b.clientX, p = Math.max(s, Math.min(n, h));
      t(p);
    },
    [a, s, n, t]
  ), u = Y(() => {
    r(!1);
  }, []);
  return P(() => {
    if (a)
      return document.addEventListener("mousemove", m), document.addEventListener("mouseup", u), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", u), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [a, m, u]), /* @__PURE__ */ e.jsx(
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
        backgroundColor: a ? "#1890ff" : i ? "#bfbfbf" : "#e8e8e8",
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
            backgroundColor: a || i ? "#fff" : "#999",
            opacity: a || i ? 1 : 0.5,
            transition: "opacity 0.2s ease",
            pointerEvents: "none"
          }
        }
      )
    }
  );
}, ze = Bt(() => Promise.resolve().then(() => yn)), on = q(({ token: t, css: s }) => ({
  siderLayout: s`
      position: relative;
      height: 100vh;
    `,
  floatSiderLayout: s`
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
})), Bn = () => {
  const { visible: t, setVisible: s, setLoaded: n } = B();
  return P(() => {
    n(!0);
  }, [n]), /* @__PURE__ */ e.jsx(
    G,
    {
      width: 1200,
      open: t,
      closable: !1,
      onCancel: () => s(!1),
      footer: null,
      children: Le(ze)
    }
  );
}, qn = () => {
  const { styles: t } = on(), { layout: s, visible: n } = B(), [a, r] = y(() => {
    const l = localStorage.getItem("ai-sidebar-width");
    return l ? parseInt(l, 10) : 400;
  }), { setLoaded: i } = B();
  P(() => {
    i(!0);
  }, [i]), P(() => {
    localStorage.setItem("ai-sidebar-width", a.toString());
  }, [a]);
  const d = (l) => {
    r(l);
  };
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs(
    "div",
    {
      style: {
        width: `${a}px`,
        display: n ? "flex" : "none",
        overflow: "hidden",
        flexShrink: 0
      },
      className: Ie("ai-sidebar-layout", s === "float-sidebar" ? t.floatSiderLayout : t.siderLayout),
      children: [
        /* @__PURE__ */ e.jsx(
          rn,
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
              borderRadius: s === "float-sidebar" ? "12px" : "0"
            },
            children: /* @__PURE__ */ e.jsx("div", { children: Le(ze) })
          }
        )
      ]
    }
  ) });
}, Hn = () => {
  const { setVisible: t, visible: s } = B(), { t: n } = k("ai");
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    we,
    {
      title: n("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
      placement: "left",
      style: { display: s ? "none" : "block" },
      children: /* @__PURE__ */ e.jsx(
        pt,
        {
          icon: /* @__PURE__ */ e.jsx(At, {}),
          type: "primary",
          onClick: () => t(!0),
          style: {
            right: 24,
            bottom: 24,
            display: s ? "none" : "block"
          }
        }
      )
    }
  ) });
}, ln = ({
  permission: t,
  permissions: s = [],
  checkAll: n = !1,
  fallback: a = null,
  children: r
}) => {
  const { hasPermission: i, hasAnyPermission: d, hasAllPermissions: l, isAdmin: m, loading: u } = ae();
  return u ? null : m ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : t ? i(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : s.length > 0 ? (n ? l(s) : d(s)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r });
}, Un = ({
  fallback: t = null,
  children: s
}) => {
  const { isAdmin: n, loading: a } = ae();
  return a ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, H = (t) => {
  const [s, n] = y(!1), { permission: a, icon: r, tooltip: i, onClick: d, confirm: l, label: m, ...u } = t;
  return a ? /* @__PURE__ */ e.jsx(ln, { permission: a, children: H({ icon: r, tooltip: i, onClick: d, confirm: l, label: m, ...u }) }, t.key) : l ? /* @__PURE__ */ e.jsx(se, { title: l.title, onConfirm: l.onConfirm || d, okText: l.okText, cancelText: l.cancelText, children: H({ icon: r, tooltip: i, label: m, ...u }) }, t.key) : i ? /* @__PURE__ */ e.jsx(we, { title: i, children: H({ icon: r, onClick: d, label: m, ...u }) }, t.key) : /* @__PURE__ */ qt(S, { type: "text", size: "small", loading: s, icon: r, onClick: d ? async () => {
    console.log(/* @__PURE__ */ new Date(), "handleClick"), n(!0);
    try {
      await d();
    } finally {
      n(!1), console.log(/* @__PURE__ */ new Date(), "handleClick1");
    }
  } : void 0, ...u, key: t.key }, m && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: m }));
}, Wn = ({ actions: t }) => t.filter((s) => !s.hidden).map((s) => H(s)), cn = kt, dn = (t) => cn[t], Xn = ({ iconName: t }) => {
  if (!t)
    return null;
  const s = dn(t);
  return s ? /* @__PURE__ */ e.jsx(Ht, { fallback: null, children: /* @__PURE__ */ e.jsx(s, {}) }) : null;
}, Gn = ({ onChange: t }) => {
  const [s, n] = y(""), [a, r] = y("");
  return /* @__PURE__ */ e.jsxs(M.Compact, { children: [
    /* @__PURE__ */ e.jsx(I, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (i) => n(i.target.value) }),
    /* @__PURE__ */ e.jsx(I, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(I, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (i) => r(i.target.value) }),
    /* @__PURE__ */ e.jsx(S, { type: "primary", icon: /* @__PURE__ */ e.jsx(Se, {}), onClick: () => {
      t(s, a);
    } })
  ] });
}, un = ({ request: t, tableRef: s, ...n }, a) => {
  const [r, i] = y({
    current: 1,
    pageSize: 10
  }), [d, l] = y(0), { data: m, loading: u, refresh: b } = R(async () => {
    const h = await t({
      current: r.current,
      page_size: r.pageSize
    });
    return l(h.total), h.data;
  }, {
    refreshDeps: [r]
  });
  return Wt(a, () => ({
    reload: () => {
      b();
    }
  })), /* @__PURE__ */ e.jsx(
    re,
    {
      rowKey: "id",
      loading: u,
      dataSource: m ?? [],
      pagination: {
        ...r,
        total: d,
        onChange: (h, p) => {
          i({ current: h, pageSize: p });
        }
      },
      ...n,
      ref: s
    }
  );
}, Kn = ({ actionRef: t, ...s }) => {
  const [n, a] = y();
  return P(() => {
    a(Ut(un));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...s, ref: t }) : null;
}, mn = q(({ token: t, css: s }) => ({
  siderLayout: s`
      width: 100%;
      height: calc(100vh - 100px);
      display: flex;
      background: ${t.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${t.fontFamily}, sans-serif;
    `,
  classicLayout: s`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${t.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${t.fontFamily}, sans-serif;
    `,
  sider: s`
      background: ${t.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,
  logo: s`
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
  addBtn: s`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,
  conversationsSpin: s`
      height: 100%;
      overflow-y: auto;
    `,
  conversations: s`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
  siderFooter: s`
      border-top: 1px solid ${t.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
  chat: s`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${t.paddingLG}px;
      gap: 16px;
    `,
  chatPrompt: s`
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
  chatList: s`
      flex: 1;
      overflow: auto;
      .ant-spin-nested-loading{
        height: 100%;
        .ant-spin-container{
          height: 100%;
        }
      }
    `,
  loadingMessage: s`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,
  placeholder: s`
      padding-top: 32px;
    `,
  sender: s`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,
  speechButton: s`
      font-size: 18px;
      color: ${t.colorText} !important;
    `,
  senderPrompt: s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${t.colorText};
    `
}));
class hn extends Error {
  constructor(n, a) {
    super(n);
    ce(this, "buffer");
    this.buffer = a;
  }
}
class pn extends st {
  transformParams(s, n) {
    if (typeof s != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(n == null ? void 0 : n.params) || {},
      ...s || {}
    };
  }
  transformLocalMessage({ content: s }) {
    return {
      content: s,
      role: "user"
    };
  }
  transformMessage(s) {
    const { originMessage: n, chunk: a } = s || {};
    if (!a)
      return {
        content: (n == null ? void 0 : n.content) || "",
        role: "assistant"
      };
    const r = JSON.parse(a.data);
    return console.log(r), {
      content: `${(n == null ? void 0 : n.content) || "" || ""}${r.content || ""}`,
      role: "assistant"
    };
  }
}
const ee = /* @__PURE__ */ new Map(), gn = (t) => (console.log(t), ee.get(t) || ee.set(
  t,
  new pn({
    request: nt(
      `/api/ai/chat/sessions/${t}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (s, n) => {
            const a = localStorage.getItem("orgID"), { sessionId: r } = n.params, i = {
              ...n.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...a ? { "X-Scope-OrgID": a } : {}
            };
            return [r ? `/api/ai/chat/sessions/${r}` : s, { ...n, headers: i }];
          }
        }
      }
    )
  })
), ee.get(t)), Te = () => {
  const t = gt.useToken(), s = X.useMemo(() => {
    var a;
    return ((a = t == null ? void 0 : t.theme) == null ? void 0 : a.id) === 0;
  }, [t]);
  return [X.useMemo(() => s ? "x-markdown-light" : "x-markdown-dark", [s])];
}, xn = X.createContext({}), fn = () => {
  const { layout: t, setVisible: s, setLayout: n, onCallAI: a } = B(), { t: r } = k("ai"), { t: i } = k("common"), { styles: d } = mn(), {
    conversations: l,
    activeConversationKey: m,
    setActiveConversationKey: u,
    addConversation: b,
    setConversations: h,
    getConversation: p,
    setConversation: j,
    removeConversation: c,
    getMessages: g
  } = Je({}), [A] = Te(), [x, z] = w.useMessage(), [L, T] = y(""), [_, ie] = y(), { onRequest: oe, messages: D, isRequesting: Pe, abort: _e, onReload: Me, setMessages: Re, setMessage: De } = Ye({
    provider: gn(m),
    // every conversation has its own provider
    conversationKey: m,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: i("loading"),
      role: "assistant"
    }),
    requestFallback: (o, { messageInfo: v, error: F }) => (console.log(v, F), F instanceof hn ? {
      content: F.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: F.message
    } : {
      content: `${F}`,
      role: "assistant"
    })
  }), $e = (o) => {
    if (o) {
      if (!m) {
        E(o);
        return;
      }
      oe({
        content: o
      });
    }
  }, le = (o) => ({
    key: o.id,
    label: o.title,
    group: Q(o.start_time).isSame(Q(), "day") ? r("chat.today") : Q(o.start_time).format("YYYY-MM-DD")
  }), { run: Ve, loading: Ee } = R(async (o) => await C.ai.getChatSession({ sessionId: o }), {
    manual: !0,
    onError: () => {
      w.error(r("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (o) => {
      D && D.length > 0 && (D[D.length - 1].status === "loading" || D.length > o.messages.length) || Re(o.messages.filter((v) => v.role !== "tool").map((v) => ({
        id: v.id,
        message: {
          content: v.content,
          role: v.role
        },
        status: "success"
      })));
    }
  }), { run: E, loading: K } = R(async (o, v) => await C.ai.createChatSession({
    title: r("chat.defaultConversationTitle"),
    model_id: "",
    messages: v || []
  }), {
    manual: !0,
    onError: () => {
      w.error(r("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (o, [v]) => {
      b(le(o), "prepend"), v && ie({ message: v, sessionId: o.id }), u(o.id);
    }
  }), { loading: J, runAsync: Oe } = R(async () => {
    const o = await C.ai.listChatSessions({ current: 1, page_size: 20 });
    h(o.data.map(le)), o.data.length > 0 && !m && u(o.data[0].id);
  }, {
    onError: () => {
      w.error(r("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations" }));
    },
    ready: !K,
    manual: t !== "classic"
  }), { run: Ne } = R(async (o) => await C.ai.deleteChatSession({ sessionId: o }), {
    manual: !0,
    onError(o, [v]) {
      x.error(r("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const F = p(v);
      F && j(v, { ...F, loading: !1 });
    },
    onSuccess(o, [v]) {
      c(v);
    }
  }), { run: Be } = R(async (o) => C.ai.generateChatSessionTitle({ sessionId: o }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: o }, [v]) => {
      const F = p(v);
      F && j(v, { ...F, title: o, loading: !1 });
    },
    onError: (o, [v]) => {
      x.error(r("chat.titleGenerationFailed", { defaultValue: "Failed to generate title" })), console.log(o);
      const F = p(v);
      F && j(v, { ...F, loading: !1 });
    }
  });
  P(() => {
    m && (_ == null ? void 0 : _.sessionId) === m && (oe({
      content: _.message
    }), ie(void 0));
  }, [m, _]), P(() => {
    if (m) {
      const o = g(m);
      if (o && o.length > 0)
        return;
      Ve(m);
    }
  }, [m]), P(() => {
    a && E && a((o, v) => {
      E(o, v);
    });
  }, [E, a]);
  const qe = /* @__PURE__ */ e.jsxs("div", { className: d.sider, children: [
    /* @__PURE__ */ e.jsx(
      S,
      {
        onClick: () => {
          E();
        },
        type: "link",
        className: d.addBtn,
        icon: /* @__PURE__ */ e.jsx(Se, {}),
        loading: K,
        children: r("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ e.jsx(N, { spinning: J, wrapperClassName: d.conversationsSpin, children: /* @__PURE__ */ e.jsx(
      Qe,
      {
        items: l,
        activeKey: m,
        onActiveChange: async (o) => {
          o && u(o);
        },
        className: d.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (o) => ({
          items: [
            {
              label: r("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ e.jsx(Ce, {}),
              onClick: () => {
                j(o.key, { ...o, loading: !0 }), Be(o.key);
              }
            },
            {
              label: i("delete"),
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(zt, {}),
              danger: !0,
              onClick: () => {
                j(o.key, { ...o, loading: !0 }), Ne(o.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), He = ({ message: o }) => {
    if (o.error)
      return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(de, { content: o.error }) });
  };
  console.log(D);
  const Ue = /* @__PURE__ */ e.jsx("div", { className: d.chatList, children: /* @__PURE__ */ e.jsx(N, { spinning: Ee || K, children: /* @__PURE__ */ e.jsx(
    Ze.List,
    {
      items: D == null ? void 0 : D.map((o) => ({
        ...o.message,
        key: o.id,
        messageRender: (v) => /* @__PURE__ */ e.jsx(
          de,
          {
            paragraphTag: "div",
            content: v,
            className: A
          }
        ),
        footer: He(o)
      })),
      style: {
        height: "100%",
        paddingInline: t === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ e.jsx(N, { size: "small" })
        },
        user: { placement: "end" }
      }
    }
  ) }) }), We = /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    et,
    {
      value: L,
      onSubmit: async () => {
        $e(L.trim()), T("");
      },
      onChange: T,
      onCancel: () => {
        _e();
      },
      loading: Pe,
      className: d.sender,
      placeholder: r("chat.inputPlaceholder")
    }
  ) });
  return /* @__PURE__ */ e.jsx(tt, { children: /* @__PURE__ */ e.jsxs(xn.Provider, { value: { onReload: Me, setMessage: De }, children: [
    z,
    /* @__PURE__ */ e.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
      /* @__PURE__ */ e.jsx(
        xt.Group,
        {
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          },
          options: [
            {
              label: /* @__PURE__ */ e.jsx(Tt, {}),
              value: "classic"
            },
            {
              label: /* @__PURE__ */ e.jsx(xe, {}),
              value: "sidebar"
            },
            {
              label: /* @__PURE__ */ e.jsx(xe, {}),
              value: "float-sidebar"
            }
          ],
          optionType: "button",
          onChange: (o) => n(o.target.value),
          value: t
        }
      ),
      /* @__PURE__ */ e.jsxs(M, { style: { float: "right", marginTop: 10 }, children: [
        /* @__PURE__ */ e.jsx(
          ve,
          {
            menu: {
              items: l.map((o) => ({
                label: o.label,
                key: o.key
              })),
              onClick: ({ key: o }) => {
                u(o);
              }
            },
            onOpenChange: (o) => {
              o && !J && Oe();
            },
            placement: "bottomRight",
            children: /* @__PURE__ */ e.jsx(S, { icon: J ? /* @__PURE__ */ e.jsx(N, { size: "small" }) : /* @__PURE__ */ e.jsx(Pt, {}), style: { display: t === "classic" ? "none" : "block" } })
          }
        ),
        /* @__PURE__ */ e.jsx(S, { type: "text", onClick: () => s(!1), children: /* @__PURE__ */ e.jsx(_t, {}) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: t === "classic" ? d.classicLayout : d.siderLayout, style: {
      minWidth: t === "classic" ? "500px" : "400px"
    }, children: [
      t === "classic" ? qe : null,
      /* @__PURE__ */ e.jsxs("div", { className: d.chat, children: [
        Ue,
        We
      ] })
    ] })
  ] }) });
}, yn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fn,
  useMarkdownTheme: Te
}, Symbol.toStringTag, { value: "Module" })), Jn = ({ onSuccess: t, token: s }) => {
  const { t: n } = k("authorization"), { t: a } = k("common"), [r] = f.useForm(), { run: i, loading: d } = R(async (l) => C.authorization.changePassword(l, s ? { headers: { Authorization: `Bearer ${s}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      w.success(n("user.passwordChanged")), r.resetFields(), t == null || t();
    },
    onError: (l) => {
      if (l instanceof Xt) {
        const m = l.code ?? "normal";
        w.error(n(`user.passwordChangeFailed.${m}`, { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        w.error(n("user.passwordChangeFailed.normal", { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", l);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    f,
    {
      form: r,
      layout: "vertical",
      onFinish: i,
      style: { maxWidth: 500, margin: "0 auto" },
      children: [
        /* @__PURE__ */ e.jsx(
          f.Item,
          {
            name: "old_password",
            label: n("user.oldPassword"),
            rules: [{ required: !0, message: n("validation.oldPasswordRequired") }],
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          f.Item,
          {
            name: "new_password",
            label: n("user.newPassword"),
            rules: [
              { required: !0, message: n("validation.newPasswordRequired") },
              { min: 8, message: n("validation.passwordMinLength") }
            ],
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          f.Item,
          {
            name: "confirm_password",
            label: n("user.confirmPassword"),
            rules: [
              { required: !0, message: n("validation.confirmPasswordRequired") },
              ({ getFieldValue: l }) => ({
                validator(m, u) {
                  return !u || l("new_password") === u ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(I.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(f.Item, { children: /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", loading: d, children: a("save") }) })
      ]
    }
  );
}, Yn = ({ user: t, onSuccess: s }) => {
  const { t: n } = k("authorization"), { t: a } = k("common"), [r] = f.useForm(), [i, d] = y(!1);
  X.useEffect(() => {
    t && r.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, r]);
  const l = async (m) => {
    try {
      d(!0), await C.authorization.updateCurrentUser(m), w.success(a("updateSuccess")), s();
    } catch (u) {
      w.error(a("updateFailed")), console.error("Failed to update user information:", u);
    } finally {
      d(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        n("user.roles"),
        ": ",
        t.roles.map((m) => m.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      f,
      {
        form: r,
        layout: "vertical",
        onFinish: l,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(an, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(I, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "email",
              label: n("user.email"),
              rules: [
                { required: !0, message: n("validation.emailRequired") },
                { type: "email", message: n("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          ),
          /* @__PURE__ */ e.jsx(f.Item, { children: /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", loading: i, children: a("save") }) })
        ]
      }
    )
  ] });
}, Qn = ({ user: t, onSuccess: s }) => {
  const { t: n } = k("authorization"), { t: a } = k("common"), [r, i] = y(0), [d, l] = y(!1), [m, u] = y(!0), [b, h] = y(""), [p, j] = y("totp"), { run: c, data: g = { secret: "", qr_code: "", token: void 0 } } = R(
    () => C.authorization.enableMfa(p),
    {
      manual: !0,
      onSuccess: () => {
        i(1);
      },
      onBefore: () => {
        l(!0);
      },
      onFinally: () => {
        l(!1);
      }
    }
  ), A = async () => {
    if (!b) {
      w.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const L = {
      code: b,
      mfa_type: p
    };
    "token" in g && (L.token = g.token);
    try {
      l(!0), await C.authorization.verifyAndActivateMfa(L), w.success(n("mfa.enableSuccess")), i(2), s();
    } catch (T) {
      w.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", T);
    } finally {
      l(!1);
    }
  }, x = async () => {
    try {
      l(!0), await C.authorization.disableMfa(), w.success(n("mfa.disableSuccess")), s();
    } catch (L) {
      w.error(a("operationFailed")), console.error("Failed to disable MFA:", L);
    } finally {
      l(!1);
    }
  }, z = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        me,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            S,
            {
              danger: !0,
              onClick: () => {
                G.confirm({
                  title: n("mfa.confirmDisable"),
                  content: n("mfa.disableWarning"),
                  onOk: x,
                  okButtonProps: { danger: !0 }
                });
              },
              children: n("mfa.disable")
            }
          )
        }
      );
    const L = () => {
      var T;
      switch (r) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              he,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(p === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                children: n("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              he,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: p === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: p === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(jt, { value: g.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: p === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: p === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: m ? "*".repeat(((T = g.secret) == null ? void 0 : T.length) ?? 0) : g.secret }),
              /* @__PURE__ */ e.jsx(
                S,
                {
                  type: "link",
                  onClick: () => u(!m),
                  icon: m ? /* @__PURE__ */ e.jsx(ke, {}) : /* @__PURE__ */ e.jsx(Dt, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              I,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: b,
                onChange: (_) => h(_.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(M, { children: [
              /* @__PURE__ */ e.jsx(S, { onClick: () => i(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                S,
                {
                  type: "primary",
                  onClick: A,
                  loading: d,
                  children: a("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            me,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(S, { type: "primary", onClick: () => i(0), children: a("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: r === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          ft,
          {
            defaultValue: "totp",
            onChange: (T) => {
              j(T), i(0);
            },
            value: p,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Mt, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Rt, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(be, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        yt,
        {
          current: r,
          items: [
            { title: n(p === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(p === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(p === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(p === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(p === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(p === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      L()
    ] });
  };
  return /* @__PURE__ */ e.jsx(U, { title: n("mfa.title"), children: z() });
}, { Text: te } = vt, Zn = () => {
  const { t } = k("authorization"), { t: s } = k("common"), [n, a] = y([]), [r, i] = y(!1), [d, l] = y(null), [m, u] = y(!1), b = async () => {
    try {
      i(!0);
      const c = await C.authorization.getUserSessions({});
      a(c);
    } catch (c) {
      w.error(t("session.getSessionsFailed", { error: c, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      i(!1);
    }
  };
  P(() => {
    b();
  }, []);
  const h = async (c) => {
    try {
      l(c), await C.authorization.terminateSession({ id: c }), a(n.filter((g) => g.id !== c)), w.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (g) {
      w.error(t("session.terminateFailed", { error: g, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      l(null);
    }
  }, p = async () => {
    try {
      u(!0), await C.authorization.terminateOtherSessions(), a(n.filter((c) => c.is_current)), w.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (c) {
      w.error(t("session.terminateAllFailed", { error: c, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      u(!1);
    }
  }, j = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (c, g) => /* @__PURE__ */ e.jsxs(M, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(M, { children: [
          /* @__PURE__ */ e.jsx($t, {}),
          /* @__PURE__ */ e.jsx(te, { strong: !0, children: c })
        ] }),
        /* @__PURE__ */ e.jsxs(M, { children: [
          /* @__PURE__ */ e.jsx(Vt, {}),
          /* @__PURE__ */ e.jsx(te, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (c) => /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(Et, {}),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (c) => /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(Ot, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(c).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(W, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(W, { color: "blue", children: t("session.active") })
    },
    {
      title: s("actions"),
      key: "action",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(te, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        se,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => h(c.id),
          okText: s("confirm"),
          cancelText: s("cancel"),
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
    U,
    {
      title: t("session.title"),
      extra: n.length > 1 && /* @__PURE__ */ e.jsx(
        se,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: p,
          okText: s("confirm"),
          cancelText: s("cancel"),
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
      children: n.length === 0 ? /* @__PURE__ */ e.jsx(bt, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        re,
        {
          columns: j,
          dataSource: n,
          rowKey: "id",
          loading: r,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: jn } = wt, { Option: V } = $, vn = (t) => t || "N/A", bn = (t, s) => t === "success" ? /* @__PURE__ */ e.jsx(W, { color: "success", children: s("statuses.success") }) : /* @__PURE__ */ e.jsx(W, { color: "error", children: s("statuses.failed") }), es = ({
  userId: t,
  request: s = (a) => t ? C.authorization.getUserLogs({ id: t, ...a }) : C.authorization.getCurrentUserLogs(a),
  columnsFilter: n = (a) => a
}) => {
  const { t: a } = k("authorization"), { t: r } = k("common"), [i, d] = y({
    current: 1,
    pageSize: 10,
    total: 0
  }), [l, m] = y({}), [u] = f.useForm(), { loading: b, run: h, data: { data: p } = {} } = R(async (x = l, z = 1, L = 10) => s({
    ...x,
    current: z ?? 1,
    page_size: L ?? 10
  }), {
    onError(x) {
      w.error(a("auditLog.fetchFailed", { error: x }));
    },
    onSuccess({ total: x }) {
      d({
        ...i,
        total: x
      });
    }
  });
  P(() => {
    h(l, 1, i.pageSize);
  }, []);
  const j = (x) => {
    d({
      ...i,
      current: x.current,
      pageSize: x.pageSize
    }), h({}, x.current, x.pageSize);
  }, c = (x) => {
    var z, L, T, _;
    h({
      ...x,
      start_time: (L = (z = x.dateRange) == null ? void 0 : z[0]) == null ? void 0 : L.toISOString(),
      end_time: (_ = (T = x.dateRange) == null ? void 0 : T[1]) == null ? void 0 : _.toISOString()
    }, 1, i.pageSize);
  }, g = () => {
    u.resetFields(), m({}), d({ ...i, current: 1 }), h({}, 1, i.pageSize);
  }, A = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (x) => ot(x)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (x, z) => x ? a(`action.${x.replace(":", ".")}`, { defaultValue: z.action_name }) : z.action_name ?? z.action
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
      render: (x) => vn(x)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (x) => bn(x, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (x) => /* @__PURE__ */ e.jsx(S, { type: "link", icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: () => {
        G.info({
          title: a("auditLog.details"),
          content: JSON.stringify(x)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(U, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      f,
      {
        form: u,
        layout: "horizontal",
        onFinish: c,
        initialValues: l,
        children: [
          /* @__PURE__ */ e.jsxs(pe, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(O, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(I, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(O, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs($, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(V, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(V, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(V, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(V, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(O, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs($, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(V, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(V, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(O, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(jn, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(pe, { children: /* @__PURE__ */ e.jsx(O, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(S, { onClick: g, children: r("reset") }),
            /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Nt, {}), children: r("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(U, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        S,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Ce, {}),
          onClick: g,
          style: { marginRight: 8 },
          children: r("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        re,
        {
          rowKey: "id",
          columns: n(A),
          dataSource: p,
          pagination: {
            ...i,
            showSizeChanger: !0,
            showTotal: (x) => r("totalItems", { total: x })
          },
          loading: b,
          onChange: j,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { TextArea: ye } = I, { Option: ne } = $, ts = ({
  field: t,
  selectedType: s,
  dependentValues: n,
  formValues: a = {}
}) => {
  const { t: r } = k("system"), { t: i } = k("common"), d = fe(() => lt(t.visible_when, a), [t.visible_when, a]), { options: l, loading: m } = rt(
    t.data_source,
    t.options,
    n
  ), u = fe(() => t.data_source && t.data_source.type !== "static" ? l : t.options || [], [t.data_source, t.options, l]), b = u && u.length > 0;
  if (!d)
    return null;
  const h = [
    {
      required: t.required,
      message: r("settings.toolsets.fieldRequired", {
        defaultValue: `Please enter ${t.name}`,
        field: t.name
      })
    }
  ], p = () => r(`settings.toolsets.${s}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), j = () => r(`settings.toolsets.${s}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${i("enter", { defaultValue: "Enter" })} ${t.name}`
  }), c = () => {
    if (t.description)
      return r(`settings.toolsets.${s}.${t.name}Tooltip`, {
        defaultValue: t.description
      });
  };
  if (!d)
    return null;
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      f.Item,
      {
        name: ["config", t.name],
        label: p(),
        rules: h,
        tooltip: c(),
        children: /* @__PURE__ */ e.jsx(
          $,
          {
            loading: m,
            allowClear: !0,
            placeholder: j(),
            showSearch: !0,
            filterOption: (g, A) => {
              var x;
              return (x = A == null ? void 0 : A.children) == null ? void 0 : x.toLowerCase().includes(g.toLowerCase());
            },
            children: u.map((g) => /* @__PURE__ */ e.jsx(ne, { value: g.value, children: g.label }, g.value))
          }
        )
      },
      t.name
    );
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: h,
          children: /* @__PURE__ */ e.jsx(ye, { placeholder: j(), rows: 4 })
        },
        t.name
      );
    case "string":
      return b ? /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: h,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: j(), children: u.map((g) => /* @__PURE__ */ e.jsx(ne, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: h,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(I, { placeholder: j() })
        },
        t.name
      );
    case "password":
      return /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: h,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(I.Password, { placeholder: j(), autoComplete: "new-password" })
        },
        t.name
      );
    case "number":
      return b ? /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: h,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: j(), children: u.map((g) => /* @__PURE__ */ e.jsx(ne, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: h,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(Ct, { style: { width: "100%" }, placeholder: j() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: p(),
          valuePropName: "checked",
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(St, {})
        },
        t.name
      );
    case "array":
      return b ? /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: h,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(ge.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(M, { direction: "vertical", children: u.map((g) => /* @__PURE__ */ e.jsx(ge, { value: g.value, children: g.label }, g.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: h,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(
            $,
            {
              mode: "tags",
              style: { width: "100%" },
              placeholder: j(),
              tokenSeparators: [","]
            }
          )
        },
        t.name
      );
    case "object":
      return /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: [
            ...h,
            {
              validator: (g, A) => {
                if (!A) return Promise.resolve();
                try {
                  return JSON.parse(A), Promise.resolve();
                } catch {
                  return Promise.reject(
                    new Error(
                      r("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON format" })
                    )
                  );
                }
              }
            }
          ],
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(
            ye,
            {
              rows: 4,
              placeholder: j()
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
  nn as A,
  Xn as D,
  Fe as H,
  Jt as L,
  Nn as O,
  En as P,
  Kn as T,
  es as U,
  On as a,
  Hn as b,
  Bn as c,
  qn as d,
  Wn as e,
  an as f,
  dn as g,
  Gn as h,
  en as i,
  ln as j,
  Un as k,
  fn as l,
  Jn as m,
  Yn as n,
  Qn as o,
  Zn as p,
  ts as q
};
