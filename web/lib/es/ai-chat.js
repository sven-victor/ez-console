var Ae = Object.defineProperty;
var Fe = (r, n, o) => n in r ? Ae(r, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[n] = o;
var ee = (r, n, o) => Fe(r, typeof n != "symbol" ? n + "" : n, o);
import { j as s, L as Ie, a as Pe, b as Re, c as $e } from "./vendor.js";
import { a as C } from "./index.js";
import { PlusOutlined as te, ReloadOutlined as Ne, DeleteOutlined as Ve, HistoryOutlined as Be, CloseOutlined as Me } from "@ant-design/icons";
import { Conversations as ze, Sender as ne, XProvider as De, Bubble as Ee, Mermaid as Oe, CodeHighlighter as He } from "@ant-design/x";
import { useXConversations as qe, useXChat as Xe, XRequest as Ke, AbstractChatProvider as Je } from "@ant-design/x-sdk";
import { XMarkdown as se } from "@ant-design/x-markdown";
import { useRequest as j } from "ahooks";
import { message as E, Tag as ae, Button as $, Spin as I, Space as oe, Flex as O, Dropdown as re, Radio as Ye } from "antd";
import { createStyles as Ge, useThemeMode as We } from "antd-style";
import Ue, { useEffect as S, useState as N, useMemo as X, useCallback as ie, useRef as Qe } from "react";
import { useTranslation as le } from "react-i18next";
import H from "dayjs";
import { a as Ze } from "./contexts.js";
import et from "classnames";
/* empty css             */
const ce = Ge(({ token: r, css: n }) => ({
  siderLayout: n`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,
  classicLayout: n`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,
  sider: n`
      background: ${r.colorBgLayout}80;
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
        color: ${r.colorText};
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
      border-top: 1px solid ${r.colorBorderSecondary};
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
      padding-block: ${r.paddingLG}px;
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
      color: ${r.colorText} !important;
    `,
  senderPrompt: n`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${r.colorText};
    `
}));
class tt extends Error {
  constructor(o, u) {
    super(o);
    ee(this, "buffer");
    this.buffer = u;
  }
}
function nt(r) {
  if (r == null || typeof r != "object")
    return !1;
  const n = r;
  if (n.name === "AbortError")
    return !0;
  const o = typeof n.message == "string" ? n.message : "";
  return /aborted/i.test(o) || /BodyStreamBuffer/i.test(o);
}
class st extends Je {
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
    const { originMessage: o, chunk: u, status: c } = n || {};
    if (!u)
      return {
        ...o,
        content: (o == null ? void 0 : o.content) || "",
        role: "assistant",
        status: c
      };
    const d = JSON.parse(u.data), x = d.message_id === (o == null ? void 0 : o.messageId) ? `${(o == null ? void 0 : o.content) || ""}${d.content || ""}` : d.content || "";
    switch (d.event_type) {
      case "tool_call":
      case "content":
        return {
          ...o,
          content: x,
          role: "assistant",
          messageId: d.message_id,
          status: c
        };
      case "error":
        return {
          ...o,
          content: x,
          role: "assistant",
          error: d.content,
          messageId: d.message_id,
          status: c
        };
      case "client_tool_pending":
        return {
          ...o,
          content: x || "",
          role: "assistant",
          pendingClientToolCalls: d.client_tool_calls,
          messageId: d.message_id,
          status: c
        };
    }
  }
}
const q = /* @__PURE__ */ new Map(), at = (r) => (q.get(r) || q.set(
  r,
  new st({
    request: Ke(
      `/api/ai/chat/sessions/${r}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (n, o) => {
            const u = localStorage.getItem("orgID"), { sessionId: c } = o.params, d = {
              ...o.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...u ? { "X-Scope-OrgID": u } : {}
            };
            return [c ? `/api/ai/chat/sessions/${c}` : n, { ...o, headers: d }];
          }
        }
      }
    )
  })
), q.get(r)), ot = (r) => {
  var c;
  const { className: n, children: o } = r, u = ((c = n == null ? void 0 : n.match(/language-(\w+)/)) == null ? void 0 : c[1]) || "";
  return typeof o != "string" ? null : u === "mermaid" ? /* @__PURE__ */ s.jsx(Oe, { children: o }) : /* @__PURE__ */ s.jsx("code", { className: "ant-highlightCode-code", children: /* @__PURE__ */ s.jsx(He, { lang: u, children: o }) });
}, rt = Ue.createContext({}), it = ({
  bubble: r = {},
  messages: n,
  loading: o,
  layout: u = "classic",
  onSendMessage: c
}) => {
  const { styles: d } = ce(), { isDarkMode: x } = We(), h = X(() => {
    if (!r.components) return { code: ot };
    const i = {};
    for (const k in r.components) {
      const m = r.components[k];
      if (typeof m == "string") {
        i[k] = m;
        continue;
      }
      i[k] = (w) => /* @__PURE__ */ s.jsx(
        m,
        {
          ...w,
          onSendMessage: c
        }
      );
    }
    return i;
  }, [c, r.components]), {
    contentRender: P = (i) => /* @__PURE__ */ s.jsx(
      se,
      {
        paragraphTag: "div",
        content: i,
        className: x ? "x-markdown-dark" : "x-markdown-light",
        components: h
      }
    ),
    footerRender: b = ({ message: i }) => {
      if (i.error)
        return /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(se, { content: i.error, components: h }) });
    }
  } = r, y = X(() => (n || []).map((i) => ({
    ...i.message,
    key: i.id,
    contentRender: P,
    footer: (k, m) => b == null ? void 0 : b(i, m, c)
  })).filter((i) => i.content), [n]);
  return /* @__PURE__ */ s.jsx("div", { className: d.chatList, children: /* @__PURE__ */ s.jsx(I, { spinning: o, children: /* @__PURE__ */ s.jsx(
    Ee.List,
    {
      items: y,
      style: {
        height: "100%",
        paddingInline: u === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ s.jsx(I, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ s.jsx(I, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) });
}, St = ({
  bubble: r = {}
}) => {
  const {
    layout: n,
    setVisible: o,
    setLayout: u,
    onCallAI: c,
    activeConversationKey: d,
    setActiveConversationKey: x,
    conversations: h,
    fetchConversationsLoading: P,
    ephemeralSystemPrompts: b,
    clientTools: y
  } = Ze(), { t: i } = le("ai"), { t: k } = le("common"), { styles: m } = ce(), w = (e) => ({
    key: e.id,
    label: e.title,
    group: H(e.start_time).isSame(H(), "day") ? i("chat.today") : H(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: K,
    activeConversationKey: g,
    setActiveConversationKey: V,
    addConversation: de,
    setConversations: ue,
    getConversation: B,
    setConversation: _,
    removeConversation: me,
    getMessages: ge
  } = qe({
    defaultActiveConversationKey: d,
    defaultConversations: (h == null ? void 0 : h.map((e) => w(e))) || []
  });
  S(() => {
    x(g);
  }, [g]);
  const [J, pe] = E.useMessage(), [Y, G] = N(""), [fe, he] = N(!1), [T, xe] = N([]), { data: be } = j(() => C.system.listSkillDomains()), { data: L } = j(
    () => C.system.listSkills({ current: 1, page_size: 500 })
  ), W = X(() => [
    ...(be ?? []).map((e) => ({
      skillType: "domain",
      key: e,
      label: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx(ae, { children: i("chat.skillDomain", { defaultValue: "Skill domain" }) }),
        e
      ] })
    })),
    ...((L == null ? void 0 : L.data) ?? []).map((e) => ({
      skillType: "skill",
      key: e.id,
      label: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx(ae, { children: i("chat.skill", { defaultValue: "Skill" }) }),
        e.name
      ] })
    }))
  ], [L, L]), [A, U] = N(), { onRequest: R, messages: f, isRequesting: M, abort: ye, onReload: ke, setMessages: ve, setMessage: Ce } = Xe({
    provider: at(g),
    // every conversation has its own provider
    conversationKey: g,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: k("loading"),
      role: "assistant"
    }),
    requestFallback: (e, { error: t }) => nt(t) ? {
      content: "",
      role: "assistant"
    } : t instanceof tt ? {
      content: t.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: t.message
    } : {
      content: `${t}`,
      role: "assistant"
    }
  }), F = ie(() => {
    const e = {};
    return b.length > 0 && (e.ephemeral_system_prompts = b), y.length > 0 && (e.client_tools = y.map((t) => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters
    }))), e;
  }, [b, y]), z = Qe(null), Q = ie(async (e) => {
    const t = [];
    for (const a of e) {
      const l = y.find((p) => p.name === a.name);
      if (!l) {
        t.push({
          tool_call_id: a.id,
          content: JSON.stringify({ error: `Client tool handler not found for ${a.name}` })
        });
        continue;
      }
      try {
        const p = await Promise.resolve(l.handler(a.arguments));
        t.push({ tool_call_id: a.id, content: p });
      } catch (p) {
        t.push({
          tool_call_id: a.id,
          content: JSON.stringify({ error: (p == null ? void 0 : p.message) || String(p) })
        });
      }
    }
    R({
      content: "",
      client_tool_results: t,
      ...F()
    });
  }, [y, R, F]);
  S(() => {
    var e, t;
    if (!M && f && f.length > 0) {
      const a = f[f.length - 1];
      if ((t = (e = a == null ? void 0 : a.message) == null ? void 0 : e.pendingClientToolCalls) != null && t.length) {
        const l = a.message.pendingClientToolCalls;
        z.current !== l && (z.current = l, Q(l));
      } else
        z.current = null;
    }
  }, [M, f, Q]);
  const Z = (e) => {
    if (e) {
      if (!g) {
        v(e);
        return;
      }
      R({
        content: e,
        domains: T.filter((t) => t.type === "domain").map((t) => t.value),
        skill_ids: T.filter((t) => t.type === "skill").map((t) => t.value),
        ...F()
      });
    }
  }, { run: je, loading: Se } = j(async (e) => await C.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      E.error(i("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (e) => {
      if (f && f.length > 0 && (f[f.length - 1].status === "loading" || f.length > e.messages.length))
        return;
      const t = [];
      let a = { id: "", message: { content: "", role: "assistant" }, status: "success" };
      for (const l of e.messages)
        switch (l.role) {
          case "assistant":
            a.status = l.status === "completed" && a.status === "success" ? "success" : "error", a.message.role = "assistant", a.id !== l.id && l.content && (a.message.content = l.content), a.id = l.id;
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
              id: l.id,
              message: {
                content: l.content,
                role: l.role
              },
              status: l.status === "completed" ? "success" : "error"
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
      }), ve(t);
    }
  }), { run: v, loading: D } = j(async (e, t, a = !1) => await C.ai.createChatSession({
    title: i("chat.defaultConversationTitle"),
    model_id: "",
    messages: t || [],
    anonymous: a
  }), {
    manual: !0,
    onError: () => {
      E.error(i("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (e, [t]) => {
      de(w(e), "prepend"), V(e.id), t && U({ message: t, sessionId: e.id });
    }
  });
  S(() => {
    ue((h == null ? void 0 : h.map((e) => w(e))) || []);
  }, [h]);
  const { run: we } = j(async (e) => await C.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [t]) {
      J.error(i("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const a = B(t);
      a && _(t, { ...a, loading: !1 });
    },
    onSuccess(e, [t]) {
      me(t);
    }
  }), { run: _e } = j(async (e) => C.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: e }, [t]) => {
      const a = B(t);
      a && _(t, { ...a, title: e, loading: !1 });
    },
    onError: (e, [t]) => {
      J.error(i("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: e.message || e }));
      const a = B(t);
      a && _(t, { ...a, loading: !1 });
    }
  });
  S(() => {
    if (g && (A == null ? void 0 : A.sessionId) === g) {
      const e = A.message;
      setTimeout(() => {
        R({
          content: e,
          ...F()
        });
      }, 1e3), U(void 0);
    }
  }, [g, A, F]), S(() => {
    if (g) {
      const e = ge(g);
      if (e && e.length > 0)
        return;
      je(g);
    }
  }, [g]), S(() => {
    c && v && c((e, t) => {
      v(e, t, !0);
    });
  }, [v, c]);
  const Te = /* @__PURE__ */ s.jsxs("div", { className: m.sider, children: [
    /* @__PURE__ */ s.jsx(
      $,
      {
        onClick: () => {
          v();
        },
        type: "link",
        className: m.addBtn,
        icon: /* @__PURE__ */ s.jsx(te, {}),
        loading: D,
        children: i("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ s.jsx(I, { spinning: P, wrapperClassName: m.conversationsSpin, children: /* @__PURE__ */ s.jsx(
      ze,
      {
        items: K,
        activeKey: g,
        onActiveChange: async (e) => {
          e && V(e);
        },
        className: m.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (e) => ({
          items: [
            {
              label: i("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ s.jsx(Ne, {}),
              onClick: () => {
                _(e.key, { ...e, loading: !0 }), _e(e.key);
              }
            },
            {
              label: k("delete"),
              key: "delete",
              icon: /* @__PURE__ */ s.jsx(Ve, {}),
              danger: !0,
              onClick: () => {
                _(e.key, { ...e, loading: !0 }), we(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Le = /* @__PURE__ */ s.jsx(s.Fragment, { children: /* @__PURE__ */ s.jsx(oe, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: /* @__PURE__ */ s.jsx(
    ne,
    {
      footer: (e) => /* @__PURE__ */ s.jsxs(O, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ s.jsx(O, { gap: "small", align: "center", children: /* @__PURE__ */ s.jsx(
          re,
          {
            open: fe,
            onOpenChange: (t, a) => {
              (a.source === "trigger" || t) && he(t);
            },
            menu: {
              selectedKeys: T.map((t) => t.value),
              onClick: (t) => {
                const a = W.find((l) => l.key === t.key);
                xe((l) => l.some((p) => p.value === t.key) ? l.filter((p) => p.value !== t.key) : [...l, { type: (a == null ? void 0 : a.skillType) || "skill", value: t.key }]);
              },
              items: W.map((t) => ({
                label: t.label,
                key: t.key
              }))
            },
            children: /* @__PURE__ */ s.jsxs(ne.Switch, { value: !1, icon: /* @__PURE__ */ s.jsx(Ie, {}), children: [
              i("chat.skill", { defaultValue: "Skills" }),
              " ",
              "(",
              T.length > 0 ? i("chat.skillsSelected", { defaultValue: "{{count}} selected", count: T.length }) : i("chat.skillsOptional", { defaultValue: "optional" }),
              ")"
            ] })
          }
        ) }),
        /* @__PURE__ */ s.jsx(O, { align: "center", children: e })
      ] }),
      suffix: !1,
      value: Y,
      onSubmit: async () => {
        Z(Y.trim()), G("");
      },
      onChange: G,
      onCancel: () => {
        ye();
      },
      loading: M,
      className: et(m.sender, "chat-sender"),
      placeholder: i("chat.inputPlaceholder")
    }
  ) }) });
  return /* @__PURE__ */ s.jsxs(De, { children: [
    pe,
    /* @__PURE__ */ s.jsxs(rt.Provider, { value: { onReload: ke, setMessage: Ce }, children: [
      /* @__PURE__ */ s.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
        /* @__PURE__ */ s.jsx(
          Ye.Group,
          {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            options: [
              {
                label: /* @__PURE__ */ s.jsx(Pe, { style: { transform: "scaleX(-1)" } }),
                value: "classic"
              },
              {
                label: /* @__PURE__ */ s.jsx(Re, {}),
                value: "sidebar"
              },
              {
                label: /* @__PURE__ */ s.jsx($e, {}),
                value: "float-sidebar"
              }
            ],
            optionType: "button",
            onChange: (e) => u(e.target.value),
            value: n
          }
        ),
        /* @__PURE__ */ s.jsxs(oe, { style: { float: "right", marginTop: 10 }, children: [
          /* @__PURE__ */ s.jsx(
            $,
            {
              type: "primary",
              onClick: () => {
                v();
              },
              loading: D,
              icon: /* @__PURE__ */ s.jsx(te, {}),
              style: { display: n === "classic" ? "none" : "block" }
            }
          ),
          /* @__PURE__ */ s.jsx(
            re,
            {
              menu: {
                items: K.map((e) => ({
                  label: e.label,
                  key: e.key
                })),
                onClick: ({ key: e }) => {
                  V(e);
                }
              },
              placement: "bottomRight",
              children: /* @__PURE__ */ s.jsx($, { icon: P ? /* @__PURE__ */ s.jsx(I, { size: "small" }) : /* @__PURE__ */ s.jsx(Be, {}), style: { display: n === "classic" ? "none" : "block" } })
            }
          ),
          /* @__PURE__ */ s.jsx($, { type: "text", onClick: () => o(!1), children: /* @__PURE__ */ s.jsx(Me, {}) })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: n === "classic" ? m.classicLayout : m.siderLayout, style: {
        minWidth: n === "classic" ? "500px" : "400px"
      }, children: [
        n === "classic" ? Te : null,
        /* @__PURE__ */ s.jsxs("div", { className: m.chat, children: [
          /* @__PURE__ */ s.jsx(
            it,
            {
              bubble: r,
              messages: f,
              loading: Se || D,
              layout: n,
              onSendMessage: Z
            }
          ),
          Le
        ] })
      ] })
    ] })
  ] });
};
export {
  St as AIChat,
  St as default
};
