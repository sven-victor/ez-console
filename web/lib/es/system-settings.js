import { j as e } from "./vendor.js";
import { Form as i, message as r, Spin as ye, Switch as ue, Select as $, Input as V, Alert as tt, Divider as at, Space as Z, Button as E, InputNumber as ce, Modal as oe, Skeleton as vt, Descriptions as ie, Steps as _t, Tag as re, Table as Oe, Radio as Ke, Tabs as ct, Popconfirm as wt, Tooltip as Ze, Card as le, Row as De, Col as Ve, Checkbox as Qe, Empty as Ue, AutoComplete as nt, Upload as Ct, Tree as Tt, Menu as Ft, Collapse as It, Typography as mt, Timeline as At, Result as Et } from "antd";
import { useTranslation as Y } from "react-i18next";
import { useState as y, useEffect as Pe, useMemo as Fe, Suspense as qe, lazy as $e, useCallback as pe } from "react";
import { useRequest as C } from "ahooks";
import { SaveOutlined as Be, ReloadOutlined as ke, LoadingOutlined as zt, CheckCircleTwoTone as Ot, ClearOutlined as Pt, StarFilled as Mt, CheckCircleOutlined as Nt, StarOutlined as Rt, EditOutlined as Me, CopyOutlined as gt, DeleteOutlined as Ie, BugOutlined as pt, PlusOutlined as Ne, ThunderboltOutlined as Lt, ToolOutlined as st, SettingOutlined as Ut, FileTextOutlined as We, EyeOutlined as ft, UploadOutlined as ot, CalendarOutlined as Dt, ArrowLeftOutlined as it, FolderOutlined as ht, FileOutlined as xt, FileAddOutlined as qt, FolderAddOutlined as $t, SearchOutlined as Bt, DownloadOutlined as Ht, WarningOutlined as Jt, DashboardOutlined as Kt, MessageOutlined as Wt, SendOutlined as Gt, CodeOutlined as Zt, AlignLeftOutlined as Xt, PlayCircleOutlined as Yt } from "@ant-design/icons";
import { a as S } from "./index.js";
import { g as rt, c as yt } from "./base.js";
import { f as me, e as Qt, b as He, L as Re } from "./components.js";
import jt from "react-quill";
import { useNavigate as je, useLocation as es, useParams as Xe, useSearchParams as ts } from "react-router-dom";
import { u as bt, c as ss } from "./contexts.js";
import { l as ls, c as as, u as is, d as ns, g as os, b as rs, e as ds, f as us, r as cs } from "./system.js";
import { l as ms, b as gs } from "./authorization.js";
import { createStyles as ps } from "antd-style";
import Ge from "@uiw/react-json-view";
import fs from "@uiw/react-codemirror";
import { json as hs } from "@codemirror/lang-json";
const Ae = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, xs = {
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
}, ys = ({ initialData: t, onRefresh: l }) => {
  const { t: s } = Y("system"), { t: a } = Y("common"), [d] = i.useForm(), [o, f] = y((t == null ? void 0 : t.provider) || "custom"), [p, c] = y((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [n, k] = y((t == null ? void 0 : t.enabled) || !1), [u, T] = y((t == null ? void 0 : t.auto_create_user) || !1), { loading: F, data: M, refresh: b } = C(S.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (w) => {
      d.setFieldsValue(w), f(w.provider), c(w.provider === "custom" || w.provider === "autoDiscover"), k(w.enabled), T(w.auto_create_user);
    },
    onError: (w) => {
      r.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", w);
    }
  });
  Pe(() => {
    t && (d.setFieldsValue(t), f(t.provider), c(t.provider === "custom" || t.provider === "autoDiscover"), k(t.enabled), T(t.auto_create_user));
  }, [t, d]);
  const L = (w) => {
    f(w), c(w === "custom" || w === "autoDiscover");
    const D = xs[w];
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
  }, h = (w) => {
    k(w);
  }, I = (w) => {
    T(w);
  }, { loading: z, run: P } = C(S.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : b();
    },
    onError: (w) => {
      r.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", w);
    }
  }), B = (w) => {
    P(w);
  }, X = () => {
    l ? l() : b();
  }, { loading: K, run: ne } = C(async ({ redirect_uri: w, ...D }) => {
    let W;
    return w ? W = new URL(w) : W = new URL(window.location.origin), W.pathname = rt("/system/settings/oauth/test-callback"), W.searchParams.set("provider", o), S.system.testOauthConnection({ redirect_uri: W.toString(), ...D });
  }, {
    manual: !0,
    onSuccess: ({ url: w }) => {
      window.open(w, "_blank");
    },
    onError: (w) => {
      r.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: w.message })), console.error("Failed to test OAuth connection", w);
    }
  }), U = () => o === "custom";
  return /* @__PURE__ */ e.jsx(ye, { spinning: F, children: /* @__PURE__ */ e.jsxs(
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
            children: /* @__PURE__ */ e.jsx(ue, { onChange: h })
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
            children: /* @__PURE__ */ e.jsxs($, { onChange: L, disabled: !n, children: [
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
            rules: [(w) => w.getFieldValue("redirect_uri") !== "" ? {
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
                required: n && u,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n || !u })
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
            description: p ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "email", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "login", autoComplete: "off", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "name", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "avatar_url", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "role", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: z,
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              loading: K,
              onClick: async () => {
                const w = d.getFieldsValue();
                ne(w);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: X,
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, js = () => {
  const { t } = Y("system"), { t: l } = Y("common"), [s] = i.useForm(), { loading: a, data: d, refresh: o } = C(S.system.getSecuritySettings, {
    onSuccess: (n) => {
      s.setFieldsValue(n);
    },
    onError: (n) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", n);
    }
  }), { loading: f, run: p } = C(S.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), o();
    },
    onError: (n) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", n);
    }
  }), c = (n) => {
    p(n);
  };
  return /* @__PURE__ */ e.jsx(ye, { spinning: a, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: s,
      layout: "vertical",
      onFinish: c,
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
            name: "password_expiry_notify_days",
            label: t("settings.security.passwordExpiryNotify.label", { defaultValue: "Password Expiry Notification (Days Before Expiry)" }),
            tooltip: t("settings.security.passwordExpiryNotify.tooltip", { defaultValue: "Notify users by email this many days before password expiry. Set to 0 to disable." }),
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
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, k) => n.login_failure_lock !== k.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
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
            shouldUpdate: (n, k) => n.login_failure_lock !== k.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
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
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          i.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, k) => n.history_password_check !== k.history_password_check,
            children: ({ getFieldValue: n }) => n("history_password_check") ? /* @__PURE__ */ e.jsx(
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
            name: "user_inactive_days",
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
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: f,
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
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
}, bs = ({ fetchItems: t, importItems: l, columns: s, ...a }) => {
  const { t: d } = Y("system"), [o, f] = y([]), [p, c] = y([]), { run: n, loading: k } = C(t, {
    onError: (F) => {
      r.error(d("settings.ldap.importError", { error: `${F.message}` }));
    },
    onSuccess: (F) => {
      f(F);
    },
    manual: !0
  }), { run: u, loading: T } = C(async () => {
    for (const F of p.filter((M) => {
      const b = o.find((L) => L.ldap_dn === M);
      return !(!b || b.status === "imported");
    })) {
      const M = await l([F]);
      f((b) => [...b].map((h) => {
        for (const I of M)
          if (h.ldap_dn === I.ldap_dn)
            return { ...I, status: "imported" };
        return h;
      }));
    }
  }, {
    manual: !0
  });
  return Pe(() => {
    a.visible && (f([]), n(), c([]));
  }, [a.visible]), /* @__PURE__ */ e.jsx(
    oe,
    {
      title: d("settings.ldap.importTitle"),
      ...a,
      onOk: () => {
        u();
      },
      width: 900,
      confirmLoading: T,
      loading: k,
      children: /* @__PURE__ */ e.jsx(
        Oe,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (F) => {
              c(F);
            },
            getCheckboxProps: (F) => ({
              disabled: F.status === "imported"
            })
          },
          columns: s.map(({ render: F, ...M }) => F ? {
            ...M,
            render: (b, L, h) => {
              const I = p.includes(L.ldap_dn) && T && L.status !== "imported";
              return F(b, L, h, I);
            }
          } : M),
          dataSource: o,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Vs = () => {
  var L, h, I;
  const { t } = Y("system"), [l] = i.useForm(), [s, a] = y(!1), [d, o] = y(null), [f, p] = y(!1), [c, n] = y(!1), [k] = i.useForm(), [u, T] = y(!1);
  C(S.system.getLdapSettings, {
    onSuccess: (z) => {
      l.setFieldsValue(z), T(z.enabled);
    },
    onError: (z) => {
      r.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${z.message}` }));
    }
  }), Pe(() => {
    o(null);
  }, [f]);
  const F = async (z) => {
    a(!0);
    try {
      await S.system.updateLdapSettings(z), r.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      r.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      a(!1);
    }
  }, { run: M, loading: b } = C(async (z) => {
    const P = await l.validateFields();
    return await S.system.testLdapConnection({
      ...z,
      ...P
    });
  }, {
    onSuccess: (z) => {
      o(z);
    },
    onError: (z) => {
      r.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${z.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      i,
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
            i.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(ue, { onChange: (z) => T(z) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: u, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: u, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: u, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(V.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: u, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: u, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: u, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: u, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: u, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(V, { type: "number", defaultValue: 15, disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(at, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(ue, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(ue, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsxs(i.Item, { children: [
            /* @__PURE__ */ e.jsx(me, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(me, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !u,
                style: { marginLeft: 8 },
                onClick: () => p(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(me, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !u,
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
        onCancel: () => p(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            i,
            {
              form: k,
              layout: "vertical",
              onFinish: M,
              children: [
                /* @__PURE__ */ e.jsx(
                  i.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V, { disabled: !u })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  i.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !u })
                  }
                ),
                /* @__PURE__ */ e.jsxs(i.Item, { children: [
                  /* @__PURE__ */ e.jsx(me, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { disabled: !u, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    E,
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
          /* @__PURE__ */ e.jsx(ye, { spinning: b, children: /* @__PURE__ */ e.jsx(vt, { active: b, loading: b, children: d && (d.user ? /* @__PURE__ */ e.jsxs(ie, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(ie.Item, { label: "Username", span: 3, children: d.user.username }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "Email", span: 3, children: d.user.email }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "FullName", span: 3, children: d.user.full_name }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "CreatedAt", span: 3, children: d.user.created_at }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "UpdatedAt", span: 3, children: d.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            _t,
            {
              direction: "vertical",
              current: (L = d.message) == null ? void 0 : L.findIndex((z) => !z.success),
              status: (h = d.message) != null && h.find((z) => !z.success) ? "error" : "finish",
              items: (I = d.message) == null ? void 0 : I.map((z) => ({
                status: z.success ? "finish" : "error",
                title: z.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      bs,
      {
        visible: c,
        onCancel: () => n(!1),
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
          render: (z, P, B, X) => X ? /* @__PURE__ */ e.jsx(ye, { indicator: /* @__PURE__ */ e.jsx(zt, { spin: !0 }) }) : z ? /* @__PURE__ */ e.jsx(Ot, { twoToneColor: "#52c41a" }) : P.id ? /* @__PURE__ */ e.jsx(re, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(re, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, ks = () => {
  const { t } = Y("system"), { t: l } = Y("common"), [s] = i.useForm(), [a, d] = y(null), [o, f] = y(!1), [p] = i.useForm(), [c, n] = y(!1), { data: k } = C(S.system.getSmtpSettingFields), { loading: u } = C(S.system.getSmtpSettings, {
    onSuccess: (h) => {
      s.setFieldsValue(h), n(h.enabled);
    },
    onError: (h) => {
      r.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${h.message}` }));
    }
  });
  Pe(() => {
    d(null);
  }, [o]);
  const { run: T, loading: F } = C(({ port: h, ...I }) => S.system.updateSmtpSettings({ ...I, port: Number(h) }), {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (h) => {
      r.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${h.message}` }));
    }
  }), { run: M, loading: b } = C(async (h) => {
    const { port: I, ...z } = await s.validateFields();
    return await S.system.testSmtpConnection({
      ...h,
      ...z,
      port: Number(I)
    });
  }, {
    onSuccess: (h) => {
      d(h);
    },
    onError: (h) => {
      r.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${h.message}` }));
    },
    manual: !0
  }), L = (h) => {
    switch (h.value_type) {
      case "number":
        return /* @__PURE__ */ e.jsx(ce, { style: { width: "100%" }, disabled: !c, min: h.min, max: h.max, step: h.step });
      case "percentage":
        return /* @__PURE__ */ e.jsx(ce, { style: { width: "100%" }, disabled: !c, min: 0, max: 100, step: h.step || 0.01, addonAfter: "%" });
      case "string_list":
        return /* @__PURE__ */ e.jsx($, { mode: "tags", tokenSeparators: [","], disabled: !c });
      case "enum":
        return /* @__PURE__ */ e.jsx($, { disabled: !c, options: h.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(jt, { theme: "snow", readOnly: !c });
      case "string":
      default:
        return /* @__PURE__ */ e.jsx(V, { disabled: !c });
    }
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(ye, { spinning: u, children: /* @__PURE__ */ e.jsxs(
      i,
      {
        form: s,
        layout: "vertical",
        onFinish: T,
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
              children: /* @__PURE__ */ e.jsx(ue, { onChange: (h) => n(h) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: c, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: c, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { type: "number", disabled: !c, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: c, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !c, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: c, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(Ke.Group, { disabled: !c, children: [
                /* @__PURE__ */ e.jsx(Ke.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(Ke.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(Ke.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: c, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
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
                  disabled: !c,
                  placeholder: t("settings.smtp.adminEmailsPlaceholder", { defaultValue: "Enter email addresses" })
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(at, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          (k || []).map((h) => /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: t(h.label_key || `settings.smtp.${h.key}`, { defaultValue: h.key }),
              name: h.key,
              tooltip: h.tooltip_key ? t(h.tooltip_key, { defaultValue: "" }) : void 0,
              children: L(h)
            },
            h.key
          )),
          /* @__PURE__ */ e.jsxs(i.Item, { children: [
            /* @__PURE__ */ e.jsx(me, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: F, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              E,
              {
                onClick: () => f(!0),
                disabled: !c || b,
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
          /* @__PURE__ */ e.jsx(E, { onClick: () => f(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(E, { type: "primary", loading: b, onClick: () => p.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          i,
          {
            form: p,
            layout: "vertical",
            onFinish: (h) => M(h),
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
}, Ss = () => {
  const { t, i18n: l } = Y("system"), { t: s } = Y("common"), [a] = i.useForm(), { loading: d, data: o, refresh: f } = C(S.system.getSystemBaseSettings, {
    onSuccess: (T) => {
      a.setFieldsValue(T);
    },
    onError: (T) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", T);
    }
  }), { loading: p, run: c } = C(S.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), f();
    },
    onError: (T) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", T);
    }
  }), { loading: n, run: k } = C(S.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      r.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (T) => {
      r.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", T);
    }
  }), u = (T) => {
    c(T);
  };
  return /* @__PURE__ */ e.jsx(ye, { spinning: d, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: a,
      layout: "vertical",
      onFinish: u,
      initialValues: o,
      children: [
        /* @__PURE__ */ e.jsx(i.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(ct, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(i.Item, { name: "name", children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }, ...Qt.map((T) => ({
          key: T.lang,
          label: l.language !== T.lang ? s(`language.${T.lang}`, { defaultValue: T.label, lang: T.label }) : T.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(i.Item, { name: ["name_i18n", T.lang], children: /* @__PURE__ */ e.jsx(V, {}) }) })
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
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: p,
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => f(),
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(me, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            wt,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: s("ok", { defaultValue: "OK" }),
              cancelText: s("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => k(),
              children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Pt, {}), loading: n, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, vs = $e(() => import("./json-schema-config-form.js").then((t) => ({
  default: t.JsonSchemaConfigFormItem
}))), { TextArea: _s } = V, ws = () => {
  var N;
  const { t } = Y("ai"), { t: l } = Y("common"), s = je(), [a] = i.useForm(), [d, o] = y(!1), [f, p] = y(null), [c, n] = y(""), [k, u] = y(""), { loading: T, data: F } = C(
    () => S.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (m) => {
        r.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", m);
      }
    }
  ), M = Fe(() => F == null ? void 0 : F.find((m) => m.provider === k), [F, k]), { loading: b, data: L, refresh: h } = C(
    () => S.ai.listAiModels({ current: 1, page_size: 100, search: c }),
    {
      refreshDeps: [c],
      onError: (m) => {
        r.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", m);
      }
    }
  ), { loading: I, run: z } = C(
    ({ config: m, ...A }) => S.ai.createAiModel({ config: m ?? {}, ...A }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), o(!1), a.resetFields(), h();
      },
      onError: (m) => {
        r.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", m);
      }
    }
  ), { loading: P, run: B } = C(
    ({ id: m, data: A }) => S.ai.updateAiModel({ id: m }, A),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), o(!1), a.resetFields(), p(null), h();
      },
      onError: (m) => {
        r.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", m);
      }
    }
  ), { runAsync: X } = C(
    (m) => S.ai.deleteAiModel({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), h();
      },
      onError: (m) => {
        r.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", m);
      }
    }
  ), { runAsync: K } = C(
    (m) => S.ai.testAiModel({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (m) => {
        r.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", m);
      }
    }
  ), { runAsync: ne } = C(
    (m) => S.ai.setDefaultAiModel({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), h();
      },
      onError: (m) => {
        r.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", m);
      }
    }
  ), U = () => {
    p(null), u(""), a.resetFields(), o(!0);
  }, w = (m) => {
    p(m), u(m.provider);
    const A = m.config || {}, H = {
      name: m.name,
      description: m.description,
      provider: m.provider,
      is_default: m.is_default,
      config: A,
      // Spread config fields to form
      status: m.status,
      max_chat_tokens: m.max_chat_tokens ?? 0,
      max_chat_iterations: m.max_chat_iterations ?? 0
    };
    a.setFieldsValue(H), o(!0);
  }, D = async (m) => {
    p(null), u(m.provider), a.resetFields();
    try {
      const A = await S.ai.getAiModel({ id: m.id }), H = { ...A.config || {} };
      "api_key" in H && (H.api_key = ""), a.setFieldsValue({
        name: `${A.name} (copy)`,
        description: A.description,
        provider: A.provider,
        config: H,
        is_default: !1,
        status: "enabled",
        max_chat_tokens: A.max_chat_tokens ?? 0,
        max_chat_iterations: A.max_chat_iterations ?? 0
      }), o(!0);
    } catch {
      r.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, W = (m) => {
    u(m), a.setFieldValue("config", void 0);
  }, j = (m) => {
    let A = m.config ?? {};
    const H = {
      name: m.name,
      description: m.description,
      provider: m.provider,
      config: A,
      is_default: m.is_default,
      status: m.status,
      max_chat_tokens: m.max_chat_tokens ?? 0,
      max_chat_iterations: m.max_chat_iterations ?? 0
    };
    f ? B({ id: f.id, data: H }) : z(H);
  }, G = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (m, A) => /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx("span", { children: m }),
        A.is_default && /* @__PURE__ */ e.jsx(Ze, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Mt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (m) => /* @__PURE__ */ e.jsx(re, { color: "blue", children: m.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (m) => /* @__PURE__ */ e.jsx(re, { color: m === "enabled" ? "green" : "red", children: m === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (m, A) => /* @__PURE__ */ e.jsx(He, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Nt, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => K(A.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Rt, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => ne(A.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Me, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => w(A)
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
          onClick: async () => X(A.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(De, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsx(
        V.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (m) => n(m),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(me, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(pt, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(ke, {}),
            onClick: h,
            loading: b,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(me, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ne, {}),
            onClick: U,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(
      Oe,
      {
        columns: G,
        dataSource: (L == null ? void 0 : L.data) || [],
        loading: b,
        rowKey: "id",
        pagination: {
          total: (L == null ? void 0 : L.total) || 0,
          current: (L == null ? void 0 : L.current) || 1,
          pageSize: (L == null ? void 0 : L.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (m, A) => l("pagination.total", {
            defaultValue: `${A[0]}-${A[1]} of ${m} items`,
            start: A[0],
            end: A[1],
            total: m
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
          o(!1), a.resetFields(), p(null);
        },
        footer: null,
        width: ((N = M == null ? void 0 : M.ui_schema) == null ? void 0 : N["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          i,
          {
            form: a,
            layout: "vertical",
            onFinish: j,
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
                      _s,
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
                        loading: T,
                        placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                        onChange: W,
                        value: k,
                        options: F == null ? void 0 : F.map((m) => ({
                          label: m.name,
                          value: m.provider
                        }))
                      }
                    )
                  }
                ),
                M && /* @__PURE__ */ e.jsx(i.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(qe, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(
                  vs,
                  {
                    name: "config",
                    schema: M.config_schema,
                    uiSchema: M.ui_schema
                  }
                ) }) }),
                /* @__PURE__ */ e.jsxs(De, { gutter: 16, children: [
                  /* @__PURE__ */ e.jsx(Ve, { span: 12, children: /* @__PURE__ */ e.jsx(
                    i.Item,
                    {
                      name: "max_chat_tokens",
                      label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: t("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, placeholder: "0" })
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
                      children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, placeholder: "0" })
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
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: I || P,
                    children: f ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      o(!1), a.resetFields(), p(null), u("");
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
}, Cs = $e(() => import("./json-schema-config-form.js").then((t) => ({
  default: t.JsonSchemaConfigFormItem
}))), { TextArea: Ts } = V, Fs = () => {
  var Se;
  const { t } = Y("system"), { t: l } = Y("common"), s = je(), [a] = i.useForm(), [d, o] = y(!1), [f, p] = y(null), [c, n] = y(""), [k, u] = y(!1), [T, F] = y(null), [M, b] = y(""), [L, h] = y(!1), [I, z] = y([]), [P, B] = y(), [X, K] = y(null), { loading: ne, data: U, refresh: w } = C(
    () => S.system.listToolSets({ current: 1, page_size: 100, search: c, type: P }),
    {
      refreshDeps: [c, P],
      onError: (x) => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", x);
      }
    }
  ), { loading: D, data: W } = C(
    () => S.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (x) => {
        r.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", x);
      }
    }
  ), j = Fe(() => W == null ? void 0 : W.find((x) => x.tool_set_type === M), [W, M]), { loading: G, run: N } = C(
    (x) => S.system.createToolSet({
      ...x,
      type: x.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), o(!1), a.resetFields(), w();
      },
      onError: (x) => {
        r.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", x);
      }
    }
  ), { loading: m, run: A } = C(
    ({ id: x, data: q }) => S.system.updateToolSet({ id: x }, {
      ...q,
      type: q.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), o(!1), a.resetFields(), p(null), w();
      },
      onError: (x) => {
        r.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", x);
      }
    }
  ), { run: H } = C(
    (x) => S.system.deleteToolSet({ id: x }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), w();
      },
      onError: (x) => {
        r.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", x);
      }
    }
  ), { runAsync: Q } = C(
    (x) => S.system.testToolSet({ id: x }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (x) => {
        r.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", x);
      }
    }
  ), { loading: he, runAsync: Ce } = C(
    (x) => S.system.getToolSetTools({ id: x }),
    {
      manual: !0,
      onSuccess: (x) => {
        z(x || []), h(!0);
      },
      onError: (x) => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", x);
      }
    }
  ), be = pe(
    async (x, q) => {
      K(x.id);
      try {
        await S.system.updateToolSetStatus(
          { id: x.id },
          { status: q ? "enabled" : "disabled" }
        ), r.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), w();
      } catch (_) {
        r.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", _);
      } finally {
        K(null);
      }
    },
    [t, w]
  ), Te = () => {
    p(null), a.resetFields(), b(""), o(!0);
  }, _e = (x) => {
    p(x), b(x.type);
    const q = { ...x };
    a.setFieldsValue(q), o(!0);
  }, we = (x) => {
    b(x), a.setFieldValue("config", {});
  }, xe = (x) => {
    f ? A({ id: f.id, data: x }) : N(x);
  }, v = (x) => {
    H(x);
  }, ae = (x) => {
    F(x), u(!0);
  }, fe = [
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
        const _ = q.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          me,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(re, { color: _ ? "green" : "red", children: _ ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Ze,
              {
                title: _ ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  ue,
                  {
                    size: "small",
                    checked: _,
                    loading: X === q.id,
                    onChange: (O) => void be(q, O)
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
      render: (x, q) => /* @__PURE__ */ e.jsx(He, { actions: [
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
          icon: /* @__PURE__ */ e.jsx(Lt, {}),
          disabled: q.status !== "enabled",
          onClick: async () => Q(q.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(st, {}),
          permission: "system:toolsets:view",
          disabled: q.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => Ce(q.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(Ut, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => ae(q.config),
          disabled: !q.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: q.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Me, {}),
          onClick: async () => _e(q),
          disabled: !!q.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          permission: "system:toolsets:delete",
          tooltip: q.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : l("delete", { defaultValue: "Delete" }),
          onClick: async () => v(q.id),
          danger: !0,
          disabled: !!q.is_preset,
          confirm: q.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => v(q.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(De, { justify: "space-between", align: "middle", children: [
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
            value: P,
            onChange: (x) => B(x),
            options: W == null ? void 0 : W.map((x) => ({
              label: x.name,
              value: x.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx($.Option, { value: "", children: "All" }),
              W == null ? void 0 : W.map((x) => /* @__PURE__ */ e.jsx($.Option, { value: x.tool_set_type, children: x.name }, x.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(ke, {}),
            onClick: w,
            loading: ne,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(me, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ne, {}),
            onClick: Te,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(
      Oe,
      {
        columns: fe,
        dataSource: (U == null ? void 0 : U.data) || [],
        loading: ne,
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
          o(!1), a.resetFields(), p(null), b("");
        },
        footer: null,
        width: ((Se = j == null ? void 0 : j.ui_schema) == null ? void 0 : Se["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          i,
          {
            form: a,
            layout: "vertical",
            onFinish: xe,
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
                      Ts,
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
                        onChange: we,
                        value: M,
                        options: W == null ? void 0 : W.map((x) => ({
                          label: x.name,
                          value: x.tool_set_type
                        }))
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(qe, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(
                  Cs,
                  {
                    name: "config",
                    schema: j == null ? void 0 : j.config_schema,
                    uiSchema: j == null ? void 0 : j.ui_schema
                  }
                ) }),
                /* @__PURE__ */ e.jsx(i.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: G || m,
                    children: f ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      o(!1), a.resetFields(), p(null), b("");
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
        open: k,
        onCancel: () => u(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => u(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(T, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: L,
        onCancel: () => h(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => h(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: he ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ke, { style: { fontSize: 24 }, spin: !0 }) }) : I.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : I.map((x, q) => {
          var _, O, te;
          return /* @__PURE__ */ e.jsx(
            le,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(st, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((_ = x.function) == null ? void 0 : _.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(De, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(Ve, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((O = x.function) == null ? void 0 : O.description) || "-" })
                ] }),
                ((te = x.function) == null ? void 0 : te.parameters) && /* @__PURE__ */ e.jsxs(Ve, { span: 24, children: [
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
function Is(t, l) {
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
    const p = (f.tools || []).map((c) => c.name);
    if (o.tool_name === "*") {
      s[o.toolset_id] = [...p];
      continue;
    }
    p.includes(o.tool_name) ? (s[o.toolset_id] || (s[o.toolset_id] = []), s[o.toolset_id].includes(o.tool_name) || s[o.toolset_id].push(o.tool_name)) : a.push({ toolset_id: o.toolset_id, tool_name: o.tool_name });
  }
  return { selections: s, extraPatterns: a };
}
function As(t, l) {
  const s = [], a = /* @__PURE__ */ new Set();
  for (const [d, o] of Object.entries(t))
    for (const f of o) {
      const p = `${d}|${f}`;
      a.has(p) || (a.add(p), s.push({ toolset_id: d, tool_name: f }));
    }
  for (const d of l) {
    const o = d.toolset_id.trim(), f = d.tool_name.trim();
    if (!o || !f)
      continue;
    const p = `${o}|${f}`;
    a.has(p) || (a.add(p), s.push({ toolset_id: o, tool_name: f }));
  }
  return s;
}
function Vt(t, l) {
  const s = l.trim();
  return !s || t.some((a) => a.value === s) ? t : [...t, { value: s, label: s }];
}
function Es(t, l, s, a) {
  const o = [{ value: "*", label: a }], f = /* @__PURE__ */ new Set(["*"]), p = (c, n) => {
    f.has(c) || (f.add(c), o.push({
      value: c,
      label: n ? `${c} — ${n}` : c
    }));
  };
  if (l && l !== "*") {
    const c = t.find((n) => n.id === l);
    for (const n of (c == null ? void 0 : c.tools) || [])
      p(n.name, n.description);
  } else
    for (const c of t)
      for (const n of c.tools || [])
        p(n.name, n.description);
  return Vt(o, s);
}
const zs = () => {
  const { t } = Y("system"), { t: l } = Y("common"), s = je(), { enableSkillToolBinding: a } = bt(), [d] = i.useForm(), [o, f] = y(""), [p, c] = y(), [n, k] = y(!1), [u, T] = y(null), [F, M] = y(null), [b, L] = y(!1), [h] = i.useForm(), [I, z] = y(!1), [P, B] = y(null), [X, K] = y([]), [ne, U] = y({}), [w, D] = y([]), [W, j] = y(!1), G = Fe(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...X.map((g) => ({
      value: g.id,
      label: `${g.name} (${g.id})`
    }))
  ], [X, t]), N = pe(() => {
    K([]), U({}), D([]);
  }, []), { loading: m, data: A, refresh: H } = C(
    () => S.system.listSkills({
      current: 1,
      page_size: 100,
      search: o || void 0,
      domain: p
    }),
    {
      refreshDeps: [o, p],
      onError: () => {
        r.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: Q = [] } = C(() => S.system.listSkillDomains()), he = (A == null ? void 0 : A.data) ?? [], Ce = (A == null ? void 0 : A.total) ?? 0, { run: be } = C(
    (g) => S.system.deleteSkill({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), H();
      },
      onError: () => {
        r.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Te = pe(
    async (g, R) => {
      B(g.id);
      try {
        await S.system.updateSkillStatus({ id: g.id }, { status: R ? "enabled" : "disabled" }), r.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), H();
      } catch {
        r.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        B(null);
      }
    },
    [t, H]
  ), { loading: _e, run: we } = C(
    (g) => S.system.uploadSkill(g.body, g.file),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), L(!1), h.resetFields(), H();
      },
      onError: () => {
        r.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), xe = pe(
    async (g) => {
      j(!0);
      try {
        const [R, J] = await Promise.all([
          S.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          S.system.listSkillAiToolBindings(
            { id: g, current: 1, page_size: 1e3 }
          )
        ]), de = (R.data || []).filter((St) => St.status === "enabled");
        K(de);
        const ee = J.data || [], { selections: se, extraPatterns: Le } = Is(ee, de);
        U(se), D(Le);
      } catch {
        r.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), N();
      } finally {
        j(!1);
      }
    },
    [N, t]
  );
  Pe(() => {
    !n || !u || !a || xe(u.id);
  }, [n, u == null ? void 0 : u.id, a, xe]);
  const v = (g, R) => {
    U((J) => ({ ...J, [g]: R }));
  }, ae = (g, R, J) => {
    U((de) => ({
      ...de,
      [g]: J ? [...R] : []
    }));
  }, fe = () => {
    T(null), M(null), d.resetFields(), N(), k(!0);
  }, Se = (g) => {
    T(g), M(null), d.setFieldsValue({
      name: g.name,
      description: g.description,
      category: g.category,
      domain: g.domain
    }), N(), k(!0);
  }, x = (g) => {
    T(null), M(g), d.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: g.name, defaultValue: "{{name}} (copy)" }),
      description: g.description,
      category: g.category,
      domain: g.domain
    }), N(), k(!0);
  }, q = () => {
    d.validateFields().then(async (g) => {
      z(!0);
      try {
        if (u) {
          const R = {
            name: g.name,
            description: g.description ?? "",
            category: g.category ?? "",
            domain: g.domain ?? ""
          };
          if (await S.system.updateSkill({ id: u.id }, R), a) {
            const J = As(ne, w);
            await S.system.replaceSkillAiToolBindings(
              { id: u.id },
              { bindings: J }
            );
          }
          r.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (F) {
          const R = {
            source_id: F.id,
            name: g.name,
            description: g.description ?? "",
            category: g.category ?? "",
            domain: g.domain ?? ""
          }, { id: J } = await S.system.cloneSkill(R);
          r.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), k(!1), M(null), d.resetFields(), N(), H(), J && s(`/system/settings/skills/${J}/edit`);
          return;
        } else {
          const R = {
            name: g.name,
            description: g.description ?? "",
            category: g.category ?? "",
            domain: g.domain ?? "",
            content: g.content ?? ""
          };
          await S.system.createSkill(R), r.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        k(!1), T(null), M(null), d.resetFields(), N(), H();
      } catch {
        r.error(
          u ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : F ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        z(!1);
      }
    });
  }, _ = () => {
    var ee, se;
    const g = (ee = h.getFieldValue("file")) == null ? void 0 : ee.fileList, R = ((se = g == null ? void 0 : g[0]) == null ? void 0 : se.originFileObj) ?? (g == null ? void 0 : g[0]);
    if (!R) {
      r.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const J = h.getFieldValue("category"), de = h.getFieldValue("domain");
    we({ body: { category: J, domain: de }, file: R });
  }, O = a && u, te = O ? 720 : 560, ge = !u && !F, Je = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (g, R) => /* @__PURE__ */ e.jsxs(Z, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: g }),
        R.is_preset ? /* @__PURE__ */ e.jsx(re, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (g) => g ? /* @__PURE__ */ e.jsx(re, { children: g }) : "-", width: 180 },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (g) => g ? /* @__PURE__ */ e.jsx(re, { color: "blue", children: g }) : "-", width: 180 },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (g, R) => {
        const J = R.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          me,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(re, { color: J ? "green" : "red", children: J ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Ze,
              {
                title: J ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  ue,
                  {
                    size: "small",
                    checked: J,
                    loading: P === R.id,
                    onChange: (de) => void Te(R, de)
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
      render: (g, R) => /* @__PURE__ */ e.jsx(
        He,
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
              onClick: async () => Se(R),
              permission: "system:skills:update",
              disabled: !!R.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(gt, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => x(R),
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
                onConfirm: async () => be(R.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(De, { justify: "space-between", align: "middle", children: [
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
            value: p,
            onChange: c,
            options: Q.map((g) => ({ value: g, label: g }))
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: () => H(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(me, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ne, {}), onClick: fe, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(me, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ot, {}), onClick: () => L(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(le, { children: [
      /* @__PURE__ */ e.jsx(
        Oe,
        {
          rowKey: "id",
          loading: m,
          columns: Je,
          dataSource: he,
          pagination: { total: Ce, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        oe,
        {
          title: u ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : F ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: n,
          onOk: q,
          onCancel: () => {
            k(!1), T(null), M(null), N();
          },
          confirmLoading: I,
          width: te,
          children: /* @__PURE__ */ e.jsxs(i, { form: d, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(i.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(i.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(dt, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(i.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(i.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Q.map((g) => ({ value: g, label: g })) }) }),
            ge && /* @__PURE__ */ e.jsx(i.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(dt, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            O && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(ye, { spinning: W, children: X.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(Z, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: X.map((g) => {
                const R = (g.tools || []).map((se) => se.name), J = ne[g.id] || [], de = R.length > 0 && J.length === R.length, ee = J.length > 0 && J.length < R.length;
                return /* @__PURE__ */ e.jsx(
                  le,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        Qe,
                        {
                          checked: de,
                          indeterminate: ee,
                          onChange: (se) => ae(g.id, R, se.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: g.name })
                    ] }),
                    extra: g.description ? /* @__PURE__ */ e.jsx("span", { children: g.description }) : void 0,
                    children: (g.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(Qe.Group, { style: { width: "100%" }, value: J, onChange: (se) => v(g.id, se), children: /* @__PURE__ */ e.jsx(Z, { direction: "vertical", style: { width: "100%" }, children: (g.tools || []).map((se) => /* @__PURE__ */ e.jsx(Qe, { value: se.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: se.name }),
                      se.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: se.description })
                    ] }) }, se.name)) }) }) : /* @__PURE__ */ e.jsx(
                      Ue,
                      {
                        image: Ue.PRESENTED_IMAGE_SIMPLE,
                        description: t("settings.skills.aiToolsetNoTools", { defaultValue: "No tools available in this toolset." })
                      }
                    )
                  },
                  g.id
                );
              }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                  defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                }) }),
                /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, children: [
                  w.map((g, R) => /* @__PURE__ */ e.jsxs(
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
                            value: g.toolset_id,
                            options: Vt(G, g.toolset_id),
                            filterOption: (J, de) => {
                              const ee = de;
                              return `${(ee == null ? void 0 : ee.value) ?? ""} ${(ee == null ? void 0 : ee.label) ?? ""}`.toLowerCase().includes(J.toLowerCase());
                            },
                            onChange: (J) => {
                              const de = typeof J == "string" ? J : "";
                              D(
                                (ee) => ee.map((se, Le) => Le === R ? { ...se, toolset_id: de } : se)
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
                            value: g.tool_name,
                            options: Es(
                              X,
                              g.toolset_id,
                              g.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (J, de) => {
                              const ee = de;
                              return `${(ee == null ? void 0 : ee.value) ?? ""} ${(ee == null ? void 0 : ee.label) ?? ""}`.toLowerCase().includes(J.toLowerCase());
                            },
                            onChange: (J) => {
                              const de = typeof J == "string" ? J : "";
                              D(
                                (ee) => ee.map((se, Le) => Le === R ? { ...se, tool_name: de } : se)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          E,
                          {
                            type: "default",
                            danger: !0,
                            style: { flexShrink: 0 },
                            onClick: () => D((J) => J.filter((de, ee) => ee !== R)),
                            children: l("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    R
                  )),
                  /* @__PURE__ */ e.jsx(E, { type: "dashed", onClick: () => D((g) => [...g, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                ] })
              ] })
            ] }) : /* @__PURE__ */ e.jsx(
              Ue,
              {
                image: Ue.PRESENTED_IMAGE_SIMPLE,
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
          open: b,
          onOk: _,
          onCancel: () => L(!1),
          confirmLoading: _e,
          children: /* @__PURE__ */ e.jsxs(i, { form: h, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(i.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(Ct, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ot, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(i.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(i.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Q.map((g) => ({ value: g, label: g })) }) })
          ] })
        }
      )
    ] })
  ] });
}, Os = () => {
  const t = je(), { t: l } = Y("system"), { t: s } = Y("task"), { t: a } = Y("common"), [d] = i.useForm(), { data: o } = C(S.system.listLogStorageBackends), { data: f } = C(S.system.getTaskSettingFields), p = (o ?? []).map((b) => ({
    value: b.id,
    label: l(`settings.task.logStorage.${b.id}`, { defaultValue: b.name })
  })), { loading: c, refresh: n } = C(S.system.getTaskSettings, {
    onSuccess: (b) => {
      b && d.setFieldsValue(b);
    },
    onError: () => {
      r.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: k, run: u } = C(S.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n();
    },
    onError: () => {
      r.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), T = (b) => {
    u(b);
  }, F = (b) => {
    switch (b.value_type) {
      case "int":
      case "number":
        return /* @__PURE__ */ e.jsx(
          ce,
          {
            style: { width: "100%" },
            addonAfter: b.key.includes("retention_days") ? l("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "percentage":
        return /* @__PURE__ */ e.jsx(ce, { style: { width: "100%" }, min: 0, max: 100, step: 0.01, addonAfter: "%" });
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
  return /* @__PURE__ */ e.jsx(ye, { spinning: c, children: /* @__PURE__ */ e.jsxs(
    i,
    {
      form: d,
      layout: "vertical",
      onFinish: T,
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
                options: p,
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
            children: F(b)
          },
          b.key
        )),
        /* @__PURE__ */ e.jsx(i.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: k, icon: /* @__PURE__ */ e.jsx(Be, {}), children: a("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(E, { onClick: () => n(), icon: /* @__PURE__ */ e.jsx(ke, {}), children: a("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(me, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Dt, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: Ps } = V, Ms = /^[-_a-zA-Z0-9.]+$/, Ns = () => {
  const t = je(), { t: l, i18n: s } = Y("system"), { t: a } = Y("common"), d = (j) => {
    if (!j) return "-";
    const G = new Date(j);
    return Number.isNaN(G.getTime()) ? "-" : G.toLocaleString(s.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [o] = i.useForm(), [f, p] = y(!1), [c, n] = y(null), [k, u] = y(""), [T, F] = y(1), [M, b] = y(10), { loading: L, data: h, refresh: I } = C(
    () => ls({ current: T, page_size: M, search: k }),
    {
      refreshDeps: [T, M, k],
      onError: (j) => {
        r.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", j);
      }
    }
  ), { loading: z, run: P } = C(
    (j) => as(j),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), p(!1), o.resetFields(), n(null), I();
      },
      onError: (j) => {
        r.error((j == null ? void 0 : j.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: B, run: X } = C(
    ({ id: j, ...G }) => is({ id: j }, G),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), p(!1), o.resetFields(), n(null), I();
      },
      onError: (j) => {
        r.error((j == null ? void 0 : j.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: K } = C(
    (j) => ns({ id: j }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), I();
      },
      onError: (j) => {
        r.error((j == null ? void 0 : j.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), ne = () => {
    n(null), o.resetFields(), o.setFieldsValue({ status: "active" }), p(!0);
  }, U = (j) => {
    n(j), o.setFieldsValue({
      name: j.name,
      slug: j.slug,
      description: j.description,
      status: j.status
    }), p(!0);
  }, w = (j) => {
    oe.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${j.name}"? This action cannot be undone.`
      }),
      onOk: () => K(j.id)
    });
  }, D = () => {
    o.validateFields().then((j) => {
      c ? X({ id: c.id, ...j }) : P(j);
    });
  }, W = [
    {
      title: l("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: l("settings.organizations.slug", { defaultValue: "Slug" }),
      dataIndex: "slug",
      key: "slug",
      render: (j) => j || "-"
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
      render: (j) => /* @__PURE__ */ e.jsx(re, { color: j === "active" ? "green" : "default", children: j === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (j) => d(j)
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (j, G) => /* @__PURE__ */ e.jsx(
        He,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(ft, {}),
              onClick: async () => t(`/system/settings/organizations/${G.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Me, {}),
              onClick: async () => U(G),
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
    le,
    {
      title: l("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: I, children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(me, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ne, {}), onClick: ne, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (j) => {
                u(j), F(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Oe,
            {
              columns: W,
              dataSource: (h == null ? void 0 : h.data) || [],
              loading: L,
              rowKey: "id",
              pagination: {
                current: T,
                pageSize: M,
                total: (h == null ? void 0 : h.total) || 0,
                showSizeChanger: !0,
                showTotal: (j, G) => a("pagination.total", {
                  defaultValue: `${G[0]}-${G[1]} of ${j} items`,
                  start: G[0],
                  end: G[1],
                  total: j
                }),
                onChange: (j, G) => {
                  F(j), b(G);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          oe,
          {
            title: c ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: f,
            onOk: D,
            onCancel: () => {
              p(!1), o.resetFields(), n(null);
            },
            confirmLoading: z || B,
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
                    pattern: Ms,
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
                  children: /* @__PURE__ */ e.jsx(Ps, { rows: 3 })
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
}, Rs = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = Y("system"), s = je(), a = es(), f = a.hash.replace("#", "") || "base", { enableMultiOrg: p } = bt(), { hasPermission: c } = ss(), n = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(Ss, {}),
      hidden: !c("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(js, {}),
      hidden: !c("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(ys, {}),
      hidden: !c("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Vs, {}),
      hidden: !c("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(ks, {}),
      hidden: !c("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(ws, {}),
      hidden: !c("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(Fs, {}),
      hidden: !c("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(zs, {}),
      hidden: !c("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Os, {}),
      hidden: !c("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...p ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Ns, {}),
      hidden: !c("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(le, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    ct,
    {
      defaultActiveKey: f,
      onChange: (k) => {
        s(`${a.pathname}#${k}`);
      },
      items: t(n.filter((k) => !k.hidden), l)
    }
  ) });
}, kl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rs
}, Symbol.toStringTag, { value: "Module" })), Ls = () => {
  var _e, we, xe;
  const t = je(), { id: l } = Xe(), { t: s } = Y("system"), { t: a } = Y("common"), [d] = i.useForm(), [o] = i.useForm(), [f, p] = y(!1), [c, n] = y(!1), [k, u] = y(null), [T, F] = y(""), [M, b] = y(1), [L, h] = y(10), { data: I, loading: z, refresh: P } = C(
    () => os({ id: l }),
    {
      ready: !!l,
      onError: (v) => {
        r.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", v);
      }
    }
  ), { data: B, loading: X, refresh: K } = C(
    () => rs({ id: l, current: M, page_size: L, search: T }),
    {
      ready: !!l,
      refreshDeps: [l, M, L, T],
      onError: (v) => {
        r.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", v);
      }
    }
  ), { data: ne, loading: U } = C(
    () => ms({ current: 1, page_size: 1e3 }),
    {
      ready: f
    }
  ), { data: w, loading: D } = C(
    () => gs({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: W, run: j } = C(
    (v) => ds({ id: l }, v),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), p(!1), d.resetFields(), K();
      },
      onError: (v) => {
        r.error((v == null ? void 0 : v.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: G, run: N } = C(
    (v) => us({ id: l, user_id: k == null ? void 0 : k.id }, v),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), n(!1), o.resetFields(), u(null), K();
      },
      onError: (v) => {
        r.error((v == null ? void 0 : v.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: m } = C(
    (v) => cs({ id: l, user_id: v }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), K();
      },
      onError: (v) => {
        r.error((v == null ? void 0 : v.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), A = () => {
    p(!0), d.resetFields();
  }, H = (v) => {
    var ae;
    u(v), o.setFieldsValue({
      role_ids: ((ae = v.organization_roles) == null ? void 0 : ae.map((fe) => fe.id)) || []
    }), n(!0);
  }, Q = (v) => {
    oe.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${v.full_name || v.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => m(v.id)
    });
  }, he = () => {
    d.validateFields().then((v) => {
      j(v);
    });
  }, Ce = () => {
    o.validateFields().then((v) => {
      N(v);
    });
  }, be = ((_e = ne == null ? void 0 : ne.data) == null ? void 0 : _e.filter((v) => {
    var ae;
    return !((ae = B == null ? void 0 : B.data) != null && ae.some((fe) => fe.id === v.id));
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
      render: (v) => /* @__PURE__ */ e.jsx(re, { color: v === "active" ? "green" : "default", children: v === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : v })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (v, ae) => {
        var fe;
        return /* @__PURE__ */ e.jsx(Z, { wrap: !0, children: ((fe = ae.organization_roles) == null ? void 0 : fe.map((Se) => /* @__PURE__ */ e.jsx(re, { children: Se.name }, Se.id))) || /* @__PURE__ */ e.jsx(re, { children: "No roles" }) });
      }
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (v, ae) => /* @__PURE__ */ e.jsx(
        He,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Me, {}),
              onClick: async () => H(ae)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              danger: !0,
              onClick: async () => Q(ae)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      le,
      {
        title: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            E,
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
        extra: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: () => {
          P(), K();
        }, children: a("refresh", { defaultValue: "Refresh" }) }),
        loading: z,
        children: /* @__PURE__ */ e.jsxs(ie, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(ie.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: I == null ? void 0 : I.name }),
          /* @__PURE__ */ e.jsx(ie.Item, { label: s("settings.organizations.slug", { defaultValue: "Slug" }), children: (I == null ? void 0 : I.slug) || "-" }),
          /* @__PURE__ */ e.jsx(ie.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(re, { color: (I == null ? void 0 : I.status) === "active" ? "green" : "default", children: (I == null ? void 0 : I.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(ie.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (I == null ? void 0 : I.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      le,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ne, {}), onClick: A, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (v) => {
                F(v), b(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Oe,
            {
              columns: Te,
              dataSource: (B == null ? void 0 : B.data) || [],
              loading: X,
              rowKey: "id",
              pagination: {
                current: M,
                pageSize: L,
                total: (B == null ? void 0 : B.total) || 0,
                showSizeChanger: !0,
                showTotal: (v) => a("pagination.total", { defaultValue: `Total ${v} items` }),
                onChange: (v, ae) => {
                  b(v), h(ae);
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
        onOk: he,
        onCancel: () => {
          p(!1), d.resetFields();
        },
        confirmLoading: W,
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
                  filterOption: (v, ae) => ((ae == null ? void 0 : ae.label) ?? "").toLowerCase().includes(v.toLowerCase()),
                  options: be.map((v) => ({
                    label: `${v.full_name || v.username} (${v.email})`,
                    value: v.id
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
                  options: ((we = w == null ? void 0 : w.data) == null ? void 0 : we.map((v) => ({
                    label: v.name,
                    value: v.id
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
        open: c,
        onOk: Ce,
        onCancel: () => {
          n(!1), o.resetFields(), u(null);
        },
        confirmLoading: G,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(i, { form: o, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            i.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                V,
                {
                  value: (k == null ? void 0 : k.full_name) || (k == null ? void 0 : k.username),
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
                  options: ((xe = w == null ? void 0 : w.data) == null ? void 0 : xe.map((v) => ({
                    label: v.name,
                    value: v.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, Sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ls
}, Symbol.toStringTag, { value: "Module" })), Us = $e(() => import("./markdown-viewer.js")), Ds = ps(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: ut } = V, qs = (t) => t.toLowerCase().endsWith(".md");
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
const $s = () => {
  const { styles: t } = Ds(), { id: l } = Xe(), s = je(), { t: a } = Y("system"), [d, o] = y(null), [f, p] = y(null), [c, n] = y(!1), [k, u] = y(""), [T, F] = y(!1), [M, b] = y([]), [L, h] = y(!1), [I, z] = y(!1), [P, B] = y(""), [X] = i.useForm(), [K, ne] = y(null), [U, w] = y(null), [D, W] = y(""), [j] = i.useForm(), { data: G } = C(
    () => l ? S.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: N, loading: m, refresh: A } = C(
    () => l ? S.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (_) => {
        if (!d) {
          for (const O of _)
            if (!O.is_dir && O.name === "SKILL.md") {
              p(O.path), o(O.path), n(!1);
              return;
            }
          for (const O of _)
            if (!O.is_dir && O.name === "SKILLS.md") {
              p(O.path), o(O.path), n(!1);
              return;
            }
        }
      }
    }
  ), H = (G == null ? void 0 : G.data) ?? G, Q = !!(H != null && H.is_preset), he = (N == null ? void 0 : N.data) ?? N ?? [], Ce = Fe(() => kt(he), [he]), be = c && f ? f : d ? et(d) : "";
  Pe(() => {
    d && l ? (S.system.getSkillFile({ id: l, path: d }).then((_) => {
      u(_.data);
    }).catch(() => r.error(a("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), F(!1)) : (u(""), F(!1));
  }, [l, d, a]);
  const Te = () => {
    !l || !d || Q || S.system.putSkillFile({ id: l, path: d }, k).then(() => {
      r.success(a("settings.skills.editor.saved", { defaultValue: "Saved" })), F(!1);
    }).catch(() => r.error(a("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, _e = (_, O) => {
    const te = String(O.node.key), ge = !O.node.isLeaf;
    p(te), n(ge), O.node.isLeaf ? o(te) : o(null);
  }, we = (_) => {
    _.event.preventDefault(), ne({
      path: String(_.node.key),
      isDir: !_.node.isLeaf,
      x: _.event.clientX,
      y: _.event.clientY
    });
  }, xe = pe(() => ne(null), []), v = pe(
    (_) => {
      if (!l || !K || Q) return;
      const { path: O, isDir: te } = K;
      switch (xe(), _) {
        case "open":
          o(O), p(O), n(!1);
          break;
        case "rename": {
          const ge = O.includes("/") ? O.split("/").pop() : O;
          w({ path: O, isDir: te }), W(ge), setTimeout(() => j.setFieldsValue({ name: ge }), 0);
          break;
        }
        case "delete":
          oe.confirm({
            title: a("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: te ? a("settings.skills.editor.deleteConfirmContentDir", { path: O, defaultValue: `Delete ${O}? This will remove the folder and all its contents.` }) : a("settings.skills.editor.deleteConfirmContent", { path: O, defaultValue: `Delete ${O}?` }),
            onOk: () => S.system.deleteSkillPath({ id: l, path: O }).then(() => {
              r.success(a("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === O && (o(null), u("")), f === O && (p(null), n(!1)), A();
            }).catch(() => r.error(a("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          p(O), n(te), h(!0);
          break;
        case "newDir":
          p(O), n(te), z(!0);
          break;
      }
    },
    [l, K, xe, A, d, f, j, a, Q]
  ), ae = () => {
    if (!l || !U || Q) return;
    const _ = (j.getFieldValue("name") ?? D).trim();
    if (!_) {
      r.error(a("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!U.isDir && !/\.(md|txt)$/i.test(_)) {
      r.error(a("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const O = et(U.path), te = O ? `${O}/${_}` : _;
    if (te === U.path) {
      w(null);
      return;
    }
    S.system.moveSkillPath({ id: l }, { from_path: U.path, to_path: te }).then(() => {
      r.success(a("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === U.path && o(te), f === U.path && p(te), w(null), A();
    }).catch(() => r.error(a("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, fe = (_) => {
    if (!l || Q) return;
    const O = String(_.dragNode.key), te = String(_.dragNode.title);
    let ge;
    if (_.dropToGap) {
      const Je = et(String(_.node.key));
      ge = Je ? `${Je}/${te}` : te;
    } else
      ge = `${_.node.key}/${te}`;
    ge !== O && S.system.moveSkillPath({ id: l }, { from_path: O, to_path: ge }).then(() => {
      r.success(a("settings.skills.editor.moved", { defaultValue: "Moved" })), d === O && o(ge), f === O && p(ge), A();
    }).catch(() => r.error(a("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, Se = () => {
    const _ = P.trim();
    if (!_ || !l || Q) return;
    const O = be ? `${be}/${_}` : _;
    if (!/\.(md|txt)$/i.test(_)) {
      r.error(a("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    S.system.putSkillFile({ id: l, path: O }, "").then(() => {
      r.success(a("settings.skills.editor.fileCreated", { defaultValue: "File created" })), h(!1), B(""), A(), o(O), u("");
    }).catch(() => r.error(a("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, x = () => {
    var te;
    const _ = (te = X.getFieldValue("name")) == null ? void 0 : te.trim();
    if (!_ || !l || Q) return;
    const O = be ? `${be}/${_}` : _;
    S.system.createSkillDir({ id: l }, { path: O }).then(() => {
      r.success(a("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), z(!1), X.resetFields(), A();
    }).catch(() => r.error(a("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, q = () => {
    const _ = f || d;
    !l || !_ || Q || oe.confirm({
      title: a("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: a("settings.skills.editor.deleteConfirmContent", { path: _, defaultValue: `Delete ${_}?` }),
      onOk: () => S.system.deleteSkillPath({ id: l, path: _ }).then(() => {
        r.success(a("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === _ && (o(null), u("")), f === _ && (p(null), n(!1)), A();
      }).catch(() => r.error(a("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    le,
    {
      title: (H == null ? void 0 : H.name) ?? a("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => s("/system/settings#skills"), children: a("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        Q ? /* @__PURE__ */ e.jsx(
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
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(Ne, {}), disabled: Q, onClick: () => h(!0), children: a("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(ht, {}), disabled: Q, onClick: () => z(!0), children: a("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            m ? /* @__PURE__ */ e.jsx("div", { children: a("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              Tt,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !Q,
                expandedKeys: M,
                onExpand: (_) => b(_),
                selectedKeys: f ? [f] : [],
                onSelect: _e,
                onRightClick: Q ? void 0 : we,
                onDrop: fe,
                className: t.fileTree,
                treeData: Ce
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(Z, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Be, {}), disabled: Q || !T, onClick: Te, children: a("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(E, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ie, {}), disabled: Q, onClick: q, children: a("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              qs(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  ut,
                  {
                    value: k,
                    readOnly: Q,
                    onChange: (_) => {
                      u(_.target.value), F(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(qe, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(Us, { content: yt(k) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                ut,
                {
                  value: k,
                  readOnly: Q,
                  onChange: (_) => {
                    u(_.target.value), F(!0);
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
              onClick: xe,
              onContextMenu: (_) => _.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: K.x, top: K.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            Ft,
            {
              selectable: !1,
              items: [
                ...K.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(xt, {}), label: a("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Me, {}), label: a("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ie, {}), label: a("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(qt, {}), label: a("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx($t, {}), label: a("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: _ }) => v(_)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(oe, { title: a("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: L, onOk: Se, onCancel: () => {
          h(!1), B("");
        }, okText: a("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: a("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: P, onChange: (_) => B(_.target.value) }) }),
        /* @__PURE__ */ e.jsx(oe, { title: a("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: I, onOk: () => X.validateFields().then(x), onCancel: () => z(!1), okText: a("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(i, { form: X, layout: "vertical", children: /* @__PURE__ */ e.jsx(i.Item, { name: "name", label: a("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, { placeholder: a("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          oe,
          {
            title: a("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!U,
            onOk: ae,
            onCancel: () => w(null),
            okText: a("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(i, { form: j, layout: "vertical", onValuesChange: (_, O) => W(O.name ?? ""), children: /* @__PURE__ */ e.jsx(i.Item, { name: "name", label: U != null && U.isDir ? a("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : a("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              V,
              {
                placeholder: U != null && U.isDir ? a("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : a("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => ae()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $s
}, Symbol.toStringTag, { value: "Module" })), Bs = $e(() => import("./markdown-viewer.js")), Hs = () => {
  const { id: t } = Xe(), l = je(), { t: s } = Y("system"), { data: a, loading: d } = C(
    () => t ? S.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: o, loading: f, mutate: p } = C(
    () => t ? S.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => r.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => p()
    }
  ), c = (a == null ? void 0 : a.data) ?? a, n = Fe(() => o == null ? void 0 : o.map((u) => ({
    key: u.file_name,
    label: u.file_name,
    children: /* @__PURE__ */ e.jsx(qe, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(Bs, { content: yt(u.content) }) })
  })), [o]);
  if (!t) return null;
  const k = d || f;
  return /* @__PURE__ */ e.jsx(ye, { spinning: k, children: /* @__PURE__ */ e.jsx(
    le,
    {
      title: (c == null ? void 0 : c.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: n
    }
  ) });
}, _l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hs
}, Symbol.toStringTag, { value: "Module" })), { Text: ve, Title: Js } = mt, Ks = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(Gt, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(Wt, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Kt, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(st, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(We, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(Jt, {}) },
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
}, Ws = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: a } = Ye(t);
  return a ? /* @__PURE__ */ e.jsxs(ie, { size: "small", column: 2, bordered: !0, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ie.Item,
      {
        label: l("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ie.Item,
      {
        label: l("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ie.Item,
      {
        label: l("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ie.Item,
      {
        label: l("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: s.active_tokens
      }
    )
  ] }) : /* @__PURE__ */ e.jsx(ze, { content: t });
}, Gs = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: a } = Ye(t);
  return a ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(ve, { strong: !0, children: [
        l("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(re, { color: "blue", children: s.tool })
    ] }),
    s.arguments && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(ve, { strong: !0, children: [
        l("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(ze, { content: s.arguments, maxHeight: 200 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(ze, { content: t });
}, Zs = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: a } = Ye(t);
  return a ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(ve, { strong: !0, children: [
        l("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(ve, { code: !0, children: s.tool_call_id })
    ] }),
    s.result && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(ve, { strong: !0, children: [
        l("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(ze, { content: s.result, maxHeight: 300 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(ze, { content: t });
}, Xs = ({ event: t, t: l }) => {
  switch (t.event_type) {
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Ws, { content: t.content, t: l });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(Gs, { content: t.content, t: l });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(Zs, { content: t.content, t: l });
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
}, Ys = () => {
  const { t } = Y("ai"), l = je(), [s, a] = y(""), [d, o] = y(""), {
    data: f,
    loading: p,
    refresh: c
  } = C(() => S.ai.getAiTraceStatus(), {
    onError: () => {
      r.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), n = (f == null ? void 0 : f.enabled) ?? !1, { loading: k, run: u } = C(
    (P) => S.ai.toggleAiTrace({ enabled: P }),
    {
      manual: !0,
      onSuccess: (P, [B]) => {
        r.success(
          B ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), c(), B || o("");
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
    data: T,
    loading: F,
    run: M
  } = C(
    (P) => S.ai.getAiTraceEvents({ trace_id: P }),
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
  ), b = pe(() => {
    s.trim() && (o(s.trim()), M(s.trim()));
  }, [s, M]), L = pe(
    (P) => {
      const B = P ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      oe.confirm({
        title: P ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: B,
        onOk: () => u(P)
      });
    },
    [t, u]
  ), h = pe(async () => {
    if (d)
      try {
        const P = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!P.ok) throw new Error("download failed");
        const B = await P.blob(), X = window.URL.createObjectURL(B), K = document.createElement("a");
        K.href = X, K.download = `ai-trace-${d}.json`, document.body.appendChild(K), K.click(), window.URL.revokeObjectURL(X), document.body.removeChild(K);
      } catch {
        r.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, t]), I = Fe(() => T ?? [], [T]), z = Fe(
    () => I.map((P) => {
      const B = Ks[P.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(We, {})
      }, X = t(
        `trace.eventTypes.${P.event_type}`,
        { defaultValue: P.event_type }
      );
      return {
        key: P.id,
        dot: B.icon,
        color: B.color,
        children: /* @__PURE__ */ e.jsx(
          It,
          {
            size: "small",
            defaultActiveKey: [P.id],
            items: [
              {
                key: P.id,
                label: /* @__PURE__ */ e.jsxs(Z, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(re, { color: B.color, children: X }),
                  /* @__PURE__ */ e.jsxs(ve, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    P.step_order
                  ] }),
                  P.duration_ms > 0 && /* @__PURE__ */ e.jsxs(ve, { type: "secondary", style: { fontSize: 12 }, children: [
                    t("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    P.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(ve, { type: "secondary", style: { fontSize: 12 }, children: new Date(P.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Xs, { event: P, t })
              }
            ]
          }
        )
      };
    }),
    [I, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
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
              E,
              {
                icon: /* @__PURE__ */ e.jsx(it, {}),
                onClick: () => l("/system/settings#ai-models"),
                children: t("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(Js, { level: 4, style: { margin: 0 }, children: t("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(Z, { children: [
            /* @__PURE__ */ e.jsx(ve, { children: n ? t("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : t("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              ue,
              {
                checked: n,
                loading: p || k,
                onChange: L
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Z.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        V,
        {
          placeholder: t("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: s,
          onChange: (P) => a(P.target.value),
          onPressEnter: b,
          prefix: /* @__PURE__ */ e.jsx(Bt, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(E, { type: "primary", onClick: b, loading: F, children: t("trace.search", { defaultValue: "Search" }) }),
      d && I.length > 0 && /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Ht, {}), onClick: h, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    F ? /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ye, { size: "large" }) }) }) : d && I.length === 0 ? /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(
      Ue,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : I.length > 0 ? /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(At, { items: z }) }) : null
  ] });
}, wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ys
}, Symbol.toStringTag, { value: "Module" })), Qs = $e(() => import("./json-schema-config-form.js")), { Text: Ee, Title: el } = mt;
function lt(t) {
  try {
    return { parsed: JSON.parse(t), isJSON: !0 };
  } catch {
    return { parsed: null, isJSON: !1 };
  }
}
const tl = ({
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
}, sl = () => {
  var G;
  const { t } = Y("system"), { t: l } = Y("common"), s = je(), { id: a } = Xe(), [d, o] = y(void 0), [f, p] = y("schema"), [c, n] = y({}), [k, u] = y("{}"), [T, F] = y(null), [M, b] = y(null), { loading: L, data: h } = C(
    () => S.system.getToolSet({ id: a }),
    {
      ready: !!a,
      onError: () => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: I, data: z } = C(
    () => S.system.getToolSetTools({ id: a }),
    {
      ready: !!a,
      onError: () => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), P = z == null ? void 0 : z.find(
    (N) => {
      var m;
      return ((m = N.function) == null ? void 0 : m.name) === d;
    }
  ), { loading: B, run: X } = C(
    (N, m) => S.system.callTool({ id: a }, { name: N, parameters: m }),
    {
      manual: !0,
      onSuccess: (N) => {
        F((N == null ? void 0 : N.result) ?? "");
      },
      onError: (N) => {
        var A, H;
        const m = ((H = (A = N == null ? void 0 : N.response) == null ? void 0 : A.data) == null ? void 0 : H.message) || (N == null ? void 0 : N.message) || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        r.error(m), F(null);
      }
    }
  ), K = pe((N) => {
    o(N), n({}), u("{}"), F(null), b(null);
  }, []), ne = pe(() => {
    if (f === "schema")
      u(JSON.stringify(c, null, 2)), p("code");
    else {
      const { parsed: N, isJSON: m } = lt(k);
      m && (n(N ?? {}), b(null)), p("schema");
    }
  }, [f, c, k]), U = pe((N) => {
    u(N);
    const { parsed: m, isJSON: A } = lt(N);
    A ? (n(m ?? {}), b(null)) : b(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), w = pe(() => {
    if (!d) {
      r.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let N;
    if (f === "code") {
      if (M) {
        r.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      N = k;
    } else
      N = JSON.stringify(c);
    F(null), X(d, N);
  }, [d, f, c, k, M, X, t]), D = h, W = (D == null ? void 0 : D.status) === "enabled" ? "green" : "red", j = (D == null ? void 0 : D.status) === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(Z, { children: [
      /* @__PURE__ */ e.jsx(
        E,
        {
          icon: /* @__PURE__ */ e.jsx(it, {}),
          onClick: () => s("/system/settings#ai-toolsets"),
          children: t("settings.toolsets.backToList", { defaultValue: "Back" })
        }
      ),
      /* @__PURE__ */ e.jsx(el, { level: 4, style: { margin: 0 }, children: t("settings.toolsets.debugTitle", { defaultValue: "Tool Debug" }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, loading: L, children: D && /* @__PURE__ */ e.jsxs(ie, { column: 2, size: "small", children: [
      /* @__PURE__ */ e.jsx(ie.Item, { label: t("settings.toolsets.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: D.name }) }),
      /* @__PURE__ */ e.jsx(ie.Item, { label: t("settings.toolsets.type", { defaultValue: "Type" }), children: /* @__PURE__ */ e.jsx(re, { color: "blue", children: String(D.type).toUpperCase() }) }),
      /* @__PURE__ */ e.jsx(ie.Item, { label: t("settings.toolsets.description", { defaultValue: "Description" }), span: 2, children: D.description || "-" }),
      /* @__PURE__ */ e.jsx(ie.Item, { label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(re, { color: W, children: j }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(le, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: t("settings.toolsets.selectTool", { defaultValue: "Select Tool" }) }) }),
        I ? /* @__PURE__ */ e.jsx(ye, { size: "small" }) : /* @__PURE__ */ e.jsx(
          $,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: d,
            onChange: K,
            optionLabelProp: "label",
            children: (z ?? []).map((N) => {
              var Q, he;
              const m = ((Q = N.function) == null ? void 0 : Q.name) ?? "", A = ((he = N.function) == null ? void 0 : he.description) ?? "", H = A ? `${m} - ${A}` : m;
              return /* @__PURE__ */ e.jsx($.Option, { value: m, label: H, children: /* @__PURE__ */ e.jsx(
                "div",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  title: H,
                  children: H
                }
              ) }, m);
            })
          }
        )
      ] }),
      P && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
          /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: t("settings.toolsets.parameters", { defaultValue: "Parameters" }) }),
          /* @__PURE__ */ e.jsx(
            Ze,
            {
              title: f === "schema" ? t("settings.toolsets.switchToCodeEditor", { defaultValue: "Switch to JSON editor" }) : t("settings.toolsets.switchToFormEditor", { defaultValue: "Switch to form editor" }),
              children: /* @__PURE__ */ e.jsx(
                E,
                {
                  size: "small",
                  icon: f === "schema" ? /* @__PURE__ */ e.jsx(Zt, {}) : /* @__PURE__ */ e.jsx(Xt, {}),
                  onClick: ne
                }
              )
            }
          )
        ] }),
        f === "schema" ? (G = P.function) != null && G.parameters ? /* @__PURE__ */ e.jsx(qe, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(
          Qs,
          {
            schema: P.function.parameters,
            value: c,
            onChange: n
          }
        ) }) : /* @__PURE__ */ e.jsx(Ee, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            fs,
            {
              value: k,
              height: "200px",
              extensions: [hs()],
              onChange: U,
              basicSetup: { lineNumbers: !0, foldGutter: !0 }
            }
          ),
          M && /* @__PURE__ */ e.jsx(Ee, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: M })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: T !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        E,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Yt, {}),
          loading: B,
          disabled: !d,
          onClick: w,
          children: t("settings.toolsets.callTool", { defaultValue: "Run" })
        }
      ) }),
      T !== null && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: t("settings.toolsets.result", { defaultValue: "Result" }) }) }),
        /* @__PURE__ */ e.jsx(tl, { content: T, maxHeight: 300 })
      ] })
    ] })
  ] });
}, Cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sl
}, Symbol.toStringTag, { value: "Module" })), ll = () => {
  const { t } = Y("system"), [l] = ts(), s = l.get("provider"), a = l.get("code"), d = l.get("state"), [o, f] = y(null), [p, c] = y(null), [n, k] = y(null);
  return C(async () => {
    if (!a || !d || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const u = await S.system.testOauthCallback({ code: a, state: d, provider: s });
    if (!u.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!u.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    f(u.user), c(u.user_info);
  }, {
    onSuccess: () => {
      k({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (u) => {
      k({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: u.message
      });
    }
  }), n ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    Et,
    {
      status: n.status,
      title: n.message,
      subTitle: n.error,
      extra: /* @__PURE__ */ e.jsxs(Z, { style: { display: !p || !o ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(le, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Ge, { value: p || {} }) }),
        /* @__PURE__ */ e.jsx(le, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Ge, { value: o || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Re, {});
}, Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ll
}, Symbol.toStringTag, { value: "Module" }));
export {
  wl as A,
  Sl as O,
  vl as S,
  Cl as T,
  _l as a,
  Tl as b,
  kl as i
};
