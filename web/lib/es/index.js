import { j as e, d as oe, b as re, c as le, e as ce, f as he, g as M, h as me } from "./vendor.js";
import { QueryClient as de, QueryClientProvider as ue } from "react-query";
import { useLocation as pe, useNavigate as fe, Link as O, Outlet as xe, matchRoutes as ge, BrowserRouter as je, Routes as ye, Route as H } from "react-router-dom";
import { Layout as P, Menu as N, Spin as ve, Button as ze, Breadcrumb as be, ConfigProvider as we } from "antd";
import { useTranslation as U } from "react-i18next";
import { lazy as c, Suspense as _e, useState as y, useEffect as B } from "react";
import { L as Se, H as V, A as K, a as Ae, b as Le, P as Re } from "./components.js";
import { DashboardOutlined as $e, SolutionOutlined as ke, UserOutlined as C, SafetyOutlined as Oe, FileSearchOutlined as Ne, SettingOutlined as Be, SwapOutlined as Ce, MenuUnfoldOutlined as Fe, MenuFoldOutlined as Ie } from "@ant-design/icons";
import { a as Me, u as Pe, A as Ue } from "./contexts.js";
import { a as De } from "./ai.js";
import { a as W } from "./authorization.js";
import { b as Y, g as G } from "./base.js";
import { s as J } from "./system.js";
import { o as X } from "./oauth.js";
import { t as Ee } from "./toolsets.js";
import He from "lodash";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Ve = c(() => import("./dashboard.js")), Ke = c(() => import("./login.js")), Te = c(() => import("./profile.js")), T = c(() => import("./not_found.js")), qe = c(() => import("./forbidden.js")), Qe = c(() => import("./users.js").then((a) => a.U)), We = c(() => import("./users.js").then((a) => a.a)), q = c(() => import("./users.js").then((a) => a.b)), Ye = c(() => import("./roles.js")), Ge = c(() => import("./system-settings.js").then((a) => a.i)), Je = c(() => import("./system-settings.js").then((a) => a.O)), Xe = c(() => import("./audit.js")), Ze = c(() => import("./service-accounts.js").then((a) => a.S)), et = c(() => import("./service-accounts.js").then((a) => a.a));
function r(a, m) {
  return /* @__PURE__ */ e.jsx(_e, { fallback: /* @__PURE__ */ e.jsx(Se, {}), children: /* @__PURE__ */ e.jsx(a, { ...m }) });
}
const tt = ({ transformSettingTabs: a, transformLangConfig: m, extraPrivateRoutes: g = [], extraPublicRoutes: j = [] }) => {
  const v = [
    {
      path: "/login",
      element: r(Ke, { transformLangConfig: m }),
      index: !0
    },
    {
      path: "/404",
      element: r(T),
      index: !0
    },
    {
      path: "/403",
      element: r(qe),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: r(Je),
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
          element: r(Ve),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx($e, {}),
          index: !0
        },
        {
          path: "/profile",
          element: r(Te),
          name: void 0,
          index: !0
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(C, {}),
          permissions: ["authorization:user:view", "authorization:user:create", "authorization:user:update", "authorization:user:delete", "authorization:service_account:view", "authorization:service_account:create", "authorization:service_account:update", "authorization:service_account:delete"],
          children: [
            // Role management
            {
              path: "/authorization/roles",
              name: "roles",
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
              children: [
                {
                  element: r(Ye),
                  permissions: ["authorization:role:view"],
                  index: !0
                }
              ]
            },
            // User management
            {
              path: "/authorization/users",
              name: "users",
              icon: /* @__PURE__ */ e.jsx(C, {}),
              permissions: ["authorization:user:view", "authorization:user:list", "authorization:user:create", "authorization:user:update", "authorization:user:delete"],
              children: [
                {
                  element: r(Qe),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: r(q),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: r(We),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: r(q),
                  permissions: ["authorization:user:update"],
                  index: !0
                }
              ]
            },
            // Service account management
            {
              path: "/authorization/service-accounts",
              name: "serviceAccounts",
              icon: /* @__PURE__ */ e.jsx(C, {}),
              permissions: ["authorization:service_account:view"],
              children: [
                {
                  element: r(Ze),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: r(et),
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
          icon: /* @__PURE__ */ e.jsx(Be, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              index: !0,
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update"],
              element: r(Ge, { transformItems: a })
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: r(Xe)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: r(T),
          index: !0
        }
      ]
    }
  ];
  return [...v, ...z];
}, nt = {
  ai: De,
  authorization: W,
  base: Y,
  system: J,
  oauth: X,
  toolsets: Ee
}, { Header: it, Content: st, Footer: at, Sider: ot } = P, { SubMenu: rt } = N, lt = ({
  element: a,
  routes: m,
  transformLangConfig: g,
  menuStyle: j = "dark",
  transformHeaderItems: v = (d) => d,
  renderLayout: z
}) => {
  const { t: d, i18n: b } = U(), { t: l } = U("common"), [w, L] = y(!1), f = pe(), { hasPermission: R } = Me(), _ = fe(), { logout: S, user: i } = Pe(), [s, A] = y([]), [$, k] = y(null), [F, Z] = y("Loading..."), [x, ee] = y(null);
  f.pathname !== "/profile" && (i && i.mfa_enforced && !i.mfa_enabled ? _("/profile#mfa") : i && i.status === "password_expired" && _("/profile#password"));
  const te = () => {
    S(), window.location.href = G("/login?redirect=" + encodeURIComponent(window.location.href));
  }, ne = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(O, { to: "/profile", children: l("profile") })
    },
    {
      key: "logout",
      label: l("logout"),
      onClick: te
    }
  ];
  B(() => {
    nt.system.getSiteConfig().then((n) => {
      var t;
      const o = n.navigation.filter((h) => h.path !== n.home_page), p = [...n.home_page ? [{
        name: "home",
        path: n.home_page
      }] : [], ...o];
      p.length > 1 ? A(p) : A([]), k(n.logo), ee(n), (t = document.getElementById("site-icon")) == null || t.setAttribute("href", n.logo);
    });
  }, []), B(() => {
    b.language && Z((x == null ? void 0 : x.name_i18n[b.language]) || (x == null ? void 0 : x.name) || "");
  }, [x, b.language]);
  const I = () => {
    const n = ge(m, f.pathname), o = [];
    if (n) {
      for (const [p, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          o.push({
            href: t.route.path,
            title: l("home"),
            key: "home"
          });
        else if (t.route.name) {
          const h = n.slice(0, p + 1).map((u) => u.route.name).filter(Boolean).join(".");
          o.push({
            path: t.route.path,
            title: t.route.name ? d(`breadcrumbs.${h}`) : void 0,
            key: t.route.path
          });
        }
    }
    return o;
  }, ie = (n) => n.some((o) => R(o)), se = He.flatMapDeep(m, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), D = (n, o = []) => {
    const p = (t) => t && t.replace(/_/g, " ").split(" ").map((h) => h.charAt(0).toUpperCase() + h.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !ie(t.permissions))
        return null;
      const h = p(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const u = D(t.children, [...o, t.name]);
        return u.length == 0 && t.path ? /* @__PURE__ */ e.jsx(N.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(O, { to: t.path, children: d(`menu.${[...o, t.name].join(".")}`, { defaultValue: h }) }) }, t.path) : /* @__PURE__ */ e.jsx(rt, { icon: t.icon, title: d(`menu.${[...o, t.name, t.name].join(".")}`, { defaultValue: h }), children: u }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(N.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(O, { to: t.path, children: d(`menu.${[...o, t.name].join(".")}`, { defaultValue: h }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  B(() => {
    const n = I().filter((o) => o.path !== "/").map((o) => o.title).join(" - ");
    n ? document.title = `${F} | ${n}` : document.title = F;
  }, [I, f.pathname]);
  const ae = [
    /* @__PURE__ */ e.jsx(V, { hidden: s.length <= 1, menu: {
      items: s.map((n) => ({
        key: n.path,
        style: { paddingRight: "20px" },
        label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: d(`menu.${n.name}`, { defaultValue: n.name }) })
      }))
    }, children: /* @__PURE__ */ e.jsx(Ce, {}) }),
    /* @__PURE__ */ e.jsxs(V, { menu: { items: ne }, children: [
      i != null && i.avatar ? /* @__PURE__ */ e.jsx(K, { src: i.avatar }) : /* @__PURE__ */ e.jsx(K, { icon: /* @__PURE__ */ e.jsx(C, {}) }),
      /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: (i == null ? void 0 : i.full_name) || (i == null ? void 0 : i.username) })
    ] }),
    /* @__PURE__ */ e.jsx(Ae, { transformLangConfig: g })
  ];
  return (z ?? ((n, o, p, t, h) => /* @__PURE__ */ e.jsxs(P, { style: { minHeight: "100vh" }, children: [
    /* @__PURE__ */ e.jsxs(ot, { collapsible: !0, collapsed: w, onCollapse: L, theme: j, children: [
      /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: n ? /* @__PURE__ */ e.jsx("img", { src: n, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(ve, { size: "large", tip: "Loading..." }) }) }),
      /* @__PURE__ */ e.jsx(N, { theme: j, defaultOpenKeys: se, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [f.pathname], children: o })
    ] }),
    /* @__PURE__ */ e.jsxs(P, { className: "site-layout", children: [
      /* @__PURE__ */ e.jsxs(it, { className: "site-layout-background", style: { padding: 0, display: "flex", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ e.jsx(
          ze,
          {
            type: "text",
            icon: w ? /* @__PURE__ */ e.jsx(Fe, {}) : /* @__PURE__ */ e.jsx(Ie, {}),
            onClick: () => L(!w),
            style: { fontSize: "16px", width: 64, height: 64 }
          }
        ),
        /* @__PURE__ */ e.jsx("div", { style: { marginRight: "20px" }, children: p })
      ] }),
      /* @__PURE__ */ e.jsxs(st, { style: { margin: "0 16px" }, children: [
        /* @__PURE__ */ e.jsx(be, { style: { margin: "16px 0" }, itemRender: (u) => {
          const E = u.href || u.path;
          return E ? /* @__PURE__ */ e.jsx(O, { to: E, children: u.title }) : /* @__PURE__ */ e.jsx("span", { children: u.title });
        }, items: t }),
        /* @__PURE__ */ e.jsx("div", { className: "site-layout-background", style: { padding: 24, minHeight: 360 }, children: h }),
        /* @__PURE__ */ e.jsx(Le, {})
      ] }),
      /* @__PURE__ */ e.jsxs(at, { style: { textAlign: "center" }, children: [
        " ©",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        F
      ] })
    ] })
  ] })))($, D(m), v(ae), I(), a ?? /* @__PURE__ */ e.jsx(xe, {}));
}, ct = new de({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), Q = {
  "zh-CN": me,
  "en-US": M,
  "de-DE": he,
  "es-ES": ce,
  "fr-FR": le,
  "ar-AE": re,
  "sv-SE": oe
};
function Ot({
  transformRouter: a = (l) => l,
  transformSettingTabs: m = (l) => l,
  transformLangConfig: g = (l) => l,
  extraPrivateRoutes: j = [],
  extraPublicRoutes: v = [],
  menuStyle: z = "dark",
  transformHeaderItems: d = (l) => l,
  renderLayout: b
}) {
  const { i18n: l } = U(), [w, L] = y(Q[l.language] || M);
  B(() => {
    L(Q[l.language] || M);
  }, [l.language]);
  const f = (S) => S.map((i) => i.children === void 0 ? i : {
    ...i,
    children: f(i.children)
  }), R = a(f(tt({
    transformSettingTabs: m,
    transformLangConfig: g,
    extraPrivateRoutes: j,
    extraPublicRoutes: v
  }))), _ = (S, i) => S.flatMap((s) => s.is_private ? [s] : "children" in s && s.children ? s.children : [s]).map((s, A) => {
    const $ = s.is_private ? /* @__PURE__ */ e.jsx(Re, { element: /* @__PURE__ */ e.jsx(
      lt,
      {
        routes: R,
        element: s.element,
        transformLangConfig: g,
        menuStyle: z,
        transformHeaderItems: d,
        renderLayout: b
      }
    ) }) : s.element;
    if ("children" in s && s.children && s.children.length > 0)
      return /* @__PURE__ */ e.jsx(H, { path: s.path, element: $, children: _(s.children, s) }, s.path ?? s.name ?? A);
    const { path: k } = s;
    return /* @__PURE__ */ e.jsx(H, { path: k, index: s.index, element: $ }, k ?? s.name ?? `${(i == null ? void 0 : i.path) ?? ""}.${A}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(ue, { client: ct, children: /* @__PURE__ */ e.jsx(
    we,
    {
      locale: w,
      children: /* @__PURE__ */ e.jsx(Ue, { children: /* @__PURE__ */ e.jsx(je, { basename: G(), children: /* @__PURE__ */ e.jsx(ye, { children: _(R) }) }) })
    }
  ) });
}
const Nt = {
  ...W,
  ...Y,
  ...X,
  ...J
};
export {
  Ot as A,
  nt as a,
  Nt as b,
  lt as c,
  r as w
};
