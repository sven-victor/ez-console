import { a as ze } from "./ai.js";
import { a as le } from "./authorization.js";
import { b as ce, g as me } from "./base.js";
import { a as T } from "./system.js";
import { o as de } from "./oauth.js";
import { j as e, d as Se, b as _e, c as Le, e as Ne, f as Ae, g as E, h as ke } from "./vendor.js";
import { QueryClient as Oe, QueryClientProvider as $e } from "react-query";
import { useLocation as Me, useNavigate as Ie, Link as I, matchRoutes as Z, Outlet as Re, BrowserRouter as Be, Routes as Ce, Route as ee } from "react-router-dom";
import { Layout as V, Menu as R, Spin as Pe, Space as De, Button as Fe, Breadcrumb as Ue, ConfigProvider as Te } from "antd";
import { useTranslation as K } from "react-i18next";
import { lazy as m, Suspense as Ee, useState as k, useEffect as B, useMemo as Ve } from "react";
import { L as Ke, H as U, O as He, A as te, a as qe, P as Qe } from "./components.js";
import { DashboardOutlined as We, SolutionOutlined as Ye, UserOutlined as C, SafetyOutlined as Ge, FileSearchOutlined as Je, SettingOutlined as Xe, SwapOutlined as Ze, SunOutlined as ae, MoonOutlined as ie, MenuUnfoldOutlined as et, MenuFoldOutlined as tt } from "@ant-design/icons";
import { u as at, b as it, a as nt, c as st, A as ot, S as rt, e as lt } from "./contexts.js";
import { flatMapDeep as ct } from "lodash-es";
import { A as mt, a as dt, b as ht } from "./ai-chat-layout.js";
import { createStyles as ut, useThemeMode as pt, ThemeProvider as xt } from "antd-style";
import h from "classnames";
import "./ai-chat.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const gt = m(() => import("./dashboard.js")), ft = m(() => import("./login.js")), jt = m(() => import("./profile.js")), ne = m(() => import("./not_found.js")), yt = m(() => import("./forbidden.js")), vt = m(() => import("./users.js").then((i) => i.U)), wt = m(() => import("./users.js").then((i) => i.a)), se = m(() => import("./users.js").then((i) => i.b)), bt = m(() => import("./roles.js").then((i) => i.R)), oe = m(() => import("./roles.js").then((i) => i.a)), zt = m(() => import("./system-settings.js").then((i) => i.i)), St = m(() => import("./system-settings.js").then((i) => i.O)), _t = m(() => import("./system-settings.js").then((i) => i.a)), Lt = m(() => import("./audit.js")), Nt = m(() => import("./service-accounts.js").then((i) => i.S)), At = m(() => import("./service-accounts.js").then((i) => i.a));
function l(i, o) {
  return /* @__PURE__ */ e.jsx(Ee, { fallback: /* @__PURE__ */ e.jsx(Ke, {}), children: /* @__PURE__ */ e.jsx(i, { ...o }) });
}
const kt = ({ transformSettingTabs: i, transformLangConfig: o, extraPrivateRoutes: g = [], extraPublicRoutes: S = [] }) => {
  const w = [
    {
      path: "/login",
      element: l(ft, { transformLangConfig: o }),
      index: !0
    },
    {
      path: "/404",
      element: l(ne),
      index: !0
    },
    {
      path: "/403",
      element: l(yt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: l(_t),
      index: !0
    },
    ...S
  ], _ = [
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
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(C, {}),
          permissions: ["authorization:user:view", "authorization:user:create", "authorization:user:update", "authorization:user:delete", "authorization:service_account:view", "authorization:service_account:create", "authorization:service_account:update", "authorization:service_account:delete", "authorization:role:view"],
          children: [
            // Role management
            {
              path: "/authorization/roles",
              name: "roles",
              icon: /* @__PURE__ */ e.jsx(Ye, {}),
              permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
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
              permissions: ["authorization:user:view", "authorization:user:list", "authorization:user:create", "authorization:user:update", "authorization:user:delete"],
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
              permissions: ["authorization:service_account:view"],
              children: [
                {
                  element: l(Nt),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: l(At),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                }
              ]
            }
          ]
        },
        ...g,
        // System management menu
        {
          name: "system",
          icon: /* @__PURE__ */ e.jsx(Xe, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(Ge, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: l(zt, { transformItems: i })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: l(St),
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
              element: l(Lt)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: l(ne),
          index: !0
        }
      ]
    }
  ];
  return [...w, ..._];
}, la = {
  ai: ze,
  authorization: le,
  base: ce,
  system: T,
  oauth: de
}, { Header: Ot, Content: $t, Footer: Mt, Sider: It } = V, { SubMenu: Rt } = R, Bt = ut(({ token: i, css: o }) => ({
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
})), Ct = ({
  element: i,
  siderWidth: o = 250,
  routes: g,
  transformLangConfig: S,
  menuStyle: w = "dark",
  transformHeaderItems: _ = (b) => b,
  renderLayout: P
}) => {
  const { themeMode: b, setThemeMode: u, isDarkMode: O } = pt(), { styles: c } = Bt(), { layout: z, visible: L, loaded: N } = at(), { t: f, i18n: p } = K(), { t: n } = K("common"), j = Me(), { hasPermission: $ } = it(), A = Ie(), { logout: he, user: d } = nt(), { siteConfig: s, clearCurrentOrgId: ue } = st(), [H, q] = k([]), [pe, xe] = k(null), [D, ge] = k("Loading...");
  j.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? A("/profile#mfa") : d && d.status === "password_expired" && A("/profile#password"));
  const fe = () => {
    he(), ue(), window.location.href = me("/login?redirect=" + encodeURIComponent(window.location.href));
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
    var a, r;
    if (s) {
      const v = ((a = s.navigation) == null ? void 0 : a.filter((x) => x.path !== s.home_page)) ?? [], t = [...s.home_page ? [{
        name: "home",
        path: s.home_page
      }] : [], ...v];
      t.length > 1 ? q(t) : q([]), xe(s.logo), (r = document.getElementById("site-icon")) == null || r.setAttribute("href", s.logo);
    }
  }, [s]), B(() => {
    p.language && ge((s == null ? void 0 : s.name_i18n[p.language]) || (s == null ? void 0 : s.name) || "");
  }, [s, p.language]);
  const F = () => {
    const a = Z(g, j.pathname), r = [];
    if (a) {
      for (const [v, t] of a.entries())
        if (t.route.path === "/" && !t.route.name)
          r.push({
            href: t.route.path,
            title: n("home"),
            key: "home"
          });
        else if (t.route.name) {
          const x = a.slice(0, v + 1).map((y) => y.route.name).filter(Boolean).join(".");
          r.push({
            path: t.route.path,
            title: t.route.name ? f(`breadcrumbs.${x}`) : void 0,
            key: t.route.path
          });
        }
    }
    return r;
  }, ye = (a) => a.some((r) => $(r)), ve = ct(g, (a) => a.children).map((a) => a == null ? void 0 : a.name).filter((a) => a !== void 0), Q = (a, r = []) => {
    const v = (t) => t && t.replace(/_/g, " ").split(" ").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
    return a.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !ye(t.permissions))
        return null;
      const x = v(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const y = Q(t.children, [...r, t.name]);
        return y.length == 0 && t.path ? /* @__PURE__ */ e.jsx(R.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(I, { to: t.path, children: f(`menu.${[...r, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : /* @__PURE__ */ e.jsx(Rt, { icon: t.icon, title: f(`menu.${[...r, t.name, t.name].join(".")}`, { defaultValue: x }), children: y }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(R.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(I, { to: t.path, children: f(`menu.${[...r, t.name].join(".")}`, { defaultValue: x }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  B(() => {
    const a = F().filter((r) => r.path !== "/").map((r) => r.title).join(" - ");
    a ? document.title = `${D} | ${a}` : document.title = D;
  }, [F, j.pathname]);
  const we = Ve(() => {
    const a = Z(g, j.pathname);
    if (a) {
      for (const r of a.reverse())
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
          items: H.map((a) => ({
            key: a.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: a.path, children: f(`menu.${a.name}`, { defaultValue: a.name }) })
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
    /* @__PURE__ */ e.jsx(qe, { className: "header-item language-switch", transformLangConfig: S }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      U,
      {
        className: "header-item theme-switch",
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(ae, {}),
              " ",
              n("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(ie, {}),
              " ",
              n("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: a }) => {
            u(a);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(ae, {}) : /* @__PURE__ */ e.jsx(ie, {})
      },
      "theme-switch"
    )
  ];
  return (P ?? ((a, r, v, t, x) => {
    var Y, G, J;
    const [y, W] = k(!1);
    return /* @__PURE__ */ e.jsxs(V, { className: h("main-layout", c.layout), children: [
      /* @__PURE__ */ e.jsxs(It, { width: o, collapsible: !0, collapsed: y, onCollapse: W, className: h(c.menuSider, "layout-menu-sider"), theme: O ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: h("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: h("layout-logo-container", c.layoutLogoContainer), children: a ? /* @__PURE__ */ e.jsx("img", { src: a, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(Pe, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(R, { className: h("layout-menu", c.menu), theme: O ? "light" : w, defaultOpenKeys: ve, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [we], children: r })
      ] }),
      /* @__PURE__ */ e.jsxs(V, { className: h("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(Ot, { className: h("site-header", c.header), children: [
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
        /* @__PURE__ */ e.jsxs($t, { className: h("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: h("site-content-container", c.contentContainer), children: x }),
          ((Y = s == null ? void 0 : s.attrs) == null ? void 0 : Y.ai_enabled) && /* @__PURE__ */ e.jsx(mt, {}),
          ((G = s == null ? void 0 : s.attrs) == null ? void 0 : G.ai_enabled) && z === "classic" && (L || N) && /* @__PURE__ */ e.jsx(dt, {})
        ] }),
        /* @__PURE__ */ e.jsxs(Mt, { className: h("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          D
        ] })
      ] }),
      ((J = s == null ? void 0 : s.attrs) == null ? void 0 : J.ai_enabled) && (z === "sidebar" || z === "float-sidebar") && (L || N) && /* @__PURE__ */ e.jsx(ht, {})
    ] });
  }))(pe, Q(g), _(be), F(), i ?? /* @__PURE__ */ e.jsx(Re, {}));
}, Pt = new Oe({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), re = {
  "zh-CN": ke,
  "en-US": E,
  "de-DE": Ae,
  "es-ES": Ne,
  "fr-FR": Le,
  "ar-AE": _e,
  "sv-SE": Se
};
function ca({
  transformRouter: i = (u) => u,
  transformSettingTabs: o = (u) => u,
  transformLangConfig: g = (u) => u,
  extraPrivateRoutes: S = [],
  extraPublicRoutes: w = [],
  menuStyle: _ = "dark",
  transformHeaderItems: P = (u) => u,
  renderLayout: b
}) {
  const { i18n: u } = K(), [O, c] = k(re[u.language] || E);
  B(() => {
    c(re[u.language] || E);
  }, [u.language]);
  const z = (f) => f.map((p) => p.children === void 0 ? p : {
    ...p,
    children: z(p.children)
  }), L = i(z(kt({
    transformSettingTabs: o,
    transformLangConfig: g,
    extraPrivateRoutes: S,
    extraPublicRoutes: w
  }))), N = (f, p) => f.flatMap((n) => n.is_private ? [n] : "children" in n && n.children ? n.children : [n]).map((n, j) => {
    const $ = n.is_private ? /* @__PURE__ */ e.jsx(Qe, { element: /* @__PURE__ */ e.jsx(
      Ct,
      {
        routes: L,
        element: n.element,
        transformLangConfig: g,
        menuStyle: _,
        transformHeaderItems: P,
        renderLayout: b
      }
    ) }) : n.element;
    if ("children" in n && n.children && n.children.length > 0)
      return /* @__PURE__ */ e.jsx(ee, { path: n.path, element: $, children: N(n.children, n) }, n.path ?? n.name ?? j);
    const { path: A } = n;
    return /* @__PURE__ */ e.jsx(ee, { path: A, index: n.index, element: $ }, A ?? n.name ?? `${(p == null ? void 0 : p.path) ?? ""}.${j}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx($e, { client: Pt, children: /* @__PURE__ */ e.jsx(xt, { children: /* @__PURE__ */ e.jsx(Te, { locale: O, children: /* @__PURE__ */ e.jsx(ot, { children: /* @__PURE__ */ e.jsx(rt, { children: /* @__PURE__ */ e.jsx(lt, { children: /* @__PURE__ */ e.jsx(Be, { basename: me(), children: /* @__PURE__ */ e.jsx(Ce, { children: N(L) }) }) }) }) }) }) }) });
}
const ma = {
  ...le,
  ...ce,
  ...de,
  ...T,
  ...T
};
export {
  ca as A,
  la as a,
  ma as b,
  Ct as c,
  l as w
};
