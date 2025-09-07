import { j as e, S as X, c as U, D as ee, d as te, u as F, A as se, I as ae, U as ne, M as q, l as re, e as z, P as ie, R as oe, f as le, L as ce, g as Z, h as de, k as B, T as ue, m as j, n as me, o as A, p as w, q as he, F as H, r as f, s as y, C as _, t as W, v as pe, w as xe, x as fe, y as ge, z as G, Q as je, E as Y, G as ye, H as ve, J as Se, K as we, N as Ie, O as be, V as D, W as Fe, X as Q, Y as T, Z as N, _ as ke, $ as Le, a0 as Ae } from "./vendor.js";
import { Navigate as J } from "react-router-dom";
import { u as Ce, a as K } from "./contexts.js";
import { g as Te, f as ze } from "./base.js";
import Re, { useState as h, useEffect as M, createElement as Pe, Suspense as _e, forwardRef as De, useImperativeHandle as Me } from "react";
import { a as S } from "./index.js";
import { b as E, A as $e } from "./client.js";
const ot = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(X, { size: "large", tip: "Loading..." }) }), lt = ({
  element: t,
  requiredPermission: n,
  requiredPermissions: s
}) => {
  const { user: a, loading: r } = Ce(), { hasPermission: i, hasAllPermissions: d } = K();
  return r ? /* @__PURE__ */ e.jsx("div", { style: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }, children: /* @__PURE__ */ e.jsx(X, { size: "large", tip: "Loading..." }) }) : a ? n && !i(n) ? /* @__PURE__ */ e.jsx(J, { to: "/forbidden", replace: !0 }) : s && !d(s) ? /* @__PURE__ */ e.jsx(J, { to: "/forbidden", replace: !0 }) : t : (window.location.href = Te("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Ee = U(({ token: t, css: n }) => ({
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
})), Ve = ({
  overlayClassName: t,
  overlay: n,
  hidden: s,
  children: a,
  ...r
}) => {
  if (s)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: i } = Ee();
  return /* @__PURE__ */ e.jsx(
    ee,
    {
      dropdownRender: n,
      overlayClassName: te(i.container, t),
      ...r,
      children: /* @__PURE__ */ e.jsx("span", { className: i.iconStyle, children: a })
    }
  );
}, Be = () => /* @__PURE__ */ e.jsxs(
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
), Ne = U(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), Ue = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], ct = () => {
  const { i18n: t } = F(), { styles: n } = Ne(), s = (r) => {
    t.changeLanguage(r);
  }, a = {
    selectedKeys: [t.language],
    onClick: (r) => {
      s(r.key);
    },
    items: Ue.map((r) => ({
      key: r.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: n.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    Ve,
    {
      menu: a,
      children: /* @__PURE__ */ e.jsx(Be, {})
    }
  );
}, qe = U(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), O = (t) => re.isString(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? E.endsWith("/") ? E + `files/${t}` : E + `/files/${t}` : t, He = ({ src: t, ...n }) => /* @__PURE__ */ e.jsx(se, { src: O(t), ...n }), Ke = ({ onChange: t, shape: n = "square" }) => {
  const [s, a] = h([]), { styles: r } = qe(), [i, d] = h(!1), [l, p] = h(!0), [x, v] = h(0), { run: c, loading: u } = z(() => S.base.listFiles({ current: x + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: o }) => {
      a([...s, ...o]), p(o.length === 40), v(x + 1);
    }
  }), I = () => {
    p(!0), v(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    ie,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (o) => {
        d(o), o ? c() : I();
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
            le,
            {
              dataLength: s.length,
              next: () => {
                c();
              },
              hasMore: l,
              loader: /* @__PURE__ */ e.jsx(de, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(Z, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                ce,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: s,
                  style: { margin: "0 8px" },
                  loading: u,
                  renderItem: ({ id: o }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: r.avatarItem,
                      onClick: (g) => {
                        g.stopPropagation(), t == null || t(o), d(!1), I();
                      },
                      children: /* @__PURE__ */ e.jsx(He, { shape: n, src: o })
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
        oe,
        {
          shape: n,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, We = ({ value: t, onChange: n, shape: s, ...a }) => {
  const [r, i] = h(void 0), [d, l] = h(!1), [p, x] = h(void 0), v = async (c) => {
    l(!0), x(c.url ?? c.preview);
  };
  return M(() => {
    i(t ? {
      uid: t,
      name: t,
      url: O(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      ae,
      {
        beforeCrop: async (c) => {
          if (c.type === "image/svg+xml") {
            const u = await S.base.uploadFile({ type: "avatar" }, c);
            return u.length > 0 && (n == null || n(u[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          ne,
          {
            customRequest: async (c) => {
              var I, o;
              const u = await S.base.uploadFile({ type: "avatar", access: "public" }, c.file);
              u.length > 0 ? ((I = c.onSuccess) == null || I.call(c, u[0].id), n == null || n(u[0].id)) : (o = c.onError) == null || o.call(c, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: v,
            maxCount: 1,
            onChange: ({ file: c }) => {
              switch (c.status) {
                case "removed":
                  n == null || n(void 0);
                  break;
                case "done":
                  break;
                default:
                  i(c);
                  break;
              }
            },
            fileList: r ? [r] : [],
            ...a,
            children: r ? void 0 : /* @__PURE__ */ e.jsx(Ke, { shape: s, onChange: n })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(q, { open: d, footer: null, onCancel: () => l(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: p }) })
  ] });
}, Ge = ({
  permission: t,
  permissions: n = [],
  checkAll: s = !1,
  fallback: a = null,
  children: r
}) => {
  const { hasPermission: i, hasAnyPermission: d, hasAllPermissions: l, isAdmin: p, loading: x } = K();
  return x ? null : p ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : t ? i(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : n.length > 0 ? (s ? l(n) : d(n)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: r });
}, dt = ({
  fallback: t = null,
  children: n
}) => {
  const { isAdmin: s, loading: a } = K();
  return a ? null : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, P = (t) => {
  const { permission: n, icon: s, tooltip: a, onClick: r, confirm: i, ...d } = t;
  return n ? /* @__PURE__ */ e.jsx(Ge, { permission: n, children: P({ icon: s, tooltip: a, onClick: r, confirm: i, ...d }) }, t.key) : i ? /* @__PURE__ */ e.jsx(B, { title: i.title, onConfirm: i.onConfirm || r, okText: i.okText, cancelText: i.cancelText, children: P({ icon: s, tooltip: a, ...d }) }, t.key) : a ? /* @__PURE__ */ e.jsx(ue, { title: a, children: P({ icon: s, onClick: r, ...d }) }, t.key) : /* @__PURE__ */ Pe(j, { type: "text", size: "small", icon: s, onClick: r, ...d, key: t.key });
}, ut = ({ actions: t }) => t.filter((n) => !n.hidden).map((n) => P(n)), Qe = me, Je = (t) => Qe[t], mt = ({ iconName: t }) => {
  if (!t)
    return null;
  const n = Je(t);
  return n ? /* @__PURE__ */ e.jsx(_e, { fallback: null, children: /* @__PURE__ */ e.jsx(n, {}) }) : null;
}, ht = ({ onChange: t }) => {
  const [n, s] = h(""), [a, r] = h("");
  return /* @__PURE__ */ e.jsxs(A.Compact, { children: [
    /* @__PURE__ */ e.jsx(w, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (i) => s(i.target.value) }),
    /* @__PURE__ */ e.jsx(w, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(w, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (i) => r(i.target.value) }),
    /* @__PURE__ */ e.jsx(j, { type: "primary", icon: /* @__PURE__ */ e.jsx(he, {}), onClick: () => {
      t(n, a);
    } })
  ] });
}, Xe = ({ request: t, tableRef: n, ...s }, a) => {
  const [r, i] = h({
    current: 1,
    pageSize: 10
  }), [d, l] = h(0), { data: p, loading: x, refresh: v } = z(async () => {
    const c = await t({
      current: r.current,
      page_size: r.pageSize
    });
    return l(c.total), c.data;
  }, {
    refreshDeps: [r]
  });
  return Me(a, () => ({
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
        ...r,
        total: d,
        onChange: (c, u) => {
          i({ current: c, pageSize: u });
        }
      },
      ...s,
      ref: n
    }
  );
}, pt = ({ actionRef: t, ...n }) => {
  const [s, a] = h();
  return M(() => {
    a(De(Xe));
  }, []), s ? /* @__PURE__ */ e.jsx(s, { ...n, ref: t }) : null;
}, xt = ({ onSuccess: t, token: n }) => {
  const { t: s } = F("authorization"), { t: a } = F("common"), [r] = f.useForm(), { run: i, loading: d } = z(async (l) => S.authorization.changePassword(l, n ? { headers: { Authorization: `Bearer ${n}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      y.success(s("user.passwordChanged")), r.resetFields(), t == null || t();
    },
    onError: (l) => {
      if (l instanceof $e) {
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
      form: r,
      layout: "vertical",
      onFinish: i,
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
        /* @__PURE__ */ e.jsx(f.Item, { children: /* @__PURE__ */ e.jsx(j, { type: "primary", htmlType: "submit", loading: d, children: a("save") }) })
      ]
    }
  );
}, ft = ({ user: t, onSuccess: n }) => {
  const { t: s } = F("authorization"), { t: a } = F("common"), [r] = f.useForm(), [i, d] = h(!1);
  Re.useEffect(() => {
    t && r.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, r]);
  const l = async (p) => {
    try {
      d(!0), await S.authorization.updateCurrentUser(p), y.success(a("updateSuccess")), n();
    } catch (x) {
      y.error(a("updateFailed")), console.error("Failed to update user information:", x);
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
          /* @__PURE__ */ e.jsx(f.Item, { children: /* @__PURE__ */ e.jsx(j, { type: "primary", htmlType: "submit", loading: i, children: a("save") }) })
        ]
      }
    )
  ] });
}, gt = ({ user: t, onSuccess: n }) => {
  const { t: s } = F("authorization"), { t: a } = F("common"), [r, i] = h(0), [d, l] = h(!1), [p, x] = h(!0), [v, c] = h(""), [u, I] = h("totp"), { run: o, data: g = { secret: "", qr_code: "", token: void 0 } } = z(
    () => S.authorization.enableMfa(u),
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
  ), $ = async () => {
    if (!v) {
      y.warning(s("mfa.enterVerificationCode"));
      return;
    }
    const b = {
      code: v,
      mfa_type: u
    };
    "token" in g && (b.token = g.token);
    try {
      l(!0), await S.authorization.verifyAndActivateMfa(b), y.success(s("mfa.enableSuccess")), i(2), n();
    } catch (L) {
      y.error(s("mfa.verificationFailed")), console.error("Failed to verify MFA:", L);
    } finally {
      l(!1);
    }
  }, m = async () => {
    try {
      l(!0), await S.authorization.disableMfa(), y.success(s("mfa.disableSuccess")), n();
    } catch (b) {
      y.error(a("operationFailed")), console.error("Failed to disable MFA:", b);
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
    const b = () => {
      var L;
      switch (r) {
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
            /* @__PURE__ */ e.jsx("div", { style: { display: u === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(je, { value: g.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: u === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: u === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: p ? "*".repeat(((L = g.secret) == null ? void 0 : L.length) ?? 0) : g.secret }),
              /* @__PURE__ */ e.jsx(
                j,
                {
                  type: "link",
                  onClick: () => x(!p),
                  icon: p ? /* @__PURE__ */ e.jsx(Y, {}) : /* @__PURE__ */ e.jsx(ye, {})
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
                onChange: (R) => c(R.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(A, { children: [
              /* @__PURE__ */ e.jsx(j, { onClick: () => i(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                j,
                {
                  type: "primary",
                  onClick: $,
                  loading: d,
                  children: a("verify")
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
              extra: /* @__PURE__ */ e.jsx(j, { type: "primary", onClick: () => i(0), children: a("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: r === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          pe,
          {
            defaultValue: "totp",
            onChange: (L) => {
              I(L), i(0);
            },
            value: u,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(xe, {}), label: s("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(fe, {}), label: s("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(Z, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        ge,
        {
          current: r,
          items: [
            { title: s(u === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: s(u === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: s(u === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: s(u === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: s(u === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: s(u === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      b()
    ] });
  };
  return /* @__PURE__ */ e.jsx(_, { title: s("mfa.title"), children: k() });
}, { Text: V } = Se, jt = () => {
  const { t } = F("authorization"), { t: n } = F("common"), [s, a] = h([]), [r, i] = h(!1), [d, l] = h(null), [p, x] = h(!1), v = async () => {
    try {
      i(!0);
      const o = await S.authorization.getUserSessions({});
      a(o);
    } catch (o) {
      y.error(t("session.getSessionsFailed", { error: o, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      i(!1);
    }
  };
  M(() => {
    v();
  }, []);
  const c = async (o) => {
    try {
      l(o), await S.authorization.terminateSession({ id: o }), a(s.filter((g) => g.id !== o)), y.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (g) {
      y.error(t("session.terminateFailed", { error: g, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      l(null);
    }
  }, u = async () => {
    try {
      x(!0), await S.authorization.terminateOtherSessions(), a(s.filter((o) => o.is_current)), y.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (o) {
      y.error(t("session.terminateAllFailed", { error: o, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      x(!1);
    }
  }, I = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (o, g) => /* @__PURE__ */ e.jsxs(A, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(A, { children: [
          /* @__PURE__ */ e.jsx(ve, {}),
          /* @__PURE__ */ e.jsx(V, { strong: !0, children: o })
        ] }),
        /* @__PURE__ */ e.jsxs(A, { children: [
          /* @__PURE__ */ e.jsx(we, {}),
          /* @__PURE__ */ e.jsx(V, { type: "secondary", children: g.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (o) => /* @__PURE__ */ e.jsxs(A, { children: [
        /* @__PURE__ */ e.jsx(Ie, {}),
        /* @__PURE__ */ e.jsx("span", { children: o })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (o) => /* @__PURE__ */ e.jsxs(A, { children: [
        /* @__PURE__ */ e.jsx(be, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(o).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (o) => o.is_current ? /* @__PURE__ */ e.jsx(D, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(D, { color: "blue", children: t("session.active") })
    },
    {
      title: n("actions"),
      key: "action",
      render: (o) => o.is_current ? /* @__PURE__ */ e.jsx(V, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        B,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => c(o.id),
          okText: n("confirm"),
          cancelText: n("cancel"),
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
    _,
    {
      title: t("session.title"),
      extra: s.length > 1 && /* @__PURE__ */ e.jsx(
        B,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: u,
          okText: n("confirm"),
          cancelText: n("cancel"),
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
      children: s.length === 0 ? /* @__PURE__ */ e.jsx(Fe, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        H,
        {
          columns: I,
          dataSource: s,
          rowKey: "id",
          loading: r,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: Ze } = ke, { Option: C } = N, Ye = (t) => t || "N/A", Oe = (t, n) => t === "success" ? /* @__PURE__ */ e.jsx(D, { color: "success", children: n("statuses.success") }) : /* @__PURE__ */ e.jsx(D, { color: "error", children: n("statuses.failed") }), yt = ({
  userId: t,
  request: n = (a) => t ? S.authorization.getUserLogs({ id: t, ...a }) : S.authorization.getCurrentUserLogs(a),
  columnsFilter: s = (a) => a
}) => {
  const { t: a } = F("authorization"), { t: r } = F("common"), [i, d] = h({
    current: 1,
    pageSize: 10,
    total: 0
  }), [l, p] = h({}), [x] = f.useForm(), { loading: v, run: c, data: { data: u } = {} } = z(async (m = l, k = 1, b = 10) => n({
    ...m,
    current: k ?? 1,
    page_size: b ?? 10
  }), {
    onError(m) {
      y.error(a("auditLog.fetchFailed", { error: m }));
    },
    onSuccess({ total: m }) {
      d({
        ...i,
        total: m
      });
    }
  });
  M(() => {
    c(l, 1, i.pageSize);
  }, []);
  const I = (m) => {
    d({
      ...i,
      current: m.current,
      pageSize: m.pageSize
    }), c({}, m.current, m.pageSize);
  }, o = (m) => {
    var k, b, L, R;
    c({
      ...m,
      start_time: (b = (k = m.dateRange) == null ? void 0 : k[0]) == null ? void 0 : b.toISOString(),
      end_time: (R = (L = m.dateRange) == null ? void 0 : L[1]) == null ? void 0 : R.toISOString()
    }, 1, i.pageSize);
  }, g = () => {
    x.resetFields(), p({}), d({ ...i, current: 1 }), c({}, 1, i.pageSize);
  }, $ = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (m) => ze(m)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (m, k) => m ? a(`action.${m.replace(":", ".")}`, { defaultValue: k.action_name }) : k.action_name ?? k.action
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
      render: (m) => Ye(m)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (m) => Oe(m, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (m) => /* @__PURE__ */ e.jsx(j, { type: "link", icon: /* @__PURE__ */ e.jsx(Y, {}), onClick: () => {
        q.info({
          title: a("auditLog.details"),
          content: JSON.stringify(m)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(_, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      f,
      {
        form: x,
        layout: "horizontal",
        onFinish: o,
        initialValues: l,
        children: [
          /* @__PURE__ */ e.jsxs(Q, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(T, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(w, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(T, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs(N, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(C, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(C, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(C, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(C, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(T, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs(N, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(C, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(C, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(T, { span: 6, children: /* @__PURE__ */ e.jsx(f.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(Ze, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(Q, { children: /* @__PURE__ */ e.jsx(T, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(A, { children: [
            /* @__PURE__ */ e.jsx(j, { onClick: g, children: r("reset") }),
            /* @__PURE__ */ e.jsx(j, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Le, {}), children: r("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(_, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        j,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Ae, {}),
          onClick: g,
          style: { marginRight: 8 },
          children: r("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        H,
        {
          rowKey: "id",
          columns: s($),
          dataSource: u,
          pagination: {
            ...i,
            showSizeChanger: !0,
            showTotal: (m) => r("totalItems", { total: m })
          },
          loading: v,
          onChange: I,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
};
export {
  He as A,
  mt as D,
  Ve as H,
  ot as L,
  lt as P,
  pt as T,
  yt as U,
  ct as a,
  ut as b,
  We as c,
  ht as d,
  Ue as e,
  Ge as f,
  Je as g,
  dt as h,
  xt as i,
  ft as j,
  gt as k,
  jt as l
};
