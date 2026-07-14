import { j as e } from "./vendor.js";
import { Form as a, message as r, Spin as he, Switch as de, Select as q, Input as k, Alert as et, Divider as st, Space as G, Button as O, InputNumber as me, Modal as ie, Skeleton as _t, Descriptions as ae, Steps as wt, Tag as ne, Table as Oe, Radio as De, Tabs as dt, Popconfirm as Ct, Tooltip as Ze, Card as te, Row as qe, Col as je, Checkbox as Ye, Empty as Ue, AutoComplete as at, Upload as Tt, Tree as Ft, Menu as It, Collapse as At, Typography as ut, Timeline as Et, Result as zt } from "antd";
import { useTranslation as Z } from "react-i18next";
import { useState as j, useEffect as $e, useMemo as Te, Suspense as Be, lazy as He, useCallback as pe } from "react";
import { useRequest as T } from "ahooks";
import { SaveOutlined as Je, ReloadOutlined as be, LoadingOutlined as Ot, CheckCircleTwoTone as Pt, ClearOutlined as Mt, StarFilled as Lt, CheckCircleOutlined as Rt, StarOutlined as Nt, EditOutlined as Pe, CopyOutlined as ct, DeleteOutlined as Fe, BugOutlined as mt, PlusOutlined as Me, ThunderboltOutlined as Dt, ToolOutlined as tt, SettingOutlined as Ut, FileTextOutlined as We, EyeOutlined as gt, UploadOutlined as it, CalendarOutlined as qt, ArrowLeftOutlined as lt, FolderOutlined as pt, FileOutlined as ft, FileAddOutlined as $t, FolderAddOutlined as Bt, SearchOutlined as Ht, DownloadOutlined as Jt, WarningOutlined as Kt, DashboardOutlined as Wt, MessageOutlined as Gt, SendOutlined as Zt, CodeOutlined as Xt, AlignLeftOutlined as Yt, PlayCircleOutlined as Qt } from "@ant-design/icons";
import { a as v } from "./index.js";
import { g as nt, c as ht, d as Ie } from "./base.js";
import { g as ge, d as es, b as Ke, L as Le } from "./components.js";
import xt from "react-quill";
import { useNavigate as xe, useLocation as ts, useParams as Xe, useSearchParams as ss } from "react-router-dom";
import { b as yt, a as ls } from "./contexts.js";
import { l as as, c as is, u as ns, d as os, g as rs, b as ds, e as us, f as cs, r as ms } from "./system.js";
import { l as gs, b as ps } from "./authorization.js";
import { createStyles as fs } from "antd-style";
import hs from "classnames";
import Ge from "@uiw/react-json-view";
import xs from "@uiw/react-codemirror";
import { json as ys } from "@codemirror/lang-json";
const Ae = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, js = {
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
  const { t: s } = Z("system"), { t: i } = Z("common"), [d] = a.useForm(), [o, f] = j((t == null ? void 0 : t.provider) || "custom"), [p, g] = j((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [n, _] = j((t == null ? void 0 : t.enabled) || !1), [h, F] = j((t == null ? void 0 : t.auto_create_user) || !1), { loading: w, data: M, refresh: V } = T(v.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (C) => {
      d.setFieldsValue(C), f(C.provider), g(C.provider === "custom" || C.provider === "autoDiscover"), _(C.enabled), F(C.auto_create_user);
    },
    onError: (C) => {
      r.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", C);
    }
  });
  $e(() => {
    t && (d.setFieldsValue(t), f(t.provider), g(t.provider === "custom" || t.provider === "autoDiscover"), _(t.enabled), F(t.auto_create_user));
  }, [t, d]);
  const L = (C) => {
    f(C), g(C === "custom" || C === "autoDiscover");
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
  }, b = (C) => {
    _(C);
  }, I = (C) => {
    F(C);
  }, { loading: z, run: P } = T(v.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : V();
    },
    onError: (C) => {
      r.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", C);
    }
  }), $ = (C) => {
    P(C);
  }, Y = () => {
    l ? l() : V();
  }, { loading: W, run: se } = T(async ({ redirect_uri: C, ...D }) => {
    let J;
    return C ? J = new URL(C) : J = new URL(window.location.origin), J.pathname = nt("/system/settings/oauth/test-callback"), J.searchParams.set("provider", o), v.system.testOauthConnection({ redirect_uri: J.toString(), ...D });
  }, {
    manual: !0,
    onSuccess: ({ url: C }) => {
      window.open(C, "_blank");
    },
    onError: (C) => {
      r.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: C.message })), console.error("Failed to test OAuth connection", C);
    }
  }), N = () => o === "custom";
  return /* @__PURE__ */ e.jsx(he, { spinning: w, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: $,
      initialValues: t || M,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: b })
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
            children: /* @__PURE__ */ e.jsxs(q, { onChange: L, disabled: !n, children: [
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
          a.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              k,
              {
                disabled: !n,
                placeholder: o !== "custom" ? s(`settings.oauth.provider.options.${o}`, { defaultValue: o }) : ""
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
            children: /* @__PURE__ */ e.jsx(k, { disabled: !n, placeholder: "https://example.com/icon.png" })
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
            children: /* @__PURE__ */ e.jsx(k, { disabled: !n })
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
            children: /* @__PURE__ */ e.jsx(k.Password, { disabled: !n, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        N() && /* @__PURE__ */ e.jsx(
          a.Item,
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
            children: /* @__PURE__ */ e.jsx(k, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
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
            children: /* @__PURE__ */ e.jsx(k, { disabled: !n })
          }
        ),
        N() && /* @__PURE__ */ e.jsx(
          a.Item,
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
            children: /* @__PURE__ */ e.jsx(k, { disabled: !n })
          }
        ),
        N() && /* @__PURE__ */ e.jsx(
          a.Item,
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
            children: /* @__PURE__ */ e.jsx(k, { disabled: !n })
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
            children: /* @__PURE__ */ e.jsx(k, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(C) => C.getFieldValue("redirect_uri") !== "" ? {
              pattern: Ae,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !n, placeholder: `http://${window.location.host}${nt(`/login?provider=settings.${o}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: I, disabled: !n })
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
                required: n && h,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !n || !h })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs(q, { disabled: !n, children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "new_user_only", children: s("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "temporary", children: s("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          et,
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
            children: /* @__PURE__ */ e.jsx(de, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(st, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          et,
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
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "email", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "login", autoComplete: "off", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "name", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "avatar_url", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "role", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            O,
            {
              type: "primary",
              htmlType: "submit",
              loading: z,
              icon: /* @__PURE__ */ e.jsx(Je, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            O,
            {
              loading: W,
              onClick: async () => {
                const C = d.getFieldsValue();
                se(C);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            O,
            {
              onClick: Y,
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Vs = () => {
  const { t } = Z("system"), { t: l } = Z("common"), [s] = a.useForm(), { loading: i, data: d, refresh: o } = T(v.system.getSecuritySettings, {
    onSuccess: (n) => {
      s.setFieldsValue(n);
    },
    onError: (n) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", n);
    }
  }), { loading: f, run: p } = T(v.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), o();
    },
    onError: (n) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", n);
    }
  }), g = (n) => {
    p(n);
  };
  return /* @__PURE__ */ e.jsx(he, { spinning: i, children: /* @__PURE__ */ e.jsxs(
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
            children: /* @__PURE__ */ e.jsxs(q, { children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
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
            children: /* @__PURE__ */ e.jsx(me, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_notify_days",
            label: t("settings.security.passwordExpiryNotify.label", { defaultValue: "Password Expiry Notification (Days Before Expiry)" }),
            tooltip: t("settings.security.passwordExpiryNotify.tooltip", { defaultValue: "Notify users by email this many days before password expiry. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
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
            shouldUpdate: (n, _) => n.login_failure_lock !== _.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
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
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, _) => n.login_failure_lock !== _.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
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
            shouldUpdate: (n, _) => n.history_password_check !== _.history_password_check,
            children: ({ getFieldValue: n }) => n("history_password_check") ? /* @__PURE__ */ e.jsx(
              a.Item,
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
          a.Item,
          {
            name: "user_inactive_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            O,
            {
              type: "primary",
              htmlType: "submit",
              loading: f,
              icon: /* @__PURE__ */ e.jsx(Je, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            O,
            {
              onClick: () => o(),
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, ks = ({ fetchItems: t, importItems: l, columns: s, ...i }) => {
  const { t: d } = Z("system"), [o, f] = j([]), [p, g] = j([]), { run: n, loading: _ } = T(t, {
    onError: (w) => {
      r.error(d("settings.ldap.importError", { error: `${w.message}` }));
    },
    onSuccess: (w) => {
      f(w);
    },
    manual: !0
  }), { run: h, loading: F } = T(async () => {
    for (const w of p.filter((M) => {
      const V = o.find((L) => L.ldap_dn === M);
      return !(!V || V.status === "imported");
    })) {
      const M = await l([w]);
      f((V) => [...V].map((b) => {
        for (const I of M)
          if (b.ldap_dn === I.ldap_dn)
            return { ...I, status: "imported" };
        return b;
      }));
    }
  }, {
    manual: !0
  });
  return $e(() => {
    i.visible && (f([]), n(), g([]));
  }, [i.visible]), /* @__PURE__ */ e.jsx(
    ie,
    {
      title: d("settings.ldap.importTitle"),
      ...i,
      onOk: () => {
        h();
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
              g(w);
            },
            getCheckboxProps: (w) => ({
              disabled: w.status === "imported"
            })
          },
          columns: s.map(({ render: w, ...M }) => w ? {
            ...M,
            render: (V, L, b) => {
              const I = p.includes(L.ldap_dn) && F && L.status !== "imported";
              return w(V, L, b, I);
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
  var L, b, I;
  const { t } = Z("system"), [l] = a.useForm(), [s, i] = j(!1), [d, o] = j(null), [f, p] = j(!1), [g, n] = j(!1), [_] = a.useForm(), [h, F] = j(!1);
  T(v.system.getLdapSettings, {
    onSuccess: (z) => {
      l.setFieldsValue(z), F(z.enabled);
    },
    onError: (z) => {
      r.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${z.message}` }));
    }
  }), $e(() => {
    o(null);
  }, [f]);
  const w = async (z) => {
    i(!0);
    try {
      await v.system.updateLdapSettings(z), r.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      r.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      i(!1);
    }
  }, { run: M, loading: V } = T(async (z) => {
    const P = await l.validateFields();
    return await v.system.testLdapConnection({
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
      a,
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
            a.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { onChange: (z) => F(z) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: h, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !h, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: h, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !h, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: h, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(k.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: h, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !h, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(k, { disabled: !h, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: h, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: h, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: h, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: h, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(k, { type: "number", defaultValue: 15, disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(st, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(k.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(k.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(k.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(ge, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(O, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ge, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              O,
              {
                disabled: !h,
                style: { marginLeft: 8 },
                onClick: () => p(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ge, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              O,
              {
                disabled: !h,
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
      ie,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: f,
        onCancel: () => p(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            a,
            {
              form: _,
              layout: "vertical",
              onFinish: M,
              children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(k, { disabled: !h })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(k.Password, { disabled: !h })
                  }
                ),
                /* @__PURE__ */ e.jsxs(a.Item, { children: [
                  /* @__PURE__ */ e.jsx(ge, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(O, { disabled: !h, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    O,
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
          /* @__PURE__ */ e.jsx(he, { spinning: V, children: /* @__PURE__ */ e.jsx(_t, { active: V, loading: V, children: d && (d.user ? /* @__PURE__ */ e.jsxs(ae, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(ae.Item, { label: "Username", span: 3, children: d.user.username }),
            /* @__PURE__ */ e.jsx(ae.Item, { label: "Email", span: 3, children: d.user.email }),
            /* @__PURE__ */ e.jsx(ae.Item, { label: "FullName", span: 3, children: d.user.full_name }),
            /* @__PURE__ */ e.jsx(ae.Item, { label: "CreatedAt", span: 3, children: d.user.created_at }),
            /* @__PURE__ */ e.jsx(ae.Item, { label: "UpdatedAt", span: 3, children: d.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            wt,
            {
              direction: "vertical",
              current: (L = d.message) == null ? void 0 : L.findIndex((z) => !z.success),
              status: (b = d.message) != null && b.find((z) => !z.success) ? "error" : "finish",
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
      ks,
      {
        visible: g,
        onCancel: () => n(!1),
        fetchItems: () => v.system.importLdapUsers({}),
        importItems: (z) => v.system.importLdapUsers({ user_dn: z }),
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
          render: (z, P, $, Y) => Y ? /* @__PURE__ */ e.jsx(he, { indicator: /* @__PURE__ */ e.jsx(Ot, { spin: !0 }) }) : z ? /* @__PURE__ */ e.jsx(Pt, { twoToneColor: "#52c41a" }) : P.id ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ne, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, vs = () => {
  const { t } = Z("system"), { t: l } = Z("common"), [s] = a.useForm(), [i, d] = j(null), [o, f] = j(!1), [p] = a.useForm(), [g, n] = j(!1), { data: _ } = T(v.system.getSmtpSettingFields), { loading: h } = T(v.system.getSmtpSettings, {
    onSuccess: (b) => {
      s.setFieldsValue(b), n(b.enabled);
    },
    onError: (b) => {
      r.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${b.message}` }));
    }
  });
  $e(() => {
    d(null);
  }, [o]);
  const { run: F, loading: w } = T(({ port: b, ...I }) => v.system.updateSmtpSettings({ ...I, port: Number(b) }), {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (b) => {
      r.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${b.message}` }));
    }
  }), { run: M, loading: V } = T(async (b) => {
    const { port: I, ...z } = await s.validateFields();
    return await v.system.testSmtpConnection({
      ...b,
      ...z,
      port: Number(I)
    });
  }, {
    onSuccess: (b) => {
      d(b);
    },
    onError: (b) => {
      r.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${b.message}` }));
    },
    manual: !0
  }), L = (b) => {
    switch (b.value_type) {
      case "number":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, disabled: !g, min: b.min, max: b.max, step: b.step });
      case "percentage":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, disabled: !g, min: 0, max: 100, step: b.step || 0.01, addonAfter: "%" });
      case "string_list":
        return /* @__PURE__ */ e.jsx(q, { mode: "tags", tokenSeparators: [","], disabled: !g });
      case "enum":
        return /* @__PURE__ */ e.jsx(q, { disabled: !g, options: b.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(xt, { theme: "snow", readOnly: !g });
      case "string":
      default:
        return /* @__PURE__ */ e.jsx(k, { disabled: !g });
    }
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(he, { spinning: h, children: /* @__PURE__ */ e.jsxs(
      a,
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
            a.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { onChange: (b) => n(b) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: g, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: g, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { type: "number", disabled: !g, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: g, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(k.Password, { disabled: !g, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: g, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(De.Group, { disabled: !g, children: [
                /* @__PURE__ */ e.jsx(De.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(De.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(De.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
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
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(k, { disabled: !g, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.adminEmails", { defaultValue: "Admin Emails" }),
              name: "admin_emails",
              tooltip: t("settings.smtp.adminEmailsTooltip", { defaultValue: "Email addresses that receive admin notifications." }),
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  mode: "tags",
                  tokenSeparators: [","],
                  disabled: !g,
                  placeholder: t("settings.smtp.adminEmailsPlaceholder", { defaultValue: "Enter email addresses" })
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(st, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          (_ || []).map((b) => /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t(b.label_key || `settings.smtp.${b.key}`, { defaultValue: b.key }),
              name: b.key,
              tooltip: b.tooltip_key ? t(b.tooltip_key, { defaultValue: "" }) : void 0,
              children: L(b)
            },
            b.key
          )),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(ge, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(O, { type: "primary", htmlType: "submit", loading: w, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              O,
              {
                onClick: () => f(!0),
                disabled: !g || V,
                loading: V,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ie,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: o,
        onCancel: () => f(!1),
        footer: [
          /* @__PURE__ */ e.jsx(O, { onClick: () => f(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(O, { type: "primary", loading: V, onClick: () => p.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: p,
            layout: "vertical",
            onFinish: (b) => M(b),
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
                  children: /* @__PURE__ */ e.jsx(k, { placeholder: "test@example.com" })
                }
              ),
              i && /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: i.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: i.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, _s = () => {
  const { t, i18n: l } = Z("system"), { t: s } = Z("common"), [i] = a.useForm(), { loading: d, data: o, refresh: f } = T(v.system.getSystemBaseSettings, {
    onSuccess: (F) => {
      i.setFieldsValue(F);
    },
    onError: (F) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", F);
    }
  }), { loading: p, run: g } = T(v.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), f();
    },
    onError: (F) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", F);
    }
  }), { loading: n, run: _ } = T(v.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      r.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (F) => {
      r.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", F);
    }
  }), h = (F) => {
    g(F);
  };
  return /* @__PURE__ */ e.jsx(he, { spinning: d, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: i,
      layout: "vertical",
      onFinish: h,
      initialValues: o,
      children: [
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(dt, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", children: /* @__PURE__ */ e.jsx(k, {}) }) })
        }, ...es.map((F) => ({
          key: F.lang,
          label: l.language !== F.lang ? s(`language.${F.lang}`, { defaultValue: F.label, lang: F.label }) : F.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: ["name_i18n", F.lang], children: /* @__PURE__ */ e.jsx(k, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(k, {}) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(k, {}) }),
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
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            O,
            {
              type: "primary",
              htmlType: "submit",
              loading: p,
              icon: /* @__PURE__ */ e.jsx(Je, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            O,
            {
              onClick: () => f(),
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(ge, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            Ct,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: s("ok", { defaultValue: "OK" }),
              cancelText: s("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => _(),
              children: /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(Mt, {}), loading: n, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, ws = He(() => import("./json-schema-config-form.js").then((t) => ({
  default: t.JsonSchemaConfigFormItem
}))), { TextArea: Cs } = k, Ts = () => {
  var B;
  const { t } = Z("ai"), { t: l } = Z("common"), s = xe(), [i] = a.useForm(), [d, o] = j(!1), [f, p] = j(null), [g, n] = j(""), [_, h] = j(""), { loading: F, data: w } = T(
    () => v.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (c) => {
        r.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", c);
      }
    }
  ), M = Te(() => w == null ? void 0 : w.find((c) => c.provider === _), [w, _]), { loading: V, data: L, refresh: b } = T(
    () => v.ai.listAiModels({ current: 1, page_size: 100, search: g }),
    {
      refreshDeps: [g],
      onError: (c) => {
        r.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", c);
      }
    }
  ), { loading: I, run: z } = T(
    ({ config: c, ...A }) => v.ai.createAiModel({ config: c ?? {}, ...A }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), o(!1), i.resetFields(), b();
      },
      onError: (c) => {
        r.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", c);
      }
    }
  ), { loading: P, run: $ } = T(
    ({ id: c, data: A }) => v.ai.updateAiModel({ id: c }, A),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), o(!1), i.resetFields(), p(null), b();
      },
      onError: (c) => {
        r.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", c);
      }
    }
  ), { runAsync: Y } = T(
    (c) => v.ai.deleteAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), b();
      },
      onError: (c) => {
        r.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", c);
      }
    }
  ), { runAsync: W } = T(
    (c) => v.ai.testAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (c) => {
        r.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", c);
      }
    }
  ), { runAsync: se } = T(
    (c) => v.ai.setDefaultAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), b();
      },
      onError: (c) => {
        r.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", c);
      }
    }
  ), N = () => {
    p(null), h(""), i.resetFields(), o(!0);
  }, C = (c) => {
    p(c), h(c.provider);
    const A = c.config || {}, U = {
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
    i.setFieldsValue(U), o(!0);
  }, D = async (c) => {
    p(null), h(c.provider), i.resetFields();
    try {
      const A = await v.ai.getAiModel({ id: c.id }), U = { ...A.config || {} };
      "api_key" in U && (U.api_key = ""), i.setFieldsValue({
        name: `${A.name} (copy)`,
        description: A.description,
        provider: A.provider,
        config: U,
        is_default: !1,
        status: "enabled",
        max_chat_tokens: A.max_chat_tokens ?? 0,
        max_chat_iterations: A.max_chat_iterations ?? 0
      }), o(!0);
    } catch {
      r.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, J = (c) => {
    h(c), i.setFieldValue("config", void 0);
  }, x = (c) => {
    const A = c.config ?? {}, U = {
      name: c.name,
      description: c.description,
      provider: c.provider,
      config: A,
      is_default: c.is_default,
      status: c.status,
      max_chat_tokens: c.max_chat_tokens ?? 0,
      max_chat_iterations: c.max_chat_iterations ?? 0
    };
    f ? $({ id: f.id, data: U }) : z(U);
  }, K = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (c, A) => /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx("span", { children: c }),
        A.is_default && /* @__PURE__ */ e.jsx(Ze, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Lt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (c) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: c.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (c) => /* @__PURE__ */ e.jsx(ne, { color: c === "enabled" ? "green" : "red", children: c === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (c, A) => /* @__PURE__ */ e.jsx(Ke, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Rt, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => W(A.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Nt, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => se(A.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => C(A)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(ct, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => D(A)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Fe, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => Y(A.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(te, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(qe, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(je, { children: /* @__PURE__ */ e.jsx(
        k.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (c) => n(c),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(je, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(ge, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          O,
          {
            icon: /* @__PURE__ */ e.jsx(mt, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          O,
          {
            icon: /* @__PURE__ */ e.jsx(be, {}),
            onClick: b,
            loading: V,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ge, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          O,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Me, {}),
            onClick: N,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(te, { children: /* @__PURE__ */ e.jsx(
      Oe,
      {
        columns: K,
        dataSource: (L == null ? void 0 : L.data) || [],
        loading: V,
        rowKey: "id",
        pagination: {
          total: (L == null ? void 0 : L.total) || 0,
          current: (L == null ? void 0 : L.current) || 1,
          pageSize: (L == null ? void 0 : L.page_size) || 10,
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
      ie,
      {
        title: f ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: d,
        onCancel: () => {
          o(!1), i.resetFields(), p(null);
        },
        footer: null,
        width: ((B = M == null ? void 0 : M.ui_schema) == null ? void 0 : B["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: i,
            layout: "vertical",
            onFinish: x,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "name",
                    label: t("models.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                    children: /* @__PURE__ */ e.jsx(k, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
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
                  a.Item,
                  {
                    name: "provider",
                    label: t("models.provider", { defaultValue: "Provider" }),
                    rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                    children: /* @__PURE__ */ e.jsx(
                      q,
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
                M && /* @__PURE__ */ e.jsx(a.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(Be, { fallback: /* @__PURE__ */ e.jsx(Le, {}), children: /* @__PURE__ */ e.jsx(
                  ws,
                  {
                    name: "config",
                    schema: M.config_schema,
                    uiSchema: M.ui_schema
                  }
                ) }) }),
                /* @__PURE__ */ e.jsxs(qe, { gutter: 16, children: [
                  /* @__PURE__ */ e.jsx(je, { span: 12, children: /* @__PURE__ */ e.jsx(
                    a.Item,
                    {
                      name: "max_chat_tokens",
                      label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: t("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) }),
                  /* @__PURE__ */ e.jsx(je, { span: 12, children: /* @__PURE__ */ e.jsx(
                    a.Item,
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
                /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(k, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
                /* @__PURE__ */ e.jsx(
                  O,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: I || P,
                    children: f ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  O,
                  {
                    onClick: () => {
                      o(!1), i.resetFields(), p(null), h("");
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
}, Fs = He(() => import("./json-schema-config-form.js").then((t) => ({
  default: t.JsonSchemaConfigFormItem
}))), { TextArea: Is } = k, As = () => {
  var ke;
  const { t } = Z("system"), { t: l } = Z("common"), s = xe(), [i] = a.useForm(), [d, o] = j(!1), [f, p] = j(null), [g, n] = j(""), [_, h] = j(!1), [F, w] = j(null), [M, V] = j(""), [L, b] = j(!1), [I, z] = j([]), [P, $] = j(), [Y, W] = j(null), { loading: se, data: N, refresh: C } = T(
    () => v.system.listToolSets({ current: 1, page_size: 100, search: g, type: P }),
    {
      refreshDeps: [g, P],
      onError: (y) => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", y);
      }
    }
  ), { loading: D, data: J } = T(
    () => v.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (y) => {
        r.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", y);
      }
    }
  ), x = Te(() => J == null ? void 0 : J.find((y) => y.tool_set_type === M), [J, M]), { loading: K, run: B } = T(
    (y) => v.system.createToolSet({
      ...y,
      type: y.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), o(!1), i.resetFields(), C();
      },
      onError: (y) => {
        r.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", y);
      }
    }
  ), { loading: c, run: A } = T(
    ({ id: y, data: u }) => v.system.updateToolSet({ id: y }, {
      ...u,
      type: u.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), o(!1), i.resetFields(), p(null), C();
      },
      onError: (y) => {
        r.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", y);
      }
    }
  ), { run: U } = T(
    (y) => v.system.deleteToolSet({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), C();
      },
      onError: (y) => {
        r.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", y);
      }
    }
  ), { runAsync: ce } = T(
    (y) => v.system.testToolSet({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (y) => {
        r.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", y);
      }
    }
  ), { loading: oe, runAsync: Ve } = T(
    (y) => v.system.getToolSetTools({ id: y }),
    {
      manual: !0,
      onSuccess: (y) => {
        z(y || []), b(!0);
      },
      onError: (y) => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", y);
      }
    }
  ), we = pe(
    async (y, u) => {
      W(y.id);
      try {
        await v.system.updateToolSetStatus(
          { id: y.id },
          { status: u ? "enabled" : "disabled" }
        ), r.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), C();
      } catch (E) {
        r.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", E);
      } finally {
        W(null);
      }
    },
    [t, C]
  ), Ce = () => {
    p(null), i.resetFields(), V(""), o(!0);
  }, ve = (y) => {
    p(y), V(y.type);
    const u = { ...y };
    i.setFieldsValue(u), o(!0);
  }, ye = (y) => {
    V(y), i.setFieldValue("config", {});
  }, _e = (y) => {
    f ? A({ id: f.id, data: y }) : B(y);
  }, S = (y) => {
    U(y);
  }, le = (y) => {
    w(y), h(!0);
  }, fe = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (y, u) => /* @__PURE__ */ e.jsxs(G, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: y }),
        u.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (y) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: y.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      key: "status",
      width: 120,
      render: (y, u) => {
        const E = u.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          ge,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: E ? "green" : "red", children: E ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Ze,
              {
                title: E ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: E,
                    loading: Y === u.id,
                    onChange: (Q) => void we(u, Q)
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
      render: (y, u) => /* @__PURE__ */ e.jsx(Ke, { actions: [
        {
          key: "debug",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.debug", { defaultValue: "Debug Tool" }),
          icon: /* @__PURE__ */ e.jsx(mt, {}),
          disabled: u.status !== "enabled",
          onClick: async () => s(`/system/settings/toolsets/${u.id}/debug`)
        },
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(Dt, {}),
          disabled: u.status !== "enabled",
          onClick: async () => ce(u.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(tt, {}),
          permission: "system:toolsets:view",
          disabled: u.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => Ve(u.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(Ut, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => le(u.config),
          disabled: !u.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: u.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          onClick: async () => ve(u),
          disabled: !!u.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Fe, {}),
          permission: "system:toolsets:delete",
          tooltip: u.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : l("delete", { defaultValue: "Delete" }),
          onClick: async () => S(u.id),
          danger: !0,
          disabled: !!u.is_preset,
          confirm: u.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => S(u.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(te, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(qe, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(je, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(
          k.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (y) => n(y),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          q,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: P,
            onChange: (y) => $(y),
            options: J == null ? void 0 : J.map((y) => ({
              label: y.name,
              value: y.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "", children: "All" }),
              J == null ? void 0 : J.map((y) => /* @__PURE__ */ e.jsx(q.Option, { value: y.tool_set_type, children: y.name }, y.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(je, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(
          O,
          {
            icon: /* @__PURE__ */ e.jsx(be, {}),
            onClick: C,
            loading: se,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ge, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          O,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Me, {}),
            onClick: Ce,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(te, { children: /* @__PURE__ */ e.jsx(
      Oe,
      {
        columns: fe,
        dataSource: (N == null ? void 0 : N.data) || [],
        loading: se,
        rowKey: "id",
        pagination: {
          total: (N == null ? void 0 : N.total) || 0,
          current: (N == null ? void 0 : N.current) || 1,
          pageSize: (N == null ? void 0 : N.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (y, u) => l("pagination.total", {
            defaultValue: `${u[0]}-${u[1]} of ${y} items`,
            start: u[0],
            end: u[1],
            total: y
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ie,
      {
        title: f ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: d,
        onCancel: () => {
          o(!1), i.resetFields(), p(null), V("");
        },
        footer: null,
        width: ((ke = x == null ? void 0 : x.ui_schema) == null ? void 0 : ke["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: i,
            layout: "vertical",
            onFinish: _e,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "name",
                    label: t("settings.toolsets.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                    children: /* @__PURE__ */ e.jsx(k, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
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
                  a.Item,
                  {
                    name: "type",
                    label: t("settings.toolsets.type", { defaultValue: "Type" }),
                    rules: [{ required: !0, message: t("settings.toolsets.typeRequired", { defaultValue: "Please select type" }) }],
                    children: /* @__PURE__ */ e.jsx(
                      q,
                      {
                        loading: D,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: ye,
                        value: M,
                        options: J == null ? void 0 : J.map((y) => ({
                          label: y.name,
                          value: y.tool_set_type
                        }))
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(Be, { fallback: /* @__PURE__ */ e.jsx(Le, {}), children: /* @__PURE__ */ e.jsx(
                  Fs,
                  {
                    name: "config",
                    schema: x == null ? void 0 : x.config_schema,
                    uiSchema: x == null ? void 0 : x.ui_schema
                  }
                ) }),
                /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(k, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
                /* @__PURE__ */ e.jsx(
                  O,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: K || c,
                    children: f ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  O,
                  {
                    onClick: () => {
                      o(!1), i.resetFields(), p(null), V("");
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
      ie,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: _,
        onCancel: () => h(!1),
        footer: [
          /* @__PURE__ */ e.jsx(O, { onClick: () => h(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(F, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ie,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: L,
        onCancel: () => b(!1),
        footer: [
          /* @__PURE__ */ e.jsx(O, { onClick: () => b(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: oe ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(be, { style: { fontSize: 24 }, spin: !0 }) }) : I.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : I.map((y, u) => {
          var E, Q, ue;
          return /* @__PURE__ */ e.jsx(
            te,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(G, { children: [
                /* @__PURE__ */ e.jsx(tt, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((E = y.function) == null ? void 0 : E.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(qe, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(je, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((Q = y.function) == null ? void 0 : Q.description) || "-" })
                ] }),
                ((ue = y.function) == null ? void 0 : ue.parameters) && /* @__PURE__ */ e.jsxs(je, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(y.function.parameters, null, 2) })
                ] })
              ] })
            },
            u
          );
        }) })
      }
    )
  ] });
}, { TextArea: ot } = k;
function Es(t, l) {
  const s = {}, i = [], d = new Map(l.map((o) => [o.id, o]));
  for (const o of t) {
    if (o.toolset_id === "*") {
      i.push({ toolset_id: o.toolset_id, tool_name: o.tool_name });
      continue;
    }
    const f = d.get(o.toolset_id);
    if (!f) {
      i.push({ toolset_id: o.toolset_id, tool_name: o.tool_name });
      continue;
    }
    const p = (f.tools || []).map((g) => g.name);
    if (o.tool_name === "*") {
      s[o.toolset_id] = [...p];
      continue;
    }
    p.includes(o.tool_name) ? (s[o.toolset_id] || (s[o.toolset_id] = []), s[o.toolset_id].includes(o.tool_name) || s[o.toolset_id].push(o.tool_name)) : i.push({ toolset_id: o.toolset_id, tool_name: o.tool_name });
  }
  return { selections: s, extraPatterns: i };
}
function zs(t, l) {
  const s = [], i = /* @__PURE__ */ new Set();
  for (const [d, o] of Object.entries(t))
    for (const f of o) {
      const p = `${d}|${f}`;
      i.has(p) || (i.add(p), s.push({ toolset_id: d, tool_name: f }));
    }
  for (const d of l) {
    const o = d.toolset_id.trim(), f = d.tool_name.trim();
    if (!o || !f)
      continue;
    const p = `${o}|${f}`;
    i.has(p) || (i.add(p), s.push({ toolset_id: o, tool_name: f }));
  }
  return s;
}
function jt(t, l) {
  const s = l.trim();
  return !s || t.some((i) => i.value === s) ? t : [...t, { value: s, label: s }];
}
function Os(t, l, s, i) {
  const o = [{ value: "*", label: i }], f = /* @__PURE__ */ new Set(["*"]), p = (g, n) => {
    f.has(g) || (f.add(g), o.push({
      value: g,
      label: n ? `${g} — ${n}` : g
    }));
  };
  if (l && l !== "*") {
    const g = t.find((n) => n.id === l);
    for (const n of (g == null ? void 0 : g.tools) || [])
      p(n.name, n.description);
  } else
    for (const g of t)
      for (const n of g.tools || [])
        p(n.name, n.description);
  return jt(o, s);
}
const Ps = () => {
  const { t } = Z("system"), { t: l } = Z("common"), s = xe(), { enableSkillToolBinding: i } = yt(), [d] = a.useForm(), [o, f] = j(""), [p, g] = j(), [n, _] = j("user"), [h, F] = j(!1), [w, M] = j(null), [V, L] = j(null), [b, I] = j(!1), [z] = a.useForm(), [P, $] = j(!1), [Y, W] = j(null), [se, N] = j([]), [C, D] = j({}), [J, x] = j([]), [K, B] = j(!1), c = Te(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...se.map((m) => ({
      value: m.id,
      label: `${m.name} (${m.id})`
    }))
  ], [se, t]), A = pe(() => {
    N([]), D({}), x([]);
  }, []), { loading: U, data: ce, refresh: oe } = T(
    () => v.system.listSkills({
      current: 1,
      page_size: 100,
      search: o || void 0,
      domain: p,
      is_preset: n === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [o, p, n],
      onError: () => {
        r.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: Ve = [] } = T(() => v.system.listSkillDomains()), we = (ce == null ? void 0 : ce.data) || [], Ce = (ce == null ? void 0 : ce.total) || 0, { run: ve } = T(
    (m) => v.system.deleteSkill({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), oe();
      },
      onError: () => {
        r.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), ye = pe(
    async (m, R) => {
      W(m.id);
      try {
        await v.system.updateSkillStatus({ id: m.id }, { status: R ? "enabled" : "disabled" }), r.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), oe();
      } catch {
        r.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        W(null);
      }
    },
    [t, oe]
  ), { loading: _e, run: S } = T(
    (m) => v.system.uploadSkill(m.body, m.file),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), I(!1), z.resetFields(), oe();
      },
      onError: () => {
        r.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), le = pe(
    async (m) => {
      var R;
      B(!0);
      try {
        const [H, re] = await Promise.all([
          v.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          v.system.listSkillAiToolBindings(
            { id: m, current: 1, page_size: 1e3 }
          )
        ]), X = ((R = H.data) == null ? void 0 : R.filter((vt) => vt.status === "enabled")) || [];
        N(X);
        const { selections: ee, extraPatterns: Ne } = Es(re.data || [], X);
        D(ee), x(Ne);
      } catch {
        r.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), A();
      } finally {
        B(!1);
      }
    },
    [A, t]
  );
  $e(() => {
    !h || !(w != null && w.id) || !i || le(w.id);
  }, [h, w == null ? void 0 : w.id, i, le]);
  const fe = (m, R) => {
    D((H) => ({ ...H, [m]: R }));
  }, ke = (m, R, H) => {
    D((re) => ({
      ...re,
      [m]: H ? [...R] : []
    }));
  }, y = () => {
    M(null), L(null), d.resetFields(), A(), F(!0);
  }, u = (m) => {
    M(m), L(null), d.setFieldsValue({
      name: m.name,
      description: m.description,
      category: m.category,
      domain: m.domain
    }), A(), F(!0);
  }, E = (m) => {
    M(null), L(m), d.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: m.name, defaultValue: "{{name}} (copy)" }),
      description: m.description,
      category: m.category,
      domain: m.domain
    }), A(), F(!0);
  }, Q = () => {
    d.validateFields().then(async (m) => {
      $(!0);
      try {
        if (w) {
          const R = {
            name: m.name,
            description: m.description ?? "",
            category: m.category ?? "",
            domain: m.domain ?? ""
          };
          if (await v.system.updateSkill({ id: w.id }, R), i) {
            const H = zs(C, J);
            await v.system.replaceSkillAiToolBindings(
              { id: w.id },
              { bindings: H }
            );
          }
          r.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (V) {
          const R = {
            source_id: V.id,
            name: m.name,
            description: m.description ?? "",
            category: m.category ?? "",
            domain: m.domain ?? ""
          }, { id: H } = await v.system.cloneSkill(R);
          r.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), F(!1), L(null), d.resetFields(), A(), oe(), H && s(`/system/settings/skills/${H}/edit`);
          return;
        } else {
          const R = {
            name: m.name,
            description: m.description ?? "",
            category: m.category ?? "",
            domain: m.domain ?? "",
            content: m.content ?? ""
          };
          await v.system.createSkill(R), r.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        F(!1), M(null), L(null), d.resetFields(), A(), oe();
      } catch {
        r.error(
          w ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : V ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        $(!1);
      }
    });
  }, ue = () => {
    var X, ee;
    const m = (X = z.getFieldValue("file")) == null ? void 0 : X.fileList, R = ((ee = m == null ? void 0 : m[0]) == null ? void 0 : ee.originFileObj) ?? (m == null ? void 0 : m[0]);
    if (!R) {
      r.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const H = z.getFieldValue("category"), re = z.getFieldValue("domain");
    S({ body: { category: H, domain: re }, file: R });
  }, Re = i && w, Vt = Re ? 720 : 560, kt = !w && !V, St = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (m, R) => /* @__PURE__ */ e.jsxs(G, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: m }),
        R.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (m) => m ? /* @__PURE__ */ e.jsx(ne, { children: m }) : "-", width: 180 },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (m) => m ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: m }) : "-", width: 180 },
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
            fallback: /* @__PURE__ */ e.jsx(ne, { color: H ? "green" : "red", children: H ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Ze,
              {
                title: H ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: H,
                    loading: Y === R.id,
                    onChange: (re) => void ye(R, re)
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
        Ke,
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
              icon: /* @__PURE__ */ e.jsx(gt, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${R.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Pe, {}),
              tooltip: R.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => u(R),
              permission: "system:skills:update",
              disabled: !!R.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(ct, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => E(R),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
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
                onConfirm: async () => ve(R.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(te, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(qe, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(je, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(
          k.Search,
          {
            placeholder: l("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: f,
            style: { width: 300 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          q,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: p,
            onChange: g,
            options: Ve.map((m) => ({ value: m, label: m }))
          }
        ),
        /* @__PURE__ */ e.jsx(
          De.Group,
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
      /* @__PURE__ */ e.jsx(je, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => oe(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ge, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(O, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: y, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(ge, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(it, {}), onClick: () => I(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(te, { children: [
      /* @__PURE__ */ e.jsx(
        Oe,
        {
          rowKey: "id",
          loading: U,
          columns: St,
          dataSource: we,
          pagination: { total: Ce, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        ie,
        {
          title: w ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : V ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: h,
          onOk: Q,
          onCancel: () => {
            F(!1), M(null), L(null), A();
          },
          confirmLoading: P,
          width: Vt,
          children: /* @__PURE__ */ e.jsxs(a, { form: d, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(k, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(ot, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(k, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(q, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Ve.map((m) => ({ value: m, label: m })) }) }),
            kt && /* @__PURE__ */ e.jsx(a.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(ot, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            Re && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(he, { spinning: K, children: se.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(G, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: se.map((m) => {
                const R = (m.tools || []).map((ee) => ee.name), H = C[m.id] || [], re = R.length > 0 && H.length === R.length, X = H.length > 0 && H.length < R.length;
                return /* @__PURE__ */ e.jsx(
                  te,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        Ye,
                        {
                          checked: re,
                          indeterminate: X,
                          onChange: (ee) => ke(m.id, R, ee.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: m.name })
                    ] }),
                    extra: m.description ? /* @__PURE__ */ e.jsx("span", { children: m.description }) : void 0,
                    children: (m.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(Ye.Group, { style: { width: "100%" }, value: H, onChange: (ee) => fe(m.id, ee), children: /* @__PURE__ */ e.jsx(G, { direction: "vertical", style: { width: "100%" }, children: (m.tools || []).map((ee) => /* @__PURE__ */ e.jsx(Ye, { value: ee.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: ee.name }),
                      ee.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: ee.description })
                    ] }) }, ee.name)) }) }) : /* @__PURE__ */ e.jsx(
                      Ue,
                      {
                        image: Ue.PRESENTED_IMAGE_SIMPLE,
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
                /* @__PURE__ */ e.jsxs(G, { direction: "vertical", style: { width: "100%" }, children: [
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
                          at,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: m.toolset_id,
                            options: jt(c, m.toolset_id),
                            filterOption: (H, re) => {
                              const X = re;
                              return `${(X == null ? void 0 : X.value) ?? ""} ${(X == null ? void 0 : X.label) ?? ""}`.toLowerCase().includes(H.toLowerCase());
                            },
                            onChange: (H) => {
                              const re = typeof H == "string" ? H : "";
                              x(
                                (X) => X.map((ee, Ne) => Ne === R ? { ...ee, toolset_id: re } : ee)
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
                            value: m.tool_name,
                            options: Os(
                              se,
                              m.toolset_id,
                              m.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (H, re) => {
                              const X = re;
                              return `${(X == null ? void 0 : X.value) ?? ""} ${(X == null ? void 0 : X.label) ?? ""}`.toLowerCase().includes(H.toLowerCase());
                            },
                            onChange: (H) => {
                              const re = typeof H == "string" ? H : "";
                              x(
                                (X) => X.map((ee, Ne) => Ne === R ? { ...ee, tool_name: re } : ee)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          O,
                          {
                            type: "default",
                            danger: !0,
                            style: { flexShrink: 0 },
                            onClick: () => x((H) => H.filter((re, X) => X !== R)),
                            children: l("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    R
                  )),
                  /* @__PURE__ */ e.jsx(O, { type: "dashed", onClick: () => x((m) => [...m, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
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
        ie,
        {
          title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
          open: b,
          onOk: ue,
          onCancel: () => I(!1),
          confirmLoading: _e,
          children: /* @__PURE__ */ e.jsxs(a, { form: z, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(a.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(Tt, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(it, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(k, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(q, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Ve.map((m) => ({ value: m, label: m })) }) })
          ] })
        }
      )
    ] })
  ] });
}, Ms = () => {
  const t = xe(), { t: l } = Z("system"), { t: s } = Z("task"), { t: i } = Z("common"), [d] = a.useForm(), { data: o } = T(v.system.listLogStorageBackends), { data: f } = T(v.system.getTaskSettingFields), p = (o ?? []).map((V) => ({
    value: V.id,
    label: l(`settings.task.logStorage.${V.id}`, { defaultValue: V.name })
  })), { loading: g, refresh: n } = T(v.system.getTaskSettings, {
    onSuccess: (V) => {
      V && d.setFieldsValue(V);
    },
    onError: () => {
      r.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: _, run: h } = T(v.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n();
    },
    onError: () => {
      r.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), F = (V) => {
    h(V);
  }, w = (V) => {
    switch (V.value_type) {
      case "int":
      case "number":
        return /* @__PURE__ */ e.jsx(
          me,
          {
            style: { width: "100%" },
            addonAfter: V.key.includes("retention_days") ? l("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "percentage":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, min: 0, max: 100, step: 0.01, addonAfter: "%" });
      case "bool":
        return /* @__PURE__ */ e.jsx(de, {});
      case "string_list":
        return /* @__PURE__ */ e.jsx(q, { mode: "tags", tokenSeparators: [","] });
      case "enum":
        return /* @__PURE__ */ e.jsx(q, { options: V.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(xt, { theme: "snow" });
      default:
        return /* @__PURE__ */ e.jsx(k, {});
    }
  }, M = (V) => V.value_type === "int" || V.value_type === "number" || V.value_type === "percentage" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(he, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: F,
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
              q,
              {
                options: p,
                placeholder: l("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: o === void 0
              }
            )
          }
        ),
        (f ?? []).map((V) => /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: V.key,
            label: l(`settings.task.fields.${V.key}`, { defaultValue: V.key }),
            rules: M(V),
            valuePropName: V.value_type === "bool" ? "checked" : "value",
            children: w(V)
          },
          V.key
        )),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(O, { type: "primary", htmlType: "submit", loading: _, icon: /* @__PURE__ */ e.jsx(Je, {}), children: i("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(O, { onClick: () => n(), icon: /* @__PURE__ */ e.jsx(be, {}), children: i("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(ge, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(qt, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: Ls } = k, Rs = /^[-_a-zA-Z0-9.]+$/, Ns = () => {
  const t = xe(), { t: l, i18n: s } = Z("system"), { t: i } = Z("common"), d = (x) => {
    if (!x) return "-";
    const K = new Date(x);
    return Number.isNaN(K.getTime()) ? "-" : K.toLocaleString(s.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [o] = a.useForm(), [f, p] = j(!1), [g, n] = j(null), [_, h] = j(""), [F, w] = j(1), [M, V] = j(10), { loading: L, data: b, refresh: I } = T(
    () => as({ current: F, page_size: M, search: _ }),
    {
      refreshDeps: [F, M, _],
      onError: (x) => {
        r.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", x);
      }
    }
  ), { loading: z, run: P } = T(
    (x) => is(x),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), p(!1), o.resetFields(), n(null), I();
      },
      onError: (x) => {
        r.error((x == null ? void 0 : x.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: $, run: Y } = T(
    ({ id: x, ...K }) => ns({ id: x }, K),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), p(!1), o.resetFields(), n(null), I();
      },
      onError: (x) => {
        r.error((x == null ? void 0 : x.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: W } = T(
    (x) => os({ id: x }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), I();
      },
      onError: (x) => {
        r.error((x == null ? void 0 : x.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), se = () => {
    n(null), o.resetFields(), o.setFieldsValue({ status: "active" }), p(!0);
  }, N = (x) => {
    n(x), o.setFieldsValue({
      name: x.name,
      slug: x.slug,
      description: x.description,
      status: x.status
    }), p(!0);
  }, C = (x) => {
    ie.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${x.name}"? This action cannot be undone.`
      }),
      onOk: () => W(x.id)
    });
  }, D = () => {
    o.validateFields().then((x) => {
      g ? Y({ id: g.id, ...x }) : P(x);
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
      render: (x) => x || "-"
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
      render: (x) => /* @__PURE__ */ e.jsx(ne, { color: x === "active" ? "green" : "default", children: x === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (x) => d(x)
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (x, K) => /* @__PURE__ */ e.jsx(
        Ke,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(gt, {}),
              onClick: async () => t(`/system/settings/organizations/${K.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Pe, {}),
              onClick: async () => N(K),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              danger: !0,
              onClick: async () => C(K),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    te,
    {
      title: l("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: I, children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ge, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(O, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: se, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(G, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            k.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (x) => {
                h(x), w(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Oe,
            {
              columns: J,
              dataSource: (b == null ? void 0 : b.data) || [],
              loading: L,
              rowKey: "id",
              pagination: {
                current: F,
                pageSize: M,
                total: (b == null ? void 0 : b.total) || 0,
                showSizeChanger: !0,
                showTotal: (x, K) => i("pagination.total", {
                  defaultValue: `${K[0]}-${K[1]} of ${x} items`,
                  start: K[0],
                  end: K[1],
                  total: x
                }),
                onChange: (x, K) => {
                  w(x), V(K);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          ie,
          {
            title: g ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: f,
            onOk: D,
            onCancel: () => {
              p(!1), o.resetFields(), n(null);
            },
            confirmLoading: z || $,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(a, { form: o, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: l("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: l("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(k, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "slug",
                  label: l("settings.organizations.slug", { defaultValue: "Slug" }),
                  tooltip: l("settings.organizations.slugTooltip", { defaultValue: "Optional unique identifier. Only letters, digits, hyphens, underscores, and dots are allowed." }),
                  rules: [{
                    pattern: Rs,
                    message: l("settings.organizations.slugInvalid", { defaultValue: "Slug may only contain letters, digits, hyphens, underscores, and dots" })
                  }],
                  children: /* @__PURE__ */ e.jsx(k, { placeholder: "my-org" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: l("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Ls, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "status",
                  label: l("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(q, { children: [
                    /* @__PURE__ */ e.jsx(q.Option, { value: "active", children: l("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(q.Option, { value: "disabled", children: l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, Ds = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = Z("system"), s = xe(), i = ts(), f = i.hash.replace("#", "") || "base", { enableMultiOrg: p } = yt(), { hasPermission: g } = ls(), n = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(_s, {}),
      hidden: !g("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(Vs, {}),
      hidden: !g("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(bs, {}),
      hidden: !g("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Ss, {}),
      hidden: !g("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(vs, {}),
      hidden: !g("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(Ts, {}),
      hidden: !g("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(As, {}),
      hidden: !g("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(Ps, {}),
      hidden: !g("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Ms, {}),
      hidden: !g("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...p ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Ns, {}),
      hidden: !g("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(te, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    dt,
    {
      defaultActiveKey: f,
      onChange: (_) => {
        s(`${i.pathname}#${_}`);
      },
      items: t(n.filter((_) => !_.hidden), l)
    }
  ) });
}, _l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ds
}, Symbol.toStringTag, { value: "Module" })), Us = () => {
  var ve, ye, _e;
  const t = xe(), { id: l } = Xe(), { t: s } = Z("system"), { t: i } = Z("common"), [d] = a.useForm(), [o] = a.useForm(), [f, p] = j(!1), [g, n] = j(!1), [_, h] = j(null), [F, w] = j(""), [M, V] = j(1), [L, b] = j(10), { data: I, loading: z, refresh: P } = T(
    () => rs({ id: l }),
    {
      ready: !!l,
      onError: (S) => {
        r.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", S);
      }
    }
  ), { data: $, loading: Y, refresh: W } = T(
    () => ds({ id: l, current: M, page_size: L, search: F }),
    {
      ready: !!l,
      refreshDeps: [l, M, L, F],
      onError: (S) => {
        r.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", S);
      }
    }
  ), { data: se, loading: N } = T(
    () => gs({ current: 1, page_size: 1e3 }),
    {
      ready: f
    }
  ), { data: C, loading: D } = T(
    () => ps({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: J, run: x } = T(
    (S) => us({ id: l }, S),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), p(!1), d.resetFields(), W();
      },
      onError: (S) => {
        r.error((S == null ? void 0 : S.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: K, run: B } = T(
    (S) => cs({ id: l, user_id: _.id }, S),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), n(!1), o.resetFields(), h(null), W();
      },
      onError: (S) => {
        r.error((S == null ? void 0 : S.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: c } = T(
    (S) => ms({ id: l, user_id: S }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), W();
      },
      onError: (S) => {
        r.error((S == null ? void 0 : S.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), A = () => {
    p(!0), d.resetFields();
  }, U = (S) => {
    var le;
    h(S), o.setFieldsValue({
      role_ids: ((le = S.organization_roles) == null ? void 0 : le.map((fe) => fe.id)) || []
    }), n(!0);
  }, ce = (S) => {
    ie.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${S.full_name || S.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => c(S.id)
    });
  }, oe = () => {
    d.validateFields().then((S) => {
      x(S);
    });
  }, Ve = () => {
    o.validateFields().then((S) => {
      B(S);
    });
  }, we = ((ve = se == null ? void 0 : se.data) == null ? void 0 : ve.filter((S) => {
    var le;
    return !((le = $ == null ? void 0 : $.data) != null && le.some((fe) => fe.id === S.id));
  })) || [], Ce = [
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
      render: (S) => /* @__PURE__ */ e.jsx(ne, { color: S === "active" ? "green" : "default", children: S === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : S })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (S, le) => {
        var fe;
        return /* @__PURE__ */ e.jsx(G, { wrap: !0, children: ((fe = le.organization_roles) == null ? void 0 : fe.map((ke) => /* @__PURE__ */ e.jsx(ne, { children: ke.name }, ke.id))) || /* @__PURE__ */ e.jsx(ne, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (S, le) => /* @__PURE__ */ e.jsx(
        Ke,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Pe, {}),
              onClick: async () => U(le)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Fe, {}),
              danger: !0,
              onClick: async () => ce(le)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      te,
      {
        title: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            O,
            {
              icon: /* @__PURE__ */ e.jsx(lt, {}),
              onClick: () => t("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            I == null ? void 0 : I.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => {
          P(), W();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: z,
        children: /* @__PURE__ */ e.jsxs(ae, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(ae.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: I == null ? void 0 : I.name }),
          /* @__PURE__ */ e.jsx(ae.Item, { label: s("settings.organizations.slug", { defaultValue: "Slug" }), children: (I == null ? void 0 : I.slug) || "-" }),
          /* @__PURE__ */ e.jsx(ae.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: (I == null ? void 0 : I.status) === "active" ? "green" : "default", children: (I == null ? void 0 : I.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(ae.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (I == null ? void 0 : I.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      te,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(O, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: A, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(G, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            k.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (S) => {
                w(S), V(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Oe,
            {
              columns: Ce,
              dataSource: ($ == null ? void 0 : $.data) || [],
              loading: Y,
              rowKey: "id",
              pagination: {
                current: M,
                pageSize: L,
                total: ($ == null ? void 0 : $.total) || 0,
                showSizeChanger: !0,
                showTotal: (S) => i("pagination.total", { defaultValue: `Total ${S} items` }),
                onChange: (S, le) => {
                  V(S), b(le);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ie,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: f,
        onOk: oe,
        onCancel: () => {
          p(!1), d.resetFields();
        },
        confirmLoading: J,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: d, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "user_id",
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: s("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: N,
                  filterOption: (S, le) => ((le == null ? void 0 : le.label) ?? "").toLowerCase().includes(S.toLowerCase()),
                  options: we.map((S) => ({
                    label: `${S.full_name || S.username} (${S.email})`,
                    value: S.id
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
                q,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: D,
                  options: ((ye = C == null ? void 0 : C.data) == null ? void 0 : ye.map((S) => ({
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
      ie,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: g,
        onOk: Ve,
        onCancel: () => {
          n(!1), o.resetFields(), h(null);
        },
        confirmLoading: K,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: o, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                k,
                {
                  value: (_ == null ? void 0 : _.full_name) || (_ == null ? void 0 : _.username),
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
                q,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: D,
                  options: ((_e = C == null ? void 0 : C.data) == null ? void 0 : _e.map((S) => ({
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
}, wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Us
}, Symbol.toStringTag, { value: "Module" })), qs = He(() => import("./markdown-viewer.js")), $s = fs(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `,
  editorSpin: t`
    flex: 1;
    display: flex;
    min-height: 0;
    min-width: 0;
    .ant-spin-container{
      display: flex;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }
    `
})), { TextArea: rt } = k, Bs = (t) => t.toLowerCase().endsWith(".md");
function bt(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(pt, {}) : /* @__PURE__ */ e.jsx(ft, {}),
      children: (s = l.children) != null && s.length ? bt(l.children) : void 0
    };
  });
}
function Qe(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const Hs = () => {
  const { styles: t } = $s(), { id: l } = Xe(), s = xe(), { t: i } = Z("system"), [d, o] = j(null), [f, p] = j(null), [g, n] = j(!1), [_, h] = j(""), [F, w] = j(!1), [M, V] = j([]), [L, b] = j(!1), [I, z] = j(!1), [P, $] = j(""), [Y] = a.useForm(), [W, se] = j(null), [N, C] = j(null), [D, J] = j(""), [x] = a.useForm(), { data: K } = T(
    () => l ? v.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: B, loading: c, refresh: A } = T(
    () => l ? v.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (u) => {
        if (!d) {
          for (const E of u)
            if (!E.is_dir && E.name === "SKILL.md") {
              p(E.path), o(E.path), n(!1);
              return;
            }
          for (const E of u)
            if (!E.is_dir && E.name === "SKILLS.md") {
              p(E.path), o(E.path), n(!1);
              return;
            }
        }
      }
    }
  ), U = !!(K != null && K.is_preset), ce = Te(() => bt(B || []), [B]), oe = g && f ? f : d ? Qe(d) : "", { loading: Ve } = T(() => !l || !d ? Promise.reject(new Error("No id or selected file")) : v.system.getSkillFile({ id: l, path: d || "" }), {
    refreshDeps: [l, d],
    ready: !!l && !!d,
    onSuccess: (u) => {
      h(u.data);
    },
    onBefore: () => {
      h("");
    },
    onError: () => r.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))
  }), we = () => {
    !l || !d || U || v.system.putSkillFile({ id: l, path: d }, _).then(() => {
      r.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), w(!1);
    }).catch(() => r.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, Ce = (u, E) => {
    const Q = String(E.node.key), ue = !E.node.isLeaf;
    p(Q), n(ue), E.node.isLeaf ? o(Q) : o(null);
  }, ve = (u) => {
    u.event.preventDefault(), se({
      path: String(u.node.key),
      isDir: !u.node.isLeaf,
      x: u.event.clientX,
      y: u.event.clientY
    });
  }, ye = pe(() => se(null), []), _e = pe(
    (u) => {
      if (!l || !W || U) return;
      const { path: E, isDir: Q } = W;
      switch (ye(), u) {
        case "open":
          o(E), p(E), n(!1);
          break;
        case "rename": {
          const ue = E.includes("/") ? E.split("/").pop() : E;
          C({ path: E, isDir: Q }), J(ue), setTimeout(() => x.setFieldsValue({ name: ue }), 0);
          break;
        }
        case "delete":
          ie.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: Q ? i("settings.skills.editor.deleteConfirmContentDir", { path: E, defaultValue: `Delete ${E}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: E, defaultValue: `Delete ${E}?` }),
            onOk: () => v.system.deleteSkillPath({ id: l, path: E }).then(() => {
              r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === E && (o(null), h("")), f === E && (p(null), n(!1)), A();
            }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          p(E), n(Q), b(!0);
          break;
        case "newDir":
          p(E), n(Q), z(!0);
          break;
      }
    },
    [l, W, ye, A, d, f, x, i, U]
  ), S = () => {
    if (!l || !N || U) return;
    const u = (x.getFieldValue("name") ?? D).trim();
    if (!u) {
      r.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!N.isDir && !/\.(md|txt)$/i.test(u)) {
      r.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const E = Qe(N.path), Q = E ? `${E}/${u}` : u;
    if (Q === N.path) {
      C(null);
      return;
    }
    v.system.moveSkillPath({ id: l }, { from_path: N.path, to_path: Q }).then(() => {
      r.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === N.path && o(Q), f === N.path && p(Q), C(null), A();
    }).catch(() => r.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, le = (u) => {
    if (!l || U) return;
    const E = String(u.dragNode.key), Q = String(u.dragNode.title);
    let ue;
    if (u.dropToGap) {
      const Re = Qe(String(u.node.key));
      ue = Re ? `${Re}/${Q}` : Q;
    } else
      ue = `${u.node.key}/${Q}`;
    ue !== E && v.system.moveSkillPath({ id: l }, { from_path: E, to_path: ue }).then(() => {
      r.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), d === E && o(ue), f === E && p(ue), A();
    }).catch(() => r.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, fe = () => {
    const u = P.trim();
    if (!u || !l || U) return;
    const E = oe ? `${oe}/${u}` : u;
    if (!/\.(md|txt)$/i.test(u)) {
      r.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    v.system.putSkillFile({ id: l, path: E }, "").then(() => {
      r.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), b(!1), $(""), A(), o(E), h("");
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, ke = () => {
    var Q;
    const u = (Q = Y.getFieldValue("name")) == null ? void 0 : Q.trim();
    if (!u || !l || U) return;
    const E = oe ? `${oe}/${u}` : u;
    v.system.createSkillDir({ id: l }, { path: E }).then(() => {
      r.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), z(!1), Y.resetFields(), A();
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, y = () => {
    const u = f || d;
    !l || !u || U || ie.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: u, defaultValue: `Delete ${u}?` }),
      onOk: () => v.system.deleteSkillPath({ id: l, path: u }).then(() => {
        r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === u && (o(null), h("")), f === u && (p(null), n(!1)), A();
      }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    te,
    {
      title: (K == null ? void 0 : K.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(O, { type: "link", onClick: () => s("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        U ? /* @__PURE__ */ e.jsx(
          et,
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
            /* @__PURE__ */ e.jsxs(G, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(O, { size: "small", icon: /* @__PURE__ */ e.jsx(Me, {}), disabled: U, onClick: () => b(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(O, { size: "small", icon: /* @__PURE__ */ e.jsx(pt, {}), disabled: U, onClick: () => z(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            c ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              Ft,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !U,
                expandedKeys: M,
                onExpand: (u) => V(u),
                selectedKeys: f ? [f] : [],
                onSelect: Ce,
                onRightClick: U ? void 0 : ve,
                onDrop: le,
                className: t.fileTree,
                treeData: ce
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(G, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(O, { type: "primary", icon: /* @__PURE__ */ e.jsx(Je, {}), disabled: U || !F, onClick: we, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(O, { danger: !0, icon: /* @__PURE__ */ e.jsx(Fe, {}), disabled: U, onClick: y, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              /* @__PURE__ */ e.jsx(he, { spinning: Ve, wrapperClassName: hs(t.editorSpin, "ez-editor-spin"), children: Bs(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  rt,
                  {
                    value: _,
                    readOnly: U,
                    onChange: (u) => {
                      h(u.target.value), w(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(Be, { fallback: /* @__PURE__ */ e.jsx(Le, {}), children: /* @__PURE__ */ e.jsx(qs, { content: ht(_) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                rt,
                {
                  value: _,
                  readOnly: U,
                  onChange: (u) => {
                    h(u.target.value), w(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              ) })
            ] }),
            !d && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        W && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: ye,
              onContextMenu: (u) => u.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: W.x, top: W.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            It,
            {
              selectable: !1,
              items: [
                ...W.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(ft, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Pe, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Fe, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx($t, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(Bt, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: u }) => _e(u)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(ie, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: L, onOk: fe, onCancel: () => {
          b(!1), $("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(k, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: P, onChange: (u) => $(u.target.value) }) }),
        /* @__PURE__ */ e.jsx(ie, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: I, onOk: () => Y.validateFields().then(ke), onCancel: () => z(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(a, { form: Y, layout: "vertical", children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(k, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          ie,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!N,
            onOk: S,
            onCancel: () => C(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(a, { form: x, layout: "vertical", onValuesChange: (u, E) => J(E.name ?? ""), children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: N != null && N.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              k,
              {
                placeholder: N != null && N.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => S()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, Cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hs
}, Symbol.toStringTag, { value: "Module" })), Js = He(() => import("./markdown-viewer.js")), Ks = () => {
  const { id: t } = Xe(), l = xe(), { t: s } = Z("system"), { data: i, loading: d } = T(
    () => t ? v.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: o, loading: f, mutate: p } = T(
    () => t ? v.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => r.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => p()
    }
  ), g = Te(() => o == null ? void 0 : o.map((_) => ({
    key: _.file_name,
    label: _.file_name,
    children: /* @__PURE__ */ e.jsx(Be, { fallback: /* @__PURE__ */ e.jsx(Le, {}), children: /* @__PURE__ */ e.jsx(Js, { content: ht(_.content) }) })
  })), [o]);
  if (!t) return null;
  const n = d || f;
  return /* @__PURE__ */ e.jsx(he, { spinning: n, children: /* @__PURE__ */ e.jsx(
    te,
    {
      title: (i == null ? void 0 : i.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(O, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: g
    }
  ) });
}, Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ks
}, Symbol.toStringTag, { value: "Module" })), { Text: Se, Title: Ws } = ut, Gs = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(Zt, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(Gt, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Wt, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(tt, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(We, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(Kt, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(We, {}) }
}, ze = ({
  content: t,
  maxHeight: l = 400
}) => {
  const { parsed: s, isJSON: i } = Ie(t);
  return i ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
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
  const { parsed: s, isJSON: i } = Ie(t);
  return i ? /* @__PURE__ */ e.jsxs(ae, { size: "small", column: 2, bordered: !0, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ae.Item,
      {
        label: l("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ae.Item,
      {
        label: l("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ae.Item,
      {
        label: l("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ae.Item,
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
  const { parsed: s, isJSON: i } = Ie(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(Se, { strong: !0, children: [
        l("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ne, { color: "blue", children: s.tool })
    ] }),
    s.arguments && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(Se, { strong: !0, children: [
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
  const { parsed: s, isJSON: i } = Ie(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(Se, { strong: !0, children: [
        l("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(Se, { code: !0, children: s.tool_call_id })
    ] }),
    s.result && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(Se, { strong: !0, children: [
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
  const { t } = Z("ai"), l = xe(), [s, i] = j(""), [d, o] = j(""), {
    data: f,
    loading: p,
    refresh: g
  } = T(() => v.ai.getAiTraceStatus(), {
    onError: () => {
      r.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), n = (f == null ? void 0 : f.enabled) ?? !1, { loading: _, run: h } = T(
    (P) => v.ai.toggleAiTrace({ enabled: P }),
    {
      manual: !0,
      onSuccess: (P, [$]) => {
        r.success(
          $ ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), g(), $ || o("");
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
    (P) => v.ai.getAiTraceEvents({ trace_id: P }),
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
  ), V = pe(() => {
    s.trim() && (o(s.trim()), M(s.trim()));
  }, [s, M]), L = pe(
    (P) => {
      const $ = P ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      ie.confirm({
        title: P ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: $,
        onOk: () => h(P)
      });
    },
    [t, h]
  ), b = pe(async () => {
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
        const $ = await P.blob(), Y = window.URL.createObjectURL($), W = document.createElement("a");
        W.href = Y, W.download = `ai-trace-${d}.json`, document.body.appendChild(W), W.click(), window.URL.revokeObjectURL(Y), document.body.removeChild(W);
      } catch {
        r.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, t]), I = Te(() => F ?? [], [F]), z = Te(
    () => I.map((P) => {
      const $ = Gs[P.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(We, {})
      }, Y = t(
        `trace.eventTypes.${P.event_type}`,
        { defaultValue: P.event_type }
      );
      return {
        key: P.id,
        dot: $.icon,
        color: $.color,
        children: /* @__PURE__ */ e.jsx(
          At,
          {
            size: "small",
            defaultActiveKey: [P.id],
            items: [
              {
                key: P.id,
                label: /* @__PURE__ */ e.jsxs(G, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(ne, { color: $.color, children: Y }),
                  /* @__PURE__ */ e.jsxs(Se, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    P.step_order
                  ] }),
                  P.duration_ms > 0 && /* @__PURE__ */ e.jsxs(Se, { type: "secondary", style: { fontSize: 12 }, children: [
                    t("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    P.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(Se, { type: "secondary", style: { fontSize: 12 }, children: new Date(P.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Qs, { event: P, t })
              }
            ]
          }
        )
      };
    }),
    [I, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(te, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ e.jsxs(G, { children: [
            /* @__PURE__ */ e.jsx(
              O,
              {
                icon: /* @__PURE__ */ e.jsx(lt, {}),
                onClick: () => l("/system/settings#ai-models"),
                children: t("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(Ws, { level: 4, style: { margin: 0 }, children: t("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(G, { children: [
            /* @__PURE__ */ e.jsx(Se, { children: n ? t("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : t("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              de,
              {
                checked: n,
                loading: p || _,
                onChange: L
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(te, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(G.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        k,
        {
          placeholder: t("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: s,
          onChange: (P) => i(P.target.value),
          onPressEnter: V,
          prefix: /* @__PURE__ */ e.jsx(Ht, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(O, { type: "primary", onClick: V, loading: w, children: t("trace.search", { defaultValue: "Search" }) }),
      d && I.length > 0 && /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(Jt, {}), onClick: b, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    w ? /* @__PURE__ */ e.jsx(te, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(he, { size: "large" }) }) }) : d && I.length === 0 ? /* @__PURE__ */ e.jsx(te, { children: /* @__PURE__ */ e.jsx(
      Ue,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : I.length > 0 ? /* @__PURE__ */ e.jsx(te, { children: /* @__PURE__ */ e.jsx(Et, { items: z }) }) : null
  ] });
}, Fl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: el
}, Symbol.toStringTag, { value: "Module" })), tl = He(() => import("./json-schema-config-form.js")), { Text: Ee, Title: sl } = ut, ll = ({
  content: t,
  maxHeight: l = 400
}) => {
  const { parsed: s, isJSON: i } = Ie(t);
  return i ? /* @__PURE__ */ e.jsx(
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
  var K;
  const { t } = Z("system"), { t: l } = Z("common"), s = xe(), { id: i } = Xe(), [d, o] = j(void 0), [f, p] = j("schema"), [g, n] = j({}), [_, h] = j("{}"), [F, w] = j(null), [M, V] = j(null), { loading: L, data: b } = T(
    () => v.system.getToolSet({ id: i }),
    {
      ready: !!i,
      onError: () => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: I, data: z } = T(
    () => v.system.getToolSetTools({ id: i }),
    {
      ready: !!i,
      onError: () => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), P = z == null ? void 0 : z.find(
    (B) => {
      var c;
      return ((c = B.function) == null ? void 0 : c.name) === d;
    }
  ), { loading: $, run: Y } = T(
    (B, c) => v.system.callTool({ id: i }, { name: B, parameters: c }),
    {
      manual: !0,
      onSuccess: (B) => {
        w((B == null ? void 0 : B.result) ?? "");
      },
      onError: (B) => {
        var A, U;
        const c = ((U = (A = B.response) == null ? void 0 : A.data) == null ? void 0 : U.message) || B.message || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        r.error(c), w(null);
      }
    }
  ), W = pe((B) => {
    o(B), n({}), h("{}"), w(null), V(null);
  }, []), se = pe(() => {
    if (f === "schema")
      h(JSON.stringify(g, null, 2)), p("code");
    else {
      const { parsed: B, isJSON: c } = Ie(_);
      c && (n(B), V(null)), p("schema");
    }
  }, [f, g, _]), N = pe((B) => {
    h(B);
    const { parsed: c, isJSON: A } = Ie(B);
    A ? (n(c), V(null)) : V(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), C = pe(() => {
    if (!d) {
      r.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let B;
    if (f === "code") {
      if (M) {
        r.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      B = _;
    } else
      B = JSON.stringify(g);
    w(null), Y(d, B);
  }, [d, f, g, _, M, Y, t]), D = b, J = (D == null ? void 0 : D.status) === "enabled" ? "green" : "red", x = (D == null ? void 0 : D.status) === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(te, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(G, { children: [
      /* @__PURE__ */ e.jsx(
        O,
        {
          icon: /* @__PURE__ */ e.jsx(lt, {}),
          onClick: () => s("/system/settings#ai-toolsets"),
          children: t("settings.toolsets.backToList", { defaultValue: "Back" })
        }
      ),
      /* @__PURE__ */ e.jsx(sl, { level: 4, style: { margin: 0 }, children: t("settings.toolsets.debugTitle", { defaultValue: "Tool Debug" }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(te, { style: { marginBottom: 16 }, loading: L, children: D && /* @__PURE__ */ e.jsxs(ae, { column: 2, size: "small", children: [
      /* @__PURE__ */ e.jsx(ae.Item, { label: t("settings.toolsets.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: D.name }) }),
      /* @__PURE__ */ e.jsx(ae.Item, { label: t("settings.toolsets.type", { defaultValue: "Type" }), children: /* @__PURE__ */ e.jsx(ne, { color: "blue", children: String(D.type).toUpperCase() }) }),
      /* @__PURE__ */ e.jsx(ae.Item, { label: t("settings.toolsets.description", { defaultValue: "Description" }), span: 2, children: D.description || "-" }),
      /* @__PURE__ */ e.jsx(ae.Item, { label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: J, children: x }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(te, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: t("settings.toolsets.selectTool", { defaultValue: "Select Tool" }) }) }),
        I ? /* @__PURE__ */ e.jsx(he, { size: "small" }) : /* @__PURE__ */ e.jsx(
          q,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: d,
            onChange: W,
            optionLabelProp: "label",
            children: (z ?? []).map((B) => {
              var ce, oe;
              const c = ((ce = B.function) == null ? void 0 : ce.name) ?? "", A = ((oe = B.function) == null ? void 0 : oe.description) ?? "", U = A ? `${c} - ${A}` : c;
              return /* @__PURE__ */ e.jsx(q.Option, { value: c, label: U, children: /* @__PURE__ */ e.jsx(
                "div",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  title: U,
                  children: U
                }
              ) }, c);
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
                O,
                {
                  size: "small",
                  icon: f === "schema" ? /* @__PURE__ */ e.jsx(Xt, {}) : /* @__PURE__ */ e.jsx(Yt, {}),
                  onClick: se
                }
              )
            }
          )
        ] }),
        f === "schema" ? (K = P.function) != null && K.parameters ? /* @__PURE__ */ e.jsx(Be, { fallback: /* @__PURE__ */ e.jsx(Le, {}), children: /* @__PURE__ */ e.jsx(
          tl,
          {
            schema: P.function.parameters,
            value: g,
            onChange: n
          }
        ) }) : /* @__PURE__ */ e.jsx(Ee, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            xs,
            {
              value: _,
              height: "200px",
              extensions: [ys()],
              onChange: N,
              basicSetup: { lineNumbers: !0, foldGutter: !0 }
            }
          ),
          M && /* @__PURE__ */ e.jsx(Ee, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: M })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: F !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        O,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Qt, {}),
          loading: $,
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
}, Il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: al
}, Symbol.toStringTag, { value: "Module" })), il = () => {
  const { t } = Z("system"), [l] = ss(), s = l.get("provider"), i = l.get("code"), d = l.get("state"), [o, f] = j(null), [p, g] = j(null), [n, _] = j(null);
  return T(async () => {
    if (!i || !d || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const h = await v.system.testOauthCallback({ code: i, state: d, provider: s });
    if (!h.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!h.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    f(h.user), g(h.user_info);
  }, {
    onSuccess: () => {
      _({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (h) => {
      _({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: h.message
      });
    }
  }), n ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    zt,
    {
      status: n.status,
      title: n.message,
      subTitle: n.error,
      extra: /* @__PURE__ */ e.jsxs(G, { style: { display: !p || !o ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(te, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Ge, { value: p || {} }) }),
        /* @__PURE__ */ e.jsx(te, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Ge, { value: o || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Le, {});
}, Al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: il
}, Symbol.toStringTag, { value: "Module" }));
export {
  Fl as A,
  wl as O,
  Cl as S,
  Il as T,
  Tl as a,
  Al as b,
  _l as i
};
