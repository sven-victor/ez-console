import { j as e, I as he } from "./vendor.js";
import { Navigate as J } from "react-router-dom";
import { a as se, b as K, c as pe, u as V, d as xe } from "./contexts.js";
import { g as ge, f as fe, c as je } from "./base.js";
import { Spin as ye, Result as H, Dropdown as ne, Avatar as ve, Upload as be, Modal as M, Popover as we, List as Se, Divider as ae, Skeleton as Ie, Tooltip as re, FloatButton as Ce, Button as v, Popconfirm as W, Space as A, Input as S, Table as G, Form as g, message as b, Card as E, Segmented as ke, Steps as Fe, Alert as Q, QRCode as Le, Typography as Ae, Tag as O, Empty as ze, Row as X, Col as _, Select as z, DatePicker as Te, Checkbox as Z, Switch as Pe, InputNumber as _e } from "antd";
import { useTranslation as w } from "react-i18next";
import { createStyles as $ } from "antd-style";
import * as Me from "@ant-design/icons";
import { UploadOutlined as De, CheckOutlined as Re, TeamOutlined as Ve, RobotOutlined as Ee, MoreOutlined as Oe, PlusOutlined as $e, ClockCircleFilled as Be, MailOutlined as Ne, EyeOutlined as ie, EyeInvisibleOutlined as Ue, LaptopOutlined as qe, EnvironmentOutlined as He, GlobalOutlined as We, ClockCircleOutlined as Ke, SearchOutlined as Ge, ReloadOutlined as Je } from "@ant-design/icons";
import oe from "classnames";
import Qe, { useState as j, useEffect as T, useCallback as B, lazy as Xe, Suspense as Ze, forwardRef as Ye, useImperativeHandle as et, useMemo as Y } from "react";
import { a as C, w as le } from "./index.js";
import { useRequest as D } from "ahooks";
import { b as N, A as tt } from "./client.js";
import st from "antd-img-crop";
import { isString as nt } from "lodash";
const at = () => /* @__PURE__ */ e.jsx("div", { style: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
}, children: /* @__PURE__ */ e.jsx(ye, { size: "large" }) }), Rt = ({
  element: t,
  requiredPermission: n,
  requiredPermissions: s
}) => {
  const { t: a } = w(), { user: o, loading: r, error: u } = se(), { hasPermission: i, hasAllPermissions: h } = K();
  return r ? /* @__PURE__ */ e.jsx(at, {}) : u ? /* @__PURE__ */ e.jsx(
    H,
    {
      status: "500",
      title: "500",
      subTitle: a("login.fetchCurrentUserError", { defaultValue: "Failed to fetch current user: {{error}}", error: (u == null ? void 0 : u.message) || u })
    }
  ) : o ? n && !i(n) ? /* @__PURE__ */ e.jsx(J, { to: "/forbidden", replace: !0 }) : s && !h(s) ? /* @__PURE__ */ e.jsx(J, { to: "/forbidden", replace: !0 }) : t : (window.location.href = ge("/login?redirect=" + encodeURIComponent(window.location.href)), null);
}, rt = $(({ token: t, css: n }) => ({
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
})), ce = ({
  overlayClassName: t,
  overlay: n,
  hidden: s,
  children: a,
  ...o
}) => {
  if (s)
    return /* @__PURE__ */ e.jsx(e.Fragment, {});
  const { styles: r } = rt();
  return /* @__PURE__ */ e.jsx(
    ne,
    {
      dropdownRender: n,
      overlayClassName: oe(r.container, t),
      ...o,
      children: /* @__PURE__ */ e.jsx("span", { className: r.iconStyle, children: a })
    }
  );
}, it = () => /* @__PURE__ */ e.jsxs(
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
), ot = $(() => ({
  menuItemStyle: {
    minWidth: "160px"
  },
  menuItemIconStyle: {
    marginRight: "8px"
  }
})), lt = [
  { lang: "en-US", label: "English", icon: "🇺🇸" },
  { lang: "sv-SE", label: "Svenska", icon: "🇸🇪" },
  { lang: "ar-AE", label: "العربية", icon: "🇦🇪" },
  { lang: "de-DE", label: "Deutsch", icon: "🇩🇪" },
  { lang: "es-ES", label: "Español", icon: "🇪🇸" },
  { lang: "fr-FR", label: "Français", icon: "🇫🇷" },
  { lang: "zh-CN", label: "中文", icon: "🇨🇳" }
], Vt = ({
  transformLangConfig: t = (n) => n
}) => {
  const { i18n: n } = w(), { styles: s } = ot(), a = (r) => {
    n.changeLanguage(r);
  }, o = {
    selectedKeys: [n.language],
    onClick: (r) => {
      a(r.key);
    },
    items: t(lt).map((r) => ({
      key: r.lang,
      className: s.menuItemStyle,
      label: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("span", { role: "img", "aria-label": (r == null ? void 0 : r.label) || "en-US", className: s.menuItemIconStyle, children: (r == null ? void 0 : r.icon) || "🌐" }),
        (r == null ? void 0 : r.label) || "en-US"
      ] })
    }))
  };
  return /* @__PURE__ */ e.jsx(
    ce,
    {
      menu: o,
      children: /* @__PURE__ */ e.jsx(it, {})
    }
  );
}, ct = $(({ css: t }) => ({
  avatarItem: t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `
})), de = (t) => nt(t) && t.match(/^[-_a-zA-Z0-9]+$/) ? N.endsWith("/") ? N + `files/${t}` : N + `/files/${t}` : t, dt = ({ src: t, fallback: n, ...s }) => /* @__PURE__ */ e.jsx(ve, { src: de(t), icon: n, ...s }), ut = ({ onChange: t, shape: n = "square" }) => {
  const [s, a] = j([]), { styles: o } = ct(), [r, u] = j(!1), [i, h] = j(!0), [m, f] = j(0), { run: l, loading: c } = D(() => C.base.listFiles({ current: m + 1, page_size: 40, file_type: "avatar", access: "public", search: "" }), {
    manual: !0,
    onSuccess: ({ data: d }) => {
      a([...s, ...d]), h(d.length === 40), f(m + 1);
    }
  }), y = () => {
    h(!0), f(0), a([]);
  };
  return /* @__PURE__ */ e.jsx(
    we,
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
            he,
            {
              dataLength: s.length,
              next: () => {
                l();
              },
              hasMore: i,
              loader: /* @__PURE__ */ e.jsx(Ie, { avatar: !0, paragraph: { rows: 1 }, active: !0 }),
              endMessage: /* @__PURE__ */ e.jsx(ae, { plain: !0, children: "End" }),
              scrollableTarget: "iconsScrollableDiv",
              children: /* @__PURE__ */ e.jsx(
                Se,
                {
                  grid: { gutter: 16, column: 8 },
                  dataSource: s,
                  style: { margin: "0 8px" },
                  loading: c,
                  renderItem: ({ id: d }) => /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      className: o.avatarItem,
                      onClick: (p) => {
                        p.stopPropagation(), t == null || t(d), u(!1), y();
                      },
                      children: /* @__PURE__ */ e.jsx(dt, { shape: n, src: d })
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
        De,
        {
          shape: n,
          style: { width: 112, height: 112, placeContent: "center" }
        }
      )
    }
  );
}, mt = ({ value: t, onChange: n, shape: s, ...a }) => {
  const [o, r] = j(void 0), [u, i] = j(!1), [h, m] = j(void 0), f = async (l) => {
    i(!0), m(l.url ?? l.preview);
  };
  return T(() => {
    r(t ? {
      uid: t,
      name: t,
      url: de(t)
    } : void 0);
  }, [t]), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      st,
      {
        beforeCrop: async (l) => {
          if (l.type === "image/svg+xml") {
            const c = await C.base.uploadFile({ type: "avatar" }, l);
            return c.length > 0 && (n == null || n(c[0].id)), !1;
          }
          return !0;
        },
        children: /* @__PURE__ */ e.jsx(
          be,
          {
            customRequest: async (l) => {
              var y, d;
              const c = await C.base.uploadFile({ type: "avatar", access: "public" }, l.file);
              c.length > 0 ? ((y = l.onSuccess) == null || y.call(l, c[0].id), n == null || n(c[0].id)) : (d = l.onError) == null || d.call(l, new Error("Upload file failed"));
            },
            listType: "picture-card",
            onPreview: f,
            maxCount: 1,
            onChange: ({ file: l }) => {
              switch (l.status) {
                case "removed":
                  n == null || n(void 0);
                  break;
                case "done":
                  break;
                default:
                  r(l);
                  break;
              }
            },
            fileList: o ? [o] : [],
            ...a,
            children: o ? void 0 : /* @__PURE__ */ e.jsx(ut, { shape: s, onChange: n })
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(M, { open: u, footer: null, onCancel: () => i(!1), children: /* @__PURE__ */ e.jsx("img", { style: { width: "100%" }, src: h }) })
  ] });
}, Et = () => {
  const { t } = w("common"), { user: n } = se(), { currentOrgId: s, setCurrentOrgId: a } = pe(), o = (n == null ? void 0 : n.organizations) || [], r = (m) => {
    a(m), window.location.reload();
  };
  if (o.length === 0)
    return null;
  const u = o.find((m) => m.id === s), i = u ? u.name : t("organization.global", { defaultValue: "Global" }), h = [
    ...o.map((m) => ({
      key: m.id,
      label: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: m.name }),
        s === m.id && /* @__PURE__ */ e.jsx(Re, {})
      ] }),
      onClick: () => r(m.id)
    }))
  ];
  return /* @__PURE__ */ e.jsxs(
    ce,
    {
      menu: {
        items: h,
        selectedKeys: s ? [s] : [""]
      },
      children: [
        /* @__PURE__ */ e.jsx(Ve, { style: { marginRight: 4 } }),
        /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: i })
      ]
    }
  );
}, ht = ({
  onResize: t,
  minWidth: n = 300,
  maxWidth: s = window.innerWidth * 0.5
}) => {
  const [a, o] = j(!1), [r, u] = j(!1), i = B((f) => {
    f.preventDefault(), o(!0);
  }, []), h = B(
    (f) => {
      if (!a) return;
      const l = window.innerWidth - f.clientX, c = Math.max(n, Math.min(s, l));
      t(c);
    },
    [a, n, s, t]
  ), m = B(() => {
    o(!1);
  }, []);
  return T(() => {
    if (a)
      return document.addEventListener("mousemove", h), document.addEventListener("mouseup", m), document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", m), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
  }, [a, h, m]), /* @__PURE__ */ e.jsx(
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
}, ue = Xe(() => import("./ai-chat.js")), pt = $(({ token: t, css: n }) => ({
  siderLayout: n`
      position: relative;
      height: 100vh;
    `,
  floatSiderLayout: n`
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
})), Ot = () => {
  const { visible: t, setVisible: n, setLoaded: s } = V();
  return T(() => {
    s(!0);
  }, [s]), /* @__PURE__ */ e.jsx(
    M,
    {
      width: 1200,
      open: t,
      closable: !1,
      onCancel: () => n(!1),
      footer: null,
      children: le(ue)
    }
  );
}, $t = () => {
  const { styles: t } = pt(), { layout: n, visible: s } = V(), [a, o] = j(() => {
    const i = localStorage.getItem("ai-sidebar-width");
    return i ? parseInt(i, 10) : 400;
  }), { setLoaded: r } = V();
  T(() => {
    r(!0);
  }, [r]), T(() => {
    localStorage.setItem("ai-sidebar-width", a.toString());
  }, [a]);
  const u = (i) => {
    o(i);
  };
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs(
    "div",
    {
      style: {
        width: `${a}px`,
        display: s ? "flex" : "none",
        overflow: "hidden",
        flexShrink: 0
      },
      className: oe("ai-sidebar-layout", n === "float-sidebar" ? t.floatSiderLayout : t.siderLayout),
      children: [
        /* @__PURE__ */ e.jsx(
          ht,
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
              borderRadius: n === "float-sidebar" ? "12px" : "0"
            },
            children: /* @__PURE__ */ e.jsx("div", { children: le(ue) })
          }
        )
      ]
    }
  ) });
}, Bt = () => {
  const { setVisible: t, visible: n } = V(), { t: s } = w("ai");
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    re,
    {
      title: s("chat.openAssistant", { defaultValue: "Open AI Assistant" }),
      placement: "left",
      style: { display: n ? "none" : "block" },
      children: /* @__PURE__ */ e.jsx(
        Ce,
        {
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          type: "primary",
          onClick: () => t(!0),
          style: {
            right: 24,
            bottom: 24,
            display: n ? "none" : "block"
          }
        }
      )
    }
  ) });
}, me = ({
  permission: t,
  permissions: n = [],
  checkAll: s = !1,
  fallback: a = null,
  children: o
}) => {
  const { hasPermission: r, hasAnyPermission: u, hasAllPermissions: i, isAdmin: h, loading: m } = K();
  return m ? null : h ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : t ? r(t) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : n.length > 0 ? (s ? i(n) : u(n)) ? /* @__PURE__ */ e.jsx(e.Fragment, { children: o }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: a }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: o });
}, Nt = ({
  fallback: t = null,
  children: n
}) => {
  const { isAdmin: s, loading: a } = K();
  return a ? null : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: n }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t });
}, ee = (t) => {
  const [n, s] = j(!1), { permission: a, icon: o, tooltip: r, onClick: u, confirm: i, label: h, ...m } = t, f = u ? async () => {
    s(!0);
    try {
      await u();
    } finally {
      s(!1);
    }
  } : void 0;
  let l = /* @__PURE__ */ e.jsx(
    v,
    {
      type: "text",
      size: "small",
      loading: n,
      icon: o,
      onClick: i ? void 0 : f,
      ...m,
      children: h && /* @__PURE__ */ e.jsx("span", { style: { position: "inherit", top: "-2px" }, children: h })
    }
  );
  if (r && (l = /* @__PURE__ */ e.jsx(re, { title: r, children: l })), i) {
    const c = async () => {
      i.onConfirm ? i.onConfirm() : f && await f();
    };
    l = /* @__PURE__ */ e.jsx(
      W,
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
  return a && (l = /* @__PURE__ */ e.jsx(me, { permission: a, children: l })), l;
}, Ut = ({ actions: t, maxVisibleItems: n }) => {
  const s = t.filter((u) => !u.hidden);
  if (!n || s.length <= n)
    return /* @__PURE__ */ e.jsx(e.Fragment, { children: s.map(({ key: u, ...i }) => /* @__PURE__ */ e.jsx(ee, { ...i }, u)) });
  const a = s.slice(0, n - 1), r = s.slice(n - 1).map((u) => {
    const { key: i, label: h, icon: m, permission: f, onClick: l, confirm: c, disabled: y, tooltip: d } = u, I = {
      key: i,
      label: h,
      icon: m,
      disabled: y,
      onClick: async () => {
        c ? M.confirm({
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
      label: /* @__PURE__ */ e.jsx(me, { permission: f, children: /* @__PURE__ */ e.jsx("span", { children: h ?? d }) })
    } : I;
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    a.map(({ key: u, ...i }) => /* @__PURE__ */ e.jsx(ee, { ...i }, u)),
    /* @__PURE__ */ e.jsx(ne, { menu: { items: r }, trigger: ["click"], children: /* @__PURE__ */ e.jsx(v, { type: "text", size: "small", icon: /* @__PURE__ */ e.jsx(Oe, {}) }) })
  ] });
}, xt = Me, gt = (t) => xt[t], qt = ({ iconName: t }) => {
  if (!t)
    return null;
  const n = gt(t);
  return n ? /* @__PURE__ */ e.jsx(Ze, { fallback: null, children: /* @__PURE__ */ e.jsx(n, {}) }) : null;
}, Ht = ({ onChange: t }) => {
  const [n, s] = j(""), [a, o] = j("");
  return /* @__PURE__ */ e.jsxs(A.Compact, { children: [
    /* @__PURE__ */ e.jsx(S, { style: { width: "calc(100% - 80px)" }, value: n, onChange: (r) => s(r.target.value) }),
    /* @__PURE__ */ e.jsx(S, { style: { width: "40px" }, readOnly: !0, value: "=", tabIndex: -1 }),
    /* @__PURE__ */ e.jsx(S, { style: { width: "calc(100% - 80px)" }, value: a, onChange: (r) => o(r.target.value) }),
    /* @__PURE__ */ e.jsx(v, { type: "primary", icon: /* @__PURE__ */ e.jsx($e, {}), onClick: () => {
      t(n, a);
    } })
  ] });
}, ft = ({ request: t, tableRef: n, ...s }, a) => {
  const [o, r] = j({
    current: 1,
    pageSize: 10
  }), [u, i] = j(0), { data: h, loading: m, refresh: f } = D(async () => {
    const l = await t({
      current: o.current,
      page_size: o.pageSize
    });
    return i(l.total), l.data;
  }, {
    refreshDeps: [o]
  });
  return et(a, () => ({
    reload: () => {
      f();
    }
  })), /* @__PURE__ */ e.jsx(
    G,
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
      ...s,
      ref: n
    }
  );
}, Wt = ({ actionRef: t, ...n }) => {
  const [s, a] = j();
  return T(() => {
    a(Ye(ft));
  }, []), s ? /* @__PURE__ */ e.jsx(s, { ...n, ref: t }) : null;
}, Kt = ({ onSuccess: t, token: n }) => {
  const { t: s } = w("authorization"), { t: a } = w("common"), [o] = g.useForm(), { run: r, loading: u } = D(async (i) => C.authorization.changePassword(i, n ? { headers: { Authorization: `Bearer ${n}` } } : {}), {
    manual: !0,
    onSuccess: () => {
      b.success(s("user.passwordChanged")), o.resetFields(), t == null || t();
    },
    onError: (i) => {
      if (i instanceof tt) {
        const h = i.code ?? "normal";
        b.error(s(`user.passwordChangeFailed.${h}`, { error: i.message, defaultValue: "Password change failed: {{error}}" }));
      } else
        b.error(s("user.passwordChangeFailed.normal", { error: i.message, defaultValue: "Password change failed: {{error}}" }));
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
            label: s("user.oldPassword"),
            rules: [{ required: !0, message: s("validation.oldPasswordRequired") }],
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          g.Item,
          {
            name: "new_password",
            label: s("user.newPassword"),
            rules: [
              { required: !0, message: s("validation.newPasswordRequired") },
              { min: 8, message: s("validation.passwordMinLength") }
            ],
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          g.Item,
          {
            name: "confirm_password",
            label: s("user.confirmPassword"),
            rules: [
              { required: !0, message: s("validation.confirmPasswordRequired") },
              ({ getFieldValue: i }) => ({
                validator(h, m) {
                  return !m || i("new_password") === m ? Promise.resolve() : Promise.reject(new Error(s("validation.passwordMismatch")));
                }
              })
            ],
            children: /* @__PURE__ */ e.jsx(S.Password, {})
          }
        ),
        /* @__PURE__ */ e.jsx(g.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: u, children: a("save") }) })
      ]
    }
  );
}, Gt = ({ user: t, onSuccess: n }) => {
  const { t: s } = w("authorization"), { t: a } = w("common"), [o] = g.useForm(), [r, u] = j(!1);
  Qe.useEffect(() => {
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
      u(!0), await C.authorization.updateCurrentUser(h), b.success(a("updateSuccess")), n();
    } catch (m) {
      b.error(a("updateFailed")), console.error("Failed to update user information:", m);
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 24, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("h2", { children: (t == null ? void 0 : t.full_name) || (t == null ? void 0 : t.username) }),
      (t == null ? void 0 : t.roles) && t.roles.length > 0 && /* @__PURE__ */ e.jsxs("div", { children: [
        s("user.roles"),
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
              children: /* @__PURE__ */ e.jsx(mt, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              name: "username",
              label: s("user.username"),
              children: /* @__PURE__ */ e.jsx(S, { disabled: !0 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              name: "email",
              label: s("user.email"),
              rules: [
                { required: !0, message: s("validation.emailRequired") },
                { type: "email", message: s("validation.emailInvalid") }
              ],
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              name: "full_name",
              label: s("user.fullName"),
              rules: [{ required: !0, message: s("validation.fullNameRequired") }],
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            g.Item,
            {
              name: "phone",
              label: s("user.phone"),
              children: /* @__PURE__ */ e.jsx(S, {})
            }
          ),
          /* @__PURE__ */ e.jsx(g.Item, { children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: r, children: a("save") }) })
        ]
      }
    )
  ] });
}, Jt = ({ user: t, onSuccess: n }) => {
  const { t: s } = w("authorization"), { t: a } = w("common"), [o, r] = j(0), [u, i] = j(!1), [h, m] = j(!0), [f, l] = j(""), [c, y] = j("totp"), { run: d, data: p = { secret: "", qr_code: "", token: void 0 } } = D(
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
      b.warning(s("mfa.enterVerificationCode"));
      return;
    }
    const k = {
      code: f,
      mfa_type: c
    };
    "token" in p && (k.token = p.token);
    try {
      i(!0), await C.authorization.verifyAndActivateMfa(k), b.success(s("mfa.enableSuccess")), r(2), n();
    } catch (L) {
      b.error(s("mfa.verificationFailed")), console.error("Failed to verify MFA:", L);
    } finally {
      i(!1);
    }
  }, x = async () => {
    try {
      i(!0), await C.authorization.disableMfa(), b.success(s("mfa.disableSuccess")), n();
    } catch (k) {
      b.error(a("operationFailed")), console.error("Failed to disable MFA:", k);
    } finally {
      i(!1);
    }
  }, F = () => {
    if (!t) return null;
    if (t.mfa_enabled)
      return /* @__PURE__ */ e.jsx(
        H,
        {
          status: "success",
          title: s("mfa.enabled"),
          subTitle: s("mfa.enabledDescription"),
          extra: /* @__PURE__ */ e.jsx(
            v,
            {
              danger: !0,
              onClick: () => {
                M.confirm({
                  title: s("mfa.confirmDisable"),
                  content: s("mfa.disableWarning"),
                  onOk: x,
                  okButtonProps: { danger: !0 }
                });
              },
              children: s("mfa.disable")
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
              Q,
              {
                message: /* @__PURE__ */ e.jsxs("div", { children: [
                  /* @__PURE__ */ e.jsx("p", { children: s("mfa.setupInfo") }),
                  /* @__PURE__ */ e.jsx("p", { children: s(c === "totp" ? "mfa.totpDescription" : "mfa.emailDescription") })
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
                children: s("mfa.startSetup")
              }
            )
          ] });
        case 1:
          return /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
            /* @__PURE__ */ e.jsx(
              Q,
              {
                message: s("mfa.scanQrCode"),
                type: "info",
                showIcon: !0,
                style: { marginBottom: 20, display: c === "totp" ? "block" : "none" }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { display: c === "totp" ? "flex" : "none", justifyContent: "center", marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(Le, { value: p.qr_code ?? "", size: 200 }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: c === "email" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("user.email"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: t == null ? void 0 : t.email })
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16, display: c === "totp" ? "block" : "none" }, children: /* @__PURE__ */ e.jsxs("p", { children: [
              s("mfa.secretKey"),
              ": ",
              /* @__PURE__ */ e.jsx("strong", { children: h ? "*".repeat(((L = p.secret) == null ? void 0 : L.length) ?? 0) : p.secret }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "link",
                  onClick: () => m(!h),
                  icon: h ? /* @__PURE__ */ e.jsx(ie, {}) : /* @__PURE__ */ e.jsx(Ue, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 24 }, children: /* @__PURE__ */ e.jsx(
              S,
              {
                placeholder: s("mfa.enterCode"),
                style: { width: 200 },
                maxLength: 6,
                value: f,
                onChange: (R) => l(R.target.value)
              }
            ) }),
            /* @__PURE__ */ e.jsxs(A, { children: [
              /* @__PURE__ */ e.jsx(v, { onClick: () => r(0), children: a("previous") }),
              /* @__PURE__ */ e.jsx(
                v,
                {
                  type: "primary",
                  onClick: I,
                  loading: u,
                  children: a("verify")
                }
              )
            ] })
          ] });
        case 2:
          return /* @__PURE__ */ e.jsx(
            H,
            {
              status: "success",
              title: s("mfa.setupSuccess"),
              subTitle: s("mfa.setupSuccessDescription"),
              extra: /* @__PURE__ */ e.jsx(v, { type: "primary", onClick: () => r(0), children: a("done") })
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: o === 2 ? "none" : "unset" }, children: [
        /* @__PURE__ */ e.jsx(
          ke,
          {
            defaultValue: "totp",
            onChange: (L) => {
              y(L), r(0);
            },
            value: c,
            options: [
              { value: "totp", icon: /* @__PURE__ */ e.jsx(Be, {}), label: s("mfa.totp", { defaultValue: "TOTP" }) },
              { value: "email", icon: /* @__PURE__ */ e.jsx(Ne, {}), label: s("mfa.email", { defaultValue: "E-Mail" }) }
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(ae, {})
      ] }),
      /* @__PURE__ */ e.jsx(
        Fe,
        {
          current: o,
          items: [
            { title: s(c === "totp" ? "mfa.totpStep1" : "mfa.emailStep1"), description: s(c === "totp" ? "mfa.totpStep1Description" : "mfa.emailStep1Description") },
            { title: s(c === "totp" ? "mfa.totpStep2" : "mfa.emailStep2"), description: s(c === "totp" ? "mfa.totpStep2Description" : "mfa.emailStep2Description") },
            { title: s(c === "totp" ? "mfa.totpStep3" : "mfa.emailStep3"), description: s(c === "totp" ? "mfa.totpStep3Description" : "mfa.emailStep3Description") }
          ],
          style: { marginBottom: 30 }
        }
      ),
      k()
    ] });
  };
  return /* @__PURE__ */ e.jsx(E, { title: s("mfa.title"), children: F() });
}, { Text: U } = Ae, Qt = () => {
  const { t } = w("authorization"), { t: n } = w("common"), [s, a] = j([]), [o, r] = j(!1), [u, i] = j(null), [h, m] = j(!1), f = async () => {
    try {
      r(!0);
      const d = await C.authorization.getUserSessions({});
      a(d);
    } catch (d) {
      b.error(t("session.getSessionsFailed", { error: d, defaultValue: "Failed to get session list: {{error}}" }));
    } finally {
      r(!1);
    }
  };
  T(() => {
    f();
  }, []);
  const l = async (d) => {
    try {
      i(d), await C.authorization.terminateSession({ id: d }), a(s.filter((p) => p.id !== d)), b.success(t("session.terminateSuccess", { defaultValue: "Session terminated successfully" }));
    } catch (p) {
      b.error(t("session.terminateFailed", { error: p, defaultValue: "Failed to terminate session: {{error}}" }));
    } finally {
      i(null);
    }
  }, c = async () => {
    try {
      m(!0), await C.authorization.terminateOtherSessions(), a(s.filter((d) => d.is_current)), b.success(t("session.terminateAllSuccess", { defaultValue: "All other sessions terminated successfully" }));
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
          /* @__PURE__ */ e.jsx(qe, {}),
          /* @__PURE__ */ e.jsx(U, { strong: !0, children: d })
        ] }),
        /* @__PURE__ */ e.jsxs(A, { children: [
          /* @__PURE__ */ e.jsx(He, {}),
          /* @__PURE__ */ e.jsx(U, { type: "secondary", children: p.location })
        ] })
      ] })
    },
    {
      title: t("session.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (d) => /* @__PURE__ */ e.jsxs(A, { children: [
        /* @__PURE__ */ e.jsx(We, {}),
        /* @__PURE__ */ e.jsx("span", { children: d })
      ] })
    },
    {
      title: t("session.lastActive"),
      dataIndex: "last_active_at",
      key: "last_active",
      render: (d) => /* @__PURE__ */ e.jsxs(A, { children: [
        /* @__PURE__ */ e.jsx(Ke, {}),
        /* @__PURE__ */ e.jsx("span", { children: new Date(d).toLocaleString() })
      ] })
    },
    {
      title: t("session.status"),
      key: "status",
      render: (d) => d.is_current ? /* @__PURE__ */ e.jsx(O, { color: "green", children: t("session.current") }) : /* @__PURE__ */ e.jsx(O, { color: "blue", children: t("session.active") })
    },
    {
      title: n("actions"),
      key: "action",
      render: (d) => d.is_current ? /* @__PURE__ */ e.jsx(U, { type: "secondary", children: t("session.currentSession") }) : /* @__PURE__ */ e.jsx(
        W,
        {
          title: t("session.confirmTerminate"),
          onConfirm: () => l(d.id),
          okText: n("confirm"),
          cancelText: n("cancel"),
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
    E,
    {
      title: t("session.title"),
      extra: s.length > 1 && /* @__PURE__ */ e.jsx(
        W,
        {
          title: t("session.confirmTerminateAll"),
          onConfirm: c,
          okText: n("confirm"),
          cancelText: n("cancel"),
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
      children: s.length === 0 ? /* @__PURE__ */ e.jsx(ze, { description: t("session.noSessions") }) : /* @__PURE__ */ e.jsx(
        G,
        {
          columns: y,
          dataSource: s,
          rowKey: "id",
          loading: o,
          pagination: !1
        }
      )
    }
  );
}, { RangePicker: jt } = Te, { Option: P } = z, yt = (t) => t || "N/A", vt = (t, n) => t === "success" ? /* @__PURE__ */ e.jsx(O, { color: "success", children: n("statuses.success") }) : /* @__PURE__ */ e.jsx(O, { color: "error", children: n("statuses.failed") }), Xt = ({
  userId: t,
  request: n = (a) => t ? C.authorization.getUserLogs({ id: t, ...a }) : C.authorization.getCurrentUserLogs(a),
  columnsFilter: s = (a) => a
}) => {
  const { t: a } = w("authorization"), { t: o } = w("common"), [r, u] = j({
    current: 1,
    pageSize: 10,
    total: 0
  }), [i, h] = j({}), [m] = g.useForm(), { loading: f, run: l, data: { data: c } = {} } = D(async (x = i, F = 1, k = 10) => n({
    ...x,
    current: F ?? 1,
    page_size: k ?? 10
  }), {
    onError(x) {
      b.error(a("auditLog.fetchFailed", { error: x }));
    },
    onSuccess({ total: x }) {
      u({
        ...r,
        total: x
      });
    }
  });
  T(() => {
    l(i, 1, r.pageSize);
  }, []);
  const y = (x) => {
    u({
      ...r,
      current: x.current,
      pageSize: x.pageSize
    }), l({}, x.current, x.pageSize);
  }, d = (x) => {
    var F, k, L, R;
    l({
      ...x,
      start_time: (k = (F = x.dateRange) == null ? void 0 : F[0]) == null ? void 0 : k.toISOString(),
      end_time: (R = (L = x.dateRange) == null ? void 0 : L[1]) == null ? void 0 : R.toISOString()
    }, 1, r.pageSize);
  }, p = () => {
    m.resetFields(), h({}), u({ ...r, current: 1 }), l({}, 1, r.pageSize);
  }, I = [
    {
      title: a("auditLog.timestamp"),
      dataIndex: "timestamp",
      key: "timestamp",
      render: (x) => fe(x)
    },
    {
      title: a("auditLog.action"),
      dataIndex: "action",
      key: "action",
      render: (x, F) => x ? a(`action.${x.replace(":", ".")}`, { defaultValue: F.action_name }) : F.action_name ?? F.action
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
      render: (x) => yt(x)
    },
    {
      title: a("auditLog.status"),
      dataIndex: "status",
      key: "status",
      render: (x) => vt(x, a)
    },
    {
      title: a("auditLog.details"),
      dataIndex: "details",
      key: "details",
      render: (x) => /* @__PURE__ */ e.jsx(v, { type: "link", icon: /* @__PURE__ */ e.jsx(ie, {}), onClick: () => {
        M.info({
          title: a("auditLog.details"),
          content: JSON.stringify(x)
        });
      } })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(E, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      g,
      {
        form: m,
        layout: "horizontal",
        onFinish: d,
        initialValues: i,
        children: [
          /* @__PURE__ */ e.jsxs(X, { gutter: 24, children: [
            /* @__PURE__ */ e.jsx(_, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "search", label: a("auditLog.search"), children: /* @__PURE__ */ e.jsx(S, { placeholder: a("auditLog.searchPlaceholder") }) }) }),
            /* @__PURE__ */ e.jsx(_, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "action", label: a("auditLog.action"), children: /* @__PURE__ */ e.jsxs(z, { allowClear: !0, placeholder: a("auditLog.selectAction"), children: [
              /* @__PURE__ */ e.jsx(P, { value: "login", children: a("actions.login") }),
              /* @__PURE__ */ e.jsx(P, { value: "logout", children: a("actions.logout") }),
              /* @__PURE__ */ e.jsx(P, { value: "password_reset", children: a("actions.passwordReset") }),
              /* @__PURE__ */ e.jsx(P, { value: "mfa_change", children: a("actions.mfaChange") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(_, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "status", label: a("auditLog.status"), children: /* @__PURE__ */ e.jsxs(z, { allowClear: !0, placeholder: a("auditLog.selectStatus"), children: [
              /* @__PURE__ */ e.jsx(P, { value: "success", children: a("statuses.success") }),
              /* @__PURE__ */ e.jsx(P, { value: "failed", children: a("statuses.failed") })
            ] }) }) }),
            /* @__PURE__ */ e.jsx(_, { span: 6, children: /* @__PURE__ */ e.jsx(g.Item, { name: "dateRange", label: a("auditLog.dateRange"), children: /* @__PURE__ */ e.jsx(jt, { style: { width: "100%" } }) }) })
          ] }),
          /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsx(_, { span: 24, style: { textAlign: "right" }, children: /* @__PURE__ */ e.jsxs(A, { children: [
            /* @__PURE__ */ e.jsx(v, { onClick: p, children: o("reset") }),
            /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ge, {}), children: o("search") })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsxs(E, { children: [
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx(
        v,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Je, {}),
          onClick: p,
          style: { marginRight: 8 },
          children: o("refresh")
        }
      ) }),
      /* @__PURE__ */ e.jsx(
        G,
        {
          rowKey: "id",
          columns: s(I),
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
}, { TextArea: te } = S, { Option: q } = z, Zt = ({
  field: t,
  selectedType: n,
  dependentValues: s,
  formValues: a = {}
}) => {
  const { t: o } = w("system"), { t: r } = w("common"), u = Y(() => je(t.visible_when, a), [t.visible_when, a]), { options: i, loading: h } = xe(
    t.data_source,
    t.options,
    s
  ), m = Y(() => t.data_source && t.data_source.type !== "static" ? i : t.options || [], [t.data_source, t.options, i]), f = m && m.length > 0;
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
  ], c = () => o(`settings.toolsets.${n}.${t.name}`, {
    defaultValue: t.display_name || t.name
  }), y = () => o(`settings.toolsets.${n}.${t.name}Placeholder`, {
    defaultValue: t.placeholder || `${r("enter", { defaultValue: "Enter" })} ${t.name}`
  }), d = () => {
    if (t.description)
      return o(`settings.toolsets.${n}.${t.name}Tooltip`, {
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
          z,
          {
            loading: h,
            allowClear: !0,
            placeholder: y(),
            showSearch: !0,
            filterOption: (p, I) => {
              var x;
              return (x = I == null ? void 0 : I.children) == null ? void 0 : x.toLowerCase().includes(p.toLowerCase());
            },
            children: m.map((p) => /* @__PURE__ */ e.jsx(q, { value: p.value, children: p.label }, p.value))
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
          children: /* @__PURE__ */ e.jsx(te, { placeholder: y(), rows: 4 })
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
          children: /* @__PURE__ */ e.jsx(z, { allowClear: !0, placeholder: y(), children: m.map((p) => /* @__PURE__ */ e.jsx(q, { value: p.value, children: p.label }, p.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: l,
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(S, { placeholder: y() })
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
          children: /* @__PURE__ */ e.jsx(S.Password, { placeholder: y(), autoComplete: "new-password" })
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
          children: /* @__PURE__ */ e.jsx(z, { allowClear: !0, placeholder: y(), children: m.map((p) => /* @__PURE__ */ e.jsx(q, { value: p.value, children: p.label }, p.value)) })
        },
        t.name
      ) : /* @__PURE__ */ e.jsx(
        g.Item,
        {
          name: ["config", t.name],
          label: c(),
          rules: l,
          tooltip: d(),
          children: /* @__PURE__ */ e.jsx(_e, { style: { width: "100%" }, placeholder: y() })
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
          children: /* @__PURE__ */ e.jsx(Pe, {})
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
          children: /* @__PURE__ */ e.jsx(Z.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(A, { direction: "vertical", children: m.map((p) => /* @__PURE__ */ e.jsx(Z, { value: p.value, children: p.label }, p.value)) }) })
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
            z,
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
            te,
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
  dt as A,
  qt as D,
  ce as H,
  at as L,
  Et as O,
  Rt as P,
  Wt as T,
  Xt as U,
  Vt as a,
  Bt as b,
  Ot as c,
  $t as d,
  Ut as e,
  mt as f,
  gt as g,
  Ht as h,
  lt as i,
  me as j,
  Nt as k,
  Kt as l,
  Gt as m,
  Jt as n,
  Qt as o,
  Zt as p
};
