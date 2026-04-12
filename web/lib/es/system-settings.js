import { j as e } from "./vendor.js";
import { Form as a, message as r, Spin as je, Switch as de, Select as B, Input as j, Alert as Ge, Divider as Qe, Space as W, Button as F, InputNumber as ce, Modal as ne, Skeleton as yt, Descriptions as ue, Steps as jt, Tag as re, Table as ze, Radio as $e, Tabs as nt, Tooltip as Ye, Card as ae, Row as Ue, Col as ye, Checkbox as We, Empty as Le, AutoComplete as tt, Upload as bt, Tree as Vt, Menu as kt, Collapse as _t, Typography as St, Timeline as vt, Result as wt } from "antd";
import { useTranslation as Z } from "react-i18next";
import { useState as y, useEffect as Oe, useMemo as Te, useCallback as ke } from "react";
import { useRequest as v } from "ahooks";
import { SaveOutlined as De, ReloadOutlined as be, LoadingOutlined as Ct, CheckCircleTwoTone as Ft, StarFilled as Tt, CheckCircleOutlined as It, StarOutlined as At, EditOutlined as Pe, CopyOutlined as ot, DeleteOutlined as Ie, BugOutlined as Et, PlusOutlined as Me, ThunderboltOutlined as zt, ToolOutlined as Ze, SettingOutlined as Ot, FileTextOutlined as Be, EyeOutlined as rt, UploadOutlined as st, CalendarOutlined as Pt, ArrowLeftOutlined as dt, FolderOutlined as ut, FileOutlined as ct, FileAddOutlined as Mt, FolderAddOutlined as Rt, SearchOutlined as Lt, DownloadOutlined as Ut, WarningOutlined as Dt, DashboardOutlined as Nt, MessageOutlined as qt, SendOutlined as $t } from "@ant-design/icons";
import { a as k } from "./index.js";
import { g as lt, c as mt } from "./base.js";
import { f as me, e as Bt, b as Ne, J as Ht, j as Wt, M as gt, L as Kt } from "./components.js";
import Ke from "react-quill";
import { useNavigate as _e, useLocation as Jt, useParams as et, useSearchParams as Gt } from "react-router-dom";
import { c as pt, b as Zt } from "./contexts.js";
import { l as Xt, c as Qt, u as Yt, d as es, g as ts, b as ss, e as ls, f as as, r as is } from "./system.js";
import { l as ns, b as os } from "./authorization.js";
import { createStyles as rs } from "antd-style";
import Xe from "react-json-view";
const Ae = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, ds = {
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
}, us = ({ initialData: t, onRefresh: l }) => {
  const { t: s } = Z("system"), { t: i } = Z("common"), [d] = a.useForm(), [n, x] = y((t == null ? void 0 : t.provider) || "custom"), [g, p] = y((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [o, f] = y((t == null ? void 0 : t.enabled) || !1), [c, z] = y((t == null ? void 0 : t.auto_create_user) || !1), { loading: w, data: I, refresh: T } = v(k.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (S) => {
      d.setFieldsValue(S), x(S.provider), p(S.provider === "custom" || S.provider === "autoDiscover"), f(S.enabled), z(S.auto_create_user);
    },
    onError: (S) => {
      r.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", S);
    }
  });
  Oe(() => {
    t && (d.setFieldsValue(t), x(t.provider), p(t.provider === "custom" || t.provider === "autoDiscover"), f(t.enabled), z(t.auto_create_user));
  }, [t, d]);
  const O = (S) => {
    x(S), p(S === "custom" || S === "autoDiscover");
    const L = ds[S];
    L && d.setFieldsValue({
      auth_endpoint: L.endpoints.auth_endpoint,
      token_endpoint: L.endpoints.token_endpoint,
      userinfo_endpoint: L.endpoints.userinfo_endpoint,
      scope: L.scope,
      // Set field mappings
      email_field: L.email_field,
      username_field: L.username_field,
      full_name_field: L.full_name_field,
      avatar_field: L.avatar_field,
      role_field: L.role_field,
      // Set display configuration
      icon_url: L.icon_url,
      display_name: L.display_name
    });
  }, U = (S) => {
    f(S);
  }, A = (S) => {
    z(S);
  }, { loading: E, run: M } = v(k.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : T();
    },
    onError: (S) => {
      r.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", S);
    }
  }), N = (S) => {
    M(S);
  }, K = () => {
    l ? l() : T();
  }, { loading: H, run: J } = v(async ({ redirect_uri: S, ...L }) => {
    let Q;
    return S ? Q = new URL(S) : Q = new URL(window.location.origin), Q.pathname = lt("/system/settings/oauth/test-callback"), Q.searchParams.set("provider", n), k.system.testOauthConnection({ redirect_uri: Q.toString(), ...L });
  }, {
    manual: !0,
    onSuccess: ({ url: S }) => {
      window.open(S, "_blank");
    },
    onError: (S) => {
      r.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: S.message })), console.error("Failed to test OAuth connection", S);
    }
  }), q = () => n === "custom";
  return /* @__PURE__ */ e.jsx(je, { spinning: w, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: N,
      initialValues: t || I,
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
            rules: [(S) => S.getFieldValue("redirect_uri") !== "" ? {
              pattern: Ae,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(j, { disabled: !o, placeholder: `http://${window.location.host}${lt(`/login?provider=settings.${n}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: A, disabled: !o })
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
          Ge,
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
        /* @__PURE__ */ e.jsx(Qe, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Ge,
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
            children: /* @__PURE__ */ e.jsx(j, { placeholder: "email", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(j, { placeholder: "login", autoComplete: "off", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(j, { placeholder: "name", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(j, { placeholder: "avatar_url", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(j, { placeholder: "role", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              type: "primary",
              htmlType: "submit",
              loading: E,
              icon: /* @__PURE__ */ e.jsx(De, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              loading: H,
              onClick: async () => {
                const S = d.getFieldsValue();
                J(S);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              onClick: K,
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, cs = () => {
  const { t } = Z("system"), { t: l } = Z("common"), [s] = a.useForm(), { loading: i, data: d, refresh: n } = v(k.system.getSecuritySettings, {
    onSuccess: (o) => {
      s.setFieldsValue(o);
    },
    onError: (o) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: x, run: g } = v(k.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n();
    },
    onError: (o) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), p = (o) => {
    g(o);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: i, children: /* @__PURE__ */ e.jsxs(
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
            children: /* @__PURE__ */ e.jsx(ce, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
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
            shouldUpdate: (o, f) => o.login_failure_lock !== f.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
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
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, f) => o.login_failure_lock !== f.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
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
            shouldUpdate: (o, f) => o.history_password_check !== f.history_password_check,
            children: ({ getFieldValue: o }) => o("history_password_check") ? /* @__PURE__ */ e.jsx(
              a.Item,
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
          a.Item,
          {
            name: "inactive_account_lock_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              type: "primary",
              htmlType: "submit",
              loading: x,
              icon: /* @__PURE__ */ e.jsx(De, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
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
}, ms = ({ fetchItems: t, importItems: l, columns: s, ...i }) => {
  const { t: d } = Z("system"), [n, x] = y([]), [g, p] = y([]), { run: o, loading: f } = v(t, {
    onError: (w) => {
      r.error(d("settings.ldap.importError", { error: `${w.message}` }));
    },
    onSuccess: (w) => {
      x(w);
    },
    manual: !0
  }), { run: c, loading: z } = v(async () => {
    for (const w of g.filter((I) => {
      const T = n.find((O) => O.ldap_dn === I);
      return !(!T || T.status === "imported");
    })) {
      const I = await l([w]);
      x((T) => [...T].map((U) => {
        for (const A of I)
          if (U.ldap_dn === A.ldap_dn)
            return { ...A, status: "imported" };
        return U;
      }));
    }
  }, {
    manual: !0
  });
  return Oe(() => {
    i.visible && (x([]), o(), p([]));
  }, [i.visible]), /* @__PURE__ */ e.jsx(
    ne,
    {
      title: d("settings.ldap.importTitle"),
      ...i,
      onOk: () => {
        c();
      },
      width: 900,
      confirmLoading: z,
      loading: f,
      children: /* @__PURE__ */ e.jsx(
        ze,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (w) => {
              p(w);
            },
            getCheckboxProps: (w) => ({
              disabled: w.status === "imported"
            })
          },
          columns: s.map(({ render: w, ...I }) => w ? {
            ...I,
            render: (T, O, U) => {
              const A = g.includes(O.ldap_dn) && z && O.status !== "imported";
              return w(T, O, U, A);
            }
          } : I),
          dataSource: n,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, gs = () => {
  var O, U, A;
  const { t } = Z("system"), [l] = a.useForm(), [s, i] = y(!1), [d, n] = y(null), [x, g] = y(!1), [p, o] = y(!1), [f] = a.useForm(), [c, z] = y(!1);
  v(k.system.getLdapSettings, {
    onSuccess: (E) => {
      l.setFieldsValue(E), z(E.enabled);
    },
    onError: (E) => {
      r.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${E.message}` }));
    }
  }), Oe(() => {
    n(null);
  }, [x]);
  const w = async (E) => {
    i(!0);
    try {
      await k.system.updateLdapSettings(E), r.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      r.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      i(!1);
    }
  }, { run: I, loading: T } = v(async (E) => {
    const M = await l.validateFields();
    return await k.system.testLdapConnection({
      ...E,
      ...M
    });
  }, {
    onSuccess: (E) => {
      n(E);
    },
    onError: (E) => {
      r.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${E.message}` }));
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
              children: /* @__PURE__ */ e.jsx(de, { onChange: (E) => z(E) })
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
          /* @__PURE__ */ e.jsx(Qe, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
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
            /* @__PURE__ */ e.jsx(me, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(F, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(me, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              F,
              {
                disabled: !c,
                style: { marginLeft: 8 },
                onClick: () => g(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(me, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              F,
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
        open: x,
        onCancel: () => g(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            a,
            {
              form: f,
              layout: "vertical",
              onFinish: I,
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
                  /* @__PURE__ */ e.jsx(me, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(F, { disabled: !c, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    F,
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
          /* @__PURE__ */ e.jsx(je, { spinning: T, children: /* @__PURE__ */ e.jsx(yt, { active: T, loading: T, children: d && (d.user ? /* @__PURE__ */ e.jsxs(ue, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(ue.Item, { label: "Username", span: 3, children: d.user.username }),
            /* @__PURE__ */ e.jsx(ue.Item, { label: "Email", span: 3, children: d.user.email }),
            /* @__PURE__ */ e.jsx(ue.Item, { label: "FullName", span: 3, children: d.user.full_name }),
            /* @__PURE__ */ e.jsx(ue.Item, { label: "CreatedAt", span: 3, children: d.user.created_at }),
            /* @__PURE__ */ e.jsx(ue.Item, { label: "UpdatedAt", span: 3, children: d.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            jt,
            {
              direction: "vertical",
              current: (O = d.message) == null ? void 0 : O.findIndex((E) => !E.success),
              status: (U = d.message) != null && U.find((E) => !E.success) ? "error" : "finish",
              items: (A = d.message) == null ? void 0 : A.map((E) => ({
                status: E.success ? "finish" : "error",
                title: E.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      ms,
      {
        visible: p,
        onCancel: () => o(!1),
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
          render: (E, M, N, K) => K ? /* @__PURE__ */ e.jsx(je, { indicator: /* @__PURE__ */ e.jsx(Ct, { spin: !0 }) }) : E ? /* @__PURE__ */ e.jsx(Ft, { twoToneColor: "#52c41a" }) : M.id ? /* @__PURE__ */ e.jsx(re, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(re, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, ps = () => {
  const { t } = Z("system"), { t: l } = Z("common"), [s] = a.useForm(), [i, d] = y(null), [n, x] = y(!1), [g] = a.useForm(), [p, o] = y(!1), { loading: f } = v(k.system.getSmtpSettings, {
    onSuccess: (T) => {
      s.setFieldsValue(T), o(T.enabled);
    },
    onError: (T) => {
      r.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${T.message}` }));
    }
  });
  Oe(() => {
    d(null);
  }, [n]);
  const { run: c, loading: z } = v(({ port: T, ...O }) => k.system.updateSmtpSettings({ ...O, port: Number(T) }), {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (T) => {
      r.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${T.message}` }));
    }
  }), { run: w, loading: I } = v(async (T) => {
    const { port: O, ...U } = await s.validateFields();
    return await k.system.testSmtpConnection({
      ...T,
      ...U,
      port: Number(O)
    });
  }, {
    onSuccess: (T) => {
      d(T);
    },
    onError: (T) => {
      r.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${T.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(je, { spinning: f, children: /* @__PURE__ */ e.jsxs(
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
              children: /* @__PURE__ */ e.jsx(de, { onChange: (T) => o(T) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: p, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !p, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: p, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { type: "number", disabled: !p, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: p, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(j, { disabled: !p, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(j.Password, { disabled: !p, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: p, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs($e.Group, { disabled: !p, children: [
                /* @__PURE__ */ e.jsx($e.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx($e.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx($e.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
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
              children: /* @__PURE__ */ e.jsx(j, { disabled: !p, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(j, { disabled: !p, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(Qe, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(Ke, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(Ke, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(Ke, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(me, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(F, { type: "primary", htmlType: "submit", loading: z, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              F,
              {
                onClick: () => x(!0),
                disabled: !p || I,
                loading: I,
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
        onCancel: () => x(!1),
        footer: [
          /* @__PURE__ */ e.jsx(F, { onClick: () => x(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(F, { type: "primary", loading: I, onClick: () => g.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: g,
            layout: "vertical",
            onFinish: (T) => w(T),
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
}, fs = () => {
  const { t, i18n: l } = Z("system"), { t: s } = Z("common"), [i] = a.useForm(), { loading: d, data: n, refresh: x } = v(k.system.getSystemBaseSettings, {
    onSuccess: (f) => {
      i.setFieldsValue(f);
    },
    onError: (f) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", f);
    }
  }), { loading: g, run: p } = v(k.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), x();
    },
    onError: (f) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", f);
    }
  }), o = (f) => {
    p(f);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: d, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: i,
      layout: "vertical",
      onFinish: o,
      initialValues: n,
      children: [
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(nt, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", children: /* @__PURE__ */ e.jsx(j, {}) }) })
        }, ...Bt.map((f) => ({
          key: f.lang,
          label: l.language !== f.lang ? s(`language.${f.lang}`, { defaultValue: f.label, lang: f.label }) : f.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: ["name_i18n", f.lang], children: /* @__PURE__ */ e.jsx(j, {}) }) })
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
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              type: "primary",
              htmlType: "submit",
              loading: g,
              icon: /* @__PURE__ */ e.jsx(De, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              onClick: () => x(),
              icon: /* @__PURE__ */ e.jsx(be, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: hs } = j, xs = () => {
  var ie;
  const { t } = Z("ai"), { t: l } = Z("common"), s = _e(), [i] = a.useForm(), [d, n] = y(!1), [x, g] = y(null), [p, o] = y(""), [f, c] = y(""), { loading: z, data: w } = v(
    () => k.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (h) => {
        r.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", h);
      }
    }
  ), I = Te(() => w == null ? void 0 : w.find((h) => h.provider === f), [w, f]), { loading: T, data: O, refresh: U } = v(
    () => k.ai.listAiModels({ current: 1, page_size: 100, search: p }),
    {
      refreshDeps: [p],
      onError: (h) => {
        r.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", h);
      }
    }
  ), { loading: A, run: E } = v(
    ({ config: h, ...P }) => k.ai.createAiModel({ config: h ?? {}, ...P }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), n(!1), i.resetFields(), U();
      },
      onError: (h) => {
        r.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", h);
      }
    }
  ), { loading: M, run: N } = v(
    ({ id: h, data: P }) => k.ai.updateAiModel({ id: h }, P),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), n(!1), i.resetFields(), g(null), U();
      },
      onError: (h) => {
        r.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", h);
      }
    }
  ), { runAsync: K } = v(
    (h) => k.ai.deleteAiModel({ id: h }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), U();
      },
      onError: (h) => {
        r.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", h);
      }
    }
  ), { runAsync: H } = v(
    (h) => k.ai.testAiModel({ id: h }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (h) => {
        r.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", h);
      }
    }
  ), { runAsync: J } = v(
    (h) => k.ai.setDefaultAiModel({ id: h }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), U();
      },
      onError: (h) => {
        r.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", h);
      }
    }
  ), q = () => {
    g(null), c(""), i.resetFields(), n(!0);
  }, S = (h) => {
    g(h), c(h.provider);
    const P = h.config || {}, X = {
      name: h.name,
      description: h.description,
      provider: h.provider,
      is_default: h.is_default,
      config: P,
      // Spread config fields to form
      status: h.status,
      max_chat_tokens: h.max_chat_tokens ?? 0,
      max_chat_iterations: h.max_chat_iterations ?? 0
    };
    i.setFieldsValue(X), n(!0);
  }, L = async (h) => {
    g(null), c(h.provider), i.resetFields();
    try {
      const P = await k.ai.getAiModel({ id: h.id }), X = { ...P.config || {} };
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
  }, Q = (h) => {
    c(h), i.setFieldValue("config", void 0);
  }, V = (h) => {
    let P = h.config ?? {};
    const X = {
      name: h.name,
      description: h.description,
      provider: h.provider,
      config: P,
      is_default: h.is_default,
      status: h.status,
      max_chat_tokens: h.max_chat_tokens ?? 0,
      max_chat_iterations: h.max_chat_iterations ?? 0
    };
    x ? N({ id: x.id, data: X }) : E(X);
  }, G = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (h, P) => /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx("span", { children: h }),
        P.is_default && /* @__PURE__ */ e.jsx(Ye, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Tt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (h) => /* @__PURE__ */ e.jsx(re, { color: "blue", children: h.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (h) => /* @__PURE__ */ e.jsx(re, { color: h === "enabled" ? "green" : "red", children: h === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (h, P) => /* @__PURE__ */ e.jsx(Ne, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(It, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => H(P.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(At, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => J(P.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => S(P)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(ot, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => L(P)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => K(P.id),
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
          onSearch: (h) => o(h),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(me, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          F,
          {
            icon: /* @__PURE__ */ e.jsx(Et, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          F,
          {
            icon: /* @__PURE__ */ e.jsx(be, {}),
            onClick: U,
            loading: T,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(me, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          F,
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
        loading: T,
        rowKey: "id",
        pagination: {
          total: (O == null ? void 0 : O.total) || 0,
          current: (O == null ? void 0 : O.current) || 1,
          pageSize: (O == null ? void 0 : O.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (h, P) => l("pagination.total", {
            defaultValue: `${P[0]}-${P[1]} of ${h} items`,
            start: P[0],
            end: P[1],
            total: h
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      ne,
      {
        title: x ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: d,
        onCancel: () => {
          n(!1), i.resetFields(), g(null);
        },
        footer: null,
        width: ((ie = I == null ? void 0 : I.ui_schema) == null ? void 0 : ie["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: i,
            layout: "vertical",
            onFinish: V,
            autoComplete: "off",
            children: [
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
                    hs,
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
                      loading: z,
                      placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                      onChange: Q,
                      value: f,
                      options: w == null ? void 0 : w.map((h) => ({
                        label: h.name,
                        value: h.provider
                      }))
                    }
                  )
                }
              ),
              I && /* @__PURE__ */ e.jsx(a.Item, { name: ["config"], style: {
                minHeight: 300,
                maxHeight: "calc(100vh - 800px)",
                overflowY: "auto",
                overflowX: "hidden"
              }, children: /* @__PURE__ */ e.jsx(
                Ht,
                {
                  schema: I.config_schema,
                  uiSchema: I.ui_schema
                }
              ) }),
              /* @__PURE__ */ e.jsxs(Ue, { gutter: 16, children: [
                /* @__PURE__ */ e.jsx(ye, { span: 12, children: /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    name: "max_chat_tokens",
                    label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                    tooltip: t("models.maxChatTokensHelp", {
                      defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                    }),
                    children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, placeholder: "0" })
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
                    children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, placeholder: "0" })
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
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(j, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: A || M,
                    children: x ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    onClick: () => {
                      n(!1), i.resetFields(), g(null), c("");
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
}, { TextArea: ys } = j, js = () => {
  var ge;
  const { t } = Z("system"), { t: l } = Z("common"), [s] = a.useForm(), [i, d] = y(!1), [n, x] = y(null), [g, p] = y(""), [o, f] = y(!1), [c, z] = y(null), [w, I] = y(""), [T, O] = y(!1), [U, A] = y([]), [E, M] = y(), [N, K] = y(null), { loading: H, data: J, refresh: q } = v(
    () => k.system.listToolSets({ current: 1, page_size: 100, search: g, type: E }),
    {
      refreshDeps: [g, E],
      onError: (m) => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", m);
      }
    }
  ), { loading: S, data: L } = v(
    () => k.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (m) => {
        r.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", m);
      }
    }
  ), Q = Te(() => L == null ? void 0 : L.find((m) => m.tool_set_type === w), [L, w]), { loading: V, run: G } = v(
    (m) => k.system.createToolSet({
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
  ), { loading: ie, run: h } = v(
    ({ id: m, data: D }) => k.system.updateToolSet({ id: m }, {
      ...D,
      type: D.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), d(!1), s.resetFields(), x(null), q();
      },
      onError: (m) => {
        r.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", m);
      }
    }
  ), { run: P } = v(
    (m) => k.system.deleteToolSet({ id: m }),
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
    (m) => k.system.testToolSet({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (m) => {
        r.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", m);
      }
    }
  ), { loading: ee, runAsync: Se } = v(
    (m) => k.system.getToolSetTools({ id: m }),
    {
      manual: !0,
      onSuccess: (m) => {
        A(m || []), O(!0);
      },
      onError: (m) => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", m);
      }
    }
  ), Ce = ke(
    async (m, D) => {
      K(m.id);
      try {
        await k.system.updateToolSetStatus(
          { id: m.id },
          { status: D ? "enabled" : "disabled" }
        ), r.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), q();
      } catch (pe) {
        r.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", pe);
      } finally {
        K(null);
      }
    },
    [t, q]
  ), xe = () => {
    x(null), s.resetFields(), I(""), d(!0);
  }, Fe = (m) => {
    x(m), I(m.type);
    const D = { ...m };
    s.setFieldsValue(D), d(!0);
  }, ve = (m) => {
    I(m), s.setFieldValue("config", {});
  }, we = (m) => {
    n ? h({ id: n.id, data: m }) : G(m);
  }, he = (m) => {
    P(m);
  }, b = (m) => {
    z(m), f(!0);
  }, se = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (m, D) => /* @__PURE__ */ e.jsxs(W, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: m }),
        D.is_preset ? /* @__PURE__ */ e.jsx(re, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
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
      render: (m, D) => {
        const pe = D.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          me,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(re, { color: pe ? "green" : "red", children: pe ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Ye,
              {
                title: pe ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: pe,
                    loading: N === D.id,
                    onChange: (_) => void Ce(D, _)
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
      render: (m, D) => /* @__PURE__ */ e.jsx(Ne, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(zt, {}),
          disabled: D.status !== "enabled",
          onClick: async () => X(D.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Ze, {}),
          permission: "system:toolsets:view",
          disabled: D.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => Se(D.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(Ot, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => b(D.config),
          disabled: !D.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: D.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Pe, {}),
          onClick: async () => Fe(D),
          disabled: !!D.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          permission: "system:toolsets:delete",
          tooltip: D.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : l("delete", { defaultValue: "Delete" }),
          onClick: async () => he(D.id),
          danger: !0,
          disabled: !!D.is_preset,
          confirm: D.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => he(D.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ue, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          j.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (m) => p(m),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          B,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: E,
            onChange: (m) => M(m),
            options: L == null ? void 0 : L.map((m) => ({
              label: m.name,
              value: m.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "", children: "All" }),
              L == null ? void 0 : L.map((m) => /* @__PURE__ */ e.jsx(B.Option, { value: m.tool_set_type, children: m.name }, m.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          F,
          {
            icon: /* @__PURE__ */ e.jsx(be, {}),
            onClick: q,
            loading: H,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(me, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          F,
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
          showTotal: (m, D) => l("pagination.total", {
            defaultValue: `${D[0]}-${D[1]} of ${m} items`,
            start: D[0],
            end: D[1],
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
          d(!1), s.resetFields(), x(null), I("");
        },
        footer: null,
        width: ((ge = Q == null ? void 0 : Q.ui_schema) == null ? void 0 : ge["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: s,
            layout: "vertical",
            onFinish: we,
            autoComplete: "off",
            children: [
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
                    ys,
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
                      loading: S,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: ve,
                      value: w,
                      options: L == null ? void 0 : L.map((m) => ({
                        label: m.name,
                        value: m.tool_set_type
                      }))
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                Wt,
                {
                  name: "config",
                  schema: Q == null ? void 0 : Q.config_schema,
                  uiSchema: Q == null ? void 0 : Q.ui_schema
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(j, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: V || ie,
                    children: n ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    onClick: () => {
                      d(!1), s.resetFields(), x(null), I("");
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
        onCancel: () => f(!1),
        footer: [
          /* @__PURE__ */ e.jsx(F, { onClick: () => f(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(c, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ne,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: T,
        onCancel: () => O(!1),
        footer: [
          /* @__PURE__ */ e.jsx(F, { onClick: () => O(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: ee ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(be, { style: { fontSize: 24 }, spin: !0 }) }) : U.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : U.map((m, D) => {
          var pe, _, C;
          return /* @__PURE__ */ e.jsx(
            ae,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(Ze, {}),
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
                ((C = m.function) == null ? void 0 : C.parameters) && /* @__PURE__ */ e.jsxs(ye, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(m.function.parameters, null, 2) })
                ] })
              ] })
            },
            D
          );
        }) })
      }
    )
  ] });
}, { TextArea: at } = j;
function bs(t, l) {
  const s = {}, i = [], d = new Map(l.map((n) => [n.id, n]));
  for (const n of t) {
    if (n.toolset_id === "*") {
      i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
      continue;
    }
    const x = d.get(n.toolset_id);
    if (!x) {
      i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
      continue;
    }
    const g = (x.tools || []).map((p) => p.name);
    if (n.tool_name === "*") {
      s[n.toolset_id] = [...g];
      continue;
    }
    g.includes(n.tool_name) ? (s[n.toolset_id] || (s[n.toolset_id] = []), s[n.toolset_id].includes(n.tool_name) || s[n.toolset_id].push(n.tool_name)) : i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
  }
  return { selections: s, extraPatterns: i };
}
function Vs(t, l) {
  const s = [], i = /* @__PURE__ */ new Set();
  for (const [d, n] of Object.entries(t))
    for (const x of n) {
      const g = `${d}|${x}`;
      i.has(g) || (i.add(g), s.push({ toolset_id: d, tool_name: x }));
    }
  for (const d of l) {
    const n = d.toolset_id.trim(), x = d.tool_name.trim();
    if (!n || !x)
      continue;
    const g = `${n}|${x}`;
    i.has(g) || (i.add(g), s.push({ toolset_id: n, tool_name: x }));
  }
  return s;
}
function ft(t, l) {
  const s = l.trim();
  return !s || t.some((i) => i.value === s) ? t : [...t, { value: s, label: s }];
}
function ks(t, l, s, i) {
  const n = [{ value: "*", label: i }], x = /* @__PURE__ */ new Set(["*"]), g = (p, o) => {
    x.has(p) || (x.add(p), n.push({
      value: p,
      label: o ? `${p} — ${o}` : p
    }));
  };
  if (l && l !== "*") {
    const p = t.find((o) => o.id === l);
    for (const o of (p == null ? void 0 : p.tools) || [])
      g(o.name, o.description);
  } else
    for (const p of t)
      for (const o of p.tools || [])
        g(o.name, o.description);
  return ft(n, s);
}
const _s = () => {
  const { t } = Z("system"), { t: l } = Z("common"), s = _e(), { enableSkillToolBinding: i } = pt(), [d] = a.useForm(), [n, x] = y(""), [g, p] = y(), [o, f] = y(!1), [c, z] = y(null), [w, I] = y(null), [T, O] = y(!1), [U] = a.useForm(), [A, E] = y(!1), [M, N] = y(null), [K, H] = y([]), [J, q] = y({}), [S, L] = y([]), [Q, V] = y(!1), G = Te(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...K.map((u) => ({
      value: u.id,
      label: `${u.name} (${u.id})`
    }))
  ], [K, t]), ie = ke(() => {
    H([]), q({}), L([]);
  }, []), { loading: h, data: P, refresh: X } = v(
    () => k.system.listSkills({
      current: 1,
      page_size: 100,
      search: n || void 0,
      domain: g
    }),
    {
      refreshDeps: [n, g],
      onError: () => {
        r.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: ee = [] } = v(() => k.system.listSkillDomains()), Se = (P == null ? void 0 : P.data) ?? [], Ce = (P == null ? void 0 : P.total) ?? 0, { run: xe } = v(
    (u) => k.system.deleteSkill({ id: u }),
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
    async (u, R) => {
      N(u.id);
      try {
        await k.system.updateSkillStatus({ id: u.id }, { status: R ? "enabled" : "disabled" }), r.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), X();
      } catch {
        r.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        N(null);
      }
    },
    [t, X]
  ), { loading: ve, run: we } = v(
    (u) => k.system.uploadSkill(u.body, u.file),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), O(!1), U.resetFields(), X();
      },
      onError: () => {
        r.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), he = ke(
    async (u) => {
      V(!0);
      try {
        const [R, $] = await Promise.all([
          k.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          k.system.listSkillAiToolBindings(
            { id: u, current: 1, page_size: 1e3 }
          )
        ]), oe = (R.data || []).filter((xt) => xt.status === "enabled");
        H(oe);
        const Y = $.data || [], { selections: te, extraPatterns: Re } = bs(Y, oe);
        q(te), L(Re);
      } catch {
        r.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), ie();
      } finally {
        V(!1);
      }
    },
    [ie, t]
  );
  Oe(() => {
    !o || !c || !i || he(c.id);
  }, [o, c == null ? void 0 : c.id, i, he]);
  const b = (u, R) => {
    q(($) => ({ ...$, [u]: R }));
  }, se = (u, R, $) => {
    q((oe) => ({
      ...oe,
      [u]: $ ? [...R] : []
    }));
  }, ge = () => {
    z(null), I(null), d.resetFields(), ie(), f(!0);
  }, m = (u) => {
    z(u), I(null), d.setFieldsValue({
      name: u.name,
      description: u.description,
      category: u.category,
      domain: u.domain
    }), ie(), f(!0);
  }, D = (u) => {
    z(null), I(u), d.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: u.name, defaultValue: "{{name}} (copy)" }),
      description: u.description,
      category: u.category,
      domain: u.domain
    }), ie(), f(!0);
  }, pe = () => {
    d.validateFields().then(async (u) => {
      E(!0);
      try {
        if (c) {
          const R = {
            name: u.name,
            description: u.description ?? "",
            category: u.category ?? "",
            domain: u.domain ?? ""
          };
          if (await k.system.updateSkill({ id: c.id }, R), i) {
            const $ = Vs(J, S);
            await k.system.replaceSkillAiToolBindings(
              { id: c.id },
              { bindings: $ }
            );
          }
          r.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (w) {
          const R = {
            source_id: w.id,
            name: u.name,
            description: u.description ?? "",
            category: u.category ?? "",
            domain: u.domain ?? ""
          }, { id: $ } = await k.system.cloneSkill(R);
          r.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), f(!1), I(null), d.resetFields(), ie(), X(), $ && s(`/system/settings/skills/${$}/edit`);
          return;
        } else {
          const R = {
            name: u.name,
            description: u.description ?? "",
            category: u.category ?? "",
            domain: u.domain ?? "",
            content: u.content ?? ""
          };
          await k.system.createSkill(R), r.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        f(!1), z(null), I(null), d.resetFields(), ie(), X();
      } catch {
        r.error(
          c ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : w ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        E(!1);
      }
    });
  }, _ = () => {
    var Y, te;
    const u = (Y = U.getFieldValue("file")) == null ? void 0 : Y.fileList, R = ((te = u == null ? void 0 : u[0]) == null ? void 0 : te.originFileObj) ?? (u == null ? void 0 : u[0]);
    if (!R) {
      r.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const $ = U.getFieldValue("category"), oe = U.getFieldValue("domain");
    we({ body: { category: $, domain: oe }, file: R });
  }, C = i && c, le = C ? 720 : 560, fe = !c && !w, qe = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (u, R) => /* @__PURE__ */ e.jsxs(W, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: u }),
        R.is_preset ? /* @__PURE__ */ e.jsx(re, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (u) => u ? /* @__PURE__ */ e.jsx(re, { children: u }) : "-" },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (u) => u ? /* @__PURE__ */ e.jsx(re, { color: "blue", children: u }) : "-" },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (u, R) => {
        const $ = R.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          me,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(re, { color: $ ? "green" : "red", children: $ ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Ye,
              {
                title: $ ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: $,
                    loading: M === R.id,
                    onChange: (oe) => void Fe(R, oe)
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
      render: (u, R) => /* @__PURE__ */ e.jsx(
        Ne,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(Be, {}),
              tooltip: R.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${R.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!R.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(rt, {}),
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
              onClick: async () => m(R),
              permission: "system:skills:update",
              disabled: !!R.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(ot, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => D(R),
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
                onConfirm: async () => xe(R.id)
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
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          j.Search,
          {
            placeholder: l("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: x,
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
            options: ee.map((u) => ({ value: u, label: u }))
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(ye, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => X(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(me, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: ge, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(me, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(st, {}), onClick: () => O(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsx(
        ze,
        {
          rowKey: "id",
          loading: h,
          columns: qe,
          dataSource: Se,
          pagination: { total: Ce, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        ne,
        {
          title: c ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : w ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: o,
          onOk: pe,
          onCancel: () => {
            f(!1), z(null), I(null), ie();
          },
          confirmLoading: A,
          width: le,
          children: /* @__PURE__ */ e.jsxs(a, { form: d, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(j, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(at, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(j, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(B, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: ee.map((u) => ({ value: u, label: u })) }) }),
            fe && /* @__PURE__ */ e.jsx(a.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(at, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            C && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(je, { spinning: Q, children: K.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(W, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: K.map((u) => {
                const R = (u.tools || []).map((te) => te.name), $ = J[u.id] || [], oe = R.length > 0 && $.length === R.length, Y = $.length > 0 && $.length < R.length;
                return /* @__PURE__ */ e.jsx(
                  ae,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        We,
                        {
                          checked: oe,
                          indeterminate: Y,
                          onChange: (te) => se(u.id, R, te.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: u.name })
                    ] }),
                    extra: u.description ? /* @__PURE__ */ e.jsx("span", { children: u.description }) : void 0,
                    children: (u.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(We.Group, { style: { width: "100%" }, value: $, onChange: (te) => b(u.id, te), children: /* @__PURE__ */ e.jsx(W, { direction: "vertical", style: { width: "100%" }, children: (u.tools || []).map((te) => /* @__PURE__ */ e.jsx(We, { value: te.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: te.name }),
                      te.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: te.description })
                    ] }) }, te.name)) }) }) : /* @__PURE__ */ e.jsx(
                      Le,
                      {
                        image: Le.PRESENTED_IMAGE_SIMPLE,
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
                /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, children: [
                  S.map((u, R) => /* @__PURE__ */ e.jsxs(
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
                          tt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: u.toolset_id,
                            options: ft(G, u.toolset_id),
                            filterOption: ($, oe) => {
                              const Y = oe;
                              return `${(Y == null ? void 0 : Y.value) ?? ""} ${(Y == null ? void 0 : Y.label) ?? ""}`.toLowerCase().includes($.toLowerCase());
                            },
                            onChange: ($) => {
                              const oe = typeof $ == "string" ? $ : "";
                              L(
                                (Y) => Y.map((te, Re) => Re === R ? { ...te, toolset_id: oe } : te)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          tt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: u.tool_name,
                            options: ks(
                              K,
                              u.toolset_id,
                              u.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: ($, oe) => {
                              const Y = oe;
                              return `${(Y == null ? void 0 : Y.value) ?? ""} ${(Y == null ? void 0 : Y.label) ?? ""}`.toLowerCase().includes($.toLowerCase());
                            },
                            onChange: ($) => {
                              const oe = typeof $ == "string" ? $ : "";
                              L(
                                (Y) => Y.map((te, Re) => Re === R ? { ...te, tool_name: oe } : te)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          F,
                          {
                            type: "default",
                            danger: !0,
                            style: { flexShrink: 0 },
                            onClick: () => L(($) => $.filter((oe, Y) => Y !== R)),
                            children: l("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    R
                  )),
                  /* @__PURE__ */ e.jsx(F, { type: "dashed", onClick: () => L((u) => [...u, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                ] })
              ] })
            ] }) : /* @__PURE__ */ e.jsx(
              Le,
              {
                image: Le.PRESENTED_IMAGE_SIMPLE,
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
          open: T,
          onOk: _,
          onCancel: () => O(!1),
          confirmLoading: ve,
          children: /* @__PURE__ */ e.jsxs(a, { form: U, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(a.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(bt, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(st, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(j, {}) }),
            /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(B, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: ee.map((u) => ({ value: u, label: u })) }) })
          ] })
        }
      )
    ] })
  ] });
}, Ss = () => {
  const t = _e(), { t: l } = Z("system"), { t: s } = Z("task"), { t: i } = Z("common"), [d] = a.useForm(), { data: n } = v(k.system.listLogStorageBackends), x = (n ?? []).map((z) => ({
    value: z.id,
    label: l(`settings.task.logStorage.${z.id}`, { defaultValue: z.name })
  })), { loading: g, refresh: p } = v(k.system.getTaskSettings, {
    onSuccess: (z) => {
      z && d.setFieldsValue({
        max_concurrent: z.max_concurrent,
        log_storage_backend: z.log_storage_backend ?? "database",
        ai_chat_retention_days: z.ai_chat_retention_days ?? 90,
        log_retention_days: z.log_retention_days ?? 30,
        audit_log_retention_days: z.audit_log_retention_days ?? 365
      });
    },
    onError: () => {
      r.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: o, run: f } = v(k.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), p();
    },
    onError: () => {
      r.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), c = (z) => {
    f(z);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: c,
      initialValues: {
        max_concurrent: 10,
        log_storage_backend: "database",
        ai_chat_retention_days: 90,
        task_log_retention_days: 30,
        audit_log_retention_days: 365
      },
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
                options: x,
                placeholder: l("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: n === void 0
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "max_concurrent",
            label: l("settings.task.maxConcurrent", { defaultValue: "Max concurrent tasks" }),
            tooltip: l("settings.task.maxConcurrentTooltip", {
              defaultValue: "Maximum number of tasks that can run at the same time."
            }),
            rules: [{ type: "number", min: 1, max: 100 }],
            children: /* @__PURE__ */ e.jsx(ce, { min: 1, max: 100, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "ai_chat_retention_days",
            label: l("settings.task.aiChatRetentionDays", { defaultValue: "AI chat retention (days)" }),
            tooltip: l("settings.task.aiChatRetentionDaysTooltip", {
              defaultValue: "Retention period for AI chat sessions, based on the last conversation time."
            }),
            rules: [{ type: "number", min: 1, max: 3650 }],
            children: /* @__PURE__ */ e.jsx(ce, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "task_log_retention_days",
            label: l("settings.task.taskLogRetentionDays", { defaultValue: "Task log retention (days)" }),
            tooltip: l("settings.task.taskLogRetentionDaysTooltip", {
              defaultValue: "Retention period for task execution logs and historical task run records."
            }),
            rules: [{ type: "number", min: 1, max: 3650 }],
            children: /* @__PURE__ */ e.jsx(ce, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "audit_log_retention_days",
            label: l("settings.task.auditLogRetentionDays", { defaultValue: "Audit log retention (days)" }),
            tooltip: l("settings.task.auditLogRetentionDaysTooltip", {
              defaultValue: "Retention period for audit logs."
            }),
            rules: [{ type: "number", min: 1, max: 3650 }],
            children: /* @__PURE__ */ e.jsx(ce, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(F, { type: "primary", htmlType: "submit", loading: o, icon: /* @__PURE__ */ e.jsx(De, {}), children: i("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(F, { onClick: () => p(), icon: /* @__PURE__ */ e.jsx(be, {}), children: i("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(me, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(Pt, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: vs } = j, ws = /^[-_a-zA-Z0-9.]+$/, Cs = () => {
  const t = _e(), { t: l, i18n: s } = Z("system"), { t: i } = Z("common"), d = (V) => {
    if (!V) return "-";
    const G = new Date(V);
    return Number.isNaN(G.getTime()) ? "-" : G.toLocaleString(s.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [n] = a.useForm(), [x, g] = y(!1), [p, o] = y(null), [f, c] = y(""), [z, w] = y(1), [I, T] = y(10), { loading: O, data: U, refresh: A } = v(
    () => Xt({ current: z, page_size: I, search: f }),
    {
      refreshDeps: [z, I, f],
      onError: (V) => {
        r.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", V);
      }
    }
  ), { loading: E, run: M } = v(
    (V) => Qt(V),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), g(!1), n.resetFields(), o(null), A();
      },
      onError: (V) => {
        r.error((V == null ? void 0 : V.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: N, run: K } = v(
    ({ id: V, ...G }) => Yt({ id: V }, G),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), g(!1), n.resetFields(), o(null), A();
      },
      onError: (V) => {
        r.error((V == null ? void 0 : V.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: H } = v(
    (V) => es({ id: V }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), A();
      },
      onError: (V) => {
        r.error((V == null ? void 0 : V.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), J = () => {
    o(null), n.resetFields(), n.setFieldsValue({ status: "active" }), g(!0);
  }, q = (V) => {
    o(V), n.setFieldsValue({
      name: V.name,
      slug: V.slug,
      description: V.description,
      status: V.status
    }), g(!0);
  }, S = (V) => {
    ne.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${V.name}"? This action cannot be undone.`
      }),
      onOk: () => H(V.id)
    });
  }, L = () => {
    n.validateFields().then((V) => {
      p ? K({ id: p.id, ...V }) : M(V);
    });
  }, Q = [
    {
      title: l("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: l("settings.organizations.slug", { defaultValue: "Slug" }),
      dataIndex: "slug",
      key: "slug",
      render: (V) => V || "-"
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
      render: (V) => /* @__PURE__ */ e.jsx(re, { color: V === "active" ? "green" : "default", children: V === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (V) => d(V)
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (V, G) => /* @__PURE__ */ e.jsx(
        Ne,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(rt, {}),
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
              onClick: async () => S(G),
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
      extra: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: A, children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(me, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: J, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            j.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (V) => {
                c(V), w(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            ze,
            {
              columns: Q,
              dataSource: (U == null ? void 0 : U.data) || [],
              loading: O,
              rowKey: "id",
              pagination: {
                current: z,
                pageSize: I,
                total: (U == null ? void 0 : U.total) || 0,
                showSizeChanger: !0,
                showTotal: (V, G) => i("pagination.total", {
                  defaultValue: `${G[0]}-${G[1]} of ${V} items`,
                  start: G[0],
                  end: G[1],
                  total: V
                }),
                onChange: (V, G) => {
                  w(V), T(G);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          ne,
          {
            title: p ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: x,
            onOk: L,
            onCancel: () => {
              g(!1), n.resetFields(), o(null);
            },
            confirmLoading: E || N,
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
                    pattern: ws,
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
                  children: /* @__PURE__ */ e.jsx(vs, { rows: 3 })
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
}, Fs = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = Z("system"), s = _e(), i = Jt(), x = i.hash.replace("#", "") || "base", { enableMultiOrg: g } = pt(), { hasPermission: p } = Zt(), o = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(fs, {}),
      hidden: !p("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(cs, {}),
      hidden: !p("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(us, {}),
      hidden: !p("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(gs, {}),
      hidden: !p("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(ps, {}),
      hidden: !p("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(xs, {}),
      hidden: !p("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(js, {}),
      hidden: !p("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(_s, {}),
      hidden: !p("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Ss, {}),
      hidden: !p("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...g ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Cs, {}),
      hidden: !p("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(ae, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    nt,
    {
      defaultActiveKey: x,
      onChange: (f) => {
        s(`${i.pathname}#${f}`);
      },
      items: t(o.filter((f) => !f.hidden), l)
    }
  ) });
}, al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fs
}, Symbol.toStringTag, { value: "Module" })), Ts = () => {
  var ve, we, he;
  const t = _e(), { id: l } = et(), { t: s } = Z("system"), { t: i } = Z("common"), [d] = a.useForm(), [n] = a.useForm(), [x, g] = y(!1), [p, o] = y(!1), [f, c] = y(null), [z, w] = y(""), [I, T] = y(1), [O, U] = y(10), { data: A, loading: E, refresh: M } = v(
    () => ts({ id: l }),
    {
      ready: !!l,
      onError: (b) => {
        r.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", b);
      }
    }
  ), { data: N, loading: K, refresh: H } = v(
    () => ss({ id: l, current: I, page_size: O, search: z }),
    {
      ready: !!l,
      refreshDeps: [l, I, O, z],
      onError: (b) => {
        r.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", b);
      }
    }
  ), { data: J, loading: q } = v(
    () => ns({ current: 1, page_size: 1e3 }),
    {
      ready: x
    }
  ), { data: S, loading: L } = v(
    () => os({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: Q, run: V } = v(
    (b) => ls({ id: l }, b),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), g(!1), d.resetFields(), H();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: G, run: ie } = v(
    (b) => as({ id: l, user_id: f == null ? void 0 : f.id }, b),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), o(!1), n.resetFields(), c(null), H();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: h } = v(
    (b) => is({ id: l, user_id: b }),
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
    g(!0), d.resetFields();
  }, X = (b) => {
    var se;
    c(b), n.setFieldsValue({
      role_ids: ((se = b.organization_roles) == null ? void 0 : se.map((ge) => ge.id)) || []
    }), o(!0);
  }, ee = (b) => {
    ne.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${b.full_name || b.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => h(b.id)
    });
  }, Se = () => {
    d.validateFields().then((b) => {
      V(b);
    });
  }, Ce = () => {
    n.validateFields().then((b) => {
      ie(b);
    });
  }, xe = ((ve = J == null ? void 0 : J.data) == null ? void 0 : ve.filter((b) => {
    var se;
    return !((se = N == null ? void 0 : N.data) != null && se.some((ge) => ge.id === b.id));
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
        var ge;
        return /* @__PURE__ */ e.jsx(W, { wrap: !0, children: ((ge = se.organization_roles) == null ? void 0 : ge.map((m) => /* @__PURE__ */ e.jsx(re, { children: m.name }, m.id))) || /* @__PURE__ */ e.jsx(re, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (b, se) => /* @__PURE__ */ e.jsx(
        Ne,
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
        title: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              icon: /* @__PURE__ */ e.jsx(dt, {}),
              onClick: () => t("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            A == null ? void 0 : A.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(be, {}), onClick: () => {
          M(), H();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: E,
        children: /* @__PURE__ */ e.jsxs(ue, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(ue.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: A == null ? void 0 : A.name }),
          /* @__PURE__ */ e.jsx(ue.Item, { label: s("settings.organizations.slug", { defaultValue: "Slug" }), children: (A == null ? void 0 : A.slug) || "-" }),
          /* @__PURE__ */ e.jsx(ue.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(re, { color: (A == null ? void 0 : A.status) === "active" ? "green" : "default", children: (A == null ? void 0 : A.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(ue.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (A == null ? void 0 : A.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: P, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            j.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (b) => {
                w(b), T(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            ze,
            {
              columns: Fe,
              dataSource: (N == null ? void 0 : N.data) || [],
              loading: K,
              rowKey: "id",
              pagination: {
                current: I,
                pageSize: O,
                total: (N == null ? void 0 : N.total) || 0,
                showSizeChanger: !0,
                showTotal: (b) => i("pagination.total", { defaultValue: `Total ${b} items` }),
                onChange: (b, se) => {
                  T(b), U(se);
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
        open: x,
        onOk: Se,
        onCancel: () => {
          g(!1), d.resetFields();
        },
        confirmLoading: Q,
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
                  loading: L,
                  options: ((we = S == null ? void 0 : S.data) == null ? void 0 : we.map((b) => ({
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
        open: p,
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
                  value: (f == null ? void 0 : f.full_name) || (f == null ? void 0 : f.username),
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
                  loading: L,
                  options: ((he = S == null ? void 0 : S.data) == null ? void 0 : he.map((b) => ({
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
}, il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ts
}, Symbol.toStringTag, { value: "Module" })), Is = rs(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: it } = j, As = (t) => t.toLowerCase().endsWith(".md");
function ht(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(ut, {}) : /* @__PURE__ */ e.jsx(ct, {}),
      children: (s = l.children) != null && s.length ? ht(l.children) : void 0
    };
  });
}
function Je(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const Es = () => {
  const { styles: t } = Is(), { id: l } = et(), s = _e(), { t: i } = Z("system"), [d, n] = y(null), [x, g] = y(null), [p, o] = y(!1), [f, c] = y(""), [z, w] = y(!1), [I, T] = y([]), [O, U] = y(!1), [A, E] = y(!1), [M, N] = y(""), [K] = a.useForm(), [H, J] = y(null), [q, S] = y(null), [L, Q] = y(""), [V] = a.useForm(), { data: G } = v(
    () => l ? k.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: ie, loading: h, refresh: P } = v(
    () => l ? k.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (_) => {
        if (!d) {
          for (const C of _)
            if (!C.is_dir && C.name === "SKILL.md") {
              g(C.path), n(C.path), o(!1);
              return;
            }
          for (const C of _)
            if (!C.is_dir && C.name === "SKILLS.md") {
              g(C.path), n(C.path), o(!1);
              return;
            }
        }
      }
    }
  ), X = (G == null ? void 0 : G.data) ?? G, ee = !!(X != null && X.is_preset), Se = (ie == null ? void 0 : ie.data) ?? ie ?? [], Ce = Te(() => ht(Se), [Se]), xe = p && x ? x : d ? Je(d) : "";
  Oe(() => {
    d && l ? (k.system.getSkillFile({ id: l, path: d }).then((_) => {
      c(_.data);
    }).catch(() => r.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), w(!1)) : (c(""), w(!1));
  }, [l, d, i]);
  const Fe = () => {
    !l || !d || ee || k.system.putSkillFile({ id: l, path: d }, f).then(() => {
      r.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), w(!1);
    }).catch(() => r.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, ve = (_, C) => {
    const le = String(C.node.key), fe = !C.node.isLeaf;
    g(le), o(fe), C.node.isLeaf ? n(le) : n(null);
  }, we = (_) => {
    _.event.preventDefault(), J({
      path: String(_.node.key),
      isDir: !_.node.isLeaf,
      x: _.event.clientX,
      y: _.event.clientY
    });
  }, he = ke(() => J(null), []), b = ke(
    (_) => {
      if (!l || !H || ee) return;
      const { path: C, isDir: le } = H;
      switch (he(), _) {
        case "open":
          n(C), g(C), o(!1);
          break;
        case "rename": {
          const fe = C.includes("/") ? C.split("/").pop() : C;
          S({ path: C, isDir: le }), Q(fe), setTimeout(() => V.setFieldsValue({ name: fe }), 0);
          break;
        }
        case "delete":
          ne.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: le ? i("settings.skills.editor.deleteConfirmContentDir", { path: C, defaultValue: `Delete ${C}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: C, defaultValue: `Delete ${C}?` }),
            onOk: () => k.system.deleteSkillPath({ id: l, path: C }).then(() => {
              r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === C && (n(null), c("")), x === C && (g(null), o(!1)), P();
            }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          g(C), o(le), U(!0);
          break;
        case "newDir":
          g(C), o(le), E(!0);
          break;
      }
    },
    [l, H, he, P, d, x, V, i, ee]
  ), se = () => {
    if (!l || !q || ee) return;
    const _ = (V.getFieldValue("name") ?? L).trim();
    if (!_) {
      r.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!q.isDir && !/\.(md|txt)$/i.test(_)) {
      r.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const C = Je(q.path), le = C ? `${C}/${_}` : _;
    if (le === q.path) {
      S(null);
      return;
    }
    k.system.moveSkillPath({ id: l }, { from_path: q.path, to_path: le }).then(() => {
      r.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === q.path && n(le), x === q.path && g(le), S(null), P();
    }).catch(() => r.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, ge = (_) => {
    if (!l || ee) return;
    const C = String(_.dragNode.key), le = String(_.dragNode.title);
    let fe;
    if (_.dropToGap) {
      const qe = Je(String(_.node.key));
      fe = qe ? `${qe}/${le}` : le;
    } else
      fe = `${_.node.key}/${le}`;
    fe !== C && k.system.moveSkillPath({ id: l }, { from_path: C, to_path: fe }).then(() => {
      r.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), d === C && n(fe), x === C && g(fe), P();
    }).catch(() => r.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, m = () => {
    const _ = M.trim();
    if (!_ || !l || ee) return;
    const C = xe ? `${xe}/${_}` : _;
    if (!/\.(md|txt)$/i.test(_)) {
      r.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    k.system.putSkillFile({ id: l, path: C }, "").then(() => {
      r.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), U(!1), N(""), P(), n(C), c("");
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, D = () => {
    var le;
    const _ = (le = K.getFieldValue("name")) == null ? void 0 : le.trim();
    if (!_ || !l || ee) return;
    const C = xe ? `${xe}/${_}` : _;
    k.system.createSkillDir({ id: l }, { path: C }).then(() => {
      r.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), E(!1), K.resetFields(), P();
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, pe = () => {
    const _ = x || d;
    !l || !_ || ee || ne.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: _, defaultValue: `Delete ${_}?` }),
      onOk: () => k.system.deleteSkillPath({ id: l, path: _ }).then(() => {
        r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === _ && (n(null), c("")), x === _ && (g(null), o(!1)), P();
      }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    ae,
    {
      title: (X == null ? void 0 : X.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(F, { type: "link", onClick: () => s("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        ee ? /* @__PURE__ */ e.jsx(
          Ge,
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
            /* @__PURE__ */ e.jsxs(W, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(F, { size: "small", icon: /* @__PURE__ */ e.jsx(Me, {}), disabled: ee, onClick: () => U(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(F, { size: "small", icon: /* @__PURE__ */ e.jsx(ut, {}), disabled: ee, onClick: () => E(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            h ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              Vt,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !ee,
                expandedKeys: I,
                onExpand: (_) => T(_),
                selectedKeys: x ? [x] : [],
                onSelect: ve,
                onRightClick: ee ? void 0 : we,
                onDrop: ge,
                className: t.fileTree,
                treeData: Ce
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(W, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), disabled: ee || !z, onClick: Fe, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(F, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ie, {}), disabled: ee, onClick: pe, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              As(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  it,
                  {
                    value: f,
                    readOnly: ee,
                    onChange: (_) => {
                      c(_.target.value), w(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(gt, { content: mt(f) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                it,
                {
                  value: f,
                  readOnly: ee,
                  onChange: (_) => {
                    c(_.target.value), w(!0);
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
              onClick: he,
              onContextMenu: (_) => _.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: H.x, top: H.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            kt,
            {
              selectable: !1,
              items: [
                ...H.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(ct, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Pe, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ie, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(Mt, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(Rt, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: _ }) => b(_)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(ne, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: O, onOk: m, onCancel: () => {
          U(!1), N("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(j, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: M, onChange: (_) => N(_.target.value) }) }),
        /* @__PURE__ */ e.jsx(ne, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: A, onOk: () => K.validateFields().then(D), onCancel: () => E(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(a, { form: K, layout: "vertical", children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(j, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          ne,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!q,
            onOk: se,
            onCancel: () => S(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(a, { form: V, layout: "vertical", onValuesChange: (_, C) => Q(C.name ?? ""), children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: q != null && q.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
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
}, nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Es
}, Symbol.toStringTag, { value: "Module" })), zs = () => {
  const { id: t } = et(), l = _e(), { t: s } = Z("system"), { data: i, loading: d } = v(
    () => t ? k.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: n, loading: x, mutate: g } = v(
    () => t ? k.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => r.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => g()
    }
  ), p = (i == null ? void 0 : i.data) ?? i, o = Te(() => n == null ? void 0 : n.map((c) => ({
    key: c.file_name,
    label: c.file_name,
    children: /* @__PURE__ */ e.jsx(gt, { content: mt(c.content) })
  })), [n]);
  if (!t) return null;
  const f = d || x;
  return /* @__PURE__ */ e.jsx(je, { spinning: f, children: /* @__PURE__ */ e.jsx(
    ae,
    {
      title: (p == null ? void 0 : p.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(F, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: o
    }
  ) });
}, ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zs
}, Symbol.toStringTag, { value: "Module" })), { Text: Ve, Title: Os } = St, Ps = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx($t, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(qt, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Nt, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(Ze, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(Be, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(Dt, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(Be, {}) }
};
function He(t) {
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
  const { parsed: s, isJSON: i } = He(t);
  return i ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(
    Xe,
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
}, Ms = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = He(t);
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
}, Rs = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = He(t);
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
}, Ls = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = He(t);
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
}, Us = ({ event: t, t: l }) => {
  switch (t.event_type) {
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Ms, { content: t.content, t: l });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(Rs, { content: t.content, t: l });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(Ls, { content: t.content, t: l });
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
}, Ds = () => {
  const { t } = Z("ai"), l = _e(), [s, i] = y(""), [d, n] = y(""), {
    data: x,
    loading: g,
    refresh: p
  } = v(() => k.ai.getAiTraceStatus(), {
    onError: () => {
      r.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), o = (x == null ? void 0 : x.enabled) ?? !1, { loading: f, run: c } = v(
    (M) => k.ai.toggleAiTrace({ enabled: M }),
    {
      manual: !0,
      onSuccess: (M, [N]) => {
        r.success(
          N ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), p(), N || n("");
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
    data: z,
    loading: w,
    run: I
  } = v(
    (M) => k.ai.getAiTraceEvents({ trace_id: M }),
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
  ), T = ke(() => {
    s.trim() && (n(s.trim()), I(s.trim()));
  }, [s, I]), O = ke(
    (M) => {
      const N = M ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      ne.confirm({
        title: M ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: N,
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
        const N = await M.blob(), K = window.URL.createObjectURL(N), H = document.createElement("a");
        H.href = K, H.download = `ai-trace-${d}.json`, document.body.appendChild(H), H.click(), window.URL.revokeObjectURL(K), document.body.removeChild(H);
      } catch {
        r.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, t]), A = Te(() => z ?? [], [z]), E = Te(
    () => A.map((M) => {
      const N = Ps[M.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(Be, {})
      }, K = t(
        `trace.eventTypes.${M.event_type}`,
        { defaultValue: M.event_type }
      );
      return {
        key: M.id,
        dot: N.icon,
        color: N.color,
        children: /* @__PURE__ */ e.jsx(
          _t,
          {
            size: "small",
            defaultActiveKey: [M.id],
            items: [
              {
                key: M.id,
                label: /* @__PURE__ */ e.jsxs(W, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(re, { color: N.color, children: K }),
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
                children: /* @__PURE__ */ e.jsx(Us, { event: M, t })
              }
            ]
          }
        )
      };
    }),
    [A, t]
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
          /* @__PURE__ */ e.jsxs(W, { children: [
            /* @__PURE__ */ e.jsx(
              F,
              {
                icon: /* @__PURE__ */ e.jsx(dt, {}),
                onClick: () => l("/system/settings#ai-models"),
                children: t("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(Os, { level: 4, style: { margin: 0 }, children: t("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(W, { children: [
            /* @__PURE__ */ e.jsx(Ve, { children: o ? t("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : t("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              de,
              {
                checked: o,
                loading: g || f,
                onChange: O
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(W.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        j,
        {
          placeholder: t("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: s,
          onChange: (M) => i(M.target.value),
          onPressEnter: T,
          prefix: /* @__PURE__ */ e.jsx(Lt, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(F, { type: "primary", onClick: T, loading: w, children: t("trace.search", { defaultValue: "Search" }) }),
      d && A.length > 0 && /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(Ut, {}), onClick: U, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    w ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(je, { size: "large" }) }) }) : d && A.length === 0 ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Le,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : A.length > 0 ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(vt, { items: E }) }) : null
  ] });
}, rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ds
}, Symbol.toStringTag, { value: "Module" })), Ns = () => {
  const { t } = Z("system"), [l] = Gt(), s = l.get("provider"), i = l.get("code"), d = l.get("state"), [n, x] = y(null), [g, p] = y(null), [o, f] = y(null);
  return v(async () => {
    if (!i || !d || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const c = await k.system.testOauthCallback({ code: i, state: d, provider: s });
    if (!c.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!c.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    x(c.user), p(c.user_info);
  }, {
    onSuccess: () => {
      f({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (c) => {
      f({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: c.message
      });
    }
  }), o ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    wt,
    {
      status: o.status,
      title: o.message,
      subTitle: o.error,
      extra: /* @__PURE__ */ e.jsxs(W, { style: { display: !g || !n ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(ae, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Xe, { src: g || {} }) }),
        /* @__PURE__ */ e.jsx(ae, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Xe, { src: n || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Kt, {});
}, dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ns
}, Symbol.toStringTag, { value: "Module" }));
export {
  rl as A,
  il as O,
  nl as S,
  ol as a,
  dl as b,
  al as i
};
