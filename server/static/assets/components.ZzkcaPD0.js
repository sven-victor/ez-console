import{j as e,S as we,u as A,R as be,N as Ae,D as Be,a as D,b as O,A as ut,r as h,I as mt,U as pt,M as He,d as R,P as ft,e as ht,f as gt,L as q,g as xt,h as qe,i as yt,k as bt,l as jt,m as Ue,n as vt,o as wt,T as P,B as I,p as St,q as X,s as Ct,t as kt,v as _,w as Tt,x as te,y as It,z as Y,F as C,C as F,E as We,G as ie,H as Le,J as At,K as Lt,O as Et,Q as Rt,V as Ye,W as Ft,X as Vt,Y as _t,Z as zt,_ as Pt,$ as oe,a0 as Je,a1 as Se,a2 as je,a3 as Dt,a4 as ee,a5 as G,a6 as $t,a7 as Mt,a8 as Nt,a9 as ue,aa as Ot,ab as Bt,ac as Ee,ad as Ht,ae as qt,af as Ut,ag as Wt,ah as Ke,ai as me,aj as Re,ak as Yt,al as Jt,am as Fe,an as Kt,ao as Xt,ap as Gt,aq as Qt,ar as Zt}from"./vendor.CRldfr7p.js";import{u as Ce,a as Xe,b as ke,c as es,d as ts}from"./contexts.Qa9QXZhB.js";import{g as ss,i as ns,a as rs,b as as,c as is,f as os}from"./base.BdNzkkj-.js";import{a as T}from"./index.QVdcYTjv.js";import{b as pe,A as ls,r as cs}from"./client.MFm3WK-R.js";import{f as Ge,h as ds}from"./lodash.Bb75kzRV.js";const Ve=()=>e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100%"},children:e.jsx(we,{size:"large"})}),fn=({element:t,requiredPermission:s,requiredPermissions:a})=>{const{t:n}=A(),{user:r,loading:i,error:o}=Ce(),{hasPermission:l,hasAllPermissions:d}=Xe();return i?e.jsx(Ve,{}):o?o.code==="E4011"?e.jsx(Ve,{}):e.jsx(be,{status:"500",title:"500",subTitle:n("login.fetchCurrentUserError",{defaultValue:"Failed to fetch current user: {{error}}",error:(o==null?void 0:o.message)||o})}):r?s&&!l(s)?e.jsx(Ae,{to:"/forbidden",replace:!0}):a&&!d(a)?e.jsx(Ae,{to:"/forbidden",replace:!0}):t:(window.location.href=ss("/login?redirect="+encodeURIComponent(window.location.href)),null)},us=O(({token:t,css:s})=>({container:s`
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
    `,iconStyle:{cursor:"pointer",padding:"12px",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:18,verticalAlign:"middle","&:hover":{color:t.colorPrimaryTextHover}}})),le=({overlayClassName:t,overlay:s,hidden:a,children:n,...r})=>{const{styles:i}=us();return a?e.jsx(e.Fragment,{}):e.jsx(Be,{popupRender:s,overlayClassName:D(i.container,t),...r,children:e.jsx("span",{className:i.iconStyle,children:n})})},ms=()=>e.jsxs("svg",{viewBox:"0 0 24 24",focusable:"false",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",children:[e.jsx("path",{d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",className:"css-c4d79v"})]}),ps=O(()=>({menuItemStyle:{minWidth:"160px"},menuItemIconStyle:{marginRight:"8px"}})),fs=[{lang:"en-US",label:"English",icon:"🇺🇸"},{lang:"sv-SE",label:"Svenska",icon:"🇸🇪"},{lang:"ar-AE",label:"العربية",icon:"🇦🇪"},{lang:"de-DE",label:"Deutsch",icon:"🇩🇪"},{lang:"es-ES",label:"Español",icon:"🇪🇸"},{lang:"fr-FR",label:"Français",icon:"🇫🇷"},{lang:"zh-CN",label:"中文",icon:"🇨🇳"}],hn=({transformLangConfig:t=a=>a,className:s})=>{const{i18n:a}=A(),{styles:n}=ps(),r=o=>{a.changeLanguage(o)},i={selectedKeys:[a.language],onClick:o=>{r(o.key)},items:t(fs).map(o=>({key:o.lang,className:n.menuItemStyle,label:e.jsxs(e.Fragment,{children:[e.jsx("span",{role:"img","aria-label":(o==null?void 0:o.label)||"en-US",className:n.menuItemIconStyle,children:(o==null?void 0:o.icon)||"🌐"}),(o==null?void 0:o.label)||"en-US"]})}))};return e.jsx(le,{className:s,menu:i,children:e.jsx(ms,{})})},hs=O(({css:t})=>({avatarItem:t`
    :hover {
      background: rgba(0, 0, 0, 0.12);
    }
    padding: 5px;
  `})),Te=t=>Ge(t)&&t.match(/^[-_a-zA-Z0-9]+$/)?pe.endsWith("/")?pe+`files/${t}`:pe+`/files/${t}`:t,gn=({src:t,fallback:s,...a})=>e.jsx(ut,{src:Te(t),icon:s,...a}),gs=({onChange:t,shape:s="square"})=>{const[a,n]=h.useState([]),{styles:r}=hs(),[i,o]=h.useState(!1),[l,d]=h.useState(!0),[c,f]=h.useState(0),{run:m,loading:p}=R(()=>T.base.listFiles({current:c+1,page_size:40,file_type:"avatar",access:"public",search:""}),{manual:!0,onSuccess:({data:y})=>{console.log(y),n([...a,...y]),d(y.length===40),f(c+1)}}),u=()=>{d(!0),f(0),n([])};return e.jsx(ft,{style:{zIndex:1e3},onOpenChange:y=>{o(y),y?m():u()},open:i,content:e.jsx("div",{style:{width:360,height:200},children:e.jsx("div",{id:"iconsScrollableDiv",style:{height:"100%",overflow:"auto"},children:e.jsx(gt,{dataLength:a.length,next:()=>{m()},hasMore:l,loader:e.jsx(yt,{avatar:!0,paragraph:{rows:1},active:!0}),endMessage:e.jsx(qe,{plain:!0,children:"End"}),scrollableTarget:"iconsScrollableDiv",children:e.jsx(q,{grid:{gutter:16,column:8},dataSource:a,style:{margin:"0 8px"},loading:p,renderItem:({id:y})=>e.jsx("div",{className:r.avatarItem,onClick:w=>{w.stopPropagation(),t==null||t(y),o(!1),u()},children:e.jsx(xt,{src:Te(y),placeholder:e.jsx(we,{size:"default"}),preview:!1})})})})})}),placement:"bottom",trigger:"hover",children:e.jsx(ht,{shape:s,style:{width:112,height:112,placeContent:"center"}})})},xs=({value:t,onChange:s,shape:a,...n})=>{const[r,i]=h.useState(void 0),[o,l]=h.useState(!1),[d,c]=h.useState(void 0),f=async m=>{l(!0),c(m.url??m.preview)};return h.useEffect(()=>{i(t?{uid:t,name:t,url:Te(t)}:void 0)},[t]),e.jsxs(e.Fragment,{children:[e.jsx(mt,{beforeCrop:async m=>{if(m.type==="image/svg+xml"){const p=await T.base.uploadFile({type:"avatar"},m);return p.length>0&&(s==null||s(p[0].id)),!1}return!0},children:e.jsx(pt,{customRequest:async m=>{var u,y;const p=await T.base.uploadFile({type:"avatar",access:"public"},m.file);p.length>0?((u=m.onSuccess)==null||u.call(m,p[0].id),s==null||s(p[0].id)):(y=m.onError)==null||y.call(m,new Error("Upload file failed"))},listType:"picture-card",onPreview:f,maxCount:1,onChange:({file:m})=>{switch(m.status){case"removed":s==null||s(void 0);break;case"done":break;default:i(m);break}},fileList:r?[r]:[],...n,children:r?void 0:e.jsx(gs,{shape:a,onChange:s})})}),e.jsx(He,{open:o,footer:null,onCancel:()=>l(!1),children:e.jsx("img",{style:{width:"100%"},src:d})})]})},xn=({className:t})=>{const{t:s}=A("common"),{user:a}=Ce(),{currentOrgId:n,setCurrentOrgId:r}=ke(),i=(a==null?void 0:a.organizations)||[],o=f=>{r(f),window.location.reload()};if(i.length===0)return null;const l=i.find(f=>f.id===n),d=l?l.name:s("organization.global",{defaultValue:"Global"}),c=[...i.map(f=>({key:f.id,label:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{children:f.name}),n===f.id&&e.jsx(bt,{})]}),onClick:()=>o(f.id)}))];return e.jsxs(le,{className:t,menu:{items:c,selectedKeys:n?[n]:[""]},children:[e.jsx(jt,{style:{marginRight:4}}),e.jsx("span",{style:{height:"1em",lineHeight:"1em",marginLeft:"5px"},children:d})]})},ys={pending:"default",running:"processing",success:"success",failed:"error",cancelled:"default"},yn=({className:t})=>{const{t:s}=A("task"),a=Ue(),{user:n}=es(),{tasksDropdownOpen:r,setTasksDropdownOpen:i,tasks:o,setTasks:l}=ke(),{runAsync:d,loading:c}=R(async()=>T.tasks.listUserTasks({}),{onSuccess:p=>{ns(o,p,(u,y)=>u.id===y.id&&u.status===y.status&&u.progress===y.progress)||l(p)},pollingInterval:r?3e3:6e4,ready:!!n,refreshDeps:[n]});h.useEffect(()=>{r&&d()},[r]);const f=async p=>{const u=await T.base.downloadFile({fileKey:p},{params:{method:"sign"}}),y=`/api/files/${p}?signature=${u.signature}&expires=${u.expires}`;window.open(y,"_blank")},m=()=>e.jsxs("div",{style:{width:520,maxHeight:500,overflow:"auto",padding:8},children:[e.jsx(q,{size:"small",dataSource:o,loading:c,renderItem:p=>e.jsx(q.Item,{extra:e.jsx(X,{color:ys[p.status],style:{marginLeft:6},children:s(`status.${p.status}`,{defaultValue:p.status})}),actions:[p.artifact_file_key&&e.jsx(I,{type:"text",size:"small",icon:e.jsx(St,{}),onClick:()=>f(p.artifact_file_key)})].filter(Boolean),children:e.jsx(q.Item.Meta,{title:e.jsx("span",{style:{fontSize:13},children:e.jsxs(P.Text,{ellipsis:{tooltip:!0},children:[s(`type.${p.type}`,{defaultValue:p.type})," ",p.artifact_file_name&&`- ${p.artifact_file_name}`]})}),description:(p.status==="running"||p.status==="pending")&&e.jsx(wt,{percent:p.progress??0,size:"small",style:{marginTop:4}})})},p.id)}),e.jsx("div",{style:{borderTop:"1px solid #f0f0f0",paddingTop:8,marginTop:8,textAlign:"center"},children:e.jsx(I,{type:"link",size:"small",onClick:()=>a("/tasks"),children:s("more",{defaultValue:"More"})})})]});return!o||o.length===0?null:e.jsxs(le,{className:t,overlay:m,placement:"bottomRight",open:r,onOpenChange:i,children:[e.jsx(vt,{style:{marginRight:4}}),e.jsx("span",{style:{height:"1em",lineHeight:"1em",marginLeft:2},children:s("tasks",{defaultValue:"Tasks"})})]})},bs=20,bn=({className:t})=>{const{t:s}=A("inbox"),a=Ue(),{user:n}=Ce(),{inboxUnreadCount:r,inboxRevision:i,setInboxUnreadCount:o,bumpInboxRevision:l}=ke(),[d,c]=h.useState(!1),{data:f=[],loading:m,run:p}=R(async()=>(await T.inbox.listInboxMessages({current:1,page_size:bs})).data??[],{ready:!!n,refreshDeps:[n==null?void 0:n.id,i]}),u=async S=>{await T.inbox.markInboxMessageRead({id:S}),l(),p()},y=async()=>{await T.inbox.markAllInboxMessagesRead(),o(0),l(),p()},w=()=>e.jsxs("div",{style:{width:420,maxHeight:500,overflow:"auto",padding:8},children:[e.jsx(q,{size:"small",dataSource:f,loading:m,locale:{emptyText:s("empty",{defaultValue:"No messages"})},renderItem:S=>{const j=rs(S);return e.jsx(q.Item,{style:{cursor:j?"pointer":"default"},onClick:()=>{j&&u(S.id)},children:e.jsx(q.Item.Meta,{title:e.jsx(P.Text,{strong:j,ellipsis:{tooltip:!0},children:is(s,S)}),description:e.jsxs(_,{direction:"vertical",size:0,style:{width:"100%"},children:[e.jsx(P.Text,{type:"secondary",ellipsis:{tooltip:!0},children:as(s,S)}),e.jsx(P.Text,{type:"secondary",style:{fontSize:12},children:S.created_at?new Date(S.created_at).toLocaleString():""})]})})},S.id)}}),e.jsxs("div",{style:{borderTop:"1px solid #f0f0f0",paddingTop:8,marginTop:8,display:"flex",justifyContent:"space-between"},children:[e.jsx(I,{type:"link",size:"small",disabled:r<=0,onClick:()=>void y(),children:s("markAllRead",{defaultValue:"Mark all as read"})}),e.jsx(I,{type:"link",size:"small",onClick:()=>{c(!1),a("/inbox")},children:s("viewAll",{defaultValue:"View all"})})]})]});return e.jsx(le,{className:t,overlay:w,placement:"bottomRight",open:d,onOpenChange:c,children:e.jsx(Ct,{count:r,size:"small",overflowCount:99,children:e.jsx(kt,{style:{marginRight:4,height:18,width:18,fontSize:18}})})})},js=O(({token:t,css:s})=>({root:s`
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
  `})),jn=({onResize:t,minWidth:s=300,maxWidth:a=window.innerWidth*.5})=>{const{styles:n}=js(),[r,i]=h.useState(!1),[o,l]=h.useState(!1),d=h.useCallback(m=>{m.preventDefault(),i(!0)},[]),c=h.useCallback(m=>{if(!r)return;const p=window.innerWidth-m.clientX,u=Math.max(s,Math.min(a,p));t(u)},[r,s,a,t]),f=h.useCallback(()=>{i(!1)},[]);return h.useEffect(()=>{if(r)return document.addEventListener("mousemove",c),document.addEventListener("mouseup",f),document.body.style.cursor="col-resize",document.body.style.userSelect="none",()=>{document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",f),document.body.style.cursor="",document.body.style.userSelect=""}},[r,c,f]),e.jsx("div",{onMouseDown:d,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),className:D(n.root,r&&n.dragging),children:e.jsx("div",{className:D(n.grip,o&&n.gripHover,r&&n.gripDragging)})})},Q=40,vs=28,ws=6,Qe="ai-chat-float-pos",Ss=O(({token:t,css:s})=>({root:s`
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
  `}));function z(t,s,a){return Math.min(Math.max(t,s),a)}function U(){return Math.max(0,window.innerWidth-Q)}function W(){return Math.max(0,window.innerHeight-Q)}function fe(){const t=U(),s=W();return{rx:t>0?z((t-24)/t,0,1):1,ry:s>0?z((s-24)/s,0,1):1,edge:null}}function Ze(t,s,a){let n=z(t,0,U()),r=z(s,0,W());return a==="left"&&(n=0),a==="right"&&(n=U()),a==="top"&&(r=0),a==="bottom"&&(r=W()),{x:n,y:r,edge:a}}function et(t){const s=U(),a=W();return{rx:s>0?z(t.x/s,0,1):0,ry:a>0?z(t.y/a,0,1):0,edge:t.edge}}function _e(t){return Ze(t.rx*U(),t.ry*W(),t.edge)}function Cs(){try{const t=localStorage.getItem(Qe);if(!t)return fe();const s=JSON.parse(t);return typeof s.rx=="number"&&typeof s.ry=="number"?{rx:z(s.rx,0,1),ry:z(s.ry,0,1),edge:s.edge??null}:typeof s.x=="number"&&typeof s.y=="number"?et({x:z(s.x,0,U()),y:z(s.y,0,W()),edge:s.edge??null}):fe()}catch{return fe()}}function ze(t){localStorage.setItem(Qe,JSON.stringify(t))}function ks(t,s){const a=t,n=window.innerWidth-(t+Q),r=s,i=window.innerHeight-(s+Q),o=Math.min(a,n,r,i);return o>vs?null:o===a?"left":o===n?"right":o===r?"top":"bottom"}const Ts=({className:t,eyeClassName:s})=>e.jsxs("svg",{className:t,viewBox:"0 0 64 64","aria-hidden":!0,children:[e.jsx("circle",{cx:"32",cy:"12",r:"3.2",fill:"rgba(255,255,255,0.9)"}),e.jsx("rect",{x:"30.4",y:"14",width:"3.2",height:"7",rx:"1.4",fill:"rgba(255,255,255,0.85)"}),e.jsx("rect",{x:"10",y:"22",width:"44",height:"34",rx:"14",fill:"rgba(255,255,255,0.95)"}),e.jsx("rect",{x:"16",y:"28",width:"32",height:"18",rx:"9",fill:"rgba(0,0,0,0.12)"}),e.jsx("ellipse",{className:s,cx:"25",cy:"37",rx:"4.2",ry:"5",fill:"#1f2937"}),e.jsx("ellipse",{className:s,cx:"39",cy:"37",rx:"4.2",ry:"5",fill:"#1f2937"}),e.jsx("circle",{cx:"26.2",cy:"35.5",r:"1.2",fill:"#fff"}),e.jsx("circle",{cx:"40.2",cy:"35.5",r:"1.2",fill:"#fff"}),e.jsx("path",{d:"M26 48c2.2 2.4 9.8 2.4 12 0",stroke:"#1f2937",strokeWidth:"2.2",strokeLinecap:"round",fill:"none"}),e.jsx("rect",{x:"4",y:"34",width:"7",height:"10",rx:"3.5",fill:"rgba(255,255,255,0.9)"}),e.jsx("rect",{x:"53",y:"34",width:"7",height:"10",rx:"3.5",fill:"rgba(255,255,255,0.9)"})]}),vn=({icon:t})=>{const{styles:s}=Ss(),{setVisible:a,visible:n}=ts(),{t:r}=A("ai"),i=h.useRef(typeof window>"u"?{rx:1,ry:1,edge:null}:Cs()),[o,l]=h.useState(()=>typeof window>"u"?{x:0,y:0,edge:null}:_e(i.current)),[d,c]=h.useState(!1),f=h.useRef(null),m=h.useRef(o);m.current=o;const p=!d&&o.edge==="left"?s.dockLeft:!d&&o.edge==="right"?s.dockRight:!d&&o.edge==="top"?s.dockTop:!d&&o.edge==="bottom"?s.dockBottom:void 0,u=h.useCallback(g=>{const x=et(g);i.current=x,ze(x),l(g)},[]),y=h.useCallback(()=>{f.current||l(_e(i.current))},[]);h.useEffect(()=>(ze(i.current),window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)),[y]);const w=g=>{g.button===0&&(g.currentTarget.setPointerCapture(g.pointerId),f.current={pointerId:g.pointerId,startX:g.clientX,startY:g.clientY,originX:m.current.x,originY:m.current.y,moved:!1},c(!0))},S=g=>{const x=f.current;if(!x||x.pointerId!==g.pointerId)return;const v=g.clientX-x.startX,b=g.clientY-x.startY;!x.moved&&Math.hypot(v,b)>ws&&(x.moved=!0),l({x:z(x.originX+v,0,U()),y:z(x.originY+b,0,W()),edge:null})},j=g=>{const x=f.current;if(!x||x.pointerId!==g.pointerId)return;try{g.currentTarget.releasePointerCapture(g.pointerId)}catch{}const v=!x.moved;if(f.current=null,c(!1),v){a(!0);return}const b=ks(m.current.x,m.current.y);u(Ze(m.current.x,m.current.y,b))};return n?null:Tt.createPortal(e.jsx(te,{title:r("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",mouseEnterDelay:.4,open:d?!1:void 0,children:e.jsx("button",{type:"button","aria-label":r("chat.openAssistant",{defaultValue:"Open AI Assistant"}),className:D("ai-chat-float-button",s.root,d&&s.dragging,!d&&o.edge&&s.docked,p),style:{left:o.x,top:o.y},onPointerDown:w,onPointerMove:S,onPointerUp:j,onPointerCancel:j,children:t??e.jsx("span",{className:s.body,children:e.jsx(Ts,{className:s.robot,eyeClassName:s.eye})})})}),document.body)},Is=It,As=t=>Is[t],wn=({iconName:t})=>{if(!t)return null;const s=As(t);return s?e.jsx(h.Suspense,{fallback:null,children:e.jsx(s,{})}):null},Sn=({className:t,onSuccess:s,token:a})=>{const{message:n}=Y.useApp(),{t:r}=A("authorization"),{t:i}=A("common"),[o]=C.useForm(),{run:l,loading:d}=R(async c=>T.authorization.changePassword(c,a?{headers:{Authorization:`Bearer ${a}`}}:{}),{manual:!0,onSuccess:()=>{n.success(r("user.passwordChanged")),o.resetFields(),s==null||s()},onError:c=>{if(c instanceof ls){const f=c.code??"normal";n.error(r(`user.passwordChangeFailed.${f}`,{error:c.message,defaultValue:"Password change failed: {{error}}"}))}else n.error(r("user.passwordChangeFailed.normal",{error:c.message,defaultValue:"Password change failed: {{error}}"}));console.error("Failed to change password:",c)}});return e.jsxs(C,{form:o,layout:"vertical",onFinish:l,style:{maxWidth:500,margin:"0 auto"},className:D("profile-password",t),children:[e.jsx(C.Item,{name:"old_password",label:r("user.oldPassword"),rules:[{required:!0,message:r("validation.oldPasswordRequired")}],className:D("profile-password-item","profile-password-item-old-password"),children:e.jsx(F.Password,{})}),e.jsx(C.Item,{name:"new_password",label:r("user.newPassword"),rules:[{required:!0,message:r("validation.newPasswordRequired")},{min:8,message:r("validation.passwordMinLength")}],className:D("profile-password-item","profile-password-item-new-password"),children:e.jsx(F.Password,{})}),e.jsx(C.Item,{name:"confirm_password",label:r("user.confirmPassword"),className:D("profile-password-item","profile-password-item-confirm-password"),rules:[{required:!0,message:r("validation.confirmPasswordRequired")},({getFieldValue:c})=>({validator(f,m){return!m||c("new_password")===m?Promise.resolve():Promise.reject(new Error(r("validation.passwordMismatch")))}})],children:e.jsx(F.Password,{})}),e.jsx(C.Item,{className:D("profile-password-item","profile-password-item-submit"),children:e.jsx(I,{type:"primary",htmlType:"submit",loading:d,children:i("save")})})]})},Cn=({user:t,onSuccess:s})=>{const{message:a}=Y.useApp(),{t:n}=A("authorization"),{t:r}=A("common"),[i]=C.useForm(),[o,l]=h.useState(!1);We.useEffect(()=>{t&&i.setFieldsValue({username:t.username,email:t.email,full_name:t.full_name,phone:t.phone||"",avatar:t.avatar})},[t,i]);const d=async c=>{try{l(!0),await T.authorization.updateCurrentUser(c),a.success(r("updateSuccess")),s()}catch(f){a.error(r("updateFailed")),console.error("Failed to update user information:",f)}finally{l(!1)}};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs("div",{style:{marginBottom:24,textAlign:"center"},children:[e.jsx("h2",{children:(t==null?void 0:t.full_name)||(t==null?void 0:t.username)}),(t==null?void 0:t.roles)&&t.roles.length>0&&e.jsxs("div",{children:[n("user.roles"),": ",t.roles.map(c=>c.name).join(", ")]})]}),e.jsxs(C,{form:i,layout:"vertical",onFinish:d,style:{width:"100%",maxWidth:500},children:[e.jsx(C.Item,{style:{marginBottom:24,textAlign:"center",justifyItems:"center"},name:"avatar",children:e.jsx(xs,{})}),e.jsx(C.Item,{name:"username",label:n("user.username"),children:e.jsx(F,{disabled:!0})}),e.jsx(C.Item,{name:"email",label:n("user.email"),rules:[{required:!0,message:n("validation.emailRequired")},{type:"email",message:n("validation.emailInvalid")}],children:e.jsx(F,{})}),e.jsx(C.Item,{name:"full_name",label:n("user.fullName"),rules:[{required:!0,message:n("validation.fullNameRequired")}],children:e.jsx(F,{})}),e.jsx(C.Item,{name:"phone",label:n("user.phone"),children:e.jsx(F,{})}),e.jsx(C.Item,{children:e.jsx(I,{type:"primary",htmlType:"submit",loading:o,children:r("save")})})]})]})},kn=({user:t,onSuccess:s})=>{const{message:a}=Y.useApp(),{t:n}=A("authorization"),{t:r}=A("common"),[i,o]=h.useState(0),[l,d]=h.useState(!1),[c,f]=h.useState(!0),[m,p]=h.useState(""),[u,y]=h.useState("totp"),[w,S]=h.useState(!1),[j,g]=h.useState("password"),[x,v]=h.useState(""),[b,L]=h.useState(""),[E,M]=h.useState(""),[se,Z]=h.useState(""),[B,J]=h.useState(0);h.useEffect(()=>{if(B<=0)return;const k=setTimeout(()=>J(V=>V-1),1e3);return()=>clearTimeout(k)},[B]);const{run:ne,data:H={secret:"",qr_code:"",token:void 0}}=R(()=>T.authorization.enableMfa({mfa_type:u}),{manual:!0,onSuccess:()=>{o(1)},onBefore:()=>{d(!0)},onFinally:()=>{d(!1)}}),N=async()=>{if(!m){a.warning(n("mfa.enterVerificationCode"));return}const k={code:m,mfa_type:u};"token"in H&&(k.token=H.token);try{d(!0),await T.authorization.verifyAndActivateMfa(k),a.success(n("mfa.enableSuccess")),o(2),s()}catch(V){a.error(n("mfa.verificationFailed")),console.error("Failed to verify MFA:",V)}finally{d(!1)}},$=()=>{S(!1),g("password"),v(""),L(""),M(""),Z(""),J(0)},{runAsync:de,loading:re}=R(()=>T.authorization.sendDisableMfaCode(),{manual:!0}),lt=async()=>{try{const k=await de();Z((k==null?void 0:k.token)??""),M(""),J(60),a.success(n("mfa.codeSent",{defaultValue:"Verification code has been sent to your email"}))}catch(k){a.error(k instanceof Error?k.message:r("operationFailed")),console.error("Failed to send disable-MFA code:",k)}},ae=async()=>{if(j==="email"){if(!se){a.warning(n("mfa.sendCodeFirst",{defaultValue:"Please send the verification code first"}));return}if(!E){a.warning(n("mfa.enterVerificationCode"));return}}else if(j==="totp"){if(!b){a.warning(n("mfa.enterVerificationCode"));return}}else if(!x){a.warning(n("mfa.enterPassword",{defaultValue:"Enter your password"}));return}const k={password:"",mfa_code:"",email_code:"",email_token:""};j==="email"?(k.email_code=E,k.email_token=se):j==="totp"?k.mfa_code=b:k.password=x;try{d(!0),await T.authorization.disableMfa(k),a.success(n("mfa.disableSuccess")),$(),s()}catch(V){a.error(V instanceof Error?V.message:r("operationFailed")),console.error("Failed to disable MFA:",V),j==="email"&&(Z(""),M(""),J(0))}finally{d(!1)}},ct=()=>{if(!t)return null;if(t.mfa_enabled)return e.jsx(be,{status:"success",title:n("mfa.enabled"),subTitle:n("mfa.enabledDescription"),extra:e.jsx(I,{danger:!0,onClick:()=>S(!0),children:n("mfa.disable")})});const k=()=>{var V;switch(i){case 0:return e.jsxs("div",{style:{textAlign:"center",marginTop:20},children:[e.jsx(ie,{message:e.jsxs("div",{children:[e.jsx("p",{children:n("mfa.setupInfo")}),e.jsx("p",{children:n(u==="totp"?"mfa.totpDescription":"mfa.emailDescription")})]}),type:"info",showIcon:!0,style:{marginBottom:20}}),e.jsx(I,{type:"primary",onClick:ne,loading:l,children:n("mfa.startSetup")})]});case 1:return e.jsxs("div",{style:{textAlign:"center",marginTop:20},children:[e.jsx(ie,{message:n("mfa.scanQrCode"),type:"info",showIcon:!0,style:{marginBottom:20,display:u==="totp"?"block":"none"}}),e.jsx("div",{style:{display:u==="totp"?"flex":"none",justifyContent:"center",marginBottom:24},children:e.jsx(Rt,{value:H.qr_code??"",size:200})}),e.jsx("div",{style:{marginBottom:16,display:u==="email"?"block":"none"},children:e.jsxs("p",{children:[n("user.email"),": ",e.jsx("strong",{children:t==null?void 0:t.email})]})}),e.jsx("div",{style:{marginBottom:16,display:u==="totp"?"block":"none"},children:e.jsxs("p",{children:[n("mfa.secretKey"),": ",e.jsx("strong",{children:c?"*".repeat(((V=H.secret)==null?void 0:V.length)??0):H.secret}),e.jsx(I,{type:"link",onClick:()=>f(!c),icon:c?e.jsx(Ye,{}):e.jsx(Ft,{})})]})}),e.jsx("div",{style:{marginBottom:24},children:e.jsx(F,{placeholder:n("mfa.enterCode"),style:{width:200},maxLength:6,value:m,onChange:dt=>p(dt.target.value)})}),e.jsxs(_,{children:[e.jsx(I,{onClick:()=>o(0),children:r("previous")}),e.jsx(I,{type:"primary",onClick:N,loading:l,children:r("verify")})]})]});case 2:return e.jsx(be,{status:"success",title:n("mfa.setupSuccess"),subTitle:n("mfa.setupSuccessDescription"),extra:e.jsx(I,{type:"primary",onClick:()=>o(0),children:r("done")})});default:return null}};return e.jsxs("div",{children:[e.jsxs("div",{style:{display:i===2?"none":"unset"},children:[e.jsx(Le,{defaultValue:"totp",onChange:V=>{y(V),o(0)},value:u,options:[{value:"totp",icon:e.jsx(At,{}),label:n("mfa.totp",{defaultValue:"TOTP"})},{value:"email",icon:e.jsx(Lt,{}),label:n("mfa.email",{defaultValue:"E-Mail"})}]}),e.jsx(qe,{})]}),e.jsx(Et,{current:i,items:[{title:n(u==="totp"?"mfa.totpStep1":"mfa.emailStep1"),description:n(u==="totp"?"mfa.totpStep1Description":"mfa.emailStep1Description")},{title:n(u==="totp"?"mfa.totpStep2":"mfa.emailStep2"),description:n(u==="totp"?"mfa.totpStep2Description":"mfa.emailStep2Description")},{title:n(u==="totp"?"mfa.totpStep3":"mfa.emailStep3"),description:n(u==="totp"?"mfa.totpStep3Description":"mfa.emailStep3Description")}],style:{marginBottom:30}}),k()]})};return e.jsxs("div",{style:{padding:8},children:[ct(),e.jsxs(He,{title:n("mfa.confirmDisable"),open:w,onOk:ae,okText:n("mfa.disable"),okButtonProps:{danger:!0,loading:l},onCancel:$,destroyOnHidden:!0,children:[e.jsx(ie,{message:n("mfa.disableWarning"),type:"warning",showIcon:!0,style:{marginBottom:16}}),e.jsx("p",{children:n("mfa.disableVerifyDescription",{defaultValue:"For security reasons, please verify your identity with your password or a verification code."})}),e.jsx(Le,{block:!0,value:j,onChange:k=>g(k),options:[{value:"password",label:n("mfa.methodPassword",{defaultValue:"Password"})},...(t==null?void 0:t.mfa_type)==="totp"?[{value:"totp",label:n("mfa.totp",{defaultValue:"TOTP"})}]:[],{value:"email",label:n("mfa.methodEmailCode",{defaultValue:"Email code"})}],style:{marginBottom:16}}),j==="password"&&e.jsx(F.Password,{placeholder:n("mfa.enterPassword",{defaultValue:"Enter your password"}),autoComplete:"current-password",value:x,onChange:k=>v(k.target.value),onPressEnter:ae}),j==="totp"&&e.jsx(F,{placeholder:n("mfa.enterTotpCode",{defaultValue:"Enter the 6-digit code from your authenticator app"}),maxLength:6,value:b,onChange:k=>L(k.target.value),onPressEnter:ae}),j==="email"&&e.jsxs(_.Compact,{style:{width:"100%"},children:[e.jsx(F,{placeholder:n("mfa.enterEmailCode",{defaultValue:"Enter the 6-digit code sent to your email"}),maxLength:6,value:E,onChange:k=>M(k.target.value),onPressEnter:ae}),e.jsx(I,{onClick:lt,loading:re,disabled:B>0,children:B>0?n("mfa.resendIn",{defaultValue:"Resend ({{seconds}}s)",seconds:B}):n("mfa.sendCode",{defaultValue:"Send code"})})]})]})]})},{Text:he}=P,Tn=()=>{const{message:t}=Y.useApp(),{t:s}=A("authorization"),{t:a}=A("common"),[n,r]=h.useState(null),[i,o]=h.useState(!1),{data:l=[],loading:d,run:c}=R(()=>T.authorization.getUserSessions({}),{onError:u=>{t.error(s("session.getSessionsFailed",{error:u,defaultValue:"Failed to get session list: {{error}}"}))}}),{run:f}=R(u=>T.authorization.terminateSession({id:u}),{onSuccess:()=>{t.success(s("session.terminateSuccess",{defaultValue:"Session terminated successfully"})),c()},onError:u=>{t.error(s("session.terminateFailed",{error:u,defaultValue:"Failed to terminate session: {{error}}"}))},onFinally:()=>{r(null)},onBefore:([u])=>{r(u)},manual:!0}),{run:m}=R(()=>T.authorization.terminateOtherSessions(),{onSuccess:()=>{t.success(s("session.terminateAllSuccess",{defaultValue:"All other sessions terminated successfully"})),c()},onError:u=>{t.error(s("session.terminateAllFailed",{error:u,defaultValue:"Failed to terminate all other sessions: {{error}}"}))},onFinally:()=>{o(!1)},onBefore:()=>{o(!0)},manual:!0}),p=[{title:s("session.device"),dataIndex:"user_agent",key:"device",render:(u,y)=>e.jsxs(_,{direction:"vertical",size:0,children:[e.jsxs(_,{children:[e.jsx(Vt,{}),e.jsx(he,{strong:!0,children:u})]}),e.jsxs(_,{children:[e.jsx(_t,{}),e.jsx(he,{type:"secondary",children:y.location})]})]})},{title:s("session.ipAddress"),dataIndex:"ip_address",key:"ip_address",render:u=>e.jsxs(_,{children:[e.jsx(zt,{}),e.jsx("span",{children:u})]})},{title:s("session.lastActive"),dataIndex:"last_active_at",key:"last_active",render:u=>e.jsxs(_,{children:[e.jsx(Pt,{}),e.jsx("span",{children:new Date(u).toLocaleString()})]})},{title:s("session.status"),key:"status",render:u=>u.is_current?e.jsx(X,{color:"green",children:s("session.current")}):e.jsx(X,{color:"blue",children:s("session.active")})},{title:a("actions"),key:"action",render:u=>u.is_current?e.jsx(he,{type:"secondary",children:s("session.currentSession")}):e.jsx(oe,{title:s("session.confirmTerminate"),onConfirm:()=>f(u.id),okText:a("confirm"),cancelText:a("cancel"),children:e.jsx(I,{type:"link",danger:!0,loading:n===u.id,children:s("session.terminate")})})}];return e.jsxs(_,{direction:"vertical",style:{padding:8,width:"100%"},children:[e.jsxs(_,{direction:"horizontal",style:{float:"right"},children:[l.length>1&&e.jsx(oe,{title:s("session.confirmTerminateAll"),onConfirm:m,okText:a("confirm"),cancelText:a("cancel"),children:e.jsx(I,{danger:!0,loading:i,children:s("session.terminateOthers")})}),e.jsx(I,{onClick:()=>c(),loading:d,children:a("refresh")})]}),!d&&l.length===0?e.jsx(Je,{description:s("session.noSessions")}):e.jsx(Se,{columns:p,dataSource:l,rowKey:"id",loading:d,pagination:!1})]})},{RangePicker:Ls}=$t,{Option:K}=G,Es=t=>t||"N/A",Rs=(t,s)=>t==="success"?e.jsx(X,{color:"success",children:s("statuses.success")}):e.jsx(X,{color:"error",children:s("statuses.failed")}),In=({userId:t,request:s=n=>t?T.authorization.getUserLogs({id:t,...n}):T.authorization.getCurrentUserLogs(n),columnsFilter:a=n=>n})=>{const{message:n,modal:r}=Y.useApp(),{t:i}=A("authorization"),{t:o}=A("common"),[l,d]=h.useState({current:1,pageSize:10,total:0}),[c,f]=h.useState({}),[m]=C.useForm(),{loading:p,run:u,data:{data:y}={}}=R(async(x=c,v=1,b=10)=>s({...x,current:v??1,page_size:b??10}),{onError(x){n.error(i("auditLog.fetchFailed",{error:x}))},onSuccess({total:x}){d({...l,total:x})}});h.useEffect(()=>{u(c,1,l.pageSize)},[]);const w=x=>{d({...l,current:x.current||1,pageSize:x.pageSize||10}),u({},x.current,x.pageSize)},S=x=>{var v,b,L,E;u({...x,start_time:(b=(v=x.dateRange)==null?void 0:v[0])==null?void 0:b.toISOString(),end_time:(E=(L=x.dateRange)==null?void 0:L[1])==null?void 0:E.toISOString()},1,l.pageSize)},j=()=>{m.resetFields(),f({}),d({...l,current:1}),u({},1,l.pageSize)},g=[{title:i("auditLog.timestamp"),dataIndex:"timestamp",key:"timestamp",render:x=>os(x)},{title:i("auditLog.action"),dataIndex:"action",key:"action",render:(x,v)=>x?i(`action.${x.replace(/:/g,".")}`,{defaultValue:i(`permission.title.${x.replace(/:/g,".")}`,{defaultValue:v.action_name})}):v.action_name??v.action},{title:i("auditLog.user_agent"),dataIndex:"user_agent",key:"user_agent"},{title:i("auditLog.ip"),dataIndex:"ip",key:"ip",render:x=>Es(x)},{title:i("auditLog.status"),dataIndex:"status",key:"status",render:x=>Rs(x,i)},{title:i("auditLog.details"),dataIndex:"details",key:"details",render:x=>e.jsx(I,{type:"link",icon:e.jsx(Ye,{}),onClick:()=>{r.info({title:i("auditLog.details"),content:JSON.stringify(x)})}})}];return e.jsxs("div",{children:[e.jsx(je,{style:{marginBottom:16},children:e.jsx(C,{form:m,layout:"horizontal",onFinish:S,initialValues:c,children:e.jsxs(Dt,{gutter:[16,16],children:[e.jsx(ee,{xxl:6,xl:6,lg:8,sm:12,xs:24,children:e.jsx(C.Item,{name:"search",noStyle:!0,children:e.jsx(F,{placeholder:i("auditLog.searchPlaceholder")})})}),e.jsx(ee,{xxl:4,xl:6,lg:8,sm:12,xs:24,children:e.jsx(C.Item,{name:"action",noStyle:!0,children:e.jsxs(G,{allowClear:!0,placeholder:i("auditLog.selectAction"),style:{width:"100%"},children:[e.jsx(K,{value:"login",children:i("actions.login")}),e.jsx(K,{value:"logout",children:i("actions.logout")}),e.jsx(K,{value:"password_reset",children:i("actions.passwordReset")}),e.jsx(K,{value:"mfa_change",children:i("actions.mfaChange")})]})})}),e.jsx(ee,{xxl:3,xl:6,lg:8,sm:12,xs:24,children:e.jsx(C.Item,{name:"status",noStyle:!0,children:e.jsxs(G,{allowClear:!0,placeholder:i("auditLog.selectStatus"),style:{width:"100%"},children:[e.jsx(K,{value:"success",children:i("statuses.success")}),e.jsx(K,{value:"failed",children:i("statuses.failed")})]})})}),e.jsx(ee,{xxl:6,xl:6,lg:10,md:12,sm:12,xs:24,children:e.jsx(C.Item,{name:"dateRange",noStyle:!0,children:e.jsx(Ls,{style:{width:"100%"}})})}),e.jsx(ee,{xxl:5,xl:24,lg:14,md:24,sm:24,xs:24,style:{textAlign:"right"},children:e.jsxs(_,{children:[e.jsx(I,{onClick:j,children:o("reset")}),e.jsx(I,{type:"primary",htmlType:"submit",icon:e.jsx(Mt,{}),children:o("search")})]})})]})})}),e.jsx(je,{children:e.jsx(Se,{rowKey:"id",columns:a(g),dataSource:y,pagination:{...l,showSizeChanger:!0,showTotal:x=>o("totalItems",{total:x})},loading:p,onChange:w,scroll:{x:"max-content"}})})]})},Fs=({request:t,tableRef:s,...a},n)=>{const[r,i]=h.useState({current:1,pageSize:10}),[o,l]=h.useState(0),{data:d,loading:c,refresh:f}=R(async()=>{const m=await t({current:r.current,page_size:r.pageSize});return l(m.total),m.data},{refreshDeps:[r]});return h.useImperativeHandle(n,()=>({reload:()=>{f()}})),e.jsx(Se,{rowKey:"id",loading:c,dataSource:d??[],pagination:{...r,total:o,onChange:(m,p)=>{i({current:m,pageSize:p})}},...a,ref:s})},An=({actionRef:t,...s})=>{const[a,n]=h.useState();return h.useEffect(()=>{n(h.forwardRef(Fs))},[]),a?e.jsx(a,{...s,ref:t}):null},tt=({permission:t,permissions:s=[],checkAll:a=!1,fallback:n=null,children:r})=>{const{hasPermission:i,hasAnyPermission:o,hasAllPermissions:l,isAdmin:d,loading:c}=Xe();return c?null:d?e.jsx(e.Fragment,{children:r}):t?i(t)?e.jsx(e.Fragment,{children:r}):e.jsx(e.Fragment,{children:n}):s.length>0?(a?l(s):o(s))?e.jsx(e.Fragment,{children:r}):e.jsx(e.Fragment,{children:n}):e.jsx(e.Fragment,{children:r})},Pe=t=>{const[s,a]=h.useState(!1),{permission:n,icon:r,tooltip:i,onClick:o,confirm:l,label:d,...c}=t,f=!!c.disabled,m=o?async()=>{a(!0);try{await o()}finally{a(!1)}}:void 0;let p=e.jsx(I,{type:"link",size:"small",loading:s,icon:r,onClick:l&&!f?void 0:m,...c,children:d&&e.jsx("span",{style:{position:"inherit",top:"-2px"},children:d})});if(l&&!f){const u=async()=>{l.onConfirm?await l.onConfirm():m&&await m()};p=e.jsx(oe,{title:l.title,description:l.description,onConfirm:u,okText:l.okText,cancelText:l.cancelText,children:p})}return i&&(p=f?e.jsx(te,{title:i,children:e.jsx("span",{style:{display:"inline-block",cursor:"not-allowed"},children:p})}):e.jsx(te,{title:i,children:p})),n&&(p=e.jsx(tt,{permission:n,children:p})),p},Ln=({actions:t,maxVisibleItems:s})=>{const{modal:a}=Y.useApp(),n=t.filter(l=>!l.hidden);if(!s||n.length<=s)return e.jsx(e.Fragment,{children:n.map(({key:l,...d})=>e.jsx(Pe,{...d},l))});const r=n.slice(0,s-1),o=n.slice(s-1).map(l=>{const{key:d,label:c,icon:f,permission:m,onClick:p,confirm:u,disabled:y,tooltip:w}=l,j={key:d,label:c,icon:f,disabled:y,onClick:async()=>{u?a.confirm({title:u.title,content:u.description,onOk:u.onConfirm||p,okText:u.okText,cancelText:u.cancelText}):p&&await p()}};return m?{...j,label:e.jsx(tt,{permission:m,children:e.jsx("span",{children:c??w})})}:j});return e.jsxs(e.Fragment,{children:[r.map(({key:l,...d})=>e.jsx(Pe,{...d},l)),e.jsx(Be,{menu:{items:o},trigger:["click"],children:e.jsx(I,{type:"text",size:"small",icon:e.jsx(Nt,{})})})]})},{Text:Vs}=P,En=({kind:t,subjectId:s,readOnly:a})=>{const{message:n}=Y.useApp(),{t:r}=A("authorization"),{t:i}=A("common"),[o]=C.useForm(),l=t==="user"?T.authorization.getUserRateLimit:T.authorization.getServiceAccountRateLimit,d=t==="user"?T.authorization.updateUserRateLimit:T.authorization.updateServiceAccountRateLimit,{data:c,loading:f,refresh:m}=R(()=>l({id:s}),{ready:!!s,refreshDeps:[s,t],onSuccess:g=>{o.setFieldsValue({rate:g.rate,period:g.period||"1m",burst:g.burst,quota:g.quota,quota_period:g.quota_period||"1d",enabled:g.enabled!==!1})}}),{run:p,loading:u}=R(async g=>d({id:s},{...g,clear:!1,inherited:!1,enabled:g.enabled!==!1}),{manual:!0,onSuccess:()=>{n.success(r("rateLimit.saveSuccess",{defaultValue:"Rate limit override saved"})),m()},onError:g=>{n.error(g.message||r("rateLimit.saveFailed",{defaultValue:"Failed to save override"}))}}),{run:y,loading:w}=R(async()=>d({id:s},{clear:!0,rate:0,burst:0,quota:0,period:"",quota_period:"",enabled:!1,inherited:!0}),{manual:!0,onSuccess:()=>{n.success(r("rateLimit.resetSuccess",{defaultValue:"Override cleared; type default restored"})),m()},onError:g=>{n.error(g.message)}}),{run:S,loading:j}=R(async()=>t==="user"?T.authorization.resetUserRateLimit({id:s}):T.authorization.resetServiceAccountRateLimit({id:s}),{manual:!0,onSuccess:()=>{n.success(r("rateLimit.resetCountersSuccess",{defaultValue:"Counters reset"}))},onError:g=>{n.error(g.message)}});return e.jsxs(C,{form:o,layout:"vertical",onFinish:p,disabled:a||f,style:{maxWidth:480,marginTop:16},children:[(c==null?void 0:c.inherited)&&e.jsx(ie,{type:"info",showIcon:!0,style:{marginBottom:16},message:r("rateLimit.inherited",{defaultValue:"Using the type default. Save to create a subject-specific override."})}),e.jsx(C.Item,{name:"rate",label:r("rateLimit.rate",{defaultValue:"Rate"}),rules:[{required:!0}],children:e.jsx(ue,{min:1,style:{width:"100%"}})}),e.jsx(C.Item,{name:"period",label:r("rateLimit.period",{defaultValue:"Period"}),extra:r("rateLimit.periodHint",{defaultValue:"Examples: 1s, 1m, 1h"}),children:e.jsx(F,{placeholder:"1m"})}),e.jsx(C.Item,{name:"burst",label:r("rateLimit.burst",{defaultValue:"Burst"}),children:e.jsx(ue,{min:1,style:{width:"100%"}})}),e.jsx(C.Item,{name:"quota",label:r("rateLimit.quota",{defaultValue:"Daily quota (0 = none)"}),children:e.jsx(ue,{min:0,style:{width:"100%"}})}),e.jsx(C.Item,{name:"quota_period",label:r("rateLimit.quotaPeriod",{defaultValue:"Quota period"}),children:e.jsx(F,{placeholder:"1d"})}),e.jsx(C.Item,{name:"enabled",label:r("rateLimit.enabled",{defaultValue:"Enabled"}),valuePropName:"checked",extra:r("rateLimit.enabledHint",{defaultValue:"Off: this override is ignored and the type default applies. Use Reset to default to delete the override."}),children:e.jsx(Ot,{})}),!a&&e.jsxs(_,{children:[e.jsx(I,{type:"primary",htmlType:"submit",loading:u,children:i("save",{defaultValue:"Save"})}),e.jsx(oe,{title:r("rateLimit.resetCountersConfirm",{defaultValue:"Reset rate-limit and quota counters for this subject? They will be able to send requests immediately."}),onConfirm:()=>S(),children:e.jsx(I,{htmlType:"button",icon:e.jsx(Bt,{}),loading:j,children:r("rateLimit.resetCounters",{defaultValue:"Reset counters"})})}),!(c!=null&&c.inherited)&&e.jsx(I,{onClick:()=>y(),loading:w,children:r("rateLimit.resetToDefault",{defaultValue:"Reset to default"})})]}),(c==null?void 0:c.inherited)&&e.jsx(Vs,{type:"secondary",children:r("rateLimit.sourceHint",{defaultValue:"Values shown are inherited."})})]})},{Text:De}=P,_s={debug:"default",info:"processing",warn:"warning",error:"error"},Rn=({taskId:t,poll:s})=>{const{t:a}=A("task"),{data:n=[],loading:r}=R(()=>t?T.tasks.getTaskLogs({id:t}):Promise.reject(new Error("No task id")),{refreshDeps:[t],ready:!!t,pollingInterval:s?2e3:0});return e.jsx(je,{title:a("logsTitle",{defaultValue:"Task logs"}),size:"small",style:{marginTop:16},children:r&&!n.length?e.jsx("div",{style:{textAlign:"center",padding:24},children:e.jsx(we,{})}):n.length?e.jsx("pre",{style:{margin:0,padding:12,maxHeight:320,overflow:"auto",fontSize:12,background:"var(--ant-colorFillTertiary)",borderRadius:6,whiteSpace:"pre-wrap",wordBreak:"break-all"},children:n.map(i=>e.jsxs("div",{style:{marginBottom:4},children:[e.jsx(De,{type:"secondary",style:{fontSize:11},children:i.created_at}),i.level&&e.jsxs(De,{type:_s[i.level],style:{marginLeft:8,fontSize:11},children:["[",i.level,"]"]}),e.jsx("div",{style:{display:"inline",marginLeft:8},children:i.message})]},i.id))}):e.jsx(Je,{description:a("noLogs",{defaultValue:"No logs yet."})})})},zs=O(({token:t,css:s})=>({wrap:s`
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
  `}));function Ps(t){const s=t.trim();if(!s)return"";try{return JSON.stringify(JSON.parse(s),null,2)}catch{return s}}function Ds(t){const s=t.description;if(typeof s=="string"&&s.trim())return s.trim();try{const a=JSON.parse(t.arguments||"{}");return typeof a.description=="string"?a.description.trim():""}catch{return""}}function st(t,s){return t?t.id==="approve"?s("chat.hitlExecute",{defaultValue:t.label||"Execute"}):t.id==="reject"?s("chat.hitlDontExecute",{defaultValue:t.label||"Don't execute"}):t.label:""}function $s(t,s,a){var r;const n=(r=t.options)==null?void 0:r.find(i=>i.id===s);return st(n,a)||s||"…"}const Fn=({card:t,submitting:s=!1,onSelect:a})=>{var S,j;const{t:n}=A("ai"),{styles:r}=zs(),i=Ps(t.arguments||""),[o,l]=h.useState(t.selected_option_id||"");h.useEffect(()=>{l(t.selected_option_id||"")},[t.selected_option_id,t.tool_call_id]);const d=o||t.selected_option_id||"",c=((S=t.title)==null?void 0:S.trim())||t.tool_name,f=!!((j=t.title)!=null&&j.trim()&&t.tool_name&&t.title.trim()!==t.tool_name&&t.tool_name!=="ui_choose"),m=t.kind==="choice"||t.tool_name==="ui_choose",p=Ds(t),u=!m&&!!i,y=t.status==="abandoned"||t.status==="decided";let w;return t.status==="abandoned"?w=e.jsx(P.Text,{type:"secondary",children:n("chat.hitlAbandoned",{defaultValue:"You continued without choosing."})}):y&&d?w=e.jsx(P.Text,{children:n("chat.hitlChose",{defaultValue:"You chose {{label}}.",label:$s(t,d,n)})}):y?w=e.jsx(P.Text,{children:n("chat.hitlChose",{defaultValue:"You chose {{label}}.",label:"…"})}):w=e.jsx("div",{className:r.actions,children:(t.options??[]).map(g=>{const x=d===g.id;return e.jsx(I,{className:r.action,type:x?"primary":"default",loading:s&&x,disabled:s,onClick:()=>{l(g.id),a==null||a(g.id)},children:e.jsxs(Ee,{vertical:!0,align:"flex-start",children:[e.jsx("span",{children:st(g,n)}),g.description?e.jsx("span",{style:{fontSize:12,fontWeight:400,opacity:.85},children:g.description}):null]})},g.id)})}),e.jsxs("div",{className:r.wrap,children:[e.jsxs("div",{className:r.header,children:[e.jsx("span",{className:r.title,children:c}),f?e.jsx(P.Text,{className:r.toolName,type:"secondary",code:!0,children:t.tool_name}):null]}),e.jsxs(Ee,{vertical:!0,gap:8,children:[p?e.jsx("div",{className:r.description,children:p}):null,u?e.jsx(Ht,{className:r.arguments,ghost:!0,size:"small",items:[{key:"arguments",label:n("chat.hitlArguments",{defaultValue:"Arguments"}),children:e.jsx("pre",{className:r.argsPre,children:i})}]}):null,w]})]})};function Ms(t){try{return JSON.stringify(JSON.parse(t),null,2)}catch{return t}}const ce=O(({token:t,css:s})=>({root:s`
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
  `}));function Ns({open:t}){const{styles:s,cx:a}=ce();return e.jsx("svg",{className:a(s.chevron,t&&s.chevronOpen),width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M6 4.5 10 8 6 11.5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Os(){return e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:[e.jsx("rect",{x:"6",y:"6",width:"7",height:"7",rx:"1.4",fill:"none",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M10 6V4.2A1.2 1.2 0 0 0 8.8 3H4.2A1.2 1.2 0 0 0 3 4.2v4.6A1.2 1.2 0 0 0 4.2 10H6",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}function Bs(){return e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M3.5 8.2 6.4 11 12.5 5",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function $e({call:t}){var d;const{styles:s,cx:a}=ce(),{t:n}=A("ai"),r=t.status==="running"||t.status==="pending",i=t.status==="failed",o=i?n("chat.toolFailed",{defaultValue:"Failed"}):r?n("chat.toolRunning",{defaultValue:"Running"}):n("chat.toolDone",{defaultValue:"Done"}),l=(d=t.title)==null?void 0:d.trim();return e.jsxs(e.Fragment,{children:[e.jsx("code",{className:s.name,children:t.name}),l?e.jsx("span",{className:s.title,title:l,children:l}):null,e.jsx("span",{className:a(s.status,r&&s.statusRunning,i&&s.statusFailed),children:o})]})}function Hs({call:t}){const{styles:s}=ce(),a=t.status==="running"||t.status==="pending";return t.arguments?e.jsx("section",{className:s.run,"aria-busy":a,children:e.jsxs("details",{className:s.run,children:[e.jsx("summary",{className:s.summary,children:e.jsx($e,{call:t})}),e.jsx("pre",{className:s.pre,children:Ms(t.arguments)})]})}):e.jsx("section",{className:s.run,"aria-busy":a,children:e.jsx("p",{className:s.line,children:e.jsx($e,{call:t})})})}function Vn({text:t,tools:s=[],live:a=!1,align:n="start"}){const{styles:r,cx:i}=ce(),{t:o}=A("ai"),[l,d]=h.useState(a),[c,f]=h.useState(!1),m=c?o("chat.copied",{defaultValue:"Copied"}):o("chat.copyMessage",{defaultValue:"Copy message"}),p=l?o("chat.hideToolCalls",{defaultValue:"Hide tool calls"}):o("chat.showToolCalls",{defaultValue:"Show tool calls"});async function u(){try{await navigator.clipboard.writeText(t),f(!0),window.setTimeout(()=>f(!1),1200)}catch{f(!1)}}return!t&&s.length===0?null:e.jsxs("div",{className:i("chat-message-actions",r.root,n==="end"&&r.rootEnd,l&&s.length>0&&"has-tools"),children:[e.jsxs("div",{className:r.actions,children:[t?e.jsx(te,{title:m,placement:"bottom",children:e.jsx("button",{type:"button",className:r.action,"aria-label":m,onClick:()=>void u(),children:c?e.jsx(Bs,{}):e.jsx(Os,{})})}):null,s.length>0?e.jsx(te,{title:p,placement:"bottom",children:e.jsx("button",{type:"button",className:r.action,"aria-expanded":l,"aria-label":p,onClick:()=>d(y=>!y),children:e.jsx(Ns,{open:l})})}):null]}),s.length>0?e.jsx("div",{className:i("chat-tool-log",r.rows),hidden:!l,children:s.map(y=>e.jsx(Hs,{call:y},y.id))}):null]})}const qs={width:"100%"};function Ie({autofocus:t,disabled:s,registry:a,id:n,htmlName:r,multiple:i,onBlur:o,onChange:l,onFocus:d,options:c,placeholder:f,readonly:m,value:p,schema:u}){const[y,w]=h.useState(!1),{formContext:S}=a,{readonlyAsDisabled:j=!0}=S,{enumOptions:g,enumDisabled:x,emptyValue:v}=c,b=qt(c),L=N=>l(me(N,g,b,v)),E=()=>o(n,me(p,g,b,v)),M=()=>d(n,me(p,g,b,v)),se=(N,$)=>$&&Ge($.label)?$.label.toLowerCase().includes(N.toLowerCase()):!1,Z=Ie.getPopupContainerCallback(),B=Ut(p,g,!!i,b,v),J={name:r||n},ne=!i&&u.default===void 0,H=h.useMemo(()=>{if(Array.isArray(g)){const N=g.map(({value:$,label:de},re)=>({disabled:Array.isArray(x)&&x.includes($),key:String(re),value:Wt($,re,b),label:de}));return ne&&N.unshift({value:"",label:f||""}),N}},[x,g,f,ne,b]);return e.jsx(G,{open:y,autoFocus:t,disabled:s||j&&m,getPopupContainer:Z,id:n,mode:i?"multiple":void 0,onBlur:m?void 0:E,onChange:m?void 0:L,onFocus:m?void 0:M,placeholder:f,style:qs,value:B,maxTagCount:i?"responsive":void 0,...J,onOpenChange:w,filterOption:se,"aria-describedby":Ke(n),options:H})}Ie.getPopupContainerCallback=()=>t=>(t==null?void 0:t.parentElement)??document.body;const Us={width:"100%"};function nt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function rt(t,s){if(!Array.isArray(t))return[];const a=[];for(const n of t){if(!nt(n)||n.value==null||n.value==="")continue;const r=rt(n.children,s),i=String(n.value);a.push({value:i,title:n.label==null||n.label===""?i:String(n.label),disabled:n.disabled===!0||s&&r.length>0,children:r.length>0?r:void 0})}return a}function Ws(t){const s=new Map,a=n=>{const r=String(n.value??""),i=n.children??[],o=i.length===0?n.disabled||r===""?[]:[r]:i.flatMap(l=>a(l));return r!==""&&s.set(r,o),o};return t.forEach(a),s}function Me(t,s){const a=new Set,n=[],r=o=>{const l=s.get(o),d=l===void 0?[o]:l;for(const c of d)c!==""&&!a.has(c)&&(a.add(c),n.push(c))},i=o=>{if(Array.isArray(o)){o.forEach(i);return}if(!(o==null||o==="")){if(nt(o)){if(o.halfChecked===!0)return;"value"in o&&i(o.value);return}r(String(o))}};return i(t),n}const Ys=(t,s)=>{const a=s.title;return typeof a=="string"&&a.toLowerCase().includes(t.toLowerCase())},Js=t=>t.parentElement??document.body;function Ks({autofocus:t,disabled:s,registry:a,id:n,multiple:r,onBlur:i,onChange:o,onFocus:l,placeholder:d,readonly:c,value:f,schema:m}){const{formContext:p}=a,{readonlyAsDisabled:u=!0}=p,y=!!r||m.type==="array",w=h.useMemo(()=>rt(m["x-tree-options"],!y),[m,y]),S=h.useMemo(()=>Ws(w),[w]),j=Me(f,S),g=y?j:j[0],x=v=>{const b=Me(v,S);o(y?b:b[0])};return e.jsx(Re,{id:n,autoFocus:t,allowClear:!0,disabled:s||u&&c,getPopupContainer:Js,placeholder:d,showSearch:!0,style:Us,treeData:w,treeDefaultExpandAll:!0,treeCheckable:y||void 0,showCheckedStrategy:y?Re.SHOW_CHILD:void 0,maxTagCount:y?"responsive":void 0,value:g,filterTreeNode:Ys,onBlur:c?void 0:()=>i(n,f),onChange:c?void 0:x,onFocus:c?void 0:()=>l(n,f),"aria-describedby":Ke(n)})}const{FieldTemplate:ge}=Kt,Xs=2,Gs=O(({css:t})=>({jsonSchemaForm:t`
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
    `})),Qs=t=>{var s;return e.jsx(at,{...t,schema:{...t.schema||{},"x-data-source":{...((s=t.schema)==null?void 0:s["x-data-source"])||{},type:"toolsets"}}})};function xe(t){if(t==null)return"";try{return JSON.stringify(t,null,Xs)}catch{return""}}function Ne(t){const s=t.trim();if(s!=="")try{return JSON.parse(s)}catch{return}}function Zs({t,...s}){const{isDarkMode:a}=Gt(),{formData:n,schema:r,onChange:i,disabled:o,id:l,required:d,name:c,fieldPathId:f}=s,m=Array.isArray(r.examples)?r.examples:[],p=h.useRef(void 0),u=h.useRef(!1),[y,w]=h.useState(()=>xe(n)),[S,j]=h.useState(null),g=ot(s.fieldPathId.path);h.useEffect(()=>{if(u.current){u.current=!1;return}p.current!==n&&(p.current=n,w(xe(n)),j(null))},[n]);const x=h.useCallback(b=>{w(b);const L=Ne(b);if(L===void 0&&b.trim()!==""){j("Invalid JSON");return}j(null),p.current=L,u.current=!0,i(L,f.path)},[i,f]),v=h.useCallback(b=>{const L=m[b];if(L===void 0)return;let E=typeof L=="string"?Ne(L):L;E&&typeof E=="object"&&!Array.isArray(E)&&"value"in E&&E.value!==void 0&&(E=E.value);const M=xe(E);w(M),j(null),p.current=E,u.current=!0,i(E,f.path)},[i,m,f]);return e.jsxs("div",{id:l,style:{position:"relative"},children:[m.length>0&&e.jsx("div",{style:{position:"absolute",top:8,right:8,zIndex:10},children:e.jsx(G,{placeholder:"Load example…",allowClear:!0,style:{minWidth:160},disabled:o,options:m.map((b,L)=>({label:typeof b=="object"&&b!==null&&"title"in b?String(b.title):`Example ${L+1}`,value:L})),onChange:b=>b!=null&&v(b)})}),e.jsx("div",{className:"ant-form-item-label",children:e.jsx("label",{className:d?"ant-form-item-required":"ant-form-item-optional",children:g?t==null?void 0:t(`${g}.label`,{defaultValue:r.title||c}):r.title||c})}),e.jsx(Qt,{value:y,height:"200px",theme:a?"dark":"light",extensions:[Zt()],onChange:x,editable:!o,basicSetup:{lineNumbers:!0,foldGutter:!0}}),S&&e.jsx("div",{className:"ant-form-item-additional",children:e.jsx("div",{className:"ant-form-item-explain ant-form-item-explain-connected",children:e.jsx("div",{className:"ant-form-item-explain-error",children:e.jsx("div",{id:"root_args__error",children:e.jsx("div",{children:S})})})})})]})}const en=t=>s=>e.jsx(Zs,{...s,t});function tn(t){return Array.isArray(t)?t:t&&typeof t=="object"&&Array.isArray(t.data)?t.data:[]}function Oe(t,s,a="",n="",r){const i=s.label_key?t[s.label_key]:void 0,o=s.value_key?t[s.value_key]:void 0,l=o!=null&&String(o)!==""?String(o):n,d=i!=null&&String(i)!==""?String(i):a||l;return{label:r?r(d,t):d,value:l}}function sn(t,s){const a=t.search_key||"search";return{current:1,page_size:20,...t.params||{},...t.filter||{},...s?{[a]:s}:{}}}function ye(t,s){return s?(Array.isArray(t)?t:t==null||t===""?[]:[t]).filter(n=>n!=null&&n!=="").map(n=>String(n)):t==null||t===""?[]:[String(t)]}async function nn(t,s){switch(t.type){case"toolsets":return((await T.system.listToolSets(s)).data??[]).map(n=>Oe(n,t,n.name,n.id,(r,i)=>s.type?r:e.jsxs("span",{children:[e.jsx(X,{color:"blue",style:{marginInlineEnd:0},children:i.type})," ",r]}))).filter(n=>n.value!=="");case"api":{if(!t.url)return[];const a=t.url.startsWith("/")?await cs(t.url,{method:t.method,params:s}):(await Xt(t.url,{params:s,method:t.method})).data;return tn(a).map(n=>Oe(n,t)).filter(n=>n.value!=="")}default:return[]}}const at=t=>{const{schema:s,value:a,onChange:n,disabled:r,readonly:i,multiple:o,placeholder:l}=t,d=(s==null?void 0:s["x-data-source"])||{},c=!!o||(s==null?void 0:s.type)==="array",[f,m]=h.useState(""),p=h.useRef(new Map),u=h.useMemo(()=>sn(d,f),[d,f]),y=`${d.type??""}:${d.method??""}:${d.url??""}:${JSON.stringify(u)}`,w=typeof d.cache_ttl=="number"?d.cache_ttl*1e3:0,{data:S,loading:j}=R(()=>nn(d,u),{ready:d.type==="toolsets"||d.type==="api",refreshDeps:[y],debounceWait:300,cacheKey:y,cacheTime:w,staleTime:w}),g=h.useMemo(()=>{const v=new Map;for(const b of S??[])p.current.set(b.value,b.label||b.value),v.set(b.value,b);for(const b of ye(a,c))v.has(b)||v.set(b,{label:p.current.get(b)||b,value:b});return Array.from(v.values())},[S,a,c]),x=c?ye(a,!0):ye(a,!1)[0];return e.jsx(G,{mode:c?"multiple":void 0,maxTagCount:c?"responsive":void 0,maxTagPlaceholder:v=>`+${v.length}`,showSearch:!0,filterOption:!1,onSearch:m,onOpenChange:v=>{v||m("")},options:g,value:x,loading:j,disabled:r||i,placeholder:l,allowClear:!0,onChange:v=>n==null?void 0:n(c?Array.isArray(v)?v:[]:v),style:{width:"100%"}})};function it(t){const s=t.$defs||t.definitions||{};function a(r){if(!r.startsWith("#/$defs/")&&!r.startsWith("#/definitions/"))return null;const i=r.split("/").pop();return i?s[i]:null}function n(r){if(!r)return{};if(r.$ref){const o=a(r.$ref);return n(o)}const i={};if(Object.keys(r).forEach(o=>{o.startsWith("x-ui-")&&(i[`ui:${o.slice(5)}`]=r[o])}),r["x-hidden"]&&(i["ui:widget"]="hidden"),r["x-disabled"]&&(i["ui:disabled"]=!0),r.type==="object"){if(r.properties)for(const[o,l]of Object.entries(r.properties)){const d=n(l);Object.keys(d).length>0&&(i[o]=d)}r.dependencies&&Object.keys(r.dependencies).forEach(o=>{const l=r.dependencies[o];l.properties?Object.keys(l.properties).forEach(d=>{const c=n(l.properties[d]);Object.keys(c).length>0&&(i[o]=c)}):l.oneOf&&l.oneOf.forEach(d=>{d.properties&&Object.keys(d.properties).forEach(c=>{const f=n(d.properties[c]);i[c]=f})})})}return r.type==="array"&&r.items&&(i.items=n(r.items)),r.oneOf&&(i["ui:options"]={...i["ui:options"]||{},oneOf:r.oneOf.map(o=>n(o))}),r.anyOf&&(i["ui:options"]={...i["ui:options"]||{},anyOf:r.anyOf.map(o=>n(o))}),r.allOf&&(i["ui:options"]={...i["ui:options"]||{},allOf:r.allOf.map(o=>n(o))}),i}if(t.$ref){const r=a(t.$ref);return n(r)}return n(t)}const ot=t=>t.filter(s=>!ds(s)).join("."),rn=t=>({uiSchema:s,label:a,...n})=>{if(!ge)return null;const r=ot(n.fieldPathId.path);if(!t||!r)return e.jsx(ge,{...n,label:a,uiSchema:s});const i=s==null?void 0:s["ui:placeholder"],o=()=>{var l,d,c,f;if((l=n.description)!=null&&l.props)return e.jsx(n.registry.templates.DescriptionFieldTemplate,{...(d=n.description)==null?void 0:d.props,description:t==null?void 0:t(`${r}.description`,{defaultValue:(f=(c=n.description)==null?void 0:c.props)==null?void 0:f.description})})};return e.jsx(ge,{...n,label:t==null?void 0:t(`${r}.label`,{defaultValue:a}),description:o(),uiSchema:{...s,...i?{"ui:placeholder":t==null?void 0:t(`${r}.placeholder`,{defaultValue:i})}:{}}})},an=t=>{const s=t.split("-")[0];return Fe[t]||Fe[s]},ve=({schema:t,value:s,onChange:a,uiSchema:n,disabled:r=!1,formRef:i,t:o})=>{const{styles:l}=Gs(),d=s??{},{i18n:c}=A(),f=h.useMemo(()=>Yt({},an(c.language)),[c.language]);h.useImperativeHandle(i,()=>({validate:u=>{const y=f.validateFormData(u,t,void 0,void 0,p);return y.errors.filter(w=>w.name!=="additionalProperties").length>0?Promise.reject(y.errors[0].message):Promise.resolve()}}));const m=h.useCallback(({formData:u})=>{a==null||a(u??{})},[a]),p=We.useMemo(()=>t?{...it(t)||{},...n||{}}:{},[t,n]);return e.jsx(Jt,{tagName:"div",className:D(l.jsonSchemaForm,"json-schema-config-form"),schema:t||{},formData:d,onChange:m,validator:f,uiSchema:p||{},disabled:r,showErrorList:!1,liveValidate:"onChange",autoComplete:"off",fields:{objectEditor:en(o)},widgets:{remoteSelect:at,toolsetsSelect:Qs,select:Ie,treeSelect:Ks},templates:{FieldTemplate:rn(o)},formContext:{descriptionLocation:"tooltip"}})},on=({schema:t,uiSchema:s,t:a,...n})=>{const r=h.useRef(null);return e.jsx(C.Item,{noStyle:!0,...n,rules:[{validator:(i,o)=>{var l;return(l=r.current)==null?void 0:l.validate(o)},message:""}],children:e.jsx(ve,{schema:t,formRef:r,uiSchema:s,t:a})})},_n=Object.freeze(Object.defineProperty({__proto__:null,JsonSchemaConfigForm:ve,JsonSchemaConfigFormItem:on,buildUiSchema:it,default:ve},Symbol.toStringTag,{value:"Module"}));export{gn as A,Vn as C,wn as D,le as H,bn as I,Ve as L,xn as O,fn as P,jn as R,yn as T,In as U,hn as a,vn as b,Sn as c,Cn as d,kn as e,Tn as f,Ln as g,An as h,tt as i,En as j,xs as k,fs as l,Rn as m,Fn as n,_n as o};
