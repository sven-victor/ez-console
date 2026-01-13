import { j as e, R as Fe, i as Re } from "./vendor.js";
import { Form as l, message as c, Spin as me, Switch as W, Select as P, Input as p, Alert as Pe, Divider as ke, Space as B, Button as z, InputNumber as ae, Modal as J, Skeleton as $e, Descriptions as ee, Steps as Be, Tag as X, Table as xe, Radio as je, Tabs as Le, Tooltip as He, Card as Y, Row as Te, Col as ce, Result as Ke } from "antd";
import { useTranslation as N } from "react-i18next";
import { useState as j, useEffect as _e, useMemo as qe } from "react";
import { useRequest as S } from "ahooks";
import { SaveOutlined as Ae, ReloadOutlined as ie, LoadingOutlined as Ge, CheckCircleTwoTone as Ze, StarFilled as We, CheckCircleOutlined as Ne, StarOutlined as Je, EditOutlined as ve, DeleteOutlined as Se, PlusOutlined as Ie, ThunderboltOutlined as Qe, ToolOutlined as Oe, SettingOutlined as Xe, LockOutlined as Ye, EyeOutlined as et, ArrowLeftOutlined as tt } from "@ant-design/icons";
import { a as A } from "./index.js";
import { g as Ue } from "./base.js";
import { f as ne, e as st, b as Ce, m as De, L as lt } from "./components.js";
import { useNavigate as ze, useLocation as at, useParams as nt, useSearchParams as it } from "react-router-dom";
import { l as ot, c as rt, u as dt, d as ut, g as ct, b as mt, e as pt, f as gt, r as ft } from "./system.js";
import { c as ht, b as xt } from "./contexts.js";
import { l as Vt, b as bt } from "./authorization.js";
const ue = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, yt = {
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
}, jt = ({ initialData: t, onRefresh: a }) => {
  const { t: s } = N("system"), { t: _ } = N("common"), [g] = l.useForm(), [h, v] = j((t == null ? void 0 : t.provider) || "custom"), [y, x] = j((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [o, d] = j((t == null ? void 0 : t.enabled) || !1), [f, O] = j((t == null ? void 0 : t.auto_create_user) || !1), { loading: E, data: w, refresh: m } = S(A.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (b) => {
      g.setFieldsValue(b), v(b.provider), x(b.provider === "custom" || b.provider === "autoDiscover"), d(b.enabled), O(b.auto_create_user);
    },
    onError: (b) => {
      c.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", b);
    }
  });
  _e(() => {
    t && (g.setFieldsValue(t), v(t.provider), x(t.provider === "custom" || t.provider === "autoDiscover"), d(t.enabled), O(t.auto_create_user));
  }, [t, g]);
  const F = (b) => {
    v(b), x(b === "custom" || b === "autoDiscover");
    const i = yt[b];
    i && g.setFieldsValue({
      auth_endpoint: i.endpoints.auth_endpoint,
      token_endpoint: i.endpoints.token_endpoint,
      userinfo_endpoint: i.endpoints.userinfo_endpoint,
      scope: i.scope,
      // Set field mappings
      email_field: i.email_field,
      username_field: i.username_field,
      full_name_field: i.full_name_field,
      avatar_field: i.avatar_field,
      role_field: i.role_field,
      // Set display configuration
      icon_url: i.icon_url,
      display_name: i.display_name
    });
  }, T = (b) => {
    d(b);
  }, C = (b) => {
    O(b);
  }, { loading: I, run: K } = S(A.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      c.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), a ? a() : m();
    },
    onError: (b) => {
      c.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", b);
    }
  }), q = (b) => {
    K(b);
  }, Q = () => {
    a ? a() : m();
  }, { loading: G, run: U } = S(async ({ redirect_uri: b, ...i }) => {
    let R;
    return b ? R = new URL(b) : R = new URL(window.location.origin), R.pathname = Ue("/system/settings/oauth/test-callback"), R.searchParams.set("provider", h), A.system.testOauthConnection({ redirect_uri: R.toString(), ...i });
  }, {
    manual: !0,
    onSuccess: ({ url: b }) => {
      window.open(b, "_blank");
    },
    onError: (b) => {
      c.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: b.message })), console.error("Failed to test OAuth connection", b);
    }
  }), H = () => h === "custom";
  return /* @__PURE__ */ e.jsx(me, { spinning: E, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: g,
      layout: "vertical",
      onFinish: q,
      initialValues: t || w,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(W, { onChange: T })
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
                required: o,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(P, { onChange: F, disabled: !o, children: [
              /* @__PURE__ */ e.jsx(P.Option, { value: "github", children: s("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(P.Option, { value: "google", children: s("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(P.Option, { value: "dingtalk", children: s("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(P.Option, { value: "wechat", children: s("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(P.Option, { value: "autoDiscover", children: s("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(P.Option, { value: "custom", children: s("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
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
              p,
              {
                disabled: !o,
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
            children: /* @__PURE__ */ e.jsx(p, { disabled: !o, placeholder: "https://example.com/icon.png" })
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
                required: o,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(p, { disabled: !o })
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
                required: o,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(p.Password, { disabled: !o, autoComplete: "off", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        H() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && h === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: ue,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(p, { disabled: !o })
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
                required: o && h === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(p, { disabled: !o })
          }
        ),
        H() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && h === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: ue,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(p, { disabled: !o })
          }
        ),
        H() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && h === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: ue,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(p, { disabled: !o })
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
                required: o,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(p, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(b) => b.getFieldValue("redirect_uri") !== "" ? {
              pattern: ue,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(p, { disabled: !o, placeholder: `http://${window.location.host}${Ue(`/login?provider=settings.${h}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(W, { onChange: C, disabled: !o })
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
                required: o && f,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(p, { disabled: !o || !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "auto",
            children: /* @__PURE__ */ e.jsxs(P, { disabled: !o, children: [
              /* @__PURE__ */ e.jsx(P.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(P.Option, { value: "auto", children: s("settings.oauth.roleMappingMode.options.auto.label", { defaultValue: "Auto" }) }),
              /* @__PURE__ */ e.jsx(P.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Pe,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.roleMappingMode.infoTitle", { defaultValue: "Role Mapping Mode Information" }),
            description: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.disabled.description", { defaultValue: "Ignores role information from OAuth2 provider. New users get the default role." })
              ] }),
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  s("settings.oauth.roleMappingMode.options.auto.label", { defaultValue: "Auto" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.auto.description", { defaultValue: "Uses OAuth2 roles for new users or users without roles, but preserves existing role assignments." })
              ] }),
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.enforce.description", { defaultValue: "Always overwrites user roles with OAuth2 roles when available." })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(W, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(ke, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Pe,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: y ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(p, { placeholder: "email", disabled: !o || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(p, { placeholder: "login", autoComplete: "off", disabled: !o || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(p, { placeholder: "name", disabled: !o || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(p, { placeholder: "avatar_url", disabled: !o || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(p, { placeholder: "role", disabled: !o || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(B, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              type: "primary",
              htmlType: "submit",
              loading: I,
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
              children: _("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              loading: G,
              onClick: async () => {
                const b = g.getFieldsValue();
                U(b);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              onClick: Q,
              icon: /* @__PURE__ */ e.jsx(ie, {}),
              children: _("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, _t = () => {
  const { t } = N("system"), { t: a } = N("common"), [s] = l.useForm(), { loading: _, data: g, refresh: h } = S(A.system.getSecuritySettings, {
    onSuccess: (o) => {
      s.setFieldsValue(o);
    },
    onError: (o) => {
      c.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: v, run: y } = S(A.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      c.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), h();
    },
    onError: (o) => {
      c.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), x = (o) => {
    y(o);
  };
  return /* @__PURE__ */ e.jsx(me, { spinning: _, children: /* @__PURE__ */ e.jsxs(
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
            children: /* @__PURE__ */ e.jsx(W, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_complexity",
            label: t("settings.security.passwordComplexity.label", { defaultValue: "Password Complexity" }),
            tooltip: t("settings.security.passwordComplexity.tooltip", { defaultValue: "Define the complexity requirements for user passwords." }),
            children: /* @__PURE__ */ e.jsxs(P, { children: [
              /* @__PURE__ */ e.jsx(P.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(P.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(P.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(P.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
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
            children: /* @__PURE__ */ e.jsx(W, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, d) => o.login_failure_lock !== d.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
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
            shouldUpdate: (o, d) => o.login_failure_lock !== d.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
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
            children: /* @__PURE__ */ e.jsx(W, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, d) => o.history_password_check !== d.history_password_check,
            children: ({ getFieldValue: o }) => o("history_password_check") ? /* @__PURE__ */ e.jsx(
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
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(B, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              type: "primary",
              htmlType: "submit",
              loading: v,
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
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
}, vt = ({ fetchItems: t, importItems: a, columns: s, ..._ }) => {
  const { t: g } = N("system"), [h, v] = j([]), [y, x] = j([]), { run: o, loading: d } = S(t, {
    onError: (E) => {
      c.error(g("settings.ldap.importError", { error: `${E.message}` }));
    },
    onSuccess: (E) => {
      v(E);
    },
    manual: !0
  }), { run: f, loading: O } = S(async () => {
    for (const E of y.filter((w) => {
      const m = h.find((F) => F.ldap_dn === w);
      return !(!m || m.status === "imported");
    })) {
      const w = await a([E]);
      v((m) => [...m].map((T) => {
        for (const C of w)
          if (T.ldap_dn === C.ldap_dn)
            return { ...C, status: "imported" };
        return T;
      }));
    }
  }, {
    manual: !0
  });
  return _e(() => {
    _.visible && (v([]), o(), x([]));
  }, [_.visible]), /* @__PURE__ */ e.jsx(
    J,
    {
      title: g("settings.ldap.importTitle"),
      ..._,
      onOk: () => {
        f();
      },
      width: 900,
      confirmLoading: O,
      loading: d,
      children: /* @__PURE__ */ e.jsx(
        xe,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (E) => {
              x(E);
            },
            getCheckboxProps: (E) => ({
              disabled: E.status === "imported"
            })
          },
          columns: s.map(({ render: E, ...w }) => E ? {
            ...w,
            render: (m, F, T) => {
              const C = y.includes(F.ldap_dn) && O && F.status !== "imported";
              return E(m, F, T, C);
            }
          } : w),
          dataSource: h,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, St = () => {
  var F, T, C;
  const { t } = N("system"), [a] = l.useForm(), [s, _] = j(!1), [g, h] = j(null), [v, y] = j(!1), [x, o] = j(!1), [d] = l.useForm(), [f, O] = j(!1);
  S(A.system.getLdapSettings, {
    onSuccess: (I) => {
      a.setFieldsValue(I), O(I.enabled);
    },
    onError: (I) => {
      c.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${I.message}` }));
    }
  }), _e(() => {
    h(null);
  }, [v]);
  const E = async (I) => {
    _(!0);
    try {
      await A.system.updateLdapSettings(I), c.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      c.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      _(!1);
    }
  }, { run: w, loading: m } = S(async (I) => {
    const K = await a.validateFields();
    return await A.system.testLdapConnection({
      ...I,
      ...K
    });
  }, {
    onSuccess: (I) => {
      h(I);
    },
    onError: (I) => {
      c.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${I.message}` }));
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
              children: /* @__PURE__ */ e.jsx(W, { onChange: (I) => O(I) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: f, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(p, { disabled: !f, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: f, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(p, { disabled: !f, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: f, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(p.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: f, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(p, { disabled: !f, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(p, { disabled: !f, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: f, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(p, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: f, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(p, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: f, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(p, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: f, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(p, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(p, { type: "number", defaultValue: 15, disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(ke, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(W, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(W, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(p.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(p.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(p.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(ne, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(z, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ne, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              z,
              {
                disabled: !f,
                style: { marginLeft: 8 },
                onClick: () => y(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ne, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              z,
              {
                disabled: !f,
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
      J,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: v,
        onCancel: () => y(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            l,
            {
              form: d,
              layout: "vertical",
              onFinish: w,
              children: [
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(p, { disabled: !f })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(p.Password, { disabled: !f })
                  }
                ),
                /* @__PURE__ */ e.jsxs(l.Item, { children: [
                  /* @__PURE__ */ e.jsx(ne, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(z, { disabled: !f, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    z,
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
          /* @__PURE__ */ e.jsx(me, { spinning: m, children: /* @__PURE__ */ e.jsx($e, { active: m, loading: m, children: g && (g.user ? /* @__PURE__ */ e.jsxs(ee, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(ee.Item, { label: "Username", span: 3, children: g.user.username }),
            /* @__PURE__ */ e.jsx(ee.Item, { label: "Email", span: 3, children: g.user.email }),
            /* @__PURE__ */ e.jsx(ee.Item, { label: "FullName", span: 3, children: g.user.full_name }),
            /* @__PURE__ */ e.jsx(ee.Item, { label: "CreatedAt", span: 3, children: g.user.created_at }),
            /* @__PURE__ */ e.jsx(ee.Item, { label: "UpdatedAt", span: 3, children: g.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Be,
            {
              direction: "vertical",
              current: (F = g.message) == null ? void 0 : F.findIndex((I) => !I.success),
              status: (T = g.message) != null && T.find((I) => !I.success) ? "error" : "finish",
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
      vt,
      {
        visible: x,
        onCancel: () => o(!1),
        fetchItems: () => A.system.importLdapUsers({}),
        importItems: (I) => A.system.importLdapUsers({ user_dn: I }),
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
          render: (I, K, q, Q) => Q ? /* @__PURE__ */ e.jsx(me, { indicator: /* @__PURE__ */ e.jsx(Ge, { spin: !0 }) }) : I ? /* @__PURE__ */ e.jsx(Ze, { twoToneColor: "#52c41a" }) : K.id ? /* @__PURE__ */ e.jsx(X, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(X, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, It = () => {
  const { t } = N("system"), { t: a } = N("common"), [s] = l.useForm(), [_, g] = j(null), [h, v] = j(!1), [y] = l.useForm(), [x, o] = j(!1), { loading: d } = S(A.system.getSmtpSettings, {
    onSuccess: (m) => {
      s.setFieldsValue(m), o(m.enabled);
    },
    onError: (m) => {
      c.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${m.message}` }));
    }
  });
  _e(() => {
    g(null);
  }, [h]);
  const { run: f, loading: O } = S(({ port: m, ...F }) => A.system.updateSmtpSettings({ ...F, port: Number(m) }), {
    manual: !0,
    onSuccess: () => {
      c.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (m) => {
      c.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${m.message}` }));
    }
  }), { run: E, loading: w } = S(async (m) => {
    const { port: F, ...T } = await s.validateFields();
    return await A.system.testSmtpConnection({
      ...m,
      ...T,
      port: Number(F)
    });
  }, {
    onSuccess: (m) => {
      g(m);
    },
    onError: (m) => {
      c.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${m.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(me, { spinning: d, children: /* @__PURE__ */ e.jsxs(
      l,
      {
        form: s,
        layout: "vertical",
        onFinish: f,
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
              children: /* @__PURE__ */ e.jsx(W, { onChange: (m) => o(m) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: x, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(p, { disabled: !x, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: x, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(p, { type: "number", disabled: !x, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: x, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(p, { disabled: !x, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(p.Password, { disabled: !x, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: x, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(je.Group, { disabled: !x, children: [
                /* @__PURE__ */ e.jsx(je.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(je.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(je.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
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
              children: /* @__PURE__ */ e.jsx(p, { disabled: !x, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(p, { disabled: !x, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
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
            /* @__PURE__ */ e.jsx(ne, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(z, { type: "primary", htmlType: "submit", loading: O, style: { marginRight: 8 }, children: a("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              z,
              {
                onClick: () => v(!0),
                disabled: !x || w,
                loading: w,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      J,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: h,
        onCancel: () => v(!1),
        footer: [
          /* @__PURE__ */ e.jsx(z, { onClick: () => v(!1), children: a("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(z, { type: "primary", loading: w, onClick: () => y.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: y,
            layout: "vertical",
            onFinish: (m) => E(m),
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
                  children: /* @__PURE__ */ e.jsx(p, { placeholder: "test@example.com" })
                }
              ),
              _ && /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: _.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: _.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, Ct = () => {
  const { t, i18n: a } = N("system"), { t: s } = N("common"), [_] = l.useForm(), { loading: g, data: h, refresh: v } = S(A.system.getSystemBaseSettings, {
    onSuccess: (d) => {
      _.setFieldsValue(d);
    },
    onError: (d) => {
      c.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", d);
    }
  }), { loading: y, run: x } = S(A.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      c.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), v();
    },
    onError: (d) => {
      c.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", d);
    }
  }), o = (d) => {
    x(d);
  };
  return /* @__PURE__ */ e.jsx(me, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: _,
      layout: "vertical",
      onFinish: o,
      initialValues: h,
      children: [
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Le, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: "name", children: /* @__PURE__ */ e.jsx(p, {}) }) })
        }, ...st.map((d) => ({
          key: d.lang,
          label: a.language !== d.lang ? s(`language.${d.lang}`, { defaultValue: d.label, lang: d.label }) : d.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: ["name_i18n", d.lang], children: /* @__PURE__ */ e.jsx(p, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(p, {}) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(p, {}) }),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(W, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(W, {})
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(B, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              type: "primary",
              htmlType: "submit",
              loading: y,
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              onClick: () => v(),
              icon: /* @__PURE__ */ e.jsx(ie, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: wt } = p, Ft = () => {
  var oe;
  const { t } = N("ai"), { t: a } = N("common"), [s] = l.useForm(), [_, g] = j(!1), [h, v] = j(null), [y, x] = j(""), [o, d] = j(""), [f, O] = j({}), { loading: E, data: w } = S(
    () => A.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (r) => {
        c.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", r);
      }
    }
  ), m = qe(() => w == null ? void 0 : w.find((r) => r.provider === o), [w, o]), { loading: F, data: T, refresh: C } = S(
    () => A.ai.listAiModels({ current: 1, page_size: 100, search: y }),
    {
      refreshDeps: [y],
      onError: (r) => {
        c.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", r);
      }
    }
  ), { loading: I, run: K } = S(
    ({ config: r, ...k }) => A.ai.createAiModel({ config: r ?? {}, ...k }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), g(!1), s.resetFields(), C();
      },
      onError: (r) => {
        c.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", r);
      }
    }
  ), { loading: q, run: Q } = S(
    ({ id: r, data: k }) => A.ai.updateAiModel({ id: r }, k),
    {
      manual: !0,
      onSuccess: () => {
        c.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), g(!1), s.resetFields(), v(null), C();
      },
      onError: (r) => {
        c.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", r);
      }
    }
  ), { runAsync: G } = S(
    (r) => A.ai.deleteAiModel({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), C();
      },
      onError: (r) => {
        c.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", r);
      }
    }
  ), { runAsync: U } = S(
    (r) => A.ai.testAiModel({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (r) => {
        c.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", r);
      }
    }
  ), { runAsync: H } = S(
    (r) => A.ai.setDefaultAiModel({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), C();
      },
      onError: (r) => {
        c.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", r);
      }
    }
  ), b = () => {
    v(null), d(""), O({}), s.resetFields(), g(!0);
  }, i = (r) => {
    v(r), d(r.provider);
    const k = r.config || {}, Z = {
      name: r.name,
      description: r.description,
      provider: r.provider,
      is_default: r.is_default,
      config: k,
      // Spread config fields to form
      status: r.status
    };
    console.log(Z), O(Z), s.setFieldsValue(Z), g(!0);
  }, R = (r) => {
    d(r), m != null && m.config_fields && m.config_fields.forEach((k) => {
      s.setFieldValue(k.name, void 0);
    });
  }, pe = (r) => {
    const k = {};
    m != null && m.config_fields && m.config_fields.forEach((te) => {
      var re;
      const se = (re = r.config) == null ? void 0 : re[te.name];
      se != null && se !== "" && (k[te.name] = se);
    });
    const Z = {
      name: r.name,
      description: r.description,
      provider: r.provider,
      config: k,
      is_default: r.is_default,
      status: r.status
    };
    h ? Q({ id: h.id, data: Z }) : K(Z);
  }, ge = (r) => {
    var Z;
    if (!((Z = r.data_source) != null && Z.depends_on))
      return {};
    const k = {};
    return r.data_source.depends_on.forEach((te) => {
      k[te] = f[te];
    }), k;
  }, fe = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (r, k) => /* @__PURE__ */ e.jsxs(B, { children: [
        /* @__PURE__ */ e.jsx("span", { children: r }),
        k.is_default && /* @__PURE__ */ e.jsx(He, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(We, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (r) => /* @__PURE__ */ e.jsx(X, { color: "blue", children: r.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (r) => /* @__PURE__ */ e.jsx(X, { color: r === "enabled" ? "green" : "red", children: r === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (r, k) => /* @__PURE__ */ e.jsx(Ce, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => U(k.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(Je, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => H(k.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          tooltip: a("edit", { defaultValue: "Edit" }),
          onClick: async () => i(k)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Se, {}),
          tooltip: a("delete", { defaultValue: "Delete" }),
          onClick: async () => G(k.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(Y, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Te, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsx(
        p.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: y,
          onChange: (r) => x(r.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(B, { children: [
        /* @__PURE__ */ e.jsx(
          z,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ie, {}),
            onClick: C,
            loading: F,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ne, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          z,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ie, {}),
            onClick: b,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(Y, { children: /* @__PURE__ */ e.jsx(
      xe,
      {
        columns: fe,
        dataSource: (T == null ? void 0 : T.data) || [],
        loading: F,
        rowKey: "id",
        pagination: {
          total: (T == null ? void 0 : T.total) || 0,
          current: (T == null ? void 0 : T.current) || 1,
          pageSize: (T == null ? void 0 : T.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (r, k) => t("common.pagination.total", {
            defaultValue: `${k[0]}-${k[1]} of ${r} items`,
            start: k[0],
            end: k[1],
            total: r
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      J,
      {
        title: h ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: _,
        onCancel: () => {
          g(!1), s.resetFields(), v(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: s,
            layout: "vertical",
            onFinish: pe,
            onValuesChange: (r, k) => O(k),
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(p, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    wt,
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
                    P,
                    {
                      loading: E,
                      placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                      onChange: R,
                      value: o,
                      options: w == null ? void 0 : w.map((r) => ({
                        label: r.name,
                        value: r.provider
                      }))
                    }
                  )
                }
              ),
              (oe = m == null ? void 0 : m.config_fields) == null ? void 0 : oe.map((r) => /* @__PURE__ */ e.jsx(
                De,
                {
                  field: r,
                  selectedType: o,
                  dependentValues: ge(r),
                  formValues: f
                },
                r.name
              )),
              /* @__PURE__ */ e.jsxs(
                l.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(W, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(l.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(p, {}) }),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(B, { children: [
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: I || q,
                    children: h ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    onClick: () => {
                      g(!1), s.resetFields(), v(null), d(""), O({});
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
}, { TextArea: Tt } = p, kt = () => {
  var Ee;
  const { t } = N("system"), { t: a } = N("common"), [s] = l.useForm(), [_, g] = j(!1), [h, v] = j(null), [y, x] = j(""), [o, d] = j(!1), [f, O] = j(null), [E, w] = j(""), [m, F] = j(!1), [T, C] = j([]), [I, K] = j({}), [q, Q] = j(), { loading: G, data: U, refresh: H } = S(
    () => A.system.listToolSets({ current: 1, page_size: 100, search: y, type: q }),
    {
      refreshDeps: [y, q],
      onError: (n) => {
        c.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", n);
      }
    }
  ), { loading: b, data: i } = S(
    () => A.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (n) => {
        c.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", n);
      }
    }
  ), R = qe(() => i == null ? void 0 : i.find((n) => n.tool_set_type === E), [i, E]), { loading: pe, run: ge } = S(
    (n) => A.system.createToolSet({
      ...n,
      type: n.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), g(!1), s.resetFields(), H();
      },
      onError: (n) => {
        c.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", n);
      }
    }
  ), { loading: fe, run: oe } = S(
    ({ id: n, data: V }) => A.system.updateToolSet({ id: n }, {
      ...V,
      type: V.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), g(!1), s.resetFields(), v(null), H();
      },
      onError: (n) => {
        c.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", n);
      }
    }
  ), { run: r } = S(
    (n) => A.system.deleteToolSet({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), H();
      },
      onError: (n) => {
        c.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", n);
      }
    }
  ), { runAsync: k } = S(
    (n) => A.system.testToolSet({ id: n }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (n) => {
        c.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", n);
      }
    }
  ), { loading: Z, runAsync: te } = S(
    (n) => A.system.getToolSetTools({ id: n }),
    {
      manual: !0,
      onSuccess: (n) => {
        C(n || []), F(!0);
      },
      onError: (n) => {
        c.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", n);
      }
    }
  ), { runAsync: se } = S(
    ({ id: n, status: V }) => A.system.updateToolSetStatus({ id: n }, { status: V }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), H();
      },
      onError: (n) => {
        c.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", n);
      }
    }
  ), re = () => {
    v(null), s.resetFields(), w(""), g(!0);
  }, we = (n) => {
    v(n), w(n.type);
    const V = { ...n };
    if (V.config) {
      const L = i == null ? void 0 : i.find((M) => M.tool_set_type === n.type);
      if (L) {
        const M = {};
        L.config_fields.forEach(($) => {
          var de, Me;
          $.type === "object" && ((de = V.config) != null && de[$.name]) ? M[$.name] = JSON.stringify(V.config[$.name], null, 2) : ((Me = V.config) == null ? void 0 : Me[$.name]) !== void 0 && (M[$.name] = V.config[$.name]);
        }), V.config = M;
      }
    }
    s.setFieldsValue(V), g(!0);
  };
  console.log(E, i);
  const Ve = (n) => {
    w(n);
    const V = i == null ? void 0 : i.find((L) => L.tool_set_type === n);
    if (V) {
      const L = {};
      V.config_fields.forEach((M) => {
        if (M.default)
          switch (M.type) {
            case "number":
              L[M.name] = Number(M.default);
              break;
            case "boolean":
              L[M.name] = M.default === "true";
              break;
            case "array":
              L[M.name] = M.default.split(",");
              break;
            default:
              L[M.name] = M.default;
          }
      }), s.setFieldValue("config", L);
    } else
      s.setFieldValue("config", void 0);
  }, be = (n) => {
    if (n.config && R) {
      const V = {};
      R.config_fields.forEach((L) => {
        var $;
        const M = ($ = n.config) == null ? void 0 : $[L.name];
        if (M !== void 0)
          if (L.type === "object")
            try {
              V[L.name] = typeof M == "string" ? JSON.parse(M) : M;
            } catch {
              V[L.name] = M;
            }
          else
            V[L.name] = M;
      }), n.config = V;
    }
    h ? oe({ id: h.id, data: n }) : ge(n);
  }, he = (n) => {
    r(n);
  }, u = (n) => {
    O(n), d(!0);
  }, D = (n) => {
    console.log(/* @__PURE__ */ new Date(), "handleToggleStatus");
    const V = n.status === "enabled" ? "disabled" : "enabled";
    return se({ id: n.id, status: V }).then(() => {
      console.log(/* @__PURE__ */ new Date(), "handleToggleStatus1");
    });
  }, le = (n) => {
    var L;
    if (!((L = n.data_source) != null && L.depends_on) || n.data_source.depends_on.length === 0)
      return {};
    const V = {};
    return n.data_source.depends_on.forEach((M) => {
      var de;
      const $ = (de = I.config) == null ? void 0 : de[M];
      $ !== void 0 && (V[M] = $);
    }), V;
  };
  console.log(U);
  const ye = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (n) => /* @__PURE__ */ e.jsx(X, { color: "blue", children: n.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (n) => /* @__PURE__ */ e.jsx(X, { color: n === "enabled" ? "green" : "red", children: n === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (n, V) => /* @__PURE__ */ e.jsx(Ce, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(Qe, {}),
          disabled: V.status !== "enabled",
          onClick: async () => k(V.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          permission: "system:toolsets:view",
          disabled: V.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => te(V.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(Xe, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => u(V.config),
          disabled: !V.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          onClick: async () => we(V)
        },
        {
          key: "toggleStatus",
          icon: V.status === "enabled" ? /* @__PURE__ */ e.jsx(Ye, {}) : /* @__PURE__ */ e.jsx(Ne, {}),
          onClick: async () => D(V),
          permission: "system:toolsets:update",
          tooltip: V.status === "enabled" ? a("disable", { defaultValue: "Disable" }) : a("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Se, {}),
          permission: "system:toolsets:delete",
          tooltip: a("delete", { defaultValue: "Delete" }),
          onClick: async () => he(V.id),
          danger: !0,
          confirm: {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => he(V.id),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(Y, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Te, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(B, { children: [
        /* @__PURE__ */ e.jsx(
          p.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            value: y,
            onChange: (n) => x(n.target.value),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          P,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: q,
            onChange: (n) => Q(n),
            options: i == null ? void 0 : i.map((n) => ({
              label: n.name,
              value: n.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(P.Option, { value: "", children: "All" }),
              i == null ? void 0 : i.map((n) => /* @__PURE__ */ e.jsx(P.Option, { value: n.tool_set_type, children: n.name }, n.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(ce, { children: /* @__PURE__ */ e.jsxs(B, { children: [
        /* @__PURE__ */ e.jsx(
          z,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ie, {}),
            onClick: H,
            loading: G,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ne, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          z,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ie, {}),
            onClick: re,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(Y, { children: /* @__PURE__ */ e.jsx(
      xe,
      {
        columns: ye,
        dataSource: (U == null ? void 0 : U.data) || [],
        loading: G,
        rowKey: "id",
        pagination: {
          total: (U == null ? void 0 : U.total) || 0,
          current: (U == null ? void 0 : U.current) || 1,
          pageSize: (U == null ? void 0 : U.page_size) || 10,
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
      J,
      {
        title: h ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: _,
        onCancel: () => {
          g(!1), s.resetFields(), v(null), w("");
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: s,
            layout: "vertical",
            onFinish: be,
            onValuesChange: (n, V) => K(V),
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(p, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: t("settings.toolsets.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Tt,
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
                    P,
                    {
                      loading: b,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: Ve,
                      value: E,
                      options: i == null ? void 0 : i.map((n) => ({
                        label: n.name,
                        value: n.tool_set_type
                      }))
                    }
                  )
                }
              ),
              (Ee = R == null ? void 0 : R.config_fields) == null ? void 0 : Ee.map((n) => /* @__PURE__ */ e.jsx(
                De,
                {
                  field: n,
                  selectedType: E,
                  dependentValues: le(n),
                  formValues: I
                },
                n.name
              )),
              /* @__PURE__ */ e.jsx(l.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(p, {}) }),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(B, { children: [
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: pe || fe,
                    children: h ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    onClick: () => {
                      g(!1), s.resetFields(), v(null), w("");
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
      J,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: o,
        onCancel: () => d(!1),
        footer: [
          /* @__PURE__ */ e.jsx(z, { onClick: () => d(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(f, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      J,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: m,
        onCancel: () => F(!1),
        footer: [
          /* @__PURE__ */ e.jsx(z, { onClick: () => F(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: Z ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ie, { style: { fontSize: 24 }, spin: !0 }) }) : T.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : T.map((n, V) => {
          var L, M, $;
          return /* @__PURE__ */ e.jsx(
            Y,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(B, { children: [
                /* @__PURE__ */ e.jsx(Oe, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((L = n.function) == null ? void 0 : L.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(Te, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(ce, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((M = n.function) == null ? void 0 : M.description) || "-" })
                ] }),
                (($ = n.function) == null ? void 0 : $.parameters) && /* @__PURE__ */ e.jsxs(ce, { span: 24, children: [
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
}, { TextArea: At } = p, zt = () => {
  const t = ze(), { t: a } = N("system"), { t: s } = N("common"), [_] = l.useForm(), [g, h] = j(!1), [v, y] = j(null), [x, o] = j(""), [d, f] = j(1), [O, E] = j(10), { loading: w, data: m, refresh: F } = S(
    () => ot({ current: d, page_size: O, search: x }),
    {
      refreshDeps: [d, O, x],
      onError: (i) => {
        c.error(a("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", i);
      }
    }
  ), { loading: T, run: C } = S(
    (i) => rt(i),
    {
      manual: !0,
      onSuccess: () => {
        c.success(a("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), h(!1), _.resetFields(), y(null), F();
      },
      onError: (i) => {
        c.error((i == null ? void 0 : i.err) || a("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: I, run: K } = S(
    ({ id: i, ...R }) => dt({ id: i }, R),
    {
      manual: !0,
      onSuccess: () => {
        c.success(a("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), h(!1), _.resetFields(), y(null), F();
      },
      onError: (i) => {
        c.error((i == null ? void 0 : i.err) || a("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: q } = S(
    (i) => ut({ id: i }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(a("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), F();
      },
      onError: (i) => {
        c.error((i == null ? void 0 : i.err) || a("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), Q = () => {
    y(null), _.resetFields(), _.setFieldsValue({ status: "active" }), h(!0);
  }, G = (i) => {
    y(i), _.setFieldsValue({
      name: i.name,
      description: i.description,
      status: i.status
    }), h(!0);
  }, U = (i) => {
    J.confirm({
      title: a("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: a("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${i.name}"? This action cannot be undone.`
      }),
      onOk: () => q(i.id)
    });
  }, H = () => {
    _.validateFields().then((i) => {
      v ? K({ id: v.id, ...i }) : C(i);
    });
  }, b = [
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
      render: (i) => /* @__PURE__ */ e.jsx(X, { color: i === "active" ? "green" : "default", children: i === "active" ? a("settings.organizations.active", { defaultValue: "Active" }) : a("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (i, R) => /* @__PURE__ */ e.jsx(
        Ce,
        {
          actions: [
            {
              key: "view",
              label: s("view", { defaultValue: "View" }),
              icon: /* @__PURE__ */ e.jsx(et, {}),
              onClick: async () => t(`/system/settings/organizations/${R.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              label: s("edit", { defaultValue: "Edit" }),
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              onClick: async () => G(R),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              label: s("delete", { defaultValue: "Delete" }),
              icon: /* @__PURE__ */ e.jsx(Se, {}),
              danger: !0,
              onClick: async () => U(R),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    Y,
    {
      title: a("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(B, { children: [
        /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(ie, {}), onClick: F, children: s("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ne, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(z, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ie, {}), onClick: Q, children: a("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(B, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            p.Search,
            {
              placeholder: a("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (i) => {
                o(i), f(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              columns: b,
              dataSource: (m == null ? void 0 : m.data) || [],
              loading: w,
              rowKey: "id",
              pagination: {
                current: d,
                pageSize: O,
                total: (m == null ? void 0 : m.total) || 0,
                showSizeChanger: !0,
                showTotal: (i, R) => a("common.pagination.total", {
                  defaultValue: `${R[0]}-${R[1]} of ${i} items`,
                  start: R[0],
                  end: R[1],
                  total: i
                }),
                onChange: (i, R) => {
                  f(i), E(R);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          J,
          {
            title: v ? a("settings.organizations.edit", { defaultValue: "Edit Organization" }) : a("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: g,
            onOk: H,
            onCancel: () => {
              h(!1), _.resetFields(), y(null);
            },
            confirmLoading: T || I,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(l, { form: _, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: a("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: a("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(p, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: a("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(At, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "status",
                  label: a("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(P, { children: [
                    /* @__PURE__ */ e.jsx(P.Option, { value: "active", children: a("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(P.Option, { value: "disabled", children: a("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, Et = ({
  transformItems: t = (a) => a
}) => {
  const { t: a } = N("system"), s = ze(), _ = at(), v = _.hash.replace("#", "") || "base", { enableMultiOrg: y } = ht(), { hasPermission: x } = xt(), o = [
    {
      key: "base",
      label: a("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(Ct, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "security",
      label: a("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(_t, {}),
      hidden: !x("system:security:update")
    },
    {
      key: "oauth",
      label: a("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(jt, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "ldap",
      label: a("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(St, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "smtp",
      label: a("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(It, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "ai-models",
      label: a("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(Ft, {}),
      hidden: !x("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: a("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(kt, {}),
      hidden: !x("system:toolsets:view")
    },
    // Only show organization tab if multi-org is enabled
    ...y ? [{
      key: "organizations",
      label: a("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(zt, {}),
      hidden: !x("system:organization:view")
    }] : []
  ];
  return console.log(o, x("system:settings:update")), /* @__PURE__ */ e.jsx(Y, { title: a("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Le,
    {
      defaultActiveKey: v,
      onChange: (d) => {
        s(`${_.pathname}#${d}`);
      },
      items: t(o.filter((d) => !d.hidden), a)
    }
  ) });
}, Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Et
}, Symbol.toStringTag, { value: "Module" })), Mt = () => {
  var Ve, be, he;
  const t = ze(), { id: a } = nt(), { t: s } = N("system"), { t: _ } = N("common"), [g] = l.useForm(), [h] = l.useForm(), [v, y] = j(!1), [x, o] = j(!1), [d, f] = j(null), [O, E] = j(""), [w, m] = j(1), [F, T] = j(10), { data: C, loading: I, refresh: K } = S(
    () => ct({ id: a }),
    {
      ready: !!a,
      onError: (u) => {
        c.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", u);
      }
    }
  ), { data: q, loading: Q, refresh: G } = S(
    () => mt({ id: a, current: w, page_size: F, search: O }),
    {
      ready: !!a,
      refreshDeps: [a, w, F, O],
      onError: (u) => {
        c.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", u);
      }
    }
  ), { data: U, loading: H } = S(
    () => Vt({ current: 1, page_size: 1e3 }),
    {
      ready: v
    }
  ), { data: b, loading: i } = S(
    () => bt({ organization_id: a, current: 1, page_size: 1e3 }),
    {
      ready: !!a
    }
  ), { loading: R, run: pe } = S(
    (u) => pt({ id: a }, u),
    {
      manual: !0,
      onSuccess: () => {
        c.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), y(!1), g.resetFields(), G();
      },
      onError: (u) => {
        c.error((u == null ? void 0 : u.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: ge, run: fe } = S(
    (u) => gt({ id: a, user_id: d == null ? void 0 : d.id }, u),
    {
      manual: !0,
      onSuccess: () => {
        c.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), o(!1), h.resetFields(), f(null), G();
      },
      onError: (u) => {
        c.error((u == null ? void 0 : u.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: oe } = S(
    (u) => ft({ id: a, user_id: u }),
    {
      manual: !0,
      onSuccess: () => {
        c.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), G();
      },
      onError: (u) => {
        c.error((u == null ? void 0 : u.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), r = () => {
    y(!0), g.resetFields();
  }, k = (u) => {
    var D;
    f(u), h.setFieldsValue({
      role_ids: ((D = u.organization_roles) == null ? void 0 : D.map((le) => le.id)) || []
    }), o(!0);
  }, Z = (u) => {
    J.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${u.full_name || u.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => oe(u.id)
    });
  }, te = () => {
    g.validateFields().then((u) => {
      pe(u);
    });
  }, se = () => {
    h.validateFields().then((u) => {
      fe(u);
    });
  }, re = ((Ve = U == null ? void 0 : U.data) == null ? void 0 : Ve.filter((u) => {
    var D;
    return !((D = q == null ? void 0 : q.data) != null && D.some((le) => le.id === u.id));
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
      render: (u) => /* @__PURE__ */ e.jsx(X, { color: u === "active" ? "green" : "default", children: u === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : u })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (u, D) => {
        var le;
        return /* @__PURE__ */ e.jsx(B, { wrap: !0, children: ((le = D.organization_roles) == null ? void 0 : le.map((ye) => /* @__PURE__ */ e.jsx(X, { children: ye.name }, ye.id))) || /* @__PURE__ */ e.jsx(X, { children: "No roles" }) });
      }
    },
    {
      title: _("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (u, D) => /* @__PURE__ */ e.jsx(
        Ce,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              onClick: async () => k(D)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Se, {}),
              danger: !0,
              onClick: async () => Z(D)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      Y,
      {
        title: /* @__PURE__ */ e.jsxs(B, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              icon: /* @__PURE__ */ e.jsx(tt, {}),
              onClick: () => t("/system/settings#organizations"),
              children: _("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            C == null ? void 0 : C.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(ie, {}), onClick: () => {
          K(), G();
        }, children: _("refresh", { defaultValue: "Refresh" }) }),
        loading: I,
        children: /* @__PURE__ */ e.jsxs(ee, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(ee.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: C == null ? void 0 : C.name }),
          /* @__PURE__ */ e.jsx(ee.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(X, { color: (C == null ? void 0 : C.status) === "active" ? "green" : "default", children: (C == null ? void 0 : C.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(ee.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (C == null ? void 0 : C.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Y,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(z, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ie, {}), onClick: r, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(B, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            p.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (u) => {
                E(u), m(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            xe,
            {
              columns: we,
              dataSource: (q == null ? void 0 : q.data) || [],
              loading: Q,
              rowKey: "id",
              pagination: {
                current: w,
                pageSize: F,
                total: (q == null ? void 0 : q.total) || 0,
                showSizeChanger: !0,
                showTotal: (u) => _("pagination.total", { defaultValue: `Total ${u} items` }),
                onChange: (u, D) => {
                  m(u), T(D);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      J,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: v,
        onOk: te,
        onCancel: () => {
          y(!1), g.resetFields();
        },
        confirmLoading: R,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(l, { form: g, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "user_id",
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: s("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                P,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: H,
                  filterOption: (u, D) => ((D == null ? void 0 : D.label) ?? "").toLowerCase().includes(u.toLowerCase()),
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
                P,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: i,
                  options: ((be = b == null ? void 0 : b.data) == null ? void 0 : be.map((u) => ({
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
      J,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: x,
        onOk: se,
        onCancel: () => {
          o(!1), h.resetFields(), f(null);
        },
        confirmLoading: ge,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(l, { form: h, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                p,
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
                P,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: i,
                  options: ((he = b == null ? void 0 : b.data) == null ? void 0 : he.map((u) => ({
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
}, Jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mt
}, Symbol.toStringTag, { value: "Module" })), Rt = () => {
  const { t } = N("system"), [a] = it(), s = a.get("provider"), _ = a.get("code"), g = a.get("state"), [h, v] = j(null), [y, x] = j(null), [o, d] = j(null);
  return S(async () => {
    if (!_ || !g || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const f = await A.system.testOauthCallback({ code: _, state: g, provider: s });
    if (!f.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!f.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    v(f.user), x(f.user_info);
  }, {
    onSuccess: () => {
      d({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (f) => {
      d({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: f.message
      });
    }
  }), o ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    Ke,
    {
      status: o.status,
      title: o.message,
      subTitle: o.error,
      extra: /* @__PURE__ */ e.jsxs(B, { style: { display: !y || !h ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(Y, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Re, { src: y || {} }) }),
        /* @__PURE__ */ e.jsx(Y, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Re, { src: h || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(lt, {});
}, Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rt
}, Symbol.toStringTag, { value: "Module" }));
export {
  Jt as O,
  Qt as a,
  Wt as i
};
