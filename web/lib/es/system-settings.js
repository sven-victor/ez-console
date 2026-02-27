import { j as e } from "./vendor.js";
import { Form as a, message as o, Spin as me, Switch as le, Select as L, Input as h, Alert as Oe, Divider as ze, Space as K, Button as w, InputNumber as re, Modal as W, Skeleton as Qe, Descriptions as ne, Steps as Xe, Tag as se, Table as je, Radio as Ce, Tabs as Be, Tooltip as Ye, Card as ee, Row as Ae, Col as Ve, Upload as et, Tree as tt, Menu as st, Result as lt } from "antd";
import { useTranslation as $ } from "react-i18next";
import { useState as k, useEffect as ve, useMemo as Ee, useCallback as Re } from "react";
import { useRequest as F } from "ahooks";
import { SaveOutlined as Fe, ReloadOutlined as oe, LoadingOutlined as at, CheckCircleTwoTone as it, StarFilled as nt, CheckCircleOutlined as He, StarOutlined as ot, EditOutlined as be, DeleteOutlined as he, PlusOutlined as ke, ThunderboltOutlined as rt, ToolOutlined as Le, SettingOutlined as dt, LockOutlined as ut, FileTextOutlined as ct, EyeOutlined as Ke, UploadOutlined as Ue, ArrowLeftOutlined as mt, FolderOutlined as We, FileOutlined as Ge, FileAddOutlined as ft, FolderAddOutlined as pt } from "@ant-design/icons";
import { a as _ } from "./index.js";
import { g as qe, a as gt, s as ht } from "./base.js";
import { f as Y, e as xt, b as we, J as yt, j as Vt, M as Ze, L as jt } from "./components.js";
import Ie from "react-quill";
import { useNavigate as Se, useLocation as bt, useParams as Me, useSearchParams as kt } from "react-router-dom";
import { l as St, c as vt, u as Ft, d as _t, g as Ct, b as wt, e as It, f as Tt, r as At } from "./system.js";
import { c as zt, b as Et } from "./contexts.js";
import { l as Mt, b as Pt } from "./authorization.js";
import { createStyles as Ot } from "antd-style";
import Ne from "react-json-view";
const ye = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Rt = {
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
}, Lt = ({ initialData: t, onRefresh: l }) => {
  const { t: s } = $("system"), { t: i } = $("common"), [u] = a.useForm(), [c, x] = k((t == null ? void 0 : t.provider) || "custom"), [y, S] = k((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [n, d] = k((t == null ? void 0 : t.enabled) || !1), [f, O] = k((t == null ? void 0 : t.auto_create_user) || !1), { loading: z, data: E, refresh: V } = F(_.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (j) => {
      u.setFieldsValue(j), x(j.provider), S(j.provider === "custom" || j.provider === "autoDiscover"), d(j.enabled), O(j.auto_create_user);
    },
    onError: (j) => {
      o.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", j);
    }
  });
  ve(() => {
    t && (u.setFieldsValue(t), x(t.provider), S(t.provider === "custom" || t.provider === "autoDiscover"), d(t.enabled), O(t.auto_create_user));
  }, [t, u]);
  const T = (j) => {
    x(j), S(j === "custom" || j === "autoDiscover");
    const p = Rt[j];
    p && u.setFieldsValue({
      auth_endpoint: p.endpoints.auth_endpoint,
      token_endpoint: p.endpoints.token_endpoint,
      userinfo_endpoint: p.endpoints.userinfo_endpoint,
      scope: p.scope,
      // Set field mappings
      email_field: p.email_field,
      username_field: p.username_field,
      full_name_field: p.full_name_field,
      avatar_field: p.avatar_field,
      role_field: p.role_field,
      // Set display configuration
      icon_url: p.icon_url,
      display_name: p.display_name
    });
  }, R = (j) => {
    d(j);
  }, M = (j) => {
    O(j);
  }, { loading: I, run: G } = F(_.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      o.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : V();
    },
    onError: (j) => {
      o.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", j);
    }
  }), B = (j) => {
    G(j);
  }, q = () => {
    l ? l() : V();
  }, { loading: D, run: J } = F(async ({ redirect_uri: j, ...p }) => {
    let N;
    return j ? N = new URL(j) : N = new URL(window.location.origin), N.pathname = qe("/system/settings/oauth/test-callback"), N.searchParams.set("provider", c), _.system.testOauthConnection({ redirect_uri: N.toString(), ...p });
  }, {
    manual: !0,
    onSuccess: ({ url: j }) => {
      window.open(j, "_blank");
    },
    onError: (j) => {
      o.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: j.message })), console.error("Failed to test OAuth connection", j);
    }
  }), A = () => c === "custom";
  return /* @__PURE__ */ e.jsx(me, { spinning: z, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: u,
      layout: "vertical",
      onFinish: B,
      initialValues: t || E,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(le, { onChange: R })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "provider",
            label: s("settings.oauth.provider.label", { defaultValue: "OAuth Provider" }),
            tooltip: s("settings.oauth.provider.tooltip", { defaultValue: "Select an OAuth provider or configure a custom one." }),
            rules: [
              {
                required: n,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(L, { onChange: T, disabled: !n, children: [
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
          a.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              h,
              {
                disabled: !n,
                placeholder: c !== "custom" ? s(`settings.oauth.provider.options.${c}`, { defaultValue: c }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "icon_url",
            label: s("settings.oauth.iconUrl.label", { defaultValue: "Icon URL" }),
            tooltip: s("settings.oauth.iconUrl.tooltip", { defaultValue: "URL of the icon for this provider. Displayed on the login button." }),
            rules: [
              {
                pattern: ye,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n, placeholder: "https://example.com/icon.png" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "client_id",
            label: s("settings.oauth.clientId.label", { defaultValue: "Client ID" }),
            tooltip: s("settings.oauth.clientId.tooltip", { defaultValue: "The Client ID provided by the OAuth provider." }),
            rules: [
              {
                required: n,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "client_secret",
            label: s("settings.oauth.clientSecret.label", { defaultValue: "Client Secret" }),
            tooltip: s("settings.oauth.clientSecret.tooltip", { defaultValue: "The Client Secret provided by the OAuth provider. This will be stored encrypted." }),
            rules: [
              {
                required: n,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h.Password, { disabled: !n, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        A() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && c === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: ye,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "wellknown_endpoint",
            hidden: c !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: ye,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: n && c === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        A() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && c === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: ye,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        A() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && c === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: ye,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "scope",
            label: s("settings.oauth.scope.label", { defaultValue: "Authorization Scope" }),
            tooltip: s("settings.oauth.scope.tooltip", { defaultValue: "The scopes to request from the OAuth provider, separated by spaces." }),
            rules: [
              {
                required: n,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(j) => j.getFieldValue("redirect_uri") !== "" ? {
              pattern: ye,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n, placeholder: `http://${window.location.host}${qe(`/login?provider=settings.${c}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(le, { onChange: M, disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "default_role",
            label: s("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: s("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: n && f,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n || !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "auto",
            children: /* @__PURE__ */ e.jsxs(L, { disabled: !n, children: [
              /* @__PURE__ */ e.jsx(L.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "auto", children: s("settings.oauth.roleMappingMode.options.auto.label", { defaultValue: "Auto" }) }),
              /* @__PURE__ */ e.jsx(L.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Oe,
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
          a.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(le, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(ze, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Oe,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: y ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "email", disabled: !n || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "login", autoComplete: "off", disabled: !n || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "name", disabled: !n || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "avatar_url", disabled: !n || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "role", disabled: !n || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              htmlType: "submit",
              loading: I,
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              loading: D,
              onClick: async () => {
                const j = u.getFieldsValue();
                J(j);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              onClick: q,
              icon: /* @__PURE__ */ e.jsx(oe, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Ut = () => {
  const { t } = $("system"), { t: l } = $("common"), [s] = a.useForm(), { loading: i, data: u, refresh: c } = F(_.system.getSecuritySettings, {
    onSuccess: (n) => {
      s.setFieldsValue(n);
    },
    onError: (n) => {
      o.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", n);
    }
  }), { loading: x, run: y } = F(_.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      o.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), c();
    },
    onError: (n) => {
      o.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", n);
    }
  }), S = (n) => {
    y(n);
  };
  return /* @__PURE__ */ e.jsx(me, { spinning: i, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: s,
      layout: "vertical",
      onFinish: S,
      initialValues: u,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
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
          a.Item,
          {
            name: "password_min_length",
            label: t("settings.security.passwordMinLength.label", { defaultValue: "Minimum Password Length" }),
            tooltip: t("settings.security.passwordMinLength.tooltip", { defaultValue: "The minimum number of characters required for a password." }),
            rules: [{ type: "number", min: 6, max: 32 }],
            children: /* @__PURE__ */ e.jsx(re, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(re, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, d) => n.login_failure_lock !== d.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(re, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, d) => n.login_failure_lock !== d.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(re, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, d) => n.history_password_check !== d.history_password_check,
            children: ({ getFieldValue: n }) => n("history_password_check") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(re, { min: 1, max: 10, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(re, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(re, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(re, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              htmlType: "submit",
              loading: x,
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              onClick: () => c(),
              icon: /* @__PURE__ */ e.jsx(oe, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, qt = ({ fetchItems: t, importItems: l, columns: s, ...i }) => {
  const { t: u } = $("system"), [c, x] = k([]), [y, S] = k([]), { run: n, loading: d } = F(t, {
    onError: (z) => {
      o.error(u("settings.ldap.importError", { error: `${z.message}` }));
    },
    onSuccess: (z) => {
      x(z);
    },
    manual: !0
  }), { run: f, loading: O } = F(async () => {
    for (const z of y.filter((E) => {
      const V = c.find((T) => T.ldap_dn === E);
      return !(!V || V.status === "imported");
    })) {
      const E = await l([z]);
      x((V) => [...V].map((R) => {
        for (const M of E)
          if (R.ldap_dn === M.ldap_dn)
            return { ...M, status: "imported" };
        return R;
      }));
    }
  }, {
    manual: !0
  });
  return ve(() => {
    i.visible && (x([]), n(), S([]));
  }, [i.visible]), /* @__PURE__ */ e.jsx(
    W,
    {
      title: u("settings.ldap.importTitle"),
      ...i,
      onOk: () => {
        f();
      },
      width: 900,
      confirmLoading: O,
      loading: d,
      children: /* @__PURE__ */ e.jsx(
        je,
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
          columns: s.map(({ render: z, ...E }) => z ? {
            ...E,
            render: (V, T, R) => {
              const M = y.includes(T.ldap_dn) && O && T.status !== "imported";
              return z(V, T, R, M);
            }
          } : E),
          dataSource: c,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Nt = () => {
  var T, R, M;
  const { t } = $("system"), [l] = a.useForm(), [s, i] = k(!1), [u, c] = k(null), [x, y] = k(!1), [S, n] = k(!1), [d] = a.useForm(), [f, O] = k(!1);
  F(_.system.getLdapSettings, {
    onSuccess: (I) => {
      l.setFieldsValue(I), O(I.enabled);
    },
    onError: (I) => {
      o.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${I.message}` }));
    }
  }), ve(() => {
    c(null);
  }, [x]);
  const z = async (I) => {
    i(!0);
    try {
      await _.system.updateLdapSettings(I), o.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      o.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      i(!1);
    }
  }, { run: E, loading: V } = F(async (I) => {
    const G = await l.validateFields();
    return await _.system.testLdapConnection({
      ...I,
      ...G
    });
  }, {
    onSuccess: (I) => {
      c(I);
    },
    onError: (I) => {
      o.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${I.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      a,
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
            a.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(le, { onChange: (I) => O(I) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: f, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !f, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: f, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !f, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: f, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(h.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: f, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !f, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(h, { disabled: !f, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: f, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: f, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: f, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: f, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(h, { type: "number", defaultValue: 15, disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(ze, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(le, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(le, { disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(h.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(h.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(h.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !f })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(Y, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(Y, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              w,
              {
                disabled: !f,
                style: { marginLeft: 8 },
                onClick: () => y(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(Y, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              w,
              {
                disabled: !f,
                style: { marginLeft: 8 },
                onClick: () => {
                  n(!0);
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
        open: x,
        onCancel: () => y(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            a,
            {
              form: d,
              layout: "vertical",
              onFinish: E,
              children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(h, { disabled: !f })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(h.Password, { disabled: !f })
                  }
                ),
                /* @__PURE__ */ e.jsxs(a.Item, { children: [
                  /* @__PURE__ */ e.jsx(Y, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(w, { disabled: !f, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    w,
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
          /* @__PURE__ */ e.jsx(me, { spinning: V, children: /* @__PURE__ */ e.jsx(Qe, { active: V, loading: V, children: u && (u.user ? /* @__PURE__ */ e.jsxs(ne, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(ne.Item, { label: "Username", span: 3, children: u.user.username }),
            /* @__PURE__ */ e.jsx(ne.Item, { label: "Email", span: 3, children: u.user.email }),
            /* @__PURE__ */ e.jsx(ne.Item, { label: "FullName", span: 3, children: u.user.full_name }),
            /* @__PURE__ */ e.jsx(ne.Item, { label: "CreatedAt", span: 3, children: u.user.created_at }),
            /* @__PURE__ */ e.jsx(ne.Item, { label: "UpdatedAt", span: 3, children: u.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Xe,
            {
              direction: "vertical",
              current: (T = u.message) == null ? void 0 : T.findIndex((I) => !I.success),
              status: (R = u.message) != null && R.find((I) => !I.success) ? "error" : "finish",
              items: (M = u.message) == null ? void 0 : M.map((I) => ({
                status: I.success ? "finish" : "error",
                title: I.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      qt,
      {
        visible: S,
        onCancel: () => n(!1),
        fetchItems: () => _.system.importLdapUsers({}),
        importItems: (I) => _.system.importLdapUsers({ user_dn: I }),
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
          render: (I, G, B, q) => q ? /* @__PURE__ */ e.jsx(me, { indicator: /* @__PURE__ */ e.jsx(at, { spin: !0 }) }) : I ? /* @__PURE__ */ e.jsx(it, { twoToneColor: "#52c41a" }) : G.id ? /* @__PURE__ */ e.jsx(se, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(se, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, Dt = () => {
  const { t } = $("system"), { t: l } = $("common"), [s] = a.useForm(), [i, u] = k(null), [c, x] = k(!1), [y] = a.useForm(), [S, n] = k(!1), { loading: d } = F(_.system.getSmtpSettings, {
    onSuccess: (V) => {
      s.setFieldsValue(V), n(V.enabled);
    },
    onError: (V) => {
      o.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${V.message}` }));
    }
  });
  ve(() => {
    u(null);
  }, [c]);
  const { run: f, loading: O } = F(({ port: V, ...T }) => _.system.updateSmtpSettings({ ...T, port: Number(V) }), {
    manual: !0,
    onSuccess: () => {
      o.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (V) => {
      o.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${V.message}` }));
    }
  }), { run: z, loading: E } = F(async (V) => {
    const { port: T, ...R } = await s.validateFields();
    return await _.system.testSmtpConnection({
      ...V,
      ...R,
      port: Number(T)
    });
  }, {
    onSuccess: (V) => {
      u(V);
    },
    onError: (V) => {
      o.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${V.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(me, { spinning: d, children: /* @__PURE__ */ e.jsxs(
      a,
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
            a.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(le, { onChange: (V) => n(V) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: S, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !S, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: S, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { type: "number", disabled: !S, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: S, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !S, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(h.Password, { disabled: !S, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: S, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(Ce.Group, { disabled: !S, children: [
                /* @__PURE__ */ e.jsx(Ce.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(Ce.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(Ce.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: S, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !S, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(h, { disabled: !S, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(ze, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(Ie, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(Ie, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(Ie, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(Y, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: O, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              w,
              {
                onClick: () => x(!0),
                disabled: !S || E,
                loading: E,
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
        open: c,
        onCancel: () => x(!1),
        footer: [
          /* @__PURE__ */ e.jsx(w, { onClick: () => x(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(w, { type: "primary", loading: E, onClick: () => y.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: y,
            layout: "vertical",
            onFinish: (V) => z(V),
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
                  children: /* @__PURE__ */ e.jsx(h, { placeholder: "test@example.com" })
                }
              ),
              i && /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: i.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: i.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, $t = () => {
  const { t, i18n: l } = $("system"), { t: s } = $("common"), [i] = a.useForm(), { loading: u, data: c, refresh: x } = F(_.system.getSystemBaseSettings, {
    onSuccess: (d) => {
      i.setFieldsValue(d);
    },
    onError: (d) => {
      o.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", d);
    }
  }), { loading: y, run: S } = F(_.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      o.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), x();
    },
    onError: (d) => {
      o.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", d);
    }
  }), n = (d) => {
    S(d);
  };
  return /* @__PURE__ */ e.jsx(me, { spinning: u, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: i,
      layout: "vertical",
      onFinish: n,
      initialValues: c,
      children: [
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Be, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", children: /* @__PURE__ */ e.jsx(h, {}) }) })
        }, ...xt.map((d) => ({
          key: d.lang,
          label: l.language !== d.lang ? s(`language.${d.lang}`, { defaultValue: d.label, lang: d.label }) : d.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: ["name_i18n", d.lang], children: /* @__PURE__ */ e.jsx(h, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(h, {}) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(h, {}) }),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              htmlType: "submit",
              loading: y,
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              onClick: () => x(),
              icon: /* @__PURE__ */ e.jsx(oe, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: Bt } = h, Ht = () => {
  const { t } = $("ai"), { t: l } = $("common"), [s] = a.useForm(), [i, u] = k(!1), [c, x] = k(null), [y, S] = k(""), [n, d] = k(""), { loading: f, data: O } = F(
    () => _.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (m) => {
        o.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", m);
      }
    }
  ), z = Ee(() => O == null ? void 0 : O.find((m) => m.provider === n), [O, n]), { loading: E, data: V, refresh: T } = F(
    () => _.ai.listAiModels({ current: 1, page_size: 100, search: y }),
    {
      refreshDeps: [y],
      onError: (m) => {
        o.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", m);
      }
    }
  ), { loading: R, run: M } = F(
    ({ config: m, ...U }) => _.ai.createAiModel({ config: m ?? {}, ...U }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), u(!1), s.resetFields(), T();
      },
      onError: (m) => {
        o.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", m);
      }
    }
  ), { loading: I, run: G } = F(
    ({ id: m, data: U }) => _.ai.updateAiModel({ id: m }, U),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), u(!1), s.resetFields(), x(null), T();
      },
      onError: (m) => {
        o.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", m);
      }
    }
  ), { runAsync: B } = F(
    (m) => _.ai.deleteAiModel({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), T();
      },
      onError: (m) => {
        o.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", m);
      }
    }
  ), { runAsync: q } = F(
    (m) => _.ai.testAiModel({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (m) => {
        o.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", m);
      }
    }
  ), { runAsync: D } = F(
    (m) => _.ai.setDefaultAiModel({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), T();
      },
      onError: (m) => {
        o.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", m);
      }
    }
  ), J = () => {
    x(null), d(""), s.resetFields(), u(!0);
  }, A = (m) => {
    x(m), d(m.provider);
    const U = m.config || {}, X = {
      name: m.name,
      description: m.description,
      provider: m.provider,
      is_default: m.is_default,
      config: U,
      // Spread config fields to form
      status: m.status
    };
    s.setFieldsValue(X), u(!0);
  }, j = (m) => {
    d(m), s.setFieldValue("config", void 0);
  }, p = (m) => {
    let U = m.config ?? {};
    const X = {
      name: m.name,
      description: m.description,
      provider: m.provider,
      config: U,
      is_default: m.is_default,
      status: m.status
    };
    c ? G({ id: c.id, data: X }) : M(X);
  }, N = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (m, U) => /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx("span", { children: m }),
        U.is_default && /* @__PURE__ */ e.jsx(Ye, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(nt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (m) => /* @__PURE__ */ e.jsx(se, { color: "blue", children: m.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (m) => /* @__PURE__ */ e.jsx(se, { color: m === "enabled" ? "green" : "red", children: m === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (m, U) => /* @__PURE__ */ e.jsx(we, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(He, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => q(U.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(ot, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => D(U.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(be, {}),
          tooltip: l("edit", { defaultValue: "Edit" }),
          onClick: async () => A(U)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(he, {}),
          tooltip: l("delete", { defaultValue: "Delete" }),
          onClick: async () => B(U.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ee, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ae, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsx(
        h.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: y,
          onChange: (m) => S(m.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(oe, {}),
            onClick: T,
            loading: E,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(Y, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ke, {}),
            onClick: J,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsx(
      je,
      {
        columns: N,
        dataSource: (V == null ? void 0 : V.data) || [],
        loading: E,
        rowKey: "id",
        pagination: {
          total: (V == null ? void 0 : V.total) || 0,
          current: (V == null ? void 0 : V.current) || 1,
          pageSize: (V == null ? void 0 : V.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (m, U) => l("pagination.total", {
            defaultValue: `${U[0]}-${U[1]} of ${m} items`,
            start: U[0],
            end: U[1],
            total: m
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: c ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: i,
        onCancel: () => {
          u(!1), s.resetFields(), x(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: s,
            layout: "vertical",
            onFinish: p,
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(h, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Bt,
                    {
                      rows: 3,
                      placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "provider",
                  label: t("models.provider", { defaultValue: "Provider" }),
                  rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    L,
                    {
                      loading: f,
                      placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                      onChange: j,
                      value: n,
                      options: O == null ? void 0 : O.map((m) => ({
                        label: m.name,
                        value: m.provider
                      }))
                    }
                  )
                }
              ),
              z && /* @__PURE__ */ e.jsx(a.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(
                yt,
                {
                  schema: z.config_schema
                }
              ) }),
              /* @__PURE__ */ e.jsxs(
                a.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(le, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: R || I,
                    children: c ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    onClick: () => {
                      u(!1), s.resetFields(), x(null), d("");
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
}, { TextArea: Kt } = h, Wt = () => {
  var H;
  const { t } = $("system"), { t: l } = $("common"), [s] = a.useForm(), [i, u] = k(!1), [c, x] = k(null), [y, S] = k(""), [n, d] = k(!1), [f, O] = k(null), [z, E] = k(""), [V, T] = k(!1), [R, M] = k([]), [I, G] = k(), { loading: B, data: q, refresh: D } = F(
    () => _.system.listToolSets({ current: 1, page_size: 100, search: y, type: I }),
    {
      refreshDeps: [y, I],
      onError: (r) => {
        o.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", r);
      }
    }
  ), { loading: J, data: A } = F(
    () => _.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (r) => {
        o.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", r);
      }
    }
  ), j = Ee(() => A == null ? void 0 : A.find((r) => r.tool_set_type === z), [A, z]), { loading: p, run: N } = F(
    (r) => _.system.createToolSet({
      ...r,
      type: r.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), u(!1), s.resetFields(), D();
      },
      onError: (r) => {
        o.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", r);
      }
    }
  ), { loading: m, run: U } = F(
    ({ id: r, data: P }) => _.system.updateToolSet({ id: r }, {
      ...P,
      type: P.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), u(!1), s.resetFields(), x(null), D();
      },
      onError: (r) => {
        o.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", r);
      }
    }
  ), { run: X } = F(
    (r) => _.system.deleteToolSet({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), D();
      },
      onError: (r) => {
        o.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", r);
      }
    }
  ), { runAsync: fe } = F(
    (r) => _.system.testToolSet({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (r) => {
        o.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", r);
      }
    }
  ), { loading: te, runAsync: v } = F(
    (r) => _.system.getToolSetTools({ id: r }),
    {
      manual: !0,
      onSuccess: (r) => {
        M(r || []), T(!0);
      },
      onError: (r) => {
        o.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", r);
      }
    }
  ), { runAsync: Q } = F(
    ({ id: r, status: P }) => _.system.updateToolSetStatus({ id: r }, { status: P }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), D();
      },
      onError: (r) => {
        o.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", r);
      }
    }
  ), pe = () => {
    x(null), s.resetFields(), E(""), u(!0);
  }, ie = (r) => {
    x(r), E(r.type);
    const P = { ...r };
    s.setFieldsValue(P), u(!0);
  }, de = (r) => {
    E(r), s.setFieldValue("config", {});
  }, ue = (r) => {
    c ? U({ id: c.id, data: r }) : N(r);
  }, ge = (r) => {
    X(r);
  }, ce = (r) => {
    O(r), d(!0);
  }, xe = (r) => {
    const P = r.status === "enabled" ? "disabled" : "enabled";
    return Q({ id: r.id, status: P });
  }, g = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (r) => /* @__PURE__ */ e.jsx(se, { color: "blue", children: r.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (r) => /* @__PURE__ */ e.jsx(se, { color: r === "enabled" ? "green" : "red", children: r === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (r, P) => /* @__PURE__ */ e.jsx(we, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(rt, {}),
          disabled: P.status !== "enabled",
          onClick: async () => fe(P.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Le, {}),
          permission: "system:toolsets:view",
          disabled: P.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => v(P.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(dt, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => ce(P.config),
          disabled: !P.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(be, {}),
          onClick: async () => ie(P)
        },
        {
          key: "toggleStatus",
          icon: P.status === "enabled" ? /* @__PURE__ */ e.jsx(ut, {}) : /* @__PURE__ */ e.jsx(He, {}),
          onClick: async () => xe(P),
          permission: "system:toolsets:update",
          tooltip: P.status === "enabled" ? l("disable", { defaultValue: "Disable" }) : l("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(he, {}),
          permission: "system:toolsets:delete",
          tooltip: l("delete", { defaultValue: "Delete" }),
          onClick: async () => ge(P.id),
          danger: !0,
          confirm: {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => ge(P.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ee, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ae, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          h.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            value: y,
            onChange: (r) => S(r.target.value),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          L,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: I,
            onChange: (r) => G(r),
            options: A == null ? void 0 : A.map((r) => ({
              label: r.name,
              value: r.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(L.Option, { value: "", children: "All" }),
              A == null ? void 0 : A.map((r) => /* @__PURE__ */ e.jsx(L.Option, { value: r.tool_set_type, children: r.name }, r.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(oe, {}),
            onClick: D,
            loading: B,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(Y, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ke, {}),
            onClick: pe,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ee, { children: /* @__PURE__ */ e.jsx(
      je,
      {
        columns: g,
        dataSource: (q == null ? void 0 : q.data) || [],
        loading: B,
        rowKey: "id",
        pagination: {
          total: (q == null ? void 0 : q.total) || 0,
          current: (q == null ? void 0 : q.current) || 1,
          pageSize: (q == null ? void 0 : q.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (r, P) => l("pagination.total", {
            defaultValue: `${P[0]}-${P[1]} of ${r} items`,
            start: P[0],
            end: P[1],
            total: r
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: c ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        onCancel: () => {
          u(!1), s.resetFields(), x(null), E("");
        },
        footer: null,
        width: ((H = j == null ? void 0 : j.ui_schema) == null ? void 0 : H["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: s,
            layout: "vertical",
            onFinish: ue,
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(h, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: t("settings.toolsets.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Kt,
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
                    L,
                    {
                      loading: J,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: de,
                      value: z,
                      options: A == null ? void 0 : A.map((r) => ({
                        label: r.name,
                        value: r.tool_set_type
                      }))
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                Vt,
                {
                  name: "config",
                  schema: j == null ? void 0 : j.config_schema,
                  uiSchema: j == null ? void 0 : j.ui_schema
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: p || m,
                    children: c ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    onClick: () => {
                      u(!1), s.resetFields(), x(null), E("");
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
        open: n,
        onCancel: () => d(!1),
        footer: [
          /* @__PURE__ */ e.jsx(w, { onClick: () => d(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(f, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: V,
        onCancel: () => T(!1),
        footer: [
          /* @__PURE__ */ e.jsx(w, { onClick: () => T(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: te ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(oe, { style: { fontSize: 24 }, spin: !0 }) }) : R.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : R.map((r, P) => {
          var _e, b, C;
          return /* @__PURE__ */ e.jsx(
            ee,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(Le, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((_e = r.function) == null ? void 0 : _e.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(Ae, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(Ve, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((b = r.function) == null ? void 0 : b.description) || "-" })
                ] }),
                ((C = r.function) == null ? void 0 : C.parameters) && /* @__PURE__ */ e.jsxs(Ve, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(r.function.parameters, null, 2) })
                ] })
              ] })
            },
            P
          );
        }) })
      }
    )
  ] });
}, { TextArea: De } = h, Gt = () => {
  const { t } = $("system"), { t: l } = $("common"), s = Se(), [i] = a.useForm(), [u, c] = k(""), [x, y] = k(), [S, n] = k(!1), [d, f] = k(null), [O, z] = k(!1), [E] = a.useForm(), { loading: V, data: T, refresh: R } = F(
    () => _.system.listSkills({
      current: 1,
      page_size: 100,
      search: u || void 0,
      domain: x
    }),
    {
      refreshDeps: [u, x],
      onError: () => {
        o.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: M } = F(() => _.system.listSkillDomains()), I = M ?? [], G = (T == null ? void 0 : T.data) ?? [], B = (T == null ? void 0 : T.total) ?? 0, { loading: q, run: D } = F(
    (v) => _.system.createSkill(v),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" })), n(!1), i.resetFields(), R();
      },
      onError: () => {
        o.error(t("settings.skills.createFailed", { defaultValue: "Failed to create skill" }));
      }
    }
  ), { loading: J, run: A } = F(
    ({ id: v, body: Q }) => _.system.updateSkill({ id: v }, Q),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" })), n(!1), f(null), i.resetFields(), R();
      },
      onError: () => {
        o.error(t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }));
      }
    }
  ), { run: j } = F(
    (v) => _.system.deleteSkill({ id: v }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), R();
      },
      onError: () => {
        o.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), { loading: p, run: N } = F(
    (v) => _.system.uploadSkill(v.body, v.file),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), z(!1), E.resetFields(), R();
      },
      onError: () => {
        o.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), m = () => {
    f(null), i.resetFields(), n(!0);
  }, U = (v) => {
    f(v), i.setFieldsValue({
      name: v.name,
      description: v.description,
      category: v.category,
      domain: v.domain
    }), n(!0);
  }, X = () => {
    i.validateFields().then((v) => {
      d ? A({
        id: d.id,
        body: {
          name: v.name,
          description: v.description ?? "",
          category: v.category ?? "",
          domain: v.domain ?? ""
        }
      }) : D({
        name: v.name,
        description: v.description ?? "",
        category: v.category ?? "",
        domain: v.domain ?? "",
        content: v.content ?? ""
      });
    });
  }, fe = () => {
    var de, ue;
    const v = (de = E.getFieldValue("file")) == null ? void 0 : de.fileList, Q = ((ue = v == null ? void 0 : v[0]) == null ? void 0 : ue.originFileObj) ?? (v == null ? void 0 : v[0]);
    if (!Q) {
      o.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const pe = E.getFieldValue("category"), ie = E.getFieldValue("domain");
    N({ body: { category: pe, domain: ie }, file: Q });
  }, te = [
    { title: t("settings.skills.name", { defaultValue: "Name" }), dataIndex: "name", key: "name" },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (v) => v ? /* @__PURE__ */ e.jsx(se, { children: v }) : "-" },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (v) => v ? /* @__PURE__ */ e.jsx(se, { color: "blue", children: v }) : "-" },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (v, Q) => /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(Y, { permission: "system:skills:edit_files", children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", icon: /* @__PURE__ */ e.jsx(ct, {}), onClick: () => s(`/system/settings/skills/${Q.id}/edit`), children: t("settings.skills.editFiles", { defaultValue: "Edit files" }) }) }),
        /* @__PURE__ */ e.jsx(Y, { permission: "system:skills:view", children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", icon: /* @__PURE__ */ e.jsx(Ke, {}), onClick: () => s(`/system/settings/skills/${Q.id}/preview`), children: l("preview", { defaultValue: "Preview" }) }) }),
        /* @__PURE__ */ e.jsx(Y, { permission: "system:skills:update", children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => U(Q), children: l("edit", { defaultValue: "Edit" }) }) }),
        /* @__PURE__ */ e.jsx(Y, { permission: "system:skills:delete", children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", danger: !0, icon: /* @__PURE__ */ e.jsx(he, {}), onClick: () => W.confirm({ title: l("confirmDelete", { defaultValue: "Confirm delete?" }), onOk: () => j(Q.id) }), children: l("delete", { defaultValue: "Delete" }) }) })
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    ee,
    {
      title: t("settings.skills.title", { defaultValue: "AI Agent Skills" }),
      extra: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          h.Search,
          {
            placeholder: l("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: c,
            style: { width: 200 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          L,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: x,
            onChange: y,
            options: I.map((v) => ({ value: v, label: v }))
          }
        ),
        /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(oe, {}), onClick: () => R(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(Y, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: m, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(Y, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(Ue, {}), onClick: () => z(!0), children: t("settings.skills.upload", { defaultValue: "Upload" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsx(
          je,
          {
            rowKey: "id",
            loading: V,
            columns: te,
            dataSource: G,
            pagination: { total: B, pageSize: 10, showSizeChanger: !0 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: d ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
            open: S,
            onOk: X,
            onCancel: () => {
              n(!1), f(null);
            },
            confirmLoading: q || J,
            width: 560,
            children: /* @__PURE__ */ e.jsxs(a, { form: i, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(De, { rows: 2 }) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(L, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: I.map((v) => ({ value: v, label: v })) }) }),
              !d && /* @__PURE__ */ e.jsx(a.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(De, { rows: 6, placeholder: `---
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
            open: O,
            onOk: fe,
            onCancel: () => z(!1),
            confirmLoading: p,
            children: /* @__PURE__ */ e.jsxs(a, { form: E, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(a.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(et, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(Ue, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(L, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: I.map((v) => ({ value: v, label: v })) }) })
            ] })
          }
        )
      ]
    }
  );
}, Zt = () => {
  const { t } = $("system"), { t: l } = $("common"), [s] = a.useForm(), { data: i } = F(_.system.listLogStorageBackends), u = (i ?? []).map((d) => ({
    value: d.id,
    label: t(`settings.task.logStorage.${d.id}`, { defaultValue: d.name })
  })), { loading: c, refresh: x } = F(_.system.getTaskSettings, {
    onSuccess: (d) => {
      d && s.setFieldsValue({
        max_concurrent: d.max_concurrent,
        log_storage_backend: d.log_storage_backend ?? "database"
      });
    },
    onError: () => {
      o.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: y, run: S } = F(_.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      o.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), x();
    },
    onError: () => {
      o.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), n = (d) => {
    S(d);
  };
  return /* @__PURE__ */ e.jsx(me, { spinning: c, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: s,
      layout: "vertical",
      onFinish: n,
      initialValues: { max_concurrent: 10, log_storage_backend: "database" },
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "log_storage_backend",
            label: t("settings.task.logStorageBackend", { defaultValue: "Log storage" }),
            tooltip: t("settings.task.logStorageBackendTooltip", {
              defaultValue: "Where task execution logs are stored. Database stores logs in the application database."
            }),
            children: /* @__PURE__ */ e.jsx(
              L,
              {
                options: u,
                placeholder: t("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: i === void 0
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "max_concurrent",
            label: t("settings.task.maxConcurrent", { defaultValue: "Max concurrent tasks" }),
            tooltip: t("settings.task.maxConcurrentTooltip", {
              defaultValue: "Maximum number of tasks that can run at the same time."
            }),
            rules: [{ type: "number", min: 1, max: 100 }],
            children: /* @__PURE__ */ e.jsx(re, { min: 1, max: 100, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: y, icon: /* @__PURE__ */ e.jsx(Fe, {}), children: l("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(w, { onClick: () => x(), icon: /* @__PURE__ */ e.jsx(oe, {}), children: l("refresh", { defaultValue: "Refresh" }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: Jt } = h, Qt = () => {
  const t = Se(), { t: l } = $("system"), { t: s } = $("common"), [i] = a.useForm(), [u, c] = k(!1), [x, y] = k(null), [S, n] = k(""), [d, f] = k(1), [O, z] = k(10), { loading: E, data: V, refresh: T } = F(
    () => St({ current: d, page_size: O, search: S }),
    {
      refreshDeps: [d, O, S],
      onError: (p) => {
        o.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", p);
      }
    }
  ), { loading: R, run: M } = F(
    (p) => vt(p),
    {
      manual: !0,
      onSuccess: () => {
        o.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), c(!1), i.resetFields(), y(null), T();
      },
      onError: (p) => {
        o.error((p == null ? void 0 : p.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: I, run: G } = F(
    ({ id: p, ...N }) => Ft({ id: p }, N),
    {
      manual: !0,
      onSuccess: () => {
        o.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), c(!1), i.resetFields(), y(null), T();
      },
      onError: (p) => {
        o.error((p == null ? void 0 : p.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: B } = F(
    (p) => _t({ id: p }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), T();
      },
      onError: (p) => {
        o.error((p == null ? void 0 : p.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), q = () => {
    y(null), i.resetFields(), i.setFieldsValue({ status: "active" }), c(!0);
  }, D = (p) => {
    y(p), i.setFieldsValue({
      name: p.name,
      description: p.description,
      status: p.status
    }), c(!0);
  }, J = (p) => {
    W.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${p.name}"? This action cannot be undone.`
      }),
      onOk: () => B(p.id)
    });
  }, A = () => {
    i.validateFields().then((p) => {
      x ? G({ id: x.id, ...p }) : M(p);
    });
  }, j = [
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
      render: (p) => /* @__PURE__ */ e.jsx(se, { color: p === "active" ? "green" : "default", children: p === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (p, N) => /* @__PURE__ */ e.jsx(
        we,
        {
          actions: [
            {
              key: "view",
              label: s("view", { defaultValue: "View" }),
              icon: /* @__PURE__ */ e.jsx(Ke, {}),
              onClick: async () => t(`/system/settings/organizations/${N.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              label: s("edit", { defaultValue: "Edit" }),
              icon: /* @__PURE__ */ e.jsx(be, {}),
              onClick: async () => D(N),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              label: s("delete", { defaultValue: "Delete" }),
              icon: /* @__PURE__ */ e.jsx(he, {}),
              danger: !0,
              onClick: async () => J(N),
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
      title: l("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(oe, {}), onClick: T, children: s("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(Y, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: q, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            h.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (p) => {
                n(p), f(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            je,
            {
              columns: j,
              dataSource: (V == null ? void 0 : V.data) || [],
              loading: E,
              rowKey: "id",
              pagination: {
                current: d,
                pageSize: O,
                total: (V == null ? void 0 : V.total) || 0,
                showSizeChanger: !0,
                showTotal: (p, N) => s("pagination.total", {
                  defaultValue: `${N[0]}-${N[1]} of ${p} items`,
                  start: N[0],
                  end: N[1],
                  total: p
                }),
                onChange: (p, N) => {
                  f(p), z(N);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: x ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: u,
            onOk: A,
            onCancel: () => {
              c(!1), i.resetFields(), y(null);
            },
            confirmLoading: R || I,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(a, { form: i, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: l("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: l("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(h, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: l("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Jt, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
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
}, Xt = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = $("system"), s = Se(), i = bt(), x = i.hash.replace("#", "") || "base", { enableMultiOrg: y } = zt(), { hasPermission: S } = Et(), n = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx($t, {}),
      hidden: !S("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(Ut, {}),
      hidden: !S("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Lt, {}),
      hidden: !S("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Nt, {}),
      hidden: !S("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(Dt, {}),
      hidden: !S("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(Ht, {}),
      hidden: !S("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(Wt, {}),
      hidden: !S("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(Gt, {}),
      hidden: !S("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Zt, {}),
      hidden: !S("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...y ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Qt, {}),
      hidden: !S("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(ee, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Be,
    {
      defaultActiveKey: x,
      onChange: (d) => {
        s(`${i.pathname}#${d}`);
      },
      items: t(n.filter((d) => !d.hidden), l)
    }
  ) });
}, bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xt
}, Symbol.toStringTag, { value: "Module" })), Yt = () => {
  var ge, ce, xe;
  const t = Se(), { id: l } = Me(), { t: s } = $("system"), { t: i } = $("common"), [u] = a.useForm(), [c] = a.useForm(), [x, y] = k(!1), [S, n] = k(!1), [d, f] = k(null), [O, z] = k(""), [E, V] = k(1), [T, R] = k(10), { data: M, loading: I, refresh: G } = F(
    () => Ct({ id: l }),
    {
      ready: !!l,
      onError: (g) => {
        o.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", g);
      }
    }
  ), { data: B, loading: q, refresh: D } = F(
    () => wt({ id: l, current: E, page_size: T, search: O }),
    {
      ready: !!l,
      refreshDeps: [l, E, T, O],
      onError: (g) => {
        o.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", g);
      }
    }
  ), { data: J, loading: A } = F(
    () => Mt({ current: 1, page_size: 1e3 }),
    {
      ready: x
    }
  ), { data: j, loading: p } = F(
    () => Pt({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: N, run: m } = F(
    (g) => It({ id: l }, g),
    {
      manual: !0,
      onSuccess: () => {
        o.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), y(!1), u.resetFields(), D();
      },
      onError: (g) => {
        o.error((g == null ? void 0 : g.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: U, run: X } = F(
    (g) => Tt({ id: l, user_id: d == null ? void 0 : d.id }, g),
    {
      manual: !0,
      onSuccess: () => {
        o.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), n(!1), c.resetFields(), f(null), D();
      },
      onError: (g) => {
        o.error((g == null ? void 0 : g.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: fe } = F(
    (g) => At({ id: l, user_id: g }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), D();
      },
      onError: (g) => {
        o.error((g == null ? void 0 : g.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), te = () => {
    y(!0), u.resetFields();
  }, v = (g) => {
    var H;
    f(g), c.setFieldsValue({
      role_ids: ((H = g.organization_roles) == null ? void 0 : H.map((r) => r.id)) || []
    }), n(!0);
  }, Q = (g) => {
    W.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${g.full_name || g.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => fe(g.id)
    });
  }, pe = () => {
    u.validateFields().then((g) => {
      m(g);
    });
  }, ie = () => {
    c.validateFields().then((g) => {
      X(g);
    });
  }, de = ((ge = J == null ? void 0 : J.data) == null ? void 0 : ge.filter((g) => {
    var H;
    return !((H = B == null ? void 0 : B.data) != null && H.some((r) => r.id === g.id));
  })) || [], ue = [
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
      render: (g) => /* @__PURE__ */ e.jsx(se, { color: g === "active" ? "green" : "default", children: g === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : g })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (g, H) => {
        var r;
        return /* @__PURE__ */ e.jsx(K, { wrap: !0, children: ((r = H.organization_roles) == null ? void 0 : r.map((P) => /* @__PURE__ */ e.jsx(se, { children: P.name }, P.id))) || /* @__PURE__ */ e.jsx(se, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (g, H) => /* @__PURE__ */ e.jsx(
        we,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(be, {}),
              onClick: async () => v(H)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(he, {}),
              danger: !0,
              onClick: async () => Q(H)
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
            w,
            {
              icon: /* @__PURE__ */ e.jsx(mt, {}),
              onClick: () => t("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            M == null ? void 0 : M.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(oe, {}), onClick: () => {
          G(), D();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: I,
        children: /* @__PURE__ */ e.jsxs(ne, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(ne.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: M == null ? void 0 : M.name }),
          /* @__PURE__ */ e.jsx(ne.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(se, { color: (M == null ? void 0 : M.status) === "active" ? "green" : "default", children: (M == null ? void 0 : M.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(ne.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (M == null ? void 0 : M.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ee,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: te, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            h.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (g) => {
                z(g), V(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            je,
            {
              columns: ue,
              dataSource: (B == null ? void 0 : B.data) || [],
              loading: q,
              rowKey: "id",
              pagination: {
                current: E,
                pageSize: T,
                total: (B == null ? void 0 : B.total) || 0,
                showSizeChanger: !0,
                showTotal: (g) => i("pagination.total", { defaultValue: `Total ${g} items` }),
                onChange: (g, H) => {
                  V(g), R(H);
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
        open: x,
        onOk: pe,
        onCancel: () => {
          y(!1), u.resetFields();
        },
        confirmLoading: N,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: u, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "user_id",
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: s("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                L,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: A,
                  filterOption: (g, H) => ((H == null ? void 0 : H.label) ?? "").toLowerCase().includes(g.toLowerCase()),
                  options: de.map((g) => ({
                    label: `${g.full_name || g.username} (${g.email})`,
                    value: g.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "role_ids",
              label: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                L,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: p,
                  options: ((ce = j == null ? void 0 : j.data) == null ? void 0 : ce.map((g) => ({
                    label: g.name,
                    value: g.id
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
        onOk: ie,
        onCancel: () => {
          n(!1), c.resetFields(), f(null);
        },
        confirmLoading: U,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: c, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                h,
                {
                  value: (d == null ? void 0 : d.full_name) || (d == null ? void 0 : d.username),
                  disabled: !0
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "role_ids",
              label: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                L,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: p,
                  options: ((xe = j == null ? void 0 : j.data) == null ? void 0 : xe.map((g) => ({
                    label: g.name,
                    value: g.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yt
}, Symbol.toStringTag, { value: "Module" })), es = Ot(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: $e } = h, ts = (t) => t.toLowerCase().endsWith(".md");
function Je(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(We, {}) : /* @__PURE__ */ e.jsx(Ge, {}),
      children: (s = l.children) != null && s.length ? Je(l.children) : void 0
    };
  });
}
function Te(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const ss = () => {
  const { styles: t } = es(), { id: l } = Me(), s = Se(), { t: i } = $("system"), [u, c] = k(null), [x, y] = k(null), [S, n] = k(!1), [d, f] = k(""), [O, z] = k(!1), [E, V] = k([]), [T, R] = k(!1), [M, I] = k(!1), [G, B] = k(""), [q] = a.useForm(), [D, J] = k(null), [A, j] = k(null), [p, N] = k(""), [m] = a.useForm(), { data: U } = F(
    () => l ? _.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: X, loading: fe, refresh: te } = F(
    () => l ? _.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (b) => {
        if (!u) {
          for (const C of b)
            if (!C.is_dir && C.name === "SKILL.md") {
              y(C.path), c(C.path), n(!1);
              return;
            }
          for (const C of b)
            if (!C.is_dir && C.name === "SKILLS.md") {
              y(C.path), c(C.path), n(!1);
              return;
            }
        }
      }
    }
  ), v = (U == null ? void 0 : U.data) ?? U, Q = (X == null ? void 0 : X.data) ?? X ?? [], pe = Ee(() => Je(Q), [Q]), ie = S && x ? x : u ? Te(u) : "";
  ve(() => {
    u && l ? (_.system.getSkillFile({ id: l, path: u }).then((b) => f((b == null ? void 0 : b.data) ?? b ?? "")).catch(() => o.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), z(!1)) : (f(""), z(!1));
  }, [l, u, i]);
  const de = () => {
    !l || !u || _.system.putSkillFile({ id: l, path: u }, d).then(() => {
      o.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), z(!1);
    }).catch(() => o.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, ue = (b, C) => {
    const Z = String(C.node.key), ae = !C.node.isLeaf;
    y(Z), n(ae), C.node.isLeaf ? c(Z) : c(null);
  }, ge = (b) => {
    b.event.preventDefault(), J({
      path: String(b.node.key),
      isDir: !b.node.isLeaf,
      x: b.event.clientX,
      y: b.event.clientY
    });
  }, ce = Re(() => J(null), []), xe = Re(
    (b) => {
      if (!l || !D) return;
      const { path: C, isDir: Z } = D;
      switch (ce(), b) {
        case "open":
          c(C), y(C), n(!1);
          break;
        case "rename": {
          const ae = C.includes("/") ? C.split("/").pop() : C;
          j({ path: C, isDir: Z }), N(ae), setTimeout(() => m.setFieldsValue({ name: ae }), 0);
          break;
        }
        case "delete":
          W.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: Z ? i("settings.skills.editor.deleteConfirmContentDir", { path: C, defaultValue: `Delete ${C}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: C, defaultValue: `Delete ${C}?` }),
            onOk: () => _.system.deleteSkillPath({ id: l, path: C }).then(() => {
              o.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), u === C && (c(null), f("")), x === C && (y(null), n(!1)), te();
            }).catch(() => o.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          y(C), n(Z), R(!0);
          break;
        case "newDir":
          y(C), n(Z), I(!0);
          break;
      }
    },
    [l, D, ce, te, u, x, m, i]
  ), g = () => {
    if (!l || !A) return;
    const b = (m.getFieldValue("name") ?? p).trim();
    if (!b) {
      o.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!A.isDir && !/\.(md|txt)$/i.test(b)) {
      o.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const C = Te(A.path), Z = C ? `${C}/${b}` : b;
    if (Z === A.path) {
      j(null);
      return;
    }
    _.system.moveSkillPath({ id: l }, { from_path: A.path, to_path: Z }).then(() => {
      o.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), u === A.path && c(Z), x === A.path && y(Z), j(null), te();
    }).catch(() => o.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, H = (b) => {
    if (!l) return;
    const C = String(b.dragNode.key), Z = String(b.dragNode.title);
    let ae;
    if (b.dropToGap) {
      const Pe = Te(String(b.node.key));
      ae = Pe ? `${Pe}/${Z}` : Z;
    } else
      ae = `${b.node.key}/${Z}`;
    ae !== C && _.system.moveSkillPath({ id: l }, { from_path: C, to_path: ae }).then(() => {
      o.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), u === C && c(ae), x === C && y(ae), te();
    }).catch(() => o.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, r = () => {
    const b = G.trim();
    if (!b || !l) return;
    const C = ie ? `${ie}/${b}` : b;
    if (!/\.(md|txt)$/i.test(b)) {
      o.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    _.system.putSkillFile({ id: l, path: C }, "").then(() => {
      o.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), R(!1), B(""), te(), c(C), f("");
    }).catch(() => o.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, P = () => {
    var Z;
    const b = (Z = q.getFieldValue("name")) == null ? void 0 : Z.trim();
    if (!b || !l) return;
    const C = ie ? `${ie}/${b}` : b;
    _.system.createSkillDir({ id: l }, { path: C }).then(() => {
      o.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), I(!1), q.resetFields(), te();
    }).catch(() => o.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, _e = () => {
    const b = x || u;
    !l || !b || W.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: b, defaultValue: `Delete ${b}?` }),
      onOk: () => _.system.deleteSkillPath({ id: l, path: b }).then(() => {
        o.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), u === b && (c(null), f("")), x === b && (y(null), n(!1)), te();
      }).catch(() => o.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    ee,
    {
      title: (v == null ? void 0 : v.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(w, { type: "link", onClick: () => s("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 16, flex: 1, minHeight: 0 }, children: [
          /* @__PURE__ */ e.jsxs("div", { style: { width: 260, border: "1px solid #d9d9d9", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(w, { size: "small", icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: () => R(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(w, { size: "small", icon: /* @__PURE__ */ e.jsx(We, {}), onClick: () => I(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            fe ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              tt,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !0,
                expandedKeys: E,
                onExpand: (b) => V(b),
                selectedKeys: x ? [x] : [],
                onSelect: ue,
                onRightClick: ge,
                onDrop: H,
                className: t.fileTree,
                treeData: pe
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            u && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: u }),
                /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(Fe, {}), disabled: !O, onClick: de, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(w, { danger: !0, icon: /* @__PURE__ */ e.jsx(he, {}), onClick: _e, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              ts(u) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  $e,
                  {
                    value: d,
                    onChange: (b) => {
                      f(b.target.value), z(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(Ze, { content: gt(d) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                $e,
                {
                  value: d,
                  onChange: (b) => {
                    f(b.target.value), z(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              )
            ] }),
            !u && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        D && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: ce,
              onContextMenu: (b) => b.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: D.x, top: D.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            st,
            {
              selectable: !1,
              items: [
                ...D.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(Ge, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(be, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(he, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(ft, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(pt, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: b }) => xe(b)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(W, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: T, onOk: r, onCancel: () => {
          R(!1), B("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(h, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: G, onChange: (b) => B(b.target.value) }) }),
        /* @__PURE__ */ e.jsx(W, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: M, onOk: () => q.validateFields().then(P), onCancel: () => I(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(a, { form: q, layout: "vertical", children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(h, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!A,
            onOk: g,
            onCancel: () => j(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(a, { form: m, layout: "vertical", onValuesChange: (b, C) => N(C.name ?? ""), children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: A != null && A.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              h,
              {
                placeholder: A != null && A.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => g()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, Ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ss
}, Symbol.toStringTag, { value: "Module" })), ls = () => {
  var f;
  const { id: t } = Me(), l = Se(), { t: s } = $("system"), { data: i, loading: u } = F(
    () => t ? _.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: c, loading: x } = F(
    () => t ? _.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t, onError: () => o.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })) }
  ), y = (i == null ? void 0 : i.data) ?? i, S = ((f = c == null ? void 0 : c.data) == null ? void 0 : f.content) ?? (c == null ? void 0 : c.content) ?? "", n = ht(S);
  if (!t) return null;
  const d = u || x;
  return /* @__PURE__ */ e.jsx(
    ee,
    {
      title: (y == null ? void 0 : y.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(w, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      children: /* @__PURE__ */ e.jsx(me, { spinning: d, children: /* @__PURE__ */ e.jsx("div", { style: { minHeight: 200 }, children: !d && /* @__PURE__ */ e.jsx(Ze, { content: n }) }) })
    }
  );
}, vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ls
}, Symbol.toStringTag, { value: "Module" })), as = () => {
  const { t } = $("system"), [l] = kt(), s = l.get("provider"), i = l.get("code"), u = l.get("state"), [c, x] = k(null), [y, S] = k(null), [n, d] = k(null);
  return F(async () => {
    if (!i || !u || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const f = await _.system.testOauthCallback({ code: i, state: u, provider: s });
    if (!f.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!f.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    x(f.user), S(f.user_info);
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
  }), n ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    lt,
    {
      status: n.status,
      title: n.message,
      subTitle: n.error,
      extra: /* @__PURE__ */ e.jsxs(K, { style: { display: !y || !c ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(ee, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Ne, { src: y || {} }) }),
        /* @__PURE__ */ e.jsx(ee, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Ne, { src: c || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(jt, {});
}, Fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: as
}, Symbol.toStringTag, { value: "Module" }));
export {
  ks as O,
  Ss as S,
  vs as a,
  Fs as b,
  bs as i
};
