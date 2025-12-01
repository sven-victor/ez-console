var Ue = Object.defineProperty;
var We = (t, s, n) => s in t ? Ue(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[s] = n;
var ie = (t, s, n) => We(t, typeof s != "symbol" ? s + "" : s, n);
import { j as e, I as Xe, u as Ge, a as Ke, C as Je, F as Ye, X as oe, S as Qe, b as Ze, c as et, A as tt } from "./vendor.js";
import { Navigate as le } from "react-router-dom";
import { u as xe, a as te, b as nt, c as W, d as st } from "./contexts.js";
import { g as at, f as rt, c as it } from "./base.js";
import { Spin as N, Dropdown as fe, Avatar as ot, Upload as lt, Modal as X, Popover as ct, List as dt, Divider as ye, Skeleton as ut, Tooltip as je, FloatButton as mt, Popconfirm as ee, Button as S, Space as P, Input as F, Table as ne, Form as f, message as w, Card as q, Result as ce, Segmented as ht, Steps as pt, Alert as de, QRCode as gt, Typography as xt, Tag as H, Empty as ft, Row as ue, Col as E, Select as R, DatePicker as yt, Checkbox as me, Switch as jt, InputNumber as vt, theme as bt, Radio as wt } from "antd";
import { useTranslation as k } from "react-i18next";
import { createStyles as O } from "antd-style";
import * as St from "@ant-design/icons";
import { UploadOutlined as Ct, CheckOutlined as kt, TeamOutlined as It, RobotOutlined as Ft, PlusOutlined as ve, ClockCircleFilled as Lt, MailOutlined as At, EyeOutlined as be, EyeInvisibleOutlined as zt, LaptopOutlined as Tt, EnvironmentOutlined as Pt, GlobalOutlined as _t, ClockCircleOutlined as Mt, SearchOutlined as Rt, ReloadOutlined as we, DeleteOutlined as Dt, BlockOutlined as $t, BorderRightOutlined as he, HistoryOutlined as Vt, CloseOutlined as Et } from "@ant-design/icons";
import Se from "classnames";
import U, { useState as y, useEffect as D, useCallback as G, lazy as Ot, createElement as Nt, Suspense as Bt, forwardRef as qt, useImperativeHandle as Ht, useMemo as pe } from "react";
import { a as C, w as Ce } from "./index.js";
import { useRequest as _ } from "ahooks";
import { b as K, A as Ut } from "./client.js";
import Wt from "antd-img-crop";
import { isString as Xt } from "lodash";
import J from "dayjs";
const Gt = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(N, { size: "large" }) }), $n = ({
  element: t,
  requiredPermission: s,
  requiredPermissions: n
}) => {
  const { user: a, loading: i } = xe(), { hasPermission: r, hasAllPermissions: h } = te();
  return i ? /* @__PURE__ */ e.jsx(Gt, {}) : a ? s && !r(s) ? /* @__PURE__ */ e.jsx(le, { to: "/forbidden", replace: !0 }) : n && !h(n) ? /* @__PURE__ */ e.jsx(le, { to: "/forbidden", replace: !0 }) : t : (window.location.href = at("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Kt = O(({ token: t, css: s }) => ({
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
})), ke = ({
  overlayClassName: t,
  overlay: s,
  hidden: n,
  children: a,
  ...i
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: r } = Kt();
  return /* @__PURE__ */ e.jsx(
    fe,
    {
      dropdownRender: s,
      overlayClassName: Se(r.container, t),
      ...i,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: a })
    }
  );
}, Jt = () => /* @__PURE__ */ e.jsxs(
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
), Yt = O(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), Qt = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], Vn = ({
  transformLangConfig: t = (s) => s
}) => {
  const { i18n: s } = k(), { styles: n } = Yt(), a = (r) => {
    s.changeLanguage(r);
  }, i = {
    selectedKeys: [s.language],
    onClick: (r) => {
      a(r.key);
    },
    items: t(Qt).map((r) => ({
      key: r.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: n.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    ke,
    {
      menu: i,
      children: /* @__PURE__ */ e.jsx(Jt, {})
    }
  );
}, Zt = O(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), Ie = (t) => Xt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? K.endsWith("/") ? K + `files/${t}` : K + `/files/${t}` : t, en = ({ src: t, ...s }) => /* @__PURE__ */ e.jsx(ot, { src: Ie(t), ...s }), tn = ({ onChange: t, shape: s = "square" }) => {
  const [n, a] = y([]), { styles: i } = Zt(), [r, h] = y(!1), [o, p] = y(!0), [m, j] = y(0), { run: d, loading: u } = _(() => C.base.listFiles({ current: m + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: c }) => {
      a([...n, ...c]), p(c.length === 40), j(m + 1);
    }
  }), v = () => {
    p(!0), j(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    ct,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (c) => {
        h(c), c ? d() : v();
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
            Xe,
            {
              dataLength: n.length,
              next: () => {
                d();
              },
              hasMore: o,
              loader: /* @__PURE__ */ e.jsx(ut, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(ye, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                dt,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: u,
                  renderItem: ({ id: c }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: i.avatarItem,
                      onClick: (g) => {
                        g.stopPropagation(), t == null || t(c), h(!1), v();
                      },
                      children: /* @__PURE__ */ e.jsx(en, { shape: s, src: c })
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
        Ct,
        {
          shape: s,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, nn = ({ value: t, onChange: s, shape: n, ...a }) => {
  const [i, r] = y(void 0), [h, o] = y(!1), [p, m] = y(void 0), j = async (d) => {
    o(!0), m(d.url ?? d.preview);
  };
  return D(() => {
    r(t ? {
      uid: t,
      name: t,
      url: Ie(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Wt,
      {
        beforeCrop: async (d) => {
          if (d.type === "image/svg+xml") {
            const u = await C.base.uploadFile({ type: "avatar" }, d);
            return u.length > 0 && (s == null || s(u[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          lt,
          {
            customRequest: async (d) => {
              var v, c;
              const u = await C.base.uploadFile({ type: "avatar", access: "public" }, d.file);
              u.length > 0 ? ((v = d.onSuccess) == null || v.call(d, u[0].id), s == null || s(u[0].id)) : (c = d.onError) == null || c.call(d, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: j,
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
            children: i ? void 0 : /* @__PURE__ */ e.jsx(tn, { shape: n, onChange: s })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(X, { open: h, footer: null, onCancel: () => o(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: p }) })
  ] });
}, En = () => {
  const { t } = k("common"), { user: s } = xe(), { currentOrgId: n, setCurrentOrgId: a } = nt(), i = (s == null ? void 0 : s.organizations) || [], r = (m) => {
    a(m), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const h = i.find((m) => m.id === n), o = h ? h.name : t("organization.global", { defaultValue: "Global" }), p = [
    ...i.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        n === m.id && /* @__PURE__ */ e.jsx(kt, {})
      ] }),
      onClick: () => r(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    ke,
    {
      menu: {
        items: p,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(It, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: o })
      ]
    }
  );
}, sn = ({
  onResize: t,
  minWidth: s = 300,
  maxWidth: n = window.innerWidth * 0.5
}) => {
  const [a, i] = y(!1), [r, h] = y(!1), o = G((j) => {
    j.preventDefault(), i(!0);
  }, []), p = G(
    (j) => {
      if (!a) return;
      const d = window.innerWidth - j.clientX, u = Math.max(s, Math.min(n, d));
      t(u);
    },
    [a, s, n, t]
  ), m = G(() => {
    i(!1);
  }, []);
  return D(() => {
    if (a)
      return document.addEventListener("mousemove", p), document.addEventListener("mouseup", m), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", p), document.removeEventListener("mouseup", m), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [a, p, m]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: o,
      onMouseEnter: () => h(!0),
      onMouseLeave: () => h(!1),
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
}, Fe = Ot(() => Promise.resolve().then(() => jn)), an = O(({ token: t, css: s }) => ({
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
})), On = () => {
  const { visible: t, setVisible: s } = W();
  return /* @__PURE__ */ e.jsx(
    X,
    {
      width: 1200,
      open: t,
      closable: !1,
      onCancel: () => s(!1),
      footer: null,
      children: Ce(Fe)
    }
  );
}, Nn = () => {
  const { styles: t } = an(), { layout: s } = W(), [n, a] = y(() => {
    const r = localStorage.getItem("ai-sidebar-width");
    return r ? parseInt(r, 10) : 400;
  });
  D(() => {
    localStorage.setItem("ai-sidebar-width", n.toString());
  }, [n]);
  const i = (r) => {
    a(r);
  };
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs(
    "div",
    {
      style: {
        width: `${n}px`,
        display: "flex",
        overflow: "hidden",
        flexShrink: 0
      },
      className: Se("ai-sidebar-layout", s === "float-sidebar" ? t.floatSiderLayout : t.siderLayout),
      children: [
        /* @__PURE__ */ e.jsx(
          sn,
          {
            onResize: i,
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
            children: /* @__PURE__ */ e.jsx("div", { children: Ce(Fe) })
          }
        )
      ]
    }
  ) });
}, Bn = () => {
  const { setVisible: t, visible: s } = W(), { t: n } = k("ai");
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    je,
    {
      title: n("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
      placement: "left",
      style: { display: s ? "none" : "block" },
      children: /* @__PURE__ */ e.jsx(
        mt,
        {
          icon: /* @__PURE__ */ e.jsx(Ft, {}),
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
}, rn = ({
  permission: t,
  permissions: s = [],
  checkAll: n = !1,
  fallback: a = null,
  children: i
}) => {
  const { hasPermission: r, hasAnyPermission: h, hasAllPermissions: o, isAdmin: p, loading: m } = te();
  return m ? null : p ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : s.length > 0 ? (n ? o(s) : h(s)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: i });
}, qn = ({
  fallback: t = null,
  children: s
}) => {
  const { isAdmin: n, loading: a } = te();
  return a ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, B = (t) => {
  const [s, n] = y(!1), { permission: a, icon: i, tooltip: r, onClick: h, confirm: o, label: p, ...m } = t;
  return a ? /* @__PURE__ */ e.jsx(rn, { permission: a, children: B({ icon: i, tooltip: r, onClick: h, confirm: o, label: p, ...m }) }, t.key) : o ? /* @__PURE__ */ e.jsx(ee, { title: o.title, onConfirm: o.onConfirm || h, okText: o.okText, cancelText: o.cancelText, children: B({ icon: i, tooltip: r, label: p, ...m }) }, t.key) : r ? /* @__PURE__ */ e.jsx(je, { title: r, children: B({ icon: i, onClick: h, label: p, ...m }) }, t.key) : /* @__PURE__ */ Nt(S, { type: "text", size: "small", loading: s, icon: i, onClick: h ? async () => {
    console.log(/* @__PURE__ */ new Date(), "handleClick"), n(!0);
    try {
      await h();
    } finally {
      n(!1), console.log(/* @__PURE__ */ new Date(), "handleClick1");
    }
  } : void 0, ...m, key: t.key }, p && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: p }));
}, Hn = ({ actions: t }) => t.filter((s) => !s.hidden).map((s) => B(s)), on = St, ln = (t) => on[t], Un = ({ iconName: t }) => {
  if (!t)
    return null;
  const s = ln(t);
  return s ? /* @__PURE__ */ e.jsx(Bt, { fallback: null, children: /* @__PURE__ */ e.jsx(s, {}) }) : null;
}, Wn = ({ onChange: t }) => {
  const [s, n] = y(""), [a, i] = y("");
  return /* @__PURE__ */ e.jsxs(P.Compact, { children: [
    /* @__PURE__ */ e.jsx(F, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (r) => n(r.target.value) }),
    /* @__PURE__ */ e.jsx(F, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(F, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => i(r.target.value) }),
    /* @__PURE__ */ e.jsx(S, { type: "primary", icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: () => {
      t(s, a);
    } })
  ] });
}, cn = ({ request: t, tableRef: s, ...n }, a) => {
  const [i, r] = y({
    current: 1,
    pageSize: 10
  }), [h, o] = y(0), { data: p, loading: m, refresh: j } = _(async () => {
    const d = await t({
      current: i.current,
      page_size: i.pageSize
    });
    return o(d.total), d.data;
  }, {
    refreshDeps: [i]
  });
  return Ht(a, () => ({
    reload: () => {
      j();
    }
  })), /* @__PURE__ */ e.jsx(
    ne,
    {
      rowKey: "id",
      loading: m,
      dataSource: p ?? [],
      pagination: {
        ...i,
        total: h,
        onChange: (d, u) => {
          r({ current: d, pageSize: u });
        }
      },
      ...n,
      ref: s
    }
  );
}, Xn = ({ actionRef: t, ...s }) => {
  const [n, a] = y();
  return D(() => {
    a(qt(cn));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...s, ref: t }) : null;
}, Gn = ({ onSuccess: t, token: s }) => {
  const { t: n } = k("authorization"), { t: a } = k("common"), [i] = f.useForm(), { run: r, loading: h } = _(async (o) => C.authorization.changePassword(o, s ? { headers: { Authorization: `Bearer ${s}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      w.success(n("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (o) => {
      if (o instanceof Ut) {
        const p = o.code ?? "normal";
        w.error(n(`user.passwordChangeFailed.${p}`, { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        w.error(n("user.passwordChangeFailed.normal", { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", o);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    f,
    {
      form: i,
      layout: "vertical",
      onFinish: r,
      style: { maxWidth: 500, margin: "0 auto" },
      children: [
        /* @__PURE__ */ e.jsx(
          f.Item,
          {
            name: "old_password",
            label: n("user.oldPassword"),
            rules: [{ required: !0, message: n("validation.oldPasswordRequired") }],
            children: /* @__PURE__ */ e.jsx(F.Password, {})
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
            children: /* @__PURE__ */ e.jsx(F.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          f.Item,
          {
            name: "confirm_password",
            label: n("user.confirmPassword"),
            rules: [
              { required: !0, message: n("validation.confirmPasswordRequired") },
              ({ getFieldValue: o }) => ({
                validator(p, m) {
                  return !m || o("new_password") === m ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(F.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(f.Item, { children: /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", loading: h, children: a("save") }) })
      ]
    }
  );
}, Kn = ({ user: t, onSuccess: s }) => {
  const { t: n } = k("authorization"), { t: a } = k("common"), [i] = f.useForm(), [r, h] = y(!1);
  U.useEffect(() => {
    t && i.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, i]);
  const o = async (p) => {
    try {
      h(!0), await C.authorization.updateCurrentUser(p), w.success(a("updateSuccess")), s();
    } catch (m) {
      w.error(a("updateFailed")), console.error("Failed to update user information:", m);
    } finally {
      h(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        n("user.roles"),
        ": ",
        t.roles.map((p) => p.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      f,
      {
        form: i,
        layout: "vertical",
        onFinish: o,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(nn, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(F, { disabled: !0 })
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
              children: /* @__PURE__ */ e.jsx(F, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(F, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(F, {})
            }
          ),
          /* @__PURE__ */ e.jsx(f.Item, { children: /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", loading: r, children: a("save") }) })
        ]
      }
    )
  ] });
}, Jn = ({ user: t, onSuccess: s }) => {
  const { t: n } = k("authorization"), { t: a } = k("common"), [i, r] = y(0), [h, o] = y(!1), [p, m] = y(!0), [j, d] = y(""), [u, v] = y("totp"), { run: c, data: g = { secret: "", qr_code: "", token: void 0 } } = _(
    () => C.authorization.enableMfa(u),
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
  ), z = async () => {
    if (!j) {
      w.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const L = {
      code: j,
      mfa_type: u
    };
    "token" in g && (L.token = g.token);
    try {
      o(!0), await C.authorization.verifyAndActivateMfa(L), w.success(n("mfa.enableSuccess")), r(2), s();
    } catch (I) {
      w.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", I);
    } finally {
      o(!1);
    }
  }, x = async () => {
    try {
      o(!0), await C.authorization.disableMfa(), w.success(n("mfa.disableSuccess")), s();
    } catch (L) {
      w.error(a("operationFailed")), console.error("Failed to disable MFA:", L);
    } finally {
      o(!1);
    }
  }, T = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        ce,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            S,
            {
              danger: !0,
              onClick: () => {
                X.confirm({
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
      var I;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              de,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(u === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                loading: h,
                children: n("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              de,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: u === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: u === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(gt, { value: g.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: u === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: u === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: p ? "*".repeat(((I = g.secret) == null ? void 0 : I.length) ?? 0) : g.secret }),
              /* @__PURE__ */ e.jsx(
                S,
                {
                  type: "link",
                  onClick: () => m(!p),
                  icon: p ? /* @__PURE__ */ e.jsx(be, {}) : /* @__PURE__ */ e.jsx(zt, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              F,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: j,
                onChange: ($) => d($.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(P, { children: [
              /* @__PURE__ */ e.jsx(S, { onClick: () => r(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                S,
                {
                  type: "primary",
                  onClick: z,
                  loading: h,
                  children: a("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            ce,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
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
          ht,
          {
            defaultValue: "totp",
            onChange: (I) => {
              v(I), r(0);
            },
            value: u,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Lt, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(At, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(ye, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        pt,
        {
          current: i,
          items: [
            { title: n(u === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(u === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(u === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(u === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(u === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(u === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      L()
    ] });
  };
  return /* @__PURE__ */ e.jsx(q, { title: n("mfa.title"), children: T() });
}, { Text: Y } = xt, Yn = () => {
  const { t } = k("authorization"), { t: s } = k("common"), [n, a] = y([]), [i, r] = y(!1), [h, o] = y(null), [p, m] = y(!1), j = async () => {
    try {
      r(!0);
      const c = await C.authorization.getUserSessions({});
      a(c);
    } catch (c) {
      w.error(t("session.getSessionsFailed", { error: c, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      r(!1);
    }
  };
  D(() => {
    j();
  }, []);
  const d = async (c) => {
    try {
      o(c), await C.authorization.terminateSession({ id: c }), a(n.filter((g) => g.id !== c)), w.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (g) {
      w.error(t("session.terminateFailed", { error: g, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      o(null);
    }
  }, u = async () => {
    try {
      m(!0), await C.authorization.terminateOtherSessions(), a(n.filter((c) => c.is_current)), w.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (c) {
      w.error(t("session.terminateAllFailed", { error: c, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      m(!1);
    }
  }, v = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (c, g) => /* @__PURE__ */ e.jsxs(P, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(P, { children: [
          /* @__PURE__ */ e.jsx(Tt, {}),
          /* @__PURE__ */ e.jsx(Y, { strong: !0, children: c })
        ] }),
        /* @__PURE__ */ e.jsxs(P, { children: [
          /* @__PURE__ */ e.jsx(Pt, {}),
          /* @__PURE__ */ e.jsx(Y, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (c) => /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(_t, {}),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (c) => /* @__PURE__ */ e.jsxs(P, { children: [
        /* @__PURE__ */ e.jsx(Mt, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(c).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(H, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(H, { color: "blue", children: t("session.active") })
    },
    {
      title: s("actions"),
      key: "action",
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(Y, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        ee,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => d(c.id),
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            S,
            {
              type: "link",
              danger: !0,
              loading: h === c.id,
              children: t("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsx(
    q,
    {
      title: t("session.title"),
      extra: n.length > 1 && /* @__PURE__ */ e.jsx(
        ee,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: u,
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            S,
            {
              danger: !0,
              loading: p,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: n.length === 0 ? /* @__PURE__ */ e.jsx(ft, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        ne,
        {
          columns: v,
          dataSource: n,
          rowKey: "id",
          loading: i,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: dn } = yt, { Option: V } = R, un = (t) => t || "N/A", mn = (t, s) => t === "success" ? /* @__PURE__ */ e.jsx(H, { color: "success", children: s("statuses.success") }) : /* @__PURE__ */ e.jsx(H, { color: "error", children: s("statuses.failed") }), Qn = ({
  userId: t,
  request: s = (a) => t ? C.authorization.getUserLogs({ id: t, ...a }) : C.authorization.getCurrentUserLogs(a),
  columnsFilter: n = (a) => a
}) => {
  const { t: a } = k("authorization"), { t: i } = k("common"), [r, h] = y({
    current: 1,
    pageSize: 10,
    total: 0
  }), [o, p] = y({}), [m] = f.useForm(), { loading: j, run: d, data: { data: u } = {} } = _(async (x = o, T = 1, L = 10) => s({
    ...x,
    current: T ?? 1,
    page_size: L ?? 10
  }), {
    onError(x) {
      w.error(a("auditLog.fetchFailed", { error: x }));
    },
    onSuccess({ total: x }) {
      h({
        ...r,
        total: x
      });
    }
  });
  D(() => {
    d(o, 1, r.pageSize);
  }, []);
  const v = (x) => {
    h({
      ...r,
      current: x.current,
      pageSize: x.pageSize
    }), d({}, x.current, x.pageSize);
  }, c = (x) => {
    var T, L, I, $;
    d({
      ...x,
      start_time: (L = (T = x.dateRange) == null ? void 0 : T[0]) == null ? void 0 : L.toISOString(),
      end_time: ($ = (I = x.dateRange) == null ? void 0 : I[1]) == null ? void 0 : $.toISOString()
    }, 1, r.pageSize);
  }, g = () => {
    m.resetFields(), p({}), h({ ...r, current: 1 }), d({}, 1, r.pageSize);
  }, z = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (x) => rt(x)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (x, T) => x ? a(`action.${x.replace(":", ".")}`, { defaultValue: T.action_name }) : T.action_name ?? T.action
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
      render: (x) => un(x)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (x) => mn(x, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (x) => /* @__PURE__ */ e.jsx(S, { type: "link", icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => {
        X.info({
          title: a("auditLog.details"),
          content: JSON.stringify(x)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(q, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      f,
      {
        form: m,
        layout: "horizontal",
        onFinish: c,
        initialValues: o,
        children: [
          /* @__PURE__ */ e.jsxs(ue, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(F, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs(R, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(V, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(V, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(V, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(V, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs(R, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(V, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(V, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(dn, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(ue, { children: /* @__PURE__ */ e.jsx(E, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(P, { children: [
            /* @__PURE__ */ e.jsx(S, { onClick: g, children: i("reset") }),
            /* @__PURE__ */ e.jsx(S, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Rt, {}), children: i("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(q, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        S,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(we, {}),
          onClick: g,
          style: { marginRight: 8 },
          children: i("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        ne,
        {
          rowKey: "id",
          columns: n(z),
          dataSource: u,
          pagination: {
            ...r,
            showSizeChanger: !0,
            showTotal: (x) => i("totalItems", { total: x })
          },
          loading: j,
          onChange: v,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { TextArea: ge } = F, { Option: Q } = R, Zn = ({
  field: t,
  selectedType: s,
  dependentValues: n,
  formValues: a = {}
}) => {
  const { t: i } = k("system"), { t: r } = k("common"), h = pe(() => it(t.visible_when, a), [t.visible_when, a]), { options: o, loading: p } = st(
    t.data_source,
    t.options,
    n
  ), m = pe(() => t.data_source && t.data_source.type !== "static" ? o : t.options || [], [t.data_source, t.options, o]), j = m && m.length > 0;
  if (!h)
    return null;
  const d = [
    {
      required: t.required,
      message: i("settings.toolsets.fieldRequired", {
        defaultValue: `Please enter ${t.name}`,
        field: t.name
      })
    }
  ], u = () => i(`settings.toolsets.${s}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), v = () => i(`settings.toolsets.${s}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${r("enter", { defaultValue: "Enter" })} ${t.name}`
  }), c = () => {
    if (t.description)
      return i(`settings.toolsets.${s}.${t.name}Tooltip`, {
        defaultValue: t.description
      });
  };
  if (!h)
    return null;
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      f.Item,
      {
        name: ["config", t.name],
        label: u(),
        rules: d,
        tooltip: c(),
        children: /* @__PURE__ */ e.jsx(
          R,
          {
            loading: p,
            allowClear: !0,
            placeholder: v(),
            showSearch: !0,
            filterOption: (g, z) => {
              var x;
              return (x = z == null ? void 0 : z.children) == null ? void 0 : x.toLowerCase().includes(g.toLowerCase());
            },
            children: m.map((g) => /* @__PURE__ */ e.jsx(Q, { value: g.value, children: g.label }, g.value))
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
          label: u(),
          rules: d,
          children: /* @__PURE__ */ e.jsx(ge, { placeholder: v(), rows: 4 })
        },
        t.name
      );
    case "string":
      return j ? /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: u(),
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(R, { allowClear: !0, placeholder: v(), children: m.map((g) => /* @__PURE__ */ e.jsx(Q, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: u(),
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(F, { placeholder: v() })
        },
        t.name
      );
    case "password":
      return /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: u(),
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(F.Password, { placeholder: v(), autoComplete: "new-password" })
        },
        t.name
      );
    case "number":
      return j ? /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: u(),
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(R, { allowClear: !0, placeholder: v(), children: m.map((g) => /* @__PURE__ */ e.jsx(Q, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: u(),
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(vt, { style: { width: "100%" }, placeholder: v() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: u(),
          valuePropName: "checked",
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(jt, {})
        },
        t.name
      );
    case "array":
      return j ? /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: u(),
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(me.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(P, { direction: "vertical", children: m.map((g) => /* @__PURE__ */ e.jsx(me, { value: g.value, children: g.label }, g.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        f.Item,
        {
          name: ["config", t.name],
          label: u(),
          rules: d,
          tooltip: c(),
          children: /* @__PURE__ */ e.jsx(
            R,
            {
              mode: "tags",
              style: { width: "100%" },
              placeholder: v(),
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
          label: u(),
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
            ge,
            {
              rows: 4,
              placeholder: v()
            }
          )
        },
        t.name
      );
    default:
      return null;
  }
}, hn = O(({ token: t, css: s }) => ({
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
class pn extends Error {
  constructor(n, a) {
    super(n);
    ie(this, "buffer");
    this.buffer = a;
  }
}
class gn extends tt {
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
const Z = /* @__PURE__ */ new Map(), xn = (t) => (console.log(t), Z.get(t) || Z.set(
  t,
  new gn({
    request: et(
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
), Z.get(t)), Le = () => {
  const t = bt.useToken(), s = U.useMemo(() => {
    var a;
    return ((a = t == null ? void 0 : t.theme) == null ? void 0 : a.id) === 0;
  }, [t]);
  return [U.useMemo(() => s ? "x-markdown-light" : "x-markdown-dark", [s])];
}, fn = U.createContext({}), yn = () => {
  const { layout: t, setVisible: s, setLayout: n } = W(), { t: a } = k("ai"), { t: i } = k("common"), { styles: r } = hn(), {
    conversations: h,
    activeConversationKey: o,
    setActiveConversationKey: p,
    addConversation: m,
    setConversations: j,
    getConversation: d,
    setConversation: u,
    removeConversation: v,
    getMessages: c
  } = Ge({}), [g] = Le(), [z, x] = w.useMessage(), [T, L] = y(""), [I, $] = y(), { onRequest: se, messages: M, isRequesting: Ae, abort: ze, onReload: Te, setMessages: Pe, setMessage: _e } = Ke({
    provider: xn(o),
    // every conversation has its own provider
    conversationKey: o,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: i("loading"),
      role: "assistant"
    }),
    requestFallback: (l, { messageInfo: b, error: A }) => (console.log(b, A), A instanceof pn ? {
      content: A.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: A.message
    } : {
      content: `${A}`,
      role: "assistant"
    })
  }), Me = (l) => {
    if (l) {
      if (!o) {
        re(l);
        return;
      }
      se({
        content: l
      });
    }
  }, ae = (l) => ({
    key: l.id,
    label: l.title,
    group: J(l.start_time).isSame(J(), "day") ? a("chat.today") : J(l.start_time).format("YYYY-MM-DD")
  }), { loading: Re } = _(async () => {
    const l = await C.ai.listChatSessions({ current: 1, page_size: 20 });
    j(l.data.map(ae)), l.data.length > 0 && p(l.data[0].id);
  }, {
    onError: () => {
      w.error(a("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations" }));
    }
  }), { run: De, loading: $e } = _(async (l) => await C.ai.getChatSession({ sessionId: l }), {
    manual: !0,
    onError: () => {
      w.error(a("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (l) => {
      M && M.length > 0 && (M[M.length - 1].status === "loading" || M.length > l.messages.length) || Pe(l.messages.filter((b) => b.role !== "tool").map((b) => ({
        id: b.id,
        message: {
          content: b.content,
          role: b.role
        },
        status: "success"
      })));
    }
  }), { run: re, loading: Ve } = _(async (l) => await C.ai.createChatSession({ title: a("chat.defaultConversationTitle"), model_id: "" }), {
    manual: !0,
    onError: () => {
      w.error(a("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (l, [b]) => {
      m(ae(l), "prepend"), b && $({ message: b, sessionId: l.id }), p(l.id);
    }
  }), { run: Ee } = _(async (l) => await C.ai.deleteChatSession({ sessionId: l }), {
    manual: !0,
    onError(l, [b]) {
      z.error(a("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const A = d(b);
      A && u(b, { ...A, loading: !1 });
    },
    onSuccess(l, [b]) {
      v(b);
    }
  }), { run: Oe } = _(async (l) => C.ai.generateChatSessionTitle({ sessionId: l }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: l }, [b]) => {
      const A = d(b);
      A && u(b, { ...A, title: l, loading: !1 });
    },
    onError: (l, [b]) => {
      z.error(a("chat.titleGenerationFailed", { defaultValue: "Failed to generate title" })), console.log(l);
      const A = d(b);
      A && u(b, { ...A, loading: !1 });
    }
  });
  D(() => {
    console.log(o, I), o && (I == null ? void 0 : I.sessionId) === o && (se({
      content: I.message
    }), $(void 0));
  }, [o, I]), D(() => {
    if (o) {
      const l = c(o);
      if (l && l.length > 0)
        return;
      De(o);
    }
  }, [o]);
  const Ne = /* @__PURE__ */ e.jsxs("div", { className: r.sider, children: [
    /* @__PURE__ */ e.jsx(
      S,
      {
        onClick: () => {
          re();
        },
        type: "link",
        className: r.addBtn,
        icon: /* @__PURE__ */ e.jsx(ve, {}),
        loading: Ve,
        children: a("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ e.jsx(N, { spinning: Re, wrapperClassName: r.conversationsSpin, children: /* @__PURE__ */ e.jsx(
      Je,
      {
        items: h,
        activeKey: o,
        onActiveChange: async (l) => {
          l && p(l);
        },
        className: r.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (l) => ({
          items: [
            {
              label: a("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ e.jsx(we, {}),
              onClick: () => {
                u(l.key, { ...l, loading: !0 }), Oe(l.key);
              }
            },
            {
              label: i("delete"),
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Dt, {}),
              danger: !0,
              onClick: () => {
                u(l.key, { ...l, loading: !0 }), Ee(l.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Be = ({ message: l }) => {
    if (l.error)
      return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(oe, { content: l.error }) });
  };
  console.log(M);
  const qe = /* @__PURE__ */ e.jsx("div", { className: r.chatList, children: /* @__PURE__ */ e.jsx(N, { spinning: $e, children: /* @__PURE__ */ e.jsx(
    Ye.List,
    {
      items: M == null ? void 0 : M.map((l) => ({
        ...l.message,
        key: l.id,
        messageRender: (b) => /* @__PURE__ */ e.jsx(
          oe,
          {
            paragraphTag: "div",
            content: b,
            className: g
          }
        ),
        footer: Be(l)
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
  ) }) }), He = /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    Qe,
    {
      value: T,
      onSubmit: async () => {
        Me(T.trim()), L("");
      },
      onChange: L,
      onCancel: () => {
        ze();
      },
      loading: Ae,
      className: r.sender,
      placeholder: a("chat.inputPlaceholder")
    }
  ) });
  return /* @__PURE__ */ e.jsx(Ze, { children: /* @__PURE__ */ e.jsxs(fn.Provider, { value: { onReload: Te, setMessage: _e }, children: [
    x,
    /* @__PURE__ */ e.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
      /* @__PURE__ */ e.jsx(
        wt.Group,
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
              label: /* @__PURE__ */ e.jsx(he, {}),
              value: "sidebar"
            },
            {
              label: /* @__PURE__ */ e.jsx(he, {}),
              value: "float-sidebar"
            }
          ],
          optionType: "button",
          onChange: (l) => n(l.target.value),
          value: t
        }
      ),
      /* @__PURE__ */ e.jsxs(P, { style: { float: "right", marginTop: 10 }, children: [
        /* @__PURE__ */ e.jsx(
          fe,
          {
            menu: {
              items: h.map((l) => ({
                label: l.label,
                key: l.key
              })),
              onClick: ({ key: l }) => {
                p(l);
              }
            },
            placement: "bottomRight",
            children: /* @__PURE__ */ e.jsx(S, { icon: /* @__PURE__ */ e.jsx(Vt, {}), style: { display: t === "classic" ? "none" : "block" } })
          }
        ),
        /* @__PURE__ */ e.jsx(S, { type: "text", onClick: () => s(!1), children: /* @__PURE__ */ e.jsx(Et, {}) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: t === "classic" ? r.classicLayout : r.siderLayout, style: {
      minWidth: t === "classic" ? "500px" : "400px"
    }, children: [
      t === "classic" ? Ne : null,
      /* @__PURE__ */ e.jsxs("div", { className: r.chat, children: [
        qe,
        He
      ] })
    ] })
  ] }) });
}, jn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yn,
  useMarkdownTheme: Le
}, Symbol.toStringTag, { value: "Module" }));
export {
  en as A,
  Un as D,
  ke as H,
  Gt as L,
  En as O,
  $n as P,
  Xn as T,
  Qn as U,
  Vn as a,
  Bn as b,
  On as c,
  Nn as d,
  Hn as e,
  nn as f,
  ln as g,
  Wn as h,
  Qt as i,
  rn as j,
  qn as k,
  Gn as l,
  Kn as m,
  Jn as n,
  Yn as o,
  Zn as p
};
