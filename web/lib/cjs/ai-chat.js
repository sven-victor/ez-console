"use strict";var be=Object.defineProperty;var ye=(a,s,r)=>s in a?be(a,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[s]=r;var D=(a,s,r)=>ye(a,typeof s!="symbol"?s+"":s,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=require("./vendor.js"),y=require("./index.js"),h=require("@ant-design/icons"),R=require("@ant-design/x"),C=require("@ant-design/x-sdk"),X=require("@ant-design/x-markdown"),v=require("ahooks"),i=require("antd"),ve=require("antd-style"),p=require("react"),H=require("react-i18next"),F=require("dayjs"),Re=require("./contexts.js"),ke=require("lodash-es"),K=require("classnames"),Ee=ve.createStyles(({token:a,css:s})=>({siderLayout:s`
      width: 100%;
      height: calc(100vh - 100px);
      display: flex;
      background: ${a.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${a.fontFamily}, sans-serif;
    `,classicLayout:s`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${a.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${a.fontFamily}, sans-serif;
    `,sider:s`
      background: ${a.colorBgLayout}80;
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
        color: ${a.colorText};
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
      border-top: 1px solid ${a.colorBorderSecondary};
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
      padding-block: ${a.paddingLG}px;
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
      color: ${a.colorText} !important;
    `,senderPrompt:s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${a.colorText};
    `}));class Ce extends Error{constructor(r,l){super(r);D(this,"buffer");this.buffer=l}}class Se extends C.AbstractChatProvider{transformParams(s,r){if(typeof s!="object")throw new Error("requestParams must be an object");return{...(r==null?void 0:r.params)||{},...s||{}}}transformLocalMessage({content:s}){return{content:s,role:"user"}}transformMessage(s){const{originMessage:r,chunk:l}=s||{};if(!l)return{content:(r==null?void 0:r.content)||"",role:"assistant"};const c=JSON.parse(l.data),g=(r==null?void 0:r.content)||"";switch(c.event_type){case"content":return{content:`${g||""}${c.content||""}`,role:"assistant"};case"tool_call":return{content:g.endsWith("<br/>")?`${g}${c.content||""}`:`${g}<br/>${c.content||""}`,role:"assistant"};case"error":return{content:g,role:"assistant",error:c.content}}}}const A=new Map,we=a=>(A.get(a)||A.set(a,new Se({request:C.XRequest(`/api/ai/chat/sessions/${a}`,{manual:!0,middlewares:{onRequest:async(s,r)=>{const l=localStorage.getItem("orgID"),{sessionId:c}=r.params,g={...r.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...l?{"X-Scope-OrgID":l}:{}};return[c?`/api/ai/chat/sessions/${c}`:s,{...r,headers:g}]}}})})),A.get(a)),W=a=>{var c;const{className:s,children:r}=a,l=((c=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:c[1])||"";return typeof r!="string"?null:l==="mermaid"?t.jsxRuntimeExports.jsx(R.Mermaid,{children:r}):t.jsxRuntimeExports.jsx(R.CodeHighlighter,{lang:l,children:r})},Y=()=>{const a=i.theme.useToken(),s=p.useMemo(()=>{var l;return((l=a==null?void 0:a.theme)==null?void 0:l.id)===0},[a]);return[p.useMemo(()=>s?"x-markdown-light":"x-markdown-dark",[s])]},qe=p.createContext({}),Te=()=>{const{layout:a,setVisible:s,setLayout:r,onCallAI:l,activeConversationKey:c,setActiveConversationKey:g,conversations:j,fetchConversationsLoading:B}=Re.useAI(),{t:d}=H.useTranslation("ai"),{t:N}=H.useTranslation("common"),{styles:x}=Ee(),S=e=>({key:e.id,label:e.title,group:F(e.start_time).isSame(F(),"day")?d("chat.today"):F(e.start_time).format("YYYY-MM-DD")}),{conversations:P,activeConversationKey:u,setActiveConversationKey:w,addConversation:G,setConversations:J,getConversation:q,setConversation:k,removeConversation:U,getMessages:Q}=C.useXConversations({defaultActiveConversationKey:c,defaultConversations:(j==null?void 0:j.map(e=>S(e)))||[]});p.useEffect(()=>{g(u)},[u]);const[Z]=Y(),[I,ee]=i.message.useMessage(),[O,_]=p.useState(""),[T,$]=p.useState([]),{data:te}=v.useRequest(()=>y.api.system.listSkillDomains()),se=(te??[]).map(e=>({skillType:"domain",value:e,label:t.jsxRuntimeExports.jsxs(t.jsxRuntimeExports.Fragment,{children:[t.jsxRuntimeExports.jsx(i.Tag,{children:d("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),{data:M}=v.useRequest(()=>y.api.system.listSkills({current:1,page_size:500})),ne=((M==null?void 0:M.data)??[]).map(e=>({skillType:"skill",value:e.id,label:t.jsxRuntimeExports.jsxs(t.jsxRuntimeExports.Fragment,{children:[t.jsxRuntimeExports.jsx(i.Tag,{children:d("chat.skill",{defaultValue:"Skill"})}),e.name]})})),[E,z]=p.useState(),{onRequest:V,messages:f,isRequesting:ae,abort:oe,onReload:re,setMessages:ie,setMessage:le}=C.useXChat({provider:we(u),conversationKey:u,defaultMessages:[],requestPlaceholder:()=>({content:N("loading"),role:"assistant"}),requestFallback:(e,{error:n})=>n instanceof Ce?{content:n.buffer.join(""),role:"assistant",error:n.message}:{content:`${n}`,role:"assistant"}}),ce=e=>{if(e){if(!u){b(e);return}V({content:e,domains:T.filter(n=>n.type==="domain").map(n=>n.value),skill_ids:T.filter(n=>n.type==="skill").map(n=>n.value)})}},{run:ue,loading:de}=v.useRequest(async e=>await y.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{i.message.error(d("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(f&&f.length>0&&(f[f.length-1].status==="loading"||f.length>e.messages.length))return;const n=[];let o={id:"",message:{content:"",role:"assistant"},status:"success"};for(const m of e.messages)switch(m.role){case"assistant":o.status=m.status==="completed"&&o.status==="success"?"success":"error",o.message.role="assistant",o.id=m.id,m.tool_calls&&m.tool_calls.length>0?o.message.content.endsWith("<br/>")?o.message.content=`${o.message.content}${m.content}`:o.message.content=`${o.message.content}<br/>${m.content}`:o.message.content=`${o.message.content}${m.content}`;break;case"user":o.message.content.length>0&&(n.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),o={id:"",message:{content:"",role:"assistant"},status:"success"}),n.push({id:m.id,message:{content:m.content,role:m.role},status:m.status==="completed"?"success":"error"});break}o.message.content.length>0&&n.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),ie(n)}}),{run:b,loading:L}=v.useRequest(async(e,n,o=!1)=>await y.api.ai.createChatSession({title:d("chat.defaultConversationTitle"),model_id:"",messages:n||[],anonymous:o}),{manual:!0,onError:()=>{i.message.error(d("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[n])=>{G(S(e),"prepend"),w(e.id),n&&z({message:n,sessionId:e.id})}});p.useEffect(()=>{J((j==null?void 0:j.map(e=>S(e)))||[])},[j]);const{run:me}=v.useRequest(async e=>await y.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[n]){I.error(d("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const o=q(n);o&&k(n,{...o,loading:!1})},onSuccess(e,[n]){U(n)}}),{run:pe}=v.useRequest(async e=>y.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[n])=>{const o=q(n);o&&k(n,{...o,title:e,loading:!1})},onError:(e,[n])=>{I.error(d("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const o=q(n);o&&k(n,{...o,loading:!1})}});p.useEffect(()=>{if(u&&(E==null?void 0:E.sessionId)===u){const e=E.message;setTimeout(()=>{V({content:e})},1e3),z(void 0)}},[u,E]),p.useEffect(()=>{if(u){const e=Q(u);if(e&&e.length>0)return;ue(u)}},[u]),p.useEffect(()=>{l&&b&&l((e,n)=>{b(e,n,!0)})},[b,l]);const xe=t.jsxRuntimeExports.jsxs("div",{className:x.sider,children:[t.jsxRuntimeExports.jsx(i.Button,{onClick:()=>{b()},type:"link",className:x.addBtn,icon:t.jsxRuntimeExports.jsx(h.PlusOutlined,{}),loading:L,children:d("chat.newConversation",{defaultValue:"New Conversation"})}),t.jsxRuntimeExports.jsx(i.Spin,{spinning:B,wrapperClassName:x.conversationsSpin,children:t.jsxRuntimeExports.jsx(R.Conversations,{items:P,activeKey:u,onActiveChange:async e=>{e&&w(e)},className:x.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:d("chat.regenerateTitle"),key:"regenerateTitle",icon:t.jsxRuntimeExports.jsx(h.ReloadOutlined,{}),onClick:()=>{k(e.key,{...e,loading:!0}),pe(e.key)}},{label:N("delete"),key:"delete",icon:t.jsxRuntimeExports.jsx(h.DeleteOutlined,{}),danger:!0,onClick:()=>{k(e.key,{...e,loading:!0}),me(e.key)}}]})})})]}),ge=({message:e})=>{if(e.error)return t.jsxRuntimeExports.jsx("div",{children:t.jsxRuntimeExports.jsx(X.XMarkdown,{content:e.error,components:{code:W}})})},he=f==null?void 0:f.map(e=>({...e.message,key:e.id,contentRender:n=>t.jsxRuntimeExports.jsx(X.XMarkdown,{paragraphTag:"div",content:n,className:Z,components:{code:W}}),footer:ge(e)})),fe=t.jsxRuntimeExports.jsx("div",{className:x.chatList,children:t.jsxRuntimeExports.jsx(i.Spin,{spinning:de||L,children:t.jsxRuntimeExports.jsx(R.Bubble.List,{items:he,style:{height:"100%",paddingInline:a==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>t.jsxRuntimeExports.jsx(i.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>t.jsxRuntimeExports.jsx(i.Spin,{size:"small"})},user:{placement:"end"}}})})}),je=t.jsxRuntimeExports.jsx(t.jsxRuntimeExports.Fragment,{children:t.jsxRuntimeExports.jsxs(i.Space,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:[t.jsxRuntimeExports.jsx(i.Select,{mode:"multiple",allowClear:!0,placeholder:d("chat.skillsPlaceholder",{defaultValue:"Skills (optional)"}),value:T.map(e=>e.value),onChange:(e,n)=>{ke.isArray(n)?$(n.map(o=>({type:o.skillType,value:o.value}))):$(n?[{type:n.skillType,value:n.value}]:[])},options:[...se,...ne],className:K(x.skillsSelect,"chat-skills-select")}),t.jsxRuntimeExports.jsx(R.Sender,{value:O,onSubmit:async()=>{ce(O.trim()),_("")},onChange:_,onCancel:()=>{oe()},loading:ae,className:K(x.sender,"chat-sender"),placeholder:d("chat.inputPlaceholder")})]})});return t.jsxRuntimeExports.jsxs(R.XProvider,{children:[ee,t.jsxRuntimeExports.jsxs(qe.Provider,{value:{onReload:re,setMessage:le},children:[t.jsxRuntimeExports.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[t.jsxRuntimeExports.jsx(i.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:t.jsxRuntimeExports.jsx(h.BlockOutlined,{}),value:"classic"},{label:t.jsxRuntimeExports.jsx(h.BorderRightOutlined,{}),value:"sidebar"},{label:t.jsxRuntimeExports.jsx(h.BorderRightOutlined,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>r(e.target.value),value:a}),t.jsxRuntimeExports.jsxs(i.Space,{style:{float:"right",marginTop:10},children:[t.jsxRuntimeExports.jsx(i.Button,{type:"primary",onClick:()=>{b()},loading:L,icon:t.jsxRuntimeExports.jsx(h.PlusOutlined,{}),style:{display:a==="classic"?"none":"block"}}),t.jsxRuntimeExports.jsx(i.Dropdown,{menu:{items:P.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{w(e)}},placement:"bottomRight",children:t.jsxRuntimeExports.jsx(i.Button,{icon:B?t.jsxRuntimeExports.jsx(i.Spin,{size:"small"}):t.jsxRuntimeExports.jsx(h.HistoryOutlined,{}),style:{display:a==="classic"?"none":"block"}})}),t.jsxRuntimeExports.jsx(i.Button,{type:"text",onClick:()=>s(!1),children:t.jsxRuntimeExports.jsx(h.CloseOutlined,{})})]})]}),t.jsxRuntimeExports.jsxs("div",{className:a==="classic"?x.classicLayout:x.siderLayout,style:{minWidth:a==="classic"?"500px":"400px"},children:[a==="classic"?xe:null,t.jsxRuntimeExports.jsxs("div",{className:x.chat,children:[fe,je]})]})]})]})};exports.default=Te;exports.useMarkdownTheme=Y;
