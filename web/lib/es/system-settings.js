import { j as e, R as Ae, i as Le } from "./vendor.js";
import { Form as i, message as d, Spin as pe, Switch as se, Select as L, Input as y, Alert as Ue, Divider as Me, Space as H, Button as C, InputNumber as ce, Modal as W, Skeleton as et, Descriptions as de, Steps as tt, Tag as te, Table as ke, Radio as Ie, Tabs as Ke, Tooltip as st, Card as Y, Row as ze, Col as be, Upload as lt, Tree as at, Menu as it, Result as nt } from "antd";
import { useTranslation as $ } from "react-i18next";
import { useState as k, useEffect as Fe, useMemo as Oe, useCallback as qe } from "react";
import { useRequest as v } from "ahooks";
import { SaveOutlined as Ce, ReloadOutlined as ue, LoadingOutlined as ot, CheckCircleTwoTone as rt, StarFilled as dt, CheckCircleOutlined as We, StarOutlined as ut, EditOutlined as Se, DeleteOutlined as he, PlusOutlined as ve, ThunderboltOutlined as ct, ToolOutlined as Ne, SettingOutlined as mt, LockOutlined as ft, FileTextOutlined as pt, EyeOutlined as Ge, UploadOutlined as De, ArrowLeftOutlined as gt, FolderOutlined as Ze, FileOutlined as Je, FileAddOutlined as ht, FolderAddOutlined as xt } from "@ant-design/icons";
import { a as F } from "./index.js";
import { g as $e, a as yt, s as Vt } from "./base.js";
import { f as X, e as jt, b as Te, n as Qe, M as Xe, L as bt } from "./components.js";
import { useNavigate as _e, useLocation as kt, useParams as Pe, useSearchParams as St } from "react-router-dom";
import { l as vt, c as _t, u as Ft, d as Ct, g as wt, b as It, e as Tt, f as At, r as Et } from "./system.js";
import { c as zt, b as Mt } from "./contexts.js";
import { l as Ot, b as Pt } from "./authorization.js";
import { createStyles as Rt } from "antd-style";
const je = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Lt = {
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
}, Ut = ({ initialData: t, onRefresh: l }) => {
  const { t: s } = $("system"), { t: n } = $("common"), [p] = i.useForm(), [g, V] = k((t == null ? void 0 : t.provider) || "custom"), [j, S] = k((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [o, c] = k((t == null ? void 0 : t.enabled) || !1), [h, U] = k((t == null ? void 0 : t.auto_create_user) || !1), { loading: z, data: I, refresh: b } = v(F.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (_) => {
      p.setFieldsValue(_), V(_.provider), S(_.provider === "custom" || _.provider === "autoDiscover"), c(_.enabled), U(_.auto_create_user);
    },
    onError: (_) => {
      d.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", _);
    }
  });
  Fe(() => {
    t && (p.setFieldsValue(t), V(t.provider), S(t.provider === "custom" || t.provider === "autoDiscover"), c(t.enabled), U(t.auto_create_user));
  }, [t, p]);
  const M = (_) => {
    V(_), S(_ === "custom" || _ === "autoDiscover");
    const u = Lt[_];
    u && p.setFieldsValue({
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
  }, T = (_) => {
    c(_);
  }, O = (_) => {
    U(_);
  }, { loading: w, run: G } = v(F.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      d.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : b();
    },
    onError: (_) => {
      d.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", _);
    }
  }), N = (_) => {
    G(_);
  }, J = () => {
    l ? l() : b();
  }, { loading: B, run: q } = v(async ({ redirect_uri: _, ...u }) => {
    let P;
    return _ ? P = new URL(_) : P = new URL(window.location.origin), P.pathname = $e("/system/settings/oauth/test-callback"), P.searchParams.set("provider", g), F.system.testOauthConnection({ redirect_uri: P.toString(), ...u });
  }, {
    manual: !0,
    onSuccess: ({ url: _ }) => {
      window.open(_, "_blank");
    },
    onError: (_) => {
      d.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: _.message })), console.error("Failed to test OAuth connection", _);
    }
  }), R = () => g === "custom";
  return /* @__PURE__ */ e.jsx(pe, { spinning: z, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: p,
      layout: "vertical",
      onFinish: N,
      initialValues: t || I,
      children: [
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(se, { onChange: T })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
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
            children: /* @__PURE__ */ e.jsxs(L, { onChange: M, disabled: !o, children: [
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
          i.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              y,
              {
                disabled: !o,
                placeholder: g !== "custom" ? s(`settings.oauth.provider.options.${g}`, { defaultValue: g }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "icon_url",
            label: s("settings.oauth.iconUrl.label", { defaultValue: "Icon URL" }),
            tooltip: s("settings.oauth.iconUrl.tooltip", { defaultValue: "URL of the icon for this provider. Displayed on the login button." }),
            rules: [
              {
                pattern: je,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(y, { disabled: !o, placeholder: "https://example.com/icon.png" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
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
            children: /* @__PURE__ */ e.jsx(y, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
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
            children: /* @__PURE__ */ e.jsx(y.Password, { disabled: !o, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        R() && /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && g === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: je,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(y, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "wellknown_endpoint",
            hidden: g !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: je,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: o && g === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(y, { disabled: !o })
          }
        ),
        R() && /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && g === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: je,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(y, { disabled: !o })
          }
        ),
        R() && /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && g === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: je,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(y, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
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
            children: /* @__PURE__ */ e.jsx(y, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(_) => _.getFieldValue("redirect_uri") !== "" ? {
              pattern: je,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(y, { disabled: !o, placeholder: `http://${window.location.host}${$e(`/login?provider=settings.${g}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(se, { onChange: O, disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "default_role",
            label: s("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: s("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: o && h,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(y, { disabled: !o || !h })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "auto",
            children: /* @__PURE__ */ e.jsxs(L, { disabled: !o, children: [
              /* @__PURE__ */ e.jsx(L.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "auto", children: s("settings.oauth.roleMappingMode.options.auto.label", { defaultValue: "Auto" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Ue,
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
          i.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(se, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(Me, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Ue,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: j ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(y, { placeholder: "email", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(y, { placeholder: "login", autoComplete: "off", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(y, { placeholder: "name", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(y, { placeholder: "avatar_url", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(y, { placeholder: "role", disabled: !o || !j })
          }
        ),
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            C,
            {
              type: "primary",
              htmlType: "submit",
              loading: w,
              icon: /* @__PURE__ */ e.jsx(Ce, {}),
              children: n("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            C,
            {
              loading: B,
              onClick: async () => {
                const _ = p.getFieldsValue();
                q(_);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            C,
            {
              onClick: J,
              icon: /* @__PURE__ */ e.jsx(ue, {}),
              children: n("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, qt = () => {
  const { t } = $("system"), { t: l } = $("common"), [s] = i.useForm(), { loading: n, data: p, refresh: g } = v(F.system.getSecuritySettings, {
    onSuccess: (o) => {
      s.setFieldsValue(o);
    },
    onError: (o) => {
      d.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: V, run: j } = v(F.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      d.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), g();
    },
    onError: (o) => {
      d.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), S = (o) => {
    j(o);
  };
  return /* @__PURE__ */ e.jsx(pe, { spinning: n, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: s,
      layout: "vertical",
      onFinish: S,
      initialValues: p,
      children: [
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(se, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
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
          i.Item,
          {
            name: "password_min_length",
            label: t("settings.security.passwordMinLength.label", { defaultValue: "Minimum Password Length" }),
            tooltip: t("settings.security.passwordMinLength.tooltip", { defaultValue: "The minimum number of characters required for a password." }),
            rules: [{ type: "number", min: 6, max: 32 }],
            children: /* @__PURE__ */ e.jsx(ce, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(se, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, c) => o.login_failure_lock !== c.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              i.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(ce, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, c) => o.login_failure_lock !== c.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              i.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(ce, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "history_password_check",
            label: t("settings.security.historyPasswordCheck.label", { defaultValue: "Enforce Password History Policy" }),
            valuePropName: "checked",
            tooltip: t("settings.security.historyPasswordCheck.tooltip", { defaultValue: "Prevent users from reusing recent passwords." }),
            children: /* @__PURE__ */ e.jsx(se, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, c) => o.history_password_check !== c.history_password_check,
            children: ({ getFieldValue: o }) => o("history_password_check") ? /* @__PURE__ */ e.jsx(
              i.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(ce, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "inactive_account_lock_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            C,
            {
              type: "primary",
              htmlType: "submit",
              loading: V,
              icon: /* @__PURE__ */ e.jsx(Ce, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            C,
            {
              onClick: () => g(),
              icon: /* @__PURE__ */ e.jsx(ue, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Nt = ({ fetchItems: t, importItems: l, columns: s, ...n }) => {
  const { t: p } = $("system"), [g, V] = k([]), [j, S] = k([]), { run: o, loading: c } = v(t, {
    onError: (z) => {
      d.error(p("settings.ldap.importError", { error: `${z.message}` }));
    },
    onSuccess: (z) => {
      V(z);
    },
    manual: !0
  }), { run: h, loading: U } = v(async () => {
    for (const z of j.filter((I) => {
      const b = g.find((M) => M.ldap_dn === I);
      return !(!b || b.status === "imported");
    })) {
      const I = await l([z]);
      V((b) => [...b].map((T) => {
        for (const O of I)
          if (T.ldap_dn === O.ldap_dn)
            return { ...O, status: "imported" };
        return T;
      }));
    }
  }, {
    manual: !0
  });
  return Fe(() => {
    n.visible && (V([]), o(), S([]));
  }, [n.visible]), /* @__PURE__ */ e.jsx(
    W,
    {
      title: p("settings.ldap.importTitle"),
      ...n,
      onOk: () => {
        h();
      },
      width: 900,
      confirmLoading: U,
      loading: c,
      children: /* @__PURE__ */ e.jsx(
        ke,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (z) => {
              S(z);
            },
            getCheckboxProps: (z) => ({
              disabled: z.status === "imported"
            })
          },
          columns: s.map(({ render: z, ...I }) => z ? {
            ...I,
            render: (b, M, T) => {
              const O = j.includes(M.ldap_dn) && U && M.status !== "imported";
              return z(b, M, T, O);
            }
          } : I),
          dataSource: g,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Dt = () => {
  var M, T, O;
  const { t } = $("system"), [l] = i.useForm(), [s, n] = k(!1), [p, g] = k(null), [V, j] = k(!1), [S, o] = k(!1), [c] = i.useForm(), [h, U] = k(!1);
  v(F.system.getLdapSettings, {
    onSuccess: (w) => {
      l.setFieldsValue(w), U(w.enabled);
    },
    onError: (w) => {
      d.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${w.message}` }));
    }
  }), Fe(() => {
    g(null);
  }, [V]);
  const z = async (w) => {
    n(!0);
    try {
      await F.system.updateLdapSettings(w), d.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      d.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      n(!1);
    }
  }, { run: I, loading: b } = v(async (w) => {
    const G = await l.validateFields();
    return await F.system.testLdapConnection({
      ...w,
      ...G
    });
  }, {
    onSuccess: (w) => {
      g(w);
    },
    onError: (w) => {
      d.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${w.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      i,
      {
        form: l,
        layout: "vertical",
        onFinish: z,
        initialValues: {
          user_attr: "uid",
          email_attr: "mail",
          display_name_attr: "displayName",
          default_role: "user"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(se, { onChange: (w) => U(w) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: h, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(y, { disabled: !h, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: h, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(y, { disabled: !h, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: h, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(y.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: h, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(y, { disabled: !h, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(y, { disabled: !h, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: h, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(y, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: h, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(y, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: h, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(y, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: h, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(y, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(y, { type: "number", defaultValue: 15, disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(Me, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(se, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(se, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(y.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(y.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(y.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsxs(i.Item, { children: [
            /* @__PURE__ */ e.jsx(X, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(C, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(X, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              C,
              {
                disabled: !h,
                style: { marginLeft: 8 },
                onClick: () => j(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(X, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              C,
              {
                disabled: !h,
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
      W,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: V,
        onCancel: () => j(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            i,
            {
              form: c,
              layout: "vertical",
              onFinish: I,
              children: [
                /* @__PURE__ */ e.jsx(
                  i.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(y, { disabled: !h })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  i.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(y.Password, { disabled: !h })
                  }
                ),
                /* @__PURE__ */ e.jsxs(i.Item, { children: [
                  /* @__PURE__ */ e.jsx(X, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(C, { disabled: !h, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    C,
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
          /* @__PURE__ */ e.jsx(pe, { spinning: b, children: /* @__PURE__ */ e.jsx(et, { active: b, loading: b, children: p && (p.user ? /* @__PURE__ */ e.jsxs(de, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(de.Item, { label: "Username", span: 3, children: p.user.username }),
            /* @__PURE__ */ e.jsx(de.Item, { label: "Email", span: 3, children: p.user.email }),
            /* @__PURE__ */ e.jsx(de.Item, { label: "FullName", span: 3, children: p.user.full_name }),
            /* @__PURE__ */ e.jsx(de.Item, { label: "CreatedAt", span: 3, children: p.user.created_at }),
            /* @__PURE__ */ e.jsx(de.Item, { label: "UpdatedAt", span: 3, children: p.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            tt,
            {
              direction: "vertical",
              current: (M = p.message) == null ? void 0 : M.findIndex((w) => !w.success),
              status: (T = p.message) != null && T.find((w) => !w.success) ? "error" : "finish",
              items: (O = p.message) == null ? void 0 : O.map((w) => ({
                status: w.success ? "finish" : "error",
                title: w.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      Nt,
      {
        visible: S,
        onCancel: () => o(!1),
        fetchItems: () => F.system.importLdapUsers({}),
        importItems: (w) => F.system.importLdapUsers({ user_dn: w }),
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
          render: (w, G, N, J) => J ? /* @__PURE__ */ e.jsx(pe, { indicator: /* @__PURE__ */ e.jsx(ot, { spin: !0 }) }) : w ? /* @__PURE__ */ e.jsx(rt, { twoToneColor: "#52c41a" }) : G.id ? /* @__PURE__ */ e.jsx(te, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(te, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, $t = () => {
  const { t } = $("system"), { t: l } = $("common"), [s] = i.useForm(), [n, p] = k(null), [g, V] = k(!1), [j] = i.useForm(), [S, o] = k(!1), { loading: c } = v(F.system.getSmtpSettings, {
    onSuccess: (b) => {
      s.setFieldsValue(b), o(b.enabled);
    },
    onError: (b) => {
      d.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${b.message}` }));
    }
  });
  Fe(() => {
    p(null);
  }, [g]);
  const { run: h, loading: U } = v(({ port: b, ...M }) => F.system.updateSmtpSettings({ ...M, port: Number(b) }), {
    manual: !0,
    onSuccess: () => {
      d.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (b) => {
      d.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${b.message}` }));
    }
  }), { run: z, loading: I } = v(async (b) => {
    const { port: M, ...T } = await s.validateFields();
    return await F.system.testSmtpConnection({
      ...b,
      ...T,
      port: Number(M)
    });
  }, {
    onSuccess: (b) => {
      p(b);
    },
    onError: (b) => {
      d.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${b.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(pe, { spinning: c, children: /* @__PURE__ */ e.jsxs(
      i,
      {
        form: s,
        layout: "vertical",
        onFinish: h,
        initialValues: {
          port: 587,
          encryption: "STARTTLS"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(se, { onChange: (b) => o(b) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: S, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(y, { disabled: !S, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: S, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(y, { type: "number", disabled: !S, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: S, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(y, { disabled: !S, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(y.Password, { disabled: !S, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: S, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(Ie.Group, { disabled: !S, children: [
                /* @__PURE__ */ e.jsx(Ie.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(Ie.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(Ie.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: S, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(y, { disabled: !S, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(y, { disabled: !S, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(Me, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(Ae, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(Ae, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(Ae, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(i.Item, { children: [
            /* @__PURE__ */ e.jsx(X, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(C, { type: "primary", htmlType: "submit", loading: U, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              C,
              {
                onClick: () => V(!0),
                disabled: !S || I,
                loading: I,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: g,
        onCancel: () => V(!1),
        footer: [
          /* @__PURE__ */ e.jsx(C, { onClick: () => V(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(C, { type: "primary", loading: I, onClick: () => j.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          i,
          {
            form: j,
            layout: "vertical",
            onFinish: (b) => z(b),
            children: [
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  label: t("settings.smtp.testEmailRecipient", { defaultValue: "Recipient Email Address" }),
                  name: "to",
                  rules: [
                    { required: !0, message: t("settings.smtp.testEmailRecipientRequired", { defaultValue: "Recipient email address is required." }) },
                    { type: "email", message: t("settings.smtp.testEmailRecipientInvalid", { defaultValue: "Invalid email address." }) }
                  ],
                  children: /* @__PURE__ */ e.jsx(y, { placeholder: "test@example.com" })
                }
              ),
              n && /* @__PURE__ */ e.jsx(i.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: n.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: n.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, Bt = () => {
  const { t, i18n: l } = $("system"), { t: s } = $("common"), [n] = i.useForm(), { loading: p, data: g, refresh: V } = v(F.system.getSystemBaseSettings, {
    onSuccess: (c) => {
      n.setFieldsValue(c);
    },
    onError: (c) => {
      d.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", c);
    }
  }), { loading: j, run: S } = v(F.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      d.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), V();
    },
    onError: (c) => {
      d.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", c);
    }
  }), o = (c) => {
    S(c);
  };
  return /* @__PURE__ */ e.jsx(pe, { spinning: p, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: n,
      layout: "vertical",
      onFinish: o,
      initialValues: g,
      children: [
        /* @__PURE__ */ e.jsx(i.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Ke, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(i.Item, { name: "name", children: /* @__PURE__ */ e.jsx(y, {}) }) })
        }, ...jt.map((c) => ({
          key: c.lang,
          label: l.language !== c.lang ? s(`language.${c.lang}`, { defaultValue: c.label, lang: c.label }) : c.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(i.Item, { name: ["name_i18n", c.lang], children: /* @__PURE__ */ e.jsx(y, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(i.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(y, {}) }),
        /* @__PURE__ */ e.jsx(i.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(y, {}) }),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(se, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(se, {})
          }
        ),
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            C,
            {
              type: "primary",
              htmlType: "submit",
              loading: j,
              icon: /* @__PURE__ */ e.jsx(Ce, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            C,
            {
              onClick: () => V(),
              icon: /* @__PURE__ */ e.jsx(ue, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: Ht } = y, Kt = () => {
  var oe;
  const { t } = $("ai"), { t: l } = $("common"), [s] = i.useForm(), [n, p] = k(!1), [g, V] = k(null), [j, S] = k(""), [o, c] = k(""), [h, U] = k({}), { loading: z, data: I } = v(
    () => F.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (f) => {
        d.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", f);
      }
    }
  ), b = Oe(() => I == null ? void 0 : I.find((f) => f.provider === o), [I, o]), { loading: M, data: T, refresh: O } = v(
    () => F.ai.listAiModels({ current: 1, page_size: 100, search: j }),
    {
      refreshDeps: [j],
      onError: (f) => {
        d.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", f);
      }
    }
  ), { loading: w, run: G } = v(
    ({ config: f, ...m }) => F.ai.createAiModel({ config: f ?? {}, ...m }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), p(!1), s.resetFields(), O();
      },
      onError: (f) => {
        d.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", f);
      }
    }
  ), { loading: N, run: J } = v(
    ({ id: f, data: m }) => F.ai.updateAiModel({ id: f }, m),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), p(!1), s.resetFields(), V(null), O();
      },
      onError: (f) => {
        d.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", f);
      }
    }
  ), { runAsync: B } = v(
    (f) => F.ai.deleteAiModel({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), O();
      },
      onError: (f) => {
        d.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", f);
      }
    }
  ), { runAsync: q } = v(
    (f) => F.ai.testAiModel({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (f) => {
        d.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", f);
      }
    }
  ), { runAsync: R } = v(
    (f) => F.ai.setDefaultAiModel({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), O();
      },
      onError: (f) => {
        d.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", f);
      }
    }
  ), _ = () => {
    V(null), c(""), U({}), s.resetFields(), p(!0);
  }, u = (f) => {
    V(f), c(f.provider);
    const m = f.config || {}, D = {
      name: f.name,
      description: f.description,
      provider: f.provider,
      is_default: f.is_default,
      config: m,
      // Spread config fields to form
      status: f.status
    };
    console.log(D), U(D), s.setFieldsValue(D), p(!0);
  }, P = (f) => {
    c(f), b != null && b.config_fields && b.config_fields.forEach((m) => {
      s.setFieldValue(m.name, void 0);
    });
  }, le = (f) => {
    const m = {};
    b != null && b.config_fields && b.config_fields.forEach((ee) => {
      var ne;
      const Q = (ne = f.config) == null ? void 0 : ne[ee.name];
      Q != null && Q !== "" && (m[ee.name] = Q);
    });
    const D = {
      name: f.name,
      description: f.description,
      provider: f.provider,
      config: m,
      is_default: f.is_default,
      status: f.status
    };
    g ? J({ id: g.id, data: D }) : G(D);
  }, ae = (f) => {
    var D;
    if (!((D = f.data_source) != null && D.depends_on))
      return {};
    const m = {};
    return f.data_source.depends_on.forEach((ee) => {
      m[ee] = h[ee];
    }), m;
  }, ie = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (f, m) => /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx("span", { children: f }),
        m.is_default && /* @__PURE__ */ e.jsx(st, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(dt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (f) => /* @__PURE__ */ e.jsx(te, { color: "blue", children: f.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (f) => /* @__PURE__ */ e.jsx(te, { color: f === "enabled" ? "green" : "red", children: f === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (f, m) => /* @__PURE__ */ e.jsx(Te, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(We, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => q(m.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(ut, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => R(m.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Se, {}),
          tooltip: l("edit", { defaultValue: "Edit" }),
          onClick: async () => u(m)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(he, {}),
          tooltip: l("delete", { defaultValue: "Delete" }),
          onClick: async () => B(m.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(Y, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ze, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(be, { children: /* @__PURE__ */ e.jsx(
        y.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: j,
          onChange: (f) => S(f.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(be, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(
          C,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ue, {}),
            onClick: O,
            loading: M,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(X, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          C,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ve, {}),
            onClick: _,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(Y, { children: /* @__PURE__ */ e.jsx(
      ke,
      {
        columns: ie,
        dataSource: (T == null ? void 0 : T.data) || [],
        loading: M,
        rowKey: "id",
        pagination: {
          total: (T == null ? void 0 : T.total) || 0,
          current: (T == null ? void 0 : T.current) || 1,
          pageSize: (T == null ? void 0 : T.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (f, m) => t("common.pagination.total", {
            defaultValue: `${m[0]}-${m[1]} of ${f} items`,
            start: m[0],
            end: m[1],
            total: f
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: g ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: n,
        onCancel: () => {
          p(!1), s.resetFields(), V(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          i,
          {
            form: s,
            layout: "vertical",
            onFinish: le,
            onValuesChange: (f, m) => U(m),
            children: [
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(y, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Ht,
                    {
                      rows: 3,
                      placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "provider",
                  label: t("models.provider", { defaultValue: "Provider" }),
                  rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    L,
                    {
                      loading: z,
                      placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                      onChange: P,
                      value: o,
                      options: I == null ? void 0 : I.map((f) => ({
                        label: f.name,
                        value: f.provider
                      }))
                    }
                  )
                }
              ),
              (oe = b == null ? void 0 : b.config_fields) == null ? void 0 : oe.map((f) => /* @__PURE__ */ e.jsx(
                Qe,
                {
                  field: f,
                  selectedType: o,
                  dependentValues: ae(f),
                  formValues: h
                },
                f.name
              )),
              /* @__PURE__ */ e.jsxs(
                i.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(se, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(i.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(y, {}) }),
              /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: w || N,
                    children: g ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    onClick: () => {
                      p(!1), s.resetFields(), V(null), c(""), U({});
                    },
                    children: l("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    )
  ] });
}, { TextArea: Wt } = y, Gt = () => {
  var we;
  const { t } = $("system"), { t: l } = $("common"), [s] = i.useForm(), [n, p] = k(!1), [g, V] = k(null), [j, S] = k(""), [o, c] = k(!1), [h, U] = k(null), [z, I] = k(""), [b, M] = k(!1), [T, O] = k([]), [w, G] = k({}), [N, J] = k(), { loading: B, data: q, refresh: R } = v(
    () => F.system.listToolSets({ current: 1, page_size: 100, search: j, type: N }),
    {
      refreshDeps: [j, N],
      onError: (a) => {
        d.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", a);
      }
    }
  ), { loading: _, data: u } = v(
    () => F.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (a) => {
        d.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", a);
      }
    }
  ), P = Oe(() => u == null ? void 0 : u.find((a) => a.tool_set_type === z), [u, z]), { loading: le, run: ae } = v(
    (a) => F.system.createToolSet({
      ...a,
      type: a.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), p(!1), s.resetFields(), R();
      },
      onError: (a) => {
        d.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", a);
      }
    }
  ), { loading: ie, run: oe } = v(
    ({ id: a, data: r }) => F.system.updateToolSet({ id: a }, {
      ...r,
      type: r.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), p(!1), s.resetFields(), V(null), R();
      },
      onError: (a) => {
        d.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", a);
      }
    }
  ), { run: f } = v(
    (a) => F.system.deleteToolSet({ id: a }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), R();
      },
      onError: (a) => {
        d.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", a);
      }
    }
  ), { runAsync: m } = v(
    (a) => F.system.testToolSet({ id: a }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (a) => {
        d.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", a);
      }
    }
  ), { loading: D, runAsync: ee } = v(
    (a) => F.system.getToolSetTools({ id: a }),
    {
      manual: !0,
      onSuccess: (a) => {
        O(a || []), M(!0);
      },
      onError: (a) => {
        d.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", a);
      }
    }
  ), { runAsync: Q } = v(
    ({ id: a, status: r }) => F.system.updateToolSetStatus({ id: a }, { status: r }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), R();
      },
      onError: (a) => {
        d.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", a);
      }
    }
  ), ne = () => {
    V(null), s.resetFields(), I(""), p(!0);
  }, me = (a) => {
    V(a), I(a.type);
    const r = { ...a };
    if (r.config) {
      const A = u == null ? void 0 : u.find((E) => E.tool_set_type === a.type);
      if (A) {
        const E = {};
        A.config_fields.forEach((Z) => {
          var Ve, Re;
          Z.type === "object" && ((Ve = r.config) != null && Ve[Z.name]) ? E[Z.name] = JSON.stringify(r.config[Z.name], null, 2) : ((Re = r.config) == null ? void 0 : Re[Z.name]) !== void 0 && (E[Z.name] = r.config[Z.name]);
        }), r.config = E;
      }
    }
    s.setFieldsValue(r), p(!0);
  };
  console.log(z, u);
  const xe = (a) => {
    I(a);
    const r = u == null ? void 0 : u.find((A) => A.tool_set_type === a);
    if (r) {
      const A = {};
      r.config_fields.forEach((E) => {
        if (E.default)
          switch (E.type) {
            case "number":
              A[E.name] = Number(E.default);
              break;
            case "boolean":
              A[E.name] = E.default === "true";
              break;
            case "array":
              A[E.name] = E.default.split(",");
              break;
            default:
              A[E.name] = E.default;
          }
      }), s.setFieldValue("config", A);
    } else
      s.setFieldValue("config", void 0);
  }, fe = (a) => {
    if (a.config && P) {
      const r = {};
      P.config_fields.forEach((A) => {
        var Z;
        const E = (Z = a.config) == null ? void 0 : Z[A.name];
        if (E !== void 0)
          if (A.type === "object")
            try {
              r[A.name] = typeof E == "string" ? JSON.parse(E) : E;
            } catch {
              r[A.name] = E;
            }
          else
            r[A.name] = E;
      }), a.config = r;
    }
    g ? oe({ id: g.id, data: a }) : ae(a);
  }, ge = (a) => {
    f(a);
  }, x = (a) => {
    U(a), c(!0);
  }, K = (a) => {
    console.log(/* @__PURE__ */ new Date(), "handleToggleStatus");
    const r = a.status === "enabled" ? "disabled" : "enabled";
    return Q({ id: a.id, status: r }).then(() => {
      console.log(/* @__PURE__ */ new Date(), "handleToggleStatus1");
    });
  }, re = (a) => {
    var A;
    if (!((A = a.data_source) != null && A.depends_on) || a.data_source.depends_on.length === 0)
      return {};
    const r = {};
    return a.data_source.depends_on.forEach((E) => {
      var Ve;
      const Z = (Ve = w.config) == null ? void 0 : Ve[E];
      Z !== void 0 && (r[E] = Z);
    }), r;
  };
  console.log(q);
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
      render: (a) => /* @__PURE__ */ e.jsx(te, { color: "blue", children: a.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (a) => /* @__PURE__ */ e.jsx(te, { color: a === "enabled" ? "green" : "red", children: a === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (a, r) => /* @__PURE__ */ e.jsx(Te, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(ct, {}),
          disabled: r.status !== "enabled",
          onClick: async () => m(r.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          permission: "system:toolsets:view",
          disabled: r.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => ee(r.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(mt, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => x(r.config),
          disabled: !r.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Se, {}),
          onClick: async () => me(r)
        },
        {
          key: "toggleStatus",
          icon: r.status === "enabled" ? /* @__PURE__ */ e.jsx(ft, {}) : /* @__PURE__ */ e.jsx(We, {}),
          onClick: async () => K(r),
          permission: "system:toolsets:update",
          tooltip: r.status === "enabled" ? l("disable", { defaultValue: "Disable" }) : l("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(he, {}),
          permission: "system:toolsets:delete",
          tooltip: l("delete", { defaultValue: "Delete" }),
          onClick: async () => ge(r.id),
          danger: !0,
          confirm: {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => ge(r.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(Y, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ze, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(be, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(
          y.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            value: j,
            onChange: (a) => S(a.target.value),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          L,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: N,
            onChange: (a) => J(a),
            options: u == null ? void 0 : u.map((a) => ({
              label: a.name,
              value: a.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(L.Option, { value: "", children: "All" }),
              u == null ? void 0 : u.map((a) => /* @__PURE__ */ e.jsx(L.Option, { value: a.tool_set_type, children: a.name }, a.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(be, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(
          C,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ue, {}),
            onClick: R,
            loading: B,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(X, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          C,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ve, {}),
            onClick: ne,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(Y, { children: /* @__PURE__ */ e.jsx(
      ke,
      {
        columns: ye,
        dataSource: (q == null ? void 0 : q.data) || [],
        loading: B,
        rowKey: "id",
        pagination: {
          total: (q == null ? void 0 : q.total) || 0,
          current: (q == null ? void 0 : q.current) || 1,
          pageSize: (q == null ? void 0 : q.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (a, r) => t("common.pagination.total", {
            defaultValue: `${r[0]}-${r[1]} of ${a} items`,
            start: r[0],
            end: r[1],
            total: a
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: g ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: n,
        onCancel: () => {
          p(!1), s.resetFields(), V(null), I("");
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          i,
          {
            form: s,
            layout: "vertical",
            onFinish: fe,
            onValuesChange: (a, r) => G(r),
            children: [
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(y, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "description",
                  label: t("settings.toolsets.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Wt,
                    {
                      rows: 3,
                      placeholder: t("settings.toolsets.descriptionPlaceholder", { defaultValue: "Enter toolset description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "type",
                  label: t("settings.toolsets.type", { defaultValue: "Type" }),
                  rules: [{ required: !0, message: t("settings.toolsets.typeRequired", { defaultValue: "Please select type" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    L,
                    {
                      loading: _,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: xe,
                      value: z,
                      options: u == null ? void 0 : u.map((a) => ({
                        label: a.name,
                        value: a.tool_set_type
                      }))
                    }
                  )
                }
              ),
              (we = P == null ? void 0 : P.config_fields) == null ? void 0 : we.map((a) => /* @__PURE__ */ e.jsx(
                Qe,
                {
                  field: a,
                  selectedType: z,
                  dependentValues: re(a),
                  formValues: w
                },
                a.name
              )),
              /* @__PURE__ */ e.jsx(i.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(y, {}) }),
              /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: le || ie,
                    children: g ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    onClick: () => {
                      p(!1), s.resetFields(), V(null), I("");
                    },
                    children: l("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: o,
        onCancel: () => c(!1),
        footer: [
          /* @__PURE__ */ e.jsx(C, { onClick: () => c(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(h, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: b,
        onCancel: () => M(!1),
        footer: [
          /* @__PURE__ */ e.jsx(C, { onClick: () => M(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: D ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ue, { style: { fontSize: 24 }, spin: !0 }) }) : T.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : T.map((a, r) => {
          var A, E, Z;
          return /* @__PURE__ */ e.jsx(
            Y,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(H, { children: [
                /* @__PURE__ */ e.jsx(Ne, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((A = a.function) == null ? void 0 : A.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(ze, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(be, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((E = a.function) == null ? void 0 : E.description) || "-" })
                ] }),
                ((Z = a.function) == null ? void 0 : Z.parameters) && /* @__PURE__ */ e.jsxs(be, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(a.function.parameters, null, 2) })
                ] })
              ] })
            },
            r
          );
        }) })
      }
    )
  ] });
}, { TextArea: Be } = y, Zt = () => {
  const { t } = $("system"), { t: l } = $("common"), s = _e(), [n] = i.useForm(), [p, g] = k(""), [V, j] = k(), [S, o] = k(!1), [c, h] = k(null), [U, z] = k(!1), [I] = i.useForm(), { loading: b, data: M, refresh: T } = v(
    () => F.system.listSkills({
      current: 1,
      page_size: 100,
      search: p || void 0,
      domain: V
    }),
    {
      refreshDeps: [p, V],
      onError: () => {
        d.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: O } = v(() => F.system.listSkillDomains()), w = O ?? [], G = (M == null ? void 0 : M.data) ?? [], N = (M == null ? void 0 : M.total) ?? 0, { loading: J, run: B } = v(
    (m) => F.system.createSkill(m),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" })), o(!1), n.resetFields(), T();
      },
      onError: () => {
        d.error(t("settings.skills.createFailed", { defaultValue: "Failed to create skill" }));
      }
    }
  ), { loading: q, run: R } = v(
    ({ id: m, body: D }) => F.system.updateSkill({ id: m }, D),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" })), o(!1), h(null), n.resetFields(), T();
      },
      onError: () => {
        d.error(t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }));
      }
    }
  ), { run: _ } = v(
    (m) => F.system.deleteSkill({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), T();
      },
      onError: () => {
        d.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), { loading: u, run: P } = v(
    (m) => F.system.uploadSkill(m.body, m.file),
    {
      manual: !0,
      onSuccess: () => {
        d.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), z(!1), I.resetFields(), T();
      },
      onError: () => {
        d.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), le = () => {
    h(null), n.resetFields(), o(!0);
  }, ae = (m) => {
    h(m), n.setFieldsValue({
      name: m.name,
      description: m.description,
      category: m.category,
      domain: m.domain
    }), o(!0);
  }, ie = () => {
    n.validateFields().then((m) => {
      c ? R({
        id: c.id,
        body: {
          name: m.name,
          description: m.description ?? "",
          category: m.category ?? "",
          domain: m.domain ?? ""
        }
      }) : B({
        name: m.name,
        description: m.description ?? "",
        category: m.category ?? "",
        domain: m.domain ?? "",
        content: m.content ?? ""
      });
    });
  }, oe = () => {
    var ne, me;
    const m = (ne = I.getFieldValue("file")) == null ? void 0 : ne.fileList, D = ((me = m == null ? void 0 : m[0]) == null ? void 0 : me.originFileObj) ?? (m == null ? void 0 : m[0]);
    if (!D) {
      d.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const ee = I.getFieldValue("category"), Q = I.getFieldValue("domain");
    P({ body: { category: ee, domain: Q }, file: D });
  }, f = [
    { title: t("settings.skills.name", { defaultValue: "Name" }), dataIndex: "name", key: "name" },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (m) => m ? /* @__PURE__ */ e.jsx(te, { children: m }) : "-" },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (m) => m ? /* @__PURE__ */ e.jsx(te, { color: "blue", children: m }) : "-" },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (m, D) => /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(X, { permission: "system:skills:edit_files", children: /* @__PURE__ */ e.jsx(C, { type: "link", size: "small", icon: /* @__PURE__ */ e.jsx(pt, {}), onClick: () => s(`/system/settings/skills/${D.id}/edit`), children: t("settings.skills.editFiles", { defaultValue: "Edit files" }) }) }),
        /* @__PURE__ */ e.jsx(X, { permission: "system:skills:view", children: /* @__PURE__ */ e.jsx(C, { type: "link", size: "small", icon: /* @__PURE__ */ e.jsx(Ge, {}), onClick: () => s(`/system/settings/skills/${D.id}/preview`), children: l("preview", { defaultValue: "Preview" }) }) }),
        /* @__PURE__ */ e.jsx(X, { permission: "system:skills:update", children: /* @__PURE__ */ e.jsx(C, { type: "link", size: "small", icon: /* @__PURE__ */ e.jsx(Se, {}), onClick: () => ae(D), children: l("edit", { defaultValue: "Edit" }) }) }),
        /* @__PURE__ */ e.jsx(X, { permission: "system:skills:delete", children: /* @__PURE__ */ e.jsx(C, { type: "link", size: "small", danger: !0, icon: /* @__PURE__ */ e.jsx(he, {}), onClick: () => W.confirm({ title: l("confirmDelete", { defaultValue: "Confirm delete?" }), onOk: () => _(D.id) }), children: l("delete", { defaultValue: "Delete" }) }) })
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    Y,
    {
      title: t("settings.skills.title", { defaultValue: "AI Agent Skills" }),
      extra: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(
          y.Search,
          {
            placeholder: l("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: g,
            style: { width: 200 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          L,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: V,
            onChange: j,
            options: w.map((m) => ({ value: m, label: m }))
          }
        ),
        /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(ue, {}), onClick: () => T(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(X, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(C, { type: "primary", icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: le, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(X, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(De, {}), onClick: () => z(!0), children: t("settings.skills.upload", { defaultValue: "Upload" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsx(
          ke,
          {
            rowKey: "id",
            loading: b,
            columns: f,
            dataSource: G,
            pagination: { total: N, pageSize: 10, showSizeChanger: !0 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: c ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
            open: S,
            onOk: ie,
            onCancel: () => {
              o(!1), h(null);
            },
            confirmLoading: J || q,
            width: 560,
            children: /* @__PURE__ */ e.jsxs(i, { form: n, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(i.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(y, {}) }),
              /* @__PURE__ */ e.jsx(i.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(Be, { rows: 2 }) }),
              /* @__PURE__ */ e.jsx(i.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(y, {}) }),
              /* @__PURE__ */ e.jsx(i.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(L, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: w.map((m) => ({ value: m, label: m })) }) }),
              !c && /* @__PURE__ */ e.jsx(i.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(Be, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
            open: U,
            onOk: oe,
            onCancel: () => z(!1),
            confirmLoading: u,
            children: /* @__PURE__ */ e.jsxs(i, { form: I, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(i.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(lt, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(De, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
              /* @__PURE__ */ e.jsx(i.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(y, {}) }),
              /* @__PURE__ */ e.jsx(i.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(L, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: w.map((m) => ({ value: m, label: m })) }) })
            ] })
          }
        )
      ]
    }
  );
}, Jt = () => {
  const { t } = $("system"), { t: l } = $("common"), [s] = i.useForm(), { data: n } = v(F.system.listLogStorageBackends), p = (n ?? []).map((c) => ({
    value: c.id,
    label: t(`settings.task.logStorage.${c.id}`, { defaultValue: c.name })
  })), { loading: g, refresh: V } = v(F.system.getTaskSettings, {
    onSuccess: (c) => {
      c && s.setFieldsValue({
        max_concurrent: c.max_concurrent,
        log_storage_backend: c.log_storage_backend ?? "database"
      });
    },
    onError: () => {
      d.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: j, run: S } = v(F.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      d.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), V();
    },
    onError: () => {
      d.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), o = (c) => {
    S(c);
  };
  return /* @__PURE__ */ e.jsx(pe, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: s,
      layout: "vertical",
      onFinish: o,
      initialValues: { max_concurrent: 10, log_storage_backend: "database" },
      children: [
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "log_storage_backend",
            label: t("settings.task.logStorageBackend", { defaultValue: "Log storage" }),
            tooltip: t("settings.task.logStorageBackendTooltip", {
              defaultValue: "Where task execution logs are stored. Database stores logs in the application database."
            }),
            children: /* @__PURE__ */ e.jsx(
              L,
              {
                options: p,
                placeholder: t("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: n === void 0
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "max_concurrent",
            label: t("settings.task.maxConcurrent", { defaultValue: "Max concurrent tasks" }),
            tooltip: t("settings.task.maxConcurrentTooltip", {
              defaultValue: "Maximum number of tasks that can run at the same time."
            }),
            rules: [{ type: "number", min: 1, max: 100 }],
            children: /* @__PURE__ */ e.jsx(ce, { min: 1, max: 100, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(C, { type: "primary", htmlType: "submit", loading: j, icon: /* @__PURE__ */ e.jsx(Ce, {}), children: l("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(C, { onClick: () => V(), icon: /* @__PURE__ */ e.jsx(ue, {}), children: l("refresh", { defaultValue: "Refresh" }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: Qt } = y, Xt = () => {
  const t = _e(), { t: l } = $("system"), { t: s } = $("common"), [n] = i.useForm(), [p, g] = k(!1), [V, j] = k(null), [S, o] = k(""), [c, h] = k(1), [U, z] = k(10), { loading: I, data: b, refresh: M } = v(
    () => vt({ current: c, page_size: U, search: S }),
    {
      refreshDeps: [c, U, S],
      onError: (u) => {
        d.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", u);
      }
    }
  ), { loading: T, run: O } = v(
    (u) => _t(u),
    {
      manual: !0,
      onSuccess: () => {
        d.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), g(!1), n.resetFields(), j(null), M();
      },
      onError: (u) => {
        d.error((u == null ? void 0 : u.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: w, run: G } = v(
    ({ id: u, ...P }) => Ft({ id: u }, P),
    {
      manual: !0,
      onSuccess: () => {
        d.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), g(!1), n.resetFields(), j(null), M();
      },
      onError: (u) => {
        d.error((u == null ? void 0 : u.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: N } = v(
    (u) => Ct({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), M();
      },
      onError: (u) => {
        d.error((u == null ? void 0 : u.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), J = () => {
    j(null), n.resetFields(), n.setFieldsValue({ status: "active" }), g(!0);
  }, B = (u) => {
    j(u), n.setFieldsValue({
      name: u.name,
      description: u.description,
      status: u.status
    }), g(!0);
  }, q = (u) => {
    W.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${u.name}"? This action cannot be undone.`
      }),
      onOk: () => N(u.id)
    });
  }, R = () => {
    n.validateFields().then((u) => {
      V ? G({ id: V.id, ...u }) : O(u);
    });
  }, _ = [
    {
      title: l("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: l("settings.organizations.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: l("settings.organizations.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (u) => /* @__PURE__ */ e.jsx(te, { color: u === "active" ? "green" : "default", children: u === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (u, P) => /* @__PURE__ */ e.jsx(
        Te,
        {
          actions: [
            {
              key: "view",
              label: s("view", { defaultValue: "View" }),
              icon: /* @__PURE__ */ e.jsx(Ge, {}),
              onClick: async () => t(`/system/settings/organizations/${P.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              label: s("edit", { defaultValue: "Edit" }),
              icon: /* @__PURE__ */ e.jsx(Se, {}),
              onClick: async () => B(P),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              label: s("delete", { defaultValue: "Delete" }),
              icon: /* @__PURE__ */ e.jsx(he, {}),
              danger: !0,
              onClick: async () => q(P),
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
      title: l("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(ue, {}), onClick: M, children: s("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(X, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(C, { type: "primary", icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: J, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(H, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            y.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (u) => {
                o(u), h(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            ke,
            {
              columns: _,
              dataSource: (b == null ? void 0 : b.data) || [],
              loading: I,
              rowKey: "id",
              pagination: {
                current: c,
                pageSize: U,
                total: (b == null ? void 0 : b.total) || 0,
                showSizeChanger: !0,
                showTotal: (u, P) => l("common.pagination.total", {
                  defaultValue: `${P[0]}-${P[1]} of ${u} items`,
                  start: P[0],
                  end: P[1],
                  total: u
                }),
                onChange: (u, P) => {
                  h(u), z(P);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: V ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: p,
            onOk: R,
            onCancel: () => {
              g(!1), n.resetFields(), j(null);
            },
            confirmLoading: T || w,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(i, { form: n, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "name",
                  label: l("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: l("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(y, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "description",
                  label: l("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Qt, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "status",
                  label: l("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(L, { children: [
                    /* @__PURE__ */ e.jsx(L.Option, { value: "active", children: l("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(L.Option, { value: "disabled", children: l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, Yt = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = $("system"), s = _e(), n = kt(), V = n.hash.replace("#", "") || "base", { enableMultiOrg: j } = zt(), { hasPermission: S } = Mt(), o = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(Bt, {}),
      hidden: !S("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(qt, {}),
      hidden: !S("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Ut, {}),
      hidden: !S("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Dt, {}),
      hidden: !S("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx($t, {}),
      hidden: !S("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(Kt, {}),
      hidden: !S("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(Gt, {}),
      hidden: !S("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(Zt, {}),
      hidden: !S("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Jt, {}),
      hidden: !S("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...j ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Xt, {}),
      hidden: !S("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(Y, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Ke,
    {
      defaultActiveKey: V,
      onChange: (c) => {
        s(`${n.pathname}#${c}`);
      },
      items: t(o.filter((c) => !c.hidden), l)
    }
  ) });
}, js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yt
}, Symbol.toStringTag, { value: "Module" })), es = () => {
  var xe, fe, ge;
  const t = _e(), { id: l } = Pe(), { t: s } = $("system"), { t: n } = $("common"), [p] = i.useForm(), [g] = i.useForm(), [V, j] = k(!1), [S, o] = k(!1), [c, h] = k(null), [U, z] = k(""), [I, b] = k(1), [M, T] = k(10), { data: O, loading: w, refresh: G } = v(
    () => wt({ id: l }),
    {
      ready: !!l,
      onError: (x) => {
        d.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", x);
      }
    }
  ), { data: N, loading: J, refresh: B } = v(
    () => It({ id: l, current: I, page_size: M, search: U }),
    {
      ready: !!l,
      refreshDeps: [l, I, M, U],
      onError: (x) => {
        d.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", x);
      }
    }
  ), { data: q, loading: R } = v(
    () => Ot({ current: 1, page_size: 1e3 }),
    {
      ready: V
    }
  ), { data: _, loading: u } = v(
    () => Pt({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: P, run: le } = v(
    (x) => Tt({ id: l }, x),
    {
      manual: !0,
      onSuccess: () => {
        d.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), j(!1), p.resetFields(), B();
      },
      onError: (x) => {
        d.error((x == null ? void 0 : x.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: ae, run: ie } = v(
    (x) => At({ id: l, user_id: c == null ? void 0 : c.id }, x),
    {
      manual: !0,
      onSuccess: () => {
        d.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), o(!1), g.resetFields(), h(null), B();
      },
      onError: (x) => {
        d.error((x == null ? void 0 : x.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: oe } = v(
    (x) => Et({ id: l, user_id: x }),
    {
      manual: !0,
      onSuccess: () => {
        d.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), B();
      },
      onError: (x) => {
        d.error((x == null ? void 0 : x.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), f = () => {
    j(!0), p.resetFields();
  }, m = (x) => {
    var K;
    h(x), g.setFieldsValue({
      role_ids: ((K = x.organization_roles) == null ? void 0 : K.map((re) => re.id)) || []
    }), o(!0);
  }, D = (x) => {
    W.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${x.full_name || x.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => oe(x.id)
    });
  }, ee = () => {
    p.validateFields().then((x) => {
      le(x);
    });
  }, Q = () => {
    g.validateFields().then((x) => {
      ie(x);
    });
  }, ne = ((xe = q == null ? void 0 : q.data) == null ? void 0 : xe.filter((x) => {
    var K;
    return !((K = N == null ? void 0 : N.data) != null && K.some((re) => re.id === x.id));
  })) || [], me = [
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
      render: (x) => /* @__PURE__ */ e.jsx(te, { color: x === "active" ? "green" : "default", children: x === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : x })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (x, K) => {
        var re;
        return /* @__PURE__ */ e.jsx(H, { wrap: !0, children: ((re = K.organization_roles) == null ? void 0 : re.map((ye) => /* @__PURE__ */ e.jsx(te, { children: ye.name }, ye.id))) || /* @__PURE__ */ e.jsx(te, { children: "No roles" }) });
      }
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (x, K) => /* @__PURE__ */ e.jsx(
        Te,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Se, {}),
              onClick: async () => m(K)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(he, {}),
              danger: !0,
              onClick: async () => D(K)
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
        title: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            C,
            {
              icon: /* @__PURE__ */ e.jsx(gt, {}),
              onClick: () => t("/system/settings#organizations"),
              children: n("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            O == null ? void 0 : O.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(ue, {}), onClick: () => {
          G(), B();
        }, children: n("refresh", { defaultValue: "Refresh" }) }),
        loading: w,
        children: /* @__PURE__ */ e.jsxs(de, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(de.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: O == null ? void 0 : O.name }),
          /* @__PURE__ */ e.jsx(de.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(te, { color: (O == null ? void 0 : O.status) === "active" ? "green" : "default", children: (O == null ? void 0 : O.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(de.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (O == null ? void 0 : O.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Y,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(C, { type: "primary", icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: f, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(H, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            y.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (x) => {
                z(x), b(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            ke,
            {
              columns: me,
              dataSource: (N == null ? void 0 : N.data) || [],
              loading: J,
              rowKey: "id",
              pagination: {
                current: I,
                pageSize: M,
                total: (N == null ? void 0 : N.total) || 0,
                showSizeChanger: !0,
                showTotal: (x) => n("pagination.total", { defaultValue: `Total ${x} items` }),
                onChange: (x, K) => {
                  b(x), T(K);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: V,
        onOk: ee,
        onCancel: () => {
          j(!1), p.resetFields();
        },
        confirmLoading: P,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(i, { form: p, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              name: "user_id",
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: s("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                L,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: R,
                  filterOption: (x, K) => ((K == null ? void 0 : K.label) ?? "").toLowerCase().includes(x.toLowerCase()),
                  options: ne.map((x) => ({
                    label: `${x.full_name || x.username} (${x.email})`,
                    value: x.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              name: "role_ids",
              label: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                L,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: u,
                  options: ((fe = _ == null ? void 0 : _.data) == null ? void 0 : fe.map((x) => ({
                    label: x.name,
                    value: x.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: S,
        onOk: Q,
        onCancel: () => {
          o(!1), g.resetFields(), h(null);
        },
        confirmLoading: ae,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(i, { form: g, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                y,
                {
                  value: (c == null ? void 0 : c.full_name) || (c == null ? void 0 : c.username),
                  disabled: !0
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              name: "role_ids",
              label: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                L,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: u,
                  options: ((ge = _ == null ? void 0 : _.data) == null ? void 0 : ge.map((x) => ({
                    label: x.name,
                    value: x.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: es
}, Symbol.toStringTag, { value: "Module" })), ts = Rt(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: He } = y, ss = (t) => t.toLowerCase().endsWith(".md");
function Ye(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(Ze, {}) : /* @__PURE__ */ e.jsx(Je, {}),
      children: (s = l.children) != null && s.length ? Ye(l.children) : void 0
    };
  });
}
function Ee(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const ls = () => {
  const { styles: t } = ts(), { id: l } = Pe(), s = _e(), { t: n } = $("system"), [p, g] = k(null), [V, j] = k(null), [S, o] = k(!1), [c, h] = k(""), [U, z] = k(!1), [I, b] = k([]), [M, T] = k(!1), [O, w] = k(!1), [G, N] = k(""), [J] = i.useForm(), [B, q] = k(null), [R, _] = k(null), [u, P] = k(""), [le] = i.useForm(), { data: ae } = v(
    () => l ? F.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: ie, loading: oe, refresh: f } = v(
    () => l ? F.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (a) => {
        if (!p) {
          for (const r of a)
            if (!r.is_dir && r.name === "SKILL.md") {
              j(r.path), g(r.path), o(!1);
              return;
            }
          for (const r of a)
            if (!r.is_dir && r.name === "SKILLS.md") {
              j(r.path), g(r.path), o(!1);
              return;
            }
        }
      }
    }
  ), m = (ae == null ? void 0 : ae.data) ?? ae, D = (ie == null ? void 0 : ie.data) ?? ie ?? [], ee = Oe(() => Ye(D), [D]), Q = S && V ? V : p ? Ee(p) : "";
  Fe(() => {
    p && l ? (F.system.getSkillFile({ id: l, path: p }).then((a) => h((a == null ? void 0 : a.data) ?? a ?? "")).catch(() => d.error(n("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), z(!1)) : (h(""), z(!1));
  }, [l, p, n]);
  const ne = () => {
    !l || !p || F.system.putSkillFile({ id: l, path: p }, c).then(() => {
      d.success(n("settings.skills.editor.saved", { defaultValue: "Saved" })), z(!1);
    }).catch(() => d.error(n("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, me = (a, r) => {
    const A = String(r.node.key), E = !r.node.isLeaf;
    j(A), o(E), r.node.isLeaf ? g(A) : g(null);
  }, xe = (a) => {
    a.event.preventDefault(), q({
      path: String(a.node.key),
      isDir: !a.node.isLeaf,
      x: a.event.clientX,
      y: a.event.clientY
    });
  }, fe = qe(() => q(null), []), ge = qe(
    (a) => {
      if (!l || !B) return;
      const { path: r, isDir: A } = B;
      switch (fe(), a) {
        case "open":
          g(r), j(r), o(!1);
          break;
        case "rename": {
          const E = r.includes("/") ? r.split("/").pop() : r;
          _({ path: r, isDir: A }), P(E), setTimeout(() => le.setFieldsValue({ name: E }), 0);
          break;
        }
        case "delete":
          W.confirm({
            title: n("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: A ? n("settings.skills.editor.deleteConfirmContentDir", { path: r, defaultValue: `Delete ${r}? This will remove the folder and all its contents.` }) : n("settings.skills.editor.deleteConfirmContent", { path: r, defaultValue: `Delete ${r}?` }),
            onOk: () => F.system.deleteSkillPath({ id: l, path: r }).then(() => {
              d.success(n("settings.skills.editor.deleted", { defaultValue: "Deleted" })), p === r && (g(null), h("")), V === r && (j(null), o(!1)), f();
            }).catch(() => d.error(n("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          j(r), o(A), T(!0);
          break;
        case "newDir":
          j(r), o(A), w(!0);
          break;
      }
    },
    [l, B, fe, f, p, V, le, n]
  ), x = () => {
    if (!l || !R) return;
    const a = (le.getFieldValue("name") ?? u).trim();
    if (!a) {
      d.error(n("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!R.isDir && !/\.(md|txt)$/i.test(a)) {
      d.error(n("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const r = Ee(R.path), A = r ? `${r}/${a}` : a;
    if (A === R.path) {
      _(null);
      return;
    }
    F.system.moveSkillPath({ id: l }, { from_path: R.path, to_path: A }).then(() => {
      d.success(n("settings.skills.editor.renamed", { defaultValue: "Renamed" })), p === R.path && g(A), V === R.path && j(A), _(null), f();
    }).catch(() => d.error(n("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, K = (a) => {
    if (!l) return;
    const r = String(a.dragNode.key), A = String(a.dragNode.title);
    let E;
    if (a.dropToGap) {
      const Z = Ee(String(a.node.key));
      E = Z ? `${Z}/${A}` : A;
    } else
      E = `${a.node.key}/${A}`;
    E !== r && F.system.moveSkillPath({ id: l }, { from_path: r, to_path: E }).then(() => {
      d.success(n("settings.skills.editor.moved", { defaultValue: "Moved" })), p === r && g(E), V === r && j(E), f();
    }).catch(() => d.error(n("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, re = () => {
    const a = G.trim();
    if (!a || !l) return;
    const r = Q ? `${Q}/${a}` : a;
    if (!/\.(md|txt)$/i.test(a)) {
      d.error(n("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    F.system.putSkillFile({ id: l, path: r }, "").then(() => {
      d.success(n("settings.skills.editor.fileCreated", { defaultValue: "File created" })), T(!1), N(""), f(), g(r), h("");
    }).catch(() => d.error(n("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, ye = () => {
    var A;
    const a = (A = J.getFieldValue("name")) == null ? void 0 : A.trim();
    if (!a || !l) return;
    const r = Q ? `${Q}/${a}` : a;
    F.system.createSkillDir({ id: l }, { path: r }).then(() => {
      d.success(n("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), w(!1), J.resetFields(), f();
    }).catch(() => d.error(n("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, we = () => {
    const a = V || p;
    !l || !a || W.confirm({
      title: n("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: n("settings.skills.editor.deleteConfirmContent", { path: a, defaultValue: `Delete ${a}?` }),
      onOk: () => F.system.deleteSkillPath({ id: l, path: a }).then(() => {
        d.success(n("settings.skills.editor.deleted", { defaultValue: "Deleted" })), p === a && (g(null), h("")), V === a && (j(null), o(!1)), f();
      }).catch(() => d.error(n("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    Y,
    {
      title: (m == null ? void 0 : m.name) ?? n("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(C, { type: "link", onClick: () => s("/system/settings#skills"), children: n("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 16, flex: 1, minHeight: 0 }, children: [
          /* @__PURE__ */ e.jsxs("div", { style: { width: 260, border: "1px solid #d9d9d9", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            /* @__PURE__ */ e.jsxs(H, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(C, { size: "small", icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: () => T(!0), children: n("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(C, { size: "small", icon: /* @__PURE__ */ e.jsx(Ze, {}), onClick: () => w(!0), children: n("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            oe ? /* @__PURE__ */ e.jsx("div", { children: n("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              at,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !0,
                expandedKeys: I,
                onExpand: (a) => b(a),
                selectedKeys: V ? [V] : [],
                onSelect: me,
                onRightClick: xe,
                onDrop: K,
                className: t.fileTree,
                treeData: ee
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            p && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(H, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: p }),
                /* @__PURE__ */ e.jsx(C, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ce, {}), disabled: !U, onClick: ne, children: n("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(C, { danger: !0, icon: /* @__PURE__ */ e.jsx(he, {}), onClick: we, children: n("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              ss(p) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  He,
                  {
                    value: c,
                    onChange: (a) => {
                      h(a.target.value), z(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(Xe, { content: yt(c) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                He,
                {
                  value: c,
                  onChange: (a) => {
                    h(a.target.value), z(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              )
            ] }),
            !p && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: n("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        B && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: fe,
              onContextMenu: (a) => a.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: B.x, top: B.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            it,
            {
              selectable: !1,
              items: [
                ...B.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(Je, {}), label: n("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Se, {}), label: n("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(he, {}), label: n("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(ht, {}), label: n("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(xt, {}), label: n("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: a }) => ge(a)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(W, { title: n("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: M, onOk: re, onCancel: () => {
          T(!1), N("");
        }, okText: n("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(y, { placeholder: n("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: G, onChange: (a) => N(a.target.value) }) }),
        /* @__PURE__ */ e.jsx(W, { title: n("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: O, onOk: () => J.validateFields().then(ye), onCancel: () => w(!1), okText: n("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(i, { form: J, layout: "vertical", children: /* @__PURE__ */ e.jsx(i.Item, { name: "name", label: n("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(y, { placeholder: n("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: n("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!R,
            onOk: x,
            onCancel: () => _(null),
            okText: n("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(i, { form: le, layout: "vertical", onValuesChange: (a, r) => P(r.name ?? ""), children: /* @__PURE__ */ e.jsx(i.Item, { name: "name", label: R != null && R.isDir ? n("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : n("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              y,
              {
                placeholder: R != null && R.isDir ? n("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : n("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => x()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ls
}, Symbol.toStringTag, { value: "Module" })), as = () => {
  var h;
  const { id: t } = Pe(), l = _e(), { t: s } = $("system"), { data: n, loading: p } = v(
    () => t ? F.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: g, loading: V } = v(
    () => t ? F.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t, onError: () => d.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })) }
  ), j = (n == null ? void 0 : n.data) ?? n, S = ((h = g == null ? void 0 : g.data) == null ? void 0 : h.content) ?? (g == null ? void 0 : g.content) ?? "", o = Vt(S);
  if (!t) return null;
  const c = p || V;
  return /* @__PURE__ */ e.jsx(
    Y,
    {
      title: (j == null ? void 0 : j.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(C, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      children: /* @__PURE__ */ e.jsx(pe, { spinning: c, children: /* @__PURE__ */ e.jsx("div", { style: { minHeight: 200 }, children: !c && /* @__PURE__ */ e.jsx(Xe, { content: o }) }) })
    }
  );
}, Ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: as
}, Symbol.toStringTag, { value: "Module" })), is = () => {
  const { t } = $("system"), [l] = St(), s = l.get("provider"), n = l.get("code"), p = l.get("state"), [g, V] = k(null), [j, S] = k(null), [o, c] = k(null);
  return v(async () => {
    if (!n || !p || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const h = await F.system.testOauthCallback({ code: n, state: p, provider: s });
    if (!h.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!h.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    V(h.user), S(h.user_info);
  }, {
    onSuccess: () => {
      c({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (h) => {
      c({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: h.message
      });
    }
  }), o ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    nt,
    {
      status: o.status,
      title: o.message,
      subTitle: o.error,
      extra: /* @__PURE__ */ e.jsxs(H, { style: { display: !j || !g ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(Y, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Le, { src: j || {} }) }),
        /* @__PURE__ */ e.jsx(Y, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Le, { src: g || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(bt, {});
}, vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: is
}, Symbol.toStringTag, { value: "Module" }));
export {
  bs as O,
  ks as S,
  Ss as a,
  vs as b,
  js as i
};
