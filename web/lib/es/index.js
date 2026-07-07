import { a as Ne } from "./ai.js";
import { a as he } from "./authorization.js";
import { b as ue, g as pe, a as _e } from "./base.js";
import { a as E } from "./system.js";
import { o as fe } from "./oauth.js";
import { t as ge } from "./tasks.js";
import { j as e, d as Ce, e as Oe, f as $e, g as Re, h as De, k as Te, l as Be, m as J, n as Pe } from "./vendor.js";
import { QueryClient as Fe, QueryClientProvider as Ue } from "react-query";
import { useLocation as Ve, useNavigate as Ee, Link as D, matchRoutes as U, Outlet as Je, BrowserRouter as Ke, Routes as He, Route as ie } from "react-router-dom";
import { Layout as K, Menu as T, Spin as qe, Space as Qe, Button as We, Breadcrumb as Ye, ConfigProvider as Ze } from "antd";
import { useTranslation as H } from "react-i18next";
import { lazy as i, Suspense as Ge, useState as A, useEffect as N, useMemo as Xe } from "react";
import { L as et, H as V, O as tt, T as nt, A as se, a as at, P as it } from "./components.js";
import { DashboardOutlined as st, SolutionOutlined as ot, UserOutlined as xe, SafetyOutlined as rt, FileSearchOutlined as lt, SettingOutlined as mt, SwapOutlined as dt, SunOutlined as oe, MoonOutlined as re, MenuUnfoldOutlined as ct, MenuFoldOutlined as ht } from "@ant-design/icons";
import { a as ut, c as pt, b as ft, u as gt, A as xt, S as yt, e as jt } from "./contexts.js";
import { flatMapDeep as vt, snakeCase as wt } from "lodash-es";
import { A as bt, a as kt, b as St } from "./ai-chat-layout.js";
import { createStyles as It, useThemeMode as zt, ThemeProvider as Mt } from "antd-style";
import u from "classnames";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Lt = i(() => import("./dashboard.js")), At = i(() => import("./login.js")), Nt = i(() => import("./activate.js")), _t = i(() => import("./profile.js")), le = i(() => import("./not_found.js")), Ct = i(() => import("./forbidden.js")), Ot = i(() => import("./users.js").then((n) => n.U)), $t = i(() => import("./users.js").then((n) => n.a)), me = i(() => import("./users.js").then((n) => n.b)), Rt = i(() => import("./roles.js").then((n) => n.R)), de = i(() => import("./roles.js").then((n) => n.a)), Dt = i(() => import("./system-settings.js").then((n) => n.i)), Tt = i(() => import("./system-settings.js").then((n) => n.O)), Bt = i(() => import("./system-settings.js").then((n) => n.S)), Pt = i(() => import("./system-settings.js").then((n) => n.a)), Ft = i(() => import("./system-settings.js").then((n) => n.A)), Ut = i(() => import("./system-settings.js").then((n) => n.T)), Vt = i(() => import("./system-settings.js").then((n) => n.b)), Et = i(() => import("./audit.js")), Jt = i(() => import("./service-accounts.js").then((n) => n.S)), Kt = i(() => import("./service-accounts.js").then((n) => n.a)), Ht = i(() => import("./task_list.js")), qt = i(() => import("./task_detail.js")), Qt = i(() => import("./task_schedule_list.js"));
function r(n, l) {
  return /* @__PURE__ */ e.jsx(Ge, { fallback: /* @__PURE__ */ e.jsx(et, {}), children: /* @__PURE__ */ e.jsx(n, { ...l }) });
}
const Wt = ({ transformSettingTabs: n, transformLangConfig: l, extraPrivateRoutes: x = [], extraPublicRoutes: I = [] }) => {
  const w = [
    {
      path: "/login",
      element: r(At, { transformLangConfig: l }),
      index: !0
    },
    {
      path: "/404",
      element: r(le),
      index: !0
    },
    {
      path: "/403",
      element: r(Ct),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: r(Vt),
      index: !0
    },
    {
      path: "/activate",
      element: r(Nt, { transformLangConfig: l }),
      index: !0
    },
    ...I
  ], z = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: r(Lt),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(st, {}),
          index: !0
        },
        {
          path: "/profile",
          element: r(_t),
          hideInMenu: !0,
          name: "profile",
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
              element: r(Ht),
              name: "tasks",
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: r(Qt),
              permissions: ["task:schedule:list"],
              name: "taskSchedules",
              index: !1
            },
            {
              path: "/tasks/:id",
              // No permission required: the backend allows the task creator
              // to view their own task; task:view grants access to all tasks.
              element: r(qt),
              index: !1
            }
          ]
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(xe, {}),
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
                  element: r(Rt),
                  permissions: ["authorization:role:view"],
                  index: !0,
                  name: "roles"
                },
                {
                  path: "/authorization/roles/create",
                  element: r(de),
                  permissions: ["authorization:role:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "roleCreate"
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: r(de),
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
              icon: /* @__PURE__ */ e.jsx(Ce, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: r(Ot),
                  permissions: ["authorization:user:list"],
                  index: !0,
                  name: "users"
                },
                {
                  path: "/authorization/users/create",
                  element: r(me),
                  permissions: ["authorization:user:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userCreate"
                },
                {
                  path: "/authorization/users/:id",
                  element: r($t),
                  permissions: ["authorization:user:view"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userDetail"
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: r(me),
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
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: r(Jt),
                  permissions: ["authorization:service_account:view"],
                  index: !0,
                  hideInMenu: !0,
                  name: "serviceAccounts"
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: r(Kt),
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
          permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:audit_log:view", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(rt, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  hideInMenu: !0,
                  element: r(Dt, { transformItems: n }),
                  name: "settings"
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: r(Tt),
                  name: "organizationDetail",
                  index: !1,
                  hideInMenu: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: r(Bt),
                  name: "skillEditor",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: r(Pt),
                  name: "skillPreview",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: r(Ft),
                  name: "aiTraceViewer",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/toolsets/:id/debug",
                  permissions: ["system:toolsets:test"],
                  element: r(Ut),
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
              element: r(Et)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: r(le),
          index: !0
        }
      ]
    }
  ];
  return [...w, ...z];
}, An = {
  ai: Ne,
  authorization: he,
  base: ue,
  system: E,
  oauth: fe,
  tasks: ge
}, { Header: Yt, Content: Zt, Footer: Gt, Sider: Xt } = K, { SubMenu: en } = T, tn = It(({ token: n, css: l }) => ({
  layout: l`
      min-height: 100vh;
      display: flex;
      flex-direction: row;
    `,
  header: l`
      padding: 0;
      display: flex;
      justify-content: space-between;
      background-color: ${n.colorBgContainer};
      border-block-end: 1px solid ${n.colorBorderSecondary};
    `,
  footer: l`
      text-align: center;
      padding: 15px 50px;
    `,
  contentContainer: l`
      padding: 24px;
      background-color: ${n.colorBgContainer};
    `,
  content: l`
      margin: 0 16px;
      height: calc(100vh - 120px);
      overflow: auto;
    `,
  mainLayout: l`
      flex: 1;
      min-width: 0;
      background-color: ${n.colorBgContainer};
    `,
  breadcrumb: l`
      margin-left: 8px;
    `,
  headerItems: l`
      margin-right: 20px;
    `,
  userName: l`
      height: 1em;
      line-height: 1em;
      margin-left: 5px;
    `,
  themeSwitch: l`
      display: inline-flex;
    `,
  menuSider: l`
      .ant-layout-sider-children{
        display: flex;
        flex-direction: column;
      }
    `,
  menuToggleButton: l`
      &&{
        font-size: 16px;
        width: 64px;
        height: 64px;
      }
    `,
  layoutLogo: l`
      margin: 8px;
      display: flex;
    `,
  layoutLogoContainer: l`
      width: 100%;
      height: 100%;
      text-align: center;
    `,
  layoutLogoImage: l`
      height: 32px;
      width: 32px;
    `,
  menu: l`
      flex: 1 1 0%;
    `
})), nn = ({
  element: n,
  siderWidth: l = 250,
  routes: x,
  transformLangConfig: I,
  menuStyle: w = "dark",
  transformHeaderItems: z = (b) => b,
  renderLayout: B,
  aiChatProps: _
}) => {
  const { themeMode: b, setThemeMode: p, isDarkMode: C } = zt(), { styles: d } = tn(), { layout: k, visible: M, loaded: L, resetPageAIContext: S } = ut(), { t: c, i18n: m } = H(), { t: y } = H("common"), g = Ve(), { hasPermission: O } = pt(), q = Ee(), { logout: ye, user: h } = ft(), { siteConfig: o, clearCurrentOrgId: je } = gt(), [Q, W] = A([]), [ve, we] = A(null), [P, be] = A("Loading...");
  N(() => {
    S();
  }, [g.pathname, S]), g.pathname !== "/profile" && (h && h.mfa_enforced && !h.mfa_enabled ? q("/profile#mfa") : h && h.status === "password_expired" && q("/profile#password"));
  const ke = () => {
    ye(), je(), window.location.href = pe("/login?redirect=" + encodeURIComponent(window.location.href));
  }, Se = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(D, { to: "/profile", children: y("profile") })
    },
    {
      key: "logout",
      label: y("logout"),
      onClick: ke
    }
  ];
  N(() => {
    var a, s;
    if (o) {
      const j = ((a = o.navigation) == null ? void 0 : a.filter((f) => f.path !== o.home_page)) ?? [], t = [...o.home_page ? [{
        name: "home",
        path: o.home_page
      }] : [], ...j];
      t.length > 1 ? W(t) : W([]), we(o.logo), (s = document.getElementById("site-icon")) == null || s.setAttribute("href", o.logo);
    }
  }, [o]), N(() => {
    m.language && be((o == null ? void 0 : o.name_i18n[m.language]) || (o == null ? void 0 : o.name) || "");
  }, [o, m.language]);
  const F = () => {
    const a = U(x, g.pathname), s = [];
    if (a) {
      for (const [j, t] of a.entries())
        if (t.route.path === "/" && !t.route.name)
          s.push({
            href: t.route.path,
            title: y("home"),
            key: "home"
          });
        else if (t.route.name) {
          const f = a.slice(0, j + 1).map(($) => $.route.name).filter(Boolean).join(".");
          if ((s.length > 0 ? s[s.length - 1].path : void 0) === (t.route.path || t.pathnameBase))
            continue;
          s.push({
            path: t.pathnameBase,
            title: t.route.name ? c(`breadcrumbs.${f.replace(/\./g, "_")}`, { defaultValue: _e(t.route.name) }) : void 0,
            key: t.pathname || t.route.name
          });
        }
    }
    return s;
  }, Ie = (a) => a.some((s) => O(s)), ze = vt(x, (a) => "children" in a && a.children ? a.children : []).map((a) => a == null ? void 0 : a.name).filter((a) => a !== void 0), Y = (a, s = []) => {
    const j = (t) => t && t.replace(/_/g, " ").split(" ").map((f) => f.charAt(0).toUpperCase() + f.slice(1)).join(" ");
    return a.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if ("hideInMenu" in t && t.hideInMenu || t.permissions && !Ie(t.permissions))
        return null;
      const f = j(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const v = Y(t.children, [...s, t.name]);
        return v.length == 0 && t.path ? /* @__PURE__ */ e.jsx(T.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(D, { to: t.path, children: c(`menu.${[...s, t.name].join(".")}`, { defaultValue: f }) }) }, t.path) : /* @__PURE__ */ e.jsx(en, { icon: t.icon, title: c(`menu.${[...s, t.name, t.name].join(".")}`, { defaultValue: f }), children: v }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(T.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(D, { to: t.path, children: c(`menu.${[...s, t.name].join(".")}`, { defaultValue: f }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  N(() => {
    const a = F().filter((s) => s.path !== "/").map((s) => s.title).join(" - ");
    a ? document.title = `${P} | ${a}` : document.title = P;
  }, [F, g.pathname]);
  const Me = Xe(() => {
    const a = U(x, g.pathname);
    if (a) {
      for (const s of a.reverse())
        if (s.route.path && s.route.name && !("hideInMenu" in s.route && s.route.hideInMenu))
          return s.route.path;
    }
    return g.pathname;
  }, [g.pathname]), Le = [
    /* @__PURE__ */ e.jsx(
      V,
      {
        className: "header-item navigation-dropdown",
        hidden: Q.length <= 1,
        menu: {
          items: Q.map((a) => ({
            key: a.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: a.path, children: c(`menu.${a.name}`, { defaultValue: a.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(dt, {})
      },
      "navigation-dropdown"
    ),
    ...o != null && o.enable_multi_org ? [/* @__PURE__ */ e.jsx(tt, { className: "header-item org-switcher" }, "org-switcher")] : [],
    /* @__PURE__ */ e.jsx(nt, { className: "header-item task-dropdown" }, "task-dropdown"),
    /* @__PURE__ */ e.jsxs(
      V,
      {
        className: "header-item user-dropdown",
        menu: { items: Se },
        children: [
          h != null && h.avatar ? /* @__PURE__ */ e.jsx(se, { src: h.avatar }) : /* @__PURE__ */ e.jsx(se, { icon: /* @__PURE__ */ e.jsx(xe, {}) }),
          /* @__PURE__ */ e.jsx("span", { className: u("header-user-name", d.userName), children: (h == null ? void 0 : h.full_name) || (h == null ? void 0 : h.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(at, { className: "header-item language-switch", transformLangConfig: I }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      V,
      {
        className: "header-item theme-switch",
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(oe, {}),
              " ",
              y("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(re, {}),
              " ",
              y("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: a }) => {
            p(a);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(oe, {}) : /* @__PURE__ */ e.jsx(re, {})
      },
      "theme-switch"
    )
  ], Ae = (a) => a ? wt(a).replace(/[^a-zA-Z0-9-]/g, "-") : "";
  return (B ?? ((a, s, j, t, f) => {
    var G, X, ee, te, ne;
    const [v, $] = A(!1), Z = Ae((X = (G = U(x, g.pathname)) == null ? void 0 : G.pop()) == null ? void 0 : X.route.name);
    return /* @__PURE__ */ e.jsxs(K, { className: u("main-layout", d.layout, { [`page-${Z}`]: Z }), children: [
      /* @__PURE__ */ e.jsxs(Xt, { width: l, collapsible: !0, collapsed: v, onCollapse: $, className: u(d.menuSider, "layout-menu-sider"), theme: C ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: u("logo", d.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: u("layout-logo-container", d.layoutLogoContainer), children: a ? /* @__PURE__ */ e.jsx("img", { src: a, alt: "logo", className: d.layoutLogoImage }) : /* @__PURE__ */ e.jsx(qe, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(T, { className: u("layout-menu", d.menu), theme: C ? "light" : w, defaultOpenKeys: ze, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [Me], children: s })
      ] }),
      /* @__PURE__ */ e.jsxs(K, { className: u("site-layout", "main-layout", d.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(Yt, { className: u("site-header", d.header), children: [
          /* @__PURE__ */ e.jsxs(Qe, { children: [
            /* @__PURE__ */ e.jsx(
              We,
              {
                type: "text",
                icon: v ? /* @__PURE__ */ e.jsx(ct, {}) : /* @__PURE__ */ e.jsx(ht, {}),
                onClick: () => $(!v),
                className: u("layout-menu-toggle", d.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(Ye, { className: u("site-breadcrumb", d.breadcrumb), itemRender: (R) => {
              const ae = R.href || R.path;
              return ae ? /* @__PURE__ */ e.jsx(D, { to: ae, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: u("header-items", d.headerItems), children: j })
        ] }),
        /* @__PURE__ */ e.jsxs(Zt, { className: u("site-content", d.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: u("site-content-container", d.contentContainer), children: f }),
          ((ee = o == null ? void 0 : o.attrs) == null ? void 0 : ee.ai_enabled) && /* @__PURE__ */ e.jsx(bt, {}),
          ((te = o == null ? void 0 : o.attrs) == null ? void 0 : te.ai_enabled) && k === "classic" && (M || L) && /* @__PURE__ */ e.jsx(kt, { ..._ })
        ] }),
        /* @__PURE__ */ e.jsxs(Gt, { className: u("site-footer", d.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          P
        ] })
      ] }),
      ((ne = o == null ? void 0 : o.attrs) == null ? void 0 : ne.ai_enabled) && (k === "sidebar" || k === "float-sidebar") && (M || L) && /* @__PURE__ */ e.jsx(St, { ..._ })
    ] });
  }))(ve, Y(x), z(Le), F(), n ?? /* @__PURE__ */ e.jsx(Je, {}));
}, an = new Fe({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), ce = {
  "zh-CN": Pe,
  "en-US": J,
  "de-DE": Be,
  "es-ES": Te,
  "fr-FR": De,
  "ar-AE": Re,
  "sv-SE": $e
};
function Nn({
  transformRouter: n = (p) => p,
  transformSettingTabs: l = (p) => p,
  transformLangConfig: x = (p) => p,
  extraPrivateRoutes: I = [],
  extraPublicRoutes: w = [],
  menuStyle: z = "dark",
  transformHeaderItems: B = (p) => p,
  renderLayout: _,
  aiChatProps: b
}) {
  const { i18n: p } = H(), [C, d] = A(ce[p.language] || J);
  N(() => {
    d(ce[p.language] || J);
  }, [p.language]);
  const k = (S) => S.map((c) => !("children" in c) || c.children === void 0 ? c : {
    ...c,
    children: k(c.children)
  }), M = n(k(Wt({
    transformSettingTabs: l,
    transformLangConfig: x,
    extraPrivateRoutes: I,
    extraPublicRoutes: w
  }))), L = (S, c) => S.flatMap((m) => m.is_private ? [m] : [m]).map((m, y) => {
    const g = m.is_private ? /* @__PURE__ */ e.jsx(it, { element: /* @__PURE__ */ e.jsx(
      nn,
      {
        routes: M,
        element: m.element,
        transformLangConfig: x,
        menuStyle: z,
        transformHeaderItems: B,
        renderLayout: _,
        aiChatProps: b
      }
    ) }) : m.element;
    if ("children" in m && m.children && m.children.length > 0)
      return /* @__PURE__ */ e.jsx(ie, { path: m.path, element: g, children: L(m.children, m) }, m.path ?? m.name ?? y);
    const { path: O } = m;
    return /* @__PURE__ */ e.jsx(ie, { path: O, index: m.index, element: g }, O ?? m.name ?? `${(c == null ? void 0 : c.path) ?? ""}.${y}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Ue, { client: an, children: /* @__PURE__ */ e.jsx(Mt, { children: /* @__PURE__ */ e.jsx(Ze, { locale: C, children: /* @__PURE__ */ e.jsx(xt, { children: /* @__PURE__ */ e.jsx(yt, { children: /* @__PURE__ */ e.jsx(jt, { children: /* @__PURE__ */ e.jsx(Ke, { basename: pe(), children: /* @__PURE__ */ e.jsx(He, { children: L(M) }) }) }) }) }) }) }) });
}
const _n = i(() => import("./ai-chat.js")), Cn = i(() => import("./json-schema-config-form.js").then((n) => ({ default: n.JsonSchemaConfigForm }))), On = i(() => import("./json-schema-config-form.js").then((n) => ({ default: n.JsonSchemaConfigFormItem }))), $n = i(() => import("./markdown-viewer.js")), Rn = i(() => import("./markdown-viewer.js").then((n) => ({ default: n.Code }))), Dn = {
  ...he,
  ...ue,
  ...fe,
  ...E,
  ...E,
  ...ge
};
export {
  _n as A,
  Cn as J,
  $n as M,
  An as a,
  Dn as b,
  On as c,
  Rn as d,
  Nn as e,
  nn as f,
  r as w
};
