var je = Object.defineProperty;
var Se = (n, s, r) => s in n ? je(n, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : n[s] = r;
var X = (n, s, r) => Se(n, typeof s != "symbol" ? s + "" : s, r);
import { j as t } from "./vendor.js";
import { a as x } from "./index.js";
import { PlusOutlined as H, ReloadOutlined as we, DeleteOutlined as $e, BlockOutlined as Te, BorderRightOutlined as K, HistoryOutlined as Le, CloseOutlined as Me } from "@ant-design/icons";
import { Conversations as Fe, Bubble as Ae, Sender as Ne, XProvider as _e, Mermaid as Re, CodeHighlighter as Pe } from "@ant-design/x";
import { useXConversations as Be, useXChat as Ie, XRequest as ze, AbstractChatProvider as Oe } from "@ant-design/x-sdk";
import { XMarkdown as W } from "@ant-design/x-markdown";
import { useRequest as b } from "ahooks";
import { theme as Ve, message as A, Tag as Y, Button as j, Spin as C, Space as G, Select as De, Radio as Ee, Dropdown as qe } from "antd";
import { createStyles as Xe } from "antd-style";
import P, { useEffect as k, useState as N } from "react";
import { useTranslation as J } from "react-i18next";
import _ from "dayjs";
import { u as He } from "./contexts.js";
import { isArray as Ke } from "lodash-es";
import U from "classnames";
const We = Xe(({ token: n, css: s }) => ({
  siderLayout: s`
      width: 100%;
      height: calc(100vh - 100px);
      display: flex;
      background: ${n.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${n.fontFamily}, sans-serif;
    `,
  classicLayout: s`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${n.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${n.fontFamily}, sans-serif;
    `,
  sider: s`
      background: ${n.colorBgLayout}80;
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
        color: ${n.colorText};
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
      border-top: 1px solid ${n.colorBorderSecondary};
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
      padding-block: ${n.paddingLG}px;
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
      color: ${n.colorText} !important;
    `,
  senderPrompt: s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${n.colorText};
    `
}));
class Ye extends Error {
  constructor(r, i) {
    super(r);
    X(this, "buffer");
    this.buffer = i;
  }
}
class Ge extends Oe {
  transformParams(s, r) {
    if (typeof s != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(r == null ? void 0 : r.params) || {},
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
    const { originMessage: r, chunk: i } = s || {};
    if (!i)
      return {
        content: (r == null ? void 0 : r.content) || "",
        role: "assistant"
      };
    const l = JSON.parse(i.data), g = (r == null ? void 0 : r.content) || "";
    switch (l.event_type) {
      case "content":
        return {
          content: `${g || ""}${l.content || ""}`,
          role: "assistant"
        };
      case "tool_call":
        return {
          content: g.endsWith("<br/>") ? `${g}${l.content || ""}` : `${g}<br/>${l.content || ""}`,
          role: "assistant"
        };
      case "error":
        return {
          content: g,
          role: "assistant",
          error: l.content
        };
    }
  }
}
const R = /* @__PURE__ */ new Map(), Je = (n) => (R.get(n) || R.set(
  n,
  new Ge({
    request: ze(
      `/api/ai/chat/sessions/${n}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (s, r) => {
            const i = localStorage.getItem("orgID"), { sessionId: l } = r.params, g = {
              ...r.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...i ? { "X-Scope-OrgID": i } : {}
            };
            return [l ? `/api/ai/chat/sessions/${l}` : s, { ...r, headers: g }];
          }
        }
      }
    )
  })
), R.get(n)), Q = (n) => {
  var l;
  const { className: s, children: r } = n, i = ((l = s == null ? void 0 : s.match(/language-(\w+)/)) == null ? void 0 : l[1]) || "";
  return typeof r != "string" ? null : i === "mermaid" ? /* @__PURE__ */ t.jsx(Re, { children: r }) : /* @__PURE__ */ t.jsx(Pe, { lang: i, children: r });
}, Ue = () => {
  const n = Ve.useToken(), s = P.useMemo(() => {
    var i;
    return ((i = n == null ? void 0 : n.theme) == null ? void 0 : i.id) === 0;
  }, [n]);
  return [P.useMemo(() => s ? "x-markdown-light" : "x-markdown-dark", [s])];
}, Qe = P.createContext({}), ft = () => {
  const {
    layout: n,
    setVisible: s,
    setLayout: r,
    onCallAI: i,
    activeConversationKey: l,
    setActiveConversationKey: g,
    conversations: h,
    fetchConversationsLoading: B
  } = He(), { t: d } = J("ai"), { t: I } = J("common"), { styles: m } = We(), S = (e) => ({
    key: e.id,
    label: e.title,
    group: _(e.start_time).isSame(_(), "day") ? d("chat.today") : _(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: z,
    activeConversationKey: c,
    setActiveConversationKey: w,
    addConversation: Z,
    setConversations: ee,
    getConversation: $,
    setConversation: y,
    removeConversation: te,
    getMessages: se
  } = Be({
    defaultActiveConversationKey: l,
    defaultConversations: (h == null ? void 0 : h.map((e) => S(e))) || []
  });
  k(() => {
    g(c);
  }, [c]);
  const [ae] = Ue(), [O, ne] = A.useMessage(), [V, D] = N(""), [T, L] = N([]), { data: oe } = b(() => x.system.listSkillDomains()), re = (oe ?? []).map((e) => ({
    skillType: "domain",
    value: e,
    label: /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
      /* @__PURE__ */ t.jsx(Y, { children: d("chat.skillDomain", { defaultValue: "Skill domain" }) }),
      e
    ] })
  })), { data: M } = b(
    () => x.system.listSkills({ current: 1, page_size: 500 })
  ), ie = ((M == null ? void 0 : M.data) ?? []).map((e) => ({
    skillType: "skill",
    value: e.id,
    label: /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
      /* @__PURE__ */ t.jsx(Y, { children: d("chat.skill", { defaultValue: "Skill" }) }),
      e.name
    ] })
  })), [v, E] = N(), { onRequest: q, messages: p, isRequesting: le, abort: ce, onReload: de, setMessages: ue, setMessage: me } = Ie({
    provider: Je(c),
    // every conversation has its own provider
    conversationKey: c,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: I("loading"),
      role: "assistant"
    }),
    requestFallback: (e, { error: a }) => a instanceof Ye ? {
      content: a.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: a.message
    } : {
      content: `${a}`,
      role: "assistant"
    }
  }), ge = (e) => {
    if (e) {
      if (!c) {
        f(e);
        return;
      }
      q({
        content: e,
        domains: T.filter((a) => a.type === "domain").map((a) => a.value),
        skill_ids: T.filter((a) => a.type === "skill").map((a) => a.value)
      });
    }
  }, { run: pe, loading: he } = b(async (e) => await x.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      A.error(d("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (e) => {
      if (p && p.length > 0 && (p[p.length - 1].status === "loading" || p.length > e.messages.length))
        return;
      const a = [];
      let o = { id: "", message: { content: "", role: "assistant" }, status: "success" };
      for (const u of e.messages)
        switch (u.role) {
          case "assistant":
            o.status = u.status === "completed" && o.status === "success" ? "success" : "error", o.message.role = "assistant", o.id = u.id, u.tool_calls && u.tool_calls.length > 0 ? o.message.content.endsWith("<br/>") ? o.message.content = `${o.message.content}${u.content}` : o.message.content = `${o.message.content}<br/>${u.content}` : o.message.content = `${o.message.content}${u.content}`;
            break;
          case "user":
            o.message.content.length > 0 && (a.push({
              id: o.id,
              message: {
                content: o.message.content,
                role: o.message.role
              },
              status: o.status
            }), o = { id: "", message: { content: "", role: "assistant" }, status: "success" }), a.push({
              id: u.id,
              message: {
                content: u.content,
                role: u.role
              },
              status: u.status === "completed" ? "success" : "error"
            });
            break;
        }
      o.message.content.length > 0 && a.push({
        id: o.id,
        message: {
          content: o.message.content,
          role: o.message.role
        },
        status: o.status
      }), ue(a);
    }
  }), { run: f, loading: F } = b(async (e, a, o = !1) => await x.ai.createChatSession({
    title: d("chat.defaultConversationTitle"),
    model_id: "",
    messages: a || [],
    anonymous: o
  }), {
    manual: !0,
    onError: () => {
      A.error(d("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: (e, [a]) => {
      Z(S(e), "prepend"), w(e.id), a && E({ message: a, sessionId: e.id });
    }
  });
  k(() => {
    ee((h == null ? void 0 : h.map((e) => S(e))) || []);
  }, [h]);
  const { run: fe } = b(async (e) => await x.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [a]) {
      O.error(d("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const o = $(a);
      o && y(a, { ...o, loading: !1 });
    },
    onSuccess(e, [a]) {
      te(a);
    }
  }), { run: xe } = b(async (e) => x.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: e }, [a]) => {
      const o = $(a);
      o && y(a, { ...o, title: e, loading: !1 });
    },
    onError: (e, [a]) => {
      O.error(d("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: e.message || e }));
      const o = $(a);
      o && y(a, { ...o, loading: !1 });
    }
  });
  k(() => {
    if (c && (v == null ? void 0 : v.sessionId) === c) {
      const e = v.message;
      setTimeout(() => {
        q({
          content: e
        });
      }, 1e3), E(void 0);
    }
  }, [c, v]), k(() => {
    if (c) {
      const e = se(c);
      if (e && e.length > 0)
        return;
      pe(c);
    }
  }, [c]), k(() => {
    i && f && i((e, a) => {
      f(e, a, !0);
    });
  }, [f, i]);
  const be = /* @__PURE__ */ t.jsxs("div", { className: m.sider, children: [
    /* @__PURE__ */ t.jsx(
      j,
      {
        onClick: () => {
          f();
        },
        type: "link",
        className: m.addBtn,
        icon: /* @__PURE__ */ t.jsx(H, {}),
        loading: F,
        children: d("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ t.jsx(C, { spinning: B, wrapperClassName: m.conversationsSpin, children: /* @__PURE__ */ t.jsx(
      Fe,
      {
        items: z,
        activeKey: c,
        onActiveChange: async (e) => {
          e && w(e);
        },
        className: m.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (e) => ({
          items: [
            {
              label: d("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ t.jsx(we, {}),
              onClick: () => {
                y(e.key, { ...e, loading: !0 }), xe(e.key);
              }
            },
            {
              label: I("delete"),
              key: "delete",
              icon: /* @__PURE__ */ t.jsx($e, {}),
              danger: !0,
              onClick: () => {
                y(e.key, { ...e, loading: !0 }), fe(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), ye = ({ message: e }) => {
    if (e.error)
      return /* @__PURE__ */ t.jsx("div", { children: /* @__PURE__ */ t.jsx(W, { content: e.error, components: { code: Q } }) });
  }, ve = p == null ? void 0 : p.map((e) => ({
    ...e.message,
    key: e.id,
    contentRender: (a) => /* @__PURE__ */ t.jsx(
      W,
      {
        paragraphTag: "div",
        content: a,
        className: ae,
        components: { code: Q }
      }
    ),
    footer: ye(e)
  })), Ce = /* @__PURE__ */ t.jsx("div", { className: m.chatList, children: /* @__PURE__ */ t.jsx(C, { spinning: he || F, children: /* @__PURE__ */ t.jsx(
    Ae.List,
    {
      items: ve,
      style: {
        height: "100%",
        paddingInline: n === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ t.jsx(C, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ t.jsx(C, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) }), ke = /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsxs(G, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: [
    /* @__PURE__ */ t.jsx(
      De,
      {
        mode: "multiple",
        allowClear: !0,
        placeholder: d("chat.skillsPlaceholder", { defaultValue: "Skills (optional)" }),
        value: T.map((e) => e.value),
        onChange: (e, a) => {
          Ke(a) ? L(a.map((o) => ({ type: o.skillType, value: o.value }))) : L(a ? [{ type: a.skillType, value: a.value }] : []);
        },
        options: [
          ...re,
          ...ie
        ],
        className: U(m.skillsSelect, "chat-skills-select")
      }
    ),
    /* @__PURE__ */ t.jsx(
      Ne,
      {
        value: V,
        onSubmit: async () => {
          ge(V.trim()), D("");
        },
        onChange: D,
        onCancel: () => {
          ce();
        },
        loading: le,
        className: U(m.sender, "chat-sender"),
        placeholder: d("chat.inputPlaceholder")
      }
    )
  ] }) });
  return /* @__PURE__ */ t.jsxs(_e, { children: [
    ne,
    /* @__PURE__ */ t.jsxs(Qe.Provider, { value: { onReload: de, setMessage: me }, children: [
      /* @__PURE__ */ t.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
        /* @__PURE__ */ t.jsx(
          Ee.Group,
          {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            options: [
              {
                label: /* @__PURE__ */ t.jsx(Te, {}),
                value: "classic"
              },
              {
                label: /* @__PURE__ */ t.jsx(K, {}),
                value: "sidebar"
              },
              {
                label: /* @__PURE__ */ t.jsx(K, {}),
                value: "float-sidebar"
              }
            ],
            optionType: "button",
            onChange: (e) => r(e.target.value),
            value: n
          }
        ),
        /* @__PURE__ */ t.jsxs(G, { style: { float: "right", marginTop: 10 }, children: [
          /* @__PURE__ */ t.jsx(
            j,
            {
              type: "primary",
              onClick: () => {
                f();
              },
              loading: F,
              icon: /* @__PURE__ */ t.jsx(H, {}),
              style: { display: n === "classic" ? "none" : "block" }
            }
          ),
          /* @__PURE__ */ t.jsx(
            qe,
            {
              menu: {
                items: z.map((e) => ({
                  label: e.label,
                  key: e.key
                })),
                onClick: ({ key: e }) => {
                  w(e);
                }
              },
              placement: "bottomRight",
              children: /* @__PURE__ */ t.jsx(j, { icon: B ? /* @__PURE__ */ t.jsx(C, { size: "small" }) : /* @__PURE__ */ t.jsx(Le, {}), style: { display: n === "classic" ? "none" : "block" } })
            }
          ),
          /* @__PURE__ */ t.jsx(j, { type: "text", onClick: () => s(!1), children: /* @__PURE__ */ t.jsx(Me, {}) })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: n === "classic" ? m.classicLayout : m.siderLayout, style: {
        minWidth: n === "classic" ? "500px" : "400px"
      }, children: [
        n === "classic" ? be : null,
        /* @__PURE__ */ t.jsxs("div", { className: m.chat, children: [
          Ce,
          ke
        ] })
      ] })
    ] })
  ] });
};
export {
  ft as default,
  Ue as useMarkdownTheme
};
