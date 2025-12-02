import { useContext as C, createContext as D, useState as A, useEffect as b, useCallback as j, useMemo as G } from "react";
import { j as L } from "./vendor.js";
import { message as R } from "antd";
import { a as w } from "./index.js";
import { c as M, a as U } from "./client.js";
import { useRequest as E } from "ahooks";
const O = D({
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
}), B = () => C(O), x = (e, t = !0) => {
  e ? (t && localStorage.setItem("token", e), M.defaults.headers.common.Authorization = `Bearer ${e}`) : (t && localStorage.removeItem("token"), delete M.defaults.headers.common.Authorization);
}, S = ({ children: e }) => {
  const [t, n] = A(void 0), [y, o] = A(localStorage.getItem("token")), [g, c] = A(!0), { run: f } = E(async () => {
    const a = localStorage.getItem("token");
    return a ? (x(a, !1), w.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (a) => {
      n(a);
    },
    onError: (a) => {
      console.error("Failed to get current user:", a), I();
    },
    onFinally: () => {
      c(!1);
    }
  });
  b(() => {
    f();
  }, []);
  const r = async (a) => {
    try {
      const s = await w.authorization.login(a), { token: u, user: i, needs_mfa: h, password_expired: m, mfa_token: k, mfa_type: d } = s;
      if (h)
        throw { needsMFA: !0, mfaToken: k, mfaType: d, user: i };
      if (m)
        throw { password_expired: !0, user: i, token: u };
      return x(u), o(u), n(i), i;
    } catch (s) {
      throw s && s.needsMFA || s && s.password_expired || R.error("Login failed, please check your username and password"), s;
    }
  }, l = j(async (a) => {
    try {
      const s = await w.oauth.handleCallback(a);
      let u = "", i = null;
      if (s && typeof s == "object")
        if ("code" in s && s.code === "0" && "data" in s) {
          const { token: h, user: m, needs_mfa: k, mfa_token: d, mfa_type: p } = s.data;
          if (k)
            throw { needsMFA: !0, mfaToken: d, mfaType: p, user: m };
          u = h, i = m;
        } else {
          const { token: h, user: m, needs_mfa: k, mfa_token: d, mfa_type: p } = s;
          if (k)
            throw { needsMFA: !0, mfaToken: d, mfaType: p, user: m };
          u = h, i = m;
        }
      return x(u), o(u), n(i), i;
    } catch (s) {
      throw s && s.needsMFA || s && s.passwordExpired, s;
    }
  }, []), I = () => {
    w.authorization.logout(), x(null), o(null), n(null);
  }, v = (a) => {
    n(a);
  };
  return /* @__PURE__ */ L.jsx(
    O.Provider,
    {
      value: {
        user: t,
        token: y,
        loading: g,
        login: r,
        oauthLogin: l,
        logout: I,
        updateUser: v
      },
      children: e
    }
  );
}, V = () => {
  const e = C(O);
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
  const { user: t } = B(), { data: n = null, loading: y, runAsync: o } = E(async () => w.system.getSiteConfig(), { manual: !0 });
  b(() => {
    t !== void 0 && o();
  }, [t]);
  const [g, c] = A(null);
  return b(() => {
    g ? localStorage.setItem("orgID", g) : localStorage.removeItem("orgID");
  }, [g]), b(() => {
    var r, l, I;
    let f = localStorage.getItem("orgID");
    if (f) {
      const v = (r = t == null ? void 0 : t.organizations) == null ? void 0 : r.find((a) => a.id === f);
      if (v) {
        c(v.id);
        return;
      }
    }
    c(((I = (l = t == null ? void 0 : t.organizations) == null ? void 0 : l[0]) == null ? void 0 : I.id) ?? null);
  }, [n, t == null ? void 0 : t.organizations]), /* @__PURE__ */ L.jsx(
    F.Provider,
    {
      value: {
        siteConfig: n,
        loading: y,
        enableMultiOrg: (n == null ? void 0 : n.enable_multi_org) ?? !1,
        fetchSiteConfig: o,
        currentOrgId: g,
        setCurrentOrgId: (f) => {
          c(f);
        },
        clearCurrentOrgId: () => {
          c(null);
        }
      },
      children: e
    }
  );
}, te = () => {
  var f;
  const { user: e } = C(O), { currentOrgId: t } = $(), n = (f = e == null ? void 0 : e.roles) == null ? void 0 : f.filter((r) => !r.organization_id || r.organization_id === t), y = () => n ? n.some((r) => r.name === "admin" && !r.organization_id) : !1, o = (r) => n ? y() ? !0 : n.some((l) => l.permissions ? l.permissions.some((I) => I.code === r) : !1) : !1;
  return {
    hasPermission: o,
    hasAllPermissions: (r) => r.every((l) => o(l)),
    hasAnyPermission: (r) => r.some((l) => o(l)),
    isAdmin: y(),
    loading: !e
  };
}, K = D({
  layout: "sidebar",
  setLayout: () => {
  },
  visible: !1,
  setVisible: () => {
  },
  callAI: () => {
  },
  onCallAI: (e) => {
  }
}), se = () => C(K), ne = ({ children: e }) => {
  const [t, n] = A("sidebar"), [y, o] = A(!1), [g, c] = A(null), f = (r, l) => {
    g && g(r, l);
  };
  return /* @__PURE__ */ L.jsx(
    K.Provider,
    {
      value: {
        layout: t,
        setLayout: (r) => {
          n(r);
        },
        visible: y,
        setVisible: (r) => {
          o(r);
        },
        callAI: f,
        onCallAI: (r) => {
          c(r);
        }
      },
      children: e
    }
  );
}, T = /* @__PURE__ */ new Map(), q = (e, t) => JSON.stringify({ dataSource: e, dependentValues: t }), J = (e, t) => {
  const n = T.get(e);
  return n ? t && t > 0 && Date.now() - n.timestamp > t * 1e3 ? (T.delete(e), null) : n.data : null;
}, N = (e, t) => {
  T.set(e, { data: t, timestamp: Date.now() });
}, re = (e, t, n) => {
  const [y, o] = A(t || []), [g, c] = A(!1), [f, r] = A(null), [l, I] = A(0), v = () => I((s) => s + 1), a = G(() => !e || e.type === "static" ? !1 : e.depends_on && e.depends_on.length > 0 ? e.depends_on.every(
    (s) => n && n[s] !== void 0 && n[s] !== null
  ) : !0, [e, n]);
  return b(() => {
    if (!a) {
      o(t || []);
      return;
    }
    (async () => {
      try {
        c(!0), r(null);
        const u = q(e, n);
        if (e.cache) {
          const h = J(u, e.cache_ttl);
          if (h) {
            o(h), c(!1);
            return;
          }
        }
        let i = [];
        switch (e.type) {
          case "api": {
            const h = e.url || "", m = e.method || "GET", k = {
              ...n,
              ...e.params
            };
            let d;
            m.toUpperCase() === "GET" ? d = await U(h, { params: k }) : d = await U(h, { params: k });
            const p = Array.isArray(d) ? d : d.data || [], z = e.label_key || "label", P = e.value_key || "value";
            i = p.map((_) => ({
              label: _[z] || _.name || _.id,
              value: _[P] || _.id
            }));
            break;
          }
          case "toolsets": {
            let m = (await w.system.listToolSets({
              current: 1,
              page_size: 1e3,
              ...e.params
            })).data || [];
            e.filter && (m = m.filter((p) => Object.entries(e.filter).every(([z, P]) => p[z] === P)));
            const k = e.label_key || "name", d = e.value_key || "id";
            i = m.map((p) => ({
              label: p[k] || p.name,
              value: p[d] || p.id
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
        e.cache && N(u, i), o(i);
      } catch (u) {
        console.error("Failed to load options from data source:", u), r(u), o(t || []);
      } finally {
        c(!1);
      }
    })();
  }, [e, t, n, a, l]), { options: y, loading: g, error: f, refresh: v };
};
export {
  S as A,
  ee as S,
  te as a,
  $ as b,
  se as c,
  re as d,
  ne as e,
  B as f,
  V as u
};
