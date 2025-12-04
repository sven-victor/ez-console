var Ge = Object.defineProperty;
var Je = (t, s, n) => s in t ? Ge(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[s] = n;
var me = (t, s, n) => Je(t, typeof s != "symbol" ? s + "" : s, n);
import { j as e, I as Ye, u as Qe, a as Ze, C as et, F as tt, X as he, S as nt, b as st, c as at, A as rt } from "./vendor.js";
import { Navigate as pe } from "react-router-dom";
import { u as we, a as ie, b as it, c as q, d as ot } from "./contexts.js";
import { g as lt, f as ct, c as dt } from "./base.js";
import { Spin as N, Dropdown as Se, Avatar as ut, Upload as mt, Modal as G, Popover as ht, List as pt, Divider as Ce, Skeleton as gt, Tooltip as ke, FloatButton as xt, Popconfirm as ae, Button as w, Space as _, Input as L, Table as oe, theme as ft, message as S, Radio as yt, Form as j, Card as W, Result as ge, Segmented as jt, Steps as bt, Alert as xe, QRCode as vt, Typography as wt, Tag as K, Empty as St, Row as fe, Col as B, Select as D, DatePicker as Ct, Checkbox as ye, Switch as kt, InputNumber as It } from "antd";
import { useTranslation as k } from "react-i18next";
import { createStyles as H } from "antd-style";
import * as Lt from "@ant-design/icons";
import { UploadOutlined as Ft, CheckOutlined as At, TeamOutlined as zt, RobotOutlined as Tt, PlusOutlined as re, ReloadOutlined as Ie, DeleteOutlined as Pt, BlockOutlined as _t, BorderRightOutlined as je, HistoryOutlined as Mt, CloseOutlined as Rt, ClockCircleFilled as Dt, MailOutlined as $t, EyeOutlined as Le, EyeInvisibleOutlined as Vt, LaptopOutlined as Et, EnvironmentOutlined as Nt, GlobalOutlined as Ot, ClockCircleOutlined as Bt, SearchOutlined as qt } from "@ant-design/icons";
import Fe from "classnames";
import X, { useState as b, useEffect as T, useCallback as Q, lazy as Ht, createElement as Ut, Suspense as Wt, forwardRef as Kt, useImperativeHandle as Xt, useMemo as be } from "react";
import { a as C, w as Ae } from "./index.js";
import { useRequest as R } from "ahooks";
import Z from "dayjs";
import { b as ee, A as Gt } from "./client.js";
import Jt from "antd-img-crop";
import { isString as Yt } from "lodash";
const Qt = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(N, { size: "large" }) }), On = ({
  element: t,
  requiredPermission: s,
  requiredPermissions: n
}) => {
  const { user: a, loading: i } = we(), { hasPermission: r, hasAllPermissions: u } = ie();
  return i ? /* @__PURE__ */ e.jsx(Qt, {}) : a ? s && !r(s) ? /* @__PURE__ */ e.jsx(pe, { to: "/forbidden", replace: !0 }) : n && !u(n) ? /* @__PURE__ */ e.jsx(pe, { to: "/forbidden", replace: !0 }) : t : (window.location.href = lt("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Zt = H(({ token: t, css: s }) => ({
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
  const { styles: r } = Zt();
  return /* @__PURE__ */ e.jsx(
    Se,
    {
      dropdownRender: s,
      overlayClassName: Fe(r.container, t),
      ...i,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: a })
    }
  );
}, en = () => /* @__PURE__ */ e.jsxs(
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
), tn = H(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), nn = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], Bn = ({
  transformLangConfig: t = (s) => s
}) => {
  const { i18n: s } = k(), { styles: n } = tn(), a = (r) => {
    s.changeLanguage(r);
  }, i = {
    selectedKeys: [s.language],
    onClick: (r) => {
      a(r.key);
    },
    items: t(nn).map((r) => ({
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
      children: /* @__PURE__ */ e.jsx(en, {})
    }
  );
}, sn = H(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), Te = (t) => Yt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? ee.endsWith("/") ? ee + `files/${t}` : ee + `/files/${t}` : t, an = ({ src: t, ...s }) => /* @__PURE__ */ e.jsx(ut, { src: Te(t), ...s }), rn = ({ onChange: t, shape: s = "square" }) => {
  const [n, a] = b([]), { styles: i } = sn(), [r, u] = b(!1), [l, h] = b(!0), [m, f] = b(0), { run: d, loading: p } = R(() => C.base.listFiles({ current: m + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: c }) => {
      a([...n, ...c]), h(c.length === 40), f(m + 1);
    }
  }), y = () => {
    h(!0), f(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    ht,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (c) => {
        u(c), c ? d() : y();
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
            Ye,
            {
              dataLength: n.length,
              next: () => {
                d();
              },
              hasMore: l,
              loader: /* @__PURE__ */ e.jsx(gt, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(Ce, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                pt,
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
                        g.stopPropagation(), t == null || t(c), u(!1), y();
                      },
                      children: /* @__PURE__ */ e.jsx(an, { shape: s, src: c })
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
        Ft,
        {
          shape: s,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, on = ({ value: t, onChange: s, shape: n, ...a }) => {
  const [i, r] = b(void 0), [u, l] = b(!1), [h, m] = b(void 0), f = async (d) => {
    l(!0), m(d.url ?? d.preview);
  };
  return T(() => {
    r(t ? {
      uid: t,
      name: t,
      url: Te(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Jt,
      {
        beforeCrop: async (d) => {
          if (d.type === "image/svg+xml") {
            const p = await C.base.uploadFile({ type: "avatar" }, d);
            return p.length > 0 && (s == null || s(p[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          mt,
          {
            customRequest: async (d) => {
              var y, c;
              const p = await C.base.uploadFile({ type: "avatar", access: "public" }, d.file);
              p.length > 0 ? ((y = d.onSuccess) == null || y.call(d, p[0].id), s == null || s(p[0].id)) : (c = d.onError) == null || c.call(d, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: f,
            maxCount: 1,
            onChange: ({ file: d }) => {
              switch (d.status) {
                case "removed":
                  s == null || s(void 0);
                  break;
                case "done":
                  break;
                default:
                  r(d);
                  break;
              }
            },
            fileList: i ? [i] : [],
            ...a,
            children: i ? void 0 : /* @__PURE__ */ e.jsx(rn, { shape: n, onChange: s })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(G, { open: u, footer: null, onCancel: () => l(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: h }) })
  ] });
}, qn = () => {
  const { t } = k("common"), { user: s } = we(), { currentOrgId: n, setCurrentOrgId: a } = it(), i = (s == null ? void 0 : s.organizations) || [], r = (m) => {
    a(m), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const u = i.find((m) => m.id === n), l = u ? u.name : t("organization.global", { defaultValue: "Global" }), h = [
    ...i.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        n === m.id && /* @__PURE__ */ e.jsx(At, {})
      ] }),
      onClick: () => r(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    ze,
    {
      menu: {
        items: h,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(zt, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: l })
      ]
    }
  );
}, ln = ({
  onResize: t,
  minWidth: s = 300,
  maxWidth: n = window.innerWidth * 0.5
}) => {
  const [a, i] = b(!1), [r, u] = b(!1), l = Q((f) => {
    f.preventDefault(), i(!0);
  }, []), h = Q(
    (f) => {
      if (!a) return;
      const d = window.innerWidth - f.clientX, p = Math.max(s, Math.min(n, d));
      t(p);
    },
    [a, s, n, t]
  ), m = Q(() => {
    i(!1);
  }, []);
  return T(() => {
    if (a)
      return document.addEventListener("mousemove", h), document.addEventListener("mouseup", m), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", m), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [a, h, m]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: l,
      onMouseEnter: () => u(!0),
      onMouseLeave: () => u(!1),
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
}, Pe = Ht(() => Promise.resolve().then(() => bn)), cn = H(({ token: t, css: s }) => ({
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
})), Hn = () => {
  const { visible: t, setVisible: s, setLoaded: n } = q();
  return T(() => {
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
}, Un = () => {
  const { styles: t } = cn(), { layout: s, visible: n } = q(), [a, i] = b(() => {
    const l = localStorage.getItem("ai-sidebar-width");
    return l ? parseInt(l, 10) : 400;
  }), { setLoaded: r } = q();
  T(() => {
    r(!0);
  }, [r]), T(() => {
    localStorage.setItem("ai-sidebar-width", a.toString());
  }, [a]);
  const u = (l) => {
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
          ln,
          {
            onResize: u,
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
}, Wn = () => {
  const { setVisible: t, visible: s } = q(), { t: n } = k("ai");
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    ke,
    {
      title: n("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
      placement: "left",
      style: { display: s ? "none" : "block" },
      children: /* @__PURE__ */ e.jsx(
        xt,
        {
          icon: /* @__PURE__ */ e.jsx(Tt, {}),
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
}, dn = ({
  permission: t,
  permissions: s = [],
  checkAll: n = !1,
  fallback: a = null,
  children: i
}) => {
  const { hasPermission: r, hasAnyPermission: u, hasAllPermissions: l, isAdmin: h, loading: m } = ie();
  return m ? null : h ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : s.length > 0 ? (n ? l(s) : u(s)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: i });
}, Kn = ({
  fallback: t = null,
  children: s
}) => {
  const { isAdmin: n, loading: a } = ie();
  return a ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, U = (t) => {
  const [s, n] = b(!1), { permission: a, icon: i, tooltip: r, onClick: u, confirm: l, label: h, ...m } = t;
  return a ? /* @__PURE__ */ e.jsx(dn, { permission: a, children: U({ icon: i, tooltip: r, onClick: u, confirm: l, label: h, ...m }) }, t.key) : l ? /* @__PURE__ */ e.jsx(ae, { title: l.title, onConfirm: l.onConfirm || u, okText: l.okText, cancelText: l.cancelText, children: U({ icon: i, tooltip: r, label: h, ...m }) }, t.key) : r ? /* @__PURE__ */ e.jsx(ke, { title: r, children: U({ icon: i, onClick: u, label: h, ...m }) }, t.key) : /* @__PURE__ */ Ut(w, { type: "text", size: "small", loading: s, icon: i, onClick: u ? async () => {
    console.log(/* @__PURE__ */ new Date(), "handleClick"), n(!0);
    try {
      await u();
    } finally {
      n(!1), console.log(/* @__PURE__ */ new Date(), "handleClick1");
    }
  } : void 0, ...m, key: t.key }, h && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: h }));
}, Xn = ({ actions: t }) => t.filter((s) => !s.hidden).map((s) => U(s)), un = Lt, mn = (t) => un[t], Gn = ({ iconName: t }) => {
  if (!t)
    return null;
  const s = mn(t);
  return s ? /* @__PURE__ */ e.jsx(Wt, { fallback: null, children: /* @__PURE__ */ e.jsx(s, {}) }) : null;
}, Jn = ({ onChange: t }) => {
  const [s, n] = b(""), [a, i] = b("");
  return /* @__PURE__ */ e.jsxs(_.Compact, { children: [
    /* @__PURE__ */ e.jsx(L, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (r) => n(r.target.value) }),
    /* @__PURE__ */ e.jsx(L, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(L, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => i(r.target.value) }),
    /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(re, {}), onClick: () => {
      t(s, a);
    } })
  ] });
}, hn = ({ request: t, tableRef: s, ...n }, a) => {
  const [i, r] = b({
    current: 1,
    pageSize: 10
  }), [u, l] = b(0), { data: h, loading: m, refresh: f } = R(async () => {
    const d = await t({
      current: i.current,
      page_size: i.pageSize
    });
    return l(d.total), d.data;
  }, {
    refreshDeps: [i]
  });
  return Xt(a, () => ({
    reload: () => {
      f();
    }
  })), /* @__PURE__ */ e.jsx(
    oe,
    {
      rowKey: "id",
      loading: m,
      dataSource: h ?? [],
      pagination: {
        ...i,
        total: u,
        onChange: (d, p) => {
          r({ current: d, pageSize: p });
        }
      },
      ...n,
      ref: s
    }
  );
}, Yn = ({ actionRef: t, ...s }) => {
  const [n, a] = b();
  return T(() => {
    a(Kt(hn));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...s, ref: t }) : null;
}, pn = H(({ token: t, css: s }) => ({
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
      .ant-bubble[role=user] > .ant-bubble-content{
        background-color: rgb(22 119 255 / 15%);
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
class gn extends Error {
  constructor(n, a) {
    super(n);
    me(this, "buffer");
    this.buffer = a;
  }
}
class xn extends rt {
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
    return console.log(i), {
      content: `${(n == null ? void 0 : n.content) || "" || ""}${i.content || ""}`,
      role: "assistant"
    };
  }
}
const te = /* @__PURE__ */ new Map(), fn = (t) => (console.log(t), te.get(t) || te.set(
  t,
  new xn({
    request: at(
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
), te.get(t)), _e = () => {
  const t = ft.useToken(), s = X.useMemo(() => {
    var a;
    return ((a = t == null ? void 0 : t.theme) == null ? void 0 : a.id) === 0;
  }, [t]);
  return [X.useMemo(() => s ? "x-markdown-light" : "x-markdown-dark", [s])];
}, yn = X.createContext({}), jn = () => {
  const {
    layout: t,
    setVisible: s,
    setLayout: n,
    onCallAI: a,
    activeConversationKey: i,
    setActiveConversationKey: r,
    conversations: u,
    fetchConversationsLoading: l
  } = q(), { t: h } = k("ai"), { t: m } = k("common"), { styles: f } = pn(), d = (o) => ({
    key: o.id,
    label: o.title,
    group: Z(o.start_time).isSame(Z(), "day") ? h("chat.today") : Z(o.start_time).format("YYYY-MM-DD")
  }), {
    conversations: p,
    activeConversationKey: y,
    setActiveConversationKey: c,
    addConversation: g,
    setConversations: z,
    getConversation: x,
    setConversation: I,
    removeConversation: A,
    getMessages: P
  } = Qe({
    defaultActiveConversationKey: i,
    defaultConversations: (u == null ? void 0 : u.map((o) => d(o))) || []
  }), [$] = _e(), [le, Me] = S.useMessage(), [J, ce] = b(""), [O, de] = b(), { onRequest: ue, messages: M, isRequesting: Re, abort: De, onReload: $e, setMessages: Ve, setMessage: Ee } = Ze({
    provider: fn(y),
    // every conversation has its own provider
    conversationKey: y,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: m("loading"),
      role: "assistant"
    }),
    requestFallback: (o, { messageInfo: v, error: F }) => (console.log(v, F), F instanceof gn ? {
      content: F.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: F.message
    } : {
      content: `${F}`,
      role: "assistant"
    })
  }), Ne = (o) => {
    if (o) {
      if (!y) {
        V(o);
        return;
      }
      ue({
        content: o
      });
    }
  }, { run: Oe, loading: Be } = R(async (o) => await C.ai.getChatSession({ sessionId: o }), {
    manual: !0,
    onError: () => {
      S.error(h("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (o) => {
      M && M.length > 0 && (M[M.length - 1].status === "loading" || M.length > o.messages.length) || Ve(o.messages.filter((v) => v.role !== "tool").map((v) => ({
        id: v.id,
        message: {
          content: v.content,
          role: v.role
        },
        status: "success"
      })));
    }
  }), { run: V, loading: Y } = R(async (o, v) => await C.ai.createChatSession({
    title: h("chat.defaultConversationTitle"),
    model_id: "",
    messages: v || []
  }), {
    manual: !0,
    onError: () => {
      S.error(h("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (o, [v]) => {
      g(d(o), "prepend"), v && de({ message: v, sessionId: o.id }), c(o.id), r(o.id);
    }
  });
  T(() => {
    z((u == null ? void 0 : u.map((o) => d(o))) || []);
  }, [u]);
  const { run: qe } = R(async (o) => await C.ai.deleteChatSession({ sessionId: o }), {
    manual: !0,
    onError(o, [v]) {
      le.error(h("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const F = x(v);
      F && I(v, { ...F, loading: !1 });
    },
    onSuccess(o, [v]) {
      A(v);
    }
  }), { run: He } = R(async (o) => C.ai.generateChatSessionTitle({ sessionId: o }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: o }, [v]) => {
      const F = x(v);
      F && I(v, { ...F, title: o, loading: !1 });
    },
    onError: (o, [v]) => {
      le.error(h("chat.titleGenerationFailed", { defaultValue: "Failed to generate title" })), console.log(o);
      const F = x(v);
      F && I(v, { ...F, loading: !1 });
    }
  });
  T(() => {
    y && (O == null ? void 0 : O.sessionId) === y && (ue({
      content: O.message
    }), de(void 0));
  }, [y, O]), T(() => {
    if (y) {
      const o = P(y);
      if (o && o.length > 0)
        return;
      Oe(y);
    }
  }, [y]), T(() => {
    a && V && a((o, v) => {
      console.log("createNewConversation from context", o, v), V(o, v);
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
        loading: Y,
        children: h("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ e.jsx(N, { spinning: l, wrapperClassName: f.conversationsSpin, children: /* @__PURE__ */ e.jsx(
      et,
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
              label: h("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              onClick: () => {
                I(o.key, { ...o, loading: !0 }), He(o.key);
              }
            },
            {
              label: m("delete"),
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Pt, {}),
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
      return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(he, { content: o.error }) });
  };
  console.log(M);
  const Ke = /* @__PURE__ */ e.jsx("div", { className: f.chatList, children: /* @__PURE__ */ e.jsx(N, { spinning: Be || Y, children: /* @__PURE__ */ e.jsx(
    tt.List,
    {
      items: M == null ? void 0 : M.map((o) => ({
        ...o.message,
        key: o.id,
        messageRender: (v) => /* @__PURE__ */ e.jsx(
          he,
          {
            paragraphTag: "div",
            content: v,
            className: $
          }
        ),
        footer: We(o)
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
  ) }) }), Xe = /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    nt,
    {
      value: J,
      onSubmit: async () => {
        console.log("onSubmit", J.trim()), Ne(J.trim()), ce("");
      },
      onChange: ce,
      onCancel: () => {
        De();
      },
      loading: Re,
      className: f.sender,
      placeholder: h("chat.inputPlaceholder")
    }
  ) });
  return /* @__PURE__ */ e.jsx(st, { children: /* @__PURE__ */ e.jsxs(yn.Provider, { value: { onReload: $e, setMessage: Ee }, children: [
    Me,
    /* @__PURE__ */ e.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
      /* @__PURE__ */ e.jsx(
        yt.Group,
        {
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          },
          options: [
            {
              label: /* @__PURE__ */ e.jsx(_t, {}),
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
      /* @__PURE__ */ e.jsxs(_, { style: { float: "right", marginTop: 10 }, children: [
        /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            onClick: () => {
              V();
            },
            loading: Y,
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
            children: /* @__PURE__ */ e.jsx(w, { icon: l ? /* @__PURE__ */ e.jsx(N, { size: "small" }) : /* @__PURE__ */ e.jsx(Mt, {}), style: { display: t === "classic" ? "none" : "block" } })
          }
        ),
        /* @__PURE__ */ e.jsx(w, { type: "text", onClick: () => s(!1), children: /* @__PURE__ */ e.jsx(Rt, {}) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: t === "classic" ? f.classicLayout : f.siderLayout, style: {
      minWidth: t === "classic" ? "500px" : "400px"
    }, children: [
      t === "classic" ? Ue : null,
      /* @__PURE__ */ e.jsxs("div", { className: f.chat, children: [
        Ke,
        Xe
      ] })
    ] })
  ] }) });
}, bn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jn,
  useMarkdownTheme: _e
}, Symbol.toStringTag, { value: "Module" })), Qn = ({ onSuccess: t, token: s }) => {
  const { t: n } = k("authorization"), { t: a } = k("common"), [i] = j.useForm(), { run: r, loading: u } = R(async (l) => C.authorization.changePassword(l, s ? { headers: { Authorization: `Bearer ${s}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      S.success(n("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (l) => {
      if (l instanceof Gt) {
        const h = l.code ?? "normal";
        S.error(n(`user.passwordChangeFailed.${h}`, { error: l.message, defaultValue: "Password change failed: {{error}}" }));
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
                validator(h, m) {
                  return !m || l("new_password") === m ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(L.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(j.Item, { children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: u, children: a("save") }) })
      ]
    }
  );
}, Zn = ({ user: t, onSuccess: s }) => {
  const { t: n } = k("authorization"), { t: a } = k("common"), [i] = j.useForm(), [r, u] = b(!1);
  X.useEffect(() => {
    t && i.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, i]);
  const l = async (h) => {
    try {
      u(!0), await C.authorization.updateCurrentUser(h), S.success(a("updateSuccess")), s();
    } catch (m) {
      S.error(a("updateFailed")), console.error("Failed to update user information:", m);
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        n("user.roles"),
        ": ",
        t.roles.map((h) => h.name).join(", ")
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
              children: /* @__PURE__ */ e.jsx(on, {})
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
}, es = ({ user: t, onSuccess: s }) => {
  const { t: n } = k("authorization"), { t: a } = k("common"), [i, r] = b(0), [u, l] = b(!1), [h, m] = b(!0), [f, d] = b(""), [p, y] = b("totp"), { run: c, data: g = { secret: "", qr_code: "", token: void 0 } } = R(
    () => C.authorization.enableMfa(p),
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
      S.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const A = {
      code: f,
      mfa_type: p
    };
    "token" in g && (A.token = g.token);
    try {
      l(!0), await C.authorization.verifyAndActivateMfa(A), S.success(n("mfa.enableSuccess")), r(2), s();
    } catch (P) {
      S.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", P);
    } finally {
      l(!1);
    }
  }, x = async () => {
    try {
      l(!0), await C.authorization.disableMfa(), S.success(n("mfa.disableSuccess")), s();
    } catch (A) {
      S.error(a("operationFailed")), console.error("Failed to disable MFA:", A);
    } finally {
      l(!1);
    }
  }, I = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        ge,
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
    const A = () => {
      var P;
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
                loading: u,
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
            /* @__PURE__ */ e.jsx("div", { style: { display: p === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(vt, { value: g.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: p === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: p === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: h ? "*".repeat(((P = g.secret) == null ? void 0 : P.length) ?? 0) : g.secret }),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "link",
                  onClick: () => m(!h),
                  icon: h ? /* @__PURE__ */ e.jsx(Le, {}) : /* @__PURE__ */ e.jsx(Vt, {})
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
                onChange: ($) => d($.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(_, { children: [
              /* @__PURE__ */ e.jsx(w, { onClick: () => r(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                w,
                {
                  type: "primary",
                  onClick: z,
                  loading: u,
                  children: a("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            ge,
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
          jt,
          {
            defaultValue: "totp",
            onChange: (P) => {
              y(P), r(0);
            },
            value: p,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Dt, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx($t, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(Ce, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        bt,
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
      A()
    ] });
  };
  return /* @__PURE__ */ e.jsx(W, { title: n("mfa.title"), children: I() });
}, { Text: ne } = wt, ts = () => {
  const { t } = k("authorization"), { t: s } = k("common"), [n, a] = b([]), [i, r] = b(!1), [u, l] = b(null), [h, m] = b(!1), f = async () => {
    try {
      r(!0);
      const c = await C.authorization.getUserSessions({});
      a(c);
    } catch (c) {
      S.error(t("session.getSessionsFailed", { error: c, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      r(!1);
    }
  };
  T(() => {
    f();
  }, []);
  const d = async (c) => {
    try {
      l(c), await C.authorization.terminateSession({ id: c }), a(n.filter((g) => g.id !== c)), S.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (g) {
      S.error(t("session.terminateFailed", { error: g, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      l(null);
    }
  }, p = async () => {
    try {
      m(!0), await C.authorization.terminateOtherSessions(), a(n.filter((c) => c.is_current)), S.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (c) {
      S.error(t("session.terminateAllFailed", { error: c, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      m(!1);
    }
  }, y = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (c, g) => /* @__PURE__ */ e.jsxs(_, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(_, { children: [
          /* @__PURE__ */ e.jsx(Et, {}),
          /* @__PURE__ */ e.jsx(ne, { strong: !0, children: c })
        ] }),
        /* @__PURE__ */ e.jsxs(_, { children: [
          /* @__PURE__ */ e.jsx(Nt, {}),
          /* @__PURE__ */ e.jsx(ne, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (c) => /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(Ot, {}),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (c) => /* @__PURE__ */ e.jsxs(_, { children: [
        /* @__PURE__ */ e.jsx(Bt, {}),
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
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(ne, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        ae,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => d(c.id),
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            w,
            {
              type: "link",
              danger: !0,
              loading: u === c.id,
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
              loading: h,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: n.length === 0 ? /* @__PURE__ */ e.jsx(St, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
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
}, { RangePicker: vn } = Ct, { Option: E } = D, wn = (t) => t || "N/A", Sn = (t, s) => t === "success" ? /* @__PURE__ */ e.jsx(K, { color: "success", children: s("statuses.success") }) : /* @__PURE__ */ e.jsx(K, { color: "error", children: s("statuses.failed") }), ns = ({
  userId: t,
  request: s = (a) => t ? C.authorization.getUserLogs({ id: t, ...a }) : C.authorization.getCurrentUserLogs(a),
  columnsFilter: n = (a) => a
}) => {
  const { t: a } = k("authorization"), { t: i } = k("common"), [r, u] = b({
    current: 1,
    pageSize: 10,
    total: 0
  }), [l, h] = b({}), [m] = j.useForm(), { loading: f, run: d, data: { data: p } = {} } = R(async (x = l, I = 1, A = 10) => s({
    ...x,
    current: I ?? 1,
    page_size: A ?? 10
  }), {
    onError(x) {
      S.error(a("auditLog.fetchFailed", { error: x }));
    },
    onSuccess({ total: x }) {
      u({
        ...r,
        total: x
      });
    }
  });
  T(() => {
    d(l, 1, r.pageSize);
  }, []);
  const y = (x) => {
    u({
      ...r,
      current: x.current,
      pageSize: x.pageSize
    }), d({}, x.current, x.pageSize);
  }, c = (x) => {
    var I, A, P, $;
    d({
      ...x,
      start_time: (A = (I = x.dateRange) == null ? void 0 : I[0]) == null ? void 0 : A.toISOString(),
      end_time: ($ = (P = x.dateRange) == null ? void 0 : P[1]) == null ? void 0 : $.toISOString()
    }, 1, r.pageSize);
  }, g = () => {
    m.resetFields(), h({}), u({ ...r, current: 1 }), d({}, 1, r.pageSize);
  }, z = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (x) => ct(x)
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
      render: (x) => wn(x)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (x) => Sn(x, a)
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
        form: m,
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
            /* @__PURE__ */ e.jsx(B, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(vn, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(fe, { children: /* @__PURE__ */ e.jsx(B, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(_, { children: [
            /* @__PURE__ */ e.jsx(w, { onClick: g, children: i("reset") }),
            /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(qt, {}), children: i("search") })
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
          columns: n(z),
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
}, { TextArea: ve } = L, { Option: se } = D, ss = ({
  field: t,
  selectedType: s,
  dependentValues: n,
  formValues: a = {}
}) => {
  const { t: i } = k("system"), { t: r } = k("common"), u = be(() => dt(t.visible_when, a), [t.visible_when, a]), { options: l, loading: h } = ot(
    t.data_source,
    t.options,
    n
  ), m = be(() => t.data_source && t.data_source.type !== "static" ? l : t.options || [], [t.data_source, t.options, l]), f = m && m.length > 0;
  if (!u)
    return null;
  const d = [
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
  if (!u)
    return null;
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      j.Item,
      {
        name: ["config", t.name],
        label: p(),
        rules: d,
        tooltip: c(),
        children: /* @__PURE__ */ e.jsx(
          D,
          {
            loading: h,
            allowClear: !0,
            placeholder: y(),
            showSearch: !0,
            filterOption: (g, z) => {
              var x;
              return (x = z == null ? void 0 : z.children) == null ? void 0 : x.toLowerCase().includes(g.toLowerCase());
            },
            children: m.map((g) => /* @__PURE__ */ e.jsx(se, { value: g.value, children: g.label }, g.value))
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
          rules: d,
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
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(D, { allowClear: !0, placeholder: y(), children: m.map((g) => /* @__PURE__ */ e.jsx(se, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: d,
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
          rules: d,
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
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(D, { allowClear: !0, placeholder: y(), children: m.map((g) => /* @__PURE__ */ e.jsx(se, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(It, { style: { width: "100%" }, placeholder: y() })
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
          children: /* @__PURE__ */ e.jsx(kt, {})
        },
        t.name
      );
    case "array":
      return f ? /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(ye.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(_, { direction: "vertical", children: m.map((g) => /* @__PURE__ */ e.jsx(ye, { value: g.value, children: g.label }, g.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: p(),
          rules: d,
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
            ...d,
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
  an as A,
  Gn as D,
  ze as H,
  Qt as L,
  qn as O,
  On as P,
  Yn as T,
  ns as U,
  Bn as a,
  Wn as b,
  Hn as c,
  Un as d,
  Xn as e,
  on as f,
  mn as g,
  Jn as h,
  nn as i,
  dn as j,
  Kn as k,
  jn as l,
  Qn as m,
  Zn as n,
  es as o,
  ts as p,
  ss as q
};
