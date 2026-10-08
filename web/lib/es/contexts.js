import { useContext as S, createContext as U, useState as g, useEffect as x, useCallback as k, useRef as M } from "react";
import { f as j, r as N } from "./client.js";
import { a as w } from "./index.js";
import { j as E, i as V } from "./vendor.js";
import { App as K } from "antd";
import { useRequest as R } from "ahooks";
import { g as G } from "./base.js";
import { useTranslation as $ } from "react-i18next";
import { isFunction as W } from "lodash-es";
const D = U({
  user: void 0,
  loading: !1,
  login: async () => null,
  oauthLogin: async () => null,
  logout: () => {
  },
  updateUser: () => {
  },
  error: void 0
}), X = () => S(D), O = (n, t = !0) => {
  n ? (t && localStorage.setItem("token", n), j.defaults.headers.common.Authorization = `Bearer ${n}`) : (t && localStorage.removeItem("token"), delete j.defaults.headers.common.Authorization);
}, ue = ({ children: n }) => {
  const { message: t } = K.useApp(), [e, l] = g(void 0), [c, a] = g(!0), { run: u, runAsync: d, error: p } = R(async () => {
    const f = localStorage.getItem("token");
    return f ? (O(f, !1), w.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      l(void 0);
    },
    onSuccess: (f) => {
      l(f);
    },
    onError: (f) => {
      console.error("Failed to get current user:", f), h();
    },
    onFinally: () => {
      a(!1);
    }
  });
  x(() => {
    u();
  }, []);
  const r = async (f) => {
    try {
      const i = await w.authorization.login(f), { token: I, user: y, needs_mfa: m, password_expired: v, mfa_token: b, mfa_type: A } = i;
      if (m)
        throw { needsMFA: !0, mfaToken: b, mfaType: A, user: y };
      if (v)
        throw { password_expired: !0, user: y, token: I };
      return O(I), l(y), y;
    } catch (i) {
      throw i && i.needsMFA || i && i.password_expired || t.error("Login failed, please check your username and password"), i;
    }
  }, o = k(async (f) => {
    try {
      const i = await w.oauth.handleCallback(f, { headers: { "X-Base-Path": G() } });
      let I = "";
      if (i && typeof i == "object")
        if ("code" in i && i.code === "0" && "data" in i) {
          const { token: m, user: v, needs_mfa: b, mfa_token: A, mfa_type: C } = i.data;
          if (b)
            throw { needsMFA: !0, mfaToken: A, mfaType: C, user: v };
          I = m;
        } else {
          const { token: m, user: v, needs_mfa: b, mfa_token: A, mfa_type: C } = i;
          if (b)
            throw { needsMFA: !0, mfaToken: A, mfaType: C, user: v };
          I = m;
        }
      O(I);
      const y = await d();
      return l(y || null), y || null;
    } catch (i) {
      throw l(void 0), i && i.needsMFA || i && i.passwordExpired, i;
    }
  }, []), h = () => {
    w.authorization.logout(), O(null), l(null);
  }, _ = (f) => {
    l(f);
  };
  return /* @__PURE__ */ E.jsx(
    D.Provider,
    {
      value: {
        user: e,
        loading: c,
        login: r,
        oauthLogin: o,
        logout: h,
        updateUser: _,
        error: p
      },
      children: n
    }
  );
}, H = () => {
  const n = S(D);
  if (n === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return n;
}, B = U({
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
  },
  inboxUnreadCount: 0,
  setInboxUnreadCount: () => {
  },
  inboxRevision: 0,
  bumpInboxRevision: () => {
  }
}), q = () => S(B), de = ({ children: n }) => {
  const { user: t } = X(), { data: e = null, loading: l, runAsync: c, error: a } = R(async () => w.system.getSiteConfig(), {
    manual: !0
  });
  x(() => {
    t !== void 0 && c();
  }, [t]);
  const [u, d] = g(localStorage.getItem("orgID"));
  x(() => {
    u ? localStorage.setItem("orgID", u) : localStorage.removeItem("orgID");
  }, [u]), x(() => {
    var A, C, T;
    if (!t)
      return;
    const m = (e == null ? void 0 : e.enable_multi_org) ?? !1, v = e == null ? void 0 : e.default_organization_id;
    if (!m && v) {
      d(v);
      return;
    }
    const b = localStorage.getItem("orgID");
    if (b) {
      const P = (A = t == null ? void 0 : t.organizations) == null ? void 0 : A.find((z) => z.id === b);
      if (P) {
        d(P.id);
        return;
      }
    }
    d(((T = (C = t == null ? void 0 : t.organizations) == null ? void 0 : C[0]) == null ? void 0 : T.id) ?? null);
  }, [e, t == null ? void 0 : t.organizations]);
  const [p, r] = g(!1), [o, h] = g([]), [_, f] = g(0), [i, I] = g(0), y = k(() => {
    I((m) => m + 1);
  }, []);
  return /* @__PURE__ */ E.jsx(
    B.Provider,
    {
      value: {
        siteConfig: e,
        loading: l,
        enableMultiOrg: (e == null ? void 0 : e.enable_multi_org) ?? !1,
        enableSkillToolBinding: (e == null ? void 0 : e.enable_skill_tool_binding) ?? !1,
        fetchSiteConfig: c,
        currentOrgId: u,
        setCurrentOrgId: (m) => {
          d(m);
        },
        clearCurrentOrgId: () => {
          d(null);
        },
        error: a,
        tasks: o,
        setTasksDropdownOpen: (m) => {
          r(m);
        },
        tasksDropdownOpen: p,
        setTasks: (m) => {
          h(m);
        },
        addTask: (m) => {
          h((v) => [m, ...v]), r(!0);
        },
        inboxUnreadCount: _,
        setInboxUnreadCount: f,
        inboxRevision: i,
        bumpInboxRevision: y
      },
      children: n
    }
  );
}, fe = () => {
  var p;
  const { user: n } = S(D), { currentOrgId: t } = q(), e = (p = n == null ? void 0 : n.roles) == null ? void 0 : p.filter((r) => !r.organization_id || r.organization_id === t), l = () => e ? e.some((r) => r.name === "admin" && !r.organization_id) : !1, c = (r) => e ? l() ? !0 : e.some((o) => o.permissions ? o.permissions.some((h) => h.code === r) : !1) : !1;
  return {
    hasPermission: c,
    hasAllPermissions: (r) => r.every((o) => c(o)),
    hasAnyPermission: (r) => r.some((o) => c(o)),
    hasGlobalPermission: (r) => e ? l() ? !0 : e.some((o) => o.organization_id || !o.permissions ? !1 : o.permissions.some((h) => h.code === r)) : !1,
    isAdmin: l(),
    loading: !n
  };
};
function Q(n) {
  let t, e;
  const l = [];
  for (const c of n.split(`
`)) {
    if (!c || c.startsWith(":"))
      continue;
    const a = c.indexOf(":"), u = a === -1 ? c : c.slice(0, a);
    let d = a === -1 ? "" : c.slice(a + 1);
    d.startsWith(" ") && (d = d.slice(1)), u === "id" ? t = d : u === "event" ? e = d : u === "data" && l.push(d);
  }
  return !t && !e && l.length === 0 ? null : { id: t, event: e, data: l.join(`
`) };
}
async function Y(n, t, e) {
  const l = n.getReader(), c = new TextDecoder();
  let a = "";
  try {
    for (; !t.aborted; ) {
      const { done: u, value: d } = await l.read();
      if (u)
        break;
      a += c.decode(d, { stream: !0 }), a = a.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      let p = a.indexOf(`

`);
      for (; p >= 0; ) {
        const r = a.slice(0, p);
        a = a.slice(p + 2);
        const o = Q(r);
        o && e(o), p = a.indexOf(`

`);
      }
    }
  } finally {
    try {
      l.releaseLock();
    } catch {
    }
  }
}
function Z(n, t) {
  return new Promise((e) => {
    if (t.aborted) {
      e();
      return;
    }
    const l = window.setTimeout(e, n);
    t.addEventListener(
      "abort",
      () => {
        window.clearTimeout(l), e();
      },
      { once: !0 }
    );
  });
}
function me() {
  const { user: n } = H(), { setInboxUnreadCount: t, bumpInboxRevision: e } = q(), l = M(""), c = M(0);
  x(() => {
    if (!(n != null && n.id)) {
      l.current = "", c.current = 0, t(0);
      return;
    }
    const a = new AbortController();
    let u = 1e3;
    w.inbox.getInboxUnreadCount().then((r) => {
      if (a.signal.aborted)
        return;
      const o = (r == null ? void 0 : r.unread_count) ?? 0;
      c.current = o, t(o);
    }).catch(() => {
    });
    const d = (r) => {
      if (r.id && (l.current = r.id), !r.data)
        return;
      let o;
      try {
        o = JSON.parse(r.data);
      } catch {
        return;
      }
      typeof o.unread_count == "number" && (o.unread_count !== c.current ? (c.current = o.unread_count, t(o.unread_count), o.event_type === "sync" && e()) : t(o.unread_count)), o.event_type === "message" && e();
    };
    return (async () => {
      for (; !a.signal.aborted; ) {
        try {
          const r = {};
          l.current && (r["Last-Event-ID"] = l.current);
          const o = await N("/api/inbox/stream", {
            method: "GET",
            requestType: "sse",
            signal: a.signal,
            headers: r
          });
          u = 1e3, await Y(o, a.signal, d);
        } catch {
          if (a.signal.aborted)
            return;
        }
        if (a.signal.aborted)
          return;
        await Z(u, a.signal), u = Math.min(u * 2, 15e3);
      }
    })(), () => {
      a.abort();
    };
  }, [n == null ? void 0 : n.id, t, e]);
}
function ee(n) {
  return n ? Array.isArray(n) ? { messages: n } : n : {};
}
const J = U({
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
}), ge = () => S(J), pe = ({ children: n }) => {
  const { message: t } = K.useApp(), { t: e } = $("ai"), [l, c] = g("sidebar"), [a, u] = g(!1), [d, p] = g(!1), [r, o] = g(void 0), [h, _] = g(), [f, i] = g(null), [I, y] = g([]), [m, v] = g([]), b = k(() => {
    y([]), v([]);
  }, []), A = k((s) => {
    s.ephemeralSystemPrompts && y(s.ephemeralSystemPrompts);
    const L = s.pageData ? [{
      name: "ui_get_page_data",
      description: `This is a browser/client-side method. If the user explicitly instructs you to retrieve page data or if you believe it is necessary to retrieve page data, you can try invoking this method. ${s.pageDataDescription || "Returns a JSON snapshot of the current page data."}`,
      parameters: { type: "object", properties: {}, required: [] },
      handler: () => V(s.pageData) ? s.pageData : W(s.pageData) ? JSON.stringify(s.pageData()) : JSON.stringify(s.pageData)
    }] : [];
    return v([...L, ...s.tools ?? []]), () => {
      b();
    };
  }, [b]);
  x(() => {
    const s = localStorage.getItem("activeConversationKey");
    s && o(s);
  }, []);
  const C = k((s, L) => {
    const F = ee(L);
    u(!0), f ? f(s, F) : _({ message: s, options: F });
  }, [f, u]);
  x(() => {
    f && h && (f(h.message, h.options), _(void 0));
  }, [f, h]);
  const { loading: T, runAsync: P, data: z } = R(async () => (await w.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: a,
    onError: (s) => {
      t.error(e("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: s.message ?? s }));
    }
  });
  return /* @__PURE__ */ E.jsx(
    J.Provider,
    {
      value: {
        layout: l,
        setLayout: (s) => {
          c(s);
        },
        visible: a,
        setVisible: (s) => {
          u(s);
        },
        callAI: C,
        onCallAI: k((s) => {
          i(() => s);
        }, [i]),
        loaded: d,
        setLoaded: (s) => {
          p(s);
        },
        fetchConversations: P,
        fetchConversationsLoading: T,
        conversations: z,
        activeConversationKey: r,
        setActiveConversationKey: (s) => {
          o(s), localStorage.setItem("activeConversationKey", s);
        },
        ephemeralSystemPrompts: I,
        clientTools: m,
        registerPageAI: A,
        resetPageAIContext: b
      },
      children: n
    }
  );
};
export {
  ue as A,
  de as S,
  fe as a,
  q as b,
  X as c,
  ge as d,
  me as e,
  pe as f,
  ee as n,
  H as u
};
