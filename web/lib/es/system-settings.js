import { j as e } from "./vendor.js";
import { Form as a, message as r, Spin as ye, Switch as ue, Select as B, Input as V, Alert as st, Divider as it, Space as Z, Button as I, InputNumber as xe, Modal as oe, Skeleton as vt, Descriptions as ie, Steps as _t, Tag as re, Table as Oe, Radio as Ke, Tabs as mt, Popconfirm as wt, Tooltip as Xe, Card as le, Row as De, Col as Ve, Checkbox as et, Empty as Ue, AutoComplete as ot, Upload as Ct, Tree as Tt, Menu as Ft, Collapse as It, Typography as gt, Timeline as At, Result as Et } from "antd";
import { useTranslation as Y } from "react-i18next";
import { useState as y, useEffect as Pe, useMemo as Fe, Suspense as qe, lazy as $e, useCallback as ge } from "react";
import { useRequest as w } from "ahooks";
import { SaveOutlined as Be, ReloadOutlined as ke, LoadingOutlined as zt, CheckCircleTwoTone as Ot, ClearOutlined as Pt, StarFilled as Mt, CheckCircleOutlined as Lt, StarOutlined as Rt, EditOutlined as Me, CopyOutlined as pt, DeleteOutlined as Ie, BugOutlined as ft, PlusOutlined as Le, ThunderboltOutlined as Nt, ToolOutlined as lt, SettingOutlined as Ut, FileTextOutlined as Ge, EyeOutlined as ht, UploadOutlined as rt, CalendarOutlined as Dt, ArrowLeftOutlined as nt, FolderOutlined as xt, FileOutlined as yt, FileAddOutlined as qt, FolderAddOutlined as $t, SearchOutlined as Bt, DownloadOutlined as Ht, WarningOutlined as Jt, DashboardOutlined as Kt, MessageOutlined as Wt, SendOutlined as Gt, CodeOutlined as Zt, AlignLeftOutlined as Xt, PlayCircleOutlined as Yt } from "@ant-design/icons";
import { a as S } from "./index.js";
import { g as dt, c as jt } from "./base.js";
import { f as ce, e as Qt, b as He, L as Re } from "./components.js";
import We from "react-quill";
import { useNavigate as je, useLocation as es, useParams as Ye, useSearchParams as ts } from "react-router-dom";
import { u as bt, c as ss } from "./contexts.js";
import { l as ls, c as as, u as is, d as ns, g as os, b as rs, e as ds, f as us, r as cs } from "./system.js";
import { l as ms, b as gs } from "./authorization.js";
import { createStyles as ps } from "antd-style";
import Ze from "@uiw/react-json-view";
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
  const { t: s } = Y("system"), { t: i } = Y("common"), [d] = a.useForm(), [o, f] = y((t == null ? void 0 : t.provider) || "custom"), [g, p] = y((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [n, b] = y((t == null ? void 0 : t.enabled) || !1), [u, C] = y((t == null ? void 0 : t.auto_create_user) || !1), { loading: T, data: A, refresh: h } = w(S.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (_) => {
      d.setFieldsValue(_), f(_.provider), p(_.provider === "custom" || _.provider === "autoDiscover"), b(_.enabled), C(_.auto_create_user);
    },
    onError: (_) => {
      r.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", _);
    }
  });
  Pe(() => {
    t && (d.setFieldsValue(t), f(t.provider), p(t.provider === "custom" || t.provider === "autoDiscover"), b(t.enabled), C(t.auto_create_user));
  }, [t, d]);
  const L = (_) => {
    f(_), p(_ === "custom" || _ === "autoDiscover");
    const D = xs[_];
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
  }, R = (_) => {
    b(_);
  }, O = (_) => {
    C(_);
  }, { loading: P, run: z } = w(S.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : h();
    },
    onError: (_) => {
      r.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", _);
    }
  }), $ = (_) => {
    z(_);
  }, X = () => {
    l ? l() : h();
  }, { loading: K, run: ne } = w(async ({ redirect_uri: _, ...D }) => {
    let W;
    return _ ? W = new URL(_) : W = new URL(window.location.origin), W.pathname = dt("/system/settings/oauth/test-callback"), W.searchParams.set("provider", o), S.system.testOauthConnection({ redirect_uri: W.toString(), ...D });
  }, {
    manual: !0,
    onSuccess: ({ url: _ }) => {
      window.open(_, "_blank");
    },
    onError: (_) => {
      r.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: _.message })), console.error("Failed to test OAuth connection", _);
    }
  }), U = () => o === "custom";
  return /* @__PURE__ */ e.jsx(ye, { spinning: T, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: $,
      initialValues: t || A,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(ue, { onChange: R })
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
            children: /* @__PURE__ */ e.jsxs(B, { onChange: L, disabled: !n, children: [
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
              V,
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
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n, placeholder: "https://example.com/icon.png" })
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
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
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
            children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !n, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        U() && /* @__PURE__ */ e.jsx(
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
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
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
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
          }
        ),
        U() && /* @__PURE__ */ e.jsx(
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
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
          }
        ),
        U() && /* @__PURE__ */ e.jsx(
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
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
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
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(_) => _.getFieldValue("redirect_uri") !== "" ? {
              pattern: Ae,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n, placeholder: `http://${window.location.host}${dt(`/login?provider=settings.${o}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(ue, { onChange: O, disabled: !n })
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
                required: n && u,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !n || !u })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs(B, { disabled: !n, children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "new_user_only", children: s("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "temporary", children: s("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          st,
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
            children: /* @__PURE__ */ e.jsx(ue, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(it, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          st,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: g ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "email", disabled: !n || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "login", autoComplete: "off", disabled: !n || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "name", disabled: !n || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "avatar_url", disabled: !n || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "role", disabled: !n || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            I,
            {
              type: "primary",
              htmlType: "submit",
              loading: P,
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            I,
            {
              loading: K,
              onClick: async () => {
                const _ = d.getFieldsValue();
                ne(_);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            I,
            {
              onClick: X,
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, js = () => {
  const { t } = Y("system"), { t: l } = Y("common"), [s] = a.useForm(), { loading: i, data: d, refresh: o } = w(S.system.getSecuritySettings, {
    onSuccess: (n) => {
      s.setFieldsValue(n);
    },
    onError: (n) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", n);
    }
  }), { loading: f, run: g } = w(S.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), o();
    },
    onError: (n) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", n);
    }
  }), p = (n) => {
    g(n);
  };
  return /* @__PURE__ */ e.jsx(ye, { spinning: i, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: s,
      layout: "vertical",
      onFinish: p,
      initialValues: d,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(ue, {})
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
            children: /* @__PURE__ */ e.jsx(xe, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(xe, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, b) => n.login_failure_lock !== b.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(xe, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, b) => n.login_failure_lock !== b.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(xe, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, b) => n.history_password_check !== b.history_password_check,
            children: ({ getFieldValue: n }) => n("history_password_check") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(xe, { min: 1, max: 10, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(xe, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(xe, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(xe, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            I,
            {
              type: "primary",
              htmlType: "submit",
              loading: f,
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            I,
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
}, bs = ({ fetchItems: t, importItems: l, columns: s, ...i }) => {
  const { t: d } = Y("system"), [o, f] = y([]), [g, p] = y([]), { run: n, loading: b } = w(t, {
    onError: (T) => {
      r.error(d("settings.ldap.importError", { error: `${T.message}` }));
    },
    onSuccess: (T) => {
      f(T);
    },
    manual: !0
  }), { run: u, loading: C } = w(async () => {
    for (const T of g.filter((A) => {
      const h = o.find((L) => L.ldap_dn === A);
      return !(!h || h.status === "imported");
    })) {
      const A = await l([T]);
      f((h) => [...h].map((R) => {
        for (const O of A)
          if (R.ldap_dn === O.ldap_dn)
            return { ...O, status: "imported" };
        return R;
      }));
    }
  }, {
    manual: !0
  });
  return Pe(() => {
    i.visible && (f([]), n(), p([]));
  }, [i.visible]), /* @__PURE__ */ e.jsx(
    oe,
    {
      title: d("settings.ldap.importTitle"),
      ...i,
      onOk: () => {
        u();
      },
      width: 900,
      confirmLoading: C,
      loading: b,
      children: /* @__PURE__ */ e.jsx(
        Oe,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (T) => {
              p(T);
            },
            getCheckboxProps: (T) => ({
              disabled: T.status === "imported"
            })
          },
          columns: s.map(({ render: T, ...A }) => T ? {
            ...A,
            render: (h, L, R) => {
              const O = g.includes(L.ldap_dn) && C && L.status !== "imported";
              return T(h, L, R, O);
            }
          } : A),
          dataSource: o,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Vs = () => {
  var L, R, O;
  const { t } = Y("system"), [l] = a.useForm(), [s, i] = y(!1), [d, o] = y(null), [f, g] = y(!1), [p, n] = y(!1), [b] = a.useForm(), [u, C] = y(!1);
  w(S.system.getLdapSettings, {
    onSuccess: (P) => {
      l.setFieldsValue(P), C(P.enabled);
    },
    onError: (P) => {
      r.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${P.message}` }));
    }
  }), Pe(() => {
    o(null);
  }, [f]);
  const T = async (P) => {
    i(!0);
    try {
      await S.system.updateLdapSettings(P), r.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      r.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      i(!1);
    }
  }, { run: A, loading: h } = w(async (P) => {
    const z = await l.validateFields();
    return await S.system.testLdapConnection({
      ...P,
      ...z
    });
  }, {
    onSuccess: (P) => {
      o(P);
    },
    onError: (P) => {
      r.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${P.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      a,
      {
        form: l,
        layout: "vertical",
        onFinish: T,
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
              children: /* @__PURE__ */ e.jsx(ue, { onChange: (P) => C(P) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: u, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: u, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: u, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(V.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: u, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: u, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: u, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: u, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: u, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(V, { type: "number", defaultValue: 15, disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(it, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(ue, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(ue, { disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !u })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              I,
              {
                disabled: !u,
                style: { marginLeft: 8 },
                onClick: () => g(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ce, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              I,
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
        onCancel: () => g(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            a,
            {
              form: b,
              layout: "vertical",
              onFinish: A,
              children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V, { disabled: !u })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !u })
                  }
                ),
                /* @__PURE__ */ e.jsxs(a.Item, { children: [
                  /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(I, { disabled: !u, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    I,
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
          /* @__PURE__ */ e.jsx(ye, { spinning: h, children: /* @__PURE__ */ e.jsx(vt, { active: h, loading: h, children: d && (d.user ? /* @__PURE__ */ e.jsxs(ie, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(ie.Item, { label: "Username", span: 3, children: d.user.username }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "Email", span: 3, children: d.user.email }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "FullName", span: 3, children: d.user.full_name }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "CreatedAt", span: 3, children: d.user.created_at }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "UpdatedAt", span: 3, children: d.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            _t,
            {
              direction: "vertical",
              current: (L = d.message) == null ? void 0 : L.findIndex((P) => !P.success),
              status: (R = d.message) != null && R.find((P) => !P.success) ? "error" : "finish",
              items: (O = d.message) == null ? void 0 : O.map((P) => ({
                status: P.success ? "finish" : "error",
                title: P.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      bs,
      {
        visible: p,
        onCancel: () => n(!1),
        fetchItems: () => S.system.importLdapUsers({}),
        importItems: (P) => S.system.importLdapUsers({ user_dn: P }),
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
          render: (P, z, $, X) => X ? /* @__PURE__ */ e.jsx(ye, { indicator: /* @__PURE__ */ e.jsx(zt, { spin: !0 }) }) : P ? /* @__PURE__ */ e.jsx(Ot, { twoToneColor: "#52c41a" }) : z.id ? /* @__PURE__ */ e.jsx(re, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(re, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, ks = () => {
  const { t } = Y("system"), { t: l } = Y("common"), [s] = a.useForm(), [i, d] = y(null), [o, f] = y(!1), [g] = a.useForm(), [p, n] = y(!1), { loading: b } = w(S.system.getSmtpSettings, {
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
  const { run: u, loading: C } = w(({ port: h, ...L }) => S.system.updateSmtpSettings({ ...L, port: Number(h) }), {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (h) => {
      r.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${h.message}` }));
    }
  }), { run: T, loading: A } = w(async (h) => {
    const { port: L, ...R } = await s.validateFields();
    return await S.system.testSmtpConnection({
      ...h,
      ...R,
      port: Number(L)
    });
  }, {
    onSuccess: (h) => {
      d(h);
    },
    onError: (h) => {
      r.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${h.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(ye, { spinning: b, children: /* @__PURE__ */ e.jsxs(
      a,
      {
        form: s,
        layout: "vertical",
        onFinish: u,
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
              children: /* @__PURE__ */ e.jsx(ue, { onChange: (h) => n(h) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: p, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: p, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { type: "number", disabled: !p, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: p, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !p, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: p, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(Ke.Group, { disabled: !p, children: [
                /* @__PURE__ */ e.jsx(Ke.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(Ke.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(Ke.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: p, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !p, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
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
                  disabled: !p,
                  placeholder: t("settings.smtp.adminEmailsPlaceholder", { defaultValue: "Enter email addresses" })
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(it, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(We, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(We, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(We, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.activationTemplate", { defaultValue: "Account Activation Template" }),
              name: "activation_template",
              tooltip: t("settings.smtp.activationTemplateTooltip", { defaultValue: "Email template sent to new users when no password is set. Use {{.ActivationURL}} for the activation link, {{.FullName}} for the user's name." }),
              children: /* @__PURE__ */ e.jsx(We, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(ce, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", loading: C, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              I,
              {
                onClick: () => f(!0),
                disabled: !p || A,
                loading: A,
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
          /* @__PURE__ */ e.jsx(I, { onClick: () => f(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(I, { type: "primary", loading: A, onClick: () => g.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: g,
            layout: "vertical",
            onFinish: (h) => T(h),
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
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: "test@example.com" })
                }
              ),
              i && /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: i.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: i.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, Ss = () => {
  const { t, i18n: l } = Y("system"), { t: s } = Y("common"), [i] = a.useForm(), { loading: d, data: o, refresh: f } = w(S.system.getSystemBaseSettings, {
    onSuccess: (C) => {
      i.setFieldsValue(C);
    },
    onError: (C) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", C);
    }
  }), { loading: g, run: p } = w(S.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), f();
    },
    onError: (C) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", C);
    }
  }), { loading: n, run: b } = w(S.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      r.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (C) => {
      r.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", C);
    }
  }), u = (C) => {
    p(C);
  };
  return /* @__PURE__ */ e.jsx(ye, { spinning: d, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: i,
      layout: "vertical",
      onFinish: u,
      initialValues: o,
      children: [
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(mt, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }, ...Qt.map((C) => ({
          key: C.lang,
          label: l.language !== C.lang ? s(`language.${C.lang}`, { defaultValue: C.label, lang: C.label }) : C.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: ["name_i18n", C.lang], children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(V, {}) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(V, {}) }),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(ue, {})
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
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            I,
            {
              type: "primary",
              htmlType: "submit",
              loading: g,
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            I,
            {
              onClick: () => f(),
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(ce, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            wt,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: s("ok", { defaultValue: "OK" }),
              cancelText: s("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => b(),
              children: /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(Pt, {}), loading: n, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, vs = $e(() => import("./json-schema-config-form.js")), { TextArea: _s } = V, ws = () => {
  var M;
  const { t } = Y("ai"), { t: l } = Y("common"), s = je(), [i] = a.useForm(), [d, o] = y(!1), [f, g] = y(null), [p, n] = y(""), [b, u] = y(""), { loading: C, data: T } = w(
    () => S.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (c) => {
        r.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", c);
      }
    }
  ), A = Fe(() => T == null ? void 0 : T.find((c) => c.provider === b), [T, b]), { loading: h, data: L, refresh: R } = w(
    () => S.ai.listAiModels({ current: 1, page_size: 100, search: p }),
    {
      refreshDeps: [p],
      onError: (c) => {
        r.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", c);
      }
    }
  ), { loading: O, run: P } = w(
    ({ config: c, ...F }) => S.ai.createAiModel({ config: c ?? {}, ...F }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), o(!1), i.resetFields(), R();
      },
      onError: (c) => {
        r.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", c);
      }
    }
  ), { loading: z, run: $ } = w(
    ({ id: c, data: F }) => S.ai.updateAiModel({ id: c }, F),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), o(!1), i.resetFields(), g(null), R();
      },
      onError: (c) => {
        r.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", c);
      }
    }
  ), { runAsync: X } = w(
    (c) => S.ai.deleteAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), R();
      },
      onError: (c) => {
        r.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", c);
      }
    }
  ), { runAsync: K } = w(
    (c) => S.ai.testAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (c) => {
        r.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", c);
      }
    }
  ), { runAsync: ne } = w(
    (c) => S.ai.setDefaultAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), R();
      },
      onError: (c) => {
        r.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", c);
      }
    }
  ), U = () => {
    g(null), u(""), i.resetFields(), o(!0);
  }, _ = (c) => {
    g(c), u(c.provider);
    const F = c.config || {}, H = {
      name: c.name,
      description: c.description,
      provider: c.provider,
      is_default: c.is_default,
      config: F,
      // Spread config fields to form
      status: c.status,
      max_chat_tokens: c.max_chat_tokens ?? 0,
      max_chat_iterations: c.max_chat_iterations ?? 0
    };
    i.setFieldsValue(H), o(!0);
  }, D = async (c) => {
    g(null), u(c.provider), i.resetFields();
    try {
      const F = await S.ai.getAiModel({ id: c.id }), H = { ...F.config || {} };
      "api_key" in H && (H.api_key = ""), i.setFieldsValue({
        name: `${F.name} (copy)`,
        description: F.description,
        provider: F.provider,
        config: H,
        is_default: !1,
        status: "enabled",
        max_chat_tokens: F.max_chat_tokens ?? 0,
        max_chat_iterations: F.max_chat_iterations ?? 0
      }), o(!0);
    } catch {
      r.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, W = (c) => {
    u(c), i.setFieldValue("config", void 0);
  }, j = (c) => {
    let F = c.config ?? {};
    const H = {
      name: c.name,
      description: c.description,
      provider: c.provider,
      config: F,
      is_default: c.is_default,
      status: c.status,
      max_chat_tokens: c.max_chat_tokens ?? 0,
      max_chat_iterations: c.max_chat_iterations ?? 0
    };
    f ? $({ id: f.id, data: H }) : P(H);
  }, G = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (c, F) => /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx("span", { children: c }),
        F.is_default && /* @__PURE__ */ e.jsx(Xe, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Mt, { style: { color: "#faad14" } }) })
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
      render: (c, F) => /* @__PURE__ */ e.jsx(He, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Lt, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => K(F.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(Rt, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => ne(F.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Me, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => _(F)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(pt, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => D(F)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => X(F.id),
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
          onSearch: (c) => n(c),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(ce, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          I,
          {
            icon: /* @__PURE__ */ e.jsx(ft, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          I,
          {
            icon: /* @__PURE__ */ e.jsx(ke, {}),
            onClick: R,
            loading: h,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ce, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          I,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Le, {}),
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
        loading: h,
        rowKey: "id",
        pagination: {
          total: (L == null ? void 0 : L.total) || 0,
          current: (L == null ? void 0 : L.current) || 1,
          pageSize: (L == null ? void 0 : L.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (c, F) => l("pagination.total", {
            defaultValue: `${F[0]}-${F[1]} of ${c} items`,
            start: F[0],
            end: F[1],
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
          o(!1), i.resetFields(), g(null);
        },
        footer: null,
        width: ((M = A == null ? void 0 : A.ui_schema) == null ? void 0 : M["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: i,
            layout: "vertical",
            onFinish: j,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "name",
                    label: t("models.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                    children: /* @__PURE__ */ e.jsx(V, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
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
                        onChange: W,
                        value: b,
                        options: T == null ? void 0 : T.map((c) => ({
                          label: c.name,
                          value: c.provider
                        }))
                      }
                    )
                  }
                ),
                A && /* @__PURE__ */ e.jsx(a.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(qe, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(
                  vs,
                  {
                    schema: A.config_schema,
                    uiSchema: A.ui_schema
                  }
                ) }) }),
                /* @__PURE__ */ e.jsxs(De, { gutter: 16, children: [
                  /* @__PURE__ */ e.jsx(Ve, { span: 12, children: /* @__PURE__ */ e.jsx(
                    a.Item,
                    {
                      name: "max_chat_tokens",
                      label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: t("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(xe, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) }),
                  /* @__PURE__ */ e.jsx(Ve, { span: 12, children: /* @__PURE__ */ e.jsx(
                    a.Item,
                    {
                      name: "max_chat_iterations",
                      label: t("models.maxChatIterations", { defaultValue: "Max chat iterations (tool rounds)" }),
                      tooltip: t("models.maxChatIterationsHelp", {
                        defaultValue: "0 uses default. Positive value caps tool-call iterations for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(xe, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ e.jsxs(
                  a.Item,
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
                /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(
                  I,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: O || z,
                    children: f ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  I,
                  {
                    onClick: () => {
                      o(!1), i.resetFields(), g(null), u("");
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
  const { t } = Y("system"), { t: l } = Y("common"), s = je(), [i] = a.useForm(), [d, o] = y(!1), [f, g] = y(null), [p, n] = y(""), [b, u] = y(!1), [C, T] = y(null), [A, h] = y(""), [L, R] = y(!1), [O, P] = y([]), [z, $] = y(), [X, K] = y(null), { loading: ne, data: U, refresh: _ } = w(
    () => S.system.listToolSets({ current: 1, page_size: 100, search: p, type: z }),
    {
      refreshDeps: [p, z],
      onError: (x) => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", x);
      }
    }
  ), { loading: D, data: W } = w(
    () => S.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (x) => {
        r.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", x);
      }
    }
  ), j = Fe(() => W == null ? void 0 : W.find((x) => x.tool_set_type === A), [W, A]), { loading: G, run: M } = w(
    (x) => S.system.createToolSet({
      ...x,
      type: x.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), o(!1), i.resetFields(), _();
      },
      onError: (x) => {
        r.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", x);
      }
    }
  ), { loading: c, run: F } = w(
    ({ id: x, data: q }) => S.system.updateToolSet({ id: x }, {
      ...q,
      type: q.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), o(!1), i.resetFields(), g(null), _();
      },
      onError: (x) => {
        r.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", x);
      }
    }
  ), { run: H } = w(
    (x) => S.system.deleteToolSet({ id: x }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), _();
      },
      onError: (x) => {
        r.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", x);
      }
    }
  ), { runAsync: Q } = w(
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
  ), { loading: fe, runAsync: Ce } = w(
    (x) => S.system.getToolSetTools({ id: x }),
    {
      manual: !0,
      onSuccess: (x) => {
        P(x || []), R(!0);
      },
      onError: (x) => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", x);
      }
    }
  ), be = ge(
    async (x, q) => {
      K(x.id);
      try {
        await S.system.updateToolSetStatus(
          { id: x.id },
          { status: q ? "enabled" : "disabled" }
        ), r.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), _();
      } catch (v) {
        r.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", v);
      } finally {
        K(null);
      }
    },
    [t, _]
  ), Te = () => {
    g(null), i.resetFields(), h(""), o(!0);
  }, _e = (x) => {
    g(x), h(x.type);
    const q = { ...x };
    i.setFieldsValue(q), o(!0);
  }, we = (x) => {
    h(x), i.setFieldValue("config", {});
  }, he = (x) => {
    f ? F({ id: f.id, data: x }) : M(x);
  }, k = (x) => {
    H(x);
  }, ae = (x) => {
    T(x), u(!0);
  }, pe = [
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
          ce,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(re, { color: v ? "green" : "red", children: v ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Xe,
              {
                title: v ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  ue,
                  {
                    size: "small",
                    checked: v,
                    loading: X === q.id,
                    onChange: (E) => void be(q, E)
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
      render: (x, q) => /* @__PURE__ */ e.jsx(He, { actions: [
        {
          key: "debug",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.debug", { defaultValue: "Debug Tool" }),
          icon: /* @__PURE__ */ e.jsx(ft, {}),
          disabled: q.status !== "enabled",
          onClick: async () => s(`/system/settings/toolsets/${q.id}/debug`)
        },
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(Nt, {}),
          disabled: q.status !== "enabled",
          onClick: async () => Q(q.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(lt, {}),
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
          onClick: async () => k(q.id),
          danger: !0,
          disabled: !!q.is_preset,
          confirm: q.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => k(q.id),
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
          B,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: z,
            onChange: (x) => $(x),
            options: W == null ? void 0 : W.map((x) => ({
              label: x.name,
              value: x.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "", children: "All" }),
              W == null ? void 0 : W.map((x) => /* @__PURE__ */ e.jsx(B.Option, { value: x.tool_set_type, children: x.name }, x.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(
          I,
          {
            icon: /* @__PURE__ */ e.jsx(ke, {}),
            onClick: _,
            loading: ne,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          I,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Le, {}),
            onClick: Te,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(
      Oe,
      {
        columns: pe,
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
          o(!1), i.resetFields(), g(null), h("");
        },
        footer: null,
        width: ((Se = j == null ? void 0 : j.ui_schema) == null ? void 0 : Se["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: i,
            layout: "vertical",
            onFinish: he,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "name",
                    label: t("settings.toolsets.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                    children: /* @__PURE__ */ e.jsx(V, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
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
                  a.Item,
                  {
                    name: "type",
                    label: t("settings.toolsets.type", { defaultValue: "Type" }),
                    rules: [{ required: !0, message: t("settings.toolsets.typeRequired", { defaultValue: "Please select type" }) }],
                    children: /* @__PURE__ */ e.jsx(
                      B,
                      {
                        loading: D,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: we,
                        value: A,
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
                /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(
                  I,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: G || c,
                    children: f ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  I,
                  {
                    onClick: () => {
                      o(!1), i.resetFields(), g(null), h("");
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
        open: b,
        onCancel: () => u(!1),
        footer: [
          /* @__PURE__ */ e.jsx(I, { onClick: () => u(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(C, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: L,
        onCancel: () => R(!1),
        footer: [
          /* @__PURE__ */ e.jsx(I, { onClick: () => R(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: fe ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ke, { style: { fontSize: 24 }, spin: !0 }) }) : O.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : O.map((x, q) => {
          var v, E, te;
          return /* @__PURE__ */ e.jsx(
            le,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(lt, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((v = x.function) == null ? void 0 : v.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(De, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(Ve, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((E = x.function) == null ? void 0 : E.description) || "-" })
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
}, { TextArea: ut } = V;
function Is(t, l) {
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
    const g = (f.tools || []).map((p) => p.name);
    if (o.tool_name === "*") {
      s[o.toolset_id] = [...g];
      continue;
    }
    g.includes(o.tool_name) ? (s[o.toolset_id] || (s[o.toolset_id] = []), s[o.toolset_id].includes(o.tool_name) || s[o.toolset_id].push(o.tool_name)) : i.push({ toolset_id: o.toolset_id, tool_name: o.tool_name });
  }
  return { selections: s, extraPatterns: i };
}
function As(t, l) {
  const s = [], i = /* @__PURE__ */ new Set();
  for (const [d, o] of Object.entries(t))
    for (const f of o) {
      const g = `${d}|${f}`;
      i.has(g) || (i.add(g), s.push({ toolset_id: d, tool_name: f }));
    }
  for (const d of l) {
    const o = d.toolset_id.trim(), f = d.tool_name.trim();
    if (!o || !f)
      continue;
    const g = `${o}|${f}`;
    i.has(g) || (i.add(g), s.push({ toolset_id: o, tool_name: f }));
  }
  return s;
}
function Vt(t, l) {
  const s = l.trim();
  return !s || t.some((i) => i.value === s) ? t : [...t, { value: s, label: s }];
}
function Es(t, l, s, i) {
  const o = [{ value: "*", label: i }], f = /* @__PURE__ */ new Set(["*"]), g = (p, n) => {
    f.has(p) || (f.add(p), o.push({
      value: p,
      label: n ? `${p} — ${n}` : p
    }));
  };
  if (l && l !== "*") {
    const p = t.find((n) => n.id === l);
    for (const n of (p == null ? void 0 : p.tools) || [])
      g(n.name, n.description);
  } else
    for (const p of t)
      for (const n of p.tools || [])
        g(n.name, n.description);
  return Vt(o, s);
}
const zs = () => {
  const { t } = Y("system"), { t: l } = Y("common"), s = je(), { enableSkillToolBinding: i } = bt(), [d] = a.useForm(), [o, f] = y(""), [g, p] = y(), [n, b] = y(!1), [u, C] = y(null), [T, A] = y(null), [h, L] = y(!1), [R] = a.useForm(), [O, P] = y(!1), [z, $] = y(null), [X, K] = y([]), [ne, U] = y({}), [_, D] = y([]), [W, j] = y(!1), G = Fe(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...X.map((m) => ({
      value: m.id,
      label: `${m.name} (${m.id})`
    }))
  ], [X, t]), M = ge(() => {
    K([]), U({}), D([]);
  }, []), { loading: c, data: F, refresh: H } = w(
    () => S.system.listSkills({
      current: 1,
      page_size: 100,
      search: o || void 0,
      domain: g
    }),
    {
      refreshDeps: [o, g],
      onError: () => {
        r.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: Q = [] } = w(() => S.system.listSkillDomains()), fe = (F == null ? void 0 : F.data) ?? [], Ce = (F == null ? void 0 : F.total) ?? 0, { run: be } = w(
    (m) => S.system.deleteSkill({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), H();
      },
      onError: () => {
        r.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Te = ge(
    async (m, N) => {
      $(m.id);
      try {
        await S.system.updateSkillStatus({ id: m.id }, { status: N ? "enabled" : "disabled" }), r.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), H();
      } catch {
        r.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        $(null);
      }
    },
    [t, H]
  ), { loading: _e, run: we } = w(
    (m) => S.system.uploadSkill(m.body, m.file),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), L(!1), R.resetFields(), H();
      },
      onError: () => {
        r.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), he = ge(
    async (m) => {
      j(!0);
      try {
        const [N, J] = await Promise.all([
          S.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          S.system.listSkillAiToolBindings(
            { id: m, current: 1, page_size: 1e3 }
          )
        ]), de = (N.data || []).filter((St) => St.status === "enabled");
        K(de);
        const ee = J.data || [], { selections: se, extraPatterns: Ne } = Is(ee, de);
        U(se), D(Ne);
      } catch {
        r.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), M();
      } finally {
        j(!1);
      }
    },
    [M, t]
  );
  Pe(() => {
    !n || !u || !i || he(u.id);
  }, [n, u == null ? void 0 : u.id, i, he]);
  const k = (m, N) => {
    U((J) => ({ ...J, [m]: N }));
  }, ae = (m, N, J) => {
    U((de) => ({
      ...de,
      [m]: J ? [...N] : []
    }));
  }, pe = () => {
    C(null), A(null), d.resetFields(), M(), b(!0);
  }, Se = (m) => {
    C(m), A(null), d.setFieldsValue({
      name: m.name,
      description: m.description,
      category: m.category,
      domain: m.domain
    }), M(), b(!0);
  }, x = (m) => {
    C(null), A(m), d.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: m.name, defaultValue: "{{name}} (copy)" }),
      description: m.description,
      category: m.category,
      domain: m.domain
    }), M(), b(!0);
  }, q = () => {
    d.validateFields().then(async (m) => {
      P(!0);
      try {
        if (u) {
          const N = {
            name: m.name,
            description: m.description ?? "",
            category: m.category ?? "",
            domain: m.domain ?? ""
          };
          if (await S.system.updateSkill({ id: u.id }, N), i) {
            const J = As(ne, _);
            await S.system.replaceSkillAiToolBindings(
              { id: u.id },
              { bindings: J }
            );
          }
          r.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (T) {
          const N = {
            source_id: T.id,
            name: m.name,
            description: m.description ?? "",
            category: m.category ?? "",
            domain: m.domain ?? ""
          }, { id: J } = await S.system.cloneSkill(N);
          r.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), b(!1), A(null), d.resetFields(), M(), H(), J && s(`/system/settings/skills/${J}/edit`);
          return;
        } else {
          const N = {
            name: m.name,
            description: m.description ?? "",
            category: m.category ?? "",
            domain: m.domain ?? "",
            content: m.content ?? ""
          };
          await S.system.createSkill(N), r.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        b(!1), C(null), A(null), d.resetFields(), M(), H();
      } catch {
        r.error(
          u ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : T ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        P(!1);
      }
    });
  }, v = () => {
    var ee, se;
    const m = (ee = R.getFieldValue("file")) == null ? void 0 : ee.fileList, N = ((se = m == null ? void 0 : m[0]) == null ? void 0 : se.originFileObj) ?? (m == null ? void 0 : m[0]);
    if (!N) {
      r.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const J = R.getFieldValue("category"), de = R.getFieldValue("domain");
    we({ body: { category: J, domain: de }, file: N });
  }, E = i && u, te = E ? 720 : 560, me = !u && !T, Je = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (m, N) => /* @__PURE__ */ e.jsxs(Z, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: m }),
        N.is_preset ? /* @__PURE__ */ e.jsx(re, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (m) => m ? /* @__PURE__ */ e.jsx(re, { children: m }) : "-" },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (m) => m ? /* @__PURE__ */ e.jsx(re, { color: "blue", children: m }) : "-" },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (m, N) => {
        const J = N.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          ce,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(re, { color: J ? "green" : "red", children: J ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Xe,
              {
                title: J ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  ue,
                  {
                    size: "small",
                    checked: J,
                    loading: z === N.id,
                    onChange: (de) => void Te(N, de)
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
      render: (m, N) => /* @__PURE__ */ e.jsx(
        He,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(Ge, {}),
              tooltip: N.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${N.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!N.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(ht, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${N.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Me, {}),
              tooltip: N.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => Se(N),
              permission: "system:skills:update",
              disabled: !!N.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(pt, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => x(N),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              tooltip: N.is_preset ? t("settings.skills.presetDisabledDelete", {
                defaultValue: "Built-in skills cannot be deleted."
              }) : t("settings.skills.actionDelete", { defaultValue: "Delete" }),
              danger: !0,
              disabled: !!N.is_preset,
              confirm: N.is_preset ? void 0 : {
                title: t("settings.skills.deleteSkillConfirm", { defaultValue: "Delete this skill?" }),
                description: t("settings.skills.deleteSkillConfirmDescription", {
                  defaultValue: "The skill and all its files will be removed. This cannot be undone."
                }),
                okText: l("confirm", { defaultValue: "Confirm" }),
                cancelText: l("cancel", { defaultValue: "Cancel" }),
                onConfirm: async () => be(N.id)
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
          B,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: g,
            onChange: p,
            options: Q.map((m) => ({ value: m, label: m }))
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: () => H(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(I, { type: "primary", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: pe, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(rt, {}), onClick: () => L(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(le, { children: [
      /* @__PURE__ */ e.jsx(
        Oe,
        {
          rowKey: "id",
          loading: c,
          columns: Je,
          dataSource: fe,
          pagination: { total: Ce, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        oe,
        {
          title: u ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : T ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: n,
          onOk: q,
          onCancel: () => {
            b(!1), C(null), A(null), M();
          },
          confirmLoading: O,
          width: te,
          children: /* @__PURE__ */ e.jsxs(a, { form: d, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(ut, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(B, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Q.map((m) => ({ value: m, label: m })) }) }),
            me && /* @__PURE__ */ e.jsx(a.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(ut, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            E && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(ye, { spinning: W, children: X.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(Z, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: X.map((m) => {
                const N = (m.tools || []).map((se) => se.name), J = ne[m.id] || [], de = N.length > 0 && J.length === N.length, ee = J.length > 0 && J.length < N.length;
                return /* @__PURE__ */ e.jsx(
                  le,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        et,
                        {
                          checked: de,
                          indeterminate: ee,
                          onChange: (se) => ae(m.id, N, se.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: m.name })
                    ] }),
                    extra: m.description ? /* @__PURE__ */ e.jsx("span", { children: m.description }) : void 0,
                    children: (m.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(et.Group, { style: { width: "100%" }, value: J, onChange: (se) => k(m.id, se), children: /* @__PURE__ */ e.jsx(Z, { direction: "vertical", style: { width: "100%" }, children: (m.tools || []).map((se) => /* @__PURE__ */ e.jsx(et, { value: se.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
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
                  m.id
                );
              }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                  defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                }) }),
                /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, children: [
                  _.map((m, N) => /* @__PURE__ */ e.jsxs(
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
                          ot,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: m.toolset_id,
                            options: Vt(G, m.toolset_id),
                            filterOption: (J, de) => {
                              const ee = de;
                              return `${(ee == null ? void 0 : ee.value) ?? ""} ${(ee == null ? void 0 : ee.label) ?? ""}`.toLowerCase().includes(J.toLowerCase());
                            },
                            onChange: (J) => {
                              const de = typeof J == "string" ? J : "";
                              D(
                                (ee) => ee.map((se, Ne) => Ne === N ? { ...se, toolset_id: de } : se)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          ot,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: m.tool_name,
                            options: Es(
                              X,
                              m.toolset_id,
                              m.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (J, de) => {
                              const ee = de;
                              return `${(ee == null ? void 0 : ee.value) ?? ""} ${(ee == null ? void 0 : ee.label) ?? ""}`.toLowerCase().includes(J.toLowerCase());
                            },
                            onChange: (J) => {
                              const de = typeof J == "string" ? J : "";
                              D(
                                (ee) => ee.map((se, Ne) => Ne === N ? { ...se, tool_name: de } : se)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          I,
                          {
                            type: "default",
                            danger: !0,
                            style: { flexShrink: 0 },
                            onClick: () => D((J) => J.filter((de, ee) => ee !== N)),
                            children: l("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    N
                  )),
                  /* @__PURE__ */ e.jsx(I, { type: "dashed", onClick: () => D((m) => [...m, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
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
          open: h,
          onOk: v,
          onCancel: () => L(!1),
          confirmLoading: _e,
          children: /* @__PURE__ */ e.jsxs(a, { form: R, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(a.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(Ct, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(rt, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(B, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Q.map((m) => ({ value: m, label: m })) }) })
          ] })
        }
      )
    ] })
  ] });
}, Os = () => {
  const t = je(), { t: l } = Y("system"), { t: s } = Y("task"), { t: i } = Y("common"), [d] = a.useForm(), { data: o } = w(S.system.listLogStorageBackends), { data: f } = w(S.system.getTaskSettingFields), g = (o ?? []).map((h) => ({
    value: h.id,
    label: l(`settings.task.logStorage.${h.id}`, { defaultValue: h.name })
  })), { loading: p, refresh: n } = w(S.system.getTaskSettings, {
    onSuccess: (h) => {
      h && d.setFieldsValue(h);
    },
    onError: () => {
      r.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: b, run: u } = w(S.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n();
    },
    onError: () => {
      r.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), C = (h) => {
    u(h);
  }, T = (h) => {
    switch (h.value_type) {
      case "int":
        return /* @__PURE__ */ e.jsx(
          xe,
          {
            style: { width: "100%" },
            addonAfter: h.key.includes("retention_days") ? l("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "bool":
        return /* @__PURE__ */ e.jsx(ue, {});
      default:
        return /* @__PURE__ */ e.jsx(V, {});
    }
  }, A = (h) => h.value_type === "int" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(ye, { spinning: p, children: /* @__PURE__ */ e.jsxs(
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
                options: g,
                placeholder: l("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: o === void 0
              }
            )
          }
        ),
        (f ?? []).map((h) => /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: h.key,
            label: l(`settings.task.fields.${h.key}`, { defaultValue: h.key }),
            rules: A(h),
            valuePropName: h.value_type === "bool" ? "checked" : "value",
            children: T(h)
          },
          h.key
        )),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", loading: b, icon: /* @__PURE__ */ e.jsx(Be, {}), children: i("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(I, { onClick: () => n(), icon: /* @__PURE__ */ e.jsx(ke, {}), children: i("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(ce, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(Dt, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: Ps } = V, Ms = /^[-_a-zA-Z0-9.]+$/, Ls = () => {
  const t = je(), { t: l, i18n: s } = Y("system"), { t: i } = Y("common"), d = (j) => {
    if (!j) return "-";
    const G = new Date(j);
    return Number.isNaN(G.getTime()) ? "-" : G.toLocaleString(s.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [o] = a.useForm(), [f, g] = y(!1), [p, n] = y(null), [b, u] = y(""), [C, T] = y(1), [A, h] = y(10), { loading: L, data: R, refresh: O } = w(
    () => ls({ current: C, page_size: A, search: b }),
    {
      refreshDeps: [C, A, b],
      onError: (j) => {
        r.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", j);
      }
    }
  ), { loading: P, run: z } = w(
    (j) => as(j),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), g(!1), o.resetFields(), n(null), O();
      },
      onError: (j) => {
        r.error((j == null ? void 0 : j.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: $, run: X } = w(
    ({ id: j, ...G }) => is({ id: j }, G),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), g(!1), o.resetFields(), n(null), O();
      },
      onError: (j) => {
        r.error((j == null ? void 0 : j.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: K } = w(
    (j) => ns({ id: j }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), O();
      },
      onError: (j) => {
        r.error((j == null ? void 0 : j.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), ne = () => {
    n(null), o.resetFields(), o.setFieldsValue({ status: "active" }), g(!0);
  }, U = (j) => {
    n(j), o.setFieldsValue({
      name: j.name,
      slug: j.slug,
      description: j.description,
      status: j.status
    }), g(!0);
  }, _ = (j) => {
    oe.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${j.name}"? This action cannot be undone.`
      }),
      onOk: () => K(j.id)
    });
  }, D = () => {
    o.validateFields().then((j) => {
      p ? X({ id: p.id, ...j }) : z(j);
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
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (j, G) => /* @__PURE__ */ e.jsx(
        He,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(ht, {}),
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
              onClick: async () => _(G),
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
        /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: O, children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(I, { type: "primary", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: ne, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (j) => {
                u(j), T(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Oe,
            {
              columns: W,
              dataSource: (R == null ? void 0 : R.data) || [],
              loading: L,
              rowKey: "id",
              pagination: {
                current: C,
                pageSize: A,
                total: (R == null ? void 0 : R.total) || 0,
                showSizeChanger: !0,
                showTotal: (j, G) => i("pagination.total", {
                  defaultValue: `${G[0]}-${G[1]} of ${j} items`,
                  start: G[0],
                  end: G[1],
                  total: j
                }),
                onChange: (j, G) => {
                  T(j), h(G);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          oe,
          {
            title: p ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: f,
            onOk: D,
            onCancel: () => {
              g(!1), o.resetFields(), n(null);
            },
            confirmLoading: P || $,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(a, { form: o, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: l("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: l("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(V, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
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
                a.Item,
                {
                  name: "description",
                  label: l("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Ps, { rows: 3 })
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
}, Rs = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = Y("system"), s = je(), i = es(), f = i.hash.replace("#", "") || "base", { enableMultiOrg: g } = bt(), { hasPermission: p } = ss(), n = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(Ss, {}),
      hidden: !p("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(js, {}),
      hidden: !p("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(ys, {}),
      hidden: !p("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Vs, {}),
      hidden: !p("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(ks, {}),
      hidden: !p("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(ws, {}),
      hidden: !p("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(Fs, {}),
      hidden: !p("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(zs, {}),
      hidden: !p("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Os, {}),
      hidden: !p("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...g ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Ls, {}),
      hidden: !p("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(le, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    mt,
    {
      defaultActiveKey: f,
      onChange: (b) => {
        s(`${i.pathname}#${b}`);
      },
      items: t(n.filter((b) => !b.hidden), l)
    }
  ) });
}, kl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rs
}, Symbol.toStringTag, { value: "Module" })), Ns = () => {
  var _e, we, he;
  const t = je(), { id: l } = Ye(), { t: s } = Y("system"), { t: i } = Y("common"), [d] = a.useForm(), [o] = a.useForm(), [f, g] = y(!1), [p, n] = y(!1), [b, u] = y(null), [C, T] = y(""), [A, h] = y(1), [L, R] = y(10), { data: O, loading: P, refresh: z } = w(
    () => os({ id: l }),
    {
      ready: !!l,
      onError: (k) => {
        r.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", k);
      }
    }
  ), { data: $, loading: X, refresh: K } = w(
    () => rs({ id: l, current: A, page_size: L, search: C }),
    {
      ready: !!l,
      refreshDeps: [l, A, L, C],
      onError: (k) => {
        r.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", k);
      }
    }
  ), { data: ne, loading: U } = w(
    () => ms({ current: 1, page_size: 1e3 }),
    {
      ready: f
    }
  ), { data: _, loading: D } = w(
    () => gs({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: W, run: j } = w(
    (k) => ds({ id: l }, k),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), g(!1), d.resetFields(), K();
      },
      onError: (k) => {
        r.error((k == null ? void 0 : k.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: G, run: M } = w(
    (k) => us({ id: l, user_id: b == null ? void 0 : b.id }, k),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), n(!1), o.resetFields(), u(null), K();
      },
      onError: (k) => {
        r.error((k == null ? void 0 : k.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: c } = w(
    (k) => cs({ id: l, user_id: k }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), K();
      },
      onError: (k) => {
        r.error((k == null ? void 0 : k.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), F = () => {
    g(!0), d.resetFields();
  }, H = (k) => {
    var ae;
    u(k), o.setFieldsValue({
      role_ids: ((ae = k.organization_roles) == null ? void 0 : ae.map((pe) => pe.id)) || []
    }), n(!0);
  }, Q = (k) => {
    oe.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${k.full_name || k.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => c(k.id)
    });
  }, fe = () => {
    d.validateFields().then((k) => {
      j(k);
    });
  }, Ce = () => {
    o.validateFields().then((k) => {
      M(k);
    });
  }, be = ((_e = ne == null ? void 0 : ne.data) == null ? void 0 : _e.filter((k) => {
    var ae;
    return !((ae = $ == null ? void 0 : $.data) != null && ae.some((pe) => pe.id === k.id));
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
      render: (k) => /* @__PURE__ */ e.jsx(re, { color: k === "active" ? "green" : "default", children: k === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : k })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (k, ae) => {
        var pe;
        return /* @__PURE__ */ e.jsx(Z, { wrap: !0, children: ((pe = ae.organization_roles) == null ? void 0 : pe.map((Se) => /* @__PURE__ */ e.jsx(re, { children: Se.name }, Se.id))) || /* @__PURE__ */ e.jsx(re, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (k, ae) => /* @__PURE__ */ e.jsx(
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
            I,
            {
              icon: /* @__PURE__ */ e.jsx(nt, {}),
              onClick: () => t("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            O == null ? void 0 : O.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: () => {
          z(), K();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: P,
        children: /* @__PURE__ */ e.jsxs(ie, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(ie.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: O == null ? void 0 : O.name }),
          /* @__PURE__ */ e.jsx(ie.Item, { label: s("settings.organizations.slug", { defaultValue: "Slug" }), children: (O == null ? void 0 : O.slug) || "-" }),
          /* @__PURE__ */ e.jsx(ie.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(re, { color: (O == null ? void 0 : O.status) === "active" ? "green" : "default", children: (O == null ? void 0 : O.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(ie.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (O == null ? void 0 : O.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      le,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(I, { type: "primary", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: F, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (k) => {
                T(k), h(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Oe,
            {
              columns: Te,
              dataSource: ($ == null ? void 0 : $.data) || [],
              loading: X,
              rowKey: "id",
              pagination: {
                current: A,
                pageSize: L,
                total: ($ == null ? void 0 : $.total) || 0,
                showSizeChanger: !0,
                showTotal: (k) => i("pagination.total", { defaultValue: `Total ${k} items` }),
                onChange: (k, ae) => {
                  h(k), R(ae);
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
        onOk: fe,
        onCancel: () => {
          g(!1), d.resetFields();
        },
        confirmLoading: W,
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
                  loading: U,
                  filterOption: (k, ae) => ((ae == null ? void 0 : ae.label) ?? "").toLowerCase().includes(k.toLowerCase()),
                  options: be.map((k) => ({
                    label: `${k.full_name || k.username} (${k.email})`,
                    value: k.id
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
                  loading: D,
                  options: ((we = _ == null ? void 0 : _.data) == null ? void 0 : we.map((k) => ({
                    label: k.name,
                    value: k.id
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
        open: p,
        onOk: Ce,
        onCancel: () => {
          n(!1), o.resetFields(), u(null);
        },
        confirmLoading: G,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: o, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                V,
                {
                  value: (b == null ? void 0 : b.full_name) || (b == null ? void 0 : b.username),
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
                  loading: D,
                  options: ((he = _ == null ? void 0 : _.data) == null ? void 0 : he.map((k) => ({
                    label: k.name,
                    value: k.id
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
  default: Ns
}, Symbol.toStringTag, { value: "Module" })), Us = $e(() => import("./markdown-viewer.js")), Ds = ps(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: ct } = V, qs = (t) => t.toLowerCase().endsWith(".md");
function kt(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(xt, {}) : /* @__PURE__ */ e.jsx(yt, {}),
      children: (s = l.children) != null && s.length ? kt(l.children) : void 0
    };
  });
}
function tt(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const $s = () => {
  const { styles: t } = Ds(), { id: l } = Ye(), s = je(), { t: i } = Y("system"), [d, o] = y(null), [f, g] = y(null), [p, n] = y(!1), [b, u] = y(""), [C, T] = y(!1), [A, h] = y([]), [L, R] = y(!1), [O, P] = y(!1), [z, $] = y(""), [X] = a.useForm(), [K, ne] = y(null), [U, _] = y(null), [D, W] = y(""), [j] = a.useForm(), { data: G } = w(
    () => l ? S.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: M, loading: c, refresh: F } = w(
    () => l ? S.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (v) => {
        if (!d) {
          for (const E of v)
            if (!E.is_dir && E.name === "SKILL.md") {
              g(E.path), o(E.path), n(!1);
              return;
            }
          for (const E of v)
            if (!E.is_dir && E.name === "SKILLS.md") {
              g(E.path), o(E.path), n(!1);
              return;
            }
        }
      }
    }
  ), H = (G == null ? void 0 : G.data) ?? G, Q = !!(H != null && H.is_preset), fe = (M == null ? void 0 : M.data) ?? M ?? [], Ce = Fe(() => kt(fe), [fe]), be = p && f ? f : d ? tt(d) : "";
  Pe(() => {
    d && l ? (S.system.getSkillFile({ id: l, path: d }).then((v) => {
      u(v.data);
    }).catch(() => r.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), T(!1)) : (u(""), T(!1));
  }, [l, d, i]);
  const Te = () => {
    !l || !d || Q || S.system.putSkillFile({ id: l, path: d }, b).then(() => {
      r.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), T(!1);
    }).catch(() => r.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, _e = (v, E) => {
    const te = String(E.node.key), me = !E.node.isLeaf;
    g(te), n(me), E.node.isLeaf ? o(te) : o(null);
  }, we = (v) => {
    v.event.preventDefault(), ne({
      path: String(v.node.key),
      isDir: !v.node.isLeaf,
      x: v.event.clientX,
      y: v.event.clientY
    });
  }, he = ge(() => ne(null), []), k = ge(
    (v) => {
      if (!l || !K || Q) return;
      const { path: E, isDir: te } = K;
      switch (he(), v) {
        case "open":
          o(E), g(E), n(!1);
          break;
        case "rename": {
          const me = E.includes("/") ? E.split("/").pop() : E;
          _({ path: E, isDir: te }), W(me), setTimeout(() => j.setFieldsValue({ name: me }), 0);
          break;
        }
        case "delete":
          oe.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: te ? i("settings.skills.editor.deleteConfirmContentDir", { path: E, defaultValue: `Delete ${E}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: E, defaultValue: `Delete ${E}?` }),
            onOk: () => S.system.deleteSkillPath({ id: l, path: E }).then(() => {
              r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === E && (o(null), u("")), f === E && (g(null), n(!1)), F();
            }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          g(E), n(te), R(!0);
          break;
        case "newDir":
          g(E), n(te), P(!0);
          break;
      }
    },
    [l, K, he, F, d, f, j, i, Q]
  ), ae = () => {
    if (!l || !U || Q) return;
    const v = (j.getFieldValue("name") ?? D).trim();
    if (!v) {
      r.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!U.isDir && !/\.(md|txt)$/i.test(v)) {
      r.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const E = tt(U.path), te = E ? `${E}/${v}` : v;
    if (te === U.path) {
      _(null);
      return;
    }
    S.system.moveSkillPath({ id: l }, { from_path: U.path, to_path: te }).then(() => {
      r.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === U.path && o(te), f === U.path && g(te), _(null), F();
    }).catch(() => r.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, pe = (v) => {
    if (!l || Q) return;
    const E = String(v.dragNode.key), te = String(v.dragNode.title);
    let me;
    if (v.dropToGap) {
      const Je = tt(String(v.node.key));
      me = Je ? `${Je}/${te}` : te;
    } else
      me = `${v.node.key}/${te}`;
    me !== E && S.system.moveSkillPath({ id: l }, { from_path: E, to_path: me }).then(() => {
      r.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), d === E && o(me), f === E && g(me), F();
    }).catch(() => r.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, Se = () => {
    const v = z.trim();
    if (!v || !l || Q) return;
    const E = be ? `${be}/${v}` : v;
    if (!/\.(md|txt)$/i.test(v)) {
      r.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    S.system.putSkillFile({ id: l, path: E }, "").then(() => {
      r.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), R(!1), $(""), F(), o(E), u("");
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, x = () => {
    var te;
    const v = (te = X.getFieldValue("name")) == null ? void 0 : te.trim();
    if (!v || !l || Q) return;
    const E = be ? `${be}/${v}` : v;
    S.system.createSkillDir({ id: l }, { path: E }).then(() => {
      r.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), P(!1), X.resetFields(), F();
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, q = () => {
    const v = f || d;
    !l || !v || Q || oe.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: v, defaultValue: `Delete ${v}?` }),
      onOk: () => S.system.deleteSkillPath({ id: l, path: v }).then(() => {
        r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === v && (o(null), u("")), f === v && (g(null), n(!1)), F();
      }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    le,
    {
      title: (H == null ? void 0 : H.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(I, { type: "link", onClick: () => s("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        Q ? /* @__PURE__ */ e.jsx(
          st,
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
            /* @__PURE__ */ e.jsxs(Z, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(I, { size: "small", icon: /* @__PURE__ */ e.jsx(Le, {}), disabled: Q, onClick: () => R(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(I, { size: "small", icon: /* @__PURE__ */ e.jsx(xt, {}), disabled: Q, onClick: () => P(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            c ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              Tt,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !Q,
                expandedKeys: A,
                onExpand: (v) => h(v),
                selectedKeys: f ? [f] : [],
                onSelect: _e,
                onRightClick: Q ? void 0 : we,
                onDrop: pe,
                className: t.fileTree,
                treeData: Ce
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(Z, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(I, { type: "primary", icon: /* @__PURE__ */ e.jsx(Be, {}), disabled: Q || !C, onClick: Te, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(I, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ie, {}), disabled: Q, onClick: q, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              qs(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  ct,
                  {
                    value: b,
                    readOnly: Q,
                    onChange: (v) => {
                      u(v.target.value), T(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(qe, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(Us, { content: jt(b) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                ct,
                {
                  value: b,
                  readOnly: Q,
                  onChange: (v) => {
                    u(v.target.value), T(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              )
            ] }),
            !d && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        K && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: he,
              onContextMenu: (v) => v.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: K.x, top: K.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            Ft,
            {
              selectable: !1,
              items: [
                ...K.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(yt, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Me, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ie, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(qt, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx($t, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: v }) => k(v)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(oe, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: L, onOk: Se, onCancel: () => {
          R(!1), $("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: z, onChange: (v) => $(v.target.value) }) }),
        /* @__PURE__ */ e.jsx(oe, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: O, onOk: () => X.validateFields().then(x), onCancel: () => P(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(a, { form: X, layout: "vertical", children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          oe,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!U,
            onOk: ae,
            onCancel: () => _(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(a, { form: j, layout: "vertical", onValuesChange: (v, E) => W(E.name ?? ""), children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: U != null && U.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              V,
              {
                placeholder: U != null && U.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
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
  const { id: t } = Ye(), l = je(), { t: s } = Y("system"), { data: i, loading: d } = w(
    () => t ? S.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: o, loading: f, mutate: g } = w(
    () => t ? S.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => r.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => g()
    }
  ), p = (i == null ? void 0 : i.data) ?? i, n = Fe(() => o == null ? void 0 : o.map((u) => ({
    key: u.file_name,
    label: u.file_name,
    children: /* @__PURE__ */ e.jsx(qe, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(Bs, { content: jt(u.content) }) })
  })), [o]);
  if (!t) return null;
  const b = d || f;
  return /* @__PURE__ */ e.jsx(ye, { spinning: b, children: /* @__PURE__ */ e.jsx(
    le,
    {
      title: (p == null ? void 0 : p.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(I, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: n
    }
  ) });
}, _l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hs
}, Symbol.toStringTag, { value: "Module" })), { Text: ve, Title: Js } = gt, Ks = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(Gt, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(Wt, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Kt, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(lt, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(Ge, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(Jt, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(Ge, {}) }
};
function Qe(t) {
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
  const { parsed: s, isJSON: i } = Qe(t);
  return i ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    Ze,
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
  const { parsed: s, isJSON: i } = Qe(t);
  return i ? /* @__PURE__ */ e.jsxs(ie, { size: "small", column: 2, bordered: !0, children: [
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
  const { parsed: s, isJSON: i } = Qe(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
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
  const { parsed: s, isJSON: i } = Qe(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
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
  const { t } = Y("ai"), l = je(), [s, i] = y(""), [d, o] = y(""), {
    data: f,
    loading: g,
    refresh: p
  } = w(() => S.ai.getAiTraceStatus(), {
    onError: () => {
      r.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), n = (f == null ? void 0 : f.enabled) ?? !1, { loading: b, run: u } = w(
    (z) => S.ai.toggleAiTrace({ enabled: z }),
    {
      manual: !0,
      onSuccess: (z, [$]) => {
        r.success(
          $ ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), p(), $ || o("");
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
    loading: T,
    run: A
  } = w(
    (z) => S.ai.getAiTraceEvents({ trace_id: z }),
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
  ), h = ge(() => {
    s.trim() && (o(s.trim()), A(s.trim()));
  }, [s, A]), L = ge(
    (z) => {
      const $ = z ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      oe.confirm({
        title: z ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: $,
        onOk: () => u(z)
      });
    },
    [t, u]
  ), R = ge(async () => {
    if (d)
      try {
        const z = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!z.ok) throw new Error("download failed");
        const $ = await z.blob(), X = window.URL.createObjectURL($), K = document.createElement("a");
        K.href = X, K.download = `ai-trace-${d}.json`, document.body.appendChild(K), K.click(), window.URL.revokeObjectURL(X), document.body.removeChild(K);
      } catch {
        r.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, t]), O = Fe(() => C ?? [], [C]), P = Fe(
    () => O.map((z) => {
      const $ = Ks[z.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(Ge, {})
      }, X = t(
        `trace.eventTypes.${z.event_type}`,
        { defaultValue: z.event_type }
      );
      return {
        key: z.id,
        dot: $.icon,
        color: $.color,
        children: /* @__PURE__ */ e.jsx(
          It,
          {
            size: "small",
            defaultActiveKey: [z.id],
            items: [
              {
                key: z.id,
                label: /* @__PURE__ */ e.jsxs(Z, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(re, { color: $.color, children: X }),
                  /* @__PURE__ */ e.jsxs(ve, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    z.step_order
                  ] }),
                  z.duration_ms > 0 && /* @__PURE__ */ e.jsxs(ve, { type: "secondary", style: { fontSize: 12 }, children: [
                    t("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    z.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(ve, { type: "secondary", style: { fontSize: 12 }, children: new Date(z.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Xs, { event: z, t })
              }
            ]
          }
        )
      };
    }),
    [O, t]
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
              I,
              {
                icon: /* @__PURE__ */ e.jsx(nt, {}),
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
                loading: g || b,
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
          onChange: (z) => i(z.target.value),
          onPressEnter: h,
          prefix: /* @__PURE__ */ e.jsx(Bt, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(I, { type: "primary", onClick: h, loading: T, children: t("trace.search", { defaultValue: "Search" }) }),
      d && O.length > 0 && /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(Ht, {}), onClick: R, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    T ? /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ye, { size: "large" }) }) }) : d && O.length === 0 ? /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(
      Ue,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : O.length > 0 ? /* @__PURE__ */ e.jsx(le, { children: /* @__PURE__ */ e.jsx(At, { items: P }) }) : null
  ] });
}, wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ys
}, Symbol.toStringTag, { value: "Module" })), Qs = $e(() => import("./json-schema-config-form.js")), { Text: Ee, Title: el } = gt;
function at(t) {
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
  const { parsed: s, isJSON: i } = at(t);
  return i ? /* @__PURE__ */ e.jsx(
    Ze,
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
  const { t } = Y("system"), { t: l } = Y("common"), s = je(), { id: i } = Ye(), [d, o] = y(void 0), [f, g] = y("schema"), [p, n] = y({}), [b, u] = y("{}"), [C, T] = y(null), [A, h] = y(null), { loading: L, data: R } = w(
    () => S.system.getToolSet({ id: i }),
    {
      ready: !!i,
      onError: () => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: O, data: P } = w(
    () => S.system.getToolSetTools({ id: i }),
    {
      ready: !!i,
      onError: () => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), z = P == null ? void 0 : P.find(
    (M) => {
      var c;
      return ((c = M.function) == null ? void 0 : c.name) === d;
    }
  ), { loading: $, run: X } = w(
    (M, c) => S.system.callTool({ id: i }, { name: M, parameters: c }),
    {
      manual: !0,
      onSuccess: (M) => {
        T((M == null ? void 0 : M.result) ?? "");
      },
      onError: (M) => {
        var F, H;
        const c = ((H = (F = M == null ? void 0 : M.response) == null ? void 0 : F.data) == null ? void 0 : H.message) || (M == null ? void 0 : M.message) || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        r.error(c), T(null);
      }
    }
  ), K = ge((M) => {
    o(M), n({}), u("{}"), T(null), h(null);
  }, []), ne = ge(() => {
    if (f === "schema")
      u(JSON.stringify(p, null, 2)), g("code");
    else {
      const { parsed: M, isJSON: c } = at(b);
      c && (n(M ?? {}), h(null)), g("schema");
    }
  }, [f, p, b]), U = ge((M) => {
    u(M);
    const { parsed: c, isJSON: F } = at(M);
    F ? (n(c ?? {}), h(null)) : h(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), _ = ge(() => {
    if (!d) {
      r.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let M;
    if (f === "code") {
      if (A) {
        r.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      M = b;
    } else
      M = JSON.stringify(p);
    T(null), X(d, M);
  }, [d, f, p, b, A, X, t]), D = R, W = (D == null ? void 0 : D.status) === "enabled" ? "green" : "red", j = (D == null ? void 0 : D.status) === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(le, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(Z, { children: [
      /* @__PURE__ */ e.jsx(
        I,
        {
          icon: /* @__PURE__ */ e.jsx(nt, {}),
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
        O ? /* @__PURE__ */ e.jsx(ye, { size: "small" }) : /* @__PURE__ */ e.jsx(
          B,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: d,
            onChange: K,
            optionLabelProp: "label",
            children: (P ?? []).map((M) => {
              var Q, fe;
              const c = ((Q = M.function) == null ? void 0 : Q.name) ?? "", F = ((fe = M.function) == null ? void 0 : fe.description) ?? "", H = F ? `${c} - ${F}` : c;
              return /* @__PURE__ */ e.jsx(B.Option, { value: c, label: H, children: /* @__PURE__ */ e.jsx(
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
              ) }, c);
            })
          }
        )
      ] }),
      z && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
          /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: t("settings.toolsets.parameters", { defaultValue: "Parameters" }) }),
          /* @__PURE__ */ e.jsx(
            Xe,
            {
              title: f === "schema" ? t("settings.toolsets.switchToCodeEditor", { defaultValue: "Switch to JSON editor" }) : t("settings.toolsets.switchToFormEditor", { defaultValue: "Switch to form editor" }),
              children: /* @__PURE__ */ e.jsx(
                I,
                {
                  size: "small",
                  icon: f === "schema" ? /* @__PURE__ */ e.jsx(Zt, {}) : /* @__PURE__ */ e.jsx(Xt, {}),
                  onClick: ne
                }
              )
            }
          )
        ] }),
        f === "schema" ? (G = z.function) != null && G.parameters ? /* @__PURE__ */ e.jsx(qe, { fallback: /* @__PURE__ */ e.jsx(Re, {}), children: /* @__PURE__ */ e.jsx(
          Qs,
          {
            schema: z.function.parameters,
            value: p,
            onChange: n
          }
        ) }) : /* @__PURE__ */ e.jsx(Ee, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            fs,
            {
              value: b,
              height: "200px",
              extensions: [hs()],
              onChange: U,
              basicSetup: { lineNumbers: !0, foldGutter: !0 }
            }
          ),
          A && /* @__PURE__ */ e.jsx(Ee, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: A })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: C !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        I,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Yt, {}),
          loading: $,
          disabled: !d,
          onClick: _,
          children: t("settings.toolsets.callTool", { defaultValue: "Run" })
        }
      ) }),
      C !== null && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Ee, { strong: !0, children: t("settings.toolsets.result", { defaultValue: "Result" }) }) }),
        /* @__PURE__ */ e.jsx(tl, { content: C, maxHeight: 300 })
      ] })
    ] })
  ] });
}, Cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sl
}, Symbol.toStringTag, { value: "Module" })), ll = () => {
  const { t } = Y("system"), [l] = ts(), s = l.get("provider"), i = l.get("code"), d = l.get("state"), [o, f] = y(null), [g, p] = y(null), [n, b] = y(null);
  return w(async () => {
    if (!i || !d || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const u = await S.system.testOauthCallback({ code: i, state: d, provider: s });
    if (!u.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!u.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    f(u.user), p(u.user_info);
  }, {
    onSuccess: () => {
      b({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (u) => {
      b({
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
      extra: /* @__PURE__ */ e.jsxs(Z, { style: { display: !g || !o ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(le, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Ze, { value: g || {} }) }),
        /* @__PURE__ */ e.jsx(le, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Ze, { value: o || {} }) })
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
