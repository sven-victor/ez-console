import { useContext as C, createContext as D, useState as v, useEffect as I, useCallback as j, useMemo as G } from "react";
import { j as L } from "./vendor.js";
import { message as R } from "antd";
import { a as b } from "./index.js";
import { c as M, a as U } from "./client.js";
import { useRequest as E } from "ahooks";
const z = D({
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
}), B = () => C(z), x = (e, t = !0) => {
  e ? (t && localStorage.setItem("token", e), M.defaults.headers.common.Authorization = `Bearer ${e}`) : (t && localStorage.removeItem("token"), delete M.defaults.headers.common.Authorization);
}, S = ({ children: e }) => {
  const [t, r] = v(void 0), [h, o] = v(localStorage.getItem("token")), [u, p] = v(!0), { run: y } = E(async () => {
    const a = localStorage.getItem("token");
    return a ? (x(a, !1), b.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (a) => {
      r(a);
    },
    onError: (a) => {
      console.error("Failed to get current user:", a), w();
    },
    onFinally: () => {
      p(!1);
    }
  });
  I(() => {
    y();
  }, []);
  const n = async (a) => {
    try {
      const s = await b.authorization.login(a), { token: l, user: i, needs_mfa: d, password_expired: f, mfa_token: k, mfa_type: m } = s;
      if (d)
        throw { needsMFA: !0, mfaToken: k, mfaType: m, user: i };
      if (f)
        throw { password_expired: !0, user: i, token: l };
      return x(l), o(l), r(i), i;
    } catch (s) {
      throw s && s.needsMFA || s && s.password_expired || R.error("Login failed, please check your username and password"), s;
    }
  }, c = j(async (a) => {
    try {
      const s = await b.oauth.handleCallback(a);
      let l = "", i = null;
      if (s && typeof s == "object")
        if ("code" in s && s.code === "0" && "data" in s) {
          const { token: d, user: f, needs_mfa: k, mfa_token: m, mfa_type: g } = s.data;
          if (k)
            throw { needsMFA: !0, mfaToken: m, mfaType: g, user: f };
          l = d, i = f;
        } else {
          const { token: d, user: f, needs_mfa: k, mfa_token: m, mfa_type: g } = s;
          if (k)
            throw { needsMFA: !0, mfaToken: m, mfaType: g, user: f };
          l = d, i = f;
        }
      return x(l), o(l), r(i), i;
    } catch (s) {
      throw s && s.needsMFA || s && s.passwordExpired, s;
    }
  }, []), w = () => {
    b.authorization.logout(), x(null), o(null), r(null);
  }, A = (a) => {
    r(a);
  };
  return /* @__PURE__ */ L.jsx(
    z.Provider,
    {
      value: {
        user: t,
        token: h,
        loading: u,
        login: n,
        oauthLogin: c,
        logout: w,
        updateUser: A
      },
      children: e
    }
  );
}, V = () => {
  const e = C(z);
  if (e === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return e;
}, F = D({
  siteConfig: null,
  enableMultiOrg: !1,
  loading: !1,
  fetchSiteConfig: async () => null,
  currentOrgId: null,
  setCurrentOrgId: () => {
  },
  clearCurrentOrgId: () => {
  }
}), $ = () => C(F), ee = ({ children: e }) => {
  const { user: t } = B(), { data: r = null, loading: h, runAsync: o } = E(async () => b.system.getSiteConfig(), { manual: !0 });
  I(() => {
    t !== void 0 && o();
  }, [t]);
  const [u, p] = v(null);
  return I(() => {
    u ? localStorage.setItem("orgID", u) : localStorage.removeItem("orgID");
  }, [u]), I(() => {
    var n, c, w;
    let y = localStorage.getItem("orgID");
    if (y) {
      const A = (n = t == null ? void 0 : t.organizations) == null ? void 0 : n.find((a) => a.id === y);
      if (A) {
        p(A.id);
        return;
      }
    }
    p(((w = (c = t == null ? void 0 : t.organizations) == null ? void 0 : c[0]) == null ? void 0 : w.id) ?? null);
  }, [r, t == null ? void 0 : t.organizations]), /* @__PURE__ */ L.jsx(
    F.Provider,
    {
      value: {
        siteConfig: r,
        loading: h,
        enableMultiOrg: (r == null ? void 0 : r.enable_multi_org) ?? !1,
        fetchSiteConfig: o,
        currentOrgId: u,
        setCurrentOrgId: (y) => {
          p(y);
        },
        clearCurrentOrgId: () => {
          p(null);
        }
      },
      children: e
    }
  );
}, te = () => {
  var y;
  const { user: e } = C(z), { currentOrgId: t } = $(), r = (y = e == null ? void 0 : e.roles) == null ? void 0 : y.filter((n) => !n.organization_id || n.organization_id === t), h = () => r ? r.some((n) => n.name === "admin" && !n.organization_id) : !1, o = (n) => r ? h() ? !0 : r.some((c) => c.permissions ? c.permissions.some((w) => w.code === n) : !1) : !1;
  return {
    hasPermission: o,
    hasAllPermissions: (n) => n.every((c) => o(c)),
    hasAnyPermission: (n) => n.some((c) => o(c)),
    isAdmin: h(),
    loading: !e
  };
}, K = D({
  layout: "sidebar",
  setLayout: () => {
  },
  visible: !1,
  setVisible: () => {
  }
}), se = () => C(K), re = ({ children: e }) => {
  const [t, r] = v("sidebar"), [h, o] = v(!1);
  return /* @__PURE__ */ L.jsx(
    K.Provider,
    {
      value: {
        layout: t,
        setLayout: (u) => {
          r(u);
        },
        visible: h,
        setVisible: (u) => {
          o(u);
        }
      },
      children: e
    }
  );
}, T = /* @__PURE__ */ new Map(), q = (e, t) => JSON.stringify({ dataSource: e, dependentValues: t }), J = (e, t) => {
  const r = T.get(e);
  return r ? t && t > 0 && Date.now() - r.timestamp > t * 1e3 ? (T.delete(e), null) : r.data : null;
}, N = (e, t) => {
  T.set(e, { data: t, timestamp: Date.now() });
}, ne = (e, t, r) => {
  const [h, o] = v(t || []), [u, p] = v(!1), [y, n] = v(null), [c, w] = v(0), A = () => w((s) => s + 1), a = G(() => !e || e.type === "static" ? !1 : e.depends_on && e.depends_on.length > 0 ? e.depends_on.every(
    (s) => r && r[s] !== void 0 && r[s] !== null
  ) : !0, [e, r]);
  return I(() => {
    if (!a) {
      o(t || []);
      return;
    }
    (async () => {
      try {
        p(!0), n(null);
        const l = q(e, r);
        if (e.cache) {
          const d = J(l, e.cache_ttl);
          if (d) {
            o(d), p(!1);
            return;
          }
        }
        let i = [];
        switch (e.type) {
          case "api": {
            const d = e.url || "", f = e.method || "GET", k = {
              ...r,
              ...e.params
            };
            let m;
            f.toUpperCase() === "GET" ? m = await U(d, { params: k }) : m = await U(d, { params: k });
            const g = Array.isArray(m) ? m : m.data || [], O = e.label_key || "label", P = e.value_key || "value";
            i = g.map((_) => ({
              label: _[O] || _.name || _.id,
              value: _[P] || _.id
            }));
            break;
          }
          case "toolsets": {
            let f = (await b.system.listToolSets({
              current: 1,
              page_size: 1e3,
              ...e.params
            })).data || [];
            e.filter && (f = f.filter((g) => Object.entries(e.filter).every(([O, P]) => g[O] === P)));
            const k = e.label_key || "name", m = e.value_key || "id";
            i = f.map((g) => ({
              label: g[k] || g.name,
              value: g[m] || g.id
            }));
            break;
          }
          case "internal": {
            console.warn("Internal data source not yet implemented"), i = [];
            break;
          }
          default:
            i = t || [];
        }
        e.cache && N(l, i), o(i);
      } catch (l) {
        console.error("Failed to load options from data source:", l), n(l), o(t || []);
      } finally {
        p(!1);
      }
    })();
  }, [e, t, r, a, c]), { options: h, loading: u, error: y, refresh: A };
};
export {
  S as A,
  ee as S,
  te as a,
  $ as b,
  se as c,
  ne as d,
  re as e,
  B as f,
  V as u
};
