"use strict";var me=Object.defineProperty;var xe=(s,t,r)=>t in s?me(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r;var _=(s,t,r)=>xe(s,typeof t!="symbol"?t+"":t,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("./vendor.js"),C=require("./index.js"),h=require("@ant-design/icons"),y=require("@ant-design/x"),k=require("@ant-design/x-sdk"),z=require("@ant-design/x-markdown"),E=require("ahooks"),l=require("antd"),pe=require("antd-style"),m=require("react"),D=require("react-i18next"),M=require("dayjs"),ge=require("./contexts.js"),he=pe.createStyles(({token:s,css:t})=>({siderLayout:t`
      width: 100%;
      height: calc(100vh - 100px);
      display: flex;
      background: ${s.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${s.fontFamily}, sans-serif;
    `,classicLayout:t`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${s.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${s.fontFamily}, sans-serif;
    `,sider:t`
      background: ${s.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,logo:t`
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;
      gap: 8px;
      margin: 24px 0;

      span {
        font-weight: bold;
        color: ${s.colorText};
        font-size: 16px;
      }
    `,addBtn:t`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,conversationsSpin:t`
      height: 100%;
      overflow-y: auto;
    `,conversations:t`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,siderFooter:t`
      border-top: 1px solid ${s.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,chat:t`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${s.paddingLG}px;
      gap: 16px;
    `,chatPrompt:t`
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
    `,chatList:t`
      flex: 1;
      overflow: auto;
      .ant-spin-nested-loading{
        height: 100%;
        .ant-spin-container{
          height: 100%;
        }
      }
      .ant-bubble > .ant-bubble-content{
        max-width: 90%;
      }
      .ant-bubble-end{
        .ant-bubble-content{
          background-color: rgb(22 119 255 / 15%);
        }
      }
      .ant-bubble-list-autoscroll{
        flex-direction: column-reverse;
      }
    `,loadingMessage:t`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,placeholder:t`
      padding-top: 32px;
    `,sender:t`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,speechButton:t`
      font-size: 18px;
      color: ${s.colorText} !important;
    `,senderPrompt:t`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${s.colorText};
    `}));class fe extends Error{constructor(r,i){super(r);_(this,"buffer");this.buffer=i}}class be extends k.AbstractChatProvider{transformParams(t,r){if(typeof t!="object")throw new Error("requestParams must be an object");return{...(r==null?void 0:r.params)||{},...t||{}}}transformLocalMessage({content:t}){return{content:t,role:"user"}}transformMessage(t){const{originMessage:r,chunk:i}=t||{};if(!i)return{content:(r==null?void 0:r.content)||"",role:"assistant"};const c=JSON.parse(i.data),x=(r==null?void 0:r.content)||"";switch(c.event_type){case"content":return{content:`${x||""}${c.content||""}`,role:"assistant"};case"tool_call":return{content:x.endsWith("<br/>")?`${x}${c.content||""}`:`${x}<br/>${c.content||""}`,role:"assistant"};case"error":return{content:x,role:"assistant",error:c.content}}}}const T=new Map,je=s=>(T.get(s)||T.set(s,new be({request:k.XRequest(`/api/ai/chat/sessions/${s}`,{manual:!0,middlewares:{onRequest:async(t,r)=>{const i=localStorage.getItem("orgID"),{sessionId:c}=r.params,x={...r.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...i?{"X-Scope-OrgID":i}:{}};return[c?`/api/ai/chat/sessions/${c}`:t,{...r,headers:x}]}}})})),T.get(s)),V=s=>{var c;const{className:t,children:r}=s,i=((c=t==null?void 0:t.match(/language-(\w+)/))==null?void 0:c[1])||"";return typeof r!="string"?null:i==="mermaid"?n.jsxRuntimeExports.jsx(y.Mermaid,{children:r}):n.jsxRuntimeExports.jsx(y.CodeHighlighter,{lang:i,children:r})},X=()=>{const s=l.theme.useToken(),t=m.useMemo(()=>{var i;return((i=s==null?void 0:s.theme)==null?void 0:i.id)===0},[s]);return[m.useMemo(()=>t?"x-markdown-light":"x-markdown-dark",[t])]},ye=m.createContext({}),ve=()=>{const{layout:s,setVisible:t,setLayout:r,onCallAI:i,activeConversationKey:c,setActiveConversationKey:x,conversations:b,fetchConversationsLoading:L}=ge.useAI(),{t:p}=D.useTranslation("ai"),{t:B}=D.useTranslation("common"),{styles:g}=he(),w=e=>({key:e.id,label:e.title,group:M(e.start_time).isSame(M(),"day")?p("chat.today"):M(e.start_time).format("YYYY-MM-DD")}),{conversations:A,activeConversationKey:u,setActiveConversationKey:S,addConversation:H,setConversations:K,getConversation:$,setConversation:v,removeConversation:Y,getMessages:G}=k.useXConversations({defaultActiveConversationKey:c,defaultConversations:(b==null?void 0:b.map(e=>w(e)))||[]});m.useEffect(()=>{x(u)},[u]);const[W]=X(),[F,J]=l.message.useMessage(),[I,N]=m.useState(""),[R,P]=m.useState(),{onRequest:O,messages:f,isRequesting:U,abort:Q,onReload:Z,setMessages:ee,setMessage:te}=k.useXChat({provider:je(u),conversationKey:u,defaultMessages:[],requestPlaceholder:()=>({content:B("loading"),role:"assistant"}),requestFallback:(e,{error:a})=>a instanceof fe?{content:a.buffer.join(""),role:"assistant",error:a.message}:{content:`${a}`,role:"assistant"}}),se=e=>{if(e){if(!u){j(e);return}O({content:e})}},{run:ne,loading:oe}=E.useRequest(async e=>await C.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{l.message.error(p("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(f&&f.length>0&&(f[f.length-1].status==="loading"||f.length>e.messages.length))return;const a=[];let o={id:"",message:{content:"",role:"assistant"},status:"success"};for(const d of e.messages)switch(d.role){case"assistant":o.status=d.status==="completed"&&o.status==="success"?"success":"error",o.message.role="assistant",o.id=d.id,d.tool_calls&&d.tool_calls.length>0?o.message.content.endsWith("<br/>")?o.message.content=`${o.message.content}${d.content}`:o.message.content=`${o.message.content}<br/>${d.content}`:o.message.content=`${o.message.content}${d.content}`;break;case"user":o.message.content.length>0&&(a.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),o={id:"",message:{content:"",role:"assistant"},status:"success"}),a.push({id:d.id,message:{content:d.content,role:d.role},status:d.status==="completed"?"success":"error"});break}o.message.content.length>0&&a.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),ee(a)}}),{run:j,loading:q}=E.useRequest(async(e,a,o=!1)=>await C.api.ai.createChatSession({title:p("chat.defaultConversationTitle"),model_id:"",messages:a||[],anonymous:o}),{manual:!0,onError:()=>{l.message.error(p("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[a])=>{H(w(e),"prepend"),S(e.id),a&&P({message:a,sessionId:e.id})}});m.useEffect(()=>{K((b==null?void 0:b.map(e=>w(e)))||[])},[b]);const{run:ae}=E.useRequest(async e=>await C.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[a]){F.error(p("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const o=$(a);o&&v(a,{...o,loading:!1})},onSuccess(e,[a]){Y(a)}}),{run:re}=E.useRequest(async e=>C.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[a])=>{const o=$(a);o&&v(a,{...o,title:e,loading:!1})},onError:(e,[a])=>{F.error(p("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const o=$(a);o&&v(a,{...o,loading:!1})}});m.useEffect(()=>{if(u&&(R==null?void 0:R.sessionId)===u){const e=R.message;setTimeout(()=>{O({content:e})},1e3),P(void 0)}},[u,R]),m.useEffect(()=>{if(u){const e=G(u);if(e&&e.length>0)return;ne(u)}},[u]),m.useEffect(()=>{i&&j&&i((e,a)=>{j(e,a,!0)})},[j,i]);const ie=n.jsxRuntimeExports.jsxs("div",{className:g.sider,children:[n.jsxRuntimeExports.jsx(l.Button,{onClick:()=>{j()},type:"link",className:g.addBtn,icon:n.jsxRuntimeExports.jsx(h.PlusOutlined,{}),loading:q,children:p("chat.newConversation",{defaultValue:"New Conversation"})}),n.jsxRuntimeExports.jsx(l.Spin,{spinning:L,wrapperClassName:g.conversationsSpin,children:n.jsxRuntimeExports.jsx(y.Conversations,{items:A,activeKey:u,onActiveChange:async e=>{e&&S(e)},className:g.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:p("chat.regenerateTitle"),key:"regenerateTitle",icon:n.jsxRuntimeExports.jsx(h.ReloadOutlined,{}),onClick:()=>{v(e.key,{...e,loading:!0}),re(e.key)}},{label:B("delete"),key:"delete",icon:n.jsxRuntimeExports.jsx(h.DeleteOutlined,{}),danger:!0,onClick:()=>{v(e.key,{...e,loading:!0}),ae(e.key)}}]})})})]}),le=({message:e})=>{if(e.error)return n.jsxRuntimeExports.jsx("div",{children:n.jsxRuntimeExports.jsx(z.XMarkdown,{content:e.error,components:{code:V}})})},ce=f==null?void 0:f.map(e=>({...e.message,key:e.id,contentRender:a=>n.jsxRuntimeExports.jsx(z.XMarkdown,{paragraphTag:"div",content:a,className:W,components:{code:V}}),footer:le(e)})),ue=n.jsxRuntimeExports.jsx("div",{className:g.chatList,children:n.jsxRuntimeExports.jsx(l.Spin,{spinning:oe||q,children:n.jsxRuntimeExports.jsx(y.Bubble.List,{items:ce,style:{height:"100%",paddingInline:s==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>n.jsxRuntimeExports.jsx(l.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>n.jsxRuntimeExports.jsx(l.Spin,{size:"small"})},user:{placement:"end"}}})})}),de=n.jsxRuntimeExports.jsx(n.jsxRuntimeExports.Fragment,{children:n.jsxRuntimeExports.jsx(y.Sender,{value:I,onSubmit:async()=>{se(I.trim()),N("")},onChange:N,onCancel:()=>{Q()},loading:U,className:g.sender,placeholder:p("chat.inputPlaceholder")})});return n.jsxRuntimeExports.jsxs(y.XProvider,{children:[J,n.jsxRuntimeExports.jsxs(ye.Provider,{value:{onReload:Z,setMessage:te},children:[n.jsxRuntimeExports.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[n.jsxRuntimeExports.jsx(l.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:n.jsxRuntimeExports.jsx(h.BlockOutlined,{}),value:"classic"},{label:n.jsxRuntimeExports.jsx(h.BorderRightOutlined,{}),value:"sidebar"},{label:n.jsxRuntimeExports.jsx(h.BorderRightOutlined,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>r(e.target.value),value:s}),n.jsxRuntimeExports.jsxs(l.Space,{style:{float:"right",marginTop:10},children:[n.jsxRuntimeExports.jsx(l.Button,{type:"primary",onClick:()=>{j()},loading:q,icon:n.jsxRuntimeExports.jsx(h.PlusOutlined,{}),style:{display:s==="classic"?"none":"block"}}),n.jsxRuntimeExports.jsx(l.Dropdown,{menu:{items:A.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{S(e)}},placement:"bottomRight",children:n.jsxRuntimeExports.jsx(l.Button,{icon:L?n.jsxRuntimeExports.jsx(l.Spin,{size:"small"}):n.jsxRuntimeExports.jsx(h.HistoryOutlined,{}),style:{display:s==="classic"?"none":"block"}})}),n.jsxRuntimeExports.jsx(l.Button,{type:"text",onClick:()=>t(!1),children:n.jsxRuntimeExports.jsx(h.CloseOutlined,{})})]})]}),n.jsxRuntimeExports.jsxs("div",{className:s==="classic"?g.classicLayout:g.siderLayout,style:{minWidth:s==="classic"?"500px":"400px"},children:[s==="classic"?ie:null,n.jsxRuntimeExports.jsxs("div",{className:g.chat,children:[ue,de]})]})]})]})};exports.default=ve;exports.useMarkdownTheme=X;
