"use strict";var Ct=Object.defineProperty;var vt=(r,s,c)=>s in r?Ct(r,s,{enumerable:!0,configurable:!0,writable:!0,value:c}):r[s]=c;var Le=(r,s,c)=>vt(r,typeof s!="symbol"?s+"":s,c);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("./vendor.js"),O=require("./index.js"),Q=require("@ant-design/icons"),V=require("@ant-design/x"),ye=require("@ant-design/x-sdk"),We=require("@ant-design/x-markdown"),Z=require("ahooks"),v=require("antd"),De=require("antd-style"),p=require("react"),Ue=require("react-i18next"),Fe=require("dayjs"),He=require("./contexts.js"),_t=require("classnames");;/* empty css              */const Ye=require("./components.js"),Qe=require("./highlighter.js"),nt=De.createStyles(({token:r,css:s})=>({siderLayout:s`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,classicLayout:s`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,sider:s`
      background: ${r.colorBgLayout}80;
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
        color: ${r.colorText};
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
      border-top: 1px solid ${r.colorBorderSecondary};
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
      padding-block: ${r.paddingLG}px;
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
      color: ${r.colorText} !important;
    `,senderPrompt:s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${r.colorText};
    `}));function jt(r){if(r==null||typeof r!="object")return;const s=r;if(typeof s.tool_call_id!="string"||s.tool_call_id===""||s.kind!=="approval"&&s.kind!=="choice"||s.status!=="pending"&&s.status!=="decided"&&s.status!=="abandoned"||typeof s.title!="string"||typeof s.tool_name!="string"||!Array.isArray(s.options))return;const c=[];for(const a of s.options){if(a==null||typeof a!="object")continue;const u=a;typeof u.id!="string"||typeof u.label!="string"||c.push({id:u.id,label:u.label,description:typeof u.description=="string"?u.description:"",primary:u.primary===!0})}let o="";if(typeof s.arguments=="string")o=s.arguments;else if(s.arguments!=null)try{o=JSON.stringify(s.arguments)}catch{o=""}return{tool_call_id:s.tool_call_id,kind:s.kind,title:s.title,tool_name:s.tool_name,arguments:o,description:"",options:c,status:s.status,selected_option_id:typeof s.selected_option_id=="string"?s.selected_option_id:""}}function Ze(r){const s=r;if(s==null||typeof s!="object")return;const c=s.hitl_cards;if(!Array.isArray(c))return;const o=[];for(const a of c){const u=jt(a);u&&o.push(u)}return o.length>0?o:void 0}function st(r){return!!(r!=null&&r.some(s=>s.status==="pending"))}function Ce(r){return(r??[]).filter(s=>s.status==="pending")}function Rt(r,s){var a;if(!st(s))return;const c=new Set(s.map(u=>u.tool_call_id)),o=[];for(const u of r??[]){const m=(a=u==null?void 0:u.function)==null?void 0:a.name;!(u!=null&&u.id)||!m||!m.startsWith("ui_")||m==="ui_choose"||c.has(u.id)||o.push({id:u.id,name:m,arguments:typeof u.function.arguments=="string"?u.function.arguments:"",hitlFromHistory:!0})}return o.length>0?o:void 0}function ot(r){return!!r&&(r==="ui_choose"||r.startsWith("ui_"))}function rt(r){return!!r&&r.kind==="approval"&&r.status==="decided"&&r.selected_option_id==="approve"}function et(r,s){const c=new Set(s),o=[];for(const a of r??[])!c.has(a.tool_call_id)||!rt(a)||!a.tool_name||o.push({id:a.tool_call_id,name:a.tool_name,arguments:a.arguments||"",status:"completed"});return o}function kt(r,s){var a,u;const c=new Map((s??[]).map(m=>[m.tool_call_id,m])),o=[];for(const m of r??[]){const R=(a=m==null?void 0:m.function)==null?void 0:a.name;if(!(m!=null&&m.id)||!R||ot(R))continue;const K=c.get(m.id);K&&!rt(K)||o.push({id:m.id,name:R,arguments:typeof((u=m.function)==null?void 0:u.arguments)=="string"?m.function.arguments:"",status:"completed",title:m.title||void 0})}return o}function St(r){var c,o;const s=[];for(const a of r??[]){const u=(c=a==null?void 0:a.function)==null?void 0:c.name;if(!(a!=null&&a.id)||!u||ot(u))continue;const m=a.status==="pending"||a.status==="running"||a.status==="failed"||a.status==="completed"?a.status:"running";s.push({id:a.id,name:u,arguments:typeof((o=a.function)==null?void 0:o.arguments)=="string"?a.function.arguments:"",status:m,title:a.title||void 0})}return s}function be(r,s){const c=[...r??[]];for(const o of s){const a=c.findIndex(u=>u.id===o.id);a>=0?c[a]={...c[a],...o,arguments:o.arguments||c[a].arguments,title:o.title||c[a].title}:c.push(o)}return c}function Et(r,s){if(!(r!=null&&r.length)||!(s!=null&&s.length))return r;const c=new Set(s.map(a=>a.tool_call_id)),o=r.filter(a=>!c.has(a.id));return o.length>0?o:void 0}let ie=!1;const at={onChunk:r=>{}};function wt(r,s,c){r(s,o=>{var a;return{message:{...o.message,hitlCards:(a=o.message.hitlCards)==null?void 0:a.map(u=>c.includes(u.tool_call_id)&&u.status!=="abandoned"?{...u,status:"pending",selected_option_id:""}:u)}}})}class It extends Error{constructor(c,o){super(c);Le(this,"buffer");this.buffer=o}}function Tt(r){if(r==null||typeof r!="object")return!1;const s=r;if(s.name==="AbortError")return!0;const c=typeof s.message=="string"?s.message:"";return/aborted/i.test(c)||/BodyStreamBuffer/i.test(c)}class qt extends ye.AbstractChatProvider{constructor(){super(...arguments);Le(this,"conversationKey","")}transformParams(c,o){if(typeof c!="object")throw new Error("requestParams must be an object");return{...(o==null?void 0:o.params)||{},...c||{}}}transformLocalMessage({content:c}){return{content:c,role:"user"}}transformMessage(c){const{originMessage:o,chunk:a,status:u}=c||{};if(!a)return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:u};u==="updating"&&at.onChunk(this.conversationKey);let m;try{m=JSON.parse(a.data)}catch{return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:u}}const R=m.message_id===(o==null?void 0:o.messageId)?`${(o==null?void 0:o.content)||""}${m.content||""}`:m.content||"";switch(m.event_type){case"tool_call":return{...o,content:R,role:"assistant",messageId:m.message_id,toolCalls:ie?be(o==null?void 0:o.toolCalls,St(m.tool_calls)):o==null?void 0:o.toolCalls,status:u};case"content":return{...o,content:R,role:"assistant",messageId:m.message_id,status:u};case"error":return{...o,content:R,role:"assistant",error:m.content,messageId:m.message_id,status:u};case"client_tool_pending":return{...o,content:R||"",role:"assistant",pendingClientToolCalls:m.client_tool_calls,messageId:m.message_id,status:u};case"hitl_pending":return{...o,content:R||"",role:"assistant",pendingClientToolCalls:m.client_tool_calls,hitlCards:m.hitl_cards,toolCalls:Et(o==null?void 0:o.toolCalls,m.hitl_cards),messageId:m.message_id,status:u};default:return{...o,content:R||(o==null?void 0:o.content)||"",role:"assistant",messageId:m.message_id||(o==null?void 0:o.messageId),status:u}}}}const tt=new Map,At=r=>{let s=tt.get(r);return s||(s=new qt({request:ye.XRequest(`/api/ai/chat/sessions/${r}`,{manual:!0,middlewares:{onRequest:async(c,o)=>{const a=localStorage.getItem("orgID"),{sessionId:u}=o.params??{},m={...o.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...a?{"X-Scope-OrgID":a}:{}};return[u?`/api/ai/chat/sessions/${u}`:c,{...o,headers:m}]}}})}),tt.set(r,s)),s.conversationKey=r,s},Lt=r=>{var m;const{className:s,children:c}=r,o=((m=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:m[1])||"",{isDarkMode:a}=De.useThemeMode(),u=a?Qe.oneDark:Qe.oneLight;return typeof c!="string"?null:o==="mermaid"?l.jsxRuntimeExports.jsx(V.Mermaid,{children:c}):l.jsxRuntimeExports.jsx(V.CodeHighlighter,{highlightProps:{style:{...u,'pre[class*="language-"]':{...u['pre[class*="language-"]'],margin:0,borderRadius:0}}},lang:o,children:c})},Ft=p.createContext({});function xe(r){if(!r||r.length===0)return[];const s=new Set,c=[];for(const o of r){const a=o.trim();!a||s.has(a)||(s.add(a),c.push(a))}return c}const Ht=({bubble:r={},messages:s,loading:c,layout:o="classic",onSendMessage:a,hitlSubmitting:u,onHITLSelect:m,showToolCalls:R=!1})=>{const{styles:K}=nt(),{isDarkMode:ve}=De.useThemeMode(),[q,le]=p.useState({}),ee=p.useMemo(()=>{if(!r.components)return{code:Lt};const h={};for(const _ in r.components){const H=r.components[_];if(typeof H=="string"){h[_]=H;continue}h[_]=X=>l.jsxRuntimeExports.jsx(H,{...X,onSendMessage:a})}return h},[a,r.components]),{contentRender:B=h=>h?l.jsxRuntimeExports.jsx(We.XMarkdown,{paragraphTag:"div",content:h,className:ve?"x-markdown-dark":"x-markdown-light",components:ee}):null,footerRender:M=({message:h})=>{if(h.error)return l.jsxRuntimeExports.jsx("div",{children:l.jsxRuntimeExports.jsx(We.XMarkdown,{content:h.error,components:ee})})}}=r,k=p.useMemo(()=>(s||[]).map(h=>{const _=Ce(h.message.hitlCards);return{...h.message,key:h.id,..._.length?{variant:"borderless",styles:{...h.message.content?{}:{content:{display:"none"}},body:{width:"100%",maxWidth:"100%"},footer:{width:"100%"}}}:{},contentRender:B,footer:(H,X)=>{const N=M==null?void 0:M(h,X,a),J=R&&h.message.role==="assistant"?h.message.toolCalls??[]:[],x=h.message.content||"",G=h.status==="loading"||h.status==="updating",te=x||J.length>0?l.jsxRuntimeExports.jsx(Ye.ChatMessageActions,{text:x,tools:J,live:G,align:h.message.role==="user"?"end":"start"},G?"live":"settled"):null;if(!_.length)return!te&&!N?void 0:l.jsxRuntimeExports.jsxs(v.Flex,{vertical:!0,gap:8,style:{width:J.length>0?"100%":void 0},children:[te,N]});const ce=(u==null?void 0:u.messageId)===h.id;return l.jsxRuntimeExports.jsxs(v.Flex,{className:"hitl-card-stack",vertical:!0,gap:8,style:{width:"100%"},children:[te,N||null,_.map(I=>{const D=`${h.id}:${I.tool_call_id}`,ne=q[D]||I.selected_option_id;return l.jsxRuntimeExports.jsx(Ye.HITLCard,{card:ne&&ne!==I.selected_option_id?{...I,selected_option_id:ne}:I,submitting:ce,onSelect:ce?void 0:ue=>{le(W=>({...W,[D]:ue})),m==null||m(h.id,I.tool_call_id,ue)}},I.tool_call_id)})]})}}}).filter(h=>{var _;return h.content||Ce(h.hitlCards).length||R&&(((_=h.toolCalls)==null?void 0:_.length)??0)>0}),[s,B,M,a,u,m,q,R]);return l.jsxRuntimeExports.jsx("div",{className:K.chatList,children:l.jsxRuntimeExports.jsx(v.Spin,{spinning:c,children:l.jsxRuntimeExports.jsx(V.Bubble.List,{items:k,style:{height:"100%",paddingInline:o==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>l.jsxRuntimeExports.jsx(v.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>l.jsxRuntimeExports.jsx(v.Spin,{size:"small"})},user:{placement:"end"}}})})})},it=({bubble:r={},ephemeralSystemPrompts:s,clientTools:c,defaultSkillDomains:o})=>{const{layout:a,setVisible:u,setLayout:m,onCallAI:R,activeConversationKey:K,setActiveConversationKey:ve,conversations:q,fetchConversationsLoading:le,getEphemeralSystemPrompts:ee,getClientTools:B,registerGlobalAI:M}=He.useAI(),{t:k}=Ue.useTranslation("ai"),{t:h}=Ue.useTranslation("common"),{styles:_}=nt(),{siteConfig:H}=He.useSite(),X=(H==null?void 0:H.show_tool_calls)??!1;ie=X;const N=e=>({key:e.id,label:e.title,group:Fe(e.start_time).isSame(Fe(),"day")?k("chat.today"):Fe(e.start_time).format("YYYY-MM-DD")}),{conversations:J,activeConversationKey:x,setActiveConversationKey:G,addConversation:te,setConversations:ce,getConversation:I,setConversation:D,removeConversation:ne,getMessages:ue}=ye.useXConversations({defaultActiveConversationKey:K,defaultConversations:(q==null?void 0:q.map(e=>N(e)))||[]});p.useEffect(()=>{ve(x)},[x]);const{message:W}=v.App.useApp(),[Pe,$e]=p.useState(""),[lt,ct]=p.useState(!1),_e=(o==null?void 0:o.join("\0"))??"",je=p.useMemo(()=>xe(_e?_e.split("\0"):[]),[_e]),Re=(s==null?void 0:s.join("\0"))??"",ke=p.useMemo(()=>xe(Re?Re.split("\0"):[]),[Re]);p.useEffect(()=>{if(!(ke.length===0&&!(c!=null&&c.length)))return M({ephemeralSystemPrompts:ke,tools:c})},[ke,c,M]);const[U,Se]=p.useState(()=>je.map(e=>({type:"domain",value:e})));p.useEffect(()=>{Se(e=>{const t=e.filter(n=>n.type==="skill");return[...je.map(n=>({type:"domain",value:n})),...t]})},[je]);const{data:Be}=Z.useRequest(()=>O.api.system.listSkillDomains()),{data:de}=Z.useRequest(()=>O.api.system.listSkills({current:1,page_size:500})),Me=p.useMemo(()=>[...(Be??[]).map(e=>({skillType:"domain",key:e,label:l.jsxRuntimeExports.jsxs(l.jsxRuntimeExports.Fragment,{children:[l.jsxRuntimeExports.jsx(v.Tag,{children:k("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((de==null?void 0:de.data)??[]).map(e=>({skillType:"skill",key:e.id,label:l.jsxRuntimeExports.jsxs(l.jsxRuntimeExports.Fragment,{children:[l.jsxRuntimeExports.jsx(v.Tag,{children:k("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[de,Be]),[se,Ne]=p.useState(),{onRequest:z,messages:y,isRequesting:oe,abort:ut,onReload:dt,setMessages:Ee,setMessage:F}=ye.useXChat({provider:At(x),conversationKey:x,defaultMessages:[],requestPlaceholder:()=>({content:h("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>Tt(t)?{content:"",role:"assistant"}:t instanceof It?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),P=p.useCallback(()=>{const e={domains:U.filter(i=>i.type==="domain").map(i=>i.value),skill_ids:U.filter(i=>i.type==="skill").map(i=>i.value)},t=xe(ee());t.length>0&&(e.ephemeral_system_prompts=t);const n=B();return n.length>0&&(e.client_tools=n.map(i=>({name:i.name,description:i.description,parameters:i.parameters}))),e},[U,ee,B]),mt=p.useRef(new Map),we=p.useRef(new Map),re=p.useRef(x);re.current=x;const E=p.useRef(!1),$=p.useRef(!1),Ie=p.useRef(0),S=p.useRef(null),T=p.useRef(null),ze=p.useRef(()=>{}),ae=p.useRef(null),[Y,A]=p.useState(null);at.onChunk=e=>{const t=T.current;t&&t.conversationId===e&&(t.streamStarted=!0);const n=ae.current;n&&n.conversationId===e&&(n.streamStarted=!0)};const me=p.useCallback(async e=>{const t=[],n=B();for(const i of e){if(i.name==="ui_choose")continue;const f=n.find(d=>d.name===i.name);if(!f){t.push({tool_call_id:i.id,content:JSON.stringify({error:`Client tool "${i.name}" is not available on the current page`,available_tools:n.map(d=>d.name)})});continue}try{const d=await Promise.resolve(f.handler(i.arguments));t.push({tool_call_id:i.id,content:d!=null&&d.trim()?d:JSON.stringify({ok:!0})})}catch(d){const g=d instanceof Error?d.message:String(d);t.push({tool_call_id:i.id,content:JSON.stringify({error:g})})}}return t},[B]),pe=p.useCallback((e,t)=>{const n=we.current.get(e);if(n&&n.calls===t)return n.promise;const i=me(t);return we.current.set(e,{calls:t,promise:i}),i},[me]),fe=p.useCallback(e=>{e&&we.current.delete(e)},[]),Oe=p.useCallback(async e=>{if(e.filter(i=>i.name!=="ui_choose").length===0)return;const n=await me(e);z({content:"",client_tool_results:n,...P()})},[me,z,P]),Te=p.useCallback(()=>{const e=S.current;!e||e.streamRequested||e.posted||(Ie.current+=1,S.current=null,E.current=!1,$.current=!1,T.current=null,A(null),e.revert())},[]),Ve=p.useCallback(async(e,t,n,i)=>{if(E.current)return;const f=++Ie.current,d=re.current;if(!d){A(null);return}const g=n.map(j=>j.tool_call_id),b=()=>wt(F,e,g),C={generation:f,streamRequested:!1,posted:!1,revert:b};S.current=C,E.current=!0;try{let j=[];if(t!=null&&t.length&&(j=await pe(d,t)),Ie.current!==f||re.current!==d){S.current===C&&(S.current=null,E.current=!1,$.current=!1,T.current=null,A(null),b());return}T.current={conversationId:d,messageId:e,decisionIDs:g,streamStarted:!1,reconciling:!1,submit:i},C.posted=!0,z({content:"",...j.length>0?{client_tool_results:j}:{},hitl_decisions:n,...P()})}catch{const j=T.current;if(C.posted&&j&&S.current===C){j.reconciling||(j.reconciling=!0,ze.current(j));return}T.current=null,S.current===C&&(S.current=null),E.current=!1,$.current=!1,A(null),b()}},[pe,z,P,F]),ge=p.useCallback(()=>{const e=re.current,t=Ee;let n=[],i;if(t(f=>{var b;n=[],i=(b=f[f.length-1])==null?void 0:b.id;let d=!1;const g=f.map(C=>{const j=C.message.hitlCards;return j!=null&&j.some(L=>L.status==="pending")?(d=!0,n.push({id:C.id,cards:j}),{...C,message:{...C.message,hitlCards:j.map(L=>L.status==="pending"?{...L,status:"abandoned"}:L)}}):C});return d?g:f}),e&&n.length>0){const f=n;ae.current={conversationId:e,afterMessageId:i,streamStarted:!1,restore:()=>{t(d=>d.map(g=>{const b=f.find(C=>C.id===g.id);return b?{...g,message:{...g.message,hitlCards:b.cards}}:g}))}}}A(null)},[Ee]),pt=p.useCallback((e,t,n)=>{if(Y||E.current)return;let i;if(!F(e,g=>{const b=g.message.hitlCards,C=b==null?void 0:b.find(w=>w.tool_call_id===t);if(!b||!C||C.status!=="pending")return{};const j=b.map(w=>w.tool_call_id===t?{...w,selected_option_id:n}:w),L=j.filter(w=>w.status==="pending");return L.length>0&&L.every(w=>w.selected_option_id)&&(i={calls:g.message.pendingClientToolCalls,decisions:L.map(w=>({tool_call_id:w.tool_call_id,option_id:w.selected_option_id}))}),{message:{...g.message,hitlCards:j}}})||!i)return;const d={messageId:e,toolCallId:t,optionId:n};A(d),Ve(e,i.calls,i.decisions,d)},[Y,F,Ve]);p.useEffect(()=>{const e=S.current;e&&!e.streamRequested&&Te();const t=T.current;if(t&&x===t.conversationId&&!t.streamStarted){E.current=!0,A(t.submit);return}(!t||t.conversationId!==x)&&(E.current=!1),A(null)},[x,Te]),p.useEffect(()=>{const e=S.current;if(oe){e&&(e.streamRequested=!0),(e||E.current)&&($.current=!0);return}$.current&&($.current=!1,E.current=!1)},[oe]);const Ke=p.useCallback(e=>{e.streamStarted=!0,F(e.messageId,t=>{var f;const n=(f=t.message.hitlCards)==null?void 0:f.map(d=>e.decisionIDs.includes(d.tool_call_id)&&d.status==="pending"?{...d,status:"decided"}:d),i=ie?et(n,e.decisionIDs):[];return{message:{...t.message,hitlCards:n,...i.length?{toolCalls:be(t.message.toolCalls,i)}:{}}}}),fe(e.conversationId),T.current=null,S.current=null,E.current=!1,$.current=!1,A(null)},[fe,F]),Xe=p.useCallback(()=>{T.current=null,S.current=null,E.current=!1,$.current=!1,A(null)},[]),qe=p.useCallback(async e=>{let t=null;try{const n=await O.api.ai.getChatSession({sessionId:e.conversationId});t=new Map;for(const i of n.messages??[])for(const f of Ze(i.metadata)??[])t.set(f.tool_call_id,f)}catch{t=null}if(re.current!==e.conversationId||T.current!==e){e.reconciling=!1;return}F(e.messageId,n=>{var d;const i=(d=n.message.hitlCards)==null?void 0:d.map(g=>{if(!e.decisionIDs.includes(g.tool_call_id)||g.status==="abandoned")return g;const b=t==null?void 0:t.get(g.tool_call_id);return(b==null?void 0:b.status)==="pending"?{...b,status:"pending",selected_option_id:""}:b||{...g,status:"decided"}}),f=ie?et(i,e.decisionIDs):[];return{message:{...n.message,hitlCards:i,...f.length?{toolCalls:be(n.message.toolCalls,f)}:{}}}}),Xe()},[Xe,F]);ze.current=e=>{qe(e)},p.useEffect(()=>{const e=T.current;if(!e||!(y!=null&&y.length)||x!==e.conversationId)return;const t=y.findIndex(i=>i.id===e.messageId);if(t<0)return;const n=[...y.slice(t+1)].reverse().find(i=>i.message.role==="assistant");if(n){if(n.status==="updating"||e.streamStarted||n.status==="success"){Ke(e);return}n.status==="loading"||n.status==="local"||e.reconciling||(e.reconciling=!0,qe(e))}},[y,x,Ke,qe]),p.useEffect(()=>{const e=ae.current;if(!e||!(y!=null&&y.length)||x!==e.conversationId||e.afterMessageId!==void 0&&!y.some(i=>i.id===e.afterMessageId))return;const t=e.afterMessageId===void 0?-1:y.findIndex(i=>i.id===e.afterMessageId),n=[...y.slice(t+1)].reverse().find(i=>i.message.role==="assistant");if(n&&!((n.status==="loading"||n.status==="local")&&!e.streamStarted)){if(n.status==="updating"||n.status==="success"||e.streamStarted){ae.current=null,fe(e.conversationId);return}ae.current=null,e.restore()}},[y,x,fe]),p.useEffect(()=>{var i;if(oe||!(y!=null&&y.length)||!x)return;const e=y[y.length-1],t=(i=e==null?void 0:e.message)==null?void 0:i.pendingClientToolCalls;if(!(t!=null&&t.length))return;const n=mt.current;if(n.get(x)!==t){if(n.set(x,t),st(e.message.hitlCards)){t.every(f=>f.hitlFromHistory)||pe(x,t);return}Oe(t)}},[oe,y,x,pe,Oe]);const Je=e=>{if(!(!e||Y)){if(!x){he(e);return}ge(),z({content:e,...P()})}},{run:ft,loading:gt}=Z.useRequest(async e=>await O.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{W.error(k("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{var f;if(y&&y.length>0&&(y[y.length-1].status==="loading"||y.length>e.messages.length))return;const t=[];let n={id:"",message:{content:"",role:"assistant"},status:"success"};const i=()=>{var b;const d=Ce(n.message.hitlCards),g=n.message.toolCalls??[];n.message.content.length===0&&!d.length&&g.length===0||t.push({id:n.id,message:{content:n.message.content,role:n.message.role,...g.length?{toolCalls:g}:{},...d.length?{hitlCards:d}:{},...d.length&&((b=n.message.pendingClientToolCalls)!=null&&b.length)?{pendingClientToolCalls:n.message.pendingClientToolCalls}:{}},status:n.status})};for(const d of e.messages)switch(d.role){case"assistant":n.status=d.status==="completed"&&n.status==="success"?"success":"error",n.message.role="assistant",n.id!==d.id&&d.content&&(n.message.content=d.content),n.id=d.id;{const g=Ze(d.metadata),b=ie?kt(d.tool_calls,g):[];if(b.length&&(n.message.toolCalls=be(n.message.toolCalls,b)),g!=null&&g.length){n.message.hitlCards=[...n.message.hitlCards??[],...g];const C=Rt(d.tool_calls,g);C!=null&&C.length&&(n.message.pendingClientToolCalls=[...n.message.pendingClientToolCalls??[],...C])}}break;case"user":(n.message.content.length>0||Ce(n.message.hitlCards).length||(((f=n.message.toolCalls)==null?void 0:f.length)??0)>0)&&(i(),n={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:d.id,message:{content:d.content,role:d.role},status:d.status==="completed"?"success":"error"});break}i(),Ee(t)}}),{run:he,loading:Ae}=Z.useRequest(async(e,t,n=!1,i)=>({session:await O.api.ai.createChatSession({title:k("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:n}),message:e,domains:i}),{manual:!0,onError:()=>{W.error(k("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:({session:e,message:t,domains:n})=>{te(N(e),"prepend"),G(e.id),t&&Ne({message:t,sessionId:e.id,domains:n})}});p.useEffect(()=>{ce((q==null?void 0:q.map(e=>N(e)))||[])},[q]);const{run:ht}=Z.useRequest(async e=>await O.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){W.error(k("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const n=I(t);n&&D(t,{...n,loading:!1})},onSuccess(e,[t]){ne(t)}}),{run:xt}=Z.useRequest(async e=>O.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const n=I(t);n&&D(t,{...n,title:e,loading:!1})},onError:(e,[t])=>{W.error(k("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const n=I(t);n&&D(t,{...n,loading:!1})}});p.useEffect(()=>{if(x&&(se==null?void 0:se.sessionId)===x){const{message:e,domains:t}=se;setTimeout(()=>{ge(),z({content:e,...P(),...t!==void 0?{domains:t}:{}})},1e3),Ne(void 0)}},[x,se,P,ge]),p.useEffect(()=>{if(x){const e=ue(x);if(e&&e.length>0)return;ft(x)}},[x]);const Ge=p.useRef(()=>{});Ge.current=(e,t)=>{const n=He.normalizeCallAIOptions(t),i=n.domains!==void 0?xe(n.domains):void 0;if(i!==void 0&&Se(f=>[...i.map(d=>({type:"domain",value:d})),...f.filter(d=>d.type==="skill")]),n.newSession===!1&&x){if(Y)return;ge(),z({content:e,...P(),...i!==void 0?{domains:i}:{}});return}he(e,n.messages,n.anonymous??!0,i)},p.useEffect(()=>{R&&R((e,t)=>{Ge.current(e,t)})},[R]);const bt=l.jsxRuntimeExports.jsxs("div",{className:_.sider,children:[l.jsxRuntimeExports.jsx(v.Button,{onClick:()=>{he()},type:"link",className:_.addBtn,icon:l.jsxRuntimeExports.jsx(Q.PlusOutlined,{}),loading:Ae,children:k("chat.newConversation",{defaultValue:"New Conversation"})}),l.jsxRuntimeExports.jsx(v.Spin,{spinning:le,wrapperClassName:_.conversationsSpin,children:l.jsxRuntimeExports.jsx(V.Conversations,{items:J,activeKey:x,onActiveChange:async e=>{e&&G(e)},className:_.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:k("chat.regenerateTitle"),key:"regenerateTitle",icon:l.jsxRuntimeExports.jsx(Q.ReloadOutlined,{}),onClick:()=>{D(e.key,{...e,loading:!0}),xt(e.key)}},{label:h("delete"),key:"delete",icon:l.jsxRuntimeExports.jsx(Q.DeleteOutlined,{}),danger:!0,onClick:()=>{D(e.key,{...e,loading:!0}),ht(e.key)}}]})})})]}),yt=l.jsxRuntimeExports.jsx(l.jsxRuntimeExports.Fragment,{children:l.jsxRuntimeExports.jsx(v.Space,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:l.jsxRuntimeExports.jsx(V.Sender,{footer:e=>l.jsxRuntimeExports.jsxs(v.Flex,{justify:"space-between",align:"center",children:[l.jsxRuntimeExports.jsx(v.Flex,{gap:"small",align:"center",children:l.jsxRuntimeExports.jsx(v.Dropdown,{open:lt,onOpenChange:(t,n)=>{(n.source==="trigger"||t)&&ct(t)},menu:{selectedKeys:U.map(t=>t.value),onClick:t=>{const n=Me.find(i=>i.key===t.key);Se(i=>i.some(f=>f.value===t.key)?i.filter(f=>f.value!==t.key):[...i,{type:(n==null?void 0:n.skillType)||"skill",value:t.key}])},items:Me.map(t=>({label:t.label,key:t.key}))},children:l.jsxRuntimeExports.jsxs(V.Sender.Switch,{value:!1,icon:l.jsxRuntimeExports.jsx(l.LuBookOpenText,{}),children:[k("chat.skill",{defaultValue:"Skills"})," ","(",U.length>0?k("chat.skillsSelected",{defaultValue:"{{count}} selected",count:U.length}):k("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),l.jsxRuntimeExports.jsx(v.Flex,{align:"center",children:e})]}),suffix:!1,value:Pe,onSubmit:async()=>{Je(Pe.trim()),$e("")},onChange:$e,onCancel:()=>{const e=S.current;if(e&&!e.streamRequested){Te();return}ut()},loading:oe||Y!==null,className:_t(_.sender,"chat-sender"),placeholder:k("chat.inputPlaceholder")})})});return l.jsxRuntimeExports.jsx(V.XProvider,{children:l.jsxRuntimeExports.jsxs(Ft.Provider,{value:{onReload:dt,setMessage:F},children:[l.jsxRuntimeExports.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[l.jsxRuntimeExports.jsx(v.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:l.jsxRuntimeExports.jsx(l.LuExternalLink,{style:{transform:"scaleX(-1)"}}),value:"classic"},{label:l.jsxRuntimeExports.jsx(l.LuPanelRightDashed,{}),value:"sidebar"},{label:l.jsxRuntimeExports.jsx(l.LuPanelRight,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>m(e.target.value),value:a}),l.jsxRuntimeExports.jsxs(v.Space,{style:{float:"right",marginTop:10},children:[l.jsxRuntimeExports.jsx(v.Button,{type:"primary",onClick:()=>{he()},loading:Ae,icon:l.jsxRuntimeExports.jsx(Q.PlusOutlined,{}),style:{display:a==="classic"?"none":"block"}}),l.jsxRuntimeExports.jsx(v.Dropdown,{menu:{items:J.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{G(e)}},placement:"bottomRight",children:l.jsxRuntimeExports.jsx(v.Button,{icon:le?l.jsxRuntimeExports.jsx(v.Spin,{size:"small"}):l.jsxRuntimeExports.jsx(Q.HistoryOutlined,{}),style:{display:a==="classic"?"none":"block"}})}),l.jsxRuntimeExports.jsx(v.Button,{type:"text",onClick:()=>u(!1),children:l.jsxRuntimeExports.jsx(Q.CloseOutlined,{})})]})]}),l.jsxRuntimeExports.jsxs("div",{className:a==="classic"?_.classicLayout:_.siderLayout,style:{minWidth:a==="classic"?"500px":"400px"},children:[a==="classic"?bt:null,l.jsxRuntimeExports.jsxs("div",{className:_.chat,children:[l.jsxRuntimeExports.jsx(Ht,{bubble:r,messages:y,loading:gt||Ae,layout:a,onSendMessage:Je,hitlSubmitting:Y,onHITLSelect:pt,showToolCalls:X}),yt]})]})]})})};exports.AIChat=it;exports.default=it;
