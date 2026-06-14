const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-chat.HH6oe2S7.js","assets/vendor.DoRCPvm0.js","assets/vite.BF1G3H_w.js","assets/lodash.DmwREYZ8.js","assets/highlight.BslI14e2.js","assets/vendor.D-Ncpkvi.css","assets/index.BkBrDBb7.js","assets/ai.4mU9orvX.js","assets/client.Dp-2e3Xc.js","assets/base.CAWr6b_K.js","assets/authorization.D_7gdKbB.js","assets/system.Bb1i8Jbj.js","assets/oauth.Dq6bLso1.js","assets/tasks.C3a1Isns.js","assets/components.C1aRNPbq.js","assets/contexts.Cefbu4LC.js","assets/index.CiFTqlrA.css","assets/ant-design-x.CCzKFXAR.js","assets/highlighter.BH-xJN1E.js","assets/refractor.DdqrfEUv.js","assets/mermaid.C_ONDZ49.js","assets/ant-design-x.Be_lhV8Q.css"])))=>i.map(i=>d[i]);
import{_ as x}from"./vite.BF1G3H_w.js";import{r as o,c as b,a as f,j as t,z as m,E as y,G as g,M as v,d as w}from"./vendor.DoRCPvm0.js";import{a as l}from"./contexts.Cefbu4LC.js";import{w as c}from"./index.BkBrDBb7.js";import{R as S}from"./components.C1aRNPbq.js";const h=o.lazy(()=>x(()=>import("./ai-chat.HH6oe2S7.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]))),j=b(({token:a,css:e})=>({siderLayout:e`
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
    `})),R=a=>{const{visible:e,setVisible:s,setLoaded:i}=l();return o.useEffect(()=>{i(!0)},[i]),t.jsx(v,{className:"ai-chat-modal",width:1200,open:e,closable:!1,onCancel:()=>s(!1),footer:null,children:c(h,a)})},_=a=>{const{styles:e}=j(),{layout:s,visible:i}=l(),[n,p]=o.useState(()=>{const r=localStorage.getItem("ai-sidebar-width");return r?parseInt(r,10):400}),{setLoaded:d}=l();o.useEffect(()=>{d(!0)},[d]),o.useEffect(()=>{localStorage.setItem("ai-sidebar-width",n.toString())},[n]);const u=r=>{p(r)};return t.jsxs("div",{style:{width:`${n}px`,display:i?"flex":"none",overflow:"hidden",flexShrink:0},className:w("ai-sidebar-layout",s==="float-sidebar"?e.floatSiderLayout:e.siderLayout),children:[t.jsx(S,{onResize:u,minWidth:300,maxWidth:window.innerWidth*.5}),t.jsx("div",{style:{borderRadius:s==="float-sidebar"?"12px":"0"},className:e.siderLayoutContent,children:t.jsx("div",{children:c(h,a)})})]})},z=()=>{const{setVisible:a,visible:e}=l(),{t:s}=f("ai");return t.jsx(t.Fragment,{children:t.jsx(m,{title:s("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",style:{display:e?"none":"block"},className:"ai-chat-tooltip",children:t.jsx(y,{icon:t.jsx(g,{}),className:"ai-chat-float-button",type:"primary",onClick:()=>a(!0),style:{right:24,bottom:24,display:e?"none":"block"}})})})};export{z as A,R as a,_ as b};
