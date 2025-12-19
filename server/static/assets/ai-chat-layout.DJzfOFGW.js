const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-chat.yf6flvzp.js","assets/vendor.CdlQoPOM.js","assets/vite.BF1G3H_w.js","assets/lodash.B3dv3_Tr.js","assets/highlight.BslI14e2.js","assets/vendor.D-Ncpkvi.css","assets/index.gEo8sjVu.js","assets/ai.N_nt1I4d.js","assets/client.20U86Zur.js","assets/base.CA-bfSJi.js","assets/authorization.BnG7BYaH.js","assets/system.CM06OxEF.js","assets/oauth.-s2V-XVk.js","assets/components.DKf2tVvt.js","assets/contexts.tbVYvYth.js","assets/index.BXr1iKgL.css","assets/ant-design-x.CuwM17xV.js","assets/highlighter.Cqz4s4YY.js","assets/refractor.BpluFdjK.js","assets/mermaid.Cp6B0uC1.js","assets/ant-design-x.C1GP9Q3x.css"])))=>i.map(i=>d[i]);
import{_ as x}from"./vite.BF1G3H_w.js";import{r as o,c as u,u as b,j as e,T as f,F as m,n as y,M as g,o as v}from"./vendor.CdlQoPOM.js";import{u as r}from"./contexts.tbVYvYth.js";import{w as d}from"./index.gEo8sjVu.js";import{R as w}from"./components.DKf2tVvt.js";const c=o.lazy(()=>x(()=>import("./ai-chat.yf6flvzp.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]))),S=u(({token:s,css:t})=>({siderLayout:t`
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
    `})),_=()=>{const{visible:s,setVisible:t,setLoaded:i}=r();return o.useEffect(()=>{i(!0)},[i]),e.jsx(g,{width:1200,open:s,closable:!1,onCancel:()=>t(!1),footer:null,children:d(c)})},E=()=>{const{styles:s}=S(),{layout:t,visible:i}=r(),[l,h]=o.useState(()=>{const a=localStorage.getItem("ai-sidebar-width");return a?parseInt(a,10):400}),{setLoaded:n}=r();o.useEffect(()=>{n(!0)},[n]),o.useEffect(()=>{localStorage.setItem("ai-sidebar-width",l.toString())},[l]);const p=a=>{h(a)};return e.jsx(e.Fragment,{children:e.jsxs("div",{style:{width:`${l}px`,display:i?"flex":"none",overflow:"hidden",flexShrink:0},className:v("ai-sidebar-layout",t==="float-sidebar"?s.floatSiderLayout:s.siderLayout),children:[e.jsx(w,{onResize:p,minWidth:300,maxWidth:window.innerWidth*.5}),e.jsx("div",{style:{width:"100%",height:"100%",backgroundColor:"#ffffff",overflow:"hidden",borderRadius:t==="float-sidebar"?"12px":"0"},children:e.jsx("div",{children:d(c)})})]})})},L=()=>{const{setVisible:s,visible:t}=r(),{t:i}=b("ai");return e.jsx(e.Fragment,{children:e.jsx(f,{title:i("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",style:{display:t?"none":"block"},children:e.jsx(m,{icon:e.jsx(y,{}),type:"primary",onClick:()=>s(!0),style:{right:24,bottom:24,display:t?"none":"block"}})})})};export{L as A,_ as a,E as b};
