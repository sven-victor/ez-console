"use strict";const s=require("./vendor.js"),i=require("react"),b=require("antd"),d=require("./contexts.js"),c=require("./index.js"),u=require("./components.js"),f=require("antd-style"),m=require("classnames"),h=i.lazy(()=>Promise.resolve().then(()=>require("./ai-chat.js"))),y=f.createStyles(({token:t,css:e})=>({siderLayout:e`
      position: relative;
      height: 100vh;
    `,siderLayoutContent:e`
      height: 100%;
      width: 100%;
      background-color: ${t.colorBgContainer};
      overflow: hidden;
    `,floatSiderLayout:e`
      position: fixed;
      right: 16px;
      top: 16px;
      height: calc(100vh - 32px);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
      z-index: 1000;
      overflow: hidden;
      backdrop-filter: blur(8px);
      border: 1px solid ${t.colorBorderSecondary};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1);
      }
    `})),S=t=>{const{visible:e,setVisible:o,setLoaded:r}=d.useAI();return i.useEffect(()=>{r(!0)},[r]),s.jsxRuntimeExports.jsx(b.Modal,{className:"ai-chat-modal",width:1200,open:e,closable:!1,onCancel:()=>o(!1),footer:null,children:c.withSuspense(h,t)})},v=t=>{const{styles:e}=y(),{layout:o,visible:r}=d.useAI(),[n,x]=i.useState(()=>{const a=localStorage.getItem("ai-sidebar-width");return a?parseInt(a,10):400}),{setLoaded:l}=d.useAI();i.useEffect(()=>{l(!0)},[l]),i.useEffect(()=>{localStorage.setItem("ai-sidebar-width",n.toString())},[n]);const p=a=>{x(a)};return s.jsxRuntimeExports.jsxs("div",{style:{width:`${n}px`,display:r?"flex":"none",overflow:"hidden",flexShrink:0},className:m("ai-sidebar-layout",o==="float-sidebar"?e.floatSiderLayout:e.siderLayout),children:[s.jsxRuntimeExports.jsx(u.ResizeDivider,{onResize:p,minWidth:300,maxWidth:window.innerWidth*.5}),s.jsxRuntimeExports.jsx("div",{style:{borderRadius:o==="float-sidebar"?"12px":"0"},className:e.siderLayoutContent,children:s.jsxRuntimeExports.jsx("div",{children:c.withSuspense(h,t)})})]})},g=({icon:t})=>s.jsxRuntimeExports.jsx(u.AIChatFloatButton,{icon:t});exports.AIChatButton=g;exports.AIChatModal=S;exports.AIChatSider=v;
