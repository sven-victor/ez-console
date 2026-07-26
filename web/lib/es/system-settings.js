import { j as e } from "./vendor.js";
import { App as ce, Form as o, Spin as ye, Switch as de, Select as $, Input as v, Alert as st, Divider as it, Space as H, Button as O, InputNumber as pe, Modal as oe, Skeleton as Nt, Descriptions as ie, Steps as Lt, Tag as ae, Table as Me, Radio as qe, Tabs as yt, Popconfirm as Rt, Tooltip as Xe, Card as se, Row as Be, Col as ke, Checkbox as Ye, Empty as Oe, AutoComplete as nt, Upload as Dt, Tree as Ut, Menu as $t, Collapse as qt, Typography as bt, Timeline as Bt, Segmented as Jt, Drawer as Ht, Result as Wt } from "antd";
import { useTranslation as W } from "react-i18next";
import { useState as y, useEffect as Ne, useMemo as Te, Suspense as Je, lazy as He, useCallback as he } from "react";
import { useRequest as F } from "ahooks";
import { SaveOutlined as We, ReloadOutlined as Se, LoadingOutlined as Kt, CheckCircleTwoTone as Gt, ClearOutlined as Zt, StarFilled as Xt, CheckCircleOutlined as Qt, StarOutlined as Yt, EditOutlined as Le, CopyOutlined as jt, DeleteOutlined as Ae, BugOutlined as Vt, PlusOutlined as Re, ThunderboltOutlined as es, ToolOutlined as lt, SettingOutlined as ts, FileTextOutlined as Ge, EyeOutlined as kt, UploadOutlined as rt, CalendarOutlined as ss, ArrowLeftOutlined as ot, FolderOutlined as St, FileOutlined as _t, FileAddOutlined as ls, FolderAddOutlined as as, SearchOutlined as is, DownloadOutlined as os, ApartmentOutlined as ns, UnorderedListOutlined as rs, WarningOutlined as ds, DashboardOutlined as us, MessageOutlined as cs, SendOutlined as ms, CloseCircleOutlined as vt, CodeOutlined as ps, AlignLeftOutlined as fs, PlayCircleOutlined as gs } from "@ant-design/icons";
import { a as C } from "./index.js";
import { g as dt, c as wt, d as be } from "./base.js";
import { g as fe, d as hs, b as Ke, L as De } from "./components.js";
import Ct from "react-quill-new";
import { useNavigate as je, useLocation as xs, useParams as Qe, useSearchParams as ys } from "react-router-dom";
import { b as Tt, a as bs } from "./contexts.js";
import { l as js, c as Vs, u as ks, d as Ss, g as _s, b as vs, e as ws, f as Cs, r as Ts } from "./system.js";
import { l as Fs, b as Is } from "./authorization.js";
import { createStyles as Ft } from "antd-style";
import As from "classnames";
import Ze from "@uiw/react-json-view";
import Es from "@uiw/react-codemirror";
import { json as zs } from "@codemirror/lang-json";
const Ee = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Os = {
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
}, Ps = ({ initialData: s, onRefresh: t }) => {
  const { message: a } = ce.useApp(), { t: l } = W("system"), { t: i } = W("common"), [r] = o.useForm(), [u, m] = y((s == null ? void 0 : s.provider) || "custom"), [n, c] = y((s == null ? void 0 : s.provider) === "custom" || (s == null ? void 0 : s.provider) === "autoDiscover"), [d, S] = y((s == null ? void 0 : s.enabled) || !1), [h, I] = y((s == null ? void 0 : s.auto_create_user) || !1), { loading: T, data: M, refresh: V } = F(C.system.getOauthSettings, {
    manual: !!s,
    onSuccess: (k) => {
      r.setFieldsValue(k), m(k.provider), c(k.provider === "custom" || k.provider === "autoDiscover"), S(k.enabled), I(k.auto_create_user);
    },
    onError: (k) => {
      a.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", k);
    }
  });
  Ne(() => {
    s && (r.setFieldsValue(s), m(s.provider), c(s.provider === "custom" || s.provider === "autoDiscover"), S(s.enabled), I(s.auto_create_user));
  }, [s, r]);
  const N = (k) => {
    m(k), c(k === "custom" || k === "autoDiscover");
    const L = Os[k];
    L && r.setFieldsValue({
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
  }, j = (k) => {
    S(k);
  }, P = (k) => {
    I(k);
  }, { loading: E, run: Y } = F(C.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      a.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), t ? t() : V();
    },
    onError: (k) => {
      a.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", k);
    }
  }), K = (k) => {
    Y(k);
  }, G = () => {
    t ? t() : V();
  }, { loading: Z, run: X } = F(async ({ redirect_uri: k, ...L }) => {
    let D;
    return k ? D = new URL(k) : D = new URL(window.location.origin), D.pathname = dt("/system/settings/oauth/test-callback"), D.searchParams.set("provider", u), C.system.testOauthConnection({ redirect_uri: D.toString(), ...L });
  }, {
    manual: !0,
    onSuccess: ({ url: k }) => {
      window.open(k, "_blank");
    },
    onError: (k) => {
      a.error(l("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: k.message })), console.error("Failed to test OAuth connection", k);
    }
  }), _ = () => u === "custom";
  return /* @__PURE__ */ e.jsx(ye, { spinning: T, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: r,
      layout: "vertical",
      onFinish: K,
      initialValues: s || M,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "enabled",
            label: l("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: l("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: j })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "provider",
            label: l("settings.oauth.provider.label", { defaultValue: "OAuth Provider" }),
            tooltip: l("settings.oauth.provider.tooltip", { defaultValue: "Select an OAuth provider or configure a custom one." }),
            rules: [
              {
                required: d,
                message: l("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs($, { onChange: N, disabled: !d, children: [
              /* @__PURE__ */ e.jsx($.Option, { value: "github", children: l("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "google", children: l("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "dingtalk", children: l("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "wechat", children: l("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "autoDiscover", children: l("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "custom", children: l("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "display_name",
            label: l("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: l("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              v,
              {
                disabled: !d,
                placeholder: u !== "custom" ? l(`settings.oauth.provider.options.${u}`, { defaultValue: u }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "icon_url",
            label: l("settings.oauth.iconUrl.label", { defaultValue: "Icon URL" }),
            tooltip: l("settings.oauth.iconUrl.tooltip", { defaultValue: "URL of the icon for this provider. Displayed on the login button." }),
            rules: [
              {
                pattern: Ee,
                message: l("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !d, placeholder: "https://example.com/icon.png" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "client_id",
            label: l("settings.oauth.clientId.label", { defaultValue: "Client ID" }),
            tooltip: l("settings.oauth.clientId.tooltip", { defaultValue: "The Client ID provided by the OAuth provider." }),
            rules: [
              {
                required: d,
                message: l("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "client_secret",
            label: l("settings.oauth.clientSecret.label", { defaultValue: "Client Secret" }),
            tooltip: l("settings.oauth.clientSecret.tooltip", { defaultValue: "The Client Secret provided by the OAuth provider. This will be stored encrypted." }),
            rules: [
              {
                required: d,
                message: l("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v.Password, { disabled: !d, autoComplete: "new-password", visibilityToggle: !1, placeholder: l("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        _() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auth_endpoint",
            label: l("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: l("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: d && u === "custom",
                message: l("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: Ee,
                message: l("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "wellknown_endpoint",
            hidden: u !== "autoDiscover",
            label: l("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: l("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: Ee,
                message: l("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: d && u === "autoDiscover",
                message: l("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !d })
          }
        ),
        _() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "token_endpoint",
            label: l("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: l("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: d && u === "custom",
                message: l("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: Ee,
                message: l("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !d })
          }
        ),
        _() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "userinfo_endpoint",
            label: l("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: l("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: d && u === "custom",
                message: l("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: Ee,
                message: l("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "scope",
            label: l("settings.oauth.scope.label", { defaultValue: "Authorization Scope" }),
            tooltip: l("settings.oauth.scope.tooltip", { defaultValue: "The scopes to request from the OAuth provider, separated by spaces." }),
            rules: [
              {
                required: d,
                message: l("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "redirect_uri",
            label: l("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: l("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(k) => k.getFieldValue("redirect_uri") !== "" ? {
              pattern: Ee,
              message: l("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !d, placeholder: `http://${window.location.host}${dt(`/login?provider=settings.${u}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auto_create_user",
            label: l("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: l("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: P, disabled: !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "default_role",
            label: l("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: l("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: d && h,
                message: l("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !d || !h })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_mapping_mode",
            label: l("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: l("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs($, { disabled: !d, children: [
              /* @__PURE__ */ e.jsx($.Option, { value: "disabled", children: l("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "new_user_only", children: l("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "temporary", children: l("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }) }),
              /* @__PURE__ */ e.jsx($.Option, { value: "enforce", children: l("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          st,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: l("settings.oauth.roleMappingMode.infoTitle", { defaultValue: "Role Mapping Mode Information" }),
            description: /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  l("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }),
                  ":"
                ] }),
                " ",
                l("settings.oauth.roleMappingMode.options.disabled.description", { defaultValue: "Ignores role information from OAuth2 provider. New users get the default role." })
              ] }),
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  l("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }),
                  ":"
                ] }),
                " ",
                l("settings.oauth.roleMappingMode.options.new_user_only.description", { defaultValue: "Uses OAuth2 roles only for newly created users. Existing users keep their current roles." })
              ] }),
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  l("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }),
                  ":"
                ] }),
                " ",
                l("settings.oauth.roleMappingMode.options.temporary.description", { defaultValue: "Applies OAuth2 roles for the current session only without persisting them. Other login methods still use database roles." })
              ] }),
              /* @__PURE__ */ e.jsxs("p", { children: [
                /* @__PURE__ */ e.jsxs("strong", { children: [
                  l("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }),
                  ":"
                ] }),
                " ",
                l("settings.oauth.roleMappingMode.options.enforce.description", { defaultValue: "Always overwrites user roles with OAuth2 roles when available." })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "mfa_enabled",
            label: l("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: l("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(de, { disabled: !d })
          }
        ),
        /* @__PURE__ */ e.jsx(it, { children: l("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          st,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: l("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: n ? "" : l("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "email_field",
            label: l("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: l("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "email", disabled: !d || !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "username_field",
            label: l("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: l("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "login", autoComplete: "off", disabled: !d || !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "full_name_field",
            label: l("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: l("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "name", disabled: !d || !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "avatar_field",
            label: l("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: l("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "avatar_url", disabled: !d || !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_field",
            label: l("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: l("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "role", disabled: !d || !n })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            O,
            {
              type: "primary",
              htmlType: "submit",
              loading: E,
              icon: /* @__PURE__ */ e.jsx(We, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            O,
            {
              loading: Z,
              onClick: async () => {
                const k = r.getFieldsValue();
                X(k);
              },
              children: l("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            O,
            {
              onClick: G,
              icon: /* @__PURE__ */ e.jsx(Se, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Ms = () => {
  const { message: s } = ce.useApp(), { t } = W("system"), { t: a } = W("common"), [l] = o.useForm(), { loading: i, data: r, refresh: u } = F(C.system.getSecuritySettings, {
    onSuccess: (d) => {
      l.setFieldsValue(d);
    },
    onError: (d) => {
      s.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", d);
    }
  }), { loading: m, run: n } = F(C.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      s.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), u();
    },
    onError: (d) => {
      s.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", d);
    }
  }), c = (d) => {
    n(d);
  };
  return /* @__PURE__ */ e.jsx(ye, { spinning: i, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: l,
      layout: "vertical",
      onFinish: c,
      initialValues: r,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
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
          o.Item,
          {
            name: "password_min_length",
            label: t("settings.security.passwordMinLength.label", { defaultValue: "Minimum Password Length" }),
            tooltip: t("settings.security.passwordMinLength.tooltip", { defaultValue: "The minimum number of characters required for a password." }),
            rules: [{ type: "number", min: 6, max: 32 }],
            children: /* @__PURE__ */ e.jsx(pe, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(pe, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_expiry_notify_days",
            label: t("settings.security.passwordExpiryNotify.label", { defaultValue: "Password Expiry Notification (Days Before Expiry)" }),
            tooltip: t("settings.security.passwordExpiryNotify.tooltip", { defaultValue: "Notify users by email this many days before password expiry. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(pe, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (d, S) => d.login_failure_lock !== S.login_failure_lock,
            children: ({ getFieldValue: d }) => d("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              o.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(pe, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (d, S) => d.login_failure_lock !== S.login_failure_lock,
            children: ({ getFieldValue: d }) => d("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              o.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(pe, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "history_password_check",
            label: t("settings.security.historyPasswordCheck.label", { defaultValue: "Enforce Password History Policy" }),
            valuePropName: "checked",
            tooltip: t("settings.security.historyPasswordCheck.tooltip", { defaultValue: "Prevent users from reusing recent passwords." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (d, S) => d.history_password_check !== S.history_password_check,
            children: ({ getFieldValue: d }) => d("history_password_check") ? /* @__PURE__ */ e.jsx(
              o.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(pe, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "user_inactive_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(pe, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(pe, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(pe, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            O,
            {
              type: "primary",
              htmlType: "submit",
              loading: m,
              icon: /* @__PURE__ */ e.jsx(We, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            O,
            {
              onClick: () => u(),
              icon: /* @__PURE__ */ e.jsx(Se, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Ns = ({ fetchItems: s, importItems: t, columns: a, ...l }) => {
  const { message: i } = ce.useApp(), { t: r } = W("system"), [u, m] = y([]), [n, c] = y([]), { run: d, loading: S } = F(s, {
    onError: (T) => {
      i.error(r("settings.ldap.importError", { error: `${T.message}` }));
    },
    onSuccess: (T) => {
      m(T);
    },
    manual: !0
  }), { run: h, loading: I } = F(async () => {
    for (const T of n.filter((M) => {
      const V = u.find((N) => N.ldap_dn === M);
      return !(!V || V.status === "imported");
    })) {
      const M = await t([T]);
      m((V) => [...V].map((j) => {
        for (const P of M)
          if (j.ldap_dn === P.ldap_dn)
            return { ...P, status: "imported" };
        return j;
      }));
    }
  }, {
    manual: !0
  });
  return Ne(() => {
    l.visible && (m([]), d(), c([]));
  }, [l.visible]), /* @__PURE__ */ e.jsx(
    oe,
    {
      title: r("settings.ldap.importTitle"),
      ...l,
      onOk: () => {
        h();
      },
      width: 900,
      confirmLoading: I,
      loading: S,
      children: /* @__PURE__ */ e.jsx(
        Me,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (T) => {
              c(T);
            },
            getCheckboxProps: (T) => ({
              disabled: T.status === "imported"
            })
          },
          columns: a.map(({ render: T, ...M }) => T ? {
            ...M,
            render: (V, N, j) => {
              const P = n.includes(N.ldap_dn) && I && N.status !== "imported";
              return T(V, N, j, P);
            }
          } : M),
          dataSource: u,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Ls = () => {
  var N, j, P;
  const { message: s } = ce.useApp(), { t } = W("system"), [a] = o.useForm(), [l, i] = y(!1), [r, u] = y(null), [m, n] = y(!1), [c, d] = y(!1), [S] = o.useForm(), [h, I] = y(!1);
  F(C.system.getLdapSettings, {
    onSuccess: (E) => {
      a.setFieldsValue(E), I(E.enabled);
    },
    onError: (E) => {
      s.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${E.message}` }));
    }
  }), Ne(() => {
    u(null);
  }, [m]);
  const T = async (E) => {
    i(!0);
    try {
      await C.system.updateLdapSettings(E), s.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      s.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      i(!1);
    }
  }, { run: M, loading: V } = F(async (E) => {
    const Y = await a.validateFields();
    return await C.system.testLdapConnection({
      ...E,
      ...Y
    });
  }, {
    onSuccess: (E) => {
      u(E);
    },
    onError: (E) => {
      s.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${E.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      o,
      {
        form: a,
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
            o.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { onChange: (E) => I(E) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: h, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !h, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: h, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !h, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: h, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(v.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: h, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !h, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(v, { disabled: !h, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: h, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: h, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: h, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: h, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(v, { type: "number", defaultValue: 15, disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(it, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(v.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(v.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(v.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !h })
            }
          ),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(fe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(O, { type: "primary", htmlType: "submit", loading: l, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(fe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              O,
              {
                disabled: !h,
                style: { marginLeft: 8 },
                onClick: () => n(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(fe, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              O,
              {
                disabled: !h,
                style: { marginLeft: 8 },
                onClick: () => {
                  d(!0);
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
        open: m,
        onCancel: () => n(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            o,
            {
              form: S,
              layout: "vertical",
              onFinish: M,
              children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(v, { disabled: !h })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(v.Password, { disabled: !h })
                  }
                ),
                /* @__PURE__ */ e.jsxs(o.Item, { children: [
                  /* @__PURE__ */ e.jsx(fe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(O, { disabled: !h, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    O,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => n(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(ye, { spinning: V, children: /* @__PURE__ */ e.jsx(Nt, { active: V, loading: V, children: r && (r.user ? /* @__PURE__ */ e.jsxs(ie, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(ie.Item, { label: "Username", span: 3, children: r.user.username }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "Email", span: 3, children: r.user.email }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "FullName", span: 3, children: r.user.full_name }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "CreatedAt", span: 3, children: r.user.created_at }),
            /* @__PURE__ */ e.jsx(ie.Item, { label: "UpdatedAt", span: 3, children: r.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Lt,
            {
              direction: "vertical",
              current: (N = r.message) == null ? void 0 : N.findIndex((E) => !E.success),
              status: (j = r.message) != null && j.find((E) => !E.success) ? "error" : "finish",
              items: (P = r.message) == null ? void 0 : P.map((E) => ({
                status: E.success ? "finish" : "error",
                title: E.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      Ns,
      {
        visible: c,
        onCancel: () => d(!1),
        fetchItems: () => C.system.importLdapUsers({}),
        importItems: (E) => C.system.importLdapUsers({ user_dn: E }),
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
          render: (E, Y, K, G) => G ? /* @__PURE__ */ e.jsx(ye, { indicator: /* @__PURE__ */ e.jsx(Kt, { spin: !0 }) }) : E ? /* @__PURE__ */ e.jsx(Gt, { twoToneColor: "#52c41a" }) : Y.id ? /* @__PURE__ */ e.jsx(ae, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ae, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, Rs = () => {
  const { message: s } = ce.useApp(), { t } = W("system"), { t: a } = W("common"), [l] = o.useForm(), [i, r] = y(null), [u, m] = y(!1), [n] = o.useForm(), [c, d] = y(!1), { data: S } = F(C.system.getSmtpSettingFields), { loading: h } = F(C.system.getSmtpSettings, {
    onSuccess: (j) => {
      l.setFieldsValue(j), d(j.enabled);
    },
    onError: (j) => {
      s.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${j.message}` }));
    }
  });
  Ne(() => {
    r(null);
  }, [u]);
  const { run: I, loading: T } = F(({ port: j, ...P }) => C.system.updateSmtpSettings({ ...P, port: Number(j) }), {
    manual: !0,
    onSuccess: () => {
      s.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (j) => {
      s.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${j.message}` }));
    }
  }), { run: M, loading: V } = F(async (j) => {
    const { port: P, ...E } = await l.validateFields();
    return await C.system.testSmtpConnection({
      ...j,
      ...E,
      port: Number(P)
    });
  }, {
    onSuccess: (j) => {
      r(j);
    },
    onError: (j) => {
      s.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${j.message}` }));
    },
    manual: !0
  }), N = (j) => {
    switch (j.value_type) {
      case "number":
        return /* @__PURE__ */ e.jsx(pe, { style: { width: "100%" }, disabled: !c, min: j.min, max: j.max, step: j.step });
      case "percentage":
        return /* @__PURE__ */ e.jsx(pe, { style: { width: "100%" }, disabled: !c, min: 0, max: 100, step: j.step || 0.01, addonAfter: "%" });
      case "string_list":
        return /* @__PURE__ */ e.jsx($, { mode: "tags", tokenSeparators: [","], disabled: !c });
      case "enum":
        return /* @__PURE__ */ e.jsx($, { disabled: !c, options: j.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(Ct, { theme: "snow", readOnly: !c });
      case "string":
      default:
        return /* @__PURE__ */ e.jsx(v, { disabled: !c });
    }
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(ye, { spinning: h, children: /* @__PURE__ */ e.jsxs(
      o,
      {
        form: l,
        layout: "vertical",
        onFinish: I,
        initialValues: {
          port: 587,
          encryption: "STARTTLS"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { onChange: (j) => d(j) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: c, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !c, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: c, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { type: "number", disabled: !c, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: c, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !c, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(v.Password, { disabled: !c, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: c, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(qe.Group, { disabled: !c, children: [
                /* @__PURE__ */ e.jsx(qe.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(qe.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(qe.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: c, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !c, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(v, { disabled: !c, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
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
          /* @__PURE__ */ e.jsx(it, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          (S || []).map((j) => /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t(j.label_key || `settings.smtp.${j.key}`, { defaultValue: j.key }),
              name: j.key,
              tooltip: j.tooltip_key ? t(j.tooltip_key, { defaultValue: "" }) : void 0,
              children: N(j)
            },
            j.key
          )),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(fe, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(O, { type: "primary", htmlType: "submit", loading: T, style: { marginRight: 8 }, children: a("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              O,
              {
                onClick: () => m(!0),
                disabled: !c || V,
                loading: V,
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
        open: u,
        onCancel: () => m(!1),
        footer: [
          /* @__PURE__ */ e.jsx(O, { onClick: () => m(!1), children: a("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(O, { type: "primary", loading: V, onClick: () => n.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: n,
            layout: "vertical",
            onFinish: (j) => M(j),
            children: [
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  label: t("settings.smtp.testEmailRecipient", { defaultValue: "Recipient Email Address" }),
                  name: "to",
                  rules: [
                    { required: !0, message: t("settings.smtp.testEmailRecipientRequired", { defaultValue: "Recipient email address is required." }) },
                    { type: "email", message: t("settings.smtp.testEmailRecipientInvalid", { defaultValue: "Invalid email address." }) }
                  ],
                  children: /* @__PURE__ */ e.jsx(v, { placeholder: "test@example.com" })
                }
              ),
              i && /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: i.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: i.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, Ds = () => {
  const { message: s } = ce.useApp(), { t, i18n: a } = W("system"), { t: l } = W("common"), [i] = o.useForm(), { loading: r, data: u, refresh: m } = F(C.system.getSystemBaseSettings, {
    onSuccess: (I) => {
      i.setFieldsValue(I);
    },
    onError: (I) => {
      s.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", I);
    }
  }), { loading: n, run: c } = F(C.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      s.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), m();
    },
    onError: (I) => {
      s.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", I);
    }
  }), { loading: d, run: S } = F(C.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      s.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (I) => {
      s.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", I);
    }
  }), h = (I) => {
    c(I);
  };
  return /* @__PURE__ */ e.jsx(ye, { spinning: r, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: i,
      layout: "vertical",
      onFinish: h,
      initialValues: u,
      children: [
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(yt, { items: [{
          key: "default",
          label: l("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", children: /* @__PURE__ */ e.jsx(v, {}) }) })
        }, ...hs.map((I) => ({
          key: I.lang,
          label: a.language !== I.lang ? l(`language.${I.lang}`, { defaultValue: I.label, lang: I.label }) : I.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: ["name_i18n", I.lang], children: /* @__PURE__ */ e.jsx(v, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(v, {}) }),
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(v, {}) }),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.enableSkillToolBinding", { defaultValue: "Link AI tools to skills" }),
            name: "enable_skill_tool_binding",
            tooltip: t("settings.base.enableSkillToolBindingTooltip", {
              defaultValue: "When enabled, AI chat narrows tools by skill bindings when skills are in scope (still within role AI tool permissions)."
            }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            O,
            {
              type: "primary",
              htmlType: "submit",
              loading: n,
              icon: /* @__PURE__ */ e.jsx(We, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            O,
            {
              onClick: () => m(),
              icon: /* @__PURE__ */ e.jsx(Se, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(fe, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            Rt,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: l("ok", { defaultValue: "OK" }),
              cancelText: l("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => S(),
              children: /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(Zt, {}), loading: d, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, Us = He(() => import("./json-schema-config-form.js").then((s) => ({
  default: s.JsonSchemaConfigFormItem
}))), { TextArea: ut } = v, $s = () => {
  var q;
  const { message: s } = ce.useApp(), { t } = W("ai"), { t: a } = W("common"), l = je(), [i] = o.useForm(), [r, u] = y(!1), [m, n] = y(null), [c, d] = y(""), [S, h] = y(""), { loading: I, data: T } = F(
    () => C.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (p) => {
        s.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", p);
      }
    }
  ), M = Te(() => T == null ? void 0 : T.find((p) => p.provider === S), [T, S]), { loading: V, data: N, refresh: j } = F(
    () => C.ai.listAiModels({ current: 1, page_size: 100, search: c }),
    {
      refreshDeps: [c],
      onError: (p) => {
        s.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", p);
      }
    }
  ), { loading: P, run: E } = F(
    ({ config: p, ...A }) => C.ai.createAiModel({ config: p ?? {}, ...A }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), u(!1), i.resetFields(), j();
      },
      onError: (p) => {
        s.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", p);
      }
    }
  ), { loading: Y, run: K } = F(
    ({ id: p, data: A }) => C.ai.updateAiModel({ id: p }, A),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), u(!1), i.resetFields(), n(null), j();
      },
      onError: (p) => {
        s.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", p);
      }
    }
  ), { runAsync: G } = F(
    (p) => C.ai.deleteAiModel({ id: p }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), j();
      },
      onError: (p) => {
        s.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", p);
      }
    }
  ), { runAsync: Z } = F(
    (p) => C.ai.testAiModel({ id: p }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (p) => {
        s.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", p);
      }
    }
  ), { runAsync: X } = F(
    (p) => C.ai.setDefaultAiModel({ id: p }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), j();
      },
      onError: (p) => {
        s.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", p);
      }
    }
  ), _ = () => {
    n(null), h(""), i.resetFields(), u(!0);
  }, k = (p) => {
    n(p), h(p.provider);
    const A = p.config || {}, U = {
      name: p.name,
      description: p.description,
      provider: p.provider,
      is_default: p.is_default,
      config: A,
      // Spread config fields to form
      status: p.status,
      system_prompt: p.system_prompt ?? "",
      max_chat_tokens: p.max_chat_tokens ?? 0,
      max_chat_iterations: p.max_chat_iterations ?? 0
    };
    i.setFieldsValue(U), u(!0);
  }, L = async (p) => {
    n(null), h(p.provider), i.resetFields();
    try {
      const A = await C.ai.getAiModel({ id: p.id }), U = { ...A.config || {} };
      "api_key" in U && (U.api_key = ""), i.setFieldsValue({
        name: `${A.name} (copy)`,
        description: A.description,
        provider: A.provider,
        config: U,
        is_default: !1,
        status: "enabled",
        system_prompt: A.system_prompt ?? "",
        max_chat_tokens: A.max_chat_tokens ?? 0,
        max_chat_iterations: A.max_chat_iterations ?? 0
      }), u(!0);
    } catch {
      s.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, D = (p) => {
    h(p), i.setFieldValue("config", void 0);
  }, x = (p) => {
    const A = p.config ?? {}, U = {
      name: p.name,
      description: p.description,
      provider: p.provider,
      config: A,
      is_default: p.is_default,
      status: p.status,
      system_prompt: p.system_prompt ?? "",
      max_chat_tokens: p.max_chat_tokens ?? 0,
      max_chat_iterations: p.max_chat_iterations ?? 0
    };
    m ? K({ id: m.id, data: U }) : E(U);
  }, J = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (p, A) => /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx("span", { children: p }),
        A.is_default && /* @__PURE__ */ e.jsx(Xe, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Xt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (p) => /* @__PURE__ */ e.jsx(ae, { color: "blue", children: p.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (p) => /* @__PURE__ */ e.jsx(ae, { color: p === "enabled" ? "green" : "red", children: p === "enabled" ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (p, A) => /* @__PURE__ */ e.jsx(Ke, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Qt, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => Z(A.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Yt, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => X(A.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Le, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => k(A)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(jt, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => L(A)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Ae, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => G(A.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Be, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ke, { children: /* @__PURE__ */ e.jsx(
        v.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (p) => d(p),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(ke, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(fe, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          O,
          {
            icon: /* @__PURE__ */ e.jsx(Vt, {}),
            onClick: () => l("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          O,
          {
            icon: /* @__PURE__ */ e.jsx(Se, {}),
            onClick: j,
            loading: V,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(fe, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          O,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Re, {}),
            onClick: _,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(
      Me,
      {
        columns: J,
        dataSource: (N == null ? void 0 : N.data) || [],
        loading: V,
        rowKey: "id",
        pagination: {
          total: (N == null ? void 0 : N.total) || 0,
          current: (N == null ? void 0 : N.current) || 1,
          pageSize: (N == null ? void 0 : N.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (p, A) => a("pagination.total", {
            defaultValue: `${A[0]}-${A[1]} of ${p} items`,
            start: A[0],
            end: A[1],
            total: p
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: m ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: r,
        onCancel: () => {
          u(!1), i.resetFields(), n(null);
        },
        footer: null,
        width: ((q = M == null ? void 0 : M.ui_schema) == null ? void 0 : q["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: i,
            layout: "vertical",
            onFinish: x,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "name",
                    label: t("models.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                    children: /* @__PURE__ */ e.jsx(v, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: t("models.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      ut,
                      {
                        rows: 3,
                        placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "provider",
                    label: t("models.provider", { defaultValue: "Provider" }),
                    rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                    children: /* @__PURE__ */ e.jsx(
                      $,
                      {
                        loading: I,
                        placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                        onChange: D,
                        value: S,
                        options: T == null ? void 0 : T.map((p) => ({
                          label: p.name,
                          value: p.provider
                        }))
                      }
                    )
                  }
                ),
                M && /* @__PURE__ */ e.jsx(o.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(
                  Us,
                  {
                    name: "config",
                    schema: M.config_schema,
                    uiSchema: M.ui_schema
                  }
                ) }) }),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "system_prompt",
                    label: t("models.systemPrompt", { defaultValue: "System Prompt" }),
                    tooltip: t("models.systemPromptHelp", {
                      defaultValue: "Optional system prompt prepended to every conversation for this model."
                    }),
                    children: /* @__PURE__ */ e.jsx(
                      ut,
                      {
                        rows: 4,
                        placeholder: t("models.systemPromptPlaceholder", {
                          defaultValue: "Enter system prompt (optional)"
                        })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsxs(Be, { gutter: 16, children: [
                  /* @__PURE__ */ e.jsx(ke, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_tokens",
                      label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: t("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(pe, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) }),
                  /* @__PURE__ */ e.jsx(ke, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_iterations",
                      label: t("models.maxChatIterations", { defaultValue: "Max chat iterations (tool rounds)" }),
                      tooltip: t("models.maxChatIterationsHelp", {
                        defaultValue: "0 uses default. Positive value caps tool-call iterations for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(pe, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "is_default",
                    valuePropName: "checked",
                    label: t("models.setAsDefault", { defaultValue: "Set as default model" }),
                    children: /* @__PURE__ */ e.jsx(de, {})
                  }
                ),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(v, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
                /* @__PURE__ */ e.jsx(
                  O,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: P || Y,
                    children: m ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  O,
                  {
                    onClick: () => {
                      u(!1), i.resetFields(), n(null), h("");
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
}, qs = He(() => import("./json-schema-config-form.js").then((s) => ({
  default: s.JsonSchemaConfigFormItem
}))), { TextArea: Bs } = v, Js = () => {
  var ve;
  const { message: s } = ce.useApp(), { t } = W("system"), { t: a } = W("common"), l = je(), [i] = o.useForm(), [r, u] = y(!1), [m, n] = y(null), [c, d] = y(""), [S, h] = y(!1), [I, T] = y(null), [M, V] = y(""), [N, j] = y(!1), [P, E] = y([]), [Y, K] = y(), [G, Z] = y(null), { loading: X, data: _, refresh: k } = F(
    () => C.system.listToolSets({ current: 1, page_size: 100, search: c, type: Y }),
    {
      refreshDeps: [c, Y],
      onError: (b) => {
        s.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", b);
      }
    }
  ), { loading: L, data: D } = F(
    () => C.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (b) => {
        s.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", b);
      }
    }
  ), x = Te(() => D == null ? void 0 : D.find((b) => b.tool_set_type === M), [D, M]), { loading: J, run: q } = F(
    (b) => C.system.createToolSet({
      ...b,
      type: b.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), u(!1), i.resetFields(), k();
      },
      onError: (b) => {
        s.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", b);
      }
    }
  ), { loading: p, run: A } = F(
    ({ id: b, data: f }) => C.system.updateToolSet({ id: b }, {
      ...f,
      type: f.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), u(!1), i.resetFields(), n(null), k();
      },
      onError: (b) => {
        s.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", b);
      }
    }
  ), { run: U } = F(
    (b) => C.system.deleteToolSet({ id: b }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), k();
      },
      onError: (b) => {
        s.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", b);
      }
    }
  ), { runAsync: me } = F(
    (b) => C.system.testToolSet({ id: b }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (b) => {
        s.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", b);
      }
    }
  ), { loading: ne, runAsync: _e } = F(
    (b) => C.system.getToolSetTools({ id: b }),
    {
      manual: !0,
      onSuccess: (b) => {
        E(b || []), j(!0);
      },
      onError: (b) => {
        s.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", b);
      }
    }
  ), Fe = he(
    async (b, f) => {
      Z(b.id);
      try {
        await C.system.updateToolSetStatus(
          { id: b.id },
          { status: f ? "enabled" : "disabled" }
        ), s.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), k();
      } catch (z) {
        s.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", z);
      } finally {
        Z(null);
      }
    },
    [t, k]
  ), Ie = () => {
    n(null), i.resetFields(), V(""), u(!0);
  }, we = (b) => {
    n(b), V(b.type);
    const f = { ...b };
    i.setFieldsValue(f), u(!0);
  }, Ve = (b) => {
    V(b), i.setFieldValue("config", {});
  }, Ce = (b) => {
    m ? A({ id: m.id, data: b }) : q(b);
  }, w = (b) => {
    U(b);
  }, le = (b) => {
    T(b), h(!0);
  }, xe = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (b, f) => /* @__PURE__ */ e.jsxs(H, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: b }),
        f.is_preset ? /* @__PURE__ */ e.jsx(ae, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (b) => /* @__PURE__ */ e.jsx(ae, { color: "blue", children: b.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      key: "status",
      width: 120,
      render: (b, f) => {
        const z = f.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          fe,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(ae, { color: z ? "green" : "red", children: z ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Xe,
              {
                title: z ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: z,
                    loading: G === f.id,
                    onChange: (ee) => void Fe(f, ee)
                  }
                ) })
              }
            )
          }
        );
      }
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (b, f) => /* @__PURE__ */ e.jsx(Ke, { actions: [
        {
          key: "debug",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.debug", { defaultValue: "Debug Tool" }),
          icon: /* @__PURE__ */ e.jsx(Vt, {}),
          disabled: f.status !== "enabled",
          onClick: async () => l(`/system/settings/toolsets/${f.id}/debug`)
        },
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(es, {}),
          disabled: f.status !== "enabled",
          onClick: async () => me(f.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(lt, {}),
          permission: "system:toolsets:view",
          disabled: f.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => _e(f.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(ts, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => le(f.config),
          disabled: !f.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: f.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Le, {}),
          onClick: async () => we(f),
          disabled: !!f.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Ae, {}),
          permission: "system:toolsets:delete",
          tooltip: f.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : a("delete", { defaultValue: "Delete" }),
          onClick: async () => w(f.id),
          danger: !0,
          disabled: !!f.is_preset,
          confirm: f.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => w(f.id),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Be, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ke, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(
          v.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (b) => d(b),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          $,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: Y,
            onChange: (b) => K(b),
            options: D == null ? void 0 : D.map((b) => ({
              label: b.name,
              value: b.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx($.Option, { value: "", children: "All" }),
              D == null ? void 0 : D.map((b) => /* @__PURE__ */ e.jsx($.Option, { value: b.tool_set_type, children: b.name }, b.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(ke, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(
          O,
          {
            icon: /* @__PURE__ */ e.jsx(Se, {}),
            onClick: k,
            loading: X,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(fe, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          O,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Re, {}),
            onClick: Ie,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(
      Me,
      {
        columns: xe,
        dataSource: (_ == null ? void 0 : _.data) || [],
        loading: X,
        rowKey: "id",
        pagination: {
          total: (_ == null ? void 0 : _.total) || 0,
          current: (_ == null ? void 0 : _.current) || 1,
          pageSize: (_ == null ? void 0 : _.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (b, f) => a("pagination.total", {
            defaultValue: `${f[0]}-${f[1]} of ${b} items`,
            start: f[0],
            end: f[1],
            total: b
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: m ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: r,
        onCancel: () => {
          u(!1), i.resetFields(), n(null), V("");
        },
        footer: null,
        width: ((ve = x == null ? void 0 : x.ui_schema) == null ? void 0 : ve["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: i,
            layout: "vertical",
            onFinish: Ce,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "name",
                    label: t("settings.toolsets.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                    children: /* @__PURE__ */ e.jsx(v, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: t("settings.toolsets.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      Bs,
                      {
                        rows: 3,
                        placeholder: t("settings.toolsets.descriptionPlaceholder", { defaultValue: "Enter toolset description" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "type",
                    label: t("settings.toolsets.type", { defaultValue: "Type" }),
                    rules: [{ required: !0, message: t("settings.toolsets.typeRequired", { defaultValue: "Please select type" }) }],
                    children: /* @__PURE__ */ e.jsx(
                      $,
                      {
                        loading: L,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: Ve,
                        value: M,
                        options: D == null ? void 0 : D.map((b) => ({
                          label: b.name,
                          value: b.tool_set_type
                        }))
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(
                  qs,
                  {
                    name: "config",
                    schema: x == null ? void 0 : x.config_schema,
                    uiSchema: x == null ? void 0 : x.ui_schema
                  }
                ) }),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(v, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
                /* @__PURE__ */ e.jsx(
                  O,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: J || p,
                    children: m ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  O,
                  {
                    onClick: () => {
                      u(!1), i.resetFields(), n(null), V("");
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
      oe,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: S,
        onCancel: () => h(!1),
        footer: [
          /* @__PURE__ */ e.jsx(O, { onClick: () => h(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(I, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      oe,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: N,
        onCancel: () => j(!1),
        footer: [
          /* @__PURE__ */ e.jsx(O, { onClick: () => j(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: ne ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(Se, { style: { fontSize: 24 }, spin: !0 }) }) : P.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : P.map((b, f) => {
          var z, ee, ue;
          return /* @__PURE__ */ e.jsx(
            se,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(H, { children: [
                /* @__PURE__ */ e.jsx(lt, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((z = b.function) == null ? void 0 : z.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(Be, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(ke, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((ee = b.function) == null ? void 0 : ee.description) || "-" })
                ] }),
                ((ue = b.function) == null ? void 0 : ue.parameters) && /* @__PURE__ */ e.jsxs(ke, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(b.function.parameters, null, 2) })
                ] })
              ] })
            },
            f
          );
        }) })
      }
    )
  ] });
}, { TextArea: ct } = v;
function Hs(s, t) {
  const a = {}, l = [], i = new Map(t.map((r) => [r.id, r]));
  for (const r of s) {
    if (r.toolset_id === "*") {
      l.push({ toolset_id: r.toolset_id, tool_name: r.tool_name });
      continue;
    }
    const u = i.get(r.toolset_id);
    if (!u) {
      l.push({ toolset_id: r.toolset_id, tool_name: r.tool_name });
      continue;
    }
    const m = (u.tools || []).map((n) => n.name);
    if (r.tool_name === "*") {
      a[r.toolset_id] = [...m];
      continue;
    }
    m.includes(r.tool_name) ? (a[r.toolset_id] || (a[r.toolset_id] = []), a[r.toolset_id].includes(r.tool_name) || a[r.toolset_id].push(r.tool_name)) : l.push({ toolset_id: r.toolset_id, tool_name: r.tool_name });
  }
  return { selections: a, extraPatterns: l };
}
function Ws(s, t) {
  const a = [], l = /* @__PURE__ */ new Set();
  for (const [i, r] of Object.entries(s))
    for (const u of r) {
      const m = `${i}|${u}`;
      l.has(m) || (l.add(m), a.push({ toolset_id: i, tool_name: u }));
    }
  for (const i of t) {
    const r = i.toolset_id.trim(), u = i.tool_name.trim();
    if (!r || !u)
      continue;
    const m = `${r}|${u}`;
    l.has(m) || (l.add(m), a.push({ toolset_id: r, tool_name: u }));
  }
  return a;
}
function It(s, t) {
  const a = t.trim();
  return !a || s.some((l) => l.value === a) ? s : [...s, { value: a, label: a }];
}
function Ks(s, t, a, l) {
  const r = [{ value: "*", label: l }], u = /* @__PURE__ */ new Set(["*"]), m = (n, c) => {
    u.has(n) || (u.add(n), r.push({
      value: n,
      label: c ? `${n} — ${c}` : n
    }));
  };
  if (t && t !== "*") {
    const n = s.find((c) => c.id === t);
    for (const c of (n == null ? void 0 : n.tools) || [])
      m(c.name, c.description);
  } else
    for (const n of s)
      for (const c of n.tools || [])
        m(c.name, c.description);
  return It(r, a);
}
const Gs = () => {
  const { message: s } = ce.useApp(), { t } = W("system"), { t: a } = W("common"), l = je(), { enableSkillToolBinding: i } = Tt(), [r] = o.useForm(), [u, m] = y(""), [n, c] = y(), [d, S] = y("user"), [h, I] = y(!1), [T, M] = y(null), [V, N] = y(null), [j, P] = y(!1), [E] = o.useForm(), [Y, K] = y(!1), [G, Z] = y(null), [X, _] = y([]), [k, L] = y({}), [D, x] = y([]), [J, q] = y(!1), p = Te(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...X.map((g) => ({
      value: g.id,
      label: `${g.name} (${g.id})`
    }))
  ], [X, t]), A = he(() => {
    _([]), L({}), x([]);
  }, []), { loading: U, data: me, refresh: ne } = F(
    () => C.system.listSkills({
      current: 1,
      page_size: 100,
      search: u || void 0,
      domain: n,
      is_preset: d === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [u, n, d],
      onError: () => {
        s.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: _e = [] } = F(() => C.system.listSkillDomains()), Fe = (me == null ? void 0 : me.data) || [], Ie = (me == null ? void 0 : me.total) || 0, { run: we } = F(
    (g) => C.system.deleteSkill({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), ne();
      },
      onError: () => {
        s.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Ve = he(
    async (g, R) => {
      Z(g.id);
      try {
        await C.system.updateSkillStatus({ id: g.id }, { status: R ? "enabled" : "disabled" }), s.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), ne();
      } catch {
        s.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        Z(null);
      }
    },
    [t, ne]
  ), { loading: Ce, run: w } = F(
    (g) => C.system.uploadSkill(g.body, g.file),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), P(!1), E.resetFields(), ne();
      },
      onError: () => {
        s.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), le = he(
    async (g) => {
      var R;
      q(!0);
      try {
        const [B, re] = await Promise.all([
          C.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          C.system.listSkillAiToolBindings(
            { id: g, current: 1, page_size: 1e3 }
          )
        ]), Q = ((R = B.data) == null ? void 0 : R.filter((Mt) => Mt.status === "enabled")) || [];
        _(Q);
        const { selections: te, extraPatterns: $e } = Hs(re.data || [], Q);
        L(te), x($e);
      } catch {
        s.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), A();
      } finally {
        q(!1);
      }
    },
    [A, t]
  );
  Ne(() => {
    !h || !(T != null && T.id) || !i || le(T.id);
  }, [h, T == null ? void 0 : T.id, i, le]);
  const xe = (g, R) => {
    L((B) => ({ ...B, [g]: R }));
  }, ve = (g, R, B) => {
    L((re) => ({
      ...re,
      [g]: B ? [...R] : []
    }));
  }, b = () => {
    M(null), N(null), r.resetFields(), A(), I(!0);
  }, f = (g) => {
    M(g), N(null), r.setFieldsValue({
      name: g.name,
      description: g.description,
      category: g.category,
      domain: g.domain
    }), A(), I(!0);
  }, z = (g) => {
    M(null), N(g), r.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: g.name, defaultValue: "{{name}} (copy)" }),
      description: g.description,
      category: g.category,
      domain: g.domain
    }), A(), I(!0);
  }, ee = () => {
    r.validateFields().then(async (g) => {
      K(!0);
      try {
        if (T) {
          const R = {
            name: g.name,
            description: g.description ?? "",
            category: g.category ?? "",
            domain: g.domain ?? ""
          };
          if (await C.system.updateSkill({ id: T.id }, R), i) {
            const B = Ws(k, D);
            await C.system.replaceSkillAiToolBindings(
              { id: T.id },
              { bindings: B }
            );
          }
          s.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (V) {
          const R = {
            source_id: V.id,
            name: g.name,
            description: g.description ?? "",
            category: g.category ?? "",
            domain: g.domain ?? ""
          }, { id: B } = await C.system.cloneSkill(R);
          s.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), I(!1), N(null), r.resetFields(), A(), ne(), B && l(`/system/settings/skills/${B}/edit`);
          return;
        } else {
          const R = {
            name: g.name,
            description: g.description ?? "",
            category: g.category ?? "",
            domain: g.domain ?? "",
            content: g.content ?? ""
          };
          await C.system.createSkill(R), s.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        I(!1), M(null), N(null), r.resetFields(), A(), ne();
      } catch {
        s.error(
          T ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : V ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        K(!1);
      }
    });
  }, ue = () => {
    var Q, te;
    const g = (Q = E.getFieldValue("file")) == null ? void 0 : Q.fileList, R = ((te = g == null ? void 0 : g[0]) == null ? void 0 : te.originFileObj) ?? (g == null ? void 0 : g[0]);
    if (!R) {
      s.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const B = E.getFieldValue("category"), re = E.getFieldValue("domain");
    w({ body: { category: B, domain: re }, file: R });
  }, Ue = i && T, zt = Ue ? 720 : 560, Ot = !T && !V, Pt = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (g, R) => /* @__PURE__ */ e.jsxs(H, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: g }),
        R.is_preset ? /* @__PURE__ */ e.jsx(ae, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (g) => g ? /* @__PURE__ */ e.jsx(ae, { children: g }) : "-", width: 180 },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (g) => g ? /* @__PURE__ */ e.jsx(ae, { color: "blue", children: g }) : "-", width: 180 },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (g, R) => {
        const B = R.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          fe,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(ae, { color: B ? "green" : "red", children: B ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Xe,
              {
                title: B ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: B,
                    loading: G === R.id,
                    onChange: (re) => void Ve(R, re)
                  }
                ) })
              }
            )
          }
        );
      }
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 220,
      render: (g, R) => /* @__PURE__ */ e.jsx(
        Ke,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(Ge, {}),
              tooltip: R.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => l(`/system/settings/skills/${R.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!R.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(kt, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => l(`/system/settings/skills/${R.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Le, {}),
              tooltip: R.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => f(R),
              permission: "system:skills:update",
              disabled: !!R.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(jt, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => z(R),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
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
                okText: a("confirm", { defaultValue: "Confirm" }),
                cancelText: a("cancel", { defaultValue: "Cancel" }),
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
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Be, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ke, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(
          v.Search,
          {
            placeholder: a("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: m,
            style: { width: 300 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          $,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: n,
            onChange: c,
            options: _e.map((g) => ({ value: g, label: g }))
          }
        ),
        /* @__PURE__ */ e.jsx(
          qe.Group,
          {
            optionType: "button",
            value: d,
            onChange: (g) => S(g.target.value),
            options: [
              { value: "user", label: t("settings.skills.scopeUser", { defaultValue: "User skills" }) },
              { value: "all", label: t("settings.skills.scopeAll", { defaultValue: "All skills" }) }
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(ke, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(Se, {}), onClick: () => ne(), children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(fe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(O, { type: "primary", icon: /* @__PURE__ */ e.jsx(Re, {}), onClick: b, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(fe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(rt, {}), onClick: () => P(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(se, { children: [
      /* @__PURE__ */ e.jsx(
        Me,
        {
          rowKey: "id",
          loading: U,
          columns: Pt,
          dataSource: Fe,
          pagination: { total: Ie, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        oe,
        {
          title: T ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : V ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: h,
          onOk: ee,
          onCancel: () => {
            I(!1), M(null), N(null), A();
          },
          confirmLoading: Y,
          width: zt,
          children: /* @__PURE__ */ e.jsxs(o, { form: r, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(v, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(ct, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(v, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: _e.map((g) => ({ value: g, label: g })) }) }),
            Ot && /* @__PURE__ */ e.jsx(o.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(ct, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            Ue && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(ye, { spinning: J, children: X.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(H, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: X.map((g) => {
                const R = (g.tools || []).map((te) => te.name), B = k[g.id] || [], re = R.length > 0 && B.length === R.length, Q = B.length > 0 && B.length < R.length;
                return /* @__PURE__ */ e.jsx(
                  se,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        Ye,
                        {
                          checked: re,
                          indeterminate: Q,
                          onChange: (te) => ve(g.id, R, te.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: g.name })
                    ] }),
                    extra: g.description ? /* @__PURE__ */ e.jsx("span", { children: g.description }) : void 0,
                    children: (g.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(Ye.Group, { style: { width: "100%" }, value: B, onChange: (te) => xe(g.id, te), children: /* @__PURE__ */ e.jsx(H, { direction: "vertical", style: { width: "100%" }, children: (g.tools || []).map((te) => /* @__PURE__ */ e.jsx(Ye, { value: te.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: te.name }),
                      te.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: te.description })
                    ] }) }, te.name)) }) }) : /* @__PURE__ */ e.jsx(
                      Oe,
                      {
                        image: Oe.PRESENTED_IMAGE_SIMPLE,
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
                /* @__PURE__ */ e.jsxs(H, { direction: "vertical", style: { width: "100%" }, children: [
                  D.map((g, R) => /* @__PURE__ */ e.jsxs(
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
                            options: It(p, g.toolset_id),
                            filterOption: (B, re) => {
                              const Q = re;
                              return `${(Q == null ? void 0 : Q.value) ?? ""} ${(Q == null ? void 0 : Q.label) ?? ""}`.toLowerCase().includes(B.toLowerCase());
                            },
                            onChange: (B) => {
                              const re = typeof B == "string" ? B : "";
                              x(
                                (Q) => Q.map((te, $e) => $e === R ? { ...te, toolset_id: re } : te)
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
                            options: Ks(
                              X,
                              g.toolset_id,
                              g.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (B, re) => {
                              const Q = re;
                              return `${(Q == null ? void 0 : Q.value) ?? ""} ${(Q == null ? void 0 : Q.label) ?? ""}`.toLowerCase().includes(B.toLowerCase());
                            },
                            onChange: (B) => {
                              const re = typeof B == "string" ? B : "";
                              x(
                                (Q) => Q.map((te, $e) => $e === R ? { ...te, tool_name: re } : te)
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
                            onClick: () => x((B) => B.filter((re, Q) => Q !== R)),
                            children: a("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    R
                  )),
                  /* @__PURE__ */ e.jsx(O, { type: "dashed", onClick: () => x((g) => [...g, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                ] })
              ] })
            ] }) : /* @__PURE__ */ e.jsx(
              Oe,
              {
                image: Oe.PRESENTED_IMAGE_SIMPLE,
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
          onOk: ue,
          onCancel: () => P(!1),
          confirmLoading: Ce,
          children: /* @__PURE__ */ e.jsxs(o, { form: E, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(Dt, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(rt, {}), children: a("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(v, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: _e.map((g) => ({ value: g, label: g })) }) })
          ] })
        }
      )
    ] })
  ] });
}, Zs = () => {
  const { message: s } = ce.useApp(), t = je(), { t: a } = W("system"), { t: l } = W("task"), { t: i } = W("common"), [r] = o.useForm(), { data: u } = F(C.system.listLogStorageBackends), { data: m } = F(C.system.getTaskSettingFields), n = (u ?? []).map((V) => ({
    value: V.id,
    label: a(`settings.task.logStorage.${V.id}`, { defaultValue: V.name })
  })), { loading: c, refresh: d } = F(C.system.getTaskSettings, {
    onSuccess: (V) => {
      V && r.setFieldsValue(V);
    },
    onError: () => {
      s.error(a("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: S, run: h } = F(C.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      s.success(a("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), d();
    },
    onError: () => {
      s.error(a("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), I = (V) => {
    h(V);
  }, T = (V) => {
    switch (V.value_type) {
      case "int":
      case "number":
        return /* @__PURE__ */ e.jsx(
          pe,
          {
            style: { width: "100%" },
            addonAfter: V.key.includes("retention_days") ? a("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "percentage":
        return /* @__PURE__ */ e.jsx(pe, { style: { width: "100%" }, min: 0, max: 100, step: 0.01, addonAfter: "%" });
      case "bool":
        return /* @__PURE__ */ e.jsx(de, {});
      case "string_list":
        return /* @__PURE__ */ e.jsx($, { mode: "tags", tokenSeparators: [","] });
      case "enum":
        return /* @__PURE__ */ e.jsx($, { options: V.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(Ct, { theme: "snow" });
      default:
        return /* @__PURE__ */ e.jsx(v, {});
    }
  }, M = (V) => V.value_type === "int" || V.value_type === "number" || V.value_type === "percentage" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(ye, { spinning: c, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: r,
      layout: "vertical",
      onFinish: I,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "log_storage_backend",
            label: a("settings.task.logStorageBackend", { defaultValue: "Log storage" }),
            tooltip: a("settings.task.logStorageBackendTooltip", {
              defaultValue: "Where task execution logs are stored. Database stores logs in the application database."
            }),
            children: /* @__PURE__ */ e.jsx(
              $,
              {
                options: n,
                placeholder: a("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: u === void 0
              }
            )
          }
        ),
        (m ?? []).map((V) => /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: V.key,
            label: a(`settings.task.fields.${V.key}`, { defaultValue: V.key }),
            rules: M(V),
            valuePropName: V.value_type === "bool" ? "checked" : "value",
            children: T(V)
          },
          V.key
        )),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(O, { type: "primary", htmlType: "submit", loading: S, icon: /* @__PURE__ */ e.jsx(We, {}), children: i("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(O, { onClick: () => d(), icon: /* @__PURE__ */ e.jsx(Se, {}), children: i("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(fe, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(ss, {}), onClick: () => t("/tasks/schedules"), children: l("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: Xs } = v, Qs = /^[-_a-zA-Z0-9.]+$/, Ys = () => {
  const { message: s } = ce.useApp(), t = je(), { t: a, i18n: l } = W("system"), { t: i } = W("common"), r = (x) => {
    if (!x) return "-";
    const J = new Date(x);
    return Number.isNaN(J.getTime()) ? "-" : J.toLocaleString(l.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [u] = o.useForm(), [m, n] = y(!1), [c, d] = y(null), [S, h] = y(""), [I, T] = y(1), [M, V] = y(10), { loading: N, data: j, refresh: P } = F(
    () => js({ current: I, page_size: M, search: S }),
    {
      refreshDeps: [I, M, S],
      onError: (x) => {
        s.error(a("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", x);
      }
    }
  ), { loading: E, run: Y } = F(
    (x) => Vs(x),
    {
      manual: !0,
      onSuccess: () => {
        s.success(a("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), n(!1), u.resetFields(), d(null), P();
      },
      onError: (x) => {
        s.error((x == null ? void 0 : x.err) || a("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: K, run: G } = F(
    ({ id: x, ...J }) => ks({ id: x }, J),
    {
      manual: !0,
      onSuccess: () => {
        s.success(a("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), n(!1), u.resetFields(), d(null), P();
      },
      onError: (x) => {
        s.error((x == null ? void 0 : x.err) || a("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: Z } = F(
    (x) => Ss({ id: x }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(a("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), P();
      },
      onError: (x) => {
        s.error((x == null ? void 0 : x.err) || a("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), X = () => {
    d(null), u.resetFields(), u.setFieldsValue({ status: "active" }), n(!0);
  }, _ = (x) => {
    d(x), u.setFieldsValue({
      name: x.name,
      slug: x.slug,
      description: x.description,
      status: x.status
    }), n(!0);
  }, k = (x) => {
    oe.confirm({
      title: a("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: a("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${x.name}"? This action cannot be undone.`
      }),
      onOk: () => Z(x.id)
    });
  }, L = () => {
    u.validateFields().then((x) => {
      c ? G({ id: c.id, ...x }) : Y(x);
    });
  }, D = [
    {
      title: a("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: a("settings.organizations.slug", { defaultValue: "Slug" }),
      dataIndex: "slug",
      key: "slug",
      render: (x) => x || "-"
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
      render: (x) => /* @__PURE__ */ e.jsx(ae, { color: x === "active" ? "green" : "default", children: x === "active" ? a("settings.organizations.active", { defaultValue: "Active" }) : a("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (x) => r(x)
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (x, J) => /* @__PURE__ */ e.jsx(
        Ke,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(kt, {}),
              onClick: async () => t(`/system/settings/organizations/${J.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Le, {}),
              onClick: async () => _(J),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
              danger: !0,
              onClick: async () => k(J),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    se,
    {
      title: a("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(Se, {}), onClick: P, children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(fe, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(O, { type: "primary", icon: /* @__PURE__ */ e.jsx(Re, {}), onClick: X, children: a("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(H, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            v.Search,
            {
              placeholder: a("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (x) => {
                h(x), T(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Me,
            {
              columns: D,
              dataSource: (j == null ? void 0 : j.data) || [],
              loading: N,
              rowKey: "id",
              pagination: {
                current: I,
                pageSize: M,
                total: (j == null ? void 0 : j.total) || 0,
                showSizeChanger: !0,
                showTotal: (x, J) => i("pagination.total", {
                  defaultValue: `${J[0]}-${J[1]} of ${x} items`,
                  start: J[0],
                  end: J[1],
                  total: x
                }),
                onChange: (x, J) => {
                  T(x), V(J);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          oe,
          {
            title: c ? a("settings.organizations.edit", { defaultValue: "Edit Organization" }) : a("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: m,
            onOk: L,
            onCancel: () => {
              n(!1), u.resetFields(), d(null);
            },
            confirmLoading: E || K,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(o, { form: u, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "name",
                  label: a("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: a("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(v, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "slug",
                  label: a("settings.organizations.slug", { defaultValue: "Slug" }),
                  tooltip: a("settings.organizations.slugTooltip", { defaultValue: "Optional unique identifier. Only letters, digits, hyphens, underscores, and dots are allowed." }),
                  rules: [{
                    pattern: Qs,
                    message: a("settings.organizations.slugInvalid", { defaultValue: "Slug may only contain letters, digits, hyphens, underscores, and dots" })
                  }],
                  children: /* @__PURE__ */ e.jsx(v, { placeholder: "my-org" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "description",
                  label: a("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Xs, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "status",
                  label: a("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs($, { children: [
                    /* @__PURE__ */ e.jsx($.Option, { value: "active", children: a("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx($.Option, { value: "disabled", children: a("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, el = ({
  transformItems: s = (t) => t
}) => {
  const { t } = W("system"), a = je(), l = xs(), u = l.hash.replace("#", "") || "base", { enableMultiOrg: m } = Tt(), { hasPermission: n } = bs(), c = [
    {
      key: "base",
      label: t("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(Ds, {}),
      hidden: !n("system:settings:update")
    },
    {
      key: "security",
      label: t("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(Ms, {}),
      hidden: !n("system:security:update")
    },
    {
      key: "oauth",
      label: t("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Ps, {}),
      hidden: !n("system:settings:update")
    },
    {
      key: "ldap",
      label: t("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Ls, {}),
      hidden: !n("system:settings:update")
    },
    {
      key: "smtp",
      label: t("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(Rs, {}),
      hidden: !n("system:settings:update")
    },
    {
      key: "ai-models",
      label: t("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx($s, {}),
      hidden: !n("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: t("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(Js, {}),
      hidden: !n("system:toolsets:view")
    },
    {
      key: "skills",
      label: t("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(Gs, {}),
      hidden: !n("system:skills:view")
    },
    {
      key: "task",
      label: t("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Zs, {}),
      hidden: !n("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...m ? [{
      key: "organizations",
      label: t("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Ys, {}),
      hidden: !n("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(se, { title: t("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    yt,
    {
      defaultActiveKey: u,
      onChange: (d) => {
        a(`${l.pathname}#${d}`);
      },
      items: s(c.filter((d) => !d.hidden), t)
    }
  ) });
}, ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: el
}, Symbol.toStringTag, { value: "Module" })), tl = () => {
  var we, Ve, Ce;
  const { message: s } = ce.useApp(), t = je(), { id: a } = Qe(), { t: l } = W("system"), { t: i } = W("common"), [r] = o.useForm(), [u] = o.useForm(), [m, n] = y(!1), [c, d] = y(!1), [S, h] = y(null), [I, T] = y(""), [M, V] = y(1), [N, j] = y(10), { data: P, loading: E, refresh: Y } = F(
    () => _s({ id: a }),
    {
      ready: !!a,
      onError: (w) => {
        s.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", w);
      }
    }
  ), { data: K, loading: G, refresh: Z } = F(
    () => vs({ id: a, current: M, page_size: N, search: I }),
    {
      ready: !!a,
      refreshDeps: [a, M, N, I],
      onError: (w) => {
        s.error(l("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", w);
      }
    }
  ), { data: X, loading: _ } = F(
    () => Fs({ current: 1, page_size: 1e3 }),
    {
      ready: m
    }
  ), { data: k, loading: L } = F(
    () => Is({ organization_id: a, current: 1, page_size: 1e3 }),
    {
      ready: !!a
    }
  ), { loading: D, run: x } = F(
    (w) => ws({ id: a }, w),
    {
      manual: !0,
      onSuccess: () => {
        s.success(l("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), n(!1), r.resetFields(), Z();
      },
      onError: (w) => {
        s.error((w == null ? void 0 : w.err) || l("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: J, run: q } = F(
    (w) => Cs({ id: a, user_id: S.id }, w),
    {
      manual: !0,
      onSuccess: () => {
        s.success(l("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), d(!1), u.resetFields(), h(null), Z();
      },
      onError: (w) => {
        s.error((w == null ? void 0 : w.err) || l("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: p } = F(
    (w) => Ts({ id: a, user_id: w }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(l("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), Z();
      },
      onError: (w) => {
        s.error((w == null ? void 0 : w.err) || l("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), A = () => {
    n(!0), r.resetFields();
  }, U = (w) => {
    var le;
    h(w), u.setFieldsValue({
      role_ids: ((le = w.organization_roles) == null ? void 0 : le.map((xe) => xe.id)) || []
    }), d(!0);
  }, me = (w) => {
    oe.confirm({
      title: l("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: l("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${w.full_name || w.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => p(w.id)
    });
  }, ne = () => {
    r.validateFields().then((w) => {
      x(w);
    });
  }, _e = () => {
    u.validateFields().then((w) => {
      q(w);
    });
  }, Fe = ((we = X == null ? void 0 : X.data) == null ? void 0 : we.filter((w) => {
    var le;
    return !((le = K == null ? void 0 : K.data) != null && le.some((xe) => xe.id === w.id));
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
      render: (w) => /* @__PURE__ */ e.jsx(ae, { color: w === "active" ? "green" : "default", children: w === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : w })
    },
    {
      title: l("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (w, le) => {
        var xe;
        return /* @__PURE__ */ e.jsx(H, { wrap: !0, children: ((xe = le.organization_roles) == null ? void 0 : xe.map((ve) => /* @__PURE__ */ e.jsx(ae, { children: ve.name }, ve.id))) || /* @__PURE__ */ e.jsx(ae, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (w, le) => /* @__PURE__ */ e.jsx(
        Ke,
        {
          actions: [
            {
              key: "edit",
              label: l("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Le, {}),
              onClick: async () => U(le)
            },
            {
              key: "delete",
              label: l("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Ae, {}),
              danger: !0,
              onClick: async () => me(le)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      se,
      {
        title: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            O,
            {
              icon: /* @__PURE__ */ e.jsx(ot, {}),
              onClick: () => t("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            l("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            P == null ? void 0 : P.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(Se, {}), onClick: () => {
          Y(), Z();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: E,
        children: /* @__PURE__ */ e.jsxs(ie, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(ie.Item, { label: l("settings.organizations.name", { defaultValue: "Name" }), children: P == null ? void 0 : P.name }),
          /* @__PURE__ */ e.jsx(ie.Item, { label: l("settings.organizations.slug", { defaultValue: "Slug" }), children: (P == null ? void 0 : P.slug) || "-" }),
          /* @__PURE__ */ e.jsx(ie.Item, { label: l("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ae, { color: (P == null ? void 0 : P.status) === "active" ? "green" : "default", children: (P == null ? void 0 : P.status) === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(ie.Item, { label: l("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (P == null ? void 0 : P.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      se,
      {
        title: l("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(O, { type: "primary", icon: /* @__PURE__ */ e.jsx(Re, {}), onClick: A, children: l("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(H, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            v.Search,
            {
              placeholder: l("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (w) => {
                T(w), V(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Me,
            {
              columns: Ie,
              dataSource: (K == null ? void 0 : K.data) || [],
              loading: G,
              rowKey: "id",
              pagination: {
                current: M,
                pageSize: N,
                total: (K == null ? void 0 : K.total) || 0,
                showSizeChanger: !0,
                showTotal: (w) => i("pagination.total", { defaultValue: `Total ${w} items` }),
                onChange: (w, le) => {
                  V(w), j(le);
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
        title: l("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: m,
        onOk: ne,
        onCancel: () => {
          n(!1), r.resetFields();
        },
        confirmLoading: D,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: r, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "user_id",
              label: l("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: l("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                $,
                {
                  showSearch: !0,
                  placeholder: l("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: _,
                  filterOption: (w, le) => ((le == null ? void 0 : le.label) ?? "").toLowerCase().includes(w.toLowerCase()),
                  options: Fe.map((w) => ({
                    label: `${w.full_name || w.username} (${w.email})`,
                    value: w.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "role_ids",
              label: l("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                $,
                {
                  mode: "multiple",
                  placeholder: l("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: L,
                  options: ((Ve = k == null ? void 0 : k.data) == null ? void 0 : Ve.map((w) => ({
                    label: w.name,
                    value: w.id
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
        title: l("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: c,
        onOk: _e,
        onCancel: () => {
          d(!1), u.resetFields(), h(null);
        },
        confirmLoading: J,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: u, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: l("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                v,
                {
                  value: (S == null ? void 0 : S.full_name) || (S == null ? void 0 : S.username),
                  disabled: !0
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "role_ids",
              label: l("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                $,
                {
                  mode: "multiple",
                  placeholder: l("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: L,
                  options: ((Ce = k == null ? void 0 : k.data) == null ? void 0 : Ce.map((w) => ({
                    label: w.name,
                    value: w.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, Bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tl
}, Symbol.toStringTag, { value: "Module" })), sl = He(() => import("./markdown-viewer.js")), ll = Ft(({ css: s }) => ({
  fileTree: s`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `,
  editorSpin: s`
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
})), { TextArea: mt } = v, al = (s) => s.toLowerCase().endsWith(".md");
function At(s) {
  return s.map((t) => {
    var a;
    return {
      key: t.path,
      title: t.name,
      isLeaf: !t.is_dir,
      icon: t.is_dir ? /* @__PURE__ */ e.jsx(St, {}) : /* @__PURE__ */ e.jsx(_t, {}),
      children: (a = t.children) != null && a.length ? At(t.children) : void 0
    };
  });
}
function et(s) {
  return s.includes("/") ? s.replace(/\/[^/]+$/, "") : "";
}
const il = () => {
  const { message: s } = ce.useApp(), { styles: t } = ll(), { id: a } = Qe(), l = je(), { t: i } = W("system"), [r, u] = y(null), [m, n] = y(null), [c, d] = y(!1), [S, h] = y(""), [I, T] = y(!1), [M, V] = y([]), [N, j] = y(!1), [P, E] = y(!1), [Y, K] = y(""), [G] = o.useForm(), [Z, X] = y(null), [_, k] = y(null), [L, D] = y(""), [x] = o.useForm(), { data: J } = F(
    () => a ? C.system.getSkill({ id: a }) : Promise.reject(new Error("No id")),
    { refreshDeps: [a], ready: !!a }
  ), { data: q, loading: p, refresh: A } = F(
    () => a ? C.system.listSkillFilesTree({ id: a }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [a],
      ready: !!a,
      onSuccess: (f) => {
        if (!r) {
          for (const z of f)
            if (!z.is_dir && z.name === "SKILL.md") {
              n(z.path), u(z.path), d(!1);
              return;
            }
          for (const z of f)
            if (!z.is_dir && z.name === "SKILLS.md") {
              n(z.path), u(z.path), d(!1);
              return;
            }
        }
      }
    }
  ), U = !!(J != null && J.is_preset), me = Te(() => At(q || []), [q]), ne = c && m ? m : r ? et(r) : "", { loading: _e } = F(() => !a || !r ? Promise.reject(new Error("No id or selected file")) : C.system.getSkillFile({ id: a, path: r || "" }), {
    refreshDeps: [a, r],
    ready: !!a && !!r,
    onSuccess: (f) => {
      h(f.data);
    },
    onBefore: () => {
      h("");
    },
    onError: () => s.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))
  }), Fe = () => {
    !a || !r || U || C.system.putSkillFile({ id: a, path: r }, S).then(() => {
      s.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), T(!1);
    }).catch(() => s.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, Ie = (f, z) => {
    const ee = String(z.node.key), ue = !z.node.isLeaf;
    n(ee), d(ue), z.node.isLeaf ? u(ee) : u(null);
  }, we = (f) => {
    f.event.preventDefault(), X({
      path: String(f.node.key),
      isDir: !f.node.isLeaf,
      x: f.event.clientX,
      y: f.event.clientY
    });
  }, Ve = he(() => X(null), []), Ce = he(
    (f) => {
      if (!a || !Z || U) return;
      const { path: z, isDir: ee } = Z;
      switch (Ve(), f) {
        case "open":
          u(z), n(z), d(!1);
          break;
        case "rename": {
          const ue = z.includes("/") ? z.split("/").pop() : z;
          k({ path: z, isDir: ee }), D(ue), setTimeout(() => x.setFieldsValue({ name: ue }), 0);
          break;
        }
        case "delete":
          oe.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: ee ? i("settings.skills.editor.deleteConfirmContentDir", { path: z, defaultValue: `Delete ${z}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: z, defaultValue: `Delete ${z}?` }),
            onOk: () => C.system.deleteSkillPath({ id: a, path: z }).then(() => {
              s.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), r === z && (u(null), h("")), m === z && (n(null), d(!1)), A();
            }).catch(() => s.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          n(z), d(ee), j(!0);
          break;
        case "newDir":
          n(z), d(ee), E(!0);
          break;
      }
    },
    [a, Z, Ve, A, r, m, x, i, U]
  ), w = () => {
    if (!a || !_ || U) return;
    const f = (x.getFieldValue("name") ?? L).trim();
    if (!f) {
      s.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!_.isDir && !/\.(md|txt)$/i.test(f)) {
      s.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const z = et(_.path), ee = z ? `${z}/${f}` : f;
    if (ee === _.path) {
      k(null);
      return;
    }
    C.system.moveSkillPath({ id: a }, { from_path: _.path, to_path: ee }).then(() => {
      s.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), r === _.path && u(ee), m === _.path && n(ee), k(null), A();
    }).catch(() => s.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, le = (f) => {
    if (!a || U) return;
    const z = String(f.dragNode.key), ee = String(f.dragNode.title);
    let ue;
    if (f.dropToGap) {
      const Ue = et(String(f.node.key));
      ue = Ue ? `${Ue}/${ee}` : ee;
    } else
      ue = `${f.node.key}/${ee}`;
    ue !== z && C.system.moveSkillPath({ id: a }, { from_path: z, to_path: ue }).then(() => {
      s.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), r === z && u(ue), m === z && n(ue), A();
    }).catch(() => s.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, xe = () => {
    const f = Y.trim();
    if (!f || !a || U) return;
    const z = ne ? `${ne}/${f}` : f;
    if (!/\.(md|txt)$/i.test(f)) {
      s.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    C.system.putSkillFile({ id: a, path: z }, "").then(() => {
      s.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), j(!1), K(""), A(), u(z), h("");
    }).catch(() => s.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, ve = () => {
    var ee;
    const f = (ee = G.getFieldValue("name")) == null ? void 0 : ee.trim();
    if (!f || !a || U) return;
    const z = ne ? `${ne}/${f}` : f;
    C.system.createSkillDir({ id: a }, { path: z }).then(() => {
      s.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), E(!1), G.resetFields(), A();
    }).catch(() => s.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, b = () => {
    const f = m || r;
    !a || !f || U || oe.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: f, defaultValue: `Delete ${f}?` }),
      onOk: () => C.system.deleteSkillPath({ id: a, path: f }).then(() => {
        s.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), r === f && (u(null), h("")), m === f && (n(null), d(!1)), A();
      }).catch(() => s.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return a ? /* @__PURE__ */ e.jsxs(
    se,
    {
      title: (J == null ? void 0 : J.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(O, { type: "link", onClick: () => l("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        U ? /* @__PURE__ */ e.jsx(
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
            /* @__PURE__ */ e.jsxs(H, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(O, { size: "small", icon: /* @__PURE__ */ e.jsx(Re, {}), disabled: U, onClick: () => j(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(O, { size: "small", icon: /* @__PURE__ */ e.jsx(St, {}), disabled: U, onClick: () => E(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            p ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              Ut,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !U,
                expandedKeys: M,
                onExpand: (f) => V(f),
                selectedKeys: m ? [m] : [],
                onSelect: Ie,
                onRightClick: U ? void 0 : we,
                onDrop: le,
                className: t.fileTree,
                treeData: me
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            r && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(H, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: r }),
                /* @__PURE__ */ e.jsx(O, { type: "primary", icon: /* @__PURE__ */ e.jsx(We, {}), disabled: U || !I, onClick: Fe, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(O, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ae, {}), disabled: U, onClick: b, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              /* @__PURE__ */ e.jsx(ye, { spinning: _e, wrapperClassName: As(t.editorSpin, "ez-editor-spin"), children: al(r) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  mt,
                  {
                    value: S,
                    readOnly: U,
                    onChange: (f) => {
                      h(f.target.value), T(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(sl, { content: wt(S) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                mt,
                {
                  value: S,
                  readOnly: U,
                  onChange: (f) => {
                    h(f.target.value), T(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              ) })
            ] }),
            !r && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        Z && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: Ve,
              onContextMenu: (f) => f.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: Z.x, top: Z.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            $t,
            {
              selectable: !1,
              items: [
                ...Z.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(_t, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Le, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ae, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(ls, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(as, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: f }) => Ce(f)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(oe, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: N, onOk: xe, onCancel: () => {
          j(!1), K("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(v, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: Y, onChange: (f) => K(f.target.value) }) }),
        /* @__PURE__ */ e.jsx(oe, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: P, onOk: () => G.validateFields().then(ve), onCancel: () => E(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(o, { form: G, layout: "vertical", children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(v, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          oe,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!_,
            onOk: w,
            onCancel: () => k(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(o, { form: x, layout: "vertical", onValuesChange: (f, z) => D(z.name ?? ""), children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: _ != null && _.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              v,
              {
                placeholder: _ != null && _.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => w()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, Jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: il
}, Symbol.toStringTag, { value: "Module" })), ol = He(() => import("./markdown-viewer.js")), nl = () => {
  const { message: s } = ce.useApp(), { id: t } = Qe(), a = je(), { t: l } = W("system"), { data: i, loading: r } = F(
    () => t ? C.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: u, loading: m, mutate: n } = F(
    () => t ? C.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => s.error(l("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => n()
    }
  ), c = Te(() => u == null ? void 0 : u.map((S) => ({
    key: S.file_name,
    label: S.file_name,
    children: /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(ol, { content: wt(S.content) }) })
  })), [u]);
  if (!t) return null;
  const d = r || m;
  return /* @__PURE__ */ e.jsx(ye, { spinning: d, children: /* @__PURE__ */ e.jsx(
    se,
    {
      title: (i == null ? void 0 : i.name) ?? l("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(O, { type: "link", onClick: () => a("/system/settings#skills"), children: l("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: c
    }
  ) });
}, Hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nl
}, Symbol.toStringTag, { value: "Module" })), { Text: ge, Title: rl } = bt, at = ["agent", "llm", "tool"], pt = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(ms, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(cs, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(us, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(lt, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(Ge, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(ds, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(Ge, {}) }
}, ft = {
  agent: "#1677ff",
  llm: "#52c41a",
  tool: "#fa8c16"
}, dl = {
  llm_request: "#1677ff",
  llm_response: "#52c41a",
  tool_call: "#fa8c16",
  tool_result: "#13c2c2",
  token_usage: "#722ed1",
  error: "#ff4d4f",
  summary: "#2f54eb"
}, ul = Ft(({ token: s, css: t }) => ({
  sequenceWrap: t`
    overflow-x: auto;
    padding: 8px 4px 16px;
  `,
  sequenceInner: t`
    min-width: 560px;
    position: relative;
  `,
  actorHeader: t`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin-bottom: 8px;
  `,
  actorBox: t`
    text-align: center;
    padding: 8px 12px;
    margin: 0 24px;
    border: 2px solid ${s.colorBorder};
    border-radius: ${s.borderRadius}px;
    background: ${s.colorBgContainer};
    font-weight: 600;
    font-size: 13px;
  `,
  messageList: t`
    position: relative;
  `,
  lifelineBg: t`
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    pointer-events: none;
    z-index: 0;
  `,
  lifeline: t`
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 0;
      border-left: 2px dashed ${s.colorBorderSecondary};
      transform: translateX(-50%);
    }
  `,
  messageRow: t`
    position: relative;
    z-index: 1;
    min-height: 52px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    cursor: pointer;
    border-radius: ${s.borderRadius}px;
    transition: background 0.15s;

    &:hover {
      background: ${s.colorFillTertiary};
    }
  `,
  messageRowActive: t`
    background: ${s.colorPrimaryBg} !important;
    outline: 1px solid ${s.colorPrimaryBorder};
  `,
  arrowTrack: t`
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 0;
    pointer-events: none;
  `,
  arrowLine: t`
    position: absolute;
    top: 0;
    height: 0;
    border-top-width: 2px;
    border-top-style: solid;
  `,
  arrowHead: t`
    position: absolute;
    top: -5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  `,
  arrowLabel: t`
    position: absolute;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 12px;
    line-height: 1.2;
    padding: 1px 8px;
    border-radius: 10px;
    background: ${s.colorBgElevated};
    border: 1px solid ${s.colorBorderSecondary};
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  `,
  arrowLabelFailed: t`
    background: ${s.colorErrorBg};
    border-color: ${s.colorErrorBorder};
    color: ${s.colorError} !important;
    font-weight: 600;
  `,
  noteBox: t`
    grid-column: 1 / -1;
    justify-self: center;
    max-width: 70%;
    padding: 6px 12px;
    border-radius: ${s.borderRadius}px;
    border: 1px dashed ${s.colorBorder};
    background: ${s.colorFillQuaternary};
    font-size: 12px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  `,
  noteBoxFailed: t`
    background: ${s.colorErrorBg};
    border-style: solid;
    border-color: ${s.colorErrorBorder};
    color: ${s.colorError};
    font-weight: 600;
  `,
  failIcon: t`
    font-size: 12px;
    flex-shrink: 0;
  `,
  stepMeta: t`
    position: absolute;
    left: 4px;
    top: 4px;
    font-size: 11px;
    color: ${s.colorTextSecondary};
    z-index: 2;
  `
})), Pe = ({
  content: s,
  maxHeight: t
}) => {
  const { parsed: a, isJSON: l } = be(s);
  return l ? /* @__PURE__ */ e.jsx(
    Ze,
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: t,
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      value: a
    }
  ) : /* @__PURE__ */ e.jsx(
    "pre",
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: t,
        overflow: "auto",
        fontSize: 12,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      children: s
    }
  );
}, tt = "#ff4d4f";
function Et(s, t) {
  if (!t || !s) return !1;
  if (typeof s.ok == "boolean") return !s.ok;
  const a = (s.result || "").trim();
  return a ? !!(a === "tool call failed" || /^unknown tool:/i.test(a) || /^tool .+ failed:/i.test(a)) : !1;
}
function cl(s) {
  const t = /* @__PURE__ */ new Map();
  for (const a of s) {
    if (a.event_type !== "tool_call") continue;
    const { parsed: l, isJSON: i } = be(a.content);
    i && l.tool_call_id && l.tool && t.set(l.tool_call_id, l.tool);
  }
  return t;
}
const ml = ({
  content: s,
  t,
  maxHeight: a
}) => {
  const { parsed: l, isJSON: i } = be(s);
  return i ? /* @__PURE__ */ e.jsxs(ie, { size: "small", column: 2, bordered: !0, style: { maxHeight: a, overflow: "auto" }, children: [
    l.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ie.Item,
      {
        label: t("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: l.prompt_tokens
      }
    ),
    l.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ie.Item,
      {
        label: t("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: l.completion_tokens
      }
    ),
    l.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ie.Item,
      {
        label: t("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: l.total_tokens
      }
    ),
    l.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      ie.Item,
      {
        label: t("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: l.active_tokens
      }
    )
  ] }) : /* @__PURE__ */ e.jsx(Pe, { content: s, maxHeight: a });
}, pl = ({
  content: s,
  t,
  maxHeight: a
}) => {
  const { parsed: l, isJSON: i } = be(s);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    l.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(ge, { strong: !0, children: [
        t("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(ge, { code: !0, children: l.tool_call_id })
    ] }),
    l.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(ge, { strong: !0, children: [
        t("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ae, { color: "blue", children: l.tool })
    ] }),
    l.arguments && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(ge, { strong: !0, children: [
        t("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(Pe, { content: l.arguments, maxHeight: a })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(Pe, { content: s, maxHeight: a });
}, fl = ({
  content: s,
  t,
  maxHeight: a
}) => {
  const { parsed: l, isJSON: i } = be(s);
  if (!i) return /* @__PURE__ */ e.jsx(Pe, { content: s, maxHeight: a });
  const r = Et(l, i);
  return /* @__PURE__ */ e.jsxs("div", { children: [
    l.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(ge, { strong: !0, children: [
        t("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(ge, { code: !0, children: l.tool_call_id })
    ] }),
    (typeof l.ok == "boolean" || r) && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(ge, { strong: !0, children: [
        t("trace.status", { defaultValue: "Status" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ae, { color: r ? "error" : "success", children: r ? t("trace.failed", { defaultValue: "Failed" }) : t("trace.succeeded", { defaultValue: "Succeeded" }) })
    ] }),
    l.result && /* @__PURE__ */ e.jsxs("div", { style: { overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(ge, { strong: !0, children: [
        t("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(Pe, { content: l.result, maxHeight: a })
    ] })
  ] });
}, gt = ({ event: s, t, maxHeight: a }) => {
  switch (s.event_type) {
    case "token_usage":
      return /* @__PURE__ */ e.jsx(ml, { content: s.content, t, maxHeight: a });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(pl, { content: s.content, t, maxHeight: a });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(fl, { content: s.content, t, maxHeight: a });
    case "error":
      return /* @__PURE__ */ e.jsx(
        "pre",
        {
          style: {
            background: "var(--ant-color-error-bg)",
            border: "1px solid var(--ant-color-error-border)",
            borderRadius: 6,
            padding: 12,
            maxHeight: a,
            overflow: "auto",
            fontSize: 12,
            color: "var(--ant-color-error)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            margin: 0
          },
          children: s.content
        }
      );
    default:
      return /* @__PURE__ */ e.jsx(Pe, { content: s.content, maxHeight: a });
  }
};
function ht(s) {
  return at.indexOf(s);
}
function xt(s, t) {
  return s > 0 ? ` (${t("trace.durationMs", {
    ms: s,
    defaultValue: `${s}ms`
  })})` : "";
}
function gl(s, t) {
  const a = cl(s), l = t("trace.failed", { defaultValue: "Failed" });
  return s.map((i, r) => {
    const u = t(`trace.eventTypes.${i.event_type}`, {
      defaultValue: i.event_type
    }), m = dl[i.event_type] || "#8c8c8c";
    switch (i.event_type) {
      case "llm_request":
        return {
          id: i.id,
          event: i,
          from: "agent",
          to: "llm",
          label: u,
          kind: "call",
          color: m
        };
      case "llm_response":
        return {
          id: i.id,
          event: i,
          from: "llm",
          to: "agent",
          label: `${u}${xt(i.duration_ms, t)}`,
          kind: "return",
          color: m
        };
      case "tool_call": {
        const { parsed: n, isJSON: c } = be(i.content), d = c && n.tool ? n.tool : u;
        return {
          id: i.id,
          event: i,
          from: "agent",
          to: "tool",
          label: d,
          kind: "call",
          color: m
        };
      }
      case "tool_result": {
        const { parsed: n, isJSON: c } = be(i.content), d = Et(n, c), S = c && n.tool_call_id && a.get(n.tool_call_id) || "", h = S ? `${u}: ${S}` : u;
        return {
          id: i.id,
          event: i,
          from: "tool",
          to: "agent",
          label: d ? `${h} · ${l}` : h,
          kind: "return",
          color: d ? tt : m,
          failed: d
        };
      }
      case "summary":
        return {
          id: i.id,
          event: i,
          from: "agent",
          to: "llm",
          label: u,
          kind: "call",
          color: m
        };
      case "token_usage": {
        const { parsed: n, isJSON: c } = be(i.content), d = c && n.total_tokens != null ? ` · ${n.total_tokens}` : "";
        return {
          id: i.id,
          event: i,
          from: "agent",
          to: "agent",
          label: `${u}${d}`,
          kind: "note",
          color: m
        };
      }
      case "error": {
        const n = r > 0 ? s[r - 1] : void 0, c = (n == null ? void 0 : n.event_type) === "llm_request", d = `${u}${xt(i.duration_ms, t)} · ${l}`;
        return c ? {
          id: i.id,
          event: i,
          from: "llm",
          to: "agent",
          label: d,
          kind: "return",
          color: tt,
          failed: !0
        } : {
          id: i.id,
          event: i,
          from: "agent",
          to: "agent",
          label: d,
          kind: "note",
          color: tt,
          failed: !0
        };
      }
      default:
        return {
          id: i.id,
          event: i,
          from: "agent",
          to: "agent",
          label: u,
          kind: "note",
          color: m
        };
    }
  });
}
const hl = ({ from: s, to: t, label: a, color: l, kind: i, failed: r, styles: u, cx: m }) => {
  const n = ht(s), c = ht(t), d = (Math.min(n, c) + 0.5) * (100 / 3), S = (Math.max(n, c) + 0.5) * (100 / 3), h = S - d, I = c > n, T = i === "return";
  return /* @__PURE__ */ e.jsxs("div", { className: u.arrowTrack, children: [
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: u.arrowLine,
        style: {
          left: `${d}%`,
          width: `${h}%`,
          borderTopColor: l,
          borderTopStyle: T ? "dashed" : "solid"
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: u.arrowHead,
        style: I ? {
          left: `calc(${S}% - 2px)`,
          borderLeft: `8px solid ${l}`
        } : {
          left: `calc(${d}% - 6px)`,
          borderRight: `8px solid ${l}`
        }
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: m(u.arrowLabel, r && u.arrowLabelFailed),
        style: { color: l, borderColor: l },
        title: a,
        children: [
          r && /* @__PURE__ */ e.jsx(vt, { className: u.failIcon }),
          /* @__PURE__ */ e.jsx("span", { children: a })
        ]
      }
    )
  ] });
}, xl = ({ events: s, t, selectedId: a, onSelect: l }) => {
  const { styles: i, cx: r } = ul(), u = Te(
    () => gl(s, t),
    [s, t]
  ), m = (n) => t(`trace.actors.${n}`, {
    defaultValue: n === "agent" ? "Agent" : n === "llm" ? "LLM" : "Tool"
  });
  return u.length === 0 ? /* @__PURE__ */ e.jsx(
    Oe,
    {
      description: t("trace.noEvents", {
        defaultValue: "No trace events found for this trace ID"
      })
    }
  ) : /* @__PURE__ */ e.jsx("div", { className: i.sequenceWrap, children: /* @__PURE__ */ e.jsxs("div", { className: i.sequenceInner, children: [
    /* @__PURE__ */ e.jsx("div", { className: i.actorHeader, children: at.map((n) => /* @__PURE__ */ e.jsx(
      "div",
      {
        className: i.actorBox,
        style: { borderColor: ft[n], color: ft[n] },
        children: m(n)
      },
      n
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: i.messageList, children: [
      /* @__PURE__ */ e.jsx("div", { className: i.lifelineBg, children: at.map((n) => /* @__PURE__ */ e.jsx("div", { className: i.lifeline }, n)) }),
      u.map((n) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          role: "button",
          tabIndex: 0,
          className: r(
            i.messageRow,
            a === n.id && i.messageRowActive
          ),
          onClick: () => l(n.event),
          onKeyDown: (c) => {
            (c.key === "Enter" || c.key === " ") && (c.preventDefault(), l(n.event));
          },
          children: [
            /* @__PURE__ */ e.jsxs("span", { className: i.stepMeta, children: [
              "#",
              n.event.step_order
            ] }),
            n.kind === "note" ? /* @__PURE__ */ e.jsxs(
              "div",
              {
                className: r(
                  i.noteBox,
                  n.failed && i.noteBoxFailed
                ),
                style: { borderColor: n.color, color: n.color },
                title: n.label,
                children: [
                  n.failed && /* @__PURE__ */ e.jsx(vt, { className: i.failIcon }),
                  /* @__PURE__ */ e.jsx("span", { children: n.label })
                ]
              }
            ) : /* @__PURE__ */ e.jsx(
              hl,
              {
                from: n.from,
                to: n.to,
                label: n.label,
                color: n.color,
                kind: n.kind,
                failed: n.failed,
                styles: i,
                cx: r
              }
            )
          ]
        },
        n.id
      ))
    ] })
  ] }) });
}, yl = () => {
  const { message: s } = ce.useApp(), { t } = W("ai"), a = je(), [l, i] = y(""), [r, u] = y(""), [m, n] = y("sequence"), [c, d] = y(
    null
  ), {
    data: S,
    loading: h,
    refresh: I
  } = F(() => C.ai.getAiTraceStatus(), {
    onError: () => {
      s.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), T = (S == null ? void 0 : S.enabled) ?? !1, { loading: M, run: V } = F(
    (_) => C.ai.toggleAiTrace({ enabled: _ }),
    {
      manual: !0,
      onSuccess: (_, [k]) => {
        s.success(
          k ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), I(), k || u("");
      },
      onError: () => {
        s.error(
          t("trace.toggleFailed", {
            defaultValue: "Failed to toggle AI debug tracing"
          })
        );
      }
    }
  ), {
    data: N,
    loading: j,
    run: P
  } = F(
    (_) => C.ai.getAiTraceEvents({ trace_id: _ }),
    {
      manual: !0,
      onError: () => {
        s.error(
          t("trace.fetchFailed", {
            defaultValue: "Failed to fetch trace events"
          })
        );
      }
    }
  ), E = he(() => {
    l.trim() && (u(l.trim()), d(null), P(l.trim()));
  }, [l, P]), Y = he(
    (_) => {
      const k = _ ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      oe.confirm({
        title: _ ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: k,
        onOk: () => V(_)
      });
    },
    [t, V]
  ), K = he(async () => {
    if (r)
      try {
        const _ = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(r)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!_.ok) throw new Error("download failed");
        const k = await _.blob(), L = window.URL.createObjectURL(k), D = document.createElement("a");
        D.href = L, D.download = `ai-trace-${r}.json`, document.body.appendChild(D), D.click(), window.URL.revokeObjectURL(L), document.body.removeChild(D);
      } catch {
        s.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [r, t]), G = Te(() => N ?? [], [N]);
  Ne(() => {
    d(null);
  }, [r, m]);
  const Z = Te(
    () => G.map((_) => {
      const k = pt[_.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(Ge, {})
      }, L = t(`trace.eventTypes.${_.event_type}`, {
        defaultValue: _.event_type
      });
      return {
        key: _.id,
        dot: k.icon,
        color: k.color,
        children: /* @__PURE__ */ e.jsx(
          qt,
          {
            size: "small",
            defaultActiveKey: [_.id],
            items: [
              {
                key: _.id,
                label: /* @__PURE__ */ e.jsxs(H, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(ae, { color: k.color, children: L }),
                  /* @__PURE__ */ e.jsxs(ge, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    _.step_order
                  ] }),
                  _.duration_ms > 0 && /* @__PURE__ */ e.jsxs(ge, { type: "secondary", style: { fontSize: 12 }, children: [
                    t("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    _.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(ge, { type: "secondary", style: { fontSize: 12 }, children: new Date(_.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(gt, { event: _, t, maxHeight: 400 })
              }
            ]
          }
        )
      };
    }),
    [G, t]
  ), X = c ? pt[c.event_type] : null;
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ e.jsxs(H, { children: [
            /* @__PURE__ */ e.jsx(
              O,
              {
                icon: /* @__PURE__ */ e.jsx(ot, {}),
                onClick: () => a("/system/settings#ai-models"),
                children: t("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(rl, { level: 4, style: { margin: 0 }, children: t("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(H, { children: [
            /* @__PURE__ */ e.jsx(ge, { children: T ? t("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : t("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              de,
              {
                checked: T,
                loading: h || M,
                onChange: Y
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(H.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        v,
        {
          placeholder: t("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: l,
          onChange: (_) => i(_.target.value),
          onPressEnter: E,
          prefix: /* @__PURE__ */ e.jsx(is, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(O, { type: "primary", onClick: E, loading: j, children: t("trace.search", { defaultValue: "Search" }) }),
      r && G.length > 0 && /* @__PURE__ */ e.jsx(O, { icon: /* @__PURE__ */ e.jsx(os, {}), onClick: K, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    j ? /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ye, { size: "large" }) }) }) : r && G.length === 0 ? /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(
      Oe,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : G.length > 0 ? /* @__PURE__ */ e.jsx(
      se,
      {
        title: /* @__PURE__ */ e.jsx(
          Jt,
          {
            value: m,
            onChange: (_) => n(_),
            options: [
              {
                label: t("trace.viewSequence", {
                  defaultValue: "Sequence"
                }),
                value: "sequence",
                icon: /* @__PURE__ */ e.jsx(ns, {})
              },
              {
                label: t("trace.viewTimeline", {
                  defaultValue: "Timeline"
                }),
                value: "timeline",
                icon: /* @__PURE__ */ e.jsx(rs, {})
              }
            ]
          }
        ),
        children: m === "sequence" ? /* @__PURE__ */ e.jsx(
          xl,
          {
            events: G,
            t,
            selectedId: c == null ? void 0 : c.id,
            onSelect: d
          }
        ) : /* @__PURE__ */ e.jsx(Bt, { items: Z })
      }
    ) : null,
    /* @__PURE__ */ e.jsx(
      Ht,
      {
        title: c ? /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(ae, { color: (X == null ? void 0 : X.color) || "default", children: t(`trace.eventTypes.${c.event_type}`, {
            defaultValue: c.event_type
          }) }),
          /* @__PURE__ */ e.jsxs(ge, { type: "secondary", children: [
            "#",
            c.step_order
          ] }),
          c.duration_ms > 0 && /* @__PURE__ */ e.jsxs(ge, { type: "secondary", children: [
            t("trace.duration", { defaultValue: "Duration" }),
            ":",
            " ",
            c.duration_ms,
            "ms"
          ] })
        ] }) : null,
        open: m === "sequence" && !!c,
        onClose: () => d(null),
        width: 560,
        children: c && /* @__PURE__ */ e.jsx(gt, { event: c, t })
      }
    )
  ] });
}, Wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yl
}, Symbol.toStringTag, { value: "Module" })), bl = He(() => import("./json-schema-config-form.js")), { Text: ze, Title: jl } = bt, Vl = ({
  content: s,
  maxHeight: t = 400
}) => {
  const { parsed: a, isJSON: l } = be(s);
  return l ? /* @__PURE__ */ e.jsx(
    Ze,
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: t,
        overflow: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      value: a
    }
  ) : /* @__PURE__ */ e.jsx(
    "pre",
    {
      style: {
        background: "var(--ant-color-bg-container)",
        border: "1px solid var(--ant-color-border)",
        borderRadius: 6,
        padding: 12,
        maxHeight: t,
        overflow: "auto",
        fontSize: 12,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        margin: 0
      },
      children: s
    }
  );
}, kl = () => {
  var J;
  const { message: s } = ce.useApp(), { t } = W("system"), { t: a } = W("common"), l = je(), { id: i } = Qe(), [r, u] = y(void 0), [m, n] = y("schema"), [c, d] = y({}), [S, h] = y("{}"), [I, T] = y(null), [M, V] = y(null), { loading: N, data: j } = F(
    () => C.system.getToolSet({ id: i }),
    {
      ready: !!i,
      onError: () => {
        s.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: P, data: E } = F(
    () => C.system.getToolSetTools({ id: i }),
    {
      ready: !!i,
      onError: () => {
        s.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), Y = E == null ? void 0 : E.find(
    (q) => {
      var p;
      return ((p = q.function) == null ? void 0 : p.name) === r;
    }
  ), { loading: K, run: G } = F(
    (q, p) => C.system.callTool({ id: i }, { name: q, parameters: p }),
    {
      manual: !0,
      onSuccess: (q) => {
        T((q == null ? void 0 : q.result) ?? "");
      },
      onError: (q) => {
        var A, U;
        const p = ((U = (A = q.response) == null ? void 0 : A.data) == null ? void 0 : U.message) || q.message || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        s.error(p), T(null);
      }
    }
  ), Z = he((q) => {
    u(q), d({}), h("{}"), T(null), V(null);
  }, []), X = he(() => {
    if (m === "schema")
      h(JSON.stringify(c, null, 2)), n("code");
    else {
      const { parsed: q, isJSON: p } = be(S);
      p && (d(q), V(null)), n("schema");
    }
  }, [m, c, S]), _ = he((q) => {
    h(q);
    const { parsed: p, isJSON: A } = be(q);
    A ? (d(p), V(null)) : V(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), k = he(() => {
    if (!r) {
      s.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let q;
    if (m === "code") {
      if (M) {
        s.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      q = S;
    } else
      q = JSON.stringify(c);
    T(null), G(r, q);
  }, [r, m, c, S, M, G, t]), L = j, D = (L == null ? void 0 : L.status) === "enabled" ? "green" : "red", x = (L == null ? void 0 : L.status) === "enabled" ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(H, { children: [
      /* @__PURE__ */ e.jsx(
        O,
        {
          icon: /* @__PURE__ */ e.jsx(ot, {}),
          onClick: () => l("/system/settings#ai-toolsets"),
          children: t("settings.toolsets.backToList", { defaultValue: "Back" })
        }
      ),
      /* @__PURE__ */ e.jsx(jl, { level: 4, style: { margin: 0 }, children: t("settings.toolsets.debugTitle", { defaultValue: "Tool Debug" }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, loading: N, children: L && /* @__PURE__ */ e.jsxs(ie, { column: 2, size: "small", children: [
      /* @__PURE__ */ e.jsx(ie.Item, { label: t("settings.toolsets.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(ze, { strong: !0, children: L.name }) }),
      /* @__PURE__ */ e.jsx(ie.Item, { label: t("settings.toolsets.type", { defaultValue: "Type" }), children: /* @__PURE__ */ e.jsx(ae, { color: "blue", children: String(L.type).toUpperCase() }) }),
      /* @__PURE__ */ e.jsx(ie.Item, { label: t("settings.toolsets.description", { defaultValue: "Description" }), span: 2, children: L.description || "-" }),
      /* @__PURE__ */ e.jsx(ie.Item, { label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ae, { color: D, children: x }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(se, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(ze, { strong: !0, children: t("settings.toolsets.selectTool", { defaultValue: "Select Tool" }) }) }),
        P ? /* @__PURE__ */ e.jsx(ye, { size: "small" }) : /* @__PURE__ */ e.jsx(
          $,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: r,
            onChange: Z,
            optionLabelProp: "label",
            children: (E ?? []).map((q) => {
              var me, ne;
              const p = ((me = q.function) == null ? void 0 : me.name) ?? "", A = ((ne = q.function) == null ? void 0 : ne.description) ?? "", U = A ? `${p} - ${A}` : p;
              return /* @__PURE__ */ e.jsx($.Option, { value: p, label: U, children: /* @__PURE__ */ e.jsx(
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
              ) }, p);
            })
          }
        )
      ] }),
      Y && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
          /* @__PURE__ */ e.jsx(ze, { strong: !0, children: t("settings.toolsets.parameters", { defaultValue: "Parameters" }) }),
          /* @__PURE__ */ e.jsx(
            Xe,
            {
              title: m === "schema" ? t("settings.toolsets.switchToCodeEditor", { defaultValue: "Switch to JSON editor" }) : t("settings.toolsets.switchToFormEditor", { defaultValue: "Switch to form editor" }),
              children: /* @__PURE__ */ e.jsx(
                O,
                {
                  size: "small",
                  icon: m === "schema" ? /* @__PURE__ */ e.jsx(ps, {}) : /* @__PURE__ */ e.jsx(fs, {}),
                  onClick: X
                }
              )
            }
          )
        ] }),
        m === "schema" ? (J = Y.function) != null && J.parameters ? /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(
          bl,
          {
            schema: Y.function.parameters,
            value: c,
            onChange: d
          }
        ) }) : /* @__PURE__ */ e.jsx(ze, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            Es,
            {
              value: S,
              height: "200px",
              extensions: [zs()],
              onChange: _,
              basicSetup: { lineNumbers: !0, foldGutter: !0 }
            }
          ),
          M && /* @__PURE__ */ e.jsx(ze, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: M })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: I !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        O,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(gs, {}),
          loading: K,
          disabled: !r,
          onClick: k,
          children: t("settings.toolsets.callTool", { defaultValue: "Run" })
        }
      ) }),
      I !== null && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(ze, { strong: !0, children: t("settings.toolsets.result", { defaultValue: "Result" }) }) }),
        /* @__PURE__ */ e.jsx(Vl, { content: I, maxHeight: 300 })
      ] })
    ] })
  ] });
}, Kl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kl
}, Symbol.toStringTag, { value: "Module" })), Sl = () => {
  const { t: s } = W("system"), [t] = ys(), a = t.get("provider"), l = t.get("code"), i = t.get("state"), [r, u] = y(null), [m, n] = y(null), [c, d] = y(null);
  return F(async () => {
    if (!l || !i || !a)
      throw new Error(s("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const S = await C.system.testOauthCallback({ code: l, state: i, provider: a });
    if (!S.user_info)
      throw new Error(s("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!S.user)
      throw new Error(s("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    u(S.user), n(S.user_info);
  }, {
    onSuccess: () => {
      d({
        status: "success",
        message: s("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (S) => {
      d({
        status: "error",
        message: s("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: S.message
      });
    }
  }), c ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    Wt,
    {
      status: c.status,
      title: c.message,
      subTitle: c.error,
      extra: /* @__PURE__ */ e.jsxs(H, { style: { display: !m || !r ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(se, { title: s("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Ze, { value: m || {} }) }),
        /* @__PURE__ */ e.jsx(se, { title: s("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Ze, { value: r || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(De, {});
}, Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sl
}, Symbol.toStringTag, { value: "Module" }));
export {
  Wl as A,
  Bl as O,
  Jl as S,
  Kl as T,
  Hl as a,
  Gl as b,
  ql as i
};
