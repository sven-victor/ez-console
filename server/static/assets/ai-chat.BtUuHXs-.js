var Ne=Object.defineProperty;var Pe=(i,o,n)=>o in i?Ne(i,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[o]=n;var de=(i,o,n)=>Pe(i,typeof o!="symbol"?o+"":o,n);import{u as ue,r as c,z as Ve,d as _,j as a,q as me,B as P,ba as pe,S as $,a_ as Be,b2 as qe,v as ge,a as De,cg as W,D as fe,eu as Me,bb as He,ev as Ke,ew as Oe,ex as Xe,bU as Je,cq as Ge,b as Ye,bQ as Q,E as Ue,al as We}from"./vendor.ClSsp3yf.js";import{a as I}from"./index.KneTe68Y.js";import{d as Qe,n as Ze}from"./contexts.D8MtzPEa.js";import{u as et,a as tt,C as nt,S as he,X as st,b as at,c as xe,F as ot,A as rt,M as it,d as lt}from"./ant-design-x.CGOpD9_B.js";import"./vite.CnSqVV0U.js";import"./lodash.Bb75kzRV.js";import"./highlight.DHmnecVl.js";import"./ai.k774Vq-O.js";import"./client.BgMO2mQv.js";import"./base.DdOxQplb.js";import"./authorization.Bl13NLCU.js";import"./inbox.BhlyyUcz.js";import"./system.D6NHTrSQ.js";import"./oauth.ClaT6eUx.js";import"./tasks.BNuEIP75.js";import"./components.B7aYNdzC.js";import"./ai-chat-layout.CL7lOyRA.js";import"./mermaid.CRakjwcT.js";import"./highlighter.Cl4qVJ5T.js";import"./refractor.DcHosxso.js";const be=Ye(({token:i,css:o})=>({siderLayout:o`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,classicLayout:o`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,sider:o`
      background: ${i.colorBgLayout}80;
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
        color: ${i.colorText};
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
      border-top: 1px solid ${i.colorBorderSecondary};
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
      padding-block: ${i.paddingLG}px;
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
      color: ${i.colorText} !important;
    `,senderPrompt:o`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${i.colorText};
    `}));class ct extends Error{constructor(n,d){super(n);de(this,"buffer");this.buffer=d}}function dt(i){if(i==null||typeof i!="object")return!1;const o=i;if(o.name==="AbortError")return!0;const n=typeof o.message=="string"?o.message:"";return/aborted/i.test(n)||/BodyStreamBuffer/i.test(n)}class ut extends rt{transformParams(o,n){if(typeof o!="object")throw new Error("requestParams must be an object");return{...(n==null?void 0:n.params)||{},...o||{}}}transformLocalMessage({content:o}){return{content:o,role:"user"}}transformMessage(o){const{originMessage:n,chunk:d,status:l}=o||{};if(!d)return{...n,content:(n==null?void 0:n.content)||"",role:"assistant",status:l};let u;try{u=JSON.parse(d.data)}catch{return{...n,content:(n==null?void 0:n.content)||"",role:"assistant",status:l}}const v=u.message_id===(n==null?void 0:n.messageId)?`${(n==null?void 0:n.content)||""}${u.content||""}`:u.content||"";switch(u.event_type){case"tool_call":case"content":return{...n,content:v,role:"assistant",messageId:u.message_id,status:l};case"error":return{...n,content:v,role:"assistant",error:u.content,messageId:u.message_id,status:l};case"client_tool_pending":return{...n,content:v||"",role:"assistant",pendingClientToolCalls:u.client_tool_calls,messageId:u.message_id,status:l};default:return{...n,content:v||(n==null?void 0:n.content)||"",role:"assistant",messageId:u.message_id||(n==null?void 0:n.messageId),status:l}}}}const Z=new Map,mt=i=>(Z.get(i)||Z.set(i,new ut({request:at(`/api/ai/chat/sessions/${i}`,{manual:!0,middlewares:{onRequest:async(o,n)=>{const d=localStorage.getItem("orgID"),{sessionId:l}=n.params??{},u={...n.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...d?{"X-Scope-OrgID":d}:{}};return[l?`/api/ai/chat/sessions/${l}`:o,{...n,headers:u}]}}})})),Z.get(i)),pt=i=>{var l;const{className:o,children:n}=i,d=((l=o==null?void 0:o.match(/language-(\w+)/))==null?void 0:l[1])||"";return typeof n!="string"?null:d==="mermaid"?a.jsx(it,{children:n}):a.jsx("code",{className:"ant-highlightCode-code",children:a.jsx(lt,{lang:d,children:n})})},gt=Ue.createContext({});function V(i){if(!i||i.length===0)return[];const o=new Set,n=[];for(const d of i){const l=d.trim();!l||o.has(l)||(o.add(l),n.push(l))}return n}const ft=({bubble:i={},messages:o,loading:n,layout:d="classic",onSendMessage:l})=>{const{styles:u}=be(),{isDarkMode:v}=We(),j=c.useMemo(()=>{if(!i.components)return{code:pt};const m={};for(const C in i.components){const x=i.components[C];if(typeof x=="string"){m[C]=x;continue}m[C]=F=>a.jsx(x,{...F,onSendMessage:l})}return m},[l,i.components]),{contentRender:B=m=>a.jsx(xe,{paragraphTag:"div",content:m,className:v?"x-markdown-dark":"x-markdown-light",components:j}),footerRender:A=({message:m})=>{if(m.error)return a.jsx("div",{children:a.jsx(xe,{content:m.error,components:j})})}}=i,b=c.useMemo(()=>(o||[]).map(m=>({...m.message,key:m.id,contentRender:B,footer:(C,x)=>A==null?void 0:A(m,x,l)})).filter(m=>m.content),[o]);return a.jsx("div",{className:u.chatList,children:a.jsx($,{spinning:n,children:a.jsx(ot.List,{items:b,style:{height:"100%",paddingInline:d==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>a.jsx($,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>a.jsx($,{size:"small"})},user:{placement:"end"}}})})})},Pt=({bubble:i={},ephemeralSystemPrompts:o,clientTools:n,defaultSkillDomains:d})=>{const{layout:l,setVisible:u,setLayout:v,onCallAI:j,activeConversationKey:B,setActiveConversationKey:A,conversations:b,fetchConversationsLoading:m,getEphemeralSystemPrompts:C,getClientTools:x,registerGlobalAI:F}=Qe(),{t:g}=ue("ai"),{t:ee}=ue("common"),{styles:k}=be(),q=e=>({key:e.id,label:e.title,group:Q(e.start_time).isSame(Q(),"day")?g("chat.today"):Q(e.start_time).format("YYYY-MM-DD")}),{conversations:te,activeConversationKey:f,setActiveConversationKey:D,addConversation:ye,setConversations:ve,getConversation:M,setConversation:R,removeConversation:ke,getMessages:Ce}=et({defaultActiveConversationKey:B,defaultConversations:(b==null?void 0:b.map(e=>q(e)))||[]});c.useEffect(()=>{A(f)},[f]);const{message:E}=Ve.useApp(),[ne,se]=c.useState(""),[je,Se]=c.useState(!1),H=(d==null?void 0:d.join("\0"))??"",K=c.useMemo(()=>V(H?H.split("\0"):[]),[H]),O=(o==null?void 0:o.join("\0"))??"",X=c.useMemo(()=>V(O?O.split("\0"):[]),[O]);c.useEffect(()=>{if(!(X.length===0&&!(n!=null&&n.length)))return F({ephemeralSystemPrompts:X,tools:n})},[X,n,F]);const[S,J]=c.useState(()=>K.map(e=>({type:"domain",value:e})));c.useEffect(()=>{J(e=>{const t=e.filter(s=>s.type==="skill");return[...K.map(s=>({type:"domain",value:s})),...t]})},[K]);const{data:ae}=_(()=>I.system.listSkillDomains()),{data:z}=_(()=>I.system.listSkills({current:1,page_size:500})),oe=c.useMemo(()=>[...(ae??[]).map(e=>({skillType:"domain",key:e,label:a.jsxs(a.Fragment,{children:[a.jsx(me,{children:g("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((z==null?void 0:z.data)??[]).map(e=>({skillType:"skill",key:e.id,label:a.jsxs(a.Fragment,{children:[a.jsx(me,{children:g("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[z,ae]),[L,re]=c.useState(),{onRequest:T,messages:h,isRequesting:G,abort:we,onReload:_e,setMessages:Ie,setMessage:Ae}=tt({provider:mt(f),conversationKey:f,defaultMessages:[],requestPlaceholder:()=>({content:ee("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>dt(t)?{content:"",role:"assistant"}:t instanceof ct?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),w=c.useCallback(()=>{const e={domains:S.filter(r=>r.type==="domain").map(r=>r.value),skill_ids:S.filter(r=>r.type==="skill").map(r=>r.value)},t=V(C());t.length>0&&(e.ephemeral_system_prompts=t);const s=x();return s.length>0&&(e.client_tools=s.map(r=>({name:r.name,description:r.description,parameters:r.parameters}))),e},[S,C,x]),Y=c.useRef(null),ie=c.useCallback(async e=>{const t=[],s=x();for(const r of e){const y=s.find(p=>p.name===r.name);if(!y){t.push({tool_call_id:r.id,content:JSON.stringify({error:`Client tool "${r.name}" is not available on the current page`,available_tools:s.map(p=>p.name)})});continue}try{const p=await Promise.resolve(y.handler(r.arguments));t.push({tool_call_id:r.id,content:p!=null&&p.trim()?p:JSON.stringify({ok:!0})})}catch(p){const ze=p instanceof Error?p.message:String(p);t.push({tool_call_id:r.id,content:JSON.stringify({error:ze})})}}T({content:"",client_tool_results:t,...w()})},[x,T,w]);c.useEffect(()=>{var e,t;if(!G&&h&&h.length>0){const s=h[h.length-1];if((t=(e=s==null?void 0:s.message)==null?void 0:e.pendingClientToolCalls)!=null&&t.length){const r=s.message.pendingClientToolCalls;Y.current!==r&&(Y.current=r,ie(r))}else Y.current=null}},[G,h,ie]);const le=e=>{if(e){if(!f){N(e);return}T({content:e,...w()})}},{run:Re,loading:Le}=_(async e=>await I.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{E.error(g("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(h&&h.length>0&&(h[h.length-1].status==="loading"||h.length>e.messages.length))return;const t=[];let s={id:"",message:{content:"",role:"assistant"},status:"success"};for(const r of e.messages)switch(r.role){case"assistant":s.status=r.status==="completed"&&s.status==="success"?"success":"error",s.message.role="assistant",s.id!==r.id&&r.content&&(s.message.content=r.content),s.id=r.id;break;case"user":s.message.content.length>0&&(t.push({id:s.id,message:{content:s.message.content,role:s.message.role},status:s.status}),s={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:r.id,message:{content:r.content,role:r.role},status:r.status==="completed"?"success":"error"});break}s.message.content.length>0&&t.push({id:s.id,message:{content:s.message.content,role:s.message.role},status:s.status}),Ie(t)}}),{run:N,loading:U}=_(async(e,t,s=!1,r)=>({session:await I.ai.createChatSession({title:g("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:s}),message:e,domains:r}),{manual:!0,onError:()=>{E.error(g("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:({session:e,message:t,domains:s})=>{ye(q(e),"prepend"),D(e.id),t&&re({message:t,sessionId:e.id,domains:s})}});c.useEffect(()=>{ve((b==null?void 0:b.map(e=>q(e)))||[])},[b]);const{run:Te}=_(async e=>await I.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){E.error(g("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const s=M(t);s&&R(t,{...s,loading:!1})},onSuccess(e,[t]){ke(t)}}),{run:$e}=_(async e=>I.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const s=M(t);s&&R(t,{...s,title:e,loading:!1})},onError:(e,[t])=>{E.error(g("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const s=M(t);s&&R(t,{...s,loading:!1})}});c.useEffect(()=>{if(f&&(L==null?void 0:L.sessionId)===f){const{message:e,domains:t}=L;setTimeout(()=>{T({content:e,...w(),...t!==void 0?{domains:t}:{}})},1e3),re(void 0)}},[f,L,w]),c.useEffect(()=>{if(f){const e=Ce(f);if(e&&e.length>0)return;Re(f)}},[f]);const ce=c.useRef(()=>{});ce.current=(e,t)=>{const s=Ze(t),r=s.domains!==void 0?V(s.domains):void 0;if(r!==void 0&&J(y=>[...r.map(p=>({type:"domain",value:p})),...y.filter(p=>p.type==="skill")]),s.newSession===!1&&f){T({content:e,...w(),...r!==void 0?{domains:r}:{}});return}N(e,s.messages,!0,r)},c.useEffect(()=>{j&&j((e,t)=>{ce.current(e,t)})},[j]);const Fe=a.jsxs("div",{className:k.sider,children:[a.jsx(P,{onClick:()=>{N()},type:"link",className:k.addBtn,icon:a.jsx(pe,{}),loading:U,children:g("chat.newConversation",{defaultValue:"New Conversation"})}),a.jsx($,{spinning:m,wrapperClassName:k.conversationsSpin,children:a.jsx(nt,{items:te,activeKey:f,onActiveChange:async e=>{e&&D(e)},className:k.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:g("chat.regenerateTitle"),key:"regenerateTitle",icon:a.jsx(Be,{}),onClick:()=>{R(e.key,{...e,loading:!0}),$e(e.key)}},{label:ee("delete"),key:"delete",icon:a.jsx(qe,{}),danger:!0,onClick:()=>{R(e.key,{...e,loading:!0}),Te(e.key)}}]})})})]}),Ee=a.jsx(a.Fragment,{children:a.jsx(ge,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:a.jsx(he,{footer:e=>a.jsxs(W,{justify:"space-between",align:"center",children:[a.jsx(W,{gap:"small",align:"center",children:a.jsx(fe,{open:je,onOpenChange:(t,s)=>{(s.source==="trigger"||t)&&Se(t)},menu:{selectedKeys:S.map(t=>t.value),onClick:t=>{const s=oe.find(r=>r.key===t.key);J(r=>r.some(y=>y.value===t.key)?r.filter(y=>y.value!==t.key):[...r,{type:(s==null?void 0:s.skillType)||"skill",value:t.key}])},items:oe.map(t=>({label:t.label,key:t.key}))},children:a.jsxs(he.Switch,{value:!1,icon:a.jsx(Me,{}),children:[g("chat.skill",{defaultValue:"Skills"})," ","(",S.length>0?g("chat.skillsSelected",{defaultValue:"{{count}} selected",count:S.length}):g("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),a.jsx(W,{align:"center",children:e})]}),suffix:!1,value:ne,onSubmit:async()=>{le(ne.trim()),se("")},onChange:se,onCancel:()=>{we()},loading:G,className:De(k.sender,"chat-sender"),placeholder:g("chat.inputPlaceholder")})})});return a.jsx(st,{children:a.jsxs(gt.Provider,{value:{onReload:_e,setMessage:Ae},children:[a.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[a.jsx(He.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:a.jsx(Ke,{style:{transform:"scaleX(-1)"}}),value:"classic"},{label:a.jsx(Oe,{}),value:"sidebar"},{label:a.jsx(Xe,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>v(e.target.value),value:l}),a.jsxs(ge,{style:{float:"right",marginTop:10},children:[a.jsx(P,{type:"primary",onClick:()=>{N()},loading:U,icon:a.jsx(pe,{}),style:{display:l==="classic"?"none":"block"}}),a.jsx(fe,{menu:{items:te.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{D(e)}},placement:"bottomRight",children:a.jsx(P,{icon:m?a.jsx($,{size:"small"}):a.jsx(Je,{}),style:{display:l==="classic"?"none":"block"}})}),a.jsx(P,{type:"text",onClick:()=>u(!1),children:a.jsx(Ge,{})})]})]}),a.jsxs("div",{className:l==="classic"?k.classicLayout:k.siderLayout,style:{minWidth:l==="classic"?"500px":"400px"},children:[l==="classic"?Fe:null,a.jsxs("div",{className:k.chat,children:[a.jsx(ft,{bubble:i,messages:h,loading:Le||U,layout:l,onSendMessage:le}),Ee]})]})]})})};export{Pt as AIChat,Pt as default};
