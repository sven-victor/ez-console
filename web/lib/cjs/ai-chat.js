"use strict";var Re=Object.defineProperty;var Ee=(r,n,a)=>n in r?Re(r,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[n]=a;var Z=(r,n,a)=>Ee(r,typeof n!="symbol"?n+"":n,a);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("./vendor.js"),C=require("./index.js"),S=require("@ant-design/icons"),R=require("@ant-design/x"),B=require("@ant-design/x-sdk"),ee=require("@ant-design/x-markdown"),w=require("ahooks"),u=require("antd"),se=require("antd-style"),m=require("react"),te=require("react-i18next"),M=require("dayjs"),Ce=require("./contexts.js"),Se=require("classnames");;/* empty css              */const ne=se.createStyles(({token:r,css:n})=>({siderLayout:n`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,classicLayout:n`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,sider:n`
      background: ${r.colorBgLayout}80;
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
        color: ${r.colorText};
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
      border-top: 1px solid ${r.colorBorderSecondary};
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
      padding-block: ${r.paddingLG}px;
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
      color: ${r.colorText} !important;
    `,senderPrompt:n`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${r.colorText};
    `}));class we extends Error{constructor(a,p){super(a);Z(this,"buffer");this.buffer=p}}function _e(r){if(r==null||typeof r!="object")return!1;const n=r;if(n.name==="AbortError")return!0;const a=typeof n.message=="string"?n.message:"";return/aborted/i.test(a)||/BodyStreamBuffer/i.test(a)}class Te extends B.AbstractChatProvider{transformParams(n,a){if(typeof n!="object")throw new Error("requestParams must be an object");return{...(a==null?void 0:a.params)||{},...n||{}}}transformLocalMessage({content:n}){return{content:n,role:"user"}}transformMessage(n){const{originMessage:a,chunk:p,status:c}=n||{};if(!p)return{...a,content:(a==null?void 0:a.content)||"",role:"assistant",status:c};let d;try{d=JSON.parse(p.data)}catch{return{...a,content:(a==null?void 0:a.content)||"",role:"assistant",status:c}}const b=d.message_id===(a==null?void 0:a.messageId)?`${(a==null?void 0:a.content)||""}${d.content||""}`:d.content||"";switch(d.event_type){case"tool_call":case"content":return{...a,content:b,role:"assistant",messageId:d.message_id,status:c};case"error":return{...a,content:b,role:"assistant",error:d.content,messageId:d.message_id,status:c};case"client_tool_pending":return{...a,content:b||"",role:"assistant",pendingClientToolCalls:d.client_tool_calls,messageId:d.message_id,status:c};default:return{...a,content:b||(a==null?void 0:a.content)||"",role:"assistant",messageId:d.message_id||(a==null?void 0:a.messageId),status:c}}}}const H=new Map,qe=r=>(H.get(r)||H.set(r,new Te({request:B.XRequest(`/api/ai/chat/sessions/${r}`,{manual:!0,middlewares:{onRequest:async(n,a)=>{const p=localStorage.getItem("orgID"),{sessionId:c}=a.params??{},d={...a.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...p?{"X-Scope-OrgID":p}:{}};return[c?`/api/ai/chat/sessions/${c}`:n,{...a,headers:d}]}}})})),H.get(r)),Ie=r=>{var c;const{className:n,children:a}=r,p=((c=n==null?void 0:n.match(/language-(\w+)/))==null?void 0:c[1])||"";return typeof a!="string"?null:p==="mermaid"?s.jsxRuntimeExports.jsx(R.Mermaid,{children:a}):s.jsxRuntimeExports.jsx("code",{className:"ant-highlightCode-code",children:s.jsxRuntimeExports.jsx(R.CodeHighlighter,{lang:p,children:a})})},Ae=m.createContext({}),Le=({bubble:r={},messages:n,loading:a,layout:p="classic",onSendMessage:c})=>{const{styles:d}=ne(),{isDarkMode:b}=se.useThemeMode(),j=m.useMemo(()=>{if(!r.components)return{code:Ie};const i={};for(const v in r.components){const x=r.components[v];if(typeof x=="string"){i[v]=x;continue}i[v]=_=>s.jsxRuntimeExports.jsx(x,{..._,onSendMessage:c})}return i},[c,r.components]),{contentRender:L=i=>s.jsxRuntimeExports.jsx(ee.XMarkdown,{paragraphTag:"div",content:i,className:b?"x-markdown-dark":"x-markdown-light",components:j}),footerRender:y=({message:i})=>{if(i.error)return s.jsxRuntimeExports.jsx("div",{children:s.jsxRuntimeExports.jsx(ee.XMarkdown,{content:i.error,components:j})})}}=r,k=m.useMemo(()=>(n||[]).map(i=>({...i.message,key:i.id,contentRender:L,footer:(v,x)=>y==null?void 0:y(i,x,c)})).filter(i=>i.content),[n]);return s.jsxRuntimeExports.jsx("div",{className:d.chatList,children:s.jsxRuntimeExports.jsx(u.Spin,{spinning:a,children:s.jsxRuntimeExports.jsx(R.Bubble.List,{items:k,style:{height:"100%",paddingInline:p==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>s.jsxRuntimeExports.jsx(u.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>s.jsxRuntimeExports.jsx(u.Spin,{size:"small"})},user:{placement:"end"}}})})})},ae=({bubble:r={}})=>{const{layout:n,setVisible:a,setLayout:p,onCallAI:c,activeConversationKey:d,setActiveConversationKey:b,conversations:j,fetchConversationsLoading:L,ephemeralSystemPrompts:y,clientTools:k}=Ce.useAI(),{t:i}=te.useTranslation("ai"),{t:v}=te.useTranslation("common"),{styles:x}=ne(),_=e=>({key:e.id,label:e.title,group:M(e.start_time).isSame(M(),"day")?i("chat.today"):M(e.start_time).format("YYYY-MM-DD")}),{conversations:X,activeConversationKey:g,setActiveConversationKey:N,addConversation:oe,setConversations:re,getConversation:V,setConversation:T,removeConversation:ie,getMessages:le}=B.useXConversations({defaultActiveConversationKey:d,defaultConversations:(j==null?void 0:j.map(e=>_(e)))||[]});m.useEffect(()=>{b(g)},[g]);const{message:F}=u.App.useApp(),[K,J]=m.useState(""),[ce,ue]=m.useState(!1),[q,de]=m.useState([]),{data:Y}=w.useRequest(()=>C.api.system.listSkillDomains()),{data:P}=w.useRequest(()=>C.api.system.listSkills({current:1,page_size:500})),G=m.useMemo(()=>[...(Y??[]).map(e=>({skillType:"domain",key:e,label:s.jsxRuntimeExports.jsxs(s.jsxRuntimeExports.Fragment,{children:[s.jsxRuntimeExports.jsx(u.Tag,{children:i("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((P==null?void 0:P.data)??[]).map(e=>({skillType:"skill",key:e.id,label:s.jsxRuntimeExports.jsxs(s.jsxRuntimeExports.Fragment,{children:[s.jsxRuntimeExports.jsx(u.Tag,{children:i("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[P,Y]),[I,W]=m.useState(),{onRequest:$,messages:f,isRequesting:D,abort:me,onReload:pe,setMessages:xe,setMessage:ge}=B.useXChat({provider:qe(g),conversationKey:g,defaultMessages:[],requestPlaceholder:()=>({content:v("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>_e(t)?{content:"",role:"assistant"}:t instanceof we?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),A=m.useCallback(()=>{const e={};return y.length>0&&(e.ephemeral_system_prompts=y),k.length>0&&(e.client_tools=k.map(t=>({name:t.name,description:t.description,parameters:t.parameters}))),e},[y,k]),O=m.useRef(null),U=m.useCallback(async e=>{const t=[];for(const o of e){const l=k.find(h=>h.name===o.name);if(!l){t.push({tool_call_id:o.id,content:JSON.stringify({error:`Client tool handler not found for ${o.name}`})});continue}try{const h=await Promise.resolve(l.handler(o.arguments));t.push({tool_call_id:o.id,content:h})}catch(h){const ve=h instanceof Error?h.message:String(h);t.push({tool_call_id:o.id,content:JSON.stringify({error:ve})})}}$({content:"",client_tool_results:t,...A()})},[k,$,A]);m.useEffect(()=>{var e,t;if(!D&&f&&f.length>0){const o=f[f.length-1];if((t=(e=o==null?void 0:o.message)==null?void 0:e.pendingClientToolCalls)!=null&&t.length){const l=o.message.pendingClientToolCalls;O.current!==l&&(O.current=l,U(l))}else O.current=null}},[D,f,U]);const Q=e=>{if(e){if(!g){E(e);return}$({content:e,domains:q.filter(t=>t.type==="domain").map(t=>t.value),skill_ids:q.filter(t=>t.type==="skill").map(t=>t.value),...A()})}},{run:fe,loading:he}=w.useRequest(async e=>await C.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{F.error(i("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(f&&f.length>0&&(f[f.length-1].status==="loading"||f.length>e.messages.length))return;const t=[];let o={id:"",message:{content:"",role:"assistant"},status:"success"};for(const l of e.messages)switch(l.role){case"assistant":o.status=l.status==="completed"&&o.status==="success"?"success":"error",o.message.role="assistant",o.id!==l.id&&l.content&&(o.message.content=l.content),o.id=l.id;break;case"user":o.message.content.length>0&&(t.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),o={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:l.id,message:{content:l.content,role:l.role},status:l.status==="completed"?"success":"error"});break}o.message.content.length>0&&t.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),xe(t)}}),{run:E,loading:z}=w.useRequest(async(e,t,o=!1)=>await C.api.ai.createChatSession({title:i("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:o}),{manual:!0,onError:()=>{F.error(i("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[t])=>{oe(_(e),"prepend"),N(e.id),t&&W({message:t,sessionId:e.id})}});m.useEffect(()=>{re((j==null?void 0:j.map(e=>_(e)))||[])},[j]);const{run:je}=w.useRequest(async e=>await C.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){F.error(i("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const o=V(t);o&&T(t,{...o,loading:!1})},onSuccess(e,[t]){ie(t)}}),{run:be}=w.useRequest(async e=>C.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const o=V(t);o&&T(t,{...o,title:e,loading:!1})},onError:(e,[t])=>{F.error(i("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const o=V(t);o&&T(t,{...o,loading:!1})}});m.useEffect(()=>{if(g&&(I==null?void 0:I.sessionId)===g){const e=I.message;setTimeout(()=>{$({content:e,...A()})},1e3),W(void 0)}},[g,I,A]),m.useEffect(()=>{if(g){const e=le(g);if(e&&e.length>0)return;fe(g)}},[g]),m.useEffect(()=>{c&&E&&c((e,t)=>{E(e,t,!0)})},[E,c]);const ye=s.jsxRuntimeExports.jsxs("div",{className:x.sider,children:[s.jsxRuntimeExports.jsx(u.Button,{onClick:()=>{E()},type:"link",className:x.addBtn,icon:s.jsxRuntimeExports.jsx(S.PlusOutlined,{}),loading:z,children:i("chat.newConversation",{defaultValue:"New Conversation"})}),s.jsxRuntimeExports.jsx(u.Spin,{spinning:L,wrapperClassName:x.conversationsSpin,children:s.jsxRuntimeExports.jsx(R.Conversations,{items:X,activeKey:g,onActiveChange:async e=>{e&&N(e)},className:x.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:i("chat.regenerateTitle"),key:"regenerateTitle",icon:s.jsxRuntimeExports.jsx(S.ReloadOutlined,{}),onClick:()=>{T(e.key,{...e,loading:!0}),be(e.key)}},{label:v("delete"),key:"delete",icon:s.jsxRuntimeExports.jsx(S.DeleteOutlined,{}),danger:!0,onClick:()=>{T(e.key,{...e,loading:!0}),je(e.key)}}]})})})]}),ke=s.jsxRuntimeExports.jsx(s.jsxRuntimeExports.Fragment,{children:s.jsxRuntimeExports.jsx(u.Space,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:s.jsxRuntimeExports.jsx(R.Sender,{footer:e=>s.jsxRuntimeExports.jsxs(u.Flex,{justify:"space-between",align:"center",children:[s.jsxRuntimeExports.jsx(u.Flex,{gap:"small",align:"center",children:s.jsxRuntimeExports.jsx(u.Dropdown,{open:ce,onOpenChange:(t,o)=>{(o.source==="trigger"||t)&&ue(t)},menu:{selectedKeys:q.map(t=>t.value),onClick:t=>{const o=G.find(l=>l.key===t.key);de(l=>l.some(h=>h.value===t.key)?l.filter(h=>h.value!==t.key):[...l,{type:(o==null?void 0:o.skillType)||"skill",value:t.key}])},items:G.map(t=>({label:t.label,key:t.key}))},children:s.jsxRuntimeExports.jsxs(R.Sender.Switch,{value:!1,icon:s.jsxRuntimeExports.jsx(s.LuBookOpenText,{}),children:[i("chat.skill",{defaultValue:"Skills"})," ","(",q.length>0?i("chat.skillsSelected",{defaultValue:"{{count}} selected",count:q.length}):i("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),s.jsxRuntimeExports.jsx(u.Flex,{align:"center",children:e})]}),suffix:!1,value:K,onSubmit:async()=>{Q(K.trim()),J("")},onChange:J,onCancel:()=>{me()},loading:D,className:Se(x.sender,"chat-sender"),placeholder:i("chat.inputPlaceholder")})})});return s.jsxRuntimeExports.jsx(R.XProvider,{children:s.jsxRuntimeExports.jsxs(Ae.Provider,{value:{onReload:pe,setMessage:ge},children:[s.jsxRuntimeExports.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[s.jsxRuntimeExports.jsx(u.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:s.jsxRuntimeExports.jsx(s.LuExternalLink,{style:{transform:"scaleX(-1)"}}),value:"classic"},{label:s.jsxRuntimeExports.jsx(s.LuPanelRightDashed,{}),value:"sidebar"},{label:s.jsxRuntimeExports.jsx(s.LuPanelRight,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>p(e.target.value),value:n}),s.jsxRuntimeExports.jsxs(u.Space,{style:{float:"right",marginTop:10},children:[s.jsxRuntimeExports.jsx(u.Button,{type:"primary",onClick:()=>{E()},loading:z,icon:s.jsxRuntimeExports.jsx(S.PlusOutlined,{}),style:{display:n==="classic"?"none":"block"}}),s.jsxRuntimeExports.jsx(u.Dropdown,{menu:{items:X.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{N(e)}},placement:"bottomRight",children:s.jsxRuntimeExports.jsx(u.Button,{icon:L?s.jsxRuntimeExports.jsx(u.Spin,{size:"small"}):s.jsxRuntimeExports.jsx(S.HistoryOutlined,{}),style:{display:n==="classic"?"none":"block"}})}),s.jsxRuntimeExports.jsx(u.Button,{type:"text",onClick:()=>a(!1),children:s.jsxRuntimeExports.jsx(S.CloseOutlined,{})})]})]}),s.jsxRuntimeExports.jsxs("div",{className:n==="classic"?x.classicLayout:x.siderLayout,style:{minWidth:n==="classic"?"500px":"400px"},children:[n==="classic"?ye:null,s.jsxRuntimeExports.jsxs("div",{className:x.chat,children:[s.jsxRuntimeExports.jsx(Le,{bubble:r,messages:f,loading:he||z,layout:n,onSendMessage:Q}),ke]})]})]})})};exports.AIChat=ae;exports.default=ae;
