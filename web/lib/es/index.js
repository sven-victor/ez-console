import { a as Ae } from "./ai.js";
import { a as ue } from "./authorization.js";
import { b as pe, g as fe, a as _e } from "./base.js";
import { a as K } from "./system.js";
import { o as xe } from "./oauth.js";
import { t as ge } from "./tasks.js";
import { j as e, d as Oe, a as $e, b as Ce, c as Re, e as Be, f as H, g as De } from "./vendor.js";
import { QueryClient as Pe, QueryClientProvider as Te } from "react-query";
import { useLocation as Ue, useNavigate as Fe, Link as B, matchRoutes as V, Outlet as Ve, BrowserRouter as Ee, Routes as Ke, Route as se } from "react-router-dom";
import { Layout as q, Menu as D, Spin as He, Space as qe, Button as Qe, Breadcrumb as We, ConfigProvider as Ye } from "antd";
import { useTranslation as Q } from "react-i18next";
import { lazy as m, Suspense as Ze, useState as A, useEffect as _, useMemo as Ge } from "react";
import { L as Je, H as E, O as Xe, T as et, A as oe, a as tt, P as nt } from "./components.js";
import { DashboardOutlined as at, SolutionOutlined as it, UserOutlined as P, SafetyOutlined as st, FileSearchOutlined as ot, SettingOutlined as rt, SwapOutlined as lt, SunOutlined as re, MoonOutlined as le, MenuUnfoldOutlined as mt, MenuFoldOutlined as dt } from "@ant-design/icons";
import { u as ct, b as ht, a as ut, c as pt, A as ft, S as xt, e as gt } from "./contexts.js";
import { flatMapDeep as jt, snakeCase as yt } from "lodash-es";
import { A as vt, a as wt, b as bt } from "./ai-chat-layout.js";
import { createStyles as kt, useThemeMode as St, ThemeProvider as zt } from "antd-style";
import u from "classnames";
import "./ai-chat.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const It = m(() => import("./dashboard.js")), Mt = m(() => import("./login.js")), Lt = m(() => import("./profile.js")), me = m(() => import("./not_found.js")), Nt = m(() => import("./forbidden.js")), At = m(() => import("./users.js").then((a) => a.U)), _t = m(() => import("./users.js").then((a) => a.a)), de = m(() => import("./users.js").then((a) => a.b)), Ot = m(() => import("./roles.js").then((a) => a.R)), ce = m(() => import("./roles.js").then((a) => a.a)), $t = m(() => import("./system-settings.js").then((a) => a.i)), Ct = m(() => import("./system-settings.js").then((a) => a.O)), Rt = m(() => import("./system-settings.js").then((a) => a.S)), Bt = m(() => import("./system-settings.js").then((a) => a.a)), Dt = m(() => import("./system-settings.js").then((a) => a.A)), Pt = m(() => import("./system-settings.js").then((a) => a.b)), Tt = m(() => import("./audit.js")), Ut = m(() => import("./service-accounts.js").then((a) => a.S)), Ft = m(() => import("./service-accounts.js").then((a) => a.a)), Vt = m(() => import("./task_list.js")), Et = m(() => import("./task_detail.js")), Kt = m(() => import("./task_schedule_list.js"));
function o(a, r) {
  return /* @__PURE__ */ e.jsx(Ze, { fallback: /* @__PURE__ */ e.jsx(Je, {}), children: /* @__PURE__ */ e.jsx(a, { ...r }) });
}
const Ht = ({ transformSettingTabs: a, transformLangConfig: r, extraPrivateRoutes: g = [], extraPublicRoutes: z = [] }) => {
  const w = [
    {
      path: "/login",
      element: o(Mt, { transformLangConfig: r }),
      index: !0
    },
    {
      path: "/404",
      element: o(me),
      index: !0
    },
    {
      path: "/403",
      element: o(Nt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o(Pt),
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
          element: o(It),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(at, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(Lt),
          hideInMenu: !0,
          name: "profile",
          index: !1
        },
        ...g,
        {
          path: "/tasks",
          permissions: ["task:list", "task:schedule:list"],
          children: [
            {
              // path: '/tasks',
              element: o(Vt),
              permissions: ["task:list"],
              name: "tasks",
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: o(Kt),
              permissions: ["task:schedule:list"],
              name: "taskSchedules",
              index: !1
            },
            {
              path: "/tasks/:id",
              element: o(Et),
              permissions: ["task:view"],
              index: !1
            }
          ]
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(P, {}),
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
              icon: /* @__PURE__ */ e.jsx(it, {}),
              permissions: ["authorization:role:list"],
              children: [
                {
                  element: o(Ot),
                  permissions: ["authorization:role:view"],
                  index: !0,
                  name: "roles"
                },
                {
                  path: "/authorization/roles/create",
                  element: o(ce),
                  permissions: ["authorization:role:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "roleCreate"
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: o(ce),
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
              icon: /* @__PURE__ */ e.jsx(P, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: o(At),
                  permissions: ["authorization:user:list"],
                  index: !0,
                  name: "users"
                },
                {
                  path: "/authorization/users/create",
                  element: o(de),
                  permissions: ["authorization:user:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userCreate"
                },
                {
                  path: "/authorization/users/:id",
                  element: o(_t),
                  permissions: ["authorization:user:view"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userDetail"
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: o(de),
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
              icon: /* @__PURE__ */ e.jsx(P, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: o(Ut),
                  permissions: ["authorization:service_account:view"],
                  index: !0,
                  hideInMenu: !0,
                  name: "serviceAccounts"
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(Ft),
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
          icon: /* @__PURE__ */ e.jsx(rt, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view", "system:skills:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(st, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view", "system:skills:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  hideInMenu: !0,
                  element: o($t, { transformItems: a }),
                  name: "settings"
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(Ct),
                  name: "organizationDetail",
                  index: !1,
                  hideInMenu: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: o(Rt),
                  name: "skillEditor",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: o(Bt),
                  name: "skillPreview",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: o(Dt),
                  name: "aiTraceViewer",
                  hideInMenu: !0,
                  index: !1
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(ot, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !1,
              element: o(Tt)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: o(me),
          index: !0
        }
      ]
    }
  ];
  return [...w, ...I];
}, In = {
  ai: Ae,
  authorization: ue,
  base: pe,
  system: K,
  oauth: xe,
  tasks: ge
}, { Header: qt, Content: Qt, Footer: Wt, Sider: Yt } = q, { SubMenu: Zt } = D, Gt = kt(({ token: a, css: r }) => ({
  layout: r`
      min-height: 100vh;
      display: flex;
      flex-direction: row;
    `,
  header: r`
      padding: 0;
      display: flex;
      justify-content: space-between;
      background-color: ${a.colorBgContainer};
      border-block-end: 1px solid ${a.colorBorderSecondary};
    `,
  footer: r`
      text-align: center;
      padding: 15px 50px;
    `,
  contentContainer: r`
      padding: 24px;
      background-color: ${a.colorBgContainer};
    `,
  content: r`
      margin: 0 16px;
      height: calc(100vh - 120px);
      overflow: auto;
    `,
  mainLayout: r`
      flex: 1;
      min-width: 0;
      background-color: ${a.colorBgContainer};
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
})), Jt = ({
  element: a,
  siderWidth: r = 250,
  routes: g,
  transformLangConfig: z,
  menuStyle: w = "dark",
  transformHeaderItems: I = (b) => b,
  renderLayout: T,
  aiChatProps: O
}) => {
  const { themeMode: b, setThemeMode: p, isDarkMode: $ } = St(), { styles: d } = Gt(), { layout: k, visible: M, loaded: L, resetPageAIContext: S } = ct(), { t: c, i18n: l } = Q(), { t: j } = Q("common"), x = Ue(), { hasPermission: N } = ht(), W = Fe(), { logout: je, user: h } = ut(), { siteConfig: s, clearCurrentOrgId: ye } = pt(), [Y, Z] = A([]), [ve, we] = A(null), [U, be] = A("Loading...");
  _(() => {
    S();
  }, [x.pathname, S]), x.pathname !== "/profile" && (h && h.mfa_enforced && !h.mfa_enabled ? W("/profile#mfa") : h && h.status === "password_expired" && W("/profile#password"));
  const ke = () => {
    je(), ye(), window.location.href = fe("/login?redirect=" + encodeURIComponent(window.location.href));
  }, Se = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(B, { to: "/profile", children: j("profile") })
    },
    {
      key: "logout",
      label: j("logout"),
      onClick: ke
    }
  ];
  _(() => {
    var n, i;
    if (s) {
      const y = ((n = s.navigation) == null ? void 0 : n.filter((f) => f.path !== s.home_page)) ?? [], t = [...s.home_page ? [{
        name: "home",
        path: s.home_page
      }] : [], ...y];
      t.length > 1 ? Z(t) : Z([]), we(s.logo), (i = document.getElementById("site-icon")) == null || i.setAttribute("href", s.logo);
    }
  }, [s]), _(() => {
    l.language && be((s == null ? void 0 : s.name_i18n[l.language]) || (s == null ? void 0 : s.name) || "");
  }, [s, l.language]);
  const F = () => {
    const n = V(g, x.pathname), i = [];
    if (n) {
      for (const [y, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          i.push({
            href: t.route.path,
            title: j("home"),
            key: "home"
          });
        else if (t.route.name) {
          const f = n.slice(0, y + 1).map((C) => C.route.name).filter(Boolean).join(".");
          if ((i.length > 0 ? i[i.length - 1].path : void 0) === (t.route.path || t.pathnameBase))
            continue;
          i.push({
            path: t.pathnameBase,
            title: t.route.name ? c(`breadcrumbs.${f.replace(/\./g, "_")}`, { defaultValue: _e(t.route.name) }) : void 0,
            key: t.pathname || t.route.name
          });
        }
    }
    return i;
  }, ze = (n) => n.some((i) => N(i)), Ie = jt(g, (n) => "children" in n && n.children ? n.children : []).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), G = (n, i = []) => {
    const y = (t) => t && t.replace(/_/g, " ").split(" ").map((f) => f.charAt(0).toUpperCase() + f.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if ("hideInMenu" in t && t.hideInMenu || t.permissions && !ze(t.permissions))
        return null;
      const f = y(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const v = G(t.children, [...i, t.name]);
        return v.length == 0 && t.path ? /* @__PURE__ */ e.jsx(D.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(B, { to: t.path, children: c(`menu.${[...i, t.name].join(".")}`, { defaultValue: f }) }) }, t.path) : /* @__PURE__ */ e.jsx(Zt, { icon: t.icon, title: c(`menu.${[...i, t.name, t.name].join(".")}`, { defaultValue: f }), children: v }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(D.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(B, { to: t.path, children: c(`menu.${[...i, t.name].join(".")}`, { defaultValue: f }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  _(() => {
    const n = F().filter((i) => i.path !== "/").map((i) => i.title).join(" - ");
    n ? document.title = `${U} | ${n}` : document.title = U;
  }, [F, x.pathname]);
  const Me = Ge(() => {
    const n = V(g, x.pathname);
    if (n) {
      for (const i of n.reverse())
        if (i.route.path && i.route.name && !("hideInMenu" in i.route && i.route.hideInMenu))
          return i.route.path;
    }
    return x.pathname;
  }, [x.pathname]), Le = [
    /* @__PURE__ */ e.jsx(
      E,
      {
        className: "header-item navigation-dropdown",
        hidden: Y.length <= 1,
        menu: {
          items: Y.map((n) => ({
            key: n.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: c(`menu.${n.name}`, { defaultValue: n.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(lt, {})
      },
      "navigation-dropdown"
    ),
    ...s != null && s.enable_multi_org ? [/* @__PURE__ */ e.jsx(Xe, { className: "header-item org-switcher" }, "org-switcher")] : [],
    ...N("task:list") ? [/* @__PURE__ */ e.jsx(et, { className: "header-item task-dropdown" }, "task-dropdown")] : [],
    /* @__PURE__ */ e.jsxs(
      E,
      {
        className: "header-item user-dropdown",
        menu: { items: Se },
        children: [
          h != null && h.avatar ? /* @__PURE__ */ e.jsx(oe, { src: h.avatar }) : /* @__PURE__ */ e.jsx(oe, { icon: /* @__PURE__ */ e.jsx(P, {}) }),
          /* @__PURE__ */ e.jsx("span", { className: u("header-user-name", d.userName), children: (h == null ? void 0 : h.full_name) || (h == null ? void 0 : h.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(tt, { className: "header-item language-switch", transformLangConfig: z }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      E,
      {
        className: "header-item theme-switch",
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(re, {}),
              " ",
              j("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(le, {}),
              " ",
              j("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: n }) => {
            p(n);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(re, {}) : /* @__PURE__ */ e.jsx(le, {})
      },
      "theme-switch"
    )
  ], Ne = (n) => n ? yt(n).replace(/[^a-zA-Z0-9-]/g, "-") : "";
  return (T ?? ((n, i, y, t, f) => {
    var X, ee, te, ne, ae;
    const [v, C] = A(!1), J = Ne((ee = (X = V(g, x.pathname)) == null ? void 0 : X.pop()) == null ? void 0 : ee.route.name);
    return /* @__PURE__ */ e.jsxs(q, { className: u("main-layout", d.layout, { [`page-${J}`]: J }), children: [
      /* @__PURE__ */ e.jsxs(Yt, { width: r, collapsible: !0, collapsed: v, onCollapse: C, className: u(d.menuSider, "layout-menu-sider"), theme: $ ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: u("logo", d.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: u("layout-logo-container", d.layoutLogoContainer), children: n ? /* @__PURE__ */ e.jsx("img", { src: n, alt: "logo", className: d.layoutLogoImage }) : /* @__PURE__ */ e.jsx(He, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(D, { className: u("layout-menu", d.menu), theme: $ ? "light" : w, defaultOpenKeys: Ie, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [Me], children: i })
      ] }),
      /* @__PURE__ */ e.jsxs(q, { className: u("site-layout", "main-layout", d.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(qt, { className: u("site-header", d.header), children: [
          /* @__PURE__ */ e.jsxs(qe, { children: [
            /* @__PURE__ */ e.jsx(
              Qe,
              {
                type: "text",
                icon: v ? /* @__PURE__ */ e.jsx(mt, {}) : /* @__PURE__ */ e.jsx(dt, {}),
                onClick: () => C(!v),
                className: u("layout-menu-toggle", d.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(We, { className: u("site-breadcrumb", d.breadcrumb), itemRender: (R) => {
              const ie = R.href || R.path;
              return ie ? /* @__PURE__ */ e.jsx(B, { to: ie, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: u("header-items", d.headerItems), children: y })
        ] }),
        /* @__PURE__ */ e.jsxs(Qt, { className: u("site-content", d.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: u("site-content-container", d.contentContainer), children: f }),
          ((te = s == null ? void 0 : s.attrs) == null ? void 0 : te.ai_enabled) && /* @__PURE__ */ e.jsx(vt, {}),
          ((ne = s == null ? void 0 : s.attrs) == null ? void 0 : ne.ai_enabled) && k === "classic" && (M || L) && /* @__PURE__ */ e.jsx(wt, { ...O })
        ] }),
        /* @__PURE__ */ e.jsxs(Wt, { className: u("site-footer", d.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          U
        ] })
      ] }),
      ((ae = s == null ? void 0 : s.attrs) == null ? void 0 : ae.ai_enabled) && (k === "sidebar" || k === "float-sidebar") && (M || L) && /* @__PURE__ */ e.jsx(bt, { ...O })
    ] });
  }))(ve, G(g), I(Le), F(), a ?? /* @__PURE__ */ e.jsx(Ve, {}));
}, Xt = new Pe({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), he = {
  "zh-CN": De,
  "en-US": H,
  "de-DE": Be,
  "es-ES": Re,
  "fr-FR": Ce,
  "ar-AE": $e,
  "sv-SE": Oe
};
function Mn({
  transformRouter: a = (p) => p,
  transformSettingTabs: r = (p) => p,
  transformLangConfig: g = (p) => p,
  extraPrivateRoutes: z = [],
  extraPublicRoutes: w = [],
  menuStyle: I = "dark",
  transformHeaderItems: T = (p) => p,
  renderLayout: O,
  aiChatProps: b
}) {
  const { i18n: p } = Q(), [$, d] = A(he[p.language] || H);
  _(() => {
    d(he[p.language] || H);
  }, [p.language]);
  const k = (S) => S.map((c) => !("children" in c) || c.children === void 0 ? c : {
    ...c,
    children: k(c.children)
  }), M = a(k(Ht({
    transformSettingTabs: r,
    transformLangConfig: g,
    extraPrivateRoutes: z,
    extraPublicRoutes: w
  }))), L = (S, c) => S.flatMap((l) => l.is_private ? [l] : [l]).map((l, j) => {
    const x = l.is_private ? /* @__PURE__ */ e.jsx(nt, { element: /* @__PURE__ */ e.jsx(
      Jt,
      {
        routes: M,
        element: l.element,
        transformLangConfig: g,
        menuStyle: I,
        transformHeaderItems: T,
        renderLayout: O,
        aiChatProps: b
      }
    ) }) : l.element;
    if ("children" in l && l.children && l.children.length > 0)
      return /* @__PURE__ */ e.jsx(se, { path: l.path, element: x, children: L(l.children, l) }, l.path ?? l.name ?? j);
    const { path: N } = l;
    return /* @__PURE__ */ e.jsx(se, { path: N, index: l.index, element: x }, N ?? l.name ?? `${(c == null ? void 0 : c.path) ?? ""}.${j}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Te, { client: Xt, children: /* @__PURE__ */ e.jsx(zt, { children: /* @__PURE__ */ e.jsx(Ye, { locale: $, children: /* @__PURE__ */ e.jsx(ft, { children: /* @__PURE__ */ e.jsx(xt, { children: /* @__PURE__ */ e.jsx(gt, { children: /* @__PURE__ */ e.jsx(Ee, { basename: fe(), children: /* @__PURE__ */ e.jsx(Ke, { children: L(M) }) }) }) }) }) }) }) });
}
const Ln = {
  ...ue,
  ...pe,
  ...xe,
  ...K,
  ...K,
  ...ge
};
export {
  Mn as A,
  In as a,
  Ln as b,
  Jt as c,
  o as w
};
