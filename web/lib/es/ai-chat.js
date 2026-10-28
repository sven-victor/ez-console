var kt = Object.defineProperty;
var jt = (a, s, l) => s in a ? kt(a, s, { enumerable: !0, configurable: !0, writable: !0, value: l }) : a[s] = l;
var $e = (a, s, l) => jt(a, typeof s != "symbol" ? s + "" : s, l);
import { j as c, k as wt, l as St, m as It, n as Tt } from "./vendor.js";
import { a as E } from "./index.js";
import { PlusOutlined as Ue, ReloadOutlined as Rt, DeleteOutlined as At, HistoryOutlined as Lt, CloseOutlined as Ht } from "@ant-design/icons";
import { Conversations as Ft, Sender as Ye, XProvider as Dt, Bubble as Nt, Mermaid as $t, CodeHighlighter as Pt } from "@ant-design/x";
import { useXConversations as zt, useXChat as qt, XRequest as Bt, AbstractChatProvider as Ot } from "@ant-design/x-sdk";
import { XMarkdown as Qe } from "@ant-design/x-markdown";
import { useRequest as Q } from "ahooks";
import { App as Vt, Tag as Ze, Button as Ce, Spin as le, Space as et, Flex as ce, Dropdown as tt, Radio as Kt } from "antd";
import { createStyles as Et, useThemeMode as Mt } from "antd-style";
import Xt, { useEffect as I, useState as Z, useMemo as ue, useCallback as T, useRef as L } from "react";
import { useTranslation as nt } from "react-i18next";
import Pe from "dayjs";
import { d as Jt, b as Gt, n as Wt } from "./contexts.js";
import Ut from "classnames";
/* empty css             */
import { C as Yt, q as Qt } from "./components.js";
const rt = Et(({ token: a, css: s }) => ({
  siderLayout: s`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${a.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${a.fontFamily}, sans-serif;
    `,
  classicLayout: s`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${a.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${a.fontFamily}, sans-serif;
    `,
  sider: s`
      background: ${a.colorBgLayout}80;
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
        color: ${a.colorText};
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
      border-top: 1px solid ${a.colorBorderSecondary};
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
      padding-block: ${a.paddingLG}px;
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
        /* Live SSE bubbles shrink to text. Stretch the body when HITL cards are in the footer. */
        .ant-bubble.ant-bubble-start:has(.hitl-card-stack) .ant-bubble-body {
          width: 100%;
          max-width: 100%;
        }
        .ant-bubble.ant-bubble-start .ant-bubble-footer:has(.hitl-card-stack),
        .ant-bubble.ant-bubble-start:has(.chat-message-actions.has-tools) .ant-bubble-body,
        .ant-bubble.ant-bubble-start .ant-bubble-footer:has(.chat-message-actions.has-tools) {
          width: 100%;
          max-width: 100%;
        }
        .ant-bubble-end .ant-bubble-footer {
          display: flex;
          justify-content: flex-end;
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
      color: ${a.colorText} !important;
    `,
  senderPrompt: s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${a.colorText};
    `
}));
function Zt(a) {
  if (a == null || typeof a != "object")
    return;
  const s = a;
  if (typeof s.tool_call_id != "string" || s.tool_call_id === "" || s.kind !== "approval" && s.kind !== "choice" || s.status !== "pending" && s.status !== "decided" && s.status !== "abandoned" || typeof s.title != "string" || typeof s.tool_name != "string" || !Array.isArray(s.options))
    return;
  const l = [];
  for (const r of s.options) {
    if (r == null || typeof r != "object")
      continue;
    const u = r;
    typeof u.id != "string" || typeof u.label != "string" || l.push({
      id: u.id,
      label: u.label,
      description: typeof u.description == "string" ? u.description : "",
      primary: u.primary === !0
    });
  }
  let o = "";
  if (typeof s.arguments == "string")
    o = s.arguments;
  else if (s.arguments != null)
    try {
      o = JSON.stringify(s.arguments);
    } catch {
      o = "";
    }
  return {
    tool_call_id: s.tool_call_id,
    kind: s.kind,
    title: s.title,
    tool_name: s.tool_name,
    arguments: o,
    description: "",
    options: l,
    status: s.status,
    selected_option_id: typeof s.selected_option_id == "string" ? s.selected_option_id : ""
  };
}
function st(a) {
  const s = a;
  if (s == null || typeof s != "object")
    return;
  const l = s.hitl_cards;
  if (!Array.isArray(l))
    return;
  const o = [];
  for (const r of l) {
    const u = Zt(r);
    u && o.push(u);
  }
  return o.length > 0 ? o : void 0;
}
function it(a) {
  return !!(a != null && a.some((s) => s.status === "pending"));
}
function ke(a) {
  return (a ?? []).filter((s) => s.status === "pending");
}
function en(a, s) {
  var r;
  if (!it(s))
    return;
  const l = new Set(s.map((u) => u.tool_call_id)), o = [];
  for (const u of a ?? []) {
    const f = (r = u == null ? void 0 : u.function) == null ? void 0 : r.name;
    !(u != null && u.id) || !f || !f.startsWith("ui_") || f === "ui_choose" || l.has(u.id) || o.push({
      id: u.id,
      name: f,
      arguments: typeof u.function.arguments == "string" ? u.function.arguments : "",
      hitlFromHistory: !0
    });
  }
  return o.length > 0 ? o : void 0;
}
function lt(a) {
  return !!a && (a === "ui_choose" || a.startsWith("ui_"));
}
function ct(a) {
  return !!a && a.kind === "approval" && a.status === "decided" && a.selected_option_id === "approve";
}
function ot(a, s) {
  const l = new Set(s), o = [];
  for (const r of a ?? [])
    !l.has(r.tool_call_id) || !ct(r) || !r.tool_name || o.push({
      id: r.tool_call_id,
      name: r.tool_name,
      arguments: r.arguments || "",
      status: "completed"
    });
  return o;
}
function tn(a, s) {
  var r, u;
  const l = new Map((s ?? []).map((f) => [f.tool_call_id, f])), o = [];
  for (const f of a ?? []) {
    const _ = (r = f == null ? void 0 : f.function) == null ? void 0 : r.name;
    if (!(f != null && f.id) || !_ || lt(_))
      continue;
    const M = l.get(f.id);
    M && !ct(M) || o.push({
      id: f.id,
      name: _,
      arguments: typeof ((u = f.function) == null ? void 0 : u.arguments) == "string" ? f.function.arguments : "",
      status: "completed",
      title: f.title || void 0
    });
  }
  return o;
}
function nn(a) {
  var l, o;
  const s = [];
  for (const r of a ?? []) {
    const u = (l = r == null ? void 0 : r.function) == null ? void 0 : l.name;
    if (!(r != null && r.id) || !u || lt(u))
      continue;
    const f = r.status === "pending" || r.status === "running" || r.status === "failed" || r.status === "completed" ? r.status : "running";
    s.push({
      id: r.id,
      name: u,
      arguments: typeof ((o = r.function) == null ? void 0 : o.arguments) == "string" ? r.function.arguments : "",
      status: f,
      title: r.title || void 0
    });
  }
  return s;
}
function _e(a, s) {
  const l = [...a ?? []];
  for (const o of s) {
    const r = l.findIndex((u) => u.id === o.id);
    r >= 0 ? l[r] = {
      ...l[r],
      ...o,
      arguments: o.arguments || l[r].arguments,
      title: o.title || l[r].title
    } : l.push(o);
  }
  return l;
}
function sn(a, s) {
  if (!(a != null && a.length) || !(s != null && s.length))
    return a;
  const l = new Set(s.map((r) => r.tool_call_id)), o = a.filter((r) => !l.has(r.id));
  return o.length > 0 ? o : void 0;
}
let ie = !1;
const ut = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChunk: (a) => {
  }
};
function on(a, s, l) {
  a(s, (o) => {
    var r;
    return {
      message: {
        ...o.message,
        hitlCards: (r = o.message.hitlCards) == null ? void 0 : r.map((u) => l.includes(u.tool_call_id) && u.status !== "abandoned" ? { ...u, status: "pending", selected_option_id: "" } : u)
      }
    };
  });
}
class an extends Error {
  constructor(l, o) {
    super(l);
    $e(this, "buffer");
    this.buffer = o;
  }
}
function rn(a) {
  if (a == null || typeof a != "object")
    return !1;
  const s = a;
  if (s.name === "AbortError")
    return !0;
  const l = typeof s.message == "string" ? s.message : "";
  return /aborted/i.test(l) || /BodyStreamBuffer/i.test(l);
}
class ln extends Ot {
  constructor() {
    super(...arguments);
    $e(this, "conversationKey", "");
  }
  transformParams(l, o) {
    if (typeof l != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(o == null ? void 0 : o.params) || {},
      ...l || {}
    };
  }
  transformLocalMessage({ content: l }) {
    return {
      content: l,
      role: "user"
    };
  }
  transformMessage(l) {
    const { originMessage: o, chunk: r, status: u } = l || {};
    if (!r)
      return {
        ...o,
        content: (o == null ? void 0 : o.content) || "",
        role: "assistant",
        status: u
      };
    u === "updating" && ut.onChunk(this.conversationKey);
    let f;
    try {
      f = JSON.parse(r.data);
    } catch {
      return {
        ...o,
        content: (o == null ? void 0 : o.content) || "",
        role: "assistant",
        status: u
      };
    }
    const _ = f.message_id === (o == null ? void 0 : o.messageId) ? `${(o == null ? void 0 : o.content) || ""}${f.content || ""}` : f.content || "";
    switch (f.event_type) {
      case "tool_call":
        return {
          ...o,
          content: _,
          role: "assistant",
          messageId: f.message_id,
          toolCalls: ie ? _e(o == null ? void 0 : o.toolCalls, nn(f.tool_calls)) : o == null ? void 0 : o.toolCalls,
          status: u
        };
      case "content":
        return {
          ...o,
          content: _,
          role: "assistant",
          messageId: f.message_id,
          status: u
        };
      case "error":
        return {
          ...o,
          content: _,
          role: "assistant",
          error: f.content,
          messageId: f.message_id,
          status: u
        };
      case "client_tool_pending":
        return {
          ...o,
          content: _ || "",
          role: "assistant",
          pendingClientToolCalls: f.client_tool_calls,
          messageId: f.message_id,
          status: u
        };
      case "hitl_pending":
        return {
          ...o,
          content: _ || "",
          role: "assistant",
          pendingClientToolCalls: f.client_tool_calls,
          hitlCards: f.hitl_cards,
          toolCalls: sn(o == null ? void 0 : o.toolCalls, f.hitl_cards),
          messageId: f.message_id,
          status: u
        };
      default:
        return {
          ...o,
          content: _ || (o == null ? void 0 : o.content) || "",
          role: "assistant",
          messageId: f.message_id || (o == null ? void 0 : o.messageId),
          status: u
        };
    }
  }
}
const at = /* @__PURE__ */ new Map(), cn = (a) => {
  let s = at.get(a);
  return s || (s = new ln({
    request: Bt(
      `/api/ai/chat/sessions/${a}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (l, o) => {
            const r = localStorage.getItem("orgID"), { sessionId: u } = o.params ?? {}, f = {
              ...o.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...r ? { "X-Scope-OrgID": r } : {}
            };
            return [u ? `/api/ai/chat/sessions/${u}` : l, { ...o, headers: f }];
          }
        }
      }
    )
  }), at.set(a, s)), s.conversationKey = a, s;
}, un = (a) => {
  var r;
  const { className: s, children: l } = a, o = ((r = s == null ? void 0 : s.match(/language-(\w+)/)) == null ? void 0 : r[1]) || "";
  return typeof l != "string" ? null : o === "mermaid" ? /* @__PURE__ */ c.jsx($t, { children: l }) : /* @__PURE__ */ c.jsx("code", { className: "ant-highlightCode-code", children: /* @__PURE__ */ c.jsx(Pt, { lang: o, children: l }) });
}, dn = Xt.createContext({});
function ve(a) {
  if (!a || a.length === 0)
    return [];
  const s = /* @__PURE__ */ new Set(), l = [];
  for (const o of a) {
    const r = o.trim();
    !r || s.has(r) || (s.add(r), l.push(r));
  }
  return l;
}
const fn = ({
  bubble: a = {},
  messages: s,
  loading: l,
  layout: o = "classic",
  onSendMessage: r,
  hitlSubmitting: u,
  onHITLSelect: f,
  showToolCalls: _ = !1
}) => {
  const { styles: M } = rt(), { isDarkMode: je } = Mt(), [H, de] = Z({}), ee = ue(() => {
    if (!a.components) return { code: un };
    const p = {};
    for (const C in a.components) {
      const $ = a.components[C];
      if (typeof $ == "string") {
        p[C] = $;
        continue;
      }
      p[C] = (X) => /* @__PURE__ */ c.jsx(
        $,
        {
          ...X,
          onSendMessage: r
        }
      );
    }
    return p;
  }, [r, a.components]), {
    contentRender: B = (p) => p ? /* @__PURE__ */ c.jsx(
      Qe,
      {
        paragraphTag: "div",
        content: p,
        className: je ? "x-markdown-dark" : "x-markdown-light",
        components: ee
      }
    ) : null,
    footerRender: O = ({ message: p }) => {
      if (p.error)
        return /* @__PURE__ */ c.jsx("div", { children: /* @__PURE__ */ c.jsx(Qe, { content: p.error, components: ee }) });
    }
  } = a, k = ue(() => (s || []).map((p) => {
    const C = ke(p.message.hitlCards);
    return {
      ...p.message,
      key: p.id,
      // Stretch the bubble so live SSE cards match history width. Hide an empty content shell.
      ...C.length ? {
        variant: "borderless",
        styles: {
          ...p.message.content ? {} : { content: { display: "none" } },
          body: { width: "100%", maxWidth: "100%" },
          footer: { width: "100%" }
        }
      } : {},
      contentRender: B,
      footer: ($, X) => {
        const V = O == null ? void 0 : O(p, X, r), J = _ && p.message.role === "assistant" ? p.message.toolCalls ?? [] : [], h = p.message.content || "", G = p.status === "loading" || p.status === "updating", te = h || J.length > 0 ? /* @__PURE__ */ c.jsx(
          Yt,
          {
            text: h,
            tools: J,
            live: G,
            align: p.message.role === "user" ? "end" : "start"
          },
          G ? "live" : "settled"
        ) : null;
        if (!C.length)
          return !te && !V ? void 0 : /* @__PURE__ */ c.jsxs(ce, { vertical: !0, gap: 8, style: { width: J.length > 0 ? "100%" : void 0 }, children: [
            te,
            V
          ] });
        const fe = (u == null ? void 0 : u.messageId) === p.id;
        return /* @__PURE__ */ c.jsxs(ce, { className: "hitl-card-stack", vertical: !0, gap: 8, style: { width: "100%" }, children: [
          te,
          V || null,
          C.map((R) => {
            const P = `${p.id}:${R.tool_call_id}`, ne = H[P] || R.selected_option_id;
            return /* @__PURE__ */ c.jsx(
              Qt,
              {
                card: ne && ne !== R.selected_option_id ? { ...R, selected_option_id: ne } : R,
                submitting: fe,
                onSelect: fe ? void 0 : (me) => {
                  de((W) => ({ ...W, [P]: me })), f == null || f(p.id, R.tool_call_id, me);
                }
              },
              R.tool_call_id
            );
          })
        ] });
      }
    };
  }).filter((p) => {
    var C;
    return p.content || ke(p.hitlCards).length || _ && (((C = p.toolCalls) == null ? void 0 : C.length) ?? 0) > 0;
  }), [s, B, O, r, u, f, H, _]);
  return /* @__PURE__ */ c.jsx("div", { className: M.chatList, children: /* @__PURE__ */ c.jsx(le, { spinning: l, children: /* @__PURE__ */ c.jsx(
    Nt.List,
    {
      items: k,
      style: {
        height: "100%",
        paddingInline: o === "classic" ? "calc(calc(100% - 700px) /2)" : "20px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ c.jsx(le, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ c.jsx(le, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) });
}, An = ({
  bubble: a = {},
  ephemeralSystemPrompts: s,
  clientTools: l,
  defaultSkillDomains: o
}) => {
  const {
    layout: r,
    setVisible: u,
    setLayout: f,
    onCallAI: _,
    activeConversationKey: M,
    setActiveConversationKey: je,
    conversations: H,
    fetchConversationsLoading: de,
    getEphemeralSystemPrompts: ee,
    getClientTools: B,
    registerGlobalAI: O
  } = Jt(), { t: k } = nt("ai"), { t: p } = nt("common"), { styles: C } = rt(), { siteConfig: $ } = Gt(), X = ($ == null ? void 0 : $.show_tool_calls) ?? !1;
  ie = X;
  const V = (e) => ({
    key: e.id,
    label: e.title,
    group: Pe(e.start_time).isSame(Pe(), "day") ? k("chat.today") : Pe(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: J,
    activeConversationKey: h,
    setActiveConversationKey: G,
    addConversation: te,
    setConversations: fe,
    getConversation: R,
    setConversation: P,
    removeConversation: ne,
    getMessages: me
  } = zt({
    defaultActiveConversationKey: M,
    defaultConversations: (H == null ? void 0 : H.map((e) => V(e))) || []
  });
  I(() => {
    je(h);
  }, [h]);
  const { message: W } = Vt.useApp(), [ze, qe] = Z(""), [dt, ft] = Z(!1), we = (o == null ? void 0 : o.join("\0")) ?? "", Se = ue(
    () => ve(we ? we.split("\0") : []),
    [we]
  ), Ie = (s == null ? void 0 : s.join("\0")) ?? "", Te = ue(
    () => ve(Ie ? Ie.split("\0") : []),
    [Ie]
  );
  I(() => {
    if (!(Te.length === 0 && !(l != null && l.length)))
      return O({
        ephemeralSystemPrompts: Te,
        tools: l
      });
  }, [Te, l, O]);
  const [U, Re] = Z(
    () => Se.map((e) => ({ type: "domain", value: e }))
  );
  I(() => {
    Re((e) => {
      const t = e.filter((n) => n.type === "skill");
      return [
        ...Se.map((n) => ({ type: "domain", value: n })),
        ...t
      ];
    });
  }, [Se]);
  const { data: Be } = Q(() => E.system.listSkillDomains()), { data: ge } = Q(
    () => E.system.listSkills({ current: 1, page_size: 500 })
  ), Oe = ue(() => [
    ...(Be ?? []).map((e) => ({
      skillType: "domain",
      key: e,
      label: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Ze, { children: k("chat.skillDomain", { defaultValue: "Skill domain" }) }),
        e
      ] })
    })),
    ...((ge == null ? void 0 : ge.data) ?? []).map((e) => ({
      skillType: "skill",
      key: e.id,
      label: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Ze, { children: k("chat.skill", { defaultValue: "Skill" }) }),
        e.name
      ] })
    }))
  ], [ge, Be]), [se, Ve] = Z(), { onRequest: K, messages: y, isRequesting: oe, abort: mt, onReload: gt, setMessages: Ae, setMessage: N } = qt({
    provider: cn(h),
    // every conversation has its own provider
    conversationKey: h,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: p("loading"),
      role: "assistant"
    }),
    requestFallback: (e, { error: t }) => rn(t) ? {
      content: "",
      role: "assistant"
    } : t instanceof an ? {
      content: t.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: t.message
    } : {
      content: `${t}`,
      role: "assistant"
    }
  }), z = T(() => {
    const e = {
      domains: U.filter((i) => i.type === "domain").map((i) => i.value),
      skill_ids: U.filter((i) => i.type === "skill").map((i) => i.value)
    }, t = ve(ee());
    t.length > 0 && (e.ephemeral_system_prompts = t);
    const n = B();
    return n.length > 0 && (e.client_tools = n.map((i) => ({
      name: i.name,
      description: i.description,
      parameters: i.parameters
    }))), e;
  }, [U, ee, B]), pt = L(/* @__PURE__ */ new Map()), Le = L(/* @__PURE__ */ new Map()), ae = L(h);
  ae.current = h;
  const w = L(!1), q = L(!1), He = L(0), j = L(null), A = L(null), Ke = L(() => {
  }), re = L(null), [Y, F] = Z(null);
  ut.onChunk = (e) => {
    const t = A.current;
    t && t.conversationId === e && (t.streamStarted = !0);
    const n = re.current;
    n && n.conversationId === e && (n.streamStarted = !0);
  };
  const pe = T(async (e) => {
    const t = [], n = B();
    for (const i of e) {
      if (i.name === "ui_choose")
        continue;
      const m = n.find((d) => d.name === i.name);
      if (!m) {
        t.push({
          tool_call_id: i.id,
          content: JSON.stringify({
            error: `Client tool "${i.name}" is not available on the current page`,
            available_tools: n.map((d) => d.name)
          })
        });
        continue;
      }
      try {
        const d = await Promise.resolve(m.handler(i.arguments));
        t.push({ tool_call_id: i.id, content: d != null && d.trim() ? d : JSON.stringify({ ok: !0 }) });
      } catch (d) {
        const g = d instanceof Error ? d.message : String(d);
        t.push({
          tool_call_id: i.id,
          content: JSON.stringify({ error: g })
        });
      }
    }
    return t;
  }, [B]), he = T((e, t) => {
    const n = Le.current.get(e);
    if (n && n.calls === t)
      return n.promise;
    const i = pe(t);
    return Le.current.set(e, { calls: t, promise: i }), i;
  }, [pe]), be = T((e) => {
    e && Le.current.delete(e);
  }, []), Ee = T(async (e) => {
    if (e.filter((i) => i.name !== "ui_choose").length === 0)
      return;
    const n = await pe(e);
    K({
      content: "",
      client_tool_results: n,
      ...z()
    });
  }, [pe, K, z]), Fe = T(() => {
    const e = j.current;
    !e || e.streamRequested || e.posted || (He.current += 1, j.current = null, w.current = !1, q.current = !1, A.current = null, F(null), e.revert());
  }, []), Me = T(async (e, t, n, i) => {
    if (w.current)
      return;
    const m = ++He.current, d = ae.current;
    if (!d) {
      F(null);
      return;
    }
    const g = n.map((v) => v.tool_call_id), b = () => on(N, e, g), x = { generation: m, streamRequested: !1, posted: !1, revert: b };
    j.current = x, w.current = !0;
    try {
      let v = [];
      if (t != null && t.length && (v = await he(d, t)), He.current !== m || ae.current !== d) {
        j.current === x && (j.current = null, w.current = !1, q.current = !1, A.current = null, F(null), b());
        return;
      }
      A.current = {
        conversationId: d,
        messageId: e,
        decisionIDs: g,
        streamStarted: !1,
        reconciling: !1,
        submit: i
      }, x.posted = !0, K({
        content: "",
        ...v.length > 0 ? { client_tool_results: v } : {},
        hitl_decisions: n,
        ...z()
      });
    } catch {
      const v = A.current;
      if (x.posted && v && j.current === x) {
        v.reconciling || (v.reconciling = !0, Ke.current(v));
        return;
      }
      A.current = null, j.current === x && (j.current = null), w.current = !1, q.current = !1, F(null), b();
    }
  }, [he, K, z, N]), ye = T(() => {
    const e = ae.current, t = Ae;
    let n = [], i;
    if (t((m) => {
      var b;
      n = [], i = (b = m[m.length - 1]) == null ? void 0 : b.id;
      let d = !1;
      const g = m.map((x) => {
        const v = x.message.hitlCards;
        return v != null && v.some((D) => D.status === "pending") ? (d = !0, n.push({ id: x.id, cards: v }), {
          ...x,
          message: {
            ...x.message,
            hitlCards: v.map((D) => D.status === "pending" ? { ...D, status: "abandoned" } : D)
          }
        }) : x;
      });
      return d ? g : m;
    }), e && n.length > 0) {
      const m = n;
      re.current = {
        conversationId: e,
        afterMessageId: i,
        streamStarted: !1,
        restore: () => {
          t((d) => d.map((g) => {
            const b = m.find((x) => x.id === g.id);
            return b ? {
              ...g,
              message: { ...g.message, hitlCards: b.cards }
            } : g;
          }));
        }
      };
    }
    F(null);
  }, [Ae]), ht = T((e, t, n) => {
    if (Y || w.current)
      return;
    let i;
    if (!N(e, (g) => {
      const b = g.message.hitlCards, x = b == null ? void 0 : b.find((S) => S.tool_call_id === t);
      if (!b || !x || x.status !== "pending")
        return {};
      const v = b.map((S) => S.tool_call_id === t ? { ...S, selected_option_id: n } : S), D = v.filter((S) => S.status === "pending");
      return D.length > 0 && D.every((S) => S.selected_option_id) && (i = {
        calls: g.message.pendingClientToolCalls,
        decisions: D.map((S) => ({
          tool_call_id: S.tool_call_id,
          option_id: S.selected_option_id
        }))
      }), {
        message: { ...g.message, hitlCards: v }
      };
    }) || !i)
      return;
    const d = { messageId: e, toolCallId: t, optionId: n };
    F(d), Me(e, i.calls, i.decisions, d);
  }, [Y, N, Me]);
  I(() => {
    const e = j.current;
    e && !e.streamRequested && Fe();
    const t = A.current;
    if (t && h === t.conversationId && !t.streamStarted) {
      w.current = !0, F(t.submit);
      return;
    }
    (!t || t.conversationId !== h) && (w.current = !1), F(null);
  }, [h, Fe]), I(() => {
    const e = j.current;
    if (oe) {
      e && (e.streamRequested = !0), (e || w.current) && (q.current = !0);
      return;
    }
    q.current && (q.current = !1, w.current = !1);
  }, [oe]);
  const Xe = T((e) => {
    e.streamStarted = !0, N(e.messageId, (t) => {
      var m;
      const n = (m = t.message.hitlCards) == null ? void 0 : m.map((d) => e.decisionIDs.includes(d.tool_call_id) && d.status === "pending" ? { ...d, status: "decided" } : d), i = ie ? ot(n, e.decisionIDs) : [];
      return {
        message: {
          ...t.message,
          hitlCards: n,
          ...i.length ? { toolCalls: _e(t.message.toolCalls, i) } : {}
        }
      };
    }), be(e.conversationId), A.current = null, j.current = null, w.current = !1, q.current = !1, F(null);
  }, [be, N]), Je = T(() => {
    A.current = null, j.current = null, w.current = !1, q.current = !1, F(null);
  }, []), De = T(async (e) => {
    let t = null;
    try {
      const n = await E.ai.getChatSession({ sessionId: e.conversationId });
      t = /* @__PURE__ */ new Map();
      for (const i of n.messages ?? [])
        for (const m of st(i.metadata) ?? [])
          t.set(m.tool_call_id, m);
    } catch {
      t = null;
    }
    if (ae.current !== e.conversationId || A.current !== e) {
      e.reconciling = !1;
      return;
    }
    N(e.messageId, (n) => {
      var d;
      const i = (d = n.message.hitlCards) == null ? void 0 : d.map((g) => {
        if (!e.decisionIDs.includes(g.tool_call_id) || g.status === "abandoned")
          return g;
        const b = t == null ? void 0 : t.get(g.tool_call_id);
        return (b == null ? void 0 : b.status) === "pending" ? { ...b, status: "pending", selected_option_id: "" } : b || { ...g, status: "decided" };
      }), m = ie ? ot(i, e.decisionIDs) : [];
      return {
        message: {
          ...n.message,
          hitlCards: i,
          ...m.length ? { toolCalls: _e(n.message.toolCalls, m) } : {}
        }
      };
    }), Je();
  }, [Je, N]);
  Ke.current = (e) => {
    De(e);
  }, I(() => {
    const e = A.current;
    if (!e || !(y != null && y.length) || h !== e.conversationId)
      return;
    const t = y.findIndex((i) => i.id === e.messageId);
    if (t < 0)
      return;
    const n = [...y.slice(t + 1)].reverse().find((i) => i.message.role === "assistant");
    if (n) {
      if (n.status === "updating" || e.streamStarted || n.status === "success") {
        Xe(e);
        return;
      }
      n.status === "loading" || n.status === "local" || e.reconciling || (e.reconciling = !0, De(e));
    }
  }, [y, h, Xe, De]), I(() => {
    const e = re.current;
    if (!e || !(y != null && y.length) || h !== e.conversationId || e.afterMessageId !== void 0 && !y.some((i) => i.id === e.afterMessageId))
      return;
    const t = e.afterMessageId === void 0 ? -1 : y.findIndex((i) => i.id === e.afterMessageId), n = [...y.slice(t + 1)].reverse().find((i) => i.message.role === "assistant");
    if (n && !((n.status === "loading" || n.status === "local") && !e.streamStarted)) {
      if (n.status === "updating" || n.status === "success" || e.streamStarted) {
        re.current = null, be(e.conversationId);
        return;
      }
      re.current = null, e.restore();
    }
  }, [y, h, be]), I(() => {
    var i;
    if (oe || !(y != null && y.length) || !h)
      return;
    const e = y[y.length - 1], t = (i = e == null ? void 0 : e.message) == null ? void 0 : i.pendingClientToolCalls;
    if (!(t != null && t.length))
      return;
    const n = pt.current;
    if (n.get(h) !== t) {
      if (n.set(h, t), it(e.message.hitlCards)) {
        t.every((m) => m.hitlFromHistory) || he(h, t);
        return;
      }
      Ee(t);
    }
  }, [oe, y, h, he, Ee]);
  const Ge = (e) => {
    if (!(!e || Y)) {
      if (!h) {
        xe(e);
        return;
      }
      ye(), K({
        content: e,
        ...z()
      });
    }
  }, { run: bt, loading: yt } = Q(async (e) => await E.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      W.error(k("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (e) => {
      var m;
      if (y && y.length > 0 && (y[y.length - 1].status === "loading" || y.length > e.messages.length))
        return;
      const t = [];
      let n = { id: "", message: { content: "", role: "assistant" }, status: "success" };
      const i = () => {
        var b;
        const d = ke(n.message.hitlCards), g = n.message.toolCalls ?? [];
        n.message.content.length === 0 && !d.length && g.length === 0 || t.push({
          id: n.id,
          message: {
            content: n.message.content,
            role: n.message.role,
            ...g.length ? { toolCalls: g } : {},
            ...d.length ? { hitlCards: d } : {},
            ...d.length && ((b = n.message.pendingClientToolCalls) != null && b.length) ? { pendingClientToolCalls: n.message.pendingClientToolCalls } : {}
          },
          status: n.status
        });
      };
      for (const d of e.messages)
        switch (d.role) {
          case "assistant":
            n.status = d.status === "completed" && n.status === "success" ? "success" : "error", n.message.role = "assistant", n.id !== d.id && d.content && (n.message.content = d.content), n.id = d.id;
            {
              const g = st(d.metadata), b = ie ? tn(d.tool_calls, g) : [];
              if (b.length && (n.message.toolCalls = _e(n.message.toolCalls, b)), g != null && g.length) {
                n.message.hitlCards = [...n.message.hitlCards ?? [], ...g];
                const x = en(d.tool_calls, g);
                x != null && x.length && (n.message.pendingClientToolCalls = [
                  ...n.message.pendingClientToolCalls ?? [],
                  ...x
                ]);
              }
            }
            break;
          case "user":
            (n.message.content.length > 0 || ke(n.message.hitlCards).length || (((m = n.message.toolCalls) == null ? void 0 : m.length) ?? 0) > 0) && (i(), n = { id: "", message: { content: "", role: "assistant" }, status: "success" }), t.push({
              id: d.id,
              message: {
                content: d.content,
                role: d.role
              },
              status: d.status === "completed" ? "success" : "error"
            });
            break;
        }
      i(), Ae(t);
    }
  }), { run: xe, loading: Ne } = Q(async (e, t, n = !1, i) => ({ session: await E.ai.createChatSession({
    title: k("chat.defaultConversationTitle"),
    model_id: "",
    messages: t || [],
    anonymous: n
  }), message: e, domains: i }), {
    manual: !0,
    onError: () => {
      W.error(k("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: ({ session: e, message: t, domains: n }) => {
      te(V(e), "prepend"), G(e.id), t && Ve({ message: t, sessionId: e.id, domains: n });
    }
  });
  I(() => {
    fe((H == null ? void 0 : H.map((e) => V(e))) || []);
  }, [H]);
  const { run: xt } = Q(async (e) => await E.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [t]) {
      W.error(k("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const n = R(t);
      n && P(t, { ...n, loading: !1 });
    },
    onSuccess(e, [t]) {
      ne(t);
    }
  }), { run: Ct } = Q(async (e) => E.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: e }, [t]) => {
      const n = R(t);
      n && P(t, { ...n, title: e, loading: !1 });
    },
    onError: (e, [t]) => {
      W.error(k("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: e.message || e }));
      const n = R(t);
      n && P(t, { ...n, loading: !1 });
    }
  });
  I(() => {
    if (h && (se == null ? void 0 : se.sessionId) === h) {
      const { message: e, domains: t } = se;
      setTimeout(() => {
        ye(), K({
          content: e,
          ...z(),
          ...t !== void 0 ? { domains: t } : {}
        });
      }, 1e3), Ve(void 0);
    }
  }, [h, se, z, ye]), I(() => {
    if (h) {
      const e = me(h);
      if (e && e.length > 0)
        return;
      bt(h);
    }
  }, [h]);
  const We = L(() => {
  });
  We.current = (e, t) => {
    const n = Wt(t), i = n.domains !== void 0 ? ve(n.domains) : void 0;
    if (i !== void 0 && Re((m) => [
      ...i.map((d) => ({ type: "domain", value: d })),
      ...m.filter((d) => d.type === "skill")
    ]), n.newSession === !1 && h) {
      if (Y)
        return;
      ye(), K({
        content: e,
        ...z(),
        ...i !== void 0 ? { domains: i } : {}
      });
      return;
    }
    xe(e, n.messages, !0, i);
  }, I(() => {
    _ && _((e, t) => {
      We.current(e, t);
    });
  }, [_]);
  const vt = /* @__PURE__ */ c.jsxs("div", { className: C.sider, children: [
    /* @__PURE__ */ c.jsx(
      Ce,
      {
        onClick: () => {
          xe();
        },
        type: "link",
        className: C.addBtn,
        icon: /* @__PURE__ */ c.jsx(Ue, {}),
        loading: Ne,
        children: k("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ c.jsx(le, { spinning: de, wrapperClassName: C.conversationsSpin, children: /* @__PURE__ */ c.jsx(
      Ft,
      {
        items: J,
        activeKey: h,
        onActiveChange: async (e) => {
          e && G(e);
        },
        className: C.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (e) => ({
          items: [
            {
              label: k("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ c.jsx(Rt, {}),
              onClick: () => {
                P(e.key, { ...e, loading: !0 }), Ct(e.key);
              }
            },
            {
              label: p("delete"),
              key: "delete",
              icon: /* @__PURE__ */ c.jsx(At, {}),
              danger: !0,
              onClick: () => {
                P(e.key, { ...e, loading: !0 }), xt(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), _t = /* @__PURE__ */ c.jsx(c.Fragment, { children: /* @__PURE__ */ c.jsx(et, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: /* @__PURE__ */ c.jsx(
    Ye,
    {
      footer: (e) => /* @__PURE__ */ c.jsxs(ce, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ c.jsx(ce, { gap: "small", align: "center", children: /* @__PURE__ */ c.jsx(
          tt,
          {
            open: dt,
            onOpenChange: (t, n) => {
              (n.source === "trigger" || t) && ft(t);
            },
            menu: {
              selectedKeys: U.map((t) => t.value),
              onClick: (t) => {
                const n = Oe.find((i) => i.key === t.key);
                Re((i) => i.some((m) => m.value === t.key) ? i.filter((m) => m.value !== t.key) : [...i, { type: (n == null ? void 0 : n.skillType) || "skill", value: t.key }]);
              },
              items: Oe.map((t) => ({
                label: t.label,
                key: t.key
              }))
            },
            children: /* @__PURE__ */ c.jsxs(Ye.Switch, { value: !1, icon: /* @__PURE__ */ c.jsx(wt, {}), children: [
              k("chat.skill", { defaultValue: "Skills" }),
              " ",
              "(",
              U.length > 0 ? k("chat.skillsSelected", { defaultValue: "{{count}} selected", count: U.length }) : k("chat.skillsOptional", { defaultValue: "optional" }),
              ")"
            ] })
          }
        ) }),
        /* @__PURE__ */ c.jsx(ce, { align: "center", children: e })
      ] }),
      suffix: !1,
      value: ze,
      onSubmit: async () => {
        Ge(ze.trim()), qe("");
      },
      onChange: qe,
      onCancel: () => {
        const e = j.current;
        if (e && !e.streamRequested) {
          Fe();
          return;
        }
        mt();
      },
      loading: oe || Y !== null,
      className: Ut(C.sender, "chat-sender"),
      placeholder: k("chat.inputPlaceholder")
    }
  ) }) });
  return /* @__PURE__ */ c.jsx(Dt, { children: /* @__PURE__ */ c.jsxs(dn.Provider, { value: { onReload: gt, setMessage: N }, children: [
    /* @__PURE__ */ c.jsxs("div", { style: { height: "50px", width: "100%", position: "relative" }, children: [
      /* @__PURE__ */ c.jsx(
        Kt.Group,
        {
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          },
          options: [
            {
              label: /* @__PURE__ */ c.jsx(St, { style: { transform: "scaleX(-1)" } }),
              value: "classic"
            },
            {
              label: /* @__PURE__ */ c.jsx(It, {}),
              value: "sidebar"
            },
            {
              label: /* @__PURE__ */ c.jsx(Tt, {}),
              value: "float-sidebar"
            }
          ],
          optionType: "button",
          onChange: (e) => f(e.target.value),
          value: r
        }
      ),
      /* @__PURE__ */ c.jsxs(et, { style: { float: "right", marginTop: 10 }, children: [
        /* @__PURE__ */ c.jsx(
          Ce,
          {
            type: "primary",
            onClick: () => {
              xe();
            },
            loading: Ne,
            icon: /* @__PURE__ */ c.jsx(Ue, {}),
            style: { display: r === "classic" ? "none" : "block" }
          }
        ),
        /* @__PURE__ */ c.jsx(
          tt,
          {
            menu: {
              items: J.map((e) => ({
                label: e.label,
                key: e.key
              })),
              onClick: ({ key: e }) => {
                G(e);
              }
            },
            placement: "bottomRight",
            children: /* @__PURE__ */ c.jsx(Ce, { icon: de ? /* @__PURE__ */ c.jsx(le, { size: "small" }) : /* @__PURE__ */ c.jsx(Lt, {}), style: { display: r === "classic" ? "none" : "block" } })
          }
        ),
        /* @__PURE__ */ c.jsx(Ce, { type: "text", onClick: () => u(!1), children: /* @__PURE__ */ c.jsx(Ht, {}) })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: r === "classic" ? C.classicLayout : C.siderLayout, style: {
      minWidth: r === "classic" ? "500px" : "400px"
    }, children: [
      r === "classic" ? vt : null,
      /* @__PURE__ */ c.jsxs("div", { className: C.chat, children: [
        /* @__PURE__ */ c.jsx(
          fn,
          {
            bubble: a,
            messages: y,
            loading: yt || Ne,
            layout: r,
            onSendMessage: Ge,
            hitlSubmitting: Y,
            onHITLSelect: ht,
            showToolCalls: X
          }
        ),
        _t
      ] })
    ] })
  ] }) });
};
export {
  An as AIChat,
  An as default
};
