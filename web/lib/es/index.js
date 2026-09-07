import { a as Le } from "./ai.js";
import { a as ce } from "./authorization.js";
import { d as de, g as he, t as Ne } from "./base.js";
import { i as Ce } from "./inbox.js";
import { a as K } from "./system.js";
import { o as ue } from "./oauth.js";
import { t as pe } from "./tasks.js";
import { j as e, L as _e, a as Oe, s as Te, b as De, f as Re, e as Be, d as Ee, c as J, z as $e } from "./vendor.js";
import { QueryClient as Fe, QueryClientProvider as Ue } from "react-query";
import { useLocation as Pe, useNavigate as Ve, Link as R, matchRoutes as P, Outlet as Ke, BrowserRouter as Je, Routes as He, Route as ne } from "react-router-dom";
import { Layout as H, Spin as qe, Menu as Ge, Space as Qe, Button as Ye, Breadcrumb as We, ConfigProvider as Ze, App as Xe } from "antd";
import { useTranslation as q } from "react-i18next";
import { lazy as i, Suspense as et, useState as C, useEffect as _, useMemo as tt } from "react";
import { L as nt, H as V, O as at, I as it, T as st, A as ae, a as ot, P as rt } from "./components.js";
import { DashboardOutlined as lt, SolutionOutlined as mt, UserOutlined as ge, SafetyOutlined as ct, FileSearchOutlined as dt, SettingOutlined as ht, SwapOutlined as ut, SunOutlined as ie, MoonOutlined as se, MenuUnfoldOutlined as pt, MenuFoldOutlined as gt } from "@ant-design/icons";
import { d as ft, a as xt, u as yt, b as jt, e as vt, A as wt, S as bt, f as St } from "./contexts.js";
import { flatMapDeep as kt, snakeCase as It } from "lodash-es";
import { A as Mt, a as zt, b as At } from "./ai-chat-layout.js";
import { createStyles as Lt, useThemeMode as Nt, ThemeProvider as Ct } from "antd-style";
import u from "classnames";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const _t = i(() => import("./dashboard.js")), Ot = i(() => import("./login.js")), Tt = i(() => import("./activate.js")), Dt = i(() => import("./profile.js")), Rt = i(() => import("./inbox_list.js")), oe = i(() => import("./not_found.js")), Bt = i(() => import("./forbidden.js")), Et = i(() => import("./users.js").then((n) => n.U)), $t = i(() => import("./users.js").then((n) => n.a)), re = i(() => import("./users.js").then((n) => n.b)), Ft = i(() => import("./roles.js").then((n) => n.R)), le = i(() => import("./roles.js").then((n) => n.a)), Ut = i(() => import("./system-settings.js").then((n) => n.i)), Pt = i(() => import("./system-settings.js").then((n) => n.O)), Vt = i(() => import("./system-settings.js").then((n) => n.S)), Kt = i(() => import("./system-settings.js").then((n) => n.a)), Jt = i(() => import("./system-settings.js").then((n) => n.A)), Ht = i(() => import("./system-settings.js").then((n) => n.T)), qt = i(() => import("./system-settings.js").then((n) => n.b)), Gt = i(() => import("./audit.js")), Qt = i(() => import("./service-accounts.js").then((n) => n.S)), Yt = i(() => import("./service-accounts.js").then((n) => n.a)), Wt = i(() => import("./task_list.js")), Zt = i(() => import("./task_detail.js")), Xt = i(() => import("./task_schedule_list.js"));
function o(n, r) {
  return /* @__PURE__ */ e.jsx(et, { fallback: /* @__PURE__ */ e.jsx(nt, {}), children: /* @__PURE__ */ e.jsx(n, { ...r }) });
}
const en = ({ transformSettingTabs: n, transformLangConfig: r, extraPrivateRoutes: x = [], extraPublicRoutes: M = [] }) => {
  const b = [
    {
      path: "/login",
      element: o(Ot, { transformLangConfig: r }),
      index: !0
    },
    {
      path: "/404",
      element: o(oe),
      index: !0
    },
    {
      path: "/403",
      element: o(Bt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o(qt),
      index: !0
    },
    {
      path: "/activate",
      element: o(Tt, { transformLangConfig: r }),
      index: !0
    },
    ...M
  ], z = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: o(_t),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(lt, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(Dt),
          hideInMenu: !0,
          name: "profile",
          index: !1
        },
        {
          path: "/inbox",
          element: o(Rt),
          hideInMenu: !0,
          name: "inbox",
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
              element: o(Wt),
              name: "tasks",
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: o(Xt),
              permissions: ["task:schedule:list"],
              name: "taskSchedules",
              index: !1
            },
            {
              path: "/tasks/:id",
              // No permission required: the backend allows the task creator
              // to view their own task; task:view grants access to all tasks.
              element: o(Zt),
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
              icon: /* @__PURE__ */ e.jsx(mt, {}),
              permissions: ["authorization:role:view"],
              children: [
                {
                  element: o(Ft),
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
              icon: /* @__PURE__ */ e.jsx(_e, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: o(Et),
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
                  element: o($t),
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
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: o(Qt),
                  permissions: ["authorization:service_account:view"],
                  index: !0,
                  hideInMenu: !0,
                  name: "serviceAccounts"
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(Yt),
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
          icon: /* @__PURE__ */ e.jsx(ht, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:audit_log:view", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(ct, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  hideInMenu: !0,
                  element: o(Ut, { transformItems: n }),
                  name: "settings"
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(Pt),
                  name: "organizationDetail",
                  index: !1,
                  hideInMenu: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: o(Vt),
                  name: "skillEditor",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: o(Kt),
                  name: "skillPreview",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: o(Jt),
                  name: "aiTraceViewer",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/toolsets/:id/debug",
                  permissions: ["system:toolsets:test"],
                  element: o(Ht),
                  name: "toolSetDebug",
                  hideInMenu: !0,
                  index: !1
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(dt, {}),
              name: "audit",
              permissions: ["system:audit_log:view"],
              index: !1,
              element: o(Gt)
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
  return [...b, ...z];
}, Dn = {
  ai: Le,
  authorization: ce,
  base: de,
  inbox: Ce,
  system: K,
  oauth: ue,
  tasks: pe
}, { Header: tn, Content: nn, Footer: an, Sider: sn } = H, on = Lt(({ token: n, css: r }) => ({
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
})), rn = ({
  element: n,
  siderWidth: r = 250,
  routes: x,
  transformLangConfig: M,
  menuStyle: b = "dark",
  transformHeaderItems: z = (S) => S,
  renderLayout: B,
  aiChatProps: v
}) => {
  var X;
  const { themeMode: S, setThemeMode: p, isDarkMode: O } = Nt(), { styles: c } = on(), { layout: k, visible: A, loaded: L, resetPageAIContext: y } = ft(), { t: d, i18n: l } = q(), { t: j } = q("common"), f = Pe(), { hasPermission: N } = xt(), G = Ve(), { logout: xe, user: h } = yt(), { siteConfig: m, clearCurrentOrgId: ye } = jt();
  vt();
  const E = !!((X = m == null ? void 0 : m.attrs) != null && X.ai_enabled) && N("ai:chat:create"), [Q, Y] = C([]), [je, ve] = C(null), [$, we] = C("Loading..."), [F, W] = C(!1);
  _(() => {
    y();
  }, [f.pathname, y]), f.pathname !== "/profile" && (h && h.mfa_enforced && !h.mfa_enabled ? G("/profile#mfa") : h && h.status === "password_expired" && G("/profile#password"));
  const be = () => {
    xe(), ye(), window.location.href = he("/login?redirect=" + encodeURIComponent(window.location.href));
  }, Se = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(R, { to: "/profile", children: j("profile") })
    },
    {
      key: "logout",
      label: j("logout"),
      onClick: be
    }
  ];
  _(() => {
    var a, s;
    if (m) {
      const w = ((a = m.navigation) == null ? void 0 : a.filter((g) => g.path !== m.home_page)) ?? [], t = [...m.home_page ? [{
        name: "home",
        path: m.home_page
      }] : [], ...w];
      t.length > 1 ? Y(t) : Y([]), ve(m.logo), (s = document.getElementById("site-icon")) == null || s.setAttribute("href", m.logo);
    }
  }, [m]), _(() => {
    l.language && we((m == null ? void 0 : m.name_i18n[l.language]) || (m == null ? void 0 : m.name) || "");
  }, [m, l.language]);
  const U = () => {
    const a = P(x, f.pathname), s = [];
    if (a) {
      for (const [w, t] of a.entries())
        if (t.route.path === "/" && !t.route.name)
          s.push({
            href: t.route.path,
            title: j("home"),
            key: "home"
          });
        else if (t.route.name) {
          const g = a.slice(0, w + 1).map((T) => T.route.name).filter(Boolean).join(".");
          if ((s.length > 0 ? s[s.length - 1].path : void 0) === (t.route.path || t.pathnameBase))
            continue;
          s.push({
            path: t.pathnameBase,
            title: t.route.name ? d(`breadcrumbs.${g.replace(/\./g, "_")}`, { defaultValue: Ne(t.route.name) }) : void 0,
            key: t.pathname || t.route.name
          });
        }
    }
    return s;
  }, ke = (a) => a.some((s) => N(s)), Ie = kt(x, (a) => "children" in a && a.children ? a.children : []).map((a) => a == null ? void 0 : a.name).filter((a) => a !== void 0), Z = (a, s = []) => {
    const w = (t) => t && t.replace(/_/g, " ").split(" ").map((g) => g.charAt(0).toUpperCase() + g.slice(1)).join(" ");
    return a.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if ("hideInMenu" in t && t.hideInMenu || t.permissions && !ke(t.permissions))
        return null;
      const g = w(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const I = Z(t.children, [...s, t.name]);
        return I.length == 0 && t.path ? {
          key: t.path,
          icon: t.icon,
          label: /* @__PURE__ */ e.jsx(R, { to: t.path, children: d(`menu.${[...s, t.name].join(".")}`, { defaultValue: g }) })
        } : {
          key: t.path ?? t.name,
          icon: t.icon,
          label: d(`menu.${[...s, t.name, t.name].join(".")}`, { defaultValue: g }),
          children: I
        };
      }
      return t.name && t.path ? {
        key: t.path,
        icon: t.icon,
        label: /* @__PURE__ */ e.jsx(R, { to: t.path, children: d(`menu.${[...s, t.name].join(".")}`, { defaultValue: g }) })
      } : null;
    }).filter(Boolean);
  };
  _(() => {
    const a = U().filter((s) => s.path !== "/").map((s) => s.title).join(" - ");
    a ? document.title = `${$} | ${a}` : document.title = $;
  }, [U, f.pathname]);
  const Me = tt(() => {
    const a = P(x, f.pathname);
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
        children: /* @__PURE__ */ e.jsx(ut, {})
      },
      "navigation-dropdown"
    ),
    ...m != null && m.enable_multi_org ? [/* @__PURE__ */ e.jsx(at, { className: "header-item org-switcher" }, "org-switcher")] : [],
    /* @__PURE__ */ e.jsx(it, { className: "header-item inbox-dropdown" }, "inbox-dropdown"),
    /* @__PURE__ */ e.jsx(st, { className: "header-item task-dropdown" }, "task-dropdown"),
    /* @__PURE__ */ e.jsxs(
      V,
      {
        className: "header-item user-dropdown",
        menu: { items: Se },
        children: [
          h != null && h.avatar ? /* @__PURE__ */ e.jsx(ae, { src: h.avatar, size: "small" }) : /* @__PURE__ */ e.jsx(ae, { icon: /* @__PURE__ */ e.jsx(ge, {}), size: "small" }),
          /* @__PURE__ */ e.jsx("span", { className: u("header-user-name", c.userName), children: (h == null ? void 0 : h.full_name) || (h == null ? void 0 : h.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(ot, { className: "header-item language-switch", transformLangConfig: M }, "language-switch"),
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
          selectedKeys: [S]
        },
        children: S === "light" ? /* @__PURE__ */ e.jsx(ie, {}) : /* @__PURE__ */ e.jsx(se, {})
      },
      "theme-switch"
    )
  ], Ae = (a) => a ? It(a).replace(/[^a-zA-Z0-9-]/g, "-") : "";
  return (B ?? ((a, s, w, t, g) => {
    var T, ee;
    const I = Ae((ee = (T = P(x, f.pathname)) == null ? void 0 : T.pop()) == null ? void 0 : ee.route.name);
    return /* @__PURE__ */ e.jsxs(H, { className: u("main-layout", c.layout, { [`page-${I}`]: I }), children: [
      /* @__PURE__ */ e.jsxs(sn, { width: r, collapsible: !0, collapsed: F, onCollapse: W, className: u(c.menuSider, "layout-menu-sider"), theme: O ? "light" : b, children: [
        /* @__PURE__ */ e.jsx("div", { className: u("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: u("layout-logo-container", c.layoutLogoContainer), children: a ? /* @__PURE__ */ e.jsx("img", { src: a, alt: "logo", className: c.layoutLogoImage }) : /* @__PURE__ */ e.jsx(qe, {}) }) }),
        /* @__PURE__ */ e.jsx(
          Ge,
          {
            className: u("layout-menu", c.menu),
            theme: O ? "light" : b,
            defaultOpenKeys: Ie,
            defaultSelectedKeys: ["1"],
            mode: "inline",
            selectedKeys: [Me],
            items: s
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs(H, { className: u("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(tn, { className: u("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(Qe, { children: [
            /* @__PURE__ */ e.jsx(
              Ye,
              {
                type: "text",
                icon: F ? /* @__PURE__ */ e.jsx(pt, {}) : /* @__PURE__ */ e.jsx(gt, {}),
                onClick: () => W(!F),
                className: u("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            /* @__PURE__ */ e.jsx(We, { className: u("site-breadcrumb", c.breadcrumb), itemRender: (D) => {
              const te = D.href || D.path;
              return te ? /* @__PURE__ */ e.jsx(R, { to: te, children: D.title }) : /* @__PURE__ */ e.jsx("span", { children: D.title });
            }, items: t })
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: u("header-items", c.headerItems), children: w })
        ] }),
        /* @__PURE__ */ e.jsxs(nn, { className: u("site-content", c.content), children: [
          /* @__PURE__ */ e.jsx("div", { className: u("site-content-container", c.contentContainer), children: g }),
          E && /* @__PURE__ */ e.jsx(Mt, { icon: v == null ? void 0 : v.floatButtonIcon }),
          E && k === "classic" && (A || L) && /* @__PURE__ */ e.jsx(zt, { ...v })
        ] }),
        /* @__PURE__ */ e.jsxs(an, { className: u("site-footer", c.footer), children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          $
        ] })
      ] }),
      E && (k === "sidebar" || k === "float-sidebar") && (A || L) && /* @__PURE__ */ e.jsx(At, { ...v })
    ] });
  }))(je, Z(x), z(ze), U(), n ?? /* @__PURE__ */ e.jsx(Ke, {}));
}, fe = "theme-mode";
function ln() {
  try {
    const n = localStorage.getItem(fe);
    if (n === "light" || n === "dark" || n === "auto")
      return n;
  } catch {
  }
  return "light";
}
const mn = new Fe({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), me = {
  "zh-CN": $e,
  "en-US": J,
  "de-DE": Ee,
  "es-ES": Be,
  "fr-FR": Re,
  "ar-AE": De,
  "sv-SE": Te
};
function Rn({
  transformRouter: n = (p) => p,
  transformSettingTabs: r = (p) => p,
  transformLangConfig: x = (p) => p,
  extraPrivateRoutes: M = [],
  extraPublicRoutes: b = [],
  menuStyle: z = "dark",
  transformHeaderItems: B = (p) => p,
  renderLayout: v,
  aiChatProps: S
}) {
  const { i18n: p } = q(), [O, c] = C(me[p.language] || J);
  _(() => {
    c(me[p.language] || J);
  }, [p.language]);
  const k = (y) => y.map((d) => !("children" in d) || d.children === void 0 ? d : {
    ...d,
    children: k(d.children)
  }), A = n(k(en({
    transformSettingTabs: r,
    transformLangConfig: x,
    extraPrivateRoutes: M,
    extraPublicRoutes: b
  }))), L = (y, d) => y.flatMap((l) => l.is_private ? [l] : [l]).map((l, j) => {
    const f = l.is_private ? /* @__PURE__ */ e.jsx(rt, { element: /* @__PURE__ */ e.jsx(
      rn,
      {
        routes: A,
        element: l.element,
        transformLangConfig: x,
        menuStyle: z,
        transformHeaderItems: B,
        renderLayout: v,
        aiChatProps: S
      }
    ) }) : l.element;
    if ("children" in l && l.children && l.children.length > 0)
      return /* @__PURE__ */ e.jsx(ne, { path: l.path, element: f, children: L(l.children, l) }, l.path ?? l.name ?? j);
    const { path: N } = l;
    return /* @__PURE__ */ e.jsx(ne, { path: N, index: l.index, element: f }, N ?? l.name ?? `${(d == null ? void 0 : d.path) ?? ""}.${j}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(Ue, { client: mn, children: /* @__PURE__ */ e.jsx(
    Ct,
    {
      defaultThemeMode: ln(),
      onThemeModeChange: (y) => {
        try {
          localStorage.setItem(fe, y);
        } catch {
        }
      },
      children: /* @__PURE__ */ e.jsx(Ze, { locale: O, children: /* @__PURE__ */ e.jsx(Xe, { children: /* @__PURE__ */ e.jsx(wt, { children: /* @__PURE__ */ e.jsx(bt, { children: /* @__PURE__ */ e.jsx(St, { children: /* @__PURE__ */ e.jsx(Je, { basename: he(), children: /* @__PURE__ */ e.jsx(He, { children: L(A) }) }) }) }) }) }) })
    }
  ) });
}
const Bn = i(() => import("./ai-chat.js")), En = i(() => import("./json-schema-config-form.js").then((n) => ({ default: n.JsonSchemaConfigForm }))), $n = i(() => import("./json-schema-config-form.js").then((n) => ({ default: n.JsonSchemaConfigFormItem }))), Fn = i(() => import("./markdown-viewer.js")), Un = i(() => import("./markdown-viewer.js").then((n) => ({ default: n.Code }))), Pn = {
  ...ce,
  ...de,
  ...ue,
  ...K,
  ...K,
  ...pe
};
export {
  Bn as A,
  En as J,
  Un as M,
  Dn as a,
  rn as b,
  Rn as c,
  $n as d,
  Fn as e,
  Pn as f,
  o as w
};
