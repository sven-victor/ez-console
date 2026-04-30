import { j as e } from "./vendor.js";
import { Form as a, message as r, Spin as je, Switch as de, Select as B, Input as j, Alert as Ye, Divider as tt, Space as K, Button as T, InputNumber as he, Modal as ne, Skeleton as bt, Descriptions as ue, Steps as Vt, Tag as re, Table as ze, Radio as Be, Tabs as dt, Popconfirm as kt, Tooltip as st, Card as ae, Row as Ue, Col as ye, Checkbox as Ge, Empty as Re, AutoComplete as at, Upload as St, Tree as _t, Menu as vt, Collapse as wt, Typography as Ct, Timeline as Ft, Result as Tt } from "antd";
import { useTranslation as Z } from "react-i18next";
import { useState as y, useEffect as Oe, useMemo as Te, Suspense as Ke, lazy as We, useCallback as ke } from "react";
import { useRequest as v } from "ahooks";
import { SaveOutlined as Ne, ReloadOutlined as be, LoadingOutlined as It, CheckCircleTwoTone as At, ClearOutlined as Et, StarFilled as zt, CheckCircleOutlined as Ot, StarOutlined as Pt, EditOutlined as Pe, CopyOutlined as ut, DeleteOutlined as Ie, BugOutlined as Mt, PlusOutlined as Me, ThunderboltOutlined as Lt, ToolOutlined as Qe, SettingOutlined as Rt, FileTextOutlined as He, EyeOutlined as ct, UploadOutlined as it, CalendarOutlined as Ut, ArrowLeftOutlined as mt, FolderOutlined as pt, FileOutlined as gt, FileAddOutlined as Nt, FolderAddOutlined as Dt, SearchOutlined as qt, DownloadOutlined as $t, WarningOutlined as Bt, DashboardOutlined as Ht, MessageOutlined as Kt, SendOutlined as Wt } from "@ant-design/icons";
import { a as S } from "./index.js";
import { g as nt, c as ft } from "./base.js";
import { f as ce, e as Jt, b as De, L as qe } from "./components.js";
import Ze from "react-quill";
import { useNavigate as Se, useLocation as Gt, useParams as lt, useSearchParams as Zt } from "react-router-dom";
import { c as ht, b as Xt } from "./contexts.js";
import { l as Yt, c as Qt, u as es, d as ts, g as ss, b as ls, e as as, f as is, r as ns } from "./system.js";
import { l as os, b as rs } from "./authorization.js";
import { createStyles as ds } from "antd-style";
import et from "react-json-view";
const Ae = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, us = {
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
}, cs = ({ initialData: t, onRefresh: l }) => {
  const { t: s } = Z("system"), { t: i } = Z("common"), [d] = a.useForm(), [n, h] = y((t == null ? void 0 : t.provider) || "custom"), [p, g] = y((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [o, V] = y((t == null ? void 0 : t.enabled) || !1), [c, C] = y((t == null ? void 0 : t.auto_create_user) || !1), { loading: F, data: A, refresh: x } = v(S.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (w) => {
      d.setFieldsValue(w), h(w.provider), g(w.provider === "custom" || w.provider === "autoDiscover"), V(w.enabled), C(w.auto_create_user);
    },
    onError: (w) => {
      r.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", w);
    }
  });
  Oe(() => {
    t && (d.setFieldsValue(t), h(t.provider), g(t.provider === "custom" || t.provider === "autoDiscover"), V(t.enabled), C(t.auto_create_user));
  }, [t, d]);
  const O = (w) => {
    h(w), g(w === "custom" || w === "autoDiscover");
    const R = us[w];
    R && d.setFieldsValue({
      auth_endpoint: R.endpoints.auth_endpoint,
      token_endpoint: R.endpoints.token_endpoint,
      userinfo_endpoint: R.endpoints.userinfo_endpoint,
      scope: R.scope,
      // Set field mappings
      email_field: R.email_field,
      username_field: R.username_field,
      full_name_field: R.full_name_field,
      avatar_field: R.avatar_field,
      role_field: R.role_field,
      // Set display configuration
      icon_url: R.icon_url,
      display_name: R.display_name
    });
  }, U = (w) => {
    V(w);
  }, E = (w) => {
    C(w);
  }, { loading: z, run: M } = v(S.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : x();
    },
    onError: (w) => {
      r.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", w);
    }
  }), D = (w) => {
    M(w);
  }, W = () => {
    l ? l() : x();
  }, { loading: H, run: J } = v(async ({ redirect_uri: w, ...R }) => {
    let Y;
    return w ? Y = new URL(w) : Y = new URL(window.location.origin), Y.pathname = nt("/system/settings/oauth/test-callback"), Y.searchParams.set("provider", n), S.system.testOauthConnection({ redirect_uri: Y.toString(), ...R });
  }, {
    manual: !0,
    onSuccess: ({ url: w }) => {
      window.open(w, "_blank");
    },
    onError: (w) => {
      r.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: w.message })), console.error("Failed to test OAuth connection", w);
    }
  }), q = () => n === "custom";
  return /* @__PURE__ */ e.jsx(je, { spinning: F, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: D,
      initialValues: t || A,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: U })
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
                required: o,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(B, { onChange: O, disabled: !o, children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "github", children: s("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "google", children: s("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "dingtalk", children: s("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "wechat", children: s("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "autoDiscover", children: s("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "custom", children: s("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
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
              j,
              {
                disabled: !o,
                placeholder: n !== "custom" ? s(`settings.oauth.provider.options.${n}`, { defaultValue: n }) : ""
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
                pattern: Ae,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(j, { disabled: !o, placeholder: "https://example.com/icon.png" })
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
                required: o,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(j, { disabled: !o })
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
                required: o,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(j.Password, { disabled: !o, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        q() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && n === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: Ae,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(j, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "wellknown_endpoint",
            hidden: n !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: Ae,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: o && n === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(j, { disabled: !o })
          }
        ),
        q() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && n === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: Ae,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(j, { disabled: !o })
          }
        ),
        q() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: o && n === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: Ae,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(j, { disabled: !o })
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
                required: o,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(j, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(w) => w.getFieldValue("redirect_uri") !== "" ? {
              pattern: Ae,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(j, { disabled: !o, placeholder: `http://${window.location.host}${nt(`/login?provider=settings.${n}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: E, disabled: !o })
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
                required: o && c,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(j, { disabled: !o || !c })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs(B, { disabled: !o, children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "new_user_only", children: s("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "temporary", children: s("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Ye,
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
                  s("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.new_user_only.description", { defaultValue: "Uses OAuth2 roles only for newly created users. Existing users keep their current roles." })
              ] }),
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  s("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.temporary.description", { defaultValue: "Applies OAuth2 roles for the current session only without persisting them. Other login methods still use database roles." })
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
            children: /* @__PURE__ */ e.jsx(de, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(tt, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Ye,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: p ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(j, { placeholder: "email", disabled: !o || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(j, { placeholder: "login", autoComplete: "off", disabled: !o || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(j, { placeholder: "name", disabled: !o || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(j, { placeholder: "avatar_url", disabled: !o || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(j, { placeholder: "role", disabled: !o || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            T,
            {
              type: "primary",
              htmlType: "submit",
              loading: z,
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            T,
            {
              loading: H,
              onClick: async () => {
                const w = d.getFieldsValue();
                J(w);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            T,
            {
              onClick: W,
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, ms = () => {
  const { t } = Z("system"), { t: l } = Z("common"), [s] = a.useForm(), { loading: i, data: d, refresh: n } = v(S.system.getSecuritySettings, {
    onSuccess: (o) => {
      s.setFieldsValue(o);
    },
    onError: (o) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: h, run: p } = v(S.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n();
    },
    onError: (o) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), g = (o) => {
    p(o);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: i, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: s,
      layout: "vertical",
      onFinish: g,
      initialValues: d,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_complexity",
            label: t("settings.security.passwordComplexity.label", { defaultValue: "Password Complexity" }),
            tooltip: t("settings.security.passwordComplexity.tooltip", { defaultValue: "Define the complexity requirements for user passwords." }),
            children: /* @__PURE__ */ e.jsxs(B, { children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
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
            children: /* @__PURE__ */ e.jsx(he, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(he, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, V) => o.login_failure_lock !== V.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(he, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, V) => o.login_failure_lock !== V.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(he, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, V) => o.history_password_check !== V.history_password_check,
            children: ({ getFieldValue: o }) => o("history_password_check") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(he, { min: 1, max: 10, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(he, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(he, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(he, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            T,
            {
              type: "primary",
              htmlType: "submit",
              loading: h,
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            T,
            {
              onClick: () => n(),
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, ps = ({ fetchItems: t, importItems: l, columns: s, ...i }) => {
  const { t: d } = Z("system"), [n, h] = y([]), [p, g] = y([]), { run: o, loading: V } = v(t, {
    onError: (F) => {
      r.error(d("settings.ldap.importError", { error: `${F.message}` }));
    },
    onSuccess: (F) => {
      h(F);
    },
    manual: !0
  }), { run: c, loading: C } = v(async () => {
    for (const F of p.filter((A) => {
      const x = n.find((O) => O.ldap_dn === A);
      return !(!x || x.status === "imported");
    })) {
      const A = await l([F]);
      h((x) => [...x].map((U) => {
        for (const E of A)
          if (U.ldap_dn === E.ldap_dn)
            return { ...E, status: "imported" };
        return U;
      }));
    }
  }, {
    manual: !0
  });
  return Oe(() => {
    i.visible && (h([]), o(), g([]));
  }, [i.visible]), /* @__PURE__ */ e.jsx(
    ne,
    {
      title: d("settings.ldap.importTitle"),
      ...i,
      onOk: () => {
        c();
      },
      width: 900,
      confirmLoading: C,
      loading: V,
      children: /* @__PURE__ */ e.jsx(
        ze,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (F) => {
              g(F);
            },
            getCheckboxProps: (F) => ({
              disabled: F.status === "imported"
            })
          },
          columns: s.map(({ render: F, ...A }) => F ? {
            ...A,
            render: (x, O, U) => {
              const E = p.includes(O.ldap_dn) && C && O.status !== "imported";
              return F(x, O, U, E);
            }
          } : A),
          dataSource: n,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, gs = () => {
  var O, U, E;
  const { t } = Z("system"), [l] = a.useForm(), [s, i] = y(!1), [d, n] = y(null), [h, p] = y(!1), [g, o] = y(!1), [V] = a.useForm(), [c, C] = y(!1);
  v(S.system.getLdapSettings, {
    onSuccess: (z) => {
      l.setFieldsValue(z), C(z.enabled);
    },
    onError: (z) => {
      r.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${z.message}` }));
    }
  }), Oe(() => {
    n(null);
  }, [h]);
  const F = async (z) => {
    i(!0);
    try {
      await S.system.updateLdapSettings(z), r.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      r.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      i(!1);
    }
  }, { run: A, loading: x } = v(async (z) => {
    const M = await l.validateFields();
    return await S.system.testLdapConnection({
      ...z,
      ...M
    });
  }, {
    onSuccess: (z) => {
      n(z);
    },
    onError: (z) => {
      r.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${z.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      a,
      {
        form: l,
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
            a.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { onChange: (z) => C(z) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: c, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !c, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: c, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !c, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: c, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(j.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: c, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !c, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(j, { disabled: !c, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: c, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: c, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: c, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: c, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(j, { type: "number", defaultValue: 15, disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(tt, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(j.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(j.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(j.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !c })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(T, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              T,
              {
                disabled: !c,
                style: { marginLeft: 8 },
                onClick: () => p(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ce, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              T,
              {
                disabled: !c,
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
      ne,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: h,
        onCancel: () => p(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            a,
            {
              form: V,
              layout: "vertical",
              onFinish: A,
              children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(j, { disabled: !c })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(j.Password, { disabled: !c })
                  }
                ),
                /* @__PURE__ */ e.jsxs(a.Item, { children: [
                  /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(T, { disabled: !c, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    T,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => p(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(je, { spinning: x, children: /* @__PURE__ */ e.jsx(bt, { active: x, loading: x, children: d && (d.user ? /* @__PURE__ */ e.jsxs(ue, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(ue.Item, { label: "Username", span: 3, children: d.user.username }),
            /* @__PURE__ */ e.jsx(ue.Item, { label: "Email", span: 3, children: d.user.email }),
            /* @__PURE__ */ e.jsx(ue.Item, { label: "FullName", span: 3, children: d.user.full_name }),
            /* @__PURE__ */ e.jsx(ue.Item, { label: "CreatedAt", span: 3, children: d.user.created_at }),
            /* @__PURE__ */ e.jsx(ue.Item, { label: "UpdatedAt", span: 3, children: d.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Vt,
            {
              direction: "vertical",
              current: (O = d.message) == null ? void 0 : O.findIndex((z) => !z.success),
              status: (U = d.message) != null && U.find((z) => !z.success) ? "error" : "finish",
              items: (E = d.message) == null ? void 0 : E.map((z) => ({
                status: z.success ? "finish" : "error",
                title: z.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      ps,
      {
        visible: g,
        onCancel: () => o(!1),
        fetchItems: () => S.system.importLdapUsers({}),
        importItems: (z) => S.system.importLdapUsers({ user_dn: z }),
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
          render: (z, M, D, W) => W ? /* @__PURE__ */ e.jsx(je, { indicator: /* @__PURE__ */ e.jsx(It, { spin: !0 }) }) : z ? /* @__PURE__ */ e.jsx(At, { twoToneColor: "#52c41a" }) : M.id ? /* @__PURE__ */ e.jsx(re, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(re, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, fs = () => {
  const { t } = Z("system"), { t: l } = Z("common"), [s] = a.useForm(), [i, d] = y(null), [n, h] = y(!1), [p] = a.useForm(), [g, o] = y(!1), { loading: V } = v(S.system.getSmtpSettings, {
    onSuccess: (x) => {
      s.setFieldsValue(x), o(x.enabled);
    },
    onError: (x) => {
      r.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${x.message}` }));
    }
  });
  Oe(() => {
    d(null);
  }, [n]);
  const { run: c, loading: C } = v(({ port: x, ...O }) => S.system.updateSmtpSettings({ ...O, port: Number(x) }), {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (x) => {
      r.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${x.message}` }));
    }
  }), { run: F, loading: A } = v(async (x) => {
    const { port: O, ...U } = await s.validateFields();
    return await S.system.testSmtpConnection({
      ...x,
      ...U,
      port: Number(O)
    });
  }, {
    onSuccess: (x) => {
      d(x);
    },
    onError: (x) => {
      r.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${x.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(je, { spinning: V, children: /* @__PURE__ */ e.jsxs(
      a,
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
            a.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { onChange: (x) => o(x) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: g, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !g, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: g, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { type: "number", disabled: !g, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: g, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !g, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(j.Password, { disabled: !g, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: g, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(Be.Group, { disabled: !g, children: [
                /* @__PURE__ */ e.jsx(Be.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(Be.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(Be.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: g, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !g, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(j, { disabled: !g, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.adminEmails", { defaultValue: "Admin Emails" }),
              name: "admin_emails",
              tooltip: t("settings.smtp.adminEmailsTooltip", { defaultValue: "Email addresses that receive admin notifications." }),
              children: /* @__PURE__ */ e.jsx(
                B,
                {
                  mode: "tags",
                  tokenSeparators: [","],
                  disabled: !g,
                  placeholder: t("settings.smtp.adminEmailsPlaceholder", { defaultValue: "Enter email addresses" })
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(tt, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(Ze, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(Ze, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(Ze, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(ce, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(T, { type: "primary", htmlType: "submit", loading: C, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              T,
              {
                onClick: () => h(!0),
                disabled: !g || A,
                loading: A,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ne,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: n,
        onCancel: () => h(!1),
        footer: [
          /* @__PURE__ */ e.jsx(T, { onClick: () => h(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(T, { type: "primary", loading: A, onClick: () => p.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: p,
            layout: "vertical",
            onFinish: (x) => F(x),
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
                  children: /* @__PURE__ */ e.jsx(j, { placeholder: "test@example.com" })
                }
              ),
              i && /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: i.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: i.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, hs = () => {
  const { t, i18n: l } = Z("system"), { t: s } = Z("common"), [i] = a.useForm(), { loading: d, data: n, refresh: h } = v(S.system.getSystemBaseSettings, {
    onSuccess: (C) => {
      i.setFieldsValue(C);
    },
    onError: (C) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", C);
    }
  }), { loading: p, run: g } = v(S.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), h();
    },
    onError: (C) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", C);
    }
  }), { loading: o, run: V } = v(S.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      r.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (C) => {
      r.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", C);
    }
  }), c = (C) => {
    g(C);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: d, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: i,
      layout: "vertical",
      onFinish: c,
      initialValues: n,
      children: [
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(dt, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", children: /* @__PURE__ */ e.jsx(j, {}) }) })
        }, ...Jt.map((C) => ({
          key: C.lang,
          label: l.language !== C.lang ? s(`language.${C.lang}`, { defaultValue: C.label, lang: C.label }) : C.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: ["name_i18n", C.lang], children: /* @__PURE__ */ e.jsx(j, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(j, {}) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(j, {}) }),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.enableSkillToolBinding", { defaultValue: "Link AI tools to skills" }),
            name: "enable_skill_tool_binding",
            tooltip: t("settings.base.enableSkillToolBindingTooltip", {
              defaultValue: "When enabled, AI chat narrows tools by skill bindings when skills are in scope (still within role AI tool permissions)."
            }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            T,
            {
              type: "primary",
              htmlType: "submit",
              loading: p,
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            T,
            {
              onClick: () => h(),
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(ce, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            kt,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: s("ok", { defaultValue: "OK" }),
              cancelText: s("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => V(),
              children: /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx(Et, {}), loading: o, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, xs = We(() => import("./json-schema-config-form.js")), { TextArea: ys } = j, js = () => {
  var ie;
  const { t } = Z("ai"), { t: l } = Z("common"), s = Se(), [i] = a.useForm(), [d, n] = y(!1), [h, p] = y(null), [g, o] = y(""), [V, c] = y(""), { loading: C, data: F } = v(
    () => S.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (f) => {
        r.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", f);
      }
    }
  ), A = Te(() => F == null ? void 0 : F.find((f) => f.provider === V), [F, V]), { loading: x, data: O, refresh: U } = v(
    () => S.ai.listAiModels({ current: 1, page_size: 100, search: g }),
    {
      refreshDeps: [g],
      onError: (f) => {
        r.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", f);
      }
    }
  ), { loading: E, run: z } = v(
    ({ config: f, ...P }) => S.ai.createAiModel({ config: f ?? {}, ...P }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), n(!1), i.resetFields(), U();
      },
      onError: (f) => {
        r.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", f);
      }
    }
  ), { loading: M, run: D } = v(
    ({ id: f, data: P }) => S.ai.updateAiModel({ id: f }, P),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), n(!1), i.resetFields(), p(null), U();
      },
      onError: (f) => {
        r.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", f);
      }
    }
  ), { runAsync: W } = v(
    (f) => S.ai.deleteAiModel({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), U();
      },
      onError: (f) => {
        r.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", f);
      }
    }
  ), { runAsync: H } = v(
    (f) => S.ai.testAiModel({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (f) => {
        r.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", f);
      }
    }
  ), { runAsync: J } = v(
    (f) => S.ai.setDefaultAiModel({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), U();
      },
      onError: (f) => {
        r.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", f);
      }
    }
  ), q = () => {
    p(null), c(""), i.resetFields(), n(!0);
  }, w = (f) => {
    p(f), c(f.provider);
    const P = f.config || {}, X = {
      name: f.name,
      description: f.description,
      provider: f.provider,
      is_default: f.is_default,
      config: P,
      // Spread config fields to form
      status: f.status,
      max_chat_tokens: f.max_chat_tokens ?? 0,
      max_chat_iterations: f.max_chat_iterations ?? 0
    };
    i.setFieldsValue(X), n(!0);
  }, R = async (f) => {
    p(null), c(f.provider), i.resetFields();
    try {
      const P = await S.ai.getAiModel({ id: f.id }), X = { ...P.config || {} };
      "api_key" in X && (X.api_key = ""), i.setFieldsValue({
        name: `${P.name} (copy)`,
        description: P.description,
        provider: P.provider,
        config: X,
        is_default: !1,
        status: "enabled",
        max_chat_tokens: P.max_chat_tokens ?? 0,
        max_chat_iterations: P.max_chat_iterations ?? 0
      }), n(!0);
    } catch {
      r.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, Y = (f) => {
    c(f), i.setFieldValue("config", void 0);
  }, k = (f) => {
    let P = f.config ?? {};
    const X = {
      name: f.name,
      description: f.description,
      provider: f.provider,
      config: P,
      is_default: f.is_default,
      status: f.status,
      max_chat_tokens: f.max_chat_tokens ?? 0,
      max_chat_iterations: f.max_chat_iterations ?? 0
    };
    h ? D({ id: h.id, data: X }) : z(X);
  }, G = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (f, P) => /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx("span", { children: f }),
        P.is_default && /* @__PURE__ */ e.jsx(st, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(zt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (f) => /* @__PURE__ */ e.jsx(re, { color: "blue", children: f.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (f) => /* @__PURE__ */ e.jsx(re, { color: f === "enabled" ? "green" : "red", children: f === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (f, P) => /* @__PURE__ */ e.jsx(De, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Ot, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => H(P.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(Pt, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => J(P.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => w(P)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(ut, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => R(P)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => W(P.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ue, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsx(
        j.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (f) => o(f),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(ce, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          T,
          {
            icon: /* @__PURE__ */ e.jsx(Mt, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          T,
          {
            icon: /* @__PURE__ */ e.jsx(be, {}),
            onClick: U,
            loading: x,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ce, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          T,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Me, {}),
            onClick: q,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      ze,
      {
        columns: G,
        dataSource: (O == null ? void 0 : O.data) || [],
        loading: x,
        rowKey: "id",
        pagination: {
          total: (O == null ? void 0 : O.total) || 0,
          current: (O == null ? void 0 : O.current) || 1,
          pageSize: (O == null ? void 0 : O.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (f, P) => l("pagination.total", {
            defaultValue: `${P[0]}-${P[1]} of ${f} items`,
            start: P[0],
            end: P[1],
            total: f
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ne,
      {
        title: h ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: d,
        onCancel: () => {
          n(!1), i.resetFields(), p(null);
        },
        footer: null,
        width: ((ie = A == null ? void 0 : A.ui_schema) == null ? void 0 : ie["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: i,
            layout: "vertical",
            onFinish: k,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "name",
                    label: t("models.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                    children: /* @__PURE__ */ e.jsx(j, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "description",
                    label: t("models.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      ys,
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
                      B,
                      {
                        loading: C,
                        placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                        onChange: Y,
                        value: V,
                        options: F == null ? void 0 : F.map((f) => ({
                          label: f.name,
                          value: f.provider
                        }))
                      }
                    )
                  }
                ),
                A && /* @__PURE__ */ e.jsx(a.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(Ke, { fallback: /* @__PURE__ */ e.jsx(qe, {}), children: /* @__PURE__ */ e.jsx(
                  xs,
                  {
                    schema: A.config_schema,
                    uiSchema: A.ui_schema
                  }
                ) }) }),
                /* @__PURE__ */ e.jsxs(Ue, { gutter: 16, children: [
                  /* @__PURE__ */ e.jsx(ye, { span: 12, children: /* @__PURE__ */ e.jsx(
                    a.Item,
                    {
                      name: "max_chat_tokens",
                      label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: t("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(he, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) }),
                  /* @__PURE__ */ e.jsx(ye, { span: 12, children: /* @__PURE__ */ e.jsx(
                    a.Item,
                    {
                      name: "max_chat_iterations",
                      label: t("models.maxChatIterations", { defaultValue: "Max chat iterations (tool rounds)" }),
                      tooltip: t("models.maxChatIterationsHelp", {
                        defaultValue: "0 uses default. Positive value caps tool-call iterations for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(he, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ e.jsxs(
                  a.Item,
                  {
                    name: "is_default",
                    valuePropName: "checked",
                    children: [
                      /* @__PURE__ */ e.jsx(de, {}),
                      " ",
                      /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                    ]
                  }
                ),
                /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(j, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  T,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: E || M,
                    children: h ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  T,
                  {
                    onClick: () => {
                      n(!1), i.resetFields(), p(null), c("");
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
}, bs = We(() => import("./json-schema-config-form.js").then((t) => ({
  default: t.JsonSchemaConfigFormItem
}))), { TextArea: Vs } = j, ks = () => {
  var me;
  const { t } = Z("system"), { t: l } = Z("common"), [s] = a.useForm(), [i, d] = y(!1), [n, h] = y(null), [p, g] = y(""), [o, V] = y(!1), [c, C] = y(null), [F, A] = y(""), [x, O] = y(!1), [U, E] = y([]), [z, M] = y(), [D, W] = y(null), { loading: H, data: J, refresh: q } = v(
    () => S.system.listToolSets({ current: 1, page_size: 100, search: p, type: z }),
    {
      refreshDeps: [p, z],
      onError: (m) => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", m);
      }
    }
  ), { loading: w, data: R } = v(
    () => S.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (m) => {
        r.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", m);
      }
    }
  ), Y = Te(() => R == null ? void 0 : R.find((m) => m.tool_set_type === F), [R, F]), { loading: k, run: G } = v(
    (m) => S.system.createToolSet({
      ...m,
      type: m.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), d(!1), s.resetFields(), q();
      },
      onError: (m) => {
        r.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", m);
      }
    }
  ), { loading: ie, run: f } = v(
    ({ id: m, data: N }) => S.system.updateToolSet({ id: m }, {
      ...N,
      type: N.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), d(!1), s.resetFields(), h(null), q();
      },
      onError: (m) => {
        r.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", m);
      }
    }
  ), { run: P } = v(
    (m) => S.system.deleteToolSet({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), q();
      },
      onError: (m) => {
        r.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", m);
      }
    }
  ), { runAsync: X } = v(
    (m) => S.system.testToolSet({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (m) => {
        r.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", m);
      }
    }
  ), { loading: ee, runAsync: _e } = v(
    (m) => S.system.getToolSetTools({ id: m }),
    {
      manual: !0,
      onSuccess: (m) => {
        E(m || []), O(!0);
      },
      onError: (m) => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", m);
      }
    }
  ), Ce = ke(
    async (m, N) => {
      W(m.id);
      try {
        await S.system.updateToolSetStatus(
          { id: m.id },
          { status: N ? "enabled" : "disabled" }
        ), r.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), q();
      } catch (pe) {
        r.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", pe);
      } finally {
        W(null);
      }
    },
    [t, q]
  ), xe = () => {
    h(null), s.resetFields(), A(""), d(!0);
  }, Fe = (m) => {
    h(m), A(m.type);
    const N = { ...m };
    s.setFieldsValue(N), d(!0);
  }, ve = (m) => {
    A(m), s.setFieldValue("config", {});
  }, we = (m) => {
    n ? f({ id: n.id, data: m }) : G(m);
  }, fe = (m) => {
    P(m);
  }, b = (m) => {
    C(m), V(!0);
  }, se = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (m, N) => /* @__PURE__ */ e.jsxs(K, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: m }),
        N.is_preset ? /* @__PURE__ */ e.jsx(re, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (m) => /* @__PURE__ */ e.jsx(re, { color: "blue", children: m.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      key: "status",
      width: 120,
      render: (m, N) => {
        const pe = N.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          ce,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(re, { color: pe ? "green" : "red", children: pe ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              st,
              {
                title: pe ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: pe,
                    loading: D === N.id,
                    onChange: (_) => void Ce(N, _)
                  }
                ) })
              }
            )
          }
        );
      }
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 168,
      render: (m, N) => /* @__PURE__ */ e.jsx(De, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(Lt, {}),
          disabled: N.status !== "enabled",
          onClick: async () => X(N.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Qe, {}),
          permission: "system:toolsets:view",
          disabled: N.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => _e(N.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(Rt, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => b(N.config),
          disabled: !N.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: N.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          onClick: async () => Fe(N),
          disabled: !!N.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          permission: "system:toolsets:delete",
          tooltip: N.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : l("delete", { defaultValue: "Delete" }),
          onClick: async () => fe(N.id),
          danger: !0,
          disabled: !!N.is_preset,
          confirm: N.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => fe(N.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ue, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          j.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (m) => g(m),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          B,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: z,
            onChange: (m) => M(m),
            options: R == null ? void 0 : R.map((m) => ({
              label: m.name,
              value: m.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "", children: "All" }),
              R == null ? void 0 : R.map((m) => /* @__PURE__ */ e.jsx(B.Option, { value: m.tool_set_type, children: m.name }, m.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          T,
          {
            icon: /* @__PURE__ */ e.jsx(be, {}),
            onClick: q,
            loading: H,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          T,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Me, {}),
            onClick: xe,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      ze,
      {
        columns: se,
        dataSource: (J == null ? void 0 : J.data) || [],
        loading: H,
        rowKey: "id",
        pagination: {
          total: (J == null ? void 0 : J.total) || 0,
          current: (J == null ? void 0 : J.current) || 1,
          pageSize: (J == null ? void 0 : J.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (m, N) => l("pagination.total", {
            defaultValue: `${N[0]}-${N[1]} of ${m} items`,
            start: N[0],
            end: N[1],
            total: m
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ne,
      {
        title: n ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        onCancel: () => {
          d(!1), s.resetFields(), h(null), A("");
        },
        footer: null,
        width: ((me = Y == null ? void 0 : Y.ui_schema) == null ? void 0 : me["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: s,
            layout: "vertical",
            onFinish: we,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "name",
                    label: t("settings.toolsets.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                    children: /* @__PURE__ */ e.jsx(j, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "description",
                    label: t("settings.toolsets.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      Vs,
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
                      B,
                      {
                        loading: w,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: ve,
                        value: F,
                        options: R == null ? void 0 : R.map((m) => ({
                          label: m.name,
                          value: m.tool_set_type
                        }))
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(Ke, { fallback: /* @__PURE__ */ e.jsx(qe, {}), children: /* @__PURE__ */ e.jsx(
                  bs,
                  {
                    name: "config",
                    schema: Y == null ? void 0 : Y.config_schema,
                    uiSchema: Y == null ? void 0 : Y.ui_schema
                  }
                ) }),
                /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(j, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  T,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: k || ie,
                    children: n ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  T,
                  {
                    onClick: () => {
                      d(!1), s.resetFields(), h(null), A("");
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
      ne,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: o,
        onCancel: () => V(!1),
        footer: [
          /* @__PURE__ */ e.jsx(T, { onClick: () => V(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(c, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ne,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: x,
        onCancel: () => O(!1),
        footer: [
          /* @__PURE__ */ e.jsx(T, { onClick: () => O(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: ee ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(be, { style: { fontSize: 24 }, spin: !0 }) }) : U.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : U.map((m, N) => {
          var pe, _, I;
          return /* @__PURE__ */ e.jsx(
            ae,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(Qe, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((pe = m.function) == null ? void 0 : pe.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(Ue, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(ye, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((_ = m.function) == null ? void 0 : _.description) || "-" })
                ] }),
                ((I = m.function) == null ? void 0 : I.parameters) && /* @__PURE__ */ e.jsxs(ye, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(m.function.parameters, null, 2) })
                ] })
              ] })
            },
            N
          );
        }) })
      }
    )
  ] });
}, { TextArea: ot } = j;
function Ss(t, l) {
  const s = {}, i = [], d = new Map(l.map((n) => [n.id, n]));
  for (const n of t) {
    if (n.toolset_id === "*") {
      i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
      continue;
    }
    const h = d.get(n.toolset_id);
    if (!h) {
      i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
      continue;
    }
    const p = (h.tools || []).map((g) => g.name);
    if (n.tool_name === "*") {
      s[n.toolset_id] = [...p];
      continue;
    }
    p.includes(n.tool_name) ? (s[n.toolset_id] || (s[n.toolset_id] = []), s[n.toolset_id].includes(n.tool_name) || s[n.toolset_id].push(n.tool_name)) : i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
  }
  return { selections: s, extraPatterns: i };
}
function _s(t, l) {
  const s = [], i = /* @__PURE__ */ new Set();
  for (const [d, n] of Object.entries(t))
    for (const h of n) {
      const p = `${d}|${h}`;
      i.has(p) || (i.add(p), s.push({ toolset_id: d, tool_name: h }));
    }
  for (const d of l) {
    const n = d.toolset_id.trim(), h = d.tool_name.trim();
    if (!n || !h)
      continue;
    const p = `${n}|${h}`;
    i.has(p) || (i.add(p), s.push({ toolset_id: n, tool_name: h }));
  }
  return s;
}
function xt(t, l) {
  const s = l.trim();
  return !s || t.some((i) => i.value === s) ? t : [...t, { value: s, label: s }];
}
function vs(t, l, s, i) {
  const n = [{ value: "*", label: i }], h = /* @__PURE__ */ new Set(["*"]), p = (g, o) => {
    h.has(g) || (h.add(g), n.push({
      value: g,
      label: o ? `${g} — ${o}` : g
    }));
  };
  if (l && l !== "*") {
    const g = t.find((o) => o.id === l);
    for (const o of (g == null ? void 0 : g.tools) || [])
      p(o.name, o.description);
  } else
    for (const g of t)
      for (const o of g.tools || [])
        p(o.name, o.description);
  return xt(n, s);
}
const ws = () => {
  const { t } = Z("system"), { t: l } = Z("common"), s = Se(), { enableSkillToolBinding: i } = ht(), [d] = a.useForm(), [n, h] = y(""), [p, g] = y(), [o, V] = y(!1), [c, C] = y(null), [F, A] = y(null), [x, O] = y(!1), [U] = a.useForm(), [E, z] = y(!1), [M, D] = y(null), [W, H] = y([]), [J, q] = y({}), [w, R] = y([]), [Y, k] = y(!1), G = Te(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...W.map((u) => ({
      value: u.id,
      label: `${u.name} (${u.id})`
    }))
  ], [W, t]), ie = ke(() => {
    H([]), q({}), R([]);
  }, []), { loading: f, data: P, refresh: X } = v(
    () => S.system.listSkills({
      current: 1,
      page_size: 100,
      search: n || void 0,
      domain: p
    }),
    {
      refreshDeps: [n, p],
      onError: () => {
        r.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: ee = [] } = v(() => S.system.listSkillDomains()), _e = (P == null ? void 0 : P.data) ?? [], Ce = (P == null ? void 0 : P.total) ?? 0, { run: xe } = v(
    (u) => S.system.deleteSkill({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), X();
      },
      onError: () => {
        r.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Fe = ke(
    async (u, L) => {
      D(u.id);
      try {
        await S.system.updateSkillStatus({ id: u.id }, { status: L ? "enabled" : "disabled" }), r.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), X();
      } catch {
        r.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        D(null);
      }
    },
    [t, X]
  ), { loading: ve, run: we } = v(
    (u) => S.system.uploadSkill(u.body, u.file),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), O(!1), U.resetFields(), X();
      },
      onError: () => {
        r.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), fe = ke(
    async (u) => {
      k(!0);
      try {
        const [L, $] = await Promise.all([
          S.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          S.system.listSkillAiToolBindings(
            { id: u, current: 1, page_size: 1e3 }
          )
        ]), oe = (L.data || []).filter((jt) => jt.status === "enabled");
        H(oe);
        const Q = $.data || [], { selections: te, extraPatterns: Le } = Ss(Q, oe);
        q(te), R(Le);
      } catch {
        r.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), ie();
      } finally {
        k(!1);
      }
    },
    [ie, t]
  );
  Oe(() => {
    !o || !c || !i || fe(c.id);
  }, [o, c == null ? void 0 : c.id, i, fe]);
  const b = (u, L) => {
    q(($) => ({ ...$, [u]: L }));
  }, se = (u, L, $) => {
    q((oe) => ({
      ...oe,
      [u]: $ ? [...L] : []
    }));
  }, me = () => {
    C(null), A(null), d.resetFields(), ie(), V(!0);
  }, m = (u) => {
    C(u), A(null), d.setFieldsValue({
      name: u.name,
      description: u.description,
      category: u.category,
      domain: u.domain
    }), ie(), V(!0);
  }, N = (u) => {
    C(null), A(u), d.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: u.name, defaultValue: "{{name}} (copy)" }),
      description: u.description,
      category: u.category,
      domain: u.domain
    }), ie(), V(!0);
  }, pe = () => {
    d.validateFields().then(async (u) => {
      z(!0);
      try {
        if (c) {
          const L = {
            name: u.name,
            description: u.description ?? "",
            category: u.category ?? "",
            domain: u.domain ?? ""
          };
          if (await S.system.updateSkill({ id: c.id }, L), i) {
            const $ = _s(J, w);
            await S.system.replaceSkillAiToolBindings(
              { id: c.id },
              { bindings: $ }
            );
          }
          r.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (F) {
          const L = {
            source_id: F.id,
            name: u.name,
            description: u.description ?? "",
            category: u.category ?? "",
            domain: u.domain ?? ""
          }, { id: $ } = await S.system.cloneSkill(L);
          r.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), V(!1), A(null), d.resetFields(), ie(), X(), $ && s(`/system/settings/skills/${$}/edit`);
          return;
        } else {
          const L = {
            name: u.name,
            description: u.description ?? "",
            category: u.category ?? "",
            domain: u.domain ?? "",
            content: u.content ?? ""
          };
          await S.system.createSkill(L), r.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        V(!1), C(null), A(null), d.resetFields(), ie(), X();
      } catch {
        r.error(
          c ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : F ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        z(!1);
      }
    });
  }, _ = () => {
    var Q, te;
    const u = (Q = U.getFieldValue("file")) == null ? void 0 : Q.fileList, L = ((te = u == null ? void 0 : u[0]) == null ? void 0 : te.originFileObj) ?? (u == null ? void 0 : u[0]);
    if (!L) {
      r.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const $ = U.getFieldValue("category"), oe = U.getFieldValue("domain");
    we({ body: { category: $, domain: oe }, file: L });
  }, I = i && c, le = I ? 720 : 560, ge = !c && !F, $e = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (u, L) => /* @__PURE__ */ e.jsxs(K, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: u }),
        L.is_preset ? /* @__PURE__ */ e.jsx(re, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (u) => u ? /* @__PURE__ */ e.jsx(re, { children: u }) : "-" },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (u) => u ? /* @__PURE__ */ e.jsx(re, { color: "blue", children: u }) : "-" },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (u, L) => {
        const $ = L.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          ce,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(re, { color: $ ? "green" : "red", children: $ ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              st,
              {
                title: $ ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: $,
                    loading: M === L.id,
                    onChange: (oe) => void Fe(L, oe)
                  }
                ) })
              }
            )
          }
        );
      }
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 220,
      render: (u, L) => /* @__PURE__ */ e.jsx(
        De,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(He, {}),
              tooltip: L.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${L.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!L.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(ct, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${L.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Pe, {}),
              tooltip: L.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => m(L),
              permission: "system:skills:update",
              disabled: !!L.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(ut, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => N(L),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              tooltip: L.is_preset ? t("settings.skills.presetDisabledDelete", {
                defaultValue: "Built-in skills cannot be deleted."
              }) : t("settings.skills.actionDelete", { defaultValue: "Delete" }),
              danger: !0,
              disabled: !!L.is_preset,
              confirm: L.is_preset ? void 0 : {
                title: t("settings.skills.deleteSkillConfirm", { defaultValue: "Delete this skill?" }),
                description: t("settings.skills.deleteSkillConfirmDescription", {
                  defaultValue: "The skill and all its files will be removed. This cannot be undone."
                }),
                okText: l("confirm", { defaultValue: "Confirm" }),
                cancelText: l("cancel", { defaultValue: "Cancel" }),
                onConfirm: async () => xe(L.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ue, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          j.Search,
          {
            placeholder: l("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: h,
            style: { width: 300 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          B,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: p,
            onChange: g,
            options: ee.map((u) => ({ value: u, label: u }))
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => X(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(T, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: me, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx(it, {}), onClick: () => O(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsx(
        ze,
        {
          rowKey: "id",
          loading: f,
          columns: $e,
          dataSource: _e,
          pagination: { total: Ce, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        ne,
        {
          title: c ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : F ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: o,
          onOk: pe,
          onCancel: () => {
            V(!1), C(null), A(null), ie();
          },
          confirmLoading: E,
          width: le,
          children: /* @__PURE__ */ e.jsxs(a, { form: d, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(j, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(ot, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(j, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(B, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: ee.map((u) => ({ value: u, label: u })) }) }),
            ge && /* @__PURE__ */ e.jsx(a.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(ot, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            I && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(je, { spinning: Y, children: W.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(K, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: W.map((u) => {
                const L = (u.tools || []).map((te) => te.name), $ = J[u.id] || [], oe = L.length > 0 && $.length === L.length, Q = $.length > 0 && $.length < L.length;
                return /* @__PURE__ */ e.jsx(
                  ae,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        Ge,
                        {
                          checked: oe,
                          indeterminate: Q,
                          onChange: (te) => se(u.id, L, te.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: u.name })
                    ] }),
                    extra: u.description ? /* @__PURE__ */ e.jsx("span", { children: u.description }) : void 0,
                    children: (u.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(Ge.Group, { style: { width: "100%" }, value: $, onChange: (te) => b(u.id, te), children: /* @__PURE__ */ e.jsx(K, { direction: "vertical", style: { width: "100%" }, children: (u.tools || []).map((te) => /* @__PURE__ */ e.jsx(Ge, { value: te.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: te.name }),
                      te.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: te.description })
                    ] }) }, te.name)) }) }) : /* @__PURE__ */ e.jsx(
                      Re,
                      {
                        image: Re.PRESENTED_IMAGE_SIMPLE,
                        description: t("settings.skills.aiToolsetNoTools", { defaultValue: "No tools available in this toolset." })
                      }
                    )
                  },
                  u.id
                );
              }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                  defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                }) }),
                /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, children: [
                  w.map((u, L) => /* @__PURE__ */ e.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: "100%"
                      },
                      children: [
                        /* @__PURE__ */ e.jsx(
                          at,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: u.toolset_id,
                            options: xt(G, u.toolset_id),
                            filterOption: ($, oe) => {
                              const Q = oe;
                              return `${(Q == null ? void 0 : Q.value) ?? ""} ${(Q == null ? void 0 : Q.label) ?? ""}`.toLowerCase().includes($.toLowerCase());
                            },
                            onChange: ($) => {
                              const oe = typeof $ == "string" ? $ : "";
                              R(
                                (Q) => Q.map((te, Le) => Le === L ? { ...te, toolset_id: oe } : te)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          at,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: u.tool_name,
                            options: vs(
                              W,
                              u.toolset_id,
                              u.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: ($, oe) => {
                              const Q = oe;
                              return `${(Q == null ? void 0 : Q.value) ?? ""} ${(Q == null ? void 0 : Q.label) ?? ""}`.toLowerCase().includes($.toLowerCase());
                            },
                            onChange: ($) => {
                              const oe = typeof $ == "string" ? $ : "";
                              R(
                                (Q) => Q.map((te, Le) => Le === L ? { ...te, tool_name: oe } : te)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          T,
                          {
                            type: "default",
                            danger: !0,
                            style: { flexShrink: 0 },
                            onClick: () => R(($) => $.filter((oe, Q) => Q !== L)),
                            children: l("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    L
                  )),
                  /* @__PURE__ */ e.jsx(T, { type: "dashed", onClick: () => R((u) => [...u, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                ] })
              ] })
            ] }) : /* @__PURE__ */ e.jsx(
              Re,
              {
                image: Re.PRESENTED_IMAGE_SIMPLE,
                description: t("settings.skills.aiToolsetsEmpty", { defaultValue: "No AI toolsets available for this organization." })
              }
            ) }) })
          ] })
        }
      ),
      /* @__PURE__ */ e.jsx(
        ne,
        {
          title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
          open: x,
          onOk: _,
          onCancel: () => O(!1),
          confirmLoading: ve,
          children: /* @__PURE__ */ e.jsxs(a, { form: U, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(a.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(St, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx(it, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(j, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(B, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: ee.map((u) => ({ value: u, label: u })) }) })
          ] })
        }
      )
    ] })
  ] });
}, Cs = () => {
  const t = Se(), { t: l } = Z("system"), { t: s } = Z("task"), { t: i } = Z("common"), [d] = a.useForm(), { data: n } = v(S.system.listLogStorageBackends), { data: h } = v(S.system.getTaskSettingFields), p = (n ?? []).map((x) => ({
    value: x.id,
    label: l(`settings.task.logStorage.${x.id}`, { defaultValue: x.name })
  })), { loading: g, refresh: o } = v(S.system.getTaskSettings, {
    onSuccess: (x) => {
      x && d.setFieldsValue(x);
    },
    onError: () => {
      r.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: V, run: c } = v(S.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), o();
    },
    onError: () => {
      r.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), C = (x) => {
    c(x);
  }, F = (x) => {
    switch (x.value_type) {
      case "int":
        return /* @__PURE__ */ e.jsx(
          he,
          {
            style: { width: "100%" },
            addonAfter: x.key.includes("retention_days") ? l("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "bool":
        return /* @__PURE__ */ e.jsx(de, {});
      default:
        return /* @__PURE__ */ e.jsx(j, {});
    }
  }, A = (x) => x.value_type === "int" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(je, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: C,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "log_storage_backend",
            label: l("settings.task.logStorageBackend", { defaultValue: "Log storage" }),
            tooltip: l("settings.task.logStorageBackendTooltip", {
              defaultValue: "Where task execution logs are stored. Database stores logs in the application database."
            }),
            children: /* @__PURE__ */ e.jsx(
              B,
              {
                options: p,
                placeholder: l("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: n === void 0
              }
            )
          }
        ),
        (h ?? []).map((x) => /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: x.key,
            label: l(`settings.task.fields.${x.key}`, { defaultValue: x.key }),
            rules: A(x),
            valuePropName: x.value_type === "bool" ? "checked" : "value",
            children: F(x)
          },
          x.key
        )),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(T, { type: "primary", htmlType: "submit", loading: V, icon: /* @__PURE__ */ e.jsx(Ne, {}), children: i("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(T, { onClick: () => o(), icon: /* @__PURE__ */ e.jsx(be, {}), children: i("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(ce, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx(Ut, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: Fs } = j, Ts = /^[-_a-zA-Z0-9.]+$/, Is = () => {
  const t = Se(), { t: l, i18n: s } = Z("system"), { t: i } = Z("common"), d = (k) => {
    if (!k) return "-";
    const G = new Date(k);
    return Number.isNaN(G.getTime()) ? "-" : G.toLocaleString(s.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [n] = a.useForm(), [h, p] = y(!1), [g, o] = y(null), [V, c] = y(""), [C, F] = y(1), [A, x] = y(10), { loading: O, data: U, refresh: E } = v(
    () => Yt({ current: C, page_size: A, search: V }),
    {
      refreshDeps: [C, A, V],
      onError: (k) => {
        r.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", k);
      }
    }
  ), { loading: z, run: M } = v(
    (k) => Qt(k),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), p(!1), n.resetFields(), o(null), E();
      },
      onError: (k) => {
        r.error((k == null ? void 0 : k.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: D, run: W } = v(
    ({ id: k, ...G }) => es({ id: k }, G),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), p(!1), n.resetFields(), o(null), E();
      },
      onError: (k) => {
        r.error((k == null ? void 0 : k.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: H } = v(
    (k) => ts({ id: k }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), E();
      },
      onError: (k) => {
        r.error((k == null ? void 0 : k.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), J = () => {
    o(null), n.resetFields(), n.setFieldsValue({ status: "active" }), p(!0);
  }, q = (k) => {
    o(k), n.setFieldsValue({
      name: k.name,
      slug: k.slug,
      description: k.description,
      status: k.status
    }), p(!0);
  }, w = (k) => {
    ne.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${k.name}"? This action cannot be undone.`
      }),
      onOk: () => H(k.id)
    });
  }, R = () => {
    n.validateFields().then((k) => {
      g ? W({ id: g.id, ...k }) : M(k);
    });
  }, Y = [
    {
      title: l("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: l("settings.organizations.slug", { defaultValue: "Slug" }),
      dataIndex: "slug",
      key: "slug",
      render: (k) => k || "-"
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
      render: (k) => /* @__PURE__ */ e.jsx(re, { color: k === "active" ? "green" : "default", children: k === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (k) => d(k)
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (k, G) => /* @__PURE__ */ e.jsx(
        De,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(ct, {}),
              onClick: async () => t(`/system/settings/organizations/${G.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Pe, {}),
              onClick: async () => q(G),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              danger: !0,
              onClick: async () => w(G),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    ae,
    {
      title: l("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: E, children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(T, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: J, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            j.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (k) => {
                c(k), F(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            ze,
            {
              columns: Y,
              dataSource: (U == null ? void 0 : U.data) || [],
              loading: O,
              rowKey: "id",
              pagination: {
                current: C,
                pageSize: A,
                total: (U == null ? void 0 : U.total) || 0,
                showSizeChanger: !0,
                showTotal: (k, G) => i("pagination.total", {
                  defaultValue: `${G[0]}-${G[1]} of ${k} items`,
                  start: G[0],
                  end: G[1],
                  total: k
                }),
                onChange: (k, G) => {
                  F(k), x(G);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          ne,
          {
            title: g ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: h,
            onOk: R,
            onCancel: () => {
              p(!1), n.resetFields(), o(null);
            },
            confirmLoading: z || D,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(a, { form: n, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: l("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: l("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(j, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "slug",
                  label: l("settings.organizations.slug", { defaultValue: "Slug" }),
                  tooltip: l("settings.organizations.slugTooltip", { defaultValue: "Optional unique identifier. Only letters, digits, hyphens, underscores, and dots are allowed." }),
                  rules: [{
                    pattern: Ts,
                    message: l("settings.organizations.slugInvalid", { defaultValue: "Slug may only contain letters, digits, hyphens, underscores, and dots" })
                  }],
                  children: /* @__PURE__ */ e.jsx(j, { placeholder: "my-org" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: l("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Fs, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "status",
                  label: l("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(B, { children: [
                    /* @__PURE__ */ e.jsx(B.Option, { value: "active", children: l("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(B.Option, { value: "disabled", children: l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, As = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = Z("system"), s = Se(), i = Gt(), h = i.hash.replace("#", "") || "base", { enableMultiOrg: p } = ht(), { hasPermission: g } = Xt(), o = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(hs, {}),
      hidden: !g("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(ms, {}),
      hidden: !g("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(cs, {}),
      hidden: !g("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(gs, {}),
      hidden: !g("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(fs, {}),
      hidden: !g("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(js, {}),
      hidden: !g("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(ks, {}),
      hidden: !g("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(ws, {}),
      hidden: !g("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Cs, {}),
      hidden: !g("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...p ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Is, {}),
      hidden: !g("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(ae, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    dt,
    {
      defaultActiveKey: h,
      onChange: (V) => {
        s(`${i.pathname}#${V}`);
      },
      items: t(o.filter((V) => !V.hidden), l)
    }
  ) });
}, dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: As
}, Symbol.toStringTag, { value: "Module" })), Es = () => {
  var ve, we, fe;
  const t = Se(), { id: l } = lt(), { t: s } = Z("system"), { t: i } = Z("common"), [d] = a.useForm(), [n] = a.useForm(), [h, p] = y(!1), [g, o] = y(!1), [V, c] = y(null), [C, F] = y(""), [A, x] = y(1), [O, U] = y(10), { data: E, loading: z, refresh: M } = v(
    () => ss({ id: l }),
    {
      ready: !!l,
      onError: (b) => {
        r.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", b);
      }
    }
  ), { data: D, loading: W, refresh: H } = v(
    () => ls({ id: l, current: A, page_size: O, search: C }),
    {
      ready: !!l,
      refreshDeps: [l, A, O, C],
      onError: (b) => {
        r.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", b);
      }
    }
  ), { data: J, loading: q } = v(
    () => os({ current: 1, page_size: 1e3 }),
    {
      ready: h
    }
  ), { data: w, loading: R } = v(
    () => rs({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: Y, run: k } = v(
    (b) => as({ id: l }, b),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), p(!1), d.resetFields(), H();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: G, run: ie } = v(
    (b) => is({ id: l, user_id: V == null ? void 0 : V.id }, b),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), o(!1), n.resetFields(), c(null), H();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: f } = v(
    (b) => ns({ id: l, user_id: b }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), H();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), P = () => {
    p(!0), d.resetFields();
  }, X = (b) => {
    var se;
    c(b), n.setFieldsValue({
      role_ids: ((se = b.organization_roles) == null ? void 0 : se.map((me) => me.id)) || []
    }), o(!0);
  }, ee = (b) => {
    ne.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${b.full_name || b.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => f(b.id)
    });
  }, _e = () => {
    d.validateFields().then((b) => {
      k(b);
    });
  }, Ce = () => {
    n.validateFields().then((b) => {
      ie(b);
    });
  }, xe = ((ve = J == null ? void 0 : J.data) == null ? void 0 : ve.filter((b) => {
    var se;
    return !((se = D == null ? void 0 : D.data) != null && se.some((me) => me.id === b.id));
  })) || [], Fe = [
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
      render: (b) => /* @__PURE__ */ e.jsx(re, { color: b === "active" ? "green" : "default", children: b === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : b })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (b, se) => {
        var me;
        return /* @__PURE__ */ e.jsx(K, { wrap: !0, children: ((me = se.organization_roles) == null ? void 0 : me.map((m) => /* @__PURE__ */ e.jsx(re, { children: m.name }, m.id))) || /* @__PURE__ */ e.jsx(re, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (b, se) => /* @__PURE__ */ e.jsx(
        De,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Pe, {}),
              onClick: async () => X(se)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              danger: !0,
              onClick: async () => ee(se)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            T,
            {
              icon: /* @__PURE__ */ e.jsx(mt, {}),
              onClick: () => t("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            E == null ? void 0 : E.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => {
          M(), H();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: z,
        children: /* @__PURE__ */ e.jsxs(ue, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(ue.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: E == null ? void 0 : E.name }),
          /* @__PURE__ */ e.jsx(ue.Item, { label: s("settings.organizations.slug", { defaultValue: "Slug" }), children: (E == null ? void 0 : E.slug) || "-" }),
          /* @__PURE__ */ e.jsx(ue.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(re, { color: (E == null ? void 0 : E.status) === "active" ? "green" : "default", children: (E == null ? void 0 : E.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(ue.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (E == null ? void 0 : E.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(T, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: P, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            j.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (b) => {
                F(b), x(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            ze,
            {
              columns: Fe,
              dataSource: (D == null ? void 0 : D.data) || [],
              loading: W,
              rowKey: "id",
              pagination: {
                current: A,
                pageSize: O,
                total: (D == null ? void 0 : D.total) || 0,
                showSizeChanger: !0,
                showTotal: (b) => i("pagination.total", { defaultValue: `Total ${b} items` }),
                onChange: (b, se) => {
                  x(b), U(se);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ne,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: h,
        onOk: _e,
        onCancel: () => {
          p(!1), d.resetFields();
        },
        confirmLoading: Y,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: d, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "user_id",
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: s("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                B,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: q,
                  filterOption: (b, se) => ((se == null ? void 0 : se.label) ?? "").toLowerCase().includes(b.toLowerCase()),
                  options: xe.map((b) => ({
                    label: `${b.full_name || b.username} (${b.email})`,
                    value: b.id
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
                B,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: R,
                  options: ((we = w == null ? void 0 : w.data) == null ? void 0 : we.map((b) => ({
                    label: b.name,
                    value: b.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ne,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: g,
        onOk: Ce,
        onCancel: () => {
          o(!1), n.resetFields(), c(null);
        },
        confirmLoading: G,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: n, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                j,
                {
                  value: (V == null ? void 0 : V.full_name) || (V == null ? void 0 : V.username),
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
                B,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: R,
                  options: ((fe = w == null ? void 0 : w.data) == null ? void 0 : fe.map((b) => ({
                    label: b.name,
                    value: b.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, ul = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Es
}, Symbol.toStringTag, { value: "Module" })), zs = We(() => import("./markdown-viewer.js")), Os = ds(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: rt } = j, Ps = (t) => t.toLowerCase().endsWith(".md");
function yt(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(pt, {}) : /* @__PURE__ */ e.jsx(gt, {}),
      children: (s = l.children) != null && s.length ? yt(l.children) : void 0
    };
  });
}
function Xe(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const Ms = () => {
  const { styles: t } = Os(), { id: l } = lt(), s = Se(), { t: i } = Z("system"), [d, n] = y(null), [h, p] = y(null), [g, o] = y(!1), [V, c] = y(""), [C, F] = y(!1), [A, x] = y([]), [O, U] = y(!1), [E, z] = y(!1), [M, D] = y(""), [W] = a.useForm(), [H, J] = y(null), [q, w] = y(null), [R, Y] = y(""), [k] = a.useForm(), { data: G } = v(
    () => l ? S.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: ie, loading: f, refresh: P } = v(
    () => l ? S.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (_) => {
        if (!d) {
          for (const I of _)
            if (!I.is_dir && I.name === "SKILL.md") {
              p(I.path), n(I.path), o(!1);
              return;
            }
          for (const I of _)
            if (!I.is_dir && I.name === "SKILLS.md") {
              p(I.path), n(I.path), o(!1);
              return;
            }
        }
      }
    }
  ), X = (G == null ? void 0 : G.data) ?? G, ee = !!(X != null && X.is_preset), _e = (ie == null ? void 0 : ie.data) ?? ie ?? [], Ce = Te(() => yt(_e), [_e]), xe = g && h ? h : d ? Xe(d) : "";
  Oe(() => {
    d && l ? (S.system.getSkillFile({ id: l, path: d }).then((_) => {
      c(_.data);
    }).catch(() => r.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), F(!1)) : (c(""), F(!1));
  }, [l, d, i]);
  const Fe = () => {
    !l || !d || ee || S.system.putSkillFile({ id: l, path: d }, V).then(() => {
      r.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), F(!1);
    }).catch(() => r.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, ve = (_, I) => {
    const le = String(I.node.key), ge = !I.node.isLeaf;
    p(le), o(ge), I.node.isLeaf ? n(le) : n(null);
  }, we = (_) => {
    _.event.preventDefault(), J({
      path: String(_.node.key),
      isDir: !_.node.isLeaf,
      x: _.event.clientX,
      y: _.event.clientY
    });
  }, fe = ke(() => J(null), []), b = ke(
    (_) => {
      if (!l || !H || ee) return;
      const { path: I, isDir: le } = H;
      switch (fe(), _) {
        case "open":
          n(I), p(I), o(!1);
          break;
        case "rename": {
          const ge = I.includes("/") ? I.split("/").pop() : I;
          w({ path: I, isDir: le }), Y(ge), setTimeout(() => k.setFieldsValue({ name: ge }), 0);
          break;
        }
        case "delete":
          ne.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: le ? i("settings.skills.editor.deleteConfirmContentDir", { path: I, defaultValue: `Delete ${I}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: I, defaultValue: `Delete ${I}?` }),
            onOk: () => S.system.deleteSkillPath({ id: l, path: I }).then(() => {
              r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === I && (n(null), c("")), h === I && (p(null), o(!1)), P();
            }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          p(I), o(le), U(!0);
          break;
        case "newDir":
          p(I), o(le), z(!0);
          break;
      }
    },
    [l, H, fe, P, d, h, k, i, ee]
  ), se = () => {
    if (!l || !q || ee) return;
    const _ = (k.getFieldValue("name") ?? R).trim();
    if (!_) {
      r.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!q.isDir && !/\.(md|txt)$/i.test(_)) {
      r.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const I = Xe(q.path), le = I ? `${I}/${_}` : _;
    if (le === q.path) {
      w(null);
      return;
    }
    S.system.moveSkillPath({ id: l }, { from_path: q.path, to_path: le }).then(() => {
      r.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === q.path && n(le), h === q.path && p(le), w(null), P();
    }).catch(() => r.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, me = (_) => {
    if (!l || ee) return;
    const I = String(_.dragNode.key), le = String(_.dragNode.title);
    let ge;
    if (_.dropToGap) {
      const $e = Xe(String(_.node.key));
      ge = $e ? `${$e}/${le}` : le;
    } else
      ge = `${_.node.key}/${le}`;
    ge !== I && S.system.moveSkillPath({ id: l }, { from_path: I, to_path: ge }).then(() => {
      r.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), d === I && n(ge), h === I && p(ge), P();
    }).catch(() => r.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, m = () => {
    const _ = M.trim();
    if (!_ || !l || ee) return;
    const I = xe ? `${xe}/${_}` : _;
    if (!/\.(md|txt)$/i.test(_)) {
      r.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    S.system.putSkillFile({ id: l, path: I }, "").then(() => {
      r.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), U(!1), D(""), P(), n(I), c("");
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, N = () => {
    var le;
    const _ = (le = W.getFieldValue("name")) == null ? void 0 : le.trim();
    if (!_ || !l || ee) return;
    const I = xe ? `${xe}/${_}` : _;
    S.system.createSkillDir({ id: l }, { path: I }).then(() => {
      r.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), z(!1), W.resetFields(), P();
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, pe = () => {
    const _ = h || d;
    !l || !_ || ee || ne.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: _, defaultValue: `Delete ${_}?` }),
      onOk: () => S.system.deleteSkillPath({ id: l, path: _ }).then(() => {
        r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === _ && (n(null), c("")), h === _ && (p(null), o(!1)), P();
      }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    ae,
    {
      title: (X == null ? void 0 : X.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(T, { type: "link", onClick: () => s("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        ee ? /* @__PURE__ */ e.jsx(
          Ye,
          {
            type: "info",
            showIcon: !0,
            style: { marginBottom: 12 },
            message: i("settings.skills.editor.presetReadOnly", {
              defaultValue: "This is a built-in skill. Files are read-only; use Preview to view content."
            })
          }
        ) : null,
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 16, flex: 1, minHeight: 0 }, children: [
          /* @__PURE__ */ e.jsxs("div", { style: { width: 260, border: "1px solid #d9d9d9", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(T, { size: "small", icon: /* @__PURE__ */ e.jsx(Me, {}), disabled: ee, onClick: () => U(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(T, { size: "small", icon: /* @__PURE__ */ e.jsx(pt, {}), disabled: ee, onClick: () => z(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            f ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              _t,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !ee,
                expandedKeys: A,
                onExpand: (_) => x(_),
                selectedKeys: h ? [h] : [],
                onSelect: ve,
                onRightClick: ee ? void 0 : we,
                onDrop: me,
                className: t.fileTree,
                treeData: Ce
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(T, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ne, {}), disabled: ee || !C, onClick: Fe, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(T, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ie, {}), disabled: ee, onClick: pe, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              Ps(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  rt,
                  {
                    value: V,
                    readOnly: ee,
                    onChange: (_) => {
                      c(_.target.value), F(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(Ke, { fallback: /* @__PURE__ */ e.jsx(qe, {}), children: /* @__PURE__ */ e.jsx(zs, { content: ft(V) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                rt,
                {
                  value: V,
                  readOnly: ee,
                  onChange: (_) => {
                    c(_.target.value), F(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              )
            ] }),
            !d && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        H && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: fe,
              onContextMenu: (_) => _.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: H.x, top: H.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            vt,
            {
              selectable: !1,
              items: [
                ...H.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(gt, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Pe, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ie, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(Nt, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(Dt, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: _ }) => b(_)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(ne, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: O, onOk: m, onCancel: () => {
          U(!1), D("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(j, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: M, onChange: (_) => D(_.target.value) }) }),
        /* @__PURE__ */ e.jsx(ne, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: E, onOk: () => W.validateFields().then(N), onCancel: () => z(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(a, { form: W, layout: "vertical", children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(j, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          ne,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!q,
            onOk: se,
            onCancel: () => w(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(a, { form: k, layout: "vertical", onValuesChange: (_, I) => Y(I.name ?? ""), children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: q != null && q.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              j,
              {
                placeholder: q != null && q.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => se()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ms
}, Symbol.toStringTag, { value: "Module" })), Ls = We(() => import("./markdown-viewer.js")), Rs = () => {
  const { id: t } = lt(), l = Se(), { t: s } = Z("system"), { data: i, loading: d } = v(
    () => t ? S.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: n, loading: h, mutate: p } = v(
    () => t ? S.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => r.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => p()
    }
  ), g = (i == null ? void 0 : i.data) ?? i, o = Te(() => n == null ? void 0 : n.map((c) => ({
    key: c.file_name,
    label: c.file_name,
    children: /* @__PURE__ */ e.jsx(Ke, { fallback: /* @__PURE__ */ e.jsx(qe, {}), children: /* @__PURE__ */ e.jsx(Ls, { content: ft(c.content) }) })
  })), [n]);
  if (!t) return null;
  const V = d || h;
  return /* @__PURE__ */ e.jsx(je, { spinning: V, children: /* @__PURE__ */ e.jsx(
    ae,
    {
      title: (g == null ? void 0 : g.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(T, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: o
    }
  ) });
}, ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rs
}, Symbol.toStringTag, { value: "Module" })), { Text: Ve, Title: Us } = Ct, Ns = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(Wt, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(Kt, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Ht, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(Qe, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(He, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(Bt, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(He, {}) }
};
function Je(t) {
  try {
    return { parsed: JSON.parse(t), isJSON: !0 };
  } catch {
    return { parsed: null, isJSON: !1 };
  }
}
const Ee = ({
  content: t,
  maxHeight: l = 400
}) => {
  const { parsed: s, isJSON: i } = Je(t);
  return i ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    et,
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: l,
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      src: s
    }
  ) }) : /* @__PURE__ */ e.jsx(
    "pre",
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: l,
        overflow: "auto",
        fontSize: 12,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      children: t
    }
  );
}, Ds = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Je(t);
  return i ? /* @__PURE__ */ e.jsxs(ue, { size: "small", column: 2, bordered: !0, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ue.Item,
      {
        label: l("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ue.Item,
      {
        label: l("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ue.Item,
      {
        label: l("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ue.Item,
      {
        label: l("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: s.active_tokens
      }
    )
  ] }) : /* @__PURE__ */ e.jsx(Ee, { content: t });
}, qs = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Je(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(Ve, { strong: !0, children: [
        l("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(re, { color: "blue", children: s.tool })
    ] }),
    s.arguments && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(Ve, { strong: !0, children: [
        l("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(Ee, { content: s.arguments, maxHeight: 200 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(Ee, { content: t });
}, $s = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Je(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(Ve, { strong: !0, children: [
        l("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(Ve, { code: !0, children: s.tool_call_id })
    ] }),
    s.result && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(Ve, { strong: !0, children: [
        l("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(Ee, { content: s.result, maxHeight: 300 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(Ee, { content: t });
}, Bs = ({ event: t, t: l }) => {
  switch (t.event_type) {
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Ds, { content: t.content, t: l });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(qs, { content: t.content, t: l });
    case "tool_result":
      return /* @__PURE__ */ e.jsx($s, { content: t.content, t: l });
    case "error":
      return /* @__PURE__ */ e.jsx(
        "pre",
        {
          style: {
            background: "var(--ant-color-error-bg)",
            border: "1px solid var(--ant-color-error-border)",
            borderRadius: 6,
            padding: 12,
            maxHeight: 300,
            overflow: "auto",
            fontSize: 12,
            color: "var(--ant-color-error)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            margin: 0
          },
          children: t.content
        }
      );
    default:
      return /* @__PURE__ */ e.jsx(Ee, { content: t.content });
  }
}, Hs = () => {
  const { t } = Z("ai"), l = Se(), [s, i] = y(""), [d, n] = y(""), {
    data: h,
    loading: p,
    refresh: g
  } = v(() => S.ai.getAiTraceStatus(), {
    onError: () => {
      r.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), o = (h == null ? void 0 : h.enabled) ?? !1, { loading: V, run: c } = v(
    (M) => S.ai.toggleAiTrace({ enabled: M }),
    {
      manual: !0,
      onSuccess: (M, [D]) => {
        r.success(
          D ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), g(), D || n("");
      },
      onError: () => {
        r.error(
          t("trace.toggleFailed", {
            defaultValue: "Failed to toggle AI debug tracing"
          })
        );
      }
    }
  ), {
    data: C,
    loading: F,
    run: A
  } = v(
    (M) => S.ai.getAiTraceEvents({ trace_id: M }),
    {
      manual: !0,
      onError: () => {
        r.error(
          t("trace.fetchFailed", {
            defaultValue: "Failed to fetch trace events"
          })
        );
      }
    }
  ), x = ke(() => {
    s.trim() && (n(s.trim()), A(s.trim()));
  }, [s, A]), O = ke(
    (M) => {
      const D = M ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      ne.confirm({
        title: M ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: D,
        onOk: () => c(M)
      });
    },
    [t, c]
  ), U = ke(async () => {
    if (d)
      try {
        const M = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!M.ok) throw new Error("download failed");
        const D = await M.blob(), W = window.URL.createObjectURL(D), H = document.createElement("a");
        H.href = W, H.download = `ai-trace-${d}.json`, document.body.appendChild(H), H.click(), window.URL.revokeObjectURL(W), document.body.removeChild(H);
      } catch {
        r.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, t]), E = Te(() => C ?? [], [C]), z = Te(
    () => E.map((M) => {
      const D = Ns[M.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(He, {})
      }, W = t(
        `trace.eventTypes.${M.event_type}`,
        { defaultValue: M.event_type }
      );
      return {
        key: M.id,
        dot: D.icon,
        color: D.color,
        children: /* @__PURE__ */ e.jsx(
          wt,
          {
            size: "small",
            defaultActiveKey: [M.id],
            items: [
              {
                key: M.id,
                label: /* @__PURE__ */ e.jsxs(K, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(re, { color: D.color, children: W }),
                  /* @__PURE__ */ e.jsxs(Ve, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    M.step_order
                  ] }),
                  M.duration_ms > 0 && /* @__PURE__ */ e.jsxs(Ve, { type: "secondary", style: { fontSize: 12 }, children: [
                    t("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    M.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(Ve, { type: "secondary", style: { fontSize: 12 }, children: new Date(M.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Bs, { event: M, t })
              }
            ]
          }
        )
      };
    }),
    [E, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ e.jsxs(K, { children: [
            /* @__PURE__ */ e.jsx(
              T,
              {
                icon: /* @__PURE__ */ e.jsx(mt, {}),
                onClick: () => l("/system/settings#ai-models"),
                children: t("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(Us, { level: 4, style: { margin: 0 }, children: t("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(K, { children: [
            /* @__PURE__ */ e.jsx(Ve, { children: o ? t("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : t("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              de,
              {
                checked: o,
                loading: p || V,
                onChange: O
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(K.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        j,
        {
          placeholder: t("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: s,
          onChange: (M) => i(M.target.value),
          onPressEnter: x,
          prefix: /* @__PURE__ */ e.jsx(qt, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(T, { type: "primary", onClick: x, loading: F, children: t("trace.search", { defaultValue: "Search" }) }),
      d && E.length > 0 && /* @__PURE__ */ e.jsx(T, { icon: /* @__PURE__ */ e.jsx($t, {}), onClick: U, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    F ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(je, { size: "large" }) }) }) : d && E.length === 0 ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Re,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : E.length > 0 ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(Ft, { items: z }) }) : null
  ] });
}, pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hs
}, Symbol.toStringTag, { value: "Module" })), Ks = () => {
  const { t } = Z("system"), [l] = Zt(), s = l.get("provider"), i = l.get("code"), d = l.get("state"), [n, h] = y(null), [p, g] = y(null), [o, V] = y(null);
  return v(async () => {
    if (!i || !d || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const c = await S.system.testOauthCallback({ code: i, state: d, provider: s });
    if (!c.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!c.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    h(c.user), g(c.user_info);
  }, {
    onSuccess: () => {
      V({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (c) => {
      V({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: c.message
      });
    }
  }), o ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    Tt,
    {
      status: o.status,
      title: o.message,
      subTitle: o.error,
      extra: /* @__PURE__ */ e.jsxs(K, { style: { display: !p || !n ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(ae, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(et, { src: p || {} }) }),
        /* @__PURE__ */ e.jsx(ae, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(et, { src: n || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(qe, {});
}, gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ks
}, Symbol.toStringTag, { value: "Module" }));
export {
  pl as A,
  ul as O,
  cl as S,
  ml as a,
  gl as b,
  dl as i
};
