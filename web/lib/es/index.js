import { a as Ae } from "./ai.js";
import { a as he } from "./authorization.js";
import { b as ue, g as pe, a as Ce } from "./base.js";
import { a as V } from "./system.js";
import { o as ge } from "./oauth.js";
import { t as fe } from "./tasks.js";
import { j as e, d as _e, e as Oe, s as Re, f as De, g as Te, h as Be, k as Pe, l as J, z as Fe } from "./vendor.js";
import { QueryClient as $e, QueryClientProvider as Ue } from "react-query";
import { useLocation as Ee, useNavigate as Ve, Link as T, matchRoutes as U, Outlet as Je, BrowserRouter as Ke, Routes as He, Route as ie } from "react-router-dom";
import { Layout as K, Menu as B, Spin as qe, Space as Qe, Button as Ge, Breadcrumb as We, ConfigProvider as Ye } from "antd";
import { useTranslation as H } from "react-i18next";
import { lazy as i, Suspense as Ze, useState as N, useEffect as A, useMemo as Xe } from "react";
import { L as et, H as E, O as tt, T as nt, A as se, a as at, P as it } from "./components.js";
import { DashboardOutlined as st, SolutionOutlined as ot, UserOutlined as xe, SafetyOutlined as rt, FileSearchOutlined as lt, SettingOutlined as mt, SwapOutlined as ct, SunOutlined as oe, MoonOutlined as re, MenuUnfoldOutlined as dt, MenuFoldOutlined as ht } from "@ant-design/icons";
import { a as ut, c as pt, b as gt, u as ft, A as xt, S as yt, e as jt } from "./contexts.js";
import { flatMapDeep as vt, snakeCase as wt } from "lodash-es";
import { A as bt, a as St, b as kt } from "./ai-chat-layout.js";
import { createStyles as zt, useThemeMode as It, ThemeProvider as Mt } from "antd-style";
import u from "classnames";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Lt = i(() => import("./dashboard.js")), Nt = i(() => import("./login.js")), At = i(() => import("./activate.js")), Ct = i(() => import("./profile.js")), le = i(() => import("./not_found.js")), _t = i(() => import("./forbidden.js")), Ot = i(() => import("./users.js").then((n) => n.U)), Rt = i(() => import("./users.js").then((n) => n.a)), me = i(() => import("./users.js").then((n) => n.b)), Dt = i(() => import("./roles.js").then((n) => n.R)), ce = i(() => import("./roles.js").then((n) => n.a)), Tt = i(() => import("./system-settings.js").then((n) => n.i)), Bt = i(() => import("./system-settings.js").then((n) => n.O)), Pt = i(() => import("./system-settings.js").then((n) => n.S)), Ft = i(() => import("./system-settings.js").then((n) => n.a)), $t = i(() => import("./system-settings.js").then((n) => n.A)), Ut = i(() => import("./system-settings.js").then((n) => n.T)), Et = i(() => import("./system-settings.js").then((n) => n.b)), Vt = i(() => import("./audit.js")), Jt = i(() => import("./service-accounts.js").then((n) => n.S)), Kt = i(() => import("./service-accounts.js").then((n) => n.a)), Ht = i(() => import("./task_list.js")), qt = i(() => import("./task_detail.js")), Qt = i(() => import("./task_schedule_list.js"));
function r(n, l) {
  return /* @__PURE__ */ e.jsx(Ze, { fallback: /* @__PURE__ */ e.jsx(et, {}), children: /* @__PURE__ */ e.jsx(n, { ...l }) });
}
const Gt = ({ transformSettingTabs: n, transformLangConfig: l, extraPrivateRoutes: x = [], extraPublicRoutes: z = [] }) => {
  const w = [
    {
      path: "/login",
      element: r(Nt, { transformLangConfig: l }),
      index: !0
    },
    {
      path: "/404",
      element: r(le),
      index: !0
    },
    {
      path: "/403",
      element: r(_t),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: r(Et),
      index: !0
    },
    {
      path: "/activate",
      element: r(At, { transformLangConfig: l }),
      index: !0
    },
    ...z
  ], I = [
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
          element: r(Ct),
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
                  element: r(Dt),
                  permissions: ["authorization:role:view"],
                  index: !0,
                  name: "roles"
                },
                {
                  path: "/authorization/roles/create",
                  element: r(ce),
                  permissions: ["authorization:role:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "roleCreate"
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: r(ce),
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
              icon: /* @__PURE__ */ e.jsx(_e, {}),
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
                  element: r(Rt),
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
                  element: r(Tt, { transformItems: n }),
                  name: "settings"
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: r(Bt),
                  name: "organizationDetail",
                  index: !1,
                  hideInMenu: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: r(Pt),
                  name: "skillEditor",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: r(Ft),
                  name: "skillPreview",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: r($t),
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
              element: r(Vt)
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
  return [...w, ...I];
}, Nn = {
  ai: Ae,
  authorization: he,
  base: ue,
  system: V,
  oauth: ge,
  tasks: fe
}, { Header: Wt, Content: Yt, Footer: Zt, Sider: Xt } = K, { SubMenu: en } = B, tn = zt(({ token: n, css: l }) => ({
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
  transformLangConfig: z,
  menuStyle: w = "dark",
  transformHeaderItems: I = (b) => b,
  renderLayout: P,
  aiChatProps: C
}) => {
  const { themeMode: b, setThemeMode: p, isDarkMode: _ } = It(), { styles: c } = tn(), { layout: S, visible: M, loaded: L, resetPageAIContext: k } = ut(), { t: d, i18n: m } = H(), { t: y } = H("common"), f = Ee(), { hasPermission: O } = pt(), q = Ve(), { logout: ye, user: h } = gt(), { siteConfig: o, clearCurrentOrgId: je } = ft(), [Q, G] = N([]), [ve, we] = N(null), [F, be] = N("Loading...");
  A(() => {
    k();
  }, [f.pathname, k]), f.pathname !== "/profile" && (h && h.mfa_enforced && !h.mfa_enabled ? q("/profile#mfa") : h && h.status === "password_expired" && q("/profile#password"));
  const Se = () => {
    ye(), je(), window.location.href = pe("/login?redirect=" + encodeURIComponent(window.location.href));
  }, ke = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(T, { to: "/profile", children: y("profile") })
    },
    {
      key: "logout",
      label: y("logout"),
      onClick: Se
    }
  ];
  A(() => {
    var a, s;
    if (o) {
      const j = ((a = o.navigation) == null ? void 0 : a.filter((g) => g.path !== o.home_page)) ?? [], t = [...o.home_page ? [{
        name: "home",
        path: o.home_page
      }] : [], ...j];
      t.length > 1 ? G(t) : G([]), we(o.logo), (s = document.getElementById("site-icon")) == null || s.setAttribute("href", o.logo);
    }
  }, [o]), A(() => {
    m.language && be((o == null ? void 0 : o.name_i18n[m.language]) || (o == null ? void 0 : o.name) || "");
  }, [o, m.language]);
  const $ = () => {
    const a = U(x, f.pathname), s = [];
    if (a) {
      for (const [j, t] of a.entries())
        if (t.route.path === "/" && !t.route.name)
          s.push({
            href: t.route.path,
            title: y("home"),
            key: "home"
          });
        else if (t.route.name) {
          const g = a.slice(0, j + 1).map((R) => R.route.name).filter(Boolean).join(".");
          if ((s.length > 0 ? s[s.length - 1].path : void 0) === (t.route.path || t.pathnameBase))
            continue;
          s.push({
            path: t.pathnameBase,
            title: t.route.name ? d(`breadcrumbs.${g.replace(/\./g, "_")}`, { defaultValue: Ce(t.route.name) }) : void 0,
            key: t.pathname || t.route.name
          });
        }
    }
    return s;
  }, ze = (a) => a.some((s) => O(s)), Ie = vt(x, (a) => "children" in a && a.children ? a.children : []).map((a) => a == null ? void 0 : a.name).filter((a) => a !== void 0), W = (a, s = []) => {
    const j = (t) => t && t.replace(/_/g, " ").split(" ").map((g) => g.charAt(0).toUpperCase() + g.slice(1)).join(" ");
    return a.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if ("hideInMenu" in t && t.hideInMenu || t.permissions && !ze(t.permissions))
        return null;
      const g = j(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const v = W(t.children, [...s, t.name]);
        return v.length == 0 && t.path ? /* @__PURE__ */ e.jsx(B.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(T, { to: t.path, children: d(`menu.${[...s, t.name].join(".")}`, { defaultValue: g }) }) }, t.path) : /* @__PURE__ */ e.jsx(en, { icon: t.icon, title: d(`menu.${[...s, t.name, t.name].join(".")}`, { defaultValue: g }), children: v }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(B.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(T, { to: t.path, children: d(`menu.${[...s, t.name].join(".")}`, { defaultValue: g }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  A(() => {
    const a = $().filter((s) => s.path !== "/").map((s) => s.title).join(" - ");
    a ? document.title = `${F} | ${a}` : document.title = F;
  }, [$, f.pathname]);
  const Me = Xe(() => {
    const a = U(x, f.pathname);
    if (a) {
      for (const s of a.reverse())
        if (s.route.path && s.route.name && !("hideInMenu" in s.route && s.route.hideInMenu))
          return s.route.path;
    }
    return f.pathname;
  }, [f.pathname]), Le = [
    /* @__PURE__ */ e.jsx(
      E,
      {
        className: "header-item navigation-dropdown",
        hidden: Q.length <= 1,
        menu: {
          items: Q.map((a) => ({
            key: a.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: a.path, children: d(`menu.${a.name}`, { defaultValue: a.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(ct, {})
      },
      "navigation-dropdown"
    ),
    ...o != null && o.enable_multi_org ? [/* @__PURE__ */ e.jsx(tt, { className: "header-item org-switcher" }, "org-switcher")] : [],
    /* @__PURE__ */ e.jsx(nt, { className: "header-item task-dropdown" }, "task-dropdown"),
    /* @__PURE__ */ e.jsxs(
      E,
      {
        className: "header-item user-dropdown",
        menu: { items: ke },
        children: [
          h != null && h.avatar ? /* @__PURE__ */ e.jsx(se, { src: h.avatar }) : /* @__PURE__ */ e.jsx(se, { icon: /* @__PURE__ */ e.jsx(xe, {}) }),
          /* @__PURE__ */ e.jsx("span", { className: u("header-user-name", c.userName), children: (h == null ? void 0 : h.full_name) || (h == null ? void 0 : h.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(at, { className: "header-item language-switch", transformLangConfig: z }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      E,
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
  ], Ne = (a) => a ? wt(a).replace(/[^a-zA-Z0-9-]/g, "-") : "";
  return (P ?? ((a, s, j, t, g) => {
    var Z, X, ee, te, ne;
    const [v, R] = N(!1), Y = Ne((X = (Z = U(x, f.pathname)) == null ? void 0 : Z.pop()) == null ? void 0 : X.route.name);
    return /* @__PURE__ */ e.jsxs(K, { className: u("main-layout", c.layout, { [`page-${Y}`]: Y }), children: [
      /* @__PURE__ */ e.jsxs(Xt, { width: l, collapsible: !0, collapsed: v, onCollapse: R, className: u(c.menuSider, "layout-menu-sider"), theme: _ ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: u("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: u("layout-logo-container", c.layoutLogoContainer), children: a ? /* @__PURE__ */ e.jsx("img", { src: a, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(qe, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(B, { className: u("layout-menu", c.menu), theme: _ ? "light" : w, defaultOpenKeys: Ie, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [Me], children: s })
      ] }),
      /* @__PURE__ */ e.jsxs(K, { className: u("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(Wt, { className: u("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(Qe, { children: [
            /* @__PURE__ */ e.jsx(
              Ge,
              {
                type: "text",
                icon: v ? /* @__PURE__ */ e.jsx(dt, {}) : /* @__PURE__ */ e.jsx(ht, {}),
                onClick: () => R(!v),
                className: u("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(We, { className: u("site-breadcrumb", c.breadcrumb), itemRender: (D) => {
              const ae = D.href || D.path;
              return ae ? /* @__PURE__ */ e.jsx(T, { to: ae, children: D.title }) : /* @__PURE__ */ e.jsx("span", { children: D.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: u("header-items", c.headerItems), children: j })
        ] }),
        /* @__PURE__ */ e.jsxs(Yt, { className: u("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: u("site-content-container", c.contentContainer), children: g }),
          ((ee = o == null ? void 0 : o.attrs) == null ? void 0 : ee.ai_enabled) && /* @__PURE__ */ e.jsx(bt, {}),
          ((te = o == null ? void 0 : o.attrs) == null ? void 0 : te.ai_enabled) && S === "classic" && (M || L) && /* @__PURE__ */ e.jsx(St, { ...C })
        ] }),
        /* @__PURE__ */ e.jsxs(Zt, { className: u("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          F
        ] })
      ] }),
      ((ne = o == null ? void 0 : o.attrs) == null ? void 0 : ne.ai_enabled) && (S === "sidebar" || S === "float-sidebar") && (M || L) && /* @__PURE__ */ e.jsx(kt, { ...C })
    ] });
  }))(ve, W(x), I(Le), $(), n ?? /* @__PURE__ */ e.jsx(Je, {}));
}, an = new $e({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), de = {
  "zh-CN": Fe,
  "en-US": J,
  "de-DE": Pe,
  "es-ES": Be,
  "fr-FR": Te,
  "ar-AE": De,
  "sv-SE": Re
};
function An({
  transformRouter: n = (p) => p,
  transformSettingTabs: l = (p) => p,
  transformLangConfig: x = (p) => p,
  extraPrivateRoutes: z = [],
  extraPublicRoutes: w = [],
  menuStyle: I = "dark",
  transformHeaderItems: P = (p) => p,
  renderLayout: C,
  aiChatProps: b
}) {
  const { i18n: p } = H(), [_, c] = N(de[p.language] || J);
  A(() => {
    c(de[p.language] || J);
  }, [p.language]);
  const S = (k) => k.map((d) => !("children" in d) || d.children === void 0 ? d : {
    ...d,
    children: S(d.children)
  }), M = n(S(Gt({
    transformSettingTabs: l,
    transformLangConfig: x,
    extraPrivateRoutes: z,
    extraPublicRoutes: w
  }))), L = (k, d) => k.flatMap((m) => m.is_private ? [m] : [m]).map((m, y) => {
    const f = m.is_private ? /* @__PURE__ */ e.jsx(it, { element: /* @__PURE__ */ e.jsx(
      nn,
      {
        routes: M,
        element: m.element,
        transformLangConfig: x,
        menuStyle: I,
        transformHeaderItems: P,
        renderLayout: C,
        aiChatProps: b
      }
    ) }) : m.element;
    if ("children" in m && m.children && m.children.length > 0)
      return /* @__PURE__ */ e.jsx(ie, { path: m.path, element: f, children: L(m.children, m) }, m.path ?? m.name ?? y);
    const { path: O } = m;
    return /* @__PURE__ */ e.jsx(ie, { path: O, index: m.index, element: f }, O ?? m.name ?? `${(d == null ? void 0 : d.path) ?? ""}.${y}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Ue, { client: an, children: /* @__PURE__ */ e.jsx(Mt, { children: /* @__PURE__ */ e.jsx(Ye, { locale: _, children: /* @__PURE__ */ e.jsx(xt, { children: /* @__PURE__ */ e.jsx(yt, { children: /* @__PURE__ */ e.jsx(jt, { children: /* @__PURE__ */ e.jsx(Ke, { basename: pe(), children: /* @__PURE__ */ e.jsx(He, { children: L(M) }) }) }) }) }) }) }) });
}
const Cn = i(() => import("./ai-chat.js")), _n = i(() => import("./json-schema-config-form.js").then((n) => ({ default: n.JsonSchemaConfigForm }))), On = i(() => import("./json-schema-config-form.js").then((n) => ({ default: n.JsonSchemaConfigFormItem }))), Rn = i(() => import("./markdown-viewer.js")), Dn = i(() => import("./markdown-viewer.js").then((n) => ({ default: n.Code }))), Tn = {
  ...he,
  ...ue,
  ...ge,
  ...V,
  ...V,
  ...fe
};
export {
  Cn as A,
  _n as J,
  Rn as M,
  Nn as a,
  Tn as b,
  On as c,
  Dn as d,
  An as e,
  nn as f,
  r as w
};
