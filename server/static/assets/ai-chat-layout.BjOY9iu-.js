const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-chat.HhvclHTE.js","assets/vendor.kF_adzPe.js","assets/vite.BF1G3H_w.js","assets/lodash.Cd5kjlQ2.js","assets/highlight.BslI14e2.js","assets/vendor.D-Ncpkvi.css","assets/index.BzbQaSU7.js","assets/ai.BmZWyU4_.js","assets/client.DZaQ0tGQ.js","assets/base.CPcbYjA2.js","assets/authorization.DBqY3FZM.js","assets/system.D5imsUlN.js","assets/oauth.Cdn6sieY.js","assets/tasks.CGZ419wb.js","assets/components.ChVJ-2_w.js","assets/contexts.XyCnNQYm.js","assets/index.CiFTqlrA.css","assets/ant-design-x.D0rlqnTB.js","assets/highlighter.BnUkDWXv.js","assets/refractor.CTGI41XU.js","assets/mermaid.WE9yevv5.js","assets/ant-design-x.Be_lhV8Q.css"])))=>i.map(i=>d[i]);
import{_ as b}from"./vite.BF1G3H_w.js";import{r as i,c as f,a as u,j as t,y as m,z as y,E as v,M as g,d as w}from"./vendor.kF_adzPe.js";import{a as l}from"./contexts.XyCnNQYm.js";import{w as c}from"./index.BzbQaSU7.js";import{R as S}from"./components.ChVJ-2_w.js";const h=i.lazy(()=>b(()=>import("./ai-chat.HhvclHTE.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]))),j=f(({token:s,css:e})=>({siderLayout:e`
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
    `})),_=s=>{const{visible:e,setVisible:a,setLoaded:o}=l();return i.useEffect(()=>{o(!0)},[o]),t.jsx(g,{className:"ai-chat-modal",width:1200,open:e,closable:!1,onCancel:()=>a(!1),footer:null,children:c(h,s)})},z=s=>{const{styles:e}=j(),{layout:a,visible:o}=l(),[d,p]=i.useState(()=>{const r=localStorage.getItem("ai-sidebar-width");return r?parseInt(r,10):400}),{setLoaded:n}=l();i.useEffect(()=>{n(!0)},[n]),i.useEffect(()=>{localStorage.setItem("ai-sidebar-width",d.toString())},[d]);const x=r=>{p(r)};return t.jsxs("div",{style:{width:`${d}px`,display:o?"flex":"none",overflow:"hidden",flexShrink:0},className:w("ai-sidebar-layout",a==="float-sidebar"?e.floatSiderLayout:e.siderLayout),children:[t.jsx(S,{onResize:x,minWidth:300,maxWidth:window.innerWidth*.5}),t.jsx("div",{style:{width:"100%",height:"100%",backgroundColor:"#ffffff",overflow:"hidden",borderRadius:a==="float-sidebar"?"12px":"0"},children:t.jsx("div",{children:c(h,s)})})]})},L=()=>{const{setVisible:s,visible:e}=l(),{t:a}=u("ai");return t.jsx(t.Fragment,{children:t.jsx(m,{title:a("chat.openAssistant",{defaultValue:"Open AI Assistant"}),placement:"left",style:{display:e?"none":"block"},className:"ai-chat-tooltip",children:t.jsx(y,{icon:t.jsx(v,{}),className:"ai-chat-float-button",type:"primary",onClick:()=>s(!0),style:{right:24,bottom:24,display:e?"none":"block"}})})})};export{L as A,_ as a,z as b};
