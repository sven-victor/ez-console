"use strict";var jt=Object.defineProperty;var vt=(a,s,u)=>s in a?jt(a,s,{enumerable:!0,configurable:!0,writable:!0,value:u}):a[s]=u;var Le=(a,s,u)=>vt(a,typeof s!="symbol"?s+"":s,u);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("./vendor.js"),z=require("./index.js"),U=require("@ant-design/icons"),O=require("@ant-design/x"),ye=require("@ant-design/x-sdk"),We=require("@ant-design/x-markdown"),Y=require("ahooks"),C=require("antd"),nt=require("antd-style"),m=require("react"),Ge=require("react-i18next"),Fe=require("dayjs"),De=require("./contexts.js"),Ue=require("classnames"),Ye=require("./components.js"),Qe=require("./highlighter.js"),st=nt.createStyles(({token:a,css:s})=>({layoutSelector:s`
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
    `}));function _t(a){if(a==null||typeof a!="object")return;const s=a;if(typeof s.tool_call_id!="string"||s.tool_call_id===""||s.kind!=="approval"&&s.kind!=="choice"||s.status!=="pending"&&s.status!=="decided"&&s.status!=="abandoned"||typeof s.title!="string"||typeof s.tool_name!="string"||!Array.isArray(s.options))return;const u=[];for(const r of s.options){if(r==null||typeof r!="object")continue;const c=r;typeof c.id!="string"||typeof c.label!="string"||u.push({id:c.id,label:c.label,description:typeof c.description=="string"?c.description:"",primary:c.primary===!0})}let o="";if(typeof s.arguments=="string")o=s.arguments;else if(s.arguments!=null)try{o=JSON.stringify(s.arguments)}catch{o=""}return{tool_call_id:s.tool_call_id,kind:s.kind,title:s.title,tool_name:s.tool_name,arguments:o,description:"",options:u,status:s.status,selected_option_id:typeof s.selected_option_id=="string"?s.selected_option_id:""}}function Ze(a){const s=a;if(s==null||typeof s!="object")return;const u=s.hitl_cards;if(!Array.isArray(u))return;const o=[];for(const r of u){const c=_t(r);c&&o.push(c)}return o.length>0?o:void 0}function ot(a){return!!(a!=null&&a.some(s=>s.status==="pending"))}function Ce(a){return(a??[]).filter(s=>s.status==="pending")}function Rt(a,s){var r;if(!ot(s))return;const u=new Set(s.map(c=>c.tool_call_id)),o=[];for(const c of a??[]){const p=(r=c==null?void 0:c.function)==null?void 0:r.name;!(c!=null&&c.id)||!p||!p.startsWith("ui_")||p==="ui_choose"||u.has(c.id)||o.push({id:c.id,name:p,arguments:typeof c.function.arguments=="string"?c.function.arguments:"",hitlFromHistory:!0})}return o.length>0?o:void 0}function at(a){return!!a&&(a==="ui_choose"||a.startsWith("ui_"))}function rt(a){return!!a&&a.kind==="approval"&&a.status==="decided"&&a.selected_option_id==="approve"}function et(a,s){const u=new Set(s),o=[];for(const r of a??[])!u.has(r.tool_call_id)||!rt(r)||!r.tool_name||o.push({id:r.tool_call_id,name:r.tool_name,arguments:r.arguments||"",status:"completed"});return o}function kt(a,s){var r,c;const u=new Map((s??[]).map(p=>[p.tool_call_id,p])),o=[];for(const p of a??[]){const _=(r=p==null?void 0:p.function)==null?void 0:r.name;if(!(p!=null&&p.id)||!_||at(_))continue;const K=u.get(p.id);K&&!rt(K)||o.push({id:p.id,name:_,arguments:typeof((c=p.function)==null?void 0:c.arguments)=="string"?p.function.arguments:"",status:"completed",title:p.title||void 0})}return o}function St(a){var u,o;const s=[];for(const r of a??[]){const c=(u=r==null?void 0:r.function)==null?void 0:u.name;if(!(r!=null&&r.id)||!c||at(c))continue;const p=r.status==="pending"||r.status==="running"||r.status==="failed"||r.status==="completed"?r.status:"running";s.push({id:r.id,name:c,arguments:typeof((o=r.function)==null?void 0:o.arguments)=="string"?r.function.arguments:"",status:p,title:r.title||void 0})}return s}function be(a,s){const u=[...a??[]];for(const o of s){const r=u.findIndex(c=>c.id===o.id);r>=0?u[r]={...u[r],...o,arguments:o.arguments||u[r].arguments,title:o.title||u[r].title}:u.push(o)}return u}function Et(a,s){if(!(a!=null&&a.length)||!(s!=null&&s.length))return a;const u=new Set(s.map(r=>r.tool_call_id)),o=a.filter(r=>!u.has(r.id));return o.length>0?o:void 0}let ae=!1;const it={onChunk:a=>{}};function wt(a,s,u){a(s,o=>{var r;return{message:{...o.message,hitlCards:(r=o.message.hitlCards)==null?void 0:r.map(c=>u.includes(c.tool_call_id)&&c.status!=="abandoned"?{...c,status:"pending",selected_option_id:""}:c)}}})}class It extends Error{constructor(u,o){super(u);Le(this,"buffer");this.buffer=o}}function Tt(a){if(a==null||typeof a!="object")return!1;const s=a;if(s.name==="AbortError")return!0;const u=typeof s.message=="string"?s.message:"";return/aborted/i.test(u)||/BodyStreamBuffer/i.test(u)}class At extends ye.AbstractChatProvider{constructor(){super(...arguments);Le(this,"conversationKey","")}transformParams(u,o){if(typeof u!="object")throw new Error("requestParams must be an object");return{...(o==null?void 0:o.params)||{},...u||{}}}transformLocalMessage({content:u}){return{content:u,role:"user"}}transformMessage(u){const{originMessage:o,chunk:r,status:c}=u||{};if(!r)return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:c};c==="updating"&&it.onChunk(this.conversationKey);let p;try{p=JSON.parse(r.data)}catch{return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:c}}const _=p.message_id===(o==null?void 0:o.messageId)?`${(o==null?void 0:o.content)||""}${p.content||""}`:p.content||"";switch(p.event_type){case"tool_call":return{...o,content:_,role:"assistant",messageId:p.message_id,toolCalls:ae?be(o==null?void 0:o.toolCalls,St(p.tool_calls)):o==null?void 0:o.toolCalls,status:c};case"content":return{...o,content:_,role:"assistant",messageId:p.message_id,status:c};case"error":return{...o,content:_,role:"assistant",error:p.content,messageId:p.message_id,status:c};case"client_tool_pending":return{...o,content:_||"",role:"assistant",pendingClientToolCalls:p.client_tool_calls,messageId:p.message_id,status:c};case"hitl_pending":return{...o,content:_||"",role:"assistant",pendingClientToolCalls:p.client_tool_calls,hitlCards:p.hitl_cards,toolCalls:Et(o==null?void 0:o.toolCalls,p.hitl_cards),messageId:p.message_id,status:c};default:return{...o,content:_||(o==null?void 0:o.content)||"",role:"assistant",messageId:p.message_id||(o==null?void 0:o.messageId),status:c}}}}const tt=new Map,qt=a=>{let s=tt.get(a);return s||(s=new At({request:ye.XRequest(`/api/ai/chat/sessions/${a}`,{manual:!0,middlewares:{onRequest:async(u,o)=>{const r=localStorage.getItem("orgID"),{sessionId:c}=o.params??{},p={...o.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...r?{"X-Scope-OrgID":r}:{}};return[c?`/api/ai/chat/sessions/${c}`:u,{...o,headers:p}]}}})}),tt.set(a,s)),s.conversationKey=a,s},Lt=a=>{var p;const{className:s,children:u}=a,o=((p=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:p[1])||"",{isDarkMode:r}=nt.useThemeMode(),c=r?Qe.oneDark:Qe.oneLight;return typeof u!="string"?null:o==="mermaid"?l.jsxRuntimeExports.jsx(O.Mermaid,{children:u}):l.jsxRuntimeExports.jsx(O.CodeHighlighter,{highlightProps:{style:{...c,'pre[class*="language-"]':{...c['pre[class*="language-"]'],margin:0,borderRadius:0}}},lang:o,children:u})},Ft=m.createContext({});function xe(a){if(!a||a.length===0)return[];const s=new Set,u=[];for(const o of a){const r=o.trim();!r||s.has(r)||(s.add(r),u.push(r))}return u}const Dt=({bubble:a={},messages:s,loading:u,layout:o="classic",onSendMessage:r,hitlSubmitting:c,onHITLSelect:p,showToolCalls:_=!1})=>{const{styles:K}=st(),[re,q]=m.useState({}),Q=m.useMemo(()=>{if(!a.components)return{code:Lt};const f={};for(const k in a.components){const R=a.components[k];if(typeof R=="string"){f[k]=R;continue}f[k]=M=>l.jsxRuntimeExports.jsx(R,{...M,onSendMessage:r})}return f},[r,a.components]),{contentRender:Z=f=>f?l.jsxRuntimeExports.jsx(We.XMarkdown,{paragraphTag:"div",content:f,components:Q}):null,footerRender:L=({message:f})=>{if(f.error)return l.jsxRuntimeExports.jsx("div",{children:l.jsxRuntimeExports.jsx(We.XMarkdown,{content:f.error,components:Q})})}}=a,ie=m.useMemo(()=>(s||[]).map(f=>{const k=Ce(f.message.hitlCards);return{...f.message,key:f.id,...k.length?{variant:"borderless",styles:{...f.message.content?{}:{content:{display:"none"}},body:{width:"100%",maxWidth:"100%"},footer:{width:"100%"}}}:{},contentRender:Z,footer:(R,M)=>{const X=L==null?void 0:L(f,M,r),B=_&&f.message.role==="assistant"?f.message.toolCalls??[]:[],ee=f.message.content||"",x=f.status==="loading"||f.status==="updating",N=ee||B.length>0?l.jsxRuntimeExports.jsx(Ye.ChatMessageActions,{text:ee,tools:B,live:x,align:f.message.role==="user"?"end":"start"},x?"live":"settled"):null;if(!k.length)return!N&&!X?void 0:l.jsxRuntimeExports.jsxs(C.Flex,{vertical:!0,gap:8,style:{width:B.length>0?"100%":void 0},children:[N,X]});const le=(c==null?void 0:c.messageId)===f.id;return l.jsxRuntimeExports.jsxs(C.Flex,{className:"hitl-card-stack",vertical:!0,gap:8,style:{width:"100%"},children:[N,X||null,k.map(F=>{const J=`${f.id}:${F.tool_call_id}`,D=re[J]||F.selected_option_id;return l.jsxRuntimeExports.jsx(Ye.HITLCard,{card:D&&D!==F.selected_option_id?{...F,selected_option_id:D}:F,submitting:le,onSelect:le?void 0:ue=>{q(je=>({...je,[J]:ue})),p==null||p(f.id,F.tool_call_id,ue)}},F.tool_call_id)})]})}}}).filter(f=>{var k;return f.content||Ce(f.hitlCards).length||_&&(((k=f.toolCalls)==null?void 0:k.length)??0)>0}),[s,Z,L,r,c,p,re,_]);return l.jsxRuntimeExports.jsx("div",{className:K.chatList,children:l.jsxRuntimeExports.jsx(C.Spin,{spinning:u,children:l.jsxRuntimeExports.jsx(O.Bubble.List,{items:ie,style:{height:"100%",paddingInline:o==="classic"?"16px":o==="float-sidebar"?"0px":"16px"},roles:{assistant:{placement:"start",loadingRender:()=>l.jsxRuntimeExports.jsx(C.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>l.jsxRuntimeExports.jsx(C.Spin,{size:"small"})},user:{placement:"end"}}})})})},lt=({bubble:a={},ephemeralSystemPrompts:s,clientTools:u,defaultSkillDomains:o})=>{const{layout:r,setVisible:c,setLayout:p,onCallAI:_,activeConversationKey:K,setActiveConversationKey:re,conversations:q,fetchConversationsLoading:Q,getEphemeralSystemPrompts:Z,getClientTools:L,registerGlobalAI:ie}=De.useAI(),{t:f}=Ge.useTranslation("ai"),{t:k}=Ge.useTranslation("common"),{styles:R}=st(),{siteConfig:M}=De.useSite(),X=(M==null?void 0:M.show_tool_calls)??!1;ae=X;const B=e=>({key:e.id,label:e.title,group:Fe(e.start_time).isSame(Fe(),"day")?f("chat.today"):Fe(e.start_time).format("YYYY-MM-DD")}),{conversations:ee,activeConversationKey:x,setActiveConversationKey:N,addConversation:le,setConversations:F,getConversation:J,setConversation:D,removeConversation:ue,getMessages:je}=ye.useXConversations({defaultActiveConversationKey:K,defaultConversations:(q==null?void 0:q.map(e=>B(e)))||[]});m.useEffect(()=>{re(x)},[x]);const{message:ce}=C.App.useApp(),[He,Pe]=m.useState(""),[ut,ct]=m.useState(!1),ve=(o==null?void 0:o.join("\0"))??"",_e=m.useMemo(()=>xe(ve?ve.split("\0"):[]),[ve]),Re=(s==null?void 0:s.join("\0"))??"",ke=m.useMemo(()=>xe(Re?Re.split("\0"):[]),[Re]);m.useEffect(()=>{if(!(ke.length===0&&!(u!=null&&u.length)))return ie({ephemeralSystemPrompts:ke,tools:u})},[ke,u,ie]);const[W,Se]=m.useState(()=>_e.map(e=>({type:"domain",value:e})));m.useEffect(()=>{Se(e=>{const t=e.filter(n=>n.type==="skill");return[..._e.map(n=>({type:"domain",value:n})),...t]})},[_e]);const{data:$e}=Y.useRequest(()=>z.api.system.listSkillDomains()),{data:de}=Y.useRequest(()=>z.api.system.listSkills({current:1,page_size:500})),Me=m.useMemo(()=>[...($e??[]).map(e=>({skillType:"domain",key:e,label:l.jsxRuntimeExports.jsxs(l.jsxRuntimeExports.Fragment,{children:[l.jsxRuntimeExports.jsx(C.Tag,{children:f("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((de==null?void 0:de.data)??[]).map(e=>({skillType:"skill",key:e.id,label:l.jsxRuntimeExports.jsxs(l.jsxRuntimeExports.Fragment,{children:[l.jsxRuntimeExports.jsx(C.Tag,{children:f("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[de,$e]),[te,Be]=m.useState(),{onRequest:V,messages:y,isRequesting:ne,abort:dt,onReload:pt,setMessages:Ee,setMessage:H}=ye.useXChat({provider:qt(x),conversationKey:x,defaultMessages:[],requestPlaceholder:()=>({content:k("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>Tt(t)?{content:"",role:"assistant"}:t instanceof It?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),P=m.useCallback(()=>{const e={domains:W.filter(i=>i.type==="domain").map(i=>i.value),skill_ids:W.filter(i=>i.type==="skill").map(i=>i.value)},t=xe(Z());t.length>0&&(e.ephemeral_system_prompts=t);const n=L();return n.length>0&&(e.client_tools=n.map(i=>({name:i.name,description:i.description,parameters:i.parameters}))),e},[W,Z,L]),mt=m.useRef(new Map),we=m.useRef(new Map),se=m.useRef(x);se.current=x;const E=m.useRef(!1),$=m.useRef(!1),Ie=m.useRef(0),S=m.useRef(null),I=m.useRef(null),Ne=m.useRef(()=>{}),oe=m.useRef(null),[G,T]=m.useState(null);it.onChunk=e=>{const t=I.current;t&&t.conversationId===e&&(t.streamStarted=!0);const n=oe.current;n&&n.conversationId===e&&(n.streamStarted=!0)};const pe=m.useCallback(async e=>{const t=[],n=L();for(const i of e){if(i.name==="ui_choose")continue;const g=n.find(d=>d.name===i.name);if(!g){t.push({tool_call_id:i.id,content:JSON.stringify({error:`Client tool "${i.name}" is not available on the current page`,available_tools:n.map(d=>d.name)})});continue}try{const d=await Promise.resolve(g.handler(i.arguments));t.push({tool_call_id:i.id,content:d!=null&&d.trim()?d:JSON.stringify({ok:!0})})}catch(d){const h=d instanceof Error?d.message:String(d);t.push({tool_call_id:i.id,content:JSON.stringify({error:h})})}}return t},[L]),me=m.useCallback((e,t)=>{const n=we.current.get(e);if(n&&n.calls===t)return n.promise;const i=pe(t);return we.current.set(e,{calls:t,promise:i}),i},[pe]),fe=m.useCallback(e=>{e&&we.current.delete(e)},[]),Ve=m.useCallback(async e=>{if(e.filter(i=>i.name!=="ui_choose").length===0)return;const n=await pe(e);V({content:"",client_tool_results:n,...P()})},[pe,V,P]),Te=m.useCallback(()=>{const e=S.current;!e||e.streamRequested||e.posted||(Ie.current+=1,S.current=null,E.current=!1,$.current=!1,I.current=null,T(null),e.revert())},[]),ze=m.useCallback(async(e,t,n,i)=>{if(E.current)return;const g=++Ie.current,d=se.current;if(!d){T(null);return}const h=n.map(v=>v.tool_call_id),b=()=>wt(H,e,h),j={generation:g,streamRequested:!1,posted:!1,revert:b};S.current=j,E.current=!0;try{let v=[];if(t!=null&&t.length&&(v=await me(d,t)),Ie.current!==g||se.current!==d){S.current===j&&(S.current=null,E.current=!1,$.current=!1,I.current=null,T(null),b());return}I.current={conversationId:d,messageId:e,decisionIDs:h,streamStarted:!1,reconciling:!1,submit:i},j.posted=!0,V({content:"",...v.length>0?{client_tool_results:v}:{},hitl_decisions:n,...P()})}catch{const v=I.current;if(j.posted&&v&&S.current===j){v.reconciling||(v.reconciling=!0,Ne.current(v));return}I.current=null,S.current===j&&(S.current=null),E.current=!1,$.current=!1,T(null),b()}},[me,V,P,H]),ge=m.useCallback(()=>{const e=se.current,t=Ee;let n=[],i;if(t(g=>{var b;n=[],i=(b=g[g.length-1])==null?void 0:b.id;let d=!1;const h=g.map(j=>{const v=j.message.hitlCards;return v!=null&&v.some(A=>A.status==="pending")?(d=!0,n.push({id:j.id,cards:v}),{...j,message:{...j.message,hitlCards:v.map(A=>A.status==="pending"?{...A,status:"abandoned"}:A)}}):j});return d?h:g}),e&&n.length>0){const g=n;oe.current={conversationId:e,afterMessageId:i,streamStarted:!1,restore:()=>{t(d=>d.map(h=>{const b=g.find(j=>j.id===h.id);return b?{...h,message:{...h.message,hitlCards:b.cards}}:h}))}}}T(null)},[Ee]),ft=m.useCallback((e,t,n)=>{if(G||E.current)return;let i;if(!H(e,h=>{const b=h.message.hitlCards,j=b==null?void 0:b.find(w=>w.tool_call_id===t);if(!b||!j||j.status!=="pending")return{};const v=b.map(w=>w.tool_call_id===t?{...w,selected_option_id:n}:w),A=v.filter(w=>w.status==="pending");return A.length>0&&A.every(w=>w.selected_option_id)&&(i={calls:h.message.pendingClientToolCalls,decisions:A.map(w=>({tool_call_id:w.tool_call_id,option_id:w.selected_option_id}))}),{message:{...h.message,hitlCards:v}}})||!i)return;const d={messageId:e,toolCallId:t,optionId:n};T(d),ze(e,i.calls,i.decisions,d)},[G,H,ze]);m.useEffect(()=>{const e=S.current;e&&!e.streamRequested&&Te();const t=I.current;if(t&&x===t.conversationId&&!t.streamStarted){E.current=!0,T(t.submit);return}(!t||t.conversationId!==x)&&(E.current=!1),T(null)},[x,Te]),m.useEffect(()=>{const e=S.current;if(ne){e&&(e.streamRequested=!0),(e||E.current)&&($.current=!0);return}$.current&&($.current=!1,E.current=!1)},[ne]);const Oe=m.useCallback(e=>{e.streamStarted=!0,H(e.messageId,t=>{var g;const n=(g=t.message.hitlCards)==null?void 0:g.map(d=>e.decisionIDs.includes(d.tool_call_id)&&d.status==="pending"?{...d,status:"decided"}:d),i=ae?et(n,e.decisionIDs):[];return{message:{...t.message,hitlCards:n,...i.length?{toolCalls:be(t.message.toolCalls,i)}:{}}}}),fe(e.conversationId),I.current=null,S.current=null,E.current=!1,$.current=!1,T(null)},[fe,H]),Ke=m.useCallback(()=>{I.current=null,S.current=null,E.current=!1,$.current=!1,T(null)},[]),Ae=m.useCallback(async e=>{let t=null;try{const n=await z.api.ai.getChatSession({sessionId:e.conversationId});t=new Map;for(const i of n.messages??[])for(const g of Ze(i.metadata)??[])t.set(g.tool_call_id,g)}catch{t=null}if(se.current!==e.conversationId||I.current!==e){e.reconciling=!1;return}H(e.messageId,n=>{var d;const i=(d=n.message.hitlCards)==null?void 0:d.map(h=>{if(!e.decisionIDs.includes(h.tool_call_id)||h.status==="abandoned")return h;const b=t==null?void 0:t.get(h.tool_call_id);return(b==null?void 0:b.status)==="pending"?{...b,status:"pending",selected_option_id:""}:b||{...h,status:"decided"}}),g=ae?et(i,e.decisionIDs):[];return{message:{...n.message,hitlCards:i,...g.length?{toolCalls:be(n.message.toolCalls,g)}:{}}}}),Ke()},[Ke,H]);Ne.current=e=>{Ae(e)},m.useEffect(()=>{const e=I.current;if(!e||!(y!=null&&y.length)||x!==e.conversationId)return;const t=y.findIndex(i=>i.id===e.messageId);if(t<0)return;const n=[...y.slice(t+1)].reverse().find(i=>i.message.role==="assistant");if(n){if(n.status==="updating"||e.streamStarted||n.status==="success"){Oe(e);return}n.status==="loading"||n.status==="local"||e.reconciling||(e.reconciling=!0,Ae(e))}},[y,x,Oe,Ae]),m.useEffect(()=>{const e=oe.current;if(!e||!(y!=null&&y.length)||x!==e.conversationId||e.afterMessageId!==void 0&&!y.some(i=>i.id===e.afterMessageId))return;const t=e.afterMessageId===void 0?-1:y.findIndex(i=>i.id===e.afterMessageId),n=[...y.slice(t+1)].reverse().find(i=>i.message.role==="assistant");if(n&&!((n.status==="loading"||n.status==="local")&&!e.streamStarted)){if(n.status==="updating"||n.status==="success"||e.streamStarted){oe.current=null,fe(e.conversationId);return}oe.current=null,e.restore()}},[y,x,fe]),m.useEffect(()=>{var i;if(ne||!(y!=null&&y.length)||!x)return;const e=y[y.length-1],t=(i=e==null?void 0:e.message)==null?void 0:i.pendingClientToolCalls;if(!(t!=null&&t.length))return;const n=mt.current;if(n.get(x)!==t){if(n.set(x,t),ot(e.message.hitlCards)){t.every(g=>g.hitlFromHistory)||me(x,t);return}Ve(t)}},[ne,y,x,me,Ve]);const Xe=e=>{if(!(!e||G)){if(!x){he(e);return}ge(),V({content:e,...P()})}},{run:gt,loading:ht}=Y.useRequest(async e=>await z.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{ce.error(f("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{var g;if(y&&y.length>0&&(y[y.length-1].status==="loading"||y.length>e.messages.length))return;const t=[];let n={id:"",message:{content:"",role:"assistant"},status:"success"};const i=()=>{var b;const d=Ce(n.message.hitlCards),h=n.message.toolCalls??[];n.message.content.length===0&&!d.length&&h.length===0||t.push({id:n.id,message:{content:n.message.content,role:n.message.role,...h.length?{toolCalls:h}:{},...d.length?{hitlCards:d}:{},...d.length&&((b=n.message.pendingClientToolCalls)!=null&&b.length)?{pendingClientToolCalls:n.message.pendingClientToolCalls}:{}},status:n.status})};for(const d of e.messages)switch(d.role){case"assistant":n.status=d.status==="completed"&&n.status==="success"?"success":"error",n.message.role="assistant",n.id!==d.id&&d.content&&(n.message.content=d.content),n.id=d.id;{const h=Ze(d.metadata),b=ae?kt(d.tool_calls,h):[];if(b.length&&(n.message.toolCalls=be(n.message.toolCalls,b)),h!=null&&h.length){n.message.hitlCards=[...n.message.hitlCards??[],...h];const j=Rt(d.tool_calls,h);j!=null&&j.length&&(n.message.pendingClientToolCalls=[...n.message.pendingClientToolCalls??[],...j])}}break;case"user":(n.message.content.length>0||Ce(n.message.hitlCards).length||(((g=n.message.toolCalls)==null?void 0:g.length)??0)>0)&&(i(),n={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:d.id,message:{content:d.content,role:d.role},status:d.status==="completed"?"success":"error"});break}i(),Ee(t)}}),{run:he,loading:qe}=Y.useRequest(async(e,t,n=!1,i)=>({session:await z.api.ai.createChatSession({title:f("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:n}),message:e,domains:i}),{manual:!0,onError:()=>{ce.error(f("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:({session:e,message:t,domains:n})=>{le(B(e),"prepend"),N(e.id),t&&Be({message:t,sessionId:e.id,domains:n})}});m.useEffect(()=>{F((q==null?void 0:q.map(e=>B(e)))||[])},[q]);const{run:xt}=Y.useRequest(async e=>await z.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){ce.error(f("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const n=J(t);n&&D(t,{...n,loading:!1})},onSuccess(e,[t]){ue(t)}}),{run:bt}=Y.useRequest(async e=>z.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const n=J(t);n&&D(t,{...n,title:e,loading:!1})},onError:(e,[t])=>{ce.error(f("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const n=J(t);n&&D(t,{...n,loading:!1})}});m.useEffect(()=>{if(x&&(te==null?void 0:te.sessionId)===x){const{message:e,domains:t}=te;setTimeout(()=>{ge(),V({content:e,...P(),...t!==void 0?{domains:t}:{}})},1e3),Be(void 0)}},[x,te,P,ge]),m.useEffect(()=>{if(x){const e=je(x);if(e&&e.length>0)return;gt(x)}},[x]);const Je=m.useRef(()=>{});Je.current=(e,t)=>{const n=De.normalizeCallAIOptions(t),i=n.domains!==void 0?xe(n.domains):void 0;if(i!==void 0&&Se(g=>[...i.map(d=>({type:"domain",value:d})),...g.filter(d=>d.type==="skill")]),n.newSession===!1&&x){if(G)return;ge(),V({content:e,...P(),...i!==void 0?{domains:i}:{}});return}he(e,n.messages,n.anonymous??!0,i)},m.useEffect(()=>{_&&_((e,t)=>{Je.current(e,t)})},[_]);const yt=l.jsxRuntimeExports.jsxs("div",{className:R.sider,children:[l.jsxRuntimeExports.jsx(C.Button,{onClick:()=>{he()},type:"link",className:R.addBtn,icon:l.jsxRuntimeExports.jsx(U.PlusOutlined,{}),loading:qe,children:f("chat.newConversation",{defaultValue:"New Conversation"})}),l.jsxRuntimeExports.jsx(C.Spin,{spinning:Q,wrapperClassName:R.conversationsSpin,children:l.jsxRuntimeExports.jsx(O.Conversations,{items:ee,activeKey:x,onActiveChange:async e=>{e&&N(e)},className:R.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:f("chat.regenerateTitle"),key:"regenerateTitle",icon:l.jsxRuntimeExports.jsx(U.ReloadOutlined,{}),onClick:()=>{D(e.key,{...e,loading:!0}),bt(e.key)}},{label:k("delete"),key:"delete",icon:l.jsxRuntimeExports.jsx(U.DeleteOutlined,{}),danger:!0,onClick:()=>{D(e.key,{...e,loading:!0}),xt(e.key)}}]})})})]}),Ct=l.jsxRuntimeExports.jsx(l.jsxRuntimeExports.Fragment,{children:l.jsxRuntimeExports.jsx(C.Space,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:l.jsxRuntimeExports.jsx(O.Sender,{footer:e=>l.jsxRuntimeExports.jsxs(C.Flex,{justify:"space-between",align:"center",children:[l.jsxRuntimeExports.jsx(C.Flex,{gap:"small",align:"center",children:l.jsxRuntimeExports.jsx(C.Dropdown,{open:ut,onOpenChange:(t,n)=>{(n.source==="trigger"||t)&&ct(t)},menu:{selectedKeys:W.map(t=>t.value),onClick:t=>{const n=Me.find(i=>i.key===t.key);Se(i=>i.some(g=>g.value===t.key)?i.filter(g=>g.value!==t.key):[...i,{type:(n==null?void 0:n.skillType)||"skill",value:t.key}])},items:Me.map(t=>({label:t.label,key:t.key}))},children:l.jsxRuntimeExports.jsxs(O.Sender.Switch,{value:!1,icon:l.jsxRuntimeExports.jsx(l.LuBookOpenText,{}),children:[f("chat.skill",{defaultValue:"Skills"})," ","(",W.length>0?f("chat.skillsSelected",{defaultValue:"{{count}} selected",count:W.length}):f("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),l.jsxRuntimeExports.jsx(C.Flex,{align:"center",children:e})]}),suffix:!1,value:He,onSubmit:async()=>{Xe(He.trim()),Pe("")},onChange:Pe,onCancel:()=>{const e=S.current;if(e&&!e.streamRequested){Te();return}dt()},loading:ne||G!==null,className:Ue(R.sender,"chat-sender"),placeholder:f("chat.inputPlaceholder")})})});return l.jsxRuntimeExports.jsx(O.XProvider,{children:l.jsxRuntimeExports.jsxs(Ft.Provider,{value:{onReload:pt,setMessage:H},children:[l.jsxRuntimeExports.jsxs("div",{className:Ue(R.layoutSelector,"ai-chat-layout-selector",r==="float-sidebar"&&R.layoutSelectorDraggable),style:{height:"50px",width:"100%",position:"relative"},children:[l.jsxRuntimeExports.jsx(C.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:l.jsxRuntimeExports.jsx(C.Tooltip,{title:f("chat.layoutModal",{defaultValue:"Modal"}),children:l.jsxRuntimeExports.jsx("span",{children:l.jsxRuntimeExports.jsx(l.LuAppWindow,{})})}),value:"classic"},{label:l.jsxRuntimeExports.jsx(C.Tooltip,{title:f("chat.layoutSidebar",{defaultValue:"Sidebar"}),children:l.jsxRuntimeExports.jsx("span",{children:l.jsxRuntimeExports.jsx(l.LuPanelRight,{})})}),value:"sidebar"},{label:l.jsxRuntimeExports.jsx(C.Tooltip,{title:f("chat.layoutFloat",{defaultValue:"Float"}),children:l.jsxRuntimeExports.jsx("span",{children:l.jsxRuntimeExports.jsx(l.LuPictureInPicture2,{})})}),value:"float-sidebar"}],optionType:"button",onChange:e=>p(e.target.value),value:r}),l.jsxRuntimeExports.jsxs(C.Space,{style:{float:"right",marginTop:10},children:[l.jsxRuntimeExports.jsx(C.Button,{type:"primary",onClick:()=>{he()},loading:qe,icon:l.jsxRuntimeExports.jsx(U.PlusOutlined,{}),style:{display:r==="classic"?"none":"block"}}),l.jsxRuntimeExports.jsx(C.Dropdown,{menu:{items:ee.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{N(e)}},placement:"bottomRight",children:l.jsxRuntimeExports.jsx(C.Button,{icon:Q?l.jsxRuntimeExports.jsx(C.Spin,{size:"small"}):l.jsxRuntimeExports.jsx(U.HistoryOutlined,{}),style:{display:r==="classic"?"none":"block"}})}),l.jsxRuntimeExports.jsx(C.Button,{type:"text",onClick:()=>c(!1),children:l.jsxRuntimeExports.jsx(U.CloseOutlined,{})})]})]}),l.jsxRuntimeExports.jsxs("div",{className:r==="classic"?R.classicLayout:R.siderLayout,style:{minWidth:r==="classic"?"500px":"400px"},children:[r==="classic"?yt:null,l.jsxRuntimeExports.jsxs("div",{className:R.chat,children:[l.jsxRuntimeExports.jsx(Dt,{bubble:a,messages:y,loading:ht||qe,layout:r,onSendMessage:Xe,hitlSubmitting:G,onHITLSelect:ft,showToolCalls:X}),Ct]})]})]})})};exports.AIChat=lt;exports.default=lt;
