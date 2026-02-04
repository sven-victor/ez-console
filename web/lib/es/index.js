import { a as Se } from "./ai.js";
import { a as le } from "./authorization.js";
import { b as me, g as ce } from "./base.js";
import { a as E } from "./system.js";
import { o as de } from "./oauth.js";
import { j as e, d as ze, b as Le, c as Ne, e as ke, f as _e, g as T, h as Ae } from "./vendor.js";
import { QueryClient as Oe, QueryClientProvider as $e } from "react-query";
import { useLocation as Me, useNavigate as Ie, Link as I, matchRoutes as Z, Outlet as Re, BrowserRouter as Be, Routes as Ce, Route as ee } from "react-router-dom";
import { Layout as V, Menu as R, Spin as Pe, Space as De, Button as Fe, Breadcrumb as Ue, ConfigProvider as Ee } from "antd";
import { useTranslation as K } from "react-i18next";
import { lazy as m, Suspense as Te, useState as A, useEffect as B, useMemo as Ve } from "react";
import { L as Ke, H as U, O as He, A as te, a as qe, P as Qe } from "./components.js";
import { DashboardOutlined as We, SolutionOutlined as Ye, UserOutlined as C, SafetyOutlined as Ge, FileSearchOutlined as Je, SettingOutlined as Xe, SwapOutlined as Ze, SunOutlined as ie, MoonOutlined as ne, MenuUnfoldOutlined as et, MenuFoldOutlined as tt } from "@ant-design/icons";
import { u as it, b as nt, a as at, c as st, A as ot, S as rt, e as lt } from "./contexts.js";
import { flatMapDeep as mt } from "lodash-es";
import { A as ct, a as dt, b as ht } from "./ai-chat-layout.js";
import { createStyles as ut, useThemeMode as pt, ThemeProvider as xt } from "antd-style";
import h from "classnames";
import "./ai-chat.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const gt = m(() => import("./dashboard.js")), ft = m(() => import("./login.js")), jt = m(() => import("./profile.js")), ae = m(() => import("./not_found.js")), yt = m(() => import("./forbidden.js")), vt = m(() => import("./users.js").then((i) => i.U)), wt = m(() => import("./users.js").then((i) => i.a)), se = m(() => import("./users.js").then((i) => i.b)), bt = m(() => import("./roles.js").then((i) => i.R)), oe = m(() => import("./roles.js").then((i) => i.a)), St = m(() => import("./system-settings.js").then((i) => i.i)), zt = m(() => import("./system-settings.js").then((i) => i.O)), Lt = m(() => import("./system-settings.js").then((i) => i.S)), Nt = m(() => import("./system-settings.js").then((i) => i.a)), kt = m(() => import("./system-settings.js").then((i) => i.b)), _t = m(() => import("./audit.js")), At = m(() => import("./service-accounts.js").then((i) => i.S)), Ot = m(() => import("./service-accounts.js").then((i) => i.a));
function l(i, o) {
  return /* @__PURE__ */ e.jsx(Te, { fallback: /* @__PURE__ */ e.jsx(Ke, {}), children: /* @__PURE__ */ e.jsx(i, { ...o }) });
}
const $t = ({ transformSettingTabs: i, transformLangConfig: o, extraPrivateRoutes: g = [], extraPublicRoutes: z = [] }) => {
  const w = [
    {
      path: "/login",
      element: l(ft, { transformLangConfig: o }),
      index: !0
    },
    {
      path: "/404",
      element: l(ae),
      index: !0
    },
    {
      path: "/403",
      element: l(yt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: l(kt),
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
          element: l(gt),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(We, {}),
          index: !0
        },
        {
          path: "/profile",
          element: l(jt),
          name: void 0,
          index: !0
        },
        ...g,
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
              icon: /* @__PURE__ */ e.jsx(Ye, {}),
              permissions: ["authorization:role:list"],
              children: [
                {
                  element: l(bt),
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
                  element: l(vt),
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
                  element: l(wt),
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
                  element: l(At),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: l(Ot),
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
          icon: /* @__PURE__ */ e.jsx(Xe, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view", "system:skills:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(Ge, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view", "system:skills:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: l(St, { transformItems: i })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: l(zt),
                  index: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: l(Lt),
                  index: !0
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: l(Nt),
                  index: !0
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(Je, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: l(_t)
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
  return [...w, ...L];
}, ci = {
  ai: Se,
  authorization: le,
  base: me,
  system: E,
  oauth: de
}, { Header: Mt, Content: It, Footer: Rt, Sider: Bt } = V, { SubMenu: Ct } = R, Pt = ut(({ token: i, css: o }) => ({
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
})), Dt = ({
  element: i,
  siderWidth: o = 250,
  routes: g,
  transformLangConfig: z,
  menuStyle: w = "dark",
  transformHeaderItems: L = (b) => b,
  renderLayout: P
}) => {
  const { themeMode: b, setThemeMode: u, isDarkMode: O } = pt(), { styles: c } = Pt(), { layout: S, visible: N, loaded: k } = it(), { t: f, i18n: p } = K(), { t: a } = K("common"), j = Me(), { hasPermission: $ } = nt(), _ = Ie(), { logout: he, user: d } = at(), { siteConfig: s, clearCurrentOrgId: ue } = st(), [H, q] = A([]), [pe, xe] = A(null), [D, ge] = A("Loading...");
  j.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? _("/profile#mfa") : d && d.status === "password_expired" && _("/profile#password"));
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
  const F = () => {
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
  }, ye = (n) => n.some((r) => $(r)), ve = mt(g, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), Q = (n, r = []) => {
    const v = (t) => t && t.replace(/_/g, " ").split(" ").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !ye(t.permissions))
        return null;
      const x = v(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const y = Q(t.children, [...r, t.name]);
        return y.length == 0 && t.path ? /* @__PURE__ */ e.jsx(R.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(I, { to: t.path, children: f(`menu.${[...r, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : /* @__PURE__ */ e.jsx(Ct, { icon: t.icon, title: f(`menu.${[...r, t.name, t.name].join(".")}`, { defaultValue: x }), children: y }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(R.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(I, { to: t.path, children: f(`menu.${[...r, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  B(() => {
    const n = F().filter((r) => r.path !== "/").map((r) => r.title).join(" - ");
    n ? document.title = `${D} | ${n}` : document.title = D;
  }, [F, j.pathname]);
  const we = Ve(() => {
    const n = Z(g, j.pathname);
    if (n) {
      for (const r of n.reverse())
        if (r.route.path && r.route.name)
          return r.route.path;
    }
    return j.pathname;
  }, [j.pathname]), be = [
    /* @__PURE__ */ e.jsx(
      U,
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
        children: /* @__PURE__ */ e.jsx(Ze, {})
      },
      "navigation-dropdown"
    ),
    ...s != null && s.enable_multi_org ? [/* @__PURE__ */ e.jsx(He, { className: "header-item org-switcher" }, "org-switcher")] : [],
    /* @__PURE__ */ e.jsxs(
      U,
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
    /* @__PURE__ */ e.jsx(qe, { className: "header-item language-switch", transformLangConfig: z }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      U,
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
  return (P ?? ((n, r, v, t, x) => {
    var Y, G, J;
    const [y, W] = A(!1);
    return /* @__PURE__ */ e.jsxs(V, { className: h("main-layout", c.layout), children: [
      /* @__PURE__ */ e.jsxs(Bt, { width: o, collapsible: !0, collapsed: y, onCollapse: W, className: h(c.menuSider, "layout-menu-sider"), theme: O ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: h("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: h("layout-logo-container", c.layoutLogoContainer), children: n ? /* @__PURE__ */ e.jsx("img", { src: n, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(Pe, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(R, { className: h("layout-menu", c.menu), theme: O ? "light" : w, defaultOpenKeys: ve, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [we], children: r })
      ] }),
      /* @__PURE__ */ e.jsxs(V, { className: h("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(Mt, { className: h("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(De, { children: [
            /* @__PURE__ */ e.jsx(
              Fe,
              {
                type: "text",
                icon: y ? /* @__PURE__ */ e.jsx(et, {}) : /* @__PURE__ */ e.jsx(tt, {}),
                onClick: () => W(!y),
                className: h("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(Ue, { className: h("site-breadcrumb", c.breadcrumb), itemRender: (M) => {
              const X = M.href || M.path;
              return X ? /* @__PURE__ */ e.jsx(I, { to: X, children: M.title }) : /* @__PURE__ */ e.jsx("span", { children: M.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: h("header-items", c.headerItems), children: v })
        ] }),
        /* @__PURE__ */ e.jsxs(It, { className: h("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: h("site-content-container", c.contentContainer), children: x }),
          ((Y = s == null ? void 0 : s.attrs) == null ? void 0 : Y.ai_enabled) && /* @__PURE__ */ e.jsx(ct, {}),
          ((G = s == null ? void 0 : s.attrs) == null ? void 0 : G.ai_enabled) && S === "classic" && (N || k) && /* @__PURE__ */ e.jsx(dt, {})
        ] }),
        /* @__PURE__ */ e.jsxs(Rt, { className: h("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          D
        ] })
      ] }),
      ((J = s == null ? void 0 : s.attrs) == null ? void 0 : J.ai_enabled) && (S === "sidebar" || S === "float-sidebar") && (N || k) && /* @__PURE__ */ e.jsx(ht, {})
    ] });
  }))(pe, Q(g), L(be), F(), i ?? /* @__PURE__ */ e.jsx(Re, {}));
}, Ft = new Oe({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), re = {
  "zh-CN": Ae,
  "en-US": T,
  "de-DE": _e,
  "es-ES": ke,
  "fr-FR": Ne,
  "ar-AE": Le,
  "sv-SE": ze
};
function di({
  transformRouter: i = (u) => u,
  transformSettingTabs: o = (u) => u,
  transformLangConfig: g = (u) => u,
  extraPrivateRoutes: z = [],
  extraPublicRoutes: w = [],
  menuStyle: L = "dark",
  transformHeaderItems: P = (u) => u,
  renderLayout: b
}) {
  const { i18n: u } = K(), [O, c] = A(re[u.language] || T);
  B(() => {
    c(re[u.language] || T);
  }, [u.language]);
  const S = (f) => f.map((p) => p.children === void 0 ? p : {
    ...p,
    children: S(p.children)
  }), N = i(S($t({
    transformSettingTabs: o,
    transformLangConfig: g,
    extraPrivateRoutes: z,
    extraPublicRoutes: w
  }))), k = (f, p) => f.flatMap((a) => a.is_private ? [a] : "children" in a && a.children ? a.children : [a]).map((a, j) => {
    const $ = a.is_private ? /* @__PURE__ */ e.jsx(Qe, { element: /* @__PURE__ */ e.jsx(
      Dt,
      {
        routes: N,
        element: a.element,
        transformLangConfig: g,
        menuStyle: L,
        transformHeaderItems: P,
        renderLayout: b
      }
    ) }) : a.element;
    if ("children" in a && a.children && a.children.length > 0)
      return /* @__PURE__ */ e.jsx(ee, { path: a.path, element: $, children: k(a.children, a) }, a.path ?? a.name ?? j);
    const { path: _ } = a;
    return /* @__PURE__ */ e.jsx(ee, { path: _, index: a.index, element: $ }, _ ?? a.name ?? `${(p == null ? void 0 : p.path) ?? ""}.${j}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx($e, { client: Ft, children: /* @__PURE__ */ e.jsx(xt, { children: /* @__PURE__ */ e.jsx(Ee, { locale: O, children: /* @__PURE__ */ e.jsx(ot, { children: /* @__PURE__ */ e.jsx(rt, { children: /* @__PURE__ */ e.jsx(lt, { children: /* @__PURE__ */ e.jsx(Be, { basename: ce(), children: /* @__PURE__ */ e.jsx(Ce, { children: k(N) }) }) }) }) }) }) }) });
}
const hi = {
  ...le,
  ...me,
  ...de,
  ...E,
  ...E
};
export {
  di as A,
  ci as a,
  hi as b,
  Dt as c,
  l as w
};
