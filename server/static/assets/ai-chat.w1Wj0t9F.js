var _e=Object.defineProperty;var Te=(r,s,o)=>s in r?_e(r,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[s]=o;var Q=(r,s,o)=>Te(r,typeof s!="symbol"?s+"":s,o);import{a as Z,c as Ie,r as d,s as z,f as j,j as a,g as ee,B as E,h as te,S as $,i as Le,k as Re,l as se,d as $e,m as D,D as ae,L as Fe,n as Ae,o as Ee,p as Me,q as Ne,t as Pe,v as Ve,w as Be,x as q,y as ze}from"./vendor.DoRCPvm0.js";import{a as S}from"./index.n2R2-R9k.js";import{a as De}from"./contexts.CjGqtcew.js";import{u as qe,a as He,C as Xe,S as ne,X as Ke,b as Oe,c as oe,F as Je,A as Ye,M as Ge,d as We}from"./ant-design-x.CCzKFXAR.js";import"./vite.BF1G3H_w.js";import"./lodash.DmwREYZ8.js";import"./highlight.BslI14e2.js";import"./ai.4mU9orvX.js";import"./client.Dp-2e3Xc.js";import"./base.CAWr6b_K.js";import"./authorization.D_7gdKbB.js";import"./system.Bb1i8Jbj.js";import"./oauth.Dq6bLso1.js";import"./tasks.C3a1Isns.js";import"./components.CtHY6tru.js";import"./ai-chat-layout.CWLySXNy.js";import"./highlighter.BH-xJN1E.js";import"./refractor.DdqrfEUv.js";import"./mermaid.C_ONDZ49.js";const re=Ie(({token:r,css:s})=>({siderLayout:s`
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
    `}));class Ue extends Error{constructor(o,m){super(o);Q(this,"buffer");this.buffer=m}}function Qe(r){if(r==null||typeof r!="object")return!1;const s=r;if(s.name==="AbortError")return!0;const o=typeof s.message=="string"?s.message:"";return/aborted/i.test(o)||/BodyStreamBuffer/i.test(o)}class Ze extends Ye{transformParams(s,o){if(typeof s!="object")throw new Error("requestParams must be an object");return{...(o==null?void 0:o.params)||{},...s||{}}}transformLocalMessage({content:s}){return{content:s,role:"user"}}transformMessage(s){const{originMessage:o,chunk:m,status:c}=s||{};if(!m)return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:c};const u=JSON.parse(m.data),b=u.message_id===(o==null?void 0:o.messageId)?`${(o==null?void 0:o.content)||""}${u.content||""}`:u.content||"";switch(u.event_type){case"tool_call":case"content":return{...o,content:b,role:"assistant",messageId:u.message_id,status:c};case"error":return{...o,content:b,role:"assistant",error:u.content,messageId:u.message_id,status:c};case"client_tool_pending":return{...o,content:b||"",role:"assistant",pendingClientToolCalls:u.client_tool_calls,messageId:u.message_id,status:c}}}}const H=new Map,et=r=>(H.get(r)||H.set(r,new Ze({request:Oe(`/api/ai/chat/sessions/${r}`,{manual:!0,middlewares:{onRequest:async(s,o)=>{const m=localStorage.getItem("orgID"),{sessionId:c}=o.params,u={...o.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...m?{"X-Scope-OrgID":m}:{}};return[c?`/api/ai/chat/sessions/${c}`:s,{...o,headers:u}]}}})})),H.get(r)),tt=r=>{var c;const{className:s,children:o}=r,m=((c=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:c[1])||"";return typeof o!="string"?null:m==="mermaid"?a.jsx(Ge,{children:o}):a.jsx("code",{className:"ant-highlightCode-code",children:a.jsx(We,{lang:m,children:o})})},st=Ae.createContext({}),at=({bubble:r={},messages:s,loading:o,layout:m="classic",onSendMessage:c})=>{const{styles:u}=re(),{isDarkMode:b}=ze(),x=d.useMemo(()=>{if(!r.components)return{code:tt};const i={};for(const v in r.components){const g=r.components[v];if(typeof g=="string"){i[v]=g;continue}i[v]=w=>a.jsx(g,{...w,onSendMessage:c})}return i},[c,r.components]),{contentRender:F=i=>a.jsx(oe,{paragraphTag:"div",content:i,className:b?"x-markdown-dark":"x-markdown-light",components:x}),footerRender:y=({message:i})=>{if(i.error)return a.jsx("div",{children:a.jsx(oe,{content:i.error,components:x})})}}=r,k=d.useMemo(()=>(s||[]).map(i=>({...i.message,key:i.id,contentRender:F,footer:(v,g)=>y==null?void 0:y(i,g,c)})).filter(i=>i.content),[s]);return a.jsx("div",{className:u.chatList,children:a.jsx($,{spinning:o,children:a.jsx(Je.List,{items:k,style:{height:"100%",paddingInline:m==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>a.jsx($,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>a.jsx($,{size:"small"})},user:{placement:"end"}}})})})},St=({bubble:r={}})=>{const{layout:s,setVisible:o,setLayout:m,onCallAI:c,activeConversationKey:u,setActiveConversationKey:b,conversations:x,fetchConversationsLoading:F,ephemeralSystemPrompts:y,clientTools:k}=De(),{t:i}=Z("ai"),{t:v}=Z("common"),{styles:g}=re(),w=e=>({key:e.id,label:e.title,group:q(e.start_time).isSame(q(),"day")?i("chat.today"):q(e.start_time).format("YYYY-MM-DD")}),{conversations:X,activeConversationKey:p,setActiveConversationKey:M,addConversation:ie,setConversations:le,getConversation:N,setConversation:_,removeConversation:ce,getMessages:de}=qe({defaultActiveConversationKey:u,defaultConversations:(x==null?void 0:x.map(e=>w(e)))||[]});d.useEffect(()=>{b(p)},[p]);const[K,ue]=z.useMessage(),[O,J]=d.useState(""),[me,ge]=d.useState(!1),[T,pe]=d.useState([]),{data:fe}=j(()=>S.system.listSkillDomains()),{data:I}=j(()=>S.system.listSkills({current:1,page_size:500})),Y=d.useMemo(()=>[...(fe??[]).map(e=>({skillType:"domain",key:e,label:a.jsxs(a.Fragment,{children:[a.jsx(ee,{children:i("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),...((I==null?void 0:I.data)??[]).map(e=>({skillType:"skill",key:e.id,label:a.jsxs(a.Fragment,{children:[a.jsx(ee,{children:i("chat.skill",{defaultValue:"Skill"})}),e.name]})}))],[I,I]),[L,G]=d.useState(),{onRequest:A,messages:h,isRequesting:P,abort:he,onReload:xe,setMessages:be,setMessage:ye}=He({provider:et(p),conversationKey:p,defaultMessages:[],requestPlaceholder:()=>({content:v("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>Qe(t)?{content:"",role:"assistant"}:t instanceof Ue?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),R=d.useCallback(()=>{const e={};return y.length>0&&(e.ephemeral_system_prompts=y),k.length>0&&(e.client_tools=k.map(t=>({name:t.name,description:t.description,parameters:t.parameters}))),e},[y,k]),V=d.useRef(null),W=d.useCallback(async e=>{const t=[];for(const n of e){const l=k.find(f=>f.name===n.name);if(!l){t.push({tool_call_id:n.id,content:JSON.stringify({error:`Client tool handler not found for ${n.name}`})});continue}try{const f=await Promise.resolve(l.handler(n.arguments));t.push({tool_call_id:n.id,content:f})}catch(f){t.push({tool_call_id:n.id,content:JSON.stringify({error:(f==null?void 0:f.message)||String(f)})})}}A({content:"",client_tool_results:t,...R()})},[k,A,R]);d.useEffect(()=>{var e,t;if(!P&&h&&h.length>0){const n=h[h.length-1];if((t=(e=n==null?void 0:n.message)==null?void 0:e.pendingClientToolCalls)!=null&&t.length){const l=n.message.pendingClientToolCalls;V.current!==l&&(V.current=l,W(l))}else V.current=null}},[P,h,W]);const U=e=>{if(e){if(!p){C(e);return}A({content:e,domains:T.filter(t=>t.type==="domain").map(t=>t.value),skill_ids:T.filter(t=>t.type==="skill").map(t=>t.value),...R()})}},{run:ke,loading:ve}=j(async e=>await S.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{z.error(i("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(h&&h.length>0&&(h[h.length-1].status==="loading"||h.length>e.messages.length))return;const t=[];let n={id:"",message:{content:"",role:"assistant"},status:"success"};for(const l of e.messages)switch(l.role){case"assistant":n.status=l.status==="completed"&&n.status==="success"?"success":"error",n.message.role="assistant",n.id!==l.id&&l.content&&(n.message.content=l.content),n.id=l.id;break;case"user":n.message.content.length>0&&(t.push({id:n.id,message:{content:n.message.content,role:n.message.role},status:n.status}),n={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:l.id,message:{content:l.content,role:l.role},status:l.status==="completed"?"success":"error"});break}n.message.content.length>0&&t.push({id:n.id,message:{content:n.message.content,role:n.message.role},status:n.status}),be(t)}}),{run:C,loading:B}=j(async(e,t,n=!1)=>await S.ai.createChatSession({title:i("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:n}),{manual:!0,onError:()=>{z.error(i("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[t])=>{ie(w(e),"prepend"),M(e.id),t&&G({message:t,sessionId:e.id})}});d.useEffect(()=>{le((x==null?void 0:x.map(e=>w(e)))||[])},[x]);const{run:Ce}=j(async e=>await S.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){K.error(i("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const n=N(t);n&&_(t,{...n,loading:!1})},onSuccess(e,[t]){ce(t)}}),{run:je}=j(async e=>S.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const n=N(t);n&&_(t,{...n,title:e,loading:!1})},onError:(e,[t])=>{K.error(i("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const n=N(t);n&&_(t,{...n,loading:!1})}});d.useEffect(()=>{if(p&&(L==null?void 0:L.sessionId)===p){const e=L.message;setTimeout(()=>{A({content:e,...R()})},1e3),G(void 0)}},[p,L,R]),d.useEffect(()=>{if(p){const e=de(p);if(e&&e.length>0)return;ke(p)}},[p]),d.useEffect(()=>{c&&C&&c((e,t)=>{C(e,t,!0)})},[C,c]);const Se=a.jsxs("div",{className:g.sider,children:[a.jsx(E,{onClick:()=>{C()},type:"link",className:g.addBtn,icon:a.jsx(te,{}),loading:B,children:i("chat.newConversation",{defaultValue:"New Conversation"})}),a.jsx($,{spinning:F,wrapperClassName:g.conversationsSpin,children:a.jsx(Xe,{items:X,activeKey:p,onActiveChange:async e=>{e&&M(e)},className:g.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:i("chat.regenerateTitle"),key:"regenerateTitle",icon:a.jsx(Le,{}),onClick:()=>{_(e.key,{...e,loading:!0}),je(e.key)}},{label:v("delete"),key:"delete",icon:a.jsx(Re,{}),danger:!0,onClick:()=>{_(e.key,{...e,loading:!0}),Ce(e.key)}}]})})})]}),we=a.jsx(a.Fragment,{children:a.jsx(se,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:a.jsx(ne,{footer:e=>a.jsxs(D,{justify:"space-between",align:"center",children:[a.jsx(D,{gap:"small",align:"center",children:a.jsx(ae,{open:me,onOpenChange:(t,n)=>{(n.source==="trigger"||t)&&ge(t)},menu:{selectedKeys:T.map(t=>t.value),onClick:t=>{const n=Y.find(l=>l.key===t.key);pe(l=>l.some(f=>f.value===t.key)?l.filter(f=>f.value!==t.key):[...l,{type:(n==null?void 0:n.skillType)||"skill",value:t.key}])},items:Y.map(t=>({label:t.label,key:t.key}))},children:a.jsxs(ne.Switch,{value:!1,icon:a.jsx(Fe,{}),children:[i("chat.skill",{defaultValue:"Skills"})," ","(",T.length>0?i("chat.skillsSelected",{defaultValue:"{{count}} selected",count:T.length}):i("chat.skillsOptional",{defaultValue:"optional"}),")"]})})}),a.jsx(D,{align:"center",children:e})]}),suffix:!1,value:O,onSubmit:async()=>{U(O.trim()),J("")},onChange:J,onCancel:()=>{he()},loading:P,className:$e(g.sender,"chat-sender"),placeholder:i("chat.inputPlaceholder")})})});return a.jsxs(Ke,{children:[ue,a.jsxs(st.Provider,{value:{onReload:xe,setMessage:ye},children:[a.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[a.jsx(Ee.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:a.jsx(Me,{style:{transform:"scaleX(-1)"}}),value:"classic"},{label:a.jsx(Ne,{}),value:"sidebar"},{label:a.jsx(Pe,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>m(e.target.value),value:s}),a.jsxs(se,{style:{float:"right",marginTop:10},children:[a.jsx(E,{type:"primary",onClick:()=>{C()},loading:B,icon:a.jsx(te,{}),style:{display:s==="classic"?"none":"block"}}),a.jsx(ae,{menu:{items:X.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{M(e)}},placement:"bottomRight",children:a.jsx(E,{icon:F?a.jsx($,{size:"small"}):a.jsx(Ve,{}),style:{display:s==="classic"?"none":"block"}})}),a.jsx(E,{type:"text",onClick:()=>o(!1),children:a.jsx(Be,{})})]})]}),a.jsxs("div",{className:s==="classic"?g.classicLayout:g.siderLayout,style:{minWidth:s==="classic"?"500px":"400px"},children:[s==="classic"?Se:null,a.jsxs("div",{className:g.chat,children:[a.jsx(at,{bubble:r,messages:h,loading:ve||B,layout:s,onSendMessage:U}),we]})]})]})]})};export{St as AIChat,St as default};
