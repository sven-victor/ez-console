var Le = Object.defineProperty;
var Ae = (r, n, a) => n in r ? Le(r, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : r[n] = a;
var ee = (r, n, a) => Ae(r, typeof n != "symbol" ? n + "" : n, a);
import { j as s, g as Ie, h as Fe, k as Pe, l as Re } from "./vendor.js";
import { a as C } from "./index.js";
import { PlusOutlined as te, ReloadOutlined as $e, DeleteOutlined as Ne, HistoryOutlined as Ve, CloseOutlined as Be } from "@ant-design/icons";
import { Conversations as Ee, Sender as ne, XProvider as ze, Bubble as De, Mermaid as Oe, CodeHighlighter as qe } from "@ant-design/x";
import { useXConversations as He, useXChat as Xe, XRequest as Ke, AbstractChatProvider as Me } from "@ant-design/x-sdk";
import { XMarkdown as se } from "@ant-design/x-markdown";
import { useRequest as j } from "ahooks";
import { App as Je, Tag as ae, Button as N, Spin as I, Space as oe, Flex as q, Dropdown as re, Radio as Ye } from "antd";
import { createStyles as Ge, useThemeMode as We } from "antd-style";
import Ue, { useEffect as S, useState as V, useMemo as K, useCallback as ie, useRef as Qe } from "react";
import { useTranslation as le } from "react-i18next";
import H from "dayjs";
import { d as Ze } from "./contexts.js";
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
  constructor(a, u) {
    super(a);
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
  const a = typeof n.message == "string" ? n.message : "";
  return /aborted/i.test(a) || /BodyStreamBuffer/i.test(a);
}
class st extends Me {
  transformParams(n, a) {
    if (typeof n != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(a == null ? void 0 : a.params) || {},
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
    const { originMessage: a, chunk: u, status: c } = n || {};
    if (!u)
      return {
        ...a,
        content: (a == null ? void 0 : a.content) || "",
        role: "assistant",
        status: c
      };
    let d;
    try {
      d = JSON.parse(u.data);
    } catch {
      return {
        ...a,
        content: (a == null ? void 0 : a.content) || "",
        role: "assistant",
        status: c
      };
    }
    const x = d.message_id === (a == null ? void 0 : a.messageId) ? `${(a == null ? void 0 : a.content) || ""}${d.content || ""}` : d.content || "";
    switch (d.event_type) {
      case "tool_call":
      case "content":
        return {
          ...a,
          content: x,
          role: "assistant",
          messageId: d.message_id,
          status: c
        };
      case "error":
        return {
          ...a,
          content: x,
          role: "assistant",
          error: d.content,
          messageId: d.message_id,
          status: c
        };
      case "client_tool_pending":
        return {
          ...a,
          content: x || "",
          role: "assistant",
          pendingClientToolCalls: d.client_tool_calls,
          messageId: d.message_id,
          status: c
        };
      default:
        return {
          ...a,
          content: x || (a == null ? void 0 : a.content) || "",
          role: "assistant",
          messageId: d.message_id || (a == null ? void 0 : a.messageId),
          status: c
        };
    }
  }
}
const X = /* @__PURE__ */ new Map(), at = (r) => (X.get(r) || X.set(
  r,
  new st({
    request: Ke(
      `/api/ai/chat/sessions/${r}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (n, a) => {
            const u = localStorage.getItem("orgID"), { sessionId: c } = a.params ?? {}, d = {
              ...a.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...u ? { "X-Scope-OrgID": u } : {}
            };
            return [c ? `/api/ai/chat/sessions/${c}` : n, { ...a, headers: d }];
          }
        }
      }
    )
  })
), X.get(r)), ot = (r) => {
  var c;
  const { className: n, children: a } = r, u = ((c = n == null ? void 0 : n.match(/language-(\w+)/)) == null ? void 0 : c[1]) || "";
  return typeof a != "string" ? null : u === "mermaid" ? /* @__PURE__ */ s.jsx(Oe, { children: a }) : /* @__PURE__ */ s.jsx("code", { className: "ant-highlightCode-code", children: /* @__PURE__ */ s.jsx(qe, { lang: u, children: a }) });
}, rt = Ue.createContext({}), it = ({
  bubble: r = {},
  messages: n,
  loading: a,
  layout: u = "classic",
  onSendMessage: c
}) => {
  const { styles: d } = ce(), { isDarkMode: x } = We(), h = K(() => {
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
    contentRender: F = (i) => /* @__PURE__ */ s.jsx(
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
  } = r, y = K(() => (n || []).map((i) => ({
    ...i.message,
    key: i.id,
    contentRender: F,
    footer: (k, m) => b == null ? void 0 : b(i, m, c)
  })).filter((i) => i.content), [n]);
  return /* @__PURE__ */ s.jsx("div", { className: d.chatList, children: /* @__PURE__ */ s.jsx(I, { spinning: a, children: /* @__PURE__ */ s.jsx(
    De.List,
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
    setVisible: a,
    setLayout: u,
    onCallAI: c,
    activeConversationKey: d,
    setActiveConversationKey: x,
    conversations: h,
    fetchConversationsLoading: F,
    ephemeralSystemPrompts: b,
    clientTools: y
  } = Ze(), { t: i } = le("ai"), { t: k } = le("common"), { styles: m } = ce(), w = (e) => ({
    key: e.id,
    label: e.title,
    group: H(e.start_time).isSame(H(), "day") ? i("chat.today") : H(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: M,
    activeConversationKey: g,
    setActiveConversationKey: B,
    addConversation: de,
    setConversations: ue,
    getConversation: E,
    setConversation: _,
    removeConversation: me,
    getMessages: ge
  } = He({
    defaultActiveConversationKey: d,
    defaultConversations: (h == null ? void 0 : h.map((e) => w(e))) || []
  });
  S(() => {
    x(g);
  }, [g]);
  const { message: P } = Je.useApp(), [J, Y] = V(""), [pe, fe] = V(!1), [T, he] = V([]), { data: G } = j(() => C.system.listSkillDomains()), { data: R } = j(
    () => C.system.listSkills({ current: 1, page_size: 500 })
  ), W = K(() => [
    ...(G ?? []).map((e) => ({
      skillType: "domain",
      key: e,
      label: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx(ae, { children: i("chat.skillDomain", { defaultValue: "Skill domain" }) }),
        e
      ] })
    })),
    ...((R == null ? void 0 : R.data) ?? []).map((e) => ({
      skillType: "skill",
      key: e.id,
      label: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx(ae, { children: i("chat.skill", { defaultValue: "Skill" }) }),
        e.name
      ] })
    }))
  ], [R, G]), [L, U] = V(), { onRequest: $, messages: p, isRequesting: z, abort: xe, onReload: be, setMessages: ye, setMessage: ke } = Xe({
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
  }), A = ie(() => {
    const e = {};
    return b.length > 0 && (e.ephemeral_system_prompts = b), y.length > 0 && (e.client_tools = y.map((t) => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters
    }))), e;
  }, [b, y]), D = Qe(null), Q = ie(async (e) => {
    const t = [];
    for (const o of e) {
      const l = y.find((f) => f.name === o.name);
      if (!l) {
        t.push({
          tool_call_id: o.id,
          content: JSON.stringify({ error: `Client tool handler not found for ${o.name}` })
        });
        continue;
      }
      try {
        const f = await Promise.resolve(l.handler(o.arguments));
        t.push({ tool_call_id: o.id, content: f });
      } catch (f) {
        const Te = f instanceof Error ? f.message : String(f);
        t.push({
          tool_call_id: o.id,
          content: JSON.stringify({ error: Te })
        });
      }
    }
    $({
      content: "",
      client_tool_results: t,
      ...A()
    });
  }, [y, $, A]);
  S(() => {
    var e, t;
    if (!z && p && p.length > 0) {
      const o = p[p.length - 1];
      if ((t = (e = o == null ? void 0 : o.message) == null ? void 0 : e.pendingClientToolCalls) != null && t.length) {
        const l = o.message.pendingClientToolCalls;
        D.current !== l && (D.current = l, Q(l));
      } else
        D.current = null;
    }
  }, [z, p, Q]);
  const Z = (e) => {
    if (e) {
      if (!g) {
        v(e);
        return;
      }
      $({
        content: e,
        domains: T.filter((t) => t.type === "domain").map((t) => t.value),
        skill_ids: T.filter((t) => t.type === "skill").map((t) => t.value),
        ...A()
      });
    }
  }, { run: ve, loading: Ce } = j(async (e) => await C.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      P.error(i("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (e) => {
      if (p && p.length > 0 && (p[p.length - 1].status === "loading" || p.length > e.messages.length))
        return;
      const t = [];
      let o = { id: "", message: { content: "", role: "assistant" }, status: "success" };
      for (const l of e.messages)
        switch (l.role) {
          case "assistant":
            o.status = l.status === "completed" && o.status === "success" ? "success" : "error", o.message.role = "assistant", o.id !== l.id && l.content && (o.message.content = l.content), o.id = l.id;
            break;
          case "user":
            o.message.content.length > 0 && (t.push({
              id: o.id,
              message: {
                content: o.message.content,
                role: o.message.role
              },
              status: o.status
            }), o = { id: "", message: { content: "", role: "assistant" }, status: "success" }), t.push({
              id: l.id,
              message: {
                content: l.content,
                role: l.role
              },
              status: l.status === "completed" ? "success" : "error"
            });
            break;
        }
      o.message.content.length > 0 && t.push({
        id: o.id,
        message: {
          content: o.message.content,
          role: o.message.role
        },
        status: o.status
      }), ye(t);
    }
  }), { run: v, loading: O } = j(async (e, t, o = !1) => await C.ai.createChatSession({
    title: i("chat.defaultConversationTitle"),
    model_id: "",
    messages: t || [],
    anonymous: o
  }), {
    manual: !0,
    onError: () => {
      P.error(i("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (e, [t]) => {
      de(w(e), "prepend"), B(e.id), t && U({ message: t, sessionId: e.id });
    }
  });
  S(() => {
    ue((h == null ? void 0 : h.map((e) => w(e))) || []);
  }, [h]);
  const { run: je } = j(async (e) => await C.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [t]) {
      P.error(i("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const o = E(t);
      o && _(t, { ...o, loading: !1 });
    },
    onSuccess(e, [t]) {
      me(t);
    }
  }), { run: Se } = j(async (e) => C.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: e }, [t]) => {
      const o = E(t);
      o && _(t, { ...o, title: e, loading: !1 });
    },
    onError: (e, [t]) => {
      P.error(i("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: e.message || e }));
      const o = E(t);
      o && _(t, { ...o, loading: !1 });
    }
  });
  S(() => {
    if (g && (L == null ? void 0 : L.sessionId) === g) {
      const e = L.message;
      setTimeout(() => {
        $({
          content: e,
          ...A()
        });
      }, 1e3), U(void 0);
    }
  }, [g, L, A]), S(() => {
    if (g) {
      const e = ge(g);
      if (e && e.length > 0)
        return;
      ve(g);
    }
  }, [g]), S(() => {
    c && v && c((e, t) => {
      v(e, t, !0);
    });
  }, [v, c]);
  const we = /* @__PURE__ */ s.jsxs("div", { className: m.sider, children: [
    /* @__PURE__ */ s.jsx(
      N,
      {
        onClick: () => {
          v();
        },
        type: "link",
        className: m.addBtn,
        icon: /* @__PURE__ */ s.jsx(te, {}),
        loading: O,
        children: i("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ s.jsx(I, { spinning: F, wrapperClassName: m.conversationsSpin, children: /* @__PURE__ */ s.jsx(
      Ee,
      {
        items: M,
        activeKey: g,
        onActiveChange: async (e) => {
          e && B(e);
        },
        className: m.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (e) => ({
          items: [
            {
              label: i("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ s.jsx($e, {}),
              onClick: () => {
                _(e.key, { ...e, loading: !0 }), Se(e.key);
              }
            },
            {
              label: k("delete"),
              key: "delete",
              icon: /* @__PURE__ */ s.jsx(Ne, {}),
              danger: !0,
              onClick: () => {
                _(e.key, { ...e, loading: !0 }), je(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), _e = /* @__PURE__ */ s.jsx(s.Fragment, { children: /* @__PURE__ */ s.jsx(oe, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: /* @__PURE__ */ s.jsx(
    ne,
    {
      footer: (e) => /* @__PURE__ */ s.jsxs(q, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ s.jsx(q, { gap: "small", align: "center", children: /* @__PURE__ */ s.jsx(
          re,
          {
            open: pe,
            onOpenChange: (t, o) => {
              (o.source === "trigger" || t) && fe(t);
            },
            menu: {
              selectedKeys: T.map((t) => t.value),
              onClick: (t) => {
                const o = W.find((l) => l.key === t.key);
                he((l) => l.some((f) => f.value === t.key) ? l.filter((f) => f.value !== t.key) : [...l, { type: (o == null ? void 0 : o.skillType) || "skill", value: t.key }]);
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
        /* @__PURE__ */ s.jsx(q, { align: "center", children: e })
      ] }),
      suffix: !1,
      value: J,
      onSubmit: async () => {
        Z(J.trim()), Y("");
      },
      onChange: Y,
      onCancel: () => {
        xe();
      },
      loading: z,
      className: et(m.sender, "chat-sender"),
      placeholder: i("chat.inputPlaceholder")
    }
  ) }) });
  return /* @__PURE__ */ s.jsx(ze, { children: /* @__PURE__ */ s.jsxs(rt.Provider, { value: { onReload: be, setMessage: ke }, children: [
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
              label: /* @__PURE__ */ s.jsx(Fe, { style: { transform: "scaleX(-1)" } }),
              value: "classic"
            },
            {
              label: /* @__PURE__ */ s.jsx(Pe, {}),
              value: "sidebar"
            },
            {
              label: /* @__PURE__ */ s.jsx(Re, {}),
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
          N,
          {
            type: "primary",
            onClick: () => {
              v();
            },
            loading: O,
            icon: /* @__PURE__ */ s.jsx(te, {}),
            style: { display: n === "classic" ? "none" : "block" }
          }
        ),
        /* @__PURE__ */ s.jsx(
          re,
          {
            menu: {
              items: M.map((e) => ({
                label: e.label,
                key: e.key
              })),
              onClick: ({ key: e }) => {
                B(e);
              }
            },
            placement: "bottomRight",
            children: /* @__PURE__ */ s.jsx(N, { icon: F ? /* @__PURE__ */ s.jsx(I, { size: "small" }) : /* @__PURE__ */ s.jsx(Ve, {}), style: { display: n === "classic" ? "none" : "block" } })
          }
        ),
        /* @__PURE__ */ s.jsx(N, { type: "text", onClick: () => a(!1), children: /* @__PURE__ */ s.jsx(Be, {}) })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: n === "classic" ? m.classicLayout : m.siderLayout, style: {
      minWidth: n === "classic" ? "500px" : "400px"
    }, children: [
      n === "classic" ? we : null,
      /* @__PURE__ */ s.jsxs("div", { className: m.chat, children: [
        /* @__PURE__ */ s.jsx(
          it,
          {
            bubble: r,
            messages: p,
            loading: Ce || O,
            layout: n,
            onSendMessage: Z
          }
        ),
        _e
      ] })
    ] })
  ] }) });
};
export {
  St as AIChat,
  St as default
};
