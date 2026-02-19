import { a as ke } from "./ai.js";
import { a as le } from "./authorization.js";
import { b as me, g as ce } from "./base.js";
import { a as U } from "./system.js";
import { o as de } from "./oauth.js";
import { t as Se } from "./tasks.js";
import { u as ze } from "./user_tasks.js";
import { j as e, d as Le, b as Ne, c as _e, e as Ae, f as Oe, g as E, h as $e } from "./vendor.js";
import { QueryClient as Me, QueryClientProvider as Ie } from "react-query";
import { useLocation as Re, useNavigate as Be, Link as I, matchRoutes as Z, Outlet as Ce, BrowserRouter as De, Routes as Pe, Route as ee } from "react-router-dom";
import { Layout as V, Menu as R, Spin as Te, Space as Fe, Button as Ue, Breadcrumb as Ee, ConfigProvider as Ve } from "antd";
import { useTranslation as K } from "react-i18next";
import { lazy as m, Suspense as Ke, useState as O, useEffect as B, useMemo as He } from "react";
import { L as qe, H as F, O as Qe, T as We, A as te, a as Ye, P as Ge } from "./components.js";
import { DashboardOutlined as Je, SolutionOutlined as Xe, UserOutlined as C, SafetyOutlined as Ze, FileSearchOutlined as et, SettingOutlined as tt, SwapOutlined as it, SunOutlined as ie, MoonOutlined as ne, MenuUnfoldOutlined as nt, MenuFoldOutlined as at } from "@ant-design/icons";
import { u as st, b as ot, a as rt, c as lt, A as mt, S as ct, e as dt } from "./contexts.js";
import { flatMapDeep as ht } from "lodash-es";
import { A as ut, a as pt, b as xt } from "./ai-chat-layout.js";
import { createStyles as gt, useThemeMode as ft, ThemeProvider as jt } from "antd-style";
import h from "classnames";
import "./ai-chat.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const yt = m(() => import("./dashboard.js")), vt = m(() => import("./login.js")), wt = m(() => import("./profile.js")), ae = m(() => import("./not_found.js")), bt = m(() => import("./forbidden.js")), kt = m(() => import("./users.js").then((i) => i.U)), St = m(() => import("./users.js").then((i) => i.a)), se = m(() => import("./users.js").then((i) => i.b)), zt = m(() => import("./roles.js").then((i) => i.R)), oe = m(() => import("./roles.js").then((i) => i.a)), Lt = m(() => import("./system-settings.js").then((i) => i.i)), Nt = m(() => import("./system-settings.js").then((i) => i.O)), _t = m(() => import("./system-settings.js").then((i) => i.S)), At = m(() => import("./system-settings.js").then((i) => i.a)), Ot = m(() => import("./system-settings.js").then((i) => i.b)), $t = m(() => import("./audit.js")), Mt = m(() => import("./service-accounts.js").then((i) => i.S)), It = m(() => import("./service-accounts.js").then((i) => i.a)), Rt = m(() => import("./task_list.js")), Bt = m(() => import("./task_detail.js"));
function l(i, o) {
  return /* @__PURE__ */ e.jsx(Ke, { fallback: /* @__PURE__ */ e.jsx(qe, {}), children: /* @__PURE__ */ e.jsx(i, { ...o }) });
}
const Ct = ({ transformSettingTabs: i, transformLangConfig: o, extraPrivateRoutes: g = [], extraPublicRoutes: S = [] }) => {
  const w = [
    {
      path: "/login",
      element: l(vt, { transformLangConfig: o }),
      index: !0
    },
    {
      path: "/404",
      element: l(ae),
      index: !0
    },
    {
      path: "/403",
      element: l(bt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: l(Ot),
      index: !0
    },
    ...S
  ], z = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: l(yt),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(Je, {}),
          index: !0
        },
        {
          path: "/profile",
          element: l(wt),
          name: void 0,
          index: !0
        },
        ...g,
        {
          path: "/tasks",
          permissions: ["task:list"],
          children: [
            {
              path: "/tasks",
              element: l(Rt),
              permissions: ["task:list"],
              index: !0
            },
            {
              path: "/tasks/:id",
              element: l(Bt),
              permissions: ["task:view"],
              index: !0
            }
          ]
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(C, {}),
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
              icon: /* @__PURE__ */ e.jsx(Xe, {}),
              permissions: ["authorization:role:list"],
              children: [
                {
                  element: l(zt),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: l(oe),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: l(oe),
                  permissions: ["authorization:role:update"],
                  index: !0
                }
              ]
            },
            // User management
            {
              path: "/authorization/users",
              name: "users",
              icon: /* @__PURE__ */ e.jsx(C, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: l(kt),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: l(se),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: l(St),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: l(se),
                  permissions: ["authorization:user:update"],
                  index: !0
                }
              ]
            },
            // Service account management
            {
              path: "/authorization/service-accounts",
              name: "serviceAccounts",
              icon: /* @__PURE__ */ e.jsx(C, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: l(Mt),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: l(It),
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
          icon: /* @__PURE__ */ e.jsx(tt, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view", "system:skills:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(Ze, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view", "system:skills:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: l(Lt, { transformItems: i })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: l(Nt),
                  index: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: l(_t),
                  index: !0
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: l(At),
                  index: !0
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(et, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: l($t)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: l(ae),
          index: !0
        }
      ]
    }
  ];
  return [...w, ...z];
}, fi = {
  ai: ke,
  authorization: le,
  base: me,
  system: U,
  oauth: de,
  tasks: Se,
  userTasks: ze
}, { Header: Dt, Content: Pt, Footer: Tt, Sider: Ft } = V, { SubMenu: Ut } = R, Et = gt(({ token: i, css: o }) => ({
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
})), Vt = ({
  element: i,
  siderWidth: o = 250,
  routes: g,
  transformLangConfig: S,
  menuStyle: w = "dark",
  transformHeaderItems: z = (b) => b,
  renderLayout: D
}) => {
  const { themeMode: b, setThemeMode: u, isDarkMode: $ } = ft(), { styles: c } = Et(), { layout: k, visible: L, loaded: N } = st(), { t: f, i18n: p } = K(), { t: a } = K("common"), j = Re(), { hasPermission: _ } = ot(), A = Be(), { logout: he, user: d } = rt(), { siteConfig: s, clearCurrentOrgId: ue } = lt(), [H, q] = O([]), [pe, xe] = O(null), [P, ge] = O("Loading...");
  j.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? A("/profile#mfa") : d && d.status === "password_expired" && A("/profile#password"));
  const fe = () => {
    he(), ue(), window.location.href = ce("/login?redirect=" + encodeURIComponent(window.location.href));
  }, je = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(I, { to: "/profile", children: a("profile") })
    },
    {
      key: "logout",
      label: a("logout"),
      onClick: fe
    }
  ];
  B(() => {
    var n, r;
    if (s) {
      const v = ((n = s.navigation) == null ? void 0 : n.filter((x) => x.path !== s.home_page)) ?? [], t = [...s.home_page ? [{
        name: "home",
        path: s.home_page
      }] : [], ...v];
      t.length > 1 ? q(t) : q([]), xe(s.logo), (r = document.getElementById("site-icon")) == null || r.setAttribute("href", s.logo);
    }
  }, [s]), B(() => {
    p.language && ge((s == null ? void 0 : s.name_i18n[p.language]) || (s == null ? void 0 : s.name) || "");
  }, [s, p.language]);
  const T = () => {
    const n = Z(g, j.pathname), r = [];
    if (n) {
      for (const [v, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          r.push({
            href: t.route.path,
            title: a("home"),
            key: "home"
          });
        else if (t.route.name) {
          const x = n.slice(0, v + 1).map((y) => y.route.name).filter(Boolean).join(".");
          r.push({
            path: t.route.path,
            title: t.route.name ? f(`breadcrumbs.${x}`) : void 0,
            key: t.route.path
          });
        }
    }
    return r;
  }, ye = (n) => n.some((r) => _(r)), ve = ht(g, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), Q = (n, r = []) => {
    const v = (t) => t && t.replace(/_/g, " ").split(" ").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !ye(t.permissions))
        return null;
      const x = v(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const y = Q(t.children, [...r, t.name]);
        return y.length == 0 && t.path ? /* @__PURE__ */ e.jsx(R.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(I, { to: t.path, children: f(`menu.${[...r, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : /* @__PURE__ */ e.jsx(Ut, { icon: t.icon, title: f(`menu.${[...r, t.name, t.name].join(".")}`, { defaultValue: x }), children: y }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(R.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(I, { to: t.path, children: f(`menu.${[...r, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  B(() => {
    const n = T().filter((r) => r.path !== "/").map((r) => r.title).join(" - ");
    n ? document.title = `${P} | ${n}` : document.title = P;
  }, [T, j.pathname]);
  const we = He(() => {
    const n = Z(g, j.pathname);
    if (n) {
      for (const r of n.reverse())
        if (r.route.path && r.route.name)
          return r.route.path;
    }
    return j.pathname;
  }, [j.pathname]), be = [
    /* @__PURE__ */ e.jsx(
      F,
      {
        className: "header-item navigation-dropdown",
        hidden: H.length <= 1,
        menu: {
          items: H.map((n) => ({
            key: n.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: f(`menu.${n.name}`, { defaultValue: n.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(it, {})
      },
      "navigation-dropdown"
    ),
    ...s != null && s.enable_multi_org ? [/* @__PURE__ */ e.jsx(Qe, { className: "header-item org-switcher" }, "org-switcher")] : [],
    ..._("task:list") ? [/* @__PURE__ */ e.jsx(We, { className: "header-item task-dropdown" }, "task-dropdown")] : [],
    /* @__PURE__ */ e.jsxs(
      F,
      {
        className: "header-item user-dropdown",
        menu: { items: je },
        children: [
          d != null && d.avatar ? /* @__PURE__ */ e.jsx(te, { src: d.avatar }) : /* @__PURE__ */ e.jsx(te, { icon: /* @__PURE__ */ e.jsx(C, {}) }),
          /* @__PURE__ */ e.jsx("span", { className: h("header-user-name", c.userName), children: (d == null ? void 0 : d.full_name) || (d == null ? void 0 : d.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(Ye, { className: "header-item language-switch", transformLangConfig: S }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      F,
      {
        className: "header-item theme-switch",
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(ie, {}),
              " ",
              a("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(ne, {}),
              " ",
              a("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: n }) => {
            u(n);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(ie, {}) : /* @__PURE__ */ e.jsx(ne, {})
      },
      "theme-switch"
    )
  ];
  return (D ?? ((n, r, v, t, x) => {
    var Y, G, J;
    const [y, W] = O(!1);
    return /* @__PURE__ */ e.jsxs(V, { className: h("main-layout", c.layout), children: [
      /* @__PURE__ */ e.jsxs(Ft, { width: o, collapsible: !0, collapsed: y, onCollapse: W, className: h(c.menuSider, "layout-menu-sider"), theme: $ ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: h("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: h("layout-logo-container", c.layoutLogoContainer), children: n ? /* @__PURE__ */ e.jsx("img", { src: n, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(Te, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(R, { className: h("layout-menu", c.menu), theme: $ ? "light" : w, defaultOpenKeys: ve, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [we], children: r })
      ] }),
      /* @__PURE__ */ e.jsxs(V, { className: h("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(Dt, { className: h("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(Fe, { children: [
            /* @__PURE__ */ e.jsx(
              Ue,
              {
                type: "text",
                icon: y ? /* @__PURE__ */ e.jsx(nt, {}) : /* @__PURE__ */ e.jsx(at, {}),
                onClick: () => W(!y),
                className: h("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(Ee, { className: h("site-breadcrumb", c.breadcrumb), itemRender: (M) => {
              const X = M.href || M.path;
              return X ? /* @__PURE__ */ e.jsx(I, { to: X, children: M.title }) : /* @__PURE__ */ e.jsx("span", { children: M.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: h("header-items", c.headerItems), children: v })
        ] }),
        /* @__PURE__ */ e.jsxs(Pt, { className: h("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: h("site-content-container", c.contentContainer), children: x }),
          ((Y = s == null ? void 0 : s.attrs) == null ? void 0 : Y.ai_enabled) && /* @__PURE__ */ e.jsx(ut, {}),
          ((G = s == null ? void 0 : s.attrs) == null ? void 0 : G.ai_enabled) && k === "classic" && (L || N) && /* @__PURE__ */ e.jsx(pt, {})
        ] }),
        /* @__PURE__ */ e.jsxs(Tt, { className: h("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          P
        ] })
      ] }),
      ((J = s == null ? void 0 : s.attrs) == null ? void 0 : J.ai_enabled) && (k === "sidebar" || k === "float-sidebar") && (L || N) && /* @__PURE__ */ e.jsx(xt, {})
    ] });
  }))(pe, Q(g), z(be), T(), i ?? /* @__PURE__ */ e.jsx(Ce, {}));
}, Kt = new Me({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), re = {
  "zh-CN": $e,
  "en-US": E,
  "de-DE": Oe,
  "es-ES": Ae,
  "fr-FR": _e,
  "ar-AE": Ne,
  "sv-SE": Le
};
function ji({
  transformRouter: i = (u) => u,
  transformSettingTabs: o = (u) => u,
  transformLangConfig: g = (u) => u,
  extraPrivateRoutes: S = [],
  extraPublicRoutes: w = [],
  menuStyle: z = "dark",
  transformHeaderItems: D = (u) => u,
  renderLayout: b
}) {
  const { i18n: u } = K(), [$, c] = O(re[u.language] || E);
  B(() => {
    c(re[u.language] || E);
  }, [u.language]);
  const k = (f) => f.map((p) => p.children === void 0 ? p : {
    ...p,
    children: k(p.children)
  }), L = i(k(Ct({
    transformSettingTabs: o,
    transformLangConfig: g,
    extraPrivateRoutes: S,
    extraPublicRoutes: w
  }))), N = (f, p) => f.flatMap((a) => a.is_private ? [a] : "children" in a && a.children ? a.children : [a]).map((a, j) => {
    const _ = a.is_private ? /* @__PURE__ */ e.jsx(Ge, { element: /* @__PURE__ */ e.jsx(
      Vt,
      {
        routes: L,
        element: a.element,
        transformLangConfig: g,
        menuStyle: z,
        transformHeaderItems: D,
        renderLayout: b
      }
    ) }) : a.element;
    if ("children" in a && a.children && a.children.length > 0)
      return /* @__PURE__ */ e.jsx(ee, { path: a.path, element: _, children: N(a.children, a) }, a.path ?? a.name ?? j);
    const { path: A } = a;
    return /* @__PURE__ */ e.jsx(ee, { path: A, index: a.index, element: _ }, A ?? a.name ?? `${(p == null ? void 0 : p.path) ?? ""}.${j}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Ie, { client: Kt, children: /* @__PURE__ */ e.jsx(jt, { children: /* @__PURE__ */ e.jsx(Ve, { locale: $, children: /* @__PURE__ */ e.jsx(mt, { children: /* @__PURE__ */ e.jsx(ct, { children: /* @__PURE__ */ e.jsx(dt, { children: /* @__PURE__ */ e.jsx(De, { basename: ce(), children: /* @__PURE__ */ e.jsx(Pe, { children: N(L) }) }) }) }) }) }) }) });
}
const yi = {
  ...le,
  ...me,
  ...de,
  ...U,
  ...U
};
export {
  ji as A,
  fi as a,
  yi as b,
  Vt as c,
  l as w
};
