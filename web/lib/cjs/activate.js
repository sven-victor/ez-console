"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./vendor.js"),c=require("react"),a=require("antd"),h=require("@ant-design/icons"),w=require("react-router-dom"),k=require("react-i18next"),A=require("./index.js"),T=require("./client.js"),m=require("./components.js"),N=require("./contexts.js"),I=require("antd-style"),u=require("classnames"),{Title:L}=a.Typography,C=I.createStyles(({css:s,isDarkMode:r})=>({container:s`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    ${r?s`
      background: #424242;
    `:s`
      background: #f0f2f5;
    `}
  `,card:s`
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `,languageSwitch:s`
    position: absolute;
    top: 0;
    right: 30px;
  `,themeSwitch:s`
    position: absolute;
    top: 0;
    right: 0;
  `,titleArea:s`
    text-align: center;
    margin-bottom: 20px;
  `,errorAlert:s`
    margin-bottom: 20px;
  `})),F=({transformLangConfig:s})=>{const{styles:r}=C(),[p]=w.useSearchParams(),{t,i18n:g}=k.useTranslation(),R=w.useNavigate(),{siteConfig:i,loading:E,error:l}=N.useSite(),[x]=c.useState(p.get("token")),[y,j]=c.useState(!1),[f,d]=c.useState(p.get("token")?null:t("activate.invalidToken",{defaultValue:"Invalid or expired activation link"})),[S,b]=c.useState(!1),[q,P]=c.useState("");c.useEffect(()=>{var o,n;i&&(P(((o=i.name_i18n)==null?void 0:o[g.language])||i.name||""),window.document.title=i.name,(n=document.getElementById("site-icon"))==null||n.setAttribute("href",i.logo||""))},[i,g.language]);const V=async o=>{if(!x){d(t("activate.invalidToken",{defaultValue:"Invalid or expired activation link"}));return}try{j(!0),d(null),await A.api.authorization.activateUser({token:x,password:o.password}),b(!0)}catch(n){n instanceof T.ApiError?d(t("activate.error",{defaultValue:"Activation failed: {{error}}",error:n.message})):d(t("activate.error",{defaultValue:"Activation failed"}))}finally{j(!1)}};return E?e.jsxRuntimeExports.jsx(m.Loading,{}):i?e.jsxRuntimeExports.jsx("div",{className:"activate-page",children:e.jsxRuntimeExports.jsx("div",{className:u(r.container,"activate-page-container"),children:e.jsxRuntimeExports.jsxs(a.Card,{className:u(r.card,"activate-page-card"),children:[e.jsxRuntimeExports.jsx("div",{className:u(r.languageSwitch,"language-switch"),children:e.jsxRuntimeExports.jsx(m.LanguageSwitch,{transformLangConfig:s})}),e.jsxRuntimeExports.jsx("div",{className:u(r.themeSwitch,"theme-switch"),children:e.jsxRuntimeExports.jsx(m.ThemeSwitch,{})}),e.jsxRuntimeExports.jsxs("div",{className:u(r.titleArea,"activate-page-title"),children:[e.jsxRuntimeExports.jsx(L,{level:2,children:q}),e.jsxRuntimeExports.jsx("p",{children:t("activate.subtitle",{defaultValue:"Activate your account"})})]}),f&&e.jsxRuntimeExports.jsx(a.Alert,{className:u(r.errorAlert,"activate-page-error"),message:f,type:"error",showIcon:!0}),S?e.jsxRuntimeExports.jsx(a.Result,{status:"success",title:t("activate.success",{defaultValue:"Account activated successfully"}),subTitle:t("activate.successSubtitle",{defaultValue:"Your account has been activated. You can now log in."}),extra:e.jsxRuntimeExports.jsx(a.Button,{type:"primary",onClick:()=>{R("/login")},children:t("activate.goToLogin",{defaultValue:"Go to Login"})})}):e.jsxRuntimeExports.jsxs(a.Form,{name:"activate",onFinish:V,size:"large",className:"activate-page-form",children:[e.jsxRuntimeExports.jsx("div",{style:{marginBottom:16},children:e.jsxRuntimeExports.jsx(a.Typography.Text,{type:"secondary",children:t("activate.description",{defaultValue:"Please set a password to activate your account."})})}),e.jsxRuntimeExports.jsx(a.Form.Item,{name:"password",rules:[{required:!0,message:t("activate.passwordRequired",{defaultValue:"Password is required"})}],children:e.jsxRuntimeExports.jsx(a.Input.Password,{prefix:e.jsxRuntimeExports.jsx(h.LockOutlined,{}),placeholder:t("activate.newPassword",{defaultValue:"New Password"}),autoComplete:"new-password"})}),e.jsxRuntimeExports.jsx(a.Form.Item,{name:"confirm_password",dependencies:["password"],rules:[{required:!0,message:t("activate.confirmPasswordRequired",{defaultValue:"Please confirm your password"})},({getFieldValue:o})=>({validator(n,v){return!v||o("password")===v?Promise.resolve():Promise.reject(new Error(t("activate.passwordMismatch",{defaultValue:"Passwords do not match"})))}})],children:e.jsxRuntimeExports.jsx(a.Input.Password,{prefix:e.jsxRuntimeExports.jsx(h.LockOutlined,{}),placeholder:t("activate.confirmPassword",{defaultValue:"Confirm Password"}),autoComplete:"new-password"})}),e.jsxRuntimeExports.jsx(a.Form.Item,{children:e.jsxRuntimeExports.jsx(a.Button,{type:"primary",htmlType:"submit",loading:y,block:!0,disabled:!x,children:t("activate.activateButton",{defaultValue:"Activate Account"})})})]})]})})}):e.jsxRuntimeExports.jsx(a.Result,{status:"500",title:"500",subTitle:t("login.fetchSiteConfigError",{defaultValue:"Failed to fetch site config: {{error}}",error:(l==null?void 0:l.message)||l})})};exports.default=F;
