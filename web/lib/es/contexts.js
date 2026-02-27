import { useContext as S, createContext as x, useState as f, useEffect as A, useCallback as P } from "react";
import { j as z } from "./vendor.js";
import { message as D } from "antd";
import { a as I } from "./index.js";
import { c as L } from "./client.js";
import { useRequest as _ } from "ahooks";
import { g as M } from "./base.js";
import { useTranslation as K } from "react-i18next";
const b = x({
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
}), j = () => S(b), T = (i, o = !0) => {
  i ? (o && localStorage.setItem("token", i), L.defaults.headers.common.Authorization = `Bearer ${i}`) : (o && localStorage.removeItem("token"), delete L.defaults.headers.common.Authorization);
}, J = ({ children: i }) => {
  const [o, r] = f(void 0), [p, c] = f(localStorage.getItem("token")), [k, v] = f(!0), { run: y, error: m } = _(async () => {
    const s = localStorage.getItem("token");
    return s ? (T(s, !1), I.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      r(void 0);
    },
    onSuccess: (s) => {
      r(s);
    },
    onError: (s) => {
      console.log([s]), console.error("Failed to get current user:", s), d();
    },
    onFinally: () => {
      v(!1);
    }
  });
  A(() => {
    y();
  }, []);
  const n = async (s) => {
    try {
      const e = await I.authorization.login(s), { token: u, user: l, needs_mfa: h, password_expired: t, mfa_token: C, mfa_type: w } = e;
      if (h)
        throw { needsMFA: !0, mfaToken: C, mfaType: w, user: l };
      if (t)
        throw { password_expired: !0, user: l, token: u };
      return T(u), c(u), r(l), l;
    } catch (e) {
      throw e && e.needsMFA || e && e.password_expired || D.error("Login failed, please check your username and password"), e;
    }
  }, a = P(async (s) => {
    try {
      const e = await I.oauth.handleCallback(s, { headers: { "X-Base-Path": M() } });
      let u = "", l = null;
      if (e && typeof e == "object")
        if ("code" in e && e.code === "0" && "data" in e) {
          const { token: h, user: t, needs_mfa: C, mfa_token: w, mfa_type: O } = e.data;
          if (C)
            throw { needsMFA: !0, mfaToken: w, mfaType: O, user: t };
          u = h, l = t;
        } else {
          const { token: h, user: t, needs_mfa: C, mfa_token: w, mfa_type: O } = e;
          if (C)
            throw { needsMFA: !0, mfaToken: w, mfaType: O, user: t };
          u = h, l = t;
        }
      return T(u), c(u), r(l), l;
    } catch (e) {
      throw r(void 0), e && e.needsMFA || e && e.passwordExpired, e;
    }
  }, []), d = () => {
    I.authorization.logout(), T(null), c(null), r(null);
  }, g = (s) => {
    r(s);
  };
  return /* @__PURE__ */ z.jsx(
    b.Provider,
    {
      value: {
        user: o,
        token: p,
        loading: k,
        login: n,
        oauthLogin: a,
        logout: d,
        updateUser: g,
        error: m
      },
      children: i
    }
  );
}, N = () => {
  const i = S(b);
  if (i === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return i;
}, U = x({
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
}), E = () => S(U), Q = ({ children: i }) => {
  const { user: o } = j(), { data: r = null, loading: p, runAsync: c, error: k } = _(async () => I.system.getSiteConfig(), {
    manual: !0
  });
  A(() => {
    o !== void 0 && c();
  }, [o]);
  const [v, y] = f(localStorage.getItem("orgID"));
  A(() => {
    v ? localStorage.setItem("orgID", v) : localStorage.removeItem("orgID");
  }, [v]), A(() => {
    var s, e, u;
    if (o) {
      let l = localStorage.getItem("orgID");
      if (l) {
        const h = (s = o == null ? void 0 : o.organizations) == null ? void 0 : s.find((t) => t.id === l);
        if (h) {
          y(h.id);
          return;
        }
      }
      y(((u = (e = o == null ? void 0 : o.organizations) == null ? void 0 : e[0]) == null ? void 0 : u.id) ?? null);
    }
  }, [r, o == null ? void 0 : o.organizations]);
  const [m, n] = f(!1), [a, d] = f([]), { run: g } = _(async () => I.userTasks.listUserTasks({}), {
    onSuccess: (s) => {
      d(s);
    },
    refreshDeps: [o],
    pollingInterval: m ? 3e3 : 6e4
  });
  return A(() => {
    m && g();
  }, [m]), /* @__PURE__ */ z.jsx(
    U.Provider,
    {
      value: {
        siteConfig: r,
        loading: p,
        enableMultiOrg: (r == null ? void 0 : r.enable_multi_org) ?? !1,
        fetchSiteConfig: c,
        currentOrgId: v,
        setCurrentOrgId: (s) => {
          y(s);
        },
        clearCurrentOrgId: () => {
          y(null);
        },
        error: k,
        tasks: a,
        setTasksDropdownOpen: (s) => {
          n(s);
        },
        tasksDropdownOpen: m,
        addTask: (s) => {
          d((e) => [s, ...e]), n(!0);
        }
      },
      children: i
    }
  );
}, W = () => {
  var m;
  const { user: i } = S(b), { currentOrgId: o } = E(), r = (m = i == null ? void 0 : i.roles) == null ? void 0 : m.filter((n) => !n.organization_id || n.organization_id === o), p = () => r ? r.some((n) => n.name === "admin" && !n.organization_id) : !1, c = (n) => r ? p() ? !0 : r.some((a) => a.permissions ? a.permissions.some((d) => d.code === n) : !1) : !1;
  return {
    hasPermission: c,
    hasAllPermissions: (n) => n.every((a) => c(a)),
    hasAnyPermission: (n) => n.some((a) => c(a)),
    hasGlobalPermission: (n) => r ? p() ? !0 : r.some((a) => a.organization_id || !a.permissions ? !1 : a.permissions.some((d) => d.code === n)) : !1,
    isAdmin: p(),
    loading: !i
  };
}, F = x({
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
  }
}), Y = () => S(F), Z = ({ children: i }) => {
  const { t: o } = K("ai"), [r, p] = f("sidebar"), [c, k] = f(!1), [v, y] = f(!1), [m, n] = f(void 0), [a, d] = f(), [g, s] = f(null);
  A(() => {
    const t = localStorage.getItem("activeConversationKey");
    t && n(t);
  }, []);
  const e = P((t, C) => {
    k(!0), g ? g(t, C) : d([t, C]);
  }, [g, k]);
  A(() => {
    g && a && (g(a[0], a[1]), d(void 0));
  }, [g, a]);
  const { loading: u, runAsync: l, data: h } = _(async () => (await I.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: c,
    onError: (t) => {
      D.error(o("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: t.message ?? t }));
    }
  });
  return /* @__PURE__ */ z.jsx(
    F.Provider,
    {
      value: {
        layout: r,
        setLayout: (t) => {
          p(t);
        },
        visible: c,
        setVisible: (t) => {
          k(t);
        },
        callAI: e,
        onCallAI: P((t) => {
          s(() => t);
        }, [s]),
        loaded: v,
        setLoaded: (t) => {
          y(t);
        },
        fetchConversations: l,
        fetchConversationsLoading: u,
        conversations: h,
        activeConversationKey: m,
        setActiveConversationKey: (t) => {
          n(t), localStorage.setItem("activeConversationKey", t);
        }
      },
      children: i
    }
  );
};
export {
  J as A,
  Q as S,
  N as a,
  W as b,
  E as c,
  Z as d,
  j as e,
  Y as u
};
