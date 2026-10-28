import{j as e,S as ue,u as C,R as le,N as ye,D as Te,a as _,b as O,A as We,r as h,I as Ye,U as Xe,M as Le,d as L,P as Je,e as Ke,f as Ge,L as P,g as Qe,h as Ae,i as Ze,k as et,l as tt,m as Re,n as st,o as nt,T as E,B as S,p as at,q as X,s as rt,t as it,v as V,w as ot,x as J,y as lt,z as N,F as b,C as A,E as ct,G as Z,H as je,J as dt,K as ut,O as mt,Q as pt,V as ze,W as ft,X as ht,Y as xt,Z as gt,_ as yt,$ as ee,a0 as Ve,a1 as me,a2 as ce,a3 as jt,a4 as Y,a5 as de,a6 as bt,a7 as wt,a8 as vt,a9 as ae,aa as St,ab as kt,ac as be,ad as Ct}from"./vendor.DYT41JkO.js";import{u as pe,a as Fe,b as fe,c as It,d as Tt}from"./contexts.CNi-x0s2.js";import{g as Lt,i as At,a as Rt,b as zt,c as Vt,f as Ft}from"./base.BfLIGacm.js";import{a as v}from"./index.pbtdX8UR.js";import{b as re,A as Et}from"./client.DnP04lab.js";import{f as _t}from"./lodash.Bb75kzRV.js";const we=()=>e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100%"},children:e.jsx(ue,{size:"large"})}),bs=({element:t,requiredPermission:s,requiredPermissions:r})=>{const{t:n}=C(),{user:a,loading:i,error:o}=pe(),{hasPermission:l,hasAllPermissions:u}=Fe();return i?e.jsx(we,{}):o?o.code==="E4011"?e.jsx(we,{}):e.jsx(le,{status:"500",title:"500",subTitle:n("login.fetchCurrentUserError",{defaultValue:"Failed to fetch current user: {{error}}",error:(o==null?void 0:o.message)||o})}):a?s&&!l(s)?e.jsx(ye,{to:"/forbidden",replace:!0}):r&&!u(r)?e.jsx(ye,{to:"/forbidden",replace:!0}):t:(window.location.href=Lt("/login?redirect="+encodeURIComponent(window.location.href)),null)},Pt=O(({token:t,css:s})=>({container:s`
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
    `,iconStyle:{cursor:"pointer",padding:"12px",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:18,verticalAlign:"middle","&:hover":{color:t.colorPrimaryTextHover}}})),te=({overlayClassName:t,overlay:s,hidden:r,children:n,...a})=>{const{styles:i}=Pt();return r?e.jsx(e.Fragment,{}):e.jsx(Te,{popupRender:s,overlayClassName:_(i.container,t),...a,children:e.jsx("span",{className:i.iconStyle,children:n})})},Dt=()=>e.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",children:[e.jsx("path",{d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",className:"css-c4d79v"})]}),Mt=O(()=>({menuItemStyle:{minWidth:"160px"},menuItemIconStyle:{marginRight:"8px"}})),Nt=[{lang:"en-US",label:"English",icon:"🇺🇸"},{lang:"sv-SE",label:"Svenska",icon:"🇸🇪"},{lang:"ar-AE",label:"العربية",icon:"🇦🇪"},{lang:"de-DE",label:"Deutsch",icon:"🇩🇪"},{lang:"es-ES",label:"Español",icon:"🇪🇸"},{lang:"fr-FR",label:"Français",icon:"🇫🇷"},{lang:"zh-CN",label:"中文",icon:"🇨🇳"}],ws=({transformLangConfig:t=r=>r,className:s})=>{const{i18n:r}=C(),{styles:n}=Mt(),a=o=>{r.changeLanguage(o)},i={selectedKeys:[r.language],onClick:o=>{a(o.key)},items:t(Nt).map(o=>({key:o.lang,className:n.menuItemStyle,label:e.jsxs(e.Fragment,{children:[e.jsx("span",{role:"img","aria-label":(o==null?void 0:o.label)||"en-US",className:n.menuItemIconStyle,children:(o==null?void 0:o.icon)||"🌐"}),(o==null?void 0:o.label)||"en-US"]})}))};return e.jsx(te,{className:s,menu:i,children:e.jsx(Dt,{})})},$t=O(({css:t})=>({avatarItem:t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `})),he=t=>_t(t)&&t.match(/^[-_a-zA-Z0-9]+$/)?re.endsWith("/")?re+`files/${t}`:re+`/files/${t}`:t,vs=({src:t,fallback:s,...r})=>e.jsx(We,{src:he(t),icon:s,...r}),Bt=({onChange:t,shape:s="square"})=>{const[r,n]=h.useState([]),{styles:a}=$t(),[i,o]=h.useState(!1),[l,u]=h.useState(!0),[d,f]=h.useState(0),{run:m,loading:p}=L(()=>v.base.listFiles({current:d+1,page_size:40,file_type:"avatar",access:"public",search:""}),{manual:!0,onSuccess:({data:y})=>{console.log(y),n([...r,...y]),u(y.length===40),f(d+1)}}),c=()=>{u(!0),f(0),n([])};return e.jsx(Je,{style:{zIndex:1e3},onOpenChange:y=>{o(y),y?m():c()},open:i,content:e.jsx("div",{style:{width:360,height:200},children:e.jsx("div",{id:"iconsScrollableDiv",style:{height:"100%",overflow:"auto"},children:e.jsx(Ge,{dataLength:r.length,next:()=>{m()},hasMore:l,loader:e.jsx(Ze,{avatar:!0,paragraph:{rows:1},active:!0}),endMessage:e.jsx(Ae,{plain:!0,children:"End"}),scrollableTarget:"iconsScrollableDiv",children:e.jsx(P,{grid:{gutter:16,column:8},dataSource:r,style:{margin:"0 8px"},loading:p,renderItem:({id:y})=>e.jsx("div",{className:a.avatarItem,onClick:I=>{I.stopPropagation(),t==null||t(y),o(!1),c()},children:e.jsx(Qe,{src:he(y),placeholder:e.jsx(ue,{size:"default"}),preview:!1})})})})})}),placement:"bottom",trigger:"hover",children:e.jsx(Ke,{shape:s,style:{width:112,height:112,placeContent:"center"}})})},Ht=({value:t,onChange:s,shape:r,...n})=>{const[a,i]=h.useState(void 0),[o,l]=h.useState(!1),[u,d]=h.useState(void 0),f=async m=>{l(!0),d(m.url??m.preview)};return h.useEffect(()=>{i(t?{uid:t,name:t,url:he(t)}:void 0)},[t]),e.jsxs(e.Fragment,{children:[e.jsx(Ye,{beforeCrop:async m=>{if(m.type==="image/svg+xml"){const p=await v.base.uploadFile({type:"avatar"},m);return p.length>0&&(s==null||s(p[0].id)),!1}return!0},children:e.jsx(Xe,{customRequest:async m=>{var c,y;const p=await v.base.uploadFile({type:"avatar",access:"public"},m.file);p.length>0?((c=m.onSuccess)==null||c.call(m,p[0].id),s==null||s(p[0].id)):(y=m.onError)==null||y.call(m,new Error("Upload file failed"))},listType:"picture-card",onPreview:f,maxCount:1,onChange:({file:m})=>{switch(m.status){case"removed":s==null||s(void 0);break;case"done":break;default:i(m);break}},fileList:a?[a]:[],...n,children:a?void 0:e.jsx(Bt,{shape:r,onChange:s})})}),e.jsx(Le,{open:o,footer:null,onCancel:()=>l(!1),children:e.jsx("img",{style:{width:"100%"},src:u})})]})},Ss=({className:t})=>{const{t:s}=C("common"),{user:r}=pe(),{currentOrgId:n,setCurrentOrgId:a}=fe(),i=(r==null?void 0:r.organizations)||[],o=f=>{a(f),window.location.reload()};if(i.length===0)return null;const l=i.find(f=>f.id===n),u=l?l.name:s("organization.global",{defaultValue:"Global"}),d=[...i.map(f=>({key:f.id,label:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{children:f.name}),n===f.id&&e.jsx(et,{})]}),onClick:()=>o(f.id)}))];return e.jsxs(te,{className:t,menu:{items:d,selectedKeys:n?[n]:[""]},children:[e.jsx(tt,{style:{marginRight:4}}),e.jsx("span",{style:{height:"1em",lineHeight:"1em",marginLeft:"5px"},children:u})]})},Ot={pending:"default",running:"processing",success:"success",failed:"error",cancelled:"default"},ks=({className:t})=>{const{t:s}=C("task"),r=Re(),{user:n}=It(),{tasksDropdownOpen:a,setTasksDropdownOpen:i,tasks:o,setTasks:l}=fe(),{runAsync:u,loading:d}=L(async()=>v.tasks.listUserTasks({}),{onSuccess:p=>{At(o,p,(c,y)=>c.id===y.id&&c.status===y.status&&c.progress===y.progress)||l(p)},pollingInterval:a?3e3:6e4,ready:!!n,refreshDeps:[n]});h.useEffect(()=>{a&&u()},[a]);const f=async p=>{const c=await v.base.downloadFile({fileKey:p},{params:{method:"sign"}}),y=`/api/files/${p}?signature=${c.signature}&expires=${c.expires}`;window.open(y,"_blank")},m=()=>e.jsxs("div",{style:{width:520,maxHeight:500,overflow:"auto",padding:8},children:[e.jsx(P,{size:"small",dataSource:o,loading:d,renderItem:p=>e.jsx(P.Item,{extra:e.jsx(X,{color:Ot[p.status],style:{marginLeft:6},children:s(`status.${p.status}`,{defaultValue:p.status})}),actions:[p.artifact_file_key&&e.jsx(S,{type:"text",size:"small",icon:e.jsx(at,{}),onClick:()=>f(p.artifact_file_key)})].filter(Boolean),children:e.jsx(P.Item.Meta,{title:e.jsx("span",{style:{fontSize:13},children:e.jsxs(E.Text,{ellipsis:{tooltip:!0},children:[s(`type.${p.type}`,{defaultValue:p.type})," ",p.artifact_file_name&&`- ${p.artifact_file_name}`]})}),description:(p.status==="running"||p.status==="pending")&&e.jsx(nt,{percent:p.progress??0,size:"small",style:{marginTop:4}})})},p.id)}),e.jsx("div",{style:{borderTop:"1px solid #f0f0f0",paddingTop:8,marginTop:8,textAlign:"center"},children:e.jsx(S,{type:"link",size:"small",onClick:()=>r("/tasks"),children:s("more",{defaultValue:"More"})})})]});return!o||o.length===0?null:e.jsxs(te,{className:t,overlay:m,placement:"bottomRight",open:a,onOpenChange:i,children:[e.jsx(st,{style:{marginRight:4}}),e.jsx("span",{style:{height:"1em",lineHeight:"1em",marginLeft:2},children:s("tasks",{defaultValue:"Tasks"})})]})},qt=20,Cs=({className:t})=>{const{t:s}=C("inbox"),r=Re(),{user:n}=pe(),{inboxUnreadCount:a,inboxRevision:i,setInboxUnreadCount:o,bumpInboxRevision:l}=fe(),[u,d]=h.useState(!1),{data:f=[],loading:m,run:p}=L(async()=>(await v.inbox.listInboxMessages({current:1,page_size:qt})).data??[],{ready:!!n,refreshDeps:[n==null?void 0:n.id,i]}),c=async k=>{await v.inbox.markInboxMessageRead({id:k}),l(),p()},y=async()=>{await v.inbox.markAllInboxMessagesRead(),o(0),l(),p()},I=()=>e.jsxs("div",{style:{width:420,maxHeight:500,overflow:"auto",padding:8},children:[e.jsx(P,{size:"small",dataSource:f,loading:m,locale:{emptyText:s("empty",{defaultValue:"No messages"})},renderItem:k=>{const w=Rt(k);return e.jsx(P.Item,{style:{cursor:w?"pointer":"default"},onClick:()=>{w&&c(k.id)},children:e.jsx(P.Item.Meta,{title:e.jsx(E.Text,{strong:w,ellipsis:{tooltip:!0},children:Vt(s,k)}),description:e.jsxs(V,{direction:"vertical",size:0,style:{width:"100%"},children:[e.jsx(E.Text,{type:"secondary",ellipsis:{tooltip:!0},children:zt(s,k)}),e.jsx(E.Text,{type:"secondary",style:{fontSize:12},children:k.created_at?new Date(k.created_at).toLocaleString():""})]})})},k.id)}}),e.jsxs("div",{style:{borderTop:"1px solid #f0f0f0",paddingTop:8,marginTop:8,display:"flex",justifyContent:"space-between"},children:[e.jsx(S,{type:"link",size:"small",disabled:a<=0,onClick:()=>void y(),children:s("markAllRead",{defaultValue:"Mark all as read"})}),e.jsx(S,{type:"link",size:"small",onClick:()=>{d(!1),r("/inbox")},children:s("viewAll",{defaultValue:"View all"})})]})]});return e.jsx(te,{className:t,overlay:I,placement:"bottomRight",open:u,onOpenChange:d,children:e.jsx(rt,{count:a,size:"small",overflowCount:99,children:e.jsx(it,{style:{marginRight:4,height:18,width:18,fontSize:18}})})})},Is=({onResize:t,minWidth:s=300,maxWidth:r=window.innerWidth*.5})=>{const[n,a]=h.useState(!1),[i,o]=h.useState(!1),l=h.useCallback(f=>{f.preventDefault(),a(!0)},[]),u=h.useCallback(f=>{if(!n)return;const m=window.innerWidth-f.clientX,p=Math.max(s,Math.min(r,m));t(p)},[n,s,r,t]),d=h.useCallback(()=>{a(!1)},[]);return h.useEffect(()=>{if(n)return document.addEventListener("mousemove",u),document.addEventListener("mouseup",d),document.body.style.cursor="col-resize",document.body.style.userSelect="none",()=>{document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",d),document.body.style.cursor="",document.body.style.userSelect=""}},[n,u,d]),e.jsx("div",{onMouseDown:l,onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),style:{width:"8px",height:"100vh",cursor:"col-resize",position:"relative",flexShrink:0,transition:n?"none":"background-color 0.2s ease",backgroundColor:n?"#1890ff":i?"#bfbfbf":"#e8e8e8",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{style:{width:"3px",height:"40px",borderRadius:"2px",backgroundColor:n||i?"#fff":"#999",opacity:n||i?1:.5,transition:"opacity 0.2s ease",pointerEvents:"none"}})})},H=40,Ut=28,Wt=6,Ee="ai-chat-float-pos",Yt=O(({token:t,css:s})=>({root:s`
    position: fixed;
    z-index: 1050;
    width: ${H}px;
    height: ${H}px;
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
  `}));function F(t,s,r){return Math.min(Math.max(t,s),r)}function D(){return Math.max(0,window.innerWidth-H)}function M(){return Math.max(0,window.innerHeight-H)}function ie(){const t=D(),s=M();return{rx:t>0?F((t-24)/t,0,1):1,ry:s>0?F((s-24)/s,0,1):1,edge:null}}function _e(t,s,r){let n=F(t,0,D()),a=F(s,0,M());return r==="left"&&(n=0),r==="right"&&(n=D()),r==="top"&&(a=0),r==="bottom"&&(a=M()),{x:n,y:a,edge:r}}function Pe(t){const s=D(),r=M();return{rx:s>0?F(t.x/s,0,1):0,ry:r>0?F(t.y/r,0,1):0,edge:t.edge}}function ve(t){return _e(t.rx*D(),t.ry*M(),t.edge)}function Xt(){try{const t=localStorage.getItem(Ee);if(!t)return ie();const s=JSON.parse(t);return typeof s.rx=="number"&&typeof s.ry=="number"?{rx:F(s.rx,0,1),ry:F(s.ry,0,1),edge:s.edge??null}:typeof s.x=="number"&&typeof s.y=="number"?Pe({x:F(s.x,0,D()),y:F(s.y,0,M()),edge:s.edge??null}):ie()}catch{return ie()}}function Se(t){localStorage.setItem(Ee,JSON.stringify(t))}function Jt(t,s){const r=t,n=window.innerWidth-(t+H),a=s,i=window.innerHeight-(s+H),o=Math.min(r,n,a,i);return o>Ut?null:o===r?"left":o===n?"right":o===a?"top":"bottom"}const Kt=({className:t,eyeClassName:s})=>e.jsxs("svg",{className:t,viewBox:"0 0 64 64","aria-hidden":!0,children:[e.jsx("circle",{cx:"32",cy:"12",r:"3.2",fill:"rgba(255,255,255,0.9)"}),e.jsx("rect",{x:"30.4",y:"14",width:"3.2",height:"7",rx:"1.4",fill:"rgba(255,255,255,0.85)"}),e.jsx("rect",{x:"10",y:"22",width:"44",height:"34",rx:"14",fill:"rgba(255,255,255,0.95)"}),e.jsx("rect",{x:"16",y:"28",width:"32",height:"18",rx:"9",fill:"rgba(0,0,0,0.12)"}),e.jsx("ellipse",{className:s,cx:"25",cy:"37",rx:"4.2",ry:"5",fill:"#1f2937"}),e.jsx("ellipse",{className:s,cx:"39",cy:"37",rx:"4.2",ry:"5",fill:"#1f2937"}),e.jsx("circle",{cx:"26.2",cy:"35.5",r:"1.2",fill:"#fff"}),e.jsx("circle",{cx:"40.2",cy:"35.5",r:"1.2",fill:"#fff"}),e.jsx("path",{d:"M26 48c2.2 2.4 9.8 2.4 12 0",stroke:"#1f2937",strokeWidth:"2.2",strokeLinecap:"round",fill:"none"}),e.jsx("rect",{x:"4",y:"34",width:"7",height:"10",rx:"3.5",fill:"rgba(255,255,255,0.9)"}),e.jsx("rect",{x:"53",y:"34",width:"7",height:"10",rx:"3.5",fill:"rgba(255,255,255,0.9)"})]}),Ts=({icon:t})=>{const{styles:s}=Yt(),{setVisible:r,visible:n}=Tt(),{t:a}=C("ai"),i=h.useRef(typeof window>"u"?{rx:1,ry:1,edge:null}:Xt()),[o,l]=h.useState(()=>typeof window>"u"?{x:0,y:0,edge:null}:ve(i.current)),[u,d]=h.useState(!1),f=h.useRef(null),m=h.useRef(o);m.current=o;const p=!u&&o.edge==="left"?s.dockLeft:!u&&o.edge==="right"?s.dockRight:!u&&o.edge==="top"?s.dockTop:!u&&o.edge==="bottom"?s.dockBottom:void 0,c=h.useCallback(g=>{const x=Pe(g);i.current=x,Se(x),l(g)},[]),y=h.useCallback(()=>{f.current||l(ve(i.current))},[]);h.useEffect(()=>(Se(i.current),window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)),[y]);const I=g=>{g.button===0&&(g.currentTarget.setPointerCapture(g.pointerId),f.current={pointerId:g.pointerId,startX:g.clientX,startY:g.clientY,originX:m.current.x,originY:m.current.y,moved:!1},d(!0))},k=g=>{const x=f.current;if(!x||x.pointerId!==g.pointerId)return;const T=g.clientX-x.startX,R=g.clientY-x.startY;!x.moved&&Math.hypot(T,R)>Wt&&(x.moved=!0),l({x:F(x.originX+T,0,D()),y:F(x.originY+R,0,M()),edge:null})},w=g=>{const x=f.current;if(!x||x.pointerId!==g.pointerId)return;try{g.currentTarget.releasePointerCapture(g.pointerId)}catch{}const T=!x.moved;if(f.current=null,d(!1),T){r(!0);return}const R=Jt(m.current.x,m.current.y);c(_e(m.current.x,m.current.y,R))};return n?null:ot.createPortal(e.jsx(J,{title:a("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",mouseEnterDelay:.4,open:u?!1:void 0,children:e.jsx("button",{type:"button","aria-label":a("chat.openAssistant",{defaultValue:"Open AI Assistant"}),className:_("ai-chat-float-button",s.root,u&&s.dragging,!u&&o.edge&&s.docked,p),style:{left:o.x,top:o.y},onPointerDown:I,onPointerMove:k,onPointerUp:w,onPointerCancel:w,children:t??e.jsx("span",{className:s.body,children:e.jsx(Kt,{className:s.robot,eyeClassName:s.eye})})})}),document.body)},Gt=lt,Qt=t=>Gt[t],Ls=({iconName:t})=>{if(!t)return null;const s=Qt(t);return s?e.jsx(h.Suspense,{fallback:null,children:e.jsx(s,{})}):null},As=({className:t,onSuccess:s,token:r})=>{const{message:n}=N.useApp(),{t:a}=C("authorization"),{t:i}=C("common"),[o]=b.useForm(),{run:l,loading:u}=L(async d=>v.authorization.changePassword(d,r?{headers:{Authorization:`Bearer ${r}`}}:{}),{manual:!0,onSuccess:()=>{n.success(a("user.passwordChanged")),o.resetFields(),s==null||s()},onError:d=>{if(d instanceof Et){const f=d.code??"normal";n.error(a(`user.passwordChangeFailed.${f}`,{error:d.message,defaultValue:"Password change failed: {{error}}"}))}else n.error(a("user.passwordChangeFailed.normal",{error:d.message,defaultValue:"Password change failed: {{error}}"}));console.error("Failed to change password:",d)}});return e.jsxs(b,{form:o,layout:"vertical",onFinish:l,style:{maxWidth:500,margin:"0 auto"},className:_("profile-password",t),children:[e.jsx(b.Item,{name:"old_password",label:a("user.oldPassword"),rules:[{required:!0,message:a("validation.oldPasswordRequired")}],className:_("profile-password-item","profile-password-item-old-password"),children:e.jsx(A.Password,{})}),e.jsx(b.Item,{name:"new_password",label:a("user.newPassword"),rules:[{required:!0,message:a("validation.newPasswordRequired")},{min:8,message:a("validation.passwordMinLength")}],className:_("profile-password-item","profile-password-item-new-password"),children:e.jsx(A.Password,{})}),e.jsx(b.Item,{name:"confirm_password",label:a("user.confirmPassword"),className:_("profile-password-item","profile-password-item-confirm-password"),rules:[{required:!0,message:a("validation.confirmPasswordRequired")},({getFieldValue:d})=>({validator(f,m){return!m||d("new_password")===m?Promise.resolve():Promise.reject(new Error(a("validation.passwordMismatch")))}})],children:e.jsx(A.Password,{})}),e.jsx(b.Item,{className:_("profile-password-item","profile-password-item-submit"),children:e.jsx(S,{type:"primary",htmlType:"submit",loading:u,children:i("save")})})]})},Rs=({user:t,onSuccess:s})=>{const{message:r}=N.useApp(),{t:n}=C("authorization"),{t:a}=C("common"),[i]=b.useForm(),[o,l]=h.useState(!1);ct.useEffect(()=>{t&&i.setFieldsValue({username:t.username,email:t.email,full_name:t.full_name,phone:t.phone||"",avatar:t.avatar})},[t,i]);const u=async d=>{try{l(!0),await v.authorization.updateCurrentUser(d),r.success(a("updateSuccess")),s()}catch(f){r.error(a("updateFailed")),console.error("Failed to update user information:",f)}finally{l(!1)}};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs("div",{style:{marginBottom:24,textAlign:"center"},children:[e.jsx("h2",{children:(t==null?void 0:t.full_name)||(t==null?void 0:t.username)}),(t==null?void 0:t.roles)&&t.roles.length>0&&e.jsxs("div",{children:[n("user.roles"),": ",t.roles.map(d=>d.name).join(", ")]})]}),e.jsxs(b,{form:i,layout:"vertical",onFinish:u,style:{width:"100%",maxWidth:500},children:[e.jsx(b.Item,{style:{marginBottom:24,textAlign:"center",justifyItems:"center"},name:"avatar",children:e.jsx(Ht,{})}),e.jsx(b.Item,{name:"username",label:n("user.username"),children:e.jsx(A,{disabled:!0})}),e.jsx(b.Item,{name:"email",label:n("user.email"),rules:[{required:!0,message:n("validation.emailRequired")},{type:"email",message:n("validation.emailInvalid")}],children:e.jsx(A,{})}),e.jsx(b.Item,{name:"full_name",label:n("user.fullName"),rules:[{required:!0,message:n("validation.fullNameRequired")}],children:e.jsx(A,{})}),e.jsx(b.Item,{name:"phone",label:n("user.phone"),children:e.jsx(A,{})}),e.jsx(b.Item,{children:e.jsx(S,{type:"primary",htmlType:"submit",loading:o,children:a("save")})})]})]})},zs=({user:t,onSuccess:s})=>{const{message:r}=N.useApp(),{t:n}=C("authorization"),{t:a}=C("common"),[i,o]=h.useState(0),[l,u]=h.useState(!1),[d,f]=h.useState(!0),[m,p]=h.useState(""),[c,y]=h.useState("totp"),[I,k]=h.useState(!1),[w,g]=h.useState("password"),[x,T]=h.useState(""),[R,q]=h.useState(""),[$,K]=h.useState(""),[xe,ne]=h.useState(""),[U,G]=h.useState(0);h.useEffect(()=>{if(U<=0)return;const j=setTimeout(()=>G(z=>z-1),1e3);return()=>clearTimeout(j)},[U]);const{run:Ne,data:W={secret:"",qr_code:"",token:void 0}}=L(()=>v.authorization.enableMfa({mfa_type:c}),{manual:!0,onSuccess:()=>{o(1)},onBefore:()=>{u(!0)},onFinally:()=>{u(!1)}}),$e=async()=>{if(!m){r.warning(n("mfa.enterVerificationCode"));return}const j={code:m,mfa_type:c};"token"in W&&(j.token=W.token);try{u(!0),await v.authorization.verifyAndActivateMfa(j),r.success(n("mfa.enableSuccess")),o(2),s()}catch(z){r.error(n("mfa.verificationFailed")),console.error("Failed to verify MFA:",z)}finally{u(!1)}},ge=()=>{k(!1),g("password"),T(""),q(""),K(""),ne(""),G(0)},{runAsync:Be,loading:He}=L(()=>v.authorization.sendDisableMfaCode(),{manual:!0}),Oe=async()=>{try{const j=await Be();ne((j==null?void 0:j.token)??""),K(""),G(60),r.success(n("mfa.codeSent",{defaultValue:"Verification code has been sent to your email"}))}catch(j){r.error(j instanceof Error?j.message:a("operationFailed")),console.error("Failed to send disable-MFA code:",j)}},Q=async()=>{if(w==="email"){if(!xe){r.warning(n("mfa.sendCodeFirst",{defaultValue:"Please send the verification code first"}));return}if(!$){r.warning(n("mfa.enterVerificationCode"));return}}else if(w==="totp"){if(!R){r.warning(n("mfa.enterVerificationCode"));return}}else if(!x){r.warning(n("mfa.enterPassword",{defaultValue:"Enter your password"}));return}const j={password:"",mfa_code:"",email_code:"",email_token:""};w==="email"?(j.email_code=$,j.email_token=xe):w==="totp"?j.mfa_code=R:j.password=x;try{u(!0),await v.authorization.disableMfa(j),r.success(n("mfa.disableSuccess")),ge(),s()}catch(z){r.error(z instanceof Error?z.message:a("operationFailed")),console.error("Failed to disable MFA:",z),w==="email"&&(ne(""),K(""),G(0))}finally{u(!1)}},qe=()=>{if(!t)return null;if(t.mfa_enabled)return e.jsx(le,{status:"success",title:n("mfa.enabled"),subTitle:n("mfa.enabledDescription"),extra:e.jsx(S,{danger:!0,onClick:()=>k(!0),children:n("mfa.disable")})});const j=()=>{var z;switch(i){case 0:return e.jsxs("div",{style:{textAlign:"center",marginTop:20},children:[e.jsx(Z,{message:e.jsxs("div",{children:[e.jsx("p",{children:n("mfa.setupInfo")}),e.jsx("p",{children:n(c==="totp"?"mfa.totpDescription":"mfa.emailDescription")})]}),type:"info",showIcon:!0,style:{marginBottom:20}}),e.jsx(S,{type:"primary",onClick:Ne,loading:l,children:n("mfa.startSetup")})]});case 1:return e.jsxs("div",{style:{textAlign:"center",marginTop:20},children:[e.jsx(Z,{message:n("mfa.scanQrCode"),type:"info",showIcon:!0,style:{marginBottom:20,display:c==="totp"?"block":"none"}}),e.jsx("div",{style:{display:c==="totp"?"flex":"none",justifyContent:"center",marginBottom:24},children:e.jsx(pt,{value:W.qr_code??"",size:200})}),e.jsx("div",{style:{marginBottom:16,display:c==="email"?"block":"none"},children:e.jsxs("p",{children:[n("user.email"),": ",e.jsx("strong",{children:t==null?void 0:t.email})]})}),e.jsx("div",{style:{marginBottom:16,display:c==="totp"?"block":"none"},children:e.jsxs("p",{children:[n("mfa.secretKey"),": ",e.jsx("strong",{children:d?"*".repeat(((z=W.secret)==null?void 0:z.length)??0):W.secret}),e.jsx(S,{type:"link",onClick:()=>f(!d),icon:d?e.jsx(ze,{}):e.jsx(ft,{})})]})}),e.jsx("div",{style:{marginBottom:24},children:e.jsx(A,{placeholder:n("mfa.enterCode"),style:{width:200},maxLength:6,value:m,onChange:Ue=>p(Ue.target.value)})}),e.jsxs(V,{children:[e.jsx(S,{onClick:()=>o(0),children:a("previous")}),e.jsx(S,{type:"primary",onClick:$e,loading:l,children:a("verify")})]})]});case 2:return e.jsx(le,{status:"success",title:n("mfa.setupSuccess"),subTitle:n("mfa.setupSuccessDescription"),extra:e.jsx(S,{type:"primary",onClick:()=>o(0),children:a("done")})});default:return null}};return e.jsxs("div",{children:[e.jsxs("div",{style:{display:i===2?"none":"unset"},children:[e.jsx(je,{defaultValue:"totp",onChange:z=>{y(z),o(0)},value:c,options:[{value:"totp",icon:e.jsx(dt,{}),label:n("mfa.totp",{defaultValue:"TOTP"})},{value:"email",icon:e.jsx(ut,{}),label:n("mfa.email",{defaultValue:"E-Mail"})}]}),e.jsx(Ae,{})]}),e.jsx(mt,{current:i,items:[{title:n(c==="totp"?"mfa.totpStep1":"mfa.emailStep1"),description:n(c==="totp"?"mfa.totpStep1Description":"mfa.emailStep1Description")},{title:n(c==="totp"?"mfa.totpStep2":"mfa.emailStep2"),description:n(c==="totp"?"mfa.totpStep2Description":"mfa.emailStep2Description")},{title:n(c==="totp"?"mfa.totpStep3":"mfa.emailStep3"),description:n(c==="totp"?"mfa.totpStep3Description":"mfa.emailStep3Description")}],style:{marginBottom:30}}),j()]})};return e.jsxs("div",{style:{padding:8},children:[qe(),e.jsxs(Le,{title:n("mfa.confirmDisable"),open:I,onOk:Q,okText:n("mfa.disable"),okButtonProps:{danger:!0,loading:l},onCancel:ge,destroyOnHidden:!0,children:[e.jsx(Z,{message:n("mfa.disableWarning"),type:"warning",showIcon:!0,style:{marginBottom:16}}),e.jsx("p",{children:n("mfa.disableVerifyDescription",{defaultValue:"For security reasons, please verify your identity with your password or a verification code."})}),e.jsx(je,{block:!0,value:w,onChange:j=>g(j),options:[{value:"password",label:n("mfa.methodPassword",{defaultValue:"Password"})},...(t==null?void 0:t.mfa_type)==="totp"?[{value:"totp",label:n("mfa.totp",{defaultValue:"TOTP"})}]:[],{value:"email",label:n("mfa.methodEmailCode",{defaultValue:"Email code"})}],style:{marginBottom:16}}),w==="password"&&e.jsx(A.Password,{placeholder:n("mfa.enterPassword",{defaultValue:"Enter your password"}),autoComplete:"current-password",value:x,onChange:j=>T(j.target.value),onPressEnter:Q}),w==="totp"&&e.jsx(A,{placeholder:n("mfa.enterTotpCode",{defaultValue:"Enter the 6-digit code from your authenticator app"}),maxLength:6,value:R,onChange:j=>q(j.target.value),onPressEnter:Q}),w==="email"&&e.jsxs(V.Compact,{style:{width:"100%"},children:[e.jsx(A,{placeholder:n("mfa.enterEmailCode",{defaultValue:"Enter the 6-digit code sent to your email"}),maxLength:6,value:$,onChange:j=>K(j.target.value),onPressEnter:Q}),e.jsx(S,{onClick:Oe,loading:He,disabled:U>0,children:U>0?n("mfa.resendIn",{defaultValue:"Resend ({{seconds}}s)",seconds:U}):n("mfa.sendCode",{defaultValue:"Send code"})})]})]})]})},{Text:oe}=E,Vs=()=>{const{message:t}=N.useApp(),{t:s}=C("authorization"),{t:r}=C("common"),[n,a]=h.useState(null),[i,o]=h.useState(!1),{data:l=[],loading:u,run:d}=L(()=>v.authorization.getUserSessions({}),{onError:c=>{t.error(s("session.getSessionsFailed",{error:c,defaultValue:"Failed to get session list: {{error}}"}))}}),{run:f}=L(c=>v.authorization.terminateSession({id:c}),{onSuccess:()=>{t.success(s("session.terminateSuccess",{defaultValue:"Session terminated successfully"})),d()},onError:c=>{t.error(s("session.terminateFailed",{error:c,defaultValue:"Failed to terminate session: {{error}}"}))},onFinally:()=>{a(null)},onBefore:([c])=>{a(c)},manual:!0}),{run:m}=L(()=>v.authorization.terminateOtherSessions(),{onSuccess:()=>{t.success(s("session.terminateAllSuccess",{defaultValue:"All other sessions terminated successfully"})),d()},onError:c=>{t.error(s("session.terminateAllFailed",{error:c,defaultValue:"Failed to terminate all other sessions: {{error}}"}))},onFinally:()=>{o(!1)},onBefore:()=>{o(!0)},manual:!0}),p=[{title:s("session.device"),dataIndex:"user_agent",key:"device",render:(c,y)=>e.jsxs(V,{direction:"vertical",size:0,children:[e.jsxs(V,{children:[e.jsx(ht,{}),e.jsx(oe,{strong:!0,children:c})]}),e.jsxs(V,{children:[e.jsx(xt,{}),e.jsx(oe,{type:"secondary",children:y.location})]})]})},{title:s("session.ipAddress"),dataIndex:"ip_address",key:"ip_address",render:c=>e.jsxs(V,{children:[e.jsx(gt,{}),e.jsx("span",{children:c})]})},{title:s("session.lastActive"),dataIndex:"last_active_at",key:"last_active",render:c=>e.jsxs(V,{children:[e.jsx(yt,{}),e.jsx("span",{children:new Date(c).toLocaleString()})]})},{title:s("session.status"),key:"status",render:c=>c.is_current?e.jsx(X,{color:"green",children:s("session.current")}):e.jsx(X,{color:"blue",children:s("session.active")})},{title:r("actions"),key:"action",render:c=>c.is_current?e.jsx(oe,{type:"secondary",children:s("session.currentSession")}):e.jsx(ee,{title:s("session.confirmTerminate"),onConfirm:()=>f(c.id),okText:r("confirm"),cancelText:r("cancel"),children:e.jsx(S,{type:"link",danger:!0,loading:n===c.id,children:s("session.terminate")})})}];return e.jsxs(V,{direction:"vertical",style:{padding:8,width:"100%"},children:[e.jsxs(V,{direction:"horizontal",style:{float:"right"},children:[l.length>1&&e.jsx(ee,{title:s("session.confirmTerminateAll"),onConfirm:m,okText:r("confirm"),cancelText:r("cancel"),children:e.jsx(S,{danger:!0,loading:i,children:s("session.terminateOthers")})}),e.jsx(S,{onClick:()=>d(),loading:u,children:r("refresh")})]}),!u&&l.length===0?e.jsx(Ve,{description:s("session.noSessions")}):e.jsx(me,{columns:p,dataSource:l,rowKey:"id",loading:u,pagination:!1})]})},{RangePicker:Zt}=bt,{Option:B}=de,es=t=>t||"N/A",ts=(t,s)=>t==="success"?e.jsx(X,{color:"success",children:s("statuses.success")}):e.jsx(X,{color:"error",children:s("statuses.failed")}),Fs=({userId:t,request:s=n=>t?v.authorization.getUserLogs({id:t,...n}):v.authorization.getCurrentUserLogs(n),columnsFilter:r=n=>n})=>{const{message:n,modal:a}=N.useApp(),{t:i}=C("authorization"),{t:o}=C("common"),[l,u]=h.useState({current:1,pageSize:10,total:0}),[d,f]=h.useState({}),[m]=b.useForm(),{loading:p,run:c,data:{data:y}={}}=L(async(x=d,T=1,R=10)=>s({...x,current:T??1,page_size:R??10}),{onError(x){n.error(i("auditLog.fetchFailed",{error:x}))},onSuccess({total:x}){u({...l,total:x})}});h.useEffect(()=>{c(d,1,l.pageSize)},[]);const I=x=>{u({...l,current:x.current||1,pageSize:x.pageSize||10}),c({},x.current,x.pageSize)},k=x=>{var T,R,q,$;c({...x,start_time:(R=(T=x.dateRange)==null?void 0:T[0])==null?void 0:R.toISOString(),end_time:($=(q=x.dateRange)==null?void 0:q[1])==null?void 0:$.toISOString()},1,l.pageSize)},w=()=>{m.resetFields(),f({}),u({...l,current:1}),c({},1,l.pageSize)},g=[{title:i("auditLog.timestamp"),dataIndex:"timestamp",key:"timestamp",render:x=>Ft(x)},{title:i("auditLog.action"),dataIndex:"action",key:"action",render:(x,T)=>x?i(`action.${x.replace(/:/g,".")}`,{defaultValue:i(`permission.title.${x.replace(/:/g,".")}`,{defaultValue:T.action_name})}):T.action_name??T.action},{title:i("auditLog.user_agent"),dataIndex:"user_agent",key:"user_agent"},{title:i("auditLog.ip"),dataIndex:"ip",key:"ip",render:x=>es(x)},{title:i("auditLog.status"),dataIndex:"status",key:"status",render:x=>ts(x,i)},{title:i("auditLog.details"),dataIndex:"details",key:"details",render:x=>e.jsx(S,{type:"link",icon:e.jsx(ze,{}),onClick:()=>{a.info({title:i("auditLog.details"),content:JSON.stringify(x)})}})}];return e.jsxs("div",{children:[e.jsx(ce,{style:{marginBottom:16},children:e.jsx(b,{form:m,layout:"horizontal",onFinish:k,initialValues:d,children:e.jsxs(jt,{gutter:[16,16],children:[e.jsx(Y,{xxl:6,xl:6,lg:8,sm:12,xs:24,children:e.jsx(b.Item,{name:"search",noStyle:!0,children:e.jsx(A,{placeholder:i("auditLog.searchPlaceholder")})})}),e.jsx(Y,{xxl:4,xl:6,lg:8,sm:12,xs:24,children:e.jsx(b.Item,{name:"action",noStyle:!0,children:e.jsxs(de,{allowClear:!0,placeholder:i("auditLog.selectAction"),style:{width:"100%"},children:[e.jsx(B,{value:"login",children:i("actions.login")}),e.jsx(B,{value:"logout",children:i("actions.logout")}),e.jsx(B,{value:"password_reset",children:i("actions.passwordReset")}),e.jsx(B,{value:"mfa_change",children:i("actions.mfaChange")})]})})}),e.jsx(Y,{xxl:3,xl:6,lg:8,sm:12,xs:24,children:e.jsx(b.Item,{name:"status",noStyle:!0,children:e.jsxs(de,{allowClear:!0,placeholder:i("auditLog.selectStatus"),style:{width:"100%"},children:[e.jsx(B,{value:"success",children:i("statuses.success")}),e.jsx(B,{value:"failed",children:i("statuses.failed")})]})})}),e.jsx(Y,{xxl:6,xl:6,lg:10,md:12,sm:12,xs:24,children:e.jsx(b.Item,{name:"dateRange",noStyle:!0,children:e.jsx(Zt,{style:{width:"100%"}})})}),e.jsx(Y,{xxl:5,xl:24,lg:14,md:24,sm:24,xs:24,style:{textAlign:"right"},children:e.jsxs(V,{children:[e.jsx(S,{onClick:w,children:o("reset")}),e.jsx(S,{type:"primary",htmlType:"submit",icon:e.jsx(wt,{}),children:o("search")})]})})]})})}),e.jsx(ce,{children:e.jsx(me,{rowKey:"id",columns:r(g),dataSource:y,pagination:{...l,showSizeChanger:!0,showTotal:x=>o("totalItems",{total:x})},loading:p,onChange:I,scroll:{x:"max-content"}})})]})},ss=({request:t,tableRef:s,...r},n)=>{const[a,i]=h.useState({current:1,pageSize:10}),[o,l]=h.useState(0),{data:u,loading:d,refresh:f}=L(async()=>{const m=await t({current:a.current,page_size:a.pageSize});return l(m.total),m.data},{refreshDeps:[a]});return h.useImperativeHandle(n,()=>({reload:()=>{f()}})),e.jsx(me,{rowKey:"id",loading:d,dataSource:u??[],pagination:{...a,total:o,onChange:(m,p)=>{i({current:m,pageSize:p})}},...r,ref:s})},Es=({actionRef:t,...s})=>{const[r,n]=h.useState();return h.useEffect(()=>{n(h.forwardRef(ss))},[]),r?e.jsx(r,{...s,ref:t}):null},De=({permission:t,permissions:s=[],checkAll:r=!1,fallback:n=null,children:a})=>{const{hasPermission:i,hasAnyPermission:o,hasAllPermissions:l,isAdmin:u,loading:d}=Fe();return d?null:u?e.jsx(e.Fragment,{children:a}):t?i(t)?e.jsx(e.Fragment,{children:a}):e.jsx(e.Fragment,{children:n}):s.length>0?(r?l(s):o(s))?e.jsx(e.Fragment,{children:a}):e.jsx(e.Fragment,{children:n}):e.jsx(e.Fragment,{children:a})},ke=t=>{const[s,r]=h.useState(!1),{permission:n,icon:a,tooltip:i,onClick:o,confirm:l,label:u,...d}=t,f=!!d.disabled,m=o?async()=>{r(!0);try{await o()}finally{r(!1)}}:void 0;let p=e.jsx(S,{type:"link",size:"small",loading:s,icon:a,onClick:l&&!f?void 0:m,...d,children:u&&e.jsx("span",{style:{position:"inherit",top:"-2px"},children:u})});if(l&&!f){const c=async()=>{l.onConfirm?await l.onConfirm():m&&await m()};p=e.jsx(ee,{title:l.title,description:l.description,onConfirm:c,okText:l.okText,cancelText:l.cancelText,children:p})}return i&&(p=f?e.jsx(J,{title:i,children:e.jsx("span",{style:{display:"inline-block",cursor:"not-allowed"},children:p})}):e.jsx(J,{title:i,children:p})),n&&(p=e.jsx(De,{permission:n,children:p})),p},_s=({actions:t,maxVisibleItems:s})=>{const{modal:r}=N.useApp(),n=t.filter(l=>!l.hidden);if(!s||n.length<=s)return e.jsx(e.Fragment,{children:n.map(({key:l,...u})=>e.jsx(ke,{...u},l))});const a=n.slice(0,s-1),o=n.slice(s-1).map(l=>{const{key:u,label:d,icon:f,permission:m,onClick:p,confirm:c,disabled:y,tooltip:I}=l,w={key:u,label:d,icon:f,disabled:y,onClick:async()=>{c?r.confirm({title:c.title,content:c.description,onOk:c.onConfirm||p,okText:c.okText,cancelText:c.cancelText}):p&&await p()}};return m?{...w,label:e.jsx(De,{permission:m,children:e.jsx("span",{children:d??I})})}:w});return e.jsxs(e.Fragment,{children:[a.map(({key:l,...u})=>e.jsx(ke,{...u},l)),e.jsx(Te,{menu:{items:o},trigger:["click"],children:e.jsx(S,{type:"text",size:"small",icon:e.jsx(vt,{})})})]})},{Text:ns}=E,Ps=({kind:t,subjectId:s,readOnly:r})=>{const{message:n}=N.useApp(),{t:a}=C("authorization"),{t:i}=C("common"),[o]=b.useForm(),l=t==="user"?v.authorization.getUserRateLimit:v.authorization.getServiceAccountRateLimit,u=t==="user"?v.authorization.updateUserRateLimit:v.authorization.updateServiceAccountRateLimit,{data:d,loading:f,refresh:m}=L(()=>l({id:s}),{ready:!!s,refreshDeps:[s,t],onSuccess:g=>{o.setFieldsValue({rate:g.rate,period:g.period||"1m",burst:g.burst,quota:g.quota,quota_period:g.quota_period||"1d",enabled:g.enabled!==!1})}}),{run:p,loading:c}=L(async g=>u({id:s},{...g,clear:!1,inherited:!1,enabled:g.enabled!==!1}),{manual:!0,onSuccess:()=>{n.success(a("rateLimit.saveSuccess",{defaultValue:"Rate limit override saved"})),m()},onError:g=>{n.error(g.message||a("rateLimit.saveFailed",{defaultValue:"Failed to save override"}))}}),{run:y,loading:I}=L(async()=>u({id:s},{clear:!0,rate:0,burst:0,quota:0,period:"",quota_period:"",enabled:!1,inherited:!0}),{manual:!0,onSuccess:()=>{n.success(a("rateLimit.resetSuccess",{defaultValue:"Override cleared; type default restored"})),m()},onError:g=>{n.error(g.message)}}),{run:k,loading:w}=L(async()=>t==="user"?v.authorization.resetUserRateLimit({id:s}):v.authorization.resetServiceAccountRateLimit({id:s}),{manual:!0,onSuccess:()=>{n.success(a("rateLimit.resetCountersSuccess",{defaultValue:"Counters reset"}))},onError:g=>{n.error(g.message)}});return e.jsxs(b,{form:o,layout:"vertical",onFinish:p,disabled:r||f,style:{maxWidth:480,marginTop:16},children:[(d==null?void 0:d.inherited)&&e.jsx(Z,{type:"info",showIcon:!0,style:{marginBottom:16},message:a("rateLimit.inherited",{defaultValue:"Using the type default. Save to create a subject-specific override."})}),e.jsx(b.Item,{name:"rate",label:a("rateLimit.rate",{defaultValue:"Rate"}),rules:[{required:!0}],children:e.jsx(ae,{min:1,style:{width:"100%"}})}),e.jsx(b.Item,{name:"period",label:a("rateLimit.period",{defaultValue:"Period"}),extra:a("rateLimit.periodHint",{defaultValue:"Examples: 1s, 1m, 1h"}),children:e.jsx(A,{placeholder:"1m"})}),e.jsx(b.Item,{name:"burst",label:a("rateLimit.burst",{defaultValue:"Burst"}),children:e.jsx(ae,{min:1,style:{width:"100%"}})}),e.jsx(b.Item,{name:"quota",label:a("rateLimit.quota",{defaultValue:"Daily quota (0 = none)"}),children:e.jsx(ae,{min:0,style:{width:"100%"}})}),e.jsx(b.Item,{name:"quota_period",label:a("rateLimit.quotaPeriod",{defaultValue:"Quota period"}),children:e.jsx(A,{placeholder:"1d"})}),e.jsx(b.Item,{name:"enabled",label:a("rateLimit.enabled",{defaultValue:"Enabled"}),valuePropName:"checked",extra:a("rateLimit.enabledHint",{defaultValue:"Off: this override is ignored and the type default applies. Use Reset to default to delete the override."}),children:e.jsx(St,{})}),!r&&e.jsxs(V,{children:[e.jsx(S,{type:"primary",htmlType:"submit",loading:c,children:i("save",{defaultValue:"Save"})}),e.jsx(ee,{title:a("rateLimit.resetCountersConfirm",{defaultValue:"Reset rate-limit and quota counters for this subject? They will be able to send requests immediately."}),onConfirm:()=>k(),children:e.jsx(S,{htmlType:"button",icon:e.jsx(kt,{}),loading:w,children:a("rateLimit.resetCounters",{defaultValue:"Reset counters"})})}),!(d!=null&&d.inherited)&&e.jsx(S,{onClick:()=>y(),loading:I,children:a("rateLimit.resetToDefault",{defaultValue:"Reset to default"})})]}),(d==null?void 0:d.inherited)&&e.jsx(ns,{type:"secondary",children:a("rateLimit.sourceHint",{defaultValue:"Values shown are inherited."})})]})},{Text:Ce}=E,as={debug:"default",info:"processing",warn:"warning",error:"error"},Ds=({taskId:t,poll:s})=>{const{t:r}=C("task"),{data:n=[],loading:a}=L(()=>t?v.tasks.getTaskLogs({id:t}):Promise.reject(new Error("No task id")),{refreshDeps:[t],ready:!!t,pollingInterval:s?2e3:0});return e.jsx(ce,{title:r("logsTitle",{defaultValue:"Task logs"}),size:"small",style:{marginTop:16},children:a&&!n.length?e.jsx("div",{style:{textAlign:"center",padding:24},children:e.jsx(ue,{})}):n.length?e.jsx("pre",{style:{margin:0,padding:12,maxHeight:320,overflow:"auto",fontSize:12,background:"var(--ant-colorFillTertiary)",borderRadius:6,whiteSpace:"pre-wrap",wordBreak:"break-all"},children:n.map(i=>e.jsxs("div",{style:{marginBottom:4},children:[e.jsx(Ce,{type:"secondary",style:{fontSize:11},children:i.created_at}),i.level&&e.jsxs(Ce,{type:as[i.level],style:{marginLeft:8,fontSize:11},children:["[",i.level,"]"]}),e.jsx("div",{style:{display:"inline",marginLeft:8},children:i.message})]},i.id))}):e.jsx(Ve,{description:r("noLogs",{defaultValue:"No logs yet."})})})},rs=O(({token:t,css:s})=>({wrap:s`
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
  `}));function is(t){const s=t.trim();if(!s)return"";try{return JSON.stringify(JSON.parse(s),null,2)}catch{return s}}function os(t){const s=t.description;if(typeof s=="string"&&s.trim())return s.trim();try{const r=JSON.parse(t.arguments||"{}");return typeof r.description=="string"?r.description.trim():""}catch{return""}}function Me(t,s){return t?t.id==="approve"?s("chat.hitlExecute",{defaultValue:t.label||"Execute"}):t.id==="reject"?s("chat.hitlDontExecute",{defaultValue:t.label||"Don't execute"}):t.label:""}function ls(t,s,r){var a;const n=(a=t.options)==null?void 0:a.find(i=>i.id===s);return Me(n,r)||s||"…"}const Ms=({card:t,submitting:s=!1,onSelect:r})=>{var k,w;const{t:n}=C("ai"),{styles:a}=rs(),i=is(t.arguments||""),[o,l]=h.useState(t.selected_option_id||"");h.useEffect(()=>{l(t.selected_option_id||"")},[t.selected_option_id,t.tool_call_id]);const u=o||t.selected_option_id||"",d=((k=t.title)==null?void 0:k.trim())||t.tool_name,f=!!((w=t.title)!=null&&w.trim()&&t.tool_name&&t.title.trim()!==t.tool_name&&t.tool_name!=="ui_choose"),m=t.kind==="choice"||t.tool_name==="ui_choose",p=os(t),c=!m&&!!i,y=t.status==="abandoned"||t.status==="decided";let I;return t.status==="abandoned"?I=e.jsx(E.Text,{type:"secondary",children:n("chat.hitlAbandoned",{defaultValue:"You continued without choosing."})}):y&&u?I=e.jsx(E.Text,{children:n("chat.hitlChose",{defaultValue:"You chose {{label}}.",label:ls(t,u,n)})}):y?I=e.jsx(E.Text,{children:n("chat.hitlChose",{defaultValue:"You chose {{label}}.",label:"…"})}):I=e.jsx("div",{className:a.actions,children:(t.options??[]).map(g=>{const x=u===g.id;return e.jsx(S,{className:a.action,type:x?"primary":"default",loading:s&&x,disabled:s,onClick:()=>{l(g.id),r==null||r(g.id)},children:e.jsxs(be,{vertical:!0,align:"flex-start",children:[e.jsx("span",{children:Me(g,n)}),g.description?e.jsx("span",{style:{fontSize:12,fontWeight:400,opacity:.85},children:g.description}):null]})},g.id)})}),e.jsxs("div",{className:a.wrap,children:[e.jsxs("div",{className:a.header,children:[e.jsx("span",{className:a.title,children:d}),f?e.jsx(E.Text,{className:a.toolName,type:"secondary",code:!0,children:t.tool_name}):null]}),e.jsxs(be,{vertical:!0,gap:8,children:[p?e.jsx("div",{className:a.description,children:p}):null,c?e.jsx(Ct,{className:a.arguments,ghost:!0,size:"small",items:[{key:"arguments",label:n("chat.hitlArguments",{defaultValue:"Arguments"}),children:e.jsx("pre",{className:a.argsPre,children:i})}]}):null,I]})]})};function cs(t){try{return JSON.stringify(JSON.parse(t),null,2)}catch{return t}}const se=O(({token:t,css:s})=>({root:s`
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
  `}));function ds({open:t}){const{styles:s,cx:r}=se();return e.jsx("svg",{className:r(s.chevron,t&&s.chevronOpen),width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M6 4.5 10 8 6 11.5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function us(){return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:[e.jsx("rect",{x:"6",y:"6",width:"7",height:"7",rx:"1.4",fill:"none",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M10 6V4.2A1.2 1.2 0 0 0 8.8 3H4.2A1.2 1.2 0 0 0 3 4.2v4.6A1.2 1.2 0 0 0 4.2 10H6",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}function ms(){return e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M3.5 8.2 6.4 11 12.5 5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Ie({call:t}){var u;const{styles:s,cx:r}=se(),{t:n}=C("ai"),a=t.status==="running"||t.status==="pending",i=t.status==="failed",o=i?n("chat.toolFailed",{defaultValue:"Failed"}):a?n("chat.toolRunning",{defaultValue:"Running"}):n("chat.toolDone",{defaultValue:"Done"}),l=(u=t.title)==null?void 0:u.trim();return e.jsxs(e.Fragment,{children:[e.jsx("code",{className:s.name,children:t.name}),l?e.jsx("span",{className:s.title,title:l,children:l}):null,e.jsx("span",{className:r(s.status,a&&s.statusRunning,i&&s.statusFailed),children:o})]})}function ps({call:t}){const{styles:s}=se(),r=t.status==="running"||t.status==="pending";return t.arguments?e.jsx("section",{className:s.run,"aria-busy":r,children:e.jsxs("details",{className:s.run,children:[e.jsx("summary",{className:s.summary,children:e.jsx(Ie,{call:t})}),e.jsx("pre",{className:s.pre,children:cs(t.arguments)})]})}):e.jsx("section",{className:s.run,"aria-busy":r,children:e.jsx("p",{className:s.line,children:e.jsx(Ie,{call:t})})})}function Ns({text:t,tools:s=[],live:r=!1,align:n="start"}){const{styles:a,cx:i}=se(),{t:o}=C("ai"),[l,u]=h.useState(r),[d,f]=h.useState(!1),m=d?o("chat.copied",{defaultValue:"Copied"}):o("chat.copyMessage",{defaultValue:"Copy message"}),p=l?o("chat.hideToolCalls",{defaultValue:"Hide tool calls"}):o("chat.showToolCalls",{defaultValue:"Show tool calls"});async function c(){try{await navigator.clipboard.writeText(t),f(!0),window.setTimeout(()=>f(!1),1200)}catch{f(!1)}}return!t&&s.length===0?null:e.jsxs("div",{className:i("chat-message-actions",a.root,n==="end"&&a.rootEnd,l&&s.length>0&&"has-tools"),children:[e.jsxs("div",{className:a.actions,children:[t?e.jsx(J,{title:m,placement:"bottom",children:e.jsx("button",{type:"button",className:a.action,"aria-label":m,onClick:()=>void c(),children:d?e.jsx(ms,{}):e.jsx(us,{})})}):null,s.length>0?e.jsx(J,{title:p,placement:"bottom",children:e.jsx("button",{type:"button",className:a.action,"aria-expanded":l,"aria-label":p,onClick:()=>u(y=>!y),children:e.jsx(ds,{open:l})})}):null]}),s.length>0?e.jsx("div",{className:i("chat-tool-log",a.rows),hidden:!l,children:s.map(y=>e.jsx(ps,{call:y},y.id))}):null]})}export{vs as A,Ns as C,Ls as D,te as H,Cs as I,we as L,Ss as O,bs as P,Is as R,ks as T,Fs as U,ws as a,Ts as b,As as c,Rs as d,zs as e,Vs as f,_s as g,Es as h,De as i,Ps as j,Ht as k,Nt as l,Ds as m,Ms as n};
