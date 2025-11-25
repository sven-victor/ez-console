var Le = Object.defineProperty;
var Ae = (t, s, n) => s in t ? Le(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[s] = n;
var oe = (t, s, n) => Ae(t, typeof s != "symbol" ? s + "" : s, n);
import { j as e, I as Pe, u as Te, X as ze, a as De, C as Re, F as Me, M as $e, S as Oe } from "./vendor.js";
import { Navigate as le } from "react-router-dom";
import { u as xe, a as ae, b as Ve, c as Be } from "./contexts.js";
import { g as Ne, f as Ee, c as qe } from "./base.js";
import { Spin as H, Dropdown as He, Avatar as Ue, Upload as Ke, Modal as J, Popover as Ge, List as Je, Divider as fe, Skeleton as We, Tooltip as ye, FloatButton as Xe, Popconfirm as se, Button as k, Space as R, Input as _, Table as re, Form as y, message as C, Card as K, Result as ce, Segmented as Ye, Steps as Qe, Alert as de, QRCode as Ze, Typography as et, Tag as G, Empty as tt, Row as ue, Col as E, Select as O, DatePicker as nt, Checkbox as me, Switch as st, InputNumber as at, Flex as rt } from "antd";
import { useTranslation as F } from "react-i18next";
import { createStyles as W } from "antd-style";
import * as it from "@ant-design/icons";
import { UploadOutlined as ot, CheckOutlined as lt, TeamOutlined as ct, RobotOutlined as dt, PlusOutlined as je, ClockCircleFilled as ut, MailOutlined as mt, EyeOutlined as ve, EyeInvisibleOutlined as ht, LaptopOutlined as pt, EnvironmentOutlined as gt, GlobalOutlined as xt, ClockCircleOutlined as ft, SearchOutlined as yt, ReloadOutlined as jt, EditOutlined as vt, DeleteOutlined as bt } from "@ant-design/icons";
import wt from "classnames";
import St, { useState as j, useEffect as q, lazy as Ct, createElement as It, Suspense as kt, forwardRef as Ft, useImperativeHandle as _t, useMemo as he, useRef as Lt } from "react";
import { a as I, w as At } from "./index.js";
import { useRequest as M } from "ahooks";
import { b as Q, A as Pt } from "./client.js";
import Tt from "antd-img-crop";
import { isString as zt } from "lodash";
import Z from "dayjs";
const Dt = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(H, { size: "large" }) }), yn = ({
  element: t,
  requiredPermission: s,
  requiredPermissions: n
}) => {
  const { user: a, loading: i } = xe(), { hasPermission: r, hasAllPermissions: p } = ae();
  return i ? /* @__PURE__ */ e.jsx(Dt, {}) : a ? s && !r(s) ? /* @__PURE__ */ e.jsx(le, { to: "/forbidden", replace: !0 }) : n && !p(n) ? /* @__PURE__ */ e.jsx(le, { to: "/forbidden", replace: !0 }) : t : (window.location.href = Ne("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Rt = W(({ token: t, css: s }) => ({
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
})), be = ({
  overlayClassName: t,
  overlay: s,
  hidden: n,
  children: a,
  ...i
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: r } = Rt();
  return /* @__PURE__ */ e.jsx(
    He,
    {
      dropdownRender: s,
      overlayClassName: wt(r.container, t),
      ...i,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: a })
    }
  );
}, Mt = () => /* @__PURE__ */ e.jsxs(
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
), $t = W(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), Ot = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], jn = ({
  transformLangConfig: t = (s) => s
}) => {
  const { i18n: s } = F(), { styles: n } = $t(), a = (r) => {
    s.changeLanguage(r);
  }, i = {
    selectedKeys: [s.language],
    onClick: (r) => {
      a(r.key);
    },
    items: t(Ot).map((r) => ({
      key: r.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: n.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    be,
    {
      menu: i,
      children: /* @__PURE__ */ e.jsx(Mt, {})
    }
  );
}, Vt = W(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), we = (t) => zt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? Q.endsWith("/") ? Q + `files/${t}` : Q + `/files/${t}` : t, Bt = ({ src: t, ...s }) => /* @__PURE__ */ e.jsx(Ue, { src: we(t), ...s }), Nt = ({ onChange: t, shape: s = "square" }) => {
  const [n, a] = j([]), { styles: i } = Vt(), [r, p] = j(!1), [o, h] = j(!0), [u, w] = j(0), { run: d, loading: m } = M(() => I.base.listFiles({ current: u + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: l }) => {
      a([...n, ...l]), h(l.length === 40), w(u + 1);
    }
  }), v = () => {
    h(!0), w(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    Ge,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (l) => {
        p(l), l ? d() : v();
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
            Pe,
            {
              dataLength: n.length,
              next: () => {
                d();
              },
              hasMore: o,
              loader: /* @__PURE__ */ e.jsx(We, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(fe, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                Je,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: m,
                  renderItem: ({ id: l }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: i.avatarItem,
                      onClick: (g) => {
                        g.stopPropagation(), t == null || t(l), p(!1), v();
                      },
                      children: /* @__PURE__ */ e.jsx(Bt, { shape: s, src: l })
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
        ot,
        {
          shape: s,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, Et = ({ value: t, onChange: s, shape: n, ...a }) => {
  const [i, r] = j(void 0), [p, o] = j(!1), [h, u] = j(void 0), w = async (d) => {
    o(!0), u(d.url ?? d.preview);
  };
  return q(() => {
    r(t ? {
      uid: t,
      name: t,
      url: we(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Tt,
      {
        beforeCrop: async (d) => {
          if (d.type === "image/svg+xml") {
            const m = await I.base.uploadFile({ type: "avatar" }, d);
            return m.length > 0 && (s == null || s(m[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          Ke,
          {
            customRequest: async (d) => {
              var v, l;
              const m = await I.base.uploadFile({ type: "avatar", access: "public" }, d.file);
              m.length > 0 ? ((v = d.onSuccess) == null || v.call(d, m[0].id), s == null || s(m[0].id)) : (l = d.onError) == null || l.call(d, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: w,
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
            children: i ? void 0 : /* @__PURE__ */ e.jsx(Nt, { shape: n, onChange: s })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(J, { open: p, footer: null, onCancel: () => o(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: h }) })
  ] });
}, vn = () => {
  const { t } = F("common"), { user: s } = xe(), { currentOrgId: n, setCurrentOrgId: a } = Ve(), i = (s == null ? void 0 : s.organizations) || [], r = (u) => {
    a(u), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const p = i.find((u) => u.id === n), o = p ? p.name : t("organization.global", { defaultValue: "Global" }), h = [
    ...i.map((u) => ({
      key: u.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: u.name }),
        n === u.id && /* @__PURE__ */ e.jsx(lt, {})
      ] }),
      onClick: () => r(u.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    be,
    {
      menu: {
        items: h,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(ct, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: o })
      ]
    }
  );
}, qt = Ct(() => Promise.resolve().then(() => Zt)), bn = () => {
  const { t } = F("ai"), [s, n] = j(!1), a = () => {
    n(!0);
  }, i = () => {
    n(!1);
  };
  return console.log(s), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      ye,
      {
        title: t("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
        placement: "left",
        children: /* @__PURE__ */ e.jsx(
          Xe,
          {
            icon: /* @__PURE__ */ e.jsx(dt, {}),
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
      J,
      {
        width: 1200,
        open: s,
        onCancel: i,
        footer: null,
        children: At(qt)
      }
    )
  ] });
}, Ht = ({
  permission: t,
  permissions: s = [],
  checkAll: n = !1,
  fallback: a = null,
  children: i
}) => {
  const { hasPermission: r, hasAnyPermission: p, hasAllPermissions: o, isAdmin: h, loading: u } = ae();
  return u ? null : h ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : s.length > 0 ? (n ? o(s) : p(s)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: i });
}, wn = ({
  fallback: t = null,
  children: s
}) => {
  const { isAdmin: n, loading: a } = ae();
  return a ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, U = (t) => {
  const [s, n] = j(!1), { permission: a, icon: i, tooltip: r, onClick: p, confirm: o, label: h, ...u } = t;
  return a ? /* @__PURE__ */ e.jsx(Ht, { permission: a, children: U({ icon: i, tooltip: r, onClick: p, confirm: o, label: h, ...u }) }, t.key) : o ? /* @__PURE__ */ e.jsx(se, { title: o.title, onConfirm: o.onConfirm || p, okText: o.okText, cancelText: o.cancelText, children: U({ icon: i, tooltip: r, label: h, ...u }) }, t.key) : r ? /* @__PURE__ */ e.jsx(ye, { title: r, children: U({ icon: i, onClick: p, label: h, ...u }) }, t.key) : /* @__PURE__ */ It(k, { type: "text", size: "small", loading: s, icon: i, onClick: p ? async () => {
    console.log(/* @__PURE__ */ new Date(), "handleClick"), n(!0);
    try {
      await p();
    } finally {
      n(!1), console.log(/* @__PURE__ */ new Date(), "handleClick1");
    }
  } : void 0, ...u, key: t.key }, h && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: h }));
}, Sn = ({ actions: t }) => t.filter((s) => !s.hidden).map((s) => U(s)), Ut = it, Kt = (t) => Ut[t], Cn = ({ iconName: t }) => {
  if (!t)
    return null;
  const s = Kt(t);
  return s ? /* @__PURE__ */ e.jsx(kt, { fallback: null, children: /* @__PURE__ */ e.jsx(s, {}) }) : null;
}, In = ({ onChange: t }) => {
  const [s, n] = j(""), [a, i] = j("");
  return /* @__PURE__ */ e.jsxs(R.Compact, { children: [
    /* @__PURE__ */ e.jsx(_, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (r) => n(r.target.value) }),
    /* @__PURE__ */ e.jsx(_, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(_, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => i(r.target.value) }),
    /* @__PURE__ */ e.jsx(k, { type: "primary", icon: /* @__PURE__ */ e.jsx(je, {}), onClick: () => {
      t(s, a);
    } })
  ] });
}, Gt = ({ request: t, tableRef: s, ...n }, a) => {
  const [i, r] = j({
    current: 1,
    pageSize: 10
  }), [p, o] = j(0), { data: h, loading: u, refresh: w } = M(async () => {
    const d = await t({
      current: i.current,
      page_size: i.pageSize
    });
    return o(d.total), d.data;
  }, {
    refreshDeps: [i]
  });
  return _t(a, () => ({
    reload: () => {
      w();
    }
  })), /* @__PURE__ */ e.jsx(
    re,
    {
      rowKey: "id",
      loading: u,
      dataSource: h ?? [],
      pagination: {
        ...i,
        total: p,
        onChange: (d, m) => {
          r({ current: d, pageSize: m });
        }
      },
      ...n,
      ref: s
    }
  );
}, kn = ({ actionRef: t, ...s }) => {
  const [n, a] = j();
  return q(() => {
    a(Ft(Gt));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...s, ref: t }) : null;
}, Fn = ({ onSuccess: t, token: s }) => {
  const { t: n } = F("authorization"), { t: a } = F("common"), [i] = y.useForm(), { run: r, loading: p } = M(async (o) => I.authorization.changePassword(o, s ? { headers: { Authorization: `Bearer ${s}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      C.success(n("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (o) => {
      if (o instanceof Pt) {
        const h = o.code ?? "normal";
        C.error(n(`user.passwordChangeFailed.${h}`, { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        C.error(n("user.passwordChangeFailed.normal", { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", o);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    y,
    {
      form: i,
      layout: "vertical",
      onFinish: r,
      style: { maxWidth: 500, margin: "0 auto" },
      children: [
        /* @__PURE__ */ e.jsx(
          y.Item,
          {
            name: "old_password",
            label: n("user.oldPassword"),
            rules: [{ required: !0, message: n("validation.oldPasswordRequired") }],
            children: /* @__PURE__ */ e.jsx(_.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          y.Item,
          {
            name: "new_password",
            label: n("user.newPassword"),
            rules: [
              { required: !0, message: n("validation.newPasswordRequired") },
              { min: 8, message: n("validation.passwordMinLength") }
            ],
            children: /* @__PURE__ */ e.jsx(_.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          y.Item,
          {
            name: "confirm_password",
            label: n("user.confirmPassword"),
            rules: [
              { required: !0, message: n("validation.confirmPasswordRequired") },
              ({ getFieldValue: o }) => ({
                validator(h, u) {
                  return !u || o("new_password") === u ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(_.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(y.Item, { children: /* @__PURE__ */ e.jsx(k, { type: "primary", htmlType: "submit", loading: p, children: a("save") }) })
      ]
    }
  );
}, _n = ({ user: t, onSuccess: s }) => {
  const { t: n } = F("authorization"), { t: a } = F("common"), [i] = y.useForm(), [r, p] = j(!1);
  St.useEffect(() => {
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
      p(!0), await I.authorization.updateCurrentUser(h), C.success(a("updateSuccess")), s();
    } catch (u) {
      C.error(a("updateFailed")), console.error("Failed to update user information:", u);
    } finally {
      p(!1);
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
      y,
      {
        form: i,
        layout: "vertical",
        onFinish: o,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            y.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(Et, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            y.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(_, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            y.Item,
            {
              name: "email",
              label: n("user.email"),
              rules: [
                { required: !0, message: n("validation.emailRequired") },
                { type: "email", message: n("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            y.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            y.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          ),
          /* @__PURE__ */ e.jsx(y.Item, { children: /* @__PURE__ */ e.jsx(k, { type: "primary", htmlType: "submit", loading: r, children: a("save") }) })
        ]
      }
    )
  ] });
}, Ln = ({ user: t, onSuccess: s }) => {
  const { t: n } = F("authorization"), { t: a } = F("common"), [i, r] = j(0), [p, o] = j(!1), [h, u] = j(!0), [w, d] = j(""), [m, v] = j("totp"), { run: l, data: g = { secret: "", qr_code: "", token: void 0 } } = M(
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
  ), A = async () => {
    if (!w) {
      C.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const L = {
      code: w,
      mfa_type: m
    };
    "token" in g && (L.token = g.token);
    try {
      o(!0), await I.authorization.verifyAndActivateMfa(L), C.success(n("mfa.enableSuccess")), r(2), s();
    } catch (T) {
      C.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", T);
    } finally {
      o(!1);
    }
  }, x = async () => {
    try {
      o(!0), await I.authorization.disableMfa(), C.success(n("mfa.disableSuccess")), s();
    } catch (L) {
      C.error(a("operationFailed")), console.error("Failed to disable MFA:", L);
    } finally {
      o(!1);
    }
  }, P = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        ce,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            k,
            {
              danger: !0,
              onClick: () => {
                J.confirm({
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
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              de,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(m === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
                ] }),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20 }
              }
            ),
            /* @__PURE__ */ e.jsx(
              k,
              {
                type: "primary",
                onClick: l,
                loading: p,
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
                style: { marginBottom: 20, display: m === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: m === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Ze, { value: g.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: m === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: m === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: h ? "*".repeat(((T = g.secret) == null ? void 0 : T.length) ?? 0) : g.secret }),
              /* @__PURE__ */ e.jsx(
                k,
                {
                  type: "link",
                  onClick: () => u(!h),
                  icon: h ? /* @__PURE__ */ e.jsx(ve, {}) : /* @__PURE__ */ e.jsx(ht, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              _,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: w,
                onChange: (z) => d(z.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(R, { children: [
              /* @__PURE__ */ e.jsx(k, { onClick: () => r(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                k,
                {
                  type: "primary",
                  onClick: A,
                  loading: p,
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
              extra: /* @__PURE__ */ e.jsx(k, { type: "primary", onClick: () => r(0), children: a("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: i === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          Ye,
          {
            defaultValue: "totp",
            onChange: (T) => {
              v(T), r(0);
            },
            value: m,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(ut, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(mt, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(fe, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Qe,
        {
          current: i,
          items: [
            { title: n(m === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(m === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(m === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(m === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(m === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(m === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      L()
    ] });
  };
  return /* @__PURE__ */ e.jsx(K, { title: n("mfa.title"), children: P() });
}, { Text: ee } = et, An = () => {
  const { t } = F("authorization"), { t: s } = F("common"), [n, a] = j([]), [i, r] = j(!1), [p, o] = j(null), [h, u] = j(!1), w = async () => {
    try {
      r(!0);
      const l = await I.authorization.getUserSessions({});
      a(l);
    } catch (l) {
      C.error(t("session.getSessionsFailed", { error: l, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      r(!1);
    }
  };
  q(() => {
    w();
  }, []);
  const d = async (l) => {
    try {
      o(l), await I.authorization.terminateSession({ id: l }), a(n.filter((g) => g.id !== l)), C.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (g) {
      C.error(t("session.terminateFailed", { error: g, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      o(null);
    }
  }, m = async () => {
    try {
      u(!0), await I.authorization.terminateOtherSessions(), a(n.filter((l) => l.is_current)), C.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (l) {
      C.error(t("session.terminateAllFailed", { error: l, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      u(!1);
    }
  }, v = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (l, g) => /* @__PURE__ */ e.jsxs(R, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(R, { children: [
          /* @__PURE__ */ e.jsx(pt, {}),
          /* @__PURE__ */ e.jsx(ee, { strong: !0, children: l })
        ] }),
        /* @__PURE__ */ e.jsxs(R, { children: [
          /* @__PURE__ */ e.jsx(gt, {}),
          /* @__PURE__ */ e.jsx(ee, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (l) => /* @__PURE__ */ e.jsxs(R, { children: [
        /* @__PURE__ */ e.jsx(xt, {}),
        /* @__PURE__ */ e.jsx("span", { children: l })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (l) => /* @__PURE__ */ e.jsxs(R, { children: [
        /* @__PURE__ */ e.jsx(ft, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(l).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (l) => l.is_current ? /* @__PURE__ */ e.jsx(G, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(G, { color: "blue", children: t("session.active") })
    },
    {
      title: s("actions"),
      key: "action",
      render: (l) => l.is_current ? /* @__PURE__ */ e.jsx(ee, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        se,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => d(l.id),
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            k,
            {
              type: "link",
              danger: !0,
              loading: p === l.id,
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
      extra: n.length > 1 && /* @__PURE__ */ e.jsx(
        se,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: m,
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            k,
            {
              danger: !0,
              loading: h,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: n.length === 0 ? /* @__PURE__ */ e.jsx(tt, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        re,
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
}, { RangePicker: Jt } = nt, { Option: V } = O, Wt = (t) => t || "N/A", Xt = (t, s) => t === "success" ? /* @__PURE__ */ e.jsx(G, { color: "success", children: s("statuses.success") }) : /* @__PURE__ */ e.jsx(G, { color: "error", children: s("statuses.failed") }), Pn = ({
  userId: t,
  request: s = (a) => t ? I.authorization.getUserLogs({ id: t, ...a }) : I.authorization.getCurrentUserLogs(a),
  columnsFilter: n = (a) => a
}) => {
  const { t: a } = F("authorization"), { t: i } = F("common"), [r, p] = j({
    current: 1,
    pageSize: 10,
    total: 0
  }), [o, h] = j({}), [u] = y.useForm(), { loading: w, run: d, data: { data: m } = {} } = M(async (x = o, P = 1, L = 10) => s({
    ...x,
    current: P ?? 1,
    page_size: L ?? 10
  }), {
    onError(x) {
      C.error(a("auditLog.fetchFailed", { error: x }));
    },
    onSuccess({ total: x }) {
      p({
        ...r,
        total: x
      });
    }
  });
  q(() => {
    d(o, 1, r.pageSize);
  }, []);
  const v = (x) => {
    p({
      ...r,
      current: x.current,
      pageSize: x.pageSize
    }), d({}, x.current, x.pageSize);
  }, l = (x) => {
    var P, L, T, z;
    d({
      ...x,
      start_time: (L = (P = x.dateRange) == null ? void 0 : P[0]) == null ? void 0 : L.toISOString(),
      end_time: (z = (T = x.dateRange) == null ? void 0 : T[1]) == null ? void 0 : z.toISOString()
    }, 1, r.pageSize);
  }, g = () => {
    u.resetFields(), h({}), p({ ...r, current: 1 }), d({}, 1, r.pageSize);
  }, A = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (x) => Ee(x)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (x, P) => x ? a(`action.${x.replace(":", ".")}`, { defaultValue: P.action_name }) : P.action_name ?? P.action
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
      render: (x) => Wt(x)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (x) => Xt(x, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (x) => /* @__PURE__ */ e.jsx(k, { type: "link", icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: () => {
        J.info({
          title: a("auditLog.details"),
          content: JSON.stringify(x)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(K, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      y,
      {
        form: u,
        layout: "horizontal",
        onFinish: l,
        initialValues: o,
        children: [
          /* @__PURE__ */ e.jsxs(ue, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(y.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(_, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(y.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs(O, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(V, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(V, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(V, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(V, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(y.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs(O, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(V, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(V, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(y.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(Jt, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(ue, { children: /* @__PURE__ */ e.jsx(E, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(R, { children: [
            /* @__PURE__ */ e.jsx(k, { onClick: g, children: i("reset") }),
            /* @__PURE__ */ e.jsx(k, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(yt, {}), children: i("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(K, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        k,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(jt, {}),
          onClick: g,
          style: { marginRight: 8 },
          children: i("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        re,
        {
          rowKey: "id",
          columns: n(A),
          dataSource: m,
          pagination: {
            ...r,
            showSizeChanger: !0,
            showTotal: (x) => i("totalItems", { total: x })
          },
          loading: w,
          onChange: v,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { TextArea: pe } = _, { Option: te } = O, Tn = ({
  field: t,
  selectedType: s,
  dependentValues: n,
  formValues: a = {}
}) => {
  const { t: i } = F("system"), { t: r } = F("common"), p = he(() => qe(t.visible_when, a), [t.visible_when, a]), { options: o, loading: h } = Be(
    t.data_source,
    t.options,
    n
  ), u = he(() => t.data_source && t.data_source.type !== "static" ? o : t.options || [], [t.data_source, t.options, o]), w = u && u.length > 0;
  if (!p)
    return null;
  const d = [
    {
      required: t.required,
      message: i("settings.toolsets.fieldRequired", {
        defaultValue: `Please enter ${t.name}`,
        field: t.name
      })
    }
  ], m = () => i(`settings.toolsets.${s}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), v = () => i(`settings.toolsets.${s}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${r("enter", { defaultValue: "Enter" })} ${t.name}`
  }), l = () => {
    if (t.description)
      return i(`settings.toolsets.${s}.${t.name}Tooltip`, {
        defaultValue: t.description
      });
  };
  if (!p)
    return null;
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      y.Item,
      {
        name: ["config", t.name],
        label: m(),
        rules: d,
        tooltip: l(),
        children: /* @__PURE__ */ e.jsx(
          O,
          {
            loading: h,
            allowClear: !0,
            placeholder: v(),
            showSearch: !0,
            filterOption: (g, A) => {
              var x;
              return (x = A == null ? void 0 : A.children) == null ? void 0 : x.toLowerCase().includes(g.toLowerCase());
            },
            children: u.map((g) => /* @__PURE__ */ e.jsx(te, { value: g.value, children: g.label }, g.value))
          }
        )
      },
      t.name
    );
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ e.jsx(
        y.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: d,
          children: /* @__PURE__ */ e.jsx(pe, { placeholder: v(), rows: 4 })
        },
        t.name
      );
    case "string":
      return w ? /* @__PURE__ */ e.jsx(
        y.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: d,
          tooltip: l(),
          children: /* @__PURE__ */ e.jsx(O, { allowClear: !0, placeholder: v(), children: u.map((g) => /* @__PURE__ */ e.jsx(te, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        y.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: d,
          tooltip: l(),
          children: /* @__PURE__ */ e.jsx(_, { placeholder: v() })
        },
        t.name
      );
    case "password":
      return /* @__PURE__ */ e.jsx(
        y.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: d,
          tooltip: l(),
          children: /* @__PURE__ */ e.jsx(_.Password, { placeholder: v(), autoComplete: "new-password" })
        },
        t.name
      );
    case "number":
      return w ? /* @__PURE__ */ e.jsx(
        y.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: d,
          tooltip: l(),
          children: /* @__PURE__ */ e.jsx(O, { allowClear: !0, placeholder: v(), children: u.map((g) => /* @__PURE__ */ e.jsx(te, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        y.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: d,
          tooltip: l(),
          children: /* @__PURE__ */ e.jsx(at, { style: { width: "100%" }, placeholder: v() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        y.Item,
        {
          name: ["config", t.name],
          label: m(),
          valuePropName: "checked",
          tooltip: l(),
          children: /* @__PURE__ */ e.jsx(st, {})
        },
        t.name
      );
    case "array":
      return w ? /* @__PURE__ */ e.jsx(
        y.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: d,
          tooltip: l(),
          children: /* @__PURE__ */ e.jsx(me.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(R, { direction: "vertical", children: u.map((g) => /* @__PURE__ */ e.jsx(me, { value: g.value, children: g.label }, g.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        y.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: d,
          tooltip: l(),
          children: /* @__PURE__ */ e.jsx(
            O,
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
        y.Item,
        {
          name: ["config", t.name],
          label: m(),
          rules: [
            ...d,
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
          tooltip: l(),
          children: /* @__PURE__ */ e.jsx(
            pe,
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
}, ge = $e({ html: !0, breaks: !0 }), Yt = W(({ token: t, css: s }) => ({
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
class ne extends Error {
  constructor(n, a) {
    super(n);
    oe(this, "buffer");
    this.buffer = a;
  }
}
const Qt = () => {
  const { t } = F("ai"), { t: s } = F("common"), { styles: n } = Yt(), a = Lt(null), [i, r] = j({}), [p, o] = j([]), [h, u] = j(), [w, d] = j(""), [m] = Te({
    request: async ({ message: c, sessionId: f }, { onSuccess: b, onUpdate: S, onError: B, onStream: N }) => {
      if (!f)
        return;
      const X = new AbortController(), $ = {
        buffer: [],
        messageID: ""
      };
      try {
        N == null || N(X);
        const Y = await I.ai.streamChat({ sessionId: f }, {
          content: c.content
        }, {
          signal: X.signal,
          requestType: "sse"
        });
        for await (const _e of ze({
          readableStream: Y
        })) {
          const D = JSON.parse(_e.data);
          if (D.event_type, D.event_type === "error") {
            B(new ne(D.content, $.buffer));
            return;
          }
          D.event_type === "content" && ($.messageID === "" && ($.messageID = D.message_id), $.messageID !== D.message_id && ($.messageID = D.message_id), $.buffer.push(D.content), S(D.content));
        }
        b($.buffer);
      } catch (Y) {
        B(new ne(`${Y}`, $.buffer)), X.abort();
      }
    }
  }), v = m.isRequesting(), { loading: l } = M(async () => {
    const c = await I.ai.listChatSessions({ current: 1, page_size: 20 });
    o(c.data);
  }), { run: g, loading: A } = M(async (c) => await I.ai.createChatSession({ title: t("chat.defaultConversationTitle"), model_id: "" }), {
    manual: !0,
    onSuccess: (c, [f]) => {
      o((b) => [{ ...c, loading: !1 }, ...b]), u(c.id), ie([]), f && T({
        stream: !0,
        message: {
          role: "user",
          content: f
        },
        sessionId: c.id
      });
    }
  }), { run: x } = M(async (c) => await I.ai.deleteChatSession({ sessionId: c }), {
    manual: !0,
    onError(c, f) {
      C.error(t("chat.deleteConversationFailed")), o((b) => b.map((S) => S.id === f[0] ? { ...S, loading: !1 } : S));
    },
    onSuccess(c, f) {
      var B;
      const b = p.filter((N) => N.id !== f[0]), S = (B = b == null ? void 0 : b[0]) == null ? void 0 : B.id;
      o(b), f[0] === h && u(S);
    }
  }), { run: P, loading: L } = M(async (c) => await I.ai.getChatSession({ sessionId: c }), {
    manual: !0,
    onSuccess: (c, [f]) => {
      r((b) => ({
        ...b,
        [f]: c.messages.filter((S) => S.role !== "tool").map((S) => ({
          id: S.id,
          message: {
            content: S.content,
            role: S.role
          },
          status: "loading"
        }))
      }));
    }
  }), { onRequest: T, messages: z, setMessages: ie } = De({
    agent: m,
    requestPlaceholder: () => ({
      content: s("loading"),
      role: "assistant"
    }),
    requestFallback: (c, { error: f }) => (console.log(f), f instanceof ne ? {
      content: f.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: f.message
    } : {
      content: `${f}`,
      role: "assistant"
    }),
    resolveAbortController: (c) => {
      a.current = c;
    },
    transformMessage: (c) => {
      const { originMessage: f, chunk: b } = c || {};
      return b ? {
        role: "assistant",
        content: ((f == null ? void 0 : f.content) || "") + b
      } : {
        role: "assistant",
        content: (f == null ? void 0 : f.content) || ""
      };
    }
  });
  q(() => {
    if (!h) return;
    const c = i[h];
    c ? ie(c) : P(h);
  }, [i, h]);
  const Se = (c) => {
    if (c) {
      if (v) {
        C.error(t("chat.requestInProgress"));
        return;
      }
      if (!h) {
        g(c);
        return;
      }
      T({
        stream: !0,
        message: {
          role: "user",
          content: c
        },
        sessionId: h
      });
    }
  }, Ce = /* @__PURE__ */ e.jsxs("div", { className: n.sider, children: [
    /* @__PURE__ */ e.jsx(
      k,
      {
        onClick: () => {
          g();
        },
        type: "link",
        className: n.addBtn,
        icon: /* @__PURE__ */ e.jsx(je, {}),
        loading: A,
        children: t("chat.newConversation")
      }
    ),
    /* @__PURE__ */ e.jsx(H, { spinning: l, wrapperClassName: n.conversationsSpin, children: /* @__PURE__ */ e.jsx(
      Re,
      {
        items: p.map((c) => ({
          key: c.id,
          label: c.title,
          group: Z(c.start_time).isSame(Z(), "day") ? t("chat.today") : Z(c.start_time).format("YYYY-MM-DD")
        })),
        activeKey: h,
        onActiveChange: async (c) => {
          var f;
          c && ((f = a.current) == null || f.abort(), u((b) => (b && r((S) => ({
            ...S,
            [b]: z
          })), c)));
        },
        className: n.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (c) => ({
          items: [
            {
              label: t("chat.renameConversation"),
              key: "rename",
              icon: /* @__PURE__ */ e.jsx(vt, {})
            },
            {
              label: s("delete"),
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(bt, {}),
              danger: !0,
              onClick: () => {
                o((f) => f.map((b) => b.id === c.key ? { ...b, loading: !0 } : b)), x(c.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Ie = ({ message: c }) => {
    if (c.error)
      return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx("div", { dangerouslySetInnerHTML: { __html: ge.render(c.error) } }) });
  }, ke = /* @__PURE__ */ e.jsx("div", { className: n.chatList, children: /* @__PURE__ */ e.jsx(H, { spinning: L, children: /* @__PURE__ */ e.jsx(
    Me.List,
    {
      items: z == null ? void 0 : z.map((c) => ({
        ...c.message,
        messageRender: (f) => /* @__PURE__ */ e.jsx("div", { dangerouslySetInnerHTML: { __html: ge.render(f) } }),
        footer: Ie(c)
      })),
      style: { height: "100%", paddingInline: "calc(calc(100% - 700px) /2)" },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ e.jsx(H, { size: "small" })
        },
        user: { placement: "end" }
      }
    }
  ) }) }), Fe = /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    Oe,
    {
      value: w,
      onSubmit: () => {
        Se(w.trim()), d("");
      },
      onChange: d,
      onCancel: () => {
        var c;
        (c = a.current) == null || c.abort();
      },
      loading: v,
      className: n.sender,
      allowSpeech: !0,
      actions: (c, f) => {
        const { SendButton: b, LoadingButton: S } = f.components;
        return /* @__PURE__ */ e.jsx(rt, { gap: 4, children: v ? /* @__PURE__ */ e.jsx(S, { type: "default" }) : /* @__PURE__ */ e.jsx(b, { type: "primary" }) });
      },
      placeholder: t("chat.inputPlaceholder")
    }
  ) });
  return /* @__PURE__ */ e.jsxs("div", { className: n.layout, children: [
    Ce,
    /* @__PURE__ */ e.jsxs("div", { className: n.chat, children: [
      ke,
      Fe
    ] })
  ] });
}, Zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qt
}, Symbol.toStringTag, { value: "Module" }));
export {
  Bt as A,
  Cn as D,
  be as H,
  Dt as L,
  vn as O,
  yn as P,
  kn as T,
  Pn as U,
  jn as a,
  bn as b,
  Sn as c,
  Et as d,
  In as e,
  Ot as f,
  Kt as g,
  Ht as h,
  wn as i,
  Fn as j,
  _n as k,
  Ln as l,
  An as m,
  Tn as n
};
