var ge=Object.defineProperty;var pe=(s,t,r)=>t in s?ge(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r;var q=(s,t,r)=>pe(s,typeof t!="symbol"?t+"":t,r);import{t as he,R as F,u as D,c as fe,r as f,s as M,a as C,j as a,B as j,b as V,S as v,d as xe,e as be,f as ye,g as ve,h as X,i as Ce,D as je,k as we,l as ke,m as I}from"./vendor.CdlQoPOM.js";import{a as w}from"./index.DyxfxbBc.js";import{u as $e}from"./contexts.DZ1m3bVd.js";import{u as Se,a as Re,C as Me,X as K,F as Ie,S as Le,b as Fe,c as Te,M as Ae,d as Ee,A as Ne}from"./ant-design-x.CuwM17xV.js";import"./vite.BF1G3H_w.js";import"./lodash.B3dv3_Tr.js";import"./highlight.BslI14e2.js";import"./ai.N_nt1I4d.js";import"./client.20U86Zur.js";import"./base.CA-bfSJi.js";import"./authorization.BnG7BYaH.js";import"./system.CM06OxEF.js";import"./oauth.-s2V-XVk.js";import"./components.BVfbySng.js";import"./ai-chat-layout._BQWA_Ui.js";import"./highlighter.Cqz4s4YY.js";import"./refractor.BpluFdjK.js";import"./mermaid.Cp6B0uC1.js";const Be=fe(({token:s,css:t})=>({siderLayout:t`
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
    `}));class Pe extends Error{constructor(r,i){super(r);q(this,"buffer");this.buffer=i}}class _e extends Ne{transformParams(t,r){if(typeof t!="object")throw new Error("requestParams must be an object");return{...(r==null?void 0:r.params)||{},...t||{}}}transformLocalMessage({content:t}){return{content:t,role:"user"}}transformMessage(t){const{originMessage:r,chunk:i}=t||{};if(!i)return{content:(r==null?void 0:r.content)||"",role:"assistant"};const l=JSON.parse(i.data),u=(r==null?void 0:r.content)||"";switch(l.event_type){case"content":return{content:`${u||""}${l.content||""}`,role:"assistant"};case"tool_call":return{content:u.endsWith("<br/>")?`${u}${l.content||""}`:`${u}<br/>${l.content||""}`,role:"assistant"};case"error":return{content:u,role:"assistant",error:l.content}}}}const L=new Map,ze=s=>(L.get(s)||L.set(s,new _e({request:Te(`/api/ai/chat/sessions/${s}`,{manual:!0,middlewares:{onRequest:async(t,r)=>{const i=localStorage.getItem("orgID"),{sessionId:l}=r.params,u={...r.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...i?{"X-Scope-OrgID":i}:{}};return[l?`/api/ai/chat/sessions/${l}`:t,{...r,headers:u}]}}})})),L.get(s)),H=s=>{var l;const{className:t,children:r}=s,i=((l=t==null?void 0:t.match(/language-(\w+)/))==null?void 0:l[1])||"";return typeof r!="string"?null:i==="mermaid"?a.jsx(Ae,{children:r}):a.jsx(Ee,{lang:i,children:r})},qe=()=>{const s=he.useToken(),t=F.useMemo(()=>{var i;return((i=s==null?void 0:s.theme)==null?void 0:i.id)===0},[s]);return[F.useMemo(()=>t?"x-markdown-light":"x-markdown-dark",[t])]},De=F.createContext({}),it=()=>{const{layout:s,setVisible:t,setLayout:r,onCallAI:i,activeConversationKey:l,setActiveConversationKey:u,conversations:h,fetchConversationsLoading:T}=$e(),{t:m}=D("ai"),{t:A}=D("common"),{styles:g}=Be(),k=e=>({key:e.id,label:e.title,group:I(e.start_time).isSame(I(),"day")?m("chat.today"):I(e.start_time).format("YYYY-MM-DD")}),{conversations:E,activeConversationKey:c,setActiveConversationKey:$,addConversation:Y,setConversations:G,getConversation:S,setConversation:b,removeConversation:W,getMessages:J}=Se({defaultActiveConversationKey:l,defaultConversations:(h==null?void 0:h.map(e=>k(e)))||[]});f.useEffect(()=>{u(c)},[c]);const[O]=qe(),[N,U]=M.useMessage(),[B,P]=f.useState(""),[y,_]=f.useState(),{onRequest:z,messages:p,isRequesting:Q,abort:Z,onReload:ee,setMessages:te,setMessage:se}=Re({provider:ze(c),conversationKey:c,defaultMessages:[],requestPlaceholder:()=>({content:A("loading"),role:"assistant"}),requestFallback:(e,{error:o})=>o instanceof Pe?{content:o.buffer.join(""),role:"assistant",error:o.message}:{content:`${o}`,role:"assistant"}}),ae=e=>{if(e){if(!c){x(e);return}z({content:e})}},{run:ne,loading:oe}=C(async e=>await w.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{M.error(m("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(p&&p.length>0&&(p[p.length-1].status==="loading"||p.length>e.messages.length))return;const o=[];let n={id:"",message:{content:"",role:"assistant"},status:"success"};for(const d of e.messages)switch(d.role){case"assistant":n.status=d.status==="completed"&&n.status==="success"?"success":"error",n.message.role="assistant",n.id=d.id,d.tool_calls&&d.tool_calls.length>0?n.message.content.endsWith("<br/>")?n.message.content=`${n.message.content}${d.content}`:n.message.content=`${n.message.content}<br/>${d.content}`:n.message.content=`${n.message.content}${d.content}`;break;case"user":n.message.content.length>0&&(o.push({id:n.id,message:{content:n.message.content,role:n.message.role},status:n.status}),n={id:"",message:{content:"",role:"assistant"},status:"success"}),o.push({id:d.id,message:{content:d.content,role:d.role},status:d.status==="completed"?"success":"error"});break}n.message.content.length>0&&o.push({id:n.id,message:{content:n.message.content,role:n.message.role},status:n.status}),te(o)}}),{run:x,loading:R}=C(async(e,o,n=!1)=>await w.ai.createChatSession({title:m("chat.defaultConversationTitle"),model_id:"",messages:o||[],anonymous:n}),{manual:!0,onError:()=>{M.error(m("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[o])=>{Y(k(e),"prepend"),$(e.id),o&&_({message:o,sessionId:e.id})}});f.useEffect(()=>{G((h==null?void 0:h.map(e=>k(e)))||[])},[h]);const{run:re}=C(async e=>await w.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[o]){N.error(m("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const n=S(o);n&&b(o,{...n,loading:!1})},onSuccess(e,[o]){W(o)}}),{run:ie}=C(async e=>w.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[o])=>{const n=S(o);n&&b(o,{...n,title:e,loading:!1})},onError:(e,[o])=>{N.error(m("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const n=S(o);n&&b(o,{...n,loading:!1})}});f.useEffect(()=>{if(c&&(y==null?void 0:y.sessionId)===c){const e=y.message;setTimeout(()=>{z({content:e})},1e3),_(void 0)}},[c,y]),f.useEffect(()=>{if(c){const e=J(c);if(e&&e.length>0)return;ne(c)}},[c]),f.useEffect(()=>{i&&x&&i((e,o)=>{x(e,o,!0)})},[x,i]);const le=a.jsxs("div",{className:g.sider,children:[a.jsx(j,{onClick:()=>{x()},type:"link",className:g.addBtn,icon:a.jsx(V,{}),loading:R,children:m("chat.newConversation",{defaultValue:"New Conversation"})}),a.jsx(v,{spinning:T,wrapperClassName:g.conversationsSpin,children:a.jsx(Me,{items:E,activeKey:c,onActiveChange:async e=>{e&&$(e)},className:g.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:m("chat.regenerateTitle"),key:"regenerateTitle",icon:a.jsx(xe,{}),onClick:()=>{b(e.key,{...e,loading:!0}),ie(e.key)}},{label:A("delete"),key:"delete",icon:a.jsx(be,{}),danger:!0,onClick:()=>{b(e.key,{...e,loading:!0}),re(e.key)}}]})})})]}),ce=({message:e})=>{if(e.error)return a.jsx("div",{children:a.jsx(K,{content:e.error,components:{code:H}})})},de=p==null?void 0:p.map(e=>({...e.message,key:e.id,contentRender:o=>a.jsx(K,{paragraphTag:"div",content:o,className:O,components:{code:H}}),footer:ce(e)})),ue=a.jsx("div",{className:g.chatList,children:a.jsx(v,{spinning:oe||R,children:a.jsx(Ie.List,{items:de,style:{height:"100%",paddingInline:s==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>a.jsx(v,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>a.jsx(v,{size:"small"})},user:{placement:"end"}}})})}),me=a.jsx(a.Fragment,{children:a.jsx(Le,{value:B,onSubmit:async()=>{ae(B.trim()),P("")},onChange:P,onCancel:()=>{Z()},loading:Q,className:g.sender,placeholder:m("chat.inputPlaceholder")})});return a.jsxs(Fe,{children:[U,a.jsxs(De.Provider,{value:{onReload:ee,setMessage:se},children:[a.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[a.jsx(ye.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:a.jsx(ve,{}),value:"classic"},{label:a.jsx(X,{}),value:"sidebar"},{label:a.jsx(X,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>r(e.target.value),value:s}),a.jsxs(Ce,{style:{float:"right",marginTop:10},children:[a.jsx(j,{type:"primary",onClick:()=>{x()},loading:R,icon:a.jsx(V,{}),style:{display:s==="classic"?"none":"block"}}),a.jsx(je,{menu:{items:E.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{$(e)}},placement:"bottomRight",children:a.jsx(j,{icon:T?a.jsx(v,{size:"small"}):a.jsx(we,{}),style:{display:s==="classic"?"none":"block"}})}),a.jsx(j,{type:"text",onClick:()=>t(!1),children:a.jsx(ke,{})})]})]}),a.jsxs("div",{className:s==="classic"?g.classicLayout:g.siderLayout,style:{minWidth:s==="classic"?"500px":"400px"},children:[s==="classic"?le:null,a.jsxs("div",{className:g.chat,children:[ue,me]})]})]})]})};export{it as default,qe as useMarkdownTheme};
