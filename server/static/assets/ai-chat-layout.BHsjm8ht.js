const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-chat.BUP_T3Ft.js","assets/vendor.uztoXElh.js","assets/vite.CnSqVV0U.js","assets/lodash.Bb75kzRV.js","assets/highlight.DHmnecVl.js","assets/vendor.CfZ7kyuK.css","assets/index.Bl8Khyqf.js","assets/ai.C9VcxhFa.js","assets/client.BzF8Earh.js","assets/base.BfedMyjZ.js","assets/authorization.Ahyuv64W.js","assets/inbox.CZ7djRl8.js","assets/system.Bq4wniog.js","assets/oauth.B94O8ui5.js","assets/tasks.CyyyT7T_.js","assets/components.BFcmDRz3.js","assets/contexts.sFoBf5SC.js","assets/index.CiFTqlrA.css","assets/ant-design-x.C1siPVeN.js","assets/mermaid.DXUINkRL.js","assets/highlighter.P4M_IGBJ.js","assets/refractor.DnFAIzyF.js","assets/ant-design-x.C_nN0z_s.css"])))=>i.map(i=>d[i]);
import{_ as b}from"./vite.CnSqVV0U.js";import{r as o,b as u,j as a,M as f,a as m}from"./vendor.uztoXElh.js";import{d as l}from"./contexts.sFoBf5SC.js";import{w as h}from"./index.Bl8Khyqf.js";import{b as v,R as y}from"./components.BFcmDRz3.js";const c=o.lazy(()=>b(()=>import("./ai-chat.BUP_T3Ft.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]))),g=u(({token:t,css:e})=>({siderLayout:e`
      position: relative;
      height: 100vh;
    `,siderLayoutContent:e`
      height: 100%;
      width: 100%;
      background-color: ${t.colorBgContainer};
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
      border: 1px solid ${t.colorBorderSecondary};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1);
      }
    `})),j=t=>{const{visible:e,setVisible:s,setLoaded:i}=l();return o.useEffect(()=>{i(!0)},[i]),a.jsx(f,{className:"ai-chat-modal",width:1200,open:e,closable:!1,onCancel:()=>s(!1),footer:null,children:h(c,t)})},A=t=>{const{styles:e}=g(),{layout:s,visible:i}=l(),[d,p]=o.useState(()=>{const r=localStorage.getItem("ai-sidebar-width");return r?parseInt(r,10):400}),{setLoaded:n}=l();o.useEffect(()=>{n(!0)},[n]),o.useEffect(()=>{localStorage.setItem("ai-sidebar-width",d.toString())},[d]);const x=r=>{p(r)};return a.jsxs("div",{style:{width:`${d}px`,display:i?"flex":"none",overflow:"hidden",flexShrink:0},className:m("ai-sidebar-layout",s==="float-sidebar"?e.floatSiderLayout:e.siderLayout),children:[a.jsx(y,{onResize:x,minWidth:300,maxWidth:window.innerWidth*.5}),a.jsx("div",{style:{borderRadius:s==="float-sidebar"?"12px":"0"},className:e.siderLayoutContent,children:a.jsx("div",{children:h(c,t)})})]})},_=({icon:t})=>a.jsx(v,{icon:t});export{_ as A,j as a,A as b};
