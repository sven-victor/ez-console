const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ai-chat.fRzjI3VG.js","assets/vendor.CRldfr7p.js","assets/vite.CnSqVV0U.js","assets/lodash.Bb75kzRV.js","assets/highlight.DHmnecVl.js","assets/vendor.CfZ7kyuK.css","assets/index.QVdcYTjv.js","assets/ai.DsB8_KyC.js","assets/client.MFm3WK-R.js","assets/base.BdNzkkj-.js","assets/authorization.sx0ZXJfV.js","assets/inbox.BhxnmVqH.js","assets/system.oq5LHtx8.js","assets/oauth.BLkh2SjC.js","assets/tasks.qFYPuDox.js","assets/components.ZzkcaPD0.js","assets/contexts.Qa9QXZhB.js","assets/index.CiFTqlrA.css","assets/ant-design-x.BMTpqtxU.js","assets/mermaid.Cft3qFi9.js","assets/highlighter.NzqdXQ8c.js","assets/refractor.CUB5za3D.js","assets/ant-design-x.C_nN0z_s.css"])))=>i.map(i=>d[i]);
import{_ as p}from"./vite.CnSqVV0U.js";import{r as i,b as u,j as r,M as f,a as g}from"./vendor.CRldfr7p.js";import{d as n}from"./contexts.Qa9QXZhB.js";import{w as h}from"./index.QVdcYTjv.js";import{b as m,R as v}from"./components.ZzkcaPD0.js";const b=i.lazy(()=>p(()=>import("./ai-chat.fRzjI3VG.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]))),w=u(({token:e,css:o,appearance:a})=>{const t=a==="dark",s=t?"0 12px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.08)":"0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)",l=t?"0 16px 48px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.12)":"0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)";return{siderLayout:o`
      position: relative;
      height: 100vh;
      background-color: ${e.colorBgContainer};
    `,siderLayoutContent:o`
      height: 100%;
      width: 100%;
      background-color: ${e.colorBgContainer};
      overflow: hidden;
    `,floatSiderLayout:o`
      position: fixed;
      right: 16px;
      top: 16px;
      height: calc(100vh - 32px);
      border-radius: 12px;
      box-shadow: ${s};
      z-index: 1000;
      overflow: hidden;
      background-color: ${e.colorBgElevated};
      border: 1px solid ${t?e.colorBorder:e.colorBorderSecondary};
      transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        box-shadow: ${l};
      }
    `}}),j=e=>{const{visible:o,setVisible:a,setLoaded:t}=n();return i.useEffect(()=>{t(!0)},[t]),r.jsx(f,{className:"ai-chat-modal",width:1200,open:o,closable:!1,onCancel:()=>a(!1),footer:null,children:h(b,e)})},A=e=>{const{styles:o}=w(),{layout:a,visible:t}=n(),[s,l]=i.useState(()=>{const d=localStorage.getItem("ai-sidebar-width");return d?parseInt(d,10):400}),{setLoaded:c}=n();i.useEffect(()=>{c(!0)},[c]),i.useEffect(()=>{localStorage.setItem("ai-sidebar-width",s.toString())},[s]);const x=d=>{l(d)};return r.jsxs("div",{style:{width:`${s}px`,display:t?"flex":"none",overflow:"hidden",flexShrink:0},className:g("ai-sidebar-layout",a==="float-sidebar"?o.floatSiderLayout:o.siderLayout),children:[r.jsx(v,{onResize:x,minWidth:300,maxWidth:window.innerWidth*.5}),r.jsx("div",{style:{borderRadius:a==="float-sidebar"?"12px":"0"},className:o.siderLayoutContent,children:r.jsx("div",{children:h(b,e)})})]})},E=({icon:e})=>r.jsx(m,{icon:e});export{E as A,j as a,A as b};
