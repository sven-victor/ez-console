import { j as e, aa as ee, ab as te, ac as $, ad as ne, ae as ie, af as ae, ag as I, ah as S, u as k, ai as se, S as oe, m as re, aj as le, ak as ce, al as he, am as me, an as de, ao as ue, ap as pe, aq as fe, ar as xe, as as ge, at as N, au as je, av as ve, aw as ye } from "./vendor.js";
import { useLocation as ze, useNavigate as we, Link as _, Outlet as be, matchRoutes as _e, BrowserRouter as $e, Routes as Se, Route as D } from "react-router-dom";
import { lazy as l, Suspense as Ae, useState as g, useEffect as A } from "react";
import { L as Re, H as E, A as F, a as Le, P as Ie } from "./components.js";
import { a as ke, u as Ne, A as Ce } from "./contexts.js";
import { a as O } from "./authorization.js";
import { b as V } from "./base.js";
import { s as q } from "./system.js";
import { o as K } from "./oauth.js";
import "./forbidden.js";
import "./not_found.js";
import "./client.js";
const Pe = l(() => import("./dashboard.js")), Be = l(() => import("./login.js")), De = l(() => import("./profile.js")), T = l(() => import("./not_found.js")), Ee = l(() => import("./forbidden.js")), Fe = l(() => import("./users.js").then((a) => a.U)), Me = l(() => import("./users.js").then((a) => a.a)), M = l(() => import("./users.js").then((a) => a.b)), Ue = l(() => import("./roles.js")), He = l(() => import("./system-settings.js").then((a) => a.i)), Oe = l(() => import("./system-settings.js").then((a) => a.O)), Ve = l(() => import("./audit.js")), qe = l(() => import("./service-accounts.js").then((a) => a.S)), Ke = l(() => import("./service-accounts.js").then((a) => a.a)), r = (a) => /* @__PURE__ */ e.jsx(Ae, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(a, {}) }), Te = [
  {
    path: "/login",
    element: r(Be),
    index: !0
  },
  {
    path: "/404",
    element: r(T),
    index: !0
  },
  {
    path: "/403",
    element: r(Ee),
    index: !0
  },
  {
    path: "/system/settings/oauth/test-callback",
    element: r(Oe),
    index: !0
  }
], Qe = [
  {
    path: "/",
    is_private: !0,
    children: [
      {
        path: "/",
        element: r(Pe),
        name: "dashboard",
        icon: /* @__PURE__ */ e.jsx(ee, {}),
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
        icon: /* @__PURE__ */ e.jsx($, {}),
        permissions: ["authorization:user:view", "authorization:user:create", "authorization:user:update", "authorization:user:delete", "authorization:service_account:view", "authorization:service_account:create", "authorization:service_account:update", "authorization:service_account:delete"],
        children: [
          // Role management
          {
            path: "/authorization/roles",
            name: "roles",
            icon: /* @__PURE__ */ e.jsx(te, {}),
            permissions: ["authorization:role:view", "authorization:role:create", "authorization:role:update", "authorization:role:delete"],
            children: [
              {
                element: r(Ue),
                permissions: ["authorization:role:view"],
                index: !0
              }
            ]
          },
          // User management
          {
            path: "/authorization/users",
            name: "users",
            icon: /* @__PURE__ */ e.jsx($, {}),
            permissions: ["authorization:user:view", "authorization:user:list", "authorization:user:create", "authorization:user:update", "authorization:user:delete"],
            children: [
              {
                element: r(Fe),
                permissions: ["authorization:user:list"],
                index: !0
              },
              {
                path: "/authorization/users/create",
                element: r(M),
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
                element: r(M),
                permissions: ["authorization:user:update"],
                index: !0
              }
            ]
          },
          // Service account management
          {
            path: "/authorization/service-accounts",
            name: "serviceAccounts",
            icon: /* @__PURE__ */ e.jsx($, {}),
            permissions: ["authorization:service_account:view"],
            children: [
              {
                element: r(qe),
                permissions: ["authorization:service_account:view"],
                index: !0
              },
              {
                path: "/authorization/service-accounts/:id",
                element: r(Ke),
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
        icon: /* @__PURE__ */ e.jsx(ae, {}),
        permissions: ["system:settings:view", "system:settings:update", "system:audit:view"],
        children: [
          // System settings
          {
            path: "/system/settings",
            icon: /* @__PURE__ */ e.jsx(ne, {}),
            index: !0,
            name: "settings",
            permissions: ["system:settings:view", "system:settings:update"],
            element: r(He)
          },
          // Audit logs
          {
            path: "/system/audit",
            icon: /* @__PURE__ */ e.jsx(ie, {}),
            name: "audit",
            permissions: ["system:audit:view"],
            index: !0,
            element: r(Ve)
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
], U = [...Te, ...Qe], We = {
  authorization: O,
  base: V,
  system: q,
  oauth: K
}, { Header: Ye, Content: Ge, Footer: Je, Sider: Xe } = I, { SubMenu: Ze } = S, et = ({ element: a, routes: f }) => {
  const { t: c, i18n: j } = k(), { t: v } = k("common"), [u, y] = g(!1), d = ze(), { hasPermission: h } = ke(), i = we(), { logout: w, user: o } = Ne(), [z, C] = g([]), [P, Q] = g(null), [R, W] = g("Loading..."), [p, Y] = g(null);
  d.pathname !== "/profile" && (o && o.mfa_enforced && !o.mfa_enabled ? i("/profile#mfa") : o && o.status === "password_expired" && i("/profile#password"));
  const G = () => {
    w(), window.location.href = "/console/login?redirect=" + encodeURIComponent(window.location.href);
  }, J = [
    {
      key: "profile",
      label: /* @__PURE__ */ e.jsx(_, { to: "/profile", children: v("profile") })
    },
    {
      key: "logout",
      label: v("logout"),
      onClick: G
    }
  ];
  A(() => {
    We.system.getSiteConfig().then((n) => {
      var t;
      const s = n.navigation.filter((m) => m.path !== n.home_page), x = [...n.home_page ? [{
        name: "home",
        path: n.home_page
      }] : [], ...s];
      x.length > 1 ? C(x) : C([]), Q(n.logo), Y(n), (t = document.getElementById("site-icon")) == null || t.setAttribute("href", n.logo);
    });
  }, []), A(() => {
    j.language && W((p == null ? void 0 : p.name_i18n[j.language]) || (p == null ? void 0 : p.name) || "");
  }, [p, j.language]);
  const L = () => {
    const n = _e(f, d.pathname), s = [];
    if (n) {
      for (const [x, t] of n.entries())
        if (t.route.path === "/" && !t.route.name)
          s.push({
            href: t.route.path,
            title: v("home"),
            key: "home"
          });
        else if (t.route.name) {
          const m = n.slice(0, x + 1).map((b) => b.route.name).filter(Boolean).join(".");
          s.push({
            path: t.route.path,
            title: t.route.name ? c(`breadcrumbs.${m}`) : void 0,
            key: t.route.path
          });
        }
    }
    return s;
  }, X = (n) => n.some((s) => h(s)), Z = se.flatMapDeep(f, (n) => n.children).map((n) => n == null ? void 0 : n.name).filter((n) => n !== void 0), B = (n, s = []) => {
    const x = (t) => t && t.replace(/_/g, " ").split(" ").map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(" ");
    return n.flatMap((t) => "children" in t && t.children && !t.name ? t.children : [t]).map((t) => {
      if (t.permissions && !X(t.permissions))
        return null;
      const m = x(t.name);
      if (!t.name)
        return null;
      if ("children" in t && t.children) {
        const b = B(t.children, [...s, t.name]);
        return b.length == 0 && t.path ? /* @__PURE__ */ e.jsx(S.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(_, { to: t.path, children: c(`menu.${[...s, t.name].join(".")}`, { defaultValue: m }) }) }, t.path) : /* @__PURE__ */ e.jsx(Ze, { icon: t.icon, title: c(`menu.${[...s, t.name, t.name].join(".")}`, { defaultValue: m }), children: b }, t.path ?? t.name);
      }
      return t.name && t.path ? /* @__PURE__ */ e.jsx(S.Item, { icon: t.icon, children: /* @__PURE__ */ e.jsx(_, { to: t.path, children: c(`menu.${[...s, t.name].join(".")}`, { defaultValue: m }) }) }, t.path) : null;
    }).filter(Boolean);
  };
  return A(() => {
    const n = L().filter((s) => s.path !== "/").map((s) => s.title).join(" - ");
    n ? document.title = `${R} | ${n}` : document.title = R;
  }, [L, d.pathname]), /* @__PURE__ */ e.jsxs(I, { style: { minHeight: "100vh" }, children: [
    /* @__PURE__ */ e.jsxs(Xe, { collapsible: !0, collapsed: u, onCollapse: y, children: [
      /* @__PURE__ */ e.jsx("div", { className: "logo", style: { margin: "8px", display: "flex" }, children: /* @__PURE__ */ e.jsx("div", { style: { width: "100%", height: "100%", textAlign: "center" }, children: P ? /* @__PURE__ */ e.jsx("img", { src: P, alt: "logo", style: { height: "32px", width: "32px" } }) : /* @__PURE__ */ e.jsx(oe, { size: "large", tip: "Loading..." }) }) }),
      /* @__PURE__ */ e.jsx(S, { theme: "dark", defaultOpenKeys: Z, defaultSelectedKeys: ["1"], mode: "inline", selectedKeys: [d.pathname], children: B(f) })
    ] }),
    /* @__PURE__ */ e.jsxs(I, { className: "site-layout", children: [
      /* @__PURE__ */ e.jsxs(Ye, { className: "site-layout-background", style: { padding: 0, display: "flex", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ e.jsx(
          re,
          {
            type: "text",
            icon: u ? /* @__PURE__ */ e.jsx(le, {}) : /* @__PURE__ */ e.jsx(ce, {}),
            onClick: () => y(!u),
            style: { fontSize: "16px", width: 64, height: 64 }
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { style: { marginRight: "20px" }, children: [
          /* @__PURE__ */ e.jsx(E, { hidden: z.length <= 1, menu: {
            items: z.map((n) => ({
              key: n.path,
              style: { paddingRight: "20px" },
              label: /* @__PURE__ */ e.jsx("a", { href: n.path, children: c(`menu.${n.name}`, { defaultValue: n.name }) })
            }))
          }, children: /* @__PURE__ */ e.jsx(he, {}) }),
          /* @__PURE__ */ e.jsxs(E, { menu: { items: J }, children: [
            o != null && o.avatar ? /* @__PURE__ */ e.jsx(F, { src: o.avatar }) : /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx($, {}) }),
            /* @__PURE__ */ e.jsx("span", { style: { height: "1em", lineHeight: "1em" }, children: (o == null ? void 0 : o.full_name) || (o == null ? void 0 : o.username) })
          ] }),
          /* @__PURE__ */ e.jsx(Le, {})
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs(Ge, { style: { margin: "0 16px" }, children: [
        /* @__PURE__ */ e.jsx(me, { style: { margin: "16px 0" }, itemRender: (n) => {
          const s = n.href || n.path;
          return s ? /* @__PURE__ */ e.jsx(_, { to: s, children: n.title }) : /* @__PURE__ */ e.jsx("span", { children: n.title });
        }, items: L() }),
        /* @__PURE__ */ e.jsx("div", { className: "site-layout-background", style: { padding: 24, minHeight: 360 }, children: a ?? /* @__PURE__ */ e.jsx(be, {}) })
      ] }),
      /* @__PURE__ */ e.jsxs(Je, { style: { textAlign: "center" }, children: [
        " ©",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        R
      ] })
    ] })
  ] });
}, tt = new de({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !1,
      retry: 1
    }
  }
}), H = {
  "zh-CN": je,
  "en-US": N,
  "de-DE": ge,
  "es-ES": xe,
  "fr-FR": fe,
  "ar-AE": pe,
  "sv-SE": ue
};
function pt({
  basePath: a = "/console/",
  onRouteRender: f = (c) => c
}) {
  const { i18n: c } = k(), [j, v] = g(H[c.language] || N);
  A(() => {
    v(H[c.language] || N);
  }, [c.language]);
  const u = (d) => d.map((h) => h.children === void 0 ? h : {
    ...h,
    children: u(h.children)
  }), y = (d, h) => d.flatMap((i) => i.is_private ? [i] : "children" in i && i.children ? i.children : [i]).map((i, w) => {
    const o = i.is_private ? /* @__PURE__ */ e.jsx(Ie, { element: /* @__PURE__ */ e.jsx(et, { routes: f(u(U)), element: i.element }) }) : i.element;
    if ("children" in i && i.children && i.children.length > 0)
      return /* @__PURE__ */ e.jsx(D, { path: i.path, element: o, children: y(i.children, i) }, i.path ?? i.name ?? w);
    const { path: z } = i;
    return /* @__PURE__ */ e.jsx(D, { path: z, index: i.index, element: o }, z ?? i.name ?? `${(h == null ? void 0 : h.path) ?? ""}.${w}`);
  }).filter(Boolean);
  return /* @__PURE__ */ e.jsx(ve, { client: tt, children: /* @__PURE__ */ e.jsx(ye, { locale: j, children: /* @__PURE__ */ e.jsx(Ce, { children: /* @__PURE__ */ e.jsx($e, { basename: a, children: /* @__PURE__ */ e.jsx(Se, { children: y(f(u(U))) }) }) }) }) });
}
const ft = {
  ...O,
  ...V,
  ...K,
  ...q
};
export {
  pt as A,
  We as a,
  ft as b,
  et as c,
  r as w
};
