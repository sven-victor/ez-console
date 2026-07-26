import { a as Ce } from "./ai.js";
import { a as ce } from "./authorization.js";
import { b as de, g as he, t as Le } from "./base.js";
import { a as K } from "./system.js";
import { o as ue } from "./oauth.js";
import { t as pe } from "./tasks.js";
import { j as e, L as Ne, a as _e, s as Oe, b as Te, f as Re, e as De, d as Ee, c as J, z as Be } from "./vendor.js";
import { QueryClient as Pe, QueryClientProvider as $e } from "react-query";
import { useLocation as Fe, useNavigate as Ue, Link as D, matchRoutes as U, Outlet as Ve, BrowserRouter as Ke, Routes as Je, Route as ne } from "react-router-dom";
import { Layout as H, Spin as He, Menu as qe, Space as Ge, Button as Qe, Breadcrumb as Ye, ConfigProvider as We, App as Ze } from "antd";
import { useTranslation as q } from "react-i18next";
import { lazy as i, Suspense as Xe, useState as L, useEffect as N, useMemo as et } from "react";
import { L as tt, H as V, O as nt, T as at, A as ae, a as it, P as st } from "./components.js";
import { DashboardOutlined as ot, SolutionOutlined as rt, UserOutlined as ge, SafetyOutlined as lt, FileSearchOutlined as mt, SettingOutlined as ct, SwapOutlined as dt, SunOutlined as ie, MoonOutlined as se, MenuUnfoldOutlined as ht, MenuFoldOutlined as ut } from "@ant-design/icons";
import { d as pt, a as gt, u as ft, b as xt, A as yt, S as jt, e as vt } from "./contexts.js";
import { flatMapDeep as wt, snakeCase as bt } from "lodash-es";
import { A as St, a as kt, b as Mt } from "./ai-chat-layout.js";
import { createStyles as It, useThemeMode as zt, ThemeProvider as At } from "antd-style";
import u from "classnames";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Ct = i(() => import("./dashboard.js")), Lt = i(() => import("./login.js")), Nt = i(() => import("./activate.js")), _t = i(() => import("./profile.js")), oe = i(() => import("./not_found.js")), Ot = i(() => import("./forbidden.js")), Tt = i(() => import("./users.js").then((n) => n.U)), Rt = i(() => import("./users.js").then((n) => n.a)), re = i(() => import("./users.js").then((n) => n.b)), Dt = i(() => import("./roles.js").then((n) => n.R)), le = i(() => import("./roles.js").then((n) => n.a)), Et = i(() => import("./system-settings.js").then((n) => n.i)), Bt = i(() => import("./system-settings.js").then((n) => n.O)), Pt = i(() => import("./system-settings.js").then((n) => n.S)), $t = i(() => import("./system-settings.js").then((n) => n.a)), Ft = i(() => import("./system-settings.js").then((n) => n.A)), Ut = i(() => import("./system-settings.js").then((n) => n.T)), Vt = i(() => import("./system-settings.js").then((n) => n.b)), Kt = i(() => import("./audit.js")), Jt = i(() => import("./service-accounts.js").then((n) => n.S)), Ht = i(() => import("./service-accounts.js").then((n) => n.a)), qt = i(() => import("./task_list.js")), Gt = i(() => import("./task_detail.js")), Qt = i(() => import("./task_schedule_list.js"));
function o(n, r) {
  return /* @__PURE__ */ e.jsx(Xe, { fallback: /* @__PURE__ */ e.jsx(tt, {}), children: /* @__PURE__ */ e.jsx(n, { ...r }) });
}
const Yt = ({ transformSettingTabs: n, transformLangConfig: r, extraPrivateRoutes: x = [], extraPublicRoutes: M = [] }) => {
  const w = [
    {
      path: "/login",
      element: o(Lt, { transformLangConfig: r }),
      index: !0
    },
    {
      path: "/404",
      element: o(oe),
      index: !0
    },
    {
      path: "/403",
      element: o(Ot),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o(Vt),
      index: !0
    },
    {
      path: "/activate",
      element: o(Nt, { transformLangConfig: r }),
      index: !0
    },
    ...M
  ], I = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: o(Ct),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(ot, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(_t),
          hideInMenu: !0,
          name: "profile",
          index: !1
        },
        ...x,
        {
          path: "/tasks",
          children: [
            {
              // path: '/tasks',
              // No permission required: the backend limits the result to the
              // current user's own tasks unless they hold task:list.
              element: o(qt),
              name: "tasks",
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: o(Qt),
              permissions: ["task:schedule:list"],
              name: "taskSchedules",
              index: !1
            },
            {
              path: "/tasks/:id",
              // No permission required: the backend allows the task creator
              // to view their own task; task:view grants access to all tasks.
              element: o(Gt),
              index: !1
            }
          ]
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(ge, {}),
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
              icon: /* @__PURE__ */ e.jsx(rt, {}),
              permissions: ["authorization:role:view"],
              children: [
                {
                  element: o(Dt),
                  permissions: ["authorization:role:view"],
                  index: !0,
                  name: "roles"
                },
                {
                  path: "/authorization/roles/create",
                  element: o(le),
                  permissions: ["authorization:role:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "roleCreate"
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: o(le),
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
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: o(Tt),
                  permissions: ["authorization:user:list"],
                  index: !0,
                  name: "users"
                },
                {
                  path: "/authorization/users/create",
                  element: o(re),
                  permissions: ["authorization:user:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userCreate"
                },
                {
                  path: "/authorization/users/:id",
                  element: o(Rt),
                  permissions: ["authorization:user:view"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userDetail"
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: o(re),
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
              icon: /* @__PURE__ */ e.jsx(_e, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: o(Jt),
                  permissions: ["authorization:service_account:view"],
                  index: !0,
                  hideInMenu: !0,
                  name: "serviceAccounts"
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(Ht),
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
          icon: /* @__PURE__ */ e.jsx(ct, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:audit_log:view", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(lt, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  hideInMenu: !0,
                  element: o(Et, { transformItems: n }),
                  name: "settings"
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(Bt),
                  name: "organizationDetail",
                  index: !1,
                  hideInMenu: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: o(Pt),
                  name: "skillEditor",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: o($t),
                  name: "skillPreview",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: o(Ft),
                  name: "aiTraceViewer",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/toolsets/:id/debug",
                  permissions: ["system:toolsets:test"],
                  element: o(Ut),
                  name: "toolSetDebug",
                  hideInMenu: !0,
                  index: !1
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(mt, {}),
              name: "audit",
              permissions: ["system:audit_log:view"],
              index: !1,
              element: o(Kt)
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
  return [...w, ...I];
}, Ln = {
  ai: Ce,
  authorization: ce,
  base: de,
  system: K,
  oauth: ue,
  tasks: pe
}, { Header: Wt, Content: Zt, Footer: Xt, Sider: en } = H, tn = It(({ token: n, css: r }) => ({
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
})), nn = ({
  element: n,
  siderWidth: r = 250,
  routes: x,
  transformLangConfig: M,
  menuStyle: w = "dark",
  transformHeaderItems: I = (b) => b,
  renderLayout: E,
  aiChatProps: _
}) => {
  var X;
  const { themeMode: b, setThemeMode: p, isDarkMode: O } = zt(), { styles: c } = tn(), { layout: S, visible: z, loaded: A, resetPageAIContext: y } = pt(), { t: d, i18n: l } = q(), { t: j } = q("common"), f = Fe(), { hasPermission: C } = gt(), G = Ue(), { logout: xe, user: h } = ft(), { siteConfig: m, clearCurrentOrgId: ye } = xt(), B = !!((X = m == null ? void 0 : m.attrs) != null && X.ai_enabled) && C("ai:chat:create"), [Q, Y] = L([]), [je, ve] = L(null), [P, we] = L("Loading..."), [$, W] = L(!1);
  N(() => {
    y();
  }, [f.pathname, y]), f.pathname !== "/profile" && (h && h.mfa_enforced && !h.mfa_enabled ? G("/profile#mfa") : h && h.status === "password_expired" && G("/profile#password"));
  const be = () => {
    xe(), ye(), window.location.href = he("/login?redirect=" + encodeURIComponent(window.location.href));
  }, Se = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(D, { to: "/profile", children: j("profile") })
    },
    {
      key: "logout",
      label: j("logout"),
      onClick: be
    }
  ];
  N(() => {
    var a, s;
    if (m) {
      const v = ((a = m.navigation) == null ? void 0 : a.filter((g) => g.path !== m.home_page)) ?? [], t = [...m.home_page ? [{
        name: "home",
        path: m.home_page
      }] : [], ...v];
      t.length > 1 ? Y(t) : Y([]), ve(m.logo), (s = document.getElementById("site-icon")) == null || s.setAttribute("href", m.logo);
    }
  }, [m]), N(() => {
    l.language && we((m == null ? void 0 : m.name_i18n[l.language]) || (m == null ? void 0 : m.name) || "");
  }, [m, l.language]);
  const F = () => {
    const a = U(x, f.pathname), s = [];
    if (a) {
      for (const [v, t] of a.entries())
        if (t.route.path === "/" && !t.route.name)
          s.push({
            href: t.route.path,
            title: j("home"),
            key: "home"
          });
        else if (t.route.name) {
          const g = a.slice(0, v + 1).map((T) => T.route.name).filter(Boolean).join(".");
          if ((s.length > 0 ? s[s.length - 1].path : void 0) === (t.route.path || t.pathnameBase))
            continue;
          s.push({
            path: t.pathnameBase,
            title: t.route.name ? d(`breadcrumbs.${g.replace(/\./g, "_")}`, { defaultValue: Le(t.route.name) }) : void 0,
            key: t.pathname || t.route.name
          });
        }
    }
    return s;
  }, ke = (a) => a.some((s) => C(s)), Me = wt(x, (a) => "children" in a && a.children ? a.children : []).map((a) => a == null ? void 0 : a.name).filter((a) => a !== void 0), Z = (a, s = []) => {
    const v = (t) => t && t.replace(/_/g, " ").split(" ").map((g) => g.charAt(0).toUpperCase() + g.slice(1)).join(" ");
    return a.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if ("hideInMenu" in t && t.hideInMenu || t.permissions && !ke(t.permissions))
        return null;
      const g = v(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const k = Z(t.children, [...s, t.name]);
        return k.length == 0 && t.path ? {
          key: t.path,
          icon: t.icon,
          label: /* @__PURE__ */ e.jsx(D, { to: t.path, children: d(`menu.${[...s, t.name].join(".")}`, { defaultValue: g }) })
        } : {
          key: t.path ?? t.name,
          icon: t.icon,
          label: d(`menu.${[...s, t.name, t.name].join(".")}`, { defaultValue: g }),
          children: k
        };
      }
      return t.name && t.path ? {
        key: t.path,
        icon: t.icon,
        label: /* @__PURE__ */ e.jsx(D, { to: t.path, children: d(`menu.${[...s, t.name].join(".")}`, { defaultValue: g }) })
      } : null;
    }).filter(Boolean);
  };
  N(() => {
    const a = F().filter((s) => s.path !== "/").map((s) => s.title).join(" - ");
    a ? document.title = `${P} | ${a}` : document.title = P;
  }, [F, f.pathname]);
  const Ie = et(() => {
    const a = U(x, f.pathname);
    if (a) {
      for (const s of a.reverse())
        if (s.route.path && s.route.name && !("hideInMenu" in s.route && s.route.hideInMenu))
          return s.route.path;
    }
    return f.pathname;
  }, [f.pathname]), ze = [
    /* @__PURE__ */ e.jsx(
      V,
      {
        className: "header-item navigation-dropdown",
        hidden: Q.length <= 1,
        menu: {
          items: Q.map((a) => ({
            key: a.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: a.path, children: d(`menu.${a.name}`, { defaultValue: a.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(dt, {})
      },
      "navigation-dropdown"
    ),
    ...m != null && m.enable_multi_org ? [/* @__PURE__ */ e.jsx(nt, { className: "header-item org-switcher" }, "org-switcher")] : [],
    /* @__PURE__ */ e.jsx(at, { className: "header-item task-dropdown" }, "task-dropdown"),
    /* @__PURE__ */ e.jsxs(
      V,
      {
        className: "header-item user-dropdown",
        menu: { items: Se },
        children: [
          h != null && h.avatar ? /* @__PURE__ */ e.jsx(ae, { src: h.avatar }) : /* @__PURE__ */ e.jsx(ae, { icon: /* @__PURE__ */ e.jsx(ge, {}) }),
          /* @__PURE__ */ e.jsx("span", { className: u("header-user-name", c.userName), children: (h == null ? void 0 : h.full_name) || (h == null ? void 0 : h.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(it, { className: "header-item language-switch", transformLangConfig: M }, "language-switch"),
    /* @__PURE__ */ e.jsx(
      V,
      {
        className: "header-item theme-switch",
        menu: {
          items: [
            { key: "light", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(ie, {}),
              " ",
              j("light", { defaultValue: "Light Mode" })
            ] }) },
            { key: "dark", label: /* @__PURE__ */ e.jsxs("span", { children: [
              /* @__PURE__ */ e.jsx(se, {}),
              " ",
              j("dark", { defaultValue: "Dark Mode" })
            ] }) }
          ],
          onClick: ({ key: a }) => {
            p(a);
          },
          selectedKeys: [b]
        },
        children: b === "light" ? /* @__PURE__ */ e.jsx(ie, {}) : /* @__PURE__ */ e.jsx(se, {})
      },
      "theme-switch"
    )
  ], Ae = (a) => a ? bt(a).replace(/[^a-zA-Z0-9-]/g, "-") : "";
  return (E ?? ((a, s, v, t, g) => {
    var T, ee;
    const k = Ae((ee = (T = U(x, f.pathname)) == null ? void 0 : T.pop()) == null ? void 0 : ee.route.name);
    return /* @__PURE__ */ e.jsxs(H, { className: u("main-layout", c.layout, { [`page-${k}`]: k }), children: [
      /* @__PURE__ */ e.jsxs(en, { width: r, collapsible: !0, collapsed: $, onCollapse: W, className: u(c.menuSider, "layout-menu-sider"), theme: O ? "light" : w, children: [
        /* @__PURE__ */ e.jsx("div", { className: u("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: u("layout-logo-container", c.layoutLogoContainer), children: a ? /* @__PURE__ */ e.jsx("img", { src: a, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(He, {}) }) }),
        /* @__PURE__ */ e.jsx(
          qe,
          {
            className: u("layout-menu", c.menu),
            theme: O ? "light" : w,
            defaultOpenKeys: Me,
            defaultSelectedKeys: ["1"],
            mode: "inline",
            selectedKeys: [Ie],
            items: s
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs(H, { className: u("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(Wt, { className: u("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(Ge, { children: [
            /* @__PURE__ */ e.jsx(
              Qe,
              {
                type: "text",
                icon: $ ? /* @__PURE__ */ e.jsx(ht, {}) : /* @__PURE__ */ e.jsx(ut, {}),
                onClick: () => W(!$),
                className: u("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(Ye, { className: u("site-breadcrumb", c.breadcrumb), itemRender: (R) => {
              const te = R.href || R.path;
              return te ? /* @__PURE__ */ e.jsx(D, { to: te, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: u("header-items", c.headerItems), children: v })
        ] }),
        /* @__PURE__ */ e.jsxs(Zt, { className: u("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: u("site-content-container", c.contentContainer), children: g }),
          B && /* @__PURE__ */ e.jsx(St, {}),
          B && S === "classic" && (z || A) && /* @__PURE__ */ e.jsx(kt, { ..._ })
        ] }),
        /* @__PURE__ */ e.jsxs(Xt, { className: u("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          P
        ] })
      ] }),
      B && (S === "sidebar" || S === "float-sidebar") && (z || A) && /* @__PURE__ */ e.jsx(Mt, { ..._ })
    ] });
  }))(je, Z(x), I(ze), F(), n ?? /* @__PURE__ */ e.jsx(Ve, {}));
}, fe = "theme-mode";
function an() {
  try {
    const n = localStorage.getItem(fe);
    if (n === "light" || n === "dark" || n === "auto")
      return n;
  } catch {
  }
  return "light";
}
const sn = new Pe({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), me = {
  "zh-CN": Be,
  "en-US": J,
  "de-DE": Ee,
  "es-ES": De,
  "fr-FR": Re,
  "ar-AE": Te,
  "sv-SE": Oe
};
function Nn({
  transformRouter: n = (p) => p,
  transformSettingTabs: r = (p) => p,
  transformLangConfig: x = (p) => p,
  extraPrivateRoutes: M = [],
  extraPublicRoutes: w = [],
  menuStyle: I = "dark",
  transformHeaderItems: E = (p) => p,
  renderLayout: _,
  aiChatProps: b
}) {
  const { i18n: p } = q(), [O, c] = L(me[p.language] || J);
  N(() => {
    c(me[p.language] || J);
  }, [p.language]);
  const S = (y) => y.map((d) => !("children" in d) || d.children === void 0 ? d : {
    ...d,
    children: S(d.children)
  }), z = n(S(Yt({
    transformSettingTabs: r,
    transformLangConfig: x,
    extraPrivateRoutes: M,
    extraPublicRoutes: w
  }))), A = (y, d) => y.flatMap((l) => l.is_private ? [l] : [l]).map((l, j) => {
    const f = l.is_private ? /* @__PURE__ */ e.jsx(st, { element: /* @__PURE__ */ e.jsx(
      nn,
      {
        routes: z,
        element: l.element,
        transformLangConfig: x,
        menuStyle: I,
        transformHeaderItems: E,
        renderLayout: _,
        aiChatProps: b
      }
    ) }) : l.element;
    if ("children" in l && l.children && l.children.length > 0)
      return /* @__PURE__ */ e.jsx(ne, { path: l.path, element: f, children: A(l.children, l) }, l.path ?? l.name ?? j);
    const { path: C } = l;
    return /* @__PURE__ */ e.jsx(ne, { path: C, index: l.index, element: f }, C ?? l.name ?? `${(d == null ? void 0 : d.path) ?? ""}.${j}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx($e, { client: sn, children: /* @__PURE__ */ e.jsx(
    At,
    {
      defaultThemeMode: an(),
      onThemeModeChange: (y) => {
        try {
          localStorage.setItem(fe, y);
        } catch {
        }
      },
      children: /* @__PURE__ */ e.jsx(We, { locale: O, children: /* @__PURE__ */ e.jsx(Ze, { children: /* @__PURE__ */ e.jsx(yt, { children: /* @__PURE__ */ e.jsx(jt, { children: /* @__PURE__ */ e.jsx(vt, { children: /* @__PURE__ */ e.jsx(Ke, { basename: he(), children: /* @__PURE__ */ e.jsx(Je, { children: A(z) }) }) }) }) }) }) })
    }
  ) });
}
const _n = i(() => import("./ai-chat.js")), On = i(() => import("./json-schema-config-form.js").then((n) => ({ default: n.JsonSchemaConfigForm }))), Tn = i(() => import("./json-schema-config-form.js").then((n) => ({ default: n.JsonSchemaConfigFormItem }))), Rn = i(() => import("./markdown-viewer.js")), Dn = i(() => import("./markdown-viewer.js").then((n) => ({ default: n.Code }))), En = {
  ...ce,
  ...de,
  ...ue,
  ...K,
  ...K,
  ...pe
};
export {
  _n as A,
  On as J,
  Dn as M,
  Ln as a,
  nn as b,
  Nn as c,
  Tn as d,
  Rn as e,
  En as f,
  o as w
};
