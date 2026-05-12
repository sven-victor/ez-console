import { useContext as _, createContext as x, useState as c, useEffect as S, useCallback as P } from "react";
import { j as D, i as B } from "./vendor.js";
import { message as F } from "antd";
import { a as k } from "./index.js";
import { c as L } from "./client.js";
import { useRequest as z } from "ahooks";
import { g as R } from "./base.js";
import { useTranslation as V } from "react-i18next";
import { isFunction as J } from "lodash-es";
const O = x({
  user: void 0,
  loading: !1,
  login: async () => null,
  oauthLogin: async () => null,
  logout: () => {
  },
  updateUser: () => {
  },
  error: void 0
}), N = () => _(O), b = (i, r = !0) => {
  i ? (r && localStorage.setItem("token", i), L.defaults.headers.common.Authorization = `Bearer ${i}`) : (r && localStorage.removeItem("token"), delete L.defaults.headers.common.Authorization);
}, te = ({ children: i }) => {
  const [r, o] = c(void 0), [p, u] = c(!0), { run: A, runAsync: h, error: v } = z(async () => {
    const s = localStorage.getItem("token");
    return s ? (b(s, !1), k.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      o(void 0);
    },
    onSuccess: (s) => {
      o(s);
    },
    onError: (s) => {
      console.error("Failed to get current user:", s), a();
    },
    onFinally: () => {
      u(!1);
    }
  });
  S(() => {
    A();
  }, []);
  const C = async (s) => {
    try {
      const e = await k.authorization.login(s), { token: f, user: l, needs_mfa: m, password_expired: g, mfa_token: y, mfa_type: I } = e;
      if (m)
        throw { needsMFA: !0, mfaToken: y, mfaType: I, user: l };
      if (g)
        throw { password_expired: !0, user: l, token: f };
      return b(f), o(l), l;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || F.error("Login failed, please check your username and password"), e;
    }
  }, n = P(async (s) => {
    try {
      const e = await k.oauth.handleCallback(s, { headers: { "X-Base-Path": R() } });
      let f = "";
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: m, user: g, needs_mfa: y, mfa_token: I, mfa_type: w } = e.data;
          if (y)
            throw { needsMFA: !0, mfaToken: I, mfaType: w, user: g };
          f = m;
        } else {
          const { token: m, user: g, needs_mfa: y, mfa_token: I, mfa_type: w } = e;
          if (y)
            throw { needsMFA: !0, mfaToken: I, mfaType: w, user: g };
          f = m;
        }
      b(f);
      const l = await h();
      return o(l || null), l || null;
    } catch (e) {
      throw o(void 0), e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), a = () => {
    k.authorization.logout(), b(null), o(null);
  }, d = (s) => {
    o(s);
  };
  return /* @__PURE__ */ D.jsx(
    O.Provider,
    {
      value: {
        user: r,
        loading: p,
        login: C,
        oauthLogin: n,
        logout: a,
        updateUser: d,
        error: v
      },
      children: i
    }
  );
}, se = () => {
  const i = _(O);
  if (i === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return i;
}, U = x({
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
}), $ = () => _(U), oe = ({ children: i }) => {
  const { user: r } = N(), { data: o = null, loading: p, runAsync: u, error: A } = z(async () => k.system.getSiteConfig(), {
    manual: !0
  });
  S(() => {
    r !== void 0 && u();
  }, [r]);
  const [h, v] = c(localStorage.getItem("orgID"));
  S(() => {
    h ? localStorage.setItem("orgID", h) : localStorage.removeItem("orgID");
  }, [h]), S(() => {
    var s, e, f;
    if (r) {
      let l = localStorage.getItem("orgID");
      if (l) {
        const m = (s = r == null ? void 0 : r.organizations) == null ? void 0 : s.find((g) => g.id === l);
        if (m) {
          v(m.id);
          return;
        }
      }
      v(((f = (e = r == null ? void 0 : r.organizations) == null ? void 0 : e[0]) == null ? void 0 : f.id) ?? null);
    }
  }, [o, r == null ? void 0 : r.organizations]);
  const [C, n] = c(!1), [a, d] = c([]);
  return /* @__PURE__ */ D.jsx(
    U.Provider,
    {
      value: {
        siteConfig: o,
        loading: p,
        enableMultiOrg: (o == null ? void 0 : o.enable_multi_org) ?? !1,
        enableSkillToolBinding: (o == null ? void 0 : o.enable_skill_tool_binding) ?? !1,
        fetchSiteConfig: u,
        currentOrgId: h,
        setCurrentOrgId: (s) => {
          v(s);
        },
        clearCurrentOrgId: () => {
          v(null);
        },
        error: A,
        tasks: a,
        setTasksDropdownOpen: (s) => {
          n(s);
        },
        tasksDropdownOpen: C,
        setTasks: (s) => {
          d(s);
        },
        addTask: (s) => {
          d((e) => [s, ...e]), n(!0);
        }
      },
      children: i
    }
  );
}, re = () => {
  var C;
  const { user: i } = _(O), { currentOrgId: r } = $(), o = (C = i == null ? void 0 : i.roles) == null ? void 0 : C.filter((n) => !n.organization_id || n.organization_id === r), p = () => o ? o.some((n) => n.name === "admin" && !n.organization_id) : !1, u = (n) => o ? p() ? !0 : o.some((a) => a.permissions ? a.permissions.some((d) => d.code === n) : !1) : !1;
  return {
    hasPermission: u,
    hasAllPermissions: (n) => n.every((a) => u(a)),
    hasAnyPermission: (n) => n.some((a) => u(a)),
    hasGlobalPermission: (n) => o ? p() ? !0 : o.some((a) => a.organization_id || !a.permissions ? !1 : a.permissions.some((d) => d.code === n)) : !1,
    isAdmin: p(),
    loading: !i
  };
}, M = x({
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
}), ne = () => _(M), ae = ({ children: i }) => {
  const { t: r } = V("ai"), [o, p] = c("sidebar"), [u, A] = c(!1), [h, v] = c(!1), [C, n] = c(void 0), [a, d] = c(), [s, e] = c(null), [f, l] = c([]), [m, g] = c([]), y = P(() => {
    l([]), g([]);
  }, []), I = P((t) => {
    t.ephemeralSystemPrompts && l(t.ephemeralSystemPrompts);
    const T = t.pageData ? [{
      name: "ui_get_page_data",
      description: `This is a browser/client-side method. If the user explicitly instructs you to retrieve page data or if you believe it is necessary to retrieve page data, you can try invoking this method. ${t.pageDataDescription || "Returns a JSON snapshot of the current page data."}`,
      parameters: { type: "object", properties: {}, required: [] },
      handler: () => B(t.pageData) ? t.pageData : J(t.pageData) ? JSON.stringify(t.pageData()) : JSON.stringify(t.pageData)
    }] : [];
    return g([...T, ...t.tools ?? []]), () => {
      y();
    };
  }, [y]);
  S(() => {
    const t = localStorage.getItem("activeConversationKey");
    t && n(t);
  }, []);
  const w = P((t, T) => {
    A(!0), s ? s(t, T) : d([t, T]);
  }, [s, A]);
  S(() => {
    s && a && (s(a[0], a[1]), d(void 0));
  }, [s, a]);
  const { loading: K, runAsync: j, data: E } = z(async () => (await k.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: u,
    onError: (t) => {
      F.error(r("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: t.message ?? t }));
    }
  });
  return /* @__PURE__ */ D.jsx(
    M.Provider,
    {
      value: {
        layout: o,
        setLayout: (t) => {
          p(t);
        },
        visible: u,
        setVisible: (t) => {
          A(t);
        },
        callAI: w,
        onCallAI: P((t) => {
          e(() => t);
        }, [e]),
        loaded: h,
        setLoaded: (t) => {
          v(t);
        },
        fetchConversations: j,
        fetchConversationsLoading: K,
        conversations: E,
        activeConversationKey: C,
        setActiveConversationKey: (t) => {
          n(t), localStorage.setItem("activeConversationKey", t);
        },
        ephemeralSystemPrompts: f,
        clientTools: m,
        registerPageAI: I,
        resetPageAIContext: y
      },
      children: i
    }
  );
};
export {
  te as A,
  oe as S,
  ne as a,
  se as b,
  re as c,
  N as d,
  ae as e,
  $ as u
};
