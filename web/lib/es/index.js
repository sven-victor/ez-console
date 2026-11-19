import { a as ze } from "./ai.js";
import { a as le } from "./authorization.js";
import { d as me, g as ce, t as Me } from "./base.js";
import { i as Ae } from "./inbox.js";
import { a as K } from "./system.js";
import { o as de } from "./oauth.js";
import { t as he } from "./tasks.js";
import { j as e, L as Le, a as Ne, s as _e, b as Te, f as Ce, e as Oe, d as Re, c as H, z as De } from "./vendor.js";
import { QueryClient as Be, QueryClientProvider as Ee } from "react-query";
import { useLocation as $e, useNavigate as Ue, Link as E, matchRoutes as G, Outlet as Fe, BrowserRouter as Ve, Routes as Ge, Route as te } from "react-router-dom";
import { Layout as q, Spin as Ke, Menu as He, Space as qe, Button as Qe, Breadcrumb as Ye, ConfigProvider as We, App as Ze } from "antd";
import { useTranslation as Q } from "react-i18next";
import { lazy as o, Suspense as Je, useState as N, useEffect as _, useMemo as ue } from "react";
import { L as Xe, H as ne, O as Pe, I as et, T as tt, A as ae, a as nt, b as at, P as it } from "./components.js";
import { DashboardOutlined as st, SolutionOutlined as ot, UserOutlined as pe, SafetyOutlined as rt, FileSearchOutlined as lt, SettingOutlined as mt, SwapOutlined as ct, MenuUnfoldOutlined as dt, MenuFoldOutlined as ht } from "@ant-design/icons";
import { d as ut, a as pt, u as gt, b as xt, e as ft, f as yt, A as jt, S as wt, g as bt } from "./contexts.js";
import { flatMapDeep as vt, snakeCase as St } from "lodash-es";
import { A as It, a as kt, b as zt } from "./ai-chat-layout.js";
import { createStyles as Mt, useThemeMode as At, ThemeProvider as Lt, createGlobalStyle as Nt } from "antd-style";
import p from "classnames";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const _t = o(() => import("./dashboard.js")), Tt = o(() => import("./login.js")), Ct = o(() => import("./activate.js")), Ot = o(() => import("./profile.js")), Rt = o(() => import("./inbox_list.js")), ie = o(() => import("./not_found.js")), Dt = o(() => import("./forbidden.js")), Bt = o(() => import("./users.js").then((n) => n.U)), Et = o(() => import("./users.js").then((n) => n.a)), se = o(() => import("./users.js").then((n) => n.b)), $t = o(() => import("./roles.js").then((n) => n.R)), oe = o(() => import("./roles.js").then((n) => n.a)), Ut = o(() => import("./system-settings.js").then((n) => n.i)), Ft = o(() => import("./system-settings.js").then((n) => n.O)), Vt = o(() => import("./system-settings.js").then((n) => n.S)), Gt = o(() => import("./system-settings.js").then((n) => n.a)), Kt = o(() => import("./system-settings.js").then((n) => n.A)), Ht = o(() => import("./system-settings.js").then((n) => n.T)), qt = o(() => import("./system-settings.js").then((n) => n.b)), Qt = o(() => import("./audit.js")), Yt = o(() => import("./service-accounts.js").then((n) => n.S)), Wt = o(() => import("./service-accounts.js").then((n) => n.a)), Zt = o(() => import("./task_list.js")), Jt = o(() => import("./task_detail.js")), Xt = o(() => import("./task_schedule_list.js"));
function s(n, r) {
  return /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(Xe, {}), children: /* @__PURE__ */ e.jsx(n, { ...r }) });
}
const Pt = ({ transformSettingTabs: n, transformLangConfig: r, extraPrivateRoutes: f = [], extraPublicRoutes: A = [] }) => {
  const S = [
    {
      path: "/login",
      element: s(Tt, { transformLangConfig: r }),
      index: !0
    },
    {
      path: "/404",
      element: s(ie),
      index: !0
    },
    {
      path: "/403",
      element: s(Dt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: s(qt),
      index: !0
    },
    {
      path: "/activate",
      element: s(Ct, { transformLangConfig: r }),
      index: !0
    },
    ...A
  ], L = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: s(_t),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(st, {}),
          index: !0
        },
        {
          path: "/profile",
          element: s(Ot),
          hideInMenu: !0,
          name: "profile",
          index: !1
        },
        {
          path: "/inbox",
          element: s(Rt),
          hideInMenu: !0,
          name: "inbox",
          index: !1
        },
        ...f,
        {
          path: "/tasks",
          children: [
            {
              // path: '/tasks',
              // No permission required: the backend limits the result to the
              // current user's own tasks unless they hold task:list.
              element: s(Zt),
              name: "tasks",
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: s(Xt),
              permissions: ["task:schedule:list"],
              name: "taskSchedules",
              index: !1
            },
            {
              path: "/tasks/:id",
              // No permission required: the backend allows the task creator
              // to view their own task; task:view grants access to all tasks.
              element: s(Jt),
              index: !1
            }
          ]
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(pe, {}),
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
              icon: /* @__PURE__ */ e.jsx(ot, {}),
              permissions: ["authorization:role:view"],
              children: [
                {
                  element: s($t),
                  permissions: ["authorization:role:view"],
                  index: !0,
                  name: "roles"
                },
                {
                  path: "/authorization/roles/create",
                  element: s(oe),
                  permissions: ["authorization:role:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "roleCreate"
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: s(oe),
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
              icon: /* @__PURE__ */ e.jsx(Le, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: s(Bt),
                  permissions: ["authorization:user:list"],
                  index: !0,
                  name: "users"
                },
                {
                  path: "/authorization/users/create",
                  element: s(se),
                  permissions: ["authorization:user:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userCreate"
                },
                {
                  path: "/authorization/users/:id",
                  element: s(Et),
                  permissions: ["authorization:user:view"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userDetail"
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: s(se),
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
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: s(Yt),
                  permissions: ["authorization:service_account:view"],
                  index: !0,
                  hideInMenu: !0,
                  name: "serviceAccounts"
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: s(Wt),
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
          icon: /* @__PURE__ */ e.jsx(mt, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:audit_log:view", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view", "system:rate_limit:view", "system:rate_limit:update"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(rt, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view", "system:rate_limit:view", "system:rate_limit:update"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  hideInMenu: !0,
                  element: s(Ut, { transformItems: n }),
                  name: "settings"
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: s(Ft),
                  name: "organizationDetail",
                  index: !1,
                  hideInMenu: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: s(Vt),
                  name: "skillEditor",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: s(Gt),
                  name: "skillPreview",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: s(Kt),
                  name: "aiTraceViewer",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/toolsets/:id/debug",
                  permissions: ["system:toolsets:test"],
                  element: s(Ht),
                  name: "toolSetDebug",
                  hideInMenu: !0,
                  index: !1
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(lt, {}),
              name: "audit",
              permissions: ["system:audit_log:view"],
              index: !1,
              element: s(Qt)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: s(ie),
          index: !0
        }
      ]
    }
  ];
  return [...S, ...L];
}, Rn = {
  ai: ze,
  authorization: le,
  base: me,
  inbox: Ae,
  system: K,
  oauth: de,
  tasks: he
}, { Header: en, Content: tn, Footer: nn, Sider: an } = q, sn = Mt(({ token: n, css: r }) => ({
  layout: r`
      min-height: 100vh;
      display: flex;
      flex-direction: row;
    `,
  header: r`
      padding: 0;
      display: flex;
      justify-content: space-between;
      background-color: ${n.colorBgContainer};
      border-block-end: 1px solid ${n.colorBorderSecondary};
    `,
  footer: r`
      text-align: center;
      padding: 15px 50px;
    `,
  contentContainer: r`
      padding: 24px;
      background-color: ${n.colorBgContainer};
    `,
  content: r`
      margin: 0 16px;
      height: calc(100vh - 120px);
      overflow: auto;
    `,
  mainLayout: r`
      flex: 1;
      min-width: 0;
      background-color: ${n.colorBgContainer};
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
        border-radius: 0px;
      }
    `,
  layoutLogo: r`
      padding: 8px;
      border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
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
})), on = ({
  element: n,
  siderWidth: r = 250,
  routes: f,
  transformLangConfig: A,
  menuStyle: S = "dark",
  transformHeaderItems: L = (I) => I,
  renderLayout: $,
  aiChatProps: w
}) => {
  var X;
  const { isDarkMode: I } = At(), { styles: c } = sn(), { layout: g, visible: T, loaded: u, resetPageAIContext: C } = ut(), { t: b, i18n: k } = Q(), { t: z } = Q("common"), y = $e(), { hasPermission: j } = pt(), h = Ue(), { logout: m, user: d } = gt(), { siteConfig: l, clearCurrentOrgId: O } = xt();
  ft();
  const R = !!((X = l == null ? void 0 : l.attrs) != null && X.ai_enabled) && j("ai:chat:create"), [Y, W] = N([]), [xe, fe] = N(null), [U, ye] = N("Loading..."), [F, Z] = N(!1);
  _(() => {
    C();
  }, [y.pathname, C]), yt(f, R), y.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? h("/profile#mfa") : d && d.status === "password_expired" && h("/profile#password"));
  const je = () => {
    m(), O(), window.location.href = ce("/login?redirect=" + encodeURIComponent(window.location.href));
  }, we = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(E, { to: "/profile", children: z("profile") })
    },
    {
      key: "logout",
      label: z("logout"),
      onClick: je
    }
  ];
  _(() => {
    var a, i;
    if (l) {
      const v = ((a = l.navigation) == null ? void 0 : a.filter((x) => x.path !== l.home_page)) ?? [], t = [...l.home_page ? [{
        name: "home",
        path: l.home_page
      }] : [], ...v];
      t.length > 1 ? W(t) : W([]), fe(l.logo), (i = document.getElementById("site-icon")) == null || i.setAttribute("href", l.logo);
    }
  }, [l]), _(() => {
    k.language && ye((l == null ? void 0 : l.name_i18n[k.language]) || (l == null ? void 0 : l.name) || "");
  }, [l, k.language]);
  const V = () => {
    const a = G(f, y.pathname), i = [];
    if (a) {
      for (const [v, t] of a.entries())
        if (t.route.path === "/" && !t.route.name)
          i.push({
            href: t.route.path,
            title: z("home"),
            key: "home"
          });
        else if (t.route.name) {
          const x = a.slice(0, v + 1).map((D) => D.route.name).filter(Boolean).join(".");
          if ((i.length > 0 ? i[i.length - 1].path : void 0) === (t.route.path || t.pathnameBase))
            continue;
          i.push({
            path: t.pathnameBase,
            title: t.route.name ? b(`breadcrumbs.${x.replace(/\./g, "_")}`, { defaultValue: Me(t.route.name) }) : void 0,
            key: t.pathname || t.route.name
          });
        }
    }
    return i;
  }, be = (a) => a.some((i) => j(i)), ve = vt(f, (a) => "children" in a && a.children ? a.children : []).map((a) => a == null ? void 0 : a.name).filter((a) => a !== void 0), J = (a, i = []) => {
    const v = (t) => t && t.replace(/_/g, " ").split(" ").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
    return a.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if ("hideInMenu" in t && t.hideInMenu || t.permissions && !be(t.permissions))
        return null;
      const x = v(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const M = J(t.children, [...i, t.name]);
        return M.length == 0 && t.path ? {
          key: t.path,
          icon: t.icon,
          label: /* @__PURE__ */ e.jsx(E, { to: t.path, children: b(`menu.${[...i, t.name].join(".")}`, { defaultValue: x }) })
        } : {
          key: t.path ?? t.name,
          icon: t.icon,
          label: b(`menu.${[...i, t.name, t.name].join(".")}`, { defaultValue: x }),
          children: M
        };
      }
      return t.name && t.path ? {
        key: t.path,
        icon: t.icon,
        label: /* @__PURE__ */ e.jsx(E, { to: t.path, children: b(`menu.${[...i, t.name].join(".")}`, { defaultValue: x }) })
      } : null;
    }).filter(Boolean);
  };
  _(() => {
    const a = V().filter((i) => i.path !== "/").map((i) => i.title).join(" - ");
    a ? document.title = `${U} | ${a}` : document.title = U;
  }, [V, y.pathname]);
  const Se = ue(() => {
    const a = G(f, y.pathname);
    if (a) {
      for (const i of a.reverse())
        if (i.route.path && i.route.name && !("hideInMenu" in i.route && i.route.hideInMenu))
          return i.route.path;
    }
    return y.pathname;
  }, [y.pathname]), Ie = [
    /* @__PURE__ */ e.jsx(
      ne,
      {
        className: "header-item navigation-dropdown",
        hidden: Y.length <= 1,
        menu: {
          items: Y.map((a) => ({
            key: a.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: a.path, children: b(`menu.${a.name}`, { defaultValue: a.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(ct, {})
      },
      "navigation-dropdown"
    ),
    ...l != null && l.enable_multi_org ? [/* @__PURE__ */ e.jsx(Pe, { className: "header-item org-switcher" }, "org-switcher")] : [],
    /* @__PURE__ */ e.jsx(et, { className: "header-item inbox-dropdown" }, "inbox-dropdown"),
    /* @__PURE__ */ e.jsx(tt, { className: "header-item task-dropdown" }, "task-dropdown"),
    /* @__PURE__ */ e.jsxs(
      ne,
      {
        className: "header-item user-dropdown",
        menu: { items: we },
        children: [
          d != null && d.avatar ? /* @__PURE__ */ e.jsx(ae, { src: d.avatar, size: "small" }) : /* @__PURE__ */ e.jsx(ae, { icon: /* @__PURE__ */ e.jsx(pe, {}), size: "small" }),
          /* @__PURE__ */ e.jsx("span", { className: p("header-user-name", c.userName), children: (d == null ? void 0 : d.full_name) || (d == null ? void 0 : d.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(nt, { className: "header-item language-switch", transformLangConfig: A }, "language-switch"),
    /* @__PURE__ */ e.jsx(at, { className: "header-item theme-switch" }, "theme-switch")
  ], ke = (a) => a ? St(a).replace(/[^a-zA-Z0-9-]/g, "-") : "";
  return ($ ?? ((a, i, v, t, x) => {
    var D, P;
    const M = ke((P = (D = G(f, y.pathname)) == null ? void 0 : D.pop()) == null ? void 0 : P.route.name);
    return /* @__PURE__ */ e.jsxs(q, { className: p("main-layout", c.layout, { [`page-${M}`]: M }), children: [
      /* @__PURE__ */ e.jsxs(an, { width: r, collapsible: !0, collapsed: F, onCollapse: Z, className: p(c.menuSider, "layout-menu-sider"), theme: I ? "light" : S, children: [
        /* @__PURE__ */ e.jsx("div", { className: p("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: p("layout-logo-container", c.layoutLogoContainer), children: a ? /* @__PURE__ */ e.jsx("img", { src: a, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(Ke, {}) }) }),
        /* @__PURE__ */ e.jsx(
          He,
          {
            className: p("layout-menu", c.menu),
            theme: I ? "light" : S,
            defaultOpenKeys: ve,
            defaultSelectedKeys: ["1"],
            mode: "inline",
            selectedKeys: [Se],
            items: i
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs(q, { className: p("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(en, { className: p("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(qe, { children: [
            /* @__PURE__ */ e.jsx(
              Qe,
              {
                type: "text",
                icon: F ? /* @__PURE__ */ e.jsx(dt, {}) : /* @__PURE__ */ e.jsx(ht, {}),
                onClick: () => Z(!F),
                className: p("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(Ye, { className: p("site-breadcrumb", c.breadcrumb), itemRender: (B) => {
              const ee = B.href || B.path;
              return ee ? /* @__PURE__ */ e.jsx(E, { to: ee, children: B.title }) : /* @__PURE__ */ e.jsx("span", { children: B.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: p("header-items", c.headerItems), children: v })
        ] }),
        /* @__PURE__ */ e.jsxs(tn, { className: p("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: p("site-content-container", c.contentContainer), children: x }),
          R && /* @__PURE__ */ e.jsx(It, { icon: w == null ? void 0 : w.floatButtonIcon }),
          R && g === "classic" && (T || u) && /* @__PURE__ */ e.jsx(kt, { ...w })
        ] }),
        /* @__PURE__ */ e.jsxs(nn, { className: p("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          U
        ] })
      ] }),
      R && (g === "sidebar" || g === "float-sidebar") && (T || u) && /* @__PURE__ */ e.jsx(zt, { ...w })
    ] });
  }))(xe, J(f), L(Ie), V(), n ?? /* @__PURE__ */ e.jsx(Fe, {}));
}, ge = "theme-mode";
function rn({ styles: n }) {
  const r = ue(() => Nt(n), [n]);
  return /* @__PURE__ */ e.jsx(r, {});
}
function ln() {
  try {
    const n = localStorage.getItem(ge);
    if (n === "light" || n === "dark" || n === "auto")
      return n;
  } catch {
  }
  return "light";
}
const mn = new Be({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), re = {
  "zh-CN": De,
  "en-US": H,
  "de-DE": Re,
  "es-ES": Oe,
  "fr-FR": Ce,
  "ar-AE": Te,
  "sv-SE": _e
};
function Dn({
  transformRouter: n = (u) => u,
  transformSettingTabs: r = (u) => u,
  transformLangConfig: f = (u) => u,
  extraPrivateRoutes: A = [],
  extraPublicRoutes: S = [],
  menuStyle: L = "dark",
  transformHeaderItems: $ = (u) => u,
  renderLayout: w,
  aiChatProps: I,
  style: c,
  themeProviderProps: g,
  configProviderProps: T
}) {
  const { i18n: u } = Q(), [C, b] = N(re[u.language] || H);
  _(() => {
    b(re[u.language] || H);
  }, [u.language]);
  const k = (j) => j.map((h) => !("children" in h) || h.children === void 0 ? h : {
    ...h,
    children: k(h.children)
  }), z = n(k(Pt({
    transformSettingTabs: r,
    transformLangConfig: f,
    extraPrivateRoutes: A,
    extraPublicRoutes: S
  }))), y = (j, h) => j.flatMap((m) => m.is_private ? [m] : [m]).map((m, d) => {
    const l = m.is_private ? /* @__PURE__ */ e.jsx(it, { element: /* @__PURE__ */ e.jsx(
      on,
      {
        routes: z,
        element: m.element,
        transformLangConfig: f,
        menuStyle: L,
        transformHeaderItems: $,
        renderLayout: w,
        aiChatProps: I
      }
    ) }) : m.element;
    if ("children" in m && m.children && m.children.length > 0)
      return /* @__PURE__ */ e.jsx(te, { path: m.path, element: l, children: y(m.children, m) }, m.path ?? m.name ?? d);
    const { path: O } = m;
    return /* @__PURE__ */ e.jsx(te, { path: O, index: m.index, element: l }, O ?? m.name ?? `${(h == null ? void 0 : h.path) ?? ""}.${d}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Ee, { client: mn, children: /* @__PURE__ */ e.jsxs(
    Lt,
    {
      ...g,
      defaultThemeMode: (g == null ? void 0 : g.defaultThemeMode) ?? ln(),
      onThemeModeChange: (j) => {
        var h;
        try {
          localStorage.setItem(ge, j);
        } catch {
        }
        (h = g == null ? void 0 : g.onThemeModeChange) == null || h.call(g, j);
      },
      children: [
        c ? /* @__PURE__ */ e.jsx(rn, { styles: c }) : null,
        /* @__PURE__ */ e.jsx(We, { ...T, locale: C, children: /* @__PURE__ */ e.jsx(Ze, { children: /* @__PURE__ */ e.jsx(jt, { children: /* @__PURE__ */ e.jsx(wt, { children: /* @__PURE__ */ e.jsx(bt, { children: /* @__PURE__ */ e.jsx(Ve, { basename: ce(), children: /* @__PURE__ */ e.jsx(Ge, { children: y(z) }) }) }) }) }) }) })
      ]
    }
  ) });
}
const Bn = o(() => import("./ai-chat.js")), En = o(() => import("./markdown-viewer.js")), $n = o(() => import("./markdown-viewer.js").then((n) => ({ default: n.Code }))), Un = {
  ...le,
  ...me,
  ...de,
  ...K,
  ...K,
  ...he
};
export {
  Bn as A,
  $n as M,
  Rn as a,
  on as b,
  Dn as c,
  En as d,
  Un as e,
  s as w
};
