import { useContext as b, createContext as T, useState as h, useEffect as k, useCallback as O, useMemo as R } from "react";
import { j as D } from "./vendor.js";
import { message as U } from "antd";
import { a as w } from "./index.js";
import { c as F, a as E } from "./client.js";
import { useRequest as M } from "ahooks";
import { useTranslation as B } from "react-i18next";
const z = T({
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
}), $ = () => b(z), x = (e, t = !0) => {
  e ? (t && localStorage.setItem("token", e), F.defaults.headers.common.Authorization = `Bearer ${e}`) : (t && localStorage.removeItem("token"), delete F.defaults.headers.common.Authorization);
}, ee = ({ children: e }) => {
  const [t, n] = h(void 0), [A, c] = h(localStorage.getItem("token")), [y, v] = h(!0), { run: p } = M(async () => {
    const r = localStorage.getItem("token");
    return r ? (x(r, !1), w.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (r) => {
      n(r);
    },
    onError: (r) => {
      console.error("Failed to get current user:", r), g();
    },
    onFinally: () => {
      v(!1);
    }
  });
  k(() => {
    p();
  }, []);
  const a = async (r) => {
    try {
      const o = await w.authorization.login(r), { token: l, user: i, needs_mfa: f, password_expired: m, mfa_token: s, mfa_type: d } = o;
      if (f)
        throw { needsMFA: !0, mfaToken: s, mfaType: d, user: i };
      if (m)
        throw { password_expired: !0, user: i, token: l };
      return x(l), c(l), n(i), i;
    } catch (o) {
      throw o && o.needsMFA || o && o.password_expired || U.error("Login failed, please check your username and password"), o;
    }
  }, u = O(async (r) => {
    try {
      const o = await w.oauth.handleCallback(r);
      let l = "", i = null;
      if (o && typeof o == "object")
        if ("code" in o && o.code === "0" && "data" in o) {
          const { token: f, user: m, needs_mfa: s, mfa_token: d, mfa_type: C } = o.data;
          if (s)
            throw { needsMFA: !0, mfaToken: d, mfaType: C, user: m };
          l = f, i = m;
        } else {
          const { token: f, user: m, needs_mfa: s, mfa_token: d, mfa_type: C } = o;
          if (s)
            throw { needsMFA: !0, mfaToken: d, mfaType: C, user: m };
          l = f, i = m;
        }
      return x(l), c(l), n(i), i;
    } catch (o) {
      throw o && o.needsMFA || o && o.passwordExpired, o;
    }
  }, []), g = () => {
    w.authorization.logout(), x(null), c(null), n(null);
  }, I = (r) => {
    n(r);
  };
  return /* @__PURE__ */ D.jsx(
    z.Provider,
    {
      value: {
        user: t,
        token: A,
        loading: y,
        login: a,
        oauthLogin: u,
        logout: g,
        updateUser: I
      },
      children: e
    }
  );
}, te = () => {
  const e = b(z);
  if (e === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return e;
}, j = T({
  siteConfig: null,
  enableMultiOrg: !1,
  loading: !1,
  fetchSiteConfig: async () => null,
  currentOrgId: null,
  setCurrentOrgId: () => {
  },
  clearCurrentOrgId: () => {
  }
}), q = () => b(j), oe = ({ children: e }) => {
  const { user: t } = $(), { data: n = null, loading: A, runAsync: c } = M(async () => w.system.getSiteConfig(), { manual: !0 });
  k(() => {
    t !== void 0 && c();
  }, [t]);
  const [y, v] = h(localStorage.getItem("orgID"));
  return k(() => {
    y ? localStorage.setItem("orgID", y) : localStorage.removeItem("orgID");
  }, [y]), k(() => {
    var p, a, u, g, I, r, o;
    if (t) {
      let l = localStorage.getItem("orgID");
      if (console.log(t, l), l) {
        const i = (p = t == null ? void 0 : t.organizations) == null ? void 0 : p.find((f) => f.id === l);
        if (i) {
          console.log("set2 ", ((u = (a = t == null ? void 0 : t.organizations) == null ? void 0 : a[0]) == null ? void 0 : u.id) ?? null), v(i.id);
          return;
        }
      }
      console.log("set ", ((I = (g = t == null ? void 0 : t.organizations) == null ? void 0 : g[0]) == null ? void 0 : I.id) ?? null), v(((o = (r = t == null ? void 0 : t.organizations) == null ? void 0 : r[0]) == null ? void 0 : o.id) ?? null);
    }
  }, [n, t == null ? void 0 : t.organizations]), /* @__PURE__ */ D.jsx(
    j.Provider,
    {
      value: {
        siteConfig: n,
        loading: A,
        enableMultiOrg: (n == null ? void 0 : n.enable_multi_org) ?? !1,
        fetchSiteConfig: c,
        currentOrgId: y,
        setCurrentOrgId: (p) => {
          v(p);
        },
        clearCurrentOrgId: () => {
          v(null);
        }
      },
      children: e
    }
  );
}, se = () => {
  var p;
  const { user: e } = b(z), { currentOrgId: t } = q(), n = (p = e == null ? void 0 : e.roles) == null ? void 0 : p.filter((a) => !a.organization_id || a.organization_id === t), A = () => n ? n.some((a) => a.name === "admin" && !a.organization_id) : !1, c = (a) => n ? A() ? !0 : n.some((u) => u.permissions ? u.permissions.some((g) => g.code === a) : !1) : !1;
  return {
    hasPermission: c,
    hasAllPermissions: (a) => a.every((u) => c(u)),
    hasAnyPermission: (a) => a.some((u) => c(u)),
    isAdmin: A(),
    loading: !e
  };
}, G = T({
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
  },
  fetchConversations: () => Promise.resolve([]),
  fetchConversationsLoading: !1,
  conversations: void 0,
  activeConversationKey: void 0,
  setActiveConversationKey: () => {
  }
}), ne = () => b(G), re = ({ children: e }) => {
  const { t } = B("ai"), [n, A] = h("sidebar"), [c, y] = h(!1), [v, p] = h(!1), [a, u] = h(void 0), [g, I] = h(), [r, o] = h(null);
  k(() => {
    const s = localStorage.getItem("activeConversationKey");
    s && u(s);
  }, []);
  const l = O((s, d) => {
    y(!0), r ? r(s, d) : I([s, d]);
  }, [r, y]);
  k(() => {
    r && g && (r(g[0], g[1]), I(void 0));
  }, [r, g]);
  const { loading: i, runAsync: f, data: m } = M(async () => (await w.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: c,
    onError: (s) => {
      U.error(t("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: s.message ?? s }));
    }
  });
  return /* @__PURE__ */ D.jsx(
    G.Provider,
    {
      value: {
        layout: n,
        setLayout: (s) => {
          A(s);
        },
        visible: c,
        setVisible: (s) => {
          y(s);
        },
        callAI: l,
        onCallAI: O((s) => {
          o(() => s);
        }, [o]),
        loaded: v,
        setLoaded: (s) => {
          p(s);
        },
        fetchConversations: f,
        fetchConversationsLoading: i,
        conversations: m,
        activeConversationKey: a,
        setActiveConversationKey: (s) => {
          u(s), localStorage.setItem("activeConversationKey", s);
        }
      },
      children: e
    }
  );
}, P = /* @__PURE__ */ new Map(), J = (e, t) => JSON.stringify({ dataSource: e, dependentValues: t }), N = (e, t) => {
  const n = P.get(e);
  return n ? t && t > 0 && Date.now() - n.timestamp > t * 1e3 ? (P.delete(e), null) : n.data : null;
}, S = (e, t) => {
  P.set(e, { data: t, timestamp: Date.now() });
}, ae = (e, t, n) => {
  const [A, c] = h(t || []), [y, v] = h(!1), [p, a] = h(null), [u, g] = h(0), I = () => g((o) => o + 1), r = R(() => !e || e.type === "static" ? !1 : e.depends_on && e.depends_on.length > 0 ? e.depends_on.every(
    (o) => n && n[o] !== void 0 && n[o] !== null
  ) : !0, [e, n]);
  return k(() => {
    if (!r) {
      c(t || []);
      return;
    }
    (async () => {
      try {
        v(!0), a(null);
        const l = J(e, n);
        if (e.cache) {
          const f = N(l, e.cache_ttl);
          if (f) {
            c(f), v(!1);
            return;
          }
        }
        let i = [];
        switch (e.type) {
          case "api": {
            const f = e.url || "", m = e.method || "GET", s = {
              ...n,
              ...e.params
            };
            let d;
            m.toUpperCase() === "GET" ? d = await E(f, { params: s }) : d = await E(f, { params: s });
            const C = Array.isArray(d) ? d : d.data || [], K = e.label_key || "label", L = e.value_key || "value";
            i = C.map((_) => ({
              label: _[K] || _.name || _.id,
              value: _[L] || _.id
            }));
            break;
          }
          case "toolsets": {
            let m = (await w.system.listToolSets({
              current: 1,
              page_size: 1e3,
              ...e.params
            })).data || [];
            e.filter && (m = m.filter((C) => Object.entries(e.filter).every(([K, L]) => C[K] === L)));
            const s = e.label_key || "name", d = e.value_key || "id";
            i = m.map((C) => ({
              label: C[s] || C.name,
              value: C[d] || C.id
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
        e.cache && S(l, i), c(i);
      } catch (l) {
        console.error("Failed to load options from data source:", l), a(l), c(t || []);
      } finally {
        v(!1);
      }
    })();
  }, [e, t, n, r, u]), { options: A, loading: y, error: p, refresh: I };
};
export {
  ee as A,
  oe as S,
  se as a,
  q as b,
  ne as c,
  ae as d,
  re as e,
  $ as f,
  te as u
};
