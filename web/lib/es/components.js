var _e = Object.defineProperty;
var Le = (t, s, n) => s in t ? _e(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[s] = n;
var oe = (t, s, n) => Le(t, typeof s != "symbol" ? s + "" : s, n);
import { j as e, I as Ae, u as Pe, X as Te, a as ze, C as De, F as Re, M as Me, S as $e } from "./vendor.js";
import { Navigate as le } from "react-router-dom";
import { u as ge, a as ae, b as Oe, c as Ve } from "./contexts.js";
import { g as Be, f as Ne } from "./base.js";
import { Spin as H, Dropdown as Ee, Avatar as qe, Upload as He, Modal as J, Popover as Ue, List as Ke, Divider as xe, Skeleton as Ge, Tooltip as fe, FloatButton as Je, Popconfirm as se, Button as k, Space as D, Input as _, Table as re, Form as j, message as C, Card as K, Result as ce, Segmented as We, Steps as Xe, Alert as de, QRCode as Ye, Typography as Qe, Tag as G, Empty as Ze, Row as ue, Col as E, Select as $, DatePicker as et, Checkbox as me, Switch as tt, InputNumber as nt, Flex as st } from "antd";
import { useTranslation as F } from "react-i18next";
import { createStyles as W } from "antd-style";
import * as at from "@ant-design/icons";
import { UploadOutlined as rt, CheckOutlined as it, TeamOutlined as ot, RobotOutlined as lt, PlusOutlined as ye, ClockCircleFilled as ct, MailOutlined as dt, EyeOutlined as je, EyeInvisibleOutlined as ut, LaptopOutlined as mt, EnvironmentOutlined as ht, GlobalOutlined as pt, ClockCircleOutlined as gt, SearchOutlined as xt, ReloadOutlined as ft, EditOutlined as yt, DeleteOutlined as jt } from "@ant-design/icons";
import vt from "classnames";
import bt, { useState as v, useEffect as q, lazy as wt, createElement as St, Suspense as Ct, forwardRef as It, useImperativeHandle as kt, useMemo as Ft, useRef as _t } from "react";
import { a as I, w as Lt } from "./index.js";
import { useRequest as R } from "ahooks";
import { b as Q, A as At } from "./client.js";
import Pt from "antd-img-crop";
import { isString as Tt } from "lodash";
import Z from "dayjs";
const zt = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(H, { size: "large" }) }), fn = ({
  element: t,
  requiredPermission: s,
  requiredPermissions: n
}) => {
  const { user: a, loading: i } = ge(), { hasPermission: r, hasAllPermissions: p } = ae();
  return i ? /* @__PURE__ */ e.jsx(zt, {}) : a ? s && !r(s) ? /* @__PURE__ */ e.jsx(le, { to: "/forbidden", replace: !0 }) : n && !p(n) ? /* @__PURE__ */ e.jsx(le, { to: "/forbidden", replace: !0 }) : t : (window.location.href = Be("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Dt = W(({ token: t, css: s }) => ({
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
})), ve = ({
  overlayClassName: t,
  overlay: s,
  hidden: n,
  children: a,
  ...i
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: r } = Dt();
  return /* @__PURE__ */ e.jsx(
    Ee,
    {
      dropdownRender: s,
      overlayClassName: vt(r.container, t),
      ...i,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: a })
    }
  );
}, Rt = () => /* @__PURE__ */ e.jsxs(
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
), Mt = W(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), $t = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], yn = ({
  transformLangConfig: t = (s) => s
}) => {
  const { i18n: s } = F(), { styles: n } = Mt(), a = (r) => {
    s.changeLanguage(r);
  }, i = {
    selectedKeys: [s.language],
    onClick: (r) => {
      a(r.key);
    },
    items: t($t).map((r) => ({
      key: r.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: n.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    ve,
    {
      menu: i,
      children: /* @__PURE__ */ e.jsx(Rt, {})
    }
  );
}, Ot = W(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), be = (t) => Tt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? Q.endsWith("/") ? Q + `files/${t}` : Q + `/files/${t}` : t, Vt = ({ src: t, ...s }) => /* @__PURE__ */ e.jsx(qe, { src: be(t), ...s }), Bt = ({ onChange: t, shape: s = "square" }) => {
  const [n, a] = v([]), { styles: i } = Ot(), [r, p] = v(!1), [o, m] = v(!0), [l, f] = v(0), { run: u, loading: h } = R(() => I.base.listFiles({ current: l + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: d }) => {
      a([...n, ...d]), m(d.length === 40), f(l + 1);
    }
  }), g = () => {
    m(!0), f(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    Ue,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (d) => {
        p(d), d ? u() : g();
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
            Ae,
            {
              dataLength: n.length,
              next: () => {
                u();
              },
              hasMore: o,
              loader: /* @__PURE__ */ e.jsx(Ge, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(xe, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                Ke,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: h,
                  renderItem: ({ id: d }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: i.avatarItem,
                      onClick: (w) => {
                        w.stopPropagation(), t == null || t(d), p(!1), g();
                      },
                      children: /* @__PURE__ */ e.jsx(Vt, { shape: s, src: d })
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
        rt,
        {
          shape: s,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, Nt = ({ value: t, onChange: s, shape: n, ...a }) => {
  const [i, r] = v(void 0), [p, o] = v(!1), [m, l] = v(void 0), f = async (u) => {
    o(!0), l(u.url ?? u.preview);
  };
  return q(() => {
    r(t ? {
      uid: t,
      name: t,
      url: be(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Pt,
      {
        beforeCrop: async (u) => {
          if (u.type === "image/svg+xml") {
            const h = await I.base.uploadFile({ type: "avatar" }, u);
            return h.length > 0 && (s == null || s(h[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          He,
          {
            customRequest: async (u) => {
              var g, d;
              const h = await I.base.uploadFile({ type: "avatar", access: "public" }, u.file);
              h.length > 0 ? ((g = u.onSuccess) == null || g.call(u, h[0].id), s == null || s(h[0].id)) : (d = u.onError) == null || d.call(u, new Error("Upload file failed"));
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
            children: i ? void 0 : /* @__PURE__ */ e.jsx(Bt, { shape: n, onChange: s })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(J, { open: p, footer: null, onCancel: () => o(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: m }) })
  ] });
}, jn = () => {
  const { t } = F("common"), { user: s } = ge(), { currentOrgId: n, setCurrentOrgId: a } = Oe(), i = (s == null ? void 0 : s.organizations) || [], r = (l) => {
    a(l), window.location.reload();
  };
  if (i.length === 0)
    return null;
  const p = i.find((l) => l.id === n), o = p ? p.name : t("organization.global", { defaultValue: "Global" }), m = [
    ...i.map((l) => ({
      key: l.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: l.name }),
        n === l.id && /* @__PURE__ */ e.jsx(it, {})
      ] }),
      onClick: () => r(l.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    ve,
    {
      menu: {
        items: m,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(ot, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: o })
      ]
    }
  );
}, Et = wt(() => Promise.resolve().then(() => Qt)), vn = () => {
  const { t } = F("ai"), [s, n] = v(!1), a = () => {
    n(!0);
  }, i = () => {
    n(!1);
  };
  return console.log(s), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: t("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
        placement: "left",
        children: /* @__PURE__ */ e.jsx(
          Je,
          {
            icon: /* @__PURE__ */ e.jsx(lt, {}),
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
        children: Lt(Et)
      }
    )
  ] });
}, qt = ({
  permission: t,
  permissions: s = [],
  checkAll: n = !1,
  fallback: a = null,
  children: i
}) => {
  const { hasPermission: r, hasAnyPermission: p, hasAllPermissions: o, isAdmin: m, loading: l } = ae();
  return l ? null : m ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : s.length > 0 ? (n ? o(s) : p(s)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: i });
}, bn = ({
  fallback: t = null,
  children: s
}) => {
  const { isAdmin: n, loading: a } = ae();
  return a ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, U = (t) => {
  const [s, n] = v(!1), { permission: a, icon: i, tooltip: r, onClick: p, confirm: o, label: m, ...l } = t;
  return a ? /* @__PURE__ */ e.jsx(qt, { permission: a, children: U({ icon: i, tooltip: r, onClick: p, confirm: o, label: m, ...l }) }, t.key) : o ? /* @__PURE__ */ e.jsx(se, { title: o.title, onConfirm: o.onConfirm || p, okText: o.okText, cancelText: o.cancelText, children: U({ icon: i, tooltip: r, label: m, ...l }) }, t.key) : r ? /* @__PURE__ */ e.jsx(fe, { title: r, children: U({ icon: i, onClick: p, label: m, ...l }) }, t.key) : /* @__PURE__ */ St(k, { type: "text", size: "small", loading: s, icon: i, onClick: p ? async () => {
    console.log(/* @__PURE__ */ new Date(), "handleClick"), n(!0);
    try {
      await p();
    } finally {
      n(!1), console.log(/* @__PURE__ */ new Date(), "handleClick1");
    }
  } : void 0, ...l, key: t.key }, m && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: m }));
}, wn = ({ actions: t }) => t.filter((s) => !s.hidden).map((s) => U(s)), Ht = at, Ut = (t) => Ht[t], Sn = ({ iconName: t }) => {
  if (!t)
    return null;
  const s = Ut(t);
  return s ? /* @__PURE__ */ e.jsx(Ct, { fallback: null, children: /* @__PURE__ */ e.jsx(s, {}) }) : null;
}, Cn = ({ onChange: t }) => {
  const [s, n] = v(""), [a, i] = v("");
  return /* @__PURE__ */ e.jsxs(D.Compact, { children: [
    /* @__PURE__ */ e.jsx(_, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (r) => n(r.target.value) }),
    /* @__PURE__ */ e.jsx(_, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(_, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => i(r.target.value) }),
    /* @__PURE__ */ e.jsx(k, { type: "primary", icon: /* @__PURE__ */ e.jsx(ye, {}), onClick: () => {
      t(s, a);
    } })
  ] });
}, Kt = ({ request: t, tableRef: s, ...n }, a) => {
  const [i, r] = v({
    current: 1,
    pageSize: 10
  }), [p, o] = v(0), { data: m, loading: l, refresh: f } = R(async () => {
    const u = await t({
      current: i.current,
      page_size: i.pageSize
    });
    return o(u.total), u.data;
  }, {
    refreshDeps: [i]
  });
  return kt(a, () => ({
    reload: () => {
      f();
    }
  })), /* @__PURE__ */ e.jsx(
    re,
    {
      rowKey: "id",
      loading: l,
      dataSource: m ?? [],
      pagination: {
        ...i,
        total: p,
        onChange: (u, h) => {
          r({ current: u, pageSize: h });
        }
      },
      ...n,
      ref: s
    }
  );
}, In = ({ actionRef: t, ...s }) => {
  const [n, a] = v();
  return q(() => {
    a(It(Kt));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...s, ref: t }) : null;
}, kn = ({ onSuccess: t, token: s }) => {
  const { t: n } = F("authorization"), { t: a } = F("common"), [i] = j.useForm(), { run: r, loading: p } = R(async (o) => I.authorization.changePassword(o, s ? { headers: { Authorization: `Bearer ${s}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      C.success(n("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (o) => {
      if (o instanceof At) {
        const m = o.code ?? "normal";
        C.error(n(`user.passwordChangeFailed.${m}`, { error: o.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        C.error(n("user.passwordChangeFailed.normal", { error: o.message, defaultValue: "Password change failed: {{error}}" }));
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
            children: /* @__PURE__ */ e.jsx(_.Password, {})
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
            children: /* @__PURE__ */ e.jsx(_.Password, {})
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
                validator(m, l) {
                  return !l || o("new_password") === l ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(_.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(j.Item, { children: /* @__PURE__ */ e.jsx(k, { type: "primary", htmlType: "submit", loading: p, children: a("save") }) })
      ]
    }
  );
}, Fn = ({ user: t, onSuccess: s }) => {
  const { t: n } = F("authorization"), { t: a } = F("common"), [i] = j.useForm(), [r, p] = v(!1);
  bt.useEffect(() => {
    t && i.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, i]);
  const o = async (m) => {
    try {
      p(!0), await I.authorization.updateCurrentUser(m), C.success(a("updateSuccess")), s();
    } catch (l) {
      C.error(a("updateFailed")), console.error("Failed to update user information:", l);
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
        t.roles.map((m) => m.name).join(", ")
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
              children: /* @__PURE__ */ e.jsx(Nt, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(_, { disabled: !0 })
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
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          ),
          /* @__PURE__ */ e.jsx(j.Item, { children: /* @__PURE__ */ e.jsx(k, { type: "primary", htmlType: "submit", loading: r, children: a("save") }) })
        ]
      }
    )
  ] });
}, _n = ({ user: t, onSuccess: s }) => {
  const { t: n } = F("authorization"), { t: a } = F("common"), [i, r] = v(0), [p, o] = v(!1), [m, l] = v(!0), [f, u] = v(""), [h, g] = v("totp"), { run: d, data: w = { secret: "", qr_code: "", token: void 0 } } = R(
    () => I.authorization.enableMfa(h),
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
  ), V = async () => {
    if (!f) {
      C.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const L = {
      code: f,
      mfa_type: h
    };
    "token" in w && (L.token = w.token);
    try {
      o(!0), await I.authorization.verifyAndActivateMfa(L), C.success(n("mfa.enableSuccess")), r(2), s();
    } catch (P) {
      C.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", P);
    } finally {
      o(!1);
    }
  }, y = async () => {
    try {
      o(!0), await I.authorization.disableMfa(), C.success(n("mfa.disableSuccess")), s();
    } catch (L) {
      C.error(a("operationFailed")), console.error("Failed to disable MFA:", L);
    } finally {
      o(!1);
    }
  }, A = () => {
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
                  onOk: y,
                  okButtonProps: { danger: !0 }
                });
              },
              children: n("mfa.disable")
            }
          )
        }
      );
    const L = () => {
      var P;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              de,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(h === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                onClick: d,
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
                style: { marginBottom: 20, display: h === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: h === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Ye, { value: w.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: h === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: h === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: m ? "*".repeat(((P = w.secret) == null ? void 0 : P.length) ?? 0) : w.secret }),
              /* @__PURE__ */ e.jsx(
                k,
                {
                  type: "link",
                  onClick: () => l(!m),
                  icon: m ? /* @__PURE__ */ e.jsx(je, {}) : /* @__PURE__ */ e.jsx(ut, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              _,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: f,
                onChange: (T) => u(T.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(D, { children: [
              /* @__PURE__ */ e.jsx(k, { onClick: () => r(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                k,
                {
                  type: "primary",
                  onClick: V,
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
          We,
          {
            defaultValue: "totp",
            onChange: (P) => {
              g(P), r(0);
            },
            value: h,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(ct, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(dt, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(xe, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Xe,
        {
          current: i,
          items: [
            { title: n(h === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(h === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(h === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(h === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(h === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(h === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      L()
    ] });
  };
  return /* @__PURE__ */ e.jsx(K, { title: n("mfa.title"), children: A() });
}, { Text: ee } = Qe, Ln = () => {
  const { t } = F("authorization"), { t: s } = F("common"), [n, a] = v([]), [i, r] = v(!1), [p, o] = v(null), [m, l] = v(!1), f = async () => {
    try {
      r(!0);
      const d = await I.authorization.getUserSessions({});
      a(d);
    } catch (d) {
      C.error(t("session.getSessionsFailed", { error: d, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      r(!1);
    }
  };
  q(() => {
    f();
  }, []);
  const u = async (d) => {
    try {
      o(d), await I.authorization.terminateSession({ id: d }), a(n.filter((w) => w.id !== d)), C.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (w) {
      C.error(t("session.terminateFailed", { error: w, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      o(null);
    }
  }, h = async () => {
    try {
      l(!0), await I.authorization.terminateOtherSessions(), a(n.filter((d) => d.is_current)), C.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (d) {
      C.error(t("session.terminateAllFailed", { error: d, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      l(!1);
    }
  }, g = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (d, w) => /* @__PURE__ */ e.jsxs(D, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(mt, {}),
          /* @__PURE__ */ e.jsx(ee, { strong: !0, children: d })
        ] }),
        /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(ht, {}),
          /* @__PURE__ */ e.jsx(ee, { type: "secondary", children: w.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (d) => /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(pt, {}),
        /* @__PURE__ */ e.jsx("span", { children: d })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (d) => /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(gt, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(d).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (d) => d.is_current ? /* @__PURE__ */ e.jsx(G, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(G, { color: "blue", children: t("session.active") })
    },
    {
      title: s("actions"),
      key: "action",
      render: (d) => d.is_current ? /* @__PURE__ */ e.jsx(ee, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        se,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => u(d.id),
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            k,
            {
              type: "link",
              danger: !0,
              loading: p === d.id,
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
          onConfirm: h,
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            k,
            {
              danger: !0,
              loading: m,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: n.length === 0 ? /* @__PURE__ */ e.jsx(Ze, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        re,
        {
          columns: g,
          dataSource: n,
          rowKey: "id",
          loading: i,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: Gt } = et, { Option: O } = $, Jt = (t) => t || "N/A", Wt = (t, s) => t === "success" ? /* @__PURE__ */ e.jsx(G, { color: "success", children: s("statuses.success") }) : /* @__PURE__ */ e.jsx(G, { color: "error", children: s("statuses.failed") }), An = ({
  userId: t,
  request: s = (a) => t ? I.authorization.getUserLogs({ id: t, ...a }) : I.authorization.getCurrentUserLogs(a),
  columnsFilter: n = (a) => a
}) => {
  const { t: a } = F("authorization"), { t: i } = F("common"), [r, p] = v({
    current: 1,
    pageSize: 10,
    total: 0
  }), [o, m] = v({}), [l] = j.useForm(), { loading: f, run: u, data: { data: h } = {} } = R(async (y = o, A = 1, L = 10) => s({
    ...y,
    current: A ?? 1,
    page_size: L ?? 10
  }), {
    onError(y) {
      C.error(a("auditLog.fetchFailed", { error: y }));
    },
    onSuccess({ total: y }) {
      p({
        ...r,
        total: y
      });
    }
  });
  q(() => {
    u(o, 1, r.pageSize);
  }, []);
  const g = (y) => {
    p({
      ...r,
      current: y.current,
      pageSize: y.pageSize
    }), u({}, y.current, y.pageSize);
  }, d = (y) => {
    var A, L, P, T;
    u({
      ...y,
      start_time: (L = (A = y.dateRange) == null ? void 0 : A[0]) == null ? void 0 : L.toISOString(),
      end_time: (T = (P = y.dateRange) == null ? void 0 : P[1]) == null ? void 0 : T.toISOString()
    }, 1, r.pageSize);
  }, w = () => {
    l.resetFields(), m({}), p({ ...r, current: 1 }), u({}, 1, r.pageSize);
  }, V = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (y) => Ne(y)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (y, A) => y ? a(`action.${y.replace(":", ".")}`, { defaultValue: A.action_name }) : A.action_name ?? A.action
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
      render: (y) => Jt(y)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (y) => Wt(y, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (y) => /* @__PURE__ */ e.jsx(k, { type: "link", icon: /* @__PURE__ */ e.jsx(je, {}), onClick: () => {
        J.info({
          title: a("auditLog.details"),
          content: JSON.stringify(y)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(K, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      j,
      {
        form: l,
        layout: "horizontal",
        onFinish: d,
        initialValues: o,
        children: [
          /* @__PURE__ */ e.jsxs(ue, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(_, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs($, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(O, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(O, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(O, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(O, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs($, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(O, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(O, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(E, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(Gt, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(ue, { children: /* @__PURE__ */ e.jsx(E, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(D, { children: [
            /* @__PURE__ */ e.jsx(k, { onClick: w, children: i("reset") }),
            /* @__PURE__ */ e.jsx(k, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(xt, {}), children: i("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(K, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        k,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(ft, {}),
          onClick: w,
          style: { marginRight: 8 },
          children: i("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        re,
        {
          rowKey: "id",
          columns: n(V),
          dataSource: h,
          pagination: {
            ...r,
            showSizeChanger: !0,
            showTotal: (y) => i("totalItems", { total: y })
          },
          loading: f,
          onChange: g,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { TextArea: he } = _, { Option: te } = $, Pn = ({
  field: t,
  selectedType: s,
  dependentValues: n
}) => {
  const { t: a } = F("system"), { t: i } = F("common"), { options: r, loading: p } = Ve(
    t.data_source,
    t.options,
    n
  ), o = Ft(() => t.data_source && t.data_source.type !== "static" ? r : t.options || [], [t.data_source, t.options, r]), m = o && o.length > 0, l = [
    {
      required: t.required,
      message: a("settings.toolsets.fieldRequired", {
        defaultValue: `Please enter ${t.name}`,
        field: t.name
      })
    }
  ], f = () => a(`settings.toolsets.${s}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), u = () => a(`settings.toolsets.${s}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${i("enter", { defaultValue: "Enter" })} ${t.name}`
  }), h = () => {
    if (t.description)
      return a(`settings.toolsets.${s}.${t.name}Tooltip`, {
        defaultValue: t.description
      });
  };
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      j.Item,
      {
        name: ["config", t.name],
        label: f(),
        rules: l,
        tooltip: h(),
        children: /* @__PURE__ */ e.jsx(
          $,
          {
            loading: p,
            allowClear: !0,
            placeholder: u(),
            showSearch: !0,
            filterOption: (g, d) => {
              var w;
              return (w = d == null ? void 0 : d.children) == null ? void 0 : w.toLowerCase().includes(g.toLowerCase());
            },
            children: o.map((g) => /* @__PURE__ */ e.jsx(te, { value: g.value, children: g.label }, g.value))
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
          label: f(),
          rules: l,
          children: /* @__PURE__ */ e.jsx(he, { placeholder: u(), rows: 4 })
        },
        t.name
      );
    case "string":
      return m ? /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: f(),
          rules: l,
          tooltip: h(),
          children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: u(), children: o.map((g) => /* @__PURE__ */ e.jsx(te, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: f(),
          rules: l,
          tooltip: h(),
          children: /* @__PURE__ */ e.jsx(_, { placeholder: u() })
        },
        t.name
      );
    case "password":
      return /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: f(),
          rules: l,
          tooltip: h(),
          children: /* @__PURE__ */ e.jsx(_.Password, { placeholder: u(), autoComplete: "new-password" })
        },
        t.name
      );
    case "number":
      return m ? /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: f(),
          rules: l,
          tooltip: h(),
          children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: u(), children: o.map((g) => /* @__PURE__ */ e.jsx(te, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: f(),
          rules: l,
          tooltip: h(),
          children: /* @__PURE__ */ e.jsx(nt, { style: { width: "100%" }, placeholder: u() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: f(),
          valuePropName: "checked",
          tooltip: h(),
          children: /* @__PURE__ */ e.jsx(tt, {})
        },
        t.name
      );
    case "array":
      return m ? /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: f(),
          rules: l,
          tooltip: h(),
          children: /* @__PURE__ */ e.jsx(me.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(D, { direction: "vertical", children: o.map((g) => /* @__PURE__ */ e.jsx(me, { value: g.value, children: g.label }, g.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        j.Item,
        {
          name: ["config", t.name],
          label: f(),
          rules: l,
          tooltip: h(),
          children: /* @__PURE__ */ e.jsx(
            $,
            {
              mode: "tags",
              style: { width: "100%" },
              placeholder: u(),
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
          label: f(),
          rules: [
            ...l,
            {
              validator: (g, d) => {
                if (!d) return Promise.resolve();
                try {
                  return JSON.parse(d), Promise.resolve();
                } catch {
                  return Promise.reject(
                    new Error(
                      a("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON format" })
                    )
                  );
                }
              }
            }
          ],
          tooltip: h(),
          children: /* @__PURE__ */ e.jsx(
            he,
            {
              rows: 4,
              placeholder: u()
            }
          )
        },
        t.name
      );
    default:
      return null;
  }
}, pe = Me({ html: !0, breaks: !0 }), Xt = W(({ token: t, css: s }) => ({
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
const Yt = () => {
  const { t } = F("ai"), { t: s } = F("common"), { styles: n } = Xt(), a = _t(null), [i, r] = v({}), [p, o] = v([]), [m, l] = v(), [f, u] = v(""), [h] = Pe({
    request: async ({ message: c, sessionId: x }, { onSuccess: b, onUpdate: S, onError: B, onStream: N }) => {
      if (!x)
        return;
      const X = new AbortController(), M = {
        buffer: [],
        messageID: ""
      };
      try {
        N == null || N(X);
        const Y = await I.ai.streamChat({ sessionId: x }, {
          content: c.content
        }, {
          signal: X.signal,
          requestType: "sse"
        });
        for await (const Fe of Te({
          readableStream: Y
        })) {
          const z = JSON.parse(Fe.data);
          if (z.event_type, z.event_type === "error") {
            B(new ne(z.content, M.buffer));
            return;
          }
          z.event_type === "content" && (M.messageID === "" && (M.messageID = z.message_id), M.messageID !== z.message_id && (M.messageID = z.message_id), M.buffer.push(z.content), S(z.content));
        }
        b(M.buffer);
      } catch (Y) {
        B(new ne(`${Y}`, M.buffer)), X.abort();
      }
    }
  }), g = h.isRequesting(), { loading: d } = R(async () => {
    const c = await I.ai.listChatSessions({ current: 1, page_size: 20 });
    o(c.data);
  }), { run: w, loading: V } = R(async (c) => await I.ai.createChatSession({ title: t("chat.defaultConversationTitle"), model_id: "" }), {
    manual: !0,
    onSuccess: (c, [x]) => {
      o((b) => [{ ...c, loading: !1 }, ...b]), l(c.id), ie([]), x && P({
        stream: !0,
        message: {
          role: "user",
          content: x
        },
        sessionId: c.id
      });
    }
  }), { run: y } = R(async (c) => await I.ai.deleteChatSession({ sessionId: c }), {
    manual: !0,
    onError(c, x) {
      C.error(t("chat.deleteConversationFailed")), o((b) => b.map((S) => S.id === x[0] ? { ...S, loading: !1 } : S));
    },
    onSuccess(c, x) {
      var B;
      const b = p.filter((N) => N.id !== x[0]), S = (B = b == null ? void 0 : b[0]) == null ? void 0 : B.id;
      o(b), x[0] === m && l(S);
    }
  }), { run: A, loading: L } = R(async (c) => await I.ai.getChatSession({ sessionId: c }), {
    manual: !0,
    onSuccess: (c, [x]) => {
      r((b) => ({
        ...b,
        [x]: c.messages.filter((S) => S.role !== "tool").map((S) => ({
          id: S.id,
          message: {
            content: S.content,
            role: S.role
          },
          status: "loading"
        }))
      }));
    }
  }), { onRequest: P, messages: T, setMessages: ie } = ze({
    agent: h,
    requestPlaceholder: () => ({
      content: s("loading"),
      role: "assistant"
    }),
    requestFallback: (c, { error: x }) => (console.log(x), x instanceof ne ? {
      content: x.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: x.message
    } : {
      content: `${x}`,
      role: "assistant"
    }),
    resolveAbortController: (c) => {
      a.current = c;
    },
    transformMessage: (c) => {
      const { originMessage: x, chunk: b } = c || {};
      return b ? {
        role: "assistant",
        content: ((x == null ? void 0 : x.content) || "") + b
      } : {
        role: "assistant",
        content: (x == null ? void 0 : x.content) || ""
      };
    }
  });
  q(() => {
    if (!m) return;
    const c = i[m];
    c ? ie(c) : A(m);
  }, [i, m]);
  const we = (c) => {
    if (c) {
      if (g) {
        C.error(t("chat.requestInProgress"));
        return;
      }
      if (!m) {
        w(c);
        return;
      }
      P({
        stream: !0,
        message: {
          role: "user",
          content: c
        },
        sessionId: m
      });
    }
  }, Se = /* @__PURE__ */ e.jsxs("div", { className: n.sider, children: [
    /* @__PURE__ */ e.jsx(
      k,
      {
        onClick: () => {
          w();
        },
        type: "link",
        className: n.addBtn,
        icon: /* @__PURE__ */ e.jsx(ye, {}),
        loading: V,
        children: t("chat.newConversation")
      }
    ),
    /* @__PURE__ */ e.jsx(H, { spinning: d, wrapperClassName: n.conversationsSpin, children: /* @__PURE__ */ e.jsx(
      De,
      {
        items: p.map((c) => ({
          key: c.id,
          label: c.title,
          group: Z(c.start_time).isSame(Z(), "day") ? t("chat.today") : Z(c.start_time).format("YYYY-MM-DD")
        })),
        activeKey: m,
        onActiveChange: async (c) => {
          var x;
          c && ((x = a.current) == null || x.abort(), l((b) => (b && r((S) => ({
            ...S,
            [b]: T
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
              icon: /* @__PURE__ */ e.jsx(yt, {})
            },
            {
              label: s("delete"),
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(jt, {}),
              danger: !0,
              onClick: () => {
                o((x) => x.map((b) => b.id === c.key ? { ...b, loading: !0 } : b)), y(c.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Ce = ({ message: c }) => {
    if (c.error)
      return /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx("div", { dangerouslySetInnerHTML: { __html: pe.render(c.error) } }) });
  }, Ie = /* @__PURE__ */ e.jsx("div", { className: n.chatList, children: /* @__PURE__ */ e.jsx(H, { spinning: L, children: /* @__PURE__ */ e.jsx(
    Re.List,
    {
      items: T == null ? void 0 : T.map((c) => ({
        ...c.message,
        messageRender: (x) => /* @__PURE__ */ e.jsx("div", { dangerouslySetInnerHTML: { __html: pe.render(x) } }),
        footer: Ce(c)
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
  ) }) }), ke = /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    $e,
    {
      value: f,
      onSubmit: () => {
        we(f.trim()), u("");
      },
      onChange: u,
      onCancel: () => {
        var c;
        (c = a.current) == null || c.abort();
      },
      loading: g,
      className: n.sender,
      allowSpeech: !0,
      actions: (c, x) => {
        const { SendButton: b, LoadingButton: S } = x.components;
        return /* @__PURE__ */ e.jsx(st, { gap: 4, children: g ? /* @__PURE__ */ e.jsx(S, { type: "default" }) : /* @__PURE__ */ e.jsx(b, { type: "primary" }) });
      },
      placeholder: t("chat.inputPlaceholder")
    }
  ) });
  return /* @__PURE__ */ e.jsxs("div", { className: n.layout, children: [
    Se,
    /* @__PURE__ */ e.jsxs("div", { className: n.chat, children: [
      Ie,
      ke
    ] })
  ] });
}, Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yt
}, Symbol.toStringTag, { value: "Module" }));
export {
  Vt as A,
  Sn as D,
  ve as H,
  zt as L,
  jn as O,
  fn as P,
  In as T,
  An as U,
  yn as a,
  vn as b,
  wn as c,
  Nt as d,
  Cn as e,
  $t as f,
  Ut as g,
  qt as h,
  bn as i,
  kn as j,
  Fn as k,
  _n as l,
  Ln as m,
  Pn as n
};
