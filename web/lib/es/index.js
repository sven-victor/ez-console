import { a as oe } from "./ai.js";
import { a as Y } from "./authorization.js";
import { b as G, g as J } from "./base.js";
import { s as X } from "./system.js";
import { o as Z } from "./oauth.js";
import { j as e, d as re, b as le, c as ce, e as he, f as me, g as B, h as de } from "./vendor.js";
import { QueryClient as ue, QueryClientProvider as pe } from "react-query";
import { useLocation as xe, useNavigate as fe, Link as $, Outlet as ge, matchRoutes as je, BrowserRouter as ve, Routes as ye, Route as H } from "react-router-dom";
import { Layout as D, Menu as k, Spin as ze, Button as we, Breadcrumb as be, ConfigProvider as _e } from "antd";
import { useTranslation as I } from "react-i18next";
import { lazy as c, Suspense as Se, useState as S, useEffect as C } from "react";
import { L as Ae, H as V, O as Le, A as K, a as Oe, b as Re, P as $e } from "./components.js";
import { DashboardOutlined as ke, SolutionOutlined as Ce, UserOutlined as N, SafetyOutlined as Ne, FileSearchOutlined as Fe, SettingOutlined as Pe, SwapOutlined as Be, MenuUnfoldOutlined as De, MenuFoldOutlined as Ie } from "@ant-design/icons";
import { a as Me, u as Ue, b as Ee, A as He, S as Ve } from "./contexts.js";
import Ke from "lodash";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Te = c(() => import("./dashboard.js")), qe = c(() => import("./login.js")), Qe = c(() => import("./profile.js")), T = c(() => import("./not_found.js")), We = c(() => import("./forbidden.js")), Ye = c(() => import("./users.js").then((n) => n.U)), Ge = c(() => import("./users.js").then((n) => n.a)), q = c(() => import("./users.js").then((n) => n.b)), Je = c(() => import("./roles.js").then((n) => n.R)), Q = c(() => import("./roles.js").then((n) => n.a)), Xe = c(() => import("./system-settings.js").then((n) => n.i)), Ze = c(() => import("./system-settings.js").then((n) => n.O)), et = c(() => import("./system-settings.js").then((n) => n.a)), tt = c(() => import("./audit.js")), it = c(() => import("./service-accounts.js").then((n) => n.S)), nt = c(() => import("./service-accounts.js").then((n) => n.a));
function o(n, u) {
  return /* @__PURE__ */ e.jsx(Se, { fallback: /* @__PURE__ */ e.jsx(Ae, {}), children: /* @__PURE__ */ e.jsx(n, { ...u }) });
}
const st = ({ transformSettingTabs: n, transformLangConfig: u, extraPrivateRoutes: g = [], extraPublicRoutes: j = [] }) => {
  const z = [
    {
      path: "/login",
      element: o(qe, { transformLangConfig: u }),
      index: !0
    },
    {
      path: "/404",
      element: o(T),
      index: !0
    },
    {
      path: "/403",
      element: o(We),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o(et),
      index: !0
    },
    ...j
  ], w = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: o(Te),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(Qe),
          name: void 0,
          index: !0
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(N, {}),
          permissions: ["authorization:user:view", "authorization:user:create", "authorization:user:update", "authorization:user:delete", "authorization:service_account:view", "authorization:service_account:create", "authorization:service_account:update", "authorization:service_account:delete", "authorization:role:view"],
          children: [
            // Role management
            {
              path: "/authorization/roles",
              name: "roles",
              icon: /* @__PURE__ */ e.jsx(Ce, {}),
              permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
              children: [
                {
                  element: o(Je),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: o(Q),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: o(Q),
                  permissions: ["authorization:role:update"],
                  index: !0
                }
              ]
            },
            // User management
            {
              path: "/authorization/users",
              name: "users",
              icon: /* @__PURE__ */ e.jsx(N, {}),
              permissions: ["authorization:user:view", "authorization:user:list", "authorization:user:create", "authorization:user:update", "authorization:user:delete"],
              children: [
                {
                  element: o(Ye),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: o(q),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: o(Ge),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: o(q),
                  permissions: ["authorization:user:update"],
                  index: !0
                }
              ]
            },
            // Service account management
            {
              path: "/authorization/service-accounts",
              name: "serviceAccounts",
              icon: /* @__PURE__ */ e.jsx(N, {}),
              permissions: ["authorization:service_account:view"],
              children: [
                {
                  element: o(it),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(nt),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                }
              ]
            }
          ]
        },
        ...g,
        // System management menu
        {
          name: "system",
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: o(Xe, { transformItems: n })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(Ze),
                  index: !0
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: o(tt)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: o(T),
          index: !0
        }
      ]
    }
  ];
  return [...z, ...w];
}, Ct = {
  ai: oe,
  authorization: Y,
  base: G,
  system: X,
  oauth: Z
}, { Header: at, Content: ot, Footer: rt, Sider: lt } = D, { SubMenu: ct } = k, ht = ({
  element: n,
  routes: u,
  transformLangConfig: g,
  menuStyle: j = "dark",
  transformHeaderItems: z = (p) => p,
  renderLayout: w
}) => {
  const { t: p, i18n: b } = I(), { t: h } = I("common"), v = xe(), { hasPermission: F } = Me(), _ = fe(), { logout: A, user: r } = Ue(), { siteConfig: a } = Ee(), [m, s] = S([]), [L, O] = S(null), [y, ee] = S("Loading...");
  v.pathname !== "/profile" && (r && r.mfa_enforced && !r.mfa_enabled ? _("/profile#mfa") : r && r.status === "password_expired" && _("/profile#password"));
  const te = () => {
    A(), window.location.href = J("/login?redirect=" + encodeURIComponent(window.location.href));
  }, ie = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx($, { to: "/profile", children: h("profile") })
    },
    {
      key: "logout",
      label: h("logout"),
      onClick: te
    }
  ];
  C(() => {
    var i;
    if (a) {
      const l = a.navigation.filter((t) => t.path !== a.home_page), x = [...a.home_page ? [{
        name: "home",
        path: a.home_page
      }] : [], ...l];
      x.length > 1 ? s(x) : s([]), O(a.logo), (i = document.getElementById("site-icon")) == null || i.setAttribute("href", a.logo);
    }
  }, [a]), C(() => {
    b.language && ee((a == null ? void 0 : a.name_i18n[b.language]) || (a == null ? void 0 : a.name) || "");
  }, [a, b.language]);
  const P = () => {
    const i = je(u, v.pathname), l = [];
    if (i) {
      for (const [x, t] of i.entries())
        if (t.route.path === "/" && !t.route.name)
          l.push({
            href: t.route.path,
            title: h("home"),
            key: "home"
          });
        else if (t.route.name) {
          const d = i.slice(0, x + 1).map((f) => f.route.name).filter(Boolean).join(".");
          l.push({
            path: t.route.path,
            title: t.route.name ? p(`breadcrumbs.${d}`) : void 0,
            key: t.route.path
          });
        }
    }
    return l;
  }, ne = (i) => i.some((l) => F(l)), se = Ke.flatMapDeep(u, (i) => i.children).map((i) => i == null ? void 0 : i.name).filter((i) => i !== void 0), M = (i, l = []) => {
    const x = (t) => t && t.replace(/_/g, " ").split(" ").map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(" ");
    return i.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !ne(t.permissions))
        return null;
      const d = x(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const f = M(t.children, [...l, t.name]);
        return f.length == 0 && t.path ? /* @__PURE__ */ e.jsx(k.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx($, { to: t.path, children: p(`menu.${[...l, t.name].join(".")}`, { defaultValue: d }) }) }, t.path) : /* @__PURE__ */ e.jsx(ct, { icon: t.icon, title: p(`menu.${[...l, t.name, t.name].join(".")}`, { defaultValue: d }), children: f }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(k.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx($, { to: t.path, children: p(`menu.${[...l, t.name].join(".")}`, { defaultValue: d }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  C(() => {
    const i = P().filter((l) => l.path !== "/").map((l) => l.title).join(" - ");
    i ? document.title = `${y} | ${i}` : document.title = y;
  }, [P, v.pathname]);
  const ae = [
    /* @__PURE__ */ e.jsx(V, { hidden: m.length <= 1, menu: {
      items: m.map((i) => ({
        key: i.path,
        style: { paddingRight: "20px" },
        label: /* @__PURE__ */ e.jsx("a", { href: i.path, children: p(`menu.${i.name}`, { defaultValue: i.name }) })
      }))
    }, children: /* @__PURE__ */ e.jsx(Be, {}) }),
    ...a != null && a.enable_multi_org ? [/* @__PURE__ */ e.jsx(Le, {}, "org-switcher")] : [],
    /* @__PURE__ */ e.jsxs(V, { menu: { items: ie }, children: [
      r != null && r.avatar ? /* @__PURE__ */ e.jsx(K, { src: r.avatar }) : /* @__PURE__ */ e.jsx(K, { icon: /* @__PURE__ */ e.jsx(N, {}) }),
      /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: (r == null ? void 0 : r.full_name) || (r == null ? void 0 : r.username) })
    ] }),
    /* @__PURE__ */ e.jsx(Oe, { transformLangConfig: g })
  ];
  return (w ?? ((i, l, x, t, d) => {
    const [f, U] = S(!1);
    return /* @__PURE__ */ e.jsxs(D, { style: { minHeight: "100vh" }, children: [
      /* @__PURE__ */ e.jsxs(lt, { collapsible: !0, collapsed: f, onCollapse: U, theme: j, children: [
        /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: i ? /* @__PURE__ */ e.jsx("img", { src: i, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(ze, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(k, { theme: j, defaultOpenKeys: se, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [v.pathname], children: l })
      ] }),
      /* @__PURE__ */ e.jsxs(D, { className: "site-layout", children: [
        /* @__PURE__ */ e.jsxs(at, { className: "site-layout-background", style: { padding: 0, display: "flex", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ e.jsx(
            we,
            {
              type: "text",
              icon: f ? /* @__PURE__ */ e.jsx(De, {}) : /* @__PURE__ */ e.jsx(Ie, {}),
              onClick: () => U(!f),
              style: { fontSize: "16px", width: 64, height: 64 }
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { marginRight: "20px" }, children: x })
        ] }),
        /* @__PURE__ */ e.jsxs(ot, { style: { margin: "0 16px" }, children: [
          /* @__PURE__ */ e.jsx(be, { style: { margin: "16px 0" }, itemRender: (R) => {
            const E = R.href || R.path;
            return E ? /* @__PURE__ */ e.jsx($, { to: E, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
          }, items: t }),
          /* @__PURE__ */ e.jsx("div", { className: "site-layout-background", style: { padding: 24, minHeight: 360 }, children: d }),
          /* @__PURE__ */ e.jsx(Re, {})
        ] }),
        /* @__PURE__ */ e.jsxs(rt, { style: { textAlign: "center" }, children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          y
        ] })
      ] })
    ] });
  }))(L, M(u), z(ae), P(), n ?? /* @__PURE__ */ e.jsx(ge, {}));
}, mt = new ue({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), W = {
  "zh-CN": de,
  "en-US": B,
  "de-DE": me,
  "es-ES": he,
  "fr-FR": ce,
  "ar-AE": le,
  "sv-SE": re
};
function Nt({
  transformRouter: n = (h) => h,
  transformSettingTabs: u = (h) => h,
  transformLangConfig: g = (h) => h,
  extraPrivateRoutes: j = [],
  extraPublicRoutes: z = [],
  menuStyle: w = "dark",
  transformHeaderItems: p = (h) => h,
  renderLayout: b
}) {
  const { i18n: h } = I(), [v, F] = S(W[h.language] || B);
  C(() => {
    F(W[h.language] || B);
  }, [h.language]);
  const _ = (a) => a.map((m) => m.children === void 0 ? m : {
    ...m,
    children: _(m.children)
  }), A = n(_(st({
    transformSettingTabs: u,
    transformLangConfig: g,
    extraPrivateRoutes: j,
    extraPublicRoutes: z
  }))), r = (a, m) => a.flatMap((s) => s.is_private ? [s] : "children" in s && s.children ? s.children : [s]).map((s, L) => {
    const O = s.is_private ? /* @__PURE__ */ e.jsx($e, { element: /* @__PURE__ */ e.jsx(
      ht,
      {
        routes: A,
        element: s.element,
        transformLangConfig: g,
        menuStyle: w,
        transformHeaderItems: p,
        renderLayout: b
      }
    ) }) : s.element;
    if ("children" in s && s.children && s.children.length > 0)
      return /* @__PURE__ */ e.jsx(H, { path: s.path, element: O, children: r(s.children, s) }, s.path ?? s.name ?? L);
    const { path: y } = s;
    return /* @__PURE__ */ e.jsx(H, { path: y, index: s.index, element: O }, y ?? s.name ?? `${(m == null ? void 0 : m.path) ?? ""}.${L}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(pe, { client: mt, children: /* @__PURE__ */ e.jsx(
    _e,
    {
      locale: v,
      children: /* @__PURE__ */ e.jsx(He, { children: /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsx(ve, { basename: J(), children: /* @__PURE__ */ e.jsx(ye, { children: r(A) }) }) }) })
    }
  ) });
}
const Ft = {
  ...Y,
  ...G,
  ...Z,
  ...X
};
export {
  Nt as A,
  Ct as a,
  Ft as b,
  ht as c,
  o as w
};
