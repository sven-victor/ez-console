import { useContext as T, createContext as L, useState as m, useEffect as w, useCallback as K, useMemo as R } from "react";
import { j as M } from "./vendor.js";
import { message as E } from "antd";
import { a as I } from "./index.js";
import { c as U, a as F } from "./client.js";
import { useRequest as O } from "ahooks";
import { g as B } from "./base.js";
import { useTranslation as S } from "react-i18next";
const P = L({
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
}), $ = () => T(P), D = (e, t = !0) => {
  e ? (t && localStorage.setItem("token", e), U.defaults.headers.common.Authorization = `Bearer ${e}`) : (t && localStorage.removeItem("token"), delete U.defaults.headers.common.Authorization);
}, te = ({ children: e }) => {
  const [t, n] = m(void 0), [k, u] = m(localStorage.getItem("token")), [A, v] = m(!0), { run: C, error: g } = O(async () => {
    const r = localStorage.getItem("token");
    return r ? (D(r, !1), I.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      n(void 0);
    },
    onSuccess: (r) => {
      n(r);
    },
    onError: (r) => {
      console.log([r]), console.error("Failed to get current user:", r), h();
    },
    onFinally: () => {
      v(!1);
    }
  });
  w(() => {
    C();
  }, []);
  const a = async (r) => {
    try {
      const s = await I.authorization.login(r), { token: c, user: l, needs_mfa: f, password_expired: o, mfa_token: d, mfa_type: p } = s;
      if (f)
        throw { needsMFA: !0, mfaToken: d, mfaType: p, user: l };
      if (o)
        throw { password_expired: !0, user: l, token: c };
      return D(c), u(c), n(l), l;
    } catch (s) {
      throw s && s.needsMFA || s && s.password_expired || E.error("Login failed, please check your username and password"), s;
    }
  }, i = K(async (r) => {
    try {
      const s = await I.oauth.handleCallback(r, { headers: { "X-Base-Path": B() } });
      let c = "", l = null;
      if (s && typeof s == "object")
        if ("code" in s && s.code === "0" && "data" in s) {
          const { token: f, user: o, needs_mfa: d, mfa_token: p, mfa_type: _ } = s.data;
          if (d)
            throw { needsMFA: !0, mfaToken: p, mfaType: _, user: o };
          c = f, l = o;
        } else {
          const { token: f, user: o, needs_mfa: d, mfa_token: p, mfa_type: _ } = s;
          if (d)
            throw { needsMFA: !0, mfaToken: p, mfaType: _, user: o };
          c = f, l = o;
        }
      return D(c), u(c), n(l), l;
    } catch (s) {
      throw n(void 0), s && s.needsMFA || s && s.passwordExpired, s;
    }
  }, []), h = () => {
    I.authorization.logout(), D(null), u(null), n(null);
  }, y = (r) => {
    n(r);
  };
  return /* @__PURE__ */ M.jsx(
    P.Provider,
    {
      value: {
        user: t,
        token: k,
        loading: A,
        login: a,
        oauthLogin: i,
        logout: h,
        updateUser: y,
        error: g
      },
      children: e
    }
  );
}, oe = () => {
  const e = T(P);
  if (e === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return e;
}, j = L({
  siteConfig: null,
  enableMultiOrg: !1,
  loading: !1,
  fetchSiteConfig: async () => null,
  currentOrgId: null,
  setCurrentOrgId: () => {
  },
  clearCurrentOrgId: () => {
  },
  error: void 0,
  tasks: void 0,
  addTask: () => {
  },
  tasksDropdownOpen: !1,
  setTasksDropdownOpen: () => {
  }
}), q = () => T(j), ne = ({ children: e }) => {
  const { user: t } = $(), { data: n = null, loading: k, runAsync: u, error: A } = O(async () => I.system.getSiteConfig(), {
    manual: !0
  });
  w(() => {
    t !== void 0 && u();
  }, [t]);
  const [v, C] = m(localStorage.getItem("orgID"));
  w(() => {
    v ? localStorage.setItem("orgID", v) : localStorage.removeItem("orgID");
  }, [v]), w(() => {
    var r, s, c;
    if (t) {
      let l = localStorage.getItem("orgID");
      if (l) {
        const f = (r = t == null ? void 0 : t.organizations) == null ? void 0 : r.find((o) => o.id === l);
        if (f) {
          C(f.id);
          return;
        }
      }
      C(((c = (s = t == null ? void 0 : t.organizations) == null ? void 0 : s[0]) == null ? void 0 : c.id) ?? null);
    }
  }, [n, t == null ? void 0 : t.organizations]);
  const [g, a] = m(!1), [i, h] = m([]), { run: y } = O(async () => I.userTasks.listUserTasks({}), {
    onSuccess: (r) => {
      h(r);
    },
    refreshDeps: [t],
    pollingInterval: g ? 3e3 : 6e4
  });
  return w(() => {
    g && y();
  }, [g]), /* @__PURE__ */ M.jsx(
    j.Provider,
    {
      value: {
        siteConfig: n,
        loading: k,
        enableMultiOrg: (n == null ? void 0 : n.enable_multi_org) ?? !1,
        fetchSiteConfig: u,
        currentOrgId: v,
        setCurrentOrgId: (r) => {
          C(r);
        },
        clearCurrentOrgId: () => {
          C(null);
        },
        error: A,
        tasks: i,
        setTasksDropdownOpen: (r) => {
          a(r);
        },
        tasksDropdownOpen: g,
        addTask: (r) => {
          h((s) => [r, ...s]), a(!0);
        }
      },
      children: e
    }
  );
}, re = () => {
  var g;
  const { user: e } = T(P), { currentOrgId: t } = q(), n = (g = e == null ? void 0 : e.roles) == null ? void 0 : g.filter((a) => !a.organization_id || a.organization_id === t), k = () => n ? n.some((a) => a.name === "admin" && !a.organization_id) : !1, u = (a) => n ? k() ? !0 : n.some((i) => i.permissions ? i.permissions.some((h) => h.code === a) : !1) : !1;
  return {
    hasPermission: u,
    hasAllPermissions: (a) => a.every((i) => u(i)),
    hasAnyPermission: (a) => a.some((i) => u(i)),
    hasGlobalPermission: (a) => n ? k() ? !0 : n.some((i) => i.organization_id || !i.permissions ? !1 : i.permissions.some((h) => h.code === a)) : !1,
    isAdmin: k(),
    loading: !e
  };
}, G = L({
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
}), ae = () => T(G), ie = ({ children: e }) => {
  const { t } = S("ai"), [n, k] = m("sidebar"), [u, A] = m(!1), [v, C] = m(!1), [g, a] = m(void 0), [i, h] = m(), [y, r] = m(null);
  w(() => {
    const o = localStorage.getItem("activeConversationKey");
    o && a(o);
  }, []);
  const s = K((o, d) => {
    A(!0), y ? y(o, d) : h([o, d]);
  }, [y, A]);
  w(() => {
    y && i && (y(i[0], i[1]), h(void 0));
  }, [y, i]);
  const { loading: c, runAsync: l, data: f } = O(async () => (await I.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: u,
    onError: (o) => {
      E.error(t("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: o.message ?? o }));
    }
  });
  return /* @__PURE__ */ M.jsx(
    G.Provider,
    {
      value: {
        layout: n,
        setLayout: (o) => {
          k(o);
        },
        visible: u,
        setVisible: (o) => {
          A(o);
        },
        callAI: s,
        onCallAI: K((o) => {
          r(() => o);
        }, [r]),
        loaded: v,
        setLoaded: (o) => {
          C(o);
        },
        fetchConversations: l,
        fetchConversationsLoading: c,
        conversations: f,
        activeConversationKey: g,
        setActiveConversationKey: (o) => {
          a(o), localStorage.setItem("activeConversationKey", o);
        }
      },
      children: e
    }
  );
}, z = /* @__PURE__ */ new Map(), J = (e, t) => JSON.stringify({ dataSource: e, dependentValues: t }), N = (e, t) => {
  const n = z.get(e);
  return n ? t && t > 0 && Date.now() - n.timestamp > t * 1e3 ? (z.delete(e), null) : n.data : null;
}, X = (e, t) => {
  z.set(e, { data: t, timestamp: Date.now() });
}, le = (e, t, n) => {
  const [k, u] = m(t || []), [A, v] = m(!1), [C, g] = m(null), [a, i] = m(0), h = () => i((r) => r + 1), y = R(() => !e || e.type === "static" ? !1 : e.depends_on && e.depends_on.length > 0 ? e.depends_on.every(
    (r) => n && n[r] !== void 0 && n[r] !== null
  ) : !0, [e, n]);
  return w(() => {
    if (!y) {
      u(t || []);
      return;
    }
    (async () => {
      try {
        v(!0), g(null);
        const s = J(e, n);
        if (e.cache) {
          const l = N(s, e.cache_ttl);
          if (l) {
            u(l), v(!1);
            return;
          }
        }
        let c = [];
        switch (e.type) {
          case "api": {
            const l = e.url || "", f = e.method || "GET", o = {
              ...n,
              ...e.params
            };
            let d;
            f.toUpperCase() === "GET" ? d = await F(l, { params: o }) : d = await F(l, { params: o });
            const p = Array.isArray(d) ? d : d.data || [], _ = e.label_key || "label", x = e.value_key || "value";
            c = p.map((b) => ({
              label: b[_] || b.name || b.id,
              value: b[x] || b.id
            }));
            break;
          }
          case "toolsets": {
            let f = (await I.system.listToolSets({
              current: 1,
              page_size: 1e3,
              ...e.params
            })).data || [];
            e.filter && (f = f.filter((p) => Object.entries(e.filter).every(([_, x]) => p[_] === x)));
            const o = e.label_key || "name", d = e.value_key || "id";
            c = f.map((p) => ({
              label: p[o] || p.name,
              value: p[d] || p.id
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
        e.cache && X(s, c), u(c);
      } catch (s) {
        console.error("Failed to load options from data source:", s), g(s), u(t || []);
      } finally {
        v(!1);
      }
    })();
  }, [e, t, n, y, a]), { options: k, loading: A, error: C, refresh: h };
};
export {
  te as A,
  ne as S,
  oe as a,
  re as b,
  q as c,
  le as d,
  ie as e,
  $ as f,
  ae as u
};
