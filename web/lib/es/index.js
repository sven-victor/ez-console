import { a as he } from "./ai.js";
import { a as X } from "./authorization.js";
import { b as Z, g as ee } from "./base.js";
import { a as M } from "./system.js";
import { o as te } from "./oauth.js";
import { j as e, E as de, G as me, H as ue, J as pe, L as xe, N as B, O as fe } from "./vendor.js";
import { QueryClient as ge, QueryClientProvider as je } from "react-query";
import { useLocation as ve, useNavigate as ye, Link as k, Outlet as ze, matchRoutes as we, BrowserRouter as be, Routes as _e, Route as T } from "react-router-dom";
import { Layout as U, Menu as I, Spin as Se, Button as Ae, Breadcrumb as Le, ConfigProvider as Oe } from "antd";
import { useTranslation as C } from "react-i18next";
import { lazy as l, Suspense as Re, useState as A, useEffect as N } from "react";
import { L as $e, H as q, O as ke, A as Q, a as Ie, b as Ne, c as Pe, d as De, P as Fe } from "./components.js";
import { DashboardOutlined as Me, SolutionOutlined as Be, UserOutlined as P, SafetyOutlined as Ue, FileSearchOutlined as Ce, SettingOutlined as Ee, SwapOutlined as He, MenuUnfoldOutlined as Ve, MenuFoldOutlined as Ke } from "@ant-design/icons";
import { u as Te, b as qe, a as Qe, c as We, A as Ge, S as Je, e as Ye } from "./contexts.js";
import Xe from "lodash";
import "./ai-chat.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Ze = l(() => import("./dashboard.js")), et = l(() => import("./login.js")), tt = l(() => import("./profile.js")), W = l(() => import("./not_found.js")), it = l(() => import("./forbidden.js")), nt = l(() => import("./users.js").then((s) => s.U)), at = l(() => import("./users.js").then((s) => s.a)), G = l(() => import("./users.js").then((s) => s.b)), st = l(() => import("./roles.js").then((s) => s.R)), J = l(() => import("./roles.js").then((s) => s.a)), ot = l(() => import("./system-settings.js").then((s) => s.i)), rt = l(() => import("./system-settings.js").then((s) => s.O)), lt = l(() => import("./system-settings.js").then((s) => s.a)), ct = l(() => import("./audit.js")), ht = l(() => import("./service-accounts.js").then((s) => s.S)), dt = l(() => import("./service-accounts.js").then((s) => s.a));
function o(s, m) {
  return /* @__PURE__ */ e.jsx(Re, { fallback: /* @__PURE__ */ e.jsx($e, {}), children: /* @__PURE__ */ e.jsx(s, { ...m }) });
}
const mt = ({ transformSettingTabs: s, transformLangConfig: m, extraPrivateRoutes: j = [], extraPublicRoutes: v = [] }) => {
  const w = [
    {
      path: "/login",
      element: o(et, { transformLangConfig: m }),
      index: !0
    },
    {
      path: "/404",
      element: o(W),
      index: !0
    },
    {
      path: "/403",
      element: o(it),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o(lt),
      index: !0
    },
    ...v
  ], b = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: o(Ze),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(Me, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(tt),
          name: void 0,
          index: !0
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(P, {}),
          permissions: ["authorization:user:view", "authorization:user:create", "authorization:user:update", "authorization:user:delete", "authorization:service_account:view", "authorization:service_account:create", "authorization:service_account:update", "authorization:service_account:delete", "authorization:role:view"],
          children: [
            // Role management
            {
              path: "/authorization/roles",
              name: "roles",
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
              children: [
                {
                  element: o(st),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: o(J),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: o(J),
                  permissions: ["authorization:role:update"],
                  index: !0
                }
              ]
            },
            // User management
            {
              path: "/authorization/users",
              name: "users",
              icon: /* @__PURE__ */ e.jsx(P, {}),
              permissions: ["authorization:user:view", "authorization:user:list", "authorization:user:create", "authorization:user:update", "authorization:user:delete"],
              children: [
                {
                  element: o(nt),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: o(G),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: o(at),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: o(G),
                  permissions: ["authorization:user:update"],
                  index: !0
                }
              ]
            },
            // Service account management
            {
              path: "/authorization/service-accounts",
              name: "serviceAccounts",
              icon: /* @__PURE__ */ e.jsx(P, {}),
              permissions: ["authorization:service_account:view"],
              children: [
                {
                  element: o(ht),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(dt),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                }
              ]
            }
          ]
        },
        ...j,
        // System management menu
        {
          name: "system",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(Ue, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: o(ot, { transformItems: s })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(rt),
                  index: !0
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(Ce, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: o(ct)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: o(W),
          index: !0
        }
      ]
    }
  ];
  return [...w, ...b];
}, Et = {
  ai: he,
  authorization: X,
  base: Z,
  system: M,
  oauth: te
}, { Header: ut, Content: pt, Footer: xt, Sider: ft } = U, { SubMenu: gt } = I, jt = ({
  element: s,
  routes: m,
  transformLangConfig: j,
  menuStyle: v = "dark",
  transformHeaderItems: w = (x) => x,
  renderLayout: b
}) => {
  const { layout: x, visible: L, loaded: c } = Te(), { t: f, i18n: _ } = C(), { t: y } = C("common"), g = ve(), { hasPermission: O } = qe(), z = ye(), { logout: h, user: i } = Qe(), { siteConfig: n, clearCurrentOrgId: R } = We(), [S, E] = A([]), [ie, ne] = A(null), [D, ae] = A("Loading...");
  g.pathname !== "/profile" && (i && i.mfa_enforced && !i.mfa_enabled ? z("/profile#mfa") : i && i.status === "password_expired" && z("/profile#password"));
  const se = () => {
    h(), R(), window.location.href = ee("/login?redirect=" + encodeURIComponent(window.location.href));
  }, oe = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(k, { to: "/profile", children: y("profile") })
    },
    {
      key: "logout",
      label: y("logout"),
      onClick: se
    }
  ];
  N(() => {
    var a;
    if (n) {
      const r = n.navigation.filter((t) => t.path !== n.home_page), u = [...n.home_page ? [{
        name: "home",
        path: n.home_page
      }] : [], ...r];
      u.length > 1 ? E(u) : E([]), ne(n.logo), (a = document.getElementById("site-icon")) == null || a.setAttribute("href", n.logo);
    }
  }, [n]), N(() => {
    _.language && ae((n == null ? void 0 : n.name_i18n[_.language]) || (n == null ? void 0 : n.name) || "");
  }, [n, _.language]);
  const F = () => {
    const a = we(m, g.pathname), r = [];
    if (a) {
      for (const [u, t] of a.entries())
        if (t.route.path === "/" && !t.route.name)
          r.push({
            href: t.route.path,
            title: y("home"),
            key: "home"
          });
        else if (t.route.name) {
          const d = a.slice(0, u + 1).map((p) => p.route.name).filter(Boolean).join(".");
          r.push({
            path: t.route.path,
            title: t.route.name ? f(`breadcrumbs.${d}`) : void 0,
            key: t.route.path
          });
        }
    }
    return r;
  }, re = (a) => a.some((r) => O(r)), le = Xe.flatMapDeep(m, (a) => a.children).map((a) => a == null ? void 0 : a.name).filter((a) => a !== void 0), H = (a, r = []) => {
    const u = (t) => t && t.replace(/_/g, " ").split(" ").map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(" ");
    return a.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !re(t.permissions))
        return null;
      const d = u(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const p = H(t.children, [...r, t.name]);
        return p.length == 0 && t.path ? /* @__PURE__ */ e.jsx(I.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(k, { to: t.path, children: f(`menu.${[...r, t.name].join(".")}`, { defaultValue: d }) }) }, t.path) : /* @__PURE__ */ e.jsx(gt, { icon: t.icon, title: f(`menu.${[...r, t.name, t.name].join(".")}`, { defaultValue: d }), children: p }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(I.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(k, { to: t.path, children: f(`menu.${[...r, t.name].join(".")}`, { defaultValue: d }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  N(() => {
    const a = F().filter((r) => r.path !== "/").map((r) => r.title).join(" - ");
    a ? document.title = `${D} | ${a}` : document.title = D;
  }, [F, g.pathname]);
  const ce = [
    /* @__PURE__ */ e.jsx(
      q,
      {
        hidden: S.length <= 1,
        menu: {
          items: S.map((a) => ({
            key: a.path,
            style: { paddingRight: "20px" },
            label: /* @__PURE__ */ e.jsx("a", { href: a.path, children: f(`menu.${a.name}`, { defaultValue: a.name }) })
          }))
        },
        children: /* @__PURE__ */ e.jsx(He, {})
      },
      "navigation-dropdown"
    ),
    ...n != null && n.enable_multi_org ? [/* @__PURE__ */ e.jsx(ke, {}, "org-switcher")] : [],
    /* @__PURE__ */ e.jsxs(
      q,
      {
        menu: { items: oe },
        children: [
          i != null && i.avatar ? /* @__PURE__ */ e.jsx(Q, { src: i.avatar }) : /* @__PURE__ */ e.jsx(Q, { icon: /* @__PURE__ */ e.jsx(P, {}) }),
          /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: (i == null ? void 0 : i.full_name) || (i == null ? void 0 : i.username) })
        ]
      },
      "user-dropdown"
    ),
    /* @__PURE__ */ e.jsx(Ie, { transformLangConfig: j }, "language-switch")
  ];
  return (b ?? ((a, r, u, t, d) => {
    const [p, V] = A(!1);
    return /* @__PURE__ */ e.jsxs(U, { style: { minHeight: "100vh", display: "flex", flexDirection: "row" }, children: [
      /* @__PURE__ */ e.jsxs(ft, { collapsible: !0, collapsed: p, onCollapse: V, theme: v, children: [
        /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: a ? /* @__PURE__ */ e.jsx("img", { src: a, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(Se, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(I, { theme: v, defaultOpenKeys: le, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [g.pathname], children: r })
      ] }),
      /* @__PURE__ */ e.jsxs(U, { className: "site-layout main-layout", style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ e.jsxs(ut, { className: "site-layout-background", style: { padding: 0, display: "flex", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ e.jsx(
            Ae,
            {
              type: "text",
              icon: p ? /* @__PURE__ */ e.jsx(Ve, {}) : /* @__PURE__ */ e.jsx(Ke, {}),
              onClick: () => V(!p),
              style: { fontSize: "16px", width: 64, height: 64 }
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { marginRight: "20px" }, children: u })
        ] }),
        /* @__PURE__ */ e.jsxs(pt, { style: { margin: "0 16px", height: "calc(100vh - 170px)", overflow: "auto" }, children: [
          /* @__PURE__ */ e.jsx(Le, { style: { margin: "16px 0" }, itemRender: ($) => {
            const K = $.href || $.path;
            return K ? /* @__PURE__ */ e.jsx(k, { to: K, children: $.title }) : /* @__PURE__ */ e.jsx("span", { children: $.title });
          }, items: t }),
          /* @__PURE__ */ e.jsx("div", { className: "site-layout-background", style: { padding: 24, minHeight: "calc(100vh - 190px)" }, children: d }),
          (n == null ? void 0 : n.attrs.ai_enabled) && /* @__PURE__ */ e.jsx(Ne, {}),
          (n == null ? void 0 : n.attrs.ai_enabled) && x === "classic" && (L || c) && /* @__PURE__ */ e.jsx(Pe, {})
        ] }),
        /* @__PURE__ */ e.jsxs(xt, { style: { textAlign: "center" }, children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          D
        ] })
      ] }),
      (n == null ? void 0 : n.attrs.ai_enabled) && (x === "sidebar" || x === "float-sidebar") && (L || c) && /* @__PURE__ */ e.jsx(De, {})
    ] });
  }))(ie, H(m), w(ce), F(), s ?? /* @__PURE__ */ e.jsx(ze, {}));
}, vt = new ge({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), Y = {
  "zh-CN": fe,
  "en-US": B,
  "de-DE": xe,
  "es-ES": pe,
  "fr-FR": ue,
  "ar-AE": me,
  "sv-SE": de
};
function Ht({
  transformRouter: s = (c) => c,
  transformSettingTabs: m = (c) => c,
  transformLangConfig: j = (c) => c,
  extraPrivateRoutes: v = [],
  extraPublicRoutes: w = [],
  menuStyle: b = "dark",
  transformHeaderItems: x = (c) => c,
  renderLayout: L
}) {
  const { i18n: c } = C(), [f, _] = A(Y[c.language] || B);
  N(() => {
    _(Y[c.language] || B);
  }, [c.language]);
  const y = (z) => z.map((h) => h.children === void 0 ? h : {
    ...h,
    children: y(h.children)
  }), g = s(y(mt({
    transformSettingTabs: m,
    transformLangConfig: j,
    extraPrivateRoutes: v,
    extraPublicRoutes: w
  }))), O = (z, h) => z.flatMap((i) => i.is_private ? [i] : "children" in i && i.children ? i.children : [i]).map((i, n) => {
    const R = i.is_private ? /* @__PURE__ */ e.jsx(Fe, { element: /* @__PURE__ */ e.jsx(
      jt,
      {
        routes: g,
        element: i.element,
        transformLangConfig: j,
        menuStyle: b,
        transformHeaderItems: x,
        renderLayout: L
      }
    ) }) : i.element;
    if ("children" in i && i.children && i.children.length > 0)
      return /* @__PURE__ */ e.jsx(T, { path: i.path, element: R, children: O(i.children, i) }, i.path ?? i.name ?? n);
    const { path: S } = i;
    return /* @__PURE__ */ e.jsx(T, { path: S, index: i.index, element: R }, S ?? i.name ?? `${(h == null ? void 0 : h.path) ?? ""}.${n}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(je, { client: vt, children: /* @__PURE__ */ e.jsx(
    Oe,
    {
      locale: f,
      children: /* @__PURE__ */ e.jsx(Ge, { children: /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(Ye, { children: /* @__PURE__ */ e.jsx(be, { basename: ee(), children: /* @__PURE__ */ e.jsx(_e, { children: O(g) }) }) }) }) })
    }
  ) });
}
const Vt = {
  ...X,
  ...Z,
  ...te,
  ...M,
  ...M
};
export {
  Ht as A,
  Et as a,
  Vt as b,
  jt as c,
  o as w
};
