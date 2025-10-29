var ve = Object.defineProperty;
var be = (t, s, n) => s in t ? ve(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[s] = n;
var re = (t, s, n) => be(t, typeof s != "symbol" ? s + "" : s, n);
import { j as e, I as we, u as Se, X as Ce, a as Ie, C as ke, F as Fe, M as Ae, S as Le } from "./vendor.js";
import { Navigate as ie } from "react-router-dom";
import { u as _e, a as ne } from "./contexts.js";
import { g as Te, f as ze } from "./base.js";
import { Spin as O, Dropdown as Pe, Avatar as De, Upload as Re, Modal as W, Popover as Me, List as Be, Divider as de, Skeleton as Ne, Tooltip as ue, FloatButton as Ee, Popconfirm as te, Button as I, Space as R, Input as T, Table as ae, Form as j, message as S, Card as H, Result as oe, Segmented as Ve, Steps as $e, Alert as le, QRCode as qe, Typography as Oe, Tag as K, Empty as Ue, Row as ce, Col as $, Select as se, DatePicker as He, Flex as Ke } from "antd";
import { useTranslation as L } from "react-i18next";
import We from "classnames";
import { createStyles as X } from "antd-style";
import Xe, { useState as f, useEffect as q, lazy as Ge, createElement as Ye, Suspense as Je, forwardRef as Qe, useImperativeHandle as Ze, useRef as et } from "react";
import * as tt from "@ant-design/icons";
import { UploadOutlined as st, RobotOutlined as nt, PlusOutlined as me, ClockCircleFilled as at, MailOutlined as rt, EyeOutlined as pe, EyeInvisibleOutlined as it, LaptopOutlined as ot, EnvironmentOutlined as lt, GlobalOutlined as ct, ClockCircleOutlined as dt, SearchOutlined as ut, ReloadOutlined as mt, EditOutlined as pt, DeleteOutlined as ht } from "@ant-design/icons";
import { a as C, w as ft } from "./index.js";
import { useRequest as P } from "ahooks";
import { b as J, A as gt } from "./client.js";
import xt from "antd-img-crop";
import { isString as yt } from "lodash";
import Q from "dayjs";
const jt = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(O, { size: "large" }) }), as = ({
  element: t,
  requiredPermission: s,
  requiredPermissions: n
}) => {
  const { user: a, loading: i } = _e(), { hasPermission: r, hasAllPermissions: u } = ne();
  return i ? /* @__PURE__ */ e.jsx(jt, {}) : a ? s && !r(s) ? /* @__PURE__ */ e.jsx(ie, { to: "/forbidden", replace: !0 }) : n && !u(n) ? /* @__PURE__ */ e.jsx(ie, { to: "/forbidden", replace: !0 }) : t : (window.location.href = Te("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, vt = X(({ token: t, css: s }) => ({
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
})), bt = ({
  overlayClassName: t,
  overlay: s,
  hidden: n,
  children: a,
  ...i
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: r } = vt();
  return /* @__PURE__ */ e.jsx(
    Pe,
    {
      dropdownRender: s,
      overlayClassName: We(r.container, t),
      ...i,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: a })
    }
  );
}, wt = () => /* @__PURE__ */ e.jsxs(
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
), St = X(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), Ct = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], rs = ({
  transformLangConfig: t = (s) => s
}) => {
  const { i18n: s } = L(), { styles: n } = St(), a = (r) => {
    s.changeLanguage(r);
  }, i = {
    selectedKeys: [s.language],
    onClick: (r) => {
      a(r.key);
    },
    items: t(Ct).map((r) => ({
      key: r.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: n.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    bt,
    {
      menu: i,
      children: /* @__PURE__ */ e.jsx(wt, {})
    }
  );
}, It = X(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), he = (t) => yt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? J.endsWith("/") ? J + `files/${t}` : J + `/files/${t}` : t, kt = ({ src: t, ...s }) => /* @__PURE__ */ e.jsx(De, { src: he(t), ...s }), Ft = ({ onChange: t, shape: s = "square" }) => {
  const [n, a] = f([]), { styles: i } = It(), [r, u] = f(!1), [l, g] = f(!0), [x, v] = f(0), { run: d, loading: m } = P(() => C.base.listFiles({ current: x + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: c }) => {
      a([...n, ...c]), g(c.length === 40), v(x + 1);
    }
  }), A = () => {
    g(!0), v(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    Me,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (c) => {
        u(c), c ? d() : A();
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
            we,
            {
              dataLength: n.length,
              next: () => {
                d();
              },
              hasMore: l,
              loader: /* @__PURE__ */ e.jsx(Ne, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(de, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                Be,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: m,
                  renderItem: ({ id: c }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: i.avatarItem,
                      onClick: (b) => {
                        b.stopPropagation(), t == null || t(c), u(!1), A();
                      },
                      children: /* @__PURE__ */ e.jsx(kt, { shape: s, src: c })
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
        st,
        {
          shape: s,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, At = ({ value: t, onChange: s, shape: n, ...a }) => {
  const [i, r] = f(void 0), [u, l] = f(!1), [g, x] = f(void 0), v = async (d) => {
    l(!0), x(d.url ?? d.preview);
  };
  return q(() => {
    r(t ? {
      uid: t,
      name: t,
      url: he(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      xt,
      {
        beforeCrop: async (d) => {
          if (d.type === "image/svg+xml") {
            const m = await C.base.uploadFile({ type: "avatar" }, d);
            return m.length > 0 && (s == null || s(m[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          Re,
          {
            customRequest: async (d) => {
              var A, c;
              const m = await C.base.uploadFile({ type: "avatar", access: "public" }, d.file);
              m.length > 0 ? ((A = d.onSuccess) == null || A.call(d, m[0].id), s == null || s(m[0].id)) : (c = d.onError) == null || c.call(d, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: v,
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
            children: i ? void 0 : /* @__PURE__ */ e.jsx(Ft, { shape: n, onChange: s })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(W, { open: u, footer: null, onCancel: () => l(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: g }) })
  ] });
}, Lt = Ge(() => Promise.resolve().then(() => Vt)), is = () => {
  const { t } = L("ai"), [s, n] = f(!1), a = () => {
    n(!0);
  }, i = () => {
    n(!1);
  };
  return console.log(s), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      ue,
      {
        title: t("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
        placement: "left",
        children: /* @__PURE__ */ e.jsx(
          Ee,
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
      W,
      {
        width: 1200,
        open: s,
        onCancel: i,
        footer: null,
        children: ft(Lt)
      }
    )
  ] });
}, _t = ({
  permission: t,
  permissions: s = [],
  checkAll: n = !1,
  fallback: a = null,
  children: i
}) => {
  const { hasPermission: r, hasAnyPermission: u, hasAllPermissions: l, isAdmin: g, loading: x } = ne();
  return x ? null : g ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : s.length > 0 ? (n ? l(s) : u(s)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: i });
}, os = ({
  fallback: t = null,
  children: s
}) => {
  const { isAdmin: n, loading: a } = ne();
  return a ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, U = (t) => {
  const { permission: s, icon: n, tooltip: a, onClick: i, confirm: r, ...u } = t;
  return s ? /* @__PURE__ */ e.jsx(_t, { permission: s, children: U({ icon: n, tooltip: a, onClick: i, confirm: r, ...u }) }, t.key) : r ? /* @__PURE__ */ e.jsx(te, { title: r.title, onConfirm: r.onConfirm || i, okText: r.okText, cancelText: r.cancelText, children: U({ icon: n, tooltip: a, ...u }) }, t.key) : a ? /* @__PURE__ */ e.jsx(ue, { title: a, children: U({ icon: n, onClick: i, ...u }) }, t.key) : /* @__PURE__ */ Ye(I, { type: "text", size: "small", icon: n, onClick: i, ...u, key: t.key });
}, ls = ({ actions: t }) => t.filter((s) => !s.hidden).map((s) => U(s)), Tt = tt, zt = (t) => Tt[t], cs = ({ iconName: t }) => {
  if (!t)
    return null;
  const s = zt(t);
  return s ? /* @__PURE__ */ e.jsx(Je, { fallback: null, children: /* @__PURE__ */ e.jsx(s, {}) }) : null;
}, ds = ({ onChange: t }) => {
  const [s, n] = f(""), [a, i] = f("");
  return /* @__PURE__ */ e.jsxs(R.Compact, { children: [
    /* @__PURE__ */ e.jsx(T, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (r) => n(r.target.value) }),
    /* @__PURE__ */ e.jsx(T, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(T, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => i(r.target.value) }),
    /* @__PURE__ */ e.jsx(I, { type: "primary", icon: /* @__PURE__ */ e.jsx(me, {}), onClick: () => {
      t(s, a);
    } })
  ] });
}, Pt = ({ request: t, tableRef: s, ...n }, a) => {
  const [i, r] = f({
    current: 1,
    pageSize: 10
  }), [u, l] = f(0), { data: g, loading: x, refresh: v } = P(async () => {
    const d = await t({
      current: i.current,
      page_size: i.pageSize
    });
    return l(d.total), d.data;
  }, {
    refreshDeps: [i]
  });
  return Ze(a, () => ({
    reload: () => {
      v();
    }
  })), /* @__PURE__ */ e.jsx(
    ae,
    {
      rowKey: "id",
      loading: x,
      dataSource: g ?? [],
      pagination: {
        ...i,
        total: u,
        onChange: (d, m) => {
          r({ current: d, pageSize: m });
        }
      },
      ...n,
      ref: s
    }
  );
}, us = ({ actionRef: t, ...s }) => {
  const [n, a] = f();
  return q(() => {
    a(Qe(Pt));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...s, ref: t }) : null;
}, ms = ({ onSuccess: t, token: s }) => {
  const { t: n } = L("authorization"), { t: a } = L("common"), [i] = j.useForm(), { run: r, loading: u } = P(async (l) => C.authorization.changePassword(l, s ? { headers: { Authorization: `Bearer ${s}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      S.success(n("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (l) => {
      if (l instanceof gt) {
        const g = l.code ?? "normal";
        S.error(n(`user.passwordChangeFailed.${g}`, { error: l.message, defaultValue: "Password change failed: {{error}}" }));
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
            children: /* @__PURE__ */ e.jsx(T.Password, {})
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
            children: /* @__PURE__ */ e.jsx(T.Password, {})
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
                validator(g, x) {
                  return !x || l("new_password") === x ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(T.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(j.Item, { children: /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", loading: u, children: a("save") }) })
      ]
    }
  );
}, ps = ({ user: t, onSuccess: s }) => {
  const { t: n } = L("authorization"), { t: a } = L("common"), [i] = j.useForm(), [r, u] = f(!1);
  Xe.useEffect(() => {
    t && i.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, i]);
  const l = async (g) => {
    try {
      u(!0), await C.authorization.updateCurrentUser(g), S.success(a("updateSuccess")), s();
    } catch (x) {
      S.error(a("updateFailed")), console.error("Failed to update user information:", x);
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
        t.roles.map((g) => g.name).join(", ")
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
              children: /* @__PURE__ */ e.jsx(At, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(T, { disabled: !0 })
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
              children: /* @__PURE__ */ e.jsx(T, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(T, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            j.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(T, {})
            }
          ),
          /* @__PURE__ */ e.jsx(j.Item, { children: /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", loading: r, children: a("save") }) })
        ]
      }
    )
  ] });
}, hs = ({ user: t, onSuccess: s }) => {
  const { t: n } = L("authorization"), { t: a } = L("common"), [i, r] = f(0), [u, l] = f(!1), [g, x] = f(!0), [v, d] = f(""), [m, A] = f("totp"), { run: c, data: b = { secret: "", qr_code: "", token: void 0 } } = P(
    () => C.authorization.enableMfa(m),
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
  ), N = async () => {
    if (!v) {
      S.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const k = {
      code: v,
      mfa_type: m
    };
    "token" in b && (k.token = b.token);
    try {
      l(!0), await C.authorization.verifyAndActivateMfa(k), S.success(n("mfa.enableSuccess")), r(2), s();
    } catch (F) {
      S.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", F);
    } finally {
      l(!1);
    }
  }, h = async () => {
    try {
      l(!0), await C.authorization.disableMfa(), S.success(n("mfa.disableSuccess")), s();
    } catch (k) {
      S.error(a("operationFailed")), console.error("Failed to disable MFA:", k);
    } finally {
      l(!1);
    }
  }, _ = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        oe,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            I,
            {
              danger: !0,
              onClick: () => {
                W.confirm({
                  title: n("mfa.confirmDisable"),
                  content: n("mfa.disableWarning"),
                  onOk: h,
                  okButtonProps: { danger: !0 }
                });
              },
              children: n("mfa.disable")
            }
          )
        }
      );
    const k = () => {
      var F;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              le,
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
              I,
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
              le,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: m === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: m === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(qe, { value: b.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: m === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: m === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: g ? "*".repeat(((F = b.secret) == null ? void 0 : F.length) ?? 0) : b.secret }),
              /* @__PURE__ */ e.jsx(
                I,
                {
                  type: "link",
                  onClick: () => x(!g),
                  icon: g ? /* @__PURE__ */ e.jsx(pe, {}) : /* @__PURE__ */ e.jsx(it, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              T,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: v,
                onChange: (M) => d(M.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(R, { children: [
              /* @__PURE__ */ e.jsx(I, { onClick: () => r(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                I,
                {
                  type: "primary",
                  onClick: N,
                  loading: u,
                  children: a("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            oe,
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
          Ve,
          {
            defaultValue: "totp",
            onChange: (F) => {
              A(F), r(0);
            },
            value: m,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(at, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(rt, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(de, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        $e,
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
      k()
    ] });
  };
  return /* @__PURE__ */ e.jsx(H, { title: n("mfa.title"), children: _() });
}, { Text: Z } = Oe, fs = () => {
  const { t } = L("authorization"), { t: s } = L("common"), [n, a] = f([]), [i, r] = f(!1), [u, l] = f(null), [g, x] = f(!1), v = async () => {
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
  q(() => {
    v();
  }, []);
  const d = async (c) => {
    try {
      l(c), await C.authorization.terminateSession({ id: c }), a(n.filter((b) => b.id !== c)), S.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (b) {
      S.error(t("session.terminateFailed", { error: b, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      l(null);
    }
  }, m = async () => {
    try {
      x(!0), await C.authorization.terminateOtherSessions(), a(n.filter((c) => c.is_current)), S.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (c) {
      S.error(t("session.terminateAllFailed", { error: c, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      x(!1);
    }
  }, A = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (c, b) => /* @__PURE__ */ e.jsxs(R, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(R, { children: [
          /* @__PURE__ */ e.jsx(ot, {}),
          /* @__PURE__ */ e.jsx(Z, { strong: !0, children: c })
        ] }),
        /* @__PURE__ */ e.jsxs(R, { children: [
          /* @__PURE__ */ e.jsx(lt, {}),
          /* @__PURE__ */ e.jsx(Z, { type: "secondary", children: b.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (c) => /* @__PURE__ */ e.jsxs(R, { children: [
        /* @__PURE__ */ e.jsx(ct, {}),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (c) => /* @__PURE__ */ e.jsxs(R, { children: [
        /* @__PURE__ */ e.jsx(dt, {}),
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
          onConfirm: () => d(c.id),
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            I,
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
    H,
    {
      title: t("session.title"),
      extra: n.length > 1 && /* @__PURE__ */ e.jsx(
        te,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: m,
          okText: s("confirm"),
          cancelText: s("cancel"),
          children: /* @__PURE__ */ e.jsx(
            I,
            {
              danger: !0,
              loading: g,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: n.length === 0 ? /* @__PURE__ */ e.jsx(Ue, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        ae,
        {
          columns: A,
          dataSource: n,
          rowKey: "id",
          loading: i,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: Dt } = He, { Option: B } = se, Rt = (t) => t || "N/A", Mt = (t, s) => t === "success" ? /* @__PURE__ */ e.jsx(K, { color: "success", children: s("statuses.success") }) : /* @__PURE__ */ e.jsx(K, { color: "error", children: s("statuses.failed") }), gs = ({
  userId: t,
  request: s = (a) => t ? C.authorization.getUserLogs({ id: t, ...a }) : C.authorization.getCurrentUserLogs(a),
  columnsFilter: n = (a) => a
}) => {
  const { t: a } = L("authorization"), { t: i } = L("common"), [r, u] = f({
    current: 1,
    pageSize: 10,
    total: 0
  }), [l, g] = f({}), [x] = j.useForm(), { loading: v, run: d, data: { data: m } = {} } = P(async (h = l, _ = 1, k = 10) => s({
    ...h,
    current: _ ?? 1,
    page_size: k ?? 10
  }), {
    onError(h) {
      S.error(a("auditLog.fetchFailed", { error: h }));
    },
    onSuccess({ total: h }) {
      u({
        ...r,
        total: h
      });
    }
  });
  q(() => {
    d(l, 1, r.pageSize);
  }, []);
  const A = (h) => {
    u({
      ...r,
      current: h.current,
      pageSize: h.pageSize
    }), d({}, h.current, h.pageSize);
  }, c = (h) => {
    var _, k, F, M;
    d({
      ...h,
      start_time: (k = (_ = h.dateRange) == null ? void 0 : _[0]) == null ? void 0 : k.toISOString(),
      end_time: (M = (F = h.dateRange) == null ? void 0 : F[1]) == null ? void 0 : M.toISOString()
    }, 1, r.pageSize);
  }, b = () => {
    x.resetFields(), g({}), u({ ...r, current: 1 }), d({}, 1, r.pageSize);
  }, N = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (h) => ze(h)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (h, _) => h ? a(`action.${h.replace(":", ".")}`, { defaultValue: _.action_name }) : _.action_name ?? _.action
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
      render: (h) => Rt(h)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (h) => Mt(h, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (h) => /* @__PURE__ */ e.jsx(I, { type: "link", icon: /* @__PURE__ */ e.jsx(pe, {}), onClick: () => {
        W.info({
          title: a("auditLog.details"),
          content: JSON.stringify(h)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(H, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      j,
      {
        form: x,
        layout: "horizontal",
        onFinish: c,
        initialValues: l,
        children: [
          /* @__PURE__ */ e.jsxs(ce, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx($, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(T, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx($, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs(se, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(B, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(B, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(B, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(B, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx($, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs(se, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(B, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(B, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx($, { span: 6, children: /* @__PURE__ */ e.jsx(j.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(Dt, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsx($, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(R, { children: [
            /* @__PURE__ */ e.jsx(I, { onClick: b, children: i("reset") }),
            /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(ut, {}), children: i("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(H, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        I,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(mt, {}),
          onClick: b,
          style: { marginRight: 8 },
          children: i("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        ae,
        {
          rowKey: "id",
          columns: n(N),
          dataSource: m,
          pagination: {
            ...r,
            showSizeChanger: !0,
            showTotal: (h) => i("totalItems", { total: h })
          },
          loading: v,
          onChange: A,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, Bt = Ae({ html: !0, breaks: !0 }), Nt = X(({ token: t, css: s }) => ({
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
    re(this, "buffer");
    this.buffer = a;
  }
}
const Et = () => {
  const { t } = L(), { styles: s } = Nt(), n = et(null), [a, i] = f({}), [r, u] = f([]), [l, g] = f(), [x, v] = f(""), [d] = Se({
    request: async ({ message: o, sessionId: p }, { onSuccess: y, onUpdate: w, onError: E, onStream: V }) => {
      if (!p)
        return;
      const G = new AbortController(), D = {
        buffer: [],
        messageID: ""
      };
      try {
        V == null || V(G);
        const Y = await C.ai.streamChat({ sessionId: p }, {
          content: o.content
        }, {
          signal: G.signal,
          requestType: "sse"
        });
        for await (const je of Ce({
          readableStream: Y
        })) {
          const z = JSON.parse(je.data);
          if (z.event_type, z.event_type === "error") {
            E(new ee(z.content, D.buffer));
            return;
          }
          z.event_type === "content" && (D.messageID === "" && (D.messageID = z.message_id), D.messageID !== z.message_id && (D.messageID = z.message_id), D.buffer.push(z.content), w(z.content));
        }
        y(D.buffer);
      } catch (Y) {
        E(new ee(`${Y}`, D.buffer)), G.abort();
      }
    }
  }), m = d.isRequesting(), { loading: A } = P(async () => {
    const o = await C.ai.listChatSessions({ current: 1, page_size: 20 });
    u(o.data);
  }), { run: c, loading: b } = P(async (o) => (console.log("new chat ", o), await C.ai.createChatSession({ title: "New Conversation", model_id: "" })), {
    manual: !0,
    onSuccess: (o, [p]) => {
      u((y) => [...y, { ...o, loading: !1 }]), g(o.id), M([]), p && k({
        stream: !0,
        message: {
          role: "user",
          content: p
        },
        sessionId: o.id
      });
    }
  }), { run: N } = P(async (o) => await C.ai.deleteChatSession({ sessionId: o }), {
    manual: !0,
    onError(o, p) {
      S.error(t("ai.chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation." })), u((y) => y.map((w) => w.id === p[0] ? { ...w, loading: !1 } : w));
    },
    onSuccess(o, p) {
      var E;
      const y = r.filter((V) => V.id !== p[0]), w = (E = y == null ? void 0 : y[0]) == null ? void 0 : E.id;
      u(y), p[0] === l && g(w);
    }
  }), { run: h, loading: _ } = P(async (o) => await C.ai.getChatSession({ sessionId: o }), {
    manual: !0,
    onSuccess: (o, [p]) => {
      i((y) => ({
        ...y,
        [p]: o.messages.filter((w) => w.role !== "tool").map((w) => ({
          id: w.id,
          message: {
            content: w.content,
            role: w.role
          },
          status: "loading"
        }))
      }));
    }
  }), { onRequest: k, messages: F, setMessages: M } = Ie({
    agent: d,
    requestPlaceholder: () => ({
      content: "Loading...",
      role: "assistant"
    }),
    requestFallback: (o, { error: p }) => p instanceof ee ? {
      content: p.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: p.message
    } : {
      content: `${p}`,
      role: "assistant"
    },
    resolveAbortController: (o) => {
      n.current = o;
    },
    transformMessage: (o) => {
      const { originMessage: p, chunk: y } = o || {};
      return y ? {
        role: "assistant",
        content: ((p == null ? void 0 : p.content) || "") + y
      } : {
        role: "assistant",
        content: (p == null ? void 0 : p.content) || ""
      };
    }
  });
  q(() => {
    if (!l) return;
    const o = a[l];
    o ? M(o) : h(l);
  }, [a, l]);
  const fe = (o) => {
    if (o) {
      if (m) {
        S.error("Request is in progress, please wait for the request to complete.");
        return;
      }
      if (!l) {
        c(o);
        return;
      }
      k({
        stream: !0,
        message: {
          role: "user",
          content: o
        },
        sessionId: l
      });
    }
  }, ge = /* @__PURE__ */ e.jsxs("div", { className: s.sider, children: [
    /* @__PURE__ */ e.jsx(
      I,
      {
        onClick: () => {
          c();
        },
        type: "link",
        className: s.addBtn,
        icon: /* @__PURE__ */ e.jsx(me, {}),
        loading: b,
        children: "New Conversation"
      }
    ),
    /* @__PURE__ */ e.jsx(O, { spinning: A, wrapperClassName: s.conversationsSpin, children: /* @__PURE__ */ e.jsx(
      ke,
      {
        items: r.map((o) => ({
          key: o.id,
          label: o.title,
          group: Q(o.start_time).isSame(Q(), "day") ? "Today" : Q(o.start_time).format("YYYY-MM-DD")
        })),
        activeKey: l,
        onActiveChange: async (o) => {
          var p;
          o && ((p = n.current) == null || p.abort(), g((y) => (y && i((w) => ({
            ...w,
            [y]: F
          })), o)));
        },
        className: s.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (o) => ({
          items: [
            {
              label: "Rename",
              key: "rename",
              icon: /* @__PURE__ */ e.jsx(pt, {})
            },
            {
              label: "Delete",
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(ht, {}),
              danger: !0,
              onClick: () => {
                u((p) => p.map((y) => y.id === o.key ? { ...y, loading: !0 } : y)), N(o.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), xe = /* @__PURE__ */ e.jsx("div", { className: s.chatList, children: /* @__PURE__ */ e.jsx(O, { spinning: _, children: /* @__PURE__ */ e.jsx(
    Fe.List,
    {
      items: F == null ? void 0 : F.map((o) => ({
        ...o.message,
        messageRender: (p) => /* @__PURE__ */ e.jsx("div", { dangerouslySetInnerHTML: { __html: Bt.render(p) } })
      })),
      style: { height: "100%", paddingInline: "calc(calc(100% - 700px) /2)" },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ e.jsx(O, { size: "small" })
        },
        user: { placement: "end" }
      }
    }
  ) }) }), ye = /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    Le,
    {
      value: x,
      onSubmit: () => {
        fe(x.trim()), v("");
      },
      onChange: v,
      onCancel: () => {
        var o;
        (o = n.current) == null || o.abort();
      },
      loading: m,
      className: s.sender,
      allowSpeech: !0,
      actions: (o, p) => {
        const { SendButton: y, LoadingButton: w } = p.components;
        return /* @__PURE__ */ e.jsx(Ke, { gap: 4, children: m ? /* @__PURE__ */ e.jsx(w, { type: "default" }) : /* @__PURE__ */ e.jsx(y, { type: "primary" }) });
      },
      placeholder: "Please input your message"
    }
  ) });
  return /* @__PURE__ */ e.jsxs("div", { className: s.layout, children: [
    ge,
    /* @__PURE__ */ e.jsxs("div", { className: s.chat, children: [
      xe,
      ye
    ] })
  ] });
}, Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Et
}, Symbol.toStringTag, { value: "Module" }));
export {
  kt as A,
  cs as D,
  bt as H,
  jt as L,
  as as P,
  us as T,
  gs as U,
  rs as a,
  is as b,
  ls as c,
  At as d,
  ds as e,
  Ct as f,
  zt as g,
  _t as h,
  os as i,
  ms as j,
  ps as k,
  hs as l,
  fs as m
};
