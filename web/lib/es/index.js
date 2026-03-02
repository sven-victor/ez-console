import { a as ke } from "./ai.js";
import { a as le } from "./authorization.js";
import { b as me, g as ce } from "./base.js";
import { a as U } from "./system.js";
import { o as de } from "./oauth.js";
import { t as Se } from "./task_schedules.js";
import { t as ze } from "./tasks.js";
import { u as Le } from "./user_tasks.js";
import { j as e, d as Ne, a as _e, b as Ae, c as Oe, e as $e, f as E, g as Me } from "./vendor.js";
import { QueryClient as Ie, QueryClientProvider as Re } from "react-query";
import { useLocation as Be, useNavigate as Ce, Link as I, matchRoutes as Z, Outlet as Te, BrowserRouter as De, Routes as Pe, Route as ee } from "react-router-dom";
import { Layout as V, Menu as R, Spin as Fe, Space as Ue, Button as Ee, Breadcrumb as Ve, ConfigProvider as Ke } from "antd";
import { useTranslation as K } from "react-i18next";
import { lazy as m, Suspense as He, useState as O, useEffect as B, useMemo as qe } from "react";
import { L as Qe, H as F, O as We, T as Ye, A as te, a as Ge, P as Je } from "./components.js";
import { DashboardOutlined as Xe, SolutionOutlined as Ze, UserOutlined as C, SafetyOutlined as et, FileSearchOutlined as tt, SettingOutlined as it, SwapOutlined as st, SunOutlined as ie, MoonOutlined as se, MenuUnfoldOutlined as nt, MenuFoldOutlined as at } from "@ant-design/icons";
import { u as ot, b as rt, a as lt, c as mt, A as ct, S as dt, d as ht } from "./contexts.js";
import { flatMapDeep as ut } from "lodash-es";
import { A as pt, a as xt, b as gt } from "./ai-chat-layout.js";
import { createStyles as ft, useThemeMode as jt, ThemeProvider as yt } from "antd-style";
import h from "classnames";
import "./ai-chat.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const vt = m(() => import("./dashboard.js")), wt = m(() => import("./login.js")), bt = m(() => import("./profile.js")), ne = m(() => import("./not_found.js")), kt = m(() => import("./forbidden.js")), St = m(() => import("./users.js").then((i) => i.U)), zt = m(() => import("./users.js").then((i) => i.a)), ae = m(() => import("./users.js").then((i) => i.b)), Lt = m(() => import("./roles.js").then((i) => i.R)), oe = m(() => import("./roles.js").then((i) => i.a)), Nt = m(() => import("./system-settings.js").then((i) => i.i)), _t = m(() => import("./system-settings.js").then((i) => i.O)), At = m(() => import("./system-settings.js").then((i) => i.S)), Ot = m(() => import("./system-settings.js").then((i) => i.a)), $t = m(() => import("./system-settings.js").then((i) => i.b)), Mt = m(() => import("./audit.js")), It = m(() => import("./service-accounts.js").then((i) => i.S)), Rt = m(() => import("./service-accounts.js").then((i) => i.a)), Bt = m(() => import("./task_list.js")), Ct = m(() => import("./task_detail.js")), Tt = m(() => import("./task_schedule_list.js"));
function r(i, o) {
  return /* @__PURE__ */ e.jsx(He, { fallback: /* @__PURE__ */ e.jsx(Qe, {}), children: /* @__PURE__ */ e.jsx(i, { ...o }) });
}
const Dt = ({ transformSettingTabs: i, transformLangConfig: o, extraPrivateRoutes: g = [], extraPublicRoutes: S = [] }) => {
  const w = [
    {
      path: "/login",
      element: r(wt, { transformLangConfig: o }),
      index: !0
    },
    {
      path: "/404",
      element: r(ne),
      index: !0
    },
    {
      path: "/403",
      element: r(kt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: r($t),
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
          element: r(vt),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(Xe, {}),
          index: !0
        },
        {
          path: "/profile",
          element: r(bt),
          name: void 0,
          index: !0
        },
        ...g,
        {
          path: "/tasks",
          permissions: ["task:list", "task:schedule:list"],
          children: [
            {
              path: "/tasks",
              element: r(Bt),
              permissions: ["task:list"],
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: r(Tt),
              permissions: ["task:schedule:list"],
              index: !0
            },
            {
              path: "/tasks/:id",
              element: r(Ct),
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
              icon: /* @__PURE__ */ e.jsx(Ze, {}),
              permissions: ["authorization:role:list"],
              children: [
                {
                  element: r(Lt),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: r(oe),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: r(oe),
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
                  element: r(St),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: r(ae),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: r(zt),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: r(ae),
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
                  element: r(It),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: r(Rt),
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
          icon: /* @__PURE__ */ e.jsx(it, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view", "system:skills:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(et, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view", "system:skills:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: r(Nt, { transformItems: i })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: r(_t),
                  index: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: r(At),
                  index: !0
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: r(Ot),
                  index: !0
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(tt, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: r(Mt)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: r(ne),
          index: !0
        }
      ]
    }
  ];
  return [...w, ...z];
}, vi = {
  ai: ke,
  authorization: le,
  base: me,
  system: U,
  oauth: de,
  taskSchedules: Se,
  tasks: ze,
  userTasks: Le
}, { Header: Pt, Content: Ft, Footer: Ut, Sider: Et } = V, { SubMenu: Vt } = R, Kt = ft(({ token: i, css: o }) => ({
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
})), Ht = ({
  element: i,
  siderWidth: o = 250,
  routes: g,
  transformLangConfig: S,
  menuStyle: w = "dark",
  transformHeaderItems: z = (b) => b,
  renderLayout: T
}) => {
  const { themeMode: b, setThemeMode: u, isDarkMode: $ } = jt(), { styles: c } = Kt(), { layout: k, visible: L, loaded: N } = ot(), { t: f, i18n: p } = K(), { t: n } = K("common"), j = Be(), { hasPermission: _ } = rt(), A = Ce(), { logout: he, user: d } = lt(), { siteConfig: a, clearCurrentOrgId: ue } = mt(), [H, q] = O([]), [pe, xe] = O(null), [D, ge] = O("Loading...");
  j.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? A("/profile#mfa") : d && d.status === "password_expired" && A("/profile#password"));
  const fe = () => {
    he(), ue(), window.location.href = ce("/login?redirect=" + encodeURIComponent(window.location.href));
  }, je = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(I, { to: "/profile", children: n("profile") })
    },
    {
      key: "logout",
      label: n("logout"),
      onClick: fe
    }
  ];
  B(() => {
    var s, l;
    if (a) {
      const v = ((s = a.navigation) == null ? void 0 : s.filter((x) => x.path !== a.home_page)) ?? [], t = [...a.home_page ? [{
        name: "home",
        path: a.home_page
      }] : [], ...v];
      t.length > 1 ? q(t) : q([]), xe(a.logo), (l = document.getElementById("site-icon")) == null || l.setAttribute("href", a.logo);
    }
  }, [a]), B(() => {
    p.language && ge((a == null ? void 0 : a.name_i18n[p.language]) || (a == null ? void 0 : a.name) || "");
  }, [a, p.language]);
  const P = () => {
    const s = Z(g, j.pathname), l = [];
    if (s) {
      for (const [v, t] of s.entries())
        if (t.route.path === "/" && !t.route.name)
          l.push({
            href: t.route.path,
            title: n("home"),
            key: "home"
          });
        else if (t.route.name) {
          const x = s.slice(0, v + 1).map((y) => y.route.name).filter(Boolean).join(".");
          l.push({
            path: t.route.path,
            title: t.route.name ? f(`breadcrumbs.${x}`) : void 0,
            key: t.route.path
          });
        }
    }
    return l;
  }, ye = (s) => s.some((l) => _(l)), ve = ut(g, (s) => s.children).map((s) => s == null ? void 0 : s.name).filter((s) => s !== void 0), Q = (s, l = []) => {
    const v = (t) => t && t.replace(/_/g, " ").split(" ").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
    return s.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !ye(t.permissions))
        return null;
      const x = v(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const y = Q(t.children, [...l, t.name]);
        return y.length == 0 && t.path ? /* @__PURE__ */ e.jsx(R.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(I, { to: t.path, children: f(`menu.${[...l, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : /* @__PURE__ */ e.jsx(Vt, { icon: t.icon, title: f(`menu.${[...l, t.name, t.name].join(".")}`, { defaultValue: x }), children: y }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(R.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(I, { to: t.path, children: f(`menu.${[...l, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  B(() => {
    const s = P().filter((l) => l.path !== "/").map((l) => l.title).join(" - ");
    s ? document.title = `${D} | ${s}` : document.title = D;
  }, [P, j.pathname]);
  const we = qe(() => {
    const s = Z(g, j.pathname);
    if (s) {
      for (const l of s.reverse())
        if (l.route.path && l.route.name)
          return l.route.path;
    }
    return j.pathname;
  }, [j.pathname]), be = [
    /* @__PURE__ */ e.jsx(
      F,
      {
        className: "header-item navigation-dropdown",
        hidden: H.length <= 1,
        menu: {
          items: H.map((s) => ({
            key: s.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: s.path, children: f(`menu.${s.name}`, { defaultValue: s.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(st, {})
      },
      "navigation-dropdown"
    ),
    ...a != null && a.enable_multi_org ? [/* @__PURE__ */ e.jsx(We, { className: "header-item org-switcher" }, "org-switcher")] : [],
    ..._("task:list") ? [/* @__PURE__ */ e.jsx(Ye, { className: "header-item task-dropdown" }, "task-dropdown")] : [],
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
    /* @__PURE__ */ e.jsx(Ge, { className: "header-item language-switch", transformLangConfig: S }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      F,
      {
        className: "header-item theme-switch",
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(ie, {}),
              " ",
              n("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(se, {}),
              " ",
              n("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: s }) => {
            u(s);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(ie, {}) : /* @__PURE__ */ e.jsx(se, {})
      },
      "theme-switch"
    )
  ];
  return (T ?? ((s, l, v, t, x) => {
    var Y, G, J;
    const [y, W] = O(!1);
    return /* @__PURE__ */ e.jsxs(V, { className: h("main-layout", c.layout), children: [
      /* @__PURE__ */ e.jsxs(Et, { width: o, collapsible: !0, collapsed: y, onCollapse: W, className: h(c.menuSider, "layout-menu-sider"), theme: $ ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: h("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: h("layout-logo-container", c.layoutLogoContainer), children: s ? /* @__PURE__ */ e.jsx("img", { src: s, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(Fe, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(R, { className: h("layout-menu", c.menu), theme: $ ? "light" : w, defaultOpenKeys: ve, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [we], children: l })
      ] }),
      /* @__PURE__ */ e.jsxs(V, { className: h("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(Pt, { className: h("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(Ue, { children: [
            /* @__PURE__ */ e.jsx(
              Ee,
              {
                type: "text",
                icon: y ? /* @__PURE__ */ e.jsx(nt, {}) : /* @__PURE__ */ e.jsx(at, {}),
                onClick: () => W(!y),
                className: h("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(Ve, { className: h("site-breadcrumb", c.breadcrumb), itemRender: (M) => {
              const X = M.href || M.path;
              return X ? /* @__PURE__ */ e.jsx(I, { to: X, children: M.title }) : /* @__PURE__ */ e.jsx("span", { children: M.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: h("header-items", c.headerItems), children: v })
        ] }),
        /* @__PURE__ */ e.jsxs(Ft, { className: h("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: h("site-content-container", c.contentContainer), children: x }),
          ((Y = a == null ? void 0 : a.attrs) == null ? void 0 : Y.ai_enabled) && /* @__PURE__ */ e.jsx(pt, {}),
          ((G = a == null ? void 0 : a.attrs) == null ? void 0 : G.ai_enabled) && k === "classic" && (L || N) && /* @__PURE__ */ e.jsx(xt, {})
        ] }),
        /* @__PURE__ */ e.jsxs(Ut, { className: h("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          D
        ] })
      ] }),
      ((J = a == null ? void 0 : a.attrs) == null ? void 0 : J.ai_enabled) && (k === "sidebar" || k === "float-sidebar") && (L || N) && /* @__PURE__ */ e.jsx(gt, {})
    ] });
  }))(pe, Q(g), z(be), P(), i ?? /* @__PURE__ */ e.jsx(Te, {}));
}, qt = new Ie({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), re = {
  "zh-CN": Me,
  "en-US": E,
  "de-DE": $e,
  "es-ES": Oe,
  "fr-FR": Ae,
  "ar-AE": _e,
  "sv-SE": Ne
};
function wi({
  transformRouter: i = (u) => u,
  transformSettingTabs: o = (u) => u,
  transformLangConfig: g = (u) => u,
  extraPrivateRoutes: S = [],
  extraPublicRoutes: w = [],
  menuStyle: z = "dark",
  transformHeaderItems: T = (u) => u,
  renderLayout: b
}) {
  const { i18n: u } = K(), [$, c] = O(re[u.language] || E);
  B(() => {
    c(re[u.language] || E);
  }, [u.language]);
  const k = (f) => f.map((p) => p.children === void 0 ? p : {
    ...p,
    children: k(p.children)
  }), L = i(k(Dt({
    transformSettingTabs: o,
    transformLangConfig: g,
    extraPrivateRoutes: S,
    extraPublicRoutes: w
  }))), N = (f, p) => f.flatMap((n) => n.is_private ? [n] : "children" in n && n.children ? n.children : [n]).map((n, j) => {
    const _ = n.is_private ? /* @__PURE__ */ e.jsx(Je, { element: /* @__PURE__ */ e.jsx(
      Ht,
      {
        routes: L,
        element: n.element,
        transformLangConfig: g,
        menuStyle: z,
        transformHeaderItems: T,
        renderLayout: b
      }
    ) }) : n.element;
    if ("children" in n && n.children && n.children.length > 0)
      return /* @__PURE__ */ e.jsx(ee, { path: n.path, element: _, children: N(n.children, n) }, n.path ?? n.name ?? j);
    const { path: A } = n;
    return /* @__PURE__ */ e.jsx(ee, { path: A, index: n.index, element: _ }, A ?? n.name ?? `${(p == null ? void 0 : p.path) ?? ""}.${j}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Re, { client: qt, children: /* @__PURE__ */ e.jsx(yt, { children: /* @__PURE__ */ e.jsx(Ke, { locale: $, children: /* @__PURE__ */ e.jsx(ct, { children: /* @__PURE__ */ e.jsx(dt, { children: /* @__PURE__ */ e.jsx(ht, { children: /* @__PURE__ */ e.jsx(De, { basename: ce(), children: /* @__PURE__ */ e.jsx(Pe, { children: N(L) }) }) }) }) }) }) }) });
}
const bi = {
  ...le,
  ...me,
  ...de,
  ...U,
  ...U
};
export {
  wi as A,
  vi as a,
  bi as b,
  Ht as c,
  r as w
};
