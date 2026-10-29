var Ct=Object.defineProperty;var vt=(o,s,l)=>s in o?Ct(o,s,{enumerable:!0,configurable:!0,writable:!0,value:l}):o[s]=l;var Fe=(o,s,l)=>vt(o,typeof s!="symbol"?s+"":s,l);import{u as Xe,r as m,z as _t,d as U,j as u,q as Ge,B as he,bp as Je,S as oe,bd as kt,bh as St,v as We,a as jt,ac as re,D as Ue,eF as wt,bq as It,eG as Rt,eH as Tt,eI as At,c4 as Lt,cB as Ft,b as Ht,c0 as He,E as Et,aB as nt}from"./vendor.CRldfr7p.js";import{a as M}from"./index.QVdcYTjv.js";import{d as Dt,b as $t,n as Bt}from"./contexts.Qa9QXZhB.js";import{u as Nt,a as zt,C as Pt,S as Ye,X as qt,b as Mt,c as Qe,F as Vt,A as Kt,M as Ot,d as Xt}from"./ant-design-x.BMTpqtxU.js";import{C as Gt,n as Jt}from"./components.ZzkcaPD0.js";import{a as Wt,o as Ut}from"./highlighter.NzqdXQ8c.js";import"./vite.CnSqVV0U.js";import"./lodash.Bb75kzRV.js";import"./highlight.DHmnecVl.js";import"./ai.DsB8_KyC.js";import"./client.MFm3WK-R.js";import"./base.BdNzkkj-.js";import"./authorization.sx0ZXJfV.js";import"./inbox.BhxnmVqH.js";import"./system.oq5LHtx8.js";import"./oauth.BLkh2SjC.js";import"./tasks.qFYPuDox.js";import"./ai-chat-layout.W8sknen-.js";import"./mermaid.Cft3qFi9.js";import"./refractor.CUB5za3D.js";const st=Ht(({token:o,css:s})=>({siderLayout:s`
      width: 100%;
      height: calc(100vh - 60px);
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
      padding-block: ${o.paddingLG}px;
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
      color: ${o.colorText} !important;
    `,senderPrompt:s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${o.colorText};
    `}));function Yt(o){if(o==null||typeof o!="object")return;const s=o;if(typeof s.tool_call_id!="string"||s.tool_call_id===""||s.kind!=="approval"&&s.kind!=="choice"||s.status!=="pending"&&s.status!=="decided"&&s.status!=="abandoned"||typeof s.title!="string"||typeof s.tool_name!="string"||!Array.isArray(s.options))return;const l=[];for(const r of s.options){if(r==null||typeof r!="object")continue;const c=r;typeof c.id!="string"||typeof c.label!="string"||l.push({id:c.id,label:c.label,description:typeof c.description=="string"?c.description:"",primary:c.primary===!0})}let a="";if(typeof s.arguments=="string")a=s.arguments;else if(s.arguments!=null)try{a=JSON.stringify(s.arguments)}catch{a=""}return{tool_call_id:s.tool_call_id,kind:s.kind,title:s.title,tool_name:s.tool_name,arguments:a,description:"",options:l,status:s.status,selected_option_id:typeof s.selected_option_id=="string"?s.selected_option_id:""}}function Ze(o){const s=o;if(s==null||typeof s!="object")return;const l=s.hitl_cards;if(!Array.isArray(l))return;const a=[];for(const r of l){const c=Yt(r);c&&a.push(c)}return a.length>0?a:void 0}function at(o){return!!(o!=null&&o.some(s=>s.status==="pending"))}function xe(o){return(o??[]).filter(s=>s.status==="pending")}function Qt(o,s){var r;if(!at(s))return;const l=new Set(s.map(c=>c.tool_call_id)),a=[];for(const c of o??[]){const f=(r=c==null?void 0:c.function)==null?void 0:r.name;!(c!=null&&c.id)||!f||!f.startsWith("ui_")||f==="ui_choose"||l.has(c.id)||a.push({id:c.id,name:f,arguments:typeof c.function.arguments=="string"?c.function.arguments:"",hitlFromHistory:!0})}return a.length>0?a:void 0}function ot(o){return!!o&&(o==="ui_choose"||o.startsWith("ui_"))}function rt(o){return!!o&&o.kind==="approval"&&o.status==="decided"&&o.selected_option_id==="approve"}function et(o,s){const l=new Set(s),a=[];for(const r of o??[])!l.has(r.tool_call_id)||!rt(r)||!r.tool_name||a.push({id:r.tool_call_id,name:r.tool_name,arguments:r.arguments||"",status:"completed"});return a}function Zt(o,s){var r,c;const l=new Map((s??[]).map(f=>[f.tool_call_id,f])),a=[];for(const f of o??[]){const k=(r=f==null?void 0:f.function)==null?void 0:r.name;if(!(f!=null&&f.id)||!k||ot(k))continue;const V=l.get(f.id);V&&!rt(V)||a.push({id:f.id,name:k,arguments:typeof((c=f.function)==null?void 0:c.arguments)=="string"?f.function.arguments:"",status:"completed",title:f.title||void 0})}return a}function en(o){var l,a;const s=[];for(const r of o??[]){const c=(l=r==null?void 0:r.function)==null?void 0:l.name;if(!(r!=null&&r.id)||!c||ot(c))continue;const f=r.status==="pending"||r.status==="running"||r.status==="failed"||r.status==="completed"?r.status:"running";s.push({id:r.id,name:c,arguments:typeof((a=r.function)==null?void 0:a.arguments)=="string"?r.function.arguments:"",status:f,title:r.title||void 0})}return s}function ye(o,s){const l=[...o??[]];for(const a of s){const r=l.findIndex(c=>c.id===a.id);r>=0?l[r]={...l[r],...a,arguments:a.arguments||l[r].arguments,title:a.title||l[r].title}:l.push(a)}return l}function tn(o,s){if(!(o!=null&&o.length)||!(s!=null&&s.length))return o;const l=new Set(s.map(r=>r.tool_call_id)),a=o.filter(r=>!l.has(r.id));return a.length>0?a:void 0}let ae=!1;const it={onChunk:o=>{}};function nn(o,s,l){o(s,a=>{var r;return{message:{...a.message,hitlCards:(r=a.message.hitlCards)==null?void 0:r.map(c=>l.includes(c.tool_call_id)&&c.status!=="abandoned"?{...c,status:"pending",selected_option_id:""}:c)}}})}class sn extends Error{constructor(l,a){super(l);Fe(this,"buffer");this.buffer=a}}function an(o){if(o==null||typeof o!="object")return!1;const s=o;if(s.name==="AbortError")return!0;const l=typeof s.message=="string"?s.message:"";return/aborted/i.test(l)||/BodyStreamBuffer/i.test(l)}class on extends Kt{constructor(){super(...arguments);Fe(this,"conversationKey","")}transformParams(l,a){if(typeof l!="object")throw new Error("requestParams must be an object");return{...(a==null?void 0:a.params)||{},...l||{}}}transformLocalMessage({content:l}){return{content:l,role:"user"}}transformMessage(l){const{originMessage:a,chunk:r,status:c}=l||{};if(!r)return{...a,content:(a==null?void 0:a.content)||"",role:"assistant",status:c};c==="updating"&&it.onChunk(this.conversationKey);let f;try{f=JSON.parse(r.data)}catch{return{...a,content:(a==null?void 0:a.content)||"",role:"assistant",status:c}}const k=f.message_id===(a==null?void 0:a.messageId)?`${(a==null?void 0:a.content)||""}${f.content||""}`:f.content||"";switch(f.event_type){case"tool_call":return{...a,content:k,role:"assistant",messageId:f.message_id,toolCalls:ae?ye(a==null?void 0:a.toolCalls,en(f.tool_calls)):a==null?void 0:a.toolCalls,status:c};case"content":return{...a,content:k,role:"assistant",messageId:f.message_id,status:c};case"error":return{...a,content:k,role:"assistant",error:f.content,messageId:f.message_id,status:c};case"client_tool_pending":return{...a,content:k||"",role:"assistant",pendingClientToolCalls:f.client_tool_calls,messageId:f.message_id,status:c};case"hitl_pending":return{...a,content:k||"",role:"assistant",pendingClientToolCalls:f.client_tool_calls,hitlCards:f.hitl_cards,toolCalls:tn(a==null?void 0:a.toolCalls,f.hitl_cards),messageId:f.message_id,status:c};default:return{...a,content:k||(a==null?void 0:a.content)||"",role:"assistant",messageId:f.message_id||(a==null?void 0:a.messageId),status:c}}}}const tt=new Map,rn=o=>{let s=tt.get(o);return s||(s=new on({request:Mt(`/api/ai/chat/sessions/${o}`,{manual:!0,middlewares:{onRequest:async(l,a)=>{const r=localStorage.getItem("orgID"),{sessionId:c}=a.params??{},f={...a.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...r?{"X-Scope-OrgID":r}:{}};return[c?`/api/ai/chat/sessions/${c}`:l,{...a,headers:f}]}}})}),tt.set(o,s)),s.conversationKey=o,s},ln=o=>{var f;const{className:s,children:l}=o,a=((f=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:f[1])||"",{isDarkMode:r}=nt(),c=r?Wt:Ut;return typeof l!="string"?null:a==="mermaid"?u.jsx(Ot,{children:l}):u.jsx(Xt,{highlightProps:{style:{...c,'pre[class*="language-"]':{...c['pre[class*="language-"]'],margin:0,borderRadius:0}}},lang:a,children:l})},cn=Et.createContext({});function be(o){if(!o||o.length===0)return[];const s=new Set,l=[];for(const a of o){const r=a.trim();!r||s.has(r)||(s.add(r),l.push(r))}return l}const un=({bubble:o={},messages:s,loading:l,layout:a="classic",onSendMessage:r,hitlSubmitting:c,onHITLSelect:f,showToolCalls:k=!1})=>{const{styles:V}=st(),{isDarkMode:Ce}=nt(),[A,ie]=m.useState({}),Y=m.useMemo(()=>{if(!o.components)return{code:ln};const h={};for(const v in o.components){const E=o.components[v];if(typeof E=="string"){h[v]=E;continue}h[v]=K=>u.jsx(E,{...K,onSendMessage:r})}return h},[r,o.components]),{contentRender:N=h=>h?u.jsx(Qe,{paragraphTag:"div",content:h,className:Ce?"x-markdown-dark":"x-markdown-light",components:Y}):null,footerRender:z=({message:h})=>{if(h.error)return u.jsx("div",{children:u.jsx(Qe,{content:h.error,components:Y})})}}=o,S=m.useMemo(()=>(s||[]).map(h=>{const v=xe(h.message.hitlCards);return{...h.message,key:h.id,...v.length?{variant:"borderless",styles:{...h.message.content?{}:{content:{display:"none"}},body:{width:"100%",maxWidth:"100%"},footer:{width:"100%"}}}:{},contentRender:N,footer:(E,K)=>{const P=z==null?void 0:z(h,K,r),O=k&&h.message.role==="assistant"?h.message.toolCalls??[]:[],b=h.message.content||"",X=h.status==="loading"||h.status==="updating",Q=b||O.length>0?u.jsx(Gt,{text:b,tools:O,live:X,align:h.message.role==="user"?"end":"start"},X?"live":"settled"):null;if(!v.length)return!Q&&!P?void 0:u.jsxs(re,{vertical:!0,gap:8,style:{width:O.length>0?"100%":void 0},children:[Q,P]});const le=(c==null?void 0:c.messageId)===h.id;return u.jsxs(re,{className:"hitl-card-stack",vertical:!0,gap:8,style:{width:"100%"},children:[Q,P||null,v.map(R=>{const D=`${h.id}:${R.tool_call_id}`,Z=A[D]||R.selected_option_id;return u.jsx(Jt,{card:Z&&Z!==R.selected_option_id?{...R,selected_option_id:Z}:R,submitting:le,onSelect:le?void 0:ce=>{ie(G=>({...G,[D]:ce})),f==null||f(h.id,R.tool_call_id,ce)}},R.tool_call_id)})]})}}}).filter(h=>{var v;return h.content||xe(h.hitlCards).length||k&&(((v=h.toolCalls)==null?void 0:v.length)??0)>0}),[s,N,z,r,c,f,A,k]);return u.jsx("div",{className:V.chatList,children:u.jsx(oe,{spinning:l,children:u.jsx(Vt.List,{items:S,style:{height:"100%",paddingInline:a==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>u.jsx(oe,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>u.jsx(oe,{size:"small"})},user:{placement:"end"}}})})})},Fn=({bubble:o={},ephemeralSystemPrompts:s,clientTools:l,defaultSkillDomains:a})=>{const{layout:r,setVisible:c,setLayout:f,onCallAI:k,activeConversationKey:V,setActiveConversationKey:Ce,conversations:A,fetchConversationsLoading:ie,getEphemeralSystemPrompts:Y,getClientTools:N,registerGlobalAI:z}=Dt(),{t:S}=Xe("ai"),{t:h}=Xe("common"),{styles:v}=st(),{siteConfig:E}=$t(),K=(E==null?void 0:E.show_tool_calls)??!1;ae=K;const P=e=>({key:e.id,label:e.title,group:He(e.start_time).isSame(He(),"day")?S("chat.today"):He(e.start_time).format("YYYY-MM-DD")}),{conversations:O,activeConversationKey:b,setActiveConversationKey:X,addConversation:Q,setConversations:le,getConversation:R,setConversation:D,removeConversation:Z,getMessages:ce}=Nt({defaultActiveConversationKey:V,defaultConversations:(A==null?void 0:A.map(e=>P(e)))||[]});m.useEffect(()=>{Ce(b)},[b]);const{message:G}=_t.useApp(),[Ee,De]=m.useState(""),[lt,ct]=m.useState(!1),ve=(a==null?void 0:a.join("\0"))??"",_e=m.useMemo(()=>be(ve?ve.split("\0"):[]),[ve]),ke=(s==null?void 0:s.join("\0"))??"",Se=m.useMemo(()=>be(ke?ke.split("\0"):[]),[ke]);m.useEffect(()=>{if(!(Se.length===0&&!(l!=null&&l.length)))return z({ephemeralSystemPrompts:Se,tools:l})},[Se,l,z]);const[J,je]=m.useState(()=>_e.map(e=>({type:"domain",value:e})));m.useEffect(()=>{je(e=>{const t=e.filter(n=>n.type==="skill");return[..._e.map(n=>({type:"domain",value:n})),...t]})},[_e]);const{data:$e}=U(()=>M.system.listSkillDomains()),{data:ue}=U(()=>M.system.listSkills({current:1,page_size:500})),Be=m.useMemo(()=>[...($e??[]).map(e=>({skillType:"domain",key:e,label:u.jsxs(u.Fragment,{children:[u.jsx(Ge,{children:S("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((ue==null?void 0:ue.data)??[]).map(e=>({skillType:"skill",key:e.id,label:u.jsxs(u.Fragment,{children:[u.jsx(Ge,{children:S("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[ue,$e]),[ee,Ne]=m.useState(),{onRequest:q,messages:x,isRequesting:te,abort:ut,onReload:dt,setMessages:we,setMessage:H}=zt({provider:rn(b),conversationKey:b,defaultMessages:[],requestPlaceholder:()=>({content:h("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>an(t)?{content:"",role:"assistant"}:t instanceof sn?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),$=m.useCallback(()=>{const e={domains:J.filter(i=>i.type==="domain").map(i=>i.value),skill_ids:J.filter(i=>i.type==="skill").map(i=>i.value)},t=be(Y());t.length>0&&(e.ephemeral_system_prompts=t);const n=N();return n.length>0&&(e.client_tools=n.map(i=>({name:i.name,description:i.description,parameters:i.parameters}))),e},[J,Y,N]),ft=m.useRef(new Map),Ie=m.useRef(new Map),ne=m.useRef(b);ne.current=b;const w=m.useRef(!1),B=m.useRef(!1),Re=m.useRef(0),j=m.useRef(null),T=m.useRef(null),ze=m.useRef(()=>{}),se=m.useRef(null),[W,L]=m.useState(null);it.onChunk=e=>{const t=T.current;t&&t.conversationId===e&&(t.streamStarted=!0);const n=se.current;n&&n.conversationId===e&&(n.streamStarted=!0)};const de=m.useCallback(async e=>{const t=[],n=N();for(const i of e){if(i.name==="ui_choose")continue;const p=n.find(d=>d.name===i.name);if(!p){t.push({tool_call_id:i.id,content:JSON.stringify({error:`Client tool "${i.name}" is not available on the current page`,available_tools:n.map(d=>d.name)})});continue}try{const d=await Promise.resolve(p.handler(i.arguments));t.push({tool_call_id:i.id,content:d!=null&&d.trim()?d:JSON.stringify({ok:!0})})}catch(d){const g=d instanceof Error?d.message:String(d);t.push({tool_call_id:i.id,content:JSON.stringify({error:g})})}}return t},[N]),fe=m.useCallback((e,t)=>{const n=Ie.current.get(e);if(n&&n.calls===t)return n.promise;const i=de(t);return Ie.current.set(e,{calls:t,promise:i}),i},[de]),me=m.useCallback(e=>{e&&Ie.current.delete(e)},[]),Pe=m.useCallback(async e=>{if(e.filter(i=>i.name!=="ui_choose").length===0)return;const n=await de(e);q({content:"",client_tool_results:n,...$()})},[de,q,$]),Te=m.useCallback(()=>{const e=j.current;!e||e.streamRequested||e.posted||(Re.current+=1,j.current=null,w.current=!1,B.current=!1,T.current=null,L(null),e.revert())},[]),qe=m.useCallback(async(e,t,n,i)=>{if(w.current)return;const p=++Re.current,d=ne.current;if(!d){L(null);return}const g=n.map(_=>_.tool_call_id),y=()=>nn(H,e,g),C={generation:p,streamRequested:!1,posted:!1,revert:y};j.current=C,w.current=!0;try{let _=[];if(t!=null&&t.length&&(_=await fe(d,t)),Re.current!==p||ne.current!==d){j.current===C&&(j.current=null,w.current=!1,B.current=!1,T.current=null,L(null),y());return}T.current={conversationId:d,messageId:e,decisionIDs:g,streamStarted:!1,reconciling:!1,submit:i},C.posted=!0,q({content:"",..._.length>0?{client_tool_results:_}:{},hitl_decisions:n,...$()})}catch{const _=T.current;if(C.posted&&_&&j.current===C){_.reconciling||(_.reconciling=!0,ze.current(_));return}T.current=null,j.current===C&&(j.current=null),w.current=!1,B.current=!1,L(null),y()}},[fe,q,$,H]),pe=m.useCallback(()=>{const e=ne.current,t=we;let n=[],i;if(t(p=>{var y;n=[],i=(y=p[p.length-1])==null?void 0:y.id;let d=!1;const g=p.map(C=>{const _=C.message.hitlCards;return _!=null&&_.some(F=>F.status==="pending")?(d=!0,n.push({id:C.id,cards:_}),{...C,message:{...C.message,hitlCards:_.map(F=>F.status==="pending"?{...F,status:"abandoned"}:F)}}):C});return d?g:p}),e&&n.length>0){const p=n;se.current={conversationId:e,afterMessageId:i,streamStarted:!1,restore:()=>{t(d=>d.map(g=>{const y=p.find(C=>C.id===g.id);return y?{...g,message:{...g.message,hitlCards:y.cards}}:g}))}}}L(null)},[we]),mt=m.useCallback((e,t,n)=>{if(W||w.current)return;let i;if(!H(e,g=>{const y=g.message.hitlCards,C=y==null?void 0:y.find(I=>I.tool_call_id===t);if(!y||!C||C.status!=="pending")return{};const _=y.map(I=>I.tool_call_id===t?{...I,selected_option_id:n}:I),F=_.filter(I=>I.status==="pending");return F.length>0&&F.every(I=>I.selected_option_id)&&(i={calls:g.message.pendingClientToolCalls,decisions:F.map(I=>({tool_call_id:I.tool_call_id,option_id:I.selected_option_id}))}),{message:{...g.message,hitlCards:_}}})||!i)return;const d={messageId:e,toolCallId:t,optionId:n};L(d),qe(e,i.calls,i.decisions,d)},[W,H,qe]);m.useEffect(()=>{const e=j.current;e&&!e.streamRequested&&Te();const t=T.current;if(t&&b===t.conversationId&&!t.streamStarted){w.current=!0,L(t.submit);return}(!t||t.conversationId!==b)&&(w.current=!1),L(null)},[b,Te]),m.useEffect(()=>{const e=j.current;if(te){e&&(e.streamRequested=!0),(e||w.current)&&(B.current=!0);return}B.current&&(B.current=!1,w.current=!1)},[te]);const Me=m.useCallback(e=>{e.streamStarted=!0,H(e.messageId,t=>{var p;const n=(p=t.message.hitlCards)==null?void 0:p.map(d=>e.decisionIDs.includes(d.tool_call_id)&&d.status==="pending"?{...d,status:"decided"}:d),i=ae?et(n,e.decisionIDs):[];return{message:{...t.message,hitlCards:n,...i.length?{toolCalls:ye(t.message.toolCalls,i)}:{}}}}),me(e.conversationId),T.current=null,j.current=null,w.current=!1,B.current=!1,L(null)},[me,H]),Ve=m.useCallback(()=>{T.current=null,j.current=null,w.current=!1,B.current=!1,L(null)},[]),Ae=m.useCallback(async e=>{let t=null;try{const n=await M.ai.getChatSession({sessionId:e.conversationId});t=new Map;for(const i of n.messages??[])for(const p of Ze(i.metadata)??[])t.set(p.tool_call_id,p)}catch{t=null}if(ne.current!==e.conversationId||T.current!==e){e.reconciling=!1;return}H(e.messageId,n=>{var d;const i=(d=n.message.hitlCards)==null?void 0:d.map(g=>{if(!e.decisionIDs.includes(g.tool_call_id)||g.status==="abandoned")return g;const y=t==null?void 0:t.get(g.tool_call_id);return(y==null?void 0:y.status)==="pending"?{...y,status:"pending",selected_option_id:""}:y||{...g,status:"decided"}}),p=ae?et(i,e.decisionIDs):[];return{message:{...n.message,hitlCards:i,...p.length?{toolCalls:ye(n.message.toolCalls,p)}:{}}}}),Ve()},[Ve,H]);ze.current=e=>{Ae(e)},m.useEffect(()=>{const e=T.current;if(!e||!(x!=null&&x.length)||b!==e.conversationId)return;const t=x.findIndex(i=>i.id===e.messageId);if(t<0)return;const n=[...x.slice(t+1)].reverse().find(i=>i.message.role==="assistant");if(n){if(n.status==="updating"||e.streamStarted||n.status==="success"){Me(e);return}n.status==="loading"||n.status==="local"||e.reconciling||(e.reconciling=!0,Ae(e))}},[x,b,Me,Ae]),m.useEffect(()=>{const e=se.current;if(!e||!(x!=null&&x.length)||b!==e.conversationId||e.afterMessageId!==void 0&&!x.some(i=>i.id===e.afterMessageId))return;const t=e.afterMessageId===void 0?-1:x.findIndex(i=>i.id===e.afterMessageId),n=[...x.slice(t+1)].reverse().find(i=>i.message.role==="assistant");if(n&&!((n.status==="loading"||n.status==="local")&&!e.streamStarted)){if(n.status==="updating"||n.status==="success"||e.streamStarted){se.current=null,me(e.conversationId);return}se.current=null,e.restore()}},[x,b,me]),m.useEffect(()=>{var i;if(te||!(x!=null&&x.length)||!b)return;const e=x[x.length-1],t=(i=e==null?void 0:e.message)==null?void 0:i.pendingClientToolCalls;if(!(t!=null&&t.length))return;const n=ft.current;if(n.get(b)!==t){if(n.set(b,t),at(e.message.hitlCards)){t.every(p=>p.hitlFromHistory)||fe(b,t);return}Pe(t)}},[te,x,b,fe,Pe]);const Ke=e=>{if(!(!e||W)){if(!b){ge(e);return}pe(),q({content:e,...$()})}},{run:pt,loading:gt}=U(async e=>await M.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{G.error(S("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{var p;if(x&&x.length>0&&(x[x.length-1].status==="loading"||x.length>e.messages.length))return;const t=[];let n={id:"",message:{content:"",role:"assistant"},status:"success"};const i=()=>{var y;const d=xe(n.message.hitlCards),g=n.message.toolCalls??[];n.message.content.length===0&&!d.length&&g.length===0||t.push({id:n.id,message:{content:n.message.content,role:n.message.role,...g.length?{toolCalls:g}:{},...d.length?{hitlCards:d}:{},...d.length&&((y=n.message.pendingClientToolCalls)!=null&&y.length)?{pendingClientToolCalls:n.message.pendingClientToolCalls}:{}},status:n.status})};for(const d of e.messages)switch(d.role){case"assistant":n.status=d.status==="completed"&&n.status==="success"?"success":"error",n.message.role="assistant",n.id!==d.id&&d.content&&(n.message.content=d.content),n.id=d.id;{const g=Ze(d.metadata),y=ae?Zt(d.tool_calls,g):[];if(y.length&&(n.message.toolCalls=ye(n.message.toolCalls,y)),g!=null&&g.length){n.message.hitlCards=[...n.message.hitlCards??[],...g];const C=Qt(d.tool_calls,g);C!=null&&C.length&&(n.message.pendingClientToolCalls=[...n.message.pendingClientToolCalls??[],...C])}}break;case"user":(n.message.content.length>0||xe(n.message.hitlCards).length||(((p=n.message.toolCalls)==null?void 0:p.length)??0)>0)&&(i(),n={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:d.id,message:{content:d.content,role:d.role},status:d.status==="completed"?"success":"error"});break}i(),we(t)}}),{run:ge,loading:Le}=U(async(e,t,n=!1,i)=>({session:await M.ai.createChatSession({title:S("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:n}),message:e,domains:i}),{manual:!0,onError:()=>{G.error(S("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:({session:e,message:t,domains:n})=>{Q(P(e),"prepend"),X(e.id),t&&Ne({message:t,sessionId:e.id,domains:n})}});m.useEffect(()=>{le((A==null?void 0:A.map(e=>P(e)))||[])},[A]);const{run:ht}=U(async e=>await M.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){G.error(S("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const n=R(t);n&&D(t,{...n,loading:!1})},onSuccess(e,[t]){Z(t)}}),{run:bt}=U(async e=>M.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const n=R(t);n&&D(t,{...n,title:e,loading:!1})},onError:(e,[t])=>{G.error(S("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const n=R(t);n&&D(t,{...n,loading:!1})}});m.useEffect(()=>{if(b&&(ee==null?void 0:ee.sessionId)===b){const{message:e,domains:t}=ee;setTimeout(()=>{pe(),q({content:e,...$(),...t!==void 0?{domains:t}:{}})},1e3),Ne(void 0)}},[b,ee,$,pe]),m.useEffect(()=>{if(b){const e=ce(b);if(e&&e.length>0)return;pt(b)}},[b]);const Oe=m.useRef(()=>{});Oe.current=(e,t)=>{const n=Bt(t),i=n.domains!==void 0?be(n.domains):void 0;if(i!==void 0&&je(p=>[...i.map(d=>({type:"domain",value:d})),...p.filter(d=>d.type==="skill")]),n.newSession===!1&&b){if(W)return;pe(),q({content:e,...$(),...i!==void 0?{domains:i}:{}});return}ge(e,n.messages,n.anonymous??!0,i)},m.useEffect(()=>{k&&k((e,t)=>{Oe.current(e,t)})},[k]);const yt=u.jsxs("div",{className:v.sider,children:[u.jsx(he,{onClick:()=>{ge()},type:"link",className:v.addBtn,icon:u.jsx(Je,{}),loading:Le,children:S("chat.newConversation",{defaultValue:"New Conversation"})}),u.jsx(oe,{spinning:ie,wrapperClassName:v.conversationsSpin,children:u.jsx(Pt,{items:O,activeKey:b,onActiveChange:async e=>{e&&X(e)},className:v.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:S("chat.regenerateTitle"),key:"regenerateTitle",icon:u.jsx(kt,{}),onClick:()=>{D(e.key,{...e,loading:!0}),bt(e.key)}},{label:h("delete"),key:"delete",icon:u.jsx(St,{}),danger:!0,onClick:()=>{D(e.key,{...e,loading:!0}),ht(e.key)}}]})})})]}),xt=u.jsx(u.Fragment,{children:u.jsx(We,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:u.jsx(Ye,{footer:e=>u.jsxs(re,{justify:"space-between",align:"center",children:[u.jsx(re,{gap:"small",align:"center",children:u.jsx(Ue,{open:lt,onOpenChange:(t,n)=>{(n.source==="trigger"||t)&&ct(t)},menu:{selectedKeys:J.map(t=>t.value),onClick:t=>{const n=Be.find(i=>i.key===t.key);je(i=>i.some(p=>p.value===t.key)?i.filter(p=>p.value!==t.key):[...i,{type:(n==null?void 0:n.skillType)||"skill",value:t.key}])},items:Be.map(t=>({label:t.label,key:t.key}))},children:u.jsxs(Ye.Switch,{value:!1,icon:u.jsx(wt,{}),children:[S("chat.skill",{defaultValue:"Skills"})," ","(",J.length>0?S("chat.skillsSelected",{defaultValue:"{{count}} selected",count:J.length}):S("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),u.jsx(re,{align:"center",children:e})]}),suffix:!1,value:Ee,onSubmit:async()=>{Ke(Ee.trim()),De("")},onChange:De,onCancel:()=>{const e=j.current;if(e&&!e.streamRequested){Te();return}ut()},loading:te||W!==null,className:jt(v.sender,"chat-sender"),placeholder:S("chat.inputPlaceholder")})})});return u.jsx(qt,{children:u.jsxs(cn.Provider,{value:{onReload:dt,setMessage:H},children:[u.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[u.jsx(It.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:u.jsx(Rt,{style:{transform:"scaleX(-1)"}}),value:"classic"},{label:u.jsx(Tt,{}),value:"sidebar"},{label:u.jsx(At,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>f(e.target.value),value:r}),u.jsxs(We,{style:{float:"right",marginTop:10},children:[u.jsx(he,{type:"primary",onClick:()=>{ge()},loading:Le,icon:u.jsx(Je,{}),style:{display:r==="classic"?"none":"block"}}),u.jsx(Ue,{menu:{items:O.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{X(e)}},placement:"bottomRight",children:u.jsx(he,{icon:ie?u.jsx(oe,{size:"small"}):u.jsx(Lt,{}),style:{display:r==="classic"?"none":"block"}})}),u.jsx(he,{type:"text",onClick:()=>c(!1),children:u.jsx(Ft,{})})]})]}),u.jsxs("div",{className:r==="classic"?v.classicLayout:v.siderLayout,style:{minWidth:r==="classic"?"500px":"400px"},children:[r==="classic"?yt:null,u.jsxs("div",{className:v.chat,children:[u.jsx(un,{bubble:o,messages:x,loading:gt||Le,layout:r,onSendMessage:Ke,hitlSubmitting:W,onHITLSelect:mt,showToolCalls:K}),xt]})]})]})})};export{Fn as AIChat,Fn as default};
