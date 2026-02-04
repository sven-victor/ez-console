import { useContext as P, createContext as T, useState as v, useEffect as _, useCallback as L, useMemo as R } from "react";
import { j as D } from "./vendor.js";
import { message as E } from "antd";
import { a as k } from "./index.js";
import { c as F, a as U } from "./client.js";
import { useRequest as M } from "ahooks";
import { g as B } from "./base.js";
import { useTranslation as $ } from "react-i18next";
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
  },
  error: void 0
}), q = () => P(K), x = (e, t = !0) => {
  e ? (t && localStorage.setItem("token", e), F.defaults.headers.common.Authorization = `Bearer ${e}`) : (t && localStorage.removeItem("token"), delete F.defaults.headers.common.Authorization);
}, se = ({ children: e }) => {
  const [t, s] = v(void 0), [C, l] = v(localStorage.getItem("token")), [I, y] = v(!0), { run: A, error: d } = M(async () => {
    const r = localStorage.getItem("token");
    return r ? (x(r, !1), k.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      s(void 0);
    },
    onSuccess: (r) => {
      s(r);
    },
    onError: (r) => {
      console.log([r]), console.error("Failed to get current user:", r), m();
    },
    onFinally: () => {
      y(!1);
    }
  });
  _(() => {
    A();
  }, []);
  const a = async (r) => {
    try {
      const o = await k.authorization.login(r), { token: u, user: c, needs_mfa: p, password_expired: n, mfa_token: f, mfa_type: h } = o;
      if (p)
        throw { needsMFA: !0, mfaToken: f, mfaType: h, user: c };
      if (n)
        throw { password_expired: !0, user: c, token: u };
      return x(u), l(u), s(c), c;
    } catch (o) {
      throw o && o.needsMFA || o && o.password_expired || E.error("Login failed, please check your username and password"), o;
    }
  }, i = L(async (r) => {
    try {
      const o = await k.oauth.handleCallback(r, { headers: { "X-Base-Path": B() } });
      let u = "", c = null;
      if (o && typeof o == "object")
        if ("code" in o && o.code === "0" && "data" in o) {
          const { token: p, user: n, needs_mfa: f, mfa_token: h, mfa_type: w } = o.data;
          if (f)
            throw { needsMFA: !0, mfaToken: h, mfaType: w, user: n };
          u = p, c = n;
        } else {
          const { token: p, user: n, needs_mfa: f, mfa_token: h, mfa_type: w } = o;
          if (f)
            throw { needsMFA: !0, mfaToken: h, mfaType: w, user: n };
          u = p, c = n;
        }
      return x(u), l(u), s(c), c;
    } catch (o) {
      throw s(void 0), o && o.needsMFA || o && o.passwordExpired, o;
    }
  }, []), m = () => {
    k.authorization.logout(), x(null), l(null), s(null);
  }, g = (r) => {
    s(r);
  };
  return /* @__PURE__ */ D.jsx(
    K.Provider,
    {
      value: {
        user: t,
        token: C,
        loading: I,
        login: a,
        oauthLogin: i,
        logout: m,
        updateUser: g,
        error: d
      },
      children: e
    }
  );
}, oe = () => {
  const e = P(K);
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
  },
  error: void 0
}), J = () => P(j), ne = ({ children: e }) => {
  const { user: t } = q(), { data: s = null, loading: C, runAsync: l, error: I } = M(async () => k.system.getSiteConfig(), {
    manual: !0
  });
  _(() => {
    t !== void 0 && l();
  }, [t]);
  const [y, A] = v(localStorage.getItem("orgID"));
  return _(() => {
    y ? localStorage.setItem("orgID", y) : localStorage.removeItem("orgID");
  }, [y]), _(() => {
    var d, a, i;
    if (t) {
      let m = localStorage.getItem("orgID");
      if (m) {
        const g = (d = t == null ? void 0 : t.organizations) == null ? void 0 : d.find((r) => r.id === m);
        if (g) {
          A(g.id);
          return;
        }
      }
      A(((i = (a = t == null ? void 0 : t.organizations) == null ? void 0 : a[0]) == null ? void 0 : i.id) ?? null);
    }
  }, [s, t == null ? void 0 : t.organizations]), /* @__PURE__ */ D.jsx(
    j.Provider,
    {
      value: {
        siteConfig: s,
        loading: C,
        enableMultiOrg: (s == null ? void 0 : s.enable_multi_org) ?? !1,
        fetchSiteConfig: l,
        currentOrgId: y,
        setCurrentOrgId: (d) => {
          A(d);
        },
        clearCurrentOrgId: () => {
          A(null);
        },
        error: I
      },
      children: e
    }
  );
}, re = () => {
  var d;
  const { user: e } = P(K), { currentOrgId: t } = J(), s = (d = e == null ? void 0 : e.roles) == null ? void 0 : d.filter((a) => !a.organization_id || a.organization_id === t), C = () => s ? s.some((a) => a.name === "admin" && !a.organization_id) : !1, l = (a) => s ? C() ? !0 : s.some((i) => i.permissions ? i.permissions.some((m) => m.code === a) : !1) : !1;
  return {
    hasPermission: l,
    hasAllPermissions: (a) => a.every((i) => l(i)),
    hasAnyPermission: (a) => a.some((i) => l(i)),
    hasGlobalPermission: (a) => s ? C() ? !0 : s.some((i) => i.organization_id || !i.permissions ? !1 : i.permissions.some((m) => m.code === a)) : !1,
    isAdmin: C(),
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
}), ae = () => P(G), ie = ({ children: e }) => {
  const { t } = $("ai"), [s, C] = v("sidebar"), [l, I] = v(!1), [y, A] = v(!1), [d, a] = v(void 0), [i, m] = v(), [g, r] = v(null);
  _(() => {
    const n = localStorage.getItem("activeConversationKey");
    n && a(n);
  }, []);
  const o = L((n, f) => {
    I(!0), g ? g(n, f) : m([n, f]);
  }, [g, I]);
  _(() => {
    g && i && (g(i[0], i[1]), m(void 0));
  }, [g, i]);
  const { loading: u, runAsync: c, data: p } = M(async () => (await k.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: l,
    onError: (n) => {
      E.error(t("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: n.message ?? n }));
    }
  });
  return /* @__PURE__ */ D.jsx(
    G.Provider,
    {
      value: {
        layout: s,
        setLayout: (n) => {
          C(n);
        },
        visible: l,
        setVisible: (n) => {
          I(n);
        },
        callAI: o,
        onCallAI: L((n) => {
          r(() => n);
        }, [r]),
        loaded: y,
        setLoaded: (n) => {
          A(n);
        },
        fetchConversations: c,
        fetchConversationsLoading: u,
        conversations: p,
        activeConversationKey: d,
        setActiveConversationKey: (n) => {
          a(n), localStorage.setItem("activeConversationKey", n);
        }
      },
      children: e
    }
  );
}, O = /* @__PURE__ */ new Map(), N = (e, t) => JSON.stringify({ dataSource: e, dependentValues: t }), S = (e, t) => {
  const s = O.get(e);
  return s ? t && t > 0 && Date.now() - s.timestamp > t * 1e3 ? (O.delete(e), null) : s.data : null;
}, X = (e, t) => {
  O.set(e, { data: t, timestamp: Date.now() });
}, le = (e, t, s) => {
  const [C, l] = v(t || []), [I, y] = v(!1), [A, d] = v(null), [a, i] = v(0), m = () => i((r) => r + 1), g = R(() => !e || e.type === "static" ? !1 : e.depends_on && e.depends_on.length > 0 ? e.depends_on.every(
    (r) => s && s[r] !== void 0 && s[r] !== null
  ) : !0, [e, s]);
  return _(() => {
    if (!g) {
      l(t || []);
      return;
    }
    (async () => {
      try {
        y(!0), d(null);
        const o = N(e, s);
        if (e.cache) {
          const c = S(o, e.cache_ttl);
          if (c) {
            l(c), y(!1);
            return;
          }
        }
        let u = [];
        switch (e.type) {
          case "api": {
            const c = e.url || "", p = e.method || "GET", n = {
              ...s,
              ...e.params
            };
            let f;
            p.toUpperCase() === "GET" ? f = await U(c, { params: n }) : f = await U(c, { params: n });
            const h = Array.isArray(f) ? f : f.data || [], w = e.label_key || "label", z = e.value_key || "value";
            u = h.map((b) => ({
              label: b[w] || b.name || b.id,
              value: b[z] || b.id
            }));
            break;
          }
          case "toolsets": {
            let p = (await k.system.listToolSets({
              current: 1,
              page_size: 1e3,
              ...e.params
            })).data || [];
            e.filter && (p = p.filter((h) => Object.entries(e.filter).every(([w, z]) => h[w] === z)));
            const n = e.label_key || "name", f = e.value_key || "id";
            u = p.map((h) => ({
              label: h[n] || h.name,
              value: h[f] || h.id
            }));
            break;
          }
          case "internal": {
            console.warn("Internal data source not yet implemented"), u = [];
            break;
          }
          default:
            u = t || [];
        }
        e.cache && X(o, u), l(u);
      } catch (o) {
        console.error("Failed to load options from data source:", o), d(o), l(t || []);
      } finally {
        y(!1);
      }
    })();
  }, [e, t, s, g, a]), { options: C, loading: I, error: A, refresh: m };
};
export {
  se as A,
  ne as S,
  oe as a,
  re as b,
  J as c,
  le as d,
  ie as e,
  q as f,
  ae as u
};
