"use strict";var jt=Object.defineProperty;var vt=(a,s,c)=>s in a?jt(a,s,{enumerable:!0,configurable:!0,writable:!0,value:c}):a[s]=c;var Le=(a,s,c)=>vt(a,typeof s!="symbol"?s+"":s,c);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("./vendor.js"),z=require("./index.js"),Q=require("@ant-design/icons"),O=require("@ant-design/x"),ye=require("@ant-design/x-sdk"),Ge=require("@ant-design/x-markdown"),Z=require("ahooks"),C=require("antd"),De=require("antd-style"),m=require("react"),Ue=require("react-i18next"),Fe=require("dayjs"),He=require("./contexts.js"),Ye=require("classnames");;/* empty css              */const Qe=require("./components.js"),Ze=require("./highlighter.js"),st=De.createStyles(({token:a,css:s})=>({layoutSelector:s`
      flex: none;
    `,layoutSelectorDraggable:s`
      cursor: grab;
      touch-action: none;
    `,siderLayout:s`
      width: 100%;
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      background: ${a.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${a.fontFamily}, sans-serif;
    `,classicLayout:s`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${a.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${a.fontFamily}, sans-serif;
    `,sider:s`
      background: ${a.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,logo:s`
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
    `,addBtn:s`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,conversationsSpin:s`
      height: 100%;
      overflow-y: auto;
    `,conversations:s`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,siderFooter:s`
      border-top: 1px solid ${a.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,chat:s`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${a.paddingSM}px ${a.paddingLG}px;
      gap: 16px;
    `,chatPrompt:s`
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
    `,chatList:s`
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
    `,loadingMessage:s`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,placeholder:s`
      padding-top: 32px;
    `,skillsSelect:s`
      width: 100%;
      max-width: min(95%, 700px);
      margin: 0 20px;
    `,sender:s`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,speechButton:s`
      font-size: 18px;
      color: ${a.colorText} !important;
    `,senderPrompt:s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${a.colorText};
    `}));function _t(a){if(a==null||typeof a!="object")return;const s=a;if(typeof s.tool_call_id!="string"||s.tool_call_id===""||s.kind!=="approval"&&s.kind!=="choice"||s.status!=="pending"&&s.status!=="decided"&&s.status!=="abandoned"||typeof s.title!="string"||typeof s.tool_name!="string"||!Array.isArray(s.options))return;const c=[];for(const r of s.options){if(r==null||typeof r!="object")continue;const u=r;typeof u.id!="string"||typeof u.label!="string"||c.push({id:u.id,label:u.label,description:typeof u.description=="string"?u.description:"",primary:u.primary===!0})}let o="";if(typeof s.arguments=="string")o=s.arguments;else if(s.arguments!=null)try{o=JSON.stringify(s.arguments)}catch{o=""}return{tool_call_id:s.tool_call_id,kind:s.kind,title:s.title,tool_name:s.tool_name,arguments:o,description:"",options:c,status:s.status,selected_option_id:typeof s.selected_option_id=="string"?s.selected_option_id:""}}function et(a){const s=a;if(s==null||typeof s!="object")return;const c=s.hitl_cards;if(!Array.isArray(c))return;const o=[];for(const r of c){const u=_t(r);u&&o.push(u)}return o.length>0?o:void 0}function ot(a){return!!(a!=null&&a.some(s=>s.status==="pending"))}function Ce(a){return(a??[]).filter(s=>s.status==="pending")}function Rt(a,s){var r;if(!ot(s))return;const c=new Set(s.map(u=>u.tool_call_id)),o=[];for(const u of a??[]){const p=(r=u==null?void 0:u.function)==null?void 0:r.name;!(u!=null&&u.id)||!p||!p.startsWith("ui_")||p==="ui_choose"||c.has(u.id)||o.push({id:u.id,name:p,arguments:typeof u.function.arguments=="string"?u.function.arguments:"",hitlFromHistory:!0})}return o.length>0?o:void 0}function at(a){return!!a&&(a==="ui_choose"||a.startsWith("ui_"))}function rt(a){return!!a&&a.kind==="approval"&&a.status==="decided"&&a.selected_option_id==="approve"}function tt(a,s){const c=new Set(s),o=[];for(const r of a??[])!c.has(r.tool_call_id)||!rt(r)||!r.tool_name||o.push({id:r.tool_call_id,name:r.tool_name,arguments:r.arguments||"",status:"completed"});return o}function kt(a,s){var r,u;const c=new Map((s??[]).map(p=>[p.tool_call_id,p])),o=[];for(const p of a??[]){const k=(r=p==null?void 0:p.function)==null?void 0:r.name;if(!(p!=null&&p.id)||!k||at(k))continue;const K=c.get(p.id);K&&!rt(K)||o.push({id:p.id,name:k,arguments:typeof((u=p.function)==null?void 0:u.arguments)=="string"?p.function.arguments:"",status:"completed",title:p.title||void 0})}return o}function St(a){var c,o;const s=[];for(const r of a??[]){const u=(c=r==null?void 0:r.function)==null?void 0:c.name;if(!(r!=null&&r.id)||!u||at(u))continue;const p=r.status==="pending"||r.status==="running"||r.status==="failed"||r.status==="completed"?r.status:"running";s.push({id:r.id,name:u,arguments:typeof((o=r.function)==null?void 0:o.arguments)=="string"?r.function.arguments:"",status:p,title:r.title||void 0})}return s}function be(a,s){const c=[...a??[]];for(const o of s){const r=c.findIndex(u=>u.id===o.id);r>=0?c[r]={...c[r],...o,arguments:o.arguments||c[r].arguments,title:o.title||c[r].title}:c.push(o)}return c}function Et(a,s){if(!(a!=null&&a.length)||!(s!=null&&s.length))return a;const c=new Set(s.map(r=>r.tool_call_id)),o=a.filter(r=>!c.has(r.id));return o.length>0?o:void 0}let ie=!1;const it={onChunk:a=>{}};function wt(a,s,c){a(s,o=>{var r;return{message:{...o.message,hitlCards:(r=o.message.hitlCards)==null?void 0:r.map(u=>c.includes(u.tool_call_id)&&u.status!=="abandoned"?{...u,status:"pending",selected_option_id:""}:u)}}})}class It extends Error{constructor(c,o){super(c);Le(this,"buffer");this.buffer=o}}function Tt(a){if(a==null||typeof a!="object")return!1;const s=a;if(s.name==="AbortError")return!0;const c=typeof s.message=="string"?s.message:"";return/aborted/i.test(c)||/BodyStreamBuffer/i.test(c)}class At extends ye.AbstractChatProvider{constructor(){super(...arguments);Le(this,"conversationKey","")}transformParams(c,o){if(typeof c!="object")throw new Error("requestParams must be an object");return{...(o==null?void 0:o.params)||{},...c||{}}}transformLocalMessage({content:c}){return{content:c,role:"user"}}transformMessage(c){const{originMessage:o,chunk:r,status:u}=c||{};if(!r)return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:u};u==="updating"&&it.onChunk(this.conversationKey);let p;try{p=JSON.parse(r.data)}catch{return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:u}}const k=p.message_id===(o==null?void 0:o.messageId)?`${(o==null?void 0:o.content)||""}${p.content||""}`:p.content||"";switch(p.event_type){case"tool_call":return{...o,content:k,role:"assistant",messageId:p.message_id,toolCalls:ie?be(o==null?void 0:o.toolCalls,St(p.tool_calls)):o==null?void 0:o.toolCalls,status:u};case"content":return{...o,content:k,role:"assistant",messageId:p.message_id,status:u};case"error":return{...o,content:k,role:"assistant",error:p.content,messageId:p.message_id,status:u};case"client_tool_pending":return{...o,content:k||"",role:"assistant",pendingClientToolCalls:p.client_tool_calls,messageId:p.message_id,status:u};case"hitl_pending":return{...o,content:k||"",role:"assistant",pendingClientToolCalls:p.client_tool_calls,hitlCards:p.hitl_cards,toolCalls:Et(o==null?void 0:o.toolCalls,p.hitl_cards),messageId:p.message_id,status:u};default:return{...o,content:k||(o==null?void 0:o.content)||"",role:"assistant",messageId:p.message_id||(o==null?void 0:o.messageId),status:u}}}}const nt=new Map,qt=a=>{let s=nt.get(a);return s||(s=new At({request:ye.XRequest(`/api/ai/chat/sessions/${a}`,{manual:!0,middlewares:{onRequest:async(c,o)=>{const r=localStorage.getItem("orgID"),{sessionId:u}=o.params??{},p={...o.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...r?{"X-Scope-OrgID":r}:{}};return[u?`/api/ai/chat/sessions/${u}`:c,{...o,headers:p}]}}})}),nt.set(a,s)),s.conversationKey=a,s},Lt=a=>{var p;const{className:s,children:c}=a,o=((p=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:p[1])||"",{isDarkMode:r}=De.useThemeMode(),u=r?Ze.oneDark:Ze.oneLight;return typeof c!="string"?null:o==="mermaid"?l.jsxRuntimeExports.jsx(O.Mermaid,{children:c}):l.jsxRuntimeExports.jsx(O.CodeHighlighter,{highlightProps:{style:{...u,'pre[class*="language-"]':{...u['pre[class*="language-"]'],margin:0,borderRadius:0}}},lang:o,children:c})},Ft=m.createContext({});function xe(a){if(!a||a.length===0)return[];const s=new Set,c=[];for(const o of a){const r=o.trim();!r||s.has(r)||(s.add(r),c.push(r))}return c}const Ht=({bubble:a={},messages:s,loading:c,layout:o="classic",onSendMessage:r,hitlSubmitting:u,onHITLSelect:p,showToolCalls:k=!1})=>{const{styles:K}=st(),{isDarkMode:je}=De.useThemeMode(),[A,le]=m.useState({}),ee=m.useMemo(()=>{if(!a.components)return{code:Lt};const h={};for(const v in a.components){const H=a.components[v];if(typeof H=="string"){h[v]=H;continue}h[v]=X=>l.jsxRuntimeExports.jsx(H,{...X,onSendMessage:r})}return h},[r,a.components]),{contentRender:$=h=>h?l.jsxRuntimeExports.jsx(Ge.XMarkdown,{paragraphTag:"div",content:h,className:je?"x-markdown-dark":"x-markdown-light",components:ee}):null,footerRender:N=({message:h})=>{if(h.error)return l.jsxRuntimeExports.jsx("div",{children:l.jsxRuntimeExports.jsx(Ge.XMarkdown,{content:h.error,components:ee})})}}=a,_=m.useMemo(()=>(s||[]).map(h=>{const v=Ce(h.message.hitlCards);return{...h.message,key:h.id,...v.length?{variant:"borderless",styles:{...h.message.content?{}:{content:{display:"none"}},body:{width:"100%",maxWidth:"100%"},footer:{width:"100%"}}}:{},contentRender:$,footer:(H,X)=>{const B=N==null?void 0:N(h,X,r),J=k&&h.message.role==="assistant"?h.message.toolCalls??[]:[],x=h.message.content||"",W=h.status==="loading"||h.status==="updating",te=x||J.length>0?l.jsxRuntimeExports.jsx(Qe.ChatMessageActions,{text:x,tools:J,live:W,align:h.message.role==="user"?"end":"start"},W?"live":"settled"):null;if(!v.length)return!te&&!B?void 0:l.jsxRuntimeExports.jsxs(C.Flex,{vertical:!0,gap:8,style:{width:J.length>0?"100%":void 0},children:[te,B]});const ce=(u==null?void 0:u.messageId)===h.id;return l.jsxRuntimeExports.jsxs(C.Flex,{className:"hitl-card-stack",vertical:!0,gap:8,style:{width:"100%"},children:[te,B||null,v.map(I=>{const D=`${h.id}:${I.tool_call_id}`,ne=A[D]||I.selected_option_id;return l.jsxRuntimeExports.jsx(Qe.HITLCard,{card:ne&&ne!==I.selected_option_id?{...I,selected_option_id:ne}:I,submitting:ce,onSelect:ce?void 0:ue=>{le(G=>({...G,[D]:ue})),p==null||p(h.id,I.tool_call_id,ue)}},I.tool_call_id)})]})}}}).filter(h=>{var v;return h.content||Ce(h.hitlCards).length||k&&(((v=h.toolCalls)==null?void 0:v.length)??0)>0}),[s,$,N,r,u,p,A,k]);return l.jsxRuntimeExports.jsx("div",{className:K.chatList,children:l.jsxRuntimeExports.jsx(C.Spin,{spinning:c,children:l.jsxRuntimeExports.jsx(O.Bubble.List,{items:_,style:{height:"100%",paddingInline:o==="classic"?"16px":o==="float-sidebar"?"0px":"16px"},roles:{assistant:{placement:"start",loadingRender:()=>l.jsxRuntimeExports.jsx(C.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>l.jsxRuntimeExports.jsx(C.Spin,{size:"small"})},user:{placement:"end"}}})})})},lt=({bubble:a={},ephemeralSystemPrompts:s,clientTools:c,defaultSkillDomains:o})=>{const{layout:r,setVisible:u,setLayout:p,onCallAI:k,activeConversationKey:K,setActiveConversationKey:je,conversations:A,fetchConversationsLoading:le,getEphemeralSystemPrompts:ee,getClientTools:$,registerGlobalAI:N}=He.useAI(),{t:_}=Ue.useTranslation("ai"),{t:h}=Ue.useTranslation("common"),{styles:v}=st(),{siteConfig:H}=He.useSite(),X=(H==null?void 0:H.show_tool_calls)??!1;ie=X;const B=e=>({key:e.id,label:e.title,group:Fe(e.start_time).isSame(Fe(),"day")?_("chat.today"):Fe(e.start_time).format("YYYY-MM-DD")}),{conversations:J,activeConversationKey:x,setActiveConversationKey:W,addConversation:te,setConversations:ce,getConversation:I,setConversation:D,removeConversation:ne,getMessages:ue}=ye.useXConversations({defaultActiveConversationKey:K,defaultConversations:(A==null?void 0:A.map(e=>B(e)))||[]});m.useEffect(()=>{je(x)},[x]);const{message:G}=C.App.useApp(),[Me,Pe]=m.useState(""),[ct,ut]=m.useState(!1),ve=(o==null?void 0:o.join("\0"))??"",_e=m.useMemo(()=>xe(ve?ve.split("\0"):[]),[ve]),Re=(s==null?void 0:s.join("\0"))??"",ke=m.useMemo(()=>xe(Re?Re.split("\0"):[]),[Re]);m.useEffect(()=>{if(!(ke.length===0&&!(c!=null&&c.length)))return N({ephemeralSystemPrompts:ke,tools:c})},[ke,c,N]);const[U,Se]=m.useState(()=>_e.map(e=>({type:"domain",value:e})));m.useEffect(()=>{Se(e=>{const t=e.filter(n=>n.type==="skill");return[..._e.map(n=>({type:"domain",value:n})),...t]})},[_e]);const{data:$e}=Z.useRequest(()=>z.api.system.listSkillDomains()),{data:de}=Z.useRequest(()=>z.api.system.listSkills({current:1,page_size:500})),Ne=m.useMemo(()=>[...($e??[]).map(e=>({skillType:"domain",key:e,label:l.jsxRuntimeExports.jsxs(l.jsxRuntimeExports.Fragment,{children:[l.jsxRuntimeExports.jsx(C.Tag,{children:_("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((de==null?void 0:de.data)??[]).map(e=>({skillType:"skill",key:e.id,label:l.jsxRuntimeExports.jsxs(l.jsxRuntimeExports.Fragment,{children:[l.jsxRuntimeExports.jsx(C.Tag,{children:_("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[de,$e]),[se,Be]=m.useState(),{onRequest:V,messages:y,isRequesting:oe,abort:dt,onReload:pt,setMessages:Ee,setMessage:F}=ye.useXChat({provider:qt(x),conversationKey:x,defaultMessages:[],requestPlaceholder:()=>({content:h("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>Tt(t)?{content:"",role:"assistant"}:t instanceof It?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),M=m.useCallback(()=>{const e={domains:U.filter(i=>i.type==="domain").map(i=>i.value),skill_ids:U.filter(i=>i.type==="skill").map(i=>i.value)},t=xe(ee());t.length>0&&(e.ephemeral_system_prompts=t);const n=$();return n.length>0&&(e.client_tools=n.map(i=>({name:i.name,description:i.description,parameters:i.parameters}))),e},[U,ee,$]),mt=m.useRef(new Map),we=m.useRef(new Map),ae=m.useRef(x);ae.current=x;const E=m.useRef(!1),P=m.useRef(!1),Ie=m.useRef(0),S=m.useRef(null),T=m.useRef(null),Ve=m.useRef(()=>{}),re=m.useRef(null),[Y,q]=m.useState(null);it.onChunk=e=>{const t=T.current;t&&t.conversationId===e&&(t.streamStarted=!0);const n=re.current;n&&n.conversationId===e&&(n.streamStarted=!0)};const pe=m.useCallback(async e=>{const t=[],n=$();for(const i of e){if(i.name==="ui_choose")continue;const f=n.find(d=>d.name===i.name);if(!f){t.push({tool_call_id:i.id,content:JSON.stringify({error:`Client tool "${i.name}" is not available on the current page`,available_tools:n.map(d=>d.name)})});continue}try{const d=await Promise.resolve(f.handler(i.arguments));t.push({tool_call_id:i.id,content:d!=null&&d.trim()?d:JSON.stringify({ok:!0})})}catch(d){const g=d instanceof Error?d.message:String(d);t.push({tool_call_id:i.id,content:JSON.stringify({error:g})})}}return t},[$]),me=m.useCallback((e,t)=>{const n=we.current.get(e);if(n&&n.calls===t)return n.promise;const i=pe(t);return we.current.set(e,{calls:t,promise:i}),i},[pe]),fe=m.useCallback(e=>{e&&we.current.delete(e)},[]),ze=m.useCallback(async e=>{if(e.filter(i=>i.name!=="ui_choose").length===0)return;const n=await pe(e);V({content:"",client_tool_results:n,...M()})},[pe,V,M]),Te=m.useCallback(()=>{const e=S.current;!e||e.streamRequested||e.posted||(Ie.current+=1,S.current=null,E.current=!1,P.current=!1,T.current=null,q(null),e.revert())},[]),Oe=m.useCallback(async(e,t,n,i)=>{if(E.current)return;const f=++Ie.current,d=ae.current;if(!d){q(null);return}const g=n.map(R=>R.tool_call_id),b=()=>wt(F,e,g),j={generation:f,streamRequested:!1,posted:!1,revert:b};S.current=j,E.current=!0;try{let R=[];if(t!=null&&t.length&&(R=await me(d,t)),Ie.current!==f||ae.current!==d){S.current===j&&(S.current=null,E.current=!1,P.current=!1,T.current=null,q(null),b());return}T.current={conversationId:d,messageId:e,decisionIDs:g,streamStarted:!1,reconciling:!1,submit:i},j.posted=!0,V({content:"",...R.length>0?{client_tool_results:R}:{},hitl_decisions:n,...M()})}catch{const R=T.current;if(j.posted&&R&&S.current===j){R.reconciling||(R.reconciling=!0,Ve.current(R));return}T.current=null,S.current===j&&(S.current=null),E.current=!1,P.current=!1,q(null),b()}},[me,V,M,F]),ge=m.useCallback(()=>{const e=ae.current,t=Ee;let n=[],i;if(t(f=>{var b;n=[],i=(b=f[f.length-1])==null?void 0:b.id;let d=!1;const g=f.map(j=>{const R=j.message.hitlCards;return R!=null&&R.some(L=>L.status==="pending")?(d=!0,n.push({id:j.id,cards:R}),{...j,message:{...j.message,hitlCards:R.map(L=>L.status==="pending"?{...L,status:"abandoned"}:L)}}):j});return d?g:f}),e&&n.length>0){const f=n;re.current={conversationId:e,afterMessageId:i,streamStarted:!1,restore:()=>{t(d=>d.map(g=>{const b=f.find(j=>j.id===g.id);return b?{...g,message:{...g.message,hitlCards:b.cards}}:g}))}}}q(null)},[Ee]),ft=m.useCallback((e,t,n)=>{if(Y||E.current)return;let i;if(!F(e,g=>{const b=g.message.hitlCards,j=b==null?void 0:b.find(w=>w.tool_call_id===t);if(!b||!j||j.status!=="pending")return{};const R=b.map(w=>w.tool_call_id===t?{...w,selected_option_id:n}:w),L=R.filter(w=>w.status==="pending");return L.length>0&&L.every(w=>w.selected_option_id)&&(i={calls:g.message.pendingClientToolCalls,decisions:L.map(w=>({tool_call_id:w.tool_call_id,option_id:w.selected_option_id}))}),{message:{...g.message,hitlCards:R}}})||!i)return;const d={messageId:e,toolCallId:t,optionId:n};q(d),Oe(e,i.calls,i.decisions,d)},[Y,F,Oe]);m.useEffect(()=>{const e=S.current;e&&!e.streamRequested&&Te();const t=T.current;if(t&&x===t.conversationId&&!t.streamStarted){E.current=!0,q(t.submit);return}(!t||t.conversationId!==x)&&(E.current=!1),q(null)},[x,Te]),m.useEffect(()=>{const e=S.current;if(oe){e&&(e.streamRequested=!0),(e||E.current)&&(P.current=!0);return}P.current&&(P.current=!1,E.current=!1)},[oe]);const Ke=m.useCallback(e=>{e.streamStarted=!0,F(e.messageId,t=>{var f;const n=(f=t.message.hitlCards)==null?void 0:f.map(d=>e.decisionIDs.includes(d.tool_call_id)&&d.status==="pending"?{...d,status:"decided"}:d),i=ie?tt(n,e.decisionIDs):[];return{message:{...t.message,hitlCards:n,...i.length?{toolCalls:be(t.message.toolCalls,i)}:{}}}}),fe(e.conversationId),T.current=null,S.current=null,E.current=!1,P.current=!1,q(null)},[fe,F]),Xe=m.useCallback(()=>{T.current=null,S.current=null,E.current=!1,P.current=!1,q(null)},[]),Ae=m.useCallback(async e=>{let t=null;try{const n=await z.api.ai.getChatSession({sessionId:e.conversationId});t=new Map;for(const i of n.messages??[])for(const f of et(i.metadata)??[])t.set(f.tool_call_id,f)}catch{t=null}if(ae.current!==e.conversationId||T.current!==e){e.reconciling=!1;return}F(e.messageId,n=>{var d;const i=(d=n.message.hitlCards)==null?void 0:d.map(g=>{if(!e.decisionIDs.includes(g.tool_call_id)||g.status==="abandoned")return g;const b=t==null?void 0:t.get(g.tool_call_id);return(b==null?void 0:b.status)==="pending"?{...b,status:"pending",selected_option_id:""}:b||{...g,status:"decided"}}),f=ie?tt(i,e.decisionIDs):[];return{message:{...n.message,hitlCards:i,...f.length?{toolCalls:be(n.message.toolCalls,f)}:{}}}}),Xe()},[Xe,F]);Ve.current=e=>{Ae(e)},m.useEffect(()=>{const e=T.current;if(!e||!(y!=null&&y.length)||x!==e.conversationId)return;const t=y.findIndex(i=>i.id===e.messageId);if(t<0)return;const n=[...y.slice(t+1)].reverse().find(i=>i.message.role==="assistant");if(n){if(n.status==="updating"||e.streamStarted||n.status==="success"){Ke(e);return}n.status==="loading"||n.status==="local"||e.reconciling||(e.reconciling=!0,Ae(e))}},[y,x,Ke,Ae]),m.useEffect(()=>{const e=re.current;if(!e||!(y!=null&&y.length)||x!==e.conversationId||e.afterMessageId!==void 0&&!y.some(i=>i.id===e.afterMessageId))return;const t=e.afterMessageId===void 0?-1:y.findIndex(i=>i.id===e.afterMessageId),n=[...y.slice(t+1)].reverse().find(i=>i.message.role==="assistant");if(n&&!((n.status==="loading"||n.status==="local")&&!e.streamStarted)){if(n.status==="updating"||n.status==="success"||e.streamStarted){re.current=null,fe(e.conversationId);return}re.current=null,e.restore()}},[y,x,fe]),m.useEffect(()=>{var i;if(oe||!(y!=null&&y.length)||!x)return;const e=y[y.length-1],t=(i=e==null?void 0:e.message)==null?void 0:i.pendingClientToolCalls;if(!(t!=null&&t.length))return;const n=mt.current;if(n.get(x)!==t){if(n.set(x,t),ot(e.message.hitlCards)){t.every(f=>f.hitlFromHistory)||me(x,t);return}ze(t)}},[oe,y,x,me,ze]);const Je=e=>{if(!(!e||Y)){if(!x){he(e);return}ge(),V({content:e,...M()})}},{run:gt,loading:ht}=Z.useRequest(async e=>await z.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{G.error(_("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{var f;if(y&&y.length>0&&(y[y.length-1].status==="loading"||y.length>e.messages.length))return;const t=[];let n={id:"",message:{content:"",role:"assistant"},status:"success"};const i=()=>{var b;const d=Ce(n.message.hitlCards),g=n.message.toolCalls??[];n.message.content.length===0&&!d.length&&g.length===0||t.push({id:n.id,message:{content:n.message.content,role:n.message.role,...g.length?{toolCalls:g}:{},...d.length?{hitlCards:d}:{},...d.length&&((b=n.message.pendingClientToolCalls)!=null&&b.length)?{pendingClientToolCalls:n.message.pendingClientToolCalls}:{}},status:n.status})};for(const d of e.messages)switch(d.role){case"assistant":n.status=d.status==="completed"&&n.status==="success"?"success":"error",n.message.role="assistant",n.id!==d.id&&d.content&&(n.message.content=d.content),n.id=d.id;{const g=et(d.metadata),b=ie?kt(d.tool_calls,g):[];if(b.length&&(n.message.toolCalls=be(n.message.toolCalls,b)),g!=null&&g.length){n.message.hitlCards=[...n.message.hitlCards??[],...g];const j=Rt(d.tool_calls,g);j!=null&&j.length&&(n.message.pendingClientToolCalls=[...n.message.pendingClientToolCalls??[],...j])}}break;case"user":(n.message.content.length>0||Ce(n.message.hitlCards).length||(((f=n.message.toolCalls)==null?void 0:f.length)??0)>0)&&(i(),n={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:d.id,message:{content:d.content,role:d.role},status:d.status==="completed"?"success":"error"});break}i(),Ee(t)}}),{run:he,loading:qe}=Z.useRequest(async(e,t,n=!1,i)=>({session:await z.api.ai.createChatSession({title:_("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:n}),message:e,domains:i}),{manual:!0,onError:()=>{G.error(_("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:({session:e,message:t,domains:n})=>{te(B(e),"prepend"),W(e.id),t&&Be({message:t,sessionId:e.id,domains:n})}});m.useEffect(()=>{ce((A==null?void 0:A.map(e=>B(e)))||[])},[A]);const{run:xt}=Z.useRequest(async e=>await z.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){G.error(_("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const n=I(t);n&&D(t,{...n,loading:!1})},onSuccess(e,[t]){ne(t)}}),{run:bt}=Z.useRequest(async e=>z.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const n=I(t);n&&D(t,{...n,title:e,loading:!1})},onError:(e,[t])=>{G.error(_("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const n=I(t);n&&D(t,{...n,loading:!1})}});m.useEffect(()=>{if(x&&(se==null?void 0:se.sessionId)===x){const{message:e,domains:t}=se;setTimeout(()=>{ge(),V({content:e,...M(),...t!==void 0?{domains:t}:{}})},1e3),Be(void 0)}},[x,se,M,ge]),m.useEffect(()=>{if(x){const e=ue(x);if(e&&e.length>0)return;gt(x)}},[x]);const We=m.useRef(()=>{});We.current=(e,t)=>{const n=He.normalizeCallAIOptions(t),i=n.domains!==void 0?xe(n.domains):void 0;if(i!==void 0&&Se(f=>[...i.map(d=>({type:"domain",value:d})),...f.filter(d=>d.type==="skill")]),n.newSession===!1&&x){if(Y)return;ge(),V({content:e,...M(),...i!==void 0?{domains:i}:{}});return}he(e,n.messages,n.anonymous??!0,i)},m.useEffect(()=>{k&&k((e,t)=>{We.current(e,t)})},[k]);const yt=l.jsxRuntimeExports.jsxs("div",{className:v.sider,children:[l.jsxRuntimeExports.jsx(C.Button,{onClick:()=>{he()},type:"link",className:v.addBtn,icon:l.jsxRuntimeExports.jsx(Q.PlusOutlined,{}),loading:qe,children:_("chat.newConversation",{defaultValue:"New Conversation"})}),l.jsxRuntimeExports.jsx(C.Spin,{spinning:le,wrapperClassName:v.conversationsSpin,children:l.jsxRuntimeExports.jsx(O.Conversations,{items:J,activeKey:x,onActiveChange:async e=>{e&&W(e)},className:v.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:_("chat.regenerateTitle"),key:"regenerateTitle",icon:l.jsxRuntimeExports.jsx(Q.ReloadOutlined,{}),onClick:()=>{D(e.key,{...e,loading:!0}),bt(e.key)}},{label:h("delete"),key:"delete",icon:l.jsxRuntimeExports.jsx(Q.DeleteOutlined,{}),danger:!0,onClick:()=>{D(e.key,{...e,loading:!0}),xt(e.key)}}]})})})]}),Ct=l.jsxRuntimeExports.jsx(l.jsxRuntimeExports.Fragment,{children:l.jsxRuntimeExports.jsx(C.Space,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:l.jsxRuntimeExports.jsx(O.Sender,{footer:e=>l.jsxRuntimeExports.jsxs(C.Flex,{justify:"space-between",align:"center",children:[l.jsxRuntimeExports.jsx(C.Flex,{gap:"small",align:"center",children:l.jsxRuntimeExports.jsx(C.Dropdown,{open:ct,onOpenChange:(t,n)=>{(n.source==="trigger"||t)&&ut(t)},menu:{selectedKeys:U.map(t=>t.value),onClick:t=>{const n=Ne.find(i=>i.key===t.key);Se(i=>i.some(f=>f.value===t.key)?i.filter(f=>f.value!==t.key):[...i,{type:(n==null?void 0:n.skillType)||"skill",value:t.key}])},items:Ne.map(t=>({label:t.label,key:t.key}))},children:l.jsxRuntimeExports.jsxs(O.Sender.Switch,{value:!1,icon:l.jsxRuntimeExports.jsx(l.LuBookOpenText,{}),children:[_("chat.skill",{defaultValue:"Skills"})," ","(",U.length>0?_("chat.skillsSelected",{defaultValue:"{{count}} selected",count:U.length}):_("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),l.jsxRuntimeExports.jsx(C.Flex,{align:"center",children:e})]}),suffix:!1,value:Me,onSubmit:async()=>{Je(Me.trim()),Pe("")},onChange:Pe,onCancel:()=>{const e=S.current;if(e&&!e.streamRequested){Te();return}dt()},loading:oe||Y!==null,className:Ye(v.sender,"chat-sender"),placeholder:_("chat.inputPlaceholder")})})});return l.jsxRuntimeExports.jsx(O.XProvider,{children:l.jsxRuntimeExports.jsxs(Ft.Provider,{value:{onReload:pt,setMessage:F},children:[l.jsxRuntimeExports.jsxs("div",{className:Ye(v.layoutSelector,"ai-chat-layout-selector",r==="float-sidebar"&&v.layoutSelectorDraggable),style:{height:"50px",width:"100%",position:"relative"},children:[l.jsxRuntimeExports.jsx(C.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:l.jsxRuntimeExports.jsx(C.Tooltip,{title:_("chat.layoutModal",{defaultValue:"Modal"}),children:l.jsxRuntimeExports.jsx("span",{children:l.jsxRuntimeExports.jsx(l.LuAppWindow,{})})}),value:"classic"},{label:l.jsxRuntimeExports.jsx(C.Tooltip,{title:_("chat.layoutSidebar",{defaultValue:"Sidebar"}),children:l.jsxRuntimeExports.jsx("span",{children:l.jsxRuntimeExports.jsx(l.LuPanelRight,{})})}),value:"sidebar"},{label:l.jsxRuntimeExports.jsx(C.Tooltip,{title:_("chat.layoutFloat",{defaultValue:"Float"}),children:l.jsxRuntimeExports.jsx("span",{children:l.jsxRuntimeExports.jsx(l.LuPictureInPicture2,{})})}),value:"float-sidebar"}],optionType:"button",onChange:e=>p(e.target.value),value:r}),l.jsxRuntimeExports.jsxs(C.Space,{style:{float:"right",marginTop:10},children:[l.jsxRuntimeExports.jsx(C.Button,{type:"primary",onClick:()=>{he()},loading:qe,icon:l.jsxRuntimeExports.jsx(Q.PlusOutlined,{}),style:{display:r==="classic"?"none":"block"}}),l.jsxRuntimeExports.jsx(C.Dropdown,{menu:{items:J.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{W(e)}},placement:"bottomRight",children:l.jsxRuntimeExports.jsx(C.Button,{icon:le?l.jsxRuntimeExports.jsx(C.Spin,{size:"small"}):l.jsxRuntimeExports.jsx(Q.HistoryOutlined,{}),style:{display:r==="classic"?"none":"block"}})}),l.jsxRuntimeExports.jsx(C.Button,{type:"text",onClick:()=>u(!1),children:l.jsxRuntimeExports.jsx(Q.CloseOutlined,{})})]})]}),l.jsxRuntimeExports.jsxs("div",{className:r==="classic"?v.classicLayout:v.siderLayout,style:{minWidth:r==="classic"?"500px":"400px"},children:[r==="classic"?yt:null,l.jsxRuntimeExports.jsxs("div",{className:v.chat,children:[l.jsxRuntimeExports.jsx(Ht,{bubble:a,messages:y,loading:ht||qe,layout:r,onSendMessage:Je,hitlSubmitting:Y,onHITLSelect:ft,showToolCalls:X}),Ct]})]})]})})};exports.AIChat=lt;exports.default=lt;
