"use strict";var Te=Object.defineProperty;var _e=(i,s,o)=>s in i?Te(i,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[s]=o;var Q=(i,s,o)=>_e(i,typeof s!="symbol"?s+"":s,o);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("./vendor.js"),v=require("./index.js"),f=require("@ant-design/icons"),C=require("@ant-design/x"),q=require("@ant-design/x-sdk"),Z=require("@ant-design/x-markdown"),k=require("ahooks"),r=require("antd"),qe=require("antd-style"),d=require("react"),ee=require("react-i18next"),V=require("dayjs"),Ae=require("./contexts.js"),Ie=require("lodash-es"),te=require("classnames");;/* empty css              */const Le=qe.createStyles(({token:i,css:s})=>({siderLayout:s`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,classicLayout:s`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${i.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${i.fontFamily}, sans-serif;
    `,sider:s`
      background: ${i.colorBgLayout}80;
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
        color: ${i.colorText};
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
      border-top: 1px solid ${i.colorBorderSecondary};
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
      padding-block: ${i.paddingLG}px;
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
      color: ${i.colorText} !important;
    `,senderPrompt:s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${i.colorText};
    `}));class Me extends Error{constructor(o,c){super(o);Q(this,"buffer");this.buffer=c}}function Be(i){if(i==null||typeof i!="object")return!1;const s=i;if(s.name==="AbortError")return!0;const o=typeof s.message=="string"?s.message:"";return/aborted/i.test(o)||/BodyStreamBuffer/i.test(o)}class Ne extends q.AbstractChatProvider{transformParams(s,o){if(typeof s!="object")throw new Error("requestParams must be an object");return{...(o==null?void 0:o.params)||{},...s||{}}}transformLocalMessage({content:s}){return{content:s,role:"user"}}transformMessage(s){const{originMessage:o,chunk:c,status:l}=s||{};if(!c)return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:l};const m=JSON.parse(c.data),R=m.message_id===(o==null?void 0:o.messageId)?`${(o==null?void 0:o.content)||""}${m.content||""}`:m.content||"";switch(m.event_type){case"tool_call":case"content":return{...o,content:R,role:"assistant",messageId:m.message_id,status:l};case"error":return{...o,content:R,role:"assistant",error:m.content,messageId:m.message_id,status:l};case"client_tool_pending":return{...o,content:R||"",role:"assistant",pendingClientToolCalls:m.client_tool_calls,messageId:m.message_id,status:l}}}}const D=new Map,Pe=i=>(D.get(i)||D.set(i,new Ne({request:q.XRequest(`/api/ai/chat/sessions/${i}`,{manual:!0,middlewares:{onRequest:async(s,o)=>{const c=localStorage.getItem("orgID"),{sessionId:l}=o.params,m={...o.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...c?{"X-Scope-OrgID":c}:{}};return[l?`/api/ai/chat/sessions/${l}`:s,{...o,headers:m}]}}})})),D.get(i)),Fe=i=>{var l;const{className:s,children:o}=i,c=((l=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:l[1])||"";return typeof o!="string"?null:c==="mermaid"?n.jsxRuntimeExports.jsx(C.Mermaid,{children:o}):n.jsxRuntimeExports.jsx(C.CodeHighlighter,{lang:c,children:o})},se=()=>{const i=r.theme.useToken(),s=d.useMemo(()=>{var c;return((c=i==null?void 0:i.theme)==null?void 0:c.id)===0},[i]);return[d.useMemo(()=>s?"x-markdown-light":"x-markdown-dark",[s])]},$e=d.createContext({}),ne=({bubble:i={}})=>{const{components:s={code:Fe},contentRender:o=e=>n.jsxRuntimeExports.jsx(Z.XMarkdown,{paragraphTag:"div",content:e,className:ue,components:s}),footerRender:c=({message:e})=>{if(e.error)return n.jsxRuntimeExports.jsx("div",{children:n.jsxRuntimeExports.jsx(Z.XMarkdown,{content:e.error,components:s})})}}=i,{layout:l,setVisible:m,setLayout:R,onCallAI:A,activeConversationKey:ae,setActiveConversationKey:oe,conversations:j,fetchConversationsLoading:H,ephemeralSystemPrompts:I,clientTools:E}=Ae.useAI(),{t:x}=ee.useTranslation("ai"),{t:X}=ee.useTranslation("common"),{styles:h}=Le(),L=e=>({key:e.id,label:e.title,group:V(e.start_time).isSame(V(),"day")?x("chat.today"):V(e.start_time).format("YYYY-MM-DD")}),{conversations:K,activeConversationKey:p,setActiveConversationKey:M,addConversation:ie,setConversations:re,getConversation:B,setConversation:S,removeConversation:le,getMessages:ce}=q.useXConversations({defaultActiveConversationKey:ae,defaultConversations:(j==null?void 0:j.map(e=>L(e)))||[]});d.useEffect(()=>{oe(p)},[p]);const[ue]=se(),[J,de]=r.message.useMessage(),[Y,G]=d.useState(""),[N,P]=d.useState([]),{data:me}=k.useRequest(()=>v.api.system.listSkillDomains()),pe=(me??[]).map(e=>({skillType:"domain",value:e,label:n.jsxRuntimeExports.jsxs(n.jsxRuntimeExports.Fragment,{children:[n.jsxRuntimeExports.jsx(r.Tag,{children:x("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),{data:F}=k.useRequest(()=>v.api.system.listSkills({current:1,page_size:500})),ge=((F==null?void 0:F.data)??[]).map(e=>({skillType:"skill",value:e.id,label:n.jsxRuntimeExports.jsxs(n.jsxRuntimeExports.Fragment,{children:[n.jsxRuntimeExports.jsx(r.Tag,{children:x("chat.skill",{defaultValue:"Skill"})}),e.name]})})),[w,W]=d.useState(),{onRequest:_,messages:g,isRequesting:$,abort:xe,onReload:he,setMessages:fe,setMessage:be}=q.useXChat({provider:Pe(p),conversationKey:p,defaultMessages:[],requestPlaceholder:()=>({content:X("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>Be(t)?{content:"",role:"assistant"}:t instanceof Me?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),T=d.useCallback(()=>{const e={};return I.length>0&&(e.ephemeral_system_prompts=I),E.length>0&&(e.client_tools=E.map(t=>({name:t.name,description:t.description,parameters:t.parameters}))),e},[I,E]),O=d.useRef(null),U=d.useCallback(async e=>{const t=[];for(const a of e){const u=E.find(b=>b.name===a.name);if(!u){t.push({tool_call_id:a.id,content:JSON.stringify({error:`Client tool handler not found for ${a.name}`})});continue}try{const b=await Promise.resolve(u.handler(a.arguments));t.push({tool_call_id:a.id,content:b})}catch(b){t.push({tool_call_id:a.id,content:JSON.stringify({error:(b==null?void 0:b.message)||String(b)})})}}_({content:"",client_tool_results:t,...T()})},[E,_,T]);d.useEffect(()=>{var e,t;if(!$&&g&&g.length>0){const a=g[g.length-1];if((t=(e=a==null?void 0:a.message)==null?void 0:e.pendingClientToolCalls)!=null&&t.length){const u=a.message.pendingClientToolCalls;O.current!==u&&(O.current=u,U(u))}else O.current=null}},[$,g,U]);const je=e=>{if(e){if(!p){y(e);return}_({content:e,domains:N.filter(t=>t.type==="domain").map(t=>t.value),skill_ids:N.filter(t=>t.type==="skill").map(t=>t.value),...T()})}},{run:ye,loading:ve}=k.useRequest(async e=>await v.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{r.message.error(x("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(g&&g.length>0&&(g[g.length-1].status==="loading"||g.length>e.messages.length))return;const t=[];let a={id:"",message:{content:"",role:"assistant"},status:"success"};for(const u of e.messages)switch(u.role){case"assistant":a.status=u.status==="completed"&&a.status==="success"?"success":"error",a.message.role="assistant",a.id!==u.id&&u.content&&(a.message.content=u.content),a.id=u.id;break;case"user":a.message.content.length>0&&(t.push({id:a.id,message:{content:a.message.content,role:a.message.role},status:a.status}),a={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:u.id,message:{content:u.content,role:u.role},status:u.status==="completed"?"success":"error"});break}a.message.content.length>0&&t.push({id:a.id,message:{content:a.message.content,role:a.message.role},status:a.status}),fe(t)}}),{run:y,loading:z}=k.useRequest(async(e,t,a=!1)=>await v.api.ai.createChatSession({title:x("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:a}),{manual:!0,onError:()=>{r.message.error(x("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[t])=>{ie(L(e),"prepend"),M(e.id),t&&W({message:t,sessionId:e.id})}});d.useEffect(()=>{re((j==null?void 0:j.map(e=>L(e)))||[])},[j]);const{run:ke}=k.useRequest(async e=>await v.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){J.error(x("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const a=B(t);a&&S(t,{...a,loading:!1})},onSuccess(e,[t]){le(t)}}),{run:Ce}=k.useRequest(async e=>v.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const a=B(t);a&&S(t,{...a,title:e,loading:!1})},onError:(e,[t])=>{J.error(x("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const a=B(t);a&&S(t,{...a,loading:!1})}});d.useEffect(()=>{if(p&&(w==null?void 0:w.sessionId)===p){const e=w.message;setTimeout(()=>{_({content:e,...T()})},1e3),W(void 0)}},[p,w,T]),d.useEffect(()=>{if(p){const e=ce(p);if(e&&e.length>0)return;ye(p)}},[p]),d.useEffect(()=>{A&&y&&A((e,t)=>{y(e,t,!0)})},[y,A]);const Re=n.jsxRuntimeExports.jsxs("div",{className:h.sider,children:[n.jsxRuntimeExports.jsx(r.Button,{onClick:()=>{y()},type:"link",className:h.addBtn,icon:n.jsxRuntimeExports.jsx(f.PlusOutlined,{}),loading:z,children:x("chat.newConversation",{defaultValue:"New Conversation"})}),n.jsxRuntimeExports.jsx(r.Spin,{spinning:H,wrapperClassName:h.conversationsSpin,children:n.jsxRuntimeExports.jsx(C.Conversations,{items:K,activeKey:p,onActiveChange:async e=>{e&&M(e)},className:h.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:x("chat.regenerateTitle"),key:"regenerateTitle",icon:n.jsxRuntimeExports.jsx(f.ReloadOutlined,{}),onClick:()=>{S(e.key,{...e,loading:!0}),Ce(e.key)}},{label:X("delete"),key:"delete",icon:n.jsxRuntimeExports.jsx(f.DeleteOutlined,{}),danger:!0,onClick:()=>{S(e.key,{...e,loading:!0}),ke(e.key)}}]})})})]}),Ee=g==null?void 0:g.map(e=>({...e.message,key:e.id,contentRender:o,footer:c==null?void 0:c(e)})).filter(e=>e.content),Se=n.jsxRuntimeExports.jsx("div",{className:h.chatList,children:n.jsxRuntimeExports.jsx(r.Spin,{spinning:ve||z,children:n.jsxRuntimeExports.jsx(C.Bubble.List,{items:Ee,style:{height:"100%",paddingInline:l==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>n.jsxRuntimeExports.jsx(r.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>n.jsxRuntimeExports.jsx(r.Spin,{size:"small"})},user:{placement:"end"}}})})}),we=n.jsxRuntimeExports.jsx(n.jsxRuntimeExports.Fragment,{children:n.jsxRuntimeExports.jsxs(r.Space,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:[n.jsxRuntimeExports.jsx(r.Select,{mode:"multiple",allowClear:!0,placeholder:x("chat.skillsPlaceholder",{defaultValue:"Skills (optional)"}),value:N.map(e=>e.value),onChange:(e,t)=>{Ie.isArray(t)?P(t.map(a=>({type:a.skillType,value:a.value}))):P(t?[{type:t.skillType,value:t.value}]:[])},options:[...pe,...ge],className:te(h.skillsSelect,"chat-skills-select")}),n.jsxRuntimeExports.jsx(C.Sender,{value:Y,onSubmit:async()=>{je(Y.trim()),G("")},onChange:G,onCancel:()=>{xe()},loading:$,className:te(h.sender,"chat-sender"),placeholder:x("chat.inputPlaceholder")})]})});return n.jsxRuntimeExports.jsxs(C.XProvider,{children:[de,n.jsxRuntimeExports.jsxs($e.Provider,{value:{onReload:he,setMessage:be},children:[n.jsxRuntimeExports.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[n.jsxRuntimeExports.jsx(r.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:n.jsxRuntimeExports.jsx(f.BlockOutlined,{}),value:"classic"},{label:n.jsxRuntimeExports.jsx(f.BorderRightOutlined,{}),value:"sidebar"},{label:n.jsxRuntimeExports.jsx(f.BorderRightOutlined,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>R(e.target.value),value:l}),n.jsxRuntimeExports.jsxs(r.Space,{style:{float:"right",marginTop:10},children:[n.jsxRuntimeExports.jsx(r.Button,{type:"primary",onClick:()=>{y()},loading:z,icon:n.jsxRuntimeExports.jsx(f.PlusOutlined,{}),style:{display:l==="classic"?"none":"block"}}),n.jsxRuntimeExports.jsx(r.Dropdown,{menu:{items:K.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{M(e)}},placement:"bottomRight",children:n.jsxRuntimeExports.jsx(r.Button,{icon:H?n.jsxRuntimeExports.jsx(r.Spin,{size:"small"}):n.jsxRuntimeExports.jsx(f.HistoryOutlined,{}),style:{display:l==="classic"?"none":"block"}})}),n.jsxRuntimeExports.jsx(r.Button,{type:"text",onClick:()=>m(!1),children:n.jsxRuntimeExports.jsx(f.CloseOutlined,{})})]})]}),n.jsxRuntimeExports.jsxs("div",{className:l==="classic"?h.classicLayout:h.siderLayout,style:{minWidth:l==="classic"?"500px":"400px"},children:[l==="classic"?Re:null,n.jsxRuntimeExports.jsxs("div",{className:h.chat,children:[Se,we]})]})]})]})};exports.AIChat=ne;exports.default=ne;exports.useMarkdownTheme=se;
