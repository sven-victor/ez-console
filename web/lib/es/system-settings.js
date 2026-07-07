import { j as e } from "./vendor.js";
import { Form as i, message as r, Spin as xe, Switch as ue, Select as $, Input as V, Alert as tt, Divider as at, Space as Z, Button as z, InputNumber as me, Modal as oe, Skeleton as wt, Descriptions as ne, Steps as Ct, Tag as re, Table as Oe, Radio as Ue, Tabs as ct, Popconfirm as Tt, Tooltip as Ze, Card as ae, Row as qe, Col as Ve, Checkbox as Qe, Empty as De, AutoComplete as nt, Upload as Ft, Tree as It, Menu as At, Collapse as Et, Typography as mt, Timeline as zt, Result as Ot } from "antd";
import { useTranslation as X } from "react-i18next";
import { useState as y, useEffect as Pe, useMemo as Fe, Suspense as $e, lazy as Be, useCallback as fe } from "react";
import { useRequest as T } from "ahooks";
import { SaveOutlined as He, ReloadOutlined as ke, LoadingOutlined as Pt, CheckCircleTwoTone as Mt, ClearOutlined as Nt, StarFilled as Rt, CheckCircleOutlined as Lt, StarOutlined as Ut, EditOutlined as Me, CopyOutlined as gt, DeleteOutlined as Ie, BugOutlined as pt, PlusOutlined as Ne, ThunderboltOutlined as Dt, ToolOutlined as st, SettingOutlined as qt, FileTextOutlined as We, EyeOutlined as ft, UploadOutlined as ot, CalendarOutlined as $t, ArrowLeftOutlined as it, FolderOutlined as ht, FileOutlined as xt, FileAddOutlined as Bt, FolderAddOutlined as Ht, SearchOutlined as Jt, DownloadOutlined as Kt, WarningOutlined as Wt, DashboardOutlined as Gt, MessageOutlined as Zt, SendOutlined as Xt, CodeOutlined as Yt, AlignLeftOutlined as Qt, PlayCircleOutlined as es } from "@ant-design/icons";
import { a as k } from "./index.js";
import { g as rt, c as yt } from "./base.js";
import { f as ge, e as ts, b as Je, L as Re } from "./components.js";
import jt from "react-quill";
import { useNavigate as ye, useLocation as ss, useParams as Xe, useSearchParams as ls } from "react-router-dom";
import { u as bt, c as as } from "./contexts.js";
import { l as is, c as ns, u as os, d as rs, g as ds, b as us, e as cs, f as ms, r as gs } from "./system.js";
import { l as ps, b as fs } from "./authorization.js";
import { createStyles as hs } from "antd-style";
import Ge from "@uiw/react-json-view";
import xs from "@uiw/react-codemirror";
import { json as ys } from "@codemirror/lang-json";
const Ae = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, js = {
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
}, bs = ({ initialData: t, onRefresh: l }) => {
  const { t: s } = X("system"), { t: a } = X("common"), [d] = i.useForm(), [o, f] = y((t == null ? void 0 : t.provider) || "custom"), [g, u] = y((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [n, _] = y((t == null ? void 0 : t.enabled) || !1), [p, F] = y((t == null ? void 0 : t.auto_create_user) || !1), { loading: w, data: M, refresh: b } = T(k.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (C) => {
      d.setFieldsValue(C), f(C.provider), u(C.provider === "custom" || C.provider === "autoDiscover"), _(C.enabled), F(C.auto_create_user);
    },
    onError: (C) => {
      r.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", C);
    }
  });
  Pe(() => {
    t && (d.setFieldsValue(t), f(t.provider), u(t.provider === "custom" || t.provider === "autoDiscover"), _(t.enabled), F(t.auto_create_user));
  }, [t, d]);
  const N = (C) => {
    f(C), u(C === "custom" || C === "autoDiscover");
    const D = js[C];
    D && d.setFieldsValue({
      auth_endpoint: D.endpoints.auth_endpoint,
      token_endpoint: D.endpoints.token_endpoint,
      userinfo_endpoint: D.endpoints.userinfo_endpoint,
      scope: D.scope,
      // Set field mappings
      email_field: D.email_field,
      username_field: D.username_field,
      full_name_field: D.full_name_field,
      avatar_field: D.avatar_field,
      role_field: D.role_field,
      // Set display configuration
      icon_url: D.icon_url,
      display_name: D.display_name
    });
  }, j = (C) => {
    _(C);
  }, I = (C) => {
    F(C);
  }, { loading: E, run: O } = T(k.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : b();
    },
    onError: (C) => {
      r.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", C);
    }
  }), B = (C) => {
    O(C);
  }, Q = () => {
    l ? l() : b();
  }, { loading: K, run: ie } = T(async ({ redirect_uri: C, ...D }) => {
    let J;
    return C ? J = new URL(C) : J = new URL(window.location.origin), J.pathname = rt("/system/settings/oauth/test-callback"), J.searchParams.set("provider", o), k.system.testOauthConnection({ redirect_uri: J.toString(), ...D });
  }, {
    manual: !0,
    onSuccess: ({ url: C }) => {
      window.open(C, "_blank");
    },
    onError: (C) => {
      r.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: C.message })), console.error("Failed to test OAuth connection", C);
    }
  }), U = () => o === "custom";
  return /* @__PURE__ */ e.jsx(xe, { spinning: w, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: d,
      layout: "vertical",
      onFinish: B,
      initialValues: t || M,
      children: [
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(ue, { onChange: j })
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
                required: n,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs($, { onChange: N, disabled: !n, children: [
              /* @__PURE__ */ e.jsx($.Option, { value: "github", children: s("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "google", children: s("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "dingtalk", children: s("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "wechat", children: s("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "autoDiscover", children: s("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "custom", children: s("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
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
              V,
              {
                disabled: !n,
                placeholder: o !== "custom" ? s(`settings.oauth.provider.options.${o}`, { defaultValue: o }) : ""
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
                pattern: Ae,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n, placeholder: "https://example.com/icon.png" })
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
                required: n,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
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
                required: n,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !n, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        U() && /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && o === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: Ae,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "wellknown_endpoint",
            hidden: o !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: Ae,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: n && o === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
          }
        ),
        U() && /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && o === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: Ae,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
          }
        ),
        U() && /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && o === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: Ae,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
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
                required: n,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(C) => C.getFieldValue("redirect_uri") !== "" ? {
              pattern: Ae,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n, placeholder: `http://${window.location.host}${rt(`/login?provider=settings.${o}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(ue, { onChange: I, disabled: !n })
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
                required: n && p,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs($, { disabled: !n, children: [
              /* @__PURE__ */ e.jsx($.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "new_user_only", children: s("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "temporary", children: s("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          tt,
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
          i.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(ue, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(at, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          tt,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: g ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "email", disabled: !n || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "login", autoComplete: "off", disabled: !n || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "name", disabled: !n || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "avatar_url", disabled: !n || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "role", disabled: !n || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              type: "primary",
              htmlType: "submit",
              loading: E,
              icon: /* @__PURE__ */ e.jsx(He, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              loading: K,
              onClick: async () => {
                const C = d.getFieldsValue();
                ie(C);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              onClick: Q,
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Vs = () => {
  const { t } = X("system"), { t: l } = X("common"), [s] = i.useForm(), { loading: a, data: d, refresh: o } = T(k.system.getSecuritySettings, {
    onSuccess: (n) => {
      s.setFieldsValue(n);
    },
    onError: (n) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", n);
    }
  }), { loading: f, run: g } = T(k.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), o();
    },
    onError: (n) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", n);
    }
  }), u = (n) => {
    g(n);
  };
  return /* @__PURE__ */ e.jsx(xe, { spinning: a, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: s,
      layout: "vertical",
      onFinish: u,
      initialValues: d,
      children: [
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "password_complexity",
            label: t("settings.security.passwordComplexity.label", { defaultValue: "Password Complexity" }),
            tooltip: t("settings.security.passwordComplexity.tooltip", { defaultValue: "Define the complexity requirements for user passwords." }),
            children: /* @__PURE__ */ e.jsxs($, { children: [
              /* @__PURE__ */ e.jsx($.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
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
            children: /* @__PURE__ */ e.jsx(me, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "password_expiry_notify_days",
            label: t("settings.security.passwordExpiryNotify.label", { defaultValue: "Password Expiry Notification (Days Before Expiry)" }),
            tooltip: t("settings.security.passwordExpiryNotify.tooltip", { defaultValue: "Notify users by email this many days before password expiry. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, _) => n.login_failure_lock !== _.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              i.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(me, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, _) => n.login_failure_lock !== _.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              i.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(me, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, _) => n.history_password_check !== _.history_password_check,
            children: ({ getFieldValue: n }) => n("history_password_check") ? /* @__PURE__ */ e.jsx(
              i.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(me, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "user_inactive_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              type: "primary",
              htmlType: "submit",
              loading: f,
              icon: /* @__PURE__ */ e.jsx(He, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              onClick: () => o(),
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, ks = ({ fetchItems: t, importItems: l, columns: s, ...a }) => {
  const { t: d } = X("system"), [o, f] = y([]), [g, u] = y([]), { run: n, loading: _ } = T(t, {
    onError: (w) => {
      r.error(d("settings.ldap.importError", { error: `${w.message}` }));
    },
    onSuccess: (w) => {
      f(w);
    },
    manual: !0
  }), { run: p, loading: F } = T(async () => {
    for (const w of g.filter((M) => {
      const b = o.find((N) => N.ldap_dn === M);
      return !(!b || b.status === "imported");
    })) {
      const M = await l([w]);
      f((b) => [...b].map((j) => {
        for (const I of M)
          if (j.ldap_dn === I.ldap_dn)
            return { ...I, status: "imported" };
        return j;
      }));
    }
  }, {
    manual: !0
  });
  return Pe(() => {
    a.visible && (f([]), n(), u([]));
  }, [a.visible]), /* @__PURE__ */ e.jsx(
    oe,
    {
      title: d("settings.ldap.importTitle"),
      ...a,
      onOk: () => {
        p();
      },
      width: 900,
      confirmLoading: F,
      loading: _,
      children: /* @__PURE__ */ e.jsx(
        Oe,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (w) => {
              u(w);
            },
            getCheckboxProps: (w) => ({
              disabled: w.status === "imported"
            })
          },
          columns: s.map(({ render: w, ...M }) => w ? {
            ...M,
            render: (b, N, j) => {
              const I = g.includes(N.ldap_dn) && F && N.status !== "imported";
              return w(b, N, j, I);
            }
          } : M),
          dataSource: o,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Ss = () => {
  var N, j, I;
  const { t } = X("system"), [l] = i.useForm(), [s, a] = y(!1), [d, o] = y(null), [f, g] = y(!1), [u, n] = y(!1), [_] = i.useForm(), [p, F] = y(!1);
  T(k.system.getLdapSettings, {
    onSuccess: (E) => {
      l.setFieldsValue(E), F(E.enabled);
    },
    onError: (E) => {
      r.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${E.message}` }));
    }
  }), Pe(() => {
    o(null);
  }, [f]);
  const w = async (E) => {
    a(!0);
    try {
      await k.system.updateLdapSettings(E), r.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      r.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      a(!1);
    }
  }, { run: M, loading: b } = T(async (E) => {
    const O = await l.validateFields();
    return await k.system.testLdapConnection({
      ...E,
      ...O
    });
  }, {
    onSuccess: (E) => {
      o(E);
    },
    onError: (E) => {
      r.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${E.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      i,
      {
        form: l,
        layout: "vertical",
        onFinish: w,
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
              children: /* @__PURE__ */ e.jsx(ue, { onChange: (E) => F(E) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: p, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: p, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: p, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(V.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: p, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: p, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: p, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: p, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: p, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(V, { type: "number", defaultValue: 15, disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(at, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(ue, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(ue, { disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !p })
            }
          ),
          /* @__PURE__ */ e.jsxs(i.Item, { children: [
            /* @__PURE__ */ e.jsx(ge, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(z, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ge, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              z,
              {
                disabled: !p,
                style: { marginLeft: 8 },
                onClick: () => g(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ge, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              z,
              {
                disabled: !p,
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
      oe,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: f,
        onCancel: () => g(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            i,
            {
              form: _,
              layout: "vertical",
              onFinish: M,
              children: [
                /* @__PURE__ */ e.jsx(
                  i.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  i.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !p })
                  }
                ),
                /* @__PURE__ */ e.jsxs(i.Item, { children: [
                  /* @__PURE__ */ e.jsx(ge, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(z, { disabled: !p, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    z,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => g(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(xe, { spinning: b, children: /* @__PURE__ */ e.jsx(wt, { active: b, loading: b, children: d && (d.user ? /* @__PURE__ */ e.jsxs(ne, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(ne.Item, { label: "Username", span: 3, children: d.user.username }),
            /* @__PURE__ */ e.jsx(ne.Item, { label: "Email", span: 3, children: d.user.email }),
            /* @__PURE__ */ e.jsx(ne.Item, { label: "FullName", span: 3, children: d.user.full_name }),
            /* @__PURE__ */ e.jsx(ne.Item, { label: "CreatedAt", span: 3, children: d.user.created_at }),
            /* @__PURE__ */ e.jsx(ne.Item, { label: "UpdatedAt", span: 3, children: d.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Ct,
            {
              direction: "vertical",
              current: (N = d.message) == null ? void 0 : N.findIndex((E) => !E.success),
              status: (j = d.message) != null && j.find((E) => !E.success) ? "error" : "finish",
              items: (I = d.message) == null ? void 0 : I.map((E) => ({
                status: E.success ? "finish" : "error",
                title: E.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      ks,
      {
        visible: u,
        onCancel: () => n(!1),
        fetchItems: () => k.system.importLdapUsers({}),
        importItems: (E) => k.system.importLdapUsers({ user_dn: E }),
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
          render: (E, O, B, Q) => Q ? /* @__PURE__ */ e.jsx(xe, { indicator: /* @__PURE__ */ e.jsx(Pt, { spin: !0 }) }) : E ? /* @__PURE__ */ e.jsx(Mt, { twoToneColor: "#52c41a" }) : O.id ? /* @__PURE__ */ e.jsx(re, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(re, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, vs = () => {
  const { t } = X("system"), { t: l } = X("common"), [s] = i.useForm(), [a, d] = y(null), [o, f] = y(!1), [g] = i.useForm(), [u, n] = y(!1), { data: _ } = T(k.system.getSmtpSettingFields), { loading: p } = T(k.system.getSmtpSettings, {
    onSuccess: (j) => {
      s.setFieldsValue(j), n(j.enabled);
    },
    onError: (j) => {
      r.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${j.message}` }));
    }
  });
  Pe(() => {
    d(null);
  }, [o]);
  const { run: F, loading: w } = T(({ port: j, ...I }) => k.system.updateSmtpSettings({ ...I, port: Number(j) }), {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (j) => {
      r.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${j.message}` }));
    }
  }), { run: M, loading: b } = T(async (j) => {
    const { port: I, ...E } = await s.validateFields();
    return await k.system.testSmtpConnection({
      ...j,
      ...E,
      port: Number(I)
    });
  }, {
    onSuccess: (j) => {
      d(j);
    },
    onError: (j) => {
      r.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${j.message}` }));
    },
    manual: !0
  }), N = (j) => {
    switch (j.value_type) {
      case "number":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, disabled: !u, min: j.min, max: j.max, step: j.step });
      case "percentage":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, disabled: !u, min: 0, max: 100, step: j.step || 0.01, addonAfter: "%" });
      case "string_list":
        return /* @__PURE__ */ e.jsx($, { mode: "tags", tokenSeparators: [","], disabled: !u });
      case "enum":
        return /* @__PURE__ */ e.jsx($, { disabled: !u, options: j.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(jt, { theme: "snow", readOnly: !u });
      case "string":
      default:
        return /* @__PURE__ */ e.jsx(V, { disabled: !u });
    }
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(xe, { spinning: p, children: /* @__PURE__ */ e.jsxs(
      i,
      {
        form: s,
        layout: "vertical",
        onFinish: F,
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
              children: /* @__PURE__ */ e.jsx(ue, { onChange: (j) => n(j) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: u, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: u, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { type: "number", disabled: !u, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: u, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !u, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: u, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(Ue.Group, { disabled: !u, children: [
                /* @__PURE__ */ e.jsx(Ue.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(Ue.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(Ue.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: u, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.adminEmails", { defaultValue: "Admin Emails" }),
              name: "admin_emails",
              tooltip: t("settings.smtp.adminEmailsTooltip", { defaultValue: "Email addresses that receive admin notifications." }),
              children: /* @__PURE__ */ e.jsx(
                $,
                {
                  mode: "tags",
                  tokenSeparators: [","],
                  disabled: !u,
                  placeholder: t("settings.smtp.adminEmailsPlaceholder", { defaultValue: "Enter email addresses" })
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(at, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          (_ || []).map((j) => /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t(j.label_key || `settings.smtp.${j.key}`, { defaultValue: j.key }),
              name: j.key,
              tooltip: j.tooltip_key ? t(j.tooltip_key, { defaultValue: "" }) : void 0,
              children: N(j)
            },
            j.key
          )),
          /* @__PURE__ */ e.jsxs(i.Item, { children: [
            /* @__PURE__ */ e.jsx(ge, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(z, { type: "primary", htmlType: "submit", loading: w, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              z,
              {
                onClick: () => f(!0),
                disabled: !u || b,
                loading: b,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: o,
        onCancel: () => f(!1),
        footer: [
          /* @__PURE__ */ e.jsx(z, { onClick: () => f(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(z, { type: "primary", loading: b, onClick: () => g.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          i,
          {
            form: g,
            layout: "vertical",
            onFinish: (j) => M(j),
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
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: "test@example.com" })
                }
              ),
              a && /* @__PURE__ */ e.jsx(i.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: a.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: a.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, _s = () => {
  const { t, i18n: l } = X("system"), { t: s } = X("common"), [a] = i.useForm(), { loading: d, data: o, refresh: f } = T(k.system.getSystemBaseSettings, {
    onSuccess: (F) => {
      a.setFieldsValue(F);
    },
    onError: (F) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", F);
    }
  }), { loading: g, run: u } = T(k.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), f();
    },
    onError: (F) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", F);
    }
  }), { loading: n, run: _ } = T(k.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      r.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (F) => {
      r.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", F);
    }
  }), p = (F) => {
    u(F);
  };
  return /* @__PURE__ */ e.jsx(xe, { spinning: d, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: a,
      layout: "vertical",
      onFinish: p,
      initialValues: o,
      children: [
        /* @__PURE__ */ e.jsx(i.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(ct, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(i.Item, { name: "name", children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }, ...ts.map((F) => ({
          key: F.lang,
          label: l.language !== F.lang ? s(`language.${F.lang}`, { defaultValue: F.label, lang: F.label }) : F.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(i.Item, { name: ["name_i18n", F.lang], children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(i.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(V, {}) }),
        /* @__PURE__ */ e.jsx(i.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(V, {}) }),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            label: t("settings.base.enableSkillToolBinding", { defaultValue: "Link AI tools to skills" }),
            name: "enable_skill_tool_binding",
            tooltip: t("settings.base.enableSkillToolBindingTooltip", {
              defaultValue: "When enabled, AI chat narrows tools by skill bindings when skills are in scope (still within role AI tool permissions)."
            }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              type: "primary",
              htmlType: "submit",
              loading: g,
              icon: /* @__PURE__ */ e.jsx(He, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            z,
            {
              onClick: () => f(),
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(ge, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            Tt,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: s("ok", { defaultValue: "OK" }),
              cancelText: s("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => _(),
              children: /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(Nt, {}), loading: n, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, ws = Be(() => import("./json-schema-config-form.js").then((t) => ({
  default: t.JsonSchemaConfigFormItem
}))), { TextArea: Cs } = V, Ts = () => {
  var L;
  const { t } = X("ai"), { t: l } = X("common"), s = ye(), [a] = i.useForm(), [d, o] = y(!1), [f, g] = y(null), [u, n] = y(""), [_, p] = y(""), { loading: F, data: w } = T(
    () => k.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (c) => {
        r.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", c);
      }
    }
  ), M = Fe(() => w == null ? void 0 : w.find((c) => c.provider === _), [w, _]), { loading: b, data: N, refresh: j } = T(
    () => k.ai.listAiModels({ current: 1, page_size: 100, search: u }),
    {
      refreshDeps: [u],
      onError: (c) => {
        r.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", c);
      }
    }
  ), { loading: I, run: E } = T(
    ({ config: c, ...A }) => k.ai.createAiModel({ config: c ?? {}, ...A }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), o(!1), a.resetFields(), j();
      },
      onError: (c) => {
        r.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", c);
      }
    }
  ), { loading: O, run: B } = T(
    ({ id: c, data: A }) => k.ai.updateAiModel({ id: c }, A),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), o(!1), a.resetFields(), g(null), j();
      },
      onError: (c) => {
        r.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", c);
      }
    }
  ), { runAsync: Q } = T(
    (c) => k.ai.deleteAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), j();
      },
      onError: (c) => {
        r.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", c);
      }
    }
  ), { runAsync: K } = T(
    (c) => k.ai.testAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (c) => {
        r.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", c);
      }
    }
  ), { runAsync: ie } = T(
    (c) => k.ai.setDefaultAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), j();
      },
      onError: (c) => {
        r.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", c);
      }
    }
  ), U = () => {
    g(null), p(""), a.resetFields(), o(!0);
  }, C = (c) => {
    g(c), p(c.provider);
    const A = c.config || {}, Y = {
      name: c.name,
      description: c.description,
      provider: c.provider,
      is_default: c.is_default,
      config: A,
      // Spread config fields to form
      status: c.status,
      max_chat_tokens: c.max_chat_tokens ?? 0,
      max_chat_iterations: c.max_chat_iterations ?? 0
    };
    a.setFieldsValue(Y), o(!0);
  }, D = async (c) => {
    g(null), p(c.provider), a.resetFields();
    try {
      const A = await k.ai.getAiModel({ id: c.id }), Y = { ...A.config || {} };
      "api_key" in Y && (Y.api_key = ""), a.setFieldsValue({
        name: `${A.name} (copy)`,
        description: A.description,
        provider: A.provider,
        config: Y,
        is_default: !1,
        status: "enabled",
        max_chat_tokens: A.max_chat_tokens ?? 0,
        max_chat_iterations: A.max_chat_iterations ?? 0
      }), o(!0);
    } catch {
      r.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, J = (c) => {
    p(c), a.setFieldValue("config", void 0);
  }, h = (c) => {
    let A = c.config ?? {};
    const Y = {
      name: c.name,
      description: c.description,
      provider: c.provider,
      config: A,
      is_default: c.is_default,
      status: c.status,
      max_chat_tokens: c.max_chat_tokens ?? 0,
      max_chat_iterations: c.max_chat_iterations ?? 0
    };
    f ? B({ id: f.id, data: Y }) : E(Y);
  }, W = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (c, A) => /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx("span", { children: c }),
        A.is_default && /* @__PURE__ */ e.jsx(Ze, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Rt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (c) => /* @__PURE__ */ e.jsx(re, { color: "blue", children: c.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (c) => /* @__PURE__ */ e.jsx(re, { color: c === "enabled" ? "green" : "red", children: c === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (c, A) => /* @__PURE__ */ e.jsx(Je, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Lt, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => K(A.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Ut, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => ie(A.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Me, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => C(A)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(gt, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => D(A)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => Q(A.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(qe, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsx(
        V.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (c) => n(c),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(ge, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          z,
          {
            icon: /* @__PURE__ */ e.jsx(pt, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          z,
          {
            icon: /* @__PURE__ */ e.jsx(ke, {}),
            onClick: j,
            loading: b,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ge, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          z,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ne, {}),
            onClick: U,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Oe,
      {
        columns: W,
        dataSource: (N == null ? void 0 : N.data) || [],
        loading: b,
        rowKey: "id",
        pagination: {
          total: (N == null ? void 0 : N.total) || 0,
          current: (N == null ? void 0 : N.current) || 1,
          pageSize: (N == null ? void 0 : N.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (c, A) => l("pagination.total", {
            defaultValue: `${A[0]}-${A[1]} of ${c} items`,
            start: A[0],
            end: A[1],
            total: c
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: f ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: d,
        onCancel: () => {
          o(!1), a.resetFields(), g(null);
        },
        footer: null,
        width: ((L = M == null ? void 0 : M.ui_schema) == null ? void 0 : L["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          i,
          {
            form: a,
            layout: "vertical",
            onFinish: h,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  i.Item,
                  {
                    name: "name",
                    label: t("models.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                    children: /* @__PURE__ */ e.jsx(V, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  i.Item,
                  {
                    name: "description",
                    label: t("models.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      Cs,
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
                      $,
                      {
                        loading: F,
                        placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                        onChange: J,
                        value: _,
                        options: w == null ? void 0 : w.map((c) => ({
                          label: c.name,
                          value: c.provider
                        }))
                      }
                    )
                  }
                ),
                M && /* @__PURE__ */ e.jsx(i.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx($e, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(
                  ws,
                  {
                    name: "config",
                    schema: M.config_schema,
                    uiSchema: M.ui_schema
                  }
                ) }) }),
                /* @__PURE__ */ e.jsxs(qe, { gutter: 16, children: [
                  /* @__PURE__ */ e.jsx(Ve, { span: 12, children: /* @__PURE__ */ e.jsx(
                    i.Item,
                    {
                      name: "max_chat_tokens",
                      label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: t("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) }),
                  /* @__PURE__ */ e.jsx(Ve, { span: 12, children: /* @__PURE__ */ e.jsx(
                    i.Item,
                    {
                      name: "max_chat_iterations",
                      label: t("models.maxChatIterations", { defaultValue: "Max chat iterations (tool rounds)" }),
                      tooltip: t("models.maxChatIterationsHelp", {
                        defaultValue: "0 uses default. Positive value caps tool-call iterations for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ e.jsxs(
                  i.Item,
                  {
                    name: "is_default",
                    valuePropName: "checked",
                    children: [
                      /* @__PURE__ */ e.jsx(ue, {}),
                      " ",
                      /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                    ]
                  }
                ),
                /* @__PURE__ */ e.jsx(i.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: I || O,
                    children: f ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    onClick: () => {
                      o(!1), a.resetFields(), g(null), p("");
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
}, Fs = Be(() => import("./json-schema-config-form.js").then((t) => ({
  default: t.JsonSchemaConfigFormItem
}))), { TextArea: Is } = V, As = () => {
  var ve;
  const { t } = X("system"), { t: l } = X("common"), s = ye(), [a] = i.useForm(), [d, o] = y(!1), [f, g] = y(null), [u, n] = y(""), [_, p] = y(!1), [F, w] = y(null), [M, b] = y(""), [N, j] = y(!1), [I, E] = y([]), [O, B] = y(), [Q, K] = y(null), { loading: ie, data: U, refresh: C } = T(
    () => k.system.listToolSets({ current: 1, page_size: 100, search: u, type: O }),
    {
      refreshDeps: [u, O],
      onError: (x) => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", x);
      }
    }
  ), { loading: D, data: J } = T(
    () => k.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (x) => {
        r.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", x);
      }
    }
  ), h = Fe(() => J == null ? void 0 : J.find((x) => x.tool_set_type === M), [J, M]), { loading: W, run: L } = T(
    (x) => k.system.createToolSet({
      ...x,
      type: x.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), o(!1), a.resetFields(), C();
      },
      onError: (x) => {
        r.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", x);
      }
    }
  ), { loading: c, run: A } = T(
    ({ id: x, data: q }) => k.system.updateToolSet({ id: x }, {
      ...q,
      type: q.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), o(!1), a.resetFields(), g(null), C();
      },
      onError: (x) => {
        r.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", x);
      }
    }
  ), { run: Y } = T(
    (x) => k.system.deleteToolSet({ id: x }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), C();
      },
      onError: (x) => {
        r.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", x);
      }
    }
  ), { runAsync: G } = T(
    (x) => k.system.testToolSet({ id: x }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (x) => {
        r.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", x);
      }
    }
  ), { loading: ce, runAsync: Se } = T(
    (x) => k.system.getToolSetTools({ id: x }),
    {
      manual: !0,
      onSuccess: (x) => {
        E(x || []), j(!0);
      },
      onError: (x) => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", x);
      }
    }
  ), je = fe(
    async (x, q) => {
      K(x.id);
      try {
        await k.system.updateToolSetStatus(
          { id: x.id },
          { status: q ? "enabled" : "disabled" }
        ), r.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), C();
      } catch (v) {
        r.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", v);
      } finally {
        K(null);
      }
    },
    [t, C]
  ), Te = () => {
    g(null), a.resetFields(), b(""), o(!0);
  }, we = (x) => {
    g(x), b(x.type);
    const q = { ...x };
    a.setFieldsValue(q), o(!0);
  }, Ce = (x) => {
    b(x), a.setFieldValue("config", {});
  }, be = (x) => {
    f ? A({ id: f.id, data: x }) : L(x);
  }, S = (x) => {
    Y(x);
  }, te = (x) => {
    w(x), p(!0);
  }, he = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (x, q) => /* @__PURE__ */ e.jsxs(Z, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: x }),
        q.is_preset ? /* @__PURE__ */ e.jsx(re, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (x) => /* @__PURE__ */ e.jsx(re, { color: "blue", children: x.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      key: "status",
      width: 120,
      render: (x, q) => {
        const v = q.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          ge,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(re, { color: v ? "green" : "red", children: v ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Ze,
              {
                title: v ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  ue,
                  {
                    size: "small",
                    checked: v,
                    loading: Q === q.id,
                    onChange: (P) => void je(q, P)
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
      width: 200,
      render: (x, q) => /* @__PURE__ */ e.jsx(Je, { actions: [
        {
          key: "debug",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.debug", { defaultValue: "Debug Tool" }),
          icon: /* @__PURE__ */ e.jsx(pt, {}),
          disabled: q.status !== "enabled",
          onClick: async () => s(`/system/settings/toolsets/${q.id}/debug`)
        },
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(Dt, {}),
          disabled: q.status !== "enabled",
          onClick: async () => G(q.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(st, {}),
          permission: "system:toolsets:view",
          disabled: q.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => Se(q.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(qt, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => te(q.config),
          disabled: !q.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: q.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Me, {}),
          onClick: async () => we(q),
          disabled: !!q.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          permission: "system:toolsets:delete",
          tooltip: q.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : l("delete", { defaultValue: "Delete" }),
          onClick: async () => S(q.id),
          danger: !0,
          disabled: !!q.is_preset,
          confirm: q.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => S(q.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(qe, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(
          V.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (x) => n(x),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          $,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: O,
            onChange: (x) => B(x),
            options: J == null ? void 0 : J.map((x) => ({
              label: x.name,
              value: x.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx($.Option, { value: "", children: "All" }),
              J == null ? void 0 : J.map((x) => /* @__PURE__ */ e.jsx($.Option, { value: x.tool_set_type, children: x.name }, x.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(
          z,
          {
            icon: /* @__PURE__ */ e.jsx(ke, {}),
            onClick: C,
            loading: ie,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ge, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          z,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ne, {}),
            onClick: Te,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Oe,
      {
        columns: he,
        dataSource: (U == null ? void 0 : U.data) || [],
        loading: ie,
        rowKey: "id",
        pagination: {
          total: (U == null ? void 0 : U.total) || 0,
          current: (U == null ? void 0 : U.current) || 1,
          pageSize: (U == null ? void 0 : U.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (x, q) => l("pagination.total", {
            defaultValue: `${q[0]}-${q[1]} of ${x} items`,
            start: q[0],
            end: q[1],
            total: x
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: f ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: d,
        onCancel: () => {
          o(!1), a.resetFields(), g(null), b("");
        },
        footer: null,
        width: ((ve = h == null ? void 0 : h.ui_schema) == null ? void 0 : ve["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          i,
          {
            form: a,
            layout: "vertical",
            onFinish: be,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  i.Item,
                  {
                    name: "name",
                    label: t("settings.toolsets.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                    children: /* @__PURE__ */ e.jsx(V, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  i.Item,
                  {
                    name: "description",
                    label: t("settings.toolsets.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      Is,
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
                      $,
                      {
                        loading: D,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: Ce,
                        value: M,
                        options: J == null ? void 0 : J.map((x) => ({
                          label: x.name,
                          value: x.tool_set_type
                        }))
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx($e, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(
                  Fs,
                  {
                    name: "config",
                    schema: h == null ? void 0 : h.config_schema,
                    uiSchema: h == null ? void 0 : h.ui_schema
                  }
                ) }),
                /* @__PURE__ */ e.jsx(i.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: W || c,
                    children: f ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  z,
                  {
                    onClick: () => {
                      o(!1), a.resetFields(), g(null), b("");
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
      oe,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: _,
        onCancel: () => p(!1),
        footer: [
          /* @__PURE__ */ e.jsx(z, { onClick: () => p(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(F, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: N,
        onCancel: () => j(!1),
        footer: [
          /* @__PURE__ */ e.jsx(z, { onClick: () => j(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: ce ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ke, { style: { fontSize: 24 }, spin: !0 }) }) : I.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : I.map((x, q) => {
          var v, P, se;
          return /* @__PURE__ */ e.jsx(
            ae,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(st, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((v = x.function) == null ? void 0 : v.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(qe, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(Ve, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((P = x.function) == null ? void 0 : P.description) || "-" })
                ] }),
                ((se = x.function) == null ? void 0 : se.parameters) && /* @__PURE__ */ e.jsxs(Ve, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(x.function.parameters, null, 2) })
                ] })
              ] })
            },
            q
          );
        }) })
      }
    )
  ] });
}, { TextArea: dt } = V;
function Es(t, l) {
  const s = {}, a = [], d = new Map(l.map((o) => [o.id, o]));
  for (const o of t) {
    if (o.toolset_id === "*") {
      a.push({ toolset_id: o.toolset_id, tool_name: o.tool_name });
      continue;
    }
    const f = d.get(o.toolset_id);
    if (!f) {
      a.push({ toolset_id: o.toolset_id, tool_name: o.tool_name });
      continue;
    }
    const g = (f.tools || []).map((u) => u.name);
    if (o.tool_name === "*") {
      s[o.toolset_id] = [...g];
      continue;
    }
    g.includes(o.tool_name) ? (s[o.toolset_id] || (s[o.toolset_id] = []), s[o.toolset_id].includes(o.tool_name) || s[o.toolset_id].push(o.tool_name)) : a.push({ toolset_id: o.toolset_id, tool_name: o.tool_name });
  }
  return { selections: s, extraPatterns: a };
}
function zs(t, l) {
  const s = [], a = /* @__PURE__ */ new Set();
  for (const [d, o] of Object.entries(t))
    for (const f of o) {
      const g = `${d}|${f}`;
      a.has(g) || (a.add(g), s.push({ toolset_id: d, tool_name: f }));
    }
  for (const d of l) {
    const o = d.toolset_id.trim(), f = d.tool_name.trim();
    if (!o || !f)
      continue;
    const g = `${o}|${f}`;
    a.has(g) || (a.add(g), s.push({ toolset_id: o, tool_name: f }));
  }
  return s;
}
function Vt(t, l) {
  const s = l.trim();
  return !s || t.some((a) => a.value === s) ? t : [...t, { value: s, label: s }];
}
function Os(t, l, s, a) {
  const o = [{ value: "*", label: a }], f = /* @__PURE__ */ new Set(["*"]), g = (u, n) => {
    f.has(u) || (f.add(u), o.push({
      value: u,
      label: n ? `${u} — ${n}` : u
    }));
  };
  if (l && l !== "*") {
    const u = t.find((n) => n.id === l);
    for (const n of (u == null ? void 0 : u.tools) || [])
      g(n.name, n.description);
  } else
    for (const u of t)
      for (const n of u.tools || [])
        g(n.name, n.description);
  return Vt(o, s);
}
const Ps = () => {
  const { t } = X("system"), { t: l } = X("common"), s = ye(), { enableSkillToolBinding: a } = bt(), [d] = i.useForm(), [o, f] = y(""), [g, u] = y(), [n, _] = y("user"), [p, F] = y(!1), [w, M] = y(null), [b, N] = y(null), [j, I] = y(!1), [E] = i.useForm(), [O, B] = y(!1), [Q, K] = y(null), [ie, U] = y([]), [C, D] = y({}), [J, h] = y([]), [W, L] = y(!1), c = Fe(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...ie.map((m) => ({
      value: m.id,
      label: `${m.name} (${m.id})`
    }))
  ], [ie, t]), A = fe(() => {
    U([]), D({}), h([]);
  }, []), { loading: Y, data: G, refresh: ce } = T(
    () => k.system.listSkills({
      current: 1,
      page_size: 100,
      search: o || void 0,
      domain: g,
      is_preset: n === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [o, g, n],
      onError: () => {
        r.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: Se = [] } = T(() => k.system.listSkillDomains()), je = (G == null ? void 0 : G.data) ?? [], Te = (G == null ? void 0 : G.total) ?? 0, { run: we } = T(
    (m) => k.system.deleteSkill({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), ce();
      },
      onError: () => {
        r.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Ce = fe(
    async (m, R) => {
      K(m.id);
      try {
        await k.system.updateSkillStatus({ id: m.id }, { status: R ? "enabled" : "disabled" }), r.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), ce();
      } catch {
        r.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        K(null);
      }
    },
    [t, ce]
  ), { loading: be, run: S } = T(
    (m) => k.system.uploadSkill(m.body, m.file),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), I(!1), E.resetFields(), ce();
      },
      onError: () => {
        r.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), te = fe(
    async (m) => {
      L(!0);
      try {
        const [R, H] = await Promise.all([
          k.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          k.system.listSkillAiToolBindings(
            { id: m, current: 1, page_size: 1e3 }
          )
        ]), de = (R.data || []).filter((_t) => _t.status === "enabled");
        U(de);
        const ee = H.data || [], { selections: le, extraPatterns: Le } = Es(ee, de);
        D(le), h(Le);
      } catch {
        r.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), A();
      } finally {
        L(!1);
      }
    },
    [A, t]
  );
  Pe(() => {
    !p || !w || !a || te(w.id);
  }, [p, w == null ? void 0 : w.id, a, te]);
  const he = (m, R) => {
    D((H) => ({ ...H, [m]: R }));
  }, ve = (m, R, H) => {
    D((de) => ({
      ...de,
      [m]: H ? [...R] : []
    }));
  }, x = () => {
    M(null), N(null), d.resetFields(), A(), F(!0);
  }, q = (m) => {
    M(m), N(null), d.setFieldsValue({
      name: m.name,
      description: m.description,
      category: m.category,
      domain: m.domain
    }), A(), F(!0);
  }, v = (m) => {
    M(null), N(m), d.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: m.name, defaultValue: "{{name}} (copy)" }),
      description: m.description,
      category: m.category,
      domain: m.domain
    }), A(), F(!0);
  }, P = () => {
    d.validateFields().then(async (m) => {
      B(!0);
      try {
        if (w) {
          const R = {
            name: m.name,
            description: m.description ?? "",
            category: m.category ?? "",
            domain: m.domain ?? ""
          };
          if (await k.system.updateSkill({ id: w.id }, R), a) {
            const H = zs(C, J);
            await k.system.replaceSkillAiToolBindings(
              { id: w.id },
              { bindings: H }
            );
          }
          r.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (b) {
          const R = {
            source_id: b.id,
            name: m.name,
            description: m.description ?? "",
            category: m.category ?? "",
            domain: m.domain ?? ""
          }, { id: H } = await k.system.cloneSkill(R);
          r.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), F(!1), N(null), d.resetFields(), A(), ce(), H && s(`/system/settings/skills/${H}/edit`);
          return;
        } else {
          const R = {
            name: m.name,
            description: m.description ?? "",
            category: m.category ?? "",
            domain: m.domain ?? "",
            content: m.content ?? ""
          };
          await k.system.createSkill(R), r.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        F(!1), M(null), N(null), d.resetFields(), A(), ce();
      } catch {
        r.error(
          w ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : b ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        B(!1);
      }
    });
  }, se = () => {
    var ee, le;
    const m = (ee = E.getFieldValue("file")) == null ? void 0 : ee.fileList, R = ((le = m == null ? void 0 : m[0]) == null ? void 0 : le.originFileObj) ?? (m == null ? void 0 : m[0]);
    if (!R) {
      r.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const H = E.getFieldValue("category"), de = E.getFieldValue("domain");
    S({ body: { category: H, domain: de }, file: R });
  }, pe = a && w, Ke = pe ? 720 : 560, St = !w && !b, vt = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (m, R) => /* @__PURE__ */ e.jsxs(Z, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: m }),
        R.is_preset ? /* @__PURE__ */ e.jsx(re, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (m) => m ? /* @__PURE__ */ e.jsx(re, { children: m }) : "-", width: 180 },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (m) => m ? /* @__PURE__ */ e.jsx(re, { color: "blue", children: m }) : "-", width: 180 },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (m, R) => {
        const H = R.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          ge,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(re, { color: H ? "green" : "red", children: H ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Ze,
              {
                title: H ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  ue,
                  {
                    size: "small",
                    checked: H,
                    loading: Q === R.id,
                    onChange: (de) => void Ce(R, de)
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
      render: (m, R) => /* @__PURE__ */ e.jsx(
        Je,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(We, {}),
              tooltip: R.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${R.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!R.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(ft, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${R.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Me, {}),
              tooltip: R.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => q(R),
              permission: "system:skills:update",
              disabled: !!R.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(gt, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => v(R),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              tooltip: R.is_preset ? t("settings.skills.presetDisabledDelete", {
                defaultValue: "Built-in skills cannot be deleted."
              }) : t("settings.skills.actionDelete", { defaultValue: "Delete" }),
              danger: !0,
              disabled: !!R.is_preset,
              confirm: R.is_preset ? void 0 : {
                title: t("settings.skills.deleteSkillConfirm", { defaultValue: "Delete this skill?" }),
                description: t("settings.skills.deleteSkillConfirmDescription", {
                  defaultValue: "The skill and all its files will be removed. This cannot be undone."
                }),
                okText: l("confirm", { defaultValue: "Confirm" }),
                cancelText: l("cancel", { defaultValue: "Cancel" }),
                onConfirm: async () => we(R.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(qe, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(
          V.Search,
          {
            placeholder: l("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: f,
            style: { width: 300 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          $,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: g,
            onChange: u,
            options: Se.map((m) => ({ value: m, label: m }))
          }
        ),
        /* @__PURE__ */ e.jsx(
          Ue.Group,
          {
            optionType: "button",
            value: n,
            onChange: (m) => _(m.target.value),
            options: [
              { value: "user", label: t("settings.skills.scopeUser", { defaultValue: "User skills" }) },
              { value: "all", label: t("settings.skills.scopeAll", { defaultValue: "All skills" }) }
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: () => ce(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ge, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(z, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ne, {}), onClick: x, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(ge, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(ot, {}), onClick: () => I(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsx(
        Oe,
        {
          rowKey: "id",
          loading: Y,
          columns: vt,
          dataSource: je,
          pagination: { total: Te, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        oe,
        {
          title: w ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : b ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: p,
          onOk: P,
          onCancel: () => {
            F(!1), M(null), N(null), A();
          },
          confirmLoading: O,
          width: Ke,
          children: /* @__PURE__ */ e.jsxs(i, { form: d, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(i.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(i.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(dt, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(i.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(i.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Se.map((m) => ({ value: m, label: m })) }) }),
            St && /* @__PURE__ */ e.jsx(i.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(dt, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            pe && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(xe, { spinning: W, children: ie.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(Z, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: ie.map((m) => {
                const R = (m.tools || []).map((le) => le.name), H = C[m.id] || [], de = R.length > 0 && H.length === R.length, ee = H.length > 0 && H.length < R.length;
                return /* @__PURE__ */ e.jsx(
                  ae,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        Qe,
                        {
                          checked: de,
                          indeterminate: ee,
                          onChange: (le) => ve(m.id, R, le.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: m.name })
                    ] }),
                    extra: m.description ? /* @__PURE__ */ e.jsx("span", { children: m.description }) : void 0,
                    children: (m.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(Qe.Group, { style: { width: "100%" }, value: H, onChange: (le) => he(m.id, le), children: /* @__PURE__ */ e.jsx(Z, { direction: "vertical", style: { width: "100%" }, children: (m.tools || []).map((le) => /* @__PURE__ */ e.jsx(Qe, { value: le.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: le.name }),
                      le.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: le.description })
                    ] }) }, le.name)) }) }) : /* @__PURE__ */ e.jsx(
                      De,
                      {
                        image: De.PRESENTED_IMAGE_SIMPLE,
                        description: t("settings.skills.aiToolsetNoTools", { defaultValue: "No tools available in this toolset." })
                      }
                    )
                  },
                  m.id
                );
              }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                  defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                }) }),
                /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, children: [
                  J.map((m, R) => /* @__PURE__ */ e.jsxs(
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
                          nt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: m.toolset_id,
                            options: Vt(c, m.toolset_id),
                            filterOption: (H, de) => {
                              const ee = de;
                              return `${(ee == null ? void 0 : ee.value) ?? ""} ${(ee == null ? void 0 : ee.label) ?? ""}`.toLowerCase().includes(H.toLowerCase());
                            },
                            onChange: (H) => {
                              const de = typeof H == "string" ? H : "";
                              h(
                                (ee) => ee.map((le, Le) => Le === R ? { ...le, toolset_id: de } : le)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          nt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: m.tool_name,
                            options: Os(
                              ie,
                              m.toolset_id,
                              m.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (H, de) => {
                              const ee = de;
                              return `${(ee == null ? void 0 : ee.value) ?? ""} ${(ee == null ? void 0 : ee.label) ?? ""}`.toLowerCase().includes(H.toLowerCase());
                            },
                            onChange: (H) => {
                              const de = typeof H == "string" ? H : "";
                              h(
                                (ee) => ee.map((le, Le) => Le === R ? { ...le, tool_name: de } : le)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          z,
                          {
                            type: "default",
                            danger: !0,
                            style: { flexShrink: 0 },
                            onClick: () => h((H) => H.filter((de, ee) => ee !== R)),
                            children: l("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    R
                  )),
                  /* @__PURE__ */ e.jsx(z, { type: "dashed", onClick: () => h((m) => [...m, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                ] })
              ] })
            ] }) : /* @__PURE__ */ e.jsx(
              De,
              {
                image: De.PRESENTED_IMAGE_SIMPLE,
                description: t("settings.skills.aiToolsetsEmpty", { defaultValue: "No AI toolsets available for this organization." })
              }
            ) }) })
          ] })
        }
      ),
      /* @__PURE__ */ e.jsx(
        oe,
        {
          title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
          open: j,
          onOk: se,
          onCancel: () => I(!1),
          confirmLoading: be,
          children: /* @__PURE__ */ e.jsxs(i, { form: E, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(i.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(Ft, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(ot, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(i.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(i.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Se.map((m) => ({ value: m, label: m })) }) })
          ] })
        }
      )
    ] })
  ] });
}, Ms = () => {
  const t = ye(), { t: l } = X("system"), { t: s } = X("task"), { t: a } = X("common"), [d] = i.useForm(), { data: o } = T(k.system.listLogStorageBackends), { data: f } = T(k.system.getTaskSettingFields), g = (o ?? []).map((b) => ({
    value: b.id,
    label: l(`settings.task.logStorage.${b.id}`, { defaultValue: b.name })
  })), { loading: u, refresh: n } = T(k.system.getTaskSettings, {
    onSuccess: (b) => {
      b && d.setFieldsValue(b);
    },
    onError: () => {
      r.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: _, run: p } = T(k.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n();
    },
    onError: () => {
      r.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), F = (b) => {
    p(b);
  }, w = (b) => {
    switch (b.value_type) {
      case "int":
      case "number":
        return /* @__PURE__ */ e.jsx(
          me,
          {
            style: { width: "100%" },
            addonAfter: b.key.includes("retention_days") ? l("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "percentage":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, min: 0, max: 100, step: 0.01, addonAfter: "%" });
      case "bool":
        return /* @__PURE__ */ e.jsx(ue, {});
      case "string_list":
        return /* @__PURE__ */ e.jsx($, { mode: "tags", tokenSeparators: [","] });
      case "enum":
        return /* @__PURE__ */ e.jsx($, { options: b.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(jt, { theme: "snow" });
      default:
        return /* @__PURE__ */ e.jsx(V, {});
    }
  }, M = (b) => b.value_type === "int" || b.value_type === "number" || b.value_type === "percentage" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(xe, { spinning: u, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: d,
      layout: "vertical",
      onFinish: F,
      children: [
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "log_storage_backend",
            label: l("settings.task.logStorageBackend", { defaultValue: "Log storage" }),
            tooltip: l("settings.task.logStorageBackendTooltip", {
              defaultValue: "Where task execution logs are stored. Database stores logs in the application database."
            }),
            children: /* @__PURE__ */ e.jsx(
              $,
              {
                options: g,
                placeholder: l("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: o === void 0
              }
            )
          }
        ),
        (f ?? []).map((b) => /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: b.key,
            label: l(`settings.task.fields.${b.key}`, { defaultValue: b.key }),
            rules: M(b),
            valuePropName: b.value_type === "bool" ? "checked" : "value",
            children: w(b)
          },
          b.key
        )),
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(z, { type: "primary", htmlType: "submit", loading: _, icon: /* @__PURE__ */ e.jsx(He, {}), children: a("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(z, { onClick: () => n(), icon: /* @__PURE__ */ e.jsx(ke, {}), children: a("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(ge, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx($t, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: Ns } = V, Rs = /^[-_a-zA-Z0-9.]+$/, Ls = () => {
  const t = ye(), { t: l, i18n: s } = X("system"), { t: a } = X("common"), d = (h) => {
    if (!h) return "-";
    const W = new Date(h);
    return Number.isNaN(W.getTime()) ? "-" : W.toLocaleString(s.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [o] = i.useForm(), [f, g] = y(!1), [u, n] = y(null), [_, p] = y(""), [F, w] = y(1), [M, b] = y(10), { loading: N, data: j, refresh: I } = T(
    () => is({ current: F, page_size: M, search: _ }),
    {
      refreshDeps: [F, M, _],
      onError: (h) => {
        r.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", h);
      }
    }
  ), { loading: E, run: O } = T(
    (h) => ns(h),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), g(!1), o.resetFields(), n(null), I();
      },
      onError: (h) => {
        r.error((h == null ? void 0 : h.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: B, run: Q } = T(
    ({ id: h, ...W }) => os({ id: h }, W),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), g(!1), o.resetFields(), n(null), I();
      },
      onError: (h) => {
        r.error((h == null ? void 0 : h.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: K } = T(
    (h) => rs({ id: h }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), I();
      },
      onError: (h) => {
        r.error((h == null ? void 0 : h.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), ie = () => {
    n(null), o.resetFields(), o.setFieldsValue({ status: "active" }), g(!0);
  }, U = (h) => {
    n(h), o.setFieldsValue({
      name: h.name,
      slug: h.slug,
      description: h.description,
      status: h.status
    }), g(!0);
  }, C = (h) => {
    oe.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${h.name}"? This action cannot be undone.`
      }),
      onOk: () => K(h.id)
    });
  }, D = () => {
    o.validateFields().then((h) => {
      u ? Q({ id: u.id, ...h }) : O(h);
    });
  }, J = [
    {
      title: l("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: l("settings.organizations.slug", { defaultValue: "Slug" }),
      dataIndex: "slug",
      key: "slug",
      render: (h) => h || "-"
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
      render: (h) => /* @__PURE__ */ e.jsx(re, { color: h === "active" ? "green" : "default", children: h === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (h) => d(h)
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (h, W) => /* @__PURE__ */ e.jsx(
        Je,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(ft, {}),
              onClick: async () => t(`/system/settings/organizations/${W.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Me, {}),
              onClick: async () => U(W),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              danger: !0,
              onClick: async () => C(W),
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
      extra: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: I, children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ge, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(z, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ne, {}), onClick: ie, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (h) => {
                p(h), w(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Oe,
            {
              columns: J,
              dataSource: (j == null ? void 0 : j.data) || [],
              loading: N,
              rowKey: "id",
              pagination: {
                current: F,
                pageSize: M,
                total: (j == null ? void 0 : j.total) || 0,
                showSizeChanger: !0,
                showTotal: (h, W) => a("pagination.total", {
                  defaultValue: `${W[0]}-${W[1]} of ${h} items`,
                  start: W[0],
                  end: W[1],
                  total: h
                }),
                onChange: (h, W) => {
                  w(h), b(W);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          oe,
          {
            title: u ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: f,
            onOk: D,
            onCancel: () => {
              g(!1), o.resetFields(), n(null);
            },
            confirmLoading: E || B,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(i, { form: o, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "name",
                  label: l("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: l("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(V, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "slug",
                  label: l("settings.organizations.slug", { defaultValue: "Slug" }),
                  tooltip: l("settings.organizations.slugTooltip", { defaultValue: "Optional unique identifier. Only letters, digits, hyphens, underscores, and dots are allowed." }),
                  rules: [{
                    pattern: Rs,
                    message: l("settings.organizations.slugInvalid", { defaultValue: "Slug may only contain letters, digits, hyphens, underscores, and dots" })
                  }],
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: "my-org" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "description",
                  label: l("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Ns, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                i.Item,
                {
                  name: "status",
                  label: l("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs($, { children: [
                    /* @__PURE__ */ e.jsx($.Option, { value: "active", children: l("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx($.Option, { value: "disabled", children: l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, Us = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = X("system"), s = ye(), a = ss(), f = a.hash.replace("#", "") || "base", { enableMultiOrg: g } = bt(), { hasPermission: u } = as(), n = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(_s, {}),
      hidden: !u("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(Vs, {}),
      hidden: !u("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(bs, {}),
      hidden: !u("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Ss, {}),
      hidden: !u("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(vs, {}),
      hidden: !u("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(Ts, {}),
      hidden: !u("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(As, {}),
      hidden: !u("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(Ps, {}),
      hidden: !u("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Ms, {}),
      hidden: !u("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...g ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Ls, {}),
      hidden: !u("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(ae, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    ct,
    {
      defaultActiveKey: f,
      onChange: (_) => {
        s(`${a.pathname}#${_}`);
      },
      items: t(n.filter((_) => !_.hidden), l)
    }
  ) });
}, vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Us
}, Symbol.toStringTag, { value: "Module" })), Ds = () => {
  var we, Ce, be;
  const t = ye(), { id: l } = Xe(), { t: s } = X("system"), { t: a } = X("common"), [d] = i.useForm(), [o] = i.useForm(), [f, g] = y(!1), [u, n] = y(!1), [_, p] = y(null), [F, w] = y(""), [M, b] = y(1), [N, j] = y(10), { data: I, loading: E, refresh: O } = T(
    () => ds({ id: l }),
    {
      ready: !!l,
      onError: (S) => {
        r.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", S);
      }
    }
  ), { data: B, loading: Q, refresh: K } = T(
    () => us({ id: l, current: M, page_size: N, search: F }),
    {
      ready: !!l,
      refreshDeps: [l, M, N, F],
      onError: (S) => {
        r.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", S);
      }
    }
  ), { data: ie, loading: U } = T(
    () => ps({ current: 1, page_size: 1e3 }),
    {
      ready: f
    }
  ), { data: C, loading: D } = T(
    () => fs({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: J, run: h } = T(
    (S) => cs({ id: l }, S),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), g(!1), d.resetFields(), K();
      },
      onError: (S) => {
        r.error((S == null ? void 0 : S.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: W, run: L } = T(
    (S) => ms({ id: l, user_id: _ == null ? void 0 : _.id }, S),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), n(!1), o.resetFields(), p(null), K();
      },
      onError: (S) => {
        r.error((S == null ? void 0 : S.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: c } = T(
    (S) => gs({ id: l, user_id: S }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), K();
      },
      onError: (S) => {
        r.error((S == null ? void 0 : S.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), A = () => {
    g(!0), d.resetFields();
  }, Y = (S) => {
    var te;
    p(S), o.setFieldsValue({
      role_ids: ((te = S.organization_roles) == null ? void 0 : te.map((he) => he.id)) || []
    }), n(!0);
  }, G = (S) => {
    oe.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${S.full_name || S.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => c(S.id)
    });
  }, ce = () => {
    d.validateFields().then((S) => {
      h(S);
    });
  }, Se = () => {
    o.validateFields().then((S) => {
      L(S);
    });
  }, je = ((we = ie == null ? void 0 : ie.data) == null ? void 0 : we.filter((S) => {
    var te;
    return !((te = B == null ? void 0 : B.data) != null && te.some((he) => he.id === S.id));
  })) || [], Te = [
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
      render: (S) => /* @__PURE__ */ e.jsx(re, { color: S === "active" ? "green" : "default", children: S === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : S })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (S, te) => {
        var he;
        return /* @__PURE__ */ e.jsx(Z, { wrap: !0, children: ((he = te.organization_roles) == null ? void 0 : he.map((ve) => /* @__PURE__ */ e.jsx(re, { children: ve.name }, ve.id))) || /* @__PURE__ */ e.jsx(re, { children: "No roles" }) });
      }
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (S, te) => /* @__PURE__ */ e.jsx(
        Je,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Me, {}),
              onClick: async () => Y(te)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              danger: !0,
              onClick: async () => G(te)
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
        title: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            z,
            {
              icon: /* @__PURE__ */ e.jsx(it, {}),
              onClick: () => t("/system/settings#organizations"),
              children: a("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            I == null ? void 0 : I.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: () => {
          O(), K();
        }, children: a("refresh", { defaultValue: "Refresh" }) }),
        loading: E,
        children: /* @__PURE__ */ e.jsxs(ne, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(ne.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: I == null ? void 0 : I.name }),
          /* @__PURE__ */ e.jsx(ne.Item, { label: s("settings.organizations.slug", { defaultValue: "Slug" }), children: (I == null ? void 0 : I.slug) || "-" }),
          /* @__PURE__ */ e.jsx(ne.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(re, { color: (I == null ? void 0 : I.status) === "active" ? "green" : "default", children: (I == null ? void 0 : I.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(ne.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (I == null ? void 0 : I.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(z, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ne, {}), onClick: A, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (S) => {
                w(S), b(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Oe,
            {
              columns: Te,
              dataSource: (B == null ? void 0 : B.data) || [],
              loading: Q,
              rowKey: "id",
              pagination: {
                current: M,
                pageSize: N,
                total: (B == null ? void 0 : B.total) || 0,
                showSizeChanger: !0,
                showTotal: (S) => a("pagination.total", { defaultValue: `Total ${S} items` }),
                onChange: (S, te) => {
                  b(S), j(te);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: f,
        onOk: ce,
        onCancel: () => {
          g(!1), d.resetFields();
        },
        confirmLoading: J,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(i, { form: d, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              name: "user_id",
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: s("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                $,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: U,
                  filterOption: (S, te) => ((te == null ? void 0 : te.label) ?? "").toLowerCase().includes(S.toLowerCase()),
                  options: je.map((S) => ({
                    label: `${S.full_name || S.username} (${S.email})`,
                    value: S.id
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
                $,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: D,
                  options: ((Ce = C == null ? void 0 : C.data) == null ? void 0 : Ce.map((S) => ({
                    label: S.name,
                    value: S.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: u,
        onOk: Se,
        onCancel: () => {
          n(!1), o.resetFields(), p(null);
        },
        confirmLoading: W,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(i, { form: o, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                V,
                {
                  value: (_ == null ? void 0 : _.full_name) || (_ == null ? void 0 : _.username),
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
                $,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: D,
                  options: ((be = C == null ? void 0 : C.data) == null ? void 0 : be.map((S) => ({
                    label: S.name,
                    value: S.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, _l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ds
}, Symbol.toStringTag, { value: "Module" })), qs = Be(() => import("./markdown-viewer.js")), $s = hs(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: ut } = V, Bs = (t) => t.toLowerCase().endsWith(".md");
function kt(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(ht, {}) : /* @__PURE__ */ e.jsx(xt, {}),
      children: (s = l.children) != null && s.length ? kt(l.children) : void 0
    };
  });
}
function et(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const Hs = () => {
  const { styles: t } = $s(), { id: l } = Xe(), s = ye(), { t: a } = X("system"), [d, o] = y(null), [f, g] = y(null), [u, n] = y(!1), [_, p] = y(""), [F, w] = y(!1), [M, b] = y([]), [N, j] = y(!1), [I, E] = y(!1), [O, B] = y(""), [Q] = i.useForm(), [K, ie] = y(null), [U, C] = y(null), [D, J] = y(""), [h] = i.useForm(), { data: W } = T(
    () => l ? k.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: L, loading: c, refresh: A } = T(
    () => l ? k.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (v) => {
        if (!d) {
          for (const P of v)
            if (!P.is_dir && P.name === "SKILL.md") {
              g(P.path), o(P.path), n(!1);
              return;
            }
          for (const P of v)
            if (!P.is_dir && P.name === "SKILLS.md") {
              g(P.path), o(P.path), n(!1);
              return;
            }
        }
      }
    }
  ), Y = (W == null ? void 0 : W.data) ?? W, G = !!(Y != null && Y.is_preset), ce = (L == null ? void 0 : L.data) ?? L ?? [], Se = Fe(() => kt(ce), [ce]), je = u && f ? f : d ? et(d) : "";
  Pe(() => {
    d && l ? (k.system.getSkillFile({ id: l, path: d }).then((v) => {
      p(v.data);
    }).catch(() => r.error(a("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), w(!1)) : (p(""), w(!1));
  }, [l, d, a]);
  const Te = () => {
    !l || !d || G || k.system.putSkillFile({ id: l, path: d }, _).then(() => {
      r.success(a("settings.skills.editor.saved", { defaultValue: "Saved" })), w(!1);
    }).catch(() => r.error(a("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, we = (v, P) => {
    const se = String(P.node.key), pe = !P.node.isLeaf;
    g(se), n(pe), P.node.isLeaf ? o(se) : o(null);
  }, Ce = (v) => {
    v.event.preventDefault(), ie({
      path: String(v.node.key),
      isDir: !v.node.isLeaf,
      x: v.event.clientX,
      y: v.event.clientY
    });
  }, be = fe(() => ie(null), []), S = fe(
    (v) => {
      if (!l || !K || G) return;
      const { path: P, isDir: se } = K;
      switch (be(), v) {
        case "open":
          o(P), g(P), n(!1);
          break;
        case "rename": {
          const pe = P.includes("/") ? P.split("/").pop() : P;
          C({ path: P, isDir: se }), J(pe), setTimeout(() => h.setFieldsValue({ name: pe }), 0);
          break;
        }
        case "delete":
          oe.confirm({
            title: a("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: se ? a("settings.skills.editor.deleteConfirmContentDir", { path: P, defaultValue: `Delete ${P}? This will remove the folder and all its contents.` }) : a("settings.skills.editor.deleteConfirmContent", { path: P, defaultValue: `Delete ${P}?` }),
            onOk: () => k.system.deleteSkillPath({ id: l, path: P }).then(() => {
              r.success(a("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === P && (o(null), p("")), f === P && (g(null), n(!1)), A();
            }).catch(() => r.error(a("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          g(P), n(se), j(!0);
          break;
        case "newDir":
          g(P), n(se), E(!0);
          break;
      }
    },
    [l, K, be, A, d, f, h, a, G]
  ), te = () => {
    if (!l || !U || G) return;
    const v = (h.getFieldValue("name") ?? D).trim();
    if (!v) {
      r.error(a("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!U.isDir && !/\.(md|txt)$/i.test(v)) {
      r.error(a("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const P = et(U.path), se = P ? `${P}/${v}` : v;
    if (se === U.path) {
      C(null);
      return;
    }
    k.system.moveSkillPath({ id: l }, { from_path: U.path, to_path: se }).then(() => {
      r.success(a("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === U.path && o(se), f === U.path && g(se), C(null), A();
    }).catch(() => r.error(a("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, he = (v) => {
    if (!l || G) return;
    const P = String(v.dragNode.key), se = String(v.dragNode.title);
    let pe;
    if (v.dropToGap) {
      const Ke = et(String(v.node.key));
      pe = Ke ? `${Ke}/${se}` : se;
    } else
      pe = `${v.node.key}/${se}`;
    pe !== P && k.system.moveSkillPath({ id: l }, { from_path: P, to_path: pe }).then(() => {
      r.success(a("settings.skills.editor.moved", { defaultValue: "Moved" })), d === P && o(pe), f === P && g(pe), A();
    }).catch(() => r.error(a("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, ve = () => {
    const v = O.trim();
    if (!v || !l || G) return;
    const P = je ? `${je}/${v}` : v;
    if (!/\.(md|txt)$/i.test(v)) {
      r.error(a("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    k.system.putSkillFile({ id: l, path: P }, "").then(() => {
      r.success(a("settings.skills.editor.fileCreated", { defaultValue: "File created" })), j(!1), B(""), A(), o(P), p("");
    }).catch(() => r.error(a("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, x = () => {
    var se;
    const v = (se = Q.getFieldValue("name")) == null ? void 0 : se.trim();
    if (!v || !l || G) return;
    const P = je ? `${je}/${v}` : v;
    k.system.createSkillDir({ id: l }, { path: P }).then(() => {
      r.success(a("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), E(!1), Q.resetFields(), A();
    }).catch(() => r.error(a("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, q = () => {
    const v = f || d;
    !l || !v || G || oe.confirm({
      title: a("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: a("settings.skills.editor.deleteConfirmContent", { path: v, defaultValue: `Delete ${v}?` }),
      onOk: () => k.system.deleteSkillPath({ id: l, path: v }).then(() => {
        r.success(a("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === v && (o(null), p("")), f === v && (g(null), n(!1)), A();
      }).catch(() => r.error(a("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    ae,
    {
      title: (Y == null ? void 0 : Y.name) ?? a("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(z, { type: "link", onClick: () => s("/system/settings#skills"), children: a("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        G ? /* @__PURE__ */ e.jsx(
          tt,
          {
            type: "info",
            showIcon: !0,
            style: { marginBottom: 12 },
            message: a("settings.skills.editor.presetReadOnly", {
              defaultValue: "This is a built-in skill. Files are read-only; use Preview to view content."
            })
          }
        ) : null,
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 16, flex: 1, minHeight: 0 }, children: [
          /* @__PURE__ */ e.jsxs("div", { style: { width: 260, border: "1px solid #d9d9d9", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            /* @__PURE__ */ e.jsxs(Z, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(z, { size: "small", icon: /* @__PURE__ */ e.jsx(Ne, {}), disabled: G, onClick: () => j(!0), children: a("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(z, { size: "small", icon: /* @__PURE__ */ e.jsx(ht, {}), disabled: G, onClick: () => E(!0), children: a("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            c ? /* @__PURE__ */ e.jsx("div", { children: a("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              It,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !G,
                expandedKeys: M,
                onExpand: (v) => b(v),
                selectedKeys: f ? [f] : [],
                onSelect: we,
                onRightClick: G ? void 0 : Ce,
                onDrop: he,
                className: t.fileTree,
                treeData: Se
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(Z, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(z, { type: "primary", icon: /* @__PURE__ */ e.jsx(He, {}), disabled: G || !F, onClick: Te, children: a("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(z, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ie, {}), disabled: G, onClick: q, children: a("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              Bs(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  ut,
                  {
                    value: _,
                    readOnly: G,
                    onChange: (v) => {
                      p(v.target.value), w(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx($e, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(qs, { content: yt(_) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                ut,
                {
                  value: _,
                  readOnly: G,
                  onChange: (v) => {
                    p(v.target.value), w(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              )
            ] }),
            !d && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: a("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        K && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: be,
              onContextMenu: (v) => v.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: K.x, top: K.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            At,
            {
              selectable: !1,
              items: [
                ...K.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(xt, {}), label: a("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Me, {}), label: a("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ie, {}), label: a("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(Bt, {}), label: a("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(Ht, {}), label: a("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: v }) => S(v)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(oe, { title: a("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: N, onOk: ve, onCancel: () => {
          j(!1), B("");
        }, okText: a("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: a("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: O, onChange: (v) => B(v.target.value) }) }),
        /* @__PURE__ */ e.jsx(oe, { title: a("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: I, onOk: () => Q.validateFields().then(x), onCancel: () => E(!1), okText: a("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(i, { form: Q, layout: "vertical", children: /* @__PURE__ */ e.jsx(i.Item, { name: "name", label: a("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, { placeholder: a("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          oe,
          {
            title: a("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!U,
            onOk: te,
            onCancel: () => C(null),
            okText: a("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(i, { form: h, layout: "vertical", onValuesChange: (v, P) => J(P.name ?? ""), children: /* @__PURE__ */ e.jsx(i.Item, { name: "name", label: U != null && U.isDir ? a("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : a("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              V,
              {
                placeholder: U != null && U.isDir ? a("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : a("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => te()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hs
}, Symbol.toStringTag, { value: "Module" })), Js = Be(() => import("./markdown-viewer.js")), Ks = () => {
  const { id: t } = Xe(), l = ye(), { t: s } = X("system"), { data: a, loading: d } = T(
    () => t ? k.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: o, loading: f, mutate: g } = T(
    () => t ? k.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => r.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => g()
    }
  ), u = (a == null ? void 0 : a.data) ?? a, n = Fe(() => o == null ? void 0 : o.map((p) => ({
    key: p.file_name,
    label: p.file_name,
    children: /* @__PURE__ */ e.jsx($e, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(Js, { content: yt(p.content) }) })
  })), [o]);
  if (!t) return null;
  const _ = d || f;
  return /* @__PURE__ */ e.jsx(xe, { spinning: _, children: /* @__PURE__ */ e.jsx(
    ae,
    {
      title: (u == null ? void 0 : u.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(z, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: n
    }
  ) });
}, Cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ks
}, Symbol.toStringTag, { value: "Module" })), { Text: _e, Title: Ws } = mt, Gs = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(Xt, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(Zt, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Gt, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(st, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(We, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(Wt, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(We, {}) }
};
function Ye(t) {
  try {
    return { parsed: JSON.parse(t), isJSON: !0 };
  } catch {
    return { parsed: null, isJSON: !1 };
  }
}
const ze = ({
  content: t,
  maxHeight: l = 400
}) => {
  const { parsed: s, isJSON: a } = Ye(t);
  return a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    Ge,
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
      value: s
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
}, Zs = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: a } = Ye(t);
  return a ? /* @__PURE__ */ e.jsxs(ne, { size: "small", column: 2, bordered: !0, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ne.Item,
      {
        label: l("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ne.Item,
      {
        label: l("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ne.Item,
      {
        label: l("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ne.Item,
      {
        label: l("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: s.active_tokens
      }
    )
  ] }) : /* @__PURE__ */ e.jsx(ze, { content: t });
}, Xs = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: a } = Ye(t);
  return a ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(_e, { strong: !0, children: [
        l("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(re, { color: "blue", children: s.tool })
    ] }),
    s.arguments && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(_e, { strong: !0, children: [
        l("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(ze, { content: s.arguments, maxHeight: 200 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(ze, { content: t });
}, Ys = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: a } = Ye(t);
  return a ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(_e, { strong: !0, children: [
        l("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(_e, { code: !0, children: s.tool_call_id })
    ] }),
    s.result && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(_e, { strong: !0, children: [
        l("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(ze, { content: s.result, maxHeight: 300 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(ze, { content: t });
}, Qs = ({ event: t, t: l }) => {
  switch (t.event_type) {
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Zs, { content: t.content, t: l });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(Xs, { content: t.content, t: l });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(Ys, { content: t.content, t: l });
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
      return /* @__PURE__ */ e.jsx(ze, { content: t.content });
  }
}, el = () => {
  const { t } = X("ai"), l = ye(), [s, a] = y(""), [d, o] = y(""), {
    data: f,
    loading: g,
    refresh: u
  } = T(() => k.ai.getAiTraceStatus(), {
    onError: () => {
      r.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), n = (f == null ? void 0 : f.enabled) ?? !1, { loading: _, run: p } = T(
    (O) => k.ai.toggleAiTrace({ enabled: O }),
    {
      manual: !0,
      onSuccess: (O, [B]) => {
        r.success(
          B ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), u(), B || o("");
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
    data: F,
    loading: w,
    run: M
  } = T(
    (O) => k.ai.getAiTraceEvents({ trace_id: O }),
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
  ), b = fe(() => {
    s.trim() && (o(s.trim()), M(s.trim()));
  }, [s, M]), N = fe(
    (O) => {
      const B = O ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      oe.confirm({
        title: O ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: B,
        onOk: () => p(O)
      });
    },
    [t, p]
  ), j = fe(async () => {
    if (d)
      try {
        const O = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!O.ok) throw new Error("download failed");
        const B = await O.blob(), Q = window.URL.createObjectURL(B), K = document.createElement("a");
        K.href = Q, K.download = `ai-trace-${d}.json`, document.body.appendChild(K), K.click(), window.URL.revokeObjectURL(Q), document.body.removeChild(K);
      } catch {
        r.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, t]), I = Fe(() => F ?? [], [F]), E = Fe(
    () => I.map((O) => {
      const B = Gs[O.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(We, {})
      }, Q = t(
        `trace.eventTypes.${O.event_type}`,
        { defaultValue: O.event_type }
      );
      return {
        key: O.id,
        dot: B.icon,
        color: B.color,
        children: /* @__PURE__ */ e.jsx(
          Et,
          {
            size: "small",
            defaultActiveKey: [O.id],
            items: [
              {
                key: O.id,
                label: /* @__PURE__ */ e.jsxs(Z, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(re, { color: B.color, children: Q }),
                  /* @__PURE__ */ e.jsxs(_e, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    O.step_order
                  ] }),
                  O.duration_ms > 0 && /* @__PURE__ */ e.jsxs(_e, { type: "secondary", style: { fontSize: 12 }, children: [
                    t("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    O.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(_e, { type: "secondary", style: { fontSize: 12 }, children: new Date(O.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Qs, { event: O, t })
              }
            ]
          }
        )
      };
    }),
    [I, t]
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
          /* @__PURE__ */ e.jsxs(Z, { children: [
            /* @__PURE__ */ e.jsx(
              z,
              {
                icon: /* @__PURE__ */ e.jsx(it, {}),
                onClick: () => l("/system/settings#ai-models"),
                children: t("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(Ws, { level: 4, style: { margin: 0 }, children: t("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(Z, { children: [
            /* @__PURE__ */ e.jsx(_e, { children: n ? t("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : t("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              ue,
              {
                checked: n,
                loading: g || _,
                onChange: N
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Z.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        V,
        {
          placeholder: t("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: s,
          onChange: (O) => a(O.target.value),
          onPressEnter: b,
          prefix: /* @__PURE__ */ e.jsx(Jt, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(z, { type: "primary", onClick: b, loading: w, children: t("trace.search", { defaultValue: "Search" }) }),
      d && I.length > 0 && /* @__PURE__ */ e.jsx(z, { icon: /* @__PURE__ */ e.jsx(Kt, {}), onClick: j, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    w ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(xe, { size: "large" }) }) }) : d && I.length === 0 ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      De,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : I.length > 0 ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(zt, { items: E }) }) : null
  ] });
}, Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: el
}, Symbol.toStringTag, { value: "Module" })), tl = Be(() => import("./json-schema-config-form.js")), { Text: Ee, Title: sl } = mt;
function lt(t) {
  try {
    return { parsed: JSON.parse(t), isJSON: !0 };
  } catch {
    return { parsed: null, isJSON: !1 };
  }
}
const ll = ({
  content: t,
  maxHeight: l = 400
}) => {
  const { parsed: s, isJSON: a } = lt(t);
  return a ? /* @__PURE__ */ e.jsx(
    Ge,
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
      value: s
    }
  ) : /* @__PURE__ */ e.jsx(
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
}, al = () => {
  var W;
  const { t } = X("system"), { t: l } = X("common"), s = ye(), { id: a } = Xe(), [d, o] = y(void 0), [f, g] = y("schema"), [u, n] = y({}), [_, p] = y("{}"), [F, w] = y(null), [M, b] = y(null), { loading: N, data: j } = T(
    () => k.system.getToolSet({ id: a }),
    {
      ready: !!a,
      onError: () => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: I, data: E } = T(
    () => k.system.getToolSetTools({ id: a }),
    {
      ready: !!a,
      onError: () => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), O = E == null ? void 0 : E.find(
    (L) => {
      var c;
      return ((c = L.function) == null ? void 0 : c.name) === d;
    }
  ), { loading: B, run: Q } = T(
    (L, c) => k.system.callTool({ id: a }, { name: L, parameters: c }),
    {
      manual: !0,
      onSuccess: (L) => {
        w((L == null ? void 0 : L.result) ?? "");
      },
      onError: (L) => {
        var A, Y;
        const c = ((Y = (A = L == null ? void 0 : L.response) == null ? void 0 : A.data) == null ? void 0 : Y.message) || (L == null ? void 0 : L.message) || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        r.error(c), w(null);
      }
    }
  ), K = fe((L) => {
    o(L), n({}), p("{}"), w(null), b(null);
  }, []), ie = fe(() => {
    if (f === "schema")
      p(JSON.stringify(u, null, 2)), g("code");
    else {
      const { parsed: L, isJSON: c } = lt(_);
      c && (n(L ?? {}), b(null)), g("schema");
    }
  }, [f, u, _]), U = fe((L) => {
    p(L);
    const { parsed: c, isJSON: A } = lt(L);
    A ? (n(c ?? {}), b(null)) : b(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), C = fe(() => {
    if (!d) {
      r.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let L;
    if (f === "code") {
      if (M) {
        r.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      L = _;
    } else
      L = JSON.stringify(u);
    w(null), Q(d, L);
  }, [d, f, u, _, M, Q, t]), D = j, J = (D == null ? void 0 : D.status) === "enabled" ? "green" : "red", h = (D == null ? void 0 : D.status) === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(Z, { children: [
      /* @__PURE__ */ e.jsx(
        z,
        {
          icon: /* @__PURE__ */ e.jsx(it, {}),
          onClick: () => s("/system/settings#ai-toolsets"),
          children: t("settings.toolsets.backToList", { defaultValue: "Back" })
        }
      ),
      /* @__PURE__ */ e.jsx(sl, { level: 4, style: { margin: 0 }, children: t("settings.toolsets.debugTitle", { defaultValue: "Tool Debug" }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, loading: N, children: D && /* @__PURE__ */ e.jsxs(ne, { column: 2, size: "small", children: [
      /* @__PURE__ */ e.jsx(ne.Item, { label: t("settings.toolsets.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: D.name }) }),
      /* @__PURE__ */ e.jsx(ne.Item, { label: t("settings.toolsets.type", { defaultValue: "Type" }), children: /* @__PURE__ */ e.jsx(re, { color: "blue", children: String(D.type).toUpperCase() }) }),
      /* @__PURE__ */ e.jsx(ne.Item, { label: t("settings.toolsets.description", { defaultValue: "Description" }), span: 2, children: D.description || "-" }),
      /* @__PURE__ */ e.jsx(ne.Item, { label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(re, { color: J, children: h }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: t("settings.toolsets.selectTool", { defaultValue: "Select Tool" }) }) }),
        I ? /* @__PURE__ */ e.jsx(xe, { size: "small" }) : /* @__PURE__ */ e.jsx(
          $,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: d,
            onChange: K,
            optionLabelProp: "label",
            children: (E ?? []).map((L) => {
              var G, ce;
              const c = ((G = L.function) == null ? void 0 : G.name) ?? "", A = ((ce = L.function) == null ? void 0 : ce.description) ?? "", Y = A ? `${c} - ${A}` : c;
              return /* @__PURE__ */ e.jsx($.Option, { value: c, label: Y, children: /* @__PURE__ */ e.jsx(
                "div",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  title: Y,
                  children: Y
                }
              ) }, c);
            })
          }
        )
      ] }),
      O && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
          /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: t("settings.toolsets.parameters", { defaultValue: "Parameters" }) }),
          /* @__PURE__ */ e.jsx(
            Ze,
            {
              title: f === "schema" ? t("settings.toolsets.switchToCodeEditor", { defaultValue: "Switch to JSON editor" }) : t("settings.toolsets.switchToFormEditor", { defaultValue: "Switch to form editor" }),
              children: /* @__PURE__ */ e.jsx(
                z,
                {
                  size: "small",
                  icon: f === "schema" ? /* @__PURE__ */ e.jsx(Yt, {}) : /* @__PURE__ */ e.jsx(Qt, {}),
                  onClick: ie
                }
              )
            }
          )
        ] }),
        f === "schema" ? (W = O.function) != null && W.parameters ? /* @__PURE__ */ e.jsx($e, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(
          tl,
          {
            schema: O.function.parameters,
            value: u,
            onChange: n
          }
        ) }) : /* @__PURE__ */ e.jsx(Ee, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            xs,
            {
              value: _,
              height: "200px",
              extensions: [ys()],
              onChange: U,
              basicSetup: { lineNumbers: !0, foldGutter: !0 }
            }
          ),
          M && /* @__PURE__ */ e.jsx(Ee, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: M })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: F !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        z,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(es, {}),
          loading: B,
          disabled: !d,
          onClick: C,
          children: t("settings.toolsets.callTool", { defaultValue: "Run" })
        }
      ) }),
      F !== null && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: t("settings.toolsets.result", { defaultValue: "Result" }) }) }),
        /* @__PURE__ */ e.jsx(ll, { content: F, maxHeight: 300 })
      ] })
    ] })
  ] });
}, Fl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: al
}, Symbol.toStringTag, { value: "Module" })), il = () => {
  const { t } = X("system"), [l] = ls(), s = l.get("provider"), a = l.get("code"), d = l.get("state"), [o, f] = y(null), [g, u] = y(null), [n, _] = y(null);
  return T(async () => {
    if (!a || !d || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const p = await k.system.testOauthCallback({ code: a, state: d, provider: s });
    if (!p.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!p.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    f(p.user), u(p.user_info);
  }, {
    onSuccess: () => {
      _({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (p) => {
      _({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: p.message
      });
    }
  }), n ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    Ot,
    {
      status: n.status,
      title: n.message,
      subTitle: n.error,
      extra: /* @__PURE__ */ e.jsxs(Z, { style: { display: !g || !o ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(ae, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Ge, { value: g || {} }) }),
        /* @__PURE__ */ e.jsx(ae, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Ge, { value: o || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Re, {});
}, Il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: il
}, Symbol.toStringTag, { value: "Module" }));
export {
  Tl as A,
  _l as O,
  wl as S,
  Fl as T,
  Cl as a,
  Il as b,
  vl as i
};
