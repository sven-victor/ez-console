import { a as he } from "./ai.js";
import { a as X } from "./authorization.js";
import { b as Z, g as ee } from "./base.js";
import { a as F } from "./system.js";
import { o as te } from "./oauth.js";
import { j as e, d as de, e as me, f as ue, g as pe, h as xe, i as M, k as fe } from "./vendor.js";
import { QueryClient as ge, QueryClientProvider as je } from "react-query";
import { useLocation as ve, useNavigate as ye, Link as $, Outlet as ze, matchRoutes as we, BrowserRouter as be, Routes as _e, Route as T } from "react-router-dom";
import { Layout as B, Menu as C, Spin as Se, Button as Ae, Breadcrumb as Le, ConfigProvider as Oe } from "antd";
import { useTranslation as U } from "react-i18next";
import { lazy as l, Suspense as Re, useState as A, useEffect as I } from "react";
import { L as ke, H as q, O as $e, A as Q, a as Ce, b as Ie, c as Ne, d as Pe, P as De } from "./components.js";
import { DashboardOutlined as Fe, SolutionOutlined as Me, UserOutlined as N, SafetyOutlined as Be, FileSearchOutlined as Ue, SettingOutlined as Ee, SwapOutlined as He, MenuUnfoldOutlined as Ve, MenuFoldOutlined as Ke } from "@ant-design/icons";
import { c as Te, a as qe, u as Qe, b as We, A as Ye, S as Ge, e as Je } from "./contexts.js";
import Xe from "lodash";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Ze = l(() => import("./dashboard.js")), et = l(() => import("./login.js")), tt = l(() => import("./profile.js")), W = l(() => import("./not_found.js")), it = l(() => import("./forbidden.js")), nt = l(() => import("./users.js").then((a) => a.U)), at = l(() => import("./users.js").then((a) => a.a)), Y = l(() => import("./users.js").then((a) => a.b)), st = l(() => import("./roles.js").then((a) => a.R)), G = l(() => import("./roles.js").then((a) => a.a)), ot = l(() => import("./system-settings.js").then((a) => a.i)), rt = l(() => import("./system-settings.js").then((a) => a.O)), lt = l(() => import("./system-settings.js").then((a) => a.a)), ct = l(() => import("./audit.js")), ht = l(() => import("./service-accounts.js").then((a) => a.S)), dt = l(() => import("./service-accounts.js").then((a) => a.a));
function o(a, m) {
  return /* @__PURE__ */ e.jsx(Re, { fallback: /* @__PURE__ */ e.jsx(ke, {}), children: /* @__PURE__ */ e.jsx(a, { ...m }) });
}
const mt = ({ transformSettingTabs: a, transformLangConfig: m, extraPrivateRoutes: j = [], extraPublicRoutes: v = [] }) => {
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
          icon: /* @__PURE__ */ e.jsx(Fe, {}),
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
          icon: /* @__PURE__ */ e.jsx(N, {}),
          permissions: ["authorization:user:view", "authorization:user:create", "authorization:user:update", "authorization:user:delete", "authorization:service_account:view", "authorization:service_account:create", "authorization:service_account:update", "authorization:service_account:delete", "authorization:role:view"],
          children: [
            // Role management
            {
              path: "/authorization/roles",
              name: "roles",
              icon: /* @__PURE__ */ e.jsx(Me, {}),
              permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
              children: [
                {
                  element: o(st),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: o(G),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: o(G),
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
                  element: o(nt),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: o(Y),
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
                  element: o(Y),
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
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: o(ot, { transformItems: a })
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
              icon: /* @__PURE__ */ e.jsx(Ue, {}),
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
}, Ut = {
  ai: he,
  authorization: X,
  base: Z,
  system: F,
  oauth: te
}, { Header: ut, Content: pt, Footer: xt, Sider: ft } = B, { SubMenu: gt } = C, jt = ({
  element: a,
  routes: m,
  transformLangConfig: j,
  menuStyle: v = "dark",
  transformHeaderItems: w = (x) => x,
  renderLayout: b
}) => {
  const { layout: x, visible: L, loaded: c } = Te(), { t: f, i18n: _ } = U(), { t: y } = U("common"), g = ve(), { hasPermission: O } = qe(), z = ye(), { logout: h, user: i } = Qe(), { siteConfig: s, clearCurrentOrgId: R } = We(), [S, E] = A([]), [ie, ne] = A(null), [P, ae] = A("Loading...");
  g.pathname !== "/profile" && (i && i.mfa_enforced && !i.mfa_enabled ? z("/profile#mfa") : i && i.status === "password_expired" && z("/profile#password"));
  const se = () => {
    h(), R(), window.location.href = ee("/login?redirect=" + encodeURIComponent(window.location.href));
  }, oe = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx($, { to: "/profile", children: y("profile") })
    },
    {
      key: "logout",
      label: y("logout"),
      onClick: se
    }
  ];
  I(() => {
    var n;
    if (s) {
      const r = s.navigation.filter((t) => t.path !== s.home_page), u = [...s.home_page ? [{
        name: "home",
        path: s.home_page
      }] : [], ...r];
      u.length > 1 ? E(u) : E([]), ne(s.logo), (n = document.getElementById("site-icon")) == null || n.setAttribute("href", s.logo);
    }
  }, [s]), I(() => {
    _.language && ae((s == null ? void 0 : s.name_i18n[_.language]) || (s == null ? void 0 : s.name) || "");
  }, [s, _.language]);
  const D = () => {
    const n = we(m, g.pathname), r = [];
    if (n) {
      for (const [u, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          r.push({
            href: t.route.path,
            title: y("home"),
            key: "home"
          });
        else if (t.route.name) {
          const d = n.slice(0, u + 1).map((p) => p.route.name).filter(Boolean).join(".");
          r.push({
            path: t.route.path,
            title: t.route.name ? f(`breadcrumbs.${d}`) : void 0,
            key: t.route.path
          });
        }
    }
    return r;
  }, re = (n) => n.some((r) => O(r)), le = Xe.flatMapDeep(m, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), H = (n, r = []) => {
    const u = (t) => t && t.replace(/_/g, " ").split(" ").map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !re(t.permissions))
        return null;
      const d = u(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const p = H(t.children, [...r, t.name]);
        return p.length == 0 && t.path ? /* @__PURE__ */ e.jsx(C.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx($, { to: t.path, children: f(`menu.${[...r, t.name].join(".")}`, { defaultValue: d }) }) }, t.path) : /* @__PURE__ */ e.jsx(gt, { icon: t.icon, title: f(`menu.${[...r, t.name, t.name].join(".")}`, { defaultValue: d }), children: p }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(C.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx($, { to: t.path, children: f(`menu.${[...r, t.name].join(".")}`, { defaultValue: d }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  I(() => {
    const n = D().filter((r) => r.path !== "/").map((r) => r.title).join(" - ");
    n ? document.title = `${P} | ${n}` : document.title = P;
  }, [D, g.pathname]);
  const ce = [
    /* @__PURE__ */ e.jsx(q, { hidden: S.length <= 1, menu: {
      items: S.map((n) => ({
        key: n.path,
        style: { paddingRight: "20px" },
        label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: f(`menu.${n.name}`, { defaultValue: n.name }) })
      }))
    }, children: /* @__PURE__ */ e.jsx(He, {}) }),
    ...s != null && s.enable_multi_org ? [/* @__PURE__ */ e.jsx($e, {}, "org-switcher")] : [],
    /* @__PURE__ */ e.jsxs(q, { menu: { items: oe }, children: [
      i != null && i.avatar ? /* @__PURE__ */ e.jsx(Q, { src: i.avatar }) : /* @__PURE__ */ e.jsx(Q, { icon: /* @__PURE__ */ e.jsx(N, {}) }),
      /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: (i == null ? void 0 : i.full_name) || (i == null ? void 0 : i.username) })
    ] }),
    /* @__PURE__ */ e.jsx(Ce, { transformLangConfig: j })
  ];
  return (b ?? ((n, r, u, t, d) => {
    const [p, V] = A(!1);
    return /* @__PURE__ */ e.jsxs(B, { style: { minHeight: "100vh", display: "flex", flexDirection: "row" }, children: [
      /* @__PURE__ */ e.jsxs(ft, { collapsible: !0, collapsed: p, onCollapse: V, theme: v, children: [
        /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: n ? /* @__PURE__ */ e.jsx("img", { src: n, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(Se, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(C, { theme: v, defaultOpenKeys: le, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [g.pathname], children: r })
      ] }),
      /* @__PURE__ */ e.jsxs(B, { className: "site-layout main-layout", style: { flex: 1, minWidth: 0 }, children: [
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
          /* @__PURE__ */ e.jsx(Le, { style: { margin: "16px 0" }, itemRender: (k) => {
            const K = k.href || k.path;
            return K ? /* @__PURE__ */ e.jsx($, { to: K, children: k.title }) : /* @__PURE__ */ e.jsx("span", { children: k.title });
          }, items: t }),
          /* @__PURE__ */ e.jsx("div", { className: "site-layout-background", style: { padding: 24, minHeight: "calc(100vh - 190px)" }, children: d }),
          /* @__PURE__ */ e.jsx(Ie, {}),
          x === "classic" && (L || c) && /* @__PURE__ */ e.jsx(Ne, {})
        ] }),
        /* @__PURE__ */ e.jsxs(xt, { style: { textAlign: "center" }, children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          P
        ] })
      ] }),
      (x === "sidebar" || x === "float-sidebar") && (L || c) && /* @__PURE__ */ e.jsx(Pe, {})
    ] });
  }))(ie, H(m), w(ce), D(), a ?? /* @__PURE__ */ e.jsx(ze, {}));
}, vt = new ge({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), J = {
  "zh-CN": fe,
  "en-US": M,
  "de-DE": xe,
  "es-ES": pe,
  "fr-FR": ue,
  "ar-AE": me,
  "sv-SE": de
};
function Et({
  transformRouter: a = (c) => c,
  transformSettingTabs: m = (c) => c,
  transformLangConfig: j = (c) => c,
  extraPrivateRoutes: v = [],
  extraPublicRoutes: w = [],
  menuStyle: b = "dark",
  transformHeaderItems: x = (c) => c,
  renderLayout: L
}) {
  const { i18n: c } = U(), [f, _] = A(J[c.language] || M);
  I(() => {
    _(J[c.language] || M);
  }, [c.language]);
  const y = (z) => z.map((h) => h.children === void 0 ? h : {
    ...h,
    children: y(h.children)
  }), g = a(y(mt({
    transformSettingTabs: m,
    transformLangConfig: j,
    extraPrivateRoutes: v,
    extraPublicRoutes: w
  }))), O = (z, h) => z.flatMap((i) => i.is_private ? [i] : "children" in i && i.children ? i.children : [i]).map((i, s) => {
    const R = i.is_private ? /* @__PURE__ */ e.jsx(De, { element: /* @__PURE__ */ e.jsx(
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
      return /* @__PURE__ */ e.jsx(T, { path: i.path, element: R, children: O(i.children, i) }, i.path ?? i.name ?? s);
    const { path: S } = i;
    return /* @__PURE__ */ e.jsx(T, { path: S, index: i.index, element: R }, S ?? i.name ?? `${(h == null ? void 0 : h.path) ?? ""}.${s}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(je, { client: vt, children: /* @__PURE__ */ e.jsx(
    Oe,
    {
      locale: f,
      children: /* @__PURE__ */ e.jsx(Ye, { children: /* @__PURE__ */ e.jsx(Ge, { children: /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(be, { basename: ee(), children: /* @__PURE__ */ e.jsx(_e, { children: O(g) }) }) }) }) })
    }
  ) });
}
const Ht = {
  ...X,
  ...Z,
  ...te,
  ...F,
  ...F
};
export {
  Et as A,
  Ut as a,
  Ht as b,
  jt as c,
  o as w
};
