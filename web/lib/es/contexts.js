import { useContext as P, createContext as D, useState as f, useEffect as _, useCallback as b } from "react";
import { j as z, i as R } from "./vendor.js";
import { App as M } from "antd";
import { a as S } from "./index.js";
import { f as F } from "./client.js";
import { useRequest as L } from "ahooks";
import { g as V } from "./base.js";
import { useTranslation as J } from "react-i18next";
import { isFunction as N } from "lodash-es";
const x = D({
  user: void 0,
  loading: !1,
  login: async () => null,
  oauthLogin: async () => null,
  logout: () => {
  },
  updateUser: () => {
  },
  error: void 0
}), $ = () => P(x), O = (a, o = !0) => {
  a ? (o && localStorage.setItem("token", a), F.defaults.headers.common.Authorization = `Bearer ${a}`) : (o && localStorage.removeItem("token"), delete F.defaults.headers.common.Authorization);
}, se = ({ children: a }) => {
  const { message: o } = M.useApp(), [s, l] = f(void 0), [v, C] = f(!0), { run: m, runAsync: y, error: I } = L(async () => {
    const r = localStorage.getItem("token");
    return r ? (O(r, !1), S.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      l(void 0);
    },
    onSuccess: (r) => {
      l(r);
    },
    onError: (r) => {
      console.error("Failed to get current user:", r), u();
    },
    onFinally: () => {
      C(!1);
    }
  });
  _(() => {
    m();
  }, []);
  const n = async (r) => {
    try {
      const e = await S.authorization.login(r), { token: g, user: d, needs_mfa: A, password_expired: p, mfa_token: h, mfa_type: k } = e;
      if (A)
        throw { needsMFA: !0, mfaToken: h, mfaType: k, user: d };
      if (p)
        throw { password_expired: !0, user: d, token: g };
      return O(g), l(d), d;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || o.error("Login failed, please check your username and password"), e;
    }
  }, i = b(async (r) => {
    try {
      const e = await S.oauth.handleCallback(r, { headers: { "X-Base-Path": V() } });
      let g = "";
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: A, user: p, needs_mfa: h, mfa_token: k, mfa_type: w } = e.data;
          if (h)
            throw { needsMFA: !0, mfaToken: k, mfaType: w, user: p };
          g = A;
        } else {
          const { token: A, user: p, needs_mfa: h, mfa_token: k, mfa_type: w } = e;
          if (h)
            throw { needsMFA: !0, mfaToken: k, mfaType: w, user: p };
          g = A;
        }
      O(g);
      const d = await y();
      return l(d || null), d || null;
    } catch (e) {
      throw l(void 0), e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), u = () => {
    S.authorization.logout(), O(null), l(null);
  }, c = (r) => {
    l(r);
  };
  return /* @__PURE__ */ z.jsx(
    x.Provider,
    {
      value: {
        user: s,
        loading: v,
        login: n,
        oauthLogin: i,
        logout: u,
        updateUser: c,
        error: I
      },
      children: a
    }
  );
}, re = () => {
  const a = P(x);
  if (a === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return a;
}, U = D({
  siteConfig: null,
  enableMultiOrg: !1,
  enableSkillToolBinding: !1,
  loading: !1,
  fetchSiteConfig: async () => null,
  currentOrgId: null,
  setCurrentOrgId: () => {
  },
  clearCurrentOrgId: () => {
  },
  error: void 0,
  setTasks: () => {
  },
  tasks: void 0,
  addTask: () => {
  },
  tasksDropdownOpen: !1,
  setTasksDropdownOpen: () => {
  }
}), q = () => P(U), oe = ({ children: a }) => {
  const { user: o } = $(), { data: s = null, loading: l, runAsync: v, error: C } = L(async () => S.system.getSiteConfig(), {
    manual: !0
  });
  _(() => {
    o !== void 0 && v();
  }, [o]);
  const [m, y] = f(localStorage.getItem("orgID"));
  _(() => {
    m ? localStorage.setItem("orgID", m) : localStorage.removeItem("orgID");
  }, [m]), _(() => {
    var g, d, A;
    if (!o)
      return;
    const c = (s == null ? void 0 : s.enable_multi_org) ?? !1, r = s == null ? void 0 : s.default_organization_id;
    if (!c && r) {
      y(r);
      return;
    }
    const e = localStorage.getItem("orgID");
    if (e) {
      const p = (g = o == null ? void 0 : o.organizations) == null ? void 0 : g.find((h) => h.id === e);
      if (p) {
        y(p.id);
        return;
      }
    }
    y(((A = (d = o == null ? void 0 : o.organizations) == null ? void 0 : d[0]) == null ? void 0 : A.id) ?? null);
  }, [s, o == null ? void 0 : o.organizations]);
  const [I, n] = f(!1), [i, u] = f([]);
  return /* @__PURE__ */ z.jsx(
    U.Provider,
    {
      value: {
        siteConfig: s,
        loading: l,
        enableMultiOrg: (s == null ? void 0 : s.enable_multi_org) ?? !1,
        enableSkillToolBinding: (s == null ? void 0 : s.enable_skill_tool_binding) ?? !1,
        fetchSiteConfig: v,
        currentOrgId: m,
        setCurrentOrgId: (c) => {
          y(c);
        },
        clearCurrentOrgId: () => {
          y(null);
        },
        error: C,
        tasks: i,
        setTasksDropdownOpen: (c) => {
          n(c);
        },
        tasksDropdownOpen: I,
        setTasks: (c) => {
          u(c);
        },
        addTask: (c) => {
          u((r) => [c, ...r]), n(!0);
        }
      },
      children: a
    }
  );
}, ne = () => {
  var I;
  const { user: a } = P(x), { currentOrgId: o } = q(), s = (I = a == null ? void 0 : a.roles) == null ? void 0 : I.filter((n) => !n.organization_id || n.organization_id === o), l = () => s ? s.some((n) => n.name === "admin" && !n.organization_id) : !1, v = (n) => s ? l() ? !0 : s.some((i) => i.permissions ? i.permissions.some((u) => u.code === n) : !1) : !1;
  return {
    hasPermission: v,
    hasAllPermissions: (n) => n.every((i) => v(i)),
    hasAnyPermission: (n) => n.some((i) => v(i)),
    hasGlobalPermission: (n) => s ? l() ? !0 : s.some((i) => i.organization_id || !i.permissions ? !1 : i.permissions.some((u) => u.code === n)) : !1,
    isAdmin: l(),
    loading: !a
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
  onCallAI: () => {
  },
  loaded: !1,
  setLoaded: () => {
  },
  fetchConversations: () => Promise.resolve([]),
  fetchConversationsLoading: !1,
  conversations: void 0,
  activeConversationKey: void 0,
  setActiveConversationKey: () => {
  },
  ephemeralSystemPrompts: [],
  clientTools: [],
  registerPageAI: () => () => {
  },
  resetPageAIContext: () => {
  }
}), ae = () => P(K), ie = ({ children: a }) => {
  const { message: o } = M.useApp(), { t: s } = J("ai"), [l, v] = f("sidebar"), [C, m] = f(!1), [y, I] = f(!1), [n, i] = f(void 0), [u, c] = f(), [r, e] = f(null), [g, d] = f([]), [A, p] = f([]), h = b(() => {
    d([]), p([]);
  }, []), k = b((t) => {
    t.ephemeralSystemPrompts && d(t.ephemeralSystemPrompts);
    const T = t.pageData ? [{
      name: "ui_get_page_data",
      description: `This is a browser/client-side method. If the user explicitly instructs you to retrieve page data or if you believe it is necessary to retrieve page data, you can try invoking this method. ${t.pageDataDescription || "Returns a JSON snapshot of the current page data."}`,
      parameters: { type: "object", properties: {}, required: [] },
      handler: () => R(t.pageData) ? t.pageData : N(t.pageData) ? JSON.stringify(t.pageData()) : JSON.stringify(t.pageData)
    }] : [];
    return p([...T, ...t.tools ?? []]), () => {
      h();
    };
  }, [h]);
  _(() => {
    const t = localStorage.getItem("activeConversationKey");
    t && i(t);
  }, []);
  const w = b((t, T) => {
    m(!0), r ? r(t, T) : c([t, T]);
  }, [r, m]);
  _(() => {
    r && u && (r(u[0], u[1]), c(void 0));
  }, [r, u]);
  const { loading: j, runAsync: E, data: B } = L(async () => (await S.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: C,
    onError: (t) => {
      o.error(s("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: t.message ?? t }));
    }
  });
  return /* @__PURE__ */ z.jsx(
    K.Provider,
    {
      value: {
        layout: l,
        setLayout: (t) => {
          v(t);
        },
        visible: C,
        setVisible: (t) => {
          m(t);
        },
        callAI: w,
        onCallAI: b((t) => {
          e(() => t);
        }, [e]),
        loaded: y,
        setLoaded: (t) => {
          I(t);
        },
        fetchConversations: E,
        fetchConversationsLoading: j,
        conversations: B,
        activeConversationKey: n,
        setActiveConversationKey: (t) => {
          i(t), localStorage.setItem("activeConversationKey", t);
        },
        ephemeralSystemPrompts: g,
        clientTools: A,
        registerPageAI: k,
        resetPageAIContext: h
      },
      children: a
    }
  );
};
export {
  se as A,
  oe as S,
  ne as a,
  q as b,
  $ as c,
  ae as d,
  ie as e,
  re as u
};
