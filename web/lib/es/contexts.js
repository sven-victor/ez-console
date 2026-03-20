import { useContext as _, createContext as z, useState as u, useEffect as S, useCallback as T } from "react";
import { j as L, i as B } from "./vendor.js";
import { message as U } from "antd";
import { a as w } from "./index.js";
import { c as F } from "./client.js";
import { useRequest as O } from "ahooks";
import { g as R } from "./base.js";
import { useTranslation as V } from "react-i18next";
import { isFunction as J } from "lodash-es";
const x = z({
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
}), N = () => _(x), D = (i, r = !0) => {
  i ? (r && localStorage.setItem("token", i), F.defaults.headers.common.Authorization = `Bearer ${i}`) : (r && localStorage.removeItem("token"), delete F.defaults.headers.common.Authorization);
}, te = ({ children: i }) => {
  const [r, o] = u(void 0), [v, d] = u(localStorage.getItem("token")), [A, y] = u(!0), { run: k, error: g } = O(async () => {
    const s = localStorage.getItem("token");
    return s ? (D(s, !1), w.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      o(void 0);
    },
    onSuccess: (s) => {
      o(s);
    },
    onError: (s) => {
      console.error("Failed to get current user:", s), m();
    },
    onFinally: () => {
      y(!1);
    }
  });
  S(() => {
    k();
  }, []);
  const n = async (s) => {
    try {
      const e = await w.authorization.login(s), { token: l, user: c, needs_mfa: p, password_expired: f, mfa_token: I, mfa_type: C } = e;
      if (p)
        throw { needsMFA: !0, mfaToken: I, mfaType: C, user: c };
      if (f)
        throw { password_expired: !0, user: c, token: l };
      return D(l), d(l), o(c), c;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || U.error("Login failed, please check your username and password"), e;
    }
  }, a = T(async (s) => {
    try {
      const e = await w.oauth.handleCallback(s, { headers: { "X-Base-Path": R() } });
      let l = "", c = null;
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: p, user: f, needs_mfa: I, mfa_token: C, mfa_type: P } = e.data;
          if (I)
            throw { needsMFA: !0, mfaToken: C, mfaType: P, user: f };
          l = p, c = f;
        } else {
          const { token: p, user: f, needs_mfa: I, mfa_token: C, mfa_type: P } = e;
          if (I)
            throw { needsMFA: !0, mfaToken: C, mfaType: P, user: f };
          l = p, c = f;
        }
      return D(l), d(l), o(c), c;
    } catch (e) {
      throw o(void 0), e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), m = () => {
    w.authorization.logout(), D(null), d(null), o(null);
  }, h = (s) => {
    o(s);
  };
  return /* @__PURE__ */ L.jsx(
    x.Provider,
    {
      value: {
        user: r,
        token: v,
        loading: A,
        login: n,
        oauthLogin: a,
        logout: m,
        updateUser: h,
        error: g
      },
      children: i
    }
  );
}, se = () => {
  const i = _(x);
  if (i === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return i;
}, M = z({
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
  tasks: void 0,
  addTask: () => {
  },
  tasksDropdownOpen: !1,
  setTasksDropdownOpen: () => {
  }
}), $ = () => _(M), oe = ({ children: i }) => {
  const { user: r } = N(), { data: o = null, loading: v, runAsync: d, error: A } = O(async () => w.system.getSiteConfig(), {
    manual: !0
  });
  S(() => {
    r !== void 0 && d();
  }, [r]);
  const [y, k] = u(localStorage.getItem("orgID"));
  S(() => {
    y ? localStorage.setItem("orgID", y) : localStorage.removeItem("orgID");
  }, [y]), S(() => {
    var s, e, l;
    if (r) {
      let c = localStorage.getItem("orgID");
      if (c) {
        const p = (s = r == null ? void 0 : r.organizations) == null ? void 0 : s.find((f) => f.id === c);
        if (p) {
          k(p.id);
          return;
        }
      }
      k(((l = (e = r == null ? void 0 : r.organizations) == null ? void 0 : e[0]) == null ? void 0 : l.id) ?? null);
    }
  }, [o, r == null ? void 0 : r.organizations]);
  const [g, n] = u(!1), [a, m] = u([]), { run: h } = O(async () => w.tasks.listUserTasks({}), {
    onSuccess: (s) => {
      m(s);
    },
    ready: !!r,
    refreshDeps: [r],
    pollingInterval: g ? 3e3 : 6e4
  });
  return S(() => {
    g && h();
  }, [g]), /* @__PURE__ */ L.jsx(
    M.Provider,
    {
      value: {
        siteConfig: o,
        loading: v,
        enableMultiOrg: (o == null ? void 0 : o.enable_multi_org) ?? !1,
        enableSkillToolBinding: (o == null ? void 0 : o.enable_skill_tool_binding) ?? !1,
        fetchSiteConfig: d,
        currentOrgId: y,
        setCurrentOrgId: (s) => {
          k(s);
        },
        clearCurrentOrgId: () => {
          k(null);
        },
        error: A,
        tasks: a,
        setTasksDropdownOpen: (s) => {
          n(s);
        },
        tasksDropdownOpen: g,
        addTask: (s) => {
          m((e) => [s, ...e]), n(!0);
        }
      },
      children: i
    }
  );
}, re = () => {
  var g;
  const { user: i } = _(x), { currentOrgId: r } = $(), o = (g = i == null ? void 0 : i.roles) == null ? void 0 : g.filter((n) => !n.organization_id || n.organization_id === r), v = () => o ? o.some((n) => n.name === "admin" && !n.organization_id) : !1, d = (n) => o ? v() ? !0 : o.some((a) => a.permissions ? a.permissions.some((m) => m.code === n) : !1) : !1;
  return {
    hasPermission: d,
    hasAllPermissions: (n) => n.every((a) => d(a)),
    hasAnyPermission: (n) => n.some((a) => d(a)),
    hasGlobalPermission: (n) => o ? v() ? !0 : o.some((a) => a.organization_id || !a.permissions ? !1 : a.permissions.some((m) => m.code === n)) : !1,
    isAdmin: v(),
    loading: !i
  };
}, K = z({
  layout: "sidebar",
  setLayout: () => {
  },
  visible: !1,
  setVisible: () => {
  },
  callAI: () => {
  },
  onCallAI: (i) => {
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
}), ne = () => _(K), ae = ({ children: i }) => {
  const { t: r } = V("ai"), [o, v] = u("sidebar"), [d, A] = u(!1), [y, k] = u(!1), [g, n] = u(void 0), [a, m] = u(), [h, s] = u(null), [e, l] = u([]), [c, p] = u([]), f = T(() => {
    l([]), p([]);
  }, []), I = T((t) => {
    t.ephemeralSystemPrompts && l(t.ephemeralSystemPrompts);
    const b = t.pageData ? [{
      name: "ui_get_page_data",
      description: `This is a browser/client-side method. If the user explicitly instructs you to retrieve page data or if you believe it is necessary to retrieve page data, you can try invoking this method. ${t.pageDataDescription || "Returns a JSON snapshot of the current page data."}`,
      parameters: { type: "object", properties: {}, required: [] },
      handler: () => B(t.pageData) ? t.pageData : J(t.pageData) ? JSON.stringify(t.pageData()) : JSON.stringify(t.pageData)
    }] : [];
    return p([...b, ...t.tools ?? []]), () => {
      f();
    };
  }, [f]);
  S(() => {
    const t = localStorage.getItem("activeConversationKey");
    t && n(t);
  }, []);
  const C = T((t, b) => {
    A(!0), h ? h(t, b) : m([t, b]);
  }, [h, A]);
  S(() => {
    h && a && (h(a[0], a[1]), m(void 0));
  }, [h, a]);
  const { loading: P, runAsync: j, data: E } = O(async () => (await w.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: d,
    onError: (t) => {
      U.error(r("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: t.message ?? t }));
    }
  });
  return /* @__PURE__ */ L.jsx(
    K.Provider,
    {
      value: {
        layout: o,
        setLayout: (t) => {
          v(t);
        },
        visible: d,
        setVisible: (t) => {
          A(t);
        },
        callAI: C,
        onCallAI: T((t) => {
          s(() => t);
        }, [s]),
        loaded: y,
        setLoaded: (t) => {
          k(t);
        },
        fetchConversations: j,
        fetchConversationsLoading: P,
        conversations: E,
        activeConversationKey: g,
        setActiveConversationKey: (t) => {
          n(t), localStorage.setItem("activeConversationKey", t);
        },
        ephemeralSystemPrompts: e,
        clientTools: c,
        registerPageAI: I,
        resetPageAIContext: f
      },
      children: i
    }
  );
};
export {
  te as A,
  oe as S,
  se as a,
  re as b,
  $ as c,
  ae as d,
  N as e,
  ne as u
};
