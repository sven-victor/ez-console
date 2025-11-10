import { a as re } from "./ai.js";
import { a as G } from "./authorization.js";
import { b as J, g as X } from "./base.js";
import { s as Z } from "./system.js";
import { o as ee } from "./oauth.js";
import { j as e, d as le, b as ce, c as he, e as me, f as de, g as B, h as ue } from "./vendor.js";
import { QueryClient as pe, QueryClientProvider as xe } from "react-query";
import { useLocation as fe, useNavigate as ge, Link as $, Outlet as je, matchRoutes as ve, BrowserRouter as ye, Routes as ze, Route as V } from "react-router-dom";
import { Layout as D, Menu as k, Spin as we, Button as be, Breadcrumb as _e, ConfigProvider as Se } from "antd";
import { useTranslation as M } from "react-i18next";
import { lazy as c, Suspense as Ae, useState as S, useEffect as C } from "react";
import { L as Le, H as K, O as Oe, A as T, a as Re, b as $e, P as ke } from "./components.js";
import { DashboardOutlined as Ce, SolutionOutlined as Ne, UserOutlined as N, SafetyOutlined as Fe, FileSearchOutlined as Ie, SettingOutlined as Pe, SwapOutlined as Be, MenuUnfoldOutlined as De, MenuFoldOutlined as Me } from "@ant-design/icons";
import { a as Ue, u as Ee, b as He, A as Ve, S as Ke } from "./contexts.js";
import Te from "lodash";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const qe = c(() => import("./dashboard.js")), Qe = c(() => import("./login.js")), We = c(() => import("./profile.js")), q = c(() => import("./not_found.js")), Ye = c(() => import("./forbidden.js")), Ge = c(() => import("./users.js").then((n) => n.U)), Je = c(() => import("./users.js").then((n) => n.a)), Q = c(() => import("./users.js").then((n) => n.b)), Xe = c(() => import("./roles.js").then((n) => n.R)), W = c(() => import("./roles.js").then((n) => n.a)), Ze = c(() => import("./system-settings.js").then((n) => n.i)), et = c(() => import("./system-settings.js").then((n) => n.O)), tt = c(() => import("./system-settings.js").then((n) => n.a)), it = c(() => import("./audit.js")), nt = c(() => import("./service-accounts.js").then((n) => n.S)), st = c(() => import("./service-accounts.js").then((n) => n.a));
function o(n, u) {
  return /* @__PURE__ */ e.jsx(Ae, { fallback: /* @__PURE__ */ e.jsx(Le, {}), children: /* @__PURE__ */ e.jsx(n, { ...u }) });
}
const at = ({ transformSettingTabs: n, transformLangConfig: u, extraPrivateRoutes: g = [], extraPublicRoutes: j = [] }) => {
  const y = [
    {
      path: "/login",
      element: o(Qe, { transformLangConfig: u }),
      index: !0
    },
    {
      path: "/404",
      element: o(q),
      index: !0
    },
    {
      path: "/403",
      element: o(Ye),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o(tt),
      index: !0
    },
    ...j
  ], z = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: o(qe),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(Ce, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(We),
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
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
              children: [
                {
                  element: o(Xe),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: o(W),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: o(W),
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
                  element: o(Ge),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: o(Q),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: o(Je),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: o(Q),
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
                  element: o(nt),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(st),
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
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: o(Ze, { transformItems: n })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(et),
                  index: !0
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: o(it)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: o(q),
          index: !0
        }
      ]
    }
  ];
  return [...y, ...z];
}, Nt = {
  ai: re,
  authorization: G,
  base: J,
  system: Z,
  oauth: ee
}, { Header: ot, Content: rt, Footer: lt, Sider: ct } = D, { SubMenu: ht } = k, mt = ({
  element: n,
  routes: u,
  transformLangConfig: g,
  menuStyle: j = "dark",
  transformHeaderItems: y = (p) => p,
  renderLayout: z
}) => {
  const { t: p, i18n: w } = M(), { t: h } = M("common"), v = fe(), { hasPermission: F } = Ue(), b = ge(), { logout: A, user: r } = Ee(), { siteConfig: a, clearCurrentOrgId: m } = He(), [s, _] = S([]), [L, O] = S(null), [I, te] = S("Loading...");
  v.pathname !== "/profile" && (r && r.mfa_enforced && !r.mfa_enabled ? b("/profile#mfa") : r && r.status === "password_expired" && b("/profile#password"));
  const ie = () => {
    A(), m(), window.location.href = X("/login?redirect=" + encodeURIComponent(window.location.href));
  }, ne = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx($, { to: "/profile", children: h("profile") })
    },
    {
      key: "logout",
      label: h("logout"),
      onClick: ie
    }
  ];
  C(() => {
    var i;
    if (a) {
      const l = a.navigation.filter((t) => t.path !== a.home_page), x = [...a.home_page ? [{
        name: "home",
        path: a.home_page
      }] : [], ...l];
      x.length > 1 ? _(x) : _([]), O(a.logo), (i = document.getElementById("site-icon")) == null || i.setAttribute("href", a.logo);
    }
  }, [a]), C(() => {
    w.language && te((a == null ? void 0 : a.name_i18n[w.language]) || (a == null ? void 0 : a.name) || "");
  }, [a, w.language]);
  const P = () => {
    const i = ve(u, v.pathname), l = [];
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
  }, se = (i) => i.some((l) => F(l)), ae = Te.flatMapDeep(u, (i) => i.children).map((i) => i == null ? void 0 : i.name).filter((i) => i !== void 0), U = (i, l = []) => {
    const x = (t) => t && t.replace(/_/g, " ").split(" ").map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(" ");
    return i.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !se(t.permissions))
        return null;
      const d = x(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const f = U(t.children, [...l, t.name]);
        return f.length == 0 && t.path ? /* @__PURE__ */ e.jsx(k.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx($, { to: t.path, children: p(`menu.${[...l, t.name].join(".")}`, { defaultValue: d }) }) }, t.path) : /* @__PURE__ */ e.jsx(ht, { icon: t.icon, title: p(`menu.${[...l, t.name, t.name].join(".")}`, { defaultValue: d }), children: f }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(k.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx($, { to: t.path, children: p(`menu.${[...l, t.name].join(".")}`, { defaultValue: d }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  C(() => {
    const i = P().filter((l) => l.path !== "/").map((l) => l.title).join(" - ");
    i ? document.title = `${I} | ${i}` : document.title = I;
  }, [P, v.pathname]);
  const oe = [
    /* @__PURE__ */ e.jsx(K, { hidden: s.length <= 1, menu: {
      items: s.map((i) => ({
        key: i.path,
        style: { paddingRight: "20px" },
        label: /* @__PURE__ */ e.jsx("a", { href: i.path, children: p(`menu.${i.name}`, { defaultValue: i.name }) })
      }))
    }, children: /* @__PURE__ */ e.jsx(Be, {}) }),
    ...a != null && a.enable_multi_org ? [/* @__PURE__ */ e.jsx(Oe, {}, "org-switcher")] : [],
    /* @__PURE__ */ e.jsxs(K, { menu: { items: ne }, children: [
      r != null && r.avatar ? /* @__PURE__ */ e.jsx(T, { src: r.avatar }) : /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx(N, {}) }),
      /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: (r == null ? void 0 : r.full_name) || (r == null ? void 0 : r.username) })
    ] }),
    /* @__PURE__ */ e.jsx(Re, { transformLangConfig: g })
  ];
  return (z ?? ((i, l, x, t, d) => {
    const [f, E] = S(!1);
    return /* @__PURE__ */ e.jsxs(D, { style: { minHeight: "100vh" }, children: [
      /* @__PURE__ */ e.jsxs(ct, { collapsible: !0, collapsed: f, onCollapse: E, theme: j, children: [
        /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: i ? /* @__PURE__ */ e.jsx("img", { src: i, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(we, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx(k, { theme: j, defaultOpenKeys: ae, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [v.pathname], children: l })
      ] }),
      /* @__PURE__ */ e.jsxs(D, { className: "site-layout", children: [
        /* @__PURE__ */ e.jsxs(ot, { className: "site-layout-background", style: { padding: 0, display: "flex", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ e.jsx(
            be,
            {
              type: "text",
              icon: f ? /* @__PURE__ */ e.jsx(De, {}) : /* @__PURE__ */ e.jsx(Me, {}),
              onClick: () => E(!f),
              style: { fontSize: "16px", width: 64, height: 64 }
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { marginRight: "20px" }, children: x })
        ] }),
        /* @__PURE__ */ e.jsxs(rt, { style: { margin: "0 16px" }, children: [
          /* @__PURE__ */ e.jsx(_e, { style: { margin: "16px 0" }, itemRender: (R) => {
            const H = R.href || R.path;
            return H ? /* @__PURE__ */ e.jsx($, { to: H, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
          }, items: t }),
          /* @__PURE__ */ e.jsx("div", { className: "site-layout-background", style: { padding: 24, minHeight: 360 }, children: d }),
          /* @__PURE__ */ e.jsx($e, {})
        ] }),
        /* @__PURE__ */ e.jsxs(lt, { style: { textAlign: "center" }, children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          I
        ] })
      ] })
    ] });
  }))(L, U(u), y(oe), P(), n ?? /* @__PURE__ */ e.jsx(je, {}));
}, dt = new pe({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), Y = {
  "zh-CN": ue,
  "en-US": B,
  "de-DE": de,
  "es-ES": me,
  "fr-FR": he,
  "ar-AE": ce,
  "sv-SE": le
};
function Ft({
  transformRouter: n = (h) => h,
  transformSettingTabs: u = (h) => h,
  transformLangConfig: g = (h) => h,
  extraPrivateRoutes: j = [],
  extraPublicRoutes: y = [],
  menuStyle: z = "dark",
  transformHeaderItems: p = (h) => h,
  renderLayout: w
}) {
  const { i18n: h } = M(), [v, F] = S(Y[h.language] || B);
  C(() => {
    F(Y[h.language] || B);
  }, [h.language]);
  const b = (a) => a.map((m) => m.children === void 0 ? m : {
    ...m,
    children: b(m.children)
  }), A = n(b(at({
    transformSettingTabs: u,
    transformLangConfig: g,
    extraPrivateRoutes: j,
    extraPublicRoutes: y
  }))), r = (a, m) => a.flatMap((s) => s.is_private ? [s] : "children" in s && s.children ? s.children : [s]).map((s, _) => {
    const L = s.is_private ? /* @__PURE__ */ e.jsx(ke, { element: /* @__PURE__ */ e.jsx(
      mt,
      {
        routes: A,
        element: s.element,
        transformLangConfig: g,
        menuStyle: z,
        transformHeaderItems: p,
        renderLayout: w
      }
    ) }) : s.element;
    if ("children" in s && s.children && s.children.length > 0)
      return /* @__PURE__ */ e.jsx(V, { path: s.path, element: L, children: r(s.children, s) }, s.path ?? s.name ?? _);
    const { path: O } = s;
    return /* @__PURE__ */ e.jsx(V, { path: O, index: s.index, element: L }, O ?? s.name ?? `${(m == null ? void 0 : m.path) ?? ""}.${_}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(xe, { client: dt, children: /* @__PURE__ */ e.jsx(
    Se,
    {
      locale: v,
      children: /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsx(Ke, { children: /* @__PURE__ */ e.jsx(ye, { basename: X(), children: /* @__PURE__ */ e.jsx(ze, { children: r(A) }) }) }) })
    }
  ) });
}
const It = {
  ...G,
  ...J,
  ...ee,
  ...Z
};
export {
  Ft as A,
  Nt as a,
  It as b,
  mt as c,
  o as w
};
