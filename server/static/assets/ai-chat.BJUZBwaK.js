var _t=Object.defineProperty;var kt=(o,s,c)=>s in o?_t(o,s,{enumerable:!0,configurable:!0,writable:!0,value:c}):o[s]=c;var Fe=(o,s,c)=>kt(o,typeof s!="symbol"?s+"":s,c);import{u as Xe,r as m,F as St,d as U,j as i,q as We,B as he,bd as Ge,S as oe,b1 as jt,b5 as wt,v as Ue,a as Ye,af as re,D as Qe,et as It,be as Rt,x as He,eu as Tt,ev as At,ew as Lt,bU as Ft,cp as Ht,b as Dt,bQ as De,J as $t,y as at}from"./vendor.DwYEMpZd.js";import{a as B}from"./index.xmKudDvQ.js";import{d as Et,b as Nt,n as Mt}from"./contexts.DoWfZ4Tg.js";import{u as Pt,a as Vt,C as zt,S as Ze,X as Bt,b as qt,c as et,F as Kt,A as Ot,M as Jt,d as Xt}from"./ant-design-x.DdrUL7x4.js";import{C as Wt,p as Gt}from"./components.mnVgBxvl.js";import{a as Ut,o as Yt}from"./highlighter.Dsi0yql0.js";import"./vite.CnSqVV0U.js";import"./lodash.Bb75kzRV.js";import"./highlight.DHmnecVl.js";import"./ai.Bg-ytxtO.js";import"./client.CCy1UVGb.js";import"./base.DTQzNojt.js";import"./authorization.DbtxiL2z.js";import"./inbox.DgcSCcaV.js";import"./system.DB4JvcMG.js";import"./oauth.CvuVcS7D.js";import"./tasks.BMiCZhBb.js";import"./ai-chat-layout.Cd75ZJhu.js";import"./mermaid.C5XrBFZv.js";import"./refractor.Riv_QPs1.js";const ot=Dt(({token:o,css:s})=>({layoutSelector:s`
      flex: none;
    `,layoutSelectorDraggable:s`
      cursor: grab;
      touch-action: none;
    `,siderLayout:s`
      width: 100%;
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      background: ${o.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${o.fontFamily}, sans-serif;
    `,classicLayout:s`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${o.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${o.fontFamily}, sans-serif;
    `,sider:s`
      background: ${o.colorBgLayout}80;
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
        color: ${o.colorText};
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
      border-top: 1px solid ${o.colorBorderSecondary};
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
      padding-block: ${o.paddingSM}px ${o.paddingLG}px;
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
      color: ${o.colorText} !important;
    `,senderPrompt:s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${o.colorText};
    `}));function Qt(o){if(o==null||typeof o!="object")return;const s=o;if(typeof s.tool_call_id!="string"||s.tool_call_id===""||s.kind!=="approval"&&s.kind!=="choice"||s.status!=="pending"&&s.status!=="decided"&&s.status!=="abandoned"||typeof s.title!="string"||typeof s.tool_name!="string"||!Array.isArray(s.options))return;const c=[];for(const r of s.options){if(r==null||typeof r!="object")continue;const u=r;typeof u.id!="string"||typeof u.label!="string"||c.push({id:u.id,label:u.label,description:typeof u.description=="string"?u.description:"",primary:u.primary===!0})}let a="";if(typeof s.arguments=="string")a=s.arguments;else if(s.arguments!=null)try{a=JSON.stringify(s.arguments)}catch{a=""}return{tool_call_id:s.tool_call_id,kind:s.kind,title:s.title,tool_name:s.tool_name,arguments:a,description:"",options:c,status:s.status,selected_option_id:typeof s.selected_option_id=="string"?s.selected_option_id:""}}function tt(o){const s=o;if(s==null||typeof s!="object")return;const c=s.hitl_cards;if(!Array.isArray(c))return;const a=[];for(const r of c){const u=Qt(r);u&&a.push(u)}return a.length>0?a:void 0}function rt(o){return!!(o!=null&&o.some(s=>s.status==="pending"))}function xe(o){return(o??[]).filter(s=>s.status==="pending")}function Zt(o,s){var r;if(!rt(s))return;const c=new Set(s.map(u=>u.tool_call_id)),a=[];for(const u of o??[]){const f=(r=u==null?void 0:u.function)==null?void 0:r.name;!(u!=null&&u.id)||!f||!f.startsWith("ui_")||f==="ui_choose"||c.has(u.id)||a.push({id:u.id,name:f,arguments:typeof u.function.arguments=="string"?u.function.arguments:"",hitlFromHistory:!0})}return a.length>0?a:void 0}function lt(o){return!!o&&(o==="ui_choose"||o.startsWith("ui_"))}function it(o){return!!o&&o.kind==="approval"&&o.status==="decided"&&o.selected_option_id==="approve"}function nt(o,s){const c=new Set(s),a=[];for(const r of o??[])!c.has(r.tool_call_id)||!it(r)||!r.tool_name||a.push({id:r.tool_call_id,name:r.tool_name,arguments:r.arguments||"",status:"completed"});return a}function en(o,s){var r,u;const c=new Map((s??[]).map(f=>[f.tool_call_id,f])),a=[];for(const f of o??[]){const S=(r=f==null?void 0:f.function)==null?void 0:r.name;if(!(f!=null&&f.id)||!S||lt(S))continue;const q=c.get(f.id);q&&!it(q)||a.push({id:f.id,name:S,arguments:typeof((u=f.function)==null?void 0:u.arguments)=="string"?f.function.arguments:"",status:"completed",title:f.title||void 0})}return a}function tn(o){var c,a;const s=[];for(const r of o??[]){const u=(c=r==null?void 0:r.function)==null?void 0:c.name;if(!(r!=null&&r.id)||!u||lt(u))continue;const f=r.status==="pending"||r.status==="running"||r.status==="failed"||r.status==="completed"?r.status:"running";s.push({id:r.id,name:u,arguments:typeof((a=r.function)==null?void 0:a.arguments)=="string"?r.function.arguments:"",status:f,title:r.title||void 0})}return s}function ye(o,s){const c=[...o??[]];for(const a of s){const r=c.findIndex(u=>u.id===a.id);r>=0?c[r]={...c[r],...a,arguments:a.arguments||c[r].arguments,title:a.title||c[r].title}:c.push(a)}return c}function nn(o,s){if(!(o!=null&&o.length)||!(s!=null&&s.length))return o;const c=new Set(s.map(r=>r.tool_call_id)),a=o.filter(r=>!c.has(r.id));return a.length>0?a:void 0}let ae=!1;const ct={onChunk:o=>{}};function sn(o,s,c){o(s,a=>{var r;return{message:{...a.message,hitlCards:(r=a.message.hitlCards)==null?void 0:r.map(u=>c.includes(u.tool_call_id)&&u.status!=="abandoned"?{...u,status:"pending",selected_option_id:""}:u)}}})}class an extends Error{constructor(c,a){super(c);Fe(this,"buffer");this.buffer=a}}function on(o){if(o==null||typeof o!="object")return!1;const s=o;if(s.name==="AbortError")return!0;const c=typeof s.message=="string"?s.message:"";return/aborted/i.test(c)||/BodyStreamBuffer/i.test(c)}class rn extends Ot{constructor(){super(...arguments);Fe(this,"conversationKey","")}transformParams(c,a){if(typeof c!="object")throw new Error("requestParams must be an object");return{...(a==null?void 0:a.params)||{},...c||{}}}transformLocalMessage({content:c}){return{content:c,role:"user"}}transformMessage(c){const{originMessage:a,chunk:r,status:u}=c||{};if(!r)return{...a,content:(a==null?void 0:a.content)||"",role:"assistant",status:u};u==="updating"&&ct.onChunk(this.conversationKey);let f;try{f=JSON.parse(r.data)}catch{return{...a,content:(a==null?void 0:a.content)||"",role:"assistant",status:u}}const S=f.message_id===(a==null?void 0:a.messageId)?`${(a==null?void 0:a.content)||""}${f.content||""}`:f.content||"";switch(f.event_type){case"tool_call":return{...a,content:S,role:"assistant",messageId:f.message_id,toolCalls:ae?ye(a==null?void 0:a.toolCalls,tn(f.tool_calls)):a==null?void 0:a.toolCalls,status:u};case"content":return{...a,content:S,role:"assistant",messageId:f.message_id,status:u};case"error":return{...a,content:S,role:"assistant",error:f.content,messageId:f.message_id,status:u};case"client_tool_pending":return{...a,content:S||"",role:"assistant",pendingClientToolCalls:f.client_tool_calls,messageId:f.message_id,status:u};case"hitl_pending":return{...a,content:S||"",role:"assistant",pendingClientToolCalls:f.client_tool_calls,hitlCards:f.hitl_cards,toolCalls:nn(a==null?void 0:a.toolCalls,f.hitl_cards),messageId:f.message_id,status:u};default:return{...a,content:S||(a==null?void 0:a.content)||"",role:"assistant",messageId:f.message_id||(a==null?void 0:a.messageId),status:u}}}}const st=new Map,ln=o=>{let s=st.get(o);return s||(s=new rn({request:qt(`/api/ai/chat/sessions/${o}`,{manual:!0,middlewares:{onRequest:async(c,a)=>{const r=localStorage.getItem("orgID"),{sessionId:u}=a.params??{},f={...a.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...r?{"X-Scope-OrgID":r}:{}};return[u?`/api/ai/chat/sessions/${u}`:c,{...a,headers:f}]}}})}),st.set(o,s)),s.conversationKey=o,s},cn=o=>{var f;const{className:s,children:c}=o,a=((f=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:f[1])||"",{isDarkMode:r}=at(),u=r?Ut:Yt;return typeof c!="string"?null:a==="mermaid"?i.jsx(Jt,{children:c}):i.jsx(Xt,{highlightProps:{style:{...u,'pre[class*="language-"]':{...u['pre[class*="language-"]'],margin:0,borderRadius:0}}},lang:a,children:c})},un=$t.createContext({});function be(o){if(!o||o.length===0)return[];const s=new Set,c=[];for(const a of o){const r=a.trim();!r||s.has(r)||(s.add(r),c.push(r))}return c}const dn=({bubble:o={},messages:s,loading:c,layout:a="classic",onSendMessage:r,hitlSubmitting:u,onHITLSelect:f,showToolCalls:S=!1})=>{const{styles:q}=ot(),{isDarkMode:Ce}=at(),[A,le]=m.useState({}),Y=m.useMemo(()=>{if(!o.components)return{code:cn};const h={};for(const v in o.components){const D=o.components[v];if(typeof D=="string"){h[v]=D;continue}h[v]=K=>i.jsx(D,{...K,onSendMessage:r})}return h},[r,o.components]),{contentRender:M=h=>h?i.jsx(et,{paragraphTag:"div",content:h,className:Ce?"x-markdown-dark":"x-markdown-light",components:Y}):null,footerRender:P=({message:h})=>{if(h.error)return i.jsx("div",{children:i.jsx(et,{content:h.error,components:Y})})}}=o,_=m.useMemo(()=>(s||[]).map(h=>{const v=xe(h.message.hitlCards);return{...h.message,key:h.id,...v.length?{variant:"borderless",styles:{...h.message.content?{}:{content:{display:"none"}},body:{width:"100%",maxWidth:"100%"},footer:{width:"100%"}}}:{},contentRender:M,footer:(D,K)=>{const V=P==null?void 0:P(h,K,r),O=S&&h.message.role==="assistant"?h.message.toolCalls??[]:[],b=h.message.content||"",J=h.status==="loading"||h.status==="updating",Q=b||O.length>0?i.jsx(Wt,{text:b,tools:O,live:J,align:h.message.role==="user"?"end":"start"},J?"live":"settled"):null;if(!v.length)return!Q&&!V?void 0:i.jsxs(re,{vertical:!0,gap:8,style:{width:O.length>0?"100%":void 0},children:[Q,V]});const ie=(u==null?void 0:u.messageId)===h.id;return i.jsxs(re,{className:"hitl-card-stack",vertical:!0,gap:8,style:{width:"100%"},children:[Q,V||null,v.map(R=>{const $=`${h.id}:${R.tool_call_id}`,Z=A[$]||R.selected_option_id;return i.jsx(Gt,{card:Z&&Z!==R.selected_option_id?{...R,selected_option_id:Z}:R,submitting:ie,onSelect:ie?void 0:ce=>{le(X=>({...X,[$]:ce})),f==null||f(h.id,R.tool_call_id,ce)}},R.tool_call_id)})]})}}}).filter(h=>{var v;return h.content||xe(h.hitlCards).length||S&&(((v=h.toolCalls)==null?void 0:v.length)??0)>0}),[s,M,P,r,u,f,A,S]);return i.jsx("div",{className:q.chatList,children:i.jsx(oe,{spinning:c,children:i.jsx(Kt.List,{items:_,style:{height:"100%",paddingInline:a==="classic"?"16px":a==="float-sidebar"?"0px":"16px"},roles:{assistant:{placement:"start",loadingRender:()=>i.jsx(oe,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>i.jsx(oe,{size:"small"})},user:{placement:"end"}}})})})},Hn=({bubble:o={},ephemeralSystemPrompts:s,clientTools:c,defaultSkillDomains:a})=>{const{layout:r,setVisible:u,setLayout:f,onCallAI:S,activeConversationKey:q,setActiveConversationKey:Ce,conversations:A,fetchConversationsLoading:le,getEphemeralSystemPrompts:Y,getClientTools:M,registerGlobalAI:P}=Et(),{t:_}=Xe("ai"),{t:h}=Xe("common"),{styles:v}=ot(),{siteConfig:D}=Nt(),K=(D==null?void 0:D.show_tool_calls)??!1;ae=K;const V=e=>({key:e.id,label:e.title,group:De(e.start_time).isSame(De(),"day")?_("chat.today"):De(e.start_time).format("YYYY-MM-DD")}),{conversations:O,activeConversationKey:b,setActiveConversationKey:J,addConversation:Q,setConversations:ie,getConversation:R,setConversation:$,removeConversation:Z,getMessages:ce}=Pt({defaultActiveConversationKey:q,defaultConversations:(A==null?void 0:A.map(e=>V(e)))||[]});m.useEffect(()=>{Ce(b)},[b]);const{message:X}=St.useApp(),[$e,Ee]=m.useState(""),[ut,dt]=m.useState(!1),ve=(a==null?void 0:a.join("\0"))??"",_e=m.useMemo(()=>be(ve?ve.split("\0"):[]),[ve]),ke=(s==null?void 0:s.join("\0"))??"",Se=m.useMemo(()=>be(ke?ke.split("\0"):[]),[ke]);m.useEffect(()=>{if(!(Se.length===0&&!(c!=null&&c.length)))return P({ephemeralSystemPrompts:Se,tools:c})},[Se,c,P]);const[W,je]=m.useState(()=>_e.map(e=>({type:"domain",value:e})));m.useEffect(()=>{je(e=>{const t=e.filter(n=>n.type==="skill");return[..._e.map(n=>({type:"domain",value:n})),...t]})},[_e]);const{data:Ne}=U(()=>B.system.listSkillDomains()),{data:ue}=U(()=>B.system.listSkills({current:1,page_size:500})),Me=m.useMemo(()=>[...(Ne??[]).map(e=>({skillType:"domain",key:e,label:i.jsxs(i.Fragment,{children:[i.jsx(We,{children:_("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((ue==null?void 0:ue.data)??[]).map(e=>({skillType:"skill",key:e.id,label:i.jsxs(i.Fragment,{children:[i.jsx(We,{children:_("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[ue,Ne]),[ee,Pe]=m.useState(),{onRequest:z,messages:x,isRequesting:te,abort:ft,onReload:mt,setMessages:we,setMessage:H}=Vt({provider:ln(b),conversationKey:b,defaultMessages:[],requestPlaceholder:()=>({content:h("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>on(t)?{content:"",role:"assistant"}:t instanceof an?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),E=m.useCallback(()=>{const e={domains:W.filter(l=>l.type==="domain").map(l=>l.value),skill_ids:W.filter(l=>l.type==="skill").map(l=>l.value)},t=be(Y());t.length>0&&(e.ephemeral_system_prompts=t);const n=M();return n.length>0&&(e.client_tools=n.map(l=>({name:l.name,description:l.description,parameters:l.parameters}))),e},[W,Y,M]),pt=m.useRef(new Map),Ie=m.useRef(new Map),ne=m.useRef(b);ne.current=b;const w=m.useRef(!1),N=m.useRef(!1),Re=m.useRef(0),j=m.useRef(null),T=m.useRef(null),Ve=m.useRef(()=>{}),se=m.useRef(null),[G,L]=m.useState(null);ct.onChunk=e=>{const t=T.current;t&&t.conversationId===e&&(t.streamStarted=!0);const n=se.current;n&&n.conversationId===e&&(n.streamStarted=!0)};const de=m.useCallback(async e=>{const t=[],n=M();for(const l of e){if(l.name==="ui_choose")continue;const p=n.find(d=>d.name===l.name);if(!p){t.push({tool_call_id:l.id,content:JSON.stringify({error:`Client tool "${l.name}" is not available on the current page`,available_tools:n.map(d=>d.name)})});continue}try{const d=await Promise.resolve(p.handler(l.arguments));t.push({tool_call_id:l.id,content:d!=null&&d.trim()?d:JSON.stringify({ok:!0})})}catch(d){const g=d instanceof Error?d.message:String(d);t.push({tool_call_id:l.id,content:JSON.stringify({error:g})})}}return t},[M]),fe=m.useCallback((e,t)=>{const n=Ie.current.get(e);if(n&&n.calls===t)return n.promise;const l=de(t);return Ie.current.set(e,{calls:t,promise:l}),l},[de]),me=m.useCallback(e=>{e&&Ie.current.delete(e)},[]),ze=m.useCallback(async e=>{if(e.filter(l=>l.name!=="ui_choose").length===0)return;const n=await de(e);z({content:"",client_tool_results:n,...E()})},[de,z,E]),Te=m.useCallback(()=>{const e=j.current;!e||e.streamRequested||e.posted||(Re.current+=1,j.current=null,w.current=!1,N.current=!1,T.current=null,L(null),e.revert())},[]),Be=m.useCallback(async(e,t,n,l)=>{if(w.current)return;const p=++Re.current,d=ne.current;if(!d){L(null);return}const g=n.map(k=>k.tool_call_id),y=()=>sn(H,e,g),C={generation:p,streamRequested:!1,posted:!1,revert:y};j.current=C,w.current=!0;try{let k=[];if(t!=null&&t.length&&(k=await fe(d,t)),Re.current!==p||ne.current!==d){j.current===C&&(j.current=null,w.current=!1,N.current=!1,T.current=null,L(null),y());return}T.current={conversationId:d,messageId:e,decisionIDs:g,streamStarted:!1,reconciling:!1,submit:l},C.posted=!0,z({content:"",...k.length>0?{client_tool_results:k}:{},hitl_decisions:n,...E()})}catch{const k=T.current;if(C.posted&&k&&j.current===C){k.reconciling||(k.reconciling=!0,Ve.current(k));return}T.current=null,j.current===C&&(j.current=null),w.current=!1,N.current=!1,L(null),y()}},[fe,z,E,H]),pe=m.useCallback(()=>{const e=ne.current,t=we;let n=[],l;if(t(p=>{var y;n=[],l=(y=p[p.length-1])==null?void 0:y.id;let d=!1;const g=p.map(C=>{const k=C.message.hitlCards;return k!=null&&k.some(F=>F.status==="pending")?(d=!0,n.push({id:C.id,cards:k}),{...C,message:{...C.message,hitlCards:k.map(F=>F.status==="pending"?{...F,status:"abandoned"}:F)}}):C});return d?g:p}),e&&n.length>0){const p=n;se.current={conversationId:e,afterMessageId:l,streamStarted:!1,restore:()=>{t(d=>d.map(g=>{const y=p.find(C=>C.id===g.id);return y?{...g,message:{...g.message,hitlCards:y.cards}}:g}))}}}L(null)},[we]),gt=m.useCallback((e,t,n)=>{if(G||w.current)return;let l;if(!H(e,g=>{const y=g.message.hitlCards,C=y==null?void 0:y.find(I=>I.tool_call_id===t);if(!y||!C||C.status!=="pending")return{};const k=y.map(I=>I.tool_call_id===t?{...I,selected_option_id:n}:I),F=k.filter(I=>I.status==="pending");return F.length>0&&F.every(I=>I.selected_option_id)&&(l={calls:g.message.pendingClientToolCalls,decisions:F.map(I=>({tool_call_id:I.tool_call_id,option_id:I.selected_option_id}))}),{message:{...g.message,hitlCards:k}}})||!l)return;const d={messageId:e,toolCallId:t,optionId:n};L(d),Be(e,l.calls,l.decisions,d)},[G,H,Be]);m.useEffect(()=>{const e=j.current;e&&!e.streamRequested&&Te();const t=T.current;if(t&&b===t.conversationId&&!t.streamStarted){w.current=!0,L(t.submit);return}(!t||t.conversationId!==b)&&(w.current=!1),L(null)},[b,Te]),m.useEffect(()=>{const e=j.current;if(te){e&&(e.streamRequested=!0),(e||w.current)&&(N.current=!0);return}N.current&&(N.current=!1,w.current=!1)},[te]);const qe=m.useCallback(e=>{e.streamStarted=!0,H(e.messageId,t=>{var p;const n=(p=t.message.hitlCards)==null?void 0:p.map(d=>e.decisionIDs.includes(d.tool_call_id)&&d.status==="pending"?{...d,status:"decided"}:d),l=ae?nt(n,e.decisionIDs):[];return{message:{...t.message,hitlCards:n,...l.length?{toolCalls:ye(t.message.toolCalls,l)}:{}}}}),me(e.conversationId),T.current=null,j.current=null,w.current=!1,N.current=!1,L(null)},[me,H]),Ke=m.useCallback(()=>{T.current=null,j.current=null,w.current=!1,N.current=!1,L(null)},[]),Ae=m.useCallback(async e=>{let t=null;try{const n=await B.ai.getChatSession({sessionId:e.conversationId});t=new Map;for(const l of n.messages??[])for(const p of tt(l.metadata)??[])t.set(p.tool_call_id,p)}catch{t=null}if(ne.current!==e.conversationId||T.current!==e){e.reconciling=!1;return}H(e.messageId,n=>{var d;const l=(d=n.message.hitlCards)==null?void 0:d.map(g=>{if(!e.decisionIDs.includes(g.tool_call_id)||g.status==="abandoned")return g;const y=t==null?void 0:t.get(g.tool_call_id);return(y==null?void 0:y.status)==="pending"?{...y,status:"pending",selected_option_id:""}:y||{...g,status:"decided"}}),p=ae?nt(l,e.decisionIDs):[];return{message:{...n.message,hitlCards:l,...p.length?{toolCalls:ye(n.message.toolCalls,p)}:{}}}}),Ke()},[Ke,H]);Ve.current=e=>{Ae(e)},m.useEffect(()=>{const e=T.current;if(!e||!(x!=null&&x.length)||b!==e.conversationId)return;const t=x.findIndex(l=>l.id===e.messageId);if(t<0)return;const n=[...x.slice(t+1)].reverse().find(l=>l.message.role==="assistant");if(n){if(n.status==="updating"||e.streamStarted||n.status==="success"){qe(e);return}n.status==="loading"||n.status==="local"||e.reconciling||(e.reconciling=!0,Ae(e))}},[x,b,qe,Ae]),m.useEffect(()=>{const e=se.current;if(!e||!(x!=null&&x.length)||b!==e.conversationId||e.afterMessageId!==void 0&&!x.some(l=>l.id===e.afterMessageId))return;const t=e.afterMessageId===void 0?-1:x.findIndex(l=>l.id===e.afterMessageId),n=[...x.slice(t+1)].reverse().find(l=>l.message.role==="assistant");if(n&&!((n.status==="loading"||n.status==="local")&&!e.streamStarted)){if(n.status==="updating"||n.status==="success"||e.streamStarted){se.current=null,me(e.conversationId);return}se.current=null,e.restore()}},[x,b,me]),m.useEffect(()=>{var l;if(te||!(x!=null&&x.length)||!b)return;const e=x[x.length-1],t=(l=e==null?void 0:e.message)==null?void 0:l.pendingClientToolCalls;if(!(t!=null&&t.length))return;const n=pt.current;if(n.get(b)!==t){if(n.set(b,t),rt(e.message.hitlCards)){t.every(p=>p.hitlFromHistory)||fe(b,t);return}ze(t)}},[te,x,b,fe,ze]);const Oe=e=>{if(!(!e||G)){if(!b){ge(e);return}pe(),z({content:e,...E()})}},{run:ht,loading:bt}=U(async e=>await B.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{X.error(_("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{var p;if(x&&x.length>0&&(x[x.length-1].status==="loading"||x.length>e.messages.length))return;const t=[];let n={id:"",message:{content:"",role:"assistant"},status:"success"};const l=()=>{var y;const d=xe(n.message.hitlCards),g=n.message.toolCalls??[];n.message.content.length===0&&!d.length&&g.length===0||t.push({id:n.id,message:{content:n.message.content,role:n.message.role,...g.length?{toolCalls:g}:{},...d.length?{hitlCards:d}:{},...d.length&&((y=n.message.pendingClientToolCalls)!=null&&y.length)?{pendingClientToolCalls:n.message.pendingClientToolCalls}:{}},status:n.status})};for(const d of e.messages)switch(d.role){case"assistant":n.status=d.status==="completed"&&n.status==="success"?"success":"error",n.message.role="assistant",n.id!==d.id&&d.content&&(n.message.content=d.content),n.id=d.id;{const g=tt(d.metadata),y=ae?en(d.tool_calls,g):[];if(y.length&&(n.message.toolCalls=ye(n.message.toolCalls,y)),g!=null&&g.length){n.message.hitlCards=[...n.message.hitlCards??[],...g];const C=Zt(d.tool_calls,g);C!=null&&C.length&&(n.message.pendingClientToolCalls=[...n.message.pendingClientToolCalls??[],...C])}}break;case"user":(n.message.content.length>0||xe(n.message.hitlCards).length||(((p=n.message.toolCalls)==null?void 0:p.length)??0)>0)&&(l(),n={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:d.id,message:{content:d.content,role:d.role},status:d.status==="completed"?"success":"error"});break}l(),we(t)}}),{run:ge,loading:Le}=U(async(e,t,n=!1,l)=>({session:await B.ai.createChatSession({title:_("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:n}),message:e,domains:l}),{manual:!0,onError:()=>{X.error(_("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:({session:e,message:t,domains:n})=>{Q(V(e),"prepend"),J(e.id),t&&Pe({message:t,sessionId:e.id,domains:n})}});m.useEffect(()=>{ie((A==null?void 0:A.map(e=>V(e)))||[])},[A]);const{run:yt}=U(async e=>await B.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){X.error(_("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const n=R(t);n&&$(t,{...n,loading:!1})},onSuccess(e,[t]){Z(t)}}),{run:xt}=U(async e=>B.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const n=R(t);n&&$(t,{...n,title:e,loading:!1})},onError:(e,[t])=>{X.error(_("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const n=R(t);n&&$(t,{...n,loading:!1})}});m.useEffect(()=>{if(b&&(ee==null?void 0:ee.sessionId)===b){const{message:e,domains:t}=ee;setTimeout(()=>{pe(),z({content:e,...E(),...t!==void 0?{domains:t}:{}})},1e3),Pe(void 0)}},[b,ee,E,pe]),m.useEffect(()=>{if(b){const e=ce(b);if(e&&e.length>0)return;ht(b)}},[b]);const Je=m.useRef(()=>{});Je.current=(e,t)=>{const n=Mt(t),l=n.domains!==void 0?be(n.domains):void 0;if(l!==void 0&&je(p=>[...l.map(d=>({type:"domain",value:d})),...p.filter(d=>d.type==="skill")]),n.newSession===!1&&b){if(G)return;pe(),z({content:e,...E(),...l!==void 0?{domains:l}:{}});return}ge(e,n.messages,n.anonymous??!0,l)},m.useEffect(()=>{S&&S((e,t)=>{Je.current(e,t)})},[S]);const Ct=i.jsxs("div",{className:v.sider,children:[i.jsx(he,{onClick:()=>{ge()},type:"link",className:v.addBtn,icon:i.jsx(Ge,{}),loading:Le,children:_("chat.newConversation",{defaultValue:"New Conversation"})}),i.jsx(oe,{spinning:le,wrapperClassName:v.conversationsSpin,children:i.jsx(zt,{items:O,activeKey:b,onActiveChange:async e=>{e&&J(e)},className:v.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:_("chat.regenerateTitle"),key:"regenerateTitle",icon:i.jsx(jt,{}),onClick:()=>{$(e.key,{...e,loading:!0}),xt(e.key)}},{label:h("delete"),key:"delete",icon:i.jsx(wt,{}),danger:!0,onClick:()=>{$(e.key,{...e,loading:!0}),yt(e.key)}}]})})})]}),vt=i.jsx(i.Fragment,{children:i.jsx(Ue,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:i.jsx(Ze,{footer:e=>i.jsxs(re,{justify:"space-between",align:"center",children:[i.jsx(re,{gap:"small",align:"center",children:i.jsx(Qe,{open:ut,onOpenChange:(t,n)=>{(n.source==="trigger"||t)&&dt(t)},menu:{selectedKeys:W.map(t=>t.value),onClick:t=>{const n=Me.find(l=>l.key===t.key);je(l=>l.some(p=>p.value===t.key)?l.filter(p=>p.value!==t.key):[...l,{type:(n==null?void 0:n.skillType)||"skill",value:t.key}])},items:Me.map(t=>({label:t.label,key:t.key}))},children:i.jsxs(Ze.Switch,{value:!1,icon:i.jsx(It,{}),children:[_("chat.skill",{defaultValue:"Skills"})," ","(",W.length>0?_("chat.skillsSelected",{defaultValue:"{{count}} selected",count:W.length}):_("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),i.jsx(re,{align:"center",children:e})]}),suffix:!1,value:$e,onSubmit:async()=>{Oe($e.trim()),Ee("")},onChange:Ee,onCancel:()=>{const e=j.current;if(e&&!e.streamRequested){Te();return}ft()},loading:te||G!==null,className:Ye(v.sender,"chat-sender"),placeholder:_("chat.inputPlaceholder")})})});return i.jsx(Bt,{children:i.jsxs(un.Provider,{value:{onReload:mt,setMessage:H},children:[i.jsxs("div",{className:Ye(v.layoutSelector,"ai-chat-layout-selector",r==="float-sidebar"&&v.layoutSelectorDraggable),style:{height:"50px",width:"100%",position:"relative"},children:[i.jsx(Rt.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:i.jsx(He,{title:_("chat.layoutModal",{defaultValue:"Modal"}),children:i.jsx("span",{children:i.jsx(Tt,{})})}),value:"classic"},{label:i.jsx(He,{title:_("chat.layoutSidebar",{defaultValue:"Sidebar"}),children:i.jsx("span",{children:i.jsx(At,{})})}),value:"sidebar"},{label:i.jsx(He,{title:_("chat.layoutFloat",{defaultValue:"Float"}),children:i.jsx("span",{children:i.jsx(Lt,{})})}),value:"float-sidebar"}],optionType:"button",onChange:e=>f(e.target.value),value:r}),i.jsxs(Ue,{style:{float:"right",marginTop:10},children:[i.jsx(he,{type:"primary",onClick:()=>{ge()},loading:Le,icon:i.jsx(Ge,{}),style:{display:r==="classic"?"none":"block"}}),i.jsx(Qe,{menu:{items:O.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{J(e)}},placement:"bottomRight",children:i.jsx(he,{icon:le?i.jsx(oe,{size:"small"}):i.jsx(Ft,{}),style:{display:r==="classic"?"none":"block"}})}),i.jsx(he,{type:"text",onClick:()=>u(!1),children:i.jsx(Ht,{})})]})]}),i.jsxs("div",{className:r==="classic"?v.classicLayout:v.siderLayout,style:{minWidth:r==="classic"?"500px":"400px"},children:[r==="classic"?Ct:null,i.jsxs("div",{className:v.chat,children:[i.jsx(dn,{bubble:o,messages:x,loading:bt||Le,layout:r,onSendMessage:Oe,hitlSubmitting:G,onHITLSelect:gt,showToolCalls:K}),vt]})]})]})})};export{Hn as AIChat,Hn as default};
