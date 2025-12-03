import { useContext as C, createContext as L, useState as h, useEffect as _, useCallback as T, useMemo as G } from "react";
import { j as M } from "./vendor.js";
import { message as R } from "antd";
import { a as w } from "./index.js";
import { c as U, a as E } from "./client.js";
import { useRequest as F } from "ahooks";
const O = L({
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
  e ? (t && localStorage.setItem("token", e), U.defaults.headers.common.Authorization = `Bearer ${e}`) : (t && localStorage.removeItem("token"), delete U.defaults.headers.common.Authorization);
}, S = ({ children: e }) => {
  const [t, n] = h(void 0), [A, i] = h(localStorage.getItem("token")), [k, f] = h(!0), { run: l } = F(async () => {
    const o = localStorage.getItem("token");
    return o ? (x(o, !1), w.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (o) => {
      n(o);
    },
    onError: (o) => {
      console.error("Failed to get current user:", o), g();
    },
    onFinally: () => {
      f(!1);
    }
  });
  _(() => {
    l();
  }, []);
  const r = async (o) => {
    try {
      const s = await w.authorization.login(o), { token: u, user: c, needs_mfa: p, password_expired: d, mfa_token: v, mfa_type: m } = s;
      if (p)
        throw { needsMFA: !0, mfaToken: v, mfaType: m, user: c };
      if (d)
        throw { password_expired: !0, user: c, token: u };
      return x(u), i(u), n(c), c;
    } catch (s) {
      throw s && s.needsMFA || s && s.password_expired || R.error("Login failed, please check your username and password"), s;
    }
  }, a = T(async (o) => {
    try {
      const s = await w.oauth.handleCallback(o);
      let u = "", c = null;
      if (s && typeof s == "object")
        if ("code" in s && s.code === "0" && "data" in s) {
          const { token: p, user: d, needs_mfa: v, mfa_token: m, mfa_type: y } = s.data;
          if (v)
            throw { needsMFA: !0, mfaToken: m, mfaType: y, user: d };
          u = p, c = d;
        } else {
          const { token: p, user: d, needs_mfa: v, mfa_token: m, mfa_type: y } = s;
          if (v)
            throw { needsMFA: !0, mfaToken: m, mfaType: y, user: d };
          u = p, c = d;
        }
      return x(u), i(u), n(c), c;
    } catch (s) {
      throw s && s.needsMFA || s && s.passwordExpired, s;
    }
  }, []), g = () => {
    w.authorization.logout(), x(null), i(null), n(null);
  }, I = (o) => {
    n(o);
  };
  return /* @__PURE__ */ M.jsx(
    O.Provider,
    {
      value: {
        user: t,
        token: A,
        loading: k,
        login: r,
        oauthLogin: a,
        logout: g,
        updateUser: I
      },
      children: e
    }
  );
}, V = () => {
  const e = C(O);
  if (e === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return e;
}, K = L({
  siteConfig: null,
  enableMultiOrg: !1,
  loading: !1,
  fetchSiteConfig: async () => null,
  currentOrgId: null,
  setCurrentOrgId: () => {
  },
  clearCurrentOrgId: () => {
  }
}), $ = () => C(K), ee = ({ children: e }) => {
  const { user: t } = B(), { data: n = null, loading: A, runAsync: i } = F(async () => w.system.getSiteConfig(), { manual: !0 });
  _(() => {
    t !== void 0 && i();
  }, [t]);
  const [k, f] = h(null);
  return _(() => {
    k ? localStorage.setItem("orgID", k) : localStorage.removeItem("orgID");
  }, [k]), _(() => {
    var r, a, g;
    let l = localStorage.getItem("orgID");
    if (l) {
      const I = (r = t == null ? void 0 : t.organizations) == null ? void 0 : r.find((o) => o.id === l);
      if (I) {
        f(I.id);
        return;
      }
    }
    f(((g = (a = t == null ? void 0 : t.organizations) == null ? void 0 : a[0]) == null ? void 0 : g.id) ?? null);
  }, [n, t == null ? void 0 : t.organizations]), /* @__PURE__ */ M.jsx(
    K.Provider,
    {
      value: {
        siteConfig: n,
        loading: A,
        enableMultiOrg: (n == null ? void 0 : n.enable_multi_org) ?? !1,
        fetchSiteConfig: i,
        currentOrgId: k,
        setCurrentOrgId: (l) => {
          f(l);
        },
        clearCurrentOrgId: () => {
          f(null);
        }
      },
      children: e
    }
  );
}, te = () => {
  var l;
  const { user: e } = C(O), { currentOrgId: t } = $(), n = (l = e == null ? void 0 : e.roles) == null ? void 0 : l.filter((r) => !r.organization_id || r.organization_id === t), A = () => n ? n.some((r) => r.name === "admin" && !r.organization_id) : !1, i = (r) => n ? A() ? !0 : n.some((a) => a.permissions ? a.permissions.some((g) => g.code === r) : !1) : !1;
  return {
    hasPermission: i,
    hasAllPermissions: (r) => r.every((a) => i(a)),
    hasAnyPermission: (r) => r.some((a) => i(a)),
    isAdmin: A(),
    loading: !e
  };
}, j = L({
  layout: "sidebar",
  setLayout: () => {
  },
  visible: !1,
  setVisible: () => {
  },
  callAI: () => {
  },
  onCallAI: (e) => {
  },
  loaded: !1,
  setLoaded: () => {
  }
}), se = () => C(j), ne = ({ children: e }) => {
  const [t, n] = h("sidebar"), [A, i] = h(!1), [k, f] = h(!1), [l, r] = h(), [a, g] = h(null), I = T((o, s) => {
    i(!0), a ? a(o, s) : r([o, s]);
  }, [a, i]);
  return _(() => {
    a && l && (a(l[0], l[1]), r(void 0));
  }, [a, l]), /* @__PURE__ */ M.jsx(
    j.Provider,
    {
      value: {
        layout: t,
        setLayout: (o) => {
          n(o);
        },
        visible: A,
        setVisible: (o) => {
          i(o);
        },
        callAI: I,
        onCallAI: T((o) => {
          g(() => o);
        }, [g]),
        loaded: k,
        setLoaded: (o) => {
          f(o);
        }
      },
      children: e
    }
  );
}, D = /* @__PURE__ */ new Map(), q = (e, t) => JSON.stringify({ dataSource: e, dependentValues: t }), J = (e, t) => {
  const n = D.get(e);
  return n ? t && t > 0 && Date.now() - n.timestamp > t * 1e3 ? (D.delete(e), null) : n.data : null;
}, N = (e, t) => {
  D.set(e, { data: t, timestamp: Date.now() });
}, oe = (e, t, n) => {
  const [A, i] = h(t || []), [k, f] = h(!1), [l, r] = h(null), [a, g] = h(0), I = () => g((s) => s + 1), o = G(() => !e || e.type === "static" ? !1 : e.depends_on && e.depends_on.length > 0 ? e.depends_on.every(
    (s) => n && n[s] !== void 0 && n[s] !== null
  ) : !0, [e, n]);
  return _(() => {
    if (!o) {
      i(t || []);
      return;
    }
    (async () => {
      try {
        f(!0), r(null);
        const u = q(e, n);
        if (e.cache) {
          const p = J(u, e.cache_ttl);
          if (p) {
            i(p), f(!1);
            return;
          }
        }
        let c = [];
        switch (e.type) {
          case "api": {
            const p = e.url || "", d = e.method || "GET", v = {
              ...n,
              ...e.params
            };
            let m;
            d.toUpperCase() === "GET" ? m = await E(p, { params: v }) : m = await E(p, { params: v });
            const y = Array.isArray(m) ? m : m.data || [], z = e.label_key || "label", P = e.value_key || "value";
            c = y.map((b) => ({
              label: b[z] || b.name || b.id,
              value: b[P] || b.id
            }));
            break;
          }
          case "toolsets": {
            let d = (await w.system.listToolSets({
              current: 1,
              page_size: 1e3,
              ...e.params
            })).data || [];
            e.filter && (d = d.filter((y) => Object.entries(e.filter).every(([z, P]) => y[z] === P)));
            const v = e.label_key || "name", m = e.value_key || "id";
            c = d.map((y) => ({
              label: y[v] || y.name,
              value: y[m] || y.id
            }));
            break;
          }
          case "internal": {
            console.warn("Internal data source not yet implemented"), c = [];
            break;
          }
          default:
            c = t || [];
        }
        e.cache && N(u, c), i(c);
      } catch (u) {
        console.error("Failed to load options from data source:", u), r(u), i(t || []);
      } finally {
        f(!1);
      }
    })();
  }, [e, t, n, o, a]), { options: A, loading: k, error: l, refresh: I };
};
export {
  S as A,
  ee as S,
  te as a,
  $ as b,
  se as c,
  oe as d,
  ne as e,
  B as f,
  V as u
};
