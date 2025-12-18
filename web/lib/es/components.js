import { j as e, I as le, a as ce } from "./vendor.js";
import { Navigate as G } from "react-router-dom";
import { a as te, b as H, c as de, d as ue } from "./contexts.js";
import { g as me, f as he, c as pe } from "./base.js";
import { Spin as xe, Result as U, Dropdown as ne, Avatar as ge, Upload as fe, Modal as O, Popover as je, List as ye, Divider as se, Skeleton as ve, Button as v, Popconfirm as q, Tooltip as be, Space as A, Input as w, Table as K, Form as g, message as b, Card as R, Segmented as we, Steps as Se, Alert as J, QRCode as Ie, Typography as Ce, Tag as E, Empty as ke, Row as Q, Col as P, Select as T, DatePicker as Fe, Checkbox as X, Switch as Le, InputNumber as Ae } from "antd";
import { useTranslation as S } from "react-i18next";
import { createStyles as W } from "antd-style";
import * as Te from "@ant-design/icons";
import { UploadOutlined as ze, CheckOutlined as Pe, TeamOutlined as _e, MoreOutlined as Me, PlusOutlined as De, ClockCircleFilled as Re, MailOutlined as Ee, EyeOutlined as ae, EyeInvisibleOutlined as Oe, LaptopOutlined as Ve, EnvironmentOutlined as $e, GlobalOutlined as Ne, ClockCircleOutlined as Be, SearchOutlined as Ue, ReloadOutlined as qe } from "@ant-design/icons";
import He from "classnames";
import Ke, { useState as j, useEffect as _, useCallback as V, Suspense as We, forwardRef as Ge, useImperativeHandle as Je, useMemo as Z } from "react";
import { useRequest as M } from "ahooks";
import { a as C } from "./index.js";
import { b as $, A as Qe } from "./client.js";
import { isString as Xe } from "lodash-es";
const Ze = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(xe, { size: "large" }) }), Ft = ({
  element: t,
  requiredPermission: a,
  requiredPermissions: n
}) => {
  const { t: s } = S(), { user: o, loading: r, error: u } = te(), { hasPermission: i, hasAllPermissions: h } = H();
  return r ? /* @__PURE__ */ e.jsx(Ze, {}) : u ? /* @__PURE__ */ e.jsx(
    U,
    {
      status: "500",
      title: "500",
      subTitle: s("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (u == null ? void 0 : u.message) || u })
    }
  ) : o ? a && !i(a) ? /* @__PURE__ */ e.jsx(G, { to: "/forbidden", replace: !0 }) : n && !h(n) ? /* @__PURE__ */ e.jsx(G, { to: "/forbidden", replace: !0 }) : t : (window.location.href = me("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, Ye = W(({ token: t, css: a }) => ({
  container: a`
      ${a`
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
})), re = ({
  overlayClassName: t,
  overlay: a,
  hidden: n,
  children: s,
  ...o
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: r } = Ye();
  return /* @__PURE__ */ e.jsx(
    ne,
    {
      dropdownRender: a,
      overlayClassName: He(r.container, t),
      ...o,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: s })
    }
  );
}, et = () => /* @__PURE__ */ e.jsxs(
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
), tt = W(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), nt = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], Lt = ({
  transformLangConfig: t = (a) => a
}) => {
  const { i18n: a } = S(), { styles: n } = tt(), s = (r) => {
    a.changeLanguage(r);
  }, o = {
    selectedKeys: [a.language],
    onClick: (r) => {
      s(r.key);
    },
    items: t(nt).map((r) => ({
      key: r.lang,
      className: n.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: n.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    re,
    {
      menu: o,
      children: /* @__PURE__ */ e.jsx(et, {})
    }
  );
}, st = W(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), ie = (t) => Xe(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? $.endsWith("/") ? $ + `files/${t}` : $ + `/files/${t}` : t, at = ({ src: t, fallback: a, ...n }) => /* @__PURE__ */ e.jsx(ge, { src: ie(t), icon: a, ...n }), rt = ({ onChange: t, shape: a = "square" }) => {
  const [n, s] = j([]), { styles: o } = st(), [r, u] = j(!1), [i, h] = j(!0), [m, f] = j(0), { run: l, loading: c } = M(() => C.base.listFiles({ current: m + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: d }) => {
      s([...n, ...d]), h(d.length === 40), f(m + 1);
    }
  }), y = () => {
    h(!0), f(0), s([]);
  };
  return /* @__PURE__ */ e.jsx(
    je,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (d) => {
        u(d), d ? l() : y();
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
            ce,
            {
              dataLength: n.length,
              next: () => {
                l();
              },
              hasMore: i,
              loader: /* @__PURE__ */ e.jsx(ve, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(se, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                ye,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: c,
                  renderItem: ({ id: d }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: o.avatarItem,
                      onClick: (p) => {
                        p.stopPropagation(), t == null || t(d), u(!1), y();
                      },
                      children: /* @__PURE__ */ e.jsx(at, { shape: a, src: d })
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
        ze,
        {
          shape: a,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, it = ({ value: t, onChange: a, shape: n, ...s }) => {
  const [o, r] = j(void 0), [u, i] = j(!1), [h, m] = j(void 0), f = async (l) => {
    i(!0), m(l.url ?? l.preview);
  };
  return _(() => {
    r(t ? {
      uid: t,
      name: t,
      url: ie(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      le,
      {
        beforeCrop: async (l) => {
          if (l.type === "image/svg+xml") {
            const c = await C.base.uploadFile({ type: "avatar" }, l);
            return c.length > 0 && (a == null || a(c[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          fe,
          {
            customRequest: async (l) => {
              var y, d;
              const c = await C.base.uploadFile({ type: "avatar", access: "public" }, l.file);
              c.length > 0 ? ((y = l.onSuccess) == null || y.call(l, c[0].id), a == null || a(c[0].id)) : (d = l.onError) == null || d.call(l, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: f,
            maxCount: 1,
            onChange: ({ file: l }) => {
              switch (l.status) {
                case "removed":
                  a == null || a(void 0);
                  break;
                case "done":
                  break;
                default:
                  r(l);
                  break;
              }
            },
            fileList: o ? [o] : [],
            ...s,
            children: o ? void 0 : /* @__PURE__ */ e.jsx(rt, { shape: n, onChange: a })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(O, { open: u, footer: null, onCancel: () => i(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: h }) })
  ] });
}, At = () => {
  const { t } = S("common"), { user: a } = te(), { currentOrgId: n, setCurrentOrgId: s } = de(), o = (a == null ? void 0 : a.organizations) || [], r = (m) => {
    s(m), window.location.reload();
  };
  if (o.length === 0)
    return null;
  const u = o.find((m) => m.id === n), i = u ? u.name : t("organization.global", { defaultValue: "Global" }), h = [
    ...o.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        n === m.id && /* @__PURE__ */ e.jsx(Pe, {})
      ] }),
      onClick: () => r(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    re,
    {
      menu: {
        items: h,
        selectedKeys: n ? [n] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(_e, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: i })
      ]
    }
  );
}, Tt = ({
  onResize: t,
  minWidth: a = 300,
  maxWidth: n = window.innerWidth * 0.5
}) => {
  const [s, o] = j(!1), [r, u] = j(!1), i = V((f) => {
    f.preventDefault(), o(!0);
  }, []), h = V(
    (f) => {
      if (!s) return;
      const l = window.innerWidth - f.clientX, c = Math.max(a, Math.min(n, l));
      t(c);
    },
    [s, a, n, t]
  ), m = V(() => {
    o(!1);
  }, []);
  return _(() => {
    if (s)
      return document.addEventListener("mousemove", h), document.addEventListener("mouseup", m), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", m), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [s, h, m]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: i,
      onMouseEnter: () => u(!0),
      onMouseLeave: () => u(!1),
      style: {
        width: "8px",
        height: "100vh",
        cursor: "col-resize",
        position: "relative",
        flexShrink: 0,
        transition: s ? "none" : "background-color 0.2s ease",
        backgroundColor: s ? "#1890ff" : r ? "#bfbfbf" : "#e8e8e8",
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
            backgroundColor: s || r ? "#fff" : "#999",
            opacity: s || r ? 1 : 0.5,
            transition: "opacity 0.2s ease",
            pointerEvents: "none"
          }
        }
      )
    }
  );
}, oe = ({
  permission: t,
  permissions: a = [],
  checkAll: n = !1,
  fallback: s = null,
  children: o
}) => {
  const { hasPermission: r, hasAnyPermission: u, hasAllPermissions: i, isAdmin: h, loading: m } = H();
  return m ? null : h ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : a.length > 0 ? (n ? i(a) : u(a)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: o });
}, zt = ({
  fallback: t = null,
  children: a
}) => {
  const { isAdmin: n, loading: s } = H();
  return s ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, Y = (t) => {
  const [a, n] = j(!1), { permission: s, icon: o, tooltip: r, onClick: u, confirm: i, label: h, ...m } = t, f = u ? async () => {
    n(!0);
    try {
      await u();
    } finally {
      n(!1);
    }
  } : void 0;
  let l = /* @__PURE__ */ e.jsx(
    v,
    {
      type: "text",
      size: "small",
      loading: a,
      icon: o,
      onClick: i ? void 0 : f,
      ...m,
      children: h && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: h })
    }
  );
  if (r && (l = /* @__PURE__ */ e.jsx(be, { title: r, children: l })), i) {
    const c = async () => {
      i.onConfirm ? i.onConfirm() : f && await f();
    };
    l = /* @__PURE__ */ e.jsx(
      q,
      {
        title: i.title,
        description: i.description,
        onConfirm: c,
        okText: i.okText,
        cancelText: i.cancelText,
        children: l
      }
    );
  }
  return s && (l = /* @__PURE__ */ e.jsx(oe, { permission: s, children: l })), l;
}, Pt = ({ actions: t, maxVisibleItems: a }) => {
  const n = t.filter((u) => !u.hidden);
  if (!a || n.length <= a)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: n.map(({ key: u, ...i }) => /* @__PURE__ */ e.jsx(Y, { ...i }, u)) });
  const s = n.slice(0, a - 1), r = n.slice(a - 1).map((u) => {
    const { key: i, label: h, icon: m, permission: f, onClick: l, confirm: c, disabled: y, tooltip: d } = u, I = {
      key: i,
      label: h,
      icon: m,
      disabled: y,
      onClick: async () => {
        c ? O.confirm({
          title: c.title,
          content: c.description,
          onOk: c.onConfirm,
          okText: c.okText,
          cancelText: c.cancelText
        }) : l && await l();
      }
    };
    return f ? {
      ...I,
      label: /* @__PURE__ */ e.jsx(oe, { permission: f, children: /* @__PURE__ */ e.jsx("span", { children: h ?? d }) })
    } : I;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s.map(({ key: u, ...i }) => /* @__PURE__ */ e.jsx(Y, { ...i }, u)),
    /* @__PURE__ */ e.jsx(ne, { menu: { items: r }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(v, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(Me, {}) }) })
  ] });
}, ot = Te, lt = (t) => ot[t], _t = ({ iconName: t }) => {
  if (!t)
    return null;
  const a = lt(t);
  return a ? /* @__PURE__ */ e.jsx(We, { fallback: null, children: /* @__PURE__ */ e.jsx(a, {}) }) : null;
}, Mt = ({ onChange: t }) => {
  const [a, n] = j(""), [s, o] = j("");
  return /* @__PURE__ */ e.jsxs(A.Compact, { children: [
    /* @__PURE__ */ e.jsx(w, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => n(r.target.value) }),
    /* @__PURE__ */ e.jsx(w, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(w, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (r) => o(r.target.value) }),
    /* @__PURE__ */ e.jsx(v, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), onClick: () => {
      t(a, s);
    } })
  ] });
}, ct = ({ request: t, tableRef: a, ...n }, s) => {
  const [o, r] = j({
    current: 1,
    pageSize: 10
  }), [u, i] = j(0), { data: h, loading: m, refresh: f } = M(async () => {
    const l = await t({
      current: o.current,
      page_size: o.pageSize
    });
    return i(l.total), l.data;
  }, {
    refreshDeps: [o]
  });
  return Je(s, () => ({
    reload: () => {
      f();
    }
  })), /* @__PURE__ */ e.jsx(
    K,
    {
      rowKey: "id",
      loading: m,
      dataSource: h ?? [],
      pagination: {
        ...o,
        total: u,
        onChange: (l, c) => {
          r({ current: l, pageSize: c });
        }
      },
      ...n,
      ref: a
    }
  );
}, Dt = ({ actionRef: t, ...a }) => {
  const [n, s] = j();
  return _(() => {
    s(Ge(ct));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...a, ref: t }) : null;
}, Rt = ({ onSuccess: t, token: a }) => {
  const { t: n } = S("authorization"), { t: s } = S("common"), [o] = g.useForm(), { run: r, loading: u } = M(async (i) => C.authorization.changePassword(i, a ? { headers: { Authorization: `Bearer ${a}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      b.success(n("user.passwordChanged")), o.resetFields(), t == null || t();
    },
    onError: (i) => {
      if (i instanceof Qe) {
        const h = i.code ?? "normal";
        b.error(n(`user.passwordChangeFailed.${h}`, { error: i.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        b.error(n("user.passwordChangeFailed.normal", { error: i.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", i);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    g,
    {
      form: o,
      layout: "vertical",
      onFinish: r,
      style: { maxWidth: 500, margin: "0 auto" },
      children: [
        /* @__PURE__ */ e.jsx(
          g.Item,
          {
            name: "old_password",
            label: n("user.oldPassword"),
            rules: [{ required: !0, message: n("validation.oldPasswordRequired") }],
            children: /* @__PURE__ */ e.jsx(w.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          g.Item,
          {
            name: "new_password",
            label: n("user.newPassword"),
            rules: [
              { required: !0, message: n("validation.newPasswordRequired") },
              { min: 8, message: n("validation.passwordMinLength") }
            ],
            children: /* @__PURE__ */ e.jsx(w.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          g.Item,
          {
            name: "confirm_password",
            label: n("user.confirmPassword"),
            rules: [
              { required: !0, message: n("validation.confirmPasswordRequired") },
              ({ getFieldValue: i }) => ({
                validator(h, m) {
                  return !m || i("new_password") === m ? Promise.resolve() : Promise.reject(new Error(n("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(w.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(g.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: u, children: s("save") }) })
      ]
    }
  );
}, Et = ({ user: t, onSuccess: a }) => {
  const { t: n } = S("authorization"), { t: s } = S("common"), [o] = g.useForm(), [r, u] = j(!1);
  Ke.useEffect(() => {
    t && o.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, o]);
  const i = async (h) => {
    try {
      u(!0), await C.authorization.updateCurrentUser(h), b.success(s("updateSuccess")), a();
    } catch (m) {
      b.error(s("updateFailed")), console.error("Failed to update user information:", m);
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
      g,
      {
        form: o,
        layout: "vertical",
        onFinish: i,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(it, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(w, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              name: "email",
              label: n("user.email"),
              rules: [
                { required: !0, message: n("validation.emailRequired") },
                { type: "email", message: n("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(w, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(w, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(w, {})
            }
          ),
          /* @__PURE__ */ e.jsx(g.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: r, children: s("save") }) })
        ]
      }
    )
  ] });
}, Ot = ({ user: t, onSuccess: a }) => {
  const { t: n } = S("authorization"), { t: s } = S("common"), [o, r] = j(0), [u, i] = j(!1), [h, m] = j(!0), [f, l] = j(""), [c, y] = j("totp"), { run: d, data: p = { secret: "", qr_code: "", token: void 0 } } = M(
    () => C.authorization.enableMfa(c),
    {
      manual: !0,
      onSuccess: () => {
        r(1);
      },
      onBefore: () => {
        i(!0);
      },
      onFinally: () => {
        i(!1);
      }
    }
  ), I = async () => {
    if (!f) {
      b.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const k = {
      code: f,
      mfa_type: c
    };
    "token" in p && (k.token = p.token);
    try {
      i(!0), await C.authorization.verifyAndActivateMfa(k), b.success(n("mfa.enableSuccess")), r(2), a();
    } catch (L) {
      b.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", L);
    } finally {
      i(!1);
    }
  }, x = async () => {
    try {
      i(!0), await C.authorization.disableMfa(), b.success(n("mfa.disableSuccess")), a();
    } catch (k) {
      b.error(s("operationFailed")), console.error("Failed to disable MFA:", k);
    } finally {
      i(!1);
    }
  }, F = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        U,
        {
          status: "success",
          title: n("mfa.enabled"),
          subTitle: n("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            v,
            {
              danger: !0,
              onClick: () => {
                O.confirm({
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
    const k = () => {
      var L;
      switch (o) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              J,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(c === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
                ] }),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20 }
              }
            ),
            /* @__PURE__ */ e.jsx(
              v,
              {
                type: "primary",
                onClick: d,
                loading: u,
                children: n("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              J,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: c === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: c === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Ie, { value: p.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: c === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: c === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: h ? "*".repeat(((L = p.secret) == null ? void 0 : L.length) ?? 0) : p.secret }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "link",
                  onClick: () => m(!h),
                  icon: h ? /* @__PURE__ */ e.jsx(ae, {}) : /* @__PURE__ */ e.jsx(Oe, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              w,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: f,
                onChange: (D) => l(D.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(A, { children: [
              /* @__PURE__ */ e.jsx(v, { onClick: () => r(0), children: s("previous") }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "primary",
                  onClick: I,
                  loading: u,
                  children: s("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            U,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(v, { type: "primary", onClick: () => r(0), children: s("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: o === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          we,
          {
            defaultValue: "totp",
            onChange: (L) => {
              y(L), r(0);
            },
            value: c,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Re, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Ee, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(se, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Se,
        {
          current: o,
          items: [
            { title: n(c === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(c === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(c === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(c === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(c === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(c === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      k()
    ] });
  };
  return /* @__PURE__ */ e.jsx(R, { title: n("mfa.title"), children: F() });
}, { Text: N } = Ce, Vt = () => {
  const { t } = S("authorization"), { t: a } = S("common"), [n, s] = j([]), [o, r] = j(!1), [u, i] = j(null), [h, m] = j(!1), f = async () => {
    try {
      r(!0);
      const d = await C.authorization.getUserSessions({});
      s(d);
    } catch (d) {
      b.error(t("session.getSessionsFailed", { error: d, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      r(!1);
    }
  };
  _(() => {
    f();
  }, []);
  const l = async (d) => {
    try {
      i(d), await C.authorization.terminateSession({ id: d }), s(n.filter((p) => p.id !== d)), b.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (p) {
      b.error(t("session.terminateFailed", { error: p, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      i(null);
    }
  }, c = async () => {
    try {
      m(!0), await C.authorization.terminateOtherSessions(), s(n.filter((d) => d.is_current)), b.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
    } catch (d) {
      b.error(t("session.terminateAllFailed", { error: d, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    } finally {
      m(!1);
    }
  }, y = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (d, p) => /* @__PURE__ */ e.jsxs(A, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(A, { children: [
          /* @__PURE__ */ e.jsx(Ve, {}),
          /* @__PURE__ */ e.jsx(N, { strong: !0, children: d })
        ] }),
        /* @__PURE__ */ e.jsxs(A, { children: [
          /* @__PURE__ */ e.jsx($e, {}),
          /* @__PURE__ */ e.jsx(N, { type: "secondary", children: p.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (d) => /* @__PURE__ */ e.jsxs(A, { children: [
        /* @__PURE__ */ e.jsx(Ne, {}),
        /* @__PURE__ */ e.jsx("span", { children: d })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (d) => /* @__PURE__ */ e.jsxs(A, { children: [
        /* @__PURE__ */ e.jsx(Be, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(d).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (d) => d.is_current ? /* @__PURE__ */ e.jsx(E, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(E, { color: "blue", children: t("session.active") })
    },
    {
      title: a("actions"),
      key: "action",
      render: (d) => d.is_current ? /* @__PURE__ */ e.jsx(N, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        q,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => l(d.id),
          okText: a("confirm"),
          cancelText: a("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
            {
              type: "link",
              danger: !0,
              loading: u === d.id,
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
      extra: n.length > 1 && /* @__PURE__ */ e.jsx(
        q,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: c,
          okText: a("confirm"),
          cancelText: a("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
            {
              danger: !0,
              loading: h,
              children: t("session.terminateOthers")
            }
          )
        }
      ),
      children: n.length === 0 ? /* @__PURE__ */ e.jsx(ke, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        K,
        {
          columns: y,
          dataSource: n,
          rowKey: "id",
          loading: o,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: dt } = Fe, { Option: z } = T, ut = (t) => t || "N/A", mt = (t, a) => t === "success" ? /* @__PURE__ */ e.jsx(E, { color: "success", children: a("statuses.success") }) : /* @__PURE__ */ e.jsx(E, { color: "error", children: a("statuses.failed") }), $t = ({
  userId: t,
  request: a = (s) => t ? C.authorization.getUserLogs({ id: t, ...s }) : C.authorization.getCurrentUserLogs(s),
  columnsFilter: n = (s) => s
}) => {
  const { t: s } = S("authorization"), { t: o } = S("common"), [r, u] = j({
    current: 1,
    pageSize: 10,
    total: 0
  }), [i, h] = j({}), [m] = g.useForm(), { loading: f, run: l, data: { data: c } = {} } = M(async (x = i, F = 1, k = 10) => a({
    ...x,
    current: F ?? 1,
    page_size: k ?? 10
  }), {
    onError(x) {
      b.error(s("auditLog.fetchFailed", { error: x }));
    },
    onSuccess({ total: x }) {
      u({
        ...r,
        total: x
      });
    }
  });
  _(() => {
    l(i, 1, r.pageSize);
  }, []);
  const y = (x) => {
    u({
      ...r,
      current: x.current,
      pageSize: x.pageSize
    }), l({}, x.current, x.pageSize);
  }, d = (x) => {
    var F, k, L, D;
    l({
      ...x,
      start_time: (k = (F = x.dateRange) == null ? void 0 : F[0]) == null ? void 0 : k.toISOString(),
      end_time: (D = (L = x.dateRange) == null ? void 0 : L[1]) == null ? void 0 : D.toISOString()
    }, 1, r.pageSize);
  }, p = () => {
    m.resetFields(), h({}), u({ ...r, current: 1 }), l({}, 1, r.pageSize);
  }, I = [
    {
      title: s("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (x) => he(x)
    },
    {
      title: s("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (x, F) => x ? s(`action.${x.replace(":", ".")}`, { defaultValue: F.action_name }) : F.action_name ?? F.action
    },
    {
      title: s("auditLog.user_agent"),
      dataIndex: "user_agent",
      key: "user_agent"
    },
    {
      title: s("auditLog.ip"),
      dataIndex: "ip",
      key: "ip",
      render: (x) => ut(x)
    },
    {
      title: s("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (x) => mt(x, s)
    },
    {
      title: s("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (x) => /* @__PURE__ */ e.jsx(v, { type: "link", icon: /* @__PURE__ */ e.jsx(ae, {}), onClick: () => {
        O.info({
          title: s("auditLog.details"),
          content: JSON.stringify(x)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(R, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      g,
      {
        form: m,
        layout: "horizontal",
        onFinish: d,
        initialValues: i,
        children: [
          /* @__PURE__ */ e.jsxs(Q, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(P, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "search", label: s("auditLog.search"), children: /* @__PURE__ */ e.jsx(w, { placeholder: s("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(P, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "action", label: s("auditLog.action"), children: /* @__PURE__ */ e.jsxs(T, { allowClear: !0, placeholder: s("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(z, { value: "login", children: s("actions.login") }),
              /* @__PURE__ */ e.jsx(z, { value: "logout", children: s("actions.logout") }),
              /* @__PURE__ */ e.jsx(z, { value: "password_reset", children: s("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(z, { value: "mfa_change", children: s("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(P, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "status", label: s("auditLog.status"), children: /* @__PURE__ */ e.jsxs(T, { allowClear: !0, placeholder: s("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(z, { value: "success", children: s("statuses.success") }),
              /* @__PURE__ */ e.jsx(z, { value: "failed", children: s("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(P, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "dateRange", label: s("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(dt, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(Q, { children: /* @__PURE__ */ e.jsx(P, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(A, { children: [
            /* @__PURE__ */ e.jsx(v, { onClick: p, children: o("reset") }),
            /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ue, {}), children: o("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(R, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        v,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(qe, {}),
          onClick: p,
          style: { marginRight: 8 },
          children: o("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        K,
        {
          rowKey: "id",
          columns: n(I),
          dataSource: c,
          pagination: {
            ...r,
            showSizeChanger: !0,
            showTotal: (x) => o("totalItems", { total: x })
          },
          loading: f,
          onChange: y,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { TextArea: ee } = w, { Option: B } = T, Nt = ({
  field: t,
  selectedType: a,
  dependentValues: n,
  formValues: s = {}
}) => {
  const { t: o } = S("system"), { t: r } = S("common"), u = Z(() => pe(t.visible_when, s), [t.visible_when, s]), { options: i, loading: h } = ue(
    t.data_source,
    t.options,
    n
  ), m = Z(() => t.data_source && t.data_source.type !== "static" ? i : t.options || [], [t.data_source, t.options, i]), f = m && m.length > 0;
  if (!u)
    return null;
  const l = [
    {
      required: t.required,
      message: o("settings.toolsets.fieldRequired", {
        defaultValue: `Please enter ${t.name}`,
        field: t.name
      })
    }
  ], c = () => o(`settings.toolsets.${a}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), y = () => o(`settings.toolsets.${a}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${r("enter", { defaultValue: "Enter" })} ${t.name}`
  }), d = () => {
    if (t.description)
      return o(`settings.toolsets.${a}.${t.name}Tooltip`, {
        defaultValue: t.description
      });
  };
  if (!u)
    return null;
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      g.Item,
      {
        name: ["config", t.name],
        label: c(),
        rules: l,
        tooltip: d(),
        children: /* @__PURE__ */ e.jsx(
          T,
          {
            loading: h,
            allowClear: !0,
            placeholder: y(),
            showSearch: !0,
            filterOption: (p, I) => {
              var x;
              return (x = I == null ? void 0 : I.children) == null ? void 0 : x.toLowerCase().includes(p.toLowerCase());
            },
            children: m.map((p) => /* @__PURE__ */ e.jsx(B, { value: p.value, children: p.label }, p.value))
          }
        )
      },
      t.name
    );
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: l,
          children: /* @__PURE__ */ e.jsx(ee, { placeholder: y(), rows: 4 })
        },
        t.name
      );
    case "string":
      return f ? /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: l,
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(T, { allowClear: !0, placeholder: y(), children: m.map((p) => /* @__PURE__ */ e.jsx(B, { value: p.value, children: p.label }, p.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: l,
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(w, { placeholder: y() })
        },
        t.name
      );
    case "password":
      return /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: l,
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(w.Password, { placeholder: y(), autoComplete: "new-password" })
        },
        t.name
      );
    case "number":
      return f ? /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: l,
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(T, { allowClear: !0, placeholder: y(), children: m.map((p) => /* @__PURE__ */ e.jsx(B, { value: p.value, children: p.label }, p.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: l,
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(Ae, { style: { width: "100%" }, placeholder: y() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          valuePropName: "checked",
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(Le, {})
        },
        t.name
      );
    case "array":
      return f ? /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: l,
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(X.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(A, { direction: "vertical", children: m.map((p) => /* @__PURE__ */ e.jsx(X, { value: p.value, children: p.label }, p.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: l,
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(
            T,
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
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: [
            ...l,
            {
              validator: (p, I) => {
                if (!I) return Promise.resolve();
                try {
                  return JSON.parse(I), Promise.resolve();
                } catch {
                  return Promise.reject(
                    new Error(
                      o("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON format" })
                    )
                  );
                }
              }
            }
          ],
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(
            ee,
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
  at as A,
  _t as D,
  re as H,
  Ze as L,
  At as O,
  Ft as P,
  Tt as R,
  Dt as T,
  $t as U,
  Lt as a,
  Pt as b,
  it as c,
  Mt as d,
  nt as e,
  oe as f,
  lt as g,
  zt as h,
  Rt as i,
  Et as j,
  Ot as k,
  Vt as l,
  Nt as m
};
