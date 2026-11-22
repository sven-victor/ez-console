import { a as qe } from "./ai.js";
import { a as ce } from "./authorization.js";
import { d as de, g as he, t as Qe } from "./base.js";
import { i as Ye } from "./inbox.js";
import { a as q } from "./system.js";
import { o as ue } from "./oauth.js";
import { t as pe } from "./tasks.js";
import { j as e, L as Ze, a as Je, s as We, b as Xe, f as Pe, e as et, d as tt, c as Q, z as nt } from "./vendor.js";
import { QueryClient as st, QueryClientProvider as it } from "react-query";
import { useLocation as at, useNavigate as ot, Link as F, matchRoutes as H, Outlet as rt, BrowserRouter as lt, Routes as mt, Route as se } from "react-router-dom";
import { Layout as Y, Breadcrumb as ct, Menu as dt, Space as ht, Button as ut, Spin as pt, ConfigProvider as ft, App as gt } from "antd";
import { useTranslation as Z } from "react-i18next";
import { lazy as r, Suspense as fe, useState as U, useEffect as D, useMemo as ge } from "react";
import { L as xe, H as ie, O as xt, I as yt, T as wt, A as ae, a as jt, b as vt, P as bt } from "./components.js";
import { DashboardOutlined as It, SolutionOutlined as kt, UserOutlined as ye, SafetyOutlined as St, FileSearchOutlined as zt, SettingOutlined as Mt, SwapOutlined as Nt, MenuUnfoldOutlined as At, MenuFoldOutlined as Lt } from "@ant-design/icons";
import { d as Tt, a as _t, u as Ct, b as Rt, e as Ot, f as Ut, A as Dt, S as Bt, g as Et } from "./contexts.js";
import { flatMapDeep as $t, snakeCase as Ft } from "lodash-es";
import { A as Vt, a as Gt } from "./ai-chat-layout.js";
import { createStyles as Kt, useThemeMode as Ht, ThemeProvider as qt, createGlobalStyle as Qt } from "antd-style";
import f from "classnames";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Yt = r(() => import("./dashboard.js")), Zt = r(() => import("./login.js")), Jt = r(() => import("./activate.js")), Wt = r(() => import("./profile.js")), Xt = r(() => import("./inbox_list.js")), oe = r(() => import("./not_found.js")), Pt = r(() => import("./forbidden.js")), en = r(() => import("./users.js").then((s) => s.U)), tn = r(() => import("./users.js").then((s) => s.a)), re = r(() => import("./users.js").then((s) => s.b)), nn = r(() => import("./roles.js").then((s) => s.R)), le = r(() => import("./roles.js").then((s) => s.a)), sn = r(() => import("./system-settings.js").then((s) => s.i)), an = r(() => import("./system-settings.js").then((s) => s.O)), on = r(() => import("./system-settings.js").then((s) => s.S)), rn = r(() => import("./system-settings.js").then((s) => s.a)), ln = r(() => import("./system-settings.js").then((s) => s.A)), mn = r(() => import("./system-settings.js").then((s) => s.T)), cn = r(() => import("./system-settings.js").then((s) => s.b)), dn = r(() => import("./audit.js")), hn = r(() => import("./service-accounts.js").then((s) => s.S)), un = r(() => import("./service-accounts.js").then((s) => s.a)), pn = r(() => import("./task_list.js")), fn = r(() => import("./task_detail.js")), gn = r(() => import("./task_schedule_list.js"));
function o(s, l) {
  return /* @__PURE__ */ e.jsx(fe, { fallback: /* @__PURE__ */ e.jsx(xe, {}), children: /* @__PURE__ */ e.jsx(s, { ...l }) });
}
const xn = ({ transformSettingTabs: s, transformLangConfig: l, extraPrivateRoutes: x = [], extraPublicRoutes: M = [] }) => {
  const b = [
    {
      path: "/login",
      element: o(Zt, { transformLangConfig: l }),
      index: !0
    },
    {
      path: "/404",
      element: o(oe),
      index: !0
    },
    {
      path: "/403",
      element: o(Pt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o(cn),
      index: !0
    },
    {
      path: "/activate",
      element: o(Jt, { transformLangConfig: l }),
      index: !0
    },
    ...M
  ], N = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: o(Yt),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(It, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(Wt),
          hideInMenu: !0,
          name: "profile",
          index: !1
        },
        {
          path: "/inbox",
          element: o(Xt),
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
              element: o(pn),
              name: "tasks",
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: o(gn),
              permissions: ["task:schedule:list"],
              name: "taskSchedules",
              index: !1
            },
            {
              path: "/tasks/:id",
              // No permission required: the backend allows the task creator
              // to view their own task; task:view grants access to all tasks.
              element: o(fn),
              index: !1
            }
          ]
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(ye, {}),
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
              icon: /* @__PURE__ */ e.jsx(kt, {}),
              permissions: ["authorization:role:view"],
              children: [
                {
                  element: o(nn),
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
              icon: /* @__PURE__ */ e.jsx(Ze, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: o(en),
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
                  element: o(tn),
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
              icon: /* @__PURE__ */ e.jsx(Je, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: o(hn),
                  permissions: ["authorization:service_account:view"],
                  index: !0,
                  hideInMenu: !0,
                  name: "serviceAccounts"
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(un),
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
          icon: /* @__PURE__ */ e.jsx(Mt, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:audit_log:view", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view", "system:rate_limit:view", "system:rate_limit:update"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(St, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view", "system:rate_limit:view", "system:rate_limit:update"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  hideInMenu: !0,
                  element: o(sn, { transformItems: s }),
                  name: "settings"
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(an),
                  name: "organizationDetail",
                  index: !1,
                  hideInMenu: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: o(on),
                  name: "skillEditor",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: o(rn),
                  name: "skillPreview",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: o(ln),
                  name: "aiTraceViewer",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/toolsets/:id/debug",
                  permissions: ["system:toolsets:test"],
                  element: o(mn),
                  name: "toolSetDebug",
                  hideInMenu: !0,
                  index: !1
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(zt, {}),
              name: "audit",
              permissions: ["system:audit_log:view"],
              index: !1,
              element: o(dn)
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
  return [...b, ...N];
}, Xn = {
  ai: qe,
  authorization: ce,
  base: de,
  inbox: Ye,
  system: q,
  oauth: ue,
  tasks: pe
}, { Header: yn, Content: wn, Footer: jn, Sider: vn } = Y, bn = Kt(({ token: s, css: l }) => ({
  layout: l`
      height: 100vh;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    `,
  header: l`
      padding: 0;
      display: flex;
      justify-content: space-between;
      background-color: ${s.colorBgContainer};
      border-block-end: 1px solid ${s.colorBorderSecondary};
    `,
  footer: l`
      text-align: center;
      padding: 15px 50px;
    `,
  contentContainer: l`
      padding: 24px;
      background-color: ${s.colorBgContainer};
    `,
  content: l`
      margin: 0 16px;
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
    `,
  mainLayout: l`
      /* Containing block for in-page drawers. isolation keeps their z-index
         inside this column so they cannot paint over the AI sidebar. */
      position: relative;
      isolation: isolate;
      flex: 1;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      background-color: ${s.colorBgContainer};
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
      height: 100%;
      .ant-layout-sider-children{
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
      }
    `,
  menuToggleButton: l`
      &&{
        font-size: 16px;
        width: 64px;
        height: 64px;
        border-radius: 0px;
      }
    `,
  layoutLogo: l`
      padding: 8px;
      border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
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
      min-height: 0;
      overflow: auto;
    `
})), In = ({
  element: s,
  siderWidth: l = 250,
  routes: x,
  transformLangConfig: M,
  menuStyle: b = "dark",
  transformHeaderItems: N = (S) => S,
  layout: I = { footer: !1 },
  aiChatProps: k
}) => {
  var ee;
  const { isDarkMode: S } = Ht(), { styles: d } = bn(), { resetPageAIContext: g } = Tt(), { t: v, i18n: u } = Z(), { t: A } = Z("common"), j = at(), { hasPermission: L } = _t(), T = ot(), { logout: B, user: m } = Ct(), { siteConfig: i, clearCurrentOrgId: c } = Rt();
  Ot();
  const z = !!((ee = i == null ? void 0 : i.attrs) != null && ee.ai_enabled) && L("ai:chat:create"), [_, C] = U([]), [je, ve] = U(null), [E, be] = U("Loading..."), h = typeof I == "function" ? void 0 : I, {
    className: Ie,
    width: ke,
    theme: Se,
    collapsed: J,
    defaultCollapsed: ze = !1,
    onCollapse: V,
    collapsible: Me,
    breakpoint: Ne = "xxl",
    ...Ae
  } = (h == null ? void 0 : h.siderProps) ?? {}, {
    className: Le,
    theme: Te,
    ..._e
  } = (h == null ? void 0 : h.menuProps) ?? {}, [Ce, Re] = U(ze), R = J ?? Ce, W = Me ?? !0, G = (n, a) => {
    J === void 0 && Re(n), V == null || V(n, a);
  };
  D(() => {
    g();
  }, [j.pathname, g]), Ut(x, z), j.pathname !== "/profile" && (m && m.mfa_enforced && !m.mfa_enabled ? T("/profile#mfa") : m && m.status === "password_expired" && T("/profile#password"));
  const Oe = () => {
    B(), c(), window.location.href = he("/login?redirect=" + encodeURIComponent(window.location.href));
  }, Ue = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(F, { to: "/profile", children: A("profile") })
    },
    {
      key: "logout",
      label: A("logout"),
      onClick: Oe
    }
  ];
  D(() => {
    var n, a;
    if (i) {
      const y = ((n = i.navigation) == null ? void 0 : n.filter((p) => p.path !== i.home_page)) ?? [], t = [...i.home_page ? [{
        name: "home",
        path: i.home_page
      }] : [], ...y];
      t.length > 1 ? C(t) : C([]), ve(i.logo), (a = document.getElementById("site-icon")) == null || a.setAttribute("href", i.logo);
    }
  }, [i]), D(() => {
    u.language && be((i == null ? void 0 : i.name_i18n[u.language]) || (i == null ? void 0 : i.name) || "");
  }, [i, u.language]);
  const K = () => {
    const n = H(x, j.pathname), a = [];
    if (n) {
      for (const [y, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          a.push({
            href: t.route.path,
            title: A("home"),
            key: "home"
          });
        else if (t.route.name) {
          const p = n.slice(0, y + 1).map(($) => $.route.name).filter(Boolean).join(".");
          if ((a.length > 0 ? a[a.length - 1].path : void 0) === (t.route.path || t.pathnameBase))
            continue;
          a.push({
            path: t.pathnameBase,
            title: t.route.name ? v(`breadcrumbs.${p.replace(/\./g, "_")}`, { defaultValue: Qe(t.route.name) }) : void 0,
            key: t.pathname || t.route.name
          });
        }
    }
    return a;
  }, De = (n) => n.some((a) => L(a)), Be = $t(x, (n) => "children" in n && n.children ? n.children : []).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), X = (n, a = []) => {
    const y = (t) => t && t.replace(/_/g, " ").split(" ").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if ("hideInMenu" in t && t.hideInMenu || t.permissions && !De(t.permissions))
        return null;
      const p = y(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const w = X(t.children, [...a, t.name]);
        return w.length == 0 && t.path ? {
          key: t.path,
          icon: t.icon,
          label: /* @__PURE__ */ e.jsx(F, { to: t.path, children: v(`menu.${[...a, t.name].join(".")}`, { defaultValue: p }) })
        } : {
          key: t.path ?? t.name,
          icon: t.icon,
          label: v(`menu.${[...a, t.name, t.name].join(".")}`, { defaultValue: p }),
          children: w
        };
      }
      return t.name && t.path ? {
        key: t.path,
        icon: t.icon,
        label: /* @__PURE__ */ e.jsx(F, { to: t.path, children: v(`menu.${[...a, t.name].join(".")}`, { defaultValue: p }) })
      } : null;
    }).filter(Boolean);
  };
  D(() => {
    const n = K().filter((a) => a.path !== "/").map((a) => a.title).join(" - ");
    n ? document.title = `${E} | ${n}` : document.title = E;
  }, [K, j.pathname]);
  const Ee = ge(() => {
    const n = H(x, j.pathname);
    if (n) {
      for (const a of n.reverse())
        if (a.route.path && a.route.name && !("hideInMenu" in a.route && a.route.hideInMenu))
          return a.route.path;
    }
    return j.pathname;
  }, [j.pathname]), $e = [
    /* @__PURE__ */ e.jsx(
      ie,
      {
        className: "header-item navigation-dropdown",
        hidden: _.length <= 1,
        menu: {
          items: _.map((n) => ({
            key: n.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: v(`menu.${n.name}`, { defaultValue: n.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(Nt, {})
      },
      "navigation-dropdown"
    ),
    ...i != null && i.enable_multi_org ? [/* @__PURE__ */ e.jsx(xt, { className: "header-item org-switcher" }, "org-switcher")] : [],
    /* @__PURE__ */ e.jsx(yt, { className: "header-item inbox-dropdown" }, "inbox-dropdown"),
    /* @__PURE__ */ e.jsx(wt, { className: "header-item task-dropdown" }, "task-dropdown"),
    /* @__PURE__ */ e.jsxs(
      ie,
      {
        className: "header-item user-dropdown",
        menu: { items: Ue },
        children: [
          m != null && m.avatar ? /* @__PURE__ */ e.jsx(ae, { src: m.avatar, size: "small" }) : /* @__PURE__ */ e.jsx(ae, { icon: /* @__PURE__ */ e.jsx(ye, {}), size: "small" }),
          /* @__PURE__ */ e.jsx("span", { className: f("header-user-name", d.userName), children: (m == null ? void 0 : m.full_name) || (m == null ? void 0 : m.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(jt, { className: "header-item language-switch", transformLangConfig: M }, "language-switch"),
    /* @__PURE__ */ e.jsx(vt, { className: "header-item theme-switch" }, "theme-switch")
  ], Fe = (n) => n ? Ft(n).replace(/[^a-zA-Z0-9-]/g, "-") : "", Ve = (n) => {
    const a = n.href || n.path;
    return a ? /* @__PURE__ */ e.jsx(F, { to: a, children: n.title }) : /* @__PURE__ */ e.jsx("span", { children: n.title });
  }, Ge = (n) => {
    var te, ne;
    const a = Fe((ne = (te = H(x, j.pathname)) == null ? void 0 : te.pop()) == null ? void 0 : ne.route.name), y = h == null ? void 0 : h.logo, t = h == null ? void 0 : h.breadcrumb, p = h == null ? void 0 : h.footer, w = h == null ? void 0 : h.contentWrapper;
    let $ = null;
    if (y !== !1) {
      let O;
      typeof y == "function" ? O = y({
        collapsed: R,
        siteIconUrl: n.siteIconUrl,
        siteName: E
      }) : y !== void 0 ? O = y : n.siteIconUrl ? O = /* @__PURE__ */ e.jsx("img", { src: n.siteIconUrl, alt: "logo", className: d.layoutLogoImage }) : O = /* @__PURE__ */ e.jsx(pt, {}), $ = /* @__PURE__ */ e.jsx("div", { className: f("logo", d.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: f("layout-logo-container", d.layoutLogoContainer), children: O }) });
    }
    const Ke = t === !1 ? null : /* @__PURE__ */ e.jsx(
      ct,
      {
        className: f("site-breadcrumb", d.breadcrumb, t == null ? void 0 : t.className),
        style: t == null ? void 0 : t.style,
        itemRender: (t == null ? void 0 : t.itemRender) ?? Ve,
        items: n.breadcrumbs
      }
    ), He = w === !1 ? n.content : /* @__PURE__ */ e.jsx(
      "div",
      {
        className: f("site-content-container", d.contentContainer, w == null ? void 0 : w.className),
        style: w == null ? void 0 : w.style,
        children: n.content
      }
    );
    return /* @__PURE__ */ e.jsxs(Y, { className: f("main-layout", d.layout, { [`page-${a}`]: a }), children: [
      /* @__PURE__ */ e.jsxs(
        vn,
        {
          ...Ae,
          width: ke ?? l,
          breakpoint: Ne,
          collapsible: W,
          collapsed: R,
          onCollapse: G,
          className: f(d.menuSider, "layout-menu-sider", Ie),
          theme: Se ?? (S ? "light" : b),
          children: [
            $,
            /* @__PURE__ */ e.jsx(
              dt,
              {
                defaultOpenKeys: Be,
                defaultSelectedKeys: ["1"],
                mode: "inline",
                ..._e,
                className: f("layout-menu", d.menu, Le),
                theme: Te ?? (S ? "light" : b),
                selectedKeys: [Ee],
                items: n.menuItems
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e.jsxs(Y, { className: f("site-layout", "main-layout", d.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(yn, { className: f("site-header", d.header), children: [
          /* @__PURE__ */ e.jsxs(ht, { children: [
            W && /* @__PURE__ */ e.jsx(
              ut,
              {
                type: "text",
                icon: R ? /* @__PURE__ */ e.jsx(At, {}) : /* @__PURE__ */ e.jsx(Lt, {}),
                onClick: () => G(!R, "clickTrigger"),
                className: f("layout-menu-toggle", d.menuToggleButton)
              }
            ),
            Ke
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: f("header-items", d.headerItems), children: n.headerItems })
        ] }),
        /* @__PURE__ */ e.jsx(wn, { className: f("site-content", d.content), children: He }),
        p !== !1 && /* @__PURE__ */ e.jsx(jn, { className: f("site-footer", d.footer), children: p === void 0 ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          E
        ] }) : p })
      ] }),
      z && /* @__PURE__ */ e.jsx(Vt, { icon: k == null ? void 0 : k.floatButtonIcon }),
      z && /* @__PURE__ */ e.jsx(Gt, { ...k })
    ] });
  }, P = {
    siteIconUrl: je,
    menuItems: X(x),
    headerItems: N($e),
    breadcrumbs: K(),
    content: s ?? /* @__PURE__ */ e.jsx(rt, {}),
    collapsed: R,
    setCollapsed: (n) => G(n, "clickTrigger")
  };
  return typeof I == "function" ? I(P) : Ge(P);
}, we = "theme-mode";
function kn({ styles: s }) {
  const l = ge(() => Qt(s), [s]);
  return /* @__PURE__ */ e.jsx(l, {});
}
function Sn() {
  try {
    const s = localStorage.getItem(we);
    if (s === "light" || s === "dark" || s === "auto")
      return s;
  } catch {
  }
  return "light";
}
const zn = new st({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), me = {
  "zh-CN": nt,
  "en-US": Q,
  "de-DE": tt,
  "es-ES": et,
  "fr-FR": Pe,
  "ar-AE": Xe,
  "sv-SE": We
};
function Mn({
  transformRouter: s = (u) => u,
  transformSettingTabs: l = (u) => u,
  transformLangConfig: x = (u) => u,
  extraPrivateRoutes: M = [],
  extraPublicRoutes: b = [],
  menuStyle: N = "dark",
  transformHeaderItems: I = (u) => u,
  layout: k,
  aiChatProps: S,
  style: d,
  themeProviderProps: g,
  configProviderProps: v
}) {
  const { i18n: u } = Z(), [A, j] = U(me[u.language] || Q);
  D(() => {
    j(me[u.language] || Q);
  }, [u.language]);
  const L = (m) => m.map((i) => !("children" in i) || i.children === void 0 ? i : {
    ...i,
    children: L(i.children)
  }), T = s(L(xn({
    transformSettingTabs: l,
    transformLangConfig: x,
    extraPrivateRoutes: M,
    extraPublicRoutes: b
  }))), B = (m, i) => m.flatMap((c) => c.is_private ? [c] : [c]).map((c, z) => {
    const _ = c.is_private ? /* @__PURE__ */ e.jsx(bt, { element: /* @__PURE__ */ e.jsx(
      In,
      {
        routes: T,
        element: c.element,
        transformLangConfig: x,
        menuStyle: N,
        transformHeaderItems: I,
        layout: k,
        aiChatProps: S
      }
    ) }) : c.element;
    if ("children" in c && c.children && c.children.length > 0)
      return /* @__PURE__ */ e.jsx(se, { path: c.path, element: _, children: B(c.children, c) }, c.path ?? c.name ?? z);
    const { path: C } = c;
    return /* @__PURE__ */ e.jsx(se, { path: C, index: c.index, element: _ }, C ?? c.name ?? `${(i == null ? void 0 : i.path) ?? ""}.${z}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(it, { client: zn, children: /* @__PURE__ */ e.jsxs(
    qt,
    {
      ...g,
      defaultThemeMode: (g == null ? void 0 : g.defaultThemeMode) ?? Sn(),
      onThemeModeChange: (m) => {
        var i;
        try {
          localStorage.setItem(we, m);
        } catch {
        }
        (i = g == null ? void 0 : g.onThemeModeChange) == null || i.call(g, m);
      },
      children: [
        d ? /* @__PURE__ */ e.jsx(kn, { styles: d }) : null,
        /* @__PURE__ */ e.jsx(ft, { ...v, locale: A, children: /* @__PURE__ */ e.jsx(gt, { children: /* @__PURE__ */ e.jsx(Dt, { children: /* @__PURE__ */ e.jsx(Bt, { children: /* @__PURE__ */ e.jsx(Et, { children: /* @__PURE__ */ e.jsx(lt, { basename: he(), children: /* @__PURE__ */ e.jsx(mt, { children: B(T) }) }) }) }) }) }) })
      ]
    }
  ) });
}
function Pn(s) {
  return /* @__PURE__ */ e.jsx(fe, { fallback: /* @__PURE__ */ e.jsx(xe, {}), children: /* @__PURE__ */ e.jsx(Mn, { ...s }) });
}
const es = r(() => import("./ai-chat.js")), ts = r(() => import("./markdown-viewer.js")), ns = r(() => import("./markdown-viewer.js").then((s) => ({ default: s.Code }))), ss = {
  ...ce,
  ...de,
  ...ue,
  ...q,
  ...q,
  ...pe
};
export {
  es as A,
  ns as M,
  Xn as a,
  In as b,
  Pn as c,
  ts as d,
  ss as e,
  o as w
};
