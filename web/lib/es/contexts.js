import { useContext as x, createContext as U, useState as _, useEffect as C, useCallback as j, useMemo as L } from "react";
import { j as E } from "./vendor.js";
import { message as G } from "antd";
import { a as A } from "./index.js";
import { c as P, a as M } from "./client.js";
import { useRequest as F } from "ahooks";
const z = U({
  user: void 0,
  token: null,
  loading: !1,
  login: async () => {
  },
  oauthLogin: async () => {
  },
  logout: () => {
  },
  updateUser: () => {
  }
}), R = () => x(z), b = (e, t = !0) => {
  e ? (t && localStorage.setItem("token", e), P.defaults.headers.common.Authorization = `Bearer ${e}`) : (t && localStorage.removeItem("token"), delete P.defaults.headers.common.Authorization);
}, Z = ({ children: e }) => {
  const [t, r] = _(void 0), [y, i] = _(localStorage.getItem("token")), [k, g] = _(!0), { run: h } = F(async () => {
    const o = localStorage.getItem("token");
    return o ? (b(o, !1), A.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (o) => {
      r(o);
    },
    onError: (o) => {
      console.error("Failed to get current user:", o), w();
    },
    onFinally: () => {
      g(!1);
    }
  });
  C(() => {
    h();
  }, []);
  const s = async (o) => {
    try {
      const n = await A.authorization.login(o), { token: l, user: a, needs_mfa: m, password_expired: c, mfa_token: p, mfa_type: f } = n;
      if (m)
        throw { needsMFA: !0, mfaToken: p, mfaType: f, user: a };
      if (c)
        throw { password_expired: !0, user: a, token: l };
      return b(l), i(l), r(a), a;
    } catch (n) {
      throw n && n.needsMFA || n && n.password_expired || G.error("Login failed, please check your username and password"), n;
    }
  }, u = j(async (o) => {
    try {
      const n = await A.oauth.handleCallback(o);
      let l = "", a = null;
      if (n && typeof n == "object")
        if ("code" in n && n.code === "0" && "data" in n) {
          const { token: m, user: c, needs_mfa: p, mfa_token: f, mfa_type: d } = n.data;
          if (p)
            throw { needsMFA: !0, mfaToken: f, mfaType: d, user: c };
          l = m, a = c;
        } else {
          const { token: m, user: c, needs_mfa: p, mfa_token: f, mfa_type: d } = n;
          if (p)
            throw { needsMFA: !0, mfaToken: f, mfaType: d, user: c };
          l = m, a = c;
        }
      return b(l), i(l), r(a), a;
    } catch (n) {
      throw n && n.needsMFA || n && n.passwordExpired, n;
    }
  }, []), w = () => {
    A.authorization.logout(), b(null), i(null), r(null);
  }, v = (o) => {
    r(o);
  };
  return /* @__PURE__ */ E.jsx(
    z.Provider,
    {
      value: {
        user: t,
        token: y,
        loading: k,
        login: s,
        oauthLogin: u,
        logout: w,
        updateUser: v
      },
      children: e
    }
  );
}, S = () => {
  const e = x(z);
  if (e === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return e;
}, K = U({
  siteConfig: null,
  enableMultiOrg: !1,
  loading: !1,
  fetchSiteConfig: async () => null,
  currentOrgId: null,
  setCurrentOrgId: () => {
  },
  clearCurrentOrgId: () => {
  }
}), B = () => x(K), V = ({ children: e }) => {
  const { user: t } = R(), { data: r = null, loading: y, runAsync: i } = F(async () => A.system.getSiteConfig(), { manual: !0 });
  C(() => {
    t !== void 0 && i();
  }, [t]);
  const [k, g] = _(null);
  return C(() => {
    k ? localStorage.setItem("orgID", k) : localStorage.removeItem("orgID");
  }, [k]), C(() => {
    var s, u, w;
    let h = localStorage.getItem("orgID");
    if (h) {
      const v = (s = t == null ? void 0 : t.organizations) == null ? void 0 : s.find((o) => o.id === h);
      if (v) {
        g(v.id);
        return;
      }
    }
    g(((w = (u = t == null ? void 0 : t.organizations) == null ? void 0 : u[0]) == null ? void 0 : w.id) ?? null);
  }, [r, t == null ? void 0 : t.organizations]), /* @__PURE__ */ E.jsx(
    K.Provider,
    {
      value: {
        siteConfig: r,
        loading: y,
        enableMultiOrg: (r == null ? void 0 : r.enable_multi_org) ?? !1,
        fetchSiteConfig: i,
        currentOrgId: k,
        setCurrentOrgId: (h) => {
          g(h);
        },
        clearCurrentOrgId: () => {
          g(null);
        }
      },
      children: e
    }
  );
}, ee = () => {
  var h;
  const { user: e } = x(z), { currentOrgId: t } = B(), r = (h = e == null ? void 0 : e.roles) == null ? void 0 : h.filter((s) => !s.organization_id || s.organization_id === t), y = () => r ? r.some((s) => s.name === "admin" && !s.organization_id) : !1, i = (s) => r ? y() ? !0 : r.some((u) => u.permissions ? u.permissions.some((w) => w.code === s) : !1) : !1;
  return {
    hasPermission: i,
    hasAllPermissions: (s) => s.every((u) => i(u)),
    hasAnyPermission: (s) => s.some((u) => i(u)),
    isAdmin: y(),
    loading: !e
  };
}, D = /* @__PURE__ */ new Map(), $ = (e, t) => JSON.stringify({ dataSource: e, dependentValues: t }), q = (e, t) => {
  const r = D.get(e);
  return r ? t && t > 0 && Date.now() - r.timestamp > t * 1e3 ? (D.delete(e), null) : r.data : null;
}, J = (e, t) => {
  D.set(e, { data: t, timestamp: Date.now() });
}, te = (e, t, r) => {
  const [y, i] = _(t || []), [k, g] = _(!1), [h, s] = _(null), [u, w] = _(0), v = () => w((n) => n + 1), o = L(() => !e || e.type === "static" ? !1 : e.depends_on && e.depends_on.length > 0 ? e.depends_on.every(
    (n) => r && r[n] !== void 0 && r[n] !== null
  ) : !0, [e, r]);
  return C(() => {
    if (!o) {
      i(t || []);
      return;
    }
    (async () => {
      try {
        g(!0), s(null);
        const l = $(e, r);
        if (e.cache) {
          const m = q(l, e.cache_ttl);
          if (m) {
            i(m), g(!1);
            return;
          }
        }
        let a = [];
        switch (e.type) {
          case "api": {
            const m = e.url || "", c = e.method || "GET", p = {
              ...r,
              ...e.params
            };
            let f;
            c.toUpperCase() === "GET" ? f = await M(m, { params: p }) : f = await M(m, { params: p });
            const d = Array.isArray(f) ? f : f.data || [], O = e.label_key || "label", T = e.value_key || "value";
            a = d.map((I) => ({
              label: I[O] || I.name || I.id,
              value: I[T] || I.id
            }));
            break;
          }
          case "toolsets": {
            let c = (await A.system.listToolSets({
              current: 1,
              page_size: 1e3,
              ...e.params
            })).data || [];
            e.filter && (c = c.filter((d) => Object.entries(e.filter).every(([O, T]) => d[O] === T)));
            const p = e.label_key || "name", f = e.value_key || "id";
            a = c.map((d) => ({
              label: d[p] || d.name,
              value: d[f] || d.id
            }));
            break;
          }
          case "internal": {
            console.warn("Internal data source not yet implemented"), a = [];
            break;
          }
          default:
            a = t || [];
        }
        e.cache && J(l, a), i(a);
      } catch (l) {
        console.error("Failed to load options from data source:", l), s(l), i(t || []);
      } finally {
        g(!1);
      }
    })();
  }, [e, t, r, o, u]), { options: y, loading: k, error: h, refresh: v };
};
export {
  Z as A,
  V as S,
  ee as a,
  B as b,
  te as c,
  R as d,
  S as u
};
