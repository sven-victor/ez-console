const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/json-schema-config-form.C_xwqITJ.js","assets/vendor.JFuLF-67.js","assets/vite.CnSqVV0U.js","assets/lodash.Bb75kzRV.js","assets/highlight.DHmnecVl.js","assets/codemirror.RzcuPkri.js","assets/vendor.CfZ7kyuK.css","assets/index.vTK9lK9Z.js","assets/ai.C1qJAG3F.js","assets/client.DEbcEUiT.js","assets/base.LsNFKjxW.js","assets/authorization.uBgWRF3k.js","assets/inbox.B0Zi8gpL.js","assets/system.BdUR1qNe.js","assets/oauth.Da0oBiYh.js","assets/tasks.CJ6vdJVz.js","assets/contexts.DRlveXlw.js","assets/ai-chat-layout.D0S6cqeA.js","assets/index.CiFTqlrA.css"])))=>i.map(i=>d[i]);
import{j as e,S as me,u as C,R as ce,N as je,D as Ae,a as E,b as $,A as Xe,r as p,I as Ke,U as Ge,M as Re,d as L,P as Qe,e as Ze,f as et,L as P,g as tt,h as ze,i as st,k as nt,l as at,m as _e,n as rt,o as it,T as V,B as S,p as ot,q as J,s as lt,t as ct,v as _,w as dt,x as X,y as ut,z as be,C as we,E as mt,F as N,G as b,H as A,J as pt,K as ee,O as ve,Q as ht,V as ft,W as xt,X as gt,Y as Fe,Z as yt,_ as jt,$ as bt,a0 as wt,a1 as vt,a2 as te,a3 as Ve,a4 as pe,a5 as de,a6 as St,a7 as Y,a8 as ue,a9 as kt,aa as Ct,ab as Tt,ac as re,ad as It,ae as Lt,af as Se,ag as At}from"./vendor.JFuLF-67.js";import{u as he,a as Ee,b as fe,c as Rt,d as zt}from"./contexts.DRlveXlw.js";import{g as _t,i as Ft,a as Vt,b as Et,c as Pt,f as Dt}from"./base.LsNFKjxW.js";import{a as v}from"./index.vTK9lK9Z.js";import{b as ie,A as Mt}from"./client.DEbcEUiT.js";import{f as $t}from"./lodash.Bb75kzRV.js";import{_ as Pe}from"./vite.CnSqVV0U.js";const se=({style:t,size:s="large"})=>e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100%",...t},children:e.jsx(me,{size:s})}),Ls=({element:t,requiredPermission:s,requiredPermissions:r})=>{const{t:n}=C(),{user:a,loading:i,error:o}=he(),{hasPermission:l,hasAllPermissions:u}=Ee();return i?e.jsx(se,{}):o?o.code==="E4011"?e.jsx(se,{}):e.jsx(ce,{status:"500",title:"500",subTitle:n("login.fetchCurrentUserError",{defaultValue:"Failed to fetch current user: {{error}}",error:(o==null?void 0:o.message)||o})}):a?s&&!l(s)?e.jsx(je,{to:"/forbidden",replace:!0}):r&&!u(r)?e.jsx(je,{to:"/forbidden",replace:!0}):t:(window.location.href=_t("/login?redirect="+encodeURIComponent(window.location.href)),null)},Nt=$(({token:t,css:s})=>({container:s`
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
    `,iconStyle:{cursor:"pointer",padding:"12px",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:18,verticalAlign:"middle","&:hover":{color:t.colorPrimaryTextHover}}})),K=({overlayClassName:t,overlay:s,hidden:r,children:n,...a})=>{const{styles:i}=Nt();return r?e.jsx(e.Fragment,{}):e.jsx(Ae,{popupRender:s,overlayClassName:E(i.container,t),...a,children:e.jsx("span",{className:i.iconStyle,children:n})})},Bt=()=>e.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",children:[e.jsx("path",{d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",className:"css-c4d79v"})]}),Ht=$(()=>({menuItemStyle:{minWidth:"160px"},menuItemIconStyle:{marginRight:"8px"}})),Ot=[{lang:"en-US",label:"English",icon:"🇺🇸"},{lang:"sv-SE",label:"Svenska",icon:"🇸🇪"},{lang:"ar-AE",label:"العربية",icon:"🇦🇪"},{lang:"de-DE",label:"Deutsch",icon:"🇩🇪"},{lang:"es-ES",label:"Español",icon:"🇪🇸"},{lang:"fr-FR",label:"Français",icon:"🇫🇷"},{lang:"zh-CN",label:"中文",icon:"🇨🇳"}],As=({transformLangConfig:t=r=>r,className:s})=>{const{i18n:r}=C(),{styles:n}=Ht(),a=o=>{r.changeLanguage(o)},i={selectedKeys:[r.language],onClick:o=>{a(o.key)},items:t(Ot).map(o=>({key:o.lang,className:n.menuItemStyle,label:e.jsxs(e.Fragment,{children:[e.jsx("span",{role:"img","aria-label":(o==null?void 0:o.label)||"en-US",className:n.menuItemIconStyle,children:(o==null?void 0:o.icon)||"🌐"}),(o==null?void 0:o.label)||"en-US"]})}))};return e.jsx(K,{className:s,menu:i,children:e.jsx(Bt,{})})},qt=$(({css:t})=>({avatarItem:t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `})),xe=t=>$t(t)&&t.match(/^[-_a-zA-Z0-9]+$/)?ie.endsWith("/")?ie+`files/${t}`:ie+`/files/${t}`:t,Rs=({src:t,fallback:s,...r})=>e.jsx(Xe,{src:xe(t),icon:s,...r}),Ut=({onChange:t,shape:s="square"})=>{const[r,n]=p.useState([]),{styles:a}=qt(),[i,o]=p.useState(!1),[l,u]=p.useState(!0),[d,f]=p.useState(0),{run:m,loading:h}=L(()=>v.base.listFiles({current:d+1,page_size:40,file_type:"avatar",access:"public",search:""}),{manual:!0,onSuccess:({data:x})=>{console.log(x),n([...r,...x]),u(x.length===40),f(d+1)}}),c=()=>{u(!0),f(0),n([])};return e.jsx(Qe,{style:{zIndex:1e3},onOpenChange:x=>{o(x),x?m():c()},open:i,content:e.jsx("div",{style:{width:360,height:200},children:e.jsx("div",{id:"iconsScrollableDiv",style:{height:"100%",overflow:"auto"},children:e.jsx(et,{dataLength:r.length,next:()=>{m()},hasMore:l,loader:e.jsx(st,{avatar:!0,paragraph:{rows:1},active:!0}),endMessage:e.jsx(ze,{plain:!0,children:"End"}),scrollableTarget:"iconsScrollableDiv",children:e.jsx(P,{grid:{gutter:16,column:8},dataSource:r,style:{margin:"0 8px"},loading:h,renderItem:({id:x})=>e.jsx("div",{className:a.avatarItem,onClick:T=>{T.stopPropagation(),t==null||t(x),o(!1),c()},children:e.jsx(tt,{src:xe(x),placeholder:e.jsx(me,{size:"default"}),preview:!1})})})})})}),placement:"bottom",trigger:"hover",children:e.jsx(Ze,{shape:s,style:{width:112,height:112,placeContent:"center"}})})},Wt=({value:t,onChange:s,shape:r,...n})=>{const[a,i]=p.useState(void 0),[o,l]=p.useState(!1),[u,d]=p.useState(void 0),f=async m=>{l(!0),d(m.url??m.preview)};return p.useEffect(()=>{i(t?{uid:t,name:t,url:xe(t)}:void 0)},[t]),e.jsxs(e.Fragment,{children:[e.jsx(Ke,{beforeCrop:async m=>{if(m.type==="image/svg+xml"){const h=await v.base.uploadFile({type:"avatar"},m);return h.length>0&&(s==null||s(h[0].id)),!1}return!0},children:e.jsx(Ge,{customRequest:async m=>{var c,x;const h=await v.base.uploadFile({type:"avatar",access:"public"},m.file);h.length>0?((c=m.onSuccess)==null||c.call(m,h[0].id),s==null||s(h[0].id)):(x=m.onError)==null||x.call(m,new Error("Upload file failed"))},listType:"picture-card",onPreview:f,maxCount:1,onChange:({file:m})=>{switch(m.status){case"removed":s==null||s(void 0);break;case"done":break;default:i(m);break}},fileList:a?[a]:[],...n,children:a?void 0:e.jsx(Ut,{shape:r,onChange:s})})}),e.jsx(Re,{open:o,footer:null,onCancel:()=>l(!1),children:e.jsx("img",{style:{width:"100%"},src:u})})]})},zs=({className:t})=>{const{t:s}=C("common"),{user:r}=he(),{currentOrgId:n,setCurrentOrgId:a}=fe(),i=(r==null?void 0:r.organizations)||[],o=f=>{a(f),window.location.reload()};if(i.length===0)return null;const l=i.find(f=>f.id===n),u=l?l.name:s("organization.global",{defaultValue:"Global"}),d=[...i.map(f=>({key:f.id,label:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{children:f.name}),n===f.id&&e.jsx(nt,{})]}),onClick:()=>o(f.id)}))];return e.jsxs(K,{className:t,menu:{items:d,selectedKeys:n?[n]:[""]},children:[e.jsx(at,{style:{marginRight:4}}),e.jsx("span",{style:{height:"1em",lineHeight:"1em",marginLeft:"5px"},children:u})]})},Yt={pending:"default",running:"processing",success:"success",failed:"error",cancelled:"default"},_s=({className:t})=>{const{t:s}=C("task"),r=_e(),{user:n}=Rt(),{tasksDropdownOpen:a,setTasksDropdownOpen:i,tasks:o,setTasks:l}=fe(),{runAsync:u,loading:d}=L(async()=>v.tasks.listUserTasks({}),{onSuccess:h=>{Ft(o,h,(c,x)=>c.id===x.id&&c.status===x.status&&c.progress===x.progress)||l(h)},pollingInterval:a?3e3:6e4,ready:!!n,refreshDeps:[n]});p.useEffect(()=>{a&&u()},[a]);const f=async h=>{const c=await v.base.downloadFile({fileKey:h},{params:{method:"sign"}}),x=`/api/files/${h}?signature=${c.signature}&expires=${c.expires}`;window.open(x,"_blank")},m=()=>e.jsxs("div",{style:{width:520,maxHeight:500,overflow:"auto",padding:8},children:[e.jsx(P,{size:"small",dataSource:o,loading:d,renderItem:h=>e.jsx(P.Item,{extra:e.jsx(J,{color:Yt[h.status],style:{marginLeft:6},children:s(`status.${h.status}`,{defaultValue:h.status})}),actions:[h.artifact_file_key&&e.jsx(S,{type:"text",size:"small",icon:e.jsx(ot,{}),onClick:()=>f(h.artifact_file_key)})].filter(Boolean),children:e.jsx(P.Item.Meta,{title:e.jsx("span",{style:{fontSize:13},children:e.jsxs(V.Text,{ellipsis:{tooltip:!0},children:[s(`type.${h.type}`,{defaultValue:h.type})," ",h.artifact_file_name&&`- ${h.artifact_file_name}`]})}),description:(h.status==="running"||h.status==="pending")&&e.jsx(it,{percent:h.progress??0,size:"small",style:{marginTop:4}})})},h.id)}),e.jsx("div",{style:{borderTop:"1px solid #f0f0f0",paddingTop:8,marginTop:8,textAlign:"center"},children:e.jsx(S,{type:"link",size:"small",onClick:()=>r("/tasks"),children:s("more",{defaultValue:"More"})})})]});return!o||o.length===0?null:e.jsxs(K,{className:t,overlay:m,placement:"bottomRight",open:a,onOpenChange:i,children:[e.jsx(rt,{style:{marginRight:4}}),e.jsx("span",{style:{height:"1em",lineHeight:"1em",marginLeft:2},children:s("tasks",{defaultValue:"Tasks"})})]})},Jt=20,Fs=({className:t})=>{const{t:s}=C("inbox"),r=_e(),{user:n}=he(),{inboxUnreadCount:a,inboxRevision:i,setInboxUnreadCount:o,bumpInboxRevision:l}=fe(),[u,d]=p.useState(!1),{data:f=[],loading:m,run:h}=L(async()=>(await v.inbox.listInboxMessages({current:1,page_size:Jt})).data??[],{ready:!!n,refreshDeps:[n==null?void 0:n.id,i]}),c=async k=>{await v.inbox.markInboxMessageRead({id:k}),l(),h()},x=async()=>{await v.inbox.markAllInboxMessagesRead(),o(0),l(),h()},T=()=>e.jsxs("div",{style:{width:420,maxHeight:500,overflow:"auto",padding:8},children:[e.jsx(P,{size:"small",dataSource:f,loading:m,locale:{emptyText:s("empty",{defaultValue:"No messages"})},renderItem:k=>{const w=Vt(k);return e.jsx(P.Item,{style:{cursor:w?"pointer":"default"},onClick:()=>{w&&c(k.id)},children:e.jsx(P.Item.Meta,{title:e.jsx(V.Text,{strong:w,ellipsis:{tooltip:!0},children:Pt(s,k)}),description:e.jsxs(_,{direction:"vertical",size:0,style:{width:"100%"},children:[e.jsx(V.Text,{type:"secondary",ellipsis:{tooltip:!0},children:Et(s,k)}),e.jsx(V.Text,{type:"secondary",style:{fontSize:12},children:k.created_at?new Date(k.created_at).toLocaleString():""})]})})},k.id)}}),e.jsxs("div",{style:{borderTop:"1px solid #f0f0f0",paddingTop:8,marginTop:8,display:"flex",justifyContent:"space-between"},children:[e.jsx(S,{type:"link",size:"small",disabled:a<=0,onClick:()=>void x(),children:s("markAllRead",{defaultValue:"Mark all as read"})}),e.jsx(S,{type:"link",size:"small",onClick:()=>{d(!1),r("/inbox")},children:s("viewAll",{defaultValue:"View all"})})]})]});return e.jsx(K,{className:t,overlay:T,placement:"bottomRight",open:u,onOpenChange:d,children:e.jsx(lt,{count:a,size:"small",overflowCount:99,children:e.jsx(ct,{style:{marginRight:4,height:18,width:18,fontSize:18}})})})},Xt=$(({token:t,css:s})=>({root:s`
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
  `})),Vs=({onResize:t,minWidth:s=300,maxWidth:r=window.innerWidth*.5})=>{const{styles:n}=Xt(),[a,i]=p.useState(!1),[o,l]=p.useState(!1),u=p.useCallback(m=>{m.preventDefault(),i(!0)},[]),d=p.useCallback(m=>{if(!a)return;const h=window.innerWidth-m.clientX,c=Math.max(s,Math.min(r,h));t(c)},[a,s,r,t]),f=p.useCallback(()=>{i(!1)},[]);return p.useEffect(()=>{if(a)return document.addEventListener("mousemove",d),document.addEventListener("mouseup",f),document.body.style.cursor="col-resize",document.body.style.userSelect="none",()=>{document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",f),document.body.style.cursor="",document.body.style.userSelect=""}},[a,d,f]),e.jsx("div",{onMouseDown:u,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),className:E(n.root,a&&n.dragging),children:e.jsx("div",{className:E(n.grip,o&&n.gripHover,a&&n.gripDragging)})})},O=40,Kt=28,Gt=6,De="ai-chat-float-pos",Qt=$(({token:t,css:s})=>({root:s`
    position: fixed;
    z-index: 1050;
    width: ${O}px;
    height: ${O}px;
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
  `}));function F(t,s,r){return Math.min(Math.max(t,s),r)}function D(){return Math.max(0,window.innerWidth-O)}function M(){return Math.max(0,window.innerHeight-O)}function oe(){const t=D(),s=M();return{rx:t>0?F((t-24)/t,0,1):1,ry:s>0?F((s-24)/s,0,1):1,edge:null}}function Me(t,s,r){let n=F(t,0,D()),a=F(s,0,M());return r==="left"&&(n=0),r==="right"&&(n=D()),r==="top"&&(a=0),r==="bottom"&&(a=M()),{x:n,y:a,edge:r}}function $e(t){const s=D(),r=M();return{rx:s>0?F(t.x/s,0,1):0,ry:r>0?F(t.y/r,0,1):0,edge:t.edge}}function ke(t){return Me(t.rx*D(),t.ry*M(),t.edge)}function Zt(){try{const t=localStorage.getItem(De);if(!t)return oe();const s=JSON.parse(t);return typeof s.rx=="number"&&typeof s.ry=="number"?{rx:F(s.rx,0,1),ry:F(s.ry,0,1),edge:s.edge??null}:typeof s.x=="number"&&typeof s.y=="number"?$e({x:F(s.x,0,D()),y:F(s.y,0,M()),edge:s.edge??null}):oe()}catch{return oe()}}function Ce(t){localStorage.setItem(De,JSON.stringify(t))}function es(t,s){const r=t,n=window.innerWidth-(t+O),a=s,i=window.innerHeight-(s+O),o=Math.min(r,n,a,i);return o>Kt?null:o===r?"left":o===n?"right":o===a?"top":"bottom"}const ts=({className:t,eyeClassName:s})=>e.jsxs("svg",{className:t,viewBox:"0 0 64 64","aria-hidden":!0,children:[e.jsx("circle",{cx:"32",cy:"12",r:"3.2",fill:"rgba(255,255,255,0.9)"}),e.jsx("rect",{x:"30.4",y:"14",width:"3.2",height:"7",rx:"1.4",fill:"rgba(255,255,255,0.85)"}),e.jsx("rect",{x:"10",y:"22",width:"44",height:"34",rx:"14",fill:"rgba(255,255,255,0.95)"}),e.jsx("rect",{x:"16",y:"28",width:"32",height:"18",rx:"9",fill:"rgba(0,0,0,0.12)"}),e.jsx("ellipse",{className:s,cx:"25",cy:"37",rx:"4.2",ry:"5",fill:"#1f2937"}),e.jsx("ellipse",{className:s,cx:"39",cy:"37",rx:"4.2",ry:"5",fill:"#1f2937"}),e.jsx("circle",{cx:"26.2",cy:"35.5",r:"1.2",fill:"#fff"}),e.jsx("circle",{cx:"40.2",cy:"35.5",r:"1.2",fill:"#fff"}),e.jsx("path",{d:"M26 48c2.2 2.4 9.8 2.4 12 0",stroke:"#1f2937",strokeWidth:"2.2",strokeLinecap:"round",fill:"none"}),e.jsx("rect",{x:"4",y:"34",width:"7",height:"10",rx:"3.5",fill:"rgba(255,255,255,0.9)"}),e.jsx("rect",{x:"53",y:"34",width:"7",height:"10",rx:"3.5",fill:"rgba(255,255,255,0.9)"})]}),Es=({icon:t})=>{const{styles:s}=Qt(),{setVisible:r,visible:n}=zt(),{t:a}=C("ai"),i=p.useRef(typeof window>"u"?{rx:1,ry:1,edge:null}:Zt()),[o,l]=p.useState(()=>typeof window>"u"?{x:0,y:0,edge:null}:ke(i.current)),[u,d]=p.useState(!1),f=p.useRef(null),m=p.useRef(o);m.current=o;const h=!u&&o.edge==="left"?s.dockLeft:!u&&o.edge==="right"?s.dockRight:!u&&o.edge==="top"?s.dockTop:!u&&o.edge==="bottom"?s.dockBottom:void 0,c=p.useCallback(y=>{const g=$e(y);i.current=g,Ce(g),l(y)},[]),x=p.useCallback(()=>{f.current||l(ke(i.current))},[]);p.useEffect(()=>(Ce(i.current),window.addEventListener("resize",x),()=>window.removeEventListener("resize",x)),[x]);const T=y=>{y.button===0&&(y.currentTarget.setPointerCapture(y.pointerId),f.current={pointerId:y.pointerId,startX:y.clientX,startY:y.clientY,originX:m.current.x,originY:m.current.y,moved:!1},d(!0))},k=y=>{const g=f.current;if(!g||g.pointerId!==y.pointerId)return;const I=y.clientX-g.startX,R=y.clientY-g.startY;!g.moved&&Math.hypot(I,R)>Gt&&(g.moved=!0),l({x:F(g.originX+I,0,D()),y:F(g.originY+R,0,M()),edge:null})},w=y=>{const g=f.current;if(!g||g.pointerId!==y.pointerId)return;try{y.currentTarget.releasePointerCapture(y.pointerId)}catch{}const I=!g.moved;if(f.current=null,d(!1),I){r(!0);return}const R=es(m.current.x,m.current.y);c(Me(m.current.x,m.current.y,R))};return n?null:dt.createPortal(e.jsx(X,{title:a("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",mouseEnterDelay:.4,open:u?!1:void 0,children:e.jsx("button",{type:"button","aria-label":a("chat.openAssistant",{defaultValue:"Open AI Assistant"}),className:E("ai-chat-float-button",s.root,u&&s.dragging,!u&&o.edge&&s.docked,h),style:{left:o.x,top:o.y},onPointerDown:T,onPointerMove:k,onPointerUp:w,onPointerCancel:w,children:t??e.jsx("span",{className:s.body,children:e.jsx(ts,{className:s.robot,eyeClassName:s.eye})})})}),document.body)},Ps=({className:t})=>{const{t:s}=C("common"),{themeMode:r,setThemeMode:n}=ut();return e.jsx(K,{className:t,menu:{items:[{key:"light",label:e.jsxs("span",{children:[e.jsx(be,{})," ",s("light",{defaultValue:"Light Mode"})]})},{key:"dark",label:e.jsxs("span",{children:[e.jsx(we,{})," ",s("dark",{defaultValue:"Dark Mode"})]})}],onClick:({key:a})=>{n(a)},selectedKeys:[r]},children:r==="light"?e.jsx(be,{}):e.jsx(we,{})},"theme-switch")},ss=mt,ns=t=>ss[t],Ds=({iconName:t})=>{if(!t)return null;const s=ns(t);return s?e.jsx(p.Suspense,{fallback:null,children:e.jsx(s,{})}):null},Ms=({className:t,onSuccess:s,token:r})=>{const{message:n}=N.useApp(),{t:a}=C("authorization"),{t:i}=C("common"),[o]=b.useForm(),{run:l,loading:u}=L(async d=>v.authorization.changePassword(d,r?{headers:{Authorization:`Bearer ${r}`}}:{}),{manual:!0,onSuccess:()=>{n.success(a("user.passwordChanged")),o.resetFields(),s==null||s()},onError:d=>{if(d instanceof Mt){const f=d.code??"normal";n.error(a(`user.passwordChangeFailed.${f}`,{error:d.message,defaultValue:"Password change failed: {{error}}"}))}else n.error(a("user.passwordChangeFailed.normal",{error:d.message,defaultValue:"Password change failed: {{error}}"}));console.error("Failed to change password:",d)}});return e.jsxs(b,{form:o,layout:"vertical",onFinish:l,style:{maxWidth:500,margin:"0 auto"},className:E("profile-password",t),children:[e.jsx(b.Item,{name:"old_password",label:a("user.oldPassword"),rules:[{required:!0,message:a("validation.oldPasswordRequired")}],className:E("profile-password-item","profile-password-item-old-password"),children:e.jsx(A.Password,{})}),e.jsx(b.Item,{name:"new_password",label:a("user.newPassword"),rules:[{required:!0,message:a("validation.newPasswordRequired")},{min:8,message:a("validation.passwordMinLength")}],className:E("profile-password-item","profile-password-item-new-password"),children:e.jsx(A.Password,{})}),e.jsx(b.Item,{name:"confirm_password",label:a("user.confirmPassword"),className:E("profile-password-item","profile-password-item-confirm-password"),rules:[{required:!0,message:a("validation.confirmPasswordRequired")},({getFieldValue:d})=>({validator(f,m){return!m||d("new_password")===m?Promise.resolve():Promise.reject(new Error(a("validation.passwordMismatch")))}})],children:e.jsx(A.Password,{})}),e.jsx(b.Item,{className:E("profile-password-item","profile-password-item-submit"),children:e.jsx(S,{type:"primary",htmlType:"submit",loading:u,children:i("save")})})]})},$s=({user:t,onSuccess:s})=>{const{message:r}=N.useApp(),{t:n}=C("authorization"),{t:a}=C("common"),[i]=b.useForm(),[o,l]=p.useState(!1);pt.useEffect(()=>{t&&i.setFieldsValue({username:t.username,email:t.email,full_name:t.full_name,phone:t.phone||"",avatar:t.avatar})},[t,i]);const u=async d=>{try{l(!0),await v.authorization.updateCurrentUser(d),r.success(a("updateSuccess")),s()}catch(f){r.error(a("updateFailed")),console.error("Failed to update user information:",f)}finally{l(!1)}};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs("div",{style:{marginBottom:24,textAlign:"center"},children:[e.jsx("h2",{children:(t==null?void 0:t.full_name)||(t==null?void 0:t.username)}),(t==null?void 0:t.roles)&&t.roles.length>0&&e.jsxs("div",{children:[n("user.roles"),": ",t.roles.map(d=>d.name).join(", ")]})]}),e.jsxs(b,{form:i,layout:"vertical",onFinish:u,style:{width:"100%",maxWidth:500},children:[e.jsx(b.Item,{style:{marginBottom:24,textAlign:"center",justifyItems:"center"},name:"avatar",children:e.jsx(Wt,{})}),e.jsx(b.Item,{name:"username",label:n("user.username"),children:e.jsx(A,{disabled:!0})}),e.jsx(b.Item,{name:"email",label:n("user.email"),rules:[{required:!0,message:n("validation.emailRequired")},{type:"email",message:n("validation.emailInvalid")}],children:e.jsx(A,{})}),e.jsx(b.Item,{name:"full_name",label:n("user.fullName"),rules:[{required:!0,message:n("validation.fullNameRequired")}],children:e.jsx(A,{})}),e.jsx(b.Item,{name:"phone",label:n("user.phone"),children:e.jsx(A,{})}),e.jsx(b.Item,{children:e.jsx(S,{type:"primary",htmlType:"submit",loading:o,children:a("save")})})]})]})},Ns=({user:t,onSuccess:s})=>{const{message:r}=N.useApp(),{t:n}=C("authorization"),{t:a}=C("common"),[i,o]=p.useState(0),[l,u]=p.useState(!1),[d,f]=p.useState(!0),[m,h]=p.useState(""),[c,x]=p.useState("totp"),[T,k]=p.useState(!1),[w,y]=p.useState("password"),[g,I]=p.useState(""),[R,q]=p.useState(""),[B,G]=p.useState(""),[ge,ae]=p.useState(""),[U,Q]=p.useState(0);p.useEffect(()=>{if(U<=0)return;const j=setTimeout(()=>Q(z=>z-1),1e3);return()=>clearTimeout(j)},[U]);const{run:He,data:W={secret:"",qr_code:"",token:void 0}}=L(()=>v.authorization.enableMfa({mfa_type:c}),{manual:!0,onSuccess:()=>{o(1)},onBefore:()=>{u(!0)},onFinally:()=>{u(!1)}}),Oe=async()=>{if(!m){r.warning(n("mfa.enterVerificationCode"));return}const j={code:m,mfa_type:c};"token"in W&&(j.token=W.token);try{u(!0),await v.authorization.verifyAndActivateMfa(j),r.success(n("mfa.enableSuccess")),o(2),s()}catch(z){r.error(n("mfa.verificationFailed")),console.error("Failed to verify MFA:",z)}finally{u(!1)}},ye=()=>{k(!1),y("password"),I(""),q(""),G(""),ae(""),Q(0)},{runAsync:qe,loading:Ue}=L(()=>v.authorization.sendDisableMfaCode(),{manual:!0}),We=async()=>{try{const j=await qe();ae((j==null?void 0:j.token)??""),G(""),Q(60),r.success(n("mfa.codeSent",{defaultValue:"Verification code has been sent to your email"}))}catch(j){r.error(j instanceof Error?j.message:a("operationFailed")),console.error("Failed to send disable-MFA code:",j)}},Z=async()=>{if(w==="email"){if(!ge){r.warning(n("mfa.sendCodeFirst",{defaultValue:"Please send the verification code first"}));return}if(!B){r.warning(n("mfa.enterVerificationCode"));return}}else if(w==="totp"){if(!R){r.warning(n("mfa.enterVerificationCode"));return}}else if(!g){r.warning(n("mfa.enterPassword",{defaultValue:"Enter your password"}));return}const j={password:"",mfa_code:"",email_code:"",email_token:""};w==="email"?(j.email_code=B,j.email_token=ge):w==="totp"?j.mfa_code=R:j.password=g;try{u(!0),await v.authorization.disableMfa(j),r.success(n("mfa.disableSuccess")),ye(),s()}catch(z){r.error(z instanceof Error?z.message:a("operationFailed")),console.error("Failed to disable MFA:",z),w==="email"&&(ae(""),G(""),Q(0))}finally{u(!1)}},Ye=()=>{if(!t)return null;if(t.mfa_enabled)return e.jsx(ce,{status:"success",title:n("mfa.enabled"),subTitle:n("mfa.enabledDescription"),extra:e.jsx(S,{danger:!0,onClick:()=>k(!0),children:n("mfa.disable")})});const j=()=>{var z;switch(i){case 0:return e.jsxs("div",{style:{textAlign:"center",marginTop:20},children:[e.jsx(ee,{message:e.jsxs("div",{children:[e.jsx("p",{children:n("mfa.setupInfo")}),e.jsx("p",{children:n(c==="totp"?"mfa.totpDescription":"mfa.emailDescription")})]}),type:"info",showIcon:!0,style:{marginBottom:20}}),e.jsx(S,{type:"primary",onClick:He,loading:l,children:n("mfa.startSetup")})]});case 1:return e.jsxs("div",{style:{textAlign:"center",marginTop:20},children:[e.jsx(ee,{message:n("mfa.scanQrCode"),type:"info",showIcon:!0,style:{marginBottom:20,display:c==="totp"?"block":"none"}}),e.jsx("div",{style:{display:c==="totp"?"flex":"none",justifyContent:"center",marginBottom:24},children:e.jsx(gt,{value:W.qr_code??"",size:200})}),e.jsx("div",{style:{marginBottom:16,display:c==="email"?"block":"none"},children:e.jsxs("p",{children:[n("user.email"),": ",e.jsx("strong",{children:t==null?void 0:t.email})]})}),e.jsx("div",{style:{marginBottom:16,display:c==="totp"?"block":"none"},children:e.jsxs("p",{children:[n("mfa.secretKey"),": ",e.jsx("strong",{children:d?"*".repeat(((z=W.secret)==null?void 0:z.length)??0):W.secret}),e.jsx(S,{type:"link",onClick:()=>f(!d),icon:d?e.jsx(Fe,{}):e.jsx(yt,{})})]})}),e.jsx("div",{style:{marginBottom:24},children:e.jsx(A,{placeholder:n("mfa.enterCode"),style:{width:200},maxLength:6,value:m,onChange:Je=>h(Je.target.value)})}),e.jsxs(_,{children:[e.jsx(S,{onClick:()=>o(0),children:a("previous")}),e.jsx(S,{type:"primary",onClick:Oe,loading:l,children:a("verify")})]})]});case 2:return e.jsx(ce,{status:"success",title:n("mfa.setupSuccess"),subTitle:n("mfa.setupSuccessDescription"),extra:e.jsx(S,{type:"primary",onClick:()=>o(0),children:a("done")})});default:return null}};return e.jsxs("div",{children:[e.jsxs("div",{style:{display:i===2?"none":"unset"},children:[e.jsx(ve,{defaultValue:"totp",onChange:z=>{x(z),o(0)},value:c,options:[{value:"totp",icon:e.jsx(ht,{}),label:n("mfa.totp",{defaultValue:"TOTP"})},{value:"email",icon:e.jsx(ft,{}),label:n("mfa.email",{defaultValue:"E-Mail"})}]}),e.jsx(ze,{})]}),e.jsx(xt,{current:i,items:[{title:n(c==="totp"?"mfa.totpStep1":"mfa.emailStep1"),description:n(c==="totp"?"mfa.totpStep1Description":"mfa.emailStep1Description")},{title:n(c==="totp"?"mfa.totpStep2":"mfa.emailStep2"),description:n(c==="totp"?"mfa.totpStep2Description":"mfa.emailStep2Description")},{title:n(c==="totp"?"mfa.totpStep3":"mfa.emailStep3"),description:n(c==="totp"?"mfa.totpStep3Description":"mfa.emailStep3Description")}],style:{marginBottom:30}}),j()]})};return e.jsxs("div",{style:{padding:8},children:[Ye(),e.jsxs(Re,{title:n("mfa.confirmDisable"),open:T,onOk:Z,okText:n("mfa.disable"),okButtonProps:{danger:!0,loading:l},onCancel:ye,destroyOnHidden:!0,children:[e.jsx(ee,{message:n("mfa.disableWarning"),type:"warning",showIcon:!0,style:{marginBottom:16}}),e.jsx("p",{children:n("mfa.disableVerifyDescription",{defaultValue:"For security reasons, please verify your identity with your password or a verification code."})}),e.jsx(ve,{block:!0,value:w,onChange:j=>y(j),options:[{value:"password",label:n("mfa.methodPassword",{defaultValue:"Password"})},...(t==null?void 0:t.mfa_type)==="totp"?[{value:"totp",label:n("mfa.totp",{defaultValue:"TOTP"})}]:[],{value:"email",label:n("mfa.methodEmailCode",{defaultValue:"Email code"})}],style:{marginBottom:16}}),w==="password"&&e.jsx(A.Password,{placeholder:n("mfa.enterPassword",{defaultValue:"Enter your password"}),autoComplete:"current-password",value:g,onChange:j=>I(j.target.value),onPressEnter:Z}),w==="totp"&&e.jsx(A,{placeholder:n("mfa.enterTotpCode",{defaultValue:"Enter the 6-digit code from your authenticator app"}),maxLength:6,value:R,onChange:j=>q(j.target.value),onPressEnter:Z}),w==="email"&&e.jsxs(_.Compact,{style:{width:"100%"},children:[e.jsx(A,{placeholder:n("mfa.enterEmailCode",{defaultValue:"Enter the 6-digit code sent to your email"}),maxLength:6,value:B,onChange:j=>G(j.target.value),onPressEnter:Z}),e.jsx(S,{onClick:We,loading:Ue,disabled:U>0,children:U>0?n("mfa.resendIn",{defaultValue:"Resend ({{seconds}}s)",seconds:U}):n("mfa.sendCode",{defaultValue:"Send code"})})]})]})]})},{Text:le}=V,Bs=()=>{const{message:t}=N.useApp(),{t:s}=C("authorization"),{t:r}=C("common"),[n,a]=p.useState(null),[i,o]=p.useState(!1),{data:l=[],loading:u,run:d}=L(()=>v.authorization.getUserSessions({}),{onError:c=>{t.error(s("session.getSessionsFailed",{error:c,defaultValue:"Failed to get session list: {{error}}"}))}}),{run:f}=L(c=>v.authorization.terminateSession({id:c}),{onSuccess:()=>{t.success(s("session.terminateSuccess",{defaultValue:"Session terminated successfully"})),d()},onError:c=>{t.error(s("session.terminateFailed",{error:c,defaultValue:"Failed to terminate session: {{error}}"}))},onFinally:()=>{a(null)},onBefore:([c])=>{a(c)},manual:!0}),{run:m}=L(()=>v.authorization.terminateOtherSessions(),{onSuccess:()=>{t.success(s("session.terminateAllSuccess",{defaultValue:"All other sessions terminated successfully"})),d()},onError:c=>{t.error(s("session.terminateAllFailed",{error:c,defaultValue:"Failed to terminate all other sessions: {{error}}"}))},onFinally:()=>{o(!1)},onBefore:()=>{o(!0)},manual:!0}),h=[{title:s("session.device"),dataIndex:"user_agent",key:"device",render:(c,x)=>e.jsxs(_,{direction:"vertical",size:0,children:[e.jsxs(_,{children:[e.jsx(jt,{}),e.jsx(le,{strong:!0,children:c})]}),e.jsxs(_,{children:[e.jsx(bt,{}),e.jsx(le,{type:"secondary",children:x.location})]})]})},{title:s("session.ipAddress"),dataIndex:"ip_address",key:"ip_address",render:c=>e.jsxs(_,{children:[e.jsx(wt,{}),e.jsx("span",{children:c})]})},{title:s("session.lastActive"),dataIndex:"last_active_at",key:"last_active",render:c=>e.jsxs(_,{children:[e.jsx(vt,{}),e.jsx("span",{children:new Date(c).toLocaleString()})]})},{title:s("session.status"),key:"status",render:c=>c.is_current?e.jsx(J,{color:"green",children:s("session.current")}):e.jsx(J,{color:"blue",children:s("session.active")})},{title:r("actions"),key:"action",render:c=>c.is_current?e.jsx(le,{type:"secondary",children:s("session.currentSession")}):e.jsx(te,{title:s("session.confirmTerminate"),onConfirm:()=>f(c.id),okText:r("confirm"),cancelText:r("cancel"),children:e.jsx(S,{type:"link",danger:!0,loading:n===c.id,children:s("session.terminate")})})}];return e.jsxs(_,{direction:"vertical",style:{padding:8,width:"100%"},children:[e.jsxs(_,{direction:"horizontal",style:{float:"right"},children:[l.length>1&&e.jsx(te,{title:s("session.confirmTerminateAll"),onConfirm:m,okText:r("confirm"),cancelText:r("cancel"),children:e.jsx(S,{danger:!0,loading:i,children:s("session.terminateOthers")})}),e.jsx(S,{onClick:()=>d(),loading:u,children:r("refresh")})]}),!u&&l.length===0?e.jsx(Ve,{description:s("session.noSessions")}):e.jsx(pe,{columns:h,dataSource:l,rowKey:"id",loading:u,pagination:!1})]})},{RangePicker:as}=kt,{Option:H}=ue,rs=t=>t||"N/A",is=(t,s)=>t==="success"?e.jsx(J,{color:"success",children:s("statuses.success")}):e.jsx(J,{color:"error",children:s("statuses.failed")}),Hs=({userId:t,request:s=n=>t?v.authorization.getUserLogs({id:t,...n}):v.authorization.getCurrentUserLogs(n),columnsFilter:r=n=>n})=>{const{message:n,modal:a}=N.useApp(),{t:i}=C("authorization"),{t:o}=C("common"),[l,u]=p.useState({current:1,pageSize:10,total:0}),[d,f]=p.useState({}),[m]=b.useForm(),{loading:h,run:c,data:{data:x}={}}=L(async(g=d,I=1,R=10)=>s({...g,current:I??1,page_size:R??10}),{onError(g){n.error(i("auditLog.fetchFailed",{error:g}))},onSuccess({total:g}){u({...l,total:g})}});p.useEffect(()=>{c(d,1,l.pageSize)},[]);const T=g=>{u({...l,current:g.current||1,pageSize:g.pageSize||10}),c({},g.current,g.pageSize)},k=g=>{var I,R,q,B;c({...g,start_time:(R=(I=g.dateRange)==null?void 0:I[0])==null?void 0:R.toISOString(),end_time:(B=(q=g.dateRange)==null?void 0:q[1])==null?void 0:B.toISOString()},1,l.pageSize)},w=()=>{m.resetFields(),f({}),u({...l,current:1}),c({},1,l.pageSize)},y=[{title:i("auditLog.timestamp"),dataIndex:"timestamp",key:"timestamp",render:g=>Dt(g)},{title:i("auditLog.action"),dataIndex:"action",key:"action",render:(g,I)=>g?i(`action.${g.replace(/:/g,".")}`,{defaultValue:i(`permission.title.${g.replace(/:/g,".")}`,{defaultValue:I.action_name})}):I.action_name??I.action},{title:i("auditLog.user_agent"),dataIndex:"user_agent",key:"user_agent"},{title:i("auditLog.ip"),dataIndex:"ip",key:"ip",render:g=>rs(g)},{title:i("auditLog.status"),dataIndex:"status",key:"status",render:g=>is(g,i)},{title:i("auditLog.details"),dataIndex:"details",key:"details",render:g=>e.jsx(S,{type:"link",icon:e.jsx(Fe,{}),onClick:()=>{a.info({title:i("auditLog.details"),content:JSON.stringify(g)})}})}];return e.jsxs("div",{children:[e.jsx(de,{style:{marginBottom:16},children:e.jsx(b,{form:m,layout:"horizontal",onFinish:k,initialValues:d,children:e.jsxs(St,{gutter:[16,16],children:[e.jsx(Y,{xxl:6,xl:6,lg:8,sm:12,xs:24,children:e.jsx(b.Item,{name:"search",noStyle:!0,children:e.jsx(A,{placeholder:i("auditLog.searchPlaceholder")})})}),e.jsx(Y,{xxl:4,xl:6,lg:8,sm:12,xs:24,children:e.jsx(b.Item,{name:"action",noStyle:!0,children:e.jsxs(ue,{allowClear:!0,placeholder:i("auditLog.selectAction"),style:{width:"100%"},children:[e.jsx(H,{value:"login",children:i("actions.login")}),e.jsx(H,{value:"logout",children:i("actions.logout")}),e.jsx(H,{value:"password_reset",children:i("actions.passwordReset")}),e.jsx(H,{value:"mfa_change",children:i("actions.mfaChange")})]})})}),e.jsx(Y,{xxl:3,xl:6,lg:8,sm:12,xs:24,children:e.jsx(b.Item,{name:"status",noStyle:!0,children:e.jsxs(ue,{allowClear:!0,placeholder:i("auditLog.selectStatus"),style:{width:"100%"},children:[e.jsx(H,{value:"success",children:i("statuses.success")}),e.jsx(H,{value:"failed",children:i("statuses.failed")})]})})}),e.jsx(Y,{xxl:6,xl:6,lg:10,md:12,sm:12,xs:24,children:e.jsx(b.Item,{name:"dateRange",noStyle:!0,children:e.jsx(as,{style:{width:"100%"}})})}),e.jsx(Y,{xxl:5,xl:24,lg:14,md:24,sm:24,xs:24,style:{textAlign:"right"},children:e.jsxs(_,{children:[e.jsx(S,{onClick:w,children:o("reset")}),e.jsx(S,{type:"primary",htmlType:"submit",icon:e.jsx(Ct,{}),children:o("search")})]})})]})})}),e.jsx(de,{children:e.jsx(pe,{rowKey:"id",columns:r(y),dataSource:x,pagination:{...l,showSizeChanger:!0,showTotal:g=>o("totalItems",{total:g})},loading:h,onChange:T,scroll:{x:"max-content"}})})]})},os=({request:t,tableRef:s,...r},n)=>{const[a,i]=p.useState({current:1,pageSize:10}),[o,l]=p.useState(0),{data:u,loading:d,refresh:f}=L(async()=>{const m=await t({current:a.current,page_size:a.pageSize});return l(m.total),m.data},{refreshDeps:[a]});return p.useImperativeHandle(n,()=>({reload:()=>{f()}})),e.jsx(pe,{rowKey:"id",loading:d,dataSource:u??[],pagination:{...a,total:o,onChange:(m,h)=>{i({current:m,pageSize:h})}},...r,ref:s})},Os=({actionRef:t,...s})=>{const[r,n]=p.useState();return p.useEffect(()=>{n(p.forwardRef(os))},[]),r?e.jsx(r,{...s,ref:t}):null},Ne=({permission:t,permissions:s=[],checkAll:r=!1,fallback:n=null,children:a})=>{const{hasPermission:i,hasAnyPermission:o,hasAllPermissions:l,isAdmin:u,loading:d}=Ee();return d?null:u?e.jsx(e.Fragment,{children:a}):t?i(t)?e.jsx(e.Fragment,{children:a}):e.jsx(e.Fragment,{children:n}):s.length>0?(r?l(s):o(s))?e.jsx(e.Fragment,{children:a}):e.jsx(e.Fragment,{children:n}):e.jsx(e.Fragment,{children:a})},Te=t=>{const[s,r]=p.useState(!1),{permission:n,icon:a,tooltip:i,onClick:o,confirm:l,label:u,...d}=t,f=!!d.disabled,[m,h]=p.useState(!1),c=o?async()=>{r(!0);try{await o()}finally{r(!1),h(!1)}}:void 0;let x=e.jsx(S,{type:"link",size:"small",loading:s,icon:a,onClick:l&&!f?void 0:c,...d,children:u&&e.jsx("span",{style:{position:"inherit",top:"-2px"},children:u})});if(l&&!f){const T=async()=>{l.onConfirm?await l.onConfirm():c&&await c()};x=e.jsx(te,{title:l.title,description:l.description,onConfirm:T,okText:l.okText,cancelText:l.cancelText,children:x})}return i&&(x=f?e.jsx(X,{title:i,open:m,onOpenChange:h,children:e.jsx("span",{style:{display:"inline-block",cursor:"not-allowed"},children:x})}):e.jsx(X,{title:i,open:m,onOpenChange:h,children:x})),n&&(x=e.jsx(Ne,{permission:n,children:x})),x},qs=({actions:t,maxVisibleItems:s})=>{const{modal:r}=N.useApp(),n=t.filter(l=>!l.hidden);if(!s||n.length<=s)return e.jsx(e.Fragment,{children:n.map(({key:l,...u})=>e.jsx(Te,{...u},l))});const a=n.slice(0,s-1),o=n.slice(s-1).map(l=>{const{key:u,label:d,icon:f,permission:m,onClick:h,confirm:c,disabled:x,tooltip:T}=l,w={key:u,label:d,icon:f,disabled:x,onClick:async()=>{c?r.confirm({title:c.title,content:c.description,onOk:c.onConfirm||h,okText:c.okText,cancelText:c.cancelText}):h&&await h()}};return m?{...w,label:e.jsx(Ne,{permission:m,children:e.jsx("span",{children:d??T})})}:w});return e.jsxs(e.Fragment,{children:[a.map(({key:l,...u})=>e.jsx(Te,{...u},l)),e.jsx(Ae,{menu:{items:o},trigger:["click"],children:e.jsx(S,{type:"text",size:"small",icon:e.jsx(Tt,{})})})]})},{Text:ls}=V,Us=({kind:t,subjectId:s,readOnly:r})=>{const{message:n}=N.useApp(),{t:a}=C("authorization"),{t:i}=C("common"),[o]=b.useForm(),l=t==="user"?v.authorization.getUserRateLimit:v.authorization.getServiceAccountRateLimit,u=t==="user"?v.authorization.updateUserRateLimit:v.authorization.updateServiceAccountRateLimit,{data:d,loading:f,refresh:m}=L(()=>l({id:s}),{ready:!!s,refreshDeps:[s,t],onSuccess:y=>{o.setFieldsValue({rate:y.rate,period:y.period||"1m",burst:y.burst,quota:y.quota,quota_period:y.quota_period||"1d",enabled:y.enabled!==!1})}}),{run:h,loading:c}=L(async y=>u({id:s},{...y,clear:!1,inherited:!1,enabled:y.enabled!==!1}),{manual:!0,onSuccess:()=>{n.success(a("rateLimit.saveSuccess",{defaultValue:"Rate limit override saved"})),m()},onError:y=>{n.error(y.message||a("rateLimit.saveFailed",{defaultValue:"Failed to save override"}))}}),{run:x,loading:T}=L(async()=>u({id:s},{clear:!0,rate:0,burst:0,quota:0,period:"",quota_period:"",enabled:!1,inherited:!0}),{manual:!0,onSuccess:()=>{n.success(a("rateLimit.resetSuccess",{defaultValue:"Override cleared; type default restored"})),m()},onError:y=>{n.error(y.message)}}),{run:k,loading:w}=L(async()=>t==="user"?v.authorization.resetUserRateLimit({id:s}):v.authorization.resetServiceAccountRateLimit({id:s}),{manual:!0,onSuccess:()=>{n.success(a("rateLimit.resetCountersSuccess",{defaultValue:"Counters reset"}))},onError:y=>{n.error(y.message)}});return e.jsxs(b,{form:o,layout:"vertical",onFinish:h,disabled:r||f,style:{maxWidth:480,marginTop:16},children:[(d==null?void 0:d.inherited)&&e.jsx(ee,{type:"info",showIcon:!0,style:{marginBottom:16},message:a("rateLimit.inherited",{defaultValue:"Using the type default. Save to create a subject-specific override."})}),e.jsx(b.Item,{name:"rate",label:a("rateLimit.rate",{defaultValue:"Rate"}),rules:[{required:!0}],children:e.jsx(re,{min:1,style:{width:"100%"}})}),e.jsx(b.Item,{name:"period",label:a("rateLimit.period",{defaultValue:"Period"}),extra:a("rateLimit.periodHint",{defaultValue:"Examples: 1s, 1m, 1h"}),children:e.jsx(A,{placeholder:"1m"})}),e.jsx(b.Item,{name:"burst",label:a("rateLimit.burst",{defaultValue:"Burst"}),children:e.jsx(re,{min:1,style:{width:"100%"}})}),e.jsx(b.Item,{name:"quota",label:a("rateLimit.quota",{defaultValue:"Daily quota (0 = none)"}),children:e.jsx(re,{min:0,style:{width:"100%"}})}),e.jsx(b.Item,{name:"quota_period",label:a("rateLimit.quotaPeriod",{defaultValue:"Quota period"}),children:e.jsx(A,{placeholder:"1d"})}),e.jsx(b.Item,{name:"enabled",label:a("rateLimit.enabled",{defaultValue:"Enabled"}),valuePropName:"checked",extra:a("rateLimit.enabledHint",{defaultValue:"Off: this override is ignored and the type default applies. Use Reset to default to delete the override."}),children:e.jsx(It,{})}),!r&&e.jsxs(_,{children:[e.jsx(S,{type:"primary",htmlType:"submit",loading:c,children:i("save",{defaultValue:"Save"})}),e.jsx(te,{title:a("rateLimit.resetCountersConfirm",{defaultValue:"Reset rate-limit and quota counters for this subject? They will be able to send requests immediately."}),onConfirm:()=>k(),children:e.jsx(S,{htmlType:"button",icon:e.jsx(Lt,{}),loading:w,children:a("rateLimit.resetCounters",{defaultValue:"Reset counters"})})}),!(d!=null&&d.inherited)&&e.jsx(S,{onClick:()=>x(),loading:T,children:a("rateLimit.resetToDefault",{defaultValue:"Reset to default"})})]}),(d==null?void 0:d.inherited)&&e.jsx(ls,{type:"secondary",children:a("rateLimit.sourceHint",{defaultValue:"Values shown are inherited."})})]})},cs=p.lazy(()=>Pe(()=>import("./json-schema-config-form.C_xwqITJ.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18])).then(t=>({default:t.JsonSchemaConfigForm}))),ds=p.lazy(()=>Pe(()=>import("./json-schema-config-form.C_xwqITJ.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18])).then(t=>({default:t.JsonSchemaConfigFormItem})));function Ws(t){return e.jsx(p.Suspense,{fallback:e.jsx(se,{style:{minHeight:"200px",height:"calc(100vh - 800px)"}}),children:e.jsx(cs,{...t})})}function Ys(t){return e.jsx(p.Suspense,{fallback:e.jsx(se,{style:{minHeight:"200px",height:"calc(100vh - 800px)"}}),children:e.jsx(ds,{...t})})}const{Text:Ie}=V,us={debug:"default",info:"processing",warn:"warning",error:"error"},Js=({taskId:t,poll:s})=>{const{t:r}=C("task"),{data:n=[],loading:a}=L(()=>t?v.tasks.getTaskLogs({id:t}):Promise.reject(new Error("No task id")),{refreshDeps:[t],ready:!!t,pollingInterval:s?2e3:0});return e.jsx(de,{title:r("logsTitle",{defaultValue:"Task logs"}),size:"small",style:{marginTop:16},children:a&&!n.length?e.jsx("div",{style:{textAlign:"center",padding:24},children:e.jsx(me,{})}):n.length?e.jsx("pre",{style:{margin:0,padding:12,maxHeight:320,overflow:"auto",fontSize:12,background:"var(--ant-colorFillTertiary)",borderRadius:6,whiteSpace:"pre-wrap",wordBreak:"break-all"},children:n.map(i=>e.jsxs("div",{style:{marginBottom:4},children:[e.jsx(Ie,{type:"secondary",style:{fontSize:11},children:i.created_at}),i.level&&e.jsxs(Ie,{type:us[i.level],style:{marginLeft:8,fontSize:11},children:["[",i.level,"]"]}),e.jsx("div",{style:{display:"inline",marginLeft:8},children:i.message})]},i.id))}):e.jsx(Ve,{description:r("noLogs",{defaultValue:"No logs yet."})})})},ms=$(({token:t,css:s})=>({wrap:s`
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
  `}));function ps(t){const s=t.trim();if(!s)return"";try{return JSON.stringify(JSON.parse(s),null,2)}catch{return s}}function hs(t){const s=t.description;if(typeof s=="string"&&s.trim())return s.trim();try{const r=JSON.parse(t.arguments||"{}");return typeof r.description=="string"?r.description.trim():""}catch{return""}}function Be(t,s){return t?t.id==="approve"?s("chat.hitlExecute",{defaultValue:t.label||"Execute"}):t.id==="reject"?s("chat.hitlDontExecute",{defaultValue:t.label||"Don't execute"}):t.label:""}function fs(t,s,r){var a;const n=(a=t.options)==null?void 0:a.find(i=>i.id===s);return Be(n,r)||s||"…"}const Xs=({card:t,submitting:s=!1,onSelect:r})=>{var k,w;const{t:n}=C("ai"),{styles:a}=ms(),i=ps(t.arguments||""),[o,l]=p.useState(t.selected_option_id||"");p.useEffect(()=>{l(t.selected_option_id||"")},[t.selected_option_id,t.tool_call_id]);const u=o||t.selected_option_id||"",d=((k=t.title)==null?void 0:k.trim())||t.tool_name,f=!!((w=t.title)!=null&&w.trim()&&t.tool_name&&t.title.trim()!==t.tool_name&&t.tool_name!=="ui_choose"),m=t.kind==="choice"||t.tool_name==="ui_choose",h=hs(t),c=!m&&!!i,x=t.status==="abandoned"||t.status==="decided";let T;return t.status==="abandoned"?T=e.jsx(V.Text,{type:"secondary",children:n("chat.hitlAbandoned",{defaultValue:"You continued without choosing."})}):x&&u?T=e.jsx(V.Text,{children:n("chat.hitlChose",{defaultValue:"You chose {{label}}.",label:fs(t,u,n)})}):x?T=e.jsx(V.Text,{children:n("chat.hitlChose",{defaultValue:"You chose {{label}}.",label:"…"})}):T=e.jsx("div",{className:a.actions,children:(t.options??[]).map(y=>{const g=u===y.id;return e.jsx(S,{className:a.action,type:g?"primary":"default",loading:s&&g,disabled:s,onClick:()=>{l(y.id),r==null||r(y.id)},children:e.jsxs(Se,{vertical:!0,align:"flex-start",children:[e.jsx("span",{children:Be(y,n)}),y.description?e.jsx("span",{style:{fontSize:12,fontWeight:400,opacity:.85},children:y.description}):null]})},y.id)})}),e.jsxs("div",{className:a.wrap,children:[e.jsxs("div",{className:a.header,children:[e.jsx("span",{className:a.title,children:d}),f?e.jsx(V.Text,{className:a.toolName,type:"secondary",code:!0,children:t.tool_name}):null]}),e.jsxs(Se,{vertical:!0,gap:8,children:[h?e.jsx("div",{className:a.description,children:h}):null,c?e.jsx(At,{className:a.arguments,ghost:!0,size:"small",items:[{key:"arguments",label:n("chat.hitlArguments",{defaultValue:"Arguments"}),children:e.jsx("pre",{className:a.argsPre,children:i})}]}):null,T]})]})};function xs(t){try{return JSON.stringify(JSON.parse(t),null,2)}catch{return t}}const ne=$(({token:t,css:s})=>({root:s`
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
  `}));function gs({open:t}){const{styles:s,cx:r}=ne();return e.jsx("svg",{className:r(s.chevron,t&&s.chevronOpen),width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M6 4.5 10 8 6 11.5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function ys(){return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:[e.jsx("rect",{x:"6",y:"6",width:"7",height:"7",rx:"1.4",fill:"none",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M10 6V4.2A1.2 1.2 0 0 0 8.8 3H4.2A1.2 1.2 0 0 0 3 4.2v4.6A1.2 1.2 0 0 0 4.2 10H6",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}function js(){return e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M3.5 8.2 6.4 11 12.5 5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Le({call:t}){var u;const{styles:s,cx:r}=ne(),{t:n}=C("ai"),a=t.status==="running"||t.status==="pending",i=t.status==="failed",o=i?n("chat.toolFailed",{defaultValue:"Failed"}):a?n("chat.toolRunning",{defaultValue:"Running"}):n("chat.toolDone",{defaultValue:"Done"}),l=(u=t.title)==null?void 0:u.trim();return e.jsxs(e.Fragment,{children:[e.jsx("code",{className:s.name,children:t.name}),l?e.jsx("span",{className:s.title,title:l,children:l}):null,e.jsx("span",{className:r(s.status,a&&s.statusRunning,i&&s.statusFailed),children:o})]})}function bs({call:t}){const{styles:s}=ne(),r=t.status==="running"||t.status==="pending";return t.arguments?e.jsx("section",{className:s.run,"aria-busy":r,children:e.jsxs("details",{className:s.run,children:[e.jsx("summary",{className:s.summary,children:e.jsx(Le,{call:t})}),e.jsx("pre",{className:s.pre,children:xs(t.arguments)})]})}):e.jsx("section",{className:s.run,"aria-busy":r,children:e.jsx("p",{className:s.line,children:e.jsx(Le,{call:t})})})}function Ks({text:t,tools:s=[],live:r=!1,align:n="start"}){const{styles:a,cx:i}=ne(),{t:o}=C("ai"),[l,u]=p.useState(r),[d,f]=p.useState(!1),m=d?o("chat.copied",{defaultValue:"Copied"}):o("chat.copyMessage",{defaultValue:"Copy message"}),h=l?o("chat.hideToolCalls",{defaultValue:"Hide tool calls"}):o("chat.showToolCalls",{defaultValue:"Show tool calls"});async function c(){try{await navigator.clipboard.writeText(t),f(!0),window.setTimeout(()=>f(!1),1200)}catch{f(!1)}}return!t&&s.length===0?null:e.jsxs("div",{className:i("chat-message-actions",a.root,n==="end"&&a.rootEnd,l&&s.length>0&&"has-tools"),children:[e.jsxs("div",{className:a.actions,children:[t?e.jsx(X,{title:m,placement:"bottom",children:e.jsx("button",{type:"button",className:a.action,"aria-label":m,onClick:()=>void c(),children:d?e.jsx(js,{}):e.jsx(ys,{})})}):null,s.length>0?e.jsx(X,{title:h,placement:"bottom",children:e.jsx("button",{type:"button",className:a.action,"aria-expanded":l,"aria-label":h,onClick:()=>u(x=>!x),children:e.jsx(gs,{open:l})})}):null]}),s.length>0?e.jsx("div",{className:i("chat-tool-log",a.rows),hidden:!l,children:s.map(x=>e.jsx(bs,{call:x},x.id))}):null]})}export{Rs as A,Ks as C,Ds as D,K as H,Fs as I,Ys as J,se as L,zs as O,Ls as P,Vs as R,_s as T,Hs as U,As as a,Ps as b,Es as c,Ms as d,$s as e,Ns as f,Bs as g,qs as h,Os as i,Ne as j,Us as k,Wt as l,Ot as m,Ws as n,Js as o,Xs as p};
