var vt=Object.defineProperty;var _t=(o,s,c)=>s in o?vt(o,s,{enumerable:!0,configurable:!0,writable:!0,value:c}):o[s]=c;var Fe=(o,s,c)=>_t(o,typeof s!="symbol"?s+"":s,c);import{u as Xe,r as p,F as kt,d as W,j as i,q as We,B as he,bd as Ge,S as se,b1 as St,b5 as jt,v as Ue,a as Ye,af as ae,D as Qe,et as wt,be as It,x as $e,eu as Rt,ev as Tt,ew as At,bU as Lt,cp as Ft,b as $t,bQ as De,J as Dt,y as Et}from"./vendor.DwYEMpZd.js";import{a as M}from"./index.BQqrQBIF.js";import{d as Ht,b as Nt,n as Pt}from"./contexts.GSy1qPX2.js";import{C as Vt,p as zt}from"./components.RFQtZQX6.js";import{u as Bt,a as Mt,C as qt,S as Ze,X as Kt,b as Ot,c as et,F as Jt,A as Xt,M as Wt,d as Gt}from"./ant-design-x.DdrUL7x4.js";import{a as Ut,o as Yt}from"./highlighter.Dsi0yql0.js";import"./vite.CnSqVV0U.js";import"./lodash.Bb75kzRV.js";import"./highlight.DHmnecVl.js";import"./ai.jR-LMzM8.js";import"./client.DmzK9N3M.js";import"./base.DlNBvgCd.js";import"./authorization.OjRDJaUH.js";import"./inbox.PP-v3ATm.js";import"./system.CxkrvgQ3.js";import"./oauth.nNKhJwHC.js";import"./tasks.B0U78tBt.js";import"./ai-chat-layout.DwYX6awK.js";import"./mermaid.C5XrBFZv.js";import"./refractor.Riv_QPs1.js";const at=$t(({token:o,css:s})=>({layoutSelector:s`
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
    `}));function Qt(o){if(o==null||typeof o!="object")return;const s=o;if(typeof s.tool_call_id!="string"||s.tool_call_id===""||s.kind!=="approval"&&s.kind!=="choice"||s.status!=="pending"&&s.status!=="decided"&&s.status!=="abandoned"||typeof s.title!="string"||typeof s.tool_name!="string"||!Array.isArray(s.options))return;const c=[];for(const r of s.options){if(r==null||typeof r!="object")continue;const u=r;typeof u.id!="string"||typeof u.label!="string"||c.push({id:u.id,label:u.label,description:typeof u.description=="string"?u.description:"",primary:u.primary===!0})}let a="";if(typeof s.arguments=="string")a=s.arguments;else if(s.arguments!=null)try{a=JSON.stringify(s.arguments)}catch{a=""}return{tool_call_id:s.tool_call_id,kind:s.kind,title:s.title,tool_name:s.tool_name,arguments:a,description:"",options:c,status:s.status,selected_option_id:typeof s.selected_option_id=="string"?s.selected_option_id:""}}function tt(o){const s=o;if(s==null||typeof s!="object")return;const c=s.hitl_cards;if(!Array.isArray(c))return;const a=[];for(const r of c){const u=Qt(r);u&&a.push(u)}return a.length>0?a:void 0}function ot(o){return!!(o!=null&&o.some(s=>s.status==="pending"))}function xe(o){return(o??[]).filter(s=>s.status==="pending")}function Zt(o,s){var r;if(!ot(s))return;const c=new Set(s.map(u=>u.tool_call_id)),a=[];for(const u of o??[]){const f=(r=u==null?void 0:u.function)==null?void 0:r.name;!(u!=null&&u.id)||!f||!f.startsWith("ui_")||f==="ui_choose"||c.has(u.id)||a.push({id:u.id,name:f,arguments:typeof u.function.arguments=="string"?u.function.arguments:"",hitlFromHistory:!0})}return a.length>0?a:void 0}function rt(o){return!!o&&(o==="ui_choose"||o.startsWith("ui_"))}function lt(o){return!!o&&o.kind==="approval"&&o.status==="decided"&&o.selected_option_id==="approve"}function nt(o,s){const c=new Set(s),a=[];for(const r of o??[])!c.has(r.tool_call_id)||!lt(r)||!r.tool_name||a.push({id:r.tool_call_id,name:r.tool_name,arguments:r.arguments||"",status:"completed"});return a}function en(o,s){var r,u;const c=new Map((s??[]).map(f=>[f.tool_call_id,f])),a=[];for(const f of o??[]){const _=(r=f==null?void 0:f.function)==null?void 0:r.name;if(!(f!=null&&f.id)||!_||rt(_))continue;const q=c.get(f.id);q&&!lt(q)||a.push({id:f.id,name:_,arguments:typeof((u=f.function)==null?void 0:u.arguments)=="string"?f.function.arguments:"",status:"completed",title:f.title||void 0})}return a}function tn(o){var c,a;const s=[];for(const r of o??[]){const u=(c=r==null?void 0:r.function)==null?void 0:c.name;if(!(r!=null&&r.id)||!u||rt(u))continue;const f=r.status==="pending"||r.status==="running"||r.status==="failed"||r.status==="completed"?r.status:"running";s.push({id:r.id,name:u,arguments:typeof((a=r.function)==null?void 0:a.arguments)=="string"?r.function.arguments:"",status:f,title:r.title||void 0})}return s}function ye(o,s){const c=[...o??[]];for(const a of s){const r=c.findIndex(u=>u.id===a.id);r>=0?c[r]={...c[r],...a,arguments:a.arguments||c[r].arguments,title:a.title||c[r].title}:c.push(a)}return c}function nn(o,s){if(!(o!=null&&o.length)||!(s!=null&&s.length))return o;const c=new Set(s.map(r=>r.tool_call_id)),a=o.filter(r=>!c.has(r.id));return a.length>0?a:void 0}let ne=!1;const it={onChunk:o=>{}};function sn(o,s,c){o(s,a=>{var r;return{message:{...a.message,hitlCards:(r=a.message.hitlCards)==null?void 0:r.map(u=>c.includes(u.tool_call_id)&&u.status!=="abandoned"?{...u,status:"pending",selected_option_id:""}:u)}}})}class an extends Error{constructor(c,a){super(c);Fe(this,"buffer");this.buffer=a}}function on(o){if(o==null||typeof o!="object")return!1;const s=o;if(s.name==="AbortError")return!0;const c=typeof s.message=="string"?s.message:"";return/aborted/i.test(c)||/BodyStreamBuffer/i.test(c)}class rn extends Xt{constructor(){super(...arguments);Fe(this,"conversationKey","")}transformParams(c,a){if(typeof c!="object")throw new Error("requestParams must be an object");return{...(a==null?void 0:a.params)||{},...c||{}}}transformLocalMessage({content:c}){return{content:c,role:"user"}}transformMessage(c){const{originMessage:a,chunk:r,status:u}=c||{};if(!r)return{...a,content:(a==null?void 0:a.content)||"",role:"assistant",status:u};u==="updating"&&it.onChunk(this.conversationKey);let f;try{f=JSON.parse(r.data)}catch{return{...a,content:(a==null?void 0:a.content)||"",role:"assistant",status:u}}const _=f.message_id===(a==null?void 0:a.messageId)?`${(a==null?void 0:a.content)||""}${f.content||""}`:f.content||"";switch(f.event_type){case"tool_call":return{...a,content:_,role:"assistant",messageId:f.message_id,toolCalls:ne?ye(a==null?void 0:a.toolCalls,tn(f.tool_calls)):a==null?void 0:a.toolCalls,status:u};case"content":return{...a,content:_,role:"assistant",messageId:f.message_id,status:u};case"error":return{...a,content:_,role:"assistant",error:f.content,messageId:f.message_id,status:u};case"client_tool_pending":return{...a,content:_||"",role:"assistant",pendingClientToolCalls:f.client_tool_calls,messageId:f.message_id,status:u};case"hitl_pending":return{...a,content:_||"",role:"assistant",pendingClientToolCalls:f.client_tool_calls,hitlCards:f.hitl_cards,toolCalls:nn(a==null?void 0:a.toolCalls,f.hitl_cards),messageId:f.message_id,status:u};default:return{...a,content:_||(a==null?void 0:a.content)||"",role:"assistant",messageId:f.message_id||(a==null?void 0:a.messageId),status:u}}}}const st=new Map,ln=o=>{let s=st.get(o);return s||(s=new rn({request:Ot(`/api/ai/chat/sessions/${o}`,{manual:!0,middlewares:{onRequest:async(c,a)=>{const r=localStorage.getItem("orgID"),{sessionId:u}=a.params??{},f={...a.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...r?{"X-Scope-OrgID":r}:{}};return[u?`/api/ai/chat/sessions/${u}`:c,{...a,headers:f}]}}})}),st.set(o,s)),s.conversationKey=o,s},cn=o=>{var f;const{className:s,children:c}=o,a=((f=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:f[1])||"",{isDarkMode:r}=Et(),u=r?Ut:Yt;return typeof c!="string"?null:a==="mermaid"?i.jsx(Wt,{children:c}):i.jsx(Gt,{highlightProps:{style:{...u,'pre[class*="language-"]':{...u['pre[class*="language-"]'],margin:0,borderRadius:0}}},lang:a,children:c})},un=Dt.createContext({});function be(o){if(!o||o.length===0)return[];const s=new Set,c=[];for(const a of o){const r=a.trim();!r||s.has(r)||(s.add(r),c.push(r))}return c}const dn=({bubble:o={},messages:s,loading:c,layout:a="classic",onSendMessage:r,hitlSubmitting:u,onHITLSelect:f,showToolCalls:_=!1})=>{const{styles:q}=at(),[oe,L]=p.useState({}),G=p.useMemo(()=>{if(!o.components)return{code:cn};const m={};for(const S in o.components){const k=o.components[S];if(typeof k=="string"){m[S]=k;continue}m[S]=$=>i.jsx(k,{...$,onSendMessage:r})}return m},[r,o.components]),{contentRender:U=(m,S)=>m?i.jsx(et,{paragraphTag:"div",content:m,components:G,...S.role==="user"?{config:{breaks:!0}}:{}}):null,footerRender:F=({message:m})=>{if(m.error)return i.jsx("div",{children:i.jsx(et,{content:m.error,components:G})})}}=o,re=p.useMemo(()=>(s||[]).map(m=>{const S=xe(m.message.hitlCards);return{...m.message,key:m.id,...S.length?{variant:"borderless",styles:{...m.message.content?{}:{content:{display:"none"}},body:{width:"100%",maxWidth:"100%"},footer:{width:"100%"}}}:{},contentRender:(k,$)=>U(k,{...$,role:m.message.role},r),footer:(k,$)=>{const K=F==null?void 0:F(m,$,r),V=_&&m.message.role==="assistant"?m.message.toolCalls??[]:[],Y=m.message.content||"",b=m.status==="loading"||m.status==="updating",z=Y||V.length>0?i.jsx(Vt,{text:Y,tools:V,live:b,align:m.message.role==="user"?"end":"start"},b?"live":"settled"):null;if(!S.length)return!z&&!K?void 0:i.jsxs(ae,{vertical:!0,gap:8,style:{width:V.length>0?"100%":void 0},children:[z,K]});const le=(u==null?void 0:u.messageId)===m.id;return i.jsxs(ae,{className:"hitl-card-stack",vertical:!0,gap:8,style:{width:"100%"},children:[z,K||null,S.map(D=>{const O=`${m.id}:${D.tool_call_id}`,E=oe[O]||D.selected_option_id;return i.jsx(zt,{card:E&&E!==D.selected_option_id?{...D,selected_option_id:E}:D,submitting:le,onSelect:le?void 0:ie=>{L(Ce=>({...Ce,[O]:ie})),f==null||f(m.id,D.tool_call_id,ie)}},D.tool_call_id)})]})}}}).filter(m=>{var S;return m.content||xe(m.hitlCards).length||_&&(((S=m.toolCalls)==null?void 0:S.length)??0)>0}),[s,U,F,r,u,f,oe,_]);return i.jsx("div",{className:q.chatList,children:i.jsx(se,{spinning:c,children:i.jsx(Jt.List,{items:re,style:{height:"100%",paddingInline:a==="classic"?"16px":a==="float-sidebar"?"0px":"16px"},roles:{assistant:{placement:"start",loadingRender:()=>i.jsx(se,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>i.jsx(se,{size:"small"})},user:{placement:"end"}}})})})},$n=({bubble:o={},ephemeralSystemPrompts:s,clientTools:c,defaultSkillDomains:a})=>{const{layout:r,setVisible:u,setLayout:f,onCallAI:_,activeConversationKey:q,setActiveConversationKey:oe,conversations:L,fetchConversationsLoading:G,getEphemeralSystemPrompts:U,getClientTools:F,registerGlobalAI:re}=Ht(),{t:m}=Xe("ai"),{t:S}=Xe("common"),{styles:k}=at(),{siteConfig:$}=Nt(),K=($==null?void 0:$.show_tool_calls)??!1;ne=K;const V=e=>({key:e.id,label:e.title,group:De(e.start_time).isSame(De(),"day")?m("chat.today"):De(e.start_time).format("YYYY-MM-DD")}),{conversations:Y,activeConversationKey:b,setActiveConversationKey:z,addConversation:le,setConversations:D,getConversation:O,setConversation:E,removeConversation:ie,getMessages:Ce}=Bt({defaultActiveConversationKey:q,defaultConversations:(L==null?void 0:L.map(e=>V(e)))||[]});p.useEffect(()=>{oe(b)},[b]);const{message:ce}=kt.useApp(),[Ee,He]=p.useState(""),[ct,ut]=p.useState(!1),ve=(a==null?void 0:a.join("\0"))??"",_e=p.useMemo(()=>be(ve?ve.split("\0"):[]),[ve]),ke=(s==null?void 0:s.join("\0"))??"",Se=p.useMemo(()=>be(ke?ke.split("\0"):[]),[ke]);p.useEffect(()=>{if(!(Se.length===0&&!(c!=null&&c.length)))return re({ephemeralSystemPrompts:Se,tools:c})},[Se,c,re]);const[J,je]=p.useState(()=>_e.map(e=>({type:"domain",value:e})));p.useEffect(()=>{je(e=>{const t=e.filter(n=>n.type==="skill");return[..._e.map(n=>({type:"domain",value:n})),...t]})},[_e]);const{data:Ne}=W(()=>M.system.listSkillDomains()),{data:ue}=W(()=>M.system.listSkills({current:1,page_size:500})),Pe=p.useMemo(()=>[...(Ne??[]).map(e=>({skillType:"domain",key:e,label:i.jsxs(i.Fragment,{children:[i.jsx(We,{children:m("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((ue==null?void 0:ue.data)??[]).map(e=>({skillType:"skill",key:e.id,label:i.jsxs(i.Fragment,{children:[i.jsx(We,{children:m("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[ue,Ne]),[Q,Ve]=p.useState(),{onRequest:B,messages:x,isRequesting:Z,abort:dt,onReload:ft,setMessages:we,setMessage:H}=Mt({provider:ln(b),conversationKey:b,defaultMessages:[],requestPlaceholder:()=>({content:S("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>on(t)?{content:"",role:"assistant"}:t instanceof an?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),N=p.useCallback(()=>{const e={domains:J.filter(l=>l.type==="domain").map(l=>l.value),skill_ids:J.filter(l=>l.type==="skill").map(l=>l.value)},t=be(U());t.length>0&&(e.ephemeral_system_prompts=t);const n=F();return n.length>0&&(e.client_tools=n.map(l=>({name:l.name,description:l.description,parameters:l.parameters}))),e},[J,U,F]),mt=p.useRef(new Map),Ie=p.useRef(new Map),ee=p.useRef(b);ee.current=b;const w=p.useRef(!1),P=p.useRef(!1),Re=p.useRef(0),j=p.useRef(null),R=p.useRef(null),ze=p.useRef(()=>{}),te=p.useRef(null),[X,T]=p.useState(null);it.onChunk=e=>{const t=R.current;t&&t.conversationId===e&&(t.streamStarted=!0);const n=te.current;n&&n.conversationId===e&&(n.streamStarted=!0)};const de=p.useCallback(async e=>{const t=[],n=F();for(const l of e){if(l.name==="ui_choose")continue;const g=n.find(d=>d.name===l.name);if(!g){t.push({tool_call_id:l.id,content:JSON.stringify({error:`Client tool "${l.name}" is not available on the current page`,available_tools:n.map(d=>d.name)})});continue}try{const d=await Promise.resolve(g.handler(l.arguments));t.push({tool_call_id:l.id,content:d!=null&&d.trim()?d:JSON.stringify({ok:!0})})}catch(d){const h=d instanceof Error?d.message:String(d);t.push({tool_call_id:l.id,content:JSON.stringify({error:h})})}}return t},[F]),fe=p.useCallback((e,t)=>{const n=Ie.current.get(e);if(n&&n.calls===t)return n.promise;const l=de(t);return Ie.current.set(e,{calls:t,promise:l}),l},[de]),me=p.useCallback(e=>{e&&Ie.current.delete(e)},[]),Be=p.useCallback(async e=>{if(e.filter(l=>l.name!=="ui_choose").length===0)return;const n=await de(e);B({content:"",client_tool_results:n,...N()})},[de,B,N]),Te=p.useCallback(()=>{const e=j.current;!e||e.streamRequested||e.posted||(Re.current+=1,j.current=null,w.current=!1,P.current=!1,R.current=null,T(null),e.revert())},[]),Me=p.useCallback(async(e,t,n,l)=>{if(w.current)return;const g=++Re.current,d=ee.current;if(!d){T(null);return}const h=n.map(v=>v.tool_call_id),y=()=>sn(H,e,h),C={generation:g,streamRequested:!1,posted:!1,revert:y};j.current=C,w.current=!0;try{let v=[];if(t!=null&&t.length&&(v=await fe(d,t)),Re.current!==g||ee.current!==d){j.current===C&&(j.current=null,w.current=!1,P.current=!1,R.current=null,T(null),y());return}R.current={conversationId:d,messageId:e,decisionIDs:h,streamStarted:!1,reconciling:!1,submit:l},C.posted=!0,B({content:"",...v.length>0?{client_tool_results:v}:{},hitl_decisions:n,...N()})}catch{const v=R.current;if(C.posted&&v&&j.current===C){v.reconciling||(v.reconciling=!0,ze.current(v));return}R.current=null,j.current===C&&(j.current=null),w.current=!1,P.current=!1,T(null),y()}},[fe,B,N,H]),pe=p.useCallback(()=>{const e=ee.current,t=we;let n=[],l;if(t(g=>{var y;n=[],l=(y=g[g.length-1])==null?void 0:y.id;let d=!1;const h=g.map(C=>{const v=C.message.hitlCards;return v!=null&&v.some(A=>A.status==="pending")?(d=!0,n.push({id:C.id,cards:v}),{...C,message:{...C.message,hitlCards:v.map(A=>A.status==="pending"?{...A,status:"abandoned"}:A)}}):C});return d?h:g}),e&&n.length>0){const g=n;te.current={conversationId:e,afterMessageId:l,streamStarted:!1,restore:()=>{t(d=>d.map(h=>{const y=g.find(C=>C.id===h.id);return y?{...h,message:{...h.message,hitlCards:y.cards}}:h}))}}}T(null)},[we]),pt=p.useCallback((e,t,n)=>{if(X||w.current)return;let l;if(!H(e,h=>{const y=h.message.hitlCards,C=y==null?void 0:y.find(I=>I.tool_call_id===t);if(!y||!C||C.status!=="pending")return{};const v=y.map(I=>I.tool_call_id===t?{...I,selected_option_id:n}:I),A=v.filter(I=>I.status==="pending");return A.length>0&&A.every(I=>I.selected_option_id)&&(l={calls:h.message.pendingClientToolCalls,decisions:A.map(I=>({tool_call_id:I.tool_call_id,option_id:I.selected_option_id}))}),{message:{...h.message,hitlCards:v}}})||!l)return;const d={messageId:e,toolCallId:t,optionId:n};T(d),Me(e,l.calls,l.decisions,d)},[X,H,Me]);p.useEffect(()=>{const e=j.current;e&&!e.streamRequested&&Te();const t=R.current;if(t&&b===t.conversationId&&!t.streamStarted){w.current=!0,T(t.submit);return}(!t||t.conversationId!==b)&&(w.current=!1),T(null)},[b,Te]),p.useEffect(()=>{const e=j.current;if(Z){e&&(e.streamRequested=!0),(e||w.current)&&(P.current=!0);return}P.current&&(P.current=!1,w.current=!1)},[Z]);const qe=p.useCallback(e=>{e.streamStarted=!0,H(e.messageId,t=>{var g;const n=(g=t.message.hitlCards)==null?void 0:g.map(d=>e.decisionIDs.includes(d.tool_call_id)&&d.status==="pending"?{...d,status:"decided"}:d),l=ne?nt(n,e.decisionIDs):[];return{message:{...t.message,hitlCards:n,...l.length?{toolCalls:ye(t.message.toolCalls,l)}:{}}}}),me(e.conversationId),R.current=null,j.current=null,w.current=!1,P.current=!1,T(null)},[me,H]),Ke=p.useCallback(()=>{R.current=null,j.current=null,w.current=!1,P.current=!1,T(null)},[]),Ae=p.useCallback(async e=>{let t=null;try{const n=await M.ai.getChatSession({sessionId:e.conversationId});t=new Map;for(const l of n.messages??[])for(const g of tt(l.metadata)??[])t.set(g.tool_call_id,g)}catch{t=null}if(ee.current!==e.conversationId||R.current!==e){e.reconciling=!1;return}H(e.messageId,n=>{var d;const l=(d=n.message.hitlCards)==null?void 0:d.map(h=>{if(!e.decisionIDs.includes(h.tool_call_id)||h.status==="abandoned")return h;const y=t==null?void 0:t.get(h.tool_call_id);return(y==null?void 0:y.status)==="pending"?{...y,status:"pending",selected_option_id:""}:y||{...h,status:"decided"}}),g=ne?nt(l,e.decisionIDs):[];return{message:{...n.message,hitlCards:l,...g.length?{toolCalls:ye(n.message.toolCalls,g)}:{}}}}),Ke()},[Ke,H]);ze.current=e=>{Ae(e)},p.useEffect(()=>{const e=R.current;if(!e||!(x!=null&&x.length)||b!==e.conversationId)return;const t=x.findIndex(l=>l.id===e.messageId);if(t<0)return;const n=[...x.slice(t+1)].reverse().find(l=>l.message.role==="assistant");if(n){if(n.status==="updating"||e.streamStarted||n.status==="success"){qe(e);return}n.status==="loading"||n.status==="local"||e.reconciling||(e.reconciling=!0,Ae(e))}},[x,b,qe,Ae]),p.useEffect(()=>{const e=te.current;if(!e||!(x!=null&&x.length)||b!==e.conversationId||e.afterMessageId!==void 0&&!x.some(l=>l.id===e.afterMessageId))return;const t=e.afterMessageId===void 0?-1:x.findIndex(l=>l.id===e.afterMessageId),n=[...x.slice(t+1)].reverse().find(l=>l.message.role==="assistant");if(n&&!((n.status==="loading"||n.status==="local")&&!e.streamStarted)){if(n.status==="updating"||n.status==="success"||e.streamStarted){te.current=null,me(e.conversationId);return}te.current=null,e.restore()}},[x,b,me]),p.useEffect(()=>{var l;if(Z||!(x!=null&&x.length)||!b)return;const e=x[x.length-1],t=(l=e==null?void 0:e.message)==null?void 0:l.pendingClientToolCalls;if(!(t!=null&&t.length))return;const n=mt.current;if(n.get(b)!==t){if(n.set(b,t),ot(e.message.hitlCards)){t.every(g=>g.hitlFromHistory)||fe(b,t);return}Be(t)}},[Z,x,b,fe,Be]);const Oe=e=>{if(!(!e||X)){if(!b){ge(e);return}pe(),B({content:e,...N()})}},{run:gt,loading:ht}=W(async e=>await M.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{ce.error(m("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{var g;if(x&&x.length>0&&(x[x.length-1].status==="loading"||x.length>e.messages.length))return;const t=[];let n={id:"",message:{content:"",role:"assistant"},status:"success"};const l=()=>{var y;const d=xe(n.message.hitlCards),h=n.message.toolCalls??[];n.message.content.length===0&&!d.length&&h.length===0||t.push({id:n.id,message:{content:n.message.content,role:n.message.role,...h.length?{toolCalls:h}:{},...d.length?{hitlCards:d}:{},...d.length&&((y=n.message.pendingClientToolCalls)!=null&&y.length)?{pendingClientToolCalls:n.message.pendingClientToolCalls}:{}},status:n.status})};for(const d of e.messages)switch(d.role){case"assistant":n.status=d.status==="completed"&&n.status==="success"?"success":"error",n.message.role="assistant",n.id!==d.id&&d.content&&(n.message.content=d.content),n.id=d.id;{const h=tt(d.metadata),y=ne?en(d.tool_calls,h):[];if(y.length&&(n.message.toolCalls=ye(n.message.toolCalls,y)),h!=null&&h.length){n.message.hitlCards=[...n.message.hitlCards??[],...h];const C=Zt(d.tool_calls,h);C!=null&&C.length&&(n.message.pendingClientToolCalls=[...n.message.pendingClientToolCalls??[],...C])}}break;case"user":(n.message.content.length>0||xe(n.message.hitlCards).length||(((g=n.message.toolCalls)==null?void 0:g.length)??0)>0)&&(l(),n={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:d.id,message:{content:d.content,role:d.role},status:d.status==="completed"?"success":"error"});break}l(),we(t)}}),{run:ge,loading:Le}=W(async(e,t,n=!1,l)=>({session:await M.ai.createChatSession({title:m("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:n}),message:e,domains:l}),{manual:!0,onError:()=>{ce.error(m("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:({session:e,message:t,domains:n})=>{le(V(e),"prepend"),z(e.id),t&&Ve({message:t,sessionId:e.id,domains:n})}});p.useEffect(()=>{D((L==null?void 0:L.map(e=>V(e)))||[])},[L]);const{run:bt}=W(async e=>await M.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){ce.error(m("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const n=O(t);n&&E(t,{...n,loading:!1})},onSuccess(e,[t]){ie(t)}}),{run:yt}=W(async e=>M.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const n=O(t);n&&E(t,{...n,title:e,loading:!1})},onError:(e,[t])=>{ce.error(m("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const n=O(t);n&&E(t,{...n,loading:!1})}});p.useEffect(()=>{if(b&&(Q==null?void 0:Q.sessionId)===b){const{message:e,domains:t}=Q;setTimeout(()=>{pe(),B({content:e,...N(),...t!==void 0?{domains:t}:{}})},1e3),Ve(void 0)}},[b,Q,N,pe]),p.useEffect(()=>{if(b){const e=Ce(b);if(e&&e.length>0)return;gt(b)}},[b]);const Je=p.useRef(()=>{});Je.current=(e,t)=>{const n=Pt(t),l=n.domains!==void 0?be(n.domains):void 0;if(l!==void 0&&je(g=>[...l.map(d=>({type:"domain",value:d})),...g.filter(d=>d.type==="skill")]),n.newSession===!1&&b){if(X)return;pe(),B({content:e,...N(),...l!==void 0?{domains:l}:{}});return}ge(e,n.messages,n.anonymous??!0,l)},p.useEffect(()=>{_&&_((e,t)=>{Je.current(e,t)})},[_]);const xt=i.jsxs("div",{className:k.sider,children:[i.jsx(he,{onClick:()=>{ge()},type:"link",className:k.addBtn,icon:i.jsx(Ge,{}),loading:Le,children:m("chat.newConversation",{defaultValue:"New Conversation"})}),i.jsx(se,{spinning:G,wrapperClassName:k.conversationsSpin,children:i.jsx(qt,{items:Y,activeKey:b,onActiveChange:async e=>{e&&z(e)},className:k.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:m("chat.regenerateTitle"),key:"regenerateTitle",icon:i.jsx(St,{}),onClick:()=>{E(e.key,{...e,loading:!0}),yt(e.key)}},{label:S("delete"),key:"delete",icon:i.jsx(jt,{}),danger:!0,onClick:()=>{E(e.key,{...e,loading:!0}),bt(e.key)}}]})})})]}),Ct=i.jsx(i.Fragment,{children:i.jsx(Ue,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:i.jsx(Ze,{footer:e=>i.jsxs(ae,{justify:"space-between",align:"center",children:[i.jsx(ae,{gap:"small",align:"center",children:i.jsx(Qe,{open:ct,onOpenChange:(t,n)=>{(n.source==="trigger"||t)&&ut(t)},menu:{selectedKeys:J.map(t=>t.value),onClick:t=>{const n=Pe.find(l=>l.key===t.key);je(l=>l.some(g=>g.value===t.key)?l.filter(g=>g.value!==t.key):[...l,{type:(n==null?void 0:n.skillType)||"skill",value:t.key}])},items:Pe.map(t=>({label:t.label,key:t.key}))},children:i.jsxs(Ze.Switch,{value:!1,icon:i.jsx(wt,{}),children:[m("chat.skill",{defaultValue:"Skills"})," ","(",J.length>0?m("chat.skillsSelected",{defaultValue:"{{count}} selected",count:J.length}):m("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),i.jsx(ae,{align:"center",children:e})]}),suffix:!1,value:Ee,onSubmit:async()=>{Oe(Ee.trim()),He("")},onChange:He,onCancel:()=>{const e=j.current;if(e&&!e.streamRequested){Te();return}dt()},loading:Z||X!==null,className:Ye(k.sender,"chat-sender"),placeholder:m("chat.inputPlaceholder")})})});return i.jsx(Kt,{children:i.jsxs(un.Provider,{value:{onReload:ft,setMessage:H},children:[i.jsxs("div",{className:Ye(k.layoutSelector,"ai-chat-layout-selector",r==="float-sidebar"&&k.layoutSelectorDraggable),style:{height:"50px",width:"100%",position:"relative"},children:[i.jsx(It.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:i.jsx($e,{title:m("chat.layoutModal",{defaultValue:"Modal"}),children:i.jsx("span",{children:i.jsx(Rt,{})})}),value:"classic"},{label:i.jsx($e,{title:m("chat.layoutSidebar",{defaultValue:"Sidebar"}),children:i.jsx("span",{children:i.jsx(Tt,{})})}),value:"sidebar"},{label:i.jsx($e,{title:m("chat.layoutFloat",{defaultValue:"Float"}),children:i.jsx("span",{children:i.jsx(At,{})})}),value:"float-sidebar"}],optionType:"button",onChange:e=>f(e.target.value),value:r}),i.jsxs(Ue,{style:{float:"right",marginTop:10},children:[i.jsx(he,{type:"primary",onClick:()=>{ge()},loading:Le,icon:i.jsx(Ge,{}),style:{display:r==="classic"?"none":"block"}}),i.jsx(Qe,{menu:{items:Y.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{z(e)}},placement:"bottomRight",children:i.jsx(he,{icon:G?i.jsx(se,{size:"small"}):i.jsx(Lt,{}),style:{display:r==="classic"?"none":"block"}})}),i.jsx(he,{type:"text",onClick:()=>u(!1),children:i.jsx(Ft,{})})]})]}),i.jsxs("div",{className:r==="classic"?k.classicLayout:k.siderLayout,style:{minWidth:r==="classic"?"500px":"400px"},children:[r==="classic"?xt:null,i.jsxs("div",{className:k.chat,children:[i.jsx(dn,{bubble:o,messages:x,loading:ht||Le,layout:r,onSendMessage:Oe,hitlSubmitting:X,onHITLSelect:pt,showToolCalls:K}),Ct]})]})]})})};export{$n as AIChat,$n as default};
