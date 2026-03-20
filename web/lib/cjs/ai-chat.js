"use strict";var Te=Object.defineProperty;var _e=(i,n,o)=>n in i?Te(i,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[n]=o;var Q=(i,n,o)=>_e(i,typeof n!="symbol"?n+"":n,o);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("./vendor.js"),v=require("./index.js"),f=require("@ant-design/icons"),C=require("@ant-design/x"),q=require("@ant-design/x-sdk"),Z=require("@ant-design/x-markdown"),k=require("ahooks"),r=require("antd"),qe=require("antd-style"),d=require("react"),ee=require("react-i18next"),V=require("dayjs"),Ie=require("./contexts.js"),Le=require("lodash-es"),te=require("classnames");;/* empty css              */const Me=qe.createStyles(({token:i,css:n})=>({siderLayout:n`
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
    `}));class Ae extends Error{constructor(o,c){super(o);Q(this,"buffer");this.buffer=c}}class Ne extends q.AbstractChatProvider{transformParams(n,o){if(typeof n!="object")throw new Error("requestParams must be an object");return{...(o==null?void 0:o.params)||{},...n||{}}}transformLocalMessage({content:n}){return{content:n,role:"user"}}transformMessage(n){const{originMessage:o,chunk:c,status:l}=n||{};if(!c)return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:l};const m=JSON.parse(c.data),R=m.message_id===(o==null?void 0:o.messageId)?`${(o==null?void 0:o.content)||""}${m.content||""}`:m.content||"";switch(m.event_type){case"tool_call":case"content":return{...o,content:R,role:"assistant",messageId:m.message_id,status:l};case"error":return{...o,content:R,role:"assistant",error:m.content,messageId:m.message_id,status:l};case"client_tool_pending":return{...o,content:R||"",role:"assistant",pendingClientToolCalls:m.client_tool_calls,messageId:m.message_id,status:l}}}}const D=new Map,Pe=i=>(D.get(i)||D.set(i,new Ne({request:q.XRequest(`/api/ai/chat/sessions/${i}`,{manual:!0,middlewares:{onRequest:async(n,o)=>{const c=localStorage.getItem("orgID"),{sessionId:l}=o.params,m={...o.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...c?{"X-Scope-OrgID":c}:{}};return[l?`/api/ai/chat/sessions/${l}`:n,{...o,headers:m}]}}})})),D.get(i)),Fe=i=>{var l;const{className:n,children:o}=i,c=((l=n==null?void 0:n.match(/language-(\w+)/))==null?void 0:l[1])||"";return typeof o!="string"?null:c==="mermaid"?s.jsxRuntimeExports.jsx(C.Mermaid,{children:o}):s.jsxRuntimeExports.jsx(C.CodeHighlighter,{lang:c,children:o})},se=()=>{const i=r.theme.useToken(),n=d.useMemo(()=>{var c;return((c=i==null?void 0:i.theme)==null?void 0:c.id)===0},[i]);return[d.useMemo(()=>n?"x-markdown-light":"x-markdown-dark",[n])]},$e=d.createContext({}),ne=({bubble:i={}})=>{const{components:n={code:Fe},contentRender:o=e=>s.jsxRuntimeExports.jsx(Z.XMarkdown,{paragraphTag:"div",content:e,className:ue,components:n}),footerRender:c=({message:e})=>{if(e.error)return s.jsxRuntimeExports.jsx("div",{children:s.jsxRuntimeExports.jsx(Z.XMarkdown,{content:e.error,components:n})})}}=i,{layout:l,setVisible:m,setLayout:R,onCallAI:I,activeConversationKey:ae,setActiveConversationKey:oe,conversations:j,fetchConversationsLoading:H,ephemeralSystemPrompts:L,clientTools:E}=Ie.useAI(),{t:g}=ee.useTranslation("ai"),{t:X}=ee.useTranslation("common"),{styles:h}=Me(),M=e=>({key:e.id,label:e.title,group:V(e.start_time).isSame(V(),"day")?g("chat.today"):V(e.start_time).format("YYYY-MM-DD")}),{conversations:K,activeConversationKey:p,setActiveConversationKey:A,addConversation:ie,setConversations:re,getConversation:N,setConversation:S,removeConversation:le,getMessages:ce}=q.useXConversations({defaultActiveConversationKey:ae,defaultConversations:(j==null?void 0:j.map(e=>M(e)))||[]});d.useEffect(()=>{oe(p)},[p]);const[ue]=se(),[J,de]=r.message.useMessage(),[Y,G]=d.useState(""),[P,F]=d.useState([]),{data:me}=k.useRequest(()=>v.api.system.listSkillDomains()),pe=(me??[]).map(e=>({skillType:"domain",value:e,label:s.jsxRuntimeExports.jsxs(s.jsxRuntimeExports.Fragment,{children:[s.jsxRuntimeExports.jsx(r.Tag,{children:g("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),{data:$}=k.useRequest(()=>v.api.system.listSkills({current:1,page_size:500})),xe=(($==null?void 0:$.data)??[]).map(e=>({skillType:"skill",value:e.id,label:s.jsxRuntimeExports.jsxs(s.jsxRuntimeExports.Fragment,{children:[s.jsxRuntimeExports.jsx(r.Tag,{children:g("chat.skill",{defaultValue:"Skill"})}),e.name]})})),[w,W]=d.useState(),{onRequest:_,messages:x,isRequesting:B,abort:ge,onReload:he,setMessages:fe,setMessage:be}=q.useXChat({provider:Pe(p),conversationKey:p,defaultMessages:[],requestPlaceholder:()=>({content:X("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>t instanceof Ae?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),T=d.useCallback(()=>{const e={};return L.length>0&&(e.ephemeral_system_prompts=L),E.length>0&&(e.client_tools=E.map(t=>({name:t.name,description:t.description,parameters:t.parameters}))),e},[L,E]),O=d.useRef(null),U=d.useCallback(async e=>{const t=[];for(const a of e){const u=E.find(b=>b.name===a.name);if(!u){t.push({tool_call_id:a.id,content:JSON.stringify({error:`Client tool handler not found for ${a.name}`})});continue}try{const b=await Promise.resolve(u.handler(a.arguments));t.push({tool_call_id:a.id,content:b})}catch(b){t.push({tool_call_id:a.id,content:JSON.stringify({error:(b==null?void 0:b.message)||String(b)})})}}_({content:"",client_tool_results:t,...T()})},[E,_,T]);d.useEffect(()=>{var e,t;if(!B&&x&&x.length>0){const a=x[x.length-1];if((t=(e=a==null?void 0:a.message)==null?void 0:e.pendingClientToolCalls)!=null&&t.length){const u=a.message.pendingClientToolCalls;O.current!==u&&(O.current=u,U(u))}else O.current=null}},[B,x,U]);const je=e=>{if(e){if(!p){y(e);return}_({content:e,domains:P.filter(t=>t.type==="domain").map(t=>t.value),skill_ids:P.filter(t=>t.type==="skill").map(t=>t.value),...T()})}},{run:ye,loading:ve}=k.useRequest(async e=>await v.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{r.message.error(g("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(x&&x.length>0&&(x[x.length-1].status==="loading"||x.length>e.messages.length))return;const t=[];let a={id:"",message:{content:"",role:"assistant"},status:"success"};for(const u of e.messages)switch(u.role){case"assistant":a.status=u.status==="completed"&&a.status==="success"?"success":"error",a.message.role="assistant",a.id!==u.id&&u.content&&(a.message.content=u.content),a.id=u.id;break;case"user":a.message.content.length>0&&(t.push({id:a.id,message:{content:a.message.content,role:a.message.role},status:a.status}),a={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:u.id,message:{content:u.content,role:u.role},status:u.status==="completed"?"success":"error"});break}a.message.content.length>0&&t.push({id:a.id,message:{content:a.message.content,role:a.message.role},status:a.status}),fe(t)}}),{run:y,loading:z}=k.useRequest(async(e,t,a=!1)=>await v.api.ai.createChatSession({title:g("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:a}),{manual:!0,onError:()=>{r.message.error(g("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[t])=>{ie(M(e),"prepend"),A(e.id),t&&W({message:t,sessionId:e.id})}});d.useEffect(()=>{re((j==null?void 0:j.map(e=>M(e)))||[])},[j]);const{run:ke}=k.useRequest(async e=>await v.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){J.error(g("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const a=N(t);a&&S(t,{...a,loading:!1})},onSuccess(e,[t]){le(t)}}),{run:Ce}=k.useRequest(async e=>v.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const a=N(t);a&&S(t,{...a,title:e,loading:!1})},onError:(e,[t])=>{J.error(g("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const a=N(t);a&&S(t,{...a,loading:!1})}});d.useEffect(()=>{if(p&&(w==null?void 0:w.sessionId)===p){const e=w.message;setTimeout(()=>{_({content:e,...T()})},1e3),W(void 0)}},[p,w,T]),d.useEffect(()=>{if(p){const e=ce(p);if(e&&e.length>0)return;ye(p)}},[p]),d.useEffect(()=>{I&&y&&I((e,t)=>{y(e,t,!0)})},[y,I]);const Re=s.jsxRuntimeExports.jsxs("div",{className:h.sider,children:[s.jsxRuntimeExports.jsx(r.Button,{onClick:()=>{y()},type:"link",className:h.addBtn,icon:s.jsxRuntimeExports.jsx(f.PlusOutlined,{}),loading:z,children:g("chat.newConversation",{defaultValue:"New Conversation"})}),s.jsxRuntimeExports.jsx(r.Spin,{spinning:H,wrapperClassName:h.conversationsSpin,children:s.jsxRuntimeExports.jsx(C.Conversations,{items:K,activeKey:p,onActiveChange:async e=>{e&&A(e)},className:h.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:g("chat.regenerateTitle"),key:"regenerateTitle",icon:s.jsxRuntimeExports.jsx(f.ReloadOutlined,{}),onClick:()=>{S(e.key,{...e,loading:!0}),Ce(e.key)}},{label:X("delete"),key:"delete",icon:s.jsxRuntimeExports.jsx(f.DeleteOutlined,{}),danger:!0,onClick:()=>{S(e.key,{...e,loading:!0}),ke(e.key)}}]})})})]}),Ee=x==null?void 0:x.map(e=>({...e.message,key:e.id,contentRender:o,footer:c==null?void 0:c(e)})).filter(e=>e.content),Se=s.jsxRuntimeExports.jsx("div",{className:h.chatList,children:s.jsxRuntimeExports.jsx(r.Spin,{spinning:ve||z,children:s.jsxRuntimeExports.jsx(C.Bubble.List,{items:Ee,style:{height:"100%",paddingInline:l==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>s.jsxRuntimeExports.jsx(r.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>s.jsxRuntimeExports.jsx(r.Spin,{size:"small"})},user:{placement:"end"}}})})}),we=s.jsxRuntimeExports.jsx(s.jsxRuntimeExports.Fragment,{children:s.jsxRuntimeExports.jsxs(r.Space,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:[s.jsxRuntimeExports.jsx(r.Select,{mode:"multiple",allowClear:!0,placeholder:g("chat.skillsPlaceholder",{defaultValue:"Skills (optional)"}),value:P.map(e=>e.value),onChange:(e,t)=>{Le.isArray(t)?F(t.map(a=>({type:a.skillType,value:a.value}))):F(t?[{type:t.skillType,value:t.value}]:[])},options:[...pe,...xe],className:te(h.skillsSelect,"chat-skills-select")}),s.jsxRuntimeExports.jsx(C.Sender,{value:Y,onSubmit:async()=>{je(Y.trim()),G("")},onChange:G,onCancel:()=>{ge()},loading:B,className:te(h.sender,"chat-sender"),placeholder:g("chat.inputPlaceholder")})]})});return s.jsxRuntimeExports.jsxs(C.XProvider,{children:[de,s.jsxRuntimeExports.jsxs($e.Provider,{value:{onReload:he,setMessage:be},children:[s.jsxRuntimeExports.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[s.jsxRuntimeExports.jsx(r.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:s.jsxRuntimeExports.jsx(f.BlockOutlined,{}),value:"classic"},{label:s.jsxRuntimeExports.jsx(f.BorderRightOutlined,{}),value:"sidebar"},{label:s.jsxRuntimeExports.jsx(f.BorderRightOutlined,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>R(e.target.value),value:l}),s.jsxRuntimeExports.jsxs(r.Space,{style:{float:"right",marginTop:10},children:[s.jsxRuntimeExports.jsx(r.Button,{type:"primary",onClick:()=>{y()},loading:z,icon:s.jsxRuntimeExports.jsx(f.PlusOutlined,{}),style:{display:l==="classic"?"none":"block"}}),s.jsxRuntimeExports.jsx(r.Dropdown,{menu:{items:K.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{A(e)}},placement:"bottomRight",children:s.jsxRuntimeExports.jsx(r.Button,{icon:H?s.jsxRuntimeExports.jsx(r.Spin,{size:"small"}):s.jsxRuntimeExports.jsx(f.HistoryOutlined,{}),style:{display:l==="classic"?"none":"block"}})}),s.jsxRuntimeExports.jsx(r.Button,{type:"text",onClick:()=>m(!1),children:s.jsxRuntimeExports.jsx(f.CloseOutlined,{})})]})]}),s.jsxRuntimeExports.jsxs("div",{className:l==="classic"?h.classicLayout:h.siderLayout,style:{minWidth:l==="classic"?"500px":"400px"},children:[l==="classic"?Re:null,s.jsxRuntimeExports.jsxs("div",{className:h.chat,children:[Se,we]})]})]})]})};exports.AIChat=ne;exports.default=ne;exports.useMarkdownTheme=se;
