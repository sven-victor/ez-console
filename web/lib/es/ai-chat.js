var Fe = Object.defineProperty;
var Ie = (r, n, o) => n in r ? Fe(r, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[n] = o;
var te = (r, n, o) => Ie(r, typeof n != "symbol" ? n + "" : n, o);
import { j as s, g as Pe, h as Re, k as $e, l as Ne } from "./vendor.js";
import { a as C } from "./index.js";
import { PlusOutlined as ne, ReloadOutlined as Ve, DeleteOutlined as Be, HistoryOutlined as Ee, CloseOutlined as Me } from "@ant-design/icons";
import { Conversations as ze, Sender as se, XProvider as De, Bubble as Oe, Mermaid as He, CodeHighlighter as qe } from "@ant-design/x";
import { useXConversations as Xe, useXChat as Ke, XRequest as Je, AbstractChatProvider as Ye } from "@ant-design/x-sdk";
import { XMarkdown as ae } from "@ant-design/x-markdown";
import { useRequest as j } from "ahooks";
import { message as D, Tag as oe, Button as $, Spin as F, Space as re, Flex as O, Dropdown as ie, Radio as Ge } from "antd";
import { createStyles as We, useThemeMode as Ue } from "antd-style";
import Qe, { useEffect as S, useState as N, useMemo as X, useCallback as le, useRef as Ze } from "react";
import { useTranslation as ce } from "react-i18next";
import H from "dayjs";
import { d as et } from "./contexts.js";
import tt from "classnames";
/* empty css             */
const de = We(({ token: r, css: n }) => ({
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
class nt extends Error {
  constructor(o, u) {
    super(o);
    te(this, "buffer");
    this.buffer = u;
  }
}
function st(r) {
  if (r == null || typeof r != "object")
    return !1;
  const n = r;
  if (n.name === "AbortError")
    return !0;
  const o = typeof n.message == "string" ? n.message : "";
  return /aborted/i.test(o) || /BodyStreamBuffer/i.test(o);
}
class at extends Ye {
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
const q = /* @__PURE__ */ new Map(), ot = (r) => (q.get(r) || q.set(
  r,
  new at({
    request: Je(
      `/api/ai/chat/sessions/${r}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (n, o) => {
            const u = localStorage.getItem("orgID"), { sessionId: c } = o.params ?? {}, d = {
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
), q.get(r)), rt = (r) => {
  var c;
  const { className: n, children: o } = r, u = ((c = n == null ? void 0 : n.match(/language-(\w+)/)) == null ? void 0 : c[1]) || "";
  return typeof o != "string" ? null : u === "mermaid" ? /* @__PURE__ */ s.jsx(He, { children: o }) : /* @__PURE__ */ s.jsx("code", { className: "ant-highlightCode-code", children: /* @__PURE__ */ s.jsx(qe, { lang: u, children: o }) });
}, it = Qe.createContext({}), lt = ({
  bubble: r = {},
  messages: n,
  loading: o,
  layout: u = "classic",
  onSendMessage: c
}) => {
  const { styles: d } = de(), { isDarkMode: x } = Ue(), h = X(() => {
    if (!r.components) return { code: rt };
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
    contentRender: I = (i) => /* @__PURE__ */ s.jsx(
      ae,
      {
        paragraphTag: "div",
        content: i,
        className: x ? "x-markdown-dark" : "x-markdown-light",
        components: h
      }
    ),
    footerRender: b = ({ message: i }) => {
      if (i.error)
        return /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(ae, { content: i.error, components: h }) });
    }
  } = r, y = X(() => (n || []).map((i) => ({
    ...i.message,
    key: i.id,
    contentRender: I,
    footer: (k, m) => b == null ? void 0 : b(i, m, c)
  })).filter((i) => i.content), [n]);
  return /* @__PURE__ */ s.jsx("div", { className: d.chatList, children: /* @__PURE__ */ s.jsx(F, { spinning: o, children: /* @__PURE__ */ s.jsx(
    Oe.List,
    {
      items: y,
      style: {
        height: "100%",
        paddingInline: u === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ s.jsx(F, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ s.jsx(F, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) });
}, wt = ({
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
    fetchConversationsLoading: I,
    ephemeralSystemPrompts: b,
    clientTools: y
  } = et(), { t: i } = ce("ai"), { t: k } = ce("common"), { styles: m } = de(), w = (e) => ({
    key: e.id,
    label: e.title,
    group: H(e.start_time).isSame(H(), "day") ? i("chat.today") : H(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: K,
    activeConversationKey: g,
    setActiveConversationKey: V,
    addConversation: ue,
    setConversations: me,
    getConversation: B,
    setConversation: _,
    removeConversation: ge,
    getMessages: pe
  } = Xe({
    defaultActiveConversationKey: d,
    defaultConversations: (h == null ? void 0 : h.map((e) => w(e))) || []
  });
  S(() => {
    x(g);
  }, [g]);
  const [J, fe] = D.useMessage(), [Y, G] = N(""), [he, xe] = N(!1), [T, be] = N([]), { data: W } = j(() => C.system.listSkillDomains()), { data: P } = j(
    () => C.system.listSkills({ current: 1, page_size: 500 })
  ), U = X(() => [
    ...(W ?? []).map((e) => ({
      skillType: "domain",
      key: e,
      label: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx(oe, { children: i("chat.skillDomain", { defaultValue: "Skill domain" }) }),
        e
      ] })
    })),
    ...((P == null ? void 0 : P.data) ?? []).map((e) => ({
      skillType: "skill",
      key: e.id,
      label: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx(oe, { children: i("chat.skill", { defaultValue: "Skill" }) }),
        e.name
      ] })
    }))
  ], [P, W]), [L, Q] = N(), { onRequest: R, messages: p, isRequesting: E, abort: ye, onReload: ke, setMessages: ve, setMessage: Ce } = Ke({
    provider: ot(g),
    // every conversation has its own provider
    conversationKey: g,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: k("loading"),
      role: "assistant"
    }),
    requestFallback: (e, { error: t }) => st(t) ? {
      content: "",
      role: "assistant"
    } : t instanceof nt ? {
      content: t.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: t.message
    } : {
      content: `${t}`,
      role: "assistant"
    }
  }), A = le(() => {
    const e = {};
    return b.length > 0 && (e.ephemeral_system_prompts = b), y.length > 0 && (e.client_tools = y.map((t) => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters
    }))), e;
  }, [b, y]), M = Ze(null), Z = le(async (e) => {
    const t = [];
    for (const a of e) {
      const l = y.find((f) => f.name === a.name);
      if (!l) {
        t.push({
          tool_call_id: a.id,
          content: JSON.stringify({ error: `Client tool handler not found for ${a.name}` })
        });
        continue;
      }
      try {
        const f = await Promise.resolve(l.handler(a.arguments));
        t.push({ tool_call_id: a.id, content: f });
      } catch (f) {
        const Ae = f instanceof Error ? f.message : String(f);
        t.push({
          tool_call_id: a.id,
          content: JSON.stringify({ error: Ae })
        });
      }
    }
    R({
      content: "",
      client_tool_results: t,
      ...A()
    });
  }, [y, R, A]);
  S(() => {
    var e, t;
    if (!E && p && p.length > 0) {
      const a = p[p.length - 1];
      if ((t = (e = a == null ? void 0 : a.message) == null ? void 0 : e.pendingClientToolCalls) != null && t.length) {
        const l = a.message.pendingClientToolCalls;
        M.current !== l && (M.current = l, Z(l));
      } else
        M.current = null;
    }
  }, [E, p, Z]);
  const ee = (e) => {
    if (e) {
      if (!g) {
        v(e);
        return;
      }
      R({
        content: e,
        domains: T.filter((t) => t.type === "domain").map((t) => t.value),
        skill_ids: T.filter((t) => t.type === "skill").map((t) => t.value),
        ...A()
      });
    }
  }, { run: je, loading: Se } = j(async (e) => await C.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      D.error(i("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (e) => {
      if (p && p.length > 0 && (p[p.length - 1].status === "loading" || p.length > e.messages.length))
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
  }), { run: v, loading: z } = j(async (e, t, a = !1) => await C.ai.createChatSession({
    title: i("chat.defaultConversationTitle"),
    model_id: "",
    messages: t || [],
    anonymous: a
  }), {
    manual: !0,
    onError: () => {
      D.error(i("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (e, [t]) => {
      ue(w(e), "prepend"), V(e.id), t && Q({ message: t, sessionId: e.id });
    }
  });
  S(() => {
    me((h == null ? void 0 : h.map((e) => w(e))) || []);
  }, [h]);
  const { run: we } = j(async (e) => await C.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [t]) {
      J.error(i("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const a = B(t);
      a && _(t, { ...a, loading: !1 });
    },
    onSuccess(e, [t]) {
      ge(t);
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
    if (g && (L == null ? void 0 : L.sessionId) === g) {
      const e = L.message;
      setTimeout(() => {
        R({
          content: e,
          ...A()
        });
      }, 1e3), Q(void 0);
    }
  }, [g, L, A]), S(() => {
    if (g) {
      const e = pe(g);
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
        icon: /* @__PURE__ */ s.jsx(ne, {}),
        loading: z,
        children: i("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ s.jsx(F, { spinning: I, wrapperClassName: m.conversationsSpin, children: /* @__PURE__ */ s.jsx(
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
              icon: /* @__PURE__ */ s.jsx(Ve, {}),
              onClick: () => {
                _(e.key, { ...e, loading: !0 }), _e(e.key);
              }
            },
            {
              label: k("delete"),
              key: "delete",
              icon: /* @__PURE__ */ s.jsx(Be, {}),
              danger: !0,
              onClick: () => {
                _(e.key, { ...e, loading: !0 }), we(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), Le = /* @__PURE__ */ s.jsx(s.Fragment, { children: /* @__PURE__ */ s.jsx(re, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: /* @__PURE__ */ s.jsx(
    se,
    {
      footer: (e) => /* @__PURE__ */ s.jsxs(O, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ s.jsx(O, { gap: "small", align: "center", children: /* @__PURE__ */ s.jsx(
          ie,
          {
            open: he,
            onOpenChange: (t, a) => {
              (a.source === "trigger" || t) && xe(t);
            },
            menu: {
              selectedKeys: T.map((t) => t.value),
              onClick: (t) => {
                const a = U.find((l) => l.key === t.key);
                be((l) => l.some((f) => f.value === t.key) ? l.filter((f) => f.value !== t.key) : [...l, { type: (a == null ? void 0 : a.skillType) || "skill", value: t.key }]);
              },
              items: U.map((t) => ({
                label: t.label,
                key: t.key
              }))
            },
            children: /* @__PURE__ */ s.jsxs(se.Switch, { value: !1, icon: /* @__PURE__ */ s.jsx(Pe, {}), children: [
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
        ee(Y.trim()), G("");
      },
      onChange: G,
      onCancel: () => {
        ye();
      },
      loading: E,
      className: tt(m.sender, "chat-sender"),
      placeholder: i("chat.inputPlaceholder")
    }
  ) }) });
  return /* @__PURE__ */ s.jsxs(De, { children: [
    fe,
    /* @__PURE__ */ s.jsxs(it.Provider, { value: { onReload: ke, setMessage: Ce }, children: [
      /* @__PURE__ */ s.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
        /* @__PURE__ */ s.jsx(
          Ge.Group,
          {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            options: [
              {
                label: /* @__PURE__ */ s.jsx(Re, { style: { transform: "scaleX(-1)" } }),
                value: "classic"
              },
              {
                label: /* @__PURE__ */ s.jsx($e, {}),
                value: "sidebar"
              },
              {
                label: /* @__PURE__ */ s.jsx(Ne, {}),
                value: "float-sidebar"
              }
            ],
            optionType: "button",
            onChange: (e) => u(e.target.value),
            value: n
          }
        ),
        /* @__PURE__ */ s.jsxs(re, { style: { float: "right", marginTop: 10 }, children: [
          /* @__PURE__ */ s.jsx(
            $,
            {
              type: "primary",
              onClick: () => {
                v();
              },
              loading: z,
              icon: /* @__PURE__ */ s.jsx(ne, {}),
              style: { display: n === "classic" ? "none" : "block" }
            }
          ),
          /* @__PURE__ */ s.jsx(
            ie,
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
              children: /* @__PURE__ */ s.jsx($, { icon: I ? /* @__PURE__ */ s.jsx(F, { size: "small" }) : /* @__PURE__ */ s.jsx(Ee, {}), style: { display: n === "classic" ? "none" : "block" } })
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
            lt,
            {
              bubble: r,
              messages: p,
              loading: Se || z,
              layout: n,
              onSendMessage: ee
            }
          ),
          Le
        ] })
      ] })
    ] })
  ] });
};
export {
  wt as AIChat,
  wt as default
};
