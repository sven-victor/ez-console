import { a as Le } from "./ai.js";
import { a as ce } from "./authorization.js";
import { b as de, g as he } from "./base.js";
import { a as E } from "./system.js";
import { o as ue } from "./oauth.js";
import { t as pe } from "./tasks.js";
import { j as e, d as Ne, a as _e, b as Ae, c as Oe, e as Ie, f as V, g as $e } from "./vendor.js";
import { QueryClient as Me, QueryClientProvider as Re } from "react-query";
import { useLocation as Be, useNavigate as Ce, Link as B, matchRoutes as te, Outlet as Te, BrowserRouter as De, Routes as Pe, Route as ie } from "react-router-dom";
import { Layout as K, Menu as C, Spin as Fe, Space as Ue, Button as Ee, Breadcrumb as Ve, ConfigProvider as Ke } from "antd";
import { useTranslation as H } from "react-i18next";
import { lazy as m, Suspense as He, useState as O, useEffect as I, useMemo as qe } from "react";
import { L as Qe, H as U, O as We, T as Ye, A as ne, a as Ge, P as Je } from "./components.js";
import { DashboardOutlined as Xe, SolutionOutlined as Ze, UserOutlined as T, SafetyOutlined as et, FileSearchOutlined as tt, SettingOutlined as it, SwapOutlined as nt, SunOutlined as ae, MoonOutlined as se, MenuUnfoldOutlined as at, MenuFoldOutlined as st } from "@ant-design/icons";
import { u as ot, b as rt, a as lt, c as mt, A as ct, S as dt, d as ht } from "./contexts.js";
import { flatMapDeep as ut } from "lodash-es";
import { A as pt, a as xt, b as gt } from "./ai-chat-layout.js";
import { createStyles as ft, useThemeMode as jt, ThemeProvider as yt } from "antd-style";
import u from "classnames";
import "./ai-chat.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const vt = m(() => import("./dashboard.js")), wt = m(() => import("./login.js")), bt = m(() => import("./profile.js")), oe = m(() => import("./not_found.js")), kt = m(() => import("./forbidden.js")), St = m(() => import("./users.js").then((i) => i.U)), zt = m(() => import("./users.js").then((i) => i.a)), re = m(() => import("./users.js").then((i) => i.b)), Lt = m(() => import("./roles.js").then((i) => i.R)), le = m(() => import("./roles.js").then((i) => i.a)), Nt = m(() => import("./system-settings.js").then((i) => i.i)), _t = m(() => import("./system-settings.js").then((i) => i.O)), At = m(() => import("./system-settings.js").then((i) => i.S)), Ot = m(() => import("./system-settings.js").then((i) => i.a)), It = m(() => import("./system-settings.js").then((i) => i.A)), $t = m(() => import("./system-settings.js").then((i) => i.b)), Mt = m(() => import("./audit.js")), Rt = m(() => import("./service-accounts.js").then((i) => i.S)), Bt = m(() => import("./service-accounts.js").then((i) => i.a)), Ct = m(() => import("./task_list.js")), Tt = m(() => import("./task_detail.js")), Dt = m(() => import("./task_schedule_list.js"));
function o(i, r) {
  return /* @__PURE__ */ e.jsx(He, { fallback: /* @__PURE__ */ e.jsx(Qe, {}), children: /* @__PURE__ */ e.jsx(i, { ...r }) });
}
const Pt = ({ transformSettingTabs: i, transformLangConfig: r, extraPrivateRoutes: f = [], extraPublicRoutes: z = [] }) => {
  const w = [
    {
      path: "/login",
      element: o(wt, { transformLangConfig: r }),
      index: !0
    },
    {
      path: "/404",
      element: o(oe),
      index: !0
    },
    {
      path: "/403",
      element: o(kt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o($t),
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
          element: o(vt),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(Xe, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(bt),
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
              element: o(Ct),
              permissions: ["task:list"],
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: o(Dt),
              permissions: ["task:schedule:list"],
              index: !0
            },
            {
              path: "/tasks/:id",
              element: o(Tt),
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
              icon: /* @__PURE__ */ e.jsx(Ze, {}),
              permissions: ["authorization:role:list"],
              children: [
                {
                  element: o(Lt),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: o(le),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: o(le),
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
                  element: o(St),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: o(re),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: o(zt),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: o(re),
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
                  element: o(Rt),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(Bt),
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
                  element: o(Nt, { transformItems: i })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(_t),
                  index: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: o(At),
                  index: !0
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: o(Ot),
                  index: !0
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: o(It),
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
              element: o(Mt)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: o(oe),
          index: !0
        }
      ]
    }
  ];
  return [...w, ...L];
}, yi = {
  ai: Le,
  authorization: ce,
  base: de,
  system: E,
  oauth: ue,
  tasks: pe
}, { Header: Ft, Content: Ut, Footer: Et, Sider: Vt } = K, { SubMenu: Kt } = C, Ht = ft(({ token: i, css: r }) => ({
  layout: r`
      min-height: 100vh;
      display: flex;
      flex-direction: row;
    `,
  header: r`
      padding: 0;
      display: flex;
      justify-content: space-between;
      background-color: ${i.colorBgContainer};
      border-block-end: 1px solid ${i.colorBorderSecondary};
    `,
  footer: r`
      text-align: center;
      padding: 15px 50px;
    `,
  contentContainer: r`
      padding: 24px;
      background-color: ${i.colorBgContainer};
    `,
  content: r`
      margin: 0 16px;
      height: calc(100vh - 120px);
      overflow: auto;
    `,
  mainLayout: r`
      flex: 1;
      min-width: 0;
      background-color: ${i.colorBgContainer};
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
      }
    `,
  layoutLogo: r`
      margin: 8px;
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
})), qt = ({
  element: i,
  siderWidth: r = 250,
  routes: f,
  transformLangConfig: z,
  menuStyle: w = "dark",
  transformHeaderItems: L = (b) => b,
  renderLayout: D,
  aiChatProps: $
}) => {
  const { themeMode: b, setThemeMode: p, isDarkMode: M } = jt(), { styles: c } = Ht(), { layout: k, visible: N, loaded: _, resetPageAIContext: S } = ot(), { t: h, i18n: s } = H(), { t: j } = H("common"), g = Be(), { hasPermission: A } = rt(), q = Ce(), { logout: xe, user: d } = lt(), { siteConfig: a, clearCurrentOrgId: ge } = mt(), [Q, W] = O([]), [fe, je] = O(null), [P, ye] = O("Loading...");
  I(() => {
    S();
  }, [g.pathname, S]), g.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? q("/profile#mfa") : d && d.status === "password_expired" && q("/profile#password"));
  const ve = () => {
    xe(), ge(), window.location.href = he("/login?redirect=" + encodeURIComponent(window.location.href));
  }, we = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(B, { to: "/profile", children: j("profile") })
    },
    {
      key: "logout",
      label: j("logout"),
      onClick: ve
    }
  ];
  I(() => {
    var n, l;
    if (a) {
      const v = ((n = a.navigation) == null ? void 0 : n.filter((x) => x.path !== a.home_page)) ?? [], t = [...a.home_page ? [{
        name: "home",
        path: a.home_page
      }] : [], ...v];
      t.length > 1 ? W(t) : W([]), je(a.logo), (l = document.getElementById("site-icon")) == null || l.setAttribute("href", a.logo);
    }
  }, [a]), I(() => {
    s.language && ye((a == null ? void 0 : a.name_i18n[s.language]) || (a == null ? void 0 : a.name) || "");
  }, [a, s.language]);
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
  }, be = (n) => n.some((l) => A(l)), ke = ut(f, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), Y = (n, l = []) => {
    const v = (t) => t && t.replace(/_/g, " ").split(" ").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !be(t.permissions))
        return null;
      const x = v(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const y = Y(t.children, [...l, t.name]);
        return y.length == 0 && t.path ? /* @__PURE__ */ e.jsx(C.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(B, { to: t.path, children: h(`menu.${[...l, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : /* @__PURE__ */ e.jsx(Kt, { icon: t.icon, title: h(`menu.${[...l, t.name, t.name].join(".")}`, { defaultValue: x }), children: y }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(C.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(B, { to: t.path, children: h(`menu.${[...l, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  I(() => {
    const n = F().filter((l) => l.path !== "/").map((l) => l.title).join(" - ");
    n ? document.title = `${P} | ${n}` : document.title = P;
  }, [F, g.pathname]);
  const Se = qe(() => {
    const n = te(f, g.pathname);
    if (n) {
      for (const l of n.reverse())
        if (l.route.path && l.route.name)
          return l.route.path;
    }
    return g.pathname;
  }, [g.pathname]), ze = [
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
        children: /* @__PURE__ */ e.jsx(nt, {})
      },
      "navigation-dropdown"
    ),
    ...a != null && a.enable_multi_org ? [/* @__PURE__ */ e.jsx(We, { className: "header-item org-switcher" }, "org-switcher")] : [],
    ...A("task:list") ? [/* @__PURE__ */ e.jsx(Ye, { className: "header-item task-dropdown" }, "task-dropdown")] : [],
    /* @__PURE__ */ e.jsxs(
      U,
      {
        className: "header-item user-dropdown",
        menu: { items: we },
        children: [
          d != null && d.avatar ? /* @__PURE__ */ e.jsx(ne, { src: d.avatar }) : /* @__PURE__ */ e.jsx(ne, { icon: /* @__PURE__ */ e.jsx(T, {}) }),
          /* @__PURE__ */ e.jsx("span", { className: u("header-user-name", c.userName), children: (d == null ? void 0 : d.full_name) || (d == null ? void 0 : d.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(Ge, { className: "header-item language-switch", transformLangConfig: z }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      U,
      {
        className: "header-item theme-switch",
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(ae, {}),
              " ",
              j("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(se, {}),
              " ",
              j("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: n }) => {
            p(n);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(ae, {}) : /* @__PURE__ */ e.jsx(se, {})
      },
      "theme-switch"
    )
  ];
  return (D ?? ((n, l, v, t, x) => {
    var J, X, Z;
    const [y, G] = O(!1);
    return /* @__PURE__ */ e.jsxs(K, { className: u("main-layout", c.layout), children: [
      /* @__PURE__ */ e.jsxs(Vt, { width: r, collapsible: !0, collapsed: y, onCollapse: G, className: u(c.menuSider, "layout-menu-sider"), theme: M ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: u("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: u("layout-logo-container", c.layoutLogoContainer), children: n ? /* @__PURE__ */ e.jsx("img", { src: n, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(Fe, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(C, { className: u("layout-menu", c.menu), theme: M ? "light" : w, defaultOpenKeys: ke, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [Se], children: l })
      ] }),
      /* @__PURE__ */ e.jsxs(K, { className: u("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(Ft, { className: u("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(Ue, { children: [
            /* @__PURE__ */ e.jsx(
              Ee,
              {
                type: "text",
                icon: y ? /* @__PURE__ */ e.jsx(at, {}) : /* @__PURE__ */ e.jsx(st, {}),
                onClick: () => G(!y),
                className: u("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(Ve, { className: u("site-breadcrumb", c.breadcrumb), itemRender: (R) => {
              const ee = R.href || R.path;
              return ee ? /* @__PURE__ */ e.jsx(B, { to: ee, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: u("header-items", c.headerItems), children: v })
        ] }),
        /* @__PURE__ */ e.jsxs(Ut, { className: u("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: u("site-content-container", c.contentContainer), children: x }),
          ((J = a == null ? void 0 : a.attrs) == null ? void 0 : J.ai_enabled) && /* @__PURE__ */ e.jsx(pt, {}),
          ((X = a == null ? void 0 : a.attrs) == null ? void 0 : X.ai_enabled) && k === "classic" && (N || _) && /* @__PURE__ */ e.jsx(xt, { ...$ })
        ] }),
        /* @__PURE__ */ e.jsxs(Et, { className: u("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          P
        ] })
      ] }),
      ((Z = a == null ? void 0 : a.attrs) == null ? void 0 : Z.ai_enabled) && (k === "sidebar" || k === "float-sidebar") && (N || _) && /* @__PURE__ */ e.jsx(gt, { ...$ })
    ] });
  }))(fe, Y(f), L(ze), F(), i ?? /* @__PURE__ */ e.jsx(Te, {}));
}, Qt = new Me({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), me = {
  "zh-CN": $e,
  "en-US": V,
  "de-DE": Ie,
  "es-ES": Oe,
  "fr-FR": Ae,
  "ar-AE": _e,
  "sv-SE": Ne
};
function vi({
  transformRouter: i = (p) => p,
  transformSettingTabs: r = (p) => p,
  transformLangConfig: f = (p) => p,
  extraPrivateRoutes: z = [],
  extraPublicRoutes: w = [],
  menuStyle: L = "dark",
  transformHeaderItems: D = (p) => p,
  renderLayout: $,
  aiChatProps: b
}) {
  const { i18n: p } = H(), [M, c] = O(me[p.language] || V);
  I(() => {
    c(me[p.language] || V);
  }, [p.language]);
  const k = (S) => S.map((h) => h.children === void 0 ? h : {
    ...h,
    children: k(h.children)
  }), N = i(k(Pt({
    transformSettingTabs: r,
    transformLangConfig: f,
    extraPrivateRoutes: z,
    extraPublicRoutes: w
  }))), _ = (S, h) => S.flatMap((s) => s.is_private ? [s] : "children" in s && s.children ? s.children : [s]).map((s, j) => {
    const g = s.is_private ? /* @__PURE__ */ e.jsx(Je, { element: /* @__PURE__ */ e.jsx(
      qt,
      {
        routes: N,
        element: s.element,
        transformLangConfig: f,
        menuStyle: L,
        transformHeaderItems: D,
        renderLayout: $,
        aiChatProps: b
      }
    ) }) : s.element;
    if ("children" in s && s.children && s.children.length > 0)
      return /* @__PURE__ */ e.jsx(ie, { path: s.path, element: g, children: _(s.children, s) }, s.path ?? s.name ?? j);
    const { path: A } = s;
    return /* @__PURE__ */ e.jsx(ie, { path: A, index: s.index, element: g }, A ?? s.name ?? `${(h == null ? void 0 : h.path) ?? ""}.${j}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Re, { client: Qt, children: /* @__PURE__ */ e.jsx(yt, { children: /* @__PURE__ */ e.jsx(Ke, { locale: M, children: /* @__PURE__ */ e.jsx(ct, { children: /* @__PURE__ */ e.jsx(dt, { children: /* @__PURE__ */ e.jsx(ht, { children: /* @__PURE__ */ e.jsx(De, { basename: he(), children: /* @__PURE__ */ e.jsx(Pe, { children: _(N) }) }) }) }) }) }) }) });
}
const wi = {
  ...ce,
  ...de,
  ...ue,
  ...E,
  ...E,
  ...pe
};
export {
  vi as A,
  yi as a,
  wi as b,
  qt as c,
  o as w
};
