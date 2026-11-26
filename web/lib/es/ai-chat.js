var St = Object.defineProperty;
var wt = (a, s, c) => s in a ? St(a, s, { enumerable: !0, configurable: !0, writable: !0, value: c }) : a[s] = c;
var $e = (a, s, c) => wt(a, typeof s != "symbol" ? s + "" : s, c);
import { j as l, k as It, l as Tt, m as Rt, n as At } from "./vendor.js";
import { a as M } from "./index.js";
import { PlusOutlined as Ye, ReloadOutlined as Lt, DeleteOutlined as Ft, HistoryOutlined as Ht, CloseOutlined as Dt } from "@ant-design/icons";
import { Conversations as Pt, Sender as Qe, XProvider as $t, Bubble as Nt, Mermaid as Vt, CodeHighlighter as zt } from "@ant-design/x";
import { useXConversations as Bt, useXChat as qt, XRequest as Ot, AbstractChatProvider as Kt } from "@ant-design/x-sdk";
import { XMarkdown as Ze } from "@ant-design/x-markdown";
import { useRequest as U } from "ahooks";
import { App as Mt, Tag as et, Button as Ce, Spin as re, Space as tt, Flex as ie, Dropdown as nt, Radio as Et, Tooltip as Ne } from "antd";
import { createStyles as Jt, useThemeMode as Wt } from "antd-style";
import Xt, { useEffect as I, useState as Y, useMemo as le, useCallback as T, useRef as A } from "react";
import { useTranslation as st } from "react-i18next";
import Ve from "dayjs";
import { d as Gt, b as Ut, n as Yt } from "./contexts.js";
import ot from "classnames";
import { C as Qt, s as Zt } from "./components.js";
import { o as en, a as tn } from "./highlighter.js";
const lt = Jt(({ token: a, css: s }) => ({
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
function ct(a) {
  return !!(a != null && a.some((s) => s.status === "pending"));
}
function ke(a) {
  return (a ?? []).filter((s) => s.status === "pending");
}
function sn(a, s) {
  var r;
  if (!ct(s))
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
function ut(a) {
  return !!a && (a === "ui_choose" || a.startsWith("ui_"));
}
function dt(a) {
  return !!a && a.kind === "approval" && a.status === "decided" && a.selected_option_id === "approve";
}
function rt(a, s) {
  const c = new Set(s), o = [];
  for (const r of a ?? [])
    !c.has(r.tool_call_id) || !dt(r) || !r.tool_name || o.push({
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
    const v = (r = f == null ? void 0 : f.function) == null ? void 0 : r.name;
    if (!(f != null && f.id) || !v || ut(v))
      continue;
    const E = c.get(f.id);
    E && !dt(E) || o.push({
      id: f.id,
      name: v,
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
    if (!(r != null && r.id) || !u || ut(u))
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
let ae = !1;
const ft = {
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
    $e(this, "buffer");
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
    $e(this, "conversationKey", "");
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
    u === "updating" && ft.onChunk(this.conversationKey);
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
    const v = f.message_id === (o == null ? void 0 : o.messageId) ? `${(o == null ? void 0 : o.content) || ""}${f.content || ""}` : f.content || "";
    switch (f.event_type) {
      case "tool_call":
        return {
          ...o,
          content: v,
          role: "assistant",
          messageId: f.message_id,
          toolCalls: ae ? _e(o == null ? void 0 : o.toolCalls, an(f.tool_calls)) : o == null ? void 0 : o.toolCalls,
          status: u
        };
      case "content":
        return {
          ...o,
          content: v,
          role: "assistant",
          messageId: f.message_id,
          status: u
        };
      case "error":
        return {
          ...o,
          content: v,
          role: "assistant",
          error: f.content,
          messageId: f.message_id,
          status: u
        };
      case "client_tool_pending":
        return {
          ...o,
          content: v || "",
          role: "assistant",
          pendingClientToolCalls: f.client_tool_calls,
          messageId: f.message_id,
          status: u
        };
      case "hitl_pending":
        return {
          ...o,
          content: v || "",
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
          content: v || (o == null ? void 0 : o.content) || "",
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
    request: Ot(
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
  const { className: s, children: c } = a, o = ((f = s == null ? void 0 : s.match(/language-(\w+)/)) == null ? void 0 : f[1]) || "", { isDarkMode: r } = Wt(), u = r ? en : tn;
  return typeof c != "string" ? null : o === "mermaid" ? /* @__PURE__ */ l.jsx(Vt, { children: c }) : /* @__PURE__ */ l.jsx(zt, { highlightProps: {
    style: {
      ...u,
      'pre[class*="language-"]': {
        ...u['pre[class*="language-"]'],
        margin: 0,
        borderRadius: 0
      }
    }
  }, lang: o, children: c });
}, pn = Xt.createContext({});
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
const gn = ({
  bubble: a = {},
  messages: s,
  loading: c,
  layout: o = "classic",
  onSendMessage: r,
  hitlSubmitting: u,
  onHITLSelect: f,
  showToolCalls: v = !1
}) => {
  const { styles: E } = lt(), [ce, H] = Y({}), Q = le(() => {
    if (!a.components) return { code: mn };
    const m = {};
    for (const k in a.components) {
      const _ = a.components[k];
      if (typeof _ == "string") {
        m[k] = _;
        continue;
      }
      m[k] = (P) => /* @__PURE__ */ l.jsx(
        _,
        {
          ...P,
          onSendMessage: r
        }
      );
    }
    return m;
  }, [r, a.components]), {
    contentRender: Z = (m, k) => m ? /* @__PURE__ */ l.jsx(
      Ze,
      {
        paragraphTag: "div",
        content: m,
        components: Q,
        ...k.role === "user" ? { config: { breaks: !0 } } : {}
      }
    ) : null,
    footerRender: D = ({ message: m }) => {
      if (m.error)
        return /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx(Ze, { content: m.error, components: Q }) });
    }
  } = a, ue = le(() => (s || []).map((m) => {
    const k = ke(m.message.hitlCards);
    return {
      ...m.message,
      key: m.id,
      // Stretch the bubble so live SSE cards match history width. Hide an empty content shell.
      ...k.length ? {
        variant: "borderless",
        styles: {
          ...m.message.content ? {} : { content: { display: "none" } },
          body: { width: "100%", maxWidth: "100%" },
          footer: { width: "100%" }
        }
      } : {},
      contentRender: (_, P) => Z(_, { ...P, role: m.message.role }, r),
      footer: (_, P) => {
        const J = D == null ? void 0 : D(m, P, r), q = v && m.message.role === "assistant" ? m.message.toolCalls ?? [] : [], ee = m.message.content || "", h = m.status === "loading" || m.status === "updating", O = ee || q.length > 0 ? /* @__PURE__ */ l.jsx(
          Qt,
          {
            text: ee,
            tools: q,
            live: h,
            align: m.message.role === "user" ? "end" : "start"
          },
          h ? "live" : "settled"
        ) : null;
        if (!k.length)
          return !O && !J ? void 0 : /* @__PURE__ */ l.jsxs(ie, { vertical: !0, gap: 8, style: { width: q.length > 0 ? "100%" : void 0 }, children: [
            O,
            J
          ] });
        const de = (u == null ? void 0 : u.messageId) === m.id;
        return /* @__PURE__ */ l.jsxs(ie, { className: "hitl-card-stack", vertical: !0, gap: 8, style: { width: "100%" }, children: [
          O,
          J || null,
          k.map(($) => {
            const W = `${m.id}:${$.tool_call_id}`, N = ce[W] || $.selected_option_id;
            return /* @__PURE__ */ l.jsx(
              Zt,
              {
                card: N && N !== $.selected_option_id ? { ...$, selected_option_id: N } : $,
                submitting: de,
                onSelect: de ? void 0 : (fe) => {
                  H((je) => ({ ...je, [W]: fe })), f == null || f(m.id, $.tool_call_id, fe);
                }
              },
              $.tool_call_id
            );
          })
        ] });
      }
    };
  }).filter((m) => {
    var k;
    return m.content || ke(m.hitlCards).length || v && (((k = m.toolCalls) == null ? void 0 : k.length) ?? 0) > 0;
  }), [s, Z, D, r, u, f, ce, v]);
  return /* @__PURE__ */ l.jsx("div", { className: E.chatList, children: /* @__PURE__ */ l.jsx(re, { spinning: c, children: /* @__PURE__ */ l.jsx(
    Nt.List,
    {
      items: ue,
      style: {
        height: "100%",
        paddingInline: o === "classic" ? "16px" : o === "float-sidebar" ? "0px" : "16px"
      },
      roles: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ l.jsx(re, { size: "small" })
        },
        user: {
          placement: "end"
        }
      },
      role: {
        assistant: {
          placement: "start",
          loadingRender: () => /* @__PURE__ */ l.jsx(re, { size: "small" })
        },
        user: {
          placement: "end"
        }
      }
    }
  ) }) });
}, Hn = ({
  bubble: a = {},
  ephemeralSystemPrompts: s,
  clientTools: c,
  defaultSkillDomains: o
}) => {
  const {
    layout: r,
    setVisible: u,
    setLayout: f,
    onCallAI: v,
    activeConversationKey: E,
    setActiveConversationKey: ce,
    conversations: H,
    fetchConversationsLoading: Q,
    getEphemeralSystemPrompts: Z,
    getClientTools: D,
    registerGlobalAI: ue
  } = Gt(), { t: m } = st("ai"), { t: k } = st("common"), { styles: _ } = lt(), { siteConfig: P } = Ut(), J = (P == null ? void 0 : P.show_tool_calls) ?? !1;
  ae = J;
  const q = (e) => ({
    key: e.id,
    label: e.title,
    group: Ve(e.start_time).isSame(Ve(), "day") ? m("chat.today") : Ve(e.start_time).format("YYYY-MM-DD")
  }), {
    conversations: ee,
    activeConversationKey: h,
    setActiveConversationKey: O,
    addConversation: de,
    setConversations: $,
    getConversation: W,
    setConversation: N,
    removeConversation: fe,
    getMessages: je
  } = Bt({
    defaultActiveConversationKey: E,
    defaultConversations: (H == null ? void 0 : H.map((e) => q(e))) || []
  });
  I(() => {
    ce(h);
  }, [h]);
  const { message: me } = Mt.useApp(), [ze, Be] = Y(""), [mt, pt] = Y(!1), Se = (o == null ? void 0 : o.join("\0")) ?? "", we = le(
    () => ve(Se ? Se.split("\0") : []),
    [Se]
  ), Ie = (s == null ? void 0 : s.join("\0")) ?? "", Te = le(
    () => ve(Ie ? Ie.split("\0") : []),
    [Ie]
  );
  I(() => {
    if (!(Te.length === 0 && !(c != null && c.length)))
      return ue({
        ephemeralSystemPrompts: Te,
        tools: c
      });
  }, [Te, c, ue]);
  const [X, Re] = Y(
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
  const { data: qe } = U(() => M.system.listSkillDomains()), { data: pe } = U(
    () => M.system.listSkills({ current: 1, page_size: 500 })
  ), Oe = le(() => [
    ...(qe ?? []).map((e) => ({
      skillType: "domain",
      key: e,
      label: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(et, { children: m("chat.skillDomain", { defaultValue: "Skill domain" }) }),
        e
      ] })
    })),
    ...((pe == null ? void 0 : pe.data) ?? []).map((e) => ({
      skillType: "skill",
      key: e.id,
      label: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(et, { children: m("chat.skill", { defaultValue: "Skill" }) }),
        e.name
      ] })
    }))
  ], [pe, qe]), [te, Ke] = Y(), { onRequest: K, messages: y, isRequesting: ne, abort: gt, onReload: ht, setMessages: Ae, setMessage: V } = qt({
    provider: fn(h),
    // every conversation has its own provider
    conversationKey: h,
    defaultMessages: [],
    requestPlaceholder: () => ({
      content: k("loading"),
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
  }), z = T(() => {
    const e = {
      domains: X.filter((i) => i.type === "domain").map((i) => i.value),
      skill_ids: X.filter((i) => i.type === "skill").map((i) => i.value)
    }, t = ve(Z());
    t.length > 0 && (e.ephemeral_system_prompts = t);
    const n = D();
    return n.length > 0 && (e.client_tools = n.map((i) => ({
      name: i.name,
      description: i.description,
      parameters: i.parameters
    }))), e;
  }, [X, Z, D]), bt = A(/* @__PURE__ */ new Map()), Le = A(/* @__PURE__ */ new Map()), se = A(h);
  se.current = h;
  const S = A(!1), B = A(!1), Fe = A(0), j = A(null), R = A(null), Me = A(() => {
  }), oe = A(null), [G, L] = Y(null);
  ft.onChunk = (e) => {
    const t = R.current;
    t && t.conversationId === e && (t.streamStarted = !0);
    const n = oe.current;
    n && n.conversationId === e && (n.streamStarted = !0);
  };
  const ge = T(async (e) => {
    const t = [], n = D();
    for (const i of e) {
      if (i.name === "ui_choose")
        continue;
      const p = n.find((d) => d.name === i.name);
      if (!p) {
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
        const d = await Promise.resolve(p.handler(i.arguments));
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
  }, [D]), he = T((e, t) => {
    const n = Le.current.get(e);
    if (n && n.calls === t)
      return n.promise;
    const i = ge(t);
    return Le.current.set(e, { calls: t, promise: i }), i;
  }, [ge]), be = T((e) => {
    e && Le.current.delete(e);
  }, []), Ee = T(async (e) => {
    if (e.filter((i) => i.name !== "ui_choose").length === 0)
      return;
    const n = await ge(e);
    K({
      content: "",
      client_tool_results: n,
      ...z()
    });
  }, [ge, K, z]), He = T(() => {
    const e = j.current;
    !e || e.streamRequested || e.posted || (Fe.current += 1, j.current = null, S.current = !1, B.current = !1, R.current = null, L(null), e.revert());
  }, []), Je = T(async (e, t, n, i) => {
    if (S.current)
      return;
    const p = ++Fe.current, d = se.current;
    if (!d) {
      L(null);
      return;
    }
    const g = n.map((C) => C.tool_call_id), b = () => ln(V, e, g), x = { generation: p, streamRequested: !1, posted: !1, revert: b };
    j.current = x, S.current = !0;
    try {
      let C = [];
      if (t != null && t.length && (C = await he(d, t)), Fe.current !== p || se.current !== d) {
        j.current === x && (j.current = null, S.current = !1, B.current = !1, R.current = null, L(null), b());
        return;
      }
      R.current = {
        conversationId: d,
        messageId: e,
        decisionIDs: g,
        streamStarted: !1,
        reconciling: !1,
        submit: i
      }, x.posted = !0, K({
        content: "",
        ...C.length > 0 ? { client_tool_results: C } : {},
        hitl_decisions: n,
        ...z()
      });
    } catch {
      const C = R.current;
      if (x.posted && C && j.current === x) {
        C.reconciling || (C.reconciling = !0, Me.current(C));
        return;
      }
      R.current = null, j.current === x && (j.current = null), S.current = !1, B.current = !1, L(null), b();
    }
  }, [he, K, z, V]), ye = T(() => {
    const e = se.current, t = Ae;
    let n = [], i;
    if (t((p) => {
      var b;
      n = [], i = (b = p[p.length - 1]) == null ? void 0 : b.id;
      let d = !1;
      const g = p.map((x) => {
        const C = x.message.hitlCards;
        return C != null && C.some((F) => F.status === "pending") ? (d = !0, n.push({ id: x.id, cards: C }), {
          ...x,
          message: {
            ...x.message,
            hitlCards: C.map((F) => F.status === "pending" ? { ...F, status: "abandoned" } : F)
          }
        }) : x;
      });
      return d ? g : p;
    }), e && n.length > 0) {
      const p = n;
      oe.current = {
        conversationId: e,
        afterMessageId: i,
        streamStarted: !1,
        restore: () => {
          t((d) => d.map((g) => {
            const b = p.find((x) => x.id === g.id);
            return b ? {
              ...g,
              message: { ...g.message, hitlCards: b.cards }
            } : g;
          }));
        }
      };
    }
    L(null);
  }, [Ae]), yt = T((e, t, n) => {
    if (G || S.current)
      return;
    let i;
    if (!V(e, (g) => {
      const b = g.message.hitlCards, x = b == null ? void 0 : b.find((w) => w.tool_call_id === t);
      if (!b || !x || x.status !== "pending")
        return {};
      const C = b.map((w) => w.tool_call_id === t ? { ...w, selected_option_id: n } : w), F = C.filter((w) => w.status === "pending");
      return F.length > 0 && F.every((w) => w.selected_option_id) && (i = {
        calls: g.message.pendingClientToolCalls,
        decisions: F.map((w) => ({
          tool_call_id: w.tool_call_id,
          option_id: w.selected_option_id
        }))
      }), {
        message: { ...g.message, hitlCards: C }
      };
    }) || !i)
      return;
    const d = { messageId: e, toolCallId: t, optionId: n };
    L(d), Je(e, i.calls, i.decisions, d);
  }, [G, V, Je]);
  I(() => {
    const e = j.current;
    e && !e.streamRequested && He();
    const t = R.current;
    if (t && h === t.conversationId && !t.streamStarted) {
      S.current = !0, L(t.submit);
      return;
    }
    (!t || t.conversationId !== h) && (S.current = !1), L(null);
  }, [h, He]), I(() => {
    const e = j.current;
    if (ne) {
      e && (e.streamRequested = !0), (e || S.current) && (B.current = !0);
      return;
    }
    B.current && (B.current = !1, S.current = !1);
  }, [ne]);
  const We = T((e) => {
    e.streamStarted = !0, V(e.messageId, (t) => {
      var p;
      const n = (p = t.message.hitlCards) == null ? void 0 : p.map((d) => e.decisionIDs.includes(d.tool_call_id) && d.status === "pending" ? { ...d, status: "decided" } : d), i = ae ? rt(n, e.decisionIDs) : [];
      return {
        message: {
          ...t.message,
          hitlCards: n,
          ...i.length ? { toolCalls: _e(t.message.toolCalls, i) } : {}
        }
      };
    }), be(e.conversationId), R.current = null, j.current = null, S.current = !1, B.current = !1, L(null);
  }, [be, V]), Xe = T(() => {
    R.current = null, j.current = null, S.current = !1, B.current = !1, L(null);
  }, []), De = T(async (e) => {
    let t = null;
    try {
      const n = await M.ai.getChatSession({ sessionId: e.conversationId });
      t = /* @__PURE__ */ new Map();
      for (const i of n.messages ?? [])
        for (const p of at(i.metadata) ?? [])
          t.set(p.tool_call_id, p);
    } catch {
      t = null;
    }
    if (se.current !== e.conversationId || R.current !== e) {
      e.reconciling = !1;
      return;
    }
    V(e.messageId, (n) => {
      var d;
      const i = (d = n.message.hitlCards) == null ? void 0 : d.map((g) => {
        if (!e.decisionIDs.includes(g.tool_call_id) || g.status === "abandoned")
          return g;
        const b = t == null ? void 0 : t.get(g.tool_call_id);
        return (b == null ? void 0 : b.status) === "pending" ? { ...b, status: "pending", selected_option_id: "" } : b || { ...g, status: "decided" };
      }), p = ae ? rt(i, e.decisionIDs) : [];
      return {
        message: {
          ...n.message,
          hitlCards: i,
          ...p.length ? { toolCalls: _e(n.message.toolCalls, p) } : {}
        }
      };
    }), Xe();
  }, [Xe, V]);
  Me.current = (e) => {
    De(e);
  }, I(() => {
    const e = R.current;
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
    const e = oe.current;
    if (!e || !(y != null && y.length) || h !== e.conversationId || e.afterMessageId !== void 0 && !y.some((i) => i.id === e.afterMessageId))
      return;
    const t = e.afterMessageId === void 0 ? -1 : y.findIndex((i) => i.id === e.afterMessageId), n = [...y.slice(t + 1)].reverse().find((i) => i.message.role === "assistant");
    if (n && !((n.status === "loading" || n.status === "local") && !e.streamStarted)) {
      if (n.status === "updating" || n.status === "success" || e.streamStarted) {
        oe.current = null, be(e.conversationId);
        return;
      }
      oe.current = null, e.restore();
    }
  }, [y, h, be]), I(() => {
    var i;
    if (ne || !(y != null && y.length) || !h)
      return;
    const e = y[y.length - 1], t = (i = e == null ? void 0 : e.message) == null ? void 0 : i.pendingClientToolCalls;
    if (!(t != null && t.length))
      return;
    const n = bt.current;
    if (n.get(h) !== t) {
      if (n.set(h, t), ct(e.message.hitlCards)) {
        t.every((p) => p.hitlFromHistory) || he(h, t);
        return;
      }
      Ee(t);
    }
  }, [ne, y, h, he, Ee]);
  const Ge = (e) => {
    if (!(!e || G)) {
      if (!h) {
        xe(e);
        return;
      }
      ye(), K({
        content: e,
        ...z()
      });
    }
  }, { run: xt, loading: Ct } = U(async (e) => await M.ai.getChatSession({ sessionId: e }), {
    manual: !0,
    onError: () => {
      me.error(m("chat.fetchConversationFailed", { defaultValue: "Failed to fetch conversation" }));
    },
    onSuccess: (e) => {
      var p;
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
              const g = at(d.metadata), b = ae ? on(d.tool_calls, g) : [];
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
            (n.message.content.length > 0 || ke(n.message.hitlCards).length || (((p = n.message.toolCalls) == null ? void 0 : p.length) ?? 0) > 0) && (i(), n = { id: "", message: { content: "", role: "assistant" }, status: "success" }), t.push({
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
  }), { run: xe, loading: Pe } = U(async (e, t, n = !1, i) => ({ session: await M.ai.createChatSession({
    title: m("chat.defaultConversationTitle"),
    model_id: "",
    messages: t || [],
    anonymous: n
  }), message: e, domains: i }), {
    manual: !0,
    onError: () => {
      me.error(m("chat.createConversationFailed", { defaultValue: "Failed to create conversation" }));
    },
    onSuccess: ({ session: e, message: t, domains: n }) => {
      de(q(e), "prepend"), O(e.id), t && Ke({ message: t, sessionId: e.id, domains: n });
    }
  });
  I(() => {
    $((H == null ? void 0 : H.map((e) => q(e))) || []);
  }, [H]);
  const { run: vt } = U(async (e) => await M.ai.deleteChatSession({ sessionId: e }), {
    manual: !0,
    onError(e, [t]) {
      me.error(m("chat.deleteConversationFailed", { defaultValue: "Failed to delete conversation" }));
      const n = W(t);
      n && N(t, { ...n, loading: !1 });
    },
    onSuccess(e, [t]) {
      fe(t);
    }
  }), { run: _t } = U(async (e) => M.ai.generateChatSessionTitle({ sessionId: e }, { title: "" }), {
    manual: !0,
    onSuccess: ({ title: e }, [t]) => {
      const n = W(t);
      n && N(t, { ...n, title: e, loading: !1 });
    },
    onError: (e, [t]) => {
      me.error(m("chat.titleGenerationFailed", { defaultValue: "Failed to generate title: {{error}}", error: e.message || e }));
      const n = W(t);
      n && N(t, { ...n, loading: !1 });
    }
  });
  I(() => {
    if (h && (te == null ? void 0 : te.sessionId) === h) {
      const { message: e, domains: t } = te;
      setTimeout(() => {
        ye(), K({
          content: e,
          ...z(),
          ...t !== void 0 ? { domains: t } : {}
        });
      }, 1e3), Ke(void 0);
    }
  }, [h, te, z, ye]), I(() => {
    if (h) {
      const e = je(h);
      if (e && e.length > 0)
        return;
      xt(h);
    }
  }, [h]);
  const Ue = A(() => {
  });
  Ue.current = (e, t) => {
    const n = Yt(t), i = n.domains !== void 0 ? ve(n.domains) : void 0;
    if (i !== void 0 && Re((p) => [
      ...i.map((d) => ({ type: "domain", value: d })),
      ...p.filter((d) => d.type === "skill")
    ]), n.newSession === !1 && h) {
      if (G)
        return;
      ye(), K({
        content: e,
        ...z(),
        ...i !== void 0 ? { domains: i } : {}
      });
      return;
    }
    xe(e, n.messages, n.anonymous ?? !0, i);
  }, I(() => {
    v && v((e, t) => {
      Ue.current(e, t);
    });
  }, [v]);
  const kt = /* @__PURE__ */ l.jsxs("div", { className: _.sider, children: [
    /* @__PURE__ */ l.jsx(
      Ce,
      {
        onClick: () => {
          xe();
        },
        type: "link",
        className: _.addBtn,
        icon: /* @__PURE__ */ l.jsx(Ye, {}),
        loading: Pe,
        children: m("chat.newConversation", { defaultValue: "New Conversation" })
      }
    ),
    /* @__PURE__ */ l.jsx(re, { spinning: Q, wrapperClassName: _.conversationsSpin, children: /* @__PURE__ */ l.jsx(
      Pt,
      {
        items: ee,
        activeKey: h,
        onActiveChange: async (e) => {
          e && O(e);
        },
        className: _.conversations,
        groupable: !0,
        styles: { item: { padding: "0 8px" } },
        menu: (e) => ({
          items: [
            {
              label: m("chat.regenerateTitle"),
              key: "regenerateTitle",
              icon: /* @__PURE__ */ l.jsx(Lt, {}),
              onClick: () => {
                N(e.key, { ...e, loading: !0 }), _t(e.key);
              }
            },
            {
              label: k("delete"),
              key: "delete",
              icon: /* @__PURE__ */ l.jsx(Ft, {}),
              danger: !0,
              onClick: () => {
                N(e.key, { ...e, loading: !0 }), vt(e.key);
              }
            }
          ]
        })
      }
    ) })
  ] }), jt = /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(tt, { direction: "vertical", style: { width: "100%", maxWidth: 700, margin: "0 auto" }, children: /* @__PURE__ */ l.jsx(
    Qe,
    {
      footer: (e) => /* @__PURE__ */ l.jsxs(ie, { justify: "space-between", align: "center", children: [
        /* @__PURE__ */ l.jsx(ie, { gap: "small", align: "center", children: /* @__PURE__ */ l.jsx(
          nt,
          {
            open: mt,
            onOpenChange: (t, n) => {
              (n.source === "trigger" || t) && pt(t);
            },
            menu: {
              selectedKeys: X.map((t) => t.value),
              onClick: (t) => {
                const n = Oe.find((i) => i.key === t.key);
                Re((i) => i.some((p) => p.value === t.key) ? i.filter((p) => p.value !== t.key) : [...i, { type: (n == null ? void 0 : n.skillType) || "skill", value: t.key }]);
              },
              items: Oe.map((t) => ({
                label: t.label,
                key: t.key
              }))
            },
            children: /* @__PURE__ */ l.jsxs(Qe.Switch, { value: !1, icon: /* @__PURE__ */ l.jsx(It, {}), children: [
              m("chat.skill", { defaultValue: "Skills" }),
              " ",
              "(",
              X.length > 0 ? m("chat.skillsSelected", { defaultValue: "{{count}} selected", count: X.length }) : m("chat.skillsOptional", { defaultValue: "optional" }),
              ")"
            ] })
          }
        ) }),
        /* @__PURE__ */ l.jsx(ie, { align: "center", children: e })
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
        gt();
      },
      loading: ne || G !== null,
      className: ot(_.sender, "chat-sender"),
      placeholder: m("chat.inputPlaceholder")
    }
  ) }) });
  return /* @__PURE__ */ l.jsx($t, { children: /* @__PURE__ */ l.jsxs(pn.Provider, { value: { onReload: ht, setMessage: V }, children: [
    /* @__PURE__ */ l.jsxs(
      "div",
      {
        className: ot(
          _.layoutSelector,
          "ai-chat-layout-selector",
          r === "float-sidebar" && _.layoutSelectorDraggable
        ),
        style: { height: "50px", width: "100%", position: "relative" },
        children: [
          /* @__PURE__ */ l.jsx(
            Et.Group,
            {
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              },
              options: [
                {
                  label: /* @__PURE__ */ l.jsx(Ne, { title: m("chat.layoutModal", { defaultValue: "Modal" }), children: /* @__PURE__ */ l.jsx("span", { children: /* @__PURE__ */ l.jsx(Tt, {}) }) }),
                  value: "classic"
                },
                {
                  label: /* @__PURE__ */ l.jsx(Ne, { title: m("chat.layoutSidebar", { defaultValue: "Sidebar" }), children: /* @__PURE__ */ l.jsx("span", { children: /* @__PURE__ */ l.jsx(Rt, {}) }) }),
                  value: "sidebar"
                },
                {
                  label: /* @__PURE__ */ l.jsx(Ne, { title: m("chat.layoutFloat", { defaultValue: "Float" }), children: /* @__PURE__ */ l.jsx("span", { children: /* @__PURE__ */ l.jsx(At, {}) }) }),
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
                loading: Pe,
                icon: /* @__PURE__ */ l.jsx(Ye, {}),
                style: { display: r === "classic" ? "none" : "block" }
              }
            ),
            /* @__PURE__ */ l.jsx(
              nt,
              {
                menu: {
                  items: ee.map((e) => ({
                    label: e.label,
                    key: e.key
                  })),
                  onClick: ({ key: e }) => {
                    O(e);
                  }
                },
                placement: "bottomRight",
                children: /* @__PURE__ */ l.jsx(Ce, { icon: Q ? /* @__PURE__ */ l.jsx(re, { size: "small" }) : /* @__PURE__ */ l.jsx(Ht, {}), style: { display: r === "classic" ? "none" : "block" } })
              }
            ),
            /* @__PURE__ */ l.jsx(Ce, { type: "text", onClick: () => u(!1), children: /* @__PURE__ */ l.jsx(Dt, {}) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ l.jsxs("div", { className: r === "classic" ? _.classicLayout : _.siderLayout, style: {
      minWidth: r === "classic" ? "500px" : "400px"
    }, children: [
      r === "classic" ? kt : null,
      /* @__PURE__ */ l.jsxs("div", { className: _.chat, children: [
        /* @__PURE__ */ l.jsx(
          gn,
          {
            bubble: a,
            messages: y,
            loading: Ct || Pe,
            layout: r,
            onSendMessage: Ge,
            hitlSubmitting: G,
            onHITLSelect: yt,
            showToolCalls: J
          }
        ),
        jt
      ] })
    ] })
  ] }) });
};
export {
  Hn as AIChat,
  Hn as default
};
