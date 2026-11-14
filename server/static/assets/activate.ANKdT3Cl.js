import{b9 as C,u as E,m as L,r as n,j as e,R as x,a5 as R,a as c,T as y,K as q,B as w,G as d,H as j,bb as b,b as B}from"./vendor.VLvkUFsS.js";import{a as F}from"./index.adF91stt.js";import{A as _}from"./client.DAY66TeD.js";import{L as z,a as G,b as Y}from"./components.BvxSikt-.js";import{b as H}from"./contexts.ChHhY77L.js";import"./vite.CnSqVV0U.js";import"./lodash.Bb75kzRV.js";import"./highlight.DHmnecVl.js";import"./ai.DZmJDAw9.js";import"./authorization.omg_cWjh.js";import"./base.D7p3dOp-.js";import"./inbox.CH_Yu89F.js";import"./system.FOoWVHzN.js";import"./oauth.eSBUUG4P.js";import"./tasks.BwFIB-oC.js";import"./ai-chat-layout.Q5EBRCJq.js";const{Title:K}=y,M=B(({css:a,isDarkMode:s})=>({container:a`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    ${s?a`
      background: #424242;
    `:a`
      background: #f0f2f5;
    `}
  `,card:a`
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `,languageSwitch:a`
    position: absolute;
    top: 0;
    right: 30px;
  `,themeSwitch:a`
    position: absolute;
    top: 0;
    right: 0;
  `,titleArea:a`
    text-align: center;
    margin-bottom: 20px;
  `,errorAlert:a`
    margin-bottom: 20px;
  `})),ne=({transformLangConfig:a})=>{const{styles:s}=M(),[p]=C(),{t,i18n:f}=E(),S=L(),{siteConfig:r,loading:V,error:l}=H(),[m]=n.useState(p.get("token")),[A,g]=n.useState(!1),[h,u]=n.useState(p.get("token")?null:t("activate.invalidToken",{defaultValue:"Invalid or expired activation link"})),[P,N]=n.useState(!1),[T,k]=n.useState("");n.useEffect(()=>{var i,o;r&&(k(((i=r.name_i18n)==null?void 0:i[f.language])||r.name||""),window.document.title=r.name,(o=document.getElementById("site-icon"))==null||o.setAttribute("href",r.logo||""))},[r,f.language]);const I=async i=>{if(!m){u(t("activate.invalidToken",{defaultValue:"Invalid or expired activation link"}));return}try{g(!0),u(null),await F.authorization.activateUser({token:m,password:i.password}),N(!0)}catch(o){o instanceof _?u(t("activate.error",{defaultValue:"Activation failed: {{error}}",error:o.message})):u(t("activate.error",{defaultValue:"Activation failed"}))}finally{g(!1)}};return V?e.jsx(z,{}):r?e.jsx("div",{className:"activate-page",children:e.jsx("div",{className:c(s.container,"activate-page-container"),children:e.jsxs(R,{className:c(s.card,"activate-page-card"),children:[e.jsx("div",{className:c(s.languageSwitch,"language-switch"),children:e.jsx(G,{transformLangConfig:a})}),e.jsx("div",{className:c(s.themeSwitch,"theme-switch"),children:e.jsx(Y,{})}),e.jsxs("div",{className:c(s.titleArea,"activate-page-title"),children:[e.jsx(K,{level:2,children:T}),e.jsx("p",{children:t("activate.subtitle",{defaultValue:"Activate your account"})})]}),h&&e.jsx(q,{className:c(s.errorAlert,"activate-page-error"),message:h,type:"error",showIcon:!0}),P?e.jsx(x,{status:"success",title:t("activate.success",{defaultValue:"Account activated successfully"}),subTitle:t("activate.successSubtitle",{defaultValue:"Your account has been activated. You can now log in."}),extra:e.jsx(w,{type:"primary",onClick:()=>{S("/login")},children:t("activate.goToLogin",{defaultValue:"Go to Login"})})}):e.jsxs(d,{name:"activate",onFinish:I,size:"large",className:"activate-page-form",children:[e.jsx("div",{style:{marginBottom:16},children:e.jsx(y.Text,{type:"secondary",children:t("activate.description",{defaultValue:"Please set a password to activate your account."})})}),e.jsx(d.Item,{name:"password",rules:[{required:!0,message:t("activate.passwordRequired",{defaultValue:"Password is required"})}],children:e.jsx(j.Password,{prefix:e.jsx(b,{}),placeholder:t("activate.newPassword",{defaultValue:"New Password"}),autoComplete:"new-password"})}),e.jsx(d.Item,{name:"confirm_password",dependencies:["password"],rules:[{required:!0,message:t("activate.confirmPasswordRequired",{defaultValue:"Please confirm your password"})},({getFieldValue:i})=>({validator(o,v){return!v||i("password")===v?Promise.resolve():Promise.reject(new Error(t("activate.passwordMismatch",{defaultValue:"Passwords do not match"})))}})],children:e.jsx(j.Password,{prefix:e.jsx(b,{}),placeholder:t("activate.confirmPassword",{defaultValue:"Confirm Password"}),autoComplete:"new-password"})}),e.jsx(d.Item,{children:e.jsx(w,{type:"primary",htmlType:"submit",loading:A,block:!0,disabled:!m,children:t("activate.activateButton",{defaultValue:"Activate Account"})})})]})]})})}):e.jsx(x,{status:"500",title:"500",subTitle:t("login.fetchSiteConfigError",{defaultValue:"Failed to fetch site config: {{error}}",error:(l==null?void 0:l.message)||l})})};export{ne as default};
