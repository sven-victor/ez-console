var Fe=Object.defineProperty;var ze=(r,o,n)=>o in r?Fe(r,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[o]=n;var le=(r,o,n)=>ze(r,typeof o!="symbol"?o+"":o,n);import{u as ce,r as u,z as Ee,d as j,j as a,q as de,B as N,ba as ue,S as R,a_ as Ne,b2 as Pe,v as me,a as Ve,cf as G,D as pe,et as Be,bb as De,eu as Me,ev as qe,ew as He,bT as Ke,cp as Xe,b as Oe,bP as W,E as Je,al as Ye}from"./vendor.BoTfdsCf.js";import{a as S}from"./index.DLJAtNjR.js";import{d as Ge,n as We}from"./contexts.WL7Kriqp.js";import{u as Ue,a as Qe,C as Ze,S as ge,X as et,b as tt,c as fe,F as st,A as nt,M as at,d as ot}from"./ant-design-x.u1p1iP5Z.js";import"./vite.CnSqVV0U.js";import"./lodash.Bb75kzRV.js";import"./highlight.DHmnecVl.js";import"./ai.C388B-E2.js";import"./client.D7VRHfTk.js";import"./base.gu0kEKDD.js";import"./authorization.C4m8-HkI.js";import"./inbox.CIpY7_VV.js";import"./system.CHrnDnGl.js";import"./oauth.CCcFLtjg.js";import"./tasks.Bx1YQCvJ.js";import"./components.F4COe29t.js";import"./ai-chat-layout.CekyEDT_.js";import"./mermaid.BZyw0kKh.js";import"./highlighter.XJoYXc6V.js";import"./refractor.BE1DkDI7.js";const he=Oe(({token:r,css:o})=>({siderLayout:o`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,classicLayout:o`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,sider:o`
      background: ${r.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,logo:o`
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
    `,addBtn:o`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,conversationsSpin:o`
      height: 100%;
      overflow-y: auto;
    `,conversations:o`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,siderFooter:o`
      border-top: 1px solid ${r.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,chat:o`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${r.paddingLG}px;
      gap: 16px;
    `,chatPrompt:o`
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
    `,chatList:o`
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
    `,loadingMessage:o`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,placeholder:o`
      padding-top: 32px;
    `,skillsSelect:o`
      width: 100%;
      max-width: min(95%, 700px);
      margin: 0 20px;
    `,sender:o`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,speechButton:o`
      font-size: 18px;
      color: ${r.colorText} !important;
    `,senderPrompt:o`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${r.colorText};
    `}));class rt extends Error{constructor(n,c){super(n);le(this,"buffer");this.buffer=c}}function it(r){if(r==null||typeof r!="object")return!1;const o=r;if(o.name==="AbortError")return!0;const n=typeof o.message=="string"?o.message:"";return/aborted/i.test(n)||/BodyStreamBuffer/i.test(n)}class lt extends nt{transformParams(o,n){if(typeof o!="object")throw new Error("requestParams must be an object");return{...(n==null?void 0:n.params)||{},...o||{}}}transformLocalMessage({content:o}){return{content:o,role:"user"}}transformMessage(o){const{originMessage:n,chunk:c,status:l}=o||{};if(!c)return{...n,content:(n==null?void 0:n.content)||"",role:"assistant",status:l};let m;try{m=JSON.parse(c.data)}catch{return{...n,content:(n==null?void 0:n.content)||"",role:"assistant",status:l}}const b=m.message_id===(n==null?void 0:n.messageId)?`${(n==null?void 0:n.content)||""}${m.content||""}`:m.content||"";switch(m.event_type){case"tool_call":case"content":return{...n,content:b,role:"assistant",messageId:m.message_id,status:l};case"error":return{...n,content:b,role:"assistant",error:m.content,messageId:m.message_id,status:l};case"client_tool_pending":return{...n,content:b||"",role:"assistant",pendingClientToolCalls:m.client_tool_calls,messageId:m.message_id,status:l};default:return{...n,content:b||(n==null?void 0:n.content)||"",role:"assistant",messageId:m.message_id||(n==null?void 0:n.messageId),status:l}}}}const U=new Map,ct=r=>(U.get(r)||U.set(r,new lt({request:tt(`/api/ai/chat/sessions/${r}`,{manual:!0,middlewares:{onRequest:async(o,n)=>{const c=localStorage.getItem("orgID"),{sessionId:l}=n.params??{},m={...n.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...c?{"X-Scope-OrgID":c}:{}};return[l?`/api/ai/chat/sessions/${l}`:o,{...n,headers:m}]}}})})),U.get(r)),dt=r=>{var l;const{className:o,children:n}=r,c=((l=o==null?void 0:o.match(/language-(\w+)/))==null?void 0:l[1])||"";return typeof n!="string"?null:c==="mermaid"?a.jsx(at,{children:n}):a.jsx("code",{className:"ant-highlightCode-code",children:a.jsx(ot,{lang:c,children:n})})},ut=Je.createContext({});function P(r){if(!r||r.length===0)return[];const o=new Set,n=[];for(const c of r){const l=c.trim();!l||o.has(l)||(o.add(l),n.push(l))}return n}const mt=({bubble:r={},messages:o,loading:n,layout:c="classic",onSendMessage:l})=>{const{styles:m}=he(),{isDarkMode:b}=Ye(),A=u.useMemo(()=>{if(!r.components)return{code:dt};const p={};for(const y in r.components){const d=r.components[y];if(typeof d=="string"){p[y]=d;continue}p[y]=$=>a.jsx(d,{...$,onSendMessage:l})}return p},[l,r.components]),{contentRender:V=p=>a.jsx(fe,{paragraphTag:"div",content:p,className:b?"x-markdown-dark":"x-markdown-light",components:A}),footerRender:h=({message:p})=>{if(p.error)return a.jsx("div",{children:a.jsx(fe,{content:p.error,components:A})})}}=r,L=u.useMemo(()=>(o||[]).map(p=>({...p.message,key:p.id,contentRender:V,footer:(y,d)=>h==null?void 0:h(p,d,l)})).filter(p=>p.content),[o]);return a.jsx("div",{className:m.chatList,children:a.jsx(R,{spinning:n,children:a.jsx(st.List,{items:L,style:{height:"100%",paddingInline:c==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>a.jsx(R,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>a.jsx(R,{size:"small"})},user:{placement:"end"}}})})})},zt=({bubble:r={},ephemeralSystemPrompts:o,defaultSkillDomains:n})=>{const{layout:c,setVisible:l,setLayout:m,onCallAI:b,activeConversationKey:A,setActiveConversationKey:V,conversations:h,fetchConversationsLoading:L,ephemeralSystemPrompts:p,clientTools:y}=Ge(),{t:d}=ce("ai"),{t:$}=ce("common"),{styles:k}=he(),B=e=>({key:e.id,label:e.title,group:W(e.start_time).isSame(W(),"day")?d("chat.today"):W(e.start_time).format("YYYY-MM-DD")}),{conversations:Q,activeConversationKey:g,setActiveConversationKey:D,addConversation:xe,setConversations:be,getConversation:M,setConversation:w,removeConversation:ye,getMessages:ke}=Ue({defaultActiveConversationKey:A,defaultConversations:(h==null?void 0:h.map(e=>B(e)))||[]});u.useEffect(()=>{V(g)},[g]);const{message:F}=Ee.useApp(),[Z,ee]=u.useState(""),[ve,Ce]=u.useState(!1),q=(n==null?void 0:n.join("\0"))??"",H=u.useMemo(()=>P(q?q.split("\0"):[]),[q]),K=(o==null?void 0:o.join("\0"))??"",te=u.useMemo(()=>P(K?K.split("\0"):[]),[K]),[v,X]=u.useState(()=>H.map(e=>({type:"domain",value:e})));u.useEffect(()=>{X(e=>{const s=e.filter(t=>t.type==="skill");return[...H.map(t=>({type:"domain",value:t})),...s]})},[H]);const{data:se}=j(()=>S.system.listSkillDomains()),{data:z}=j(()=>S.system.listSkills({current:1,page_size:500})),ne=u.useMemo(()=>[...(se??[]).map(e=>({skillType:"domain",key:e,label:a.jsxs(a.Fragment,{children:[a.jsx(de,{children:d("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((z==null?void 0:z.data)??[]).map(e=>({skillType:"skill",key:e.id,label:a.jsxs(a.Fragment,{children:[a.jsx(de,{children:d("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[z,se]),[_,ae]=u.useState(),{onRequest:T,messages:x,isRequesting:O,abort:je,onReload:Se,setMessages:we,setMessage:_e}=Qe({provider:ct(g),conversationKey:g,defaultMessages:[],requestPlaceholder:()=>({content:$("loading"),role:"assistant"}),requestFallback:(e,{error:s})=>it(s)?{content:"",role:"assistant"}:s instanceof rt?{content:s.buffer.join(""),role:"assistant",error:s.message}:{content:`${s}`,role:"assistant"}}),C=u.useCallback(()=>{const e={domains:v.filter(t=>t.type==="domain").map(t=>t.value),skill_ids:v.filter(t=>t.type==="skill").map(t=>t.value)},s=P([...te,...p]);return s.length>0&&(e.ephemeral_system_prompts=s),y.length>0&&(e.client_tools=y.map(t=>({name:t.name,description:t.description,parameters:t.parameters}))),e},[v,te,p,y]),J=u.useRef(null),oe=u.useCallback(async e=>{const s=[];for(const t of e){const i=y.find(f=>f.name===t.name);if(!i){s.push({tool_call_id:t.id,content:JSON.stringify({error:`Client tool handler not found for ${t.name}`})});continue}try{const f=await Promise.resolve(i.handler(t.arguments));s.push({tool_call_id:t.id,content:f})}catch(f){const I=f instanceof Error?f.message:String(f);s.push({tool_call_id:t.id,content:JSON.stringify({error:I})})}}T({content:"",client_tool_results:s,...C()})},[y,T,C]);u.useEffect(()=>{var e,s;if(!O&&x&&x.length>0){const t=x[x.length-1];if((s=(e=t==null?void 0:t.message)==null?void 0:e.pendingClientToolCalls)!=null&&s.length){const i=t.message.pendingClientToolCalls;J.current!==i&&(J.current=i,oe(i))}else J.current=null}},[O,x,oe]);const re=e=>{if(e){if(!g){E(e);return}T({content:e,...C()})}},{run:Te,loading:Ie}=j(async e=>await S.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{F.error(d("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(x&&x.length>0&&(x[x.length-1].status==="loading"||x.length>e.messages.length))return;const s=[];let t={id:"",message:{content:"",role:"assistant"},status:"success"};for(const i of e.messages)switch(i.role){case"assistant":t.status=i.status==="completed"&&t.status==="success"?"success":"error",t.message.role="assistant",t.id!==i.id&&i.content&&(t.message.content=i.content),t.id=i.id;break;case"user":t.message.content.length>0&&(s.push({id:t.id,message:{content:t.message.content,role:t.message.role},status:t.status}),t={id:"",message:{content:"",role:"assistant"},status:"success"}),s.push({id:i.id,message:{content:i.content,role:i.role},status:i.status==="completed"?"success":"error"});break}t.message.content.length>0&&s.push({id:t.id,message:{content:t.message.content,role:t.message.role},status:t.status}),we(s)}}),{run:E,loading:Y}=j(async(e,s,t=!1,i)=>({session:await S.ai.createChatSession({title:d("chat.defaultConversationTitle"),model_id:"",messages:s||[],anonymous:t}),message:e,domains:i}),{manual:!0,onError:()=>{F.error(d("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:({session:e,message:s,domains:t})=>{xe(B(e),"prepend"),D(e.id),s&&ae({message:s,sessionId:e.id,domains:t})}});u.useEffect(()=>{be((h==null?void 0:h.map(e=>B(e)))||[])},[h]);const{run:Re}=j(async e=>await S.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[s]){F.error(d("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const t=M(s);t&&w(s,{...t,loading:!1})},onSuccess(e,[s]){ye(s)}}),{run:Ae}=j(async e=>S.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[s])=>{const t=M(s);t&&w(s,{...t,title:e,loading:!1})},onError:(e,[s])=>{F.error(d("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const t=M(s);t&&w(s,{...t,loading:!1})}});u.useEffect(()=>{if(g&&(_==null?void 0:_.sessionId)===g){const{message:e,domains:s}=_;setTimeout(()=>{T({content:e,...C(),...s!==void 0?{domains:s}:{}})},1e3),ae(void 0)}},[g,_,C]),u.useEffect(()=>{if(g){const e=ke(g);if(e&&e.length>0)return;Te(g)}},[g]);const ie=u.useRef(()=>{});ie.current=(e,s)=>{const t=We(s),i=t.domains!==void 0?P(t.domains):void 0;if(i!==void 0&&X(f=>[...i.map(I=>({type:"domain",value:I})),...f.filter(I=>I.type==="skill")]),t.newSession===!1&&g){T({content:e,...C(),...i!==void 0?{domains:i}:{}});return}E(e,t.messages,!0,i)},u.useEffect(()=>{b&&b((e,s)=>{ie.current(e,s)})},[b]);const Le=a.jsxs("div",{className:k.sider,children:[a.jsx(N,{onClick:()=>{E()},type:"link",className:k.addBtn,icon:a.jsx(ue,{}),loading:Y,children:d("chat.newConversation",{defaultValue:"New Conversation"})}),a.jsx(R,{spinning:L,wrapperClassName:k.conversationsSpin,children:a.jsx(Ze,{items:Q,activeKey:g,onActiveChange:async e=>{e&&D(e)},className:k.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:d("chat.regenerateTitle"),key:"regenerateTitle",icon:a.jsx(Ne,{}),onClick:()=>{w(e.key,{...e,loading:!0}),Ae(e.key)}},{label:$("delete"),key:"delete",icon:a.jsx(Pe,{}),danger:!0,onClick:()=>{w(e.key,{...e,loading:!0}),Re(e.key)}}]})})})]}),$e=a.jsx(a.Fragment,{children:a.jsx(me,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:a.jsx(ge,{footer:e=>a.jsxs(G,{justify:"space-between",align:"center",children:[a.jsx(G,{gap:"small",align:"center",children:a.jsx(pe,{open:ve,onOpenChange:(s,t)=>{(t.source==="trigger"||s)&&Ce(s)},menu:{selectedKeys:v.map(s=>s.value),onClick:s=>{const t=ne.find(i=>i.key===s.key);X(i=>i.some(f=>f.value===s.key)?i.filter(f=>f.value!==s.key):[...i,{type:(t==null?void 0:t.skillType)||"skill",value:s.key}])},items:ne.map(s=>({label:s.label,key:s.key}))},children:a.jsxs(ge.Switch,{value:!1,icon:a.jsx(Be,{}),children:[d("chat.skill",{defaultValue:"Skills"})," ","(",v.length>0?d("chat.skillsSelected",{defaultValue:"{{count}} selected",count:v.length}):d("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),a.jsx(G,{align:"center",children:e})]}),suffix:!1,value:Z,onSubmit:async()=>{re(Z.trim()),ee("")},onChange:ee,onCancel:()=>{je()},loading:O,className:Ve(k.sender,"chat-sender"),placeholder:d("chat.inputPlaceholder")})})});return a.jsx(et,{children:a.jsxs(ut.Provider,{value:{onReload:Se,setMessage:_e},children:[a.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[a.jsx(De.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:a.jsx(Me,{style:{transform:"scaleX(-1)"}}),value:"classic"},{label:a.jsx(qe,{}),value:"sidebar"},{label:a.jsx(He,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>m(e.target.value),value:c}),a.jsxs(me,{style:{float:"right",marginTop:10},children:[a.jsx(N,{type:"primary",onClick:()=>{E()},loading:Y,icon:a.jsx(ue,{}),style:{display:c==="classic"?"none":"block"}}),a.jsx(pe,{menu:{items:Q.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{D(e)}},placement:"bottomRight",children:a.jsx(N,{icon:L?a.jsx(R,{size:"small"}):a.jsx(Ke,{}),style:{display:c==="classic"?"none":"block"}})}),a.jsx(N,{type:"text",onClick:()=>l(!1),children:a.jsx(Xe,{})})]})]}),a.jsxs("div",{className:c==="classic"?k.classicLayout:k.siderLayout,style:{minWidth:c==="classic"?"500px":"400px"},children:[c==="classic"?Le:null,a.jsxs("div",{className:k.chat,children:[a.jsx(mt,{bubble:r,messages:x,loading:Ie||Y,layout:c,onSendMessage:re}),$e]})]})]})})};export{zt as AIChat,zt as default};
