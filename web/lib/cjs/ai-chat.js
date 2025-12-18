"use strict";var ue=Object.defineProperty;var de=(s,t,r)=>t in s?ue(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r;var O=(s,t,r)=>de(s,typeof t!="symbol"?t+"":t,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("./vendor.js"),C=require("./index.js"),f=require("@ant-design/icons"),E=require("ahooks"),l=require("antd"),me=require("antd-style"),x=require("react"),_=require("react-i18next"),q=require("dayjs"),xe=require("./contexts.js"),m=require("./ant-design-x.js"),pe=me.createStyles(({token:s,css:t})=>({siderLayout:t`
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
    `}));class ge extends Error{constructor(r,i){super(r);O(this,"buffer");this.buffer=i}}class he extends m.AbstractChatProvider{transformParams(t,r){if(typeof t!="object")throw new Error("requestParams must be an object");return{...(r==null?void 0:r.params)||{},...t||{}}}transformLocalMessage({content:t}){return{content:t,role:"user"}}transformMessage(t){const{originMessage:r,chunk:i}=t||{};if(!i)return{content:(r==null?void 0:r.content)||"",role:"assistant"};const c=JSON.parse(i.data),p=(r==null?void 0:r.content)||"";switch(c.event_type){case"content":return{content:`${p||""}${c.content||""}`,role:"assistant"};case"tool_call":return{content:p.endsWith("<br/>")?`${p}${c.content||""}`:`${p}<br/>${c.content||""}`,role:"assistant"};case"error":return{content:p,role:"assistant",error:c.content}}}}const M=new Map,fe=s=>(M.get(s)||M.set(s,new he({request:m.XRequest(`/api/ai/chat/sessions/${s}`,{manual:!0,middlewares:{onRequest:async(t,r)=>{const i=localStorage.getItem("orgID"),{sessionId:c}=r.params,p={...r.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...i?{"X-Scope-OrgID":i}:{}};return[c?`/api/ai/chat/sessions/${c}`:t,{...r,headers:p}]}}})})),M.get(s)),z=s=>{var c;const{className:t,children:r}=s,i=((c=t==null?void 0:t.match(/language-(\w+)/))==null?void 0:c[1])||"";return typeof r!="string"?null:i==="mermaid"?n.jsxRuntimeExports.jsx(m.Mermaid,{children:r}):n.jsxRuntimeExports.jsx(m.CodeHighlighter,{lang:i,children:r})},D=()=>{const s=l.theme.useToken(),t=x.useMemo(()=>{var i;return((i=s==null?void 0:s.theme)==null?void 0:i.id)===0},[s]);return[x.useMemo(()=>t?"x-markdown-light":"x-markdown-dark",[t])]},be=x.createContext({}),je=()=>{const{layout:s,setVisible:t,setLayout:r,onCallAI:i,activeConversationKey:c,setActiveConversationKey:p,conversations:j,fetchConversationsLoading:T}=xe.useAI(),{t:g}=_.useTranslation("ai"),{t:L}=_.useTranslation("common"),{styles:h}=pe(),w=e=>({key:e.id,label:e.title,group:q(e.start_time).isSame(q(),"day")?g("chat.today"):q(e.start_time).format("YYYY-MM-DD")}),{conversations:B,activeConversationKey:u,setActiveConversationKey:S,addConversation:V,setConversations:X,getConversation:k,setConversation:v,removeConversation:H,getMessages:K}=m.useXConversations({defaultActiveConversationKey:c,defaultConversations:(j==null?void 0:j.map(e=>w(e)))||[]});x.useEffect(()=>{p(u)},[u]);const[Y]=D(),[F,G]=l.message.useMessage(),[A,I]=x.useState(""),[R,N]=x.useState(),{onRequest:P,messages:b,isRequesting:W,abort:J,onReload:U,setMessages:Q,setMessage:Z}=m.useXChat({provider:fe(u),conversationKey:u,defaultMessages:[],requestPlaceholder:()=>({content:L("loading"),role:"assistant"}),requestFallback:(e,{error:a})=>a instanceof ge?{content:a.buffer.join(""),role:"assistant",error:a.message}:{content:`${a}`,role:"assistant"}}),ee=e=>{if(e){if(!u){y(e);return}P({content:e})}},{run:te,loading:se}=E.useRequest(async e=>await C.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{l.message.error(g("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(b&&b.length>0&&(b[b.length-1].status==="loading"||b.length>e.messages.length))return;const a=[];let o={id:"",message:{content:"",role:"assistant"},status:"success"};for(const d of e.messages)switch(d.role){case"assistant":o.status=d.status==="completed"&&o.status==="success"?"success":"error",o.message.role="assistant",o.id=d.id,d.tool_calls&&d.tool_calls.length>0?o.message.content.endsWith("<br/>")?o.message.content=`${o.message.content}${d.content}`:o.message.content=`${o.message.content}<br/>${d.content}`:o.message.content=`${o.message.content}${d.content}`;break;case"user":o.message.content.length>0&&(a.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),o={id:"",message:{content:"",role:"assistant"},status:"success"}),a.push({id:d.id,message:{content:d.content,role:d.role},status:d.status==="completed"?"success":"error"});break}o.message.content.length>0&&a.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),Q(a)}}),{run:y,loading:$}=E.useRequest(async(e,a,o=!1)=>await C.api.ai.createChatSession({title:g("chat.defaultConversationTitle"),model_id:"",messages:a||[],anonymous:o}),{manual:!0,onError:()=>{l.message.error(g("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[a])=>{V(w(e),"prepend"),S(e.id),a&&N({message:a,sessionId:e.id})}});x.useEffect(()=>{X((j==null?void 0:j.map(e=>w(e)))||[])},[j]);const{run:ne}=E.useRequest(async e=>await C.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[a]){F.error(g("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const o=k(a);o&&v(a,{...o,loading:!1})},onSuccess(e,[a]){H(a)}}),{run:oe}=E.useRequest(async e=>C.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[a])=>{const o=k(a);o&&v(a,{...o,title:e,loading:!1})},onError:(e,[a])=>{F.error(g("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const o=k(a);o&&v(a,{...o,loading:!1})}});x.useEffect(()=>{if(u&&(R==null?void 0:R.sessionId)===u){const e=R.message;setTimeout(()=>{P({content:e})},1e3),N(void 0)}},[u,R]),x.useEffect(()=>{if(u){const e=K(u);if(e&&e.length>0)return;te(u)}},[u]),x.useEffect(()=>{i&&y&&i((e,a)=>{y(e,a,!0)})},[y,i]);const ae=n.jsxRuntimeExports.jsxs("div",{className:h.sider,children:[n.jsxRuntimeExports.jsx(l.Button,{onClick:()=>{y()},type:"link",className:h.addBtn,icon:n.jsxRuntimeExports.jsx(f.PlusOutlined,{}),loading:$,children:g("chat.newConversation",{defaultValue:"New Conversation"})}),n.jsxRuntimeExports.jsx(l.Spin,{spinning:T,wrapperClassName:h.conversationsSpin,children:n.jsxRuntimeExports.jsx(m.Conversations,{items:B,activeKey:u,onActiveChange:async e=>{e&&S(e)},className:h.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:g("chat.regenerateTitle"),key:"regenerateTitle",icon:n.jsxRuntimeExports.jsx(f.ReloadOutlined,{}),onClick:()=>{v(e.key,{...e,loading:!0}),oe(e.key)}},{label:L("delete"),key:"delete",icon:n.jsxRuntimeExports.jsx(f.DeleteOutlined,{}),danger:!0,onClick:()=>{v(e.key,{...e,loading:!0}),ne(e.key)}}]})})})]}),re=({message:e})=>{if(e.error)return n.jsxRuntimeExports.jsx("div",{children:n.jsxRuntimeExports.jsx(m.XMarkdown,{content:e.error,components:{code:z}})})},ie=b==null?void 0:b.map(e=>({...e.message,key:e.id,contentRender:a=>n.jsxRuntimeExports.jsx(m.XMarkdown,{paragraphTag:"div",content:a,className:Y,components:{code:z}}),footer:re(e)})),le=n.jsxRuntimeExports.jsx("div",{className:h.chatList,children:n.jsxRuntimeExports.jsx(l.Spin,{spinning:se||$,children:n.jsxRuntimeExports.jsx(m.ForwardBubble.List,{items:ie,style:{height:"100%",paddingInline:s==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>n.jsxRuntimeExports.jsx(l.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>n.jsxRuntimeExports.jsx(l.Spin,{size:"small"})},user:{placement:"end"}}})})}),ce=n.jsxRuntimeExports.jsx(n.jsxRuntimeExports.Fragment,{children:n.jsxRuntimeExports.jsx(m.Sender,{value:A,onSubmit:async()=>{ee(A.trim()),I("")},onChange:I,onCancel:()=>{J()},loading:W,className:h.sender,placeholder:g("chat.inputPlaceholder")})});return n.jsxRuntimeExports.jsxs(m.XProvider,{children:[G,n.jsxRuntimeExports.jsxs(be.Provider,{value:{onReload:U,setMessage:Z},children:[n.jsxRuntimeExports.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[n.jsxRuntimeExports.jsx(l.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:n.jsxRuntimeExports.jsx(f.BlockOutlined,{}),value:"classic"},{label:n.jsxRuntimeExports.jsx(f.BorderRightOutlined,{}),value:"sidebar"},{label:n.jsxRuntimeExports.jsx(f.BorderRightOutlined,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>r(e.target.value),value:s}),n.jsxRuntimeExports.jsxs(l.Space,{style:{float:"right",marginTop:10},children:[n.jsxRuntimeExports.jsx(l.Button,{type:"primary",onClick:()=>{y()},loading:$,icon:n.jsxRuntimeExports.jsx(f.PlusOutlined,{}),style:{display:s==="classic"?"none":"block"}}),n.jsxRuntimeExports.jsx(l.Dropdown,{menu:{items:B.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{S(e)}},placement:"bottomRight",children:n.jsxRuntimeExports.jsx(l.Button,{icon:T?n.jsxRuntimeExports.jsx(l.Spin,{size:"small"}):n.jsxRuntimeExports.jsx(f.HistoryOutlined,{}),style:{display:s==="classic"?"none":"block"}})}),n.jsxRuntimeExports.jsx(l.Button,{type:"text",onClick:()=>t(!1),children:n.jsxRuntimeExports.jsx(f.CloseOutlined,{})})]})]}),n.jsxRuntimeExports.jsxs("div",{className:s==="classic"?h.classicLayout:h.siderLayout,style:{minWidth:s==="classic"?"500px":"400px"},children:[s==="classic"?ae:null,n.jsxRuntimeExports.jsxs("div",{className:h.chat,children:[le,ce]})]})]})]})};exports.default=je;exports.useMarkdownTheme=D;
