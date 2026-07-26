const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-chat.WPDFPNp8.js","assets/vendor.wsIk6zIe.js","assets/vite.CnSqVV0U.js","assets/lodash.Bb75kzRV.js","assets/highlight.DHmnecVl.js","assets/vendor.CfZ7kyuK.css","assets/index.DBjluPSx.js","assets/ai.DuPcX4GK.js","assets/client.CCV7fyEE.js","assets/base.CbSoccab.js","assets/authorization.Ck1xkoGx.js","assets/system.Wyoiz5EF.js","assets/oauth.iTwAcyq6.js","assets/tasks.BoaH95-N.js","assets/components.LTEfVz2a.js","assets/contexts.C3DSvM-5.js","assets/index.CiFTqlrA.css","assets/ant-design-x.Dl7EoQFg.js","assets/mermaid.BMPBGWTM.js","assets/highlighter.B6lwG7vm.js","assets/refractor.BvPhv6sV.js","assets/ant-design-x.C_nN0z_s.css"])))=>i.map(i=>d[i]);
import{_ as b}from"./vite.CnSqVV0U.js";import{r as o,b as u,j as a,M as f,a as m}from"./vendor.wsIk6zIe.js";import{d as l}from"./contexts.C3DSvM-5.js";import{w as h}from"./index.DBjluPSx.js";import{b as v,R as y}from"./components.LTEfVz2a.js";const c=o.lazy(()=>b(()=>import("./ai-chat.WPDFPNp8.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]))),g=u(({token:t,css:e})=>({siderLayout:e`
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
    `})),j=t=>{const{visible:e,setVisible:s,setLoaded:i}=l();return o.useEffect(()=>{i(!0)},[i]),a.jsx(f,{className:"ai-chat-modal",width:1200,open:e,closable:!1,onCancel:()=>s(!1),footer:null,children:h(c,t)})},A=t=>{const{styles:e}=g(),{layout:s,visible:i}=l(),[d,p]=o.useState(()=>{const r=localStorage.getItem("ai-sidebar-width");return r?parseInt(r,10):400}),{setLoaded:n}=l();o.useEffect(()=>{n(!0)},[n]),o.useEffect(()=>{localStorage.setItem("ai-sidebar-width",d.toString())},[d]);const x=r=>{p(r)};return a.jsxs("div",{style:{width:`${d}px`,display:i?"flex":"none",overflow:"hidden",flexShrink:0},className:m("ai-sidebar-layout",s==="float-sidebar"?e.floatSiderLayout:e.siderLayout),children:[a.jsx(y,{onResize:x,minWidth:300,maxWidth:window.innerWidth*.5}),a.jsx("div",{style:{borderRadius:s==="float-sidebar"?"12px":"0"},className:e.siderLayoutContent,children:a.jsx("div",{children:h(c,t)})})]})},_=()=>a.jsx(v,{});export{_ as A,j as a,A as b};
