"use strict";const e=require("./vendor.js"),G=require("react-router-dom"),A=require("./contexts.js"),N=require("./base.js"),n=require("antd"),S=require("react-i18next"),P=require("antd-style"),w=require("@ant-design/icons"),p=require("react"),b=require("./index.js"),k=require("ahooks"),z=require("classnames"),ve=require("react-dom"),X=require("./client.js"),Se=require("antd-img-crop"),Te=require("react-infinite-scroll-component"),Ce=require("lodash-es");function ke(t){const s=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const o in t)if(o!=="default"){const r=Object.getOwnPropertyDescriptor(t,o);Object.defineProperty(s,o,r.get?r:{enumerable:!0,get:()=>t[o]})}}return s.default=t,Object.freeze(s)}const Ie=ke(w),U=({style:t,size:s="large"})=>e.jsxRuntimeExports.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100%",...t},children:e.jsxRuntimeExports.jsx(n.Spin,{size:s})}),Le=({element:t,requiredPermission:s,requiredPermissions:o})=>{const{t:r}=S.useTranslation(),{user:i,loading:a,error:l}=A.useAuth(),{hasPermission:u,hasAllPermissions:x}=A.usePermission();return a?e.jsxRuntimeExports.jsx(U,{}):l?l.code==="E4011"?e.jsxRuntimeExports.jsx(U,{}):e.jsxRuntimeExports.jsx(n.Result,{status:"500",title:"500",subTitle:r("login.fetchCurrentUserError",{defaultValue:"Failed to fetch current user: {{error}}",error:(l==null?void 0:l.message)||l})}):i?s&&!u(s)?e.jsxRuntimeExports.jsx(G.Navigate,{to:"/forbidden",replace:!0}):o&&!x(o)?e.jsxRuntimeExports.jsx(G.Navigate,{to:"/forbidden",replace:!0}):t:(window.location.href=N.getURL("/login?redirect="+encodeURIComponent(window.location.href)),null)},Fe=P.createStyles(({token:t,css:s})=>({container:s`
      ${s`
        @media screen and (max-width: ${t.screenXS}px) {
          width: 100% !important;
          > * {
            border-radius: 0 !important;
          }
        }
      `}
    > *{
      background-color: ${t.colorBgElevated};
      border-radius: 4px;
      box-shadow: ${t.boxShadowTertiary};
    }
    `,iconStyle:{cursor:"pointer",padding:"12px",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:18,verticalAlign:"middle","&:hover":{color:t.colorPrimaryTextHover}}})),O=({overlayClassName:t,overlay:s,hidden:o,children:r,...i})=>{const{styles:a}=Fe();return o?e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{}):e.jsxRuntimeExports.jsx(n.Dropdown,{popupRender:s,overlayClassName:z(a.container,t),...i,children:e.jsxRuntimeExports.jsx("span",{className:a.iconStyle,children:r})})},Ae=()=>e.jsxRuntimeExports.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",children:[e.jsxRuntimeExports.jsx("path",{d:"M0 0h24v24H0z",fill:"none"}),e.jsxRuntimeExports.jsx("path",{d:"M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",className:"css-c4d79v"})]}),ze=P.createStyles(()=>({menuItemStyle:{minWidth:"160px"},menuItemIconStyle:{marginRight:"8px"}})),ce=[{lang:"en-US",label:"English",icon:"🇺🇸"},{lang:"sv-SE",label:"Svenska",icon:"🇸🇪"},{lang:"ar-AE",label:"العربية",icon:"🇦🇪"},{lang:"de-DE",label:"Deutsch",icon:"🇩🇪"},{lang:"es-ES",label:"Español",icon:"🇪🇸"},{lang:"fr-FR",label:"Français",icon:"🇫🇷"},{lang:"zh-CN",label:"中文",icon:"🇨🇳"}],Pe=({transformLangConfig:t=o=>o,className:s})=>{const{i18n:o}=S.useTranslation(),{styles:r}=ze(),i=l=>{o.changeLanguage(l)},a={selectedKeys:[o.language],onClick:l=>{i(l.key)},items:t(ce).map(l=>({key:l.lang,className:r.menuItemStyle,label:e.jsxRuntimeExports.jsxs(e.jsxRuntimeExports.Fragment,{children:[e.jsxRuntimeExports.jsx("span",{role:"img","aria-label":(l==null?void 0:l.label)||"en-US",className:r.menuItemIconStyle,children:(l==null?void 0:l.icon)||"🌐"}),(l==null?void 0:l.label)||"en-US"]})}))};return e.jsxRuntimeExports.jsx(O,{className:s,menu:a,children:e.jsxRuntimeExports.jsx(Ae,{})})},Ve=P.createStyles(({css:t})=>({avatarItem:t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `})),te=t=>Ce.isString(t)&&t.match(/^[-_a-zA-Z0-9]+$/)?X.baseURL.endsWith("/")?X.baseURL+`files/${t}`:X.baseURL+`/files/${t}`:t,Me=({src:t,fallback:s,...o})=>e.jsxRuntimeExports.jsx(n.Avatar,{src:te(t),icon:s,...o}),De=({onChange:t,shape:s="square"})=>{const[o,r]=p.useState([]),{styles:i}=Ve(),[a,l]=p.useState(!1),[u,x]=p.useState(!0),[d,j]=p.useState(0),{run:m,loading:h}=k.useRequest(()=>b.api.base.listFiles({current:d+1,page_size:40,file_type:"avatar",access:"public",search:""}),{manual:!0,onSuccess:({data:f})=>{console.log(f),r([...o,...f]),x(f.length===40),j(d+1)}}),c=()=>{x(!0),j(0),r([])};return e.jsxRuntimeExports.jsx(n.Popover,{style:{zIndex:1e3},onOpenChange:f=>{l(f),f?m():c()},open:a,content:e.jsxRuntimeExports.jsx("div",{style:{width:360,height:200},children:e.jsxRuntimeExports.jsx("div",{id:"iconsScrollableDiv",style:{height:"100%",overflow:"auto"},children:e.jsxRuntimeExports.jsx(Te,{dataLength:o.length,next:()=>{m()},hasMore:u,loader:e.jsxRuntimeExports.jsx(n.Skeleton,{avatar:!0,paragraph:{rows:1},active:!0}),endMessage:e.jsxRuntimeExports.jsx(n.Divider,{plain:!0,children:"End"}),scrollableTarget:"iconsScrollableDiv",children:e.jsxRuntimeExports.jsx(n.List,{grid:{gutter:16,column:8},dataSource:o,style:{margin:"0 8px"},loading:h,renderItem:({id:f})=>e.jsxRuntimeExports.jsx("div",{className:i.avatarItem,onClick:T=>{T.stopPropagation(),t==null||t(f),l(!1),c()},children:e.jsxRuntimeExports.jsx(n.Image,{src:te(f),placeholder:e.jsxRuntimeExports.jsx(n.Spin,{size:"default"}),preview:!1})})})})})}),placement:"bottom",trigger:"hover",children:e.jsxRuntimeExports.jsx(w.UploadOutlined,{shape:s,style:{width:112,height:112,placeContent:"center"}})})},de=({value:t,onChange:s,shape:o,...r})=>{const[i,a]=p.useState(void 0),[l,u]=p.useState(!1),[x,d]=p.useState(void 0),j=async m=>{u(!0),d(m.url??m.preview)};return p.useEffect(()=>{a(t?{uid:t,name:t,url:te(t)}:void 0)},[t]),e.jsxRuntimeExports.jsxs(e.jsxRuntimeExports.Fragment,{children:[e.jsxRuntimeExports.jsx(Se,{beforeCrop:async m=>{if(m.type==="image/svg+xml"){const h=await b.api.base.uploadFile({type:"avatar"},m);return h.length>0&&(s==null||s(h[0].id)),!1}return!0},children:e.jsxRuntimeExports.jsx(n.Upload,{customRequest:async m=>{var c,f;const h=await b.api.base.uploadFile({type:"avatar",access:"public"},m.file);h.length>0?((c=m.onSuccess)==null||c.call(m,h[0].id),s==null||s(h[0].id)):(f=m.onError)==null||f.call(m,new Error("Upload file failed"))},listType:"picture-card",onPreview:j,maxCount:1,onChange:({file:m})=>{switch(m.status){case"removed":s==null||s(void 0);break;case"done":break;default:a(m);break}},fileList:i?[i]:[],...r,children:i?void 0:e.jsxRuntimeExports.jsx(De,{shape:o,onChange:s})})}),e.jsxRuntimeExports.jsx(n.Modal,{open:l,footer:null,onCancel:()=>u(!1),children:e.jsxRuntimeExports.jsx("img",{style:{width:"100%"},src:x})})]})},_e=({className:t})=>{const{t:s}=S.useTranslation("common"),{user:o}=A.useAuth(),{currentOrgId:r,setCurrentOrgId:i}=A.useSite(),a=(o==null?void 0:o.organizations)||[],l=j=>{i(j),window.location.reload()};if(a.length===0)return null;const u=a.find(j=>j.id===r),x=u?u.name:s("organization.global",{defaultValue:"Global"}),d=[...a.map(j=>({key:j.id,label:e.jsxRuntimeExports.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxRuntimeExports.jsx("span",{children:j.name}),r===j.id&&e.jsxRuntimeExports.jsx(w.CheckOutlined,{})]}),onClick:()=>l(j.id)}))];return e.jsxRuntimeExports.jsxs(O,{className:t,menu:{items:d,selectedKeys:r?[r]:[""]},children:[e.jsxRuntimeExports.jsx(w.TeamOutlined,{style:{marginRight:4}}),e.jsxRuntimeExports.jsx("span",{style:{height:"1em",lineHeight:"1em",marginLeft:"5px"},children:x})]})},Ne={pending:"default",running:"processing",success:"success",failed:"error",cancelled:"default"},Be=({className:t})=>{const{t:s}=S.useTranslation("task"),o=G.useNavigate(),{user:r}=A.useAuth$1(),{tasksDropdownOpen:i,setTasksDropdownOpen:a,tasks:l,setTasks:u}=A.useSite(),{runAsync:x,loading:d}=k.useRequest(async()=>b.api.tasks.listUserTasks({}),{onSuccess:h=>{N.isUnorderedEqual(l,h,(c,f)=>c.id===f.id&&c.status===f.status&&c.progress===f.progress)||u(h)},pollingInterval:i?3e3:6e4,ready:!!r,refreshDeps:[r]});p.useEffect(()=>{i&&x()},[i]);const j=async h=>{const c=await b.api.base.downloadFile({fileKey:h},{params:{method:"sign"}}),f=`/api/files/${h}?signature=${c.signature}&expires=${c.expires}`;window.open(f,"_blank")},m=()=>e.jsxRuntimeExports.jsxs("div",{style:{width:520,maxHeight:500,overflow:"auto",padding:8},children:[e.jsxRuntimeExports.jsx(n.List,{size:"small",dataSource:l,loading:d,renderItem:h=>e.jsxRuntimeExports.jsx(n.List.Item,{extra:e.jsxRuntimeExports.jsx(n.Tag,{color:Ne[h.status],style:{marginLeft:6},children:s(`status.${h.status}`,{defaultValue:h.status})}),actions:[h.artifact_file_key&&e.jsxRuntimeExports.jsx(n.Button,{type:"text",size:"small",icon:e.jsxRuntimeExports.jsx(w.DownloadOutlined,{}),onClick:()=>j(h.artifact_file_key)})].filter(Boolean),children:e.jsxRuntimeExports.jsx(n.List.Item.Meta,{title:e.jsxRuntimeExports.jsx("span",{style:{fontSize:13},children:e.jsxRuntimeExports.jsxs(n.Typography.Text,{ellipsis:{tooltip:!0},children:[s(`type.${h.type}`,{defaultValue:h.type})," ",h.artifact_file_name&&`- ${h.artifact_file_name}`]})}),description:(h.status==="running"||h.status==="pending")&&e.jsxRuntimeExports.jsx(n.Progress,{percent:h.progress??0,size:"small",style:{marginTop:4}})})},h.id)}),e.jsxRuntimeExports.jsx("div",{style:{borderTop:"1px solid #f0f0f0",paddingTop:8,marginTop:8,textAlign:"center"},children:e.jsxRuntimeExports.jsx(n.Button,{type:"link",size:"small",onClick:()=>o("/tasks"),children:s("more",{defaultValue:"More"})})})]});return!l||l.length===0?null:e.jsxRuntimeExports.jsxs(O,{className:t,overlay:m,placement:"bottomRight",open:i,onOpenChange:a,children:[e.jsxRuntimeExports.jsx(w.UnorderedListOutlined,{style:{marginRight:4}}),e.jsxRuntimeExports.jsx("span",{style:{height:"1em",lineHeight:"1em",marginLeft:2},children:s("tasks",{defaultValue:"Tasks"})})]})},Oe=20,qe=({className:t})=>{const{t:s}=S.useTranslation("inbox"),o=G.useNavigate(),{user:r}=A.useAuth(),{inboxUnreadCount:i,inboxRevision:a,setInboxUnreadCount:l,bumpInboxRevision:u}=A.useSite(),[x,d]=p.useState(!1),{data:j=[],loading:m,run:h}=k.useRequest(async()=>(await b.api.inbox.listInboxMessages({current:1,page_size:Oe})).data??[],{ready:!!r,refreshDeps:[r==null?void 0:r.id,a]}),c=async v=>{await b.api.inbox.markInboxMessageRead({id:v}),u(),h()},f=async()=>{await b.api.inbox.markAllInboxMessagesRead(),l(0),u(),h()},T=()=>e.jsxRuntimeExports.jsxs("div",{style:{width:420,maxHeight:500,overflow:"auto",padding:8},children:[e.jsxRuntimeExports.jsx(n.List,{size:"small",dataSource:j,loading:m,locale:{emptyText:s("empty",{defaultValue:"No messages"})},renderItem:v=>{const E=N.isInboxUnread(v);return e.jsxRuntimeExports.jsx(n.List.Item,{style:{cursor:E?"pointer":"default"},onClick:()=>{E&&c(v.id)},children:e.jsxRuntimeExports.jsx(n.List.Item.Meta,{title:e.jsxRuntimeExports.jsx(n.Typography.Text,{strong:E,ellipsis:{tooltip:!0},children:N.inboxMessageTitle(s,v)}),description:e.jsxRuntimeExports.jsxs(n.Space,{direction:"vertical",size:0,style:{width:"100%"},children:[e.jsxRuntimeExports.jsx(n.Typography.Text,{type:"secondary",ellipsis:{tooltip:!0},children:N.inboxMessageDescription(s,v)}),e.jsxRuntimeExports.jsx(n.Typography.Text,{type:"secondary",style:{fontSize:12},children:v.created_at?new Date(v.created_at).toLocaleString():""})]})})},v.id)}}),e.jsxRuntimeExports.jsxs("div",{style:{borderTop:"1px solid #f0f0f0",paddingTop:8,marginTop:8,display:"flex",justifyContent:"space-between"},children:[e.jsxRuntimeExports.jsx(n.Button,{type:"link",size:"small",disabled:i<=0,onClick:()=>void f(),children:s("markAllRead",{defaultValue:"Mark all as read"})}),e.jsxRuntimeExports.jsx(n.Button,{type:"link",size:"small",onClick:()=>{d(!1),o("/inbox")},children:s("viewAll",{defaultValue:"View all"})})]})]});return e.jsxRuntimeExports.jsx(O,{className:t,overlay:T,placement:"bottomRight",open:x,onOpenChange:d,children:e.jsxRuntimeExports.jsx(n.Badge,{count:i,size:"small",overflowCount:99,children:e.jsxRuntimeExports.jsx(w.BellOutlined,{style:{marginRight:4,height:18,width:18,fontSize:18}})})})},$e=P.createStyles(({token:t,css:s})=>({root:s`
    width: 8px;
    align-self: stretch;
    cursor: col-resize;
    position: relative;
    flex-shrink: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${t.colorBorder};
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${t.colorFill};
    }
  `,dragging:s`
    background-color: ${t.colorPrimary};
    transition: none;

    &:hover {
      background-color: ${t.colorPrimary};
    }
  `,grip:s`
    width: 3px;
    height: 40px;
    border-radius: 2px;
    background-color: ${t.colorTextQuaternary};
    opacity: 0.85;
    transition: opacity 0.2s ease, background-color 0.2s ease;
    pointer-events: none;
  `,gripHover:s`
    background-color: ${t.colorBgContainer};
    opacity: 1;
  `,gripDragging:s`
    background-color: ${t.colorTextLightSolid};
    opacity: 1;
  `})),He=({onResize:t,minWidth:s=300,maxWidth:o=window.innerWidth*.5})=>{const{styles:r}=$e(),[i,a]=p.useState(!1),[l,u]=p.useState(!1),x=p.useCallback(m=>{m.preventDefault(),a(!0)},[]),d=p.useCallback(m=>{if(!i)return;const h=window.innerWidth-m.clientX,c=Math.max(s,Math.min(o,h));t(c)},[i,s,o,t]),j=p.useCallback(()=>{a(!1)},[]);return p.useEffect(()=>{if(i)return document.addEventListener("mousemove",d),document.addEventListener("mouseup",j),document.body.style.cursor="col-resize",document.body.style.userSelect="none",()=>{document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",j),document.body.style.cursor="",document.body.style.userSelect=""}},[i,d,j]),e.jsxRuntimeExports.jsx("div",{onMouseDown:x,onMouseEnter:()=>u(!0),onMouseLeave:()=>u(!1),className:z(r.root,i&&r.dragging),children:e.jsxRuntimeExports.jsx("div",{className:z(r.grip,l&&r.gripHover,i&&r.gripDragging)})})},B=40,Ue=28,We=6,xe="ai-chat-float-pos",Je=P.createStyles(({token:t,css:s})=>({root:s`
    position: fixed;
    z-index: 1050;
    width: ${B}px;
    height: ${B}px;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
    touch-action: none;
    user-select: none;
    cursor: grab;
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      background: transparent;
      outline: none;
      box-shadow: none;
    }

    &:active {
      cursor: grabbing;
    }
  `,dragging:s`
    transition: none;
    cursor: grabbing;
    z-index: 1100;
  `,docked:s`
    &:hover,
    &:focus-visible {
      transform: translate(0, 0) rotate(0deg) !important;
    }
  `,dockLeft:s`
    transform: translateX(calc(-30% - 2px)) rotate(32deg);
  `,dockRight:s`
    transform: translateX(calc(30% + 2px)) rotate(-32deg);
  `,dockTop:s`
    transform: translateY(calc(-40% - 2px)) rotate(180deg);
  `,dockBottom:s`
    transform: translateY(calc(30% + 2px)) rotate(0deg);
  `,body:s`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(145deg, ${t.colorPrimaryHover}, ${t.colorPrimary});
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.35);
    overflow: visible;

    &:hover {
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.22), 0 3px 8px rgba(0, 0, 0, 0.12);
    }
  `,robot:s`
    width: 32px;
    height: 32px;
    display: block;
    padding-bottom: 5px;
    overflow: visible;
  `,eye:s`
    transform-box: fill-box;
    transform-origin: center;
    animation: ai-robot-blink 4.2s infinite;

    &:nth-of-type(2) {
      animation-delay: 0.12s;
    }

    @keyframes ai-robot-blink {
      0%,
      42%,
      48%,
      100% {
        transform: scaleY(1);
      }
      45% {
        transform: scaleY(0.08);
      }
    }
  `}));function F(t,s,o){return Math.min(Math.max(t,s),o)}function V(){return Math.max(0,window.innerWidth-B)}function M(){return Math.max(0,window.innerHeight-B)}function Z(){const t=V(),s=M();return{rx:t>0?F((t-24)/t,0,1):1,ry:s>0?F((s-24)/s,0,1):1,edge:null}}function me(t,s,o){let r=F(t,0,V()),i=F(s,0,M());return o==="left"&&(r=0),o==="right"&&(r=V()),o==="top"&&(i=0),o==="bottom"&&(i=M()),{x:r,y:i,edge:o}}function pe(t){const s=V(),o=M();return{rx:s>0?F(t.x/s,0,1):0,ry:o>0?F(t.y/o,0,1):0,edge:t.edge}}function ie(t){return me(t.rx*V(),t.ry*M(),t.edge)}function Ye(){try{const t=localStorage.getItem(xe);if(!t)return Z();const s=JSON.parse(t);return typeof s.rx=="number"&&typeof s.ry=="number"?{rx:F(s.rx,0,1),ry:F(s.ry,0,1),edge:s.edge??null}:typeof s.x=="number"&&typeof s.y=="number"?pe({x:F(s.x,0,V()),y:F(s.y,0,M()),edge:s.edge??null}):Z()}catch{return Z()}}function oe(t){localStorage.setItem(xe,JSON.stringify(t))}function Xe(t,s){const o=t,r=window.innerWidth-(t+B),i=s,a=window.innerHeight-(s+B),l=Math.min(o,r,i,a);return l>Ue?null:l===o?"left":l===r?"right":l===i?"top":"bottom"}const Ge=({className:t,eyeClassName:s})=>e.jsxRuntimeExports.jsxs("svg",{className:t,viewBox:"0 0 64 64","aria-hidden":!0,children:[e.jsxRuntimeExports.jsx("circle",{cx:"32",cy:"12",r:"3.2",fill:"rgba(255,255,255,0.9)"}),e.jsxRuntimeExports.jsx("rect",{x:"30.4",y:"14",width:"3.2",height:"7",rx:"1.4",fill:"rgba(255,255,255,0.85)"}),e.jsxRuntimeExports.jsx("rect",{x:"10",y:"22",width:"44",height:"34",rx:"14",fill:"rgba(255,255,255,0.95)"}),e.jsxRuntimeExports.jsx("rect",{x:"16",y:"28",width:"32",height:"18",rx:"9",fill:"rgba(0,0,0,0.12)"}),e.jsxRuntimeExports.jsx("ellipse",{className:s,cx:"25",cy:"37",rx:"4.2",ry:"5",fill:"#1f2937"}),e.jsxRuntimeExports.jsx("ellipse",{className:s,cx:"39",cy:"37",rx:"4.2",ry:"5",fill:"#1f2937"}),e.jsxRuntimeExports.jsx("circle",{cx:"26.2",cy:"35.5",r:"1.2",fill:"#fff"}),e.jsxRuntimeExports.jsx("circle",{cx:"40.2",cy:"35.5",r:"1.2",fill:"#fff"}),e.jsxRuntimeExports.jsx("path",{d:"M26 48c2.2 2.4 9.8 2.4 12 0",stroke:"#1f2937",strokeWidth:"2.2",strokeLinecap:"round",fill:"none"}),e.jsxRuntimeExports.jsx("rect",{x:"4",y:"34",width:"7",height:"10",rx:"3.5",fill:"rgba(255,255,255,0.9)"}),e.jsxRuntimeExports.jsx("rect",{x:"53",y:"34",width:"7",height:"10",rx:"3.5",fill:"rgba(255,255,255,0.9)"})]}),Ke=({icon:t})=>{const{styles:s}=Je(),{setVisible:o,visible:r}=A.useAI(),{t:i}=S.useTranslation("ai"),a=p.useRef(typeof window>"u"?{rx:1,ry:1,edge:null}:Ye()),[l,u]=p.useState(()=>typeof window>"u"?{x:0,y:0,edge:null}:ie(a.current)),[x,d]=p.useState(!1),j=p.useRef(null),m=p.useRef(l);m.current=l;const h=!x&&l.edge==="left"?s.dockLeft:!x&&l.edge==="right"?s.dockRight:!x&&l.edge==="top"?s.dockTop:!x&&l.edge==="bottom"?s.dockBottom:void 0,c=p.useCallback(y=>{const g=pe(y);a.current=g,oe(g),u(y)},[]),f=p.useCallback(()=>{j.current||u(ie(a.current))},[]);p.useEffect(()=>(oe(a.current),window.addEventListener("resize",f),()=>window.removeEventListener("resize",f)),[f]);const T=y=>{y.button===0&&(y.currentTarget.setPointerCapture(y.pointerId),j.current={pointerId:y.pointerId,startX:y.clientX,startY:y.clientY,originX:m.current.x,originY:m.current.y,moved:!1},d(!0))},v=y=>{const g=j.current;if(!g||g.pointerId!==y.pointerId)return;const C=y.clientX-g.startX,I=y.clientY-g.startY;!g.moved&&Math.hypot(C,I)>We&&(g.moved=!0),u({x:F(g.originX+C,0,V()),y:F(g.originY+I,0,M()),edge:null})},E=y=>{const g=j.current;if(!g||g.pointerId!==y.pointerId)return;try{y.currentTarget.releasePointerCapture(y.pointerId)}catch{}const C=!g.moved;if(j.current=null,d(!1),C){o(!0);return}const I=Xe(m.current.x,m.current.y);c(me(m.current.x,m.current.y,I))};return r?null:ve.createPortal(e.jsxRuntimeExports.jsx(n.Tooltip,{title:i("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",mouseEnterDelay:.4,open:x?!1:void 0,children:e.jsxRuntimeExports.jsx("button",{type:"button","aria-label":i("chat.openAssistant",{defaultValue:"Open AI Assistant"}),className:z("ai-chat-float-button",s.root,x&&s.dragging,!x&&l.edge&&s.docked,h),style:{left:l.x,top:l.y},onPointerDown:T,onPointerMove:v,onPointerUp:E,onPointerCancel:E,children:t??e.jsxRuntimeExports.jsx("span",{className:s.body,children:e.jsxRuntimeExports.jsx(Ge,{className:s.robot,eyeClassName:s.eye})})})}),document.body)},Qe=({className:t})=>{const{t:s}=S.useTranslation("common"),{themeMode:o,setThemeMode:r}=P.useThemeMode();return e.jsxRuntimeExports.jsx(O,{className:t,menu:{items:[{key:"light",label:e.jsxRuntimeExports.jsxs("span",{children:[e.jsxRuntimeExports.jsx(w.SunOutlined,{})," ",s("light",{defaultValue:"Light Mode"})]})},{key:"dark",label:e.jsxRuntimeExports.jsxs("span",{children:[e.jsxRuntimeExports.jsx(w.MoonOutlined,{})," ",s("dark",{defaultValue:"Dark Mode"})]})}],onClick:({key:i})=>{r(i)},selectedKeys:[o]},children:o==="light"?e.jsxRuntimeExports.jsx(w.SunOutlined,{}):e.jsxRuntimeExports.jsx(w.MoonOutlined,{})},"theme-switch")},se=({permission:t,permissions:s=[],checkAll:o=!1,fallback:r=null,children:i})=>{const{hasPermission:a,hasAnyPermission:l,hasAllPermissions:u,isAdmin:x,loading:d}=A.usePermission();return d?null:x?e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:i}):t?a(t)?e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:i}):e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:r}):s.length>0?(o?u(s):l(s))?e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:i}):e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:r}):e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:i})},Ze=({fallback:t=null,children:s})=>{const{isAdmin:o,loading:r}=A.usePermission();return r?null:o?e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:s}):e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:t})},ae=t=>{const[s,o]=p.useState(!1),{permission:r,icon:i,tooltip:a,onClick:l,confirm:u,label:x,...d}=t,j=!!d.disabled,[m,h]=p.useState(!1),c=l?async()=>{o(!0);try{await l()}finally{o(!1),h(!1)}}:void 0;let f=e.jsxRuntimeExports.jsx(n.Button,{type:"link",size:"small",loading:s,icon:i,onClick:u&&!j?void 0:c,...d,children:x&&e.jsxRuntimeExports.jsx("span",{style:{position:"inherit",top:"-2px"},children:x})});if(u&&!j){const T=async()=>{u.onConfirm?await u.onConfirm():c&&await c()};f=e.jsxRuntimeExports.jsx(n.Popconfirm,{title:u.title,description:u.description,onConfirm:T,okText:u.okText,cancelText:u.cancelText,children:f})}return a&&(f=j?e.jsxRuntimeExports.jsx(n.Tooltip,{title:a,open:m,onOpenChange:h,children:e.jsxRuntimeExports.jsx("span",{style:{display:"inline-block",cursor:"not-allowed"},children:f})}):e.jsxRuntimeExports.jsx(n.Tooltip,{title:a,open:m,onOpenChange:h,children:f})),r&&(f=e.jsxRuntimeExports.jsx(se,{permission:r,children:f})),f},et=({actions:t,maxVisibleItems:s})=>{const{modal:o}=n.App.useApp(),r=t.filter(u=>!u.hidden);if(!s||r.length<=s)return e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:r.map(({key:u,...x})=>e.jsxRuntimeExports.jsx(ae,{...x},u))});const i=r.slice(0,s-1),l=r.slice(s-1).map(u=>{const{key:x,label:d,icon:j,permission:m,onClick:h,confirm:c,disabled:f,tooltip:T}=u,E={key:x,label:d,icon:j,disabled:f,onClick:async()=>{c?o.confirm({title:c.title,content:c.description,onOk:c.onConfirm||h,okText:c.okText,cancelText:c.cancelText}):h&&await h()}};return m?{...E,label:e.jsxRuntimeExports.jsx(se,{permission:m,children:e.jsxRuntimeExports.jsx("span",{children:d??T})})}:E});return e.jsxRuntimeExports.jsxs(e.jsxRuntimeExports.Fragment,{children:[i.map(({key:u,...x})=>e.jsxRuntimeExports.jsx(ae,{...x},u)),e.jsxRuntimeExports.jsx(n.Dropdown,{menu:{items:l},trigger:["click"],children:e.jsxRuntimeExports.jsx(n.Button,{type:"text",size:"small",icon:e.jsxRuntimeExports.jsx(w.MoreOutlined,{})})})]})},tt=Ie,he=t=>tt[t],st=({iconName:t})=>{if(!t)return null;const s=he(t);return s?e.jsxRuntimeExports.jsx(p.Suspense,{fallback:null,children:e.jsxRuntimeExports.jsx(s,{})}):null},nt=({onChange:t})=>{const[s,o]=p.useState(""),[r,i]=p.useState("");return e.jsxRuntimeExports.jsxs(n.Space.Compact,{children:[e.jsxRuntimeExports.jsx(n.Input,{style:{width:"calc(100% - 80px)"},value:s,onChange:a=>o(a.target.value)}),e.jsxRuntimeExports.jsx(n.Input,{style:{width:"40px"},readOnly:!0,value:"=",tabIndex:-1}),e.jsxRuntimeExports.jsx(n.Input,{style:{width:"calc(100% - 80px)"},value:r,onChange:a=>i(a.target.value)}),e.jsxRuntimeExports.jsx(n.Button,{type:"primary",icon:e.jsxRuntimeExports.jsx(w.PlusOutlined,{}),onClick:()=>{t(s,r)}})]})},rt=({request:t,tableRef:s,...o},r)=>{const[i,a]=p.useState({current:1,pageSize:10}),[l,u]=p.useState(0),{data:x,loading:d,refresh:j}=k.useRequest(async()=>{const m=await t({current:i.current,page_size:i.pageSize});return u(m.total),m.data},{refreshDeps:[i]});return p.useImperativeHandle(r,()=>({reload:()=>{j()}})),e.jsxRuntimeExports.jsx(n.Table,{rowKey:"id",loading:d,dataSource:x??[],pagination:{...i,total:l,onChange:(m,h)=>{a({current:m,pageSize:h})}},...o,ref:s})},it=({actionRef:t,...s})=>{const[o,r]=p.useState();return p.useEffect(()=>{r(p.forwardRef(rt))},[]),o?e.jsxRuntimeExports.jsx(o,{...s,ref:t}):null},ot=p.lazy(()=>Promise.resolve().then(()=>require("./json-schema-config-form.js")).then(t=>({default:t.JsonSchemaConfigForm}))),at=p.lazy(()=>Promise.resolve().then(()=>require("./json-schema-config-form.js")).then(t=>({default:t.JsonSchemaConfigFormItem})));function lt(t){return e.jsxRuntimeExports.jsx(p.Suspense,{fallback:e.jsxRuntimeExports.jsx(U,{style:{minHeight:"200px",height:"calc(100vh - 800px)"}}),children:e.jsxRuntimeExports.jsx(ot,{...t})})}function ut(t){return e.jsxRuntimeExports.jsx(p.Suspense,{fallback:e.jsxRuntimeExports.jsx(U,{style:{minHeight:"200px",height:"calc(100vh - 800px)"}}),children:e.jsxRuntimeExports.jsx(at,{...t})})}const ct=({className:t,onSuccess:s,token:o})=>{const{message:r}=n.App.useApp(),{t:i}=S.useTranslation("authorization"),{t:a}=S.useTranslation("common"),[l]=n.Form.useForm(),{run:u,loading:x}=k.useRequest(async d=>b.api.authorization.changePassword(d,o?{headers:{Authorization:`Bearer ${o}`}}:{}),{manual:!0,onSuccess:()=>{r.success(i("user.passwordChanged")),l.resetFields(),s==null||s()},onError:d=>{if(d instanceof X.ApiError){const j=d.code??"normal";r.error(i(`user.passwordChangeFailed.${j}`,{error:d.message,defaultValue:"Password change failed: {{error}}"}))}else r.error(i("user.passwordChangeFailed.normal",{error:d.message,defaultValue:"Password change failed: {{error}}"}));console.error("Failed to change password:",d)}});return e.jsxRuntimeExports.jsxs(n.Form,{form:l,layout:"vertical",onFinish:u,style:{maxWidth:500,margin:"0 auto"},className:z("profile-password",t),children:[e.jsxRuntimeExports.jsx(n.Form.Item,{name:"old_password",label:i("user.oldPassword"),rules:[{required:!0,message:i("validation.oldPasswordRequired")}],className:z("profile-password-item","profile-password-item-old-password"),children:e.jsxRuntimeExports.jsx(n.Input.Password,{})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"new_password",label:i("user.newPassword"),rules:[{required:!0,message:i("validation.newPasswordRequired")},{min:8,message:i("validation.passwordMinLength")}],className:z("profile-password-item","profile-password-item-new-password"),children:e.jsxRuntimeExports.jsx(n.Input.Password,{})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"confirm_password",label:i("user.confirmPassword"),className:z("profile-password-item","profile-password-item-confirm-password"),rules:[{required:!0,message:i("validation.confirmPasswordRequired")},({getFieldValue:d})=>({validator(j,m){return!m||d("new_password")===m?Promise.resolve():Promise.reject(new Error(i("validation.passwordMismatch")))}})],children:e.jsxRuntimeExports.jsx(n.Input.Password,{})}),e.jsxRuntimeExports.jsx(n.Form.Item,{className:z("profile-password-item","profile-password-item-submit"),children:e.jsxRuntimeExports.jsx(n.Button,{type:"primary",htmlType:"submit",loading:x,children:a("save")})})]})},dt=({user:t,onSuccess:s})=>{const{message:o}=n.App.useApp(),{t:r}=S.useTranslation("authorization"),{t:i}=S.useTranslation("common"),[a]=n.Form.useForm(),[l,u]=p.useState(!1);p.useEffect(()=>{t&&a.setFieldsValue({username:t.username,email:t.email,full_name:t.full_name,phone:t.phone||"",avatar:t.avatar})},[t,a]);const x=async d=>{try{u(!0),await b.api.authorization.updateCurrentUser(d),o.success(i("updateSuccess")),s()}catch(j){o.error(i("updateFailed")),console.error("Failed to update user information:",j)}finally{u(!1)}};return e.jsxRuntimeExports.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxRuntimeExports.jsxs("div",{style:{marginBottom:24,textAlign:"center"},children:[e.jsxRuntimeExports.jsx("h2",{children:(t==null?void 0:t.full_name)||(t==null?void 0:t.username)}),(t==null?void 0:t.roles)&&t.roles.length>0&&e.jsxRuntimeExports.jsxs("div",{children:[r("user.roles"),": ",t.roles.map(d=>d.name).join(", ")]})]}),e.jsxRuntimeExports.jsxs(n.Form,{form:a,layout:"vertical",onFinish:x,style:{width:"100%",maxWidth:500},children:[e.jsxRuntimeExports.jsx(n.Form.Item,{style:{marginBottom:24,textAlign:"center",justifyItems:"center"},name:"avatar",children:e.jsxRuntimeExports.jsx(de,{})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"username",label:r("user.username"),children:e.jsxRuntimeExports.jsx(n.Input,{disabled:!0})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"email",label:r("user.email"),rules:[{required:!0,message:r("validation.emailRequired")},{type:"email",message:r("validation.emailInvalid")}],children:e.jsxRuntimeExports.jsx(n.Input,{})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"full_name",label:r("user.fullName"),rules:[{required:!0,message:r("validation.fullNameRequired")}],children:e.jsxRuntimeExports.jsx(n.Input,{})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"phone",label:r("user.phone"),children:e.jsxRuntimeExports.jsx(n.Input,{})}),e.jsxRuntimeExports.jsx(n.Form.Item,{children:e.jsxRuntimeExports.jsx(n.Button,{type:"primary",htmlType:"submit",loading:l,children:i("save")})})]})]})},xt=({user:t,onSuccess:s})=>{const{message:o}=n.App.useApp(),{t:r}=S.useTranslation("authorization"),{t:i}=S.useTranslation("common"),[a,l]=p.useState(0),[u,x]=p.useState(!1),[d,j]=p.useState(!0),[m,h]=p.useState(""),[c,f]=p.useState("totp"),[T,v]=p.useState(!1),[E,y]=p.useState("password"),[g,C]=p.useState(""),[I,q]=p.useState(""),[D,W]=p.useState(""),[ne,Q]=p.useState(""),[$,J]=p.useState(0);p.useEffect(()=>{if($<=0)return;const R=setTimeout(()=>J(L=>L-1),1e3);return()=>clearTimeout(R)},[$]);const{run:fe,data:H={secret:"",qr_code:"",token:void 0}}=k.useRequest(()=>b.api.authorization.enableMfa({mfa_type:c}),{manual:!0,onSuccess:()=>{l(1)},onBefore:()=>{x(!0)},onFinally:()=>{x(!1)}}),ge=async()=>{if(!m){o.warning(r("mfa.enterVerificationCode"));return}const R={code:m,mfa_type:c};"token"in H&&(R.token=H.token);try{x(!0),await b.api.authorization.verifyAndActivateMfa(R),o.success(r("mfa.enableSuccess")),l(2),s()}catch(L){o.error(r("mfa.verificationFailed")),console.error("Failed to verify MFA:",L)}finally{x(!1)}},re=()=>{v(!1),y("password"),C(""),q(""),W(""),Q(""),J(0)},{runAsync:ye,loading:Re}=k.useRequest(()=>b.api.authorization.sendDisableMfaCode(),{manual:!0}),Ee=async()=>{try{const R=await ye();Q((R==null?void 0:R.token)??""),W(""),J(60),o.success(r("mfa.codeSent",{defaultValue:"Verification code has been sent to your email"}))}catch(R){o.error(R instanceof Error?R.message:i("operationFailed")),console.error("Failed to send disable-MFA code:",R)}},Y=async()=>{if(E==="email"){if(!ne){o.warning(r("mfa.sendCodeFirst",{defaultValue:"Please send the verification code first"}));return}if(!D){o.warning(r("mfa.enterVerificationCode"));return}}else if(E==="totp"){if(!I){o.warning(r("mfa.enterVerificationCode"));return}}else if(!g){o.warning(r("mfa.enterPassword",{defaultValue:"Enter your password"}));return}const R={password:"",mfa_code:"",email_code:"",email_token:""};E==="email"?(R.email_code=D,R.email_token=ne):E==="totp"?R.mfa_code=I:R.password=g;try{x(!0),await b.api.authorization.disableMfa(R),o.success(r("mfa.disableSuccess")),re(),s()}catch(L){o.error(L instanceof Error?L.message:i("operationFailed")),console.error("Failed to disable MFA:",L),E==="email"&&(Q(""),W(""),J(0))}finally{x(!1)}},be=()=>{if(!t)return null;if(t.mfa_enabled)return e.jsxRuntimeExports.jsx(n.Result,{status:"success",title:r("mfa.enabled"),subTitle:r("mfa.enabledDescription"),extra:e.jsxRuntimeExports.jsx(n.Button,{danger:!0,onClick:()=>v(!0),children:r("mfa.disable")})});const R=()=>{var L;switch(a){case 0:return e.jsxRuntimeExports.jsxs("div",{style:{textAlign:"center",marginTop:20},children:[e.jsxRuntimeExports.jsx(n.Alert,{message:e.jsxRuntimeExports.jsxs("div",{children:[e.jsxRuntimeExports.jsx("p",{children:r("mfa.setupInfo")}),e.jsxRuntimeExports.jsx("p",{children:r(c==="totp"?"mfa.totpDescription":"mfa.emailDescription")})]}),type:"info",showIcon:!0,style:{marginBottom:20}}),e.jsxRuntimeExports.jsx(n.Button,{type:"primary",onClick:fe,loading:u,children:r("mfa.startSetup")})]});case 1:return e.jsxRuntimeExports.jsxs("div",{style:{textAlign:"center",marginTop:20},children:[e.jsxRuntimeExports.jsx(n.Alert,{message:r("mfa.scanQrCode"),type:"info",showIcon:!0,style:{marginBottom:20,display:c==="totp"?"block":"none"}}),e.jsxRuntimeExports.jsx("div",{style:{display:c==="totp"?"flex":"none",justifyContent:"center",marginBottom:24},children:e.jsxRuntimeExports.jsx(n.QRCode,{value:H.qr_code??"",size:200})}),e.jsxRuntimeExports.jsx("div",{style:{marginBottom:16,display:c==="email"?"block":"none"},children:e.jsxRuntimeExports.jsxs("p",{children:[r("user.email"),": ",e.jsxRuntimeExports.jsx("strong",{children:t==null?void 0:t.email})]})}),e.jsxRuntimeExports.jsx("div",{style:{marginBottom:16,display:c==="totp"?"block":"none"},children:e.jsxRuntimeExports.jsxs("p",{children:[r("mfa.secretKey"),": ",e.jsxRuntimeExports.jsx("strong",{children:d?"*".repeat(((L=H.secret)==null?void 0:L.length)??0):H.secret}),e.jsxRuntimeExports.jsx(n.Button,{type:"link",onClick:()=>j(!d),icon:d?e.jsxRuntimeExports.jsx(w.EyeOutlined,{}):e.jsxRuntimeExports.jsx(w.EyeInvisibleOutlined,{})})]})}),e.jsxRuntimeExports.jsx("div",{style:{marginBottom:24},children:e.jsxRuntimeExports.jsx(n.Input,{placeholder:r("mfa.enterCode"),style:{width:200},maxLength:6,value:m,onChange:we=>h(we.target.value)})}),e.jsxRuntimeExports.jsxs(n.Space,{children:[e.jsxRuntimeExports.jsx(n.Button,{onClick:()=>l(0),children:i("previous")}),e.jsxRuntimeExports.jsx(n.Button,{type:"primary",onClick:ge,loading:u,children:i("verify")})]})]});case 2:return e.jsxRuntimeExports.jsx(n.Result,{status:"success",title:r("mfa.setupSuccess"),subTitle:r("mfa.setupSuccessDescription"),extra:e.jsxRuntimeExports.jsx(n.Button,{type:"primary",onClick:()=>l(0),children:i("done")})});default:return null}};return e.jsxRuntimeExports.jsxs("div",{children:[e.jsxRuntimeExports.jsxs("div",{style:{display:a===2?"none":"unset"},children:[e.jsxRuntimeExports.jsx(n.Segmented,{defaultValue:"totp",onChange:L=>{f(L),l(0)},value:c,options:[{value:"totp",icon:e.jsxRuntimeExports.jsx(w.ClockCircleFilled,{}),label:r("mfa.totp",{defaultValue:"TOTP"})},{value:"email",icon:e.jsxRuntimeExports.jsx(w.MailOutlined,{}),label:r("mfa.email",{defaultValue:"E-Mail"})}]}),e.jsxRuntimeExports.jsx(n.Divider,{})]}),e.jsxRuntimeExports.jsx(n.Steps,{current:a,items:[{title:r(c==="totp"?"mfa.totpStep1":"mfa.emailStep1"),description:r(c==="totp"?"mfa.totpStep1Description":"mfa.emailStep1Description")},{title:r(c==="totp"?"mfa.totpStep2":"mfa.emailStep2"),description:r(c==="totp"?"mfa.totpStep2Description":"mfa.emailStep2Description")},{title:r(c==="totp"?"mfa.totpStep3":"mfa.emailStep3"),description:r(c==="totp"?"mfa.totpStep3Description":"mfa.emailStep3Description")}],style:{marginBottom:30}}),R()]})};return e.jsxRuntimeExports.jsxs("div",{style:{padding:8},children:[be(),e.jsxRuntimeExports.jsxs(n.Modal,{title:r("mfa.confirmDisable"),open:T,onOk:Y,okText:r("mfa.disable"),okButtonProps:{danger:!0,loading:u},onCancel:re,destroyOnHidden:!0,children:[e.jsxRuntimeExports.jsx(n.Alert,{message:r("mfa.disableWarning"),type:"warning",showIcon:!0,style:{marginBottom:16}}),e.jsxRuntimeExports.jsx("p",{children:r("mfa.disableVerifyDescription",{defaultValue:"For security reasons, please verify your identity with your password or a verification code."})}),e.jsxRuntimeExports.jsx(n.Segmented,{block:!0,value:E,onChange:R=>y(R),options:[{value:"password",label:r("mfa.methodPassword",{defaultValue:"Password"})},...(t==null?void 0:t.mfa_type)==="totp"?[{value:"totp",label:r("mfa.totp",{defaultValue:"TOTP"})}]:[],{value:"email",label:r("mfa.methodEmailCode",{defaultValue:"Email code"})}],style:{marginBottom:16}}),E==="password"&&e.jsxRuntimeExports.jsx(n.Input.Password,{placeholder:r("mfa.enterPassword",{defaultValue:"Enter your password"}),autoComplete:"current-password",value:g,onChange:R=>C(R.target.value),onPressEnter:Y}),E==="totp"&&e.jsxRuntimeExports.jsx(n.Input,{placeholder:r("mfa.enterTotpCode",{defaultValue:"Enter the 6-digit code from your authenticator app"}),maxLength:6,value:I,onChange:R=>q(R.target.value),onPressEnter:Y}),E==="email"&&e.jsxRuntimeExports.jsxs(n.Space.Compact,{style:{width:"100%"},children:[e.jsxRuntimeExports.jsx(n.Input,{placeholder:r("mfa.enterEmailCode",{defaultValue:"Enter the 6-digit code sent to your email"}),maxLength:6,value:D,onChange:R=>W(R.target.value),onPressEnter:Y}),e.jsxRuntimeExports.jsx(n.Button,{onClick:Ee,loading:Re,disabled:$>0,children:$>0?r("mfa.resendIn",{defaultValue:"Resend ({{seconds}}s)",seconds:$}):r("mfa.sendCode",{defaultValue:"Send code"})})]})]})]})},{Text:ee}=n.Typography,mt=()=>{const{message:t}=n.App.useApp(),{t:s}=S.useTranslation("authorization"),{t:o}=S.useTranslation("common"),[r,i]=p.useState(null),[a,l]=p.useState(!1),{data:u=[],loading:x,run:d}=k.useRequest(()=>b.api.authorization.getUserSessions({}),{onError:c=>{t.error(s("session.getSessionsFailed",{error:c,defaultValue:"Failed to get session list: {{error}}"}))}}),{run:j}=k.useRequest(c=>b.api.authorization.terminateSession({id:c}),{onSuccess:()=>{t.success(s("session.terminateSuccess",{defaultValue:"Session terminated successfully"})),d()},onError:c=>{t.error(s("session.terminateFailed",{error:c,defaultValue:"Failed to terminate session: {{error}}"}))},onFinally:()=>{i(null)},onBefore:([c])=>{i(c)},manual:!0}),{run:m}=k.useRequest(()=>b.api.authorization.terminateOtherSessions(),{onSuccess:()=>{t.success(s("session.terminateAllSuccess",{defaultValue:"All other sessions terminated successfully"})),d()},onError:c=>{t.error(s("session.terminateAllFailed",{error:c,defaultValue:"Failed to terminate all other sessions: {{error}}"}))},onFinally:()=>{l(!1)},onBefore:()=>{l(!0)},manual:!0}),h=[{title:s("session.device"),dataIndex:"user_agent",key:"device",render:(c,f)=>e.jsxRuntimeExports.jsxs(n.Space,{direction:"vertical",size:0,children:[e.jsxRuntimeExports.jsxs(n.Space,{children:[e.jsxRuntimeExports.jsx(w.LaptopOutlined,{}),e.jsxRuntimeExports.jsx(ee,{strong:!0,children:c})]}),e.jsxRuntimeExports.jsxs(n.Space,{children:[e.jsxRuntimeExports.jsx(w.EnvironmentOutlined,{}),e.jsxRuntimeExports.jsx(ee,{type:"secondary",children:f.location})]})]})},{title:s("session.ipAddress"),dataIndex:"ip_address",key:"ip_address",render:c=>e.jsxRuntimeExports.jsxs(n.Space,{children:[e.jsxRuntimeExports.jsx(w.GlobalOutlined,{}),e.jsxRuntimeExports.jsx("span",{children:c})]})},{title:s("session.lastActive"),dataIndex:"last_active_at",key:"last_active",render:c=>e.jsxRuntimeExports.jsxs(n.Space,{children:[e.jsxRuntimeExports.jsx(w.ClockCircleOutlined,{}),e.jsxRuntimeExports.jsx("span",{children:new Date(c).toLocaleString()})]})},{title:s("session.status"),key:"status",render:c=>c.is_current?e.jsxRuntimeExports.jsx(n.Tag,{color:"green",children:s("session.current")}):e.jsxRuntimeExports.jsx(n.Tag,{color:"blue",children:s("session.active")})},{title:o("actions"),key:"action",render:c=>c.is_current?e.jsxRuntimeExports.jsx(ee,{type:"secondary",children:s("session.currentSession")}):e.jsxRuntimeExports.jsx(n.Popconfirm,{title:s("session.confirmTerminate"),onConfirm:()=>j(c.id),okText:o("confirm"),cancelText:o("cancel"),children:e.jsxRuntimeExports.jsx(n.Button,{type:"link",danger:!0,loading:r===c.id,children:s("session.terminate")})})}];return e.jsxRuntimeExports.jsxs(n.Space,{direction:"vertical",style:{padding:8,width:"100%"},children:[e.jsxRuntimeExports.jsxs(n.Space,{direction:"horizontal",style:{float:"right"},children:[u.length>1&&e.jsxRuntimeExports.jsx(n.Popconfirm,{title:s("session.confirmTerminateAll"),onConfirm:m,okText:o("confirm"),cancelText:o("cancel"),children:e.jsxRuntimeExports.jsx(n.Button,{danger:!0,loading:a,children:s("session.terminateOthers")})}),e.jsxRuntimeExports.jsx(n.Button,{onClick:()=>d(),loading:x,children:o("refresh")})]}),!x&&u.length===0?e.jsxRuntimeExports.jsx(n.Empty,{description:s("session.noSessions")}):e.jsxRuntimeExports.jsx(n.Table,{columns:h,dataSource:u,rowKey:"id",loading:x,pagination:!1})]})},{RangePicker:pt}=n.DatePicker,{Option:_}=n.Select,ht=t=>t||"N/A",jt=(t,s)=>t==="success"?e.jsxRuntimeExports.jsx(n.Tag,{color:"success",children:s("statuses.success")}):e.jsxRuntimeExports.jsx(n.Tag,{color:"error",children:s("statuses.failed")}),ft=({userId:t,request:s=r=>t?b.api.authorization.getUserLogs({id:t,...r}):b.api.authorization.getCurrentUserLogs(r),columnsFilter:o=r=>r})=>{const{message:r,modal:i}=n.App.useApp(),{t:a}=S.useTranslation("authorization"),{t:l}=S.useTranslation("common"),[u,x]=p.useState({current:1,pageSize:10,total:0}),[d,j]=p.useState({}),[m]=n.Form.useForm(),{loading:h,run:c,data:{data:f}={}}=k.useRequest(async(g=d,C=1,I=10)=>s({...g,current:C??1,page_size:I??10}),{onError(g){r.error(a("auditLog.fetchFailed",{error:g}))},onSuccess({total:g}){x({...u,total:g})}});p.useEffect(()=>{c(d,1,u.pageSize)},[]);const T=g=>{x({...u,current:g.current||1,pageSize:g.pageSize||10}),c({},g.current,g.pageSize)},v=g=>{var C,I,q,D;c({...g,start_time:(I=(C=g.dateRange)==null?void 0:C[0])==null?void 0:I.toISOString(),end_time:(D=(q=g.dateRange)==null?void 0:q[1])==null?void 0:D.toISOString()},1,u.pageSize)},E=()=>{m.resetFields(),j({}),x({...u,current:1}),c({},1,u.pageSize)},y=[{title:a("auditLog.timestamp"),dataIndex:"timestamp",key:"timestamp",render:g=>N.formatDate(g)},{title:a("auditLog.action"),dataIndex:"action",key:"action",render:(g,C)=>g?a(`action.${g.replace(/:/g,".")}`,{defaultValue:a(`permission.title.${g.replace(/:/g,".")}`,{defaultValue:C.action_name})}):C.action_name??C.action},{title:a("auditLog.user_agent"),dataIndex:"user_agent",key:"user_agent"},{title:a("auditLog.ip"),dataIndex:"ip",key:"ip",render:g=>ht(g)},{title:a("auditLog.status"),dataIndex:"status",key:"status",render:g=>jt(g,a)},{title:a("auditLog.details"),dataIndex:"details",key:"details",render:g=>e.jsxRuntimeExports.jsx(n.Button,{type:"link",icon:e.jsxRuntimeExports.jsx(w.EyeOutlined,{}),onClick:()=>{i.info({title:a("auditLog.details"),content:JSON.stringify(g)})}})}];return e.jsxRuntimeExports.jsxs("div",{children:[e.jsxRuntimeExports.jsx(n.Card,{style:{marginBottom:16},children:e.jsxRuntimeExports.jsx(n.Form,{form:m,layout:"horizontal",onFinish:v,initialValues:d,children:e.jsxRuntimeExports.jsxs(n.Row,{gutter:[16,16],children:[e.jsxRuntimeExports.jsx(n.Col,{xxl:6,xl:6,lg:8,sm:12,xs:24,children:e.jsxRuntimeExports.jsx(n.Form.Item,{name:"search",noStyle:!0,children:e.jsxRuntimeExports.jsx(n.Input,{placeholder:a("auditLog.searchPlaceholder")})})}),e.jsxRuntimeExports.jsx(n.Col,{xxl:4,xl:6,lg:8,sm:12,xs:24,children:e.jsxRuntimeExports.jsx(n.Form.Item,{name:"action",noStyle:!0,children:e.jsxRuntimeExports.jsxs(n.Select,{allowClear:!0,placeholder:a("auditLog.selectAction"),style:{width:"100%"},children:[e.jsxRuntimeExports.jsx(_,{value:"login",children:a("actions.login")}),e.jsxRuntimeExports.jsx(_,{value:"logout",children:a("actions.logout")}),e.jsxRuntimeExports.jsx(_,{value:"password_reset",children:a("actions.passwordReset")}),e.jsxRuntimeExports.jsx(_,{value:"mfa_change",children:a("actions.mfaChange")})]})})}),e.jsxRuntimeExports.jsx(n.Col,{xxl:3,xl:6,lg:8,sm:12,xs:24,children:e.jsxRuntimeExports.jsx(n.Form.Item,{name:"status",noStyle:!0,children:e.jsxRuntimeExports.jsxs(n.Select,{allowClear:!0,placeholder:a("auditLog.selectStatus"),style:{width:"100%"},children:[e.jsxRuntimeExports.jsx(_,{value:"success",children:a("statuses.success")}),e.jsxRuntimeExports.jsx(_,{value:"failed",children:a("statuses.failed")})]})})}),e.jsxRuntimeExports.jsx(n.Col,{xxl:6,xl:6,lg:10,md:12,sm:12,xs:24,children:e.jsxRuntimeExports.jsx(n.Form.Item,{name:"dateRange",noStyle:!0,children:e.jsxRuntimeExports.jsx(pt,{style:{width:"100%"}})})}),e.jsxRuntimeExports.jsx(n.Col,{xxl:5,xl:24,lg:14,md:24,sm:24,xs:24,style:{textAlign:"right"},children:e.jsxRuntimeExports.jsxs(n.Space,{children:[e.jsxRuntimeExports.jsx(n.Button,{onClick:E,children:l("reset")}),e.jsxRuntimeExports.jsx(n.Button,{type:"primary",htmlType:"submit",icon:e.jsxRuntimeExports.jsx(w.SearchOutlined,{}),children:l("search")})]})})]})})}),e.jsxRuntimeExports.jsx(n.Card,{children:e.jsxRuntimeExports.jsx(n.Table,{rowKey:"id",columns:o(y),dataSource:f,pagination:{...u,showSizeChanger:!0,showTotal:g=>l("totalItems",{total:g})},loading:h,onChange:T,scroll:{x:"max-content"}})})]})},{Text:gt}=n.Typography,yt=({kind:t,subjectId:s,readOnly:o})=>{const{message:r}=n.App.useApp(),{t:i}=S.useTranslation("authorization"),{t:a}=S.useTranslation("common"),[l]=n.Form.useForm(),u=t==="user"?b.api.authorization.getUserRateLimit:b.api.authorization.getServiceAccountRateLimit,x=t==="user"?b.api.authorization.updateUserRateLimit:b.api.authorization.updateServiceAccountRateLimit,{data:d,loading:j,refresh:m}=k.useRequest(()=>u({id:s}),{ready:!!s,refreshDeps:[s,t],onSuccess:y=>{l.setFieldsValue({rate:y.rate,period:y.period||"1m",burst:y.burst,quota:y.quota,quota_period:y.quota_period||"1d",enabled:y.enabled!==!1})}}),{run:h,loading:c}=k.useRequest(async y=>x({id:s},{...y,clear:!1,inherited:!1,enabled:y.enabled!==!1}),{manual:!0,onSuccess:()=>{r.success(i("rateLimit.saveSuccess",{defaultValue:"Rate limit override saved"})),m()},onError:y=>{r.error(y.message||i("rateLimit.saveFailed",{defaultValue:"Failed to save override"}))}}),{run:f,loading:T}=k.useRequest(async()=>x({id:s},{clear:!0,rate:0,burst:0,quota:0,period:"",quota_period:"",enabled:!1,inherited:!0}),{manual:!0,onSuccess:()=>{r.success(i("rateLimit.resetSuccess",{defaultValue:"Override cleared; type default restored"})),m()},onError:y=>{r.error(y.message)}}),{run:v,loading:E}=k.useRequest(async()=>t==="user"?b.api.authorization.resetUserRateLimit({id:s}):b.api.authorization.resetServiceAccountRateLimit({id:s}),{manual:!0,onSuccess:()=>{r.success(i("rateLimit.resetCountersSuccess",{defaultValue:"Counters reset"}))},onError:y=>{r.error(y.message)}});return e.jsxRuntimeExports.jsxs(n.Form,{form:l,layout:"vertical",onFinish:h,disabled:o||j,style:{maxWidth:480,marginTop:16},children:[(d==null?void 0:d.inherited)&&e.jsxRuntimeExports.jsx(n.Alert,{type:"info",showIcon:!0,style:{marginBottom:16},message:i("rateLimit.inherited",{defaultValue:"Using the type default. Save to create a subject-specific override."})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"rate",label:i("rateLimit.rate",{defaultValue:"Rate"}),rules:[{required:!0}],children:e.jsxRuntimeExports.jsx(n.InputNumber,{min:1,style:{width:"100%"}})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"period",label:i("rateLimit.period",{defaultValue:"Period"}),extra:i("rateLimit.periodHint",{defaultValue:"Examples: 1s, 1m, 1h"}),children:e.jsxRuntimeExports.jsx(n.Input,{placeholder:"1m"})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"burst",label:i("rateLimit.burst",{defaultValue:"Burst"}),children:e.jsxRuntimeExports.jsx(n.InputNumber,{min:1,style:{width:"100%"}})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"quota",label:i("rateLimit.quota",{defaultValue:"Daily quota (0 = none)"}),children:e.jsxRuntimeExports.jsx(n.InputNumber,{min:0,style:{width:"100%"}})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"quota_period",label:i("rateLimit.quotaPeriod",{defaultValue:"Quota period"}),children:e.jsxRuntimeExports.jsx(n.Input,{placeholder:"1d"})}),e.jsxRuntimeExports.jsx(n.Form.Item,{name:"enabled",label:i("rateLimit.enabled",{defaultValue:"Enabled"}),valuePropName:"checked",extra:i("rateLimit.enabledHint",{defaultValue:"Off: this override is ignored and the type default applies. Use Reset to default to delete the override."}),children:e.jsxRuntimeExports.jsx(n.Switch,{})}),!o&&e.jsxRuntimeExports.jsxs(n.Space,{children:[e.jsxRuntimeExports.jsx(n.Button,{type:"primary",htmlType:"submit",loading:c,children:a("save",{defaultValue:"Save"})}),e.jsxRuntimeExports.jsx(n.Popconfirm,{title:i("rateLimit.resetCountersConfirm",{defaultValue:"Reset rate-limit and quota counters for this subject? They will be able to send requests immediately."}),onConfirm:()=>v(),children:e.jsxRuntimeExports.jsx(n.Button,{htmlType:"button",icon:e.jsxRuntimeExports.jsx(w.UndoOutlined,{}),loading:E,children:i("rateLimit.resetCounters",{defaultValue:"Reset counters"})})}),!(d!=null&&d.inherited)&&e.jsxRuntimeExports.jsx(n.Button,{onClick:()=>f(),loading:T,children:i("rateLimit.resetToDefault",{defaultValue:"Reset to default"})})]}),(d==null?void 0:d.inherited)&&e.jsxRuntimeExports.jsx(gt,{type:"secondary",children:i("rateLimit.sourceHint",{defaultValue:"Values shown are inherited."})})]})},{Text:le}=n.Typography,Rt={debug:"default",info:"processing",warn:"warning",error:"error"},Et=({taskId:t,poll:s})=>{const{t:o}=S.useTranslation("task"),{data:r=[],loading:i}=k.useRequest(()=>t?b.api.tasks.getTaskLogs({id:t}):Promise.reject(new Error("No task id")),{refreshDeps:[t],ready:!!t,pollingInterval:s?2e3:0});return e.jsxRuntimeExports.jsx(n.Card,{title:o("logsTitle",{defaultValue:"Task logs"}),size:"small",style:{marginTop:16},children:i&&!r.length?e.jsxRuntimeExports.jsx("div",{style:{textAlign:"center",padding:24},children:e.jsxRuntimeExports.jsx(n.Spin,{})}):r.length?e.jsxRuntimeExports.jsx("pre",{style:{margin:0,padding:12,maxHeight:320,overflow:"auto",fontSize:12,background:"var(--ant-colorFillTertiary)",borderRadius:6,whiteSpace:"pre-wrap",wordBreak:"break-all"},children:r.map(a=>e.jsxRuntimeExports.jsxs("div",{style:{marginBottom:4},children:[e.jsxRuntimeExports.jsx(le,{type:"secondary",style:{fontSize:11},children:a.created_at}),a.level&&e.jsxRuntimeExports.jsxs(le,{type:Rt[a.level],style:{marginLeft:8,fontSize:11},children:["[",a.level,"]"]}),e.jsxRuntimeExports.jsx("div",{style:{display:"inline",marginLeft:8},children:a.message})]},a.id))}):e.jsxRuntimeExports.jsx(n.Empty,{description:o("noLogs",{defaultValue:"No logs yet."})})})},bt=P.createStyles(({token:t,css:s})=>({wrap:s`
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid ${t.colorBorderSecondary};
    border-radius: ${t.borderRadiusLG}px;
    background: ${t.colorFillAlter};
  `,header:s`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px 8px;
    min-width: 0;
    margin-bottom: 4px;
  `,title:s`
    font-weight: 600;
    line-height: 1.4;
    word-break: break-word;
  `,description:s`
    font-size: 13px;
    line-height: 1.45;
    color: ${t.colorTextSecondary};
    word-break: break-word;
  `,toolName:s`
    font-size: 12px;
    font-weight: 400;
    word-break: break-all;
  `,arguments:s`
    .ant-collapse-header {
      padding-inline: 0 !important;
      padding-block: 4px !important;
    }
    .ant-collapse-content-box {
      padding-inline: 0 !important;
      padding-block: 4px 0 !important;
    }
  `,argsPre:s`
    margin: 0;
    max-height: 160px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 12px;
    line-height: 1.45;
  `,actions:s`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `,action:s`
    height: auto;
    min-height: 32px;
    padding-block: 4px;
    padding-inline: 12px;
    white-space: normal;
    text-align: left;
  `}));function wt(t){const s=t.trim();if(!s)return"";try{return JSON.stringify(JSON.parse(s),null,2)}catch{return s}}function vt(t){const s=t.description;if(typeof s=="string"&&s.trim())return s.trim();try{const o=JSON.parse(t.arguments||"{}");return typeof o.description=="string"?o.description.trim():""}catch{return""}}function je(t,s){return t?t.id==="approve"?s("chat.hitlExecute",{defaultValue:t.label||"Execute"}):t.id==="reject"?s("chat.hitlDontExecute",{defaultValue:t.label||"Don't execute"}):t.label:""}function St(t,s,o){var i;const r=(i=t.options)==null?void 0:i.find(a=>a.id===s);return je(r,o)||s||"…"}const Tt=({card:t,submitting:s=!1,onSelect:o})=>{var v,E;const{t:r}=S.useTranslation("ai"),{styles:i}=bt(),a=wt(t.arguments||""),[l,u]=p.useState(t.selected_option_id||"");p.useEffect(()=>{u(t.selected_option_id||"")},[t.selected_option_id,t.tool_call_id]);const x=l||t.selected_option_id||"",d=((v=t.title)==null?void 0:v.trim())||t.tool_name,j=!!((E=t.title)!=null&&E.trim()&&t.tool_name&&t.title.trim()!==t.tool_name&&t.tool_name!=="ui_choose"),m=t.kind==="choice"||t.tool_name==="ui_choose",h=vt(t),c=!m&&!!a,f=t.status==="abandoned"||t.status==="decided";let T;return t.status==="abandoned"?T=e.jsxRuntimeExports.jsx(n.Typography.Text,{type:"secondary",children:r("chat.hitlAbandoned",{defaultValue:"You continued without choosing."})}):f&&x?T=e.jsxRuntimeExports.jsx(n.Typography.Text,{children:r("chat.hitlChose",{defaultValue:"You chose {{label}}.",label:St(t,x,r)})}):f?T=e.jsxRuntimeExports.jsx(n.Typography.Text,{children:r("chat.hitlChose",{defaultValue:"You chose {{label}}.",label:"…"})}):T=e.jsxRuntimeExports.jsx("div",{className:i.actions,children:(t.options??[]).map(y=>{const g=x===y.id;return e.jsxRuntimeExports.jsx(n.Button,{className:i.action,type:g?"primary":"default",loading:s&&g,disabled:s,onClick:()=>{u(y.id),o==null||o(y.id)},children:e.jsxRuntimeExports.jsxs(n.Flex,{vertical:!0,align:"flex-start",children:[e.jsxRuntimeExports.jsx("span",{children:je(y,r)}),y.description?e.jsxRuntimeExports.jsx("span",{style:{fontSize:12,fontWeight:400,opacity:.85},children:y.description}):null]})},y.id)})}),e.jsxRuntimeExports.jsxs("div",{className:i.wrap,children:[e.jsxRuntimeExports.jsxs("div",{className:i.header,children:[e.jsxRuntimeExports.jsx("span",{className:i.title,children:d}),j?e.jsxRuntimeExports.jsx(n.Typography.Text,{className:i.toolName,type:"secondary",code:!0,children:t.tool_name}):null]}),e.jsxRuntimeExports.jsxs(n.Flex,{vertical:!0,gap:8,children:[h?e.jsxRuntimeExports.jsx("div",{className:i.description,children:h}):null,c?e.jsxRuntimeExports.jsx(n.Collapse,{className:i.arguments,ghost:!0,size:"small",items:[{key:"arguments",label:r("chat.hitlArguments",{defaultValue:"Arguments"}),children:e.jsxRuntimeExports.jsx("pre",{className:i.argsPre,children:a})}]}):null,T]})]})};function Ct(t){try{return JSON.stringify(JSON.parse(t),null,2)}catch{return t}}const K=P.createStyles(({token:t,css:s})=>({root:s`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    width: 100%;
    margin-top: 2px;
  `,rootEnd:s`
    align-items: flex-end;
  `,actions:s`
    display: flex;
    align-items: center;
    gap: 2px;
    width: fit-content;
  `,action:s`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: ${t.colorTextSecondary};
    cursor: pointer;
    &:hover {
      background: ${t.colorPrimaryBg};
      color: ${t.colorText};
    }
  `,chevron:s`
    transform: rotate(0deg);
    transition: transform 0.15s ease;
  `,chevronOpen:s`
    transform: rotate(90deg);
  `,rows:s`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
    &[hidden] {
      display: none;
    }
  `,run:s`
    width: 100%;
    margin: 0;
    color: ${t.colorTextSecondary};
    font-size: 12px;
  `,summary:s`
    display: flex;
    align-items: baseline;
    gap: 8px;
    min-width: 0;
    max-width: 100%;
    cursor: pointer;
  `,line:s`
    display: flex;
    align-items: baseline;
    gap: 8px;
    min-width: 0;
    max-width: 100%;
    margin: 0;
  `,name:s`
    flex: 0 0 auto;
    color: ${t.colorTextSecondary};
    font-family: ${t.fontFamilyCode};
    font-size: 11px;
  `,title:s`
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    color: ${t.colorText};
    font-weight: 650;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,status:s`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 6px;
    color: ${t.colorTextSecondary};
    font-size: 11px;
    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: ${t.colorPrimary};
    }
  `,statusRunning:s`
    color: ${t.colorPrimary};
    &::before {
      animation: chat-tool-pulse 1s ease-in-out infinite;
    }
    @keyframes chat-tool-pulse {
      50% { opacity: 0.35; }
    }
    @media (prefers-reduced-motion: reduce) {
      &::before { animation: none; }
    }
  `,statusFailed:s`
    color: ${t.colorError};
    &::before {
      background: ${t.colorError};
    }
  `,pre:s`
    margin: 4px 0 0;
    white-space: pre-wrap;
    color: ${t.colorText};
    font-size: 12px;
    font-family: ${t.fontFamilyCode};
  `}));function kt({open:t}){const{styles:s,cx:o}=K();return e.jsxRuntimeExports.jsx("svg",{className:o(s.chevron,t&&s.chevronOpen),width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsxRuntimeExports.jsx("path",{d:"M6 4.5 10 8 6 11.5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function It(){return e.jsxRuntimeExports.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:[e.jsxRuntimeExports.jsx("rect",{x:"6",y:"6",width:"7",height:"7",rx:"1.4",fill:"none",stroke:"currentColor",strokeWidth:"1.5"}),e.jsxRuntimeExports.jsx("path",{d:"M10 6V4.2A1.2 1.2 0 0 0 8.8 3H4.2A1.2 1.2 0 0 0 3 4.2v4.6A1.2 1.2 0 0 0 4.2 10H6",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}function Lt(){return e.jsxRuntimeExports.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsxRuntimeExports.jsx("path",{d:"M3.5 8.2 6.4 11 12.5 5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function ue({call:t}){var x;const{styles:s,cx:o}=K(),{t:r}=S.useTranslation("ai"),i=t.status==="running"||t.status==="pending",a=t.status==="failed",l=a?r("chat.toolFailed",{defaultValue:"Failed"}):i?r("chat.toolRunning",{defaultValue:"Running"}):r("chat.toolDone",{defaultValue:"Done"}),u=(x=t.title)==null?void 0:x.trim();return e.jsxRuntimeExports.jsxs(e.jsxRuntimeExports.Fragment,{children:[e.jsxRuntimeExports.jsx("code",{className:s.name,children:t.name}),u?e.jsxRuntimeExports.jsx("span",{className:s.title,title:u,children:u}):null,e.jsxRuntimeExports.jsx("span",{className:o(s.status,i&&s.statusRunning,a&&s.statusFailed),children:l})]})}function Ft({call:t}){const{styles:s}=K(),o=t.status==="running"||t.status==="pending";return t.arguments?e.jsxRuntimeExports.jsx("section",{className:s.run,"aria-busy":o,children:e.jsxRuntimeExports.jsxs("details",{className:s.run,children:[e.jsxRuntimeExports.jsx("summary",{className:s.summary,children:e.jsxRuntimeExports.jsx(ue,{call:t})}),e.jsxRuntimeExports.jsx("pre",{className:s.pre,children:Ct(t.arguments)})]})}):e.jsxRuntimeExports.jsx("section",{className:s.run,"aria-busy":o,children:e.jsxRuntimeExports.jsx("p",{className:s.line,children:e.jsxRuntimeExports.jsx(ue,{call:t})})})}function At({text:t,tools:s=[],live:o=!1,align:r="start"}){const{styles:i,cx:a}=K(),{t:l}=S.useTranslation("ai"),[u,x]=p.useState(o),[d,j]=p.useState(!1),m=d?l("chat.copied",{defaultValue:"Copied"}):l("chat.copyMessage",{defaultValue:"Copy message"}),h=u?l("chat.hideToolCalls",{defaultValue:"Hide tool calls"}):l("chat.showToolCalls",{defaultValue:"Show tool calls"});async function c(){try{await navigator.clipboard.writeText(t),j(!0),window.setTimeout(()=>j(!1),1200)}catch{j(!1)}}return!t&&s.length===0?null:e.jsxRuntimeExports.jsxs("div",{className:a("chat-message-actions",i.root,r==="end"&&i.rootEnd,u&&s.length>0&&"has-tools"),children:[e.jsxRuntimeExports.jsxs("div",{className:i.actions,children:[t?e.jsxRuntimeExports.jsx(n.Tooltip,{title:m,placement:"bottom",children:e.jsxRuntimeExports.jsx("button",{type:"button",className:i.action,"aria-label":m,onClick:()=>void c(),children:d?e.jsxRuntimeExports.jsx(Lt,{}):e.jsxRuntimeExports.jsx(It,{})})}):null,s.length>0?e.jsxRuntimeExports.jsx(n.Tooltip,{title:h,placement:"bottom",children:e.jsxRuntimeExports.jsx("button",{type:"button",className:i.action,"aria-expanded":u,"aria-label":h,onClick:()=>x(f=>!f),children:e.jsxRuntimeExports.jsx(kt,{open:u})})}):null]}),s.length>0?e.jsxRuntimeExports.jsx("div",{className:a("chat-tool-log",i.rows),hidden:!u,children:s.map(f=>e.jsxRuntimeExports.jsx(Ft,{call:f},f.id))}):null]})}exports.AIChatFloatButton=Ke;exports.Actions=et;exports.AdminGuard=Ze;exports.AllLangUIConfig=ce;exports.Avatar=Me;exports.AvatarUpload=de;exports.ChatMessageActions=At;exports.DynamicIcon=st;exports.HITLCard=Tt;exports.HeaderDropdown=O;exports.InboxDropdown=qe;exports.JsonSchemaConfigForm=lt;exports.JsonSchemaConfigFormItem=ut;exports.LabelCreater=nt;exports.LanguageSwitch=Pe;exports.Loading=U;exports.OrganizationSwitcher=_e;exports.PermissionGuard=se;exports.PrivateRoute=Le;exports.ProfileBasic=dt;exports.ProfileMFA=xt;exports.ProfilePassword=ct;exports.ProfileSessions=mt;exports.RateLimitOverrideForm=yt;exports.ResizeDivider=He;exports.Table=it;exports.TaskListDropdown=Be;exports.TaskLogViewer=Et;exports.ThemeSwitch=Qe;exports.UserAuditLogs=ft;exports.getIconByName=he;
