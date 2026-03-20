var Ie = Object.defineProperty;
var $e = (i, n, o) => n in i ? Ie(i, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : i[n] = o;
var Z = (i, n, o) => $e(i, typeof n != "symbol" ? n + "" : n, o);
import { j as s } from "./vendor.js";
import { a as b } from "./index.js";
import { PlusOutlined as ee, ReloadOutlined as Pe, DeleteOutlined as Re, BlockOutlined as Me, BorderRightOutlined as te, HistoryOutlined as Oe, CloseOutlined as ze } from "@ant-design/icons";
import { Conversations as Be, Bubble as Ve, Sender as De, XProvider as Ee, Mermaid as qe, CodeHighlighter as He } from "@ant-design/x";
import { useXConversations as Xe, useXChat as Ke, XRequest as Je, AbstractChatProvider as Ye } from "@ant-design/x-sdk";
import { XMarkdown as se } from "@ant-design/x-markdown";
import { useRequest as y } from "ahooks";
import { theme as Ge, message as V, Tag as ne, Button as L, Spin as _, Space as ae, Select as We, Radio as Ue, Dropdown as Qe } from "antd";
import { createStyles as Ze } from "antd-style";
import H, { useEffect as v, useState as D, useCallback as oe, useRef as et } from "react";
import { useTranslation as ie } from "react-i18next";
import E from "dayjs";
import { u as tt } from "./contexts.js";
import { isArray as st } from "lodash-es";
import re from "classnames";
/* empty css             */
const nt = Ze(({ token: i, css: n }) => ({
  siderLayout: n`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,
  classicLayout: n`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,
  sider: n`
      background: ${i.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,
  logo: n`
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
  addBtn: n`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,
  conversationsSpin: n`
      height: 100%;
      overflow-y: auto;
    `,
  conversations: n`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
  siderFooter: n`
      border-top: 1px solid ${i.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
  chat: n`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${i.paddingLG}px;
      gap: 16px;
    `,
  chatPrompt: n`
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
  chatList: n`
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
  loadingMessage: n`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,
  placeholder: n`
      padding-top: 32px;
    `,
  skillsSelect: n`
      width: 100%;
      max-width: min(95%, 700px);
      margin: 0 20px;
    `,
  sender: n`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,
  speechButton: n`
      font-size: 18px;
      color: ${i.colorText} !important;
    `,
  senderPrompt: n`
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
class ot extends Ye {
  transformParams(n, o) {
    if (typeof n != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(o == null ? void 0 : o.params) || {},
      ...n || {}
    };
  }
  transformLocalMessage({ content: n }) {
    return {
      content: n,
      role: "user"
    };
  }
  transformMessage(n) {
    const { originMessage: o, chunk: l, status: r } = n || {};
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
const q = /* @__PURE__ */ new Map(), it = (i) => (q.get(i) || q.set(
  i,
  new ot({
    request: Je(
      `/api/ai/chat/sessions/${i}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (n, o) => {
            const l = localStorage.getItem("orgID"), { sessionId: r } = o.params, d = {
              ...o.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...l ? { "X-Scope-OrgID": l } : {}
            };
            return [r ? `/api/ai/chat/sessions/${r}` : n, { ...o, headers: d }];
          }
        }
      }
    )
  })
), q.get(i)), rt = (i) => {
  var r;
  const { className: n, children: o } = i, l = ((r = n == null ? void 0 : n.match(/language-(\w+)/)) == null ? void 0 : r[1]) || "";
  return typeof o != "string" ? null : l === "mermaid" ? /* @__PURE__ */ s.jsx(qe, { children: o }) : /* @__PURE__ */ s.jsx(He, { lang: l, children: o });
}, lt = () => {
  const i = Ge.useToken(), n = H.useMemo(() => {
    var l;
    return ((l = i == null ? void 0 : i.theme) == null ? void 0 : l.id) === 0;
  }, [i]);
  return [H.useMemo(() => n ? "x-markdown-light" : "x-markdown-dark", [n])];
}, ct = H.createContext({}), Lt = ({
  bubble: i = {}
}) => {
  const {
    components: n = { code: rt },
    contentRender: o = (e) => /* @__PURE__ */ s.jsx(
      se,
      {
        paragraphTag: "div",
        content: e,
        className: pe,
        components: n
      }
    ),
    footerRender: l = ({ message: e }) => {
      if (e.error)
        return /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(se, { content: e.error, components: n }) });
    }
  } = i, {
    layout: r,
    setVisible: d,
    setLayout: C,
    onCallAI: N,
    activeConversationKey: le,
    setActiveConversationKey: ce,
    conversations: f,
    fetchConversationsLoading: X,
    ephemeralSystemPrompts: A,
    clientTools: k
  } = tt(), { t: g } = ie("ai"), { t: K } = ie("common"), { styles: p } = nt(), F = (e) => ({
    key: e.id,
    label: e.title,
    group: E(e.start_time).isSame(E(), "day") ? g("chat.today") : E(e.start_time).format("YYYY-MM-DD")
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
    defaultConversations: (f == null ? void 0 : f.map((e) => F(e))) || []
  });
  v(() => {
    ce(u);
  }, [u]);
  const [pe] = lt(), [Y, he] = V.useMessage(), [G, W] = D(""), [P, R] = D([]), { data: fe } = y(() => b.system.listSkillDomains()), xe = (fe ?? []).map((e) => ({
    skillType: "domain",
    value: e,
    label: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx(ne, { children: g("chat.skillDomain", { defaultValue: "Skill domain" }) }),
      e
    ] })
  })), { data: M } = y(
    () => b.system.listSkills({ current: 1, page_size: 500 })
  ), be = ((M == null ? void 0 : M.data) ?? []).map((e) => ({
    skillType: "skill",
    value: e.id,
    label: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx(ne, { children: g("chat.skill", { defaultValue: "Skill" }) }),
      e.name
    ] })
  })), [S, U] = D(), { onRequest: T, messages: m, isRequesting: O, abort: ye, onReload: ve, setMessages: Ce, setMessage: ke } = Ke({
    provider: it(u),
    // every conversation has its own provider
    conversationKey: u,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: K("loading"),
      role: "assistant"
    }),
    requestFallback: (e, { error: t }) => t instanceof at ? {
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
    return A.length > 0 && (e.ephemeral_system_prompts = A), k.length > 0 && (e.client_tools = k.map((t) => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters
    }))), e;
  }, [A, k]), z = et(null), Q = oe(async (e) => {
    const t = [];
    for (const a of e) {
      const c = k.find((h) => h.name === a.name);
      if (!c) {
        t.push({
          tool_call_id: a.id,
          content: JSON.stringify({ error: `Client tool handler not found for ${a.name}` })
        });
        continue;
      }
      try {
        const h = await Promise.resolve(c.handler(a.arguments));
        t.push({ tool_call_id: a.id, content: h });
      } catch (h) {
        t.push({
          tool_call_id: a.id,
          content: JSON.stringify({ error: (h == null ? void 0 : h.message) || String(h) })
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
    if (!O && m && m.length > 0) {
      const a = m[m.length - 1];
      if ((t = (e = a == null ? void 0 : a.message) == null ? void 0 : e.pendingClientToolCalls) != null && t.length) {
        const c = a.message.pendingClientToolCalls;
        z.current !== c && (z.current = c, Q(c));
      } else
        z.current = null;
    }
  }, [O, m, Q]);
  const je = (e) => {
    if (e) {
      if (!u) {
        x(e);
        return;
      }
      T({
        content: e,
        domains: P.filter((t) => t.type === "domain").map((t) => t.value),
        skill_ids: P.filter((t) => t.type === "skill").map((t) => t.value),
        ...w()
      });
    }
  }, { run: Se, loading: we } = y(async (e) => await b.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      V.error(g("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
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
  }), { run: x, loading: B } = y(async (e, t, a = !1) => await b.ai.createChatSession({
    title: g("chat.defaultConversationTitle"),
    model_id: "",
    messages: t || [],
    anonymous: a
  }), {
    manual: !0,
    onError: () => {
      V.error(g("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (e, [t]) => {
      de(F(e), "prepend"), I(e.id), t && U({ message: t, sessionId: e.id });
    }
  });
  v(() => {
    ue((f == null ? void 0 : f.map((e) => F(e))) || []);
  }, [f]);
  const { run: _e } = y(async (e) => await b.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [t]) {
      Y.error(g("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const a = $(t);
      a && j(t, { ...a, loading: !1 });
    },
    onSuccess(e, [t]) {
      me(t);
    }
  }), { run: Te } = y(async (e) => b.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
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
    N && x && N((e, t) => {
      x(e, t, !0);
    });
  }, [x, N]);
  const Le = /* @__PURE__ */ s.jsxs("div", { className: p.sider, children: [
    /* @__PURE__ */ s.jsx(
      L,
      {
        onClick: () => {
          x();
        },
        type: "link",
        className: p.addBtn,
        icon: /* @__PURE__ */ s.jsx(ee, {}),
        loading: B,
        children: g("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ s.jsx(_, { spinning: X, wrapperClassName: p.conversationsSpin, children: /* @__PURE__ */ s.jsx(
      Be,
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
              icon: /* @__PURE__ */ s.jsx(Pe, {}),
              onClick: () => {
                j(e.key, { ...e, loading: !0 }), Te(e.key);
              }
            },
            {
              label: K("delete"),
              key: "delete",
              icon: /* @__PURE__ */ s.jsx(Re, {}),
              danger: !0,
              onClick: () => {
                j(e.key, { ...e, loading: !0 }), _e(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Ne = m == null ? void 0 : m.map((e) => ({
    ...e.message,
    key: e.id,
    contentRender: o,
    footer: l == null ? void 0 : l(e)
  })).filter((e) => e.content), Ae = /* @__PURE__ */ s.jsx("div", { className: p.chatList, children: /* @__PURE__ */ s.jsx(_, { spinning: we || B, children: /* @__PURE__ */ s.jsx(
    Ve.List,
    {
      items: Ne,
      style: {
        height: "100%",
        paddingInline: r === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ s.jsx(_, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ s.jsx(_, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) }), Fe = /* @__PURE__ */ s.jsx(s.Fragment, { children: /* @__PURE__ */ s.jsxs(ae, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: [
    /* @__PURE__ */ s.jsx(
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
          ...xe,
          ...be
        ],
        className: re(p.skillsSelect, "chat-skills-select")
      }
    ),
    /* @__PURE__ */ s.jsx(
      De,
      {
        value: G,
        onSubmit: async () => {
          je(G.trim()), W("");
        },
        onChange: W,
        onCancel: () => {
          ye();
        },
        loading: O,
        className: re(p.sender, "chat-sender"),
        placeholder: g("chat.inputPlaceholder")
      }
    )
  ] }) });
  return /* @__PURE__ */ s.jsxs(Ee, { children: [
    he,
    /* @__PURE__ */ s.jsxs(ct.Provider, { value: { onReload: ve, setMessage: ke }, children: [
      /* @__PURE__ */ s.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
        /* @__PURE__ */ s.jsx(
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
                label: /* @__PURE__ */ s.jsx(Me, {}),
                value: "classic"
              },
              {
                label: /* @__PURE__ */ s.jsx(te, {}),
                value: "sidebar"
              },
              {
                label: /* @__PURE__ */ s.jsx(te, {}),
                value: "float-sidebar"
              }
            ],
            optionType: "button",
            onChange: (e) => C(e.target.value),
            value: r
          }
        ),
        /* @__PURE__ */ s.jsxs(ae, { style: { float: "right", marginTop: 10 }, children: [
          /* @__PURE__ */ s.jsx(
            L,
            {
              type: "primary",
              onClick: () => {
                x();
              },
              loading: B,
              icon: /* @__PURE__ */ s.jsx(ee, {}),
              style: { display: r === "classic" ? "none" : "block" }
            }
          ),
          /* @__PURE__ */ s.jsx(
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
              children: /* @__PURE__ */ s.jsx(L, { icon: X ? /* @__PURE__ */ s.jsx(_, { size: "small" }) : /* @__PURE__ */ s.jsx(Oe, {}), style: { display: r === "classic" ? "none" : "block" } })
            }
          ),
          /* @__PURE__ */ s.jsx(L, { type: "text", onClick: () => d(!1), children: /* @__PURE__ */ s.jsx(ze, {}) })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: r === "classic" ? p.classicLayout : p.siderLayout, style: {
        minWidth: r === "classic" ? "500px" : "400px"
      }, children: [
        r === "classic" ? Le : null,
        /* @__PURE__ */ s.jsxs("div", { className: p.chat, children: [
          Ae,
          Fe
        ] })
      ] })
    ] })
  ] });
};
export {
  Lt as AIChat,
  Lt as default,
  lt as useMarkdownTheme
};
