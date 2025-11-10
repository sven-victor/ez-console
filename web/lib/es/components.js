var Ie = Object.defineProperty;
var ke = (t, s, n) => s in t ? Ie(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[s] = n;
var ie = (t, s, n) => ke(t, typeof s != "symbol" ? s + "" : s, n);
import { j as e, I as Fe, u as Ae, X as Le, a as _e, C as ze, F as Te, M as Pe, S as De } from "./vendor.js";
import { Navigate as oe } from "react-router-dom";
import { u as me, a as se, b as Re } from "./contexts.js";
import { g as Me, f as Be } from "./base.js";
import { Spin as q, Dropdown as Ee, Avatar as Ve, Upload as Ne, Modal as G, Popover as $e, List as Oe, Divider as he, Skeleton as qe, Tooltip as pe, FloatButton as He, Popconfirm as te, Button as I, Space as M, Input as z, Table as ae, Form as j, message as S, Card as U, Result as le, Segmented as Ue, Steps as Ke, Alert as ce, QRCode as Ge, Typography as We, Tag as K, Empty as Xe, Row as de, Col as $, Select as ne, DatePicker as Ye, Flex as Je } from "antd";
import { useTranslation as F } from "react-i18next";
import { createStyles as W } from "antd-style";
import * as Qe from "@ant-design/icons";
import { UploadOutlined as Ze, CheckOutlined as et, TeamOutlined as tt, RobotOutlined as nt, PlusOutlined as ge, ClockCircleFilled as st, MailOutlined as at, EyeOutlined as fe, EyeInvisibleOutlined as rt, LaptopOutlined as it, EnvironmentOutlined as ot, GlobalOutlined as lt, ClockCircleOutlined as ct, SearchOutlined as dt, ReloadOutlined as ut, EditOutlined as mt, DeleteOutlined as ht } from "@ant-design/icons";
import pt from "classnames";
import gt, { useState as x, useEffect as O, lazy as ft, createElement as xt, Suspense as yt, forwardRef as jt, useImperativeHandle as vt, useRef as bt } from "react";
import { a as C, w as wt } from "./index.js";
import { useRequest as D } from "ahooks";
import { b as J, A as St } from "./client.js";
import Ct from "antd-img-crop";
import { isString as It } from "lodash";
import Q from "dayjs";
const kt = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(q, { size: "large" }) }), dn = ({
  element: t,
  requiredPermission: s,
  requiredPermissions: n
}) => {
  const { user: a, loading: i } = me(), { hasPermission: r, hasAllPermissions: m } = se();
  return i ? /* @__PURE__ */ e.jsx(kt, {}) : a ? s && !r(s) ? /* @__PURE__ */ e.jsx(oe, { to: "/forbidden", replace: !0 }) : n && !m(n) ? /* @__PURE__ */ e.jsx(oe, { to: "/forbidden", replace: !0 }) : t : (window.location.href = Me("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Ft = W(({ token: t, css: s }) => ({
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
})), xe = ({
  overlayClassName: t,
  overlay: s,
  hidden: n,
  children: a,
  ...i
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: r } = Ft();
  return /* @__PURE__ */ e.jsx(
    Ee,
    {
      dropdownRender: s,
      overlayClassName: pt(r.container, t),
      ...i,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: a })
    }
  );
}, At = () => /* @__PURE__ */ e.jsxs(
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
), Lt = W(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), _t = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], un = ({
  transformLangConfig: t = (s) => s
}) => {
  const { i18n: s } = F(), { styles: n } = Lt(), a = (r) => {
    s.changeLanguage(r);
  }, i = {
    selectedKeys: [s.language],
    onClick: (r) => {
      a(r.key);
    },
    items: t(_t).map((r) => ({
      key: r.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: n.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    xe,
    {
      menu: i,
      children: /* @__PURE__ */ e.jsx(At, {})
    }
  );
}, zt = W(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), ye = (t) => It(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? J.endsWith("/") ? J + `files/${t}` : J + `/files/${t}` : t, Tt = ({ src: t, ...s }) => /* @__PURE__ */ e.jsx(Ve, { src: ye(t), ...s }), Pt = ({ onChange: t, shape: s = "square" }) => {
  const [n, a] = x([]), { styles: i } = zt(), [r, m] = x(!1), [o, d] = x(!0), [u, v] = x(0), { run: h, loading: g } = D(() => C.base.listFiles({ current: u + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: c }) => {
      a([...n, ...c]), d(c.length === 40), v(u + 1);
    }
  }), k = () => {
    d(!0), v(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    $e,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (c) => {
        m(c), c ? h() : k();
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
            Fe,
            {
              dataLength: n.length,
              next: () => {
                h();
              },
              hasMore: o,
              loader: /* @__PURE__ */ e.jsx(qe, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(he, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                Oe,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: g,
                  renderItem: ({ id: c }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: i.avatarItem,
                      onClick: (b) => {
                        b.stopPropagation(), t == null || t(c), m(!1), k();
                      },
                      children: /* @__PURE__ */ e.jsx(Tt, { shape: s, src: c })
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
        Ze,
        {
          shape: s,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, Dt = ({ value: t, onChange: s, shape: n, ...a }) => {
  const [i, r] = x(void 0), [m, o] = x(!1), [d, u] = x(void 0), v = async (h) => {
    o(!0), u(h.url ?? h.preview);
  };
  return O(() => {
    r(t ? {
      uid: t,
      name: t,
      url: ye(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Ct,
      {
        beforeCrop: async (h) => {
          if (h.type === "image/svg+xml") {
            const g = await C.base.uploadFile({ type: "avatar" }, h);
            return g.length > 0 && (s == null || s(g[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          Ne,
          {
            customRequest: async (h) => {
              var k, c;
              const g = await C.base.uploadFile({ type: "avatar", access: "public" }, h.file);
              g.length > 0 ? ((k = h.onSuccess) == null || k.call(h, g[0].id), s == null || s(g[0].id)) : (c = h.onError) == null || c.call(h, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: v,
            maxCount: 1,
            onChange: ({ file: h }) => {
              switch (h.status) {
                case "removed":
                  s == null || s(void 0);
                  break;
                case "done":
                  break;
                default:
                  r(h);
                  break;
              }
            },
            fileList: i ? [i] : [],
            ...a,
            children: i ? void 0 : /* @__PURE__ */ e.jsx(Pt, { shape: n, onChange: s })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(G, { open: m, footer: null, onCancel: () => o(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: d }) })
  ] });
}, mn = () => {
  const { t } = F("common"), { user: s } = me(), { currentOrgId: n, setCurrentOrgId: a } = Re(), i = (s == null ? void 0 : s.organizations) || [], r = (u) => {
    a(u), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const m = i.find((u) => u.id === n), o = m ? m.name : t("organization.global", { defaultValue: "Global" }), d = [
    ...i.map((u) => ({
      key: u.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: u.name }),
        n === u.id && /* @__PURE__ */ e.jsx(et, {})
      ] }),
      onClick: () => r(u.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    xe,
    {
      menu: {
        items: d,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(tt, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: o })
      ]
    }
  );
}, Rt = ft(() => Promise.resolve().then(() => Ut)), hn = () => {
  const { t } = F("ai"), [s, n] = x(!1), a = () => {
    n(!0);
  }, i = () => {
    n(!1);
  };
  return console.log(s), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      pe,
      {
        title: t("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
        placement: "left",
        children: /* @__PURE__ */ e.jsx(
          He,
          {
            icon: /* @__PURE__ */ e.jsx(nt, {}),
            type: "primary",
            onClick: a,
            style: {
              right: 24,
              bottom: 24
            }
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      G,
      {
        width: 1200,
        open: s,
        onCancel: i,
        footer: null,
        children: wt(Rt)
      }
    )
  ] });
}, Mt = ({
  permission: t,
  permissions: s = [],
  checkAll: n = !1,
  fallback: a = null,
  children: i
}) => {
  const { hasPermission: r, hasAnyPermission: m, hasAllPermissions: o, isAdmin: d, loading: u } = se();
  return u ? null : d ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : s.length > 0 ? (n ? o(s) : m(s)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: i });
}, pn = ({
  fallback: t = null,
  children: s
}) => {
  const { isAdmin: n, loading: a } = se();
  return a ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, H = (t) => {
  const [s, n] = x(!1), { permission: a, icon: i, tooltip: r, onClick: m, confirm: o, label: d, ...u } = t;
  return a ? /* @__PURE__ */ e.jsx(Mt, { permission: a, children: H({ icon: i, tooltip: r, onClick: m, confirm: o, label: d, ...u }) }, t.key) : o ? /* @__PURE__ */ e.jsx(te, { title: o.title, onConfirm: o.onConfirm || m, okText: o.okText, cancelText: o.cancelText, children: H({ icon: i, tooltip: r, label: d, ...u }) }, t.key) : r ? /* @__PURE__ */ e.jsx(pe, { title: r, children: H({ icon: i, onClick: m, label: d, ...u }) }, t.key) : /* @__PURE__ */ xt(I, { type: "text", size: "small", loading: s, icon: i, onClick: m ? async () => {
    console.log(/* @__PURE__ */ new Date(), "handleClick"), n(!0);
    try {
      await m();
    } finally {
      n(!1), console.log(/* @__PURE__ */ new Date(), "handleClick1");
    }
  } : void 0, ...u, key: t.key }, d && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: d }));
}, gn = ({ actions: t }) => t.filter((s) => !s.hidden).map((s) => H(s)), Bt = Qe, Et = (t) => Bt[t], fn = ({ iconName: t }) => {
  if (!t)
    return null;
  const s = Et(t);
  return s ? /* @__PURE__ */ e.jsx(yt, { fallback: null, children: /* @__PURE__ */ e.jsx(s, {}) }) : null;
}, xn = ({ onChange: t }) => {
  const [s, n] = x(""), [a, i] = x("");
  return /* @__PURE__ */ e.jsxs(M.Compact, { children: [
    /* @__PURE__ */ e.jsx(z, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (r) => n(r.target.value) }),
    /* @__PURE__ */ e.jsx(z, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(z, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => i(r.target.value) }),
    /* @__PURE__ */ e.jsx(I, { type: "primary", icon: /* @__PURE__ */ e.jsx(ge, {}), onClick: () => {
      t(s, a);
    } })
  ] });
}, Vt = ({ request: t, tableRef: s, ...n }, a) => {
  const [i, r] = x({
    current: 1,
    pageSize: 10
  }), [m, o] = x(0), { data: d, loading: u, refresh: v } = D(async () => {
    const h = await t({
      current: i.current,
      page_size: i.pageSize
    });
    return o(h.total), h.data;
  }, {
    refreshDeps: [i]
  });
  return vt(a, () => ({
    reload: () => {
      v();
    }
  })), /* @__PURE__ */ e.jsx(
    ae,
    {
      rowKey: "id",
      loading: u,
      dataSource: d ?? [],
      pagination: {
        ...i,
        total: m,
        onChange: (h, g) => {
          r({ current: h, pageSize: g });
        }
      },
      ...n,
      ref: s
    }
  );
}, yn = ({ actionRef: t, ...s }) => {
  const [n, a] = x();
  return O(() => {
    a(jt(Vt));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...s, ref: t }) : null;
}, jn = ({ onSuccess: t, token: s }) => {
  const { t: n } = F("authorization"), { t: a } = F("common"), [i] = j.useForm(), { run: r, loading: m } = D(async (o) => C.authorization.changePassword(o, s ? { headers: { Authorization: `Bearer ${s}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      S.success(n("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (o) => {
      if (o instanceof St) {
        const d = o.code ?? "normal";
        S.error(n(`user.passwordChangeFailed.${d}`, { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        S.error(n("user.passwordChangeFailed.normal", { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", o);
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
            children: /* @__PURE__ */ e.jsx(z.Password, {})
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
            children: /* @__PURE__ */ e.jsx(z.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          j.Item,
          {
            name: "confirm_password",
            label: n("user.confirmPassword"),
            rules: [
              { required: !0, message: n("validation.confirmPasswordRequired") },
              ({ getFieldValue: o }) => ({
                validator(d, u) {
                  return !u || o("new_password") === u ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(z.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(j.Item, { children: /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", loading: m, children: a("save") }) })
      ]
    }
  );
}, vn = ({ user: t, onSuccess: s }) => {
  const { t: n } = F("authorization"), { t: a } = F("common"), [i] = j.useForm(), [r, m] = x(!1);
  gt.useEffect(() => {
    t && i.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, i]);
  const o = async (d) => {
    try {
      m(!0), await C.authorization.updateCurrentUser(d), S.success(a("updateSuccess")), s();
    } catch (u) {
      S.error(a("updateFailed")), console.error("Failed to update user information:", u);
    } finally {
      m(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        n("user.roles"),
        ": ",
        t.roles.map((d) => d.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      j,
      {
        form: i,
        layout: "vertical",
        onFinish: o,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(Dt, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(z, { disabled: !0 })
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
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          ),
          /* @__PURE__ */ e.jsx(j.Item, { children: /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", loading: r, children: a("save") }) })
        ]
      }
    )
  ] });
}, bn = ({ user: t, onSuccess: s }) => {
  const { t: n } = F("authorization"), { t: a } = F("common"), [i, r] = x(0), [m, o] = x(!1), [d, u] = x(!0), [v, h] = x(""), [g, k] = x("totp"), { run: c, data: b = { secret: "", qr_code: "", token: void 0 } } = D(
    () => C.authorization.enableMfa(g),
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
  ), E = async () => {
    if (!v) {
      S.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const A = {
      code: v,
      mfa_type: g
    };
    "token" in b && (A.token = b.token);
    try {
      o(!0), await C.authorization.verifyAndActivateMfa(A), S.success(n("mfa.enableSuccess")), r(2), s();
    } catch (_) {
      S.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", _);
    } finally {
      o(!1);
    }
  }, f = async () => {
    try {
      o(!0), await C.authorization.disableMfa(), S.success(n("mfa.disableSuccess")), s();
    } catch (A) {
      S.error(a("operationFailed")), console.error("Failed to disable MFA:", A);
    } finally {
      o(!1);
    }
  }, L = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        le,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            I,
            {
              danger: !0,
              onClick: () => {
                G.confirm({
                  title: n("mfa.confirmDisable"),
                  content: n("mfa.disableWarning"),
                  onOk: f,
                  okButtonProps: { danger: !0 }
                });
              },
              children: n("mfa.disable")
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
              ce,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(g === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
                ] }),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20 }
              }
            ),
            /* @__PURE__ */ e.jsx(
              I,
              {
                type: "primary",
                onClick: c,
                loading: m,
                children: n("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              ce,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: g === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: g === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Ge, { value: b.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: g === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: g === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: d ? "*".repeat(((_ = b.secret) == null ? void 0 : _.length) ?? 0) : b.secret }),
              /* @__PURE__ */ e.jsx(
                I,
                {
                  type: "link",
                  onClick: () => u(!d),
                  icon: d ? /* @__PURE__ */ e.jsx(fe, {}) : /* @__PURE__ */ e.jsx(rt, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              z,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: v,
                onChange: (T) => h(T.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(M, { children: [
              /* @__PURE__ */ e.jsx(I, { onClick: () => r(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                I,
                {
                  type: "primary",
                  onClick: E,
                  loading: m,
                  children: a("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            le,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(I, { type: "primary", onClick: () => r(0), children: a("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: i === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          Ue,
          {
            defaultValue: "totp",
            onChange: (_) => {
              k(_), r(0);
            },
            value: g,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(st, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(at, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(he, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Ke,
        {
          current: i,
          items: [
            { title: n(g === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(g === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(g === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(g === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(g === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(g === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      A()
    ] });
  };
  return /* @__PURE__ */ e.jsx(U, { title: n("mfa.title"), children: L() });
}, { Text: Z } = We, wn = () => {
  const { t } = F("authorization"), { t: s } = F("common"), [n, a] = x([]), [i, r] = x(!1), [m, o] = x(null), [d, u] = x(!1), v = async () => {
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
  O(() => {
    v();
  }, []);
  const h = async (c) => {
    try {
      o(c), await C.authorization.terminateSession({ id: c }), a(n.filter((b) => b.id !== c)), S.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (b) {
      S.error(t("session.terminateFailed", { error: b, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      o(null);
    }
  }, g = async () => {
    try {
      u(!0), await C.authorization.terminateOtherSessions(), a(n.filter((c) => c.is_current)), S.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (c) {
      S.error(t("session.terminateAllFailed", { error: c, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      u(!1);
    }
  }, k = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (c, b) => /* @__PURE__ */ e.jsxs(M, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(M, { children: [
          /* @__PURE__ */ e.jsx(it, {}),
          /* @__PURE__ */ e.jsx(Z, { strong: !0, children: c })
        ] }),
        /* @__PURE__ */ e.jsxs(M, { children: [
          /* @__PURE__ */ e.jsx(ot, {}),
          /* @__PURE__ */ e.jsx(Z, { type: "secondary", children: b.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (c) => /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(lt, {}),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (c) => /* @__PURE__ */ e.jsxs(M, { children: [
        /* @__PURE__ */ e.jsx(ct, {}),
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
      render: (c) => c.is_current ? /* @__PURE__ */ e.jsx(Z, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        te,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => h(c.id),
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            I,
            {
              type: "link",
              danger: !0,
              loading: m === c.id,
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
        te,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: g,
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            I,
            {
              danger: !0,
              loading: d,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: n.length === 0 ? /* @__PURE__ */ e.jsx(Xe, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        ae,
        {
          columns: k,
          dataSource: n,
          rowKey: "id",
          loading: i,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: Nt } = Ye, { Option: B } = ne, $t = (t) => t || "N/A", Ot = (t, s) => t === "success" ? /* @__PURE__ */ e.jsx(K, { color: "success", children: s("statuses.success") }) : /* @__PURE__ */ e.jsx(K, { color: "error", children: s("statuses.failed") }), Sn = ({
  userId: t,
  request: s = (a) => t ? C.authorization.getUserLogs({ id: t, ...a }) : C.authorization.getCurrentUserLogs(a),
  columnsFilter: n = (a) => a
}) => {
  const { t: a } = F("authorization"), { t: i } = F("common"), [r, m] = x({
    current: 1,
    pageSize: 10,
    total: 0
  }), [o, d] = x({}), [u] = j.useForm(), { loading: v, run: h, data: { data: g } = {} } = D(async (f = o, L = 1, A = 10) => s({
    ...f,
    current: L ?? 1,
    page_size: A ?? 10
  }), {
    onError(f) {
      S.error(a("auditLog.fetchFailed", { error: f }));
    },
    onSuccess({ total: f }) {
      m({
        ...r,
        total: f
      });
    }
  });
  O(() => {
    h(o, 1, r.pageSize);
  }, []);
  const k = (f) => {
    m({
      ...r,
      current: f.current,
      pageSize: f.pageSize
    }), h({}, f.current, f.pageSize);
  }, c = (f) => {
    var L, A, _, T;
    h({
      ...f,
      start_time: (A = (L = f.dateRange) == null ? void 0 : L[0]) == null ? void 0 : A.toISOString(),
      end_time: (T = (_ = f.dateRange) == null ? void 0 : _[1]) == null ? void 0 : T.toISOString()
    }, 1, r.pageSize);
  }, b = () => {
    u.resetFields(), d({}), m({ ...r, current: 1 }), h({}, 1, r.pageSize);
  }, E = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (f) => Be(f)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (f, L) => f ? a(`action.${f.replace(":", ".")}`, { defaultValue: L.action_name }) : L.action_name ?? L.action
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
      render: (f) => $t(f)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (f) => Ot(f, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (f) => /* @__PURE__ */ e.jsx(I, { type: "link", icon: /* @__PURE__ */ e.jsx(fe, {}), onClick: () => {
        G.info({
          title: a("auditLog.details"),
          content: JSON.stringify(f)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(U, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      j,
      {
        form: u,
        layout: "horizontal",
        onFinish: c,
        initialValues: o,
        children: [
          /* @__PURE__ */ e.jsxs(de, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx($, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(z, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx($, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs(ne, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(B, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(B, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(B, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(B, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx($, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs(ne, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(B, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(B, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx($, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(Nt, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(de, { children: /* @__PURE__ */ e.jsx($, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(M, { children: [
            /* @__PURE__ */ e.jsx(I, { onClick: b, children: i("reset") }),
            /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(dt, {}), children: i("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(U, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        I,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(ut, {}),
          onClick: b,
          style: { marginRight: 8 },
          children: i("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        ae,
        {
          rowKey: "id",
          columns: n(E),
          dataSource: g,
          pagination: {
            ...r,
            showSizeChanger: !0,
            showTotal: (f) => i("totalItems", { total: f })
          },
          loading: v,
          onChange: k,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, ue = Pe({ html: !0, breaks: !0 }), qt = W(({ token: t, css: s }) => ({
  layout: s`
      width: 100%;
      min-width: 500px;
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
      max-width: 700px;
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
class ee extends Error {
  constructor(n, a) {
    super(n);
    ie(this, "buffer");
    this.buffer = a;
  }
}
const Ht = () => {
  const { t } = F("ai"), { t: s } = F("common"), { styles: n } = qt(), a = bt(null), [i, r] = x({}), [m, o] = x([]), [d, u] = x(), [v, h] = x(""), [g] = Ae({
    request: async ({ message: l, sessionId: p }, { onSuccess: y, onUpdate: w, onError: V, onStream: N }) => {
      if (!p)
        return;
      const X = new AbortController(), R = {
        buffer: [],
        messageID: ""
      };
      try {
        N == null || N(X);
        const Y = await C.ai.streamChat({ sessionId: p }, {
          content: l.content
        }, {
          signal: X.signal,
          requestType: "sse"
        });
        for await (const Ce of Le({
          readableStream: Y
        })) {
          const P = JSON.parse(Ce.data);
          if (P.event_type, P.event_type === "error") {
            V(new ee(P.content, R.buffer));
            return;
          }
          P.event_type === "content" && (R.messageID === "" && (R.messageID = P.message_id), R.messageID !== P.message_id && (R.messageID = P.message_id), R.buffer.push(P.content), w(P.content));
        }
        y(R.buffer);
      } catch (Y) {
        V(new ee(`${Y}`, R.buffer)), X.abort();
      }
    }
  }), k = g.isRequesting(), { loading: c } = D(async () => {
    const l = await C.ai.listChatSessions({ current: 1, page_size: 20 });
    o(l.data);
  }), { run: b, loading: E } = D(async (l) => await C.ai.createChatSession({ title: t("chat.defaultConversationTitle"), model_id: "" }), {
    manual: !0,
    onSuccess: (l, [p]) => {
      o((y) => [{ ...l, loading: !1 }, ...y]), u(l.id), re([]), p && _({
        stream: !0,
        message: {
          role: "user",
          content: p
        },
        sessionId: l.id
      });
    }
  }), { run: f } = D(async (l) => await C.ai.deleteChatSession({ sessionId: l }), {
    manual: !0,
    onError(l, p) {
      S.error(t("chat.deleteConversationFailed")), o((y) => y.map((w) => w.id === p[0] ? { ...w, loading: !1 } : w));
    },
    onSuccess(l, p) {
      var V;
      const y = m.filter((N) => N.id !== p[0]), w = (V = y == null ? void 0 : y[0]) == null ? void 0 : V.id;
      o(y), p[0] === d && u(w);
    }
  }), { run: L, loading: A } = D(async (l) => await C.ai.getChatSession({ sessionId: l }), {
    manual: !0,
    onSuccess: (l, [p]) => {
      r((y) => ({
        ...y,
        [p]: l.messages.filter((w) => w.role !== "tool").map((w) => ({
          id: w.id,
          message: {
            content: w.content,
            role: w.role
          },
          status: "loading"
        }))
      }));
    }
  }), { onRequest: _, messages: T, setMessages: re } = _e({
    agent: g,
    requestPlaceholder: () => ({
      content: s("loading"),
      role: "assistant"
    }),
    requestFallback: (l, { error: p }) => (console.log(p), p instanceof ee ? {
      content: p.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: p.message
    } : {
      content: `${p}`,
      role: "assistant"
    }),
    resolveAbortController: (l) => {
      a.current = l;
    },
    transformMessage: (l) => {
      const { originMessage: p, chunk: y } = l || {};
      return y ? {
        role: "assistant",
        content: ((p == null ? void 0 : p.content) || "") + y
      } : {
        role: "assistant",
        content: (p == null ? void 0 : p.content) || ""
      };
    }
  });
  O(() => {
    if (!d) return;
    const l = i[d];
    l ? re(l) : L(d);
  }, [i, d]);
  const je = (l) => {
    if (l) {
      if (k) {
        S.error(t("chat.requestInProgress"));
        return;
      }
      if (!d) {
        b(l);
        return;
      }
      _({
        stream: !0,
        message: {
          role: "user",
          content: l
        },
        sessionId: d
      });
    }
  }, ve = /* @__PURE__ */ e.jsxs("div", { className: n.sider, children: [
    /* @__PURE__ */ e.jsx(
      I,
      {
        onClick: () => {
          b();
        },
        type: "link",
        className: n.addBtn,
        icon: /* @__PURE__ */ e.jsx(ge, {}),
        loading: E,
        children: t("chat.newConversation")
      }
    ),
    /* @__PURE__ */ e.jsx(q, { spinning: c, wrapperClassName: n.conversationsSpin, children: /* @__PURE__ */ e.jsx(
      ze,
      {
        items: m.map((l) => ({
          key: l.id,
          label: l.title,
          group: Q(l.start_time).isSame(Q(), "day") ? t("chat.today") : Q(l.start_time).format("YYYY-MM-DD")
        })),
        activeKey: d,
        onActiveChange: async (l) => {
          var p;
          l && ((p = a.current) == null || p.abort(), u((y) => (y && r((w) => ({
            ...w,
            [y]: T
          })), l)));
        },
        className: n.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (l) => ({
          items: [
            {
              label: t("chat.renameConversation"),
              key: "rename",
              icon: /* @__PURE__ */ e.jsx(mt, {})
            },
            {
              label: s("delete"),
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(ht, {}),
              danger: !0,
              onClick: () => {
                o((p) => p.map((y) => y.id === l.key ? { ...y, loading: !0 } : y)), f(l.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), be = ({ message: l }) => {
    if (l.error)
      return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx("div", { dangerouslySetInnerHTML: { __html: ue.render(l.error) } }) });
  }, we = /* @__PURE__ */ e.jsx("div", { className: n.chatList, children: /* @__PURE__ */ e.jsx(q, { spinning: A, children: /* @__PURE__ */ e.jsx(
    Te.List,
    {
      items: T == null ? void 0 : T.map((l) => ({
        ...l.message,
        messageRender: (p) => /* @__PURE__ */ e.jsx("div", { dangerouslySetInnerHTML: { __html: ue.render(p) } }),
        footer: be(l)
      })),
      style: { height: "100%", paddingInline: "calc(calc(100% - 700px) /2)" },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ e.jsx(q, { size: "small" })
        },
        user: { placement: "end" }
      }
    }
  ) }) }), Se = /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    De,
    {
      value: v,
      onSubmit: () => {
        je(v.trim()), h("");
      },
      onChange: h,
      onCancel: () => {
        var l;
        (l = a.current) == null || l.abort();
      },
      loading: k,
      className: n.sender,
      allowSpeech: !0,
      actions: (l, p) => {
        const { SendButton: y, LoadingButton: w } = p.components;
        return /* @__PURE__ */ e.jsx(Je, { gap: 4, children: k ? /* @__PURE__ */ e.jsx(w, { type: "default" }) : /* @__PURE__ */ e.jsx(y, { type: "primary" }) });
      },
      placeholder: t("chat.inputPlaceholder")
    }
  ) });
  return /* @__PURE__ */ e.jsxs("div", { className: n.layout, children: [
    ve,
    /* @__PURE__ */ e.jsxs("div", { className: n.chat, children: [
      we,
      Se
    ] })
  ] });
}, Ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ht
}, Symbol.toStringTag, { value: "Module" }));
export {
  Tt as A,
  fn as D,
  xe as H,
  kt as L,
  mn as O,
  dn as P,
  yn as T,
  Sn as U,
  un as a,
  hn as b,
  gn as c,
  Dt as d,
  xn as e,
  _t as f,
  Et as g,
  Mt as h,
  pn as i,
  jn as j,
  vn as k,
  bn as l,
  wn as m
};
