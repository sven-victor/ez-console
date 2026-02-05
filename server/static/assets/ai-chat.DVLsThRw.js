var ke=Object.defineProperty;var je=(n,s,r)=>s in n?ke(n,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[s]=r;var X=(n,s,r)=>je(n,typeof s!="symbol"?s+"":s,r);import{t as Se,R as N,u as K,c as we,r as h,s as I,a as b,j as t,T as H,B as j,b as O,S as k,d as $e,e as Te,f as W,g as Re,h as Y,i as Me,k as Fe,l as G,D as Ie,m as Le,n as Ae,o as L}from"./vendor.B6JBhCAY.js";import{a as y}from"./index.Bm7X5fEY.js";import{u as Ne}from"./contexts.Ca4oT16l.js";import{u as Ee,a as _e,C as Pe,X as J,F as ze,S as Be,b as Ve,c as De,M as qe,d as Xe,A as Ke}from"./ant-design-x.BIkQt4u4.js";import{i as He}from"./lodash.BDtH7uFP.js";import"./vite.BF1G3H_w.js";import"./highlight.BslI14e2.js";import"./ai.BlO1DqPv.js";import"./client.C_z0mq-g.js";import"./base.BXKr0a0H.js";import"./authorization.B5peLd2a.js";import"./system.BGeF3M7c.js";import"./oauth.ClVdJKPp.js";import"./components.CP7t-rAl.js";import"./ai-chat-layout.BT1nS6nA.js";import"./highlighter.06nRe2Bn.js";import"./refractor.CIIjg-xe.js";import"./mermaid.X6yIL1F5.js";const Oe=we(({token:n,css:s})=>({siderLayout:s`
      width: 100%;
      height: calc(100vh - 100px);
      display: flex;
      background: ${n.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${n.fontFamily}, sans-serif;
    `,classicLayout:s`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${n.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${n.fontFamily}, sans-serif;
    `,sider:s`
      background: ${n.colorBgLayout}80;
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
        color: ${n.colorText};
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
      border-top: 1px solid ${n.colorBorderSecondary};
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
      padding-block: ${n.paddingLG}px;
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
      color: ${n.colorText} !important;
    `,senderPrompt:s`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${n.colorText};
    `}));class We extends Error{constructor(r,i){super(r);X(this,"buffer");this.buffer=i}}class Ye extends Ke{transformParams(s,r){if(typeof s!="object")throw new Error("requestParams must be an object");return{...(r==null?void 0:r.params)||{},...s||{}}}transformLocalMessage({content:s}){return{content:s,role:"user"}}transformMessage(s){const{originMessage:r,chunk:i}=s||{};if(!i)return{content:(r==null?void 0:r.content)||"",role:"assistant"};const l=JSON.parse(i.data),p=(r==null?void 0:r.content)||"";switch(l.event_type){case"content":return{content:`${p||""}${l.content||""}`,role:"assistant"};case"tool_call":return{content:p.endsWith("<br/>")?`${p}${l.content||""}`:`${p}<br/>${l.content||""}`,role:"assistant"};case"error":return{content:p,role:"assistant",error:l.content}}}}const A=new Map,Ge=n=>(A.get(n)||A.set(n,new Ye({request:De(`/api/ai/chat/sessions/${n}`,{manual:!0,middlewares:{onRequest:async(s,r)=>{const i=localStorage.getItem("orgID"),{sessionId:l}=r.params,p={...r.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...i?{"X-Scope-OrgID":i}:{}};return[l?`/api/ai/chat/sessions/${l}`:s,{...r,headers:p}]}}})})),A.get(n)),U=n=>{var l;const{className:s,children:r}=n,i=((l=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:l[1])||"";return typeof r!="string"?null:i==="mermaid"?t.jsx(qe,{children:r}):t.jsx(Xe,{lang:i,children:r})},Je=()=>{const n=Se.useToken(),s=N.useMemo(()=>{var i;return((i=n==null?void 0:n.theme)==null?void 0:i.id)===0},[n]);return[N.useMemo(()=>s?"x-markdown-light":"x-markdown-dark",[s])]},Ue=N.createContext({}),bt=()=>{const{layout:n,setVisible:s,setLayout:r,onCallAI:i,activeConversationKey:l,setActiveConversationKey:p,conversations:f,fetchConversationsLoading:E}=Ne(),{t:d}=K("ai"),{t:_}=K("common"),{styles:m}=Oe(),S=e=>({key:e.id,label:e.title,group:L(e.start_time).isSame(L(),"day")?d("chat.today"):L(e.start_time).format("YYYY-MM-DD")}),{conversations:P,activeConversationKey:c,setActiveConversationKey:w,addConversation:Q,setConversations:Z,getConversation:$,setConversation:v,removeConversation:ee,getMessages:te}=Ee({defaultActiveConversationKey:l,defaultConversations:(f==null?void 0:f.map(e=>S(e)))||[]});h.useEffect(()=>{p(c)},[c]);const[se]=Je(),[z,ae]=I.useMessage(),[B,V]=h.useState(""),[T,R]=h.useState([]),{data:ne}=b(()=>y.system.listSkillDomains()),oe=(ne??[]).map(e=>({skillType:"domain",value:e,label:t.jsxs(t.Fragment,{children:[t.jsx(H,{children:d("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),{data:M}=b(()=>y.system.listSkills({current:1,page_size:500})),re=((M==null?void 0:M.data)??[]).map(e=>({skillType:"skill",value:e.id,label:t.jsxs(t.Fragment,{children:[t.jsx(H,{children:d("chat.skill",{defaultValue:"Skill"})}),e.name]})})),[C,D]=h.useState(),{onRequest:q,messages:g,isRequesting:ie,abort:le,onReload:ce,setMessages:de,setMessage:ue}=_e({provider:Ge(c),conversationKey:c,defaultMessages:[],requestPlaceholder:()=>({content:_("loading"),role:"assistant"}),requestFallback:(e,{error:a})=>a instanceof We?{content:a.buffer.join(""),role:"assistant",error:a.message}:{content:`${a}`,role:"assistant"}}),me=e=>{if(e){if(!c){x(e);return}q({content:e,domains:T.filter(a=>a.type==="domain").map(a=>a.value),skill_ids:T.filter(a=>a.type==="skill").map(a=>a.value)})}},{run:pe,loading:ge}=b(async e=>await y.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{I.error(d("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(g&&g.length>0&&(g[g.length-1].status==="loading"||g.length>e.messages.length))return;const a=[];let o={id:"",message:{content:"",role:"assistant"},status:"success"};for(const u of e.messages)switch(u.role){case"assistant":o.status=u.status==="completed"&&o.status==="success"?"success":"error",o.message.role="assistant",o.id=u.id,u.tool_calls&&u.tool_calls.length>0?o.message.content.endsWith("<br/>")?o.message.content=`${o.message.content}${u.content}`:o.message.content=`${o.message.content}<br/>${u.content}`:o.message.content=`${o.message.content}${u.content}`;break;case"user":o.message.content.length>0&&(a.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),o={id:"",message:{content:"",role:"assistant"},status:"success"}),a.push({id:u.id,message:{content:u.content,role:u.role},status:u.status==="completed"?"success":"error"});break}o.message.content.length>0&&a.push({id:o.id,message:{content:o.message.content,role:o.message.role},status:o.status}),de(a)}}),{run:x,loading:F}=b(async(e,a,o=!1)=>await y.ai.createChatSession({title:d("chat.defaultConversationTitle"),model_id:"",messages:a||[],anonymous:o}),{manual:!0,onError:()=>{I.error(d("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[a])=>{Q(S(e),"prepend"),w(e.id),a&&D({message:a,sessionId:e.id})}});h.useEffect(()=>{Z((f==null?void 0:f.map(e=>S(e)))||[])},[f]);const{run:he}=b(async e=>await y.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[a]){z.error(d("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const o=$(a);o&&v(a,{...o,loading:!1})},onSuccess(e,[a]){ee(a)}}),{run:fe}=b(async e=>y.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[a])=>{const o=$(a);o&&v(a,{...o,title:e,loading:!1})},onError:(e,[a])=>{z.error(d("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const o=$(a);o&&v(a,{...o,loading:!1})}});h.useEffect(()=>{if(c&&(C==null?void 0:C.sessionId)===c){const e=C.message;setTimeout(()=>{q({content:e})},1e3),D(void 0)}},[c,C]),h.useEffect(()=>{if(c){const e=te(c);if(e&&e.length>0)return;pe(c)}},[c]),h.useEffect(()=>{i&&x&&i((e,a)=>{x(e,a,!0)})},[x,i]);const xe=t.jsxs("div",{className:m.sider,children:[t.jsx(j,{onClick:()=>{x()},type:"link",className:m.addBtn,icon:t.jsx(O,{}),loading:F,children:d("chat.newConversation",{defaultValue:"New Conversation"})}),t.jsx(k,{spinning:E,wrapperClassName:m.conversationsSpin,children:t.jsx(Pe,{items:P,activeKey:c,onActiveChange:async e=>{e&&w(e)},className:m.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:d("chat.regenerateTitle"),key:"regenerateTitle",icon:t.jsx($e,{}),onClick:()=>{v(e.key,{...e,loading:!0}),fe(e.key)}},{label:_("delete"),key:"delete",icon:t.jsx(Te,{}),danger:!0,onClick:()=>{v(e.key,{...e,loading:!0}),he(e.key)}}]})})})]}),be=({message:e})=>{if(e.error)return t.jsx("div",{children:t.jsx(J,{content:e.error,components:{code:U}})})},ye=g==null?void 0:g.map(e=>({...e.message,key:e.id,contentRender:a=>t.jsx(J,{paragraphTag:"div",content:a,className:se,components:{code:U}}),footer:be(e)})),ve=t.jsx("div",{className:m.chatList,children:t.jsx(k,{spinning:ge||F,children:t.jsx(ze.List,{items:ye,style:{height:"100%",paddingInline:n==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>t.jsx(k,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>t.jsx(k,{size:"small"})},user:{placement:"end"}}})})}),Ce=t.jsx(t.Fragment,{children:t.jsxs(W,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:[t.jsx(Re,{mode:"multiple",allowClear:!0,placeholder:d("chat.skillsPlaceholder",{defaultValue:"Skills (optional)"}),value:T.map(e=>e.value),onChange:(e,a)=>{He(a)?R(a.map(o=>({type:o.skillType,value:o.value}))):R(a?[{type:a.skillType,value:a.value}]:[])},options:[...oe,...re],className:Y(m.skillsSelect,"chat-skills-select")}),t.jsx(Be,{value:B,onSubmit:async()=>{me(B.trim()),V("")},onChange:V,onCancel:()=>{le()},loading:ie,className:Y(m.sender,"chat-sender"),placeholder:d("chat.inputPlaceholder")})]})});return t.jsxs(Ve,{children:[ae,t.jsxs(Ue.Provider,{value:{onReload:ce,setMessage:ue},children:[t.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[t.jsx(Me.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:t.jsx(Fe,{}),value:"classic"},{label:t.jsx(G,{}),value:"sidebar"},{label:t.jsx(G,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>r(e.target.value),value:n}),t.jsxs(W,{style:{float:"right",marginTop:10},children:[t.jsx(j,{type:"primary",onClick:()=>{x()},loading:F,icon:t.jsx(O,{}),style:{display:n==="classic"?"none":"block"}}),t.jsx(Ie,{menu:{items:P.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{w(e)}},placement:"bottomRight",children:t.jsx(j,{icon:E?t.jsx(k,{size:"small"}):t.jsx(Le,{}),style:{display:n==="classic"?"none":"block"}})}),t.jsx(j,{type:"text",onClick:()=>s(!1),children:t.jsx(Ae,{})})]})]}),t.jsxs("div",{className:n==="classic"?m.classicLayout:m.siderLayout,style:{minWidth:n==="classic"?"500px":"400px"},children:[n==="classic"?xe:null,t.jsxs("div",{className:m.chat,children:[ve,Ce]})]})]})]})};export{bt as default,Je as useMarkdownTheme};
