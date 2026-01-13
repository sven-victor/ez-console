import { a as ye } from "./ai.js";
import { a as re } from "./authorization.js";
import { b as le, g as ce } from "./base.js";
import { a as E } from "./system.js";
import { o as de } from "./oauth.js";
import { j as e, d as be, b as we, c as ze, e as Se, f as _e, g as V, h as Ae } from "./vendor.js";
import { QueryClient as Le, QueryClientProvider as ke } from "react-query";
import { useLocation as Oe, useNavigate as $e, Link as M, Outlet as Re, matchRoutes as Me, BrowserRouter as Ne, Routes as Ie, Route as Z } from "react-router-dom";
import { Layout as T, Menu as I, Spin as Be, Space as De, Button as Pe, Breadcrumb as Ce, ConfigProvider as Fe } from "antd";
import { useTranslation as H } from "react-i18next";
import { lazy as c, Suspense as Ue, useState as k, useEffect as B } from "react";
import { L as Ee, H as U, O as Ve, A as ee, a as Te, P as He } from "./components.js";
import { DashboardOutlined as Ke, SolutionOutlined as qe, UserOutlined as D, SafetyOutlined as Qe, FileSearchOutlined as We, SettingOutlined as Ye, SwapOutlined as Ge, SunOutlined as te, MoonOutlined as ie, MenuUnfoldOutlined as Je, MenuFoldOutlined as Xe } from "@ant-design/icons";
import { u as Ze, b as et, a as tt, c as it, A as nt, S as at, e as st } from "./contexts.js";
import { flatMapDeep as ot } from "lodash-es";
import { A as rt, a as lt, b as ct } from "./ai-chat-layout.js";
import { createStyles as dt, useThemeMode as ht, ThemeProvider as mt } from "antd-style";
import N from "classnames";
import "./ai-chat.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const ut = c(() => import("./dashboard.js")), pt = c(() => import("./login.js")), xt = c(() => import("./profile.js")), ne = c(() => import("./not_found.js")), ft = c(() => import("./forbidden.js")), gt = c(() => import("./users.js").then((i) => i.U)), jt = c(() => import("./users.js").then((i) => i.a)), ae = c(() => import("./users.js").then((i) => i.b)), vt = c(() => import("./roles.js").then((i) => i.R)), se = c(() => import("./roles.js").then((i) => i.a)), yt = c(() => import("./system-settings.js").then((i) => i.i)), bt = c(() => import("./system-settings.js").then((i) => i.O)), wt = c(() => import("./system-settings.js").then((i) => i.a)), zt = c(() => import("./audit.js")), St = c(() => import("./service-accounts.js").then((i) => i.S)), _t = c(() => import("./service-accounts.js").then((i) => i.a));
function r(i, l) {
  return /* @__PURE__ */ e.jsx(Ue, { fallback: /* @__PURE__ */ e.jsx(Ee, {}), children: /* @__PURE__ */ e.jsx(i, { ...l }) });
}
const At = ({ transformSettingTabs: i, transformLangConfig: l, extraPrivateRoutes: v = [], extraPublicRoutes: y = [] }) => {
  const w = [
    {
      path: "/login",
      element: r(pt, { transformLangConfig: l }),
      index: !0
    },
    {
      path: "/404",
      element: r(ne),
      index: !0
    },
    {
      path: "/403",
      element: r(ft),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: r(wt),
      index: !0
    },
    ...y
  ], z = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: r(ut),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(Ke, {}),
          index: !0
        },
        {
          path: "/profile",
          element: r(xt),
          name: void 0,
          index: !0
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(D, {}),
          permissions: ["authorization:user:view", "authorization:user:create", "authorization:user:update", "authorization:user:delete", "authorization:service_account:view", "authorization:service_account:create", "authorization:service_account:update", "authorization:service_account:delete", "authorization:role:view"],
          children: [
            // Role management
            {
              path: "/authorization/roles",
              name: "roles",
              icon: /* @__PURE__ */ e.jsx(qe, {}),
              permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
              children: [
                {
                  element: r(vt),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: r(se),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: r(se),
                  permissions: ["authorization:role:update"],
                  index: !0
                }
              ]
            },
            // User management
            {
              path: "/authorization/users",
              name: "users",
              icon: /* @__PURE__ */ e.jsx(D, {}),
              permissions: ["authorization:user:view", "authorization:user:list", "authorization:user:create", "authorization:user:update", "authorization:user:delete"],
              children: [
                {
                  element: r(gt),
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
                  element: r(jt),
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
              icon: /* @__PURE__ */ e.jsx(D, {}),
              permissions: ["authorization:service_account:view"],
              children: [
                {
                  element: r(St),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: r(_t),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                }
              ]
            }
          ]
        },
        ...v,
        // System management menu
        {
          name: "system",
          icon: /* @__PURE__ */ e.jsx(Ye, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(Qe, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: r(yt, { transformItems: i })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: r(bt),
                  index: !0
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(We, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: r(zt)
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
}, si = {
  ai: ye,
  authorization: re,
  base: le,
  system: E,
  oauth: de
}, { Header: Lt, Content: kt, Footer: Ot, Sider: $t } = T, { SubMenu: Rt } = I, Mt = dt(({ token: i, css: l }) => ({
  header: l`
      padding: 0;
      display: flex;
      justify-content: space-between;
      background-color: ${i.colorBgContainer};
      border-block-end: 1px solid ${i.colorBorderSecondary};
    `,
  content: l`
      padding: 24px;
      min-height: calc(100vh - 190px);
      background-color: ${i.colorBgContainer};
    `,
  mainLayout: l`
      flex: 1;
      min-width: 0;
      background-color: ${i.colorBgContainer};
    `,
  breadcrumb: l`
      margin-left: 8px;
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
  menu: l`
      flex: 1 1 0%;
    `
})), Nt = ({
  element: i,
  routes: l,
  transformLangConfig: v,
  menuStyle: y = "dark",
  transformHeaderItems: w = (b) => b,
  renderLayout: z
}) => {
  const { themeMode: b, setThemeMode: P, isDarkMode: h } = ht(), { styles: p } = Mt(), { layout: S, visible: _, loaded: A } = Ze(), { t: x, i18n: g } = H(), { t: m } = H("common"), s = Oe(), { hasPermission: O } = et(), L = $e(), { logout: $, user: d } = tt(), { siteConfig: a, clearCurrentOrgId: he } = it(), [K, q] = k([]), [me, ue] = k(null), [C, pe] = k("Loading...");
  s.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? L("/profile#mfa") : d && d.status === "password_expired" && L("/profile#password"));
  const xe = () => {
    $(), he(), window.location.href = ce("/login?redirect=" + encodeURIComponent(window.location.href));
  }, fe = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(M, { to: "/profile", children: m("profile") })
    },
    {
      key: "logout",
      label: m("logout"),
      onClick: xe
    }
  ];
  B(() => {
    var n, o;
    if (a) {
      const j = ((n = a.navigation) == null ? void 0 : n.filter((u) => u.path !== a.home_page)) ?? [], t = [...a.home_page ? [{
        name: "home",
        path: a.home_page
      }] : [], ...j];
      t.length > 1 ? q(t) : q([]), ue(a.logo), (o = document.getElementById("site-icon")) == null || o.setAttribute("href", a.logo);
    }
  }, [a]), B(() => {
    g.language && pe((a == null ? void 0 : a.name_i18n[g.language]) || (a == null ? void 0 : a.name) || "");
  }, [a, g.language]);
  const F = () => {
    const n = Me(l, s.pathname), o = [];
    if (n) {
      for (const [j, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          o.push({
            href: t.route.path,
            title: m("home"),
            key: "home"
          });
        else if (t.route.name) {
          const u = n.slice(0, j + 1).map((f) => f.route.name).filter(Boolean).join(".");
          o.push({
            path: t.route.path,
            title: t.route.name ? x(`breadcrumbs.${u}`) : void 0,
            key: t.route.path
          });
        }
    }
    return o;
  }, ge = (n) => n.some((o) => O(o)), je = ot(l, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), Q = (n, o = []) => {
    const j = (t) => t && t.replace(/_/g, " ").split(" ").map((u) => u.charAt(0).toUpperCase() + u.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !ge(t.permissions))
        return null;
      const u = j(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const f = Q(t.children, [...o, t.name]);
        return f.length == 0 && t.path ? /* @__PURE__ */ e.jsx(I.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(M, { to: t.path, children: x(`menu.${[...o, t.name].join(".")}`, { defaultValue: u }) }) }, t.path) : /* @__PURE__ */ e.jsx(Rt, { icon: t.icon, title: x(`menu.${[...o, t.name, t.name].join(".")}`, { defaultValue: u }), children: f }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(I.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(M, { to: t.path, children: x(`menu.${[...o, t.name].join(".")}`, { defaultValue: u }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  B(() => {
    const n = F().filter((o) => o.path !== "/").map((o) => o.title).join(" - ");
    n ? document.title = `${C} | ${n}` : document.title = C;
  }, [F, s.pathname]);
  const ve = [
    /* @__PURE__ */ e.jsx(
      U,
      {
        hidden: K.length <= 1,
        menu: {
          items: K.map((n) => ({
            key: n.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: x(`menu.${n.name}`, { defaultValue: n.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(Ge, {})
      },
      "navigation-dropdown"
    ),
    ...a != null && a.enable_multi_org ? [/* @__PURE__ */ e.jsx(Ve, {}, "org-switcher")] : [],
    /* @__PURE__ */ e.jsxs(
      U,
      {
        menu: { items: fe },
        children: [
          d != null && d.avatar ? /* @__PURE__ */ e.jsx(ee, { src: d.avatar }) : /* @__PURE__ */ e.jsx(ee, { icon: /* @__PURE__ */ e.jsx(D, {}) }),
          /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: (d == null ? void 0 : d.full_name) || (d == null ? void 0 : d.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(Te, { transformLangConfig: v }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      U,
      {
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(te, {}),
              " ",
              m("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(ie, {}),
              " ",
              m("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: n }) => {
            P(n);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(te, {}) : /* @__PURE__ */ e.jsx(ie, {})
      },
      "theme-switch"
    )
  ];
  return (z ?? ((n, o, j, t, u) => {
    var Y, G, J;
    const [f, W] = k(!1);
    return /* @__PURE__ */ e.jsxs(T, { style: { minHeight: "100vh", display: "flex", flexDirection: "row" }, children: [
      /* @__PURE__ */ e.jsxs($t, { collapsible: !0, collapsed: f, onCollapse: W, className: p.menuSider, theme: h ? "light" : y, children: [
        /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: n ? /* @__PURE__ */ e.jsx("img", { src: n, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(Be, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(I, { className: p.menu, theme: h ? "light" : y, defaultOpenKeys: je, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [s.pathname], children: o })
      ] }),
      /* @__PURE__ */ e.jsxs(T, { className: N("site-layout", "main-layout", p.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(Lt, { className: N("site-header", p.header), children: [
          /* @__PURE__ */ e.jsxs(De, { children: [
            /* @__PURE__ */ e.jsx(
              Pe,
              {
                type: "text",
                icon: f ? /* @__PURE__ */ e.jsx(Je, {}) : /* @__PURE__ */ e.jsx(Xe, {}),
                onClick: () => W(!f),
                style: { fontSize: "16px", width: 64, height: 64 }
              }
            ),
            /* @__PURE__ */ e.jsx(Ce, { className: N("site-breadcrumb", p.breadcrumb), itemRender: (R) => {
              const X = R.href || R.path;
              return X ? /* @__PURE__ */ e.jsx(M, { to: X, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { style: { marginRight: "20px" }, children: j })
        ] }),
        /* @__PURE__ */ e.jsxs(kt, { style: { margin: "0 16px", height: "calc(100vh - 120px)", overflow: "auto" }, children: [
          /* @__PURE__ */ e.jsx("div", { className: N("site-content", p.content), children: u }),
          ((Y = a == null ? void 0 : a.attrs) == null ? void 0 : Y.ai_enabled) && /* @__PURE__ */ e.jsx(rt, {}),
          ((G = a == null ? void 0 : a.attrs) == null ? void 0 : G.ai_enabled) && S === "classic" && (_ || A) && /* @__PURE__ */ e.jsx(lt, {})
        ] }),
        /* @__PURE__ */ e.jsxs(Ot, { style: { textAlign: "center", padding: "15px 50px" }, children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          C
        ] })
      ] }),
      ((J = a == null ? void 0 : a.attrs) == null ? void 0 : J.ai_enabled) && (S === "sidebar" || S === "float-sidebar") && (_ || A) && /* @__PURE__ */ e.jsx(ct, {})
    ] });
  }))(me, Q(l), w(ve), F(), i ?? /* @__PURE__ */ e.jsx(Re, {}));
}, It = new Le({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), oe = {
  "zh-CN": Ae,
  "en-US": V,
  "de-DE": _e,
  "es-ES": Se,
  "fr-FR": ze,
  "ar-AE": we,
  "sv-SE": be
};
function oi({
  transformRouter: i = (h) => h,
  transformSettingTabs: l = (h) => h,
  transformLangConfig: v = (h) => h,
  extraPrivateRoutes: y = [],
  extraPublicRoutes: w = [],
  menuStyle: z = "dark",
  transformHeaderItems: b = (h) => h,
  renderLayout: P
}) {
  const { i18n: h } = H(), [p, S] = k(oe[h.language] || V);
  B(() => {
    S(oe[h.language] || V);
  }, [h.language]);
  const _ = (g) => g.map((m) => m.children === void 0 ? m : {
    ...m,
    children: _(m.children)
  }), A = i(_(At({
    transformSettingTabs: l,
    transformLangConfig: v,
    extraPrivateRoutes: y,
    extraPublicRoutes: w
  }))), x = (g, m) => g.flatMap((s) => s.is_private ? [s] : "children" in s && s.children ? s.children : [s]).map((s, O) => {
    const L = s.is_private ? /* @__PURE__ */ e.jsx(He, { element: /* @__PURE__ */ e.jsx(
      Nt,
      {
        routes: A,
        element: s.element,
        transformLangConfig: v,
        menuStyle: z,
        transformHeaderItems: b,
        renderLayout: P
      }
    ) }) : s.element;
    if ("children" in s && s.children && s.children.length > 0)
      return /* @__PURE__ */ e.jsx(Z, { path: s.path, element: L, children: x(s.children, s) }, s.path ?? s.name ?? O);
    const { path: $ } = s;
    return /* @__PURE__ */ e.jsx(Z, { path: $, index: s.index, element: L }, $ ?? s.name ?? `${(m == null ? void 0 : m.path) ?? ""}.${O}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(ke, { client: It, children: /* @__PURE__ */ e.jsx(mt, { children: /* @__PURE__ */ e.jsx(Fe, { locale: p, children: /* @__PURE__ */ e.jsx(nt, { children: /* @__PURE__ */ e.jsx(at, { children: /* @__PURE__ */ e.jsx(st, { children: /* @__PURE__ */ e.jsx(Ne, { basename: ce(), children: /* @__PURE__ */ e.jsx(Ie, { children: x(A) }) }) }) }) }) }) }) });
}
const ri = {
  ...re,
  ...le,
  ...de,
  ...E,
  ...E
};
export {
  oi as A,
  si as a,
  ri as b,
  Nt as c,
  r as w
};
