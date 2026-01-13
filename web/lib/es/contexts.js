import { useContext as x, createContext as T, useState as g, useEffect as _, useCallback as z, useMemo as B } from "react";
import { j as D } from "./vendor.js";
import { message as E } from "antd";
import { a as k } from "./index.js";
import { c as F, a as U } from "./client.js";
import { useRequest as M } from "ahooks";
import { g as G } from "./base.js";
import { useTranslation as $ } from "react-i18next";
const L = T({
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
}), q = () => x(L), K = (e, t = !0) => {
  e ? (t && localStorage.setItem("token", e), F.defaults.headers.common.Authorization = `Bearer ${e}`) : (t && localStorage.removeItem("token"), delete F.defaults.headers.common.Authorization);
}, oe = ({ children: e }) => {
  const [t, n] = g(void 0), [C, i] = g(localStorage.getItem("token")), [A, h] = g(!0), { run: v, error: a } = M(async () => {
    const r = localStorage.getItem("token");
    return r ? (K(r, !1), k.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      n(void 0);
    },
    onSuccess: (r) => {
      n(r);
    },
    onError: (r) => {
      console.log([r]), console.error("Failed to get current user:", r), I();
    },
    onFinally: () => {
      h(!1);
    }
  });
  _(() => {
    v();
  }, []);
  const u = async (r) => {
    try {
      const o = await k.authorization.login(r), { token: c, user: l, needs_mfa: p, password_expired: s, mfa_token: f, mfa_type: m } = o;
      if (p)
        throw { needsMFA: !0, mfaToken: f, mfaType: m, user: l };
      if (s)
        throw { password_expired: !0, user: l, token: c };
      return K(c), i(c), n(l), l;
    } catch (o) {
      throw o && o.needsMFA || o && o.password_expired || E.error("Login failed, please check your username and password"), o;
    }
  }, y = z(async (r) => {
    try {
      const o = await k.oauth.handleCallback(r, { headers: { "X-Base-Path": G() } });
      let c = "", l = null;
      if (o && typeof o == "object")
        if ("code" in o && o.code === "0" && "data" in o) {
          const { token: p, user: s, needs_mfa: f, mfa_token: m, mfa_type: w } = o.data;
          if (f)
            throw { needsMFA: !0, mfaToken: m, mfaType: w, user: s };
          c = p, l = s;
        } else {
          const { token: p, user: s, needs_mfa: f, mfa_token: m, mfa_type: w } = o;
          if (f)
            throw { needsMFA: !0, mfaToken: m, mfaType: w, user: s };
          c = p, l = s;
        }
      return K(c), i(c), n(l), l;
    } catch (o) {
      throw n(void 0), o && o.needsMFA || o && o.passwordExpired, o;
    }
  }, []), I = () => {
    k.authorization.logout(), K(null), i(null), n(null);
  }, d = (r) => {
    n(r);
  };
  return /* @__PURE__ */ D.jsx(
    L.Provider,
    {
      value: {
        user: t,
        token: C,
        loading: A,
        login: u,
        oauthLogin: y,
        logout: I,
        updateUser: d,
        error: a
      },
      children: e
    }
  );
}, se = () => {
  const e = x(L);
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
}), J = () => x(j), ne = ({ children: e }) => {
  const { user: t } = q(), { data: n = null, loading: C, runAsync: i, error: A } = M(async () => k.system.getSiteConfig(), {
    manual: !0
  });
  _(() => {
    t !== void 0 && i();
  }, [t]);
  const [h, v] = g(localStorage.getItem("orgID"));
  return _(() => {
    h ? localStorage.setItem("orgID", h) : localStorage.removeItem("orgID");
  }, [h]), _(() => {
    var a, u, y;
    if (t) {
      let I = localStorage.getItem("orgID");
      if (I) {
        const d = (a = t == null ? void 0 : t.organizations) == null ? void 0 : a.find((r) => r.id === I);
        if (d) {
          v(d.id);
          return;
        }
      }
      v(((y = (u = t == null ? void 0 : t.organizations) == null ? void 0 : u[0]) == null ? void 0 : y.id) ?? null);
    }
  }, [n, t == null ? void 0 : t.organizations]), /* @__PURE__ */ D.jsx(
    j.Provider,
    {
      value: {
        siteConfig: n,
        loading: C,
        enableMultiOrg: (n == null ? void 0 : n.enable_multi_org) ?? !1,
        fetchSiteConfig: i,
        currentOrgId: h,
        setCurrentOrgId: (a) => {
          v(a);
        },
        clearCurrentOrgId: () => {
          v(null);
        },
        error: A
      },
      children: e
    }
  );
}, re = () => {
  var v;
  const { user: e } = x(L), { currentOrgId: t } = J(), n = (v = e == null ? void 0 : e.roles) == null ? void 0 : v.filter((a) => !a.organization_id || a.organization_id === t), C = () => n ? n.some((a) => a.name === "admin" && !a.organization_id) : !1, i = (a) => n ? C() ? !0 : n.some((u) => u.permissions ? u.permissions.some((y) => y.code === a) : !1) : !1;
  return {
    hasPermission: i,
    hasAllPermissions: (a) => a.every((u) => i(u)),
    hasAnyPermission: (a) => a.some((u) => i(u)),
    isAdmin: C(),
    loading: !e
  };
}, R = T({
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
}), ae = () => x(R), ie = ({ children: e }) => {
  const { t } = $("ai"), [n, C] = g("sidebar"), [i, A] = g(!1), [h, v] = g(!1), [a, u] = g(void 0), [y, I] = g(), [d, r] = g(null);
  _(() => {
    const s = localStorage.getItem("activeConversationKey");
    s && u(s);
  }, []);
  const o = z((s, f) => {
    A(!0), d ? d(s, f) : I([s, f]);
  }, [d, A]);
  _(() => {
    d && y && (d(y[0], y[1]), I(void 0));
  }, [d, y]);
  const { loading: c, runAsync: l, data: p } = M(async () => (await k.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: i,
    onError: (s) => {
      E.error(t("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: s.message ?? s }));
    }
  });
  return /* @__PURE__ */ D.jsx(
    R.Provider,
    {
      value: {
        layout: n,
        setLayout: (s) => {
          C(s);
        },
        visible: i,
        setVisible: (s) => {
          A(s);
        },
        callAI: o,
        onCallAI: z((s) => {
          r(() => s);
        }, [r]),
        loaded: h,
        setLoaded: (s) => {
          v(s);
        },
        fetchConversations: l,
        fetchConversationsLoading: c,
        conversations: p,
        activeConversationKey: a,
        setActiveConversationKey: (s) => {
          u(s), localStorage.setItem("activeConversationKey", s);
        }
      },
      children: e
    }
  );
}, O = /* @__PURE__ */ new Map(), N = (e, t) => JSON.stringify({ dataSource: e, dependentValues: t }), S = (e, t) => {
  const n = O.get(e);
  return n ? t && t > 0 && Date.now() - n.timestamp > t * 1e3 ? (O.delete(e), null) : n.data : null;
}, X = (e, t) => {
  O.set(e, { data: t, timestamp: Date.now() });
}, le = (e, t, n) => {
  const [C, i] = g(t || []), [A, h] = g(!1), [v, a] = g(null), [u, y] = g(0), I = () => y((r) => r + 1), d = B(() => !e || e.type === "static" ? !1 : e.depends_on && e.depends_on.length > 0 ? e.depends_on.every(
    (r) => n && n[r] !== void 0 && n[r] !== null
  ) : !0, [e, n]);
  return _(() => {
    if (!d) {
      i(t || []);
      return;
    }
    (async () => {
      try {
        h(!0), a(null);
        const o = N(e, n);
        if (e.cache) {
          const l = S(o, e.cache_ttl);
          if (l) {
            i(l), h(!1);
            return;
          }
        }
        let c = [];
        switch (e.type) {
          case "api": {
            const l = e.url || "", p = e.method || "GET", s = {
              ...n,
              ...e.params
            };
            let f;
            p.toUpperCase() === "GET" ? f = await U(l, { params: s }) : f = await U(l, { params: s });
            const m = Array.isArray(f) ? f : f.data || [], w = e.label_key || "label", P = e.value_key || "value";
            c = m.map((b) => ({
              label: b[w] || b.name || b.id,
              value: b[P] || b.id
            }));
            break;
          }
          case "toolsets": {
            let p = (await k.system.listToolSets({
              current: 1,
              page_size: 1e3,
              ...e.params
            })).data || [];
            e.filter && (p = p.filter((m) => Object.entries(e.filter).every(([w, P]) => m[w] === P)));
            const s = e.label_key || "name", f = e.value_key || "id";
            c = p.map((m) => ({
              label: m[s] || m.name,
              value: m[f] || m.id
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
        e.cache && X(o, c), i(c);
      } catch (o) {
        console.error("Failed to load options from data source:", o), a(o), i(t || []);
      } finally {
        h(!1);
      }
    })();
  }, [e, t, n, d, u]), { options: C, loading: A, error: v, refresh: I };
};
export {
  oe as A,
  ne as S,
  se as a,
  re as b,
  J as c,
  le as d,
  ie as e,
  q as f,
  ae as u
};
