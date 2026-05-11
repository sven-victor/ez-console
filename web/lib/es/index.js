import { a as _e } from "./ai.js";
import { a as ue } from "./authorization.js";
import { b as pe, g as fe, a as Ae } from "./base.js";
import { a as J } from "./system.js";
import { o as ge } from "./oauth.js";
import { t as xe } from "./tasks.js";
import { j as e, d as Ce, a as Oe, b as $e, c as Re, e as De, f as K, g as Te } from "./vendor.js";
import { QueryClient as Be, QueryClientProvider as Pe } from "react-query";
import { useLocation as Fe, useNavigate as Ue, Link as D, matchRoutes as V, Outlet as Ve, BrowserRouter as Ee, Routes as Je, Route as ie } from "react-router-dom";
import { Layout as H, Menu as T, Spin as Ke, Space as He, Button as qe, Breadcrumb as Qe, ConfigProvider as We } from "antd";
import { useTranslation as q } from "react-i18next";
import { lazy as i, Suspense as Ye, useState as _, useEffect as A, useMemo as Ze } from "react";
import { L as Ge, H as E, O as Xe, T as et, A as oe, a as tt, P as nt } from "./components.js";
import { DashboardOutlined as at, SolutionOutlined as st, UserOutlined as B, SafetyOutlined as it, FileSearchOutlined as ot, SettingOutlined as rt, SwapOutlined as lt, SunOutlined as re, MoonOutlined as le, MenuUnfoldOutlined as mt, MenuFoldOutlined as dt } from "@ant-design/icons";
import { u as ct, b as ht, a as ut, c as pt, A as ft, S as gt, e as xt } from "./contexts.js";
import { flatMapDeep as yt, snakeCase as jt } from "lodash-es";
import { A as vt, a as wt, b as bt } from "./ai-chat-layout.js";
import { createStyles as kt, useThemeMode as St, ThemeProvider as It } from "antd-style";
import u from "classnames";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const zt = i(() => import("./dashboard.js")), Mt = i(() => import("./login.js")), Lt = i(() => import("./profile.js")), me = i(() => import("./not_found.js")), Nt = i(() => import("./forbidden.js")), _t = i(() => import("./users.js").then((n) => n.U)), At = i(() => import("./users.js").then((n) => n.a)), de = i(() => import("./users.js").then((n) => n.b)), Ct = i(() => import("./roles.js").then((n) => n.R)), ce = i(() => import("./roles.js").then((n) => n.a)), Ot = i(() => import("./system-settings.js").then((n) => n.i)), $t = i(() => import("./system-settings.js").then((n) => n.O)), Rt = i(() => import("./system-settings.js").then((n) => n.S)), Dt = i(() => import("./system-settings.js").then((n) => n.a)), Tt = i(() => import("./system-settings.js").then((n) => n.A)), Bt = i(() => import("./system-settings.js").then((n) => n.T)), Pt = i(() => import("./system-settings.js").then((n) => n.b)), Ft = i(() => import("./audit.js")), Ut = i(() => import("./service-accounts.js").then((n) => n.S)), Vt = i(() => import("./service-accounts.js").then((n) => n.a)), Et = i(() => import("./task_list.js")), Jt = i(() => import("./task_detail.js")), Kt = i(() => import("./task_schedule_list.js"));
function r(n, l) {
  return /* @__PURE__ */ e.jsx(Ye, { fallback: /* @__PURE__ */ e.jsx(Ge, {}), children: /* @__PURE__ */ e.jsx(n, { ...l }) });
}
const Ht = ({ transformSettingTabs: n, transformLangConfig: l, extraPrivateRoutes: x = [], extraPublicRoutes: I = [] }) => {
  const w = [
    {
      path: "/login",
      element: r(Mt, { transformLangConfig: l }),
      index: !0
    },
    {
      path: "/404",
      element: r(me),
      index: !0
    },
    {
      path: "/403",
      element: r(Nt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: r(Pt),
      index: !0
    },
    ...I
  ], z = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: r(zt),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(at, {}),
          index: !0
        },
        {
          path: "/profile",
          element: r(Lt),
          hideInMenu: !0,
          name: "profile",
          index: !1
        },
        ...x,
        {
          path: "/tasks",
          permissions: ["task:list", "task:schedule:list"],
          children: [
            {
              // path: '/tasks',
              element: r(Et),
              permissions: ["task:list"],
              name: "tasks",
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: r(Kt),
              permissions: ["task:schedule:list"],
              name: "taskSchedules",
              index: !1
            },
            {
              path: "/tasks/:id",
              element: r(Jt),
              permissions: ["task:view"],
              index: !1
            }
          ]
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(B, {}),
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
              icon: /* @__PURE__ */ e.jsx(st, {}),
              permissions: ["authorization:role:view"],
              children: [
                {
                  element: r(Ct),
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
              icon: /* @__PURE__ */ e.jsx(B, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: r(_t),
                  permissions: ["authorization:user:list"],
                  index: !0,
                  name: "users"
                },
                {
                  path: "/authorization/users/create",
                  element: r(de),
                  permissions: ["authorization:user:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userCreate"
                },
                {
                  path: "/authorization/users/:id",
                  element: r(At),
                  permissions: ["authorization:user:view"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userDetail"
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: r(de),
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
              icon: /* @__PURE__ */ e.jsx(B, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: r(Ut),
                  permissions: ["authorization:service_account:view"],
                  index: !0,
                  hideInMenu: !0,
                  name: "serviceAccounts"
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: r(Vt),
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
          permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:audit_log:view", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(it, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  hideInMenu: !0,
                  element: r(Ot, { transformItems: n }),
                  name: "settings"
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: r($t),
                  name: "organizationDetail",
                  index: !1,
                  hideInMenu: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: r(Rt),
                  name: "skillEditor",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: r(Dt),
                  name: "skillPreview",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: r(Tt),
                  name: "aiTraceViewer",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/toolsets/:id/debug",
                  permissions: ["system:toolsets:test"],
                  element: r(Bt),
                  name: "toolSetDebug",
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
              permissions: ["system:audit_log:view"],
              index: !1,
              element: r(Ft)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: r(me),
          index: !0
        }
      ]
    }
  ];
  return [...w, ...z];
}, zn = {
  ai: _e,
  authorization: ue,
  base: pe,
  system: J,
  oauth: ge,
  tasks: xe
}, { Header: qt, Content: Qt, Footer: Wt, Sider: Yt } = H, { SubMenu: Zt } = T, Gt = kt(({ token: n, css: l }) => ({
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
})), Xt = ({
  element: n,
  siderWidth: l = 250,
  routes: x,
  transformLangConfig: I,
  menuStyle: w = "dark",
  transformHeaderItems: z = (b) => b,
  renderLayout: P,
  aiChatProps: C
}) => {
  const { themeMode: b, setThemeMode: p, isDarkMode: O } = St(), { styles: d } = Gt(), { layout: k, visible: M, loaded: L, resetPageAIContext: S } = ct(), { t: c, i18n: m } = q(), { t: y } = q("common"), g = Fe(), { hasPermission: N } = ht(), Q = Ue(), { logout: ye, user: h } = ut(), { siteConfig: o, clearCurrentOrgId: je } = pt(), [W, Y] = _([]), [ve, we] = _(null), [F, be] = _("Loading...");
  A(() => {
    S();
  }, [g.pathname, S]), g.pathname !== "/profile" && (h && h.mfa_enforced && !h.mfa_enabled ? Q("/profile#mfa") : h && h.status === "password_expired" && Q("/profile#password"));
  const ke = () => {
    ye(), je(), window.location.href = fe("/login?redirect=" + encodeURIComponent(window.location.href));
  }, Se = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(D, { to: "/profile", children: y("profile") })
    },
    {
      key: "logout",
      label: y("logout"),
      onClick: ke
    }
  ];
  A(() => {
    var a, s;
    if (o) {
      const j = ((a = o.navigation) == null ? void 0 : a.filter((f) => f.path !== o.home_page)) ?? [], t = [...o.home_page ? [{
        name: "home",
        path: o.home_page
      }] : [], ...j];
      t.length > 1 ? Y(t) : Y([]), we(o.logo), (s = document.getElementById("site-icon")) == null || s.setAttribute("href", o.logo);
    }
  }, [o]), A(() => {
    m.language && be((o == null ? void 0 : o.name_i18n[m.language]) || (o == null ? void 0 : o.name) || "");
  }, [o, m.language]);
  const U = () => {
    const a = V(x, g.pathname), s = [];
    if (a) {
      for (const [j, t] of a.entries())
        if (t.route.path === "/" && !t.route.name)
          s.push({
            href: t.route.path,
            title: y("home"),
            key: "home"
          });
        else if (t.route.name) {
          const f = a.slice(0, j + 1).map(($) => $.route.name).filter(Boolean).join(".");
          if ((s.length > 0 ? s[s.length - 1].path : void 0) === (t.route.path || t.pathnameBase))
            continue;
          s.push({
            path: t.pathnameBase,
            title: t.route.name ? c(`breadcrumbs.${f.replace(/\./g, "_")}`, { defaultValue: Ae(t.route.name) }) : void 0,
            key: t.pathname || t.route.name
          });
        }
    }
    return s;
  }, Ie = (a) => a.some((s) => N(s)), ze = yt(x, (a) => "children" in a && a.children ? a.children : []).map((a) => a == null ? void 0 : a.name).filter((a) => a !== void 0), Z = (a, s = []) => {
    const j = (t) => t && t.replace(/_/g, " ").split(" ").map((f) => f.charAt(0).toUpperCase() + f.slice(1)).join(" ");
    return a.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if ("hideInMenu" in t && t.hideInMenu || t.permissions && !Ie(t.permissions))
        return null;
      const f = j(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const v = Z(t.children, [...s, t.name]);
        return v.length == 0 && t.path ? /* @__PURE__ */ e.jsx(T.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(D, { to: t.path, children: c(`menu.${[...s, t.name].join(".")}`, { defaultValue: f }) }) }, t.path) : /* @__PURE__ */ e.jsx(Zt, { icon: t.icon, title: c(`menu.${[...s, t.name, t.name].join(".")}`, { defaultValue: f }), children: v }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(T.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(D, { to: t.path, children: c(`menu.${[...s, t.name].join(".")}`, { defaultValue: f }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  A(() => {
    const a = U().filter((s) => s.path !== "/").map((s) => s.title).join(" - ");
    a ? document.title = `${F} | ${a}` : document.title = F;
  }, [U, g.pathname]);
  const Me = Ze(() => {
    const a = V(x, g.pathname);
    if (a) {
      for (const s of a.reverse())
        if (s.route.path && s.route.name && !("hideInMenu" in s.route && s.route.hideInMenu))
          return s.route.path;
    }
    return g.pathname;
  }, [g.pathname]), Le = [
    /* @__PURE__ */ e.jsx(
      E,
      {
        className: "header-item navigation-dropdown",
        hidden: W.length <= 1,
        menu: {
          items: W.map((a) => ({
            key: a.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: a.path, children: c(`menu.${a.name}`, { defaultValue: a.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(lt, {})
      },
      "navigation-dropdown"
    ),
    ...o != null && o.enable_multi_org ? [/* @__PURE__ */ e.jsx(Xe, { className: "header-item org-switcher" }, "org-switcher")] : [],
    ...N("task:list") ? [/* @__PURE__ */ e.jsx(et, { className: "header-item task-dropdown" }, "task-dropdown")] : [],
    /* @__PURE__ */ e.jsxs(
      E,
      {
        className: "header-item user-dropdown",
        menu: { items: Se },
        children: [
          h != null && h.avatar ? /* @__PURE__ */ e.jsx(oe, { src: h.avatar }) : /* @__PURE__ */ e.jsx(oe, { icon: /* @__PURE__ */ e.jsx(B, {}) }),
          /* @__PURE__ */ e.jsx("span", { className: u("header-user-name", d.userName), children: (h == null ? void 0 : h.full_name) || (h == null ? void 0 : h.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(tt, { className: "header-item language-switch", transformLangConfig: I }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      E,
      {
        className: "header-item theme-switch",
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(re, {}),
              " ",
              y("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(le, {}),
              " ",
              y("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: a }) => {
            p(a);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(re, {}) : /* @__PURE__ */ e.jsx(le, {})
      },
      "theme-switch"
    )
  ], Ne = (a) => a ? jt(a).replace(/[^a-zA-Z0-9-]/g, "-") : "";
  return (P ?? ((a, s, j, t, f) => {
    var X, ee, te, ne, ae;
    const [v, $] = _(!1), G = Ne((ee = (X = V(x, g.pathname)) == null ? void 0 : X.pop()) == null ? void 0 : ee.route.name);
    return /* @__PURE__ */ e.jsxs(H, { className: u("main-layout", d.layout, { [`page-${G}`]: G }), children: [
      /* @__PURE__ */ e.jsxs(Yt, { width: l, collapsible: !0, collapsed: v, onCollapse: $, className: u(d.menuSider, "layout-menu-sider"), theme: O ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: u("logo", d.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: u("layout-logo-container", d.layoutLogoContainer), children: a ? /* @__PURE__ */ e.jsx("img", { src: a, alt: "logo", className: d.layoutLogoImage }) : /* @__PURE__ */ e.jsx(Ke, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(T, { className: u("layout-menu", d.menu), theme: O ? "light" : w, defaultOpenKeys: ze, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [Me], children: s })
      ] }),
      /* @__PURE__ */ e.jsxs(H, { className: u("site-layout", "main-layout", d.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(qt, { className: u("site-header", d.header), children: [
          /* @__PURE__ */ e.jsxs(He, { children: [
            /* @__PURE__ */ e.jsx(
              qe,
              {
                type: "text",
                icon: v ? /* @__PURE__ */ e.jsx(mt, {}) : /* @__PURE__ */ e.jsx(dt, {}),
                onClick: () => $(!v),
                className: u("layout-menu-toggle", d.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(Qe, { className: u("site-breadcrumb", d.breadcrumb), itemRender: (R) => {
              const se = R.href || R.path;
              return se ? /* @__PURE__ */ e.jsx(D, { to: se, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: u("header-items", d.headerItems), children: j })
        ] }),
        /* @__PURE__ */ e.jsxs(Qt, { className: u("site-content", d.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: u("site-content-container", d.contentContainer), children: f }),
          ((te = o == null ? void 0 : o.attrs) == null ? void 0 : te.ai_enabled) && /* @__PURE__ */ e.jsx(vt, {}),
          ((ne = o == null ? void 0 : o.attrs) == null ? void 0 : ne.ai_enabled) && k === "classic" && (M || L) && /* @__PURE__ */ e.jsx(wt, { ...C })
        ] }),
        /* @__PURE__ */ e.jsxs(Wt, { className: u("site-footer", d.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          F
        ] })
      ] }),
      ((ae = o == null ? void 0 : o.attrs) == null ? void 0 : ae.ai_enabled) && (k === "sidebar" || k === "float-sidebar") && (M || L) && /* @__PURE__ */ e.jsx(bt, { ...C })
    ] });
  }))(ve, Z(x), z(Le), U(), n ?? /* @__PURE__ */ e.jsx(Ve, {}));
}, en = new Be({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), he = {
  "zh-CN": Te,
  "en-US": K,
  "de-DE": De,
  "es-ES": Re,
  "fr-FR": $e,
  "ar-AE": Oe,
  "sv-SE": Ce
};
function Mn({
  transformRouter: n = (p) => p,
  transformSettingTabs: l = (p) => p,
  transformLangConfig: x = (p) => p,
  extraPrivateRoutes: I = [],
  extraPublicRoutes: w = [],
  menuStyle: z = "dark",
  transformHeaderItems: P = (p) => p,
  renderLayout: C,
  aiChatProps: b
}) {
  const { i18n: p } = q(), [O, d] = _(he[p.language] || K);
  A(() => {
    d(he[p.language] || K);
  }, [p.language]);
  const k = (S) => S.map((c) => !("children" in c) || c.children === void 0 ? c : {
    ...c,
    children: k(c.children)
  }), M = n(k(Ht({
    transformSettingTabs: l,
    transformLangConfig: x,
    extraPrivateRoutes: I,
    extraPublicRoutes: w
  }))), L = (S, c) => S.flatMap((m) => m.is_private ? [m] : [m]).map((m, y) => {
    const g = m.is_private ? /* @__PURE__ */ e.jsx(nt, { element: /* @__PURE__ */ e.jsx(
      Xt,
      {
        routes: M,
        element: m.element,
        transformLangConfig: x,
        menuStyle: z,
        transformHeaderItems: P,
        renderLayout: C,
        aiChatProps: b
      }
    ) }) : m.element;
    if ("children" in m && m.children && m.children.length > 0)
      return /* @__PURE__ */ e.jsx(ie, { path: m.path, element: g, children: L(m.children, m) }, m.path ?? m.name ?? y);
    const { path: N } = m;
    return /* @__PURE__ */ e.jsx(ie, { path: N, index: m.index, element: g }, N ?? m.name ?? `${(c == null ? void 0 : c.path) ?? ""}.${y}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Pe, { client: en, children: /* @__PURE__ */ e.jsx(It, { children: /* @__PURE__ */ e.jsx(We, { locale: O, children: /* @__PURE__ */ e.jsx(ft, { children: /* @__PURE__ */ e.jsx(gt, { children: /* @__PURE__ */ e.jsx(xt, { children: /* @__PURE__ */ e.jsx(Ee, { basename: fe(), children: /* @__PURE__ */ e.jsx(Je, { children: L(M) }) }) }) }) }) }) }) });
}
const Ln = i(() => import("./ai-chat.js")), Nn = i(() => import("./json-schema-config-form.js").then((n) => ({ default: n.JsonSchemaConfigForm }))), _n = i(() => import("./json-schema-config-form.js").then((n) => ({ default: n.JsonSchemaConfigFormItem }))), An = i(() => import("./markdown-viewer.js")), Cn = i(() => import("./markdown-viewer.js").then((n) => ({ default: n.Code }))), On = {
  ...ue,
  ...pe,
  ...ge,
  ...J,
  ...J,
  ...xe
};
export {
  Ln as A,
  Nn as J,
  An as M,
  zn as a,
  On as b,
  _n as c,
  Cn as d,
  Mn as e,
  Xt as f,
  r as w
};
