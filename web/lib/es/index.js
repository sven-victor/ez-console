import { a as Qe } from "./ai.js";
import { a as ue } from "./authorization.js";
import { d as pe, g as fe, t as Ye } from "./base.js";
import { i as Ze } from "./inbox.js";
import { a as Q } from "./system.js";
import { o as ge } from "./oauth.js";
import { t as xe } from "./tasks.js";
import { j as e, L as Je, a as We, s as Xe, b as Pe, f as et, e as tt, d as nt, c as Y, z as st } from "./vendor.js";
import { QueryClient as at, QueryClientProvider as it } from "react-query";
import { useLocation as ot, useNavigate as rt, Link as V, matchRoutes as q, Outlet as lt, BrowserRouter as mt, Routes as ct, Route as oe } from "react-router-dom";
import { Layout as Z, Breadcrumb as dt, Menu as ht, Space as ut, Button as pt, Spin as ft, ConfigProvider as gt, App as xt } from "antd";
import { useTranslation as J } from "react-i18next";
import { lazy as o, Suspense as yt, useState as R, useEffect as O, useMemo as ye } from "react";
import { L as wt, H as re, O as jt, I as bt, T as vt, A as le, a as It, b as St, P as kt } from "./components.js";
import { DashboardOutlined as zt, SolutionOutlined as Mt, UserOutlined as we, SafetyOutlined as Nt, FileSearchOutlined as At, SettingOutlined as Lt, SwapOutlined as Tt, MenuUnfoldOutlined as _t, MenuFoldOutlined as Ct } from "@ant-design/icons";
import { d as Rt, a as Ot, u as Ut, b as Dt, e as Bt, f as Et, A as $t, S as Ft, g as Vt } from "./contexts.js";
import { flatMapDeep as Gt, snakeCase as Kt } from "lodash-es";
import { A as Ht, a as qt, b as Qt } from "./ai-chat-layout.js";
import { createStyles as Yt, useThemeMode as Zt, ThemeProvider as Jt, createGlobalStyle as Wt } from "antd-style";
import g from "classnames";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Xt = o(() => import("./dashboard.js")), Pt = o(() => import("./login.js")), en = o(() => import("./activate.js")), tn = o(() => import("./profile.js")), nn = o(() => import("./inbox_list.js")), me = o(() => import("./not_found.js")), sn = o(() => import("./forbidden.js")), an = o(() => import("./users.js").then((s) => s.U)), on = o(() => import("./users.js").then((s) => s.a)), ce = o(() => import("./users.js").then((s) => s.b)), rn = o(() => import("./roles.js").then((s) => s.R)), de = o(() => import("./roles.js").then((s) => s.a)), ln = o(() => import("./system-settings.js").then((s) => s.i)), mn = o(() => import("./system-settings.js").then((s) => s.O)), cn = o(() => import("./system-settings.js").then((s) => s.S)), dn = o(() => import("./system-settings.js").then((s) => s.a)), hn = o(() => import("./system-settings.js").then((s) => s.A)), un = o(() => import("./system-settings.js").then((s) => s.T)), pn = o(() => import("./system-settings.js").then((s) => s.b)), fn = o(() => import("./audit.js")), gn = o(() => import("./service-accounts.js").then((s) => s.S)), xn = o(() => import("./service-accounts.js").then((s) => s.a)), yn = o(() => import("./task_list.js")), wn = o(() => import("./task_detail.js")), jn = o(() => import("./task_schedule_list.js"));
function i(s, r) {
  return /* @__PURE__ */ e.jsx(yt, { fallback: /* @__PURE__ */ e.jsx(wt, {}), children: /* @__PURE__ */ e.jsx(s, { ...r }) });
}
const bn = ({ transformSettingTabs: s, transformLangConfig: r, extraPrivateRoutes: y = [], extraPublicRoutes: L = [] }) => {
  const k = [
    {
      path: "/login",
      element: i(Pt, { transformLangConfig: r }),
      index: !0
    },
    {
      path: "/404",
      element: i(me),
      index: !0
    },
    {
      path: "/403",
      element: i(sn),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: i(pn),
      index: !0
    },
    {
      path: "/activate",
      element: i(en, { transformLangConfig: r }),
      index: !0
    },
    ...L
  ], T = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: i(Xt),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(zt, {}),
          index: !0
        },
        {
          path: "/profile",
          element: i(tn),
          hideInMenu: !0,
          name: "profile",
          index: !1
        },
        {
          path: "/inbox",
          element: i(nn),
          hideInMenu: !0,
          name: "inbox",
          index: !1
        },
        ...y,
        {
          path: "/tasks",
          children: [
            {
              // path: '/tasks',
              // No permission required: the backend limits the result to the
              // current user's own tasks unless they hold task:list.
              element: i(yn),
              name: "tasks",
              index: !0
            },
            {
              path: "/tasks/schedules",
              element: i(jn),
              permissions: ["task:schedule:list"],
              name: "taskSchedules",
              index: !1
            },
            {
              path: "/tasks/:id",
              // No permission required: the backend allows the task creator
              // to view their own task; task:view grants access to all tasks.
              element: i(wn),
              index: !1
            }
          ]
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(we, {}),
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
              icon: /* @__PURE__ */ e.jsx(Mt, {}),
              permissions: ["authorization:role:view"],
              children: [
                {
                  element: i(rn),
                  permissions: ["authorization:role:view"],
                  index: !0,
                  name: "roles"
                },
                {
                  path: "/authorization/roles/create",
                  element: i(de),
                  permissions: ["authorization:role:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "roleCreate"
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: i(de),
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
              icon: /* @__PURE__ */ e.jsx(Je, {}),
              permissions: ["authorization:user:list"],
              children: [
                {
                  element: i(an),
                  permissions: ["authorization:user:list"],
                  index: !0,
                  name: "users"
                },
                {
                  path: "/authorization/users/create",
                  element: i(ce),
                  permissions: ["authorization:user:create"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userCreate"
                },
                {
                  path: "/authorization/users/:id",
                  element: i(on),
                  permissions: ["authorization:user:view"],
                  index: !1,
                  hideInMenu: !0,
                  name: "userDetail"
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: i(ce),
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
              icon: /* @__PURE__ */ e.jsx(We, {}),
              permissions: [
                "authorization:service_account:list"
              ],
              children: [
                {
                  element: i(gn),
                  permissions: ["authorization:service_account:view"],
                  index: !0,
                  hideInMenu: !0,
                  name: "serviceAccounts"
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: i(xn),
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
          icon: /* @__PURE__ */ e.jsx(Lt, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:audit_log:view", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view", "system:rate_limit:view", "system:rate_limit:update"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(Nt, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:security:view", "system:security:update", "system:organization:view", "ai:models:view", "system:toolsets:view", "system:skills:view", "system:rate_limit:view", "system:rate_limit:update"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  hideInMenu: !0,
                  element: i(ln, { transformItems: s }),
                  name: "settings"
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: i(mn),
                  name: "organizationDetail",
                  index: !1,
                  hideInMenu: !0
                },
                {
                  path: "/system/settings/skills/:id/edit",
                  permissions: ["system:skills:edit_files"],
                  element: i(cn),
                  name: "skillEditor",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/skills/:id/preview",
                  permissions: ["system:skills:view"],
                  element: i(dn),
                  name: "skillPreview",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/ai-trace",
                  permissions: ["ai:trace:manage"],
                  element: i(hn),
                  name: "aiTraceViewer",
                  hideInMenu: !0,
                  index: !1
                },
                {
                  path: "/system/settings/toolsets/:id/debug",
                  permissions: ["system:toolsets:test"],
                  element: i(un),
                  name: "toolSetDebug",
                  hideInMenu: !0,
                  index: !1
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(At, {}),
              name: "audit",
              permissions: ["system:audit_log:view"],
              index: !1,
              element: i(fn)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: i(me),
          index: !0
        }
      ]
    }
  ];
  return [...k, ...T];
}, ts = {
  ai: Qe,
  authorization: ue,
  base: pe,
  inbox: Ze,
  system: Q,
  oauth: ge,
  tasks: xe
}, { Header: vn, Content: In, Footer: Sn, Sider: kn } = Z, zn = Yt(({ token: s, css: r }) => ({
  layout: r`
      height: 100vh;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    `,
  header: r`
      padding: 0;
      display: flex;
      justify-content: space-between;
      background-color: ${s.colorBgContainer};
      border-block-end: 1px solid ${s.colorBorderSecondary};
    `,
  footer: r`
      text-align: center;
      padding: 15px 50px;
    `,
  contentContainer: r`
      padding: 24px;
      background-color: ${s.colorBgContainer};
    `,
  content: r`
      margin: 0 16px;
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
    `,
  mainLayout: r`
      flex: 1;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      background-color: ${s.colorBgContainer};
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
      height: 100%;
      .ant-layout-sider-children{
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
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
      min-height: 0;
      overflow: auto;
    `
})), Mn = ({
  element: s,
  siderWidth: r = 250,
  routes: y,
  transformLangConfig: L,
  menuStyle: k = "dark",
  transformHeaderItems: T = (M) => M,
  layout: z,
  aiChatProps: I
}) => {
  var se;
  const { isDarkMode: M } = Zt(), { styles: c } = zn(), { layout: x, visible: U, loaded: p, resetPageAIContext: D } = Rt(), { t: S, i18n: N } = J(), { t: A } = J("common"), w = ot(), { hasPermission: v } = Ot(), u = rt(), { logout: m, user: d } = Ut(), { siteConfig: l, clearCurrentOrgId: B } = Dt();
  Bt();
  const E = !!((se = l == null ? void 0 : l.attrs) != null && se.ai_enabled) && v("ai:chat:create"), [W, X] = R([]), [be, ve] = R(null), [$, Ie] = R("Loading..."), h = typeof z == "function" ? void 0 : z, {
    className: Se,
    width: ke,
    theme: ze,
    collapsed: P,
    defaultCollapsed: Me = !1,
    onCollapse: G,
    collapsible: Ne,
    breakpoint: Ae = "xxl",
    ...Le
  } = (h == null ? void 0 : h.siderProps) ?? {}, {
    className: Te,
    theme: _e,
    ...Ce
  } = (h == null ? void 0 : h.menuProps) ?? {}, [Re, Oe] = R(Me), _ = P ?? Re, ee = Ne ?? !0, K = (n, a) => {
    P === void 0 && Oe(n), G == null || G(n, a);
  };
  O(() => {
    D();
  }, [w.pathname, D]), Et(y, E), w.pathname !== "/profile" && (d && d.mfa_enforced && !d.mfa_enabled ? u("/profile#mfa") : d && d.status === "password_expired" && u("/profile#password"));
  const Ue = () => {
    m(), B(), window.location.href = fe("/login?redirect=" + encodeURIComponent(window.location.href));
  }, De = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(V, { to: "/profile", children: A("profile") })
    },
    {
      key: "logout",
      label: A("logout"),
      onClick: Ue
    }
  ];
  O(() => {
    var n, a;
    if (l) {
      const j = ((n = l.navigation) == null ? void 0 : n.filter((f) => f.path !== l.home_page)) ?? [], t = [...l.home_page ? [{
        name: "home",
        path: l.home_page
      }] : [], ...j];
      t.length > 1 ? X(t) : X([]), ve(l.logo), (a = document.getElementById("site-icon")) == null || a.setAttribute("href", l.logo);
    }
  }, [l]), O(() => {
    N.language && Ie((l == null ? void 0 : l.name_i18n[N.language]) || (l == null ? void 0 : l.name) || "");
  }, [l, N.language]);
  const H = () => {
    const n = q(y, w.pathname), a = [];
    if (n) {
      for (const [j, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          a.push({
            href: t.route.path,
            title: A("home"),
            key: "home"
          });
        else if (t.route.name) {
          const f = n.slice(0, j + 1).map((F) => F.route.name).filter(Boolean).join(".");
          if ((a.length > 0 ? a[a.length - 1].path : void 0) === (t.route.path || t.pathnameBase))
            continue;
          a.push({
            path: t.pathnameBase,
            title: t.route.name ? S(`breadcrumbs.${f.replace(/\./g, "_")}`, { defaultValue: Ye(t.route.name) }) : void 0,
            key: t.pathname || t.route.name
          });
        }
    }
    return a;
  }, Be = (n) => n.some((a) => v(a)), Ee = Gt(y, (n) => "children" in n && n.children ? n.children : []).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), te = (n, a = []) => {
    const j = (t) => t && t.replace(/_/g, " ").split(" ").map((f) => f.charAt(0).toUpperCase() + f.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if ("hideInMenu" in t && t.hideInMenu || t.permissions && !Be(t.permissions))
        return null;
      const f = j(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const b = te(t.children, [...a, t.name]);
        return b.length == 0 && t.path ? {
          key: t.path,
          icon: t.icon,
          label: /* @__PURE__ */ e.jsx(V, { to: t.path, children: S(`menu.${[...a, t.name].join(".")}`, { defaultValue: f }) })
        } : {
          key: t.path ?? t.name,
          icon: t.icon,
          label: S(`menu.${[...a, t.name, t.name].join(".")}`, { defaultValue: f }),
          children: b
        };
      }
      return t.name && t.path ? {
        key: t.path,
        icon: t.icon,
        label: /* @__PURE__ */ e.jsx(V, { to: t.path, children: S(`menu.${[...a, t.name].join(".")}`, { defaultValue: f }) })
      } : null;
    }).filter(Boolean);
  };
  O(() => {
    const n = H().filter((a) => a.path !== "/").map((a) => a.title).join(" - ");
    n ? document.title = `${$} | ${n}` : document.title = $;
  }, [H, w.pathname]);
  const $e = ye(() => {
    const n = q(y, w.pathname);
    if (n) {
      for (const a of n.reverse())
        if (a.route.path && a.route.name && !("hideInMenu" in a.route && a.route.hideInMenu))
          return a.route.path;
    }
    return w.pathname;
  }, [w.pathname]), Fe = [
    /* @__PURE__ */ e.jsx(
      re,
      {
        className: "header-item navigation-dropdown",
        hidden: W.length <= 1,
        menu: {
          items: W.map((n) => ({
            key: n.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: S(`menu.${n.name}`, { defaultValue: n.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(Tt, {})
      },
      "navigation-dropdown"
    ),
    ...l != null && l.enable_multi_org ? [/* @__PURE__ */ e.jsx(jt, { className: "header-item org-switcher" }, "org-switcher")] : [],
    /* @__PURE__ */ e.jsx(bt, { className: "header-item inbox-dropdown" }, "inbox-dropdown"),
    /* @__PURE__ */ e.jsx(vt, { className: "header-item task-dropdown" }, "task-dropdown"),
    /* @__PURE__ */ e.jsxs(
      re,
      {
        className: "header-item user-dropdown",
        menu: { items: De },
        children: [
          d != null && d.avatar ? /* @__PURE__ */ e.jsx(le, { src: d.avatar, size: "small" }) : /* @__PURE__ */ e.jsx(le, { icon: /* @__PURE__ */ e.jsx(we, {}), size: "small" }),
          /* @__PURE__ */ e.jsx("span", { className: g("header-user-name", c.userName), children: (d == null ? void 0 : d.full_name) || (d == null ? void 0 : d.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(It, { className: "header-item language-switch", transformLangConfig: L }, "language-switch"),
    /* @__PURE__ */ e.jsx(St, { className: "header-item theme-switch" }, "theme-switch")
  ], Ve = (n) => n ? Kt(n).replace(/[^a-zA-Z0-9-]/g, "-") : "", Ge = (n) => {
    const a = n.href || n.path;
    return a ? /* @__PURE__ */ e.jsx(V, { to: a, children: n.title }) : /* @__PURE__ */ e.jsx("span", { children: n.title });
  }, Ke = (n) => {
    var ae, ie;
    const a = Ve((ie = (ae = q(y, w.pathname)) == null ? void 0 : ae.pop()) == null ? void 0 : ie.route.name), j = h == null ? void 0 : h.logo, t = h == null ? void 0 : h.breadcrumb, f = h == null ? void 0 : h.footer, b = h == null ? void 0 : h.contentWrapper;
    let F = null;
    if (j !== !1) {
      let C;
      typeof j == "function" ? C = j({
        collapsed: _,
        siteIconUrl: n.siteIconUrl,
        siteName: $
      }) : j !== void 0 ? C = j : n.siteIconUrl ? C = /* @__PURE__ */ e.jsx("img", { src: n.siteIconUrl, alt: "logo", className: c.layoutLogoImage }) : C = /* @__PURE__ */ e.jsx(ft, {}), F = /* @__PURE__ */ e.jsx("div", { className: g("logo", c.layoutLogo), children: /* @__PURE__ */ e.jsx("div", { className: g("layout-logo-container", c.layoutLogoContainer), children: C }) });
    }
    const He = t === !1 ? null : /* @__PURE__ */ e.jsx(
      dt,
      {
        className: g("site-breadcrumb", c.breadcrumb, t == null ? void 0 : t.className),
        style: t == null ? void 0 : t.style,
        itemRender: (t == null ? void 0 : t.itemRender) ?? Ge,
        items: n.breadcrumbs
      }
    ), qe = b === !1 ? n.content : /* @__PURE__ */ e.jsx(
      "div",
      {
        className: g("site-content-container", c.contentContainer, b == null ? void 0 : b.className),
        style: b == null ? void 0 : b.style,
        children: n.content
      }
    );
    return /* @__PURE__ */ e.jsxs(Z, { className: g("main-layout", c.layout, { [`page-${a}`]: a }), children: [
      /* @__PURE__ */ e.jsxs(
        kn,
        {
          ...Le,
          width: ke ?? r,
          breakpoint: Ae,
          collapsible: ee,
          collapsed: _,
          onCollapse: K,
          className: g(c.menuSider, "layout-menu-sider", Se),
          theme: ze ?? (M ? "light" : k),
          children: [
            F,
            /* @__PURE__ */ e.jsx(
              ht,
              {
                defaultOpenKeys: Ee,
                defaultSelectedKeys: ["1"],
                mode: "inline",
                ...Ce,
                className: g("layout-menu", c.menu, Te),
                theme: _e ?? (M ? "light" : k),
                selectedKeys: [$e],
                items: n.menuItems
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e.jsxs(Z, { className: g("site-layout", "main-layout", c.mainLayout), children: [
        /* @__PURE__ */ e.jsxs(vn, { className: g("site-header", c.header), children: [
          /* @__PURE__ */ e.jsxs(ut, { children: [
            ee && /* @__PURE__ */ e.jsx(
              pt,
              {
                type: "text",
                icon: _ ? /* @__PURE__ */ e.jsx(_t, {}) : /* @__PURE__ */ e.jsx(Ct, {}),
                onClick: () => K(!_, "clickTrigger"),
                className: g("layout-menu-toggle", c.menuToggleButton)
              }
            ),
            He
          ] }),
          /* @__PURE__ */ e.jsx("div", { className: g("header-items", c.headerItems), children: n.headerItems })
        ] }),
        /* @__PURE__ */ e.jsxs(In, { className: g("site-content", c.content), children: [
          qe,
          E && /* @__PURE__ */ e.jsx(Ht, { icon: I == null ? void 0 : I.floatButtonIcon }),
          E && x === "classic" && (U || p) && /* @__PURE__ */ e.jsx(qt, { ...I })
        ] }),
        f !== !1 && /* @__PURE__ */ e.jsx(Sn, { className: g("site-footer", c.footer), children: f === void 0 ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          $
        ] }) : f })
      ] }),
      E && (x === "sidebar" || x === "float-sidebar") && (U || p) && /* @__PURE__ */ e.jsx(Qt, { ...I })
    ] });
  }, ne = {
    siteIconUrl: be,
    menuItems: te(y),
    headerItems: T(Fe),
    breadcrumbs: H(),
    content: s ?? /* @__PURE__ */ e.jsx(lt, {}),
    collapsed: _,
    setCollapsed: (n) => K(n, "clickTrigger")
  };
  return typeof z == "function" ? z(ne) : Ke(ne);
}, je = "theme-mode";
function Nn({ styles: s }) {
  const r = ye(() => Wt(s), [s]);
  return /* @__PURE__ */ e.jsx(r, {});
}
function An() {
  try {
    const s = localStorage.getItem(je);
    if (s === "light" || s === "dark" || s === "auto")
      return s;
  } catch {
  }
  return "light";
}
const Ln = new at({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), he = {
  "zh-CN": st,
  "en-US": Y,
  "de-DE": nt,
  "es-ES": tt,
  "fr-FR": et,
  "ar-AE": Pe,
  "sv-SE": Xe
};
function ns({
  transformRouter: s = (p) => p,
  transformSettingTabs: r = (p) => p,
  transformLangConfig: y = (p) => p,
  extraPrivateRoutes: L = [],
  extraPublicRoutes: k = [],
  menuStyle: T = "dark",
  transformHeaderItems: z = (p) => p,
  layout: I,
  aiChatProps: M,
  style: c,
  themeProviderProps: x,
  configProviderProps: U
}) {
  const { i18n: p } = J(), [D, S] = R(he[p.language] || Y);
  O(() => {
    S(he[p.language] || Y);
  }, [p.language]);
  const N = (v) => v.map((u) => !("children" in u) || u.children === void 0 ? u : {
    ...u,
    children: N(u.children)
  }), A = s(N(bn({
    transformSettingTabs: r,
    transformLangConfig: y,
    extraPrivateRoutes: L,
    extraPublicRoutes: k
  }))), w = (v, u) => v.flatMap((m) => m.is_private ? [m] : [m]).map((m, d) => {
    const l = m.is_private ? /* @__PURE__ */ e.jsx(kt, { element: /* @__PURE__ */ e.jsx(
      Mn,
      {
        routes: A,
        element: m.element,
        transformLangConfig: y,
        menuStyle: T,
        transformHeaderItems: z,
        layout: I,
        aiChatProps: M
      }
    ) }) : m.element;
    if ("children" in m && m.children && m.children.length > 0)
      return /* @__PURE__ */ e.jsx(oe, { path: m.path, element: l, children: w(m.children, m) }, m.path ?? m.name ?? d);
    const { path: B } = m;
    return /* @__PURE__ */ e.jsx(oe, { path: B, index: m.index, element: l }, B ?? m.name ?? `${(u == null ? void 0 : u.path) ?? ""}.${d}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(it, { client: Ln, children: /* @__PURE__ */ e.jsxs(
    Jt,
    {
      ...x,
      defaultThemeMode: (x == null ? void 0 : x.defaultThemeMode) ?? An(),
      onThemeModeChange: (v) => {
        var u;
        try {
          localStorage.setItem(je, v);
        } catch {
        }
        (u = x == null ? void 0 : x.onThemeModeChange) == null || u.call(x, v);
      },
      children: [
        c ? /* @__PURE__ */ e.jsx(Nn, { styles: c }) : null,
        /* @__PURE__ */ e.jsx(gt, { ...U, locale: D, children: /* @__PURE__ */ e.jsx(xt, { children: /* @__PURE__ */ e.jsx($t, { children: /* @__PURE__ */ e.jsx(Ft, { children: /* @__PURE__ */ e.jsx(Vt, { children: /* @__PURE__ */ e.jsx(mt, { basename: fe(), children: /* @__PURE__ */ e.jsx(ct, { children: w(A) }) }) }) }) }) }) })
      ]
    }
  ) });
}
const ss = o(() => import("./ai-chat.js")), as = o(() => import("./markdown-viewer.js")), is = o(() => import("./markdown-viewer.js").then((s) => ({ default: s.Code }))), os = {
  ...ue,
  ...pe,
  ...ge,
  ...Q,
  ...Q,
  ...xe
};
export {
  ss as A,
  is as M,
  ts as a,
  Mn as b,
  ns as c,
  as as d,
  os as e,
  i as w
};
