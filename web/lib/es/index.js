import { a as ze } from "./ai.js";
import { a as le } from "./authorization.js";
import { d as me, g as ce, t as Me } from "./base.js";
import { i as Ae } from "./inbox.js";
import { a as J } from "./system.js";
import { o as de } from "./oauth.js";
import { t as he } from "./tasks.js";
import { j as e, L as Le, a as Ne, s as _e, b as Ce, f as Te, e as Oe, d as Re, c as K, z as De } from "./vendor.js";
import { QueryClient as Be, QueryClientProvider as Ee } from "react-query";
import { useLocation as $e, useNavigate as Fe, Link as E, matchRoutes as G, Outlet as Ue, BrowserRouter as Ve, Routes as Ge, Route as te } from "react-router-dom";
import { Layout as H, Spin as Je, Menu as Ke, Space as He, Button as qe, Breadcrumb as Qe, ConfigProvider as Ye, App as We } from "antd";
import { useTranslation as q } from "react-i18next";
import { lazy as i, Suspense as Ze, useState as N, useEffect as _, useMemo as ue } from "react";
import { L as Xe, H as ne, O as Pe, I as et, T as tt, A as ae, a as nt, b as at, P as it } from "./components.js";
import { DashboardOutlined as st, SolutionOutlined as ot, UserOutlined as pe, SafetyOutlined as rt, FileSearchOutlined as lt, SettingOutlined as mt, SwapOutlined as ct, MenuUnfoldOutlined as dt, MenuFoldOutlined as ht } from "@ant-design/icons";
import { d as ut, a as pt, u as ft, b as gt, e as xt, f as yt, A as jt, S as wt, g as bt } from "./contexts.js";
import { flatMapDeep as vt, snakeCase as St } from "lodash-es";
import { A as It, a as kt, b as zt } from "./ai-chat-layout.js";
import { createStyles as Mt, useThemeMode as At, ThemeProvider as Lt, createGlobalStyle as Nt } from "antd-style";
import p from "classnames";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const _t = i(() => import("./dashboard.js")), Ct = i(() => import("./login.js")), Tt = i(() => import("./activate.js")), Ot = i(() => import("./profile.js")), Rt = i(() => import("./inbox_list.js")), ie = i(() => import("./not_found.js")), Dt = i(() => import("./forbidden.js")), Bt = i(() => import("./users.js").then((t) => t.U)), Et = i(() => import("./users.js").then((t) => t.a)), se = i(() => import("./users.js").then((t) => t.b)), $t = i(() => import("./roles.js").then((t) => t.R)), oe = i(() => import("./roles.js").then((t) => t.a)), Ft = i(() => import("./system-settings.js").then((t) => t.i)), Ut = i(() => import("./system-settings.js").then((t) => t.O)), Vt = i(() => import("./system-settings.js").then((t) => t.S)), Gt = i(() => import("./system-settings.js").then((t) => t.a)), Jt = i(() => import("./system-settings.js").then((t) => t.A)), Kt = i(() => import("./system-settings.js").then((t) => t.T)), Ht = i(() => import("./system-settings.js").then((t) => t.b)), qt = i(() => import("./audit.js")), Qt = i(() => import("./service-accounts.js").then((t) => t.S)), Yt = i(() => import("./service-accounts.js").then((t) => t.a)), Wt = i(() => import("./task_list.js")), Zt = i(() => import("./task_detail.js")), Xt = i(() => import("./task_schedule_list.js"));
function o(t, r) {
  return /* @__PURE__ */ e.jsx(Ze, { fallback: /* @__PURE__ */ e.jsx(Xe, {}), children: /* @__PURE__ */ e.jsx(t, { ...r }) });
}
const Pt = ({ transformSettingTabs: t, transformLangConfig: r, extraPrivateRoutes: x = [], extraPublicRoutes: A = [] }) => {
  const S = [
    {
      path: "/login",
      element: o(Ct, { transformLangConfig: r }),
      index: !0
    },
    {
      path: "/404",
      element: o(ie),
      index: !0
    },
    {
      path: "/403",
      element: o(Dt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o(Ht),
      index: !0
    },
    {
      path: "/activate",
      element: o(Tt, { transformLangConfig: r }),
      index: !0
    },
    ...A
  ], L = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: o(_t),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(st, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(Ot),
          hideInMenu: !0,
          name: "profile",
          index: !1
        },
        {
          path: "/inbox",
          element: o(Rt),
          hideInMenu: !0,
          name: "inbox",
          index: !1
        },
        ...x,
        {
          path: "/tasks",
          children: [
            {
              // path: '/tasks',
              // No permission required: the backend limits the result to the
              // current user's own tasks unless they hold task:list.
              element: o(Wt),
              name: "tasks",
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: o(Xt),
              permissions: ["task:schedule:list"],
              name: "taskSchedules",
              index: !1
            },
            {
              path: "/tasks/:id",
              // No permission required: the backend allows the task creator
              // to view their own task; task:view grants access to all tasks.
              element: o(Zt),
              index: !1
            }
          ]
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(pe, {}),
          permissions: [
            "authorization:user:list",
            "authorization:service_account:list",
            "authorization:role:view"
          ],
          children: [
            // Role management
            {
              path: "/authorization/roles",
              name: "roles",
              icon: /* @__PURE__ */ e.jsx(ot, {}),
              permissions: ["authorization:role:view"],
              children: [
                {
                  element: o($t),
                  permissions: ["authorization:role:view"],
                  index: !0,
                  name: "roles"
                },
                {
                  path: "/authorization/roles/create",
                  element: o(oe),
                  permissions: ["authorization:role:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "roleCreate"
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: o(oe),
                  permissions: ["authorization:role:update"],
                  index: !1,
                  hideInMenu: !0,
                  name: "roleUpdate"
                }
              ]
            },
            // User management
            {
              path: "/authorization/users",
              name: "users",
              icon: /* @__PURE__ */ e.jsx(Le, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: o(Bt),
                  permissions: ["authorization:user:list"],
                  index: !0,
                  name: "users"
                },
                {
                  path: "/authorization/users/create",
                  element: o(se),
                  permissions: ["authorization:user:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userCreate"
                },
                {
                  path: "/authorization/users/:id",
                  element: o(Et),
                  permissions: ["authorization:user:view"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userDetail"
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: o(se),
                  permissions: ["authorization:user:update"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userUpdate"
                }
              ]
            },
            // Service account management
            {
              path: "/authorization/service-accounts",
              name: "serviceAccounts",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: o(Qt),
                  permissions: ["authorization:service_account:view"],
                  index: !0,
                  hideInMenu: !0,
                  name: "serviceAccounts"
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(Yt),
                  permissions: ["authorization:service_account:view"],
                  hideInMenu: !0,
                  name: "serviceAccountDetail",
                  index: !1
                }
              ]
            }
          ]
        },
        // System management menu
        {
          name: "system",
          icon: /* @__PURE__ */ e.jsx(mt, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:audit_log:view", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view", "system:rate_limit:view", "system:rate_limit:update"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(rt, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view", "system:rate_limit:view", "system:rate_limit:update"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  hideInMenu: !0,
                  element: o(Ft, { transformItems: t }),
                  name: "settings"
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(Ut),
                  name: "organizationDetail",
                  index: !1,
                  hideInMenu: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: o(Vt),
                  name: "skillEditor",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: o(Gt),
                  name: "skillPreview",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: o(Jt),
                  name: "aiTraceViewer",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/toolsets/:id/debug",
                  permissions: ["system:toolsets:test"],
                  element: o(Kt),
                  name: "toolSetDebug",
                  hideInMenu: !0,
                  index: !1
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(lt, {}),
              name: "audit",
              permissions: ["system:audit_log:view"],
              index: !1,
              element: o(qt)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: o(ie),
          index: !0
        }
      ]
    }
  ];
  return [...S, ...L];
}, Rn = {
  ai: ze,
  authorization: le,
  base: me,
  inbox: Ae,
  system: J,
  oauth: de,
  tasks: he
}, { Header: en, Content: tn, Footer: nn, Sider: an } = H, sn = Mt(({ token: t, css: r }) => ({
  layout: r`
      min-height: 100vh;
      display: flex;
      flex-direction: row;
    `,
  header: r`
      padding: 0;
      display: flex;
      justify-content: space-between;
      background-color: ${t.colorBgContainer};
      border-block-end: 1px solid ${t.colorBorderSecondary};
    `,
  footer: r`
      text-align: center;
      padding: 15px 50px;
    `,
  contentContainer: r`
      padding: 24px;
      background-color: ${t.colorBgContainer};
    `,
  content: r`
      margin: 0 16px;
      height: calc(100vh - 120px);
      overflow: auto;
    `,
  mainLayout: r`
      flex: 1;
      min-width: 0;
      background-color: ${t.colorBgContainer};
    `,
  breadcrumb: r`
      margin-left: 8px;
    `,
  headerItems: r`
      margin-right: 20px;
    `,
  userName: r`
      height: 1em;
      line-height: 1em;
      margin-left: 5px;
    `,
  themeSwitch: r`
      display: inline-flex;
    `,
  menuSider: r`
      .ant-layout-sider-children{
        display: flex;
        flex-direction: column;
      }
    `,
  menuToggleButton: r`
      &&{
        font-size: 16px;
        width: 64px;
        height: 64px;
        border-radius: 0px;
      }
    `,
  layoutLogo: r`
      padding: 8px;
      border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
      display: flex;
    `,
  layoutLogoContainer: r`
      width: 100%;
      height: 100%;
      text-align: center;
    `,
  layoutLogoImage: r`
      height: 32px;
      width: 32px;
    `,
  menu: r`
      flex: 1 1 0%;
    `
})), on = ({
  element: t,
  siderWidth: r = 250,
  routes: x,
  transformLangConfig: A,
  menuStyle: S = "dark",
  transformHeaderItems: L = (I) => I,
  renderLayout: $,
  aiChatProps: w
}) => {
  var X;
  const { isDarkMode: I } = At(), { styles: c } = sn(), { layout: f, visible: C, loaded: u, resetPageAIContext: T } = ut(), { t: b, i18n: k } = q(), { t: z } = q("common"), y = $e(), { hasPermission: j } = pt(), h = Fe(), { logout: m, user: d } = ft(), { siteConfig: l, clearCurrentOrgId: O } = gt();
  xt();
  const R = !!((X = l == null ? void 0 : l.attrs) != null && X.ai_enabled) && j("ai:chat:create"), [Q, Y] = N([]), [ge, xe] = N(null), [F, ye] = N("Loading..."), [U, W] = N(!1);
  _(() => {
    T();
  }, [y.pathname, T]), yt(x, R), y.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? h("/profile#mfa") : d && d.status === "password_expired" && h("/profile#password"));
  const je = () => {
    m(), O(), window.location.href = ce("/login?redirect=" + encodeURIComponent(window.location.href));
  }, we = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(E, { to: "/profile", children: z("profile") })
    },
    {
      key: "logout",
      label: z("logout"),
      onClick: je
    }
  ];
  _(() => {
    var a, s;
    if (l) {
      const v = ((a = l.navigation) == null ? void 0 : a.filter((g) => g.path !== l.home_page)) ?? [], n = [...l.home_page ? [{
        name: "home",
        path: l.home_page
      }] : [], ...v];
      n.length > 1 ? Y(n) : Y([]), xe(l.logo), (s = document.getElementById("site-icon")) == null || s.setAttribute("href", l.logo);
    }
  }, [l]), _(() => {
    k.language && ye((l == null ? void 0 : l.name_i18n[k.language]) || (l == null ? void 0 : l.name) || "");
  }, [l, k.language]);
  const V = () => {
    const a = G(x, y.pathname), s = [];
    if (a) {
      for (const [v, n] of a.entries())
        if (n.route.path === "/" && !n.route.name)
          s.push({
            href: n.route.path,
            title: z("home"),
            key: "home"
          });
        else if (n.route.name) {
          const g = a.slice(0, v + 1).map((D) => D.route.name).filter(Boolean).join(".");
          if ((s.length > 0 ? s[s.length - 1].path : void 0) === (n.route.path || n.pathnameBase))
            continue;
          s.push({
            path: n.pathnameBase,
            title: n.route.name ? b(`breadcrumbs.${g.replace(/\./g, "_")}`, { defaultValue: Me(n.route.name) }) : void 0,
            key: n.pathname || n.route.name
          });
        }
    }
    return s;
  }, be = (a) => a.some((s) => j(s)), ve = vt(x, (a) => "children" in a && a.children ? a.children : []).map((a) => a == null ? void 0 : a.name).filter((a) => a !== void 0), Z = (a, s = []) => {
    const v = (n) => n && n.replace(/_/g, " ").split(" ").map((g) => g.charAt(0).toUpperCase() + g.slice(1)).join(" ");
    return a.flatMap((n) => "children" in n && n.children && !n.name ? n.children : [n]).map((n) => {
      if ("hideInMenu" in n && n.hideInMenu || n.permissions && !be(n.permissions))
        return null;
      const g = v(n.name);
      if (!n.name)
        return null;
      if ("children" in n && n.children) {
        const M = Z(n.children, [...s, n.name]);
        return M.length == 0 && n.path ? {
          key: n.path,
          icon: n.icon,
          label: /* @__PURE__ */ e.jsx(E, { to: n.path, children: b(`menu.${[...s, n.name].join(".")}`, { defaultValue: g }) })
        } : {
          key: n.path ?? n.name,
          icon: n.icon,
          label: b(`menu.${[...s, n.name, n.name].join(".")}`, { defaultValue: g }),
          children: M
        };
      }
      return n.name && n.path ? {
        key: n.path,
        icon: n.icon,
        label: /* @__PURE__ */ e.jsx(E, { to: n.path, children: b(`menu.${[...s, n.name].join(".")}`, { defaultValue: g }) })
      } : null;
    }).filter(Boolean);
  };
  _(() => {
    const a = V().filter((s) => s.path !== "/").map((s) => s.title).join(" - ");
    a ? document.title = `${F} | ${a}` : document.title = F;
  }, [V, y.pathname]);
  const Se = ue(() => {
    const a = G(x, y.pathname);
    if (a) {
      for (const s of a.reverse())
        if (s.route.path && s.route.name && !("hideInMenu" in s.route && s.route.hideInMenu))
          return s.route.path;
    }
    return y.pathname;
  }, [y.pathname]), Ie = [
    /* @__PURE__ */ e.jsx(
      ne,
      {
        className: "header-item navigation-dropdown",
        hidden: Q.length <= 1,
        menu: {
          items: Q.map((a) => ({
            key: a.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: a.path, children: b(`menu.${a.name}`, { defaultValue: a.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(ct, {})
      },
      "navigation-dropdown"
    ),
    ...l != null && l.enable_multi_org ? [/* @__PURE__ */ e.jsx(Pe, { className: "header-item org-switcher" }, "org-switcher")] : [],
    /* @__PURE__ */ e.jsx(et, { className: "header-item inbox-dropdown" }, "inbox-dropdown"),
    /* @__PURE__ */ e.jsx(tt, { className: "header-item task-dropdown" }, "task-dropdown"),
    /* @__PURE__ */ e.jsxs(
      ne,
      {
        className: "header-item user-dropdown",
        menu: { items: we },
        children: [
          d != null && d.avatar ? /* @__PURE__ */ e.jsx(ae, { src: d.avatar, size: "small" }) : /* @__PURE__ */ e.jsx(ae, { icon: /* @__PURE__ */ e.jsx(pe, {}), size: "small" }),
          /* @__PURE__ */ e.jsx("span", { className: p("header-user-name", c.userName), children: (d == null ? void 0 : d.full_name) || (d == null ? void 0 : d.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(nt, { className: "header-item language-switch", transformLangConfig: A }, "language-switch"),
    /* @__PURE__ */ e.jsx(at, { className: "header-item theme-switch" }, "theme-switch")
  ], ke = (a) => a ? St(a).replace(/[^a-zA-Z0-9-]/g, "-") : "";
  return ($ ?? ((a, s, v, n, g) => {
    var D, P;
    const M = ke((P = (D = G(x, y.pathname)) == null ? void 0 : D.pop()) == null ? void 0 : P.route.name);
    return /* @__PURE__ */ e.jsxs(H, { className: p("main-layout", c.layout, { [`page-${M}`]: M }), children: [
      /* @__PURE__ */ e.jsxs(an, { width: r, collapsible: !0, collapsed: U, onCollapse: W, className: p(c.menuSider, "layout-menu-sider"), theme: I ? "light" : S, children: [
        /* @__PURE__ */ e.jsx("div", { className: p("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: p("layout-logo-container", c.layoutLogoContainer), children: a ? /* @__PURE__ */ e.jsx("img", { src: a, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(Je, {}) }) }),
        /* @__PURE__ */ e.jsx(
          Ke,
          {
            className: p("layout-menu", c.menu),
            theme: I ? "light" : S,
            defaultOpenKeys: ve,
            defaultSelectedKeys: ["1"],
            mode: "inline",
            selectedKeys: [Se],
            items: s
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs(H, { className: p("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(en, { className: p("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(He, { children: [
            /* @__PURE__ */ e.jsx(
              qe,
              {
                type: "text",
                icon: U ? /* @__PURE__ */ e.jsx(dt, {}) : /* @__PURE__ */ e.jsx(ht, {}),
                onClick: () => W(!U),
                className: p("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(Qe, { className: p("site-breadcrumb", c.breadcrumb), itemRender: (B) => {
              const ee = B.href || B.path;
              return ee ? /* @__PURE__ */ e.jsx(E, { to: ee, children: B.title }) : /* @__PURE__ */ e.jsx("span", { children: B.title });
            }, items: n })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: p("header-items", c.headerItems), children: v })
        ] }),
        /* @__PURE__ */ e.jsxs(tn, { className: p("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: p("site-content-container", c.contentContainer), children: g }),
          R && /* @__PURE__ */ e.jsx(It, { icon: w == null ? void 0 : w.floatButtonIcon }),
          R && f === "classic" && (C || u) && /* @__PURE__ */ e.jsx(kt, { ...w })
        ] }),
        /* @__PURE__ */ e.jsxs(nn, { className: p("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          F
        ] })
      ] }),
      R && (f === "sidebar" || f === "float-sidebar") && (C || u) && /* @__PURE__ */ e.jsx(zt, { ...w })
    ] });
  }))(ge, Z(x), L(Ie), V(), t ?? /* @__PURE__ */ e.jsx(Ue, {}));
}, fe = "theme-mode";
function rn({ styles: t }) {
  const r = ue(() => Nt(t), [t]);
  return /* @__PURE__ */ e.jsx(r, {});
}
function ln() {
  try {
    const t = localStorage.getItem(fe);
    if (t === "light" || t === "dark" || t === "auto")
      return t;
  } catch {
  }
  return "light";
}
const mn = new Be({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), re = {
  "zh-CN": De,
  "en-US": K,
  "de-DE": Re,
  "es-ES": Oe,
  "fr-FR": Te,
  "ar-AE": Ce,
  "sv-SE": _e
};
function Dn({
  transformRouter: t = (u) => u,
  transformSettingTabs: r = (u) => u,
  transformLangConfig: x = (u) => u,
  extraPrivateRoutes: A = [],
  extraPublicRoutes: S = [],
  menuStyle: L = "dark",
  transformHeaderItems: $ = (u) => u,
  renderLayout: w,
  aiChatProps: I,
  style: c,
  themeProviderProps: f,
  configProviderProps: C
}) {
  const { i18n: u } = q(), [T, b] = N(re[u.language] || K);
  _(() => {
    b(re[u.language] || K);
  }, [u.language]);
  const k = (j) => j.map((h) => !("children" in h) || h.children === void 0 ? h : {
    ...h,
    children: k(h.children)
  }), z = t(k(Pt({
    transformSettingTabs: r,
    transformLangConfig: x,
    extraPrivateRoutes: A,
    extraPublicRoutes: S
  }))), y = (j, h) => j.flatMap((m) => m.is_private ? [m] : [m]).map((m, d) => {
    const l = m.is_private ? /* @__PURE__ */ e.jsx(it, { element: /* @__PURE__ */ e.jsx(
      on,
      {
        routes: z,
        element: m.element,
        transformLangConfig: x,
        menuStyle: L,
        transformHeaderItems: $,
        renderLayout: w,
        aiChatProps: I
      }
    ) }) : m.element;
    if ("children" in m && m.children && m.children.length > 0)
      return /* @__PURE__ */ e.jsx(te, { path: m.path, element: l, children: y(m.children, m) }, m.path ?? m.name ?? d);
    const { path: O } = m;
    return /* @__PURE__ */ e.jsx(te, { path: O, index: m.index, element: l }, O ?? m.name ?? `${(h == null ? void 0 : h.path) ?? ""}.${d}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Ee, { client: mn, children: /* @__PURE__ */ e.jsxs(
    Lt,
    {
      ...f,
      defaultThemeMode: (f == null ? void 0 : f.defaultThemeMode) ?? ln(),
      onThemeModeChange: (j) => {
        var h;
        try {
          localStorage.setItem(fe, j);
        } catch {
        }
        (h = f == null ? void 0 : f.onThemeModeChange) == null || h.call(f, j);
      },
      children: [
        c ? /* @__PURE__ */ e.jsx(rn, { styles: c }) : null,
        /* @__PURE__ */ e.jsx(Ye, { ...C, locale: T, children: /* @__PURE__ */ e.jsx(We, { children: /* @__PURE__ */ e.jsx(jt, { children: /* @__PURE__ */ e.jsx(wt, { children: /* @__PURE__ */ e.jsx(bt, { children: /* @__PURE__ */ e.jsx(Ve, { basename: ce(), children: /* @__PURE__ */ e.jsx(Ge, { children: y(z) }) }) }) }) }) }) })
      ]
    }
  ) });
}
const Bn = i(() => import("./ai-chat.js")), En = i(() => import("./components.js").then((t) => t.s).then((t) => ({ default: t.JsonSchemaConfigForm }))), $n = i(() => import("./components.js").then((t) => t.s).then((t) => ({ default: t.JsonSchemaConfigFormItem }))), Fn = i(() => import("./markdown-viewer.js")), Un = i(() => import("./markdown-viewer.js").then((t) => ({ default: t.Code }))), Vn = {
  ...le,
  ...me,
  ...de,
  ...J,
  ...J,
  ...he
};
export {
  Bn as A,
  En as J,
  Un as M,
  Rn as a,
  on as b,
  Dn as c,
  $n as d,
  Fn as e,
  Vn as f,
  o as w
};
