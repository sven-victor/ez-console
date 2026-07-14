const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-chat.B0mhvJ_Z.js","assets/vendor.BUXzQeGs.js","assets/vite.CnSqVV0U.js","assets/lodash.B1xlAtP1.js","assets/highlight.DHmnecVl.js","assets/vendor.CkbfgUCq.css","assets/index.BQ9L76lE.js","assets/ai.CugkJAPm.js","assets/client.DotgcYEO.js","assets/base.DkWA_rhC.js","assets/authorization.CVQrpH_Z.js","assets/system.Dx4oyej3.js","assets/oauth.BXtX711F.js","assets/tasks.D9kd3CyP.js","assets/components.CxK2O3w1.js","assets/contexts.CnyOKQ0T.js","assets/index.CiFTqlrA.css","assets/ant-design-x.BnOUt016.js","assets/mermaid.CKYFrwhn.js","assets/highlighter.mc6L82GP.js","assets/refractor.CM32jelU.js","assets/ant-design-x.C_nN0z_s.css"])))=>i.map(i=>d[i]);
import{_ as b}from"./vite.CnSqVV0U.js";import{r as o,b as x,u as f,j as t,a5 as m,aM as y,aN as g,M as v,a as w}from"./vendor.BUXzQeGs.js";import{d as l}from"./contexts.CnyOKQ0T.js";import{w as c}from"./index.BQ9L76lE.js";import{R as S}from"./components.CxK2O3w1.js";const h=o.lazy(()=>b(()=>import("./ai-chat.B0mhvJ_Z.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]))),j=x(({token:a,css:e})=>({siderLayout:e`
      position: relative;
      height: 100vh;
    `,siderLayoutContent:e`
      height: 100%;
      width: 100%;
      background-color: ${a.colorBgContainer};
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
      border: 1px solid ${a.colorBorderSecondary};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1);
      }
    `})),_=a=>{const{visible:e,setVisible:s,setLoaded:i}=l();return o.useEffect(()=>{i(!0)},[i]),t.jsx(v,{className:"ai-chat-modal",width:1200,open:e,closable:!1,onCancel:()=>s(!1),footer:null,children:c(h,a)})},E=a=>{const{styles:e}=j(),{layout:s,visible:i}=l(),[n,p]=o.useState(()=>{const r=localStorage.getItem("ai-sidebar-width");return r?parseInt(r,10):400}),{setLoaded:d}=l();o.useEffect(()=>{d(!0)},[d]),o.useEffect(()=>{localStorage.setItem("ai-sidebar-width",n.toString())},[n]);const u=r=>{p(r)};return t.jsxs("div",{style:{width:`${n}px`,display:i?"flex":"none",overflow:"hidden",flexShrink:0},className:w("ai-sidebar-layout",s==="float-sidebar"?e.floatSiderLayout:e.siderLayout),children:[t.jsx(S,{onResize:u,minWidth:300,maxWidth:window.innerWidth*.5}),t.jsx("div",{style:{borderRadius:s==="float-sidebar"?"12px":"0"},className:e.siderLayoutContent,children:t.jsx("div",{children:c(h,a)})})]})},N=()=>{const{setVisible:a,visible:e}=l(),{t:s}=f("ai");return t.jsx(t.Fragment,{children:t.jsx(m,{title:s("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",style:{display:e?"none":"block"},className:"ai-chat-tooltip",children:t.jsx(y,{icon:t.jsx(g,{}),className:"ai-chat-float-button",type:"primary",onClick:()=>a(!0),style:{right:24,bottom:24,display:e?"none":"block"}})})})};export{N as A,_ as a,E as b};
