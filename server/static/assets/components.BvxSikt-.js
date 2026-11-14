import{j as e,S as we,u as A,R as be,N as Le,D as Ue,a as D,b as O,A as pt,r as h,I as ft,U as ht,M as We,d as R,P as gt,e as xt,f as yt,L as q,g as bt,h as Ye,i as jt,k as vt,l as wt,m as Je,n as St,o as Ct,T as z,B as I,p as kt,q as X,s as Tt,t as It,v as _,w as At,x as te,y as Lt,z as Ee,C as Re,E as Et,F as Y,G as C,H as F,J as Ke,K as ie,O as Fe,Q as Rt,V as Ft,W as Vt,X as _t,Y as Xe,Z as Pt,_ as zt,$ as Dt,a0 as Mt,a1 as $t,a2 as le,a3 as Ge,a4 as Se,a5 as je,a6 as Nt,a7 as ee,a8 as G,a9 as Ot,aa as Bt,ab as Ht,ac as ue,ad as qt,ae as Ut,af as Ve,ag as Wt,ah as Yt,ai as Jt,aj as Kt,ak as Ce,al as me,am as _e,an as Xt,ao as Gt,ap as Qt,aq as Pe,ar as Zt,as as es,at as ts,au as ss,av as ns}from"./vendor.VLvkUFsS.js";import{u as ke,a as Qe,b as Te,c as as,d as rs}from"./contexts.ChHhY77L.js";import{g as os,i as is,a as ls,b as cs,c as ds,f as us}from"./base.D7p3dOp-.js";import{a as T}from"./index.adF91stt.js";import{b as pe,A as ms,r as ps}from"./client.DAY66TeD.js";import{f as Ze,h as fs}from"./lodash.Bb75kzRV.js";const ze=()=>e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100%"},children:e.jsx(we,{size:"large"})}),bn=({element:t,requiredPermission:s,requiredPermissions:r})=>{const{t:n}=A(),{user:a,loading:o,error:i}=ke(),{hasPermission:l,hasAllPermissions:d}=Qe();return o?e.jsx(ze,{}):i?i.code==="E4011"?e.jsx(ze,{}):e.jsx(be,{status:"500",title:"500",subTitle:n("login.fetchCurrentUserError",{defaultValue:"Failed to fetch current user: {{error}}",error:(i==null?void 0:i.message)||i})}):a?s&&!l(s)?e.jsx(Le,{to:"/forbidden",replace:!0}):r&&!d(r)?e.jsx(Le,{to:"/forbidden",replace:!0}):t:(window.location.href=os("/login?redirect="+encodeURIComponent(window.location.href)),null)},hs=O(({token:t,css:s})=>({container:s`
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
    `,iconStyle:{cursor:"pointer",padding:"12px",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:18,verticalAlign:"middle","&:hover":{color:t.colorPrimaryTextHover}}})),se=({overlayClassName:t,overlay:s,hidden:r,children:n,...a})=>{const{styles:o}=hs();return r?e.jsx(e.Fragment,{}):e.jsx(Ue,{popupRender:s,overlayClassName:D(o.container,t),...a,children:e.jsx("span",{className:o.iconStyle,children:n})})},gs=()=>e.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",children:[e.jsx("path",{d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",className:"css-c4d79v"})]}),xs=O(()=>({menuItemStyle:{minWidth:"160px"},menuItemIconStyle:{marginRight:"8px"}})),ys=[{lang:"en-US",label:"English",icon:"🇺🇸"},{lang:"sv-SE",label:"Svenska",icon:"🇸🇪"},{lang:"ar-AE",label:"العربية",icon:"🇦🇪"},{lang:"de-DE",label:"Deutsch",icon:"🇩🇪"},{lang:"es-ES",label:"Español",icon:"🇪🇸"},{lang:"fr-FR",label:"Français",icon:"🇫🇷"},{lang:"zh-CN",label:"中文",icon:"🇨🇳"}],jn=({transformLangConfig:t=r=>r,className:s})=>{const{i18n:r}=A(),{styles:n}=xs(),a=i=>{r.changeLanguage(i)},o={selectedKeys:[r.language],onClick:i=>{a(i.key)},items:t(ys).map(i=>({key:i.lang,className:n.menuItemStyle,label:e.jsxs(e.Fragment,{children:[e.jsx("span",{role:"img","aria-label":(i==null?void 0:i.label)||"en-US",className:n.menuItemIconStyle,children:(i==null?void 0:i.icon)||"🌐"}),(i==null?void 0:i.label)||"en-US"]})}))};return e.jsx(se,{className:s,menu:o,children:e.jsx(gs,{})})},bs=O(({css:t})=>({avatarItem:t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `})),Ie=t=>Ze(t)&&t.match(/^[-_a-zA-Z0-9]+$/)?pe.endsWith("/")?pe+`files/${t}`:pe+`/files/${t}`:t,vn=({src:t,fallback:s,...r})=>e.jsx(pt,{src:Ie(t),icon:s,...r}),js=({onChange:t,shape:s="square"})=>{const[r,n]=h.useState([]),{styles:a}=bs(),[o,i]=h.useState(!1),[l,d]=h.useState(!0),[c,p]=h.useState(0),{run:m,loading:f}=R(()=>T.base.listFiles({current:c+1,page_size:40,file_type:"avatar",access:"public",search:""}),{manual:!0,onSuccess:({data:g})=>{console.log(g),n([...r,...g]),d(g.length===40),p(c+1)}}),u=()=>{d(!0),p(0),n([])};return e.jsx(gt,{style:{zIndex:1e3},onOpenChange:g=>{i(g),g?m():u()},open:o,content:e.jsx("div",{style:{width:360,height:200},children:e.jsx("div",{id:"iconsScrollableDiv",style:{height:"100%",overflow:"auto"},children:e.jsx(yt,{dataLength:r.length,next:()=>{m()},hasMore:l,loader:e.jsx(jt,{avatar:!0,paragraph:{rows:1},active:!0}),endMessage:e.jsx(Ye,{plain:!0,children:"End"}),scrollableTarget:"iconsScrollableDiv",children:e.jsx(q,{grid:{gutter:16,column:8},dataSource:r,style:{margin:"0 8px"},loading:f,renderItem:({id:g})=>e.jsx("div",{className:a.avatarItem,onClick:v=>{v.stopPropagation(),t==null||t(g),i(!1),u()},children:e.jsx(bt,{src:Ie(g),placeholder:e.jsx(we,{size:"default"}),preview:!1})})})})})}),placement:"bottom",trigger:"hover",children:e.jsx(xt,{shape:s,style:{width:112,height:112,placeContent:"center"}})})},vs=({value:t,onChange:s,shape:r,...n})=>{const[a,o]=h.useState(void 0),[i,l]=h.useState(!1),[d,c]=h.useState(void 0),p=async m=>{l(!0),c(m.url??m.preview)};return h.useEffect(()=>{o(t?{uid:t,name:t,url:Ie(t)}:void 0)},[t]),e.jsxs(e.Fragment,{children:[e.jsx(ft,{beforeCrop:async m=>{if(m.type==="image/svg+xml"){const f=await T.base.uploadFile({type:"avatar"},m);return f.length>0&&(s==null||s(f[0].id)),!1}return!0},children:e.jsx(ht,{customRequest:async m=>{var u,g;const f=await T.base.uploadFile({type:"avatar",access:"public"},m.file);f.length>0?((u=m.onSuccess)==null||u.call(m,f[0].id),s==null||s(f[0].id)):(g=m.onError)==null||g.call(m,new Error("Upload file failed"))},listType:"picture-card",onPreview:p,maxCount:1,onChange:({file:m})=>{switch(m.status){case"removed":s==null||s(void 0);break;case"done":break;default:o(m);break}},fileList:a?[a]:[],...n,children:a?void 0:e.jsx(js,{shape:r,onChange:s})})}),e.jsx(We,{open:i,footer:null,onCancel:()=>l(!1),children:e.jsx("img",{style:{width:"100%"},src:d})})]})},wn=({className:t})=>{const{t:s}=A("common"),{user:r}=ke(),{currentOrgId:n,setCurrentOrgId:a}=Te(),o=(r==null?void 0:r.organizations)||[],i=p=>{a(p),window.location.reload()};if(o.length===0)return null;const l=o.find(p=>p.id===n),d=l?l.name:s("organization.global",{defaultValue:"Global"}),c=[...o.map(p=>({key:p.id,label:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{children:p.name}),n===p.id&&e.jsx(vt,{})]}),onClick:()=>i(p.id)}))];return e.jsxs(se,{className:t,menu:{items:c,selectedKeys:n?[n]:[""]},children:[e.jsx(wt,{style:{marginRight:4}}),e.jsx("span",{style:{height:"1em",lineHeight:"1em",marginLeft:"5px"},children:d})]})},ws={pending:"default",running:"processing",success:"success",failed:"error",cancelled:"default"},Sn=({className:t})=>{const{t:s}=A("task"),r=Je(),{user:n}=as(),{tasksDropdownOpen:a,setTasksDropdownOpen:o,tasks:i,setTasks:l}=Te(),{runAsync:d,loading:c}=R(async()=>T.tasks.listUserTasks({}),{onSuccess:f=>{is(i,f,(u,g)=>u.id===g.id&&u.status===g.status&&u.progress===g.progress)||l(f)},pollingInterval:a?3e3:6e4,ready:!!n,refreshDeps:[n]});h.useEffect(()=>{a&&d()},[a]);const p=async f=>{const u=await T.base.downloadFile({fileKey:f},{params:{method:"sign"}}),g=`/api/files/${f}?signature=${u.signature}&expires=${u.expires}`;window.open(g,"_blank")},m=()=>e.jsxs("div",{style:{width:520,maxHeight:500,overflow:"auto",padding:8},children:[e.jsx(q,{size:"small",dataSource:i,loading:c,renderItem:f=>e.jsx(q.Item,{extra:e.jsx(X,{color:ws[f.status],style:{marginLeft:6},children:s(`status.${f.status}`,{defaultValue:f.status})}),actions:[f.artifact_file_key&&e.jsx(I,{type:"text",size:"small",icon:e.jsx(kt,{}),onClick:()=>p(f.artifact_file_key)})].filter(Boolean),children:e.jsx(q.Item.Meta,{title:e.jsx("span",{style:{fontSize:13},children:e.jsxs(z.Text,{ellipsis:{tooltip:!0},children:[s(`type.${f.type}`,{defaultValue:f.type})," ",f.artifact_file_name&&`- ${f.artifact_file_name}`]})}),description:(f.status==="running"||f.status==="pending")&&e.jsx(Ct,{percent:f.progress??0,size:"small",style:{marginTop:4}})})},f.id)}),e.jsx("div",{style:{borderTop:"1px solid #f0f0f0",paddingTop:8,marginTop:8,textAlign:"center"},children:e.jsx(I,{type:"link",size:"small",onClick:()=>r("/tasks"),children:s("more",{defaultValue:"More"})})})]});return!i||i.length===0?null:e.jsxs(se,{className:t,overlay:m,placement:"bottomRight",open:a,onOpenChange:o,children:[e.jsx(St,{style:{marginRight:4}}),e.jsx("span",{style:{height:"1em",lineHeight:"1em",marginLeft:2},children:s("tasks",{defaultValue:"Tasks"})})]})},Ss=20,Cn=({className:t})=>{const{t:s}=A("inbox"),r=Je(),{user:n}=ke(),{inboxUnreadCount:a,inboxRevision:o,setInboxUnreadCount:i,bumpInboxRevision:l}=Te(),[d,c]=h.useState(!1),{data:p=[],loading:m,run:f}=R(async()=>(await T.inbox.listInboxMessages({current:1,page_size:Ss})).data??[],{ready:!!n,refreshDeps:[n==null?void 0:n.id,o]}),u=async S=>{await T.inbox.markInboxMessageRead({id:S}),l(),f()},g=async()=>{await T.inbox.markAllInboxMessagesRead(),i(0),l(),f()},v=()=>e.jsxs("div",{style:{width:420,maxHeight:500,overflow:"auto",padding:8},children:[e.jsx(q,{size:"small",dataSource:p,loading:m,locale:{emptyText:s("empty",{defaultValue:"No messages"})},renderItem:S=>{const j=ls(S);return e.jsx(q.Item,{style:{cursor:j?"pointer":"default"},onClick:()=>{j&&u(S.id)},children:e.jsx(q.Item.Meta,{title:e.jsx(z.Text,{strong:j,ellipsis:{tooltip:!0},children:ds(s,S)}),description:e.jsxs(_,{direction:"vertical",size:0,style:{width:"100%"},children:[e.jsx(z.Text,{type:"secondary",ellipsis:{tooltip:!0},children:cs(s,S)}),e.jsx(z.Text,{type:"secondary",style:{fontSize:12},children:S.created_at?new Date(S.created_at).toLocaleString():""})]})})},S.id)}}),e.jsxs("div",{style:{borderTop:"1px solid #f0f0f0",paddingTop:8,marginTop:8,display:"flex",justifyContent:"space-between"},children:[e.jsx(I,{type:"link",size:"small",disabled:a<=0,onClick:()=>void g(),children:s("markAllRead",{defaultValue:"Mark all as read"})}),e.jsx(I,{type:"link",size:"small",onClick:()=>{c(!1),r("/inbox")},children:s("viewAll",{defaultValue:"View all"})})]})]});return e.jsx(se,{className:t,overlay:v,placement:"bottomRight",open:d,onOpenChange:c,children:e.jsx(Tt,{count:a,size:"small",overflowCount:99,children:e.jsx(It,{style:{marginRight:4,height:18,width:18,fontSize:18}})})})},Cs=O(({token:t,css:s})=>({root:s`
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
  `})),kn=({onResize:t,minWidth:s=300,maxWidth:r=window.innerWidth*.5})=>{const{styles:n}=Cs(),[a,o]=h.useState(!1),[i,l]=h.useState(!1),d=h.useCallback(m=>{m.preventDefault(),o(!0)},[]),c=h.useCallback(m=>{if(!a)return;const f=window.innerWidth-m.clientX,u=Math.max(s,Math.min(r,f));t(u)},[a,s,r,t]),p=h.useCallback(()=>{o(!1)},[]);return h.useEffect(()=>{if(a)return document.addEventListener("mousemove",c),document.addEventListener("mouseup",p),document.body.style.cursor="col-resize",document.body.style.userSelect="none",()=>{document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",p),document.body.style.cursor="",document.body.style.userSelect=""}},[a,c,p]),e.jsx("div",{onMouseDown:d,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),className:D(n.root,a&&n.dragging),children:e.jsx("div",{className:D(n.grip,i&&n.gripHover,a&&n.gripDragging)})})},Q=40,ks=28,Ts=6,et="ai-chat-float-pos",Is=O(({token:t,css:s})=>({root:s`
    position: fixed;
    z-index: 1050;
    width: ${Q}px;
    height: ${Q}px;
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
  `}));function P(t,s,r){return Math.min(Math.max(t,s),r)}function U(){return Math.max(0,window.innerWidth-Q)}function W(){return Math.max(0,window.innerHeight-Q)}function fe(){const t=U(),s=W();return{rx:t>0?P((t-24)/t,0,1):1,ry:s>0?P((s-24)/s,0,1):1,edge:null}}function tt(t,s,r){let n=P(t,0,U()),a=P(s,0,W());return r==="left"&&(n=0),r==="right"&&(n=U()),r==="top"&&(a=0),r==="bottom"&&(a=W()),{x:n,y:a,edge:r}}function st(t){const s=U(),r=W();return{rx:s>0?P(t.x/s,0,1):0,ry:r>0?P(t.y/r,0,1):0,edge:t.edge}}function De(t){return tt(t.rx*U(),t.ry*W(),t.edge)}function As(){try{const t=localStorage.getItem(et);if(!t)return fe();const s=JSON.parse(t);return typeof s.rx=="number"&&typeof s.ry=="number"?{rx:P(s.rx,0,1),ry:P(s.ry,0,1),edge:s.edge??null}:typeof s.x=="number"&&typeof s.y=="number"?st({x:P(s.x,0,U()),y:P(s.y,0,W()),edge:s.edge??null}):fe()}catch{return fe()}}function Me(t){localStorage.setItem(et,JSON.stringify(t))}function Ls(t,s){const r=t,n=window.innerWidth-(t+Q),a=s,o=window.innerHeight-(s+Q),i=Math.min(r,n,a,o);return i>ks?null:i===r?"left":i===n?"right":i===a?"top":"bottom"}const Es=({className:t,eyeClassName:s})=>e.jsxs("svg",{className:t,viewBox:"0 0 64 64","aria-hidden":!0,children:[e.jsx("circle",{cx:"32",cy:"12",r:"3.2",fill:"rgba(255,255,255,0.9)"}),e.jsx("rect",{x:"30.4",y:"14",width:"3.2",height:"7",rx:"1.4",fill:"rgba(255,255,255,0.85)"}),e.jsx("rect",{x:"10",y:"22",width:"44",height:"34",rx:"14",fill:"rgba(255,255,255,0.95)"}),e.jsx("rect",{x:"16",y:"28",width:"32",height:"18",rx:"9",fill:"rgba(0,0,0,0.12)"}),e.jsx("ellipse",{className:s,cx:"25",cy:"37",rx:"4.2",ry:"5",fill:"#1f2937"}),e.jsx("ellipse",{className:s,cx:"39",cy:"37",rx:"4.2",ry:"5",fill:"#1f2937"}),e.jsx("circle",{cx:"26.2",cy:"35.5",r:"1.2",fill:"#fff"}),e.jsx("circle",{cx:"40.2",cy:"35.5",r:"1.2",fill:"#fff"}),e.jsx("path",{d:"M26 48c2.2 2.4 9.8 2.4 12 0",stroke:"#1f2937",strokeWidth:"2.2",strokeLinecap:"round",fill:"none"}),e.jsx("rect",{x:"4",y:"34",width:"7",height:"10",rx:"3.5",fill:"rgba(255,255,255,0.9)"}),e.jsx("rect",{x:"53",y:"34",width:"7",height:"10",rx:"3.5",fill:"rgba(255,255,255,0.9)"})]}),Tn=({icon:t})=>{const{styles:s}=Is(),{setVisible:r,visible:n}=rs(),{t:a}=A("ai"),o=h.useRef(typeof window>"u"?{rx:1,ry:1,edge:null}:As()),[i,l]=h.useState(()=>typeof window>"u"?{x:0,y:0,edge:null}:De(o.current)),[d,c]=h.useState(!1),p=h.useRef(null),m=h.useRef(i);m.current=i;const f=!d&&i.edge==="left"?s.dockLeft:!d&&i.edge==="right"?s.dockRight:!d&&i.edge==="top"?s.dockTop:!d&&i.edge==="bottom"?s.dockBottom:void 0,u=h.useCallback(y=>{const x=st(y);o.current=x,Me(x),l(y)},[]),g=h.useCallback(()=>{p.current||l(De(o.current))},[]);h.useEffect(()=>(Me(o.current),window.addEventListener("resize",g),()=>window.removeEventListener("resize",g)),[g]);const v=y=>{y.button===0&&(y.currentTarget.setPointerCapture(y.pointerId),p.current={pointerId:y.pointerId,startX:y.clientX,startY:y.clientY,originX:m.current.x,originY:m.current.y,moved:!1},c(!0))},S=y=>{const x=p.current;if(!x||x.pointerId!==y.pointerId)return;const w=y.clientX-x.startX,b=y.clientY-x.startY;!x.moved&&Math.hypot(w,b)>Ts&&(x.moved=!0),l({x:P(x.originX+w,0,U()),y:P(x.originY+b,0,W()),edge:null})},j=y=>{const x=p.current;if(!x||x.pointerId!==y.pointerId)return;try{y.currentTarget.releasePointerCapture(y.pointerId)}catch{}const w=!x.moved;if(p.current=null,c(!1),w){r(!0);return}const b=Ls(m.current.x,m.current.y);u(tt(m.current.x,m.current.y,b))};return n?null:At.createPortal(e.jsx(te,{title:a("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",mouseEnterDelay:.4,open:d?!1:void 0,children:e.jsx("button",{type:"button","aria-label":a("chat.openAssistant",{defaultValue:"Open AI Assistant"}),className:D("ai-chat-float-button",s.root,d&&s.dragging,!d&&i.edge&&s.docked,f),style:{left:i.x,top:i.y},onPointerDown:v,onPointerMove:S,onPointerUp:j,onPointerCancel:j,children:t??e.jsx("span",{className:s.body,children:e.jsx(Es,{className:s.robot,eyeClassName:s.eye})})})}),document.body)},In=({className:t})=>{const{t:s}=A("common"),{themeMode:r,setThemeMode:n}=Lt();return e.jsx(se,{className:t,menu:{items:[{key:"light",label:e.jsxs("span",{children:[e.jsx(Ee,{})," ",s("light",{defaultValue:"Light Mode"})]})},{key:"dark",label:e.jsxs("span",{children:[e.jsx(Re,{})," ",s("dark",{defaultValue:"Dark Mode"})]})}],onClick:({key:a})=>{n(a)},selectedKeys:[r]},children:r==="light"?e.jsx(Ee,{}):e.jsx(Re,{})},"theme-switch")},Rs=Et,Fs=t=>Rs[t],An=({iconName:t})=>{if(!t)return null;const s=Fs(t);return s?e.jsx(h.Suspense,{fallback:null,children:e.jsx(s,{})}):null},Ln=({className:t,onSuccess:s,token:r})=>{const{message:n}=Y.useApp(),{t:a}=A("authorization"),{t:o}=A("common"),[i]=C.useForm(),{run:l,loading:d}=R(async c=>T.authorization.changePassword(c,r?{headers:{Authorization:`Bearer ${r}`}}:{}),{manual:!0,onSuccess:()=>{n.success(a("user.passwordChanged")),i.resetFields(),s==null||s()},onError:c=>{if(c instanceof ms){const p=c.code??"normal";n.error(a(`user.passwordChangeFailed.${p}`,{error:c.message,defaultValue:"Password change failed: {{error}}"}))}else n.error(a("user.passwordChangeFailed.normal",{error:c.message,defaultValue:"Password change failed: {{error}}"}));console.error("Failed to change password:",c)}});return e.jsxs(C,{form:i,layout:"vertical",onFinish:l,style:{maxWidth:500,margin:"0 auto"},className:D("profile-password",t),children:[e.jsx(C.Item,{name:"old_password",label:a("user.oldPassword"),rules:[{required:!0,message:a("validation.oldPasswordRequired")}],className:D("profile-password-item","profile-password-item-old-password"),children:e.jsx(F.Password,{})}),e.jsx(C.Item,{name:"new_password",label:a("user.newPassword"),rules:[{required:!0,message:a("validation.newPasswordRequired")},{min:8,message:a("validation.passwordMinLength")}],className:D("profile-password-item","profile-password-item-new-password"),children:e.jsx(F.Password,{})}),e.jsx(C.Item,{name:"confirm_password",label:a("user.confirmPassword"),className:D("profile-password-item","profile-password-item-confirm-password"),rules:[{required:!0,message:a("validation.confirmPasswordRequired")},({getFieldValue:c})=>({validator(p,m){return!m||c("new_password")===m?Promise.resolve():Promise.reject(new Error(a("validation.passwordMismatch")))}})],children:e.jsx(F.Password,{})}),e.jsx(C.Item,{className:D("profile-password-item","profile-password-item-submit"),children:e.jsx(I,{type:"primary",htmlType:"submit",loading:d,children:o("save")})})]})},En=({user:t,onSuccess:s})=>{const{message:r}=Y.useApp(),{t:n}=A("authorization"),{t:a}=A("common"),[o]=C.useForm(),[i,l]=h.useState(!1);Ke.useEffect(()=>{t&&o.setFieldsValue({username:t.username,email:t.email,full_name:t.full_name,phone:t.phone||"",avatar:t.avatar})},[t,o]);const d=async c=>{try{l(!0),await T.authorization.updateCurrentUser(c),r.success(a("updateSuccess")),s()}catch(p){r.error(a("updateFailed")),console.error("Failed to update user information:",p)}finally{l(!1)}};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs("div",{style:{marginBottom:24,textAlign:"center"},children:[e.jsx("h2",{children:(t==null?void 0:t.full_name)||(t==null?void 0:t.username)}),(t==null?void 0:t.roles)&&t.roles.length>0&&e.jsxs("div",{children:[n("user.roles"),": ",t.roles.map(c=>c.name).join(", ")]})]}),e.jsxs(C,{form:o,layout:"vertical",onFinish:d,style:{width:"100%",maxWidth:500},children:[e.jsx(C.Item,{style:{marginBottom:24,textAlign:"center",justifyItems:"center"},name:"avatar",children:e.jsx(vs,{})}),e.jsx(C.Item,{name:"username",label:n("user.username"),children:e.jsx(F,{disabled:!0})}),e.jsx(C.Item,{name:"email",label:n("user.email"),rules:[{required:!0,message:n("validation.emailRequired")},{type:"email",message:n("validation.emailInvalid")}],children:e.jsx(F,{})}),e.jsx(C.Item,{name:"full_name",label:n("user.fullName"),rules:[{required:!0,message:n("validation.fullNameRequired")}],children:e.jsx(F,{})}),e.jsx(C.Item,{name:"phone",label:n("user.phone"),children:e.jsx(F,{})}),e.jsx(C.Item,{children:e.jsx(I,{type:"primary",htmlType:"submit",loading:i,children:a("save")})})]})]})},Rn=({user:t,onSuccess:s})=>{const{message:r}=Y.useApp(),{t:n}=A("authorization"),{t:a}=A("common"),[o,i]=h.useState(0),[l,d]=h.useState(!1),[c,p]=h.useState(!0),[m,f]=h.useState(""),[u,g]=h.useState("totp"),[v,S]=h.useState(!1),[j,y]=h.useState("password"),[x,w]=h.useState(""),[b,L]=h.useState(""),[E,$]=h.useState(""),[ne,Z]=h.useState(""),[B,J]=h.useState(0);h.useEffect(()=>{if(B<=0)return;const k=setTimeout(()=>J(V=>V-1),1e3);return()=>clearTimeout(k)},[B]);const{run:ae,data:H={secret:"",qr_code:"",token:void 0}}=R(()=>T.authorization.enableMfa({mfa_type:u}),{manual:!0,onSuccess:()=>{i(1)},onBefore:()=>{d(!0)},onFinally:()=>{d(!1)}}),N=async()=>{if(!m){r.warning(n("mfa.enterVerificationCode"));return}const k={code:m,mfa_type:u};"token"in H&&(k.token=H.token);try{d(!0),await T.authorization.verifyAndActivateMfa(k),r.success(n("mfa.enableSuccess")),i(2),s()}catch(V){r.error(n("mfa.verificationFailed")),console.error("Failed to verify MFA:",V)}finally{d(!1)}},M=()=>{S(!1),y("password"),w(""),L(""),$(""),Z(""),J(0)},{runAsync:de,loading:re}=R(()=>T.authorization.sendDisableMfaCode(),{manual:!0}),dt=async()=>{try{const k=await de();Z((k==null?void 0:k.token)??""),$(""),J(60),r.success(n("mfa.codeSent",{defaultValue:"Verification code has been sent to your email"}))}catch(k){r.error(k instanceof Error?k.message:a("operationFailed")),console.error("Failed to send disable-MFA code:",k)}},oe=async()=>{if(j==="email"){if(!ne){r.warning(n("mfa.sendCodeFirst",{defaultValue:"Please send the verification code first"}));return}if(!E){r.warning(n("mfa.enterVerificationCode"));return}}else if(j==="totp"){if(!b){r.warning(n("mfa.enterVerificationCode"));return}}else if(!x){r.warning(n("mfa.enterPassword",{defaultValue:"Enter your password"}));return}const k={password:"",mfa_code:"",email_code:"",email_token:""};j==="email"?(k.email_code=E,k.email_token=ne):j==="totp"?k.mfa_code=b:k.password=x;try{d(!0),await T.authorization.disableMfa(k),r.success(n("mfa.disableSuccess")),M(),s()}catch(V){r.error(V instanceof Error?V.message:a("operationFailed")),console.error("Failed to disable MFA:",V),j==="email"&&(Z(""),$(""),J(0))}finally{d(!1)}},ut=()=>{if(!t)return null;if(t.mfa_enabled)return e.jsx(be,{status:"success",title:n("mfa.enabled"),subTitle:n("mfa.enabledDescription"),extra:e.jsx(I,{danger:!0,onClick:()=>S(!0),children:n("mfa.disable")})});const k=()=>{var V;switch(o){case 0:return e.jsxs("div",{style:{textAlign:"center",marginTop:20},children:[e.jsx(ie,{message:e.jsxs("div",{children:[e.jsx("p",{children:n("mfa.setupInfo")}),e.jsx("p",{children:n(u==="totp"?"mfa.totpDescription":"mfa.emailDescription")})]}),type:"info",showIcon:!0,style:{marginBottom:20}}),e.jsx(I,{type:"primary",onClick:ae,loading:l,children:n("mfa.startSetup")})]});case 1:return e.jsxs("div",{style:{textAlign:"center",marginTop:20},children:[e.jsx(ie,{message:n("mfa.scanQrCode"),type:"info",showIcon:!0,style:{marginBottom:20,display:u==="totp"?"block":"none"}}),e.jsx("div",{style:{display:u==="totp"?"flex":"none",justifyContent:"center",marginBottom:24},children:e.jsx(_t,{value:H.qr_code??"",size:200})}),e.jsx("div",{style:{marginBottom:16,display:u==="email"?"block":"none"},children:e.jsxs("p",{children:[n("user.email"),": ",e.jsx("strong",{children:t==null?void 0:t.email})]})}),e.jsx("div",{style:{marginBottom:16,display:u==="totp"?"block":"none"},children:e.jsxs("p",{children:[n("mfa.secretKey"),": ",e.jsx("strong",{children:c?"*".repeat(((V=H.secret)==null?void 0:V.length)??0):H.secret}),e.jsx(I,{type:"link",onClick:()=>p(!c),icon:c?e.jsx(Xe,{}):e.jsx(Pt,{})})]})}),e.jsx("div",{style:{marginBottom:24},children:e.jsx(F,{placeholder:n("mfa.enterCode"),style:{width:200},maxLength:6,value:m,onChange:mt=>f(mt.target.value)})}),e.jsxs(_,{children:[e.jsx(I,{onClick:()=>i(0),children:a("previous")}),e.jsx(I,{type:"primary",onClick:N,loading:l,children:a("verify")})]})]});case 2:return e.jsx(be,{status:"success",title:n("mfa.setupSuccess"),subTitle:n("mfa.setupSuccessDescription"),extra:e.jsx(I,{type:"primary",onClick:()=>i(0),children:a("done")})});default:return null}};return e.jsxs("div",{children:[e.jsxs("div",{style:{display:o===2?"none":"unset"},children:[e.jsx(Fe,{defaultValue:"totp",onChange:V=>{g(V),i(0)},value:u,options:[{value:"totp",icon:e.jsx(Rt,{}),label:n("mfa.totp",{defaultValue:"TOTP"})},{value:"email",icon:e.jsx(Ft,{}),label:n("mfa.email",{defaultValue:"E-Mail"})}]}),e.jsx(Ye,{})]}),e.jsx(Vt,{current:o,items:[{title:n(u==="totp"?"mfa.totpStep1":"mfa.emailStep1"),description:n(u==="totp"?"mfa.totpStep1Description":"mfa.emailStep1Description")},{title:n(u==="totp"?"mfa.totpStep2":"mfa.emailStep2"),description:n(u==="totp"?"mfa.totpStep2Description":"mfa.emailStep2Description")},{title:n(u==="totp"?"mfa.totpStep3":"mfa.emailStep3"),description:n(u==="totp"?"mfa.totpStep3Description":"mfa.emailStep3Description")}],style:{marginBottom:30}}),k()]})};return e.jsxs("div",{style:{padding:8},children:[ut(),e.jsxs(We,{title:n("mfa.confirmDisable"),open:v,onOk:oe,okText:n("mfa.disable"),okButtonProps:{danger:!0,loading:l},onCancel:M,destroyOnHidden:!0,children:[e.jsx(ie,{message:n("mfa.disableWarning"),type:"warning",showIcon:!0,style:{marginBottom:16}}),e.jsx("p",{children:n("mfa.disableVerifyDescription",{defaultValue:"For security reasons, please verify your identity with your password or a verification code."})}),e.jsx(Fe,{block:!0,value:j,onChange:k=>y(k),options:[{value:"password",label:n("mfa.methodPassword",{defaultValue:"Password"})},...(t==null?void 0:t.mfa_type)==="totp"?[{value:"totp",label:n("mfa.totp",{defaultValue:"TOTP"})}]:[],{value:"email",label:n("mfa.methodEmailCode",{defaultValue:"Email code"})}],style:{marginBottom:16}}),j==="password"&&e.jsx(F.Password,{placeholder:n("mfa.enterPassword",{defaultValue:"Enter your password"}),autoComplete:"current-password",value:x,onChange:k=>w(k.target.value),onPressEnter:oe}),j==="totp"&&e.jsx(F,{placeholder:n("mfa.enterTotpCode",{defaultValue:"Enter the 6-digit code from your authenticator app"}),maxLength:6,value:b,onChange:k=>L(k.target.value),onPressEnter:oe}),j==="email"&&e.jsxs(_.Compact,{style:{width:"100%"},children:[e.jsx(F,{placeholder:n("mfa.enterEmailCode",{defaultValue:"Enter the 6-digit code sent to your email"}),maxLength:6,value:E,onChange:k=>$(k.target.value),onPressEnter:oe}),e.jsx(I,{onClick:dt,loading:re,disabled:B>0,children:B>0?n("mfa.resendIn",{defaultValue:"Resend ({{seconds}}s)",seconds:B}):n("mfa.sendCode",{defaultValue:"Send code"})})]})]})]})},{Text:he}=z,Fn=()=>{const{message:t}=Y.useApp(),{t:s}=A("authorization"),{t:r}=A("common"),[n,a]=h.useState(null),[o,i]=h.useState(!1),{data:l=[],loading:d,run:c}=R(()=>T.authorization.getUserSessions({}),{onError:u=>{t.error(s("session.getSessionsFailed",{error:u,defaultValue:"Failed to get session list: {{error}}"}))}}),{run:p}=R(u=>T.authorization.terminateSession({id:u}),{onSuccess:()=>{t.success(s("session.terminateSuccess",{defaultValue:"Session terminated successfully"})),c()},onError:u=>{t.error(s("session.terminateFailed",{error:u,defaultValue:"Failed to terminate session: {{error}}"}))},onFinally:()=>{a(null)},onBefore:([u])=>{a(u)},manual:!0}),{run:m}=R(()=>T.authorization.terminateOtherSessions(),{onSuccess:()=>{t.success(s("session.terminateAllSuccess",{defaultValue:"All other sessions terminated successfully"})),c()},onError:u=>{t.error(s("session.terminateAllFailed",{error:u,defaultValue:"Failed to terminate all other sessions: {{error}}"}))},onFinally:()=>{i(!1)},onBefore:()=>{i(!0)},manual:!0}),f=[{title:s("session.device"),dataIndex:"user_agent",key:"device",render:(u,g)=>e.jsxs(_,{direction:"vertical",size:0,children:[e.jsxs(_,{children:[e.jsx(zt,{}),e.jsx(he,{strong:!0,children:u})]}),e.jsxs(_,{children:[e.jsx(Dt,{}),e.jsx(he,{type:"secondary",children:g.location})]})]})},{title:s("session.ipAddress"),dataIndex:"ip_address",key:"ip_address",render:u=>e.jsxs(_,{children:[e.jsx(Mt,{}),e.jsx("span",{children:u})]})},{title:s("session.lastActive"),dataIndex:"last_active_at",key:"last_active",render:u=>e.jsxs(_,{children:[e.jsx($t,{}),e.jsx("span",{children:new Date(u).toLocaleString()})]})},{title:s("session.status"),key:"status",render:u=>u.is_current?e.jsx(X,{color:"green",children:s("session.current")}):e.jsx(X,{color:"blue",children:s("session.active")})},{title:r("actions"),key:"action",render:u=>u.is_current?e.jsx(he,{type:"secondary",children:s("session.currentSession")}):e.jsx(le,{title:s("session.confirmTerminate"),onConfirm:()=>p(u.id),okText:r("confirm"),cancelText:r("cancel"),children:e.jsx(I,{type:"link",danger:!0,loading:n===u.id,children:s("session.terminate")})})}];return e.jsxs(_,{direction:"vertical",style:{padding:8,width:"100%"},children:[e.jsxs(_,{direction:"horizontal",style:{float:"right"},children:[l.length>1&&e.jsx(le,{title:s("session.confirmTerminateAll"),onConfirm:m,okText:r("confirm"),cancelText:r("cancel"),children:e.jsx(I,{danger:!0,loading:o,children:s("session.terminateOthers")})}),e.jsx(I,{onClick:()=>c(),loading:d,children:r("refresh")})]}),!d&&l.length===0?e.jsx(Ge,{description:s("session.noSessions")}):e.jsx(Se,{columns:f,dataSource:l,rowKey:"id",loading:d,pagination:!1})]})},{RangePicker:Vs}=Ot,{Option:K}=G,_s=t=>t||"N/A",Ps=(t,s)=>t==="success"?e.jsx(X,{color:"success",children:s("statuses.success")}):e.jsx(X,{color:"error",children:s("statuses.failed")}),Vn=({userId:t,request:s=n=>t?T.authorization.getUserLogs({id:t,...n}):T.authorization.getCurrentUserLogs(n),columnsFilter:r=n=>n})=>{const{message:n,modal:a}=Y.useApp(),{t:o}=A("authorization"),{t:i}=A("common"),[l,d]=h.useState({current:1,pageSize:10,total:0}),[c,p]=h.useState({}),[m]=C.useForm(),{loading:f,run:u,data:{data:g}={}}=R(async(x=c,w=1,b=10)=>s({...x,current:w??1,page_size:b??10}),{onError(x){n.error(o("auditLog.fetchFailed",{error:x}))},onSuccess({total:x}){d({...l,total:x})}});h.useEffect(()=>{u(c,1,l.pageSize)},[]);const v=x=>{d({...l,current:x.current||1,pageSize:x.pageSize||10}),u({},x.current,x.pageSize)},S=x=>{var w,b,L,E;u({...x,start_time:(b=(w=x.dateRange)==null?void 0:w[0])==null?void 0:b.toISOString(),end_time:(E=(L=x.dateRange)==null?void 0:L[1])==null?void 0:E.toISOString()},1,l.pageSize)},j=()=>{m.resetFields(),p({}),d({...l,current:1}),u({},1,l.pageSize)},y=[{title:o("auditLog.timestamp"),dataIndex:"timestamp",key:"timestamp",render:x=>us(x)},{title:o("auditLog.action"),dataIndex:"action",key:"action",render:(x,w)=>x?o(`action.${x.replace(/:/g,".")}`,{defaultValue:o(`permission.title.${x.replace(/:/g,".")}`,{defaultValue:w.action_name})}):w.action_name??w.action},{title:o("auditLog.user_agent"),dataIndex:"user_agent",key:"user_agent"},{title:o("auditLog.ip"),dataIndex:"ip",key:"ip",render:x=>_s(x)},{title:o("auditLog.status"),dataIndex:"status",key:"status",render:x=>Ps(x,o)},{title:o("auditLog.details"),dataIndex:"details",key:"details",render:x=>e.jsx(I,{type:"link",icon:e.jsx(Xe,{}),onClick:()=>{a.info({title:o("auditLog.details"),content:JSON.stringify(x)})}})}];return e.jsxs("div",{children:[e.jsx(je,{style:{marginBottom:16},children:e.jsx(C,{form:m,layout:"horizontal",onFinish:S,initialValues:c,children:e.jsxs(Nt,{gutter:[16,16],children:[e.jsx(ee,{xxl:6,xl:6,lg:8,sm:12,xs:24,children:e.jsx(C.Item,{name:"search",noStyle:!0,children:e.jsx(F,{placeholder:o("auditLog.searchPlaceholder")})})}),e.jsx(ee,{xxl:4,xl:6,lg:8,sm:12,xs:24,children:e.jsx(C.Item,{name:"action",noStyle:!0,children:e.jsxs(G,{allowClear:!0,placeholder:o("auditLog.selectAction"),style:{width:"100%"},children:[e.jsx(K,{value:"login",children:o("actions.login")}),e.jsx(K,{value:"logout",children:o("actions.logout")}),e.jsx(K,{value:"password_reset",children:o("actions.passwordReset")}),e.jsx(K,{value:"mfa_change",children:o("actions.mfaChange")})]})})}),e.jsx(ee,{xxl:3,xl:6,lg:8,sm:12,xs:24,children:e.jsx(C.Item,{name:"status",noStyle:!0,children:e.jsxs(G,{allowClear:!0,placeholder:o("auditLog.selectStatus"),style:{width:"100%"},children:[e.jsx(K,{value:"success",children:o("statuses.success")}),e.jsx(K,{value:"failed",children:o("statuses.failed")})]})})}),e.jsx(ee,{xxl:6,xl:6,lg:10,md:12,sm:12,xs:24,children:e.jsx(C.Item,{name:"dateRange",noStyle:!0,children:e.jsx(Vs,{style:{width:"100%"}})})}),e.jsx(ee,{xxl:5,xl:24,lg:14,md:24,sm:24,xs:24,style:{textAlign:"right"},children:e.jsxs(_,{children:[e.jsx(I,{onClick:j,children:i("reset")}),e.jsx(I,{type:"primary",htmlType:"submit",icon:e.jsx(Bt,{}),children:i("search")})]})})]})})}),e.jsx(je,{children:e.jsx(Se,{rowKey:"id",columns:r(y),dataSource:g,pagination:{...l,showSizeChanger:!0,showTotal:x=>i("totalItems",{total:x})},loading:f,onChange:v,scroll:{x:"max-content"}})})]})},zs=({request:t,tableRef:s,...r},n)=>{const[a,o]=h.useState({current:1,pageSize:10}),[i,l]=h.useState(0),{data:d,loading:c,refresh:p}=R(async()=>{const m=await t({current:a.current,page_size:a.pageSize});return l(m.total),m.data},{refreshDeps:[a]});return h.useImperativeHandle(n,()=>({reload:()=>{p()}})),e.jsx(Se,{rowKey:"id",loading:c,dataSource:d??[],pagination:{...a,total:i,onChange:(m,f)=>{o({current:m,pageSize:f})}},...r,ref:s})},_n=({actionRef:t,...s})=>{const[r,n]=h.useState();return h.useEffect(()=>{n(h.forwardRef(zs))},[]),r?e.jsx(r,{...s,ref:t}):null},nt=({permission:t,permissions:s=[],checkAll:r=!1,fallback:n=null,children:a})=>{const{hasPermission:o,hasAnyPermission:i,hasAllPermissions:l,isAdmin:d,loading:c}=Qe();return c?null:d?e.jsx(e.Fragment,{children:a}):t?o(t)?e.jsx(e.Fragment,{children:a}):e.jsx(e.Fragment,{children:n}):s.length>0?(r?l(s):i(s))?e.jsx(e.Fragment,{children:a}):e.jsx(e.Fragment,{children:n}):e.jsx(e.Fragment,{children:a})},$e=t=>{const[s,r]=h.useState(!1),{permission:n,icon:a,tooltip:o,onClick:i,confirm:l,label:d,...c}=t,p=!!c.disabled,[m,f]=h.useState(!1),u=i?async()=>{r(!0);try{await i()}finally{r(!1),f(!1)}}:void 0;let g=e.jsx(I,{type:"link",size:"small",loading:s,icon:a,onClick:l&&!p?void 0:u,...c,children:d&&e.jsx("span",{style:{position:"inherit",top:"-2px"},children:d})});if(l&&!p){const v=async()=>{l.onConfirm?await l.onConfirm():u&&await u()};g=e.jsx(le,{title:l.title,description:l.description,onConfirm:v,okText:l.okText,cancelText:l.cancelText,children:g})}return o&&(g=p?e.jsx(te,{title:o,open:m,onOpenChange:f,children:e.jsx("span",{style:{display:"inline-block",cursor:"not-allowed"},children:g})}):e.jsx(te,{title:o,open:m,onOpenChange:f,children:g})),n&&(g=e.jsx(nt,{permission:n,children:g})),g},Pn=({actions:t,maxVisibleItems:s})=>{const{modal:r}=Y.useApp(),n=t.filter(l=>!l.hidden);if(!s||n.length<=s)return e.jsx(e.Fragment,{children:n.map(({key:l,...d})=>e.jsx($e,{...d},l))});const a=n.slice(0,s-1),i=n.slice(s-1).map(l=>{const{key:d,label:c,icon:p,permission:m,onClick:f,confirm:u,disabled:g,tooltip:v}=l,j={key:d,label:c,icon:p,disabled:g,onClick:async()=>{u?r.confirm({title:u.title,content:u.description,onOk:u.onConfirm||f,okText:u.okText,cancelText:u.cancelText}):f&&await f()}};return m?{...j,label:e.jsx(nt,{permission:m,children:e.jsx("span",{children:c??v})})}:j});return e.jsxs(e.Fragment,{children:[a.map(({key:l,...d})=>e.jsx($e,{...d},l)),e.jsx(Ue,{menu:{items:i},trigger:["click"],children:e.jsx(I,{type:"text",size:"small",icon:e.jsx(Ht,{})})})]})},{Text:Ds}=z,zn=({kind:t,subjectId:s,readOnly:r})=>{const{message:n}=Y.useApp(),{t:a}=A("authorization"),{t:o}=A("common"),[i]=C.useForm(),l=t==="user"?T.authorization.getUserRateLimit:T.authorization.getServiceAccountRateLimit,d=t==="user"?T.authorization.updateUserRateLimit:T.authorization.updateServiceAccountRateLimit,{data:c,loading:p,refresh:m}=R(()=>l({id:s}),{ready:!!s,refreshDeps:[s,t],onSuccess:y=>{i.setFieldsValue({rate:y.rate,period:y.period||"1m",burst:y.burst,quota:y.quota,quota_period:y.quota_period||"1d",enabled:y.enabled!==!1})}}),{run:f,loading:u}=R(async y=>d({id:s},{...y,clear:!1,inherited:!1,enabled:y.enabled!==!1}),{manual:!0,onSuccess:()=>{n.success(a("rateLimit.saveSuccess",{defaultValue:"Rate limit override saved"})),m()},onError:y=>{n.error(y.message||a("rateLimit.saveFailed",{defaultValue:"Failed to save override"}))}}),{run:g,loading:v}=R(async()=>d({id:s},{clear:!0,rate:0,burst:0,quota:0,period:"",quota_period:"",enabled:!1,inherited:!0}),{manual:!0,onSuccess:()=>{n.success(a("rateLimit.resetSuccess",{defaultValue:"Override cleared; type default restored"})),m()},onError:y=>{n.error(y.message)}}),{run:S,loading:j}=R(async()=>t==="user"?T.authorization.resetUserRateLimit({id:s}):T.authorization.resetServiceAccountRateLimit({id:s}),{manual:!0,onSuccess:()=>{n.success(a("rateLimit.resetCountersSuccess",{defaultValue:"Counters reset"}))},onError:y=>{n.error(y.message)}});return e.jsxs(C,{form:i,layout:"vertical",onFinish:f,disabled:r||p,style:{maxWidth:480,marginTop:16},children:[(c==null?void 0:c.inherited)&&e.jsx(ie,{type:"info",showIcon:!0,style:{marginBottom:16},message:a("rateLimit.inherited",{defaultValue:"Using the type default. Save to create a subject-specific override."})}),e.jsx(C.Item,{name:"rate",label:a("rateLimit.rate",{defaultValue:"Rate"}),rules:[{required:!0}],children:e.jsx(ue,{min:1,style:{width:"100%"}})}),e.jsx(C.Item,{name:"period",label:a("rateLimit.period",{defaultValue:"Period"}),extra:a("rateLimit.periodHint",{defaultValue:"Examples: 1s, 1m, 1h"}),children:e.jsx(F,{placeholder:"1m"})}),e.jsx(C.Item,{name:"burst",label:a("rateLimit.burst",{defaultValue:"Burst"}),children:e.jsx(ue,{min:1,style:{width:"100%"}})}),e.jsx(C.Item,{name:"quota",label:a("rateLimit.quota",{defaultValue:"Daily quota (0 = none)"}),children:e.jsx(ue,{min:0,style:{width:"100%"}})}),e.jsx(C.Item,{name:"quota_period",label:a("rateLimit.quotaPeriod",{defaultValue:"Quota period"}),children:e.jsx(F,{placeholder:"1d"})}),e.jsx(C.Item,{name:"enabled",label:a("rateLimit.enabled",{defaultValue:"Enabled"}),valuePropName:"checked",extra:a("rateLimit.enabledHint",{defaultValue:"Off: this override is ignored and the type default applies. Use Reset to default to delete the override."}),children:e.jsx(qt,{})}),!r&&e.jsxs(_,{children:[e.jsx(I,{type:"primary",htmlType:"submit",loading:u,children:o("save",{defaultValue:"Save"})}),e.jsx(le,{title:a("rateLimit.resetCountersConfirm",{defaultValue:"Reset rate-limit and quota counters for this subject? They will be able to send requests immediately."}),onConfirm:()=>S(),children:e.jsx(I,{htmlType:"button",icon:e.jsx(Ut,{}),loading:j,children:a("rateLimit.resetCounters",{defaultValue:"Reset counters"})})}),!(c!=null&&c.inherited)&&e.jsx(I,{onClick:()=>g(),loading:v,children:a("rateLimit.resetToDefault",{defaultValue:"Reset to default"})})]}),(c==null?void 0:c.inherited)&&e.jsx(Ds,{type:"secondary",children:a("rateLimit.sourceHint",{defaultValue:"Values shown are inherited."})})]})},{Text:Ne}=z,Ms={debug:"default",info:"processing",warn:"warning",error:"error"},Dn=({taskId:t,poll:s})=>{const{t:r}=A("task"),{data:n=[],loading:a}=R(()=>t?T.tasks.getTaskLogs({id:t}):Promise.reject(new Error("No task id")),{refreshDeps:[t],ready:!!t,pollingInterval:s?2e3:0});return e.jsx(je,{title:r("logsTitle",{defaultValue:"Task logs"}),size:"small",style:{marginTop:16},children:a&&!n.length?e.jsx("div",{style:{textAlign:"center",padding:24},children:e.jsx(we,{})}):n.length?e.jsx("pre",{style:{margin:0,padding:12,maxHeight:320,overflow:"auto",fontSize:12,background:"var(--ant-colorFillTertiary)",borderRadius:6,whiteSpace:"pre-wrap",wordBreak:"break-all"},children:n.map(o=>e.jsxs("div",{style:{marginBottom:4},children:[e.jsx(Ne,{type:"secondary",style:{fontSize:11},children:o.created_at}),o.level&&e.jsxs(Ne,{type:Ms[o.level],style:{marginLeft:8,fontSize:11},children:["[",o.level,"]"]}),e.jsx("div",{style:{display:"inline",marginLeft:8},children:o.message})]},o.id))}):e.jsx(Ge,{description:r("noLogs",{defaultValue:"No logs yet."})})})},$s=O(({token:t,css:s})=>({wrap:s`
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
  `}));function Ns(t){const s=t.trim();if(!s)return"";try{return JSON.stringify(JSON.parse(s),null,2)}catch{return s}}function Os(t){const s=t.description;if(typeof s=="string"&&s.trim())return s.trim();try{const r=JSON.parse(t.arguments||"{}");return typeof r.description=="string"?r.description.trim():""}catch{return""}}function at(t,s){return t?t.id==="approve"?s("chat.hitlExecute",{defaultValue:t.label||"Execute"}):t.id==="reject"?s("chat.hitlDontExecute",{defaultValue:t.label||"Don't execute"}):t.label:""}function Bs(t,s,r){var a;const n=(a=t.options)==null?void 0:a.find(o=>o.id===s);return at(n,r)||s||"…"}const Mn=({card:t,submitting:s=!1,onSelect:r})=>{var S,j;const{t:n}=A("ai"),{styles:a}=$s(),o=Ns(t.arguments||""),[i,l]=h.useState(t.selected_option_id||"");h.useEffect(()=>{l(t.selected_option_id||"")},[t.selected_option_id,t.tool_call_id]);const d=i||t.selected_option_id||"",c=((S=t.title)==null?void 0:S.trim())||t.tool_name,p=!!((j=t.title)!=null&&j.trim()&&t.tool_name&&t.title.trim()!==t.tool_name&&t.tool_name!=="ui_choose"),m=t.kind==="choice"||t.tool_name==="ui_choose",f=Os(t),u=!m&&!!o,g=t.status==="abandoned"||t.status==="decided";let v;return t.status==="abandoned"?v=e.jsx(z.Text,{type:"secondary",children:n("chat.hitlAbandoned",{defaultValue:"You continued without choosing."})}):g&&d?v=e.jsx(z.Text,{children:n("chat.hitlChose",{defaultValue:"You chose {{label}}.",label:Bs(t,d,n)})}):g?v=e.jsx(z.Text,{children:n("chat.hitlChose",{defaultValue:"You chose {{label}}.",label:"…"})}):v=e.jsx("div",{className:a.actions,children:(t.options??[]).map(y=>{const x=d===y.id;return e.jsx(I,{className:a.action,type:x?"primary":"default",loading:s&&x,disabled:s,onClick:()=>{l(y.id),r==null||r(y.id)},children:e.jsxs(Ve,{vertical:!0,align:"flex-start",children:[e.jsx("span",{children:at(y,n)}),y.description?e.jsx("span",{style:{fontSize:12,fontWeight:400,opacity:.85},children:y.description}):null]})},y.id)})}),e.jsxs("div",{className:a.wrap,children:[e.jsxs("div",{className:a.header,children:[e.jsx("span",{className:a.title,children:c}),p?e.jsx(z.Text,{className:a.toolName,type:"secondary",code:!0,children:t.tool_name}):null]}),e.jsxs(Ve,{vertical:!0,gap:8,children:[f?e.jsx("div",{className:a.description,children:f}):null,u?e.jsx(Wt,{className:a.arguments,ghost:!0,size:"small",items:[{key:"arguments",label:n("chat.hitlArguments",{defaultValue:"Arguments"}),children:e.jsx("pre",{className:a.argsPre,children:o})}]}):null,v]})]})};function Hs(t){try{return JSON.stringify(JSON.parse(t),null,2)}catch{return t}}const ce=O(({token:t,css:s})=>({root:s`
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
  `}));function qs({open:t}){const{styles:s,cx:r}=ce();return e.jsx("svg",{className:r(s.chevron,t&&s.chevronOpen),width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M6 4.5 10 8 6 11.5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Us(){return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:[e.jsx("rect",{x:"6",y:"6",width:"7",height:"7",rx:"1.4",fill:"none",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M10 6V4.2A1.2 1.2 0 0 0 8.8 3H4.2A1.2 1.2 0 0 0 3 4.2v4.6A1.2 1.2 0 0 0 4.2 10H6",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}function Ws(){return e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M3.5 8.2 6.4 11 12.5 5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Oe({call:t}){var d;const{styles:s,cx:r}=ce(),{t:n}=A("ai"),a=t.status==="running"||t.status==="pending",o=t.status==="failed",i=o?n("chat.toolFailed",{defaultValue:"Failed"}):a?n("chat.toolRunning",{defaultValue:"Running"}):n("chat.toolDone",{defaultValue:"Done"}),l=(d=t.title)==null?void 0:d.trim();return e.jsxs(e.Fragment,{children:[e.jsx("code",{className:s.name,children:t.name}),l?e.jsx("span",{className:s.title,title:l,children:l}):null,e.jsx("span",{className:r(s.status,a&&s.statusRunning,o&&s.statusFailed),children:i})]})}function Ys({call:t}){const{styles:s}=ce(),r=t.status==="running"||t.status==="pending";return t.arguments?e.jsx("section",{className:s.run,"aria-busy":r,children:e.jsxs("details",{className:s.run,children:[e.jsx("summary",{className:s.summary,children:e.jsx(Oe,{call:t})}),e.jsx("pre",{className:s.pre,children:Hs(t.arguments)})]})}):e.jsx("section",{className:s.run,"aria-busy":r,children:e.jsx("p",{className:s.line,children:e.jsx(Oe,{call:t})})})}function $n({text:t,tools:s=[],live:r=!1,align:n="start"}){const{styles:a,cx:o}=ce(),{t:i}=A("ai"),[l,d]=h.useState(r),[c,p]=h.useState(!1),m=c?i("chat.copied",{defaultValue:"Copied"}):i("chat.copyMessage",{defaultValue:"Copy message"}),f=l?i("chat.hideToolCalls",{defaultValue:"Hide tool calls"}):i("chat.showToolCalls",{defaultValue:"Show tool calls"});async function u(){try{await navigator.clipboard.writeText(t),p(!0),window.setTimeout(()=>p(!1),1200)}catch{p(!1)}}return!t&&s.length===0?null:e.jsxs("div",{className:o("chat-message-actions",a.root,n==="end"&&a.rootEnd,l&&s.length>0&&"has-tools"),children:[e.jsxs("div",{className:a.actions,children:[t?e.jsx(te,{title:m,placement:"bottom",children:e.jsx("button",{type:"button",className:a.action,"aria-label":m,onClick:()=>void u(),children:c?e.jsx(Ws,{}):e.jsx(Us,{})})}):null,s.length>0?e.jsx(te,{title:f,placement:"bottom",children:e.jsx("button",{type:"button",className:a.action,"aria-expanded":l,"aria-label":f,onClick:()=>d(g=>!g),children:e.jsx(qs,{open:l})})}):null]}),s.length>0?e.jsx("div",{className:o("chat-tool-log",a.rows),hidden:!l,children:s.map(g=>e.jsx(Ys,{call:g},g.id))}):null]})}const Js={width:"100%"};function Ae({autofocus:t,disabled:s,registry:r,id:n,htmlName:a,multiple:o,onBlur:i,onChange:l,onFocus:d,options:c,placeholder:p,readonly:m,value:f,schema:u}){const[g,v]=h.useState(!1),{formContext:S}=r,{readonlyAsDisabled:j=!0}=S,{enumOptions:y,enumDisabled:x,emptyValue:w}=c,b=Yt(c),L=N=>l(me(N,y,b,w)),E=()=>i(n,me(f,y,b,w)),$=()=>d(n,me(f,y,b,w)),ne=(N,M)=>M&&Ze(M.label)?M.label.toLowerCase().includes(N.toLowerCase()):!1,Z=Ae.getPopupContainerCallback(),B=Jt(f,y,!!o,b,w),J={name:a||n},ae=!o&&u.default===void 0,H=h.useMemo(()=>{if(Array.isArray(y)){const N=y.map(({value:M,label:de},re)=>({disabled:Array.isArray(x)&&x.includes(M),key:String(re),value:Kt(M,re,b),label:de}));return ae&&N.unshift({value:"",label:p||""}),N}},[x,y,p,ae,b]);return e.jsx(G,{open:g,autoFocus:t,disabled:s||j&&m,getPopupContainer:Z,id:n,mode:o?"multiple":void 0,onBlur:m?void 0:E,onChange:m?void 0:L,onFocus:m?void 0:$,placeholder:p,style:Js,value:B,maxTagCount:o?"responsive":void 0,...J,onOpenChange:v,filterOption:ne,"aria-describedby":Ce(n),options:H})}Ae.getPopupContainerCallback=()=>t=>(t==null?void 0:t.parentElement)??document.body;const Ks={width:"100%"};function rt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function ot(t,s){if(!Array.isArray(t))return[];const r=[];for(const n of t){if(!rt(n)||n.value==null||n.value==="")continue;const a=ot(n.children,s),o=String(n.value);r.push({value:o,title:n.label==null||n.label===""?o:String(n.label),disabled:n.disabled===!0||s&&a.length>0,children:a.length>0?a:void 0})}return r}function Xs(t){const s=new Map,r=n=>{const a=String(n.value??""),o=n.children??[],i=o.length===0?n.disabled||a===""?[]:[a]:o.flatMap(l=>r(l));return a!==""&&s.set(a,i),i};return t.forEach(r),s}function Be(t,s){const r=new Set,n=[],a=i=>{const l=s.get(i),d=l===void 0?[i]:l;for(const c of d)c!==""&&!r.has(c)&&(r.add(c),n.push(c))},o=i=>{if(Array.isArray(i)){i.forEach(o);return}if(!(i==null||i==="")){if(rt(i)){if(i.halfChecked===!0)return;"value"in i&&o(i.value);return}a(String(i))}};return o(t),n}const Gs=(t,s)=>{const r=s.title;return typeof r=="string"&&r.toLowerCase().includes(t.toLowerCase())},Qs=t=>t.parentElement??document.body;function Zs({autofocus:t,disabled:s,registry:r,id:n,multiple:a,onBlur:o,onChange:i,onFocus:l,placeholder:d,readonly:c,value:p,schema:m}){const{formContext:f}=r,{readonlyAsDisabled:u=!0}=f,g=!!a||m.type==="array",v=h.useMemo(()=>ot(m["x-tree-options"],!g),[m,g]),S=h.useMemo(()=>Xs(v),[v]),j=Be(p,S),y=g?j:j[0],x=w=>{const b=Be(w,S);i(g?b:b[0])};return e.jsx(_e,{id:n,autoFocus:t,allowClear:!0,disabled:s||u&&c,getPopupContainer:Qs,placeholder:d,showSearch:!0,style:Ks,treeData:v,treeDefaultExpandAll:!0,treeCheckable:g||void 0,showCheckedStrategy:g?_e.SHOW_CHILD:void 0,maxTagCount:g?"responsive":void 0,value:y,filterTreeNode:Gs,onBlur:c?void 0:()=>o(n,p),onChange:c?void 0:x,onFocus:c?void 0:()=>l(n,p),"aria-describedby":Ce(n)})}function en(t){const{disabled:s,registry:r,id:n,onBlur:a,onChange:o,onFocus:i,options:l,placeholder:d,readonly:c,value:p}=t,{formContext:m}=r,{readonlyAsDisabled:f=!0}=m,{type:u,...g}=Xt(t.schema,"password",l,!1),v=l.emptyValue||"",S=({target:x})=>o(x.value===""?v:x.value),j=({target:x})=>a(n,x.value),y=({target:x})=>i(n,x.value);return e.jsx(F.Password,{...g,disabled:s||f&&c,id:n,name:n,onBlur:c?void 0:j,onChange:c?void 0:S,onFocus:c?void 0:y,placeholder:d,value:p||"","aria-describedby":Ce(n)})}const{FieldTemplate:ge}=Zt,tn=2,sn=O(({css:t})=>({jsonSchemaForm:t`
      .ant-form-item-control-input-content>#root {
        border-width: 0;
        padding: 0px;
        display: contents;
      }
      >.ant-btn-submit{
        display: none;
      }
      >.field-object>.ant-form-item{
        margin-bottom: 0px;
      }
      .ant-col:empty{
        display: none; 
      }
      .ant-form-item{
        >.ant-form-item-with-help,.ant-form-item-has-feedback.ant-form-item-has-error{
          margin-bottom: 0px;
        }
      }
      .ant-form-item-additional{
        height: 24px;
        overflow: hidden;
      }
      .ant-form-item-additional:has(>.ant-form-item-explain){
        >.ant-form-item-extra{
          display: none;
        }
      }
    `})),nn=t=>{var s;return e.jsx(it,{...t,schema:{...t.schema||{},"x-data-source":{...((s=t.schema)==null?void 0:s["x-data-source"])||{},type:"toolsets"}}})};function xe(t){if(t==null)return"";try{return JSON.stringify(t,null,tn)}catch{return""}}function He(t){const s=t.trim();if(s!=="")try{return JSON.parse(s)}catch{return}}function an({t,...s}){const{isDarkMode:r}=ts(),{formData:n,schema:a,onChange:o,disabled:i,id:l,required:d,name:c,fieldPathId:p}=s,m=Array.isArray(a.examples)?a.examples:[],f=h.useRef(void 0),u=h.useRef(!1),[g,v]=h.useState(()=>xe(n)),[S,j]=h.useState(null),y=ct(s.fieldPathId.path);h.useEffect(()=>{if(u.current){u.current=!1;return}f.current!==n&&(f.current=n,v(xe(n)),j(null))},[n]);const x=h.useCallback(b=>{v(b);const L=He(b);if(L===void 0&&b.trim()!==""){j("Invalid JSON");return}j(null),f.current=L,u.current=!0,o(L,p.path)},[o,p]),w=h.useCallback(b=>{const L=m[b];if(L===void 0)return;let E=typeof L=="string"?He(L):L;E&&typeof E=="object"&&!Array.isArray(E)&&"value"in E&&E.value!==void 0&&(E=E.value);const $=xe(E);v($),j(null),f.current=E,u.current=!0,o(E,p.path)},[o,m,p]);return e.jsxs("div",{id:l,style:{position:"relative"},children:[m.length>0&&e.jsx("div",{style:{position:"absolute",top:8,right:8,zIndex:10},children:e.jsx(G,{placeholder:"Load example…",allowClear:!0,style:{minWidth:160},disabled:i,options:m.map((b,L)=>({label:typeof b=="object"&&b!==null&&"title"in b?String(b.title):`Example ${L+1}`,value:L})),onChange:b=>b!=null&&w(b)})}),e.jsx("div",{className:"ant-form-item-label",children:e.jsx("label",{className:d?"ant-form-item-required":"ant-form-item-optional",children:y?t==null?void 0:t(`${y}.label`,{defaultValue:a.title||c}):a.title||c})}),e.jsx(ss,{value:g,height:"200px",theme:r?"dark":"light",extensions:[ns()],onChange:x,editable:!i,basicSetup:{lineNumbers:!0,foldGutter:!0}}),S&&e.jsx("div",{className:"ant-form-item-additional",children:e.jsx("div",{className:"ant-form-item-explain ant-form-item-explain-connected",children:e.jsx("div",{className:"ant-form-item-explain-error",children:e.jsx("div",{id:"root_args__error",children:e.jsx("div",{children:S})})})})})]})}const rn=t=>s=>e.jsx(an,{...s,t});function on(t){return Array.isArray(t)?t:t&&typeof t=="object"&&Array.isArray(t.data)?t.data:[]}function qe(t,s,r="",n="",a){const o=s.label_key?t[s.label_key]:void 0,i=s.value_key?t[s.value_key]:void 0,l=i!=null&&String(i)!==""?String(i):n,d=o!=null&&String(o)!==""?String(o):r||l;return{label:a?a(d,t):d,value:l}}function ln(t,s){const r=t.search_key||"search";return{current:1,page_size:20,...t.params||{},...t.filter||{},...s?{[r]:s}:{}}}function ye(t,s){return s?(Array.isArray(t)?t:t==null||t===""?[]:[t]).filter(n=>n!=null&&n!=="").map(n=>String(n)):t==null||t===""?[]:[String(t)]}async function cn(t,s){switch(t.type){case"toolsets":return((await T.system.listToolSets(s)).data??[]).map(n=>qe(n,t,n.name,n.id,(a,o)=>s.type?a:e.jsxs("span",{children:[e.jsx(X,{color:"blue",style:{marginInlineEnd:0},children:o.type})," ",a]}))).filter(n=>n.value!=="");case"api":{if(!t.url)return[];const r=t.url.startsWith("/")?await ps(t.url,{method:t.method,params:s}):(await es(t.url,{params:s,method:t.method})).data;return on(r).map(n=>qe(n,t)).filter(n=>n.value!=="")}default:return[]}}const it=t=>{const{schema:s,value:r,onChange:n,disabled:a,readonly:o,multiple:i,placeholder:l}=t,d=(s==null?void 0:s["x-data-source"])||{},c=!!i||(s==null?void 0:s.type)==="array",[p,m]=h.useState(""),f=h.useRef(new Map),u=h.useMemo(()=>ln(d,p),[d,p]),g=`${d.type??""}:${d.method??""}:${d.url??""}:${JSON.stringify(u)}`,v=typeof d.cache_ttl=="number"?d.cache_ttl*1e3:0,{data:S,loading:j}=R(()=>cn(d,u),{ready:d.type==="toolsets"||d.type==="api",refreshDeps:[g],debounceWait:300,cacheKey:g,cacheTime:v,staleTime:v}),y=h.useMemo(()=>{const w=new Map;for(const b of S??[])f.current.set(b.value,b.label||b.value),w.set(b.value,b);for(const b of ye(r,c))w.has(b)||w.set(b,{label:f.current.get(b)||b,value:b});return Array.from(w.values())},[S,r,c]),x=c?ye(r,!0):ye(r,!1)[0];return e.jsx(G,{mode:c?"multiple":void 0,maxTagCount:c?"responsive":void 0,maxTagPlaceholder:w=>`+${w.length}`,showSearch:!0,filterOption:!1,onSearch:m,onOpenChange:w=>{w||m("")},options:y,value:x,loading:j,disabled:a||o,placeholder:l,allowClear:!0,onChange:w=>n==null?void 0:n(c?Array.isArray(w)?w:[]:w),style:{width:"100%"}})};function lt(t){const s=t.$defs||t.definitions||{};function r(a){if(!a.startsWith("#/$defs/")&&!a.startsWith("#/definitions/"))return null;const o=a.split("/").pop();return o?s[o]:null}function n(a){if(!a)return{};if(a.$ref){const i=r(a.$ref);return n(i)}const o={};if(Object.keys(a).forEach(i=>{i.startsWith("x-ui-")&&(o[`ui:${i.slice(5)}`]=a[i])}),a["x-hidden"]&&(o["ui:widget"]="hidden"),a["x-disabled"]&&(o["ui:disabled"]=!0),a.type==="object"){if(a.properties)for(const[i,l]of Object.entries(a.properties)){const d=n(l);Object.keys(d).length>0&&(o[i]=d)}a.dependencies&&Object.keys(a.dependencies).forEach(i=>{const l=a.dependencies[i];l.properties?Object.keys(l.properties).forEach(d=>{const c=n(l.properties[d]);Object.keys(c).length>0&&(o[i]=c)}):l.oneOf&&l.oneOf.forEach(d=>{d.properties&&Object.keys(d.properties).forEach(c=>{const p=n(d.properties[c]);o[c]=p})})})}return a.type==="array"&&a.items&&(o.items=n(a.items)),a.oneOf&&(o["ui:options"]={...o["ui:options"]||{},oneOf:a.oneOf.map(i=>n(i))}),a.anyOf&&(o["ui:options"]={...o["ui:options"]||{},anyOf:a.anyOf.map(i=>n(i))}),a.allOf&&(o["ui:options"]={...o["ui:options"]||{},allOf:a.allOf.map(i=>n(i))}),o}if(t.$ref){const a=r(t.$ref);return n(a)}return n(t)}const ct=t=>t.filter(s=>!fs(s)).join("."),dn=t=>({uiSchema:s,label:r,...n})=>{if(!ge)return null;const a=ct(n.fieldPathId.path);if(!t||!a)return e.jsx(ge,{...n,label:r,uiSchema:s});const o=s==null?void 0:s["ui:placeholder"],i=()=>{var l,d,c,p;if((l=n.description)!=null&&l.props)return e.jsx(n.registry.templates.DescriptionFieldTemplate,{...(d=n.description)==null?void 0:d.props,description:t==null?void 0:t(`${a}.description`,{defaultValue:(p=(c=n.description)==null?void 0:c.props)==null?void 0:p.description})})};return e.jsx(ge,{...n,label:t==null?void 0:t(`${a}.label`,{defaultValue:r}),description:i(),uiSchema:{...s,...o?{"ui:placeholder":t==null?void 0:t(`${a}.placeholder`,{defaultValue:o})}:{}}})},un=t=>{const s=t.split("-")[0];return Pe[t]||Pe[s]},ve=({schema:t,value:s,onChange:r,uiSchema:n,disabled:a=!1,formRef:o,t:i})=>{const{styles:l}=sn(),d=s??{},{i18n:c}=A(),p=h.useMemo(()=>Gt({},un(c.language)),[c.language]);h.useImperativeHandle(o,()=>({validate:u=>{const g=p.validateFormData(u,t,void 0,void 0,f);return g.errors.filter(v=>v.name!=="additionalProperties").length>0?(console.error(g.errors),Promise.reject(g.errors[0].message)):Promise.resolve()}}));const m=h.useCallback(({formData:u})=>{r==null||r(u??{})},[r]),f=Ke.useMemo(()=>t?{...lt(t)||{},...n||{}}:{},[t,n]);return e.jsx(Qt,{tagName:"div",className:D(l.jsonSchemaForm,"json-schema-config-form"),schema:t||{},formData:d,onChange:m,validator:p,uiSchema:f||{},disabled:a,showErrorList:!1,liveValidate:"onChange",autoComplete:"off",fields:{objectEditor:rn(i)},widgets:{remoteSelect:it,toolsetsSelect:nn,select:Ae,treeSelect:Zs,password:en},templates:{FieldTemplate:dn(i)},formContext:{descriptionLocation:"tooltip"}})},mn=({schema:t,uiSchema:s,t:r,...n})=>{const a=h.useRef(null);return e.jsx(C.Item,{noStyle:!0,...n,rules:[{validator:(o,i)=>{var l;return(l=a.current)==null?void 0:l.validate(i)},message:""}],children:e.jsx(ve,{schema:t,formRef:a,uiSchema:s,t:r})})},Nn=Object.freeze(Object.defineProperty({__proto__:null,JsonSchemaConfigForm:ve,JsonSchemaConfigFormItem:mn,buildUiSchema:lt,default:ve},Symbol.toStringTag,{value:"Module"}));export{vn as A,$n as C,An as D,se as H,Cn as I,ze as L,wn as O,bn as P,kn as R,Sn as T,Vn as U,jn as a,In as b,Tn as c,Ln as d,En as e,Rn as f,Fn as g,Pn as h,_n as i,nt as j,zn as k,vs as l,ys as m,Dn as n,Mn as o,Nn as p};
