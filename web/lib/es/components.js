import { j as e, I as Y } from "./vendor.js";
import { Navigate as K } from "react-router-dom";
import { u as ee, a as $ } from "./contexts.js";
import { g as te, f as se } from "./base.js";
import { Spin as ne, Dropdown as re, Avatar as ae, Upload as ie, Modal as q, Popover as oe, List as le, Divider as J, Skeleton as ce, Popconfirm as U, Tooltip as de, Button as j, Space as A, Input as w, Table as H, Form as f, message as y, Card as R, Result as W, Segmented as ue, Steps as me, Alert as G, QRCode as he, Typography as pe, Tag as D, Empty as xe, Row as Q, Col as T, Select as N, DatePicker as fe } from "antd";
import { useTranslation as F } from "react-i18next";
import ge from "classnames";
import { createStyles as O } from "antd-style";
import je, { useState as h, useEffect as M, createElement as ye, Suspense as ve, forwardRef as Se, useImperativeHandle as we } from "react";
import * as be from "@ant-design/icons";
import { UploadOutlined as Ie, PlusOutlined as Fe, ClockCircleFilled as ke, MailOutlined as Ce, EyeOutlined as X, EyeInvisibleOutlined as Ae, LaptopOutlined as Le, EnvironmentOutlined as Te, GlobalOutlined as ze, ClockCircleOutlined as Pe, SearchOutlined as _e, ReloadOutlined as Re } from "@ant-design/icons";
import { useRequest as z } from "ahooks";
import { a as S } from "./index.js";
import { b as V, A as De } from "./client.js";
import Me from "antd-img-crop";
import { isString as Ee } from "lodash";
const Ve = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(ne, { size: "large" }) }), ft = ({
  element: t,
  requiredPermission: r,
  requiredPermissions: s
}) => {
  const { user: n, loading: i } = ee(), { hasPermission: a, hasAllPermissions: d } = $();
  return i ? /* @__PURE__ */ e.jsx(Ve, {}) : n ? r && !a(r) ? /* @__PURE__ */ e.jsx(K, { to: "/forbidden", replace: !0 }) : s && !d(s) ? /* @__PURE__ */ e.jsx(K, { to: "/forbidden", replace: !0 }) : t : (window.location.href = te("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Be = O(({ token: t, css: r }) => ({
  container: r`
      ${r`
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
})), Ue = ({
  overlayClassName: t,
  overlay: r,
  hidden: s,
  children: n,
  ...i
}) => {
  if (s)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: a } = Be();
  return /* @__PURE__ */ e.jsx(
    re,
    {
      dropdownRender: r,
      overlayClassName: ge(a.container, t),
      ...i,
      children: /* @__PURE__ */ e.jsx("span", { className: a.iconStyle, children: n })
    }
  );
}, Ne = () => /* @__PURE__ */ e.jsxs(
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
), $e = O(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), qe = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], gt = ({
  transformLangConfig: t = (r) => r
}) => {
  const { i18n: r } = F(), { styles: s } = $e(), n = (a) => {
    r.changeLanguage(a);
  }, i = {
    selectedKeys: [r.language],
    onClick: (a) => {
      n(a.key);
    },
    items: t(qe).map((a) => ({
      key: a.lang,
      className: s.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (a == null ? void 0 : a.label) || "en-US", className: s.menuItemIconStyle, children: (a == null ? void 0 : a.icon) || "🌐" }),
        (a == null ? void 0 : a.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    Ue,
    {
      menu: i,
      children: /* @__PURE__ */ e.jsx(Ne, {})
    }
  );
}, He = O(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), Z = (t) => Ee(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? V.endsWith("/") ? V + `files/${t}` : V + `/files/${t}` : t, Oe = ({ src: t, ...r }) => /* @__PURE__ */ e.jsx(ae, { src: Z(t), ...r }), Ke = ({ onChange: t, shape: r = "square" }) => {
  const [s, n] = h([]), { styles: i } = He(), [a, d] = h(!1), [l, p] = h(!0), [x, v] = h(0), { run: c, loading: u } = z(() => S.base.listFiles({ current: x + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: o }) => {
      n([...s, ...o]), p(o.length === 40), v(x + 1);
    }
  }), b = () => {
    p(!0), v(0), n([]);
  };
  return /* @__PURE__ */ e.jsx(
    oe,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (o) => {
        d(o), o ? c() : b();
      },
      open: a,
      content: /* @__PURE__ */ e.jsx("div", { style: { width: 360, height: 200 }, children: /* @__PURE__ */ e.jsx(
        "div",
        {
          id: "iconsScrollableDiv",
          style: {
            height: "100%",
            overflow: "auto"
          },
          children: /* @__PURE__ */ e.jsx(
            Y,
            {
              dataLength: s.length,
              next: () => {
                c();
              },
              hasMore: l,
              loader: /* @__PURE__ */ e.jsx(ce, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(J, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                le,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: s,
                  style: { margin: "0 8px" },
                  loading: u,
                  renderItem: ({ id: o }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: i.avatarItem,
                      onClick: (g) => {
                        g.stopPropagation(), t == null || t(o), d(!1), b();
                      },
                      children: /* @__PURE__ */ e.jsx(Oe, { shape: r, src: o })
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
        Ie,
        {
          shape: r,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, We = ({ value: t, onChange: r, shape: s, ...n }) => {
  const [i, a] = h(void 0), [d, l] = h(!1), [p, x] = h(void 0), v = async (c) => {
    l(!0), x(c.url ?? c.preview);
  };
  return M(() => {
    a(t ? {
      uid: t,
      name: t,
      url: Z(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      Me,
      {
        beforeCrop: async (c) => {
          if (c.type === "image/svg+xml") {
            const u = await S.base.uploadFile({ type: "avatar" }, c);
            return u.length > 0 && (r == null || r(u[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          ie,
          {
            customRequest: async (c) => {
              var b, o;
              const u = await S.base.uploadFile({ type: "avatar", access: "public" }, c.file);
              u.length > 0 ? ((b = c.onSuccess) == null || b.call(c, u[0].id), r == null || r(u[0].id)) : (o = c.onError) == null || o.call(c, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: v,
            maxCount: 1,
            onChange: ({ file: c }) => {
              switch (c.status) {
                case "removed":
                  r == null || r(void 0);
                  break;
                case "done":
                  break;
                default:
                  a(c);
                  break;
              }
            },
            fileList: i ? [i] : [],
            ...n,
            children: i ? void 0 : /* @__PURE__ */ e.jsx(Ke, { shape: s, onChange: r })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(q, { open: d, footer: null, onCancel: () => l(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: p }) })
  ] });
}, Ge = ({
  permission: t,
  permissions: r = [],
  checkAll: s = !1,
  fallback: n = null,
  children: i
}) => {
  const { hasPermission: a, hasAnyPermission: d, hasAllPermissions: l, isAdmin: p, loading: x } = $();
  return x ? null : p ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : t ? a(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : r.length > 0 ? (s ? l(r) : d(r)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: i }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: i });
}, jt = ({
  fallback: t = null,
  children: r
}) => {
  const { isAdmin: s, loading: n } = $();
  return n ? null : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, _ = (t) => {
  const { permission: r, icon: s, tooltip: n, onClick: i, confirm: a, ...d } = t;
  return r ? /* @__PURE__ */ e.jsx(Ge, { permission: r, children: _({ icon: s, tooltip: n, onClick: i, confirm: a, ...d }) }, t.key) : a ? /* @__PURE__ */ e.jsx(U, { title: a.title, onConfirm: a.onConfirm || i, okText: a.okText, cancelText: a.cancelText, children: _({ icon: s, tooltip: n, ...d }) }, t.key) : n ? /* @__PURE__ */ e.jsx(de, { title: n, children: _({ icon: s, onClick: i, ...d }) }, t.key) : /* @__PURE__ */ ye(j, { type: "text", size: "small", icon: s, onClick: i, ...d, key: t.key });
}, yt = ({ actions: t }) => t.filter((r) => !r.hidden).map((r) => _(r)), Qe = be, Je = (t) => Qe[t], vt = ({ iconName: t }) => {
  if (!t)
    return null;
  const r = Je(t);
  return r ? /* @__PURE__ */ e.jsx(ve, { fallback: null, children: /* @__PURE__ */ e.jsx(r, {}) }) : null;
}, St = ({ onChange: t }) => {
  const [r, s] = h(""), [n, i] = h("");
  return /* @__PURE__ */ e.jsxs(A.Compact, { children: [
    /* @__PURE__ */ e.jsx(w, { style: { width: "calc(100% - 80px)" }, value: r, onChange: (a) => s(a.target.value) }),
    /* @__PURE__ */ e.jsx(w, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(w, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (a) => i(a.target.value) }),
    /* @__PURE__ */ e.jsx(j, { type: "primary", icon: /* @__PURE__ */ e.jsx(Fe, {}), onClick: () => {
      t(r, n);
    } })
  ] });
}, Xe = ({ request: t, tableRef: r, ...s }, n) => {
  const [i, a] = h({
    current: 1,
    pageSize: 10
  }), [d, l] = h(0), { data: p, loading: x, refresh: v } = z(async () => {
    const c = await t({
      current: i.current,
      page_size: i.pageSize
    });
    return l(c.total), c.data;
  }, {
    refreshDeps: [i]
  });
  return we(n, () => ({
    reload: () => {
      v();
    }
  })), /* @__PURE__ */ e.jsx(
    H,
    {
      rowKey: "id",
      loading: x,
      dataSource: p ?? [],
      pagination: {
        ...i,
        total: d,
        onChange: (c, u) => {
          a({ current: c, pageSize: u });
        }
      },
      ...s,
      ref: r
    }
  );
}, wt = ({ actionRef: t, ...r }) => {
  const [s, n] = h();
  return M(() => {
    n(Se(Xe));
  }, []), s ? /* @__PURE__ */ e.jsx(s, { ...r, ref: t }) : null;
}, bt = ({ onSuccess: t, token: r }) => {
  const { t: s } = F("authorization"), { t: n } = F("common"), [i] = f.useForm(), { run: a, loading: d } = z(async (l) => S.authorization.changePassword(l, r ? { headers: { Authorization: `Bearer ${r}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      y.success(s("user.passwordChanged")), i.resetFields(), t == null || t();
    },
    onError: (l) => {
      if (l instanceof De) {
        const p = l.code ?? "normal";
        y.error(s(`user.passwordChangeFailed.${p}`, { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        y.error(s("user.passwordChangeFailed.normal", { error: l.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", l);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    f,
    {
      form: i,
      layout: "vertical",
      onFinish: a,
      style: { maxWidth: 500, margin: "0 auto" },
      children: [
        /* @__PURE__ */ e.jsx(
          f.Item,
          {
            name: "old_password",
            label: s("user.oldPassword"),
            rules: [{ required: !0, message: s("validation.oldPasswordRequired") }],
            children: /* @__PURE__ */ e.jsx(w.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          f.Item,
          {
            name: "new_password",
            label: s("user.newPassword"),
            rules: [
              { required: !0, message: s("validation.newPasswordRequired") },
              { min: 8, message: s("validation.passwordMinLength") }
            ],
            children: /* @__PURE__ */ e.jsx(w.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          f.Item,
          {
            name: "confirm_password",
            label: s("user.confirmPassword"),
            rules: [
              { required: !0, message: s("validation.confirmPasswordRequired") },
              ({ getFieldValue: l }) => ({
                validator(p, x) {
                  return !x || l("new_password") === x ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(w.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(f.Item, { children: /* @__PURE__ */ e.jsx(j, { type: "primary", htmlType: "submit", loading: d, children: n("save") }) })
      ]
    }
  );
}, It = ({ user: t, onSuccess: r }) => {
  const { t: s } = F("authorization"), { t: n } = F("common"), [i] = f.useForm(), [a, d] = h(!1);
  je.useEffect(() => {
    t && i.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, i]);
  const l = async (p) => {
    try {
      d(!0), await S.authorization.updateCurrentUser(p), y.success(n("updateSuccess")), r();
    } catch (x) {
      y.error(n("updateFailed")), console.error("Failed to update user information:", x);
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
        t.roles.map((p) => p.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      f,
      {
        form: i,
        layout: "vertical",
        onFinish: l,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(We, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "username",
              label: s("user.username"),
              children: /* @__PURE__ */ e.jsx(w, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "email",
              label: s("user.email"),
              rules: [
                { required: !0, message: s("validation.emailRequired") },
                { type: "email", message: s("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(w, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "full_name",
              label: s("user.fullName"),
              rules: [{ required: !0, message: s("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(w, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            f.Item,
            {
              name: "phone",
              label: s("user.phone"),
              children: /* @__PURE__ */ e.jsx(w, {})
            }
          ),
          /* @__PURE__ */ e.jsx(f.Item, { children: /* @__PURE__ */ e.jsx(j, { type: "primary", htmlType: "submit", loading: a, children: n("save") }) })
        ]
      }
    )
  ] });
}, Ft = ({ user: t, onSuccess: r }) => {
  const { t: s } = F("authorization"), { t: n } = F("common"), [i, a] = h(0), [d, l] = h(!1), [p, x] = h(!0), [v, c] = h(""), [u, b] = h("totp"), { run: o, data: g = { secret: "", qr_code: "", token: void 0 } } = z(
    () => S.authorization.enableMfa(u),
    {
      manual: !0,
      onSuccess: () => {
        a(1);
      },
      onBefore: () => {
        l(!0);
      },
      onFinally: () => {
        l(!1);
      }
    }
  ), E = async () => {
    if (!v) {
      y.warning(s("mfa.enterVerificationCode"));
      return;
    }
    const I = {
      code: v,
      mfa_type: u
    };
    "token" in g && (I.token = g.token);
    try {
      l(!0), await S.authorization.verifyAndActivateMfa(I), y.success(s("mfa.enableSuccess")), a(2), r();
    } catch (C) {
      y.error(s("mfa.verificationFailed")), console.error("Failed to verify MFA:", C);
    } finally {
      l(!1);
    }
  }, m = async () => {
    try {
      l(!0), await S.authorization.disableMfa(), y.success(s("mfa.disableSuccess")), r();
    } catch (I) {
      y.error(n("operationFailed")), console.error("Failed to disable MFA:", I);
    } finally {
      l(!1);
    }
  }, k = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        W,
        {
          status: "success",
          title: s("mfa.enabled"),
          subTitle: s("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            j,
            {
              danger: !0,
              onClick: () => {
                q.confirm({
                  title: s("mfa.confirmDisable"),
                  content: s("mfa.disableWarning"),
                  onOk: m,
                  okButtonProps: { danger: !0 }
                });
              },
              children: s("mfa.disable")
            }
          )
        }
      );
    const I = () => {
      var C;
      switch (i) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              G,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: s("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: s(u === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
                ] }),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20 }
              }
            ),
            /* @__PURE__ */ e.jsx(
              j,
              {
                type: "primary",
                onClick: o,
                loading: d,
                children: s("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              G,
              {
                message: s("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: u === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: u === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(he, { value: g.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: u === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: u === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: p ? "*".repeat(((C = g.secret) == null ? void 0 : C.length) ?? 0) : g.secret }),
              /* @__PURE__ */ e.jsx(
                j,
                {
                  type: "link",
                  onClick: () => x(!p),
                  icon: p ? /* @__PURE__ */ e.jsx(X, {}) : /* @__PURE__ */ e.jsx(Ae, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              w,
              {
                placeholder: s("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: v,
                onChange: (P) => c(P.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(A, { children: [
              /* @__PURE__ */ e.jsx(j, { onClick: () => a(0), children: n("previous") }),
              /* @__PURE__ */ e.jsx(
                j,
                {
                  type: "primary",
                  onClick: E,
                  loading: d,
                  children: n("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            W,
            {
              status: "success",
              title: s("mfa.setupSuccess"),
              subTitle: s("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(j, { type: "primary", onClick: () => a(0), children: n("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: i === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          ue,
          {
            defaultValue: "totp",
            onChange: (C) => {
              b(C), a(0);
            },
            value: u,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(ke, {}), label: s("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Ce, {}), label: s("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(J, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        me,
        {
          current: i,
          items: [
            { title: s(u === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: s(u === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: s(u === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: s(u === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: s(u === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: s(u === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      I()
    ] });
  };
  return /* @__PURE__ */ e.jsx(R, { title: s("mfa.title"), children: k() });
}, { Text: B } = pe, kt = () => {
  const { t } = F("authorization"), { t: r } = F("common"), [s, n] = h([]), [i, a] = h(!1), [d, l] = h(null), [p, x] = h(!1), v = async () => {
    try {
      a(!0);
      const o = await S.authorization.getUserSessions({});
      n(o);
    } catch (o) {
      y.error(t("session.getSessionsFailed", { error: o, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      a(!1);
    }
  };
  M(() => {
    v();
  }, []);
  const c = async (o) => {
    try {
      l(o), await S.authorization.terminateSession({ id: o }), n(s.filter((g) => g.id !== o)), y.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (g) {
      y.error(t("session.terminateFailed", { error: g, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      l(null);
    }
  }, u = async () => {
    try {
      x(!0), await S.authorization.terminateOtherSessions(), n(s.filter((o) => o.is_current)), y.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (o) {
      y.error(t("session.terminateAllFailed", { error: o, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      x(!1);
    }
  }, b = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (o, g) => /* @__PURE__ */ e.jsxs(A, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(A, { children: [
          /* @__PURE__ */ e.jsx(Le, {}),
          /* @__PURE__ */ e.jsx(B, { strong: !0, children: o })
        ] }),
        /* @__PURE__ */ e.jsxs(A, { children: [
          /* @__PURE__ */ e.jsx(Te, {}),
          /* @__PURE__ */ e.jsx(B, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (o) => /* @__PURE__ */ e.jsxs(A, { children: [
        /* @__PURE__ */ e.jsx(ze, {}),
        /* @__PURE__ */ e.jsx("span", { children: o })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (o) => /* @__PURE__ */ e.jsxs(A, { children: [
        /* @__PURE__ */ e.jsx(Pe, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(o).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (o) => o.is_current ? /* @__PURE__ */ e.jsx(D, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(D, { color: "blue", children: t("session.active") })
    },
    {
      title: r("actions"),
      key: "action",
      render: (o) => o.is_current ? /* @__PURE__ */ e.jsx(B, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        U,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => c(o.id),
          okText: r("confirm"),
          cancelText: r("cancel"),
          children: /* @__PURE__ */ e.jsx(
            j,
            {
              type: "link",
              danger: !0,
              loading: d === o.id,
              children: t("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsx(
    R,
    {
      title: t("session.title"),
      extra: s.length > 1 && /* @__PURE__ */ e.jsx(
        U,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: u,
          okText: r("confirm"),
          cancelText: r("cancel"),
          children: /* @__PURE__ */ e.jsx(
            j,
            {
              danger: !0,
              loading: p,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: s.length === 0 ? /* @__PURE__ */ e.jsx(xe, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        H,
        {
          columns: b,
          dataSource: s,
          rowKey: "id",
          loading: i,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: Ze } = fe, { Option: L } = N, Ye = (t) => t || "N/A", et = (t, r) => t === "success" ? /* @__PURE__ */ e.jsx(D, { color: "success", children: r("statuses.success") }) : /* @__PURE__ */ e.jsx(D, { color: "error", children: r("statuses.failed") }), Ct = ({
  userId: t,
  request: r = (n) => t ? S.authorization.getUserLogs({ id: t, ...n }) : S.authorization.getCurrentUserLogs(n),
  columnsFilter: s = (n) => n
}) => {
  const { t: n } = F("authorization"), { t: i } = F("common"), [a, d] = h({
    current: 1,
    pageSize: 10,
    total: 0
  }), [l, p] = h({}), [x] = f.useForm(), { loading: v, run: c, data: { data: u } = {} } = z(async (m = l, k = 1, I = 10) => r({
    ...m,
    current: k ?? 1,
    page_size: I ?? 10
  }), {
    onError(m) {
      y.error(n("auditLog.fetchFailed", { error: m }));
    },
    onSuccess({ total: m }) {
      d({
        ...a,
        total: m
      });
    }
  });
  M(() => {
    c(l, 1, a.pageSize);
  }, []);
  const b = (m) => {
    d({
      ...a,
      current: m.current,
      pageSize: m.pageSize
    }), c({}, m.current, m.pageSize);
  }, o = (m) => {
    var k, I, C, P;
    c({
      ...m,
      start_time: (I = (k = m.dateRange) == null ? void 0 : k[0]) == null ? void 0 : I.toISOString(),
      end_time: (P = (C = m.dateRange) == null ? void 0 : C[1]) == null ? void 0 : P.toISOString()
    }, 1, a.pageSize);
  }, g = () => {
    x.resetFields(), p({}), d({ ...a, current: 1 }), c({}, 1, a.pageSize);
  }, E = [
    {
      title: n("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (m) => se(m)
    },
    {
      title: n("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (m, k) => m ? n(`action.${m.replace(":", ".")}`, { defaultValue: k.action_name }) : k.action_name ?? k.action
    },
    {
      title: n("auditLog.user_agent"),
      dataIndex: "user_agent",
      key: "user_agent"
    },
    {
      title: n("auditLog.ip"),
      dataIndex: "ip",
      key: "ip",
      render: (m) => Ye(m)
    },
    {
      title: n("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (m) => et(m, n)
    },
    {
      title: n("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (m) => /* @__PURE__ */ e.jsx(j, { type: "link", icon: /* @__PURE__ */ e.jsx(X, {}), onClick: () => {
        q.info({
          title: n("auditLog.details"),
          content: JSON.stringify(m)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(R, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      f,
      {
        form: x,
        layout: "horizontal",
        onFinish: o,
        initialValues: l,
        children: [
          /* @__PURE__ */ e.jsxs(Q, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(T, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "search", label: n("auditLog.search"), children: /* @__PURE__ */ e.jsx(w, { placeholder: n("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(T, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "action", label: n("auditLog.action"), children: /* @__PURE__ */ e.jsxs(N, { allowClear: !0, placeholder: n("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(L, { value: "login", children: n("actions.login") }),
              /* @__PURE__ */ e.jsx(L, { value: "logout", children: n("actions.logout") }),
              /* @__PURE__ */ e.jsx(L, { value: "password_reset", children: n("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(L, { value: "mfa_change", children: n("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(T, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "status", label: n("auditLog.status"), children: /* @__PURE__ */ e.jsxs(N, { allowClear: !0, placeholder: n("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(L, { value: "success", children: n("statuses.success") }),
              /* @__PURE__ */ e.jsx(L, { value: "failed", children: n("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(T, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "dateRange", label: n("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(Ze, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(Q, { children: /* @__PURE__ */ e.jsx(T, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(A, { children: [
            /* @__PURE__ */ e.jsx(j, { onClick: g, children: i("reset") }),
            /* @__PURE__ */ e.jsx(j, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(_e, {}), children: i("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(R, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        j,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Re, {}),
          onClick: g,
          style: { marginRight: 8 },
          children: i("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        H,
        {
          rowKey: "id",
          columns: s(E),
          dataSource: u,
          pagination: {
            ...a,
            showSizeChanger: !0,
            showTotal: (m) => i("totalItems", { total: m })
          },
          loading: v,
          onChange: b,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
};
export {
  Oe as A,
  vt as D,
  Ue as H,
  Ve as L,
  ft as P,
  wt as T,
  Ct as U,
  gt as a,
  yt as b,
  We as c,
  St as d,
  qe as e,
  Ge as f,
  Je as g,
  jt as h,
  bt as i,
  It as j,
  Ft as k,
  kt as l
};
