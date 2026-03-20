var Re=Object.defineProperty;var Fe=(i,a,o)=>a in i?Re(i,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[a]=o;var Q=(i,a,o)=>Fe(i,typeof a!="symbol"?a+"":a,o);import{t as Le,R as X,j as s,u as Z,c as Ae,r as g,s as V,a as y,T as ee,B as I,b as te,S as _,d as Ne,e as Me,f as se,g as Ee,h as ae,i as Pe,k as ze,l as ne,D as Be,m as Ve,n as De,o as D}from"./vendor.DzyHgpJj.js";import{a as v}from"./index.BPsH1QIO.js";import{u as qe}from"./contexts.D7xORybf.js";import{X as oe,u as Xe,a as He,C as Oe,F as Ke,S as Je,b as Ye,M as Ge,c as We,d as Ue,A as Qe}from"./ant-design-x.UtEaPwDS.js";import{i as Ze}from"./lodash.C17Xpf0Y.js";import"./vite.BF1G3H_w.js";import"./highlight.BslI14e2.js";import"./ai.BXhdvC6H.js";import"./client.x_LU-hi9.js";import"./base.BNTUtNPS.js";import"./authorization.riPLbc0t.js";import"./system.DZWYtt-T.js";import"./oauth.DAsp98fZ.js";import"./tasks.DtLBWQQZ.js";import"./components.CoBjAIID.js";import"./ai-chat-layout.CpFuIZCY.js";import"./highlighter.I_HnVsuD.js";import"./refractor.B2sLbVM0.js";import"./mermaid.CYZ-5qIW.js";const et=Ae(({token:i,css:a})=>({siderLayout:a`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,classicLayout:a`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,sider:a`
      background: ${i.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,logo:a`
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
    `,addBtn:a`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,conversationsSpin:a`
      height: 100%;
      overflow-y: auto;
    `,conversations:a`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,siderFooter:a`
      border-top: 1px solid ${i.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,chat:a`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${i.paddingLG}px;
      gap: 16px;
    `,chatPrompt:a`
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
    `,chatList:a`
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
    `,loadingMessage:a`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,placeholder:a`
      padding-top: 32px;
    `,skillsSelect:a`
      width: 100%;
      max-width: min(95%, 700px);
      margin: 0 20px;
    `,sender:a`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,speechButton:a`
      font-size: 18px;
      color: ${i.colorText} !important;
    `,senderPrompt:a`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${i.colorText};
    `}));class tt extends Error{constructor(o,l){super(o);Q(this,"buffer");this.buffer=l}}class st extends Qe{transformParams(a,o){if(typeof a!="object")throw new Error("requestParams must be an object");return{...(o==null?void 0:o.params)||{},...a||{}}}transformLocalMessage({content:a}){return{content:a,role:"user"}}transformMessage(a){const{originMessage:o,chunk:l,status:r}=a||{};if(!l)return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:r};const d=JSON.parse(l.data),C=d.message_id===(o==null?void 0:o.messageId)?`${(o==null?void 0:o.content)||""}${d.content||""}`:d.content||"";switch(d.event_type){case"tool_call":case"content":return{...o,content:C,role:"assistant",messageId:d.message_id,status:r};case"error":return{...o,content:C,role:"assistant",error:d.content,messageId:d.message_id,status:r};case"client_tool_pending":return{...o,content:C||"",role:"assistant",pendingClientToolCalls:d.client_tool_calls,messageId:d.message_id,status:r}}}}const q=new Map,at=i=>(q.get(i)||q.set(i,new st({request:Ue(`/api/ai/chat/sessions/${i}`,{manual:!0,middlewares:{onRequest:async(a,o)=>{const l=localStorage.getItem("orgID"),{sessionId:r}=o.params,d={...o.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...l?{"X-Scope-OrgID":l}:{}};return[r?`/api/ai/chat/sessions/${r}`:a,{...o,headers:d}]}}})})),q.get(i)),nt=i=>{var r;const{className:a,children:o}=i,l=((r=a==null?void 0:a.match(/language-(\w+)/))==null?void 0:r[1])||"";return typeof o!="string"?null:l==="mermaid"?s.jsx(Ge,{children:o}):s.jsx(We,{lang:l,children:o})},ot=()=>{const i=Le.useToken(),a=X.useMemo(()=>{var l;return((l=i==null?void 0:i.theme)==null?void 0:l.id)===0},[i]);return[X.useMemo(()=>a?"x-markdown-light":"x-markdown-dark",[a])]},it=X.createContext({}),It=({bubble:i={}})=>{const{components:a={code:nt},contentRender:o=e=>s.jsx(oe,{paragraphTag:"div",content:e,className:me,components:a}),footerRender:l=({message:e})=>{if(e.error)return s.jsx("div",{children:s.jsx(oe,{content:e.error,components:a})})}}=i,{layout:r,setVisible:d,setLayout:C,onCallAI:$,activeConversationKey:ie,setActiveConversationKey:re,conversations:x,fetchConversationsLoading:H,ephemeralSystemPrompts:R,clientTools:k}=qe(),{t:p}=Z("ai"),{t:O}=Z("common"),{styles:f}=et(),F=e=>({key:e.id,label:e.title,group:D(e.start_time).isSame(D(),"day")?p("chat.today"):D(e.start_time).format("YYYY-MM-DD")}),{conversations:K,activeConversationKey:u,setActiveConversationKey:L,addConversation:le,setConversations:ce,getConversation:A,setConversation:j,removeConversation:de,getMessages:ue}=Xe({defaultActiveConversationKey:ie,defaultConversations:(x==null?void 0:x.map(e=>F(e)))||[]});g.useEffect(()=>{re(u)},[u]);const[me]=ot(),[J,pe]=V.useMessage(),[Y,G]=g.useState(""),[N,M]=g.useState([]),{data:ge}=y(()=>v.system.listSkillDomains()),fe=(ge??[]).map(e=>({skillType:"domain",value:e,label:s.jsxs(s.Fragment,{children:[s.jsx(ee,{children:p("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),{data:E}=y(()=>v.system.listSkills({current:1,page_size:500})),he=((E==null?void 0:E.data)??[]).map(e=>({skillType:"skill",value:e.id,label:s.jsxs(s.Fragment,{children:[s.jsx(ee,{children:p("chat.skill",{defaultValue:"Skill"})}),e.name]})})),[S,W]=g.useState(),{onRequest:T,messages:m,isRequesting:P,abort:xe,onReload:be,setMessages:ye,setMessage:ve}=He({provider:at(u),conversationKey:u,defaultMessages:[],requestPlaceholder:()=>({content:O("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>t instanceof tt?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),w=g.useCallback(()=>{const e={};return R.length>0&&(e.ephemeral_system_prompts=R),k.length>0&&(e.client_tools=k.map(t=>({name:t.name,description:t.description,parameters:t.parameters}))),e},[R,k]),z=g.useRef(null),U=g.useCallback(async e=>{const t=[];for(const n of e){const c=k.find(h=>h.name===n.name);if(!c){t.push({tool_call_id:n.id,content:JSON.stringify({error:`Client tool handler not found for ${n.name}`})});continue}try{const h=await Promise.resolve(c.handler(n.arguments));t.push({tool_call_id:n.id,content:h})}catch(h){t.push({tool_call_id:n.id,content:JSON.stringify({error:(h==null?void 0:h.message)||String(h)})})}}T({content:"",client_tool_results:t,...w()})},[k,T,w]);g.useEffect(()=>{var e,t;if(!P&&m&&m.length>0){const n=m[m.length-1];if((t=(e=n==null?void 0:n.message)==null?void 0:e.pendingClientToolCalls)!=null&&t.length){const c=n.message.pendingClientToolCalls;z.current!==c&&(z.current=c,U(c))}else z.current=null}},[P,m,U]);const Ce=e=>{if(e){if(!u){b(e);return}T({content:e,domains:N.filter(t=>t.type==="domain").map(t=>t.value),skill_ids:N.filter(t=>t.type==="skill").map(t=>t.value),...w()})}},{run:ke,loading:je}=y(async e=>await v.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{V.error(p("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(m&&m.length>0&&(m[m.length-1].status==="loading"||m.length>e.messages.length))return;const t=[];let n={id:"",message:{content:"",role:"assistant"},status:"success"};for(const c of e.messages)switch(c.role){case"assistant":n.status=c.status==="completed"&&n.status==="success"?"success":"error",n.message.role="assistant",n.id!==c.id&&c.content&&(n.message.content=c.content),n.id=c.id;break;case"user":n.message.content.length>0&&(t.push({id:n.id,message:{content:n.message.content,role:n.message.role},status:n.status}),n={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:c.id,message:{content:c.content,role:c.role},status:c.status==="completed"?"success":"error"});break}n.message.content.length>0&&t.push({id:n.id,message:{content:n.message.content,role:n.message.role},status:n.status}),ye(t)}}),{run:b,loading:B}=y(async(e,t,n=!1)=>await v.ai.createChatSession({title:p("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:n}),{manual:!0,onError:()=>{V.error(p("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[t])=>{le(F(e),"prepend"),L(e.id),t&&W({message:t,sessionId:e.id})}});g.useEffect(()=>{ce((x==null?void 0:x.map(e=>F(e)))||[])},[x]);const{run:Se}=y(async e=>await v.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){J.error(p("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const n=A(t);n&&j(t,{...n,loading:!1})},onSuccess(e,[t]){de(t)}}),{run:we}=y(async e=>v.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const n=A(t);n&&j(t,{...n,title:e,loading:!1})},onError:(e,[t])=>{J.error(p("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const n=A(t);n&&j(t,{...n,loading:!1})}});g.useEffect(()=>{if(u&&(S==null?void 0:S.sessionId)===u){const e=S.message;setTimeout(()=>{T({content:e,...w()})},1e3),W(void 0)}},[u,S,w]),g.useEffect(()=>{if(u){const e=ue(u);if(e&&e.length>0)return;ke(u)}},[u]),g.useEffect(()=>{$&&b&&$((e,t)=>{b(e,t,!0)})},[b,$]);const _e=s.jsxs("div",{className:f.sider,children:[s.jsx(I,{onClick:()=>{b()},type:"link",className:f.addBtn,icon:s.jsx(te,{}),loading:B,children:p("chat.newConversation",{defaultValue:"New Conversation"})}),s.jsx(_,{spinning:H,wrapperClassName:f.conversationsSpin,children:s.jsx(Oe,{items:K,activeKey:u,onActiveChange:async e=>{e&&L(e)},className:f.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:p("chat.regenerateTitle"),key:"regenerateTitle",icon:s.jsx(Ne,{}),onClick:()=>{j(e.key,{...e,loading:!0}),we(e.key)}},{label:O("delete"),key:"delete",icon:s.jsx(Me,{}),danger:!0,onClick:()=>{j(e.key,{...e,loading:!0}),Se(e.key)}}]})})})]}),Te=m==null?void 0:m.map(e=>({...e.message,key:e.id,contentRender:o,footer:l==null?void 0:l(e)})).filter(e=>e.content),Ie=s.jsx("div",{className:f.chatList,children:s.jsx(_,{spinning:je||B,children:s.jsx(Ke.List,{items:Te,style:{height:"100%",paddingInline:r==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>s.jsx(_,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>s.jsx(_,{size:"small"})},user:{placement:"end"}}})})}),$e=s.jsx(s.Fragment,{children:s.jsxs(se,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:[s.jsx(Ee,{mode:"multiple",allowClear:!0,placeholder:p("chat.skillsPlaceholder",{defaultValue:"Skills (optional)"}),value:N.map(e=>e.value),onChange:(e,t)=>{Ze(t)?M(t.map(n=>({type:n.skillType,value:n.value}))):M(t?[{type:t.skillType,value:t.value}]:[])},options:[...fe,...he],className:ae(f.skillsSelect,"chat-skills-select")}),s.jsx(Je,{value:Y,onSubmit:async()=>{Ce(Y.trim()),G("")},onChange:G,onCancel:()=>{xe()},loading:P,className:ae(f.sender,"chat-sender"),placeholder:p("chat.inputPlaceholder")})]})});return s.jsxs(Ye,{children:[pe,s.jsxs(it.Provider,{value:{onReload:be,setMessage:ve},children:[s.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[s.jsx(Pe.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:s.jsx(ze,{}),value:"classic"},{label:s.jsx(ne,{}),value:"sidebar"},{label:s.jsx(ne,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>C(e.target.value),value:r}),s.jsxs(se,{style:{float:"right",marginTop:10},children:[s.jsx(I,{type:"primary",onClick:()=>{b()},loading:B,icon:s.jsx(te,{}),style:{display:r==="classic"?"none":"block"}}),s.jsx(Be,{menu:{items:K.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{L(e)}},placement:"bottomRight",children:s.jsx(I,{icon:H?s.jsx(_,{size:"small"}):s.jsx(Ve,{}),style:{display:r==="classic"?"none":"block"}})}),s.jsx(I,{type:"text",onClick:()=>d(!1),children:s.jsx(De,{})})]})]}),s.jsxs("div",{className:r==="classic"?f.classicLayout:f.siderLayout,style:{minWidth:r==="classic"?"500px":"400px"},children:[r==="classic"?_e:null,s.jsxs("div",{className:f.chat,children:[Ie,$e]})]})]})]})};export{It as AIChat,It as default,ot as useMarkdownTheme};
