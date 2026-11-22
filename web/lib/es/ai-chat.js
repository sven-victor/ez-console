var wt = Object.defineProperty;
var It = (a, s, c) => s in a ? wt(a, s, { enumerable: !0, configurable: !0, writable: !0, value: c }) : a[s] = c;
var Pe = (a, s, c) => It(a, typeof s != "symbol" ? s + "" : s, c);
import { j as l, k as Tt, l as Rt, m as At, n as Lt } from "./vendor.js";
import { a as K } from "./index.js";
import { PlusOutlined as Ye, ReloadOutlined as Ft, DeleteOutlined as Ht, HistoryOutlined as Dt, CloseOutlined as Nt } from "@ant-design/icons";
import { Conversations as Pt, Sender as Qe, XProvider as $t, Bubble as Vt, Mermaid as zt, CodeHighlighter as Bt } from "@ant-design/x";
import { useXConversations as qt, useXChat as Ot, XRequest as Mt, AbstractChatProvider as Kt } from "@ant-design/x-sdk";
import { XMarkdown as Ze } from "@ant-design/x-markdown";
import { useRequest as Q } from "ahooks";
import { App as Et, Tag as et, Button as Ce, Spin as le, Space as tt, Flex as ce, Dropdown as nt, Radio as Jt, Tooltip as $e } from "antd";
import { createStyles as Wt, useThemeMode as lt } from "antd-style";
import Xt, { useEffect as I, useState as Z, useMemo as ue, useCallback as T, useRef as L } from "react";
import { useTranslation as st } from "react-i18next";
import Ve from "dayjs";
import { d as Gt, b as Ut, n as Yt } from "./contexts.js";
import ot from "classnames";
/* empty css             */
import { C as Qt, s as Zt } from "./components.js";
import { o as en, a as tn } from "./highlighter.js";
const ct = Wt(({ token: a, css: s }) => ({
  layoutSelector: s`
      flex: none;
    `,
  layoutSelectorDraggable: s`
      cursor: grab;
      touch-action: none;
    `,
  siderLayout: s`
      width: 100%;
      flex: 1 1 auto;
      min-height: 0;
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
      padding-block: ${a.paddingSM}px ${a.paddingLG}px;
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
        .ant-bubble .ant-bubble-footer {
          margin-block-start: 0;
        }
        .ant-bubble{
          padding-block: 8px;
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
function nn(a) {
  if (a == null || typeof a != "object")
    return;
  const s = a;
  if (typeof s.tool_call_id != "string" || s.tool_call_id === "" || s.kind !== "approval" && s.kind !== "choice" || s.status !== "pending" && s.status !== "decided" && s.status !== "abandoned" || typeof s.title != "string" || typeof s.tool_name != "string" || !Array.isArray(s.options))
    return;
  const c = [];
  for (const r of s.options) {
    if (r == null || typeof r != "object")
      continue;
    const u = r;
    typeof u.id != "string" || typeof u.label != "string" || c.push({
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
    options: c,
    status: s.status,
    selected_option_id: typeof s.selected_option_id == "string" ? s.selected_option_id : ""
  };
}
function at(a) {
  const s = a;
  if (s == null || typeof s != "object")
    return;
  const c = s.hitl_cards;
  if (!Array.isArray(c))
    return;
  const o = [];
  for (const r of c) {
    const u = nn(r);
    u && o.push(u);
  }
  return o.length > 0 ? o : void 0;
}
function ut(a) {
  return !!(a != null && a.some((s) => s.status === "pending"));
}
function ke(a) {
  return (a ?? []).filter((s) => s.status === "pending");
}
function sn(a, s) {
  var r;
  if (!ut(s))
    return;
  const c = new Set(s.map((u) => u.tool_call_id)), o = [];
  for (const u of a ?? []) {
    const f = (r = u == null ? void 0 : u.function) == null ? void 0 : r.name;
    !(u != null && u.id) || !f || !f.startsWith("ui_") || f === "ui_choose" || c.has(u.id) || o.push({
      id: u.id,
      name: f,
      arguments: typeof u.function.arguments == "string" ? u.function.arguments : "",
      hitlFromHistory: !0
    });
  }
  return o.length > 0 ? o : void 0;
}
function dt(a) {
  return !!a && (a === "ui_choose" || a.startsWith("ui_"));
}
function ft(a) {
  return !!a && a.kind === "approval" && a.status === "decided" && a.selected_option_id === "approve";
}
function rt(a, s) {
  const c = new Set(s), o = [];
  for (const r of a ?? [])
    !c.has(r.tool_call_id) || !ft(r) || !r.tool_name || o.push({
      id: r.tool_call_id,
      name: r.tool_name,
      arguments: r.arguments || "",
      status: "completed"
    });
  return o;
}
function on(a, s) {
  var r, u;
  const c = new Map((s ?? []).map((f) => [f.tool_call_id, f])), o = [];
  for (const f of a ?? []) {
    const k = (r = f == null ? void 0 : f.function) == null ? void 0 : r.name;
    if (!(f != null && f.id) || !k || dt(k))
      continue;
    const E = c.get(f.id);
    E && !ft(E) || o.push({
      id: f.id,
      name: k,
      arguments: typeof ((u = f.function) == null ? void 0 : u.arguments) == "string" ? f.function.arguments : "",
      status: "completed",
      title: f.title || void 0
    });
  }
  return o;
}
function an(a) {
  var c, o;
  const s = [];
  for (const r of a ?? []) {
    const u = (c = r == null ? void 0 : r.function) == null ? void 0 : c.name;
    if (!(r != null && r.id) || !u || dt(u))
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
  const c = [...a ?? []];
  for (const o of s) {
    const r = c.findIndex((u) => u.id === o.id);
    r >= 0 ? c[r] = {
      ...c[r],
      ...o,
      arguments: o.arguments || c[r].arguments,
      title: o.title || c[r].title
    } : c.push(o);
  }
  return c;
}
function rn(a, s) {
  if (!(a != null && a.length) || !(s != null && s.length))
    return a;
  const c = new Set(s.map((r) => r.tool_call_id)), o = a.filter((r) => !c.has(r.id));
  return o.length > 0 ? o : void 0;
}
let ie = !1;
const mt = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChunk: (a) => {
  }
};
function ln(a, s, c) {
  a(s, (o) => {
    var r;
    return {
      message: {
        ...o.message,
        hitlCards: (r = o.message.hitlCards) == null ? void 0 : r.map((u) => c.includes(u.tool_call_id) && u.status !== "abandoned" ? { ...u, status: "pending", selected_option_id: "" } : u)
      }
    };
  });
}
class cn extends Error {
  constructor(c, o) {
    super(c);
    Pe(this, "buffer");
    this.buffer = o;
  }
}
function un(a) {
  if (a == null || typeof a != "object")
    return !1;
  const s = a;
  if (s.name === "AbortError")
    return !0;
  const c = typeof s.message == "string" ? s.message : "";
  return /aborted/i.test(c) || /BodyStreamBuffer/i.test(c);
}
class dn extends Kt {
  constructor() {
    super(...arguments);
    Pe(this, "conversationKey", "");
  }
  transformParams(c, o) {
    if (typeof c != "object")
      throw new Error("requestParams must be an object");
    return {
      ...(o == null ? void 0 : o.params) || {},
      ...c || {}
    };
  }
  transformLocalMessage({ content: c }) {
    return {
      content: c,
      role: "user"
    };
  }
  transformMessage(c) {
    const { originMessage: o, chunk: r, status: u } = c || {};
    if (!r)
      return {
        ...o,
        content: (o == null ? void 0 : o.content) || "",
        role: "assistant",
        status: u
      };
    u === "updating" && mt.onChunk(this.conversationKey);
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
    const k = f.message_id === (o == null ? void 0 : o.messageId) ? `${(o == null ? void 0 : o.content) || ""}${f.content || ""}` : f.content || "";
    switch (f.event_type) {
      case "tool_call":
        return {
          ...o,
          content: k,
          role: "assistant",
          messageId: f.message_id,
          toolCalls: ie ? _e(o == null ? void 0 : o.toolCalls, an(f.tool_calls)) : o == null ? void 0 : o.toolCalls,
          status: u
        };
      case "content":
        return {
          ...o,
          content: k,
          role: "assistant",
          messageId: f.message_id,
          status: u
        };
      case "error":
        return {
          ...o,
          content: k,
          role: "assistant",
          error: f.content,
          messageId: f.message_id,
          status: u
        };
      case "client_tool_pending":
        return {
          ...o,
          content: k || "",
          role: "assistant",
          pendingClientToolCalls: f.client_tool_calls,
          messageId: f.message_id,
          status: u
        };
      case "hitl_pending":
        return {
          ...o,
          content: k || "",
          role: "assistant",
          pendingClientToolCalls: f.client_tool_calls,
          hitlCards: f.hitl_cards,
          toolCalls: rn(o == null ? void 0 : o.toolCalls, f.hitl_cards),
          messageId: f.message_id,
          status: u
        };
      default:
        return {
          ...o,
          content: k || (o == null ? void 0 : o.content) || "",
          role: "assistant",
          messageId: f.message_id || (o == null ? void 0 : o.messageId),
          status: u
        };
    }
  }
}
const it = /* @__PURE__ */ new Map(), fn = (a) => {
  let s = it.get(a);
  return s || (s = new dn({
    request: Mt(
      `/api/ai/chat/sessions/${a}`,
      {
        manual: !0,
        middlewares: {
          onRequest: async (c, o) => {
            const r = localStorage.getItem("orgID"), { sessionId: u } = o.params ?? {}, f = {
              ...o.headers,
              "Accept-Language": localStorage.getItem("i18nextLng") || "en-US",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              ...r ? { "X-Scope-OrgID": r } : {}
            };
            return [u ? `/api/ai/chat/sessions/${u}` : c, { ...o, headers: f }];
          }
        }
      }
    )
  }), it.set(a, s)), s.conversationKey = a, s;
}, mn = (a) => {
  var f;
  const { className: s, children: c } = a, o = ((f = s == null ? void 0 : s.match(/language-(\w+)/)) == null ? void 0 : f[1]) || "", { isDarkMode: r } = lt(), u = r ? en : tn;
  return typeof c != "string" ? null : o === "mermaid" ? /* @__PURE__ */ l.jsx(zt, { children: c }) : /* @__PURE__ */ l.jsx(Bt, { highlightProps: {
    style: {
      ...u,
      'pre[class*="language-"]': {
        ...u['pre[class*="language-"]'],
        margin: 0,
        borderRadius: 0
      }
    }
  }, lang: o, children: c });
}, gn = Xt.createContext({});
function ve(a) {
  if (!a || a.length === 0)
    return [];
  const s = /* @__PURE__ */ new Set(), c = [];
  for (const o of a) {
    const r = o.trim();
    !r || s.has(r) || (s.add(r), c.push(r));
  }
  return c;
}
const pn = ({
  bubble: a = {},
  messages: s,
  loading: c,
  layout: o = "classic",
  onSendMessage: r,
  hitlSubmitting: u,
  onHITLSelect: f,
  showToolCalls: k = !1
}) => {
  const { styles: E } = ct(), { isDarkMode: je } = lt(), [F, de] = Z({}), ee = ue(() => {
    if (!a.components) return { code: mn };
    const p = {};
    for (const C in a.components) {
      const P = a.components[C];
      if (typeof P == "string") {
        p[C] = P;
        continue;
      }
      p[C] = (J) => /* @__PURE__ */ l.jsx(
        P,
        {
          ...J,
          onSendMessage: r
        }
      );
    }
    return p;
  }, [r, a.components]), {
    contentRender: B = (p) => p ? /* @__PURE__ */ l.jsx(
      Ze,
      {
        paragraphTag: "div",
        content: p,
        className: je ? "x-markdown-dark" : "x-markdown-light",
        components: ee
      }
    ) : null,
    footerRender: q = ({ message: p }) => {
      if (p.error)
        return /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx(Ze, { content: p.error, components: ee }) });
    }
  } = a, v = ue(() => (s || []).map((p) => {
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
      footer: (P, J) => {
        const O = q == null ? void 0 : q(p, J, r), W = k && p.message.role === "assistant" ? p.message.toolCalls ?? [] : [], h = p.message.content || "", X = p.status === "loading" || p.status === "updating", te = h || W.length > 0 ? /* @__PURE__ */ l.jsx(
          Qt,
          {
            text: h,
            tools: W,
            live: X,
            align: p.message.role === "user" ? "end" : "start"
          },
          X ? "live" : "settled"
        ) : null;
        if (!C.length)
          return !te && !O ? void 0 : /* @__PURE__ */ l.jsxs(ce, { vertical: !0, gap: 8, style: { width: W.length > 0 ? "100%" : void 0 }, children: [
            te,
            O
          ] });
        const fe = (u == null ? void 0 : u.messageId) === p.id;
        return /* @__PURE__ */ l.jsxs(ce, { className: "hitl-card-stack", vertical: !0, gap: 8, style: { width: "100%" }, children: [
          te,
          O || null,
          C.map((R) => {
            const $ = `${p.id}:${R.tool_call_id}`, ne = F[$] || R.selected_option_id;
            return /* @__PURE__ */ l.jsx(
              Zt,
              {
                card: ne && ne !== R.selected_option_id ? { ...R, selected_option_id: ne } : R,
                submitting: fe,
                onSelect: fe ? void 0 : (me) => {
                  de((G) => ({ ...G, [$]: me })), f == null || f(p.id, R.tool_call_id, me);
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
    return p.content || ke(p.hitlCards).length || k && (((C = p.toolCalls) == null ? void 0 : C.length) ?? 0) > 0;
  }), [s, B, q, r, u, f, F, k]);
  return /* @__PURE__ */ l.jsx("div", { className: E.chatList, children: /* @__PURE__ */ l.jsx(le, { spinning: c, children: /* @__PURE__ */ l.jsx(
    Vt.List,
    {
      items: v,
      style: {
        height: "100%",
        paddingInline: o === "classic" ? "16px" : o === "float-sidebar" ? "0px" : "16px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ l.jsx(le, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ l.jsx(le, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) });
}, Dn = ({
  bubble: a = {},
  ephemeralSystemPrompts: s,
  clientTools: c,
  defaultSkillDomains: o
}) => {
  const {
    layout: r,
    setVisible: u,
    setLayout: f,
    onCallAI: k,
    activeConversationKey: E,
    setActiveConversationKey: je,
    conversations: F,
    fetchConversationsLoading: de,
    getEphemeralSystemPrompts: ee,
    getClientTools: B,
    registerGlobalAI: q
  } = Gt(), { t: v } = st("ai"), { t: p } = st("common"), { styles: C } = ct(), { siteConfig: P } = Ut(), J = (P == null ? void 0 : P.show_tool_calls) ?? !1;
  ie = J;
  const O = (e) => ({
    key: e.id,
    label: e.title,
    group: Ve(e.start_time).isSame(Ve(), "day") ? v("chat.today") : Ve(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: W,
    activeConversationKey: h,
    setActiveConversationKey: X,
    addConversation: te,
    setConversations: fe,
    getConversation: R,
    setConversation: $,
    removeConversation: ne,
    getMessages: me
  } = qt({
    defaultActiveConversationKey: E,
    defaultConversations: (F == null ? void 0 : F.map((e) => O(e))) || []
  });
  I(() => {
    je(h);
  }, [h]);
  const { message: G } = Et.useApp(), [ze, Be] = Z(""), [gt, pt] = Z(!1), Se = (o == null ? void 0 : o.join("\0")) ?? "", we = ue(
    () => ve(Se ? Se.split("\0") : []),
    [Se]
  ), Ie = (s == null ? void 0 : s.join("\0")) ?? "", Te = ue(
    () => ve(Ie ? Ie.split("\0") : []),
    [Ie]
  );
  I(() => {
    if (!(Te.length === 0 && !(c != null && c.length)))
      return q({
        ephemeralSystemPrompts: Te,
        tools: c
      });
  }, [Te, c, q]);
  const [U, Re] = Z(
    () => we.map((e) => ({ type: "domain", value: e }))
  );
  I(() => {
    Re((e) => {
      const t = e.filter((n) => n.type === "skill");
      return [
        ...we.map((n) => ({ type: "domain", value: n })),
        ...t
      ];
    });
  }, [we]);
  const { data: qe } = Q(() => K.system.listSkillDomains()), { data: ge } = Q(
    () => K.system.listSkills({ current: 1, page_size: 500 })
  ), Oe = ue(() => [
    ...(qe ?? []).map((e) => ({
      skillType: "domain",
      key: e,
      label: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(et, { children: v("chat.skillDomain", { defaultValue: "Skill domain" }) }),
        e
      ] })
    })),
    ...((ge == null ? void 0 : ge.data) ?? []).map((e) => ({
      skillType: "skill",
      key: e.id,
      label: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(et, { children: v("chat.skill", { defaultValue: "Skill" }) }),
        e.name
      ] })
    }))
  ], [ge, qe]), [se, Me] = Z(), { onRequest: M, messages: y, isRequesting: oe, abort: ht, onReload: bt, setMessages: Ae, setMessage: N } = Ot({
    provider: fn(h),
    // every conversation has its own provider
    conversationKey: h,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: p("loading"),
      role: "assistant"
    }),
    requestFallback: (e, { error: t }) => un(t) ? {
      content: "",
      role: "assistant"
    } : t instanceof cn ? {
      content: t.buffer.join(""),
      role: "assistant",
      // TODO: show error in message list
      error: t.message
    } : {
      content: `${t}`,
      role: "assistant"
    }
  }), V = T(() => {
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
  }, [U, ee, B]), yt = L(/* @__PURE__ */ new Map()), Le = L(/* @__PURE__ */ new Map()), ae = L(h);
  ae.current = h;
  const S = L(!1), z = L(!1), Fe = L(0), j = L(null), A = L(null), Ke = L(() => {
  }), re = L(null), [Y, H] = Z(null);
  mt.onChunk = (e) => {
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
    M({
      content: "",
      client_tool_results: n,
      ...V()
    });
  }, [pe, M, V]), He = T(() => {
    const e = j.current;
    !e || e.streamRequested || e.posted || (Fe.current += 1, j.current = null, S.current = !1, z.current = !1, A.current = null, H(null), e.revert());
  }, []), Je = T(async (e, t, n, i) => {
    if (S.current)
      return;
    const m = ++Fe.current, d = ae.current;
    if (!d) {
      H(null);
      return;
    }
    const g = n.map((_) => _.tool_call_id), b = () => ln(N, e, g), x = { generation: m, streamRequested: !1, posted: !1, revert: b };
    j.current = x, S.current = !0;
    try {
      let _ = [];
      if (t != null && t.length && (_ = await he(d, t)), Fe.current !== m || ae.current !== d) {
        j.current === x && (j.current = null, S.current = !1, z.current = !1, A.current = null, H(null), b());
        return;
      }
      A.current = {
        conversationId: d,
        messageId: e,
        decisionIDs: g,
        streamStarted: !1,
        reconciling: !1,
        submit: i
      }, x.posted = !0, M({
        content: "",
        ..._.length > 0 ? { client_tool_results: _ } : {},
        hitl_decisions: n,
        ...V()
      });
    } catch {
      const _ = A.current;
      if (x.posted && _ && j.current === x) {
        _.reconciling || (_.reconciling = !0, Ke.current(_));
        return;
      }
      A.current = null, j.current === x && (j.current = null), S.current = !1, z.current = !1, H(null), b();
    }
  }, [he, M, V, N]), ye = T(() => {
    const e = ae.current, t = Ae;
    let n = [], i;
    if (t((m) => {
      var b;
      n = [], i = (b = m[m.length - 1]) == null ? void 0 : b.id;
      let d = !1;
      const g = m.map((x) => {
        const _ = x.message.hitlCards;
        return _ != null && _.some((D) => D.status === "pending") ? (d = !0, n.push({ id: x.id, cards: _ }), {
          ...x,
          message: {
            ...x.message,
            hitlCards: _.map((D) => D.status === "pending" ? { ...D, status: "abandoned" } : D)
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
    H(null);
  }, [Ae]), xt = T((e, t, n) => {
    if (Y || S.current)
      return;
    let i;
    if (!N(e, (g) => {
      const b = g.message.hitlCards, x = b == null ? void 0 : b.find((w) => w.tool_call_id === t);
      if (!b || !x || x.status !== "pending")
        return {};
      const _ = b.map((w) => w.tool_call_id === t ? { ...w, selected_option_id: n } : w), D = _.filter((w) => w.status === "pending");
      return D.length > 0 && D.every((w) => w.selected_option_id) && (i = {
        calls: g.message.pendingClientToolCalls,
        decisions: D.map((w) => ({
          tool_call_id: w.tool_call_id,
          option_id: w.selected_option_id
        }))
      }), {
        message: { ...g.message, hitlCards: _ }
      };
    }) || !i)
      return;
    const d = { messageId: e, toolCallId: t, optionId: n };
    H(d), Je(e, i.calls, i.decisions, d);
  }, [Y, N, Je]);
  I(() => {
    const e = j.current;
    e && !e.streamRequested && He();
    const t = A.current;
    if (t && h === t.conversationId && !t.streamStarted) {
      S.current = !0, H(t.submit);
      return;
    }
    (!t || t.conversationId !== h) && (S.current = !1), H(null);
  }, [h, He]), I(() => {
    const e = j.current;
    if (oe) {
      e && (e.streamRequested = !0), (e || S.current) && (z.current = !0);
      return;
    }
    z.current && (z.current = !1, S.current = !1);
  }, [oe]);
  const We = T((e) => {
    e.streamStarted = !0, N(e.messageId, (t) => {
      var m;
      const n = (m = t.message.hitlCards) == null ? void 0 : m.map((d) => e.decisionIDs.includes(d.tool_call_id) && d.status === "pending" ? { ...d, status: "decided" } : d), i = ie ? rt(n, e.decisionIDs) : [];
      return {
        message: {
          ...t.message,
          hitlCards: n,
          ...i.length ? { toolCalls: _e(t.message.toolCalls, i) } : {}
        }
      };
    }), be(e.conversationId), A.current = null, j.current = null, S.current = !1, z.current = !1, H(null);
  }, [be, N]), Xe = T(() => {
    A.current = null, j.current = null, S.current = !1, z.current = !1, H(null);
  }, []), De = T(async (e) => {
    let t = null;
    try {
      const n = await K.ai.getChatSession({ sessionId: e.conversationId });
      t = /* @__PURE__ */ new Map();
      for (const i of n.messages ?? [])
        for (const m of at(i.metadata) ?? [])
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
      }), m = ie ? rt(i, e.decisionIDs) : [];
      return {
        message: {
          ...n.message,
          hitlCards: i,
          ...m.length ? { toolCalls: _e(n.message.toolCalls, m) } : {}
        }
      };
    }), Xe();
  }, [Xe, N]);
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
        We(e);
        return;
      }
      n.status === "loading" || n.status === "local" || e.reconciling || (e.reconciling = !0, De(e));
    }
  }, [y, h, We, De]), I(() => {
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
    const n = yt.current;
    if (n.get(h) !== t) {
      if (n.set(h, t), ut(e.message.hitlCards)) {
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
      ye(), M({
        content: e,
        ...V()
      });
    }
  }, { run: Ct, loading: vt } = Q(async (e) => await K.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      G.error(v("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
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
              const g = at(d.metadata), b = ie ? on(d.tool_calls, g) : [];
              if (b.length && (n.message.toolCalls = _e(n.message.toolCalls, b)), g != null && g.length) {
                n.message.hitlCards = [...n.message.hitlCards ?? [], ...g];
                const x = sn(d.tool_calls, g);
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
  }), { run: xe, loading: Ne } = Q(async (e, t, n = !1, i) => ({ session: await K.ai.createChatSession({
    title: v("chat.defaultConversationTitle"),
    model_id: "",
    messages: t || [],
    anonymous: n
  }), message: e, domains: i }), {
    manual: !0,
    onError: () => {
      G.error(v("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: ({ session: e, message: t, domains: n }) => {
      te(O(e), "prepend"), X(e.id), t && Me({ message: t, sessionId: e.id, domains: n });
    }
  });
  I(() => {
    fe((F == null ? void 0 : F.map((e) => O(e))) || []);
  }, [F]);
  const { run: _t } = Q(async (e) => await K.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [t]) {
      G.error(v("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const n = R(t);
      n && $(t, { ...n, loading: !1 });
    },
    onSuccess(e, [t]) {
      ne(t);
    }
  }), { run: kt } = Q(async (e) => K.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: e }, [t]) => {
      const n = R(t);
      n && $(t, { ...n, title: e, loading: !1 });
    },
    onError: (e, [t]) => {
      G.error(v("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: e.message || e }));
      const n = R(t);
      n && $(t, { ...n, loading: !1 });
    }
  });
  I(() => {
    if (h && (se == null ? void 0 : se.sessionId) === h) {
      const { message: e, domains: t } = se;
      setTimeout(() => {
        ye(), M({
          content: e,
          ...V(),
          ...t !== void 0 ? { domains: t } : {}
        });
      }, 1e3), Me(void 0);
    }
  }, [h, se, V, ye]), I(() => {
    if (h) {
      const e = me(h);
      if (e && e.length > 0)
        return;
      Ct(h);
    }
  }, [h]);
  const Ue = L(() => {
  });
  Ue.current = (e, t) => {
    const n = Yt(t), i = n.domains !== void 0 ? ve(n.domains) : void 0;
    if (i !== void 0 && Re((m) => [
      ...i.map((d) => ({ type: "domain", value: d })),
      ...m.filter((d) => d.type === "skill")
    ]), n.newSession === !1 && h) {
      if (Y)
        return;
      ye(), M({
        content: e,
        ...V(),
        ...i !== void 0 ? { domains: i } : {}
      });
      return;
    }
    xe(e, n.messages, n.anonymous ?? !0, i);
  }, I(() => {
    k && k((e, t) => {
      Ue.current(e, t);
    });
  }, [k]);
  const jt = /* @__PURE__ */ l.jsxs("div", { className: C.sider, children: [
    /* @__PURE__ */ l.jsx(
      Ce,
      {
        onClick: () => {
          xe();
        },
        type: "link",
        className: C.addBtn,
        icon: /* @__PURE__ */ l.jsx(Ye, {}),
        loading: Ne,
        children: v("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ l.jsx(le, { spinning: de, wrapperClassName: C.conversationsSpin, children: /* @__PURE__ */ l.jsx(
      Pt,
      {
        items: W,
        activeKey: h,
        onActiveChange: async (e) => {
          e && X(e);
        },
        className: C.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (e) => ({
          items: [
            {
              label: v("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ l.jsx(Ft, {}),
              onClick: () => {
                $(e.key, { ...e, loading: !0 }), kt(e.key);
              }
            },
            {
              label: p("delete"),
              key: "delete",
              icon: /* @__PURE__ */ l.jsx(Ht, {}),
              danger: !0,
              onClick: () => {
                $(e.key, { ...e, loading: !0 }), _t(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), St = /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(tt, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: /* @__PURE__ */ l.jsx(
    Qe,
    {
      footer: (e) => /* @__PURE__ */ l.jsxs(ce, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ l.jsx(ce, { gap: "small", align: "center", children: /* @__PURE__ */ l.jsx(
          nt,
          {
            open: gt,
            onOpenChange: (t, n) => {
              (n.source === "trigger" || t) && pt(t);
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
            children: /* @__PURE__ */ l.jsxs(Qe.Switch, { value: !1, icon: /* @__PURE__ */ l.jsx(Tt, {}), children: [
              v("chat.skill", { defaultValue: "Skills" }),
              " ",
              "(",
              U.length > 0 ? v("chat.skillsSelected", { defaultValue: "{{count}} selected", count: U.length }) : v("chat.skillsOptional", { defaultValue: "optional" }),
              ")"
            ] })
          }
        ) }),
        /* @__PURE__ */ l.jsx(ce, { align: "center", children: e })
      ] }),
      suffix: !1,
      value: ze,
      onSubmit: async () => {
        Ge(ze.trim()), Be("");
      },
      onChange: Be,
      onCancel: () => {
        const e = j.current;
        if (e && !e.streamRequested) {
          He();
          return;
        }
        ht();
      },
      loading: oe || Y !== null,
      className: ot(C.sender, "chat-sender"),
      placeholder: v("chat.inputPlaceholder")
    }
  ) }) });
  return /* @__PURE__ */ l.jsx($t, { children: /* @__PURE__ */ l.jsxs(gn.Provider, { value: { onReload: bt, setMessage: N }, children: [
    /* @__PURE__ */ l.jsxs(
      "div",
      {
        className: ot(
          C.layoutSelector,
          "ai-chat-layout-selector",
          r === "float-sidebar" && C.layoutSelectorDraggable
        ),
        style: { height: "50px", width: "100%", position: "relative" },
        children: [
          /* @__PURE__ */ l.jsx(
            Jt.Group,
            {
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              },
              options: [
                {
                  label: /* @__PURE__ */ l.jsx($e, { title: v("chat.layoutModal", { defaultValue: "Modal" }), children: /* @__PURE__ */ l.jsx("span", { children: /* @__PURE__ */ l.jsx(Rt, {}) }) }),
                  value: "classic"
                },
                {
                  label: /* @__PURE__ */ l.jsx($e, { title: v("chat.layoutSidebar", { defaultValue: "Sidebar" }), children: /* @__PURE__ */ l.jsx("span", { children: /* @__PURE__ */ l.jsx(At, {}) }) }),
                  value: "sidebar"
                },
                {
                  label: /* @__PURE__ */ l.jsx($e, { title: v("chat.layoutFloat", { defaultValue: "Float" }), children: /* @__PURE__ */ l.jsx("span", { children: /* @__PURE__ */ l.jsx(Lt, {}) }) }),
                  value: "float-sidebar"
                }
              ],
              optionType: "button",
              onChange: (e) => f(e.target.value),
              value: r
            }
          ),
          /* @__PURE__ */ l.jsxs(tt, { style: { float: "right", marginTop: 10 }, children: [
            /* @__PURE__ */ l.jsx(
              Ce,
              {
                type: "primary",
                onClick: () => {
                  xe();
                },
                loading: Ne,
                icon: /* @__PURE__ */ l.jsx(Ye, {}),
                style: { display: r === "classic" ? "none" : "block" }
              }
            ),
            /* @__PURE__ */ l.jsx(
              nt,
              {
                menu: {
                  items: W.map((e) => ({
                    label: e.label,
                    key: e.key
                  })),
                  onClick: ({ key: e }) => {
                    X(e);
                  }
                },
                placement: "bottomRight",
                children: /* @__PURE__ */ l.jsx(Ce, { icon: de ? /* @__PURE__ */ l.jsx(le, { size: "small" }) : /* @__PURE__ */ l.jsx(Dt, {}), style: { display: r === "classic" ? "none" : "block" } })
              }
            ),
            /* @__PURE__ */ l.jsx(Ce, { type: "text", onClick: () => u(!1), children: /* @__PURE__ */ l.jsx(Nt, {}) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ l.jsxs("div", { className: r === "classic" ? C.classicLayout : C.siderLayout, style: {
      minWidth: r === "classic" ? "500px" : "400px"
    }, children: [
      r === "classic" ? jt : null,
      /* @__PURE__ */ l.jsxs("div", { className: C.chat, children: [
        /* @__PURE__ */ l.jsx(
          pn,
          {
            bubble: a,
            messages: y,
            loading: vt || Ne,
            layout: r,
            onSendMessage: Ge,
            hitlSubmitting: Y,
            onHITLSelect: xt,
            showToolCalls: J
          }
        ),
        St
      ] })
    ] })
  ] }) });
};
export {
  Dn as AIChat,
  Dn as default
};
