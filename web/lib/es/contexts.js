import { useContext as F, createContext as V, useState as I, useEffect as E, useCallback as C, useRef as x, useMemo as J } from "react";
import { f as H, r as he } from "./client.js";
import { a as z } from "./index.js";
import { useNavigate as ge, useLocation as ye, matchRoutes as Q } from "react-router-dom";
import { useTranslation as ne } from "react-i18next";
import { j as W, i as ve } from "./vendor.js";
import { useRequest as Y } from "ahooks";
import { App as re } from "antd";
import { isFunction as be } from "lodash-es";
import { g as we, t as _e } from "./base.js";
const G = V({
  user: void 0,
  loading: !1,
  login: async () => null,
  oauthLogin: async () => null,
  logout: () => {
  },
  updateUser: () => {
  },
  error: void 0
}), Ae = () => F(G), $ = (n, t = !0) => {
  n ? (t && localStorage.setItem("token", n), H.defaults.headers.common.Authorization = `Bearer ${n}`) : (t && localStorage.removeItem("token"), delete H.defaults.headers.common.Authorization);
}, Me = ({ children: n }) => {
  const { message: t } = re.useApp(), [e, r] = I(void 0), [u, i] = I(!0), { run: d, runAsync: p, error: l } = Y(async () => {
    const f = localStorage.getItem("token");
    return f ? ($(f, !1), z.authorization.getCurrentUser()) : null;
  }, {
    manual: !0,
    onBefore: () => {
      r(void 0);
    },
    onSuccess: (f) => {
      r(f);
    },
    onError: (f) => {
      console.error("Failed to get current user:", f), y();
    },
    onFinally: () => {
      i(!1);
    }
  });
  E(() => {
    d();
  }, []);
  const a = async (f) => {
    try {
      const c = await z.authorization.login(f), { token: A, user: v, needs_mfa: m, password_expired: b, mfa_token: P, mfa_type: w } = c;
      if (m)
        throw { needsMFA: !0, mfaToken: P, mfaType: w, user: v };
      if (b)
        throw { password_expired: !0, user: v, token: A };
      return $(A), r(v), v;
    } catch (c) {
      throw c && c.needsMFA || c && c.password_expired || t.error("Login failed, please check your username and password"), c;
    }
  }, s = C(async (f) => {
    try {
      const c = await z.oauth.handleCallback(f, { headers: { "X-Base-Path": we() } });
      let A = "";
      if (c && typeof c == "object")
        if ("code" in c && c.code === "0" && "data" in c) {
          const { token: m, user: b, needs_mfa: P, mfa_token: w, mfa_type: _ } = c.data;
          if (P)
            throw { needsMFA: !0, mfaToken: w, mfaType: _, user: b };
          A = m;
        } else {
          const { token: m, user: b, needs_mfa: P, mfa_token: w, mfa_type: _ } = c;
          if (P)
            throw { needsMFA: !0, mfaToken: w, mfaType: _, user: b };
          A = m;
        }
      $(A);
      const v = await p();
      return r(v || null), v || null;
    } catch (c) {
      throw r(void 0), c && c.needsMFA || c && c.passwordExpired, c;
    }
  }, []), y = () => {
    z.authorization.logout(), $(null), r(null);
  }, k = (f) => {
    r(f);
  };
  return /* @__PURE__ */ W.jsx(
    G.Provider,
    {
      value: {
        user: e,
        loading: u,
        login: a,
        oauthLogin: s,
        logout: y,
        updateUser: k,
        error: l
      },
      children: n
    }
  );
}, oe = () => {
  const n = F(G);
  if (n === void 0)
    throw new Error("useAuth must be used within an AuthProvider");
  return n;
}, se = V({
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
}), X = () => F(se), $e = ({ children: n }) => {
  const { user: t } = Ae(), { data: e = null, loading: r, runAsync: u, error: i } = Y(async () => z.system.getSiteConfig(), {
    manual: !0
  });
  E(() => {
    t !== void 0 && u();
  }, [t]);
  const [d, p] = I(localStorage.getItem("orgID"));
  E(() => {
    d ? localStorage.setItem("orgID", d) : localStorage.removeItem("orgID");
  }, [d]), E(() => {
    var w, _, S;
    if (!t)
      return;
    const m = (e == null ? void 0 : e.enable_multi_org) ?? !1, b = e == null ? void 0 : e.default_organization_id;
    if (!m && b) {
      p(b);
      return;
    }
    const P = localStorage.getItem("orgID");
    if (P) {
      const h = (w = t == null ? void 0 : t.organizations) == null ? void 0 : w.find((g) => g.id === P);
      if (h) {
        p(h.id);
        return;
      }
    }
    p(((S = (_ = t == null ? void 0 : t.organizations) == null ? void 0 : _[0]) == null ? void 0 : S.id) ?? null);
  }, [e, t == null ? void 0 : t.organizations]);
  const [l, a] = I(!1), [s, y] = I([]), [k, f] = I(0), [c, A] = I(0), v = C(() => {
    A((m) => m + 1);
  }, []);
  return /* @__PURE__ */ W.jsx(
    se.Provider,
    {
      value: {
        siteConfig: e,
        loading: r,
        enableMultiOrg: (e == null ? void 0 : e.enable_multi_org) ?? !1,
        enableSkillToolBinding: (e == null ? void 0 : e.enable_skill_tool_binding) ?? !1,
        fetchSiteConfig: u,
        currentOrgId: d,
        setCurrentOrgId: (m) => {
          p(m);
        },
        clearCurrentOrgId: () => {
          p(null);
        },
        error: i,
        tasks: s,
        setTasksDropdownOpen: (m) => {
          a(m);
        },
        tasksDropdownOpen: l,
        setTasks: (m) => {
          y(m);
        },
        addTask: (m) => {
          y((b) => [m, ...b]), a(!0);
        },
        inboxUnreadCount: k,
        setInboxUnreadCount: f,
        inboxRevision: c,
        bumpInboxRevision: v
      },
      children: n
    }
  );
}, Ie = () => {
  var l;
  const { user: n } = F(G), { currentOrgId: t } = X(), e = (l = n == null ? void 0 : n.roles) == null ? void 0 : l.filter((a) => !a.organization_id || a.organization_id === t), r = () => e ? e.some((a) => a.name === "admin" && !a.organization_id) : !1, u = (a) => e ? r() ? !0 : e.some((s) => s.permissions ? s.permissions.some((y) => y.code === a) : !1) : !1;
  return {
    hasPermission: u,
    hasAllPermissions: (a) => a.every((s) => u(s)),
    hasAnyPermission: (a) => a.some((s) => u(s)),
    hasGlobalPermission: (a) => e ? r() ? !0 : e.some((s) => s.organization_id || !s.permissions ? !1 : s.permissions.some((y) => y.code === a)) : !1,
    isAdmin: r(),
    loading: !n
  };
};
function Se(n) {
  let t, e;
  const r = [];
  for (const u of n.split(`
`)) {
    if (!u || u.startsWith(":"))
      continue;
    const i = u.indexOf(":"), d = i === -1 ? u : u.slice(0, i);
    let p = i === -1 ? "" : u.slice(i + 1);
    p.startsWith(" ") && (p = p.slice(1)), d === "id" ? t = p : d === "event" ? e = p : d === "data" && r.push(p);
  }
  return !t && !e && r.length === 0 ? null : { id: t, event: e, data: r.join(`
`) };
}
async function Pe(n, t, e) {
  const r = n.getReader(), u = new TextDecoder();
  let i = "";
  try {
    for (; !t.aborted; ) {
      const { done: d, value: p } = await r.read();
      if (d)
        break;
      i += u.decode(p, { stream: !0 }), i = i.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      let l = i.indexOf(`

`);
      for (; l >= 0; ) {
        const a = i.slice(0, l);
        i = i.slice(l + 2);
        const s = Se(a);
        s && e(s), l = i.indexOf(`

`);
      }
    }
  } finally {
    try {
      r.releaseLock();
    } catch {
    }
  }
}
function Ce(n, t) {
  return new Promise((e) => {
    if (t.aborted) {
      e();
      return;
    }
    const r = window.setTimeout(e, n);
    t.addEventListener(
      "abort",
      () => {
        window.clearTimeout(r), e();
      },
      { once: !0 }
    );
  });
}
function Ge() {
  const { user: n } = oe(), { setInboxUnreadCount: t, bumpInboxRevision: e } = X(), r = x(""), u = x(0);
  E(() => {
    if (!(n != null && n.id)) {
      r.current = "", u.current = 0, t(0);
      return;
    }
    const i = new AbortController();
    let d = 1e3;
    z.inbox.getInboxUnreadCount().then((a) => {
      if (i.signal.aborted)
        return;
      const s = (a == null ? void 0 : a.unread_count) ?? 0;
      u.current = s, t(s);
    }).catch(() => {
    });
    const p = (a) => {
      if (a.id && (r.current = a.id), !a.data)
        return;
      let s;
      try {
        s = JSON.parse(a.data);
      } catch {
        return;
      }
      typeof s.unread_count == "number" && (s.unread_count !== u.current ? (u.current = s.unread_count, t(s.unread_count), s.event_type === "sync" && e()) : t(s.unread_count)), s.event_type === "message" && e();
    };
    return (async () => {
      for (; !i.signal.aborted; ) {
        try {
          const a = {};
          r.current && (a["Last-Event-ID"] = r.current);
          const s = await he("/api/inbox/stream", {
            method: "GET",
            requestType: "sse",
            signal: i.signal,
            headers: a
          });
          d = 1e3, await Pe(s, i.signal, p);
        } catch {
          if (i.signal.aborted)
            return;
        }
        if (i.signal.aborted)
          return;
        await Ce(d, i.signal), d = Math.min(d * 2, 15e3);
      }
    })(), () => {
      i.abort();
    };
  }, [n == null ? void 0 : n.id, t, e]);
}
function xe(n) {
  return n ? Array.isArray(n) ? { messages: n } : n : {};
}
const ae = V({
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
  },
  registerGlobalAI: () => () => {
  },
  getClientTools: () => [],
  getEphemeralSystemPrompts: () => [],
  waitForPageAI: () => Promise.resolve(!1)
});
function Z() {
  return typeof window < "u" ? window.location.pathname : "";
}
function ke(n, t) {
  return typeof t == "function" ? {
    id: n,
    apply: (e) => {
      const r = t({
        ephemeralSystemPrompts: [...e.ephemeralSystemPrompts],
        tools: [...e.tools]
      });
      return {
        ephemeralSystemPrompts: (r == null ? void 0 : r.ephemeralSystemPrompts) ?? [],
        tools: (r == null ? void 0 : r.tools) ?? []
      };
    }
  } : {
    id: n,
    apply: (e) => ({
      ephemeralSystemPrompts: [...e.ephemeralSystemPrompts, ...t.ephemeralSystemPrompts ?? []],
      tools: [...e.tools, ...t.tools ?? []]
    })
  };
}
function ie(n) {
  return n.reduce(
    (t, e) => e.apply(t),
    { ephemeralSystemPrompts: [], tools: [] }
  );
}
function ee(n, t) {
  return [...ie(n).ephemeralSystemPrompts, ...(t == null ? void 0 : t.prompts) ?? []];
}
function te(n, t) {
  const e = /* @__PURE__ */ new Map();
  for (const r of ie(n).tools)
    e.set(r.name, r);
  for (const r of (t == null ? void 0 : t.tools) ?? [])
    e.set(r.name, r);
  return Array.from(e.values());
}
const Oe = () => F(ae), qe = ({ children: n }) => {
  const { message: t } = re.useApp(), { t: e } = ne("ai"), [r, u] = I("sidebar"), [i, d] = I(!1), [p, l] = I(!1), [a, s] = I(void 0), [y, k] = I(), [f, c] = I(null), A = x(0), v = x(null), m = x([]), [b, P] = I(null), [w, _] = I([]), S = x([]), h = C((o) => {
    v.current = o, P(o);
  }, []), g = C((o) => {
    m.current = o, _(o);
  }, []), R = C(() => {
    const o = v.current;
    o && o.routeKey !== Z() && h(null);
  }, [h]), O = C((o) => {
    const D = o.pageData ? [{
      name: "ui_get_page_data",
      description: `This is a browser/client-side method. If the user explicitly instructs you to retrieve page data or if you believe it is necessary to retrieve page data, you can try invoking this method. ${o.pageDataDescription || "Returns a JSON snapshot of the current page data."}`,
      parameters: { type: "object", properties: {}, required: [] },
      handler: () => ve(o.pageData) ? o.pageData : be(o.pageData) ? JSON.stringify(o.pageData()) : JSON.stringify(o.pageData)
    }] : [], T = ++A.current, j = Z(), L = v.current;
    h({
      id: T,
      routeKey: j,
      // Keep prompts from an earlier registration of the same page when this
      // call does not provide any (matches the previous incremental behavior).
      prompts: o.ephemeralSystemPrompts ?? ((L == null ? void 0 : L.routeKey) === j ? L.prompts : []),
      tools: [...D, ...o.tools ?? []]
    });
    const U = S.current;
    return S.current = [], U.forEach((M) => M(!0)), () => {
      var M;
      ((M = v.current) == null ? void 0 : M.id) === T && h(null);
    };
  }, [h]), K = C((o) => {
    const D = ++A.current;
    return g([...m.current, ke(D, o)]), () => {
      g(m.current.filter((T) => T.id !== D));
    };
  }, [g]), N = C(
    () => te(m.current, v.current),
    []
  ), q = C(
    () => ee(m.current, v.current),
    []
  ), B = C((o = 3e3) => new Promise((D) => {
    let T = !1;
    const j = (U) => {
      T || (T = !0, clearTimeout(L), D(U));
    }, L = setTimeout(() => {
      S.current = S.current.filter((U) => U !== j), j(!1);
    }, o);
    S.current.push(j);
  }), []), ce = J(() => te(w, b), [w, b]), ue = J(() => ee(w, b), [w, b]);
  E(() => {
    const o = localStorage.getItem("activeConversationKey");
    o && s(o);
  }, []);
  const de = C((o, D) => {
    const T = xe(D);
    d(!0), f ? f(o, T) : k({ message: o, options: T });
  }, [f, d]);
  E(() => {
    f && y && (f(y.message, y.options), k(void 0));
  }, [f, y]);
  const { loading: me, runAsync: pe, data: fe } = Y(async () => (await z.ai.listChatSessions({ current: 1, page_size: 20 })).data, {
    ready: i,
    onError: (o) => {
      t.error(e("chat.fetchConversationsFailed", { defaultValue: "Failed to fetch conversations: {{errmsg}}", errmsg: o.message ?? o }));
    }
  });
  return /* @__PURE__ */ W.jsx(
    ae.Provider,
    {
      value: {
        layout: r,
        setLayout: (o) => {
          u(o);
        },
        visible: i,
        setVisible: (o) => {
          d(o);
        },
        callAI: de,
        onCallAI: C((o) => {
          c(() => o);
        }, [c]),
        loaded: p,
        setLoaded: (o) => {
          l(o);
        },
        fetchConversations: pe,
        fetchConversationsLoading: me,
        conversations: fe,
        activeConversationKey: a,
        setActiveConversationKey: (o) => {
          s(o), localStorage.setItem("activeConversationKey", o);
        },
        ephemeralSystemPrompts: ue,
        clientTools: ce,
        registerPageAI: O,
        resetPageAIContext: R,
        registerGlobalAI: K,
        getClientTools: N,
        getEphemeralSystemPrompts: q,
        waitForPageAI: B
      },
      children: n
    }
  );
}, Te = 3e3;
function le(n, t, e, r = [], u = !1, i) {
  const d = [];
  for (const l of n) {
    const a = u || !!l.is_private;
    if (l.permissions && !t(l.permissions))
      continue;
    const s = l.name ? [...r, l.name] : r, y = l.path ?? (l.index ? i : void 0);
    a && y && l.name && !y.includes("*") && d.push({
      path: y,
      name: s.join("."),
      label: e(s, _e(l.name) ?? l.name),
      has_params: y.includes(":")
    }), "children" in l && l.children && d.push(...le(l.children, t, e, s, a, y ?? i));
  }
  const p = /* @__PURE__ */ new Set();
  return d.filter((l) => p.has(l.path) ? !1 : (p.add(l.path), !0));
}
function Re(n) {
  return n.length === 0 ? "" : [
    "You are embedded in a web console and can move between its pages with the ui_navigate tool. Pages available to this user:",
    ...n.map((e) => `- ${e.path} — ${e.label}${e.has_params ? " (replace the :param with a real value)" : ""}`),
    "Only these paths exist; do not invent others. Call ui_get_current_route to learn where the user is now. After navigating, the target page publishes its own ui_* tools, which you can use on the next turn."
  ].join(`
`);
}
function Be(n, t) {
  const { registerGlobalAI: e, getClientTools: r, waitForPageAI: u } = Oe(), i = ge(), d = ye(), { hasAnyPermission: p } = Ie(), { user: l } = oe(), { currentOrgId: a } = X(), { t: s, i18n: y } = ne(), k = x(d);
  k.current = d;
  const f = x(i);
  f.current = i;
  const c = x(n);
  c.current = n;
  const A = x(p);
  A.current = p;
  const v = ((l == null ? void 0 : l.roles) ?? []).map((_) => _.id).join(","), m = J(
    () => le(
      n,
      A.current,
      (_, S) => {
        for (const h of [`breadcrumbs.${_.join("_")}`, `menu.${_.join(".")}`]) {
          const g = s(h, { defaultValue: "" });
          if (typeof g == "string" && g && g !== h)
            return g;
        }
        return S;
      }
    ),
    [n, v, a, y.language, s]
  ), b = x(m);
  b.current = m;
  const P = J(() => {
    const _ = () => b.current.filter((h) => !h.has_params).map((h) => ({ path: h.path, label: h.label })), S = () => {
      const h = k.current, g = Q(c.current, h.pathname) ?? [], R = g.map((O) => O.route.name).filter(Boolean);
      return {
        path: h.pathname,
        search: h.search,
        hash: h.hash,
        route_name: R.join("."),
        params: g.length > 0 ? g[g.length - 1].params : {},
        available_tools: r().map((O) => O.name)
      };
    };
    return [
      {
        name: "ui_get_current_route",
        description: "Browser-side. Returns the current in-app route (path, route name, params) and the client tools available on the current page. The list of pages you can open is already in your instructions.",
        parameters: { type: "object", properties: {}, required: [] },
        handler: () => JSON.stringify(S())
      },
      {
        name: "ui_navigate",
        description: 'Browser-side. Navigate the web app to one of the in-app paths listed in your instructions (e.g. "/authorization/users", or "/authorization/users/<id>" with a real id). After navigation the target page publishes its own ui_* tools; the result lists them under available_tools. Use those tools on the next turn to act on the new page.',
        parameters: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: 'Absolute in-app path starting with "/", optionally with a query string.'
            }
          },
          required: ["path"]
        },
        handler: async (h) => {
          let g;
          try {
            g = JSON.parse(h || "{}").path;
          } catch {
            return JSON.stringify({ error: 'Invalid arguments: expected JSON with a "path" string' });
          }
          if (typeof g != "string" || !g.startsWith("/") || g.startsWith("//"))
            return JSON.stringify({ error: 'path must be an absolute in-app path starting with "/"', navigable_paths: _() });
          const R = g.split(/[?#]/)[0], O = Q(c.current, R);
          if (!O || O.length === 0)
            return JSON.stringify({ error: `No page matches path "${R}"`, navigable_paths: _() });
          const K = O[O.length - 1].route;
          if (K.permissions && !A.current(K.permissions))
            return JSON.stringify({ error: `You do not have permission to open "${R}"`, navigable_paths: _() });
          const N = k.current;
          if (N.pathname === R && `${N.pathname}${N.search}${N.hash}` === g)
            return JSON.stringify({ ok: !0, already_on_page: !0, ...S() });
          const q = u(Te);
          f.current(g);
          const B = await q;
          return JSON.stringify({
            ok: !0,
            page_registered_ai_tools: B,
            ...S()
          });
        }
      },
      {
        name: "ui_choose",
        description: "Ask the user to pick one option when several valid next actions exist. Do not use this to confirm a tool you can call yourself; call that tool and let approval cards handle confirmation.",
        parameters: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            options: {
              type: "array",
              minItems: 2,
              maxItems: 6,
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  label: { type: "string" },
                  description: { type: "string" }
                },
                required: ["id", "label"]
              }
            }
          },
          required: ["title", "options"]
        },
        // Safety net: the card protocol owns this tool. Never treat a handler result as the user's choice.
        handler: () => JSON.stringify({ error: "ui_choose is presented as a chat card and must not be auto-executed" })
      }
    ];
  }, [r, u]), w = J(() => Re(m), [m]);
  E(() => {
    if (t)
      return e({
        ephemeralSystemPrompts: w ? [w] : [],
        tools: P
      });
  }, [t, P, w, e]);
}
export {
  Me as A,
  $e as S,
  Ie as a,
  X as b,
  Ae as c,
  Oe as d,
  Ge as e,
  Be as f,
  qe as g,
  xe as n,
  oe as u
};
