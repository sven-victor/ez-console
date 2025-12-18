var pe = Object.defineProperty;
var he = (s, t, r) => t in s ? pe(s, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : s[t] = r;
var O = (s, t, r) => he(s, typeof t != "symbol" ? t + "" : t, r);
import { j as n } from "./vendor.js";
import { a as C } from "./index.js";
import { PlusOutlined as q, ReloadOutlined as fe, DeleteOutlined as xe, BlockOutlined as be, BorderRightOutlined as D, HistoryOutlined as ye, CloseOutlined as ve } from "@ant-design/icons";
import { useRequest as j } from "ahooks";
import { theme as Ce, message as L, Button as w, Spin as y, Radio as je, Space as we, Dropdown as ke } from "antd";
import { createStyles as Se } from "antd-style";
import A, { useEffect as v, useState as V } from "react";
import { useTranslation as X } from "react-i18next";
import F from "dayjs";
import { u as $e } from "./contexts.js";
import { u as Me, a as Le, C as Fe, X as H, F as Te, S as Ae, b as Re, c as Ne, M as _e, d as Be, A as Ie } from "./ant-design-x.js";
const Pe = Se(({ token: s, css: t }) => ({
  siderLayout: t`
      width: 100%;
      height: calc(100vh - 100px);
      display: flex;
      background: ${s.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${s.fontFamily}, sans-serif;
    `,
  classicLayout: t`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${s.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${s.fontFamily}, sans-serif;
    `,
  sider: t`
      background: ${s.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,
  logo: t`
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;
      gap: 8px;
      margin: 24px 0;

      span {
        font-weight: bold;
        color: ${s.colorText};
        font-size: 16px;
      }
    `,
  addBtn: t`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,
  conversationsSpin: t`
      height: 100%;
      overflow-y: auto;
    `,
  conversations: t`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
  siderFooter: t`
      border-top: 1px solid ${s.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
  chat: t`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${s.paddingLG}px;
      gap: 16px;
    `,
  chatPrompt: t`
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
  chatList: t`
      flex: 1;
      overflow: auto;
      .ant-spin-nested-loading{
        height: 100%;
        .ant-spin-container{
          height: 100%;
        }
      }
      .ant-bubble > .ant-bubble-content{
        max-width: 90%;
      }
      .ant-bubble-end{
        .ant-bubble-content{
          background-color: rgb(22 119 255 / 15%);
        }
      }
      .ant-bubble-list-autoscroll{
        flex-direction: column-reverse;
      }
    `,
  loadingMessage: t`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,
  placeholder: t`
      padding-top: 32px;
    `,
  sender: t`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,
  speechButton: t`
      font-size: 18px;
      color: ${s.colorText} !important;
    `,
  senderPrompt: t`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${s.colorText};
    `
}));
class ze extends Error {
  constructor(r, i) {
    super(r);
    O(this, "buffer");
    this.buffer = i;
  }
}
class Ee extends Ie {
  transformParams(t, r) {
    if (typeof t != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(r == null ? void 0 : r.params) || {},
      ...t || {}
    };
  }
  transformLocalMessage({ content: t }) {
    return {
      content: t,
      role: "user"
    };
  }
  transformMessage(t) {
    const { originMessage: r, chunk: i } = t || {};
    if (!i)
      return {
        content: (r == null ? void 0 : r.content) || "",
        role: "assistant"
      };
    const l = JSON.parse(i.data), u = (r == null ? void 0 : r.content) || "";
    switch (l.event_type) {
      case "content":
        return {
          content: `${u || ""}${l.content || ""}`,
          role: "assistant"
        };
      case "tool_call":
        return {
          content: u.endsWith("<br/>") ? `${u}${l.content || ""}` : `${u}<br/>${l.content || ""}`,
          role: "assistant"
        };
      case "error":
        return {
          content: u,
          role: "assistant",
          error: l.content
        };
    }
  }
}
const T = /* @__PURE__ */ new Map(), Oe = (s) => (T.get(s) || T.set(
  s,
  new Ee({
    request: Ne(
      `/api/ai/chat/sessions/${s}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (t, r) => {
            const i = localStorage.getItem("orgID"), { sessionId: l } = r.params, u = {
              ...r.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...i ? { "X-Scope-OrgID": i } : {}
            };
            return [l ? `/api/ai/chat/sessions/${l}` : t, { ...r, headers: u }];
          }
        }
      }
    )
  })
), T.get(s)), K = (s) => {
  var l;
  const { className: t, children: r } = s, i = ((l = t == null ? void 0 : t.match(/language-(\w+)/)) == null ? void 0 : l[1]) || "";
  return typeof r != "string" ? null : i === "mermaid" ? /* @__PURE__ */ n.jsx(_e, { children: r }) : /* @__PURE__ */ n.jsx(Be, { lang: i, children: r });
}, qe = () => {
  const s = Ce.useToken(), t = A.useMemo(() => {
    var i;
    return ((i = s == null ? void 0 : s.theme) == null ? void 0 : i.id) === 0;
  }, [s]);
  return [A.useMemo(() => t ? "x-markdown-light" : "x-markdown-dark", [t])];
}, De = A.createContext({}), tt = () => {
  const {
    layout: s,
    setVisible: t,
    setLayout: r,
    onCallAI: i,
    activeConversationKey: l,
    setActiveConversationKey: u,
    conversations: h,
    fetchConversationsLoading: R
  } = $e(), { t: m } = X("ai"), { t: N } = X("common"), { styles: g } = Pe(), k = (e) => ({
    key: e.id,
    label: e.title,
    group: F(e.start_time).isSame(F(), "day") ? m("chat.today") : F(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: _,
    activeConversationKey: c,
    setActiveConversationKey: S,
    addConversation: Y,
    setConversations: G,
    getConversation: $,
    setConversation: x,
    removeConversation: W,
    getMessages: J
  } = Me({
    defaultActiveConversationKey: l,
    defaultConversations: (h == null ? void 0 : h.map((e) => k(e))) || []
  });
  v(() => {
    u(c);
  }, [c]);
  const [U] = qe(), [B, Q] = L.useMessage(), [I, P] = V(""), [b, z] = V(), { onRequest: E, messages: p, isRequesting: Z, abort: ee, onReload: te, setMessages: se, setMessage: ne } = Le({
    provider: Oe(c),
    // every conversation has its own provider
    conversationKey: c,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: N("loading"),
      role: "assistant"
    }),
    requestFallback: (e, { error: o }) => o instanceof ze ? {
      content: o.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: o.message
    } : {
      content: `${o}`,
      role: "assistant"
    }
  }), ae = (e) => {
    if (e) {
      if (!c) {
        f(e);
        return;
      }
      E({
        content: e
      });
    }
  }, { run: oe, loading: re } = j(async (e) => await C.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      L.error(m("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (e) => {
      if (p && p.length > 0 && (p[p.length - 1].status === "loading" || p.length > e.messages.length))
        return;
      const o = [];
      let a = { id: "", message: { content: "", role: "assistant" }, status: "success" };
      for (const d of e.messages)
        switch (d.role) {
          case "assistant":
            a.status = d.status === "completed" && a.status === "success" ? "success" : "error", a.message.role = "assistant", a.id = d.id, d.tool_calls && d.tool_calls.length > 0 ? a.message.content.endsWith("<br/>") ? a.message.content = `${a.message.content}${d.content}` : a.message.content = `${a.message.content}<br/>${d.content}` : a.message.content = `${a.message.content}${d.content}`;
            break;
          case "user":
            a.message.content.length > 0 && (o.push({
              id: a.id,
              message: {
                content: a.message.content,
                role: a.message.role
              },
              status: a.status
            }), a = { id: "", message: { content: "", role: "assistant" }, status: "success" }), o.push({
              id: d.id,
              message: {
                content: d.content,
                role: d.role
              },
              status: d.status === "completed" ? "success" : "error"
            });
            break;
        }
      a.message.content.length > 0 && o.push({
        id: a.id,
        message: {
          content: a.message.content,
          role: a.message.role
        },
        status: a.status
      }), se(o);
    }
  }), { run: f, loading: M } = j(async (e, o, a = !1) => await C.ai.createChatSession({
    title: m("chat.defaultConversationTitle"),
    model_id: "",
    messages: o || [],
    anonymous: a
  }), {
    manual: !0,
    onError: () => {
      L.error(m("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (e, [o]) => {
      Y(k(e), "prepend"), S(e.id), o && z({ message: o, sessionId: e.id });
    }
  });
  v(() => {
    G((h == null ? void 0 : h.map((e) => k(e))) || []);
  }, [h]);
  const { run: ie } = j(async (e) => await C.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [o]) {
      B.error(m("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const a = $(o);
      a && x(o, { ...a, loading: !1 });
    },
    onSuccess(e, [o]) {
      W(o);
    }
  }), { run: le } = j(async (e) => C.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: e }, [o]) => {
      const a = $(o);
      a && x(o, { ...a, title: e, loading: !1 });
    },
    onError: (e, [o]) => {
      B.error(m("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: e.message || e }));
      const a = $(o);
      a && x(o, { ...a, loading: !1 });
    }
  });
  v(() => {
    if (c && (b == null ? void 0 : b.sessionId) === c) {
      const e = b.message;
      setTimeout(() => {
        E({
          content: e
        });
      }, 1e3), z(void 0);
    }
  }, [c, b]), v(() => {
    if (c) {
      const e = J(c);
      if (e && e.length > 0)
        return;
      oe(c);
    }
  }, [c]), v(() => {
    i && f && i((e, o) => {
      f(e, o, !0);
    });
  }, [f, i]);
  const ce = /* @__PURE__ */ n.jsxs("div", { className: g.sider, children: [
    /* @__PURE__ */ n.jsx(
      w,
      {
        onClick: () => {
          f();
        },
        type: "link",
        className: g.addBtn,
        icon: /* @__PURE__ */ n.jsx(q, {}),
        loading: M,
        children: m("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ n.jsx(y, { spinning: R, wrapperClassName: g.conversationsSpin, children: /* @__PURE__ */ n.jsx(
      Fe,
      {
        items: _,
        activeKey: c,
        onActiveChange: async (e) => {
          e && S(e);
        },
        className: g.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (e) => ({
          items: [
            {
              label: m("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ n.jsx(fe, {}),
              onClick: () => {
                x(e.key, { ...e, loading: !0 }), le(e.key);
              }
            },
            {
              label: N("delete"),
              key: "delete",
              icon: /* @__PURE__ */ n.jsx(xe, {}),
              danger: !0,
              onClick: () => {
                x(e.key, { ...e, loading: !0 }), ie(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), de = ({ message: e }) => {
    if (e.error)
      return /* @__PURE__ */ n.jsx("div", { children: /* @__PURE__ */ n.jsx(H, { content: e.error, components: { code: K } }) });
  }, ue = p == null ? void 0 : p.map((e) => ({
    ...e.message,
    key: e.id,
    contentRender: (o) => /* @__PURE__ */ n.jsx(
      H,
      {
        paragraphTag: "div",
        content: o,
        className: U,
        components: { code: K }
      }
    ),
    footer: de(e)
  })), me = /* @__PURE__ */ n.jsx("div", { className: g.chatList, children: /* @__PURE__ */ n.jsx(y, { spinning: re || M, children: /* @__PURE__ */ n.jsx(
    Te.List,
    {
      items: ue,
      style: {
        height: "100%",
        paddingInline: s === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ n.jsx(y, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ n.jsx(y, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) }), ge = /* @__PURE__ */ n.jsx(n.Fragment, { children: /* @__PURE__ */ n.jsx(
    Ae,
    {
      value: I,
      onSubmit: async () => {
        ae(I.trim()), P("");
      },
      onChange: P,
      onCancel: () => {
        ee();
      },
      loading: Z,
      className: g.sender,
      placeholder: m("chat.inputPlaceholder")
    }
  ) });
  return /* @__PURE__ */ n.jsxs(Re, { children: [
    Q,
    /* @__PURE__ */ n.jsxs(De.Provider, { value: { onReload: te, setMessage: ne }, children: [
      /* @__PURE__ */ n.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
        /* @__PURE__ */ n.jsx(
          je.Group,
          {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            options: [
              {
                label: /* @__PURE__ */ n.jsx(be, {}),
                value: "classic"
              },
              {
                label: /* @__PURE__ */ n.jsx(D, {}),
                value: "sidebar"
              },
              {
                label: /* @__PURE__ */ n.jsx(D, {}),
                value: "float-sidebar"
              }
            ],
            optionType: "button",
            onChange: (e) => r(e.target.value),
            value: s
          }
        ),
        /* @__PURE__ */ n.jsxs(we, { style: { float: "right", marginTop: 10 }, children: [
          /* @__PURE__ */ n.jsx(
            w,
            {
              type: "primary",
              onClick: () => {
                f();
              },
              loading: M,
              icon: /* @__PURE__ */ n.jsx(q, {}),
              style: { display: s === "classic" ? "none" : "block" }
            }
          ),
          /* @__PURE__ */ n.jsx(
            ke,
            {
              menu: {
                items: _.map((e) => ({
                  label: e.label,
                  key: e.key
                })),
                onClick: ({ key: e }) => {
                  S(e);
                }
              },
              placement: "bottomRight",
              children: /* @__PURE__ */ n.jsx(w, { icon: R ? /* @__PURE__ */ n.jsx(y, { size: "small" }) : /* @__PURE__ */ n.jsx(ye, {}), style: { display: s === "classic" ? "none" : "block" } })
            }
          ),
          /* @__PURE__ */ n.jsx(w, { type: "text", onClick: () => t(!1), children: /* @__PURE__ */ n.jsx(ve, {}) })
        ] })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: s === "classic" ? g.classicLayout : g.siderLayout, style: {
        minWidth: s === "classic" ? "500px" : "400px"
      }, children: [
        s === "classic" ? ce : null,
        /* @__PURE__ */ n.jsxs("div", { className: g.chat, children: [
          me,
          ge
        ] })
      ] })
    ] })
  ] });
};
export {
  tt as default,
  qe as useMarkdownTheme
};
