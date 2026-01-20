"use strict";const t=require("./vendor.js"),o=require("react"),l=require("antd"),p=require("@ant-design/icons"),b=require("react-i18next"),a=require("./contexts.js"),c=require("./index.js"),f=require("./components.js"),m=require("antd-style"),y=require("classnames"),u=o.lazy(()=>Promise.resolve().then(()=>require("./ai-chat.js"))),j=m.createStyles(({token:s,css:e})=>({siderLayout:e`
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
    `})),v=()=>{const{visible:s,setVisible:e,setLoaded:i}=a.useAI();return o.useEffect(()=>{i(!0)},[i]),t.jsxRuntimeExports.jsx(l.Modal,{className:"ai-chat-modal",width:1200,open:s,closable:!1,onCancel:()=>e(!1),footer:null,children:c.withSuspense(u)})},I=()=>{const{styles:s}=j(),{layout:e,visible:i}=a.useAI(),[n,x]=o.useState(()=>{const r=localStorage.getItem("ai-sidebar-width");return r?parseInt(r,10):400}),{setLoaded:d}=a.useAI();o.useEffect(()=>{d(!0)},[d]),o.useEffect(()=>{localStorage.setItem("ai-sidebar-width",n.toString())},[n]);const h=r=>{x(r)};return t.jsxRuntimeExports.jsxs("div",{style:{width:`${n}px`,display:i?"flex":"none",overflow:"hidden",flexShrink:0},className:y("ai-sidebar-layout",e==="float-sidebar"?s.floatSiderLayout:s.siderLayout),children:[t.jsxRuntimeExports.jsx(f.ResizeDivider,{onResize:h,minWidth:300,maxWidth:window.innerWidth*.5}),t.jsxRuntimeExports.jsx("div",{style:{width:"100%",height:"100%",backgroundColor:"#ffffff",overflow:"hidden",borderRadius:e==="float-sidebar"?"12px":"0"},children:t.jsxRuntimeExports.jsx("div",{children:c.withSuspense(u)})})]})},S=()=>{const{setVisible:s,visible:e}=a.useAI(),{t:i}=b.useTranslation("ai");return t.jsxRuntimeExports.jsx(t.jsxRuntimeExports.Fragment,{children:t.jsxRuntimeExports.jsx(l.Tooltip,{title:i("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",style:{display:e?"none":"block"},className:"ai-chat-tooltip",children:t.jsxRuntimeExports.jsx(l.FloatButton,{icon:t.jsxRuntimeExports.jsx(p.RobotOutlined,{}),className:"ai-chat-float-button",type:"primary",onClick:()=>s(!0),style:{right:24,bottom:24,display:e?"none":"block"}})})})};exports.AIChatButton=S;exports.AIChatModal=v;exports.AIChatSider=I;
