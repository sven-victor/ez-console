import { a as ge } from "./ai.js";
import { a as ae } from "./authorization.js";
import { b as se, g as oe } from "./base.js";
import { a as E } from "./system.js";
import { o as re } from "./oauth.js";
import { j as e, d as je, b as ve, c as ye, e as be, f as we, g as V, h as ze } from "./vendor.js";
import { QueryClient as Se, QueryClientProvider as _e } from "react-query";
import { useLocation as Ae, useNavigate as Le, Link as M, Outlet as ke, matchRoutes as Oe, BrowserRouter as $e, Routes as Re, Route as G } from "react-router-dom";
import { Layout as T, Menu as I, Spin as Me, Space as Ne, Button as Ie, Breadcrumb as Be, ConfigProvider as De } from "antd";
import { useTranslation as H } from "react-i18next";
import { lazy as c, Suspense as Pe, useState as k, useEffect as B } from "react";
import { L as Ce, H as U, O as Fe, A as J, a as Ue, P as Ee } from "./components.js";
import { DashboardOutlined as Ve, SolutionOutlined as Te, UserOutlined as D, SafetyOutlined as He, FileSearchOutlined as Ke, SettingOutlined as qe, SwapOutlined as Qe, SunOutlined as X, MoonOutlined as Z, MenuUnfoldOutlined as We, MenuFoldOutlined as Ye } from "@ant-design/icons";
import { u as Ge, b as Je, a as Xe, c as Ze, A as et, S as tt, e as it } from "./contexts.js";
import { flatMapDeep as nt } from "lodash-es";
import { A as at, a as st, b as ot } from "./ai-chat-layout.js";
import { createStyles as rt, useThemeMode as lt, ThemeProvider as ct } from "antd-style";
import N from "classnames";
import "./ai-chat.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const dt = c(() => import("./dashboard.js")), ht = c(() => import("./login.js")), mt = c(() => import("./profile.js")), ee = c(() => import("./not_found.js")), ut = c(() => import("./forbidden.js")), pt = c(() => import("./users.js").then((i) => i.U)), xt = c(() => import("./users.js").then((i) => i.a)), te = c(() => import("./users.js").then((i) => i.b)), ft = c(() => import("./roles.js").then((i) => i.R)), ie = c(() => import("./roles.js").then((i) => i.a)), gt = c(() => import("./system-settings.js").then((i) => i.i)), jt = c(() => import("./system-settings.js").then((i) => i.O)), vt = c(() => import("./system-settings.js").then((i) => i.a)), yt = c(() => import("./audit.js")), bt = c(() => import("./service-accounts.js").then((i) => i.S)), wt = c(() => import("./service-accounts.js").then((i) => i.a));
function o(i, l) {
  return /* @__PURE__ */ e.jsx(Pe, { fallback: /* @__PURE__ */ e.jsx(Ce, {}), children: /* @__PURE__ */ e.jsx(i, { ...l }) });
}
const zt = ({ transformSettingTabs: i, transformLangConfig: l, extraPrivateRoutes: v = [], extraPublicRoutes: y = [] }) => {
  const w = [
    {
      path: "/login",
      element: o(ht, { transformLangConfig: l }),
      index: !0
    },
    {
      path: "/404",
      element: o(ee),
      index: !0
    },
    {
      path: "/403",
      element: o(ut),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o(vt),
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
          element: o(dt),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(Ve, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(mt),
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
              icon: /* @__PURE__ */ e.jsx(Te, {}),
              permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
              children: [
                {
                  element: o(ft),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: o(ie),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: o(ie),
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
                  element: o(pt),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: o(te),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: o(xt),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: o(te),
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
                  element: o(bt),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(wt),
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
          icon: /* @__PURE__ */ e.jsx(qe, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(He, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: o(gt, { transformItems: i })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(jt),
                  index: !0
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(Ke, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: o(yt)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: o(ee),
          index: !0
        }
      ]
    }
  ];
  return [...w, ...z];
}, ii = {
  ai: ge,
  authorization: ae,
  base: se,
  system: E,
  oauth: re
}, { Header: St, Content: _t, Footer: At, Sider: Lt } = T, { SubMenu: kt } = I, Ot = rt(({ token: i, css: l }) => ({
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
})), $t = ({
  element: i,
  routes: l,
  transformLangConfig: v,
  menuStyle: y = "dark",
  transformHeaderItems: w = (b) => b,
  renderLayout: z
}) => {
  const { themeMode: b, setThemeMode: P, isDarkMode: h } = lt(), { styles: p } = Ot(), { layout: S, visible: _, loaded: A } = Ge(), { t: x, i18n: j } = H(), { t: m } = H("common"), s = Ae(), { hasPermission: O } = Je(), L = Le(), { logout: $, user: d } = Xe(), { siteConfig: a, clearCurrentOrgId: le } = Ze(), [K, q] = k([]), [ce, de] = k(null), [C, he] = k("Loading...");
  s.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? L("/profile#mfa") : d && d.status === "password_expired" && L("/profile#password"));
  const me = () => {
    $(), le(), window.location.href = oe("/login?redirect=" + encodeURIComponent(window.location.href));
  }, ue = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(M, { to: "/profile", children: m("profile") })
    },
    {
      key: "logout",
      label: m("logout"),
      onClick: me
    }
  ];
  B(() => {
    var n;
    if (a) {
      const r = a.navigation.filter((t) => t.path !== a.home_page), f = [...a.home_page ? [{
        name: "home",
        path: a.home_page
      }] : [], ...r];
      f.length > 1 ? q(f) : q([]), de(a.logo), (n = document.getElementById("site-icon")) == null || n.setAttribute("href", a.logo);
    }
  }, [a]), B(() => {
    j.language && he((a == null ? void 0 : a.name_i18n[j.language]) || (a == null ? void 0 : a.name) || "");
  }, [a, j.language]);
  const F = () => {
    const n = Oe(l, s.pathname), r = [];
    if (n) {
      for (const [f, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          r.push({
            href: t.route.path,
            title: m("home"),
            key: "home"
          });
        else if (t.route.name) {
          const u = n.slice(0, f + 1).map((g) => g.route.name).filter(Boolean).join(".");
          r.push({
            path: t.route.path,
            title: t.route.name ? x(`breadcrumbs.${u}`) : void 0,
            key: t.route.path
          });
        }
    }
    return r;
  }, pe = (n) => n.some((r) => O(r)), xe = nt(l, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), Q = (n, r = []) => {
    const f = (t) => t && t.replace(/_/g, " ").split(" ").map((u) => u.charAt(0).toUpperCase() + u.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !pe(t.permissions))
        return null;
      const u = f(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const g = Q(t.children, [...r, t.name]);
        return g.length == 0 && t.path ? /* @__PURE__ */ e.jsx(I.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(M, { to: t.path, children: x(`menu.${[...r, t.name].join(".")}`, { defaultValue: u }) }) }, t.path) : /* @__PURE__ */ e.jsx(kt, { icon: t.icon, title: x(`menu.${[...r, t.name, t.name].join(".")}`, { defaultValue: u }), children: g }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(I.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(M, { to: t.path, children: x(`menu.${[...r, t.name].join(".")}`, { defaultValue: u }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  B(() => {
    const n = F().filter((r) => r.path !== "/").map((r) => r.title).join(" - ");
    n ? document.title = `${C} | ${n}` : document.title = C;
  }, [F, s.pathname]);
  const fe = [
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
        children: /* @__PURE__ */ e.jsx(Qe, {})
      },
      "navigation-dropdown"
    ),
    ...a != null && a.enable_multi_org ? [/* @__PURE__ */ e.jsx(Fe, {}, "org-switcher")] : [],
    /* @__PURE__ */ e.jsxs(
      U,
      {
        menu: { items: ue },
        children: [
          d != null && d.avatar ? /* @__PURE__ */ e.jsx(J, { src: d.avatar }) : /* @__PURE__ */ e.jsx(J, { icon: /* @__PURE__ */ e.jsx(D, {}) }),
          /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: (d == null ? void 0 : d.full_name) || (d == null ? void 0 : d.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(Ue, { transformLangConfig: v }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      U,
      {
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(X, {}),
              " ",
              m("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(Z, {}),
              " ",
              m("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: n }) => {
            P(n);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(X, {}) : /* @__PURE__ */ e.jsx(Z, {})
      },
      "theme-switch"
    )
  ];
  return (z ?? ((n, r, f, t, u) => {
    const [g, W] = k(!1);
    return /* @__PURE__ */ e.jsxs(T, { style: { minHeight: "100vh", display: "flex", flexDirection: "row" }, children: [
      /* @__PURE__ */ e.jsxs(Lt, { collapsible: !0, collapsed: g, onCollapse: W, className: p.menuSider, theme: h ? "light" : y, children: [
        /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: n ? /* @__PURE__ */ e.jsx("img", { src: n, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(Me, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(I, { className: p.menu, theme: h ? "light" : y, defaultOpenKeys: xe, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [s.pathname], children: r })
      ] }),
      /* @__PURE__ */ e.jsxs(T, { className: N("site-layout", "main-layout", p.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(St, { className: N("site-header", p.header), children: [
          /* @__PURE__ */ e.jsxs(Ne, { children: [
            /* @__PURE__ */ e.jsx(
              Ie,
              {
                type: "text",
                icon: g ? /* @__PURE__ */ e.jsx(We, {}) : /* @__PURE__ */ e.jsx(Ye, {}),
                onClick: () => W(!g),
                style: { fontSize: "16px", width: 64, height: 64 }
              }
            ),
            /* @__PURE__ */ e.jsx(Be, { className: N("site-breadcrumb", p.breadcrumb), itemRender: (R) => {
              const Y = R.href || R.path;
              return Y ? /* @__PURE__ */ e.jsx(M, { to: Y, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { style: { marginRight: "20px" }, children: f })
        ] }),
        /* @__PURE__ */ e.jsxs(_t, { style: { margin: "0 16px", height: "calc(100vh - 170px)", overflow: "auto" }, children: [
          /* @__PURE__ */ e.jsx("div", { className: N("site-content", p.content), children: u }),
          (a == null ? void 0 : a.attrs.ai_enabled) && /* @__PURE__ */ e.jsx(at, {}),
          (a == null ? void 0 : a.attrs.ai_enabled) && S === "classic" && (_ || A) && /* @__PURE__ */ e.jsx(st, {})
        ] }),
        /* @__PURE__ */ e.jsxs(At, { style: { textAlign: "center" }, children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          C
        ] })
      ] }),
      (a == null ? void 0 : a.attrs.ai_enabled) && (S === "sidebar" || S === "float-sidebar") && (_ || A) && /* @__PURE__ */ e.jsx(ot, {})
    ] });
  }))(ce, Q(l), w(fe), F(), i ?? /* @__PURE__ */ e.jsx(ke, {}));
}, Rt = new Se({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), ne = {
  "zh-CN": ze,
  "en-US": V,
  "de-DE": we,
  "es-ES": be,
  "fr-FR": ye,
  "ar-AE": ve,
  "sv-SE": je
};
function ni({
  transformRouter: i = (h) => h,
  transformSettingTabs: l = (h) => h,
  transformLangConfig: v = (h) => h,
  extraPrivateRoutes: y = [],
  extraPublicRoutes: w = [],
  menuStyle: z = "dark",
  transformHeaderItems: b = (h) => h,
  renderLayout: P
}) {
  const { i18n: h } = H(), [p, S] = k(ne[h.language] || V);
  B(() => {
    S(ne[h.language] || V);
  }, [h.language]);
  const _ = (j) => j.map((m) => m.children === void 0 ? m : {
    ...m,
    children: _(m.children)
  }), A = i(_(zt({
    transformSettingTabs: l,
    transformLangConfig: v,
    extraPrivateRoutes: y,
    extraPublicRoutes: w
  }))), x = (j, m) => j.flatMap((s) => s.is_private ? [s] : "children" in s && s.children ? s.children : [s]).map((s, O) => {
    const L = s.is_private ? /* @__PURE__ */ e.jsx(Ee, { element: /* @__PURE__ */ e.jsx(
      $t,
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
      return /* @__PURE__ */ e.jsx(G, { path: s.path, element: L, children: x(s.children, s) }, s.path ?? s.name ?? O);
    const { path: $ } = s;
    return /* @__PURE__ */ e.jsx(G, { path: $, index: s.index, element: L }, $ ?? s.name ?? `${(m == null ? void 0 : m.path) ?? ""}.${O}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(_e, { client: Rt, children: /* @__PURE__ */ e.jsx(ct, { children: /* @__PURE__ */ e.jsx(De, { locale: p, children: /* @__PURE__ */ e.jsx(et, { children: /* @__PURE__ */ e.jsx(tt, { children: /* @__PURE__ */ e.jsx(it, { children: /* @__PURE__ */ e.jsx($e, { basename: oe(), children: /* @__PURE__ */ e.jsx(Re, { children: x(A) }) }) }) }) }) }) }) });
}
const ai = {
  ...ae,
  ...se,
  ...re,
  ...E,
  ...E
};
export {
  ni as A,
  ii as a,
  ai as b,
  $t as c,
  o as w
};
