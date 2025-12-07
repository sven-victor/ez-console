var Je = Object.defineProperty;
var Ye = (t, s, n) => s in t ? Je(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[s] = n;
var he = (t, s, n) => Ye(t, typeof s != "symbol" ? s + "" : s, n);
import { j as e, I as Qe, u as Ze, a as et, C as tt, X as pe, F as nt, S as st, b as at, c as rt, A as it } from "./vendor.js";
import { Navigate as ge } from "react-router-dom";
import { u as we, a as ie, b as ot, c as q, d as lt } from "./contexts.js";
import { g as ct, f as dt, c as ut } from "./base.js";
import { Spin as O, Result as se, Dropdown as Se, Avatar as mt, Upload as ht, Modal as G, Popover as pt, List as gt, Divider as Ce, Skeleton as xt, Tooltip as ke, FloatButton as ft, Popconfirm as ae, Button as w, Space as P, Input as L, Table as oe, theme as yt, message as S, Radio as jt, Form as j, Card as W, Segmented as bt, Steps as vt, Alert as xe, QRCode as wt, Typography as St, Tag as K, Empty as Ct, Row as fe, Col as B, Select as D, DatePicker as kt, Checkbox as ye, Switch as It, InputNumber as Lt } from "antd";
import { useTranslation as C } from "react-i18next";
import { createStyles as H } from "antd-style";
import * as Ft from "@ant-design/icons";
import { UploadOutlined as At, CheckOutlined as zt, TeamOutlined as Tt, RobotOutlined as Pt, PlusOutlined as re, ReloadOutlined as Ie, DeleteOutlined as _t, BlockOutlined as Mt, BorderRightOutlined as je, HistoryOutlined as Rt, CloseOutlined as Dt, ClockCircleFilled as $t, MailOutlined as Vt, EyeOutlined as Le, EyeInvisibleOutlined as Et, LaptopOutlined as Ot, EnvironmentOutlined as Nt, GlobalOutlined as Bt, ClockCircleOutlined as qt, SearchOutlined as Ht } from "@ant-design/icons";
import Fe from "classnames";
import X, { useState as v, useEffect as z, useCallback as Y, lazy as Ut, createElement as Wt, Suspense as Kt, forwardRef as Xt, useImperativeHandle as Gt, useMemo as be } from "react";
import { a as k, w as Ae } from "./index.js";
import { useRequest as _ } from "ahooks";
import Q from "dayjs";
import { b as Z, A as Jt } from "./client.js";
import Yt from "antd-img-crop";
import { isString as Qt } from "lodash";
const Zt = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(O, { size: "large" }) }), Bn = ({
  element: t,
  requiredPermission: s,
  requiredPermissions: n
}) => {
  const { t: a } = C(), { user: i, loading: r, error: d } = we(), { hasPermission: l, hasAllPermissions: m } = ie();
  return r ? /* @__PURE__ */ e.jsx(Zt, {}) : d ? /* @__PURE__ */ e.jsx(
    se,
    {
      status: "500",
      title: "500",
      subTitle: a("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (d == null ? void 0 : d.message) || d })
    }
  ) : i ? s && !l(s) ? /* @__PURE__ */ e.jsx(ge, { to: "/forbidden", replace: !0 }) : n && !m(n) ? /* @__PURE__ */ e.jsx(ge, { to: "/forbidden", replace: !0 }) : t : (window.location.href = ct("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, en = H(({ token: t, css: s }) => ({
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
})), ze = ({
  overlayClassName: t,
  overlay: s,
  hidden: n,
  children: a,
  ...i
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: r } = en();
  return /* @__PURE__ */ e.jsx(
    Se,
    {
      dropdownRender: s,
      overlayClassName: Fe(r.container, t),
      ...i,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: a })
    }
  );
}, tn = () => /* @__PURE__ */ e.jsxs(
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
), nn = H(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), sn = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], qn = ({
  transformLangConfig: t = (s) => s
}) => {
  const { i18n: s } = C(), { styles: n } = nn(), a = (r) => {
    s.changeLanguage(r);
  }, i = {
    selectedKeys: [s.language],
    onClick: (r) => {
      a(r.key);
    },
    items: t(sn).map((r) => ({
      key: r.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: n.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    ze,
    {
      menu: i,
      children: /* @__PURE__ */ e.jsx(tn, {})
    }
  );
}, an = H(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), Te = (t) => Qt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? Z.endsWith("/") ? Z + `files/${t}` : Z + `/files/${t}` : t, rn = ({ src: t, fallback: s, ...n }) => /* @__PURE__ */ e.jsx(mt, { src: Te(t), icon: s, ...n }), on = ({ onChange: t, shape: s = "square" }) => {
  const [n, a] = v([]), { styles: i } = an(), [r, d] = v(!1), [l, m] = v(!0), [h, f] = v(0), { run: u, loading: p } = _(() => k.base.listFiles({ current: h + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: c }) => {
      a([...n, ...c]), m(c.length === 40), f(h + 1);
    }
  }), y = () => {
    m(!0), f(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    pt,
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
            Qe,
            {
              dataLength: n.length,
              next: () => {
                u();
              },
              hasMore: l,
              loader: /* @__PURE__ */ e.jsx(xt, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(Ce, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                gt,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: p,
                  renderItem: ({ id: c }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: i.avatarItem,
                      onClick: (g) => {
                        g.stopPropagation(), t == null || t(c), d(!1), y();
                      },
                      children: /* @__PURE__ */ e.jsx(rn, { shape: s, src: c })
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
        At,
        {
          shape: s,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, ln = ({ value: t, onChange: s, shape: n, ...a }) => {
  const [i, r] = v(void 0), [d, l] = v(!1), [m, h] = v(void 0), f = async (u) => {
    l(!0), h(u.url ?? u.preview);
  };
  return z(() => {
    r(t ? {
      uid: t,
      name: t,
      url: Te(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Yt,
      {
        beforeCrop: async (u) => {
          if (u.type === "image/svg+xml") {
            const p = await k.base.uploadFile({ type: "avatar" }, u);
            return p.length > 0 && (s == null || s(p[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          ht,
          {
            customRequest: async (u) => {
              var y, c;
              const p = await k.base.uploadFile({ type: "avatar", access: "public" }, u.file);
              p.length > 0 ? ((y = u.onSuccess) == null || y.call(u, p[0].id), s == null || s(p[0].id)) : (c = u.onError) == null || c.call(u, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: f,
            maxCount: 1,
            onChange: ({ file: u }) => {
              switch (u.status) {
                case "removed":
                  s == null || s(void 0);
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
            children: i ? void 0 : /* @__PURE__ */ e.jsx(on, { shape: n, onChange: s })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(G, { open: d, footer: null, onCancel: () => l(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: m }) })
  ] });
}, Hn = () => {
  const { t } = C("common"), { user: s } = we(), { currentOrgId: n, setCurrentOrgId: a } = ot(), i = (s == null ? void 0 : s.organizations) || [], r = (h) => {
    a(h), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const d = i.find((h) => h.id === n), l = d ? d.name : t("organization.global", { defaultValue: "Global" }), m = [
    ...i.map((h) => ({
      key: h.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: h.name }),
        n === h.id && /* @__PURE__ */ e.jsx(zt, {})
      ] }),
      onClick: () => r(h.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    ze,
    {
      menu: {
        items: m,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(Tt, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: l })
      ]
    }
  );
}, cn = ({
  onResize: t,
  minWidth: s = 300,
  maxWidth: n = window.innerWidth * 0.5
}) => {
  const [a, i] = v(!1), [r, d] = v(!1), l = Y((f) => {
    f.preventDefault(), i(!0);
  }, []), m = Y(
    (f) => {
      if (!a) return;
      const u = window.innerWidth - f.clientX, p = Math.max(s, Math.min(n, u));
      t(p);
    },
    [a, s, n, t]
  ), h = Y(() => {
    i(!1);
  }, []);
  return z(() => {
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
}, Pe = Ut(() => Promise.resolve().then(() => vn)), dn = H(({ token: t, css: s }) => ({
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
})), Un = () => {
  const { visible: t, setVisible: s, setLoaded: n } = q();
  return z(() => {
    n(!0);
  }, [n]), /* @__PURE__ */ e.jsx(
    G,
    {
      width: 1200,
      open: t,
      closable: !1,
      onCancel: () => s(!1),
      footer: null,
      children: Ae(Pe)
    }
  );
}, Wn = () => {
  const { styles: t } = dn(), { layout: s, visible: n } = q(), [a, i] = v(() => {
    const l = localStorage.getItem("ai-sidebar-width");
    return l ? parseInt(l, 10) : 400;
  }), { setLoaded: r } = q();
  z(() => {
    r(!0);
  }, [r]), z(() => {
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
        display: n ? "flex" : "none",
        overflow: "hidden",
        flexShrink: 0
      },
      className: Fe("ai-sidebar-layout", s === "float-sidebar" ? t.floatSiderLayout : t.siderLayout),
      children: [
        /* @__PURE__ */ e.jsx(
          cn,
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
            children: /* @__PURE__ */ e.jsx("div", { children: Ae(Pe) })
          }
        )
      ]
    }
  ) });
}, Kn = () => {
  const { setVisible: t, visible: s } = q(), { t: n } = C("ai");
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    ke,
    {
      title: n("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
      placement: "left",
      style: { display: s ? "none" : "block" },
      children: /* @__PURE__ */ e.jsx(
        ft,
        {
          icon: /* @__PURE__ */ e.jsx(Pt, {}),
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
}, un = ({
  permission: t,
  permissions: s = [],
  checkAll: n = !1,
  fallback: a = null,
  children: i
}) => {
  const { hasPermission: r, hasAnyPermission: d, hasAllPermissions: l, isAdmin: m, loading: h } = ie();
  return h ? null : m ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : s.length > 0 ? (n ? l(s) : d(s)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: i });
}, Xn = ({
  fallback: t = null,
  children: s
}) => {
  const { isAdmin: n, loading: a } = ie();
  return a ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, U = (t) => {
  const [s, n] = v(!1), { permission: a, icon: i, tooltip: r, onClick: d, confirm: l, label: m, ...h } = t;
  return a ? /* @__PURE__ */ e.jsx(un, { permission: a, children: U({ icon: i, tooltip: r, onClick: d, confirm: l, label: m, ...h }) }, t.key) : l ? /* @__PURE__ */ e.jsx(ae, { title: l.title, onConfirm: l.onConfirm || d, okText: l.okText, cancelText: l.cancelText, children: U({ icon: i, tooltip: r, label: m, ...h }) }, t.key) : r ? /* @__PURE__ */ e.jsx(ke, { title: r, children: U({ icon: i, onClick: d, label: m, ...h }) }, t.key) : /* @__PURE__ */ Wt(w, { type: "text", size: "small", loading: s, icon: i, onClick: d ? async () => {
    console.log(/* @__PURE__ */ new Date(), "handleClick"), n(!0);
    try {
      await d();
    } finally {
      n(!1), console.log(/* @__PURE__ */ new Date(), "handleClick1");
    }
  } : void 0, ...h, key: t.key }, m && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: m }));
}, Gn = ({ actions: t }) => t.filter((s) => !s.hidden).map((s) => U(s)), mn = Ft, hn = (t) => mn[t], Jn = ({ iconName: t }) => {
  if (!t)
    return null;
  const s = hn(t);
  return s ? /* @__PURE__ */ e.jsx(Kt, { fallback: null, children: /* @__PURE__ */ e.jsx(s, {}) }) : null;
}, Yn = ({ onChange: t }) => {
  const [s, n] = v(""), [a, i] = v("");
  return /* @__PURE__ */ e.jsxs(P.Compact, { children: [
    /* @__PURE__ */ e.jsx(L, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (r) => n(r.target.value) }),
    /* @__PURE__ */ e.jsx(L, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(L, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => i(r.target.value) }),
    /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(re, {}), onClick: () => {
      t(s, a);
    } })
  ] });
}, pn = ({ request: t, tableRef: s, ...n }, a) => {
  const [i, r] = v({
    current: 1,
    pageSize: 10
  }), [d, l] = v(0), { data: m, loading: h, refresh: f } = _(async () => {
    const u = await t({
      current: i.current,
      page_size: i.pageSize
    });
    return l(u.total), u.data;
  }, {
    refreshDeps: [i]
  });
  return Gt(a, () => ({
    reload: () => {
      f();
    }
  })), /* @__PURE__ */ e.jsx(
    oe,
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
      ...n,
      ref: s
    }
  );
}, Qn = ({ actionRef: t, ...s }) => {
  const [n, a] = v();
  return z(() => {
    a(Xt(pn));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...s, ref: t }) : null;
}, gn = H(({ token: t, css: s }) => ({
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
class xn extends Error {
  constructor(n, a) {
    super(n);
    he(this, "buffer");
    this.buffer = a;
  }
}
class fn extends it {
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
    const i = JSON.parse(a.data);
    return {
      content: `${(n == null ? void 0 : n.content) || "" || ""}${i.content || ""}`,
      role: "assistant"
    };
  }
}
const ee = /* @__PURE__ */ new Map(), yn = (t) => (ee.get(t) || ee.set(
  t,
  new fn({
    request: rt(
      `/api/ai/chat/sessions/${t}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (s, n) => {
            const a = localStorage.getItem("orgID"), { sessionId: i } = n.params, r = {
              ...n.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...a ? { "X-Scope-OrgID": a } : {}
            };
            return [i ? `/api/ai/chat/sessions/${i}` : s, { ...n, headers: r }];
          }
        }
      }
    )
  })
), ee.get(t)), _e = () => {
  const t = yt.useToken(), s = X.useMemo(() => {
    var a;
    return ((a = t == null ? void 0 : t.theme) == null ? void 0 : a.id) === 0;
  }, [t]);
  return [X.useMemo(() => s ? "x-markdown-light" : "x-markdown-dark", [s])];
}, jn = X.createContext({}), bn = () => {
  const {
    layout: t,
    setVisible: s,
    setLayout: n,
    onCallAI: a,
    activeConversationKey: i,
    setActiveConversationKey: r,
    conversations: d,
    fetchConversationsLoading: l
  } = q(), { t: m } = C("ai"), { t: h } = C("common"), { styles: f } = gn(), u = (o) => ({
    key: o.id,
    label: o.title,
    group: Q(o.start_time).isSame(Q(), "day") ? m("chat.today") : Q(o.start_time).format("YYYY-MM-DD")
  }), {
    conversations: p,
    activeConversationKey: y,
    setActiveConversationKey: c,
    addConversation: g,
    setConversations: A,
    getConversation: x,
    setConversation: I,
    removeConversation: F,
    getMessages: T
  } = Ze({
    defaultActiveConversationKey: i,
    defaultConversations: (d == null ? void 0 : d.map((o) => u(o))) || []
  }), [$] = _e(), [le, Me] = S.useMessage(), [ce, de] = v(""), [N, ue] = v(), { onRequest: me, messages: M, isRequesting: Re, abort: De, onReload: $e, setMessages: Ve, setMessage: Ee } = et({
    provider: yn(y),
    // every conversation has its own provider
    conversationKey: y,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: h("loading"),
      role: "assistant"
    }),
    requestFallback: (o, { error: b }) => b instanceof xn ? {
      content: b.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: b.message
    } : {
      content: `${b}`,
      role: "assistant"
    }
  }), Oe = (o) => {
    if (o) {
      if (!y) {
        V(o);
        return;
      }
      me({
        content: o
      });
    }
  }, { run: Ne, loading: Be } = _(async (o) => await k.ai.getChatSession({ sessionId: o }), {
    manual: !0,
    onError: () => {
      S.error(m("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (o) => {
      M && M.length > 0 && (M[M.length - 1].status === "loading" || M.length > o.messages.length) || Ve(o.messages.filter((b) => b.role !== "tool").map((b) => ({
        id: b.id,
        message: {
          content: b.content,
          role: b.role
        },
        status: "success"
      })));
    }
  }), { run: V, loading: J } = _(async (o, b) => await k.ai.createChatSession({
    title: m("chat.defaultConversationTitle"),
    model_id: "",
    messages: b || []
  }), {
    manual: !0,
    onError: () => {
      S.error(m("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (o, [b]) => {
      g(u(o), "prepend"), b && ue({ message: b, sessionId: o.id }), c(o.id), r(o.id);
    }
  });
  z(() => {
    A((d == null ? void 0 : d.map((o) => u(o))) || []);
  }, [d]);
  const { run: qe } = _(async (o) => await k.ai.deleteChatSession({ sessionId: o }), {
    manual: !0,
    onError(o, [b]) {
      le.error(m("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const R = x(b);
      R && I(b, { ...R, loading: !1 });
    },
    onSuccess(o, [b]) {
      F(b);
    }
  }), { run: He } = _(async (o) => k.ai.generateChatSessionTitle({ sessionId: o }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: o }, [b]) => {
      const R = x(b);
      R && I(b, { ...R, title: o, loading: !1 });
    },
    onError: (o, [b]) => {
      le.error(m("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: o.message || o }));
      const R = x(b);
      R && I(b, { ...R, loading: !1 });
    }
  });
  z(() => {
    y && (N == null ? void 0 : N.sessionId) === y && (me({
      content: N.message
    }), ue(void 0));
  }, [y, N]), z(() => {
    if (y) {
      const o = T(y);
      if (o && o.length > 0)
        return;
      Ne(y);
    }
  }, [y]), z(() => {
    a && V && a((o, b) => {
      V(o, b);
    });
  }, [V, a]);
  const Ue = /* @__PURE__ */ e.jsxs("div", { className: f.sider, children: [
    /* @__PURE__ */ e.jsx(
      w,
      {
        onClick: () => {
          V();
        },
        type: "link",
        className: f.addBtn,
        icon: /* @__PURE__ */ e.jsx(re, {}),
        loading: J,
        children: m("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ e.jsx(O, { spinning: l, wrapperClassName: f.conversationsSpin, children: /* @__PURE__ */ e.jsx(
      tt,
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
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              onClick: () => {
                I(o.key, { ...o, loading: !0 }), He(o.key);
              }
            },
            {
              label: h("delete"),
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(_t, {}),
              danger: !0,
              onClick: () => {
                I(o.key, { ...o, loading: !0 }), qe(o.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), We = ({ message: o }) => {
    if (o.error)
      return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(pe, { content: o.error }) });
  }, Ke = M == null ? void 0 : M.map((o) => ({
    ...o.message,
    key: o.id,
    contentRender: (b) => /* @__PURE__ */ e.jsx(
      pe,
      {
        paragraphTag: "div",
        content: b,
        className: $
      }
    ),
    footer: We(o)
  })), Xe = /* @__PURE__ */ e.jsx("div", { className: f.chatList, children: /* @__PURE__ */ e.jsx(O, { spinning: Be || J, children: /* @__PURE__ */ e.jsx(
    nt.List,
    {
      items: Ke,
      style: {
        height: "100%",
        paddingInline: t === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ e.jsx(O, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ e.jsx(O, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) }), Ge = /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    st,
    {
      value: ce,
      onSubmit: async () => {
        Oe(ce.trim()), de("");
      },
      onChange: de,
      onCancel: () => {
        De();
      },
      loading: Re,
      className: f.sender,
      placeholder: m("chat.inputPlaceholder")
    }
  ) });
  return /* @__PURE__ */ e.jsxs(at, { children: [
    Me,
    /* @__PURE__ */ e.jsxs(jn.Provider, { value: { onReload: $e, setMessage: Ee }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
        /* @__PURE__ */ e.jsx(
          jt.Group,
          {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            options: [
              {
                label: /* @__PURE__ */ e.jsx(Mt, {}),
                value: "classic"
              },
              {
                label: /* @__PURE__ */ e.jsx(je, {}),
                value: "sidebar"
              },
              {
                label: /* @__PURE__ */ e.jsx(je, {}),
                value: "float-sidebar"
              }
            ],
            optionType: "button",
            onChange: (o) => n(o.target.value),
            value: t
          }
        ),
        /* @__PURE__ */ e.jsxs(P, { style: { float: "right", marginTop: 10 }, children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              onClick: () => {
                V();
              },
              loading: J,
              icon: /* @__PURE__ */ e.jsx(re, {}),
              style: { display: t === "classic" ? "none" : "block" }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Se,
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
              children: /* @__PURE__ */ e.jsx(w, { icon: l ? /* @__PURE__ */ e.jsx(O, { size: "small" }) : /* @__PURE__ */ e.jsx(Rt, {}), style: { display: t === "classic" ? "none" : "block" } })
            }
          ),
          /* @__PURE__ */ e.jsx(w, { type: "text", onClick: () => s(!1), children: /* @__PURE__ */ e.jsx(Dt, {}) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: t === "classic" ? f.classicLayout : f.siderLayout, style: {
        minWidth: t === "classic" ? "500px" : "400px"
      }, children: [
        t === "classic" ? Ue : null,
        /* @__PURE__ */ e.jsxs("div", { className: f.chat, children: [
          Xe,
          Ge
        ] })
      ] })
    ] })
  ] });
}, vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bn,
  useMarkdownTheme: _e
}, Symbol.toStringTag, { value: "Module" })), Zn = ({ onSuccess: t, token: s }) => {
  const { t: n } = C("authorization"), { t: a } = C("common"), [i] = j.useForm(), { run: r, loading: d } = _(async (l) => k.authorization.changePassword(l, s ? { headers: { Authorization: `Bearer ${s}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      S.success(n("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (l) => {
      if (l instanceof Jt) {
        const m = l.code ?? "normal";
        S.error(n(`user.passwordChangeFailed.${m}`, { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        S.error(n("user.passwordChangeFailed.normal", { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", l);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    j,
    {
      form: i,
      layout: "vertical",
      onFinish: r,
      style: { maxWidth: 500, margin: "0 auto" },
      children: [
        /* @__PURE__ */ e.jsx(
          j.Item,
          {
            name: "old_password",
            label: n("user.oldPassword"),
            rules: [{ required: !0, message: n("validation.oldPasswordRequired") }],
            children: /* @__PURE__ */ e.jsx(L.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          j.Item,
          {
            name: "new_password",
            label: n("user.newPassword"),
            rules: [
              { required: !0, message: n("validation.newPasswordRequired") },
              { min: 8, message: n("validation.passwordMinLength") }
            ],
            children: /* @__PURE__ */ e.jsx(L.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          j.Item,
          {
            name: "confirm_password",
            label: n("user.confirmPassword"),
            rules: [
              { required: !0, message: n("validation.confirmPasswordRequired") },
              ({ getFieldValue: l }) => ({
                validator(m, h) {
                  return !h || l("new_password") === h ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(L.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(j.Item, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: d, children: a("save") }) })
      ]
    }
  );
}, es = ({ user: t, onSuccess: s }) => {
  const { t: n } = C("authorization"), { t: a } = C("common"), [i] = j.useForm(), [r, d] = v(!1);
  X.useEffect(() => {
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
      d(!0), await k.authorization.updateCurrentUser(m), S.success(a("updateSuccess")), s();
    } catch (h) {
      S.error(a("updateFailed")), console.error("Failed to update user information:", h);
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
      j,
      {
        form: i,
        layout: "vertical",
        onFinish: l,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(ln, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(L, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "email",
              label: n("user.email"),
              rules: [
                { required: !0, message: n("validation.emailRequired") },
                { type: "email", message: n("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          ),
          /* @__PURE__ */ e.jsx(j.Item, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: r, children: a("save") }) })
        ]
      }
    )
  ] });
}, ts = ({ user: t, onSuccess: s }) => {
  const { t: n } = C("authorization"), { t: a } = C("common"), [i, r] = v(0), [d, l] = v(!1), [m, h] = v(!0), [f, u] = v(""), [p, y] = v("totp"), { run: c, data: g = { secret: "", qr_code: "", token: void 0 } } = _(
    () => k.authorization.enableMfa(p),
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
  ), A = async () => {
    if (!f) {
      S.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const F = {
      code: f,
      mfa_type: p
    };
    "token" in g && (F.token = g.token);
    try {
      l(!0), await k.authorization.verifyAndActivateMfa(F), S.success(n("mfa.enableSuccess")), r(2), s();
    } catch (T) {
      S.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", T);
    } finally {
      l(!1);
    }
  }, x = async () => {
    try {
      l(!0), await k.authorization.disableMfa(), S.success(n("mfa.disableSuccess")), s();
    } catch (F) {
      S.error(a("operationFailed")), console.error("Failed to disable MFA:", F);
    } finally {
      l(!1);
    }
  }, I = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        se,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            w,
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
    const F = () => {
      var T;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              xe,
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
              w,
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
              xe,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: p === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: p === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(wt, { value: g.qr_code ?? "", size: 200 }) }),
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
                w,
                {
                  type: "link",
                  onClick: () => h(!m),
                  icon: m ? /* @__PURE__ */ e.jsx(Le, {}) : /* @__PURE__ */ e.jsx(Et, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              L,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: f,
                onChange: ($) => u($.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(P, { children: [
              /* @__PURE__ */ e.jsx(w, { onClick: () => r(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                w,
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
            se,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(w, { type: "primary", onClick: () => r(0), children: a("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: i === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          bt,
          {
            defaultValue: "totp",
            onChange: (T) => {
              y(T), r(0);
            },
            value: p,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx($t, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Vt, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(Ce, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        vt,
        {
          current: i,
          items: [
            { title: n(p === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(p === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(p === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(p === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(p === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(p === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      F()
    ] });
  };
  return /* @__PURE__ */ e.jsx(W, { title: n("mfa.title"), children: I() });
}, { Text: te } = St, ns = () => {
  const { t } = C("authorization"), { t: s } = C("common"), [n, a] = v([]), [i, r] = v(!1), [d, l] = v(null), [m, h] = v(!1), f = async () => {
    try {
      r(!0);
      const c = await k.authorization.getUserSessions({});
      a(c);
    } catch (c) {
      S.error(t("session.getSessionsFailed", { error: c, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      r(!1);
    }
  };
  z(() => {
    f();
  }, []);
  const u = async (c) => {
    try {
      l(c), await k.authorization.terminateSession({ id: c }), a(n.filter((g) => g.id !== c)), S.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (g) {
      S.error(t("session.terminateFailed", { error: g, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      l(null);
    }
  }, p = async () => {
    try {
      h(!0), await k.authorization.terminateOtherSessions(), a(n.filter((c) => c.is_current)), S.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (c) {
      S.error(t("session.terminateAllFailed", { error: c, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      h(!1);
    }
  }, y = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (c, g) => /* @__PURE__ */ e.jsxs(P, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(P, { children: [
          /* @__PURE__ */ e.jsx(Ot, {}),
          /* @__PURE__ */ e.jsx(te, { strong: !0, children: c })
        ] }),
        /* @__PURE__ */ e.jsxs(P, { children: [
          /* @__PURE__ */ e.jsx(Nt, {}),
          /* @__PURE__ */ e.jsx(te, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (c) => /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(Bt, {}),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (c) => /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(qt, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(c).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(K, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(K, { color: "blue", children: t("session.active") })
    },
    {
      title: s("actions"),
      key: "action",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(te, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        ae,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => u(c.id),
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            w,
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
    W,
    {
      title: t("session.title"),
      extra: n.length > 1 && /* @__PURE__ */ e.jsx(
        ae,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: p,
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            w,
            {
              danger: !0,
              loading: m,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: n.length === 0 ? /* @__PURE__ */ e.jsx(Ct, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        oe,
        {
          columns: y,
          dataSource: n,
          rowKey: "id",
          loading: i,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: wn } = kt, { Option: E } = D, Sn = (t) => t || "N/A", Cn = (t, s) => t === "success" ? /* @__PURE__ */ e.jsx(K, { color: "success", children: s("statuses.success") }) : /* @__PURE__ */ e.jsx(K, { color: "error", children: s("statuses.failed") }), ss = ({
  userId: t,
  request: s = (a) => t ? k.authorization.getUserLogs({ id: t, ...a }) : k.authorization.getCurrentUserLogs(a),
  columnsFilter: n = (a) => a
}) => {
  const { t: a } = C("authorization"), { t: i } = C("common"), [r, d] = v({
    current: 1,
    pageSize: 10,
    total: 0
  }), [l, m] = v({}), [h] = j.useForm(), { loading: f, run: u, data: { data: p } = {} } = _(async (x = l, I = 1, F = 10) => s({
    ...x,
    current: I ?? 1,
    page_size: F ?? 10
  }), {
    onError(x) {
      S.error(a("auditLog.fetchFailed", { error: x }));
    },
    onSuccess({ total: x }) {
      d({
        ...r,
        total: x
      });
    }
  });
  z(() => {
    u(l, 1, r.pageSize);
  }, []);
  const y = (x) => {
    d({
      ...r,
      current: x.current,
      pageSize: x.pageSize
    }), u({}, x.current, x.pageSize);
  }, c = (x) => {
    var I, F, T, $;
    u({
      ...x,
      start_time: (F = (I = x.dateRange) == null ? void 0 : I[0]) == null ? void 0 : F.toISOString(),
      end_time: ($ = (T = x.dateRange) == null ? void 0 : T[1]) == null ? void 0 : $.toISOString()
    }, 1, r.pageSize);
  }, g = () => {
    h.resetFields(), m({}), d({ ...r, current: 1 }), u({}, 1, r.pageSize);
  }, A = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (x) => dt(x)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (x, I) => x ? a(`action.${x.replace(":", ".")}`, { defaultValue: I.action_name }) : I.action_name ?? I.action
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
      render: (x) => Sn(x)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (x) => Cn(x, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (x) => /* @__PURE__ */ e.jsx(w, { type: "link", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: () => {
        G.info({
          title: a("auditLog.details"),
          content: JSON.stringify(x)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(W, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      j,
      {
        form: h,
        layout: "horizontal",
        onFinish: c,
        initialValues: l,
        children: [
          /* @__PURE__ */ e.jsxs(fe, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(B, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(L, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(B, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs(D, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(E, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(E, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(E, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(E, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(B, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs(D, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(E, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(E, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(B, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(wn, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(fe, { children: /* @__PURE__ */ e.jsx(B, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(P, { children: [
            /* @__PURE__ */ e.jsx(w, { onClick: g, children: i("reset") }),
            /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ht, {}), children: i("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(W, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        w,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          onClick: g,
          style: { marginRight: 8 },
          children: i("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        oe,
        {
          rowKey: "id",
          columns: n(A),
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
}, { TextArea: ve } = L, { Option: ne } = D, as = ({
  field: t,
  selectedType: s,
  dependentValues: n,
  formValues: a = {}
}) => {
  const { t: i } = C("system"), { t: r } = C("common"), d = be(() => ut(t.visible_when, a), [t.visible_when, a]), { options: l, loading: m } = lt(
    t.data_source,
    t.options,
    n
  ), h = be(() => t.data_source && t.data_source.type !== "static" ? l : t.options || [], [t.data_source, t.options, l]), f = h && h.length > 0;
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
  ], p = () => i(`settings.toolsets.${s}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), y = () => i(`settings.toolsets.${s}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${r("enter", { defaultValue: "Enter" })} ${t.name}`
  }), c = () => {
    if (t.description)
      return i(`settings.toolsets.${s}.${t.name}Tooltip`, {
        defaultValue: t.description
      });
  };
  if (!d)
    return null;
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      j.Item,
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
            filterOption: (g, A) => {
              var x;
              return (x = A == null ? void 0 : A.children) == null ? void 0 : x.toLowerCase().includes(g.toLowerCase());
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
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          children: /* @__PURE__ */ e.jsx(ve, { placeholder: y(), rows: 4 })
        },
        t.name
      );
    case "string":
      return f ? /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(D, { allowClear: !0, placeholder: y(), children: h.map((g) => /* @__PURE__ */ e.jsx(ne, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(L, { placeholder: y() })
        },
        t.name
      );
    case "password":
      return /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(L.Password, { placeholder: y(), autoComplete: "new-password" })
        },
        t.name
      );
    case "number":
      return f ? /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(D, { allowClear: !0, placeholder: y(), children: h.map((g) => /* @__PURE__ */ e.jsx(ne, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(Lt, { style: { width: "100%" }, placeholder: y() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          valuePropName: "checked",
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(It, {})
        },
        t.name
      );
    case "array":
      return f ? /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: u,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(ye.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(P, { direction: "vertical", children: h.map((g) => /* @__PURE__ */ e.jsx(ye, { value: g.value, children: g.label }, g.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        j.Item,
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
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: [
            ...u,
            {
              validator: (g, A) => {
                if (!A) return Promise.resolve();
                try {
                  return JSON.parse(A), Promise.resolve();
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
            ve,
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
  rn as A,
  Jn as D,
  ze as H,
  Zt as L,
  Hn as O,
  Bn as P,
  Qn as T,
  ss as U,
  qn as a,
  Kn as b,
  Un as c,
  Wn as d,
  Gn as e,
  ln as f,
  hn as g,
  Yn as h,
  sn as i,
  un as j,
  Xn as k,
  bn as l,
  Zn as m,
  es as n,
  ts as o,
  ns as p,
  as as q
};
