import { j as e } from "./vendor.js";
import { Form as a, message as m, Spin as se, Switch as B, Select as O, Input as c, Divider as Ce, Alert as Le, Space as D, Button as T, InputNumber as Q, Modal as K, Skeleton as qe, Descriptions as Z, Steps as Me, Tag as G, Table as le, Radio as de, Tabs as Oe, Tooltip as $e, Card as J, Row as ue, Col as X, Checkbox as Ae, Result as Ne } from "antd";
import { useTranslation as M } from "react-i18next";
import { useState as I, useEffect as ce, useMemo as De } from "react";
import { useRequest as S } from "ahooks";
import { SaveOutlined as Fe, ReloadOutlined as ee, LoadingOutlined as Be, CheckCircleTwoTone as Ke, StarFilled as He, CheckCircleOutlined as Ue, StarOutlined as Ge, EditOutlined as me, DeleteOutlined as pe, PlusOutlined as ge, ThunderboltOutlined as Je, ToolOutlined as Ee, SettingOutlined as Ze, LockOutlined as We, EyeOutlined as Qe, ArrowLeftOutlined as Xe } from "@ant-design/icons";
import { a as E } from "./index.js";
import { g as ze } from "./base.js";
import { h as Y, f as Ye, c as he, L as et } from "./components.js";
import we from "react-quill";
import { useNavigate as ke, useLocation as tt, useParams as st, useSearchParams as lt } from "react-router-dom";
import { l as at, c as nt, u as ot, d as it, g as rt, b as dt, e as ut, f as ct, r as mt } from "./system.js";
import { b as pt, a as gt } from "./contexts.js";
import { l as ht, b as ft } from "./authorization.js";
import Pe from "react-json-view";
const te = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, xt = {
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
}, Vt = ({ initialData: t, onRefresh: n }) => {
  const { t: l } = M("system"), { t: v } = M("common"), [g] = a.useForm(), [h, _] = I((t == null ? void 0 : t.provider) || "custom"), [j, V] = I((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [o, i] = I((t == null ? void 0 : t.enabled) || !1), [p, U] = I((t == null ? void 0 : t.auto_create_user) || !1), { loading: f, data: z, refresh: y } = S(E.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (b) => {
      g.setFieldsValue(b), _(b.provider), V(b.provider === "custom" || b.provider === "autoDiscover"), i(b.enabled), U(b.auto_create_user);
    },
    onError: (b) => {
      m.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", b);
    }
  });
  ce(() => {
    t && (g.setFieldsValue(t), _(t.provider), V(t.provider === "custom" || t.provider === "autoDiscover"), i(t.enabled), U(t.auto_create_user));
  }, [t, g]);
  const A = (b) => {
    _(b), V(b === "custom" || b === "autoDiscover");
    const u = xt[b];
    u && g.setFieldsValue({
      auth_endpoint: u.endpoints.auth_endpoint,
      token_endpoint: u.endpoints.token_endpoint,
      userinfo_endpoint: u.endpoints.userinfo_endpoint,
      scope: u.scope,
      // Set field mappings
      email_field: u.email_field,
      username_field: u.username_field,
      full_name_field: u.full_name_field,
      avatar_field: u.avatar_field,
      role_field: u.role_field,
      // Set display configuration
      icon_url: u.icon_url,
      display_name: u.display_name
    });
  }, q = (b) => {
    i(b);
  }, F = (b) => {
    U(b);
  }, { loading: w, run: R } = S(E.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      m.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n ? n() : y();
    },
    onError: (b) => {
      m.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", b);
    }
  }), L = (b) => {
    R(b);
  }, H = () => {
    n ? n() : y();
  }, { loading: r, run: P } = S(async ({ redirect_uri: b, ...u }) => {
    let $;
    return b ? $ = new URL(b) : $ = new URL(window.location.origin), $.pathname = ze("/system/settings/oauth/test-callback"), $.searchParams.set("provider", h), E.system.testOauthConnection({ redirect_uri: $.toString(), ...u });
  }, {
    manual: !0,
    onSuccess: ({ url: b }) => {
      window.open(b, "_blank");
    },
    onError: (b) => {
      m.error(l("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: b.message })), console.error("Failed to test OAuth connection", b);
    }
  }), W = () => h === "custom";
  return /* @__PURE__ */ e.jsx(se, { spinning: f, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: g,
      layout: "vertical",
      onFinish: L,
      initialValues: t || z,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "enabled",
            label: l("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: l("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(B, { onChange: q })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "provider",
            label: l("settings.oauth.provider.label", { defaultValue: "OAuth Provider" }),
            tooltip: l("settings.oauth.provider.tooltip", { defaultValue: "Select an OAuth provider or configure a custom one." }),
            rules: [
              {
                required: o,
                message: l("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(O, { onChange: A, disabled: !o, children: [
              /* @__PURE__ */ e.jsx(O.Option, { value: "github", children: l("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(O.Option, { value: "google", children: l("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(O.Option, { value: "dingtalk", children: l("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(O.Option, { value: "wechat", children: l("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(O.Option, { value: "autoDiscover", children: l("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(O.Option, { value: "custom", children: l("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "display_name",
            label: l("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: l("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              c,
              {
                disabled: !o,
                placeholder: h !== "custom" ? l(`settings.oauth.provider.options.${h}`, { defaultValue: h }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "icon_url",
            label: l("settings.oauth.iconUrl.label", { defaultValue: "Icon URL" }),
            tooltip: l("settings.oauth.iconUrl.tooltip", { defaultValue: "URL of the icon for this provider. Displayed on the login button." }),
            rules: [
              {
                pattern: te,
                message: l("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(c, { disabled: !o, placeholder: "https://example.com/icon.png" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "client_id",
            label: l("settings.oauth.clientId.label", { defaultValue: "Client ID" }),
            tooltip: l("settings.oauth.clientId.tooltip", { defaultValue: "The Client ID provided by the OAuth provider." }),
            rules: [
              {
                required: o,
                message: l("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(c, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "client_secret",
            label: l("settings.oauth.clientSecret.label", { defaultValue: "Client Secret" }),
            tooltip: l("settings.oauth.clientSecret.tooltip", { defaultValue: "The Client Secret provided by the OAuth provider. This will be stored encrypted." }),
            rules: [
              {
                required: o,
                message: l("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(c.Password, { disabled: !o, autoComplete: "off", visibilityToggle: !1, placeholder: l("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        W() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auth_endpoint",
            label: l("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: l("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && h === "custom",
                message: l("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: te,
                message: l("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(c, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "wellknown_endpoint",
            hidden: h !== "autoDiscover",
            label: l("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: l("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: te,
                message: l("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: o && h === "autoDiscover",
                message: l("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(c, { disabled: !o })
          }
        ),
        W() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "token_endpoint",
            label: l("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: l("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && h === "custom",
                message: l("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: te,
                message: l("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(c, { disabled: !o })
          }
        ),
        W() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "userinfo_endpoint",
            label: l("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: l("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && h === "custom",
                message: l("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: te,
                message: l("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(c, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "scope",
            label: l("settings.oauth.scope.label", { defaultValue: "Authorization Scope" }),
            tooltip: l("settings.oauth.scope.tooltip", { defaultValue: "The scopes to request from the OAuth provider, separated by spaces." }),
            rules: [
              {
                required: o,
                message: l("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(c, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "redirect_uri",
            label: l("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: l("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(b) => b.getFieldValue("redirect_uri") !== "" ? {
              pattern: te,
              message: l("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(c, { disabled: !o, placeholder: `http://${window.location.host}${ze(`/login?provider=settings.${h}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auto_create_user",
            label: l("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: l("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(B, { onChange: F, disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "default_role",
            label: l("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: l("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: o && p,
                message: l("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(c, { disabled: !o || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "mfa_enabled",
            label: l("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: l("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(B, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(Ce, { children: l("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Le,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: l("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: j ? "" : l("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "email_field",
            label: l("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: l("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(c, { placeholder: "email", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "username_field",
            label: l("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: l("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(c, { placeholder: "login", autoComplete: "off", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "full_name_field",
            label: l("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: l("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(c, { placeholder: "name", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "avatar_field",
            label: l("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: l("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(c, { placeholder: "avatar_url", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_field",
            label: l("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: l("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(c, { placeholder: "role", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            T,
            {
              type: "primary",
              htmlType: "submit",
              loading: w,
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              children: v("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            T,
            {
              loading: r,
              onClick: async () => {
                const b = g.getFieldsValue();
                P(b);
              },
              children: l("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            T,
            {
              onClick: H,
              icon: /* @__PURE__ */ e.jsx(ee, {}),
              children: v("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, yt = () => {
  const { t } = M("system"), { t: n } = M("common"), [l] = a.useForm(), { loading: v, data: g, refresh: h } = S(E.system.getSecuritySettings, {
    onSuccess: (o) => {
      l.setFieldsValue(o);
    },
    onError: (o) => {
      m.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: _, run: j } = S(E.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      m.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), h();
    },
    onError: (o) => {
      m.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), V = (o) => {
    j(o);
  };
  return /* @__PURE__ */ e.jsx(se, { spinning: v, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: l,
      layout: "vertical",
      onFinish: V,
      initialValues: g,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(B, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_complexity",
            label: t("settings.security.passwordComplexity.label", { defaultValue: "Password Complexity" }),
            tooltip: t("settings.security.passwordComplexity.tooltip", { defaultValue: "Define the complexity requirements for user passwords." }),
            children: /* @__PURE__ */ e.jsxs(O, { children: [
              /* @__PURE__ */ e.jsx(O.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(O.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(O.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(O.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_min_length",
            label: t("settings.security.passwordMinLength.label", { defaultValue: "Minimum Password Length" }),
            tooltip: t("settings.security.passwordMinLength.tooltip", { defaultValue: "The minimum number of characters required for a password." }),
            rules: [{ type: "number", min: 6, max: 32 }],
            children: /* @__PURE__ */ e.jsx(Q, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(Q, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(B, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, i) => o.login_failure_lock !== i.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(Q, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, i) => o.login_failure_lock !== i.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(Q, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "history_password_check",
            label: t("settings.security.historyPasswordCheck.label", { defaultValue: "Enforce Password History Policy" }),
            valuePropName: "checked",
            tooltip: t("settings.security.historyPasswordCheck.tooltip", { defaultValue: "Prevent users from reusing recent passwords." }),
            children: /* @__PURE__ */ e.jsx(B, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, i) => o.history_password_check !== i.history_password_check,
            children: ({ getFieldValue: o }) => o("history_password_check") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(Q, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "inactive_account_lock_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(Q, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(Q, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(Q, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            T,
            {
              type: "primary",
              htmlType: "submit",
              loading: _,
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              children: n("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            T,
            {
              onClick: () => h(),
              icon: /* @__PURE__ */ e.jsx(ee, {}),
              children: n("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, bt = ({ fetchItems: t, importItems: n, columns: l, ...v }) => {
  const { t: g } = M("system"), [h, _] = I([]), [j, V] = I([]), { run: o, loading: i } = S(t, {
    onError: (f) => {
      m.error(g("settings.ldap.importError", { error: `${f.message}` }));
    },
    onSuccess: (f) => {
      _(f);
    },
    manual: !0
  }), { run: p, loading: U } = S(async () => {
    for (const f of j.filter((z) => {
      const y = h.find((A) => A.ldap_dn === z);
      return !(!y || y.status === "imported");
    })) {
      const z = await n([f]);
      _((y) => [...y].map((q) => {
        for (const F of z)
          if (q.ldap_dn === F.ldap_dn)
            return { ...F, status: "imported" };
        return q;
      }));
    }
  }, {
    manual: !0
  });
  return ce(() => {
    v.visible && (_([]), o(), V([]));
  }, [v.visible]), /* @__PURE__ */ e.jsx(
    K,
    {
      title: g("settings.ldap.importTitle"),
      ...v,
      onOk: () => {
        p();
      },
      width: 900,
      confirmLoading: U,
      loading: i,
      children: /* @__PURE__ */ e.jsx(
        le,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (f) => {
              V(f);
            },
            getCheckboxProps: (f) => ({
              disabled: f.status === "imported"
            })
          },
          columns: l.map(({ render: f, ...z }) => f ? {
            ...z,
            render: (y, A, q) => {
              const F = j.includes(A.ldap_dn) && U && A.status !== "imported";
              return f(y, A, q, F);
            }
          } : z),
          dataSource: h,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, jt = () => {
  var A, q, F;
  const { t } = M("system"), [n] = a.useForm(), [l, v] = I(!1), [g, h] = I(null), [_, j] = I(!1), [V, o] = I(!1), [i] = a.useForm(), [p, U] = I(!1);
  S(E.system.getLdapSettings, {
    onSuccess: (w) => {
      n.setFieldsValue(w), U(w.enabled);
    },
    onError: (w) => {
      m.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${w.message}` }));
    }
  }), ce(() => {
    h(null);
  }, [_]);
  const f = async (w) => {
    v(!0);
    try {
      await E.system.updateLdapSettings(w), m.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      m.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      v(!1);
    }
  }, { run: z, loading: y } = S(async (w) => {
    const R = await n.validateFields();
    return await E.system.testLdapConnection({
      ...w,
      ...R
    });
  }, {
    onSuccess: (w) => {
      h(w);
    },
    onError: (w) => {
      m.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${w.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      a,
      {
        form: n,
        layout: "vertical",
        onFinish: f,
        initialValues: {
          user_attr: "uid",
          email_attr: "mail",
          display_name_attr: "displayName",
          default_role: "user"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(B, { onChange: (w) => U(w) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: p, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(c, { disabled: !p, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: p, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(c, { disabled: !p, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: p, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(c.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: p, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(c, { disabled: !p, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(c, { disabled: !p, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: p, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(c, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: p, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(c, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: p, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(c, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: p, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(c, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(c, { type: "number", defaultValue: 15, disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(Ce, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(B, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(B, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(c.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(c.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(c.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(Y, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(T, { type: "primary", htmlType: "submit", loading: l, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(Y, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              T,
              {
                disabled: !p,
                style: { marginLeft: 8 },
                onClick: () => j(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(Y, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              T,
              {
                disabled: !p,
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
      K,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: _,
        onCancel: () => j(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            a,
            {
              form: i,
              layout: "vertical",
              onFinish: z,
              children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(c, { disabled: !p })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(c.Password, { disabled: !p })
                  }
                ),
                /* @__PURE__ */ e.jsxs(a.Item, { children: [
                  /* @__PURE__ */ e.jsx(Y, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(T, { disabled: !p, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    T,
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
          /* @__PURE__ */ e.jsx(se, { spinning: y, children: /* @__PURE__ */ e.jsx(qe, { active: y, loading: y, children: g && (g.user ? /* @__PURE__ */ e.jsxs(Z, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(Z.Item, { label: "Username", span: 3, children: g.user.username }),
            /* @__PURE__ */ e.jsx(Z.Item, { label: "Email", span: 3, children: g.user.email }),
            /* @__PURE__ */ e.jsx(Z.Item, { label: "FullName", span: 3, children: g.user.full_name }),
            /* @__PURE__ */ e.jsx(Z.Item, { label: "CreatedAt", span: 3, children: g.user.created_at }),
            /* @__PURE__ */ e.jsx(Z.Item, { label: "UpdatedAt", span: 3, children: g.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Me,
            {
              direction: "vertical",
              current: (A = g.message) == null ? void 0 : A.findIndex((w) => !w.success),
              status: (q = g.message) != null && q.find((w) => !w.success) ? "error" : "finish",
              items: (F = g.message) == null ? void 0 : F.map((w) => ({
                status: w.success ? "finish" : "error",
                title: w.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      bt,
      {
        visible: V,
        onCancel: () => o(!1),
        fetchItems: () => E.system.importLdapUsers({}),
        importItems: (w) => E.system.importLdapUsers({ user_dn: w }),
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
          render: (w, R, L, H) => H ? /* @__PURE__ */ e.jsx(se, { indicator: /* @__PURE__ */ e.jsx(Be, { spin: !0 }) }) : w ? /* @__PURE__ */ e.jsx(Ke, { twoToneColor: "#52c41a" }) : R.id ? /* @__PURE__ */ e.jsx(G, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(G, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, vt = () => {
  const { t } = M("system"), { t: n } = M("common"), [l] = a.useForm(), [v, g] = I(null), [h, _] = I(!1), [j] = a.useForm(), [V, o] = I(!1), { loading: i } = S(E.system.getSmtpSettings, {
    onSuccess: (y) => {
      l.setFieldsValue(y), o(y.enabled);
    },
    onError: (y) => {
      m.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${y.message}` }));
    }
  });
  ce(() => {
    g(null);
  }, [h]);
  const { run: p, loading: U } = S(({ port: y, ...A }) => E.system.updateSmtpSettings({ ...A, port: Number(y) }), {
    manual: !0,
    onSuccess: () => {
      m.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (y) => {
      m.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${y.message}` }));
    }
  }), { run: f, loading: z } = S(async (y) => {
    const { port: A, ...q } = await l.validateFields();
    return await E.system.testSmtpConnection({
      ...y,
      ...q,
      port: Number(A)
    });
  }, {
    onSuccess: (y) => {
      g(y);
    },
    onError: (y) => {
      m.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${y.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(se, { spinning: i, children: /* @__PURE__ */ e.jsxs(
      a,
      {
        form: l,
        layout: "vertical",
        onFinish: p,
        initialValues: {
          port: 587,
          encryption: "STARTTLS"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(B, { onChange: (y) => o(y) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: V, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(c, { disabled: !V, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: V, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(c, { type: "number", disabled: !V, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: V, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(c, { disabled: !V, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(c.Password, { disabled: !V, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: V, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(de.Group, { disabled: !V, children: [
                /* @__PURE__ */ e.jsx(de.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(de.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(de.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: V, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(c, { disabled: !V, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(c, { disabled: !V, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(Ce, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(we, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(we, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(we, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(Y, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(T, { type: "primary", htmlType: "submit", loading: U, style: { marginRight: 8 }, children: n("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              T,
              {
                onClick: () => _(!0),
                disabled: !V || z,
                loading: z,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      K,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: h,
        onCancel: () => _(!1),
        footer: [
          /* @__PURE__ */ e.jsx(T, { onClick: () => _(!1), children: n("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(T, { type: "primary", loading: z, onClick: () => j.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: j,
            layout: "vertical",
            onFinish: (y) => f(y),
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  label: t("settings.smtp.testEmailRecipient", { defaultValue: "Recipient Email Address" }),
                  name: "to",
                  rules: [
                    { required: !0, message: t("settings.smtp.testEmailRecipientRequired", { defaultValue: "Recipient email address is required." }) },
                    { type: "email", message: t("settings.smtp.testEmailRecipientInvalid", { defaultValue: "Invalid email address." }) }
                  ],
                  children: /* @__PURE__ */ e.jsx(c, { placeholder: "test@example.com" })
                }
              ),
              v && /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: v.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: v.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, _t = () => {
  const { t, i18n: n } = M("system"), { t: l } = M("common"), [v] = a.useForm(), { loading: g, data: h, refresh: _ } = S(E.system.getSystemBaseSettings, {
    onSuccess: (i) => {
      v.setFieldsValue(i);
    },
    onError: (i) => {
      m.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", i);
    }
  }), { loading: j, run: V } = S(E.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      m.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), _();
    },
    onError: (i) => {
      m.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", i);
    }
  }), o = (i) => {
    V(i);
  };
  return /* @__PURE__ */ e.jsx(se, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: v,
      layout: "vertical",
      onFinish: o,
      initialValues: h,
      children: [
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Oe, { items: [{
          key: "default",
          label: l("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", children: /* @__PURE__ */ e.jsx(c, {}) }) })
        }, ...Ye.map((i) => ({
          key: i.lang,
          label: n.language !== i.lang ? l(`language.${i.lang}`, { defaultValue: i.label, lang: i.label }) : i.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: ["name_i18n", i.lang], children: /* @__PURE__ */ e.jsx(c, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(c, {}) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(c, {}) }),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(B, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(B, {})
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            T,
            {
              type: "primary",
              htmlType: "submit",
              loading: j,
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            T,
            {
              onClick: () => _(),
              icon: /* @__PURE__ */ e.jsx(ee, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: St } = c, { Option: It } = O, wt = () => {
  const { t } = M("ai"), { t: n } = M("common"), [l] = a.useForm(), [v, g] = I(!1), [h, _] = I(null), [j, V] = I(""), { loading: o, data: i, refresh: p } = S(
    () => E.ai.listAiModels({ current: 1, page_size: 100, search: j }),
    {
      refreshDeps: [j],
      onError: (r) => {
        m.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", r);
      }
    }
  ), { loading: U, run: f } = S(
    (r) => E.ai.createAiModel(r),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), g(!1), l.resetFields(), p();
      },
      onError: (r) => {
        m.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", r);
      }
    }
  ), { loading: z, run: y } = S(
    ({ id: r, data: P }) => E.ai.updateAiModel({ id: r }, P),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), g(!1), l.resetFields(), _(null), p();
      },
      onError: (r) => {
        m.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", r);
      }
    }
  ), { runAsync: A } = S(
    (r) => E.ai.deleteAiModel({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), p();
      },
      onError: (r) => {
        m.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", r);
      }
    }
  ), { runAsync: q } = S(
    (r) => E.ai.testAiModel({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (r) => {
        m.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", r);
      }
    }
  ), { runAsync: F } = S(
    (r) => E.ai.setDefaultAiModel({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), p();
      },
      onError: (r) => {
        m.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", r);
      }
    }
  ), w = () => {
    _(null), l.resetFields(), g(!0);
  }, R = (r) => {
    _(r), l.setFieldsValue({
      ...r,
      api_key: ""
      // Don't populate API key for security
    }), g(!0);
  }, L = (r) => {
    h ? y({ id: h.id, data: r }) : f(r);
  }, H = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (r, P) => /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx("span", { children: r }),
        P.is_default && /* @__PURE__ */ e.jsx($e, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(He, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (r) => /* @__PURE__ */ e.jsx(G, { color: "blue", children: r.toUpperCase() })
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
      render: (r) => /* @__PURE__ */ e.jsx(G, { color: r === "enabled" ? "green" : "red", children: r === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (r, P) => /* @__PURE__ */ e.jsx(he, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Ue, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => q(P.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(Ge, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => F(P.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(me, {}),
          tooltip: n("edit", { defaultValue: "Edit" }),
          onClick: async () => R(P)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(pe, {}),
          tooltip: n("delete", { defaultValue: "Delete" }),
          onClick: async () => A(P.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(J, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ue, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsx(
        c.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: j,
          onChange: (r) => V(r.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(
          T,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ee, {}),
            onClick: p,
            loading: o,
            children: n("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(Y, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          T,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ge, {}),
            onClick: w,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(J, { children: /* @__PURE__ */ e.jsx(
      le,
      {
        columns: H,
        dataSource: (i == null ? void 0 : i.data) || [],
        loading: o,
        rowKey: "id",
        pagination: {
          total: (i == null ? void 0 : i.total) || 0,
          current: (i == null ? void 0 : i.current) || 1,
          pageSize: (i == null ? void 0 : i.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (r, P) => t("common.pagination.total", {
            defaultValue: `${P[0]}-${P[1]} of ${r} items`,
            start: P[0],
            end: P[1],
            total: r
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      K,
      {
        title: h ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: v,
        onCancel: () => {
          g(!1), l.resetFields(), _(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: l,
            layout: "vertical",
            onFinish: L,
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(c, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    St,
                    {
                      rows: 3,
                      placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsxs(ue, { gutter: 16, children: [
                /* @__PURE__ */ e.jsx(X, { span: 12, children: /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "provider",
                    label: t("models.provider", { defaultValue: "Provider" }),
                    rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                    children: /* @__PURE__ */ e.jsx(O, { placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }), children: /* @__PURE__ */ e.jsx(It, { value: "openai", children: "OpenAI" }) })
                  }
                ) }),
                /* @__PURE__ */ e.jsx(X, { span: 12, children: /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "model_id",
                    label: t("models.modelId", { defaultValue: "Model ID" }),
                    rules: [{ required: !0, message: t("models.modelIdRequired", { defaultValue: "Please enter model ID" }) }],
                    children: /* @__PURE__ */ e.jsx(c, { placeholder: "gpt-4, gpt-3.5-turbo, etc." })
                  }
                ) })
              ] }),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "api_key",
                  label: t("models.apiKey", { defaultValue: "API Key" }),
                  rules: h ? [] : [{ required: !0, message: t("models.apiKeyRequired", { defaultValue: "Please enter API key" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    c.Password,
                    {
                      placeholder: h ? t("models.apiKeyPlaceholderEdit", { defaultValue: "Leave empty to keep current API key" }) : t("models.apiKeyPlaceholder", { defaultValue: "Enter API key" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "base_url",
                  label: t("models.baseUrl", { defaultValue: "Base URL" }),
                  children: /* @__PURE__ */ e.jsx(c, { placeholder: t("models.baseUrlPlaceholder", { defaultValue: "Optional: Custom API endpoint" }) })
                }
              ),
              /* @__PURE__ */ e.jsxs(
                a.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(B, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
                /* @__PURE__ */ e.jsx(
                  T,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: U || z,
                    children: h ? n("update", { defaultValue: "Update" }) : n("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  T,
                  {
                    onClick: () => {
                      g(!1), l.resetFields(), _(null);
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
}, { TextArea: Re } = c, { Option: Ct } = O, Ft = () => {
  var d;
  const { t } = M("system"), { t: n } = M("common"), [l] = a.useForm(), [v, g] = I(!1), [h, _] = I(null), [j, V] = I(""), [o, i] = I(!1), [p, U] = I(null), [f, z] = I(""), [y, A] = I(!1), [q, F] = I([]), { loading: w, data: R, refresh: L } = S(
    () => E.system.listToolSets({ current: 1, page_size: 100, search: j }),
    {
      refreshDeps: [j],
      onError: (s) => {
        m.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", s);
      }
    }
  ), { loading: H, data: r } = S(
    () => E.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (s) => {
        m.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", s);
      }
    }
  ), P = De(() => r == null ? void 0 : r.find((s) => s.tool_set_type === f), [r, f]), { loading: W, run: b } = S(
    (s) => E.system.createToolSet({
      ...s,
      type: s.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), g(!1), l.resetFields(), L();
      },
      onError: (s) => {
        m.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", s);
      }
    }
  ), { loading: u, run: $ } = S(
    ({ id: s, data: x }) => E.system.updateToolSet({ id: s }, {
      ...x,
      type: x.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), g(!1), l.resetFields(), _(null), L();
      },
      onError: (s) => {
        m.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", s);
      }
    }
  ), { run: fe } = S(
    (s) => E.system.deleteToolSet({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), L();
      },
      onError: (s) => {
        m.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", s);
      }
    }
  ), { runAsync: xe } = S(
    (s) => E.system.testToolSet({ id: s }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (s) => {
        m.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", s);
      }
    }
  ), { loading: Ve, runAsync: ye } = S(
    (s) => E.system.getToolSetTools({ id: s }),
    {
      manual: !0,
      onSuccess: (s) => {
        F(s || []), A(!0);
      },
      onError: (s) => {
        m.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", s);
      }
    }
  ), { runAsync: be } = S(
    ({ id: s, status: x }) => E.system.updateToolSetStatus({ id: s }, { status: x }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), L();
      },
      onError: (s) => {
        m.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", s);
      }
    }
  ), je = () => {
    _(null), l.resetFields(), z(""), g(!0);
  }, ve = (s) => {
    _(s), z(s.type);
    const x = { ...s };
    if (x.config) {
      const k = r == null ? void 0 : r.find((C) => C.tool_set_type === s.type);
      if (k) {
        const C = {};
        k.config_fields.forEach((N) => {
          var re, Te;
          N.type === "object" && ((re = x.config) != null && re[N.name]) ? C[N.name] = JSON.stringify(x.config[N.name], null, 2) : ((Te = x.config) == null ? void 0 : Te[N.name]) !== void 0 && (C[N.name] = x.config[N.name]);
        }), x.config = C;
      }
    }
    l.setFieldsValue(x), g(!0);
  };
  console.log(f, r);
  const _e = (s) => {
    z(s);
    const x = r == null ? void 0 : r.find((k) => k.tool_set_type === s);
    if (x) {
      const k = {};
      x.config_fields.forEach((C) => {
        if (C.default)
          switch (C.type) {
            case "number":
              k[C.name] = Number(C.default);
              break;
            case "boolean":
              k[C.name] = C.default === "true";
              break;
            case "array":
              k[C.name] = C.default.split(",");
              break;
            default:
              k[C.name] = C.default;
          }
      }), l.setFieldValue("config", k);
    } else
      l.setFieldValue("config", void 0);
  }, Se = (s) => {
    if (s.config && P) {
      const x = {};
      P.config_fields.forEach((k) => {
        var N;
        const C = (N = s.config) == null ? void 0 : N[k.name];
        if (C !== void 0)
          if (k.type === "object")
            try {
              x[k.name] = typeof C == "string" ? JSON.parse(C) : C;
            } catch {
              x[k.name] = C;
            }
          else
            x[k.name] = C;
      }), s.config = x;
    }
    h ? $({ id: h.id, data: s }) : b(s);
  }, ae = (s) => {
    fe(s);
  }, Ie = (s) => {
    U(s), i(!0);
  }, ne = (s) => {
    console.log(/* @__PURE__ */ new Date(), "handleToggleStatus");
    const x = s.status === "enabled" ? "disabled" : "enabled";
    return be({ id: s.id, status: x }).then(() => {
      console.log(/* @__PURE__ */ new Date(), "handleToggleStatus1");
    });
  }, oe = (s) => {
    const x = s.options && s.options.length > 0, k = [
      {
        required: s.required,
        message: t("settings.toolsets.fieldRequired", {
          defaultValue: `Please enter ${s.name}`,
          field: s.name
        })
      }
    ];
    if (!x)
      switch (s.type) {
        case "text":
          return /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${f}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: k,
              children: /* @__PURE__ */ e.jsx(c.TextArea, { placeholder: t(`settings.toolsets.${f}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name}` }) })
            },
            s.name
          );
        case "string":
          return /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${f}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: k,
              tooltip: s.description ? t(`settings.toolsets.${f}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(c, { placeholder: t(`settings.toolsets.${f}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name}` }) })
            },
            s.name
          );
        case "number":
          return /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${f}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: k,
              tooltip: s.description ? t(`settings.toolsets.${f}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(
                Q,
                {
                  style: { width: "100%" },
                  placeholder: t(`settings.toolsets.${f}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name}` })
                }
              )
            },
            s.name
          );
        case "boolean":
          return /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${f}.${s.name}`, { defaultValue: s.display_name || s.name }),
              valuePropName: "checked",
              tooltip: s.description ? t(`settings.toolsets.${f}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(B, {})
            },
            s.name
          );
        case "array":
          return /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${f}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: k,
              tooltip: s.description ? t(`settings.toolsets.${f}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(
                O,
                {
                  mode: "tags",
                  style: { width: "100%" },
                  placeholder: t(`settings.toolsets.${f}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name}` }),
                  tokenSeparators: [","]
                }
              )
            },
            s.name
          );
        case "object":
          return /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${f}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: [
                ...k,
                {
                  validator: (C, N) => {
                    if (!N) return Promise.resolve();
                    try {
                      return JSON.parse(N), Promise.resolve();
                    } catch {
                      return Promise.reject(new Error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON format" })));
                    }
                  }
                }
              ],
              tooltip: s.description ? t(`settings.toolsets.${f}.${s.name}Tooltips`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(
                Re,
                {
                  rows: 4,
                  placeholder: t(`settings.toolsets.${f}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name} (JSON format)` })
                }
              )
            },
            s.name
          );
        case "password":
          return /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: ["config", s.name],
              label: t(`settings.toolsets.${f}.${s.name}`, { defaultValue: s.display_name || s.name }),
              rules: k,
              tooltip: s.description ? t(`settings.toolsets.${f}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
              children: /* @__PURE__ */ e.jsx(c.Password, { placeholder: t(`settings.toolsets.${f}.${s.name}Placeholder`, { defaultValue: s.placeholder || `${t("common.enter", { defaultValue: "Enter" })} ${s.name}` }), autoComplete: "new-password" })
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
          a.Item,
          {
            name: ["config", s.name],
            label: t(`settings.toolsets.${f}.${s.name}`, { defaultValue: s.display_name || s.name }),
            rules: k,
            tooltip: s.description ? t(`settings.toolsets.${f}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
            children: /* @__PURE__ */ e.jsx(O, { allowClear: !0, placeholder: s.placeholder ? t(`settings.toolsets.${f}.${s.name}Placeholder`, { defaultValue: s.description }) : `${t("common.select", { defaultValue: "Select" })} ${s.name}`, children: s.options.map((C) => /* @__PURE__ */ e.jsx(Ct, { value: C.value, children: C.label }, C.value)) })
          },
          s.name
        );
      case "array":
        return /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: ["config", s.name],
            label: t(`settings.toolsets.${f}.${s.name}`, { defaultValue: s.display_name || s.name }),
            rules: k,
            tooltip: s.description ? t(`settings.toolsets.${f}.${s.name}Tooltip`, { defaultValue: s.description }) : void 0,
            children: /* @__PURE__ */ e.jsx(Ae.Group, { style: { width: "100%" }, children: /* @__PURE__ */ e.jsx(D, { direction: "vertical", children: s.options.map((C) => /* @__PURE__ */ e.jsx(Ae, { value: C.value, children: C.label }, C.value)) }) })
          },
          s.name
        );
      default:
        return null;
    }
  };
  console.log(R);
  const ie = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (s) => /* @__PURE__ */ e.jsx(G, { color: "blue", children: s.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (s) => /* @__PURE__ */ e.jsx(G, { color: s === "enabled" ? "green" : "red", children: s === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (s, x) => /* @__PURE__ */ e.jsx(he, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(Je, {}),
          onClick: async () => xe(x.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => ye(x.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(Ze, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => Ie(x.config),
          disabled: !x.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(me, {}),
          onClick: async () => ve(x)
        },
        {
          key: "toggleStatus",
          icon: x.status === "enabled" ? /* @__PURE__ */ e.jsx(We, {}) : /* @__PURE__ */ e.jsx(Ue, {}),
          onClick: async () => ne(x),
          permission: "system:toolsets:update",
          tooltip: x.status === "enabled" ? n("disable", { defaultValue: "Disable" }) : n("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(pe, {}),
          permission: "system:toolsets:delete",
          tooltip: n("delete", { defaultValue: "Delete" }),
          onClick: async () => ae(x.id),
          danger: !0,
          confirm: {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => ae(x.id),
            okText: n("confirm", { defaultValue: "Confirm" }),
            cancelText: n("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(J, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ue, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsx(
        c.Search,
        {
          placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
          style: { width: 300 },
          value: j,
          onChange: (s) => V(s.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(
          T,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ee, {}),
            onClick: L,
            loading: w,
            children: n("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(Y, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          T,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ge, {}),
            onClick: je,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(J, { children: /* @__PURE__ */ e.jsx(
      le,
      {
        columns: ie,
        dataSource: (R == null ? void 0 : R.data) || [],
        loading: w,
        rowKey: "id",
        pagination: {
          total: (R == null ? void 0 : R.total) || 0,
          current: (R == null ? void 0 : R.current) || 1,
          pageSize: (R == null ? void 0 : R.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (s, x) => t("common.pagination.total", {
            defaultValue: `${x[0]}-${x[1]} of ${s} items`,
            start: x[0],
            end: x[1],
            total: s
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      K,
      {
        title: h ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: v,
        onCancel: () => {
          g(!1), l.resetFields(), _(null), z("");
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: l,
            layout: "vertical",
            onFinish: Se,
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(c, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: t("settings.toolsets.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Re,
                    {
                      rows: 3,
                      placeholder: t("settings.toolsets.descriptionPlaceholder", { defaultValue: "Enter toolset description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "type",
                  label: t("settings.toolsets.type", { defaultValue: "Type" }),
                  rules: [{ required: !0, message: t("settings.toolsets.typeRequired", { defaultValue: "Please select type" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    O,
                    {
                      loading: H,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: _e,
                      value: f,
                      options: r == null ? void 0 : r.map((s) => ({
                        label: s.name,
                        value: s.tool_set_type
                      }))
                    }
                  )
                }
              ),
              (d = P == null ? void 0 : P.config_fields) == null ? void 0 : d.map((s) => oe(s)),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(D, { children: [
                /* @__PURE__ */ e.jsx(
                  T,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: W || u,
                    children: h ? n("update", { defaultValue: "Update" }) : n("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  T,
                  {
                    onClick: () => {
                      g(!1), l.resetFields(), _(null), z("");
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
      K,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: o,
        onCancel: () => i(!1),
        footer: [
          /* @__PURE__ */ e.jsx(T, { onClick: () => i(!1), children: n("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(p, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      K,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: y,
        onCancel: () => A(!1),
        footer: [
          /* @__PURE__ */ e.jsx(T, { onClick: () => A(!1), children: n("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: Ve ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ee, { style: { fontSize: 24 }, spin: !0 }) }) : q.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : q.map((s, x) => {
          var k, C, N;
          return /* @__PURE__ */ e.jsx(
            J,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(D, { children: [
                /* @__PURE__ */ e.jsx(Ee, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((k = s.function) == null ? void 0 : k.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(ue, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(X, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((C = s.function) == null ? void 0 : C.description) || "-" })
                ] }),
                ((N = s.function) == null ? void 0 : N.parameters) && /* @__PURE__ */ e.jsxs(X, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(s.function.parameters, null, 2) })
                ] })
              ] })
            },
            x
          );
        }) })
      }
    )
  ] });
}, { TextArea: kt } = c, Tt = () => {
  const t = ke(), { t: n } = M("system"), { t: l } = M("common"), [v] = a.useForm(), [g, h] = I(!1), [_, j] = I(null), [V, o] = I(""), [i, p] = I(1), [U, f] = I(10), { loading: z, data: y, refresh: A } = S(
    () => at({ current: i, page_size: U, search: V }),
    {
      refreshDeps: [i, U, V],
      onError: (u) => {
        m.error(n("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", u);
      }
    }
  ), { loading: q, run: F } = S(
    (u) => nt(u),
    {
      manual: !0,
      onSuccess: () => {
        m.success(n("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), h(!1), v.resetFields(), j(null), A();
      },
      onError: (u) => {
        m.error((u == null ? void 0 : u.err) || n("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: w, run: R } = S(
    ({ id: u, ...$ }) => ot({ id: u }, $),
    {
      manual: !0,
      onSuccess: () => {
        m.success(n("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), h(!1), v.resetFields(), j(null), A();
      },
      onError: (u) => {
        m.error((u == null ? void 0 : u.err) || n("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: L } = S(
    (u) => it({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(n("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), A();
      },
      onError: (u) => {
        m.error((u == null ? void 0 : u.err) || n("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), H = () => {
    j(null), v.resetFields(), v.setFieldsValue({ status: "active" }), h(!0);
  }, r = (u) => {
    j(u), v.setFieldsValue({
      name: u.name,
      description: u.description,
      status: u.status
    }), h(!0);
  }, P = (u) => {
    K.confirm({
      title: n("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: n("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${u.name}"? This action cannot be undone.`
      }),
      onOk: () => L(u.id)
    });
  }, W = () => {
    v.validateFields().then((u) => {
      _ ? R({ id: _.id, ...u }) : F(u);
    });
  }, b = [
    {
      title: n("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: n("settings.organizations.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: n("settings.organizations.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (u) => /* @__PURE__ */ e.jsx(G, { color: u === "active" ? "green" : "default", children: u === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : n("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (u, $) => /* @__PURE__ */ e.jsx(
        he,
        {
          actions: [
            {
              key: "view",
              label: l("view", { defaultValue: "View" }),
              icon: /* @__PURE__ */ e.jsx(Qe, {}),
              onClick: async () => t(`/system/settings/organizations/${$.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              label: l("edit", { defaultValue: "Edit" }),
              icon: /* @__PURE__ */ e.jsx(me, {}),
              onClick: async () => r($),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              label: l("delete", { defaultValue: "Delete" }),
              icon: /* @__PURE__ */ e.jsx(pe, {}),
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
    J,
    {
      title: n("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx(ee, {}), onClick: A, children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(Y, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(T, { type: "primary", icon: /* @__PURE__ */ e.jsx(ge, {}), onClick: H, children: n("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(D, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            c.Search,
            {
              placeholder: n("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (u) => {
                o(u), p(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            le,
            {
              columns: b,
              dataSource: (y == null ? void 0 : y.data) || [],
              loading: z,
              rowKey: "id",
              pagination: {
                current: i,
                pageSize: U,
                total: (y == null ? void 0 : y.total) || 0,
                showSizeChanger: !0,
                showTotal: (u) => l("pagination.total", { defaultValue: `Total ${u} items` }),
                onChange: (u, $) => {
                  p(u), f($);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          K,
          {
            title: _ ? n("settings.organizations.edit", { defaultValue: "Edit Organization" }) : n("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: g,
            onOk: W,
            onCancel: () => {
              h(!1), v.resetFields(), j(null);
            },
            confirmLoading: q || w,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(a, { form: v, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: n("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: n("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(c, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: n("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(kt, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "status",
                  label: n("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(O, { children: [
                    /* @__PURE__ */ e.jsx(O.Option, { value: "active", children: n("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(O.Option, { value: "disabled", children: n("settings.organizations.disabled", { defaultValue: "Disabled" }) })
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
  transformItems: t = (n) => n
}) => {
  const { t: n } = M("system"), l = ke(), v = tt(), _ = v.hash.replace("#", "") || "base", { enableMultiOrg: j } = pt(), { hasPermission: V } = gt(), o = [
    {
      key: "base",
      label: n("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(_t, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "security",
      label: n("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(yt, {}),
      hidden: !V("system:security:update")
    },
    {
      key: "oauth",
      label: n("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Vt, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "ldap",
      label: n("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(jt, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "smtp",
      label: n("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(vt, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "ai-models",
      label: n("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(wt, {}),
      hidden: !V("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: n("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(Ft, {}),
      hidden: !V("system:toolsets:view")
    },
    // Only show organization tab if multi-org is enabled
    ...j ? [{
      key: "organizations",
      label: n("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Tt, {}),
      hidden: !V("system:organization:view")
    }] : []
  ];
  return console.log(o, V("system:settings:update")), /* @__PURE__ */ e.jsx(J, { title: n("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Oe,
    {
      defaultActiveKey: _,
      onChange: (i) => {
        l(`${v.pathname}#${i}`);
      },
      items: t(o.filter((i) => !i.hidden))
    }
  ) });
}, Zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: At
}, Symbol.toStringTag, { value: "Module" })), Et = () => {
  var ne, oe, ie;
  const t = ke(), { id: n } = st(), { t: l } = M("system"), { t: v } = M("common"), [g] = a.useForm(), [h] = a.useForm(), [_, j] = I(!1), [V, o] = I(!1), [i, p] = I(null), [U, f] = I(""), [z, y] = I(1), [A, q] = I(10), { data: F, loading: w, refresh: R } = S(
    () => rt({ id: n }),
    {
      ready: !!n,
      onError: (d) => {
        m.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", d);
      }
    }
  ), { data: L, loading: H, refresh: r } = S(
    () => dt({ id: n, current: z, page_size: A, search: U }),
    {
      ready: !!n,
      refreshDeps: [n, z, A, U],
      onError: (d) => {
        m.error(l("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", d);
      }
    }
  ), { data: P, loading: W } = S(
    () => ht({ current: 1, page_size: 1e3 }),
    {
      ready: _
    }
  ), { data: b, loading: u } = S(
    () => ft({ organization_id: n, current: 1, page_size: 1e3 }),
    {
      ready: !!n
    }
  ), { loading: $, run: fe } = S(
    (d) => ut({ id: n }, d),
    {
      manual: !0,
      onSuccess: () => {
        m.success(l("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), j(!1), g.resetFields(), r();
      },
      onError: (d) => {
        m.error((d == null ? void 0 : d.err) || l("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: xe, run: Ve } = S(
    (d) => ct({ id: n, user_id: i == null ? void 0 : i.id }, d),
    {
      manual: !0,
      onSuccess: () => {
        m.success(l("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), o(!1), h.resetFields(), p(null), r();
      },
      onError: (d) => {
        m.error((d == null ? void 0 : d.err) || l("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: ye } = S(
    (d) => mt({ id: n, user_id: d }),
    {
      manual: !0,
      onSuccess: () => {
        m.success(l("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), r();
      },
      onError: (d) => {
        m.error((d == null ? void 0 : d.err) || l("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), be = () => {
    j(!0), g.resetFields();
  }, je = (d) => {
    var s;
    p(d), h.setFieldsValue({
      role_ids: ((s = d.organization_roles) == null ? void 0 : s.map((x) => x.id)) || []
    }), o(!0);
  }, ve = (d) => {
    K.confirm({
      title: l("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: l("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${d.full_name || d.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => ye(d.id)
    });
  }, _e = () => {
    g.validateFields().then((d) => {
      fe(d);
    });
  }, Se = () => {
    h.validateFields().then((d) => {
      Ve(d);
    });
  }, ae = ((ne = P == null ? void 0 : P.data) == null ? void 0 : ne.filter((d) => {
    var s;
    return !((s = L == null ? void 0 : L.data) != null && s.some((x) => x.id === d.id));
  })) || [], Ie = [
    {
      title: l("settings.organizations.users.username", { defaultValue: "Username" }),
      dataIndex: "username",
      key: "username"
    },
    {
      title: l("settings.organizations.users.email", { defaultValue: "Email" }),
      dataIndex: "email",
      key: "email"
    },
    {
      title: l("settings.organizations.users.fullName", { defaultValue: "Full Name" }),
      dataIndex: "full_name",
      key: "full_name"
    },
    {
      title: l("settings.organizations.users.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (d) => /* @__PURE__ */ e.jsx(G, { color: d === "active" ? "green" : "default", children: d === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : d })
    },
    {
      title: l("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (d, s) => {
        var x;
        return /* @__PURE__ */ e.jsx(D, { wrap: !0, children: ((x = s.organization_roles) == null ? void 0 : x.map((k) => /* @__PURE__ */ e.jsx(G, { children: k.name }, k.id))) || /* @__PURE__ */ e.jsx(G, { children: "No roles" }) });
      }
    },
    {
      title: v("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (d, s) => /* @__PURE__ */ e.jsx(
        he,
        {
          actions: [
            {
              key: "edit",
              label: l("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(me, {}),
              onClick: async () => je(s)
            },
            {
              key: "delete",
              label: l("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(pe, {}),
              danger: !0,
              onClick: async () => ve(s)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      J,
      {
        title: /* @__PURE__ */ e.jsxs(D, { children: [
          /* @__PURE__ */ e.jsx(
            T,
            {
              icon: /* @__PURE__ */ e.jsx(Xe, {}),
              onClick: () => t("/system/settings#organizations"),
              children: v("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            l("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            F == null ? void 0 : F.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx(ee, {}), onClick: () => {
          R(), r();
        }, children: v("refresh", { defaultValue: "Refresh" }) }),
        loading: w,
        children: /* @__PURE__ */ e.jsxs(Z, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(Z.Item, { label: l("settings.organizations.name", { defaultValue: "Name" }), children: F == null ? void 0 : F.name }),
          /* @__PURE__ */ e.jsx(Z.Item, { label: l("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(G, { color: (F == null ? void 0 : F.status) === "active" ? "green" : "default", children: (F == null ? void 0 : F.status) === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(Z.Item, { label: l("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (F == null ? void 0 : F.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      J,
      {
        title: l("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(T, { type: "primary", icon: /* @__PURE__ */ e.jsx(ge, {}), onClick: be, children: l("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(D, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            c.Search,
            {
              placeholder: l("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (d) => {
                f(d), y(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            le,
            {
              columns: Ie,
              dataSource: (L == null ? void 0 : L.data) || [],
              loading: H,
              rowKey: "id",
              pagination: {
                current: z,
                pageSize: A,
                total: (L == null ? void 0 : L.total) || 0,
                showSizeChanger: !0,
                showTotal: (d) => v("pagination.total", { defaultValue: `Total ${d} items` }),
                onChange: (d, s) => {
                  y(d), q(s);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      K,
      {
        title: l("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: _,
        onOk: _e,
        onCancel: () => {
          j(!1), g.resetFields();
        },
        confirmLoading: $,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: g, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "user_id",
              label: l("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: l("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                O,
                {
                  showSearch: !0,
                  placeholder: l("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: W,
                  filterOption: (d, s) => ((s == null ? void 0 : s.label) ?? "").toLowerCase().includes(d.toLowerCase()),
                  options: ae.map((d) => ({
                    label: `${d.full_name || d.username} (${d.email})`,
                    value: d.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "role_ids",
              label: l("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                O,
                {
                  mode: "multiple",
                  placeholder: l("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: u,
                  options: ((oe = b == null ? void 0 : b.data) == null ? void 0 : oe.map((d) => ({
                    label: d.name,
                    value: d.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      K,
      {
        title: l("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: V,
        onOk: Se,
        onCancel: () => {
          o(!1), h.resetFields(), p(null);
        },
        confirmLoading: xe,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: h, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: l("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                c,
                {
                  value: (i == null ? void 0 : i.full_name) || (i == null ? void 0 : i.username),
                  disabled: !0
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "role_ids",
              label: l("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                O,
                {
                  mode: "multiple",
                  placeholder: l("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: u,
                  options: ((ie = b == null ? void 0 : b.data) == null ? void 0 : ie.map((d) => ({
                    label: d.name,
                    value: d.id
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
  default: Et
}, Symbol.toStringTag, { value: "Module" })), zt = () => {
  const { t } = M("system"), [n] = lt(), l = n.get("provider"), v = n.get("code"), g = n.get("state"), [h, _] = I(null), [j, V] = I(null), [o, i] = I(null);
  return S(async () => {
    if (!v || !g || !l)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const p = await E.system.testOauthCallback({ code: v, state: g, provider: l });
    if (!p.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!p.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    _(p.user), V(p.user_info);
  }, {
    onSuccess: () => {
      i({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (p) => {
      i({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: p.message
      });
    }
  }), o ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    Ne,
    {
      status: o.status,
      title: o.message,
      subTitle: o.error,
      extra: /* @__PURE__ */ e.jsxs(D, { style: { display: !j || !h ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(J, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Pe, { src: j || {} }) }),
        /* @__PURE__ */ e.jsx(J, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Pe, { src: h || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(et, {});
}, Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zt
}, Symbol.toStringTag, { value: "Module" }));
export {
  Wt as O,
  Qt as a,
  Zt as i
};
