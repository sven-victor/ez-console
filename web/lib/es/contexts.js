import { useContext as P, createContext as O, useState as u, useEffect as k, useCallback as w } from "react";
import { j as x, i as B } from "./vendor.js";
import { message as L } from "antd";
import { a as I } from "./index.js";
import { c as z } from "./client.js";
import { useRequest as D } from "ahooks";
import { g as R } from "./base.js";
import { useTranslation as V } from "react-i18next";
import { isFunction as J } from "lodash-es";
const b = O({
  user: void 0,
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
}), N = () => P(b), T = (i, n = !0) => {
  i ? (n && localStorage.setItem("token", i), z.defaults.headers.common.Authorization = `Bearer ${i}`) : (n && localStorage.removeItem("token"), delete z.defaults.headers.common.Authorization);
}, te = ({ children: i }) => {
  const [n, s] = u(void 0), [p, f] = u(!0), { run: A, error: h } = D(async () => {
    const r = localStorage.getItem("token");
    return r ? (T(r, !1), I.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      s(void 0);
    },
    onSuccess: (r) => {
      s(r);
    },
    onError: (r) => {
      console.error("Failed to get current user:", r), o();
    },
    onFinally: () => {
      f(!1);
    }
  });
  k(() => {
    A();
  }, []);
  const v = async (r) => {
    try {
      const e = await I.authorization.login(r), { token: l, user: c, needs_mfa: m, password_expired: d, mfa_token: g, mfa_type: y } = e;
      if (m)
        throw { needsMFA: !0, mfaToken: g, mfaType: y, user: c };
      if (d)
        throw { password_expired: !0, user: c, token: l };
      return T(l), s(c), c;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || L.error("Login failed, please check your username and password"), e;
    }
  }, C = w(async (r) => {
    try {
      const e = await I.oauth.handleCallback(r, { headers: { "X-Base-Path": R() } });
      let l = "", c = null;
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: m, user: d, needs_mfa: g, mfa_token: y, mfa_type: S } = e.data;
          if (g)
            throw { needsMFA: !0, mfaToken: y, mfaType: S, user: d };
          l = m, c = d;
        } else {
          const { token: m, user: d, needs_mfa: g, mfa_token: y, mfa_type: S } = e;
          if (g)
            throw { needsMFA: !0, mfaToken: y, mfaType: S, user: d };
          l = m, c = d;
        }
      return T(l), s(c), c;
    } catch (e) {
      throw s(void 0), e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), o = () => {
    I.authorization.logout(), T(null), s(null);
  }, a = (r) => {
    s(r);
  };
  return /* @__PURE__ */ x.jsx(
    b.Provider,
    {
      value: {
        user: n,
        loading: p,
        login: v,
        oauthLogin: C,
        logout: o,
        updateUser: a,
        error: h
      },
      children: i
    }
  );
}, se = () => {
  const i = P(b);
  if (i === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return i;
}, F = O({
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
}), $ = () => P(F), oe = ({ children: i }) => {
  const { user: n } = N(), { data: s = null, loading: p, runAsync: f, error: A } = D(async () => I.system.getSiteConfig(), {
    manual: !0
  });
  k(() => {
    n !== void 0 && f();
  }, [n]);
  const [h, v] = u(localStorage.getItem("orgID"));
  k(() => {
    h ? localStorage.setItem("orgID", h) : localStorage.removeItem("orgID");
  }, [h]), k(() => {
    var e, l, c;
    if (n) {
      let m = localStorage.getItem("orgID");
      if (m) {
        const d = (e = n == null ? void 0 : n.organizations) == null ? void 0 : e.find((g) => g.id === m);
        if (d) {
          v(d.id);
          return;
        }
      }
      v(((c = (l = n == null ? void 0 : n.organizations) == null ? void 0 : l[0]) == null ? void 0 : c.id) ?? null);
    }
  }, [s, n == null ? void 0 : n.organizations]);
  const [C, o] = u(!1), [a, r] = u([]);
  return /* @__PURE__ */ x.jsx(
    F.Provider,
    {
      value: {
        siteConfig: s,
        loading: p,
        enableMultiOrg: (s == null ? void 0 : s.enable_multi_org) ?? !1,
        enableSkillToolBinding: (s == null ? void 0 : s.enable_skill_tool_binding) ?? !1,
        fetchSiteConfig: f,
        currentOrgId: h,
        setCurrentOrgId: (e) => {
          v(e);
        },
        clearCurrentOrgId: () => {
          v(null);
        },
        error: A,
        tasks: a,
        setTasksDropdownOpen: (e) => {
          o(e);
        },
        tasksDropdownOpen: C,
        setTasks: (e) => {
          r(e);
        },
        addTask: (e) => {
          r((l) => [e, ...l]), o(!0);
        }
      },
      children: i
    }
  );
}, re = () => {
  var C;
  const { user: i } = P(b), { currentOrgId: n } = $(), s = (C = i == null ? void 0 : i.roles) == null ? void 0 : C.filter((o) => !o.organization_id || o.organization_id === n), p = () => s ? s.some((o) => o.name === "admin" && !o.organization_id) : !1, f = (o) => s ? p() ? !0 : s.some((a) => a.permissions ? a.permissions.some((r) => r.code === o) : !1) : !1;
  return {
    hasPermission: f,
    hasAllPermissions: (o) => o.every((a) => f(a)),
    hasAnyPermission: (o) => o.some((a) => f(a)),
    hasGlobalPermission: (o) => s ? p() ? !0 : s.some((a) => a.organization_id || !a.permissions ? !1 : a.permissions.some((r) => r.code === o)) : !1,
    isAdmin: p(),
    loading: !i
  };
}, M = O({
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
}), ne = () => P(M), ae = ({ children: i }) => {
  const { t: n } = V("ai"), [s, p] = u("sidebar"), [f, A] = u(!1), [h, v] = u(!1), [C, o] = u(void 0), [a, r] = u(), [e, l] = u(null), [c, m] = u([]), [d, g] = u([]), y = w(() => {
    m([]), g([]);
  }, []), S = w((t) => {
    t.ephemeralSystemPrompts && m(t.ephemeralSystemPrompts);
    const _ = t.pageData ? [{
      name: "ui_get_page_data",
      description: `This is a browser/client-side method. If the user explicitly instructs you to retrieve page data or if you believe it is necessary to retrieve page data, you can try invoking this method. ${t.pageDataDescription || "Returns a JSON snapshot of the current page data."}`,
      parameters: { type: "object", properties: {}, required: [] },
      handler: () => B(t.pageData) ? t.pageData : J(t.pageData) ? JSON.stringify(t.pageData()) : JSON.stringify(t.pageData)
    }] : [];
    return g([..._, ...t.tools ?? []]), () => {
      y();
    };
  }, [y]);
  k(() => {
    const t = localStorage.getItem("activeConversationKey");
    t && o(t);
  }, []);
  const U = w((t, _) => {
    A(!0), e ? e(t, _) : r([t, _]);
  }, [e, A]);
  k(() => {
    e && a && (e(a[0], a[1]), r(void 0));
  }, [e, a]);
  const { loading: K, runAsync: j, data: E } = D(async () => (await I.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: f,
    onError: (t) => {
      L.error(n("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: t.message ?? t }));
    }
  });
  return /* @__PURE__ */ x.jsx(
    M.Provider,
    {
      value: {
        layout: s,
        setLayout: (t) => {
          p(t);
        },
        visible: f,
        setVisible: (t) => {
          A(t);
        },
        callAI: U,
        onCallAI: w((t) => {
          l(() => t);
        }, [l]),
        loaded: h,
        setLoaded: (t) => {
          v(t);
        },
        fetchConversations: j,
        fetchConversationsLoading: K,
        conversations: E,
        activeConversationKey: C,
        setActiveConversationKey: (t) => {
          o(t), localStorage.setItem("activeConversationKey", t);
        },
        ephemeralSystemPrompts: c,
        clientTools: d,
        registerPageAI: S,
        resetPageAIContext: y
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
  N as d,
  ae as e,
  ne as u
};
