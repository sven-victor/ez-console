import { j as e } from "./vendor.js";
import { Form as l, message as h, Spin as X, Switch as N, Select as L, Input as i, Divider as ue, Alert as Pe, Space as O, Button as _, InputNumber as K, Modal as Y, Skeleton as qe, Descriptions as Z, Steps as Le, Tag as ee, Table as ce, Radio as ne, Tabs as Ve, Tooltip as G, Popconfirm as je, Card as J, Row as de, Col as Q, Checkbox as ge, Result as Re } from "antd";
import { useTranslation as U } from "react-i18next";
import { useState as S, useEffect as ie, useMemo as Me } from "react";
import { useRequest as C } from "ahooks";
import { SaveOutlined as me, ReloadOutlined as ae, LoadingOutlined as Ue, CheckCircleTwoTone as $e, StarFilled as Ne, CheckCircleOutlined as ye, StarOutlined as Oe, EditOutlined as _e, DeleteOutlined as Ie, PlusOutlined as ve, SettingOutlined as De } from "@ant-design/icons";
import { a as w } from "./index.js";
import { g as fe } from "./base.js";
import { h as le, f as ze, L as Be } from "./components.js";
import re from "react-quill";
import { useNavigate as Ke, useLocation as Ge, useSearchParams as He } from "react-router-dom";
import xe from "react-json-view";
const W = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Je = {
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
}, Ze = ({ initialData: t, onRefresh: n }) => {
  const { t: a } = U("system"), { t: v } = U("common"), [c] = l.useForm(), [m, x] = S((t == null ? void 0 : t.provider) || "custom"), [j, b] = S((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [o, p] = S((t == null ? void 0 : t.enabled) || !1), [u, T] = S((t == null ? void 0 : t.auto_create_user) || !1), { loading: r, data: k, refresh: f } = C(w.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (g) => {
      c.setFieldsValue(g), x(g.provider), b(g.provider === "custom" || g.provider === "autoDiscover"), p(g.enabled), T(g.auto_create_user);
    },
    onError: (g) => {
      h.error(a("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", g);
    }
  });
  ie(() => {
    t && (c.setFieldsValue(t), x(t.provider), b(t.provider === "custom" || t.provider === "autoDiscover"), p(t.enabled), T(t.auto_create_user));
  }, [t, c]);
  const E = (g) => {
    x(g), b(g === "custom" || g === "autoDiscover");
    const q = Je[g];
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
    p(g);
  }, F = (g) => {
    T(g);
  }, { loading: V, run: z } = C(w.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      h.success(a("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n ? n() : f();
    },
    onError: (g) => {
      h.error(a("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", g);
    }
  }), P = (g) => {
    z(g);
  }, D = () => {
    n ? n() : f();
  }, { loading: te, run: se } = C(async ({ redirect_uri: g, ...q }) => {
    let B;
    return g ? B = new URL(g) : B = new URL(window.location.origin), B.pathname = fe("/system/settings/oauth/test-callback"), B.searchParams.set("provider", m), w.system.testOauthConnection({ redirect_uri: B.toString(), ...q });
  }, {
    manual: !0,
    onSuccess: ({ url: g }) => {
      window.open(g, "_blank");
    },
    onError: (g) => {
      h.error(a("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: g.message })), console.error("Failed to test OAuth connection", g);
    }
  }), H = () => m === "custom";
  return /* @__PURE__ */ e.jsx(X, { spinning: r, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: c,
      layout: "vertical",
      onFinish: P,
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
                placeholder: m !== "custom" ? a(`settings.oauth.provider.options.${m}`, { defaultValue: m }) : ""
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
                pattern: W,
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
        H() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auth_endpoint",
            label: a("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: a("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && m === "custom",
                message: a("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: W,
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
            hidden: m !== "autoDiscover",
            label: a("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: a("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: W,
                message: a("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: o && m === "autoDiscover",
                message: a("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o })
          }
        ),
        H() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "token_endpoint",
            label: a("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: a("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && m === "custom",
                message: a("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: W,
                message: a("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o })
          }
        ),
        H() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "userinfo_endpoint",
            label: a("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: a("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && m === "custom",
                message: a("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: W,
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
              pattern: W,
              message: a("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(i, { disabled: !o, placeholder: `http://${window.location.host}${fe(`/login?provider=settings.${m}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auto_create_user",
            label: a("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: a("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(N, { onChange: F, disabled: !o })
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
          Pe,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: a("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: j ? "" : a("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "email_field",
            label: a("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: a("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "email", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "username_field",
            label: a("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: a("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "login", autoComplete: "off", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "full_name_field",
            label: a("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: a("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "name", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "avatar_field",
            label: a("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: a("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "avatar_url", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "role_field",
            label: a("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: a("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(i, { placeholder: "role", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(O, { children: [
          /* @__PURE__ */ e.jsx(
            _,
            {
              type: "primary",
              htmlType: "submit",
              loading: V,
              icon: /* @__PURE__ */ e.jsx(me, {}),
              children: v("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            _,
            {
              loading: te,
              onClick: async () => {
                const g = c.getFieldsValue();
                se(g);
              },
              children: a("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            _,
            {
              onClick: D,
              icon: /* @__PURE__ */ e.jsx(ae, {}),
              children: v("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, We = () => {
  const { t } = U("system"), { t: n } = U("common"), [a] = l.useForm(), { loading: v, data: c, refresh: m } = C(w.system.getSecuritySettings, {
    onSuccess: (o) => {
      a.setFieldsValue(o);
    },
    onError: (o) => {
      h.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: x, run: j } = C(w.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      h.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), m();
    },
    onError: (o) => {
      h.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), b = (o) => {
    j(o);
  };
  return /* @__PURE__ */ e.jsx(X, { spinning: v, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: a,
      layout: "vertical",
      onFinish: b,
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
            children: /* @__PURE__ */ e.jsx(K, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(K, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
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
            shouldUpdate: (o, p) => o.login_failure_lock !== p.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(K, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, p) => o.login_failure_lock !== p.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(K, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            shouldUpdate: (o, p) => o.history_password_check !== p.history_password_check,
            children: ({ getFieldValue: o }) => o("history_password_check") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(K, { min: 1, max: 10, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(K, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(K, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(K, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(O, { children: [
          /* @__PURE__ */ e.jsx(
            _,
            {
              type: "primary",
              htmlType: "submit",
              loading: x,
              icon: /* @__PURE__ */ e.jsx(me, {}),
              children: n("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            _,
            {
              onClick: () => m(),
              icon: /* @__PURE__ */ e.jsx(ae, {}),
              children: n("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Qe = ({ fetchItems: t, importItems: n, columns: a, ...v }) => {
  const { t: c } = U("system"), [m, x] = S([]), [j, b] = S([]), { run: o, loading: p } = C(t, {
    onError: (r) => {
      h.error(c("settings.ldap.importError", { error: `${r.message}` }));
    },
    onSuccess: (r) => {
      x(r);
    },
    manual: !0
  }), { run: u, loading: T } = C(async () => {
    for (const r of j.filter((k) => {
      const f = m.find((E) => E.ldap_dn === k);
      return !(!f || f.status === "imported");
    })) {
      const k = await n([r]);
      x((f) => [...f].map((M) => {
        for (const F of k)
          if (M.ldap_dn === F.ldap_dn)
            return { ...F, status: "imported" };
        return M;
      }));
    }
  }, {
    manual: !0
  });
  return ie(() => {
    v.visible && (x([]), o(), b([]));
  }, [v.visible]), /* @__PURE__ */ e.jsx(
    Y,
    {
      title: c("settings.ldap.importTitle"),
      ...v,
      onOk: () => {
        u();
      },
      width: 900,
      confirmLoading: T,
      loading: p,
      children: /* @__PURE__ */ e.jsx(
        ce,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (r) => {
              b(r);
            },
            getCheckboxProps: (r) => ({
              disabled: r.status === "imported"
            })
          },
          columns: a.map(({ render: r, ...k }) => r ? {
            ...k,
            render: (f, E, M) => {
              const F = j.includes(E.ldap_dn) && T && E.status !== "imported";
              return r(f, E, M, F);
            }
          } : k),
          dataSource: m,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Xe = () => {
  var E, M, F;
  const { t } = U("system"), [n] = l.useForm(), [a, v] = S(!1), [c, m] = S(null), [x, j] = S(!1), [b, o] = S(!1), [p] = l.useForm(), [u, T] = S(!1);
  C(w.system.getLdapSettings, {
    onSuccess: (V) => {
      n.setFieldsValue(V), T(V.enabled);
    },
    onError: (V) => {
      h.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${V.message}` }));
    }
  }), ie(() => {
    m(null);
  }, [x]);
  const r = async (V) => {
    v(!0);
    try {
      await w.system.updateLdapSettings(V), h.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      h.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      v(!1);
    }
  }, { run: k, loading: f } = C(async (V) => {
    const z = await n.validateFields();
    return await w.system.testLdapConnection({
      ...V,
      ...z
    });
  }, {
    onSuccess: (V) => {
      m(V);
    },
    onError: (V) => {
      h.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${V.message}` }));
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
              children: /* @__PURE__ */ e.jsx(N, { onChange: (V) => T(V) })
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
            /* @__PURE__ */ e.jsx(le, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(_, { type: "primary", htmlType: "submit", loading: a, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(le, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              _,
              {
                disabled: !u,
                style: { marginLeft: 8 },
                onClick: () => j(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(le, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              _,
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
      Y,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: x,
        onCancel: () => j(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            l,
            {
              form: p,
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
                  /* @__PURE__ */ e.jsx(le, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(_, { disabled: !u, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    _,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => j(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(X, { spinning: f, children: /* @__PURE__ */ e.jsx(qe, { active: f, loading: f, children: c && (c.user ? /* @__PURE__ */ e.jsxs(Z, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(Z.Item, { label: "Username", span: 3, children: c.user.username }),
            /* @__PURE__ */ e.jsx(Z.Item, { label: "Email", span: 3, children: c.user.email }),
            /* @__PURE__ */ e.jsx(Z.Item, { label: "FullName", span: 3, children: c.user.full_name }),
            /* @__PURE__ */ e.jsx(Z.Item, { label: "CreatedAt", span: 3, children: c.user.created_at }),
            /* @__PURE__ */ e.jsx(Z.Item, { label: "UpdatedAt", span: 3, children: c.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Le,
            {
              direction: "vertical",
              current: (E = c.message) == null ? void 0 : E.findIndex((V) => !V.success),
              status: (M = c.message) != null && M.find((V) => !V.success) ? "error" : "finish",
              items: (F = c.message) == null ? void 0 : F.map((V) => ({
                status: V.success ? "finish" : "error",
                title: V.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      Qe,
      {
        visible: b,
        onCancel: () => o(!1),
        fetchItems: () => w.system.importLdapUsers({}),
        importItems: (V) => w.system.importLdapUsers({ user_dn: V }),
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
          render: (V, z, P, D) => D ? /* @__PURE__ */ e.jsx(X, { indicator: /* @__PURE__ */ e.jsx(Ue, { spin: !0 }) }) : V ? /* @__PURE__ */ e.jsx($e, { twoToneColor: "#52c41a" }) : z.id ? /* @__PURE__ */ e.jsx(ee, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ee, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, Ye = () => {
  const { t } = U("system"), { t: n } = U("common"), [a] = l.useForm(), [v, c] = S(null), [m, x] = S(!1), [j] = l.useForm(), [b, o] = S(!1), { loading: p } = C(w.system.getSmtpSettings, {
    onSuccess: (f) => {
      a.setFieldsValue(f), o(f.enabled);
    },
    onError: (f) => {
      h.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${f.message}` }));
    }
  });
  ie(() => {
    c(null);
  }, [m]);
  const { run: u, loading: T } = C(({ port: f, ...E }) => w.system.updateSmtpSettings({ ...E, port: Number(f) }), {
    manual: !0,
    onSuccess: () => {
      h.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (f) => {
      h.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${f.message}` }));
    }
  }), { run: r, loading: k } = C(async (f) => {
    const { port: E, ...M } = await a.validateFields();
    return await w.system.testSmtpConnection({
      ...f,
      ...M,
      port: Number(E)
    });
  }, {
    onSuccess: (f) => {
      c(f);
    },
    onError: (f) => {
      h.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${f.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(X, { spinning: p, children: /* @__PURE__ */ e.jsxs(
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
              children: /* @__PURE__ */ e.jsx(N, { onChange: (f) => o(f) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: b, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !b, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: b, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { type: "number", disabled: !b, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: b, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !b, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(i.Password, { disabled: !b, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: b, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(ne.Group, { disabled: !b, children: [
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
                { required: b, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(i, { disabled: !b, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(i, { disabled: !b, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(ue, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(re, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(re, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(re, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(le, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(_, { type: "primary", htmlType: "submit", loading: T, style: { marginRight: 8 }, children: n("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              _,
              {
                onClick: () => x(!0),
                disabled: !b || k,
                loading: k,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Y,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: m,
        onCancel: () => x(!1),
        footer: [
          /* @__PURE__ */ e.jsx(_, { onClick: () => x(!1), children: n("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(_, { type: "primary", loading: k, onClick: () => j.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: j,
            layout: "vertical",
            onFinish: (f) => r(f),
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
              v && /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: v.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: v.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, et = () => {
  const { t, i18n: n } = U("system"), { t: a } = U("common"), [v] = l.useForm(), { loading: c, data: m, refresh: x } = C(w.system.getSystemBaseSettings, {
    onSuccess: (p) => {
      v.setFieldsValue(p);
    },
    onError: (p) => {
      h.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", p);
    }
  }), { loading: j, run: b } = C(w.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      h.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), x();
    },
    onError: (p) => {
      h.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", p);
    }
  }), o = (p) => {
    b(p);
  };
  return /* @__PURE__ */ e.jsx(X, { spinning: c, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: v,
      layout: "vertical",
      onFinish: o,
      initialValues: m,
      children: [
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Ve, { items: [{
          key: "default",
          label: a("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: "name", children: /* @__PURE__ */ e.jsx(i, {}) }) })
        }, ...ze.map((p) => ({
          key: p.lang,
          label: n.language !== p.lang ? a(`language.${p.lang}`, { defaultValue: p.label, lang: p.label }) : p.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: ["name_i18n", p.lang], children: /* @__PURE__ */ e.jsx(i, {}) }) })
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
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(O, { children: [
          /* @__PURE__ */ e.jsx(
            _,
            {
              type: "primary",
              htmlType: "submit",
              loading: j,
              icon: /* @__PURE__ */ e.jsx(me, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            _,
            {
              onClick: () => x(),
              icon: /* @__PURE__ */ e.jsx(ae, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: tt } = i, { Option: st } = L, lt = () => {
  const { t } = U("ai"), { t: n } = U("common"), [a] = l.useForm(), [v, c] = S(!1), [m, x] = S(null), [j, b] = S(""), [o, p] = S(""), { loading: u, data: T, refresh: r } = C(
    () => w.ai.listAiModels({ current: 1, page_size: 100, search: j }),
    {
      refreshDeps: [j],
      onError: (d) => {
        h.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", d);
      }
    }
  ), { loading: k, run: f } = C(
    (d) => w.ai.createAiModel(d),
    {
      manual: !0,
      onSuccess: () => {
        h.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), c(!1), a.resetFields(), r();
      },
      onError: (d) => {
        h.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", d);
      }
    }
  ), { loading: E, run: M } = C(
    ({ id: d, data: R }) => w.ai.updateAiModel({ id: d }, R),
    {
      manual: !0,
      onSuccess: () => {
        h.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), c(!1), a.resetFields(), x(null), r();
      },
      onError: (d) => {
        h.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", d);
      }
    }
  ), { run: F } = C(
    (d) => w.ai.deleteAiModel({ id: d }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), r();
      },
      onError: (d) => {
        h.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", d);
      }
    }
  ), { loading: V, run: z } = C(
    (d) => w.ai.testAiModel({ id: d }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (d) => {
        h.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", d);
      }
    }
  ), { run: P } = C(
    (d) => w.ai.setDefaultAiModel({ id: d }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), r();
      },
      onError: (d) => {
        h.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", d);
      }
    }
  ), D = () => {
    x(null), a.resetFields(), c(!0);
  }, te = (d) => {
    x(d), a.setFieldsValue({
      ...d,
      api_key: ""
      // Don't populate API key for security
    }), c(!0);
  }, se = (d) => {
    m ? M({ id: m.id, data: d }) : f(d);
  }, H = (d) => {
    F(d);
  }, g = (d) => {
    p(d), z(d);
  }, q = (d) => {
    P(d);
  }, B = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (d, R) => /* @__PURE__ */ e.jsxs(O, { children: [
        /* @__PURE__ */ e.jsx("span", { children: d }),
        R.is_default && /* @__PURE__ */ e.jsx(G, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Ne, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (d) => /* @__PURE__ */ e.jsx(ee, { color: "blue", children: d.toUpperCase() })
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
      render: (d) => /* @__PURE__ */ e.jsx(ee, { color: d === "enabled" ? "green" : "red", children: d === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (d, R) => /* @__PURE__ */ e.jsxs(O, { children: [
        /* @__PURE__ */ e.jsx(G, { title: t("models.test", { defaultValue: "Test Connection" }), children: /* @__PURE__ */ e.jsx(
          _,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(ye, {}),
            loading: V && R.id === o,
            onClick: () => g(R.id)
          }
        ) }),
        !R.is_default && /* @__PURE__ */ e.jsx(G, { title: t("models.setDefault", { defaultValue: "Set as Default" }), children: /* @__PURE__ */ e.jsx(
          _,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(Oe, {}),
            onClick: () => q(R.id)
          }
        ) }),
        /* @__PURE__ */ e.jsx(G, { title: n("edit", { defaultValue: "Edit" }), children: /* @__PURE__ */ e.jsx(
          _,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(_e, {}),
            onClick: () => te(R)
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          je,
          {
            title: t("models.deleteConfirm", { defaultValue: "Are you sure you want to delete this AI model?" }),
            onConfirm: () => H(R.id),
            okText: n("yes", { defaultValue: "Yes" }),
            cancelText: n("no", { defaultValue: "No" }),
            children: /* @__PURE__ */ e.jsx(G, { title: n("delete", { defaultValue: "Delete" }), children: /* @__PURE__ */ e.jsx(_, { type: "text", danger: !0, icon: /* @__PURE__ */ e.jsx(Ie, {}) }) })
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(J, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(de, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Q, { children: /* @__PURE__ */ e.jsx(
        i.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: j,
          onChange: (d) => b(d.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(Q, { children: /* @__PURE__ */ e.jsxs(O, { children: [
        /* @__PURE__ */ e.jsx(
          _,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ae, {}),
            onClick: r,
            loading: u,
            children: n("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          _,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ve, {}),
            onClick: D,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(J, { children: /* @__PURE__ */ e.jsx(
      ce,
      {
        columns: B,
        dataSource: (T == null ? void 0 : T.data) || [],
        loading: u,
        rowKey: "id",
        pagination: {
          total: (T == null ? void 0 : T.total) || 0,
          current: (T == null ? void 0 : T.current) || 1,
          pageSize: (T == null ? void 0 : T.page_size) || 10,
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
      Y,
      {
        title: m ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: v,
        onCancel: () => {
          c(!1), a.resetFields(), x(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: a,
            layout: "vertical",
            onFinish: se,
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
                    tt,
                    {
                      rows: 3,
                      placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsxs(de, { gutter: 16, children: [
                /* @__PURE__ */ e.jsx(Q, { span: 12, children: /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    name: "provider",
                    label: t("models.provider", { defaultValue: "Provider" }),
                    rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                    children: /* @__PURE__ */ e.jsx(L, { placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }), children: /* @__PURE__ */ e.jsx(st, { value: "openai", children: "OpenAI" }) })
                  }
                ) }),
                /* @__PURE__ */ e.jsx(Q, { span: 12, children: /* @__PURE__ */ e.jsx(
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
                  rules: m ? [] : [{ required: !0, message: t("models.apiKeyRequired", { defaultValue: "Please enter API key" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    i.Password,
                    {
                      placeholder: m ? t("models.apiKeyPlaceholderEdit", { defaultValue: "Leave empty to keep current API key" }) : t("models.apiKeyPlaceholder", { defaultValue: "Enter API key" })
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
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(O, { children: [
                /* @__PURE__ */ e.jsx(
                  _,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: k || E,
                    children: m ? n("update", { defaultValue: "Update" }) : n("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  _,
                  {
                    onClick: () => {
                      c(!1), a.resetFields(), x(null);
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
}, { TextArea: be } = i, { Option: at } = L, ot = () => {
  var pe;
  const { t } = U("system"), { t: n } = U("common"), [a] = l.useForm(), [v, c] = S(!1), [m, x] = S(null), [j, b] = S(""), [o, p] = S(!1), [u, T] = S(null), [r, k] = S(""), [f, E] = S(""), { loading: M, data: F, refresh: V } = C(
    () => w.toolsets.listToolSets({ current: 1, page_size: 100, search: j }),
    {
      refreshDeps: [j],
      onError: (s) => {
        h.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", s);
      }
    }
  ), { loading: z, data: P } = C(
    () => w.toolsets.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (s) => {
        h.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", s);
      }
    }
  ), D = Me(() => P == null ? void 0 : P.find((s) => s.tool_set_type === r), [P, r]), { loading: te, run: se } = C(
    (s) => w.toolsets.createToolSet({
      ...s,
      type: s.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), c(!1), a.resetFields(), V();
      },
      onError: (s) => {
        h.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", s);
      }
    }
  ), { loading: H, run: g } = C(
    ({ id: s, data: y }) => w.toolsets.updateToolSet({ id: s }, {
      ...y,
      type: y.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), c(!1), a.resetFields(), x(null), V();
      },
      onError: (s) => {
        h.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", s);
      }
    }
  ), { run: q } = C(
    (s) => w.toolsets.deleteToolSet({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), V();
      },
      onError: (s) => {
        h.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", s);
      }
    }
  ), { loading: B, run: d } = C(
    (s) => w.toolsets.testToolSet({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        h.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (s) => {
        h.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", s);
      }
    }
  ), R = () => {
    x(null), a.resetFields(), k(""), c(!0);
  }, Se = (s) => {
    x(s), k(s.type);
    const y = { ...s };
    if (y.config) {
      const A = P == null ? void 0 : P.find((I) => I.tool_set_type === s.type);
      if (A) {
        const I = {};
        A.config_fields.forEach(($) => {
          var oe, he;
          $.type === "object" && ((oe = y.config) != null && oe[$.name]) ? I[$.name] = JSON.stringify(y.config[$.name], null, 2) : ((he = y.config) == null ? void 0 : he[$.name]) !== void 0 && (I[$.name] = y.config[$.name]);
        }), y.config = I;
      }
    }
    a.setFieldsValue(y), c(!0);
  };
  console.log(r, P);
  const we = (s) => {
    k(s);
    const y = P == null ? void 0 : P.find((A) => A.tool_set_type === s);
    if (y) {
      const A = {};
      y.config_fields.forEach((I) => {
        if (I.default)
          switch (I.type) {
            case "number":
              A[I.name] = Number(I.default);
              break;
            case "boolean":
              A[I.name] = I.default === "true";
              break;
            case "array":
              A[I.name] = I.default.split(",");
              break;
            default:
              A[I.name] = I.default;
          }
      }), a.setFieldValue("config", A);
    } else
      a.setFieldValue("config", void 0);
  }, Ce = (s) => {
    if (s.config && D) {
      const y = {};
      D.config_fields.forEach((A) => {
        var $;
        const I = ($ = s.config) == null ? void 0 : $[A.name];
        if (I !== void 0)
          if (A.type === "object")
            try {
              y[A.name] = typeof I == "string" ? JSON.parse(I) : I;
            } catch {
              y[A.name] = I;
            }
          else
            y[A.name] = I;
      }), s.config = y;
    }
    m ? g({ id: m.id, data: s }) : se(s);
  }, Te = (s) => {
    q(s);
  }, Fe = (s) => {
    E(s), d(s);
  }, Ae = (s) => {
    T(s), p(!0);
  }, ke = (s) => {
    const y = s.options && s.options.length > 0, A = [
      {
        required: s.required,
        message: t("settings.toolsets.fieldRequired", {
          defaultValue: `Please enter ${s.name}`,
          field: s.name
        })
      }
    ];
    if (!y)
      switch (s.type) {
        case "string":
          return /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${r}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: A,
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
              rules: A,
              tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(
                K,
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
              rules: A,
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
                ...A,
                {
                  validator: (I, $) => {
                    if (!$) return Promise.resolve();
                    try {
                      return JSON.parse($), Promise.resolve();
                    } catch {
                      return Promise.reject(new Error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON format" })));
                    }
                  }
                }
              ],
              tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltips`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(
                be,
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
              rules: A,
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
            rules: A,
            tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
            children: /* @__PURE__ */ e.jsx(L, { allowClear: !0, placeholder: s.placeholder ? t(`settings.toolsets.${r}.${s.name}Placeholder`, { defaultValue: s.description }) : `${t("common.select", { defaultValue: "Select" })} ${s.name}`, children: s.options.map((I) => /* @__PURE__ */ e.jsx(at, { value: I.value, children: I.label }, I.value)) })
          },
          s.name
        );
      case "array":
        return /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: ["config", s.name],
            label: t(`settings.toolsets.${r}.${s.name}`, { defaultValue: s.display_name || s.name }),
            rules: A,
            tooltip: s.description ? t(`settings.toolsets.${r}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
            children: /* @__PURE__ */ e.jsx(ge.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(O, { direction: "vertical", children: s.options.map((I) => /* @__PURE__ */ e.jsx(ge, { value: I.value, children: I.label }, I.value)) }) })
          },
          s.name
        );
      default:
        return null;
    }
  }, Ee = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (s) => /* @__PURE__ */ e.jsx(ee, { color: "blue", children: s.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => /* @__PURE__ */ e.jsx(ee, { color: s === "enabled" ? "green" : "red", children: s === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (s, y) => /* @__PURE__ */ e.jsxs(O, { children: [
        /* @__PURE__ */ e.jsx(G, { title: t("settings.toolsets.test", { defaultValue: "Test Connection" }), children: /* @__PURE__ */ e.jsx(
          _,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(ye, {}),
            loading: B && y.id === f,
            onClick: () => Fe(y.id)
          }
        ) }),
        y.config && Object.keys(y.config).length > 0 && /* @__PURE__ */ e.jsx(G, { title: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }), children: /* @__PURE__ */ e.jsx(
          _,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(De, {}),
            onClick: () => Ae(y.config)
          }
        ) }),
        /* @__PURE__ */ e.jsx(G, { title: n("edit", { defaultValue: "Edit" }), children: /* @__PURE__ */ e.jsx(
          _,
          {
            type: "text",
            icon: /* @__PURE__ */ e.jsx(_e, {}),
            onClick: () => Se(y)
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          je,
          {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: () => Te(y.id),
            okText: n("yes", { defaultValue: "Yes" }),
            cancelText: n("no", { defaultValue: "No" }),
            children: /* @__PURE__ */ e.jsx(G, { title: n("delete", { defaultValue: "Delete" }), children: /* @__PURE__ */ e.jsx(_, { type: "text", danger: !0, icon: /* @__PURE__ */ e.jsx(Ie, {}) }) })
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(J, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(de, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Q, { children: /* @__PURE__ */ e.jsx(
        i.Search,
        {
          placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
          style: { width: 300 },
          value: j,
          onChange: (s) => b(s.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(Q, { children: /* @__PURE__ */ e.jsxs(O, { children: [
        /* @__PURE__ */ e.jsx(
          _,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ae, {}),
            onClick: V,
            loading: M,
            children: n("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          _,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ve, {}),
            onClick: R,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(J, { children: /* @__PURE__ */ e.jsx(
      ce,
      {
        columns: Ee,
        dataSource: (F == null ? void 0 : F.data) || [],
        loading: M,
        rowKey: "id",
        pagination: {
          total: (F == null ? void 0 : F.total) || 0,
          current: (F == null ? void 0 : F.current) || 1,
          pageSize: (F == null ? void 0 : F.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (s, y) => t("common.pagination.total", {
            defaultValue: `${y[0]}-${y[1]} of ${s} items`,
            start: y[0],
            end: y[1],
            total: s
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Y,
      {
        title: m ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: v,
        onCancel: () => {
          c(!1), a.resetFields(), x(null), k("");
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: a,
            layout: "vertical",
            onFinish: Ce,
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
                    be,
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
                      loading: z,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: we,
                      value: r,
                      options: P == null ? void 0 : P.map((s) => ({
                        label: s.name,
                        value: s.tool_set_type
                      }))
                    }
                  )
                }
              ),
              (pe = D == null ? void 0 : D.config_fields) == null ? void 0 : pe.map((s) => ke(s)),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(O, { children: [
                /* @__PURE__ */ e.jsx(
                  _,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: te || H,
                    children: m ? n("update", { defaultValue: "Update" }) : n("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  _,
                  {
                    onClick: () => {
                      c(!1), a.resetFields(), x(null), k("");
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
      Y,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: o,
        onCancel: () => p(!1),
        footer: [
          /* @__PURE__ */ e.jsx(_, { onClick: () => p(!1), children: n("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(u, null, 2) })
      }
    )
  ] });
}, nt = ({
  transformItems: t = (n) => n
}) => {
  const { t: n } = U("system"), a = Ke(), v = Ge(), x = v.hash.replace("#", "") || "base", j = [
    {
      key: "base",
      label: n("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(et, {})
    },
    {
      key: "security",
      label: n("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(We, {})
    },
    {
      key: "oauth",
      label: n("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Ze, {})
    },
    {
      key: "ldap",
      label: n("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Xe, {})
    },
    {
      key: "smtp",
      label: n("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(Ye, {})
    },
    {
      key: "ai-models",
      label: n("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(lt, {})
    },
    {
      key: "ai-toolsets",
      label: n("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(ot, {})
    }
  ];
  return /* @__PURE__ */ e.jsx(J, { title: n("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Ve,
    {
      defaultActiveKey: x,
      onChange: (b) => {
        a(`${v.pathname}#${b}`);
      },
      items: t(j)
    }
  ) });
}, jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nt
}, Symbol.toStringTag, { value: "Module" })), it = () => {
  const { t } = U("system"), [n] = He(), a = n.get("provider"), v = n.get("code"), c = n.get("state"), [m, x] = S(null), [j, b] = S(null), [o, p] = S(null);
  return C(async () => {
    if (!v || !c || !a)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const u = await w.system.testOauthCallback({ code: v, state: c, provider: a });
    if (!u.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!u.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    x(u.user), b(u.user_info);
  }, {
    onSuccess: () => {
      p({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (u) => {
      p({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: u.message
      });
    }
  }), o ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    Re,
    {
      status: o.status,
      title: o.message,
      subTitle: o.error,
      extra: /* @__PURE__ */ e.jsxs(O, { style: { display: !j || !m ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(J, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(xe, { src: j || {} }) }),
        /* @__PURE__ */ e.jsx(J, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(xe, { src: m || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Be, {});
}, yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: it
}, Symbol.toStringTag, { value: "Module" }));
export {
  yt as O,
  jt as i
};
