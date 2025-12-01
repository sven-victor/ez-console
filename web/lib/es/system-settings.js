import { j as e } from "./vendor.js";
import { Form as l, message as m, Spin as me, Switch as J, Select as q, Input as f, Divider as Te, Alert as Me, Space as K, Button as z, InputNumber as ae, Modal as Q, Skeleton as Ne, Descriptions as te, Steps as De, Tag as Y, Table as xe, Radio as be, Tabs as Ue, Tooltip as $e, Card as ee, Row as we, Col as ce, Result as Be } from "antd";
import { useTranslation as M } from "react-i18next";
import { useState as v, useEffect as je, useMemo as Le } from "react";
import { useRequest as S } from "ahooks";
import { SaveOutlined as ke, ReloadOutlined as ie, LoadingOutlined as He, CheckCircleTwoTone as Ke, StarFilled as Ge, CheckCircleOutlined as Oe, StarOutlined as Ze, EditOutlined as _e, DeleteOutlined as ve, PlusOutlined as Se, ThunderboltOutlined as Je, ToolOutlined as Ee, SettingOutlined as We, LockOutlined as Qe, EyeOutlined as Xe, ArrowLeftOutlined as Ye } from "@ant-design/icons";
import { a as A } from "./index.js";
import { g as Re } from "./base.js";
import { j as ne, i as et, e as Ce, p as qe, L as tt } from "./components.js";
import Fe from "react-quill";
import { useNavigate as Ae, useLocation as st, useParams as lt, useSearchParams as at } from "react-router-dom";
import { l as nt, c as it, u as ot, d as rt, g as dt, b as ut, e as ct, f as mt, r as pt } from "./system.js";
import { b as gt, a as ft } from "./contexts.js";
import { l as ht, b as xt } from "./authorization.js";
import Pe from "react-json-view";
const ue = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Vt = {
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
}, yt = ({ initialData: t, onRefresh: a }) => {
  const { t: s } = M("system"), { t: j } = M("common"), [p] = l.useForm(), [h, _] = v((t == null ? void 0 : t.provider) || "custom"), [b, V] = v((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [i, d] = v((t == null ? void 0 : t.enabled) || !1), [g, P] = v((t == null ? void 0 : t.auto_create_user) || !1), { loading: E, data: F, refresh: c } = S(A.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (x) => {
      p.setFieldsValue(x), _(x.provider), V(x.provider === "custom" || x.provider === "autoDiscover"), d(x.enabled), P(x.auto_create_user);
    },
    onError: (x) => {
      m.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", x);
    }
  });
  je(() => {
    t && (p.setFieldsValue(t), _(t.provider), V(t.provider === "custom" || t.provider === "autoDiscover"), d(t.enabled), P(t.auto_create_user));
  }, [t, p]);
  const w = (x) => {
    _(x), V(x === "custom" || x === "autoDiscover");
    const r = Vt[x];
    r && p.setFieldsValue({
      auth_endpoint: r.endpoints.auth_endpoint,
      token_endpoint: r.endpoints.token_endpoint,
      userinfo_endpoint: r.endpoints.userinfo_endpoint,
      scope: r.scope,
      // Set field mappings
      email_field: r.email_field,
      username_field: r.username_field,
      full_name_field: r.full_name_field,
      avatar_field: r.avatar_field,
      role_field: r.role_field,
      // Set display configuration
      icon_url: r.icon_url,
      display_name: r.display_name
    });
  }, T = (x) => {
    d(x);
  }, I = (x) => {
    P(x);
  }, { loading: C, run: G } = S(A.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      m.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), a ? a() : c();
    },
    onError: (x) => {
      m.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", x);
    }
  }), N = (x) => {
    G(x);
  }, L = () => {
    a ? a() : c();
  }, { loading: B, run: X } = S(async ({ redirect_uri: x, ...r }) => {
    let D;
    return x ? D = new URL(x) : D = new URL(window.location.origin), D.pathname = Re("/system/settings/oauth/test-callback"), D.searchParams.set("provider", h), A.system.testOauthConnection({ redirect_uri: D.toString(), ...r });
  }, {
    manual: !0,
    onSuccess: ({ url: x }) => {
      window.open(x, "_blank");
    },
    onError: (x) => {
      m.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: x.message })), console.error("Failed to test OAuth connection", x);
    }
  }), U = () => h === "custom";
  return /* @__PURE__ */ e.jsx(me, { spinning: E, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: p,
      layout: "vertical",
      onFinish: N,
      initialValues: t || F,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(J, { onChange: T })
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
            children: /* @__PURE__ */ e.jsxs(q, { onChange: w, disabled: !i, children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "github", children: s("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "google", children: s("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "dingtalk", children: s("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "wechat", children: s("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "autoDiscover", children: s("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "custom", children: s("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
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
              f,
              {
                disabled: !i,
                placeholder: h !== "custom" ? s(`settings.oauth.provider.options.${h}`, { defaultValue: h }) : ""
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
                pattern: ue,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(f, { disabled: !i, placeholder: "https://example.com/icon.png" })
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
            children: /* @__PURE__ */ e.jsx(f, { disabled: !i })
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
            children: /* @__PURE__ */ e.jsx(f.Password, { disabled: !i, autoComplete: "off", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
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
                required: i && h === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: ue,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(f, { disabled: !i })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "wellknown_endpoint",
            hidden: h !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: ue,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: i && h === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(f, { disabled: !i })
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
                required: i && h === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: ue,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(f, { disabled: !i })
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
                required: i && h === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: ue,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(f, { disabled: !i })
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
            children: /* @__PURE__ */ e.jsx(f, { disabled: !i })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(x) => x.getFieldValue("redirect_uri") !== "" ? {
              pattern: ue,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(f, { disabled: !i, placeholder: `http://${window.location.host}${Re(`/login?provider=settings.${h}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(J, { onChange: I, disabled: !i })
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
                required: i && g,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(f, { disabled: !i || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(J, { disabled: !i })
          }
        ),
        /* @__PURE__ */ e.jsx(Te, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Me,
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
            children: /* @__PURE__ */ e.jsx(f, { placeholder: "email", disabled: !i || !b })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(f, { placeholder: "login", autoComplete: "off", disabled: !i || !b })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(f, { placeholder: "name", disabled: !i || !b })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(f, { placeholder: "avatar_url", disabled: !i || !b })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(f, { placeholder: "role", disabled: !i || !b })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              type: "primary",
              htmlType: "submit",
              loading: C,
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              children: j("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              loading: B,
              onClick: async () => {
                const x = p.getFieldsValue();
                X(x);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              onClick: L,
              icon: /* @__PURE__ */ e.jsx(ie, {}),
              children: j("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, bt = () => {
  const { t } = M("system"), { t: a } = M("common"), [s] = l.useForm(), { loading: j, data: p, refresh: h } = S(A.system.getSecuritySettings, {
    onSuccess: (i) => {
      s.setFieldsValue(i);
    },
    onError: (i) => {
      m.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", i);
    }
  }), { loading: _, run: b } = S(A.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      m.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), h();
    },
    onError: (i) => {
      m.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", i);
    }
  }), V = (i) => {
    b(i);
  };
  return /* @__PURE__ */ e.jsx(me, { spinning: j, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: s,
      layout: "vertical",
      onFinish: V,
      initialValues: p,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(J, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_complexity",
            label: t("settings.security.passwordComplexity.label", { defaultValue: "Password Complexity" }),
            tooltip: t("settings.security.passwordComplexity.tooltip", { defaultValue: "Define the complexity requirements for user passwords." }),
            children: /* @__PURE__ */ e.jsxs(q, { children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
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
            children: /* @__PURE__ */ e.jsx(ae, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(ae, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(J, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (i, d) => i.login_failure_lock !== d.login_failure_lock,
            children: ({ getFieldValue: i }) => i("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(ae, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (i, d) => i.login_failure_lock !== d.login_failure_lock,
            children: ({ getFieldValue: i }) => i("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(ae, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            children: /* @__PURE__ */ e.jsx(J, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (i, d) => i.history_password_check !== d.history_password_check,
            children: ({ getFieldValue: i }) => i("history_password_check") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(ae, { min: 1, max: 10, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(ae, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ae, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ae, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              type: "primary",
              htmlType: "submit",
              loading: _,
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              onClick: () => h(),
              icon: /* @__PURE__ */ e.jsx(ie, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, jt = ({ fetchItems: t, importItems: a, columns: s, ...j }) => {
  const { t: p } = M("system"), [h, _] = v([]), [b, V] = v([]), { run: i, loading: d } = S(t, {
    onError: (E) => {
      m.error(p("settings.ldap.importError", { error: `${E.message}` }));
    },
    onSuccess: (E) => {
      _(E);
    },
    manual: !0
  }), { run: g, loading: P } = S(async () => {
    for (const E of b.filter((F) => {
      const c = h.find((w) => w.ldap_dn === F);
      return !(!c || c.status === "imported");
    })) {
      const F = await a([E]);
      _((c) => [...c].map((T) => {
        for (const I of F)
          if (T.ldap_dn === I.ldap_dn)
            return { ...I, status: "imported" };
        return T;
      }));
    }
  }, {
    manual: !0
  });
  return je(() => {
    j.visible && (_([]), i(), V([]));
  }, [j.visible]), /* @__PURE__ */ e.jsx(
    Q,
    {
      title: p("settings.ldap.importTitle"),
      ...j,
      onOk: () => {
        g();
      },
      width: 900,
      confirmLoading: P,
      loading: d,
      children: /* @__PURE__ */ e.jsx(
        xe,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (E) => {
              V(E);
            },
            getCheckboxProps: (E) => ({
              disabled: E.status === "imported"
            })
          },
          columns: s.map(({ render: E, ...F }) => E ? {
            ...F,
            render: (c, w, T) => {
              const I = b.includes(w.ldap_dn) && P && w.status !== "imported";
              return E(c, w, T, I);
            }
          } : F),
          dataSource: h,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, _t = () => {
  var w, T, I;
  const { t } = M("system"), [a] = l.useForm(), [s, j] = v(!1), [p, h] = v(null), [_, b] = v(!1), [V, i] = v(!1), [d] = l.useForm(), [g, P] = v(!1);
  S(A.system.getLdapSettings, {
    onSuccess: (C) => {
      a.setFieldsValue(C), P(C.enabled);
    },
    onError: (C) => {
      m.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${C.message}` }));
    }
  }), je(() => {
    h(null);
  }, [_]);
  const E = async (C) => {
    j(!0);
    try {
      await A.system.updateLdapSettings(C), m.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      m.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      j(!1);
    }
  }, { run: F, loading: c } = S(async (C) => {
    const G = await a.validateFields();
    return await A.system.testLdapConnection({
      ...C,
      ...G
    });
  }, {
    onSuccess: (C) => {
      h(C);
    },
    onError: (C) => {
      m.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${C.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      l,
      {
        form: a,
        layout: "vertical",
        onFinish: E,
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
              children: /* @__PURE__ */ e.jsx(J, { onChange: (C) => P(C) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: g, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(f, { disabled: !g, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: g, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(f, { disabled: !g, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: g, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(f.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: g, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(f, { disabled: !g, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(f, { disabled: !g, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: g, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(f, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: g, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(f, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: g, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(f, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: g, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(f, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(f, { type: "number", defaultValue: 15, disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(Te, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(J, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(J, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(f.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(f.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(f.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(ne, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(z, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ne, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              z,
              {
                disabled: !g,
                style: { marginLeft: 8 },
                onClick: () => b(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ne, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              z,
              {
                disabled: !g,
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
      Q,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: _,
        onCancel: () => b(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            l,
            {
              form: d,
              layout: "vertical",
              onFinish: F,
              children: [
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(f, { disabled: !g })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(f.Password, { disabled: !g })
                  }
                ),
                /* @__PURE__ */ e.jsxs(l.Item, { children: [
                  /* @__PURE__ */ e.jsx(ne, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(z, { disabled: !g, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    z,
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
          /* @__PURE__ */ e.jsx(me, { spinning: c, children: /* @__PURE__ */ e.jsx(Ne, { active: c, loading: c, children: p && (p.user ? /* @__PURE__ */ e.jsxs(te, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(te.Item, { label: "Username", span: 3, children: p.user.username }),
            /* @__PURE__ */ e.jsx(te.Item, { label: "Email", span: 3, children: p.user.email }),
            /* @__PURE__ */ e.jsx(te.Item, { label: "FullName", span: 3, children: p.user.full_name }),
            /* @__PURE__ */ e.jsx(te.Item, { label: "CreatedAt", span: 3, children: p.user.created_at }),
            /* @__PURE__ */ e.jsx(te.Item, { label: "UpdatedAt", span: 3, children: p.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            De,
            {
              direction: "vertical",
              current: (w = p.message) == null ? void 0 : w.findIndex((C) => !C.success),
              status: (T = p.message) != null && T.find((C) => !C.success) ? "error" : "finish",
              items: (I = p.message) == null ? void 0 : I.map((C) => ({
                status: C.success ? "finish" : "error",
                title: C.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      jt,
      {
        visible: V,
        onCancel: () => i(!1),
        fetchItems: () => A.system.importLdapUsers({}),
        importItems: (C) => A.system.importLdapUsers({ user_dn: C }),
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
          render: (C, G, N, L) => L ? /* @__PURE__ */ e.jsx(me, { indicator: /* @__PURE__ */ e.jsx(He, { spin: !0 }) }) : C ? /* @__PURE__ */ e.jsx(Ke, { twoToneColor: "#52c41a" }) : G.id ? /* @__PURE__ */ e.jsx(Y, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(Y, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, vt = () => {
  const { t } = M("system"), { t: a } = M("common"), [s] = l.useForm(), [j, p] = v(null), [h, _] = v(!1), [b] = l.useForm(), [V, i] = v(!1), { loading: d } = S(A.system.getSmtpSettings, {
    onSuccess: (c) => {
      s.setFieldsValue(c), i(c.enabled);
    },
    onError: (c) => {
      m.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${c.message}` }));
    }
  });
  je(() => {
    p(null);
  }, [h]);
  const { run: g, loading: P } = S(({ port: c, ...w }) => A.system.updateSmtpSettings({ ...w, port: Number(c) }), {
    manual: !0,
    onSuccess: () => {
      m.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (c) => {
      m.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${c.message}` }));
    }
  }), { run: E, loading: F } = S(async (c) => {
    const { port: w, ...T } = await s.validateFields();
    return await A.system.testSmtpConnection({
      ...c,
      ...T,
      port: Number(w)
    });
  }, {
    onSuccess: (c) => {
      p(c);
    },
    onError: (c) => {
      m.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${c.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(me, { spinning: d, children: /* @__PURE__ */ e.jsxs(
      l,
      {
        form: s,
        layout: "vertical",
        onFinish: g,
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
              children: /* @__PURE__ */ e.jsx(J, { onChange: (c) => i(c) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: V, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(f, { disabled: !V, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: V, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(f, { type: "number", disabled: !V, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: V, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(f, { disabled: !V, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(f.Password, { disabled: !V, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: V, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(be.Group, { disabled: !V, children: [
                /* @__PURE__ */ e.jsx(be.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(be.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(be.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: V, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(f, { disabled: !V, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(f, { disabled: !V, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(Te, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
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
            /* @__PURE__ */ e.jsx(ne, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(z, { type: "primary", htmlType: "submit", loading: P, style: { marginRight: 8 }, children: a("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              z,
              {
                onClick: () => _(!0),
                disabled: !V || F,
                loading: F,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: h,
        onCancel: () => _(!1),
        footer: [
          /* @__PURE__ */ e.jsx(z, { onClick: () => _(!1), children: a("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(z, { type: "primary", loading: F, onClick: () => b.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: b,
            layout: "vertical",
            onFinish: (c) => E(c),
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
                  children: /* @__PURE__ */ e.jsx(f, { placeholder: "test@example.com" })
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
  const { t, i18n: a } = M("system"), { t: s } = M("common"), [j] = l.useForm(), { loading: p, data: h, refresh: _ } = S(A.system.getSystemBaseSettings, {
    onSuccess: (d) => {
      j.setFieldsValue(d);
    },
    onError: (d) => {
      m.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", d);
    }
  }), { loading: b, run: V } = S(A.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      m.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), _();
    },
    onError: (d) => {
      m.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", d);
    }
  }), i = (d) => {
    V(d);
  };
  return /* @__PURE__ */ e.jsx(me, { spinning: p, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: j,
      layout: "vertical",
      onFinish: i,
      initialValues: h,
      children: [
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Ue, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: "name", children: /* @__PURE__ */ e.jsx(f, {}) }) })
        }, ...et.map((d) => ({
          key: d.lang,
          label: a.language !== d.lang ? s(`language.${d.lang}`, { defaultValue: d.label, lang: d.label }) : d.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: ["name_i18n", d.lang], children: /* @__PURE__ */ e.jsx(f, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(f, {}) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(f, {}) }),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(J, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(J, {})
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              type: "primary",
              htmlType: "submit",
              loading: b,
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              onClick: () => _(),
              icon: /* @__PURE__ */ e.jsx(ie, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: Ct } = f, It = () => {
  var oe;
  const { t } = M("ai"), { t: a } = M("common"), [s] = l.useForm(), [j, p] = v(!1), [h, _] = v(null), [b, V] = v(""), [i, d] = v(""), [g, P] = v({}), { loading: E, data: F } = S(
    () => A.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (o) => {
        m.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", o);
      }
    }
  ), c = Le(() => F == null ? void 0 : F.find((o) => o.provider === i), [F, i]), { loading: w, data: T, refresh: I } = S(
    () => A.ai.listAiModels({ current: 1, page_size: 100, search: b }),
    {
      refreshDeps: [b],
      onError: (o) => {
        m.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", o);
      }
    }
  ), { loading: C, run: G } = S(
    ({ config: o, ...k }) => A.ai.createAiModel({ config: o ?? {}, ...k }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), p(!1), s.resetFields(), I();
      },
      onError: (o) => {
        m.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", o);
      }
    }
  ), { loading: N, run: L } = S(
    ({ id: o, data: k }) => A.ai.updateAiModel({ id: o }, k),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), p(!1), s.resetFields(), _(null), I();
      },
      onError: (o) => {
        m.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", o);
      }
    }
  ), { runAsync: B } = S(
    (o) => A.ai.deleteAiModel({ id: o }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), I();
      },
      onError: (o) => {
        m.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", o);
      }
    }
  ), { runAsync: X } = S(
    (o) => A.ai.testAiModel({ id: o }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (o) => {
        m.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", o);
      }
    }
  ), { runAsync: U } = S(
    (o) => A.ai.setDefaultAiModel({ id: o }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), I();
      },
      onError: (o) => {
        m.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", o);
      }
    }
  ), x = () => {
    _(null), d(""), P({}), s.resetFields(), p(!0);
  }, r = (o) => {
    _(o), d(o.provider);
    const k = o.config || {}, Z = {
      name: o.name,
      description: o.description,
      provider: o.provider,
      is_default: o.is_default,
      config: k
      // Spread config fields to form
    };
    c != null && c.config_fields && c.config_fields.forEach((W) => {
      W.type === "password" && (Z[W.name] = "");
    }), P(Z), s.setFieldsValue(Z), p(!0);
  }, D = (o) => {
    d(o), c != null && c.config_fields && c.config_fields.forEach((k) => {
      s.setFieldValue(k.name, void 0);
    });
  }, pe = (o) => {
    const k = {};
    c != null && c.config_fields && c.config_fields.forEach((W) => {
      var re;
      const le = (re = o.config) == null ? void 0 : re[W.name];
      le != null && le !== "" && (k[W.name] = le);
    });
    const Z = {
      name: o.name,
      description: o.description,
      provider: o.provider,
      config: k,
      is_default: o.is_default
    };
    h ? L({ id: h.id, data: Z }) : G(Z);
  }, ge = (o) => {
    var Z;
    if (!((Z = o.data_source) != null && Z.depends_on))
      return {};
    const k = {};
    return o.data_source.depends_on.forEach((W) => {
      k[W] = g[W];
    }), k;
  }, fe = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (o, k) => /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx("span", { children: o }),
        k.is_default && /* @__PURE__ */ e.jsx($e, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Ge, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (o) => /* @__PURE__ */ e.jsx(Y, { color: "blue", children: o.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (o) => /* @__PURE__ */ e.jsx(Y, { color: o === "enabled" ? "green" : "red", children: o === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (o, k) => /* @__PURE__ */ e.jsx(Ce, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => X(k.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(Ze, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => U(k.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(_e, {}),
          tooltip: a("edit", { defaultValue: "Edit" }),
          onClick: async () => r(k)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          tooltip: a("delete", { defaultValue: "Delete" }),
          onClick: async () => B(k.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ee, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(we, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsx(
        f.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: b,
          onChange: (o) => V(o.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          z,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ie, {}),
            onClick: I,
            loading: w,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ne, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          z,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Se, {}),
            onClick: x,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsx(
      xe,
      {
        columns: fe,
        dataSource: (T == null ? void 0 : T.data) || [],
        loading: w,
        rowKey: "id",
        pagination: {
          total: (T == null ? void 0 : T.total) || 0,
          current: (T == null ? void 0 : T.current) || 1,
          pageSize: (T == null ? void 0 : T.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (o, k) => t("common.pagination.total", {
            defaultValue: `${k[0]}-${k[1]} of ${o} items`,
            start: k[0],
            end: k[1],
            total: o
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: h ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: j,
        onCancel: () => {
          p(!1), s.resetFields(), _(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: s,
            layout: "vertical",
            onFinish: pe,
            onValuesChange: (o, k) => P(k),
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(f, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Ct,
                    {
                      rows: 3,
                      placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "provider",
                  label: t("models.provider", { defaultValue: "Provider" }),
                  rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    q,
                    {
                      loading: E,
                      placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                      onChange: D,
                      value: i,
                      options: F == null ? void 0 : F.map((o) => ({
                        label: o.name,
                        value: o.provider
                      }))
                    }
                  )
                }
              ),
              (oe = c == null ? void 0 : c.config_fields) == null ? void 0 : oe.map((o) => /* @__PURE__ */ e.jsx(
                qe,
                {
                  field: o,
                  selectedType: i,
                  dependentValues: ge(o),
                  formValues: g
                },
                o.name
              )),
              /* @__PURE__ */ e.jsxs(
                l.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(J, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: C || N,
                    children: h ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    onClick: () => {
                      p(!1), s.resetFields(), _(null), d(""), P({});
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
}, { TextArea: Ft } = f, wt = () => {
  var se;
  const { t } = M("system"), { t: a } = M("common"), [s] = l.useForm(), [j, p] = v(!1), [h, _] = v(null), [b, V] = v(""), [i, d] = v(!1), [g, P] = v(null), [E, F] = v(""), [c, w] = v(!1), [T, I] = v([]), [C, G] = v({}), { loading: N, data: L, refresh: B } = S(
    () => A.system.listToolSets({ current: 1, page_size: 100, search: b }),
    {
      refreshDeps: [b],
      onError: (n) => {
        m.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", n);
      }
    }
  ), { loading: X, data: U } = S(
    () => A.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (n) => {
        m.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", n);
      }
    }
  ), x = Le(() => U == null ? void 0 : U.find((n) => n.tool_set_type === E), [U, E]), { loading: r, run: D } = S(
    (n) => A.system.createToolSet({
      ...n,
      type: n.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), p(!1), s.resetFields(), B();
      },
      onError: (n) => {
        m.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", n);
      }
    }
  ), { loading: pe, run: ge } = S(
    ({ id: n, data: y }) => A.system.updateToolSet({ id: n }, {
      ...y,
      type: y.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), p(!1), s.resetFields(), _(null), B();
      },
      onError: (n) => {
        m.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", n);
      }
    }
  ), { run: fe } = S(
    (n) => A.system.deleteToolSet({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), B();
      },
      onError: (n) => {
        m.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", n);
      }
    }
  ), { runAsync: oe } = S(
    (n) => A.system.testToolSet({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (n) => {
        m.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", n);
      }
    }
  ), { loading: o, runAsync: k } = S(
    (n) => A.system.getToolSetTools({ id: n }),
    {
      manual: !0,
      onSuccess: (n) => {
        I(n || []), w(!0);
      },
      onError: (n) => {
        m.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", n);
      }
    }
  ), { runAsync: Z } = S(
    ({ id: n, status: y }) => A.system.updateToolSetStatus({ id: n }, { status: y }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), B();
      },
      onError: (n) => {
        m.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", n);
      }
    }
  ), W = () => {
    _(null), s.resetFields(), F(""), p(!0);
  }, le = (n) => {
    _(n), F(n.type);
    const y = { ...n };
    if (y.config) {
      const O = U == null ? void 0 : U.find((R) => R.tool_set_type === n.type);
      if (O) {
        const R = {};
        O.config_fields.forEach((H) => {
          var de, ze;
          H.type === "object" && ((de = y.config) != null && de[H.name]) ? R[H.name] = JSON.stringify(y.config[H.name], null, 2) : ((ze = y.config) == null ? void 0 : ze[H.name]) !== void 0 && (R[H.name] = y.config[H.name]);
        }), y.config = R;
      }
    }
    s.setFieldsValue(y), p(!0);
  };
  console.log(E, U);
  const re = (n) => {
    F(n);
    const y = U == null ? void 0 : U.find((O) => O.tool_set_type === n);
    if (y) {
      const O = {};
      y.config_fields.forEach((R) => {
        if (R.default)
          switch (R.type) {
            case "number":
              O[R.name] = Number(R.default);
              break;
            case "boolean":
              O[R.name] = R.default === "true";
              break;
            case "array":
              O[R.name] = R.default.split(",");
              break;
            default:
              O[R.name] = R.default;
          }
      }), s.setFieldValue("config", O);
    } else
      s.setFieldValue("config", void 0);
  }, Ie = (n) => {
    if (n.config && x) {
      const y = {};
      x.config_fields.forEach((O) => {
        var H;
        const R = (H = n.config) == null ? void 0 : H[O.name];
        if (R !== void 0)
          if (O.type === "object")
            try {
              y[O.name] = typeof R == "string" ? JSON.parse(R) : R;
            } catch {
              y[O.name] = R;
            }
          else
            y[O.name] = R;
      }), n.config = y;
    }
    h ? ge({ id: h.id, data: n }) : D(n);
  }, he = (n) => {
    fe(n);
  }, Ve = (n) => {
    P(n), d(!0);
  }, ye = (n) => {
    console.log(/* @__PURE__ */ new Date(), "handleToggleStatus");
    const y = n.status === "enabled" ? "disabled" : "enabled";
    return Z({ id: n.id, status: y }).then(() => {
      console.log(/* @__PURE__ */ new Date(), "handleToggleStatus1");
    });
  }, u = (n) => {
    var O;
    if (!((O = n.data_source) != null && O.depends_on) || n.data_source.depends_on.length === 0)
      return {};
    const y = {};
    return n.data_source.depends_on.forEach((R) => {
      var de;
      const H = (de = C.config) == null ? void 0 : de[R];
      H !== void 0 && (y[R] = H);
    }), y;
  };
  console.log(L);
  const $ = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (n) => /* @__PURE__ */ e.jsx(Y, { color: "blue", children: n.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (n) => /* @__PURE__ */ e.jsx(Y, { color: n === "enabled" ? "green" : "red", children: n === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (n, y) => /* @__PURE__ */ e.jsx(Ce, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(Je, {}),
          onClick: async () => oe(y.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => k(y.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(We, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => Ve(y.config),
          disabled: !y.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(_e, {}),
          onClick: async () => le(y)
        },
        {
          key: "toggleStatus",
          icon: y.status === "enabled" ? /* @__PURE__ */ e.jsx(Qe, {}) : /* @__PURE__ */ e.jsx(Oe, {}),
          onClick: async () => ye(y),
          permission: "system:toolsets:update",
          tooltip: y.status === "enabled" ? a("disable", { defaultValue: "Disable" }) : a("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          permission: "system:toolsets:delete",
          tooltip: a("delete", { defaultValue: "Delete" }),
          onClick: async () => he(y.id),
          danger: !0,
          confirm: {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => he(y.id),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ee, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(we, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsx(
        f.Search,
        {
          placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
          style: { width: 300 },
          value: b,
          onChange: (n) => V(n.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          z,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ie, {}),
            onClick: B,
            loading: N,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ne, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          z,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Se, {}),
            onClick: W,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsx(
      xe,
      {
        columns: $,
        dataSource: (L == null ? void 0 : L.data) || [],
        loading: N,
        rowKey: "id",
        pagination: {
          total: (L == null ? void 0 : L.total) || 0,
          current: (L == null ? void 0 : L.current) || 1,
          pageSize: (L == null ? void 0 : L.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (n, y) => t("common.pagination.total", {
            defaultValue: `${y[0]}-${y[1]} of ${n} items`,
            start: y[0],
            end: y[1],
            total: n
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: h ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: j,
        onCancel: () => {
          p(!1), s.resetFields(), _(null), F("");
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: s,
            layout: "vertical",
            onFinish: Ie,
            onValuesChange: (n, y) => G(y),
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(f, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
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
                    q,
                    {
                      loading: X,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: re,
                      value: E,
                      options: U == null ? void 0 : U.map((n) => ({
                        label: n.name,
                        value: n.tool_set_type
                      }))
                    }
                  )
                }
              ),
              (se = x == null ? void 0 : x.config_fields) == null ? void 0 : se.map((n) => /* @__PURE__ */ e.jsx(
                qe,
                {
                  field: n,
                  selectedType: E,
                  dependentValues: u(n),
                  formValues: C
                },
                n.name
              )),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: r || pe,
                    children: h ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    onClick: () => {
                      p(!1), s.resetFields(), _(null), F("");
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
      Q,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: i,
        onCancel: () => d(!1),
        footer: [
          /* @__PURE__ */ e.jsx(z, { onClick: () => d(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(g, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: c,
        onCancel: () => w(!1),
        footer: [
          /* @__PURE__ */ e.jsx(z, { onClick: () => w(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: o ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ie, { style: { fontSize: 24 }, spin: !0 }) }) : T.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : T.map((n, y) => {
          var O, R, H;
          return /* @__PURE__ */ e.jsx(
            ee,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(Ee, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((O = n.function) == null ? void 0 : O.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(we, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(ce, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((R = n.function) == null ? void 0 : R.description) || "-" })
                ] }),
                ((H = n.function) == null ? void 0 : H.parameters) && /* @__PURE__ */ e.jsxs(ce, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(n.function.parameters, null, 2) })
                ] })
              ] })
            },
            y
          );
        }) })
      }
    )
  ] });
}, { TextArea: Tt } = f, kt = () => {
  const t = Ae(), { t: a } = M("system"), { t: s } = M("common"), [j] = l.useForm(), [p, h] = v(!1), [_, b] = v(null), [V, i] = v(""), [d, g] = v(1), [P, E] = v(10), { loading: F, data: c, refresh: w } = S(
    () => nt({ current: d, page_size: P, search: V }),
    {
      refreshDeps: [d, P, V],
      onError: (r) => {
        m.error(a("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", r);
      }
    }
  ), { loading: T, run: I } = S(
    (r) => it(r),
    {
      manual: !0,
      onSuccess: () => {
        m.success(a("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), h(!1), j.resetFields(), b(null), w();
      },
      onError: (r) => {
        m.error((r == null ? void 0 : r.err) || a("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: C, run: G } = S(
    ({ id: r, ...D }) => ot({ id: r }, D),
    {
      manual: !0,
      onSuccess: () => {
        m.success(a("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), h(!1), j.resetFields(), b(null), w();
      },
      onError: (r) => {
        m.error((r == null ? void 0 : r.err) || a("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: N } = S(
    (r) => rt({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(a("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), w();
      },
      onError: (r) => {
        m.error((r == null ? void 0 : r.err) || a("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), L = () => {
    b(null), j.resetFields(), j.setFieldsValue({ status: "active" }), h(!0);
  }, B = (r) => {
    b(r), j.setFieldsValue({
      name: r.name,
      description: r.description,
      status: r.status
    }), h(!0);
  }, X = (r) => {
    Q.confirm({
      title: a("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: a("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${r.name}"? This action cannot be undone.`
      }),
      onOk: () => N(r.id)
    });
  }, U = () => {
    j.validateFields().then((r) => {
      _ ? G({ id: _.id, ...r }) : I(r);
    });
  }, x = [
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
      render: (r) => /* @__PURE__ */ e.jsx(Y, { color: r === "active" ? "green" : "default", children: r === "active" ? a("settings.organizations.active", { defaultValue: "Active" }) : a("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (r, D) => /* @__PURE__ */ e.jsx(
        Ce,
        {
          actions: [
            {
              key: "view",
              label: s("view", { defaultValue: "View" }),
              icon: /* @__PURE__ */ e.jsx(Xe, {}),
              onClick: async () => t(`/system/settings/organizations/${D.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              label: s("edit", { defaultValue: "Edit" }),
              icon: /* @__PURE__ */ e.jsx(_e, {}),
              onClick: async () => B(D),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              label: s("delete", { defaultValue: "Delete" }),
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              danger: !0,
              onClick: async () => X(D),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    ee,
    {
      title: a("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(ie, {}), onClick: w, children: s("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ne, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(z, { type: "primary", icon: /* @__PURE__ */ e.jsx(Se, {}), onClick: L, children: a("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            f.Search,
            {
              placeholder: a("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (r) => {
                i(r), g(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              columns: x,
              dataSource: (c == null ? void 0 : c.data) || [],
              loading: F,
              rowKey: "id",
              pagination: {
                current: d,
                pageSize: P,
                total: (c == null ? void 0 : c.total) || 0,
                showSizeChanger: !0,
                showTotal: (r) => s("pagination.total", { defaultValue: `Total ${r} items` }),
                onChange: (r, D) => {
                  g(r), E(D);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          Q,
          {
            title: _ ? a("settings.organizations.edit", { defaultValue: "Edit Organization" }) : a("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: p,
            onOk: U,
            onCancel: () => {
              h(!1), j.resetFields(), b(null);
            },
            confirmLoading: T || C,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(l, { form: j, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: a("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: a("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(f, {})
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
                  children: /* @__PURE__ */ e.jsxs(q, { children: [
                    /* @__PURE__ */ e.jsx(q.Option, { value: "active", children: a("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(q.Option, { value: "disabled", children: a("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, At = ({
  transformItems: t = (a) => a
}) => {
  const { t: a } = M("system"), s = Ae(), j = st(), _ = j.hash.replace("#", "") || "base", { enableMultiOrg: b } = gt(), { hasPermission: V } = ft(), i = [
    {
      key: "base",
      label: a("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(St, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "security",
      label: a("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(bt, {}),
      hidden: !V("system:security:update")
    },
    {
      key: "oauth",
      label: a("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(yt, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "ldap",
      label: a("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(_t, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "smtp",
      label: a("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(vt, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "ai-models",
      label: a("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(It, {}),
      hidden: !V("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: a("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(wt, {}),
      hidden: !V("system:toolsets:view")
    },
    // Only show organization tab if multi-org is enabled
    ...b ? [{
      key: "organizations",
      label: a("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(kt, {}),
      hidden: !V("system:organization:view")
    }] : []
  ];
  return console.log(i, V("system:settings:update")), /* @__PURE__ */ e.jsx(ee, { title: a("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Ue,
    {
      defaultActiveKey: _,
      onChange: (d) => {
        s(`${j.pathname}#${d}`);
      },
      items: t(i.filter((d) => !d.hidden))
    }
  ) });
}, Jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: At
}, Symbol.toStringTag, { value: "Module" })), zt = () => {
  var he, Ve, ye;
  const t = Ae(), { id: a } = lt(), { t: s } = M("system"), { t: j } = M("common"), [p] = l.useForm(), [h] = l.useForm(), [_, b] = v(!1), [V, i] = v(!1), [d, g] = v(null), [P, E] = v(""), [F, c] = v(1), [w, T] = v(10), { data: I, loading: C, refresh: G } = S(
    () => dt({ id: a }),
    {
      ready: !!a,
      onError: (u) => {
        m.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", u);
      }
    }
  ), { data: N, loading: L, refresh: B } = S(
    () => ut({ id: a, current: F, page_size: w, search: P }),
    {
      ready: !!a,
      refreshDeps: [a, F, w, P],
      onError: (u) => {
        m.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", u);
      }
    }
  ), { data: X, loading: U } = S(
    () => ht({ current: 1, page_size: 1e3 }),
    {
      ready: _
    }
  ), { data: x, loading: r } = S(
    () => xt({ organization_id: a, current: 1, page_size: 1e3 }),
    {
      ready: !!a
    }
  ), { loading: D, run: pe } = S(
    (u) => ct({ id: a }, u),
    {
      manual: !0,
      onSuccess: () => {
        m.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), b(!1), p.resetFields(), B();
      },
      onError: (u) => {
        m.error((u == null ? void 0 : u.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: ge, run: fe } = S(
    (u) => mt({ id: a, user_id: d == null ? void 0 : d.id }, u),
    {
      manual: !0,
      onSuccess: () => {
        m.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), i(!1), h.resetFields(), g(null), B();
      },
      onError: (u) => {
        m.error((u == null ? void 0 : u.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: oe } = S(
    (u) => pt({ id: a, user_id: u }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), B();
      },
      onError: (u) => {
        m.error((u == null ? void 0 : u.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), o = () => {
    b(!0), p.resetFields();
  }, k = (u) => {
    var $;
    g(u), h.setFieldsValue({
      role_ids: (($ = u.organization_roles) == null ? void 0 : $.map((se) => se.id)) || []
    }), i(!0);
  }, Z = (u) => {
    Q.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${u.full_name || u.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => oe(u.id)
    });
  }, W = () => {
    p.validateFields().then((u) => {
      pe(u);
    });
  }, le = () => {
    h.validateFields().then((u) => {
      fe(u);
    });
  }, re = ((he = X == null ? void 0 : X.data) == null ? void 0 : he.filter((u) => {
    var $;
    return !(($ = N == null ? void 0 : N.data) != null && $.some((se) => se.id === u.id));
  })) || [], Ie = [
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
      render: (u) => /* @__PURE__ */ e.jsx(Y, { color: u === "active" ? "green" : "default", children: u === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : u })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (u, $) => {
        var se;
        return /* @__PURE__ */ e.jsx(K, { wrap: !0, children: ((se = $.organization_roles) == null ? void 0 : se.map((n) => /* @__PURE__ */ e.jsx(Y, { children: n.name }, n.id))) || /* @__PURE__ */ e.jsx(Y, { children: "No roles" }) });
      }
    },
    {
      title: j("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (u, $) => /* @__PURE__ */ e.jsx(
        Ce,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(_e, {}),
              onClick: async () => k($)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              danger: !0,
              onClick: async () => Z($)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      ee,
      {
        title: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              icon: /* @__PURE__ */ e.jsx(Ye, {}),
              onClick: () => t("/system/settings#organizations"),
              children: j("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            I == null ? void 0 : I.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(ie, {}), onClick: () => {
          G(), B();
        }, children: j("refresh", { defaultValue: "Refresh" }) }),
        loading: C,
        children: /* @__PURE__ */ e.jsxs(te, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(te.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: I == null ? void 0 : I.name }),
          /* @__PURE__ */ e.jsx(te.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(Y, { color: (I == null ? void 0 : I.status) === "active" ? "green" : "default", children: (I == null ? void 0 : I.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(te.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (I == null ? void 0 : I.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ee,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(z, { type: "primary", icon: /* @__PURE__ */ e.jsx(Se, {}), onClick: o, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            f.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (u) => {
                E(u), c(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              columns: Ie,
              dataSource: (N == null ? void 0 : N.data) || [],
              loading: L,
              rowKey: "id",
              pagination: {
                current: F,
                pageSize: w,
                total: (N == null ? void 0 : N.total) || 0,
                showSizeChanger: !0,
                showTotal: (u) => j("pagination.total", { defaultValue: `Total ${u} items` }),
                onChange: (u, $) => {
                  c(u), T($);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: _,
        onOk: W,
        onCancel: () => {
          b(!1), p.resetFields();
        },
        confirmLoading: D,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(l, { form: p, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "user_id",
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: s("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: U,
                  filterOption: (u, $) => (($ == null ? void 0 : $.label) ?? "").toLowerCase().includes(u.toLowerCase()),
                  options: re.map((u) => ({
                    label: `${u.full_name || u.username} (${u.email})`,
                    value: u.id
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
                q,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: r,
                  options: ((Ve = x == null ? void 0 : x.data) == null ? void 0 : Ve.map((u) => ({
                    label: u.name,
                    value: u.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: V,
        onOk: le,
        onCancel: () => {
          i(!1), h.resetFields(), g(null);
        },
        confirmLoading: ge,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(l, { form: h, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                f,
                {
                  value: (d == null ? void 0 : d.full_name) || (d == null ? void 0 : d.username),
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
                q,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: r,
                  options: ((ye = x == null ? void 0 : x.data) == null ? void 0 : ye.map((u) => ({
                    label: u.name,
                    value: u.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zt
}, Symbol.toStringTag, { value: "Module" })), Et = () => {
  const { t } = M("system"), [a] = at(), s = a.get("provider"), j = a.get("code"), p = a.get("state"), [h, _] = v(null), [b, V] = v(null), [i, d] = v(null);
  return S(async () => {
    if (!j || !p || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const g = await A.system.testOauthCallback({ code: j, state: p, provider: s });
    if (!g.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!g.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    _(g.user), V(g.user_info);
  }, {
    onSuccess: () => {
      d({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (g) => {
      d({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: g.message
      });
    }
  }), i ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    Be,
    {
      status: i.status,
      title: i.message,
      subTitle: i.error,
      extra: /* @__PURE__ */ e.jsxs(K, { style: { display: !b || !h ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(ee, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Pe, { src: b || {} }) }),
        /* @__PURE__ */ e.jsx(ee, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Pe, { src: h || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(tt, {});
}, Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Et
}, Symbol.toStringTag, { value: "Module" }));
export {
  Wt as O,
  Qt as a,
  Jt as i
};
