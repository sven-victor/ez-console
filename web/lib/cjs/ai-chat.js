"use strict";var Ae=Object.defineProperty;var Le=(r,a,o)=>a in r?Ae(r,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[a]=o;var ce=(r,a,o)=>Le(r,typeof a!="symbol"?a+"":a,o);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("./vendor.js"),E=require("./index.js"),S=require("@ant-design/icons"),v=require("@ant-design/x"),N=require("@ant-design/x-sdk"),ue=require("@ant-design/x-markdown"),w=require("ahooks"),m=require("antd"),pe=require("antd-style"),u=require("react"),de=require("react-i18next"),U=require("dayjs"),me=require("./contexts.js"),Fe=require("classnames");;/* empty css              */const xe=pe.createStyles(({token:r,css:a})=>({siderLayout:a`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,classicLayout:a`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${r.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${r.fontFamily}, sans-serif;
    `,sider:a`
      background: ${r.colorBgLayout}80;
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
        color: ${r.colorText};
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
      border-top: 1px solid ${r.colorBorderSecondary};
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
      padding-block: ${r.paddingLG}px;
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
      color: ${r.colorText} !important;
    `,senderPrompt:a`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${r.colorText};
    `}));class Pe extends Error{constructor(o,c){super(o);ce(this,"buffer");this.buffer=c}}function $e(r){if(r==null||typeof r!="object")return!1;const a=r;if(a.name==="AbortError")return!0;const o=typeof a.message=="string"?a.message:"";return/aborted/i.test(o)||/BodyStreamBuffer/i.test(o)}class ze extends N.AbstractChatProvider{transformParams(a,o){if(typeof a!="object")throw new Error("requestParams must be an object");return{...(o==null?void 0:o.params)||{},...a||{}}}transformLocalMessage({content:a}){return{content:a,role:"user"}}transformMessage(a){const{originMessage:o,chunk:c,status:l}=a||{};if(!c)return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:l};let p;try{p=JSON.parse(c.data)}catch{return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:l}}const y=p.message_id===(o==null?void 0:o.messageId)?`${(o==null?void 0:o.content)||""}${p.content||""}`:p.content||"";switch(p.event_type){case"tool_call":case"content":return{...o,content:y,role:"assistant",messageId:p.message_id,status:l};case"error":return{...o,content:y,role:"assistant",error:p.content,messageId:p.message_id,status:l};case"client_tool_pending":return{...o,content:y||"",role:"assistant",pendingClientToolCalls:p.client_tool_calls,messageId:p.message_id,status:l};default:return{...o,content:y||(o==null?void 0:o.content)||"",role:"assistant",messageId:p.message_id||(o==null?void 0:o.messageId),status:l}}}}const Q=new Map,Be=r=>(Q.get(r)||Q.set(r,new ze({request:N.XRequest(`/api/ai/chat/sessions/${r}`,{manual:!0,middlewares:{onRequest:async(a,o)=>{const c=localStorage.getItem("orgID"),{sessionId:l}=o.params??{},p={...o.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...c?{"X-Scope-OrgID":c}:{}};return[l?`/api/ai/chat/sessions/${l}`:a,{...o,headers:p}]}}})})),Q.get(r)),Ne=r=>{var l;const{className:a,children:o}=r,c=((l=a==null?void 0:a.match(/language-(\w+)/))==null?void 0:l[1])||"";return typeof o!="string"?null:c==="mermaid"?n.jsxRuntimeExports.jsx(v.Mermaid,{children:o}):n.jsxRuntimeExports.jsx("code",{className:"ant-highlightCode-code",children:n.jsxRuntimeExports.jsx(v.CodeHighlighter,{lang:c,children:o})})},Ve=u.createContext({});function B(r){if(!r||r.length===0)return[];const a=new Set,o=[];for(const c of r){const l=c.trim();!l||a.has(l)||(a.add(l),o.push(l))}return o}const Oe=({bubble:r={},messages:a,loading:o,layout:c="classic",onSendMessage:l})=>{const{styles:p}=xe(),{isDarkMode:y}=pe.useThemeMode(),A=u.useMemo(()=>{if(!r.components)return{code:Ne};const x={};for(const b in r.components){const d=r.components[b];if(typeof d=="string"){x[b]=d;continue}x[b]=F=>n.jsxRuntimeExports.jsx(d,{...F,onSendMessage:l})}return x},[l,r.components]),{contentRender:V=x=>n.jsxRuntimeExports.jsx(ue.XMarkdown,{paragraphTag:"div",content:x,className:y?"x-markdown-dark":"x-markdown-light",components:A}),footerRender:h=({message:x})=>{if(x.error)return n.jsxRuntimeExports.jsx("div",{children:n.jsxRuntimeExports.jsx(ue.XMarkdown,{content:x.error,components:A})})}}=r,L=u.useMemo(()=>(a||[]).map(x=>({...x.message,key:x.id,contentRender:V,footer:(b,d)=>h==null?void 0:h(x,d,l)})).filter(x=>x.content),[a]);return n.jsxRuntimeExports.jsx("div",{className:p.chatList,children:n.jsxRuntimeExports.jsx(m.Spin,{spinning:o,children:n.jsxRuntimeExports.jsx(v.Bubble.List,{items:L,style:{height:"100%",paddingInline:c==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>n.jsxRuntimeExports.jsx(m.Spin,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>n.jsxRuntimeExports.jsx(m.Spin,{size:"small"})},user:{placement:"end"}}})})})},ge=({bubble:r={},ephemeralSystemPrompts:a,defaultSkillDomains:o})=>{const{layout:c,setVisible:l,setLayout:p,onCallAI:y,activeConversationKey:A,setActiveConversationKey:V,conversations:h,fetchConversationsLoading:L,ephemeralSystemPrompts:x,clientTools:b}=me.useAI(),{t:d}=de.useTranslation("ai"),{t:F}=de.useTranslation("common"),{styles:k}=xe(),O=e=>({key:e.id,label:e.title,group:U(e.start_time).isSame(U(),"day")?d("chat.today"):U(e.start_time).format("YYYY-MM-DD")}),{conversations:Z,activeConversationKey:g,setActiveConversationKey:M,addConversation:fe,setConversations:he,getConversation:D,setConversation:_,removeConversation:je,getMessages:ye}=N.useXConversations({defaultActiveConversationKey:A,defaultConversations:(h==null?void 0:h.map(e=>O(e)))||[]});u.useEffect(()=>{V(g)},[g]);const{message:P}=m.App.useApp(),[ee,te]=u.useState(""),[be,ke]=u.useState(!1),H=(o==null?void 0:o.join("\0"))??"",K=u.useMemo(()=>B(H?H.split("\0"):[]),[H]),X=(a==null?void 0:a.join("\0"))??"",se=u.useMemo(()=>B(X?X.split("\0"):[]),[X]),[R,J]=u.useState(()=>K.map(e=>({type:"domain",value:e})));u.useEffect(()=>{J(e=>{const s=e.filter(t=>t.type==="skill");return[...K.map(t=>({type:"domain",value:t})),...s]})},[K]);const{data:ne}=w.useRequest(()=>E.api.system.listSkillDomains()),{data:$}=w.useRequest(()=>E.api.system.listSkills({current:1,page_size:500})),oe=u.useMemo(()=>[...(ne??[]).map(e=>({skillType:"domain",key:e,label:n.jsxRuntimeExports.jsxs(n.jsxRuntimeExports.Fragment,{children:[n.jsxRuntimeExports.jsx(m.Tag,{children:d("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...(($==null?void 0:$.data)??[]).map(e=>({skillType:"skill",key:e.id,label:n.jsxRuntimeExports.jsxs(n.jsxRuntimeExports.Fragment,{children:[n.jsxRuntimeExports.jsx(m.Tag,{children:d("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[$,ne]),[q,ae]=u.useState(),{onRequest:T,messages:j,isRequesting:Y,abort:ve,onReload:Re,setMessages:Ce,setMessage:Ee}=N.useXChat({provider:Be(g),conversationKey:g,defaultMessages:[],requestPlaceholder:()=>({content:F("loading"),role:"assistant"}),requestFallback:(e,{error:s})=>$e(s)?{content:"",role:"assistant"}:s instanceof Pe?{content:s.buffer.join(""),role:"assistant",error:s.message}:{content:`${s}`,role:"assistant"}}),C=u.useCallback(()=>{const e={domains:R.filter(t=>t.type==="domain").map(t=>t.value),skill_ids:R.filter(t=>t.type==="skill").map(t=>t.value)},s=B([...se,...x]);return s.length>0&&(e.ephemeral_system_prompts=s),b.length>0&&(e.client_tools=b.map(t=>({name:t.name,description:t.description,parameters:t.parameters}))),e},[R,se,x,b]),G=u.useRef(null),re=u.useCallback(async e=>{const s=[];for(const t of e){const i=b.find(f=>f.name===t.name);if(!i){s.push({tool_call_id:t.id,content:JSON.stringify({error:`Client tool handler not found for ${t.name}`})});continue}try{const f=await Promise.resolve(i.handler(t.arguments));s.push({tool_call_id:t.id,content:f})}catch(f){const I=f instanceof Error?f.message:String(f);s.push({tool_call_id:t.id,content:JSON.stringify({error:I})})}}T({content:"",client_tool_results:s,...C()})},[b,T,C]);u.useEffect(()=>{var e,s;if(!Y&&j&&j.length>0){const t=j[j.length-1];if((s=(e=t==null?void 0:t.message)==null?void 0:e.pendingClientToolCalls)!=null&&s.length){const i=t.message.pendingClientToolCalls;G.current!==i&&(G.current=i,re(i))}else G.current=null}},[Y,j,re]);const ie=e=>{if(e){if(!g){z(e);return}T({content:e,...C()})}},{run:Se,loading:we}=w.useRequest(async e=>await E.api.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{P.error(d("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(j&&j.length>0&&(j[j.length-1].status==="loading"||j.length>e.messages.length))return;const s=[];let t={id:"",message:{content:"",role:"assistant"},status:"success"};for(const i of e.messages)switch(i.role){case"assistant":t.status=i.status==="completed"&&t.status==="success"?"success":"error",t.message.role="assistant",t.id!==i.id&&i.content&&(t.message.content=i.content),t.id=i.id;break;case"user":t.message.content.length>0&&(s.push({id:t.id,message:{content:t.message.content,role:t.message.role},status:t.status}),t={id:"",message:{content:"",role:"assistant"},status:"success"}),s.push({id:i.id,message:{content:i.content,role:i.role},status:i.status==="completed"?"success":"error"});break}t.message.content.length>0&&s.push({id:t.id,message:{content:t.message.content,role:t.message.role},status:t.status}),Ce(s)}}),{run:z,loading:W}=w.useRequest(async(e,s,t=!1,i)=>({session:await E.api.ai.createChatSession({title:d("chat.defaultConversationTitle"),model_id:"",messages:s||[],anonymous:t}),message:e,domains:i}),{manual:!0,onError:()=>{P.error(d("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:({session:e,message:s,domains:t})=>{fe(O(e),"prepend"),M(e.id),s&&ae({message:s,sessionId:e.id,domains:t})}});u.useEffect(()=>{he((h==null?void 0:h.map(e=>O(e)))||[])},[h]);const{run:_e}=w.useRequest(async e=>await E.api.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[s]){P.error(d("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const t=D(s);t&&_(s,{...t,loading:!1})},onSuccess(e,[s]){je(s)}}),{run:qe}=w.useRequest(async e=>E.api.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[s])=>{const t=D(s);t&&_(s,{...t,title:e,loading:!1})},onError:(e,[s])=>{P.error(d("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const t=D(s);t&&_(s,{...t,loading:!1})}});u.useEffect(()=>{if(g&&(q==null?void 0:q.sessionId)===g){const{message:e,domains:s}=q;setTimeout(()=>{T({content:e,...C(),...s!==void 0?{domains:s}:{}})},1e3),ae(void 0)}},[g,q,C]),u.useEffect(()=>{if(g){const e=ye(g);if(e&&e.length>0)return;Se(g)}},[g]);const le=u.useRef(()=>{});le.current=(e,s)=>{const t=me.normalizeCallAIOptions(s),i=t.domains!==void 0?B(t.domains):void 0;if(i!==void 0&&J(f=>[...i.map(I=>({type:"domain",value:I})),...f.filter(I=>I.type==="skill")]),t.newSession===!1&&g){T({content:e,...C(),...i!==void 0?{domains:i}:{}});return}z(e,t.messages,!0,i)},u.useEffect(()=>{y&&y((e,s)=>{le.current(e,s)})},[y]);const Te=n.jsxRuntimeExports.jsxs("div",{className:k.sider,children:[n.jsxRuntimeExports.jsx(m.Button,{onClick:()=>{z()},type:"link",className:k.addBtn,icon:n.jsxRuntimeExports.jsx(S.PlusOutlined,{}),loading:W,children:d("chat.newConversation",{defaultValue:"New Conversation"})}),n.jsxRuntimeExports.jsx(m.Spin,{spinning:L,wrapperClassName:k.conversationsSpin,children:n.jsxRuntimeExports.jsx(v.Conversations,{items:Z,activeKey:g,onActiveChange:async e=>{e&&M(e)},className:k.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:d("chat.regenerateTitle"),key:"regenerateTitle",icon:n.jsxRuntimeExports.jsx(S.ReloadOutlined,{}),onClick:()=>{_(e.key,{...e,loading:!0}),qe(e.key)}},{label:F("delete"),key:"delete",icon:n.jsxRuntimeExports.jsx(S.DeleteOutlined,{}),danger:!0,onClick:()=>{_(e.key,{...e,loading:!0}),_e(e.key)}}]})})})]}),Ie=n.jsxRuntimeExports.jsx(n.jsxRuntimeExports.Fragment,{children:n.jsxRuntimeExports.jsx(m.Space,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:n.jsxRuntimeExports.jsx(v.Sender,{footer:e=>n.jsxRuntimeExports.jsxs(m.Flex,{justify:"space-between",align:"center",children:[n.jsxRuntimeExports.jsx(m.Flex,{gap:"small",align:"center",children:n.jsxRuntimeExports.jsx(m.Dropdown,{open:be,onOpenChange:(s,t)=>{(t.source==="trigger"||s)&&ke(s)},menu:{selectedKeys:R.map(s=>s.value),onClick:s=>{const t=oe.find(i=>i.key===s.key);J(i=>i.some(f=>f.value===s.key)?i.filter(f=>f.value!==s.key):[...i,{type:(t==null?void 0:t.skillType)||"skill",value:s.key}])},items:oe.map(s=>({label:s.label,key:s.key}))},children:n.jsxRuntimeExports.jsxs(v.Sender.Switch,{value:!1,icon:n.jsxRuntimeExports.jsx(n.LuBookOpenText,{}),children:[d("chat.skill",{defaultValue:"Skills"})," ","(",R.length>0?d("chat.skillsSelected",{defaultValue:"{{count}} selected",count:R.length}):d("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),n.jsxRuntimeExports.jsx(m.Flex,{align:"center",children:e})]}),suffix:!1,value:ee,onSubmit:async()=>{ie(ee.trim()),te("")},onChange:te,onCancel:()=>{ve()},loading:Y,className:Fe(k.sender,"chat-sender"),placeholder:d("chat.inputPlaceholder")})})});return n.jsxRuntimeExports.jsx(v.XProvider,{children:n.jsxRuntimeExports.jsxs(Ve.Provider,{value:{onReload:Re,setMessage:Ee},children:[n.jsxRuntimeExports.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[n.jsxRuntimeExports.jsx(m.Radio.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:n.jsxRuntimeExports.jsx(n.LuExternalLink,{style:{transform:"scaleX(-1)"}}),value:"classic"},{label:n.jsxRuntimeExports.jsx(n.LuPanelRightDashed,{}),value:"sidebar"},{label:n.jsxRuntimeExports.jsx(n.LuPanelRight,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>p(e.target.value),value:c}),n.jsxRuntimeExports.jsxs(m.Space,{style:{float:"right",marginTop:10},children:[n.jsxRuntimeExports.jsx(m.Button,{type:"primary",onClick:()=>{z()},loading:W,icon:n.jsxRuntimeExports.jsx(S.PlusOutlined,{}),style:{display:c==="classic"?"none":"block"}}),n.jsxRuntimeExports.jsx(m.Dropdown,{menu:{items:Z.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{M(e)}},placement:"bottomRight",children:n.jsxRuntimeExports.jsx(m.Button,{icon:L?n.jsxRuntimeExports.jsx(m.Spin,{size:"small"}):n.jsxRuntimeExports.jsx(S.HistoryOutlined,{}),style:{display:c==="classic"?"none":"block"}})}),n.jsxRuntimeExports.jsx(m.Button,{type:"text",onClick:()=>l(!1),children:n.jsxRuntimeExports.jsx(S.CloseOutlined,{})})]})]}),n.jsxRuntimeExports.jsxs("div",{className:c==="classic"?k.classicLayout:k.siderLayout,style:{minWidth:c==="classic"?"500px":"400px"},children:[c==="classic"?Te:null,n.jsxRuntimeExports.jsxs("div",{className:k.chat,children:[n.jsxRuntimeExports.jsx(Oe,{bubble:r,messages:j,loading:we||W,layout:c,onSendMessage:ie}),Ie]})]})]})})};exports.AIChat=ge;exports.default=ge;
