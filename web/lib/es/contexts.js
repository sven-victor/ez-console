import { useContext as _, createContext as D, useState as f, useEffect as w, useCallback as T } from "react";
import { j as z, i as R } from "./vendor.js";
import { App as U } from "antd";
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
}), $ = () => _(x), O = (a, o = !0) => {
  a ? (o && localStorage.setItem("token", a), F.defaults.headers.common.Authorization = `Bearer ${a}`) : (o && localStorage.removeItem("token"), delete F.defaults.headers.common.Authorization);
}, se = ({ children: a }) => {
  const { message: o } = U.useApp(), [n, l] = f(void 0), [p, I] = f(!0), { run: m, runAsync: h, error: A } = L(async () => {
    const s = localStorage.getItem("token");
    return s ? (O(s, !1), S.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      l(void 0);
    },
    onSuccess: (s) => {
      l(s);
    },
    onError: (s) => {
      console.error("Failed to get current user:", s), u();
    },
    onFinally: () => {
      I(!1);
    }
  });
  w(() => {
    m();
  }, []);
  const r = async (s) => {
    try {
      const e = await S.authorization.login(s), { token: g, user: d, needs_mfa: v, password_expired: C, mfa_token: y, mfa_type: k } = e;
      if (v)
        throw { needsMFA: !0, mfaToken: y, mfaType: k, user: d };
      if (C)
        throw { password_expired: !0, user: d, token: g };
      return O(g), l(d), d;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || o.error("Login failed, please check your username and password"), e;
    }
  }, i = T(async (s) => {
    try {
      const e = await S.oauth.handleCallback(s, { headers: { "X-Base-Path": V() } });
      let g = "";
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: v, user: C, needs_mfa: y, mfa_token: k, mfa_type: P } = e.data;
          if (y)
            throw { needsMFA: !0, mfaToken: k, mfaType: P, user: C };
          g = v;
        } else {
          const { token: v, user: C, needs_mfa: y, mfa_token: k, mfa_type: P } = e;
          if (y)
            throw { needsMFA: !0, mfaToken: k, mfaType: P, user: C };
          g = v;
        }
      O(g);
      const d = await h();
      return l(d || null), d || null;
    } catch (e) {
      throw l(void 0), e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), u = () => {
    S.authorization.logout(), O(null), l(null);
  }, c = (s) => {
    l(s);
  };
  return /* @__PURE__ */ z.jsx(
    x.Provider,
    {
      value: {
        user: n,
        loading: p,
        login: r,
        oauthLogin: i,
        logout: u,
        updateUser: c,
        error: A
      },
      children: a
    }
  );
}, oe = () => {
  const a = _(x);
  if (a === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return a;
}, M = D({
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
}), q = () => _(M), re = ({ children: a }) => {
  const { user: o } = $(), { data: n = null, loading: l, runAsync: p, error: I } = L(async () => S.system.getSiteConfig(), {
    manual: !0
  });
  w(() => {
    o !== void 0 && p();
  }, [o]);
  const [m, h] = f(localStorage.getItem("orgID"));
  w(() => {
    m ? localStorage.setItem("orgID", m) : localStorage.removeItem("orgID");
  }, [m]), w(() => {
    var c, s, e;
    if (o) {
      const g = localStorage.getItem("orgID");
      if (g) {
        const d = (c = o == null ? void 0 : o.organizations) == null ? void 0 : c.find((v) => v.id === g);
        if (d) {
          h(d.id);
          return;
        }
      }
      h(((e = (s = o == null ? void 0 : o.organizations) == null ? void 0 : s[0]) == null ? void 0 : e.id) ?? null);
    }
  }, [n, o == null ? void 0 : o.organizations]);
  const [A, r] = f(!1), [i, u] = f([]);
  return /* @__PURE__ */ z.jsx(
    M.Provider,
    {
      value: {
        siteConfig: n,
        loading: l,
        enableMultiOrg: (n == null ? void 0 : n.enable_multi_org) ?? !1,
        enableSkillToolBinding: (n == null ? void 0 : n.enable_skill_tool_binding) ?? !1,
        fetchSiteConfig: p,
        currentOrgId: m,
        setCurrentOrgId: (c) => {
          h(c);
        },
        clearCurrentOrgId: () => {
          h(null);
        },
        error: I,
        tasks: i,
        setTasksDropdownOpen: (c) => {
          r(c);
        },
        tasksDropdownOpen: A,
        setTasks: (c) => {
          u(c);
        },
        addTask: (c) => {
          u((s) => [c, ...s]), r(!0);
        }
      },
      children: a
    }
  );
}, ne = () => {
  var A;
  const { user: a } = _(x), { currentOrgId: o } = q(), n = (A = a == null ? void 0 : a.roles) == null ? void 0 : A.filter((r) => !r.organization_id || r.organization_id === o), l = () => n ? n.some((r) => r.name === "admin" && !r.organization_id) : !1, p = (r) => n ? l() ? !0 : n.some((i) => i.permissions ? i.permissions.some((u) => u.code === r) : !1) : !1;
  return {
    hasPermission: p,
    hasAllPermissions: (r) => r.every((i) => p(i)),
    hasAnyPermission: (r) => r.some((i) => p(i)),
    hasGlobalPermission: (r) => n ? l() ? !0 : n.some((i) => i.organization_id || !i.permissions ? !1 : i.permissions.some((u) => u.code === r)) : !1,
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
}), ae = () => _(K), ie = ({ children: a }) => {
  const { message: o } = U.useApp(), { t: n } = J("ai"), [l, p] = f("sidebar"), [I, m] = f(!1), [h, A] = f(!1), [r, i] = f(void 0), [u, c] = f(), [s, e] = f(null), [g, d] = f([]), [v, C] = f([]), y = T(() => {
    d([]), C([]);
  }, []), k = T((t) => {
    t.ephemeralSystemPrompts && d(t.ephemeralSystemPrompts);
    const b = t.pageData ? [{
      name: "ui_get_page_data",
      description: `This is a browser/client-side method. If the user explicitly instructs you to retrieve page data or if you believe it is necessary to retrieve page data, you can try invoking this method. ${t.pageDataDescription || "Returns a JSON snapshot of the current page data."}`,
      parameters: { type: "object", properties: {}, required: [] },
      handler: () => R(t.pageData) ? t.pageData : N(t.pageData) ? JSON.stringify(t.pageData()) : JSON.stringify(t.pageData)
    }] : [];
    return C([...b, ...t.tools ?? []]), () => {
      y();
    };
  }, [y]);
  w(() => {
    const t = localStorage.getItem("activeConversationKey");
    t && i(t);
  }, []);
  const P = T((t, b) => {
    m(!0), s ? s(t, b) : c([t, b]);
  }, [s, m]);
  w(() => {
    s && u && (s(u[0], u[1]), c(void 0));
  }, [s, u]);
  const { loading: j, runAsync: E, data: B } = L(async () => (await S.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: I,
    onError: (t) => {
      o.error(n("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: t.message ?? t }));
    }
  });
  return /* @__PURE__ */ z.jsx(
    K.Provider,
    {
      value: {
        layout: l,
        setLayout: (t) => {
          p(t);
        },
        visible: I,
        setVisible: (t) => {
          m(t);
        },
        callAI: P,
        onCallAI: T((t) => {
          e(() => t);
        }, [e]),
        loaded: h,
        setLoaded: (t) => {
          A(t);
        },
        fetchConversations: E,
        fetchConversationsLoading: j,
        conversations: B,
        activeConversationKey: r,
        setActiveConversationKey: (t) => {
          i(t), localStorage.setItem("activeConversationKey", t);
        },
        ephemeralSystemPrompts: g,
        clientTools: v,
        registerPageAI: k,
        resetPageAIContext: y
      },
      children: a
    }
  );
};
export {
  se as A,
  re as S,
  ne as a,
  q as b,
  $ as c,
  ae as d,
  ie as e,
  oe as u
};
