import { useContext as S, createContext as z, useState as g, useEffect as x, useCallback as k, useRef as M } from "react";
import { f as F, r as J } from "./client.js";
import { a as C } from "./index.js";
import { j as E, i as N } from "./vendor.js";
import { App as j } from "antd";
import { useRequest as R } from "ahooks";
import { g as V } from "./base.js";
import { useTranslation as G } from "react-i18next";
import { isFunction as $ } from "lodash-es";
const L = z({
  user: void 0,
  loading: !1,
  login: async () => null,
  oauthLogin: async () => null,
  logout: () => {
  },
  updateUser: () => {
  },
  error: void 0
}), W = () => S(L), D = (s, t = !0) => {
  s ? (t && localStorage.setItem("token", s), F.defaults.headers.common.Authorization = `Bearer ${s}`) : (t && localStorage.removeItem("token"), delete F.defaults.headers.common.Authorization);
}, le = ({ children: s }) => {
  const { message: t } = j.useApp(), [e, l] = g(void 0), [c, a] = g(!0), { run: u, runAsync: d, error: p } = R(async () => {
    const f = localStorage.getItem("token");
    return f ? (D(f, !1), C.authorization.getCurrentUser()) : null;
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
  const n = async (f) => {
    try {
      const i = await C.authorization.login(f), { token: I, user: y, needs_mfa: m, password_expired: v, mfa_token: b, mfa_type: A } = i;
      if (m)
        throw { needsMFA: !0, mfaToken: b, mfaType: A, user: y };
      if (v)
        throw { password_expired: !0, user: y, token: I };
      return D(I), l(y), y;
    } catch (i) {
      throw i && i.needsMFA || i && i.password_expired || t.error("Login failed, please check your username and password"), i;
    }
  }, o = k(async (f) => {
    try {
      const i = await C.oauth.handleCallback(f, { headers: { "X-Base-Path": V() } });
      let I = "";
      if (i && typeof i == "object")
        if ("code" in i && i.code === "0" && "data" in i) {
          const { token: m, user: v, needs_mfa: b, mfa_token: A, mfa_type: w } = i.data;
          if (b)
            throw { needsMFA: !0, mfaToken: A, mfaType: w, user: v };
          I = m;
        } else {
          const { token: m, user: v, needs_mfa: b, mfa_token: A, mfa_type: w } = i;
          if (b)
            throw { needsMFA: !0, mfaToken: A, mfaType: w, user: v };
          I = m;
        }
      D(I);
      const y = await d();
      return l(y || null), y || null;
    } catch (i) {
      throw l(void 0), i && i.needsMFA || i && i.passwordExpired, i;
    }
  }, []), h = () => {
    C.authorization.logout(), D(null), l(null);
  }, _ = (f) => {
    l(f);
  };
  return /* @__PURE__ */ E.jsx(
    L.Provider,
    {
      value: {
        user: e,
        loading: c,
        login: n,
        oauthLogin: o,
        logout: h,
        updateUser: _,
        error: p
      },
      children: s
    }
  );
}, X = () => {
  const s = S(L);
  if (s === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return s;
}, K = z({
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
}), B = () => S(K), ce = ({ children: s }) => {
  const { user: t } = W(), { data: e = null, loading: l, runAsync: c, error: a } = R(async () => C.system.getSiteConfig(), {
    manual: !0
  });
  x(() => {
    t !== void 0 && c();
  }, [t]);
  const [u, d] = g(localStorage.getItem("orgID"));
  x(() => {
    u ? localStorage.setItem("orgID", u) : localStorage.removeItem("orgID");
  }, [u]), x(() => {
    var A, w, T;
    if (!t)
      return;
    const m = (e == null ? void 0 : e.enable_multi_org) ?? !1, v = e == null ? void 0 : e.default_organization_id;
    if (!m && v) {
      d(v);
      return;
    }
    const b = localStorage.getItem("orgID");
    if (b) {
      const P = (A = t == null ? void 0 : t.organizations) == null ? void 0 : A.find((U) => U.id === b);
      if (P) {
        d(P.id);
        return;
      }
    }
    d(((T = (w = t == null ? void 0 : t.organizations) == null ? void 0 : w[0]) == null ? void 0 : T.id) ?? null);
  }, [e, t == null ? void 0 : t.organizations]);
  const [p, n] = g(!1), [o, h] = g([]), [_, f] = g(0), [i, I] = g(0), y = k(() => {
    I((m) => m + 1);
  }, []);
  return /* @__PURE__ */ E.jsx(
    K.Provider,
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
          n(m);
        },
        tasksDropdownOpen: p,
        setTasks: (m) => {
          h(m);
        },
        addTask: (m) => {
          h((v) => [m, ...v]), n(!0);
        },
        inboxUnreadCount: _,
        setInboxUnreadCount: f,
        inboxRevision: i,
        bumpInboxRevision: y
      },
      children: s
    }
  );
}, ue = () => {
  var p;
  const { user: s } = S(L), { currentOrgId: t } = B(), e = (p = s == null ? void 0 : s.roles) == null ? void 0 : p.filter((n) => !n.organization_id || n.organization_id === t), l = () => e ? e.some((n) => n.name === "admin" && !n.organization_id) : !1, c = (n) => e ? l() ? !0 : e.some((o) => o.permissions ? o.permissions.some((h) => h.code === n) : !1) : !1;
  return {
    hasPermission: c,
    hasAllPermissions: (n) => n.every((o) => c(o)),
    hasAnyPermission: (n) => n.some((o) => c(o)),
    hasGlobalPermission: (n) => e ? l() ? !0 : e.some((o) => o.organization_id || !o.permissions ? !1 : o.permissions.some((h) => h.code === n)) : !1,
    isAdmin: l(),
    loading: !s
  };
};
function H(s) {
  let t, e;
  const l = [];
  for (const c of s.split(`
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
async function Q(s, t, e) {
  const l = s.getReader(), c = new TextDecoder();
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
        const n = a.slice(0, p);
        a = a.slice(p + 2);
        const o = H(n);
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
function Y(s, t) {
  return new Promise((e) => {
    if (t.aborted) {
      e();
      return;
    }
    const l = window.setTimeout(e, s);
    t.addEventListener(
      "abort",
      () => {
        window.clearTimeout(l), e();
      },
      { once: !0 }
    );
  });
}
function de() {
  const { user: s } = X(), { setInboxUnreadCount: t, bumpInboxRevision: e } = B(), l = M(""), c = M(0);
  x(() => {
    if (!(s != null && s.id)) {
      l.current = "", c.current = 0, t(0);
      return;
    }
    const a = new AbortController();
    let u = 1e3;
    C.inbox.getInboxUnreadCount().then((n) => {
      if (a.signal.aborted)
        return;
      const o = (n == null ? void 0 : n.unread_count) ?? 0;
      c.current = o, t(o);
    }).catch(() => {
    });
    const d = (n) => {
      if (n.id && (l.current = n.id), !n.data)
        return;
      let o;
      try {
        o = JSON.parse(n.data);
      } catch {
        return;
      }
      typeof o.unread_count == "number" && (o.unread_count !== c.current ? (c.current = o.unread_count, t(o.unread_count), o.event_type === "sync" && e()) : t(o.unread_count)), o.event_type === "message" && e();
    };
    return (async () => {
      for (; !a.signal.aborted; ) {
        try {
          const n = {};
          l.current && (n["Last-Event-ID"] = l.current);
          const o = await J("/api/inbox/stream", {
            method: "GET",
            requestType: "sse",
            signal: a.signal,
            headers: n
          });
          u = 1e3, await Q(o, a.signal, d);
        } catch {
          if (a.signal.aborted)
            return;
        }
        if (a.signal.aborted)
          return;
        await Y(u, a.signal), u = Math.min(u * 2, 15e3);
      }
    })(), () => {
      a.abort();
    };
  }, [s == null ? void 0 : s.id, t, e]);
}
const q = z({
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
}), fe = () => S(q), me = ({ children: s }) => {
  const { message: t } = j.useApp(), { t: e } = G("ai"), [l, c] = g("sidebar"), [a, u] = g(!1), [d, p] = g(!1), [n, o] = g(void 0), [h, _] = g(), [f, i] = g(null), [I, y] = g([]), [m, v] = g([]), b = k(() => {
    y([]), v([]);
  }, []), A = k((r) => {
    r.ephemeralSystemPrompts && y(r.ephemeralSystemPrompts);
    const O = r.pageData ? [{
      name: "ui_get_page_data",
      description: `This is a browser/client-side method. If the user explicitly instructs you to retrieve page data or if you believe it is necessary to retrieve page data, you can try invoking this method. ${r.pageDataDescription || "Returns a JSON snapshot of the current page data."}`,
      parameters: { type: "object", properties: {}, required: [] },
      handler: () => N(r.pageData) ? r.pageData : $(r.pageData) ? JSON.stringify(r.pageData()) : JSON.stringify(r.pageData)
    }] : [];
    return v([...O, ...r.tools ?? []]), () => {
      b();
    };
  }, [b]);
  x(() => {
    const r = localStorage.getItem("activeConversationKey");
    r && o(r);
  }, []);
  const w = k((r, O) => {
    u(!0), f ? f(r, O) : _([r, O]);
  }, [f, u]);
  x(() => {
    f && h && (f(h[0], h[1]), _(void 0));
  }, [f, h]);
  const { loading: T, runAsync: P, data: U } = R(async () => (await C.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: a,
    onError: (r) => {
      t.error(e("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: r.message ?? r }));
    }
  });
  return /* @__PURE__ */ E.jsx(
    q.Provider,
    {
      value: {
        layout: l,
        setLayout: (r) => {
          c(r);
        },
        visible: a,
        setVisible: (r) => {
          u(r);
        },
        callAI: w,
        onCallAI: k((r) => {
          i(() => r);
        }, [i]),
        loaded: d,
        setLoaded: (r) => {
          p(r);
        },
        fetchConversations: P,
        fetchConversationsLoading: T,
        conversations: U,
        activeConversationKey: n,
        setActiveConversationKey: (r) => {
          o(r), localStorage.setItem("activeConversationKey", r);
        },
        ephemeralSystemPrompts: I,
        clientTools: m,
        registerPageAI: A,
        resetPageAIContext: b
      },
      children: s
    }
  );
};
export {
  le as A,
  ce as S,
  ue as a,
  B as b,
  W as c,
  fe as d,
  de as e,
  me as f,
  X as u
};
