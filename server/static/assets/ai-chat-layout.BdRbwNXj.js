const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-chat.D6jfEBse.js","assets/vendor.DgOOsNr7.js","assets/vite.BF1G3H_w.js","assets/lodash.Cd5kjlQ2.js","assets/highlight.BslI14e2.js","assets/vendor.D-Ncpkvi.css","assets/index.DV8lOnJ-.js","assets/ai.BzBIzy7h.js","assets/client.C9yIVXmT.js","assets/base.C7rQXbua.js","assets/authorization.BW5zhXcZ.js","assets/system.COtg4dCU.js","assets/oauth.2w06KYlV.js","assets/tasks.CLx9DPih.js","assets/components.D0wPnin4.js","assets/contexts.D5E-um7k.js","assets/index.CiFTqlrA.css","assets/ant-design-x.Czh7kNuP.js","assets/highlighter.3ZKbkVcQ.js","assets/refractor.D5rNxqdW.js","assets/mermaid.DMjqAjLE.js","assets/ant-design-x.Be_lhV8Q.css"])))=>i.map(i=>d[i]);
import{_ as x}from"./vite.BF1G3H_w.js";import{r as i,c as b,u as f,j as t,p as m,F as y,q as v,M as g,h as w}from"./vendor.DgOOsNr7.js";import{u as l}from"./contexts.D5E-um7k.js";import{w as c}from"./index.DV8lOnJ-.js";import{R as S}from"./components.D0wPnin4.js";const h=i.lazy(()=>x(()=>import("./ai-chat.D6jfEBse.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]))),j=b(({token:s,css:e})=>({siderLayout:e`
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
    `})),E=s=>{const{visible:e,setVisible:a,setLoaded:o}=l();return i.useEffect(()=>{o(!0)},[o]),t.jsx(g,{className:"ai-chat-modal",width:1200,open:e,closable:!1,onCancel:()=>a(!1),footer:null,children:c(h,s)})},L=s=>{const{styles:e}=j(),{layout:a,visible:o}=l(),[n,p]=i.useState(()=>{const r=localStorage.getItem("ai-sidebar-width");return r?parseInt(r,10):400}),{setLoaded:d}=l();i.useEffect(()=>{d(!0)},[d]),i.useEffect(()=>{localStorage.setItem("ai-sidebar-width",n.toString())},[n]);const u=r=>{p(r)};return t.jsxs("div",{style:{width:`${n}px`,display:o?"flex":"none",overflow:"hidden",flexShrink:0},className:w("ai-sidebar-layout",a==="float-sidebar"?e.floatSiderLayout:e.siderLayout),children:[t.jsx(S,{onResize:u,minWidth:300,maxWidth:window.innerWidth*.5}),t.jsx("div",{style:{width:"100%",height:"100%",backgroundColor:"#ffffff",overflow:"hidden",borderRadius:a==="float-sidebar"?"12px":"0"},children:t.jsx("div",{children:c(h,s)})})]})},k=()=>{const{setVisible:s,visible:e}=l(),{t:a}=f("ai");return t.jsx(t.Fragment,{children:t.jsx(m,{title:a("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",style:{display:e?"none":"block"},className:"ai-chat-tooltip",children:t.jsx(y,{icon:t.jsx(v,{}),className:"ai-chat-float-button",type:"primary",onClick:()=>s(!0),style:{right:24,bottom:24,display:e?"none":"block"}})})})};export{k as A,E as a,L as b};
