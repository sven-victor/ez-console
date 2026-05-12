var Ie = Object.defineProperty;
var $e = (i, s, o) => s in i ? Ie(i, s, { enumerable: !0, configurable: !0, writable: !0, value: o }) : i[s] = o;
var Z = (i, s, o) => $e(i, typeof s != "symbol" ? s + "" : s, o);
import { j as n } from "./vendor.js";
import { a as x } from "./index.js";
import { PlusOutlined as ee, ReloadOutlined as Pe, DeleteOutlined as Re, BlockOutlined as Me, BorderRightOutlined as te, HistoryOutlined as Be, CloseOutlined as Oe } from "@ant-design/icons";
import { Conversations as ze, Bubble as Ee, Sender as Ve, XProvider as De, Mermaid as qe, CodeHighlighter as He } from "@ant-design/x";
import { useXConversations as Xe, useXChat as Ke, XRequest as Je, AbstractChatProvider as Ye } from "@ant-design/x-sdk";
import { XMarkdown as se } from "@ant-design/x-markdown";
import { useRequest as y } from "ahooks";
import { theme as Ge, message as E, Tag as ne, Button as A, Spin as _, Space as ae, Select as We, Radio as Ue, Dropdown as Qe } from "antd";
import { createStyles as Ze } from "antd-style";
import H, { useEffect as v, useState as V, useCallback as oe, useRef as et } from "react";
import { useTranslation as ie } from "react-i18next";
import D from "dayjs";
import { a as tt } from "./contexts.js";
import { isArray as st } from "lodash-es";
import re from "classnames";
/* empty css             */
const nt = Ze(({ token: i, css: s }) => ({
  siderLayout: s`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,
  classicLayout: s`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,
  sider: s`
      background: ${i.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,
  logo: s`
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
  addBtn: s`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,
  conversationsSpin: s`
      height: 100%;
      overflow-y: auto;
    `,
  conversations: s`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
  siderFooter: s`
      border-top: 1px solid ${i.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
  chat: s`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${i.paddingLG}px;
      gap: 16px;
    `,
  chatPrompt: s`
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
  chatList: s`
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
  loadingMessage: s`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,
  placeholder: s`
      padding-top: 32px;
    `,
  skillsSelect: s`
      width: 100%;
      max-width: min(95%, 700px);
      margin: 0 20px;
    `,
  sender: s`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,
  speechButton: s`
      font-size: 18px;
      color: ${i.colorText} !important;
    `,
  senderPrompt: s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${i.colorText};
    `
}));
class at extends Error {
  constructor(o, l) {
    super(o);
    Z(this, "buffer");
    this.buffer = l;
  }
}
function ot(i) {
  if (i == null || typeof i != "object")
    return !1;
  const s = i;
  if (s.name === "AbortError")
    return !0;
  const o = typeof s.message == "string" ? s.message : "";
  return /aborted/i.test(o) || /BodyStreamBuffer/i.test(o);
}
class it extends Ye {
  transformParams(s, o) {
    if (typeof s != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(o == null ? void 0 : o.params) || {},
      ...s || {}
    };
  }
  transformLocalMessage({ content: s }) {
    return {
      content: s,
      role: "user"
    };
  }
  transformMessage(s) {
    const { originMessage: o, chunk: l, status: r } = s || {};
    if (!l)
      return {
        ...o,
        content: (o == null ? void 0 : o.content) || "",
        role: "assistant",
        status: r
      };
    const d = JSON.parse(l.data), C = d.message_id === (o == null ? void 0 : o.messageId) ? `${(o == null ? void 0 : o.content) || ""}${d.content || ""}` : d.content || "";
    switch (d.event_type) {
      case "tool_call":
      case "content":
        return {
          ...o,
          content: C,
          role: "assistant",
          messageId: d.message_id,
          status: r
        };
      case "error":
        return {
          ...o,
          content: C,
          role: "assistant",
          error: d.content,
          messageId: d.message_id,
          status: r
        };
      case "client_tool_pending":
        return {
          ...o,
          content: C || "",
          role: "assistant",
          pendingClientToolCalls: d.client_tool_calls,
          messageId: d.message_id,
          status: r
        };
    }
  }
}
const q = /* @__PURE__ */ new Map(), rt = (i) => (q.get(i) || q.set(
  i,
  new it({
    request: Je(
      `/api/ai/chat/sessions/${i}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (s, o) => {
            const l = localStorage.getItem("orgID"), { sessionId: r } = o.params, d = {
              ...o.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...l ? { "X-Scope-OrgID": l } : {}
            };
            return [r ? `/api/ai/chat/sessions/${r}` : s, { ...o, headers: d }];
          }
        }
      }
    )
  })
), q.get(i)), lt = (i) => {
  var r;
  const { className: s, children: o } = i, l = ((r = s == null ? void 0 : s.match(/language-(\w+)/)) == null ? void 0 : r[1]) || "";
  return typeof o != "string" ? null : l === "mermaid" ? /* @__PURE__ */ n.jsx(qe, { children: o }) : /* @__PURE__ */ n.jsx(He, { lang: l, children: o });
}, ct = () => {
  const i = Ge.useToken(), s = H.useMemo(() => {
    var l;
    return ((l = i == null ? void 0 : i.theme) == null ? void 0 : l.id) === 0;
  }, [i]);
  return [H.useMemo(() => s ? "x-markdown-light" : "x-markdown-dark", [s])];
}, dt = H.createContext({}), Lt = ({
  bubble: i = {}
}) => {
  const {
    components: s = { code: lt },
    contentRender: o = (e) => /* @__PURE__ */ n.jsx(
      se,
      {
        paragraphTag: "div",
        content: e,
        className: pe,
        components: s
      }
    ),
    footerRender: l = ({ message: e }) => {
      if (e.error)
        return /* @__PURE__ */ n.jsx("div", { children: /* @__PURE__ */ n.jsx(se, { content: e.error, components: s }) });
    }
  } = i, {
    layout: r,
    setVisible: d,
    setLayout: C,
    onCallAI: L,
    activeConversationKey: le,
    setActiveConversationKey: ce,
    conversations: h,
    fetchConversationsLoading: X,
    ephemeralSystemPrompts: N,
    clientTools: k
  } = tt(), { t: g } = ie("ai"), { t: K } = ie("common"), { styles: p } = nt(), F = (e) => ({
    key: e.id,
    label: e.title,
    group: D(e.start_time).isSame(D(), "day") ? g("chat.today") : D(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: J,
    activeConversationKey: u,
    setActiveConversationKey: I,
    addConversation: de,
    setConversations: ue,
    getConversation: $,
    setConversation: j,
    removeConversation: me,
    getMessages: ge
  } = Xe({
    defaultActiveConversationKey: le,
    defaultConversations: (h == null ? void 0 : h.map((e) => F(e))) || []
  });
  v(() => {
    ce(u);
  }, [u]);
  const [pe] = ct(), [Y, fe] = E.useMessage(), [G, W] = V(""), [P, R] = V([]), { data: he } = y(() => x.system.listSkillDomains()), be = (he ?? []).map((e) => ({
    skillType: "domain",
    value: e,
    label: /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
      /* @__PURE__ */ n.jsx(ne, { children: g("chat.skillDomain", { defaultValue: "Skill domain" }) }),
      e
    ] })
  })), { data: M } = y(
    () => x.system.listSkills({ current: 1, page_size: 500 })
  ), xe = ((M == null ? void 0 : M.data) ?? []).map((e) => ({
    skillType: "skill",
    value: e.id,
    label: /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
      /* @__PURE__ */ n.jsx(ne, { children: g("chat.skill", { defaultValue: "Skill" }) }),
      e.name
    ] })
  })), [S, U] = V(), { onRequest: T, messages: m, isRequesting: B, abort: ye, onReload: ve, setMessages: Ce, setMessage: ke } = Ke({
    provider: rt(u),
    // every conversation has its own provider
    conversationKey: u,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: K("loading"),
      role: "assistant"
    }),
    requestFallback: (e, { error: t }) => ot(t) ? {
      content: "",
      role: "assistant"
    } : t instanceof at ? {
      content: t.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: t.message
    } : {
      content: `${t}`,
      role: "assistant"
    }
  }), w = oe(() => {
    const e = {};
    return N.length > 0 && (e.ephemeral_system_prompts = N), k.length > 0 && (e.client_tools = k.map((t) => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters
    }))), e;
  }, [N, k]), O = et(null), Q = oe(async (e) => {
    const t = [];
    for (const a of e) {
      const c = k.find((f) => f.name === a.name);
      if (!c) {
        t.push({
          tool_call_id: a.id,
          content: JSON.stringify({ error: `Client tool handler not found for ${a.name}` })
        });
        continue;
      }
      try {
        const f = await Promise.resolve(c.handler(a.arguments));
        t.push({ tool_call_id: a.id, content: f });
      } catch (f) {
        t.push({
          tool_call_id: a.id,
          content: JSON.stringify({ error: (f == null ? void 0 : f.message) || String(f) })
        });
      }
    }
    T({
      content: "",
      client_tool_results: t,
      ...w()
    });
  }, [k, T, w]);
  v(() => {
    var e, t;
    if (!B && m && m.length > 0) {
      const a = m[m.length - 1];
      if ((t = (e = a == null ? void 0 : a.message) == null ? void 0 : e.pendingClientToolCalls) != null && t.length) {
        const c = a.message.pendingClientToolCalls;
        O.current !== c && (O.current = c, Q(c));
      } else
        O.current = null;
    }
  }, [B, m, Q]);
  const je = (e) => {
    if (e) {
      if (!u) {
        b(e);
        return;
      }
      T({
        content: e,
        domains: P.filter((t) => t.type === "domain").map((t) => t.value),
        skill_ids: P.filter((t) => t.type === "skill").map((t) => t.value),
        ...w()
      });
    }
  }, { run: Se, loading: we } = y(async (e) => await x.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      E.error(g("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (e) => {
      if (m && m.length > 0 && (m[m.length - 1].status === "loading" || m.length > e.messages.length))
        return;
      const t = [];
      let a = { id: "", message: { content: "", role: "assistant" }, status: "success" };
      for (const c of e.messages)
        switch (c.role) {
          case "assistant":
            a.status = c.status === "completed" && a.status === "success" ? "success" : "error", a.message.role = "assistant", a.id !== c.id && c.content && (a.message.content = c.content), a.id = c.id;
            break;
          case "user":
            a.message.content.length > 0 && (t.push({
              id: a.id,
              message: {
                content: a.message.content,
                role: a.message.role
              },
              status: a.status
            }), a = { id: "", message: { content: "", role: "assistant" }, status: "success" }), t.push({
              id: c.id,
              message: {
                content: c.content,
                role: c.role
              },
              status: c.status === "completed" ? "success" : "error"
            });
            break;
        }
      a.message.content.length > 0 && t.push({
        id: a.id,
        message: {
          content: a.message.content,
          role: a.message.role
        },
        status: a.status
      }), Ce(t);
    }
  }), { run: b, loading: z } = y(async (e, t, a = !1) => await x.ai.createChatSession({
    title: g("chat.defaultConversationTitle"),
    model_id: "",
    messages: t || [],
    anonymous: a
  }), {
    manual: !0,
    onError: () => {
      E.error(g("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (e, [t]) => {
      de(F(e), "prepend"), I(e.id), t && U({ message: t, sessionId: e.id });
    }
  });
  v(() => {
    ue((h == null ? void 0 : h.map((e) => F(e))) || []);
  }, [h]);
  const { run: _e } = y(async (e) => await x.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [t]) {
      Y.error(g("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const a = $(t);
      a && j(t, { ...a, loading: !1 });
    },
    onSuccess(e, [t]) {
      me(t);
    }
  }), { run: Te } = y(async (e) => x.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: e }, [t]) => {
      const a = $(t);
      a && j(t, { ...a, title: e, loading: !1 });
    },
    onError: (e, [t]) => {
      Y.error(g("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: e.message || e }));
      const a = $(t);
      a && j(t, { ...a, loading: !1 });
    }
  });
  v(() => {
    if (u && (S == null ? void 0 : S.sessionId) === u) {
      const e = S.message;
      setTimeout(() => {
        T({
          content: e,
          ...w()
        });
      }, 1e3), U(void 0);
    }
  }, [u, S, w]), v(() => {
    if (u) {
      const e = ge(u);
      if (e && e.length > 0)
        return;
      Se(u);
    }
  }, [u]), v(() => {
    L && b && L((e, t) => {
      b(e, t, !0);
    });
  }, [b, L]);
  const Ae = /* @__PURE__ */ n.jsxs("div", { className: p.sider, children: [
    /* @__PURE__ */ n.jsx(
      A,
      {
        onClick: () => {
          b();
        },
        type: "link",
        className: p.addBtn,
        icon: /* @__PURE__ */ n.jsx(ee, {}),
        loading: z,
        children: g("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ n.jsx(_, { spinning: X, wrapperClassName: p.conversationsSpin, children: /* @__PURE__ */ n.jsx(
      ze,
      {
        items: J,
        activeKey: u,
        onActiveChange: async (e) => {
          e && I(e);
        },
        className: p.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (e) => ({
          items: [
            {
              label: g("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ n.jsx(Pe, {}),
              onClick: () => {
                j(e.key, { ...e, loading: !0 }), Te(e.key);
              }
            },
            {
              label: K("delete"),
              key: "delete",
              icon: /* @__PURE__ */ n.jsx(Re, {}),
              danger: !0,
              onClick: () => {
                j(e.key, { ...e, loading: !0 }), _e(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Le = m == null ? void 0 : m.map((e) => ({
    ...e.message,
    key: e.id,
    contentRender: o,
    footer: l == null ? void 0 : l(e)
  })).filter((e) => e.content), Ne = /* @__PURE__ */ n.jsx("div", { className: p.chatList, children: /* @__PURE__ */ n.jsx(_, { spinning: we || z, children: /* @__PURE__ */ n.jsx(
    Ee.List,
    {
      items: Le,
      style: {
        height: "100%",
        paddingInline: r === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ n.jsx(_, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ n.jsx(_, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) }), Fe = /* @__PURE__ */ n.jsx(n.Fragment, { children: /* @__PURE__ */ n.jsxs(ae, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: [
    /* @__PURE__ */ n.jsx(
      We,
      {
        mode: "multiple",
        allowClear: !0,
        placeholder: g("chat.skillsPlaceholder", { defaultValue: "Skills (optional)" }),
        value: P.map((e) => e.value),
        onChange: (e, t) => {
          st(t) ? R(t.map((a) => ({ type: a.skillType, value: a.value }))) : R(t ? [{ type: t.skillType, value: t.value }] : []);
        },
        options: [
          ...be,
          ...xe
        ],
        className: re(p.skillsSelect, "chat-skills-select")
      }
    ),
    /* @__PURE__ */ n.jsx(
      Ve,
      {
        value: G,
        onSubmit: async () => {
          je(G.trim()), W("");
        },
        onChange: W,
        onCancel: () => {
          ye();
        },
        loading: B,
        className: re(p.sender, "chat-sender"),
        placeholder: g("chat.inputPlaceholder")
      }
    )
  ] }) });
  return /* @__PURE__ */ n.jsxs(De, { children: [
    fe,
    /* @__PURE__ */ n.jsxs(dt.Provider, { value: { onReload: ve, setMessage: ke }, children: [
      /* @__PURE__ */ n.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
        /* @__PURE__ */ n.jsx(
          Ue.Group,
          {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            options: [
              {
                label: /* @__PURE__ */ n.jsx(Me, {}),
                value: "classic"
              },
              {
                label: /* @__PURE__ */ n.jsx(te, {}),
                value: "sidebar"
              },
              {
                label: /* @__PURE__ */ n.jsx(te, {}),
                value: "float-sidebar"
              }
            ],
            optionType: "button",
            onChange: (e) => C(e.target.value),
            value: r
          }
        ),
        /* @__PURE__ */ n.jsxs(ae, { style: { float: "right", marginTop: 10 }, children: [
          /* @__PURE__ */ n.jsx(
            A,
            {
              type: "primary",
              onClick: () => {
                b();
              },
              loading: z,
              icon: /* @__PURE__ */ n.jsx(ee, {}),
              style: { display: r === "classic" ? "none" : "block" }
            }
          ),
          /* @__PURE__ */ n.jsx(
            Qe,
            {
              menu: {
                items: J.map((e) => ({
                  label: e.label,
                  key: e.key
                })),
                onClick: ({ key: e }) => {
                  I(e);
                }
              },
              placement: "bottomRight",
              children: /* @__PURE__ */ n.jsx(A, { icon: X ? /* @__PURE__ */ n.jsx(_, { size: "small" }) : /* @__PURE__ */ n.jsx(Be, {}), style: { display: r === "classic" ? "none" : "block" } })
            }
          ),
          /* @__PURE__ */ n.jsx(A, { type: "text", onClick: () => d(!1), children: /* @__PURE__ */ n.jsx(Oe, {}) })
        ] })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: r === "classic" ? p.classicLayout : p.siderLayout, style: {
        minWidth: r === "classic" ? "500px" : "400px"
      }, children: [
        r === "classic" ? Ae : null,
        /* @__PURE__ */ n.jsxs("div", { className: p.chat, children: [
          Ne,
          Fe
        ] })
      ] })
    ] })
  ] });
};
export {
  Lt as AIChat,
  Lt as default,
  ct as useMarkdownTheme
};
