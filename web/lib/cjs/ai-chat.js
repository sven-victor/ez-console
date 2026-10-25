"use strict";var Pe=Object.defineProperty;var Ne=(i,a,n)=>a in i?Pe(i,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[a]=n;var de=(i,a,n)=>Ne(i,typeof a!="symbol"?a+"":a,n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("./vendor.js"),_=require("./index.js"),q=require("@ant-design/icons"),E=require("@ant-design/x"),O=require("@ant-design/x-sdk"),me=require("@ant-design/x-markdown"),T=require("ahooks"),u=require("antd"),ge=require("antd-style"),c=require("react"),pe=require("react-i18next"),Z=require("dayjs"),xe=require("./contexts.js"),$e=require("classnames");;/* empty css              */const fe=ge.createStyles(({token:i,css:a})=>({siderLayout:a`
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
    `}));class ze extends Error{constructor(n,d){super(n);de(this,"buffer");this.buffer=d}}function Be(i){if(i==null||typeof i!="object")return!1;const a=i;if(a.name==="AbortError")return!0;const n=typeof a.message=="string"?a.message:"";return/aborted/i.test(n)||/BodyStreamBuffer/i.test(n)}class Oe extends O.AbstractChatProvider{transformParams(a,n){if(typeof a!="object")throw new Error("requestParams must be an object");return{...(n==null?void 0:n.params)||{},...a||{}}}transformLocalMessage({content:a}){return{content:a,role:"user"}}transformMessage(a){const{originMessage:n,chunk:d,status:l}=a||{};if(!d)return{...n,content:(n==null?void 0:n.content)||"",role:"assistant",status:l};let m;try{m=JSON.parse(d.data)}catch{return{...n,content:(n==null?void 0:n.content)||"",role:"assistant",status:l}}const k=m.message_id===(n==null?void 0:n.messageId)?`${(n==null?void 0:n.content)||""}${m.content||""}`:m.content||"";switch(m.event_type){case"tool_call":case"content":return{...n,content:k,role:"assistant",messageId:m.message_id,status:l};case"error":return{...n,content:k,role:"assistant",error:m.content,messageId:m.message_id,status:l};case"client_tool_pending":return{...n,content:k||"",role:"assistant",pendingClientToolCalls:m.client_tool_calls,messageId:m.message_id,status:l};default:return{...n,content:k||(n==null?void 0:n.content)||"",role:"assistant",messageId:m.message_id||(n==null?void 0:n.messageId),status:l}}}}const ee=new Map,Ve=i=>(ee.get(i)||ee.set(i,new Oe({request:O.XRequest(`/api/ai/chat/sessions/${i}`,{manual:!0,middlewares:{onRequest:async(a,n)=>{const d=localStorage.getItem("orgID"),{sessionId:l}=n.params??{},m={...n.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...d?{"X-Scope-OrgID":d}:{}};return[l?`/api/ai/chat/sessions/${l}`:a,{...n,headers:m}]}}})})),ee.get(i)),Me=i=>{var l;const{className:a,children:n}=i,d=((l=a==null?void 0:a.match(/language-(\w+)/))==null?void 0:l[1])||"";return typeof n!="string"?null:d==="mermaid"?s.jsxRuntimeExports.jsx(E.Mermaid,{children:n}):s.jsxRuntimeExports.jsx("code",{className:"ant-highlightCode-code",children:s.jsxRuntimeExports.jsx(E.CodeHighlighter,{lang:d,children:n})})},De=c.createContext({});function B(i){if(!i||i.length===0)return[];const a=new Set,n=[];for(const d of i){const l=d.trim();!l||a.has(l)||(a.add(l),n.push(l))}return n}const He=({bubble:i={},messages:a,loading:n,layout:d="classic",onSendMessage:l})=>{const{styles:m}=fe(),{isDarkMode:k}=ge.useThemeMode(),C=c.useMemo(()=>{if(!i.components)return{code:Me};const p={};for(const R in i.components){const j=i.components[R];if(typeof j=="string"){p[R]=j;continue}p[R]=P=>s.jsxRuntimeExports.jsx(j,{...P,onSendMessage:l})}return p},[l,i.components]),{contentRender:V=p=>s.jsxRuntimeExports.jsx(me.XMarkdown,{paragraphTag:"div",content:p,className:k?"x-markdown-dark":"x-markdown-light",components:C}),footerRender:A=({message:p})=>{if(p.error)return s.jsxRuntimeExports.jsx("div",{children:s.jsxRuntimeExports.jsx(me.XMarkdown,{content:p.error,components:C})})}}=i,y=c.useMemo(()=>(a||[]).map(p=>({...p.message,key:p.id,contentRender:V,footer:(R,j)=>A==null?void 0:A(p,j,l)})).filter(p=>p.content),[a]);return s.jsxRuntimeExports.jsx("div",{className:m.chatList,children:s.jsxRuntimeExports.jsx(u.Spin,{spinning:n,children:s.jsxRuntimeExports.jsx(E.Bubble.List,{items:y,style:{height:"100%",paddingInline:d==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>s.jsxRuntimeExports.jsx(u.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>s.jsxRuntimeExports.jsx(u.Spin,{size:"small"})},user:{placement:"end"}}})})})},he=({bubble:i={},ephemeralSystemPrompts:a,clientTools:n,defaultSkillDomains:d})=>{const{layout:l,setVisible:m,setLayout:k,onCallAI:C,activeConversationKey:V,setActiveConversationKey:A,conversations:y,fetchConversationsLoading:p,getEphemeralSystemPrompts:R,getClientTools:j,registerGlobalAI:P}=xe.useAI(),{t:g}=pe.useTranslation("ai"),{t:te}=pe.useTranslation("common"),{styles:v}=fe(),M=e=>({key:e.id,label:e.title,group:Z(e.start_time).isSame(Z(),"day")?g("chat.today"):Z(e.start_time).format("YYYY-MM-DD")}),{conversations:se,activeConversationKey:f,setActiveConversationKey:D,addConversation:je,setConversations:ye,getConversation:H,setConversation:I,removeConversation:be,getMessages:ke}=O.useXConversations({defaultActiveConversationKey:V,defaultConversations:(y==null?void 0:y.map(e=>M(e)))||[]});c.useEffect(()=>{A(f)},[f]);const{message:N}=u.App.useApp(),[ne,oe]=c.useState(""),[ve,Re]=c.useState(!1),K=(d==null?void 0:d.join("\0"))??"",X=c.useMemo(()=>B(K?K.split("\0"):[]),[K]),J=(a==null?void 0:a.join("\0"))??"",G=c.useMemo(()=>B(J?J.split("\0"):[]),[J]);c.useEffect(()=>{if(!(G.length===0&&!(n!=null&&n.length)))return P({ephemeralSystemPrompts:G,tools:n})},[G,n,P]);const[S,Y]=c.useState(()=>X.map(e=>({type:"domain",value:e})));c.useEffect(()=>{Y(e=>{const t=e.filter(o=>o.type==="skill");return[...X.map(o=>({type:"domain",value:o})),...t]})},[X]);const{data:ae}=T.useRequest(()=>_.api.system.listSkillDomains()),{data:$}=T.useRequest(()=>_.api.system.listSkills({current:1,page_size:500})),re=c.useMemo(()=>[...(ae??[]).map(e=>({skillType:"domain",key:e,label:s.jsxRuntimeExports.jsxs(s.jsxRuntimeExports.Fragment,{children:[s.jsxRuntimeExports.jsx(u.Tag,{children:g("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...(($==null?void 0:$.data)??[]).map(e=>({skillType:"skill",key:e.id,label:s.jsxRuntimeExports.jsxs(s.jsxRuntimeExports.Fragment,{children:[s.jsxRuntimeExports.jsx(u.Tag,{children:g("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[$,ae]),[L,ie]=c.useState(),{onRequest:F,messages:h,isRequesting:W,abort:Ee,onReload:Ce,setMessages:Se,setMessage:we}=O.useXChat({provider:Ve(f),conversationKey:f,defaultMessages:[],requestPlaceholder:()=>({content:te("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>Be(t)?{content:"",role:"assistant"}:t instanceof ze?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),w=c.useCallback(()=>{const e={domains:S.filter(r=>r.type==="domain").map(r=>r.value),skill_ids:S.filter(r=>r.type==="skill").map(r=>r.value)},t=B(R());t.length>0&&(e.ephemeral_system_prompts=t);const o=j();return o.length>0&&(e.client_tools=o.map(r=>({name:r.name,description:r.description,parameters:r.parameters}))),e},[S,R,j]),U=c.useRef(null),le=c.useCallback(async e=>{const t=[],o=j();for(const r of e){const b=o.find(x=>x.name===r.name);if(!b){t.push({tool_call_id:r.id,content:JSON.stringify({error:`Client tool "${r.name}" is not available on the current page`,available_tools:o.map(x=>x.name)})});continue}try{const x=await Promise.resolve(b.handler(r.arguments));t.push({tool_call_id:r.id,content:x!=null&&x.trim()?x:JSON.stringify({ok:!0})})}catch(x){const Fe=x instanceof Error?x.message:String(x);t.push({tool_call_id:r.id,content:JSON.stringify({error:Fe})})}}F({content:"",client_tool_results:t,...w()})},[j,F,w]);c.useEffect(()=>{var e,t;if(!W&&h&&h.length>0){const o=h[h.length-1];if((t=(e=o==null?void 0:o.message)==null?void 0:e.pendingClientToolCalls)!=null&&t.length){const r=o.message.pendingClientToolCalls;U.current!==r&&(U.current=r,le(r))}else U.current=null}},[W,h,le]);const ce=e=>{if(e){if(!f){z(e);return}F({content:e,...w()})}},{run:_e,loading:qe}=T.useRequest(async e=>await _.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{N.error(g("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(h&&h.length>0&&(h[h.length-1].status==="loading"||h.length>e.messages.length))return;const t=[];let o={id:"",message:{content:"",role:"assistant"},status:"success"};for(const r of e.messages)switch(r.role){case"assistant":o.status=r.status==="completed"&&o.status==="success"?"success":"error",o.message.role="assistant",o.id!==r.id&&r.content&&(o.message.content=r.content),o.id=r.id;break;case"user":o.message.content.length>0&&(t.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),o={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:r.id,message:{content:r.content,role:r.role},status:r.status==="completed"?"success":"error"});break}o.message.content.length>0&&t.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),Se(t)}}),{run:z,loading:Q}=T.useRequest(async(e,t,o=!1,r)=>({session:await _.api.ai.createChatSession({title:g("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:o}),message:e,domains:r}),{manual:!0,onError:()=>{N.error(g("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:({session:e,message:t,domains:o})=>{je(M(e),"prepend"),D(e.id),t&&ie({message:t,sessionId:e.id,domains:o})}});c.useEffect(()=>{ye((y==null?void 0:y.map(e=>M(e)))||[])},[y]);const{run:Te}=T.useRequest(async e=>await _.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){N.error(g("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const o=H(t);o&&I(t,{...o,loading:!1})},onSuccess(e,[t]){be(t)}}),{run:Ae}=T.useRequest(async e=>_.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const o=H(t);o&&I(t,{...o,title:e,loading:!1})},onError:(e,[t])=>{N.error(g("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const o=H(t);o&&I(t,{...o,loading:!1})}});c.useEffect(()=>{if(f&&(L==null?void 0:L.sessionId)===f){const{message:e,domains:t}=L;setTimeout(()=>{F({content:e,...w(),...t!==void 0?{domains:t}:{}})},1e3),ie(void 0)}},[f,L,w]),c.useEffect(()=>{if(f){const e=ke(f);if(e&&e.length>0)return;_e(f)}},[f]);const ue=c.useRef(()=>{});ue.current=(e,t)=>{const o=xe.normalizeCallAIOptions(t),r=o.domains!==void 0?B(o.domains):void 0;if(r!==void 0&&Y(b=>[...r.map(x=>({type:"domain",value:x})),...b.filter(x=>x.type==="skill")]),o.newSession===!1&&f){F({content:e,...w(),...r!==void 0?{domains:r}:{}});return}z(e,o.messages,!0,r)},c.useEffect(()=>{C&&C((e,t)=>{ue.current(e,t)})},[C]);const Ie=s.jsxRuntimeExports.jsxs("div",{className:v.sider,children:[s.jsxRuntimeExports.jsx(u.Button,{onClick:()=>{z()},type:"link",className:v.addBtn,icon:s.jsxRuntimeExports.jsx(q.PlusOutlined,{}),loading:Q,children:g("chat.newConversation",{defaultValue:"New Conversation"})}),s.jsxRuntimeExports.jsx(u.Spin,{spinning:p,wrapperClassName:v.conversationsSpin,children:s.jsxRuntimeExports.jsx(E.Conversations,{items:se,activeKey:f,onActiveChange:async e=>{e&&D(e)},className:v.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:g("chat.regenerateTitle"),key:"regenerateTitle",icon:s.jsxRuntimeExports.jsx(q.ReloadOutlined,{}),onClick:()=>{I(e.key,{...e,loading:!0}),Ae(e.key)}},{label:te("delete"),key:"delete",icon:s.jsxRuntimeExports.jsx(q.DeleteOutlined,{}),danger:!0,onClick:()=>{I(e.key,{...e,loading:!0}),Te(e.key)}}]})})})]}),Le=s.jsxRuntimeExports.jsx(s.jsxRuntimeExports.Fragment,{children:s.jsxRuntimeExports.jsx(u.Space,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:s.jsxRuntimeExports.jsx(E.Sender,{footer:e=>s.jsxRuntimeExports.jsxs(u.Flex,{justify:"space-between",align:"center",children:[s.jsxRuntimeExports.jsx(u.Flex,{gap:"small",align:"center",children:s.jsxRuntimeExports.jsx(u.Dropdown,{open:ve,onOpenChange:(t,o)=>{(o.source==="trigger"||t)&&Re(t)},menu:{selectedKeys:S.map(t=>t.value),onClick:t=>{const o=re.find(r=>r.key===t.key);Y(r=>r.some(b=>b.value===t.key)?r.filter(b=>b.value!==t.key):[...r,{type:(o==null?void 0:o.skillType)||"skill",value:t.key}])},items:re.map(t=>({label:t.label,key:t.key}))},children:s.jsxRuntimeExports.jsxs(E.Sender.Switch,{value:!1,icon:s.jsxRuntimeExports.jsx(s.LuBookOpenText,{}),children:[g("chat.skill",{defaultValue:"Skills"})," ","(",S.length>0?g("chat.skillsSelected",{defaultValue:"{{count}} selected",count:S.length}):g("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),s.jsxRuntimeExports.jsx(u.Flex,{align:"center",children:e})]}),suffix:!1,value:ne,onSubmit:async()=>{ce(ne.trim()),oe("")},onChange:oe,onCancel:()=>{Ee()},loading:W,className:$e(v.sender,"chat-sender"),placeholder:g("chat.inputPlaceholder")})})});return s.jsxRuntimeExports.jsx(E.XProvider,{children:s.jsxRuntimeExports.jsxs(De.Provider,{value:{onReload:Ce,setMessage:we},children:[s.jsxRuntimeExports.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[s.jsxRuntimeExports.jsx(u.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:s.jsxRuntimeExports.jsx(s.LuExternalLink,{style:{transform:"scaleX(-1)"}}),value:"classic"},{label:s.jsxRuntimeExports.jsx(s.LuPanelRightDashed,{}),value:"sidebar"},{label:s.jsxRuntimeExports.jsx(s.LuPanelRight,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>k(e.target.value),value:l}),s.jsxRuntimeExports.jsxs(u.Space,{style:{float:"right",marginTop:10},children:[s.jsxRuntimeExports.jsx(u.Button,{type:"primary",onClick:()=>{z()},loading:Q,icon:s.jsxRuntimeExports.jsx(q.PlusOutlined,{}),style:{display:l==="classic"?"none":"block"}}),s.jsxRuntimeExports.jsx(u.Dropdown,{menu:{items:se.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{D(e)}},placement:"bottomRight",children:s.jsxRuntimeExports.jsx(u.Button,{icon:p?s.jsxRuntimeExports.jsx(u.Spin,{size:"small"}):s.jsxRuntimeExports.jsx(q.HistoryOutlined,{}),style:{display:l==="classic"?"none":"block"}})}),s.jsxRuntimeExports.jsx(u.Button,{type:"text",onClick:()=>m(!1),children:s.jsxRuntimeExports.jsx(q.CloseOutlined,{})})]})]}),s.jsxRuntimeExports.jsxs("div",{className:l==="classic"?v.classicLayout:v.siderLayout,style:{minWidth:l==="classic"?"500px":"400px"},children:[l==="classic"?Ie:null,s.jsxRuntimeExports.jsxs("div",{className:v.chat,children:[s.jsxRuntimeExports.jsx(He,{bubble:i,messages:h,loading:qe||Q,layout:l,onSendMessage:ce}),Le]})]})]})})};exports.AIChat=he;exports.default=he;
