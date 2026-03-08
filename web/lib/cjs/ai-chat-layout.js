"use strict";const t=require("./vendor.js"),o=require("react"),d=require("antd"),b=require("@ant-design/icons"),f=require("react-i18next"),n=require("./contexts.js"),u=require("./index.js"),m=require("./components.js"),y=require("antd-style"),j=require("classnames"),x=o.lazy(()=>Promise.resolve().then(()=>require("./ai-chat.js"))),v=y.createStyles(({token:s,css:e})=>({siderLayout:e`
      position: relative;
      height: 100vh;
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
      border: 1px solid ${s.colorBorderSecondary};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1);
      }
    `})),I=s=>{const{visible:e,setVisible:i,setLoaded:r}=n.useAI();return o.useEffect(()=>{r(!0)},[r]),t.jsxRuntimeExports.jsx(d.Modal,{className:"ai-chat-modal",width:1200,open:e,closable:!1,onCancel:()=>i(!1),footer:null,children:u.withSuspense(x,s)})},S=s=>{const{styles:e}=v(),{layout:i,visible:r}=n.useAI(),[l,h]=o.useState(()=>{const a=localStorage.getItem("ai-sidebar-width");return a?parseInt(a,10):400}),{setLoaded:c}=n.useAI();o.useEffect(()=>{c(!0)},[c]),o.useEffect(()=>{localStorage.setItem("ai-sidebar-width",l.toString())},[l]);const p=a=>{h(a)};return t.jsxRuntimeExports.jsxs("div",{style:{width:`${l}px`,display:r?"flex":"none",overflow:"hidden",flexShrink:0},className:j("ai-sidebar-layout",i==="float-sidebar"?e.floatSiderLayout:e.siderLayout),children:[t.jsxRuntimeExports.jsx(m.ResizeDivider,{onResize:p,minWidth:300,maxWidth:window.innerWidth*.5}),t.jsxRuntimeExports.jsx("div",{style:{width:"100%",height:"100%",backgroundColor:"#ffffff",overflow:"hidden",borderRadius:i==="float-sidebar"?"12px":"0"},children:t.jsxRuntimeExports.jsx("div",{children:u.withSuspense(x,s)})})]})},g=()=>{const{setVisible:s,visible:e}=n.useAI(),{t:i}=f.useTranslation("ai");return t.jsxRuntimeExports.jsx(t.jsxRuntimeExports.Fragment,{children:t.jsxRuntimeExports.jsx(d.Tooltip,{title:i("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",style:{display:e?"none":"block"},className:"ai-chat-tooltip",children:t.jsxRuntimeExports.jsx(d.FloatButton,{icon:t.jsxRuntimeExports.jsx(b.RobotOutlined,{}),className:"ai-chat-float-button",type:"primary",onClick:()=>s(!0),style:{right:24,bottom:24,display:e?"none":"block"}})})})};exports.AIChatButton=g;exports.AIChatModal=I;exports.AIChatSider=S;
