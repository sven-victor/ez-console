import { useContext as b, createContext as T, useState as h, useEffect as k, useCallback as O, useMemo as R } from "react";
import { j as D } from "./vendor.js";
import { message as U } from "antd";
import { a as w } from "./index.js";
import { c as F, a as E } from "./client.js";
import { useRequest as M } from "ahooks";
import { useTranslation as B } from "react-i18next";
const K = T({
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
}), $ = () => b(K), x = (e, t = !0) => {
  e ? (t && localStorage.setItem("token", e), F.defaults.headers.common.Authorization = `Bearer ${e}`) : (t && localStorage.removeItem("token"), delete F.defaults.headers.common.Authorization);
}, ee = ({ children: e }) => {
  const [t, o] = h(void 0), [A, i] = h(localStorage.getItem("token")), [y, v] = h(!0), { run: p } = M(async () => {
    const r = localStorage.getItem("token");
    return r ? (x(r, !1), w.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
    },
    onSuccess: (r) => {
      o(r);
    },
    onError: (r) => {
      console.error("Failed to get current user:", r), m();
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
      const s = await w.authorization.login(r), { token: u, user: l, needs_mfa: g, password_expired: d, mfa_token: n, mfa_type: f } = s;
      if (g)
        throw { needsMFA: !0, mfaToken: n, mfaType: f, user: l };
      if (d)
        throw { password_expired: !0, user: l, token: u };
      return x(u), i(u), o(l), l;
    } catch (s) {
      throw s && s.needsMFA || s && s.password_expired || U.error("Login failed, please check your username and password"), s;
    }
  }, c = O(async (r) => {
    try {
      const s = await w.oauth.handleCallback(r);
      let u = "", l = null;
      if (s && typeof s == "object")
        if ("code" in s && s.code === "0" && "data" in s) {
          const { token: g, user: d, needs_mfa: n, mfa_token: f, mfa_type: C } = s.data;
          if (n)
            throw { needsMFA: !0, mfaToken: f, mfaType: C, user: d };
          u = g, l = d;
        } else {
          const { token: g, user: d, needs_mfa: n, mfa_token: f, mfa_type: C } = s;
          if (n)
            throw { needsMFA: !0, mfaToken: f, mfaType: C, user: d };
          u = g, l = d;
        }
      return x(u), i(u), o(l), l;
    } catch (s) {
      throw s && s.needsMFA || s && s.passwordExpired, s;
    }
  }, []), m = () => {
    w.authorization.logout(), x(null), i(null), o(null);
  }, I = (r) => {
    o(r);
  };
  return /* @__PURE__ */ D.jsx(
    K.Provider,
    {
      value: {
        user: t,
        token: A,
        loading: y,
        login: a,
        oauthLogin: c,
        logout: m,
        updateUser: I
      },
      children: e
    }
  );
}, te = () => {
  const e = b(K);
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
}), q = () => b(j), se = ({ children: e }) => {
  const { user: t } = $(), { data: o = null, loading: A, runAsync: i } = M(async () => w.system.getSiteConfig(), { manual: !0 });
  k(() => {
    t !== void 0 && i();
  }, [t]);
  const [y, v] = h(null);
  return k(() => {
    y ? localStorage.setItem("orgID", y) : localStorage.removeItem("orgID");
  }, [y]), k(() => {
    var a, c, m;
    let p = localStorage.getItem("orgID");
    if (p) {
      const I = (a = t == null ? void 0 : t.organizations) == null ? void 0 : a.find((r) => r.id === p);
      if (I) {
        v(I.id);
        return;
      }
    }
    v(((m = (c = t == null ? void 0 : t.organizations) == null ? void 0 : c[0]) == null ? void 0 : m.id) ?? null);
  }, [o, t == null ? void 0 : t.organizations]), /* @__PURE__ */ D.jsx(
    j.Provider,
    {
      value: {
        siteConfig: o,
        loading: A,
        enableMultiOrg: (o == null ? void 0 : o.enable_multi_org) ?? !1,
        fetchSiteConfig: i,
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
}, ne = () => {
  var p;
  const { user: e } = b(K), { currentOrgId: t } = q(), o = (p = e == null ? void 0 : e.roles) == null ? void 0 : p.filter((a) => !a.organization_id || a.organization_id === t), A = () => o ? o.some((a) => a.name === "admin" && !a.organization_id) : !1, i = (a) => o ? A() ? !0 : o.some((c) => c.permissions ? c.permissions.some((m) => m.code === a) : !1) : !1;
  return {
    hasPermission: i,
    hasAllPermissions: (a) => a.every((c) => i(c)),
    hasAnyPermission: (a) => a.some((c) => i(c)),
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
}), oe = () => b(G), re = ({ children: e }) => {
  const { t } = B("ai"), [o, A] = h("sidebar"), [i, y] = h(!1), [v, p] = h(!1), [a, c] = h(void 0), [m, I] = h(), [r, s] = h(null);
  k(() => {
    const n = localStorage.getItem("activeConversationKey");
    n && c(n);
  }, []);
  const u = O((n, f) => {
    y(!0), r ? r(n, f) : I([n, f]);
  }, [r, y]);
  k(() => {
    r && m && (r(m[0], m[1]), I(void 0));
  }, [r, m]);
  const { loading: l, runAsync: g, data: d } = M(async () => (await w.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: i,
    onError: (n) => {
      U.error(t("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: n.message ?? n }));
    }
  });
  return /* @__PURE__ */ D.jsx(
    G.Provider,
    {
      value: {
        layout: o,
        setLayout: (n) => {
          A(n);
        },
        visible: i,
        setVisible: (n) => {
          y(n);
        },
        callAI: u,
        onCallAI: O((n) => {
          s(() => n);
        }, [s]),
        loaded: v,
        setLoaded: (n) => {
          p(n);
        },
        fetchConversations: g,
        fetchConversationsLoading: l,
        conversations: d,
        activeConversationKey: a,
        setActiveConversationKey: (n) => {
          c(n), localStorage.setItem("activeConversationKey", n);
        }
      },
      children: e
    }
  );
}, P = /* @__PURE__ */ new Map(), J = (e, t) => JSON.stringify({ dataSource: e, dependentValues: t }), N = (e, t) => {
  const o = P.get(e);
  return o ? t && t > 0 && Date.now() - o.timestamp > t * 1e3 ? (P.delete(e), null) : o.data : null;
}, H = (e, t) => {
  P.set(e, { data: t, timestamp: Date.now() });
}, ae = (e, t, o) => {
  const [A, i] = h(t || []), [y, v] = h(!1), [p, a] = h(null), [c, m] = h(0), I = () => m((s) => s + 1), r = R(() => !e || e.type === "static" ? !1 : e.depends_on && e.depends_on.length > 0 ? e.depends_on.every(
    (s) => o && o[s] !== void 0 && o[s] !== null
  ) : !0, [e, o]);
  return k(() => {
    if (!r) {
      i(t || []);
      return;
    }
    (async () => {
      try {
        v(!0), a(null);
        const u = J(e, o);
        if (e.cache) {
          const g = N(u, e.cache_ttl);
          if (g) {
            i(g), v(!1);
            return;
          }
        }
        let l = [];
        switch (e.type) {
          case "api": {
            const g = e.url || "", d = e.method || "GET", n = {
              ...o,
              ...e.params
            };
            let f;
            d.toUpperCase() === "GET" ? f = await E(g, { params: n }) : f = await E(g, { params: n });
            const C = Array.isArray(f) ? f : f.data || [], z = e.label_key || "label", L = e.value_key || "value";
            l = C.map((_) => ({
              label: _[z] || _.name || _.id,
              value: _[L] || _.id
            }));
            break;
          }
          case "toolsets": {
            let d = (await w.system.listToolSets({
              current: 1,
              page_size: 1e3,
              ...e.params
            })).data || [];
            e.filter && (d = d.filter((C) => Object.entries(e.filter).every(([z, L]) => C[z] === L)));
            const n = e.label_key || "name", f = e.value_key || "id";
            l = d.map((C) => ({
              label: C[n] || C.name,
              value: C[f] || C.id
            }));
            break;
          }
          case "internal": {
            console.warn("Internal data source not yet implemented"), l = [];
            break;
          }
          default:
            l = t || [];
        }
        e.cache && H(u, l), i(l);
      } catch (u) {
        console.error("Failed to load options from data source:", u), a(u), i(t || []);
      } finally {
        v(!1);
      }
    })();
  }, [e, t, o, r, c]), { options: A, loading: y, error: p, refresh: I };
};
export {
  ee as A,
  se as S,
  ne as a,
  q as b,
  oe as c,
  ae as d,
  re as e,
  $ as f,
  te as u
};
