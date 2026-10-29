"use strict";const s=require("./vendor.js"),a=require("react"),p=require("antd"),l=require("./contexts.js"),u=require("./index.js"),x=require("./components.js"),g=require("antd-style"),f=require("classnames"),h=a.lazy(()=>Promise.resolve().then(()=>require("./ai-chat.js"))),S=g.createStyles(({token:e,css:t,appearance:r})=>{const o=r==="dark",i=o?"0 12px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.08)":"0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)",d=o?"0 16px 48px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.12)":"0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)";return{siderLayout:t`
      position: relative;
      height: 100vh;
      background-color: ${e.colorBgContainer};
    `,siderLayoutContent:t`
      height: 100%;
      width: 100%;
      background-color: ${e.colorBgContainer};
      overflow: hidden;
    `,floatSiderLayout:t`
      position: fixed;
      right: 16px;
      top: 16px;
      height: calc(100vh - 32px);
      border-radius: 12px;
      box-shadow: ${i};
      z-index: 1000;
      overflow: hidden;
      background-color: ${e.colorBgElevated};
      border: 1px solid ${o?e.colorBorder:e.colorBorderSecondary};
      transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        box-shadow: ${d};
      }
    `}}),v=e=>{const{visible:t,setVisible:r,setLoaded:o}=l.useAI();return a.useEffect(()=>{o(!0)},[o]),s.jsxRuntimeExports.jsx(p.Modal,{className:"ai-chat-modal",width:1200,open:t,closable:!1,onCancel:()=>r(!1),footer:null,children:u.withSuspense(h,e)})},m=e=>{const{styles:t}=S(),{layout:r,visible:o}=l.useAI(),[i,d]=a.useState(()=>{const n=localStorage.getItem("ai-sidebar-width");return n?parseInt(n,10):400}),{setLoaded:c}=l.useAI();a.useEffect(()=>{c(!0)},[c]),a.useEffect(()=>{localStorage.setItem("ai-sidebar-width",i.toString())},[i]);const b=n=>{d(n)};return s.jsxRuntimeExports.jsxs("div",{style:{width:`${i}px`,display:o?"flex":"none",overflow:"hidden",flexShrink:0},className:f("ai-sidebar-layout",r==="float-sidebar"?t.floatSiderLayout:t.siderLayout),children:[s.jsxRuntimeExports.jsx(x.ResizeDivider,{onResize:b,minWidth:300,maxWidth:window.innerWidth*.5}),s.jsxRuntimeExports.jsx("div",{style:{borderRadius:r==="float-sidebar"?"12px":"0"},className:t.siderLayoutContent,children:s.jsxRuntimeExports.jsx("div",{children:u.withSuspense(h,e)})})]})},w=({icon:e})=>s.jsxRuntimeExports.jsx(x.AIChatFloatButton,{icon:e});exports.AIChatButton=w;exports.AIChatModal=v;exports.AIChatSider=m;
