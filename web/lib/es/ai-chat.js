var Ve = Object.defineProperty;
var Be = (r, o, s) => o in r ? Ve(r, o, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[o] = s;
var de = (r, o, s) => Be(r, typeof o != "symbol" ? o + "" : o, s);
import { j as a, k as Oe, l as De, m as qe, n as Ee } from "./vendor.js";
import { a as j } from "./index.js";
import { PlusOutlined as ue, ReloadOutlined as He, DeleteOutlined as Ke, HistoryOutlined as Xe, CloseOutlined as Me } from "@ant-design/icons";
import { Conversations as Je, Sender as me, XProvider as Ye, Bubble as Ge, Mermaid as We, CodeHighlighter as Ue } from "@ant-design/x";
import { useXConversations as Qe, useXChat as Ze, XRequest as et, AbstractChatProvider as tt } from "@ant-design/x-sdk";
import { XMarkdown as pe } from "@ant-design/x-markdown";
import { useRequest as w } from "ahooks";
import { App as nt, Tag as ge, Button as V, Spin as A, Space as fe, Flex as U, Dropdown as he, Radio as st } from "antd";
import { createStyles as at, useThemeMode as ot } from "antd-style";
import rt, { useEffect as k, useState as B, useMemo as I, useCallback as xe, useRef as ye } from "react";
import { useTranslation as be } from "react-i18next";
import Q from "dayjs";
import { d as it, n as lt } from "./contexts.js";
import ct from "classnames";
/* empty css             */
const ke = at(({ token: r, css: o }) => ({
  siderLayout: o`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,
  classicLayout: o`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,
  sider: o`
      background: ${r.colorBgLayout}80;
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
        color: ${r.colorText};
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
      border-top: 1px solid ${r.colorBorderSecondary};
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
      padding-block: ${r.paddingLG}px;
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
      color: ${r.colorText} !important;
    `,
  senderPrompt: o`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${r.colorText};
    `
}));
class dt extends Error {
  constructor(s, c) {
    super(s);
    de(this, "buffer");
    this.buffer = c;
  }
}
function ut(r) {
  if (r == null || typeof r != "object")
    return !1;
  const o = r;
  if (o.name === "AbortError")
    return !0;
  const s = typeof o.message == "string" ? o.message : "";
  return /aborted/i.test(s) || /BodyStreamBuffer/i.test(s);
}
class mt extends tt {
  transformParams(o, s) {
    if (typeof o != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(s == null ? void 0 : s.params) || {},
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
    const { originMessage: s, chunk: c, status: l } = o || {};
    if (!c)
      return {
        ...s,
        content: (s == null ? void 0 : s.content) || "",
        role: "assistant",
        status: l
      };
    let u;
    try {
      u = JSON.parse(c.data);
    } catch {
      return {
        ...s,
        content: (s == null ? void 0 : s.content) || "",
        role: "assistant",
        status: l
      };
    }
    const x = u.message_id === (s == null ? void 0 : s.messageId) ? `${(s == null ? void 0 : s.content) || ""}${u.content || ""}` : u.content || "";
    switch (u.event_type) {
      case "tool_call":
      case "content":
        return {
          ...s,
          content: x,
          role: "assistant",
          messageId: u.message_id,
          status: l
        };
      case "error":
        return {
          ...s,
          content: x,
          role: "assistant",
          error: u.content,
          messageId: u.message_id,
          status: l
        };
      case "client_tool_pending":
        return {
          ...s,
          content: x || "",
          role: "assistant",
          pendingClientToolCalls: u.client_tool_calls,
          messageId: u.message_id,
          status: l
        };
      default:
        return {
          ...s,
          content: x || (s == null ? void 0 : s.content) || "",
          role: "assistant",
          messageId: u.message_id || (s == null ? void 0 : s.messageId),
          status: l
        };
    }
  }
}
const Z = /* @__PURE__ */ new Map(), pt = (r) => (Z.get(r) || Z.set(
  r,
  new mt({
    request: et(
      `/api/ai/chat/sessions/${r}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (o, s) => {
            const c = localStorage.getItem("orgID"), { sessionId: l } = s.params ?? {}, u = {
              ...s.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...c ? { "X-Scope-OrgID": c } : {}
            };
            return [l ? `/api/ai/chat/sessions/${l}` : o, { ...s, headers: u }];
          }
        }
      }
    )
  })
), Z.get(r)), gt = (r) => {
  var l;
  const { className: o, children: s } = r, c = ((l = o == null ? void 0 : o.match(/language-(\w+)/)) == null ? void 0 : l[1]) || "";
  return typeof s != "string" ? null : c === "mermaid" ? /* @__PURE__ */ a.jsx(We, { children: s }) : /* @__PURE__ */ a.jsx("code", { className: "ant-highlightCode-code", children: /* @__PURE__ */ a.jsx(Ue, { lang: c, children: s }) });
}, ft = rt.createContext({});
function O(r) {
  if (!r || r.length === 0)
    return [];
  const o = /* @__PURE__ */ new Set(), s = [];
  for (const c of r) {
    const l = c.trim();
    !l || o.has(l) || (o.add(l), s.push(l));
  }
  return s;
}
const ht = ({
  bubble: r = {},
  messages: o,
  loading: s,
  layout: c = "classic",
  onSendMessage: l
}) => {
  const { styles: u } = ke(), { isDarkMode: x } = ot(), R = I(() => {
    if (!r.components) return { code: gt };
    const m = {};
    for (const y in r.components) {
      const d = r.components[y];
      if (typeof d == "string") {
        m[y] = d;
        continue;
      }
      m[y] = ($) => /* @__PURE__ */ a.jsx(
        d,
        {
          ...$,
          onSendMessage: l
        }
      );
    }
    return m;
  }, [l, r.components]), {
    contentRender: D = (m) => /* @__PURE__ */ a.jsx(
      pe,
      {
        paragraphTag: "div",
        content: m,
        className: x ? "x-markdown-dark" : "x-markdown-light",
        components: R
      }
    ),
    footerRender: f = ({ message: m }) => {
      if (m.error)
        return /* @__PURE__ */ a.jsx("div", { children: /* @__PURE__ */ a.jsx(pe, { content: m.error, components: R }) });
    }
  } = r, F = I(() => (o || []).map((m) => ({
    ...m.message,
    key: m.id,
    contentRender: D,
    footer: (y, d) => f == null ? void 0 : f(m, d, l)
  })).filter((m) => m.content), [o]);
  return /* @__PURE__ */ a.jsx("div", { className: u.chatList, children: /* @__PURE__ */ a.jsx(A, { spinning: s, children: /* @__PURE__ */ a.jsx(
    Ge.List,
    {
      items: F,
      style: {
        height: "100%",
        paddingInline: c === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ a.jsx(A, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ a.jsx(A, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) });
}, $t = ({
  bubble: r = {},
  ephemeralSystemPrompts: o,
  defaultSkillDomains: s
}) => {
  const {
    layout: c,
    setVisible: l,
    setLayout: u,
    onCallAI: x,
    activeConversationKey: R,
    setActiveConversationKey: D,
    conversations: f,
    fetchConversationsLoading: F,
    ephemeralSystemPrompts: m,
    clientTools: y
  } = it(), { t: d } = be("ai"), { t: $ } = be("common"), { styles: b } = ke(), q = (e) => ({
    key: e.id,
    label: e.title,
    group: Q(e.start_time).isSame(Q(), "day") ? d("chat.today") : Q(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: ee,
    activeConversationKey: p,
    setActiveConversationKey: E,
    addConversation: ve,
    setConversations: Ce,
    getConversation: H,
    setConversation: S,
    removeConversation: je,
    getMessages: we
  } = Qe({
    defaultActiveConversationKey: R,
    defaultConversations: (f == null ? void 0 : f.map((e) => q(e))) || []
  });
  k(() => {
    D(p);
  }, [p]);
  const { message: z } = nt.useApp(), [te, ne] = B(""), [Se, _e] = B(!1), K = (s == null ? void 0 : s.join("\0")) ?? "", X = I(
    () => O(K ? K.split("\0") : []),
    [K]
  ), M = (o == null ? void 0 : o.join("\0")) ?? "", se = I(
    () => O(M ? M.split("\0") : []),
    [M]
  ), [v, J] = B(
    () => X.map((e) => ({ type: "domain", value: e }))
  );
  k(() => {
    J((e) => {
      const n = e.filter((t) => t.type === "skill");
      return [
        ...X.map((t) => ({ type: "domain", value: t })),
        ...n
      ];
    });
  }, [X]);
  const { data: ae } = w(() => j.system.listSkillDomains()), { data: N } = w(
    () => j.system.listSkills({ current: 1, page_size: 500 })
  ), oe = I(() => [
    ...(ae ?? []).map((e) => ({
      skillType: "domain",
      key: e,
      label: /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsx(ge, { children: d("chat.skillDomain", { defaultValue: "Skill domain" }) }),
        e
      ] })
    })),
    ...((N == null ? void 0 : N.data) ?? []).map((e) => ({
      skillType: "skill",
      key: e.id,
      label: /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsx(ge, { children: d("chat.skill", { defaultValue: "Skill" }) }),
        e.name
      ] })
    }))
  ], [N, ae]), [_, re] = B(), { onRequest: T, messages: h, isRequesting: Y, abort: Te, onReload: Le, setMessages: Ae, setMessage: Ie } = Ze({
    provider: pt(p),
    // every conversation has its own provider
    conversationKey: p,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: $("loading"),
      role: "assistant"
    }),
    requestFallback: (e, { error: n }) => ut(n) ? {
      content: "",
      role: "assistant"
    } : n instanceof dt ? {
      content: n.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: n.message
    } : {
      content: `${n}`,
      role: "assistant"
    }
  }), C = xe(() => {
    const e = {
      domains: v.filter((t) => t.type === "domain").map((t) => t.value),
      skill_ids: v.filter((t) => t.type === "skill").map((t) => t.value)
    }, n = O([
      ...se,
      ...m
    ]);
    return n.length > 0 && (e.ephemeral_system_prompts = n), y.length > 0 && (e.client_tools = y.map((t) => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters
    }))), e;
  }, [v, se, m, y]), G = ye(null), ie = xe(async (e) => {
    const n = [];
    for (const t of e) {
      const i = y.find((g) => g.name === t.name);
      if (!i) {
        n.push({
          tool_call_id: t.id,
          content: JSON.stringify({ error: `Client tool handler not found for ${t.name}` })
        });
        continue;
      }
      try {
        const g = await Promise.resolve(i.handler(t.arguments));
        n.push({ tool_call_id: t.id, content: g });
      } catch (g) {
        const L = g instanceof Error ? g.message : String(g);
        n.push({
          tool_call_id: t.id,
          content: JSON.stringify({ error: L })
        });
      }
    }
    T({
      content: "",
      client_tool_results: n,
      ...C()
    });
  }, [y, T, C]);
  k(() => {
    var e, n;
    if (!Y && h && h.length > 0) {
      const t = h[h.length - 1];
      if ((n = (e = t == null ? void 0 : t.message) == null ? void 0 : e.pendingClientToolCalls) != null && n.length) {
        const i = t.message.pendingClientToolCalls;
        G.current !== i && (G.current = i, ie(i));
      } else
        G.current = null;
    }
  }, [Y, h, ie]);
  const le = (e) => {
    if (e) {
      if (!p) {
        P(e);
        return;
      }
      T({
        content: e,
        ...C()
      });
    }
  }, { run: Re, loading: Fe } = w(async (e) => await j.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      z.error(d("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (e) => {
      if (h && h.length > 0 && (h[h.length - 1].status === "loading" || h.length > e.messages.length))
        return;
      const n = [];
      let t = { id: "", message: { content: "", role: "assistant" }, status: "success" };
      for (const i of e.messages)
        switch (i.role) {
          case "assistant":
            t.status = i.status === "completed" && t.status === "success" ? "success" : "error", t.message.role = "assistant", t.id !== i.id && i.content && (t.message.content = i.content), t.id = i.id;
            break;
          case "user":
            t.message.content.length > 0 && (n.push({
              id: t.id,
              message: {
                content: t.message.content,
                role: t.message.role
              },
              status: t.status
            }), t = { id: "", message: { content: "", role: "assistant" }, status: "success" }), n.push({
              id: i.id,
              message: {
                content: i.content,
                role: i.role
              },
              status: i.status === "completed" ? "success" : "error"
            });
            break;
        }
      t.message.content.length > 0 && n.push({
        id: t.id,
        message: {
          content: t.message.content,
          role: t.message.role
        },
        status: t.status
      }), Ae(n);
    }
  }), { run: P, loading: W } = w(async (e, n, t = !1, i) => ({ session: await j.ai.createChatSession({
    title: d("chat.defaultConversationTitle"),
    model_id: "",
    messages: n || [],
    anonymous: t
  }), message: e, domains: i }), {
    manual: !0,
    onError: () => {
      z.error(d("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: ({ session: e, message: n, domains: t }) => {
      ve(q(e), "prepend"), E(e.id), n && re({ message: n, sessionId: e.id, domains: t });
    }
  });
  k(() => {
    Ce((f == null ? void 0 : f.map((e) => q(e))) || []);
  }, [f]);
  const { run: $e } = w(async (e) => await j.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [n]) {
      z.error(d("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const t = H(n);
      t && S(n, { ...t, loading: !1 });
    },
    onSuccess(e, [n]) {
      je(n);
    }
  }), { run: ze } = w(async (e) => j.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: e }, [n]) => {
      const t = H(n);
      t && S(n, { ...t, title: e, loading: !1 });
    },
    onError: (e, [n]) => {
      z.error(d("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: e.message || e }));
      const t = H(n);
      t && S(n, { ...t, loading: !1 });
    }
  });
  k(() => {
    if (p && (_ == null ? void 0 : _.sessionId) === p) {
      const { message: e, domains: n } = _;
      setTimeout(() => {
        T({
          content: e,
          ...C(),
          ...n !== void 0 ? { domains: n } : {}
        });
      }, 1e3), re(void 0);
    }
  }, [p, _, C]), k(() => {
    if (p) {
      const e = we(p);
      if (e && e.length > 0)
        return;
      Re(p);
    }
  }, [p]);
  const ce = ye(() => {
  });
  ce.current = (e, n) => {
    const t = lt(n), i = t.domains !== void 0 ? O(t.domains) : void 0;
    if (i !== void 0 && J((g) => [
      ...i.map((L) => ({ type: "domain", value: L })),
      ...g.filter((L) => L.type === "skill")
    ]), t.newSession === !1 && p) {
      T({
        content: e,
        ...C(),
        ...i !== void 0 ? { domains: i } : {}
      });
      return;
    }
    P(e, t.messages, !0, i);
  }, k(() => {
    x && x((e, n) => {
      ce.current(e, n);
    });
  }, [x]);
  const Ne = /* @__PURE__ */ a.jsxs("div", { className: b.sider, children: [
    /* @__PURE__ */ a.jsx(
      V,
      {
        onClick: () => {
          P();
        },
        type: "link",
        className: b.addBtn,
        icon: /* @__PURE__ */ a.jsx(ue, {}),
        loading: W,
        children: d("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ a.jsx(A, { spinning: F, wrapperClassName: b.conversationsSpin, children: /* @__PURE__ */ a.jsx(
      Je,
      {
        items: ee,
        activeKey: p,
        onActiveChange: async (e) => {
          e && E(e);
        },
        className: b.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (e) => ({
          items: [
            {
              label: d("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ a.jsx(He, {}),
              onClick: () => {
                S(e.key, { ...e, loading: !0 }), ze(e.key);
              }
            },
            {
              label: $("delete"),
              key: "delete",
              icon: /* @__PURE__ */ a.jsx(Ke, {}),
              danger: !0,
              onClick: () => {
                S(e.key, { ...e, loading: !0 }), $e(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Pe = /* @__PURE__ */ a.jsx(a.Fragment, { children: /* @__PURE__ */ a.jsx(fe, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: /* @__PURE__ */ a.jsx(
    me,
    {
      footer: (e) => /* @__PURE__ */ a.jsxs(U, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ a.jsx(U, { gap: "small", align: "center", children: /* @__PURE__ */ a.jsx(
          he,
          {
            open: Se,
            onOpenChange: (n, t) => {
              (t.source === "trigger" || n) && _e(n);
            },
            menu: {
              selectedKeys: v.map((n) => n.value),
              onClick: (n) => {
                const t = oe.find((i) => i.key === n.key);
                J((i) => i.some((g) => g.value === n.key) ? i.filter((g) => g.value !== n.key) : [...i, { type: (t == null ? void 0 : t.skillType) || "skill", value: n.key }]);
              },
              items: oe.map((n) => ({
                label: n.label,
                key: n.key
              }))
            },
            children: /* @__PURE__ */ a.jsxs(me.Switch, { value: !1, icon: /* @__PURE__ */ a.jsx(Oe, {}), children: [
              d("chat.skill", { defaultValue: "Skills" }),
              " ",
              "(",
              v.length > 0 ? d("chat.skillsSelected", { defaultValue: "{{count}} selected", count: v.length }) : d("chat.skillsOptional", { defaultValue: "optional" }),
              ")"
            ] })
          }
        ) }),
        /* @__PURE__ */ a.jsx(U, { align: "center", children: e })
      ] }),
      suffix: !1,
      value: te,
      onSubmit: async () => {
        le(te.trim()), ne("");
      },
      onChange: ne,
      onCancel: () => {
        Te();
      },
      loading: Y,
      className: ct(b.sender, "chat-sender"),
      placeholder: d("chat.inputPlaceholder")
    }
  ) }) });
  return /* @__PURE__ */ a.jsx(Ye, { children: /* @__PURE__ */ a.jsxs(ft.Provider, { value: { onReload: Le, setMessage: Ie }, children: [
    /* @__PURE__ */ a.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
      /* @__PURE__ */ a.jsx(
        st.Group,
        {
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          },
          options: [
            {
              label: /* @__PURE__ */ a.jsx(De, { style: { transform: "scaleX(-1)" } }),
              value: "classic"
            },
            {
              label: /* @__PURE__ */ a.jsx(qe, {}),
              value: "sidebar"
            },
            {
              label: /* @__PURE__ */ a.jsx(Ee, {}),
              value: "float-sidebar"
            }
          ],
          optionType: "button",
          onChange: (e) => u(e.target.value),
          value: c
        }
      ),
      /* @__PURE__ */ a.jsxs(fe, { style: { float: "right", marginTop: 10 }, children: [
        /* @__PURE__ */ a.jsx(
          V,
          {
            type: "primary",
            onClick: () => {
              P();
            },
            loading: W,
            icon: /* @__PURE__ */ a.jsx(ue, {}),
            style: { display: c === "classic" ? "none" : "block" }
          }
        ),
        /* @__PURE__ */ a.jsx(
          he,
          {
            menu: {
              items: ee.map((e) => ({
                label: e.label,
                key: e.key
              })),
              onClick: ({ key: e }) => {
                E(e);
              }
            },
            placement: "bottomRight",
            children: /* @__PURE__ */ a.jsx(V, { icon: F ? /* @__PURE__ */ a.jsx(A, { size: "small" }) : /* @__PURE__ */ a.jsx(Xe, {}), style: { display: c === "classic" ? "none" : "block" } })
          }
        ),
        /* @__PURE__ */ a.jsx(V, { type: "text", onClick: () => l(!1), children: /* @__PURE__ */ a.jsx(Me, {}) })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: c === "classic" ? b.classicLayout : b.siderLayout, style: {
      minWidth: c === "classic" ? "500px" : "400px"
    }, children: [
      c === "classic" ? Ne : null,
      /* @__PURE__ */ a.jsxs("div", { className: b.chat, children: [
        /* @__PURE__ */ a.jsx(
          ht,
          {
            bubble: r,
            messages: h,
            loading: Fe || W,
            layout: c,
            onSendMessage: le
          }
        ),
        Pe
      ] })
    ] })
  ] }) });
};
export {
  $t as AIChat,
  $t as default
};
