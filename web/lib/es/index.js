import { j as e, aa as te, ab as ne, ac as _, ad as ie, ae, af as se, ag as L, ah as $, u as I, ai as oe, S as re, m as le, aj as ce, ak as he, al as me, am as de, an as ue, ao as pe, ap as fe, aq as xe, ar as ge, as as je, at as k, au as ve, av as ye, aw as ze } from "./vendor.js";
import { useLocation as we, useNavigate as be, Link as b, Outlet as _e, matchRoutes as $e, BrowserRouter as Se, Routes as Ae, Route as U } from "react-router-dom";
import { lazy as l, Suspense as Re, useState as j, useEffect as S } from "react";
import { L as Le, H as D, A as E, a as Ie, P as ke } from "./components.js";
import { a as Ne, u as Ce, A as Pe } from "./contexts.js";
import { a as O } from "./authorization.js";
import { b as V, g as q } from "./base.js";
import { s as K } from "./system.js";
import { o as T } from "./oauth.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
const Be = l(() => import("./dashboard.js")), Ue = l(() => import("./login.js")), De = l(() => import("./profile.js")), Q = l(() => import("./not_found.js")), Ee = l(() => import("./forbidden.js")), Fe = l(() => import("./users.js").then((a) => a.U)), Me = l(() => import("./users.js").then((a) => a.a)), F = l(() => import("./users.js").then((a) => a.b)), He = l(() => import("./roles.js")), Oe = l(() => import("./system-settings.js").then((a) => a.i)), Ve = l(() => import("./system-settings.js").then((a) => a.O)), qe = l(() => import("./audit.js")), Ke = l(() => import("./service-accounts.js").then((a) => a.S)), Te = l(() => import("./service-accounts.js").then((a) => a.a)), r = (a) => /* @__PURE__ */ e.jsx(Re, { fallback: /* @__PURE__ */ e.jsx(Le, {}), children: /* @__PURE__ */ e.jsx(a, {}) }), Qe = [
  {
    path: "/login",
    element: r(Ue),
    index: !0
  },
  {
    path: "/404",
    element: r(Q),
    index: !0
  },
  {
    path: "/403",
    element: r(Ee),
    index: !0
  },
  {
    path: "/system/settings/oauth/test-callback",
    element: r(Ve),
    index: !0
  }
], We = [
  {
    path: "/",
    is_private: !0,
    children: [
      {
        path: "/",
        element: r(Be),
        name: "dashboard",
        icon: /* @__PURE__ */ e.jsx(te, {}),
        index: !0
      },
      {
        path: "/profile",
        element: r(De),
        name: void 0,
        index: !0
      },
      {
        name: "authorization",
        icon: /* @__PURE__ */ e.jsx(_, {}),
        permissions: ["authorization:user:view", "authorization:user:create", "authorization:user:update", "authorization:user:delete", "authorization:service_account:view", "authorization:service_account:create", "authorization:service_account:update", "authorization:service_account:delete"],
        children: [
          // Role management
          {
            path: "/authorization/roles",
            name: "roles",
            icon: /* @__PURE__ */ e.jsx(ne, {}),
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
            icon: /* @__PURE__ */ e.jsx(_, {}),
            permissions: ["authorization:user:view", "authorization:user:list", "authorization:user:create", "authorization:user:update", "authorization:user:delete"],
            children: [
              {
                element: r(Fe),
                permissions: ["authorization:user:list"],
                index: !0
              },
              {
                path: "/authorization/users/create",
                element: r(F),
                permissions: ["authorization:user:create"],
                index: !0
              },
              {
                path: "/authorization/users/:id",
                element: r(Me),
                permissions: ["authorization:user:view"],
                index: !0
              },
              {
                path: "/authorization/users/:id/edit",
                element: r(F),
                permissions: ["authorization:user:update"],
                index: !0
              }
            ]
          },
          // Service account management
          {
            path: "/authorization/service-accounts",
            name: "serviceAccounts",
            icon: /* @__PURE__ */ e.jsx(_, {}),
            permissions: ["authorization:service_account:view"],
            children: [
              {
                element: r(Ke),
                permissions: ["authorization:service_account:view"],
                index: !0
              },
              {
                path: "/authorization/service-accounts/:id",
                element: r(Te),
                permissions: ["authorization:service_account:view"],
                index: !0
              }
            ]
          }
        ]
      },
      // System management menu
      {
        name: "system",
        icon: /* @__PURE__ */ e.jsx(se, {}),
        permissions: ["system:settings:view", "system:settings:update", "system:audit:view"],
        children: [
          // System settings
          {
            path: "/system/settings",
            icon: /* @__PURE__ */ e.jsx(ie, {}),
            index: !0,
            name: "settings",
            permissions: ["system:settings:view", "system:settings:update"],
            element: r(Oe)
          },
          // Audit logs
          {
            path: "/system/audit",
            icon: /* @__PURE__ */ e.jsx(ae, {}),
            name: "audit",
            permissions: ["system:audit:view"],
            index: !0,
            element: r(qe)
          }
        ]
      },
      // Redirect and error handling
      {
        path: "*",
        element: r(Q),
        index: !0
      }
    ]
  }
], M = [...Qe, ...We], Ye = {
  authorization: O,
  base: V,
  system: K,
  oauth: T
}, { Header: Ge, Content: Je, Footer: Xe, Sider: Ze } = L, { SubMenu: et } = $, tt = ({ element: a, routes: m }) => {
  const { t: d, i18n: v } = I(), { t: u } = I("common"), [f, x] = j(!1), c = we(), { hasPermission: i } = Ne(), y = be(), { logout: z, user: o } = Ce(), [N, C] = j([]), [P, W] = j(null), [A, Y] = j("Loading..."), [p, G] = j(null);
  c.pathname !== "/profile" && (o && o.mfa_enforced && !o.mfa_enabled ? y("/profile#mfa") : o && o.status === "password_expired" && y("/profile#password"));
  const J = () => {
    z(), window.location.href = q("/login?redirect=" + encodeURIComponent(window.location.href));
  }, X = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(b, { to: "/profile", children: u("profile") })
    },
    {
      key: "logout",
      label: u("logout"),
      onClick: J
    }
  ];
  S(() => {
    Ye.system.getSiteConfig().then((n) => {
      var t;
      const s = n.navigation.filter((h) => h.path !== n.home_page), g = [...n.home_page ? [{
        name: "home",
        path: n.home_page
      }] : [], ...s];
      g.length > 1 ? C(g) : C([]), W(n.logo), G(n), (t = document.getElementById("site-icon")) == null || t.setAttribute("href", n.logo);
    });
  }, []), S(() => {
    v.language && Y((p == null ? void 0 : p.name_i18n[v.language]) || (p == null ? void 0 : p.name) || "");
  }, [p, v.language]);
  const R = () => {
    const n = $e(m, c.pathname), s = [];
    if (n) {
      for (const [g, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          s.push({
            href: t.route.path,
            title: u("home"),
            key: "home"
          });
        else if (t.route.name) {
          const h = n.slice(0, g + 1).map((w) => w.route.name).filter(Boolean).join(".");
          s.push({
            path: t.route.path,
            title: t.route.name ? d(`breadcrumbs.${h}`) : void 0,
            key: t.route.path
          });
        }
    }
    return s;
  }, Z = (n) => n.some((s) => i(s)), ee = oe.flatMapDeep(m, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), B = (n, s = []) => {
    const g = (t) => t && t.replace(/_/g, " ").split(" ").map((h) => h.charAt(0).toUpperCase() + h.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !Z(t.permissions))
        return null;
      const h = g(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const w = B(t.children, [...s, t.name]);
        return w.length == 0 && t.path ? /* @__PURE__ */ e.jsx($.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(b, { to: t.path, children: d(`menu.${[...s, t.name].join(".")}`, { defaultValue: h }) }) }, t.path) : /* @__PURE__ */ e.jsx(et, { icon: t.icon, title: d(`menu.${[...s, t.name, t.name].join(".")}`, { defaultValue: h }), children: w }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx($.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(b, { to: t.path, children: d(`menu.${[...s, t.name].join(".")}`, { defaultValue: h }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  return S(() => {
    const n = R().filter((s) => s.path !== "/").map((s) => s.title).join(" - ");
    n ? document.title = `${A} | ${n}` : document.title = A;
  }, [R, c.pathname]), /* @__PURE__ */ e.jsxs(L, { style: { minHeight: "100vh" }, children: [
    /* @__PURE__ */ e.jsxs(Ze, { collapsible: !0, collapsed: f, onCollapse: x, children: [
      /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: P ? /* @__PURE__ */ e.jsx("img", { src: P, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(re, { size: "large", tip: "Loading..." }) }) }),
      /* @__PURE__ */ e.jsx($, { theme: "dark", defaultOpenKeys: ee, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [c.pathname], children: B(m) })
    ] }),
    /* @__PURE__ */ e.jsxs(L, { className: "site-layout", children: [
      /* @__PURE__ */ e.jsxs(Ge, { className: "site-layout-background", style: { padding: 0, display: "flex", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ e.jsx(
          le,
          {
            type: "text",
            icon: f ? /* @__PURE__ */ e.jsx(ce, {}) : /* @__PURE__ */ e.jsx(he, {}),
            onClick: () => x(!f),
            style: { fontSize: "16px", width: 64, height: 64 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { style: { marginRight: "20px" }, children: [
          /* @__PURE__ */ e.jsx(D, { hidden: N.length <= 1, menu: {
            items: N.map((n) => ({
              key: n.path,
              style: { paddingRight: "20px" },
              label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: d(`menu.${n.name}`, { defaultValue: n.name }) })
            }))
          }, children: /* @__PURE__ */ e.jsx(me, {}) }),
          /* @__PURE__ */ e.jsxs(D, { menu: { items: X }, children: [
            o != null && o.avatar ? /* @__PURE__ */ e.jsx(E, { src: o.avatar }) : /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(_, {}) }),
            /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em" }, children: (o == null ? void 0 : o.full_name) || (o == null ? void 0 : o.username) })
          ] }),
          /* @__PURE__ */ e.jsx(Ie, {})
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs(Je, { style: { margin: "0 16px" }, children: [
        /* @__PURE__ */ e.jsx(de, { style: { margin: "16px 0" }, itemRender: (n) => {
          const s = n.href || n.path;
          return s ? /* @__PURE__ */ e.jsx(b, { to: s, children: n.title }) : /* @__PURE__ */ e.jsx("span", { children: n.title });
        }, items: R() }),
        /* @__PURE__ */ e.jsx("div", { className: "site-layout-background", style: { padding: 24, minHeight: 360 }, children: a ?? /* @__PURE__ */ e.jsx(_e, {}) })
      ] }),
      /* @__PURE__ */ e.jsxs(Xe, { style: { textAlign: "center" }, children: [
        " ©",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        A
      ] })
    ] })
  ] });
}, nt = new ue({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), H = {
  "zh-CN": ve,
  "en-US": k,
  "de-DE": je,
  "es-ES": ge,
  "fr-FR": xe,
  "ar-AE": fe,
  "sv-SE": pe
};
function ft({
  onRouteRender: a = (m) => m
}) {
  const { i18n: m } = I(), [d, v] = j(H[m.language] || k);
  S(() => {
    v(H[m.language] || k);
  }, [m.language]);
  const u = (x) => x.map((c) => c.children === void 0 ? c : {
    ...c,
    children: u(c.children)
  }), f = (x, c) => x.flatMap((i) => i.is_private ? [i] : "children" in i && i.children ? i.children : [i]).map((i, y) => {
    const z = i.is_private ? /* @__PURE__ */ e.jsx(ke, { element: /* @__PURE__ */ e.jsx(tt, { routes: a(u(M)), element: i.element }) }) : i.element;
    if ("children" in i && i.children && i.children.length > 0)
      return /* @__PURE__ */ e.jsx(U, { path: i.path, element: z, children: f(i.children, i) }, i.path ?? i.name ?? y);
    const { path: o } = i;
    return /* @__PURE__ */ e.jsx(U, { path: o, index: i.index, element: z }, o ?? i.name ?? `${(c == null ? void 0 : c.path) ?? ""}.${y}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(ye, { client: nt, children: /* @__PURE__ */ e.jsx(ze, { locale: d, children: /* @__PURE__ */ e.jsx(Pe, { children: /* @__PURE__ */ e.jsx(Se, { basename: q(), children: /* @__PURE__ */ e.jsx(Ae, { children: f(a(u(M))) }) }) }) }) });
}
const xt = {
  ...O,
  ...V,
  ...T,
  ...K
};
export {
  ft as A,
  Ye as a,
  xt as b,
  tt as c,
  r as w
};
