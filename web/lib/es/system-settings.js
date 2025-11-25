import { j as e } from "./vendor.js";
import { Form as l, message as u, Spin as ne, Switch as G, Select as L, Input as m, Divider as ke, Alert as Le, Space as K, Button as w, InputNumber as Y, Modal as Z, Skeleton as qe, Descriptions as Q, Steps as Me, Tag as J, Table as oe, Radio as ue, Tabs as Ue, Tooltip as Ne, Card as W, Row as ce, Col as ee, Result as De } from "antd";
import { useTranslation as M } from "react-i18next";
import { useState as v, useEffect as me, useMemo as $e } from "react";
import { useRequest as S } from "ahooks";
import { SaveOutlined as Te, ReloadOutlined as se, LoadingOutlined as Be, CheckCircleTwoTone as Ke, StarFilled as He, CheckCircleOutlined as Oe, StarOutlined as Ge, EditOutlined as pe, DeleteOutlined as ge, PlusOutlined as fe, ThunderboltOutlined as Ze, ToolOutlined as Ee, SettingOutlined as Je, LockOutlined as We, EyeOutlined as Qe, ArrowLeftOutlined as Xe } from "@ant-design/icons";
import { a as T } from "./index.js";
import { g as Pe } from "./base.js";
import { h as te, f as Ye, c as he, n as et, L as tt } from "./components.js";
import Fe from "react-quill";
import { useNavigate as Ae, useLocation as st, useParams as lt, useSearchParams as at } from "react-router-dom";
import { l as nt, c as it, u as ot, d as rt, g as dt, b as ut, e as ct, f as mt, r as pt } from "./system.js";
import { b as gt, a as ft } from "./contexts.js";
import { l as ht, b as xt } from "./authorization.js";
import Re from "react-json-view";
const ae = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, yt = {
  github: {
    email_field: "email",
    username_field: "login",
    full_name_field: "name",
    avatar_field: "avatar_url",
    role_field: "",
    icon_url: "https://github.githubassets.com/favicons/favicon.svg",
    display_name: "GitHub",
    endpoints: {
      auth_endpoint: "https://github.com/login/oauth/authorize",
      token_endpoint: "https://github.com/login/oauth/access_token",
      userinfo_endpoint: "https://api.github.com/user"
    },
    scope: "user:email"
  },
  google: {
    email_field: "email",
    username_field: "email",
    full_name_field: "name",
    avatar_field: "picture",
    role_field: "",
    icon_url: "https://www.google.com/favicon.ico",
    display_name: "Google",
    endpoints: {
      auth_endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      token_endpoint: "https://oauth2.googleapis.com/token",
      userinfo_endpoint: "https://openidconnect.googleapis.com/v1/userinfo"
    },
    scope: "profile email"
  },
  dingtalk: {
    email_field: "email",
    username_field: "nick",
    full_name_field: "name",
    avatar_field: "avatar",
    role_field: "",
    icon_url: "https://img.alicdn.com/tfs/TB1pTD.XQT2gK0jSZFkXXcIQFXa-160-160.png",
    display_name: "DingTalk",
    endpoints: {
      auth_endpoint: "https://oapi.dingtalk.com/connect/qrconnect",
      token_endpoint: "https://oapi.dingtalk.com/gettoken",
      userinfo_endpoint: "https://oapi.dingtalk.com/topapi/user/get"
    },
    scope: "snsapi_login"
  },
  wechat: {
    email_field: "",
    username_field: "openid",
    full_name_field: "nickname",
    avatar_field: "headimgurl",
    role_field: "",
    icon_url: "https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico",
    display_name: "WeChat",
    endpoints: {
      auth_endpoint: "https://open.weixin.qq.com/connect/qrconnect",
      token_endpoint: "https://api.weixin.qq.com/sns/oauth2/access_token",
      userinfo_endpoint: "https://api.weixin.qq.com/sns/userinfo"
    },
    scope: "snsapi_login"
  },
  custom: {
    email_field: "",
    username_field: "",
    full_name_field: "",
    avatar_field: "",
    role_field: "",
    icon_url: "",
    display_name: "",
    endpoints: {
      auth_endpoint: "",
      token_endpoint: "",
      userinfo_endpoint: ""
    },
    scope: ""
  }
}, Vt = ({ initialData: t, onRefresh: a }) => {
  const { t: s } = M("system"), { t: j } = M("common"), [g] = l.useForm(), [f, _] = v((t == null ? void 0 : t.provider) || "custom"), [b, x] = v((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [i, o] = v((t == null ? void 0 : t.enabled) || !1), [c, R] = v((t == null ? void 0 : t.auto_create_user) || !1), { loading: F, data: z, refresh: y } = S(T.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (h) => {
      g.setFieldsValue(h), _(h.provider), x(h.provider === "custom" || h.provider === "autoDiscover"), o(h.enabled), R(h.auto_create_user);
    },
    onError: (h) => {
      u.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", h);
    }
  });
  me(() => {
    t && (g.setFieldsValue(t), _(t.provider), x(t.provider === "custom" || t.provider === "autoDiscover"), o(t.enabled), R(t.auto_create_user));
  }, [t, g]);
  const k = (h) => {
    _(h), x(h === "custom" || h === "autoDiscover");
    const d = yt[h];
    d && g.setFieldsValue({
      auth_endpoint: d.endpoints.auth_endpoint,
      token_endpoint: d.endpoints.token_endpoint,
      userinfo_endpoint: d.endpoints.userinfo_endpoint,
      scope: d.scope,
      // Set field mappings
      email_field: d.email_field,
      username_field: d.username_field,
      full_name_field: d.full_name_field,
      avatar_field: d.avatar_field,
      role_field: d.role_field,
      // Set display configuration
      icon_url: d.icon_url,
      display_name: d.display_name
    });
  }, q = (h) => {
    o(h);
  }, C = (h) => {
    R(h);
  }, { loading: I, run: H } = S(T.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      u.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), a ? a() : y();
    },
    onError: (h) => {
      u.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", h);
    }
  }), N = (h) => {
    H(h);
  }, E = () => {
    a ? a() : y();
  }, { loading: p, run: P } = S(async ({ redirect_uri: h, ...d }) => {
    let $;
    return h ? $ = new URL(h) : $ = new URL(window.location.origin), $.pathname = Pe("/system/settings/oauth/test-callback"), $.searchParams.set("provider", f), T.system.testOauthConnection({ redirect_uri: $.toString(), ...d });
  }, {
    manual: !0,
    onSuccess: ({ url: h }) => {
      window.open(h, "_blank");
    },
    onError: (h) => {
      u.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: h.message })), console.error("Failed to test OAuth connection", h);
    }
  }), U = () => f === "custom";
  return /* @__PURE__ */ e.jsx(ne, { spinning: F, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: g,
      layout: "vertical",
      onFinish: N,
      initialValues: t || z,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(G, { onChange: q })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "provider",
            label: s("settings.oauth.provider.label", { defaultValue: "OAuth Provider" }),
            tooltip: s("settings.oauth.provider.tooltip", { defaultValue: "Select an OAuth provider or configure a custom one." }),
            rules: [
              {
                required: i,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(L, { onChange: k, disabled: !i, children: [
              /* @__PURE__ */ e.jsx(L.Option, { value: "github", children: s("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "google", children: s("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "dingtalk", children: s("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "wechat", children: s("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "autoDiscover", children: s("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "custom", children: s("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              m,
              {
                disabled: !i,
                placeholder: f !== "custom" ? s(`settings.oauth.provider.options.${f}`, { defaultValue: f }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "icon_url",
            label: s("settings.oauth.iconUrl.label", { defaultValue: "Icon URL" }),
            tooltip: s("settings.oauth.iconUrl.tooltip", { defaultValue: "URL of the icon for this provider. Displayed on the login button." }),
            rules: [
              {
                pattern: ae,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(m, { disabled: !i, placeholder: "https://example.com/icon.png" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "client_id",
            label: s("settings.oauth.clientId.label", { defaultValue: "Client ID" }),
            tooltip: s("settings.oauth.clientId.tooltip", { defaultValue: "The Client ID provided by the OAuth provider." }),
            rules: [
              {
                required: i,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(m, { disabled: !i })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "client_secret",
            label: s("settings.oauth.clientSecret.label", { defaultValue: "Client Secret" }),
            tooltip: s("settings.oauth.clientSecret.tooltip", { defaultValue: "The Client Secret provided by the OAuth provider. This will be stored encrypted." }),
            rules: [
              {
                required: i,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(m.Password, { disabled: !i, autoComplete: "off", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        U() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: i && f === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: ae,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(m, { disabled: !i })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "wellknown_endpoint",
            hidden: f !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: ae,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: i && f === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(m, { disabled: !i })
          }
        ),
        U() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: i && f === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: ae,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(m, { disabled: !i })
          }
        ),
        U() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: i && f === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: ae,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(m, { disabled: !i })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "scope",
            label: s("settings.oauth.scope.label", { defaultValue: "Authorization Scope" }),
            tooltip: s("settings.oauth.scope.tooltip", { defaultValue: "The scopes to request from the OAuth provider, separated by spaces." }),
            rules: [
              {
                required: i,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(m, { disabled: !i })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(h) => h.getFieldValue("redirect_uri") !== "" ? {
              pattern: ae,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(m, { disabled: !i, placeholder: `http://${window.location.host}${Pe(`/login?provider=settings.${f}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(G, { onChange: C, disabled: !i })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "default_role",
            label: s("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: s("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: i && c,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(m, { disabled: !i || !c })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(G, { disabled: !i })
          }
        ),
        /* @__PURE__ */ e.jsx(ke, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Le,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: b ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(m, { placeholder: "email", disabled: !i || !b })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(m, { placeholder: "login", autoComplete: "off", disabled: !i || !b })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(m, { placeholder: "name", disabled: !i || !b })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(m, { placeholder: "avatar_url", disabled: !i || !b })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(m, { placeholder: "role", disabled: !i || !b })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              htmlType: "submit",
              loading: I,
              icon: /* @__PURE__ */ e.jsx(Te, {}),
              children: j("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              loading: p,
              onClick: async () => {
                const h = g.getFieldsValue();
                P(h);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              onClick: E,
              icon: /* @__PURE__ */ e.jsx(se, {}),
              children: j("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, bt = () => {
  const { t } = M("system"), { t: a } = M("common"), [s] = l.useForm(), { loading: j, data: g, refresh: f } = S(T.system.getSecuritySettings, {
    onSuccess: (i) => {
      s.setFieldsValue(i);
    },
    onError: (i) => {
      u.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", i);
    }
  }), { loading: _, run: b } = S(T.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      u.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), f();
    },
    onError: (i) => {
      u.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", i);
    }
  }), x = (i) => {
    b(i);
  };
  return /* @__PURE__ */ e.jsx(ne, { spinning: j, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: s,
      layout: "vertical",
      onFinish: x,
      initialValues: g,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(G, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_complexity",
            label: t("settings.security.passwordComplexity.label", { defaultValue: "Password Complexity" }),
            tooltip: t("settings.security.passwordComplexity.tooltip", { defaultValue: "Define the complexity requirements for user passwords." }),
            children: /* @__PURE__ */ e.jsxs(L, { children: [
              /* @__PURE__ */ e.jsx(L.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_min_length",
            label: t("settings.security.passwordMinLength.label", { defaultValue: "Minimum Password Length" }),
            tooltip: t("settings.security.passwordMinLength.tooltip", { defaultValue: "The minimum number of characters required for a password." }),
            rules: [{ type: "number", min: 6, max: 32 }],
            children: /* @__PURE__ */ e.jsx(Y, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(Y, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(G, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (i, o) => i.login_failure_lock !== o.login_failure_lock,
            children: ({ getFieldValue: i }) => i("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(Y, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (i, o) => i.login_failure_lock !== o.login_failure_lock,
            children: ({ getFieldValue: i }) => i("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(Y, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "history_password_check",
            label: t("settings.security.historyPasswordCheck.label", { defaultValue: "Enforce Password History Policy" }),
            valuePropName: "checked",
            tooltip: t("settings.security.historyPasswordCheck.tooltip", { defaultValue: "Prevent users from reusing recent passwords." }),
            children: /* @__PURE__ */ e.jsx(G, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (i, o) => i.history_password_check !== o.history_password_check,
            children: ({ getFieldValue: i }) => i("history_password_check") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(Y, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "inactive_account_lock_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(Y, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(Y, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(Y, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              htmlType: "submit",
              loading: _,
              icon: /* @__PURE__ */ e.jsx(Te, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              onClick: () => f(),
              icon: /* @__PURE__ */ e.jsx(se, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, jt = ({ fetchItems: t, importItems: a, columns: s, ...j }) => {
  const { t: g } = M("system"), [f, _] = v([]), [b, x] = v([]), { run: i, loading: o } = S(t, {
    onError: (F) => {
      u.error(g("settings.ldap.importError", { error: `${F.message}` }));
    },
    onSuccess: (F) => {
      _(F);
    },
    manual: !0
  }), { run: c, loading: R } = S(async () => {
    for (const F of b.filter((z) => {
      const y = f.find((k) => k.ldap_dn === z);
      return !(!y || y.status === "imported");
    })) {
      const z = await a([F]);
      _((y) => [...y].map((q) => {
        for (const C of z)
          if (q.ldap_dn === C.ldap_dn)
            return { ...C, status: "imported" };
        return q;
      }));
    }
  }, {
    manual: !0
  });
  return me(() => {
    j.visible && (_([]), i(), x([]));
  }, [j.visible]), /* @__PURE__ */ e.jsx(
    Z,
    {
      title: g("settings.ldap.importTitle"),
      ...j,
      onOk: () => {
        c();
      },
      width: 900,
      confirmLoading: R,
      loading: o,
      children: /* @__PURE__ */ e.jsx(
        oe,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (F) => {
              x(F);
            },
            getCheckboxProps: (F) => ({
              disabled: F.status === "imported"
            })
          },
          columns: s.map(({ render: F, ...z }) => F ? {
            ...z,
            render: (y, k, q) => {
              const C = b.includes(k.ldap_dn) && R && k.status !== "imported";
              return F(y, k, q, C);
            }
          } : z),
          dataSource: f,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, _t = () => {
  var k, q, C;
  const { t } = M("system"), [a] = l.useForm(), [s, j] = v(!1), [g, f] = v(null), [_, b] = v(!1), [x, i] = v(!1), [o] = l.useForm(), [c, R] = v(!1);
  S(T.system.getLdapSettings, {
    onSuccess: (I) => {
      a.setFieldsValue(I), R(I.enabled);
    },
    onError: (I) => {
      u.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${I.message}` }));
    }
  }), me(() => {
    f(null);
  }, [_]);
  const F = async (I) => {
    j(!0);
    try {
      await T.system.updateLdapSettings(I), u.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      u.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      j(!1);
    }
  }, { run: z, loading: y } = S(async (I) => {
    const H = await a.validateFields();
    return await T.system.testLdapConnection({
      ...I,
      ...H
    });
  }, {
    onSuccess: (I) => {
      f(I);
    },
    onError: (I) => {
      u.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${I.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      l,
      {
        form: a,
        layout: "vertical",
        onFinish: F,
        initialValues: {
          user_attr: "uid",
          email_attr: "mail",
          display_name_attr: "displayName",
          default_role: "user"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(G, { onChange: (I) => R(I) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: c, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(m, { disabled: !c, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: c, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(m, { disabled: !c, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: c, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(m.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: c, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(m, { disabled: !c, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(m, { disabled: !c, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: c, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(m, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: c, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(m, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: c, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(m, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: c, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(m, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(m, { type: "number", defaultValue: 15, disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(ke, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(G, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(G, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(m.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(m.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(m.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(te, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(te, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              w,
              {
                disabled: !c,
                style: { marginLeft: 8 },
                onClick: () => b(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(te, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              w,
              {
                disabled: !c,
                style: { marginLeft: 8 },
                onClick: () => {
                  i(!0);
                },
                children: t("settings.ldap.import", { defaultValue: "Import Users" })
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs(
      Z,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: _,
        onCancel: () => b(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            l,
            {
              form: o,
              layout: "vertical",
              onFinish: z,
              children: [
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(m, { disabled: !c })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(m.Password, { disabled: !c })
                  }
                ),
                /* @__PURE__ */ e.jsxs(l.Item, { children: [
                  /* @__PURE__ */ e.jsx(te, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(w, { disabled: !c, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    w,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => b(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(ne, { spinning: y, children: /* @__PURE__ */ e.jsx(qe, { active: y, loading: y, children: g && (g.user ? /* @__PURE__ */ e.jsxs(Q, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(Q.Item, { label: "Username", span: 3, children: g.user.username }),
            /* @__PURE__ */ e.jsx(Q.Item, { label: "Email", span: 3, children: g.user.email }),
            /* @__PURE__ */ e.jsx(Q.Item, { label: "FullName", span: 3, children: g.user.full_name }),
            /* @__PURE__ */ e.jsx(Q.Item, { label: "CreatedAt", span: 3, children: g.user.created_at }),
            /* @__PURE__ */ e.jsx(Q.Item, { label: "UpdatedAt", span: 3, children: g.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Me,
            {
              direction: "vertical",
              current: (k = g.message) == null ? void 0 : k.findIndex((I) => !I.success),
              status: (q = g.message) != null && q.find((I) => !I.success) ? "error" : "finish",
              items: (C = g.message) == null ? void 0 : C.map((I) => ({
                status: I.success ? "finish" : "error",
                title: I.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      jt,
      {
        visible: x,
        onCancel: () => i(!1),
        fetchItems: () => T.system.importLdapUsers({}),
        importItems: (I) => T.system.importLdapUsers({ user_dn: I }),
        columns: [{
          title: t("settings.ldap.username", { defaultValue: "Username" }),
          dataIndex: "username"
        }, {
          title: t("settings.ldap.email", { defaultValue: "Email" }),
          dataIndex: "email"
        }, {
          title: t("settings.ldap.fullName", { defaultValue: "Full Name" }),
          dataIndex: "full_name"
        }, {
          title: t("settings.ldap.importStatus", { defaultValue: "Import Status" }),
          dataIndex: "imported",
          fixed: "right",
          render: (I, H, N, E) => E ? /* @__PURE__ */ e.jsx(ne, { indicator: /* @__PURE__ */ e.jsx(Be, { spin: !0 }) }) : I ? /* @__PURE__ */ e.jsx(Ke, { twoToneColor: "#52c41a" }) : H.id ? /* @__PURE__ */ e.jsx(J, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(J, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, vt = () => {
  const { t } = M("system"), { t: a } = M("common"), [s] = l.useForm(), [j, g] = v(null), [f, _] = v(!1), [b] = l.useForm(), [x, i] = v(!1), { loading: o } = S(T.system.getSmtpSettings, {
    onSuccess: (y) => {
      s.setFieldsValue(y), i(y.enabled);
    },
    onError: (y) => {
      u.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${y.message}` }));
    }
  });
  me(() => {
    g(null);
  }, [f]);
  const { run: c, loading: R } = S(({ port: y, ...k }) => T.system.updateSmtpSettings({ ...k, port: Number(y) }), {
    manual: !0,
    onSuccess: () => {
      u.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (y) => {
      u.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${y.message}` }));
    }
  }), { run: F, loading: z } = S(async (y) => {
    const { port: k, ...q } = await s.validateFields();
    return await T.system.testSmtpConnection({
      ...y,
      ...q,
      port: Number(k)
    });
  }, {
    onSuccess: (y) => {
      g(y);
    },
    onError: (y) => {
      u.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${y.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(ne, { spinning: o, children: /* @__PURE__ */ e.jsxs(
      l,
      {
        form: s,
        layout: "vertical",
        onFinish: c,
        initialValues: {
          port: 587,
          encryption: "STARTTLS"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(G, { onChange: (y) => i(y) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: x, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(m, { disabled: !x, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: x, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(m, { type: "number", disabled: !x, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: x, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(m, { disabled: !x, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(m.Password, { disabled: !x, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: x, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(ue.Group, { disabled: !x, children: [
                /* @__PURE__ */ e.jsx(ue.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(ue.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(ue.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: x, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(m, { disabled: !x, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(m, { disabled: !x, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(ke, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(Fe, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(Fe, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(Fe, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(te, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: R, style: { marginRight: 8 }, children: a("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              w,
              {
                onClick: () => _(!0),
                disabled: !x || z,
                loading: z,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Z,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: f,
        onCancel: () => _(!1),
        footer: [
          /* @__PURE__ */ e.jsx(w, { onClick: () => _(!1), children: a("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(w, { type: "primary", loading: z, onClick: () => b.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: b,
            layout: "vertical",
            onFinish: (y) => F(y),
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  label: t("settings.smtp.testEmailRecipient", { defaultValue: "Recipient Email Address" }),
                  name: "to",
                  rules: [
                    { required: !0, message: t("settings.smtp.testEmailRecipientRequired", { defaultValue: "Recipient email address is required." }) },
                    { type: "email", message: t("settings.smtp.testEmailRecipientInvalid", { defaultValue: "Invalid email address." }) }
                  ],
                  children: /* @__PURE__ */ e.jsx(m, { placeholder: "test@example.com" })
                }
              ),
              j && /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: j.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: j.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, St = () => {
  const { t, i18n: a } = M("system"), { t: s } = M("common"), [j] = l.useForm(), { loading: g, data: f, refresh: _ } = S(T.system.getSystemBaseSettings, {
    onSuccess: (o) => {
      j.setFieldsValue(o);
    },
    onError: (o) => {
      u.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: b, run: x } = S(T.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      u.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), _();
    },
    onError: (o) => {
      u.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), i = (o) => {
    x(o);
  };
  return /* @__PURE__ */ e.jsx(ne, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: j,
      layout: "vertical",
      onFinish: i,
      initialValues: f,
      children: [
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Ue, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: "name", children: /* @__PURE__ */ e.jsx(m, {}) }) })
        }, ...Ye.map((o) => ({
          key: o.lang,
          label: a.language !== o.lang ? s(`language.${o.lang}`, { defaultValue: o.label, lang: o.label }) : o.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: ["name_i18n", o.lang], children: /* @__PURE__ */ e.jsx(m, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(m, {}) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(m, {}) }),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(G, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(G, {})
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              htmlType: "submit",
              loading: b,
              icon: /* @__PURE__ */ e.jsx(Te, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              onClick: () => _(),
              icon: /* @__PURE__ */ e.jsx(se, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: It } = m, { Option: Ct } = L, wt = () => {
  const { t } = M("ai"), { t: a } = M("common"), [s] = l.useForm(), [j, g] = v(!1), [f, _] = v(null), [b, x] = v(""), { loading: i, data: o, refresh: c } = S(
    () => T.ai.listAiModels({ current: 1, page_size: 100, search: b }),
    {
      refreshDeps: [b],
      onError: (p) => {
        u.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", p);
      }
    }
  ), { loading: R, run: F } = S(
    (p) => T.ai.createAiModel(p),
    {
      manual: !0,
      onSuccess: () => {
        u.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), g(!1), s.resetFields(), c();
      },
      onError: (p) => {
        u.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", p);
      }
    }
  ), { loading: z, run: y } = S(
    ({ id: p, data: P }) => T.ai.updateAiModel({ id: p }, P),
    {
      manual: !0,
      onSuccess: () => {
        u.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), g(!1), s.resetFields(), _(null), c();
      },
      onError: (p) => {
        u.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", p);
      }
    }
  ), { runAsync: k } = S(
    (p) => T.ai.deleteAiModel({ id: p }),
    {
      manual: !0,
      onSuccess: () => {
        u.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), c();
      },
      onError: (p) => {
        u.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", p);
      }
    }
  ), { runAsync: q } = S(
    (p) => T.ai.testAiModel({ id: p }),
    {
      manual: !0,
      onSuccess: () => {
        u.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (p) => {
        u.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", p);
      }
    }
  ), { runAsync: C } = S(
    (p) => T.ai.setDefaultAiModel({ id: p }),
    {
      manual: !0,
      onSuccess: () => {
        u.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), c();
      },
      onError: (p) => {
        u.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", p);
      }
    }
  ), I = () => {
    _(null), s.resetFields(), g(!0);
  }, H = (p) => {
    _(p), s.setFieldsValue({
      ...p,
      api_key: ""
      // Don't populate API key for security
    }), g(!0);
  }, N = (p) => {
    f ? y({ id: f.id, data: p }) : F(p);
  }, E = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (p, P) => /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx("span", { children: p }),
        P.is_default && /* @__PURE__ */ e.jsx(Ne, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(He, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (p) => /* @__PURE__ */ e.jsx(J, { color: "blue", children: p.toUpperCase() })
    },
    {
      title: t("models.modelId", { defaultValue: "Model ID" }),
      dataIndex: "model_id",
      key: "model_id"
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (p) => /* @__PURE__ */ e.jsx(J, { color: p === "enabled" ? "green" : "red", children: p === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (p, P) => /* @__PURE__ */ e.jsx(he, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => q(P.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(Ge, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => C(P.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(pe, {}),
          tooltip: a("edit", { defaultValue: "Edit" }),
          onClick: async () => H(P)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(ge, {}),
          tooltip: a("delete", { defaultValue: "Delete" }),
          onClick: async () => k(P.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(W, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ce, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsx(
        m.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: b,
          onChange: (p) => x(p.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(se, {}),
            onClick: c,
            loading: i,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(te, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(fe, {}),
            onClick: I,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(W, { children: /* @__PURE__ */ e.jsx(
      oe,
      {
        columns: E,
        dataSource: (o == null ? void 0 : o.data) || [],
        loading: i,
        rowKey: "id",
        pagination: {
          total: (o == null ? void 0 : o.total) || 0,
          current: (o == null ? void 0 : o.current) || 1,
          pageSize: (o == null ? void 0 : o.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (p, P) => t("common.pagination.total", {
            defaultValue: `${P[0]}-${P[1]} of ${p} items`,
            start: P[0],
            end: P[1],
            total: p
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Z,
      {
        title: f ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: j,
        onCancel: () => {
          g(!1), s.resetFields(), _(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: s,
            layout: "vertical",
            onFinish: N,
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(m, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    It,
                    {
                      rows: 3,
                      placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsxs(ce, { gutter: 16, children: [
                /* @__PURE__ */ e.jsx(ee, { span: 12, children: /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    name: "provider",
                    label: t("models.provider", { defaultValue: "Provider" }),
                    rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                    children: /* @__PURE__ */ e.jsx(L, { placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }), children: /* @__PURE__ */ e.jsx(Ct, { value: "openai", children: "OpenAI" }) })
                  }
                ) }),
                /* @__PURE__ */ e.jsx(ee, { span: 12, children: /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    name: "model_id",
                    label: t("models.modelId", { defaultValue: "Model ID" }),
                    rules: [{ required: !0, message: t("models.modelIdRequired", { defaultValue: "Please enter model ID" }) }],
                    children: /* @__PURE__ */ e.jsx(m, { placeholder: "gpt-4, gpt-3.5-turbo, etc." })
                  }
                ) })
              ] }),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "api_key",
                  label: t("models.apiKey", { defaultValue: "API Key" }),
                  rules: f ? [] : [{ required: !0, message: t("models.apiKeyRequired", { defaultValue: "Please enter API key" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    m.Password,
                    {
                      placeholder: f ? t("models.apiKeyPlaceholderEdit", { defaultValue: "Leave empty to keep current API key" }) : t("models.apiKeyPlaceholder", { defaultValue: "Enter API key" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "base_url",
                  label: t("models.baseUrl", { defaultValue: "Base URL" }),
                  children: /* @__PURE__ */ e.jsx(m, { placeholder: t("models.baseUrlPlaceholder", { defaultValue: "Optional: Custom API endpoint" }) })
                }
              ),
              /* @__PURE__ */ e.jsxs(
                l.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(G, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: R || z,
                    children: f ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    onClick: () => {
                      g(!1), s.resetFields(), _(null);
                    },
                    children: a("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    )
  ] });
}, { TextArea: Ft } = m, kt = () => {
  var X;
  const { t } = M("system"), { t: a } = M("common"), [s] = l.useForm(), [j, g] = v(!1), [f, _] = v(null), [b, x] = v(""), [i, o] = v(!1), [c, R] = v(null), [F, z] = v(""), [y, k] = v(!1), [q, C] = v([]), [I, H] = v({}), { loading: N, data: E, refresh: p } = S(
    () => T.system.listToolSets({ current: 1, page_size: 100, search: b }),
    {
      refreshDeps: [b],
      onError: (n) => {
        u.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", n);
      }
    }
  ), { loading: P, data: U } = S(
    () => T.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (n) => {
        u.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", n);
      }
    }
  ), h = $e(() => U == null ? void 0 : U.find((n) => n.tool_set_type === F), [U, F]), { loading: d, run: $ } = S(
    (n) => T.system.createToolSet({
      ...n,
      type: n.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        u.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), g(!1), s.resetFields(), p();
      },
      onError: (n) => {
        u.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", n);
      }
    }
  ), { loading: xe, run: ye } = S(
    ({ id: n, data: V }) => T.system.updateToolSet({ id: n }, {
      ...V,
      type: V.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        u.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), g(!1), s.resetFields(), _(null), p();
      },
      onError: (n) => {
        u.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", n);
      }
    }
  ), { run: Ve } = S(
    (n) => T.system.deleteToolSet({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        u.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), p();
      },
      onError: (n) => {
        u.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", n);
      }
    }
  ), { runAsync: be } = S(
    (n) => T.system.testToolSet({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        u.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (n) => {
        u.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", n);
      }
    }
  ), { loading: je, runAsync: _e } = S(
    (n) => T.system.getToolSetTools({ id: n }),
    {
      manual: !0,
      onSuccess: (n) => {
        C(n || []), k(!0);
      },
      onError: (n) => {
        u.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", n);
      }
    }
  ), { runAsync: ve } = S(
    ({ id: n, status: V }) => T.system.updateToolSetStatus({ id: n }, { status: V }),
    {
      manual: !0,
      onSuccess: () => {
        u.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), p();
      },
      onError: (n) => {
        u.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", n);
      }
    }
  ), Se = () => {
    _(null), s.resetFields(), z(""), g(!0);
  }, Ie = (n) => {
    _(n), z(n.type);
    const V = { ...n };
    if (V.config) {
      const O = U == null ? void 0 : U.find((A) => A.tool_set_type === n.type);
      if (O) {
        const A = {};
        O.config_fields.forEach((B) => {
          var le, ze;
          B.type === "object" && ((le = V.config) != null && le[B.name]) ? A[B.name] = JSON.stringify(V.config[B.name], null, 2) : ((ze = V.config) == null ? void 0 : ze[B.name]) !== void 0 && (A[B.name] = V.config[B.name]);
        }), V.config = A;
      }
    }
    s.setFieldsValue(V), g(!0);
  };
  console.log(F, U);
  const Ce = (n) => {
    z(n);
    const V = U == null ? void 0 : U.find((O) => O.tool_set_type === n);
    if (V) {
      const O = {};
      V.config_fields.forEach((A) => {
        if (A.default)
          switch (A.type) {
            case "number":
              O[A.name] = Number(A.default);
              break;
            case "boolean":
              O[A.name] = A.default === "true";
              break;
            case "array":
              O[A.name] = A.default.split(",");
              break;
            default:
              O[A.name] = A.default;
          }
      }), s.setFieldValue("config", O);
    } else
      s.setFieldValue("config", void 0);
  }, we = (n) => {
    if (n.config && h) {
      const V = {};
      h.config_fields.forEach((O) => {
        var B;
        const A = (B = n.config) == null ? void 0 : B[O.name];
        if (A !== void 0)
          if (O.type === "object")
            try {
              V[O.name] = typeof A == "string" ? JSON.parse(A) : A;
            } catch {
              V[O.name] = A;
            }
          else
            V[O.name] = A;
      }), n.config = V;
    }
    f ? ye({ id: f.id, data: n }) : $(n);
  }, ie = (n) => {
    Ve(n);
  }, re = (n) => {
    R(n), o(!0);
  }, de = (n) => {
    console.log(/* @__PURE__ */ new Date(), "handleToggleStatus");
    const V = n.status === "enabled" ? "disabled" : "enabled";
    return ve({ id: n.id, status: V }).then(() => {
      console.log(/* @__PURE__ */ new Date(), "handleToggleStatus1");
    });
  }, r = (n) => {
    var O;
    if (!((O = n.data_source) != null && O.depends_on) || n.data_source.depends_on.length === 0)
      return {};
    const V = {};
    return n.data_source.depends_on.forEach((A) => {
      var le;
      const B = (le = I.config) == null ? void 0 : le[A];
      B !== void 0 && (V[A] = B);
    }), V;
  };
  console.log(E);
  const D = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (n) => /* @__PURE__ */ e.jsx(J, { color: "blue", children: n.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (n) => /* @__PURE__ */ e.jsx(J, { color: n === "enabled" ? "green" : "red", children: n === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (n, V) => /* @__PURE__ */ e.jsx(he, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(Ze, {}),
          onClick: async () => be(V.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => _e(V.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(Je, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => re(V.config),
          disabled: !V.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(pe, {}),
          onClick: async () => Ie(V)
        },
        {
          key: "toggleStatus",
          icon: V.status === "enabled" ? /* @__PURE__ */ e.jsx(We, {}) : /* @__PURE__ */ e.jsx(Oe, {}),
          onClick: async () => de(V),
          permission: "system:toolsets:update",
          tooltip: V.status === "enabled" ? a("disable", { defaultValue: "Disable" }) : a("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(ge, {}),
          permission: "system:toolsets:delete",
          tooltip: a("delete", { defaultValue: "Delete" }),
          onClick: async () => ie(V.id),
          danger: !0,
          confirm: {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => ie(V.id),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(W, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ce, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsx(
        m.Search,
        {
          placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
          style: { width: 300 },
          value: b,
          onChange: (n) => x(n.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(se, {}),
            onClick: p,
            loading: N,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(te, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(fe, {}),
            onClick: Se,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(W, { children: /* @__PURE__ */ e.jsx(
      oe,
      {
        columns: D,
        dataSource: (E == null ? void 0 : E.data) || [],
        loading: N,
        rowKey: "id",
        pagination: {
          total: (E == null ? void 0 : E.total) || 0,
          current: (E == null ? void 0 : E.current) || 1,
          pageSize: (E == null ? void 0 : E.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (n, V) => t("common.pagination.total", {
            defaultValue: `${V[0]}-${V[1]} of ${n} items`,
            start: V[0],
            end: V[1],
            total: n
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Z,
      {
        title: f ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: j,
        onCancel: () => {
          g(!1), s.resetFields(), _(null), z("");
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: s,
            layout: "vertical",
            onFinish: we,
            onValuesChange: (n, V) => H(V),
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(m, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: t("settings.toolsets.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Ft,
                    {
                      rows: 3,
                      placeholder: t("settings.toolsets.descriptionPlaceholder", { defaultValue: "Enter toolset description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "type",
                  label: t("settings.toolsets.type", { defaultValue: "Type" }),
                  rules: [{ required: !0, message: t("settings.toolsets.typeRequired", { defaultValue: "Please select type" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    L,
                    {
                      loading: P,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: Ce,
                      value: F,
                      options: U == null ? void 0 : U.map((n) => ({
                        label: n.name,
                        value: n.tool_set_type
                      }))
                    }
                  )
                }
              ),
              (X = h == null ? void 0 : h.config_fields) == null ? void 0 : X.map((n) => /* @__PURE__ */ e.jsx(
                et,
                {
                  field: n,
                  selectedType: F,
                  dependentValues: r(n),
                  formValues: I
                },
                n.name
              )),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: d || xe,
                    children: f ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    onClick: () => {
                      g(!1), s.resetFields(), _(null), z("");
                    },
                    children: a("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      Z,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: i,
        onCancel: () => o(!1),
        footer: [
          /* @__PURE__ */ e.jsx(w, { onClick: () => o(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(c, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Z,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: y,
        onCancel: () => k(!1),
        footer: [
          /* @__PURE__ */ e.jsx(w, { onClick: () => k(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: je ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(se, { style: { fontSize: 24 }, spin: !0 }) }) : q.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : q.map((n, V) => {
          var O, A, B;
          return /* @__PURE__ */ e.jsx(
            W,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(Ee, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((O = n.function) == null ? void 0 : O.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(ce, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(ee, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((A = n.function) == null ? void 0 : A.description) || "-" })
                ] }),
                ((B = n.function) == null ? void 0 : B.parameters) && /* @__PURE__ */ e.jsxs(ee, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(n.function.parameters, null, 2) })
                ] })
              ] })
            },
            V
          );
        }) })
      }
    )
  ] });
}, { TextArea: Tt } = m, At = () => {
  const t = Ae(), { t: a } = M("system"), { t: s } = M("common"), [j] = l.useForm(), [g, f] = v(!1), [_, b] = v(null), [x, i] = v(""), [o, c] = v(1), [R, F] = v(10), { loading: z, data: y, refresh: k } = S(
    () => nt({ current: o, page_size: R, search: x }),
    {
      refreshDeps: [o, R, x],
      onError: (d) => {
        u.error(a("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", d);
      }
    }
  ), { loading: q, run: C } = S(
    (d) => it(d),
    {
      manual: !0,
      onSuccess: () => {
        u.success(a("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), f(!1), j.resetFields(), b(null), k();
      },
      onError: (d) => {
        u.error((d == null ? void 0 : d.err) || a("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: I, run: H } = S(
    ({ id: d, ...$ }) => ot({ id: d }, $),
    {
      manual: !0,
      onSuccess: () => {
        u.success(a("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), f(!1), j.resetFields(), b(null), k();
      },
      onError: (d) => {
        u.error((d == null ? void 0 : d.err) || a("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: N } = S(
    (d) => rt({ id: d }),
    {
      manual: !0,
      onSuccess: () => {
        u.success(a("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), k();
      },
      onError: (d) => {
        u.error((d == null ? void 0 : d.err) || a("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), E = () => {
    b(null), j.resetFields(), j.setFieldsValue({ status: "active" }), f(!0);
  }, p = (d) => {
    b(d), j.setFieldsValue({
      name: d.name,
      description: d.description,
      status: d.status
    }), f(!0);
  }, P = (d) => {
    Z.confirm({
      title: a("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: a("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${d.name}"? This action cannot be undone.`
      }),
      onOk: () => N(d.id)
    });
  }, U = () => {
    j.validateFields().then((d) => {
      _ ? H({ id: _.id, ...d }) : C(d);
    });
  }, h = [
    {
      title: a("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: a("settings.organizations.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: a("settings.organizations.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (d) => /* @__PURE__ */ e.jsx(J, { color: d === "active" ? "green" : "default", children: d === "active" ? a("settings.organizations.active", { defaultValue: "Active" }) : a("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (d, $) => /* @__PURE__ */ e.jsx(
        he,
        {
          actions: [
            {
              key: "view",
              label: s("view", { defaultValue: "View" }),
              icon: /* @__PURE__ */ e.jsx(Qe, {}),
              onClick: async () => t(`/system/settings/organizations/${$.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              label: s("edit", { defaultValue: "Edit" }),
              icon: /* @__PURE__ */ e.jsx(pe, {}),
              onClick: async () => p($),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              label: s("delete", { defaultValue: "Delete" }),
              icon: /* @__PURE__ */ e.jsx(ge, {}),
              danger: !0,
              onClick: async () => P($),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    W,
    {
      title: a("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(se, {}), onClick: k, children: s("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(te, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(fe, {}), onClick: E, children: a("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            m.Search,
            {
              placeholder: a("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (d) => {
                i(d), c(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            oe,
            {
              columns: h,
              dataSource: (y == null ? void 0 : y.data) || [],
              loading: z,
              rowKey: "id",
              pagination: {
                current: o,
                pageSize: R,
                total: (y == null ? void 0 : y.total) || 0,
                showSizeChanger: !0,
                showTotal: (d) => s("pagination.total", { defaultValue: `Total ${d} items` }),
                onChange: (d, $) => {
                  c(d), F($);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          Z,
          {
            title: _ ? a("settings.organizations.edit", { defaultValue: "Edit Organization" }) : a("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: g,
            onOk: U,
            onCancel: () => {
              f(!1), j.resetFields(), b(null);
            },
            confirmLoading: q || I,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(l, { form: j, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: a("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: a("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(m, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: a("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Tt, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "status",
                  label: a("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(L, { children: [
                    /* @__PURE__ */ e.jsx(L.Option, { value: "active", children: a("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(L.Option, { value: "disabled", children: a("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, zt = ({
  transformItems: t = (a) => a
}) => {
  const { t: a } = M("system"), s = Ae(), j = st(), _ = j.hash.replace("#", "") || "base", { enableMultiOrg: b } = gt(), { hasPermission: x } = ft(), i = [
    {
      key: "base",
      label: a("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(St, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "security",
      label: a("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(bt, {}),
      hidden: !x("system:security:update")
    },
    {
      key: "oauth",
      label: a("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Vt, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "ldap",
      label: a("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(_t, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "smtp",
      label: a("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(vt, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "ai-models",
      label: a("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(wt, {}),
      hidden: !x("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: a("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(kt, {}),
      hidden: !x("system:toolsets:view")
    },
    // Only show organization tab if multi-org is enabled
    ...b ? [{
      key: "organizations",
      label: a("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(At, {}),
      hidden: !x("system:organization:view")
    }] : []
  ];
  return console.log(i, x("system:settings:update")), /* @__PURE__ */ e.jsx(W, { title: a("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Ue,
    {
      defaultActiveKey: _,
      onChange: (o) => {
        s(`${j.pathname}#${o}`);
      },
      items: t(i.filter((o) => !o.hidden))
    }
  ) });
}, Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zt
}, Symbol.toStringTag, { value: "Module" })), Et = () => {
  var ie, re, de;
  const t = Ae(), { id: a } = lt(), { t: s } = M("system"), { t: j } = M("common"), [g] = l.useForm(), [f] = l.useForm(), [_, b] = v(!1), [x, i] = v(!1), [o, c] = v(null), [R, F] = v(""), [z, y] = v(1), [k, q] = v(10), { data: C, loading: I, refresh: H } = S(
    () => dt({ id: a }),
    {
      ready: !!a,
      onError: (r) => {
        u.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", r);
      }
    }
  ), { data: N, loading: E, refresh: p } = S(
    () => ut({ id: a, current: z, page_size: k, search: R }),
    {
      ready: !!a,
      refreshDeps: [a, z, k, R],
      onError: (r) => {
        u.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", r);
      }
    }
  ), { data: P, loading: U } = S(
    () => ht({ current: 1, page_size: 1e3 }),
    {
      ready: _
    }
  ), { data: h, loading: d } = S(
    () => xt({ organization_id: a, current: 1, page_size: 1e3 }),
    {
      ready: !!a
    }
  ), { loading: $, run: xe } = S(
    (r) => ct({ id: a }, r),
    {
      manual: !0,
      onSuccess: () => {
        u.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), b(!1), g.resetFields(), p();
      },
      onError: (r) => {
        u.error((r == null ? void 0 : r.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: ye, run: Ve } = S(
    (r) => mt({ id: a, user_id: o == null ? void 0 : o.id }, r),
    {
      manual: !0,
      onSuccess: () => {
        u.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), i(!1), f.resetFields(), c(null), p();
      },
      onError: (r) => {
        u.error((r == null ? void 0 : r.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: be } = S(
    (r) => pt({ id: a, user_id: r }),
    {
      manual: !0,
      onSuccess: () => {
        u.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), p();
      },
      onError: (r) => {
        u.error((r == null ? void 0 : r.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), je = () => {
    b(!0), g.resetFields();
  }, _e = (r) => {
    var D;
    c(r), f.setFieldsValue({
      role_ids: ((D = r.organization_roles) == null ? void 0 : D.map((X) => X.id)) || []
    }), i(!0);
  }, ve = (r) => {
    Z.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${r.full_name || r.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => be(r.id)
    });
  }, Se = () => {
    g.validateFields().then((r) => {
      xe(r);
    });
  }, Ie = () => {
    f.validateFields().then((r) => {
      Ve(r);
    });
  }, Ce = ((ie = P == null ? void 0 : P.data) == null ? void 0 : ie.filter((r) => {
    var D;
    return !((D = N == null ? void 0 : N.data) != null && D.some((X) => X.id === r.id));
  })) || [], we = [
    {
      title: s("settings.organizations.users.username", { defaultValue: "Username" }),
      dataIndex: "username",
      key: "username"
    },
    {
      title: s("settings.organizations.users.email", { defaultValue: "Email" }),
      dataIndex: "email",
      key: "email"
    },
    {
      title: s("settings.organizations.users.fullName", { defaultValue: "Full Name" }),
      dataIndex: "full_name",
      key: "full_name"
    },
    {
      title: s("settings.organizations.users.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (r) => /* @__PURE__ */ e.jsx(J, { color: r === "active" ? "green" : "default", children: r === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : r })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (r, D) => {
        var X;
        return /* @__PURE__ */ e.jsx(K, { wrap: !0, children: ((X = D.organization_roles) == null ? void 0 : X.map((n) => /* @__PURE__ */ e.jsx(J, { children: n.name }, n.id))) || /* @__PURE__ */ e.jsx(J, { children: "No roles" }) });
      }
    },
    {
      title: j("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (r, D) => /* @__PURE__ */ e.jsx(
        he,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(pe, {}),
              onClick: async () => _e(D)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(ge, {}),
              danger: !0,
              onClick: async () => ve(D)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              icon: /* @__PURE__ */ e.jsx(Xe, {}),
              onClick: () => t("/system/settings#organizations"),
              children: j("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            C == null ? void 0 : C.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(se, {}), onClick: () => {
          H(), p();
        }, children: j("refresh", { defaultValue: "Refresh" }) }),
        loading: I,
        children: /* @__PURE__ */ e.jsxs(Q, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(Q.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: C == null ? void 0 : C.name }),
          /* @__PURE__ */ e.jsx(Q.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(J, { color: (C == null ? void 0 : C.status) === "active" ? "green" : "default", children: (C == null ? void 0 : C.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(Q.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (C == null ? void 0 : C.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(fe, {}), onClick: je, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            m.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (r) => {
                F(r), y(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            oe,
            {
              columns: we,
              dataSource: (N == null ? void 0 : N.data) || [],
              loading: E,
              rowKey: "id",
              pagination: {
                current: z,
                pageSize: k,
                total: (N == null ? void 0 : N.total) || 0,
                showSizeChanger: !0,
                showTotal: (r) => j("pagination.total", { defaultValue: `Total ${r} items` }),
                onChange: (r, D) => {
                  y(r), q(D);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Z,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: _,
        onOk: Se,
        onCancel: () => {
          b(!1), g.resetFields();
        },
        confirmLoading: $,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(l, { form: g, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "user_id",
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: s("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                L,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: U,
                  filterOption: (r, D) => ((D == null ? void 0 : D.label) ?? "").toLowerCase().includes(r.toLowerCase()),
                  options: Ce.map((r) => ({
                    label: `${r.full_name || r.username} (${r.email})`,
                    value: r.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "role_ids",
              label: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                L,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: d,
                  options: ((re = h == null ? void 0 : h.data) == null ? void 0 : re.map((r) => ({
                    label: r.name,
                    value: r.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Z,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: x,
        onOk: Ie,
        onCancel: () => {
          i(!1), f.resetFields(), c(null);
        },
        confirmLoading: ye,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(l, { form: f, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                m,
                {
                  value: (o == null ? void 0 : o.full_name) || (o == null ? void 0 : o.username),
                  disabled: !0
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "role_ids",
              label: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                L,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: d,
                  options: ((de = h == null ? void 0 : h.data) == null ? void 0 : de.map((r) => ({
                    label: r.name,
                    value: r.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Et
}, Symbol.toStringTag, { value: "Module" })), Pt = () => {
  const { t } = M("system"), [a] = at(), s = a.get("provider"), j = a.get("code"), g = a.get("state"), [f, _] = v(null), [b, x] = v(null), [i, o] = v(null);
  return S(async () => {
    if (!j || !g || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const c = await T.system.testOauthCallback({ code: j, state: g, provider: s });
    if (!c.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!c.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    _(c.user), x(c.user_info);
  }, {
    onSuccess: () => {
      o({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (c) => {
      o({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: c.message
      });
    }
  }), i ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    De,
    {
      status: i.status,
      title: i.message,
      subTitle: i.error,
      extra: /* @__PURE__ */ e.jsxs(K, { style: { display: !b || !f ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(W, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Re, { src: b || {} }) }),
        /* @__PURE__ */ e.jsx(W, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Re, { src: f || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(tt, {});
}, Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pt
}, Symbol.toStringTag, { value: "Module" }));
export {
  Qt as O,
  Xt as a,
  Wt as i
};
