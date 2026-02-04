const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-chat.BHMPmklm.js","assets/vendor.B6JBhCAY.js","assets/vite.BF1G3H_w.js","assets/lodash.BDtH7uFP.js","assets/highlight.BslI14e2.js","assets/vendor.D-Ncpkvi.css","assets/index.DDV53gBS.js","assets/ai.BlO1DqPv.js","assets/client.C_z0mq-g.js","assets/base.BXKr0a0H.js","assets/authorization.B5peLd2a.js","assets/system.BGeF3M7c.js","assets/oauth.ClVdJKPp.js","assets/components.AJXUxw-E.js","assets/contexts.B8ZCWCcl.js","assets/ant-design-x.BIkQt4u4.js","assets/highlighter.06nRe2Bn.js","assets/refractor.CIIjg-xe.js","assets/mermaid.X6yIL1F5.js","assets/ant-design-x.C1GP9Q3x.css","assets/index.CiFTqlrA.css"])))=>i.map(i=>d[i]);
import{_ as u}from"./vite.BF1G3H_w.js";import{r as i,c as x,u as b,j as t,p as f,F as m,q as y,M as v,h as g}from"./vendor.B6JBhCAY.js";import{u as r}from"./contexts.B8ZCWCcl.js";import{w as d}from"./index.DDV53gBS.js";import{R as w}from"./components.AJXUxw-E.js";const c=i.lazy(()=>u(()=>import("./ai-chat.BHMPmklm.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]))),S=x(({token:s,css:e})=>({siderLayout:e`
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
    `})),_=()=>{const{visible:s,setVisible:e,setLoaded:a}=r();return i.useEffect(()=>{a(!0)},[a]),t.jsx(v,{className:"ai-chat-modal",width:1200,open:s,closable:!1,onCancel:()=>e(!1),footer:null,children:d(c)})},E=()=>{const{styles:s}=S(),{layout:e,visible:a}=r(),[l,h]=i.useState(()=>{const o=localStorage.getItem("ai-sidebar-width");return o?parseInt(o,10):400}),{setLoaded:n}=r();i.useEffect(()=>{n(!0)},[n]),i.useEffect(()=>{localStorage.setItem("ai-sidebar-width",l.toString())},[l]);const p=o=>{h(o)};return t.jsxs("div",{style:{width:`${l}px`,display:a?"flex":"none",overflow:"hidden",flexShrink:0},className:g("ai-sidebar-layout",e==="float-sidebar"?s.floatSiderLayout:s.siderLayout),children:[t.jsx(w,{onResize:p,minWidth:300,maxWidth:window.innerWidth*.5}),t.jsx("div",{style:{width:"100%",height:"100%",backgroundColor:"#ffffff",overflow:"hidden",borderRadius:e==="float-sidebar"?"12px":"0"},children:t.jsx("div",{children:d(c)})})]})},L=()=>{const{setVisible:s,visible:e}=r(),{t:a}=b("ai");return t.jsx(t.Fragment,{children:t.jsx(f,{title:a("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",style:{display:e?"none":"block"},className:"ai-chat-tooltip",children:t.jsx(m,{icon:t.jsx(y,{}),className:"ai-chat-float-button",type:"primary",onClick:()=>s(!0),style:{right:24,bottom:24,display:e?"none":"block"}})})})};export{L as A,_ as a,E as b};
