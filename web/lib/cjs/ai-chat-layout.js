"use strict";const e=require("./vendor.js"),o=require("react"),l=require("antd"),p=require("@ant-design/icons"),b=require("react-i18next"),n=require("./contexts.js"),u=require("./index.js"),f=require("./components.js"),m=require("antd-style"),j=require("classnames"),c=o.lazy(()=>Promise.resolve().then(()=>require("./ai-chat.js"))),y=m.createStyles(({token:s,css:t})=>({siderLayout:t`
      position: relative;
      height: 100vh;
    `,floatSiderLayout:t`
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
    `})),R=()=>{const{visible:s,setVisible:t,setLoaded:i}=n.useAI();return o.useEffect(()=>{i(!0)},[i]),e.jsxRuntimeExports.jsx(l.Modal,{width:1200,open:s,closable:!1,onCancel:()=>t(!1),footer:null,children:u.withSuspense(c)})},g=()=>{const{styles:s}=y(),{layout:t,visible:i}=n.useAI(),[a,x]=o.useState(()=>{const r=localStorage.getItem("ai-sidebar-width");return r?parseInt(r,10):400}),{setLoaded:d}=n.useAI();o.useEffect(()=>{d(!0)},[d]),o.useEffect(()=>{localStorage.setItem("ai-sidebar-width",a.toString())},[a]);const h=r=>{x(r)};return e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:e.jsxRuntimeExports.jsxs("div",{style:{width:`${a}px`,display:i?"flex":"none",overflow:"hidden",flexShrink:0},className:j("ai-sidebar-layout",t==="float-sidebar"?s.floatSiderLayout:s.siderLayout),children:[e.jsxRuntimeExports.jsx(f.ResizeDivider,{onResize:h,minWidth:300,maxWidth:window.innerWidth*.5}),e.jsxRuntimeExports.jsx("div",{style:{width:"100%",height:"100%",backgroundColor:"#ffffff",overflow:"hidden",borderRadius:t==="float-sidebar"?"12px":"0"},children:e.jsxRuntimeExports.jsx("div",{children:u.withSuspense(c)})})]})})},v=()=>{const{setVisible:s,visible:t}=n.useAI(),{t:i}=b.useTranslation("ai");return e.jsxRuntimeExports.jsx(e.jsxRuntimeExports.Fragment,{children:e.jsxRuntimeExports.jsx(l.Tooltip,{title:i("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",style:{display:t?"none":"block"},children:e.jsxRuntimeExports.jsx(l.FloatButton,{icon:e.jsxRuntimeExports.jsx(p.RobotOutlined,{}),type:"primary",onClick:()=>s(!0),style:{right:24,bottom:24,display:t?"none":"block"}})})})};exports.AIChatButton=v;exports.AIChatModal=R;exports.AIChatSider=g;
