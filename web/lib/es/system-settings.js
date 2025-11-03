import { j as e } from "./vendor.js";
import { Form as l, message as m, Spin as ee, Switch as N, Select as L, Input as i, Divider as ue, Alert as Me, Space as D, Button as v, InputNumber as H, Modal as Q, Skeleton as Ue, Descriptions as X, Steps as $e, Tag as te, Table as ce, Radio as ne, Tabs as ye, Tooltip as le, Popconfirm as Oe, Card as J, Row as ie, Col as G, Checkbox as ge, Result as Ne } from "antd";
import { useTranslation as $ } from "react-i18next";
import { useState as I, useEffect as re, useMemo as De } from "react";
import { useRequest as w } from "ahooks";
import { SaveOutlined as me, ReloadOutlined as se, LoadingOutlined as ze, CheckCircleTwoTone as Be, StarFilled as Ke, CheckCircleOutlined as _e, StarOutlined as He, EditOutlined as ve, DeleteOutlined as Se, PlusOutlined as Ie, ThunderboltOutlined as Ge, ToolOutlined as xe, SettingOutlined as Je, LockOutlined as Ze } from "@ant-design/icons";
import { a as S } from "./index.js";
import { g as be } from "./base.js";
import { h as ae, f as We, c as Qe, L as Xe } from "./components.js";
import de from "react-quill";
import { useNavigate as Ye, useLocation as et, useSearchParams as tt } from "react-router-dom";
import Ve from "react-json-view";
const Y = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, st = {
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
}, lt = ({ initialData: t, onRefresh: n }) => {
  const { t: a } = $("system"), { t: T } = $("common"), [c] = l.useForm(), [h, b] = I((t == null ? void 0 : t.provider) || "custom"), [y, j] = I((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [o, f] = I((t == null ? void 0 : t.enabled) || !1), [u, F] = I((t == null ? void 0 : t.auto_create_user) || !1), { loading: r, data: k, refresh: x } = w(S.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (g) => {
      c.setFieldsValue(g), b(g.provider), j(g.provider === "custom" || g.provider === "autoDiscover"), f(g.enabled), F(g.auto_create_user);
    },
    onError: (g) => {
      m.error(a("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", g);
    }
  });
  re(() => {
    t && (c.setFieldsValue(t), b(t.provider), j(t.provider === "custom" || t.provider === "autoDiscover"), f(t.enabled), F(t.auto_create_user));
  }, [t, c]);
  const E = (g) => {
    b(g), j(g === "custom" || g === "autoDiscover");
    const q = st[g];
    q && c.setFieldsValue({
      auth_endpoint: q.endpoints.auth_endpoint,
      token_endpoint: q.endpoints.token_endpoint,
      userinfo_endpoint: q.endpoints.userinfo_endpoint,
      scope: q.scope,
      // Set field mappings
      email_field: q.email_field,
      username_field: q.username_field,
      full_name_field: q.full_name_field,
      avatar_field: q.avatar_field,
      role_field: q.role_field,
      // Set display configuration
      icon_url: q.icon_url,
      display_name: q.display_name
    });
  }, M = (g) => {
    f(g);
  }, O = (g) => {
    F(g);
  }, { loading: _, run: A } = w(S.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      m.success(a("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n ? n() : x();
    },
    onError: (g) => {
      m.error(a("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", g);
    }
  }), z = (g) => {
    A(g);
  }, Z = () => {
    n ? n() : x();
  }, { loading: P, run: B } = w(async ({ redirect_uri: g, ...q }) => {
    let K;
    return g ? K = new URL(g) : K = new URL(window.location.origin), K.pathname = be("/system/settings/oauth/test-callback"), K.searchParams.set("provider", h), S.system.testOauthConnection({ redirect_uri: K.toString(), ...q });
  }, {
    manual: !0,
    onSuccess: ({ url: g }) => {
      window.open(g, "_blank");
    },
    onError: (g) => {
      m.error(a("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: g.message })), console.error("Failed to test OAuth connection", g);
    }
  }), W = () => h === "custom";
  return /* @__PURE__ */ e.jsx(ee, { spinning: r, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: c,
      layout: "vertical",
      onFinish: z,
      initialValues: t || k,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "enabled",
            label: a("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: a("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(N, { onChange: M })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "provider",
            label: a("settings.oauth.provider.label", { defaultValue: "OAuth Provider" }),
            tooltip: a("settings.oauth.provider.tooltip", { defaultValue: "Select an OAuth provider or configure a custom one." }),
            rules: [
              {
                required: o,
                message: a("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(L, { onChange: E, disabled: !o, children: [
              /* @__PURE__ */ e.jsx(L.Option, { value: "github", children: a("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "google", children: a("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "dingtalk", children: a("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "wechat", children: a("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "autoDiscover", children: a("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "custom", children: a("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "display_name",
            label: a("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: a("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              i,
              {
                disabled: !o,
                placeholder: h !== "custom" ? a(`settings.oauth.provider.options.${h}`, { defaultValue: h }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "icon_url",
            label: a("settings.oauth.iconUrl.label", { defaultValue: "Icon URL" }),
            tooltip: a("settings.oauth.iconUrl.tooltip", { defaultValue: "URL of the icon for this provider. Displayed on the login button." }),
            rules: [
              {
                pattern: Y,
                message: a("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o, placeholder: "https://example.com/icon.png" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "client_id",
            label: a("settings.oauth.clientId.label", { defaultValue: "Client ID" }),
            tooltip: a("settings.oauth.clientId.tooltip", { defaultValue: "The Client ID provided by the OAuth provider." }),
            rules: [
              {
                required: o,
                message: a("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "client_secret",
            label: a("settings.oauth.clientSecret.label", { defaultValue: "Client Secret" }),
            tooltip: a("settings.oauth.clientSecret.tooltip", { defaultValue: "The Client Secret provided by the OAuth provider. This will be stored encrypted." }),
            rules: [
              {
                required: o,
                message: a("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i.Password, { disabled: !o, autoComplete: "off", visibilityToggle: !1, placeholder: a("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        W() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auth_endpoint",
            label: a("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: a("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && h === "custom",
                message: a("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: Y,
                message: a("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "wellknown_endpoint",
            hidden: h !== "autoDiscover",
            label: a("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: a("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: Y,
                message: a("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: o && h === "autoDiscover",
                message: a("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o })
          }
        ),
        W() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "token_endpoint",
            label: a("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: a("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && h === "custom",
                message: a("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: Y,
                message: a("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o })
          }
        ),
        W() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "userinfo_endpoint",
            label: a("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: a("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && h === "custom",
                message: a("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: Y,
                message: a("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "scope",
            label: a("settings.oauth.scope.label", { defaultValue: "Authorization Scope" }),
            tooltip: a("settings.oauth.scope.tooltip", { defaultValue: "The scopes to request from the OAuth provider, separated by spaces." }),
            rules: [
              {
                required: o,
                message: a("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "redirect_uri",
            label: a("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: a("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(g) => g.getFieldValue("redirect_uri") !== "" ? {
              pattern: Y,
              message: a("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o, placeholder: `http://${window.location.host}${be(`/login?provider=settings.${h}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auto_create_user",
            label: a("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: a("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(N, { onChange: O, disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "default_role",
            label: a("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: a("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: o && u,
                message: a("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o || !u })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "mfa_enabled",
            label: a("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: a("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(N, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(ue, { children: a("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Me,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: a("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: y ? "" : a("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "email_field",
            label: a("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: a("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "email", disabled: !o || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "username_field",
            label: a("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: a("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "login", autoComplete: "off", disabled: !o || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "full_name_field",
            label: a("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: a("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "name", disabled: !o || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "avatar_field",
            label: a("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: a("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "avatar_url", disabled: !o || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "role_field",
            label: a("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: a("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "role", disabled: !o || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            v,
            {
              type: "primary",
              htmlType: "submit",
              loading: _,
              icon: /* @__PURE__ */ e.jsx(me, {}),
              children: T("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            v,
            {
              loading: P,
              onClick: async () => {
                const g = c.getFieldsValue();
                B(g);
              },
              children: a("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            v,
            {
              onClick: Z,
              icon: /* @__PURE__ */ e.jsx(se, {}),
              children: T("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, at = () => {
  const { t } = $("system"), { t: n } = $("common"), [a] = l.useForm(), { loading: T, data: c, refresh: h } = w(S.system.getSecuritySettings, {
    onSuccess: (o) => {
      a.setFieldsValue(o);
    },
    onError: (o) => {
      m.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: b, run: y } = w(S.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      m.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), h();
    },
    onError: (o) => {
      m.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), j = (o) => {
    y(o);
  };
  return /* @__PURE__ */ e.jsx(ee, { spinning: T, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: a,
      layout: "vertical",
      onFinish: j,
      initialValues: c,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(N, {})
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
            children: /* @__PURE__ */ e.jsx(H, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(H, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(N, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, f) => o.login_failure_lock !== f.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(H, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, f) => o.login_failure_lock !== f.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(H, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            children: /* @__PURE__ */ e.jsx(N, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, f) => o.history_password_check !== f.history_password_check,
            children: ({ getFieldValue: o }) => o("history_password_check") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(H, { min: 1, max: 10, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(H, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(H, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(H, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            v,
            {
              type: "primary",
              htmlType: "submit",
              loading: b,
              icon: /* @__PURE__ */ e.jsx(me, {}),
              children: n("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            v,
            {
              onClick: () => h(),
              icon: /* @__PURE__ */ e.jsx(se, {}),
              children: n("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, ot = ({ fetchItems: t, importItems: n, columns: a, ...T }) => {
  const { t: c } = $("system"), [h, b] = I([]), [y, j] = I([]), { run: o, loading: f } = w(t, {
    onError: (r) => {
      m.error(c("settings.ldap.importError", { error: `${r.message}` }));
    },
    onSuccess: (r) => {
      b(r);
    },
    manual: !0
  }), { run: u, loading: F } = w(async () => {
    for (const r of y.filter((k) => {
      const x = h.find((E) => E.ldap_dn === k);
      return !(!x || x.status === "imported");
    })) {
      const k = await n([r]);
      b((x) => [...x].map((M) => {
        for (const O of k)
          if (M.ldap_dn === O.ldap_dn)
            return { ...O, status: "imported" };
        return M;
      }));
    }
  }, {
    manual: !0
  });
  return re(() => {
    T.visible && (b([]), o(), j([]));
  }, [T.visible]), /* @__PURE__ */ e.jsx(
    Q,
    {
      title: c("settings.ldap.importTitle"),
      ...T,
      onOk: () => {
        u();
      },
      width: 900,
      confirmLoading: F,
      loading: f,
      children: /* @__PURE__ */ e.jsx(
        ce,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (r) => {
              j(r);
            },
            getCheckboxProps: (r) => ({
              disabled: r.status === "imported"
            })
          },
          columns: a.map(({ render: r, ...k }) => r ? {
            ...k,
            render: (x, E, M) => {
              const O = y.includes(E.ldap_dn) && F && E.status !== "imported";
              return r(x, E, M, O);
            }
          } : k),
          dataSource: h,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, nt = () => {
  var E, M, O;
  const { t } = $("system"), [n] = l.useForm(), [a, T] = I(!1), [c, h] = I(null), [b, y] = I(!1), [j, o] = I(!1), [f] = l.useForm(), [u, F] = I(!1);
  w(S.system.getLdapSettings, {
    onSuccess: (_) => {
      n.setFieldsValue(_), F(_.enabled);
    },
    onError: (_) => {
      m.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${_.message}` }));
    }
  }), re(() => {
    h(null);
  }, [b]);
  const r = async (_) => {
    T(!0);
    try {
      await S.system.updateLdapSettings(_), m.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      m.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      T(!1);
    }
  }, { run: k, loading: x } = w(async (_) => {
    const A = await n.validateFields();
    return await S.system.testLdapConnection({
      ..._,
      ...A
    });
  }, {
    onSuccess: (_) => {
      h(_);
    },
    onError: (_) => {
      m.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${_.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      l,
      {
        form: n,
        layout: "vertical",
        onFinish: r,
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
              children: /* @__PURE__ */ e.jsx(N, { onChange: (_) => F(_) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: u, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !u, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: u, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !u, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: u, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(i.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: u, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !u, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(i, { disabled: !u, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: u, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: u, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: u, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: u, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(i, { type: "number", defaultValue: 15, disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(ue, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(N, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(N, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(i.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(i.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(i.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(ae, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: a, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ae, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              v,
              {
                disabled: !u,
                style: { marginLeft: 8 },
                onClick: () => y(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ae, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              v,
              {
                disabled: !u,
                style: { marginLeft: 8 },
                onClick: () => {
                  o(!0);
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
        open: b,
        onCancel: () => y(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            l,
            {
              form: f,
              layout: "vertical",
              onFinish: k,
              children: [
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(i, { disabled: !u })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(i.Password, { disabled: !u })
                  }
                ),
                /* @__PURE__ */ e.jsxs(l.Item, { children: [
                  /* @__PURE__ */ e.jsx(ae, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(v, { disabled: !u, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    v,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => y(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(ee, { spinning: x, children: /* @__PURE__ */ e.jsx(Ue, { active: x, loading: x, children: c && (c.user ? /* @__PURE__ */ e.jsxs(X, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(X.Item, { label: "Username", span: 3, children: c.user.username }),
            /* @__PURE__ */ e.jsx(X.Item, { label: "Email", span: 3, children: c.user.email }),
            /* @__PURE__ */ e.jsx(X.Item, { label: "FullName", span: 3, children: c.user.full_name }),
            /* @__PURE__ */ e.jsx(X.Item, { label: "CreatedAt", span: 3, children: c.user.created_at }),
            /* @__PURE__ */ e.jsx(X.Item, { label: "UpdatedAt", span: 3, children: c.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            $e,
            {
              direction: "vertical",
              current: (E = c.message) == null ? void 0 : E.findIndex((_) => !_.success),
              status: (M = c.message) != null && M.find((_) => !_.success) ? "error" : "finish",
              items: (O = c.message) == null ? void 0 : O.map((_) => ({
                status: _.success ? "finish" : "error",
                title: _.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      ot,
      {
        visible: j,
        onCancel: () => o(!1),
        fetchItems: () => S.system.importLdapUsers({}),
        importItems: (_) => S.system.importLdapUsers({ user_dn: _ }),
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
          render: (_, A, z, Z) => Z ? /* @__PURE__ */ e.jsx(ee, { indicator: /* @__PURE__ */ e.jsx(ze, { spin: !0 }) }) : _ ? /* @__PURE__ */ e.jsx(Be, { twoToneColor: "#52c41a" }) : A.id ? /* @__PURE__ */ e.jsx(te, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(te, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, it = () => {
  const { t } = $("system"), { t: n } = $("common"), [a] = l.useForm(), [T, c] = I(null), [h, b] = I(!1), [y] = l.useForm(), [j, o] = I(!1), { loading: f } = w(S.system.getSmtpSettings, {
    onSuccess: (x) => {
      a.setFieldsValue(x), o(x.enabled);
    },
    onError: (x) => {
      m.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${x.message}` }));
    }
  });
  re(() => {
    c(null);
  }, [h]);
  const { run: u, loading: F } = w(({ port: x, ...E }) => S.system.updateSmtpSettings({ ...E, port: Number(x) }), {
    manual: !0,
    onSuccess: () => {
      m.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (x) => {
      m.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${x.message}` }));
    }
  }), { run: r, loading: k } = w(async (x) => {
    const { port: E, ...M } = await a.validateFields();
    return await S.system.testSmtpConnection({
      ...x,
      ...M,
      port: Number(E)
    });
  }, {
    onSuccess: (x) => {
      c(x);
    },
    onError: (x) => {
      m.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${x.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(ee, { spinning: f, children: /* @__PURE__ */ e.jsxs(
      l,
      {
        form: a,
        layout: "vertical",
        onFinish: u,
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
              children: /* @__PURE__ */ e.jsx(N, { onChange: (x) => o(x) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: j, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !j, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: j, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { type: "number", disabled: !j, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: j, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !j, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(i.Password, { disabled: !j, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: j, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(ne.Group, { disabled: !j, children: [
                /* @__PURE__ */ e.jsx(ne.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(ne.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(ne.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: j, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !j, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(i, { disabled: !j, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(ue, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(de, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(de, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(de, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(ae, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(v, { type: "primary", htmlType: "submit", loading: F, style: { marginRight: 8 }, children: n("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              v,
              {
                onClick: () => b(!0),
                disabled: !j || k,
                loading: k,
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
        onCancel: () => b(!1),
        footer: [
          /* @__PURE__ */ e.jsx(v, { onClick: () => b(!1), children: n("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(v, { type: "primary", loading: k, onClick: () => y.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: y,
            layout: "vertical",
            onFinish: (x) => r(x),
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
                  children: /* @__PURE__ */ e.jsx(i, { placeholder: "test@example.com" })
                }
              ),
              T && /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: T.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: T.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, rt = () => {
  const { t, i18n: n } = $("system"), { t: a } = $("common"), [T] = l.useForm(), { loading: c, data: h, refresh: b } = w(S.system.getSystemBaseSettings, {
    onSuccess: (f) => {
      T.setFieldsValue(f);
    },
    onError: (f) => {
      m.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", f);
    }
  }), { loading: y, run: j } = w(S.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      m.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), b();
    },
    onError: (f) => {
      m.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", f);
    }
  }), o = (f) => {
    j(f);
  };
  return /* @__PURE__ */ e.jsx(ee, { spinning: c, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: T,
      layout: "vertical",
      onFinish: o,
      initialValues: h,
      children: [
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(ye, { items: [{
          key: "default",
          label: a("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: "name", children: /* @__PURE__ */ e.jsx(i, {}) }) })
        }, ...We.map((f) => ({
          key: f.lang,
          label: n.language !== f.lang ? a(`language.${f.lang}`, { defaultValue: f.label, lang: f.label }) : f.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: ["name_i18n", f.lang], children: /* @__PURE__ */ e.jsx(i, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(i, {}) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(i, {}) }),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(N, {})
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            v,
            {
              type: "primary",
              htmlType: "submit",
              loading: y,
              icon: /* @__PURE__ */ e.jsx(me, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            v,
            {
              onClick: () => b(),
              icon: /* @__PURE__ */ e.jsx(se, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: dt } = i, { Option: ut } = L, ct = () => {
  const { t } = $("ai"), { t: n } = $("common"), [a] = l.useForm(), [T, c] = I(!1), [h, b] = I(null), [y, j] = I(""), [o, f] = I(""), { loading: u, data: F, refresh: r } = w(
    () => S.ai.listAiModels({ current: 1, page_size: 100, search: y }),
    {
      refreshDeps: [y],
      onError: (d) => {
        m.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", d);
      }
    }
  ), { loading: k, run: x } = w(
    (d) => S.ai.createAiModel(d),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), c(!1), a.resetFields(), r();
      },
      onError: (d) => {
        m.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", d);
      }
    }
  ), { loading: E, run: M } = w(
    ({ id: d, data: R }) => S.ai.updateAiModel({ id: d }, R),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), c(!1), a.resetFields(), b(null), r();
      },
      onError: (d) => {
        m.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", d);
      }
    }
  ), { run: O } = w(
    (d) => S.ai.deleteAiModel({ id: d }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), r();
      },
      onError: (d) => {
        m.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", d);
      }
    }
  ), { loading: _, run: A } = w(
    (d) => S.ai.testAiModel({ id: d }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (d) => {
        m.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", d);
      }
    }
  ), { run: z } = w(
    (d) => S.ai.setDefaultAiModel({ id: d }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), r();
      },
      onError: (d) => {
        m.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", d);
      }
    }
  ), Z = () => {
    b(null), a.resetFields(), c(!0);
  }, P = (d) => {
    b(d), a.setFieldsValue({
      ...d,
      api_key: ""
      // Don't populate API key for security
    }), c(!0);
  }, B = (d) => {
    h ? M({ id: h.id, data: d }) : x(d);
  }, W = (d) => {
    O(d);
  }, g = (d) => {
    f(d), A(d);
  }, q = (d) => {
    z(d);
  }, K = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (d, R) => /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx("span", { children: d }),
        R.is_default && /* @__PURE__ */ e.jsx(le, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Ke, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (d) => /* @__PURE__ */ e.jsx(te, { color: "blue", children: d.toUpperCase() })
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
      render: (d) => /* @__PURE__ */ e.jsx(te, { color: d === "enabled" ? "green" : "red", children: d === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (d, R) => /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(le, { title: t("models.test", { defaultValue: "Test Connection" }), children: /* @__PURE__ */ e.jsx(
          v,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(_e, {}),
            loading: _ && R.id === o,
            onClick: () => g(R.id)
          }
        ) }),
        !R.is_default && /* @__PURE__ */ e.jsx(le, { title: t("models.setDefault", { defaultValue: "Set as Default" }), children: /* @__PURE__ */ e.jsx(
          v,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(He, {}),
            onClick: () => q(R.id)
          }
        ) }),
        /* @__PURE__ */ e.jsx(le, { title: n("edit", { defaultValue: "Edit" }), children: /* @__PURE__ */ e.jsx(
          v,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(ve, {}),
            onClick: () => P(R)
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          Oe,
          {
            title: t("models.deleteConfirm", { defaultValue: "Are you sure you want to delete this AI model?" }),
            onConfirm: () => W(R.id),
            okText: n("yes", { defaultValue: "Yes" }),
            cancelText: n("no", { defaultValue: "No" }),
            children: /* @__PURE__ */ e.jsx(le, { title: n("delete", { defaultValue: "Delete" }), children: /* @__PURE__ */ e.jsx(v, { type: "text", danger: !0, icon: /* @__PURE__ */ e.jsx(Se, {}) }) })
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(J, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ie, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx(
        i.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: y,
          onChange: (d) => j(d.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(
          v,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(se, {}),
            onClick: r,
            loading: u,
            children: n("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          v,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ie, {}),
            onClick: Z,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(J, { children: /* @__PURE__ */ e.jsx(
      ce,
      {
        columns: K,
        dataSource: (F == null ? void 0 : F.data) || [],
        loading: u,
        rowKey: "id",
        pagination: {
          total: (F == null ? void 0 : F.total) || 0,
          current: (F == null ? void 0 : F.current) || 1,
          pageSize: (F == null ? void 0 : F.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (d, R) => t("common.pagination.total", {
            defaultValue: `${R[0]}-${R[1]} of ${d} items`,
            start: R[0],
            end: R[1],
            total: d
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: h ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: T,
        onCancel: () => {
          c(!1), a.resetFields(), b(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: a,
            layout: "vertical",
            onFinish: B,
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(i, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    dt,
                    {
                      rows: 3,
                      placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsxs(ie, { gutter: 16, children: [
                /* @__PURE__ */ e.jsx(G, { span: 12, children: /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    name: "provider",
                    label: t("models.provider", { defaultValue: "Provider" }),
                    rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                    children: /* @__PURE__ */ e.jsx(L, { placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }), children: /* @__PURE__ */ e.jsx(ut, { value: "openai", children: "OpenAI" }) })
                  }
                ) }),
                /* @__PURE__ */ e.jsx(G, { span: 12, children: /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    name: "model_id",
                    label: t("models.modelId", { defaultValue: "Model ID" }),
                    rules: [{ required: !0, message: t("models.modelIdRequired", { defaultValue: "Please enter model ID" }) }],
                    children: /* @__PURE__ */ e.jsx(i, { placeholder: "gpt-4, gpt-3.5-turbo, etc." })
                  }
                ) })
              ] }),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "api_key",
                  label: t("models.apiKey", { defaultValue: "API Key" }),
                  rules: h ? [] : [{ required: !0, message: t("models.apiKeyRequired", { defaultValue: "Please enter API key" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    i.Password,
                    {
                      placeholder: h ? t("models.apiKeyPlaceholderEdit", { defaultValue: "Leave empty to keep current API key" }) : t("models.apiKeyPlaceholder", { defaultValue: "Enter API key" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "base_url",
                  label: t("models.baseUrl", { defaultValue: "Base URL" }),
                  children: /* @__PURE__ */ e.jsx(i, { placeholder: t("models.baseUrlPlaceholder", { defaultValue: "Optional: Custom API endpoint" }) })
                }
              ),
              /* @__PURE__ */ e.jsxs(
                l.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(N, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
                /* @__PURE__ */ e.jsx(
                  v,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: k || E,
                    children: h ? n("update", { defaultValue: "Update" }) : n("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  v,
                  {
                    onClick: () => {
                      c(!1), a.resetFields(), b(null);
                    },
                    children: n("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    )
  ] });
}, { TextArea: je } = i, { Option: mt } = L, pt = () => {
  var he;
  const { t } = $("system"), { t: n } = $("common"), [a] = l.useForm(), [T, c] = I(!1), [h, b] = I(null), [y, j] = I(""), [o, f] = I(!1), [u, F] = I(null), [r, k] = I(""), [x, E] = I(!1), [M, O] = I([]), { loading: _, data: A, refresh: z } = w(
    () => S.toolsets.listToolSets({ current: 1, page_size: 100, search: y }),
    {
      refreshDeps: [y],
      onError: (s) => {
        m.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", s);
      }
    }
  ), { loading: Z, data: P } = w(
    () => S.toolsets.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (s) => {
        m.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", s);
      }
    }
  ), B = De(() => P == null ? void 0 : P.find((s) => s.tool_set_type === r), [P, r]), { loading: W, run: g } = w(
    (s) => S.toolsets.createToolSet({
      ...s,
      type: s.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), c(!1), a.resetFields(), z();
      },
      onError: (s) => {
        m.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", s);
      }
    }
  ), { loading: q, run: K } = w(
    ({ id: s, data: p }) => S.toolsets.updateToolSet({ id: s }, {
      ...p,
      type: p.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), c(!1), a.resetFields(), b(null), z();
      },
      onError: (s) => {
        m.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", s);
      }
    }
  ), { run: d } = w(
    (s) => S.toolsets.deleteToolSet({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), z();
      },
      onError: (s) => {
        m.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", s);
      }
    }
  ), { runAsync: R } = w(
    (s) => S.toolsets.testToolSet({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (s) => {
        m.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", s);
      }
    }
  ), { loading: we, runAsync: Te } = w(
    (s) => S.toolsets.getToolSetTools({ id: s }),
    {
      manual: !0,
      onSuccess: (s) => {
        O(s || []), E(!0);
      },
      onError: (s) => {
        m.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", s);
      }
    }
  ), { runAsync: Ce } = w(
    ({ id: s, status: p }) => S.toolsets.updateToolSetStatus({ id: s }, { status: p }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), z();
      },
      onError: (s) => {
        m.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", s);
      }
    }
  ), Fe = () => {
    b(null), a.resetFields(), k(""), c(!0);
  }, ke = (s) => {
    b(s), k(s.type);
    const p = { ...s };
    if (p.config) {
      const C = P == null ? void 0 : P.find((V) => V.tool_set_type === s.type);
      if (C) {
        const V = {};
        C.config_fields.forEach((U) => {
          var oe, fe;
          U.type === "object" && ((oe = p.config) != null && oe[U.name]) ? V[U.name] = JSON.stringify(p.config[U.name], null, 2) : ((fe = p.config) == null ? void 0 : fe[U.name]) !== void 0 && (V[U.name] = p.config[U.name]);
        }), p.config = V;
      }
    }
    a.setFieldsValue(p), c(!0);
  };
  console.log(r, P);
  const Ae = (s) => {
    k(s);
    const p = P == null ? void 0 : P.find((C) => C.tool_set_type === s);
    if (p) {
      const C = {};
      p.config_fields.forEach((V) => {
        if (V.default)
          switch (V.type) {
            case "number":
              C[V.name] = Number(V.default);
              break;
            case "boolean":
              C[V.name] = V.default === "true";
              break;
            case "array":
              C[V.name] = V.default.split(",");
              break;
            default:
              C[V.name] = V.default;
          }
      }), a.setFieldValue("config", C);
    } else
      a.setFieldValue("config", void 0);
  }, Ee = (s) => {
    if (s.config && B) {
      const p = {};
      B.config_fields.forEach((C) => {
        var U;
        const V = (U = s.config) == null ? void 0 : U[C.name];
        if (V !== void 0)
          if (C.type === "object")
            try {
              p[C.name] = typeof V == "string" ? JSON.parse(V) : V;
            } catch {
              p[C.name] = V;
            }
          else
            p[C.name] = V;
      }), s.config = p;
    }
    h ? K({ id: h.id, data: s }) : g(s);
  }, pe = (s) => {
    d(s);
  }, Pe = (s) => {
    F(s), f(!0);
  }, qe = (s) => {
    console.log(/* @__PURE__ */ new Date(), "handleToggleStatus");
    const p = s.status === "enabled" ? "disabled" : "enabled";
    return Ce({ id: s.id, status: p }).then(() => {
      console.log(/* @__PURE__ */ new Date(), "handleToggleStatus1");
    });
  }, Le = (s) => {
    const p = s.options && s.options.length > 0, C = [
      {
        required: s.required,
        message: t("settings.toolsets.fieldRequired", {
          defaultValue: `Please enter ${s.name}`,
          field: s.name
        })
      }
    ];
    if (!p)
      switch (s.type) {
        case "string":
          return /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${r}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: C,
              tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(i, { placeholder: t(`settings.toolsets.${r}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name}` }) })
            },
            s.name
          );
        case "number":
          return /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${r}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: C,
              tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(
                H,
                {
                  style: { width: "100%" },
                  placeholder: t(`settings.toolsets.${r}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name}` })
                }
              )
            },
            s.name
          );
        case "boolean":
          return /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${r}.${s.name}`, { defaultValue: s.display_name || s.name }),
              valuePropName: "checked",
              tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(N, {})
            },
            s.name
          );
        case "array":
          return /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${r}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: C,
              tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(
                L,
                {
                  mode: "tags",
                  style: { width: "100%" },
                  placeholder: t(`settings.toolsets.${r}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name}` }),
                  tokenSeparators: [","]
                }
              )
            },
            s.name
          );
        case "object":
          return /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${r}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: [
                ...C,
                {
                  validator: (V, U) => {
                    if (!U) return Promise.resolve();
                    try {
                      return JSON.parse(U), Promise.resolve();
                    } catch {
                      return Promise.reject(new Error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON format" })));
                    }
                  }
                }
              ],
              tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltips`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(
                je,
                {
                  rows: 4,
                  placeholder: t(`settings.toolsets.${r}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name} (JSON format)` })
                }
              )
            },
            s.name
          );
        case "password":
          return /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${r}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: C,
              tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(i.Password, { placeholder: t(`settings.toolsets.${r}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name}` }), autoComplete: "new-password" })
            },
            s.name
          );
        default:
          return null;
      }
    switch (s.type) {
      case "string":
      case "number":
        return /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: ["config", s.name],
            label: t(`settings.toolsets.${r}.${s.name}`, { defaultValue: s.display_name || s.name }),
            rules: C,
            tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
            children: /* @__PURE__ */ e.jsx(L, { allowClear: !0, placeholder: s.placeholder ? t(`settings.toolsets.${r}.${s.name}Placeholder`, { defaultValue: s.description }) : `${t("common.select", { defaultValue: "Select" })} ${s.name}`, children: s.options.map((V) => /* @__PURE__ */ e.jsx(mt, { value: V.value, children: V.label }, V.value)) })
          },
          s.name
        );
      case "array":
        return /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: ["config", s.name],
            label: t(`settings.toolsets.${r}.${s.name}`, { defaultValue: s.display_name || s.name }),
            rules: C,
            tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
            children: /* @__PURE__ */ e.jsx(ge.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(D, { direction: "vertical", children: s.options.map((V) => /* @__PURE__ */ e.jsx(ge, { value: V.value, children: V.label }, V.value)) }) })
          },
          s.name
        );
      default:
        return null;
    }
  };
  console.log(A);
  const Re = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (s) => /* @__PURE__ */ e.jsx(te, { color: "blue", children: s.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => /* @__PURE__ */ e.jsx(te, { color: s === "enabled" ? "green" : "red", children: s === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (s, p) => /* @__PURE__ */ e.jsx(Qe, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(Ge, {}),
          onClick: async () => R(p.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(xe, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => Te(p.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(Je, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => Pe(p.config),
          disabled: !p.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          onClick: async () => ke(p)
        },
        {
          key: "toggleStatus",
          icon: p.status === "enabled" ? /* @__PURE__ */ e.jsx(Ze, {}) : /* @__PURE__ */ e.jsx(_e, {}),
          onClick: async () => qe(p),
          permission: "system:toolsets:update",
          tooltip: p.status === "enabled" ? n("disable", { defaultValue: "Disable" }) : n("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Se, {}),
          permission: "system:toolsets:delete",
          tooltip: n("delete", { defaultValue: "Delete" }),
          onClick: async () => pe(p.id),
          danger: !0,
          confirm: {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => pe(p.id),
            okText: n("confirm", { defaultValue: "Confirm" }),
            cancelText: n("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(J, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ie, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsx(
        i.Search,
        {
          placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
          style: { width: 300 },
          value: y,
          onChange: (s) => j(s.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(G, { children: /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(
          v,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(se, {}),
            onClick: z,
            loading: _,
            children: n("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          v,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ie, {}),
            onClick: Fe,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(J, { children: /* @__PURE__ */ e.jsx(
      ce,
      {
        columns: Re,
        dataSource: (A == null ? void 0 : A.data) || [],
        loading: _,
        rowKey: "id",
        pagination: {
          total: (A == null ? void 0 : A.total) || 0,
          current: (A == null ? void 0 : A.current) || 1,
          pageSize: (A == null ? void 0 : A.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (s, p) => t("common.pagination.total", {
            defaultValue: `${p[0]}-${p[1]} of ${s} items`,
            start: p[0],
            end: p[1],
            total: s
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: h ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: T,
        onCancel: () => {
          c(!1), a.resetFields(), b(null), k("");
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: a,
            layout: "vertical",
            onFinish: Ee,
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(i, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: t("settings.toolsets.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    je,
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
                      loading: Z,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: Ae,
                      value: r,
                      options: P == null ? void 0 : P.map((s) => ({
                        label: s.name,
                        value: s.tool_set_type
                      }))
                    }
                  )
                }
              ),
              (he = B == null ? void 0 : B.config_fields) == null ? void 0 : he.map((s) => Le(s)),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
                /* @__PURE__ */ e.jsx(
                  v,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: W || q,
                    children: h ? n("update", { defaultValue: "Update" }) : n("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  v,
                  {
                    onClick: () => {
                      c(!1), a.resetFields(), b(null), k("");
                    },
                    children: n("cancel", { defaultValue: "Cancel" })
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
        open: o,
        onCancel: () => f(!1),
        footer: [
          /* @__PURE__ */ e.jsx(v, { onClick: () => f(!1), children: n("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(u, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: x,
        onCancel: () => E(!1),
        footer: [
          /* @__PURE__ */ e.jsx(v, { onClick: () => E(!1), children: n("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: we ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(se, { style: { fontSize: 24 }, spin: !0 }) }) : M.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : M.map((s, p) => {
          var C, V, U;
          return /* @__PURE__ */ e.jsx(
            J,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(D, { children: [
                /* @__PURE__ */ e.jsx(xe, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((C = s.function) == null ? void 0 : C.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(ie, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(G, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((V = s.function) == null ? void 0 : V.description) || "-" })
                ] }),
                ((U = s.function) == null ? void 0 : U.parameters) && /* @__PURE__ */ e.jsxs(G, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(s.function.parameters, null, 2) })
                ] })
              ] })
            },
            p
          );
        }) })
      }
    )
  ] });
}, ht = ({
  transformItems: t = (n) => n
}) => {
  const { t: n } = $("system"), a = Ye(), T = et(), b = T.hash.replace("#", "") || "base", y = [
    {
      key: "base",
      label: n("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(rt, {})
    },
    {
      key: "security",
      label: n("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(at, {})
    },
    {
      key: "oauth",
      label: n("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(lt, {})
    },
    {
      key: "ldap",
      label: n("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(nt, {})
    },
    {
      key: "smtp",
      label: n("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(it, {})
    },
    {
      key: "ai-models",
      label: n("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(ct, {})
    },
    {
      key: "ai-toolsets",
      label: n("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(pt, {})
    }
  ];
  return /* @__PURE__ */ e.jsx(J, { title: n("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    ye,
    {
      defaultActiveKey: b,
      onChange: (j) => {
        a(`${T.pathname}#${j}`);
      },
      items: t(y)
    }
  ) });
}, Ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ht
}, Symbol.toStringTag, { value: "Module" })), ft = () => {
  const { t } = $("system"), [n] = tt(), a = n.get("provider"), T = n.get("code"), c = n.get("state"), [h, b] = I(null), [y, j] = I(null), [o, f] = I(null);
  return w(async () => {
    if (!T || !c || !a)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const u = await S.system.testOauthCallback({ code: T, state: c, provider: a });
    if (!u.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!u.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    b(u.user), j(u.user_info);
  }, {
    onSuccess: () => {
      f({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (u) => {
      f({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: u.message
      });
    }
  }), o ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    Ne,
    {
      status: o.status,
      title: o.message,
      subTitle: o.error,
      extra: /* @__PURE__ */ e.jsxs(D, { style: { display: !y || !h ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(J, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Ve, { src: y || {} }) }),
        /* @__PURE__ */ e.jsx(J, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Ve, { src: h || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Xe, {});
}, Ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ft
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ft as O,
  Ct as i
};
