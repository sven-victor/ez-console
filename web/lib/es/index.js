import { j as e, d as ne, a as ie, b as se, c as ae, e as oe, f as M, g as re } from "./vendor.js";
import { QueryClient as le, QueryClientProvider as ce } from "react-query";
import { useLocation as he, useNavigate as me, Link as k, Outlet as de, matchRoutes as ue, BrowserRouter as pe, Routes as xe, Route as D } from "react-router-dom";
import { Layout as P, Menu as O, Spin as fe, Button as ge, Breadcrumb as je, ConfigProvider as ve } from "antd";
import { useTranslation as B } from "react-i18next";
import { lazy as l, Suspense as ye, useState as v, useEffect as R } from "react";
import { L as ze, H as I, A as E, a as we, P as be } from "./components.js";
import { DashboardOutlined as _e, SolutionOutlined as Se, UserOutlined as N, SafetyOutlined as Ae, FileSearchOutlined as Le, SettingOutlined as $e, MenuUnfoldOutlined as ke, MenuFoldOutlined as Oe, SwapOutlined as Re } from "@ant-design/icons";
import { a as Ne, u as Ue, A as Fe } from "./contexts.js";
import { a as T } from "./authorization.js";
import { b as q, g as Q } from "./base.js";
import { s as W } from "./system.js";
import { o as Y } from "./oauth.js";
import Me from "lodash";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Pe = l(() => import("./dashboard.js")), Be = l(() => import("./login.js")), Ce = l(() => import("./profile.js")), H = l(() => import("./not_found.js")), De = l(() => import("./forbidden.js")), Ie = l(() => import("./users.js").then((a) => a.U)), Ee = l(() => import("./users.js").then((a) => a.a)), V = l(() => import("./users.js").then((a) => a.b)), He = l(() => import("./roles.js")), Ve = l(() => import("./system-settings.js").then((a) => a.i)), Ke = l(() => import("./system-settings.js").then((a) => a.O)), Te = l(() => import("./audit.js")), qe = l(() => import("./service-accounts.js").then((a) => a.S)), Qe = l(() => import("./service-accounts.js").then((a) => a.a));
function r(a, m) {
  return /* @__PURE__ */ e.jsx(ye, { fallback: /* @__PURE__ */ e.jsx(ze, {}), children: /* @__PURE__ */ e.jsx(a, { ...m }) });
}
const We = ({ transformSettingTabs: a, transformLangConfig: m, extraPrivateRoutes: f = [], extraPublicRoutes: g = [] }) => {
  const d = [
    {
      path: "/login",
      element: r(Be, { transformLangConfig: m }),
      index: !0
    },
    {
      path: "/404",
      element: r(H),
      index: !0
    },
    {
      path: "/403",
      element: r(De),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: r(Ke),
      index: !0
    },
    ...g
  ], u = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: r(Pe),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(_e, {}),
          index: !0
        },
        {
          path: "/profile",
          element: r(Ce),
          name: void 0,
          index: !0
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(N, {}),
          permissions: ["authorization:user:view", "authorization:user:create", "authorization:user:update", "authorization:user:delete", "authorization:service_account:view", "authorization:service_account:create", "authorization:service_account:update", "authorization:service_account:delete"],
          children: [
            // Role management
            {
              path: "/authorization/roles",
              name: "roles",
              icon: /* @__PURE__ */ e.jsx(Se, {}),
              permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
              children: [
                {
                  element: r(He),
                  permissions: ["authorization:role:view"],
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
                  element: r(Ie),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: r(V),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: r(Ee),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: r(V),
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
                  element: r(qe),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: r(Qe),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                }
              ]
            }
          ]
        },
        ...f,
        // System management menu
        {
          name: "system",
          icon: /* @__PURE__ */ e.jsx($e, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
              index: !0,
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update"],
              element: r(Ve, { transformItems: a })
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(Le, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: r(Te)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: r(H),
          index: !0
        }
      ]
    }
  ];
  return [...d, ...u];
}, Ye = {
  authorization: T,
  base: q,
  system: W,
  oauth: Y
}, { Header: Ge, Content: Je, Footer: Xe, Sider: Ze } = P, { SubMenu: et } = O, tt = ({ element: a, routes: m, transformLangConfig: f, menuStyle: g = "dark" }) => {
  const { t: d, i18n: u } = B(), { t: c } = B("common"), [y, S] = v(!1), p = he(), { hasPermission: A } = Ne(), z = me(), { logout: w, user: i } = Ue(), [s, b] = v([]), [_, L] = v(null), [U, G] = v("Loading..."), [x, J] = v(null);
  p.pathname !== "/profile" && (i && i.mfa_enforced && !i.mfa_enabled ? z("/profile#mfa") : i && i.status === "password_expired" && z("/profile#password"));
  const X = () => {
    w(), window.location.href = Q("/login?redirect=" + encodeURIComponent(window.location.href));
  }, Z = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(k, { to: "/profile", children: c("profile") })
    },
    {
      key: "logout",
      label: c("logout"),
      onClick: X
    }
  ];
  R(() => {
    Ye.system.getSiteConfig().then((n) => {
      var t;
      const o = n.navigation.filter((h) => h.path !== n.home_page), j = [...n.home_page ? [{
        name: "home",
        path: n.home_page
      }] : [], ...o];
      j.length > 1 ? b(j) : b([]), L(n.logo), J(n), (t = document.getElementById("site-icon")) == null || t.setAttribute("href", n.logo);
    });
  }, []), R(() => {
    u.language && G((x == null ? void 0 : x.name_i18n[u.language]) || (x == null ? void 0 : x.name) || "");
  }, [x, u.language]);
  const F = () => {
    const n = ue(m, p.pathname), o = [];
    if (n) {
      for (const [j, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          o.push({
            href: t.route.path,
            title: c("home"),
            key: "home"
          });
        else if (t.route.name) {
          const h = n.slice(0, j + 1).map(($) => $.route.name).filter(Boolean).join(".");
          o.push({
            path: t.route.path,
            title: t.route.name ? d(`breadcrumbs.${h}`) : void 0,
            key: t.route.path
          });
        }
    }
    return o;
  }, ee = (n) => n.some((o) => A(o)), te = Me.flatMapDeep(m, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), C = (n, o = []) => {
    const j = (t) => t && t.replace(/_/g, " ").split(" ").map((h) => h.charAt(0).toUpperCase() + h.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !ee(t.permissions))
        return null;
      const h = j(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const $ = C(t.children, [...o, t.name]);
        return $.length == 0 && t.path ? /* @__PURE__ */ e.jsx(O.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(k, { to: t.path, children: d(`menu.${[...o, t.name].join(".")}`, { defaultValue: h }) }) }, t.path) : /* @__PURE__ */ e.jsx(et, { icon: t.icon, title: d(`menu.${[...o, t.name, t.name].join(".")}`, { defaultValue: h }), children: $ }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(O.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(k, { to: t.path, children: d(`menu.${[...o, t.name].join(".")}`, { defaultValue: h }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  return R(() => {
    const n = F().filter((o) => o.path !== "/").map((o) => o.title).join(" - ");
    n ? document.title = `${U} | ${n}` : document.title = U;
  }, [F, p.pathname]), /* @__PURE__ */ e.jsxs(P, { style: { minHeight: "100vh" }, children: [
    /* @__PURE__ */ e.jsxs(Ze, { collapsible: !0, collapsed: y, onCollapse: S, theme: g, children: [
      /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: _ ? /* @__PURE__ */ e.jsx("img", { src: _, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(fe, { size: "large", tip: "Loading..." }) }) }),
      /* @__PURE__ */ e.jsx(O, { theme: g, defaultOpenKeys: te, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [p.pathname], children: C(m) })
    ] }),
    /* @__PURE__ */ e.jsxs(P, { className: "site-layout", children: [
      /* @__PURE__ */ e.jsxs(Ge, { className: "site-layout-background", style: { padding: 0, display: "flex", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ e.jsx(
          ge,
          {
            type: "text",
            icon: y ? /* @__PURE__ */ e.jsx(ke, {}) : /* @__PURE__ */ e.jsx(Oe, {}),
            onClick: () => S(!y),
            style: { fontSize: "16px", width: 64, height: 64 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { style: { marginRight: "20px" }, children: [
          /* @__PURE__ */ e.jsx(I, { hidden: s.length <= 1, menu: {
            items: s.map((n) => ({
              key: n.path,
              style: { paddingRight: "20px" },
              label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: d(`menu.${n.name}`, { defaultValue: n.name }) })
            }))
          }, children: /* @__PURE__ */ e.jsx(Re, {}) }),
          /* @__PURE__ */ e.jsxs(I, { menu: { items: Z }, children: [
            i != null && i.avatar ? /* @__PURE__ */ e.jsx(E, { src: i.avatar }) : /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(N, {}) }),
            /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em" }, children: (i == null ? void 0 : i.full_name) || (i == null ? void 0 : i.username) })
          ] }),
          /* @__PURE__ */ e.jsx(we, { transformLangConfig: f })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs(Je, { style: { margin: "0 16px" }, children: [
        /* @__PURE__ */ e.jsx(je, { style: { margin: "16px 0" }, itemRender: (n) => {
          const o = n.href || n.path;
          return o ? /* @__PURE__ */ e.jsx(k, { to: o, children: n.title }) : /* @__PURE__ */ e.jsx("span", { children: n.title });
        }, items: F() }),
        /* @__PURE__ */ e.jsx("div", { className: "site-layout-background", style: { padding: 24, minHeight: 360 }, children: a ?? /* @__PURE__ */ e.jsx(de, {}) })
      ] }),
      /* @__PURE__ */ e.jsxs(Xe, { style: { textAlign: "center" }, children: [
        " ©",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        U
      ] })
    ] })
  ] });
}, nt = new le({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), K = {
  "zh-CN": re,
  "en-US": M,
  "de-DE": oe,
  "es-ES": ae,
  "fr-FR": se,
  "ar-AE": ie,
  "sv-SE": ne
};
function zt({
  transformRouter: a = (c) => c,
  transformSettingTabs: m = (c) => c,
  transformLangConfig: f = (c) => c,
  extraPrivateRoutes: g = [],
  extraPublicRoutes: d = [],
  menuStyle: u = "dark"
}) {
  const { i18n: c } = B(), [y, S] = v(K[c.language] || M);
  R(() => {
    S(K[c.language] || M);
  }, [c.language]);
  const p = (w) => w.map((i) => i.children === void 0 ? i : {
    ...i,
    children: p(i.children)
  }), A = a(p(We({
    transformSettingTabs: m,
    transformLangConfig: f,
    extraPrivateRoutes: g,
    extraPublicRoutes: d
  }))), z = (w, i) => w.flatMap((s) => s.is_private ? [s] : "children" in s && s.children ? s.children : [s]).map((s, b) => {
    const _ = s.is_private ? /* @__PURE__ */ e.jsx(be, { element: /* @__PURE__ */ e.jsx(
      tt,
      {
        routes: A,
        element: s.element,
        transformLangConfig: f,
        menuStyle: u
      }
    ) }) : s.element;
    if ("children" in s && s.children && s.children.length > 0)
      return /* @__PURE__ */ e.jsx(D, { path: s.path, element: _, children: z(s.children, s) }, s.path ?? s.name ?? b);
    const { path: L } = s;
    return /* @__PURE__ */ e.jsx(D, { path: L, index: s.index, element: _ }, L ?? s.name ?? `${(i == null ? void 0 : i.path) ?? ""}.${b}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(ce, { client: nt, children: /* @__PURE__ */ e.jsx(
    ve,
    {
      locale: y,
      children: /* @__PURE__ */ e.jsx(Fe, { children: /* @__PURE__ */ e.jsx(pe, { basename: Q(), children: /* @__PURE__ */ e.jsx(xe, { children: z(A) }) }) })
    }
  ) });
}
const wt = {
  ...T,
  ...q,
  ...Y,
  ...W
};
export {
  zt as A,
  Ye as a,
  wt as b,
  tt as c,
  r as w
};
