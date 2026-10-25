var De = Object.defineProperty;
var Ee = (i, o, n) => o in i ? De(i, o, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[o] = n;
var me = (i, o, n) => Ee(i, typeof o != "symbol" ? o + "" : o, n);
import { j as a, k as He, l as qe, m as Ke, n as Xe } from "./vendor.js";
import { a as _ } from "./index.js";
import { PlusOutlined as pe, ReloadOutlined as Me, DeleteOutlined as Je, HistoryOutlined as Ge, CloseOutlined as Ye } from "@ant-design/icons";
import { Conversations as We, Sender as ge, XProvider as Ue, Bubble as Qe, Mermaid as Ze, CodeHighlighter as et } from "@ant-design/x";
import { useXConversations as tt, useXChat as nt, XRequest as st, AbstractChatProvider as at } from "@ant-design/x-sdk";
import { XMarkdown as fe } from "@ant-design/x-markdown";
import { useRequest as A } from "ahooks";
import { App as ot, Tag as he, Button as B, Spin as F, Space as xe, Flex as Z, Dropdown as ye, Radio as rt } from "antd";
import { createStyles as it, useThemeMode as lt } from "antd-style";
import ct, { useEffect as v, useState as O, useMemo as N, useCallback as be, useRef as ke } from "react";
import { useTranslation as ve } from "react-i18next";
import ee from "dayjs";
import { d as dt, n as ut } from "./contexts.js";
import mt from "classnames";
/* empty css             */
const Ce = it(({ token: i, css: o }) => ({
  siderLayout: o`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,
  classicLayout: o`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,
  sider: o`
      background: ${i.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,
  logo: o`
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;
      gap: 8px;
      margin: 24px 0;

      span {
        font-weight: bold;
        color: ${i.colorText};
        font-size: 16px;
      }
    `,
  addBtn: o`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,
  conversationsSpin: o`
      height: 100%;
      overflow-y: auto;
    `,
  conversations: o`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
  siderFooter: o`
      border-top: 1px solid ${i.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
  chat: o`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${i.paddingLG}px;
      gap: 16px;
    `,
  chatPrompt: o`
      .ant-prompts-label {
        color: #000000e0 !important;
      }
      .ant-prompts-desc {
        color: #000000a6 !important;
        width: 100%;
      }
      .ant-prompts-icon {
        color: #000000a6 !important;
      }
    `,
  chatList: o`
      flex: 1;
      overflow: auto;
      .ant-spin-nested-loading{
        height: 100%;
        .ant-spin-container{
          height: 100%;
        }
      }
      .ant-bubble-list{
        .ant-bubble.ant-bubble-start{
          padding-inline-end: 10%;
        }
      }
      .x-markdown-light pre .ant-codeHighlighter .ant-codeHighlighter-code pre{
        background-color: #f5f5f5;
        code{
          background-color: #f5f5f5;
        }
      }
      .ant-bubble-content > .x-markdown > pre{
        margin-top: 16px;
        margin-bottom: 11px;
        code{
          padding: 0px;
        }
      }
      .ant-bubble-end{
        .ant-bubble-content{
          background-color: rgb(22 119 255 / 15%);
        }
      }
      .ant-bubble-list-autoscroll{
        flex-direction: column-reverse;
      }
      .ant-bubble-content-updating {
        background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
        background-size: 200% 2px;
        background-repeat: no-repeat;
        background-position: 0% 100%;
        animation: loading-line 2s linear infinite;
      }

      @keyframes loading-line {
        from {
          background-position: 0% 100%;
        }
        to {
          background-position: 100% 100%;
        }
      }
    `,
  loadingMessage: o`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,
  placeholder: o`
      padding-top: 32px;
    `,
  skillsSelect: o`
      width: 100%;
      max-width: min(95%, 700px);
      margin: 0 20px;
    `,
  sender: o`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,
  speechButton: o`
      font-size: 18px;
      color: ${i.colorText} !important;
    `,
  senderPrompt: o`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${i.colorText};
    `
}));
class pt extends Error {
  constructor(n, c) {
    super(n);
    me(this, "buffer");
    this.buffer = c;
  }
}
function gt(i) {
  if (i == null || typeof i != "object")
    return !1;
  const o = i;
  if (o.name === "AbortError")
    return !0;
  const n = typeof o.message == "string" ? o.message : "";
  return /aborted/i.test(n) || /BodyStreamBuffer/i.test(n);
}
class ft extends at {
  transformParams(o, n) {
    if (typeof o != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(n == null ? void 0 : n.params) || {},
      ...o || {}
    };
  }
  transformLocalMessage({ content: o }) {
    return {
      content: o,
      role: "user"
    };
  }
  transformMessage(o) {
    const { originMessage: n, chunk: c, status: l } = o || {};
    if (!c)
      return {
        ...n,
        content: (n == null ? void 0 : n.content) || "",
        role: "assistant",
        status: l
      };
    let d;
    try {
      d = JSON.parse(c.data);
    } catch {
      return {
        ...n,
        content: (n == null ? void 0 : n.content) || "",
        role: "assistant",
        status: l
      };
    }
    const b = d.message_id === (n == null ? void 0 : n.messageId) ? `${(n == null ? void 0 : n.content) || ""}${d.content || ""}` : d.content || "";
    switch (d.event_type) {
      case "tool_call":
      case "content":
        return {
          ...n,
          content: b,
          role: "assistant",
          messageId: d.message_id,
          status: l
        };
      case "error":
        return {
          ...n,
          content: b,
          role: "assistant",
          error: d.content,
          messageId: d.message_id,
          status: l
        };
      case "client_tool_pending":
        return {
          ...n,
          content: b || "",
          role: "assistant",
          pendingClientToolCalls: d.client_tool_calls,
          messageId: d.message_id,
          status: l
        };
      default:
        return {
          ...n,
          content: b || (n == null ? void 0 : n.content) || "",
          role: "assistant",
          messageId: d.message_id || (n == null ? void 0 : n.messageId),
          status: l
        };
    }
  }
}
const te = /* @__PURE__ */ new Map(), ht = (i) => (te.get(i) || te.set(
  i,
  new ft({
    request: st(
      `/api/ai/chat/sessions/${i}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (o, n) => {
            const c = localStorage.getItem("orgID"), { sessionId: l } = n.params ?? {}, d = {
              ...n.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...c ? { "X-Scope-OrgID": c } : {}
            };
            return [l ? `/api/ai/chat/sessions/${l}` : o, { ...n, headers: d }];
          }
        }
      }
    )
  })
), te.get(i)), xt = (i) => {
  var l;
  const { className: o, children: n } = i, c = ((l = o == null ? void 0 : o.match(/language-(\w+)/)) == null ? void 0 : l[1]) || "";
  return typeof n != "string" ? null : c === "mermaid" ? /* @__PURE__ */ a.jsx(Ze, { children: n }) : /* @__PURE__ */ a.jsx("code", { className: "ant-highlightCode-code", children: /* @__PURE__ */ a.jsx(et, { lang: c, children: n }) });
}, yt = ct.createContext({});
function D(i) {
  if (!i || i.length === 0)
    return [];
  const o = /* @__PURE__ */ new Set(), n = [];
  for (const c of i) {
    const l = c.trim();
    !l || o.has(l) || (o.add(l), n.push(l));
  }
  return n;
}
const bt = ({
  bubble: i = {},
  messages: o,
  loading: n,
  layout: c = "classic",
  onSendMessage: l
}) => {
  const { styles: d } = Ce(), { isDarkMode: b } = lt(), j = N(() => {
    if (!i.components) return { code: xt };
    const u = {};
    for (const C in i.components) {
      const h = i.components[C];
      if (typeof h == "string") {
        u[C] = h;
        continue;
      }
      u[C] = ($) => /* @__PURE__ */ a.jsx(
        h,
        {
          ...$,
          onSendMessage: l
        }
      );
    }
    return u;
  }, [l, i.components]), {
    contentRender: E = (u) => /* @__PURE__ */ a.jsx(
      fe,
      {
        paragraphTag: "div",
        content: u,
        className: b ? "x-markdown-dark" : "x-markdown-light",
        components: j
      }
    ),
    footerRender: L = ({ message: u }) => {
      if (u.error)
        return /* @__PURE__ */ a.jsx("div", { children: /* @__PURE__ */ a.jsx(fe, { content: u.error, components: j }) });
    }
  } = i, x = N(() => (o || []).map((u) => ({
    ...u.message,
    key: u.id,
    contentRender: E,
    footer: (C, h) => L == null ? void 0 : L(u, h, l)
  })).filter((u) => u.content), [o]);
  return /* @__PURE__ */ a.jsx("div", { className: d.chatList, children: /* @__PURE__ */ a.jsx(F, { spinning: n, children: /* @__PURE__ */ a.jsx(
    Qe.List,
    {
      items: x,
      style: {
        height: "100%",
        paddingInline: c === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ a.jsx(F, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ a.jsx(F, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) });
}, Pt = ({
  bubble: i = {},
  ephemeralSystemPrompts: o,
  clientTools: n,
  defaultSkillDomains: c
}) => {
  const {
    layout: l,
    setVisible: d,
    setLayout: b,
    onCallAI: j,
    activeConversationKey: E,
    setActiveConversationKey: L,
    conversations: x,
    fetchConversationsLoading: u,
    getEphemeralSystemPrompts: C,
    getClientTools: h,
    registerGlobalAI: $
  } = dt(), { t: p } = ve("ai"), { t: ne } = ve("common"), { styles: k } = Ce(), H = (e) => ({
    key: e.id,
    label: e.title,
    group: ee(e.start_time).isSame(ee(), "day") ? p("chat.today") : ee(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: se,
    activeConversationKey: g,
    setActiveConversationKey: q,
    addConversation: je,
    setConversations: Se,
    getConversation: K,
    setConversation: T,
    removeConversation: we,
    getMessages: _e
  } = tt({
    defaultActiveConversationKey: E,
    defaultConversations: (x == null ? void 0 : x.map((e) => H(e))) || []
  });
  v(() => {
    L(g);
  }, [g]);
  const { message: z } = ot.useApp(), [ae, oe] = O(""), [Ae, Le] = O(!1), X = (c == null ? void 0 : c.join("\0")) ?? "", M = N(
    () => D(X ? X.split("\0") : []),
    [X]
  ), J = (o == null ? void 0 : o.join("\0")) ?? "", G = N(
    () => D(J ? J.split("\0") : []),
    [J]
  );
  v(() => {
    if (!(G.length === 0 && !(n != null && n.length)))
      return $({
        ephemeralSystemPrompts: G,
        tools: n
      });
  }, [G, n, $]);
  const [S, Y] = O(
    () => M.map((e) => ({ type: "domain", value: e }))
  );
  v(() => {
    Y((e) => {
      const t = e.filter((s) => s.type === "skill");
      return [
        ...M.map((s) => ({ type: "domain", value: s })),
        ...t
      ];
    });
  }, [M]);
  const { data: re } = A(() => _.system.listSkillDomains()), { data: P } = A(
    () => _.system.listSkills({ current: 1, page_size: 500 })
  ), ie = N(() => [
    ...(re ?? []).map((e) => ({
      skillType: "domain",
      key: e,
      label: /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsx(he, { children: p("chat.skillDomain", { defaultValue: "Skill domain" }) }),
        e
      ] })
    })),
    ...((P == null ? void 0 : P.data) ?? []).map((e) => ({
      skillType: "skill",
      key: e.id,
      label: /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsx(he, { children: p("chat.skill", { defaultValue: "Skill" }) }),
        e.name
      ] })
    }))
  ], [P, re]), [I, le] = O(), { onRequest: R, messages: f, isRequesting: W, abort: Te, onReload: Ie, setMessages: Re, setMessage: Fe } = nt({
    provider: ht(g),
    // every conversation has its own provider
    conversationKey: g,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: ne("loading"),
      role: "assistant"
    }),
    requestFallback: (e, { error: t }) => gt(t) ? {
      content: "",
      role: "assistant"
    } : t instanceof pt ? {
      content: t.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: t.message
    } : {
      content: `${t}`,
      role: "assistant"
    }
  }), w = be(() => {
    const e = {
      domains: S.filter((r) => r.type === "domain").map((r) => r.value),
      skill_ids: S.filter((r) => r.type === "skill").map((r) => r.value)
    }, t = D(C());
    t.length > 0 && (e.ephemeral_system_prompts = t);
    const s = h();
    return s.length > 0 && (e.client_tools = s.map((r) => ({
      name: r.name,
      description: r.description,
      parameters: r.parameters
    }))), e;
  }, [S, C, h]), U = ke(null), ce = be(async (e) => {
    const t = [], s = h();
    for (const r of e) {
      const y = s.find((m) => m.name === r.name);
      if (!y) {
        t.push({
          tool_call_id: r.id,
          content: JSON.stringify({
            error: `Client tool "${r.name}" is not available on the current page`,
            available_tools: s.map((m) => m.name)
          })
        });
        continue;
      }
      try {
        const m = await Promise.resolve(y.handler(r.arguments));
        t.push({ tool_call_id: r.id, content: m != null && m.trim() ? m : JSON.stringify({ ok: !0 }) });
      } catch (m) {
        const Oe = m instanceof Error ? m.message : String(m);
        t.push({
          tool_call_id: r.id,
          content: JSON.stringify({ error: Oe })
        });
      }
    }
    R({
      content: "",
      client_tool_results: t,
      ...w()
    });
  }, [h, R, w]);
  v(() => {
    var e, t;
    if (!W && f && f.length > 0) {
      const s = f[f.length - 1];
      if ((t = (e = s == null ? void 0 : s.message) == null ? void 0 : e.pendingClientToolCalls) != null && t.length) {
        const r = s.message.pendingClientToolCalls;
        U.current !== r && (U.current = r, ce(r));
      } else
        U.current = null;
    }
  }, [W, f, ce]);
  const de = (e) => {
    if (e) {
      if (!g) {
        V(e);
        return;
      }
      R({
        content: e,
        ...w()
      });
    }
  }, { run: Ne, loading: $e } = A(async (e) => await _.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      z.error(p("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (e) => {
      if (f && f.length > 0 && (f[f.length - 1].status === "loading" || f.length > e.messages.length))
        return;
      const t = [];
      let s = { id: "", message: { content: "", role: "assistant" }, status: "success" };
      for (const r of e.messages)
        switch (r.role) {
          case "assistant":
            s.status = r.status === "completed" && s.status === "success" ? "success" : "error", s.message.role = "assistant", s.id !== r.id && r.content && (s.message.content = r.content), s.id = r.id;
            break;
          case "user":
            s.message.content.length > 0 && (t.push({
              id: s.id,
              message: {
                content: s.message.content,
                role: s.message.role
              },
              status: s.status
            }), s = { id: "", message: { content: "", role: "assistant" }, status: "success" }), t.push({
              id: r.id,
              message: {
                content: r.content,
                role: r.role
              },
              status: r.status === "completed" ? "success" : "error"
            });
            break;
        }
      s.message.content.length > 0 && t.push({
        id: s.id,
        message: {
          content: s.message.content,
          role: s.message.role
        },
        status: s.status
      }), Re(t);
    }
  }), { run: V, loading: Q } = A(async (e, t, s = !1, r) => ({ session: await _.ai.createChatSession({
    title: p("chat.defaultConversationTitle"),
    model_id: "",
    messages: t || [],
    anonymous: s
  }), message: e, domains: r }), {
    manual: !0,
    onError: () => {
      z.error(p("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: ({ session: e, message: t, domains: s }) => {
      je(H(e), "prepend"), q(e.id), t && le({ message: t, sessionId: e.id, domains: s });
    }
  });
  v(() => {
    Se((x == null ? void 0 : x.map((e) => H(e))) || []);
  }, [x]);
  const { run: ze } = A(async (e) => await _.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [t]) {
      z.error(p("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const s = K(t);
      s && T(t, { ...s, loading: !1 });
    },
    onSuccess(e, [t]) {
      we(t);
    }
  }), { run: Pe } = A(async (e) => _.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: e }, [t]) => {
      const s = K(t);
      s && T(t, { ...s, title: e, loading: !1 });
    },
    onError: (e, [t]) => {
      z.error(p("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: e.message || e }));
      const s = K(t);
      s && T(t, { ...s, loading: !1 });
    }
  });
  v(() => {
    if (g && (I == null ? void 0 : I.sessionId) === g) {
      const { message: e, domains: t } = I;
      setTimeout(() => {
        R({
          content: e,
          ...w(),
          ...t !== void 0 ? { domains: t } : {}
        });
      }, 1e3), le(void 0);
    }
  }, [g, I, w]), v(() => {
    if (g) {
      const e = _e(g);
      if (e && e.length > 0)
        return;
      Ne(g);
    }
  }, [g]);
  const ue = ke(() => {
  });
  ue.current = (e, t) => {
    const s = ut(t), r = s.domains !== void 0 ? D(s.domains) : void 0;
    if (r !== void 0 && Y((y) => [
      ...r.map((m) => ({ type: "domain", value: m })),
      ...y.filter((m) => m.type === "skill")
    ]), s.newSession === !1 && g) {
      R({
        content: e,
        ...w(),
        ...r !== void 0 ? { domains: r } : {}
      });
      return;
    }
    V(e, s.messages, !0, r);
  }, v(() => {
    j && j((e, t) => {
      ue.current(e, t);
    });
  }, [j]);
  const Ve = /* @__PURE__ */ a.jsxs("div", { className: k.sider, children: [
    /* @__PURE__ */ a.jsx(
      B,
      {
        onClick: () => {
          V();
        },
        type: "link",
        className: k.addBtn,
        icon: /* @__PURE__ */ a.jsx(pe, {}),
        loading: Q,
        children: p("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ a.jsx(F, { spinning: u, wrapperClassName: k.conversationsSpin, children: /* @__PURE__ */ a.jsx(
      We,
      {
        items: se,
        activeKey: g,
        onActiveChange: async (e) => {
          e && q(e);
        },
        className: k.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (e) => ({
          items: [
            {
              label: p("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ a.jsx(Me, {}),
              onClick: () => {
                T(e.key, { ...e, loading: !0 }), Pe(e.key);
              }
            },
            {
              label: ne("delete"),
              key: "delete",
              icon: /* @__PURE__ */ a.jsx(Je, {}),
              danger: !0,
              onClick: () => {
                T(e.key, { ...e, loading: !0 }), ze(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Be = /* @__PURE__ */ a.jsx(a.Fragment, { children: /* @__PURE__ */ a.jsx(xe, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: /* @__PURE__ */ a.jsx(
    ge,
    {
      footer: (e) => /* @__PURE__ */ a.jsxs(Z, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ a.jsx(Z, { gap: "small", align: "center", children: /* @__PURE__ */ a.jsx(
          ye,
          {
            open: Ae,
            onOpenChange: (t, s) => {
              (s.source === "trigger" || t) && Le(t);
            },
            menu: {
              selectedKeys: S.map((t) => t.value),
              onClick: (t) => {
                const s = ie.find((r) => r.key === t.key);
                Y((r) => r.some((y) => y.value === t.key) ? r.filter((y) => y.value !== t.key) : [...r, { type: (s == null ? void 0 : s.skillType) || "skill", value: t.key }]);
              },
              items: ie.map((t) => ({
                label: t.label,
                key: t.key
              }))
            },
            children: /* @__PURE__ */ a.jsxs(ge.Switch, { value: !1, icon: /* @__PURE__ */ a.jsx(He, {}), children: [
              p("chat.skill", { defaultValue: "Skills" }),
              " ",
              "(",
              S.length > 0 ? p("chat.skillsSelected", { defaultValue: "{{count}} selected", count: S.length }) : p("chat.skillsOptional", { defaultValue: "optional" }),
              ")"
            ] })
          }
        ) }),
        /* @__PURE__ */ a.jsx(Z, { align: "center", children: e })
      ] }),
      suffix: !1,
      value: ae,
      onSubmit: async () => {
        de(ae.trim()), oe("");
      },
      onChange: oe,
      onCancel: () => {
        Te();
      },
      loading: W,
      className: mt(k.sender, "chat-sender"),
      placeholder: p("chat.inputPlaceholder")
    }
  ) }) });
  return /* @__PURE__ */ a.jsx(Ue, { children: /* @__PURE__ */ a.jsxs(yt.Provider, { value: { onReload: Ie, setMessage: Fe }, children: [
    /* @__PURE__ */ a.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
      /* @__PURE__ */ a.jsx(
        rt.Group,
        {
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          },
          options: [
            {
              label: /* @__PURE__ */ a.jsx(qe, { style: { transform: "scaleX(-1)" } }),
              value: "classic"
            },
            {
              label: /* @__PURE__ */ a.jsx(Ke, {}),
              value: "sidebar"
            },
            {
              label: /* @__PURE__ */ a.jsx(Xe, {}),
              value: "float-sidebar"
            }
          ],
          optionType: "button",
          onChange: (e) => b(e.target.value),
          value: l
        }
      ),
      /* @__PURE__ */ a.jsxs(xe, { style: { float: "right", marginTop: 10 }, children: [
        /* @__PURE__ */ a.jsx(
          B,
          {
            type: "primary",
            onClick: () => {
              V();
            },
            loading: Q,
            icon: /* @__PURE__ */ a.jsx(pe, {}),
            style: { display: l === "classic" ? "none" : "block" }
          }
        ),
        /* @__PURE__ */ a.jsx(
          ye,
          {
            menu: {
              items: se.map((e) => ({
                label: e.label,
                key: e.key
              })),
              onClick: ({ key: e }) => {
                q(e);
              }
            },
            placement: "bottomRight",
            children: /* @__PURE__ */ a.jsx(B, { icon: u ? /* @__PURE__ */ a.jsx(F, { size: "small" }) : /* @__PURE__ */ a.jsx(Ge, {}), style: { display: l === "classic" ? "none" : "block" } })
          }
        ),
        /* @__PURE__ */ a.jsx(B, { type: "text", onClick: () => d(!1), children: /* @__PURE__ */ a.jsx(Ye, {}) })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: l === "classic" ? k.classicLayout : k.siderLayout, style: {
      minWidth: l === "classic" ? "500px" : "400px"
    }, children: [
      l === "classic" ? Ve : null,
      /* @__PURE__ */ a.jsxs("div", { className: k.chat, children: [
        /* @__PURE__ */ a.jsx(
          bt,
          {
            bubble: i,
            messages: f,
            loading: $e || Q,
            layout: l,
            onSendMessage: de
          }
        ),
        Be
      ] })
    ] })
  ] }) });
};
export {
  Pt as AIChat,
  Pt as default
};
