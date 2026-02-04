import { j as e, I as de, a as ue } from "./vendor.js";
import { Navigate as J } from "react-router-dom";
import { a as ne, b as K, c as me, d as he } from "./contexts.js";
import { g as pe, f as xe, c as ge } from "./base.js";
import { Spin as fe, Result as H, Dropdown as re, Avatar as je, Upload as ye, Modal as O, Popover as ve, List as we, Divider as ae, Skeleton as be, Button as v, Popconfirm as q, Tooltip as Se, Space as L, Input as b, Table as W, Form as x, message as w, Card as E, Segmented as Ie, Steps as Ce, Alert as X, QRCode as ke, Typography as Fe, Tag as R, Empty as Le, Row as Q, Col as M, Select as T, DatePicker as Ae, Checkbox as Z, Switch as Te, InputNumber as ze } from "antd";
import { useTranslation as S } from "react-i18next";
import { createStyles as G } from "antd-style";
import * as Pe from "@ant-design/icons";
import { UploadOutlined as _e, CheckOutlined as Me, TeamOutlined as De, MoreOutlined as Ee, PlusOutlined as Re, ClockCircleFilled as Oe, MailOutlined as Ve, EyeOutlined as ie, EyeInvisibleOutlined as Ne, LaptopOutlined as $e, EnvironmentOutlined as Be, GlobalOutlined as Ue, ClockCircleOutlined as He, SearchOutlined as qe, ReloadOutlined as Ke } from "@ant-design/icons";
import _ from "classnames";
import We, { useState as j, useEffect as V, useCallback as N, Suspense as Ge, forwardRef as Je, useImperativeHandle as Xe, useMemo as Y } from "react";
import { useRequest as z } from "ahooks";
import { XMarkdown as Qe } from "@ant-design/x-markdown";
import { Mermaid as Ze, CodeHighlighter as Ye } from "@ant-design/x";
import { a as C } from "./index.js";
import { b as $, A as et } from "./client.js";
import { isString as tt } from "lodash-es";
const ee = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(fe, { size: "large" }) }), _t = ({
  element: t,
  requiredPermission: r,
  requiredPermissions: n
}) => {
  const { t: s } = S(), { user: o, loading: l, error: i } = ne(), { hasPermission: d, hasAllPermissions: u } = K();
  return l ? /* @__PURE__ */ e.jsx(ee, {}) : i ? i.code === "E4011" ? /* @__PURE__ */ e.jsx(ee, {}) : /* @__PURE__ */ e.jsx(
    H,
    {
      status: "500",
      title: "500",
      subTitle: s("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (i == null ? void 0 : i.message) || i })
    }
  ) : o ? r && !d(r) ? /* @__PURE__ */ e.jsx(J, { to: "/forbidden", replace: !0 }) : n && !u(n) ? /* @__PURE__ */ e.jsx(J, { to: "/forbidden", replace: !0 }) : t : (window.location.href = pe("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, st = G(({ token: t, css: r }) => ({
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
})), oe = ({
  overlayClassName: t,
  overlay: r,
  hidden: n,
  children: s,
  ...o
}) => {
  if (n)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: l } = st();
  return /* @__PURE__ */ e.jsx(
    re,
    {
      dropdownRender: r,
      overlayClassName: _(l.container, t),
      ...o,
      children: /* @__PURE__ */ e.jsx("span", { className: l.iconStyle, children: s })
    }
  );
}, nt = () => /* @__PURE__ */ e.jsxs(
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
), rt = G(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), at = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], Mt = ({
  transformLangConfig: t = (n) => n,
  className: r
}) => {
  const { i18n: n } = S(), { styles: s } = rt(), o = (i) => {
    n.changeLanguage(i);
  }, l = {
    selectedKeys: [n.language],
    onClick: (i) => {
      o(i.key);
    },
    items: t(at).map((i) => ({
      key: i.lang,
      className: s.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (i == null ? void 0 : i.label) || "en-US", className: s.menuItemIconStyle, children: (i == null ? void 0 : i.icon) || "🌐" }),
        (i == null ? void 0 : i.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    oe,
    {
      className: r,
      menu: l,
      children: /* @__PURE__ */ e.jsx(nt, {})
    }
  );
}, it = G(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), le = (t) => tt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? $.endsWith("/") ? $ + `files/${t}` : $ + `/files/${t}` : t, ot = ({ src: t, fallback: r, ...n }) => /* @__PURE__ */ e.jsx(je, { src: le(t), icon: r, ...n }), lt = ({ onChange: t, shape: r = "square" }) => {
  const [n, s] = j([]), { styles: o } = it(), [l, i] = j(!1), [d, u] = j(!0), [h, m] = j(0), { run: c, loading: a } = z(() => C.base.listFiles({ current: h + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: f }) => {
      s([...n, ...f]), u(f.length === 40), m(h + 1);
    }
  }), y = () => {
    u(!0), m(0), s([]);
  };
  return /* @__PURE__ */ e.jsx(
    ve,
    {
      style: { zIndex: 1e3 },
      onOpenChange: (f) => {
        i(f), f ? c() : y();
      },
      open: l,
      content: /* @__PURE__ */ e.jsx("div", { style: { width: 360, height: 200 }, children: /* @__PURE__ */ e.jsx(
        "div",
        {
          id: "iconsScrollableDiv",
          style: {
            height: "100%",
            overflow: "auto"
          },
          children: /* @__PURE__ */ e.jsx(
            ue,
            {
              dataLength: n.length,
              next: () => {
                c();
              },
              hasMore: d,
              loader: /* @__PURE__ */ e.jsx(be, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(ae, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                we,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: n,
                  style: { margin: "0 8px" },
                  loading: a,
                  renderItem: ({ id: f }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: o.avatarItem,
                      onClick: (g) => {
                        g.stopPropagation(), t == null || t(f), i(!1), y();
                      },
                      children: /* @__PURE__ */ e.jsx(ot, { shape: r, src: f })
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
        _e,
        {
          shape: r,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, ct = ({ value: t, onChange: r, shape: n, ...s }) => {
  const [o, l] = j(void 0), [i, d] = j(!1), [u, h] = j(void 0), m = async (c) => {
    d(!0), h(c.url ?? c.preview);
  };
  return V(() => {
    l(t ? {
      uid: t,
      name: t,
      url: le(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      de,
      {
        beforeCrop: async (c) => {
          if (c.type === "image/svg+xml") {
            const a = await C.base.uploadFile({ type: "avatar" }, c);
            return a.length > 0 && (r == null || r(a[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          ye,
          {
            customRequest: async (c) => {
              var y, f;
              const a = await C.base.uploadFile({ type: "avatar", access: "public" }, c.file);
              a.length > 0 ? ((y = c.onSuccess) == null || y.call(c, a[0].id), r == null || r(a[0].id)) : (f = c.onError) == null || f.call(c, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: m,
            maxCount: 1,
            onChange: ({ file: c }) => {
              switch (c.status) {
                case "removed":
                  r == null || r(void 0);
                  break;
                case "done":
                  break;
                default:
                  l(c);
                  break;
              }
            },
            fileList: o ? [o] : [],
            ...s,
            children: o ? void 0 : /* @__PURE__ */ e.jsx(lt, { shape: n, onChange: r })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(O, { open: i, footer: null, onCancel: () => d(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: u }) })
  ] });
}, Dt = ({ className: t }) => {
  const { t: r } = S("common"), { user: n } = ne(), { currentOrgId: s, setCurrentOrgId: o } = me(), l = (n == null ? void 0 : n.organizations) || [], i = (m) => {
    o(m), window.location.reload();
  };
  if (l.length === 0)
    return null;
  const d = l.find((m) => m.id === s), u = d ? d.name : r("organization.global", { defaultValue: "Global" }), h = [
    ...l.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        s === m.id && /* @__PURE__ */ e.jsx(Me, {})
      ] }),
      onClick: () => i(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    oe,
    {
      className: t,
      menu: {
        items: h,
        selectedKeys: s ? [s] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(De, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: u })
      ]
    }
  );
}, Et = ({
  onResize: t,
  minWidth: r = 300,
  maxWidth: n = window.innerWidth * 0.5
}) => {
  const [s, o] = j(!1), [l, i] = j(!1), d = N((m) => {
    m.preventDefault(), o(!0);
  }, []), u = N(
    (m) => {
      if (!s) return;
      const c = window.innerWidth - m.clientX, a = Math.max(r, Math.min(n, c));
      t(a);
    },
    [s, r, n, t]
  ), h = N(() => {
    o(!1);
  }, []);
  return V(() => {
    if (s)
      return document.addEventListener("mousemove", u), document.addEventListener("mouseup", h), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", h), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [s, u, h]), /* @__PURE__ */ e.jsx(
    "div",
    {
      onMouseDown: d,
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      style: {
        width: "8px",
        height: "100vh",
        cursor: "col-resize",
        position: "relative",
        flexShrink: 0,
        transition: s ? "none" : "background-color 0.2s ease",
        backgroundColor: s ? "#1890ff" : l ? "#bfbfbf" : "#e8e8e8",
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
            backgroundColor: s || l ? "#fff" : "#999",
            opacity: s || l ? 1 : 0.5,
            transition: "opacity 0.2s ease",
            pointerEvents: "none"
          }
        }
      )
    }
  );
}, ce = ({
  permission: t,
  permissions: r = [],
  checkAll: n = !1,
  fallback: s = null,
  children: o
}) => {
  const { hasPermission: l, hasAnyPermission: i, hasAllPermissions: d, isAdmin: u, loading: h } = K();
  return h ? null : u ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : t ? l(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : r.length > 0 ? (n ? d(r) : i(r)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: o });
}, Rt = ({
  fallback: t = null,
  children: r
}) => {
  const { isAdmin: n, loading: s } = K();
  return s ? null : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: r }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, te = (t) => {
  const [r, n] = j(!1), { permission: s, icon: o, tooltip: l, onClick: i, confirm: d, label: u, ...h } = t, m = i ? async () => {
    n(!0);
    try {
      await i();
    } finally {
      n(!1);
    }
  } : void 0;
  let c = /* @__PURE__ */ e.jsx(
    v,
    {
      type: "text",
      size: "small",
      loading: r,
      icon: o,
      onClick: d ? void 0 : m,
      ...h,
      children: u && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: u })
    }
  );
  if (l && (c = /* @__PURE__ */ e.jsx(Se, { title: l, children: c })), d) {
    const a = async () => {
      d.onConfirm ? d.onConfirm() : m && await m();
    };
    c = /* @__PURE__ */ e.jsx(
      q,
      {
        title: d.title,
        description: d.description,
        onConfirm: a,
        okText: d.okText,
        cancelText: d.cancelText,
        children: c
      }
    );
  }
  return s && (c = /* @__PURE__ */ e.jsx(ce, { permission: s, children: c })), c;
}, Ot = ({ actions: t, maxVisibleItems: r }) => {
  const n = t.filter((i) => !i.hidden);
  if (!r || n.length <= r)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: n.map(({ key: i, ...d }) => /* @__PURE__ */ e.jsx(te, { ...d }, i)) });
  const s = n.slice(0, r - 1), l = n.slice(r - 1).map((i) => {
    const { key: d, label: u, icon: h, permission: m, onClick: c, confirm: a, disabled: y, tooltip: f } = i, I = {
      key: d,
      label: u,
      icon: h,
      disabled: y,
      onClick: async () => {
        a ? O.confirm({
          title: a.title,
          content: a.description,
          onOk: a.onConfirm,
          okText: a.okText,
          cancelText: a.cancelText
        }) : c && await c();
      }
    };
    return m ? {
      ...I,
      label: /* @__PURE__ */ e.jsx(ce, { permission: m, children: /* @__PURE__ */ e.jsx("span", { children: u ?? f }) })
    } : I;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s.map(({ key: i, ...d }) => /* @__PURE__ */ e.jsx(te, { ...d }, i)),
    /* @__PURE__ */ e.jsx(re, { menu: { items: l }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(v, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(Ee, {}) }) })
  ] });
}, dt = Pe, ut = (t) => dt[t], Vt = ({ iconName: t }) => {
  if (!t)
    return null;
  const r = ut(t);
  return r ? /* @__PURE__ */ e.jsx(Ge, { fallback: null, children: /* @__PURE__ */ e.jsx(r, {}) }) : null;
}, Nt = ({ onChange: t }) => {
  const [r, n] = j(""), [s, o] = j("");
  return /* @__PURE__ */ e.jsxs(L.Compact, { children: [
    /* @__PURE__ */ e.jsx(b, { style: { width: "calc(100% - 80px)" }, value: r, onChange: (l) => n(l.target.value) }),
    /* @__PURE__ */ e.jsx(b, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(b, { style: { width: "calc(100% - 80px)" }, value: s, onChange: (l) => o(l.target.value) }),
    /* @__PURE__ */ e.jsx(v, { type: "primary", icon: /* @__PURE__ */ e.jsx(Re, {}), onClick: () => {
      t(r, s);
    } })
  ] });
}, mt = ({ request: t, tableRef: r, ...n }, s) => {
  const [o, l] = j({
    current: 1,
    pageSize: 10
  }), [i, d] = j(0), { data: u, loading: h, refresh: m } = z(async () => {
    const c = await t({
      current: o.current,
      page_size: o.pageSize
    });
    return d(c.total), c.data;
  }, {
    refreshDeps: [o]
  });
  return Xe(s, () => ({
    reload: () => {
      m();
    }
  })), /* @__PURE__ */ e.jsx(
    W,
    {
      rowKey: "id",
      loading: h,
      dataSource: u ?? [],
      pagination: {
        ...o,
        total: i,
        onChange: (c, a) => {
          l({ current: c, pageSize: a });
        }
      },
      ...n,
      ref: r
    }
  );
}, $t = ({ actionRef: t, ...r }) => {
  const [n, s] = j();
  return V(() => {
    s(Je(mt));
  }, []), n ? /* @__PURE__ */ e.jsx(n, { ...r, ref: t }) : null;
}, ht = (t) => {
  var o;
  const { className: r, children: n } = t, s = ((o = r == null ? void 0 : r.match(/language-(\w+)/)) == null ? void 0 : o[1]) || "";
  return typeof n != "string" ? null : s === "mermaid" ? /* @__PURE__ */ e.jsx(Ze, { children: n }) : /* @__PURE__ */ e.jsx(Ye, { lang: s, children: n });
}, Bt = ({
  content: t,
  className: r,
  style: n,
  paragraphTag: s = "div",
  rootClassName: o,
  components: l = { code: ht }
}) => /* @__PURE__ */ e.jsx(
  Qe,
  {
    content: t,
    className: r,
    style: n,
    components: l,
    paragraphTag: s,
    rootClassName: o
  }
), Ut = ({ className: t, onSuccess: r, token: n }) => {
  const { t: s } = S("authorization"), { t: o } = S("common"), [l] = x.useForm(), { run: i, loading: d } = z(async (u) => C.authorization.changePassword(u, n ? { headers: { Authorization: `Bearer ${n}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      w.success(s("user.passwordChanged")), l.resetFields(), r == null || r();
    },
    onError: (u) => {
      if (u instanceof et) {
        const h = u.code ?? "normal";
        w.error(s(`user.passwordChangeFailed.${h}`, { error: u.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        w.error(s("user.passwordChangeFailed.normal", { error: u.message, defaultValue: "Password change failed: {{error}}" }));
      console.error("Failed to change password:", u);
    }
  });
  return /* @__PURE__ */ e.jsxs(
    x,
    {
      form: l,
      layout: "vertical",
      onFinish: i,
      style: { maxWidth: 500, margin: "0 auto" },
      className: _("profile-password", t),
      children: [
        /* @__PURE__ */ e.jsx(
          x.Item,
          {
            name: "old_password",
            label: s("user.oldPassword"),
            rules: [{ required: !0, message: s("validation.oldPasswordRequired") }],
            className: _("profile-password-item", "profile-password-item-old-password"),
            children: /* @__PURE__ */ e.jsx(b.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          x.Item,
          {
            name: "new_password",
            label: s("user.newPassword"),
            rules: [
              { required: !0, message: s("validation.newPasswordRequired") },
              { min: 8, message: s("validation.passwordMinLength") }
            ],
            className: _("profile-password-item", "profile-password-item-new-password"),
            children: /* @__PURE__ */ e.jsx(b.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          x.Item,
          {
            name: "confirm_password",
            label: s("user.confirmPassword"),
            className: _("profile-password-item", "profile-password-item-confirm-password"),
            rules: [
              { required: !0, message: s("validation.confirmPasswordRequired") },
              ({ getFieldValue: u }) => ({
                validator(h, m) {
                  return !m || u("new_password") === m ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(b.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(x.Item, { className: _("profile-password-item", "profile-password-item-submit"), children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: d, children: o("save") }) })
      ]
    }
  );
}, Ht = ({ user: t, onSuccess: r }) => {
  const { t: n } = S("authorization"), { t: s } = S("common"), [o] = x.useForm(), [l, i] = j(!1);
  We.useEffect(() => {
    t && o.setFieldsValue({
      username: t.username,
      email: t.email,
      full_name: t.full_name,
      phone: t.phone || "",
      avatar: t.avatar
    });
  }, [t, o]);
  const d = async (u) => {
    try {
      i(!0), await C.authorization.updateCurrentUser(u), w.success(s("updateSuccess")), r();
    } catch (h) {
      w.error(s("updateFailed")), console.error("Failed to update user information:", h);
    } finally {
      i(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        n("user.roles"),
        ": ",
        t.roles.map((u) => u.name).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(
      x,
      {
        form: o,
        layout: "vertical",
        onFinish: d,
        style: { width: "100%", maxWidth: 500 },
        children: [
          /* @__PURE__ */ e.jsx(
            x.Item,
            {
              style: { marginBottom: 24, textAlign: "center", justifyItems: "center" },
              name: "avatar",
              children: /* @__PURE__ */ e.jsx(ct, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            x.Item,
            {
              name: "username",
              label: n("user.username"),
              children: /* @__PURE__ */ e.jsx(b, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            x.Item,
            {
              name: "email",
              label: n("user.email"),
              rules: [
                { required: !0, message: n("validation.emailRequired") },
                { type: "email", message: n("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(b, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            x.Item,
            {
              name: "full_name",
              label: n("user.fullName"),
              rules: [{ required: !0, message: n("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(b, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            x.Item,
            {
              name: "phone",
              label: n("user.phone"),
              children: /* @__PURE__ */ e.jsx(b, {})
            }
          ),
          /* @__PURE__ */ e.jsx(x.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: l, children: s("save") }) })
        ]
      }
    )
  ] });
}, qt = ({ user: t, onSuccess: r }) => {
  const { t: n } = S("authorization"), { t: s } = S("common"), [o, l] = j(0), [i, d] = j(!1), [u, h] = j(!0), [m, c] = j(""), [a, y] = j("totp"), { run: f, data: g = { secret: "", qr_code: "", token: void 0 } } = z(
    () => C.authorization.enableMfa(a),
    {
      manual: !0,
      onSuccess: () => {
        l(1);
      },
      onBefore: () => {
        d(!0);
      },
      onFinally: () => {
        d(!1);
      }
    }
  ), I = async () => {
    if (!m) {
      w.warning(n("mfa.enterVerificationCode"));
      return;
    }
    const k = {
      code: m,
      mfa_type: a
    };
    "token" in g && (k.token = g.token);
    try {
      d(!0), await C.authorization.verifyAndActivateMfa(k), w.success(n("mfa.enableSuccess")), l(2), r();
    } catch (A) {
      w.error(n("mfa.verificationFailed")), console.error("Failed to verify MFA:", A);
    } finally {
      d(!1);
    }
  }, p = async () => {
    try {
      d(!0), await C.authorization.disableMfa(), w.success(n("mfa.disableSuccess")), r();
    } catch (k) {
      w.error(s("operationFailed")), console.error("Failed to disable MFA:", k);
    } finally {
      d(!1);
    }
  }, F = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        H,
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
                  onOk: p,
                  okButtonProps: { danger: !0 }
                });
              },
              children: n("mfa.disable")
            }
          )
        }
      );
    const k = () => {
      var A;
      switch (o) {
        case 0:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              X,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: n("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: n(a === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                onClick: f,
                loading: i,
                children: n("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              X,
              {
                message: n("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: a === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: a === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(ke, { value: g.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: a === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: a === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              n("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: u ? "*".repeat(((A = g.secret) == null ? void 0 : A.length) ?? 0) : g.secret }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "link",
                  onClick: () => h(!u),
                  icon: u ? /* @__PURE__ */ e.jsx(ie, {}) : /* @__PURE__ */ e.jsx(Ne, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              b,
              {
                placeholder: n("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: m,
                onChange: (D) => c(D.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(L, { children: [
              /* @__PURE__ */ e.jsx(v, { onClick: () => l(0), children: s("previous") }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "primary",
                  onClick: I,
                  loading: i,
                  children: s("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            H,
            {
              status: "success",
              title: n("mfa.setupSuccess"),
              subTitle: n("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(v, { type: "primary", onClick: () => l(0), children: s("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: o === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          Ie,
          {
            defaultValue: "totp",
            onChange: (A) => {
              y(A), l(0);
            },
            value: a,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Oe, {}), label: n("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Ve, {}), label: n("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(ae, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Ce,
        {
          current: o,
          items: [
            { title: n(a === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: n(a === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: n(a === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: n(a === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: n(a === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: n(a === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      k()
    ] });
  };
  return /* @__PURE__ */ e.jsx(E, { title: n("mfa.title"), children: F() });
}, { Text: B } = Fe, Kt = () => {
  const { t } = S("authorization"), { t: r } = S("common"), [n, s] = j(null), [o, l] = j(!1), { data: i = [], loading: d, run: u } = z(() => C.authorization.getUserSessions({}), {
    onError: (a) => {
      w.error(t("session.getSessionsFailed", { error: a, defaultValue: "Failed to get session list: {{error}}" }));
    }
  }), { run: h } = z((a) => C.authorization.terminateSession({ id: a }), {
    onSuccess: () => {
      w.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" })), u();
    },
    onError: (a) => {
      w.error(t("session.terminateFailed", { error: a, defaultValue: "Failed to terminate session: {{error}}" }));
    },
    onFinally: () => {
      s(null);
    },
    onBefore: ([a]) => {
      s(a);
    },
    manual: !0
  }), { run: m } = z(() => C.authorization.terminateOtherSessions(), {
    onSuccess: () => {
      w.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" })), u();
    },
    onError: (a) => {
      w.error(t("session.terminateAllFailed", { error: a, defaultValue: "Failed to terminate all other sessions: {{error}}" }));
    },
    onFinally: () => {
      l(!1);
    },
    onBefore: () => {
      l(!0);
    },
    manual: !0
  }), c = [
    {
      title: t("session.device"),
      dataIndex: "user_agent",
      key: "device",
      render: (a, y) => /* @__PURE__ */ e.jsxs(L, { direction: "vertical", size: 0, children: [
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx($e, {}),
          /* @__PURE__ */ e.jsx(B, { strong: !0, children: a })
        ] }),
        /* @__PURE__ */ e.jsxs(L, { children: [
          /* @__PURE__ */ e.jsx(Be, {}),
          /* @__PURE__ */ e.jsx(B, { type: "secondary", children: y.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (a) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(Ue, {}),
        /* @__PURE__ */ e.jsx("span", { children: a })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (a) => /* @__PURE__ */ e.jsxs(L, { children: [
        /* @__PURE__ */ e.jsx(He, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(a).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (a) => a.is_current ? /* @__PURE__ */ e.jsx(R, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(R, { color: "blue", children: t("session.active") })
    },
    {
      title: r("actions"),
      key: "action",
      render: (a) => a.is_current ? /* @__PURE__ */ e.jsx(B, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        q,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => h(a.id),
          okText: r("confirm"),
          cancelText: r("cancel"),
          children: /* @__PURE__ */ e.jsx(
            v,
            {
              type: "link",
              danger: !0,
              loading: n === a.id,
              children: t("session.terminate")
            }
          )
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsx(
    E,
    {
      title: t("session.title"),
      loading: d,
      extra: /* @__PURE__ */ e.jsxs(L, { children: [
        i.length > 1 && /* @__PURE__ */ e.jsx(
          q,
          {
            title: t("session.confirmTerminateAll"),
            onConfirm: m,
            okText: r("confirm"),
            cancelText: r("cancel"),
            children: /* @__PURE__ */ e.jsx(
              v,
              {
                danger: !0,
                loading: o,
                children: t("session.terminateOthers")
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(v, { onClick: () => u(), loading: d, children: r("refresh") })
      ] }),
      children: !d && i.length === 0 ? /* @__PURE__ */ e.jsx(Le, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        W,
        {
          columns: c,
          dataSource: i,
          rowKey: "id",
          loading: d,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: pt } = Ae, { Option: P } = T, xt = (t) => t || "N/A", gt = (t, r) => t === "success" ? /* @__PURE__ */ e.jsx(R, { color: "success", children: r("statuses.success") }) : /* @__PURE__ */ e.jsx(R, { color: "error", children: r("statuses.failed") }), Wt = ({
  userId: t,
  request: r = (s) => t ? C.authorization.getUserLogs({ id: t, ...s }) : C.authorization.getCurrentUserLogs(s),
  columnsFilter: n = (s) => s
}) => {
  const { t: s } = S("authorization"), { t: o } = S("common"), [l, i] = j({
    current: 1,
    pageSize: 10,
    total: 0
  }), [d, u] = j({}), [h] = x.useForm(), { loading: m, run: c, data: { data: a } = {} } = z(async (p = d, F = 1, k = 10) => r({
    ...p,
    current: F ?? 1,
    page_size: k ?? 10
  }), {
    onError(p) {
      w.error(s("auditLog.fetchFailed", { error: p }));
    },
    onSuccess({ total: p }) {
      i({
        ...l,
        total: p
      });
    }
  });
  V(() => {
    c(d, 1, l.pageSize);
  }, []);
  const y = (p) => {
    i({
      ...l,
      current: p.current,
      pageSize: p.pageSize
    }), c({}, p.current, p.pageSize);
  }, f = (p) => {
    var F, k, A, D;
    c({
      ...p,
      start_time: (k = (F = p.dateRange) == null ? void 0 : F[0]) == null ? void 0 : k.toISOString(),
      end_time: (D = (A = p.dateRange) == null ? void 0 : A[1]) == null ? void 0 : D.toISOString()
    }, 1, l.pageSize);
  }, g = () => {
    h.resetFields(), u({}), i({ ...l, current: 1 }), c({}, 1, l.pageSize);
  }, I = [
    {
      title: s("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (p) => xe(p)
    },
    {
      title: s("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (p, F) => p ? s(`action.${p.replace(":", ".")}`, { defaultValue: F.action_name }) : F.action_name ?? F.action
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
      render: (p) => xt(p)
    },
    {
      title: s("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (p) => gt(p, s)
    },
    {
      title: s("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (p) => /* @__PURE__ */ e.jsx(v, { type: "link", icon: /* @__PURE__ */ e.jsx(ie, {}), onClick: () => {
        O.info({
          title: s("auditLog.details"),
          content: JSON.stringify(p)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(E, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      x,
      {
        form: h,
        layout: "horizontal",
        onFinish: f,
        initialValues: d,
        children: [
          /* @__PURE__ */ e.jsxs(Q, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "search", label: s("auditLog.search"), children: /* @__PURE__ */ e.jsx(b, { placeholder: s("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "action", label: s("auditLog.action"), children: /* @__PURE__ */ e.jsxs(T, { allowClear: !0, placeholder: s("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(P, { value: "login", children: s("actions.login") }),
              /* @__PURE__ */ e.jsx(P, { value: "logout", children: s("actions.logout") }),
              /* @__PURE__ */ e.jsx(P, { value: "password_reset", children: s("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(P, { value: "mfa_change", children: s("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "status", label: s("auditLog.status"), children: /* @__PURE__ */ e.jsxs(T, { allowClear: !0, placeholder: s("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(P, { value: "success", children: s("statuses.success") }),
              /* @__PURE__ */ e.jsx(P, { value: "failed", children: s("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(M, { span: 6, children: /* @__PURE__ */ e.jsx(x.Item, { name: "dateRange", label: s("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(pt, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(Q, { children: /* @__PURE__ */ e.jsx(M, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(L, { children: [
            /* @__PURE__ */ e.jsx(v, { onClick: g, children: o("reset") }),
            /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(qe, {}), children: o("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(E, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        v,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Ke, {}),
          onClick: g,
          style: { marginRight: 8 },
          children: o("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        W,
        {
          rowKey: "id",
          columns: n(I),
          dataSource: a,
          pagination: {
            ...l,
            showSizeChanger: !0,
            showTotal: (p) => o("totalItems", { total: p })
          },
          loading: m,
          onChange: y,
          scroll: { x: "max-content" }
        }
      )
    ] })
  ] });
}, { TextArea: se } = b, { Option: U } = T, Gt = ({
  field: t,
  selectedType: r,
  dependentValues: n,
  formValues: s = {}
}) => {
  const { t: o } = S("system"), { t: l } = S("common"), i = Y(() => ge(t.visible_when, s), [t.visible_when, s]), { options: d, loading: u } = he(
    t.data_source,
    t.options,
    n
  ), h = Y(() => t.data_source && t.data_source.type !== "static" ? d : t.options || [], [t.data_source, t.options, d]), m = h && h.length > 0;
  if (!i)
    return null;
  const c = [
    {
      required: t.required,
      message: o("settings.toolsets.fieldRequired", {
        defaultValue: `Please enter ${t.name}`,
        field: t.name
      })
    }
  ], a = () => o(`settings.toolsets.${r}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), y = () => o(`settings.toolsets.${r}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${l("enter", { defaultValue: "Enter" })} ${t.name}`
  }), f = () => {
    if (t.description)
      return o(`settings.toolsets.${r}.${t.name}Tooltip`, {
        defaultValue: t.description
      });
  };
  if (!i)
    return null;
  if (t.type === "select" || t.data_source)
    return /* @__PURE__ */ e.jsx(
      x.Item,
      {
        name: ["config", t.name],
        label: a(),
        rules: c,
        tooltip: f(),
        children: /* @__PURE__ */ e.jsx(
          T,
          {
            loading: u,
            allowClear: !0,
            placeholder: y(),
            showSearch: !0,
            filterOption: (g, I) => {
              var p;
              return (p = I == null ? void 0 : I.children) == null ? void 0 : p.toLowerCase().includes(g.toLowerCase());
            },
            children: h.map((g) => /* @__PURE__ */ e.jsx(U, { value: g.value, children: g.label }, g.value))
          }
        )
      },
      t.name
    );
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: c,
          children: /* @__PURE__ */ e.jsx(se, { placeholder: y(), rows: 4 })
        },
        t.name
      );
    case "string":
      return m ? /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: c,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(T, { allowClear: !0, placeholder: y(), children: h.map((g) => /* @__PURE__ */ e.jsx(U, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: c,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(b, { placeholder: y() })
        },
        t.name
      );
    case "password":
      return /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: c,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(b.Password, { placeholder: y(), autoComplete: "new-password" })
        },
        t.name
      );
    case "number":
      return m ? /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: c,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(T, { allowClear: !0, placeholder: y(), children: h.map((g) => /* @__PURE__ */ e.jsx(U, { value: g.value, children: g.label }, g.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: c,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(ze, { style: { width: "100%" }, placeholder: y() })
        },
        t.name
      );
    case "boolean":
      return /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          valuePropName: "checked",
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(Te, {})
        },
        t.name
      );
    case "array":
      return m ? /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: c,
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(Z.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(L, { direction: "vertical", children: h.map((g) => /* @__PURE__ */ e.jsx(Z, { value: g.value, children: g.label }, g.value)) }) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: c,
          tooltip: f(),
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
        x.Item,
        {
          name: ["config", t.name],
          label: a(),
          rules: [
            ...c,
            {
              validator: (g, I) => {
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
          tooltip: f(),
          children: /* @__PURE__ */ e.jsx(
            se,
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
  ot as A,
  ht as C,
  Vt as D,
  oe as H,
  ee as L,
  Bt as M,
  Dt as O,
  _t as P,
  Et as R,
  $t as T,
  Wt as U,
  Mt as a,
  Ot as b,
  ct as c,
  Nt as d,
  at as e,
  ce as f,
  ut as g,
  Rt as h,
  Ut as i,
  Ht as j,
  qt as k,
  Kt as l,
  Gt as m
};
