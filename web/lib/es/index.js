import { a as ze } from "./ai.js";
import { a as ce } from "./authorization.js";
import { b as de, g as he } from "./base.js";
import { a as E } from "./system.js";
import { o as ue } from "./oauth.js";
import { t as Le } from "./task_schedules.js";
import { t as Ne } from "./tasks.js";
import { u as _e } from "./user_tasks.js";
import { j as e, d as Ae, a as Oe, b as $e, c as Ie, e as Me, f as V, g as Re } from "./vendor.js";
import { QueryClient as Be, QueryClientProvider as Ce } from "react-query";
import { useLocation as Te, useNavigate as De, Link as B, matchRoutes as te, Outlet as Pe, BrowserRouter as Fe, Routes as Ue, Route as ie } from "react-router-dom";
import { Layout as K, Menu as C, Spin as Ee, Space as Ve, Button as Ke, Breadcrumb as He, ConfigProvider as qe } from "antd";
import { useTranslation as H } from "react-i18next";
import { lazy as m, Suspense as Qe, useState as O, useEffect as $, useMemo as We } from "react";
import { L as Ye, H as U, O as Ge, T as Je, A as ne, a as Xe, P as Ze } from "./components.js";
import { DashboardOutlined as et, SolutionOutlined as tt, UserOutlined as T, SafetyOutlined as it, FileSearchOutlined as nt, SettingOutlined as st, SwapOutlined as at, SunOutlined as se, MoonOutlined as ae, MenuUnfoldOutlined as ot, MenuFoldOutlined as rt } from "@ant-design/icons";
import { u as lt, b as mt, a as ct, c as dt, A as ht, S as ut, d as pt } from "./contexts.js";
import { flatMapDeep as xt } from "lodash-es";
import { A as gt, a as ft, b as jt } from "./ai-chat-layout.js";
import { createStyles as yt, useThemeMode as vt, ThemeProvider as wt } from "antd-style";
import u from "classnames";
import "./ai-chat.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const bt = m(() => import("./dashboard.js")), kt = m(() => import("./login.js")), St = m(() => import("./profile.js")), oe = m(() => import("./not_found.js")), zt = m(() => import("./forbidden.js")), Lt = m(() => import("./users.js").then((i) => i.U)), Nt = m(() => import("./users.js").then((i) => i.a)), re = m(() => import("./users.js").then((i) => i.b)), _t = m(() => import("./roles.js").then((i) => i.R)), le = m(() => import("./roles.js").then((i) => i.a)), At = m(() => import("./system-settings.js").then((i) => i.i)), Ot = m(() => import("./system-settings.js").then((i) => i.O)), $t = m(() => import("./system-settings.js").then((i) => i.S)), It = m(() => import("./system-settings.js").then((i) => i.a)), Mt = m(() => import("./system-settings.js").then((i) => i.b)), Rt = m(() => import("./audit.js")), Bt = m(() => import("./service-accounts.js").then((i) => i.S)), Ct = m(() => import("./service-accounts.js").then((i) => i.a)), Tt = m(() => import("./task_list.js")), Dt = m(() => import("./task_detail.js")), Pt = m(() => import("./task_schedule_list.js"));
function r(i, o) {
  return /* @__PURE__ */ e.jsx(Qe, { fallback: /* @__PURE__ */ e.jsx(Ye, {}), children: /* @__PURE__ */ e.jsx(i, { ...o }) });
}
const Ft = ({ transformSettingTabs: i, transformLangConfig: o, extraPrivateRoutes: f = [], extraPublicRoutes: z = [] }) => {
  const w = [
    {
      path: "/login",
      element: r(kt, { transformLangConfig: o }),
      index: !0
    },
    {
      path: "/404",
      element: r(oe),
      index: !0
    },
    {
      path: "/403",
      element: r(zt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: r(Mt),
      index: !0
    },
    ...z
  ], L = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: r(bt),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(et, {}),
          index: !0
        },
        {
          path: "/profile",
          element: r(St),
          name: void 0,
          index: !0
        },
        ...f,
        {
          path: "/tasks",
          permissions: ["task:list", "task:schedule:list"],
          children: [
            {
              path: "/tasks",
              element: r(Tt),
              permissions: ["task:list"],
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: r(Pt),
              permissions: ["task:schedule:list"],
              index: !0
            },
            {
              path: "/tasks/:id",
              element: r(Dt),
              permissions: ["task:view"],
              index: !0
            }
          ]
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(T, {}),
          permissions: [
            "authorization:user:list",
            "authorization:service_account:list",
            "authorization:role:list"
          ],
          children: [
            // Role management
            {
              path: "/authorization/roles",
              name: "roles",
              icon: /* @__PURE__ */ e.jsx(tt, {}),
              permissions: ["authorization:role:list"],
              children: [
                {
                  element: r(_t),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: r(le),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: r(le),
                  permissions: ["authorization:role:update"],
                  index: !0
                }
              ]
            },
            // User management
            {
              path: "/authorization/users",
              name: "users",
              icon: /* @__PURE__ */ e.jsx(T, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: r(Lt),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: r(re),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: r(Nt),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: r(re),
                  permissions: ["authorization:user:update"],
                  index: !0
                }
              ]
            },
            // Service account management
            {
              path: "/authorization/service-accounts",
              name: "serviceAccounts",
              icon: /* @__PURE__ */ e.jsx(T, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: r(Bt),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: r(Ct),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                }
              ]
            }
          ]
        },
        // System management menu
        {
          name: "system",
          icon: /* @__PURE__ */ e.jsx(st, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view", "system:skills:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(it, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view", "system:skills:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: r(At, { transformItems: i })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: r(Ot),
                  index: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: r($t),
                  index: !0
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: r(It),
                  index: !0
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(nt, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: r(Rt)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: r(oe),
          index: !0
        }
      ]
    }
  ];
  return [...w, ...L];
}, bi = {
  ai: ze,
  authorization: ce,
  base: de,
  system: E,
  oauth: ue,
  taskSchedules: Le,
  tasks: Ne,
  userTasks: _e
}, { Header: Ut, Content: Et, Footer: Vt, Sider: Kt } = K, { SubMenu: Ht } = C, qt = yt(({ token: i, css: o }) => ({
  layout: o`
      min-height: 100vh;
      display: flex;
      flex-direction: row;
    `,
  header: o`
      padding: 0;
      display: flex;
      justify-content: space-between;
      background-color: ${i.colorBgContainer};
      border-block-end: 1px solid ${i.colorBorderSecondary};
    `,
  footer: o`
      text-align: center;
      padding: 15px 50px;
    `,
  contentContainer: o`
      padding: 24px;
      background-color: ${i.colorBgContainer};
    `,
  content: o`
      margin: 0 16px;
      height: calc(100vh - 120px);
      overflow: auto;
    `,
  mainLayout: o`
      flex: 1;
      min-width: 0;
      background-color: ${i.colorBgContainer};
    `,
  breadcrumb: o`
      margin-left: 8px;
    `,
  headerItems: o`
      margin-right: 20px;
    `,
  userName: o`
      height: 1em;
      line-height: 1em;
      margin-left: 5px;
    `,
  themeSwitch: o`
      display: inline-flex;
    `,
  menuSider: o`
      .ant-layout-sider-children{
        display: flex;
        flex-direction: column;
      }
    `,
  menuToggleButton: o`
      &&{
        font-size: 16px;
        width: 64px;
        height: 64px;
      }
    `,
  layoutLogo: o`
      margin: 8px;
      display: flex;
    `,
  layoutLogoContainer: o`
      width: 100%;
      height: 100%;
      text-align: center;
    `,
  layoutLogoImage: o`
      height: 32px;
      width: 32px;
    `,
  menu: o`
      flex: 1 1 0%;
    `
})), Qt = ({
  element: i,
  siderWidth: o = 250,
  routes: f,
  transformLangConfig: z,
  menuStyle: w = "dark",
  transformHeaderItems: L = (b) => b,
  renderLayout: D,
  aiChatProps: I
}) => {
  const { themeMode: b, setThemeMode: p, isDarkMode: M } = vt(), { styles: c } = qt(), { layout: k, visible: N, loaded: _, resetPageAIContext: S } = lt(), { t: h, i18n: a } = H(), { t: j } = H("common"), g = Te(), { hasPermission: A } = mt(), q = De(), { logout: pe, user: d } = ct(), { siteConfig: s, clearCurrentOrgId: xe } = dt(), [Q, W] = O([]), [ge, fe] = O(null), [P, je] = O("Loading...");
  $(() => {
    S();
  }, [g.pathname, S]), g.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? q("/profile#mfa") : d && d.status === "password_expired" && q("/profile#password"));
  const ye = () => {
    pe(), xe(), window.location.href = he("/login?redirect=" + encodeURIComponent(window.location.href));
  }, ve = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(B, { to: "/profile", children: j("profile") })
    },
    {
      key: "logout",
      label: j("logout"),
      onClick: ye
    }
  ];
  $(() => {
    var n, l;
    if (s) {
      const v = ((n = s.navigation) == null ? void 0 : n.filter((x) => x.path !== s.home_page)) ?? [], t = [...s.home_page ? [{
        name: "home",
        path: s.home_page
      }] : [], ...v];
      t.length > 1 ? W(t) : W([]), fe(s.logo), (l = document.getElementById("site-icon")) == null || l.setAttribute("href", s.logo);
    }
  }, [s]), $(() => {
    a.language && je((s == null ? void 0 : s.name_i18n[a.language]) || (s == null ? void 0 : s.name) || "");
  }, [s, a.language]);
  const F = () => {
    const n = te(f, g.pathname), l = [];
    if (n) {
      for (const [v, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          l.push({
            href: t.route.path,
            title: j("home"),
            key: "home"
          });
        else if (t.route.name) {
          const x = n.slice(0, v + 1).map((y) => y.route.name).filter(Boolean).join(".");
          l.push({
            path: t.route.path,
            title: t.route.name ? h(`breadcrumbs.${x}`) : void 0,
            key: t.route.path
          });
        }
    }
    return l;
  }, we = (n) => n.some((l) => A(l)), be = xt(f, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), Y = (n, l = []) => {
    const v = (t) => t && t.replace(/_/g, " ").split(" ").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !we(t.permissions))
        return null;
      const x = v(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const y = Y(t.children, [...l, t.name]);
        return y.length == 0 && t.path ? /* @__PURE__ */ e.jsx(C.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(B, { to: t.path, children: h(`menu.${[...l, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : /* @__PURE__ */ e.jsx(Ht, { icon: t.icon, title: h(`menu.${[...l, t.name, t.name].join(".")}`, { defaultValue: x }), children: y }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(C.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(B, { to: t.path, children: h(`menu.${[...l, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  $(() => {
    const n = F().filter((l) => l.path !== "/").map((l) => l.title).join(" - ");
    n ? document.title = `${P} | ${n}` : document.title = P;
  }, [F, g.pathname]);
  const ke = We(() => {
    const n = te(f, g.pathname);
    if (n) {
      for (const l of n.reverse())
        if (l.route.path && l.route.name)
          return l.route.path;
    }
    return g.pathname;
  }, [g.pathname]), Se = [
    /* @__PURE__ */ e.jsx(
      U,
      {
        className: "header-item navigation-dropdown",
        hidden: Q.length <= 1,
        menu: {
          items: Q.map((n) => ({
            key: n.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: h(`menu.${n.name}`, { defaultValue: n.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(at, {})
      },
      "navigation-dropdown"
    ),
    ...s != null && s.enable_multi_org ? [/* @__PURE__ */ e.jsx(Ge, { className: "header-item org-switcher" }, "org-switcher")] : [],
    ...A("task:list") ? [/* @__PURE__ */ e.jsx(Je, { className: "header-item task-dropdown" }, "task-dropdown")] : [],
    /* @__PURE__ */ e.jsxs(
      U,
      {
        className: "header-item user-dropdown",
        menu: { items: ve },
        children: [
          d != null && d.avatar ? /* @__PURE__ */ e.jsx(ne, { src: d.avatar }) : /* @__PURE__ */ e.jsx(ne, { icon: /* @__PURE__ */ e.jsx(T, {}) }),
          /* @__PURE__ */ e.jsx("span", { className: u("header-user-name", c.userName), children: (d == null ? void 0 : d.full_name) || (d == null ? void 0 : d.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(Xe, { className: "header-item language-switch", transformLangConfig: z }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      U,
      {
        className: "header-item theme-switch",
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(se, {}),
              " ",
              j("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(ae, {}),
              " ",
              j("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: n }) => {
            p(n);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(se, {}) : /* @__PURE__ */ e.jsx(ae, {})
      },
      "theme-switch"
    )
  ];
  return (D ?? ((n, l, v, t, x) => {
    var J, X, Z;
    const [y, G] = O(!1);
    return /* @__PURE__ */ e.jsxs(K, { className: u("main-layout", c.layout), children: [
      /* @__PURE__ */ e.jsxs(Kt, { width: o, collapsible: !0, collapsed: y, onCollapse: G, className: u(c.menuSider, "layout-menu-sider"), theme: M ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: u("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: u("layout-logo-container", c.layoutLogoContainer), children: n ? /* @__PURE__ */ e.jsx("img", { src: n, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(Ee, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(C, { className: u("layout-menu", c.menu), theme: M ? "light" : w, defaultOpenKeys: be, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [ke], children: l })
      ] }),
      /* @__PURE__ */ e.jsxs(K, { className: u("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(Ut, { className: u("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(Ve, { children: [
            /* @__PURE__ */ e.jsx(
              Ke,
              {
                type: "text",
                icon: y ? /* @__PURE__ */ e.jsx(ot, {}) : /* @__PURE__ */ e.jsx(rt, {}),
                onClick: () => G(!y),
                className: u("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(He, { className: u("site-breadcrumb", c.breadcrumb), itemRender: (R) => {
              const ee = R.href || R.path;
              return ee ? /* @__PURE__ */ e.jsx(B, { to: ee, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: u("header-items", c.headerItems), children: v })
        ] }),
        /* @__PURE__ */ e.jsxs(Et, { className: u("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: u("site-content-container", c.contentContainer), children: x }),
          ((J = s == null ? void 0 : s.attrs) == null ? void 0 : J.ai_enabled) && /* @__PURE__ */ e.jsx(gt, {}),
          ((X = s == null ? void 0 : s.attrs) == null ? void 0 : X.ai_enabled) && k === "classic" && (N || _) && /* @__PURE__ */ e.jsx(ft, { ...I })
        ] }),
        /* @__PURE__ */ e.jsxs(Vt, { className: u("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          P
        ] })
      ] }),
      ((Z = s == null ? void 0 : s.attrs) == null ? void 0 : Z.ai_enabled) && (k === "sidebar" || k === "float-sidebar") && (N || _) && /* @__PURE__ */ e.jsx(jt, { ...I })
    ] });
  }))(ge, Y(f), L(Se), F(), i ?? /* @__PURE__ */ e.jsx(Pe, {}));
}, Wt = new Be({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), me = {
  "zh-CN": Re,
  "en-US": V,
  "de-DE": Me,
  "es-ES": Ie,
  "fr-FR": $e,
  "ar-AE": Oe,
  "sv-SE": Ae
};
function ki({
  transformRouter: i = (p) => p,
  transformSettingTabs: o = (p) => p,
  transformLangConfig: f = (p) => p,
  extraPrivateRoutes: z = [],
  extraPublicRoutes: w = [],
  menuStyle: L = "dark",
  transformHeaderItems: D = (p) => p,
  renderLayout: I,
  aiChatProps: b
}) {
  const { i18n: p } = H(), [M, c] = O(me[p.language] || V);
  $(() => {
    c(me[p.language] || V);
  }, [p.language]);
  const k = (S) => S.map((h) => h.children === void 0 ? h : {
    ...h,
    children: k(h.children)
  }), N = i(k(Ft({
    transformSettingTabs: o,
    transformLangConfig: f,
    extraPrivateRoutes: z,
    extraPublicRoutes: w
  }))), _ = (S, h) => S.flatMap((a) => a.is_private ? [a] : "children" in a && a.children ? a.children : [a]).map((a, j) => {
    const g = a.is_private ? /* @__PURE__ */ e.jsx(Ze, { element: /* @__PURE__ */ e.jsx(
      Qt,
      {
        routes: N,
        element: a.element,
        transformLangConfig: f,
        menuStyle: L,
        transformHeaderItems: D,
        renderLayout: I,
        aiChatProps: b
      }
    ) }) : a.element;
    if ("children" in a && a.children && a.children.length > 0)
      return /* @__PURE__ */ e.jsx(ie, { path: a.path, element: g, children: _(a.children, a) }, a.path ?? a.name ?? j);
    const { path: A } = a;
    return /* @__PURE__ */ e.jsx(ie, { path: A, index: a.index, element: g }, A ?? a.name ?? `${(h == null ? void 0 : h.path) ?? ""}.${j}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Ce, { client: Wt, children: /* @__PURE__ */ e.jsx(wt, { children: /* @__PURE__ */ e.jsx(qe, { locale: M, children: /* @__PURE__ */ e.jsx(ht, { children: /* @__PURE__ */ e.jsx(ut, { children: /* @__PURE__ */ e.jsx(pt, { children: /* @__PURE__ */ e.jsx(Fe, { basename: he(), children: /* @__PURE__ */ e.jsx(Ue, { children: _(N) }) }) }) }) }) }) }) });
}
const Si = {
  ...ce,
  ...de,
  ...ue,
  ...E,
  ...E
};
export {
  ki as A,
  bi as a,
  Si as b,
  Qt as c,
  r as w
};
