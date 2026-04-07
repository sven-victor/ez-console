var Re=Object.defineProperty;var Ae=(i,s,o)=>s in i?Re(i,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[s]=o;var Q=(i,s,o)=>Ae(i,typeof s!="symbol"?s+"":s,o);import{t as Fe,R as X,j as a,u as Z,c as Le,r as p,s as V,a as y,T as ee,B as I,b as te,S as _,d as Ne,e as Ee,f as se,g as Me,h as ae,i as Pe,k as Be,l as ne,D as ze,m as Ve,n as De,o as D}from"./vendor.BE6ldH0w.js";import{a as v}from"./index.CZira6I_.js";import{u as qe}from"./contexts.B0vgPZKJ.js";import{X as oe,u as Xe,a as He,C as Oe,F as Ke,S as Je,b as Ye,M as Ge,c as We,d as Ue,A as Qe}from"./ant-design-x.DIn5xnJ0.js";import{i as Ze}from"./lodash.Cd5kjlQ2.js";import"./vite.BF1G3H_w.js";import"./highlight.BslI14e2.js";import"./ai.CsSu-dmO.js";import"./client.DVozAygq.js";import"./base.Dz6aSg80.js";import"./authorization.B-z0WrGn.js";import"./system.BRUbi9vG.js";import"./oauth.DfpcMCdW.js";import"./tasks.CJE-oWLb.js";import"./components.BoqLKneD.js";import"./ai-chat-layout.DTEZ4jBD.js";import"./highlighter.wjsfWXzy.js";import"./refractor.Cqh5z5_l.js";import"./mermaid.BN8OOm7C.js";const et=Le(({token:i,css:s})=>({siderLayout:s`
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
    `}));class tt extends Error{constructor(o,l){super(o);Q(this,"buffer");this.buffer=l}}function st(i){if(i==null||typeof i!="object")return!1;const s=i;if(s.name==="AbortError")return!0;const o=typeof s.message=="string"?s.message:"";return/aborted/i.test(o)||/BodyStreamBuffer/i.test(o)}class at extends Qe{transformParams(s,o){if(typeof s!="object")throw new Error("requestParams must be an object");return{...(o==null?void 0:o.params)||{},...s||{}}}transformLocalMessage({content:s}){return{content:s,role:"user"}}transformMessage(s){const{originMessage:o,chunk:l,status:r}=s||{};if(!l)return{...o,content:(o==null?void 0:o.content)||"",role:"assistant",status:r};const d=JSON.parse(l.data),C=d.message_id===(o==null?void 0:o.messageId)?`${(o==null?void 0:o.content)||""}${d.content||""}`:d.content||"";switch(d.event_type){case"tool_call":case"content":return{...o,content:C,role:"assistant",messageId:d.message_id,status:r};case"error":return{...o,content:C,role:"assistant",error:d.content,messageId:d.message_id,status:r};case"client_tool_pending":return{...o,content:C||"",role:"assistant",pendingClientToolCalls:d.client_tool_calls,messageId:d.message_id,status:r}}}}const q=new Map,nt=i=>(q.get(i)||q.set(i,new at({request:Ue(`/api/ai/chat/sessions/${i}`,{manual:!0,middlewares:{onRequest:async(s,o)=>{const l=localStorage.getItem("orgID"),{sessionId:r}=o.params,d={...o.headers,"Accept-Language":localStorage.getItem("i18nextLng")||"en-US",Authorization:`Bearer ${localStorage.getItem("token")}`,...l?{"X-Scope-OrgID":l}:{}};return[r?`/api/ai/chat/sessions/${r}`:s,{...o,headers:d}]}}})})),q.get(i)),ot=i=>{var r;const{className:s,children:o}=i,l=((r=s==null?void 0:s.match(/language-(\w+)/))==null?void 0:r[1])||"";return typeof o!="string"?null:l==="mermaid"?a.jsx(Ge,{children:o}):a.jsx(We,{lang:l,children:o})},it=()=>{const i=Fe.useToken(),s=X.useMemo(()=>{var l;return((l=i==null?void 0:i.theme)==null?void 0:l.id)===0},[i]);return[X.useMemo(()=>s?"x-markdown-light":"x-markdown-dark",[s])]},rt=X.createContext({}),$t=({bubble:i={}})=>{const{components:s={code:ot},contentRender:o=e=>a.jsx(oe,{paragraphTag:"div",content:e,className:me,components:s}),footerRender:l=({message:e})=>{if(e.error)return a.jsx("div",{children:a.jsx(oe,{content:e.error,components:s})})}}=i,{layout:r,setVisible:d,setLayout:C,onCallAI:$,activeConversationKey:ie,setActiveConversationKey:re,conversations:b,fetchConversationsLoading:H,ephemeralSystemPrompts:R,clientTools:k}=qe(),{t:g}=Z("ai"),{t:O}=Z("common"),{styles:f}=et(),A=e=>({key:e.id,label:e.title,group:D(e.start_time).isSame(D(),"day")?g("chat.today"):D(e.start_time).format("YYYY-MM-DD")}),{conversations:K,activeConversationKey:u,setActiveConversationKey:F,addConversation:le,setConversations:ce,getConversation:L,setConversation:j,removeConversation:de,getMessages:ue}=Xe({defaultActiveConversationKey:ie,defaultConversations:(b==null?void 0:b.map(e=>A(e)))||[]});p.useEffect(()=>{re(u)},[u]);const[me]=it(),[J,ge]=V.useMessage(),[Y,G]=p.useState(""),[N,E]=p.useState([]),{data:pe}=y(()=>v.system.listSkillDomains()),fe=(pe??[]).map(e=>({skillType:"domain",value:e,label:a.jsxs(a.Fragment,{children:[a.jsx(ee,{children:g("chat.skillDomain",{defaultValue:"Skill domain"})}),e]})})),{data:M}=y(()=>v.system.listSkills({current:1,page_size:500})),he=((M==null?void 0:M.data)??[]).map(e=>({skillType:"skill",value:e.id,label:a.jsxs(a.Fragment,{children:[a.jsx(ee,{children:g("chat.skill",{defaultValue:"Skill"})}),e.name]})})),[S,W]=p.useState(),{onRequest:T,messages:m,isRequesting:P,abort:be,onReload:xe,setMessages:ye,setMessage:ve}=He({provider:nt(u),conversationKey:u,defaultMessages:[],requestPlaceholder:()=>({content:O("loading"),role:"assistant"}),requestFallback:(e,{error:t})=>st(t)?{content:"",role:"assistant"}:t instanceof tt?{content:t.buffer.join(""),role:"assistant",error:t.message}:{content:`${t}`,role:"assistant"}}),w=p.useCallback(()=>{const e={};return R.length>0&&(e.ephemeral_system_prompts=R),k.length>0&&(e.client_tools=k.map(t=>({name:t.name,description:t.description,parameters:t.parameters}))),e},[R,k]),B=p.useRef(null),U=p.useCallback(async e=>{const t=[];for(const n of e){const c=k.find(h=>h.name===n.name);if(!c){t.push({tool_call_id:n.id,content:JSON.stringify({error:`Client tool handler not found for ${n.name}`})});continue}try{const h=await Promise.resolve(c.handler(n.arguments));t.push({tool_call_id:n.id,content:h})}catch(h){t.push({tool_call_id:n.id,content:JSON.stringify({error:(h==null?void 0:h.message)||String(h)})})}}T({content:"",client_tool_results:t,...w()})},[k,T,w]);p.useEffect(()=>{var e,t;if(!P&&m&&m.length>0){const n=m[m.length-1];if((t=(e=n==null?void 0:n.message)==null?void 0:e.pendingClientToolCalls)!=null&&t.length){const c=n.message.pendingClientToolCalls;B.current!==c&&(B.current=c,U(c))}else B.current=null}},[P,m,U]);const Ce=e=>{if(e){if(!u){x(e);return}T({content:e,domains:N.filter(t=>t.type==="domain").map(t=>t.value),skill_ids:N.filter(t=>t.type==="skill").map(t=>t.value),...w()})}},{run:ke,loading:je}=y(async e=>await v.ai.getChatSession({sessionId:e}),{manual:!0,onError:()=>{V.error(g("chat.fetchConversationFailed",{defaultValue:"Failed to fetch conversation"}))},onSuccess:e=>{if(m&&m.length>0&&(m[m.length-1].status==="loading"||m.length>e.messages.length))return;const t=[];let n={id:"",message:{content:"",role:"assistant"},status:"success"};for(const c of e.messages)switch(c.role){case"assistant":n.status=c.status==="completed"&&n.status==="success"?"success":"error",n.message.role="assistant",n.id!==c.id&&c.content&&(n.message.content=c.content),n.id=c.id;break;case"user":n.message.content.length>0&&(t.push({id:n.id,message:{content:n.message.content,role:n.message.role},status:n.status}),n={id:"",message:{content:"",role:"assistant"},status:"success"}),t.push({id:c.id,message:{content:c.content,role:c.role},status:c.status==="completed"?"success":"error"});break}n.message.content.length>0&&t.push({id:n.id,message:{content:n.message.content,role:n.message.role},status:n.status}),ye(t)}}),{run:x,loading:z}=y(async(e,t,n=!1)=>await v.ai.createChatSession({title:g("chat.defaultConversationTitle"),model_id:"",messages:t||[],anonymous:n}),{manual:!0,onError:()=>{V.error(g("chat.createConversationFailed",{defaultValue:"Failed to create conversation"}))},onSuccess:(e,[t])=>{le(A(e),"prepend"),F(e.id),t&&W({message:t,sessionId:e.id})}});p.useEffect(()=>{ce((b==null?void 0:b.map(e=>A(e)))||[])},[b]);const{run:Se}=y(async e=>await v.ai.deleteChatSession({sessionId:e}),{manual:!0,onError(e,[t]){J.error(g("chat.deleteConversationFailed",{defaultValue:"Failed to delete conversation"}));const n=L(t);n&&j(t,{...n,loading:!1})},onSuccess(e,[t]){de(t)}}),{run:we}=y(async e=>v.ai.generateChatSessionTitle({sessionId:e},{title:""}),{manual:!0,onSuccess:({title:e},[t])=>{const n=L(t);n&&j(t,{...n,title:e,loading:!1})},onError:(e,[t])=>{J.error(g("chat.titleGenerationFailed",{defaultValue:"Failed to generate title: {{error}}",error:e.message||e}));const n=L(t);n&&j(t,{...n,loading:!1})}});p.useEffect(()=>{if(u&&(S==null?void 0:S.sessionId)===u){const e=S.message;setTimeout(()=>{T({content:e,...w()})},1e3),W(void 0)}},[u,S,w]),p.useEffect(()=>{if(u){const e=ue(u);if(e&&e.length>0)return;ke(u)}},[u]),p.useEffect(()=>{$&&x&&$((e,t)=>{x(e,t,!0)})},[x,$]);const _e=a.jsxs("div",{className:f.sider,children:[a.jsx(I,{onClick:()=>{x()},type:"link",className:f.addBtn,icon:a.jsx(te,{}),loading:z,children:g("chat.newConversation",{defaultValue:"New Conversation"})}),a.jsx(_,{spinning:H,wrapperClassName:f.conversationsSpin,children:a.jsx(Oe,{items:K,activeKey:u,onActiveChange:async e=>{e&&F(e)},className:f.conversations,groupable:!0,styles:{item:{padding:"0 8px"}},menu:e=>({items:[{label:g("chat.regenerateTitle"),key:"regenerateTitle",icon:a.jsx(Ne,{}),onClick:()=>{j(e.key,{...e,loading:!0}),we(e.key)}},{label:O("delete"),key:"delete",icon:a.jsx(Ee,{}),danger:!0,onClick:()=>{j(e.key,{...e,loading:!0}),Se(e.key)}}]})})})]}),Te=m==null?void 0:m.map(e=>({...e.message,key:e.id,contentRender:o,footer:l==null?void 0:l(e)})).filter(e=>e.content),Ie=a.jsx("div",{className:f.chatList,children:a.jsx(_,{spinning:je||z,children:a.jsx(Ke.List,{items:Te,style:{height:"100%",paddingInline:r==="classic"?"calc(calc(100% - 700px) /2)":"20px"},roles:{assistant:{placement:"start",loadingRender:()=>a.jsx(_,{size:"small"})},user:{placement:"end"}},role:{assistant:{placement:"start",loadingRender:()=>a.jsx(_,{size:"small"})},user:{placement:"end"}}})})}),$e=a.jsx(a.Fragment,{children:a.jsxs(se,{direction:"vertical",style:{width:"100%",maxWidth:700,margin:"0 auto"},children:[a.jsx(Me,{mode:"multiple",allowClear:!0,placeholder:g("chat.skillsPlaceholder",{defaultValue:"Skills (optional)"}),value:N.map(e=>e.value),onChange:(e,t)=>{Ze(t)?E(t.map(n=>({type:n.skillType,value:n.value}))):E(t?[{type:t.skillType,value:t.value}]:[])},options:[...fe,...he],className:ae(f.skillsSelect,"chat-skills-select")}),a.jsx(Je,{value:Y,onSubmit:async()=>{Ce(Y.trim()),G("")},onChange:G,onCancel:()=>{be()},loading:P,className:ae(f.sender,"chat-sender"),placeholder:g("chat.inputPlaceholder")})]})});return a.jsxs(Ye,{children:[ge,a.jsxs(rt.Provider,{value:{onReload:xe,setMessage:ve},children:[a.jsxs("div",{style:{height:"50px",width:"100%",position:"relative"},children:[a.jsx(Pe.Group,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},options:[{label:a.jsx(Be,{}),value:"classic"},{label:a.jsx(ne,{}),value:"sidebar"},{label:a.jsx(ne,{}),value:"float-sidebar"}],optionType:"button",onChange:e=>C(e.target.value),value:r}),a.jsxs(se,{style:{float:"right",marginTop:10},children:[a.jsx(I,{type:"primary",onClick:()=>{x()},loading:z,icon:a.jsx(te,{}),style:{display:r==="classic"?"none":"block"}}),a.jsx(ze,{menu:{items:K.map(e=>({label:e.label,key:e.key})),onClick:({key:e})=>{F(e)}},placement:"bottomRight",children:a.jsx(I,{icon:H?a.jsx(_,{size:"small"}):a.jsx(Ve,{}),style:{display:r==="classic"?"none":"block"}})}),a.jsx(I,{type:"text",onClick:()=>d(!1),children:a.jsx(De,{})})]})]}),a.jsxs("div",{className:r==="classic"?f.classicLayout:f.siderLayout,style:{minWidth:r==="classic"?"500px":"400px"},children:[r==="classic"?_e:null,a.jsxs("div",{className:f.chat,children:[Ie,$e]})]})]})]})};export{$t as AIChat,$t as default,it as useMarkdownTheme};
