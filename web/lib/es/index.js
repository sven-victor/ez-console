import { a as ce } from "./ai.js";
import { a as J } from "./authorization.js";
import { b as X, g as Z } from "./base.js";
import { a as F } from "./system.js";
import { o as ee } from "./oauth.js";
import { j as e, d as he, e as me, f as de, g as ue, h as pe, i as M, k as xe } from "./vendor.js";
import { QueryClient as fe, QueryClientProvider as ge } from "react-query";
import { useLocation as je, useNavigate as ve, Link as k, Outlet as ye, matchRoutes as ze, BrowserRouter as we, Routes as be, Route as K } from "react-router-dom";
import { Layout as B, Menu as $, Spin as _e, Button as Se, Breadcrumb as Ae, ConfigProvider as Le } from "antd";
import { useTranslation as U } from "react-i18next";
import { lazy as c, Suspense as Oe, useState as A, useEffect as C } from "react";
import { L as Re, H as T, O as ke, A as q, a as $e, b as Ce, c as Ie, d as Ne, P as Pe } from "./components.js";
import { DashboardOutlined as De, SolutionOutlined as Fe, UserOutlined as I, SafetyOutlined as Me, FileSearchOutlined as Be, SettingOutlined as Ue, SwapOutlined as Ee, MenuUnfoldOutlined as He, MenuFoldOutlined as Ve } from "@ant-design/icons";
import { c as Ke, a as Te, u as qe, b as Qe, A as We, S as Ye, e as Ge } from "./contexts.js";
import Je from "lodash";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
import "i18next";
const Xe = c(() => import("./dashboard.js")), Ze = c(() => import("./login.js")), et = c(() => import("./profile.js")), Q = c(() => import("./not_found.js")), tt = c(() => import("./forbidden.js")), it = c(() => import("./users.js").then((a) => a.U)), nt = c(() => import("./users.js").then((a) => a.a)), W = c(() => import("./users.js").then((a) => a.b)), at = c(() => import("./roles.js").then((a) => a.R)), Y = c(() => import("./roles.js").then((a) => a.a)), st = c(() => import("./system-settings.js").then((a) => a.i)), ot = c(() => import("./system-settings.js").then((a) => a.O)), rt = c(() => import("./system-settings.js").then((a) => a.a)), lt = c(() => import("./audit.js")), ct = c(() => import("./service-accounts.js").then((a) => a.S)), ht = c(() => import("./service-accounts.js").then((a) => a.a));
function o(a, m) {
  return /* @__PURE__ */ e.jsx(Oe, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(a, { ...m }) });
}
const mt = ({ transformSettingTabs: a, transformLangConfig: m, extraPrivateRoutes: f = [], extraPublicRoutes: g = [] }) => {
  const j = [
    {
      path: "/login",
      element: o(Ze, { transformLangConfig: m }),
      index: !0
    },
    {
      path: "/404",
      element: o(Q),
      index: !0
    },
    {
      path: "/403",
      element: o(tt),
      index: !0
    },
    {
      path: "/system/settings/oauth/test-callback",
      element: o(rt),
      index: !0
    },
    ...g
  ], v = [
    {
      path: "/",
      is_private: !0,
      children: [
        {
          path: "/",
          element: o(Xe),
          name: "dashboard",
          icon: /* @__PURE__ */ e.jsx(De, {}),
          index: !0
        },
        {
          path: "/profile",
          element: o(et),
          name: void 0,
          index: !0
        },
        {
          name: "authorization",
          icon: /* @__PURE__ */ e.jsx(I, {}),
          permissions: ["authorization:user:view", "authorization:user:create", "authorization:user:update", "authorization:user:delete", "authorization:service_account:view", "authorization:service_account:create", "authorization:service_account:update", "authorization:service_account:delete", "authorization:role:view"],
          children: [
            // Role management
            {
              path: "/authorization/roles",
              name: "roles",
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
              children: [
                {
                  element: o(at),
                  permissions: ["authorization:role:view"],
                  index: !0
                },
                {
                  path: "/authorization/roles/create",
                  element: o(Y),
                  permissions: ["authorization:role:create"],
                  index: !0
                },
                {
                  path: "/authorization/roles/:id/edit",
                  element: o(Y),
                  permissions: ["authorization:role:update"],
                  index: !0
                }
              ]
            },
            // User management
            {
              path: "/authorization/users",
              name: "users",
              icon: /* @__PURE__ */ e.jsx(I, {}),
              permissions: ["authorization:user:view", "authorization:user:list", "authorization:user:create", "authorization:user:update", "authorization:user:delete"],
              children: [
                {
                  element: o(it),
                  permissions: ["authorization:user:list"],
                  index: !0
                },
                {
                  path: "/authorization/users/create",
                  element: o(W),
                  permissions: ["authorization:user:create"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id",
                  element: o(nt),
                  permissions: ["authorization:user:view"],
                  index: !0
                },
                {
                  path: "/authorization/users/:id/edit",
                  element: o(W),
                  permissions: ["authorization:user:update"],
                  index: !0
                }
              ]
            },
            // Service account management
            {
              path: "/authorization/service-accounts",
              name: "serviceAccounts",
              icon: /* @__PURE__ */ e.jsx(I, {}),
              permissions: ["authorization:service_account:view"],
              children: [
                {
                  element: o(ct),
                  permissions: ["authorization:service_account:view"],
                  index: !0
                },
                {
                  path: "/authorization/service-accounts/:id",
                  element: o(ht),
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
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          permissions: ["system:settings:view", "system:settings:update", "system:audit:view", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
          children: [
            // System settings
            {
              path: "/system/settings",
              icon: /* @__PURE__ */ e.jsx(Me, {}),
              name: "settings",
              permissions: ["system:settings:view", "system:settings:update", "system:organization:view", "ai:models:view", "ai:toolsets:view"],
              children: [
                {
                  path: "/system/settings",
                  index: !0,
                  element: o(st, { transformItems: a })
                },
                {
                  path: "/system/settings/organizations/:id",
                  permissions: ["system:organization:view"],
                  element: o(ot),
                  index: !0
                }
              ]
            },
            // Audit logs
            {
              path: "/system/audit",
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              name: "audit",
              permissions: ["system:audit:view"],
              index: !0,
              element: o(lt)
            }
          ]
        },
        // Redirect and error handling
        {
          path: "*",
          element: o(Q),
          index: !0
        }
      ]
    }
  ];
  return [...j, ...v];
}, Bt = {
  ai: ce,
  authorization: J,
  base: X,
  system: F,
  oauth: ee
}, { Header: dt, Content: ut, Footer: pt, Sider: xt } = B, { SubMenu: ft } = $, gt = ({
  element: a,
  routes: m,
  transformLangConfig: f,
  menuStyle: g = "dark",
  transformHeaderItems: j = (p) => p,
  renderLayout: v
}) => {
  const { layout: p, visible: N } = Ke(), { t: l, i18n: y } = U(), { t: z } = U("common"), x = je(), { hasPermission: L } = Te(), w = ve(), { logout: b, user: s } = qe(), { siteConfig: i, clearCurrentOrgId: O } = Qe(), [_, S] = A([]), [te, ie] = A(null), [P, ne] = A("Loading...");
  x.pathname !== "/profile" && (s && s.mfa_enforced && !s.mfa_enabled ? w("/profile#mfa") : s && s.status === "password_expired" && w("/profile#password"));
  const ae = () => {
    b(), O(), window.location.href = Z("/login?redirect=" + encodeURIComponent(window.location.href));
  }, se = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(k, { to: "/profile", children: z("profile") })
    },
    {
      key: "logout",
      label: z("logout"),
      onClick: ae
    }
  ];
  C(() => {
    var n;
    if (i) {
      const r = i.navigation.filter((t) => t.path !== i.home_page), d = [...i.home_page ? [{
        name: "home",
        path: i.home_page
      }] : [], ...r];
      d.length > 1 ? S(d) : S([]), ie(i.logo), (n = document.getElementById("site-icon")) == null || n.setAttribute("href", i.logo);
    }
  }, [i]), C(() => {
    y.language && ne((i == null ? void 0 : i.name_i18n[y.language]) || (i == null ? void 0 : i.name) || "");
  }, [i, y.language]);
  const D = () => {
    const n = ze(m, x.pathname), r = [];
    if (n) {
      for (const [d, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          r.push({
            href: t.route.path,
            title: z("home"),
            key: "home"
          });
        else if (t.route.name) {
          const h = n.slice(0, d + 1).map((u) => u.route.name).filter(Boolean).join(".");
          r.push({
            path: t.route.path,
            title: t.route.name ? l(`breadcrumbs.${h}`) : void 0,
            key: t.route.path
          });
        }
    }
    return r;
  }, oe = (n) => n.some((r) => L(r)), re = Je.flatMapDeep(m, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), E = (n, r = []) => {
    const d = (t) => t && t.replace(/_/g, " ").split(" ").map((h) => h.charAt(0).toUpperCase() + h.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !oe(t.permissions))
        return null;
      const h = d(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const u = E(t.children, [...r, t.name]);
        return u.length == 0 && t.path ? /* @__PURE__ */ e.jsx($.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(k, { to: t.path, children: l(`menu.${[...r, t.name].join(".")}`, { defaultValue: h }) }) }, t.path) : /* @__PURE__ */ e.jsx(ft, { icon: t.icon, title: l(`menu.${[...r, t.name, t.name].join(".")}`, { defaultValue: h }), children: u }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx($.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(k, { to: t.path, children: l(`menu.${[...r, t.name].join(".")}`, { defaultValue: h }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  C(() => {
    const n = D().filter((r) => r.path !== "/").map((r) => r.title).join(" - ");
    n ? document.title = `${P} | ${n}` : document.title = P;
  }, [D, x.pathname]);
  const le = [
    /* @__PURE__ */ e.jsx(T, { hidden: _.length <= 1, menu: {
      items: _.map((n) => ({
        key: n.path,
        style: { paddingRight: "20px" },
        label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: l(`menu.${n.name}`, { defaultValue: n.name }) })
      }))
    }, children: /* @__PURE__ */ e.jsx(Ee, {}) }),
    ...i != null && i.enable_multi_org ? [/* @__PURE__ */ e.jsx(ke, {}, "org-switcher")] : [],
    /* @__PURE__ */ e.jsxs(T, { menu: { items: se }, children: [
      s != null && s.avatar ? /* @__PURE__ */ e.jsx(q, { src: s.avatar }) : /* @__PURE__ */ e.jsx(q, { icon: /* @__PURE__ */ e.jsx(I, {}) }),
      /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em", marginLeft: "5px" }, children: (s == null ? void 0 : s.full_name) || (s == null ? void 0 : s.username) })
    ] }),
    /* @__PURE__ */ e.jsx($e, { transformLangConfig: f })
  ];
  return (v ?? ((n, r, d, t, h) => {
    const [u, H] = A(!1);
    return /* @__PURE__ */ e.jsxs(B, { style: { minHeight: "100vh", display: "flex", flexDirection: "row" }, children: [
      /* @__PURE__ */ e.jsxs(xt, { collapsible: !0, collapsed: u, onCollapse: H, theme: g, children: [
        /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: n ? /* @__PURE__ */ e.jsx("img", { src: n, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(_e, { size: "large", tip: "Loading..." }) }) }),
        /* @__PURE__ */ e.jsx($, { theme: g, defaultOpenKeys: re, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [x.pathname], children: r })
      ] }),
      /* @__PURE__ */ e.jsxs(B, { className: "site-layout main-layout", style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ e.jsxs(dt, { className: "site-layout-background", style: { padding: 0, display: "flex", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ e.jsx(
            Se,
            {
              type: "text",
              icon: u ? /* @__PURE__ */ e.jsx(He, {}) : /* @__PURE__ */ e.jsx(Ve, {}),
              onClick: () => H(!u),
              style: { fontSize: "16px", width: 64, height: 64 }
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { marginRight: "20px" }, children: d })
        ] }),
        /* @__PURE__ */ e.jsxs(ut, { style: { margin: "0 16px", height: "calc(100vh - 170px)", overflow: "auto" }, children: [
          /* @__PURE__ */ e.jsx(Ae, { style: { margin: "16px 0" }, itemRender: (R) => {
            const V = R.href || R.path;
            return V ? /* @__PURE__ */ e.jsx(k, { to: V, children: R.title }) : /* @__PURE__ */ e.jsx("span", { children: R.title });
          }, items: t }),
          /* @__PURE__ */ e.jsx("div", { className: "site-layout-background", style: { padding: 24, minHeight: "calc(100vh - 190px)" }, children: h }),
          /* @__PURE__ */ e.jsx(Ce, {}),
          p === "classic" && /* @__PURE__ */ e.jsx(Ie, {})
        ] }),
        /* @__PURE__ */ e.jsxs(pt, { style: { textAlign: "center" }, children: [
          " ©",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          P
        ] })
      ] }),
      (p === "sidebar" || p === "float-sidebar") && N && /* @__PURE__ */ e.jsx(Ne, {})
    ] });
  }))(te, E(m), j(le), D(), a ?? /* @__PURE__ */ e.jsx(ye, {}));
}, jt = new fe({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), G = {
  "zh-CN": xe,
  "en-US": M,
  "de-DE": pe,
  "es-ES": ue,
  "fr-FR": de,
  "ar-AE": me,
  "sv-SE": he
};
function Ut({
  transformRouter: a = (l) => l,
  transformSettingTabs: m = (l) => l,
  transformLangConfig: f = (l) => l,
  extraPrivateRoutes: g = [],
  extraPublicRoutes: j = [],
  menuStyle: v = "dark",
  transformHeaderItems: p = (l) => l,
  renderLayout: N
}) {
  const { i18n: l } = U(), [y, z] = A(G[l.language] || M);
  C(() => {
    z(G[l.language] || M);
  }, [l.language]);
  const x = (b) => b.map((s) => s.children === void 0 ? s : {
    ...s,
    children: x(s.children)
  }), L = a(x(mt({
    transformSettingTabs: m,
    transformLangConfig: f,
    extraPrivateRoutes: g,
    extraPublicRoutes: j
  }))), w = (b, s) => b.flatMap((i) => i.is_private ? [i] : "children" in i && i.children ? i.children : [i]).map((i, O) => {
    const _ = i.is_private ? /* @__PURE__ */ e.jsx(Pe, { element: /* @__PURE__ */ e.jsx(
      gt,
      {
        routes: L,
        element: i.element,
        transformLangConfig: f,
        menuStyle: v,
        transformHeaderItems: p,
        renderLayout: N
      }
    ) }) : i.element;
    if ("children" in i && i.children && i.children.length > 0)
      return /* @__PURE__ */ e.jsx(K, { path: i.path, element: _, children: w(i.children, i) }, i.path ?? i.name ?? O);
    const { path: S } = i;
    return /* @__PURE__ */ e.jsx(K, { path: S, index: i.index, element: _ }, S ?? i.name ?? `${(s == null ? void 0 : s.path) ?? ""}.${O}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(ge, { client: jt, children: /* @__PURE__ */ e.jsx(
    Le,
    {
      locale: y,
      children: /* @__PURE__ */ e.jsx(We, { children: /* @__PURE__ */ e.jsx(Ye, { children: /* @__PURE__ */ e.jsx(Ge, { children: /* @__PURE__ */ e.jsx(we, { basename: Z(), children: /* @__PURE__ */ e.jsx(be, { children: w(L) }) }) }) }) })
    }
  ) });
}
const Et = {
  ...J,
  ...X,
  ...ee,
  ...F,
  ...F
};
export {
  Ut as A,
  Bt as a,
  Et as b,
  gt as c,
  o as w
};
