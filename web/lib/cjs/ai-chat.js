"use strict";var Re=Object.defineProperty;var Ce=(i,n,o)=>n in i?Re(i,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[n]=o;var Q=(i,n,o)=>Ce(i,typeof n!="symbol"?n+"":n,o);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("./vendor.js"),E=require("./index.js"),S=require("@ant-design/icons"),R=require("@ant-design/x"),M=require("@ant-design/x-sdk"),Z=require("@ant-design/x-markdown"),w=require("ahooks"),c=require("antd"),te=require("antd-style"),d=require("react"),ee=require("react-i18next"),O=require("dayjs"),Ee=require("./contexts.js"),Se=require("classnames");;/* empty css              */const se=te.createStyles(({token:i,css:n})=>({siderLayout:n`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,classicLayout:n`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,sider:n`
      background: ${i.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,logo:n`
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
    `,addBtn:n`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,conversationsSpin:n`
      height: 100%;
      overflow-y: auto;
    `,conversations:n`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,siderFooter:n`
      border-top: 1px solid ${i.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,chat:n`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${i.paddingLG}px;
      gap: 16px;
    `,chatPrompt:n`
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
    `,chatList:n`
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
    `,loadingMessage:n`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,placeholder:n`
      padding-top: 32px;
    `,skillsSelect:n`
      width: 100%;
      max-width: min(95%, 700px);
      margin: 0 20px;
    `,sender:n`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,speechButton:n`
      font-size: 18px;
      color: ${i.colorText} !important;
    `,senderPrompt:n`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${i.colorText};
    `}));class we extends Error{constructor(o,p){super(o);Q(this,"buffer");this.buffer=p}}function _e(i){if(i==null||typeof i!="object")return!1;const n=i;if(n.name==="AbortError")return!0;const o=typeof n.message=="string"?n.message:"";return/aborted/i.test(o)||/BodyStreamBuffer/i.test(o)}class Te extends M.AbstractChatProvider{transformParams(n,o){if(typeof n!="object")throw new Error("requestParams must be an object");return{...(o==null?void 0:o.params)||{},...n||{}}}transformLocalMessage({content:n}){return{content:n,role:"user"}}transformMessage(n){const{originMessage:o,chunk:p,status:u}=n||{};if(!p)return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:u};const m=JSON.parse(p.data),y=m.message_id===(o==null?void 0:o.messageId)?`${(o==null?void 0:o.content)||""}${m.content||""}`:m.content||"";switch(m.event_type){case"tool_call":case"content":return{...o,content:y,role:"assistant",messageId:m.message_id,status:u};case"error":return{...o,content:y,role:"assistant",error:m.content,messageId:m.message_id,status:u};case"client_tool_pending":return{...o,content:y||"",role:"assistant",pendingClientToolCalls:m.client_tool_calls,messageId:m.message_id,status:u}}}}const z=new Map,qe=i=>(z.get(i)||z.set(i,new Te({request:M.XRequest(`/api/ai/chat/sessions/${i}`,{manual:!0,middlewares:{onRequest:async(n,o)=>{const p=localStorage.getItem("orgID"),{sessionId:u}=o.params,m={...o.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...p?{"X-Scope-OrgID":p}:{}};return[u?`/api/ai/chat/sessions/${u}`:n,{...o,headers:m}]}}})})),z.get(i)),Le=i=>{var u;const{className:n,children:o}=i,p=((u=n==null?void 0:n.match(/language-(\w+)/))==null?void 0:u[1])||"";return typeof o!="string"?null:p==="mermaid"?s.jsxRuntimeExports.jsx(R.Mermaid,{children:o}):s.jsxRuntimeExports.jsx("code",{className:"ant-highlightCode-code",children:s.jsxRuntimeExports.jsx(R.CodeHighlighter,{lang:p,children:o})})},Fe=d.createContext({}),Ie=({bubble:i={},messages:n,loading:o,layout:p="classic",onSendMessage:u})=>{const{styles:m}=se(),{isDarkMode:y}=te.useThemeMode(),j=d.useMemo(()=>{if(!i.components)return{code:Le};const r={};for(const v in i.components){const x=i.components[v];if(typeof x=="string"){r[v]=x;continue}r[v]=_=>s.jsxRuntimeExports.jsx(x,{..._,onSendMessage:u})}return r},[u,i.components]),{contentRender:A=r=>s.jsxRuntimeExports.jsx(Z.XMarkdown,{paragraphTag:"div",content:r,className:y?"x-markdown-dark":"x-markdown-light",components:j}),footerRender:b=({message:r})=>{if(r.error)return s.jsxRuntimeExports.jsx("div",{children:s.jsxRuntimeExports.jsx(Z.XMarkdown,{content:r.error,components:j})})}}=i,k=d.useMemo(()=>(n||[]).map(r=>({...r.message,key:r.id,contentRender:A,footer:(v,x)=>b==null?void 0:b(r,x,u)})).filter(r=>r.content),[n]);return s.jsxRuntimeExports.jsx("div",{className:m.chatList,children:s.jsxRuntimeExports.jsx(c.Spin,{spinning:o,children:s.jsxRuntimeExports.jsx(R.Bubble.List,{items:k,style:{height:"100%",paddingInline:p==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>s.jsxRuntimeExports.jsx(c.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>s.jsxRuntimeExports.jsx(c.Spin,{size:"small"})},user:{placement:"end"}}})})})},ne=({bubble:i={}})=>{const{layout:n,setVisible:o,setLayout:p,onCallAI:u,activeConversationKey:m,setActiveConversationKey:y,conversations:j,fetchConversationsLoading:A,ephemeralSystemPrompts:b,clientTools:k}=Ee.useAI(),{t:r}=ee.useTranslation("ai"),{t:v}=ee.useTranslation("common"),{styles:x}=se(),_=e=>({key:e.id,label:e.title,group:O(e.start_time).isSame(O(),"day")?r("chat.today"):O(e.start_time).format("YYYY-MM-DD")}),{conversations:H,activeConversationKey:g,setActiveConversationKey:$,addConversation:ae,setConversations:oe,getConversation:B,setConversation:T,removeConversation:ie,getMessages:re}=M.useXConversations({defaultActiveConversationKey:m,defaultConversations:(j==null?void 0:j.map(e=>_(e)))||[]});d.useEffect(()=>{y(g)},[g]);const[X,le]=c.message.useMessage(),[K,J]=d.useState(""),[ce,ue]=d.useState(!1),[q,de]=d.useState([]),{data:me}=w.useRequest(()=>E.api.system.listSkillDomains()),{data:L}=w.useRequest(()=>E.api.system.listSkills({current:1,page_size:500})),Y=d.useMemo(()=>[...(me??[]).map(e=>({skillType:"domain",key:e,label:s.jsxRuntimeExports.jsxs(s.jsxRuntimeExports.Fragment,{children:[s.jsxRuntimeExports.jsx(c.Tag,{children:r("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((L==null?void 0:L.data)??[]).map(e=>({skillType:"skill",key:e.id,label:s.jsxRuntimeExports.jsxs(s.jsxRuntimeExports.Fragment,{children:[s.jsxRuntimeExports.jsx(c.Tag,{children:r("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[L,L]),[F,G]=d.useState(),{onRequest:P,messages:h,isRequesting:N,abort:pe,onReload:xe,setMessages:ge,setMessage:fe}=M.useXChat({provider:qe(g),conversationKey:g,defaultMessages:[],requestPlaceholder:()=>({content:v("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>_e(t)?{content:"",role:"assistant"}:t instanceof we?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),I=d.useCallback(()=>{const e={};return b.length>0&&(e.ephemeral_system_prompts=b),k.length>0&&(e.client_tools=k.map(t=>({name:t.name,description:t.description,parameters:t.parameters}))),e},[b,k]),V=d.useRef(null),W=d.useCallback(async e=>{const t=[];for(const a of e){const l=k.find(f=>f.name===a.name);if(!l){t.push({tool_call_id:a.id,content:JSON.stringify({error:`Client tool handler not found for ${a.name}`})});continue}try{const f=await Promise.resolve(l.handler(a.arguments));t.push({tool_call_id:a.id,content:f})}catch(f){t.push({tool_call_id:a.id,content:JSON.stringify({error:(f==null?void 0:f.message)||String(f)})})}}P({content:"",client_tool_results:t,...I()})},[k,P,I]);d.useEffect(()=>{var e,t;if(!N&&h&&h.length>0){const a=h[h.length-1];if((t=(e=a==null?void 0:a.message)==null?void 0:e.pendingClientToolCalls)!=null&&t.length){const l=a.message.pendingClientToolCalls;V.current!==l&&(V.current=l,W(l))}else V.current=null}},[N,h,W]);const U=e=>{if(e){if(!g){C(e);return}P({content:e,domains:q.filter(t=>t.type==="domain").map(t=>t.value),skill_ids:q.filter(t=>t.type==="skill").map(t=>t.value),...I()})}},{run:he,loading:je}=w.useRequest(async e=>await E.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{c.message.error(r("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(h&&h.length>0&&(h[h.length-1].status==="loading"||h.length>e.messages.length))return;const t=[];let a={id:"",message:{content:"",role:"assistant"},status:"success"};for(const l of e.messages)switch(l.role){case"assistant":a.status=l.status==="completed"&&a.status==="success"?"success":"error",a.message.role="assistant",a.id!==l.id&&l.content&&(a.message.content=l.content),a.id=l.id;break;case"user":a.message.content.length>0&&(t.push({id:a.id,message:{content:a.message.content,role:a.message.role},status:a.status}),a={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:l.id,message:{content:l.content,role:l.role},status:l.status==="completed"?"success":"error"});break}a.message.content.length>0&&t.push({id:a.id,message:{content:a.message.content,role:a.message.role},status:a.status}),ge(t)}}),{run:C,loading:D}=w.useRequest(async(e,t,a=!1)=>await E.api.ai.createChatSession({title:r("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:a}),{manual:!0,onError:()=>{c.message.error(r("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[t])=>{ae(_(e),"prepend"),$(e.id),t&&G({message:t,sessionId:e.id})}});d.useEffect(()=>{oe((j==null?void 0:j.map(e=>_(e)))||[])},[j]);const{run:ye}=w.useRequest(async e=>await E.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){X.error(r("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const a=B(t);a&&T(t,{...a,loading:!1})},onSuccess(e,[t]){ie(t)}}),{run:be}=w.useRequest(async e=>E.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const a=B(t);a&&T(t,{...a,title:e,loading:!1})},onError:(e,[t])=>{X.error(r("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const a=B(t);a&&T(t,{...a,loading:!1})}});d.useEffect(()=>{if(g&&(F==null?void 0:F.sessionId)===g){const e=F.message;setTimeout(()=>{P({content:e,...I()})},1e3),G(void 0)}},[g,F,I]),d.useEffect(()=>{if(g){const e=re(g);if(e&&e.length>0)return;he(g)}},[g]),d.useEffect(()=>{u&&C&&u((e,t)=>{C(e,t,!0)})},[C,u]);const ke=s.jsxRuntimeExports.jsxs("div",{className:x.sider,children:[s.jsxRuntimeExports.jsx(c.Button,{onClick:()=>{C()},type:"link",className:x.addBtn,icon:s.jsxRuntimeExports.jsx(S.PlusOutlined,{}),loading:D,children:r("chat.newConversation",{defaultValue:"New Conversation"})}),s.jsxRuntimeExports.jsx(c.Spin,{spinning:A,wrapperClassName:x.conversationsSpin,children:s.jsxRuntimeExports.jsx(R.Conversations,{items:H,activeKey:g,onActiveChange:async e=>{e&&$(e)},className:x.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:r("chat.regenerateTitle"),key:"regenerateTitle",icon:s.jsxRuntimeExports.jsx(S.ReloadOutlined,{}),onClick:()=>{T(e.key,{...e,loading:!0}),be(e.key)}},{label:v("delete"),key:"delete",icon:s.jsxRuntimeExports.jsx(S.DeleteOutlined,{}),danger:!0,onClick:()=>{T(e.key,{...e,loading:!0}),ye(e.key)}}]})})})]}),ve=s.jsxRuntimeExports.jsx(s.jsxRuntimeExports.Fragment,{children:s.jsxRuntimeExports.jsx(c.Space,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:s.jsxRuntimeExports.jsx(R.Sender,{footer:e=>s.jsxRuntimeExports.jsxs(c.Flex,{justify:"space-between",align:"center",children:[s.jsxRuntimeExports.jsx(c.Flex,{gap:"small",align:"center",children:s.jsxRuntimeExports.jsx(c.Dropdown,{open:ce,onOpenChange:(t,a)=>{(a.source==="trigger"||t)&&ue(t)},menu:{selectedKeys:q.map(t=>t.value),onClick:t=>{const a=Y.find(l=>l.key===t.key);de(l=>l.some(f=>f.value===t.key)?l.filter(f=>f.value!==t.key):[...l,{type:(a==null?void 0:a.skillType)||"skill",value:t.key}])},items:Y.map(t=>({label:t.label,key:t.key}))},children:s.jsxRuntimeExports.jsxs(R.Sender.Switch,{value:!1,icon:s.jsxRuntimeExports.jsx(s.LuBookOpenText,{}),children:[r("chat.skill",{defaultValue:"Skills"})," ","(",q.length>0?r("chat.skillsSelected",{defaultValue:"{{count}} selected",count:q.length}):r("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),s.jsxRuntimeExports.jsx(c.Flex,{align:"center",children:e})]}),suffix:!1,value:K,onSubmit:async()=>{U(K.trim()),J("")},onChange:J,onCancel:()=>{pe()},loading:N,className:Se(x.sender,"chat-sender"),placeholder:r("chat.inputPlaceholder")})})});return s.jsxRuntimeExports.jsxs(R.XProvider,{children:[le,s.jsxRuntimeExports.jsxs(Fe.Provider,{value:{onReload:xe,setMessage:fe},children:[s.jsxRuntimeExports.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[s.jsxRuntimeExports.jsx(c.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:s.jsxRuntimeExports.jsx(s.LuExternalLink,{style:{transform:"scaleX(-1)"}}),value:"classic"},{label:s.jsxRuntimeExports.jsx(s.LuPanelRightDashed,{}),value:"sidebar"},{label:s.jsxRuntimeExports.jsx(s.LuPanelRight,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>p(e.target.value),value:n}),s.jsxRuntimeExports.jsxs(c.Space,{style:{float:"right",marginTop:10},children:[s.jsxRuntimeExports.jsx(c.Button,{type:"primary",onClick:()=>{C()},loading:D,icon:s.jsxRuntimeExports.jsx(S.PlusOutlined,{}),style:{display:n==="classic"?"none":"block"}}),s.jsxRuntimeExports.jsx(c.Dropdown,{menu:{items:H.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{$(e)}},placement:"bottomRight",children:s.jsxRuntimeExports.jsx(c.Button,{icon:A?s.jsxRuntimeExports.jsx(c.Spin,{size:"small"}):s.jsxRuntimeExports.jsx(S.HistoryOutlined,{}),style:{display:n==="classic"?"none":"block"}})}),s.jsxRuntimeExports.jsx(c.Button,{type:"text",onClick:()=>o(!1),children:s.jsxRuntimeExports.jsx(S.CloseOutlined,{})})]})]}),s.jsxRuntimeExports.jsxs("div",{className:n==="classic"?x.classicLayout:x.siderLayout,style:{minWidth:n==="classic"?"500px":"400px"},children:[n==="classic"?ke:null,s.jsxRuntimeExports.jsxs("div",{className:x.chat,children:[s.jsxRuntimeExports.jsx(Ie,{bubble:i,messages:h,loading:je||D,layout:n,onSendMessage:U}),ve]})]})]})]})};exports.AIChat=ne;exports.default=ne;
