var we=Object.defineProperty;var _e=(r,s,a)=>s in r?we(r,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[s]=a;var U=(r,s,a)=>_e(r,typeof s!="symbol"?s+"":s,a);import{u as Z,r as u,w as Te,d as j,j as n,q as ee,B as N,b8 as te,S as A,a$ as Ie,a_ as $e,E as se,a as Ae,cc as q,D as ne,eq as Le,b9 as Re,er as Ee,es as Fe,et as Ne,bQ as Pe,cm as Ve,b as Be,bM as M,y as ze,ag as De}from"./vendor.CwGqK0_E.js";import{a as S}from"./index.BV4JUfrr.js";import{d as qe}from"./contexts.BuLpJWld.js";import{u as Me,a as Xe,C as He,S as ae,X as Ke,b as Oe,c as oe,F as Je,A as Ye,M as Ge,d as We}from"./ant-design-x.DreOSF0r.js";import"./vite.CnSqVV0U.js";import"./lodash.Bb75kzRV.js";import"./highlight.DHmnecVl.js";import"./ai.Cralkgh1.js";import"./client.DtJrcsow.js";import"./base.BV9pYBe8.js";import"./authorization.DgpYUwh3.js";import"./system.CssubsYB.js";import"./oauth.BpV6F1YX.js";import"./tasks.rxQz4SOC.js";import"./components.D4T-1YqP.js";import"./ai-chat-layout.ClJSDAGy.js";import"./mermaid.CJaSyxfK.js";import"./highlighter.BXlfZXfN.js";import"./refractor.CRGg9w-T.js";const re=Be(({token:r,css:s})=>({siderLayout:s`
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
    `}));class Qe extends Error{constructor(a,m){super(a);U(this,"buffer");this.buffer=m}}function Ue(r){if(r==null||typeof r!="object")return!1;const s=r;if(s.name==="AbortError")return!0;const a=typeof s.message=="string"?s.message:"";return/aborted/i.test(a)||/BodyStreamBuffer/i.test(a)}class Ze extends Ye{transformParams(s,a){if(typeof s!="object")throw new Error("requestParams must be an object");return{...(a==null?void 0:a.params)||{},...s||{}}}transformLocalMessage({content:s}){return{content:s,role:"user"}}transformMessage(s){const{originMessage:a,chunk:m,status:c}=s||{};if(!m)return{...a,content:(a==null?void 0:a.content)||"",role:"assistant",status:c};let d;try{d=JSON.parse(m.data)}catch{return{...a,content:(a==null?void 0:a.content)||"",role:"assistant",status:c}}const b=d.message_id===(a==null?void 0:a.messageId)?`${(a==null?void 0:a.content)||""}${d.content||""}`:d.content||"";switch(d.event_type){case"tool_call":case"content":return{...a,content:b,role:"assistant",messageId:d.message_id,status:c};case"error":return{...a,content:b,role:"assistant",error:d.content,messageId:d.message_id,status:c};case"client_tool_pending":return{...a,content:b||"",role:"assistant",pendingClientToolCalls:d.client_tool_calls,messageId:d.message_id,status:c};default:return{...a,content:b||(a==null?void 0:a.content)||"",role:"assistant",messageId:d.message_id||(a==null?void 0:a.messageId),status:c}}}}const X=new Map,et=r=>(X.get(r)||X.set(r,new Ze({request:Oe(`/api/ai/chat/sessions/${r}`,{manual:!0,middlewares:{onRequest:async(s,a)=>{const m=localStorage.getItem("orgID"),{sessionId:c}=a.params??{},d={...a.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...m?{"X-Scope-OrgID":m}:{}};return[c?`/api/ai/chat/sessions/${c}`:s,{...a,headers:d}]}}})})),X.get(r)),tt=r=>{var c;const{className:s,children:a}=r,m=((c=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:c[1])||"";return typeof a!="string"?null:m==="mermaid"?n.jsx(Ge,{children:a}):n.jsx("code",{className:"ant-highlightCode-code",children:n.jsx(We,{lang:m,children:a})})},st=ze.createContext({}),nt=({bubble:r={},messages:s,loading:a,layout:m="classic",onSendMessage:c})=>{const{styles:d}=re(),{isDarkMode:b}=De(),x=u.useMemo(()=>{if(!r.components)return{code:tt};const i={};for(const v in r.components){const p=r.components[v];if(typeof p=="string"){i[v]=p;continue}i[v]=w=>n.jsx(p,{...w,onSendMessage:c})}return i},[c,r.components]),{contentRender:L=i=>n.jsx(oe,{paragraphTag:"div",content:i,className:b?"x-markdown-dark":"x-markdown-light",components:x}),footerRender:y=({message:i})=>{if(i.error)return n.jsx("div",{children:n.jsx(oe,{content:i.error,components:x})})}}=r,k=u.useMemo(()=>(s||[]).map(i=>({...i.message,key:i.id,contentRender:L,footer:(v,p)=>y==null?void 0:y(i,p,c)})).filter(i=>i.content),[s]);return n.jsx("div",{className:d.chatList,children:n.jsx(A,{spinning:a,children:n.jsx(Je.List,{items:k,style:{height:"100%",paddingInline:m==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>n.jsx(A,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>n.jsx(A,{size:"small"})},user:{placement:"end"}}})})})},St=({bubble:r={}})=>{const{layout:s,setVisible:a,setLayout:m,onCallAI:c,activeConversationKey:d,setActiveConversationKey:b,conversations:x,fetchConversationsLoading:L,ephemeralSystemPrompts:y,clientTools:k}=qe(),{t:i}=Z("ai"),{t:v}=Z("common"),{styles:p}=re(),w=e=>({key:e.id,label:e.title,group:M(e.start_time).isSame(M(),"day")?i("chat.today"):M(e.start_time).format("YYYY-MM-DD")}),{conversations:H,activeConversationKey:g,setActiveConversationKey:P,addConversation:ie,setConversations:le,getConversation:V,setConversation:_,removeConversation:ce,getMessages:de}=Me({defaultActiveConversationKey:d,defaultConversations:(x==null?void 0:x.map(e=>w(e)))||[]});u.useEffect(()=>{b(g)},[g]);const{message:R}=Te.useApp(),[K,O]=u.useState(""),[ue,me]=u.useState(!1),[T,pe]=u.useState([]),{data:J}=j(()=>S.system.listSkillDomains()),{data:E}=j(()=>S.system.listSkills({current:1,page_size:500})),Y=u.useMemo(()=>[...(J??[]).map(e=>({skillType:"domain",key:e,label:n.jsxs(n.Fragment,{children:[n.jsx(ee,{children:i("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((E==null?void 0:E.data)??[]).map(e=>({skillType:"skill",key:e.id,label:n.jsxs(n.Fragment,{children:[n.jsx(ee,{children:i("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[E,J]),[I,G]=u.useState(),{onRequest:F,messages:f,isRequesting:B,abort:ge,onReload:fe,setMessages:he,setMessage:xe}=Xe({provider:et(g),conversationKey:g,defaultMessages:[],requestPlaceholder:()=>({content:v("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>Ue(t)?{content:"",role:"assistant"}:t instanceof Qe?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),$=u.useCallback(()=>{const e={};return y.length>0&&(e.ephemeral_system_prompts=y),k.length>0&&(e.client_tools=k.map(t=>({name:t.name,description:t.description,parameters:t.parameters}))),e},[y,k]),z=u.useRef(null),W=u.useCallback(async e=>{const t=[];for(const o of e){const l=k.find(h=>h.name===o.name);if(!l){t.push({tool_call_id:o.id,content:JSON.stringify({error:`Client tool handler not found for ${o.name}`})});continue}try{const h=await Promise.resolve(l.handler(o.arguments));t.push({tool_call_id:o.id,content:h})}catch(h){const Se=h instanceof Error?h.message:String(h);t.push({tool_call_id:o.id,content:JSON.stringify({error:Se})})}}F({content:"",client_tool_results:t,...$()})},[k,F,$]);u.useEffect(()=>{var e,t;if(!B&&f&&f.length>0){const o=f[f.length-1];if((t=(e=o==null?void 0:o.message)==null?void 0:e.pendingClientToolCalls)!=null&&t.length){const l=o.message.pendingClientToolCalls;z.current!==l&&(z.current=l,W(l))}else z.current=null}},[B,f,W]);const Q=e=>{if(e){if(!g){C(e);return}F({content:e,domains:T.filter(t=>t.type==="domain").map(t=>t.value),skill_ids:T.filter(t=>t.type==="skill").map(t=>t.value),...$()})}},{run:be,loading:ye}=j(async e=>await S.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{R.error(i("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(f&&f.length>0&&(f[f.length-1].status==="loading"||f.length>e.messages.length))return;const t=[];let o={id:"",message:{content:"",role:"assistant"},status:"success"};for(const l of e.messages)switch(l.role){case"assistant":o.status=l.status==="completed"&&o.status==="success"?"success":"error",o.message.role="assistant",o.id!==l.id&&l.content&&(o.message.content=l.content),o.id=l.id;break;case"user":o.message.content.length>0&&(t.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),o={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:l.id,message:{content:l.content,role:l.role},status:l.status==="completed"?"success":"error"});break}o.message.content.length>0&&t.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),he(t)}}),{run:C,loading:D}=j(async(e,t,o=!1)=>await S.ai.createChatSession({title:i("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:o}),{manual:!0,onError:()=>{R.error(i("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[t])=>{ie(w(e),"prepend"),P(e.id),t&&G({message:t,sessionId:e.id})}});u.useEffect(()=>{le((x==null?void 0:x.map(e=>w(e)))||[])},[x]);const{run:ke}=j(async e=>await S.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){R.error(i("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const o=V(t);o&&_(t,{...o,loading:!1})},onSuccess(e,[t]){ce(t)}}),{run:ve}=j(async e=>S.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const o=V(t);o&&_(t,{...o,title:e,loading:!1})},onError:(e,[t])=>{R.error(i("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const o=V(t);o&&_(t,{...o,loading:!1})}});u.useEffect(()=>{if(g&&(I==null?void 0:I.sessionId)===g){const e=I.message;setTimeout(()=>{F({content:e,...$()})},1e3),G(void 0)}},[g,I,$]),u.useEffect(()=>{if(g){const e=de(g);if(e&&e.length>0)return;be(g)}},[g]),u.useEffect(()=>{c&&C&&c((e,t)=>{C(e,t,!0)})},[C,c]);const Ce=n.jsxs("div",{className:p.sider,children:[n.jsx(N,{onClick:()=>{C()},type:"link",className:p.addBtn,icon:n.jsx(te,{}),loading:D,children:i("chat.newConversation",{defaultValue:"New Conversation"})}),n.jsx(A,{spinning:L,wrapperClassName:p.conversationsSpin,children:n.jsx(He,{items:H,activeKey:g,onActiveChange:async e=>{e&&P(e)},className:p.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:i("chat.regenerateTitle"),key:"regenerateTitle",icon:n.jsx(Ie,{}),onClick:()=>{_(e.key,{...e,loading:!0}),ve(e.key)}},{label:v("delete"),key:"delete",icon:n.jsx($e,{}),danger:!0,onClick:()=>{_(e.key,{...e,loading:!0}),ke(e.key)}}]})})})]}),je=n.jsx(n.Fragment,{children:n.jsx(se,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:n.jsx(ae,{footer:e=>n.jsxs(q,{justify:"space-between",align:"center",children:[n.jsx(q,{gap:"small",align:"center",children:n.jsx(ne,{open:ue,onOpenChange:(t,o)=>{(o.source==="trigger"||t)&&me(t)},menu:{selectedKeys:T.map(t=>t.value),onClick:t=>{const o=Y.find(l=>l.key===t.key);pe(l=>l.some(h=>h.value===t.key)?l.filter(h=>h.value!==t.key):[...l,{type:(o==null?void 0:o.skillType)||"skill",value:t.key}])},items:Y.map(t=>({label:t.label,key:t.key}))},children:n.jsxs(ae.Switch,{value:!1,icon:n.jsx(Le,{}),children:[i("chat.skill",{defaultValue:"Skills"})," ","(",T.length>0?i("chat.skillsSelected",{defaultValue:"{{count}} selected",count:T.length}):i("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),n.jsx(q,{align:"center",children:e})]}),suffix:!1,value:K,onSubmit:async()=>{Q(K.trim()),O("")},onChange:O,onCancel:()=>{ge()},loading:B,className:Ae(p.sender,"chat-sender"),placeholder:i("chat.inputPlaceholder")})})});return n.jsx(Ke,{children:n.jsxs(st.Provider,{value:{onReload:fe,setMessage:xe},children:[n.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[n.jsx(Re.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:n.jsx(Ee,{style:{transform:"scaleX(-1)"}}),value:"classic"},{label:n.jsx(Fe,{}),value:"sidebar"},{label:n.jsx(Ne,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>m(e.target.value),value:s}),n.jsxs(se,{style:{float:"right",marginTop:10},children:[n.jsx(N,{type:"primary",onClick:()=>{C()},loading:D,icon:n.jsx(te,{}),style:{display:s==="classic"?"none":"block"}}),n.jsx(ne,{menu:{items:H.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{P(e)}},placement:"bottomRight",children:n.jsx(N,{icon:L?n.jsx(A,{size:"small"}):n.jsx(Pe,{}),style:{display:s==="classic"?"none":"block"}})}),n.jsx(N,{type:"text",onClick:()=>a(!1),children:n.jsx(Ve,{})})]})]}),n.jsxs("div",{className:s==="classic"?p.classicLayout:p.siderLayout,style:{minWidth:s==="classic"?"500px":"400px"},children:[s==="classic"?Ce:null,n.jsxs("div",{className:p.chat,children:[n.jsx(nt,{bubble:r,messages:f,loading:ye||D,layout:s,onSendMessage:Q}),je]})]})]})})};export{St as AIChat,St as default};
